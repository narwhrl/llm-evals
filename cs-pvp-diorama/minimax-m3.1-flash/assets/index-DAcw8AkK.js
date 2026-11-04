(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();var Zh={exports:{}},tl={};var A_;function PM(){if(A_)return tl;A_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var m in l)m!=="key"&&(c[m]=l[m])}else c=l;return l=c.ref,{$$typeof:r,type:a,key:f,ref:l!==void 0?l:null,props:c}}return tl.Fragment=t,tl.jsx=n,tl.jsxs=n,tl}var R_;function zM(){return R_||(R_=1,Zh.exports=PM()),Zh.exports}var _l=zM(),Kh={exports:{}},ce={};var w_;function IM(){if(w_)return ce;w_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),g=Symbol.iterator;function M(D){return D===null||typeof D!="object"?null:(D=g&&D[g]||D["@@iterator"],typeof D=="function"?D:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,y={};function x(D,et,vt){this.props=D,this.context=et,this.refs=y,this.updater=vt||E}x.prototype.isReactComponent={},x.prototype.setState=function(D,et){if(typeof D!="object"&&typeof D!="function"&&D!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,D,et,"setState")},x.prototype.forceUpdate=function(D){this.updater.enqueueForceUpdate(this,D,"forceUpdate")};function N(){}N.prototype=x.prototype;function H(D,et,vt){this.props=D,this.context=et,this.refs=y,this.updater=vt||E}var C=H.prototype=new N;C.constructor=H,w(C,x.prototype),C.isPureReactComponent=!0;var z=Array.isArray;function O(){}var L={H:null,A:null,T:null,S:null},b=Object.prototype.hasOwnProperty;function P(D,et,vt){var wt=vt.ref;return{$$typeof:r,type:D,key:et,ref:wt!==void 0?wt:null,props:vt}}function k(D,et){return P(D.type,et,D.props)}function Q(D){return typeof D=="object"&&D!==null&&D.$$typeof===r}function K(D){var et={"=":"=0",":":"=2"};return"$"+D.replace(/[=:]/g,function(vt){return et[vt]})}var lt=/\/+/g;function Z(D,et){return typeof D=="object"&&D!==null&&D.key!=null?K(""+D.key):et.toString(36)}function nt(D){switch(D.status){case"fulfilled":return D.value;case"rejected":throw D.reason;default:switch(typeof D.status=="string"?D.then(O,O):(D.status="pending",D.then(function(et){D.status==="pending"&&(D.status="fulfilled",D.value=et)},function(et){D.status==="pending"&&(D.status="rejected",D.reason=et)})),D.status){case"fulfilled":return D.value;case"rejected":throw D.reason}}throw D}function B(D,et,vt,wt,bt){var Rt=typeof D;(Rt==="undefined"||Rt==="boolean")&&(D=null);var $=!1;if(D===null)$=!0;else switch(Rt){case"bigint":case"string":case"number":$=!0;break;case"object":switch(D.$$typeof){case r:case t:$=!0;break;case _:return $=D._init,B($(D._payload),et,vt,wt,bt)}}if($)return bt=bt(D),$=wt===""?"."+Z(D,0):wt,z(bt)?(vt="",$!=null&&(vt=$.replace(lt,"$&/")+"/"),B(bt,et,vt,"",function($t){return $t})):bt!=null&&(Q(bt)&&(bt=k(bt,vt+(bt.key==null||D&&D.key===bt.key?"":(""+bt.key).replace(lt,"$&/")+"/")+$)),et.push(bt)),1;$=0;var pt=wt===""?".":wt+":";if(z(D))for(var At=0;At<D.length;At++)wt=D[At],Rt=pt+Z(wt,At),$+=B(wt,et,vt,Rt,bt);else if(At=M(D),typeof At=="function")for(D=At.call(D),At=0;!(wt=D.next()).done;)wt=wt.value,Rt=pt+Z(wt,At++),$+=B(wt,et,vt,Rt,bt);else if(Rt==="object"){if(typeof D.then=="function")return B(nt(D),et,vt,wt,bt);throw et=String(D),Error("Objects are not valid as a React child (found: "+(et==="[object Object]"?"object with keys {"+Object.keys(D).join(", ")+"}":et)+"). If you meant to render a collection of children, use an array instead.")}return $}function V(D,et,vt){if(D==null)return D;var wt=[],bt=0;return B(D,wt,"","",function(Rt){return et.call(vt,Rt,bt++)}),wt}function ft(D){if(D._status===-1){var et=D._result;et=et(),et.then(function(vt){(D._status===0||D._status===-1)&&(D._status=1,D._result=vt)},function(vt){(D._status===0||D._status===-1)&&(D._status=2,D._result=vt)}),D._status===-1&&(D._status=0,D._result=et)}if(D._status===1)return D._result.default;throw D._result}var it=typeof reportError=="function"?reportError:function(D){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var et=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof D=="object"&&D!==null&&typeof D.message=="string"?String(D.message):String(D),error:D});if(!window.dispatchEvent(et))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",D);return}console.error(D)},dt={map:V,forEach:function(D,et,vt){V(D,function(){et.apply(this,arguments)},vt)},count:function(D){var et=0;return V(D,function(){et++}),et},toArray:function(D){return V(D,function(et){return et})||[]},only:function(D){if(!Q(D))throw Error("React.Children.only expected to receive a single React element child.");return D}};return ce.Activity=v,ce.Children=dt,ce.Component=x,ce.Fragment=n,ce.Profiler=l,ce.PureComponent=H,ce.StrictMode=a,ce.Suspense=d,ce.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=L,ce.__COMPILER_RUNTIME={__proto__:null,c:function(D){return L.H.useMemoCache(D)}},ce.cache=function(D){return function(){return D.apply(null,arguments)}},ce.cacheSignal=function(){return null},ce.cloneElement=function(D,et,vt){if(D==null)throw Error("The argument must be a React element, but you passed "+D+".");var wt=w({},D.props),bt=D.key;if(et!=null)for(Rt in et.key!==void 0&&(bt=""+et.key),et)!b.call(et,Rt)||Rt==="key"||Rt==="__self"||Rt==="__source"||Rt==="ref"&&et.ref===void 0||(wt[Rt]=et[Rt]);var Rt=arguments.length-2;if(Rt===1)wt.children=vt;else if(1<Rt){for(var $=Array(Rt),pt=0;pt<Rt;pt++)$[pt]=arguments[pt+2];wt.children=$}return P(D.type,bt,wt)},ce.createContext=function(D){return D={$$typeof:f,_currentValue:D,_currentValue2:D,_threadCount:0,Provider:null,Consumer:null},D.Provider=D,D.Consumer={$$typeof:c,_context:D},D},ce.createElement=function(D,et,vt){var wt,bt={},Rt=null;if(et!=null)for(wt in et.key!==void 0&&(Rt=""+et.key),et)b.call(et,wt)&&wt!=="key"&&wt!=="__self"&&wt!=="__source"&&(bt[wt]=et[wt]);var $=arguments.length-2;if($===1)bt.children=vt;else if(1<$){for(var pt=Array($),At=0;At<$;At++)pt[At]=arguments[At+2];bt.children=pt}if(D&&D.defaultProps)for(wt in $=D.defaultProps,$)bt[wt]===void 0&&(bt[wt]=$[wt]);return P(D,Rt,bt)},ce.createRef=function(){return{current:null}},ce.forwardRef=function(D){return{$$typeof:m,render:D}},ce.isValidElement=Q,ce.lazy=function(D){return{$$typeof:_,_payload:{_status:-1,_result:D},_init:ft}},ce.memo=function(D,et){return{$$typeof:p,type:D,compare:et===void 0?null:et}},ce.startTransition=function(D){var et=L.T,vt={};L.T=vt;try{var wt=D(),bt=L.S;bt!==null&&bt(vt,wt),typeof wt=="object"&&wt!==null&&typeof wt.then=="function"&&wt.then(O,it)}catch(Rt){it(Rt)}finally{et!==null&&vt.types!==null&&(et.types=vt.types),L.T=et}},ce.unstable_useCacheRefresh=function(){return L.H.useCacheRefresh()},ce.use=function(D){return L.H.use(D)},ce.useActionState=function(D,et,vt){return L.H.useActionState(D,et,vt)},ce.useCallback=function(D,et){return L.H.useCallback(D,et)},ce.useContext=function(D){return L.H.useContext(D)},ce.useDebugValue=function(){},ce.useDeferredValue=function(D,et){return L.H.useDeferredValue(D,et)},ce.useEffect=function(D,et){return L.H.useEffect(D,et)},ce.useEffectEvent=function(D){return L.H.useEffectEvent(D)},ce.useId=function(){return L.H.useId()},ce.useImperativeHandle=function(D,et,vt){return L.H.useImperativeHandle(D,et,vt)},ce.useInsertionEffect=function(D,et){return L.H.useInsertionEffect(D,et)},ce.useLayoutEffect=function(D,et){return L.H.useLayoutEffect(D,et)},ce.useMemo=function(D,et){return L.H.useMemo(D,et)},ce.useOptimistic=function(D,et){return L.H.useOptimistic(D,et)},ce.useReducer=function(D,et,vt){return L.H.useReducer(D,et,vt)},ce.useRef=function(D){return L.H.useRef(D)},ce.useState=function(D){return L.H.useState(D)},ce.useSyncExternalStore=function(D,et,vt){return L.H.useSyncExternalStore(D,et,vt)},ce.useTransition=function(){return L.H.useTransition()},ce.version="19.2.9",ce}var C_;function wp(){return C_||(C_=1,Kh.exports=IM()),Kh.exports}var Bd=wp(),Qh={exports:{}},el={},Jh={exports:{}},jh={};var D_;function BM(){return D_||(D_=1,(function(r){function t(B,V){var ft=B.length;B.push(V);t:for(;0<ft;){var it=ft-1>>>1,dt=B[it];if(0<l(dt,V))B[it]=V,B[ft]=dt,ft=it;else break t}}function n(B){return B.length===0?null:B[0]}function a(B){if(B.length===0)return null;var V=B[0],ft=B.pop();if(ft!==V){B[0]=ft;t:for(var it=0,dt=B.length,D=dt>>>1;it<D;){var et=2*(it+1)-1,vt=B[et],wt=et+1,bt=B[wt];if(0>l(vt,ft))wt<dt&&0>l(bt,vt)?(B[it]=bt,B[wt]=ft,it=wt):(B[it]=vt,B[et]=ft,it=et);else if(wt<dt&&0>l(bt,ft))B[it]=bt,B[wt]=ft,it=wt;else break t}}return V}function l(B,V){var ft=B.sortIndex-V.sortIndex;return ft!==0?ft:B.id-V.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,m=f.now();r.unstable_now=function(){return f.now()-m}}var d=[],p=[],_=1,v=null,g=3,M=!1,E=!1,w=!1,y=!1,x=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,H=typeof setImmediate<"u"?setImmediate:null;function C(B){for(var V=n(p);V!==null;){if(V.callback===null)a(p);else if(V.startTime<=B)a(p),V.sortIndex=V.expirationTime,t(d,V);else break;V=n(p)}}function z(B){if(w=!1,C(B),!E)if(n(d)!==null)E=!0,O||(O=!0,K());else{var V=n(p);V!==null&&nt(z,V.startTime-B)}}var O=!1,L=-1,b=5,P=-1;function k(){return y?!0:!(r.unstable_now()-P<b)}function Q(){if(y=!1,O){var B=r.unstable_now();P=B;var V=!0;try{t:{E=!1,w&&(w=!1,N(L),L=-1),M=!0;var ft=g;try{e:{for(C(B),v=n(d);v!==null&&!(v.expirationTime>B&&k());){var it=v.callback;if(typeof it=="function"){v.callback=null,g=v.priorityLevel;var dt=it(v.expirationTime<=B);if(B=r.unstable_now(),typeof dt=="function"){v.callback=dt,C(B),V=!0;break e}v===n(d)&&a(d),C(B)}else a(d);v=n(d)}if(v!==null)V=!0;else{var D=n(p);D!==null&&nt(z,D.startTime-B),V=!1}}break t}finally{v=null,g=ft,M=!1}V=void 0}}finally{V?K():O=!1}}}var K;if(typeof H=="function")K=function(){H(Q)};else if(typeof MessageChannel<"u"){var lt=new MessageChannel,Z=lt.port2;lt.port1.onmessage=Q,K=function(){Z.postMessage(null)}}else K=function(){x(Q,0)};function nt(B,V){L=x(function(){B(r.unstable_now())},V)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(B){B.callback=null},r.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<B?Math.floor(1e3/B):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(B){switch(g){case 1:case 2:case 3:var V=3;break;default:V=g}var ft=g;g=V;try{return B()}finally{g=ft}},r.unstable_requestPaint=function(){y=!0},r.unstable_runWithPriority=function(B,V){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var ft=g;g=B;try{return V()}finally{g=ft}},r.unstable_scheduleCallback=function(B,V,ft){var it=r.unstable_now();switch(typeof ft=="object"&&ft!==null?(ft=ft.delay,ft=typeof ft=="number"&&0<ft?it+ft:it):ft=it,B){case 1:var dt=-1;break;case 2:dt=250;break;case 5:dt=1073741823;break;case 4:dt=1e4;break;default:dt=5e3}return dt=ft+dt,B={id:_++,callback:V,priorityLevel:B,startTime:ft,expirationTime:dt,sortIndex:-1},ft>it?(B.sortIndex=ft,t(p,B),n(d)===null&&B===n(p)&&(w?(N(L),L=-1):w=!0,nt(z,ft-it))):(B.sortIndex=dt,t(d,B),E||M||(E=!0,O||(O=!0,K()))),B},r.unstable_shouldYield=k,r.unstable_wrapCallback=function(B){var V=g;return function(){var ft=g;g=V;try{return B.apply(this,arguments)}finally{g=ft}}}})(jh)),jh}var U_;function FM(){return U_||(U_=1,Jh.exports=BM()),Jh.exports}var $h={exports:{}},Hn={};var L_;function HM(){if(L_)return Hn;L_=1;var r=wp();function t(d){var p="https://react.dev/errors/"+d;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)p+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+d+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(d,p,_){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:d,containerInfo:p,implementation:_}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(d,p){if(d==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Hn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,Hn.createPortal=function(d,p){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(d,p,null,_)},Hn.flushSync=function(d){var p=f.T,_=a.p;try{if(f.T=null,a.p=2,d)return d()}finally{f.T=p,a.p=_,a.d.f()}},Hn.preconnect=function(d,p){typeof d=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,a.d.C(d,p))},Hn.prefetchDNS=function(d){typeof d=="string"&&a.d.D(d)},Hn.preinit=function(d,p){if(typeof d=="string"&&p&&typeof p.as=="string"){var _=p.as,v=m(_,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;_==="style"?a.d.S(d,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:v,integrity:g,fetchPriority:M}):_==="script"&&a.d.X(d,{crossOrigin:v,integrity:g,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Hn.preinitModule=function(d,p){if(typeof d=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var _=m(p.as,p.crossOrigin);a.d.M(d,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&a.d.M(d)},Hn.preload=function(d,p){if(typeof d=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var _=p.as,v=m(_,p.crossOrigin);a.d.L(d,_,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Hn.preloadModule=function(d,p){if(typeof d=="string")if(p){var _=m(p.as,p.crossOrigin);a.d.m(d,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else a.d.m(d)},Hn.requestFormReset=function(d){a.d.r(d)},Hn.unstable_batchedUpdates=function(d,p){return d(p)},Hn.useFormState=function(d,p,_){return f.H.useFormState(d,p,_)},Hn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Hn.version="19.2.9",Hn}var N_;function GM(){if(N_)return $h.exports;N_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),$h.exports=HM(),$h.exports}var O_;function VM(){if(O_)return el;O_=1;var r=FM(),t=wp(),n=GM();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function f(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function d(e){if(c(e)!==e)throw Error(a(188))}function p(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,o=i;;){var u=s.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){s=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===s)return d(u),e;if(h===o)return d(u),i;h=h.sibling}throw Error(a(188))}if(s.return!==o.return)s=u,o=h;else{for(var S=!1,R=u.child;R;){if(R===s){S=!0,s=u,o=h;break}if(R===o){S=!0,o=u,s=h;break}R=R.sibling}if(!S){for(R=h.child;R;){if(R===s){S=!0,s=h,o=u;break}if(R===o){S=!0,o=h,s=u;break}R=R.sibling}if(!S)throw Error(a(189))}}if(s.alternate!==o)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function _(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=_(e),i!==null)return i;e=e.sibling}return null}var v=Object.assign,g=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),H=Symbol.for("react.context"),C=Symbol.for("react.forward_ref"),z=Symbol.for("react.suspense"),O=Symbol.for("react.suspense_list"),L=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),P=Symbol.for("react.activity"),k=Symbol.for("react.memo_cache_sentinel"),Q=Symbol.iterator;function K(e){return e===null||typeof e!="object"?null:(e=Q&&e[Q]||e["@@iterator"],typeof e=="function"?e:null)}var lt=Symbol.for("react.client.reference");function Z(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===lt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case x:return"Profiler";case y:return"StrictMode";case z:return"Suspense";case O:return"SuspenseList";case P:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case H:return e.displayName||"Context";case N:return(e._context.displayName||"Context")+".Consumer";case C:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case L:return i=e.displayName||null,i!==null?i:Z(e.type)||"Memo";case b:i=e._payload,e=e._init;try{return Z(e(i))}catch{}}return null}var nt=Array.isArray,B=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ft={pending:!1,data:null,method:null,action:null},it=[],dt=-1;function D(e){return{current:e}}function et(e){0>dt||(e.current=it[dt],it[dt]=null,dt--)}function vt(e,i){dt++,it[dt]=e.current,e.current=i}var wt=D(null),bt=D(null),Rt=D(null),$=D(null);function pt(e,i){switch(vt(Rt,i),vt(bt,e),vt(wt,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?Kg(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=Kg(i),e=Qg(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}et(wt),vt(wt,e)}function At(){et(wt),et(bt),et(Rt)}function $t(e){e.memoizedState!==null&&vt($,e);var i=wt.current,s=Qg(i,e.type);i!==s&&(vt(bt,e),vt(wt,s))}function zt(e){bt.current===e&&(et(wt),et(bt)),$.current===e&&(et($),Qo._currentValue=ft)}var re,$e;function le(e){if(re===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);re=i&&i[1]||"",$e=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+re+e+$e}var ye=!1;function Pe(e,i){if(!e||ye)return"";ye=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var Et=function(){throw Error()};if(Object.defineProperty(Et.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Et,[])}catch(mt){var ut=mt}Reflect.construct(e,[],Et)}else{try{Et.call()}catch(mt){ut=mt}e.call(Et.prototype)}}else{try{throw Error()}catch(mt){ut=mt}(Et=e())&&typeof Et.catch=="function"&&Et.catch(function(){})}}catch(mt){if(mt&&ut&&typeof mt.stack=="string")return[mt.stack,ut.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),S=h[0],R=h[1];if(S&&R){var G=S.split(`
`),ot=R.split(`
`);for(u=o=0;o<G.length&&!G[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ot.length&&!ot[u].includes("DetermineComponentFrameRoot");)u++;if(o===G.length||u===ot.length)for(o=G.length-1,u=ot.length-1;1<=o&&0<=u&&G[o]!==ot[u];)u--;for(;1<=o&&0<=u;o--,u--)if(G[o]!==ot[u]){if(o!==1||u!==1)do if(o--,u--,0>u||G[o]!==ot[u]){var St=`
`+G[o].replace(" at new "," at ");return e.displayName&&St.includes("<anonymous>")&&(St=St.replace("<anonymous>",e.displayName)),St}while(1<=o&&0<=u);break}}}finally{ye=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?le(s):""}function ve(e,i){switch(e.tag){case 26:case 27:case 5:return le(e.type);case 16:return le("Lazy");case 13:return e.child!==i&&i!==null?le("Suspense Fallback"):le("Suspense");case 19:return le("SuspenseList");case 0:case 15:return Pe(e.type,!1);case 11:return Pe(e.type.render,!1);case 1:return Pe(e.type,!0);case 31:return le("Activity");default:return""}}function Ze(e){try{var i="",s=null;do i+=ve(e,s),s=e,e=e.return;while(e);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var ln=Object.prototype.hasOwnProperty,Dn=r.unstable_scheduleCallback,Ke=r.unstable_cancelCallback,cn=r.unstable_shouldYield,q=r.unstable_requestPaint,ze=r.unstable_now,Le=r.unstable_getCurrentPriorityLevel,I=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,tt=r.unstable_NormalPriority,ct=r.unstable_LowPriority,gt=r.unstable_IdlePriority,Ct=r.log,Nt=r.unstable_setDisableYieldValue,_t=null,xt=null;function Dt(e){if(typeof Ct=="function"&&Nt(e),xt&&typeof xt.setStrictMode=="function")try{xt.setStrictMode(_t,e)}catch{}}var kt=Math.clz32?Math.clz32:jt,It=Math.log,Ot=Math.LN2;function jt(e){return e>>>=0,e===0?32:31-(It(e)/Ot|0)|0}var te=256,oe=262144,Y=4194304;function Ut(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Mt(e,i,s){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,S=e.pingedLanes;e=e.warmLanes;var R=o&134217727;return R!==0?(o=R&~h,o!==0?u=Ut(o):(S&=R,S!==0?u=Ut(S):s||(s=R&~e,s!==0&&(u=Ut(s))))):(R=o&~h,R!==0?u=Ut(R):S!==0?u=Ut(S):s||(s=o&~e,s!==0&&(u=Ut(s)))),u===0?0:i!==0&&i!==u&&(i&h)===0&&(h=u&-u,s=i&-i,h>=s||h===32&&(s&4194048)!==0)?i:u}function Lt(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Ht(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Tt(){var e=Y;return Y<<=1,(Y&62914560)===0&&(Y=4194304),e}function Jt(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function Yt(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ge(e,i,s,o,u,h){var S=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var R=e.entanglements,G=e.expirationTimes,ot=e.hiddenUpdates;for(s=S&~s;0<s;){var St=31-kt(s),Et=1<<St;R[St]=0,G[St]=-1;var ut=ot[St];if(ut!==null)for(ot[St]=null,St=0;St<ut.length;St++){var mt=ut[St];mt!==null&&(mt.lane&=-536870913)}s&=~Et}o!==0&&Re(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(S&~i))}function Re(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var o=31-kt(i);e.entangledLanes|=i,e.entanglements[o]=e.entanglements[o]|1073741824|s&261930}function $n(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var o=31-kt(s),u=1<<o;u&i|e[o]&i&&(e[o]|=i),s&=~u}}function ui(e,i){var s=i&-i;return s=(s&42)!==0?1:lo(s),(s&(e.suspendedLanes|i))!==0?0:s}function lo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function co(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function uo(){var e=V.p;return e!==0?e:(e=window.event,e===void 0?32:x_(e.type))}function js(e,i){var s=V.p;try{return V.p=e,i()}finally{V.p=s}}var Yi=Math.random().toString(36).slice(2),mn="__reactFiber$"+Yi,On="__reactProps$"+Yi,ti="__reactContainer$"+Yi,Es="__reactEvents$"+Yi,Al="__reactListeners$"+Yi,Rl="__reactHandles$"+Yi,Ts="__reactResources$"+Yi,Ia="__reactMarker$"+Yi;function Ba(e){delete e[mn],delete e[On],delete e[Es],delete e[Al],delete e[Rl]}function la(e){var i=e[mn];if(i)return i;for(var s=e.parentNode;s;){if(i=s[ti]||s[mn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=i_(e);e!==null;){if(s=e[mn])return s;e=i_(e)}return i}e=s,s=e.parentNode}return null}function ca(e){if(e=e[mn]||e[ti]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function bs(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Fa(e){var i=e[Ts];return i||(i=e[Ts]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function gn(e){e[Ia]=!0}var wl=new Set,fo={};function A(e,i){W(e,i),W(e+"Capture",i)}function W(e,i){for(fo[e]=i,e=0;e<i.length;e++)wl.add(i[e])}var ht=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),at={},st={};function Bt(e){return ln.call(st,e)?!0:ln.call(at,e)?!1:ht.test(e)?st[e]=!0:(at[e]=!0,!1)}function Wt(e,i,s){if(Bt(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function Pt(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function Gt(e,i,s,o){if(o===null)e.removeAttribute(s);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+o)}}function Vt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function fe(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function _e(e,i,s){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(S){s=""+S,h.call(this,S)}}),Object.defineProperty(e,i,{enumerable:o.enumerable}),{getValue:function(){return s},setValue:function(S){s=""+S},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function qt(e){if(!e._valueTracker){var i=fe(e)?"checked":"value";e._valueTracker=_e(e,i,""+e[i])}}function we(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),o="";return e&&(o=fe(e)?e.checked?"true":"false":e.value),e=o,e!==s?(i.setValue(e),!0):!1}function tn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Qe=/[\n"\\]/g;function pe(e){return e.replace(Qe,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function _n(e,i,s,o,u,h,S,R){e.name="",S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?e.type=S:e.removeAttribute("type"),i!=null?S==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+Vt(i)):e.value!==""+Vt(i)&&(e.value=""+Vt(i)):S!=="submit"&&S!=="reset"||e.removeAttribute("value"),i!=null?Tn(e,S,Vt(i)):s!=null?Tn(e,S,Vt(s)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?e.name=""+Vt(R):e.removeAttribute("name")}function Xt(e,i,s,o,u,h,S,R){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),i!=null||s!=null){if(!(h!=="submit"&&h!=="reset"||i!=null)){qt(e);return}s=s!=null?""+Vt(s):"",i=i!=null?""+Vt(i):s,R||i===e.value||(e.value=i),e.defaultValue=i}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=R?e.checked:!!o,e.defaultChecked=!!o,S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"&&(e.name=S),qt(e)}function Tn(e,i,s){i==="number"&&tn(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function me(e,i,s,o){if(e=e.options,i){i={};for(var u=0;u<s.length;u++)i["$"+s[u]]=!0;for(s=0;s<e.length;s++)u=i.hasOwnProperty("$"+e[s].value),e[s].selected!==u&&(e[s].selected=u),u&&o&&(e[s].defaultSelected=!0)}else{for(s=""+Vt(s),i=null,u=0;u<e.length;u++){if(e[u].value===s){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function Zn(e,i,s){if(i!=null&&(i=""+Vt(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+Vt(s):""}function fi(e,i,s,o){if(i==null){if(o!=null){if(s!=null)throw Error(a(92));if(nt(o)){if(1<o.length)throw Error(a(93));o=o[0]}s=o}s==null&&(s=""),i=s}s=Vt(i),e.defaultValue=s,o=e.textContent,o===s&&o!==""&&o!==null&&(e.value=o),qt(e)}function Kn(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var Ha=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ne(e,i,s){var o=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?o?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":o?e.setProperty(i,s):typeof s!="number"||s===0||Ha.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function sn(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var o in s)!s.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in i)o=i[u],i.hasOwnProperty(u)&&s[u]!==o&&Ne(e,u,o)}else for(var h in i)i.hasOwnProperty(h)&&Ne(e,h,i[h])}function Ei(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ve=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),qi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ii(e){return qi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ti(){}var Wu=null;function Xu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var $s=null,tr=null;function Zp(e){var i=ca(e);if(i&&(e=i.stateNode)){var s=e[On]||null;t:switch(e=i.stateNode,i.type){case"input":if(_n(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+pe(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var o=s[i];if(o!==e&&o.form===e.form){var u=o[On]||null;if(!u)throw Error(a(90));_n(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<s.length;i++)o=s[i],o.form===e.form&&we(o)}break t;case"textarea":Zn(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&me(e,!!s.multiple,i,!1)}}}var Yu=!1;function Kp(e,i,s){if(Yu)return e(i,s);Yu=!0;try{var o=e(i);return o}finally{if(Yu=!1,($s!==null||tr!==null)&&(mc(),$s&&(i=$s,e=tr,tr=$s=null,Zp(i),e)))for(i=0;i<e.length;i++)Zp(e[i])}}function ho(e,i){var s=e.stateNode;if(s===null)return null;var o=s[On]||null;if(o===null)return null;s=o[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var ua=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qu=!1;if(ua)try{var po={};Object.defineProperty(po,"passive",{get:function(){qu=!0}}),window.addEventListener("test",po,po),window.removeEventListener("test",po,po)}catch{qu=!1}var Ga=null,Zu=null,Cl=null;function Qp(){if(Cl)return Cl;var e,i=Zu,s=i.length,o,u="value"in Ga?Ga.value:Ga.textContent,h=u.length;for(e=0;e<s&&i[e]===u[e];e++);var S=s-e;for(o=1;o<=S&&i[s-o]===u[h-o];o++);return Cl=u.slice(e,1<o?1-o:void 0)}function Dl(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function Ul(){return!0}function Jp(){return!1}function ei(e){function i(s,o,u,h,S){this._reactName=s,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=S,this.currentTarget=null;for(var R in e)e.hasOwnProperty(R)&&(s=e[R],this[R]=s?s(h):h[R]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?Ul:Jp,this.isPropagationStopped=Jp,this}return v(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Ul)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Ul)},persist:function(){},isPersistent:Ul}),i}var As={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ll=ei(As),mo=v({},As,{view:0,detail:0}),Nx=ei(mo),Ku,Qu,go,Nl=v({},mo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ju,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==go&&(go&&e.type==="mousemove"?(Ku=e.screenX-go.screenX,Qu=e.screenY-go.screenY):Qu=Ku=0,go=e),Ku)},movementY:function(e){return"movementY"in e?e.movementY:Qu}}),jp=ei(Nl),Ox=v({},Nl,{dataTransfer:0}),Px=ei(Ox),zx=v({},mo,{relatedTarget:0}),Ju=ei(zx),Ix=v({},As,{animationName:0,elapsedTime:0,pseudoElement:0}),Bx=ei(Ix),Fx=v({},As,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Hx=ei(Fx),Gx=v({},As,{data:0}),$p=ei(Gx),Vx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},kx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Wx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xx(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=Wx[e])?!!i[e]:!1}function ju(){return Xx}var Yx=v({},mo,{key:function(e){if(e.key){var i=Vx[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=Dl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?kx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ju,charCode:function(e){return e.type==="keypress"?Dl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Dl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qx=ei(Yx),Zx=v({},Nl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tm=ei(Zx),Kx=v({},mo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ju}),Qx=ei(Kx),Jx=v({},As,{propertyName:0,elapsedTime:0,pseudoElement:0}),jx=ei(Jx),$x=v({},Nl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),tS=ei($x),eS=v({},As,{newState:0,oldState:0}),nS=ei(eS),iS=[9,13,27,32],$u=ua&&"CompositionEvent"in window,_o=null;ua&&"documentMode"in document&&(_o=document.documentMode);var aS=ua&&"TextEvent"in window&&!_o,em=ua&&(!$u||_o&&8<_o&&11>=_o),nm=" ",im=!1;function am(e,i){switch(e){case"keyup":return iS.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var er=!1;function sS(e,i){switch(e){case"compositionend":return sm(i);case"keypress":return i.which!==32?null:(im=!0,nm);case"textInput":return e=i.data,e===nm&&im?null:e;default:return null}}function rS(e,i){if(er)return e==="compositionend"||!$u&&am(e,i)?(e=Qp(),Cl=Zu=Ga=null,er=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return em&&i.locale!=="ko"?null:i.data;default:return null}}var oS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rm(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!oS[e.type]:i==="textarea"}function om(e,i,s,o){$s?tr?tr.push(o):tr=[o]:$s=o,i=yc(i,"onChange"),0<i.length&&(s=new Ll("onChange","change",null,s,o),e.push({event:s,listeners:i}))}var vo=null,xo=null;function lS(e){kg(e,0)}function Ol(e){var i=bs(e);if(we(i))return e}function lm(e,i){if(e==="change")return i}var cm=!1;if(ua){var tf;if(ua){var ef="oninput"in document;if(!ef){var um=document.createElement("div");um.setAttribute("oninput","return;"),ef=typeof um.oninput=="function"}tf=ef}else tf=!1;cm=tf&&(!document.documentMode||9<document.documentMode)}function fm(){vo&&(vo.detachEvent("onpropertychange",hm),xo=vo=null)}function hm(e){if(e.propertyName==="value"&&Ol(xo)){var i=[];om(i,xo,e,Xu(e)),Kp(lS,i)}}function cS(e,i,s){e==="focusin"?(fm(),vo=i,xo=s,vo.attachEvent("onpropertychange",hm)):e==="focusout"&&fm()}function uS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ol(xo)}function fS(e,i){if(e==="click")return Ol(i)}function hS(e,i){if(e==="input"||e==="change")return Ol(i)}function dS(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var hi=typeof Object.is=="function"?Object.is:dS;function So(e,i){if(hi(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),o=Object.keys(i);if(s.length!==o.length)return!1;for(o=0;o<s.length;o++){var u=s[o];if(!ln.call(i,u)||!hi(e[u],i[u]))return!1}return!0}function dm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function pm(e,i){var s=dm(e);e=0;for(var o;s;){if(s.nodeType===3){if(o=e+s.textContent.length,e<=i&&o>=i)return{node:s,offset:i-e};e=o}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=dm(s)}}function mm(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?mm(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function gm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=tn(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=tn(e.document)}return i}function nf(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var pS=ua&&"documentMode"in document&&11>=document.documentMode,nr=null,af=null,Mo=null,sf=!1;function _m(e,i,s){var o=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;sf||nr==null||nr!==tn(o)||(o=nr,"selectionStart"in o&&nf(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Mo&&So(Mo,o)||(Mo=o,o=yc(af,"onSelect"),0<o.length&&(i=new Ll("onSelect","select",null,i,s),e.push({event:i,listeners:o}),i.target=nr)))}function Rs(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var ir={animationend:Rs("Animation","AnimationEnd"),animationiteration:Rs("Animation","AnimationIteration"),animationstart:Rs("Animation","AnimationStart"),transitionrun:Rs("Transition","TransitionRun"),transitionstart:Rs("Transition","TransitionStart"),transitioncancel:Rs("Transition","TransitionCancel"),transitionend:Rs("Transition","TransitionEnd")},rf={},vm={};ua&&(vm=document.createElement("div").style,"AnimationEvent"in window||(delete ir.animationend.animation,delete ir.animationiteration.animation,delete ir.animationstart.animation),"TransitionEvent"in window||delete ir.transitionend.transition);function ws(e){if(rf[e])return rf[e];if(!ir[e])return e;var i=ir[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in vm)return rf[e]=i[s];return e}var xm=ws("animationend"),Sm=ws("animationiteration"),Mm=ws("animationstart"),mS=ws("transitionrun"),gS=ws("transitionstart"),_S=ws("transitioncancel"),ym=ws("transitionend"),Em=new Map,of="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");of.push("scrollEnd");function Bi(e,i){Em.set(e,i),A(i,[e])}var Pl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},bi=[],ar=0,lf=0;function zl(){for(var e=ar,i=lf=ar=0;i<e;){var s=bi[i];bi[i++]=null;var o=bi[i];bi[i++]=null;var u=bi[i];bi[i++]=null;var h=bi[i];if(bi[i++]=null,o!==null&&u!==null){var S=o.pending;S===null?u.next=u:(u.next=S.next,S.next=u),o.pending=u}h!==0&&Tm(s,u,h)}}function Il(e,i,s,o){bi[ar++]=e,bi[ar++]=i,bi[ar++]=s,bi[ar++]=o,lf|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function cf(e,i,s,o){return Il(e,i,s,o),Bl(e)}function Cs(e,i){return Il(e,null,null,i),Bl(e)}function Tm(e,i,s){e.lanes|=s;var o=e.alternate;o!==null&&(o.lanes|=s);for(var u=!1,h=e.return;h!==null;)h.childLanes|=s,o=h.alternate,o!==null&&(o.childLanes|=s),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&i!==null&&(u=31-kt(s),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[i]:o.push(i),i.lane=s|536870912),h):null}function Bl(e){if(50<ko)throw ko=0,vh=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var sr={};function vS(e,i,s,o){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function di(e,i,s,o){return new vS(e,i,s,o)}function uf(e){return e=e.prototype,!(!e||!e.isReactComponent)}function fa(e,i){var s=e.alternate;return s===null?(s=di(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function bm(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function Fl(e,i,s,o,u,h){var S=0;if(o=e,typeof e=="function")uf(e)&&(S=1);else if(typeof e=="string")S=EM(e,s,wt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case P:return e=di(31,s,i,u),e.elementType=P,e.lanes=h,e;case w:return Ds(s.children,u,h,i);case y:S=8,u|=24;break;case x:return e=di(12,s,i,u|2),e.elementType=x,e.lanes=h,e;case z:return e=di(13,s,i,u),e.elementType=z,e.lanes=h,e;case O:return e=di(19,s,i,u),e.elementType=O,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case H:S=10;break t;case N:S=9;break t;case C:S=11;break t;case L:S=14;break t;case b:S=16,o=null;break t}S=29,s=Error(a(130,e===null?"null":typeof e,"")),o=null}return i=di(S,s,i,u),i.elementType=e,i.type=o,i.lanes=h,i}function Ds(e,i,s,o){return e=di(7,e,o,i),e.lanes=s,e}function ff(e,i,s){return e=di(6,e,null,i),e.lanes=s,e}function Am(e){var i=di(18,null,null,0);return i.stateNode=e,i}function hf(e,i,s){return i=di(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var Rm=new WeakMap;function Ai(e,i){if(typeof e=="object"&&e!==null){var s=Rm.get(e);return s!==void 0?s:(i={value:e,source:i,stack:Ze(i)},Rm.set(e,i),i)}return{value:e,source:i,stack:Ze(i)}}var rr=[],or=0,Hl=null,yo=0,Ri=[],wi=0,Va=null,Zi=1,Ki="";function ha(e,i){rr[or++]=yo,rr[or++]=Hl,Hl=e,yo=i}function wm(e,i,s){Ri[wi++]=Zi,Ri[wi++]=Ki,Ri[wi++]=Va,Va=e;var o=Zi;e=Ki;var u=32-kt(o)-1;o&=~(1<<u),s+=1;var h=32-kt(i)+u;if(30<h){var S=u-u%5;h=(o&(1<<S)-1).toString(32),o>>=S,u-=S,Zi=1<<32-kt(i)+u|s<<u|o,Ki=h+e}else Zi=1<<h|s<<u|o,Ki=e}function df(e){e.return!==null&&(ha(e,1),wm(e,1,0))}function pf(e){for(;e===Hl;)Hl=rr[--or],rr[or]=null,yo=rr[--or],rr[or]=null;for(;e===Va;)Va=Ri[--wi],Ri[wi]=null,Ki=Ri[--wi],Ri[wi]=null,Zi=Ri[--wi],Ri[wi]=null}function Cm(e,i){Ri[wi++]=Zi,Ri[wi++]=Ki,Ri[wi++]=Va,Zi=i.id,Ki=i.overflow,Va=e}var Pn=null,en=null,be=!1,ka=null,Ci=!1,mf=Error(a(519));function Wa(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Eo(Ai(i,e)),mf}function Dm(e){var i=e.stateNode,s=e.type,o=e.memoizedProps;switch(i[mn]=e,i[On]=o,s){case"dialog":Se("cancel",i),Se("close",i);break;case"iframe":case"object":case"embed":Se("load",i);break;case"video":case"audio":for(s=0;s<Xo.length;s++)Se(Xo[s],i);break;case"source":Se("error",i);break;case"img":case"image":case"link":Se("error",i),Se("load",i);break;case"details":Se("toggle",i);break;case"input":Se("invalid",i),Xt(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Se("invalid",i);break;case"textarea":Se("invalid",i),fi(i,o.value,o.defaultValue,o.children)}s=o.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||o.suppressHydrationWarning===!0||qg(i.textContent,s)?(o.popover!=null&&(Se("beforetoggle",i),Se("toggle",i)),o.onScroll!=null&&Se("scroll",i),o.onScrollEnd!=null&&Se("scrollend",i),o.onClick!=null&&(i.onclick=Ti),i=!0):i=!1,i||Wa(e,!0)}function Um(e){for(Pn=e.return;Pn;)switch(Pn.tag){case 5:case 31:case 13:Ci=!1;return;case 27:case 3:Ci=!0;return;default:Pn=Pn.return}}function lr(e){if(e!==Pn)return!1;if(!be)return Um(e),be=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||Nh(e.type,e.memoizedProps)),s=!s),s&&en&&Wa(e),Um(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));en=n_(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));en=n_(e)}else i===27?(i=en,as(e.type)?(e=Bh,Bh=null,en=e):en=i):en=Pn?Ui(e.stateNode.nextSibling):null;return!0}function Us(){en=Pn=null,be=!1}function gf(){var e=ka;return e!==null&&(si===null?si=e:si.push.apply(si,e),ka=null),e}function Eo(e){ka===null?ka=[e]:ka.push(e)}var _f=D(null),Ls=null,da=null;function Xa(e,i,s){vt(_f,i._currentValue),i._currentValue=s}function pa(e){e._currentValue=_f.current,et(_f)}function vf(e,i,s){for(;e!==null;){var o=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),e===s)break;e=e.return}}function xf(e,i,s,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var S=u.child;h=h.firstContext;t:for(;h!==null;){var R=h;h=u;for(var G=0;G<i.length;G++)if(R.context===i[G]){h.lanes|=s,R=h.alternate,R!==null&&(R.lanes|=s),vf(h.return,s,e),o||(S=null);break t}h=R.next}}else if(u.tag===18){if(S=u.return,S===null)throw Error(a(341));S.lanes|=s,h=S.alternate,h!==null&&(h.lanes|=s),vf(S,s,e),S=null}else S=u.child;if(S!==null)S.return=u;else for(S=u;S!==null;){if(S===e){S=null;break}if(u=S.sibling,u!==null){u.return=S.return,S=u;break}S=S.return}u=S}}function cr(e,i,s,o){e=null;for(var u=i,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var S=u.alternate;if(S===null)throw Error(a(387));if(S=S.memoizedProps,S!==null){var R=u.type;hi(u.pendingProps.value,S.value)||(e!==null?e.push(R):e=[R])}}else if(u===$.current){if(S=u.alternate,S===null)throw Error(a(387));S.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Qo):e=[Qo])}u=u.return}e!==null&&xf(i,e,s,o),i.flags|=262144}function Gl(e){for(e=e.firstContext;e!==null;){if(!hi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ns(e){Ls=e,da=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function zn(e){return Lm(Ls,e)}function Vl(e,i){return Ls===null&&Ns(e),Lm(e,i)}function Lm(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},da===null){if(e===null)throw Error(a(308));da=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else da=da.next=i;return s}var xS=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,o){e.push(o)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},SS=r.unstable_scheduleCallback,MS=r.unstable_NormalPriority,vn={$$typeof:H,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Sf(){return{controller:new xS,data:new Map,refCount:0}}function To(e){e.refCount--,e.refCount===0&&SS(MS,function(){e.controller.abort()})}var bo=null,Mf=0,ur=0,fr=null;function yS(e,i){if(bo===null){var s=bo=[];Mf=0,ur=Th(),fr={status:"pending",value:void 0,then:function(o){s.push(o)}}}return Mf++,i.then(Nm,Nm),i}function Nm(){if(--Mf===0&&bo!==null){fr!==null&&(fr.status="fulfilled");var e=bo;bo=null,ur=0,fr=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function ES(e,i){var s=[],o={status:"pending",value:null,reason:null,then:function(u){s.push(u)}};return e.then(function(){o.status="fulfilled",o.value=i;for(var u=0;u<s.length;u++)(0,s[u])(i)},function(u){for(o.status="rejected",o.reason=u,u=0;u<s.length;u++)(0,s[u])(void 0)}),o}var Om=B.S;B.S=function(e,i){_g=ze(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&yS(e,i),Om!==null&&Om(e,i)};var Os=D(null);function yf(){var e=Os.current;return e!==null?e:Je.pooledCache}function kl(e,i){i===null?vt(Os,Os.current):vt(Os,i.pool)}function Pm(){var e=yf();return e===null?null:{parent:vn._currentValue,pool:e}}var hr=Error(a(460)),Ef=Error(a(474)),Wl=Error(a(542)),Xl={then:function(){}};function zm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Im(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(Ti,Ti),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Fm(e),e;default:if(typeof i.status=="string")i.then(Ti,Ti);else{if(e=Je,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(o){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=o}},function(o){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Fm(e),e}throw zs=i,hr}}function Ps(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(zs=s,hr):s}}var zs=null;function Bm(){if(zs===null)throw Error(a(459));var e=zs;return zs=null,e}function Fm(e){if(e===hr||e===Wl)throw Error(a(483))}var dr=null,Ao=0;function Yl(e){var i=Ao;return Ao+=1,dr===null&&(dr=[]),Im(dr,e,i)}function Ro(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function ql(e,i){throw i.$$typeof===g?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function Hm(e){function i(j,X){if(e){var rt=j.deletions;rt===null?(j.deletions=[X],j.flags|=16):rt.push(X)}}function s(j,X){if(!e)return null;for(;X!==null;)i(j,X),X=X.sibling;return null}function o(j){for(var X=new Map;j!==null;)j.key!==null?X.set(j.key,j):X.set(j.index,j),j=j.sibling;return X}function u(j,X){return j=fa(j,X),j.index=0,j.sibling=null,j}function h(j,X,rt){return j.index=rt,e?(rt=j.alternate,rt!==null?(rt=rt.index,rt<X?(j.flags|=67108866,X):rt):(j.flags|=67108866,X)):(j.flags|=1048576,X)}function S(j){return e&&j.alternate===null&&(j.flags|=67108866),j}function R(j,X,rt,yt){return X===null||X.tag!==6?(X=ff(rt,j.mode,yt),X.return=j,X):(X=u(X,rt),X.return=j,X)}function G(j,X,rt,yt){var ee=rt.type;return ee===w?St(j,X,rt.props.children,yt,rt.key):X!==null&&(X.elementType===ee||typeof ee=="object"&&ee!==null&&ee.$$typeof===b&&Ps(ee)===X.type)?(X=u(X,rt.props),Ro(X,rt),X.return=j,X):(X=Fl(rt.type,rt.key,rt.props,null,j.mode,yt),Ro(X,rt),X.return=j,X)}function ot(j,X,rt,yt){return X===null||X.tag!==4||X.stateNode.containerInfo!==rt.containerInfo||X.stateNode.implementation!==rt.implementation?(X=hf(rt,j.mode,yt),X.return=j,X):(X=u(X,rt.children||[]),X.return=j,X)}function St(j,X,rt,yt,ee){return X===null||X.tag!==7?(X=Ds(rt,j.mode,yt,ee),X.return=j,X):(X=u(X,rt),X.return=j,X)}function Et(j,X,rt){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=ff(""+X,j.mode,rt),X.return=j,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case M:return rt=Fl(X.type,X.key,X.props,null,j.mode,rt),Ro(rt,X),rt.return=j,rt;case E:return X=hf(X,j.mode,rt),X.return=j,X;case b:return X=Ps(X),Et(j,X,rt)}if(nt(X)||K(X))return X=Ds(X,j.mode,rt,null),X.return=j,X;if(typeof X.then=="function")return Et(j,Yl(X),rt);if(X.$$typeof===H)return Et(j,Vl(j,X),rt);ql(j,X)}return null}function ut(j,X,rt,yt){var ee=X!==null?X.key:null;if(typeof rt=="string"&&rt!==""||typeof rt=="number"||typeof rt=="bigint")return ee!==null?null:R(j,X,""+rt,yt);if(typeof rt=="object"&&rt!==null){switch(rt.$$typeof){case M:return rt.key===ee?G(j,X,rt,yt):null;case E:return rt.key===ee?ot(j,X,rt,yt):null;case b:return rt=Ps(rt),ut(j,X,rt,yt)}if(nt(rt)||K(rt))return ee!==null?null:St(j,X,rt,yt,null);if(typeof rt.then=="function")return ut(j,X,Yl(rt),yt);if(rt.$$typeof===H)return ut(j,X,Vl(j,rt),yt);ql(j,rt)}return null}function mt(j,X,rt,yt,ee){if(typeof yt=="string"&&yt!==""||typeof yt=="number"||typeof yt=="bigint")return j=j.get(rt)||null,R(X,j,""+yt,ee);if(typeof yt=="object"&&yt!==null){switch(yt.$$typeof){case M:return j=j.get(yt.key===null?rt:yt.key)||null,G(X,j,yt,ee);case E:return j=j.get(yt.key===null?rt:yt.key)||null,ot(X,j,yt,ee);case b:return yt=Ps(yt),mt(j,X,rt,yt,ee)}if(nt(yt)||K(yt))return j=j.get(rt)||null,St(X,j,yt,ee,null);if(typeof yt.then=="function")return mt(j,X,rt,Yl(yt),ee);if(yt.$$typeof===H)return mt(j,X,rt,Vl(X,yt),ee);ql(X,yt)}return null}function Zt(j,X,rt,yt){for(var ee=null,De=null,Qt=X,de=X=0,Te=null;Qt!==null&&de<rt.length;de++){Qt.index>de?(Te=Qt,Qt=null):Te=Qt.sibling;var Ue=ut(j,Qt,rt[de],yt);if(Ue===null){Qt===null&&(Qt=Te);break}e&&Qt&&Ue.alternate===null&&i(j,Qt),X=h(Ue,X,de),De===null?ee=Ue:De.sibling=Ue,De=Ue,Qt=Te}if(de===rt.length)return s(j,Qt),be&&ha(j,de),ee;if(Qt===null){for(;de<rt.length;de++)Qt=Et(j,rt[de],yt),Qt!==null&&(X=h(Qt,X,de),De===null?ee=Qt:De.sibling=Qt,De=Qt);return be&&ha(j,de),ee}for(Qt=o(Qt);de<rt.length;de++)Te=mt(Qt,j,de,rt[de],yt),Te!==null&&(e&&Te.alternate!==null&&Qt.delete(Te.key===null?de:Te.key),X=h(Te,X,de),De===null?ee=Te:De.sibling=Te,De=Te);return e&&Qt.forEach(function(cs){return i(j,cs)}),be&&ha(j,de),ee}function ie(j,X,rt,yt){if(rt==null)throw Error(a(151));for(var ee=null,De=null,Qt=X,de=X=0,Te=null,Ue=rt.next();Qt!==null&&!Ue.done;de++,Ue=rt.next()){Qt.index>de?(Te=Qt,Qt=null):Te=Qt.sibling;var cs=ut(j,Qt,Ue.value,yt);if(cs===null){Qt===null&&(Qt=Te);break}e&&Qt&&cs.alternate===null&&i(j,Qt),X=h(cs,X,de),De===null?ee=cs:De.sibling=cs,De=cs,Qt=Te}if(Ue.done)return s(j,Qt),be&&ha(j,de),ee;if(Qt===null){for(;!Ue.done;de++,Ue=rt.next())Ue=Et(j,Ue.value,yt),Ue!==null&&(X=h(Ue,X,de),De===null?ee=Ue:De.sibling=Ue,De=Ue);return be&&ha(j,de),ee}for(Qt=o(Qt);!Ue.done;de++,Ue=rt.next())Ue=mt(Qt,j,de,Ue.value,yt),Ue!==null&&(e&&Ue.alternate!==null&&Qt.delete(Ue.key===null?de:Ue.key),X=h(Ue,X,de),De===null?ee=Ue:De.sibling=Ue,De=Ue);return e&&Qt.forEach(function(OM){return i(j,OM)}),be&&ha(j,de),ee}function Xe(j,X,rt,yt){if(typeof rt=="object"&&rt!==null&&rt.type===w&&rt.key===null&&(rt=rt.props.children),typeof rt=="object"&&rt!==null){switch(rt.$$typeof){case M:t:{for(var ee=rt.key;X!==null;){if(X.key===ee){if(ee=rt.type,ee===w){if(X.tag===7){s(j,X.sibling),yt=u(X,rt.props.children),yt.return=j,j=yt;break t}}else if(X.elementType===ee||typeof ee=="object"&&ee!==null&&ee.$$typeof===b&&Ps(ee)===X.type){s(j,X.sibling),yt=u(X,rt.props),Ro(yt,rt),yt.return=j,j=yt;break t}s(j,X);break}else i(j,X);X=X.sibling}rt.type===w?(yt=Ds(rt.props.children,j.mode,yt,rt.key),yt.return=j,j=yt):(yt=Fl(rt.type,rt.key,rt.props,null,j.mode,yt),Ro(yt,rt),yt.return=j,j=yt)}return S(j);case E:t:{for(ee=rt.key;X!==null;){if(X.key===ee)if(X.tag===4&&X.stateNode.containerInfo===rt.containerInfo&&X.stateNode.implementation===rt.implementation){s(j,X.sibling),yt=u(X,rt.children||[]),yt.return=j,j=yt;break t}else{s(j,X);break}else i(j,X);X=X.sibling}yt=hf(rt,j.mode,yt),yt.return=j,j=yt}return S(j);case b:return rt=Ps(rt),Xe(j,X,rt,yt)}if(nt(rt))return Zt(j,X,rt,yt);if(K(rt)){if(ee=K(rt),typeof ee!="function")throw Error(a(150));return rt=ee.call(rt),ie(j,X,rt,yt)}if(typeof rt.then=="function")return Xe(j,X,Yl(rt),yt);if(rt.$$typeof===H)return Xe(j,X,Vl(j,rt),yt);ql(j,rt)}return typeof rt=="string"&&rt!==""||typeof rt=="number"||typeof rt=="bigint"?(rt=""+rt,X!==null&&X.tag===6?(s(j,X.sibling),yt=u(X,rt),yt.return=j,j=yt):(s(j,X),yt=ff(rt,j.mode,yt),yt.return=j,j=yt),S(j)):s(j,X)}return function(j,X,rt,yt){try{Ao=0;var ee=Xe(j,X,rt,yt);return dr=null,ee}catch(Qt){if(Qt===hr||Qt===Wl)throw Qt;var De=di(29,Qt,null,j.mode);return De.lanes=yt,De.return=j,De}}}var Is=Hm(!0),Gm=Hm(!1),Ya=!1;function Tf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function bf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function qa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Za(e,i,s){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Oe&2)!==0){var u=o.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),o.pending=i,i=Bl(e),Tm(e,null,s),i}return Il(e,o,i,s),Bl(e)}function wo(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var o=i.lanes;o&=e.pendingLanes,s|=o,i.lanes=s,$n(e,s)}}function Af(e,i){var s=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,s===o)){var u=null,h=null;if(s=s.firstBaseUpdate,s!==null){do{var S={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};h===null?u=h=S:h=h.next=S,s=s.next}while(s!==null);h===null?u=h=i:h=h.next=i}else u=h=i;s={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var Rf=!1;function Co(){if(Rf){var e=fr;if(e!==null)throw e}}function Do(e,i,s,o){Rf=!1;var u=e.updateQueue;Ya=!1;var h=u.firstBaseUpdate,S=u.lastBaseUpdate,R=u.shared.pending;if(R!==null){u.shared.pending=null;var G=R,ot=G.next;G.next=null,S===null?h=ot:S.next=ot,S=G;var St=e.alternate;St!==null&&(St=St.updateQueue,R=St.lastBaseUpdate,R!==S&&(R===null?St.firstBaseUpdate=ot:R.next=ot,St.lastBaseUpdate=G))}if(h!==null){var Et=u.baseState;S=0,St=ot=G=null,R=h;do{var ut=R.lane&-536870913,mt=ut!==R.lane;if(mt?(Ee&ut)===ut:(o&ut)===ut){ut!==0&&ut===ur&&(Rf=!0),St!==null&&(St=St.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});t:{var Zt=e,ie=R;ut=i;var Xe=s;switch(ie.tag){case 1:if(Zt=ie.payload,typeof Zt=="function"){Et=Zt.call(Xe,Et,ut);break t}Et=Zt;break t;case 3:Zt.flags=Zt.flags&-65537|128;case 0:if(Zt=ie.payload,ut=typeof Zt=="function"?Zt.call(Xe,Et,ut):Zt,ut==null)break t;Et=v({},Et,ut);break t;case 2:Ya=!0}}ut=R.callback,ut!==null&&(e.flags|=64,mt&&(e.flags|=8192),mt=u.callbacks,mt===null?u.callbacks=[ut]:mt.push(ut))}else mt={lane:ut,tag:R.tag,payload:R.payload,callback:R.callback,next:null},St===null?(ot=St=mt,G=Et):St=St.next=mt,S|=ut;if(R=R.next,R===null){if(R=u.shared.pending,R===null)break;mt=R,R=mt.next,mt.next=null,u.lastBaseUpdate=mt,u.shared.pending=null}}while(!0);St===null&&(G=Et),u.baseState=G,u.firstBaseUpdate=ot,u.lastBaseUpdate=St,h===null&&(u.shared.lanes=0),$a|=S,e.lanes=S,e.memoizedState=Et}}function Vm(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function km(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)Vm(s[e],i)}var pr=D(null),Zl=D(0);function Wm(e,i){e=Ea,vt(Zl,e),vt(pr,i),Ea=e|i.baseLanes}function wf(){vt(Zl,Ea),vt(pr,pr.current)}function Cf(){Ea=Zl.current,et(pr),et(Zl)}var pi=D(null),Di=null;function Ka(e){var i=e.alternate;vt(dn,dn.current&1),vt(pi,e),Di===null&&(i===null||pr.current!==null||i.memoizedState!==null)&&(Di=e)}function Df(e){vt(dn,dn.current),vt(pi,e),Di===null&&(Di=e)}function Xm(e){e.tag===22?(vt(dn,dn.current),vt(pi,e),Di===null&&(Di=e)):Qa()}function Qa(){vt(dn,dn.current),vt(pi,pi.current)}function mi(e){et(pi),Di===e&&(Di=null),et(dn)}var dn=D(0);function Kl(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||zh(s)||Ih(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ma=0,he=null,ke=null,xn=null,Ql=!1,mr=!1,Bs=!1,Jl=0,Uo=0,gr=null,TS=0;function un(){throw Error(a(321))}function Uf(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!hi(e[s],i[s]))return!1;return!0}function Lf(e,i,s,o,u,h){return ma=h,he=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,B.H=e===null||e.memoizedState===null?w0:qf,Bs=!1,h=s(o,u),Bs=!1,mr&&(h=qm(i,s,o,u)),Ym(e),h}function Ym(e){B.H=Oo;var i=ke!==null&&ke.next!==null;if(ma=0,xn=ke=he=null,Ql=!1,Uo=0,gr=null,i)throw Error(a(300));e===null||Sn||(e=e.dependencies,e!==null&&Gl(e)&&(Sn=!0))}function qm(e,i,s,o){he=e;var u=0;do{if(mr&&(gr=null),Uo=0,mr=!1,25<=u)throw Error(a(301));if(u+=1,xn=ke=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}B.H=C0,h=i(s,o)}while(mr);return h}function bS(){var e=B.H,i=e.useState()[0];return i=typeof i.then=="function"?Lo(i):i,e=e.useState()[0],(ke!==null?ke.memoizedState:null)!==e&&(he.flags|=1024),i}function Nf(){var e=Jl!==0;return Jl=0,e}function Of(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function Pf(e){if(Ql){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Ql=!1}ma=0,xn=ke=he=null,mr=!1,Uo=Jl=0,gr=null}function Qn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return xn===null?he.memoizedState=xn=e:xn=xn.next=e,xn}function pn(){if(ke===null){var e=he.alternate;e=e!==null?e.memoizedState:null}else e=ke.next;var i=xn===null?he.memoizedState:xn.next;if(i!==null)xn=i,ke=e;else{if(e===null)throw he.alternate===null?Error(a(467)):Error(a(310));ke=e,e={memoizedState:ke.memoizedState,baseState:ke.baseState,baseQueue:ke.baseQueue,queue:ke.queue,next:null},xn===null?he.memoizedState=xn=e:xn=xn.next=e}return xn}function jl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Lo(e){var i=Uo;return Uo+=1,gr===null&&(gr=[]),e=Im(gr,e,i),i=he,(xn===null?i.memoizedState:xn.next)===null&&(i=i.alternate,B.H=i===null||i.memoizedState===null?w0:qf),e}function $l(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Lo(e);if(e.$$typeof===H)return zn(e)}throw Error(a(438,String(e)))}function zf(e){var i=null,s=he.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var o=he.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=jl(),he.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),o=0;o<e;o++)s[o]=k;return i.index++,s}function ga(e,i){return typeof i=="function"?i(e):i}function tc(e){var i=pn();return If(i,ke,e)}function If(e,i,s){var o=e.queue;if(o===null)throw Error(a(311));o.lastRenderedReducer=s;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var S=u.next;u.next=h.next,h.next=S}i.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{i=u.next;var R=S=null,G=null,ot=i,St=!1;do{var Et=ot.lane&-536870913;if(Et!==ot.lane?(Ee&Et)===Et:(ma&Et)===Et){var ut=ot.revertLane;if(ut===0)G!==null&&(G=G.next={lane:0,revertLane:0,gesture:null,action:ot.action,hasEagerState:ot.hasEagerState,eagerState:ot.eagerState,next:null}),Et===ur&&(St=!0);else if((ma&ut)===ut){ot=ot.next,ut===ur&&(St=!0);continue}else Et={lane:0,revertLane:ot.revertLane,gesture:null,action:ot.action,hasEagerState:ot.hasEagerState,eagerState:ot.eagerState,next:null},G===null?(R=G=Et,S=h):G=G.next=Et,he.lanes|=ut,$a|=ut;Et=ot.action,Bs&&s(h,Et),h=ot.hasEagerState?ot.eagerState:s(h,Et)}else ut={lane:Et,revertLane:ot.revertLane,gesture:ot.gesture,action:ot.action,hasEagerState:ot.hasEagerState,eagerState:ot.eagerState,next:null},G===null?(R=G=ut,S=h):G=G.next=ut,he.lanes|=Et,$a|=Et;ot=ot.next}while(ot!==null&&ot!==i);if(G===null?S=h:G.next=R,!hi(h,e.memoizedState)&&(Sn=!0,St&&(s=fr,s!==null)))throw s;e.memoizedState=h,e.baseState=S,e.baseQueue=G,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Bf(e){var i=pn(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var o=s.dispatch,u=s.pending,h=i.memoizedState;if(u!==null){s.pending=null;var S=u=u.next;do h=e(h,S.action),S=S.next;while(S!==u);hi(h,i.memoizedState)||(Sn=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),s.lastRenderedState=h}return[h,o]}function Zm(e,i,s){var o=he,u=pn(),h=be;if(h){if(s===void 0)throw Error(a(407));s=s()}else s=i();var S=!hi((ke||u).memoizedState,s);if(S&&(u.memoizedState=s,Sn=!0),u=u.queue,Gf(Jm.bind(null,o,u,e),[e]),u.getSnapshot!==i||S||xn!==null&&xn.memoizedState.tag&1){if(o.flags|=2048,_r(9,{destroy:void 0},Qm.bind(null,o,u,s,i),null),Je===null)throw Error(a(349));h||(ma&127)!==0||Km(o,i,s)}return s}function Km(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=he.updateQueue,i===null?(i=jl(),he.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function Qm(e,i,s,o){i.value=s,i.getSnapshot=o,jm(i)&&$m(e)}function Jm(e,i,s){return s(function(){jm(i)&&$m(e)})}function jm(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!hi(e,s)}catch{return!0}}function $m(e){var i=Cs(e,2);i!==null&&ri(i,e,2)}function Ff(e){var i=Qn();if(typeof e=="function"){var s=e;if(e=s(),Bs){Dt(!0);try{s()}finally{Dt(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ga,lastRenderedState:e},i}function t0(e,i,s,o){return e.baseState=s,If(e,ke,typeof o=="function"?o:ga)}function AS(e,i,s,o,u){if(ic(e))throw Error(a(485));if(e=i.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){h.listeners.push(S)}};B.T!==null?s(!0):h.isTransition=!1,o(h),s=i.pending,s===null?(h.next=i.pending=h,e0(i,h)):(h.next=s.next,i.pending=s.next=h)}}function e0(e,i){var s=i.action,o=i.payload,u=e.state;if(i.isTransition){var h=B.T,S={};B.T=S;try{var R=s(u,o),G=B.S;G!==null&&G(S,R),n0(e,i,R)}catch(ot){Hf(e,i,ot)}finally{h!==null&&S.types!==null&&(h.types=S.types),B.T=h}}else try{h=s(u,o),n0(e,i,h)}catch(ot){Hf(e,i,ot)}}function n0(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(o){i0(e,i,o)},function(o){return Hf(e,i,o)}):i0(e,i,s)}function i0(e,i,s){i.status="fulfilled",i.value=s,a0(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,e0(e,s)))}function Hf(e,i,s){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=s,a0(i),i=i.next;while(i!==o)}e.action=null}function a0(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function s0(e,i){return i}function r0(e,i){if(be){var s=Je.formState;if(s!==null){t:{var o=he;if(be){if(en){e:{for(var u=en,h=Ci;u.nodeType!==8;){if(!h){u=null;break e}if(u=Ui(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){en=Ui(u.nextSibling),o=u.data==="F!";break t}}Wa(o)}o=!1}o&&(i=s[0])}}return s=Qn(),s.memoizedState=s.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:s0,lastRenderedState:i},s.queue=o,s=b0.bind(null,he,o),o.dispatch=s,o=Ff(!1),h=Yf.bind(null,he,!1,o.queue),o=Qn(),u={state:i,dispatch:null,action:e,pending:null},o.queue=u,s=AS.bind(null,he,u,h,s),u.dispatch=s,o.memoizedState=e,[i,s,!1]}function o0(e){var i=pn();return l0(i,ke,e)}function l0(e,i,s){if(i=If(e,i,s0)[0],e=tc(ga)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=Lo(i)}catch(S){throw S===hr?Wl:S}else o=i;i=pn();var u=i.queue,h=u.dispatch;return s!==i.memoizedState&&(he.flags|=2048,_r(9,{destroy:void 0},RS.bind(null,u,s),null)),[o,h,e]}function RS(e,i){e.action=i}function c0(e){var i=pn(),s=ke;if(s!==null)return l0(i,s,e);pn(),i=i.memoizedState,s=pn();var o=s.queue.dispatch;return s.memoizedState=e,[i,o,!1]}function _r(e,i,s,o){return e={tag:e,create:s,deps:o,inst:i,next:null},i=he.updateQueue,i===null&&(i=jl(),he.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(o=s.next,s.next=e,e.next=o,i.lastEffect=e),e}function u0(){return pn().memoizedState}function ec(e,i,s,o){var u=Qn();he.flags|=e,u.memoizedState=_r(1|i,{destroy:void 0},s,o===void 0?null:o)}function nc(e,i,s,o){var u=pn();o=o===void 0?null:o;var h=u.memoizedState.inst;ke!==null&&o!==null&&Uf(o,ke.memoizedState.deps)?u.memoizedState=_r(i,h,s,o):(he.flags|=e,u.memoizedState=_r(1|i,h,s,o))}function f0(e,i){ec(8390656,8,e,i)}function Gf(e,i){nc(2048,8,e,i)}function wS(e){he.flags|=4;var i=he.updateQueue;if(i===null)i=jl(),he.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function h0(e){var i=pn().memoizedState;return wS({ref:i,nextImpl:e}),function(){if((Oe&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function d0(e,i){return nc(4,2,e,i)}function p0(e,i){return nc(4,4,e,i)}function m0(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function g0(e,i,s){s=s!=null?s.concat([e]):null,nc(4,4,m0.bind(null,i,e),s)}function Vf(){}function _0(e,i){var s=pn();i=i===void 0?null:i;var o=s.memoizedState;return i!==null&&Uf(i,o[1])?o[0]:(s.memoizedState=[e,i],e)}function v0(e,i){var s=pn();i=i===void 0?null:i;var o=s.memoizedState;if(i!==null&&Uf(i,o[1]))return o[0];if(o=e(),Bs){Dt(!0);try{e()}finally{Dt(!1)}}return s.memoizedState=[o,i],o}function kf(e,i,s){return s===void 0||(ma&1073741824)!==0&&(Ee&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=xg(),he.lanes|=e,$a|=e,s)}function x0(e,i,s,o){return hi(s,i)?s:pr.current!==null?(e=kf(e,s,o),hi(e,i)||(Sn=!0),e):(ma&42)===0||(ma&1073741824)!==0&&(Ee&261930)===0?(Sn=!0,e.memoizedState=s):(e=xg(),he.lanes|=e,$a|=e,i)}function S0(e,i,s,o,u){var h=V.p;V.p=h!==0&&8>h?h:8;var S=B.T,R={};B.T=R,Yf(e,!1,i,s);try{var G=u(),ot=B.S;if(ot!==null&&ot(R,G),G!==null&&typeof G=="object"&&typeof G.then=="function"){var St=ES(G,o);No(e,i,St,vi(e))}else No(e,i,o,vi(e))}catch(Et){No(e,i,{then:function(){},status:"rejected",reason:Et},vi())}finally{V.p=h,S!==null&&R.types!==null&&(S.types=R.types),B.T=S}}function CS(){}function Wf(e,i,s,o){if(e.tag!==5)throw Error(a(476));var u=M0(e).queue;S0(e,u,i,ft,s===null?CS:function(){return y0(e),s(o)})}function M0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:ft,baseState:ft,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ga,lastRenderedState:ft},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ga,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function y0(e){var i=M0(e);i.next===null&&(i=e.alternate.memoizedState),No(e,i.next.queue,{},vi())}function Xf(){return zn(Qo)}function E0(){return pn().memoizedState}function T0(){return pn().memoizedState}function DS(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=vi();e=qa(s);var o=Za(i,e,s);o!==null&&(ri(o,i,s),wo(o,i,s)),i={cache:Sf()},e.payload=i;return}i=i.return}}function US(e,i,s){var o=vi();s={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},ic(e)?A0(i,s):(s=cf(e,i,s,o),s!==null&&(ri(s,e,o),R0(s,i,o)))}function b0(e,i,s){var o=vi();No(e,i,s,o)}function No(e,i,s,o){var u={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(ic(e))A0(i,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var S=i.lastRenderedState,R=h(S,s);if(u.hasEagerState=!0,u.eagerState=R,hi(R,S))return Il(e,i,u,0),Je===null&&zl(),!1}catch{}if(s=cf(e,i,u,o),s!==null)return ri(s,e,o),R0(s,i,o),!0}return!1}function Yf(e,i,s,o){if(o={lane:2,revertLane:Th(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},ic(e)){if(i)throw Error(a(479))}else i=cf(e,s,o,2),i!==null&&ri(i,e,2)}function ic(e){var i=e.alternate;return e===he||i!==null&&i===he}function A0(e,i){mr=Ql=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function R0(e,i,s){if((s&4194048)!==0){var o=i.lanes;o&=e.pendingLanes,s|=o,i.lanes=s,$n(e,s)}}var Oo={readContext:zn,use:$l,useCallback:un,useContext:un,useEffect:un,useImperativeHandle:un,useLayoutEffect:un,useInsertionEffect:un,useMemo:un,useReducer:un,useRef:un,useState:un,useDebugValue:un,useDeferredValue:un,useTransition:un,useSyncExternalStore:un,useId:un,useHostTransitionStatus:un,useFormState:un,useActionState:un,useOptimistic:un,useMemoCache:un,useCacheRefresh:un};Oo.useEffectEvent=un;var w0={readContext:zn,use:$l,useCallback:function(e,i){return Qn().memoizedState=[e,i===void 0?null:i],e},useContext:zn,useEffect:f0,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,ec(4194308,4,m0.bind(null,i,e),s)},useLayoutEffect:function(e,i){return ec(4194308,4,e,i)},useInsertionEffect:function(e,i){ec(4,2,e,i)},useMemo:function(e,i){var s=Qn();i=i===void 0?null:i;var o=e();if(Bs){Dt(!0);try{e()}finally{Dt(!1)}}return s.memoizedState=[o,i],o},useReducer:function(e,i,s){var o=Qn();if(s!==void 0){var u=s(i);if(Bs){Dt(!0);try{s(i)}finally{Dt(!1)}}}else u=i;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=US.bind(null,he,e),[o.memoizedState,e]},useRef:function(e){var i=Qn();return e={current:e},i.memoizedState=e},useState:function(e){e=Ff(e);var i=e.queue,s=b0.bind(null,he,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:Vf,useDeferredValue:function(e,i){var s=Qn();return kf(s,e,i)},useTransition:function(){var e=Ff(!1);return e=S0.bind(null,he,e.queue,!0,!1),Qn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var o=he,u=Qn();if(be){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Je===null)throw Error(a(349));(Ee&127)!==0||Km(o,i,s)}u.memoizedState=s;var h={value:s,getSnapshot:i};return u.queue=h,f0(Jm.bind(null,o,h,e),[e]),o.flags|=2048,_r(9,{destroy:void 0},Qm.bind(null,o,h,s,i),null),s},useId:function(){var e=Qn(),i=Je.identifierPrefix;if(be){var s=Ki,o=Zi;s=(o&~(1<<32-kt(o)-1)).toString(32)+s,i="_"+i+"R_"+s,s=Jl++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=TS++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Xf,useFormState:r0,useActionState:r0,useOptimistic:function(e){var i=Qn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=Yf.bind(null,he,!0,s),s.dispatch=i,[e,i]},useMemoCache:zf,useCacheRefresh:function(){return Qn().memoizedState=DS.bind(null,he)},useEffectEvent:function(e){var i=Qn(),s={impl:e};return i.memoizedState=s,function(){if((Oe&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},qf={readContext:zn,use:$l,useCallback:_0,useContext:zn,useEffect:Gf,useImperativeHandle:g0,useInsertionEffect:d0,useLayoutEffect:p0,useMemo:v0,useReducer:tc,useRef:u0,useState:function(){return tc(ga)},useDebugValue:Vf,useDeferredValue:function(e,i){var s=pn();return x0(s,ke.memoizedState,e,i)},useTransition:function(){var e=tc(ga)[0],i=pn().memoizedState;return[typeof e=="boolean"?e:Lo(e),i]},useSyncExternalStore:Zm,useId:E0,useHostTransitionStatus:Xf,useFormState:o0,useActionState:o0,useOptimistic:function(e,i){var s=pn();return t0(s,ke,e,i)},useMemoCache:zf,useCacheRefresh:T0};qf.useEffectEvent=h0;var C0={readContext:zn,use:$l,useCallback:_0,useContext:zn,useEffect:Gf,useImperativeHandle:g0,useInsertionEffect:d0,useLayoutEffect:p0,useMemo:v0,useReducer:Bf,useRef:u0,useState:function(){return Bf(ga)},useDebugValue:Vf,useDeferredValue:function(e,i){var s=pn();return ke===null?kf(s,e,i):x0(s,ke.memoizedState,e,i)},useTransition:function(){var e=Bf(ga)[0],i=pn().memoizedState;return[typeof e=="boolean"?e:Lo(e),i]},useSyncExternalStore:Zm,useId:E0,useHostTransitionStatus:Xf,useFormState:c0,useActionState:c0,useOptimistic:function(e,i){var s=pn();return ke!==null?t0(s,ke,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:zf,useCacheRefresh:T0};C0.useEffectEvent=h0;function Zf(e,i,s,o){i=e.memoizedState,s=s(o,i),s=s==null?i:v({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Kf={enqueueSetState:function(e,i,s){e=e._reactInternals;var o=vi(),u=qa(o);u.payload=i,s!=null&&(u.callback=s),i=Za(e,u,o),i!==null&&(ri(i,e,o),wo(i,e,o))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var o=vi(),u=qa(o);u.tag=1,u.payload=i,s!=null&&(u.callback=s),i=Za(e,u,o),i!==null&&(ri(i,e,o),wo(i,e,o))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=vi(),o=qa(s);o.tag=2,i!=null&&(o.callback=i),i=Za(e,o,s),i!==null&&(ri(i,e,s),wo(i,e,s))}};function D0(e,i,s,o,u,h,S){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,S):i.prototype&&i.prototype.isPureReactComponent?!So(s,o)||!So(u,h):!0}function U0(e,i,s,o){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,o),i.state!==e&&Kf.enqueueReplaceState(i,i.state,null)}function Fs(e,i){var s=i;if("ref"in i){s={};for(var o in i)o!=="ref"&&(s[o]=i[o])}if(e=e.defaultProps){s===i&&(s=v({},s));for(var u in e)s[u]===void 0&&(s[u]=e[u])}return s}function L0(e){Pl(e)}function N0(e){console.error(e)}function O0(e){Pl(e)}function ac(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function P0(e,i,s){try{var o=e.onCaughtError;o(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Qf(e,i,s){return s=qa(s),s.tag=3,s.payload={element:null},s.callback=function(){ac(e,i)},s}function z0(e){return e=qa(e),e.tag=3,e}function I0(e,i,s,o){var u=s.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){P0(i,s,o)}}var S=s.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(e.callback=function(){P0(i,s,o),typeof u!="function"&&(ts===null?ts=new Set([this]):ts.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function LS(e,i,s,o,u){if(s.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=s.alternate,i!==null&&cr(i,s,u,!0),s=pi.current,s!==null){switch(s.tag){case 31:case 13:return Di===null?gc():s.alternate===null&&fn===0&&(fn=3),s.flags&=-257,s.flags|=65536,s.lanes=u,o===Xl?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([o]):i.add(o),Mh(e,o,u)),!1;case 22:return s.flags|=65536,o===Xl?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([o]):s.add(o)),Mh(e,o,u)),!1}throw Error(a(435,s.tag))}return Mh(e,o,u),gc(),!1}if(be)return i=pi.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,o!==mf&&(e=Error(a(422),{cause:o}),Eo(Ai(e,s)))):(o!==mf&&(i=Error(a(423),{cause:o}),Eo(Ai(i,s))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=Ai(o,s),u=Qf(e.stateNode,o,u),Af(e,u),fn!==4&&(fn=2)),!1;var h=Error(a(520),{cause:o});if(h=Ai(h,s),Vo===null?Vo=[h]:Vo.push(h),fn!==4&&(fn=2),i===null)return!0;o=Ai(o,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=u&-u,s.lanes|=e,e=Qf(s.stateNode,o,e),Af(s,e),!1;case 1:if(i=s.type,h=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(ts===null||!ts.has(h))))return s.flags|=65536,u&=-u,s.lanes|=u,u=z0(u),I0(u,e,s,o),Af(s,u),!1}s=s.return}while(s!==null);return!1}var Jf=Error(a(461)),Sn=!1;function In(e,i,s,o){i.child=e===null?Gm(i,null,s,o):Is(i,e.child,s,o)}function B0(e,i,s,o,u){s=s.render;var h=i.ref;if("ref"in o){var S={};for(var R in o)R!=="ref"&&(S[R]=o[R])}else S=o;return Ns(i),o=Lf(e,i,s,S,h,u),R=Nf(),e!==null&&!Sn?(Of(e,i,u),_a(e,i,u)):(be&&R&&df(i),i.flags|=1,In(e,i,o,u),i.child)}function F0(e,i,s,o,u){if(e===null){var h=s.type;return typeof h=="function"&&!uf(h)&&h.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=h,H0(e,i,h,o,u)):(e=Fl(s.type,null,o,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(h=e.child,!sh(e,u)){var S=h.memoizedProps;if(s=s.compare,s=s!==null?s:So,s(S,o)&&e.ref===i.ref)return _a(e,i,u)}return i.flags|=1,e=fa(h,o),e.ref=i.ref,e.return=i,i.child=e}function H0(e,i,s,o,u){if(e!==null){var h=e.memoizedProps;if(So(h,o)&&e.ref===i.ref)if(Sn=!1,i.pendingProps=o=h,sh(e,u))(e.flags&131072)!==0&&(Sn=!0);else return i.lanes=e.lanes,_a(e,i,u)}return jf(e,i,s,o,u)}function G0(e,i,s,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(h=h!==null?h.baseLanes|s:s,e!==null){for(o=i.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,i.child=null;return V0(e,i,h,s,o)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&kl(i,h!==null?h.cachePool:null),h!==null?Wm(i,h):wf(),Xm(i);else return o=i.lanes=536870912,V0(e,i,h!==null?h.baseLanes|s:s,s,o)}else h!==null?(kl(i,h.cachePool),Wm(i,h),Qa(),i.memoizedState=null):(e!==null&&kl(i,null),wf(),Qa());return In(e,i,u,s),i.child}function Po(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function V0(e,i,s,o,u){var h=yf();return h=h===null?null:{parent:vn._currentValue,pool:h},i.memoizedState={baseLanes:s,cachePool:h},e!==null&&kl(i,null),wf(),Xm(i),e!==null&&cr(e,i,o,!0),i.childLanes=u,null}function sc(e,i){return i=oc({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function k0(e,i,s){return Is(i,e.child,null,s),e=sc(i,i.pendingProps),e.flags|=2,mi(i),i.memoizedState=null,e}function NS(e,i,s){var o=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(be){if(o.mode==="hidden")return e=sc(i,o),i.lanes=536870912,Po(null,e);if(Df(i),(e=en)?(e=e_(e,Ci),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Va!==null?{id:Zi,overflow:Ki}:null,retryLane:536870912,hydrationErrors:null},s=Am(e),s.return=i,i.child=s,Pn=i,en=null)):e=null,e===null)throw Wa(i);return i.lanes=536870912,null}return sc(i,o)}var h=e.memoizedState;if(h!==null){var S=h.dehydrated;if(Df(i),u)if(i.flags&256)i.flags&=-257,i=k0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(Sn||cr(e,i,s,!1),u=(s&e.childLanes)!==0,Sn||u){if(o=Je,o!==null&&(S=ui(o,s),S!==0&&S!==h.retryLane))throw h.retryLane=S,Cs(e,S),ri(o,e,S),Jf;gc(),i=k0(e,i,s)}else e=h.treeContext,en=Ui(S.nextSibling),Pn=i,be=!0,ka=null,Ci=!1,e!==null&&Cm(i,e),i=sc(i,o),i.flags|=4096;return i}return e=fa(e.child,{mode:o.mode,children:o.children}),e.ref=i.ref,i.child=e,e.return=i,e}function rc(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function jf(e,i,s,o,u){return Ns(i),s=Lf(e,i,s,o,void 0,u),o=Nf(),e!==null&&!Sn?(Of(e,i,u),_a(e,i,u)):(be&&o&&df(i),i.flags|=1,In(e,i,s,u),i.child)}function W0(e,i,s,o,u,h){return Ns(i),i.updateQueue=null,s=qm(i,o,s,u),Ym(e),o=Nf(),e!==null&&!Sn?(Of(e,i,h),_a(e,i,h)):(be&&o&&df(i),i.flags|=1,In(e,i,s,h),i.child)}function X0(e,i,s,o,u){if(Ns(i),i.stateNode===null){var h=sr,S=s.contextType;typeof S=="object"&&S!==null&&(h=zn(S)),h=new s(o,h),i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Kf,i.stateNode=h,h._reactInternals=i,h=i.stateNode,h.props=o,h.state=i.memoizedState,h.refs={},Tf(i),S=s.contextType,h.context=typeof S=="object"&&S!==null?zn(S):sr,h.state=i.memoizedState,S=s.getDerivedStateFromProps,typeof S=="function"&&(Zf(i,s,S,o),h.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(S=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),S!==h.state&&Kf.enqueueReplaceState(h,h.state,null),Do(i,o,h,u),Co(),h.state=i.memoizedState),typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(e===null){h=i.stateNode;var R=i.memoizedProps,G=Fs(s,R);h.props=G;var ot=h.context,St=s.contextType;S=sr,typeof St=="object"&&St!==null&&(S=zn(St));var Et=s.getDerivedStateFromProps;St=typeof Et=="function"||typeof h.getSnapshotBeforeUpdate=="function",R=i.pendingProps!==R,St||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(R||ot!==S)&&U0(i,h,o,S),Ya=!1;var ut=i.memoizedState;h.state=ut,Do(i,o,h,u),Co(),ot=i.memoizedState,R||ut!==ot||Ya?(typeof Et=="function"&&(Zf(i,s,Et,o),ot=i.memoizedState),(G=Ya||D0(i,s,G,o,ut,ot,S))?(St||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(i.flags|=4194308)):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=ot),h.props=o,h.state=ot,h.context=S,o=G):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{h=i.stateNode,bf(e,i),S=i.memoizedProps,St=Fs(s,S),h.props=St,Et=i.pendingProps,ut=h.context,ot=s.contextType,G=sr,typeof ot=="object"&&ot!==null&&(G=zn(ot)),R=s.getDerivedStateFromProps,(ot=typeof R=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(S!==Et||ut!==G)&&U0(i,h,o,G),Ya=!1,ut=i.memoizedState,h.state=ut,Do(i,o,h,u),Co();var mt=i.memoizedState;S!==Et||ut!==mt||Ya||e!==null&&e.dependencies!==null&&Gl(e.dependencies)?(typeof R=="function"&&(Zf(i,s,R,o),mt=i.memoizedState),(St=Ya||D0(i,s,St,o,ut,mt,G)||e!==null&&e.dependencies!==null&&Gl(e.dependencies))?(ot||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,mt,G),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,mt,G)),typeof h.componentDidUpdate=="function"&&(i.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof h.componentDidUpdate!="function"||S===e.memoizedProps&&ut===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&ut===e.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=mt),h.props=o,h.state=mt,h.context=G,o=St):(typeof h.componentDidUpdate!="function"||S===e.memoizedProps&&ut===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&ut===e.memoizedState||(i.flags|=1024),o=!1)}return h=o,rc(e,i),o=(i.flags&128)!==0,h||o?(h=i.stateNode,s=o&&typeof s.getDerivedStateFromError!="function"?null:h.render(),i.flags|=1,e!==null&&o?(i.child=Is(i,e.child,null,u),i.child=Is(i,null,s,u)):In(e,i,s,u),i.memoizedState=h.state,e=i.child):e=_a(e,i,u),e}function Y0(e,i,s,o){return Us(),i.flags|=256,In(e,i,s,o),i.child}var $f={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function th(e){return{baseLanes:e,cachePool:Pm()}}function eh(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=_i),e}function q0(e,i,s){var o=i.pendingProps,u=!1,h=(i.flags&128)!==0,S;if((S=h)||(S=e!==null&&e.memoizedState===null?!1:(dn.current&2)!==0),S&&(u=!0,i.flags&=-129),S=(i.flags&32)!==0,i.flags&=-33,e===null){if(be){if(u?Ka(i):Qa(),(e=en)?(e=e_(e,Ci),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Va!==null?{id:Zi,overflow:Ki}:null,retryLane:536870912,hydrationErrors:null},s=Am(e),s.return=i,i.child=s,Pn=i,en=null)):e=null,e===null)throw Wa(i);return Ih(e)?i.lanes=32:i.lanes=536870912,null}var R=o.children;return o=o.fallback,u?(Qa(),u=i.mode,R=oc({mode:"hidden",children:R},u),o=Ds(o,u,s,null),R.return=i,o.return=i,R.sibling=o,i.child=R,o=i.child,o.memoizedState=th(s),o.childLanes=eh(e,S,s),i.memoizedState=$f,Po(null,o)):(Ka(i),nh(i,R))}var G=e.memoizedState;if(G!==null&&(R=G.dehydrated,R!==null)){if(h)i.flags&256?(Ka(i),i.flags&=-257,i=ih(e,i,s)):i.memoizedState!==null?(Qa(),i.child=e.child,i.flags|=128,i=null):(Qa(),R=o.fallback,u=i.mode,o=oc({mode:"visible",children:o.children},u),R=Ds(R,u,s,null),R.flags|=2,o.return=i,R.return=i,o.sibling=R,i.child=o,Is(i,e.child,null,s),o=i.child,o.memoizedState=th(s),o.childLanes=eh(e,S,s),i.memoizedState=$f,i=Po(null,o));else if(Ka(i),Ih(R)){if(S=R.nextSibling&&R.nextSibling.dataset,S)var ot=S.dgst;S=ot,o=Error(a(419)),o.stack="",o.digest=S,Eo({value:o,source:null,stack:null}),i=ih(e,i,s)}else if(Sn||cr(e,i,s,!1),S=(s&e.childLanes)!==0,Sn||S){if(S=Je,S!==null&&(o=ui(S,s),o!==0&&o!==G.retryLane))throw G.retryLane=o,Cs(e,o),ri(S,e,o),Jf;zh(R)||gc(),i=ih(e,i,s)}else zh(R)?(i.flags|=192,i.child=e.child,i=null):(e=G.treeContext,en=Ui(R.nextSibling),Pn=i,be=!0,ka=null,Ci=!1,e!==null&&Cm(i,e),i=nh(i,o.children),i.flags|=4096);return i}return u?(Qa(),R=o.fallback,u=i.mode,G=e.child,ot=G.sibling,o=fa(G,{mode:"hidden",children:o.children}),o.subtreeFlags=G.subtreeFlags&65011712,ot!==null?R=fa(ot,R):(R=Ds(R,u,s,null),R.flags|=2),R.return=i,o.return=i,o.sibling=R,i.child=o,Po(null,o),o=i.child,R=e.child.memoizedState,R===null?R=th(s):(u=R.cachePool,u!==null?(G=vn._currentValue,u=u.parent!==G?{parent:G,pool:G}:u):u=Pm(),R={baseLanes:R.baseLanes|s,cachePool:u}),o.memoizedState=R,o.childLanes=eh(e,S,s),i.memoizedState=$f,Po(e.child,o)):(Ka(i),s=e.child,e=s.sibling,s=fa(s,{mode:"visible",children:o.children}),s.return=i,s.sibling=null,e!==null&&(S=i.deletions,S===null?(i.deletions=[e],i.flags|=16):S.push(e)),i.child=s,i.memoizedState=null,s)}function nh(e,i){return i=oc({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function oc(e,i){return e=di(22,e,null,i),e.lanes=0,e}function ih(e,i,s){return Is(i,e.child,null,s),e=nh(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function Z0(e,i,s){e.lanes|=i;var o=e.alternate;o!==null&&(o.lanes|=i),vf(e.return,i,s)}function ah(e,i,s,o,u,h){var S=e.memoizedState;S===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:s,tailMode:u,treeForkCount:h}:(S.isBackwards=i,S.rendering=null,S.renderingStartTime=0,S.last=o,S.tail=s,S.tailMode=u,S.treeForkCount=h)}function K0(e,i,s){var o=i.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var S=dn.current,R=(S&2)!==0;if(R?(S=S&1|2,i.flags|=128):S&=1,vt(dn,S),In(e,i,o,s),o=be?yo:0,!R&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Z0(e,s,i);else if(e.tag===19)Z0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(s=i.child,u=null;s!==null;)e=s.alternate,e!==null&&Kl(e)===null&&(u=s),s=s.sibling;s=u,s===null?(u=i.child,i.child=null):(u=s.sibling,s.sibling=null),ah(i,!1,u,s,h,o);break;case"backwards":case"unstable_legacy-backwards":for(s=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&Kl(e)===null){i.child=u;break}e=u.sibling,u.sibling=s,s=u,u=e}ah(i,!0,s,null,h,o);break;case"together":ah(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function _a(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),$a|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(cr(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=fa(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=fa(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function sh(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&Gl(e)))}function OS(e,i,s){switch(i.tag){case 3:pt(i,i.stateNode.containerInfo),Xa(i,vn,e.memoizedState.cache),Us();break;case 27:case 5:$t(i);break;case 4:pt(i,i.stateNode.containerInfo);break;case 10:Xa(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,Df(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(Ka(i),i.flags|=128,null):(s&i.child.childLanes)!==0?q0(e,i,s):(Ka(i),e=_a(e,i,s),e!==null?e.sibling:null);Ka(i);break;case 19:var u=(e.flags&128)!==0;if(o=(s&i.childLanes)!==0,o||(cr(e,i,s,!1),o=(s&i.childLanes)!==0),u){if(o)return K0(e,i,s);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),vt(dn,dn.current),o)break;return null;case 22:return i.lanes=0,G0(e,i,s,i.pendingProps);case 24:Xa(i,vn,e.memoizedState.cache)}return _a(e,i,s)}function Q0(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)Sn=!0;else{if(!sh(e,s)&&(i.flags&128)===0)return Sn=!1,OS(e,i,s);Sn=(e.flags&131072)!==0}else Sn=!1,be&&(i.flags&1048576)!==0&&wm(i,yo,i.index);switch(i.lanes=0,i.tag){case 16:t:{var o=i.pendingProps;if(e=Ps(i.elementType),i.type=e,typeof e=="function")uf(e)?(o=Fs(e,o),i.tag=1,i=X0(null,i,e,o,s)):(i.tag=0,i=jf(null,i,e,o,s));else{if(e!=null){var u=e.$$typeof;if(u===C){i.tag=11,i=B0(null,i,e,o,s);break t}else if(u===L){i.tag=14,i=F0(null,i,e,o,s);break t}}throw i=Z(e)||e,Error(a(306,i,""))}}return i;case 0:return jf(e,i,i.type,i.pendingProps,s);case 1:return o=i.type,u=Fs(o,i.pendingProps),X0(e,i,o,u,s);case 3:t:{if(pt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));o=i.pendingProps;var h=i.memoizedState;u=h.element,bf(e,i),Do(i,o,null,s);var S=i.memoizedState;if(o=S.cache,Xa(i,vn,o),o!==h.cache&&xf(i,[vn],s,!0),Co(),o=S.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:S.cache},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){i=Y0(e,i,o,s);break t}else if(o!==u){u=Ai(Error(a(424)),i),Eo(u),i=Y0(e,i,o,s);break t}else for(e=i.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,en=Ui(e.firstChild),Pn=i,be=!0,ka=null,Ci=!0,s=Gm(i,null,o,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling;else{if(Us(),o===u){i=_a(e,i,s);break t}In(e,i,o,s)}i=i.child}return i;case 26:return rc(e,i),e===null?(s=o_(i.type,null,i.pendingProps,null))?i.memoizedState=s:be||(s=i.type,e=i.pendingProps,o=Ec(Rt.current).createElement(s),o[mn]=i,o[On]=e,Bn(o,s,e),gn(o),i.stateNode=o):i.memoizedState=o_(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return $t(i),e===null&&be&&(o=i.stateNode=a_(i.type,i.pendingProps,Rt.current),Pn=i,Ci=!0,u=en,as(i.type)?(Bh=u,en=Ui(o.firstChild)):en=u),In(e,i,i.pendingProps.children,s),rc(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&be&&((u=o=en)&&(o=uM(o,i.type,i.pendingProps,Ci),o!==null?(i.stateNode=o,Pn=i,en=Ui(o.firstChild),Ci=!1,u=!0):u=!1),u||Wa(i)),$t(i),u=i.type,h=i.pendingProps,S=e!==null?e.memoizedProps:null,o=h.children,Nh(u,h)?o=null:S!==null&&Nh(u,S)&&(i.flags|=32),i.memoizedState!==null&&(u=Lf(e,i,bS,null,null,s),Qo._currentValue=u),rc(e,i),In(e,i,o,s),i.child;case 6:return e===null&&be&&((e=s=en)&&(s=fM(s,i.pendingProps,Ci),s!==null?(i.stateNode=s,Pn=i,en=null,e=!0):e=!1),e||Wa(i)),null;case 13:return q0(e,i,s);case 4:return pt(i,i.stateNode.containerInfo),o=i.pendingProps,e===null?i.child=Is(i,null,o,s):In(e,i,o,s),i.child;case 11:return B0(e,i,i.type,i.pendingProps,s);case 7:return In(e,i,i.pendingProps,s),i.child;case 8:return In(e,i,i.pendingProps.children,s),i.child;case 12:return In(e,i,i.pendingProps.children,s),i.child;case 10:return o=i.pendingProps,Xa(i,i.type,o.value),In(e,i,o.children,s),i.child;case 9:return u=i.type._context,o=i.pendingProps.children,Ns(i),u=zn(u),o=o(u),i.flags|=1,In(e,i,o,s),i.child;case 14:return F0(e,i,i.type,i.pendingProps,s);case 15:return H0(e,i,i.type,i.pendingProps,s);case 19:return K0(e,i,s);case 31:return NS(e,i,s);case 22:return G0(e,i,s,i.pendingProps);case 24:return Ns(i),o=zn(vn),e===null?(u=yf(),u===null&&(u=Je,h=Sf(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=s),u=h),i.memoizedState={parent:o,cache:u},Tf(i),Xa(i,vn,u)):((e.lanes&s)!==0&&(bf(e,i),Do(i,null,null,s),Co()),u=e.memoizedState,h=i.memoizedState,u.parent!==o?(u={parent:o,cache:o},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),Xa(i,vn,o)):(o=h.cache,Xa(i,vn,o),o!==u.cache&&xf(i,[vn],s,!0))),In(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function va(e){e.flags|=4}function rh(e,i,s,o,u){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Eg())e.flags|=8192;else throw zs=Xl,Ef}else e.flags&=-16777217}function J0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!h_(i))if(Eg())e.flags|=8192;else throw zs=Xl,Ef}function lc(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Tt():536870912,e.lanes|=i,Mr|=i)}function zo(e,i){if(!be)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var o=null;s!==null;)s.alternate!==null&&(o=s),s=s.sibling;o===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function nn(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,o=0;if(i)for(var u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=s,i}function PS(e,i,s){var o=i.pendingProps;switch(pf(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return nn(i),null;case 1:return nn(i),null;case 3:return s=i.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),pa(vn),At(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(lr(i)?va(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,gf())),nn(i),null;case 26:var u=i.type,h=i.memoizedState;return e===null?(va(i),h!==null?(nn(i),J0(i,h)):(nn(i),rh(i,u,null,o,s))):h?h!==e.memoizedState?(va(i),nn(i),J0(i,h)):(nn(i),i.flags&=-16777217):(e=e.memoizedProps,e!==o&&va(i),nn(i),rh(i,u,e,o,s)),null;case 27:if(zt(i),s=Rt.current,u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&va(i);else{if(!o){if(i.stateNode===null)throw Error(a(166));return nn(i),null}e=wt.current,lr(i)?Dm(i):(e=a_(u,o,s),i.stateNode=e,va(i))}return nn(i),null;case 5:if(zt(i),u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&va(i);else{if(!o){if(i.stateNode===null)throw Error(a(166));return nn(i),null}if(h=wt.current,lr(i))Dm(i);else{var S=Ec(Rt.current);switch(h){case 1:h=S.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=S.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=S.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?S.createElement("select",{is:o.is}):S.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?S.createElement(u,{is:o.is}):S.createElement(u)}}h[mn]=i,h[On]=o;t:for(S=i.child;S!==null;){if(S.tag===5||S.tag===6)h.appendChild(S.stateNode);else if(S.tag!==4&&S.tag!==27&&S.child!==null){S.child.return=S,S=S.child;continue}if(S===i)break t;for(;S.sibling===null;){if(S.return===null||S.return===i)break t;S=S.return}S.sibling.return=S.return,S=S.sibling}i.stateNode=h;t:switch(Bn(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&va(i)}}return nn(i),rh(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==o&&va(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(a(166));if(e=Rt.current,lr(i)){if(e=i.stateNode,s=i.memoizedProps,o=null,u=Pn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[mn]=i,e=!!(e.nodeValue===s||o!==null&&o.suppressHydrationWarning===!0||qg(e.nodeValue,s)),e||Wa(i,!0)}else e=Ec(e).createTextNode(o),e[mn]=i,i.stateNode=e}return nn(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(o=lr(i),s!==null){if(e===null){if(!o)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[mn]=i}else Us(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;nn(i),e=!1}else s=gf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(mi(i),i):(mi(i),null);if((i.flags&128)!==0)throw Error(a(558))}return nn(i),null;case 13:if(o=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=lr(i),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(a(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(a(317));u[mn]=i}else Us(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;nn(i),u=!1}else u=gf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(mi(i),i):(mi(i),null)}return mi(i),(i.flags&128)!==0?(i.lanes=s,i):(s=o!==null,e=e!==null&&e.memoizedState!==null,s&&(o=i.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),lc(i,i.updateQueue),nn(i),null);case 4:return At(),e===null&&wh(i.stateNode.containerInfo),nn(i),null;case 10:return pa(i.type),nn(i),null;case 19:if(et(dn),o=i.memoizedState,o===null)return nn(i),null;if(u=(i.flags&128)!==0,h=o.rendering,h===null)if(u)zo(o,!1);else{if(fn!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(h=Kl(e),h!==null){for(i.flags|=128,zo(o,!1),e=h.updateQueue,i.updateQueue=e,lc(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)bm(s,e),s=s.sibling;return vt(dn,dn.current&1|2),be&&ha(i,o.treeForkCount),i.child}e=e.sibling}o.tail!==null&&ze()>dc&&(i.flags|=128,u=!0,zo(o,!1),i.lanes=4194304)}else{if(!u)if(e=Kl(h),e!==null){if(i.flags|=128,u=!0,e=e.updateQueue,i.updateQueue=e,lc(i,e),zo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!be)return nn(i),null}else 2*ze()-o.renderingStartTime>dc&&s!==536870912&&(i.flags|=128,u=!0,zo(o,!1),i.lanes=4194304);o.isBackwards?(h.sibling=i.child,i.child=h):(e=o.last,e!==null?e.sibling=h:i.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=ze(),e.sibling=null,s=dn.current,vt(dn,u?s&1|2:s&1),be&&ha(i,o.treeForkCount),e):(nn(i),null);case 22:case 23:return mi(i),Cf(),o=i.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(s&536870912)!==0&&(i.flags&128)===0&&(nn(i),i.subtreeFlags&6&&(i.flags|=8192)):nn(i),s=i.updateQueue,s!==null&&lc(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==s&&(i.flags|=2048),e!==null&&et(Os),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),pa(vn),nn(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function zS(e,i){switch(pf(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return pa(vn),At(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return zt(i),null;case 31:if(i.memoizedState!==null){if(mi(i),i.alternate===null)throw Error(a(340));Us()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(mi(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));Us()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return et(dn),null;case 4:return At(),null;case 10:return pa(i.type),null;case 22:case 23:return mi(i),Cf(),e!==null&&et(Os),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return pa(vn),null;case 25:return null;default:return null}}function j0(e,i){switch(pf(i),i.tag){case 3:pa(vn),At();break;case 26:case 27:case 5:zt(i);break;case 4:At();break;case 31:i.memoizedState!==null&&mi(i);break;case 13:mi(i);break;case 19:et(dn);break;case 10:pa(i.type);break;case 22:case 23:mi(i),Cf(),e!==null&&et(Os);break;case 24:pa(vn)}}function Io(e,i){try{var s=i.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var u=o.next;s=u;do{if((s.tag&e)===e){o=void 0;var h=s.create,S=s.inst;o=h(),S.destroy=o}s=s.next}while(s!==u)}}catch(R){Be(i,i.return,R)}}function Ja(e,i,s){try{var o=i.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var S=o.inst,R=S.destroy;if(R!==void 0){S.destroy=void 0,u=i;var G=s,ot=R;try{ot()}catch(St){Be(u,G,St)}}}o=o.next}while(o!==h)}}catch(St){Be(i,i.return,St)}}function $0(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{km(i,s)}catch(o){Be(e,e.return,o)}}}function tg(e,i,s){s.props=Fs(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(o){Be(e,i,o)}}function Bo(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof s=="function"?e.refCleanup=s(o):s.current=o}}catch(u){Be(e,i,u)}}function Qi(e,i){var s=e.ref,o=e.refCleanup;if(s!==null)if(typeof o=="function")try{o()}catch(u){Be(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(u){Be(e,i,u)}else s.current=null}function eg(e){var i=e.type,s=e.memoizedProps,o=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&o.focus();break t;case"img":s.src?o.src=s.src:s.srcSet&&(o.srcset=s.srcSet)}}catch(u){Be(e,e.return,u)}}function oh(e,i,s){try{var o=e.stateNode;aM(o,e.type,s,i),o[On]=i}catch(u){Be(e,e.return,u)}}function ng(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&as(e.type)||e.tag===4}function lh(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||ng(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&as(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ch(e,i,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Ti));else if(o!==4&&(o===27&&as(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(ch(e,i,s),e=e.sibling;e!==null;)ch(e,i,s),e=e.sibling}function cc(e,i,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(o!==4&&(o===27&&as(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(cc(e,i,s),e=e.sibling;e!==null;)cc(e,i,s),e=e.sibling}function ig(e){var i=e.stateNode,s=e.memoizedProps;try{for(var o=e.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Bn(i,o,s),i[mn]=e,i[On]=s}catch(h){Be(e,e.return,h)}}var xa=!1,Mn=!1,uh=!1,ag=typeof WeakSet=="function"?WeakSet:Set,Un=null;function IS(e,i){if(e=e.containerInfo,Uh=Dc,e=gm(e),nf(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var o=s.getSelection&&s.getSelection();if(o&&o.rangeCount!==0){s=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{s.nodeType,h.nodeType}catch{s=null;break t}var S=0,R=-1,G=-1,ot=0,St=0,Et=e,ut=null;e:for(;;){for(var mt;Et!==s||u!==0&&Et.nodeType!==3||(R=S+u),Et!==h||o!==0&&Et.nodeType!==3||(G=S+o),Et.nodeType===3&&(S+=Et.nodeValue.length),(mt=Et.firstChild)!==null;)ut=Et,Et=mt;for(;;){if(Et===e)break e;if(ut===s&&++ot===u&&(R=S),ut===h&&++St===o&&(G=S),(mt=Et.nextSibling)!==null)break;Et=ut,ut=Et.parentNode}Et=mt}s=R===-1||G===-1?null:{start:R,end:G}}else s=null}s=s||{start:0,end:0}}else s=null;for(Lh={focusedElem:e,selectionRange:s},Dc=!1,Un=i;Un!==null;)if(i=Un,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Un=e;else for(;Un!==null;){switch(i=Un,h=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)u=e[s],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,s=i,u=h.memoizedProps,h=h.memoizedState,o=s.stateNode;try{var Zt=Fs(s.type,u);e=o.getSnapshotBeforeUpdate(Zt,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(ie){Be(s,s.return,ie)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)Ph(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ph(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,Un=e;break}Un=i.return}}function sg(e,i,s){var o=s.flags;switch(s.tag){case 0:case 11:case 15:Ma(e,s),o&4&&Io(5,s);break;case 1:if(Ma(e,s),o&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(S){Be(s,s.return,S)}else{var u=Fs(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(S){Be(s,s.return,S)}}o&64&&$0(s),o&512&&Bo(s,s.return);break;case 3:if(Ma(e,s),o&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{km(e,i)}catch(S){Be(s,s.return,S)}}break;case 27:i===null&&o&4&&ig(s);case 26:case 5:Ma(e,s),i===null&&o&4&&eg(s),o&512&&Bo(s,s.return);break;case 12:Ma(e,s);break;case 31:Ma(e,s),o&4&&lg(e,s);break;case 13:Ma(e,s),o&4&&cg(e,s),o&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=YS.bind(null,s),hM(e,s))));break;case 22:if(o=s.memoizedState!==null||xa,!o){i=i!==null&&i.memoizedState!==null||Mn,u=xa;var h=Mn;xa=o,(Mn=i)&&!h?ya(e,s,(s.subtreeFlags&8772)!==0):Ma(e,s),xa=u,Mn=h}break;case 30:break;default:Ma(e,s)}}function rg(e){var i=e.alternate;i!==null&&(e.alternate=null,rg(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&Ba(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var rn=null,ni=!1;function Sa(e,i,s){for(s=s.child;s!==null;)og(e,i,s),s=s.sibling}function og(e,i,s){if(xt&&typeof xt.onCommitFiberUnmount=="function")try{xt.onCommitFiberUnmount(_t,s)}catch{}switch(s.tag){case 26:Mn||Qi(s,i),Sa(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:Mn||Qi(s,i);var o=rn,u=ni;as(s.type)&&(rn=s.stateNode,ni=!1),Sa(e,i,s),qo(s.stateNode),rn=o,ni=u;break;case 5:Mn||Qi(s,i);case 6:if(o=rn,u=ni,rn=null,Sa(e,i,s),rn=o,ni=u,rn!==null)if(ni)try{(rn.nodeType===9?rn.body:rn.nodeName==="HTML"?rn.ownerDocument.body:rn).removeChild(s.stateNode)}catch(h){Be(s,i,h)}else try{rn.removeChild(s.stateNode)}catch(h){Be(s,i,h)}break;case 18:rn!==null&&(ni?(e=rn,$g(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Cr(e)):$g(rn,s.stateNode));break;case 4:o=rn,u=ni,rn=s.stateNode.containerInfo,ni=!0,Sa(e,i,s),rn=o,ni=u;break;case 0:case 11:case 14:case 15:Ja(2,s,i),Mn||Ja(4,s,i),Sa(e,i,s);break;case 1:Mn||(Qi(s,i),o=s.stateNode,typeof o.componentWillUnmount=="function"&&tg(s,i,o)),Sa(e,i,s);break;case 21:Sa(e,i,s);break;case 22:Mn=(o=Mn)||s.memoizedState!==null,Sa(e,i,s),Mn=o;break;default:Sa(e,i,s)}}function lg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Cr(e)}catch(s){Be(i,i.return,s)}}}function cg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Cr(e)}catch(s){Be(i,i.return,s)}}function BS(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new ag),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new ag),i;default:throw Error(a(435,e.tag))}}function uc(e,i){var s=BS(e);i.forEach(function(o){if(!s.has(o)){s.add(o);var u=qS.bind(null,e,o);o.then(u,u)}})}function ii(e,i){var s=i.deletions;if(s!==null)for(var o=0;o<s.length;o++){var u=s[o],h=e,S=i,R=S;t:for(;R!==null;){switch(R.tag){case 27:if(as(R.type)){rn=R.stateNode,ni=!1;break t}break;case 5:rn=R.stateNode,ni=!1;break t;case 3:case 4:rn=R.stateNode.containerInfo,ni=!0;break t}R=R.return}if(rn===null)throw Error(a(160));og(h,S,u),rn=null,ni=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)ug(i,e),i=i.sibling}var Fi=null;function ug(e,i){var s=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ii(i,e),ai(e),o&4&&(Ja(3,e,e.return),Io(3,e),Ja(5,e,e.return));break;case 1:ii(i,e),ai(e),o&512&&(Mn||s===null||Qi(s,s.return)),o&64&&xa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?o:s.concat(o))));break;case 26:var u=Fi;if(ii(i,e),ai(e),o&512&&(Mn||s===null||Qi(s,s.return)),o&4){var h=s!==null?s.memoizedState:null;if(o=e.memoizedState,s===null)if(o===null)if(e.stateNode===null){t:{o=e.type,s=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[Ia]||h[mn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),Bn(h,o,s),h[mn]=e,gn(h),o=h;break t;case"link":var S=u_("link","href",u).get(o+(s.href||""));if(S){for(var R=0;R<S.length;R++)if(h=S[R],h.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&h.getAttribute("rel")===(s.rel==null?null:s.rel)&&h.getAttribute("title")===(s.title==null?null:s.title)&&h.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){S.splice(R,1);break e}}h=u.createElement(o),Bn(h,o,s),u.head.appendChild(h);break;case"meta":if(S=u_("meta","content",u).get(o+(s.content||""))){for(R=0;R<S.length;R++)if(h=S[R],h.getAttribute("content")===(s.content==null?null:""+s.content)&&h.getAttribute("name")===(s.name==null?null:s.name)&&h.getAttribute("property")===(s.property==null?null:s.property)&&h.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&h.getAttribute("charset")===(s.charSet==null?null:s.charSet)){S.splice(R,1);break e}}h=u.createElement(o),Bn(h,o,s),u.head.appendChild(h);break;default:throw Error(a(468,o))}h[mn]=e,gn(h),o=h}e.stateNode=o}else f_(u,e.type,e.stateNode);else e.stateNode=c_(u,o,e.memoizedProps);else h!==o?(h===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):h.count--,o===null?f_(u,e.type,e.stateNode):c_(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&oh(e,e.memoizedProps,s.memoizedProps)}break;case 27:ii(i,e),ai(e),o&512&&(Mn||s===null||Qi(s,s.return)),s!==null&&o&4&&oh(e,e.memoizedProps,s.memoizedProps);break;case 5:if(ii(i,e),ai(e),o&512&&(Mn||s===null||Qi(s,s.return)),e.flags&32){u=e.stateNode;try{Kn(u,"")}catch(Zt){Be(e,e.return,Zt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,oh(e,u,s!==null?s.memoizedProps:u)),o&1024&&(uh=!0);break;case 6:if(ii(i,e),ai(e),o&4){if(e.stateNode===null)throw Error(a(162));o=e.memoizedProps,s=e.stateNode;try{s.nodeValue=o}catch(Zt){Be(e,e.return,Zt)}}break;case 3:if(Ac=null,u=Fi,Fi=Tc(i.containerInfo),ii(i,e),Fi=u,ai(e),o&4&&s!==null&&s.memoizedState.isDehydrated)try{Cr(i.containerInfo)}catch(Zt){Be(e,e.return,Zt)}uh&&(uh=!1,fg(e));break;case 4:o=Fi,Fi=Tc(e.stateNode.containerInfo),ii(i,e),ai(e),Fi=o;break;case 12:ii(i,e),ai(e);break;case 31:ii(i,e),ai(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,uc(e,o)));break;case 13:ii(i,e),ai(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(hc=ze()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,uc(e,o)));break;case 22:u=e.memoizedState!==null;var G=s!==null&&s.memoizedState!==null,ot=xa,St=Mn;if(xa=ot||u,Mn=St||G,ii(i,e),Mn=St,xa=ot,ai(e),o&8192)t:for(i=e.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(s===null||G||xa||Mn||Hs(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){G=s=i;try{if(h=G.stateNode,u)S=h.style,typeof S.setProperty=="function"?S.setProperty("display","none","important"):S.display="none";else{R=G.stateNode;var Et=G.memoizedProps.style,ut=Et!=null&&Et.hasOwnProperty("display")?Et.display:null;R.style.display=ut==null||typeof ut=="boolean"?"":(""+ut).trim()}}catch(Zt){Be(G,G.return,Zt)}}}else if(i.tag===6){if(s===null){G=i;try{G.stateNode.nodeValue=u?"":G.memoizedProps}catch(Zt){Be(G,G.return,Zt)}}}else if(i.tag===18){if(s===null){G=i;try{var mt=G.stateNode;u?t_(mt,!0):t_(G.stateNode,!1)}catch(Zt){Be(G,G.return,Zt)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=e.updateQueue,o!==null&&(s=o.retryQueue,s!==null&&(o.retryQueue=null,uc(e,s))));break;case 19:ii(i,e),ai(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,uc(e,o)));break;case 30:break;case 21:break;default:ii(i,e),ai(e)}}function ai(e){var i=e.flags;if(i&2){try{for(var s,o=e.return;o!==null;){if(ng(o)){s=o;break}o=o.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var u=s.stateNode,h=lh(e);cc(e,h,u);break;case 5:var S=s.stateNode;s.flags&32&&(Kn(S,""),s.flags&=-33);var R=lh(e);cc(e,R,S);break;case 3:case 4:var G=s.stateNode.containerInfo,ot=lh(e);ch(e,ot,G);break;default:throw Error(a(161))}}catch(St){Be(e,e.return,St)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function fg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;fg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function Ma(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)sg(e,i.alternate,i),i=i.sibling}function Hs(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Ja(4,i,i.return),Hs(i);break;case 1:Qi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&tg(i,i.return,s),Hs(i);break;case 27:qo(i.stateNode);case 26:case 5:Qi(i,i.return),Hs(i);break;case 22:i.memoizedState===null&&Hs(i);break;case 30:Hs(i);break;default:Hs(i)}e=e.sibling}}function ya(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,u=e,h=i,S=h.flags;switch(h.tag){case 0:case 11:case 15:ya(u,h,s),Io(4,h);break;case 1:if(ya(u,h,s),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ot){Be(o,o.return,ot)}if(o=h,u=o.updateQueue,u!==null){var R=o.stateNode;try{var G=u.shared.hiddenCallbacks;if(G!==null)for(u.shared.hiddenCallbacks=null,u=0;u<G.length;u++)Vm(G[u],R)}catch(ot){Be(o,o.return,ot)}}s&&S&64&&$0(h),Bo(h,h.return);break;case 27:ig(h);case 26:case 5:ya(u,h,s),s&&o===null&&S&4&&eg(h),Bo(h,h.return);break;case 12:ya(u,h,s);break;case 31:ya(u,h,s),s&&S&4&&lg(u,h);break;case 13:ya(u,h,s),s&&S&4&&cg(u,h);break;case 22:h.memoizedState===null&&ya(u,h,s),Bo(h,h.return);break;case 30:break;default:ya(u,h,s)}i=i.sibling}}function fh(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&To(s))}function hh(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&To(e))}function Hi(e,i,s,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)hg(e,i,s,o),i=i.sibling}function hg(e,i,s,o){var u=i.flags;switch(i.tag){case 0:case 11:case 15:Hi(e,i,s,o),u&2048&&Io(9,i);break;case 1:Hi(e,i,s,o);break;case 3:Hi(e,i,s,o),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&To(e)));break;case 12:if(u&2048){Hi(e,i,s,o),e=i.stateNode;try{var h=i.memoizedProps,S=h.id,R=h.onPostCommit;typeof R=="function"&&R(S,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(G){Be(i,i.return,G)}}else Hi(e,i,s,o);break;case 31:Hi(e,i,s,o);break;case 13:Hi(e,i,s,o);break;case 23:break;case 22:h=i.stateNode,S=i.alternate,i.memoizedState!==null?h._visibility&2?Hi(e,i,s,o):Fo(e,i):h._visibility&2?Hi(e,i,s,o):(h._visibility|=2,vr(e,i,s,o,(i.subtreeFlags&10256)!==0||!1)),u&2048&&fh(S,i);break;case 24:Hi(e,i,s,o),u&2048&&hh(i.alternate,i);break;default:Hi(e,i,s,o)}}function vr(e,i,s,o,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var h=e,S=i,R=s,G=o,ot=S.flags;switch(S.tag){case 0:case 11:case 15:vr(h,S,R,G,u),Io(8,S);break;case 23:break;case 22:var St=S.stateNode;S.memoizedState!==null?St._visibility&2?vr(h,S,R,G,u):Fo(h,S):(St._visibility|=2,vr(h,S,R,G,u)),u&&ot&2048&&fh(S.alternate,S);break;case 24:vr(h,S,R,G,u),u&&ot&2048&&hh(S.alternate,S);break;default:vr(h,S,R,G,u)}i=i.sibling}}function Fo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,o=i,u=o.flags;switch(o.tag){case 22:Fo(s,o),u&2048&&fh(o.alternate,o);break;case 24:Fo(s,o),u&2048&&hh(o.alternate,o);break;default:Fo(s,o)}i=i.sibling}}var Ho=8192;function xr(e,i,s){if(e.subtreeFlags&Ho)for(e=e.child;e!==null;)dg(e,i,s),e=e.sibling}function dg(e,i,s){switch(e.tag){case 26:xr(e,i,s),e.flags&Ho&&e.memoizedState!==null&&TM(s,Fi,e.memoizedState,e.memoizedProps);break;case 5:xr(e,i,s);break;case 3:case 4:var o=Fi;Fi=Tc(e.stateNode.containerInfo),xr(e,i,s),Fi=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Ho,Ho=16777216,xr(e,i,s),Ho=o):xr(e,i,s));break;default:xr(e,i,s)}}function pg(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Go(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];Un=o,gg(o,e)}pg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)mg(e),e=e.sibling}function mg(e){switch(e.tag){case 0:case 11:case 15:Go(e),e.flags&2048&&Ja(9,e,e.return);break;case 3:Go(e);break;case 12:Go(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,fc(e)):Go(e);break;default:Go(e)}}function fc(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];Un=o,gg(o,e)}pg(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Ja(8,i,i.return),fc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,fc(i));break;default:fc(i)}e=e.sibling}}function gg(e,i){for(;Un!==null;){var s=Un;switch(s.tag){case 0:case 11:case 15:Ja(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var o=s.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:To(s.memoizedState.cache)}if(o=s.child,o!==null)o.return=s,Un=o;else t:for(s=e;Un!==null;){o=Un;var u=o.sibling,h=o.return;if(rg(o),o===s){Un=null;break t}if(u!==null){u.return=h,Un=u;break t}Un=h}}}var FS={getCacheForType:function(e){var i=zn(vn),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return zn(vn).controller.signal}},HS=typeof WeakMap=="function"?WeakMap:Map,Oe=0,Je=null,xe=null,Ee=0,Ie=0,gi=null,ja=!1,Sr=!1,dh=!1,Ea=0,fn=0,$a=0,Gs=0,ph=0,_i=0,Mr=0,Vo=null,si=null,mh=!1,hc=0,_g=0,dc=1/0,pc=null,ts=null,bn=0,es=null,yr=null,Ta=0,gh=0,_h=null,vg=null,ko=0,vh=null;function vi(){return(Oe&2)!==0&&Ee!==0?Ee&-Ee:B.T!==null?Th():uo()}function xg(){if(_i===0)if((Ee&536870912)===0||be){var e=oe;oe<<=1,(oe&3932160)===0&&(oe=262144),_i=e}else _i=536870912;return e=pi.current,e!==null&&(e.flags|=32),_i}function ri(e,i,s){(e===Je&&(Ie===2||Ie===9)||e.cancelPendingCommit!==null)&&(Er(e,0),ns(e,Ee,_i,!1)),Yt(e,s),((Oe&2)===0||e!==Je)&&(e===Je&&((Oe&2)===0&&(Gs|=s),fn===4&&ns(e,Ee,_i,!1)),Ji(e))}function Sg(e,i,s){if((Oe&6)!==0)throw Error(a(327));var o=!s&&(i&127)===0&&(i&e.expiredLanes)===0||Lt(e,i),u=o?kS(e,i):Sh(e,i,!0),h=o;do{if(u===0){Sr&&!o&&ns(e,i,0,!1);break}else{if(s=e.current.alternate,h&&!GS(s)){u=Sh(e,i,!1),h=!1;continue}if(u===2){if(h=i,e.errorRecoveryDisabledLanes&h)var S=0;else S=e.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){i=S;t:{var R=e;u=Vo;var G=R.current.memoizedState.isDehydrated;if(G&&(Er(R,S).flags|=256),S=Sh(R,S,!1),S!==2){if(dh&&!G){R.errorRecoveryDisabledLanes|=h,Gs|=h,u=4;break t}h=si,si=u,h!==null&&(si===null?si=h:si.push.apply(si,h))}u=S}if(h=!1,u!==2)continue}}if(u===1){Er(e,0),ns(e,i,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:ns(o,i,_i,!ja);break t;case 2:si=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(u=hc+300-ze(),10<u)){if(ns(o,i,_i,!ja),Mt(o,0,!0)!==0)break t;Ta=i,o.timeoutHandle=Jg(Mg.bind(null,o,s,si,pc,mh,i,_i,Gs,Mr,ja,h,"Throttled",-0,0),u);break t}Mg(o,s,si,pc,mh,i,_i,Gs,Mr,ja,h,null,-0,0)}}break}while(!0);Ji(e)}function Mg(e,i,s,o,u,h,S,R,G,ot,St,Et,ut,mt){if(e.timeoutHandle=-1,Et=i.subtreeFlags,Et&8192||(Et&16785408)===16785408){Et={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ti},dg(i,h,Et);var Zt=(h&62914560)===h?hc-ze():(h&4194048)===h?_g-ze():0;if(Zt=bM(Et,Zt),Zt!==null){Ta=h,e.cancelPendingCommit=Zt(Cg.bind(null,e,i,h,s,o,u,S,R,G,St,Et,null,ut,mt)),ns(e,h,S,!ot);return}}Cg(e,i,h,s,o,u,S,R,G)}function GS(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var o=0;o<s.length;o++){var u=s[o],h=u.getSnapshot;u=u.value;try{if(!hi(h(),u))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ns(e,i,s,o){i&=~ph,i&=~Gs,e.suspendedLanes|=i,e.pingedLanes&=~i,o&&(e.warmLanes|=i),o=e.expirationTimes;for(var u=i;0<u;){var h=31-kt(u),S=1<<h;o[h]=-1,u&=~S}s!==0&&Re(e,s,i)}function mc(){return(Oe&6)===0?(Wo(0),!1):!0}function xh(){if(xe!==null){if(Ie===0)var e=xe.return;else e=xe,da=Ls=null,Pf(e),dr=null,Ao=0,e=xe;for(;e!==null;)j0(e.alternate,e),e=e.return;xe=null}}function Er(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,oM(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),Ta=0,xh(),Je=e,xe=s=fa(e.current,null),Ee=i,Ie=0,gi=null,ja=!1,Sr=Lt(e,i),dh=!1,Mr=_i=ph=Gs=$a=fn=0,si=Vo=null,mh=!1,(i&8)!==0&&(i|=i&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=i;0<o;){var u=31-kt(o),h=1<<u;i|=e[u],o&=~h}return Ea=i,zl(),s}function yg(e,i){he=null,B.H=Oo,i===hr||i===Wl?(i=Bm(),Ie=3):i===Ef?(i=Bm(),Ie=4):Ie=i===Jf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,gi=i,xe===null&&(fn=1,ac(e,Ai(i,e.current)))}function Eg(){var e=pi.current;return e===null?!0:(Ee&4194048)===Ee?Di===null:(Ee&62914560)===Ee||(Ee&536870912)!==0?e===Di:!1}function Tg(){var e=B.H;return B.H=Oo,e===null?Oo:e}function bg(){var e=B.A;return B.A=FS,e}function gc(){fn=4,ja||(Ee&4194048)!==Ee&&pi.current!==null||(Sr=!0),($a&134217727)===0&&(Gs&134217727)===0||Je===null||ns(Je,Ee,_i,!1)}function Sh(e,i,s){var o=Oe;Oe|=2;var u=Tg(),h=bg();(Je!==e||Ee!==i)&&(pc=null,Er(e,i)),i=!1;var S=fn;t:do try{if(Ie!==0&&xe!==null){var R=xe,G=gi;switch(Ie){case 8:xh(),S=6;break t;case 3:case 2:case 9:case 6:pi.current===null&&(i=!0);var ot=Ie;if(Ie=0,gi=null,Tr(e,R,G,ot),s&&Sr){S=0;break t}break;default:ot=Ie,Ie=0,gi=null,Tr(e,R,G,ot)}}VS(),S=fn;break}catch(St){yg(e,St)}while(!0);return i&&e.shellSuspendCounter++,da=Ls=null,Oe=o,B.H=u,B.A=h,xe===null&&(Je=null,Ee=0,zl()),S}function VS(){for(;xe!==null;)Ag(xe)}function kS(e,i){var s=Oe;Oe|=2;var o=Tg(),u=bg();Je!==e||Ee!==i?(pc=null,dc=ze()+500,Er(e,i)):Sr=Lt(e,i);t:do try{if(Ie!==0&&xe!==null){i=xe;var h=gi;e:switch(Ie){case 1:Ie=0,gi=null,Tr(e,i,h,1);break;case 2:case 9:if(zm(h)){Ie=0,gi=null,Rg(i);break}i=function(){Ie!==2&&Ie!==9||Je!==e||(Ie=7),Ji(e)},h.then(i,i);break t;case 3:Ie=7;break t;case 4:Ie=5;break t;case 7:zm(h)?(Ie=0,gi=null,Rg(i)):(Ie=0,gi=null,Tr(e,i,h,7));break;case 5:var S=null;switch(xe.tag){case 26:S=xe.memoizedState;case 5:case 27:var R=xe;if(S?h_(S):R.stateNode.complete){Ie=0,gi=null;var G=R.sibling;if(G!==null)xe=G;else{var ot=R.return;ot!==null?(xe=ot,_c(ot)):xe=null}break e}}Ie=0,gi=null,Tr(e,i,h,5);break;case 6:Ie=0,gi=null,Tr(e,i,h,6);break;case 8:xh(),fn=6;break t;default:throw Error(a(462))}}WS();break}catch(St){yg(e,St)}while(!0);return da=Ls=null,B.H=o,B.A=u,Oe=s,xe!==null?0:(Je=null,Ee=0,zl(),fn)}function WS(){for(;xe!==null&&!cn();)Ag(xe)}function Ag(e){var i=Q0(e.alternate,e,Ea);e.memoizedProps=e.pendingProps,i===null?_c(e):xe=i}function Rg(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=W0(s,i,i.pendingProps,i.type,void 0,Ee);break;case 11:i=W0(s,i,i.pendingProps,i.type.render,i.ref,Ee);break;case 5:Pf(i);default:j0(s,i),i=xe=bm(i,Ea),i=Q0(s,i,Ea)}e.memoizedProps=e.pendingProps,i===null?_c(e):xe=i}function Tr(e,i,s,o){da=Ls=null,Pf(i),dr=null,Ao=0;var u=i.return;try{if(LS(e,u,i,s,Ee)){fn=1,ac(e,Ai(s,e.current)),xe=null;return}}catch(h){if(u!==null)throw xe=u,h;fn=1,ac(e,Ai(s,e.current)),xe=null;return}i.flags&32768?(be||o===1?e=!0:Sr||(Ee&536870912)!==0?e=!1:(ja=e=!0,(o===2||o===9||o===3||o===6)&&(o=pi.current,o!==null&&o.tag===13&&(o.flags|=16384))),wg(i,e)):_c(i)}function _c(e){var i=e;do{if((i.flags&32768)!==0){wg(i,ja);return}e=i.return;var s=PS(i.alternate,i,Ea);if(s!==null){xe=s;return}if(i=i.sibling,i!==null){xe=i;return}xe=i=e}while(i!==null);fn===0&&(fn=5)}function wg(e,i){do{var s=zS(e.alternate,e);if(s!==null){s.flags&=32767,xe=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){xe=e;return}xe=e=s}while(e!==null);fn=6,xe=null}function Cg(e,i,s,o,u,h,S,R,G){e.cancelPendingCommit=null;do vc();while(bn!==0);if((Oe&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(h=i.lanes|i.childLanes,h|=lf,Ge(e,s,h,S,R,G),e===Je&&(xe=Je=null,Ee=0),yr=i,es=e,Ta=s,gh=h,_h=u,vg=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,ZS(tt,function(){return Og(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=B.T,B.T=null,u=V.p,V.p=2,S=Oe,Oe|=4;try{IS(e,i,s)}finally{Oe=S,V.p=u,B.T=o}}bn=1,Dg(),Ug(),Lg()}}function Dg(){if(bn===1){bn=0;var e=es,i=yr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=B.T,B.T=null;var o=V.p;V.p=2;var u=Oe;Oe|=4;try{ug(i,e);var h=Lh,S=gm(e.containerInfo),R=h.focusedElem,G=h.selectionRange;if(S!==R&&R&&R.ownerDocument&&mm(R.ownerDocument.documentElement,R)){if(G!==null&&nf(R)){var ot=G.start,St=G.end;if(St===void 0&&(St=ot),"selectionStart"in R)R.selectionStart=ot,R.selectionEnd=Math.min(St,R.value.length);else{var Et=R.ownerDocument||document,ut=Et&&Et.defaultView||window;if(ut.getSelection){var mt=ut.getSelection(),Zt=R.textContent.length,ie=Math.min(G.start,Zt),Xe=G.end===void 0?ie:Math.min(G.end,Zt);!mt.extend&&ie>Xe&&(S=Xe,Xe=ie,ie=S);var j=pm(R,ie),X=pm(R,Xe);if(j&&X&&(mt.rangeCount!==1||mt.anchorNode!==j.node||mt.anchorOffset!==j.offset||mt.focusNode!==X.node||mt.focusOffset!==X.offset)){var rt=Et.createRange();rt.setStart(j.node,j.offset),mt.removeAllRanges(),ie>Xe?(mt.addRange(rt),mt.extend(X.node,X.offset)):(rt.setEnd(X.node,X.offset),mt.addRange(rt))}}}}for(Et=[],mt=R;mt=mt.parentNode;)mt.nodeType===1&&Et.push({element:mt,left:mt.scrollLeft,top:mt.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<Et.length;R++){var yt=Et[R];yt.element.scrollLeft=yt.left,yt.element.scrollTop=yt.top}}Dc=!!Uh,Lh=Uh=null}finally{Oe=u,V.p=o,B.T=s}}e.current=i,bn=2}}function Ug(){if(bn===2){bn=0;var e=es,i=yr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=B.T,B.T=null;var o=V.p;V.p=2;var u=Oe;Oe|=4;try{sg(e,i.alternate,i)}finally{Oe=u,V.p=o,B.T=s}}bn=3}}function Lg(){if(bn===4||bn===3){bn=0,q();var e=es,i=yr,s=Ta,o=vg;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?bn=5:(bn=0,yr=es=null,Ng(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(ts=null),co(s),i=i.stateNode,xt&&typeof xt.onCommitFiberRoot=="function")try{xt.onCommitFiberRoot(_t,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=B.T,u=V.p,V.p=2,B.T=null;try{for(var h=e.onRecoverableError,S=0;S<o.length;S++){var R=o[S];h(R.value,{componentStack:R.stack})}}finally{B.T=i,V.p=u}}(Ta&3)!==0&&vc(),Ji(e),u=e.pendingLanes,(s&261930)!==0&&(u&42)!==0?e===vh?ko++:(ko=0,vh=e):ko=0,Wo(0)}}function Ng(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,To(i)))}function vc(){return Dg(),Ug(),Lg(),Og()}function Og(){if(bn!==5)return!1;var e=es,i=gh;gh=0;var s=co(Ta),o=B.T,u=V.p;try{V.p=32>s?32:s,B.T=null,s=_h,_h=null;var h=es,S=Ta;if(bn=0,yr=es=null,Ta=0,(Oe&6)!==0)throw Error(a(331));var R=Oe;if(Oe|=4,mg(h.current),hg(h,h.current,S,s),Oe=R,Wo(0,!1),xt&&typeof xt.onPostCommitFiberRoot=="function")try{xt.onPostCommitFiberRoot(_t,h)}catch{}return!0}finally{V.p=u,B.T=o,Ng(e,i)}}function Pg(e,i,s){i=Ai(s,i),i=Qf(e.stateNode,i,2),e=Za(e,i,2),e!==null&&(Yt(e,2),Ji(e))}function Be(e,i,s){if(e.tag===3)Pg(e,e,s);else for(;i!==null;){if(i.tag===3){Pg(i,e,s);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(ts===null||!ts.has(o))){e=Ai(s,e),s=z0(2),o=Za(i,s,2),o!==null&&(I0(s,o,i,e),Yt(o,2),Ji(o));break}}i=i.return}}function Mh(e,i,s){var o=e.pingCache;if(o===null){o=e.pingCache=new HS;var u=new Set;o.set(i,u)}else u=o.get(i),u===void 0&&(u=new Set,o.set(i,u));u.has(s)||(dh=!0,u.add(s),e=XS.bind(null,e,i,s),i.then(e,e))}function XS(e,i,s){var o=e.pingCache;o!==null&&o.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Je===e&&(Ee&s)===s&&(fn===4||fn===3&&(Ee&62914560)===Ee&&300>ze()-hc?(Oe&2)===0&&Er(e,0):ph|=s,Mr===Ee&&(Mr=0)),Ji(e)}function zg(e,i){i===0&&(i=Tt()),e=Cs(e,i),e!==null&&(Yt(e,i),Ji(e))}function YS(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),zg(e,s)}function qS(e,i){var s=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(s=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(a(314))}o!==null&&o.delete(i),zg(e,s)}function ZS(e,i){return Dn(e,i)}var xc=null,br=null,yh=!1,Sc=!1,Eh=!1,is=0;function Ji(e){e!==br&&e.next===null&&(br===null?xc=br=e:br=br.next=e),Sc=!0,yh||(yh=!0,QS())}function Wo(e,i){if(!Eh&&Sc){Eh=!0;do for(var s=!1,o=xc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var S=o.suspendedLanes,R=o.pingedLanes;h=(1<<31-kt(42|e)+1)-1,h&=u&~(S&~R),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(s=!0,Hg(o,h))}else h=Ee,h=Mt(o,o===Je?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||Lt(o,h)||(s=!0,Hg(o,h));o=o.next}while(s);Eh=!1}}function KS(){Ig()}function Ig(){Sc=yh=!1;var e=0;is!==0&&rM()&&(e=is);for(var i=ze(),s=null,o=xc;o!==null;){var u=o.next,h=Bg(o,i);h===0?(o.next=null,s===null?xc=u:s.next=u,u===null&&(br=s)):(s=o,(e!==0||(h&3)!==0)&&(Sc=!0)),o=u}bn!==0&&bn!==5||Wo(e),is!==0&&(is=0)}function Bg(e,i){for(var s=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var S=31-kt(h),R=1<<S,G=u[S];G===-1?((R&s)===0||(R&o)!==0)&&(u[S]=Ht(R,i)):G<=i&&(e.expiredLanes|=R),h&=~R}if(i=Je,s=Ee,s=Mt(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,s===0||e===i&&(Ie===2||Ie===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&Ke(o),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||Lt(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(o!==null&&Ke(o),co(s)){case 2:case 8:s=T;break;case 32:s=tt;break;case 268435456:s=gt;break;default:s=tt}return o=Fg.bind(null,e),s=Dn(s,o),e.callbackPriority=i,e.callbackNode=s,i}return o!==null&&o!==null&&Ke(o),e.callbackPriority=2,e.callbackNode=null,2}function Fg(e,i){if(bn!==0&&bn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(vc()&&e.callbackNode!==s)return null;var o=Ee;return o=Mt(e,e===Je?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(Sg(e,o,i),Bg(e,ze()),e.callbackNode!=null&&e.callbackNode===s?Fg.bind(null,e):null)}function Hg(e,i){if(vc())return null;Sg(e,i,!0)}function QS(){lM(function(){(Oe&6)!==0?Dn(I,KS):Ig()})}function Th(){if(is===0){var e=ur;e===0&&(e=te,te<<=1,(te&261888)===0&&(te=256)),is=e}return is}function Gg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ii(""+e)}function Vg(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function JS(e,i,s,o,u){if(i==="submit"&&s&&s.stateNode===u){var h=Gg((u[On]||null).action),S=o.submitter;S&&(i=(i=S[On]||null)?Gg(i.formAction):S.getAttribute("formAction"),i!==null&&(h=i,S=null));var R=new Ll("action","action",null,o,u);e.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(is!==0){var G=S?Vg(u,S):new FormData(u);Wf(s,{pending:!0,data:G,method:u.method,action:h},null,G)}}else typeof h=="function"&&(R.preventDefault(),G=S?Vg(u,S):new FormData(u),Wf(s,{pending:!0,data:G,method:u.method,action:h},h,G))},currentTarget:u}]})}}for(var bh=0;bh<of.length;bh++){var Ah=of[bh],jS=Ah.toLowerCase(),$S=Ah[0].toUpperCase()+Ah.slice(1);Bi(jS,"on"+$S)}Bi(xm,"onAnimationEnd"),Bi(Sm,"onAnimationIteration"),Bi(Mm,"onAnimationStart"),Bi("dblclick","onDoubleClick"),Bi("focusin","onFocus"),Bi("focusout","onBlur"),Bi(mS,"onTransitionRun"),Bi(gS,"onTransitionStart"),Bi(_S,"onTransitionCancel"),Bi(ym,"onTransitionEnd"),W("onMouseEnter",["mouseout","mouseover"]),W("onMouseLeave",["mouseout","mouseover"]),W("onPointerEnter",["pointerout","pointerover"]),W("onPointerLeave",["pointerout","pointerover"]),A("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),A("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),A("onBeforeInput",["compositionend","keypress","textInput","paste"]),A("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),A("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),A("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),tM=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xo));function kg(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var o=e[s],u=o.event;o=o.listeners;t:{var h=void 0;if(i)for(var S=o.length-1;0<=S;S--){var R=o[S],G=R.instance,ot=R.currentTarget;if(R=R.listener,G!==h&&u.isPropagationStopped())break t;h=R,u.currentTarget=ot;try{h(u)}catch(St){Pl(St)}u.currentTarget=null,h=G}else for(S=0;S<o.length;S++){if(R=o[S],G=R.instance,ot=R.currentTarget,R=R.listener,G!==h&&u.isPropagationStopped())break t;h=R,u.currentTarget=ot;try{h(u)}catch(St){Pl(St)}u.currentTarget=null,h=G}}}}function Se(e,i){var s=i[Es];s===void 0&&(s=i[Es]=new Set);var o=e+"__bubble";s.has(o)||(Wg(i,e,2,!1),s.add(o))}function Rh(e,i,s){var o=0;i&&(o|=4),Wg(s,e,o,i)}var Mc="_reactListening"+Math.random().toString(36).slice(2);function wh(e){if(!e[Mc]){e[Mc]=!0,wl.forEach(function(s){s!=="selectionchange"&&(tM.has(s)||Rh(s,!1,e),Rh(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[Mc]||(i[Mc]=!0,Rh("selectionchange",!1,i))}}function Wg(e,i,s,o){switch(x_(i)){case 2:var u=wM;break;case 8:u=CM;break;default:u=kh}s=u.bind(null,i,s,e),u=void 0,!qu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(i,s,{capture:!0,passive:u}):e.addEventListener(i,s,!0):u!==void 0?e.addEventListener(i,s,{passive:u}):e.addEventListener(i,s,!1)}function Ch(e,i,s,o,u){var h=o;if((i&1)===0&&(i&2)===0&&o!==null)t:for(;;){if(o===null)return;var S=o.tag;if(S===3||S===4){var R=o.stateNode.containerInfo;if(R===u)break;if(S===4)for(S=o.return;S!==null;){var G=S.tag;if((G===3||G===4)&&S.stateNode.containerInfo===u)return;S=S.return}for(;R!==null;){if(S=la(R),S===null)return;if(G=S.tag,G===5||G===6||G===26||G===27){o=h=S;continue t}R=R.parentNode}}o=o.return}Kp(function(){var ot=h,St=Xu(s),Et=[];t:{var ut=Em.get(e);if(ut!==void 0){var mt=Ll,Zt=e;switch(e){case"keypress":if(Dl(s)===0)break t;case"keydown":case"keyup":mt=qx;break;case"focusin":Zt="focus",mt=Ju;break;case"focusout":Zt="blur",mt=Ju;break;case"beforeblur":case"afterblur":mt=Ju;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":mt=jp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":mt=Px;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":mt=Qx;break;case xm:case Sm:case Mm:mt=Bx;break;case ym:mt=jx;break;case"scroll":case"scrollend":mt=Nx;break;case"wheel":mt=tS;break;case"copy":case"cut":case"paste":mt=Hx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":mt=tm;break;case"toggle":case"beforetoggle":mt=nS}var ie=(i&4)!==0,Xe=!ie&&(e==="scroll"||e==="scrollend"),j=ie?ut!==null?ut+"Capture":null:ut;ie=[];for(var X=ot,rt;X!==null;){var yt=X;if(rt=yt.stateNode,yt=yt.tag,yt!==5&&yt!==26&&yt!==27||rt===null||j===null||(yt=ho(X,j),yt!=null&&ie.push(Yo(X,yt,rt))),Xe)break;X=X.return}0<ie.length&&(ut=new mt(ut,Zt,null,s,St),Et.push({event:ut,listeners:ie}))}}if((i&7)===0){t:{if(ut=e==="mouseover"||e==="pointerover",mt=e==="mouseout"||e==="pointerout",ut&&s!==Wu&&(Zt=s.relatedTarget||s.fromElement)&&(la(Zt)||Zt[ti]))break t;if((mt||ut)&&(ut=St.window===St?St:(ut=St.ownerDocument)?ut.defaultView||ut.parentWindow:window,mt?(Zt=s.relatedTarget||s.toElement,mt=ot,Zt=Zt?la(Zt):null,Zt!==null&&(Xe=c(Zt),ie=Zt.tag,Zt!==Xe||ie!==5&&ie!==27&&ie!==6)&&(Zt=null)):(mt=null,Zt=ot),mt!==Zt)){if(ie=jp,yt="onMouseLeave",j="onMouseEnter",X="mouse",(e==="pointerout"||e==="pointerover")&&(ie=tm,yt="onPointerLeave",j="onPointerEnter",X="pointer"),Xe=mt==null?ut:bs(mt),rt=Zt==null?ut:bs(Zt),ut=new ie(yt,X+"leave",mt,s,St),ut.target=Xe,ut.relatedTarget=rt,yt=null,la(St)===ot&&(ie=new ie(j,X+"enter",Zt,s,St),ie.target=rt,ie.relatedTarget=Xe,yt=ie),Xe=yt,mt&&Zt)e:{for(ie=eM,j=mt,X=Zt,rt=0,yt=j;yt;yt=ie(yt))rt++;yt=0;for(var ee=X;ee;ee=ie(ee))yt++;for(;0<rt-yt;)j=ie(j),rt--;for(;0<yt-rt;)X=ie(X),yt--;for(;rt--;){if(j===X||X!==null&&j===X.alternate){ie=j;break e}j=ie(j),X=ie(X)}ie=null}else ie=null;mt!==null&&Xg(Et,ut,mt,ie,!1),Zt!==null&&Xe!==null&&Xg(Et,Xe,Zt,ie,!0)}}t:{if(ut=ot?bs(ot):window,mt=ut.nodeName&&ut.nodeName.toLowerCase(),mt==="select"||mt==="input"&&ut.type==="file")var De=lm;else if(rm(ut))if(cm)De=hS;else{De=uS;var Qt=cS}else mt=ut.nodeName,!mt||mt.toLowerCase()!=="input"||ut.type!=="checkbox"&&ut.type!=="radio"?ot&&Ei(ot.elementType)&&(De=lm):De=fS;if(De&&(De=De(e,ot))){om(Et,De,s,St);break t}Qt&&Qt(e,ut,ot),e==="focusout"&&ot&&ut.type==="number"&&ot.memoizedProps.value!=null&&Tn(ut,"number",ut.value)}switch(Qt=ot?bs(ot):window,e){case"focusin":(rm(Qt)||Qt.contentEditable==="true")&&(nr=Qt,af=ot,Mo=null);break;case"focusout":Mo=af=nr=null;break;case"mousedown":sf=!0;break;case"contextmenu":case"mouseup":case"dragend":sf=!1,_m(Et,s,St);break;case"selectionchange":if(pS)break;case"keydown":case"keyup":_m(Et,s,St)}var de;if($u)t:{switch(e){case"compositionstart":var Te="onCompositionStart";break t;case"compositionend":Te="onCompositionEnd";break t;case"compositionupdate":Te="onCompositionUpdate";break t}Te=void 0}else er?am(e,s)&&(Te="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(Te="onCompositionStart");Te&&(em&&s.locale!=="ko"&&(er||Te!=="onCompositionStart"?Te==="onCompositionEnd"&&er&&(de=Qp()):(Ga=St,Zu="value"in Ga?Ga.value:Ga.textContent,er=!0)),Qt=yc(ot,Te),0<Qt.length&&(Te=new $p(Te,e,null,s,St),Et.push({event:Te,listeners:Qt}),de?Te.data=de:(de=sm(s),de!==null&&(Te.data=de)))),(de=aS?sS(e,s):rS(e,s))&&(Te=yc(ot,"onBeforeInput"),0<Te.length&&(Qt=new $p("onBeforeInput","beforeinput",null,s,St),Et.push({event:Qt,listeners:Te}),Qt.data=de)),JS(Et,e,ot,s,St)}kg(Et,i)})}function Yo(e,i,s){return{instance:e,listener:i,currentTarget:s}}function yc(e,i){for(var s=i+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=ho(e,s),u!=null&&o.unshift(Yo(e,u,h)),u=ho(e,i),u!=null&&o.push(Yo(e,u,h))),e.tag===3)return o;e=e.return}return[]}function eM(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xg(e,i,s,o,u){for(var h=i._reactName,S=[];s!==null&&s!==o;){var R=s,G=R.alternate,ot=R.stateNode;if(R=R.tag,G!==null&&G===o)break;R!==5&&R!==26&&R!==27||ot===null||(G=ot,u?(ot=ho(s,h),ot!=null&&S.unshift(Yo(s,ot,G))):u||(ot=ho(s,h),ot!=null&&S.push(Yo(s,ot,G)))),s=s.return}S.length!==0&&e.push({event:i,listeners:S})}var nM=/\r\n?/g,iM=/\u0000|\uFFFD/g;function Yg(e){return(typeof e=="string"?e:""+e).replace(nM,`
`).replace(iM,"")}function qg(e,i){return i=Yg(i),Yg(e)===i}function We(e,i,s,o,u,h){switch(s){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||Kn(e,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&Kn(e,""+o);break;case"className":Pt(e,"class",o);break;case"tabIndex":Pt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Pt(e,s,o);break;case"style":sn(e,o,h);break;case"data":if(i!=="object"){Pt(e,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=Ii(""+o),e.setAttribute(s,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(s==="formAction"?(i!=="input"&&We(e,i,"name",u.name,u,null),We(e,i,"formEncType",u.formEncType,u,null),We(e,i,"formMethod",u.formMethod,u,null),We(e,i,"formTarget",u.formTarget,u,null)):(We(e,i,"encType",u.encType,u,null),We(e,i,"method",u.method,u,null),We(e,i,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=Ii(""+o),e.setAttribute(s,o);break;case"onClick":o!=null&&(e.onclick=Ti);break;case"onScroll":o!=null&&Se("scroll",e);break;case"onScrollEnd":o!=null&&Se("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}s=Ii(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""+o):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":o===!0?e.setAttribute(s,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,o):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(s,o):e.removeAttribute(s);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(s):e.setAttribute(s,o);break;case"popover":Se("beforetoggle",e),Se("toggle",e),Wt(e,"popover",o);break;case"xlinkActuate":Gt(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Gt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Gt(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Gt(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Gt(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Gt(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Gt(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Gt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Gt(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Wt(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=Ve.get(s)||s,Wt(e,s,o))}}function Dh(e,i,s,o,u,h){switch(s){case"style":sn(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof o=="string"?Kn(e,o):(typeof o=="number"||typeof o=="bigint")&&Kn(e,""+o);break;case"onScroll":o!=null&&Se("scroll",e);break;case"onScrollEnd":o!=null&&Se("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Ti);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!fo.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(u=s.endsWith("Capture"),i=s.slice(2,u?s.length-7:void 0),h=e[On]||null,h=h!=null?h[s]:null,typeof h=="function"&&e.removeEventListener(i,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,o,u);break t}s in e?e[s]=o:o===!0?e.setAttribute(s,""):Wt(e,s,o)}}}function Bn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Se("error",e),Se("load",e);var o=!1,u=!1,h;for(h in s)if(s.hasOwnProperty(h)){var S=s[h];if(S!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:We(e,i,h,S,s,null)}}u&&We(e,i,"srcSet",s.srcSet,s,null),o&&We(e,i,"src",s.src,s,null);return;case"input":Se("invalid",e);var R=h=S=u=null,G=null,ot=null;for(o in s)if(s.hasOwnProperty(o)){var St=s[o];if(St!=null)switch(o){case"name":u=St;break;case"type":S=St;break;case"checked":G=St;break;case"defaultChecked":ot=St;break;case"value":h=St;break;case"defaultValue":R=St;break;case"children":case"dangerouslySetInnerHTML":if(St!=null)throw Error(a(137,i));break;default:We(e,i,o,St,s,null)}}Xt(e,h,R,G,ot,S,u,!1);return;case"select":Se("invalid",e),o=S=h=null;for(u in s)if(s.hasOwnProperty(u)&&(R=s[u],R!=null))switch(u){case"value":h=R;break;case"defaultValue":S=R;break;case"multiple":o=R;default:We(e,i,u,R,s,null)}i=h,s=S,e.multiple=!!o,i!=null?me(e,!!o,i,!1):s!=null&&me(e,!!o,s,!0);return;case"textarea":Se("invalid",e),h=u=o=null;for(S in s)if(s.hasOwnProperty(S)&&(R=s[S],R!=null))switch(S){case"value":o=R;break;case"defaultValue":u=R;break;case"children":h=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(a(91));break;default:We(e,i,S,R,s,null)}fi(e,o,u,h);return;case"option":for(G in s)s.hasOwnProperty(G)&&(o=s[G],o!=null)&&(G==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":We(e,i,G,o,s,null));return;case"dialog":Se("beforetoggle",e),Se("toggle",e),Se("cancel",e),Se("close",e);break;case"iframe":case"object":Se("load",e);break;case"video":case"audio":for(o=0;o<Xo.length;o++)Se(Xo[o],e);break;case"image":Se("error",e),Se("load",e);break;case"details":Se("toggle",e);break;case"embed":case"source":case"link":Se("error",e),Se("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ot in s)if(s.hasOwnProperty(ot)&&(o=s[ot],o!=null))switch(ot){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:We(e,i,ot,o,s,null)}return;default:if(Ei(i)){for(St in s)s.hasOwnProperty(St)&&(o=s[St],o!==void 0&&Dh(e,i,St,o,s,void 0));return}}for(R in s)s.hasOwnProperty(R)&&(o=s[R],o!=null&&We(e,i,R,o,s,null))}function aM(e,i,s,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,S=null,R=null,G=null,ot=null,St=null;for(mt in s){var Et=s[mt];if(s.hasOwnProperty(mt)&&Et!=null)switch(mt){case"checked":break;case"value":break;case"defaultValue":G=Et;default:o.hasOwnProperty(mt)||We(e,i,mt,null,o,Et)}}for(var ut in o){var mt=o[ut];if(Et=s[ut],o.hasOwnProperty(ut)&&(mt!=null||Et!=null))switch(ut){case"type":h=mt;break;case"name":u=mt;break;case"checked":ot=mt;break;case"defaultChecked":St=mt;break;case"value":S=mt;break;case"defaultValue":R=mt;break;case"children":case"dangerouslySetInnerHTML":if(mt!=null)throw Error(a(137,i));break;default:mt!==Et&&We(e,i,ut,mt,o,Et)}}_n(e,S,R,G,ot,St,h,u);return;case"select":mt=S=R=ut=null;for(h in s)if(G=s[h],s.hasOwnProperty(h)&&G!=null)switch(h){case"value":break;case"multiple":mt=G;default:o.hasOwnProperty(h)||We(e,i,h,null,o,G)}for(u in o)if(h=o[u],G=s[u],o.hasOwnProperty(u)&&(h!=null||G!=null))switch(u){case"value":ut=h;break;case"defaultValue":R=h;break;case"multiple":S=h;default:h!==G&&We(e,i,u,h,o,G)}i=R,s=S,o=mt,ut!=null?me(e,!!s,ut,!1):!!o!=!!s&&(i!=null?me(e,!!s,i,!0):me(e,!!s,s?[]:"",!1));return;case"textarea":mt=ut=null;for(R in s)if(u=s[R],s.hasOwnProperty(R)&&u!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:We(e,i,R,null,o,u)}for(S in o)if(u=o[S],h=s[S],o.hasOwnProperty(S)&&(u!=null||h!=null))switch(S){case"value":ut=u;break;case"defaultValue":mt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(a(91));break;default:u!==h&&We(e,i,S,u,o,h)}Zn(e,ut,mt);return;case"option":for(var Zt in s)ut=s[Zt],s.hasOwnProperty(Zt)&&ut!=null&&!o.hasOwnProperty(Zt)&&(Zt==="selected"?e.selected=!1:We(e,i,Zt,null,o,ut));for(G in o)ut=o[G],mt=s[G],o.hasOwnProperty(G)&&ut!==mt&&(ut!=null||mt!=null)&&(G==="selected"?e.selected=ut&&typeof ut!="function"&&typeof ut!="symbol":We(e,i,G,ut,o,mt));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ie in s)ut=s[ie],s.hasOwnProperty(ie)&&ut!=null&&!o.hasOwnProperty(ie)&&We(e,i,ie,null,o,ut);for(ot in o)if(ut=o[ot],mt=s[ot],o.hasOwnProperty(ot)&&ut!==mt&&(ut!=null||mt!=null))switch(ot){case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(a(137,i));break;default:We(e,i,ot,ut,o,mt)}return;default:if(Ei(i)){for(var Xe in s)ut=s[Xe],s.hasOwnProperty(Xe)&&ut!==void 0&&!o.hasOwnProperty(Xe)&&Dh(e,i,Xe,void 0,o,ut);for(St in o)ut=o[St],mt=s[St],!o.hasOwnProperty(St)||ut===mt||ut===void 0&&mt===void 0||Dh(e,i,St,ut,o,mt);return}}for(var j in s)ut=s[j],s.hasOwnProperty(j)&&ut!=null&&!o.hasOwnProperty(j)&&We(e,i,j,null,o,ut);for(Et in o)ut=o[Et],mt=s[Et],!o.hasOwnProperty(Et)||ut===mt||ut==null&&mt==null||We(e,i,Et,ut,o,mt)}function Zg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function sM(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),o=0;o<s.length;o++){var u=s[o],h=u.transferSize,S=u.initiatorType,R=u.duration;if(h&&R&&Zg(S)){for(S=0,R=u.responseEnd,o+=1;o<s.length;o++){var G=s[o],ot=G.startTime;if(ot>R)break;var St=G.transferSize,Et=G.initiatorType;St&&Zg(Et)&&(G=G.responseEnd,S+=St*(G<R?1:(R-ot)/(G-ot)))}if(--o,i+=8*(h+S)/(u.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Uh=null,Lh=null;function Ec(e){return e.nodeType===9?e:e.ownerDocument}function Kg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Qg(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function Nh(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Oh=null;function rM(){var e=window.event;return e&&e.type==="popstate"?e===Oh?!1:(Oh=e,!0):(Oh=null,!1)}var Jg=typeof setTimeout=="function"?setTimeout:void 0,oM=typeof clearTimeout=="function"?clearTimeout:void 0,jg=typeof Promise=="function"?Promise:void 0,lM=typeof queueMicrotask=="function"?queueMicrotask:typeof jg<"u"?function(e){return jg.resolve(null).then(e).catch(cM)}:Jg;function cM(e){setTimeout(function(){throw e})}function as(e){return e==="head"}function $g(e,i){var s=i,o=0;do{var u=s.nextSibling;if(e.removeChild(s),u&&u.nodeType===8)if(s=u.data,s==="/$"||s==="/&"){if(o===0){e.removeChild(u),Cr(i);return}o--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")o++;else if(s==="html")qo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,qo(s);for(var h=s.firstChild;h;){var S=h.nextSibling,R=h.nodeName;h[Ia]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&h.rel.toLowerCase()==="stylesheet"||s.removeChild(h),h=S}}else s==="body"&&qo(e.ownerDocument.body);s=u}while(s);Cr(i)}function t_(e,i){var s=e;e=0;do{var o=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),o&&o.nodeType===8)if(s=o.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=o}while(s)}function Ph(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Ph(s),Ba(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function uM(e,i,s,o){for(;e.nodeType===1;){var u=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Ia])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Ui(e.nextSibling),e===null)break}return null}function fM(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Ui(e.nextSibling),e===null))return null;return e}function e_(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Ui(e.nextSibling),e===null))return null;return e}function zh(e){return e.data==="$?"||e.data==="$~"}function Ih(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function hM(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var o=function(){i(),s.removeEventListener("DOMContentLoaded",o)};s.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Ui(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var Bh=null;function n_(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return Ui(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function i_(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function a_(e,i,s){switch(i=Ec(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function qo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);Ba(e)}var Li=new Map,s_=new Set;function Tc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ba=V.d;V.d={f:dM,r:pM,D:mM,C:gM,L:_M,m:vM,X:SM,S:xM,M:MM};function dM(){var e=ba.f(),i=mc();return e||i}function pM(e){var i=ca(e);i!==null&&i.tag===5&&i.type==="form"?y0(i):ba.r(e)}var Ar=typeof document>"u"?null:document;function r_(e,i,s){var o=Ar;if(o&&typeof i=="string"&&i){var u=pe(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof s=="string"&&(u+='[crossorigin="'+s+'"]'),s_.has(u)||(s_.add(u),e={rel:e,crossOrigin:s,href:i},o.querySelector(u)===null&&(i=o.createElement("link"),Bn(i,"link",e),gn(i),o.head.appendChild(i)))}}function mM(e){ba.D(e),r_("dns-prefetch",e,null)}function gM(e,i){ba.C(e,i),r_("preconnect",e,i)}function _M(e,i,s){ba.L(e,i,s);var o=Ar;if(o&&e&&i){var u='link[rel="preload"][as="'+pe(i)+'"]';i==="image"&&s&&s.imageSrcSet?(u+='[imagesrcset="'+pe(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(u+='[imagesizes="'+pe(s.imageSizes)+'"]')):u+='[href="'+pe(e)+'"]';var h=u;switch(i){case"style":h=Rr(e);break;case"script":h=wr(e)}Li.has(h)||(e=v({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Li.set(h,e),o.querySelector(u)!==null||i==="style"&&o.querySelector(Zo(h))||i==="script"&&o.querySelector(Ko(h))||(i=o.createElement("link"),Bn(i,"link",e),gn(i),o.head.appendChild(i)))}}function vM(e,i){ba.m(e,i);var s=Ar;if(s&&e){var o=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+pe(o)+'"][href="'+pe(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=wr(e)}if(!Li.has(h)&&(e=v({rel:"modulepreload",href:e},i),Li.set(h,e),s.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Ko(h)))return}o=s.createElement("link"),Bn(o,"link",e),gn(o),s.head.appendChild(o)}}}function xM(e,i,s){ba.S(e,i,s);var o=Ar;if(o&&e){var u=Fa(o).hoistableStyles,h=Rr(e);i=i||"default";var S=u.get(h);if(!S){var R={loading:0,preload:null};if(S=o.querySelector(Zo(h)))R.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Li.get(h))&&Fh(e,s);var G=S=o.createElement("link");gn(G),Bn(G,"link",e),G._p=new Promise(function(ot,St){G.onload=ot,G.onerror=St}),G.addEventListener("load",function(){R.loading|=1}),G.addEventListener("error",function(){R.loading|=2}),R.loading|=4,bc(S,i,o)}S={type:"stylesheet",instance:S,count:1,state:R},u.set(h,S)}}}function SM(e,i){ba.X(e,i);var s=Ar;if(s&&e){var o=Fa(s).hoistableScripts,u=wr(e),h=o.get(u);h||(h=s.querySelector(Ko(u)),h||(e=v({src:e,async:!0},i),(i=Li.get(u))&&Hh(e,i),h=s.createElement("script"),gn(h),Bn(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function MM(e,i){ba.M(e,i);var s=Ar;if(s&&e){var o=Fa(s).hoistableScripts,u=wr(e),h=o.get(u);h||(h=s.querySelector(Ko(u)),h||(e=v({src:e,async:!0,type:"module"},i),(i=Li.get(u))&&Hh(e,i),h=s.createElement("script"),gn(h),Bn(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function o_(e,i,s,o){var u=(u=Rt.current)?Tc(u):null;if(!u)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Rr(s.href),s=Fa(u).hoistableStyles,o=s.get(i),o||(o={type:"style",instance:null,count:0,state:null},s.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Rr(s.href);var h=Fa(u).hoistableStyles,S=h.get(e);if(S||(u=u.ownerDocument||u,S={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,S),(h=u.querySelector(Zo(e)))&&!h._p&&(S.instance=h,S.state.loading=5),Li.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Li.set(e,s),h||yM(u,e,s,S.state))),i&&o===null)throw Error(a(528,""));return S}if(i&&o!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=wr(s),s=Fa(u).hoistableScripts,o=s.get(i),o||(o={type:"script",instance:null,count:0,state:null},s.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Rr(e){return'href="'+pe(e)+'"'}function Zo(e){return'link[rel="stylesheet"]['+e+"]"}function l_(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function yM(e,i,s,o){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=e.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),Bn(i,"link",s),gn(i),e.head.appendChild(i))}function wr(e){return'[src="'+pe(e)+'"]'}function Ko(e){return"script[async]"+e}function c_(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var o=e.querySelector('style[data-href~="'+pe(s.href)+'"]');if(o)return i.instance=o,gn(o),o;var u=v({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),gn(o),Bn(o,"style",u),bc(o,s.precedence,e),i.instance=o;case"stylesheet":u=Rr(s.href);var h=e.querySelector(Zo(u));if(h)return i.state.loading|=4,i.instance=h,gn(h),h;o=l_(s),(u=Li.get(u))&&Fh(o,u),h=(e.ownerDocument||e).createElement("link"),gn(h);var S=h;return S._p=new Promise(function(R,G){S.onload=R,S.onerror=G}),Bn(h,"link",o),i.state.loading|=4,bc(h,s.precedence,e),i.instance=h;case"script":return h=wr(s.src),(u=e.querySelector(Ko(h)))?(i.instance=u,gn(u),u):(o=s,(u=Li.get(h))&&(o=v({},s),Hh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),gn(u),Bn(u,"link",o),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,bc(o,s.precedence,e));return i.instance}function bc(e,i,s){for(var o=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,S=0;S<o.length;S++){var R=o[S];if(R.dataset.precedence===i)h=R;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function Fh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function Hh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var Ac=null;function u_(e,i,s){if(Ac===null){var o=new Map,u=Ac=new Map;u.set(s,o)}else u=Ac,o=u.get(s),o||(o=new Map,u.set(s,o));if(o.has(e))return o;for(o.set(e,null),s=s.getElementsByTagName(e),u=0;u<s.length;u++){var h=s[u];if(!(h[Ia]||h[mn]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var S=h.getAttribute(i)||"";S=e+S;var R=o.get(S);R?R.push(h):o.set(S,[h])}}return o}function f_(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function EM(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;return i.rel==="stylesheet"?(e=i.disabled,typeof i.precedence=="string"&&e==null):!0;case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function h_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function TM(e,i,s,o){if(s.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var u=Rr(o.href),h=i.querySelector(Zo(u));if(h){i=h._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=Rc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=h,gn(h);return}h=i.ownerDocument||i,o=l_(o),(u=Li.get(u))&&Fh(o,u),h=h.createElement("link"),gn(h);var S=h;S._p=new Promise(function(R,G){S.onload=R,S.onerror=G}),Bn(h,"link",o),s.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=Rc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var Gh=0;function bM(e,i){return e.stylesheets&&e.count===0&&Cc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var o=setTimeout(function(){if(e.stylesheets&&Cc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+i);0<e.imgBytes&&Gh===0&&(Gh=62500*sM());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Cc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>Gh?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function Rc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Cc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var wc=null;function Cc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,wc=new Map,i.forEach(AM,e),wc=null,Rc.call(e))}function AM(e,i){if(!(i.state.loading&4)){var s=wc.get(e);if(s)var o=s.get(null);else{s=new Map,wc.set(e,s);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var S=u[h];(S.nodeName==="LINK"||S.getAttribute("media")!=="not all")&&(s.set(S.dataset.precedence,S),o=S)}o&&s.set(null,o)}u=i.instance,S=u.getAttribute("data-precedence"),h=s.get(S)||o,h===o&&s.set(null,u),s.set(S,u),this.count++,o=Rc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var Qo={$$typeof:H,Provider:null,Consumer:null,_currentValue:ft,_currentValue2:ft,_threadCount:0};function RM(e,i,s,o,u,h,S,R,G){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Jt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jt(0),this.hiddenUpdates=Jt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=G,this.incompleteTransitions=new Map}function d_(e,i,s,o,u,h,S,R,G,ot,St,Et){return e=new RM(e,i,s,S,G,ot,St,Et,R),i=1,h===!0&&(i|=24),h=di(3,null,null,i),e.current=h,h.stateNode=e,i=Sf(),i.refCount++,e.pooledCache=i,i.refCount++,h.memoizedState={element:o,isDehydrated:s,cache:i},Tf(h),e}function p_(e){return e?(e=sr,e):sr}function m_(e,i,s,o,u,h){u=p_(u),o.context===null?o.context=u:o.pendingContext=u,o=qa(i),o.payload={element:s},h=h===void 0?null:h,h!==null&&(o.callback=h),s=Za(e,o,i),s!==null&&(ri(s,e,i),wo(s,e,i))}function g_(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function Vh(e,i){g_(e,i),(e=e.alternate)&&g_(e,i)}function __(e){if(e.tag===13||e.tag===31){var i=Cs(e,67108864);i!==null&&ri(i,e,67108864),Vh(e,67108864)}}function v_(e){if(e.tag===13||e.tag===31){var i=vi();i=lo(i);var s=Cs(e,i);s!==null&&ri(s,e,i),Vh(e,i)}}var Dc=!0;function wM(e,i,s,o){var u=B.T;B.T=null;var h=V.p;try{V.p=2,kh(e,i,s,o)}finally{V.p=h,B.T=u}}function CM(e,i,s,o){var u=B.T;B.T=null;var h=V.p;try{V.p=8,kh(e,i,s,o)}finally{V.p=h,B.T=u}}function kh(e,i,s,o){if(Dc){var u=Wh(o);if(u===null)Ch(e,i,o,Uc,s),S_(e,o);else if(UM(u,e,i,s,o))o.stopPropagation();else if(S_(e,o),i&4&&-1<DM.indexOf(e)){for(;u!==null;){var h=ca(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var S=Ut(h.pendingLanes);if(S!==0){var R=h;for(R.pendingLanes|=2,R.entangledLanes|=2;S;){var G=1<<31-kt(S);R.entanglements[1]|=G,S&=~G}Ji(h),(Oe&6)===0&&(dc=ze()+500,Wo(0))}}break;case 31:case 13:R=Cs(h,2),R!==null&&ri(R,h,2),mc(),Vh(h,2)}if(h=Wh(o),h===null&&Ch(e,i,o,Uc,s),h===u)break;u=h}u!==null&&o.stopPropagation()}else Ch(e,i,o,null,s)}}function Wh(e){return e=Xu(e),Xh(e)}var Uc=null;function Xh(e){if(Uc=null,e=la(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=f(i),e!==null)return e;e=null}else if(s===31){if(e=m(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return Uc=e,null}function x_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Le()){case I:return 2;case T:return 8;case tt:case ct:return 32;case gt:return 268435456;default:return 32}default:return 32}}var Yh=!1,ss=null,rs=null,os=null,Jo=new Map,jo=new Map,ls=[],DM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function S_(e,i){switch(e){case"focusin":case"focusout":ss=null;break;case"dragenter":case"dragleave":rs=null;break;case"mouseover":case"mouseout":os=null;break;case"pointerover":case"pointerout":Jo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":jo.delete(i.pointerId)}}function $o(e,i,s,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:i,domEventName:s,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},i!==null&&(i=ca(i),i!==null&&__(i)),e):(e.eventSystemFlags|=o,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function UM(e,i,s,o,u){switch(i){case"focusin":return ss=$o(ss,e,i,s,o,u),!0;case"dragenter":return rs=$o(rs,e,i,s,o,u),!0;case"mouseover":return os=$o(os,e,i,s,o,u),!0;case"pointerover":var h=u.pointerId;return Jo.set(h,$o(Jo.get(h)||null,e,i,s,o,u)),!0;case"gotpointercapture":return h=u.pointerId,jo.set(h,$o(jo.get(h)||null,e,i,s,o,u)),!0}return!1}function M_(e){var i=la(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=f(s),i!==null){e.blockedOn=i,js(e.priority,function(){v_(s)});return}}else if(i===31){if(i=m(s),i!==null){e.blockedOn=i,js(e.priority,function(){v_(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Lc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=Wh(e.nativeEvent);if(s===null){s=e.nativeEvent;var o=new s.constructor(s.type,s);Wu=o,s.target.dispatchEvent(o),Wu=null}else return i=ca(s),i!==null&&__(i),e.blockedOn=s,!1;i.shift()}return!0}function y_(e,i,s){Lc(e)&&s.delete(i)}function LM(){Yh=!1,ss!==null&&Lc(ss)&&(ss=null),rs!==null&&Lc(rs)&&(rs=null),os!==null&&Lc(os)&&(os=null),Jo.forEach(y_),jo.forEach(y_)}function Nc(e,i){e.blockedOn===i&&(e.blockedOn=null,Yh||(Yh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,LM)))}var Oc=null;function E_(e){Oc!==e&&(Oc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Oc===e&&(Oc=null);for(var i=0;i<e.length;i+=3){var s=e[i],o=e[i+1],u=e[i+2];if(typeof o!="function"){if(Xh(o||s)===null)continue;break}var h=ca(s);h!==null&&(e.splice(i,3),i-=3,Wf(h,{pending:!0,data:u,method:s.method,action:o},o,u))}}))}function Cr(e){function i(G){return Nc(G,e)}ss!==null&&Nc(ss,e),rs!==null&&Nc(rs,e),os!==null&&Nc(os,e),Jo.forEach(i),jo.forEach(i);for(var s=0;s<ls.length;s++){var o=ls[s];o.blockedOn===e&&(o.blockedOn=null)}for(;0<ls.length&&(s=ls[0],s.blockedOn===null);)M_(s),s.blockedOn===null&&ls.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(o=0;o<s.length;o+=3){var u=s[o],h=s[o+1],S=u[On]||null;if(typeof h=="function")S||E_(s);else if(S){var R=null;if(h&&h.hasAttribute("formAction")){if(u=h,S=h[On]||null)R=S.formAction;else if(Xh(u)!==null)continue}else R=S.action;typeof R=="function"?s[o+1]=R:(s.splice(o,3),o-=3),E_(s)}}}function T_(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(S){return u=S})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),o||setTimeout(s,20)}function s(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function qh(e){this._internalRoot=e}Pc.prototype.render=qh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,o=vi();m_(s,o,e,i,null,null)},Pc.prototype.unmount=qh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;m_(e.current,2,null,e,null,null),mc(),i[ti]=null}};function Pc(e){this._internalRoot=e}Pc.prototype.unstable_scheduleHydration=function(e){if(e){var i=uo();e={blockedOn:null,target:e,priority:i};for(var s=0;s<ls.length&&i!==0&&i<ls[s].priority;s++);ls.splice(s,0,e),s===0&&M_(e)}};var b_=t.version;if(b_!=="19.2.9")throw Error(a(527,b_,"19.2.9"));V.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=p(i),e=e!==null?_(e):null,e=e===null?null:e.stateNode,e};var NM={bundleType:0,version:"19.2.9",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.9"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var zc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zc.isDisabled&&zc.supportsFiber)try{_t=zc.inject(NM),xt=zc}catch{}}return el.createRoot=function(e,i){if(!l(e))throw Error(a(299));var s=!1,o="",u=L0,h=N0,S=O0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(h=i.onCaughtError),i.onRecoverableError!==void 0&&(S=i.onRecoverableError)),i=d_(e,1,!1,null,null,s,o,null,u,h,S,T_),e[ti]=i.current,wh(e),new qh(i)},el.hydrateRoot=function(e,i,s){if(!l(e))throw Error(a(299));var o=!1,u="",h=L0,S=N0,R=O0,G=null;return s!=null&&(s.unstable_strictMode===!0&&(o=!0),s.identifierPrefix!==void 0&&(u=s.identifierPrefix),s.onUncaughtError!==void 0&&(h=s.onUncaughtError),s.onCaughtError!==void 0&&(S=s.onCaughtError),s.onRecoverableError!==void 0&&(R=s.onRecoverableError),s.formState!==void 0&&(G=s.formState)),i=d_(e,1,!0,i,s??null,o,u,G,h,S,R,T_),i.context=p_(null),s=i.current,o=vi(),o=lo(o),u=qa(o),u.callback=null,Za(s,u,o),s=o,i.current.lanes=s,Yt(i,s),Ji(i),e[ti]=i.current,wh(e),new Pc(i)},el.version="19.2.9",el}var P_;function kM(){if(P_)return Qh.exports;P_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Qh.exports=VM(),Qh.exports}var WM=kM();const Cp="186",$r={ROTATE:0,DOLLY:1,PAN:2},Qr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},XM=0,z_=1,YM=2,ml=1,qM=2,dl=3,xs=0,Yn=1,Ua=2,Na=0,gl=1,Mu=2,I_=3,B_=4,ZM=5,Kr=100,KM=101,QM=102,JM=103,jM=104,$M=200,t1=201,e1=202,n1=203,kv=204,Wv=205,i1=206,a1=207,s1=208,r1=209,o1=210,l1=211,c1=212,u1=213,f1=214,Fd=0,Hd=1,Gd=2,vl=3,Vd=4,kd=5,Wd=6,Xd=7,Xv=0,h1=1,d1=2,ra=0,Yv=1,qv=2,Zv=3,Dp=4,Kv=5,Qv=6,Jv=7,jv=300,Ks=301,no=302,td=303,ed=304,zu=306,Yd=1e3,La=1001,qd=1002,Rn=1003,p1=1004,Ic=1005,Wn=1006,nd=1007,qs=1008,yi=1009,$v=1010,tx=1011,xl=1012,Up=1013,oa=1014,aa=1015,Xi=1016,Lp=1017,Np=1018,Sl=1020,ex=35902,nx=35899,ix=1021,ax=1022,Wi=1023,Pa=1026,Zs=1027,Op=1028,Pp=1029,Qs=1030,zp=1031,Ip=1033,mu=33776,gu=33777,_u=33778,vu=33779,Zd=35840,Kd=35841,Qd=35842,Jd=35843,jd=36196,$d=37492,tp=37496,ep=37488,np=37489,yu=37490,ip=37491,ap=37808,sp=37809,rp=37810,op=37811,lp=37812,cp=37813,up=37814,fp=37815,hp=37816,dp=37817,pp=37818,mp=37819,gp=37820,_p=37821,vp=36492,xp=36494,Sp=36495,Mp=36283,yp=36284,Eu=36285,Ep=36286,m1=3200,Tp=0,g1=1,_s="",li="srgb",Tu="srgb-linear",bu="linear",Fe="srgb",id=7680,_1=519,v1=512,x1=513,S1=514,Bp=515,M1=516,y1=517,Fp=518,E1=519,sx=35044,F_="300 es",sa=2e3,Ml=2001;function T1(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Au(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function b1(){const r=Au("canvas");return r.style.display="block",r}const H_={};function Ru(...r){const t="THREE."+r.shift();console.log(t,...r)}function rx(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=r[1];n&&n.isStackTrace?r[0]+=" "+n.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function se(...r){r=rx(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...r)}}function Ce(...r){r=rx(r);const t="THREE."+r.shift();{const n=r[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...r)}}function to(...r){const t=r.join(" ");t in H_||(H_[t]=!0,se(...r))}function A1(r,t,n){return new Promise(function(a,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}const R1={[Fd]:Hd,[Gd]:Wd,[Vd]:Xd,[vl]:kd,[Hd]:Fd,[Wd]:Gd,[Xd]:Vd,[kd]:vl};class Ms{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){const a=this._listeners;if(a===void 0)return;const l=a[t];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const a=n[t.type];if(a!==void 0){t.target=this;const l=a.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xu=Math.PI/180,wu=180/Math.PI;function vs(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Gn[r&255]+Gn[r>>8&255]+Gn[r>>16&255]+Gn[r>>24&255]+"-"+Gn[t&255]+Gn[t>>8&255]+"-"+Gn[t>>16&15|64]+Gn[t>>24&255]+"-"+Gn[n&63|128]+Gn[n>>8&255]+"-"+Gn[n>>16&255]+Gn[n>>24&255]+Gn[a&255]+Gn[a>>8&255]+Gn[a>>16&255]+Gn[a>>24&255]).toLowerCase()}function Me(r,t,n){return Math.max(t,Math.min(n,r))}function w1(r,t){return(r%t+t)%t}function ad(r,t,n){return(1-n)*r+n*t}function ia(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ye(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const C1={DEG2RAD:xu};class ne{static{ne.prototype.isVector2=!0}constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,l=t.elements;return this.x=l[0]*n+l[3]*a+l[6],this.y=l[1]*n+l[4]*a+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(Me(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),l=Math.sin(n),c=this.x-t.x,f=this.y-t.y;return this.x=c*a-f*l+t.x,this.y=c*l+f*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ss{constructor(t=0,n=0,a=0,l=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=l}static slerpFlat(t,n,a,l,c,f,m){let d=a[l+0],p=a[l+1],_=a[l+2],v=a[l+3],g=c[f+0],M=c[f+1],E=c[f+2],w=c[f+3];if(v!==w||d!==g||p!==M||_!==E){let y=d*g+p*M+_*E+v*w;y<0&&(g=-g,M=-M,E=-E,w=-w,y=-y);let x=1-m;if(y<.9995){const N=Math.acos(y),H=Math.sin(N);x=Math.sin(x*N)/H,m=Math.sin(m*N)/H,d=d*x+g*m,p=p*x+M*m,_=_*x+E*m,v=v*x+w*m}else{d=d*x+g*m,p=p*x+M*m,_=_*x+E*m,v=v*x+w*m;const N=1/Math.sqrt(d*d+p*p+_*_+v*v);d*=N,p*=N,_*=N,v*=N}}t[n]=d,t[n+1]=p,t[n+2]=_,t[n+3]=v}static multiplyQuaternionsFlat(t,n,a,l,c,f){const m=a[l],d=a[l+1],p=a[l+2],_=a[l+3],v=c[f],g=c[f+1],M=c[f+2],E=c[f+3];return t[n]=m*E+_*v+d*M-p*g,t[n+1]=d*E+_*g+p*v-m*M,t[n+2]=p*E+_*M+m*g-d*v,t[n+3]=_*E-m*v-d*g-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,l){return this._x=t,this._y=n,this._z=a,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,l=t._y,c=t._z,f=t._order,m=Math.cos,d=Math.sin,p=m(a/2),_=m(l/2),v=m(c/2),g=d(a/2),M=d(l/2),E=d(c/2);switch(f){case"XYZ":this._x=g*_*v+p*M*E,this._y=p*M*v-g*_*E,this._z=p*_*E+g*M*v,this._w=p*_*v-g*M*E;break;case"YXZ":this._x=g*_*v+p*M*E,this._y=p*M*v-g*_*E,this._z=p*_*E-g*M*v,this._w=p*_*v+g*M*E;break;case"ZXY":this._x=g*_*v-p*M*E,this._y=p*M*v+g*_*E,this._z=p*_*E+g*M*v,this._w=p*_*v-g*M*E;break;case"ZYX":this._x=g*_*v-p*M*E,this._y=p*M*v+g*_*E,this._z=p*_*E-g*M*v,this._w=p*_*v+g*M*E;break;case"YZX":this._x=g*_*v+p*M*E,this._y=p*M*v+g*_*E,this._z=p*_*E-g*M*v,this._w=p*_*v-g*M*E;break;case"XZY":this._x=g*_*v-p*M*E,this._y=p*M*v-g*_*E,this._z=p*_*E+g*M*v,this._w=p*_*v+g*M*E;break;default:se("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,l=Math.sin(a);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],l=n[4],c=n[8],f=n[1],m=n[5],d=n[9],p=n[2],_=n[6],v=n[10],g=a+m+v;if(g>0){const M=.5/Math.sqrt(g+1);this._w=.25/M,this._x=(_-d)*M,this._y=(c-p)*M,this._z=(f-l)*M}else if(a>m&&a>v){const M=2*Math.sqrt(1+a-m-v);this._w=(_-d)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+p)/M}else if(m>v){const M=2*Math.sqrt(1+m-a-v);this._w=(c-p)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(d+_)/M}else{const M=2*Math.sqrt(1+v-a-m);this._w=(f-l)/M,this._x=(c+p)/M,this._y=(d+_)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const l=Math.min(1,n/a);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,l=t._y,c=t._z,f=t._w,m=n._x,d=n._y,p=n._z,_=n._w;return this._x=a*_+f*m+l*p-c*d,this._y=l*_+f*d+c*m-a*p,this._z=c*_+f*p+a*d-l*m,this._w=f*_-a*m-l*d-c*p,this._onChangeCallback(),this}slerp(t,n){let a=t._x,l=t._y,c=t._z,f=t._w,m=this.dot(t);m<0&&(a=-a,l=-l,c=-c,f=-f,m=-m);let d=1-n;if(m<.9995){const p=Math.acos(m),_=Math.sin(p);d=Math.sin(d*p)/_,n=Math.sin(n*p)/_,this._x=this._x*d+a*n,this._y=this._y*d+l*n,this._z=this._z*d+c*n,this._w=this._w*d+f*n,this._onChangeCallback()}else this._x=this._x*d+a*n,this._y=this._y*d+l*n,this._z=this._z*d+c*n,this._w=this._w*d+f*n,this.normalize();return this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),l=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{static{J.prototype.isVector3=!0}constructor(t=0,n=0,a=0){this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(G_.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(G_.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*l,this.y=c[1]*n+c[4]*a+c[7]*l,this.z=c[2]*n+c[5]*a+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,l=this.z,c=t.elements,f=1/(c[3]*n+c[7]*a+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*l+c[12])*f,this.y=(c[1]*n+c[5]*a+c[9]*l+c[13])*f,this.z=(c[2]*n+c[6]*a+c[10]*l+c[14])*f,this}applyQuaternion(t){const n=this.x,a=this.y,l=this.z,c=t.x,f=t.y,m=t.z,d=t.w,p=2*(f*l-m*a),_=2*(m*n-c*l),v=2*(c*a-f*n);return this.x=n+d*p+f*v-m*_,this.y=a+d*_+m*p-c*v,this.z=l+d*v+c*_-f*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*l,this.y=c[1]*n+c[5]*a+c[9]*l,this.z=c[2]*n+c[6]*a+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this.z=Me(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this.z=Me(this.z,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,l=t.y,c=t.z,f=n.x,m=n.y,d=n.z;return this.x=l*d-c*m,this.y=c*f-a*d,this.z=a*m-l*f,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return sd.copy(this).projectOnVector(t),this.sub(sd)}reflect(t){return this.sub(sd.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(Me(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,l=this.z-t.z;return n*n+a*a+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const l=Math.sin(n)*t;return this.x=l*Math.sin(a),this.y=Math.cos(n)*t,this.z=l*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=l,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const sd=new J,G_=new Ss;class ue{static{ue.prototype.isMatrix3=!0}constructor(t,n,a,l,c,f,m,d,p){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,l,c,f,m,d,p)}set(t,n,a,l,c,f,m,d,p){const _=this.elements;return _[0]=t,_[1]=l,_[2]=m,_[3]=n,_[4]=c,_[5]=d,_[6]=a,_[7]=f,_[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,l=n.elements,c=this.elements,f=a[0],m=a[3],d=a[6],p=a[1],_=a[4],v=a[7],g=a[2],M=a[5],E=a[8],w=l[0],y=l[3],x=l[6],N=l[1],H=l[4],C=l[7],z=l[2],O=l[5],L=l[8];return c[0]=f*w+m*N+d*z,c[3]=f*y+m*H+d*O,c[6]=f*x+m*C+d*L,c[1]=p*w+_*N+v*z,c[4]=p*y+_*H+v*O,c[7]=p*x+_*C+v*L,c[2]=g*w+M*N+E*z,c[5]=g*y+M*H+E*O,c[8]=g*x+M*C+E*L,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],m=t[5],d=t[6],p=t[7],_=t[8];return n*f*_-n*m*p-a*c*_+a*m*d+l*c*p-l*f*d}invert(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],m=t[5],d=t[6],p=t[7],_=t[8],v=_*f-m*p,g=m*d-_*c,M=p*c-f*d,E=n*v+a*g+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/E;return t[0]=v*w,t[1]=(l*p-_*a)*w,t[2]=(m*a-l*f)*w,t[3]=g*w,t[4]=(_*n-l*d)*w,t[5]=(l*c-m*n)*w,t[6]=M*w,t[7]=(a*d-p*n)*w,t[8]=(f*n-a*c)*w,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,l,c,f,m){const d=Math.cos(c),p=Math.sin(c);return this.set(a*d,a*p,-a*(d*f+p*m)+f+t,-l*p,l*d,-l*(-p*f+d*m)+m+n,0,0,1),this}scale(t,n){return to("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(rd.makeScale(t,n)),this}rotate(t){return to("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(rd.makeRotation(-t)),this}translate(t,n){return to("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(rd.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let l=0;l<9;l++)if(n[l]!==a[l])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const rd=new ue,V_=new ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),k_=new ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function D1(){const r={enabled:!0,workingColorSpace:Tu,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Fe&&(l.r=Oa(l.r),l.g=Oa(l.g),l.b=Oa(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Fe&&(l.r=eo(l.r),l.g=eo(l.g),l.b=eo(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===_s?bu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return to("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return to("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[Tu]:{primaries:t,whitePoint:a,transfer:bu,toXYZ:V_,fromXYZ:k_,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:li},outputColorSpaceConfig:{drawingBufferColorSpace:li}},[li]:{primaries:t,whitePoint:a,transfer:Fe,toXYZ:V_,fromXYZ:k_,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:li}}}),r}const Ae=D1();function Oa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function eo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Dr;class U1{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{Dr===void 0&&(Dr=Au("canvas")),Dr.width=t.width,Dr.height=t.height;const l=Dr.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),a=Dr}return a.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Au("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const l=a.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Oa(c[f]/255)*255;return a.putImageData(l,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Oa(n[a]/255)*255):n[a]=Oa(n[a]);return{data:n,width:t.width,height:t.height}}else return se("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let L1=0;class Hp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:L1++}),this.uuid=vs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,m=l.length;f<m;f++)l[f].isDataTexture?c.push(od(l[f].image)):c.push(od(l[f]))}else c=od(l);a.url=c}return n||(t.images[this.uuid]=a),a}}function od(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?U1.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(se("Texture: Unable to serialize Texture."),{})}let N1=0;const ld=new J;class qn extends Ms{constructor(t=qn.DEFAULT_IMAGE,n=qn.DEFAULT_MAPPING,a=La,l=La,c=Wn,f=qs,m=Wi,d=yi,p=qn.DEFAULT_ANISOTROPY,_=_s){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:N1++}),this.uuid=vs(),this.name="",this.source=new Hp(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=m,this.internalFormat=null,this.type=d,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ld).x}get height(){return this.source.getSize(ld).y}get depth(){return this.source.getSize(ld).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const a=t[n];if(a===void 0){se(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){se(`Texture.setValues(): property '${n}' does not exist.`);continue}l&&a&&l.isVector2&&a.isVector2||l&&a&&l.isVector3&&a.isVector3||l&&a&&l.isMatrix3&&a.isMatrix3?l.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==jv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Yd:t.x=t.x-Math.floor(t.x);break;case La:t.x=t.x<0?0:1;break;case qd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Yd:t.y=t.y-Math.floor(t.y);break;case La:t.y=t.y<0?0:1;break;case qd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=jv;qn.DEFAULT_ANISOTROPY=1;class an{static{an.prototype.isVector4=!0}constructor(t=0,n=0,a=0,l=1){this.x=t,this.y=n,this.z=a,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,l){return this.x=t,this.y=n,this.z=a,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*n+f[4]*a+f[8]*l+f[12]*c,this.y=f[1]*n+f[5]*a+f[9]*l+f[13]*c,this.z=f[2]*n+f[6]*a+f[10]*l+f[14]*c,this.w=f[3]*n+f[7]*a+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,l,c;const d=t.elements,p=d[0],_=d[4],v=d[8],g=d[1],M=d[5],E=d[9],w=d[2],y=d[6],x=d[10];if(Math.abs(_-g)<.01&&Math.abs(v-w)<.01&&Math.abs(E-y)<.01){if(Math.abs(_+g)<.1&&Math.abs(v+w)<.1&&Math.abs(E+y)<.1&&Math.abs(p+M+x-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const H=(p+1)/2,C=(M+1)/2,z=(x+1)/2,O=(_+g)/4,L=(v+w)/4,b=(E+y)/4;return H>C&&H>z?H<.01?(a=0,l=.707106781,c=.707106781):(a=Math.sqrt(H),l=O/a,c=L/a):C>z?C<.01?(a=.707106781,l=0,c=.707106781):(l=Math.sqrt(C),a=O/l,c=b/l):z<.01?(a=.707106781,l=.707106781,c=0):(c=Math.sqrt(z),a=L/c,l=b/c),this.set(a,l,c,n),this}let N=Math.sqrt((y-E)*(y-E)+(v-w)*(v-w)+(g-_)*(g-_));return Math.abs(N)<.001&&(N=1),this.x=(y-E)/N,this.y=(v-w)/N,this.z=(g-_)/N,this.w=Math.acos((p+M+x-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Me(this.x,t.x,n.x),this.y=Me(this.y,t.y,n.y),this.z=Me(this.z,t.z,n.z),this.w=Me(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Me(this.x,t,n),this.y=Me(this.y,t,n),this.z=Me(this.z,t,n),this.w=Me(this.w,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Me(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class O1 extends Ms{constructor(t=1,n=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=a.depth,this.scissor=new an(0,0,t,n),this.scissorTest=!1,this.viewport=new an(0,0,t,n),this.textures=[];const l={width:t,height:n,depth:a.depth},c=new qn(l),f=a.count;for(let m=0;m<f;m++)this.textures[m]=c.clone(),this.textures[m].isRenderTargetTexture=!0,this.textures[m].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveColorBuffer=a.resolveColorBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.storeMultisampledColorBuffer=a.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=a.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=a.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:Wn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=n,this.textures[l].image.depth=a,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const l=Object.assign({},t.textures[n].image);this.textures[n].source=new Hp(l)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zi extends O1{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class ox extends qn{constructor(t=null,n=1,a=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:l},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=La,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class P1 extends qn{constructor(t=null,n=1,a=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:l},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=La,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class qe{static{qe.prototype.isMatrix4=!0}constructor(t,n,a,l,c,f,m,d,p,_,v,g,M,E,w,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,l,c,f,m,d,p,_,v,g,M,E,w,y)}set(t,n,a,l,c,f,m,d,p,_,v,g,M,E,w,y){const x=this.elements;return x[0]=t,x[4]=n,x[8]=a,x[12]=l,x[1]=c,x[5]=f,x[9]=m,x[13]=d,x[2]=p,x[6]=_,x[10]=v,x[14]=g,x[3]=M,x[7]=E,x[11]=w,x[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qe().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,a=t.elements,l=1/Ur.setFromMatrixColumn(t,0).length(),c=1/Ur.setFromMatrixColumn(t,1).length(),f=1/Ur.setFromMatrixColumn(t,2).length();return n[0]=a[0]*l,n[1]=a[1]*l,n[2]=a[2]*l,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*f,n[9]=a[9]*f,n[10]=a[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,l=t.y,c=t.z,f=Math.cos(a),m=Math.sin(a),d=Math.cos(l),p=Math.sin(l),_=Math.cos(c),v=Math.sin(c);if(t.order==="XYZ"){const g=f*_,M=f*v,E=m*_,w=m*v;n[0]=d*_,n[4]=-d*v,n[8]=p,n[1]=M+E*p,n[5]=g-w*p,n[9]=-m*d,n[2]=w-g*p,n[6]=E+M*p,n[10]=f*d}else if(t.order==="YXZ"){const g=d*_,M=d*v,E=p*_,w=p*v;n[0]=g+w*m,n[4]=E*m-M,n[8]=f*p,n[1]=f*v,n[5]=f*_,n[9]=-m,n[2]=M*m-E,n[6]=w+g*m,n[10]=f*d}else if(t.order==="ZXY"){const g=d*_,M=d*v,E=p*_,w=p*v;n[0]=g-w*m,n[4]=-f*v,n[8]=E+M*m,n[1]=M+E*m,n[5]=f*_,n[9]=w-g*m,n[2]=-f*p,n[6]=m,n[10]=f*d}else if(t.order==="ZYX"){const g=f*_,M=f*v,E=m*_,w=m*v;n[0]=d*_,n[4]=E*p-M,n[8]=g*p+w,n[1]=d*v,n[5]=w*p+g,n[9]=M*p-E,n[2]=-p,n[6]=m*d,n[10]=f*d}else if(t.order==="YZX"){const g=f*d,M=f*p,E=m*d,w=m*p;n[0]=d*_,n[4]=w-g*v,n[8]=E*v+M,n[1]=v,n[5]=f*_,n[9]=-m*_,n[2]=-p*_,n[6]=M*v+E,n[10]=g-w*v}else if(t.order==="XZY"){const g=f*d,M=f*p,E=m*d,w=m*p;n[0]=d*_,n[4]=-v,n[8]=p*_,n[1]=g*v+w,n[5]=f*_,n[9]=M*v-E,n[2]=E*v-M,n[6]=m*_,n[10]=w*v+g}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(z1,t,I1)}lookAt(t,n,a){const l=this.elements;return xi.subVectors(t,n),xi.lengthSq()===0&&(xi.z=1),xi.normalize(),us.crossVectors(a,xi),us.lengthSq()===0&&(Math.abs(a.z)===1?xi.x+=1e-4:xi.z+=1e-4,xi.normalize(),us.crossVectors(a,xi)),us.normalize(),Bc.crossVectors(xi,us),l[0]=us.x,l[4]=Bc.x,l[8]=xi.x,l[1]=us.y,l[5]=Bc.y,l[9]=xi.y,l[2]=us.z,l[6]=Bc.z,l[10]=xi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,l=n.elements,c=this.elements,f=a[0],m=a[4],d=a[8],p=a[12],_=a[1],v=a[5],g=a[9],M=a[13],E=a[2],w=a[6],y=a[10],x=a[14],N=a[3],H=a[7],C=a[11],z=a[15],O=l[0],L=l[4],b=l[8],P=l[12],k=l[1],Q=l[5],K=l[9],lt=l[13],Z=l[2],nt=l[6],B=l[10],V=l[14],ft=l[3],it=l[7],dt=l[11],D=l[15];return c[0]=f*O+m*k+d*Z+p*ft,c[4]=f*L+m*Q+d*nt+p*it,c[8]=f*b+m*K+d*B+p*dt,c[12]=f*P+m*lt+d*V+p*D,c[1]=_*O+v*k+g*Z+M*ft,c[5]=_*L+v*Q+g*nt+M*it,c[9]=_*b+v*K+g*B+M*dt,c[13]=_*P+v*lt+g*V+M*D,c[2]=E*O+w*k+y*Z+x*ft,c[6]=E*L+w*Q+y*nt+x*it,c[10]=E*b+w*K+y*B+x*dt,c[14]=E*P+w*lt+y*V+x*D,c[3]=N*O+H*k+C*Z+z*ft,c[7]=N*L+H*Q+C*nt+z*it,c[11]=N*b+H*K+C*B+z*dt,c[15]=N*P+H*lt+C*V+z*D,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],l=t[8],c=t[12],f=t[1],m=t[5],d=t[9],p=t[13],_=t[2],v=t[6],g=t[10],M=t[14],E=t[3],w=t[7],y=t[11],x=t[15],N=d*M-p*g,H=m*M-p*v,C=m*g-d*v,z=f*M-p*_,O=f*g-d*_,L=f*v-m*_;return n*(w*N-y*H+x*C)-a*(E*N-y*z+x*O)+l*(E*H-w*z+x*L)-c*(E*C-w*O+y*L)}determinantAffine(){const t=this.elements,n=t[0],a=t[4],l=t[8],c=t[1],f=t[5],m=t[9],d=t[2],p=t[6],_=t[10];return n*(f*_-m*p)-a*(c*_-m*d)+l*(c*p-f*d)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=n,l[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],m=t[5],d=t[6],p=t[7],_=t[8],v=t[9],g=t[10],M=t[11],E=t[12],w=t[13],y=t[14],x=t[15],N=n*m-a*f,H=n*d-l*f,C=n*p-c*f,z=a*d-l*m,O=a*p-c*m,L=l*p-c*d,b=_*w-v*E,P=_*y-g*E,k=_*x-M*E,Q=v*y-g*w,K=v*x-M*w,lt=g*x-M*y,Z=N*lt-H*K+C*Q+z*k-O*P+L*b;if(Z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const nt=1/Z;return t[0]=(m*lt-d*K+p*Q)*nt,t[1]=(l*K-a*lt-c*Q)*nt,t[2]=(w*L-y*O+x*z)*nt,t[3]=(g*O-v*L-M*z)*nt,t[4]=(d*k-f*lt-p*P)*nt,t[5]=(n*lt-l*k+c*P)*nt,t[6]=(y*C-E*L-x*H)*nt,t[7]=(_*L-g*C+M*H)*nt,t[8]=(f*K-m*k+p*b)*nt,t[9]=(a*k-n*K-c*b)*nt,t[10]=(E*O-w*C+x*N)*nt,t[11]=(v*C-_*O-M*N)*nt,t[12]=(m*P-f*Q-d*b)*nt,t[13]=(n*Q-a*P+l*b)*nt,t[14]=(w*H-E*z-y*N)*nt,t[15]=(_*z-v*H+g*N)*nt,this}scale(t){const n=this.elements,a=t.x,l=t.y,c=t.z;return n[0]*=a,n[4]*=l,n[8]*=c,n[1]*=a,n[5]*=l,n[9]*=c,n[2]*=a,n[6]*=l,n[10]*=c,n[3]*=a,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,l))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),l=Math.sin(n),c=1-a,f=t.x,m=t.y,d=t.z,p=c*f,_=c*m;return this.set(p*f+a,p*m-l*d,p*d+l*m,0,p*m+l*d,_*m+a,_*d-l*f,0,p*d-l*m,_*d+l*f,c*d*d+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,l,c,f){return this.set(1,a,c,0,t,1,f,0,n,l,1,0,0,0,0,1),this}compose(t,n,a){const l=this.elements,c=n._x,f=n._y,m=n._z,d=n._w,p=c+c,_=f+f,v=m+m,g=c*p,M=c*_,E=c*v,w=f*_,y=f*v,x=m*v,N=d*p,H=d*_,C=d*v,z=a.x,O=a.y,L=a.z;return l[0]=(1-(w+x))*z,l[1]=(M+C)*z,l[2]=(E-H)*z,l[3]=0,l[4]=(M-C)*O,l[5]=(1-(g+x))*O,l[6]=(y+N)*O,l[7]=0,l[8]=(E+H)*L,l[9]=(y-N)*L,l[10]=(1-(g+w))*L,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,n,a){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),n.identity(),this;let f=Ur.set(l[0],l[1],l[2]).length();const m=Ur.set(l[4],l[5],l[6]).length(),d=Ur.set(l[8],l[9],l[10]).length();c<0&&(f=-f),Gi.copy(this);const p=1/f,_=1/m,v=1/d;return Gi.elements[0]*=p,Gi.elements[1]*=p,Gi.elements[2]*=p,Gi.elements[4]*=_,Gi.elements[5]*=_,Gi.elements[6]*=_,Gi.elements[8]*=v,Gi.elements[9]*=v,Gi.elements[10]*=v,n.setFromRotationMatrix(Gi),a.x=f,a.y=m,a.z=d,this}makePerspective(t,n,a,l,c,f,m=sa,d=!1){const p=this.elements,_=2*c/(n-t),v=2*c/(a-l),g=(n+t)/(n-t),M=(a+l)/(a-l);let E,w;if(d)E=c/(f-c),w=f*c/(f-c);else if(m===sa)E=-(f+c)/(f-c),w=-2*f*c/(f-c);else if(m===Ml)E=-f/(f-c),w=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+m);return p[0]=_,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=v,p[9]=M,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=w,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,a,l,c,f,m=sa,d=!1){const p=this.elements,_=2/(n-t),v=2/(a-l),g=-(n+t)/(n-t),M=-(a+l)/(a-l);let E,w;if(d)E=1/(f-c),w=f/(f-c);else if(m===sa)E=-2/(f-c),w=-(f+c)/(f-c);else if(m===Ml)E=-1/(f-c),w=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+m);return p[0]=_,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=v,p[9]=0,p[13]=M,p[2]=0,p[6]=0,p[10]=E,p[14]=w,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let l=0;l<16;l++)if(n[l]!==a[l])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}}const Ur=new J,Gi=new qe,z1=new J(0,0,0),I1=new J(1,1,1),us=new J,Bc=new J,xi=new J,W_=new qe,X_=new Ss;class Js{constructor(t=0,n=0,a=0,l=Js.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,l=this._order){return this._x=t,this._y=n,this._z=a,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const l=t.elements,c=l[0],f=l[4],m=l[8],d=l[1],p=l[5],_=l[9],v=l[2],g=l[6],M=l[10];switch(n){case"XYZ":this._y=Math.asin(Me(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(m,M),this._z=Math.atan2(d,p)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(Me(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-v,M),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(d,c));break;case"ZYX":this._y=Math.asin(-Me(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(g,M),this._z=Math.atan2(d,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(Me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-_,p),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(m,M));break;case"XZY":this._z=Math.asin(-Me(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(m,c)):(this._x=Math.atan2(-_,M),this._y=0);break;default:se("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return W_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(W_,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return X_.setFromEuler(this),this.setFromQuaternion(X_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Js.DEFAULT_ORDER="XYZ";class lx{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let B1=0;const Y_=new J,Lr=new Ss,Aa=new qe,Fc=new J,nl=new J,F1=new J,H1=new Ss,q_=new J(1,0,0),Z_=new J(0,1,0),K_=new J(0,0,1),Q_={type:"added"},G1={type:"removed"},Nr={type:"childadded",child:null},cd={type:"childremoved",child:null};class hn extends Ms{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:B1++}),this.uuid=vs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=hn.DEFAULT_UP.clone();const t=new J,n=new Js,a=new Ss,l=new J(1,1,1);function c(){a.setFromEuler(n,!1)}function f(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new qe},normalMatrix:{value:new ue}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=hn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Lr.setFromAxisAngle(t,n),this.quaternion.multiply(Lr),this}rotateOnWorldAxis(t,n){return Lr.setFromAxisAngle(t,n),this.quaternion.premultiply(Lr),this}rotateX(t){return this.rotateOnAxis(q_,t)}rotateY(t){return this.rotateOnAxis(Z_,t)}rotateZ(t){return this.rotateOnAxis(K_,t)}translateOnAxis(t,n){return Y_.copy(t).applyQuaternion(this.quaternion),this.position.add(Y_.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(q_,t)}translateY(t){return this.translateOnAxis(Z_,t)}translateZ(t){return this.translateOnAxis(K_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Aa.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Fc.copy(t):Fc.set(t,n,a);const l=this.parent;this.updateWorldMatrix(!0,!1),nl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Aa.lookAt(nl,Fc,this.up):Aa.lookAt(Fc,nl,this.up),this.quaternion.setFromRotationMatrix(Aa),l&&(Aa.extractRotation(l.matrixWorld),Lr.setFromRotationMatrix(Aa),this.quaternion.premultiply(Lr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Ce("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Q_),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null):Ce("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(G1),cd.child=t,this.dispatchEvent(cd),cd.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Aa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Aa.multiply(t.parent.matrixWorld)),t.applyMatrix4(Aa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Q_),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,l=this.children.length;a<l;a++){const f=this.children[a].getObjectByProperty(t,n);if(f!==void 0)return f}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,t,F1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,H1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,a=t.y,l=t.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*a-c[8]*l,c[13]+=a-c[1]*n-c[5]*a-c[9]*l,c[14]+=l-c[2]*n-c[6]*a-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n,a=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),n===!0){const c=this.children;for(let f=0,m=c.length;f<m;f++)c[f].updateWorldMatrix(!1,!0,a)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(m=>({...m,boundingBox:m.boundingBox?m.boundingBox.toJSON():void 0,boundingSphere:m.boundingSphere?m.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(m=>({...m})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(m,d){return m[d.uuid]===void 0&&(m[d.uuid]=d.toJSON(t)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const m=this.geometry.parameters;if(m!==void 0&&m.shapes!==void 0){const d=m.shapes;if(Array.isArray(d))for(let p=0,_=d.length;p<_;p++){const v=d[p];c(t.shapes,v)}else c(t.shapes,d)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const m=[];for(let d=0,p=this.material.length;d<p;d++)m.push(c(t.materials,this.material[d]));l.material=m}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let m=0;m<this.children.length;m++)l.children.push(this.children[m].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let m=0;m<this.animations.length;m++){const d=this.animations[m];l.animations.push(c(t.animations,d))}}if(n){const m=f(t.geometries),d=f(t.materials),p=f(t.textures),_=f(t.images),v=f(t.shapes),g=f(t.skeletons),M=f(t.animations),E=f(t.nodes);m.length>0&&(a.geometries=m),d.length>0&&(a.materials=d),p.length>0&&(a.textures=p),_.length>0&&(a.images=_),v.length>0&&(a.shapes=v),g.length>0&&(a.skeletons=g),M.length>0&&(a.animations=M),E.length>0&&(a.nodes=E)}return a.object=l,a;function f(m){const d=[];for(const p in m){const _=m[p];delete _.metadata,d.push(_)}return d}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const l=t.children[a];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}hn.DEFAULT_UP=new J(0,1,0);hn.DEFAULT_MATRIX_AUTO_UPDATE=!0;hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Jr extends hn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const V1={type:"move"};class ud{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let l=null,c=null,f=null;const m=this._targetRay,d=this._grip,p=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(p&&t.hand){f=!0;for(const w of t.hand.values()){const y=n.getJointPose(w,a),x=this._getHandJoint(p,w);y!==null&&(x.matrix.fromArray(y.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=y.radius),x.visible=y!==null}const _=p.joints["index-finger-tip"],v=p.joints["thumb-tip"],g=_.position.distanceTo(v.position),M=.02,E=.005;p.inputState.pinching&&g>M+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&g<=M-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else d!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(d.matrix.fromArray(c.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,c.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(c.linearVelocity)):d.hasLinearVelocity=!1,c.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(c.angularVelocity)):d.hasAngularVelocity=!1,d.eventsEnabled&&d.dispatchEvent({type:"gripUpdated",data:t,target:this})));m!==null&&(l=n.getPose(t.targetRaySpace,a),l===null&&c!==null&&(l=c),l!==null&&(m.matrix.fromArray(l.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,l.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(l.linearVelocity)):m.hasLinearVelocity=!1,l.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(l.angularVelocity)):m.hasAngularVelocity=!1,this.dispatchEvent(V1)))}return m!==null&&(m.visible=l!==null),d!==null&&(d.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new Jr;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const cx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fs={h:0,s:0,l:0},Hc={h:0,s:0,l:0};function fd(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class ae{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=li){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ae.colorSpaceToWorking(this,n),this}setRGB(t,n,a,l=Ae.workingColorSpace){return this.r=t,this.g=n,this.b=a,Ae.colorSpaceToWorking(this,l),this}setHSL(t,n,a,l=Ae.workingColorSpace){if(t=w1(t,1),n=Me(n,0,1),a=Me(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,f=2*a-c;this.r=fd(f,c,t+1/3),this.g=fd(f,c,t),this.b=fd(f,c,t-1/3)}return Ae.colorSpaceToWorking(this,l),this}setStyle(t,n=li){function a(c){c!==void 0&&parseFloat(c)<1&&se("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],m=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(m))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(m))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(m))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:se("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);se("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=li){const a=cx[t.toLowerCase()];return a!==void 0?this.setHex(a,n):se("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Oa(t.r),this.g=Oa(t.g),this.b=Oa(t.b),this}copyLinearToSRGB(t){return this.r=eo(t.r),this.g=eo(t.g),this.b=eo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=li){return Ae.workingToColorSpace(Vn.copy(this),t),Math.round(Me(Vn.r*255,0,255))*65536+Math.round(Me(Vn.g*255,0,255))*256+Math.round(Me(Vn.b*255,0,255))}getHexString(t=li){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ae.workingColorSpace){Ae.workingToColorSpace(Vn.copy(this),n);const a=Vn.r,l=Vn.g,c=Vn.b,f=Math.max(a,l,c),m=Math.min(a,l,c);let d,p;const _=(m+f)/2;if(m===f)d=0,p=0;else{const v=f-m;switch(p=_<=.5?v/(f+m):v/(2-f-m),f){case a:d=(l-c)/v+(l<c?6:0);break;case l:d=(c-a)/v+2;break;case c:d=(a-l)/v+4;break}d/=6}return t.h=d,t.s=p,t.l=_,t}getRGB(t,n=Ae.workingColorSpace){return Ae.workingToColorSpace(Vn.copy(this),n),t.r=Vn.r,t.g=Vn.g,t.b=Vn.b,t}getStyle(t=li){Ae.workingToColorSpace(Vn.copy(this),t);const n=Vn.r,a=Vn.g,l=Vn.b;return t!==li?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(l*255)})`}offsetHSL(t,n,a){return this.getHSL(fs),this.setHSL(fs.h+t,fs.s+n,fs.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(fs),t.getHSL(Hc);const a=ad(fs.h,Hc.h,n),l=ad(fs.s,Hc.s,n),c=ad(fs.l,Hc.l,n);return this.setHSL(a,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,l=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*l,this.g=c[1]*n+c[4]*a+c[7]*l,this.b=c[2]*n+c[5]*a+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vn=new ae;ae.NAMES=cx;class Gp{constructor(t,n=1,a=1e3){this.isFog=!0,this.name="",this.color=new ae(t),this.near=n,this.far=a}clone(){return new Gp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class k1 extends hn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Js,this.environmentIntensity=1,this.environmentRotation=new Js,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Vi=new J,Ra=new J,hd=new J,wa=new J,Or=new J,Pr=new J,J_=new J,dd=new J,pd=new J,md=new J,gd=new an,_d=new an,vd=new an;class Oi{constructor(t=new J,n=new J,a=new J){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,l){l.subVectors(a,n),Vi.subVectors(t,n),l.cross(Vi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,n,a,l,c){Vi.subVectors(l,n),Ra.subVectors(a,n),hd.subVectors(t,n);const f=Vi.dot(Vi),m=Vi.dot(Ra),d=Vi.dot(hd),p=Ra.dot(Ra),_=Ra.dot(hd),v=f*p-m*m;if(v===0)return c.set(0,0,0),null;const g=1/v,M=(p*d-m*_)*g,E=(f*_-m*d)*g;return c.set(1-M-E,E,M)}static containsPoint(t,n,a,l){return this.getBarycoord(t,n,a,l,wa)===null?!1:wa.x>=0&&wa.y>=0&&wa.x+wa.y<=1}static getInterpolation(t,n,a,l,c,f,m,d){return this.getBarycoord(t,n,a,l,wa)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(c,wa.x),d.addScaledVector(f,wa.y),d.addScaledVector(m,wa.z),d)}static getInterpolatedAttribute(t,n,a,l,c,f){return gd.setScalar(0),_d.setScalar(0),vd.setScalar(0),gd.fromBufferAttribute(t,n),_d.fromBufferAttribute(t,a),vd.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(gd,c.x),f.addScaledVector(_d,c.y),f.addScaledVector(vd,c.z),f}static isFrontFacing(t,n,a,l){return Vi.subVectors(a,n),Ra.subVectors(t,n),Vi.cross(Ra).dot(l)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,l){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,n,a,l){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Vi.subVectors(this.c,this.b),Ra.subVectors(this.a,this.b),Vi.cross(Ra).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Oi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Oi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,l,c){return Oi.getInterpolation(t,this.a,this.b,this.c,n,a,l,c)}containsPoint(t){return Oi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Oi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,l=this.b,c=this.c;let f,m;Or.subVectors(l,a),Pr.subVectors(c,a),dd.subVectors(t,a);const d=Or.dot(dd),p=Pr.dot(dd);if(d<=0&&p<=0)return n.copy(a);pd.subVectors(t,l);const _=Or.dot(pd),v=Pr.dot(pd);if(_>=0&&v<=_)return n.copy(l);const g=d*v-_*p;if(g<=0&&d>=0&&_<=0)return f=d/(d-_),n.copy(a).addScaledVector(Or,f);md.subVectors(t,c);const M=Or.dot(md),E=Pr.dot(md);if(E>=0&&M<=E)return n.copy(c);const w=M*p-d*E;if(w<=0&&p>=0&&E<=0)return m=p/(p-E),n.copy(a).addScaledVector(Pr,m);const y=_*E-M*v;if(y<=0&&v-_>=0&&M-E>=0)return J_.subVectors(c,l),m=(v-_)/(v-_+(M-E)),n.copy(l).addScaledVector(J_,m);const x=1/(y+w+g);return f=w*x,m=g*x,n.copy(a).addScaledVector(Or,f).addScaledVector(Pr,m)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class El{constructor(t=new J(1/0,1/0,1/0),n=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(ki.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(ki.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=ki.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,m=c.count;f<m;f++)t.isMesh===!0?t.getVertexPosition(f,ki):ki.fromBufferAttribute(c,f),ki.applyMatrix4(t.matrixWorld),this.expandByPoint(ki);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Gc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Gc.copy(a.boundingBox)),Gc.applyMatrix4(t.matrixWorld),this.union(Gc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ki),ki.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(il),Vc.subVectors(this.max,il),zr.subVectors(t.a,il),Ir.subVectors(t.b,il),Br.subVectors(t.c,il),hs.subVectors(Ir,zr),ds.subVectors(Br,Ir),Vs.subVectors(zr,Br);let n=[0,-hs.z,hs.y,0,-ds.z,ds.y,0,-Vs.z,Vs.y,hs.z,0,-hs.x,ds.z,0,-ds.x,Vs.z,0,-Vs.x,-hs.y,hs.x,0,-ds.y,ds.x,0,-Vs.y,Vs.x,0];return!xd(n,zr,Ir,Br,Vc)||(n=[1,0,0,0,1,0,0,0,1],!xd(n,zr,Ir,Br,Vc))?!1:(kc.crossVectors(hs,ds),n=[kc.x,kc.y,kc.z],xd(n,zr,Ir,Br,Vc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ki).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ki).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ca[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ca[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ca[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ca[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ca[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ca[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ca[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ca[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ca),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ca=[new J,new J,new J,new J,new J,new J,new J,new J],ki=new J,Gc=new El,zr=new J,Ir=new J,Br=new J,hs=new J,ds=new J,Vs=new J,il=new J,Vc=new J,kc=new J,ks=new J;function xd(r,t,n,a,l){for(let c=0,f=r.length-3;c<=f;c+=3){ks.fromArray(r,c);const m=l.x*Math.abs(ks.x)+l.y*Math.abs(ks.y)+l.z*Math.abs(ks.z),d=t.dot(ks),p=n.dot(ks),_=a.dot(ks);if(Math.max(-Math.max(d,p,_),Math.min(d,p,_))>m)return!1}return!0}const yn=new J,Wc=new ne;let W1=0;class Xn extends Ms{constructor(t,n,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:W1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=sx,this.updateRanges=[],this.gpuType=aa,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=n.array[a+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Wc.fromBufferAttribute(this,n),Wc.applyMatrix3(t),this.setXY(n,Wc.x,Wc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.applyMatrix3(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.applyMatrix4(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.applyNormalMatrix(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)yn.fromBufferAttribute(this,n),yn.transformDirection(t),this.setXYZ(n,yn.x,yn.y,yn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=ia(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=Ye(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=ia(n,this.array)),n}setX(t,n){return this.normalized&&(n=Ye(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=ia(n,this.array)),n}setY(t,n){return this.normalized&&(n=Ye(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=ia(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Ye(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=ia(n,this.array)),n}setW(t,n){return this.normalized&&(n=Ye(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=Ye(n,this.array),a=Ye(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,l){return t*=this.itemSize,this.normalized&&(n=Ye(n,this.array),a=Ye(a,this.array),l=Ye(l,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=l,this}setXYZW(t,n,a,l,c){return t*=this.itemSize,this.normalized&&(n=Ye(n,this.array),a=Ye(a,this.array),l=Ye(l,this.array),c=Ye(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class ux extends Xn{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class fx extends Xn{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class on extends Xn{constructor(t,n,a){super(new Float32Array(t),n,a)}}const X1=new El,al=new J,Sd=new J;class Tl{constructor(t=new J,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):X1.setFromPoints(t).getCenter(a);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;al.subVectors(t,this.center);const n=al.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),l=(a-this.radius)*.5;this.center.addScaledVector(al,l/a),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sd.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(al.copy(t.center).add(Sd)),this.expandByPoint(al.copy(t.center).sub(Sd))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Y1=0;const Ni=new qe,Md=new hn,Fr=new J,Si=new El,sl=new El,Ln=new J;class Nn extends Ms{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Y1++}),this.uuid=vs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(T1(t)?fx:ux)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new ue().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ni.makeRotationFromQuaternion(t),this.applyMatrix4(Ni),this}rotateX(t){return Ni.makeRotationX(t),this.applyMatrix4(Ni),this}rotateY(t){return Ni.makeRotationY(t),this.applyMatrix4(Ni),this}rotateZ(t){return Ni.makeRotationZ(t),this.applyMatrix4(Ni),this}translate(t,n,a){return Ni.makeTranslation(t,n,a),this.applyMatrix4(Ni),this}scale(t,n,a){return Ni.makeScale(t,n,a),this.applyMatrix4(Ni),this}lookAt(t){return Md.lookAt(t),Md.updateMatrix(),this.applyMatrix4(Md.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fr).negate(),this.translate(Fr.x,Fr.y,Fr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];a.push(f.x,f.y,f.z||0)}this.setAttribute("position",new on(a,3))}else{const a=Math.min(t.length,n.count);for(let l=0;l<a;l++){const c=t[l];n.setXYZ(l,c.x,c.y,c.z||0)}t.length>n.count&&se("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new El);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ce("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,l=n.length;a<l;a++){const c=n[a];Si.setFromBufferAttribute(c),this.morphTargetsRelative?(Ln.addVectors(this.boundingBox.min,Si.min),this.boundingBox.expandByPoint(Ln),Ln.addVectors(this.boundingBox.max,Si.max),this.boundingBox.expandByPoint(Ln)):(this.boundingBox.expandByPoint(Si.min),this.boundingBox.expandByPoint(Si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ce('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ce("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const a=this.boundingSphere.center;if(Si.setFromBufferAttribute(t),n)for(let c=0,f=n.length;c<f;c++){const m=n[c];sl.setFromBufferAttribute(m),this.morphTargetsRelative?(Ln.addVectors(Si.min,sl.min),Si.expandByPoint(Ln),Ln.addVectors(Si.max,sl.max),Si.expandByPoint(Ln)):(Si.expandByPoint(sl.min),Si.expandByPoint(sl.max))}Si.getCenter(a);let l=0;for(let c=0,f=t.count;c<f;c++)Ln.fromBufferAttribute(t,c),l=Math.max(l,a.distanceToSquared(Ln));if(n)for(let c=0,f=n.length;c<f;c++){const m=n[c],d=this.morphTargetsRelative;for(let p=0,_=m.count;p<_;p++)Ln.fromBufferAttribute(m,p),d&&(Fr.fromBufferAttribute(t,p),Ln.add(Fr)),l=Math.max(l,a.distanceToSquared(Ln))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Ce('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ce("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,l=n.normal,c=n.uv;let f=this.getAttribute("tangent");(f===void 0||f.count!==a.count)&&(f=new Xn(new Float32Array(4*a.count),4),this.setAttribute("tangent",f));const m=[],d=[];for(let b=0;b<a.count;b++)m[b]=new J,d[b]=new J;const p=new J,_=new J,v=new J,g=new ne,M=new ne,E=new ne,w=new J,y=new J;function x(b,P,k){p.fromBufferAttribute(a,b),_.fromBufferAttribute(a,P),v.fromBufferAttribute(a,k),g.fromBufferAttribute(c,b),M.fromBufferAttribute(c,P),E.fromBufferAttribute(c,k),_.sub(p),v.sub(p),M.sub(g),E.sub(g);const Q=1/(M.x*E.y-E.x*M.y);isFinite(Q)&&(w.copy(_).multiplyScalar(E.y).addScaledVector(v,-M.y).multiplyScalar(Q),y.copy(v).multiplyScalar(M.x).addScaledVector(_,-E.x).multiplyScalar(Q),m[b].add(w),m[P].add(w),m[k].add(w),d[b].add(y),d[P].add(y),d[k].add(y))}let N=this.groups;N.length===0&&(N=[{start:0,count:t.count}]);for(let b=0,P=N.length;b<P;++b){const k=N[b],Q=k.start,K=k.count;for(let lt=Q,Z=Q+K;lt<Z;lt+=3)x(t.getX(lt+0),t.getX(lt+1),t.getX(lt+2))}const H=new J,C=new J,z=new J,O=new J;function L(b){z.fromBufferAttribute(l,b),O.copy(z);const P=m[b];H.copy(P),H.sub(z.multiplyScalar(z.dot(P))).normalize(),C.crossVectors(O,P);const Q=C.dot(d[b])<0?-1:1;f.setXYZW(b,H.x,H.y,H.z,Q)}for(let b=0,P=N.length;b<P;++b){const k=N[b],Q=k.start,K=k.count;for(let lt=Q,Z=Q+K;lt<Z;lt+=3)L(t.getX(lt+0)),L(t.getX(lt+1)),L(t.getX(lt+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==n.count)a=new Xn(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let g=0,M=a.count;g<M;g++)a.setXYZ(g,0,0,0);const l=new J,c=new J,f=new J,m=new J,d=new J,p=new J,_=new J,v=new J;if(t)for(let g=0,M=t.count;g<M;g+=3){const E=t.getX(g+0),w=t.getX(g+1),y=t.getX(g+2);l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,w),f.fromBufferAttribute(n,y),_.subVectors(f,c),v.subVectors(l,c),_.cross(v),m.fromBufferAttribute(a,E),d.fromBufferAttribute(a,w),p.fromBufferAttribute(a,y),m.add(_),d.add(_),p.add(_),a.setXYZ(E,m.x,m.y,m.z),a.setXYZ(w,d.x,d.y,d.z),a.setXYZ(y,p.x,p.y,p.z)}else for(let g=0,M=n.count;g<M;g+=3)l.fromBufferAttribute(n,g+0),c.fromBufferAttribute(n,g+1),f.fromBufferAttribute(n,g+2),_.subVectors(f,c),v.subVectors(l,c),_.cross(v),a.setXYZ(g+0,_.x,_.y,_.z),a.setXYZ(g+1,_.x,_.y,_.z),a.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)Ln.fromBufferAttribute(t,n),Ln.normalize(),t.setXYZ(n,Ln.x,Ln.y,Ln.z)}toNonIndexed(){function t(m,d){const p=m.array,_=m.itemSize,v=m.normalized,g=new p.constructor(d.length*_);let M=0,E=0;for(let w=0,y=d.length;w<y;w++){m.isInterleavedBufferAttribute?M=d[w]*m.data.stride+m.offset:M=d[w]*_;for(let x=0;x<_;x++)g[E++]=p[M++]}return new Xn(g,_,v)}if(this.index===null)return se("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Nn,a=this.index.array,l=this.attributes;for(const m in l){const d=l[m],p=t(d,a);n.setAttribute(m,p)}const c=this.morphAttributes;for(const m in c){const d=[],p=c[m];for(let _=0,v=p.length;_<v;_++){const g=p[_],M=t(g,a);d.push(M)}n.morphAttributes[m]=d}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let m=0,d=f.length;m<d;m++){const p=f[m];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const d=this.parameters;for(const p in d)d[p]!==void 0&&(t[p]=d[p]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const d in a){const p=a[d];t.data.attributes[d]=p.toJSON(t.data)}const l={};let c=!1;for(const d in this.morphAttributes){const p=this.morphAttributes[d],_=[];for(let v=0,g=p.length;v<g;v++){const M=p[v];_.push(M.toJSON(t.data))}_.length>0&&(l[d]=_,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const m=this.boundingSphere;return m!==null&&(t.data.boundingSphere=m.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const l=t.attributes;for(const p in l){const _=l[p];this.setAttribute(p,_.clone(n))}const c=t.morphAttributes;for(const p in c){const _=[],v=c[p];for(let g=0,M=v.length;g<M;g++)_.push(v[g].clone(n));this.morphAttributes[p]=_}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let p=0,_=f.length;p<_;p++){const v=f[p];this.addGroup(v.start,v.count,v.materialIndex)}const m=t.boundingBox;m!==null&&(this.boundingBox=m.clone());const d=t.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class q1{constructor(t,n){this.isInterleavedBuffer=!0,this.array=t,this.stride=n,this.count=t!==void 0?t.length/n:0,this.usage=sx,this.updateRanges=[],this.version=0,this.uuid=vs()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,n,a){t*=this.stride,a*=n.stride;for(let l=0,c=this.stride;l<c;l++)this.array[t+l]=n.array[a+l];return this}set(t,n=0){return this.array.set(t,n),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vs()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),a=new this.constructor(n,this.stride);return a.setUsage(this.usage),a}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vs()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const n={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}const Jn=new J;class Cu{constructor(t,n,a,l=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=n,this.offset=a,this.normalized=l}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let n=0,a=this.data.count;n<a;n++)Jn.fromBufferAttribute(this,n),Jn.applyMatrix4(t),this.setXYZ(n,Jn.x,Jn.y,Jn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)Jn.fromBufferAttribute(this,n),Jn.applyNormalMatrix(t),this.setXYZ(n,Jn.x,Jn.y,Jn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)Jn.fromBufferAttribute(this,n),Jn.transformDirection(t),this.setXYZ(n,Jn.x,Jn.y,Jn.z);return this}getComponent(t,n){let a=this.array[t*this.data.stride+this.offset+n];return this.normalized&&(a=ia(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=Ye(a,this.array)),this.data.array[t*this.data.stride+this.offset+n]=a,this}setX(t,n){return this.normalized&&(n=Ye(n,this.array)),this.data.array[t*this.data.stride+this.offset]=n,this}setY(t,n){return this.normalized&&(n=Ye(n,this.array)),this.data.array[t*this.data.stride+this.offset+1]=n,this}setZ(t,n){return this.normalized&&(n=Ye(n,this.array)),this.data.array[t*this.data.stride+this.offset+2]=n,this}setW(t,n){return this.normalized&&(n=Ye(n,this.array)),this.data.array[t*this.data.stride+this.offset+3]=n,this}getX(t){let n=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(n=ia(n,this.array)),n}getY(t){let n=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(n=ia(n,this.array)),n}getZ(t){let n=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(n=ia(n,this.array)),n}getW(t){let n=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(n=ia(n,this.array)),n}setXY(t,n,a){return t=t*this.data.stride+this.offset,this.normalized&&(n=Ye(n,this.array),a=Ye(a,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=a,this}setXYZ(t,n,a,l){return t=t*this.data.stride+this.offset,this.normalized&&(n=Ye(n,this.array),a=Ye(a,this.array),l=Ye(l,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=a,this.data.array[t+2]=l,this}setXYZW(t,n,a,l,c){return t=t*this.data.stride+this.offset,this.normalized&&(n=Ye(n,this.array),a=Ye(a,this.array),l=Ye(l,this.array),c=Ye(c,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=a,this.data.array[t+2]=l,this.data.array[t+3]=c,this}clone(t){if(t===void 0){Ru("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let a=0;a<this.count;a++){const l=a*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)n.push(this.data.array[l+c])}return new Xn(new this.array.constructor(n),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Cu(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ru("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let a=0;a<this.count;a++){const l=a*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)n.push(this.data.array[l+c])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const yd=new J,Z1=new J,K1=new ue;class ea{constructor(t=new J(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,l){return this.normal.set(t,n,a),this.constant=l,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const l=yd.subVectors(a,n).cross(Z1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,a=!0){const l=t.delta(yd),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const f=-(t.start.dot(this.normal)+this.constant)/c;return a===!0&&(f<0||f>1)?null:n.copy(t.start).addScaledVector(l,f)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||K1.getNormalMatrix(t),l=this.coplanarPoint(yd).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Q1=0;class ys extends Ms{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Q1++}),this.uuid=vs(),this.name="",this.type="Material",this.blending=gl,this.side=xs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kv,this.blendDst=Wv,this.blendEquation=Kr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ae(0,0,0),this.blendAlpha=0,this.depthFunc=vl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=id,this.stencilZFail=id,this.stencilZPass=id,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){se(`Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){se(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(a):l&&l.isVector2&&a&&a.isVector2||l&&l.isEuler&&a&&a.isEuler||l&&l.isVector3&&a&&a.isVector3?l.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,a.blending=this.blending,a.side=this.side,a.shadowSide=this.shadowSide,a.vertexColors=this.vertexColors,a.opacity=this.opacity,a.transparent=this.transparent,a.blendSrc=this.blendSrc,a.blendDst=this.blendDst,a.blendEquation=this.blendEquation,a.blendSrcAlpha=this.blendSrcAlpha,a.blendDstAlpha=this.blendDstAlpha,a.blendEquationAlpha=this.blendEquationAlpha,a.blendColor=this.blendColor.getHex(),a.blendAlpha=this.blendAlpha,a.depthFunc=this.depthFunc,a.depthTest=this.depthTest,a.depthWrite=this.depthWrite,a.colorWrite=this.colorWrite,a.clipIntersection=this.clipIntersection,a.clipShadows=this.clipShadows,a.stencilWriteMask=this.stencilWriteMask,a.stencilFunc=this.stencilFunc,a.stencilRef=this.stencilRef,a.stencilFuncMask=this.stencilFuncMask,a.stencilFail=this.stencilFail,a.stencilZFail=this.stencilZFail,a.stencilZPass=this.stencilZPass,a.stencilWrite=this.stencilWrite,a.polygonOffset=this.polygonOffset,a.polygonOffsetFactor=this.polygonOffsetFactor,a.polygonOffsetUnits=this.polygonOffsetUnits,a.dithering=this.dithering,a.alphaTest=this.alphaTest,a.alphaHash=this.alphaHash,a.alphaToCoverage=this.alphaToCoverage,a.premultipliedAlpha=this.premultipliedAlpha,a.forceSinglePass=this.forceSinglePass,a.allowOverride=this.allowOverride,a.visible=this.visible,a.toneMapped=this.toneMapped,a.name=this.name,this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(a.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(a.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(a.rotation=this.rotation),this.depthPacking!==void 0&&(a.depthPacking=this.depthPacking),this.linewidth!==void 0&&(a.linewidth=this.linewidth),this.linecap!==void 0&&(a.linecap=this.linecap),this.linejoin!==void 0&&(a.linejoin=this.linejoin),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.wireframe!==void 0&&(a.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(a.flatShading=this.flatShading),this.fog!==void 0&&(a.fog=this.fog),Object.keys(this.userData).length>0&&(a.userData=this.userData);function l(c){const f=[];for(const m in c){const d=c[m];delete d.metadata,f.push(d)}return f}if(n){const c=l(t.textures),f=l(t.images);c.length>0&&(a.textures=c),f.length>0&&(a.images=f)}return a}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ae().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(a=>new ea().fromJSON(a))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new ne().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ne().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const l=n.length;a=new Array(l);for(let c=0;c!==l;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class hx extends ys{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ae(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Hr;const rl=new J,Gr=new J,Vr=new J,kr=new ne,ol=new ne,dx=new qe,Xc=new J,ll=new J,Yc=new J,j_=new ne,Ed=new ne,$_=new ne;class J1 extends hn{constructor(t=new hx){if(super(),this.isSprite=!0,this.type="Sprite",Hr===void 0){Hr=new Nn;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),a=new q1(n,5);Hr.setIndex([0,1,2,0,2,3]),Hr.setAttribute("position",new Cu(a,3,0,!1)),Hr.setAttribute("uv",new Cu(a,2,3,!1))}this.geometry=Hr,this.material=t,this.center=new ne(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,n){t.camera===null&&Ce('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gr.setFromMatrixScale(this.matrixWorld),dx.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Vr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gr.multiplyScalar(-Vr.z);const a=this.material.rotation;let l,c;a!==0&&(c=Math.cos(a),l=Math.sin(a));const f=this.center;qc(Xc.set(-.5,-.5,0),Vr,f,Gr,l,c),qc(ll.set(.5,-.5,0),Vr,f,Gr,l,c),qc(Yc.set(.5,.5,0),Vr,f,Gr,l,c),j_.set(0,0),Ed.set(1,0),$_.set(1,1);let m=t.ray.intersectTriangle(Xc,ll,Yc,!1,rl);if(m===null&&(qc(ll.set(-.5,.5,0),Vr,f,Gr,l,c),Ed.set(0,1),m=t.ray.intersectTriangle(Xc,Yc,ll,!1,rl),m===null))return;const d=t.ray.origin.distanceTo(rl);d<t.near||d>t.far||n.push({distance:d,point:rl.clone(),uv:Oi.getInterpolation(rl,Xc,ll,Yc,j_,Ed,$_,new ne),face:null,object:this})}copy(t,n){return super.copy(t,n),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function qc(r,t,n,a,l,c){kr.subVectors(r,n).addScalar(.5).multiply(a),l!==void 0?(ol.x=c*kr.x-l*kr.y,ol.y=l*kr.x+c*kr.y):ol.copy(kr),r.copy(t),r.x+=ol.x,r.y+=ol.y,r.applyMatrix4(dx)}const Da=new J,Td=new J,Zc=new J,Kc=new J;class Iu{constructor(t=new J,n=new J(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Da)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Da.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Da.copy(this.origin).addScaledVector(this.direction,n),Da.distanceToSquared(t))}distanceSqToSegment(t,n,a,l){Td.copy(t).add(n).multiplyScalar(.5),Zc.copy(n).sub(t).normalize(),Kc.copy(this.origin).sub(Td);const c=t.distanceTo(n)*.5,f=-this.direction.dot(Zc),m=Kc.dot(this.direction),d=-Kc.dot(Zc),p=Kc.lengthSq(),_=Math.abs(1-f*f);let v,g,M,E;if(_>0)if(v=f*d-m,g=f*m-d,E=c*_,v>=0)if(g>=-E)if(g<=E){const w=1/_;v*=w,g*=w,M=v*(v+f*g+2*m)+g*(f*v+g+2*d)+p}else g=c,v=Math.max(0,-(f*g+m)),M=-v*v+g*(g+2*d)+p;else g=-c,v=Math.max(0,-(f*g+m)),M=-v*v+g*(g+2*d)+p;else g<=-E?(v=Math.max(0,-(-f*c+m)),g=v>0?-c:Math.min(Math.max(-c,-d),c),M=-v*v+g*(g+2*d)+p):g<=E?(v=0,g=Math.min(Math.max(-c,-d),c),M=g*(g+2*d)+p):(v=Math.max(0,-(f*c+m)),g=v>0?c:Math.min(Math.max(-c,-d),c),M=-v*v+g*(g+2*d)+p);else g=f>0?-c:c,v=Math.max(0,-(f*g+m)),M=-v*v+g*(g+2*d)+p;return a&&a.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(Td).addScaledVector(Zc,g),M}intersectSphere(t,n){if(t.radius<0)return null;Da.subVectors(t.center,this.origin);const a=Da.dot(this.direction),l=Da.dot(Da)-a*a,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),m=a-f,d=a+f;return d<0?null:m<0?this.at(d,n):this.at(m,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,l,c,f,m,d;const p=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,g=this.origin;return p>=0?(a=(t.min.x-g.x)*p,l=(t.max.x-g.x)*p):(a=(t.max.x-g.x)*p,l=(t.min.x-g.x)*p),_>=0?(c=(t.min.y-g.y)*_,f=(t.max.y-g.y)*_):(c=(t.max.y-g.y)*_,f=(t.min.y-g.y)*_),a>f||c>l||((c>a||isNaN(a))&&(a=c),(f<l||isNaN(l))&&(l=f),v>=0?(m=(t.min.z-g.z)*v,d=(t.max.z-g.z)*v):(m=(t.max.z-g.z)*v,d=(t.min.z-g.z)*v),a>d||m>l)||((m>a||a!==a)&&(a=m),(d<l||l!==l)&&(l=d),l<0)?null:this.at(a>=0?a:l,n)}intersectsBox(t){return this.intersectBox(t,Da)!==null}intersectTriangle(t,n,a,l,c){const f=this.origin,m=this.direction,d=m.x,p=m.y,_=m.z,v=t.x-f.x,g=t.y-f.y,M=t.z-f.z,E=n.x-f.x,w=n.y-f.y,y=n.z-f.z,x=a.x-f.x,N=a.y-f.y,H=a.z-f.z,C=Math.abs(d),z=Math.abs(p),O=Math.abs(_);let L,b,P,k,Q,K,lt,Z,nt,B,V,ft;if(C>=z&&C>=O?(P=d,K=v,nt=E,ft=x,d>=0?(L=p,b=_,k=g,Q=M,lt=w,Z=y,B=N,V=H):(L=_,b=p,k=M,Q=g,lt=y,Z=w,B=H,V=N)):z>=O?(P=p,K=g,nt=w,ft=N,p>=0?(L=_,b=d,k=M,Q=v,lt=y,Z=E,B=H,V=x):(L=d,b=_,k=v,Q=M,lt=E,Z=y,B=x,V=H)):(P=_,K=M,nt=y,ft=H,_>=0?(L=d,b=p,k=v,Q=g,lt=E,Z=w,B=x,V=N):(L=p,b=d,k=g,Q=v,lt=w,Z=E,B=N,V=x)),P===0)return null;const it=L/P,dt=b/P,D=1/P,et=k-it*K,vt=Q-dt*K,wt=lt-it*nt,bt=Z-dt*nt,Rt=B-it*ft,$=V-dt*ft,pt=Rt*bt-$*wt,At=et*$-vt*Rt,$t=wt*vt-bt*et;if(l){if(pt<0||At<0||$t<0)return null}else if((pt<0||At<0||$t<0)&&(pt>0||At>0||$t>0))return null;const zt=pt+At+$t;if(zt===0)return null;const re=D*(pt*K+At*nt+$t*ft);return(zt>0?re<0:re>0)?null:this.at(re/zt,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class px extends ys{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Js,this.combine=Xv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const tv=new qe,Ws=new Iu,Qc=new Tl,ev=new J,Jc=new J,jc=new J,$c=new J,bd=new J,tu=new J,nv=new J,eu=new J;class kn extends hn{constructor(t=new Nn,n=new px){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const m=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[m]=c}}}}getVertexPosition(t,n){const a=this.geometry,l=a.attributes.position,c=a.morphAttributes.position,f=a.morphTargetsRelative;n.fromBufferAttribute(l,t);const m=this.morphTargetInfluences;if(c&&m){tu.set(0,0,0);for(let d=0,p=c.length;d<p;d++){const _=m[d],v=c[d];_!==0&&(bd.fromBufferAttribute(v,t),f?tu.addScaledVector(bd,_):tu.addScaledVector(bd.sub(n),_))}n.add(tu)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Qc.copy(a.boundingSphere),Qc.applyMatrix4(c),Ws.copy(t.ray).recast(t.near),!(Qc.containsPoint(Ws.origin)===!1&&(Ws.intersectSphere(Qc,ev)===null||Ws.origin.distanceToSquared(ev)>(t.far-t.near)**2))&&(tv.copy(c).invert(),Ws.copy(t.ray).applyMatrix4(tv),!(a.boundingBox!==null&&Ws.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Ws)))}_computeIntersections(t,n,a){let l;const c=this.geometry,f=this.material,m=c.index,d=c.attributes.position,p=c.attributes.uv,_=c.attributes.uv1,v=c.attributes.normal,g=c.groups,M=c.drawRange;if(m!==null)if(Array.isArray(f))for(let E=0,w=g.length;E<w;E++){const y=g[E],x=f[y.materialIndex],N=Math.max(y.start,M.start),H=Math.min(m.count,Math.min(y.start+y.count,M.start+M.count));for(let C=N,z=H;C<z;C+=3){const O=m.getX(C),L=m.getX(C+1),b=m.getX(C+2);l=nu(this,x,t,a,p,_,v,O,L,b),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=y.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),w=Math.min(m.count,M.start+M.count);for(let y=E,x=w;y<x;y+=3){const N=m.getX(y),H=m.getX(y+1),C=m.getX(y+2);l=nu(this,f,t,a,p,_,v,N,H,C),l&&(l.faceIndex=Math.floor(y/3),n.push(l))}}else if(d!==void 0)if(Array.isArray(f))for(let E=0,w=g.length;E<w;E++){const y=g[E],x=f[y.materialIndex],N=Math.max(y.start,M.start),H=Math.min(d.count,Math.min(y.start+y.count,M.start+M.count));for(let C=N,z=H;C<z;C+=3){const O=C,L=C+1,b=C+2;l=nu(this,x,t,a,p,_,v,O,L,b),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=y.materialIndex,n.push(l))}}else{const E=Math.max(0,M.start),w=Math.min(d.count,M.start+M.count);for(let y=E,x=w;y<x;y+=3){const N=y,H=y+1,C=y+2;l=nu(this,f,t,a,p,_,v,N,H,C),l&&(l.faceIndex=Math.floor(y/3),n.push(l))}}}}function j1(r,t,n,a,l,c,f,m){let d;if(t.side===Yn?d=a.intersectTriangle(f,c,l,!0,m):d=a.intersectTriangle(l,c,f,t.side===xs,m),d===null)return null;eu.copy(m),eu.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo(eu);return p<n.near||p>n.far?null:{distance:p,point:eu.clone(),object:r}}function nu(r,t,n,a,l,c,f,m,d,p){r.getVertexPosition(m,Jc),r.getVertexPosition(d,jc),r.getVertexPosition(p,$c);const _=j1(r,t,n,a,Jc,jc,$c,nv);if(_){const v=new J;Oi.getBarycoord(nv,Jc,jc,$c,v),l&&(_.uv=Oi.getInterpolatedAttribute(l,m,d,p,v,new ne)),c&&(_.uv1=Oi.getInterpolatedAttribute(c,m,d,p,v,new ne)),f&&(_.normal=Oi.getInterpolatedAttribute(f,m,d,p,v,new J),_.normal.dot(a.direction)>0&&_.normal.multiplyScalar(-1));const g={a:m,b:d,c:p,normal:new J,materialIndex:0};Oi.getNormal(Jc,jc,$c,g.normal),_.face=g,_.barycoord=v}return _}class mx extends qn{constructor(t=null,n=1,a=1,l,c,f,m,d,p=Rn,_=Rn,v,g){super(null,f,m,d,p,_,l,c,v,g),this.isDataTexture=!0,this.image={data:t,width:n,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xs=new Tl,$1=new ne(.5,.5),iu=new J;class Vp{constructor(t=new ea,n=new ea,a=new ea,l=new ea,c=new ea,f=new ea){this.planes=[t,n,a,l,c,f]}set(t,n,a,l,c,f){const m=this.planes;return m[0].copy(t),m[1].copy(n),m[2].copy(a),m[3].copy(l),m[4].copy(c),m[5].copy(f),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=sa,a=!1){const l=this.planes,c=t.elements,f=c[0],m=c[1],d=c[2],p=c[3],_=c[4],v=c[5],g=c[6],M=c[7],E=c[8],w=c[9],y=c[10],x=c[11],N=c[12],H=c[13],C=c[14],z=c[15];if(l[0].setComponents(p-f,M-_,x-E,z-N).normalize(),l[1].setComponents(p+f,M+_,x+E,z+N).normalize(),l[2].setComponents(p+m,M+v,x+w,z+H).normalize(),l[3].setComponents(p-m,M-v,x-w,z-H).normalize(),a)l[4].setComponents(d,g,y,C).normalize(),l[5].setComponents(p-d,M-g,x-y,z-C).normalize();else if(l[4].setComponents(p-d,M-g,x-y,z-C).normalize(),n===sa)l[5].setComponents(p+d,M+g,x+y,z+C).normalize();else if(n===Ml)l[5].setComponents(d,g,y,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Xs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Xs)}intersectsSprite(t){Xs.center.set(0,0,0);const n=$1.distanceTo(t.center);return Xs.radius=.7071067811865476+n,Xs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Xs)}intersectsSphere(t){const n=this.planes,a=t.center,l=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<l)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const l=n[a];if(iu.x=l.normal.x>0?t.max.x:t.min.x,iu.y=l.normal.y>0?t.max.y:t.min.y,iu.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(iu)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ty extends ys{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Du=new J,Uu=new J,iv=new qe,cl=new Iu,au=new Tl,Ad=new J,av=new J;class ey extends hn{constructor(t=new Nn,n=new ty){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,a=[0];for(let l=1,c=n.count;l<c;l++)Du.fromBufferAttribute(n,l-1),Uu.fromBufferAttribute(n,l),a[l]=a[l-1],a[l]+=Du.distanceTo(Uu);t.setAttribute("lineDistance",new on(a,1))}else se("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),au.copy(a.boundingSphere),au.applyMatrix4(l),au.radius+=c,t.ray.intersectsSphere(au)===!1)return;iv.copy(l).invert(),cl.copy(t.ray).applyMatrix4(iv);const m=c/((this.scale.x+this.scale.y+this.scale.z)/3),d=m*m,p=this.isLineSegments?2:1,_=a.index,g=a.attributes.position;if(_!==null){const M=Math.max(0,f.start),E=Math.min(_.count,f.start+f.count);for(let w=M,y=E-1;w<y;w+=p){const x=_.getX(w),N=_.getX(w+1),H=su(this,t,cl,d,x,N,w);H&&n.push(H)}if(this.isLineLoop){const w=_.getX(E-1),y=_.getX(M),x=su(this,t,cl,d,w,y,E-1);x&&n.push(x)}}else{const M=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let w=M,y=E-1;w<y;w+=p){const x=su(this,t,cl,d,w,w+1,w);x&&n.push(x)}if(this.isLineLoop){const w=su(this,t,cl,d,E-1,M,E-1);w&&n.push(w)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const m=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[m]=c}}}}}function su(r,t,n,a,l,c,f){const m=r.geometry.attributes.position;if(Du.fromBufferAttribute(m,l),Uu.fromBufferAttribute(m,c),n.distanceSqToSegment(Du,Uu,Ad,av)>a)return;Ad.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(Ad);if(!(p<t.near||p>t.far))return{distance:p,point:av.clone().applyMatrix4(r.matrixWorld),index:f,face:null,faceIndex:null,barycoord:null,object:r}}const sv=new J,rv=new J;class ny extends ey{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,a=[];for(let l=0,c=n.count;l<c;l+=2)sv.fromBufferAttribute(n,l),rv.fromBufferAttribute(n,l+1),a[l]=l===0?0:a[l-1],a[l+1]=a[l]+sv.distanceTo(rv);t.setAttribute("lineDistance",new on(a,1))}else se("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class gx extends ys{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ov=new qe,bp=new Iu,ru=new Tl,ou=new J;class iy extends hn{constructor(t=new Nn,n=new gx){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){const a=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),ru.copy(a.boundingSphere),ru.applyMatrix4(l),ru.radius+=c,t.ray.intersectsSphere(ru)===!1)return;ov.copy(l).invert(),bp.copy(t.ray).applyMatrix4(ov);const m=c/((this.scale.x+this.scale.y+this.scale.z)/3),d=m*m,p=a.index,v=a.attributes.position;if(p!==null){const g=Math.max(0,f.start),M=Math.min(p.count,f.start+f.count);for(let E=g,w=M;E<w;E++){const y=p.getX(E);ou.fromBufferAttribute(v,y),lv(ou,y,d,l,t,n,this)}}else{const g=Math.max(0,f.start),M=Math.min(v.count,f.start+f.count);for(let E=g,w=M;E<w;E++)ou.fromBufferAttribute(v,E),lv(ou,E,d,l,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const m=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[m]=c}}}}}function lv(r,t,n,a,l,c,f){const m=bp.distanceSqToPoint(r);if(m<n){const d=new J;bp.closestPointToPoint(r,d),d.applyMatrix4(a);const p=l.ray.origin.distanceTo(d);if(p<l.near||p>l.far)return;c.push({distance:p,distanceToRay:Math.sqrt(m),point:d,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class _x extends qn{constructor(t=[],n=Ks,a,l,c,f,m,d,p,_){super(t,n,a,l,c,f,m,d,p,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ay extends qn{constructor(t,n,a,l,c,f,m,d,p){super(t,n,a,l,c,f,m,d,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class yl extends qn{constructor(t,n,a=oa,l,c,f,m=Rn,d=Rn,p,_=Pa,v=1){if(_!==Pa&&_!==Zs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:n,depth:v};super(g,l,c,f,m,d,_,a,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Hp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}}class sy extends yl{constructor(t,n=oa,a=Ks,l,c,f=Rn,m=Rn,d,p=Pa){const _={width:t,height:t,depth:1},v=[_,_,_,_,_,_];super(t,t,n,a,l,c,f,m,d,p),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class vx extends qn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class bl extends Nn{constructor(t=1,n=1,a=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:l,heightSegments:c,depthSegments:f};const m=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const d=[],p=[],_=[],v=[];let g=0,M=0;E("z","y","x",-1,-1,a,n,t,f,c,0),E("z","y","x",1,-1,a,n,-t,f,c,1),E("x","z","y",1,1,t,a,n,l,f,2),E("x","z","y",1,-1,t,a,-n,l,f,3),E("x","y","z",1,-1,t,n,a,l,c,4),E("x","y","z",-1,-1,t,n,-a,l,c,5),this.setIndex(d),this.setAttribute("position",new on(p,3)),this.setAttribute("normal",new on(_,3)),this.setAttribute("uv",new on(v,2));function E(w,y,x,N,H,C,z,O,L,b,P){const k=C/L,Q=z/b,K=C/2,lt=z/2,Z=O/2,nt=L+1,B=b+1;let V=0,ft=0;const it=new J;for(let dt=0;dt<B;dt++){const D=dt*Q-lt;for(let et=0;et<nt;et++){const vt=et*k-K;it[w]=vt*N,it[y]=D*H,it[x]=Z,p.push(it.x,it.y,it.z),it[w]=0,it[y]=0,it[x]=O>0?1:-1,_.push(it.x,it.y,it.z),v.push(et/L),v.push(1-dt/b),V+=1}}for(let dt=0;dt<b;dt++)for(let D=0;D<L;D++){const et=g+D+nt*dt,vt=g+D+nt*(dt+1),wt=g+(D+1)+nt*(dt+1),bt=g+(D+1)+nt*dt;d.push(et,vt,bt),d.push(vt,wt,bt),ft+=6}m.addGroup(M,ft,P),M+=ft,g+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class kp extends Nn{constructor(t=1,n=32,a=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:a,thetaLength:l},n=Math.max(3,n);const c=[],f=[],m=[],d=[],p=new J,_=new ne;f.push(0,0,0),m.push(0,0,1),d.push(.5,.5);for(let v=0,g=3;v<=n;v++,g+=3){const M=a+v/n*l;p.x=t*Math.cos(M),p.y=t*Math.sin(M),f.push(p.x,p.y,p.z),m.push(0,0,1),_.x=(f[g]/t+1)/2,_.y=(f[g+1]/t+1)/2,d.push(_.x,_.y)}for(let v=1;v<=n;v++)c.push(v,v+1,0);this.setIndex(c),this.setAttribute("position",new on(f,3)),this.setAttribute("normal",new on(m,3)),this.setAttribute("uv",new on(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kp(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class io extends Nn{constructor(t=1,n=1,a=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:l};const c=t/2,f=n/2,m=Math.floor(a),d=Math.floor(l),p=m+1,_=d+1,v=t/m,g=n/d,M=[],E=[],w=[],y=[];for(let x=0;x<_;x++){const N=x*g-f;for(let H=0;H<p;H++){const C=H*v-c;E.push(C,-N,0),w.push(0,0,1),y.push(H/m),y.push(1-x/d)}}for(let x=0;x<d;x++)for(let N=0;N<m;N++){const H=N+p*x,C=N+p*(x+1),z=N+1+p*(x+1),O=N+1+p*x;M.push(H,C,O),M.push(C,z,O)}this.setIndex(M),this.setAttribute("position",new on(E,3)),this.setAttribute("normal",new on(w,3)),this.setAttribute("uv",new on(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new io(t.width,t.height,t.widthSegments,t.heightSegments)}}class Wp extends Nn{constructor(t=1,n=32,a=16,l=0,c=Math.PI*2,f=0,m=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:l,phiLength:c,thetaStart:f,thetaLength:m},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const d=Math.min(f+m,Math.PI);let p=0;const _=[],v=new J,g=new J,M=[],E=[],w=[],y=[];for(let x=0;x<=a;x++){const N=[],H=x/a,C=f+H*m,z=t*Math.cos(C),O=Math.sqrt(t*t-z*z);let L=0;x===0&&f===0?L=.5/n:x===a&&d===Math.PI&&(L=-.5/n);for(let b=0;b<=n;b++){const P=b/n,k=l+P*c;v.x=-O*Math.cos(k),v.y=z,v.z=O*Math.sin(k),E.push(v.x,v.y,v.z),g.copy(v).normalize(),w.push(g.x,g.y,g.z),y.push(P+L,1-H),N.push(p++)}_.push(N)}for(let x=0;x<a;x++)for(let N=0;N<n;N++){const H=_[x][N+1],C=_[x][N],z=_[x+1][N],O=_[x+1][N+1];(x!==0||f>0)&&M.push(H,C,O),(x!==a-1||d<Math.PI)&&M.push(C,z,O)}this.setIndex(M),this.setAttribute("position",new on(E,3)),this.setAttribute("normal",new on(w,3)),this.setAttribute("uv",new on(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wp(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function ao(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const l=r[n][a];if(cv(l))l.isRenderTargetTexture?(se("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=l.clone();else if(Array.isArray(l))if(cv(l[0])){const c=[];for(let f=0,m=l.length;f<m;f++)c[f]=l[f].clone();t[n][a]=c}else t[n][a]=l.slice();else t[n][a]=l}}return t}function jn(r){const t={};for(let n=0;n<r.length;n++){const a=ao(r[n]);for(const l in a)t[l]=a[l]}return t}function cv(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function ry(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function xx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ae.workingColorSpace}const Sx={clone:ao,merge:jn};var oy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ly=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fn extends ys{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oy,this.fragmentShader=ly,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ao(t.uniforms),this.uniformsGroups=ry(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?n.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?n.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[l]={type:"m4",value:f.toArray()}:n.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const l in this.extensions)this.extensions[l]===!0&&(a[l]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const a in t.uniforms){const l=t.uniforms[a];switch(this.uniforms[a]={},l.type){case"t":this.uniforms[a].value=n[l.value]||null;break;case"c":this.uniforms[a].value=new ae().setHex(l.value);break;case"v2":this.uniforms[a].value=new ne().fromArray(l.value);break;case"v3":this.uniforms[a].value=new J().fromArray(l.value);break;case"v4":this.uniforms[a].value=new an().fromArray(l.value);break;case"m3":this.uniforms[a].value=new ue().fromArray(l.value);break;case"m4":this.uniforms[a].value=new qe().fromArray(l.value);break;default:this.uniforms[a].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class cy extends Fn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class uy extends ys{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ae(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tp,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class fy extends ys{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=m1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class hy extends ys{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Bu extends hn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ae(t),this.intensity=n}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class dy extends Bu{constructor(t,n,a){super(t,a),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ae(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}toJSON(t){const n=super.toJSON(t);return n.object.groundColor=this.groundColor.getHex(),n}}const Rd=new qe,uv=new J,fv=new J;class Xp{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.mapType=yi,this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vp,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new an(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera;uv.setFromMatrixPosition(t.matrixWorld),n.position.copy(uv),fv.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(fv),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(t,n,a,l){Rd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),a.setFromProjectionMatrix(Rd,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,f=l?l.z/c.x:1,m=l?l.w/c.y:1,d=l?l.x/c.x:0,p=l?l.y/c.y:0;t.coordinateSystem===Ml||t.reversedDepth?n.set(.5*f,0,0,.5*f+d,0,.5*m,0,.5*m+p,0,0,1,0,0,0,0,1):n.set(.5*f,0,0,.5*f+d,0,.5*m,0,.5*m+p,0,0,.5,.5,0,0,0,1),n.multiply(Rd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const lu=new J,cu=new Ss,ji=new J;class Mx extends hn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=sa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(lu,cu,ji),ji.x===1&&ji.y===1&&ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lu,cu,ji.set(1,1,1)).invert()}updateWorldMatrix(t,n,a=!1){super.updateWorldMatrix(t,n,a),this.matrixWorld.decompose(lu,cu,ji),ji.x===1&&ji.y===1&&ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lu,cu,ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ps=new J,hv=new ne,dv=new ne;class ci extends Mx{constructor(t=50,n=1,a=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=wu*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(xu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wu*2*Math.atan(Math.tan(xu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){ps.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ps.x,ps.y).multiplyScalar(-t/ps.z),ps.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(ps.x,ps.y).multiplyScalar(-t/ps.z)}getViewSize(t,n){return this.getViewBounds(t,hv,dv),n.subVectors(dv,hv)}setViewOffset(t,n,a,l,c,f){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(xu*.5*this.fov)/this.zoom,a=2*n,l=this.aspect*a,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const d=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/d,n-=f.offsetY*a/p,l*=f.width/d,a*=f.height/p}const m=this.filmOffset;m!==0&&(c+=t*m/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class py extends Xp{constructor(){super(new ci(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const n=this.camera,a=wu*2*t.angle*this.focus,l=this.mapSize.width/this.mapSize.height*this.aspect,c=t.distance||n.far;(a!==n.fov||l!==n.aspect||c!==n.far)&&(n.fov=a,n.aspect=l,n.far=c,n.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class my extends Bu{constructor(t,n,a=0,l=Math.PI/3,c=0,f=2){super(t,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.target=new hn,this.distance=a,this.angle=l,this.penumbra=c,this.decay=f,this.map=null,this.shadow=new py}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.angle=this.angle,n.object.decay=this.decay,n.object.penumbra=this.penumbra,n.object.target=this.target.uuid,this.map&&this.map.isTexture&&(n.object.map=this.map.toJSON(t).uuid),n.object.shadow=this.shadow.toJSON(),n}}class gy extends Xp{constructor(){super(new ci(90,1,.5,500)),this.isPointLightShadow=!0}}class $i extends Bu{constructor(t,n,a=0,l=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=a,this.decay=l,this.shadow=new gy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class Yp extends Mx{constructor(t=-1,n=1,a=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=a-t,f=a+t,m=l+n,d=l-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,m-=_*this.view.offsetY,d=m-_*this.view.height}this.projectionMatrix.makeOrthographic(c,f,m,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class _y extends Xp{constructor(){super(new Yp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pv extends Bu{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.target=new hn,this.shadow=new _y}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const Wr=-90,Xr=1;class vy extends hn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new ci(Wr,Xr,t,n);l.layers=this.layers,this.add(l);const c=new ci(Wr,Xr,t,n);c.layers=this.layers,this.add(c);const f=new ci(Wr,Xr,t,n);f.layers=this.layers,this.add(f);const m=new ci(Wr,Xr,t,n);m.layers=this.layers,this.add(m);const d=new ci(Wr,Xr,t,n);d.layers=this.layers,this.add(d);const p=new ci(Wr,Xr,t,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,l,c,f,m,d]=n;for(const p of n)this.remove(p);if(t===sa)a.up.set(0,1,0),a.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),m.up.set(0,1,0),m.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(t===Ml)a.up.set(0,-1,0),a.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),m.up.set(0,-1,0),m.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of n)this.add(p),p.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,m,d,p,_]=this.children,v=t.getRenderTarget(),g=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const w=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let y=!1;t.isWebGLRenderer===!0?y=t.state.buffers.depth.getReversed():y=t.reversedDepthBuffer,t.setRenderTarget(a,0,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(a,1,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,f),t.setRenderTarget(a,2,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,m),t.setRenderTarget(a,3,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),t.setRenderTarget(a,4,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,p),a.texture.generateMipmaps=w,t.setRenderTarget(a,5,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(n,_),t.setRenderTarget(v,g,M),t.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class xy extends ci{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class mv{constructor(t=1,n=0,a=0){this.radius=t,this.phi=n,this.theta=a}set(t,n,a){return this.radius=t,this.phi=n,this.theta=a,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Me(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,a){return this.radius=Math.sqrt(t*t+n*n+a*a),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,a),this.phi=Math.acos(Me(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class yx{static{yx.prototype.isMatrix2=!0}constructor(t,n,a,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,a,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let a=0;a<4;a++)this.elements[a]=t[a+n];return this}set(t,n,a,l){const c=this.elements;return c[0]=t,c[2]=n,c[1]=a,c[3]=l,this}}class Sy extends Ms{constructor(t,n=null){super(),this.object=t,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function gv(r,t,n,a){const l=My(a);switch(n){case ix:return r*t;case Op:return r*t/l.components*l.byteLength;case Pp:return r*t/l.components*l.byteLength;case Qs:return r*t*2/l.components*l.byteLength;case zp:return r*t*2/l.components*l.byteLength;case ax:return r*t*3/l.components*l.byteLength;case Wi:return r*t*4/l.components*l.byteLength;case Ip:return r*t*4/l.components*l.byteLength;case mu:case gu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case _u:case vu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Kd:case Jd:return Math.max(r,16)*Math.max(t,8)/4;case Zd:case Qd:return Math.max(r,8)*Math.max(t,8)/2;case jd:case $d:case ep:case np:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case tp:case yu:case ip:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ap:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case sp:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case rp:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case op:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case lp:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case cp:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case up:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case fp:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case hp:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case dp:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case pp:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case mp:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case gp:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case _p:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case vp:case xp:case Sp:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Mp:case yp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Eu:case Ep:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function My(r){switch(r){case yi:case $v:return{byteLength:1,components:1};case xl:case tx:case Xi:return{byteLength:2,components:1};case Lp:case Np:return{byteLength:2,components:4};case oa:case Up:case aa:return{byteLength:4,components:1};case ex:case nx:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cp}}));typeof window<"u"&&(window.__THREE__?se("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cp);function Ex(){let r=null,t=!1,n=null,a=null;function l(c,f){a=r.requestAnimationFrame(l),n(c,f)}return{start:function(){t!==!0&&n!==null&&r!==null&&(a=r.requestAnimationFrame(l),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function yy(r){const t=new WeakMap;function n(m,d){const p=m.array,_=m.usage,v=p.byteLength,g=r.createBuffer();r.bindBuffer(d,g),r.bufferData(d,p,_),m.onUploadCallback();let M;if(p instanceof Float32Array)M=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)M=r.HALF_FLOAT;else if(p instanceof Uint16Array)m.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=r.SHORT;else if(p instanceof Uint32Array)M=r.UNSIGNED_INT;else if(p instanceof Int32Array)M=r.INT;else if(p instanceof Int8Array)M=r.BYTE;else if(p instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:m.version,size:v}}function a(m,d,p){const _=d.array,v=d.updateRanges;if(r.bindBuffer(p,m),v.length===0)r.bufferSubData(p,0,_);else{v.sort((M,E)=>M.start-E.start);let g=0;for(let M=1;M<v.length;M++){const E=v[g],w=v[M];w.start<=E.start+E.count+1?E.count=Math.max(E.count,w.start+w.count-E.start):(++g,v[g]=w)}v.length=g+1;for(let M=0,E=v.length;M<E;M++){const w=v[M];r.bufferSubData(p,w.start*_.BYTES_PER_ELEMENT,_,w.start,w.count)}d.clearUpdateRanges()}d.onUploadCallback()}function l(m){return m.isInterleavedBufferAttribute&&(m=m.data),t.get(m)}function c(m){m.isInterleavedBufferAttribute&&(m=m.data);const d=t.get(m);d&&(r.deleteBuffer(d.buffer),t.delete(m))}function f(m,d){if(m.isInterleavedBufferAttribute&&(m=m.data),m.isGLBufferAttribute){const _=t.get(m);(!_||_.version<m.version)&&t.set(m,{buffer:m.buffer,type:m.type,bytesPerElement:m.elementSize,version:m.version});return}const p=t.get(m);if(p===void 0)t.set(m,n(m,d));else if(p.version<m.version){if(p.size!==m.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(p.buffer,m,d),p.version=m.version}}return{get:l,remove:c,update:f}}var Ey=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ty=`#ifdef USE_ALPHAHASH
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
#endif`,by=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ay=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ry=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cy=`#ifdef USE_AOMAP
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
#endif`,Dy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Uy=`#ifdef USE_BATCHING
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
#endif`,Ly=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ny=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Oy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Py=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zy=`#ifdef USE_IRIDESCENCE
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
#endif`,Iy=`#ifdef USE_BUMPMAP
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
#endif`,By=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ky=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Wy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Xy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Yy=`#define PI 3.141592653589793
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
} // validated`,qy=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Zy=`vec3 transformedNormal = objectNormal;
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
#endif`,Ky=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$y="gl_FragColor = linearToOutputTexel( gl_FragColor );",tE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,eE=`#ifdef USE_ENVMAP
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
#endif`,nE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,iE=`#ifdef USE_ENVMAP
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
#endif`,aE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sE=`#ifdef USE_ENVMAP
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
#endif`,rE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,oE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,uE=`#ifdef USE_GRADIENTMAP
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
}`,fE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,mE=`#ifdef USE_ENVMAP
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
#endif`,gE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_E=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,SE=`PhysicalMaterial material;
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
#endif`,ME=`uniform sampler2D dfgLUT;
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
}`,yE=`
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
#endif`,EE=`#if defined( RE_IndirectDiffuse )
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
#endif`,TE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bE=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,AE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,RE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,CE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,DE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,UE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,LE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,NE=`#if defined( USE_POINTS_UV )
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
#endif`,OE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,PE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,IE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,BE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,FE=`#ifdef USE_MORPHTARGETS
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
#endif`,HE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,GE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,VE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,kE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,WE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,YE=`#ifdef USE_NORMALMAP
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
#endif`,qE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ZE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,KE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,QE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,JE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$E=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,eT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,iT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,aT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,oT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,lT=`float getShadowMask() {
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
}`,cT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uT=`#ifdef USE_SKINNING
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
#endif`,fT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hT=`#ifdef USE_SKINNING
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
#endif`,dT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_T=`#ifdef USE_TRANSMISSION
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
#endif`,vT=`#ifdef USE_TRANSMISSION
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
#endif`,xT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ST=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,MT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ET=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,TT=`uniform sampler2D t2D;
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
}`,bT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,AT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,RT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CT=`#include <common>
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
}`,DT=`#if DEPTH_PACKING == 3200
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
}`,UT=`#define DISTANCE
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
}`,LT=`#define DISTANCE
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
}`,NT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,OT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PT=`uniform float scale;
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
}`,zT=`uniform vec3 diffuse;
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
}`,IT=`#include <common>
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
}`,BT=`uniform vec3 diffuse;
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
}`,FT=`#define LAMBERT
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
}`,HT=`#define LAMBERT
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
}`,GT=`#define MATCAP
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
}`,VT=`#define MATCAP
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
}`,kT=`#define NORMAL
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
}`,WT=`#define NORMAL
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
}`,XT=`#define PHONG
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
}`,YT=`#define PHONG
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
}`,qT=`#define STANDARD
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
}`,ZT=`#define STANDARD
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
}`,KT=`#define TOON
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
}`,QT=`#define TOON
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
}`,JT=`uniform float size;
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
}`,jT=`uniform vec3 diffuse;
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
}`,$T=`#include <common>
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
}`,t2=`uniform vec3 color;
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
}`,e2=`uniform float rotation;
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
}`,n2=`uniform vec3 diffuse;
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
}`,ge={alphahash_fragment:Ey,alphahash_pars_fragment:Ty,alphamap_fragment:by,alphamap_pars_fragment:Ay,alphatest_fragment:Ry,alphatest_pars_fragment:wy,aomap_fragment:Cy,aomap_pars_fragment:Dy,batching_pars_vertex:Uy,batching_vertex:Ly,begin_vertex:Ny,beginnormal_vertex:Oy,bsdfs:Py,iridescence_fragment:zy,bumpmap_pars_fragment:Iy,clipping_planes_fragment:By,clipping_planes_pars_fragment:Fy,clipping_planes_pars_vertex:Hy,clipping_planes_vertex:Gy,color_fragment:Vy,color_pars_fragment:ky,color_pars_vertex:Wy,color_vertex:Xy,common:Yy,cube_uv_reflection_fragment:qy,defaultnormal_vertex:Zy,displacementmap_pars_vertex:Ky,displacementmap_vertex:Qy,emissivemap_fragment:Jy,emissivemap_pars_fragment:jy,colorspace_fragment:$y,colorspace_pars_fragment:tE,envmap_fragment:eE,envmap_common_pars_fragment:nE,envmap_pars_fragment:iE,envmap_pars_vertex:aE,envmap_physical_pars_fragment:mE,envmap_vertex:sE,fog_vertex:rE,fog_pars_vertex:oE,fog_fragment:lE,fog_pars_fragment:cE,gradientmap_pars_fragment:uE,lightmap_pars_fragment:fE,lights_lambert_fragment:hE,lights_lambert_pars_fragment:dE,lights_pars_begin:pE,lights_toon_fragment:gE,lights_toon_pars_fragment:_E,lights_phong_fragment:vE,lights_phong_pars_fragment:xE,lights_physical_fragment:SE,lights_physical_pars_fragment:ME,lights_fragment_begin:yE,lights_fragment_maps:EE,lights_fragment_end:TE,lightprobes_pars_fragment:bE,logdepthbuf_fragment:AE,logdepthbuf_pars_fragment:RE,logdepthbuf_pars_vertex:wE,logdepthbuf_vertex:CE,map_fragment:DE,map_pars_fragment:UE,map_particle_fragment:LE,map_particle_pars_fragment:NE,metalnessmap_fragment:OE,metalnessmap_pars_fragment:PE,morphinstance_vertex:zE,morphcolor_vertex:IE,morphnormal_vertex:BE,morphtarget_pars_vertex:FE,morphtarget_vertex:HE,normal_fragment_begin:GE,normal_fragment_maps:VE,normal_pars_fragment:kE,normal_pars_vertex:WE,normal_vertex:XE,normalmap_pars_fragment:YE,clearcoat_normal_fragment_begin:qE,clearcoat_normal_fragment_maps:ZE,clearcoat_pars_fragment:KE,iridescence_pars_fragment:QE,opaque_fragment:JE,packing:jE,premultiplied_alpha_fragment:$E,project_vertex:tT,dithering_fragment:eT,dithering_pars_fragment:nT,roughnessmap_fragment:iT,roughnessmap_pars_fragment:aT,shadowmap_pars_fragment:sT,shadowmap_pars_vertex:rT,shadowmap_vertex:oT,shadowmask_pars_fragment:lT,skinbase_vertex:cT,skinning_pars_vertex:uT,skinning_vertex:fT,skinnormal_vertex:hT,specularmap_fragment:dT,specularmap_pars_fragment:pT,tonemapping_fragment:mT,tonemapping_pars_fragment:gT,transmission_fragment:_T,transmission_pars_fragment:vT,uv_pars_fragment:xT,uv_pars_vertex:ST,uv_vertex:MT,worldpos_vertex:yT,background_vert:ET,background_frag:TT,backgroundCube_vert:bT,backgroundCube_frag:AT,cube_vert:RT,cube_frag:wT,depth_vert:CT,depth_frag:DT,distance_vert:UT,distance_frag:LT,equirect_vert:NT,equirect_frag:OT,linedashed_vert:PT,linedashed_frag:zT,meshbasic_vert:IT,meshbasic_frag:BT,meshlambert_vert:FT,meshlambert_frag:HT,meshmatcap_vert:GT,meshmatcap_frag:VT,meshnormal_vert:kT,meshnormal_frag:WT,meshphong_vert:XT,meshphong_frag:YT,meshphysical_vert:qT,meshphysical_frag:ZT,meshtoon_vert:KT,meshtoon_frag:QT,points_vert:JT,points_frag:jT,shadow_vert:$T,shadow_frag:t2,sprite_vert:e2,sprite_frag:n2},Ft={common:{diffuse:{value:new ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ue},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ue}},envmap:{envMap:{value:null},envMapRotation:{value:new ue},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ue},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0},uvTransform:{value:new ue}},sprite:{diffuse:{value:new ae(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ue},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0}}},na={basic:{uniforms:jn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:ge.meshbasic_vert,fragmentShader:ge.meshbasic_frag},lambert:{uniforms:jn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new ae(0)},envMapIntensity:{value:1}}]),vertexShader:ge.meshlambert_vert,fragmentShader:ge.meshlambert_frag},phong:{uniforms:jn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new ae(0)},specular:{value:new ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ge.meshphong_vert,fragmentShader:ge.meshphong_frag},standard:{uniforms:jn([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag},toon:{uniforms:jn([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new ae(0)}}]),vertexShader:ge.meshtoon_vert,fragmentShader:ge.meshtoon_frag},matcap:{uniforms:jn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:ge.meshmatcap_vert,fragmentShader:ge.meshmatcap_frag},points:{uniforms:jn([Ft.points,Ft.fog]),vertexShader:ge.points_vert,fragmentShader:ge.points_frag},dashed:{uniforms:jn([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ge.linedashed_vert,fragmentShader:ge.linedashed_frag},depth:{uniforms:jn([Ft.common,Ft.displacementmap]),vertexShader:ge.depth_vert,fragmentShader:ge.depth_frag},normal:{uniforms:jn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:ge.meshnormal_vert,fragmentShader:ge.meshnormal_frag},sprite:{uniforms:jn([Ft.sprite,Ft.fog]),vertexShader:ge.sprite_vert,fragmentShader:ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ge.background_vert,fragmentShader:ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ue}},vertexShader:ge.backgroundCube_vert,fragmentShader:ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ge.cube_vert,fragmentShader:ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ge.equirect_vert,fragmentShader:ge.equirect_frag},distance:{uniforms:jn([Ft.common,Ft.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ge.distance_vert,fragmentShader:ge.distance_frag},shadow:{uniforms:jn([Ft.lights,Ft.fog,{color:{value:new ae(0)},opacity:{value:1}}]),vertexShader:ge.shadow_vert,fragmentShader:ge.shadow_frag}};na.physical={uniforms:jn([na.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ue},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ue},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ue},sheen:{value:0},sheenColor:{value:new ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ue},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ue},attenuationDistance:{value:0},attenuationColor:{value:new ae(0)},specularColor:{value:new ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ue},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ue}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag};const uu={r:0,b:0,g:0},i2=new qe,Tx=new ue;Tx.set(-1,0,0,0,1,0,0,0,1);function a2(r,t,n,a,l,c){const f=new ae(0);let m=l===!0?0:1,d,p,_=null,v=0,g=null;function M(N){let H=N.isScene===!0?N.background:null;if(H&&H.isTexture){const C=N.backgroundBlurriness>0;H=t.get(H,C)}return H}function E(N){let H=!1;const C=M(N);C===null?y(f,m):C&&C.isColor&&(y(C,1),H=!0);const z=r.xr.getEnvironmentBlendMode();z==="additive"?n.buffers.color.setClear(0,0,0,1,c):z==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(r.autoClear||H)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function w(N,H){const C=M(H);C&&(C.isCubeTexture||C.mapping===zu)?(p===void 0&&(p=new kn(new bl(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:ao(na.backgroundCube.uniforms),vertexShader:na.backgroundCube.vertexShader,fragmentShader:na.backgroundCube.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(z,O,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(p)),p.material.uniforms.envMap.value=C,p.material.uniforms.backgroundBlurriness.value=H.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(i2.makeRotationFromEuler(H.backgroundRotation)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(Tx),p.material.toneMapped=Ae.getTransfer(C.colorSpace)!==Fe,(_!==C||v!==C.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,_=C,v=C.version,g=r.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null)):C&&C.isTexture&&(d===void 0&&(d=new kn(new io(2,2),new Fn({name:"BackgroundMaterial",uniforms:ao(na.background.uniforms),vertexShader:na.background.vertexShader,fragmentShader:na.background.fragmentShader,side:xs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(d)),d.material.uniforms.t2D.value=C,d.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,d.material.toneMapped=Ae.getTransfer(C.colorSpace)!==Fe,C.matrixAutoUpdate===!0&&C.updateMatrix(),d.material.uniforms.uvTransform.value.copy(C.matrix),(_!==C||v!==C.version||g!==r.toneMapping)&&(d.material.needsUpdate=!0,_=C,v=C.version,g=r.toneMapping),d.layers.enableAll(),N.unshift(d,d.geometry,d.material,0,0,null))}function y(N,H){N.getRGB(uu,xx(r)),n.buffers.color.setClear(uu.r,uu.g,uu.b,H,c)}function x(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return f},setClearColor:function(N,H=1){f.set(N),m=H,y(f,m)},getClearAlpha:function(){return m},setClearAlpha:function(N){m=N,y(f,m)},render:E,addToRenderList:w,dispose:x}}function s2(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},l=g(null);let c=l,f=!1;function m(Q,K,lt,Z,nt){let B=!1;const V=v(Q,Z,lt,K);c!==V&&(c=V,p(c.object)),B=M(Q,Z,lt,nt),B&&E(Q,Z,lt,nt),nt!==null&&t.update(nt,r.ELEMENT_ARRAY_BUFFER),(B||f)&&(f=!1,C(Q,K,lt,Z),nt!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(nt).buffer))}function d(){return r.createVertexArray()}function p(Q){return r.bindVertexArray(Q)}function _(Q){return r.deleteVertexArray(Q)}function v(Q,K,lt,Z){const nt=Z.wireframe===!0;let B=a[K.id];B===void 0&&(B={},a[K.id]=B);const V=Q.isInstancedMesh===!0?Q.id:0;let ft=B[V];ft===void 0&&(ft={},B[V]=ft);let it=ft[lt.id];it===void 0&&(it={},ft[lt.id]=it);let dt=it[nt];return dt===void 0&&(dt=g(d()),it[nt]=dt),dt}function g(Q){const K=[],lt=[],Z=[];for(let nt=0;nt<n;nt++)K[nt]=0,lt[nt]=0,Z[nt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:K,enabledAttributes:lt,attributeDivisors:Z,object:Q,attributes:{},index:null}}function M(Q,K,lt,Z){const nt=c.attributes,B=K.attributes;let V=0;const ft=lt.getAttributes();for(const it in ft)if(ft[it].location>=0){const D=nt[it];let et=B[it];if(et===void 0&&(it==="instanceMatrix"&&Q.instanceMatrix&&(et=Q.instanceMatrix),it==="instanceColor"&&Q.instanceColor&&(et=Q.instanceColor)),D===void 0||D.attribute!==et||et&&D.data!==et.data)return!0;V++}return c.attributesNum!==V||c.index!==Z}function E(Q,K,lt,Z){const nt={},B=K.attributes;let V=0;const ft=lt.getAttributes();for(const it in ft)if(ft[it].location>=0){let D=B[it];D===void 0&&(it==="instanceMatrix"&&Q.instanceMatrix&&(D=Q.instanceMatrix),it==="instanceColor"&&Q.instanceColor&&(D=Q.instanceColor));const et={};et.attribute=D,D&&D.data&&(et.data=D.data),nt[it]=et,V++}c.attributes=nt,c.attributesNum=V,c.index=Z}function w(){const Q=c.newAttributes;for(let K=0,lt=Q.length;K<lt;K++)Q[K]=0}function y(Q){x(Q,0)}function x(Q,K){const lt=c.newAttributes,Z=c.enabledAttributes,nt=c.attributeDivisors;lt[Q]=1,Z[Q]===0&&(r.enableVertexAttribArray(Q),Z[Q]=1),nt[Q]!==K&&(r.vertexAttribDivisor(Q,K),nt[Q]=K)}function N(){const Q=c.newAttributes,K=c.enabledAttributes;for(let lt=0,Z=K.length;lt<Z;lt++)K[lt]!==Q[lt]&&(r.disableVertexAttribArray(lt),K[lt]=0)}function H(Q,K,lt,Z,nt,B,V){V===!0?r.vertexAttribIPointer(Q,K,lt,nt,B):r.vertexAttribPointer(Q,K,lt,Z,nt,B)}function C(Q,K,lt,Z){w();const nt=Z.attributes,B=lt.getAttributes(),V=K.defaultAttributeValues;for(const ft in B){const it=B[ft];if(it.location>=0){let dt=nt[ft];if(dt===void 0&&(ft==="instanceMatrix"&&Q.instanceMatrix&&(dt=Q.instanceMatrix),ft==="instanceColor"&&Q.instanceColor&&(dt=Q.instanceColor)),dt!==void 0){const D=dt.normalized,et=dt.itemSize,vt=t.get(dt);if(vt===void 0)continue;const wt=vt.buffer,bt=vt.type,Rt=vt.bytesPerElement,$=bt===r.INT||bt===r.UNSIGNED_INT||dt.gpuType===Up;if(dt.isInterleavedBufferAttribute){const pt=dt.data,At=pt.stride,$t=dt.offset;if(pt.isInstancedInterleavedBuffer){for(let zt=0;zt<it.locationSize;zt++)x(it.location+zt,pt.meshPerAttribute);Q.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let zt=0;zt<it.locationSize;zt++)y(it.location+zt);r.bindBuffer(r.ARRAY_BUFFER,wt);for(let zt=0;zt<it.locationSize;zt++)H(it.location+zt,et/it.locationSize,bt,D,At*Rt,($t+et/it.locationSize*zt)*Rt,$)}else{if(dt.isInstancedBufferAttribute){for(let pt=0;pt<it.locationSize;pt++)x(it.location+pt,dt.meshPerAttribute);Q.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let pt=0;pt<it.locationSize;pt++)y(it.location+pt);r.bindBuffer(r.ARRAY_BUFFER,wt);for(let pt=0;pt<it.locationSize;pt++)H(it.location+pt,et/it.locationSize,bt,D,et*Rt,et/it.locationSize*pt*Rt,$)}}else if(V!==void 0){const D=V[ft];if(D!==void 0)switch(D.length){case 2:r.vertexAttrib2fv(it.location,D);break;case 3:r.vertexAttrib3fv(it.location,D);break;case 4:r.vertexAttrib4fv(it.location,D);break;default:r.vertexAttrib1fv(it.location,D)}}}}N()}function z(){P();for(const Q in a){const K=a[Q];for(const lt in K){const Z=K[lt];for(const nt in Z){const B=Z[nt];for(const V in B)_(B[V].object),delete B[V];delete Z[nt]}}delete a[Q]}}function O(Q){if(a[Q.id]===void 0)return;const K=a[Q.id];for(const lt in K){const Z=K[lt];for(const nt in Z){const B=Z[nt];for(const V in B)_(B[V].object),delete B[V];delete Z[nt]}}delete a[Q.id]}function L(Q){for(const K in a){const lt=a[K];for(const Z in lt){const nt=lt[Z];if(nt[Q.id]===void 0)continue;const B=nt[Q.id];for(const V in B)_(B[V].object),delete B[V];delete nt[Q.id]}}}function b(Q){for(const K in a){const lt=a[K],Z=Q.isInstancedMesh===!0?Q.id:0,nt=lt[Z];if(nt!==void 0){for(const B in nt){const V=nt[B];for(const ft in V)_(V[ft].object),delete V[ft];delete nt[B]}delete lt[Z],Object.keys(lt).length===0&&delete a[K]}}}function P(){k(),f=!0,c!==l&&(c=l,p(c.object))}function k(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:m,reset:P,resetDefaultState:k,dispose:z,releaseStatesOfGeometry:O,releaseStatesOfObject:b,releaseStatesOfProgram:L,initAttributes:w,enableAttribute:y,disableUnusedAttributes:N}}function r2(r,t,n){let a;function l(d){a=d}function c(d,p){r.drawArrays(a,d,p),n.update(p,a,1)}function f(d,p,_){_!==0&&(r.drawArraysInstanced(a,d,p,_),n.update(p,a,_))}function m(d,p,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,d,0,p,0,_);let g=0;for(let M=0;M<_;M++)g+=p[M];n.update(g,a,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=m}function o2(r,t,n,a){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(L){return!(L!==Wi&&a.convert(L)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function m(L){const b=L===Xi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==yi&&L!==aa&&!b&&a.convert(L)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function d(L){if(L==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const _=d(p);_!==p&&(se("WebGLRenderer:",p,"not supported, using",_,"instead."),p=_);const v=n.logarithmicDepthBuffer===!0,g=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&g===!1&&se("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),x=r.getParameter(r.MAX_VERTEX_ATTRIBS),N=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),H=r.getParameter(r.MAX_VARYING_VECTORS),C=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),z=r.getParameter(r.MAX_SAMPLES),O=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:d,textureFormatReadable:f,textureTypeReadable:m,precision:p,logarithmicDepthBuffer:v,reversedDepthBuffer:g,maxTextures:M,maxVertexTextures:E,maxTextureSize:w,maxCubemapSize:y,maxAttributes:x,maxVertexUniforms:N,maxVaryings:H,maxFragmentUniforms:C,maxSamples:z,samples:O}}function l2(r){const t=this;let n=null,a=0,l=!1,c=!1;const f=new ea,m=new ue,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(v,g){const M=v.length!==0||g||a!==0||l;return l=g,a=v.length,M},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,g){n=_(v,g,0)},this.setState=function(v,g,M){const E=v.clippingPlanes,w=v.clipIntersection,y=v.clipShadows,x=r.get(v);if(!l||E===null||E.length===0||c&&!y)c?_(null):p();else{const N=c?0:a,H=N*4;let C=x.clippingState||null;d.value=C,C=_(E,g,H,M);for(let z=0;z!==H;++z)C[z]=n[z];x.clippingState=C,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=N}};function p(){d.value!==n&&(d.value=n,d.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function _(v,g,M,E){const w=v!==null?v.length:0;let y=null;if(w!==0){if(y=d.value,E!==!0||y===null){const x=M+w*4,N=g.matrixWorldInverse;m.getNormalMatrix(N),(y===null||y.length<x)&&(y=new Float32Array(x));for(let H=0,C=M;H!==w;++H,C+=4)f.copy(v[H]).applyMatrix4(N,m),f.normal.toArray(y,C),y[C+3]=f.constant}d.value=y,d.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,y}}const jr=4,c2=6,u2=20,f2=256,ul=new Yp,_v=new ae;let wd=null,Cd=0,Dd=0,Ud=!1;const h2=new J,Ys=new J;class vv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,a=.1,l=100,c={}){const{size:f=256,position:m=h2}=c;wd=this._renderer.getRenderTarget(),Cd=this._renderer.getActiveCubeFace(),Dd=this._renderer.getActiveMipmapLevel(),Ud=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(t,a,l,d,m),n>0&&this._blur(d,0,0,n),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(wd,Cd,Dd),this._renderer.xr.enabled=Ud,t.scissorTest=!1,Yr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Ks||t.mapping===no?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wd=this._renderer.getRenderTarget(),Cd=this._renderer.getActiveCubeFace(),Dd=this._renderer.getActiveMipmapLevel(),Ud=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Wn,minFilter:Wn,generateMipmaps:!1,type:Xi,format:Wi,colorSpace:Tu,depthBuffer:!1},l=xv(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xv(t,n,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=d2(c)),this._blurMaterial=m2(c,t,n),this._ggxMaterial=p2(c,t,n)}return l}_compileMaterial(t){const n=new kn(new Nn,t);this._renderer.compile(n,ul)}_sceneToCubeUV(t,n,a,l,c){const d=new ci(90,1,n,a),p=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,M=v.toneMapping;v.getClearColor(_v),v.toneMapping=ra,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new kn(new bl,new px({name:"PMREM.Background",side:Yn,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,y=w.material;let x=!1;const N=t.background;N?N.isColor&&(y.color.copy(N),t.background=null,x=!0):(y.color.copy(_v),x=!0);for(let H=0;H<6;H++){const C=H%3;C===0?(d.up.set(0,p[H],0),d.position.set(c.x,c.y,c.z),d.lookAt(c.x+_[H],c.y,c.z)):C===1?(d.up.set(0,0,p[H]),d.position.set(c.x,c.y,c.z),d.lookAt(c.x,c.y+_[H],c.z)):(d.up.set(0,p[H],0),d.position.set(c.x,c.y,c.z),d.lookAt(c.x,c.y,c.z+_[H]));const z=this._cubeSize;Yr(l,C*z,H>2?z:0,z,z),v.setRenderTarget(l),x&&v.render(w,d),v.render(t,d)}v.toneMapping=M,v.autoClear=g,t.background=N}_textureToCubeUV(t,n){const a=this._renderer,l=t.mapping===Ks||t.mapping===no;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const m=c.uniforms;m.envMap.value=t;const d=this._cubeSize;Yr(n,0,0,3*d,2*d),a.setRenderTarget(n),a.render(f,ul)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);n.autoClear=a}_applyGGXFilter(t,n,a){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,m=this._lodMeshes[a];m.material=f;const d=f.uniforms,p=a/(this._lodMeshes.length-1),_=n/(this._lodMeshes.length-1),v=Math.sqrt(p*p-_*_),g=p*1.25,M=v*g,{_lodMax:E}=this,w=this._sizeLods[a],y=3*w*(a>E-jr?a-E+jr:0),x=4*(this._cubeSize-w);d.envMap.value=t.texture,d.roughness.value=M,d.mipInt.value=E-n,Yr(c,y,x,3*w,2*w),l.setRenderTarget(c),l.render(m,ul),d.envMap.value=c.texture,d.roughness.value=0,d.mipInt.value=E-a,Yr(t,y,x,3*w,2*w),l.setRenderTarget(t),l.render(m,ul)}_blur(t,n,a,l){const c=this._pingPongRenderTarget,f=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(t,c,n,a,f),this._blurPass(c,t,a,a,f)}_blurPass(t,n,a,l,c){const f=this._renderer,m=this._blurMaterial,d=this._lodMeshes[l];d.material=m;const p=m.uniforms;p.envMap.value=t.texture,p.sigma.value=c,p.mipInt.value=this._lodMax-a;const _=this._sizeLods[l],v=3*_*(l>this._lodMax-jr?l-this._lodMax+jr:0),g=4*(this._cubeSize-_);Yr(n,v,g,3*_,2*_),f.setRenderTarget(n),f.render(d,ul)}}function d2(r){const t=[],n=[];let a=r;const l=r-jr+1+c2;for(let c=0;c<l;c++){const f=Math.pow(2,a);t.push(f);const m=1/(f-2),d=-m,p=1+m,_=[d,d,p,d,p,p,d,d,p,p,d,p],v=6,g=6,M=3,E=new Float32Array(M*g*v),w=new Float32Array(M*g*v);for(let x=0;x<v;x++){const N=x%3*2/3-1,H=x>2?0:-1,C=[N,H,0,N+2/3,H,0,N+2/3,H+1,0,N,H,0,N+2/3,H+1,0,N,H+1,0];E.set(C,M*g*x);for(let z=0;z<g;z++){const O=_[z*2]*2-1,L=_[z*2+1]*2-1;x===0?Ys.set(1,L,O):x===1?Ys.set(-O,1,-L):x===2?Ys.set(-O,L,1):x===3?Ys.set(-1,L,-O):x===4?Ys.set(-O,-1,L):Ys.set(O,L,-1),Ys.toArray(w,(x*g+z)*M)}}const y=new Nn;y.setAttribute("position",new Xn(E,M)),y.setAttribute("outputDirection",new Xn(w,M)),n.push(new kn(y,null)),a>jr&&a--}return{lodMeshes:n,sizeLods:t}}function xv(r,t,n){const a=new zi(r,t,n);return a.texture.mapping=zu,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Yr(r,t,n,a,l){r.viewport.set(t,n,a,l),r.scissor.set(t,n,a,l)}function p2(r,t,n){return new Fn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:f2,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fu(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function m2(r,t,n){return new Fn({name:"SphericalGaussianBlur",defines:{SAMPLES:u2,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Fu(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function Sv(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fu(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function Mv(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Na,depthTest:!1,depthWrite:!1})}function Fu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class bx extends zi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},l=[a,a,a,a,a,a];this.texture=new _x(l),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new bl(5,5,5),c=new Fn({name:"CubemapFromEquirect",uniforms:ao(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Yn,blending:Na});c.uniforms.tEquirect.value=n;const f=new kn(l,c),m=n.minFilter;return n.minFilter===qs&&(n.minFilter=Wn),new vy(1,10,this).update(t,f),n.minFilter=m,f.geometry.dispose(),f.material.dispose(),this}clear(t,n=!0,a=!0,l=!0){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(n,a,l);t.setRenderTarget(c)}}function g2(r){let t=new WeakMap,n=new WeakMap,a=null;function l(g,M=!1){return g==null?null:M?f(g):c(g)}function c(g){if(g&&g.isTexture){const M=g.mapping;if(M===td||M===ed)if(t.has(g)){const E=t.get(g).texture;return m(E,g.mapping)}else{const E=g.image;if(E&&E.height>0){const w=new bx(E.height);return w.fromEquirectangularTexture(r,g),t.set(g,w),g.addEventListener("dispose",p),m(w.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const M=g.mapping,E=M===td||M===ed,w=M===Ks||M===no;if(E||w){let y=n.get(g);const x=y!==void 0?y.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==x)return a===null&&(a=new vv(r)),y=E?a.fromEquirectangular(g,y):a.fromCubemap(g,y),y.texture.pmremVersion=g.pmremVersion,n.set(g,y),y.texture;if(y!==void 0)return y.texture;{const N=g.image;return E&&N&&N.height>0||w&&N&&d(N)?(a===null&&(a=new vv(r)),y=E?a.fromEquirectangular(g):a.fromCubemap(g),y.texture.pmremVersion=g.pmremVersion,n.set(g,y),g.addEventListener("dispose",_),y.texture):null}}}return g}function m(g,M){return M===td?g.mapping=Ks:M===ed&&(g.mapping=no),g}function d(g){let M=0;const E=6;for(let w=0;w<E;w++)g[w]!==void 0&&M++;return M===E}function p(g){const M=g.target;M.removeEventListener("dispose",p);const E=t.get(M);E!==void 0&&(t.delete(M),E.dispose())}function _(g){const M=g.target;M.removeEventListener("dispose",_);const E=n.get(M);E!==void 0&&(n.delete(M),E.dispose())}function v(){t=new WeakMap,n=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:l,dispose:v}}function _2(r){const t={};function n(a){if(t[a]!==void 0)return t[a];const l=r.getExtension(a);return t[a]=l,l}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const l=n(a);return l===null&&to("WebGLRenderer: "+a+" extension not supported."),l}}}function v2(r,t,n,a){const l={},c=new WeakMap;function f(v){const g=v.target;g.index!==null&&t.remove(g.index);for(const E in g.attributes)t.remove(g.attributes[E]);g.removeEventListener("dispose",f),delete l[g.id];const M=c.get(g);M&&(t.remove(M),c.delete(g)),a.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,n.memory.geometries--}function m(v,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,n.memory.geometries++),g}function d(v){const g=v.attributes;for(const M in g)t.update(g[M],r.ARRAY_BUFFER)}function p(v){const g=[],M=v.index,E=v.attributes.position;let w=0;if(E===void 0)return;if(M!==null){const N=M.array;w=M.version;for(let H=0,C=N.length;H<C;H+=3){const z=N[H+0],O=N[H+1],L=N[H+2];g.push(z,O,O,L,L,z)}}else{const N=E.array;w=E.version;for(let H=0,C=N.length/3-1;H<C;H+=3){const z=H+0,O=H+1,L=H+2;g.push(z,O,O,L,L,z)}}const y=new(E.count>=65535?fx:ux)(g,1);y.version=w;const x=c.get(v);x&&t.remove(x),c.set(v,y)}function _(v){const g=c.get(v);if(g){const M=v.index;M!==null&&g.version<M.version&&p(v)}else p(v);return c.get(v)}return{get:m,update:d,getWireframeAttribute:_}}function x2(r,t,n){let a;function l(v){a=v}let c,f;function m(v){c=v.type,f=v.bytesPerElement}function d(v,g){r.drawElements(a,g,c,v*f),n.update(g,a,1)}function p(v,g,M){M!==0&&(r.drawElementsInstanced(a,g,c,v*f,M),n.update(g,a,M))}function _(v,g,M){if(M===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,g,0,c,v,0,M);let w=0;for(let y=0;y<M;y++)w+=g[y];n.update(w,a,1)}this.setMode=l,this.setIndex=m,this.render=d,this.renderInstances=p,this.renderMultiDraw=_}function S2(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,f,m){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=m*(c/3);break;case r.LINES:n.lines+=m*(c/2);break;case r.LINE_STRIP:n.lines+=m*(c-1);break;case r.LINE_LOOP:n.lines+=m*c;break;case r.POINTS:n.points+=m*c;break;default:Ce("WebGLInfo: Unknown draw mode:",f);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:l,update:a}}function M2(r,t,n){const a=new WeakMap,l=new an;function c(f,m,d){const p=f.morphTargetInfluences,_=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,v=_!==void 0?_.length:0;let g=a.get(m);if(g===void 0||g.count!==v){let k=function(){b.dispose(),a.delete(m),m.removeEventListener("dispose",k)};var M=k;g!==void 0&&g.texture.dispose();const E=m.morphAttributes.position!==void 0,w=m.morphAttributes.normal!==void 0,y=m.morphAttributes.color!==void 0,x=m.morphAttributes.position||[],N=m.morphAttributes.normal||[],H=m.morphAttributes.color||[];let C=0;E===!0&&(C=1),w===!0&&(C=2),y===!0&&(C=3);let z=m.attributes.position.count*C,O=1;z>t.maxTextureSize&&(O=Math.ceil(z/t.maxTextureSize),z=t.maxTextureSize);const L=new Float32Array(z*O*4*v),b=new ox(L,z,O,v);b.type=aa,b.needsUpdate=!0;const P=C*4;for(let Q=0;Q<v;Q++){const K=x[Q],lt=N[Q],Z=H[Q],nt=z*O*4*Q;for(let B=0;B<K.count;B++){const V=B*P;E===!0&&(l.fromBufferAttribute(K,B),L[nt+V+0]=l.x,L[nt+V+1]=l.y,L[nt+V+2]=l.z,L[nt+V+3]=0),w===!0&&(l.fromBufferAttribute(lt,B),L[nt+V+4]=l.x,L[nt+V+5]=l.y,L[nt+V+6]=l.z,L[nt+V+7]=0),y===!0&&(l.fromBufferAttribute(Z,B),L[nt+V+8]=l.x,L[nt+V+9]=l.y,L[nt+V+10]=l.z,L[nt+V+11]=Z.itemSize===4?l.w:1)}}g={count:v,texture:b,size:new ne(z,O)},a.set(m,g),m.addEventListener("dispose",k)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)d.getUniforms().setValue(r,"morphTexture",f.morphTexture,n);else{let E=0;for(let y=0;y<p.length;y++)E+=p[y];const w=m.morphTargetsRelative?1:1-E;d.getUniforms().setValue(r,"morphTargetBaseInfluence",w),d.getUniforms().setValue(r,"morphTargetInfluences",p)}d.getUniforms().setValue(r,"morphTargetsTexture",g.texture,n),d.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function y2(r,t,n,a,l){let c=new WeakMap;function f(p){const _=l.render.frame,v=p.geometry,g=t.get(p,v);if(c.get(g)!==_&&(t.update(g),c.set(g,_)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),c.get(p)!==_&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,_))),p.isSkinnedMesh){const M=p.skeleton;c.get(M)!==_&&(M.update(),c.set(M,_))}return g}function m(){c=new WeakMap}function d(p){const _=p.target;_.removeEventListener("dispose",d),a.releaseStatesOfObject(_),n.remove(_.instanceMatrix),_.instanceColor!==null&&n.remove(_.instanceColor)}return{update:f,dispose:m}}const E2={[Yv]:"LINEAR_TONE_MAPPING",[qv]:"REINHARD_TONE_MAPPING",[Zv]:"CINEON_TONE_MAPPING",[Dp]:"ACES_FILMIC_TONE_MAPPING",[Qv]:"AGX_TONE_MAPPING",[Jv]:"NEUTRAL_TONE_MAPPING",[Kv]:"CUSTOM_TONE_MAPPING"};function T2(r,t,n,a,l,c){const f=new zi(t,n,{type:r,depthBuffer:l,stencilBuffer:c,samples:a?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let m=null,d=null;const p=new Nn;p.setAttribute("position",new on([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new on([0,2,0,0,2,0],2));const _=new cy({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),v=new kn(p,_),g=new Yp(-1,1,1,-1,0,1);let M=null,E=null,w=!1,y,x=null,N=[],H=!1;this.setSize=function(C,z){f.setSize(C,z),m!==null&&m.setSize(C,z),d!==null&&d.setSize(C,z);for(let O=0;O<N.length;O++){const L=N[O];L.setSize&&L.setSize(C,z)}},this.setEffects=function(C){N=C,H=N.length>0&&N[0].isRenderPass===!0;const z=f.width,O=f.height;N.length>0&&m===null&&(m=new zi(z,O,{type:Xi,depthBuffer:!1,stencilBuffer:!1}),d=new zi(z,O,{type:Xi,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<N.length;L++){const b=N[L];b.setSize&&b.setSize(z,O)}},this.begin=function(C,z){if(w||C.toneMapping===ra&&N.length===0)return!1;if(x=z,z!==null){const O=z.width,L=z.height;(f.width!==O||f.height!==L)&&this.setSize(O,L)}return H===!1&&C.setRenderTarget(f),y=C.toneMapping,C.toneMapping=ra,!0},this.hasRenderPass=function(){return H},this.end=function(C,z){C.toneMapping=y,w=!0;let O=f,L=m;for(let b=0;b<N.length;b++){const P=N[b];P.enabled!==!1&&(P.render(C,L,O,z),P.needsSwap!==!1&&(O=L,L=L===m?d:m))}if(M!==C.outputColorSpace||E!==C.toneMapping){M=C.outputColorSpace,E=C.toneMapping,_.defines={},Ae.getTransfer(M)===Fe&&(_.defines.SRGB_TRANSFER="");const b=E2[E];b&&(_.defines[b]=""),_.needsUpdate=!0}_.uniforms.tDiffuse.value=O.texture,C.setRenderTarget(x),C.render(v,g),x=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){f.dispose(),m!==null&&m.dispose(),d!==null&&d.dispose(),p.dispose(),_.dispose()}}const Ax=new qn,Ap=new yl(1,1),Rx=new ox,wx=new P1,Cx=new _x,yv=[],Ev=[],Tv=new Float32Array(16),bv=new Float32Array(9),Av=new Float32Array(4);function oo(r,t,n){const a=r[0];if(a<=0||a>0)return r;const l=t*n;let c=yv[l];if(c===void 0&&(c=new Float32Array(l),yv[l]=c),t!==0){a.toArray(c,0);for(let f=1,m=0;f!==t;++f)m+=n,r[f].toArray(c,m)}return c}function wn(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function Cn(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function Hu(r,t){let n=Ev[t];n===void 0&&(n=new Int32Array(t),Ev[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function b2(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function A2(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wn(n,t))return;r.uniform2fv(this.addr,t),Cn(n,t)}}function R2(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(wn(n,t))return;r.uniform3fv(this.addr,t),Cn(n,t)}}function w2(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wn(n,t))return;r.uniform4fv(this.addr,t),Cn(n,t)}}function C2(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(wn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),Cn(n,t)}else{if(wn(n,a))return;Av.set(a),r.uniformMatrix2fv(this.addr,!1,Av),Cn(n,a)}}function D2(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(wn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),Cn(n,t)}else{if(wn(n,a))return;bv.set(a),r.uniformMatrix3fv(this.addr,!1,bv),Cn(n,a)}}function U2(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(wn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),Cn(n,t)}else{if(wn(n,a))return;Tv.set(a),r.uniformMatrix4fv(this.addr,!1,Tv),Cn(n,a)}}function L2(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function N2(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wn(n,t))return;r.uniform2iv(this.addr,t),Cn(n,t)}}function O2(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(wn(n,t))return;r.uniform3iv(this.addr,t),Cn(n,t)}}function P2(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wn(n,t))return;r.uniform4iv(this.addr,t),Cn(n,t)}}function z2(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function I2(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wn(n,t))return;r.uniform2uiv(this.addr,t),Cn(n,t)}}function B2(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(wn(n,t))return;r.uniform3uiv(this.addr,t),Cn(n,t)}}function F2(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wn(n,t))return;r.uniform4uiv(this.addr,t),Cn(n,t)}}function H2(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Ap.compareFunction=n.isReversedDepthBuffer()?Fp:Bp,c=Ap):c=Ax,n.setTexture2D(t||c,l)}function G2(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTexture3D(t||wx,l)}function V2(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTextureCube(t||Cx,l)}function k2(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTexture2DArray(t||Rx,l)}function W2(r){switch(r){case 5126:return b2;case 35664:return A2;case 35665:return R2;case 35666:return w2;case 35674:return C2;case 35675:return D2;case 35676:return U2;case 5124:case 35670:return L2;case 35667:case 35671:return N2;case 35668:case 35672:return O2;case 35669:case 35673:return P2;case 5125:return z2;case 36294:return I2;case 36295:return B2;case 36296:return F2;case 35678:case 36198:case 36298:case 36306:case 35682:return H2;case 35679:case 36299:case 36307:return G2;case 35680:case 36300:case 36308:case 36293:return V2;case 36289:case 36303:case 36311:case 36292:return k2}}function X2(r,t){r.uniform1fv(this.addr,t)}function Y2(r,t){const n=oo(t,this.size,2);r.uniform2fv(this.addr,n)}function q2(r,t){const n=oo(t,this.size,3);r.uniform3fv(this.addr,n)}function Z2(r,t){const n=oo(t,this.size,4);r.uniform4fv(this.addr,n)}function K2(r,t){const n=oo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function Q2(r,t){const n=oo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function J2(r,t){const n=oo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function j2(r,t){r.uniform1iv(this.addr,t)}function $2(r,t){r.uniform2iv(this.addr,t)}function tb(r,t){r.uniform3iv(this.addr,t)}function eb(r,t){r.uniform4iv(this.addr,t)}function nb(r,t){r.uniform1uiv(this.addr,t)}function ib(r,t){r.uniform2uiv(this.addr,t)}function ab(r,t){r.uniform3uiv(this.addr,t)}function sb(r,t){r.uniform4uiv(this.addr,t)}function rb(r,t,n){const a=this.cache,l=t.length,c=Hu(n,l);wn(a,c)||(r.uniform1iv(this.addr,c),Cn(a,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=Ap:f=Ax;for(let m=0;m!==l;++m)n.setTexture2D(t[m]||f,c[m])}function ob(r,t,n){const a=this.cache,l=t.length,c=Hu(n,l);wn(a,c)||(r.uniform1iv(this.addr,c),Cn(a,c));for(let f=0;f!==l;++f)n.setTexture3D(t[f]||wx,c[f])}function lb(r,t,n){const a=this.cache,l=t.length,c=Hu(n,l);wn(a,c)||(r.uniform1iv(this.addr,c),Cn(a,c));for(let f=0;f!==l;++f)n.setTextureCube(t[f]||Cx,c[f])}function cb(r,t,n){const a=this.cache,l=t.length,c=Hu(n,l);wn(a,c)||(r.uniform1iv(this.addr,c),Cn(a,c));for(let f=0;f!==l;++f)n.setTexture2DArray(t[f]||Rx,c[f])}function ub(r){switch(r){case 5126:return X2;case 35664:return Y2;case 35665:return q2;case 35666:return Z2;case 35674:return K2;case 35675:return Q2;case 35676:return J2;case 5124:case 35670:return j2;case 35667:case 35671:return $2;case 35668:case 35672:return tb;case 35669:case 35673:return eb;case 5125:return nb;case 36294:return ib;case 36295:return ab;case 36296:return sb;case 35678:case 36198:case 36298:case 36306:case 35682:return rb;case 35679:case 36299:case 36307:return ob;case 35680:case 36300:case 36308:case 36293:return lb;case 36289:case 36303:case 36311:case 36292:return cb}}class fb{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=W2(n.type)}}class hb{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=ub(n.type)}}class db{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const m=l[c];m.setValue(t,n[m.id],a)}}}const Ld=/(\w+)(\])?(\[|\.)?/g;function Rv(r,t){r.seq.push(t),r.map[t.id]=t}function pb(r,t,n){const a=r.name,l=a.length;for(Ld.lastIndex=0;;){const c=Ld.exec(a),f=Ld.lastIndex;let m=c[1];const d=c[2]==="]",p=c[3];if(d&&(m=m|0),p===void 0||p==="["&&f+2===l){Rv(n,p===void 0?new fb(m,r,t):new hb(m,r,t));break}else{let v=n.map[m];v===void 0&&(v=new db(m),Rv(n,v)),n=v}}}class Su{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let f=0;f<a;++f){const m=t.getActiveUniform(n,f),d=t.getUniformLocation(n,m.name);pb(m,d,this)}const l=[],c=[];for(const f of this.seq)f.type===t.SAMPLER_2D_SHADOW||f.type===t.SAMPLER_CUBE_SHADOW||f.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(t,n,a,l){const c=this.map[n];c!==void 0&&c.setValue(t,a,l)}setOptional(t,n,a){const l=n[a];l!==void 0&&this.setValue(t,a,l)}static upload(t,n,a,l){for(let c=0,f=n.length;c!==f;++c){const m=n[c],d=a[m.id];d.needsUpdate!==!1&&m.setValue(t,d.value,l)}}static seqWithValue(t,n){const a=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in n&&a.push(f)}return a}}function wv(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const mb=37297;let gb=0;function _b(r,t){const n=r.split(`
`),a=[],l=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let f=l;f<c;f++){const m=f+1;a.push(`${m===t?">":" "} ${m}: ${n[f]}`)}return a.join(`
`)}const Cv=new ue;function vb(r){Ae._getMatrix(Cv,Ae.workingColorSpace,r);const t=`mat3( ${Cv.elements.map(n=>n.toFixed(4))} )`;switch(Ae.getTransfer(r)){case bu:return[t,"LinearTransferOETF"];case Fe:return[t,"sRGBTransferOETF"];default:return se("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Dv(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(a&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const m=parseInt(f[1]);return n.toUpperCase()+`

`+c+`

`+_b(r.getShaderSource(t),m)}else return c}function xb(r,t){const n=vb(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const Sb={[Yv]:"Linear",[qv]:"Reinhard",[Zv]:"Cineon",[Dp]:"ACESFilmic",[Qv]:"AgX",[Jv]:"Neutral",[Kv]:"Custom"};function Mb(r,t){const n=Sb[t];return n===void 0?(se("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const fu=new J;function yb(){Ae.getLuminanceCoefficients(fu);const r=fu.x.toFixed(4),t=fu.y.toFixed(4),n=fu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Eb(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pl).join(`
`)}function Tb(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function bb(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<a;l++){const c=r.getActiveAttrib(t,l),f=c.name;let m=1;c.type===r.FLOAT_MAT2&&(m=2),c.type===r.FLOAT_MAT3&&(m=3),c.type===r.FLOAT_MAT4&&(m=4),n[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:m}}return n}function pl(r){return r!==""}function Uv(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Lv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Ab=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rp(r){return r.replace(Ab,wb)}const Rb=new Map;function wb(r,t){let n=ge[t];if(n===void 0){const a=Rb.get(t);if(a!==void 0)n=ge[a],se('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Rp(n)}const Cb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nv(r){return r.replace(Cb,Db)}function Db(r,t,n,a){let l="";for(let c=parseInt(t);c<parseInt(n);c++)l+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Ov(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const Ub={[ml]:"SHADOWMAP_TYPE_PCF",[dl]:"SHADOWMAP_TYPE_VSM"};function Lb(r){return Ub[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Nb={[Ks]:"ENVMAP_TYPE_CUBE",[no]:"ENVMAP_TYPE_CUBE",[zu]:"ENVMAP_TYPE_CUBE_UV"};function Ob(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":Nb[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const Pb={[no]:"ENVMAP_MODE_REFRACTION"};function zb(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":Pb[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ib={[Xv]:"ENVMAP_BLENDING_MULTIPLY",[h1]:"ENVMAP_BLENDING_MIX",[d1]:"ENVMAP_BLENDING_ADD"};function Bb(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Ib[r.combine]||"ENVMAP_BLENDING_NONE"}function Fb(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function Hb(r,t,n,a){const l=r.getContext(),c=n.defines;let f=n.vertexShader,m=n.fragmentShader;const d=Lb(n),p=Ob(n),_=zb(n),v=Bb(n),g=Fb(n),M=Eb(n),E=Tb(c),w=l.createProgram();let y,x,N=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(pl).join(`
`),y.length>0&&(y+=`
`),x=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(pl).join(`
`),x.length>0&&(x+=`
`)):(y=[Ov(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+_:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+d:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pl).join(`
`),x=[Ov(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+_:"",n.envMap?"#define "+v:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+d:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ra?"#define TONE_MAPPING":"",n.toneMapping!==ra?ge.tonemapping_pars_fragment:"",n.toneMapping!==ra?Mb("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ge.colorspace_pars_fragment,xb("linearToOutputTexel",n.outputColorSpace),yb(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(pl).join(`
`)),f=Rp(f),f=Uv(f,n),f=Lv(f,n),m=Rp(m),m=Uv(m,n),m=Lv(m,n),f=Nv(f),m=Nv(m),n.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,x=["#define varying in",n.glslVersion===F_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===F_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const H=N+y+f,C=N+x+m,z=wv(l,l.VERTEX_SHADER,H),O=wv(l,l.FRAGMENT_SHADER,C);l.attachShader(w,z),l.attachShader(w,O),n.index0AttributeName!==void 0?l.bindAttribLocation(w,0,n.index0AttributeName):n.hasPositionAttribute===!0&&l.bindAttribLocation(w,0,"position"),l.linkProgram(w);function L(Q){if(r.debug.checkShaderErrors){const K=l.getProgramInfoLog(w)||"",lt=l.getShaderInfoLog(z)||"",Z=l.getShaderInfoLog(O)||"",nt=K.trim(),B=lt.trim(),V=Z.trim();let ft=!0,it=!0;if(l.getProgramParameter(w,l.LINK_STATUS)===!1)if(ft=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,w,z,O);else{const dt=Dv(l,z,"vertex"),D=Dv(l,O,"fragment");Ce("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(w,l.VALIDATE_STATUS)+`

Material Name: `+Q.name+`
Material Type: `+Q.type+`

Program Info Log: `+nt+`
`+dt+`
`+D)}else nt!==""?se("WebGLProgram: Program Info Log:",nt):(B===""||V==="")&&(it=!1);it&&(Q.diagnostics={runnable:ft,programLog:nt,vertexShader:{log:B,prefix:y},fragmentShader:{log:V,prefix:x}})}l.deleteShader(z),l.deleteShader(O),b=new Su(l,w),P=bb(l,w)}let b;this.getUniforms=function(){return b===void 0&&L(this),b};let P;this.getAttributes=function(){return P===void 0&&L(this),P};let k=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=l.getProgramParameter(w,mb)),k},this.destroy=function(){a.releaseStatesOfProgram(this),l.deleteProgram(w),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=gb++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=z,this.fragmentShader=O,this}let Gb=0;class Vb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,a){const l=this._getShaderCacheForMaterial(t);return l.has(n)===!1&&(l.add(n),n.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new kb(t),n.set(t,a)),a}}class kb{constructor(t){this.id=Gb++,this.code=t,this.usedTimes=0}}function Wb(r){return r===Qs||r===yu||r===Eu}function Xb(r,t,n,a,l,c){const f=new lx,m=new Vb,d=new Set,p=[],_=new Map,v=a.logarithmicDepthBuffer;let g=a.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(b){return d.add(b),b===0?"uv":`uv${b}`}function w(b,P,k,Q,K,lt){const Z=Q.fog,nt=K.geometry,B=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?Q.environment:null,V=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ft=t.get(b.envMap||B,V),it=ft&&ft.mapping===zu?ft.image.height:null,dt=M[b.type];b.precision!==null&&(g=a.getMaxPrecision(b.precision),g!==b.precision&&se("WebGLProgram.getParameters:",b.precision,"not supported, using",g,"instead."));const D=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,et=D!==void 0?D.length:0;let vt=0;nt.morphAttributes.position!==void 0&&(vt=1),nt.morphAttributes.normal!==void 0&&(vt=2),nt.morphAttributes.color!==void 0&&(vt=3);let wt,bt,Rt,$;if(dt){const Ge=na[dt];wt=Ge.vertexShader,bt=Ge.fragmentShader}else{wt=b.vertexShader,bt=b.fragmentShader;const Ge=m.getVertexShaderStage(b),Re=m.getFragmentShaderStage(b);m.update(b,Ge,Re),Rt=Ge.id,$=Re.id}const pt=r.getRenderTarget(),At=r.state.buffers.depth.getReversed(),$t=K.isInstancedMesh===!0,zt=K.isBatchedMesh===!0,re=!!b.map,$e=!!b.matcap,le=!!ft,ye=!!b.aoMap,Pe=!!b.lightMap,ve=!!b.bumpMap&&b.wireframe===!1,Ze=!!b.normalMap,ln=!!b.displacementMap,Dn=!!b.emissiveMap,Ke=!!b.metalnessMap,cn=!!b.roughnessMap,q=b.anisotropy>0,ze=b.clearcoat>0,Le=b.dispersion>0,I=b.retroreflectivity>0,T=b.iridescence>0,tt=b.sheen>0,ct=b.transmission>0,gt=q&&!!b.anisotropyMap,Ct=ze&&!!b.clearcoatMap,Nt=ze&&!!b.clearcoatNormalMap,_t=ze&&!!b.clearcoatRoughnessMap,xt=T&&!!b.iridescenceMap,Dt=T&&!!b.iridescenceThicknessMap,kt=tt&&!!b.sheenColorMap,It=tt&&!!b.sheenRoughnessMap,Ot=!!b.specularMap,jt=!!b.specularColorMap,te=!!b.specularIntensityMap,oe=ct&&!!b.transmissionMap,Y=ct&&!!b.thicknessMap,Ut=!!b.gradientMap,Mt=!!b.alphaMap,Lt=b.alphaTest>0,Ht=!!b.alphaHash,Tt=!!b.extensions;let Jt=ra;b.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(Jt=r.toneMapping);const Yt={shaderID:dt,shaderType:b.type,shaderName:b.name,vertexShader:wt,fragmentShader:bt,defines:b.defines,customVertexShaderID:Rt,customFragmentShaderID:$,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:g,batching:zt,batchingColor:zt&&K._colorsTexture!==null,instancing:$t,instancingColor:$t&&K.instanceColor!==null,instancingMorph:$t&&K.morphTexture!==null,outputColorSpace:pt===null?r.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:Ae.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:re,matcap:$e,envMap:le,envMapMode:le&&ft.mapping,envMapCubeUVHeight:it,aoMap:ye,lightMap:Pe,bumpMap:ve,normalMap:Ze,displacementMap:ln,emissiveMap:Dn,normalMapObjectSpace:Ze&&b.normalMapType===g1,normalMapTangentSpace:Ze&&b.normalMapType===Tp,packedNormalMap:Ze&&b.normalMapType===Tp&&Wb(b.normalMap.format),metalnessMap:Ke,roughnessMap:cn,anisotropy:q,anisotropyMap:gt,clearcoat:ze,clearcoatMap:Ct,clearcoatNormalMap:Nt,clearcoatRoughnessMap:_t,dispersion:Le,retroreflection:I,iridescence:T,iridescenceMap:xt,iridescenceThicknessMap:Dt,sheen:tt,sheenColorMap:kt,sheenRoughnessMap:It,specularMap:Ot,specularColorMap:jt,specularIntensityMap:te,transmission:ct,transmissionMap:oe,thicknessMap:Y,gradientMap:Ut,opaque:b.transparent===!1&&b.blending===gl&&b.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Lt,alphaHash:Ht,combine:b.combine,mapUv:re&&E(b.map.channel),aoMapUv:ye&&E(b.aoMap.channel),lightMapUv:Pe&&E(b.lightMap.channel),bumpMapUv:ve&&E(b.bumpMap.channel),normalMapUv:Ze&&E(b.normalMap.channel),displacementMapUv:ln&&E(b.displacementMap.channel),emissiveMapUv:Dn&&E(b.emissiveMap.channel),metalnessMapUv:Ke&&E(b.metalnessMap.channel),roughnessMapUv:cn&&E(b.roughnessMap.channel),anisotropyMapUv:gt&&E(b.anisotropyMap.channel),clearcoatMapUv:Ct&&E(b.clearcoatMap.channel),clearcoatNormalMapUv:Nt&&E(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&E(b.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&E(b.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&E(b.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&E(b.sheenColorMap.channel),sheenRoughnessMapUv:It&&E(b.sheenRoughnessMap.channel),specularMapUv:Ot&&E(b.specularMap.channel),specularColorMapUv:jt&&E(b.specularColorMap.channel),specularIntensityMapUv:te&&E(b.specularIntensityMap.channel),transmissionMapUv:oe&&E(b.transmissionMap.channel),thicknessMapUv:Y&&E(b.thicknessMap.channel),alphaMapUv:Mt&&E(b.alphaMap.channel),vertexTangents:!!nt.attributes.tangent&&(Ze||q),vertexNormals:!!nt.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!nt.attributes.uv&&(re||Mt),fog:!!Z,useFog:b.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||nt.attributes.normal===void 0&&Ze===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:At,skinning:K.isSkinnedMesh===!0,hasPositionAttribute:nt.attributes.position!==void 0,morphTargets:nt.morphAttributes.position!==void 0,morphNormals:nt.morphAttributes.normal!==void 0,morphColors:nt.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:vt,numSunLights:P.sun.length,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numSunLightShadows:P.sunShadowMap.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:lt.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&k.length>0,shadowMapType:r.shadowMap.type,toneMapping:Jt,decodeVideoTexture:re&&b.map.isVideoTexture===!0&&Ae.getTransfer(b.map.colorSpace)===Fe,decodeVideoTextureEmissive:Dn&&b.emissiveMap.isVideoTexture===!0&&Ae.getTransfer(b.emissiveMap.colorSpace)===Fe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ua,flipSided:b.side===Yn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Tt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Tt&&b.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Yt.vertexUv1s=d.has(1),Yt.vertexUv2s=d.has(2),Yt.vertexUv3s=d.has(3),d.clear(),Yt}function y(b){const P=[];if(b.shaderID?P.push(b.shaderID):(P.push(b.customVertexShaderID),P.push(b.customFragmentShaderID)),b.defines!==void 0)for(const k in b.defines)P.push(k),P.push(b.defines[k]);return b.isRawShaderMaterial===!1&&(x(P,b),N(P,b),P.push(r.outputColorSpace)),P.push(b.customProgramCacheKey),P.join()}function x(b,P){b.push(P.precision),b.push(P.outputColorSpace),b.push(P.envMapMode),b.push(P.envMapCubeUVHeight),b.push(P.mapUv),b.push(P.alphaMapUv),b.push(P.lightMapUv),b.push(P.aoMapUv),b.push(P.bumpMapUv),b.push(P.normalMapUv),b.push(P.displacementMapUv),b.push(P.emissiveMapUv),b.push(P.metalnessMapUv),b.push(P.roughnessMapUv),b.push(P.anisotropyMapUv),b.push(P.clearcoatMapUv),b.push(P.clearcoatNormalMapUv),b.push(P.clearcoatRoughnessMapUv),b.push(P.iridescenceMapUv),b.push(P.iridescenceThicknessMapUv),b.push(P.sheenColorMapUv),b.push(P.sheenRoughnessMapUv),b.push(P.specularMapUv),b.push(P.specularColorMapUv),b.push(P.specularIntensityMapUv),b.push(P.transmissionMapUv),b.push(P.thicknessMapUv),b.push(P.combine),b.push(P.fogExp2),b.push(P.sizeAttenuation),b.push(P.morphTargetsCount),b.push(P.morphAttributeCount),b.push(P.numSunLights),b.push(P.numDirLights),b.push(P.numPointLights),b.push(P.numSpotLights),b.push(P.numSpotLightMaps),b.push(P.numHemiLights),b.push(P.numRectAreaLights),b.push(P.numSunLightShadows),b.push(P.numDirLightShadows),b.push(P.numPointLightShadows),b.push(P.numSpotLightShadows),b.push(P.numSpotLightShadowsWithMaps),b.push(P.numLightProbes),b.push(P.shadowMapType),b.push(P.toneMapping),b.push(P.numClippingPlanes),b.push(P.numClipIntersection),b.push(P.depthPacking)}function N(b,P){f.disableAll(),P.instancing&&f.enable(0),P.instancingColor&&f.enable(1),P.instancingMorph&&f.enable(2),P.matcap&&f.enable(3),P.envMap&&f.enable(4),P.normalMapObjectSpace&&f.enable(5),P.normalMapTangentSpace&&f.enable(6),P.clearcoat&&f.enable(7),P.iridescence&&f.enable(8),P.alphaTest&&f.enable(9),P.vertexColors&&f.enable(10),P.vertexAlphas&&f.enable(11),P.vertexUv1s&&f.enable(12),P.vertexUv2s&&f.enable(13),P.vertexUv3s&&f.enable(14),P.vertexTangents&&f.enable(15),P.anisotropy&&f.enable(16),P.alphaHash&&f.enable(17),P.batching&&f.enable(18),P.dispersion&&f.enable(19),P.retroreflection&&f.enable(24),P.batchingColor&&f.enable(20),P.gradientMap&&f.enable(21),P.packedNormalMap&&f.enable(22),P.vertexNormals&&f.enable(23),b.push(f.mask),f.disableAll(),P.fog&&f.enable(0),P.useFog&&f.enable(1),P.flatShading&&f.enable(2),P.logarithmicDepthBuffer&&f.enable(3),P.reversedDepthBuffer&&f.enable(4),P.skinning&&f.enable(5),P.morphTargets&&f.enable(6),P.morphNormals&&f.enable(7),P.morphColors&&f.enable(8),P.premultipliedAlpha&&f.enable(9),P.shadowMapEnabled&&f.enable(10),P.doubleSided&&f.enable(11),P.flipSided&&f.enable(12),P.useDepthPacking&&f.enable(13),P.dithering&&f.enable(14),P.transmission&&f.enable(15),P.sheen&&f.enable(16),P.opaque&&f.enable(17),P.pointsUvs&&f.enable(18),P.decodeVideoTexture&&f.enable(19),P.decodeVideoTextureEmissive&&f.enable(20),P.alphaToCoverage&&f.enable(21),P.numLightProbeGrids>0&&f.enable(22),P.hasPositionAttribute&&f.enable(23),b.push(f.mask)}function H(b){const P=M[b.type];let k;if(P){const Q=na[P];k=Sx.clone(Q.uniforms)}else k=b.uniforms;return k}function C(b,P){let k=_.get(P);return k!==void 0?++k.usedTimes:(k=new Hb(r,P,b,l),p.push(k),_.set(P,k)),k}function z(b){if(--b.usedTimes===0){const P=p.indexOf(b);p[P]=p[p.length-1],p.pop(),_.delete(b.cacheKey),b.destroy()}}function O(b){m.remove(b)}function L(){m.dispose()}return{getParameters:w,getProgramCacheKey:y,getUniforms:H,acquireProgram:C,releaseProgram:z,releaseShaderCache:O,programs:p,dispose:L}}function Yb(){let r=new WeakMap;function t(f){return r.has(f)}function n(f){let m=r.get(f);return m===void 0&&(m={},r.set(f,m)),m}function a(f){r.delete(f)}function l(f,m,d){r.get(f)[m]=d}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:l,dispose:c}}function qb(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function Pv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function zv(){const r=[];let t=0;const n=[],a=[],l=[];function c(){t=0,n.length=0,a.length=0,l.length=0}function f(g){let M=0;return g.isInstancedMesh&&(M+=2),g.isSkinnedMesh&&(M+=1),M}function m(g,M,E,w,y,x){let N=r[t];return N===void 0?(N={id:g.id,object:g,geometry:M,material:E,materialVariant:f(g),groupOrder:w,renderOrder:g.renderOrder,z:y,group:x},r[t]=N):(N.id=g.id,N.object=g,N.geometry=M,N.material=E,N.materialVariant=f(g),N.groupOrder=w,N.renderOrder=g.renderOrder,N.z=y,N.group=x),t++,N}function d(g,M,E,w,y,x,N){N.reversedDepth===!0&&(y=-y);const H=m(g,M,E,w,y,x);E.transmission>0?a.push(H):E.transparent===!0?l.push(H):n.push(H)}function p(g,M,E,w,y,x){const N=m(g,M,E,w,y,x);E.transmission>0?a.unshift(N):E.transparent===!0?l.unshift(N):n.unshift(N)}function _(g,M){n.length>1&&n.sort(g||qb),a.length>1&&a.sort(M||Pv),l.length>1&&l.sort(M||Pv)}function v(){for(let g=t,M=r.length;g<M;g++){const E=r[g];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:n,transmissive:a,transparent:l,init:c,push:d,unshift:p,finish:v,sort:_}}function Zb(){let r=new WeakMap;function t(a,l){const c=r.get(a);let f;return c===void 0?(f=new zv,r.set(a,[f])):l>=c.length?(f=new zv,c.push(f)):f=c[l],f}function n(){r=new WeakMap}return{get:t,dispose:n}}function Kb(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new J,color:new ae};break;case"SpotLight":n={position:new J,direction:new J,color:new ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new J,color:new ae,distance:0,decay:0};break;case"HemisphereLight":n={direction:new J,skyColor:new ae,groundColor:new ae};break;case"RectAreaLight":n={color:new ae,position:new J,halfWidth:new J,halfHeight:new J};break}return r[t.id]=n,n}}}function Qb(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let Jb=0;function jb(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function $b(r){const t=new Kb,n=Qb(),a={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)a.probe.push(new J);const l=new J,c=new qe,f=new qe;function m(p){let _=0,v=0,g=0;for(let K=0;K<9;K++)a.probe[K].set(0,0,0);let M=0,E=0,w=0,y=0,x=0,N=0,H=0,C=0,z=0,O=0,L=0,b=0,P=0,k=0;p.sort(jb);for(let K=0,lt=p.length;K<lt;K++){const Z=p[K],nt=Z.color,B=Z.intensity,V=Z.distance;let ft=null;if(Z.shadow&&Z.shadow.map&&(Z.shadow.map.texture.format===Qs?ft=Z.shadow.map.texture:ft=Z.shadow.map.depthTexture||Z.shadow.map.texture),Z.isAmbientLight)_+=nt.r*B,v+=nt.g*B,g+=nt.b*B;else if(Z.isLightProbe){for(let it=0;it<9;it++)a.probe[it].addScaledVector(Z.sh.coefficients[it],B);k++}else if(Z.isSunLight){const it=t.get(Z);if(it.color.copy(Z.color).multiplyScalar(Z.intensity),Z.castShadow){const dt=Z.shadow,D=n.get(Z);D.shadowIntensity=dt.intensity,D.shadowBias=dt.bias,D.shadowNormalBias=dt.normalBias,D.shadowRadius=dt.radius,D.shadowMapSize.copy(dt.mapSize).multiply(dt.getFrameExtents()),a.sunShadow[E]=D,a.sunShadowMap[E]=ft;const et=dt.getViewportCount();for(let vt=0;vt<et;vt++)a.sunShadowMatrix[w+vt]=dt.getMatrix(vt),a.sunShadowCascade[w+vt]=dt._cascadeData[vt];w+=et,E++}a.sun[M]=it,M++}else if(Z.isDirectionalLight){const it=t.get(Z);if(it.color.copy(Z.color).multiplyScalar(Z.intensity),Z.castShadow){const dt=Z.shadow,D=n.get(Z);D.shadowIntensity=dt.intensity,D.shadowBias=dt.bias,D.shadowNormalBias=dt.normalBias,D.shadowRadius=dt.radius,D.shadowMapSize=dt.mapSize,a.directionalShadow[y]=D,a.directionalShadowMap[y]=ft,a.directionalShadowMatrix[y]=Z.shadow.matrix,z++}a.directional[y]=it,y++}else if(Z.isSpotLight){const it=t.get(Z);it.position.setFromMatrixPosition(Z.matrixWorld),it.color.copy(nt).multiplyScalar(B),it.distance=V,it.coneCos=Math.cos(Z.angle),it.penumbraCos=Math.cos(Z.angle*(1-Z.penumbra)),it.decay=Z.decay,a.spot[N]=it;const dt=Z.shadow;if(Z.map&&(a.spotLightMap[b]=Z.map,b++,dt.updateMatrices(Z),Z.castShadow&&P++),a.spotLightMatrix[N]=dt.matrix,Z.castShadow){const D=n.get(Z);D.shadowIntensity=dt.intensity,D.shadowBias=dt.bias,D.shadowNormalBias=dt.normalBias,D.shadowRadius=dt.radius,D.shadowMapSize=dt.mapSize,a.spotShadow[N]=D,a.spotShadowMap[N]=ft,L++}N++}else if(Z.isRectAreaLight){const it=t.get(Z);it.color.copy(nt).multiplyScalar(B),it.halfWidth.set(Z.width*.5,0,0),it.halfHeight.set(0,Z.height*.5,0),a.rectArea[H]=it,H++}else if(Z.isPointLight){const it=t.get(Z);if(it.color.copy(Z.color).multiplyScalar(Z.intensity),it.distance=Z.distance,it.decay=Z.decay,Z.castShadow){const dt=Z.shadow,D=n.get(Z);D.shadowIntensity=dt.intensity,D.shadowBias=dt.bias,D.shadowNormalBias=dt.normalBias,D.shadowRadius=dt.radius,D.shadowMapSize=dt.mapSize,D.shadowCameraNear=dt.camera.near,D.shadowCameraFar=dt.camera.far,a.pointShadow[x]=D,a.pointShadowMap[x]=ft,a.pointShadowMatrix[x]=Z.shadow.matrix,O++}a.point[x]=it,x++}else if(Z.isHemisphereLight){const it=t.get(Z);it.skyColor.copy(Z.color).multiplyScalar(B),it.groundColor.copy(Z.groundColor).multiplyScalar(B),a.hemi[C]=it,C++}}H>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Ft.LTC_FLOAT_1,a.rectAreaLTC2=Ft.LTC_FLOAT_2):(a.rectAreaLTC1=Ft.LTC_HALF_1,a.rectAreaLTC2=Ft.LTC_HALF_2)),a.ambient[0]=_,a.ambient[1]=v,a.ambient[2]=g;const Q=a.hash;(Q.sunLength!==M||Q.directionalLength!==y||Q.pointLength!==x||Q.spotLength!==N||Q.rectAreaLength!==H||Q.hemiLength!==C||Q.numSunShadows!==E||Q.numDirectionalShadows!==z||Q.numPointShadows!==O||Q.numSpotShadows!==L||Q.numSpotMaps!==b||Q.numLightProbes!==k)&&(a.sun.length=M,a.directional.length=y,a.spot.length=N,a.rectArea.length=H,a.point.length=x,a.hemi.length=C,a.sunShadow.length=E,a.sunShadowMap.length=E,a.sunShadowMatrix.length=w,a.sunShadowCascade.length=w,a.directionalShadow.length=z,a.directionalShadowMap.length=z,a.directionalShadowMatrix.length=z,a.pointShadow.length=O,a.pointShadowMap.length=O,a.pointShadowMatrix.length=O,a.spotShadow.length=L,a.spotShadowMap.length=L,a.spotLightMatrix.length=L+b-P,a.spotLightMap.length=b,a.numSpotLightShadowsWithMaps=P,a.numLightProbes=k,Q.sunLength=M,Q.directionalLength=y,Q.pointLength=x,Q.spotLength=N,Q.rectAreaLength=H,Q.hemiLength=C,Q.numSunShadows=E,Q.numDirectionalShadows=z,Q.numPointShadows=O,Q.numSpotShadows=L,Q.numSpotMaps=b,Q.numLightProbes=k,a.version=Jb++)}function d(p,_){let v=0,g=0,M=0,E=0,w=0,y=0;const x=_.matrixWorldInverse;for(let N=0,H=p.length;N<H;N++){const C=p[N];if(C.isSunLight){const z=a.sun[v];z.direction.setFromMatrixPosition(C.matrixWorld),z.direction.transformDirection(x),v++}else if(C.isDirectionalLight){const z=a.directional[g];z.direction.setFromMatrixPosition(C.matrixWorld),l.setFromMatrixPosition(C.target.matrixWorld),z.direction.sub(l),z.direction.transformDirection(x),g++}else if(C.isSpotLight){const z=a.spot[E];z.position.setFromMatrixPosition(C.matrixWorld),z.position.applyMatrix4(x),z.direction.setFromMatrixPosition(C.matrixWorld),l.setFromMatrixPosition(C.target.matrixWorld),z.direction.sub(l),z.direction.transformDirection(x),E++}else if(C.isRectAreaLight){const z=a.rectArea[w];z.position.setFromMatrixPosition(C.matrixWorld),z.position.applyMatrix4(x),f.identity(),c.copy(C.matrixWorld),c.premultiply(x),f.extractRotation(c),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),z.halfWidth.applyMatrix4(f),z.halfHeight.applyMatrix4(f),w++}else if(C.isPointLight){const z=a.point[M];z.position.setFromMatrixPosition(C.matrixWorld),z.position.applyMatrix4(x),M++}else if(C.isHemisphereLight){const z=a.hemi[y];z.direction.setFromMatrixPosition(C.matrixWorld),z.direction.transformDirection(x),y++}}}return{setup:m,setupView:d,state:a}}function Iv(r){const t=new $b(r),n=[],a=[],l=[];function c(g){v.camera=g,n.length=0,a.length=0,l.length=0}function f(g){n.push(g)}function m(g){a.push(g)}function d(g){l.push(g)}function p(){t.setup(n)}function _(g){t.setupView(n,g)}const v={lightsArray:n,shadowsArray:a,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:v,setupLights:p,setupLightsView:_,pushLight:f,pushShadow:m,pushLightProbeGrid:d}}function tA(r){let t=new WeakMap;function n(l,c=0){const f=t.get(l);let m;return f===void 0?(m=new Iv(r),t.set(l,[m])):c>=f.length?(m=new Iv(r),f.push(m)):m=f[c],m}function a(){t=new WeakMap}return{get:n,dispose:a}}const eA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nA=`uniform sampler2D shadow_pass;
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
}`,iA=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],aA=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],Bv=new qe,fl=new J,Nd=new J;function sA(r,t,n){let a=new Vp;const l=new ne,c=new ne,f=new an,m=new fy,d=new hy,p={},_=n.maxTextureSize,v={[xs]:Yn,[Yn]:xs,[Ua]:Ua},g=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:eA,fragmentShader:nA}),M=g.clone();M.defines.HORIZONTAL_PASS=1;const E=new Nn;E.setAttribute("position",new Xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new kn(E,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ml;let x=this.type;this.render=function(O,L,b){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||O.length===0)return;this.type===qM&&(se("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ml);const P=r.getRenderTarget(),k=r.getActiveCubeFace(),Q=r.getActiveMipmapLevel(),K=r.state;K.setBlending(Na),K.buffers.depth.getReversed()===!0?K.buffers.color.setClear(0,0,0,0):K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const lt=x!==this.type;lt&&L.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach(nt=>nt.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,nt=O.length;Z<nt;Z++){const B=O[Z],V=B.shadow;if(V===void 0){se("WebGLShadowMap:",B,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;l.copy(V.mapSize);const ft=V.getFrameExtents();l.multiply(ft),c.copy(V.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/ft.x),l.x=c.x*ft.x,V.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/ft.y),l.y=c.y*ft.y,V.mapSize.y=c.y));const it=r.state.buffers.depth.getReversed();if(V.camera._reversedDepth=it,V.map===null||lt===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===dl){if(B.isPointLight){se("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new zi(l.x,l.y,{format:Qs,type:Xi,minFilter:Wn,magFilter:Wn,generateMipmaps:!1}),V.map.texture.name=B.name+".shadowMap",V.map.depthTexture=new yl(l.x,l.y,aa),V.map.depthTexture.name=B.name+".shadowMapDepth",V.map.depthTexture.format=Pa,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Rn,V.map.depthTexture.magFilter=Rn}else B.isPointLight?(V.map=new bx(l.x),V.map.depthTexture=new sy(l.x,oa)):(V.map=new zi(l.x,l.y),V.map.depthTexture=new yl(l.x,l.y,oa)),V.map.depthTexture.name=B.name+".shadowMap",V.map.depthTexture.format=Pa,this.type===ml?(V.map.depthTexture.compareFunction=it?Fp:Bp,V.map.depthTexture.minFilter=Wn,V.map.depthTexture.magFilter=Wn):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Rn,V.map.depthTexture.magFilter=Rn);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==l.x||V.map.height!==l.y)&&V.map.setSize(l.x,l.y);const dt=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();B.isPointLight!==!0&&V.updateMatrices(B,b);for(let D=0;D<dt;D++){const et=V.getCamera(D);if(B.isPointLight){const vt=V.camera,wt=V.matrix,bt=B.distance||vt.far;bt!==vt.far&&(vt.far=bt,vt.updateProjectionMatrix()),fl.setFromMatrixPosition(B.matrixWorld),vt.position.copy(fl),Nd.copy(vt.position),Nd.add(iA[D]),vt.up.copy(aA[D]),vt.lookAt(Nd),vt.updateMatrixWorld(),wt.makeTranslation(-fl.x,-fl.y,-fl.z),Bv.multiplyMatrices(vt.projectionMatrix,vt.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Bv,vt.coordinateSystem,vt.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)r.setRenderTarget(V.map,D),r.clear();else{D===0&&(r.setRenderTarget(V.map),r.clear());const vt=V.getViewport(D);f.set(c.x*vt.x,c.y*vt.y,c.x*vt.z,c.y*vt.w),K.viewport(f)}a=V.getFrustum(D),C(L,b,et,B,this.type)}V.isPointLightShadow!==!0&&this.type===dl&&N(V,b),V.needsUpdate=!1}x=this.type,y.needsUpdate=!1,r.setRenderTarget(P,k,Q)};function N(O,L){const b=t.update(w);g.defines.VSM_SAMPLES!==O.blurSamples&&(g.defines.VSM_SAMPLES=O.blurSamples,M.defines.VSM_SAMPLES=O.blurSamples,g.needsUpdate=!0,M.needsUpdate=!0),O.mapPass===null?O.mapPass=new zi(l.x,l.y,{format:Qs,type:Xi}):(O.mapPass.width!==O.map.width||O.mapPass.height!==O.map.height)&&O.mapPass.setSize(O.map.width,O.map.height),g.uniforms.shadow_pass.value=O.map.depthTexture,g.uniforms.resolution.value.set(O.map.width,O.map.height),g.uniforms.radius.value=O.radius,r.setRenderTarget(O.mapPass),r.clear(),r.renderBufferDirect(L,null,b,g,w,null),M.uniforms.shadow_pass.value=O.mapPass.texture,M.uniforms.resolution.value.set(O.map.width,O.map.height),M.uniforms.radius.value=O.radius,r.setRenderTarget(O.map),r.clear(),r.renderBufferDirect(L,null,b,M,w,null)}function H(O,L,b,P){let k=null;const Q=b.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(Q!==void 0)k=Q;else if(k=b.isPointLight===!0?d:m,r.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const K=k.uuid,lt=L.uuid;let Z=p[K];Z===void 0&&(Z={},p[K]=Z);let nt=Z[lt];nt===void 0&&(nt=k.clone(),Z[lt]=nt,L.addEventListener("dispose",z)),k=nt}if(k.visible=L.visible,k.wireframe=L.wireframe,P===dl?k.side=L.shadowSide!==null?L.shadowSide:L.side:k.side=L.shadowSide!==null?L.shadowSide:v[L.side],k.alphaMap=L.alphaMap,k.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,k.map=L.map,k.clipShadows=L.clipShadows,k.clippingPlanes=L.clippingPlanes,k.clipIntersection=L.clipIntersection,k.displacementMap=L.displacementMap,k.displacementScale=L.displacementScale,k.displacementBias=L.displacementBias,k.wireframeLinewidth=L.wireframeLinewidth,k.linewidth=L.linewidth,b.isPointLight===!0&&k.isMeshDistanceMaterial===!0){const K=r.properties.get(k);K.light=b}return k}function C(O,L,b,P,k){if(O.visible===!1)return;if(O.layers.test(L.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&k===dl)&&(!O.frustumCulled||O.intersectsFrustum(a))){O.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,O.matrixWorld);const lt=t.update(O),Z=O.material;if(Array.isArray(Z)){const nt=lt.groups;for(let B=0,V=nt.length;B<V;B++){const ft=nt[B],it=Z[ft.materialIndex];if(it&&it.visible){const dt=H(O,it,P,k);O.onBeforeShadow(r,O,L,b,lt,dt,ft),r.renderBufferDirect(b,null,lt,dt,O,ft),O.onAfterShadow(r,O,L,b,lt,dt,ft)}}}else if(Z.visible){const nt=H(O,Z,P,k);O.onBeforeShadow(r,O,L,b,lt,nt,null),r.renderBufferDirect(b,null,lt,nt,O,null),O.onAfterShadow(r,O,L,b,lt,nt,null)}}const K=O.children;for(let lt=0,Z=K.length;lt<Z;lt++)C(K[lt],L,b,P,k)}function z(O){O.target.removeEventListener("dispose",z);for(const b in p){const P=p[b],k=O.target.uuid;k in P&&(P[k].dispose(),delete P[k])}}}function rA(r,t){function n(){let Y=!1;const Ut=new an;let Mt=null;const Lt=new an(0,0,0,0);return{setMask:function(Ht){Mt!==Ht&&!Y&&(r.colorMask(Ht,Ht,Ht,Ht),Mt=Ht)},setLocked:function(Ht){Y=Ht},setClear:function(Ht,Tt,Jt,Yt,Ge){Ge===!0&&(Ht*=Yt,Tt*=Yt,Jt*=Yt),Ut.set(Ht,Tt,Jt,Yt),Lt.equals(Ut)===!1&&(r.clearColor(Ht,Tt,Jt,Yt),Lt.copy(Ut))},reset:function(){Y=!1,Mt=null,Lt.set(-1,0,0,0)}}}function a(){let Y=!1,Ut=!1,Mt=null,Lt=null,Ht=null;return{setReversed:function(Tt){if(Ut!==Tt){const Jt=t.get("EXT_clip_control");Tt?Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.ZERO_TO_ONE_EXT):Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.NEGATIVE_ONE_TO_ONE_EXT),Ut=Tt;const Yt=Ht;Ht=null,this.setClear(Yt)}},getReversed:function(){return Ut},setTest:function(Tt){Tt?pt(r.DEPTH_TEST):At(r.DEPTH_TEST)},setMask:function(Tt){Mt!==Tt&&!Y&&(r.depthMask(Tt),Mt=Tt)},setFunc:function(Tt){if(Ut&&(Tt=R1[Tt]),Lt!==Tt){switch(Tt){case Fd:r.depthFunc(r.NEVER);break;case Hd:r.depthFunc(r.ALWAYS);break;case Gd:r.depthFunc(r.LESS);break;case vl:r.depthFunc(r.LEQUAL);break;case Vd:r.depthFunc(r.EQUAL);break;case kd:r.depthFunc(r.GEQUAL);break;case Wd:r.depthFunc(r.GREATER);break;case Xd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Lt=Tt}},setLocked:function(Tt){Y=Tt},setClear:function(Tt){Ht!==Tt&&(Ht=Tt,Ut&&(Tt=1-Tt),r.clearDepth(Tt))},reset:function(){Y=!1,Mt=null,Lt=null,Ht=null,Ut=!1}}}function l(){let Y=!1,Ut=null,Mt=null,Lt=null,Ht=null,Tt=null,Jt=null,Yt=null,Ge=null;return{setTest:function(Re){Y||(Re?pt(r.STENCIL_TEST):At(r.STENCIL_TEST))},setMask:function(Re){Ut!==Re&&!Y&&(r.stencilMask(Re),Ut=Re)},setFunc:function(Re,$n,ui){(Mt!==Re||Lt!==$n||Ht!==ui)&&(r.stencilFunc(Re,$n,ui),Mt=Re,Lt=$n,Ht=ui)},setOp:function(Re,$n,ui){(Tt!==Re||Jt!==$n||Yt!==ui)&&(r.stencilOp(Re,$n,ui),Tt=Re,Jt=$n,Yt=ui)},setLocked:function(Re){Y=Re},setClear:function(Re){Ge!==Re&&(r.clearStencil(Re),Ge=Re)},reset:function(){Y=!1,Ut=null,Mt=null,Lt=null,Ht=null,Tt=null,Jt=null,Yt=null,Ge=null}}}const c=new n,f=new a,m=new l,d=new WeakMap,p=new WeakMap;let _={},v={},g={},M=new WeakMap,E=[],w=null,y=!1,x=null,N=null,H=null,C=null,z=null,O=null,L=null,b=new ae(0,0,0),P=0,k=!1,Q=null,K=null,lt=null,Z=null,nt=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,ft=0;const it=r.getParameter(r.VERSION);it.indexOf("WebGL")!==-1?(ft=parseFloat(/^WebGL (\d)/.exec(it)[1]),V=ft>=1):it.indexOf("OpenGL ES")!==-1&&(ft=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),V=ft>=2);let dt=null,D={};const et=r.getParameter(r.SCISSOR_BOX),vt=r.getParameter(r.VIEWPORT),wt=new an().fromArray(et),bt=new an().fromArray(vt);function Rt(Y,Ut,Mt,Lt){const Ht=new Uint8Array(4),Tt=r.createTexture();r.bindTexture(Y,Tt),r.texParameteri(Y,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Y,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Jt=0;Jt<Mt;Jt++)Y===r.TEXTURE_3D||Y===r.TEXTURE_2D_ARRAY?r.texImage3D(Ut,0,r.RGBA,1,1,Lt,0,r.RGBA,r.UNSIGNED_BYTE,Ht):r.texImage2D(Ut+Jt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ht);return Tt}const $={};$[r.TEXTURE_2D]=Rt(r.TEXTURE_2D,r.TEXTURE_2D,1),$[r.TEXTURE_CUBE_MAP]=Rt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[r.TEXTURE_2D_ARRAY]=Rt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),$[r.TEXTURE_3D]=Rt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),m.setClear(0),pt(r.DEPTH_TEST),f.setFunc(vl),ve(!1),Ze(z_),pt(r.CULL_FACE),ye(Na);function pt(Y){_[Y]!==!0&&(r.enable(Y),_[Y]=!0)}function At(Y){_[Y]!==!1&&(r.disable(Y),_[Y]=!1)}function $t(Y,Ut){return g[Y]!==Ut?(r.bindFramebuffer(Y,Ut),g[Y]=Ut,Y===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Ut),Y===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Ut),!0):!1}function zt(Y,Ut){let Mt=E,Lt=!1;if(Y){Mt=M.get(Ut),Mt===void 0&&(Mt=[],M.set(Ut,Mt));const Ht=Y.textures;if(Mt.length!==Ht.length||Mt[0]!==r.COLOR_ATTACHMENT0){for(let Tt=0,Jt=Ht.length;Tt<Jt;Tt++)Mt[Tt]=r.COLOR_ATTACHMENT0+Tt;Mt.length=Ht.length,Lt=!0}}else Mt[0]!==r.BACK&&(Mt[0]=r.BACK,Lt=!0);Lt&&r.drawBuffers(Mt)}function re(Y){return w!==Y?(r.useProgram(Y),w=Y,!0):!1}const $e={[Kr]:r.FUNC_ADD,[KM]:r.FUNC_SUBTRACT,[QM]:r.FUNC_REVERSE_SUBTRACT};$e[JM]=r.MIN,$e[jM]=r.MAX;const le={[$M]:r.ZERO,[t1]:r.ONE,[e1]:r.SRC_COLOR,[kv]:r.SRC_ALPHA,[o1]:r.SRC_ALPHA_SATURATE,[s1]:r.DST_COLOR,[i1]:r.DST_ALPHA,[n1]:r.ONE_MINUS_SRC_COLOR,[Wv]:r.ONE_MINUS_SRC_ALPHA,[r1]:r.ONE_MINUS_DST_COLOR,[a1]:r.ONE_MINUS_DST_ALPHA,[l1]:r.CONSTANT_COLOR,[c1]:r.ONE_MINUS_CONSTANT_COLOR,[u1]:r.CONSTANT_ALPHA,[f1]:r.ONE_MINUS_CONSTANT_ALPHA};function ye(Y,Ut,Mt,Lt,Ht,Tt,Jt,Yt,Ge,Re){if(Y===Na){y===!0&&(At(r.BLEND),y=!1);return}if(y===!1&&(pt(r.BLEND),y=!0),Y!==ZM){if(Y!==x||Re!==k){if((N!==Kr||z!==Kr)&&(r.blendEquation(r.FUNC_ADD),N=Kr,z=Kr),Re)switch(Y){case gl:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Mu:r.blendFunc(r.ONE,r.ONE);break;case I_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case B_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ce("WebGLState: Invalid blending: ",Y);break}else switch(Y){case gl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Mu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case I_:Ce("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case B_:Ce("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ce("WebGLState: Invalid blending: ",Y);break}H=null,C=null,O=null,L=null,b.set(0,0,0),P=0,x=Y,k=Re}return}Ht=Ht||Ut,Tt=Tt||Mt,Jt=Jt||Lt,(Ut!==N||Ht!==z)&&(r.blendEquationSeparate($e[Ut],$e[Ht]),N=Ut,z=Ht),(Mt!==H||Lt!==C||Tt!==O||Jt!==L)&&(r.blendFuncSeparate(le[Mt],le[Lt],le[Tt],le[Jt]),H=Mt,C=Lt,O=Tt,L=Jt),(Yt.equals(b)===!1||Ge!==P)&&(r.blendColor(Yt.r,Yt.g,Yt.b,Ge),b.copy(Yt),P=Ge),x=Y,k=!1}function Pe(Y,Ut){Y.side===Ua?At(r.CULL_FACE):pt(r.CULL_FACE);let Mt=Y.side===Yn;Ut&&(Mt=!Mt),ve(Mt),Y.blending===gl&&Y.transparent===!1?ye(Na):ye(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),f.setFunc(Y.depthFunc),f.setTest(Y.depthTest),f.setMask(Y.depthWrite),c.setMask(Y.colorWrite);const Lt=Y.stencilWrite;m.setTest(Lt),Lt&&(m.setMask(Y.stencilWriteMask),m.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),m.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),Dn(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?pt(r.SAMPLE_ALPHA_TO_COVERAGE):At(r.SAMPLE_ALPHA_TO_COVERAGE)}function ve(Y){Q!==Y&&(Y?r.frontFace(r.CW):r.frontFace(r.CCW),Q=Y)}function Ze(Y){Y!==XM?(pt(r.CULL_FACE),Y!==K&&(Y===z_?r.cullFace(r.BACK):Y===YM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):At(r.CULL_FACE),K=Y}function ln(Y){Y!==lt&&(V&&r.lineWidth(Y),lt=Y)}function Dn(Y,Ut,Mt){Y?(pt(r.POLYGON_OFFSET_FILL),(Z!==Ut||nt!==Mt)&&(Z=Ut,nt=Mt,f.getReversed()&&(Ut=-Ut),r.polygonOffset(Ut,Mt))):At(r.POLYGON_OFFSET_FILL)}function Ke(Y){Y?pt(r.SCISSOR_TEST):At(r.SCISSOR_TEST)}function cn(Y){Y===void 0&&(Y=r.TEXTURE0+B-1),dt!==Y&&(r.activeTexture(Y),dt=Y)}function q(Y,Ut,Mt){Mt===void 0&&(dt===null?Mt=r.TEXTURE0+B-1:Mt=dt);let Lt=D[Mt];Lt===void 0&&(Lt={type:void 0,texture:void 0},D[Mt]=Lt),(Lt.type!==Y||Lt.texture!==Ut)&&(dt!==Mt&&(r.activeTexture(Mt),dt=Mt),r.bindTexture(Y,Ut||$[Y]),Lt.type=Y,Lt.texture=Ut)}function ze(){const Y=D[dt];Y!==void 0&&Y.type!==void 0&&(r.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Le(){try{r.compressedTexImage2D(...arguments)}catch(Y){Ce("WebGLState:",Y)}}function I(){try{r.compressedTexImage3D(...arguments)}catch(Y){Ce("WebGLState:",Y)}}function T(){try{r.texSubImage2D(...arguments)}catch(Y){Ce("WebGLState:",Y)}}function tt(){try{r.texSubImage3D(...arguments)}catch(Y){Ce("WebGLState:",Y)}}function ct(){try{r.compressedTexSubImage2D(...arguments)}catch(Y){Ce("WebGLState:",Y)}}function gt(){try{r.compressedTexSubImage3D(...arguments)}catch(Y){Ce("WebGLState:",Y)}}function Ct(){try{r.texStorage2D(...arguments)}catch(Y){Ce("WebGLState:",Y)}}function Nt(){try{r.texStorage3D(...arguments)}catch(Y){Ce("WebGLState:",Y)}}function _t(){try{r.texImage2D(...arguments)}catch(Y){Ce("WebGLState:",Y)}}function xt(){try{r.texImage3D(...arguments)}catch(Y){Ce("WebGLState:",Y)}}function Dt(Y){return v[Y]!==void 0?v[Y]:r.getParameter(Y)}function kt(Y,Ut){v[Y]!==Ut&&(r.pixelStorei(Y,Ut),v[Y]=Ut)}function It(Y){wt.equals(Y)===!1&&(r.scissor(Y.x,Y.y,Y.z,Y.w),wt.copy(Y))}function Ot(Y){bt.equals(Y)===!1&&(r.viewport(Y.x,Y.y,Y.z,Y.w),bt.copy(Y))}function jt(Y,Ut){let Mt=p.get(Ut);Mt===void 0&&(Mt=new WeakMap,p.set(Ut,Mt));let Lt=Mt.get(Y);Lt===void 0&&(Lt=r.getUniformBlockIndex(Ut,Y.name),Mt.set(Y,Lt))}function te(Y,Ut){const Lt=p.get(Ut).get(Y);d.get(Ut)!==Lt&&(r.uniformBlockBinding(Ut,Lt,Y.__bindingPointIndex),d.set(Ut,Lt))}function oe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),_={},v={},dt=null,D={},g={},M=new WeakMap,E=[],w=null,y=!1,x=null,N=null,H=null,C=null,z=null,O=null,L=null,b=new ae(0,0,0),P=0,k=!1,Q=null,K=null,lt=null,Z=null,nt=null,wt.set(0,0,r.canvas.width,r.canvas.height),bt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),m.reset()}return{buffers:{color:c,depth:f,stencil:m},enable:pt,disable:At,bindFramebuffer:$t,drawBuffers:zt,useProgram:re,setBlending:ye,setMaterial:Pe,setFlipSided:ve,setCullFace:Ze,setLineWidth:ln,setPolygonOffset:Dn,setScissorTest:Ke,activeTexture:cn,bindTexture:q,unbindTexture:ze,compressedTexImage2D:Le,compressedTexImage3D:I,texImage2D:_t,texImage3D:xt,pixelStorei:kt,getParameter:Dt,updateUBOMapping:jt,uniformBlockBinding:te,texStorage2D:Ct,texStorage3D:Nt,texSubImage2D:T,texSubImage3D:tt,compressedTexSubImage2D:ct,compressedTexSubImage3D:gt,scissor:It,viewport:Ot,reset:oe}}function oA(r,t,n,a,l,c,f){const m=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new ne,_=new WeakMap,v=new Set;let g;const M=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(I,T){return E?new OffscreenCanvas(I,T):Au("canvas")}function y(I,T,tt){let ct=1;const gt=Le(I);if((gt.width>tt||gt.height>tt)&&(ct=tt/Math.max(gt.width,gt.height)),ct<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const Ct=Math.floor(ct*gt.width),Nt=Math.floor(ct*gt.height);g===void 0&&(g=w(Ct,Nt));const _t=T?w(Ct,Nt):g;return _t.width=Ct,_t.height=Nt,_t.getContext("2d").drawImage(I,0,0,Ct,Nt),se("WebGLRenderer: Texture has been resized from ("+gt.width+"x"+gt.height+") to ("+Ct+"x"+Nt+")."),_t}else return"data"in I&&se("WebGLRenderer: Image in DataTexture is too big ("+gt.width+"x"+gt.height+")."),I;return I}function x(I){return I.generateMipmaps}function N(I){r.generateMipmap(I)}function H(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function C(I,T,tt,ct,gt,Ct=!1){if(I!==null){if(r[I]!==void 0)return r[I];se("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Nt;ct&&(Nt=t.get("EXT_texture_norm16"),Nt||se("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let _t=T;if(T===r.RED&&(tt===r.FLOAT&&(_t=r.R32F),tt===r.HALF_FLOAT&&(_t=r.R16F),tt===r.UNSIGNED_BYTE&&(_t=r.R8),tt===r.UNSIGNED_SHORT&&Nt&&(_t=Nt.R16_EXT),tt===r.SHORT&&Nt&&(_t=Nt.R16_SNORM_EXT)),T===r.RED_INTEGER&&(tt===r.UNSIGNED_BYTE&&(_t=r.R8UI),tt===r.UNSIGNED_SHORT&&(_t=r.R16UI),tt===r.UNSIGNED_INT&&(_t=r.R32UI),tt===r.BYTE&&(_t=r.R8I),tt===r.SHORT&&(_t=r.R16I),tt===r.INT&&(_t=r.R32I)),T===r.RG&&(tt===r.FLOAT&&(_t=r.RG32F),tt===r.HALF_FLOAT&&(_t=r.RG16F),tt===r.UNSIGNED_BYTE&&(_t=r.RG8),tt===r.UNSIGNED_SHORT&&Nt&&(_t=Nt.RG16_EXT),tt===r.SHORT&&Nt&&(_t=Nt.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(tt===r.UNSIGNED_BYTE&&(_t=r.RG8UI),tt===r.UNSIGNED_SHORT&&(_t=r.RG16UI),tt===r.UNSIGNED_INT&&(_t=r.RG32UI),tt===r.BYTE&&(_t=r.RG8I),tt===r.SHORT&&(_t=r.RG16I),tt===r.INT&&(_t=r.RG32I)),T===r.RGB_INTEGER&&(tt===r.UNSIGNED_BYTE&&(_t=r.RGB8UI),tt===r.UNSIGNED_SHORT&&(_t=r.RGB16UI),tt===r.UNSIGNED_INT&&(_t=r.RGB32UI),tt===r.BYTE&&(_t=r.RGB8I),tt===r.SHORT&&(_t=r.RGB16I),tt===r.INT&&(_t=r.RGB32I)),T===r.RGBA_INTEGER&&(tt===r.UNSIGNED_BYTE&&(_t=r.RGBA8UI),tt===r.UNSIGNED_SHORT&&(_t=r.RGBA16UI),tt===r.UNSIGNED_INT&&(_t=r.RGBA32UI),tt===r.BYTE&&(_t=r.RGBA8I),tt===r.SHORT&&(_t=r.RGBA16I),tt===r.INT&&(_t=r.RGBA32I)),T===r.RGB&&(tt===r.UNSIGNED_SHORT&&Nt&&(_t=Nt.RGB16_EXT),tt===r.SHORT&&Nt&&(_t=Nt.RGB16_SNORM_EXT),tt===r.UNSIGNED_INT_5_9_9_9_REV&&(_t=r.RGB9_E5),tt===r.UNSIGNED_INT_10F_11F_11F_REV&&(_t=r.R11F_G11F_B10F)),T===r.RGBA){const xt=Ct?bu:Ae.getTransfer(gt);tt===r.FLOAT&&(_t=r.RGBA32F),tt===r.HALF_FLOAT&&(_t=r.RGBA16F),tt===r.UNSIGNED_BYTE&&(_t=xt===Fe?r.SRGB8_ALPHA8:r.RGBA8),tt===r.UNSIGNED_SHORT&&Nt&&(_t=Nt.RGBA16_EXT),tt===r.SHORT&&Nt&&(_t=Nt.RGBA16_SNORM_EXT),tt===r.UNSIGNED_SHORT_4_4_4_4&&(_t=r.RGBA4),tt===r.UNSIGNED_SHORT_5_5_5_1&&(_t=r.RGB5_A1)}return(_t===r.R16F||_t===r.R32F||_t===r.RG16F||_t===r.RG32F||_t===r.RGBA16F||_t===r.RGBA32F)&&t.get("EXT_color_buffer_float"),_t}function z(I,T){let tt;return I?T===null||T===oa||T===Sl?tt=r.DEPTH24_STENCIL8:T===aa?tt=r.DEPTH32F_STENCIL8:T===xl&&(tt=r.DEPTH24_STENCIL8,se("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===oa||T===Sl?tt=r.DEPTH_COMPONENT24:T===aa?tt=r.DEPTH_COMPONENT32F:T===xl&&(tt=r.DEPTH_COMPONENT16),tt}function O(I,T){return x(I)===!0||I.isFramebufferTexture&&I.minFilter!==Rn&&I.minFilter!==Wn?Math.log2(Math.max(T.width,T.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?T.mipmaps.length:1}function L(I){const T=I.target;T.removeEventListener("dispose",L),P(T),T.isVideoTexture&&_.delete(T),T.isHTMLTexture&&v.delete(T)}function b(I){const T=I.target;T.removeEventListener("dispose",b),Q(T)}function P(I){const T=a.get(I);if(T.__webglInit===void 0)return;const tt=I.source,ct=M.get(tt);if(ct){const gt=ct[T.__cacheKey];gt.usedTimes--,gt.usedTimes===0&&k(I),Object.keys(ct).length===0&&M.delete(tt)}a.remove(I)}function k(I){const T=a.get(I);r.deleteTexture(T.__webglTexture);const tt=I.source,ct=M.get(tt);delete ct[T.__cacheKey],f.memory.textures--}function Q(I){const T=a.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),a.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray(T.__webglFramebuffer[ct]))for(let gt=0;gt<T.__webglFramebuffer[ct].length;gt++)r.deleteFramebuffer(T.__webglFramebuffer[ct][gt]);else r.deleteFramebuffer(T.__webglFramebuffer[ct]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ct])}else{if(Array.isArray(T.__webglFramebuffer))for(let ct=0;ct<T.__webglFramebuffer.length;ct++)r.deleteFramebuffer(T.__webglFramebuffer[ct]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ct=0;ct<T.__webglColorRenderbuffer.length;ct++)T.__webglColorRenderbuffer[ct]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ct]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const tt=I.textures;for(let ct=0,gt=tt.length;ct<gt;ct++){const Ct=a.get(tt[ct]);Ct.__webglTexture&&(r.deleteTexture(Ct.__webglTexture),f.memory.textures--),a.remove(tt[ct])}a.remove(I)}let K=0;function lt(){K=0}function Z(){return K}function nt(I){K=I}function B(){const I=K;return I>=l.maxTextures&&se("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+l.maxTextures),K+=1,I}function V(I){const T=[];return T.push(I.wrapS),T.push(I.wrapT),T.push(I.wrapR||0),T.push(I.magFilter),T.push(I.minFilter),T.push(I.anisotropy),T.push(I.internalFormat),T.push(I.format),T.push(I.type),T.push(I.generateMipmaps),T.push(I.premultiplyAlpha),T.push(I.flipY),T.push(I.unpackAlignment),T.push(I.colorSpace),T.join()}function ft(I,T){const tt=a.get(I);if(I.isVideoTexture&&q(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&tt.__version!==I.version){const ct=I.image;if(ct===null)se("WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)se("WebGLRenderer: Texture marked for update but image is incomplete");else{At(tt,I,T);return}}else I.isExternalTexture&&(tt.__webglTexture=I.sourceTexture?I.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,tt.__webglTexture,r.TEXTURE0+T)}function it(I,T){const tt=a.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&tt.__version!==I.version){At(tt,I,T);return}else I.isExternalTexture&&(tt.__webglTexture=I.sourceTexture?I.sourceTexture:null);n.bindTexture(r.TEXTURE_2D_ARRAY,tt.__webglTexture,r.TEXTURE0+T)}function dt(I,T){const tt=a.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&tt.__version!==I.version){At(tt,I,T);return}n.bindTexture(r.TEXTURE_3D,tt.__webglTexture,r.TEXTURE0+T)}function D(I,T){const tt=a.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&tt.__version!==I.version){$t(tt,I,T);return}n.bindTexture(r.TEXTURE_CUBE_MAP,tt.__webglTexture,r.TEXTURE0+T)}const et={[Yd]:r.REPEAT,[La]:r.CLAMP_TO_EDGE,[qd]:r.MIRRORED_REPEAT},vt={[Rn]:r.NEAREST,[p1]:r.NEAREST_MIPMAP_NEAREST,[Ic]:r.NEAREST_MIPMAP_LINEAR,[Wn]:r.LINEAR,[nd]:r.LINEAR_MIPMAP_NEAREST,[qs]:r.LINEAR_MIPMAP_LINEAR},wt={[v1]:r.NEVER,[E1]:r.ALWAYS,[x1]:r.LESS,[Bp]:r.LEQUAL,[S1]:r.EQUAL,[Fp]:r.GEQUAL,[M1]:r.GREATER,[y1]:r.NOTEQUAL};function bt(I,T){if(T.type===aa&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Wn||T.magFilter===nd||T.magFilter===Ic||T.magFilter===qs||T.minFilter===Wn||T.minFilter===nd||T.minFilter===Ic||T.minFilter===qs)&&se("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,et[T.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,et[T.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,et[T.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,vt[T.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,vt[T.minFilter]),T.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,wt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Rn||T.minFilter!==Ic&&T.minFilter!==qs||T.type===aa&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||a.get(T).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");r.texParameterf(I,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),a.get(T).__currentAnisotropy=T.anisotropy}}}function Rt(I,T){let tt=!1;I.__webglInit===void 0&&(I.__webglInit=!0,T.addEventListener("dispose",L));const ct=T.source;let gt=M.get(ct);gt===void 0&&(gt={},M.set(ct,gt));const Ct=V(T);if(Ct!==I.__cacheKey){gt[Ct]===void 0&&(gt[Ct]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,tt=!0),gt[Ct].usedTimes++;const Nt=gt[I.__cacheKey];Nt!==void 0&&(gt[I.__cacheKey].usedTimes--,Nt.usedTimes===0&&k(T)),I.__cacheKey=Ct,I.__webglTexture=gt[Ct].texture}return tt}function $(I,T,tt){return Math.floor(Math.floor(I/tt)/T)}function pt(I,T,tt,ct){const Ct=I.updateRanges;if(Ct.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,tt,ct,T.data);else{Ct.sort((kt,It)=>kt.start-It.start);let Nt=0;for(let kt=1;kt<Ct.length;kt++){const It=Ct[Nt],Ot=Ct[kt],jt=It.start+It.count,te=$(Ot.start,T.width,4),oe=$(It.start,T.width,4);Ot.start<=jt+1&&te===oe&&$(Ot.start+Ot.count-1,T.width,4)===te?It.count=Math.max(It.count,Ot.start+Ot.count-It.start):(++Nt,Ct[Nt]=Ot)}Ct.length=Nt+1;const _t=n.getParameter(r.UNPACK_ROW_LENGTH),xt=n.getParameter(r.UNPACK_SKIP_PIXELS),Dt=n.getParameter(r.UNPACK_SKIP_ROWS);n.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let kt=0,It=Ct.length;kt<It;kt++){const Ot=Ct[kt],jt=Math.floor(Ot.start/4),te=Math.ceil(Ot.count/4),oe=jt%T.width,Y=Math.floor(jt/T.width),Ut=te,Mt=1;n.pixelStorei(r.UNPACK_SKIP_PIXELS,oe),n.pixelStorei(r.UNPACK_SKIP_ROWS,Y),n.texSubImage2D(r.TEXTURE_2D,0,oe,Y,Ut,Mt,tt,ct,T.data)}I.clearUpdateRanges(),n.pixelStorei(r.UNPACK_ROW_LENGTH,_t),n.pixelStorei(r.UNPACK_SKIP_PIXELS,xt),n.pixelStorei(r.UNPACK_SKIP_ROWS,Dt)}}function At(I,T,tt){let ct=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ct=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ct=r.TEXTURE_3D);const gt=Rt(I,T),Ct=T.source;n.bindTexture(ct,I.__webglTexture,r.TEXTURE0+tt);const Nt=a.get(Ct);if(Ct.version!==Nt.__version||gt===!0){if(n.activeTexture(r.TEXTURE0+tt),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const Mt=Ae.getPrimaries(Ae.workingColorSpace),Lt=T.colorSpace===_s?null:Ae.getPrimaries(T.colorSpace),Ht=T.colorSpace===_s||Mt===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht)}n.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let xt=y(T.image,!1,l.maxTextureSize);xt=ze(T,xt);const Dt=c.convert(T.format,T.colorSpace),kt=c.convert(T.type);let It=C(T.internalFormat,Dt,kt,T.normalized,T.colorSpace,T.isVideoTexture);bt(ct,T);let Ot;const jt=T.mipmaps,te=T.isVideoTexture!==!0,oe=Nt.__version===void 0||gt===!0,Y=Ct.dataReady,Ut=O(T,xt);if(T.isDepthTexture)It=z(T.format===Zs,T.type),oe&&(te?n.texStorage2D(r.TEXTURE_2D,1,It,xt.width,xt.height):n.texImage2D(r.TEXTURE_2D,0,It,xt.width,xt.height,0,Dt,kt,null));else if(T.isDataTexture)if(jt.length>0){te&&oe&&n.texStorage2D(r.TEXTURE_2D,Ut,It,jt[0].width,jt[0].height);for(let Mt=0,Lt=jt.length;Mt<Lt;Mt++)Ot=jt[Mt],te?Y&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Ot.width,Ot.height,Dt,kt,Ot.data):n.texImage2D(r.TEXTURE_2D,Mt,It,Ot.width,Ot.height,0,Dt,kt,Ot.data);T.generateMipmaps=!1}else te?(oe&&n.texStorage2D(r.TEXTURE_2D,Ut,It,xt.width,xt.height),Y&&pt(T,xt,Dt,kt)):n.texImage2D(r.TEXTURE_2D,0,It,xt.width,xt.height,0,Dt,kt,xt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){te&&oe&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Ut,It,jt[0].width,jt[0].height,xt.depth);for(let Mt=0,Lt=jt.length;Mt<Lt;Mt++)if(Ot=jt[Mt],T.format!==Wi)if(Dt!==null)if(te){if(Y)if(T.layerUpdates.size>0){const Ht=gv(Ot.width,Ot.height,T.format,T.type);for(const Tt of T.layerUpdates){const Jt=Ot.data.subarray(Tt*Ht/Ot.data.BYTES_PER_ELEMENT,(Tt+1)*Ht/Ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,Tt,Ot.width,Ot.height,1,Dt,Jt)}}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Ot.width,Ot.height,xt.depth,Dt,Ot.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Mt,It,Ot.width,Ot.height,xt.depth,0,Ot.data,0,0);else se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else te?Y&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Ot.width,Ot.height,xt.depth,Dt,kt,Ot.data):n.texImage3D(r.TEXTURE_2D_ARRAY,Mt,It,Ot.width,Ot.height,xt.depth,0,Dt,kt,Ot.data);T.layerUpdates.size>0&&T.clearLayerUpdates()}else{te&&oe&&n.texStorage2D(r.TEXTURE_2D,Ut,It,jt[0].width,jt[0].height);for(let Mt=0,Lt=jt.length;Mt<Lt;Mt++)Ot=jt[Mt],T.format!==Wi?Dt!==null?te?Y&&n.compressedTexSubImage2D(r.TEXTURE_2D,Mt,0,0,Ot.width,Ot.height,Dt,Ot.data):n.compressedTexImage2D(r.TEXTURE_2D,Mt,It,Ot.width,Ot.height,0,Ot.data):se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?Y&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Ot.width,Ot.height,Dt,kt,Ot.data):n.texImage2D(r.TEXTURE_2D,Mt,It,Ot.width,Ot.height,0,Dt,kt,Ot.data)}else if(T.isDataArrayTexture)if(te){if(oe&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Ut,It,xt.width,xt.height,xt.depth),Y)if(T.layerUpdates.size>0){const Mt=gv(xt.width,xt.height,T.format,T.type);for(const Lt of T.layerUpdates){const Ht=xt.data.subarray(Lt*Mt/xt.data.BYTES_PER_ELEMENT,(Lt+1)*Mt/xt.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Lt,xt.width,xt.height,1,Dt,kt,Ht)}T.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,xt.width,xt.height,xt.depth,Dt,kt,xt.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,It,xt.width,xt.height,xt.depth,0,Dt,kt,xt.data);else if(T.isData3DTexture)te?(oe&&n.texStorage3D(r.TEXTURE_3D,Ut,It,xt.width,xt.height,xt.depth),Y&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,xt.width,xt.height,xt.depth,Dt,kt,xt.data)):n.texImage3D(r.TEXTURE_3D,0,It,xt.width,xt.height,xt.depth,0,Dt,kt,xt.data);else if(T.isFramebufferTexture){if(oe)if(te)n.texStorage2D(r.TEXTURE_2D,Ut,It,xt.width,xt.height);else{let Mt=xt.width,Lt=xt.height;for(let Ht=0;Ht<Ut;Ht++)n.texImage2D(r.TEXTURE_2D,Ht,It,Mt,Lt,0,Dt,kt,null),Mt>>=1,Lt>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const Mt=r.canvas;if(Mt.hasAttribute("layoutsubtree")||Mt.setAttribute("layoutsubtree","true"),xt.parentNode!==Mt){Mt.appendChild(xt),v.add(T),Mt.onpaint=Lt=>{const Ht=Lt.changedElements;for(const Tt of v)Ht.includes(Tt.image)&&(Tt.needsUpdate=!0)},Mt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,xt);else{const Ht=r.RGBA,Tt=r.RGBA,Jt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Ht,Tt,Jt,xt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(jt.length>0){if(te&&oe){const Mt=Le(jt[0]);n.texStorage2D(r.TEXTURE_2D,Ut,It,Mt.width,Mt.height)}for(let Mt=0,Lt=jt.length;Mt<Lt;Mt++)Ot=jt[Mt],te?Y&&n.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Dt,kt,Ot):n.texImage2D(r.TEXTURE_2D,Mt,It,Dt,kt,Ot);T.generateMipmaps=!1}else if(te){if(oe){const Mt=Le(xt);n.texStorage2D(r.TEXTURE_2D,Ut,It,Mt.width,Mt.height)}Y&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Dt,kt,xt)}else n.texImage2D(r.TEXTURE_2D,0,It,Dt,kt,xt);x(T)&&N(ct),Nt.__version=Ct.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function $t(I,T,tt){if(T.image.length!==6)return;const ct=Rt(I,T),gt=T.source;n.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+tt);const Ct=a.get(gt);if(gt.version!==Ct.__version||ct===!0){n.activeTexture(r.TEXTURE0+tt);const Nt=Ae.getPrimaries(Ae.workingColorSpace),_t=T.colorSpace===_s?null:Ae.getPrimaries(T.colorSpace),xt=T.colorSpace===_s||Nt===_t?r.NONE:r.BROWSER_DEFAULT_WEBGL;n.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const Dt=T.isCompressedTexture||T.image[0].isCompressedTexture,kt=T.image[0]&&T.image[0].isDataTexture,It=[];for(let Tt=0;Tt<6;Tt++)!Dt&&!kt?It[Tt]=y(T.image[Tt],!0,l.maxCubemapSize):It[Tt]=kt?T.image[Tt].image:T.image[Tt],It[Tt]=ze(T,It[Tt]);const Ot=It[0],jt=c.convert(T.format,T.colorSpace),te=c.convert(T.type),oe=C(T.internalFormat,jt,te,T.normalized,T.colorSpace),Y=T.isVideoTexture!==!0,Ut=Ct.__version===void 0||ct===!0,Mt=gt.dataReady;let Lt=O(T,Ot);bt(r.TEXTURE_CUBE_MAP,T);let Ht;if(Dt){Y&&Ut&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Lt,oe,Ot.width,Ot.height);for(let Tt=0;Tt<6;Tt++){Ht=It[Tt].mipmaps;for(let Jt=0;Jt<Ht.length;Jt++){const Yt=Ht[Jt];T.format!==Wi?jt!==null?Y?Mt&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt,0,0,Yt.width,Yt.height,jt,Yt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt,oe,Yt.width,Yt.height,0,Yt.data):se("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt,0,0,Yt.width,Yt.height,jt,te,Yt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt,oe,Yt.width,Yt.height,0,jt,te,Yt.data)}}}else{if(Ht=T.mipmaps,Y&&Ut){Ht.length>0&&Lt++;const Tt=Le(It[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Lt,oe,Tt.width,Tt.height)}for(let Tt=0;Tt<6;Tt++)if(kt){Y?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,It[Tt].width,It[Tt].height,jt,te,It[Tt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,oe,It[Tt].width,It[Tt].height,0,jt,te,It[Tt].data);for(let Jt=0;Jt<Ht.length;Jt++){const Ge=Ht[Jt].image[Tt].image;Y?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt+1,0,0,Ge.width,Ge.height,jt,te,Ge.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt+1,oe,Ge.width,Ge.height,0,jt,te,Ge.data)}}else{Y?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,jt,te,It[Tt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,oe,jt,te,It[Tt]);for(let Jt=0;Jt<Ht.length;Jt++){const Yt=Ht[Jt];Y?Mt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt+1,0,0,jt,te,Yt.image[Tt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt+1,oe,jt,te,Yt.image[Tt])}}}x(T)&&N(r.TEXTURE_CUBE_MAP),Ct.__version=gt.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function zt(I,T,tt,ct,gt,Ct){const Nt=c.convert(tt.format,tt.colorSpace),_t=c.convert(tt.type),xt=C(tt.internalFormat,Nt,_t,tt.normalized,tt.colorSpace),Dt=a.get(T),kt=a.get(tt);if(kt.__renderTarget=T,!Dt.__hasExternalTextures){const It=Math.max(1,T.width>>Ct),Ot=Math.max(1,T.height>>Ct);gt===r.TEXTURE_3D||gt===r.TEXTURE_2D_ARRAY?n.texImage3D(gt,Ct,xt,It,Ot,T.depth,0,Nt,_t,null):n.texImage2D(gt,Ct,xt,It,Ot,0,Nt,_t,null)}n.bindFramebuffer(r.FRAMEBUFFER,I),cn(T)?m.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ct,gt,kt.__webglTexture,0,Ke(T)):(gt===r.TEXTURE_2D||gt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&gt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ct,gt,kt.__webglTexture,Ct),n.bindFramebuffer(r.FRAMEBUFFER,null)}function re(I,T,tt){if(r.bindRenderbuffer(r.RENDERBUFFER,I),T.depthBuffer){const ct=T.depthTexture,gt=ct&&ct.isDepthTexture?ct.type:null,Ct=z(T.stencilBuffer,gt),Nt=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;cn(T)?m.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ke(T),Ct,T.width,T.height):tt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke(T),Ct,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Ct,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Nt,r.RENDERBUFFER,I)}else{const ct=T.textures;for(let gt=0;gt<ct.length;gt++){const Ct=ct[gt],Nt=c.convert(Ct.format,Ct.colorSpace),_t=c.convert(Ct.type),xt=C(Ct.internalFormat,Nt,_t,Ct.normalized,Ct.colorSpace);cn(T)?m.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ke(T),xt,T.width,T.height):tt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke(T),xt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,xt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function $e(I,T,tt){const ct=T.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(r.FRAMEBUFFER,I),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const gt=a.get(T.depthTexture);if(gt.__renderTarget=T,(!gt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ct){if(gt.__webglInit===void 0&&(gt.__webglInit=!0,T.depthTexture.addEventListener("dispose",L)),gt.__webglTexture===void 0){gt.__webglTexture=r.createTexture(),n.bindTexture(r.TEXTURE_CUBE_MAP,gt.__webglTexture),bt(r.TEXTURE_CUBE_MAP,T.depthTexture);const Dt=c.convert(T.depthTexture.format),kt=c.convert(T.depthTexture.type);let It;T.depthTexture.format===Pa?It=r.DEPTH_COMPONENT24:T.depthTexture.format===Zs&&(It=r.DEPTH24_STENCIL8);for(let Ot=0;Ot<6;Ot++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ot,0,It,T.width,T.height,0,Dt,kt,null)}}else ft(T.depthTexture,0);const Ct=gt.__webglTexture,Nt=Ke(T),_t=ct?r.TEXTURE_CUBE_MAP_POSITIVE_X+tt:r.TEXTURE_2D,xt=T.depthTexture.format===Zs?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===Pa)cn(T)?m.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xt,_t,Ct,0,Nt):r.framebufferTexture2D(r.FRAMEBUFFER,xt,_t,Ct,0);else if(T.depthTexture.format===Zs)cn(T)?m.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xt,_t,Ct,0,Nt):r.framebufferTexture2D(r.FRAMEBUFFER,xt,_t,Ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function le(I){const T=a.get(I),tt=I.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==I.depthTexture){const ct=I.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ct){const gt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ct.removeEventListener("dispose",gt)};ct.addEventListener("dispose",gt),T.__depthDisposeCallback=gt}T.__boundDepthTexture=ct}if(I.depthTexture&&!T.__autoAllocateDepthBuffer)if(tt)for(let ct=0;ct<6;ct++)$e(T.__webglFramebuffer[ct],I,ct);else{const ct=I.texture.mipmaps;ct&&ct.length>0?$e(T.__webglFramebuffer[0],I,0):$e(T.__webglFramebuffer,I,0)}else if(tt){T.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)if(n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ct]),T.__webglDepthbuffer[ct]===void 0)T.__webglDepthbuffer[ct]=r.createRenderbuffer(),re(T.__webglDepthbuffer[ct],I,!1);else{const gt=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ct=T.__webglDepthbuffer[ct];r.bindRenderbuffer(r.RENDERBUFFER,Ct),r.framebufferRenderbuffer(r.FRAMEBUFFER,gt,r.RENDERBUFFER,Ct)}}else{const ct=I.texture.mipmaps;if(ct&&ct.length>0?n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),re(T.__webglDepthbuffer,I,!1);else{const gt=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ct=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Ct),r.framebufferRenderbuffer(r.FRAMEBUFFER,gt,r.RENDERBUFFER,Ct)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function ye(I,T,tt){const ct=a.get(I);T!==void 0&&zt(ct.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),tt!==void 0&&le(I)}function Pe(I){const T=I.texture,tt=a.get(I),ct=a.get(T);I.addEventListener("dispose",b);const gt=I.textures,Ct=I.isWebGLCubeRenderTarget===!0,Nt=gt.length>1;if(Nt||(ct.__webglTexture===void 0&&(ct.__webglTexture=r.createTexture()),ct.__version=T.version,f.memory.textures++),Ct){tt.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(T.mipmaps&&T.mipmaps.length>0){tt.__webglFramebuffer[_t]=[];for(let xt=0;xt<T.mipmaps.length;xt++)tt.__webglFramebuffer[_t][xt]=r.createFramebuffer()}else tt.__webglFramebuffer[_t]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){tt.__webglFramebuffer=[];for(let _t=0;_t<T.mipmaps.length;_t++)tt.__webglFramebuffer[_t]=r.createFramebuffer()}else tt.__webglFramebuffer=r.createFramebuffer();if(Nt)for(let _t=0,xt=gt.length;_t<xt;_t++){const Dt=a.get(gt[_t]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=r.createTexture(),f.memory.textures++)}if(I.samples>0&&cn(I)===!1){tt.__webglMultisampledFramebuffer=r.createFramebuffer(),tt.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let _t=0;_t<gt.length;_t++){const xt=gt[_t];tt.__webglColorRenderbuffer[_t]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,tt.__webglColorRenderbuffer[_t]);const Dt=c.convert(xt.format,xt.colorSpace),kt=c.convert(xt.type),It=C(xt.internalFormat,Dt,kt,xt.normalized,xt.colorSpace,I.isXRRenderTarget===!0),Ot=Ke(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ot,It,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,tt.__webglColorRenderbuffer[_t])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(tt.__webglDepthRenderbuffer=r.createRenderbuffer(),re(tt.__webglDepthRenderbuffer,I,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Ct){n.bindTexture(r.TEXTURE_CUBE_MAP,ct.__webglTexture),bt(r.TEXTURE_CUBE_MAP,T);for(let _t=0;_t<6;_t++)if(T.mipmaps&&T.mipmaps.length>0)for(let xt=0;xt<T.mipmaps.length;xt++)zt(tt.__webglFramebuffer[_t][xt],I,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,xt);else zt(tt.__webglFramebuffer[_t],I,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);x(T)&&N(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Nt){for(let _t=0,xt=gt.length;_t<xt;_t++){const Dt=gt[_t],kt=a.get(Dt);let It=r.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(It=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(It,kt.__webglTexture),bt(It,Dt),zt(tt.__webglFramebuffer,I,Dt,r.COLOR_ATTACHMENT0+_t,It,0),x(Dt)&&N(It)}n.unbindTexture()}else{let _t=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(_t=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(_t,ct.__webglTexture),bt(_t,T),T.mipmaps&&T.mipmaps.length>0)for(let xt=0;xt<T.mipmaps.length;xt++)zt(tt.__webglFramebuffer[xt],I,T,r.COLOR_ATTACHMENT0,_t,xt);else zt(tt.__webglFramebuffer,I,T,r.COLOR_ATTACHMENT0,_t,0);x(T)&&N(_t),n.unbindTexture()}I.depthBuffer&&le(I)}function ve(I){const T=I.textures;for(let tt=0,ct=T.length;tt<ct;tt++){const gt=T[tt];if(x(gt)){const Ct=H(I),Nt=a.get(gt).__webglTexture;n.bindTexture(Ct,Nt),N(Ct),n.unbindTexture()}}}const Ze=[],ln=[];function Dn(I){if(I.samples>0){if(cn(I)===!1){const T=I.textures,tt=I.width,ct=I.height;let gt=r.COLOR_BUFFER_BIT;const Ct=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Nt=a.get(I),_t=T.length>1;if(_t)for(let Dt=0;Dt<T.length;Dt++)n.bindFramebuffer(r.FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Dt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Nt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Dt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Nt.__webglMultisampledFramebuffer);const xt=I.texture.mipmaps;xt&&xt.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Nt.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Nt.__webglFramebuffer);for(let Dt=0;Dt<T.length;Dt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(gt|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(gt|=r.STENCIL_BUFFER_BIT)),_t){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Nt.__webglColorRenderbuffer[Dt]);const kt=a.get(T[Dt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,kt,0)}r.blitFramebuffer(0,0,tt,ct,0,0,tt,ct,gt,r.NEAREST),d===!0&&(Ze.length=0,ln.length=0,Ze.push(r.COLOR_ATTACHMENT0+Dt),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(Ze.push(Ct),ln.push(Ct),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ln)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ze))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),_t)for(let Dt=0;Dt<T.length;Dt++){n.bindFramebuffer(r.FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Dt,r.RENDERBUFFER,Nt.__webglColorRenderbuffer[Dt]);const kt=a.get(T[Dt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Nt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Dt,r.TEXTURE_2D,kt,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Nt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&d){const T=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function Ke(I){return Math.min(l.maxSamples,I.samples)}function cn(I){const T=a.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function q(I){const T=f.render.frame;_.get(I)!==T&&(_.set(I,T),I.update())}function ze(I,T){const tt=I.colorSpace,ct=I.format,gt=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||tt!==Tu&&tt!==_s&&(Ae.getTransfer(tt)===Fe?(ct!==Wi||gt!==yi)&&se("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ce("WebGLTextures: Unsupported texture color space:",tt)),T}function Le(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(p.width=I.naturalWidth||I.width,p.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(p.width=I.displayWidth,p.height=I.displayHeight):(p.width=I.width,p.height=I.height),p}this.allocateTextureUnit=B,this.resetTextureUnits=lt,this.getTextureUnits=Z,this.setTextureUnits=nt,this.setTexture2D=ft,this.setTexture2DArray=it,this.setTexture3D=dt,this.setTextureCube=D,this.rebindTextures=ye,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=Dn,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=zt,this.useMultisampledRTT=cn,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function lA(r,t){function n(a,l=_s){let c;const f=Ae.getTransfer(l);if(a===yi)return r.UNSIGNED_BYTE;if(a===Lp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===Np)return r.UNSIGNED_SHORT_5_5_5_1;if(a===ex)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===nx)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===$v)return r.BYTE;if(a===tx)return r.SHORT;if(a===xl)return r.UNSIGNED_SHORT;if(a===Up)return r.INT;if(a===oa)return r.UNSIGNED_INT;if(a===aa)return r.FLOAT;if(a===Xi)return r.HALF_FLOAT;if(a===ix)return r.ALPHA;if(a===ax)return r.RGB;if(a===Wi)return r.RGBA;if(a===Pa)return r.DEPTH_COMPONENT;if(a===Zs)return r.DEPTH_STENCIL;if(a===Op)return r.RED;if(a===Pp)return r.RED_INTEGER;if(a===Qs)return r.RG;if(a===zp)return r.RG_INTEGER;if(a===Ip)return r.RGBA_INTEGER;if(a===mu||a===gu||a===_u||a===vu)if(f===Fe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===mu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===gu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===_u)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===vu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===mu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===gu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===_u)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===vu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Zd||a===Kd||a===Qd||a===Jd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Zd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Kd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Qd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Jd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===jd||a===$d||a===tp||a===ep||a===np||a===yu||a===ip)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===jd||a===$d)return f===Fe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===tp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===ep)return c.COMPRESSED_R11_EAC;if(a===np)return c.COMPRESSED_SIGNED_R11_EAC;if(a===yu)return c.COMPRESSED_RG11_EAC;if(a===ip)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===ap||a===sp||a===rp||a===op||a===lp||a===cp||a===up||a===fp||a===hp||a===dp||a===pp||a===mp||a===gp||a===_p)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===ap)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===sp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===rp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===op)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===lp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===cp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===up)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===fp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===hp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===dp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===pp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===mp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===gp)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===_p)return f===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===vp||a===xp||a===Sp)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===vp)return f===Fe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===xp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===Sp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===Mp||a===yp||a===Eu||a===Ep)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===Mp)return c.COMPRESSED_RED_RGTC1_EXT;if(a===yp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Eu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===Ep)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Sl?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const cA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uA=`
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

}`;class fA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const a=new vx(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new Fn({vertexShader:cA,fragmentShader:uA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new kn(new io(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hA extends Ms{constructor(t,n){super();const a=this;let l=null,c=1,f=null,m="local-floor",d=1,p=null,_=null,v=null,g=null,M=null,E=null;const w=typeof XRWebGLBinding<"u",y=new fA,x={},N=n.getContextAttributes();let H=null,C=null;const z=[],O=[],L=new ne;let b=null,P=null;const k=new ci;k.viewport=new an;const Q=new ci;Q.viewport=new an;const K=[k,Q],lt=new xy;let Z=null,nt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let pt=z[$];return pt===void 0&&(pt=new ud,z[$]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function($){let pt=z[$];return pt===void 0&&(pt=new ud,z[$]=pt),pt.getGripSpace()},this.getHand=function($){let pt=z[$];return pt===void 0&&(pt=new ud,z[$]=pt),pt.getHandSpace()};function B($){const pt=O.indexOf($.inputSource);if(pt===-1)return;const At=z[pt];At!==void 0&&(At.update($.inputSource,$.frame,p||f),At.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){l.removeEventListener("select",B),l.removeEventListener("selectstart",B),l.removeEventListener("selectend",B),l.removeEventListener("squeeze",B),l.removeEventListener("squeezestart",B),l.removeEventListener("squeezeend",B),l.removeEventListener("end",V),l.removeEventListener("inputsourceschange",ft);for(let $=0;$<z.length;$++){const pt=O[$];pt!==null&&(O[$]=null,z[$].disconnect(pt))}Z=null,nt=null,y.reset();for(const $ in x)delete x[$];if(t.setRenderTarget(H),M=null,g=null,v=null,l=null,C=null,Rt.stop(),a.isPresenting=!1,t.setPixelRatio(b),t.setSize(L.width,L.height,!1),P!==null){const $=P.camera;$.fov=P.fov,$.zoom=P.zoom,$.updateProjectionMatrix(),P=null}a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){c=$,a.isPresenting===!0&&se("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){m=$,a.isPresenting===!0&&se("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function($){p=$},this.getBaseLayer=function(){return g!==null?g:M},this.getBinding=function(){return v===null&&w&&(v=new XRWebGLBinding(l,n)),v},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function($){if(l=$,l!==null){if(H=t.getRenderTarget(),l.addEventListener("select",B),l.addEventListener("selectstart",B),l.addEventListener("selectend",B),l.addEventListener("squeeze",B),l.addEventListener("squeezestart",B),l.addEventListener("squeezeend",B),l.addEventListener("end",V),l.addEventListener("inputsourceschange",ft),N.xrCompatible!==!0&&await n.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(L),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let At=null,$t=null,zt=null;N.depth&&(zt=N.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,At=N.stencil?Zs:Pa,$t=N.stencil?Sl:oa);const re={colorFormat:n.RGBA8,depthFormat:zt,scaleFactor:c};v=this.getBinding(),g=v.createProjectionLayer(re),l.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),C=new zi(g.textureWidth,g.textureHeight,{format:Wi,type:yi,depthTexture:new yl(g.textureWidth,g.textureHeight,$t,void 0,void 0,void 0,void 0,void 0,void 0,At),stencilBuffer:N.stencil,colorSpace:t.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}else{const At={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,n,At),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),C=new zi(M.framebufferWidth,M.framebufferHeight,{format:Wi,type:yi,colorSpace:t.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1,storeMultisampledDepthBuffer:M.ignoreDepthValues===!1,storeMultisampledStencilBuffer:M.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(d),p=null,f=await l.requestReferenceSpace(m),Rt.setContext(l),Rt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function ft($){for(let pt=0;pt<$.removed.length;pt++){const At=$.removed[pt],$t=O.indexOf(At);$t>=0&&(O[$t]=null,z[$t].disconnect(At))}for(let pt=0;pt<$.added.length;pt++){const At=$.added[pt];let $t=O.indexOf(At);if($t===-1){for(let re=0;re<z.length;re++)if(re>=O.length){O.push(At),$t=re;break}else if(O[re]===null){O[re]=At,$t=re;break}if($t===-1)break}const zt=z[$t];zt&&zt.connect(At)}}const it=new J,dt=new J;function D($,pt,At){it.setFromMatrixPosition(pt.matrixWorld),dt.setFromMatrixPosition(At.matrixWorld);const $t=it.distanceTo(dt),zt=pt.projectionMatrix.elements,re=At.projectionMatrix.elements,$e=zt[14]/(zt[10]-1),le=zt[14]/(zt[10]+1),ye=(zt[9]+1)/zt[5],Pe=(zt[9]-1)/zt[5],ve=(zt[8]-1)/zt[0],Ze=(re[8]+1)/re[0],ln=$e*ve,Dn=$e*Ze,Ke=$t/(-ve+Ze),cn=Ke*-ve;if(pt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(cn),$.translateZ(Ke),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),zt[10]===-1)$.projectionMatrix.copy(pt.projectionMatrix),$.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const q=$e+Ke,ze=le+Ke,Le=ln-cn,I=Dn+($t-cn),T=ye*le/ze*q,tt=Pe*le/ze*q;$.projectionMatrix.makePerspective(Le,I,T,tt,q,ze),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function et($,pt){pt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(pt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(l===null)return;let pt=$.near,At=$.far;y.texture!==null&&(y.depthNear>0&&(pt=y.depthNear),y.depthFar>0&&(At=y.depthFar)),lt.near=Q.near=k.near=pt,lt.far=Q.far=k.far=At,(Z!==lt.near||nt!==lt.far)&&(l.updateRenderState({depthNear:lt.near,depthFar:lt.far}),Z=lt.near,nt=lt.far),lt.layers.mask=$.layers.mask|6,k.layers.mask=lt.layers.mask&-5,Q.layers.mask=lt.layers.mask&-3;const $t=$.parent,zt=lt.cameras;et(lt,$t);for(let re=0;re<zt.length;re++)et(zt[re],$t);zt.length===2?D(lt,k,Q):lt.projectionMatrix.copy(k.projectionMatrix),P===null&&$.isPerspectiveCamera&&(P={camera:$,fov:$.fov,zoom:$.zoom}),vt($,lt,$t)};function vt($,pt,At){At===null?$.matrix.copy(pt.matrixWorld):($.matrix.copy(At.matrixWorld),$.matrix.invert(),$.matrix.multiply(pt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(pt.projectionMatrix),$.projectionMatrixInverse.copy(pt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=wu*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return lt},this.getFoveation=function(){if(!(g===null&&M===null))return d},this.setFoveation=function($){d=$,g!==null&&(g.fixedFoveation=$),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=$)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(lt)},this.getCameraTexture=function($){return x[$]};let wt=null;function bt($,pt){if(_=pt.getViewerPose(p||f),E=pt,_!==null){const At=_.views;M!==null&&(t.setRenderTargetFramebuffer(C,M.framebuffer),t.setRenderTarget(C));let $t=!1;At.length!==lt.cameras.length&&(lt.cameras.length=0,$t=!0);for(let le=0;le<At.length;le++){const ye=At[le];let Pe=null;if(M!==null)Pe=M.getViewport(ye);else{const Ze=v.getViewSubImage(g,ye);Pe=Ze.viewport,le===0&&(t.setRenderTargetTextures(C,Ze.colorTexture,Ze.depthStencilTexture),t.setRenderTarget(C))}let ve=K[le];ve===void 0&&(ve=new ci,ve.layers.enable(le),ve.viewport=new an,K[le]=ve),ve.matrix.fromArray(ye.transform.matrix),ve.matrix.decompose(ve.position,ve.quaternion,ve.scale),ve.projectionMatrix.fromArray(ye.projectionMatrix),ve.projectionMatrixInverse.copy(ve.projectionMatrix).invert(),ve.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),le===0&&(lt.matrix.copy(ve.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale)),$t===!0&&lt.cameras.push(ve)}const zt=l.enabledFeatures;if(zt&&zt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&w){v=a.getBinding();const le=v.getDepthInformation(At[0]);le&&le.isValid&&le.texture&&y.init(le,l.renderState)}if(zt&&zt.includes("camera-access")&&w){t.state.unbindTexture(),v=a.getBinding();for(let le=0;le<At.length;le++){const ye=At[le].camera;if(ye){let Pe=x[ye];Pe||(Pe=new vx,x[ye]=Pe);const ve=v.getCameraImage(ye);Pe.sourceTexture=ve}}}}for(let At=0;At<z.length;At++){const $t=O[At],zt=z[At];$t!==null&&zt!==void 0&&zt.update($t,pt,p||f)}wt&&wt($,pt),pt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:pt}),E=null}const Rt=new Ex;Rt.setAnimationLoop(bt),this.setAnimationLoop=function($){wt=$},this.dispose=function(){}}}const dA=new qe,Dx=new ue;Dx.set(-1,0,0,0,1,0,0,0,1);function pA(r,t){function n(y,x){y.matrixAutoUpdate===!0&&y.updateMatrix(),x.value.copy(y.matrix)}function a(y,x){x.color.getRGB(y.fogColor.value,xx(r)),x.isFog?(y.fogNear.value=x.near,y.fogFar.value=x.far):x.isFogExp2&&(y.fogDensity.value=x.density)}function l(y,x,N,H,C){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?c(y,x):x.isMeshLambertMaterial?(c(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(c(y,x),v(y,x)):x.isMeshPhongMaterial?(c(y,x),_(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(c(y,x),g(y,x),x.isMeshPhysicalMaterial&&M(y,x,C)):x.isMeshMatcapMaterial?(c(y,x),E(y,x)):x.isMeshDepthMaterial?c(y,x):x.isMeshDistanceMaterial?(c(y,x),w(y,x)):x.isMeshNormalMaterial?c(y,x):x.isLineBasicMaterial?(f(y,x),x.isLineDashedMaterial&&m(y,x)):x.isPointsMaterial?d(y,x,N,H):x.isSpriteMaterial?p(y,x):x.isShadowMaterial?(y.color.value.copy(x.color),y.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function c(y,x){y.opacity.value=x.opacity,x.color&&y.diffuse.value.copy(x.color),x.emissive&&y.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(y.map.value=x.map,n(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,n(x.alphaMap,y.alphaMapTransform)),x.bumpMap&&(y.bumpMap.value=x.bumpMap,n(x.bumpMap,y.bumpMapTransform),y.bumpScale.value=x.bumpScale,x.side===Yn&&(y.bumpScale.value*=-1)),x.normalMap&&(y.normalMap.value=x.normalMap,n(x.normalMap,y.normalMapTransform),y.normalScale.value.copy(x.normalScale),x.side===Yn&&y.normalScale.value.negate()),x.displacementMap&&(y.displacementMap.value=x.displacementMap,n(x.displacementMap,y.displacementMapTransform),y.displacementScale.value=x.displacementScale,y.displacementBias.value=x.displacementBias),x.emissiveMap&&(y.emissiveMap.value=x.emissiveMap,n(x.emissiveMap,y.emissiveMapTransform)),x.specularMap&&(y.specularMap.value=x.specularMap,n(x.specularMap,y.specularMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest);const N=t.get(x),H=N.envMap,C=N.envMapRotation;H&&(y.envMap.value=H,y.envMapRotation.value.setFromMatrix4(dA.makeRotationFromEuler(C)).transpose(),H.isCubeTexture&&H.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(Dx),y.reflectivity.value=x.reflectivity,y.ior.value=x.ior,y.refractionRatio.value=x.refractionRatio),x.lightMap&&(y.lightMap.value=x.lightMap,y.lightMapIntensity.value=x.lightMapIntensity,n(x.lightMap,y.lightMapTransform)),x.aoMap&&(y.aoMap.value=x.aoMap,y.aoMapIntensity.value=x.aoMapIntensity,n(x.aoMap,y.aoMapTransform))}function f(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,x.map&&(y.map.value=x.map,n(x.map,y.mapTransform))}function m(y,x){y.dashSize.value=x.dashSize,y.totalSize.value=x.dashSize+x.gapSize,y.scale.value=x.scale}function d(y,x,N,H){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.size.value=x.size*N,y.scale.value=H*.5,x.map&&(y.map.value=x.map,n(x.map,y.uvTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,n(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function p(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.rotation.value=x.rotation,x.map&&(y.map.value=x.map,n(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,n(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function _(y,x){y.specular.value.copy(x.specular),y.shininess.value=Math.max(x.shininess,1e-4)}function v(y,x){x.gradientMap&&(y.gradientMap.value=x.gradientMap)}function g(y,x){y.metalness.value=x.metalness,x.metalnessMap&&(y.metalnessMap.value=x.metalnessMap,n(x.metalnessMap,y.metalnessMapTransform)),y.roughness.value=x.roughness,x.roughnessMap&&(y.roughnessMap.value=x.roughnessMap,n(x.roughnessMap,y.roughnessMapTransform)),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)}function M(y,x,N){y.ior.value=x.ior,x.sheen>0&&(y.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),y.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(y.sheenColorMap.value=x.sheenColorMap,n(x.sheenColorMap,y.sheenColorMapTransform)),x.sheenRoughnessMap&&(y.sheenRoughnessMap.value=x.sheenRoughnessMap,n(x.sheenRoughnessMap,y.sheenRoughnessMapTransform))),x.clearcoat>0&&(y.clearcoat.value=x.clearcoat,y.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(y.clearcoatMap.value=x.clearcoatMap,n(x.clearcoatMap,y.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,n(x.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(y.clearcoatNormalMap.value=x.clearcoatNormalMap,n(x.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===Yn&&y.clearcoatNormalScale.value.negate())),x.dispersion>0&&(y.dispersion.value=x.dispersion),x.retroreflectivity>0&&(y.retroreflectivity.value=x.retroreflectivity),x.iridescence>0&&(y.iridescence.value=x.iridescence,y.iridescenceIOR.value=x.iridescenceIOR,y.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(y.iridescenceMap.value=x.iridescenceMap,n(x.iridescenceMap,y.iridescenceMapTransform)),x.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=x.iridescenceThicknessMap,n(x.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),x.transmission>0&&(y.transmission.value=x.transmission,y.transmissionSamplerMap.value=N.texture,y.transmissionSamplerSize.value.set(N.width,N.height),x.transmissionMap&&(y.transmissionMap.value=x.transmissionMap,n(x.transmissionMap,y.transmissionMapTransform)),y.thickness.value=x.thickness,x.thicknessMap&&(y.thicknessMap.value=x.thicknessMap,n(x.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=x.attenuationDistance,y.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(y.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(y.anisotropyMap.value=x.anisotropyMap,n(x.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=x.specularIntensity,y.specularColor.value.copy(x.specularColor),x.specularColorMap&&(y.specularColorMap.value=x.specularColorMap,n(x.specularColorMap,y.specularColorMapTransform)),x.specularIntensityMap&&(y.specularIntensityMap.value=x.specularIntensityMap,n(x.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,x){x.matcap&&(y.matcap.value=x.matcap)}function w(y,x){const N=t.get(x).light;y.referencePosition.value.setFromMatrixPosition(N.matrixWorld),y.nearDistance.value=N.shadow.camera.near,y.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:l}}function mA(r,t,n,a){let l={},c={},f=[];const m=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function d(C,z){const O=z.program;a.uniformBlockBinding(C,O)}function p(C,z){let O=l[C.id];O===void 0&&(y(C),O=_(C),l[C.id]=O,C.addEventListener("dispose",N));const L=z.program;a.updateUBOMapping(C,L);const b=t.render.frame;c[C.id]!==b&&(g(C),c[C.id]=b)}function _(C){const z=v();C.__bindingPointIndex=z;const O=r.createBuffer(),L=C.__size,b=C.usage;return r.bindBuffer(r.UNIFORM_BUFFER,O),r.bufferData(r.UNIFORM_BUFFER,L,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,z,O),O}function v(){for(let C=0;C<m;C++)if(f.indexOf(C)===-1)return f.push(C),C;return Ce("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(C){const z=l[C.id],O=C.uniforms,L=C.__cache;r.bindBuffer(r.UNIFORM_BUFFER,z);for(let b=0,P=O.length;b<P;b++){const k=O[b];if(Array.isArray(k))for(let Q=0,K=k.length;Q<K;Q++)M(k[Q],b,Q,L);else M(k,b,0,L)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(C,z,O,L){if(w(C,z,O,L)===!0){const b=C.__offset,P=C.value;if(Array.isArray(P)){let k=0;for(let Q=0;Q<P.length;Q++){const K=P[Q],lt=x(K);E(K,C.__data,k),typeof K!="number"&&typeof K!="boolean"&&!K.isMatrix3&&!ArrayBuffer.isView(K)&&(k+=lt.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(P,C.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,b,C.__data)}}function E(C,z,O){typeof C=="number"||typeof C=="boolean"?z[0]=C:C.isMatrix3?(z[0]=C.elements[0],z[1]=C.elements[1],z[2]=C.elements[2],z[3]=0,z[4]=C.elements[3],z[5]=C.elements[4],z[6]=C.elements[5],z[7]=0,z[8]=C.elements[6],z[9]=C.elements[7],z[10]=C.elements[8],z[11]=0):ArrayBuffer.isView(C)?z.set(new C.constructor(C.buffer,C.byteOffset,z.length)):C.toArray(z,O)}function w(C,z,O,L){const b=C.value,P=z+"_"+O;if(L[P]===void 0)return typeof b=="number"||typeof b=="boolean"?L[P]=b:ArrayBuffer.isView(b)?L[P]=b.slice():L[P]=b.clone(),!0;{const k=L[P];if(typeof b=="number"||typeof b=="boolean"){if(k!==b)return L[P]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(k.equals(b)===!1)return k.copy(b),!0}}return!1}function y(C){const z=C.uniforms;let O=0;const L=16;for(let P=0,k=z.length;P<k;P++){const Q=Array.isArray(z[P])?z[P]:[z[P]];for(let K=0,lt=Q.length;K<lt;K++){const Z=Q[K],nt=Array.isArray(Z.value)?Z.value:[Z.value];for(let B=0,V=nt.length;B<V;B++){const ft=nt[B],it=x(ft),dt=O%L,D=dt%it.boundary,et=dt+D;O+=D,et!==0&&L-et<it.storage&&(O+=L-et),Z.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=O,O+=it.storage}}}const b=O%L;return b>0&&(O+=L-b),C.__size=O,C.__cache={},this}function x(C){const z={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(z.boundary=4,z.storage=4):C.isVector2?(z.boundary=8,z.storage=8):C.isVector3||C.isColor?(z.boundary=16,z.storage=12):C.isVector4?(z.boundary=16,z.storage=16):C.isMatrix3?(z.boundary=48,z.storage=48):C.isMatrix4?(z.boundary=64,z.storage=64):C.isTexture?se("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(C)?(z.boundary=16,z.storage=C.byteLength):se("WebGLRenderer: Unsupported uniform value type.",C),z}function N(C){const z=C.target;z.removeEventListener("dispose",N);const O=f.indexOf(z.__bindingPointIndex);f.splice(O,1),r.deleteBuffer(l[z.id]),delete l[z.id],delete c[z.id]}function H(){for(const C in l)r.deleteBuffer(l[C]);f=[],l={},c={}}return{bind:d,update:p,dispose:H}}const gA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ta=null;function _A(){return ta===null&&(ta=new mx(gA,16,16,Qs,Xi),ta.name="DFG_LUT",ta.minFilter=Wn,ta.magFilter=Wn,ta.wrapS=La,ta.wrapT=La,ta.generateMipmaps=!1,ta.needsUpdate=!0),ta}class vA{constructor(t={}){const{canvas:n=b1(),context:a=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:m=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:p=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:g=!1,outputBufferType:M=yi}=t;this.isWebGLRenderer=!0;let E;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=a.getContextAttributes().alpha}else E=f;const w=M,y=new Set([Ip,zp,Pp]),x=new Set([yi,oa,xl,Sl,Lp,Np]),N=new Uint32Array(4),H=new Int32Array(4),C=new J;let z=null,O=null;const L=[],b=[];let P=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ra,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const k=this;let Q=!1,K=null,lt=null,Z=null,nt=null;this._outputColorSpace=li;let B=0,V=0,ft=null,it=-1,dt=null;const D=new an,et=new an;let vt=null;const wt=new ae(0);let bt=0,Rt=n.width,$=n.height,pt=1,At=null,$t=null;const zt=new an(0,0,Rt,$),re=new an(0,0,Rt,$);let $e=!1;const le=new Vp;let ye=!1,Pe=!1;const ve=new qe,Ze=new J,ln=new an,Dn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function cn(){return ft===null?pt:1}let q=a;function ze(A,W){return n.getContext(A,W)}let Le,I,T,tt,ct,gt,Ct,Nt,_t,xt,Dt,kt,It,Ot,jt,te,oe,Y,Ut,Mt,Lt,Ht,Tt;try{const A={alpha:!0,depth:l,stencil:c,antialias:m,premultipliedAlpha:d,preserveDrawingBuffer:p,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Cp}`),n.addEventListener("webglcontextlost",Ge,!1),n.addEventListener("webglcontextrestored",Re,!1),n.addEventListener("webglcontextcreationerror",$n,!1),q===null){const W="webgl2";if(q=ze(W,A),q===null)throw ze(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Jt()}catch(A){throw n.removeEventListener("webglcontextlost",Ge,!1),n.removeEventListener("webglcontextrestored",Re,!1),n.removeEventListener("webglcontextcreationerror",$n,!1),Ce("WebGLRenderer: "+A.message),A}function Jt(){Le=new _2(q),Le.init(),Lt=new lA(q,Le),I=new o2(q,Le,t,Lt),T=new rA(q,Le),I.reversedDepthBuffer&&g&&T.buffers.depth.setReversed(!0),lt=q.createFramebuffer(),Z=q.createFramebuffer(),nt=q.createFramebuffer(),tt=new S2(q),ct=new Yb,gt=new oA(q,Le,T,ct,I,Lt,tt),Ct=new g2(k),Nt=new yy(q),Ht=new s2(q,Nt),_t=new v2(q,Nt,tt,Ht),xt=new y2(q,_t,Nt,Ht,tt),Y=new M2(q,I,gt),jt=new l2(ct),Dt=new Xb(k,Ct,Le,I,Ht,jt),kt=new pA(k,ct),It=new Zb,Ot=new tA(Le),oe=new a2(k,Ct,T,xt,E,d),te=new sA(k,xt,I),Tt=new mA(q,tt,I,T),Ut=new r2(q,Le,tt),Mt=new x2(q,Le,tt),tt.programs=Dt.programs,k.capabilities=I,k.extensions=Le,k.properties=ct,k.renderLists=It,k.shadowMap=te,k.state=T,k.info=tt}w!==yi&&(P=new T2(w,n.width,n.height,m,l,c));const Yt=new hA(k,q);this.xr=Yt,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const A=Le.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Le.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return pt},this.setPixelRatio=function(A){A!==void 0&&(pt=A,this.setSize(Rt,$,!1))},this.getSize=function(A){return A.set(Rt,$)},this.setSize=function(A,W,ht=!0){if(Yt.isPresenting){se("WebGLRenderer: Can't change size while VR device is presenting.");return}Rt=A,$=W,n.width=Math.floor(A*pt),n.height=Math.floor(W*pt),ht===!0&&(n.style.width=A+"px",n.style.height=W+"px"),P!==null&&P.setSize(n.width,n.height),this.setViewport(0,0,A,W)},this.getDrawingBufferSize=function(A){return A.set(Rt*pt,$*pt).floor()},this.setDrawingBufferSize=function(A,W,ht){Rt=A,$=W,pt=ht,n.width=Math.floor(A*ht),n.height=Math.floor(W*ht),this.setViewport(0,0,A,W)},this.setEffects=function(A){if(w===yi){Ce("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let W=0;W<A.length;W++)if(A[W].isOutputPass===!0){se("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(D)},this.getViewport=function(A){return A.copy(zt)},this.setViewport=function(A,W,ht,at){A.isVector4?zt.set(A.x,A.y,A.z,A.w):zt.set(A,W,ht,at),T.viewport(D.copy(zt).multiplyScalar(pt).round())},this.getScissor=function(A){return A.copy(re)},this.setScissor=function(A,W,ht,at){A.isVector4?re.set(A.x,A.y,A.z,A.w):re.set(A,W,ht,at),T.scissor(et.copy(re).multiplyScalar(pt).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(A){T.setScissorTest($e=A)},this.setOpaqueSort=function(A){At=A},this.setTransparentSort=function(A){$t=A},this.getClearColor=function(A){return A.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor(...arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha(...arguments)},this.clear=function(A=!0,W=!0,ht=!0){let at=0;if(A){let st=!1;if(ft!==null){const Bt=ft.texture.format;st=y.has(Bt)}if(st){const Bt=ft.texture.type,Wt=x.has(Bt),Pt=oe.getClearColor(),Gt=oe.getClearAlpha(),Vt=Pt.r,fe=Pt.g,_e=Pt.b;Wt?(N[0]=Vt,N[1]=fe,N[2]=_e,N[3]=Gt,q.clearBufferuiv(q.COLOR,0,N)):(H[0]=Vt,H[1]=fe,H[2]=_e,H[3]=Gt,q.clearBufferiv(q.COLOR,0,H))}else at|=q.COLOR_BUFFER_BIT}W&&(at|=q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ht&&(at|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),at!==0&&q.clear(at)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),K=A},this.dispose=function(){n.removeEventListener("webglcontextlost",Ge,!1),n.removeEventListener("webglcontextrestored",Re,!1),n.removeEventListener("webglcontextcreationerror",$n,!1),oe.dispose(),It.dispose(),Ot.dispose(),ct.dispose(),Ct.dispose(),xt.dispose(),Ht.dispose(),Tt.dispose(),Dt.dispose(),Yt.dispose(),Yt.removeEventListener("sessionstart",mn),Yt.removeEventListener("sessionend",On),ti.stop()};function Ge(A){A.preventDefault(),Ru("WebGLRenderer: Context Lost."),Q=!0}function Re(){Ru("WebGLRenderer: Context Restored."),Q=!1;const A=tt.autoReset,W=te.enabled,ht=te.autoUpdate,at=te.needsUpdate,st=te.type;Jt(),tt.autoReset=A,te.enabled=W,te.autoUpdate=ht,te.needsUpdate=at,te.type=st}function $n(A){Ce("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ui(A){const W=A.target;W.removeEventListener("dispose",ui),lo(W)}function lo(A){co(A),ct.remove(A)}function co(A){const W=ct.get(A).programs;W!==void 0&&(W.forEach(function(ht){Dt.releaseProgram(ht)}),A.isShaderMaterial&&Dt.releaseShaderCache(A))}this.renderBufferDirect=function(A,W,ht,at,st,Bt){W===null&&(W=Dn);const Wt=st.isMesh&&st.matrixWorld.determinantAffine()<0,Pt=Fa(A,W,ht,at,st);T.setMaterial(at,Wt);let Gt=ht.index,Vt=1;if(at.wireframe===!0){if(Gt=_t.getWireframeAttribute(ht),Gt===void 0)return;Vt=2}const fe=ht.drawRange,_e=ht.attributes.position;let qt=fe.start*Vt,we=(fe.start+fe.count)*Vt;Bt!==null&&(qt=Math.max(qt,Bt.start*Vt),we=Math.min(we,(Bt.start+Bt.count)*Vt)),Gt!==null?(qt=Math.max(qt,0),we=Math.min(we,Gt.count)):_e!=null&&(qt=Math.max(qt,0),we=Math.min(we,_e.count));const tn=we-qt;if(tn<0||tn===1/0)return;Ht.setup(st,at,Pt,ht,Gt);let Qe,pe=Ut;if(Gt!==null&&(Qe=Nt.get(Gt),pe=Mt,pe.setIndex(Qe)),st.isMesh)at.wireframe===!0?(T.setLineWidth(at.wireframeLinewidth*cn()),pe.setMode(q.LINES)):pe.setMode(q.TRIANGLES);else if(st.isLine){let _n=at.linewidth;_n===void 0&&(_n=1),T.setLineWidth(_n*cn()),st.isLineSegments?pe.setMode(q.LINES):st.isLineLoop?pe.setMode(q.LINE_LOOP):pe.setMode(q.LINE_STRIP)}else st.isPoints?pe.setMode(q.POINTS):st.isSprite&&pe.setMode(q.TRIANGLES);if(st.isBatchedMesh)if(Le.get("WEBGL_multi_draw"))pe.renderMultiDraw(st._multiDrawStarts,st._multiDrawCounts,st._multiDrawCount);else{const _n=st._multiDrawStarts,Xt=st._multiDrawCounts,Tn=st._multiDrawCount,me=Gt?Nt.get(Gt).bytesPerElement:1,Zn=ct.get(at).currentProgram.getUniforms();for(let fi=0;fi<Tn;fi++)Zn.setValue(q,"_gl_DrawID",fi),pe.render(_n[fi]/me,Xt[fi])}else if(st.isInstancedMesh)pe.renderInstances(qt,tn,st.count);else if(ht.isInstancedBufferGeometry){const _n=ht._maxInstanceCount!==void 0?ht._maxInstanceCount:1/0,Xt=Math.min(ht.instanceCount,_n);pe.renderInstances(qt,tn,Xt)}else pe.render(qt,tn)};function uo(A,W,ht,at){K!==null&&A.isNodeMaterial&&K.setObject(at,A),ye===!0&&jt.setState(A,ht,!1),A.transparent===!0&&A.side===Ua&&A.forceSinglePass===!1?(A.side=Yn,A.needsUpdate=!0,Ba(A,W,at),A.side=xs,A.needsUpdate=!0,Ba(A,W,at),A.side=Ua):Ba(A,W,at)}this.compile=function(A,W,ht=null){ht===null&&(ht=A),K!==null&&K.renderStart(A,W,ht),O=Ot.get(ht),O.init(W),b.push(O),ht.traverseVisible(function(st){st.isLight&&st.layers.test(W.layers)&&(O.pushLight(st),st.castShadow&&O.pushShadow(st))}),A!==ht&&A.traverseVisible(function(st){st.isLight&&st.layers.test(W.layers)&&(O.pushLight(st),st.castShadow&&O.pushShadow(st))}),O.setupLights(),K!==null&&K.updateLights(O.state.lightsArray),Pe=this.localClippingEnabled,ye=jt.init(this.clippingPlanes,Pe),ye===!0&&jt.setGlobalState(this.clippingPlanes,W),K!==null&&te.render(O.state.shadowsArray,ht,W);const at=new Set;return A.traverse(function(st){if(!(st.isMesh||st.isPoints||st.isLine||st.isSprite))return;const Bt=st.material;if(Bt)if(Array.isArray(Bt))for(let Wt=0;Wt<Bt.length;Wt++){const Pt=Bt[Wt];uo(Pt,ht,W,st),at.add(Pt)}else uo(Bt,ht,W,st),at.add(Bt)}),O=b.pop(),K!==null&&K.renderEnd(),at},this.compileAsync=function(A,W,ht=null){const at=this.compile(A,W,ht);return new Promise(st=>{function Bt(){if(at.forEach(function(Wt){const Gt=ct.get(Wt).currentProgram;(Gt===void 0||Gt.isReady())&&at.delete(Wt)}),at.size===0){st(A);return}setTimeout(Bt,10)}Le.get("KHR_parallel_shader_compile")!==null?Bt():setTimeout(Bt,10)})};let js=null;function Yi(A){js&&js(A)}function mn(){ti.stop()}function On(){ti.start()}const ti=new Ex;ti.setAnimationLoop(Yi),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(A){js=A,Yt.setAnimationLoop(A),A===null?ti.stop():ti.start()},Yt.addEventListener("sessionstart",mn),Yt.addEventListener("sessionend",On),this.render=function(A,W){if(W!==void 0&&W.isCamera!==!0){Ce("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Q===!0)return;K!==null&&K.renderStart(A,W);const ht=Yt.enabled===!0&&Yt.isPresenting===!0,at=P!==null&&(ft===null||ht)&&P.begin(k,ft);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Yt.enabled===!0&&Yt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(Yt.cameraAutoUpdate===!0&&Yt.updateCamera(W),W=Yt.getCamera()),A.isScene===!0&&A.onBeforeRender(k,A,W,ft),O=Ot.get(A,b.length),O.init(W),O.state.textureUnits=gt.getTextureUnits(),b.push(O),ve.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),le.setFromProjectionMatrix(ve,sa,W.reversedDepth),Pe=this.localClippingEnabled,ye=jt.init(this.clippingPlanes,Pe),z=It.get(A,L.length),z.init(),L.push(z),Yt.enabled===!0&&Yt.isPresenting===!0){const Wt=k.xr.getDepthSensingMesh();Wt!==null&&Es(Wt,W,-1/0,k.sortObjects)}Es(A,W,0,k.sortObjects),z.finish(),K!==null&&K.updateLights(O.state.lightsArray),k.sortObjects===!0&&z.sort(At,$t),Ke=Yt.enabled===!1||Yt.isPresenting===!1||Yt.hasDepthSensing()===!1,Ke&&oe.addToRenderList(z,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ye===!0&&jt.beginShadows();const st=O.state.shadowsArray;if(te.render(st,A,W),ye===!0&&jt.endShadows(),(at&&P.hasRenderPass())===!1){const Wt=z.opaque,Pt=z.transmissive;if(O.setupLights(),W.isArrayCamera){const Gt=W.cameras;if(Pt.length>0)for(let Vt=0,fe=Gt.length;Vt<fe;Vt++){const _e=Gt[Vt];Rl(Wt,Pt,A,_e)}Ke&&oe.render(A);for(let Vt=0,fe=Gt.length;Vt<fe;Vt++){const _e=Gt[Vt];Al(z,A,_e,_e.viewport)}}else Pt.length>0&&Rl(Wt,Pt,A,W),Ke&&oe.render(A),Al(z,A,W)}ft!==null&&V===0&&(gt.updateMultisampleRenderTarget(ft),gt.updateRenderTargetMipmap(ft)),at&&P.end(k),A.isScene===!0&&A.onAfterRender(k,A,W),Ht.resetDefaultState(),it=-1,dt=null,b.pop(),b.length>0?(O=b[b.length-1],gt.setTextureUnits(O.state.textureUnits),ye===!0&&jt.setGlobalState(k.clippingPlanes,O.state.camera)):O=null,L.pop(),L.length>0?z=L[L.length-1]:z=null,K!==null&&K.renderEnd()};function Es(A,W,ht,at){if(A.visible===!1)return;if(A.layers.test(W.layers)){if(A.isGroup)ht=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(W);else if(A.isLightProbeGrid)O.pushLightProbeGrid(A);else if(A.isLight)O.pushLight(A),A.castShadow&&O.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(le)){at&&ln.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ve);const Wt=xt.update(A),Pt=A.material;Pt.visible&&z.push(A,Wt,Pt,ht,ln.z,null,W)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(le))){const Wt=xt.update(A),Pt=A.material;if(at&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ln.copy(A.boundingSphere.center)):(Wt.boundingSphere===null&&Wt.computeBoundingSphere(),ln.copy(Wt.boundingSphere.center)),ln.applyMatrix4(A.matrixWorld).applyMatrix4(ve)),Array.isArray(Pt)){const Gt=Wt.groups;for(let Vt=0,fe=Gt.length;Vt<fe;Vt++){const _e=Gt[Vt],qt=Pt[_e.materialIndex];qt&&qt.visible&&z.push(A,Wt,qt,ht,ln.z,_e,W)}}else Pt.visible&&z.push(A,Wt,Pt,ht,ln.z,null,W)}}const Bt=A.children;for(let Wt=0,Pt=Bt.length;Wt<Pt;Wt++)Es(Bt[Wt],W,ht,at)}function Al(A,W,ht,at){const{opaque:st,transmissive:Bt,transparent:Wt}=A;O.setupLightsView(ht),ye===!0&&jt.setGlobalState(k.clippingPlanes,ht),at&&T.viewport(D.copy(at)),st.length>0&&Ts(st,W,ht),Bt.length>0&&Ts(Bt,W,ht),Wt.length>0&&Ts(Wt,W,ht),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function Rl(A,W,ht,at){if((ht.isScene===!0?ht.overrideMaterial:null)!==null)return;if(O.state.transmissionRenderTarget[at.id]===void 0){const qt=Le.has("EXT_color_buffer_half_float")||Le.has("EXT_color_buffer_float");O.state.transmissionRenderTarget[at.id]=new zi(1,1,{generateMipmaps:!0,type:qt?Xi:yi,minFilter:qs,samples:Math.max(4,I.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ae.workingColorSpace})}const Bt=O.state.transmissionRenderTarget[at.id],Wt=at.viewport||D;Bt.setSize(Wt.z*k.transmissionResolutionScale,Wt.w*k.transmissionResolutionScale);const Pt=k.getRenderTarget(),Gt=k.getActiveCubeFace(),Vt=k.getActiveMipmapLevel();k.setRenderTarget(Bt),k.getClearColor(wt),bt=k.getClearAlpha(),bt<1&&k.setClearColor(16777215,.5),k.clear(),Ke&&oe.render(ht);const fe=k.toneMapping;k.toneMapping=ra;const _e=at.viewport;if(at.viewport!==void 0&&(at.viewport=void 0),O.setupLightsView(at),ye===!0&&jt.setGlobalState(k.clippingPlanes,at),Ts(A,ht,at),gt.updateMultisampleRenderTarget(Bt),gt.updateRenderTargetMipmap(Bt),Le.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let we=0,tn=W.length;we<tn;we++){const Qe=W[we],{object:pe,geometry:_n,material:Xt,group:Tn}=Qe;if(Xt.side===Ua&&pe.layers.test(at.layers)){const me=Xt.side;Xt.side=Yn,Xt.needsUpdate=!0,Ia(pe,ht,at,_n,Xt,Tn),Xt.side=me,Xt.needsUpdate=!0,qt=!0}}qt===!0&&(gt.updateMultisampleRenderTarget(Bt),gt.updateRenderTargetMipmap(Bt))}k.setRenderTarget(Pt,Gt,Vt),k.setClearColor(wt,bt),_e!==void 0&&(at.viewport=_e),k.toneMapping=fe}function Ts(A,W,ht){const at=W.isScene===!0?W.overrideMaterial:null;for(let st=0,Bt=A.length;st<Bt;st++){const Wt=A[st],{object:Pt,geometry:Gt,group:Vt}=Wt;let fe=Wt.material;fe.allowOverride===!0&&at!==null&&(fe=at),Pt.layers.test(ht.layers)&&Ia(Pt,W,ht,Gt,fe,Vt)}}function Ia(A,W,ht,at,st,Bt){K!==null&&st.isNodeMaterial&&K.setObject(A,st),A.onBeforeRender(k,W,ht,at,st,Bt),A.modelViewMatrix.multiplyMatrices(ht.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),st.onBeforeRender(k,W,ht,at,A,Bt),st.transparent===!0&&st.side===Ua&&st.forceSinglePass===!1?(st.side=Yn,st.needsUpdate=!0,k.renderBufferDirect(ht,W,at,st,A,Bt),st.side=xs,st.needsUpdate=!0,k.renderBufferDirect(ht,W,at,st,A,Bt),st.side=Ua):k.renderBufferDirect(ht,W,at,st,A,Bt),A.onAfterRender(k,W,ht,at,st,Bt)}function Ba(A,W,ht){W.isScene!==!0&&(W=Dn);const at=ct.get(A),st=O.state.lights,Bt=O.state.shadowsArray,Wt=st.state.version,Pt=Dt.getParameters(A,st.state,Bt,W,ht,O.state.lightProbeGridArray),Gt=Dt.getProgramCacheKey(Pt);let Vt=at.programs;at.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?W.environment:null,at.fog=W.fog;const fe=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;at.envMap=Ct.get(A.envMap||at.environment,fe),at.envMapRotation=at.environment!==null&&A.envMap===null?W.environmentRotation:A.envMapRotation,Vt===void 0&&(A.addEventListener("dispose",ui),Vt=new Map,at.programs=Vt);let _e=Vt.get(Gt);if(_e!==void 0){if(at.currentProgram===_e&&at.lightsStateVersion===Wt)return ca(A,Pt),_e}else Pt.uniforms=Dt.getUniforms(A),K!==null&&A.isNodeMaterial&&K.build(A,ht,Pt),A.onBeforeCompile(Pt,k),_e=Dt.acquireProgram(Pt,Gt),Vt.set(Gt,_e),at.uniforms=Pt.uniforms;const qt=at.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(qt.clippingPlanes=jt.uniform),ca(A,Pt),at.needsLights=wl(A),at.lightsStateVersion=Wt,at.needsLights&&(qt.ambientLightColor.value=st.state.ambient,qt.lightProbe.value=st.state.probe,qt.sunLights.value=st.state.sun,qt.sunLightShadows.value=st.state.sunShadow,qt.directionalLights.value=st.state.directional,qt.directionalLightShadows.value=st.state.directionalShadow,qt.spotLights.value=st.state.spot,qt.spotLightShadows.value=st.state.spotShadow,qt.rectAreaLights.value=st.state.rectArea,qt.ltc_1.value=st.state.rectAreaLTC1,qt.ltc_2.value=st.state.rectAreaLTC2,qt.pointLights.value=st.state.point,qt.pointLightShadows.value=st.state.pointShadow,qt.hemisphereLights.value=st.state.hemi,qt.sunShadowMatrix.value=st.state.sunShadowMatrix,qt.sunShadowCascade.value=st.state.sunShadowCascade,qt.directionalShadowMatrix.value=st.state.directionalShadowMatrix,qt.spotLightMatrix.value=st.state.spotLightMatrix,qt.spotLightMap.value=st.state.spotLightMap,qt.pointShadowMatrix.value=st.state.pointShadowMatrix),at.lightProbeGrid=O.state.lightProbeGridArray.length>0,at.currentProgram=_e,at.uniformsList=null,_e}function la(A){if(A.uniformsList===null){const W=A.currentProgram.getUniforms();A.uniformsList=Su.seqWithValue(W.seq,A.uniforms)}return A.uniformsList}function ca(A,W){const ht=ct.get(A);ht.outputColorSpace=W.outputColorSpace,ht.batching=W.batching,ht.batchingColor=W.batchingColor,ht.instancing=W.instancing,ht.instancingColor=W.instancingColor,ht.instancingMorph=W.instancingMorph,ht.skinning=W.skinning,ht.morphTargets=W.morphTargets,ht.morphNormals=W.morphNormals,ht.morphColors=W.morphColors,ht.morphTargetsCount=W.morphTargetsCount,ht.numClippingPlanes=W.numClippingPlanes,ht.numIntersection=W.numClipIntersection,ht.vertexAlphas=W.vertexAlphas,ht.vertexTangents=W.vertexTangents,ht.toneMapping=W.toneMapping}function bs(A,W){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;C.setFromMatrixPosition(W.matrixWorld);for(let ht=0,at=A.length;ht<at;ht++){const st=A[ht];if(st.texture!==null&&st.boundingBox.containsPoint(C))return st}return null}function Fa(A,W,ht,at,st){W.isScene!==!0&&(W=Dn),gt.resetTextureUnits();const Bt=W.fog,Wt=at.isMeshStandardMaterial||at.isMeshLambertMaterial||at.isMeshPhongMaterial?W.environment:null,Pt=ft===null?k.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:Ae.workingColorSpace,Gt=at.isMeshStandardMaterial||at.isMeshLambertMaterial&&!at.envMap||at.isMeshPhongMaterial&&!at.envMap,Vt=Ct.get(at.envMap||Wt,Gt),fe=at.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,_e=!!ht.attributes.tangent&&(!!at.normalMap||at.anisotropy>0),qt=!!ht.morphAttributes.position,we=!!ht.morphAttributes.normal,tn=!!ht.morphAttributes.color;let Qe=ra;at.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(Qe=k.toneMapping);const pe=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,_n=pe!==void 0?pe.length:0,Xt=ct.get(at),Tn=O.state.lights;if(ye===!0&&(Pe===!0||A!==dt)){const Ve=A===dt&&at.id===it;jt.setState(at,A,Ve)}let me=!1;at.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==Tn.state.version||Xt.outputColorSpace!==Pt||st.isBatchedMesh&&Xt.batching===!1||!st.isBatchedMesh&&Xt.batching===!0||st.isBatchedMesh&&Xt.batchingColor===!0&&st._colorsTexture===null||st.isBatchedMesh&&Xt.batchingColor===!1&&st._colorsTexture!==null||st.isInstancedMesh&&Xt.instancing===!1||!st.isInstancedMesh&&Xt.instancing===!0||st.isSkinnedMesh&&Xt.skinning===!1||!st.isSkinnedMesh&&Xt.skinning===!0||st.isInstancedMesh&&Xt.instancingColor===!0&&st.instanceColor===null||st.isInstancedMesh&&Xt.instancingColor===!1&&st.instanceColor!==null||st.isInstancedMesh&&Xt.instancingMorph===!0&&st.morphTexture===null||st.isInstancedMesh&&Xt.instancingMorph===!1&&st.morphTexture!==null||Xt.envMap!==Vt||at.fog===!0&&Xt.fog!==Bt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==jt.numPlanes||Xt.numIntersection!==jt.numIntersection)||Xt.vertexAlphas!==fe||Xt.vertexTangents!==_e||Xt.morphTargets!==qt||Xt.morphNormals!==we||Xt.morphColors!==tn||Xt.toneMapping!==Qe||Xt.morphTargetsCount!==_n||!!Xt.lightProbeGrid!=O.state.lightProbeGridArray.length>0)&&(me=!0):(me=!0,Xt.__version=at.version);let Zn=Xt.currentProgram;me===!0&&(Zn=Ba(at,W,st),K&&at.isNodeMaterial&&K.onUpdateProgram(at,Zn,Xt));let fi=!1,Kn=!1,Ha=!1;const Ne=Zn.getUniforms(),sn=Xt.uniforms;if(T.useProgram(Zn.program)&&(fi=!0,Kn=!0,Ha=!0),at.id!==it&&(it=at.id,Kn=!0),Xt.needsLights){const Ve=bs(O.state.lightProbeGridArray,st);Xt.lightProbeGrid!==Ve&&(Xt.lightProbeGrid=Ve,Kn=!0)}if(fi||dt!==A){T.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ne.setValue(q,"projectionMatrix",A.projectionMatrix),Ne.setValue(q,"viewMatrix",A.matrixWorldInverse);const qi=Ne.map.cameraPosition;qi!==void 0&&qi.setValue(q,Ze.setFromMatrixPosition(A.matrixWorld)),I.logarithmicDepthBuffer&&Ne.setValue(q,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(at.isMeshPhongMaterial||at.isMeshToonMaterial||at.isMeshLambertMaterial||at.isMeshBasicMaterial||at.isMeshStandardMaterial||at.isShaderMaterial)&&Ne.setValue(q,"isOrthographic",A.isOrthographicCamera===!0),dt!==A&&(dt=A,Kn=!0,Ha=!0)}if(Xt.needsLights&&(Tn.state.sunShadowMap.length>0&&Ne.setValue(q,"sunShadowMap",Tn.state.sunShadowMap,gt),Tn.state.directionalShadowMap.length>0&&Ne.setValue(q,"directionalShadowMap",Tn.state.directionalShadowMap,gt),Tn.state.spotShadowMap.length>0&&Ne.setValue(q,"spotShadowMap",Tn.state.spotShadowMap,gt),Tn.state.pointShadowMap.length>0&&Ne.setValue(q,"pointShadowMap",Tn.state.pointShadowMap,gt)),st.isSkinnedMesh){Ne.setOptional(q,st,"bindMatrix"),Ne.setOptional(q,st,"bindMatrixInverse");const Ve=st.skeleton;Ve&&(Ve.boneTexture===null&&Ve.computeBoneTexture(),Ne.setValue(q,"boneTexture",Ve.boneTexture,gt))}st.isBatchedMesh&&(Ne.setOptional(q,st,"batchingTexture"),Ne.setValue(q,"batchingTexture",st._matricesTexture,gt),Ne.setOptional(q,st,"batchingIdTexture"),Ne.setValue(q,"batchingIdTexture",st._indirectTexture,gt),Ne.setOptional(q,st,"batchingColorTexture"),st._colorsTexture!==null&&Ne.setValue(q,"batchingColorTexture",st._colorsTexture,gt));const Ei=ht.morphAttributes;if((Ei.position!==void 0||Ei.normal!==void 0||Ei.color!==void 0)&&Y.update(st,ht,Zn),(Kn||Xt.receiveShadow!==st.receiveShadow)&&(Xt.receiveShadow=st.receiveShadow,Ne.setValue(q,"receiveShadow",st.receiveShadow)),(at.isMeshStandardMaterial||at.isMeshLambertMaterial||at.isMeshPhongMaterial)&&at.envMap===null&&W.environment!==null&&(sn.envMapIntensity.value=W.environmentIntensity),sn.dfgLUT!==void 0&&(sn.dfgLUT.value=_A()),Kn){if(Ne.setValue(q,"toneMappingExposure",k.toneMappingExposure),Xt.needsLights&&gn(sn,Ha),Bt&&at.fog===!0&&kt.refreshFogUniforms(sn,Bt),kt.refreshMaterialUniforms(sn,at,pt,$,O.state.transmissionRenderTarget[A.id]),Xt.needsLights&&Xt.lightProbeGrid){const Ve=Xt.lightProbeGrid;sn.probesSH.value=Ve.texture,sn.probesMin.value.copy(Ve.boundingBox.min),sn.probesMax.value.copy(Ve.boundingBox.max),sn.probesResolution.value.copy(Ve.resolution)}Su.upload(q,la(Xt),sn,gt)}if(at.isShaderMaterial&&at.uniformsNeedUpdate===!0&&(Su.upload(q,la(Xt),sn,gt),at.uniformsNeedUpdate=!1),at.isSpriteMaterial&&Ne.setValue(q,"center",st.center),Ne.setValue(q,"modelViewMatrix",st.modelViewMatrix),Ne.setValue(q,"normalMatrix",st.normalMatrix),Ne.setValue(q,"modelMatrix",st.matrixWorld),at.uniformsGroups!==void 0){const Ve=at.uniformsGroups;for(let qi=0,Ii=Ve.length;qi<Ii;qi++){const Ti=Ve[qi];Tt.update(Ti,Zn),Tt.bind(Ti,Zn)}}return Zn}function gn(A,W){A.ambientLightColor.needsUpdate=W,A.lightProbe.needsUpdate=W,A.sunLights.needsUpdate=W,A.sunLightShadows.needsUpdate=W,A.directionalLights.needsUpdate=W,A.directionalLightShadows.needsUpdate=W,A.pointLights.needsUpdate=W,A.pointLightShadows.needsUpdate=W,A.spotLights.needsUpdate=W,A.spotLightShadows.needsUpdate=W,A.rectAreaLights.needsUpdate=W,A.hemisphereLights.needsUpdate=W}function wl(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return ft},this.setRenderTargetTextures=function(A,W,ht){const at=ct.get(A);at.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,at.__autoAllocateDepthBuffer===!1&&(at.__useRenderToTexture=!1),ct.get(A.texture).__webglTexture=W,ct.get(A.depthTexture).__webglTexture=at.__autoAllocateDepthBuffer?void 0:ht,at.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,W){const ht=ct.get(A);ht.__webglFramebuffer=W,ht.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(A,W=0,ht=0){ft=A,B=W,V=ht;let at=null,st=!1,Bt=!1;if(A){const Pt=ct.get(A);if(Pt.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(q.FRAMEBUFFER,Pt.__webglFramebuffer),D.copy(A.viewport),et.copy(A.scissor),vt=A.scissorTest,T.viewport(D),T.scissor(et),T.setScissorTest(vt),it=-1;return}else if(Pt.__webglFramebuffer===void 0)gt.setupRenderTarget(A);else if(Pt.__hasExternalTextures)gt.rebindTextures(A,ct.get(A.texture).__webglTexture,ct.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const fe=A.depthTexture;if(Pt.__boundDepthTexture!==fe){if(fe!==null&&ct.has(fe)&&(A.width!==fe.image.width||A.height!==fe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");gt.setupDepthRenderbuffer(A)}}const Gt=A.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(Bt=!0);const Vt=ct.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Vt[W])?at=Vt[W][ht]:at=Vt[W],st=!0):A.samples>0&&gt.useMultisampledRTT(A)===!1?at=ct.get(A).__webglMultisampledFramebuffer:Array.isArray(Vt)?at=Vt[ht]:at=Vt,D.copy(A.viewport),et.copy(A.scissor),vt=A.scissorTest}else D.copy(zt).multiplyScalar(pt).floor(),et.copy(re).multiplyScalar(pt).floor(),vt=$e;if(ht!==0&&(at=lt),T.bindFramebuffer(q.FRAMEBUFFER,at)&&T.drawBuffers(A,at),T.viewport(D),T.scissor(et),T.setScissorTest(vt),st){const Pt=ct.get(A.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+W,Pt.__webglTexture,ht)}else if(Bt){const Pt=W;for(let Gt=0;Gt<A.textures.length;Gt++){const Vt=ct.get(A.textures[Gt]);q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0+Gt,Vt.__webglTexture,ht,Pt)}}else if(A!==null&&ht!==0){const Pt=ct.get(A.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Pt.__webglTexture,ht)}it=-1};function fo(A){const W=ct.get(A);return(W.__readFormat!==A.format||W.__readType!==A.type)&&(W.__readFormat=A.format,W.__readType=A.type,W.__formatReadable=I.textureFormatReadable(A.format),W.__typeReadable=I.textureTypeReadable(A.type)),W}this.readRenderTargetPixels=function(A,W,ht,at,st,Bt,Wt,Pt=0){if(!(A&&A.isWebGLRenderTarget)){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=ct.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Wt!==void 0&&(Gt=Gt[Wt]),Gt){T.bindFramebuffer(q.FRAMEBUFFER,Gt);try{const Vt=A.textures[Pt],fe=Vt.format,_e=Vt.type;A.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Pt);const qt=fo(Vt);if(qt.__formatReadable===!1){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(qt.__typeReadable===!1){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=A.width-at&&ht>=0&&ht<=A.height-st&&q.readPixels(W,ht,at,st,Lt.convert(fe),Lt.convert(_e),Bt)}finally{const Vt=ft!==null?ct.get(ft).__webglFramebuffer:null;T.bindFramebuffer(q.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(A,W,ht,at,st,Bt,Wt,Pt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Gt=ct.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Wt!==void 0&&(Gt=Gt[Wt]),Gt)if(W>=0&&W<=A.width-at&&ht>=0&&ht<=A.height-st){T.bindFramebuffer(q.FRAMEBUFFER,Gt);const Vt=A.textures[Pt],fe=Vt.format,_e=Vt.type;A.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Pt);const qt=fo(Vt);if(qt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(qt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const we=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,we),q.bufferData(q.PIXEL_PACK_BUFFER,Bt.byteLength,q.STREAM_READ),q.readPixels(W,ht,at,st,Lt.convert(fe),Lt.convert(_e),0),q.bindBuffer(q.PIXEL_PACK_BUFFER,null);const tn=ft!==null?ct.get(ft).__webglFramebuffer:null;T.bindFramebuffer(q.FRAMEBUFFER,tn);const Qe=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await A1(q,Qe,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,we),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,Bt),q.bindBuffer(q.PIXEL_PACK_BUFFER,null),q.deleteBuffer(we),q.deleteSync(Qe),Bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,W=null,ht=0){const at=Math.pow(2,-ht),st=Math.floor(A.image.width*at),Bt=Math.floor(A.image.height*at),Wt=W!==null?W.x:0,Pt=W!==null?W.y:0;gt.setTexture2D(A,0),q.copyTexSubImage2D(q.TEXTURE_2D,ht,0,0,Wt,Pt,st,Bt),T.unbindTexture()},this.copyTextureToTexture=function(A,W,ht=null,at=null,st=0,Bt=0){let Wt,Pt,Gt,Vt,fe,_e,qt,we,tn;const Qe=A.isCompressedTexture?A.mipmaps[Bt]:A.image;if(ht!==null)Wt=ht.max.x-ht.min.x,Pt=ht.max.y-ht.min.y,Gt=ht.isBox3?ht.max.z-ht.min.z:1,Vt=ht.min.x,fe=ht.min.y,_e=ht.isBox3?ht.min.z:0;else{const sn=Math.pow(2,-st);Wt=Math.floor(Qe.width*sn),Pt=Math.floor(Qe.height*sn),A.isDataArrayTexture?Gt=Qe.depth:A.isData3DTexture?Gt=Math.floor(Qe.depth*sn):Gt=1,Vt=0,fe=0,_e=0}at!==null?(qt=at.x,we=at.y,tn=at.z):(qt=0,we=0,tn=0);const pe=Lt.convert(W.format),_n=Lt.convert(W.type);let Xt;W.isData3DTexture?(gt.setTexture3D(W,0),Xt=q.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(gt.setTexture2DArray(W,0),Xt=q.TEXTURE_2D_ARRAY):(gt.setTexture2D(W,0),Xt=q.TEXTURE_2D),T.activeTexture(q.TEXTURE0),T.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,W.flipY),T.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),T.pixelStorei(q.UNPACK_ALIGNMENT,W.unpackAlignment);const Tn=T.getParameter(q.UNPACK_ROW_LENGTH),me=T.getParameter(q.UNPACK_IMAGE_HEIGHT),Zn=T.getParameter(q.UNPACK_SKIP_PIXELS),fi=T.getParameter(q.UNPACK_SKIP_ROWS),Kn=T.getParameter(q.UNPACK_SKIP_IMAGES);T.pixelStorei(q.UNPACK_ROW_LENGTH,Qe.width),T.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Qe.height),T.pixelStorei(q.UNPACK_SKIP_PIXELS,Vt),T.pixelStorei(q.UNPACK_SKIP_ROWS,fe),T.pixelStorei(q.UNPACK_SKIP_IMAGES,_e);const Ha=A.isDataArrayTexture||A.isData3DTexture,Ne=W.isDataArrayTexture||W.isData3DTexture;if(A.isDepthTexture){const sn=ct.get(A),Ei=ct.get(W),Ve=ct.get(sn.__renderTarget),qi=ct.get(Ei.__renderTarget);T.bindFramebuffer(q.READ_FRAMEBUFFER,Ve.__webglFramebuffer),T.bindFramebuffer(q.DRAW_FRAMEBUFFER,qi.__webglFramebuffer);for(let Ii=0;Ii<Gt;Ii++)Ha&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,ct.get(A).__webglTexture,st,_e+Ii),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,ct.get(W).__webglTexture,Bt,tn+Ii)),q.blitFramebuffer(Vt,fe,Wt,Pt,qt,we,Wt,Pt,q.DEPTH_BUFFER_BIT,q.NEAREST);T.bindFramebuffer(q.READ_FRAMEBUFFER,null),T.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(st!==0||A.isRenderTargetTexture||ct.has(A)){const sn=ct.get(A),Ei=ct.get(W);T.bindFramebuffer(q.READ_FRAMEBUFFER,Z),T.bindFramebuffer(q.DRAW_FRAMEBUFFER,nt);for(let Ve=0;Ve<Gt;Ve++)Ha?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,sn.__webglTexture,st,_e+Ve):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,sn.__webglTexture,st),Ne?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Ei.__webglTexture,Bt,tn+Ve):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Ei.__webglTexture,Bt),st!==0?q.blitFramebuffer(Vt,fe,Wt,Pt,qt,we,Wt,Pt,q.COLOR_BUFFER_BIT,q.NEAREST):Ne?q.copyTexSubImage3D(Xt,Bt,qt,we,tn+Ve,Vt,fe,Wt,Pt):q.copyTexSubImage2D(Xt,Bt,qt,we,Vt,fe,Wt,Pt);T.bindFramebuffer(q.READ_FRAMEBUFFER,null),T.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Ne?A.isDataTexture||A.isData3DTexture?q.texSubImage3D(Xt,Bt,qt,we,tn,Wt,Pt,Gt,pe,_n,Qe.data):W.isCompressedArrayTexture?q.compressedTexSubImage3D(Xt,Bt,qt,we,tn,Wt,Pt,Gt,pe,Qe.data):q.texSubImage3D(Xt,Bt,qt,we,tn,Wt,Pt,Gt,pe,_n,Qe):A.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,Bt,qt,we,Wt,Pt,pe,_n,Qe.data):A.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,Bt,qt,we,Qe.width,Qe.height,pe,Qe.data):q.texSubImage2D(q.TEXTURE_2D,Bt,qt,we,Wt,Pt,pe,_n,Qe);T.pixelStorei(q.UNPACK_ROW_LENGTH,Tn),T.pixelStorei(q.UNPACK_IMAGE_HEIGHT,me),T.pixelStorei(q.UNPACK_SKIP_PIXELS,Zn),T.pixelStorei(q.UNPACK_SKIP_ROWS,fi),T.pixelStorei(q.UNPACK_SKIP_IMAGES,Kn),Bt===0&&W.generateMipmaps&&q.generateMipmap(Xt),T.unbindTexture()},this.initRenderTarget=function(A){ct.get(A).__webglFramebuffer===void 0&&gt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?gt.setTextureCube(A,0):A.isData3DTexture?gt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?gt.setTexture2DArray(A,0):gt.setTexture2D(A,0),T.unbindTexture()},this.resetState=function(){B=0,V=0,ft=null,T.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Ae._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ae._getUnpackColorSpace()}}const Fv={type:"change"},qp={type:"start"},Ux={type:"end"},hu=new Iu,Hv=new ea,xA=Math.cos(70*C1.DEG2RAD),An=new J,oi=2*Math.PI,He={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Od=1e-6;class SA extends Sy{constructor(t,n=null){super(t,n),this.state=He.NONE,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$r.ROTATE,MIDDLE:$r.DOLLY,RIGHT:$r.PAN},this.touches={ONE:Qr.ROTATE,TWO:Qr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new J,this._lastQuaternion=new Ss,this._lastTargetPosition=new J,this._quat=new Ss().setFromUnitVectors(t.up,new J(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new mv,this._sphericalDelta=new mv,this._scale=1,this._panOffset=new J,this._rotateStart=new ne,this._rotateEnd=new ne,this._rotateDelta=new ne,this._panStart=new ne,this._panEnd=new ne,this._panDelta=new ne,this._dollyStart=new ne,this._dollyEnd=new ne,this._dollyDelta=new ne,this._dollyDirection=new J,this._mouse=new ne,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=yA.bind(this),this._onPointerDown=MA.bind(this),this._onPointerUp=EA.bind(this),this._onContextMenu=DA.bind(this),this._onMouseWheel=AA.bind(this),this._onKeyDown=RA.bind(this),this._onTouchStart=wA.bind(this),this._onTouchMove=CA.bind(this),this._onMouseDown=TA.bind(this),this._onMouseMove=bA.bind(this),this._interceptControlDown=UA.bind(this),this._interceptControlUp=LA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=He.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Fv),this.update(),this.state=He.NONE}pan(t,n){this._pan(t,n),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const n=this.object.position;An.copy(n).sub(this.target),An.applyQuaternion(this._quat),this._spherical.setFromVector3(An),this.autoRotate&&this.state===He.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let a=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(a)&&isFinite(l)&&(a<-Math.PI?a+=oi:a>Math.PI&&(a-=oi),l<-Math.PI?l+=oi:l>Math.PI&&(l-=oi),a<=l?this._spherical.theta=Math.max(a,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(a+l)/2?Math.max(a,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(An.setFromSpherical(this._spherical),An.applyQuaternion(this._quatInverse),n.copy(this.target).add(An),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const m=An.length();f=this._clampDistance(m*this._scale);const d=m-f;this.object.position.addScaledVector(this._dollyDirection,d),this.object.updateMatrixWorld(),c=!!d}else if(this.object.isOrthographicCamera){const m=new J(this._mouse.x,this._mouse.y,0);m.unproject(this.object);const d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=d!==this.object.zoom;const p=new J(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(m),this.object.updateMatrixWorld(),f=An.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(hu.origin.copy(this.object.position),hu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(hu.direction))<xA?this.object.lookAt(this.target):(Hv.setFromNormalAndCoplanarPoint(this.object.up,this.target),hu.intersectPlane(Hv,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Od||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Od||this._lastTargetPosition.distanceToSquared(this.target)>Od?(this.dispatchEvent(Fv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?oi/60*this.autoRotateSpeed*t:oi/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){An.setFromMatrixColumn(n,0),An.multiplyScalar(-t),this._panOffset.add(An)}_panUp(t,n){this.screenSpacePanning===!0?An.setFromMatrixColumn(n,1):(An.setFromMatrixColumn(n,0),An.crossVectors(this.object.up,An)),An.multiplyScalar(t),this._panOffset.add(An)}_pan(t,n){const a=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;An.copy(l).sub(this.target);let c=An.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/a.clientHeight,this.object.matrix),this._panUp(2*n*c/a.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/a.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/a.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const a=this.domElement.getBoundingClientRect(),l=t-a.left,c=n-a.top,f=a.width,m=a.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/m)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(oi*this._rotateDelta.x/n.clientHeight),this._rotateUp(oi*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),a=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);this._rotateStart.set(a,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),a=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);this._panStart.set(a,l)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),a=t.pageX-n.x,l=t.pageY-n.y,c=Math.sqrt(a*a+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const a=this._getSecondPointerPosition(t),l=.5*(t.pageX+a.x),c=.5*(t.pageY+a.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(oi*this._rotateDelta.x/n.clientHeight),this._rotateUp(oi*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),a=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);this._panEnd.set(a,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),a=t.pageX-n.x,l=t.pageY-n.y,c=Math.sqrt(a*a+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(t.pageX+n.x)*.5,m=(t.pageY+n.y)*.5;this._updateZoomParameters(f,m)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new ne,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,a={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:a.deltaY*=16;break;case 2:a.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(a.deltaY*=10),a}}function MA(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function yA(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function EA(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ux),this.state=He.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function TA(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case $r.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=He.DOLLY;break;case $r.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=He.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=He.ROTATE}break;case $r.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=He.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=He.PAN}break;default:this.state=He.NONE}this.state!==He.NONE&&this.dispatchEvent(qp)}function bA(r){switch(this.state){case He.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case He.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case He.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function AA(r){this.enabled===!1||this.enableZoom===!1||this.state!==He.NONE||(r.preventDefault(),this.dispatchEvent(qp),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Ux))}function RA(r){this.enabled!==!1&&this._handleKeyDown(r)}function wA(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Qr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=He.TOUCH_ROTATE;break;case Qr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=He.TOUCH_PAN;break;default:this.state=He.NONE}break;case 2:switch(this.touches.TWO){case Qr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=He.TOUCH_DOLLY_PAN;break;case Qr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=He.TOUCH_DOLLY_ROTATE;break;default:this.state=He.NONE}break;default:this.state=He.NONE}this.state!==He.NONE&&this.dispatchEvent(qp)}function CA(r){switch(this._trackPointer(r),this.state){case He.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case He.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case He.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case He.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=He.NONE}}function DA(r){this.enabled!==!1&&r.preventDefault()}function UA(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function LA(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Gu extends kn{constructor(t,n={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const a=this,l=n.color!==void 0?new ae(n.color):new ae(8355711),c=n.textureWidth||512,f=n.textureHeight||512,m=n.clipBias||0,d=n.shader||Gu.ReflectorShader,p=n.multisample!==void 0?n.multisample:4,_=new ea,v=new J,g=new J,M=new J,E=new qe,w=new J(0,0,-1),y=new an,x=new J,N=new J,H=new an,C=new qe,z=new zi(c,f,{samples:p,type:Xi}),O=new Fn({name:d.name!==void 0?d.name:"unspecified",uniforms:Sx.clone(d.uniforms),fragmentShader:d.fragmentShader,vertexShader:d.vertexShader});O.uniforms.tDiffuse.value=z.texture,O.uniforms.color.value=l,O.uniforms.textureMatrix.value=C,this.material=O,this.onBeforeRender=function(L,b,P){const k=this.getReflectionCamera(P);if(g.setFromMatrixPosition(a.matrixWorld),M.setFromMatrixPosition(P.matrixWorld),E.extractRotation(a.matrixWorld),v.set(0,0,1),v.applyMatrix4(E),x.subVectors(g,M),x.dot(v)>0===!0&&this.forceUpdate===!1)return;x.reflect(v).negate(),x.add(g),E.extractRotation(P.matrixWorld),w.set(0,0,-1),w.applyMatrix4(E),w.add(M),N.subVectors(g,w),N.reflect(v).negate(),N.add(g),k.position.copy(x),k.up.set(0,1,0),k.up.applyMatrix4(E),k.up.reflect(v),k.lookAt(N),k.far=P.far,k.updateMatrixWorld(),k.projectionMatrix.copy(P.projectionMatrix),C.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),C.multiply(k.projectionMatrix),C.multiply(k.matrixWorldInverse),C.multiply(a.matrixWorld),_.setFromNormalAndCoplanarPoint(v,g),_.applyMatrix4(k.matrixWorldInverse),y.set(_.normal.x,_.normal.y,_.normal.z,_.constant);const K=k.projectionMatrix;k.isOrthographicCamera?(H.x=(Math.sign(y.x)+K.elements[8])/K.elements[0],H.y=(Math.sign(y.y)+K.elements[9])/K.elements[5],H.z=-P.far,H.w=1):(H.x=(Math.sign(y.x)+K.elements[8])/K.elements[0],H.y=(Math.sign(y.y)+K.elements[9])/K.elements[5],H.z=-1,H.w=(1+K.elements[10])/K.elements[14]),y.multiplyScalar(2/y.dot(H)),K.elements[2]=y.x,K.elements[6]=y.y,k.isOrthographicCamera?(K.elements[10]=y.z-m,K.elements[14]=y.w-1):(K.elements[10]=y.z+1-m,K.elements[14]=y.w),a.visible=!1;const lt=L.getRenderTarget(),Z=L.xr.enabled,nt=L.shadowMap.autoUpdate;L.xr.enabled=!1,L.shadowMap.autoUpdate=!1,L.setRenderTarget(z),L.state.buffers.depth.setMask(!0),L.autoClear===!1&&L.clear(),L.render(b,k),L.xr.enabled=Z,L.shadowMap.autoUpdate=nt,L.setRenderTarget(lt);const B=P.viewport;B!==void 0&&L.state.viewport(B),a.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return z},this.dispose=function(){z.dispose(),a.material.dispose()},this.getReflectionCamera=function(L){let b=this._reflectionCameras.get(L);return b===void 0&&(b=L.clone(),this._reflectionCameras.set(L,b)),b}}}Gu.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const Kt={half:7,tSpawn:{x0:-6.8,x1:6.8,z0:-6.8,z1:-4.4,y:.9},aSite:{x0:-6.8,x1:-2.4,z0:-4.4,z1:.6},bSite:{x0:2.4,x1:6.8,z0:-4.4,z1:.6},mid:{x0:-2.3,x1:2.3,z0:-4.4,z1:2.6},ctSpawn:{x0:-5.4,x1:5.4,z0:2.6,z1:6.8},sewer:{x0:-.7,x1:.7,z0:-4.2,z1:2.4}},ms={a:{x:-4.5,z:-1.6,w:2.6,d:2.6},b:{x:4.6,z:-.35,w:2.2,d:1.7}},U={asphalt:[.15,.16,.18],concrete:[.46,.46,.45],concreteDark:[.27,.27,.27],concreteWall:[.5,.5,.49],concreteWorn:[.4,.4,.39],plinth:[.19,.19,.2],plinthEdge:[.27,.27,.28],drain:[.13,.13,.14],grate:[.31,.24,.18],steel:[.42,.44,.46],steelDark:[.24,.26,.28],steelLight:[.58,.6,.62],brass:[.52,.44,.24],rust:[.45,.26,.15],rustDark:[.3,.18,.11],iron:[.19,.2,.21],corrugated:[.36,.38,.39],corrugatedDark:[.26,.28,.29],containerBlue:[.16,.31,.45],containerRed:[.44,.19,.16],containerGreen:[.18,.35,.26],containerGrey:[.33,.34,.35],containerYellow:[.46,.38,.15],wood:[.43,.33,.22],woodLight:[.54,.43,.29],woodDark:[.3,.23,.16],plank:[.38,.3,.2],cardboard:[.46,.38,.27],cardboardDark:[.32,.26,.18],barrel:[.15,.33,.5],barrelYellow:[.55,.45,.15],tyre:[.12,.12,.13],plastic:[.6,.42,.12],sack:[.47,.43,.33],wire:[.08,.08,.09],truckBody:[.36,.38,.4],truckCab:[.3,.33,.36],vanBody:[.42,.44,.47],vanPanel:[.13,.19,.3],glassDark:[.1,.14,.19],graffitiBlue:[.16,.32,.52],graffitiRed:[.52,.17,.16],graffitiYellow:[.6,.52,.16],graffitiWhite:[.72,.72,.7],sprayMark:[.66,.2,.18],badge:[.2,.3,.5],lampWarm:[1,.78,.42],lampSodium:[1,.7,.32],fluorescent:[.78,.88,1],emergency:[.86,.92,1],policeRed:[1,.15,.13],policeBlue:[.2,.35,1],backRoomRed:[1,.2,.18]};function En(r,t){return[Math.max(0,Math.min(1,r[0]*t)),Math.max(0,Math.min(1,r[1]*t)),Math.max(0,Math.min(1,r[2]*t))]}const je=1/Math.sqrt(3);function Pd(r){return r<=.04045?r/12.92:Math.pow((r+.055)/1.055,2.4)}function qr(r,t,n,a,l,c,f,m,d,p,_,v,g,M,E,w,y,x,N){r.positions.push(t[0],t[1],t[2],n[0],n[1],n[2],a[0],a[1],a[2],l[0],l[1],l[2]);for(let H=0;H<4;H++)r.normals.push(c[0],c[1],c[2]);r.uvs.push(f[0],f[1],m[0],m[1],d[0],d[1],p[0],p[1]);for(let H=0;H<4;H++)r.colors.push(_[0],_[1],_[2]);r.oPositions.push(v[0],v[1],v[2],g[0],g[1],g[2],M[0],M[1],M[2],E[0],E[1],E[2]),r.oNormals.push(w[0],w[1],w[2],y[0],y[1],y[2],x[0],x[1],x[2],N[0],N[1],N[2]);for(let H=0;H<4;H++)r.oColors.push(_[0]*.25,_[1]*.25,_[2]*.25)}function F(r,t,n,a,l=.016,c){const f=c??new Set,[m,d,p]=[Math.min(t[0],n[0]),Math.min(t[1],n[1]),Math.min(t[2],n[2])],[_,v,g]=[Math.max(t[0],n[0]),Math.max(t[1],n[1]),Math.max(t[2],n[2])],M=[Pd(a[0]),Pd(a[1]),Pd(a[2])],E=Math.max(l,.005),w=[m-E*je,d-E*je,p-E*je],y=[_+E*je,d-E*je,p-E*je],x=[_+E*je,v+E*je,p-E*je],N=[m-E*je,v+E*je,p-E*je],H=[m-E*je,d-E*je,g+E*je],C=[_+E*je,d-E*je,g+E*je],z=[_+E*je,v+E*je,g+E*je],O=[m-E*je,v+E*je,g+E*je],L=(b,P,k)=>[b*je,P*je,k*je];f.has("+y")||qr(r,[m,v,p],[m,v,g],[_,v,g],[_,v,p],[0,1,0],[m,p],[m,g],[_,g],[_,p],M,N,O,z,x,L(-1,1,-1),L(-1,1,1),L(1,1,1),L(1,1,-1)),f.has("-y")||qr(r,[m,d,g],[m,d,p],[_,d,p],[_,d,g],[0,-1,0],[m,g],[m,p],[_,p],[_,g],M,H,w,y,C,L(-1,-1,1),L(-1,-1,-1),L(1,-1,-1),L(1,-1,1)),f.has("+x")||qr(r,[_,d,g],[_,d,p],[_,v,p],[_,v,g],[1,0,0],[g,d],[p,d],[p,v],[g,v],M,C,y,x,z,L(1,-1,1),L(1,-1,-1),L(1,1,-1),L(1,1,1)),f.has("-x")||qr(r,[m,d,p],[m,d,g],[m,v,g],[m,v,p],[-1,0,0],[p,d],[g,d],[g,v],[p,v],M,w,H,O,N,L(-1,-1,-1),L(-1,-1,1),L(-1,1,1),L(-1,1,-1)),f.has("+z")||qr(r,[m,d,g],[_,d,g],[_,v,g],[m,v,g],[0,0,1],[m,d],[_,d],[_,v],[m,v],M,H,C,z,O,L(-1,-1,1),L(1,-1,1),L(1,1,1),L(-1,1,1)),f.has("-z")||qr(r,[_,d,p],[m,d,p],[m,v,p],[_,v,p],[0,0,-1],[_,d],[m,d],[m,v],[_,v],M,y,w,N,x,L(1,-1,-1),L(-1,-1,-1),L(-1,1,-1),L(1,1,-1))}function Mi(r,t,n,a,l=0){F(r,t,n,a,l,new Set(["-y","+x","-x","+z","-z"]))}function Gv(r){const t=new Nn;t.setAttribute("position",new on(r.positions,3)),t.setAttribute("normal",new on(r.normals,3)),t.setAttribute("uv",new on(r.uvs,2)),t.setAttribute("color",new on(r.colors,3));const n=r.positions.length/12,a=new Uint32Array(n*6);for(let l=0;l<n;l++){const c=l*4,f=l*6;a[f]=c,a[f+1]=c+1,a[f+2]=c+2,a[f+3]=c,a[f+4]=c+2,a[f+5]=c+3}return t.setIndex(new Xn(a,1)),t.computeBoundingSphere(),t}function NA(r){const t=new Nn;t.setAttribute("position",new on(r.oPositions,3)),t.setAttribute("normal",new on(r.oNormals,3)),t.setAttribute("color",new on(r.oColors,3));const n=r.oPositions.length/12,a=new Uint32Array(n*6);for(let l=0;l<n;l++){const c=l*4,f=l*6;a[f]=c,a[f+1]=c+1,a[f+2]=c+2,a[f+3]=c,a[f+4]=c+2,a[f+5]=c+3}return t.setIndex(new Xn(a,1)),t.computeBoundingSphere(),t}function OA(){const r={positions:[],normals:[],uvs:[],colors:[],oPositions:[],oNormals:[],oColors:[]},t={positions:[],normals:[],uvs:[],colors:[],oPositions:[],oNormals:[],oColors:[]},n=Kt.half,a=[];F(r,[-n-.3,-.62,-n-.3],[n+.3,-.18,n+.3],U.plinth,.02),F(r,[-n-.14,-.18,-n-.14],[n+.14,0,n+.14],U.plinthEdge,.014),F(r,[-n-.31,-.5,-n-.31],[n+.31,-.44,n+.31],U.plinthEdge,.008),F(r,[-1.5,-.52,n+.28],[1.5,-.26,n+.36],U.steelDark,.01),F(r,[-1.38,-.46,n+.35],[.2,-.32,n+.39],U.brass,.006),F(r,[.36,-.44,n+.35],[1.38,-.34,n+.39],U.steelLight,.006);const l=Kt.sewer;F(t,[-n,-.06,-n],[l.x0,.012,n],U.asphalt,0),F(t,[l.x1,-.06,-n],[n,.012,n],U.asphalt,0),F(t,[l.x0,-.06,-n],[l.x1,.012,l.z0],U.asphalt,0),F(t,[l.x0,-.06,l.z1],[l.x1,.012,n],U.asphalt,0);const c=(d,p,_,v,g,M)=>{F(r,[d,0,p],[_,g,v],M,.01)};c(Kt.aSite.x0,Kt.aSite.z0,Kt.aSite.x1,Kt.aSite.z1,.08,U.concreteWorn),c(Kt.bSite.x0,Kt.bSite.z0,Kt.bSite.x1,Kt.bSite.z1,.08,U.concreteWorn),c(Kt.ctSpawn.x0,Kt.ctSpawn.z0,Kt.ctSpawn.x1,Kt.ctSpawn.z1,.1,U.concrete),c(Kt.tSpawn.x0,Kt.tSpawn.z0,Kt.tSpawn.x1,Kt.tSpawn.z1,Kt.tSpawn.y,U.concreteDark);for(let d=0;d<9;d++){const p=d/9,_=Kt.tSpawn.y*(1-p);F(r,[-2.1,0,-4.4+d*.42],[2.1,_,-4+d*.42],U.concreteDark,.01)}for(let d=0;d<9;d++){const p=d/9,_=Kt.tSpawn.y*(1-p);F(r,[2.1,0,-4.4+d*.42],[2.35,_+.1,-4+d*.42],U.concrete,.008),F(r,[-2.35,0,-4.4+d*.42],[-2.1,_+.1,-4+d*.42],U.concrete,.008)}const f=(d,p,_,v,g)=>{const E=g+.014;Mi(r,[d-_/2,g,p-v/2],[d+_/2,E,p-v/2+.12],U.graffitiWhite,0),Mi(r,[d-_/2,g,p+v/2-.12],[d+_/2,E,p+v/2],U.graffitiWhite,0),Mi(r,[d-_/2,g,p-v/2],[d-_/2+.12,E,p+v/2],U.graffitiWhite,0),Mi(r,[d+_/2-.12,g,p-v/2],[d+_/2,E,p+v/2],U.graffitiWhite,0),Mi(r,[d-.5,g,p-.07],[d-.16,E,p+.07],U.graffitiWhite,0),Mi(r,[d+.16,g,p-.07],[d+.5,E,p+.07],U.graffitiWhite,0)};f(ms.a.x,ms.a.z,ms.a.w,ms.a.d,.128),f(ms.b.x,ms.b.z,ms.b.w,ms.b.d,.098);for(let d=0;d<8;d++){const p=-6.2+d*1.6;Mi(r,[p,.014,1.5],[p+.8,.024,1.62],U.graffitiYellow,0)}for(let d=0;d<4;d++){const p=3.9+d*.42;Mi(r,[-.9,.014,p],[.9,.024,p+.24],U.graffitiWhite,0)}for(let d=0;d<4;d++){const p=-4.6+d*2.2;Mi(r,[p,.104,4],[p+.08,.114,6],U.graffitiWhite,0)}Mi(r,[Kt.mid.x0+.15,.004,Kt.mid.z0],[Kt.mid.x0+.75,.03,Kt.mid.z1-.2],U.drain,0);for(let d=0;d<16;d++){const p=Kt.mid.z0+.1+d*.42;if(p>Kt.mid.z1-.4)break;Mi(r,[Kt.mid.x0+.2,.032,p],[Kt.mid.x0+.7,.046,p+.3],U.grate,0)}Mi(r,[Kt.aSite.x0,.004,-4.3],[Kt.aSite.x0+.3,.03,.4],U.drain,0),Mi(r,[Kt.bSite.x1-.3,.004,-4.3],[Kt.bSite.x1,.03,.4],U.drain,0);const m=[[-1.3,1.2,1.3,.9],[1.6,-2.4,.9,1.4],[-4.4,.2,1.6,1],[4.2,.4,1.2,.8],[.2,2,1.1,.7],[-3,-3.2,1,.8],[5.4,-2.6,1.3,1],[-.4,-1,.8,.6],[2.6,4.4,1.2,.9],[-5.6,2.2,.9,1.1]];return a.push(...m),{puddles:a,wet:t,builder:r}}function za(r,t,n,a,l,c,f,m,d=.012,p=0){const _=(p%4+4)%4%2===1,v=(_?l:a)/2,g=(_?a:l)/2;F(r,[t-v,c,n-g],[t+v,f,n+g],m,d)}function Lu(r,t,n,a,l=.7,c=U.wood,f=0){const m=l*.78;za(r,t,n,l,l,a,a+m,c,.014,f);const d=l*.07;for(const p of[-1,1])for(const _ of[-1,1]){const v=t+p*(l*.5-d*.5),g=n+_*(l*.5-d*.5);F(r,[v-d,a,g-d],[v+d,a+m,g+d],En(c,.78),.01)}F(r,[t-l*.5,a+m-d,n-l*.5],[t+l*.5,a+m,n+l*.5],En(c,.85),.01)}function so(r,t,n,a,l,c=.7,f=U.wood){let m=a;for(let d=0;d<l;d++)Lu(r,t+(d%2===0?0:.05),n,m,c,d%2===0?f:En(f,.88),d*1),m+=c*.78}function PA(r,t,n,a,l=U.barrel,c=.9){F(r,[t-.28,a,n-.28],[t+.28,a+c,n+.28],l,.012),F(r,[t-.28-.03,a+c*.22,n-.28-.03],[t+.28+.03,a+c*.3,n+.28+.03],En(l,.82),.01),F(r,[t-.28-.03,a+c*.68,n-.28-.03],[t+.28+.03,a+c*.76,n+.28+.03],En(l,.82),.01),F(r,[t-.28-.02,a+c,n-.28-.02],[t+.28+.02,a+c+.05,n+.28+.02],En(l,.7),.01)}function du(r,t,n,a,l=.6,c=.45,f=.5,m=U.cardboard,d=0){za(r,t,n,l,f,a,a+c,m,.012,d);const _=((d%4+4)%4%2===1?l:f)/2;F(r,[t-.05,a+c,n-_],[t+.05,a+c+.02,n+_],En(m,.8),.006)}function Vu(r,t,n,a,l=0){za(r,t,n,1.1,.9,a,a+.1,U.woodDark,.01,l);for(let c=0;c<3;c++){const f=-.3+c*.3,m=(l%4+4)%4%2===1;F(r,m?[t+f-.06,a,n-.45]:[t-.55,a,n+f-.06],m?[t+f+.06,a+.1,n+.45]:[t+.55,a+.1,n+f+.06],En(U.woodDark,.8),.008)}}function ku(r,t,n,a,l=3){for(let c=0;c<l;c++)Vu(r,t,n,a+c*.22,c)}function hl(r,t,n,a,l,c,f=2.2,m=!1){const d=Math.hypot(a-t,l-n),p=Math.max(2,Math.round(d/1.6));for(let g=0;g<=p;g++){const M=g/p,E=t+(a-t)*M,w=n+(l-n)*M;F(r,[E-.05,c,w-.05],[E+.05,c+f,w+.05],U.steelDark,.008)}const _=Math.abs(a-t)>Math.abs(l-n),v=.02;if(_?(F(r,[t,c,n-v],[a,c+f,n+v],[.3,.32,.33],.006),F(r,[t,c+f-.05,n-v],[a,c+f,n+v],U.steelDark,.006)):(F(r,[t-v,c,n],[t+v,c+f,l],[.3,.32,.33],.006),F(r,[t-v,c+f-.05,n],[t+v,c+f,l],U.steelDark,.006)),m)for(let g=0;g<3;g++){const M=c+f+.06+g*.12;_?F(r,[t,M,n-.1],[a,M+.05,n+.1],U.wire,.004):F(r,[t-.1,M,n],[t+.1,M+.05,l],U.wire,.004)}}function pu(r,t,n,a,l,c,f,m,d=0){za(r,t,n,l,f,a,a+c,m,.016,d);const p=(d%4+4)%4%2===1,_=p?f:l,v=Math.max(3,Math.round(_/.42));for(let g=1;g<v;g++){const M=-_/2+g*_/v;p?F(r,[t-l/2-.03,a+.1,n+M-.05],[t+l/2+.03,a+c-.1,n+M+.05],En(m,.86),.008):F(r,[t+M-.05,a+.1,n-f/2-.03],[t+M+.05,a+c-.1,n+f/2+.03],En(m,.86),.008)}for(const g of[-1,1])for(const M of[-1,1]){const E=t+g*(l/2-.12),w=n+M*(f/2-.12);F(r,[E-.14,a,w-.14],[E+.14,a+.18,w+.14],En(m,.6),.01),F(r,[E-.14,a+c-.18,w-.14],[E+.14,a+c,w+.14],En(m,.6),.01)}}function zd(r,t,n,a,l=U.sack){F(r,[t-.3,a,n-.22],[t+.3,a+.42,n+.22],l,.012),F(r,[t-.2,a+.42,n-.16],[t+.2,a+.52,n+.16],En(l,.9),.01)}function Nu(r,t,n,a,l=0,c=U.containerGreen){za(r,t,n,1.5,.9,a,a+.85,c,.014,l),za(r,t,n,1.56,.96,a+.85,a+.98,En(c,.75),.012,l);for(let f=0;f<4;f++){const m=-.6+f*.4,d=(l%4+4)%4%2===1;F(r,d?[t-.76,a+.1,n+m-.04]:[t+m-.04,a+.1,n-.46],d?[t-.7,a+.75,n+m+.04]:[t+m+.04,a+.75,n-.4],En(c,.8),.008)}}function Ou(r,t,n,a,l,c=0){const f=(c%4+4)%4%2===1;for(const d of[-1,1])F(r,f?[t+d*.22-.04,a,n]:[t-.04,a,n+d*.22-.04],f?[t+d*.22+.04,a+l,n+.05]:[t+.05,a+l,n+d*.22+.04],U.rust,.008);const m=Math.max(3,Math.round(l/.34));for(let d=1;d<m;d++){const p=a+d*l/m;F(r,f?[t-.22,p,n-.03]:[t-.03,p,n-.22],f?[t+.22,p+.05,n+.03]:[t+.03,p+.05,n+.22],U.rust,.006)}}function Id(r,t,n,a,l=4.4){F(r,[t-.1,a,n-.1],[t+.1,a+l,n+.1],U.concreteDark,.01),F(r,[t-.16,a,n-.16],[t+.16,a+.35,n+.16],U.concrete,.01),F(r,[t-.07,a+l-.3,n-.07],[t+.07,a+l,n+.07],U.steelDark,.008),F(r,[t-.55,a+l,n-.16],[t+.06,a+l+.16,n+.16],U.steelDark,.01),F(r,[t-.52,a+l-.06,n-.13],[t-.3,a+l+.02,n+.13],U.lampSodium,.008)}function Pi(r,t,n,a,l,c,f,m="z"){m==="z"?F(r,[t-l/2,n-c/2,a-.03],[t+l/2,n+c/2,a+.03],f,.006):F(r,[t-.03,n-c/2,a-l/2],[t+.03,n+c/2,a+l/2],f,.006)}function ro(r,t,n,a,l,c,f,m="z"){for(let p=0;p<3;p++){const _=(p+.5)/3,v=l*(.35+.4*(p*7%3)*.33),g=c*(.4+.2*(p*5%3)*.3),M=t-l/2+v/2+(l-v)*_*.6,E=n+(p%2===0?c*.18:-c*.2);Pi(r,M,E,a,v,g,f,m)}}function Pu(r,t,n,a,l,c,f="z",m=1){for(let d=0;d<l;d++){const p=Math.sin((m+d)*12.9898)*43758.5453,_=p-Math.floor(p),v=Math.sin((m+d)*78.233)*43758.5453,g=v-Math.floor(v),M=t+(_-.5)*c,E=n+(g-.5)*c*.8;f==="z"?F(r,[M-.035,E-.035,a-.02],[M+.035,E+.035,a+.02],[.06,.06,.07]):F(r,[t-.02,E-.035,M-.035],[t+.02,E+.035,M+.035],[.06,.06,.07])}}function zA(r,t,n,a,l="z"){l==="z"?(F(r,[t-.42,n-.3,a-.04],[t+.42,n+.3,a+.32],U.steelLight,.01),F(r,[t-.34,n-.22,a+.32],[t+.34,n+.22,a+.36],U.steelDark,.006)):(F(r,[t-.04,n-.3,a-.42],[t+.32,n+.3,a+.42],U.steelLight,.01),F(r,[t+.32,n-.22,a-.34],[t+.36,n+.22,a+.34],U.steelDark,.006))}function IA(r,t,n,a,l){const c=(m,d)=>[t+m,n+d],f=(m,d,p,_,v,g,M,E=.012)=>{const[w,y]=c(p-m/2,_-d/2),[x,N]=c(p+m/2,_+d/2);F(r,[Math.min(w,x),v,Math.min(y,N)],[Math.max(w,x),g,Math.max(y,N)],M,E)};f(1.9,5.4,0,0,a+.32,a+.55,U.steelDark);for(const m of[-1.7,1.5])for(const d of[-.95,.95]){const[p,_]=c(d,m);F(r,[p-.14,a,_-.42],[p+.14,a+.6,_+.42],U.tyre,.008)}f(2.1,3.6,0,.85,a+.55,a+2.5,U.truckBody),f(2.14,3.3,0,.85,a+.7,a+2.2,En(U.truckBody,.9),.01),f(1.9,1.8,0,-2.1,a+.55,a+2.1,U.truckCab),f(1.6,.1,0,-3,a+1.25,a+1.85,U.glassDark,.008),f(1.7,.1,0,-2.95,a+.6,a+1.2,[.5,.52,.5],.008)}function BA(r,t,n,a){F(r,[t-.16,a,n-.16],[t+.16,a+.05,n+.16],[.3,.14,.1],.008),F(r,[t-.11,a+.05,n-.11],[t+.11,a+.26,n+.11],[.72,.3,.08],.008),F(r,[t-.075,a+.26,n-.075],[t+.075,a+.44,n+.075],[.82,.42,.12],.008),F(r,[t-.09,a+.3,n-.09],[t+.09,a+.36,n+.09],[.86,.86,.84],.006)}function FA(r,t,n,a,l){const c=(m,d)=>[t+m,n+d],f=(m,d,p,_,v,g,M,E=.012)=>{const[w,y]=c(p-m/2,_-d/2),[x,N]=c(p+m/2,_+d/2);F(r,[Math.min(w,x),v,Math.min(y,N)],[Math.max(w,x),g,Math.max(y,N)],M,E)};f(1.8,4,0,0,a+.34,a+.95,U.vanPanel),f(1.66,2.1,0,.1,a+.95,a+1.42,U.vanBody),f(1.5,.1,0,-1,a+1,a+1.36,U.glassDark,.008),f(1.5,.1,0,1.16,a+1,a+1.36,U.glassDark,.008);for(const m of[-1.3,1.3])for(const d of[-.85,.85]){const[p,_]=c(d,m);F(r,[p-.12,a,_-.34],[p+.12,a+.5,_+.34],U.tyre,.008)}f(1.2,.28,0,.1,a+1.42,a+1.6,U.steelDark,.008),f(.5,.22,-.28,.1,a+1.44,a+1.57,U.policeRed,.006),f(.5,.22,.28,.1,a+1.44,a+1.57,U.policeBlue,.006),f(.06,1.5,-.92,.6,a+.5,a+.9,U.graffitiWhite,.008),f(.06,1.5,.92,.6,a+.5,a+.9,U.graffitiWhite,.008)}function HA(r,t,n,a,l){const c=(m,d)=>[t+m,n+d],f=(m,d,p,_,v,g,M,E=.012)=>{const[w,y]=c(p-m/2,_-d/2),[x,N]=c(p+m/2,_+d/2);F(r,[Math.min(w,x),v,Math.min(y,N)],[Math.max(w,x),g,Math.max(y,N)],M,E)};f(1.86,4.1,0,0,a+.36,a+1.4,U.vanBody),f(1.9,4.14,0,0,a+.36,a+.84,U.vanPanel,.01),f(1.72,3.5,0,.2,a+1.4,a+2.05,U.vanBody),f(1.6,.12,0,-1.5,a+1.5,a+1.96,U.glassDark,.008),f(1.56,.12,0,1.86,a+1.54,a+1.92,U.glassDark,.008);for(const m of[-1,1])f(.1,1.5,m*.8,.3,a+1.52,a+1.92,U.glassDark,.008);for(const m of[-1,1])f(.08,3.9,m*.94,0,a+.9,a+1.24,U.vanPanel,.008);f(1.9,.22,0,-2.16,a+.42,a+.74,U.steelDark,.01),f(1.9,.22,0,2.16,a+.42,a+.74,U.steelDark,.01);for(const m of[-1.4,1.4])for(const d of[-.9,.9]){const[p,_]=c(d,m);F(r,[p-.13,a,_-.38],[p+.13,a+.55,_+.38],U.tyre,.008)}f(1.3,.3,0,.2,a+2.05,a+2.28,U.steelDark,.008),f(.55,.24,-.32,.2,a+2.08,a+2.25,U.policeRed,.006),f(.55,.24,.32,.2,a+2.08,a+2.25,U.policeBlue,.006);for(let m=0;m<5;m++)f(.92,.08,0,-.7+m*.38,a+2.05,a+2.13,U.steel,.006);for(const m of[-1,1])f(.08,2,m*.44,.05,a+2.05,a+2.15,U.steel,.006);for(let m=0;m<4;m++)f(.66,.07,0,2.09,a+.95+m*.3,a+2.05,U.steel,.006);for(const m of[-1,1])f(.07,.08,m*.3,2.09,a+.95,a+2.05,U.steel,.006)}function GA(r,t){F(r,[-6.6-.1,.12-.06,-4.2-.1],[-2.6+.1,.12,.2+.1],U.concreteWorn,.01),F(r,[-6.6-.2,.12,-4.2-.2],[-6.6,4.5,.2+.2],U.concreteWorn,.016),F(r,[-6.6,.12,-4.2-.2],[-2.6,4.5,-4.2],U.concreteWorn,.016),F(r,[-2.6,.12,-4.2],[-2.6+.2,4.5,-3.1],U.concreteWorn,.016),F(r,[-2.6,.12,-2],[-2.6+.2,4.5,.2],U.concreteWorn,.016),F(r,[-2.6,.12,-3.1],[-2.6+.2,2.5,-2],U.concreteWorn,.016),F(r,[-2.6,3.5,-3.1],[-2.6+.2,4.5,-2],U.concreteWorn,.016),F(r,[-2.6,2.5,-3.1],[-2.6+.2,2.75,-2.6],U.concreteWorn,.016),F(r,[-2.6,2.5,-2.5],[-2.6+.2,2.75,-2],U.concreteWorn,.016);for(const[g,M]of[[-1.6,-1.05],[-.85,-.3]]){F(r,[-2.6+.14,2.55,g],[-2.6+.2,3.45,M],[.1,.1,.11],.008);for(let E=0;E<3;E++){const w=g+.08+E*.17;F(r,[-2.6+.12,2.55,w],[-2.6+.22,3.45,w+.1],U.plank,.008)}}F(r,[-2.6+.14,.12,-3.05],[-2.6+.2,2.5,-2.05],[.1,.11,.12],.008),F(r,[-2.6-.62,.12,-3.05],[-2.6-.02,2.5,-2.95],U.rustDark,.012),F(r,[-2.6-.62,.12,-2.15],[-2.6-.02,2.5,-2.05],U.rustDark,.012);const d=-5.7,p=-3.5;F(r,[-6.6,.12,.2-.2],[d,1.05,.2],U.concreteWorn,.016),F(r,[p,.12,.2-.2],[-2.6,1.05,.2],U.concreteWorn,.016),F(r,[-6.6,1.05,.2-.24],[-2.6,1.3,.2+.04],U.steelDark,.012);for(let g=0;g<5;g++)F(r,[d+.05,1.3+g*.11,.2-.32+g%2*.05],[p-.05,1.41+g*.11,.2-.18-g%2*.05],g%2===0?U.rust:En(U.rust,.85),.008);for(const g of[d-.07,p+.07])F(r,[g-.06,.12,.2-.26],[g+.06,1.85,.2-.14],U.rustDark,.008);for(let g=0;g<8;g++){const M=d+g*.28;F(r,[M,1.3,.2-.26],[M+.16,1.4,.2-.17],U.graffitiYellow,.006)}for(const g of[-6.6+.15,-2.6-.35])F(r,[g,.12,.2-.3],[g+.2,4.5-.3,.2-.1],U.steelDark,.012),F(r,[g-.04,.12,.2-.34],[g+.24,.12+.3,.2-.06],U.steel,.01),F(r,[g-.04,4.5-.6,-4.2-.1],[g+.24,4.5-.3,.2-.06],U.steelDark,.012);F(r,[-6.6-.05,4.5-.34,.2-.24],[-2.6+.05,4.5-.14,.2-.06],U.steelDark,.012);const _=-4.2+2.1;F(r,[-6.6-.25,4.5,-4.2-.25],[-2.6+.25,4.5+.22,_],U.corrugatedDark,.016);for(let g=0;g<8;g++){const M=-4.4+g*.38;F(r,[-6.6-.25,4.5+.22,M-.07],[-2.6+.25,4.5+.3,M+.07],En(U.corrugatedDark,.85),.006)}F(r,[-6.6-.25,4.5,_-.1],[-2.6+.25,4.5+.26,_+.1],U.steelDark,.012);for(let g=0;g<5;g++){const M=-6.3999999999999995+g*.95;F(r,[M-.05,4.5,_-.4],[M+.05,4.5+.24,_],U.steelDark,.008)}for(let g=0;g<5;g++){const M=-3.9000000000000004+g*.95;F(r,[-6.6-.32,.12,M],[-6.6-.2,4.5,M+.24],U.concrete,.01)}for(const g of[-6.6+.3,-2.6-.55])F(r,[g,.12,.2],[g+.24,4.5,.2+.14],U.concrete,.01);F(r,[-6.6,.12,-4.2],[-6.6+.05,1,.2],U.concreteDark,.006),F(r,[-6.6,.12,-4.2],[-2.6,1,-4.2+.05],U.concreteDark,.006),F(r,[-2.6-.05,.12,-4.2],[-2.6,1,.2],U.concreteDark,.006),F(r,[-4.9,.12,-2.3],[-4.55,4.5,-1.95],U.concrete,.016),F(r,[-4.98,.12,-2.38],[-4.47,.12+.22,-1.87],U.concreteDark,.012);for(let g=0;g<5;g++){const M=.67+g*.75;F(r,[-6.25,M,-4],[-4.35,M+.1,-3.55],U.steel,.01),F(r,[-6.25,M+.1,-3.62],[-4.35,M+.42,-3.55],U.steelDark,.008);for(let E=0;E<7;E++){const w=-6.1+E*.26;du(r,w,-3.78,M+.1,.2,.3,.18,E%3===0?U.cardboardDark:U.cardboard,0)}}for(const g of[-6.2,-5.3,-4.4])F(r,[g-.05,.12,-4.02],[g+.05,.12+4,-3.92],U.steelDark,.008);for(let g=0;g<3;g++){const M=.72+g*.8;F(r,[-6.2,M,-3.1],[-5.75,M+.1,-1.1],U.steel,.01);for(let E=0;E<4;E++)Lu(r,-5.98,-2.9+E*.5,M+.1,.42,U.woodDark,E)}so(r,-5.2,-.7,.12,2,.72,U.wood),so(r,-3.1,-2.6,.12,3,.66,U.woodLight),Lu(r,-3.5,-1.2,.12,.8,U.wood,1),zd(r,-2.95,-1.5,.12),zd(r,-2.95,-1.2,.12,En(U.sack,.92)),zd(r,-3.35,-1.1,.12),Vu(r,-5.9,-.5,.12,1),ku(r,-5.9,-.5,.12,2),F(r,[-3.95,.12,-1.2],[-3.05,.12+.55,-.35],U.containerYellow,.014),F(r,[-3.8,.12+.55,-1.05],[-3.25,.12+1.25,-.55],U.steelDark,.01),F(r,[-3.75,.12+1.25,-1],[-3.3,.12+1.5,-.6],U.glassDark,.008);for(const g of[-1.15,-.45])F(r,[-3.1,.12,g-.06],[-2.85,.12+1.5,g+.06],U.steelDark,.008);F(r,[-2.9,.12+.2,-1.2],[-2.75,.12+.5,-.4],U.steelDark,.008),F(r,[-6.2,.12+.75,-.9],[-5.1,.12+.9,-.2],U.steel,.01);for(const g of[-6.1,-5.2])for(const M of[-.82,-.3])F(r,[g-.04,.12,M-.04],[g+.04,.12+.75,M+.04],U.steelDark,.006);du(r,-5.7,-.55,.12+.9,.5,.36,.4,U.cardboard,1),du(r,-3.6,0,.12,.5,.4,.42,U.cardboardDark,0),du(r,-3.3,-.2,.12,.4,.3,.34,U.cardboard,1),F(r,[-4.3,.12,-.9],[-3.6,.12+.02,-.82],U.graffitiYellow,0),F(r,[-5.1,.12,-.4],[-4.6,.12+.02,-.32],[.5,.49,.45],0),F(r,[-4.2,.12,-2.9],[-3.75,.12+.02,-2.75],[.5,.49,.45],0);const v=3;F(r,[-3.9,v,-4.05],[-2.65,v+.12,-2.5],U.corrugated,.012);for(const g of[-3.85,-3.2,-2.7])F(r,[g-.05,.12,-4.02],[g+.05,v,-3.92],U.steelDark,.008);F(r,[-3.9,v+.12,-2.72],[-2.65,v+1,-2.6],U.corrugatedDark,.01),Ou(r,-2.95,-2.35,.12,v+.4,0),F(r,[-3.55,v+.3,-2.66],[-2.95,v+.85,-2.58],U.glassDark,.008),F(r,[-3.6,v+.24,-2.68],[-2.9,v+.32,-2.56],U.steelDark,.008);for(let g=0;g<3;g++){const M=-5.9+g*1.3;F(r,[M,4.5-.42,-3],[M+.5,4.5-.3,-2.7],U.steelDark,.008),F(t,[M+.04,4.5-.44,-2.98],[M+.46,4.5-.32,-2.72],U.emergency,0)}F(r,[-5.4,.12,-4.2-.06],[-4.5,.12+2.3,-4.2+.04],U.rustDark,.012),F(t,[-4.62,.12,-4.2-.08],[-4.5,.12+2.1,-4.2-.04],U.backRoomRed,0),zA(r,-6.6-.2,3,-1.4,"x"),Pi(r,-6.6-.22,2.2,-2.6,1.1,.7,U.graffitiWhite,"x"),Pi(r,-6.6-.22,2.2,-2.6,.9,.5,U.sprayMark,"x"),Nu(r,-2.95,.85,0,0,U.containerGreen),Nu(r,-6.35,.9,0,0,U.containerGrey),F(r,[-2.6,0,-4.4],[-2,3.2,-3.6],U.concreteWorn,.012),F(r,[-2,0,-4.4],[-1.7,3.2,-3.6],U.concrete,.012),ro(r,-4.6,3.6,.22,1.6,1,U.graffitiBlue,"z"),ro(r,-3.1,1.6,.22,1,.8,U.graffitiRed,"z"),Pu(r,-4,1.2,.22,9,1.1,"z",3),Pu(r,-2.6,1.6,-1.2,7,.9,"x",8),Pi(r,-4.72,1.4,-1.92,.5,.7,U.sprayMark,"z")}function VA(r,t){F(r,[3.2-.1,.12-.06,-3.9-.1],[6.6+.1,.12,-1.3+.1],U.concreteWorn,.01),F(r,[3.2-.15,.12,-3.9-.15],[3.2,4.4,-1.3+.15],U.corrugated,.016),F(r,[3.2,.12,-3.9-.15],[6.6,4.4,-3.9],U.corrugatedDark,.016),F(r,[6.6,.12,-3.9-.15],[6.6+.15,4.4,-1.3+.15],U.corrugated,.016),F(r,[3.2,.12,-1.3],[3.95,4.4,-1.3+.15],U.corrugated,.016),F(r,[5.05,.12,-1.3],[6.6,4.4,-1.3+.15],U.corrugated,.016),F(r,[3.95,2.4,-1.3],[5.05,4.4,-1.3+.15],U.corrugated,.016),F(r,[3.2,.12,-1.3],[3.95,.1,-1.3+.15],U.steelDark,.01),F(r,[5.05,.12,-1.3],[6.6,.1,-1.3+.15],U.steelDark,.01),F(r,[5.35,1.15,-1.3+.1],[6.25,2.15,-1.3+.16],U.glassDark,.008),F(r,[5.3,1.1,-1.3+.06],[6.3,1.18,-1.3+.2],U.steelDark,.008),F(r,[5.3,2.1,-1.3+.06],[6.3,2.18,-1.3+.2],U.steelDark,.008),F(r,[3.2-.15,2.7,-3.9-.15],[6.6+.15,2.85,-1.3+.15],U.corrugatedDark,.012),F(r,[3.2-.15,2.85,-3.9-.15],[3.2,4.4,-1.3+.15],U.corrugated,.016),F(r,[3.2,2.85,-3.9-.15],[6.6,4.4,-3.9],U.corrugatedDark,.016),F(r,[6.6,2.85,-3.9-.15],[6.6+.15,4.4,-1.3+.15],U.corrugated,.016),F(r,[3.2,2.85,-1.3],[3.95,4.4,-1.3+.15],U.corrugated,.016),F(r,[5.05,2.85,-1.3],[6.6,4.4,-1.3+.15],U.corrugated,.016),F(r,[3.95,2.85,-1.3],[5.05,4.4,-1.3+.15],U.corrugated,.016),F(r,[3.6,2.7,-1.3+.15],[5.4,2.82,-1.3+1.05],U.steel,.012);for(let d=0;d<7;d++){const p=3.65+d*.28;F(r,[p-.04,2.82,-1.3+.98],[p+.04,3.7,-1.3+1.06],U.steelDark,.008)}F(r,[3.56,3.62,-1.3+.96],[5.44,3.76,-1.3+1.08],U.steelDark,.01),F(r,[3.2-.2,4.4,-3.9-.2],[6.6+.2,4.4+.18,-1.3+.2],U.corrugatedDark,.016),Ou(r,6.85,-2.4,.12,2.8,0),Ou(r,6.85,-1.85,.12,2.8,0),F(r,[6.7,2.62,-2.7],[6.95,2.74,-1.55],U.steel,.01),F(r,[3.5,.12+.72,-2.6],[4.7,.12+.82,-2],U.woodDark,.01);for(const d of[3.6,4.55])F(r,[d-.05,.12,-2.5],[d+.05,.12+.72,-2.1],U.steelDark,.006);F(r,[4.95,.12,-2.5],[5.35,.12+.12,-2.1],U.steelDark,.01),F(r,[5.15,.12+.1,-2.45],[5.35,.12+.85,-2.15],U.steelDark,.01),F(r,[3.6,.12+.82,-2.45],[3.95,.12+1.02,-2.25],[.15,.16,.17],.006),F(r,[4.2,.12+.82,-2.4],[4.34,.12+.98,-2.24],U.steelLight,.006),F(r,[4.42,.12+.82,-2.42],[4.68,.12+.84,-2.06],[.5,.49,.45],0),Pi(r,3.45,1.7,-2.42,.7,.9,U.graffitiWhite,"z");for(let d=0;d<4;d++)F(r,[3.22,1.4+d*.18,-2.38],[3.66,1.44+d*.18,-2.36],[.25,.26,.28],0);F(r,[6.1,.12,-3.6],[6.55,.12+1.8,-3.15],U.containerGrey,.012),F(r,[6.05,.12+.6,-3.62],[6.12,.12+1.7,-3.14],U.steelDark,.008),F(r,[4.2,2.52,-2.5],[5,2.62,-2.3],U.steelDark,.008),F(t,[4.28,2.46,-2.46],[4.92,2.54,-2.34],U.lampWarm,0),ku(r,3,-.4,0,3),Vu(r,3.1,.3,0,1),Nu(r,6.3,.1,0,0,U.containerBlue),so(r,6,-.7,0,2,.62,U.wood);for(let d=0;d<2;d++)za(r,4.9+d*.5,.35,.42,.42,.02,.5,U.steelDark,.01,d),za(r,4.9+d*.5,.35,.42,.42,.5,.58,U.steelDark,.01,d);F(r,[2.6,.3,.2],[2.9,.42,.62],U.steelDark,.008),F(r,[2.68,.42,.3],[2.82,.95,.42],U.steelDark,.008),F(r,[2.55,.28,.14],[2.95,.36,.3],U.tyre,.006),F(r,[6.75,0,-.35],[6.95,4.3,-.15],U.steelDark,.012),F(r,[6.4,4.3,-.32],[6.8,4.48,-.18],U.steelDark,.01),F(t,[6.42,4.16,-.3],[6.68,4.3,-.2],U.lampSodium,0),F(r,[2.3,0,.7],[2.5,1.1,2.4],U.concreteWorn,.014),F(r,[2.3,1.1,.7],[2.55,1.22,2.4],U.concrete,.01),ro(r,3.6,1.6,-1.16,1,.9,U.graffitiYellow,"z"),ro(r,6.76,1.4,-2.8,.8,.8,U.graffitiRed,"x"),Pu(r,4.9,1.5,-1.16,8,.9,"z",5),Pi(r,5.6,3.5,-1.14,1.2,.5,U.graffitiWhite,"z"),Pi(r,5.6,3.5,-1.13,.9,.3,U.sprayMark,"z")}function kA(r,t){F(r,[-6.95,0,-4.4],[-6.75,4.2,1.4],U.concreteDark,.014),F(r,[-2.6,0,1.2],[-2.4,3,2.6],U.concreteWorn,.012),ku(r,-6,1.2,0,3),Nu(r,-4.9,1.9,0,0,U.containerRed),so(r,-3.6,1.5,0,2,.66,U.wood),F(r,[-6.72,2.6,.4],[-6.6,2.9,1],U.steelDark,.01),F(r,[-6.68,2.5,.5],[-6.56,2.6,.9],U.steelDark,.008),F(t,[-6.6,2.44,.55],[-6.52,2.52,.85],U.lampWarm,0)}function WA(r){const t=Kt.mid.z0,n=Kt.mid.z1;F(r,[Kt.mid.x0-.2,0,t],[Kt.mid.x0,2.7,-1.1],U.concreteWorn,.016),F(r,[Kt.mid.x0-.2,2.7,t],[Kt.mid.x0,2.88,-1.1],U.concrete,.012),F(r,[Kt.mid.x0-.2,0,1.3],[Kt.mid.x0,2.7,n],U.concreteWorn,.016),F(r,[Kt.mid.x0-.2,2.7,1.3],[Kt.mid.x0,2.88,n],U.concrete,.012),F(r,[Kt.mid.x1,0,t],[Kt.mid.x1+.2,2.7,-1.5],U.concreteWorn,.016),F(r,[Kt.mid.x1+.2,0,1.1],[Kt.mid.x1,2.7,1.95],U.concreteWorn,.016),F(r,[Kt.mid.x0-.22,2.2,-2.3],[Kt.mid.x0+.02,2.6,-1.7],[.07,.07,.08],0),F(r,[Kt.mid.x1-.02,2.2,-2.6],[Kt.mid.x1+.22,2.6,-2],[.07,.07,.08],0),F(r,[Kt.mid.x0-.22,2.1,1.9],[Kt.mid.x0+.02,2.5,2.5],[.07,.07,.08],0),Pu(r,Kt.mid.x0-.21,1.2,-1.9,8,1,"x",12);const a=-.7;for(const c of[Kt.mid.x0-.2,Kt.mid.x1+.2])F(r,[c-.14,0,a-.16],[c+.14,2.7,a+.16],U.steelDark,.012);F(r,[Kt.mid.x0-.2,2.42,a-.1],[Kt.mid.x1+.2,2.7,a+.1],U.steelDark,.012);const l=(c,f)=>{F(r,[c,.1,a-.07],[f,2.38,a+.07],U.iron,.012);for(let m=0;m<7;m++){const d=c+.08+m*((f-c-.16)/6);F(r,[d-.035,.2,a-.09],[d+.035,2.28,a+.09],U.steelDark,.006)}F(r,[c,.1,a-.09],[f,.3,a+.09],U.steelDark,.008),F(r,[c,2.18,a-.09],[f,2.38,a+.09],U.steelDark,.008)};l(.1,Kt.mid.x1+.2),l(Kt.mid.x0-.18,Kt.mid.x0+.16),F(r,[-1.9,0,1.35],[.7,.95,1.6],U.concreteWorn,.014),F(r,[-1.95,.95,1.3],[.75,1.08,1.65],U.concrete,.01),so(r,-1.3,2,0,2,.68,U.wood),F(r,[.85,0,1.5],[.95,1.5,1.6],U.steelDark,.008),F(r,[.3,.1,1.45],[.9,1.35,1.55],U.graffitiBlue,.008);for(const[c,f]of[[-1.75,-2.7],[1.75,.2]])F(r,[c-.6,0,f-.5],[c+.6,2.3,f+.5],U.concreteDark,.014),F(r,[c-.6,2.3,f-.5],[c+.6,2.5,f+.5],U.concrete,.012),F(r,[c-.55,.6,f-.55],[c+.55,1.9,f-.48],U.glassDark,.008),F(r,[c-.45,.9,f-.4],[c+.45,1.1,f-.1],U.steelDark,.008),F(r,[c-.2,1.1,f-.35],[c+.2,1.3,f-.2],[.16,.17,.19],.006)}function XA(r){const t=Kt.sewer;F(r,[t.x0-.15,-.9,t.z0-.2],[t.x1+.15,-.7,t.z1+.2],U.concreteDark,.012),F(r,[t.x0-.15,-.7,t.z0-.2],[t.x0,.02,t.z1+.2],U.concreteWorn,.012),F(r,[t.x1,-.7,t.z0-.2],[t.x1+.15,.02,t.z1+.2],U.concreteWorn,.012);for(let n=0;n<9;n++){const a=t.z0+.4+n*.72;F(r,[t.x0,0,a-.3],[t.x1,.05,a+.3],U.grate,.006)}F(r,[t.x0,-.68,t.z1-.3],[t.x1,-.66,t.z1-.26],[.1,.13,.16],0)}function YA(r,t){const n=Kt.tSpawn;hl(r,n.x0,n.z0,n.x1,n.z0,n.y,2.4,!0),hl(r,n.x0,n.z0,n.x0,n.z1,n.y,2.4,!0),hl(r,n.x1,n.z0,n.x1,n.z1,n.y,2.4,!0),hl(r,n.x0,n.z1,-2.4,n.z1,n.y,2.4,!0),hl(r,2.4,n.z1,n.x1,n.z1,n.y,2.4,!0),IA(r,-5,-5.5,n.y),Ou(r,-3.6,-6.3,n.y,1.7,0),pu(r,4.6,-6,n.y,2.3,2.5,1.5,U.containerRed,0),pu(r,4.6,-4.9,n.y,2.3,2.5,1.5,U.containerBlue,0),pu(r,4.6,-5.45,n.y+2.5,2.3,2.4,1.3,U.containerGrey,0),pu(r,2.6,-6.2,n.y,2.3,2.5,1.5,U.containerGreen,0);for(let a=0;a<4;a++)PA(r,-2.9+a*.62,-4.9,n.y,a%2===0?U.barrel:U.barrelYellow);ku(r,2.5,-4.95,n.y,3),Vu(r,1.2,-5.6,n.y,1),F(r,[-2.4,n.y-.1,-5.5],[-2.2,n.y+.75,-4.9],[.07,.07,.08],0),F(r,[-2.45,n.y-.15,-5.55],[-2.35,n.y+.85,-4.85],U.concreteWorn,.01),F(r,[-1.6,n.y+3.2,-5.6],[-1.4,n.y+3.4,-5.2],U.steelDark,.008),F(t,[-1.55,n.y+3.05,-5.55],[-1.45,n.y+3.2,-5.25],U.lampWarm,0),ro(r,-6.7,n.y+1,-5.2,1.2,.9,U.graffitiRed,"x")}function qA(r,t){const n=Kt.ctSpawn;for(let d=0;d<4;d++){za(r,-3.2+d*1.9,2.85,1.5,.1,.42,.86,U.plastic,.01,0);for(const p of[-1,1])F(r,[-3.2+d*1.9+p*.62-.05,.1,2.6],[-3.2+d*1.9+p*.62+.05,.52,2.94],U.steelDark,.008)}for(let d=0;d<3;d++)F(r,[-2.4+d*1.1,.1,2.98],[-1.9+d*1.1,1,3.06],U.vanPanel,.01);HA(r,-4,4.6,.1);const a=3.1,l=5.4,c=3.6,f=6.1,m=1.4;F(r,[a,0,c],[l,m,f],U.concrete,.014),F(r,[a-.08,m,c-.08],[l+.08,m+.12,f+.08],U.concrete,.01),F(r,[3.24,m+.12,5.86],[3.38,m+2.5,6],U.steelDark,.01),F(r,[3.08,m+2.5,5.7],[3.54,m+2.78,6],U.steelDark,.012),F(r,[3.12,m+2.54,5.66],[3.5,m+2.74,5.72],U.fluorescent,.008),F(t,[3.14,m+2.5,5.62],[3.48,m+2.72,5.66],U.lampWarm,0),F(r,[4.55,m+.12,5.1],[5.05,m+.95,5.72],U.containerYellow,.014),F(r,[4.5,m+.62,5.06],[5.1,m+.8,5.76],U.steelDark,.01),F(r,[4.62,m+.3,5.02],[4.98,m+.6,5.08],U.steelDark,.008),so(r,3.55,4.35,m+.12,2,.6,U.woodDark),F(r,[4.3,m+.12,3.9],[4.86,m+.5,4.46],U.containerGrey,.012);for(let d=0;d<3;d++)F(r,[3.2+d*.16,m+.12,3.78],[3.34+d*.16,m+.2,4.5],U.tyre,.006);for(let d=0;d<8;d++){const p=(d+1)*(m/8);F(r,[a-.75,0,c+.3+d*.3],[a,p,c+.6+d*.3],U.concreteWorn,.01)}F(r,[a-.8,0,c+.2],[a-.68,m+.9,c+2.6],U.steelDark,.008),F(r,[4.7,m+.12,3.7],[4.9,m+2.3,3.9],U.steelDark,.01),F(r,[4.45,m+2.3,3.5],[5.15,m+2.85,3.95],U.steelDark,.012),F(r,[4.5,m+2.36,3.44],[5.1,m+2.8,3.52],U.fluorescent,.008);for(let d=0;d<3;d++){const p=c+.2+d*.9;for(let _=0;_<2;_++)F(r,[a+.12+_%2*.05,m+.12+_*.3,p],[a+.52,m+.4+_*.3,p+.62],_===0?U.sack:En(U.sack,.9),.01)}F(r,[a-.08,m,c-.08],[a+.02,m+.62,f+.08],U.concreteWorn,.012),F(r,[a-.08,m,f-.02],[l+.08,m+.62,f+.08],U.concreteWorn,.012);for(let d=0;d<5;d++){const p=a+.1+d*.55;F(r,[p,m+.62,f-.03],[p+.26,m+.68,f+.09],U.graffitiYellow,.006)}F(r,[n.x0,0,n.z1-.25],[n.x1,1.8,n.z1],U.concreteWall,.016),F(r,[n.x0,1.8,n.z1-.3],[n.x1,1.95,n.z1+.05],U.concrete,.012);for(let d=0;d<6;d++){const p=n.x0+.5+d*1.8;F(r,[p-.16,0,n.z1-.35],[p+.16,1.8,n.z1-.25],U.concrete,.01)}for(let d=0;d<7;d++){const p=n.x0+1.1+d*1.55;F(r,[p-.34,1.3,n.z1-.36],[p-.22,1.44,n.z1-.25],U.rust,.006)}F(r,[n.x0+.8,1.3,n.z1-.37],[n.x1-.8,1.44,n.z1-.3],U.rustDark,.008),Pi(r,-3.9,1.2,n.z1-.36,.8,.5,U.graffitiYellow,"z"),Pi(r,4.3,1.25,n.z1-.36,.7,.45,U.graffitiYellow,"z"),Pi(r,-2.6,1.1,n.z1-.26,.9,.9,U.badge,"z"),Pi(r,-2.6,1.1,n.z1-.27,.55,.55,U.graffitiWhite,"z"),Pi(r,1,1.15,n.z1-.26,1.8,.44,U.graffitiYellow,"z"),ro(r,3.2,1.3,n.z1-.26,1.2,.7,U.graffitiBlue,"z"),F(r,[-.2,2.6,n.z1-.3],[.1,2.82,n.z1-.14],U.steelDark,.008),F(t,[-.16,2.64,n.z1-.33],[.06,2.78,n.z1-.3],U.lampWarm,0),FA(r,-.6,5.2,.1);for(let d=0;d<5;d++)BA(r,-2.6+d*1.35,3.55,.1);for(let d=0;d<4;d++){const p=-3.1+d*2.2;F(r,[p-.05,.1,2.1],[p+.05,1.05,2.2],U.steelDark,.008),F(r,[p+.05,.92,2.13],[p+2.15,1,2.17],d%2===0?U.graffitiYellow:U.graffitiWhite,.004)}Lu(r,-1.4,n.z1-.9,.1,.8,U.woodDark,0),F(r,[-1.7,.66,n.z1-1.15],[-1.2,.82,n.z1-.7],[.2,.24,.2],.006),F(r,[-1.1,.66,n.z1-1.1],[-.6,.8,n.z1-.75],[.2,.24,.2],.006)}function ZA(r,t){Id(r,-7,2.2,0,4.6),Id(r,6.95,3,0,4.6),Id(r,-6.95,-3.2,0,4.6),F(r,[.3,3.4,2.95],[.5,3.6,3.15],U.steelDark,.008),F(t,[.32,3.28,2.97],[.48,3.4,3.13],U.lampWarm,0);for(const[n,a]of[[-7,-1.2],[-7,4.6]]){F(r,[n-.12,0,a-.12],[n+.12,5.6,a+.12],U.woodDark,.012);for(let l=0;l<3;l++){const c=4.6+l*.34;F(r,[n-.44,c,a-.05],[n+.44,c+.08,a+.05],U.woodDark,.008);for(const f of[-1,1])F(r,[n+f*.38-.05,c-.12,a-.05],[n+f*.38+.05,c+.2,a+.05],[.24,.3,.36],.005)}}for(const n of[4.62,4.96,5.3])for(let a=0;a<7;a++){const l=a/7,c=(a+1)/7,f=m=>Math.sin(m*Math.PI)*.3;F(r,[-6.92,n-f(l),-1.2+l*5.8],[-6.92,n-f(c)+.02,-1.2+c*5.8],U.wire,0)}}let gs=null;function KA(){if(gs)return gs;const r=new Uint8Array([64,132,205,255]);return gs=new mx(r,4,1,Op),gs.minFilter=Rn,gs.magFilter=Rn,gs.generateMipmaps=!1,gs.needsUpdate=!0,gs}function Vv(r={}){return new uy({color:16777215,vertexColors:!0,gradientMap:KA(),emissive:new ae(r.emissive??0),emissiveIntensity:r.emissiveIntensity??1,transparent:r.transparent??!1,opacity:r.opacity??1,side:r.side??xs})}function QA(){return new Fn({vertexShader:`
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      precision highp float;
      uniform vec3 uInk;
      void main() {
        gl_FragColor = vec4(uInk, 1.0);
      }
    `,uniforms:{uInk:{value:new ae(.05,.05,.07)}},side:Yn,depthWrite:!1})}function JA(){return new Fn({uniforms:{uBrightness:{value:1}},vertexShader:`
      varying vec3 vColor;
      varying vec3 vNormal;
      void main() {
        vColor = color;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      precision highp float;
      uniform float uBrightness;
      varying vec3 vColor;
      varying vec3 vNormal;
      void main() {
        float facing = 0.76 + 0.24 * abs(vNormal.y);
        gl_FragColor = vec4(vColor * uBrightness * facing, 1.0);
      }
    `,vertexColors:!0})}function jA(r,t){return new Fn({uniforms:{uTop:{value:r},uBottom:{value:t}},vertexShader:`
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      precision highp float;
      uniform vec3 uTop;
      uniform vec3 uBottom;
      varying vec3 vPos;
      void main() {
        float h = normalize(vPos).y * 0.5 + 0.5;
        vec3 color = mix(uBottom, uTop, pow(h, 0.7));
        gl_FragColor = vec4(color, 1.0);
      }
    `,side:Yn,depthWrite:!1})}function $A(r,t,n,a,l){return new Fn({uniforms:{uCenter:{value:r},uRadius:{value:t},uColor:{value:n},uHalf:{value:a},uIntensity:{value:l}},vertexShader:`
      varying vec2 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,fragmentShader:`
      precision highp float;
      uniform vec2 uCenter;
      uniform float uRadius;
      uniform vec3 uColor;
      uniform float uHalf;
      uniform float uIntensity;
      varying vec2 vWorld;

      void main() {
        float d = length(vWorld - uCenter);
        float a = smoothstep(uRadius, uRadius * 0.1, d);
        float edge = min(uHalf - abs(vWorld.x), uHalf - abs(vWorld.y));
        a *= smoothstep(0.0, 0.7, edge);
        if (a < 0.004) discard;
        gl_FragColor = vec4(uColor * a * uIntensity, a);
      }
    `,transparent:!0,depthWrite:!1,blending:Mu})}function t3(){const t=document.createElement("canvas");t.width=128,t.height=128;const n=t.getContext("2d");if(!n)throw new Error("2D canvas context is unavailable");const a=n.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);a.addColorStop(0,"rgba(255,255,255,1)"),a.addColorStop(.3,"rgba(255,246,220,0.55)"),a.addColorStop(1,"rgba(255,240,200,0)"),n.fillStyle=a,n.fillRect(0,0,128,128);const l=new ay(t);return l.colorSpace=li,l}const e3=`
  attribute float aSeed;
  attribute float aEnd;
  uniform float uTime;
  uniform float uHeight;
  uniform float uSpeed;
  varying float vFade;

  void main() {
    float speed = uSpeed * (0.72 + aSeed * 0.62);
    float y = uHeight - mod(aSeed * 97.31 + uTime * speed, uHeight);
    vec3 p = position;
    p.y = y - aEnd * (0.26 + aSeed * 0.2);
    p.x += aEnd * 0.05;
    vFade = smoothstep(0.0, 1.2, y) * (0.45 + aSeed * 0.55);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,n3=`
  precision highp float;
  uniform vec3 uColor;
  varying float vFade;
  void main() {
    gl_FragColor = vec4(uColor, vFade * 0.24);
  }
`;function i3(r,t,n){const a=new Float32Array(t*2*3),l=new Float32Array(t*2),c=new Float32Array(t*2);for(let w=0;w<t;w++){const y=(Math.random()*2-1)*r.half,x=(Math.random()*2-1)*r.half,N=Math.random();for(let H=0;H<2;H++){const C=(w*2+H)*3;a[C]=y,a[C+1]=0,a[C+2]=x,l[w*2+H]=N,c[w*2+H]=H}}const f=new Nn;f.setAttribute("position",new Xn(a,3)),f.setAttribute("aSeed",new Xn(l,1)),f.setAttribute("aEnd",new Xn(c,1));const m=new Fn({uniforms:{uTime:{value:0},uHeight:{value:r.height},uSpeed:{value:11},uColor:{value:n}},vertexShader:e3,fragmentShader:n3,transparent:!0,depthWrite:!1,blending:Mu}),d=new ny(f,m);d.frustumCulled=!1;const p=90,_=new Float32Array(p*3),v=new Float32Array(p);for(let w=0;w<p;w++)_[w*3]=-6.1+Math.random()*8.2,_[w*3+1]=2.4+Math.random()*.6,_[w*3+2]=-3+Math.random()*.1,v[w]=1.8+Math.random()*1.4;const g=new Nn;g.setAttribute("position",new Xn(_,3));const M=new gx({color:13624565,size:.05,transparent:!0,opacity:.75,depthWrite:!1}),E=new iy(g,M);return E.frustumCulled=!1,{lines:d,drips:E,update:(w,y)=>{m.uniforms.uTime.value=w;const x=g.getAttribute("position"),N=x.array;for(let H=0;H<p;H++)N[H*3+1]-=v[H]*y,N[H*3+1]<.15&&(N[H*3+1]=2.4+Math.random()*.6,N[H*3]=-6.1+Math.random()*8.2);x.needsUpdate=!0},dispose:()=>{f.dispose(),m.dispose(),g.dispose(),M.dispose()}}}const a3=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,s3=`
  precision highp float;
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uSky;
  uniform float uSeed;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;

    float rings = 0.0;
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      vec2 c = vec2(sin(uSeed + fi * 2.3) * 0.45, cos(uSeed * 1.7 + fi * 1.9) * 0.42);
      float d = length(p - c);
      float phase = fract(uTime * 0.55 + fi * 0.31 + uSeed);
      float wave = sin((d - phase * 0.8) * 46.0);
      rings += wave * exp(-abs(d - phase * 0.8) * 16.0) * (1.0 - phase);
    }

    vec3 color = mix(uDeep, uSky, smoothstep(0.1, 1.0, r) * 0.55);
    color += vec3(0.85, 0.9, 1.0) * max(rings, 0.0) * 0.28;
    float alpha = 0.62 * smoothstep(1.0, 0.75, r);
    gl_FragColor = vec4(color, alpha);
  }
`;function r3(r){const t=new Jr,n=[];return r.forEach(([a,l,c,f],m)=>{const d=new Fn({uniforms:{uTime:{value:0},uDeep:{value:new ae(.04,.05,.08)},uSky:{value:new ae(.16,.2,.3)},uSeed:{value:m*1.7}},vertexShader:a3,fragmentShader:s3,transparent:!0,depthWrite:!1});n.push(d);const p=new kn(new kp(1,28),d);p.rotation.x=-Math.PI/2,p.scale.set(c,f,1),p.position.set(a,.026,l),p.renderOrder=4,t.add(p)}),{mesh:t,update:a=>{for(const l of n)l.uniforms.uTime.value=a},dispose:()=>{t.traverse(a=>{const l=a;l.geometry&&l.geometry.dispose()});for(const a of n)a.dispose()}}}const Zr={fov:32,azimuth:.62,elevation:.68,distance:30,target:new J(-.2,.4,-.9)};function o3(r,t,n,a){const l=Math.cos(n)*a;return new J(r.x+l*Math.sin(t),r.y+Math.sin(n)*a,r.z+l*Math.cos(t))}function l3(){const r=Bd.useRef(null);return Bd.useEffect(()=>{const t=r.current;if(!t)return;const n=new vA({antialias:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.setSize(t.clientWidth,t.clientHeight),n.outputColorSpace=li,n.toneMapping=Dp,n.toneMappingExposure=1.5,n.shadowMap.enabled=!0,n.shadowMap.type=ml,t.appendChild(n.domElement);const a=new k1,l=new ae(527122);a.background=l,a.fog=new Gp(658966,30,72);const c=new ci(Zr.fov,t.clientWidth/t.clientHeight,.1,240);c.position.copy(o3(Zr.target,Zr.azimuth,Zr.elevation,Zr.distance));const f=new SA(c,n.domElement);f.target.copy(Zr.target),f.enableDamping=!0,f.dampingFactor=.07,f.rotateSpeed=.65,f.zoomSpeed=.9,f.minDistance=6,f.maxDistance=52,f.minPolarAngle=.12,f.maxPolarAngle=1.46,f.update();const m=new kn(new Wp(90,24,16),jA(new ae(329484),new ae(1186344)));m.renderOrder=-10,a.add(m);const d=new pv(9414860,1.55);d.position.set(12,20,9),d.castShadow=!0,d.shadow.mapSize.set(2048,2048),d.shadow.camera.left=-11,d.shadow.camera.right=11,d.shadow.camera.top=11,d.shadow.camera.bottom=-11,d.shadow.camera.near=2,d.shadow.camera.far=60,d.shadow.bias=-.0026,a.add(d);const p=new pv(6062005,.55);p.position.set(-14,7,-11),a.add(p);const _=new dy(4019320,1317670,1.9);a.add(_);for(let bt=0;bt<3;bt++){const Rt=new $i(14083839,3.6,7.5,2);Rt.position.set(-5.6+bt*1.3,3.7,-2.85),a.add(Rt)}const v=new $i(16765066,5,5.5,2);v.position.set(4.6,2.3,-2.4),a.add(v);const g=new $i(16724e3,3,3.4,2);g.position.set(-4.56,1.2,-4.05),a.add(g);for(const[bt,Rt]of[[-7,2.2],[6.95,3],[-6.95,-3.2],[6.75,-.25]]){const $=new $i(16757084,10,9,2);$.position.set(bt,4.2,Rt),a.add($)}const M=new my(14674431,15,18,.5,.62,1.4);M.position.set(4.8,3.9,3.7),M.target.position.set(.6,0,.4),a.add(M,M.target);const E=new $i(16757084,6,8,2);E.position.set(-6.2,2.6,.7),a.add(E);const w=new $i(16765066,7,8,2);w.position.set(3.36,3.7,5.8),a.add(w);const y=new $i(16760944,9,9,2);y.position.set(-1.5,4.1,-5.4),a.add(y);const x=new $i(12571888,8,9,2);x.position.set(4.6,4.2,-5.2),a.add(x);const N=new $i(16722462,1.1,6,2);N.position.set(-4.45,3.1,4.8),a.add(N);const H=new $i(2774527,1.1,6,2);H.position.set(-3.6,3.1,4.8),a.add(H);const C=new Gu(new io(14.4,14.4),{color:6713471,textureWidth:1024,textureHeight:1024});C.rotation.x=-Math.PI/2,C.position.y=.005,C.renderOrder=-3,a.add(C);const z=QA(),O=Vv(),L=(bt,Rt,$=!0)=>{const pt=new kn(Gv(bt),Rt);pt.castShadow=$,pt.receiveShadow=!0,a.add(pt);const At=new kn(NA(bt),z);return At.renderOrder=1,a.add(At),pt},b=OA();L(b.wet,Vv({transparent:!0,opacity:.55}));const P=b.builder,k={positions:[],normals:[],uvs:[],colors:[],oPositions:[],oNormals:[],oColors:[]};GA(P,k),VA(P,k),WA(P),XA(P),YA(P,k),qA(P,k),kA(P,k),ZA(P,k),L(P,O);const Q=new kn(Gv(k),JA());a.add(Q);const K=r3(b.puddles);a.add(K.mesh);const lt=i3({half:8.2,height:15},2200,new ae(.7,.82,1));a.add(lt.lines,lt.drips);const Z=new Jr,nt=t3();for(const[bt,Rt,$]of[[-2.5,2.6,-.4],[6.5,1.2,-.3],[-.6,.6,3.4]]){const pt=new J1(new hx({map:nt,color:10465476,transparent:!0,opacity:.16,depthWrite:!1}));pt.position.set(bt,Rt,$),pt.scale.set(1.2,1.2,1),Z.add(pt)}a.add(Z);const B=(bt,Rt,$,pt,At=.03)=>{const $t=new kn(new io($*2.2,$*2.2),$A(new ne(bt,Rt),$,new ae(pt),Kt.half,1.5));$t.rotation.x=-Math.PI/2,$t.position.set(bt,At,Rt),$t.renderOrder=5,a.add($t)};B(-7,2.2,2.8,9067046),B(6.95,3,2.8,9067046),B(-6.95,-3.2,2.6,9067046),B(6.75,-.25,2.4,9067046),B(.4,3,2.2,8021300),B(4.8,3.7,3.4,5925504),B(-1.5,-5.4,2.6,9067046,.92),B(4.6,-5.2,2.4,4872816,.92),B(3.4,5.8,1.8,8021300,1.53);const V={last:performance.now()/1e3,elapsed:0};let ft=0,it=0,dt=6+Math.random()*10,D=0;const et=()=>{ft=requestAnimationFrame(et);const bt=performance.now()/1e3,Rt=Math.min(.05,bt-V.last);V.last=bt,V.elapsed+=Rt;const $=V.elapsed;lt.update($,Rt),K.update($);const pt=Math.sin($*1.3)*.02+Math.sin($*7.1)*.008;if(d.intensity=1.55+pt,M.intensity=15+Math.sin($*2.3)*1.6+pt*12,v.intensity=5+(Math.random()>.985?-2.6:0)+Math.sin($*5.3)*.3,D+=Rt,D>.55){D=0;const At=Math.random()>.5;N.intensity=At?1.4:.15,H.intensity=At?.15:1.4}if(dt-=Rt,dt<=0&&(dt=8+Math.random()*18,it=1),it>0){it=Math.max(0,it-Rt*3.2);const At=it*(.6+Math.random()*.4);_.intensity=1.9+At*2.6,l.setRGB(.031+At*.12,.043+At*.14,.07+At*.2)}Z.children.forEach((At,$t)=>{const zt=At,re=($*.32+$t*.37)%1;zt.position.y+=0,zt.material.opacity=.2*(1-re)*(.4+re);const $e=.8+re*1.8;zt.scale.set($e,$e,1),zt.position.y=(zt.userData.baseY??0)+re*1.6}),f.update(),n.render(a,c)};Z.children.forEach(bt=>{bt.userData.baseY=bt.position.y}),et();const vt=()=>{const bt=t.clientWidth,Rt=t.clientHeight;c.aspect=bt/Rt,c.updateProjectionMatrix(),n.setSize(bt,Rt)},wt=new ResizeObserver(vt);return wt.observe(t),()=>{cancelAnimationFrame(ft),wt.disconnect(),f.dispose(),lt.dispose(),K.dispose(),C.dispose(),a.traverse(bt=>{const Rt=bt;Rt.geometry&&Rt.geometry.dispose()}),z.dispose(),O.dispose(),n.dispose(),t.removeChild(n.domElement)}},[]),_l.jsx("div",{className:"world",ref:r})}function c3(){return _l.jsx("div",{className:"app",children:_l.jsx(l3,{})})}const Lx=document.getElementById("root");if(!Lx)throw new Error("The root element is missing");WM.createRoot(Lx).render(_l.jsx(Bd.StrictMode,{children:_l.jsx(c3,{})}));
