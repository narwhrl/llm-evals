(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();var Nh={exports:{}},tl={};var _v;function Py(){if(_v)return tl;_v=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,o,c){var u=null;if(c!==void 0&&(u=""+c),o.key!==void 0&&(u=""+o.key),"key"in o){c={};for(var d in o)d!=="key"&&(c[d]=o[d])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:u,ref:o!==void 0?o:null,props:c}}return tl.Fragment=t,tl.jsx=n,tl.jsxs=n,tl}var xv;function Iy(){return xv||(xv=1,Nh.exports=Py()),Nh.exports}var Ed=Iy(),Oh={exports:{}},el={},Ph={exports:{}},Ih={};var Sv;function zy(){return Sv||(Sv=1,(function(r){function t(F,k){var lt=F.length;F.push(k);t:for(;0<lt;){var et=lt-1>>>1,ft=F[et];if(0<o(ft,k))F[et]=k,F[lt]=ft,lt=et;else break t}}function n(F){return F.length===0?null:F[0]}function a(F){if(F.length===0)return null;var k=F[0],lt=F.pop();if(lt!==k){F[0]=lt;t:for(var et=0,ft=F.length,O=ft>>>1;et<O;){var tt=2*(et+1)-1,dt=F[tt],bt=tt+1,Nt=F[bt];if(0>o(dt,lt))bt<ft&&0>o(Nt,dt)?(F[et]=Nt,F[bt]=lt,et=bt):(F[et]=dt,F[tt]=lt,et=tt);else if(bt<ft&&0>o(Nt,lt))F[et]=Nt,F[bt]=lt,et=bt;else break t}}return k}function o(F,k){var lt=F.sortIndex-k.sortIndex;return lt!==0?lt:F.id-k.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var u=Date,d=u.now();r.unstable_now=function(){return u.now()-d}}var m=[],p=[],g=1,v=null,_=3,x=!1,E=!1,D=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,C=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;function A(F){for(var k=n(p);k!==null;){if(k.callback===null)a(p);else if(k.startTime<=F)a(p),k.sortIndex=k.expirationTime,t(m,k);else break;k=n(p)}}function L(F){if(D=!1,A(F),!E)if(n(m)!==null)E=!0,N||(N=!0,q());else{var k=n(p);k!==null&&Q(L,k.startTime-F)}}var N=!1,I=-1,T=5,U=-1;function B(){return M?!0:!(r.unstable_now()-U<T)}function X(){if(M=!1,N){var F=r.unstable_now();U=F;var k=!0;try{t:{E=!1,D&&(D=!1,C(I),I=-1),x=!0;var lt=_;try{e:{for(A(F),v=n(m);v!==null&&!(v.expirationTime>F&&B());){var et=v.callback;if(typeof et=="function"){v.callback=null,_=v.priorityLevel;var ft=et(v.expirationTime<=F);if(F=r.unstable_now(),typeof ft=="function"){v.callback=ft,A(F),k=!0;break e}v===n(m)&&a(m),A(F)}else a(m);v=n(m)}if(v!==null)k=!0;else{var O=n(p);O!==null&&Q(L,O.startTime-F),k=!1}}break t}finally{v=null,_=lt,x=!1}k=void 0}}finally{k?q():N=!1}}}var q;if(typeof P=="function")q=function(){P(X)};else if(typeof MessageChannel<"u"){var K=new MessageChannel,H=K.port2;K.port1.onmessage=X,q=function(){H.postMessage(null)}}else q=function(){S(X,0)};function Q(F,k){I=S(function(){F(r.unstable_now())},k)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(F){F.callback=null},r.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<F?Math.floor(1e3/F):5},r.unstable_getCurrentPriorityLevel=function(){return _},r.unstable_next=function(F){switch(_){case 1:case 2:case 3:var k=3;break;default:k=_}var lt=_;_=k;try{return F()}finally{_=lt}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(F,k){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var lt=_;_=F;try{return k()}finally{_=lt}},r.unstable_scheduleCallback=function(F,k,lt){var et=r.unstable_now();switch(typeof lt=="object"&&lt!==null?(lt=lt.delay,lt=typeof lt=="number"&&0<lt?et+lt:et):lt=et,F){case 1:var ft=-1;break;case 2:ft=250;break;case 5:ft=1073741823;break;case 4:ft=1e4;break;default:ft=5e3}return ft=lt+ft,F={id:g++,callback:k,priorityLevel:F,startTime:lt,expirationTime:ft,sortIndex:-1},lt>et?(F.sortIndex=lt,t(p,F),n(m)===null&&F===n(p)&&(D?(C(I),I=-1):D=!0,Q(L,lt-et))):(F.sortIndex=ft,t(m,F),E||x||(E=!0,N||(N=!0,q()))),F},r.unstable_shouldYield=B,r.unstable_wrapCallback=function(F){var k=_;return function(){var lt=_;_=k;try{return F.apply(this,arguments)}finally{_=lt}}}})(Ih)),Ih}var yv;function By(){return yv||(yv=1,Ph.exports=zy()),Ph.exports}var zh={exports:{}},fe={};var Mv;function Fy(){if(Mv)return fe;Mv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),_=Symbol.iterator;function x(O){return O===null||typeof O!="object"?null:(O=_&&O[_]||O["@@iterator"],typeof O=="function"?O:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D=Object.assign,M={};function S(O,tt,dt){this.props=O,this.context=tt,this.refs=M,this.updater=dt||E}S.prototype.isReactComponent={},S.prototype.setState=function(O,tt){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,tt,"setState")},S.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function C(){}C.prototype=S.prototype;function P(O,tt,dt){this.props=O,this.context=tt,this.refs=M,this.updater=dt||E}var A=P.prototype=new C;A.constructor=P,D(A,S.prototype),A.isPureReactComponent=!0;var L=Array.isArray;function N(){}var I={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function U(O,tt,dt){var bt=dt.ref;return{$$typeof:r,type:O,key:tt,ref:bt!==void 0?bt:null,props:dt}}function B(O,tt){return U(O.type,tt,O.props)}function X(O){return typeof O=="object"&&O!==null&&O.$$typeof===r}function q(O){var tt={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(dt){return tt[dt]})}var K=/\/+/g;function H(O,tt){return typeof O=="object"&&O!==null&&O.key!=null?q(""+O.key):tt.toString(36)}function Q(O){switch(O.status){case"fulfilled":return O.value;case"rejected":throw O.reason;default:switch(typeof O.status=="string"?O.then(N,N):(O.status="pending",O.then(function(tt){O.status==="pending"&&(O.status="fulfilled",O.value=tt)},function(tt){O.status==="pending"&&(O.status="rejected",O.reason=tt)})),O.status){case"fulfilled":return O.value;case"rejected":throw O.reason}}throw O}function F(O,tt,dt,bt,Nt){var Vt=typeof O;(Vt==="undefined"||Vt==="boolean")&&(O=null);var at=!1;if(O===null)at=!0;else switch(Vt){case"bigint":case"string":case"number":at=!0;break;case"object":switch(O.$$typeof){case r:case t:at=!0;break;case g:return at=O._init,F(at(O._payload),tt,dt,bt,Nt)}}if(at)return Nt=Nt(O),at=bt===""?"."+H(O,0):bt,L(Nt)?(dt="",at!=null&&(dt=at.replace(K,"$&/")+"/"),F(Nt,tt,dt,"",function(Kt){return Kt})):Nt!=null&&(X(Nt)&&(Nt=B(Nt,dt+(Nt.key==null||O&&O.key===Nt.key?"":(""+Nt.key).replace(K,"$&/")+"/")+at)),tt.push(Nt)),1;at=0;var vt=bt===""?".":bt+":";if(L(O))for(var Rt=0;Rt<O.length;Rt++)bt=O[Rt],Vt=vt+H(bt,Rt),at+=F(bt,tt,dt,Vt,Nt);else if(Rt=x(O),typeof Rt=="function")for(O=Rt.call(O),Rt=0;!(bt=O.next()).done;)bt=bt.value,Vt=vt+H(bt,Rt++),at+=F(bt,tt,dt,Vt,Nt);else if(Vt==="object"){if(typeof O.then=="function")return F(Q(O),tt,dt,bt,Nt);throw tt=String(O),Error("Objects are not valid as a React child (found: "+(tt==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":tt)+"). If you meant to render a collection of children, use an array instead.")}return at}function k(O,tt,dt){if(O==null)return O;var bt=[],Nt=0;return F(O,bt,"","",function(Vt){return tt.call(dt,Vt,Nt++)}),bt}function lt(O){if(O._status===-1){var tt=O._result;tt=tt(),tt.then(function(dt){(O._status===0||O._status===-1)&&(O._status=1,O._result=dt)},function(dt){(O._status===0||O._status===-1)&&(O._status=2,O._result=dt)}),O._status===-1&&(O._status=0,O._result=tt)}if(O._status===1)return O._result.default;throw O._result}var et=typeof reportError=="function"?reportError:function(O){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var tt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof O=="object"&&O!==null&&typeof O.message=="string"?String(O.message):String(O),error:O});if(!window.dispatchEvent(tt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",O);return}console.error(O)},ft={map:k,forEach:function(O,tt,dt){k(O,function(){tt.apply(this,arguments)},dt)},count:function(O){var tt=0;return k(O,function(){tt++}),tt},toArray:function(O){return k(O,function(tt){return tt})||[]},only:function(O){if(!X(O))throw Error("React.Children.only expected to receive a single React element child.");return O}};return fe.Activity=v,fe.Children=ft,fe.Component=S,fe.Fragment=n,fe.Profiler=o,fe.PureComponent=P,fe.StrictMode=a,fe.Suspense=m,fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I,fe.__COMPILER_RUNTIME={__proto__:null,c:function(O){return I.H.useMemoCache(O)}},fe.cache=function(O){return function(){return O.apply(null,arguments)}},fe.cacheSignal=function(){return null},fe.cloneElement=function(O,tt,dt){if(O==null)throw Error("The argument must be a React element, but you passed "+O+".");var bt=D({},O.props),Nt=O.key;if(tt!=null)for(Vt in tt.key!==void 0&&(Nt=""+tt.key),tt)!T.call(tt,Vt)||Vt==="key"||Vt==="__self"||Vt==="__source"||Vt==="ref"&&tt.ref===void 0||(bt[Vt]=tt[Vt]);var Vt=arguments.length-2;if(Vt===1)bt.children=dt;else if(1<Vt){for(var at=Array(Vt),vt=0;vt<Vt;vt++)at[vt]=arguments[vt+2];bt.children=at}return U(O.type,Nt,bt)},fe.createContext=function(O){return O={$$typeof:u,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null},O.Provider=O,O.Consumer={$$typeof:c,_context:O},O},fe.createElement=function(O,tt,dt){var bt,Nt={},Vt=null;if(tt!=null)for(bt in tt.key!==void 0&&(Vt=""+tt.key),tt)T.call(tt,bt)&&bt!=="key"&&bt!=="__self"&&bt!=="__source"&&(Nt[bt]=tt[bt]);var at=arguments.length-2;if(at===1)Nt.children=dt;else if(1<at){for(var vt=Array(at),Rt=0;Rt<at;Rt++)vt[Rt]=arguments[Rt+2];Nt.children=vt}if(O&&O.defaultProps)for(bt in at=O.defaultProps,at)Nt[bt]===void 0&&(Nt[bt]=at[bt]);return U(O,Vt,Nt)},fe.createRef=function(){return{current:null}},fe.forwardRef=function(O){return{$$typeof:d,render:O}},fe.isValidElement=X,fe.lazy=function(O){return{$$typeof:g,_payload:{_status:-1,_result:O},_init:lt}},fe.memo=function(O,tt){return{$$typeof:p,type:O,compare:tt===void 0?null:tt}},fe.startTransition=function(O){var tt=I.T,dt={};I.T=dt;try{var bt=O(),Nt=I.S;Nt!==null&&Nt(dt,bt),typeof bt=="object"&&bt!==null&&typeof bt.then=="function"&&bt.then(N,et)}catch(Vt){et(Vt)}finally{tt!==null&&dt.types!==null&&(tt.types=dt.types),I.T=tt}},fe.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()},fe.use=function(O){return I.H.use(O)},fe.useActionState=function(O,tt,dt){return I.H.useActionState(O,tt,dt)},fe.useCallback=function(O,tt){return I.H.useCallback(O,tt)},fe.useContext=function(O){return I.H.useContext(O)},fe.useDebugValue=function(){},fe.useDeferredValue=function(O,tt){return I.H.useDeferredValue(O,tt)},fe.useEffect=function(O,tt){return I.H.useEffect(O,tt)},fe.useEffectEvent=function(O){return I.H.useEffectEvent(O)},fe.useId=function(){return I.H.useId()},fe.useImperativeHandle=function(O,tt,dt){return I.H.useImperativeHandle(O,tt,dt)},fe.useInsertionEffect=function(O,tt){return I.H.useInsertionEffect(O,tt)},fe.useLayoutEffect=function(O,tt){return I.H.useLayoutEffect(O,tt)},fe.useMemo=function(O,tt){return I.H.useMemo(O,tt)},fe.useOptimistic=function(O,tt){return I.H.useOptimistic(O,tt)},fe.useReducer=function(O,tt,dt){return I.H.useReducer(O,tt,dt)},fe.useRef=function(O){return I.H.useRef(O)},fe.useState=function(O){return I.H.useState(O)},fe.useSyncExternalStore=function(O,tt,dt){return I.H.useSyncExternalStore(O,tt,dt)},fe.useTransition=function(){return I.H.useTransition()},fe.version="19.2.9",fe}var Ev;function mp(){return Ev||(Ev=1,zh.exports=Fy()),zh.exports}var Bh={exports:{}},Kn={};var bv;function Hy(){if(bv)return Kn;bv=1;var r=mp();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(m,p,g){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:v==null?null:""+v,children:m,containerInfo:p,implementation:g}}var u=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Kn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,Kn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,g)},Kn.flushSync=function(m){var p=u.T,g=a.p;try{if(u.T=null,a.p=2,m)return m()}finally{u.T=p,a.p=g,a.d.f()}},Kn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,a.d.C(m,p))},Kn.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},Kn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,v=d(g,p.crossOrigin),_=typeof p.integrity=="string"?p.integrity:void 0,x=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?a.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:v,integrity:_,fetchPriority:x}):g==="script"&&a.d.X(m,{crossOrigin:v,integrity:_,fetchPriority:x,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Kn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);a.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&a.d.M(m)},Kn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,v=d(g,p.crossOrigin);a.d.L(m,g,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Kn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);a.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else a.d.m(m)},Kn.requestFormReset=function(m){a.d.r(m)},Kn.unstable_batchedUpdates=function(m,p){return m(p)},Kn.useFormState=function(m,p,g){return u.H.useFormState(m,p,g)},Kn.useFormStatus=function(){return u.H.useHostTransitionStatus()},Kn.version="19.2.9",Kn}var Tv;function Gy(){if(Tv)return Bh.exports;Tv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Bh.exports=Hy(),Bh.exports}var Av;function Vy(){if(Av)return el;Av=1;var r=By(),t=mp(),n=Gy();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function u(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function d(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(a(188))}function p(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,l=i;;){var f=s.return;if(f===null)break;var h=f.alternate;if(h===null){if(l=f.return,l!==null){s=l;continue}break}if(f.child===h.child){for(h=f.child;h;){if(h===s)return m(f),e;if(h===l)return m(f),i;h=h.sibling}throw Error(a(188))}if(s.return!==l.return)s=f,l=h;else{for(var y=!1,R=f.child;R;){if(R===s){y=!0,s=f,l=h;break}if(R===l){y=!0,l=f,s=h;break}R=R.sibling}if(!y){for(R=h.child;R;){if(R===s){y=!0,s=h,l=f;break}if(R===l){y=!0,l=h,s=f;break}R=R.sibling}if(!y)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var v=Object.assign,_=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),C=Symbol.for("react.consumer"),P=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),L=Symbol.for("react.suspense"),N=Symbol.for("react.suspense_list"),I=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),B=Symbol.for("react.memo_cache_sentinel"),X=Symbol.iterator;function q(e){return e===null||typeof e!="object"?null:(e=X&&e[X]||e["@@iterator"],typeof e=="function"?e:null)}var K=Symbol.for("react.client.reference");function H(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===K?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case D:return"Fragment";case S:return"Profiler";case M:return"StrictMode";case L:return"Suspense";case N:return"SuspenseList";case U:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case P:return e.displayName||"Context";case C:return(e._context.displayName||"Context")+".Consumer";case A:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case I:return i=e.displayName||null,i!==null?i:H(e.type)||"Memo";case T:i=e._payload,e=e._init;try{return H(e(i))}catch{}}return null}var Q=Array.isArray,F=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,lt={pending:!1,data:null,method:null,action:null},et=[],ft=-1;function O(e){return{current:e}}function tt(e){0>ft||(e.current=et[ft],et[ft]=null,ft--)}function dt(e,i){ft++,et[ft]=e.current,e.current=i}var bt=O(null),Nt=O(null),Vt=O(null),at=O(null);function vt(e,i){switch(dt(Vt,i),dt(Nt,e),dt(bt,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?Gg(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=Gg(i),e=Vg(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}tt(bt),dt(bt,e)}function Rt(){tt(bt),tt(Nt),tt(Vt)}function Kt(e){e.memoizedState!==null&&dt(at,e);var i=bt.current,s=Vg(i,e.type);i!==s&&(dt(Nt,e),dt(bt,s))}function Pt(e){Nt.current===e&&(tt(bt),tt(Nt)),at.current===e&&(tt(at),Jo._currentValue=lt)}var ue,$e;function le(e){if(ue===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);ue=i&&i[1]||"",$e=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ue+e+$e}var Ee=!1;function Le(e,i){if(!e||Ee)return"";Ee=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var yt=function(){throw Error()};if(Object.defineProperty(yt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(yt,[])}catch(ht){var ct=ht}Reflect.construct(e,[],yt)}else{try{yt.call()}catch(ht){ct=ht}e.call(yt.prototype)}}else{try{throw Error()}catch(ht){ct=ht}(yt=e())&&typeof yt.catch=="function"&&yt.catch(function(){})}}catch(ht){if(ht&&ct&&typeof ht.stack=="string")return[ht.stack,ct.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=l.DetermineComponentFrameRoot(),y=h[0],R=h[1];if(y&&R){var G=y.split(`
`),ot=R.split(`
`);for(f=l=0;l<G.length&&!G[l].includes("DetermineComponentFrameRoot");)l++;for(;f<ot.length&&!ot[f].includes("DetermineComponentFrameRoot");)f++;if(l===G.length||f===ot.length)for(l=G.length-1,f=ot.length-1;1<=l&&0<=f&&G[l]!==ot[f];)f--;for(;1<=l&&0<=f;l--,f--)if(G[l]!==ot[f]){if(l!==1||f!==1)do if(l--,f--,0>f||G[l]!==ot[f]){var xt=`
`+G[l].replace(" at new "," at ");return e.displayName&&xt.includes("<anonymous>")&&(xt=xt.replace("<anonymous>",e.displayName)),xt}while(1<=l&&0<=f);break}}}finally{Ee=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?le(s):""}function se(e,i){switch(e.tag){case 26:case 27:case 5:return le(e.type);case 16:return le("Lazy");case 13:return e.child!==i&&i!==null?le("Suspense Fallback"):le("Suspense");case 19:return le("SuspenseList");case 0:case 15:return Le(e.type,!1);case 11:return Le(e.type.render,!1);case 1:return Le(e.type,!0);case 31:return le("Activity");default:return""}}function Pe(e){try{var i="",s=null;do i+=se(e,s),s=e,e=e.return;while(e);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var tn=Object.prototype.hasOwnProperty,mn=r.unstable_scheduleCallback,Fe=r.unstable_cancelCallback,sn=r.unstable_shouldYield,J=r.unstable_requestPaint,Ie=r.unstable_now,Ue=r.unstable_getCurrentPriorityLevel,z=r.unstable_ImmediatePriority,b=r.unstable_UserBlockingPriority,j=r.unstable_NormalPriority,rt=r.unstable_LowPriority,mt=r.unstable_IdlePriority,At=r.log,Dt=r.unstable_setDisableYieldValue,pt=null,gt=null;function Tt(e){if(typeof At=="function"&&Dt(e),gt&&typeof gt.setStrictMode=="function")try{gt.setStrictMode(pt,e)}catch{}}var Ft=Math.clz32?Math.clz32:te,Ut=Math.log,Lt=Math.LN2;function te(e){return e>>>=0,e===0?32:31-(Ut(e)/Lt|0)|0}var ie=256,oe=262144,Y=4194304;function Ct(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function _t(e,i,s){var l=e.pendingLanes;if(l===0)return 0;var f=0,h=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var R=l&134217727;return R!==0?(l=R&~h,l!==0?f=Ct(l):(y&=R,y!==0?f=Ct(y):s||(s=R&~e,s!==0&&(f=Ct(s))))):(R=l&~h,R!==0?f=Ct(R):y!==0?f=Ct(y):s||(s=l&~e,s!==0&&(f=Ct(s)))),f===0?0:i!==0&&i!==f&&(i&h)===0&&(h=f&-f,s=i&-i,h>=s||h===32&&(s&4194048)!==0)?i:f}function wt(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function It(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Mt(){var e=Y;return Y<<=1,(Y&62914560)===0&&(Y=4194304),e}function Yt(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function Zt(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ve(e,i,s,l,f,h){var y=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var R=e.entanglements,G=e.expirationTimes,ot=e.hiddenUpdates;for(s=y&~s;0<s;){var xt=31-Ft(s),yt=1<<xt;R[xt]=0,G[xt]=-1;var ct=ot[xt];if(ct!==null)for(ot[xt]=null,xt=0;xt<ct.length;xt++){var ht=ct[xt];ht!==null&&(ht.lane&=-536870913)}s&=~yt}l!==0&&Se(e,l,0),h!==0&&f===0&&e.tag!==0&&(e.suspendedLanes|=h&~(y&~i))}function Se(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var l=31-Ft(i);e.entangledLanes|=i,e.entanglements[l]=e.entanglements[l]|1073741824|s&261930}function Fn(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var l=31-Ft(s),f=1<<l;f&i|e[l]&i&&(e[l]|=i),s&=~f}}function Hn(e,i){var s=i&-i;return s=(s&42)!==0?1:pa(s),(s&(e.suspendedLanes|i))!==0?0:s}function pa(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Et(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ne(){var e=k.p;return e!==0?e:(e=window.event,e===void 0?32:fv(e.type))}function rn(e,i){var s=k.p;try{return k.p=e,i()}finally{k.p=s}}var hn=Math.random().toString(36).slice(2),on="__reactFiber$"+hn,yn="__reactProps$"+hn,Yn="__reactContainer$"+hn,Zn="__reactEvents$"+hn,ma="__reactListeners$"+hn,Cl="__reactHandles$"+hn,Cs="__reactResources$"+hn,Wa="__reactMarker$"+hn;function qa(e){delete e[on],delete e[yn],delete e[Zn],delete e[ma],delete e[Cl]}function ga(e){var i=e[on];if(i)return i;for(var s=e.parentNode;s;){if(i=s[Yn]||s[on]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=Kg(e);e!==null;){if(s=e[on])return s;e=Kg(e)}return i}e=s,s=e.parentNode}return null}function va(e){if(e=e[on]||e[Yn]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function Ds(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Ya(e){var i=e[Cs];return i||(i=e[Cs]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function Mn(e){e[Wa]=!0}var Dl=new Set,fo={};function w(e,i){W(e,i),W(e+"Capture",i)}function W(e,i){for(fo[e]=i,e=0;e<i.length;e++)Dl.add(i[e])}var ut=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),nt={},it={};function zt(e){return tn.call(it,e)?!0:tn.call(nt,e)?!1:ut.test(e)?it[e]=!0:(nt[e]=!0,!1)}function kt(e,i,s){if(zt(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function Ot(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function Ht(e,i,s,l){if(l===null)e.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+l)}}function Gt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function de(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function ye(e,i,s){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var f=l.get,h=l.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return f.call(this)},set:function(y){s=""+y,h.call(this,y)}}),Object.defineProperty(e,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(y){s=""+y},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Qt(e){if(!e._valueTracker){var i=de(e)?"checked":"value";e._valueTracker=ye(e,i,""+e[i])}}function Ne(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return e&&(l=de(e)?e.checked?"true":"false":e.value),e=l,e!==s?(i.setValue(e),!0):!1}function en(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Je=/[\n"\\]/g;function ve(e){return e.replace(Je,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function En(e,i,s,l,f,h,y,R){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),i!=null?y==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+Gt(i)):e.value!==""+Gt(i)&&(e.value=""+Gt(i)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),i!=null?Ln(e,y,Gt(i)):s!=null?Ln(e,y,Gt(s)):l!=null&&e.removeAttribute("value"),f==null&&h!=null&&(e.defaultChecked=!!h),f!=null&&(e.checked=f&&typeof f!="function"&&typeof f!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?e.name=""+Gt(R):e.removeAttribute("name")}function Xt(e,i,s,l,f,h,y,R){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),i!=null||s!=null){if(!(h!=="submit"&&h!=="reset"||i!=null)){Qt(e);return}s=s!=null?""+Gt(s):"",i=i!=null?""+Gt(i):s,R||i===e.value||(e.value=i),e.defaultValue=i}l=l??f,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=R?e.checked:!!l,e.defaultChecked=!!l,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Qt(e)}function Ln(e,i,s){i==="number"&&en(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function _e(e,i,s,l){if(e=e.options,i){i={};for(var f=0;f<s.length;f++)i["$"+s[f]]=!0;for(s=0;s<e.length;s++)f=i.hasOwnProperty("$"+e[s].value),e[s].selected!==f&&(e[s].selected=f),f&&l&&(e[s].defaultSelected=!0)}else{for(s=""+Gt(s),i=null,f=0;f<e.length;f++){if(e[f].value===s){e[f].selected=!0,l&&(e[f].defaultSelected=!0);return}i!==null||e[f].disabled||(i=e[f])}i!==null&&(i.selected=!0)}}function $n(e,i,s){if(i!=null&&(i=""+Gt(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+Gt(s):""}function di(e,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(Q(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=Gt(i),e.defaultValue=s,l=e.textContent,l===s&&l!==""&&l!==null&&(e.value=l),Qt(e)}function ti(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var Za=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function He(e,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":l?e.setProperty(i,s):typeof s!="number"||s===0||Za.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function ln(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var f in i)l=i[f],i.hasOwnProperty(f)&&s[f]!==l&&He(e,f,l)}else for(var h in i)i.hasOwnProperty(h)&&He(e,h,i[h])}function Ti(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qe=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ji=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Bi(e){return ji.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ai(){}var Cu=null;function Du(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var or=null,lr=null;function Hp(e){var i=va(e);if(i&&(e=i.stateNode)){var s=e[yn]||null;t:switch(e=i.stateNode,i.type){case"input":if(En(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+ve(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==e&&l.form===e.form){var f=l[yn]||null;if(!f)throw Error(a(90));En(l,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===e.form&&Ne(l)}break t;case"textarea":$n(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&_e(e,!!s.multiple,i,!1)}}}var Lu=!1;function Gp(e,i,s){if(Lu)return e(i,s);Lu=!0;try{var l=e(i);return l}finally{if(Lu=!1,(or!==null||lr!==null)&&(vc(),or&&(i=or,e=lr,lr=or=null,Hp(i),e)))for(i=0;i<e.length;i++)Hp(e[i])}}function ho(e,i){var s=e.stateNode;if(s===null)return null;var l=s[yn]||null;if(l===null)return null;s=l[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var _a=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Uu=!1;if(_a)try{var po={};Object.defineProperty(po,"passive",{get:function(){Uu=!0}}),window.addEventListener("test",po,po),window.removeEventListener("test",po,po)}catch{Uu=!1}var Ka=null,Nu=null,Ll=null;function Vp(){if(Ll)return Ll;var e,i=Nu,s=i.length,l,f="value"in Ka?Ka.value:Ka.textContent,h=f.length;for(e=0;e<s&&i[e]===f[e];e++);var y=s-e;for(l=1;l<=y&&i[s-l]===f[h-l];l++);return Ll=f.slice(e,1<l?1-l:void 0)}function Ul(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function Nl(){return!0}function kp(){return!1}function ri(e){function i(s,l,f,h,y){this._reactName=s,this._targetInst=f,this.type=l,this.nativeEvent=h,this.target=y,this.currentTarget=null;for(var R in e)e.hasOwnProperty(R)&&(s=e[R],this[R]=s?s(h):h[R]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?Nl:kp,this.isPropagationStopped=kp,this}return v(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Nl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Nl)},persist:function(){},isPersistent:Nl}),i}var Ls={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ol=ri(Ls),mo=v({},Ls,{view:0,detail:0}),Nx=ri(mo),Ou,Pu,go,Pl=v({},mo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==go&&(go&&e.type==="mousemove"?(Ou=e.screenX-go.screenX,Pu=e.screenY-go.screenY):Pu=Ou=0,go=e),Ou)},movementY:function(e){return"movementY"in e?e.movementY:Pu}}),Xp=ri(Pl),Ox=v({},Pl,{dataTransfer:0}),Px=ri(Ox),Ix=v({},mo,{relatedTarget:0}),Iu=ri(Ix),zx=v({},Ls,{animationName:0,elapsedTime:0,pseudoElement:0}),Bx=ri(zx),Fx=v({},Ls,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Hx=ri(Fx),Gx=v({},Ls,{data:0}),Wp=ri(Gx),Vx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},kx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Xx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wx(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=Xx[e])?!!i[e]:!1}function zu(){return Wx}var qx=v({},mo,{key:function(e){if(e.key){var i=Vx[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=Ul(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?kx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zu,charCode:function(e){return e.type==="keypress"?Ul(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ul(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Yx=ri(qx),Zx=v({},Pl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qp=ri(Zx),Kx=v({},mo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zu}),Jx=ri(Kx),Qx=v({},Ls,{propertyName:0,elapsedTime:0,pseudoElement:0}),jx=ri(Qx),$x=v({},Pl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),tS=ri($x),eS=v({},Ls,{newState:0,oldState:0}),nS=ri(eS),iS=[9,13,27,32],Bu=_a&&"CompositionEvent"in window,vo=null;_a&&"documentMode"in document&&(vo=document.documentMode);var aS=_a&&"TextEvent"in window&&!vo,Yp=_a&&(!Bu||vo&&8<vo&&11>=vo),Zp=" ",Kp=!1;function Jp(e,i){switch(e){case"keyup":return iS.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var cr=!1;function sS(e,i){switch(e){case"compositionend":return Qp(i);case"keypress":return i.which!==32?null:(Kp=!0,Zp);case"textInput":return e=i.data,e===Zp&&Kp?null:e;default:return null}}function rS(e,i){if(cr)return e==="compositionend"||!Bu&&Jp(e,i)?(e=Vp(),Ll=Nu=Ka=null,cr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Yp&&i.locale!=="ko"?null:i.data;default:return null}}var oS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jp(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!oS[e.type]:i==="textarea"}function $p(e,i,s,l){or?lr?lr.push(l):lr=[l]:or=l,i=bc(i,"onChange"),0<i.length&&(s=new Ol("onChange","change",null,s,l),e.push({event:s,listeners:i}))}var _o=null,xo=null;function lS(e){Pg(e,0)}function Il(e){var i=Ds(e);if(Ne(i))return e}function tm(e,i){if(e==="change")return i}var em=!1;if(_a){var Fu;if(_a){var Hu="oninput"in document;if(!Hu){var nm=document.createElement("div");nm.setAttribute("oninput","return;"),Hu=typeof nm.oninput=="function"}Fu=Hu}else Fu=!1;em=Fu&&(!document.documentMode||9<document.documentMode)}function im(){_o&&(_o.detachEvent("onpropertychange",am),xo=_o=null)}function am(e){if(e.propertyName==="value"&&Il(xo)){var i=[];$p(i,xo,e,Du(e)),Gp(lS,i)}}function cS(e,i,s){e==="focusin"?(im(),_o=i,xo=s,_o.attachEvent("onpropertychange",am)):e==="focusout"&&im()}function uS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Il(xo)}function fS(e,i){if(e==="click")return Il(i)}function hS(e,i){if(e==="input"||e==="change")return Il(i)}function dS(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var pi=typeof Object.is=="function"?Object.is:dS;function So(e,i){if(pi(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var f=s[l];if(!tn.call(i,f)||!pi(e[f],i[f]))return!1}return!0}function sm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function rm(e,i){var s=sm(e);e=0;for(var l;s;){if(s.nodeType===3){if(l=e+s.textContent.length,e<=i&&l>=i)return{node:s,offset:i-e};e=l}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=sm(s)}}function om(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?om(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function lm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=en(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=en(e.document)}return i}function Gu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var pS=_a&&"documentMode"in document&&11>=document.documentMode,ur=null,Vu=null,yo=null,ku=!1;function cm(e,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;ku||ur==null||ur!==en(l)||(l=ur,"selectionStart"in l&&Gu(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),yo&&So(yo,l)||(yo=l,l=bc(Vu,"onSelect"),0<l.length&&(i=new Ol("onSelect","select",null,i,s),e.push({event:i,listeners:l}),i.target=ur)))}function Us(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var fr={animationend:Us("Animation","AnimationEnd"),animationiteration:Us("Animation","AnimationIteration"),animationstart:Us("Animation","AnimationStart"),transitionrun:Us("Transition","TransitionRun"),transitionstart:Us("Transition","TransitionStart"),transitioncancel:Us("Transition","TransitionCancel"),transitionend:Us("Transition","TransitionEnd")},Xu={},um={};_a&&(um=document.createElement("div").style,"AnimationEvent"in window||(delete fr.animationend.animation,delete fr.animationiteration.animation,delete fr.animationstart.animation),"TransitionEvent"in window||delete fr.transitionend.transition);function Ns(e){if(Xu[e])return Xu[e];if(!fr[e])return e;var i=fr[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in um)return Xu[e]=i[s];return e}var fm=Ns("animationend"),hm=Ns("animationiteration"),dm=Ns("animationstart"),mS=Ns("transitionrun"),gS=Ns("transitionstart"),vS=Ns("transitioncancel"),pm=Ns("transitionend"),mm=new Map,Wu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Wu.push("scrollEnd");function Fi(e,i){mm.set(e,i),w(i,[e])}var zl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},wi=[],hr=0,qu=0;function Bl(){for(var e=hr,i=qu=hr=0;i<e;){var s=wi[i];wi[i++]=null;var l=wi[i];wi[i++]=null;var f=wi[i];wi[i++]=null;var h=wi[i];if(wi[i++]=null,l!==null&&f!==null){var y=l.pending;y===null?f.next=f:(f.next=y.next,y.next=f),l.pending=f}h!==0&&gm(s,f,h)}}function Fl(e,i,s,l){wi[hr++]=e,wi[hr++]=i,wi[hr++]=s,wi[hr++]=l,qu|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Yu(e,i,s,l){return Fl(e,i,s,l),Hl(e)}function Os(e,i){return Fl(e,null,null,i),Hl(e)}function gm(e,i,s){e.lanes|=s;var l=e.alternate;l!==null&&(l.lanes|=s);for(var f=!1,h=e.return;h!==null;)h.childLanes|=s,l=h.alternate,l!==null&&(l.childLanes|=s),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(f=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,f&&i!==null&&(f=31-Ft(s),e=h.hiddenUpdates,l=e[f],l===null?e[f]=[i]:l.push(i),i.lane=s|536870912),h):null}function Hl(e){if(50<ko)throw ko=0,ih=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var dr={};function _S(e,i,s,l){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function mi(e,i,s,l){return new _S(e,i,s,l)}function Zu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function xa(e,i){var s=e.alternate;return s===null?(s=mi(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function vm(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Gl(e,i,s,l,f,h){var y=0;if(l=e,typeof e=="function")Zu(e)&&(y=1);else if(typeof e=="string")y=Ey(e,s,bt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case U:return e=mi(31,s,i,f),e.elementType=U,e.lanes=h,e;case D:return Ps(s.children,f,h,i);case M:y=8,f|=24;break;case S:return e=mi(12,s,i,f|2),e.elementType=S,e.lanes=h,e;case L:return e=mi(13,s,i,f),e.elementType=L,e.lanes=h,e;case N:return e=mi(19,s,i,f),e.elementType=N,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case P:y=10;break t;case C:y=9;break t;case A:y=11;break t;case I:y=14;break t;case T:y=16,l=null;break t}y=29,s=Error(a(130,e===null?"null":typeof e,"")),l=null}return i=mi(y,s,i,f),i.elementType=e,i.type=l,i.lanes=h,i}function Ps(e,i,s,l){return e=mi(7,e,l,i),e.lanes=s,e}function Ku(e,i,s){return e=mi(6,e,null,i),e.lanes=s,e}function _m(e){var i=mi(18,null,null,0);return i.stateNode=e,i}function Ju(e,i,s){return i=mi(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var xm=new WeakMap;function Ri(e,i){if(typeof e=="object"&&e!==null){var s=xm.get(e);return s!==void 0?s:(i={value:e,source:i,stack:Pe(i)},xm.set(e,i),i)}return{value:e,source:i,stack:Pe(i)}}var pr=[],mr=0,Vl=null,Mo=0,Ci=[],Di=0,Ja=null,$i=1,ta="";function Sa(e,i){pr[mr++]=Mo,pr[mr++]=Vl,Vl=e,Mo=i}function Sm(e,i,s){Ci[Di++]=$i,Ci[Di++]=ta,Ci[Di++]=Ja,Ja=e;var l=$i;e=ta;var f=32-Ft(l)-1;l&=~(1<<f),s+=1;var h=32-Ft(i)+f;if(30<h){var y=f-f%5;h=(l&(1<<y)-1).toString(32),l>>=y,f-=y,$i=1<<32-Ft(i)+f|s<<f|l,ta=h+e}else $i=1<<h|s<<f|l,ta=e}function Qu(e){e.return!==null&&(Sa(e,1),Sm(e,1,0))}function ju(e){for(;e===Vl;)Vl=pr[--mr],pr[mr]=null,Mo=pr[--mr],pr[mr]=null;for(;e===Ja;)Ja=Ci[--Di],Ci[Di]=null,ta=Ci[--Di],Ci[Di]=null,$i=Ci[--Di],Ci[Di]=null}function ym(e,i){Ci[Di++]=$i,Ci[Di++]=ta,Ci[Di++]=Ja,$i=i.id,ta=i.overflow,Ja=e}var Gn=null,nn=null,Ce=!1,Qa=null,Li=!1,$u=Error(a(519));function ja(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Eo(Ri(i,e)),$u}function Mm(e){var i=e.stateNode,s=e.type,l=e.memoizedProps;switch(i[on]=e,i[yn]=l,s){case"dialog":Te("cancel",i),Te("close",i);break;case"iframe":case"object":case"embed":Te("load",i);break;case"video":case"audio":for(s=0;s<Wo.length;s++)Te(Wo[s],i);break;case"source":Te("error",i);break;case"img":case"image":case"link":Te("error",i),Te("load",i);break;case"details":Te("toggle",i);break;case"input":Te("invalid",i),Xt(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":Te("invalid",i);break;case"textarea":Te("invalid",i),di(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||Fg(i.textContent,s)?(l.popover!=null&&(Te("beforetoggle",i),Te("toggle",i)),l.onScroll!=null&&Te("scroll",i),l.onScrollEnd!=null&&Te("scrollend",i),l.onClick!=null&&(i.onclick=Ai),i=!0):i=!1,i||ja(e,!0)}function Em(e){for(Gn=e.return;Gn;)switch(Gn.tag){case 5:case 31:case 13:Li=!1;return;case 27:case 3:Li=!0;return;default:Gn=Gn.return}}function gr(e){if(e!==Gn)return!1;if(!Ce)return Em(e),Ce=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||_h(e.type,e.memoizedProps)),s=!s),s&&nn&&ja(e),Em(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));nn=Zg(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));nn=Zg(e)}else i===27?(i=nn,hs(e.type)?(e=Eh,Eh=null,nn=e):nn=i):nn=Gn?Ni(e.stateNode.nextSibling):null;return!0}function Is(){nn=Gn=null,Ce=!1}function tf(){var e=Qa;return e!==null&&(ui===null?ui=e:ui.push.apply(ui,e),Qa=null),e}function Eo(e){Qa===null?Qa=[e]:Qa.push(e)}var ef=O(null),zs=null,ya=null;function $a(e,i,s){dt(ef,i._currentValue),i._currentValue=s}function Ma(e){e._currentValue=ef.current,tt(ef)}function nf(e,i,s){for(;e!==null;){var l=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),e===s)break;e=e.return}}function af(e,i,s,l){var f=e.child;for(f!==null&&(f.return=e);f!==null;){var h=f.dependencies;if(h!==null){var y=f.child;h=h.firstContext;t:for(;h!==null;){var R=h;h=f;for(var G=0;G<i.length;G++)if(R.context===i[G]){h.lanes|=s,R=h.alternate,R!==null&&(R.lanes|=s),nf(h.return,s,e),l||(y=null);break t}h=R.next}}else if(f.tag===18){if(y=f.return,y===null)throw Error(a(341));y.lanes|=s,h=y.alternate,h!==null&&(h.lanes|=s),nf(y,s,e),y=null}else y=f.child;if(y!==null)y.return=f;else for(y=f;y!==null;){if(y===e){y=null;break}if(f=y.sibling,f!==null){f.return=y.return,y=f;break}y=y.return}f=y}}function vr(e,i,s,l){e=null;for(var f=i,h=!1;f!==null;){if(!h){if((f.flags&524288)!==0)h=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var y=f.alternate;if(y===null)throw Error(a(387));if(y=y.memoizedProps,y!==null){var R=f.type;pi(f.pendingProps.value,y.value)||(e!==null?e.push(R):e=[R])}}else if(f===at.current){if(y=f.alternate,y===null)throw Error(a(387));y.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(e!==null?e.push(Jo):e=[Jo])}f=f.return}e!==null&&af(i,e,s,l),i.flags|=262144}function kl(e){for(e=e.firstContext;e!==null;){if(!pi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Bs(e){zs=e,ya=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Vn(e){return bm(zs,e)}function Xl(e,i){return zs===null&&Bs(e),bm(e,i)}function bm(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ya===null){if(e===null)throw Error(a(308));ya=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ya=ya.next=i;return s}var xS=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,l){e.push(l)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},SS=r.unstable_scheduleCallback,yS=r.unstable_NormalPriority,bn={$$typeof:P,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function sf(){return{controller:new xS,data:new Map,refCount:0}}function bo(e){e.refCount--,e.refCount===0&&SS(yS,function(){e.controller.abort()})}var To=null,rf=0,_r=0,xr=null;function MS(e,i){if(To===null){var s=To=[];rf=0,_r=ch(),xr={status:"pending",value:void 0,then:function(l){s.push(l)}}}return rf++,i.then(Tm,Tm),i}function Tm(){if(--rf===0&&To!==null){xr!==null&&(xr.status="fulfilled");var e=To;To=null,_r=0,xr=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function ES(e,i){var s=[],l={status:"pending",value:null,reason:null,then:function(f){s.push(f)}};return e.then(function(){l.status="fulfilled",l.value=i;for(var f=0;f<s.length;f++)(0,s[f])(i)},function(f){for(l.status="rejected",l.reason=f,f=0;f<s.length;f++)(0,s[f])(void 0)}),l}var Am=F.S;F.S=function(e,i){cg=Ie(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&MS(e,i),Am!==null&&Am(e,i)};var Fs=O(null);function of(){var e=Fs.current;return e!==null?e:Qe.pooledCache}function Wl(e,i){i===null?dt(Fs,Fs.current):dt(Fs,i.pool)}function wm(){var e=of();return e===null?null:{parent:bn._currentValue,pool:e}}var Sr=Error(a(460)),lf=Error(a(474)),ql=Error(a(542)),Yl={then:function(){}};function Rm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Cm(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(Ai,Ai),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Lm(e),e;default:if(typeof i.status=="string")i.then(Ai,Ai);else{if(e=Qe,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(l){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=l}},function(l){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Lm(e),e}throw Gs=i,Sr}}function Hs(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Gs=s,Sr):s}}var Gs=null;function Dm(){if(Gs===null)throw Error(a(459));var e=Gs;return Gs=null,e}function Lm(e){if(e===Sr||e===ql)throw Error(a(483))}var yr=null,Ao=0;function Zl(e){var i=Ao;return Ao+=1,yr===null&&(yr=[]),Cm(yr,e,i)}function wo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Kl(e,i){throw i.$$typeof===_?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function Um(e){function i($,Z){if(e){var st=$.deletions;st===null?($.deletions=[Z],$.flags|=16):st.push(Z)}}function s($,Z){if(!e)return null;for(;Z!==null;)i($,Z),Z=Z.sibling;return null}function l($){for(var Z=new Map;$!==null;)$.key!==null?Z.set($.key,$):Z.set($.index,$),$=$.sibling;return Z}function f($,Z){return $=xa($,Z),$.index=0,$.sibling=null,$}function h($,Z,st){return $.index=st,e?(st=$.alternate,st!==null?(st=st.index,st<Z?($.flags|=67108866,Z):st):($.flags|=67108866,Z)):($.flags|=1048576,Z)}function y($){return e&&$.alternate===null&&($.flags|=67108866),$}function R($,Z,st,St){return Z===null||Z.tag!==6?(Z=Ku(st,$.mode,St),Z.return=$,Z):(Z=f(Z,st),Z.return=$,Z)}function G($,Z,st,St){var ae=st.type;return ae===D?xt($,Z,st.props.children,St,st.key):Z!==null&&(Z.elementType===ae||typeof ae=="object"&&ae!==null&&ae.$$typeof===T&&Hs(ae)===Z.type)?(Z=f(Z,st.props),wo(Z,st),Z.return=$,Z):(Z=Gl(st.type,st.key,st.props,null,$.mode,St),wo(Z,st),Z.return=$,Z)}function ot($,Z,st,St){return Z===null||Z.tag!==4||Z.stateNode.containerInfo!==st.containerInfo||Z.stateNode.implementation!==st.implementation?(Z=Ju(st,$.mode,St),Z.return=$,Z):(Z=f(Z,st.children||[]),Z.return=$,Z)}function xt($,Z,st,St,ae){return Z===null||Z.tag!==7?(Z=Ps(st,$.mode,St,ae),Z.return=$,Z):(Z=f(Z,st),Z.return=$,Z)}function yt($,Z,st){if(typeof Z=="string"&&Z!==""||typeof Z=="number"||typeof Z=="bigint")return Z=Ku(""+Z,$.mode,st),Z.return=$,Z;if(typeof Z=="object"&&Z!==null){switch(Z.$$typeof){case x:return st=Gl(Z.type,Z.key,Z.props,null,$.mode,st),wo(st,Z),st.return=$,st;case E:return Z=Ju(Z,$.mode,st),Z.return=$,Z;case T:return Z=Hs(Z),yt($,Z,st)}if(Q(Z)||q(Z))return Z=Ps(Z,$.mode,st,null),Z.return=$,Z;if(typeof Z.then=="function")return yt($,Zl(Z),st);if(Z.$$typeof===P)return yt($,Xl($,Z),st);Kl($,Z)}return null}function ct($,Z,st,St){var ae=Z!==null?Z.key:null;if(typeof st=="string"&&st!==""||typeof st=="number"||typeof st=="bigint")return ae!==null?null:R($,Z,""+st,St);if(typeof st=="object"&&st!==null){switch(st.$$typeof){case x:return st.key===ae?G($,Z,st,St):null;case E:return st.key===ae?ot($,Z,st,St):null;case T:return st=Hs(st),ct($,Z,st,St)}if(Q(st)||q(st))return ae!==null?null:xt($,Z,st,St,null);if(typeof st.then=="function")return ct($,Z,Zl(st),St);if(st.$$typeof===P)return ct($,Z,Xl($,st),St);Kl($,st)}return null}function ht($,Z,st,St,ae){if(typeof St=="string"&&St!==""||typeof St=="number"||typeof St=="bigint")return $=$.get(st)||null,R(Z,$,""+St,ae);if(typeof St=="object"&&St!==null){switch(St.$$typeof){case x:return $=$.get(St.key===null?st:St.key)||null,G(Z,$,St,ae);case E:return $=$.get(St.key===null?st:St.key)||null,ot(Z,$,St,ae);case T:return St=Hs(St),ht($,Z,st,St,ae)}if(Q(St)||q(St))return $=$.get(st)||null,xt(Z,$,St,ae,null);if(typeof St.then=="function")return ht($,Z,st,Zl(St),ae);if(St.$$typeof===P)return ht($,Z,st,Xl(Z,St),ae);Kl(Z,St)}return null}function $t($,Z,st,St){for(var ae=null,ze=null,ee=Z,ge=Z=0,we=null;ee!==null&&ge<st.length;ge++){ee.index>ge?(we=ee,ee=null):we=ee.sibling;var Be=ct($,ee,st[ge],St);if(Be===null){ee===null&&(ee=we);break}e&&ee&&Be.alternate===null&&i($,ee),Z=h(Be,Z,ge),ze===null?ae=Be:ze.sibling=Be,ze=Be,ee=we}if(ge===st.length)return s($,ee),Ce&&Sa($,ge),ae;if(ee===null){for(;ge<st.length;ge++)ee=yt($,st[ge],St),ee!==null&&(Z=h(ee,Z,ge),ze===null?ae=ee:ze.sibling=ee,ze=ee);return Ce&&Sa($,ge),ae}for(ee=l(ee);ge<st.length;ge++)we=ht(ee,$,ge,st[ge],St),we!==null&&(e&&we.alternate!==null&&ee.delete(we.key===null?ge:we.key),Z=h(we,Z,ge),ze===null?ae=we:ze.sibling=we,ze=we);return e&&ee.forEach(function(vs){return i($,vs)}),Ce&&Sa($,ge),ae}function re($,Z,st,St){if(st==null)throw Error(a(151));for(var ae=null,ze=null,ee=Z,ge=Z=0,we=null,Be=st.next();ee!==null&&!Be.done;ge++,Be=st.next()){ee.index>ge?(we=ee,ee=null):we=ee.sibling;var vs=ct($,ee,Be.value,St);if(vs===null){ee===null&&(ee=we);break}e&&ee&&vs.alternate===null&&i($,ee),Z=h(vs,Z,ge),ze===null?ae=vs:ze.sibling=vs,ze=vs,ee=we}if(Be.done)return s($,ee),Ce&&Sa($,ge),ae;if(ee===null){for(;!Be.done;ge++,Be=st.next())Be=yt($,Be.value,St),Be!==null&&(Z=h(Be,Z,ge),ze===null?ae=Be:ze.sibling=Be,ze=Be);return Ce&&Sa($,ge),ae}for(ee=l(ee);!Be.done;ge++,Be=st.next())Be=ht(ee,$,ge,Be.value,St),Be!==null&&(e&&Be.alternate!==null&&ee.delete(Be.key===null?ge:Be.key),Z=h(Be,Z,ge),ze===null?ae=Be:ze.sibling=Be,ze=Be);return e&&ee.forEach(function(Oy){return i($,Oy)}),Ce&&Sa($,ge),ae}function Ke($,Z,st,St){if(typeof st=="object"&&st!==null&&st.type===D&&st.key===null&&(st=st.props.children),typeof st=="object"&&st!==null){switch(st.$$typeof){case x:t:{for(var ae=st.key;Z!==null;){if(Z.key===ae){if(ae=st.type,ae===D){if(Z.tag===7){s($,Z.sibling),St=f(Z,st.props.children),St.return=$,$=St;break t}}else if(Z.elementType===ae||typeof ae=="object"&&ae!==null&&ae.$$typeof===T&&Hs(ae)===Z.type){s($,Z.sibling),St=f(Z,st.props),wo(St,st),St.return=$,$=St;break t}s($,Z);break}else i($,Z);Z=Z.sibling}st.type===D?(St=Ps(st.props.children,$.mode,St,st.key),St.return=$,$=St):(St=Gl(st.type,st.key,st.props,null,$.mode,St),wo(St,st),St.return=$,$=St)}return y($);case E:t:{for(ae=st.key;Z!==null;){if(Z.key===ae)if(Z.tag===4&&Z.stateNode.containerInfo===st.containerInfo&&Z.stateNode.implementation===st.implementation){s($,Z.sibling),St=f(Z,st.children||[]),St.return=$,$=St;break t}else{s($,Z);break}else i($,Z);Z=Z.sibling}St=Ju(st,$.mode,St),St.return=$,$=St}return y($);case T:return st=Hs(st),Ke($,Z,st,St)}if(Q(st))return $t($,Z,st,St);if(q(st)){if(ae=q(st),typeof ae!="function")throw Error(a(150));return st=ae.call(st),re($,Z,st,St)}if(typeof st.then=="function")return Ke($,Z,Zl(st),St);if(st.$$typeof===P)return Ke($,Z,Xl($,st),St);Kl($,st)}return typeof st=="string"&&st!==""||typeof st=="number"||typeof st=="bigint"?(st=""+st,Z!==null&&Z.tag===6?(s($,Z.sibling),St=f(Z,st),St.return=$,$=St):(s($,Z),St=Ku(st,$.mode,St),St.return=$,$=St),y($)):s($,Z)}return function($,Z,st,St){try{Ao=0;var ae=Ke($,Z,st,St);return yr=null,ae}catch(ee){if(ee===Sr||ee===ql)throw ee;var ze=mi(29,ee,null,$.mode);return ze.lanes=St,ze.return=$,ze}}}var Vs=Um(!0),Nm=Um(!1),ts=!1;function cf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function uf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function es(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ns(e,i,s){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(Ge&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,i=Hl(e),gm(e,null,s),i}return Fl(e,l,i,s),Hl(e)}function Ro(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,Fn(e,s)}}function ff(e,i){var s=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var f=null,h=null;if(s=s.firstBaseUpdate,s!==null){do{var y={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};h===null?f=h=y:h=h.next=y,s=s.next}while(s!==null);h===null?f=h=i:h=h.next=i}else f=h=i;s={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:h,shared:l.shared,callbacks:l.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var hf=!1;function Co(){if(hf){var e=xr;if(e!==null)throw e}}function Do(e,i,s,l){hf=!1;var f=e.updateQueue;ts=!1;var h=f.firstBaseUpdate,y=f.lastBaseUpdate,R=f.shared.pending;if(R!==null){f.shared.pending=null;var G=R,ot=G.next;G.next=null,y===null?h=ot:y.next=ot,y=G;var xt=e.alternate;xt!==null&&(xt=xt.updateQueue,R=xt.lastBaseUpdate,R!==y&&(R===null?xt.firstBaseUpdate=ot:R.next=ot,xt.lastBaseUpdate=G))}if(h!==null){var yt=f.baseState;y=0,xt=ot=G=null,R=h;do{var ct=R.lane&-536870913,ht=ct!==R.lane;if(ht?(Ae&ct)===ct:(l&ct)===ct){ct!==0&&ct===_r&&(hf=!0),xt!==null&&(xt=xt.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});t:{var $t=e,re=R;ct=i;var Ke=s;switch(re.tag){case 1:if($t=re.payload,typeof $t=="function"){yt=$t.call(Ke,yt,ct);break t}yt=$t;break t;case 3:$t.flags=$t.flags&-65537|128;case 0:if($t=re.payload,ct=typeof $t=="function"?$t.call(Ke,yt,ct):$t,ct==null)break t;yt=v({},yt,ct);break t;case 2:ts=!0}}ct=R.callback,ct!==null&&(e.flags|=64,ht&&(e.flags|=8192),ht=f.callbacks,ht===null?f.callbacks=[ct]:ht.push(ct))}else ht={lane:ct,tag:R.tag,payload:R.payload,callback:R.callback,next:null},xt===null?(ot=xt=ht,G=yt):xt=xt.next=ht,y|=ct;if(R=R.next,R===null){if(R=f.shared.pending,R===null)break;ht=R,R=ht.next,ht.next=null,f.lastBaseUpdate=ht,f.shared.pending=null}}while(!0);xt===null&&(G=yt),f.baseState=G,f.firstBaseUpdate=ot,f.lastBaseUpdate=xt,h===null&&(f.shared.lanes=0),os|=y,e.lanes=y,e.memoizedState=yt}}function Om(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function Pm(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)Om(s[e],i)}var Mr=O(null),Jl=O(0);function Im(e,i){e=La,dt(Jl,e),dt(Mr,i),La=e|i.baseLanes}function df(){dt(Jl,La),dt(Mr,Mr.current)}function pf(){La=Jl.current,tt(Mr),tt(Jl)}var gi=O(null),Ui=null;function is(e){var i=e.alternate;dt(gn,gn.current&1),dt(gi,e),Ui===null&&(i===null||Mr.current!==null||i.memoizedState!==null)&&(Ui=e)}function mf(e){dt(gn,gn.current),dt(gi,e),Ui===null&&(Ui=e)}function zm(e){e.tag===22?(dt(gn,gn.current),dt(gi,e),Ui===null&&(Ui=e)):as()}function as(){dt(gn,gn.current),dt(gi,gi.current)}function vi(e){tt(gi),Ui===e&&(Ui=null),tt(gn)}var gn=O(0);function Ql(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||yh(s)||Mh(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Ea=0,me=null,Ye=null,Tn=null,jl=!1,Er=!1,ks=!1,$l=0,Lo=0,br=null,bS=0;function dn(){throw Error(a(321))}function gf(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!pi(e[s],i[s]))return!1;return!0}function vf(e,i,s,l,f,h){return Ea=h,me=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,F.H=e===null||e.memoizedState===null?S0:Uf,ks=!1,h=s(l,f),ks=!1,Er&&(h=Fm(i,s,l,f)),Bm(e),h}function Bm(e){F.H=Oo;var i=Ye!==null&&Ye.next!==null;if(Ea=0,Tn=Ye=me=null,jl=!1,Lo=0,br=null,i)throw Error(a(300));e===null||An||(e=e.dependencies,e!==null&&kl(e)&&(An=!0))}function Fm(e,i,s,l){me=e;var f=0;do{if(Er&&(br=null),Lo=0,Er=!1,25<=f)throw Error(a(301));if(f+=1,Tn=Ye=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}F.H=y0,h=i(s,l)}while(Er);return h}function TS(){var e=F.H,i=e.useState()[0];return i=typeof i.then=="function"?Uo(i):i,e=e.useState()[0],(Ye!==null?Ye.memoizedState:null)!==e&&(me.flags|=1024),i}function _f(){var e=$l!==0;return $l=0,e}function xf(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function Sf(e){if(jl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}jl=!1}Ea=0,Tn=Ye=me=null,Er=!1,Lo=$l=0,br=null}function ei(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Tn===null?me.memoizedState=Tn=e:Tn=Tn.next=e,Tn}function vn(){if(Ye===null){var e=me.alternate;e=e!==null?e.memoizedState:null}else e=Ye.next;var i=Tn===null?me.memoizedState:Tn.next;if(i!==null)Tn=i,Ye=e;else{if(e===null)throw me.alternate===null?Error(a(467)):Error(a(310));Ye=e,e={memoizedState:Ye.memoizedState,baseState:Ye.baseState,baseQueue:Ye.baseQueue,queue:Ye.queue,next:null},Tn===null?me.memoizedState=Tn=e:Tn=Tn.next=e}return Tn}function tc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Uo(e){var i=Lo;return Lo+=1,br===null&&(br=[]),e=Cm(br,e,i),i=me,(Tn===null?i.memoizedState:Tn.next)===null&&(i=i.alternate,F.H=i===null||i.memoizedState===null?S0:Uf),e}function ec(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Uo(e);if(e.$$typeof===P)return Vn(e)}throw Error(a(438,String(e)))}function yf(e){var i=null,s=me.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=me.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=tc(),me.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),l=0;l<e;l++)s[l]=B;return i.index++,s}function ba(e,i){return typeof i=="function"?i(e):i}function nc(e){var i=vn();return Mf(i,Ye,e)}function Mf(e,i,s){var l=e.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var f=e.baseQueue,h=l.pending;if(h!==null){if(f!==null){var y=f.next;f.next=h.next,h.next=y}i.baseQueue=f=h,l.pending=null}if(h=e.baseState,f===null)e.memoizedState=h;else{i=f.next;var R=y=null,G=null,ot=i,xt=!1;do{var yt=ot.lane&-536870913;if(yt!==ot.lane?(Ae&yt)===yt:(Ea&yt)===yt){var ct=ot.revertLane;if(ct===0)G!==null&&(G=G.next={lane:0,revertLane:0,gesture:null,action:ot.action,hasEagerState:ot.hasEagerState,eagerState:ot.eagerState,next:null}),yt===_r&&(xt=!0);else if((Ea&ct)===ct){ot=ot.next,ct===_r&&(xt=!0);continue}else yt={lane:0,revertLane:ot.revertLane,gesture:null,action:ot.action,hasEagerState:ot.hasEagerState,eagerState:ot.eagerState,next:null},G===null?(R=G=yt,y=h):G=G.next=yt,me.lanes|=ct,os|=ct;yt=ot.action,ks&&s(h,yt),h=ot.hasEagerState?ot.eagerState:s(h,yt)}else ct={lane:yt,revertLane:ot.revertLane,gesture:ot.gesture,action:ot.action,hasEagerState:ot.hasEagerState,eagerState:ot.eagerState,next:null},G===null?(R=G=ct,y=h):G=G.next=ct,me.lanes|=yt,os|=yt;ot=ot.next}while(ot!==null&&ot!==i);if(G===null?y=h:G.next=R,!pi(h,e.memoizedState)&&(An=!0,xt&&(s=xr,s!==null)))throw s;e.memoizedState=h,e.baseState=y,e.baseQueue=G,l.lastRenderedState=h}return f===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function Ef(e){var i=vn(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var l=s.dispatch,f=s.pending,h=i.memoizedState;if(f!==null){s.pending=null;var y=f=f.next;do h=e(h,y.action),y=y.next;while(y!==f);pi(h,i.memoizedState)||(An=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),s.lastRenderedState=h}return[h,l]}function Hm(e,i,s){var l=me,f=vn(),h=Ce;if(h){if(s===void 0)throw Error(a(407));s=s()}else s=i();var y=!pi((Ye||f).memoizedState,s);if(y&&(f.memoizedState=s,An=!0),f=f.queue,Af(km.bind(null,l,f,e),[e]),f.getSnapshot!==i||y||Tn!==null&&Tn.memoizedState.tag&1){if(l.flags|=2048,Tr(9,{destroy:void 0},Vm.bind(null,l,f,s,i),null),Qe===null)throw Error(a(349));h||(Ea&127)!==0||Gm(l,i,s)}return s}function Gm(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=me.updateQueue,i===null?(i=tc(),me.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function Vm(e,i,s,l){i.value=s,i.getSnapshot=l,Xm(i)&&Wm(e)}function km(e,i,s){return s(function(){Xm(i)&&Wm(e)})}function Xm(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!pi(e,s)}catch{return!0}}function Wm(e){var i=Os(e,2);i!==null&&fi(i,e,2)}function bf(e){var i=ei();if(typeof e=="function"){var s=e;if(e=s(),ks){Tt(!0);try{s()}finally{Tt(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:e},i}function qm(e,i,s,l){return e.baseState=s,Mf(e,Ye,typeof l=="function"?l:ba)}function AS(e,i,s,l,f){if(sc(e))throw Error(a(485));if(e=i.action,e!==null){var h={payload:f,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){h.listeners.push(y)}};F.T!==null?s(!0):h.isTransition=!1,l(h),s=i.pending,s===null?(h.next=i.pending=h,Ym(i,h)):(h.next=s.next,i.pending=s.next=h)}}function Ym(e,i){var s=i.action,l=i.payload,f=e.state;if(i.isTransition){var h=F.T,y={};F.T=y;try{var R=s(f,l),G=F.S;G!==null&&G(y,R),Zm(e,i,R)}catch(ot){Tf(e,i,ot)}finally{h!==null&&y.types!==null&&(h.types=y.types),F.T=h}}else try{h=s(f,l),Zm(e,i,h)}catch(ot){Tf(e,i,ot)}}function Zm(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){Km(e,i,l)},function(l){return Tf(e,i,l)}):Km(e,i,s)}function Km(e,i,s){i.status="fulfilled",i.value=s,Jm(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,Ym(e,s)))}function Tf(e,i,s){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,Jm(i),i=i.next;while(i!==l)}e.action=null}function Jm(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function Qm(e,i){return i}function jm(e,i){if(Ce){var s=Qe.formState;if(s!==null){t:{var l=me;if(Ce){if(nn){e:{for(var f=nn,h=Li;f.nodeType!==8;){if(!h){f=null;break e}if(f=Ni(f.nextSibling),f===null){f=null;break e}}h=f.data,f=h==="F!"||h==="F"?f:null}if(f){nn=Ni(f.nextSibling),l=f.data==="F!";break t}}ja(l)}l=!1}l&&(i=s[0])}}return s=ei(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qm,lastRenderedState:i},s.queue=l,s=v0.bind(null,me,l),l.dispatch=s,l=bf(!1),h=Lf.bind(null,me,!1,l.queue),l=ei(),f={state:i,dispatch:null,action:e,pending:null},l.queue=f,s=AS.bind(null,me,f,h,s),f.dispatch=s,l.memoizedState=e,[i,s,!1]}function $m(e){var i=vn();return t0(i,Ye,e)}function t0(e,i,s){if(i=Mf(e,i,Qm)[0],e=nc(ba)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=Uo(i)}catch(y){throw y===Sr?ql:y}else l=i;i=vn();var f=i.queue,h=f.dispatch;return s!==i.memoizedState&&(me.flags|=2048,Tr(9,{destroy:void 0},wS.bind(null,f,s),null)),[l,h,e]}function wS(e,i){e.action=i}function e0(e){var i=vn(),s=Ye;if(s!==null)return t0(i,s,e);vn(),i=i.memoizedState,s=vn();var l=s.queue.dispatch;return s.memoizedState=e,[i,l,!1]}function Tr(e,i,s,l){return e={tag:e,create:s,deps:l,inst:i,next:null},i=me.updateQueue,i===null&&(i=tc(),me.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(l=s.next,s.next=e,e.next=l,i.lastEffect=e),e}function n0(){return vn().memoizedState}function ic(e,i,s,l){var f=ei();me.flags|=e,f.memoizedState=Tr(1|i,{destroy:void 0},s,l===void 0?null:l)}function ac(e,i,s,l){var f=vn();l=l===void 0?null:l;var h=f.memoizedState.inst;Ye!==null&&l!==null&&gf(l,Ye.memoizedState.deps)?f.memoizedState=Tr(i,h,s,l):(me.flags|=e,f.memoizedState=Tr(1|i,h,s,l))}function i0(e,i){ic(8390656,8,e,i)}function Af(e,i){ac(2048,8,e,i)}function RS(e){me.flags|=4;var i=me.updateQueue;if(i===null)i=tc(),me.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function a0(e){var i=vn().memoizedState;return RS({ref:i,nextImpl:e}),function(){if((Ge&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function s0(e,i){return ac(4,2,e,i)}function r0(e,i){return ac(4,4,e,i)}function o0(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function l0(e,i,s){s=s!=null?s.concat([e]):null,ac(4,4,o0.bind(null,i,e),s)}function wf(){}function c0(e,i){var s=vn();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&gf(i,l[1])?l[0]:(s.memoizedState=[e,i],e)}function u0(e,i){var s=vn();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&gf(i,l[1]))return l[0];if(l=e(),ks){Tt(!0);try{e()}finally{Tt(!1)}}return s.memoizedState=[l,i],l}function Rf(e,i,s){return s===void 0||(Ea&1073741824)!==0&&(Ae&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=fg(),me.lanes|=e,os|=e,s)}function f0(e,i,s,l){return pi(s,i)?s:Mr.current!==null?(e=Rf(e,s,l),pi(e,i)||(An=!0),e):(Ea&42)===0||(Ea&1073741824)!==0&&(Ae&261930)===0?(An=!0,e.memoizedState=s):(e=fg(),me.lanes|=e,os|=e,i)}function h0(e,i,s,l,f){var h=k.p;k.p=h!==0&&8>h?h:8;var y=F.T,R={};F.T=R,Lf(e,!1,i,s);try{var G=f(),ot=F.S;if(ot!==null&&ot(R,G),G!==null&&typeof G=="object"&&typeof G.then=="function"){var xt=ES(G,l);No(e,i,xt,Si(e))}else No(e,i,l,Si(e))}catch(yt){No(e,i,{then:function(){},status:"rejected",reason:yt},Si())}finally{k.p=h,y!==null&&R.types!==null&&(y.types=R.types),F.T=y}}function CS(){}function Cf(e,i,s,l){if(e.tag!==5)throw Error(a(476));var f=d0(e).queue;h0(e,f,i,lt,s===null?CS:function(){return p0(e),s(l)})}function d0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:lt,baseState:lt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:lt},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function p0(e){var i=d0(e);i.next===null&&(i=e.alternate.memoizedState),No(e,i.next.queue,{},Si())}function Df(){return Vn(Jo)}function m0(){return vn().memoizedState}function g0(){return vn().memoizedState}function DS(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=Si();e=es(s);var l=ns(i,e,s);l!==null&&(fi(l,i,s),Ro(l,i,s)),i={cache:sf()},e.payload=i;return}i=i.return}}function LS(e,i,s){var l=Si();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},sc(e)?_0(i,s):(s=Yu(e,i,s,l),s!==null&&(fi(s,e,l),x0(s,i,l)))}function v0(e,i,s){var l=Si();No(e,i,s,l)}function No(e,i,s,l){var f={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(sc(e))_0(i,f);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var y=i.lastRenderedState,R=h(y,s);if(f.hasEagerState=!0,f.eagerState=R,pi(R,y))return Fl(e,i,f,0),Qe===null&&Bl(),!1}catch{}if(s=Yu(e,i,f,l),s!==null)return fi(s,e,l),x0(s,i,l),!0}return!1}function Lf(e,i,s,l){if(l={lane:2,revertLane:ch(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},sc(e)){if(i)throw Error(a(479))}else i=Yu(e,s,l,2),i!==null&&fi(i,e,2)}function sc(e){var i=e.alternate;return e===me||i!==null&&i===me}function _0(e,i){Er=jl=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function x0(e,i,s){if((s&4194048)!==0){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,Fn(e,s)}}var Oo={readContext:Vn,use:ec,useCallback:dn,useContext:dn,useEffect:dn,useImperativeHandle:dn,useLayoutEffect:dn,useInsertionEffect:dn,useMemo:dn,useReducer:dn,useRef:dn,useState:dn,useDebugValue:dn,useDeferredValue:dn,useTransition:dn,useSyncExternalStore:dn,useId:dn,useHostTransitionStatus:dn,useFormState:dn,useActionState:dn,useOptimistic:dn,useMemoCache:dn,useCacheRefresh:dn};Oo.useEffectEvent=dn;var S0={readContext:Vn,use:ec,useCallback:function(e,i){return ei().memoizedState=[e,i===void 0?null:i],e},useContext:Vn,useEffect:i0,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,ic(4194308,4,o0.bind(null,i,e),s)},useLayoutEffect:function(e,i){return ic(4194308,4,e,i)},useInsertionEffect:function(e,i){ic(4,2,e,i)},useMemo:function(e,i){var s=ei();i=i===void 0?null:i;var l=e();if(ks){Tt(!0);try{e()}finally{Tt(!1)}}return s.memoizedState=[l,i],l},useReducer:function(e,i,s){var l=ei();if(s!==void 0){var f=s(i);if(ks){Tt(!0);try{s(i)}finally{Tt(!1)}}}else f=i;return l.memoizedState=l.baseState=f,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:f},l.queue=e,e=e.dispatch=LS.bind(null,me,e),[l.memoizedState,e]},useRef:function(e){var i=ei();return e={current:e},i.memoizedState=e},useState:function(e){e=bf(e);var i=e.queue,s=v0.bind(null,me,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:wf,useDeferredValue:function(e,i){var s=ei();return Rf(s,e,i)},useTransition:function(){var e=bf(!1);return e=h0.bind(null,me,e.queue,!0,!1),ei().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var l=me,f=ei();if(Ce){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Qe===null)throw Error(a(349));(Ae&127)!==0||Gm(l,i,s)}f.memoizedState=s;var h={value:s,getSnapshot:i};return f.queue=h,i0(km.bind(null,l,h,e),[e]),l.flags|=2048,Tr(9,{destroy:void 0},Vm.bind(null,l,h,s,i),null),s},useId:function(){var e=ei(),i=Qe.identifierPrefix;if(Ce){var s=ta,l=$i;s=(l&~(1<<32-Ft(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=$l++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=bS++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Df,useFormState:jm,useActionState:jm,useOptimistic:function(e){var i=ei();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=Lf.bind(null,me,!0,s),s.dispatch=i,[e,i]},useMemoCache:yf,useCacheRefresh:function(){return ei().memoizedState=DS.bind(null,me)},useEffectEvent:function(e){var i=ei(),s={impl:e};return i.memoizedState=s,function(){if((Ge&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Uf={readContext:Vn,use:ec,useCallback:c0,useContext:Vn,useEffect:Af,useImperativeHandle:l0,useInsertionEffect:s0,useLayoutEffect:r0,useMemo:u0,useReducer:nc,useRef:n0,useState:function(){return nc(ba)},useDebugValue:wf,useDeferredValue:function(e,i){var s=vn();return f0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=nc(ba)[0],i=vn().memoizedState;return[typeof e=="boolean"?e:Uo(e),i]},useSyncExternalStore:Hm,useId:m0,useHostTransitionStatus:Df,useFormState:$m,useActionState:$m,useOptimistic:function(e,i){var s=vn();return qm(s,Ye,e,i)},useMemoCache:yf,useCacheRefresh:g0};Uf.useEffectEvent=a0;var y0={readContext:Vn,use:ec,useCallback:c0,useContext:Vn,useEffect:Af,useImperativeHandle:l0,useInsertionEffect:s0,useLayoutEffect:r0,useMemo:u0,useReducer:Ef,useRef:n0,useState:function(){return Ef(ba)},useDebugValue:wf,useDeferredValue:function(e,i){var s=vn();return Ye===null?Rf(s,e,i):f0(s,Ye.memoizedState,e,i)},useTransition:function(){var e=Ef(ba)[0],i=vn().memoizedState;return[typeof e=="boolean"?e:Uo(e),i]},useSyncExternalStore:Hm,useId:m0,useHostTransitionStatus:Df,useFormState:e0,useActionState:e0,useOptimistic:function(e,i){var s=vn();return Ye!==null?qm(s,Ye,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:yf,useCacheRefresh:g0};y0.useEffectEvent=a0;function Nf(e,i,s,l){i=e.memoizedState,s=s(l,i),s=s==null?i:v({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Of={enqueueSetState:function(e,i,s){e=e._reactInternals;var l=Si(),f=es(l);f.payload=i,s!=null&&(f.callback=s),i=ns(e,f,l),i!==null&&(fi(i,e,l),Ro(i,e,l))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var l=Si(),f=es(l);f.tag=1,f.payload=i,s!=null&&(f.callback=s),i=ns(e,f,l),i!==null&&(fi(i,e,l),Ro(i,e,l))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=Si(),l=es(s);l.tag=2,i!=null&&(l.callback=i),i=ns(e,l,s),i!==null&&(fi(i,e,s),Ro(i,e,s))}};function M0(e,i,s,l,f,h,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,h,y):i.prototype&&i.prototype.isPureReactComponent?!So(s,l)||!So(f,h):!0}function E0(e,i,s,l){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==e&&Of.enqueueReplaceState(i,i.state,null)}function Xs(e,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(e=e.defaultProps){s===i&&(s=v({},s));for(var f in e)s[f]===void 0&&(s[f]=e[f])}return s}function b0(e){zl(e)}function T0(e){console.error(e)}function A0(e){zl(e)}function rc(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function w0(e,i,s){try{var l=e.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function Pf(e,i,s){return s=es(s),s.tag=3,s.payload={element:null},s.callback=function(){rc(e,i)},s}function R0(e){return e=es(e),e.tag=3,e}function C0(e,i,s,l){var f=s.type.getDerivedStateFromError;if(typeof f=="function"){var h=l.value;e.payload=function(){return f(h)},e.callback=function(){w0(i,s,l)}}var y=s.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){w0(i,s,l),typeof f!="function"&&(ls===null?ls=new Set([this]):ls.add(this));var R=l.stack;this.componentDidCatch(l.value,{componentStack:R!==null?R:""})})}function US(e,i,s,l,f){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&vr(i,s,f,!0),s=gi.current,s!==null){switch(s.tag){case 31:case 13:return Ui===null?_c():s.alternate===null&&pn===0&&(pn=3),s.flags&=-257,s.flags|=65536,s.lanes=f,l===Yl?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),rh(e,l,f)),!1;case 22:return s.flags|=65536,l===Yl?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),rh(e,l,f)),!1}throw Error(a(435,s.tag))}return rh(e,l,f),_c(),!1}if(Ce)return i=gi.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,l!==$u&&(e=Error(a(422),{cause:l}),Eo(Ri(e,s)))):(l!==$u&&(i=Error(a(423),{cause:l}),Eo(Ri(i,s))),e=e.current.alternate,e.flags|=65536,f&=-f,e.lanes|=f,l=Ri(l,s),f=Pf(e.stateNode,l,f),ff(e,f),pn!==4&&(pn=2)),!1;var h=Error(a(520),{cause:l});if(h=Ri(h,s),Vo===null?Vo=[h]:Vo.push(h),pn!==4&&(pn=2),i===null)return!0;l=Ri(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=f&-f,s.lanes|=e,e=Pf(s.stateNode,l,e),ff(s,e),!1;case 1:if(i=s.type,h=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(ls===null||!ls.has(h))))return s.flags|=65536,f&=-f,s.lanes|=f,f=R0(f),C0(f,e,s,l),ff(s,f),!1}s=s.return}while(s!==null);return!1}var If=Error(a(461)),An=!1;function kn(e,i,s,l){i.child=e===null?Nm(i,null,s,l):Vs(i,e.child,s,l)}function D0(e,i,s,l,f){s=s.render;var h=i.ref;if("ref"in l){var y={};for(var R in l)R!=="ref"&&(y[R]=l[R])}else y=l;return Bs(i),l=vf(e,i,s,y,h,f),R=_f(),e!==null&&!An?(xf(e,i,f),Ta(e,i,f)):(Ce&&R&&Qu(i),i.flags|=1,kn(e,i,l,f),i.child)}function L0(e,i,s,l,f){if(e===null){var h=s.type;return typeof h=="function"&&!Zu(h)&&h.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=h,U0(e,i,h,l,f)):(e=Gl(s.type,null,l,i,i.mode,f),e.ref=i.ref,e.return=i,i.child=e)}if(h=e.child,!Xf(e,f)){var y=h.memoizedProps;if(s=s.compare,s=s!==null?s:So,s(y,l)&&e.ref===i.ref)return Ta(e,i,f)}return i.flags|=1,e=xa(h,l),e.ref=i.ref,e.return=i,i.child=e}function U0(e,i,s,l,f){if(e!==null){var h=e.memoizedProps;if(So(h,l)&&e.ref===i.ref)if(An=!1,i.pendingProps=l=h,Xf(e,f))(e.flags&131072)!==0&&(An=!0);else return i.lanes=e.lanes,Ta(e,i,f)}return zf(e,i,s,l,f)}function N0(e,i,s,l){var f=l.children,h=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(h=h!==null?h.baseLanes|s:s,e!==null){for(l=i.child=e.child,f=0;l!==null;)f=f|l.lanes|l.childLanes,l=l.sibling;l=f&~h}else l=0,i.child=null;return O0(e,i,h,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Wl(i,h!==null?h.cachePool:null),h!==null?Im(i,h):df(),zm(i);else return l=i.lanes=536870912,O0(e,i,h!==null?h.baseLanes|s:s,s,l)}else h!==null?(Wl(i,h.cachePool),Im(i,h),as(),i.memoizedState=null):(e!==null&&Wl(i,null),df(),as());return kn(e,i,f,s),i.child}function Po(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function O0(e,i,s,l,f){var h=of();return h=h===null?null:{parent:bn._currentValue,pool:h},i.memoizedState={baseLanes:s,cachePool:h},e!==null&&Wl(i,null),df(),zm(i),e!==null&&vr(e,i,l,!0),i.childLanes=f,null}function oc(e,i){return i=cc({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function P0(e,i,s){return Vs(i,e.child,null,s),e=oc(i,i.pendingProps),e.flags|=2,vi(i),i.memoizedState=null,e}function NS(e,i,s){var l=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Ce){if(l.mode==="hidden")return e=oc(i,l),i.lanes=536870912,Po(null,e);if(mf(i),(e=nn)?(e=Yg(e,Li),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ja!==null?{id:$i,overflow:ta}:null,retryLane:536870912,hydrationErrors:null},s=_m(e),s.return=i,i.child=s,Gn=i,nn=null)):e=null,e===null)throw ja(i);return i.lanes=536870912,null}return oc(i,l)}var h=e.memoizedState;if(h!==null){var y=h.dehydrated;if(mf(i),f)if(i.flags&256)i.flags&=-257,i=P0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(An||vr(e,i,s,!1),f=(s&e.childLanes)!==0,An||f){if(l=Qe,l!==null&&(y=Hn(l,s),y!==0&&y!==h.retryLane))throw h.retryLane=y,Os(e,y),fi(l,e,y),If;_c(),i=P0(e,i,s)}else e=h.treeContext,nn=Ni(y.nextSibling),Gn=i,Ce=!0,Qa=null,Li=!1,e!==null&&ym(i,e),i=oc(i,l),i.flags|=4096;return i}return e=xa(e.child,{mode:l.mode,children:l.children}),e.ref=i.ref,i.child=e,e.return=i,e}function lc(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function zf(e,i,s,l,f){return Bs(i),s=vf(e,i,s,l,void 0,f),l=_f(),e!==null&&!An?(xf(e,i,f),Ta(e,i,f)):(Ce&&l&&Qu(i),i.flags|=1,kn(e,i,s,f),i.child)}function I0(e,i,s,l,f,h){return Bs(i),i.updateQueue=null,s=Fm(i,l,s,f),Bm(e),l=_f(),e!==null&&!An?(xf(e,i,h),Ta(e,i,h)):(Ce&&l&&Qu(i),i.flags|=1,kn(e,i,s,h),i.child)}function z0(e,i,s,l,f){if(Bs(i),i.stateNode===null){var h=dr,y=s.contextType;typeof y=="object"&&y!==null&&(h=Vn(y)),h=new s(l,h),i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Of,i.stateNode=h,h._reactInternals=i,h=i.stateNode,h.props=l,h.state=i.memoizedState,h.refs={},cf(i),y=s.contextType,h.context=typeof y=="object"&&y!==null?Vn(y):dr,h.state=i.memoizedState,y=s.getDerivedStateFromProps,typeof y=="function"&&(Nf(i,s,y,l),h.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(y=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),y!==h.state&&Of.enqueueReplaceState(h,h.state,null),Do(i,l,h,f),Co(),h.state=i.memoizedState),typeof h.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(e===null){h=i.stateNode;var R=i.memoizedProps,G=Xs(s,R);h.props=G;var ot=h.context,xt=s.contextType;y=dr,typeof xt=="object"&&xt!==null&&(y=Vn(xt));var yt=s.getDerivedStateFromProps;xt=typeof yt=="function"||typeof h.getSnapshotBeforeUpdate=="function",R=i.pendingProps!==R,xt||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(R||ot!==y)&&E0(i,h,l,y),ts=!1;var ct=i.memoizedState;h.state=ct,Do(i,l,h,f),Co(),ot=i.memoizedState,R||ct!==ot||ts?(typeof yt=="function"&&(Nf(i,s,yt,l),ot=i.memoizedState),(G=ts||M0(i,s,G,l,ct,ot,y))?(xt||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(i.flags|=4194308)):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=ot),h.props=l,h.state=ot,h.context=y,l=G):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{h=i.stateNode,uf(e,i),y=i.memoizedProps,xt=Xs(s,y),h.props=xt,yt=i.pendingProps,ct=h.context,ot=s.contextType,G=dr,typeof ot=="object"&&ot!==null&&(G=Vn(ot)),R=s.getDerivedStateFromProps,(ot=typeof R=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(y!==yt||ct!==G)&&E0(i,h,l,G),ts=!1,ct=i.memoizedState,h.state=ct,Do(i,l,h,f),Co();var ht=i.memoizedState;y!==yt||ct!==ht||ts||e!==null&&e.dependencies!==null&&kl(e.dependencies)?(typeof R=="function"&&(Nf(i,s,R,l),ht=i.memoizedState),(xt=ts||M0(i,s,xt,l,ct,ht,G)||e!==null&&e.dependencies!==null&&kl(e.dependencies))?(ot||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(l,ht,G),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(l,ht,G)),typeof h.componentDidUpdate=="function"&&(i.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=ht),h.props=l,h.state=ht,h.context=G,l=xt):(typeof h.componentDidUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&ct===e.memoizedState||(i.flags|=1024),l=!1)}return h=l,lc(e,i),l=(i.flags&128)!==0,h||l?(h=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:h.render(),i.flags|=1,e!==null&&l?(i.child=Vs(i,e.child,null,f),i.child=Vs(i,null,s,f)):kn(e,i,s,f),i.memoizedState=h.state,e=i.child):e=Ta(e,i,f),e}function B0(e,i,s,l){return Is(),i.flags|=256,kn(e,i,s,l),i.child}var Bf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ff(e){return{baseLanes:e,cachePool:wm()}}function Hf(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=xi),e}function F0(e,i,s){var l=i.pendingProps,f=!1,h=(i.flags&128)!==0,y;if((y=h)||(y=e!==null&&e.memoizedState===null?!1:(gn.current&2)!==0),y&&(f=!0,i.flags&=-129),y=(i.flags&32)!==0,i.flags&=-33,e===null){if(Ce){if(f?is(i):as(),(e=nn)?(e=Yg(e,Li),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Ja!==null?{id:$i,overflow:ta}:null,retryLane:536870912,hydrationErrors:null},s=_m(e),s.return=i,i.child=s,Gn=i,nn=null)):e=null,e===null)throw ja(i);return Mh(e)?i.lanes=32:i.lanes=536870912,null}var R=l.children;return l=l.fallback,f?(as(),f=i.mode,R=cc({mode:"hidden",children:R},f),l=Ps(l,f,s,null),R.return=i,l.return=i,R.sibling=l,i.child=R,l=i.child,l.memoizedState=Ff(s),l.childLanes=Hf(e,y,s),i.memoizedState=Bf,Po(null,l)):(is(i),Gf(i,R))}var G=e.memoizedState;if(G!==null&&(R=G.dehydrated,R!==null)){if(h)i.flags&256?(is(i),i.flags&=-257,i=Vf(e,i,s)):i.memoizedState!==null?(as(),i.child=e.child,i.flags|=128,i=null):(as(),R=l.fallback,f=i.mode,l=cc({mode:"visible",children:l.children},f),R=Ps(R,f,s,null),R.flags|=2,l.return=i,R.return=i,l.sibling=R,i.child=l,Vs(i,e.child,null,s),l=i.child,l.memoizedState=Ff(s),l.childLanes=Hf(e,y,s),i.memoizedState=Bf,i=Po(null,l));else if(is(i),Mh(R)){if(y=R.nextSibling&&R.nextSibling.dataset,y)var ot=y.dgst;y=ot,l=Error(a(419)),l.stack="",l.digest=y,Eo({value:l,source:null,stack:null}),i=Vf(e,i,s)}else if(An||vr(e,i,s,!1),y=(s&e.childLanes)!==0,An||y){if(y=Qe,y!==null&&(l=Hn(y,s),l!==0&&l!==G.retryLane))throw G.retryLane=l,Os(e,l),fi(y,e,l),If;yh(R)||_c(),i=Vf(e,i,s)}else yh(R)?(i.flags|=192,i.child=e.child,i=null):(e=G.treeContext,nn=Ni(R.nextSibling),Gn=i,Ce=!0,Qa=null,Li=!1,e!==null&&ym(i,e),i=Gf(i,l.children),i.flags|=4096);return i}return f?(as(),R=l.fallback,f=i.mode,G=e.child,ot=G.sibling,l=xa(G,{mode:"hidden",children:l.children}),l.subtreeFlags=G.subtreeFlags&65011712,ot!==null?R=xa(ot,R):(R=Ps(R,f,s,null),R.flags|=2),R.return=i,l.return=i,l.sibling=R,i.child=l,Po(null,l),l=i.child,R=e.child.memoizedState,R===null?R=Ff(s):(f=R.cachePool,f!==null?(G=bn._currentValue,f=f.parent!==G?{parent:G,pool:G}:f):f=wm(),R={baseLanes:R.baseLanes|s,cachePool:f}),l.memoizedState=R,l.childLanes=Hf(e,y,s),i.memoizedState=Bf,Po(e.child,l)):(is(i),s=e.child,e=s.sibling,s=xa(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,e!==null&&(y=i.deletions,y===null?(i.deletions=[e],i.flags|=16):y.push(e)),i.child=s,i.memoizedState=null,s)}function Gf(e,i){return i=cc({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function cc(e,i){return e=mi(22,e,null,i),e.lanes=0,e}function Vf(e,i,s){return Vs(i,e.child,null,s),e=Gf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function H0(e,i,s){e.lanes|=i;var l=e.alternate;l!==null&&(l.lanes|=i),nf(e.return,i,s)}function kf(e,i,s,l,f,h){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:f,treeForkCount:h}:(y.isBackwards=i,y.rendering=null,y.renderingStartTime=0,y.last=l,y.tail=s,y.tailMode=f,y.treeForkCount=h)}function G0(e,i,s){var l=i.pendingProps,f=l.revealOrder,h=l.tail;l=l.children;var y=gn.current,R=(y&2)!==0;if(R?(y=y&1|2,i.flags|=128):y&=1,dt(gn,y),kn(e,i,l,s),l=Ce?Mo:0,!R&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&H0(e,s,i);else if(e.tag===19)H0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(f){case"forwards":for(s=i.child,f=null;s!==null;)e=s.alternate,e!==null&&Ql(e)===null&&(f=s),s=s.sibling;s=f,s===null?(f=i.child,i.child=null):(f=s.sibling,s.sibling=null),kf(i,!1,f,s,h,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,f=i.child,i.child=null;f!==null;){if(e=f.alternate,e!==null&&Ql(e)===null){i.child=f;break}e=f.sibling,f.sibling=s,s=f,f=e}kf(i,!0,s,null,h,l);break;case"together":kf(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function Ta(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),os|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(vr(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=xa(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=xa(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function Xf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&kl(e)))}function OS(e,i,s){switch(i.tag){case 3:vt(i,i.stateNode.containerInfo),$a(i,bn,e.memoizedState.cache),Is();break;case 27:case 5:Kt(i);break;case 4:vt(i,i.stateNode.containerInfo);break;case 10:$a(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,mf(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(is(i),i.flags|=128,null):(s&i.child.childLanes)!==0?F0(e,i,s):(is(i),e=Ta(e,i,s),e!==null?e.sibling:null);is(i);break;case 19:var f=(e.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(vr(e,i,s,!1),l=(s&i.childLanes)!==0),f){if(l)return G0(e,i,s);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),dt(gn,gn.current),l)break;return null;case 22:return i.lanes=0,N0(e,i,s,i.pendingProps);case 24:$a(i,bn,e.memoizedState.cache)}return Ta(e,i,s)}function V0(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)An=!0;else{if(!Xf(e,s)&&(i.flags&128)===0)return An=!1,OS(e,i,s);An=(e.flags&131072)!==0}else An=!1,Ce&&(i.flags&1048576)!==0&&Sm(i,Mo,i.index);switch(i.lanes=0,i.tag){case 16:t:{var l=i.pendingProps;if(e=Hs(i.elementType),i.type=e,typeof e=="function")Zu(e)?(l=Xs(e,l),i.tag=1,i=z0(null,i,e,l,s)):(i.tag=0,i=zf(null,i,e,l,s));else{if(e!=null){var f=e.$$typeof;if(f===A){i.tag=11,i=D0(null,i,e,l,s);break t}else if(f===I){i.tag=14,i=L0(null,i,e,l,s);break t}}throw i=H(e)||e,Error(a(306,i,""))}}return i;case 0:return zf(e,i,i.type,i.pendingProps,s);case 1:return l=i.type,f=Xs(l,i.pendingProps),z0(e,i,l,f,s);case 3:t:{if(vt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));l=i.pendingProps;var h=i.memoizedState;f=h.element,uf(e,i),Do(i,l,null,s);var y=i.memoizedState;if(l=y.cache,$a(i,bn,l),l!==h.cache&&af(i,[bn],s,!0),Co(),l=y.element,h.isDehydrated)if(h={element:l,isDehydrated:!1,cache:y.cache},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){i=B0(e,i,l,s);break t}else if(l!==f){f=Ri(Error(a(424)),i),Eo(f),i=B0(e,i,l,s);break t}else for(e=i.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,nn=Ni(e.firstChild),Gn=i,Ce=!0,Qa=null,Li=!0,s=Nm(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling;else{if(Is(),l===f){i=Ta(e,i,s);break t}kn(e,i,l,s)}i=i.child}return i;case 26:return lc(e,i),e===null?(s=$g(i.type,null,i.pendingProps,null))?i.memoizedState=s:Ce||(s=i.type,e=i.pendingProps,l=Tc(Vt.current).createElement(s),l[on]=i,l[yn]=e,Xn(l,s,e),Mn(l),i.stateNode=l):i.memoizedState=$g(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return Kt(i),e===null&&Ce&&(l=i.stateNode=Jg(i.type,i.pendingProps,Vt.current),Gn=i,Li=!0,f=nn,hs(i.type)?(Eh=f,nn=Ni(l.firstChild)):nn=f),kn(e,i,i.pendingProps.children,s),lc(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Ce&&((f=l=nn)&&(l=uy(l,i.type,i.pendingProps,Li),l!==null?(i.stateNode=l,Gn=i,nn=Ni(l.firstChild),Li=!1,f=!0):f=!1),f||ja(i)),Kt(i),f=i.type,h=i.pendingProps,y=e!==null?e.memoizedProps:null,l=h.children,_h(f,h)?l=null:y!==null&&_h(f,y)&&(i.flags|=32),i.memoizedState!==null&&(f=vf(e,i,TS,null,null,s),Jo._currentValue=f),lc(e,i),kn(e,i,l,s),i.child;case 6:return e===null&&Ce&&((e=s=nn)&&(s=fy(s,i.pendingProps,Li),s!==null?(i.stateNode=s,Gn=i,nn=null,e=!0):e=!1),e||ja(i)),null;case 13:return F0(e,i,s);case 4:return vt(i,i.stateNode.containerInfo),l=i.pendingProps,e===null?i.child=Vs(i,null,l,s):kn(e,i,l,s),i.child;case 11:return D0(e,i,i.type,i.pendingProps,s);case 7:return kn(e,i,i.pendingProps,s),i.child;case 8:return kn(e,i,i.pendingProps.children,s),i.child;case 12:return kn(e,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,$a(i,i.type,l.value),kn(e,i,l.children,s),i.child;case 9:return f=i.type._context,l=i.pendingProps.children,Bs(i),f=Vn(f),l=l(f),i.flags|=1,kn(e,i,l,s),i.child;case 14:return L0(e,i,i.type,i.pendingProps,s);case 15:return U0(e,i,i.type,i.pendingProps,s);case 19:return G0(e,i,s);case 31:return NS(e,i,s);case 22:return N0(e,i,s,i.pendingProps);case 24:return Bs(i),l=Vn(bn),e===null?(f=of(),f===null&&(f=Qe,h=sf(),f.pooledCache=h,h.refCount++,h!==null&&(f.pooledCacheLanes|=s),f=h),i.memoizedState={parent:l,cache:f},cf(i),$a(i,bn,f)):((e.lanes&s)!==0&&(uf(e,i),Do(i,null,null,s),Co()),f=e.memoizedState,h=i.memoizedState,f.parent!==l?(f={parent:l,cache:l},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),$a(i,bn,l)):(l=h.cache,$a(i,bn,l),l!==f.cache&&af(i,[bn],s,!0))),kn(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function Aa(e){e.flags|=4}function Wf(e,i,s,l,f){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(f&335544128)===f)if(e.stateNode.complete)e.flags|=8192;else if(mg())e.flags|=8192;else throw Gs=Yl,lf}else e.flags&=-16777217}function k0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!av(i))if(mg())e.flags|=8192;else throw Gs=Yl,lf}function uc(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Mt():536870912,e.lanes|=i,Cr|=i)}function Io(e,i){if(!Ce)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function an(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,l=0;if(i)for(var f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags&65011712,l|=f.flags&65011712,f.return=e,f=f.sibling;else for(f=e.child;f!==null;)s|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=e,f=f.sibling;return e.subtreeFlags|=l,e.childLanes=s,i}function PS(e,i,s){var l=i.pendingProps;switch(ju(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return an(i),null;case 1:return an(i),null;case 3:return s=i.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),Ma(bn),Rt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(gr(i)?Aa(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,tf())),an(i),null;case 26:var f=i.type,h=i.memoizedState;return e===null?(Aa(i),h!==null?(an(i),k0(i,h)):(an(i),Wf(i,f,null,l,s))):h?h!==e.memoizedState?(Aa(i),an(i),k0(i,h)):(an(i),i.flags&=-16777217):(e=e.memoizedProps,e!==l&&Aa(i),an(i),Wf(i,f,e,l,s)),null;case 27:if(Pt(i),s=Vt.current,f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&Aa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return an(i),null}e=bt.current,gr(i)?Mm(i):(e=Jg(f,l,s),i.stateNode=e,Aa(i))}return an(i),null;case 5:if(Pt(i),f=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&Aa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return an(i),null}if(h=bt.current,gr(i))Mm(i);else{var y=Tc(Vt.current);switch(h){case 1:h=y.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:h=y.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":h=y.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":h=y.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":h=y.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof l.is=="string"?y.createElement("select",{is:l.is}):y.createElement("select"),l.multiple?h.multiple=!0:l.size&&(h.size=l.size);break;default:h=typeof l.is=="string"?y.createElement(f,{is:l.is}):y.createElement(f)}}h[on]=i,h[yn]=l;t:for(y=i.child;y!==null;){if(y.tag===5||y.tag===6)h.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===i)break t;for(;y.sibling===null;){if(y.return===null||y.return===i)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}i.stateNode=h;t:switch(Xn(h,f,l),f){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&Aa(i)}}return an(i),Wf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==l&&Aa(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(e=Vt.current,gr(i)){if(e=i.stateNode,s=i.memoizedProps,l=null,f=Gn,f!==null)switch(f.tag){case 27:case 5:l=f.memoizedProps}e[on]=i,e=!!(e.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||Fg(e.nodeValue,s)),e||ja(i,!0)}else e=Tc(e).createTextNode(l),e[on]=i,i.stateNode=e}return an(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(l=gr(i),s!==null){if(e===null){if(!l)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[on]=i}else Is(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;an(i),e=!1}else s=tf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(vi(i),i):(vi(i),null);if((i.flags&128)!==0)throw Error(a(558))}return an(i),null;case 13:if(l=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(f=gr(i),l!==null&&l.dehydrated!==null){if(e===null){if(!f)throw Error(a(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(a(317));f[on]=i}else Is(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;an(i),f=!1}else f=tf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?(vi(i),i):(vi(i),null)}return vi(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,e=e!==null&&e.memoizedState!==null,s&&(l=i.child,f=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(f=l.alternate.memoizedState.cachePool.pool),h=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(h=l.memoizedState.cachePool.pool),h!==f&&(l.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),uc(i,i.updateQueue),an(i),null);case 4:return Rt(),e===null&&dh(i.stateNode.containerInfo),an(i),null;case 10:return Ma(i.type),an(i),null;case 19:if(tt(gn),l=i.memoizedState,l===null)return an(i),null;if(f=(i.flags&128)!==0,h=l.rendering,h===null)if(f)Io(l,!1);else{if(pn!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(h=Ql(e),h!==null){for(i.flags|=128,Io(l,!1),e=h.updateQueue,i.updateQueue=e,uc(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)vm(s,e),s=s.sibling;return dt(gn,gn.current&1|2),Ce&&Sa(i,l.treeForkCount),i.child}e=e.sibling}l.tail!==null&&Ie()>mc&&(i.flags|=128,f=!0,Io(l,!1),i.lanes=4194304)}else{if(!f)if(e=Ql(h),e!==null){if(i.flags|=128,f=!0,e=e.updateQueue,i.updateQueue=e,uc(i,e),Io(l,!0),l.tail===null&&l.tailMode==="hidden"&&!h.alternate&&!Ce)return an(i),null}else 2*Ie()-l.renderingStartTime>mc&&s!==536870912&&(i.flags|=128,f=!0,Io(l,!1),i.lanes=4194304);l.isBackwards?(h.sibling=i.child,i.child=h):(e=l.last,e!==null?e.sibling=h:i.child=h,l.last=h)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=Ie(),e.sibling=null,s=gn.current,dt(gn,f?s&1|2:s&1),Ce&&Sa(i,l.treeForkCount),e):(an(i),null);case 22:case 23:return vi(i),pf(),l=i.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(an(i),i.subtreeFlags&6&&(i.flags|=8192)):an(i),s=i.updateQueue,s!==null&&uc(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),e!==null&&tt(Fs),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),Ma(bn),an(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function IS(e,i){switch(ju(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return Ma(bn),Rt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return Pt(i),null;case 31:if(i.memoizedState!==null){if(vi(i),i.alternate===null)throw Error(a(340));Is()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(vi(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));Is()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return tt(gn),null;case 4:return Rt(),null;case 10:return Ma(i.type),null;case 22:case 23:return vi(i),pf(),e!==null&&tt(Fs),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return Ma(bn),null;case 25:return null;default:return null}}function X0(e,i){switch(ju(i),i.tag){case 3:Ma(bn),Rt();break;case 26:case 27:case 5:Pt(i);break;case 4:Rt();break;case 31:i.memoizedState!==null&&vi(i);break;case 13:vi(i);break;case 19:tt(gn);break;case 10:Ma(i.type);break;case 22:case 23:vi(i),pf(),e!==null&&tt(Fs);break;case 24:Ma(bn)}}function zo(e,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var f=l.next;s=f;do{if((s.tag&e)===e){l=void 0;var h=s.create,y=s.inst;l=h(),y.destroy=l}s=s.next}while(s!==f)}}catch(R){Xe(i,i.return,R)}}function ss(e,i,s){try{var l=i.updateQueue,f=l!==null?l.lastEffect:null;if(f!==null){var h=f.next;l=h;do{if((l.tag&e)===e){var y=l.inst,R=y.destroy;if(R!==void 0){y.destroy=void 0,f=i;var G=s,ot=R;try{ot()}catch(xt){Xe(f,G,xt)}}}l=l.next}while(l!==h)}}catch(xt){Xe(i,i.return,xt)}}function W0(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{Pm(i,s)}catch(l){Xe(e,e.return,l)}}}function q0(e,i,s){s.props=Xs(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(l){Xe(e,i,l)}}function Bo(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof s=="function"?e.refCleanup=s(l):s.current=l}}catch(f){Xe(e,i,f)}}function ea(e,i){var s=e.ref,l=e.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(f){Xe(e,i,f)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(f){Xe(e,i,f)}else s.current=null}function Y0(e){var i=e.type,s=e.memoizedProps,l=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break t;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(f){Xe(e,e.return,f)}}function qf(e,i,s){try{var l=e.stateNode;ay(l,e.type,s,i),l[yn]=i}catch(f){Xe(e,e.return,f)}}function Z0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&hs(e.type)||e.tag===4}function Yf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Z0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&hs(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Zf(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Ai));else if(l!==4&&(l===27&&hs(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(Zf(e,i,s),e=e.sibling;e!==null;)Zf(e,i,s),e=e.sibling}function fc(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(l!==4&&(l===27&&hs(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(fc(e,i,s),e=e.sibling;e!==null;)fc(e,i,s),e=e.sibling}function K0(e){var i=e.stateNode,s=e.memoizedProps;try{for(var l=e.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);Xn(i,l,s),i[on]=e,i[yn]=s}catch(h){Xe(e,e.return,h)}}var wa=!1,wn=!1,Kf=!1,J0=typeof WeakSet=="function"?WeakSet:Set,zn=null;function zS(e,i){if(e=e.containerInfo,gh=Uc,e=lm(e),Gu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var f=l.anchorOffset,h=l.focusNode;l=l.focusOffset;try{s.nodeType,h.nodeType}catch{s=null;break t}var y=0,R=-1,G=-1,ot=0,xt=0,yt=e,ct=null;e:for(;;){for(var ht;yt!==s||f!==0&&yt.nodeType!==3||(R=y+f),yt!==h||l!==0&&yt.nodeType!==3||(G=y+l),yt.nodeType===3&&(y+=yt.nodeValue.length),(ht=yt.firstChild)!==null;)ct=yt,yt=ht;for(;;){if(yt===e)break e;if(ct===s&&++ot===f&&(R=y),ct===h&&++xt===l&&(G=y),(ht=yt.nextSibling)!==null)break;yt=ct,ct=yt.parentNode}yt=ht}s=R===-1||G===-1?null:{start:R,end:G}}else s=null}s=s||{start:0,end:0}}else s=null;for(vh={focusedElem:e,selectionRange:s},Uc=!1,zn=i;zn!==null;)if(i=zn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,zn=e;else for(;zn!==null;){switch(i=zn,h=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)f=e[s],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,s=i,f=h.memoizedProps,h=h.memoizedState,l=s.stateNode;try{var $t=Xs(s.type,f);e=l.getSnapshotBeforeUpdate($t,h),l.__reactInternalSnapshotBeforeUpdate=e}catch(re){Xe(s,s.return,re)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)Sh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Sh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,zn=e;break}zn=i.return}}function Q0(e,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:Ca(e,s),l&4&&zo(5,s);break;case 1:if(Ca(e,s),l&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(y){Xe(s,s.return,y)}else{var f=Xs(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(f,i,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Xe(s,s.return,y)}}l&64&&W0(s),l&512&&Bo(s,s.return);break;case 3:if(Ca(e,s),l&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{Pm(e,i)}catch(y){Xe(s,s.return,y)}}break;case 27:i===null&&l&4&&K0(s);case 26:case 5:Ca(e,s),i===null&&l&4&&Y0(s),l&512&&Bo(s,s.return);break;case 12:Ca(e,s);break;case 31:Ca(e,s),l&4&&tg(e,s);break;case 13:Ca(e,s),l&4&&eg(e,s),l&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=qS.bind(null,s),hy(e,s))));break;case 22:if(l=s.memoizedState!==null||wa,!l){i=i!==null&&i.memoizedState!==null||wn,f=wa;var h=wn;wa=l,(wn=i)&&!h?Da(e,s,(s.subtreeFlags&8772)!==0):Ca(e,s),wa=f,wn=h}break;case 30:break;default:Ca(e,s)}}function j0(e){var i=e.alternate;i!==null&&(e.alternate=null,j0(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&qa(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var cn=null,oi=!1;function Ra(e,i,s){for(s=s.child;s!==null;)$0(e,i,s),s=s.sibling}function $0(e,i,s){if(gt&&typeof gt.onCommitFiberUnmount=="function")try{gt.onCommitFiberUnmount(pt,s)}catch{}switch(s.tag){case 26:wn||ea(s,i),Ra(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:wn||ea(s,i);var l=cn,f=oi;hs(s.type)&&(cn=s.stateNode,oi=!1),Ra(e,i,s),Yo(s.stateNode),cn=l,oi=f;break;case 5:wn||ea(s,i);case 6:if(l=cn,f=oi,cn=null,Ra(e,i,s),cn=l,oi=f,cn!==null)if(oi)try{(cn.nodeType===9?cn.body:cn.nodeName==="HTML"?cn.ownerDocument.body:cn).removeChild(s.stateNode)}catch(h){Xe(s,i,h)}else try{cn.removeChild(s.stateNode)}catch(h){Xe(s,i,h)}break;case 18:cn!==null&&(oi?(e=cn,Wg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),zr(e)):Wg(cn,s.stateNode));break;case 4:l=cn,f=oi,cn=s.stateNode.containerInfo,oi=!0,Ra(e,i,s),cn=l,oi=f;break;case 0:case 11:case 14:case 15:ss(2,s,i),wn||ss(4,s,i),Ra(e,i,s);break;case 1:wn||(ea(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&q0(s,i,l)),Ra(e,i,s);break;case 21:Ra(e,i,s);break;case 22:wn=(l=wn)||s.memoizedState!==null,Ra(e,i,s),wn=l;break;default:Ra(e,i,s)}}function tg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{zr(e)}catch(s){Xe(i,i.return,s)}}}function eg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{zr(e)}catch(s){Xe(i,i.return,s)}}function BS(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new J0),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new J0),i;default:throw Error(a(435,e.tag))}}function hc(e,i){var s=BS(e);i.forEach(function(l){if(!s.has(l)){s.add(l);var f=YS.bind(null,e,l);l.then(f,f)}})}function li(e,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var f=s[l],h=e,y=i,R=y;t:for(;R!==null;){switch(R.tag){case 27:if(hs(R.type)){cn=R.stateNode,oi=!1;break t}break;case 5:cn=R.stateNode,oi=!1;break t;case 3:case 4:cn=R.stateNode.containerInfo,oi=!0;break t}R=R.return}if(cn===null)throw Error(a(160));$0(h,y,f),cn=null,oi=!1,h=f.alternate,h!==null&&(h.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)ng(i,e),i=i.sibling}var Hi=null;function ng(e,i){var s=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:li(i,e),ci(e),l&4&&(ss(3,e,e.return),zo(3,e),ss(5,e,e.return));break;case 1:li(i,e),ci(e),l&512&&(wn||s===null||ea(s,s.return)),l&64&&wa&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var f=Hi;if(li(i,e),ci(e),l&512&&(wn||s===null||ea(s,s.return)),l&4){var h=s!==null?s.memoizedState:null;if(l=e.memoizedState,s===null)if(l===null)if(e.stateNode===null){t:{l=e.type,s=e.memoizedProps,f=f.ownerDocument||f;e:switch(l){case"title":h=f.getElementsByTagName("title")[0],(!h||h[Wa]||h[on]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=f.createElement(l),f.head.insertBefore(h,f.querySelector("head > title"))),Xn(h,l,s),h[on]=e,Mn(h),l=h;break t;case"link":var y=nv("link","href",f).get(l+(s.href||""));if(y){for(var R=0;R<y.length;R++)if(h=y[R],h.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&h.getAttribute("rel")===(s.rel==null?null:s.rel)&&h.getAttribute("title")===(s.title==null?null:s.title)&&h.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){y.splice(R,1);break e}}h=f.createElement(l),Xn(h,l,s),f.head.appendChild(h);break;case"meta":if(y=nv("meta","content",f).get(l+(s.content||""))){for(R=0;R<y.length;R++)if(h=y[R],h.getAttribute("content")===(s.content==null?null:""+s.content)&&h.getAttribute("name")===(s.name==null?null:s.name)&&h.getAttribute("property")===(s.property==null?null:s.property)&&h.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&h.getAttribute("charset")===(s.charSet==null?null:s.charSet)){y.splice(R,1);break e}}h=f.createElement(l),Xn(h,l,s),f.head.appendChild(h);break;default:throw Error(a(468,l))}h[on]=e,Mn(h),l=h}e.stateNode=l}else iv(f,e.type,e.stateNode);else e.stateNode=ev(f,l,e.memoizedProps);else h!==l?(h===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):h.count--,l===null?iv(f,e.type,e.stateNode):ev(f,l,e.memoizedProps)):l===null&&e.stateNode!==null&&qf(e,e.memoizedProps,s.memoizedProps)}break;case 27:li(i,e),ci(e),l&512&&(wn||s===null||ea(s,s.return)),s!==null&&l&4&&qf(e,e.memoizedProps,s.memoizedProps);break;case 5:if(li(i,e),ci(e),l&512&&(wn||s===null||ea(s,s.return)),e.flags&32){f=e.stateNode;try{ti(f,"")}catch($t){Xe(e,e.return,$t)}}l&4&&e.stateNode!=null&&(f=e.memoizedProps,qf(e,f,s!==null?s.memoizedProps:f)),l&1024&&(Kf=!0);break;case 6:if(li(i,e),ci(e),l&4){if(e.stateNode===null)throw Error(a(162));l=e.memoizedProps,s=e.stateNode;try{s.nodeValue=l}catch($t){Xe(e,e.return,$t)}}break;case 3:if(Rc=null,f=Hi,Hi=Ac(i.containerInfo),li(i,e),Hi=f,ci(e),l&4&&s!==null&&s.memoizedState.isDehydrated)try{zr(i.containerInfo)}catch($t){Xe(e,e.return,$t)}Kf&&(Kf=!1,ig(e));break;case 4:l=Hi,Hi=Ac(e.stateNode.containerInfo),li(i,e),ci(e),Hi=l;break;case 12:li(i,e),ci(e);break;case 31:li(i,e),ci(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,hc(e,l)));break;case 13:li(i,e),ci(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(pc=Ie()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,hc(e,l)));break;case 22:f=e.memoizedState!==null;var G=s!==null&&s.memoizedState!==null,ot=wa,xt=wn;if(wa=ot||f,wn=xt||G,li(i,e),wn=xt,wa=ot,ci(e),l&8192)t:for(i=e.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(s===null||G||wa||wn||Ws(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){G=s=i;try{if(h=G.stateNode,f)y=h.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{R=G.stateNode;var yt=G.memoizedProps.style,ct=yt!=null&&yt.hasOwnProperty("display")?yt.display:null;R.style.display=ct==null||typeof ct=="boolean"?"":(""+ct).trim()}}catch($t){Xe(G,G.return,$t)}}}else if(i.tag===6){if(s===null){G=i;try{G.stateNode.nodeValue=f?"":G.memoizedProps}catch($t){Xe(G,G.return,$t)}}}else if(i.tag===18){if(s===null){G=i;try{var ht=G.stateNode;f?qg(ht,!0):qg(G.stateNode,!1)}catch($t){Xe(G,G.return,$t)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=e.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,hc(e,s))));break;case 19:li(i,e),ci(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,hc(e,l)));break;case 30:break;case 21:break;default:li(i,e),ci(e)}}function ci(e){var i=e.flags;if(i&2){try{for(var s,l=e.return;l!==null;){if(Z0(l)){s=l;break}l=l.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var f=s.stateNode,h=Yf(e);fc(e,h,f);break;case 5:var y=s.stateNode;s.flags&32&&(ti(y,""),s.flags&=-33);var R=Yf(e);fc(e,R,y);break;case 3:case 4:var G=s.stateNode.containerInfo,ot=Yf(e);Zf(e,ot,G);break;default:throw Error(a(161))}}catch(xt){Xe(e,e.return,xt)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function ig(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;ig(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function Ca(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)Q0(e,i.alternate,i),i=i.sibling}function Ws(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:ss(4,i,i.return),Ws(i);break;case 1:ea(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&q0(i,i.return,s),Ws(i);break;case 27:Yo(i.stateNode);case 26:case 5:ea(i,i.return),Ws(i);break;case 22:i.memoizedState===null&&Ws(i);break;case 30:Ws(i);break;default:Ws(i)}e=e.sibling}}function Da(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,f=e,h=i,y=h.flags;switch(h.tag){case 0:case 11:case 15:Da(f,h,s),zo(4,h);break;case 1:if(Da(f,h,s),l=h,f=l.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(ot){Xe(l,l.return,ot)}if(l=h,f=l.updateQueue,f!==null){var R=l.stateNode;try{var G=f.shared.hiddenCallbacks;if(G!==null)for(f.shared.hiddenCallbacks=null,f=0;f<G.length;f++)Om(G[f],R)}catch(ot){Xe(l,l.return,ot)}}s&&y&64&&W0(h),Bo(h,h.return);break;case 27:K0(h);case 26:case 5:Da(f,h,s),s&&l===null&&y&4&&Y0(h),Bo(h,h.return);break;case 12:Da(f,h,s);break;case 31:Da(f,h,s),s&&y&4&&tg(f,h);break;case 13:Da(f,h,s),s&&y&4&&eg(f,h);break;case 22:h.memoizedState===null&&Da(f,h,s),Bo(h,h.return);break;case 30:break;default:Da(f,h,s)}i=i.sibling}}function Jf(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&bo(s))}function Qf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&bo(e))}function Gi(e,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)ag(e,i,s,l),i=i.sibling}function ag(e,i,s,l){var f=i.flags;switch(i.tag){case 0:case 11:case 15:Gi(e,i,s,l),f&2048&&zo(9,i);break;case 1:Gi(e,i,s,l);break;case 3:Gi(e,i,s,l),f&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&bo(e)));break;case 12:if(f&2048){Gi(e,i,s,l),e=i.stateNode;try{var h=i.memoizedProps,y=h.id,R=h.onPostCommit;typeof R=="function"&&R(y,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(G){Xe(i,i.return,G)}}else Gi(e,i,s,l);break;case 31:Gi(e,i,s,l);break;case 13:Gi(e,i,s,l);break;case 23:break;case 22:h=i.stateNode,y=i.alternate,i.memoizedState!==null?h._visibility&2?Gi(e,i,s,l):Fo(e,i):h._visibility&2?Gi(e,i,s,l):(h._visibility|=2,Ar(e,i,s,l,(i.subtreeFlags&10256)!==0||!1)),f&2048&&Jf(y,i);break;case 24:Gi(e,i,s,l),f&2048&&Qf(i.alternate,i);break;default:Gi(e,i,s,l)}}function Ar(e,i,s,l,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var h=e,y=i,R=s,G=l,ot=y.flags;switch(y.tag){case 0:case 11:case 15:Ar(h,y,R,G,f),zo(8,y);break;case 23:break;case 22:var xt=y.stateNode;y.memoizedState!==null?xt._visibility&2?Ar(h,y,R,G,f):Fo(h,y):(xt._visibility|=2,Ar(h,y,R,G,f)),f&&ot&2048&&Jf(y.alternate,y);break;case 24:Ar(h,y,R,G,f),f&&ot&2048&&Qf(y.alternate,y);break;default:Ar(h,y,R,G,f)}i=i.sibling}}function Fo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,l=i,f=l.flags;switch(l.tag){case 22:Fo(s,l),f&2048&&Jf(l.alternate,l);break;case 24:Fo(s,l),f&2048&&Qf(l.alternate,l);break;default:Fo(s,l)}i=i.sibling}}var Ho=8192;function wr(e,i,s){if(e.subtreeFlags&Ho)for(e=e.child;e!==null;)sg(e,i,s),e=e.sibling}function sg(e,i,s){switch(e.tag){case 26:wr(e,i,s),e.flags&Ho&&e.memoizedState!==null&&by(s,Hi,e.memoizedState,e.memoizedProps);break;case 5:wr(e,i,s);break;case 3:case 4:var l=Hi;Hi=Ac(e.stateNode.containerInfo),wr(e,i,s),Hi=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=Ho,Ho=16777216,wr(e,i,s),Ho=l):wr(e,i,s));break;default:wr(e,i,s)}}function rg(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Go(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];zn=l,lg(l,e)}rg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)og(e),e=e.sibling}function og(e){switch(e.tag){case 0:case 11:case 15:Go(e),e.flags&2048&&ss(9,e,e.return);break;case 3:Go(e);break;case 12:Go(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,dc(e)):Go(e);break;default:Go(e)}}function dc(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];zn=l,lg(l,e)}rg(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:ss(8,i,i.return),dc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,dc(i));break;default:dc(i)}e=e.sibling}}function lg(e,i){for(;zn!==null;){var s=zn;switch(s.tag){case 0:case 11:case 15:ss(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:bo(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,zn=l;else t:for(s=e;zn!==null;){l=zn;var f=l.sibling,h=l.return;if(j0(l),l===s){zn=null;break t}if(f!==null){f.return=h,zn=f;break t}zn=h}}}var FS={getCacheForType:function(e){var i=Vn(bn),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return Vn(bn).controller.signal}},HS=typeof WeakMap=="function"?WeakMap:Map,Ge=0,Qe=null,be=null,Ae=0,ke=0,_i=null,rs=!1,Rr=!1,jf=!1,La=0,pn=0,os=0,qs=0,$f=0,xi=0,Cr=0,Vo=null,ui=null,th=!1,pc=0,cg=0,mc=1/0,gc=null,ls=null,Un=0,cs=null,Dr=null,Ua=0,eh=0,nh=null,ug=null,ko=0,ih=null;function Si(){return(Ge&2)!==0&&Ae!==0?Ae&-Ae:F.T!==null?ch():ne()}function fg(){if(xi===0)if((Ae&536870912)===0||Ce){var e=oe;oe<<=1,(oe&3932160)===0&&(oe=262144),xi=e}else xi=536870912;return e=gi.current,e!==null&&(e.flags|=32),xi}function fi(e,i,s){(e===Qe&&(ke===2||ke===9)||e.cancelPendingCommit!==null)&&(Lr(e,0),us(e,Ae,xi,!1)),Zt(e,s),((Ge&2)===0||e!==Qe)&&(e===Qe&&((Ge&2)===0&&(qs|=s),pn===4&&us(e,Ae,xi,!1)),na(e))}function hg(e,i,s){if((Ge&6)!==0)throw Error(a(327));var l=!s&&(i&127)===0&&(i&e.expiredLanes)===0||wt(e,i),f=l?kS(e,i):sh(e,i,!0),h=l;do{if(f===0){Rr&&!l&&us(e,i,0,!1);break}else{if(s=e.current.alternate,h&&!GS(s)){f=sh(e,i,!1),h=!1;continue}if(f===2){if(h=i,e.errorRecoveryDisabledLanes&h)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){i=y;t:{var R=e;f=Vo;var G=R.current.memoizedState.isDehydrated;if(G&&(Lr(R,y).flags|=256),y=sh(R,y,!1),y!==2){if(jf&&!G){R.errorRecoveryDisabledLanes|=h,qs|=h,f=4;break t}h=ui,ui=f,h!==null&&(ui===null?ui=h:ui.push.apply(ui,h))}f=y}if(h=!1,f!==2)continue}}if(f===1){Lr(e,0),us(e,i,0,!0);break}t:{switch(l=e,h=f,h){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:us(l,i,xi,!rs);break t;case 2:ui=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(f=pc+300-Ie(),10<f)){if(us(l,i,xi,!rs),_t(l,0,!0)!==0)break t;Ua=i,l.timeoutHandle=kg(dg.bind(null,l,s,ui,gc,th,i,xi,qs,Cr,rs,h,"Throttled",-0,0),f);break t}dg(l,s,ui,gc,th,i,xi,qs,Cr,rs,h,null,-0,0)}}break}while(!0);na(e)}function dg(e,i,s,l,f,h,y,R,G,ot,xt,yt,ct,ht){if(e.timeoutHandle=-1,yt=i.subtreeFlags,yt&8192||(yt&16785408)===16785408){yt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ai},sg(i,h,yt);var $t=(h&62914560)===h?pc-Ie():(h&4194048)===h?cg-Ie():0;if($t=Ty(yt,$t),$t!==null){Ua=h,e.cancelPendingCommit=$t(yg.bind(null,e,i,h,s,l,f,y,R,G,xt,yt,null,ct,ht)),us(e,h,y,!ot);return}}yg(e,i,h,s,l,f,y,R,G)}function GS(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var f=s[l],h=f.getSnapshot;f=f.value;try{if(!pi(h(),f))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function us(e,i,s,l){i&=~$f,i&=~qs,e.suspendedLanes|=i,e.pingedLanes&=~i,l&&(e.warmLanes|=i),l=e.expirationTimes;for(var f=i;0<f;){var h=31-Ft(f),y=1<<h;l[h]=-1,f&=~y}s!==0&&Se(e,s,i)}function vc(){return(Ge&6)===0?(Xo(0),!1):!0}function ah(){if(be!==null){if(ke===0)var e=be.return;else e=be,ya=zs=null,Sf(e),yr=null,Ao=0,e=be;for(;e!==null;)X0(e.alternate,e),e=e.return;be=null}}function Lr(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,oy(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),Ua=0,ah(),Qe=e,be=s=xa(e.current,null),Ae=i,ke=0,_i=null,rs=!1,Rr=wt(e,i),jf=!1,Cr=xi=$f=qs=os=pn=0,ui=Vo=null,th=!1,(i&8)!==0&&(i|=i&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=i;0<l;){var f=31-Ft(l),h=1<<f;i|=e[f],l&=~h}return La=i,Bl(),s}function pg(e,i){me=null,F.H=Oo,i===Sr||i===ql?(i=Dm(),ke=3):i===lf?(i=Dm(),ke=4):ke=i===If?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,_i=i,be===null&&(pn=1,rc(e,Ri(i,e.current)))}function mg(){var e=gi.current;return e===null?!0:(Ae&4194048)===Ae?Ui===null:(Ae&62914560)===Ae||(Ae&536870912)!==0?e===Ui:!1}function gg(){var e=F.H;return F.H=Oo,e===null?Oo:e}function vg(){var e=F.A;return F.A=FS,e}function _c(){pn=4,rs||(Ae&4194048)!==Ae&&gi.current!==null||(Rr=!0),(os&134217727)===0&&(qs&134217727)===0||Qe===null||us(Qe,Ae,xi,!1)}function sh(e,i,s){var l=Ge;Ge|=2;var f=gg(),h=vg();(Qe!==e||Ae!==i)&&(gc=null,Lr(e,i)),i=!1;var y=pn;t:do try{if(ke!==0&&be!==null){var R=be,G=_i;switch(ke){case 8:ah(),y=6;break t;case 3:case 2:case 9:case 6:gi.current===null&&(i=!0);var ot=ke;if(ke=0,_i=null,Ur(e,R,G,ot),s&&Rr){y=0;break t}break;default:ot=ke,ke=0,_i=null,Ur(e,R,G,ot)}}VS(),y=pn;break}catch(xt){pg(e,xt)}while(!0);return i&&e.shellSuspendCounter++,ya=zs=null,Ge=l,F.H=f,F.A=h,be===null&&(Qe=null,Ae=0,Bl()),y}function VS(){for(;be!==null;)_g(be)}function kS(e,i){var s=Ge;Ge|=2;var l=gg(),f=vg();Qe!==e||Ae!==i?(gc=null,mc=Ie()+500,Lr(e,i)):Rr=wt(e,i);t:do try{if(ke!==0&&be!==null){i=be;var h=_i;e:switch(ke){case 1:ke=0,_i=null,Ur(e,i,h,1);break;case 2:case 9:if(Rm(h)){ke=0,_i=null,xg(i);break}i=function(){ke!==2&&ke!==9||Qe!==e||(ke=7),na(e)},h.then(i,i);break t;case 3:ke=7;break t;case 4:ke=5;break t;case 7:Rm(h)?(ke=0,_i=null,xg(i)):(ke=0,_i=null,Ur(e,i,h,7));break;case 5:var y=null;switch(be.tag){case 26:y=be.memoizedState;case 5:case 27:var R=be;if(y?av(y):R.stateNode.complete){ke=0,_i=null;var G=R.sibling;if(G!==null)be=G;else{var ot=R.return;ot!==null?(be=ot,xc(ot)):be=null}break e}}ke=0,_i=null,Ur(e,i,h,5);break;case 6:ke=0,_i=null,Ur(e,i,h,6);break;case 8:ah(),pn=6;break t;default:throw Error(a(462))}}XS();break}catch(xt){pg(e,xt)}while(!0);return ya=zs=null,F.H=l,F.A=f,Ge=s,be!==null?0:(Qe=null,Ae=0,Bl(),pn)}function XS(){for(;be!==null&&!sn();)_g(be)}function _g(e){var i=V0(e.alternate,e,La);e.memoizedProps=e.pendingProps,i===null?xc(e):be=i}function xg(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=I0(s,i,i.pendingProps,i.type,void 0,Ae);break;case 11:i=I0(s,i,i.pendingProps,i.type.render,i.ref,Ae);break;case 5:Sf(i);default:X0(s,i),i=be=vm(i,La),i=V0(s,i,La)}e.memoizedProps=e.pendingProps,i===null?xc(e):be=i}function Ur(e,i,s,l){ya=zs=null,Sf(i),yr=null,Ao=0;var f=i.return;try{if(US(e,f,i,s,Ae)){pn=1,rc(e,Ri(s,e.current)),be=null;return}}catch(h){if(f!==null)throw be=f,h;pn=1,rc(e,Ri(s,e.current)),be=null;return}i.flags&32768?(Ce||l===1?e=!0:Rr||(Ae&536870912)!==0?e=!1:(rs=e=!0,(l===2||l===9||l===3||l===6)&&(l=gi.current,l!==null&&l.tag===13&&(l.flags|=16384))),Sg(i,e)):xc(i)}function xc(e){var i=e;do{if((i.flags&32768)!==0){Sg(i,rs);return}e=i.return;var s=PS(i.alternate,i,La);if(s!==null){be=s;return}if(i=i.sibling,i!==null){be=i;return}be=i=e}while(i!==null);pn===0&&(pn=5)}function Sg(e,i){do{var s=IS(e.alternate,e);if(s!==null){s.flags&=32767,be=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){be=e;return}be=e=s}while(e!==null);pn=6,be=null}function yg(e,i,s,l,f,h,y,R,G){e.cancelPendingCommit=null;do Sc();while(Un!==0);if((Ge&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(h=i.lanes|i.childLanes,h|=qu,Ve(e,s,h,y,R,G),e===Qe&&(be=Qe=null,Ae=0),Dr=i,cs=e,Ua=s,eh=h,nh=f,ug=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,ZS(j,function(){return Ag(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=F.T,F.T=null,f=k.p,k.p=2,y=Ge,Ge|=4;try{zS(e,i,s)}finally{Ge=y,k.p=f,F.T=l}}Un=1,Mg(),Eg(),bg()}}function Mg(){if(Un===1){Un=0;var e=cs,i=Dr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=F.T,F.T=null;var l=k.p;k.p=2;var f=Ge;Ge|=4;try{ng(i,e);var h=vh,y=lm(e.containerInfo),R=h.focusedElem,G=h.selectionRange;if(y!==R&&R&&R.ownerDocument&&om(R.ownerDocument.documentElement,R)){if(G!==null&&Gu(R)){var ot=G.start,xt=G.end;if(xt===void 0&&(xt=ot),"selectionStart"in R)R.selectionStart=ot,R.selectionEnd=Math.min(xt,R.value.length);else{var yt=R.ownerDocument||document,ct=yt&&yt.defaultView||window;if(ct.getSelection){var ht=ct.getSelection(),$t=R.textContent.length,re=Math.min(G.start,$t),Ke=G.end===void 0?re:Math.min(G.end,$t);!ht.extend&&re>Ke&&(y=Ke,Ke=re,re=y);var $=rm(R,re),Z=rm(R,Ke);if($&&Z&&(ht.rangeCount!==1||ht.anchorNode!==$.node||ht.anchorOffset!==$.offset||ht.focusNode!==Z.node||ht.focusOffset!==Z.offset)){var st=yt.createRange();st.setStart($.node,$.offset),ht.removeAllRanges(),re>Ke?(ht.addRange(st),ht.extend(Z.node,Z.offset)):(st.setEnd(Z.node,Z.offset),ht.addRange(st))}}}}for(yt=[],ht=R;ht=ht.parentNode;)ht.nodeType===1&&yt.push({element:ht,left:ht.scrollLeft,top:ht.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<yt.length;R++){var St=yt[R];St.element.scrollLeft=St.left,St.element.scrollTop=St.top}}Uc=!!gh,vh=gh=null}finally{Ge=f,k.p=l,F.T=s}}e.current=i,Un=2}}function Eg(){if(Un===2){Un=0;var e=cs,i=Dr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=F.T,F.T=null;var l=k.p;k.p=2;var f=Ge;Ge|=4;try{Q0(e,i.alternate,i)}finally{Ge=f,k.p=l,F.T=s}}Un=3}}function bg(){if(Un===4||Un===3){Un=0,J();var e=cs,i=Dr,s=Ua,l=ug;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?Un=5:(Un=0,Dr=cs=null,Tg(e,e.pendingLanes));var f=e.pendingLanes;if(f===0&&(ls=null),Et(s),i=i.stateNode,gt&&typeof gt.onCommitFiberRoot=="function")try{gt.onCommitFiberRoot(pt,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=F.T,f=k.p,k.p=2,F.T=null;try{for(var h=e.onRecoverableError,y=0;y<l.length;y++){var R=l[y];h(R.value,{componentStack:R.stack})}}finally{F.T=i,k.p=f}}(Ua&3)!==0&&Sc(),na(e),f=e.pendingLanes,(s&261930)!==0&&(f&42)!==0?e===ih?ko++:(ko=0,ih=e):ko=0,Xo(0)}}function Tg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,bo(i)))}function Sc(){return Mg(),Eg(),bg(),Ag()}function Ag(){if(Un!==5)return!1;var e=cs,i=eh;eh=0;var s=Et(Ua),l=F.T,f=k.p;try{k.p=32>s?32:s,F.T=null,s=nh,nh=null;var h=cs,y=Ua;if(Un=0,Dr=cs=null,Ua=0,(Ge&6)!==0)throw Error(a(331));var R=Ge;if(Ge|=4,og(h.current),ag(h,h.current,y,s),Ge=R,Xo(0,!1),gt&&typeof gt.onPostCommitFiberRoot=="function")try{gt.onPostCommitFiberRoot(pt,h)}catch{}return!0}finally{k.p=f,F.T=l,Tg(e,i)}}function wg(e,i,s){i=Ri(s,i),i=Pf(e.stateNode,i,2),e=ns(e,i,2),e!==null&&(Zt(e,2),na(e))}function Xe(e,i,s){if(e.tag===3)wg(e,e,s);else for(;i!==null;){if(i.tag===3){wg(i,e,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(ls===null||!ls.has(l))){e=Ri(s,e),s=R0(2),l=ns(i,s,2),l!==null&&(C0(s,l,i,e),Zt(l,2),na(l));break}}i=i.return}}function rh(e,i,s){var l=e.pingCache;if(l===null){l=e.pingCache=new HS;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(s)||(jf=!0,f.add(s),e=WS.bind(null,e,i,s),i.then(e,e))}function WS(e,i,s){var l=e.pingCache;l!==null&&l.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Qe===e&&(Ae&s)===s&&(pn===4||pn===3&&(Ae&62914560)===Ae&&300>Ie()-pc?(Ge&2)===0&&Lr(e,0):$f|=s,Cr===Ae&&(Cr=0)),na(e)}function Rg(e,i){i===0&&(i=Mt()),e=Os(e,i),e!==null&&(Zt(e,i),na(e))}function qS(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),Rg(e,s)}function YS(e,i){var s=0;switch(e.tag){case 31:case 13:var l=e.stateNode,f=e.memoizedState;f!==null&&(s=f.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),Rg(e,s)}function ZS(e,i){return mn(e,i)}var yc=null,Nr=null,oh=!1,Mc=!1,lh=!1,fs=0;function na(e){e!==Nr&&e.next===null&&(Nr===null?yc=Nr=e:Nr=Nr.next=e),Mc=!0,oh||(oh=!0,JS())}function Xo(e,i){if(!lh&&Mc){lh=!0;do for(var s=!1,l=yc;l!==null;){if(e!==0){var f=l.pendingLanes;if(f===0)var h=0;else{var y=l.suspendedLanes,R=l.pingedLanes;h=(1<<31-Ft(42|e)+1)-1,h&=f&~(y&~R),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(s=!0,Ug(l,h))}else h=Ae,h=_t(l,l===Qe?h:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(h&3)===0||wt(l,h)||(s=!0,Ug(l,h));l=l.next}while(s);lh=!1}}function KS(){Cg()}function Cg(){Mc=oh=!1;var e=0;fs!==0&&ry()&&(e=fs);for(var i=Ie(),s=null,l=yc;l!==null;){var f=l.next,h=Dg(l,i);h===0?(l.next=null,s===null?yc=f:s.next=f,f===null&&(Nr=s)):(s=l,(e!==0||(h&3)!==0)&&(Mc=!0)),l=f}Un!==0&&Un!==5||Xo(e),fs!==0&&(fs=0)}function Dg(e,i){for(var s=e.suspendedLanes,l=e.pingedLanes,f=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var y=31-Ft(h),R=1<<y,G=f[y];G===-1?((R&s)===0||(R&l)!==0)&&(f[y]=It(R,i)):G<=i&&(e.expiredLanes|=R),h&=~R}if(i=Qe,s=Ae,s=_t(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,s===0||e===i&&(ke===2||ke===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&Fe(l),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||wt(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(l!==null&&Fe(l),Et(s)){case 2:case 8:s=b;break;case 32:s=j;break;case 268435456:s=mt;break;default:s=j}return l=Lg.bind(null,e),s=mn(s,l),e.callbackPriority=i,e.callbackNode=s,i}return l!==null&&l!==null&&Fe(l),e.callbackPriority=2,e.callbackNode=null,2}function Lg(e,i){if(Un!==0&&Un!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(Sc()&&e.callbackNode!==s)return null;var l=Ae;return l=_t(e,e===Qe?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(hg(e,l,i),Dg(e,Ie()),e.callbackNode!=null&&e.callbackNode===s?Lg.bind(null,e):null)}function Ug(e,i){if(Sc())return null;hg(e,i,!0)}function JS(){ly(function(){(Ge&6)!==0?mn(z,KS):Cg()})}function ch(){if(fs===0){var e=_r;e===0&&(e=ie,ie<<=1,(ie&261888)===0&&(ie=256)),fs=e}return fs}function Ng(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Bi(""+e)}function Og(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function QS(e,i,s,l,f){if(i==="submit"&&s&&s.stateNode===f){var h=Ng((f[yn]||null).action),y=l.submitter;y&&(i=(i=y[yn]||null)?Ng(i.formAction):y.getAttribute("formAction"),i!==null&&(h=i,y=null));var R=new Ol("action","action",null,l,f);e.push({event:R,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(fs!==0){var G=y?Og(f,y):new FormData(f);Cf(s,{pending:!0,data:G,method:f.method,action:h},null,G)}}else typeof h=="function"&&(R.preventDefault(),G=y?Og(f,y):new FormData(f),Cf(s,{pending:!0,data:G,method:f.method,action:h},h,G))},currentTarget:f}]})}}for(var uh=0;uh<Wu.length;uh++){var fh=Wu[uh],jS=fh.toLowerCase(),$S=fh[0].toUpperCase()+fh.slice(1);Fi(jS,"on"+$S)}Fi(fm,"onAnimationEnd"),Fi(hm,"onAnimationIteration"),Fi(dm,"onAnimationStart"),Fi("dblclick","onDoubleClick"),Fi("focusin","onFocus"),Fi("focusout","onBlur"),Fi(mS,"onTransitionRun"),Fi(gS,"onTransitionStart"),Fi(vS,"onTransitionCancel"),Fi(pm,"onTransitionEnd"),W("onMouseEnter",["mouseout","mouseover"]),W("onMouseLeave",["mouseout","mouseover"]),W("onPointerEnter",["pointerout","pointerover"]),W("onPointerLeave",["pointerout","pointerover"]),w("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),w("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),w("onBeforeInput",["compositionend","keypress","textInput","paste"]),w("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),w("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),w("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ty=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wo));function Pg(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var l=e[s],f=l.event;l=l.listeners;t:{var h=void 0;if(i)for(var y=l.length-1;0<=y;y--){var R=l[y],G=R.instance,ot=R.currentTarget;if(R=R.listener,G!==h&&f.isPropagationStopped())break t;h=R,f.currentTarget=ot;try{h(f)}catch(xt){zl(xt)}f.currentTarget=null,h=G}else for(y=0;y<l.length;y++){if(R=l[y],G=R.instance,ot=R.currentTarget,R=R.listener,G!==h&&f.isPropagationStopped())break t;h=R,f.currentTarget=ot;try{h(f)}catch(xt){zl(xt)}f.currentTarget=null,h=G}}}}function Te(e,i){var s=i[Zn];s===void 0&&(s=i[Zn]=new Set);var l=e+"__bubble";s.has(l)||(Ig(i,e,2,!1),s.add(l))}function hh(e,i,s){var l=0;i&&(l|=4),Ig(s,e,l,i)}var Ec="_reactListening"+Math.random().toString(36).slice(2);function dh(e){if(!e[Ec]){e[Ec]=!0,Dl.forEach(function(s){s!=="selectionchange"&&(ty.has(s)||hh(s,!1,e),hh(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[Ec]||(i[Ec]=!0,hh("selectionchange",!1,i))}}function Ig(e,i,s,l){switch(fv(i)){case 2:var f=Ry;break;case 8:f=Cy;break;default:f=Rh}s=f.bind(null,i,s,e),f=void 0,!Uu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?e.addEventListener(i,s,{capture:!0,passive:f}):e.addEventListener(i,s,!0):f!==void 0?e.addEventListener(i,s,{passive:f}):e.addEventListener(i,s,!1)}function ph(e,i,s,l,f){var h=l;if((i&1)===0&&(i&2)===0&&l!==null)t:for(;;){if(l===null)return;var y=l.tag;if(y===3||y===4){var R=l.stateNode.containerInfo;if(R===f)break;if(y===4)for(y=l.return;y!==null;){var G=y.tag;if((G===3||G===4)&&y.stateNode.containerInfo===f)return;y=y.return}for(;R!==null;){if(y=ga(R),y===null)return;if(G=y.tag,G===5||G===6||G===26||G===27){l=h=y;continue t}R=R.parentNode}}l=l.return}Gp(function(){var ot=h,xt=Du(s),yt=[];t:{var ct=mm.get(e);if(ct!==void 0){var ht=Ol,$t=e;switch(e){case"keypress":if(Ul(s)===0)break t;case"keydown":case"keyup":ht=Yx;break;case"focusin":$t="focus",ht=Iu;break;case"focusout":$t="blur",ht=Iu;break;case"beforeblur":case"afterblur":ht=Iu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ht=Xp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ht=Px;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ht=Jx;break;case fm:case hm:case dm:ht=Bx;break;case pm:ht=jx;break;case"scroll":case"scrollend":ht=Nx;break;case"wheel":ht=tS;break;case"copy":case"cut":case"paste":ht=Hx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ht=qp;break;case"toggle":case"beforetoggle":ht=nS}var re=(i&4)!==0,Ke=!re&&(e==="scroll"||e==="scrollend"),$=re?ct!==null?ct+"Capture":null:ct;re=[];for(var Z=ot,st;Z!==null;){var St=Z;if(st=St.stateNode,St=St.tag,St!==5&&St!==26&&St!==27||st===null||$===null||(St=ho(Z,$),St!=null&&re.push(qo(Z,St,st))),Ke)break;Z=Z.return}0<re.length&&(ct=new ht(ct,$t,null,s,xt),yt.push({event:ct,listeners:re}))}}if((i&7)===0){t:{if(ct=e==="mouseover"||e==="pointerover",ht=e==="mouseout"||e==="pointerout",ct&&s!==Cu&&($t=s.relatedTarget||s.fromElement)&&(ga($t)||$t[Yn]))break t;if((ht||ct)&&(ct=xt.window===xt?xt:(ct=xt.ownerDocument)?ct.defaultView||ct.parentWindow:window,ht?($t=s.relatedTarget||s.toElement,ht=ot,$t=$t?ga($t):null,$t!==null&&(Ke=c($t),re=$t.tag,$t!==Ke||re!==5&&re!==27&&re!==6)&&($t=null)):(ht=null,$t=ot),ht!==$t)){if(re=Xp,St="onMouseLeave",$="onMouseEnter",Z="mouse",(e==="pointerout"||e==="pointerover")&&(re=qp,St="onPointerLeave",$="onPointerEnter",Z="pointer"),Ke=ht==null?ct:Ds(ht),st=$t==null?ct:Ds($t),ct=new re(St,Z+"leave",ht,s,xt),ct.target=Ke,ct.relatedTarget=st,St=null,ga(xt)===ot&&(re=new re($,Z+"enter",$t,s,xt),re.target=st,re.relatedTarget=Ke,St=re),Ke=St,ht&&$t)e:{for(re=ey,$=ht,Z=$t,st=0,St=$;St;St=re(St))st++;St=0;for(var ae=Z;ae;ae=re(ae))St++;for(;0<st-St;)$=re($),st--;for(;0<St-st;)Z=re(Z),St--;for(;st--;){if($===Z||Z!==null&&$===Z.alternate){re=$;break e}$=re($),Z=re(Z)}re=null}else re=null;ht!==null&&zg(yt,ct,ht,re,!1),$t!==null&&Ke!==null&&zg(yt,Ke,$t,re,!0)}}t:{if(ct=ot?Ds(ot):window,ht=ct.nodeName&&ct.nodeName.toLowerCase(),ht==="select"||ht==="input"&&ct.type==="file")var ze=tm;else if(jp(ct))if(em)ze=hS;else{ze=uS;var ee=cS}else ht=ct.nodeName,!ht||ht.toLowerCase()!=="input"||ct.type!=="checkbox"&&ct.type!=="radio"?ot&&Ti(ot.elementType)&&(ze=tm):ze=fS;if(ze&&(ze=ze(e,ot))){$p(yt,ze,s,xt);break t}ee&&ee(e,ct,ot),e==="focusout"&&ot&&ct.type==="number"&&ot.memoizedProps.value!=null&&Ln(ct,"number",ct.value)}switch(ee=ot?Ds(ot):window,e){case"focusin":(jp(ee)||ee.contentEditable==="true")&&(ur=ee,Vu=ot,yo=null);break;case"focusout":yo=Vu=ur=null;break;case"mousedown":ku=!0;break;case"contextmenu":case"mouseup":case"dragend":ku=!1,cm(yt,s,xt);break;case"selectionchange":if(pS)break;case"keydown":case"keyup":cm(yt,s,xt)}var ge;if(Bu)t:{switch(e){case"compositionstart":var we="onCompositionStart";break t;case"compositionend":we="onCompositionEnd";break t;case"compositionupdate":we="onCompositionUpdate";break t}we=void 0}else cr?Jp(e,s)&&(we="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(we="onCompositionStart");we&&(Yp&&s.locale!=="ko"&&(cr||we!=="onCompositionStart"?we==="onCompositionEnd"&&cr&&(ge=Vp()):(Ka=xt,Nu="value"in Ka?Ka.value:Ka.textContent,cr=!0)),ee=bc(ot,we),0<ee.length&&(we=new Wp(we,e,null,s,xt),yt.push({event:we,listeners:ee}),ge?we.data=ge:(ge=Qp(s),ge!==null&&(we.data=ge)))),(ge=aS?sS(e,s):rS(e,s))&&(we=bc(ot,"onBeforeInput"),0<we.length&&(ee=new Wp("onBeforeInput","beforeinput",null,s,xt),yt.push({event:ee,listeners:we}),ee.data=ge)),QS(yt,e,ot,s,xt)}Pg(yt,i)})}function qo(e,i,s){return{instance:e,listener:i,currentTarget:s}}function bc(e,i){for(var s=i+"Capture",l=[];e!==null;){var f=e,h=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||h===null||(f=ho(e,s),f!=null&&l.unshift(qo(e,f,h)),f=ho(e,i),f!=null&&l.push(qo(e,f,h))),e.tag===3)return l;e=e.return}return[]}function ey(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function zg(e,i,s,l,f){for(var h=i._reactName,y=[];s!==null&&s!==l;){var R=s,G=R.alternate,ot=R.stateNode;if(R=R.tag,G!==null&&G===l)break;R!==5&&R!==26&&R!==27||ot===null||(G=ot,f?(ot=ho(s,h),ot!=null&&y.unshift(qo(s,ot,G))):f||(ot=ho(s,h),ot!=null&&y.push(qo(s,ot,G)))),s=s.return}y.length!==0&&e.push({event:i,listeners:y})}var ny=/\r\n?/g,iy=/\u0000|\uFFFD/g;function Bg(e){return(typeof e=="string"?e:""+e).replace(ny,`
`).replace(iy,"")}function Fg(e,i){return i=Bg(i),Bg(e)===i}function Ze(e,i,s,l,f,h){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||ti(e,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&ti(e,""+l);break;case"className":Ot(e,"class",l);break;case"tabIndex":Ot(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Ot(e,s,l);break;case"style":ln(e,l,h);break;case"data":if(i!=="object"){Ot(e,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Bi(""+l),e.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(s==="formAction"?(i!=="input"&&Ze(e,i,"name",f.name,f,null),Ze(e,i,"formEncType",f.formEncType,f,null),Ze(e,i,"formMethod",f.formMethod,f,null),Ze(e,i,"formTarget",f.formTarget,f,null)):(Ze(e,i,"encType",f.encType,f,null),Ze(e,i,"method",f.method,f,null),Ze(e,i,"target",f.target,f,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=Bi(""+l),e.setAttribute(s,l);break;case"onClick":l!=null&&(e.onclick=Ai);break;case"onScroll":l!=null&&Te("scroll",e);break;case"onScrollEnd":l!=null&&Te("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}s=Bi(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""+l):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":l===!0?e.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,l):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(s,l):e.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(s):e.setAttribute(s,l);break;case"popover":Te("beforetoggle",e),Te("toggle",e),kt(e,"popover",l);break;case"xlinkActuate":Ht(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Ht(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Ht(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Ht(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Ht(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Ht(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Ht(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":kt(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=qe.get(s)||s,kt(e,s,l))}}function mh(e,i,s,l,f,h){switch(s){case"style":ln(e,l,h);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(f.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof l=="string"?ti(e,l):(typeof l=="number"||typeof l=="bigint")&&ti(e,""+l);break;case"onScroll":l!=null&&Te("scroll",e);break;case"onScrollEnd":l!=null&&Te("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Ai);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!fo.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(f=s.endsWith("Capture"),i=s.slice(2,f?s.length-7:void 0),h=e[yn]||null,h=h!=null?h[s]:null,typeof h=="function"&&e.removeEventListener(i,h,f),typeof l=="function")){typeof h!="function"&&h!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,l,f);break t}s in e?e[s]=l:l===!0?e.setAttribute(s,""):kt(e,s,l)}}}function Xn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Te("error",e),Te("load",e);var l=!1,f=!1,h;for(h in s)if(s.hasOwnProperty(h)){var y=s[h];if(y!=null)switch(h){case"src":l=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,h,y,s,null)}}f&&Ze(e,i,"srcSet",s.srcSet,s,null),l&&Ze(e,i,"src",s.src,s,null);return;case"input":Te("invalid",e);var R=h=y=f=null,G=null,ot=null;for(l in s)if(s.hasOwnProperty(l)){var xt=s[l];if(xt!=null)switch(l){case"name":f=xt;break;case"type":y=xt;break;case"checked":G=xt;break;case"defaultChecked":ot=xt;break;case"value":h=xt;break;case"defaultValue":R=xt;break;case"children":case"dangerouslySetInnerHTML":if(xt!=null)throw Error(a(137,i));break;default:Ze(e,i,l,xt,s,null)}}Xt(e,h,R,G,ot,y,f,!1);return;case"select":Te("invalid",e),l=y=h=null;for(f in s)if(s.hasOwnProperty(f)&&(R=s[f],R!=null))switch(f){case"value":h=R;break;case"defaultValue":y=R;break;case"multiple":l=R;default:Ze(e,i,f,R,s,null)}i=h,s=y,e.multiple=!!l,i!=null?_e(e,!!l,i,!1):s!=null&&_e(e,!!l,s,!0);return;case"textarea":Te("invalid",e),h=f=l=null;for(y in s)if(s.hasOwnProperty(y)&&(R=s[y],R!=null))switch(y){case"value":l=R;break;case"defaultValue":f=R;break;case"children":h=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(a(91));break;default:Ze(e,i,y,R,s,null)}di(e,l,f,h);return;case"option":for(G in s)s.hasOwnProperty(G)&&(l=s[G],l!=null)&&(G==="selected"?e.selected=l&&typeof l!="function"&&typeof l!="symbol":Ze(e,i,G,l,s,null));return;case"dialog":Te("beforetoggle",e),Te("toggle",e),Te("cancel",e),Te("close",e);break;case"iframe":case"object":Te("load",e);break;case"video":case"audio":for(l=0;l<Wo.length;l++)Te(Wo[l],e);break;case"image":Te("error",e),Te("load",e);break;case"details":Te("toggle",e);break;case"embed":case"source":case"link":Te("error",e),Te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ot in s)if(s.hasOwnProperty(ot)&&(l=s[ot],l!=null))switch(ot){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Ze(e,i,ot,l,s,null)}return;default:if(Ti(i)){for(xt in s)s.hasOwnProperty(xt)&&(l=s[xt],l!==void 0&&mh(e,i,xt,l,s,void 0));return}}for(R in s)s.hasOwnProperty(R)&&(l=s[R],l!=null&&Ze(e,i,R,l,s,null))}function ay(e,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,h=null,y=null,R=null,G=null,ot=null,xt=null;for(ht in s){var yt=s[ht];if(s.hasOwnProperty(ht)&&yt!=null)switch(ht){case"checked":break;case"value":break;case"defaultValue":G=yt;default:l.hasOwnProperty(ht)||Ze(e,i,ht,null,l,yt)}}for(var ct in l){var ht=l[ct];if(yt=s[ct],l.hasOwnProperty(ct)&&(ht!=null||yt!=null))switch(ct){case"type":h=ht;break;case"name":f=ht;break;case"checked":ot=ht;break;case"defaultChecked":xt=ht;break;case"value":y=ht;break;case"defaultValue":R=ht;break;case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(a(137,i));break;default:ht!==yt&&Ze(e,i,ct,ht,l,yt)}}En(e,y,R,G,ot,xt,h,f);return;case"select":ht=y=R=ct=null;for(h in s)if(G=s[h],s.hasOwnProperty(h)&&G!=null)switch(h){case"value":break;case"multiple":ht=G;default:l.hasOwnProperty(h)||Ze(e,i,h,null,l,G)}for(f in l)if(h=l[f],G=s[f],l.hasOwnProperty(f)&&(h!=null||G!=null))switch(f){case"value":ct=h;break;case"defaultValue":R=h;break;case"multiple":y=h;default:h!==G&&Ze(e,i,f,h,l,G)}i=R,s=y,l=ht,ct!=null?_e(e,!!s,ct,!1):!!l!=!!s&&(i!=null?_e(e,!!s,i,!0):_e(e,!!s,s?[]:"",!1));return;case"textarea":ht=ct=null;for(R in s)if(f=s[R],s.hasOwnProperty(R)&&f!=null&&!l.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:Ze(e,i,R,null,l,f)}for(y in l)if(f=l[y],h=s[y],l.hasOwnProperty(y)&&(f!=null||h!=null))switch(y){case"value":ct=f;break;case"defaultValue":ht=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(a(91));break;default:f!==h&&Ze(e,i,y,f,l,h)}$n(e,ct,ht);return;case"option":for(var $t in s)ct=s[$t],s.hasOwnProperty($t)&&ct!=null&&!l.hasOwnProperty($t)&&($t==="selected"?e.selected=!1:Ze(e,i,$t,null,l,ct));for(G in l)ct=l[G],ht=s[G],l.hasOwnProperty(G)&&ct!==ht&&(ct!=null||ht!=null)&&(G==="selected"?e.selected=ct&&typeof ct!="function"&&typeof ct!="symbol":Ze(e,i,G,ct,l,ht));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var re in s)ct=s[re],s.hasOwnProperty(re)&&ct!=null&&!l.hasOwnProperty(re)&&Ze(e,i,re,null,l,ct);for(ot in l)if(ct=l[ot],ht=s[ot],l.hasOwnProperty(ot)&&ct!==ht&&(ct!=null||ht!=null))switch(ot){case"children":case"dangerouslySetInnerHTML":if(ct!=null)throw Error(a(137,i));break;default:Ze(e,i,ot,ct,l,ht)}return;default:if(Ti(i)){for(var Ke in s)ct=s[Ke],s.hasOwnProperty(Ke)&&ct!==void 0&&!l.hasOwnProperty(Ke)&&mh(e,i,Ke,void 0,l,ct);for(xt in l)ct=l[xt],ht=s[xt],!l.hasOwnProperty(xt)||ct===ht||ct===void 0&&ht===void 0||mh(e,i,xt,ct,l,ht);return}}for(var $ in s)ct=s[$],s.hasOwnProperty($)&&ct!=null&&!l.hasOwnProperty($)&&Ze(e,i,$,null,l,ct);for(yt in l)ct=l[yt],ht=s[yt],!l.hasOwnProperty(yt)||ct===ht||ct==null&&ht==null||Ze(e,i,yt,ct,l,ht)}function Hg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function sy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var f=s[l],h=f.transferSize,y=f.initiatorType,R=f.duration;if(h&&R&&Hg(y)){for(y=0,R=f.responseEnd,l+=1;l<s.length;l++){var G=s[l],ot=G.startTime;if(ot>R)break;var xt=G.transferSize,yt=G.initiatorType;xt&&Hg(yt)&&(G=G.responseEnd,y+=xt*(G<R?1:(R-ot)/(G-ot)))}if(--l,i+=8*(h+y)/(f.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var gh=null,vh=null;function Tc(e){return e.nodeType===9?e:e.ownerDocument}function Gg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Vg(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function _h(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var xh=null;function ry(){var e=window.event;return e&&e.type==="popstate"?e===xh?!1:(xh=e,!0):(xh=null,!1)}var kg=typeof setTimeout=="function"?setTimeout:void 0,oy=typeof clearTimeout=="function"?clearTimeout:void 0,Xg=typeof Promise=="function"?Promise:void 0,ly=typeof queueMicrotask=="function"?queueMicrotask:typeof Xg<"u"?function(e){return Xg.resolve(null).then(e).catch(cy)}:kg;function cy(e){setTimeout(function(){throw e})}function hs(e){return e==="head"}function Wg(e,i){var s=i,l=0;do{var f=s.nextSibling;if(e.removeChild(s),f&&f.nodeType===8)if(s=f.data,s==="/$"||s==="/&"){if(l===0){e.removeChild(f),zr(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")Yo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Yo(s);for(var h=s.firstChild;h;){var y=h.nextSibling,R=h.nodeName;h[Wa]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&h.rel.toLowerCase()==="stylesheet"||s.removeChild(h),h=y}}else s==="body"&&Yo(e.ownerDocument.body);s=f}while(s);zr(i)}function qg(e,i){var s=e;e=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=l}while(s)}function Sh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Sh(s),qa(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function uy(e,i,s,l){for(;e.nodeType===1;){var f=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Wa])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==f.rel||e.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||e.getAttribute("title")!==(f.title==null?null:f.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(f.src==null?null:f.src)||e.getAttribute("type")!==(f.type==null?null:f.type)||e.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var h=f.name==null?null:""+f.name;if(f.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Ni(e.nextSibling),e===null)break}return null}function fy(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Ni(e.nextSibling),e===null))return null;return e}function Yg(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Ni(e.nextSibling),e===null))return null;return e}function yh(e){return e.data==="$?"||e.data==="$~"}function Mh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function hy(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Ni(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var Eh=null;function Zg(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return Ni(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function Kg(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function Jg(e,i,s){switch(i=Tc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Yo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);qa(e)}var Oi=new Map,Qg=new Set;function Ac(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Na=k.d;k.d={f:dy,r:py,D:my,C:gy,L:vy,m:_y,X:Sy,S:xy,M:yy};function dy(){var e=Na.f(),i=vc();return e||i}function py(e){var i=va(e);i!==null&&i.tag===5&&i.type==="form"?p0(i):Na.r(e)}var Or=typeof document>"u"?null:document;function jg(e,i,s){var l=Or;if(l&&typeof i=="string"&&i){var f=ve(i);f='link[rel="'+e+'"][href="'+f+'"]',typeof s=="string"&&(f+='[crossorigin="'+s+'"]'),Qg.has(f)||(Qg.add(f),e={rel:e,crossOrigin:s,href:i},l.querySelector(f)===null&&(i=l.createElement("link"),Xn(i,"link",e),Mn(i),l.head.appendChild(i)))}}function my(e){Na.D(e),jg("dns-prefetch",e,null)}function gy(e,i){Na.C(e,i),jg("preconnect",e,i)}function vy(e,i,s){Na.L(e,i,s);var l=Or;if(l&&e&&i){var f='link[rel="preload"][as="'+ve(i)+'"]';i==="image"&&s&&s.imageSrcSet?(f+='[imagesrcset="'+ve(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(f+='[imagesizes="'+ve(s.imageSizes)+'"]')):f+='[href="'+ve(e)+'"]';var h=f;switch(i){case"style":h=Pr(e);break;case"script":h=Ir(e)}Oi.has(h)||(e=v({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Oi.set(h,e),l.querySelector(f)!==null||i==="style"&&l.querySelector(Zo(h))||i==="script"&&l.querySelector(Ko(h))||(i=l.createElement("link"),Xn(i,"link",e),Mn(i),l.head.appendChild(i)))}}function _y(e,i){Na.m(e,i);var s=Or;if(s&&e){var l=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+ve(l)+'"][href="'+ve(e)+'"]',h=f;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Ir(e)}if(!Oi.has(h)&&(e=v({rel:"modulepreload",href:e},i),Oi.set(h,e),s.querySelector(f)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Ko(h)))return}l=s.createElement("link"),Xn(l,"link",e),Mn(l),s.head.appendChild(l)}}}function xy(e,i,s){Na.S(e,i,s);var l=Or;if(l&&e){var f=Ya(l).hoistableStyles,h=Pr(e);i=i||"default";var y=f.get(h);if(!y){var R={loading:0,preload:null};if(y=l.querySelector(Zo(h)))R.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Oi.get(h))&&bh(e,s);var G=y=l.createElement("link");Mn(G),Xn(G,"link",e),G._p=new Promise(function(ot,xt){G.onload=ot,G.onerror=xt}),G.addEventListener("load",function(){R.loading|=1}),G.addEventListener("error",function(){R.loading|=2}),R.loading|=4,wc(y,i,l)}y={type:"stylesheet",instance:y,count:1,state:R},f.set(h,y)}}}function Sy(e,i){Na.X(e,i);var s=Or;if(s&&e){var l=Ya(s).hoistableScripts,f=Ir(e),h=l.get(f);h||(h=s.querySelector(Ko(f)),h||(e=v({src:e,async:!0},i),(i=Oi.get(f))&&Th(e,i),h=s.createElement("script"),Mn(h),Xn(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},l.set(f,h))}}function yy(e,i){Na.M(e,i);var s=Or;if(s&&e){var l=Ya(s).hoistableScripts,f=Ir(e),h=l.get(f);h||(h=s.querySelector(Ko(f)),h||(e=v({src:e,async:!0,type:"module"},i),(i=Oi.get(f))&&Th(e,i),h=s.createElement("script"),Mn(h),Xn(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},l.set(f,h))}}function $g(e,i,s,l){var f=(f=Vt.current)?Ac(f):null;if(!f)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Pr(s.href),s=Ya(f).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Pr(s.href);var h=Ya(f).hoistableStyles,y=h.get(e);if(y||(f=f.ownerDocument||f,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,y),(h=f.querySelector(Zo(e)))&&!h._p&&(y.instance=h,y.state.loading=5),Oi.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Oi.set(e,s),h||My(f,e,s,y.state))),i&&l===null)throw Error(a(528,""));return y}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Ir(s),s=Ya(f).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Pr(e){return'href="'+ve(e)+'"'}function Zo(e){return'link[rel="stylesheet"]['+e+"]"}function tv(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function My(e,i,s,l){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=e.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Xn(i,"link",s),Mn(i),e.head.appendChild(i))}function Ir(e){return'[src="'+ve(e)+'"]'}function Ko(e){return"script[async]"+e}function ev(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=e.querySelector('style[data-href~="'+ve(s.href)+'"]');if(l)return i.instance=l,Mn(l),l;var f=v({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),Mn(l),Xn(l,"style",f),wc(l,s.precedence,e),i.instance=l;case"stylesheet":f=Pr(s.href);var h=e.querySelector(Zo(f));if(h)return i.state.loading|=4,i.instance=h,Mn(h),h;l=tv(s),(f=Oi.get(f))&&bh(l,f),h=(e.ownerDocument||e).createElement("link"),Mn(h);var y=h;return y._p=new Promise(function(R,G){y.onload=R,y.onerror=G}),Xn(h,"link",l),i.state.loading|=4,wc(h,s.precedence,e),i.instance=h;case"script":return h=Ir(s.src),(f=e.querySelector(Ko(h)))?(i.instance=f,Mn(f),f):(l=s,(f=Oi.get(h))&&(l=v({},s),Th(l,f)),e=e.ownerDocument||e,f=e.createElement("script"),Mn(f),Xn(f,"link",l),e.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,wc(l,s.precedence,e));return i.instance}function wc(e,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=l.length?l[l.length-1]:null,h=f,y=0;y<l.length;y++){var R=l[y];if(R.dataset.precedence===i)h=R;else if(h!==f)break}h?h.parentNode.insertBefore(e,h.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function bh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function Th(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var Rc=null;function nv(e,i,s){if(Rc===null){var l=new Map,f=Rc=new Map;f.set(s,l)}else f=Rc,l=f.get(s),l||(l=new Map,f.set(s,l));if(l.has(e))return l;for(l.set(e,null),s=s.getElementsByTagName(e),f=0;f<s.length;f++){var h=s[f];if(!(h[Wa]||h[on]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var y=h.getAttribute(i)||"";y=e+y;var R=l.get(y);R?R.push(h):l.set(y,[h])}}return l}function iv(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function Ey(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;return i.rel==="stylesheet"?(e=i.disabled,typeof i.precedence=="string"&&e==null):!0;case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function av(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function by(e,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var f=Pr(l.href),h=i.querySelector(Zo(f));if(h){i=h._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=Cc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=h,Mn(h);return}h=i.ownerDocument||i,l=tv(l),(f=Oi.get(f))&&bh(l,f),h=h.createElement("link"),Mn(h);var y=h;y._p=new Promise(function(R,G){y.onload=R,y.onerror=G}),Xn(h,"link",l),s.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=Cc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var Ah=0;function Ty(e,i){return e.stylesheets&&e.count===0&&Lc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var l=setTimeout(function(){if(e.stylesheets&&Lc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+i);0<e.imgBytes&&Ah===0&&(Ah=62500*sy());var f=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Lc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>Ah?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(f)}}:null}function Cc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Lc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Dc=null;function Lc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Dc=new Map,i.forEach(Ay,e),Dc=null,Cc.call(e))}function Ay(e,i){if(!(i.state.loading&4)){var s=Dc.get(e);if(s)var l=s.get(null);else{s=new Map,Dc.set(e,s);for(var f=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<f.length;h++){var y=f[h];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(s.set(y.dataset.precedence,y),l=y)}l&&s.set(null,l)}f=i.instance,y=f.getAttribute("data-precedence"),h=s.get(y)||l,h===l&&s.set(null,f),s.set(y,f),this.count++,l=Cc.bind(this),f.addEventListener("load",l),f.addEventListener("error",l),h?h.parentNode.insertBefore(f,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(f,e.firstChild)),i.state.loading|=4}}var Jo={$$typeof:P,Provider:null,Consumer:null,_currentValue:lt,_currentValue2:lt,_threadCount:0};function wy(e,i,s,l,f,h,y,R,G){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Yt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Yt(0),this.hiddenUpdates=Yt(null),this.identifierPrefix=l,this.onUncaughtError=f,this.onCaughtError=h,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=G,this.incompleteTransitions=new Map}function sv(e,i,s,l,f,h,y,R,G,ot,xt,yt){return e=new wy(e,i,s,y,G,ot,xt,yt,R),i=1,h===!0&&(i|=24),h=mi(3,null,null,i),e.current=h,h.stateNode=e,i=sf(),i.refCount++,e.pooledCache=i,i.refCount++,h.memoizedState={element:l,isDehydrated:s,cache:i},cf(h),e}function rv(e){return e?(e=dr,e):dr}function ov(e,i,s,l,f,h){f=rv(f),l.context===null?l.context=f:l.pendingContext=f,l=es(i),l.payload={element:s},h=h===void 0?null:h,h!==null&&(l.callback=h),s=ns(e,l,i),s!==null&&(fi(s,e,i),Ro(s,e,i))}function lv(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function wh(e,i){lv(e,i),(e=e.alternate)&&lv(e,i)}function cv(e){if(e.tag===13||e.tag===31){var i=Os(e,67108864);i!==null&&fi(i,e,67108864),wh(e,67108864)}}function uv(e){if(e.tag===13||e.tag===31){var i=Si();i=pa(i);var s=Os(e,i);s!==null&&fi(s,e,i),wh(e,i)}}var Uc=!0;function Ry(e,i,s,l){var f=F.T;F.T=null;var h=k.p;try{k.p=2,Rh(e,i,s,l)}finally{k.p=h,F.T=f}}function Cy(e,i,s,l){var f=F.T;F.T=null;var h=k.p;try{k.p=8,Rh(e,i,s,l)}finally{k.p=h,F.T=f}}function Rh(e,i,s,l){if(Uc){var f=Ch(l);if(f===null)ph(e,i,l,Nc,s),hv(e,l);else if(Ly(f,e,i,s,l))l.stopPropagation();else if(hv(e,l),i&4&&-1<Dy.indexOf(e)){for(;f!==null;){var h=va(f);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var y=Ct(h.pendingLanes);if(y!==0){var R=h;for(R.pendingLanes|=2,R.entangledLanes|=2;y;){var G=1<<31-Ft(y);R.entanglements[1]|=G,y&=~G}na(h),(Ge&6)===0&&(mc=Ie()+500,Xo(0))}}break;case 31:case 13:R=Os(h,2),R!==null&&fi(R,h,2),vc(),wh(h,2)}if(h=Ch(l),h===null&&ph(e,i,l,Nc,s),h===f)break;f=h}f!==null&&l.stopPropagation()}else ph(e,i,l,null,s)}}function Ch(e){return e=Du(e),Dh(e)}var Nc=null;function Dh(e){if(Nc=null,e=ga(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=u(i),e!==null)return e;e=null}else if(s===31){if(e=d(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return Nc=e,null}function fv(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ue()){case z:return 2;case b:return 8;case j:case rt:return 32;case mt:return 268435456;default:return 32}default:return 32}}var Lh=!1,ds=null,ps=null,ms=null,Qo=new Map,jo=new Map,gs=[],Dy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function hv(e,i){switch(e){case"focusin":case"focusout":ds=null;break;case"dragenter":case"dragleave":ps=null;break;case"mouseover":case"mouseout":ms=null;break;case"pointerover":case"pointerout":Qo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":jo.delete(i.pointerId)}}function $o(e,i,s,l,f,h){return e===null||e.nativeEvent!==h?(e={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:h,targetContainers:[f]},i!==null&&(i=va(i),i!==null&&cv(i)),e):(e.eventSystemFlags|=l,i=e.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),e)}function Ly(e,i,s,l,f){switch(i){case"focusin":return ds=$o(ds,e,i,s,l,f),!0;case"dragenter":return ps=$o(ps,e,i,s,l,f),!0;case"mouseover":return ms=$o(ms,e,i,s,l,f),!0;case"pointerover":var h=f.pointerId;return Qo.set(h,$o(Qo.get(h)||null,e,i,s,l,f)),!0;case"gotpointercapture":return h=f.pointerId,jo.set(h,$o(jo.get(h)||null,e,i,s,l,f)),!0}return!1}function dv(e){var i=ga(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=u(s),i!==null){e.blockedOn=i,rn(e.priority,function(){uv(s)});return}}else if(i===31){if(i=d(s),i!==null){e.blockedOn=i,rn(e.priority,function(){uv(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Oc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=Ch(e.nativeEvent);if(s===null){s=e.nativeEvent;var l=new s.constructor(s.type,s);Cu=l,s.target.dispatchEvent(l),Cu=null}else return i=va(s),i!==null&&cv(i),e.blockedOn=s,!1;i.shift()}return!0}function pv(e,i,s){Oc(e)&&s.delete(i)}function Uy(){Lh=!1,ds!==null&&Oc(ds)&&(ds=null),ps!==null&&Oc(ps)&&(ps=null),ms!==null&&Oc(ms)&&(ms=null),Qo.forEach(pv),jo.forEach(pv)}function Pc(e,i){e.blockedOn===i&&(e.blockedOn=null,Lh||(Lh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Uy)))}var Ic=null;function mv(e){Ic!==e&&(Ic=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Ic===e&&(Ic=null);for(var i=0;i<e.length;i+=3){var s=e[i],l=e[i+1],f=e[i+2];if(typeof l!="function"){if(Dh(l||s)===null)continue;break}var h=va(s);h!==null&&(e.splice(i,3),i-=3,Cf(h,{pending:!0,data:f,method:s.method,action:l},l,f))}}))}function zr(e){function i(G){return Pc(G,e)}ds!==null&&Pc(ds,e),ps!==null&&Pc(ps,e),ms!==null&&Pc(ms,e),Qo.forEach(i),jo.forEach(i);for(var s=0;s<gs.length;s++){var l=gs[s];l.blockedOn===e&&(l.blockedOn=null)}for(;0<gs.length&&(s=gs[0],s.blockedOn===null);)dv(s),s.blockedOn===null&&gs.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var f=s[l],h=s[l+1],y=f[yn]||null;if(typeof h=="function")y||mv(s);else if(y){var R=null;if(h&&h.hasAttribute("formAction")){if(f=h,y=h[yn]||null)R=y.formAction;else if(Dh(f)!==null)continue}else R=y.action;typeof R=="function"?s[l+1]=R:(s.splice(l,3),l-=3),mv(s)}}}function gv(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(y){return f=y})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,f=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function Uh(e){this._internalRoot=e}zc.prototype.render=Uh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=Si();ov(s,l,e,i,null,null)},zc.prototype.unmount=Uh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;ov(e.current,2,null,e,null,null),vc(),i[Yn]=null}};function zc(e){this._internalRoot=e}zc.prototype.unstable_scheduleHydration=function(e){if(e){var i=ne();e={blockedOn:null,target:e,priority:i};for(var s=0;s<gs.length&&i!==0&&i<gs[s].priority;s++);gs.splice(s,0,e),s===0&&dv(e)}};var vv=t.version;if(vv!=="19.2.9")throw Error(a(527,vv,"19.2.9"));k.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=p(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var Ny={bundleType:0,version:"19.2.9",rendererPackageName:"react-dom",currentDispatcherRef:F,reconcilerVersion:"19.2.9"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Bc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Bc.isDisabled&&Bc.supportsFiber)try{pt=Bc.inject(Ny),gt=Bc}catch{}}return el.createRoot=function(e,i){if(!o(e))throw Error(a(299));var s=!1,l="",f=b0,h=T0,y=A0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(h=i.onCaughtError),i.onRecoverableError!==void 0&&(y=i.onRecoverableError)),i=sv(e,1,!1,null,null,s,l,null,f,h,y,gv),e[Yn]=i.current,dh(e),new Uh(i)},el.hydrateRoot=function(e,i,s){if(!o(e))throw Error(a(299));var l=!1,f="",h=b0,y=T0,R=A0,G=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(f=s.identifierPrefix),s.onUncaughtError!==void 0&&(h=s.onUncaughtError),s.onCaughtError!==void 0&&(y=s.onCaughtError),s.onRecoverableError!==void 0&&(R=s.onRecoverableError),s.formState!==void 0&&(G=s.formState)),i=sv(e,1,!0,i,s??null,l,f,G,h,y,R,gv),i.context=rv(null),s=i.current,l=Si(),l=pa(l),f=es(l),f.callback=null,ns(s,f,l),s=l,i.current.lanes=s,Zt(i,s),na(i),e[Yn]=i.current,dh(e),new zc(i)},el.version="19.2.9",el}var wv;function ky(){if(wv)return Oh.exports;wv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Oh.exports=Vy(),Oh.exports}var Xy=ky(),Fh=mp();const gp="186",Wy=0,Rv=1,qy=2,fl=1,Yy=2,ll=3,ws=0,hi=1,On=2,Va=0,hl=1,Cv=2,Dv=3,Lv=4,Zy=5,jr=100,Ky=101,Jy=102,Qy=103,jy=104,$y=200,tM=201,eM=202,nM=203,H_=204,G_=205,iM=206,aM=207,sM=208,rM=209,oM=210,lM=211,cM=212,uM=213,fM=214,bd=0,Td=1,Ad=2,xl=3,wd=4,Rd=5,Cd=6,Dd=7,V_=0,hM=1,dM=2,ca=0,k_=1,X_=2,W_=3,vp=4,q_=5,Y_=6,Z_=7,K_=300,nr=301,io=302,Hh=303,Gh=304,Eu=306,ao=1e3,ra=1001,Ld=1002,Wn=1003,pM=1004,Fc=1005,jn=1006,Vh=1007,js=1008,bi=1009,J_=1010,Q_=1011,Sl=1012,_p=1013,fa=1014,oa=1015,ha=1016,xp=1017,Sp=1018,yl=1020,j_=35902,$_=35899,tx=1021,ex=1022,Yi=1023,Xa=1026,$s=1027,nx=1028,yp=1029,ir=1030,Mp=1031,Ep=1033,fu=33776,hu=33777,du=33778,pu=33779,Ud=35840,Nd=35841,Od=35842,Pd=35843,Id=36196,zd=37492,Bd=37496,Fd=37488,Hd=37489,gu=37490,Gd=37491,Vd=37808,kd=37809,Xd=37810,Wd=37811,qd=37812,Yd=37813,Zd=37814,Kd=37815,Jd=37816,Qd=37817,jd=37818,$d=37819,tp=37820,ep=37821,np=36492,ip=36494,ap=36495,sp=36283,rp=36284,vu=36285,op=36286,mM=3200,lp=0,gM=1,Ga="",si="srgb",_u="srgb-linear",xu="linear",We="srgb",kh=7680,vM=519,_M=512,xM=513,SM=514,bp=515,yM=516,MM=517,Tp=518,EM=519,bM=35044,Uv="300 es",la=2e3,Ml=2001;function TM(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function El(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function AM(){const r=El("canvas");return r.style.display="block",r}const Nv={};function Ov(...r){const t="THREE."+r.shift();console.log(t,...r)}function ix(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ce(...r){r=ix(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...r)}}function Oe(...r){r=ix(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...r)}}function eo(...r){const t=r.join(" ");t in Nv||(Nv[t]=!0,ce(...r))}function wM(r,t,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const RM={[bd]:Td,[Ad]:Cd,[wd]:Dd,[xl]:Rd,[Td]:bd,[Cd]:Ad,[Dd]:wd,[Rd]:xl};class sr{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){const a=this._listeners;if(a===void 0)return;const o=a[t];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const a=n[t.type];if(a!==void 0){t.target=this;const o=a.slice(0);for(let c=0,u=o.length;c<u;c++)o[c].call(this,t);t.target=null}}}const Jn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Pv=1234567;const dl=Math.PI/180,so=180/Math.PI;function rr(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Jn[r&255]+Jn[r>>8&255]+Jn[r>>16&255]+Jn[r>>24&255]+"-"+Jn[t&255]+Jn[t>>8&255]+"-"+Jn[t>>16&15|64]+Jn[t>>24&255]+"-"+Jn[n&63|128]+Jn[n>>8&255]+"-"+Jn[n>>16&255]+Jn[n>>24&255]+Jn[a&255]+Jn[a>>8&255]+Jn[a>>16&255]+Jn[a>>24&255]).toLowerCase()}function Me(r,t,n){return Math.max(t,Math.min(n,r))}function Ap(r,t){return(r%t+t)%t}function CM(r,t,n,a,o){return a+(r-t)*(o-a)/(n-t)}function DM(r,t,n){return r!==t?(n-r)/(t-r):0}function pl(r,t,n){return(1-n)*r+n*t}function LM(r,t,n,a){return pl(r,t,1-Math.exp(-n*a))}function UM(r,t=1){return t-Math.abs(Ap(r,t*2)-t)}function NM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*(3-2*r))}function OM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*r*(r*(r*6-15)+10))}function PM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function IM(r,t){return r+Math.random()*(t-r)}function zM(r){return r*(.5-Math.random())}function BM(r){r!==void 0&&(Pv=r);let t=Pv+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function FM(r){return r*dl}function HM(r){return r*so}function GM(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function VM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function kM(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function XM(r,t,n,a,o){const c=Math.cos,u=Math.sin,d=c(n/2),m=u(n/2),p=c((t+a)/2),g=u((t+a)/2),v=c((t-a)/2),_=u((t-a)/2),x=c((a-t)/2),E=u((a-t)/2);switch(o){case"XYX":r.set(d*g,m*v,m*_,d*p);break;case"YZY":r.set(m*_,d*g,m*v,d*p);break;case"ZXZ":r.set(m*v,m*_,d*g,d*p);break;case"XZX":r.set(d*g,m*E,m*x,d*p);break;case"YXY":r.set(m*x,d*g,m*E,d*p);break;case"ZYZ":r.set(m*E,m*x,d*g,d*p);break;default:ce("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function $r(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ii(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Fa={DEG2RAD:dl,RAD2DEG:so,generateUUID:rr,clamp:Me,euclideanModulo:Ap,mapLinear:CM,inverseLerp:DM,lerp:pl,damp:LM,pingpong:UM,smoothstep:NM,smootherstep:OM,randInt:PM,randFloat:IM,randFloatSpread:zM,seededRandom:BM,degToRad:FM,radToDeg:HM,isPowerOfTwo:GM,ceilPowerOfTwo:VM,floorPowerOfTwo:kM,setQuaternionFromProperEuler:XM,normalize:ii,denormalize:$r};class Wt{static{Wt.prototype.isVector2=!0}constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,o=t.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(Me(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-t.x,u=this.y-t.y;return this.x=c*a-u*o+t.x,this.y=c*o+u*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class lo{constructor(t=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=o}static slerpFlat(t,n,a,o,c,u,d){let m=a[o+0],p=a[o+1],g=a[o+2],v=a[o+3],_=c[u+0],x=c[u+1],E=c[u+2],D=c[u+3];if(v!==D||m!==_||p!==x||g!==E){let M=m*_+p*x+g*E+v*D;M<0&&(_=-_,x=-x,E=-E,D=-D,M=-M);let S=1-d;if(M<.9995){const C=Math.acos(M),P=Math.sin(C);S=Math.sin(S*C)/P,d=Math.sin(d*C)/P,m=m*S+_*d,p=p*S+x*d,g=g*S+E*d,v=v*S+D*d}else{m=m*S+_*d,p=p*S+x*d,g=g*S+E*d,v=v*S+D*d;const C=1/Math.sqrt(m*m+p*p+g*g+v*v);m*=C,p*=C,g*=C,v*=C}}t[n]=m,t[n+1]=p,t[n+2]=g,t[n+3]=v}static multiplyQuaternionsFlat(t,n,a,o,c,u){const d=a[o],m=a[o+1],p=a[o+2],g=a[o+3],v=c[u],_=c[u+1],x=c[u+2],E=c[u+3];return t[n]=d*E+g*v+m*x-p*_,t[n+1]=m*E+g*_+p*v-d*x,t[n+2]=p*E+g*x+d*_-m*v,t[n+3]=g*E-d*v-m*_-p*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,o){return this._x=t,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,o=t._y,c=t._z,u=t._order,d=Math.cos,m=Math.sin,p=d(a/2),g=d(o/2),v=d(c/2),_=m(a/2),x=m(o/2),E=m(c/2);switch(u){case"XYZ":this._x=_*g*v+p*x*E,this._y=p*x*v-_*g*E,this._z=p*g*E+_*x*v,this._w=p*g*v-_*x*E;break;case"YXZ":this._x=_*g*v+p*x*E,this._y=p*x*v-_*g*E,this._z=p*g*E-_*x*v,this._w=p*g*v+_*x*E;break;case"ZXY":this._x=_*g*v-p*x*E,this._y=p*x*v+_*g*E,this._z=p*g*E+_*x*v,this._w=p*g*v-_*x*E;break;case"ZYX":this._x=_*g*v-p*x*E,this._y=p*x*v+_*g*E,this._z=p*g*E-_*x*v,this._w=p*g*v+_*x*E;break;case"YZX":this._x=_*g*v+p*x*E,this._y=p*x*v+_*g*E,this._z=p*g*E-_*x*v,this._w=p*g*v-_*x*E;break;case"XZY":this._x=_*g*v-p*x*E,this._y=p*x*v-_*g*E,this._z=p*g*E+_*x*v,this._w=p*g*v+_*x*E;break;default:ce("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,o=Math.sin(a);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],o=n[4],c=n[8],u=n[1],d=n[5],m=n[9],p=n[2],g=n[6],v=n[10],_=a+d+v;if(_>0){const x=.5/Math.sqrt(_+1);this._w=.25/x,this._x=(g-m)*x,this._y=(c-p)*x,this._z=(u-o)*x}else if(a>d&&a>v){const x=2*Math.sqrt(1+a-d-v);this._w=(g-m)/x,this._x=.25*x,this._y=(o+u)/x,this._z=(c+p)/x}else if(d>v){const x=2*Math.sqrt(1+d-a-v);this._w=(c-p)/x,this._x=(o+u)/x,this._y=.25*x,this._z=(m+g)/x}else{const x=2*Math.sqrt(1+v-a-d);this._w=(u-o)/x,this._x=(c+p)/x,this._y=(m+g)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,o=t._y,c=t._z,u=t._w,d=n._x,m=n._y,p=n._z,g=n._w;return this._x=a*g+u*d+o*p-c*m,this._y=o*g+u*m+c*d-a*p,this._z=c*g+u*p+a*m-o*d,this._w=u*g-a*d-o*m-c*p,this._onChangeCallback(),this}slerp(t,n){let a=t._x,o=t._y,c=t._z,u=t._w,d=this.dot(t);d<0&&(a=-a,o=-o,c=-c,u=-u,d=-d);let m=1-n;if(d<.9995){const p=Math.acos(d),g=Math.sin(p);m=Math.sin(m*p)/g,n=Math.sin(n*p)/g,this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this._onChangeCallback()}else this._x=this._x*m+a*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this.normalize();return this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(t),o*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{static{V.prototype.isVector3=!0}constructor(t=0,n=0,a=0){this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Iv.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Iv.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=t.elements,u=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*u,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*u,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*u,this}applyQuaternion(t){const n=this.x,a=this.y,o=this.z,c=t.x,u=t.y,d=t.z,m=t.w,p=2*(u*o-d*a),g=2*(d*n-c*o),v=2*(c*a-u*n);return this.x=n+m*p+u*v-d*g,this.y=a+m*g+d*p-c*v,this.z=o+m*v+c*g-u*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this.z=Me(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this.z=Me(this.z,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,o=t.y,c=t.z,u=n.x,d=n.y,m=n.z;return this.x=o*m-c*d,this.y=c*u-a*m,this.z=a*d-o*u,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return Xh.copy(this).projectOnVector(t),this.sub(Xh)}reflect(t){return this.sub(Xh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(Me(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,o=this.z-t.z;return n*n+a*a+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const o=Math.sin(n)*t;return this.x=o*Math.sin(a),this.y=Math.cos(n)*t,this.z=o*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xh=new V,Iv=new lo;class he{static{he.prototype.isMatrix3=!0}constructor(t,n,a,o,c,u,d,m,p){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,d,m,p)}set(t,n,a,o,c,u,d,m,p){const g=this.elements;return g[0]=t,g[1]=o,g[2]=d,g[3]=n,g[4]=c,g[5]=m,g[6]=a,g[7]=u,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],d=a[3],m=a[6],p=a[1],g=a[4],v=a[7],_=a[2],x=a[5],E=a[8],D=o[0],M=o[3],S=o[6],C=o[1],P=o[4],A=o[7],L=o[2],N=o[5],I=o[8];return c[0]=u*D+d*C+m*L,c[3]=u*M+d*P+m*N,c[6]=u*S+d*A+m*I,c[1]=p*D+g*C+v*L,c[4]=p*M+g*P+v*N,c[7]=p*S+g*A+v*I,c[2]=_*D+x*C+E*L,c[5]=_*M+x*P+E*N,c[8]=_*S+x*A+E*I,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],d=t[5],m=t[6],p=t[7],g=t[8];return n*u*g-n*d*p-a*c*g+a*d*m+o*c*p-o*u*m}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],d=t[5],m=t[6],p=t[7],g=t[8],v=g*u-d*p,_=d*m-g*c,x=p*c-u*m,E=n*v+a*_+o*x;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const D=1/E;return t[0]=v*D,t[1]=(o*p-g*a)*D,t[2]=(d*a-o*u)*D,t[3]=_*D,t[4]=(g*n-o*m)*D,t[5]=(o*c-d*n)*D,t[6]=x*D,t[7]=(a*m-p*n)*D,t[8]=(u*n-a*c)*D,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,o,c,u,d){const m=Math.cos(c),p=Math.sin(c);return this.set(a*m,a*p,-a*(m*u+p*d)+u+t,-o*p,o*m,-o*(-p*u+m*d)+d+n,0,0,1),this}scale(t,n){return eo("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Wh.makeScale(t,n)),this}rotate(t){return eo("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Wh.makeRotation(-t)),this}translate(t,n){return eo("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Wh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Wh=new he,zv=new he().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bv=new he().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function WM(){const r={enabled:!0,workingColorSpace:_u,spaces:{},convert:function(o,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===We&&(o.r=ka(o.r),o.g=ka(o.g),o.b=ka(o.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===We&&(o.r=no(o.r),o.g=no(o.g),o.b=no(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Ga?xu:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,u){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return eo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return eo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(o,c)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[_u]:{primaries:t,whitePoint:a,transfer:xu,toXYZ:zv,fromXYZ:Bv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:si},outputColorSpaceConfig:{drawingBufferColorSpace:si}},[si]:{primaries:t,whitePoint:a,transfer:We,toXYZ:zv,fromXYZ:Bv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:si}}}),r}const De=WM();function ka(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function no(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Br;class qM{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{Br===void 0&&(Br=El("canvas")),Br.width=t.width,Br.height=t.height;const o=Br.getContext("2d");t instanceof ImageData?o.putImageData(t,0,0):o.drawImage(t,0,0,t.width,t.height),a=Br}return a.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=El("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const o=a.getImageData(0,0,t.width,t.height),c=o.data;for(let u=0;u<c.length;u++)c[u]=ka(c[u]/255)*255;return a.putImageData(o,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(ka(n[a]/255)*255):n[a]=ka(n[a]);return{data:n,width:t.width,height:t.height}}else return ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let YM=0;class wp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:YM++}),this.uuid=rr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let u=0,d=o.length;u<d;u++)o[u].isDataTexture?c.push(qh(o[u].image)):c.push(qh(o[u]))}else c=qh(o);a.url=c}return n||(t.images[this.uuid]=a),a}}function qh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?qM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ce("Texture: Unable to serialize Texture."),{})}let ZM=0;const Yh=new V;class qn extends sr{constructor(t=qn.DEFAULT_IMAGE,n=qn.DEFAULT_MAPPING,a=ra,o=ra,c=jn,u=js,d=Yi,m=bi,p=qn.DEFAULT_ANISOTROPY,g=Ga){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ZM++}),this.uuid=rr(),this.name="",this.source=new wp(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new he,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Yh).x}get height(){return this.source.getSize(Yh).y}get depth(){return this.source.getSize(Yh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const a=t[n];if(a===void 0){ce(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){ce(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&a&&o.isVector2&&a.isVector2||o&&a&&o.isVector3&&a.isVector3||o&&a&&o.isMatrix3&&a.isMatrix3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==K_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ao:t.x=t.x-Math.floor(t.x);break;case ra:t.x=t.x<0?0:1;break;case Ld:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ao:t.y=t.y-Math.floor(t.y);break;case ra:t.y=t.y<0?0:1;break;case Ld:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=K_;qn.DEFAULT_ANISOTROPY=1;class un{static{un.prototype.isVector4=!0}constructor(t=0,n=0,a=0,o=1){this.x=t,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,o){return this.x=t,this.y=n,this.z=a,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=this.w,u=t.elements;return this.x=u[0]*n+u[4]*a+u[8]*o+u[12]*c,this.y=u[1]*n+u[5]*a+u[9]*o+u[13]*c,this.z=u[2]*n+u[6]*a+u[10]*o+u[14]*c,this.w=u[3]*n+u[7]*a+u[11]*o+u[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,o,c;const m=t.elements,p=m[0],g=m[4],v=m[8],_=m[1],x=m[5],E=m[9],D=m[2],M=m[6],S=m[10];if(Math.abs(g-_)<.01&&Math.abs(v-D)<.01&&Math.abs(E-M)<.01){if(Math.abs(g+_)<.1&&Math.abs(v+D)<.1&&Math.abs(E+M)<.1&&Math.abs(p+x+S-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const P=(p+1)/2,A=(x+1)/2,L=(S+1)/2,N=(g+_)/4,I=(v+D)/4,T=(E+M)/4;return P>A&&P>L?P<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(P),o=N/a,c=I/a):A>L?A<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(A),a=N/o,c=T/o):L<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(L),a=I/c,o=T/c),this.set(a,o,c,n),this}let C=Math.sqrt((M-E)*(M-E)+(v-D)*(v-D)+(_-g)*(_-g));return Math.abs(C)<.001&&(C=1),this.x=(M-E)/C,this.y=(v-D)/C,this.z=(_-g)/C,this.w=Math.acos((p+x+S-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this.z=Me(this.z,t.z,n.z),this.w=Me(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this.z=Me(this.z,t,n),this.w=Me(this.w,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class KM extends sr{constructor(t=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=a.depth,this.scissor=new un(0,0,t,n),this.scissorTest=!1,this.viewport=new un(0,0,t,n),this.textures=[];const o={width:t,height:n,depth:a.depth},c=new qn(o),u=a.count;for(let d=0;d<u;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveColorBuffer=a.resolveColorBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.storeMultisampledColorBuffer=a.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=a.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=a.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:jn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=t,this.textures[o].image.height=n,this.textures[o].image.depth=a,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},t.textures[n].image);this.textures[n].source=new wp(o)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zi extends KM{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class ax extends qn{constructor(t=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=Wn,this.minFilter=Wn,this.wrapR=ra,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class JM extends qn{constructor(t=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=Wn,this.minFilter=Wn,this.wrapR=ra,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class je{static{je.prototype.isMatrix4=!0}constructor(t,n,a,o,c,u,d,m,p,g,v,_,x,E,D,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,u,d,m,p,g,v,_,x,E,D,M)}set(t,n,a,o,c,u,d,m,p,g,v,_,x,E,D,M){const S=this.elements;return S[0]=t,S[4]=n,S[8]=a,S[12]=o,S[1]=c,S[5]=u,S[9]=d,S[13]=m,S[2]=p,S[6]=g,S[10]=v,S[14]=_,S[3]=x,S[7]=E,S[11]=D,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new je().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,a=t.elements,o=1/Fr.setFromMatrixColumn(t,0).length(),c=1/Fr.setFromMatrixColumn(t,1).length(),u=1/Fr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*u,n[9]=a[9]*u,n[10]=a[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,o=t.y,c=t.z,u=Math.cos(a),d=Math.sin(a),m=Math.cos(o),p=Math.sin(o),g=Math.cos(c),v=Math.sin(c);if(t.order==="XYZ"){const _=u*g,x=u*v,E=d*g,D=d*v;n[0]=m*g,n[4]=-m*v,n[8]=p,n[1]=x+E*p,n[5]=_-D*p,n[9]=-d*m,n[2]=D-_*p,n[6]=E+x*p,n[10]=u*m}else if(t.order==="YXZ"){const _=m*g,x=m*v,E=p*g,D=p*v;n[0]=_+D*d,n[4]=E*d-x,n[8]=u*p,n[1]=u*v,n[5]=u*g,n[9]=-d,n[2]=x*d-E,n[6]=D+_*d,n[10]=u*m}else if(t.order==="ZXY"){const _=m*g,x=m*v,E=p*g,D=p*v;n[0]=_-D*d,n[4]=-u*v,n[8]=E+x*d,n[1]=x+E*d,n[5]=u*g,n[9]=D-_*d,n[2]=-u*p,n[6]=d,n[10]=u*m}else if(t.order==="ZYX"){const _=u*g,x=u*v,E=d*g,D=d*v;n[0]=m*g,n[4]=E*p-x,n[8]=_*p+D,n[1]=m*v,n[5]=D*p+_,n[9]=x*p-E,n[2]=-p,n[6]=d*m,n[10]=u*m}else if(t.order==="YZX"){const _=u*m,x=u*p,E=d*m,D=d*p;n[0]=m*g,n[4]=D-_*v,n[8]=E*v+x,n[1]=v,n[5]=u*g,n[9]=-d*g,n[2]=-p*g,n[6]=x*v+E,n[10]=_-D*v}else if(t.order==="XZY"){const _=u*m,x=u*p,E=d*m,D=d*p;n[0]=m*g,n[4]=-v,n[8]=p*g,n[1]=_*v+D,n[5]=u*g,n[9]=x*v-E,n[2]=E*v-x,n[6]=d*g,n[10]=D*v+_}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(QM,t,jM)}lookAt(t,n,a){const o=this.elements;return yi.subVectors(t,n),yi.lengthSq()===0&&(yi.z=1),yi.normalize(),_s.crossVectors(a,yi),_s.lengthSq()===0&&(Math.abs(a.z)===1?yi.x+=1e-4:yi.z+=1e-4,yi.normalize(),_s.crossVectors(a,yi)),_s.normalize(),Hc.crossVectors(yi,_s),o[0]=_s.x,o[4]=Hc.x,o[8]=yi.x,o[1]=_s.y,o[5]=Hc.y,o[9]=yi.y,o[2]=_s.z,o[6]=Hc.z,o[10]=yi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,u=a[0],d=a[4],m=a[8],p=a[12],g=a[1],v=a[5],_=a[9],x=a[13],E=a[2],D=a[6],M=a[10],S=a[14],C=a[3],P=a[7],A=a[11],L=a[15],N=o[0],I=o[4],T=o[8],U=o[12],B=o[1],X=o[5],q=o[9],K=o[13],H=o[2],Q=o[6],F=o[10],k=o[14],lt=o[3],et=o[7],ft=o[11],O=o[15];return c[0]=u*N+d*B+m*H+p*lt,c[4]=u*I+d*X+m*Q+p*et,c[8]=u*T+d*q+m*F+p*ft,c[12]=u*U+d*K+m*k+p*O,c[1]=g*N+v*B+_*H+x*lt,c[5]=g*I+v*X+_*Q+x*et,c[9]=g*T+v*q+_*F+x*ft,c[13]=g*U+v*K+_*k+x*O,c[2]=E*N+D*B+M*H+S*lt,c[6]=E*I+D*X+M*Q+S*et,c[10]=E*T+D*q+M*F+S*ft,c[14]=E*U+D*K+M*k+S*O,c[3]=C*N+P*B+A*H+L*lt,c[7]=C*I+P*X+A*Q+L*et,c[11]=C*T+P*q+A*F+L*ft,c[15]=C*U+P*K+A*k+L*O,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[12],u=t[1],d=t[5],m=t[9],p=t[13],g=t[2],v=t[6],_=t[10],x=t[14],E=t[3],D=t[7],M=t[11],S=t[15],C=m*x-p*_,P=d*x-p*v,A=d*_-m*v,L=u*x-p*g,N=u*_-m*g,I=u*v-d*g;return n*(D*C-M*P+S*A)-a*(E*C-M*L+S*N)+o*(E*P-D*L+S*I)-c*(E*A-D*N+M*I)}determinantAffine(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[1],u=t[5],d=t[9],m=t[2],p=t[6],g=t[10];return n*(u*g-d*p)-a*(c*g-d*m)+o*(c*p-u*m)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=n,o[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],u=t[4],d=t[5],m=t[6],p=t[7],g=t[8],v=t[9],_=t[10],x=t[11],E=t[12],D=t[13],M=t[14],S=t[15],C=n*d-a*u,P=n*m-o*u,A=n*p-c*u,L=a*m-o*d,N=a*p-c*d,I=o*p-c*m,T=g*D-v*E,U=g*M-_*E,B=g*S-x*E,X=v*M-_*D,q=v*S-x*D,K=_*S-x*M,H=C*K-P*q+A*X+L*B-N*U+I*T;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Q=1/H;return t[0]=(d*K-m*q+p*X)*Q,t[1]=(o*q-a*K-c*X)*Q,t[2]=(D*I-M*N+S*L)*Q,t[3]=(_*N-v*I-x*L)*Q,t[4]=(m*B-u*K-p*U)*Q,t[5]=(n*K-o*B+c*U)*Q,t[6]=(M*A-E*I-S*P)*Q,t[7]=(g*I-_*A+x*P)*Q,t[8]=(u*q-d*B+p*T)*Q,t[9]=(a*B-n*q-c*T)*Q,t[10]=(E*N-D*A+S*C)*Q,t[11]=(v*A-g*N-x*C)*Q,t[12]=(d*U-u*X-m*T)*Q,t[13]=(n*X-a*U+o*T)*Q,t[14]=(D*P-E*L-M*C)*Q,t[15]=(g*L-v*P+_*C)*Q,this}scale(t){const n=this.elements,a=t.x,o=t.y,c=t.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,u=t.x,d=t.y,m=t.z,p=c*u,g=c*d;return this.set(p*u+a,p*d-o*m,p*m+o*d,0,p*d+o*m,g*d+a,g*m-o*u,0,p*m-o*d,g*m+o*u,c*m*m+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,o,c,u){return this.set(1,a,c,0,t,1,u,0,n,o,1,0,0,0,0,1),this}compose(t,n,a){const o=this.elements,c=n._x,u=n._y,d=n._z,m=n._w,p=c+c,g=u+u,v=d+d,_=c*p,x=c*g,E=c*v,D=u*g,M=u*v,S=d*v,C=m*p,P=m*g,A=m*v,L=a.x,N=a.y,I=a.z;return o[0]=(1-(D+S))*L,o[1]=(x+A)*L,o[2]=(E-P)*L,o[3]=0,o[4]=(x-A)*N,o[5]=(1-(_+S))*N,o[6]=(M+C)*N,o[7]=0,o[8]=(E+P)*I,o[9]=(M-C)*I,o[10]=(1-(_+D))*I,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,n,a){const o=this.elements;t.x=o[12],t.y=o[13],t.z=o[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let u=Fr.set(o[0],o[1],o[2]).length();const d=Fr.set(o[4],o[5],o[6]).length(),m=Fr.set(o[8],o[9],o[10]).length();c<0&&(u=-u),Vi.copy(this);const p=1/u,g=1/d,v=1/m;return Vi.elements[0]*=p,Vi.elements[1]*=p,Vi.elements[2]*=p,Vi.elements[4]*=g,Vi.elements[5]*=g,Vi.elements[6]*=g,Vi.elements[8]*=v,Vi.elements[9]*=v,Vi.elements[10]*=v,n.setFromRotationMatrix(Vi),a.x=u,a.y=d,a.z=m,this}makePerspective(t,n,a,o,c,u,d=la,m=!1){const p=this.elements,g=2*c/(n-t),v=2*c/(a-o),_=(n+t)/(n-t),x=(a+o)/(a-o);let E,D;if(m)E=c/(u-c),D=u*c/(u-c);else if(d===la)E=-(u+c)/(u-c),D=-2*u*c/(u-c);else if(d===Ml)E=-u/(u-c),D=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=_,p[12]=0,p[1]=0,p[5]=v,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=D,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,a,o,c,u,d=la,m=!1){const p=this.elements,g=2/(n-t),v=2/(a-o),_=-(n+t)/(n-t),x=-(a+o)/(a-o);let E,D;if(m)E=1/(u-c),D=u/(u-c);else if(d===la)E=-2/(u-c),D=-(u+c)/(u-c);else if(d===Ml)E=-1/(u-c),D=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=0,p[12]=_,p[1]=0,p[5]=v,p[9]=0,p[13]=x,p[2]=0,p[6]=0,p[10]=E,p[14]=D,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}}const Fr=new V,Vi=new je,QM=new V(0,0,0),jM=new V(1,1,1),_s=new V,Hc=new V,yi=new V,Fv=new je,Hv=new lo;class Rs{constructor(t=0,n=0,a=0,o=Rs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,o=this._order){return this._x=t,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const o=t.elements,c=o[0],u=o[4],d=o[8],m=o[1],p=o[5],g=o[9],v=o[2],_=o[6],x=o[10];switch(n){case"XYZ":this._y=Math.asin(Me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,x),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(_,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,x),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(Me(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-v,x),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Me(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(_,x),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(Me(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(d,x));break;case"XZY":this._z=Math.asin(-Me(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(_,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,x),this._y=0);break;default:ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return Fv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fv,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Hv.setFromEuler(this),this.setFromQuaternion(Hv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rs.DEFAULT_ORDER="XYZ";class Rp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let $M=0;const Gv=new V,Hr=new lo,Oa=new je,Gc=new V,nl=new V,t1=new V,e1=new lo,Vv=new V(1,0,0),kv=new V(0,1,0),Xv=new V(0,0,1),Wv={type:"added"},n1={type:"removed"},Gr={type:"childadded",child:null},Zh={type:"childremoved",child:null};class Dn extends sr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$M++}),this.uuid=rr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Dn.DEFAULT_UP.clone();const t=new V,n=new Rs,a=new lo,o=new V(1,1,1);function c(){a.setFromEuler(n,!1)}function u(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new je},normalMatrix:{value:new he}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=Dn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Hr.setFromAxisAngle(t,n),this.quaternion.multiply(Hr),this}rotateOnWorldAxis(t,n){return Hr.setFromAxisAngle(t,n),this.quaternion.premultiply(Hr),this}rotateX(t){return this.rotateOnAxis(Vv,t)}rotateY(t){return this.rotateOnAxis(kv,t)}rotateZ(t){return this.rotateOnAxis(Xv,t)}translateOnAxis(t,n){return Gv.copy(t).applyQuaternion(this.quaternion),this.position.add(Gv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Vv,t)}translateY(t){return this.translateOnAxis(kv,t)}translateZ(t){return this.translateOnAxis(Xv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Oa.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Gc.copy(t):Gc.set(t,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),nl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oa.lookAt(nl,Gc,this.up):Oa.lookAt(Gc,nl,this.up),this.quaternion.setFromRotationMatrix(Oa),o&&(Oa.extractRotation(o.matrixWorld),Hr.setFromRotationMatrix(Oa),this.quaternion.premultiply(Hr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Oe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wv),Gr.child=t,this.dispatchEvent(Gr),Gr.child=null):Oe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(n1),Zh.child=t,this.dispatchEvent(Zh),Zh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Oa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Oa.multiply(t.parent.matrixWorld)),t.applyMatrix4(Oa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wv),Gr.child=t,this.dispatchEvent(Gr),Gr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const u=this.children[a].getObjectByProperty(t,n);if(u!==void 0)return u}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const o=this.children;for(let c=0,u=o.length;c<u;c++)o[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,t,t1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,e1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,a=t.y,o=t.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*o,c[13]+=a-c[1]*n-c[5]*a-c[9]*o,c[14]+=o-c[2]*n-c[6]*a-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n,a=!1){const o=this.parent;if(t===!0&&o!==null&&o.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let u=0,d=c.length;u<d;u++)c[u].updateWorldMatrix(!1,!0,a)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,o.name=this.name,o.castShadow=this.castShadow,o.receiveShadow=this.receiveShadow,o.visible=this.visible,o.frustumCulled=this.frustumCulled,o.renderOrder=this.renderOrder,o.static=this.static,o.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(d=>({...d})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(t),o.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const v=m[p];c(t.shapes,v)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));o.material=d}else o.material=c(t.materials,this.material);if(this.children.length>0){o.children=[];for(let d=0;d<this.children.length;d++)o.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];o.animations.push(c(t.animations,m))}}if(n){const d=u(t.geometries),m=u(t.materials),p=u(t.textures),g=u(t.images),v=u(t.shapes),_=u(t.skeletons),x=u(t.animations),E=u(t.nodes);d.length>0&&(a.geometries=d),m.length>0&&(a.materials=m),p.length>0&&(a.textures=p),g.length>0&&(a.images=g),v.length>0&&(a.shapes=v),_.length>0&&(a.skeletons=_),x.length>0&&(a.animations=x),E.length>0&&(a.nodes=E)}return a.object=o,a;function u(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const o=t.children[a];this.add(o.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Dn.DEFAULT_UP=new V(0,1,0);Dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Nn extends Dn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const i1={type:"move"};class Kh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let o=null,c=null,u=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(p&&t.hand){u=!0;for(const D of t.hand.values()){const M=n.getJointPose(D,a),S=this._getHandJoint(p,D);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const g=p.joints["index-finger-tip"],v=p.joints["thumb-tip"],_=g.position.distanceTo(v.position),x=.02,E=.005;p.inputState.pinching&&_>x+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&_<=x-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));d!==null&&(o=n.getPose(t.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(d.matrix.fromArray(o.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,o.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(o.linearVelocity)):d.hasLinearVelocity=!1,o.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(o.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(i1)))}return d!==null&&(d.visible=o!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new Nn;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const sx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xs={h:0,s:0,l:0},Vc={h:0,s:0,l:0};function Jh(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class pe{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=si){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,De.colorSpaceToWorking(this,n),this}setRGB(t,n,a,o=De.workingColorSpace){return this.r=t,this.g=n,this.b=a,De.colorSpaceToWorking(this,o),this}setHSL(t,n,a,o=De.workingColorSpace){if(t=Ap(t,1),n=Me(n,0,1),a=Me(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,u=2*a-c;this.r=Jh(u,c,t+1/3),this.g=Jh(u,c,t),this.b=Jh(u,c,t-1/3)}return De.colorSpaceToWorking(this,o),this}setStyle(t,n=si){function a(c){c!==void 0&&parseFloat(c)<1&&ce("Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const u=o[1],d=o[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:ce("Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=o[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);ce("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=si){const a=sx[t.toLowerCase()];return a!==void 0?this.setHex(a,n):ce("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ka(t.r),this.g=ka(t.g),this.b=ka(t.b),this}copyLinearToSRGB(t){return this.r=no(t.r),this.g=no(t.g),this.b=no(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=si){return De.workingToColorSpace(Qn.copy(this),t),Math.round(Me(Qn.r*255,0,255))*65536+Math.round(Me(Qn.g*255,0,255))*256+Math.round(Me(Qn.b*255,0,255))}getHexString(t=si){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=De.workingColorSpace){De.workingToColorSpace(Qn.copy(this),n);const a=Qn.r,o=Qn.g,c=Qn.b,u=Math.max(a,o,c),d=Math.min(a,o,c);let m,p;const g=(d+u)/2;if(d===u)m=0,p=0;else{const v=u-d;switch(p=g<=.5?v/(u+d):v/(2-u-d),u){case a:m=(o-c)/v+(o<c?6:0);break;case o:m=(c-a)/v+2;break;case c:m=(a-o)/v+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,n=De.workingColorSpace){return De.workingToColorSpace(Qn.copy(this),n),t.r=Qn.r,t.g=Qn.g,t.b=Qn.b,t}getStyle(t=si){De.workingToColorSpace(Qn.copy(this),t);const n=Qn.r,a=Qn.g,o=Qn.b;return t!==si?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(t,n,a){return this.getHSL(xs),this.setHSL(xs.h+t,xs.s+n,xs.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(xs),t.getHSL(Vc);const a=pl(xs.h,Vc.h,n),o=pl(xs.s,Vc.s,n),c=pl(xs.l,Vc.l,n);return this.setHSL(a,o,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,o=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qn=new pe;pe.NAMES=sx;class a1 extends Dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rs,this.environmentIntensity=1,this.environmentRotation=new Rs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const ki=new V,Pa=new V,Qh=new V,Ia=new V,Vr=new V,kr=new V,qv=new V,jh=new V,$h=new V,td=new V,ed=new un,nd=new un,id=new un;class qi{constructor(t=new V,n=new V,a=new V){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,o){o.subVectors(a,n),ki.subVectors(t,n),o.cross(ki);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(t,n,a,o,c){ki.subVectors(o,n),Pa.subVectors(a,n),Qh.subVectors(t,n);const u=ki.dot(ki),d=ki.dot(Pa),m=ki.dot(Qh),p=Pa.dot(Pa),g=Pa.dot(Qh),v=u*p-d*d;if(v===0)return c.set(0,0,0),null;const _=1/v,x=(p*m-d*g)*_,E=(u*g-d*m)*_;return c.set(1-x-E,E,x)}static containsPoint(t,n,a,o){return this.getBarycoord(t,n,a,o,Ia)===null?!1:Ia.x>=0&&Ia.y>=0&&Ia.x+Ia.y<=1}static getInterpolation(t,n,a,o,c,u,d,m){return this.getBarycoord(t,n,a,o,Ia)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Ia.x),m.addScaledVector(u,Ia.y),m.addScaledVector(d,Ia.z),m)}static getInterpolatedAttribute(t,n,a,o,c,u){return ed.setScalar(0),nd.setScalar(0),id.setScalar(0),ed.fromBufferAttribute(t,n),nd.fromBufferAttribute(t,a),id.fromBufferAttribute(t,o),u.setScalar(0),u.addScaledVector(ed,c.x),u.addScaledVector(nd,c.y),u.addScaledVector(id,c.z),u}static isFrontFacing(t,n,a,o){return ki.subVectors(a,n),Pa.subVectors(t,n),ki.cross(Pa).dot(o)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,o){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,n,a,o){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ki.subVectors(this.c,this.b),Pa.subVectors(this.a,this.b),ki.cross(Pa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return qi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return qi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,o,c){return qi.getInterpolation(t,this.a,this.b,this.c,n,a,o,c)}containsPoint(t){return qi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return qi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,o=this.b,c=this.c;let u,d;Vr.subVectors(o,a),kr.subVectors(c,a),jh.subVectors(t,a);const m=Vr.dot(jh),p=kr.dot(jh);if(m<=0&&p<=0)return n.copy(a);$h.subVectors(t,o);const g=Vr.dot($h),v=kr.dot($h);if(g>=0&&v<=g)return n.copy(o);const _=m*v-g*p;if(_<=0&&m>=0&&g<=0)return u=m/(m-g),n.copy(a).addScaledVector(Vr,u);td.subVectors(t,c);const x=Vr.dot(td),E=kr.dot(td);if(E>=0&&x<=E)return n.copy(c);const D=x*p-m*E;if(D<=0&&p>=0&&E<=0)return d=p/(p-E),n.copy(a).addScaledVector(kr,d);const M=g*E-x*v;if(M<=0&&v-g>=0&&x-E>=0)return qv.subVectors(c,o),d=(v-g)/(v-g+(x-E)),n.copy(o).addScaledVector(qv,d);const S=1/(M+D+_);return u=D*S,d=_*S,n.copy(a).addScaledVector(Vr,u).addScaledVector(kr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Rl{constructor(t=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Xi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Xi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Xi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let u=0,d=c.count;u<d;u++)t.isMesh===!0?t.getVertexPosition(u,Xi):Xi.fromBufferAttribute(c,u),Xi.applyMatrix4(t.matrixWorld),this.expandByPoint(Xi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),kc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),kc.copy(a.boundingBox)),kc.applyMatrix4(t.matrixWorld),this.union(kc)}const o=t.children;for(let c=0,u=o.length;c<u;c++)this.expandByObject(o[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Xi),Xi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(il),Xc.subVectors(this.max,il),Xr.subVectors(t.a,il),Wr.subVectors(t.b,il),qr.subVectors(t.c,il),Ss.subVectors(Wr,Xr),ys.subVectors(qr,Wr),Ys.subVectors(Xr,qr);let n=[0,-Ss.z,Ss.y,0,-ys.z,ys.y,0,-Ys.z,Ys.y,Ss.z,0,-Ss.x,ys.z,0,-ys.x,Ys.z,0,-Ys.x,-Ss.y,Ss.x,0,-ys.y,ys.x,0,-Ys.y,Ys.x,0];return!ad(n,Xr,Wr,qr,Xc)||(n=[1,0,0,0,1,0,0,0,1],!ad(n,Xr,Wr,qr,Xc))?!1:(Wc.crossVectors(Ss,ys),n=[Wc.x,Wc.y,Wc.z],ad(n,Xr,Wr,qr,Xc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Xi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Xi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(za[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),za[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),za[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),za[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),za[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),za[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),za[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),za[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(za),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const za=[new V,new V,new V,new V,new V,new V,new V,new V],Xi=new V,kc=new Rl,Xr=new V,Wr=new V,qr=new V,Ss=new V,ys=new V,Ys=new V,il=new V,Xc=new V,Wc=new V,Zs=new V;function ad(r,t,n,a,o){for(let c=0,u=r.length-3;c<=u;c+=3){Zs.fromArray(r,c);const d=o.x*Math.abs(Zs.x)+o.y*Math.abs(Zs.y)+o.z*Math.abs(Zs.z),m=t.dot(Zs),p=n.dot(Zs),g=a.dot(Zs);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const Rn=new V,qc=new Wt;let s1=0;class Ki extends sr{constructor(t,n,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:s1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=bM,this.updateRanges=[],this.gpuType=oa,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[t+o]=n.array[a+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)qc.fromBufferAttribute(this,n),qc.applyMatrix3(t),this.setXY(n,qc.x,qc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)Rn.fromBufferAttribute(this,n),Rn.applyMatrix3(t),this.setXYZ(n,Rn.x,Rn.y,Rn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)Rn.fromBufferAttribute(this,n),Rn.applyMatrix4(t),this.setXYZ(n,Rn.x,Rn.y,Rn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)Rn.fromBufferAttribute(this,n),Rn.applyNormalMatrix(t),this.setXYZ(n,Rn.x,Rn.y,Rn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)Rn.fromBufferAttribute(this,n),Rn.transformDirection(t),this.setXYZ(n,Rn.x,Rn.y,Rn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=$r(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=ii(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=$r(n,this.array)),n}setX(t,n){return this.normalized&&(n=ii(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=$r(n,this.array)),n}setY(t,n){return this.normalized&&(n=ii(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=$r(n,this.array)),n}setZ(t,n){return this.normalized&&(n=ii(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=$r(n,this.array)),n}setW(t,n){return this.normalized&&(n=ii(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=ii(n,this.array),a=ii(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,o){return t*=this.itemSize,this.normalized&&(n=ii(n,this.array),a=ii(a,this.array),o=ii(o,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this}setXYZW(t,n,a,o,c){return t*=this.itemSize,this.normalized&&(n=ii(n,this.array),a=ii(a,this.array),o=ii(o,this.array),c=ii(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class rx extends Ki{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class ox extends Ki{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class Re extends Ki{constructor(t,n,a){super(new Float32Array(t),n,a)}}const r1=new Rl,al=new V,sd=new V;class bu{constructor(t=new V,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):r1.setFromPoints(t).getCenter(a);let o=0;for(let c=0,u=t.length;c<u;c++)o=Math.max(o,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;al.subVectors(t,this.center);const n=al.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(al,o/a),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sd.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(al.copy(t.center).add(sd)),this.expandByPoint(al.copy(t.center).sub(sd))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let o1=0;const Pi=new je,rd=new Dn,Yr=new V,Mi=new Rl,sl=new Rl,Bn=new V;class Sn extends sr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:o1++}),this.uuid=rr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(TM(t)?ox:rx)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new he().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Pi.makeRotationFromQuaternion(t),this.applyMatrix4(Pi),this}rotateX(t){return Pi.makeRotationX(t),this.applyMatrix4(Pi),this}rotateY(t){return Pi.makeRotationY(t),this.applyMatrix4(Pi),this}rotateZ(t){return Pi.makeRotationZ(t),this.applyMatrix4(Pi),this}translate(t,n,a){return Pi.makeTranslation(t,n,a),this.applyMatrix4(Pi),this}scale(t,n,a){return Pi.makeScale(t,n,a),this.applyMatrix4(Pi),this}lookAt(t){return rd.lookAt(t),rd.updateMatrix(),this.applyMatrix4(rd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yr).negate(),this.translate(Yr.x,Yr.y,Yr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=t.length;o<c;o++){const u=t[o];a.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Re(a,3))}else{const a=Math.min(t.length,n.count);for(let o=0;o<a;o++){const c=t[o];n.setXYZ(o,c.x,c.y,c.z||0)}t.length>n.count&&ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];Mi.setFromBufferAttribute(c),this.morphTargetsRelative?(Bn.addVectors(this.boundingBox.min,Mi.min),this.boundingBox.expandByPoint(Bn),Bn.addVectors(this.boundingBox.max,Mi.max),this.boundingBox.expandByPoint(Bn)):(this.boundingBox.expandByPoint(Mi.min),this.boundingBox.expandByPoint(Mi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bu);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const a=this.boundingSphere.center;if(Mi.setFromBufferAttribute(t),n)for(let c=0,u=n.length;c<u;c++){const d=n[c];sl.setFromBufferAttribute(d),this.morphTargetsRelative?(Bn.addVectors(Mi.min,sl.min),Mi.expandByPoint(Bn),Bn.addVectors(Mi.max,sl.max),Mi.expandByPoint(Bn)):(Mi.expandByPoint(sl.min),Mi.expandByPoint(sl.max))}Mi.getCenter(a);let o=0;for(let c=0,u=t.count;c<u;c++)Bn.fromBufferAttribute(t,c),o=Math.max(o,a.distanceToSquared(Bn));if(n)for(let c=0,u=n.length;c<u;c++){const d=n[c],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)Bn.fromBufferAttribute(d,p),m&&(Yr.fromBufferAttribute(t,p),Bn.add(Yr)),o=Math.max(o,a.distanceToSquared(Bn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&Oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;let u=this.getAttribute("tangent");(u===void 0||u.count!==a.count)&&(u=new Ki(new Float32Array(4*a.count),4),this.setAttribute("tangent",u));const d=[],m=[];for(let T=0;T<a.count;T++)d[T]=new V,m[T]=new V;const p=new V,g=new V,v=new V,_=new Wt,x=new Wt,E=new Wt,D=new V,M=new V;function S(T,U,B){p.fromBufferAttribute(a,T),g.fromBufferAttribute(a,U),v.fromBufferAttribute(a,B),_.fromBufferAttribute(c,T),x.fromBufferAttribute(c,U),E.fromBufferAttribute(c,B),g.sub(p),v.sub(p),x.sub(_),E.sub(_);const X=1/(x.x*E.y-E.x*x.y);isFinite(X)&&(D.copy(g).multiplyScalar(E.y).addScaledVector(v,-x.y).multiplyScalar(X),M.copy(v).multiplyScalar(x.x).addScaledVector(g,-E.x).multiplyScalar(X),d[T].add(D),d[U].add(D),d[B].add(D),m[T].add(M),m[U].add(M),m[B].add(M))}let C=this.groups;C.length===0&&(C=[{start:0,count:t.count}]);for(let T=0,U=C.length;T<U;++T){const B=C[T],X=B.start,q=B.count;for(let K=X,H=X+q;K<H;K+=3)S(t.getX(K+0),t.getX(K+1),t.getX(K+2))}const P=new V,A=new V,L=new V,N=new V;function I(T){L.fromBufferAttribute(o,T),N.copy(L);const U=d[T];P.copy(U),P.sub(L.multiplyScalar(L.dot(U))).normalize(),A.crossVectors(N,U);const X=A.dot(m[T])<0?-1:1;u.setXYZW(T,P.x,P.y,P.z,X)}for(let T=0,U=C.length;T<U;++T){const B=C[T],X=B.start,q=B.count;for(let K=X,H=X+q;K<H;K+=3)I(t.getX(K+0)),I(t.getX(K+1)),I(t.getX(K+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new Ki(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let _=0,x=a.count;_<x;_++)a.setXYZ(_,0,0,0);const o=new V,c=new V,u=new V,d=new V,m=new V,p=new V,g=new V,v=new V;if(t)for(let _=0,x=t.count;_<x;_+=3){const E=t.getX(_+0),D=t.getX(_+1),M=t.getX(_+2);o.fromBufferAttribute(n,E),c.fromBufferAttribute(n,D),u.fromBufferAttribute(n,M),g.subVectors(u,c),v.subVectors(o,c),g.cross(v),d.fromBufferAttribute(a,E),m.fromBufferAttribute(a,D),p.fromBufferAttribute(a,M),d.add(g),m.add(g),p.add(g),a.setXYZ(E,d.x,d.y,d.z),a.setXYZ(D,m.x,m.y,m.z),a.setXYZ(M,p.x,p.y,p.z)}else for(let _=0,x=n.count;_<x;_+=3)o.fromBufferAttribute(n,_+0),c.fromBufferAttribute(n,_+1),u.fromBufferAttribute(n,_+2),g.subVectors(u,c),v.subVectors(o,c),g.cross(v),a.setXYZ(_+0,g.x,g.y,g.z),a.setXYZ(_+1,g.x,g.y,g.z),a.setXYZ(_+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)Bn.fromBufferAttribute(t,n),Bn.normalize(),t.setXYZ(n,Bn.x,Bn.y,Bn.z)}toNonIndexed(){function t(d,m){const p=d.array,g=d.itemSize,v=d.normalized,_=new p.constructor(m.length*g);let x=0,E=0;for(let D=0,M=m.length;D<M;D++){d.isInterleavedBufferAttribute?x=m[D]*d.data.stride+d.offset:x=m[D]*g;for(let S=0;S<g;S++)_[E++]=p[x++]}return new Ki(_,g,v)}if(this.index===null)return ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Sn,a=this.index.array,o=this.attributes;for(const d in o){const m=o[d],p=t(m,a);n.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let g=0,v=p.length;g<v;g++){const _=p[g],x=t(_,a);m.push(x)}n.morphAttributes[d]=m}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,m=u.length;d<m;d++){const p=u[d];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const m in a){const p=a[m];t.data.attributes[m]=p.toJSON(t.data)}const o={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let v=0,_=p.length;v<_;v++){const x=p[v];g.push(x.toJSON(t.data))}g.length>0&&(o[m]=g,c=!0)}c&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(t.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere=d.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const o=t.attributes;for(const p in o){const g=o[p];this.setAttribute(p,g.clone(n))}const c=t.morphAttributes;for(const p in c){const g=[],v=c[p];for(let _=0,x=v.length;_<x;_++)g.push(v[_].clone(n));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const u=t.groups;for(let p=0,g=u.length;p<g;p++){const v=u[p];this.addGroup(v.start,v.count,v.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const od=new V,l1=new V,c1=new he;class Ha{constructor(t=new V(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,o){return this.normal.set(t,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const o=od.subVectors(a,n).cross(l1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,a=!0){const o=t.delta(od),c=this.normal.dot(o);if(c===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/c;return a===!0&&(u<0||u>1)?null:n.copy(t.start).addScaledVector(o,u)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||c1.getNormalMatrix(t),o=this.coplanarPoint(od).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let u1=0;class co extends sr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:u1++}),this.uuid=rr(),this.name="",this.type="Material",this.blending=hl,this.side=ws,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=H_,this.blendDst=G_,this.blendEquation=jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pe(0,0,0),this.blendAlpha=0,this.depthFunc=xl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=kh,this.stencilZFail=kh,this.stencilZPass=kh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){ce(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){ce(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector2&&a&&a.isVector2||o&&o.isEuler&&a&&a.isEuler||o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,a.blending=this.blending,a.side=this.side,a.shadowSide=this.shadowSide,a.vertexColors=this.vertexColors,a.opacity=this.opacity,a.transparent=this.transparent,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.blendSrcAlpha=this.blendSrcAlpha,a.blendDstAlpha=this.blendDstAlpha,a.blendEquationAlpha=this.blendEquationAlpha,a.blendColor=this.blendColor.getHex(),a.blendAlpha=this.blendAlpha,a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.colorWrite=this.colorWrite,a.clipIntersection=this.clipIntersection,a.clipShadows=this.clipShadows,a.stencilWriteMask=this.stencilWriteMask,a.stencilFunc=this.stencilFunc,a.stencilRef=this.stencilRef,a.stencilFuncMask=this.stencilFuncMask,a.stencilFail=this.stencilFail,a.stencilZFail=this.stencilZFail,a.stencilZPass=this.stencilZPass,a.stencilWrite=this.stencilWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.dithering=this.dithering,a.alphaTest=this.alphaTest,a.alphaHash=this.alphaHash,a.alphaToCoverage=this.alphaToCoverage,a.premultipliedAlpha=this.premultipliedAlpha,a.forceSinglePass=this.forceSinglePass,a.allowOverride=this.allowOverride,a.visible=this.visible,a.toneMapped=this.toneMapped,a.name=this.name,this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(a.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(a.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(a.rotation=this.rotation),this.depthPacking!==void 0&&(a.depthPacking=this.depthPacking),this.linewidth!==void 0&&(a.linewidth=this.linewidth),this.linecap!==void 0&&(a.linecap=this.linecap),this.linejoin!==void 0&&(a.linejoin=this.linejoin),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.wireframe!==void 0&&(a.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(a.flatShading=this.flatShading),this.fog!==void 0&&(a.fog=this.fog),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const u=[];for(const d in c){const m=c[d];delete m.metadata,u.push(m)}return u}if(n){const c=o(t.textures),u=o(t.images);c.length>0&&(a.textures=c),u.length>0&&(a.images=u)}return a}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new pe().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(a=>new Ha().fromJSON(a))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new Wt().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Wt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Ba=new V,ld=new V,Yc=new V,Zc=new V;class Cp{constructor(t=new V,n=new V(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ba)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Ba.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Ba.copy(this.origin).addScaledVector(this.direction,n),Ba.distanceToSquared(t))}distanceSqToSegment(t,n,a,o){ld.copy(t).add(n).multiplyScalar(.5),Yc.copy(n).sub(t).normalize(),Zc.copy(this.origin).sub(ld);const c=t.distanceTo(n)*.5,u=-this.direction.dot(Yc),d=Zc.dot(this.direction),m=-Zc.dot(Yc),p=Zc.lengthSq(),g=Math.abs(1-u*u);let v,_,x,E;if(g>0)if(v=u*m-d,_=u*d-m,E=c*g,v>=0)if(_>=-E)if(_<=E){const D=1/g;v*=D,_*=D,x=v*(v+u*_+2*d)+_*(u*v+_+2*m)+p}else _=c,v=Math.max(0,-(u*_+d)),x=-v*v+_*(_+2*m)+p;else _=-c,v=Math.max(0,-(u*_+d)),x=-v*v+_*(_+2*m)+p;else _<=-E?(v=Math.max(0,-(-u*c+d)),_=v>0?-c:Math.min(Math.max(-c,-m),c),x=-v*v+_*(_+2*m)+p):_<=E?(v=0,_=Math.min(Math.max(-c,-m),c),x=_*(_+2*m)+p):(v=Math.max(0,-(u*c+d)),_=v>0?c:Math.min(Math.max(-c,-m),c),x=-v*v+_*(_+2*m)+p);else _=u>0?-c:c,v=Math.max(0,-(u*_+d)),x=-v*v+_*(_+2*m)+p;return a&&a.copy(this.origin).addScaledVector(this.direction,v),o&&o.copy(ld).addScaledVector(Yc,_),x}intersectSphere(t,n){if(t.radius<0)return null;Ba.subVectors(t.center,this.origin);const a=Ba.dot(this.direction),o=Ba.dot(Ba)-a*a,c=t.radius*t.radius;if(o>c)return null;const u=Math.sqrt(c-o),d=a-u,m=a+u;return m<0?null:d<0?this.at(m,n):this.at(d,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,o,c,u,d,m;const p=1/this.direction.x,g=1/this.direction.y,v=1/this.direction.z,_=this.origin;return p>=0?(a=(t.min.x-_.x)*p,o=(t.max.x-_.x)*p):(a=(t.max.x-_.x)*p,o=(t.min.x-_.x)*p),g>=0?(c=(t.min.y-_.y)*g,u=(t.max.y-_.y)*g):(c=(t.max.y-_.y)*g,u=(t.min.y-_.y)*g),a>u||c>o||((c>a||isNaN(a))&&(a=c),(u<o||isNaN(o))&&(o=u),v>=0?(d=(t.min.z-_.z)*v,m=(t.max.z-_.z)*v):(d=(t.max.z-_.z)*v,m=(t.min.z-_.z)*v),a>m||d>o)||((d>a||a!==a)&&(a=d),(m<o||o!==o)&&(o=m),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(t){return this.intersectBox(t,Ba)!==null}intersectTriangle(t,n,a,o,c){const u=this.origin,d=this.direction,m=d.x,p=d.y,g=d.z,v=t.x-u.x,_=t.y-u.y,x=t.z-u.z,E=n.x-u.x,D=n.y-u.y,M=n.z-u.z,S=a.x-u.x,C=a.y-u.y,P=a.z-u.z,A=Math.abs(m),L=Math.abs(p),N=Math.abs(g);let I,T,U,B,X,q,K,H,Q,F,k,lt;if(A>=L&&A>=N?(U=m,q=v,Q=E,lt=S,m>=0?(I=p,T=g,B=_,X=x,K=D,H=M,F=C,k=P):(I=g,T=p,B=x,X=_,K=M,H=D,F=P,k=C)):L>=N?(U=p,q=_,Q=D,lt=C,p>=0?(I=g,T=m,B=x,X=v,K=M,H=E,F=P,k=S):(I=m,T=g,B=v,X=x,K=E,H=M,F=S,k=P)):(U=g,q=x,Q=M,lt=P,g>=0?(I=m,T=p,B=v,X=_,K=E,H=D,F=S,k=C):(I=p,T=m,B=_,X=v,K=D,H=E,F=C,k=S)),U===0)return null;const et=I/U,ft=T/U,O=1/U,tt=B-et*q,dt=X-ft*q,bt=K-et*Q,Nt=H-ft*Q,Vt=F-et*lt,at=k-ft*lt,vt=Vt*Nt-at*bt,Rt=tt*at-dt*Vt,Kt=bt*dt-Nt*tt;if(o){if(vt<0||Rt<0||Kt<0)return null}else if((vt<0||Rt<0||Kt<0)&&(vt>0||Rt>0||Kt>0))return null;const Pt=vt+Rt+Kt;if(Pt===0)return null;const ue=O*(vt*q+Rt*Q+Kt*lt);return(Pt>0?ue<0:ue>0)?null:this.at(ue/Pt,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Dp extends co{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rs,this.combine=V_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Yv=new je,Ks=new Cp,Kc=new bu,Zv=new V,Jc=new V,Qc=new V,jc=new V,cd=new V,$c=new V,Kv=new V,tu=new V;class Jt extends Dn{constructor(t=new Sn,n=new Dp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const d=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,u=a.morphTargetsRelative;n.fromBufferAttribute(o,t);const d=this.morphTargetInfluences;if(c&&d){$c.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=d[m],v=c[m];g!==0&&(cd.fromBufferAttribute(v,t),u?$c.addScaledVector(cd,g):$c.addScaledVector(cd.sub(n),g))}n.add($c)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Kc.copy(a.boundingSphere),Kc.applyMatrix4(c),Ks.copy(t.ray).recast(t.near),!(Kc.containsPoint(Ks.origin)===!1&&(Ks.intersectSphere(Kc,Zv)===null||Ks.origin.distanceToSquared(Zv)>(t.far-t.near)**2))&&(Yv.copy(c).invert(),Ks.copy(t.ray).applyMatrix4(Yv),!(a.boundingBox!==null&&Ks.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Ks)))}_computeIntersections(t,n,a){let o;const c=this.geometry,u=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,v=c.attributes.normal,_=c.groups,x=c.drawRange;if(d!==null)if(Array.isArray(u))for(let E=0,D=_.length;E<D;E++){const M=_[E],S=u[M.materialIndex],C=Math.max(M.start,x.start),P=Math.min(d.count,Math.min(M.start+M.count,x.start+x.count));for(let A=C,L=P;A<L;A+=3){const N=d.getX(A),I=d.getX(A+1),T=d.getX(A+2);o=eu(this,S,t,a,p,g,v,N,I,T),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=M.materialIndex,n.push(o))}}else{const E=Math.max(0,x.start),D=Math.min(d.count,x.start+x.count);for(let M=E,S=D;M<S;M+=3){const C=d.getX(M),P=d.getX(M+1),A=d.getX(M+2);o=eu(this,u,t,a,p,g,v,C,P,A),o&&(o.faceIndex=Math.floor(M/3),n.push(o))}}else if(m!==void 0)if(Array.isArray(u))for(let E=0,D=_.length;E<D;E++){const M=_[E],S=u[M.materialIndex],C=Math.max(M.start,x.start),P=Math.min(m.count,Math.min(M.start+M.count,x.start+x.count));for(let A=C,L=P;A<L;A+=3){const N=A,I=A+1,T=A+2;o=eu(this,S,t,a,p,g,v,N,I,T),o&&(o.faceIndex=Math.floor(A/3),o.face.materialIndex=M.materialIndex,n.push(o))}}else{const E=Math.max(0,x.start),D=Math.min(m.count,x.start+x.count);for(let M=E,S=D;M<S;M+=3){const C=M,P=M+1,A=M+2;o=eu(this,u,t,a,p,g,v,C,P,A),o&&(o.faceIndex=Math.floor(M/3),n.push(o))}}}}function f1(r,t,n,a,o,c,u,d){let m;if(t.side===hi?m=a.intersectTriangle(u,c,o,!0,d):m=a.intersectTriangle(o,c,u,t.side===ws,d),m===null)return null;tu.copy(d),tu.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo(tu);return p<n.near||p>n.far?null:{distance:p,point:tu.clone(),object:r}}function eu(r,t,n,a,o,c,u,d,m,p){r.getVertexPosition(d,Jc),r.getVertexPosition(m,Qc),r.getVertexPosition(p,jc);const g=f1(r,t,n,a,Jc,Qc,jc,Kv);if(g){const v=new V;qi.getBarycoord(Kv,Jc,Qc,jc,v),o&&(g.uv=qi.getInterpolatedAttribute(o,d,m,p,v,new Wt)),c&&(g.uv1=qi.getInterpolatedAttribute(c,d,m,p,v,new Wt)),u&&(g.normal=qi.getInterpolatedAttribute(u,d,m,p,v,new V),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const _={a:d,b:m,c:p,normal:new V,materialIndex:0};qi.getNormal(Jc,Qc,jc,_.normal),g.face=_,g.barycoord=v}return g}class h1 extends qn{constructor(t=null,n=1,a=1,o,c,u,d,m,p=Wn,g=Wn,v,_){super(null,u,d,m,p,g,o,c,v,_),this.isDataTexture=!0,this.image={data:t,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Js=new bu,d1=new Wt(.5,.5),nu=new V;class Lp{constructor(t=new Ha,n=new Ha,a=new Ha,o=new Ha,c=new Ha,u=new Ha){this.planes=[t,n,a,o,c,u]}set(t,n,a,o,c,u){const d=this.planes;return d[0].copy(t),d[1].copy(n),d[2].copy(a),d[3].copy(o),d[4].copy(c),d[5].copy(u),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=la,a=!1){const o=this.planes,c=t.elements,u=c[0],d=c[1],m=c[2],p=c[3],g=c[4],v=c[5],_=c[6],x=c[7],E=c[8],D=c[9],M=c[10],S=c[11],C=c[12],P=c[13],A=c[14],L=c[15];if(o[0].setComponents(p-u,x-g,S-E,L-C).normalize(),o[1].setComponents(p+u,x+g,S+E,L+C).normalize(),o[2].setComponents(p+d,x+v,S+D,L+P).normalize(),o[3].setComponents(p-d,x-v,S-D,L-P).normalize(),a)o[4].setComponents(m,_,M,A).normalize(),o[5].setComponents(p-m,x-_,S-M,L-A).normalize();else if(o[4].setComponents(p-m,x-_,S-M,L-A).normalize(),n===la)o[5].setComponents(p+m,x+_,S+M,L+A).normalize();else if(n===Ml)o[5].setComponents(m,_,M,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Js.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Js)}intersectsSprite(t){Js.center.set(0,0,0);const n=d1.distanceTo(t.center);return Js.radius=.7071067811865476+n,Js.applyMatrix4(t.matrixWorld),this.intersectsSphere(Js)}intersectsSphere(t){const n=this.planes,a=t.center,o=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(nu.x=o.normal.x>0?t.max.x:t.min.x,nu.y=o.normal.y>0?t.max.y:t.min.y,nu.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint(nu)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lx extends co{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Jv=new je,cp=new Cp,iu=new bu,au=new V;class p1 extends Dn{constructor(t=new Sn,n=new lx){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,o=this.matrixWorld,c=t.params.Points.threshold,u=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),iu.copy(a.boundingSphere),iu.applyMatrix4(o),iu.radius+=c,t.ray.intersectsSphere(iu)===!1)return;Jv.copy(o).invert(),cp.copy(t.ray).applyMatrix4(Jv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=a.index,v=a.attributes.position;if(p!==null){const _=Math.max(0,u.start),x=Math.min(p.count,u.start+u.count);for(let E=_,D=x;E<D;E++){const M=p.getX(E);au.fromBufferAttribute(v,M),Qv(au,M,m,o,t,n,this)}}else{const _=Math.max(0,u.start),x=Math.min(v.count,u.start+u.count);for(let E=_,D=x;E<D;E++)au.fromBufferAttribute(v,E),Qv(au,E,m,o,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=o.length;c<u;c++){const d=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Qv(r,t,n,a,o,c,u){const d=cp.distanceSqToPoint(r);if(d<n){const m=new V;cp.closestPointToPoint(r,m),m.applyMatrix4(a);const p=o.ray.origin.distanceTo(m);if(p<o.near||p>o.far)return;c.push({distance:p,distanceToRay:Math.sqrt(d),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:u})}}class cx extends qn{constructor(t=[],n=nr,a,o,c,u,d,m,p,g){super(t,n,a,o,c,u,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ux extends qn{constructor(t,n,a,o,c,u,d,m,p){super(t,n,a,o,c,u,d,m,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bl extends qn{constructor(t,n,a=fa,o,c,u,d=Wn,m=Wn,p,g=Xa,v=1){if(g!==Xa&&g!==$s)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const _={width:t,height:n,depth:v};super(_,o,c,u,d,m,g,a,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new wp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}}class m1 extends bl{constructor(t,n=fa,a=nr,o,c,u=Wn,d=Wn,m,p=Xa){const g={width:t,height:t,depth:1},v=[g,g,g,g,g,g];super(t,t,n,a,o,c,u,d,m,p),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class fx extends qn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ji extends Sn{constructor(t=1,n=1,a=1,o=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:u};const d=this;o=Math.floor(o),c=Math.floor(c),u=Math.floor(u);const m=[],p=[],g=[],v=[];let _=0,x=0;E("z","y","x",-1,-1,a,n,t,u,c,0),E("z","y","x",1,-1,a,n,-t,u,c,1),E("x","z","y",1,1,t,a,n,o,u,2),E("x","z","y",1,-1,t,a,-n,o,u,3),E("x","y","z",1,-1,t,n,a,o,c,4),E("x","y","z",-1,-1,t,n,-a,o,c,5),this.setIndex(m),this.setAttribute("position",new Re(p,3)),this.setAttribute("normal",new Re(g,3)),this.setAttribute("uv",new Re(v,2));function E(D,M,S,C,P,A,L,N,I,T,U){const B=A/I,X=L/T,q=A/2,K=L/2,H=N/2,Q=I+1,F=T+1;let k=0,lt=0;const et=new V;for(let ft=0;ft<F;ft++){const O=ft*X-K;for(let tt=0;tt<Q;tt++){const dt=tt*B-q;et[D]=dt*C,et[M]=O*P,et[S]=H,p.push(et.x,et.y,et.z),et[D]=0,et[M]=0,et[S]=N>0?1:-1,g.push(et.x,et.y,et.z),v.push(tt/I),v.push(1-ft/T),k+=1}}for(let ft=0;ft<T;ft++)for(let O=0;O<I;O++){const tt=_+O+Q*ft,dt=_+O+Q*(ft+1),bt=_+(O+1)+Q*(ft+1),Nt=_+(O+1)+Q*ft;m.push(tt,dt,Nt),m.push(dt,bt,Nt),lt+=6}d.addGroup(x,lt,U),x+=lt,_+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ji(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Up extends Sn{constructor(t=1,n=1,a=4,o=8,c=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:n,capSegments:a,radialSegments:o,heightSegments:c},n=Math.max(0,n),a=Math.max(1,Math.floor(a)),o=Math.max(3,Math.floor(o)),c=Math.max(1,Math.floor(c));const u=[],d=[],m=[],p=[],g=n/2,v=Math.PI/2*t,_=n,x=2*v+_,E=a*2+c,D=o+1,M=new V,S=new V;for(let C=0;C<=E;C++){let P=0,A=0,L=0,N=0;if(C<=a){const U=C/a,B=U*Math.PI/2;A=-g-t*Math.cos(B),L=t*Math.sin(B),N=-t*Math.cos(B),P=U*v}else if(C<=a+c){const U=(C-a)/c;A=-g+U*n,L=t,N=0,P=v+U*_}else{const U=(C-a-c)/a,B=U*Math.PI/2;A=g+t*Math.sin(B),L=t*Math.cos(B),N=t*Math.sin(B),P=v+_+U*v}const I=Math.max(0,Math.min(1,P/x));let T=0;C===0?T=.5/o:C===E&&(T=-.5/o);for(let U=0;U<=o;U++){const B=U/o,X=B*Math.PI*2,q=Math.sin(X),K=Math.cos(X);S.x=-L*K,S.y=A,S.z=L*q,d.push(S.x,S.y,S.z),M.set(-L*K,N,L*q),M.normalize(),m.push(M.x,M.y,M.z),p.push(B+T,I)}if(C>0){const U=(C-1)*D;for(let B=0;B<o;B++){const X=U+B,q=U+B+1,K=C*D+B,H=C*D+B+1;u.push(X,q,K),u.push(q,H,K)}}}this.setIndex(u),this.setAttribute("position",new Re(d,3)),this.setAttribute("normal",new Re(m,3)),this.setAttribute("uv",new Re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Up(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class er extends Sn{constructor(t=1,n=32,a=0,o=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:a,thetaLength:o},n=Math.max(3,n);const c=[],u=[],d=[],m=[],p=new V,g=new Wt;u.push(0,0,0),d.push(0,0,1),m.push(.5,.5);for(let v=0,_=3;v<=n;v++,_+=3){const x=a+v/n*o;p.x=t*Math.cos(x),p.y=t*Math.sin(x),u.push(p.x,p.y,p.z),d.push(0,0,1),g.x=(u[_]/t+1)/2,g.y=(u[_+1]/t+1)/2,m.push(g.x,g.y)}for(let v=1;v<=n;v++)c.push(v,v+1,0);this.setIndex(c),this.setAttribute("position",new Re(u,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new er(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class xn extends Sn{constructor(t=1,n=1,a=1,o=32,c=1,u=!1,d=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:o,heightSegments:c,openEnded:u,thetaStart:d,thetaLength:m};const p=this;o=Math.floor(o),c=Math.floor(c);const g=[],v=[],_=[],x=[];let E=0;const D=[],M=a/2;let S=0;C(),u===!1&&(t>0&&P(!0),n>0&&P(!1)),this.setIndex(g),this.setAttribute("position",new Re(v,3)),this.setAttribute("normal",new Re(_,3)),this.setAttribute("uv",new Re(x,2));function C(){const A=new V,L=new V;let N=0;const I=(n-t)/a;for(let T=0;T<=c;T++){const U=[],B=T/c,X=B*(n-t)+t;for(let q=0;q<=o;q++){const K=q/o,H=K*m+d,Q=Math.sin(H),F=Math.cos(H);L.x=X*Q,L.y=-B*a+M,L.z=X*F,v.push(L.x,L.y,L.z),A.set(Q,I,F).normalize(),_.push(A.x,A.y,A.z),x.push(K,1-B),U.push(E++)}D.push(U)}for(let T=0;T<o;T++)for(let U=0;U<c;U++){const B=D[U][T],X=D[U+1][T],q=D[U+1][T+1],K=D[U][T+1];(t>0||U!==0)&&(g.push(B,X,K),N+=3),(n>0||U!==c-1)&&(g.push(X,q,K),N+=3)}p.addGroup(S,N,0),S+=N}function P(A){const L=E,N=new Wt,I=new V;let T=0;const U=A===!0?t:n,B=A===!0?1:-1;for(let q=1;q<=o;q++)v.push(0,M*B,0),_.push(0,B,0),x.push(.5,.5),E++;const X=E;for(let q=0;q<=o;q++){const H=q/o*m+d,Q=Math.cos(H),F=Math.sin(H);I.x=U*F,I.y=M*B,I.z=U*Q,v.push(I.x,I.y,I.z),_.push(0,B,0),N.x=Q*.5+.5,N.y=F*.5*B+.5,x.push(N.x,N.y),E++}for(let q=0;q<o;q++){const K=L+q,H=X+q;A===!0?g.push(H,H+1,K):g.push(H+1,H,K),T+=3}p.addGroup(S,T,A===!0?1:2),S+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Su extends xn{constructor(t=1,n=1,a=32,o=1,c=!1,u=0,d=Math.PI*2){super(0,t,n,a,o,c,u,d),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:a,heightSegments:o,openEnded:c,thetaStart:u,thetaLength:d}}static fromJSON(t){return new Su(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Np extends Sn{constructor(t=[],n=[],a=1,o=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:a,detail:o};const c=[],u=[];d(o),p(a),g(),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(c.slice(),3)),this.setAttribute("uv",new Re(u,2)),o===0?this.computeVertexNormals():this.normalizeNormals();function d(C){const P=new V,A=new V,L=new V;for(let N=0;N<n.length;N+=3)x(n[N+0],P),x(n[N+1],A),x(n[N+2],L),m(P,A,L,C)}function m(C,P,A,L){const N=L+1,I=[];for(let T=0;T<=N;T++){I[T]=[];const U=C.clone().lerp(A,T/N),B=P.clone().lerp(A,T/N),X=N-T;for(let q=0;q<=X;q++)q===0&&T===N?I[T][q]=U:I[T][q]=U.clone().lerp(B,q/X)}for(let T=0;T<N;T++)for(let U=0;U<2*(N-T)-1;U++){const B=Math.floor(U/2);U%2===0?(_(I[T][B+1]),_(I[T+1][B]),_(I[T][B])):(_(I[T][B+1]),_(I[T+1][B+1]),_(I[T+1][B]))}}function p(C){const P=new V;for(let A=0;A<c.length;A+=3)P.x=c[A+0],P.y=c[A+1],P.z=c[A+2],P.normalize().multiplyScalar(C),c[A+0]=P.x,c[A+1]=P.y,c[A+2]=P.z}function g(){const C=new V;for(let P=0;P<c.length;P+=3){C.x=c[P+0],C.y=c[P+1],C.z=c[P+2];const A=M(C)/2/Math.PI+.5,L=S(C)/Math.PI+.5;u.push(A,1-L)}E(),v()}function v(){for(let C=0;C<u.length;C+=6){const P=u[C+0],A=u[C+2],L=u[C+4],N=Math.max(P,A,L),I=Math.min(P,A,L);N>.9&&I<.1&&(P<.2&&(u[C+0]+=1),A<.2&&(u[C+2]+=1),L<.2&&(u[C+4]+=1))}}function _(C){c.push(C.x,C.y,C.z)}function x(C,P){const A=C*3;P.x=t[A+0],P.y=t[A+1],P.z=t[A+2]}function E(){const C=new V,P=new V,A=new V,L=new V,N=new Wt,I=new Wt,T=new Wt;for(let U=0,B=0;U<c.length;U+=9,B+=6){C.set(c[U+0],c[U+1],c[U+2]),P.set(c[U+3],c[U+4],c[U+5]),A.set(c[U+6],c[U+7],c[U+8]),N.set(u[B+0],u[B+1]),I.set(u[B+2],u[B+3]),T.set(u[B+4],u[B+5]),L.copy(C).add(P).add(A).divideScalar(3);const X=M(L);D(N,B+0,C,X),D(I,B+2,P,X),D(T,B+4,A,X)}}function D(C,P,A,L){L<0&&C.x===1&&(u[P]=C.x-1),A.x===0&&A.z===0&&(u[P]=L/2/Math.PI+.5)}function M(C){return Math.atan2(C.z,-C.x)}function S(C){return Math.atan2(-C.y,Math.sqrt(C.x*C.x+C.z*C.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Np(t.vertices,t.indices,t.radius,t.detail)}}class da{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ce("Curve: .getPoint() not implemented.")}getPointAt(t,n){const a=this.getUtoTmapping(t);return this.getPoint(a,n)}getPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return n}getSpacedPoints(t=5){const n=[];for(let a=0;a<=t;a++)n.push(this.getPointAt(a/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let a,o=this.getPoint(0),c=0;n.push(0);for(let u=1;u<=t;u++)a=this.getPoint(u/t),c+=a.distanceTo(o),n.push(c),o=a;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const a=this.getLengths();let o=0;const c=a.length;let u;n?u=n:u=t*a[c-1];let d=0,m=c-1,p;for(;d<=m;)if(o=Math.floor(d+(m-d)/2),p=a[o]-u,p<0)d=o+1;else if(p>0)m=o-1;else{m=o;break}if(o=m,a[o]===u)return o/(c-1);const g=a[o],_=a[o+1]-g,x=(u-g)/_;return(o+x)/(c-1)}getTangent(t,n){let o=t-1e-4,c=t+1e-4;o<0&&(o=0),c>1&&(c=1);const u=this.getPoint(o),d=this.getPoint(c),m=n||(u.isVector2?new Wt:new V);return m.copy(d).sub(u).normalize(),m}getTangentAt(t,n){const a=this.getUtoTmapping(t);return this.getTangent(a,n)}computeFrenetFrames(t,n=!1){const a=new V,o=[],c=[],u=[],d=new V,m=new je;for(let x=0;x<=t;x++){const E=x/t;o[x]=this.getTangentAt(E,new V)}c[0]=new V,u[0]=new V;let p=Number.MAX_VALUE;const g=Math.abs(o[0].x),v=Math.abs(o[0].y),_=Math.abs(o[0].z);g<=p&&(p=g,a.set(1,0,0)),v<=p&&(p=v,a.set(0,1,0)),_<=p&&a.set(0,0,1),d.crossVectors(o[0],a).normalize(),c[0].crossVectors(o[0],d),u[0].crossVectors(o[0],c[0]);for(let x=1;x<=t;x++){if(c[x]=c[x-1].clone(),u[x]=u[x-1].clone(),d.crossVectors(o[x-1],o[x]),d.length()>Number.EPSILON){d.normalize();const E=Math.acos(Me(o[x-1].dot(o[x]),-1,1));c[x].applyMatrix4(m.makeRotationAxis(d,E))}u[x].crossVectors(o[x],c[x])}if(n===!0){let x=Math.acos(Me(c[0].dot(c[t]),-1,1));x/=t,o[0].dot(d.crossVectors(c[0],c[t]))>0&&(x=-x);for(let E=1;E<=t;E++)c[E].applyMatrix4(m.makeRotationAxis(o[E],x*E)),u[E].crossVectors(o[E],c[E])}return{tangents:o,normals:c,binormals:u}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Op extends da{constructor(t=0,n=0,a=1,o=1,c=0,u=Math.PI*2,d=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=a,this.yRadius=o,this.aStartAngle=c,this.aEndAngle=u,this.aClockwise=d,this.aRotation=m}getPoint(t,n=new Wt){const a=n,o=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const u=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=o;for(;c>o;)c-=o;c<Number.EPSILON&&(u?c=0:c=o),this.aClockwise===!0&&!u&&(c===o?c=-o:c=c-o);const d=this.aStartAngle+t*c;let m=this.aX+this.xRadius*Math.cos(d),p=this.aY+this.yRadius*Math.sin(d);if(this.aRotation!==0){const g=Math.cos(this.aRotation),v=Math.sin(this.aRotation),_=m-this.aX,x=p-this.aY;m=_*g-x*v+this.aX,p=_*v+x*g+this.aY}return a.set(m,p)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class g1 extends Op{constructor(t,n,a,o,c,u){super(t,n,a,a,o,c,u),this.isArcCurve=!0,this.type="ArcCurve"}}function Pp(){let r=0,t=0,n=0,a=0;function o(c,u,d,m){r=c,t=d,n=-3*c+3*u-2*d-m,a=2*c-2*u+d+m}return{initCatmullRom:function(c,u,d,m,p){o(u,d,p*(d-c),p*(m-u))},initNonuniformCatmullRom:function(c,u,d,m,p,g,v){let _=(u-c)/p-(d-c)/(p+g)+(d-u)/g,x=(d-u)/g-(m-u)/(g+v)+(m-d)/v;_*=g,x*=g,o(u,d,_,x)},calc:function(c){const u=c*c,d=u*c;return r+t*c+n*u+a*d}}}const jv=new V,$v=new V,ud=new Pp,fd=new Pp,hd=new Pp;class v1 extends da{constructor(t=[],n=!1,a="centripetal",o=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=a,this.tension=o}getPoint(t,n=new V){const a=n,o=this.points,c=o.length,u=(c-(this.closed?0:1))*t;let d=Math.floor(u),m=u-d;this.closed?d+=d>0?0:(Math.floor(Math.abs(d)/c)+1)*c:m===0&&d===c-1&&(d=c-2,m=1);let p,g;this.closed||d>0?p=o[(d-1)%c]:($v.subVectors(o[0],o[1]).add(o[0]),p=$v);const v=o[d%c],_=o[(d+1)%c];if(this.closed||d+2<c?g=o[(d+2)%c]:(jv.subVectors(o[c-1],o[c-2]).add(o[c-1]),g=jv),this.curveType==="centripetal"||this.curveType==="chordal"){const x=this.curveType==="chordal"?.5:.25;let E=Math.pow(p.distanceToSquared(v),x),D=Math.pow(v.distanceToSquared(_),x),M=Math.pow(_.distanceToSquared(g),x);D<1e-4&&(D=1),E<1e-4&&(E=D),M<1e-4&&(M=D),ud.initNonuniformCatmullRom(p.x,v.x,_.x,g.x,E,D,M),fd.initNonuniformCatmullRom(p.y,v.y,_.y,g.y,E,D,M),hd.initNonuniformCatmullRom(p.z,v.z,_.z,g.z,E,D,M)}else this.curveType==="catmullrom"&&(ud.initCatmullRom(p.x,v.x,_.x,g.x,this.tension),fd.initCatmullRom(p.y,v.y,_.y,g.y,this.tension),hd.initCatmullRom(p.z,v.z,_.z,g.z,this.tension));return a.set(ud.calc(m),fd.calc(m),hd.calc(m)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new V().fromArray(o))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function t_(r,t,n,a,o){const c=(a-t)*.5,u=(o-n)*.5,d=r*r,m=r*d;return(2*n-2*a+c+u)*m+(-3*n+3*a-2*c-u)*d+c*r+n}function _1(r,t){const n=1-r;return n*n*t}function x1(r,t){return 2*(1-r)*r*t}function S1(r,t){return r*r*t}function ml(r,t,n,a){return _1(r,t)+x1(r,n)+S1(r,a)}function y1(r,t){const n=1-r;return n*n*n*t}function M1(r,t){const n=1-r;return 3*n*n*r*t}function E1(r,t){return 3*(1-r)*r*r*t}function b1(r,t){return r*r*r*t}function gl(r,t,n,a,o){return y1(r,t)+M1(r,n)+E1(r,a)+b1(r,o)}class hx extends da{constructor(t=new Wt,n=new Wt,a=new Wt,o=new Wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new Wt){const a=n,o=this.v0,c=this.v1,u=this.v2,d=this.v3;return a.set(gl(t,o.x,c.x,u.x,d.x),gl(t,o.y,c.y,u.y,d.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class T1 extends da{constructor(t=new V,n=new V,a=new V,o=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=a,this.v3=o}getPoint(t,n=new V){const a=n,o=this.v0,c=this.v1,u=this.v2,d=this.v3;return a.set(gl(t,o.x,c.x,u.x,d.x),gl(t,o.y,c.y,u.y,d.y),gl(t,o.z,c.z,u.z,d.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class dx extends da{constructor(t=new Wt,n=new Wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new Wt){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Wt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class A1 extends da{constructor(t=new V,n=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new V){const a=n;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new V){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class px extends da{constructor(t=new Wt,n=new Wt,a=new Wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new Wt){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(ml(t,o.x,c.x,u.x),ml(t,o.y,c.y,u.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class w1 extends da{constructor(t=new V,n=new V,a=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=a}getPoint(t,n=new V){const a=n,o=this.v0,c=this.v1,u=this.v2;return a.set(ml(t,o.x,c.x,u.x),ml(t,o.y,c.y,u.y),ml(t,o.z,c.z,u.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class mx extends da{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new Wt){const a=n,o=this.points,c=(o.length-1)*t,u=Math.floor(c),d=c-u,m=o[u===0?u:u-1],p=o[u],g=o[u>o.length-2?o.length-1:u+1],v=o[u>o.length-3?o.length-1:u+2];return a.set(t_(d,m.x,p.x,g.x,v.x),t_(d,m.y,p.y,g.y,v.y)),a}copy(t){super.copy(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,a=this.points.length;n<a;n++){const o=this.points[n];t.points.push(o.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,a=t.points.length;n<a;n++){const o=t.points[n];this.points.push(new Wt().fromArray(o))}return this}}var e_=Object.freeze({__proto__:null,ArcCurve:g1,CatmullRomCurve3:v1,CubicBezierCurve:hx,CubicBezierCurve3:T1,EllipseCurve:Op,LineCurve:dx,LineCurve3:A1,QuadraticBezierCurve:px,QuadraticBezierCurve3:w1,SplineCurve:mx});class R1 extends da{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const a=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new e_[a](n,t))}return this}getPoint(t,n){const a=t*this.getLength(),o=this.getCurveLengths();let c=0;for(;c<o.length;){if(o[c]>=a){const u=o[c]-a,d=this.curves[c],m=d.getLength(),p=m===0?0:1-u/m;return d.getPointAt(p,n)}c++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let a=0,o=this.curves.length;a<o;a++)n+=this.curves[a].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let a=0;a<=t;a++)n.push(this.getPoint(a/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let a;for(let o=0,c=this.curves;o<c.length;o++){const u=c[o],d=u.isEllipseCurve?t*2:u.isLineCurve||u.isLineCurve3?1:u.isSplineCurve?t*u.points.length:t,m=u.getPoints(d);for(let p=0;p<m.length;p++){const g=m[p];a&&a.equals(g)||(n.push(g),a=g)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(o.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,a=this.curves.length;n<a;n++){const o=this.curves[n];t.curves.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,a=t.curves.length;n<a;n++){const o=t.curves[n];this.curves.push(new e_[o.type]().fromJSON(o))}return this}}class n_ extends R1{constructor(t){super(),this.type="Path",this.currentPoint=new Wt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,a=t.length;n<a;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const a=new dx(this.currentPoint.clone(),new Wt(t,n));return this.curves.push(a),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,a,o){const c=new px(this.currentPoint.clone(),new Wt(t,n),new Wt(a,o));return this.curves.push(c),this.currentPoint.set(a,o),this}bezierCurveTo(t,n,a,o,c,u){const d=new hx(this.currentPoint.clone(),new Wt(t,n),new Wt(a,o),new Wt(c,u));return this.curves.push(d),this.currentPoint.set(c,u),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),a=new mx(n);return this.curves.push(a),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,a,o,c,u){const d=this.currentPoint.x,m=this.currentPoint.y;return this.absarc(t+d,n+m,a,o,c,u),this}absarc(t,n,a,o,c,u){return this.absellipse(t,n,a,a,o,c,u),this}ellipse(t,n,a,o,c,u,d,m){const p=this.currentPoint.x,g=this.currentPoint.y;return this.absellipse(t+p,n+g,a,o,c,u,d,m),this}absellipse(t,n,a,o,c,u,d,m){const p=new Op(t,n,a,o,c,u,d,m);if(this.curves.length>0){const v=p.getPoint(0);v.equals(this.currentPoint)||this.lineTo(v.x,v.y)}this.curves.push(p);const g=p.getPoint(1);return this.currentPoint.copy(g),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class gx extends n_{constructor(t){super(t),this.uuid=rr(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let a=0,o=this.holes.length;a<o;a++)n[a]=this.holes[a].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(o.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,a=this.holes.length;n<a;n++){const o=this.holes[n];t.holes.push(o.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,a=t.holes.length;n<a;n++){const o=t.holes[n];this.holes.push(new n_().fromJSON(o))}return this}}function C1(r,t,n=2){const a=t&&t.length,o=a?t[0]*n:r.length;let c=vx(r,0,o,n,!0);const u=[];if(!c||c.next===c.prev)return u;let d,m,p;if(a&&(c=O1(r,t,c,n)),r.length>80*n){d=r[0],m=r[1];let g=d,v=m;for(let _=n;_<o;_+=n){const x=r[_],E=r[_+1];x<d&&(d=x),E<m&&(m=E),x>g&&(g=x),E>v&&(v=E)}p=Math.max(g-d,v-m),p=p!==0?32767/p:0}return Tl(c,u,n,d,m,p,0),u}function vx(r,t,n,a,o){let c;if(o===W1(r,t,n,a)>0)for(let u=t;u<n;u+=a)c=i_(u/a|0,r[u],r[u+1],c);else for(let u=n-a;u>=t;u-=a)c=i_(u/a|0,r[u],r[u+1],c);return c&&ro(c,c.next)&&(wl(c),c=c.next),c}function ar(r,t){if(!r)return r;t||(t=r);let n=r,a;do if(a=!1,!n.steiner&&(ro(n,n.next)||fn(n.prev,n,n.next)===0)){if(wl(n),n=t=n.prev,n===n.next)break;a=!0}else n=n.next;while(a||n!==t);return t}function Tl(r,t,n,a,o,c,u){if(!r)return;!u&&c&&F1(r,a,o,c);let d=r;for(;r.prev!==r.next;){const m=r.prev,p=r.next;if(c?L1(r,a,o,c):D1(r)){t.push(m.i,r.i,p.i),wl(r),r=p.next,d=p.next;continue}if(r=p,r===d){u?u===1?(r=U1(ar(r),t),Tl(r,t,n,a,o,c,2)):u===2&&N1(r,t,n,a,o,c):Tl(ar(r),t,n,a,o,c,1);break}}}function D1(r){const t=r.prev,n=r,a=r.next;if(fn(t,n,a)>=0)return!1;const o=t.x,c=n.x,u=a.x,d=t.y,m=n.y,p=a.y,g=Math.min(o,c,u),v=Math.min(d,m,p),_=Math.max(o,c,u),x=Math.max(d,m,p);let E=a.next;for(;E!==t;){if(E.x>=g&&E.x<=_&&E.y>=v&&E.y<=x&&cl(o,d,c,m,u,p,E.x,E.y)&&fn(E.prev,E,E.next)>=0)return!1;E=E.next}return!0}function L1(r,t,n,a){const o=r.prev,c=r,u=r.next;if(fn(o,c,u)>=0)return!1;const d=o.x,m=c.x,p=u.x,g=o.y,v=c.y,_=u.y,x=Math.min(d,m,p),E=Math.min(g,v,_),D=Math.max(d,m,p),M=Math.max(g,v,_),S=up(x,E,t,n,a),C=up(D,M,t,n,a);let P=r.prevZ,A=r.nextZ;for(;P&&P.z>=S&&A&&A.z<=C;){if(P.x>=x&&P.x<=D&&P.y>=E&&P.y<=M&&P!==o&&P!==u&&cl(d,g,m,v,p,_,P.x,P.y)&&fn(P.prev,P,P.next)>=0||(P=P.prevZ,A.x>=x&&A.x<=D&&A.y>=E&&A.y<=M&&A!==o&&A!==u&&cl(d,g,m,v,p,_,A.x,A.y)&&fn(A.prev,A,A.next)>=0))return!1;A=A.nextZ}for(;P&&P.z>=S;){if(P.x>=x&&P.x<=D&&P.y>=E&&P.y<=M&&P!==o&&P!==u&&cl(d,g,m,v,p,_,P.x,P.y)&&fn(P.prev,P,P.next)>=0)return!1;P=P.prevZ}for(;A&&A.z<=C;){if(A.x>=x&&A.x<=D&&A.y>=E&&A.y<=M&&A!==o&&A!==u&&cl(d,g,m,v,p,_,A.x,A.y)&&fn(A.prev,A,A.next)>=0)return!1;A=A.nextZ}return!0}function U1(r,t){let n=r;do{const a=n.prev,o=n.next.next;!ro(a,o)&&xx(a,n,n.next,o)&&Al(a,o)&&Al(o,a)&&(t.push(a.i,n.i,o.i),wl(n),wl(n.next),n=r=o),n=n.next}while(n!==r);return ar(n)}function N1(r,t,n,a,o,c){let u=r;do{let d=u.next.next;for(;d!==u.prev;){if(u.i!==d.i&&V1(u,d)){let m=Sx(u,d);u=ar(u,u.next),m=ar(m,m.next),Tl(u,t,n,a,o,c,0),Tl(m,t,n,a,o,c,0);return}d=d.next}u=u.next}while(u!==r)}function O1(r,t,n,a){const o=[];for(let c=0,u=t.length;c<u;c++){const d=t[c]*a,m=c<u-1?t[c+1]*a:r.length,p=vx(r,d,m,a,!1);p===p.next&&(p.steiner=!0),o.push(G1(p))}o.sort(P1);for(let c=0;c<o.length;c++)n=I1(o[c],n);return n}function P1(r,t){let n=r.x-t.x;if(n===0&&(n=r.y-t.y,n===0)){const a=(r.next.y-r.y)/(r.next.x-r.x),o=(t.next.y-t.y)/(t.next.x-t.x);n=a-o}return n}function I1(r,t){const n=z1(r,t);if(!n)return t;const a=Sx(n,r);return ar(a,a.next),ar(n,n.next)}function z1(r,t){let n=t;const a=r.x,o=r.y;let c=-1/0,u;if(ro(r,n))return n;do{if(ro(r,n.next))return n.next;if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const v=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(v<=a&&v>c&&(c=v,u=n.x<n.next.x?n:n.next,v===a))return u}n=n.next}while(n!==t);if(!u)return null;const d=u,m=u.x,p=u.y;let g=1/0;n=u;do{if(a>=n.x&&n.x>=m&&a!==n.x&&_x(o<p?a:c,o,m,p,o<p?c:a,o,n.x,n.y)){const v=Math.abs(o-n.y)/(a-n.x);Al(n,r)&&(v<g||v===g&&(n.x>u.x||n.x===u.x&&B1(u,n)))&&(u=n,g=v)}n=n.next}while(n!==d);return u}function B1(r,t){return fn(r.prev,r,t.prev)<0&&fn(t.next,r,r.next)<0}function F1(r,t,n,a){let o=r;do o.z===0&&(o.z=up(o.x,o.y,t,n,a)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==r);o.prevZ.nextZ=null,o.prevZ=null,H1(o)}function H1(r){let t,n=1;do{let a=r,o;r=null;let c=null;for(t=0;a;){t++;let u=a,d=0;for(let p=0;p<n&&(d++,u=u.nextZ,!!u);p++);let m=n;for(;d>0||m>0&&u;)d!==0&&(m===0||!u||a.z<=u.z)?(o=a,a=a.nextZ,d--):(o=u,u=u.nextZ,m--),c?c.nextZ=o:r=o,o.prevZ=c,c=o;a=u}c.nextZ=null,n*=2}while(t>1);return r}function up(r,t,n,a,o){return r=(r-n)*o|0,t=(t-a)*o|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function G1(r){let t=r,n=r;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==r);return n}function _x(r,t,n,a,o,c,u,d){return(o-u)*(t-d)>=(r-u)*(c-d)&&(r-u)*(a-d)>=(n-u)*(t-d)&&(n-u)*(c-d)>=(o-u)*(a-d)}function cl(r,t,n,a,o,c,u,d){return!(r===u&&t===d)&&_x(r,t,n,a,o,c,u,d)}function V1(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!k1(r,t)&&(Al(r,t)&&Al(t,r)&&X1(r,t)&&(fn(r.prev,r,t.prev)||fn(r,t.prev,t))||ro(r,t)&&fn(r.prev,r,r.next)>0&&fn(t.prev,t,t.next)>0)}function fn(r,t,n){return(t.y-r.y)*(n.x-t.x)-(t.x-r.x)*(n.y-t.y)}function ro(r,t){return r.x===t.x&&r.y===t.y}function xx(r,t,n,a){const o=ru(fn(r,t,n)),c=ru(fn(r,t,a)),u=ru(fn(n,a,r)),d=ru(fn(n,a,t));return!!(o!==c&&u!==d||o===0&&su(r,n,t)||c===0&&su(r,a,t)||u===0&&su(n,r,a)||d===0&&su(n,t,a))}function su(r,t,n){return t.x<=Math.max(r.x,n.x)&&t.x>=Math.min(r.x,n.x)&&t.y<=Math.max(r.y,n.y)&&t.y>=Math.min(r.y,n.y)}function ru(r){return r>0?1:r<0?-1:0}function k1(r,t){let n=r;do{if(n.i!==r.i&&n.next.i!==r.i&&n.i!==t.i&&n.next.i!==t.i&&xx(n,n.next,r,t))return!0;n=n.next}while(n!==r);return!1}function Al(r,t){return fn(r.prev,r,r.next)<0?fn(r,t,r.next)>=0&&fn(r,r.prev,t)>=0:fn(r,t,r.prev)<0||fn(r,r.next,t)<0}function X1(r,t){let n=r,a=!1;const o=(r.x+t.x)/2,c=(r.y+t.y)/2;do n.y>c!=n.next.y>c&&n.next.y!==n.y&&o<(n.next.x-n.x)*(c-n.y)/(n.next.y-n.y)+n.x&&(a=!a),n=n.next;while(n!==r);return a}function Sx(r,t){const n=fp(r.i,r.x,r.y),a=fp(t.i,t.x,t.y),o=r.next,c=t.prev;return r.next=t,t.prev=r,n.next=o,o.prev=n,a.next=n,n.prev=a,c.next=a,a.prev=c,a}function i_(r,t,n,a){const o=fp(r,t,n);return a?(o.next=a.next,o.prev=a,a.next.prev=o,a.next=o):(o.prev=o,o.next=o),o}function wl(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function fp(r,t,n){return{i:r,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function W1(r,t,n,a){let o=0;for(let c=t,u=n-a;c<n;c+=a)o+=(r[u]-r[c])*(r[c+1]+r[u+1]),u=c;return o}class q1{static triangulate(t,n,a=2){return C1(t,n,a)}}class vl{static area(t){const n=t.length;let a=0;for(let o=n-1,c=0;c<n;o=c++)a+=t[o].x*t[c].y-t[c].x*t[o].y;return a*.5}static isClockWise(t){return vl.area(t)<0}static triangulateShape(t,n){const a=[],o=[],c=[];a_(t),s_(a,t);let u=t.length;n.forEach(a_);for(let m=0;m<n.length;m++)o.push(u),u+=n[m].length,s_(a,n[m]);const d=q1.triangulate(a,o);for(let m=0;m<d.length;m+=3)c.push(d.slice(m,m+3));return c}}function a_(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function s_(r,t){for(let n=0;n<t.length;n++)r.push(t[n].x),r.push(t[n].y)}class ua extends Sn{constructor(t=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:o};const c=t/2,u=n/2,d=Math.floor(a),m=Math.floor(o),p=d+1,g=m+1,v=t/d,_=n/m,x=[],E=[],D=[],M=[];for(let S=0;S<g;S++){const C=S*_-u;for(let P=0;P<p;P++){const A=P*v-c;E.push(A,-C,0),D.push(0,0,1),M.push(P/d),M.push(1-S/m)}}for(let S=0;S<m;S++)for(let C=0;C<d;C++){const P=C+p*S,A=C+p*(S+1),L=C+1+p*(S+1),N=C+1+p*S;x.push(P,A,N),x.push(A,L,N)}this.setIndex(x),this.setAttribute("position",new Re(E,3)),this.setAttribute("normal",new Re(D,3)),this.setAttribute("uv",new Re(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ua(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ip extends Sn{constructor(t=new gx([new Wt(0,.5),new Wt(-.5,-.5),new Wt(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};const a=[],o=[],c=[],u=[];let d=0,m=0;if(Array.isArray(t)===!1)p(t);else for(let g=0;g<t.length;g++)p(t[g]),this.addGroup(d,m,g),d+=m,m=0;this.setIndex(a),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(c,3)),this.setAttribute("uv",new Re(u,2));function p(g){const v=o.length/3,_=g.extractPoints(n);let x=_.shape;const E=_.holes;vl.isClockWise(x)===!1&&(x=x.reverse());for(let M=0,S=E.length;M<S;M++){const C=E[M];vl.isClockWise(C)===!0&&(E[M]=C.reverse())}const D=vl.triangulateShape(x,E);for(let M=0,S=E.length;M<S;M++){const C=E[M];x=x.concat(C)}for(let M=0,S=x.length;M<S;M++){const C=x[M];o.push(C.x,C.y,0),c.push(0,0,1),u.push(C.x,C.y)}for(let M=0,S=D.length;M<S;M++){const C=D[M],P=C[0]+v,A=C[1]+v,L=C[2]+v;a.push(P,A,L),m+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes;return Y1(n,t)}static fromJSON(t,n){const a=[];for(let o=0,c=t.shapes.length;o<c;o++){const u=n[t.shapes[o]];a.push(u)}return new Ip(a,t.curveSegments)}}function Y1(r,t){if(t.shapes=[],Array.isArray(r))for(let n=0,a=r.length;n<a;n++){const o=r[n];t.shapes.push(o.uuid)}else t.shapes.push(r.uuid);return t}class tr extends Sn{constructor(t=1,n=32,a=16,o=0,c=Math.PI*2,u=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:o,phiLength:c,thetaStart:u,thetaLength:d},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const m=Math.min(u+d,Math.PI);let p=0;const g=[],v=new V,_=new V,x=[],E=[],D=[],M=[];for(let S=0;S<=a;S++){const C=[],P=S/a,A=u+P*d,L=t*Math.cos(A),N=Math.sqrt(t*t-L*L);let I=0;S===0&&u===0?I=.5/n:S===a&&m===Math.PI&&(I=-.5/n);for(let T=0;T<=n;T++){const U=T/n,B=o+U*c;v.x=-N*Math.cos(B),v.y=L,v.z=N*Math.sin(B),E.push(v.x,v.y,v.z),_.copy(v).normalize(),D.push(_.x,_.y,_.z),M.push(U+I,1-P),C.push(p++)}g.push(C)}for(let S=0;S<a;S++)for(let C=0;C<n;C++){const P=g[S][C+1],A=g[S][C],L=g[S+1][C],N=g[S+1][C+1];(S!==0||u>0)&&x.push(P,A,N),(S!==a-1||m<Math.PI)&&x.push(A,L,N)}this.setIndex(x),this.setAttribute("position",new Re(E,3)),this.setAttribute("normal",new Re(D,3)),this.setAttribute("uv",new Re(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class zp extends Np{constructor(t=1,n=0){const a=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],o=[2,1,0,0,3,2,1,3,0,2,3,1];super(a,o,t,n),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new zp(t.radius,t.detail)}}class zi extends Sn{constructor(t=1,n=.4,a=12,o=48,c=Math.PI*2,u=0,d=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:a,tubularSegments:o,arc:c,thetaStart:u,thetaLength:d},a=Math.floor(a),o=Math.floor(o);const m=[],p=[],g=[],v=[],_=new V,x=new V,E=new V;for(let D=0;D<=a;D++){const M=u+D/a*d;for(let S=0;S<=o;S++){const C=S/o*c;x.x=(t+n*Math.cos(M))*Math.cos(C),x.y=(t+n*Math.cos(M))*Math.sin(C),x.z=n*Math.sin(M),p.push(x.x,x.y,x.z),_.x=t*Math.cos(C),_.y=t*Math.sin(C),E.subVectors(x,_).normalize(),g.push(E.x,E.y,E.z),v.push(S/o),v.push(D/a)}}for(let D=1;D<=a;D++)for(let M=1;M<=o;M++){const S=(o+1)*D+M-1,C=(o+1)*(D-1)+M-1,P=(o+1)*(D-1)+M,A=(o+1)*D+M;m.push(S,C,A),m.push(C,P,A)}this.setIndex(m),this.setAttribute("position",new Re(p,3)),this.setAttribute("normal",new Re(g,3)),this.setAttribute("uv",new Re(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}function oo(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const o=r[n][a];if(r_(o))o.isRenderTargetTexture?(ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=o.clone();else if(Array.isArray(o))if(r_(o[0])){const c=[];for(let u=0,d=o.length;u<d;u++)c[u]=o[u].clone();t[n][a]=c}else t[n][a]=o.slice();else t[n][a]=o}}return t}function ai(r){const t={};for(let n=0;n<r.length;n++){const a=oo(r[n]);for(const o in a)t[o]=a[o]}return t}function r_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Z1(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function yx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:De.workingColorSpace}const K1={clone:oo,merge:ai};var J1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Q1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qi extends co{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=J1,this.fragmentShader=Q1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=oo(t.uniforms),this.uniformsGroups=Z1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?n.uniforms[o]={type:"t",value:u.toJSON(t).uuid}:u&&u.isColor?n.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[o]={type:"m4",value:u.toArray()}:n.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const a in t.uniforms){const o=t.uniforms[a];switch(this.uniforms[a]={},o.type){case"t":this.uniforms[a].value=n[o.value]||null;break;case"c":this.uniforms[a].value=new pe().setHex(o.value);break;case"v2":this.uniforms[a].value=new Wt().fromArray(o.value);break;case"v3":this.uniforms[a].value=new V().fromArray(o.value);break;case"v4":this.uniforms[a].value=new un().fromArray(o.value);break;case"m3":this.uniforms[a].value=new he().fromArray(o.value);break;case"m4":this.uniforms[a].value=new je().fromArray(o.value);break;default:this.uniforms[a].value=o.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class j1 extends Qi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ii extends co{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lp,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rs,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yu extends Ii{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Wt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Me(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new pe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new pe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new pe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class $1 extends co{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class tE extends co{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const dd={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(o_(r)||(this.files[r]=t))},get:function(r){if(this.enabled!==!1&&!o_(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function o_(r){try{const t=r.slice(r.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class eE{constructor(t,n,a){const o=this;let c=!1,u=0,d=0,m;const p=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=a,this._abortController=null,this.itemStart=function(g){d++,c===!1&&o.onStart!==void 0&&o.onStart(g,u,d),c=!0},this.itemEnd=function(g){u++,o.onProgress!==void 0&&o.onProgress(g,u,d),u===d&&(c=!1,o.onLoad!==void 0&&o.onLoad())},this.itemError=function(g){o.onError!==void 0&&o.onError(g)},this.resolveURL=function(g){return g=g.normalize("NFC"),m?m(g):g},this.setURLModifier=function(g){return m=g,this},this.addHandler=function(g,v){return p.push(g,v),this},this.removeHandler=function(g){const v=p.indexOf(g);return v!==-1&&p.splice(v,2),this},this.getHandler=function(g){for(let v=0,_=p.length;v<_;v+=2){const x=p[v],E=p[v+1];if(x.global&&(x.lastIndex=0),x.test(g))return E}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const nE=new eE;class Bp{constructor(t){this.manager=t!==void 0?t:nE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){const a=this;return new Promise(function(o,c){a.load(t,o,n,c)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}Bp.DEFAULT_MATERIAL_NAME="__DEFAULT";const Zr=new WeakMap;class iE extends Bp{constructor(t){super(t)}load(t,n,a,o){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const c=this,u=dd.get(`image:${t}`);if(u!==void 0){if(u.complete===!0)c.manager.itemStart(t),setTimeout(function(){n&&n(u),c.manager.itemEnd(t)},0);else{let v=Zr.get(u);v===void 0&&(v=[],Zr.set(u,v)),v.push({onLoad:n,onError:o})}return u}const d=El("img");function m(){g(),n&&n(this);const v=Zr.get(this)||[];for(let _=0;_<v.length;_++){const x=v[_];x.onLoad&&x.onLoad(this)}Zr.delete(this),c.manager.itemEnd(t)}function p(v){g(),o&&o(v),dd.remove(`image:${t}`);const _=Zr.get(this)||[];for(let x=0;x<_.length;x++){const E=_[x];E.onError&&E.onError(v)}Zr.delete(this),c.manager.itemError(t),c.manager.itemEnd(t)}function g(){d.removeEventListener("load",m,!1),d.removeEventListener("error",p,!1)}return d.addEventListener("load",m,!1),d.addEventListener("error",p,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(d.crossOrigin=this.crossOrigin),dd.add(`image:${t}`,d),c.manager.itemStart(t),d.src=t,d}}class aE extends Bp{constructor(t){super(t)}load(t,n,a,o){const c=new qn,u=new iE(this.manager);return u.setCrossOrigin(this.crossOrigin),u.setPath(this.path),u.load(t,function(d){c.image=d,c.needsUpdate=!0,n!==void 0&&n(c)},a,o),c}}class Tu extends Dn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new pe(t),this.intensity=n}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class sE extends Tu{constructor(t,n,a){super(t,a),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new pe(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}toJSON(t){const n=super.toJSON(t);return n.object.groundColor=this.groundColor.getHex(),n}}const pd=new je,l_=new V,c_=new V;class Fp{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=bi,this.map=null,this.mapPass=null,this.matrix=new je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lp,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new un(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera;l_.setFromMatrixPosition(t.matrixWorld),n.position.copy(l_),c_.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(c_),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(t,n,a,o){pd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),a.setFromProjectionMatrix(pd,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,u=o?o.z/c.x:1,d=o?o.w/c.y:1,m=o?o.x/c.x:0,p=o?o.y/c.y:0;t.coordinateSystem===Ml||t.reversedDepth?n.set(.5*u,0,0,.5*u+m,0,.5*d,0,.5*d+p,0,0,1,0,0,0,0,1):n.set(.5*u,0,0,.5*u+m,0,.5*d,0,.5*d+p,0,0,.5,.5,0,0,0,1),n.multiply(pd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ou=new V,lu=new lo,ia=new V;class Mx extends Dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=la,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ou,lu,ia),ia.x===1&&ia.y===1&&ia.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ou,lu,ia.set(1,1,1)).invert()}updateWorldMatrix(t,n,a=!1){super.updateWorldMatrix(t,n,a),this.matrixWorld.decompose(ou,lu,ia),ia.x===1&&ia.y===1&&ia.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ou,lu,ia.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ms=new V,u_=new Wt,f_=new Wt;class Ei extends Mx{constructor(t=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=so*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(dl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return so*2*Math.atan(Math.tan(dl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){Ms.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ms.x,Ms.y).multiplyScalar(-t/Ms.z),Ms.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(Ms.x,Ms.y).multiplyScalar(-t/Ms.z)}getViewSize(t,n){return this.getViewBounds(t,u_,f_),n.subVectors(f_,u_)}setViewOffset(t,n,a,o,c,u){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(dl*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const m=u.fullWidth,p=u.fullHeight;c+=u.offsetX*o/m,n-=u.offsetY*a/p,o*=u.width/m,a*=u.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class rE extends Fp{constructor(){super(new Ei(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const n=this.camera,a=so*2*t.angle*this.focus,o=this.mapSize.width/this.mapSize.height*this.aspect,c=t.distance||n.far;(a!==n.fov||o!==n.aspect||c!==n.far)&&(n.fov=a,n.aspect=o,n.far=c,n.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class oE extends Tu{constructor(t,n,a=0,o=Math.PI/3,c=0,u=2){super(t,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.target=new Dn,this.distance=a,this.angle=o,this.penumbra=c,this.decay=u,this.map=null,this.shadow=new rE}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.angle=this.angle,n.object.decay=this.decay,n.object.penumbra=this.penumbra,n.object.target=this.target.uuid,this.map&&this.map.isTexture&&(n.object.map=this.map.toJSON(t).uuid),n.object.shadow=this.shadow.toJSON(),n}}class lE extends Fp{constructor(){super(new Ei(90,1,.5,500)),this.isPointLightShadow=!0}}class _l extends Tu{constructor(t,n,a=0,o=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=a,this.decay=o,this.shadow=new lE}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class Au extends Mx{constructor(t=-1,n=1,a=1,o=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,o,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-t,u=a+t,d=o+n,m=o-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,u=c+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,u,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class cE extends Fp{constructor(){super(new Au(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class uE extends Tu{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.target=new Dn,this.shadow=new cE}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const Kr=-90,Jr=1;class fE extends Dn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Ei(Kr,Jr,t,n);o.layers=this.layers,this.add(o);const c=new Ei(Kr,Jr,t,n);c.layers=this.layers,this.add(c);const u=new Ei(Kr,Jr,t,n);u.layers=this.layers,this.add(u);const d=new Ei(Kr,Jr,t,n);d.layers=this.layers,this.add(d);const m=new Ei(Kr,Jr,t,n);m.layers=this.layers,this.add(m);const p=new Ei(Kr,Jr,t,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,o,c,u,d,m]=n;for(const p of n)this.remove(p);if(t===la)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Ml)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of n)this.add(p),p.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,u,d,m,p,g]=this.children,v=t.getRenderTarget(),_=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const D=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let M=!1;t.isWebGLRenderer===!0?M=t.state.buffers.depth.getReversed():M=t.reversedDepthBuffer,t.setRenderTarget(a,0,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(a,1,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(a,2,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),t.setRenderTarget(a,3,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,m),t.setRenderTarget(a,4,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,p),a.texture.generateMipmaps=D,t.setRenderTarget(a,5,o),M&&t.autoClear===!1&&t.clearDepth(),t.render(n,g),t.setRenderTarget(v,_,x),t.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class hE extends Ei{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const h_=new je;class md{constructor(t,n,a=0,o=1/0){this.ray=new Cp(t,n),this.near=a,this.far=o,this.camera=null,this.layers=new Rp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Oe("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return h_.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(h_),this}intersectObject(t,n=!0,a=[]){return hp(t,this,a,n),a.sort(d_),a}intersectObjects(t,n=!0,a=[]){for(let o=0,c=t.length;o<c;o++)hp(t[o],this,a,n);return a.sort(d_),a}}function d_(r,t){return r.distance-t.distance}function hp(r,t,n,a){let o=!0;if(r.layers.test(t.layers)&&r.raycast(t,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let u=0,d=c.length;u<d;u++)hp(c[u],t,n,!0)}}class Ex{static{Ex.prototype.isMatrix2=!0}constructor(t,n,a,o){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,a,o)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let a=0;a<4;a++)this.elements[a]=t[a+n];return this}set(t,n,a,o){const c=this.elements;return c[0]=t,c[2]=n,c[1]=a,c[3]=o,this}}function p_(r,t,n,a){const o=dE(a);switch(n){case tx:return r*t;case nx:return r*t/o.components*o.byteLength;case yp:return r*t/o.components*o.byteLength;case ir:return r*t*2/o.components*o.byteLength;case Mp:return r*t*2/o.components*o.byteLength;case ex:return r*t*3/o.components*o.byteLength;case Yi:return r*t*4/o.components*o.byteLength;case Ep:return r*t*4/o.components*o.byteLength;case fu:case hu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case du:case pu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Nd:case Pd:return Math.max(r,16)*Math.max(t,8)/4;case Ud:case Od:return Math.max(r,8)*Math.max(t,8)/2;case Id:case zd:case Fd:case Hd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Bd:case gu:case Gd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Vd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case kd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Xd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Wd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case qd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Yd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Zd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Kd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Jd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Qd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case jd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case $d:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case tp:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ep:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case np:case ip:case ap:return Math.ceil(r/4)*Math.ceil(t/4)*16;case sp:case rp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case vu:case op:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function dE(r){switch(r){case bi:case J_:return{byteLength:1,components:1};case Sl:case Q_:case ha:return{byteLength:2,components:1};case xp:case Sp:return{byteLength:2,components:4};case fa:case _p:case oa:return{byteLength:4,components:1};case j_:case $_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gp}}));typeof window<"u"&&(window.__THREE__?ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gp);function bx(){let r=null,t=!1,n=null,a=null;function o(c,u){a=r.requestAnimationFrame(o),n(c,u)}return{start:function(){t!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(o),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function pE(r){const t=new WeakMap;function n(d,m){const p=d.array,g=d.usage,v=p.byteLength,_=r.createBuffer();r.bindBuffer(m,_),r.bufferData(m,p,g),d.onUploadCallback();let x;if(p instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)x=r.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)x=r.SHORT;else if(p instanceof Uint32Array)x=r.UNSIGNED_INT;else if(p instanceof Int32Array)x=r.INT;else if(p instanceof Int8Array)x=r.BYTE;else if(p instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:_,type:x,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:v}}function a(d,m,p){const g=m.array,v=m.updateRanges;if(r.bindBuffer(p,d),v.length===0)r.bufferSubData(p,0,g);else{v.sort((x,E)=>x.start-E.start);let _=0;for(let x=1;x<v.length;x++){const E=v[_],D=v[x];D.start<=E.start+E.count+1?E.count=Math.max(E.count,D.start+D.count-E.start):(++_,v[_]=D)}v.length=_+1;for(let x=0,E=v.length;x<E;x++){const D=v[x];r.bufferSubData(p,D.start*g.BYTES_PER_ELEMENT,g,D.start,D.count)}m.clearUpdateRanges()}m.onUploadCallback()}function o(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(r.deleteBuffer(m.buffer),t.delete(d))}function u(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,n(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(p.buffer,d,m),p.version=d.version}}return{get:o,remove:c,update:u}}var mE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gE=`#ifdef USE_ALPHAHASH
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
#endif`,vE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_E=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,SE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yE=`#ifdef USE_AOMAP
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
#endif`,ME=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,EE=`#ifdef USE_BATCHING
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
#endif`,bE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,TE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,AE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,RE=`#ifdef USE_IRIDESCENCE
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
#endif`,CE=`#ifdef USE_BUMPMAP
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
#endif`,DE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,LE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,UE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,NE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,OE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,PE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,IE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,BE=`#define PI 3.141592653589793
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
} // validated`,FE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,HE=`vec3 transformedNormal = objectNormal;
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
#endif`,GE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,VE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,XE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,WE="gl_FragColor = linearToOutputTexel( gl_FragColor );",qE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,YE=`#ifdef USE_ENVMAP
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
#endif`,ZE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,KE=`#ifdef USE_ENVMAP
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
#endif`,JE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,QE=`#ifdef USE_ENVMAP
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
#endif`,jE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$E=`#ifdef USE_FOG
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
material.specularStrength = specularStrength;`,sb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rb=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ob=`#ifdef USE_ENVMAP
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
#endif`,db=`uniform sampler2D dfgLUT;
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
#endif`,mb=`#if defined( RE_IndirectDiffuse )
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
#endif`,gb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,_b=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Eb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ab=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wb=`#ifdef USE_METALNESSMAP
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
#endif`,Lb=`#ifdef USE_MORPHTARGETS
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
vec3 nonPerturbedNormal = normal;`,Ob=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ib=`#ifndef FLAT_SHADED
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
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Bb=`#ifdef USE_NORMALMAP
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
#endif`,Fb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wb=`#ifdef PREMULTIPLIED_ALPHA
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
#endif`,Zb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$b=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tT=`float getShadowMask() {
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
}`,eT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nT=`#ifdef USE_SKINNING
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
#endif`,iT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,aT=`#ifdef USE_SKINNING
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
#endif`,sT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cT=`#ifdef USE_TRANSMISSION
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
#endif`,uT=`#ifdef USE_TRANSMISSION
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
#endif`,fT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gT=`uniform sampler2D t2D;
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
}`,vT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_T=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ST=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yT=`#include <common>
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
}`,MT=`#if DEPTH_PACKING == 3200
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
}`,ET=`#define DISTANCE
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
}`,bT=`#define DISTANCE
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
}`,TT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,AT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wT=`uniform float scale;
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
}`,RT=`uniform vec3 diffuse;
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
}`,CT=`#include <common>
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
}`,DT=`uniform vec3 diffuse;
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
}`,LT=`#define LAMBERT
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
}`,UT=`#define LAMBERT
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
}`,NT=`#define MATCAP
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
}`,OT=`#define MATCAP
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
}`,PT=`#define NORMAL
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
}`,IT=`#define NORMAL
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
}`,zT=`#define PHONG
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
}`,BT=`#define PHONG
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
}`,FT=`#define STANDARD
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
}`,HT=`#define STANDARD
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
}`,GT=`#define TOON
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
}`,VT=`#define TOON
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
}`,kT=`uniform float size;
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
}`,XT=`uniform vec3 diffuse;
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
}`,WT=`#include <common>
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
}`,qT=`uniform vec3 color;
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
}`,YT=`uniform float rotation;
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
}`,ZT=`uniform vec3 diffuse;
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
}`,xe={alphahash_fragment:mE,alphahash_pars_fragment:gE,alphamap_fragment:vE,alphamap_pars_fragment:_E,alphatest_fragment:xE,alphatest_pars_fragment:SE,aomap_fragment:yE,aomap_pars_fragment:ME,batching_pars_vertex:EE,batching_vertex:bE,begin_vertex:TE,beginnormal_vertex:AE,bsdfs:wE,iridescence_fragment:RE,bumpmap_pars_fragment:CE,clipping_planes_fragment:DE,clipping_planes_pars_fragment:LE,clipping_planes_pars_vertex:UE,clipping_planes_vertex:NE,color_fragment:OE,color_pars_fragment:PE,color_pars_vertex:IE,color_vertex:zE,common:BE,cube_uv_reflection_fragment:FE,defaultnormal_vertex:HE,displacementmap_pars_vertex:GE,displacementmap_vertex:VE,emissivemap_fragment:kE,emissivemap_pars_fragment:XE,colorspace_fragment:WE,colorspace_pars_fragment:qE,envmap_fragment:YE,envmap_common_pars_fragment:ZE,envmap_pars_fragment:KE,envmap_pars_vertex:JE,envmap_physical_pars_fragment:ob,envmap_vertex:QE,fog_vertex:jE,fog_pars_vertex:$E,fog_fragment:tb,fog_pars_fragment:eb,gradientmap_pars_fragment:nb,lightmap_pars_fragment:ib,lights_lambert_fragment:ab,lights_lambert_pars_fragment:sb,lights_pars_begin:rb,lights_toon_fragment:lb,lights_toon_pars_fragment:cb,lights_phong_fragment:ub,lights_phong_pars_fragment:fb,lights_physical_fragment:hb,lights_physical_pars_fragment:db,lights_fragment_begin:pb,lights_fragment_maps:mb,lights_fragment_end:gb,lightprobes_pars_fragment:vb,logdepthbuf_fragment:_b,logdepthbuf_pars_fragment:xb,logdepthbuf_pars_vertex:Sb,logdepthbuf_vertex:yb,map_fragment:Mb,map_pars_fragment:Eb,map_particle_fragment:bb,map_particle_pars_fragment:Tb,metalnessmap_fragment:Ab,metalnessmap_pars_fragment:wb,morphinstance_vertex:Rb,morphcolor_vertex:Cb,morphnormal_vertex:Db,morphtarget_pars_vertex:Lb,morphtarget_vertex:Ub,normal_fragment_begin:Nb,normal_fragment_maps:Ob,normal_pars_fragment:Pb,normal_pars_vertex:Ib,normal_vertex:zb,normalmap_pars_fragment:Bb,clearcoat_normal_fragment_begin:Fb,clearcoat_normal_fragment_maps:Hb,clearcoat_pars_fragment:Gb,iridescence_pars_fragment:Vb,opaque_fragment:kb,packing:Xb,premultiplied_alpha_fragment:Wb,project_vertex:qb,dithering_fragment:Yb,dithering_pars_fragment:Zb,roughnessmap_fragment:Kb,roughnessmap_pars_fragment:Jb,shadowmap_pars_fragment:Qb,shadowmap_pars_vertex:jb,shadowmap_vertex:$b,shadowmask_pars_fragment:tT,skinbase_vertex:eT,skinning_pars_vertex:nT,skinning_vertex:iT,skinnormal_vertex:aT,specularmap_fragment:sT,specularmap_pars_fragment:rT,tonemapping_fragment:oT,tonemapping_pars_fragment:lT,transmission_fragment:cT,transmission_pars_fragment:uT,uv_pars_fragment:fT,uv_pars_vertex:hT,uv_vertex:dT,worldpos_vertex:pT,background_vert:mT,background_frag:gT,backgroundCube_vert:vT,backgroundCube_frag:_T,cube_vert:xT,cube_frag:ST,depth_vert:yT,depth_frag:MT,distance_vert:ET,distance_frag:bT,equirect_vert:TT,equirect_frag:AT,linedashed_vert:wT,linedashed_frag:RT,meshbasic_vert:CT,meshbasic_frag:DT,meshlambert_vert:LT,meshlambert_frag:UT,meshmatcap_vert:NT,meshmatcap_frag:OT,meshnormal_vert:PT,meshnormal_frag:IT,meshphong_vert:zT,meshphong_frag:BT,meshphysical_vert:FT,meshphysical_frag:HT,meshtoon_vert:GT,meshtoon_frag:VT,points_vert:kT,points_frag:XT,shadow_vert:WT,shadow_frag:qT,sprite_vert:YT,sprite_frag:ZT},Bt={common:{diffuse:{value:new pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new he}},envmap:{envMap:{value:null},envMapRotation:{value:new he},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new he}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new he}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new he},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new he},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new he},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new he}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new he}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new he}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0},uvTransform:{value:new he}},sprite:{diffuse:{value:new pe(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}}},sa={basic:{uniforms:ai([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.fog]),vertexShader:xe.meshbasic_vert,fragmentShader:xe.meshbasic_frag},lambert:{uniforms:ai([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,Bt.lights,{emissive:{value:new pe(0)},envMapIntensity:{value:1}}]),vertexShader:xe.meshlambert_vert,fragmentShader:xe.meshlambert_frag},phong:{uniforms:ai([Bt.common,Bt.specularmap,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,Bt.lights,{emissive:{value:new pe(0)},specular:{value:new pe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:xe.meshphong_vert,fragmentShader:xe.meshphong_frag},standard:{uniforms:ai([Bt.common,Bt.envmap,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.roughnessmap,Bt.metalnessmap,Bt.fog,Bt.lights,{emissive:{value:new pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xe.meshphysical_vert,fragmentShader:xe.meshphysical_frag},toon:{uniforms:ai([Bt.common,Bt.aomap,Bt.lightmap,Bt.emissivemap,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.gradientmap,Bt.fog,Bt.lights,{emissive:{value:new pe(0)}}]),vertexShader:xe.meshtoon_vert,fragmentShader:xe.meshtoon_frag},matcap:{uniforms:ai([Bt.common,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,Bt.fog,{matcap:{value:null}}]),vertexShader:xe.meshmatcap_vert,fragmentShader:xe.meshmatcap_frag},points:{uniforms:ai([Bt.points,Bt.fog]),vertexShader:xe.points_vert,fragmentShader:xe.points_frag},dashed:{uniforms:ai([Bt.common,Bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xe.linedashed_vert,fragmentShader:xe.linedashed_frag},depth:{uniforms:ai([Bt.common,Bt.displacementmap]),vertexShader:xe.depth_vert,fragmentShader:xe.depth_frag},normal:{uniforms:ai([Bt.common,Bt.bumpmap,Bt.normalmap,Bt.displacementmap,{opacity:{value:1}}]),vertexShader:xe.meshnormal_vert,fragmentShader:xe.meshnormal_frag},sprite:{uniforms:ai([Bt.sprite,Bt.fog]),vertexShader:xe.sprite_vert,fragmentShader:xe.sprite_frag},background:{uniforms:{uvTransform:{value:new he},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xe.background_vert,fragmentShader:xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new he}},vertexShader:xe.backgroundCube_vert,fragmentShader:xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xe.cube_vert,fragmentShader:xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xe.equirect_vert,fragmentShader:xe.equirect_frag},distance:{uniforms:ai([Bt.common,Bt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xe.distance_vert,fragmentShader:xe.distance_frag},shadow:{uniforms:ai([Bt.lights,Bt.fog,{color:{value:new pe(0)},opacity:{value:1}}]),vertexShader:xe.shadow_vert,fragmentShader:xe.shadow_frag}};sa.physical={uniforms:ai([sa.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new he},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new he},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new he},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new he},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new he},sheen:{value:0},sheenColor:{value:new pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new he},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new he},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new he},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new he},attenuationDistance:{value:0},attenuationColor:{value:new pe(0)},specularColor:{value:new pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new he},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new he},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new he}}]),vertexShader:xe.meshphysical_vert,fragmentShader:xe.meshphysical_frag};const cu={r:0,b:0,g:0},KT=new je,Tx=new he;Tx.set(-1,0,0,0,1,0,0,0,1);function JT(r,t,n,a,o,c){const u=new pe(0);let d=o===!0?0:1,m,p,g=null,v=0,_=null;function x(C){let P=C.isScene===!0?C.background:null;if(P&&P.isTexture){const A=C.backgroundBlurriness>0;P=t.get(P,A)}return P}function E(C){let P=!1;const A=x(C);A===null?M(u,d):A&&A.isColor&&(M(A,1),P=!0);const L=r.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,c):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||P)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function D(C,P){const A=x(P);A&&(A.isCubeTexture||A.mapping===Eu)?(p===void 0&&(p=new Jt(new Ji(1,1,1),new Qi({name:"BackgroundCubeMaterial",uniforms:oo(sa.backgroundCube.uniforms),vertexShader:sa.backgroundCube.vertexShader,fragmentShader:sa.backgroundCube.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(L,N,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(p)),p.material.uniforms.envMap.value=A,p.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(KT.makeRotationFromEuler(P.backgroundRotation)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(Tx),p.material.toneMapped=De.getTransfer(A.colorSpace)!==We,(g!==A||v!==A.version||_!==r.toneMapping)&&(p.material.needsUpdate=!0,g=A,v=A.version,_=r.toneMapping),p.layers.enableAll(),C.unshift(p,p.geometry,p.material,0,0,null)):A&&A.isTexture&&(m===void 0&&(m=new Jt(new ua(2,2),new Qi({name:"BackgroundMaterial",uniforms:oo(sa.background.uniforms),vertexShader:sa.background.vertexShader,fragmentShader:sa.background.fragmentShader,side:ws,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=A,m.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,m.material.toneMapped=De.getTransfer(A.colorSpace)!==We,A.matrixAutoUpdate===!0&&A.updateMatrix(),m.material.uniforms.uvTransform.value.copy(A.matrix),(g!==A||v!==A.version||_!==r.toneMapping)&&(m.material.needsUpdate=!0,g=A,v=A.version,_=r.toneMapping),m.layers.enableAll(),C.unshift(m,m.geometry,m.material,0,0,null))}function M(C,P){C.getRGB(cu,yx(r)),n.buffers.color.setClear(cu.r,cu.g,cu.b,P,c)}function S(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return u},setClearColor:function(C,P=1){u.set(C),d=P,M(u,d)},getClearAlpha:function(){return d},setClearAlpha:function(C){d=C,M(u,d)},render:E,addToRenderList:D,dispose:S}}function QT(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=_(null);let c=o,u=!1;function d(X,q,K,H,Q){let F=!1;const k=v(X,H,K,q);c!==k&&(c=k,p(c.object)),F=x(X,H,K,Q),F&&E(X,H,K,Q),Q!==null&&t.update(Q,r.ELEMENT_ARRAY_BUFFER),(F||u)&&(u=!1,A(X,q,K,H),Q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function m(){return r.createVertexArray()}function p(X){return r.bindVertexArray(X)}function g(X){return r.deleteVertexArray(X)}function v(X,q,K,H){const Q=H.wireframe===!0;let F=a[q.id];F===void 0&&(F={},a[q.id]=F);const k=X.isInstancedMesh===!0?X.id:0;let lt=F[k];lt===void 0&&(lt={},F[k]=lt);let et=lt[K.id];et===void 0&&(et={},lt[K.id]=et);let ft=et[Q];return ft===void 0&&(ft=_(m()),et[Q]=ft),ft}function _(X){const q=[],K=[],H=[];for(let Q=0;Q<n;Q++)q[Q]=0,K[Q]=0,H[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:K,attributeDivisors:H,object:X,attributes:{},index:null}}function x(X,q,K,H){const Q=c.attributes,F=q.attributes;let k=0;const lt=K.getAttributes();for(const et in lt)if(lt[et].location>=0){const O=Q[et];let tt=F[et];if(tt===void 0&&(et==="instanceMatrix"&&X.instanceMatrix&&(tt=X.instanceMatrix),et==="instanceColor"&&X.instanceColor&&(tt=X.instanceColor)),O===void 0||O.attribute!==tt||tt&&O.data!==tt.data)return!0;k++}return c.attributesNum!==k||c.index!==H}function E(X,q,K,H){const Q={},F=q.attributes;let k=0;const lt=K.getAttributes();for(const et in lt)if(lt[et].location>=0){let O=F[et];O===void 0&&(et==="instanceMatrix"&&X.instanceMatrix&&(O=X.instanceMatrix),et==="instanceColor"&&X.instanceColor&&(O=X.instanceColor));const tt={};tt.attribute=O,O&&O.data&&(tt.data=O.data),Q[et]=tt,k++}c.attributes=Q,c.attributesNum=k,c.index=H}function D(){const X=c.newAttributes;for(let q=0,K=X.length;q<K;q++)X[q]=0}function M(X){S(X,0)}function S(X,q){const K=c.newAttributes,H=c.enabledAttributes,Q=c.attributeDivisors;K[X]=1,H[X]===0&&(r.enableVertexAttribArray(X),H[X]=1),Q[X]!==q&&(r.vertexAttribDivisor(X,q),Q[X]=q)}function C(){const X=c.newAttributes,q=c.enabledAttributes;for(let K=0,H=q.length;K<H;K++)q[K]!==X[K]&&(r.disableVertexAttribArray(K),q[K]=0)}function P(X,q,K,H,Q,F,k){k===!0?r.vertexAttribIPointer(X,q,K,Q,F):r.vertexAttribPointer(X,q,K,H,Q,F)}function A(X,q,K,H){D();const Q=H.attributes,F=K.getAttributes(),k=q.defaultAttributeValues;for(const lt in F){const et=F[lt];if(et.location>=0){let ft=Q[lt];if(ft===void 0&&(lt==="instanceMatrix"&&X.instanceMatrix&&(ft=X.instanceMatrix),lt==="instanceColor"&&X.instanceColor&&(ft=X.instanceColor)),ft!==void 0){const O=ft.normalized,tt=ft.itemSize,dt=t.get(ft);if(dt===void 0)continue;const bt=dt.buffer,Nt=dt.type,Vt=dt.bytesPerElement,at=Nt===r.INT||Nt===r.UNSIGNED_INT||ft.gpuType===_p;if(ft.isInterleavedBufferAttribute){const vt=ft.data,Rt=vt.stride,Kt=ft.offset;if(vt.isInstancedInterleavedBuffer){for(let Pt=0;Pt<et.locationSize;Pt++)S(et.location+Pt,vt.meshPerAttribute);X.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let Pt=0;Pt<et.locationSize;Pt++)M(et.location+Pt);r.bindBuffer(r.ARRAY_BUFFER,bt);for(let Pt=0;Pt<et.locationSize;Pt++)P(et.location+Pt,tt/et.locationSize,Nt,O,Rt*Vt,(Kt+tt/et.locationSize*Pt)*Vt,at)}else{if(ft.isInstancedBufferAttribute){for(let vt=0;vt<et.locationSize;vt++)S(et.location+vt,ft.meshPerAttribute);X.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let vt=0;vt<et.locationSize;vt++)M(et.location+vt);r.bindBuffer(r.ARRAY_BUFFER,bt);for(let vt=0;vt<et.locationSize;vt++)P(et.location+vt,tt/et.locationSize,Nt,O,tt*Vt,tt/et.locationSize*vt*Vt,at)}}else if(k!==void 0){const O=k[lt];if(O!==void 0)switch(O.length){case 2:r.vertexAttrib2fv(et.location,O);break;case 3:r.vertexAttrib3fv(et.location,O);break;case 4:r.vertexAttrib4fv(et.location,O);break;default:r.vertexAttrib1fv(et.location,O)}}}}C()}function L(){U();for(const X in a){const q=a[X];for(const K in q){const H=q[K];for(const Q in H){const F=H[Q];for(const k in F)g(F[k].object),delete F[k];delete H[Q]}}delete a[X]}}function N(X){if(a[X.id]===void 0)return;const q=a[X.id];for(const K in q){const H=q[K];for(const Q in H){const F=H[Q];for(const k in F)g(F[k].object),delete F[k];delete H[Q]}}delete a[X.id]}function I(X){for(const q in a){const K=a[q];for(const H in K){const Q=K[H];if(Q[X.id]===void 0)continue;const F=Q[X.id];for(const k in F)g(F[k].object),delete F[k];delete Q[X.id]}}}function T(X){for(const q in a){const K=a[q],H=X.isInstancedMesh===!0?X.id:0,Q=K[H];if(Q!==void 0){for(const F in Q){const k=Q[F];for(const lt in k)g(k[lt].object),delete k[lt];delete Q[F]}delete K[H],Object.keys(K).length===0&&delete a[q]}}}function U(){B(),u=!0,c!==o&&(c=o,p(c.object))}function B(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:d,reset:U,resetDefaultState:B,dispose:L,releaseStatesOfGeometry:N,releaseStatesOfObject:T,releaseStatesOfProgram:I,initAttributes:D,enableAttribute:M,disableUnusedAttributes:C}}function jT(r,t,n){let a;function o(m){a=m}function c(m,p){r.drawArrays(a,m,p),n.update(p,a,1)}function u(m,p,g){g!==0&&(r.drawArraysInstanced(a,m,p,g),n.update(p,a,g))}function d(m,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,p,0,g);let _=0;for(let x=0;x<g;x++)_+=p[x];n.update(_,a,1)}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=d}function $T(r,t,n,a){let o;function c(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");o=r.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function u(I){return!(I!==Yi&&a.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(I){const T=I===ha&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==bi&&I!==oa&&!T&&a.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function m(I){if(I==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const g=m(p);g!==p&&(ce("WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const v=n.logarithmicDepthBuffer===!0,_=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&_===!1&&ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),D=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),C=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),P=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),L=r.getParameter(r.MAX_SAMPLES),N=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:u,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:v,reversedDepthBuffer:_,maxTextures:x,maxVertexTextures:E,maxTextureSize:D,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:C,maxVaryings:P,maxFragmentUniforms:A,maxSamples:L,samples:N}}function tA(r){const t=this;let n=null,a=0,o=!1,c=!1;const u=new Ha,d=new he,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,_){const x=v.length!==0||_||a!==0||o;return o=_,a=v.length,x},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,_){n=g(v,_,0)},this.setState=function(v,_,x){const E=v.clippingPlanes,D=v.clipIntersection,M=v.clipShadows,S=r.get(v);if(!o||E===null||E.length===0||c&&!M)c?g(null):p();else{const C=c?0:a,P=C*4;let A=S.clippingState||null;m.value=A,A=g(E,_,P,x);for(let L=0;L!==P;++L)A[L]=n[L];S.clippingState=A,this.numIntersection=D?this.numPlanes:0,this.numPlanes+=C}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function g(v,_,x,E){const D=v!==null?v.length:0;let M=null;if(D!==0){if(M=m.value,E!==!0||M===null){const S=x+D*4,C=_.matrixWorldInverse;d.getNormalMatrix(C),(M===null||M.length<S)&&(M=new Float32Array(S));for(let P=0,A=x;P!==D;++P,A+=4)u.copy(v[P]).applyMatrix4(C,d),u.normal.toArray(M,A),M[A+3]=u.constant}m.value=M,m.needsUpdate=!0}return t.numPlanes=D,t.numIntersection=0,M}}const to=4,eA=6,nA=20,iA=256,rl=new Au,m_=new pe;let gd=null,vd=0,_d=0,xd=!1;const aA=new V,Qs=new V;class g_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,a=.1,o=100,c={}){const{size:u=256,position:d=aA}=c;gd=this._renderer.getRenderTarget(),vd=this._renderer.getActiveCubeFace(),_d=this._renderer.getActiveMipmapLevel(),xd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,a,o,m,d),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=x_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=__(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(gd,vd,_d),this._renderer.xr.enabled=xd,t.scissorTest=!1,Qr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===nr||t.mapping===io?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gd=this._renderer.getRenderTarget(),vd=this._renderer.getActiveCubeFace(),_d=this._renderer.getActiveMipmapLevel(),xd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:ha,format:Yi,colorSpace:_u,depthBuffer:!1},o=v_(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=v_(t,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=sA(c)),this._blurMaterial=oA(c,t,n),this._ggxMaterial=rA(c,t,n)}return o}_compileMaterial(t){const n=new Jt(new Sn,t);this._renderer.compile(n,rl)}_sceneToCubeUV(t,n,a,o,c){const m=new Ei(90,1,n,a),p=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],v=this._renderer,_=v.autoClear,x=v.toneMapping;v.getClearColor(m_),v.toneMapping=ca,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(o),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jt(new Ji,new Dp({name:"PMREM.Background",side:hi,depthWrite:!1,depthTest:!1})));const D=this._backgroundBox,M=D.material;let S=!1;const C=t.background;C?C.isColor&&(M.color.copy(C),t.background=null,S=!0):(M.color.copy(m_),S=!0);for(let P=0;P<6;P++){const A=P%3;A===0?(m.up.set(0,p[P],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+g[P],c.y,c.z)):A===1?(m.up.set(0,0,p[P]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+g[P],c.z)):(m.up.set(0,p[P],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+g[P]));const L=this._cubeSize;Qr(o,A*L,P>2?L:0,L,L),v.setRenderTarget(o),S&&v.render(D,m),v.render(t,m)}v.toneMapping=x,v.autoClear=_,t.background=C}_textureToCubeUV(t,n){const a=this._renderer,o=t.mapping===nr||t.mapping===io;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=x_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=__());const c=o?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;Qr(n,0,0,3*m,2*m),a.setRenderTarget(n),a.render(u,rl)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(t,c-1,c);n.autoClear=a}_applyGGXFilter(t,n,a){const o=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,d=this._lodMeshes[a];d.material=u;const m=u.uniforms,p=a/(this._lodMeshes.length-1),g=n/(this._lodMeshes.length-1),v=Math.sqrt(p*p-g*g),_=p*1.25,x=v*_,{_lodMax:E}=this,D=this._sizeLods[a],M=3*D*(a>E-to?a-E+to:0),S=4*(this._cubeSize-D);m.envMap.value=t.texture,m.roughness.value=x,m.mipInt.value=E-n,Qr(c,M,S,3*D,2*D),o.setRenderTarget(c),o.render(d,rl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=E-a,Qr(t,M,S,3*D,2*D),o.setRenderTarget(t),o.render(d,rl)}_blur(t,n,a,o){const c=this._pingPongRenderTarget,u=Math.min(o,Math.PI)/Math.SQRT2;this._blurPass(t,c,n,a,u),this._blurPass(c,t,a,a,u)}_blurPass(t,n,a,o,c){const u=this._renderer,d=this._blurMaterial,m=this._lodMeshes[o];m.material=d;const p=d.uniforms;p.envMap.value=t.texture,p.sigma.value=c,p.mipInt.value=this._lodMax-a;const g=this._sizeLods[o],v=3*g*(o>this._lodMax-to?o-this._lodMax+to:0),_=4*(this._cubeSize-g);Qr(n,v,_,3*g,2*g),u.setRenderTarget(n),u.render(m,rl)}}function sA(r){const t=[],n=[];let a=r;const o=r-to+1+eA;for(let c=0;c<o;c++){const u=Math.pow(2,a);t.push(u);const d=1/(u-2),m=-d,p=1+d,g=[m,m,p,m,p,p,m,m,p,p,m,p],v=6,_=6,x=3,E=new Float32Array(x*_*v),D=new Float32Array(x*_*v);for(let S=0;S<v;S++){const C=S%3*2/3-1,P=S>2?0:-1,A=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];E.set(A,x*_*S);for(let L=0;L<_;L++){const N=g[L*2]*2-1,I=g[L*2+1]*2-1;S===0?Qs.set(1,I,N):S===1?Qs.set(-N,1,-I):S===2?Qs.set(-N,I,1):S===3?Qs.set(-1,I,-N):S===4?Qs.set(-N,-1,I):Qs.set(N,I,-1),Qs.toArray(D,(S*_+L)*x)}}const M=new Sn;M.setAttribute("position",new Ki(E,x)),M.setAttribute("outputDirection",new Ki(D,x)),n.push(new Jt(M,null)),a>to&&a--}return{lodMeshes:n,sizeLods:t}}function v_(r,t,n){const a=new Zi(r,t,n);return a.texture.mapping=Eu,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Qr(r,t,n,a,o){r.viewport.set(t,n,a,o),r.scissor.set(t,n,a,o)}function rA(r,t,n){return new Qi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:iA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:wu(),fragmentShader:`

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
		`,blending:Va,depthTest:!1,depthWrite:!1})}function oA(r,t,n){return new Qi({name:"SphericalGaussianBlur",defines:{SAMPLES:nA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:wu(),fragmentShader:`

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
		`,blending:Va,depthTest:!1,depthWrite:!1})}function __(){return new Qi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wu(),fragmentShader:`

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
		`,blending:Va,depthTest:!1,depthWrite:!1})}function x_(){return new Qi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Va,depthTest:!1,depthWrite:!1})}function wu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ax extends Zi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},o=[a,a,a,a,a,a];this.texture=new cx(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new Ji(5,5,5),c=new Qi({name:"CubemapFromEquirect",uniforms:oo(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:hi,blending:Va});c.uniforms.tEquirect.value=n;const u=new Jt(o,c),d=n.minFilter;return n.minFilter===js&&(n.minFilter=jn),new fE(1,10,this).update(t,u),n.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(t,n=!0,a=!0,o=!0){const c=t.getRenderTarget();for(let u=0;u<6;u++)t.setRenderTarget(this,u),t.clear(n,a,o);t.setRenderTarget(c)}}function lA(r){let t=new WeakMap,n=new WeakMap,a=null;function o(_,x=!1){return _==null?null:x?u(_):c(_)}function c(_){if(_&&_.isTexture){const x=_.mapping;if(x===Hh||x===Gh)if(t.has(_)){const E=t.get(_).texture;return d(E,_.mapping)}else{const E=_.image;if(E&&E.height>0){const D=new Ax(E.height);return D.fromEquirectangularTexture(r,_),t.set(_,D),_.addEventListener("dispose",p),d(D.texture,_.mapping)}else return null}}return _}function u(_){if(_&&_.isTexture){const x=_.mapping,E=x===Hh||x===Gh,D=x===nr||x===io;if(E||D){let M=n.get(_);const S=M!==void 0?M.texture.pmremVersion:0;if(_.isRenderTargetTexture&&_.pmremVersion!==S)return a===null&&(a=new g_(r)),M=E?a.fromEquirectangular(_,M):a.fromCubemap(_,M),M.texture.pmremVersion=_.pmremVersion,n.set(_,M),M.texture;if(M!==void 0)return M.texture;{const C=_.image;return E&&C&&C.height>0||D&&C&&m(C)?(a===null&&(a=new g_(r)),M=E?a.fromEquirectangular(_):a.fromCubemap(_),M.texture.pmremVersion=_.pmremVersion,n.set(_,M),_.addEventListener("dispose",g),M.texture):null}}}return _}function d(_,x){return x===Hh?_.mapping=nr:x===Gh&&(_.mapping=io),_}function m(_){let x=0;const E=6;for(let D=0;D<E;D++)_[D]!==void 0&&x++;return x===E}function p(_){const x=_.target;x.removeEventListener("dispose",p);const E=t.get(x);E!==void 0&&(t.delete(x),E.dispose())}function g(_){const x=_.target;x.removeEventListener("dispose",g);const E=n.get(x);E!==void 0&&(n.delete(x),E.dispose())}function v(){t=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:o,dispose:v}}function cA(r){const t={};function n(a){if(t[a]!==void 0)return t[a];const o=r.getExtension(a);return t[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&eo("WebGLRenderer: "+a+" extension not supported."),o}}}function uA(r,t,n,a){const o={},c=new WeakMap;function u(v){const _=v.target;_.index!==null&&t.remove(_.index);for(const E in _.attributes)t.remove(_.attributes[E]);_.removeEventListener("dispose",u),delete o[_.id];const x=c.get(_);x&&(t.remove(x),c.delete(_)),a.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,n.memory.geometries--}function d(v,_){return o[_.id]===!0||(_.addEventListener("dispose",u),o[_.id]=!0,n.memory.geometries++),_}function m(v){const _=v.attributes;for(const x in _)t.update(_[x],r.ARRAY_BUFFER)}function p(v){const _=[],x=v.index,E=v.attributes.position;let D=0;if(E===void 0)return;if(x!==null){const C=x.array;D=x.version;for(let P=0,A=C.length;P<A;P+=3){const L=C[P+0],N=C[P+1],I=C[P+2];_.push(L,N,N,I,I,L)}}else{const C=E.array;D=E.version;for(let P=0,A=C.length/3-1;P<A;P+=3){const L=P+0,N=P+1,I=P+2;_.push(L,N,N,I,I,L)}}const M=new(E.count>=65535?ox:rx)(_,1);M.version=D;const S=c.get(v);S&&t.remove(S),c.set(v,M)}function g(v){const _=c.get(v);if(_){const x=v.index;x!==null&&_.version<x.version&&p(v)}else p(v);return c.get(v)}return{get:d,update:m,getWireframeAttribute:g}}function fA(r,t,n){let a;function o(v){a=v}let c,u;function d(v){c=v.type,u=v.bytesPerElement}function m(v,_){r.drawElements(a,_,c,v*u),n.update(_,a,1)}function p(v,_,x){x!==0&&(r.drawElementsInstanced(a,_,c,v*u,x),n.update(_,a,x))}function g(v,_,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,_,0,c,v,0,x);let D=0;for(let M=0;M<x;M++)D+=_[M];n.update(D,a,1)}this.setMode=o,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g}function hA(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,u,d){switch(n.calls++,u){case r.TRIANGLES:n.triangles+=d*(c/3);break;case r.LINES:n.lines+=d*(c/2);break;case r.LINE_STRIP:n.lines+=d*(c-1);break;case r.LINE_LOOP:n.lines+=d*c;break;case r.POINTS:n.points+=d*c;break;default:Oe("WebGLInfo: Unknown draw mode:",u);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:o,update:a}}function dA(r,t,n){const a=new WeakMap,o=new un;function c(u,d,m){const p=u.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=g!==void 0?g.length:0;let _=a.get(d);if(_===void 0||_.count!==v){let B=function(){T.dispose(),a.delete(d),d.removeEventListener("dispose",B)};var x=B;_!==void 0&&_.texture.dispose();const E=d.morphAttributes.position!==void 0,D=d.morphAttributes.normal!==void 0,M=d.morphAttributes.color!==void 0,S=d.morphAttributes.position||[],C=d.morphAttributes.normal||[],P=d.morphAttributes.color||[];let A=0;E===!0&&(A=1),D===!0&&(A=2),M===!0&&(A=3);let L=d.attributes.position.count*A,N=1;L>t.maxTextureSize&&(N=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const I=new Float32Array(L*N*4*v),T=new ax(I,L,N,v);T.type=oa,T.needsUpdate=!0;const U=A*4;for(let X=0;X<v;X++){const q=S[X],K=C[X],H=P[X],Q=L*N*4*X;for(let F=0;F<q.count;F++){const k=F*U;E===!0&&(o.fromBufferAttribute(q,F),I[Q+k+0]=o.x,I[Q+k+1]=o.y,I[Q+k+2]=o.z,I[Q+k+3]=0),D===!0&&(o.fromBufferAttribute(K,F),I[Q+k+4]=o.x,I[Q+k+5]=o.y,I[Q+k+6]=o.z,I[Q+k+7]=0),M===!0&&(o.fromBufferAttribute(H,F),I[Q+k+8]=o.x,I[Q+k+9]=o.y,I[Q+k+10]=o.z,I[Q+k+11]=H.itemSize===4?o.w:1)}}_={count:v,texture:T,size:new Wt(L,N)},a.set(d,_),d.addEventListener("dispose",B)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",u.morphTexture,n);else{let E=0;for(let M=0;M<p.length;M++)E+=p[M];const D=d.morphTargetsRelative?1:1-E;m.getUniforms().setValue(r,"morphTargetBaseInfluence",D),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",_.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}return{update:c}}function pA(r,t,n,a,o){let c=new WeakMap;function u(p){const g=o.render.frame,v=p.geometry,_=t.get(p,v);if(c.get(_)!==g&&(t.update(_),c.set(_,g)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==g&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,g))),p.isSkinnedMesh){const x=p.skeleton;c.get(x)!==g&&(x.update(),c.set(x,g))}return _}function d(){c=new WeakMap}function m(p){const g=p.target;g.removeEventListener("dispose",m),a.releaseStatesOfObject(g),n.remove(g.instanceMatrix),g.instanceColor!==null&&n.remove(g.instanceColor)}return{update:u,dispose:d}}const mA={[k_]:"LINEAR_TONE_MAPPING",[X_]:"REINHARD_TONE_MAPPING",[W_]:"CINEON_TONE_MAPPING",[vp]:"ACES_FILMIC_TONE_MAPPING",[Y_]:"AGX_TONE_MAPPING",[Z_]:"NEUTRAL_TONE_MAPPING",[q_]:"CUSTOM_TONE_MAPPING"};function gA(r,t,n,a,o,c){const u=new Zi(t,n,{type:r,depthBuffer:o,stencilBuffer:c,samples:a?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let d=null,m=null;const p=new Sn;p.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new Re([0,2,0,0,2,0],2));const g=new j1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),v=new Jt(p,g),_=new Au(-1,1,1,-1,0,1);let x=null,E=null,D=!1,M,S=null,C=[],P=!1;this.setSize=function(A,L){u.setSize(A,L),d!==null&&d.setSize(A,L),m!==null&&m.setSize(A,L);for(let N=0;N<C.length;N++){const I=C[N];I.setSize&&I.setSize(A,L)}},this.setEffects=function(A){C=A,P=C.length>0&&C[0].isRenderPass===!0;const L=u.width,N=u.height;C.length>0&&d===null&&(d=new Zi(L,N,{type:ha,depthBuffer:!1,stencilBuffer:!1}),m=new Zi(L,N,{type:ha,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<C.length;I++){const T=C[I];T.setSize&&T.setSize(L,N)}},this.begin=function(A,L){if(D||A.toneMapping===ca&&C.length===0)return!1;if(S=L,L!==null){const N=L.width,I=L.height;(u.width!==N||u.height!==I)&&this.setSize(N,I)}return P===!1&&A.setRenderTarget(u),M=A.toneMapping,A.toneMapping=ca,!0},this.hasRenderPass=function(){return P},this.end=function(A,L){A.toneMapping=M,D=!0;let N=u,I=d;for(let T=0;T<C.length;T++){const U=C[T];U.enabled!==!1&&(U.render(A,I,N,L),U.needsSwap!==!1&&(N=I,I=I===d?m:d))}if(x!==A.outputColorSpace||E!==A.toneMapping){x=A.outputColorSpace,E=A.toneMapping,g.defines={},De.getTransfer(x)===We&&(g.defines.SRGB_TRANSFER="");const T=mA[E];T&&(g.defines[T]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=N.texture,A.setRenderTarget(S),A.render(v,_),S=null,D=!1},this.isCompositing=function(){return D},this.dispose=function(){u.dispose(),d!==null&&d.dispose(),m!==null&&m.dispose(),p.dispose(),g.dispose()}}const wx=new qn,dp=new bl(1,1),Rx=new ax,Cx=new JM,Dx=new cx,S_=[],y_=[],M_=new Float32Array(16),E_=new Float32Array(9),b_=new Float32Array(4);function uo(r,t,n){const a=r[0];if(a<=0||a>0)return r;const o=t*n;let c=S_[o];if(c===void 0&&(c=new Float32Array(o),S_[o]=c),t!==0){a.toArray(c,0);for(let u=1,d=0;u!==t;++u)d+=n,r[u].toArray(c,d)}return c}function Pn(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function In(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function Ru(r,t){let n=y_[t];n===void 0&&(n=new Int32Array(t),y_[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function vA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function _A(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pn(n,t))return;r.uniform2fv(this.addr,t),In(n,t)}}function xA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Pn(n,t))return;r.uniform3fv(this.addr,t),In(n,t)}}function SA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pn(n,t))return;r.uniform4fv(this.addr,t),In(n,t)}}function yA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Pn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),In(n,t)}else{if(Pn(n,a))return;b_.set(a),r.uniformMatrix2fv(this.addr,!1,b_),In(n,a)}}function MA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Pn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),In(n,t)}else{if(Pn(n,a))return;E_.set(a),r.uniformMatrix3fv(this.addr,!1,E_),In(n,a)}}function EA(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Pn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),In(n,t)}else{if(Pn(n,a))return;M_.set(a),r.uniformMatrix4fv(this.addr,!1,M_),In(n,a)}}function bA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function TA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pn(n,t))return;r.uniform2iv(this.addr,t),In(n,t)}}function AA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Pn(n,t))return;r.uniform3iv(this.addr,t),In(n,t)}}function wA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pn(n,t))return;r.uniform4iv(this.addr,t),In(n,t)}}function RA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function CA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pn(n,t))return;r.uniform2uiv(this.addr,t),In(n,t)}}function DA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Pn(n,t))return;r.uniform3uiv(this.addr,t),In(n,t)}}function LA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pn(n,t))return;r.uniform4uiv(this.addr,t),In(n,t)}}function UA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(dp.compareFunction=n.isReversedDepthBuffer()?Tp:bp,c=dp):c=wx,n.setTexture2D(t||c,o)}function NA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(t||Cx,o)}function OA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(t||Dx,o)}function PA(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(t||Rx,o)}function IA(r){switch(r){case 5126:return vA;case 35664:return _A;case 35665:return xA;case 35666:return SA;case 35674:return yA;case 35675:return MA;case 35676:return EA;case 5124:case 35670:return bA;case 35667:case 35671:return TA;case 35668:case 35672:return AA;case 35669:case 35673:return wA;case 5125:return RA;case 36294:return CA;case 36295:return DA;case 36296:return LA;case 35678:case 36198:case 36298:case 36306:case 35682:return UA;case 35679:case 36299:case 36307:return NA;case 35680:case 36300:case 36308:case 36293:return OA;case 36289:case 36303:case 36311:case 36292:return PA}}function zA(r,t){r.uniform1fv(this.addr,t)}function BA(r,t){const n=uo(t,this.size,2);r.uniform2fv(this.addr,n)}function FA(r,t){const n=uo(t,this.size,3);r.uniform3fv(this.addr,n)}function HA(r,t){const n=uo(t,this.size,4);r.uniform4fv(this.addr,n)}function GA(r,t){const n=uo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function VA(r,t){const n=uo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function kA(r,t){const n=uo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function XA(r,t){r.uniform1iv(this.addr,t)}function WA(r,t){r.uniform2iv(this.addr,t)}function qA(r,t){r.uniform3iv(this.addr,t)}function YA(r,t){r.uniform4iv(this.addr,t)}function ZA(r,t){r.uniform1uiv(this.addr,t)}function KA(r,t){r.uniform2uiv(this.addr,t)}function JA(r,t){r.uniform3uiv(this.addr,t)}function QA(r,t){r.uniform4uiv(this.addr,t)}function jA(r,t,n){const a=this.cache,o=t.length,c=Ru(n,o);Pn(a,c)||(r.uniform1iv(this.addr,c),In(a,c));let u;this.type===r.SAMPLER_2D_SHADOW?u=dp:u=wx;for(let d=0;d!==o;++d)n.setTexture2D(t[d]||u,c[d])}function $A(r,t,n){const a=this.cache,o=t.length,c=Ru(n,o);Pn(a,c)||(r.uniform1iv(this.addr,c),In(a,c));for(let u=0;u!==o;++u)n.setTexture3D(t[u]||Cx,c[u])}function t2(r,t,n){const a=this.cache,o=t.length,c=Ru(n,o);Pn(a,c)||(r.uniform1iv(this.addr,c),In(a,c));for(let u=0;u!==o;++u)n.setTextureCube(t[u]||Dx,c[u])}function e2(r,t,n){const a=this.cache,o=t.length,c=Ru(n,o);Pn(a,c)||(r.uniform1iv(this.addr,c),In(a,c));for(let u=0;u!==o;++u)n.setTexture2DArray(t[u]||Rx,c[u])}function n2(r){switch(r){case 5126:return zA;case 35664:return BA;case 35665:return FA;case 35666:return HA;case 35674:return GA;case 35675:return VA;case 35676:return kA;case 5124:case 35670:return XA;case 35667:case 35671:return WA;case 35668:case 35672:return qA;case 35669:case 35673:return YA;case 5125:return ZA;case 36294:return KA;case 36295:return JA;case 36296:return QA;case 35678:case 36198:case 36298:case 36306:case 35682:return jA;case 35679:case 36299:case 36307:return $A;case 35680:case 36300:case 36308:case 36293:return t2;case 36289:case 36303:case 36311:case 36292:return e2}}class i2{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=IA(n.type)}}class a2{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=n2(n.type)}}class s2{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const o=this.seq;for(let c=0,u=o.length;c!==u;++c){const d=o[c];d.setValue(t,n[d.id],a)}}}const Sd=/(\w+)(\])?(\[|\.)?/g;function T_(r,t){r.seq.push(t),r.map[t.id]=t}function r2(r,t,n){const a=r.name,o=a.length;for(Sd.lastIndex=0;;){const c=Sd.exec(a),u=Sd.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&u+2===o){T_(n,p===void 0?new i2(d,r,t):new a2(d,r,t));break}else{let v=n.map[d];v===void 0&&(v=new s2(d),T_(n,v)),n=v}}}class mu{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let u=0;u<a;++u){const d=t.getActiveUniform(n,u),m=t.getUniformLocation(n,d.name);r2(d,m,this)}const o=[],c=[];for(const u of this.seq)u.type===t.SAMPLER_2D_SHADOW||u.type===t.SAMPLER_CUBE_SHADOW||u.type===t.SAMPLER_2D_ARRAY_SHADOW?o.push(u):c.push(u);o.length>0&&(this.seq=o.concat(c))}setValue(t,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(t,a,o)}setOptional(t,n,a){const o=n[a];o!==void 0&&this.setValue(t,a,o)}static upload(t,n,a,o){for(let c=0,u=n.length;c!==u;++c){const d=n[c],m=a[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,o)}}static seqWithValue(t,n){const a=[];for(let o=0,c=t.length;o!==c;++o){const u=t[o];u.id in n&&a.push(u)}return a}}function A_(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const o2=37297;let l2=0;function c2(r,t){const n=r.split(`
`),a=[],o=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let u=o;u<c;u++){const d=u+1;a.push(`${d===t?">":" "} ${d}: ${n[u]}`)}return a.join(`
`)}const w_=new he;function u2(r){De._getMatrix(w_,De.workingColorSpace,r);const t=`mat3( ${w_.elements.map(n=>n.toFixed(4))} )`;switch(De.getTransfer(r)){case xu:return[t,"LinearTransferOETF"];case We:return[t,"sRGBTransferOETF"];default:return ce("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function R_(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(a&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const d=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+c2(r.getShaderSource(t),d)}else return c}function f2(r,t){const n=u2(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const h2={[k_]:"Linear",[X_]:"Reinhard",[W_]:"Cineon",[vp]:"ACESFilmic",[Y_]:"AgX",[Z_]:"Neutral",[q_]:"Custom"};function d2(r,t){const n=h2[t];return n===void 0?(ce("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const uu=new V;function p2(){De.getLuminanceCoefficients(uu);const r=uu.x.toFixed(4),t=uu.y.toFixed(4),n=uu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function m2(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ul).join(`
`)}function g2(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function v2(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(t,o),u=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),n[u]={type:c.type,location:r.getAttribLocation(t,u),locationSize:d}}return n}function ul(r){return r!==""}function C_(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function D_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const _2=/^[ \t]*#include +<([\w\d./]+)>/gm;function pp(r){return r.replace(_2,S2)}const x2=new Map;function S2(r,t){let n=xe[t];if(n===void 0){const a=x2.get(t);if(a!==void 0)n=xe[a],ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return pp(n)}const y2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function L_(r){return r.replace(y2,M2)}function M2(r,t,n,a){let o="";for(let c=parseInt(t);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function U_(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const E2={[fl]:"SHADOWMAP_TYPE_PCF",[ll]:"SHADOWMAP_TYPE_VSM"};function b2(r){return E2[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const T2={[nr]:"ENVMAP_TYPE_CUBE",[io]:"ENVMAP_TYPE_CUBE",[Eu]:"ENVMAP_TYPE_CUBE_UV"};function A2(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":T2[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const w2={[io]:"ENVMAP_MODE_REFRACTION"};function R2(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":w2[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const C2={[V_]:"ENVMAP_BLENDING_MULTIPLY",[hM]:"ENVMAP_BLENDING_MIX",[dM]:"ENVMAP_BLENDING_ADD"};function D2(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":C2[r.combine]||"ENVMAP_BLENDING_NONE"}function L2(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function U2(r,t,n,a){const o=r.getContext(),c=n.defines;let u=n.vertexShader,d=n.fragmentShader;const m=b2(n),p=A2(n),g=R2(n),v=D2(n),_=L2(n),x=m2(n),E=g2(c),D=o.createProgram();let M,S,C=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(M=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(ul).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(ul).join(`
`),S.length>0&&(S+=`
`)):(M=[U_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ul).join(`
`),S=[U_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+g:"",n.envMap?"#define "+v:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ca?"#define TONE_MAPPING":"",n.toneMapping!==ca?xe.tonemapping_pars_fragment:"",n.toneMapping!==ca?d2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",xe.colorspace_pars_fragment,f2("linearToOutputTexel",n.outputColorSpace),p2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ul).join(`
`)),u=pp(u),u=C_(u,n),u=D_(u,n),d=pp(d),d=C_(d,n),d=D_(d,n),u=L_(u),d=L_(d),n.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,M=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",n.glslVersion===Uv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Uv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const P=C+M+u,A=C+S+d,L=A_(o,o.VERTEX_SHADER,P),N=A_(o,o.FRAGMENT_SHADER,A);o.attachShader(D,L),o.attachShader(D,N),n.index0AttributeName!==void 0?o.bindAttribLocation(D,0,n.index0AttributeName):n.hasPositionAttribute===!0&&o.bindAttribLocation(D,0,"position"),o.linkProgram(D);function I(X){if(r.debug.checkShaderErrors){const q=o.getProgramInfoLog(D)||"",K=o.getShaderInfoLog(L)||"",H=o.getShaderInfoLog(N)||"",Q=q.trim(),F=K.trim(),k=H.trim();let lt=!0,et=!0;if(o.getProgramParameter(D,o.LINK_STATUS)===!1)if(lt=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,D,L,N);else{const ft=R_(o,L,"vertex"),O=R_(o,N,"fragment");Oe("WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(D,o.VALIDATE_STATUS)+`

Material Name: `+X.name+`
Material Type: `+X.type+`

Program Info Log: `+Q+`
`+ft+`
`+O)}else Q!==""?ce("WebGLProgram: Program Info Log:",Q):(F===""||k==="")&&(et=!1);et&&(X.diagnostics={runnable:lt,programLog:Q,vertexShader:{log:F,prefix:M},fragmentShader:{log:k,prefix:S}})}o.deleteShader(L),o.deleteShader(N),T=new mu(o,D),U=v2(o,D)}let T;this.getUniforms=function(){return T===void 0&&I(this),T};let U;this.getAttributes=function(){return U===void 0&&I(this),U};let B=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=o.getProgramParameter(D,o2)),B},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(D),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=l2++,this.cacheKey=t,this.usedTimes=1,this.program=D,this.vertexShader=L,this.fragmentShader=N,this}let N2=0;class O2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,a){const o=this._getShaderCacheForMaterial(t);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new P2(t),n.set(t,a)),a}}class P2{constructor(t){this.id=N2++,this.code=t,this.usedTimes=0}}function I2(r){return r===ir||r===gu||r===vu}function z2(r,t,n,a,o,c){const u=new Rp,d=new O2,m=new Set,p=[],g=new Map,v=a.logarithmicDepthBuffer;let _=a.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(T){return m.add(T),T===0?"uv":`uv${T}`}function D(T,U,B,X,q,K){const H=X.fog,Q=q.geometry,F=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?X.environment:null,k=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,lt=t.get(T.envMap||F,k),et=lt&&lt.mapping===Eu?lt.image.height:null,ft=x[T.type];T.precision!==null&&(_=a.getMaxPrecision(T.precision),_!==T.precision&&ce("WebGLProgram.getParameters:",T.precision,"not supported, using",_,"instead."));const O=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,tt=O!==void 0?O.length:0;let dt=0;Q.morphAttributes.position!==void 0&&(dt=1),Q.morphAttributes.normal!==void 0&&(dt=2),Q.morphAttributes.color!==void 0&&(dt=3);let bt,Nt,Vt,at;if(ft){const Ve=sa[ft];bt=Ve.vertexShader,Nt=Ve.fragmentShader}else{bt=T.vertexShader,Nt=T.fragmentShader;const Ve=d.getVertexShaderStage(T),Se=d.getFragmentShaderStage(T);d.update(T,Ve,Se),Vt=Ve.id,at=Se.id}const vt=r.getRenderTarget(),Rt=r.state.buffers.depth.getReversed(),Kt=q.isInstancedMesh===!0,Pt=q.isBatchedMesh===!0,ue=!!T.map,$e=!!T.matcap,le=!!lt,Ee=!!T.aoMap,Le=!!T.lightMap,se=!!T.bumpMap&&T.wireframe===!1,Pe=!!T.normalMap,tn=!!T.displacementMap,mn=!!T.emissiveMap,Fe=!!T.metalnessMap,sn=!!T.roughnessMap,J=T.anisotropy>0,Ie=T.clearcoat>0,Ue=T.dispersion>0,z=T.retroreflectivity>0,b=T.iridescence>0,j=T.sheen>0,rt=T.transmission>0,mt=J&&!!T.anisotropyMap,At=Ie&&!!T.clearcoatMap,Dt=Ie&&!!T.clearcoatNormalMap,pt=Ie&&!!T.clearcoatRoughnessMap,gt=b&&!!T.iridescenceMap,Tt=b&&!!T.iridescenceThicknessMap,Ft=j&&!!T.sheenColorMap,Ut=j&&!!T.sheenRoughnessMap,Lt=!!T.specularMap,te=!!T.specularColorMap,ie=!!T.specularIntensityMap,oe=rt&&!!T.transmissionMap,Y=rt&&!!T.thicknessMap,Ct=!!T.gradientMap,_t=!!T.alphaMap,wt=T.alphaTest>0,It=!!T.alphaHash,Mt=!!T.extensions;let Yt=ca;T.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(Yt=r.toneMapping);const Zt={shaderID:ft,shaderType:T.type,shaderName:T.name,vertexShader:bt,fragmentShader:Nt,defines:T.defines,customVertexShaderID:Vt,customFragmentShaderID:at,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:_,batching:Pt,batchingColor:Pt&&q._colorsTexture!==null,instancing:Kt,instancingColor:Kt&&q.instanceColor!==null,instancingMorph:Kt&&q.morphTexture!==null,outputColorSpace:vt===null?r.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:De.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:ue,matcap:$e,envMap:le,envMapMode:le&&lt.mapping,envMapCubeUVHeight:et,aoMap:Ee,lightMap:Le,bumpMap:se,normalMap:Pe,displacementMap:tn,emissiveMap:mn,normalMapObjectSpace:Pe&&T.normalMapType===gM,normalMapTangentSpace:Pe&&T.normalMapType===lp,packedNormalMap:Pe&&T.normalMapType===lp&&I2(T.normalMap.format),metalnessMap:Fe,roughnessMap:sn,anisotropy:J,anisotropyMap:mt,clearcoat:Ie,clearcoatMap:At,clearcoatNormalMap:Dt,clearcoatRoughnessMap:pt,dispersion:Ue,retroreflection:z,iridescence:b,iridescenceMap:gt,iridescenceThicknessMap:Tt,sheen:j,sheenColorMap:Ft,sheenRoughnessMap:Ut,specularMap:Lt,specularColorMap:te,specularIntensityMap:ie,transmission:rt,transmissionMap:oe,thicknessMap:Y,gradientMap:Ct,opaque:T.transparent===!1&&T.blending===hl&&T.alphaToCoverage===!1,alphaMap:_t,alphaTest:wt,alphaHash:It,combine:T.combine,mapUv:ue&&E(T.map.channel),aoMapUv:Ee&&E(T.aoMap.channel),lightMapUv:Le&&E(T.lightMap.channel),bumpMapUv:se&&E(T.bumpMap.channel),normalMapUv:Pe&&E(T.normalMap.channel),displacementMapUv:tn&&E(T.displacementMap.channel),emissiveMapUv:mn&&E(T.emissiveMap.channel),metalnessMapUv:Fe&&E(T.metalnessMap.channel),roughnessMapUv:sn&&E(T.roughnessMap.channel),anisotropyMapUv:mt&&E(T.anisotropyMap.channel),clearcoatMapUv:At&&E(T.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&E(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&E(T.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&E(T.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&E(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&E(T.sheenColorMap.channel),sheenRoughnessMapUv:Ut&&E(T.sheenRoughnessMap.channel),specularMapUv:Lt&&E(T.specularMap.channel),specularColorMapUv:te&&E(T.specularColorMap.channel),specularIntensityMapUv:ie&&E(T.specularIntensityMap.channel),transmissionMapUv:oe&&E(T.transmissionMap.channel),thicknessMapUv:Y&&E(T.thicknessMap.channel),alphaMapUv:_t&&E(T.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Pe||J),vertexNormals:!!Q.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!Q.attributes.uv&&(ue||_t),fog:!!H,useFog:T.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||Q.attributes.normal===void 0&&Pe===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:Rt,skinning:q.isSkinnedMesh===!0,hasPositionAttribute:Q.attributes.position!==void 0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:dt,numSunLights:U.sun.length,numDirLights:U.directional.length,numPointLights:U.point.length,numSpotLights:U.spot.length,numSpotLightMaps:U.spotLightMap.length,numRectAreaLights:U.rectArea.length,numHemiLights:U.hemi.length,numSunLightShadows:U.sunShadowMap.length,numDirLightShadows:U.directionalShadowMap.length,numPointLightShadows:U.pointShadowMap.length,numSpotLightShadows:U.spotShadowMap.length,numSpotLightShadowsWithMaps:U.numSpotLightShadowsWithMaps,numLightProbes:U.numLightProbes,numLightProbeGrids:K.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&B.length>0,shadowMapType:r.shadowMap.type,toneMapping:Yt,decodeVideoTexture:ue&&T.map.isVideoTexture===!0&&De.getTransfer(T.map.colorSpace)===We,decodeVideoTextureEmissive:mn&&T.emissiveMap.isVideoTexture===!0&&De.getTransfer(T.emissiveMap.colorSpace)===We,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===On,flipSided:T.side===hi,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Mt&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Mt&&T.extensions.multiDraw===!0||Pt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Zt.vertexUv1s=m.has(1),Zt.vertexUv2s=m.has(2),Zt.vertexUv3s=m.has(3),m.clear(),Zt}function M(T){const U=[];if(T.shaderID?U.push(T.shaderID):(U.push(T.customVertexShaderID),U.push(T.customFragmentShaderID)),T.defines!==void 0)for(const B in T.defines)U.push(B),U.push(T.defines[B]);return T.isRawShaderMaterial===!1&&(S(U,T),C(U,T),U.push(r.outputColorSpace)),U.push(T.customProgramCacheKey),U.join()}function S(T,U){T.push(U.precision),T.push(U.outputColorSpace),T.push(U.envMapMode),T.push(U.envMapCubeUVHeight),T.push(U.mapUv),T.push(U.alphaMapUv),T.push(U.lightMapUv),T.push(U.aoMapUv),T.push(U.bumpMapUv),T.push(U.normalMapUv),T.push(U.displacementMapUv),T.push(U.emissiveMapUv),T.push(U.metalnessMapUv),T.push(U.roughnessMapUv),T.push(U.anisotropyMapUv),T.push(U.clearcoatMapUv),T.push(U.clearcoatNormalMapUv),T.push(U.clearcoatRoughnessMapUv),T.push(U.iridescenceMapUv),T.push(U.iridescenceThicknessMapUv),T.push(U.sheenColorMapUv),T.push(U.sheenRoughnessMapUv),T.push(U.specularMapUv),T.push(U.specularColorMapUv),T.push(U.specularIntensityMapUv),T.push(U.transmissionMapUv),T.push(U.thicknessMapUv),T.push(U.combine),T.push(U.fogExp2),T.push(U.sizeAttenuation),T.push(U.morphTargetsCount),T.push(U.morphAttributeCount),T.push(U.numSunLights),T.push(U.numDirLights),T.push(U.numPointLights),T.push(U.numSpotLights),T.push(U.numSpotLightMaps),T.push(U.numHemiLights),T.push(U.numRectAreaLights),T.push(U.numSunLightShadows),T.push(U.numDirLightShadows),T.push(U.numPointLightShadows),T.push(U.numSpotLightShadows),T.push(U.numSpotLightShadowsWithMaps),T.push(U.numLightProbes),T.push(U.shadowMapType),T.push(U.toneMapping),T.push(U.numClippingPlanes),T.push(U.numClipIntersection),T.push(U.depthPacking)}function C(T,U){u.disableAll(),U.instancing&&u.enable(0),U.instancingColor&&u.enable(1),U.instancingMorph&&u.enable(2),U.matcap&&u.enable(3),U.envMap&&u.enable(4),U.normalMapObjectSpace&&u.enable(5),U.normalMapTangentSpace&&u.enable(6),U.clearcoat&&u.enable(7),U.iridescence&&u.enable(8),U.alphaTest&&u.enable(9),U.vertexColors&&u.enable(10),U.vertexAlphas&&u.enable(11),U.vertexUv1s&&u.enable(12),U.vertexUv2s&&u.enable(13),U.vertexUv3s&&u.enable(14),U.vertexTangents&&u.enable(15),U.anisotropy&&u.enable(16),U.alphaHash&&u.enable(17),U.batching&&u.enable(18),U.dispersion&&u.enable(19),U.retroreflection&&u.enable(24),U.batchingColor&&u.enable(20),U.gradientMap&&u.enable(21),U.packedNormalMap&&u.enable(22),U.vertexNormals&&u.enable(23),T.push(u.mask),u.disableAll(),U.fog&&u.enable(0),U.useFog&&u.enable(1),U.flatShading&&u.enable(2),U.logarithmicDepthBuffer&&u.enable(3),U.reversedDepthBuffer&&u.enable(4),U.skinning&&u.enable(5),U.morphTargets&&u.enable(6),U.morphNormals&&u.enable(7),U.morphColors&&u.enable(8),U.premultipliedAlpha&&u.enable(9),U.shadowMapEnabled&&u.enable(10),U.doubleSided&&u.enable(11),U.flipSided&&u.enable(12),U.useDepthPacking&&u.enable(13),U.dithering&&u.enable(14),U.transmission&&u.enable(15),U.sheen&&u.enable(16),U.opaque&&u.enable(17),U.pointsUvs&&u.enable(18),U.decodeVideoTexture&&u.enable(19),U.decodeVideoTextureEmissive&&u.enable(20),U.alphaToCoverage&&u.enable(21),U.numLightProbeGrids>0&&u.enable(22),U.hasPositionAttribute&&u.enable(23),T.push(u.mask)}function P(T){const U=x[T.type];let B;if(U){const X=sa[U];B=K1.clone(X.uniforms)}else B=T.uniforms;return B}function A(T,U){let B=g.get(U);return B!==void 0?++B.usedTimes:(B=new U2(r,U,T,o),p.push(B),g.set(U,B)),B}function L(T){if(--T.usedTimes===0){const U=p.indexOf(T);p[U]=p[p.length-1],p.pop(),g.delete(T.cacheKey),T.destroy()}}function N(T){d.remove(T)}function I(){d.dispose()}return{getParameters:D,getProgramCacheKey:M,getUniforms:P,acquireProgram:A,releaseProgram:L,releaseShaderCache:N,programs:p,dispose:I}}function B2(){let r=new WeakMap;function t(u){return r.has(u)}function n(u){let d=r.get(u);return d===void 0&&(d={},r.set(u,d)),d}function a(u){r.delete(u)}function o(u,d,m){r.get(u)[d]=m}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:o,dispose:c}}function F2(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function N_(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function O_(){const r=[];let t=0;const n=[],a=[],o=[];function c(){t=0,n.length=0,a.length=0,o.length=0}function u(_){let x=0;return _.isInstancedMesh&&(x+=2),_.isSkinnedMesh&&(x+=1),x}function d(_,x,E,D,M,S){let C=r[t];return C===void 0?(C={id:_.id,object:_,geometry:x,material:E,materialVariant:u(_),groupOrder:D,renderOrder:_.renderOrder,z:M,group:S},r[t]=C):(C.id=_.id,C.object=_,C.geometry=x,C.material=E,C.materialVariant=u(_),C.groupOrder=D,C.renderOrder=_.renderOrder,C.z=M,C.group=S),t++,C}function m(_,x,E,D,M,S,C){C.reversedDepth===!0&&(M=-M);const P=d(_,x,E,D,M,S);E.transmission>0?a.push(P):E.transparent===!0?o.push(P):n.push(P)}function p(_,x,E,D,M,S){const C=d(_,x,E,D,M,S);E.transmission>0?a.unshift(C):E.transparent===!0?o.unshift(C):n.unshift(C)}function g(_,x){n.length>1&&n.sort(_||F2),a.length>1&&a.sort(x||N_),o.length>1&&o.sort(x||N_)}function v(){for(let _=t,x=r.length;_<x;_++){const E=r[_];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:m,unshift:p,finish:v,sort:g}}function H2(){let r=new WeakMap;function t(a,o){const c=r.get(a);let u;return c===void 0?(u=new O_,r.set(a,[u])):o>=c.length?(u=new O_,c.push(u)):u=c[o],u}function n(){r=new WeakMap}return{get:t,dispose:n}}function G2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new V,color:new pe};break;case"SpotLight":n={position:new V,direction:new V,color:new pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new pe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new pe,groundColor:new pe};break;case"RectAreaLight":n={color:new pe,position:new V,halfWidth:new V,halfHeight:new V};break}return r[t.id]=n,n}}}function V2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let k2=0;function X2(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function W2(r){const t=new G2,n=V2(),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)a.probe.push(new V);const o=new V,c=new je,u=new je;function d(p){let g=0,v=0,_=0;for(let q=0;q<9;q++)a.probe[q].set(0,0,0);let x=0,E=0,D=0,M=0,S=0,C=0,P=0,A=0,L=0,N=0,I=0,T=0,U=0,B=0;p.sort(X2);for(let q=0,K=p.length;q<K;q++){const H=p[q],Q=H.color,F=H.intensity,k=H.distance;let lt=null;if(H.shadow&&H.shadow.map&&(H.shadow.map.texture.format===ir?lt=H.shadow.map.texture:lt=H.shadow.map.depthTexture||H.shadow.map.texture),H.isAmbientLight)g+=Q.r*F,v+=Q.g*F,_+=Q.b*F;else if(H.isLightProbe){for(let et=0;et<9;et++)a.probe[et].addScaledVector(H.sh.coefficients[et],F);B++}else if(H.isSunLight){const et=t.get(H);if(et.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const ft=H.shadow,O=n.get(H);O.shadowIntensity=ft.intensity,O.shadowBias=ft.bias,O.shadowNormalBias=ft.normalBias,O.shadowRadius=ft.radius,O.shadowMapSize.copy(ft.mapSize).multiply(ft.getFrameExtents()),a.sunShadow[E]=O,a.sunShadowMap[E]=lt;const tt=ft.getViewportCount();for(let dt=0;dt<tt;dt++)a.sunShadowMatrix[D+dt]=ft.getMatrix(dt),a.sunShadowCascade[D+dt]=ft._cascadeData[dt];D+=tt,E++}a.sun[x]=et,x++}else if(H.isDirectionalLight){const et=t.get(H);if(et.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const ft=H.shadow,O=n.get(H);O.shadowIntensity=ft.intensity,O.shadowBias=ft.bias,O.shadowNormalBias=ft.normalBias,O.shadowRadius=ft.radius,O.shadowMapSize=ft.mapSize,a.directionalShadow[M]=O,a.directionalShadowMap[M]=lt,a.directionalShadowMatrix[M]=H.shadow.matrix,L++}a.directional[M]=et,M++}else if(H.isSpotLight){const et=t.get(H);et.position.setFromMatrixPosition(H.matrixWorld),et.color.copy(Q).multiplyScalar(F),et.distance=k,et.coneCos=Math.cos(H.angle),et.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),et.decay=H.decay,a.spot[C]=et;const ft=H.shadow;if(H.map&&(a.spotLightMap[T]=H.map,T++,ft.updateMatrices(H),H.castShadow&&U++),a.spotLightMatrix[C]=ft.matrix,H.castShadow){const O=n.get(H);O.shadowIntensity=ft.intensity,O.shadowBias=ft.bias,O.shadowNormalBias=ft.normalBias,O.shadowRadius=ft.radius,O.shadowMapSize=ft.mapSize,a.spotShadow[C]=O,a.spotShadowMap[C]=lt,I++}C++}else if(H.isRectAreaLight){const et=t.get(H);et.color.copy(Q).multiplyScalar(F),et.halfWidth.set(H.width*.5,0,0),et.halfHeight.set(0,H.height*.5,0),a.rectArea[P]=et,P++}else if(H.isPointLight){const et=t.get(H);if(et.color.copy(H.color).multiplyScalar(H.intensity),et.distance=H.distance,et.decay=H.decay,H.castShadow){const ft=H.shadow,O=n.get(H);O.shadowIntensity=ft.intensity,O.shadowBias=ft.bias,O.shadowNormalBias=ft.normalBias,O.shadowRadius=ft.radius,O.shadowMapSize=ft.mapSize,O.shadowCameraNear=ft.camera.near,O.shadowCameraFar=ft.camera.far,a.pointShadow[S]=O,a.pointShadowMap[S]=lt,a.pointShadowMatrix[S]=H.shadow.matrix,N++}a.point[S]=et,S++}else if(H.isHemisphereLight){const et=t.get(H);et.skyColor.copy(H.color).multiplyScalar(F),et.groundColor.copy(H.groundColor).multiplyScalar(F),a.hemi[A]=et,A++}}P>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Bt.LTC_FLOAT_1,a.rectAreaLTC2=Bt.LTC_FLOAT_2):(a.rectAreaLTC1=Bt.LTC_HALF_1,a.rectAreaLTC2=Bt.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=v,a.ambient[2]=_;const X=a.hash;(X.sunLength!==x||X.directionalLength!==M||X.pointLength!==S||X.spotLength!==C||X.rectAreaLength!==P||X.hemiLength!==A||X.numSunShadows!==E||X.numDirectionalShadows!==L||X.numPointShadows!==N||X.numSpotShadows!==I||X.numSpotMaps!==T||X.numLightProbes!==B)&&(a.sun.length=x,a.directional.length=M,a.spot.length=C,a.rectArea.length=P,a.point.length=S,a.hemi.length=A,a.sunShadow.length=E,a.sunShadowMap.length=E,a.sunShadowMatrix.length=D,a.sunShadowCascade.length=D,a.directionalShadow.length=L,a.directionalShadowMap.length=L,a.directionalShadowMatrix.length=L,a.pointShadow.length=N,a.pointShadowMap.length=N,a.pointShadowMatrix.length=N,a.spotShadow.length=I,a.spotShadowMap.length=I,a.spotLightMatrix.length=I+T-U,a.spotLightMap.length=T,a.numSpotLightShadowsWithMaps=U,a.numLightProbes=B,X.sunLength=x,X.directionalLength=M,X.pointLength=S,X.spotLength=C,X.rectAreaLength=P,X.hemiLength=A,X.numSunShadows=E,X.numDirectionalShadows=L,X.numPointShadows=N,X.numSpotShadows=I,X.numSpotMaps=T,X.numLightProbes=B,a.version=k2++)}function m(p,g){let v=0,_=0,x=0,E=0,D=0,M=0;const S=g.matrixWorldInverse;for(let C=0,P=p.length;C<P;C++){const A=p[C];if(A.isSunLight){const L=a.sun[v];L.direction.setFromMatrixPosition(A.matrixWorld),L.direction.transformDirection(S),v++}else if(A.isDirectionalLight){const L=a.directional[_];L.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),L.direction.sub(o),L.direction.transformDirection(S),_++}else if(A.isSpotLight){const L=a.spot[E];L.position.setFromMatrixPosition(A.matrixWorld),L.position.applyMatrix4(S),L.direction.setFromMatrixPosition(A.matrixWorld),o.setFromMatrixPosition(A.target.matrixWorld),L.direction.sub(o),L.direction.transformDirection(S),E++}else if(A.isRectAreaLight){const L=a.rectArea[D];L.position.setFromMatrixPosition(A.matrixWorld),L.position.applyMatrix4(S),u.identity(),c.copy(A.matrixWorld),c.premultiply(S),u.extractRotation(c),L.halfWidth.set(A.width*.5,0,0),L.halfHeight.set(0,A.height*.5,0),L.halfWidth.applyMatrix4(u),L.halfHeight.applyMatrix4(u),D++}else if(A.isPointLight){const L=a.point[x];L.position.setFromMatrixPosition(A.matrixWorld),L.position.applyMatrix4(S),x++}else if(A.isHemisphereLight){const L=a.hemi[M];L.direction.setFromMatrixPosition(A.matrixWorld),L.direction.transformDirection(S),M++}}}return{setup:d,setupView:m,state:a}}function P_(r){const t=new W2(r),n=[],a=[],o=[];function c(_){v.camera=_,n.length=0,a.length=0,o.length=0}function u(_){n.push(_)}function d(_){a.push(_)}function m(_){o.push(_)}function p(){t.setup(n)}function g(_){t.setupView(n,_)}const v={lightsArray:n,shadowsArray:a,lightProbeGridArray:o,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:v,setupLights:p,setupLightsView:g,pushLight:u,pushShadow:d,pushLightProbeGrid:m}}function q2(r){let t=new WeakMap;function n(o,c=0){const u=t.get(o);let d;return u===void 0?(d=new P_(r),t.set(o,[d])):c>=u.length?(d=new P_(r),u.push(d)):d=u[c],d}function a(){t=new WeakMap}return{get:n,dispose:a}}const Y2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Z2=`uniform sampler2D shadow_pass;
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
}`,K2=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],J2=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],I_=new je,ol=new V,yd=new V;function Q2(r,t,n){let a=new Lp;const o=new Wt,c=new Wt,u=new un,d=new $1,m=new tE,p={},g=n.maxTextureSize,v={[ws]:hi,[hi]:ws,[On]:On},_=new Qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:Y2,fragmentShader:Z2}),x=_.clone();x.defines.HORIZONTAL_PASS=1;const E=new Sn;E.setAttribute("position",new Ki(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const D=new Jt(E,_),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fl;let S=this.type;this.render=function(N,I,T){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||N.length===0)return;this.type===Yy&&(ce("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=fl);const U=r.getRenderTarget(),B=r.getActiveCubeFace(),X=r.getActiveMipmapLevel(),q=r.state;q.setBlending(Va),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const K=S!==this.type;K&&I.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(Q=>Q.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,Q=N.length;H<Q;H++){const F=N[H],k=F.shadow;if(k===void 0){ce("WebGLShadowMap:",F,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;o.copy(k.mapSize);const lt=k.getFrameExtents();o.multiply(lt),c.copy(k.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(c.x=Math.floor(g/lt.x),o.x=c.x*lt.x,k.mapSize.x=c.x),o.y>g&&(c.y=Math.floor(g/lt.y),o.y=c.y*lt.y,k.mapSize.y=c.y));const et=r.state.buffers.depth.getReversed();if(k.camera._reversedDepth=et,k.map===null||K===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===ll){if(F.isPointLight){ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Zi(o.x,o.y,{format:ir,type:ha,minFilter:jn,magFilter:jn,generateMipmaps:!1}),k.map.texture.name=F.name+".shadowMap",k.map.depthTexture=new bl(o.x,o.y,oa),k.map.depthTexture.name=F.name+".shadowMapDepth",k.map.depthTexture.format=Xa,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Wn,k.map.depthTexture.magFilter=Wn}else F.isPointLight?(k.map=new Ax(o.x),k.map.depthTexture=new m1(o.x,fa)):(k.map=new Zi(o.x,o.y),k.map.depthTexture=new bl(o.x,o.y,fa)),k.map.depthTexture.name=F.name+".shadowMap",k.map.depthTexture.format=Xa,this.type===fl?(k.map.depthTexture.compareFunction=et?Tp:bp,k.map.depthTexture.minFilter=jn,k.map.depthTexture.magFilter=jn):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Wn,k.map.depthTexture.magFilter=Wn);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==o.x||k.map.height!==o.y)&&k.map.setSize(o.x,o.y);const ft=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();F.isPointLight!==!0&&k.updateMatrices(F,T);for(let O=0;O<ft;O++){const tt=k.getCamera(O);if(F.isPointLight){const dt=k.camera,bt=k.matrix,Nt=F.distance||dt.far;Nt!==dt.far&&(dt.far=Nt,dt.updateProjectionMatrix()),ol.setFromMatrixPosition(F.matrixWorld),dt.position.copy(ol),yd.copy(dt.position),yd.add(K2[O]),dt.up.copy(J2[O]),dt.lookAt(yd),dt.updateMatrixWorld(),bt.makeTranslation(-ol.x,-ol.y,-ol.z),I_.multiplyMatrices(dt.projectionMatrix,dt.matrixWorldInverse),k._frustum.setFromProjectionMatrix(I_,dt.coordinateSystem,dt.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)r.setRenderTarget(k.map,O),r.clear();else{O===0&&(r.setRenderTarget(k.map),r.clear());const dt=k.getViewport(O);u.set(c.x*dt.x,c.y*dt.y,c.x*dt.z,c.y*dt.w),q.viewport(u)}a=k.getFrustum(O),A(I,T,tt,F,this.type)}k.isPointLightShadow!==!0&&this.type===ll&&C(k,T),k.needsUpdate=!1}S=this.type,M.needsUpdate=!1,r.setRenderTarget(U,B,X)};function C(N,I){const T=t.update(D);_.defines.VSM_SAMPLES!==N.blurSamples&&(_.defines.VSM_SAMPLES=N.blurSamples,x.defines.VSM_SAMPLES=N.blurSamples,_.needsUpdate=!0,x.needsUpdate=!0),N.mapPass===null?N.mapPass=new Zi(o.x,o.y,{format:ir,type:ha}):(N.mapPass.width!==N.map.width||N.mapPass.height!==N.map.height)&&N.mapPass.setSize(N.map.width,N.map.height),_.uniforms.shadow_pass.value=N.map.depthTexture,_.uniforms.resolution.value.set(N.map.width,N.map.height),_.uniforms.radius.value=N.radius,r.setRenderTarget(N.mapPass),r.clear(),r.renderBufferDirect(I,null,T,_,D,null),x.uniforms.shadow_pass.value=N.mapPass.texture,x.uniforms.resolution.value.set(N.map.width,N.map.height),x.uniforms.radius.value=N.radius,r.setRenderTarget(N.map),r.clear(),r.renderBufferDirect(I,null,T,x,D,null)}function P(N,I,T,U){let B=null;const X=T.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(X!==void 0)B=X;else if(B=T.isPointLight===!0?m:d,r.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const q=B.uuid,K=I.uuid;let H=p[q];H===void 0&&(H={},p[q]=H);let Q=H[K];Q===void 0&&(Q=B.clone(),H[K]=Q,I.addEventListener("dispose",L)),B=Q}if(B.visible=I.visible,B.wireframe=I.wireframe,U===ll?B.side=I.shadowSide!==null?I.shadowSide:I.side:B.side=I.shadowSide!==null?I.shadowSide:v[I.side],B.alphaMap=I.alphaMap,B.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,B.map=I.map,B.clipShadows=I.clipShadows,B.clippingPlanes=I.clippingPlanes,B.clipIntersection=I.clipIntersection,B.displacementMap=I.displacementMap,B.displacementScale=I.displacementScale,B.displacementBias=I.displacementBias,B.wireframeLinewidth=I.wireframeLinewidth,B.linewidth=I.linewidth,T.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const q=r.properties.get(B);q.light=T}return B}function A(N,I,T,U,B){if(N.visible===!1)return;if(N.layers.test(I.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&B===ll)&&(!N.frustumCulled||N.intersectsFrustum(a))){N.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,N.matrixWorld);const K=t.update(N),H=N.material;if(Array.isArray(H)){const Q=K.groups;for(let F=0,k=Q.length;F<k;F++){const lt=Q[F],et=H[lt.materialIndex];if(et&&et.visible){const ft=P(N,et,U,B);N.onBeforeShadow(r,N,I,T,K,ft,lt),r.renderBufferDirect(T,null,K,ft,N,lt),N.onAfterShadow(r,N,I,T,K,ft,lt)}}}else if(H.visible){const Q=P(N,H,U,B);N.onBeforeShadow(r,N,I,T,K,Q,null),r.renderBufferDirect(T,null,K,Q,N,null),N.onAfterShadow(r,N,I,T,K,Q,null)}}const q=N.children;for(let K=0,H=q.length;K<H;K++)A(q[K],I,T,U,B)}function L(N){N.target.removeEventListener("dispose",L);for(const T in p){const U=p[T],B=N.target.uuid;B in U&&(U[B].dispose(),delete U[B])}}}function j2(r,t){function n(){let Y=!1;const Ct=new un;let _t=null;const wt=new un(0,0,0,0);return{setMask:function(It){_t!==It&&!Y&&(r.colorMask(It,It,It,It),_t=It)},setLocked:function(It){Y=It},setClear:function(It,Mt,Yt,Zt,Ve){Ve===!0&&(It*=Zt,Mt*=Zt,Yt*=Zt),Ct.set(It,Mt,Yt,Zt),wt.equals(Ct)===!1&&(r.clearColor(It,Mt,Yt,Zt),wt.copy(Ct))},reset:function(){Y=!1,_t=null,wt.set(-1,0,0,0)}}}function a(){let Y=!1,Ct=!1,_t=null,wt=null,It=null;return{setReversed:function(Mt){if(Ct!==Mt){const Yt=t.get("EXT_clip_control");Mt?Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.ZERO_TO_ONE_EXT):Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.NEGATIVE_ONE_TO_ONE_EXT),Ct=Mt;const Zt=It;It=null,this.setClear(Zt)}},getReversed:function(){return Ct},setTest:function(Mt){Mt?vt(r.DEPTH_TEST):Rt(r.DEPTH_TEST)},setMask:function(Mt){_t!==Mt&&!Y&&(r.depthMask(Mt),_t=Mt)},setFunc:function(Mt){if(Ct&&(Mt=RM[Mt]),wt!==Mt){switch(Mt){case bd:r.depthFunc(r.NEVER);break;case Td:r.depthFunc(r.ALWAYS);break;case Ad:r.depthFunc(r.LESS);break;case xl:r.depthFunc(r.LEQUAL);break;case wd:r.depthFunc(r.EQUAL);break;case Rd:r.depthFunc(r.GEQUAL);break;case Cd:r.depthFunc(r.GREATER);break;case Dd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}wt=Mt}},setLocked:function(Mt){Y=Mt},setClear:function(Mt){It!==Mt&&(It=Mt,Ct&&(Mt=1-Mt),r.clearDepth(Mt))},reset:function(){Y=!1,_t=null,wt=null,It=null,Ct=!1}}}function o(){let Y=!1,Ct=null,_t=null,wt=null,It=null,Mt=null,Yt=null,Zt=null,Ve=null;return{setTest:function(Se){Y||(Se?vt(r.STENCIL_TEST):Rt(r.STENCIL_TEST))},setMask:function(Se){Ct!==Se&&!Y&&(r.stencilMask(Se),Ct=Se)},setFunc:function(Se,Fn,Hn){(_t!==Se||wt!==Fn||It!==Hn)&&(r.stencilFunc(Se,Fn,Hn),_t=Se,wt=Fn,It=Hn)},setOp:function(Se,Fn,Hn){(Mt!==Se||Yt!==Fn||Zt!==Hn)&&(r.stencilOp(Se,Fn,Hn),Mt=Se,Yt=Fn,Zt=Hn)},setLocked:function(Se){Y=Se},setClear:function(Se){Ve!==Se&&(r.clearStencil(Se),Ve=Se)},reset:function(){Y=!1,Ct=null,_t=null,wt=null,It=null,Mt=null,Yt=null,Zt=null,Ve=null}}}const c=new n,u=new a,d=new o,m=new WeakMap,p=new WeakMap;let g={},v={},_={},x=new WeakMap,E=[],D=null,M=!1,S=null,C=null,P=null,A=null,L=null,N=null,I=null,T=new pe(0,0,0),U=0,B=!1,X=null,q=null,K=null,H=null,Q=null;const F=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,lt=0;const et=r.getParameter(r.VERSION);et.indexOf("WebGL")!==-1?(lt=parseFloat(/^WebGL (\d)/.exec(et)[1]),k=lt>=1):et.indexOf("OpenGL ES")!==-1&&(lt=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),k=lt>=2);let ft=null,O={};const tt=r.getParameter(r.SCISSOR_BOX),dt=r.getParameter(r.VIEWPORT),bt=new un().fromArray(tt),Nt=new un().fromArray(dt);function Vt(Y,Ct,_t,wt){const It=new Uint8Array(4),Mt=r.createTexture();r.bindTexture(Y,Mt),r.texParameteri(Y,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Y,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Yt=0;Yt<_t;Yt++)Y===r.TEXTURE_3D||Y===r.TEXTURE_2D_ARRAY?r.texImage3D(Ct,0,r.RGBA,1,1,wt,0,r.RGBA,r.UNSIGNED_BYTE,It):r.texImage2D(Ct+Yt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,It);return Mt}const at={};at[r.TEXTURE_2D]=Vt(r.TEXTURE_2D,r.TEXTURE_2D,1),at[r.TEXTURE_CUBE_MAP]=Vt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[r.TEXTURE_2D_ARRAY]=Vt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),at[r.TEXTURE_3D]=Vt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),d.setClear(0),vt(r.DEPTH_TEST),u.setFunc(xl),se(!1),Pe(Rv),vt(r.CULL_FACE),Ee(Va);function vt(Y){g[Y]!==!0&&(r.enable(Y),g[Y]=!0)}function Rt(Y){g[Y]!==!1&&(r.disable(Y),g[Y]=!1)}function Kt(Y,Ct){return _[Y]!==Ct?(r.bindFramebuffer(Y,Ct),_[Y]=Ct,Y===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=Ct),Y===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=Ct),!0):!1}function Pt(Y,Ct){let _t=E,wt=!1;if(Y){_t=x.get(Ct),_t===void 0&&(_t=[],x.set(Ct,_t));const It=Y.textures;if(_t.length!==It.length||_t[0]!==r.COLOR_ATTACHMENT0){for(let Mt=0,Yt=It.length;Mt<Yt;Mt++)_t[Mt]=r.COLOR_ATTACHMENT0+Mt;_t.length=It.length,wt=!0}}else _t[0]!==r.BACK&&(_t[0]=r.BACK,wt=!0);wt&&r.drawBuffers(_t)}function ue(Y){return D!==Y?(r.useProgram(Y),D=Y,!0):!1}const $e={[jr]:r.FUNC_ADD,[Ky]:r.FUNC_SUBTRACT,[Jy]:r.FUNC_REVERSE_SUBTRACT};$e[Qy]=r.MIN,$e[jy]=r.MAX;const le={[$y]:r.ZERO,[tM]:r.ONE,[eM]:r.SRC_COLOR,[H_]:r.SRC_ALPHA,[oM]:r.SRC_ALPHA_SATURATE,[sM]:r.DST_COLOR,[iM]:r.DST_ALPHA,[nM]:r.ONE_MINUS_SRC_COLOR,[G_]:r.ONE_MINUS_SRC_ALPHA,[rM]:r.ONE_MINUS_DST_COLOR,[aM]:r.ONE_MINUS_DST_ALPHA,[lM]:r.CONSTANT_COLOR,[cM]:r.ONE_MINUS_CONSTANT_COLOR,[uM]:r.CONSTANT_ALPHA,[fM]:r.ONE_MINUS_CONSTANT_ALPHA};function Ee(Y,Ct,_t,wt,It,Mt,Yt,Zt,Ve,Se){if(Y===Va){M===!0&&(Rt(r.BLEND),M=!1);return}if(M===!1&&(vt(r.BLEND),M=!0),Y!==Zy){if(Y!==S||Se!==B){if((C!==jr||L!==jr)&&(r.blendEquation(r.FUNC_ADD),C=jr,L=jr),Se)switch(Y){case hl:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Cv:r.blendFunc(r.ONE,r.ONE);break;case Dv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Lv:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Oe("WebGLState: Invalid blending: ",Y);break}else switch(Y){case hl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Cv:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Dv:Oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Lv:Oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Oe("WebGLState: Invalid blending: ",Y);break}P=null,A=null,N=null,I=null,T.set(0,0,0),U=0,S=Y,B=Se}return}It=It||Ct,Mt=Mt||_t,Yt=Yt||wt,(Ct!==C||It!==L)&&(r.blendEquationSeparate($e[Ct],$e[It]),C=Ct,L=It),(_t!==P||wt!==A||Mt!==N||Yt!==I)&&(r.blendFuncSeparate(le[_t],le[wt],le[Mt],le[Yt]),P=_t,A=wt,N=Mt,I=Yt),(Zt.equals(T)===!1||Ve!==U)&&(r.blendColor(Zt.r,Zt.g,Zt.b,Ve),T.copy(Zt),U=Ve),S=Y,B=!1}function Le(Y,Ct){Y.side===On?Rt(r.CULL_FACE):vt(r.CULL_FACE);let _t=Y.side===hi;Ct&&(_t=!_t),se(_t),Y.blending===hl&&Y.transparent===!1?Ee(Va):Ee(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),u.setFunc(Y.depthFunc),u.setTest(Y.depthTest),u.setMask(Y.depthWrite),c.setMask(Y.colorWrite);const wt=Y.stencilWrite;d.setTest(wt),wt&&(d.setMask(Y.stencilWriteMask),d.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),d.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),mn(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?vt(r.SAMPLE_ALPHA_TO_COVERAGE):Rt(r.SAMPLE_ALPHA_TO_COVERAGE)}function se(Y){X!==Y&&(Y?r.frontFace(r.CW):r.frontFace(r.CCW),X=Y)}function Pe(Y){Y!==Wy?(vt(r.CULL_FACE),Y!==q&&(Y===Rv?r.cullFace(r.BACK):Y===qy?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Rt(r.CULL_FACE),q=Y}function tn(Y){Y!==K&&(k&&r.lineWidth(Y),K=Y)}function mn(Y,Ct,_t){Y?(vt(r.POLYGON_OFFSET_FILL),(H!==Ct||Q!==_t)&&(H=Ct,Q=_t,u.getReversed()&&(Ct=-Ct),r.polygonOffset(Ct,_t))):Rt(r.POLYGON_OFFSET_FILL)}function Fe(Y){Y?vt(r.SCISSOR_TEST):Rt(r.SCISSOR_TEST)}function sn(Y){Y===void 0&&(Y=r.TEXTURE0+F-1),ft!==Y&&(r.activeTexture(Y),ft=Y)}function J(Y,Ct,_t){_t===void 0&&(ft===null?_t=r.TEXTURE0+F-1:_t=ft);let wt=O[_t];wt===void 0&&(wt={type:void 0,texture:void 0},O[_t]=wt),(wt.type!==Y||wt.texture!==Ct)&&(ft!==_t&&(r.activeTexture(_t),ft=_t),r.bindTexture(Y,Ct||at[Y]),wt.type=Y,wt.texture=Ct)}function Ie(){const Y=O[ft];Y!==void 0&&Y.type!==void 0&&(r.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Ue(){try{r.compressedTexImage2D(...arguments)}catch(Y){Oe("WebGLState:",Y)}}function z(){try{r.compressedTexImage3D(...arguments)}catch(Y){Oe("WebGLState:",Y)}}function b(){try{r.texSubImage2D(...arguments)}catch(Y){Oe("WebGLState:",Y)}}function j(){try{r.texSubImage3D(...arguments)}catch(Y){Oe("WebGLState:",Y)}}function rt(){try{r.compressedTexSubImage2D(...arguments)}catch(Y){Oe("WebGLState:",Y)}}function mt(){try{r.compressedTexSubImage3D(...arguments)}catch(Y){Oe("WebGLState:",Y)}}function At(){try{r.texStorage2D(...arguments)}catch(Y){Oe("WebGLState:",Y)}}function Dt(){try{r.texStorage3D(...arguments)}catch(Y){Oe("WebGLState:",Y)}}function pt(){try{r.texImage2D(...arguments)}catch(Y){Oe("WebGLState:",Y)}}function gt(){try{r.texImage3D(...arguments)}catch(Y){Oe("WebGLState:",Y)}}function Tt(Y){return v[Y]!==void 0?v[Y]:r.getParameter(Y)}function Ft(Y,Ct){v[Y]!==Ct&&(r.pixelStorei(Y,Ct),v[Y]=Ct)}function Ut(Y){bt.equals(Y)===!1&&(r.scissor(Y.x,Y.y,Y.z,Y.w),bt.copy(Y))}function Lt(Y){Nt.equals(Y)===!1&&(r.viewport(Y.x,Y.y,Y.z,Y.w),Nt.copy(Y))}function te(Y,Ct){let _t=p.get(Ct);_t===void 0&&(_t=new WeakMap,p.set(Ct,_t));let wt=_t.get(Y);wt===void 0&&(wt=r.getUniformBlockIndex(Ct,Y.name),_t.set(Y,wt))}function ie(Y,Ct){const wt=p.get(Ct).get(Y);m.get(Ct)!==wt&&(r.uniformBlockBinding(Ct,wt,Y.__bindingPointIndex),m.set(Ct,wt))}function oe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),u.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),g={},v={},ft=null,O={},_={},x=new WeakMap,E=[],D=null,M=!1,S=null,C=null,P=null,A=null,L=null,N=null,I=null,T=new pe(0,0,0),U=0,B=!1,X=null,q=null,K=null,H=null,Q=null,bt.set(0,0,r.canvas.width,r.canvas.height),Nt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),u.reset(),d.reset()}return{buffers:{color:c,depth:u,stencil:d},enable:vt,disable:Rt,bindFramebuffer:Kt,drawBuffers:Pt,useProgram:ue,setBlending:Ee,setMaterial:Le,setFlipSided:se,setCullFace:Pe,setLineWidth:tn,setPolygonOffset:mn,setScissorTest:Fe,activeTexture:sn,bindTexture:J,unbindTexture:Ie,compressedTexImage2D:Ue,compressedTexImage3D:z,texImage2D:pt,texImage3D:gt,pixelStorei:Ft,getParameter:Tt,updateUBOMapping:te,uniformBlockBinding:ie,texStorage2D:At,texStorage3D:Dt,texSubImage2D:b,texSubImage3D:j,compressedTexSubImage2D:rt,compressedTexSubImage3D:mt,scissor:Ut,viewport:Lt,reset:oe}}function $2(r,t,n,a,o,c,u){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Wt,g=new WeakMap,v=new Set;let _;const x=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function D(z,b){return E?new OffscreenCanvas(z,b):El("canvas")}function M(z,b,j){let rt=1;const mt=Ue(z);if((mt.width>j||mt.height>j)&&(rt=j/Math.max(mt.width,mt.height)),rt<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const At=Math.floor(rt*mt.width),Dt=Math.floor(rt*mt.height);_===void 0&&(_=D(At,Dt));const pt=b?D(At,Dt):_;return pt.width=At,pt.height=Dt,pt.getContext("2d").drawImage(z,0,0,At,Dt),ce("WebGLRenderer: Texture has been resized from ("+mt.width+"x"+mt.height+") to ("+At+"x"+Dt+")."),pt}else return"data"in z&&ce("WebGLRenderer: Image in DataTexture is too big ("+mt.width+"x"+mt.height+")."),z;return z}function S(z){return z.generateMipmaps}function C(z){r.generateMipmap(z)}function P(z){return z.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?r.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function A(z,b,j,rt,mt,At=!1){if(z!==null){if(r[z]!==void 0)return r[z];ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let Dt;rt&&(Dt=t.get("EXT_texture_norm16"),Dt||ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let pt=b;if(b===r.RED&&(j===r.FLOAT&&(pt=r.R32F),j===r.HALF_FLOAT&&(pt=r.R16F),j===r.UNSIGNED_BYTE&&(pt=r.R8),j===r.UNSIGNED_SHORT&&Dt&&(pt=Dt.R16_EXT),j===r.SHORT&&Dt&&(pt=Dt.R16_SNORM_EXT)),b===r.RED_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.R8UI),j===r.UNSIGNED_SHORT&&(pt=r.R16UI),j===r.UNSIGNED_INT&&(pt=r.R32UI),j===r.BYTE&&(pt=r.R8I),j===r.SHORT&&(pt=r.R16I),j===r.INT&&(pt=r.R32I)),b===r.RG&&(j===r.FLOAT&&(pt=r.RG32F),j===r.HALF_FLOAT&&(pt=r.RG16F),j===r.UNSIGNED_BYTE&&(pt=r.RG8),j===r.UNSIGNED_SHORT&&Dt&&(pt=Dt.RG16_EXT),j===r.SHORT&&Dt&&(pt=Dt.RG16_SNORM_EXT)),b===r.RG_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.RG8UI),j===r.UNSIGNED_SHORT&&(pt=r.RG16UI),j===r.UNSIGNED_INT&&(pt=r.RG32UI),j===r.BYTE&&(pt=r.RG8I),j===r.SHORT&&(pt=r.RG16I),j===r.INT&&(pt=r.RG32I)),b===r.RGB_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.RGB8UI),j===r.UNSIGNED_SHORT&&(pt=r.RGB16UI),j===r.UNSIGNED_INT&&(pt=r.RGB32UI),j===r.BYTE&&(pt=r.RGB8I),j===r.SHORT&&(pt=r.RGB16I),j===r.INT&&(pt=r.RGB32I)),b===r.RGBA_INTEGER&&(j===r.UNSIGNED_BYTE&&(pt=r.RGBA8UI),j===r.UNSIGNED_SHORT&&(pt=r.RGBA16UI),j===r.UNSIGNED_INT&&(pt=r.RGBA32UI),j===r.BYTE&&(pt=r.RGBA8I),j===r.SHORT&&(pt=r.RGBA16I),j===r.INT&&(pt=r.RGBA32I)),b===r.RGB&&(j===r.UNSIGNED_SHORT&&Dt&&(pt=Dt.RGB16_EXT),j===r.SHORT&&Dt&&(pt=Dt.RGB16_SNORM_EXT),j===r.UNSIGNED_INT_5_9_9_9_REV&&(pt=r.RGB9_E5),j===r.UNSIGNED_INT_10F_11F_11F_REV&&(pt=r.R11F_G11F_B10F)),b===r.RGBA){const gt=At?xu:De.getTransfer(mt);j===r.FLOAT&&(pt=r.RGBA32F),j===r.HALF_FLOAT&&(pt=r.RGBA16F),j===r.UNSIGNED_BYTE&&(pt=gt===We?r.SRGB8_ALPHA8:r.RGBA8),j===r.UNSIGNED_SHORT&&Dt&&(pt=Dt.RGBA16_EXT),j===r.SHORT&&Dt&&(pt=Dt.RGBA16_SNORM_EXT),j===r.UNSIGNED_SHORT_4_4_4_4&&(pt=r.RGBA4),j===r.UNSIGNED_SHORT_5_5_5_1&&(pt=r.RGB5_A1)}return(pt===r.R16F||pt===r.R32F||pt===r.RG16F||pt===r.RG32F||pt===r.RGBA16F||pt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),pt}function L(z,b){let j;return z?b===null||b===fa||b===yl?j=r.DEPTH24_STENCIL8:b===oa?j=r.DEPTH32F_STENCIL8:b===Sl&&(j=r.DEPTH24_STENCIL8,ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===fa||b===yl?j=r.DEPTH_COMPONENT24:b===oa?j=r.DEPTH_COMPONENT32F:b===Sl&&(j=r.DEPTH_COMPONENT16),j}function N(z,b){return S(z)===!0||z.isFramebufferTexture&&z.minFilter!==Wn&&z.minFilter!==jn?Math.log2(Math.max(b.width,b.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?b.mipmaps.length:1}function I(z){const b=z.target;b.removeEventListener("dispose",I),U(b),b.isVideoTexture&&g.delete(b),b.isHTMLTexture&&v.delete(b)}function T(z){const b=z.target;b.removeEventListener("dispose",T),X(b)}function U(z){const b=a.get(z);if(b.__webglInit===void 0)return;const j=z.source,rt=x.get(j);if(rt){const mt=rt[b.__cacheKey];mt.usedTimes--,mt.usedTimes===0&&B(z),Object.keys(rt).length===0&&x.delete(j)}a.remove(z)}function B(z){const b=a.get(z);r.deleteTexture(b.__webglTexture);const j=z.source,rt=x.get(j);delete rt[b.__cacheKey],u.memory.textures--}function X(z){const b=a.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),a.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(b.__webglFramebuffer[rt]))for(let mt=0;mt<b.__webglFramebuffer[rt].length;mt++)r.deleteFramebuffer(b.__webglFramebuffer[rt][mt]);else r.deleteFramebuffer(b.__webglFramebuffer[rt]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[rt])}else{if(Array.isArray(b.__webglFramebuffer))for(let rt=0;rt<b.__webglFramebuffer.length;rt++)r.deleteFramebuffer(b.__webglFramebuffer[rt]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let rt=0;rt<b.__webglColorRenderbuffer.length;rt++)b.__webglColorRenderbuffer[rt]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[rt]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const j=z.textures;for(let rt=0,mt=j.length;rt<mt;rt++){const At=a.get(j[rt]);At.__webglTexture&&(r.deleteTexture(At.__webglTexture),u.memory.textures--),a.remove(j[rt])}a.remove(z)}let q=0;function K(){q=0}function H(){return q}function Q(z){q=z}function F(){const z=q;return z>=o.maxTextures&&ce("WebGLTextures: Trying to use "+(z+1)+" texture units while this GPU supports only "+o.maxTextures),q+=1,z}function k(z){const b=[];return b.push(z.wrapS),b.push(z.wrapT),b.push(z.wrapR||0),b.push(z.magFilter),b.push(z.minFilter),b.push(z.anisotropy),b.push(z.internalFormat),b.push(z.format),b.push(z.type),b.push(z.generateMipmaps),b.push(z.premultiplyAlpha),b.push(z.flipY),b.push(z.unpackAlignment),b.push(z.colorSpace),b.join()}function lt(z,b){const j=a.get(z);if(z.isVideoTexture&&J(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&j.__version!==z.version){const rt=z.image;if(rt===null)ce("WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)ce("WebGLRenderer: Texture marked for update but image is incomplete");else{Rt(j,z,b);return}}else z.isExternalTexture&&(j.__webglTexture=z.sourceTexture?z.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,j.__webglTexture,r.TEXTURE0+b)}function et(z,b){const j=a.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&j.__version!==z.version){Rt(j,z,b);return}else z.isExternalTexture&&(j.__webglTexture=z.sourceTexture?z.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,j.__webglTexture,r.TEXTURE0+b)}function ft(z,b){const j=a.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&j.__version!==z.version){Rt(j,z,b);return}n.bindTexture(r.TEXTURE_3D,j.__webglTexture,r.TEXTURE0+b)}function O(z,b){const j=a.get(z);if(z.isCubeDepthTexture!==!0&&z.version>0&&j.__version!==z.version){Kt(j,z,b);return}n.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture,r.TEXTURE0+b)}const tt={[ao]:r.REPEAT,[ra]:r.CLAMP_TO_EDGE,[Ld]:r.MIRRORED_REPEAT},dt={[Wn]:r.NEAREST,[pM]:r.NEAREST_MIPMAP_NEAREST,[Fc]:r.NEAREST_MIPMAP_LINEAR,[jn]:r.LINEAR,[Vh]:r.LINEAR_MIPMAP_NEAREST,[js]:r.LINEAR_MIPMAP_LINEAR},bt={[_M]:r.NEVER,[EM]:r.ALWAYS,[xM]:r.LESS,[bp]:r.LEQUAL,[SM]:r.EQUAL,[Tp]:r.GEQUAL,[yM]:r.GREATER,[MM]:r.NOTEQUAL};function Nt(z,b){if(b.type===oa&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===jn||b.magFilter===Vh||b.magFilter===Fc||b.magFilter===js||b.minFilter===jn||b.minFilter===Vh||b.minFilter===Fc||b.minFilter===js)&&ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(z,r.TEXTURE_WRAP_S,tt[b.wrapS]),r.texParameteri(z,r.TEXTURE_WRAP_T,tt[b.wrapT]),(z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY)&&r.texParameteri(z,r.TEXTURE_WRAP_R,tt[b.wrapR]),r.texParameteri(z,r.TEXTURE_MAG_FILTER,dt[b.magFilter]),r.texParameteri(z,r.TEXTURE_MIN_FILTER,dt[b.minFilter]),b.compareFunction&&(r.texParameteri(z,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(z,r.TEXTURE_COMPARE_FUNC,bt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Wn||b.minFilter!==Fc&&b.minFilter!==js||b.type===oa&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||a.get(b).__currentAnisotropy){const j=t.get("EXT_texture_filter_anisotropic");r.texParameterf(z,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,o.getMaxAnisotropy())),a.get(b).__currentAnisotropy=b.anisotropy}}}function Vt(z,b){let j=!1;z.__webglInit===void 0&&(z.__webglInit=!0,b.addEventListener("dispose",I));const rt=b.source;let mt=x.get(rt);mt===void 0&&(mt={},x.set(rt,mt));const At=k(b);if(At!==z.__cacheKey){mt[At]===void 0&&(mt[At]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,j=!0),mt[At].usedTimes++;const Dt=mt[z.__cacheKey];Dt!==void 0&&(mt[z.__cacheKey].usedTimes--,Dt.usedTimes===0&&B(b)),z.__cacheKey=At,z.__webglTexture=mt[At].texture}return j}function at(z,b,j){return Math.floor(Math.floor(z/j)/b)}function vt(z,b,j,rt){const At=z.updateRanges;if(At.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,b.width,b.height,j,rt,b.data);else{At.sort((Ft,Ut)=>Ft.start-Ut.start);let Dt=0;for(let Ft=1;Ft<At.length;Ft++){const Ut=At[Dt],Lt=At[Ft],te=Ut.start+Ut.count,ie=at(Lt.start,b.width,4),oe=at(Ut.start,b.width,4);Lt.start<=te+1&&ie===oe&&at(Lt.start+Lt.count-1,b.width,4)===ie?Ut.count=Math.max(Ut.count,Lt.start+Lt.count-Ut.start):(++Dt,At[Dt]=Lt)}At.length=Dt+1;const pt=n.getParameter(r.UNPACK_ROW_LENGTH),gt=n.getParameter(r.UNPACK_SKIP_PIXELS),Tt=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,b.width);for(let Ft=0,Ut=At.length;Ft<Ut;Ft++){const Lt=At[Ft],te=Math.floor(Lt.start/4),ie=Math.ceil(Lt.count/4),oe=te%b.width,Y=Math.floor(te/b.width),Ct=ie,_t=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,oe),n.pixelStorei(r.UNPACK_SKIP_ROWS,Y),n.texSubImage2D(r.TEXTURE_2D,0,oe,Y,Ct,_t,j,rt,b.data)}z.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,pt),n.pixelStorei(r.UNPACK_SKIP_PIXELS,gt),n.pixelStorei(r.UNPACK_SKIP_ROWS,Tt)}}function Rt(z,b,j){let rt=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(rt=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(rt=r.TEXTURE_3D);const mt=Vt(z,b),At=b.source;n.bindTexture(rt,z.__webglTexture,r.TEXTURE0+j);const Dt=a.get(At);if(At.version!==Dt.__version||mt===!0){if(n.activeTexture(r.TEXTURE0+j),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const _t=De.getPrimaries(De.workingColorSpace),wt=b.colorSpace===Ga?null:De.getPrimaries(b.colorSpace),It=b.colorSpace===Ga||_t===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,It)}n.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment);let gt=M(b.image,!1,o.maxTextureSize);gt=Ie(b,gt);const Tt=c.convert(b.format,b.colorSpace),Ft=c.convert(b.type);let Ut=A(b.internalFormat,Tt,Ft,b.normalized,b.colorSpace,b.isVideoTexture);Nt(rt,b);let Lt;const te=b.mipmaps,ie=b.isVideoTexture!==!0,oe=Dt.__version===void 0||mt===!0,Y=At.dataReady,Ct=N(b,gt);if(b.isDepthTexture)Ut=L(b.format===$s,b.type),oe&&(ie?n.texStorage2D(r.TEXTURE_2D,1,Ut,gt.width,gt.height):n.texImage2D(r.TEXTURE_2D,0,Ut,gt.width,gt.height,0,Tt,Ft,null));else if(b.isDataTexture)if(te.length>0){ie&&oe&&n.texStorage2D(r.TEXTURE_2D,Ct,Ut,te[0].width,te[0].height);for(let _t=0,wt=te.length;_t<wt;_t++)Lt=te[_t],ie?Y&&n.texSubImage2D(r.TEXTURE_2D,_t,0,0,Lt.width,Lt.height,Tt,Ft,Lt.data):n.texImage2D(r.TEXTURE_2D,_t,Ut,Lt.width,Lt.height,0,Tt,Ft,Lt.data);b.generateMipmaps=!1}else ie?(oe&&n.texStorage2D(r.TEXTURE_2D,Ct,Ut,gt.width,gt.height),Y&&vt(b,gt,Tt,Ft)):n.texImage2D(r.TEXTURE_2D,0,Ut,gt.width,gt.height,0,Tt,Ft,gt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){ie&&oe&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Ct,Ut,te[0].width,te[0].height,gt.depth);for(let _t=0,wt=te.length;_t<wt;_t++)if(Lt=te[_t],b.format!==Yi)if(Tt!==null)if(ie){if(Y)if(b.layerUpdates.size>0){const It=p_(Lt.width,Lt.height,b.format,b.type);for(const Mt of b.layerUpdates){const Yt=Lt.data.subarray(Mt*It/Lt.data.BYTES_PER_ELEMENT,(Mt+1)*It/Lt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,_t,0,0,Mt,Lt.width,Lt.height,1,Tt,Yt)}}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,_t,0,0,0,Lt.width,Lt.height,gt.depth,Tt,Lt.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,_t,Ut,Lt.width,Lt.height,gt.depth,0,Lt.data,0,0);else ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ie?Y&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,_t,0,0,0,Lt.width,Lt.height,gt.depth,Tt,Ft,Lt.data):n.texImage3D(r.TEXTURE_2D_ARRAY,_t,Ut,Lt.width,Lt.height,gt.depth,0,Tt,Ft,Lt.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{ie&&oe&&n.texStorage2D(r.TEXTURE_2D,Ct,Ut,te[0].width,te[0].height);for(let _t=0,wt=te.length;_t<wt;_t++)Lt=te[_t],b.format!==Yi?Tt!==null?ie?Y&&n.compressedTexSubImage2D(r.TEXTURE_2D,_t,0,0,Lt.width,Lt.height,Tt,Lt.data):n.compressedTexImage2D(r.TEXTURE_2D,_t,Ut,Lt.width,Lt.height,0,Lt.data):ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?Y&&n.texSubImage2D(r.TEXTURE_2D,_t,0,0,Lt.width,Lt.height,Tt,Ft,Lt.data):n.texImage2D(r.TEXTURE_2D,_t,Ut,Lt.width,Lt.height,0,Tt,Ft,Lt.data)}else if(b.isDataArrayTexture)if(ie){if(oe&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Ct,Ut,gt.width,gt.height,gt.depth),Y)if(b.layerUpdates.size>0){const _t=p_(gt.width,gt.height,b.format,b.type);for(const wt of b.layerUpdates){const It=gt.data.subarray(wt*_t/gt.data.BYTES_PER_ELEMENT,(wt+1)*_t/gt.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,wt,gt.width,gt.height,1,Tt,Ft,It)}b.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Tt,Ft,gt.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Ut,gt.width,gt.height,gt.depth,0,Tt,Ft,gt.data);else if(b.isData3DTexture)ie?(oe&&n.texStorage3D(r.TEXTURE_3D,Ct,Ut,gt.width,gt.height,gt.depth),Y&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Tt,Ft,gt.data)):n.texImage3D(r.TEXTURE_3D,0,Ut,gt.width,gt.height,gt.depth,0,Tt,Ft,gt.data);else if(b.isFramebufferTexture){if(oe)if(ie)n.texStorage2D(r.TEXTURE_2D,Ct,Ut,gt.width,gt.height);else{let _t=gt.width,wt=gt.height;for(let It=0;It<Ct;It++)n.texImage2D(r.TEXTURE_2D,It,Ut,_t,wt,0,Tt,Ft,null),_t>>=1,wt>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in r){const _t=r.canvas;if(_t.hasAttribute("layoutsubtree")||_t.setAttribute("layoutsubtree","true"),gt.parentNode!==_t){_t.appendChild(gt),v.add(b),_t.onpaint=wt=>{const It=wt.changedElements;for(const Mt of v)It.includes(Mt.image)&&(Mt.needsUpdate=!0)},_t.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,gt);else{const It=r.RGBA,Mt=r.RGBA,Yt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,It,Mt,Yt,gt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(te.length>0){if(ie&&oe){const _t=Ue(te[0]);n.texStorage2D(r.TEXTURE_2D,Ct,Ut,_t.width,_t.height)}for(let _t=0,wt=te.length;_t<wt;_t++)Lt=te[_t],ie?Y&&n.texSubImage2D(r.TEXTURE_2D,_t,0,0,Tt,Ft,Lt):n.texImage2D(r.TEXTURE_2D,_t,Ut,Tt,Ft,Lt);b.generateMipmaps=!1}else if(ie){if(oe){const _t=Ue(gt);n.texStorage2D(r.TEXTURE_2D,Ct,Ut,_t.width,_t.height)}Y&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Tt,Ft,gt)}else n.texImage2D(r.TEXTURE_2D,0,Ut,Tt,Ft,gt);S(b)&&C(rt),Dt.__version=At.version,b.onUpdate&&b.onUpdate(b)}z.__version=b.version}function Kt(z,b,j){if(b.image.length!==6)return;const rt=Vt(z,b),mt=b.source;n.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+j);const At=a.get(mt);if(mt.version!==At.__version||rt===!0){n.activeTexture(r.TEXTURE0+j);const Dt=De.getPrimaries(De.workingColorSpace),pt=b.colorSpace===Ga?null:De.getPrimaries(b.colorSpace),gt=b.colorSpace===Ga||Dt===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const Tt=b.isCompressedTexture||b.image[0].isCompressedTexture,Ft=b.image[0]&&b.image[0].isDataTexture,Ut=[];for(let Mt=0;Mt<6;Mt++)!Tt&&!Ft?Ut[Mt]=M(b.image[Mt],!0,o.maxCubemapSize):Ut[Mt]=Ft?b.image[Mt].image:b.image[Mt],Ut[Mt]=Ie(b,Ut[Mt]);const Lt=Ut[0],te=c.convert(b.format,b.colorSpace),ie=c.convert(b.type),oe=A(b.internalFormat,te,ie,b.normalized,b.colorSpace),Y=b.isVideoTexture!==!0,Ct=At.__version===void 0||rt===!0,_t=mt.dataReady;let wt=N(b,Lt);Nt(r.TEXTURE_CUBE_MAP,b);let It;if(Tt){Y&&Ct&&n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,oe,Lt.width,Lt.height);for(let Mt=0;Mt<6;Mt++){It=Ut[Mt].mipmaps;for(let Yt=0;Yt<It.length;Yt++){const Zt=It[Yt];b.format!==Yi?te!==null?Y?_t&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Yt,0,0,Zt.width,Zt.height,te,Zt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Yt,oe,Zt.width,Zt.height,0,Zt.data):ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?_t&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Yt,0,0,Zt.width,Zt.height,te,ie,Zt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Yt,oe,Zt.width,Zt.height,0,te,ie,Zt.data)}}}else{if(It=b.mipmaps,Y&&Ct){It.length>0&&wt++;const Mt=Ue(Ut[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,oe,Mt.width,Mt.height)}for(let Mt=0;Mt<6;Mt++)if(Ft){Y?_t&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,Ut[Mt].width,Ut[Mt].height,te,ie,Ut[Mt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,oe,Ut[Mt].width,Ut[Mt].height,0,te,ie,Ut[Mt].data);for(let Yt=0;Yt<It.length;Yt++){const Ve=It[Yt].image[Mt].image;Y?_t&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Yt+1,0,0,Ve.width,Ve.height,te,ie,Ve.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Yt+1,oe,Ve.width,Ve.height,0,te,ie,Ve.data)}}else{Y?_t&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,te,ie,Ut[Mt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,oe,te,ie,Ut[Mt]);for(let Yt=0;Yt<It.length;Yt++){const Zt=It[Yt];Y?_t&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Yt+1,0,0,te,ie,Zt.image[Mt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Yt+1,oe,te,ie,Zt.image[Mt])}}}S(b)&&C(r.TEXTURE_CUBE_MAP),At.__version=mt.version,b.onUpdate&&b.onUpdate(b)}z.__version=b.version}function Pt(z,b,j,rt,mt,At){const Dt=c.convert(j.format,j.colorSpace),pt=c.convert(j.type),gt=A(j.internalFormat,Dt,pt,j.normalized,j.colorSpace),Tt=a.get(b),Ft=a.get(j);if(Ft.__renderTarget=b,!Tt.__hasExternalTextures){const Ut=Math.max(1,b.width>>At),Lt=Math.max(1,b.height>>At);mt===r.TEXTURE_3D||mt===r.TEXTURE_2D_ARRAY?n.texImage3D(mt,At,gt,Ut,Lt,b.depth,0,Dt,pt,null):n.texImage2D(mt,At,gt,Ut,Lt,0,Dt,pt,null)}n.bindFramebuffer(r.FRAMEBUFFER,z),sn(b)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,rt,mt,Ft.__webglTexture,0,Fe(b)):(mt===r.TEXTURE_2D||mt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&mt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,rt,mt,Ft.__webglTexture,At),n.bindFramebuffer(r.FRAMEBUFFER,null)}function ue(z,b,j){if(r.bindRenderbuffer(r.RENDERBUFFER,z),b.depthBuffer){const rt=b.depthTexture,mt=rt&&rt.isDepthTexture?rt.type:null,At=L(b.stencilBuffer,mt),Dt=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;sn(b)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Fe(b),At,b.width,b.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,Fe(b),At,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,At,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Dt,r.RENDERBUFFER,z)}else{const rt=b.textures;for(let mt=0;mt<rt.length;mt++){const At=rt[mt],Dt=c.convert(At.format,At.colorSpace),pt=c.convert(At.type),gt=A(At.internalFormat,Dt,pt,At.normalized,At.colorSpace);sn(b)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Fe(b),gt,b.width,b.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,Fe(b),gt,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,gt,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function $e(z,b,j){const rt=b.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,z),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const mt=a.get(b.depthTexture);if(mt.__renderTarget=b,(!mt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),rt){if(mt.__webglInit===void 0&&(mt.__webglInit=!0,b.depthTexture.addEventListener("dispose",I)),mt.__webglTexture===void 0){mt.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,mt.__webglTexture),Nt(r.TEXTURE_CUBE_MAP,b.depthTexture);const Tt=c.convert(b.depthTexture.format),Ft=c.convert(b.depthTexture.type);let Ut;b.depthTexture.format===Xa?Ut=r.DEPTH_COMPONENT24:b.depthTexture.format===$s&&(Ut=r.DEPTH24_STENCIL8);for(let Lt=0;Lt<6;Lt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0,Ut,b.width,b.height,0,Tt,Ft,null)}}else lt(b.depthTexture,0);const At=mt.__webglTexture,Dt=Fe(b),pt=rt?r.TEXTURE_CUBE_MAP_POSITIVE_X+j:r.TEXTURE_2D,gt=b.depthTexture.format===$s?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(b.depthTexture.format===Xa)sn(b)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,gt,pt,At,0,Dt):r.framebufferTexture2D(r.FRAMEBUFFER,gt,pt,At,0);else if(b.depthTexture.format===$s)sn(b)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,gt,pt,At,0,Dt):r.framebufferTexture2D(r.FRAMEBUFFER,gt,pt,At,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function le(z){const b=a.get(z),j=z.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==z.depthTexture){const rt=z.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),rt){const mt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,rt.removeEventListener("dispose",mt)};rt.addEventListener("dispose",mt),b.__depthDisposeCallback=mt}b.__boundDepthTexture=rt}if(z.depthTexture&&!b.__autoAllocateDepthBuffer)if(j)for(let rt=0;rt<6;rt++)$e(b.__webglFramebuffer[rt],z,rt);else{const rt=z.texture.mipmaps;rt&&rt.length>0?$e(b.__webglFramebuffer[0],z,0):$e(b.__webglFramebuffer,z,0)}else if(j){b.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)if(n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[rt]),b.__webglDepthbuffer[rt]===void 0)b.__webglDepthbuffer[rt]=r.createRenderbuffer(),ue(b.__webglDepthbuffer[rt],z,!1);else{const mt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,At=b.__webglDepthbuffer[rt];r.bindRenderbuffer(r.RENDERBUFFER,At),r.framebufferRenderbuffer(r.FRAMEBUFFER,mt,r.RENDERBUFFER,At)}}else{const rt=z.texture.mipmaps;if(rt&&rt.length>0?n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),ue(b.__webglDepthbuffer,z,!1);else{const mt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,At=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,At),r.framebufferRenderbuffer(r.FRAMEBUFFER,mt,r.RENDERBUFFER,At)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ee(z,b,j){const rt=a.get(z);b!==void 0&&Pt(rt.__webglFramebuffer,z,z.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),j!==void 0&&le(z)}function Le(z){const b=z.texture,j=a.get(z),rt=a.get(b);z.addEventListener("dispose",T);const mt=z.textures,At=z.isWebGLCubeRenderTarget===!0,Dt=mt.length>1;if(Dt||(rt.__webglTexture===void 0&&(rt.__webglTexture=r.createTexture()),rt.__version=b.version,u.memory.textures++),At){j.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0){j.__webglFramebuffer[pt]=[];for(let gt=0;gt<b.mipmaps.length;gt++)j.__webglFramebuffer[pt][gt]=r.createFramebuffer()}else j.__webglFramebuffer[pt]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){j.__webglFramebuffer=[];for(let pt=0;pt<b.mipmaps.length;pt++)j.__webglFramebuffer[pt]=r.createFramebuffer()}else j.__webglFramebuffer=r.createFramebuffer();if(Dt)for(let pt=0,gt=mt.length;pt<gt;pt++){const Tt=a.get(mt[pt]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=r.createTexture(),u.memory.textures++)}if(z.samples>0&&sn(z)===!1){j.__webglMultisampledFramebuffer=r.createFramebuffer(),j.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let pt=0;pt<mt.length;pt++){const gt=mt[pt];j.__webglColorRenderbuffer[pt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,j.__webglColorRenderbuffer[pt]);const Tt=c.convert(gt.format,gt.colorSpace),Ft=c.convert(gt.type),Ut=A(gt.internalFormat,Tt,Ft,gt.normalized,gt.colorSpace,z.isXRRenderTarget===!0),Lt=Fe(z);r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,Ut,z.width,z.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pt,r.RENDERBUFFER,j.__webglColorRenderbuffer[pt])}r.bindRenderbuffer(r.RENDERBUFFER,null),z.depthBuffer&&(j.__webglDepthRenderbuffer=r.createRenderbuffer(),ue(j.__webglDepthRenderbuffer,z,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(At){n.bindTexture(r.TEXTURE_CUBE_MAP,rt.__webglTexture),Nt(r.TEXTURE_CUBE_MAP,b);for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0)for(let gt=0;gt<b.mipmaps.length;gt++)Pt(j.__webglFramebuffer[pt][gt],z,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,gt);else Pt(j.__webglFramebuffer[pt],z,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);S(b)&&C(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Dt){for(let pt=0,gt=mt.length;pt<gt;pt++){const Tt=mt[pt],Ft=a.get(Tt);let Ut=r.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Ut=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Ut,Ft.__webglTexture),Nt(Ut,Tt),Pt(j.__webglFramebuffer,z,Tt,r.COLOR_ATTACHMENT0+pt,Ut,0),S(Tt)&&C(Ut)}n.unbindTexture()}else{let pt=r.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(pt=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(pt,rt.__webglTexture),Nt(pt,b),b.mipmaps&&b.mipmaps.length>0)for(let gt=0;gt<b.mipmaps.length;gt++)Pt(j.__webglFramebuffer[gt],z,b,r.COLOR_ATTACHMENT0,pt,gt);else Pt(j.__webglFramebuffer,z,b,r.COLOR_ATTACHMENT0,pt,0);S(b)&&C(pt),n.unbindTexture()}z.depthBuffer&&le(z)}function se(z){const b=z.textures;for(let j=0,rt=b.length;j<rt;j++){const mt=b[j];if(S(mt)){const At=P(z),Dt=a.get(mt).__webglTexture;n.bindTexture(At,Dt),C(At),n.unbindTexture()}}}const Pe=[],tn=[];function mn(z){if(z.samples>0){if(sn(z)===!1){const b=z.textures,j=z.width,rt=z.height;let mt=r.COLOR_BUFFER_BIT;const At=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Dt=a.get(z),pt=b.length>1;if(pt)for(let Tt=0;Tt<b.length;Tt++)n.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer);const gt=z.texture.mipmaps;gt&&gt.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let Tt=0;Tt<b.length;Tt++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(mt|=r.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(mt|=r.STENCIL_BUFFER_BIT)),pt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Dt.__webglColorRenderbuffer[Tt]);const Ft=a.get(b[Tt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ft,0)}r.blitFramebuffer(0,0,j,rt,0,0,j,rt,mt,r.NEAREST),m===!0&&(Pe.length=0,tn.length=0,Pe.push(r.COLOR_ATTACHMENT0+Tt),z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&(Pe.push(At),tn.push(At),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,tn)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Pe))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let Tt=0;Tt<b.length;Tt++){n.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,Dt.__webglColorRenderbuffer[Tt]);const Ft=a.get(b[Tt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,Ft,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&m){const b=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function Fe(z){return Math.min(o.maxSamples,z.samples)}function sn(z){const b=a.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function J(z){const b=u.render.frame;g.get(z)!==b&&(g.set(z,b),z.update())}function Ie(z,b){const j=z.colorSpace,rt=z.format,mt=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||j!==_u&&j!==Ga&&(De.getTransfer(j)===We?(rt!==Yi||mt!==bi)&&ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Oe("WebGLTextures: Unsupported texture color space:",j)),b}function Ue(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(p.width=z.naturalWidth||z.width,p.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(p.width=z.displayWidth,p.height=z.displayHeight):(p.width=z.width,p.height=z.height),p}this.allocateTextureUnit=F,this.resetTextureUnits=K,this.getTextureUnits=H,this.setTextureUnits=Q,this.setTexture2D=lt,this.setTexture2DArray=et,this.setTexture3D=ft,this.setTextureCube=O,this.rebindTextures=Ee,this.setupRenderTarget=Le,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=mn,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=Pt,this.useMultisampledRTT=sn,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function t3(r,t){function n(a,o=Ga){let c;const u=De.getTransfer(o);if(a===bi)return r.UNSIGNED_BYTE;if(a===xp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===Sp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===j_)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===$_)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===J_)return r.BYTE;if(a===Q_)return r.SHORT;if(a===Sl)return r.UNSIGNED_SHORT;if(a===_p)return r.INT;if(a===fa)return r.UNSIGNED_INT;if(a===oa)return r.FLOAT;if(a===ha)return r.HALF_FLOAT;if(a===tx)return r.ALPHA;if(a===ex)return r.RGB;if(a===Yi)return r.RGBA;if(a===Xa)return r.DEPTH_COMPONENT;if(a===$s)return r.DEPTH_STENCIL;if(a===nx)return r.RED;if(a===yp)return r.RED_INTEGER;if(a===ir)return r.RG;if(a===Mp)return r.RG_INTEGER;if(a===Ep)return r.RGBA_INTEGER;if(a===fu||a===hu||a===du||a===pu)if(u===We)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===fu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===hu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===du)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===pu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===fu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===hu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===du)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===pu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Ud||a===Nd||a===Od||a===Pd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Ud)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Nd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Od)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Pd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Id||a===zd||a===Bd||a===Fd||a===Hd||a===gu||a===Gd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Id||a===zd)return u===We?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Bd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===Fd)return c.COMPRESSED_R11_EAC;if(a===Hd)return c.COMPRESSED_SIGNED_R11_EAC;if(a===gu)return c.COMPRESSED_RG11_EAC;if(a===Gd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===Vd||a===kd||a===Xd||a===Wd||a===qd||a===Yd||a===Zd||a===Kd||a===Jd||a===Qd||a===jd||a===$d||a===tp||a===ep)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Vd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===kd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Xd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Wd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===qd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Yd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Zd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Kd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Jd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===Qd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===jd)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===$d)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===tp)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===ep)return u===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===np||a===ip||a===ap)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===np)return u===We?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===ip)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===ap)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===sp||a===rp||a===vu||a===op)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===sp)return c.COMPRESSED_RED_RGTC1_EXT;if(a===rp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===vu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===op)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===yl?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const e3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,n3=`
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

}`;class i3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const a=new fx(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new Qi({vertexShader:e3,fragmentShader:n3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Jt(new ua(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class a3 extends sr{constructor(t,n){super();const a=this;let o=null,c=1,u=null,d="local-floor",m=1,p=null,g=null,v=null,_=null,x=null,E=null;const D=typeof XRWebGLBinding<"u",M=new i3,S={},C=n.getContextAttributes();let P=null,A=null;const L=[],N=[],I=new Wt;let T=null,U=null;const B=new Ei;B.viewport=new un;const X=new Ei;X.viewport=new un;const q=[B,X],K=new hE;let H=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(at){let vt=L[at];return vt===void 0&&(vt=new Kh,L[at]=vt),vt.getTargetRaySpace()},this.getControllerGrip=function(at){let vt=L[at];return vt===void 0&&(vt=new Kh,L[at]=vt),vt.getGripSpace()},this.getHand=function(at){let vt=L[at];return vt===void 0&&(vt=new Kh,L[at]=vt),vt.getHandSpace()};function F(at){const vt=N.indexOf(at.inputSource);if(vt===-1)return;const Rt=L[vt];Rt!==void 0&&(Rt.update(at.inputSource,at.frame,p||u),Rt.dispatchEvent({type:at.type,data:at.inputSource}))}function k(){o.removeEventListener("select",F),o.removeEventListener("selectstart",F),o.removeEventListener("selectend",F),o.removeEventListener("squeeze",F),o.removeEventListener("squeezestart",F),o.removeEventListener("squeezeend",F),o.removeEventListener("end",k),o.removeEventListener("inputsourceschange",lt);for(let at=0;at<L.length;at++){const vt=N[at];vt!==null&&(N[at]=null,L[at].disconnect(vt))}H=null,Q=null,M.reset();for(const at in S)delete S[at];if(t.setRenderTarget(P),x=null,_=null,v=null,o=null,A=null,Vt.stop(),a.isPresenting=!1,t.setPixelRatio(T),t.setSize(I.width,I.height,!1),U!==null){const at=U.camera;at.fov=U.fov,at.zoom=U.zoom,at.updateProjectionMatrix(),U=null}a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(at){c=at,a.isPresenting===!0&&ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(at){d=at,a.isPresenting===!0&&ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(at){p=at},this.getBaseLayer=function(){return _!==null?_:x},this.getBinding=function(){return v===null&&D&&(v=new XRWebGLBinding(o,n)),v},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(at){if(o=at,o!==null){if(P=t.getRenderTarget(),o.addEventListener("select",F),o.addEventListener("selectstart",F),o.addEventListener("selectend",F),o.addEventListener("squeeze",F),o.addEventListener("squeezestart",F),o.addEventListener("squeezeend",F),o.addEventListener("end",k),o.addEventListener("inputsourceschange",lt),C.xrCompatible!==!0&&await n.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(I),D&&"createProjectionLayer"in XRWebGLBinding.prototype){let Rt=null,Kt=null,Pt=null;C.depth&&(Pt=C.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Rt=C.stencil?$s:Xa,Kt=C.stencil?yl:fa);const ue={colorFormat:n.RGBA8,depthFormat:Pt,scaleFactor:c};v=this.getBinding(),_=v.createProjectionLayer(ue),o.updateRenderState({layers:[_]}),t.setPixelRatio(1),t.setSize(_.textureWidth,_.textureHeight,!1),A=new Zi(_.textureWidth,_.textureHeight,{format:Yi,type:bi,depthTexture:new bl(_.textureWidth,_.textureHeight,Kt,void 0,void 0,void 0,void 0,void 0,void 0,Rt),stencilBuffer:C.stencil,colorSpace:t.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1,storeMultisampledDepthBuffer:_.ignoreDepthValues===!1,storeMultisampledStencilBuffer:_.ignoreDepthValues===!1})}else{const Rt={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(o,n,Rt),o.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),A=new Zi(x.framebufferWidth,x.framebufferHeight,{format:Yi,type:bi,colorSpace:t.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(m),p=null,u=await o.requestReferenceSpace(d),Vt.setContext(o),Vt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function lt(at){for(let vt=0;vt<at.removed.length;vt++){const Rt=at.removed[vt],Kt=N.indexOf(Rt);Kt>=0&&(N[Kt]=null,L[Kt].disconnect(Rt))}for(let vt=0;vt<at.added.length;vt++){const Rt=at.added[vt];let Kt=N.indexOf(Rt);if(Kt===-1){for(let ue=0;ue<L.length;ue++)if(ue>=N.length){N.push(Rt),Kt=ue;break}else if(N[ue]===null){N[ue]=Rt,Kt=ue;break}if(Kt===-1)break}const Pt=L[Kt];Pt&&Pt.connect(Rt)}}const et=new V,ft=new V;function O(at,vt,Rt){et.setFromMatrixPosition(vt.matrixWorld),ft.setFromMatrixPosition(Rt.matrixWorld);const Kt=et.distanceTo(ft),Pt=vt.projectionMatrix.elements,ue=Rt.projectionMatrix.elements,$e=Pt[14]/(Pt[10]-1),le=Pt[14]/(Pt[10]+1),Ee=(Pt[9]+1)/Pt[5],Le=(Pt[9]-1)/Pt[5],se=(Pt[8]-1)/Pt[0],Pe=(ue[8]+1)/ue[0],tn=$e*se,mn=$e*Pe,Fe=Kt/(-se+Pe),sn=Fe*-se;if(vt.matrixWorld.decompose(at.position,at.quaternion,at.scale),at.translateX(sn),at.translateZ(Fe),at.matrixWorld.compose(at.position,at.quaternion,at.scale),at.matrixWorldInverse.copy(at.matrixWorld).invert(),Pt[10]===-1)at.projectionMatrix.copy(vt.projectionMatrix),at.projectionMatrixInverse.copy(vt.projectionMatrixInverse);else{const J=$e+Fe,Ie=le+Fe,Ue=tn-sn,z=mn+(Kt-sn),b=Ee*le/Ie*J,j=Le*le/Ie*J;at.projectionMatrix.makePerspective(Ue,z,b,j,J,Ie),at.projectionMatrixInverse.copy(at.projectionMatrix).invert()}}function tt(at,vt){vt===null?at.matrixWorld.copy(at.matrix):at.matrixWorld.multiplyMatrices(vt.matrixWorld,at.matrix),at.matrixWorldInverse.copy(at.matrixWorld).invert()}this.updateCamera=function(at){if(o===null)return;let vt=at.near,Rt=at.far;M.texture!==null&&(M.depthNear>0&&(vt=M.depthNear),M.depthFar>0&&(Rt=M.depthFar)),K.near=X.near=B.near=vt,K.far=X.far=B.far=Rt,(H!==K.near||Q!==K.far)&&(o.updateRenderState({depthNear:K.near,depthFar:K.far}),H=K.near,Q=K.far),K.layers.mask=at.layers.mask|6,B.layers.mask=K.layers.mask&-5,X.layers.mask=K.layers.mask&-3;const Kt=at.parent,Pt=K.cameras;tt(K,Kt);for(let ue=0;ue<Pt.length;ue++)tt(Pt[ue],Kt);Pt.length===2?O(K,B,X):K.projectionMatrix.copy(B.projectionMatrix),U===null&&at.isPerspectiveCamera&&(U={camera:at,fov:at.fov,zoom:at.zoom}),dt(at,K,Kt)};function dt(at,vt,Rt){Rt===null?at.matrix.copy(vt.matrixWorld):(at.matrix.copy(Rt.matrixWorld),at.matrix.invert(),at.matrix.multiply(vt.matrixWorld)),at.matrix.decompose(at.position,at.quaternion,at.scale),at.updateMatrixWorld(!0),at.projectionMatrix.copy(vt.projectionMatrix),at.projectionMatrixInverse.copy(vt.projectionMatrixInverse),at.isPerspectiveCamera&&(at.fov=so*2*Math.atan(1/at.projectionMatrix.elements[5]),at.zoom=1)}this.getCamera=function(){return K},this.getFoveation=function(){if(!(_===null&&x===null))return m},this.setFoveation=function(at){m=at,_!==null&&(_.fixedFoveation=at),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=at)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(K)},this.getCameraTexture=function(at){return S[at]};let bt=null;function Nt(at,vt){if(g=vt.getViewerPose(p||u),E=vt,g!==null){const Rt=g.views;x!==null&&(t.setRenderTargetFramebuffer(A,x.framebuffer),t.setRenderTarget(A));let Kt=!1;Rt.length!==K.cameras.length&&(K.cameras.length=0,Kt=!0);for(let le=0;le<Rt.length;le++){const Ee=Rt[le];let Le=null;if(x!==null)Le=x.getViewport(Ee);else{const Pe=v.getViewSubImage(_,Ee);Le=Pe.viewport,le===0&&(t.setRenderTargetTextures(A,Pe.colorTexture,Pe.depthStencilTexture),t.setRenderTarget(A))}let se=q[le];se===void 0&&(se=new Ei,se.layers.enable(le),se.viewport=new un,q[le]=se),se.matrix.fromArray(Ee.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(Ee.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(Le.x,Le.y,Le.width,Le.height),le===0&&(K.matrix.copy(se.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale)),Kt===!0&&K.cameras.push(se)}const Pt=o.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&D){v=a.getBinding();const le=v.getDepthInformation(Rt[0]);le&&le.isValid&&le.texture&&M.init(le,o.renderState)}if(Pt&&Pt.includes("camera-access")&&D){t.state.unbindTexture(),v=a.getBinding();for(let le=0;le<Rt.length;le++){const Ee=Rt[le].camera;if(Ee){let Le=S[Ee];Le||(Le=new fx,S[Ee]=Le);const se=v.getCameraImage(Ee);Le.sourceTexture=se}}}}for(let Rt=0;Rt<L.length;Rt++){const Kt=N[Rt],Pt=L[Rt];Kt!==null&&Pt!==void 0&&Pt.update(Kt,vt,p||u)}bt&&bt(at,vt),vt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:vt}),E=null}const Vt=new bx;Vt.setAnimationLoop(Nt),this.setAnimationLoop=function(at){bt=at},this.dispose=function(){}}}const s3=new je,Lx=new he;Lx.set(-1,0,0,0,1,0,0,0,1);function r3(r,t){function n(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function a(M,S){S.color.getRGB(M.fogColor.value,yx(r)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function o(M,S,C,P,A){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(M,S):S.isMeshLambertMaterial?(c(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(M,S),v(M,S)):S.isMeshPhongMaterial?(c(M,S),g(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(M,S),_(M,S),S.isMeshPhysicalMaterial&&x(M,S,A)):S.isMeshMatcapMaterial?(c(M,S),E(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),D(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(u(M,S),S.isLineDashedMaterial&&d(M,S)):S.isPointsMaterial?m(M,S,C,P):S.isSpriteMaterial?p(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,n(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,n(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===hi&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,n(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===hi&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,n(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,n(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,n(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const C=t.get(S),P=C.envMap,A=C.envMapRotation;P&&(M.envMap.value=P,M.envMapRotation.value.setFromMatrix4(s3.makeRotationFromEuler(A)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(Lx),M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,n(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,n(S.aoMap,M.aoMapTransform))}function u(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,n(S.map,M.mapTransform))}function d(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function m(M,S,C,P){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*C,M.scale.value=P*.5,S.map&&(M.map.value=S.map,n(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function p(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,n(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,n(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function g(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function v(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function _(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,n(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,n(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function x(M,S,C){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,n(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,n(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,n(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,n(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,n(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===hi&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.retroreflectivity>0&&(M.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,n(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,n(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=C.texture,M.transmissionSamplerSize.value.set(C.width,C.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,n(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,n(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,n(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,n(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,n(S.specularIntensityMap,M.specularIntensityMapTransform))}function E(M,S){S.matcap&&(M.matcap.value=S.matcap)}function D(M,S){const C=t.get(S).light;M.referencePosition.value.setFromMatrixPosition(C.matrixWorld),M.nearDistance.value=C.shadow.camera.near,M.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function o3(r,t,n,a){let o={},c={},u=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(A,L){const N=L.program;a.uniformBlockBinding(A,N)}function p(A,L){let N=o[A.id];N===void 0&&(M(A),N=g(A),o[A.id]=N,A.addEventListener("dispose",C));const I=L.program;a.updateUBOMapping(A,I);const T=t.render.frame;c[A.id]!==T&&(_(A),c[A.id]=T)}function g(A){const L=v();A.__bindingPointIndex=L;const N=r.createBuffer(),I=A.__size,T=A.usage;return r.bindBuffer(r.UNIFORM_BUFFER,N),r.bufferData(r.UNIFORM_BUFFER,I,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,L,N),N}function v(){for(let A=0;A<d;A++)if(u.indexOf(A)===-1)return u.push(A),A;return Oe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(A){const L=o[A.id],N=A.uniforms,I=A.__cache;r.bindBuffer(r.UNIFORM_BUFFER,L);for(let T=0,U=N.length;T<U;T++){const B=N[T];if(Array.isArray(B))for(let X=0,q=B.length;X<q;X++)x(B[X],T,X,I);else x(B,T,0,I)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(A,L,N,I){if(D(A,L,N,I)===!0){const T=A.__offset,U=A.value;if(Array.isArray(U)){let B=0;for(let X=0;X<U.length;X++){const q=U[X],K=S(q);E(q,A.__data,B),typeof q!="number"&&typeof q!="boolean"&&!q.isMatrix3&&!ArrayBuffer.isView(q)&&(B+=K.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(U,A.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,T,A.__data)}}function E(A,L,N){typeof A=="number"||typeof A=="boolean"?L[0]=A:A.isMatrix3?(L[0]=A.elements[0],L[1]=A.elements[1],L[2]=A.elements[2],L[3]=0,L[4]=A.elements[3],L[5]=A.elements[4],L[6]=A.elements[5],L[7]=0,L[8]=A.elements[6],L[9]=A.elements[7],L[10]=A.elements[8],L[11]=0):ArrayBuffer.isView(A)?L.set(new A.constructor(A.buffer,A.byteOffset,L.length)):A.toArray(L,N)}function D(A,L,N,I){const T=A.value,U=L+"_"+N;if(I[U]===void 0)return typeof T=="number"||typeof T=="boolean"?I[U]=T:ArrayBuffer.isView(T)?I[U]=T.slice():I[U]=T.clone(),!0;{const B=I[U];if(typeof T=="number"||typeof T=="boolean"){if(B!==T)return I[U]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(B.equals(T)===!1)return B.copy(T),!0}}return!1}function M(A){const L=A.uniforms;let N=0;const I=16;for(let U=0,B=L.length;U<B;U++){const X=Array.isArray(L[U])?L[U]:[L[U]];for(let q=0,K=X.length;q<K;q++){const H=X[q],Q=Array.isArray(H.value)?H.value:[H.value];for(let F=0,k=Q.length;F<k;F++){const lt=Q[F],et=S(lt),ft=N%I,O=ft%et.boundary,tt=ft+O;N+=O,tt!==0&&I-tt<et.storage&&(N+=I-tt),H.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=N,N+=et.storage}}}const T=N%I;return T>0&&(N+=I-T),A.__size=N,A.__cache={},this}function S(A){const L={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(L.boundary=4,L.storage=4):A.isVector2?(L.boundary=8,L.storage=8):A.isVector3||A.isColor?(L.boundary=16,L.storage=12):A.isVector4?(L.boundary=16,L.storage=16):A.isMatrix3?(L.boundary=48,L.storage=48):A.isMatrix4?(L.boundary=64,L.storage=64):A.isTexture?ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(L.boundary=16,L.storage=A.byteLength):ce("WebGLRenderer: Unsupported uniform value type.",A),L}function C(A){const L=A.target;L.removeEventListener("dispose",C);const N=u.indexOf(L.__bindingPointIndex);u.splice(N,1),r.deleteBuffer(o[L.id]),delete o[L.id],delete c[L.id]}function P(){for(const A in o)r.deleteBuffer(o[A]);u=[],o={},c={}}return{bind:m,update:p,dispose:P}}const l3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let aa=null;function c3(){return aa===null&&(aa=new h1(l3,16,16,ir,ha),aa.name="DFG_LUT",aa.minFilter=jn,aa.magFilter=jn,aa.wrapS=ra,aa.wrapT=ra,aa.generateMipmaps=!1,aa.needsUpdate=!0),aa}class u3{constructor(t={}){const{canvas:n=AM(),context:a=null,depth:o=!0,stencil:c=!1,alpha:u=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:_=!1,outputBufferType:x=bi}=t;this.isWebGLRenderer=!0;let E;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=a.getContextAttributes().alpha}else E=u;const D=x,M=new Set([Ep,Mp,yp]),S=new Set([bi,fa,Sl,yl,xp,Sp]),C=new Uint32Array(4),P=new Int32Array(4),A=new V;let L=null,N=null;const I=[],T=[];let U=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ca,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const B=this;let X=!1,q=null,K=null,H=null,Q=null;this._outputColorSpace=si;let F=0,k=0,lt=null,et=-1,ft=null;const O=new un,tt=new un;let dt=null;const bt=new pe(0);let Nt=0,Vt=n.width,at=n.height,vt=1,Rt=null,Kt=null;const Pt=new un(0,0,Vt,at),ue=new un(0,0,Vt,at);let $e=!1;const le=new Lp;let Ee=!1,Le=!1;const se=new je,Pe=new V,tn=new un,mn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function sn(){return lt===null?vt:1}let J=a;function Ie(w,W){return n.getContext(w,W)}let Ue,z,b,j,rt,mt,At,Dt,pt,gt,Tt,Ft,Ut,Lt,te,ie,oe,Y,Ct,_t,wt,It,Mt;try{const w={alpha:!0,depth:o,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:v};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${gp}`),n.addEventListener("webglcontextlost",Ve,!1),n.addEventListener("webglcontextrestored",Se,!1),n.addEventListener("webglcontextcreationerror",Fn,!1),J===null){const W="webgl2";if(J=Ie(W,w),J===null)throw Ie(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Yt()}catch(w){throw n.removeEventListener("webglcontextlost",Ve,!1),n.removeEventListener("webglcontextrestored",Se,!1),n.removeEventListener("webglcontextcreationerror",Fn,!1),Oe("WebGLRenderer: "+w.message),w}function Yt(){Ue=new cA(J),Ue.init(),wt=new t3(J,Ue),z=new $T(J,Ue,t,wt),b=new j2(J,Ue),z.reversedDepthBuffer&&_&&b.buffers.depth.setReversed(!0),K=J.createFramebuffer(),H=J.createFramebuffer(),Q=J.createFramebuffer(),j=new hA(J),rt=new B2,mt=new $2(J,Ue,b,rt,z,wt,j),At=new lA(B),Dt=new pE(J),It=new QT(J,Dt),pt=new uA(J,Dt,j,It),gt=new pA(J,pt,Dt,It,j),Y=new dA(J,z,mt),te=new tA(rt),Tt=new z2(B,At,Ue,z,It,te),Ft=new r3(B,rt),Ut=new H2,Lt=new q2(Ue),oe=new JT(B,At,b,gt,E,m),ie=new Q2(B,gt,z),Mt=new o3(J,j,z,b),Ct=new jT(J,Ue,j),_t=new fA(J,Ue,j),j.programs=Tt.programs,B.capabilities=z,B.extensions=Ue,B.properties=rt,B.renderLists=Ut,B.shadowMap=ie,B.state=b,B.info=j}D!==bi&&(U=new gA(D,n.width,n.height,d,o,c));const Zt=new a3(B,J);this.xr=Zt,this.getContext=function(){return J},this.getContextAttributes=function(){return J.getContextAttributes()},this.forceContextLoss=function(){const w=Ue.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ue.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return vt},this.setPixelRatio=function(w){w!==void 0&&(vt=w,this.setSize(Vt,at,!1))},this.getSize=function(w){return w.set(Vt,at)},this.setSize=function(w,W,ut=!0){if(Zt.isPresenting){ce("WebGLRenderer: Can't change size while VR device is presenting.");return}Vt=w,at=W,n.width=Math.floor(w*vt),n.height=Math.floor(W*vt),ut===!0&&(n.style.width=w+"px",n.style.height=W+"px"),U!==null&&U.setSize(n.width,n.height),this.setViewport(0,0,w,W)},this.getDrawingBufferSize=function(w){return w.set(Vt*vt,at*vt).floor()},this.setDrawingBufferSize=function(w,W,ut){Vt=w,at=W,vt=ut,n.width=Math.floor(w*ut),n.height=Math.floor(W*ut),this.setViewport(0,0,w,W)},this.setEffects=function(w){if(D===bi){Oe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let W=0;W<w.length;W++)if(w[W].isOutputPass===!0){ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(O)},this.getViewport=function(w){return w.copy(Pt)},this.setViewport=function(w,W,ut,nt){w.isVector4?Pt.set(w.x,w.y,w.z,w.w):Pt.set(w,W,ut,nt),b.viewport(O.copy(Pt).multiplyScalar(vt).round())},this.getScissor=function(w){return w.copy(ue)},this.setScissor=function(w,W,ut,nt){w.isVector4?ue.set(w.x,w.y,w.z,w.w):ue.set(w,W,ut,nt),b.scissor(tt.copy(ue).multiplyScalar(vt).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(w){b.setScissorTest($e=w)},this.setOpaqueSort=function(w){Rt=w},this.setTransparentSort=function(w){Kt=w},this.getClearColor=function(w){return w.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor(...arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha(...arguments)},this.clear=function(w=!0,W=!0,ut=!0){let nt=0;if(w){let it=!1;if(lt!==null){const zt=lt.texture.format;it=M.has(zt)}if(it){const zt=lt.texture.type,kt=S.has(zt),Ot=oe.getClearColor(),Ht=oe.getClearAlpha(),Gt=Ot.r,de=Ot.g,ye=Ot.b;kt?(C[0]=Gt,C[1]=de,C[2]=ye,C[3]=Ht,J.clearBufferuiv(J.COLOR,0,C)):(P[0]=Gt,P[1]=de,P[2]=ye,P[3]=Ht,J.clearBufferiv(J.COLOR,0,P))}else nt|=J.COLOR_BUFFER_BIT}W&&(nt|=J.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ut&&(nt|=J.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),nt!==0&&J.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),q=w},this.dispose=function(){n.removeEventListener("webglcontextlost",Ve,!1),n.removeEventListener("webglcontextrestored",Se,!1),n.removeEventListener("webglcontextcreationerror",Fn,!1),oe.dispose(),Ut.dispose(),Lt.dispose(),rt.dispose(),At.dispose(),gt.dispose(),It.dispose(),Mt.dispose(),Tt.dispose(),Zt.dispose(),Zt.removeEventListener("sessionstart",on),Zt.removeEventListener("sessionend",yn),Yn.stop()};function Ve(w){w.preventDefault(),Ov("WebGLRenderer: Context Lost."),X=!0}function Se(){Ov("WebGLRenderer: Context Restored."),X=!1;const w=j.autoReset,W=ie.enabled,ut=ie.autoUpdate,nt=ie.needsUpdate,it=ie.type;Yt(),j.autoReset=w,ie.enabled=W,ie.autoUpdate=ut,ie.needsUpdate=nt,ie.type=it}function Fn(w){Oe("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Hn(w){const W=w.target;W.removeEventListener("dispose",Hn),pa(W)}function pa(w){Et(w),rt.remove(w)}function Et(w){const W=rt.get(w).programs;W!==void 0&&(W.forEach(function(ut){Tt.releaseProgram(ut)}),w.isShaderMaterial&&Tt.releaseShaderCache(w))}this.renderBufferDirect=function(w,W,ut,nt,it,zt){W===null&&(W=mn);const kt=it.isMesh&&it.matrixWorld.determinantAffine()<0,Ot=Ya(w,W,ut,nt,it);b.setMaterial(nt,kt);let Ht=ut.index,Gt=1;if(nt.wireframe===!0){if(Ht=pt.getWireframeAttribute(ut),Ht===void 0)return;Gt=2}const de=ut.drawRange,ye=ut.attributes.position;let Qt=de.start*Gt,Ne=(de.start+de.count)*Gt;zt!==null&&(Qt=Math.max(Qt,zt.start*Gt),Ne=Math.min(Ne,(zt.start+zt.count)*Gt)),Ht!==null?(Qt=Math.max(Qt,0),Ne=Math.min(Ne,Ht.count)):ye!=null&&(Qt=Math.max(Qt,0),Ne=Math.min(Ne,ye.count));const en=Ne-Qt;if(en<0||en===1/0)return;It.setup(it,nt,Ot,ut,Ht);let Je,ve=Ct;if(Ht!==null&&(Je=Dt.get(Ht),ve=_t,ve.setIndex(Je)),it.isMesh)nt.wireframe===!0?(b.setLineWidth(nt.wireframeLinewidth*sn()),ve.setMode(J.LINES)):ve.setMode(J.TRIANGLES);else if(it.isLine){let En=nt.linewidth;En===void 0&&(En=1),b.setLineWidth(En*sn()),it.isLineSegments?ve.setMode(J.LINES):it.isLineLoop?ve.setMode(J.LINE_LOOP):ve.setMode(J.LINE_STRIP)}else it.isPoints?ve.setMode(J.POINTS):it.isSprite&&ve.setMode(J.TRIANGLES);if(it.isBatchedMesh)if(Ue.get("WEBGL_multi_draw"))ve.renderMultiDraw(it._multiDrawStarts,it._multiDrawCounts,it._multiDrawCount);else{const En=it._multiDrawStarts,Xt=it._multiDrawCounts,Ln=it._multiDrawCount,_e=Ht?Dt.get(Ht).bytesPerElement:1,$n=rt.get(nt).currentProgram.getUniforms();for(let di=0;di<Ln;di++)$n.setValue(J,"_gl_DrawID",di),ve.render(En[di]/_e,Xt[di])}else if(it.isInstancedMesh)ve.renderInstances(Qt,en,it.count);else if(ut.isInstancedBufferGeometry){const En=ut._maxInstanceCount!==void 0?ut._maxInstanceCount:1/0,Xt=Math.min(ut.instanceCount,En);ve.renderInstances(Qt,en,Xt)}else ve.render(Qt,en)};function ne(w,W,ut,nt){q!==null&&w.isNodeMaterial&&q.setObject(nt,w),Ee===!0&&te.setState(w,ut,!1),w.transparent===!0&&w.side===On&&w.forceSinglePass===!1?(w.side=hi,w.needsUpdate=!0,qa(w,W,nt),w.side=ws,w.needsUpdate=!0,qa(w,W,nt),w.side=On):qa(w,W,nt)}this.compile=function(w,W,ut=null){ut===null&&(ut=w),q!==null&&q.renderStart(w,W,ut),N=Lt.get(ut),N.init(W),T.push(N),ut.traverseVisible(function(it){it.isLight&&it.layers.test(W.layers)&&(N.pushLight(it),it.castShadow&&N.pushShadow(it))}),w!==ut&&w.traverseVisible(function(it){it.isLight&&it.layers.test(W.layers)&&(N.pushLight(it),it.castShadow&&N.pushShadow(it))}),N.setupLights(),q!==null&&q.updateLights(N.state.lightsArray),Le=this.localClippingEnabled,Ee=te.init(this.clippingPlanes,Le),Ee===!0&&te.setGlobalState(this.clippingPlanes,W),q!==null&&ie.render(N.state.shadowsArray,ut,W);const nt=new Set;return w.traverse(function(it){if(!(it.isMesh||it.isPoints||it.isLine||it.isSprite))return;const zt=it.material;if(zt)if(Array.isArray(zt))for(let kt=0;kt<zt.length;kt++){const Ot=zt[kt];ne(Ot,ut,W,it),nt.add(Ot)}else ne(zt,ut,W,it),nt.add(zt)}),N=T.pop(),q!==null&&q.renderEnd(),nt},this.compileAsync=function(w,W,ut=null){const nt=this.compile(w,W,ut);return new Promise(it=>{function zt(){if(nt.forEach(function(kt){const Ht=rt.get(kt).currentProgram;(Ht===void 0||Ht.isReady())&&nt.delete(kt)}),nt.size===0){it(w);return}setTimeout(zt,10)}Ue.get("KHR_parallel_shader_compile")!==null?zt():setTimeout(zt,10)})};let rn=null;function hn(w){rn&&rn(w)}function on(){Yn.stop()}function yn(){Yn.start()}const Yn=new bx;Yn.setAnimationLoop(hn),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(w){rn=w,Zt.setAnimationLoop(w),w===null?Yn.stop():Yn.start()},Zt.addEventListener("sessionstart",on),Zt.addEventListener("sessionend",yn),this.render=function(w,W){if(W!==void 0&&W.isCamera!==!0){Oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(X===!0)return;q!==null&&q.renderStart(w,W);const ut=Zt.enabled===!0&&Zt.isPresenting===!0,nt=U!==null&&(lt===null||ut)&&U.begin(B,lt);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Zt.enabled===!0&&Zt.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(Zt.cameraAutoUpdate===!0&&Zt.updateCamera(W),W=Zt.getCamera()),w.isScene===!0&&w.onBeforeRender(B,w,W,lt),N=Lt.get(w,T.length),N.init(W),N.state.textureUnits=mt.getTextureUnits(),T.push(N),se.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),le.setFromProjectionMatrix(se,la,W.reversedDepth),Le=this.localClippingEnabled,Ee=te.init(this.clippingPlanes,Le),L=Ut.get(w,I.length),L.init(),I.push(L),Zt.enabled===!0&&Zt.isPresenting===!0){const kt=B.xr.getDepthSensingMesh();kt!==null&&Zn(kt,W,-1/0,B.sortObjects)}Zn(w,W,0,B.sortObjects),L.finish(),q!==null&&q.updateLights(N.state.lightsArray),B.sortObjects===!0&&L.sort(Rt,Kt),Fe=Zt.enabled===!1||Zt.isPresenting===!1||Zt.hasDepthSensing()===!1,Fe&&oe.addToRenderList(L,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ee===!0&&te.beginShadows();const it=N.state.shadowsArray;if(ie.render(it,w,W),Ee===!0&&te.endShadows(),(nt&&U.hasRenderPass())===!1){const kt=L.opaque,Ot=L.transmissive;if(N.setupLights(),W.isArrayCamera){const Ht=W.cameras;if(Ot.length>0)for(let Gt=0,de=Ht.length;Gt<de;Gt++){const ye=Ht[Gt];Cl(kt,Ot,w,ye)}Fe&&oe.render(w);for(let Gt=0,de=Ht.length;Gt<de;Gt++){const ye=Ht[Gt];ma(L,w,ye,ye.viewport)}}else Ot.length>0&&Cl(kt,Ot,w,W),Fe&&oe.render(w),ma(L,w,W)}lt!==null&&k===0&&(mt.updateMultisampleRenderTarget(lt),mt.updateRenderTargetMipmap(lt)),nt&&U.end(B),w.isScene===!0&&w.onAfterRender(B,w,W),It.resetDefaultState(),et=-1,ft=null,T.pop(),T.length>0?(N=T[T.length-1],mt.setTextureUnits(N.state.textureUnits),Ee===!0&&te.setGlobalState(B.clippingPlanes,N.state.camera)):N=null,I.pop(),I.length>0?L=I[I.length-1]:L=null,q!==null&&q.renderEnd()};function Zn(w,W,ut,nt){if(w.visible===!1)return;if(w.layers.test(W.layers)){if(w.isGroup)ut=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(W);else if(w.isLightProbeGrid)N.pushLightProbeGrid(w);else if(w.isLight)N.pushLight(w),w.castShadow&&N.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(le)){nt&&tn.setFromMatrixPosition(w.matrixWorld).applyMatrix4(se);const kt=gt.update(w),Ot=w.material;Ot.visible&&L.push(w,kt,Ot,ut,tn.z,null,W)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(le))){const kt=gt.update(w),Ot=w.material;if(nt&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),tn.copy(w.boundingSphere.center)):(kt.boundingSphere===null&&kt.computeBoundingSphere(),tn.copy(kt.boundingSphere.center)),tn.applyMatrix4(w.matrixWorld).applyMatrix4(se)),Array.isArray(Ot)){const Ht=kt.groups;for(let Gt=0,de=Ht.length;Gt<de;Gt++){const ye=Ht[Gt],Qt=Ot[ye.materialIndex];Qt&&Qt.visible&&L.push(w,kt,Qt,ut,tn.z,ye,W)}}else Ot.visible&&L.push(w,kt,Ot,ut,tn.z,null,W)}}const zt=w.children;for(let kt=0,Ot=zt.length;kt<Ot;kt++)Zn(zt[kt],W,ut,nt)}function ma(w,W,ut,nt){const{opaque:it,transmissive:zt,transparent:kt}=w;N.setupLightsView(ut),Ee===!0&&te.setGlobalState(B.clippingPlanes,ut),nt&&b.viewport(O.copy(nt)),it.length>0&&Cs(it,W,ut),zt.length>0&&Cs(zt,W,ut),kt.length>0&&Cs(kt,W,ut),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Cl(w,W,ut,nt){if((ut.isScene===!0?ut.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[nt.id]===void 0){const Qt=Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float");N.state.transmissionRenderTarget[nt.id]=new Zi(1,1,{generateMipmaps:!0,type:Qt?ha:bi,minFilter:js,samples:Math.max(4,z.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:De.workingColorSpace})}const zt=N.state.transmissionRenderTarget[nt.id],kt=nt.viewport||O;zt.setSize(kt.z*B.transmissionResolutionScale,kt.w*B.transmissionResolutionScale);const Ot=B.getRenderTarget(),Ht=B.getActiveCubeFace(),Gt=B.getActiveMipmapLevel();B.setRenderTarget(zt),B.getClearColor(bt),Nt=B.getClearAlpha(),Nt<1&&B.setClearColor(16777215,.5),B.clear(),Fe&&oe.render(ut);const de=B.toneMapping;B.toneMapping=ca;const ye=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),N.setupLightsView(nt),Ee===!0&&te.setGlobalState(B.clippingPlanes,nt),Cs(w,ut,nt),mt.updateMultisampleRenderTarget(zt),mt.updateRenderTargetMipmap(zt),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let Ne=0,en=W.length;Ne<en;Ne++){const Je=W[Ne],{object:ve,geometry:En,material:Xt,group:Ln}=Je;if(Xt.side===On&&ve.layers.test(nt.layers)){const _e=Xt.side;Xt.side=hi,Xt.needsUpdate=!0,Wa(ve,ut,nt,En,Xt,Ln),Xt.side=_e,Xt.needsUpdate=!0,Qt=!0}}Qt===!0&&(mt.updateMultisampleRenderTarget(zt),mt.updateRenderTargetMipmap(zt))}B.setRenderTarget(Ot,Ht,Gt),B.setClearColor(bt,Nt),ye!==void 0&&(nt.viewport=ye),B.toneMapping=de}function Cs(w,W,ut){const nt=W.isScene===!0?W.overrideMaterial:null;for(let it=0,zt=w.length;it<zt;it++){const kt=w[it],{object:Ot,geometry:Ht,group:Gt}=kt;let de=kt.material;de.allowOverride===!0&&nt!==null&&(de=nt),Ot.layers.test(ut.layers)&&Wa(Ot,W,ut,Ht,de,Gt)}}function Wa(w,W,ut,nt,it,zt){q!==null&&it.isNodeMaterial&&q.setObject(w,it),w.onBeforeRender(B,W,ut,nt,it,zt),w.modelViewMatrix.multiplyMatrices(ut.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),it.onBeforeRender(B,W,ut,nt,w,zt),it.transparent===!0&&it.side===On&&it.forceSinglePass===!1?(it.side=hi,it.needsUpdate=!0,B.renderBufferDirect(ut,W,nt,it,w,zt),it.side=ws,it.needsUpdate=!0,B.renderBufferDirect(ut,W,nt,it,w,zt),it.side=On):B.renderBufferDirect(ut,W,nt,it,w,zt),w.onAfterRender(B,W,ut,nt,it,zt)}function qa(w,W,ut){W.isScene!==!0&&(W=mn);const nt=rt.get(w),it=N.state.lights,zt=N.state.shadowsArray,kt=it.state.version,Ot=Tt.getParameters(w,it.state,zt,W,ut,N.state.lightProbeGridArray),Ht=Tt.getProgramCacheKey(Ot);let Gt=nt.programs;nt.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?W.environment:null,nt.fog=W.fog;const de=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;nt.envMap=At.get(w.envMap||nt.environment,de),nt.envMapRotation=nt.environment!==null&&w.envMap===null?W.environmentRotation:w.envMapRotation,Gt===void 0&&(w.addEventListener("dispose",Hn),Gt=new Map,nt.programs=Gt);let ye=Gt.get(Ht);if(ye!==void 0){if(nt.currentProgram===ye&&nt.lightsStateVersion===kt)return va(w,Ot),ye}else Ot.uniforms=Tt.getUniforms(w),q!==null&&w.isNodeMaterial&&q.build(w,ut,Ot),w.onBeforeCompile(Ot,B),ye=Tt.acquireProgram(Ot,Ht),Gt.set(Ht,ye),nt.uniforms=Ot.uniforms;const Qt=nt.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Qt.clippingPlanes=te.uniform),va(w,Ot),nt.needsLights=Dl(w),nt.lightsStateVersion=kt,nt.needsLights&&(Qt.ambientLightColor.value=it.state.ambient,Qt.lightProbe.value=it.state.probe,Qt.sunLights.value=it.state.sun,Qt.sunLightShadows.value=it.state.sunShadow,Qt.directionalLights.value=it.state.directional,Qt.directionalLightShadows.value=it.state.directionalShadow,Qt.spotLights.value=it.state.spot,Qt.spotLightShadows.value=it.state.spotShadow,Qt.rectAreaLights.value=it.state.rectArea,Qt.ltc_1.value=it.state.rectAreaLTC1,Qt.ltc_2.value=it.state.rectAreaLTC2,Qt.pointLights.value=it.state.point,Qt.pointLightShadows.value=it.state.pointShadow,Qt.hemisphereLights.value=it.state.hemi,Qt.sunShadowMatrix.value=it.state.sunShadowMatrix,Qt.sunShadowCascade.value=it.state.sunShadowCascade,Qt.directionalShadowMatrix.value=it.state.directionalShadowMatrix,Qt.spotLightMatrix.value=it.state.spotLightMatrix,Qt.spotLightMap.value=it.state.spotLightMap,Qt.pointShadowMatrix.value=it.state.pointShadowMatrix),nt.lightProbeGrid=N.state.lightProbeGridArray.length>0,nt.currentProgram=ye,nt.uniformsList=null,ye}function ga(w){if(w.uniformsList===null){const W=w.currentProgram.getUniforms();w.uniformsList=mu.seqWithValue(W.seq,w.uniforms)}return w.uniformsList}function va(w,W){const ut=rt.get(w);ut.outputColorSpace=W.outputColorSpace,ut.batching=W.batching,ut.batchingColor=W.batchingColor,ut.instancing=W.instancing,ut.instancingColor=W.instancingColor,ut.instancingMorph=W.instancingMorph,ut.skinning=W.skinning,ut.morphTargets=W.morphTargets,ut.morphNormals=W.morphNormals,ut.morphColors=W.morphColors,ut.morphTargetsCount=W.morphTargetsCount,ut.numClippingPlanes=W.numClippingPlanes,ut.numIntersection=W.numClipIntersection,ut.vertexAlphas=W.vertexAlphas,ut.vertexTangents=W.vertexTangents,ut.toneMapping=W.toneMapping}function Ds(w,W){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;A.setFromMatrixPosition(W.matrixWorld);for(let ut=0,nt=w.length;ut<nt;ut++){const it=w[ut];if(it.texture!==null&&it.boundingBox.containsPoint(A))return it}return null}function Ya(w,W,ut,nt,it){W.isScene!==!0&&(W=mn),mt.resetTextureUnits();const zt=W.fog,kt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial?W.environment:null,Ot=lt===null?B.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:De.workingColorSpace,Ht=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial&&!nt.envMap||nt.isMeshPhongMaterial&&!nt.envMap,Gt=At.get(nt.envMap||kt,Ht),de=nt.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,ye=!!ut.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Qt=!!ut.morphAttributes.position,Ne=!!ut.morphAttributes.normal,en=!!ut.morphAttributes.color;let Je=ca;nt.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(Je=B.toneMapping);const ve=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,En=ve!==void 0?ve.length:0,Xt=rt.get(nt),Ln=N.state.lights;if(Ee===!0&&(Le===!0||w!==ft)){const qe=w===ft&&nt.id===et;te.setState(nt,w,qe)}let _e=!1;nt.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==Ln.state.version||Xt.outputColorSpace!==Ot||it.isBatchedMesh&&Xt.batching===!1||!it.isBatchedMesh&&Xt.batching===!0||it.isBatchedMesh&&Xt.batchingColor===!0&&it._colorsTexture===null||it.isBatchedMesh&&Xt.batchingColor===!1&&it._colorsTexture!==null||it.isInstancedMesh&&Xt.instancing===!1||!it.isInstancedMesh&&Xt.instancing===!0||it.isSkinnedMesh&&Xt.skinning===!1||!it.isSkinnedMesh&&Xt.skinning===!0||it.isInstancedMesh&&Xt.instancingColor===!0&&it.instanceColor===null||it.isInstancedMesh&&Xt.instancingColor===!1&&it.instanceColor!==null||it.isInstancedMesh&&Xt.instancingMorph===!0&&it.morphTexture===null||it.isInstancedMesh&&Xt.instancingMorph===!1&&it.morphTexture!==null||Xt.envMap!==Gt||nt.fog===!0&&Xt.fog!==zt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==te.numPlanes||Xt.numIntersection!==te.numIntersection)||Xt.vertexAlphas!==de||Xt.vertexTangents!==ye||Xt.morphTargets!==Qt||Xt.morphNormals!==Ne||Xt.morphColors!==en||Xt.toneMapping!==Je||Xt.morphTargetsCount!==En||!!Xt.lightProbeGrid!=N.state.lightProbeGridArray.length>0)&&(_e=!0):(_e=!0,Xt.__version=nt.version);let $n=Xt.currentProgram;_e===!0&&($n=qa(nt,W,it),q&&nt.isNodeMaterial&&q.onUpdateProgram(nt,$n,Xt));let di=!1,ti=!1,Za=!1;const He=$n.getUniforms(),ln=Xt.uniforms;if(b.useProgram($n.program)&&(di=!0,ti=!0,Za=!0),nt.id!==et&&(et=nt.id,ti=!0),Xt.needsLights){const qe=Ds(N.state.lightProbeGridArray,it);Xt.lightProbeGrid!==qe&&(Xt.lightProbeGrid=qe,ti=!0)}if(di||ft!==w){b.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),He.setValue(J,"projectionMatrix",w.projectionMatrix),He.setValue(J,"viewMatrix",w.matrixWorldInverse);const ji=He.map.cameraPosition;ji!==void 0&&ji.setValue(J,Pe.setFromMatrixPosition(w.matrixWorld)),z.logarithmicDepthBuffer&&He.setValue(J,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&He.setValue(J,"isOrthographic",w.isOrthographicCamera===!0),ft!==w&&(ft=w,ti=!0,Za=!0)}if(Xt.needsLights&&(Ln.state.sunShadowMap.length>0&&He.setValue(J,"sunShadowMap",Ln.state.sunShadowMap,mt),Ln.state.directionalShadowMap.length>0&&He.setValue(J,"directionalShadowMap",Ln.state.directionalShadowMap,mt),Ln.state.spotShadowMap.length>0&&He.setValue(J,"spotShadowMap",Ln.state.spotShadowMap,mt),Ln.state.pointShadowMap.length>0&&He.setValue(J,"pointShadowMap",Ln.state.pointShadowMap,mt)),it.isSkinnedMesh){He.setOptional(J,it,"bindMatrix"),He.setOptional(J,it,"bindMatrixInverse");const qe=it.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),He.setValue(J,"boneTexture",qe.boneTexture,mt))}it.isBatchedMesh&&(He.setOptional(J,it,"batchingTexture"),He.setValue(J,"batchingTexture",it._matricesTexture,mt),He.setOptional(J,it,"batchingIdTexture"),He.setValue(J,"batchingIdTexture",it._indirectTexture,mt),He.setOptional(J,it,"batchingColorTexture"),it._colorsTexture!==null&&He.setValue(J,"batchingColorTexture",it._colorsTexture,mt));const Ti=ut.morphAttributes;if((Ti.position!==void 0||Ti.normal!==void 0||Ti.color!==void 0)&&Y.update(it,ut,$n),(ti||Xt.receiveShadow!==it.receiveShadow)&&(Xt.receiveShadow=it.receiveShadow,He.setValue(J,"receiveShadow",it.receiveShadow)),(nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial)&&nt.envMap===null&&W.environment!==null&&(ln.envMapIntensity.value=W.environmentIntensity),ln.dfgLUT!==void 0&&(ln.dfgLUT.value=c3()),ti){if(He.setValue(J,"toneMappingExposure",B.toneMappingExposure),Xt.needsLights&&Mn(ln,Za),zt&&nt.fog===!0&&Ft.refreshFogUniforms(ln,zt),Ft.refreshMaterialUniforms(ln,nt,vt,at,N.state.transmissionRenderTarget[w.id]),Xt.needsLights&&Xt.lightProbeGrid){const qe=Xt.lightProbeGrid;ln.probesSH.value=qe.texture,ln.probesMin.value.copy(qe.boundingBox.min),ln.probesMax.value.copy(qe.boundingBox.max),ln.probesResolution.value.copy(qe.resolution)}mu.upload(J,ga(Xt),ln,mt)}if(nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(mu.upload(J,ga(Xt),ln,mt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&He.setValue(J,"center",it.center),He.setValue(J,"modelViewMatrix",it.modelViewMatrix),He.setValue(J,"normalMatrix",it.normalMatrix),He.setValue(J,"modelMatrix",it.matrixWorld),nt.uniformsGroups!==void 0){const qe=nt.uniformsGroups;for(let ji=0,Bi=qe.length;ji<Bi;ji++){const Ai=qe[ji];Mt.update(Ai,$n),Mt.bind(Ai,$n)}}return $n}function Mn(w,W){w.ambientLightColor.needsUpdate=W,w.lightProbe.needsUpdate=W,w.sunLights.needsUpdate=W,w.sunLightShadows.needsUpdate=W,w.directionalLights.needsUpdate=W,w.directionalLightShadows.needsUpdate=W,w.pointLights.needsUpdate=W,w.pointLightShadows.needsUpdate=W,w.spotLights.needsUpdate=W,w.spotLightShadows.needsUpdate=W,w.rectAreaLights.needsUpdate=W,w.hemisphereLights.needsUpdate=W}function Dl(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return lt},this.setRenderTargetTextures=function(w,W,ut){const nt=rt.get(w);nt.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),rt.get(w.texture).__webglTexture=W,rt.get(w.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:ut,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,W){const ut=rt.get(w);ut.__webglFramebuffer=W,ut.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(w,W=0,ut=0){lt=w,F=W,k=ut;let nt=null,it=!1,zt=!1;if(w){const Ot=rt.get(w);if(Ot.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(J.FRAMEBUFFER,Ot.__webglFramebuffer),O.copy(w.viewport),tt.copy(w.scissor),dt=w.scissorTest,b.viewport(O),b.scissor(tt),b.setScissorTest(dt),et=-1;return}else if(Ot.__webglFramebuffer===void 0)mt.setupRenderTarget(w);else if(Ot.__hasExternalTextures)mt.rebindTextures(w,rt.get(w.texture).__webglTexture,rt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const de=w.depthTexture;if(Ot.__boundDepthTexture!==de){if(de!==null&&rt.has(de)&&(w.width!==de.image.width||w.height!==de.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");mt.setupDepthRenderbuffer(w)}}const Ht=w.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(zt=!0);const Gt=rt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Gt[W])?nt=Gt[W][ut]:nt=Gt[W],it=!0):w.samples>0&&mt.useMultisampledRTT(w)===!1?nt=rt.get(w).__webglMultisampledFramebuffer:Array.isArray(Gt)?nt=Gt[ut]:nt=Gt,O.copy(w.viewport),tt.copy(w.scissor),dt=w.scissorTest}else O.copy(Pt).multiplyScalar(vt).floor(),tt.copy(ue).multiplyScalar(vt).floor(),dt=$e;if(ut!==0&&(nt=K),b.bindFramebuffer(J.FRAMEBUFFER,nt)&&b.drawBuffers(w,nt),b.viewport(O),b.scissor(tt),b.setScissorTest(dt),it){const Ot=rt.get(w.texture);J.framebufferTexture2D(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ot.__webglTexture,ut)}else if(zt){const Ot=W;for(let Ht=0;Ht<w.textures.length;Ht++){const Gt=rt.get(w.textures[Ht]);J.framebufferTextureLayer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+Ht,Gt.__webglTexture,ut,Ot)}}else if(w!==null&&ut!==0){const Ot=rt.get(w.texture);J.framebufferTexture2D(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,Ot.__webglTexture,ut)}et=-1};function fo(w){const W=rt.get(w);return(W.__readFormat!==w.format||W.__readType!==w.type)&&(W.__readFormat=w.format,W.__readType=w.type,W.__formatReadable=z.textureFormatReadable(w.format),W.__typeReadable=z.textureTypeReadable(w.type)),W}this.readRenderTargetPixels=function(w,W,ut,nt,it,zt,kt,Ot=0){if(!(w&&w.isWebGLRenderTarget)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ht=rt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&kt!==void 0&&(Ht=Ht[kt]),Ht){b.bindFramebuffer(J.FRAMEBUFFER,Ht);try{const Gt=w.textures[Ot],de=Gt.format,ye=Gt.type;w.textures.length>1&&J.readBuffer(J.COLOR_ATTACHMENT0+Ot);const Qt=fo(Gt);if(Qt.__formatReadable===!1){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Qt.__typeReadable===!1){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=w.width-nt&&ut>=0&&ut<=w.height-it&&J.readPixels(W,ut,nt,it,wt.convert(de),wt.convert(ye),zt)}finally{const Gt=lt!==null?rt.get(lt).__webglFramebuffer:null;b.bindFramebuffer(J.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(w,W,ut,nt,it,zt,kt,Ot=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ht=rt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&kt!==void 0&&(Ht=Ht[kt]),Ht)if(W>=0&&W<=w.width-nt&&ut>=0&&ut<=w.height-it){b.bindFramebuffer(J.FRAMEBUFFER,Ht);const Gt=w.textures[Ot],de=Gt.format,ye=Gt.type;w.textures.length>1&&J.readBuffer(J.COLOR_ATTACHMENT0+Ot);const Qt=fo(Gt);if(Qt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Qt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ne=J.createBuffer();J.bindBuffer(J.PIXEL_PACK_BUFFER,Ne),J.bufferData(J.PIXEL_PACK_BUFFER,zt.byteLength,J.STREAM_READ),J.readPixels(W,ut,nt,it,wt.convert(de),wt.convert(ye),0),J.bindBuffer(J.PIXEL_PACK_BUFFER,null);const en=lt!==null?rt.get(lt).__webglFramebuffer:null;b.bindFramebuffer(J.FRAMEBUFFER,en);const Je=J.fenceSync(J.SYNC_GPU_COMMANDS_COMPLETE,0);return J.flush(),await wM(J,Je,4),J.bindBuffer(J.PIXEL_PACK_BUFFER,Ne),J.getBufferSubData(J.PIXEL_PACK_BUFFER,0,zt),J.bindBuffer(J.PIXEL_PACK_BUFFER,null),J.deleteBuffer(Ne),J.deleteSync(Je),zt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,W=null,ut=0){const nt=Math.pow(2,-ut),it=Math.floor(w.image.width*nt),zt=Math.floor(w.image.height*nt),kt=W!==null?W.x:0,Ot=W!==null?W.y:0;mt.setTexture2D(w,0),J.copyTexSubImage2D(J.TEXTURE_2D,ut,0,0,kt,Ot,it,zt),b.unbindTexture()},this.copyTextureToTexture=function(w,W,ut=null,nt=null,it=0,zt=0){let kt,Ot,Ht,Gt,de,ye,Qt,Ne,en;const Je=w.isCompressedTexture?w.mipmaps[zt]:w.image;if(ut!==null)kt=ut.max.x-ut.min.x,Ot=ut.max.y-ut.min.y,Ht=ut.isBox3?ut.max.z-ut.min.z:1,Gt=ut.min.x,de=ut.min.y,ye=ut.isBox3?ut.min.z:0;else{const ln=Math.pow(2,-it);kt=Math.floor(Je.width*ln),Ot=Math.floor(Je.height*ln),w.isDataArrayTexture?Ht=Je.depth:w.isData3DTexture?Ht=Math.floor(Je.depth*ln):Ht=1,Gt=0,de=0,ye=0}nt!==null?(Qt=nt.x,Ne=nt.y,en=nt.z):(Qt=0,Ne=0,en=0);const ve=wt.convert(W.format),En=wt.convert(W.type);let Xt;W.isData3DTexture?(mt.setTexture3D(W,0),Xt=J.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(mt.setTexture2DArray(W,0),Xt=J.TEXTURE_2D_ARRAY):(mt.setTexture2D(W,0),Xt=J.TEXTURE_2D),b.activeTexture(J.TEXTURE0),b.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,W.flipY),b.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),b.pixelStorei(J.UNPACK_ALIGNMENT,W.unpackAlignment);const Ln=b.getParameter(J.UNPACK_ROW_LENGTH),_e=b.getParameter(J.UNPACK_IMAGE_HEIGHT),$n=b.getParameter(J.UNPACK_SKIP_PIXELS),di=b.getParameter(J.UNPACK_SKIP_ROWS),ti=b.getParameter(J.UNPACK_SKIP_IMAGES);b.pixelStorei(J.UNPACK_ROW_LENGTH,Je.width),b.pixelStorei(J.UNPACK_IMAGE_HEIGHT,Je.height),b.pixelStorei(J.UNPACK_SKIP_PIXELS,Gt),b.pixelStorei(J.UNPACK_SKIP_ROWS,de),b.pixelStorei(J.UNPACK_SKIP_IMAGES,ye);const Za=w.isDataArrayTexture||w.isData3DTexture,He=W.isDataArrayTexture||W.isData3DTexture;if(w.isDepthTexture){const ln=rt.get(w),Ti=rt.get(W),qe=rt.get(ln.__renderTarget),ji=rt.get(Ti.__renderTarget);b.bindFramebuffer(J.READ_FRAMEBUFFER,qe.__webglFramebuffer),b.bindFramebuffer(J.DRAW_FRAMEBUFFER,ji.__webglFramebuffer);for(let Bi=0;Bi<Ht;Bi++)Za&&(J.framebufferTextureLayer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,rt.get(w).__webglTexture,it,ye+Bi),J.framebufferTextureLayer(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,rt.get(W).__webglTexture,zt,en+Bi)),J.blitFramebuffer(Gt,de,kt,Ot,Qt,Ne,kt,Ot,J.DEPTH_BUFFER_BIT,J.NEAREST);b.bindFramebuffer(J.READ_FRAMEBUFFER,null),b.bindFramebuffer(J.DRAW_FRAMEBUFFER,null)}else if(it!==0||w.isRenderTargetTexture||rt.has(w)){const ln=rt.get(w),Ti=rt.get(W);b.bindFramebuffer(J.READ_FRAMEBUFFER,H),b.bindFramebuffer(J.DRAW_FRAMEBUFFER,Q);for(let qe=0;qe<Ht;qe++)Za?J.framebufferTextureLayer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,ln.__webglTexture,it,ye+qe):J.framebufferTexture2D(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,ln.__webglTexture,it),He?J.framebufferTextureLayer(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,Ti.__webglTexture,zt,en+qe):J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,Ti.__webglTexture,zt),it!==0?J.blitFramebuffer(Gt,de,kt,Ot,Qt,Ne,kt,Ot,J.COLOR_BUFFER_BIT,J.NEAREST):He?J.copyTexSubImage3D(Xt,zt,Qt,Ne,en+qe,Gt,de,kt,Ot):J.copyTexSubImage2D(Xt,zt,Qt,Ne,Gt,de,kt,Ot);b.bindFramebuffer(J.READ_FRAMEBUFFER,null),b.bindFramebuffer(J.DRAW_FRAMEBUFFER,null)}else He?w.isDataTexture||w.isData3DTexture?J.texSubImage3D(Xt,zt,Qt,Ne,en,kt,Ot,Ht,ve,En,Je.data):W.isCompressedArrayTexture?J.compressedTexSubImage3D(Xt,zt,Qt,Ne,en,kt,Ot,Ht,ve,Je.data):J.texSubImage3D(Xt,zt,Qt,Ne,en,kt,Ot,Ht,ve,En,Je):w.isDataTexture?J.texSubImage2D(J.TEXTURE_2D,zt,Qt,Ne,kt,Ot,ve,En,Je.data):w.isCompressedTexture?J.compressedTexSubImage2D(J.TEXTURE_2D,zt,Qt,Ne,Je.width,Je.height,ve,Je.data):J.texSubImage2D(J.TEXTURE_2D,zt,Qt,Ne,kt,Ot,ve,En,Je);b.pixelStorei(J.UNPACK_ROW_LENGTH,Ln),b.pixelStorei(J.UNPACK_IMAGE_HEIGHT,_e),b.pixelStorei(J.UNPACK_SKIP_PIXELS,$n),b.pixelStorei(J.UNPACK_SKIP_ROWS,di),b.pixelStorei(J.UNPACK_SKIP_IMAGES,ti),zt===0&&W.generateMipmaps&&J.generateMipmap(Xt),b.unbindTexture()},this.initRenderTarget=function(w){rt.get(w).__webglFramebuffer===void 0&&mt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?mt.setTextureCube(w,0):w.isData3DTexture?mt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?mt.setTexture2DArray(w,0):mt.setTexture2D(w,0),b.unbindTexture()},this.resetState=function(){F=0,k=0,lt=null,b.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return la}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=De._getDrawingBufferColorSpace(t),n.unpackColorSpace=De._getUnpackColorSpace()}}const f3=new aE;function ni(r,t={}){const n=f3.load(r);return n.colorSpace=t.srgb===!1?Ga:si,n.anisotropy=8,t.repeat&&(n.wrapS=ao,n.wrapT=ao,n.repeat.set(t.repeat[0],t.repeat[1])),n}function h3(){return{earthDay:ni("assets/earth_day.png"),earthNight:ni("assets/earth_night.png"),earthClouds:ni("assets/earth_clouds.png",{srgb:!1}),wall:ni("assets/wall_panels.png",{repeat:[3,1]}),wallOuter:ni("assets/wall_panels.png",{repeat:[.6,.6]}),floor:ni("assets/floor_grate.png",{repeat:[10,4]}),bagFabric:ni("assets/fabric_bag.png"),towelFabric:ni("assets/fabric_towel.png"),desk:ni("assets/desk_top.png"),memo:ni("assets/memo_board.png"),book:ni("assets/book_pages.png"),net:ni("assets/net.png",{srgb:!1,repeat:[1,1]}),leaf:ni("assets/leaf.png",{srgb:!1}),blueprint:ni("assets/blueprint.png"),cable:ni("assets/cable_wrap.png",{repeat:[8,1]})}}const Cn={enamel:14211798,enamelDim:11054248,steel:10133668,darkSteel:4870229,frame:7304570,graphite:2830390,rubber:1909030,warmLight:16767400,plantLight:16747744,copper:12089930};function qt(r,t={}){return new Ii({color:r,roughness:.82,metalness:.05,...t})}const Ts=8,bs=Ts/2,_n=2,Md=1.35,d3=2.5,z_=.9,As=.14,Mu={x:1.3,y:1.05,radius:.75},B_=[{x:-3.05,y:1.15,radius:.27},{x:-1.75,y:1.15,radius:.27}];function F_(){const r=[];let t=0;const n=44;for(let c=0;c<=n;c++){const u=c/n*Md;c>0&&(t+=u-r[r.length-1].y),r.push({z:-_n,y:u,nz:-1,ny:0,arc:t})}const a=64,o=d3-Md;for(let c=1;c<=a;c++){const u=c/a*(Math.PI/2),d=-_n+z_*(1-Math.cos(u)),m=Md+o*Math.sin(u),p=r[r.length-1];t+=Math.hypot(d-p.z,m-p.y);const g=-o*Math.cos(u),v=z_*Math.sin(u),_=Math.hypot(g,v);r.push({z:d,y:m,nz:g/_,ny:v/_,arc:t})}return r}function p3(r,t,n,a){const o=[],c=[],u=[],d=[],m=r.length,p=(v,_,x,E,D,M,S,C)=>(o.push(v,x,_),c.push(E,D,M),u.push(S,C),o.length/3-1);for(let v=0;v<2;v++){const _=v===0?0:n,x=v===0?-1:1,E=o.length/3;for(let D=0;D<m;D++){const M=r[D];for(let S=0;S<=a;S++){const C=-bs+S/a*Ts,P=M.z+M.nz*_,A=M.y+M.ny*_,L=C/2.4,N=M.arc/2.4;p(C,P,A,0,M.ny*x,M.nz*x,L,N)}}for(let D=0;D<m-1;D++)for(let M=0;M<a;M++){const S=-bs+(M+.5)/a*Ts,C=r[D],P=r[D+1],A=(C.arc+P.arc)/2;let L=!1;for(const B of t)if(Math.hypot(S-B.x,A-B.y)<B.radius){L=!0;break}if(L)continue;const N=E+D*(a+1)+M,I=N+1,T=N+(a+1),U=T+1;v===0?d.push(N,I,T,I,U,T):d.push(N,T,I,I,T,U)}}const g=new Sn;return g.setAttribute("position",new Re(o,3)),g.setAttribute("normal",new Re(c,3)),g.setAttribute("uv",new Re(u,2)),g.setIndex(d),g}function m3(r,t,n,a,o){const c=[],u=[],d=[],m=[],p=[[t-n,a],[t+n,a],[t+n,a+o],[t-n,a+o]],g=r.findIndex(x=>x.ny>0);if(g<0)return new Sn;const v=[];for(let x=g;x<r.length;x++){const E=r[x];v.push(new V(p[0][0],E.y+E.ny*p[0][1],E.z+E.nz*p[0][1]),new V(p[1][0],E.y+E.ny*p[1][1],E.z+E.nz*p[1][1]),new V(p[2][0],E.y+E.ny*p[2][1],E.z+E.nz*p[2][1]),new V(p[3][0],E.y+E.ny*p[3][1],E.z+E.nz*p[3][1]))}for(let x=0;x<v.length/4-1;x++)for(let E=0;E<4;E++){const D=v[x*4+E],M=v[x*4+(E+1)%4],S=v[(x+1)*4+E],C=v[(x+1)*4+(E+1)%4],P=new V().subVectors(M,D).cross(new V().subVectors(S,D)).normalize();if(P.lengthSq()<.5)continue;const A=c.length/3;for(const L of[D,M,C,S])c.push(L.x,L.y,L.z),u.push(P.x,P.y,P.z),d.push(L.x/2.4,L.y/2.4);m.push(A,A+1,A+2,A+1,A+3,A+2)}const _=new Sn;return _.setAttribute("position",new Re(c,3)),_.setAttribute("normal",new Re(u,3)),_.setAttribute("uv",new Re(d,2)),_.setIndex(m),_}function g3(){const r=document.createElement("canvas");r.width=32,r.height=64;const t=r.getContext("2d"),n=[["#8f9599",6],["#d8cdb4",26],["#a8adb0",8],["#e2e3de",24]];let a=0;for(const[c,u]of n)t.fillStyle=c,t.fillRect(0,a,32,u),a+=u;t.strokeStyle="rgba(120,105,80,0.5)",t.lineWidth=1;for(let c=0;c<32;c+=6)t.beginPath(),t.moveTo(c,6),t.lineTo(c,32),t.stroke();const o=new ux(r);return o.colorSpace=si,o.wrapS=ao,o.wrapT=ra,o.repeat.set(1,1),o}function v3(r,t,n){const a=new Nn,o=new Jt(new xn(r,r,As+.02,32,1,!0),n.tunnel);o.rotation.x=Math.PI/2,o.position.z=-As/2,a.add(o);const c=new Jt(new zi(r+.045,.075,10,40),n.frame);a.add(c);const u=new Jt(new xn(r+.13,r+.13,.05,40,1,!0),n.frame);u.rotation.x=Math.PI/2,u.position.z=.03,a.add(u);const d=new xn(.022,.022,.04,6);for(let g=0;g<16;g++){const v=g/16*Math.PI*2,_=new Jt(d,n.frame);_.rotation.x=Math.PI/2,_.position.set(Math.cos(v)*(r+.115),Math.sin(v)*(r+.115),.05),a.add(_)}const m=new Jt(new xn(r+.1,r+.16,.09,32,1,!0),n.frame);m.rotation.x=Math.PI/2,m.position.z=-As-.03,a.add(m);const p=new Jt(new er(r-.005,40),new yu({color:10471128,transparent:!0,opacity:.07,roughness:.12,metalness:0,side:On,depthWrite:!1}));return p.position.z=-As*.5,a.add(p),{group:a,aperture:p,tunnel:o}}function _3(r){const t=new Nn,n=F_(),a=[Mu,...B_],o=p3(n,a,As,256),c=qt(11843766,{map:r.wall,roughness:.74,metalness:.08,side:ws}),u=qt(6120546,{map:r.wallOuter,roughness:.62,metalness:.18});o.clearGroups();const d=o.index.count/2;o.addGroup(0,d,0),o.addGroup(d,d,1);const m=new Jt(o,[c,u]);m.castShadow=!0,m.receiveShadow=!0,t.add(m);const p=g3(),g=qt(16777215,{map:p,roughness:.9,side:On}),v=n[n.length-1],_=new Jt(new ua(Ts,As),g);_.position.set(0,v.y+As/2,v.z+.002),_.castShadow=!0,_.receiveShadow=!0,t.add(_);const x=qt(9147030,{roughness:.46,metalness:.55});for(const K of[-3.1,-1.55,0,1.55,3.1]){const H=new Jt(m3(n,K,.07,As+.004,.055),x);H.castShadow=!0,H.receiveShadow=!0,t.add(H)}const E=qt(16777215,{map:r.floor,roughness:.66,metalness:.25}),D=new Jt(new Ji(Ts,.14,_n+.16),E);D.position.set(0,-.07,-_n/2+.08),D.receiveShadow=!0,D.castShadow=!0,t.add(D);const M=new Jt(new ua(Ts,.14),g);M.position.set(0,-.07,-_n/2+.08+(_n+.16)/2),t.add(M);const S=new Ii({color:4867647,emissive:new pe(Cn.warmLight),emissiveIntensity:.9,roughness:.4}),C=new Jt(new Ji(Ts-.4,.02,.11),S);C.position.set(0,.012,-_n*.48),t.add(C);const P=new Jt(new Ji(Ts-.3,.03,.2),qt(Cn.graphite,{roughness:.5,metalness:.4}));P.position.set(0,.005,-_n*.48),P.receiveShadow=!0,t.add(P);const A=[];for(let K=0;K<4;K++){const H=new _l(Cn.warmLight,3,7,2);H.position.set(-3+K*2,1.5,-_n*.48),t.add(H),A.push(H)}const L=qt(Cn.frame,{roughness:.5,metalness:.55}),N=qt(Cn.darkSteel,{roughness:.6,metalness:.35,side:On}),I=K=>{const H=v3(K.radius,r.wall,{frame:L,tunnel:N});H.group.position.set(K.x,K.y,-_n),t.add(H.group);const Q=new oE(16774370,0,16,.52,.06,1.5);return Q.position.set(K.x,K.y,-_n+.06),Q.castShadow=!0,Q.shadow.mapSize.set(1024,1024),Q.shadow.camera.near=.2,Q.shadow.camera.far=12,Q.shadow.bias=-.0016,Q.shadow.normalBias=.02,t.add(Q),t.add(Q.target),{group:H.group,centre:new V(K.x,K.y,-_n),normal:new V(0,0,-1),radius:K.radius,spot:Q}},T=I(Mu),U=B_.map(I),B=K=>{const H=new Nn,Q=new gx,F=F_();Q.moveTo(K*F[0].z,-.14);for(const tt of F)Q.lineTo(K*tt.z,tt.y);Q.lineTo(K*F[F.length-1].z,-.14),Q.closePath();const k=new Jt(new Ip(Q),qt(16777215,{map:r.wall,roughness:.76,metalness:.08,side:On}));k.rotation.y=K*-Math.PI/2,k.position.set(K*(bs-.01),0,0),k.receiveShadow=!0,H.add(k);const lt=new Jt(new xn(.62,.62,.1,32),qt(Cn.enamelDim,{roughness:.5,metalness:.35}));lt.rotation.z=Math.PI/2,lt.position.set(K*(bs-.06),1.15,-_n+.1),lt.castShadow=!0,H.add(lt);const et=new Jt(new zi(.66,.05,8,32),qt(Cn.frame,{roughness:.45,metalness:.6}));et.rotation.y=Math.PI/2,et.position.set(K*(bs-.04),1.15,-_n+.1),H.add(et);const ft=new Jt(new er(.16,24),new yu({color:660512,roughness:.1,metalness:.2,transparent:!0,opacity:.85}));ft.rotation.y=K*-Math.PI/2,ft.position.set(K*(bs-.005),1.15,-_n+.1),H.add(ft);const O=new Jt(new zi(.19,.028,8,24),qt(Cn.copper,{roughness:.45,metalness:.7}));O.rotation.y=Math.PI/2,O.position.set(K*(bs+.02),1.15,-_n+.1),H.add(O);for(let tt=0;tt<4;tt++){const dt=new Jt(new xn(.018,.018,.38,6),qt(Cn.copper,{roughness:.45,metalness:.7}));dt.rotation.set(0,0,tt/4*Math.PI),dt.rotation.y=Math.PI/2,dt.position.set(K*(bs+.02),1.15,-_n+.1),H.add(dt)}return H},X=B(-1),q=B(1);return t.add(X,q),{group:t,bigWindow:T,smallWindows:U,floorStrip:C,floorStripMaterial:S,stripLights:A,hatchLeft:X,hatchRight:q}}const x3=`
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`,S3=`
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform sampler2D uDay;
uniform sampler2D uNight;
uniform sampler2D uClouds;
uniform vec3 uSunDirection;
uniform vec3 uViewDirection;
uniform float uCloudOffset;
uniform float uAtmosphere;

void main() {
  vec3 normal = normalize(vNormal);
  float light = dot(normal, uSunDirection);

  /* The terminator is softened: a hard edge would look like a cut. */
  float day = smoothstep(-0.16, 0.18, light);

  vec3 dayColour = texture2D(uDay, vUv).rgb;
  vec3 nightColour = texture2D(uNight, vUv).rgb;
  vec3 surface = mix(nightColour, dayColour, day);

  /* The night side is not black: the cities are, and a little airglow. */
  surface += vec3(0.02, 0.035, 0.06) * (1.0 - day) * 0.35;

  /* Clouds, on their own slightly faster rotation. */
  vec4 cloud = texture2D(uClouds, vec2(vUv.x + uCloudOffset, vUv.y));
  vec3 cloudColour = vec3(0.95, 0.97, 1.0) * (0.05 + 0.95 * day);
  surface = mix(surface, cloudColour, cloud.a * 0.92);

  /* The limb of the planet: a blue atmosphere that catches the sun. */
  float facing = max(dot(normal, normalize(uViewDirection)), 0.0);
  float rim = pow(1.0 - facing, 3.2);
  float scatter = smoothstep(-0.45, 0.45, light);
  vec3 atmosphere = vec3(0.24, 0.52, 1.0) * rim * (0.25 + 1.5 * scatter) * uAtmosphere;
  /* A warm band right on the terminator. */
  float terminator = exp(-pow(light * 7.0, 2.0));
  atmosphere += vec3(1.0, 0.42, 0.16) * terminator * rim * 0.55 * uAtmosphere;

  gl_FragColor = vec4(surface + atmosphere, 1.0);
}
`;function y3(r,t){const n=new Qi({vertexShader:x3,fragmentShader:S3,uniforms:{uDay:{value:r.earthDay},uNight:{value:r.earthNight},uClouds:{value:r.earthClouds},uSunDirection:{value:new V(1,0,0)},uViewDirection:{value:new V(0,0,1)},uCloudOffset:{value:0},uAtmosphere:{value:1}}}),a=new Jt(new tr(t,64,48),n);a.rotation.z=Fa.degToRad(-23.4);const o=new Nn;return o.add(a),{group:o,material:n,centre:new V,radius:t}}class M3{canvas;texture;ctx;offset=0;constructor(t=512,n=320){this.canvas=document.createElement("canvas"),this.canvas.width=t,this.canvas.height=n,this.ctx=this.canvas.getContext("2d"),this.texture=new ux(this.canvas),this.texture.colorSpace=si}update(t){this.offset=(this.offset+t*26)%512;const n=this.ctx,a=this.canvas.width,o=this.canvas.height;n.fillStyle="#050d12",n.fillRect(0,0,a,o),n.strokeStyle="rgba(80,220,200,0.10)",n.lineWidth=1;for(let u=0;u<a;u+=32)n.beginPath(),n.moveTo(u,0),n.lineTo(u,o),n.stroke();for(let u=0;u<o;u+=32)n.beginPath(),n.moveTo(0,u),n.lineTo(a,u),n.stroke();const c=[{colour:"#3fe0c8",seed:1.3,amp:26,freq:.021},{colour:"#49b6ff",seed:4.1,amp:18,freq:.033},{colour:"#ffd166",seed:7.9,amp:12,freq:.047}];for(const u of c){n.strokeStyle=u.colour,n.lineWidth=1.6,n.beginPath();for(let d=0;d<=a;d+=2){const m=(d+this.offset)*u.freq+u.seed,p=o*.42+Math.sin(m)*u.amp+Math.sin(m*2.7+1.3)*u.amp*.45+Math.sin(m*6.1)*u.amp*.2;d===0?n.moveTo(d,p):n.lineTo(d,p)}n.stroke()}n.fillStyle="#9fe9dd",n.font="13px monospace",n.fillText("ORBIT  400.2 km   VEL  7.67 km/s",12,20),n.fillText("PITCH  -51.6   NODE  02:14   SUN  00:00",12,o-14),n.fillStyle="#3fe0c8",n.fillText("O2 96.4%   CO2 0.31%   P 101.3 kPa",12,40),n.fillStyle="#ff7b6b",n.fillText("GYRO DRIFT 0.0042",a-168,40),this.texture.needsUpdate=!0}}function jt(r,t,n){const a=new Jt(new Ji(...r),t);return a.position.set(...n),a.castShadow=!0,a.receiveShadow=!0,a}function Wi(r,t,n,a,o=16){const c=new Jt(new xn(r,r,t,o),n);return c.position.set(...a),c.castShadow=!0,c.receiveShadow=!0,c}function Es(r,t,n,a,o){const c=new Jt(new ua(t,n),new Ii({map:r,roughness:.85,metalness:0,side:On}));return c.position.set(...a),c.rotation.set(...o),c.receiveShadow=!0,c}function E3(r){const t=new Nn,n=[],a=[],o=[],c=qt(Cn.enamel,{roughness:.72,metalness:.12}),u=qt(Cn.steel,{roughness:.42,metalness:.68}),d=qt(Cn.graphite,{roughness:.55,metalness:.35}),m=qt(Cn.rubber,{roughness:.95,metalness:0}),p=qt(Cn.copper,{roughness:.38,metalness:.75}),g=-_n+.02,v=new Nn;v.position.set(-3.25,0,g+.12),t.add(v);const _=qt(16777215,{map:r.bagFabric,roughness:.92,metalness:0}),x=new Jt(new Up(.24,1.15,6,14),_);x.position.set(0,1.05,.3),x.rotation.z=Math.PI/2,x.rotation.y=.06,x.scale.set(1,1,.72),x.castShadow=!0,v.add(x);const E=new Jt(new er(.2,20),qt(1777702,{roughness:.95}));E.position.set(.62,1.05,.3),E.rotation.y=Math.PI/2,v.add(E);const D=new Jt(new tr(.16,12,10),qt(15262420,{roughness:.95}));D.position.set(.66,1.05,.3),D.scale.set(1.1,.7,.8),v.add(D);const M=new Jt(new Ji(.9,.012,.02),u);M.position.set(.15,1.19,.46),M.rotation.y=.06,v.add(M);const S=new Jt(new Ji(.05,.022,.012),p);S.position.set(.52,1.19,.46),v.add(S),v.add(jt([.5,.04,.04],u,[0,1.72,.16])),v.add(jt([.04,.6,.04],u,[-.2,1.42,.16])),v.add(jt([.04,.6,.04],u,[.2,1.42,.16]));const C=jt([.62,.78,.02],c,[.72,1.1,.06]);v.add(C);const P=Es(r.memo,.54,.54,[.72,1.12,.08],[0,0,0]);v.add(P);const A=new Jt(new xn(.012,.012,.36,8),u);A.position.set(-.42,1.62,.2),A.rotation.x=.5,v.add(A);const L=new Jt(new Su(.075,.1,14,1,!0),qt(9075292,{roughness:.5,metalness:.4,side:On}));L.position.set(-.42,1.47,.32),L.rotation.x=Math.PI+.5,v.add(L);const N=new Jt(new tr(.028,8,8),new Ii({color:16770749,emissive:new pe(16764810),emissiveIntensity:3.2}));N.position.set(-.42,1.45,.33),v.add(N);const I=new _l(16764810,1.6,3,2);I.position.set(-.42,1.42,.36),v.add(I),n.push({name:"Sleeping bay",object:v,position:new V(-3.25,1,-1.6)});const T=new Nn;T.position.set(-2.4,0,g+.3),t.add(T);const U=qt(Cn.steel,{roughness:.38,metalness:.72});for(let Et=0;Et<3;Et++){const ne=.42+Et*.42,rn=jt([1.12,.05,.34],U,[0,ne,0]);T.add(rn),T.add(jt([1.12,.06,.03],d,[0,ne+.03,.17])),T.add(jt([.03,.44,.03],U,[-.52,ne-.24,-.1])),T.add(jt([.03,.44,.03],U,[.52,ne-.24,-.1]));const hn=new Ii({map:r.leaf,transparent:!0,alphaTest:.35,side:On,roughness:.78});for(let on=0;on<5;on++){const yn=-.42+on*.21+Et%2*.05,Yn=Wi(.008,.1,qt(5077555,{roughness:.9}),[yn,ne+.07,0],6);T.add(Yn);for(let Zn=0;Zn<3;Zn++){const ma=new Jt(new ua(.2,.26),hn);ma.position.set(yn+(Zn-1)*.05,ne+.15+Zn*.03,(Zn-1)*.05),ma.rotation.set(-.5+Zn*.3,Zn*1.1,.2*(Zn-1)),ma.castShadow=!0,T.add(ma)}}}const B=new Nn;B.position.set(0,1.76,.06),T.add(B);const X=jt([1.06,.05,.08],d,[0,0,0]);B.add(X);const q=new Ii({color:16756976,emissive:new pe(Cn.plantLight),emissiveIntensity:1.9});for(let Et=0;Et<3;Et++){const ne=jt([.3,.02,.05],q,[-.34+Et*.34,-.035,0]);B.add(ne)}const K=new _l(Cn.plantLight,1.7,3,2);K.position.set(0,1.62,.14),T.add(K),n.push({name:"Plant corner",object:T,position:new V(-2.4,1,-1.6)});const H=new Nn;H.position.set(1.05,0,g+.42),t.add(H);const Q=jt([1.7,.04,.62],qt(16777215,{map:r.desk,roughness:.68,metalness:.05}),[0,.74,0]);H.add(Q),H.add(jt([1.7,.06,.05],u,[0,.7,-.29]));for(const Et of[-1,1])H.add(jt([.04,.72,.04],u,[Et*.8,.36,-.24])),H.add(jt([.04,.72,.04],u,[Et*.8,.36,.24])),H.add(jt([.03,.03,.5],u,[Et*.8,.16,0]));const F=jt([.4,.02,.3],d,[-.42,.77,.02]);H.add(F);const k=jt([.4,.28,.015],d,[-.42,.91,-.12]);k.rotation.x=-.22,H.add(k);const lt=new M3,et=new Jt(new ua(.37,.24),new Dp({map:lt.texture}));et.position.set(-.42,.913,-.105),et.rotation.x=-.22,H.add(et);const ft=new _l(8373480,.7,1.5,2);ft.position.set(-.42,.95,.05),H.add(ft);const O=new Jt(new zi(.04,.008,6,12),u);O.position.set(-.66,1.42,-.26),O.rotation.y=Math.PI/2,H.add(O);const tt=new Nn;tt.position.set(-.66,1.28,-.24),H.add(tt);const dt=new Jt(new zi(.11,.014,6,18,Math.PI),d);dt.rotation.y=Math.PI/2,tt.add(dt);for(const Et of[-1,1]){const ne=new Jt(new xn(.045,.045,.035,12),d);ne.rotation.z=Math.PI/2,ne.position.set(0,-.02,Et*.11),tt.add(ne)}const bt=Wi(.045,.19,qt(3099228,{roughness:.5,metalness:.3}),[.62,.86,.02],14);H.add(bt);const Nt=Wi(.048,.035,u,[.62,.97,.02],14);H.add(Nt);const Vt=jt([.14,.02,.03],qt(1973794,{roughness:1}),[.62,.9,-.03]);H.add(Vt),H.add(Wi(.045,.09,qt(14209732,{roughness:.7}),[.05,.805,.16],14)),H.add(jt([.2,.012,.28],qt(15262418,{roughness:.9}),[.36,.768,.14])),H.add(jt([.2,.012,.28],qt(14735556,{roughness:.9}),[.37,.782,.15]));const at=Es(r.blueprint,.62,.62,[.06,1.42,g+.09],[0,0,.04]);t.add(at);const vt=jt([.05,.02,.03],u,[.06,1.7,g+.12]);t.add(vt);const Rt=Es(r.blueprint,.42,.42,[-.45,1.34,g+.09],[0,0,-.06]);t.add(Rt),n.push({name:"Work station",object:H,position:new V(1.05,.9,-1.5)});const Kt=new Nn;Kt.position.set(1.3,0,g+1.05),Kt.rotation.y=-.1,t.add(Kt);const Pt=qt(Cn.steel,{roughness:.4,metalness:.7}),ue=qt(4016726,{roughness:.85});Kt.add(Wi(.16,.06,Pt,[0,.03,0],18)),Kt.add(Wi(.07,.42,Pt,[0,.25,0],12));const $e=jt([.56,.1,.52],ue,[0,.5,.04]);$e.rotation.x=-.22,Kt.add($e);const le=jt([.54,.72,.09],ue,[0,.86,-.28]);le.rotation.x=.28,Kt.add(le),Kt.add(jt([.3,.16,.08],ue,[0,1.24,-.38])),Kt.add(jt([.06,.7,.02],qt(2830904,{roughness:.9}),[0,.88,-.22]));for(const Et of[-1,1])Kt.add(jt([.06,.05,.46],Pt,[Et*.31,.68,0])),Kt.add(jt([.04,.22,.04],Pt,[Et*.31,.57,-.16]));const Ee=jt([.14,.03,.22],d,[.31,.72,.06]);Kt.add(Ee);const Le=[6553498,16757575,7328767,16740207];for(let Et=0;Et<4;Et++){const ne=new Jt(new er(.018,10),new Ii({color:Le[Et],emissive:new pe(Le[Et]),emissiveIntensity:2.4}));ne.rotation.x=-Math.PI/2,ne.position.set(.31,.737,-.01+Et*.05),Kt.add(ne)}o.push({mesh:Le.length?Kt.children[Kt.children.length-1]:new Jt,period:2.4,offset:0,colour:6553498}),n.push({name:"Window seat",object:Kt,position:new V(1.3,.7,-.9)});const se=new Nn;se.position.set(3.15,0,g+.55),se.rotation.y=.25,t.add(se);const Pe=qt(Cn.graphite,{roughness:.45,metalness:.55});se.add(jt([.52,.06,.12],Pe,[0,.05,.28])),se.add(jt([.52,.06,.12],Pe,[0,.05,-.28]));for(const Et of[-1,1])se.add(jt([.1,.04,.7],Pe,[Et*.2,.05,0]));const tn=Wi(.24,.16,qt(3752523,{roughness:.5,metalness:.4}),[0,.34,.06],20);tn.rotation.z=Math.PI/2,se.add(tn),se.add(Wi(.09,.18,u,[0,.34,.06],16).rotateZ(Math.PI/2));const mn=jt([.07,1,.07],Pe,[0,.6,-.26]);mn.rotation.x=-.2,se.add(mn);const Fe=new Jt(new xn(.022,.022,.52,10),u);Fe.rotation.z=Math.PI/2,Fe.position.set(0,1.08,-.36),se.add(Fe);for(const Et of[-1,1]){const ne=new Jt(new xn(.028,.028,.14,10),qt(2764596,{roughness:1}));ne.rotation.z=Math.PI/2,ne.position.set(Et*.19,1.08,-.36),se.add(ne)}const sn=jt([.11,.06,.3],m,[0,.72,.24]);se.add(sn);const J=Es(r.towelFabric,.42,.66,[3.15,1.42,g+.06],[0,0,.03]);J.material=new Ii({map:r.towelFabric,roughness:.98,side:On}),t.add(J),se.add(jt([.06,.05,.05],u,[0,1.72,-.28])),n.push({name:"Exercise bike",object:se,position:new V(3.15,.7,-1.4)});const Ie=new Ii({map:r.net,transparent:!0,alphaTest:.18,side:On,roughness:.9});for(let Et=0;Et<3;Et++){const ne=-.85+Et*.5,rn=new Jt(new ua(.44,.4),Ie);if(rn.position.set(ne,1.34,g+.05),t.add(rn),Et===0){const hn=jt([.14,.2,.08],qt(12169888,{roughness:.9}),[ne-.08,1.3,g+.09]);t.add(hn)}else if(Et===1){const hn=jt([.1,.1,.1],qt(12731706,{roughness:.6}),[ne+.08,1.32,g+.09]);t.add(hn)}else{const hn=jt([.05,.26,.03],u,[ne,1.3,g+.08]);t.add(hn)}}for(let Et=0;Et<2;Et++){const ne=jt([.3,.52,.05],qt(Et===0?5925756:9062972,{roughness:.95}),[-.2+Et*.42,1.48,g+.14]);t.add(ne)}const Ue=Wi(.075,.4,qt(11549226,{roughness:.45,metalness:.2}),[2.35,.62,g+.12],14);t.add(Ue),t.add(jt([.12,.1,.02],d,[2.35,.86,g+.12]));const z=jt([.28,.2,.1],qt(15263455,{roughness:.6}),[-1.35,1.5,g+.1]);t.add(z),t.add(jt([.1,.03,.01],qt(3111482,{roughness:.6}),[-1.35,1.5,g+.16])),t.add(jt([.03,.1,.01],qt(3111482,{roughness:.6}),[-1.35,1.5,g+.16]));const b=jt([.44,.3,.34],qt(4872786,{roughness:.8,metalness:.1}),[-.15,.15,-.52]);b.rotation.y=.18,t.add(b),t.add(jt([.46,.02,.05],u,[-.15,.3,-.52])),t.add(jt([.05,.32,.36],u,[-.15,.16,-.52]));const j=jt([.34,.16,.2],qt(10634543,{roughness:.65,metalness:.2}),[2.35,.08,-.62]);j.rotation.y=-.3,t.add(j),t.add(jt([.36,.02,.03],u,[2.35,.17,-.62]));const rt=new Jt(new zi(.13,.022,6,18),qt(2896440,{roughness:.9}));rt.rotation.x=Math.PI/2,rt.position.set(1.9,.03,-.3),t.add(rt);const mt=Es(r.net,.6,.42,[1.3,.015,-.45],[-Math.PI/2,0,0]);mt.material=new Ii({map:r.net,color:4016722,transparent:!0,alphaTest:.2,roughness:.95,side:On}),t.add(mt);const At=jt([.56,.11,.4],qt(5003875,{roughness:.97}),[-2.35,.055,-.62]);At.rotation.y=.12,t.add(At),t.add(jt([.54,.03,.38],qt(6122612,{roughness:.97}),[-2.35,.12,-.62]));for(let Et=0;Et<2;Et++){const ne=jt([.1,.07,.23],qt(3093561,{roughness:.95}),[-1.5+Et*.15,.035,-.78]);ne.rotation.y=.25-Et*.5,t.add(ne)}const Dt=new Jt(new xn(.035,.035,.2,12),new yu({color:10474720,roughness:.2,metalness:0,transparent:!0,opacity:.55}));Dt.rotation.z=Math.PI/2,Dt.position.set(-.95,.035,-.95),t.add(Dt);const pt=new Jt(new xn(.037,.037,.03,12),d);pt.rotation.z=Math.PI/2,pt.position.set(-.84,.035,-.95),t.add(pt);for(let Et=0;Et<5;Et++){const ne=jt([.05,.04,.06],d,[-3+Et*.62,.02,-.18]);t.add(ne)}const gt=new Jt(new xn(.022,.022,3,8),qt(1974822,{roughness:.85}));gt.rotation.z=Math.PI/2,gt.position.set(-1.8,.03,-.18),t.add(gt);for(let Et=0;Et<2;Et++){const ne=jt([.11,.05,.24],qt(4871520,{roughness:.95}),[-.6+Et*.16,.03,-.3]);ne.rotation.y=.2-Et*.4,t.add(ne)}const Tt=new Jt(new xn(.11,.11,.72,16),qt(4876892,{roughness:.9}));Tt.position.set(-3.35,.12,-.55),Tt.rotation.x=Math.PI/2-.12,Tt.castShadow=!0,t.add(Tt);for(const Et of[-.18,.18]){const ne=new Jt(new zi(.115,.012,6,16),qt(3095092,{roughness:.95}));ne.position.set(-3.35,.12+Et,-.55),ne.rotation.x=Math.PI/2-.12,t.add(ne)}for(let Et=0;Et<2;Et++){const ne=jt([.14,.16,.3],qt(3944998,{roughness:.95}),[-2.55+Et*.2,.08,-.42]);ne.rotation.y=.18-Et*.36,t.add(ne);const rn=jt([.15,.03,.31],qt(2236445,{roughness:1}),[-2.55+Et*.2,.015,-.42]);rn.rotation.y=.18-Et*.36,t.add(rn)}for(let Et=0;Et<3;Et++){const ne=jt([.28,.02,.21],qt(12103840,{roughness:.85}),[-1.85+Et*.01,.012+Et*.021,-.34+Et*.012]);ne.rotation.y=.22-Et*.16,t.add(ne)}const Ft=jt([.42,.11,.42],qt(7033152,{roughness:.98}),[.4,.055,-.5]);Ft.rotation.y=.3,t.add(Ft),t.add(Wi(.15,.34,qt(7371392,{roughness:.6,metalness:.25}),[2.62,.17,-.3],16));const Ut=new Jt(new tr(.13,12,8,0,Math.PI*2,0,Math.PI/2),qt(2764595,{roughness:.7}));Ut.position.set(2.62,.33,-.3),t.add(Ut);for(let Et=0;Et<7;Et++){const ne=-3.6+Et*1.15,rn=new Jt(new xn(.032,.032,1.05,8),qt(16777215,{map:r.cable,roughness:.85}));rn.rotation.z=Math.PI/2,rn.position.set(ne,.24,g+.07),t.add(rn),t.add(jt([.03,.09,.05],d,[ne-.5,.24,g+.09]))}for(let Et=0;Et<3;Et++){const ne=jt([.3,.22,.06],d,[2.55,.92+Et*.25,g+.08]);t.add(ne);for(let rn=0;rn<3;rn++){const hn=new Jt(new er(.012,8),new Ii({color:6750108,emissive:new pe(6750108),emissiveIntensity:2.6}));hn.position.set(2.48+rn*.05,.92+Et*.25,g+.115),t.add(hn),o.push({mesh:hn,period:1.4+Et*.7+rn*.23,offset:rn*.4,colour:6750108})}}const Lt=jt([.42,.26,.04],u,[-1.15,1.12,g+.08]);t.add(Lt);for(let Et=0;Et<6;Et++)t.add(jt([.38,.02,.02],d,[-1.15,1.01+Et*.04,g+.11]));const te=jt([.2,.28,.012],qt(7033398,{roughness:.85}),[2.28,1.3,g+.05]);te.rotation.z=-.07,t.add(te);const ie=Es(r.memo,.17,.24,[2.28,1.29,g+.062],[0,0,-.07]);t.add(ie),t.add(jt([.07,.03,.015],u,[2.28,1.42,g+.07]));const oe=jt([.24,.3,.08],qt(11023148,{roughness:.7}),[2.3,.95,g+.09]);t.add(oe),t.add(jt([.05,.09,.012],qt(15262940,{roughness:.8}),[2.3,1.02,g+.135])),t.add(jt([.02,.05,.01],p,[2.3,.76,g+.1]));const Y=new Jt(new zi(.035,.007,6,12),u);Y.position.set(2.78,1.24,g+.05),Y.rotation.y=Math.PI/2,t.add(Y);const Ct=Wi(.042,.1,qt(14209732,{roughness:.55}),[2.78,1.14,g+.09],14);t.add(Ct);const _t=new Jt(new zi(.028,.007,6,12),qt(14209732,{roughness:.55}));_t.position.set(2.83,1.14,g+.09),_t.rotation.y=Math.PI/2,t.add(_t);const wt=new Nn,It=new Jt(new xn(.011,.009,.15,10),qt(2042419,{roughness:.45}));wt.add(It);const Mt=new Jt(new Su(.009,.03,8),qt(Cn.copper,{roughness:.4,metalness:.7}));Mt.position.y=-.09,Mt.rotation.x=Math.PI,wt.add(Mt),wt.position.set(1.05,1.18,-.85),t.add(wt),a.push({object:wt,spin:.5,bob:.06,phase:0});const Yt=new Nn,Zt=Es(r.book,.42,.31,[0,0,0],[0,0,0]);Yt.add(Zt),Yt.add(Es(r.book,.42,.31,[0,0,.002],[0,Math.PI,0]));const Ve=jt([.02,.3,.02],qt(6970186,{roughness:.9}),[0,0,.01]);Yt.add(Ve),Yt.position.set(.55,1.28,-.55),Yt.rotation.set(.4,.6,.2),t.add(Yt),a.push({object:Yt,spin:.22,bob:.05,phase:1.7});const Se=new Nn,Fn=new Jt(new zi(.1,.013,6,16,Math.PI),d);Fn.rotation.y=Math.PI/2,Se.add(Fn);for(const Et of[-1,1]){const ne=new Jt(new xn(.042,.042,.033,12),d);ne.rotation.z=Math.PI/2,ne.position.set(0,-.02,Et*.1),Se.add(ne)}Se.position.set(-.3,1.42,-.7),t.add(Se),a.push({object:Se,spin:.34,bob:.07,phase:3.1});const Hn=new Jt(new tr(.022,10,8),new yu({color:12575984,roughness:.05,metalness:0,transparent:!0,opacity:.7}));Hn.position.set(-2.35,1.02,-1.2),t.add(Hn),a.push({object:Hn,spin:.1,bob:.09,phase:4.4});const pa=new Jt(new zp(.022),qt(13081179,{roughness:.95}));return pa.position.set(.15,.6,-.65),t.add(pa),a.push({object:pa,spin:.8,bob:.04,phase:5.6}),n.push({name:"The porthole",object:t,position:new V(1.3,1.2,-1.7)}),{group:t,focusTargets:n,pen:wt,plantLamp:B,plantLight:K,strip:t,screen:lt,floaters:a,zipper:S,indicators:o.filter(Et=>Et.mesh!==void 0)}}const b3=45,T3=33,A3=90,w3=15;class R3{canvas;renderer;scene=new a1;camera;textures;capsule;props;earth;sunLight=new uE(16774886,0);earthGlow=new _l(7317759,0,6,2);ambient=new sE(10466508,4867132,.5);viewSize=7.9;targetViewSize=7.9;azimuth=Fa.degToRad(b3);elevation=Fa.degToRad(T3);targetAzimuth=this.azimuth;targetElevation=this.elevation;target=new V(.25,1,-1.05);targetFocus=this.target.clone();phase=0;fastForward=!1;nightCruise=!1;plantLightOn=!0;focusedName=null;running=!0;contextLost=!1;disposed=!1;frame=0;lastTime=0;clock=0;pointer=new Wt(-10,-10);pointerActive=!1;dragging=!1;dragMoved=0;dragStart=new Wt;lastPointer=new Wt;scrubbing=!1;scrubStartPhase=0;scrubStartX=0;penSpin=0;penVelocity=new V;pointerWorld=new V;onPointerDown;onPointerMove;onPointerUp;onWheel;onContextLost;onContextRestored;constructor(t){const n=t.canvas;this.canvas=n,this.renderer=new u3({canvas:n,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setClearColor(131850,1),this.renderer.toneMapping=vp,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=fl,this.camera=new Au(-1,1,1,-1,.1,200),this.scene.add(this.camera),this.scene.add(this.ambient),this.textures=h3(),this.capsule=_3(this.textures),this.scene.add(this.capsule.group),this.props=E3(this.textures),this.scene.add(this.props.group),this.earth=y3(this.textures,.7),this.scene.add(this.earth.group),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(2048,2048),this.sunLight.shadow.camera.left=-6,this.sunLight.shadow.camera.right=6,this.sunLight.shadow.camera.top=6,this.sunLight.shadow.camera.bottom=-6,this.sunLight.shadow.camera.near=.5,this.sunLight.shadow.camera.far=60,this.sunLight.shadow.bias=-6e-4,this.sunLight.shadow.normalBias=.02,this.scene.add(this.sunLight),this.scene.add(this.sunLight.target),this.earthGlow.position.set(Mu.x,Mu.y,-_n+.35),this.scene.add(this.earthGlow),this.scene.add(this.buildStars()),this.resize(),this.updateCamera(0),this.updateSun(),this.onPointerDown=o=>{this.canvas.setPointerCapture(o.pointerId),this.dragging=!0,this.dragMoved=0,this.dragStart.set(o.clientX,o.clientY),this.lastPointer.set(o.clientX,o.clientY),this.pointerActive=!0,this.updatePointer(o),this.scrubbing=this.hitPorthole(),this.scrubbing&&(this.scrubStartPhase=this.phase,this.scrubStartX=o.clientX)},this.onPointerMove=o=>{if(this.updatePointer(o),!this.dragging)return;const c=o.clientX-this.lastPointer.x,u=o.clientY-this.lastPointer.y;if(this.lastPointer.set(o.clientX,o.clientY),this.dragMoved+=Math.abs(c)+Math.abs(u),this.scrubbing){this.phase=this.wrapPhase(this.scrubStartPhase-(o.clientX-this.scrubStartX)*.004),this.updateSun();return}this.targetAzimuth-=c*.006,this.targetAzimuth=Fa.clamp(this.targetAzimuth,.32,1.4),this.targetElevation=Fa.clamp(this.targetElevation+u*.005,.3,1.05)},this.onPointerUp=o=>{if(this.dragging){this.dragging=!1;try{this.canvas.releasePointerCapture(o.pointerId)}catch{}if(this.scrubbing){this.scrubbing=!1,this.dragMoved<6&&this.toggleFastForward();return}this.dragMoved<6&&this.handleClick()}},this.onWheel=o=>{o.preventDefault(),this.targetViewSize=Fa.clamp(this.targetViewSize*(1+Math.sign(o.deltaY)*.08),1.6,13)},this.onContextLost=o=>{o.preventDefault(),this.contextLost=!0,this.running=!1},this.onContextRestored=()=>{this.contextLost=!1,this.running=!0,this.lastTime=0,this.resize()},this.canvas.addEventListener("pointerdown",this.onPointerDown),this.canvas.addEventListener("pointermove",this.onPointerMove),this.canvas.addEventListener("pointerup",this.onPointerUp),this.canvas.addEventListener("pointercancel",this.onPointerUp),this.canvas.addEventListener("wheel",this.onWheel,{passive:!1}),this.canvas.addEventListener("webglcontextlost",this.onContextLost,!1),this.canvas.addEventListener("webglcontextrestored",this.onContextRestored,!1);const a=new ResizeObserver(()=>this.resize());a.observe(this.canvas.parentElement??this.canvas),this.observer=a,this.renderer.setAnimationLoop(()=>this.tick())}observer=null;setPhase(t){this.phase=this.wrapPhase(t),this.updateSun()}getPhase(){return this.phase}setFastForward(t){this.fastForward=t}setNightCruise(t){this.nightCruise=t,this.applyNightCruise()}setPlantLight(t){this.plantLightOn=t,this.props.plantLight.visible=t;const a=this.props.plantLamp.children[1].material;a.emissiveIntensity=t?1.9:.05}setFocus(t){if(this.focusedName=t,t===null){this.targetFocus.set(.25,1,-1.05),this.targetViewSize=7.9;return}const n=this.props.focusTargets.find(a=>a.name===t);n&&(this.targetFocus.copy(n.position),this.targetViewSize=t==="The porthole"?2.6:3.1)}debugInfo(){const t=new V;this.camera.getWorldDirection(t);const n=a=>{const o=a.clone().project(this.camera);return[Math.round((o.x*.5+.5)*1440),Math.round((-o.y*.5+.5)*900)]};return{view:t.toArray().map(a=>+a.toFixed(3)),camera:this.camera.position.toArray().map(a=>+a.toFixed(2)),target:this.target.toArray().map(a=>+a.toFixed(2)),earth:this.earth.group.position.toArray().map(a=>+a.toFixed(2)),earthScreen:n(this.earth.group.position),windowScreen:n(this.capsule.bigWindow.centre),windowWorld:this.capsule.bigWindow.centre.toArray(),earthRadius:this.earth.radius}}project(t){const n=new V(t[0],t[1],t[2]).project(this.camera),a=this.canvas.getBoundingClientRect();return[Math.round(a.left+(n.x*.5+.5)*a.width),Math.round(a.top+(-n.y*.5+.5)*a.height)]}landmarks(){const t=this.props.pen.position;return[...this.props.focusTargets.map(n=>({name:n.name,point:n.position.toArray()})),{name:"The pen",point:[t.x,t.y,t.z]},{name:"The floor strip",point:[0,.02,-_n*.48]},{name:"The porthole",point:this.capsule.bigWindow.centre.toArray()},{name:"The plant lamp",point:[-2.4,1.72,-_n+.32]}]}getState(){return{phase:this.phase,fastForward:this.fastForward,nightCruise:this.nightCruise,plantLight:this.plantLightOn,focus:this.focusedName,day:this.sunLight.intensity>.4,penSpin:this.penSpin}}dispose(){this.disposed=!0,this.renderer.setAnimationLoop(null),this.canvas.removeEventListener("pointerdown",this.onPointerDown),this.canvas.removeEventListener("pointermove",this.onPointerMove),this.canvas.removeEventListener("pointerup",this.onPointerUp),this.canvas.removeEventListener("pointercancel",this.onPointerUp),this.canvas.removeEventListener("wheel",this.onWheel),this.canvas.removeEventListener("webglcontextlost",this.onContextLost,!1),this.canvas.removeEventListener("webglcontextrestored",this.onContextRestored,!1),this.observer?.disconnect(),this.renderer.dispose()}buildStars(){const n=new Float32Array(2700),a=new Float32Array(900*3);for(let u=0;u<900;u++){const d=Math.random()*Math.PI*2,m=Math.acos(2*Math.random()-1),p=70;n[u*3]=p*Math.sin(m)*Math.cos(d),n[u*3+1]=p*Math.cos(m),n[u*3+2]=p*Math.sin(m)*Math.sin(d);const g=Math.random(),v=.25+Math.random()*.75;a[u*3]=v*(.75+g*.25),a[u*3+1]=v*.92,a[u*3+2]=v*(1-g*.3)}const o=new Sn;o.setAttribute("position",new Ki(n,3)),o.setAttribute("color",new Ki(a,3));const c=new lx({size:.16,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1});return new p1(o,c)}wrapPhase(t){const n=t%1;return n<0?n+1:n}sunDirection(t){const n=t*Math.PI*2+Fa.degToRad(35),a=new V(0,0,-1),o=new V(0,1,0);return a.clone().multiplyScalar(Math.cos(n)).add(o.multiplyScalar(Math.sin(n))).normalize()}updateSun(){const t=this.sunDirection(this.phase),n=Math.max(0,-t.z),a=Math.pow(n,1.4);this.sunLight.position.copy(t).multiplyScalar(26),this.sunLight.target.position.set(0,.4,-1.2),this.sunLight.intensity=a*11,this.sunLight.color.setHex(a>.02?16774370:16777215);const o=this.capsule.bigWindow.spot;o.target.position.copy(this.capsule.bigWindow.centre).addScaledVector(t,-3),o.target.updateMatrixWorld(),o.intensity=a*4.5;for(const u of this.capsule.smallWindows)u.spot.target.position.copy(u.centre).addScaledVector(t,-3),u.spot.target.updateMatrixWorld(),u.spot.intensity=a*1.6;this.earthGlow.intensity=(1-a)*(1-a)*4.2;const c=this.nightCruise?.06:1;for(const u of this.capsule.stripLights)u.intensity=3*c*(.35+.65*(1-a));this.capsule.floorStripMaterial.emissiveIntensity=.9*c*(.55+.45*(1-a)),this.ambient.intensity=.5+.7*a}applyNightCruise(){this.updateSun()}updatePointer(t){const n=this.canvas.getBoundingClientRect();this.pointer.set((t.clientX-n.left)/n.width*2-1,-((t.clientY-n.top)/n.height)*2+1)}pointerOnFloor(){const t=new md;t.setFromCamera(this.pointer,this.camera);const n=new Ha(new V(0,1,0),-1),a=new V;return t.ray.intersectPlane(n,a),a}hitPorthole(){const t=new md;return t.setFromCamera(this.pointer,this.camera),t.intersectObject(this.capsule.bigWindow.group,!0).length>0}handleClick(){const t=new md;if(t.setFromCamera(this.pointer,this.camera),t.intersectObject(this.props.pen,!0).length>0){this.penSpin=1;return}if(t.intersectObject(this.props.plantLamp,!0).length>0){this.setPlantLight(!this.plantLightOn);return}if(t.intersectObject(this.capsule.floorStrip,!0).length>0){this.setNightCruise(!this.nightCruise);return}for(const c of this.props.focusTargets)if(t.intersectObject(c.object,!0).length>0){this.setFocus(this.focusedName===c.name?null:c.name);return}this.setFocus(null)}toggleFastForward(){this.fastForward=!this.fastForward}tick(){if(this.disposed)return;if(this.contextLost){this.renderer.getContext().isContextLost()||(this.contextLost=!1,this.running=!0,this.lastTime=0,this.resize());return}if(!this.running)return;const t=performance.now(),n=this.lastTime?Math.min((t-this.lastTime)/1e3,.1):0;if(this.lastTime=t,this.clock+=n,this.frame+=1,!this.scrubbing){const a=this.fastForward?w3:A3;this.phase=this.wrapPhase(this.phase+n/a),this.updateSun()}this.updateCamera(n),this.updateFloaters(n),this.updateEarth(),this.props.screen.update(n),this.updateIndicators(),this.renderer.render(this.scene,this.camera)}updateCamera(t){const n=1-Math.pow(.0015,t||.016);this.azimuth+=(this.targetAzimuth-this.azimuth)*n,this.elevation+=(this.targetElevation-this.elevation)*n,this.viewSize+=(this.targetViewSize-this.viewSize)*n,this.target.lerp(this.targetFocus,n);const a=40,o=Math.cos(this.elevation)*a;this.camera.position.set(this.target.x+o*Math.cos(this.azimuth),this.target.y+Math.sin(this.elevation)*a,this.target.z+o*Math.sin(this.azimuth)),this.camera.lookAt(this.target);const c=this.canvas.clientWidth/Math.max(1,this.canvas.clientHeight);this.camera.left=-this.viewSize*c/2,this.camera.right=this.viewSize*c/2,this.camera.top=this.viewSize/2,this.camera.bottom=-this.viewSize/2,this.camera.updateProjectionMatrix()}updateEarth(){const t=new V;this.camera.getWorldDirection(t);const n=new V().crossVectors(t,this.camera.up).normalize(),a=new V().crossVectors(t,n).normalize(),o=this.capsule.bigWindow.centre;this.earth.group.position.copy(o).addScaledVector(t,3).addScaledVector(a,.02),this.earth.group.rotation.y=this.phase*Math.PI*2*.25+1.1;const c=t.clone().negate(),u=.45+Math.PI*1.4*this.phase,d=c.multiplyScalar(Math.cos(u)).addScaledVector(n,Math.sin(u)).normalize();this.earth.material.uniforms.uSunDirection.value.copy(d),this.earth.material.uniforms.uViewDirection.value.copy(this.camera.position).sub(this.earth.group.position).normalize(),this.earth.material.uniforms.uCloudOffset.value=this.phase*.08+.02}updateFloaters(t){for(const u of this.props.floaters){const d=u.object,m=this.clock*u.spin+u.phase;d.rotation.x+=t*u.spin*.7,d.rotation.y+=t*u.spin,d.position.y+=Math.sin(m*.9)*t*u.bob,d.position.x+=Math.cos(m*.7)*t*u.bob*.6,d.position.z+=Math.sin(m*.5+1.2)*t*u.bob*.6}const n=this.props.pen;this.pointerWorld.copy(this.pointerOnFloor());const a=n.position.x-this.pointerWorld.x,o=n.position.z-this.pointerWorld.z,c=Math.hypot(a,o);if(this.pointerActive&&c<.9&&c>.001){const u=(.9-c)*2.4;this.penVelocity.x+=a/c*u*t,this.penVelocity.z+=o/c*u*t}this.penVelocity.multiplyScalar(.94),n.position.x=Fa.clamp(n.position.x+this.penVelocity.x*t,.55,2.1),n.position.z=Fa.clamp(n.position.z+this.penVelocity.z*t,-1.6,-.2),this.penSpin>0&&(n.rotation.y+=this.penSpin*t*22,n.rotation.z+=this.penSpin*t*9,this.penSpin=Math.max(0,this.penSpin-t*1.4)),this.props.zipper.rotation.z=Math.sin(this.clock*1.6)*.22}updateIndicators(){for(const n of this.props.indicators){const a=n.mesh.material,c=Math.sin((this.clock/n.period+n.offset)*Math.PI*2)>.25?1:.12;a.emissiveIntensity=.4+c*2.6}const t=this.props.plantLamp.children[1].material;this.plantLightOn&&(t.emissiveIntensity=1.8+Math.sin(this.clock*.9)*.3,this.props.plantLight.intensity=1.6+Math.sin(this.clock*.9)*.3)}resize(){const t=this.canvas.parentElement,n=Math.max(1,t?.clientWidth??this.canvas.clientWidth),a=Math.max(1,t?.clientHeight??this.canvas.clientHeight);this.renderer.setSize(n,a,!1)}}function C3(){const r=Fh.useRef(null),t=Fh.useRef(null);return Fh.useEffect(()=>{const n=r.current;if(!n)return;const a=new R3({canvas:n,onReady:()=>{document.documentElement.dataset.habitatReady="true"}});return t.current=a,document.documentElement.dataset.habitatReady="true",Object.defineProperty(window,"__HABITAT__",{value:{get state(){return a.getState()},setPhase(c){return a.setPhase(c),a.getState()},setFocus(c){return a.setFocus(c),a.getState()},setFastForward(c){return a.setFastForward(c),a.getState()},setNightCruise(c){return a.setNightCruise(c),a.getState()},debugInfo(){return a.debugInfo()},project(c){return a.project(c)},landmarks(){return a.landmarks()},setPlantLight(c){return a.setPlantLight(c),a.getState()}},configurable:!0}),()=>{delete window.__HABITAT__,a.dispose(),t.current=null}},[]),Ed.jsx("div",{className:"stage",children:Ed.jsx("canvas",{ref:r,className:"stage__canvas"})})}const Ux=document.getElementById("root");if(!Ux)throw new Error("missing #root");Xy.createRoot(Ux).render(Ed.jsx(C3,{}));
