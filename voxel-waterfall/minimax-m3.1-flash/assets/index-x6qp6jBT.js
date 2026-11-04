(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var Mh={exports:{}},Fo={};var Kg;function sM(){if(Kg)return Fo;Kg=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Fo.Fragment=t,Fo.jsx=i,Fo.jsxs=i,Fo}var Qg;function rM(){return Qg||(Qg=1,Mh.exports=sM()),Mh.exports}var te=rM(),yh={exports:{}},Ho={},Eh={exports:{}},bh={};var Jg;function oM(){return Jg||(Jg=1,(function(r){function t(B,V){var ot=B.length;B.push(V);t:for(;0<ot;){var et=ot-1>>>1,ut=B[et];if(0<l(ut,V))B[et]=V,B[ot]=ut,ot=et;else break t}}function i(B){return B.length===0?null:B[0]}function s(B){if(B.length===0)return null;var V=B[0],ot=B.pop();if(ot!==V){B[0]=ot;t:for(var et=0,ut=B.length,N=ut>>>1;et<N;){var $=2*(et+1)-1,ht=B[$],Et=$+1,Ct=B[Et];if(0>l(ht,ot))Et<ut&&0>l(Ct,ht)?(B[et]=Ct,B[Et]=ot,et=Et):(B[et]=ht,B[$]=ot,et=$);else if(Et<ut&&0>l(Ct,ot))B[et]=Ct,B[Et]=ot,et=Et;else break t}}return V}function l(B,V){var ot=B.sortIndex-V.sortIndex;return ot!==0?ot:B.id-V.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,p=f.now();r.unstable_now=function(){return f.now()-p}}var m=[],d=[],_=1,v=null,g=3,x=!1,E=!1,R=!1,y=!1,S=typeof setTimeout=="function"?setTimeout:null,P=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function C(B){for(var V=i(d);V!==null;){if(V.callback===null)s(d);else if(V.startTime<=B)s(d),V.sortIndex=V.expirationTime,t(m,V);else break;V=i(d)}}function L(B){if(R=!1,C(B),!E)if(i(m)!==null)E=!0,U||(U=!0,W());else{var V=i(d);V!==null&&Q(L,V.startTime-B)}}var U=!1,O=-1,T=5,D=-1;function F(){return y?!0:!(r.unstable_now()-D<T)}function H(){if(y=!1,U){var B=r.unstable_now();D=B;var V=!0;try{t:{E=!1,R&&(R=!1,P(O),O=-1),x=!0;var ot=g;try{e:{for(C(B),v=i(m);v!==null&&!(v.expirationTime>B&&F());){var et=v.callback;if(typeof et=="function"){v.callback=null,g=v.priorityLevel;var ut=et(v.expirationTime<=B);if(B=r.unstable_now(),typeof ut=="function"){v.callback=ut,C(B),V=!0;break e}v===i(m)&&s(m),C(B)}else s(m);v=i(m)}if(v!==null)V=!0;else{var N=i(d);N!==null&&Q(L,N.startTime-B),V=!1}}break t}finally{v=null,g=ot,x=!1}V=void 0}}finally{V?W():U=!1}}}var W;if(typeof I=="function")W=function(){I(H)};else if(typeof MessageChannel<"u"){var j=new MessageChannel,q=j.port2;j.port1.onmessage=H,W=function(){q.postMessage(null)}}else W=function(){S(H,0)};function Q(B,V){O=S(function(){B(r.unstable_now())},V)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(B){B.callback=null},r.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<B?Math.floor(1e3/B):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(B){switch(g){case 1:case 2:case 3:var V=3;break;default:V=g}var ot=g;g=V;try{return B()}finally{g=ot}},r.unstable_requestPaint=function(){y=!0},r.unstable_runWithPriority=function(B,V){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var ot=g;g=B;try{return V()}finally{g=ot}},r.unstable_scheduleCallback=function(B,V,ot){var et=r.unstable_now();switch(typeof ot=="object"&&ot!==null?(ot=ot.delay,ot=typeof ot=="number"&&0<ot?et+ot:et):ot=et,B){case 1:var ut=-1;break;case 2:ut=250;break;case 5:ut=1073741823;break;case 4:ut=1e4;break;default:ut=5e3}return ut=ot+ut,B={id:_++,callback:V,priorityLevel:B,startTime:ot,expirationTime:ut,sortIndex:-1},ot>et?(B.sortIndex=ot,t(d,B),i(m)===null&&B===i(d)&&(R?(P(O),O=-1):R=!0,Q(L,ot-et))):(B.sortIndex=ut,t(m,B),E||x||(E=!0,U||(U=!0,W()))),B},r.unstable_shouldYield=F,r.unstable_wrapCallback=function(B){var V=g;return function(){var ot=g;g=V;try{return B.apply(this,arguments)}finally{g=ot}}}})(bh)),bh}var jg;function lM(){return jg||(jg=1,Eh.exports=oM()),Eh.exports}var Th={exports:{}},oe={};var $g;function cM(){if($g)return oe;$g=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),g=Symbol.iterator;function x(N){return N===null||typeof N!="object"?null:(N=g&&N[g]||N["@@iterator"],typeof N=="function"?N:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,y={};function S(N,$,ht){this.props=N,this.context=$,this.refs=y,this.updater=ht||E}S.prototype.isReactComponent={},S.prototype.setState=function(N,$){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,$,"setState")},S.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function P(){}P.prototype=S.prototype;function I(N,$,ht){this.props=N,this.context=$,this.refs=y,this.updater=ht||E}var C=I.prototype=new P;C.constructor=I,R(C,S.prototype),C.isPureReactComponent=!0;var L=Array.isArray;function U(){}var O={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function D(N,$,ht){var Et=ht.ref;return{$$typeof:r,type:N,key:$,ref:Et!==void 0?Et:null,props:ht}}function F(N,$){return D(N.type,$,N.props)}function H(N){return typeof N=="object"&&N!==null&&N.$$typeof===r}function W(N){var $={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(ht){return $[ht]})}var j=/\/+/g;function q(N,$){return typeof N=="object"&&N!==null&&N.key!=null?W(""+N.key):$.toString(36)}function Q(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(U,U):(N.status="pending",N.then(function($){N.status==="pending"&&(N.status="fulfilled",N.value=$)},function($){N.status==="pending"&&(N.status="rejected",N.reason=$)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function B(N,$,ht,Et,Ct){var It=typeof N;(It==="undefined"||It==="boolean")&&(N=null);var at=!1;if(N===null)at=!0;else switch(It){case"bigint":case"string":case"number":at=!0;break;case"object":switch(N.$$typeof){case r:case t:at=!0;break;case _:return at=N._init,B(at(N._payload),$,ht,Et,Ct)}}if(at)return Ct=Ct(N),at=Et===""?"."+q(N,0):Et,L(Ct)?(ht="",at!=null&&(ht=at.replace(j,"$&/")+"/"),B(Ct,$,ht,"",function(jt){return jt})):Ct!=null&&(H(Ct)&&(Ct=F(Ct,ht+(Ct.key==null||N&&N.key===Ct.key?"":(""+Ct.key).replace(j,"$&/")+"/")+at)),$.push(Ct)),1;at=0;var pt=Et===""?".":Et+":";if(L(N))for(var bt=0;bt<N.length;bt++)Et=N[bt],It=pt+q(Et,bt),at+=B(Et,$,ht,It,Ct);else if(bt=x(N),typeof bt=="function")for(N=bt.call(N),bt=0;!(Et=N.next()).done;)Et=Et.value,It=pt+q(Et,bt++),at+=B(Et,$,ht,It,Ct);else if(It==="object"){if(typeof N.then=="function")return B(Q(N),$,ht,Et,Ct);throw $=String(N),Error("Objects are not valid as a React child (found: "+($==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":$)+"). If you meant to render a collection of children, use an array instead.")}return at}function V(N,$,ht){if(N==null)return N;var Et=[],Ct=0;return B(N,Et,"","",function(It){return $.call(ht,It,Ct++)}),Et}function ot(N){if(N._status===-1){var $=N._result;$=$(),$.then(function(ht){(N._status===0||N._status===-1)&&(N._status=1,N._result=ht)},function(ht){(N._status===0||N._status===-1)&&(N._status=2,N._result=ht)}),N._status===-1&&(N._status=0,N._result=$)}if(N._status===1)return N._result.default;throw N._result}var et=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var $=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent($))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},ut={map:V,forEach:function(N,$,ht){V(N,function(){$.apply(this,arguments)},ht)},count:function(N){var $=0;return V(N,function(){$++}),$},toArray:function(N){return V(N,function($){return $})||[]},only:function(N){if(!H(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return oe.Activity=v,oe.Children=ut,oe.Component=S,oe.Fragment=i,oe.Profiler=l,oe.PureComponent=I,oe.StrictMode=s,oe.Suspense=m,oe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,oe.__COMPILER_RUNTIME={__proto__:null,c:function(N){return O.H.useMemoCache(N)}},oe.cache=function(N){return function(){return N.apply(null,arguments)}},oe.cacheSignal=function(){return null},oe.cloneElement=function(N,$,ht){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var Et=R({},N.props),Ct=N.key;if($!=null)for(It in $.key!==void 0&&(Ct=""+$.key),$)!T.call($,It)||It==="key"||It==="__self"||It==="__source"||It==="ref"&&$.ref===void 0||(Et[It]=$[It]);var It=arguments.length-2;if(It===1)Et.children=ht;else if(1<It){for(var at=Array(It),pt=0;pt<It;pt++)at[pt]=arguments[pt+2];Et.children=at}return D(N.type,Ct,Et)},oe.createContext=function(N){return N={$$typeof:f,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:c,_context:N},N},oe.createElement=function(N,$,ht){var Et,Ct={},It=null;if($!=null)for(Et in $.key!==void 0&&(It=""+$.key),$)T.call($,Et)&&Et!=="key"&&Et!=="__self"&&Et!=="__source"&&(Ct[Et]=$[Et]);var at=arguments.length-2;if(at===1)Ct.children=ht;else if(1<at){for(var pt=Array(at),bt=0;bt<at;bt++)pt[bt]=arguments[bt+2];Ct.children=pt}if(N&&N.defaultProps)for(Et in at=N.defaultProps,at)Ct[Et]===void 0&&(Ct[Et]=at[Et]);return D(N,It,Ct)},oe.createRef=function(){return{current:null}},oe.forwardRef=function(N){return{$$typeof:p,render:N}},oe.isValidElement=H,oe.lazy=function(N){return{$$typeof:_,_payload:{_status:-1,_result:N},_init:ot}},oe.memo=function(N,$){return{$$typeof:d,type:N,compare:$===void 0?null:$}},oe.startTransition=function(N){var $=O.T,ht={};O.T=ht;try{var Et=N(),Ct=O.S;Ct!==null&&Ct(ht,Et),typeof Et=="object"&&Et!==null&&typeof Et.then=="function"&&Et.then(U,et)}catch(It){et(It)}finally{$!==null&&ht.types!==null&&($.types=ht.types),O.T=$}},oe.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},oe.use=function(N){return O.H.use(N)},oe.useActionState=function(N,$,ht){return O.H.useActionState(N,$,ht)},oe.useCallback=function(N,$){return O.H.useCallback(N,$)},oe.useContext=function(N){return O.H.useContext(N)},oe.useDebugValue=function(){},oe.useDeferredValue=function(N,$){return O.H.useDeferredValue(N,$)},oe.useEffect=function(N,$){return O.H.useEffect(N,$)},oe.useEffectEvent=function(N){return O.H.useEffectEvent(N)},oe.useId=function(){return O.H.useId()},oe.useImperativeHandle=function(N,$,ht){return O.H.useImperativeHandle(N,$,ht)},oe.useInsertionEffect=function(N,$){return O.H.useInsertionEffect(N,$)},oe.useLayoutEffect=function(N,$){return O.H.useLayoutEffect(N,$)},oe.useMemo=function(N,$){return O.H.useMemo(N,$)},oe.useOptimistic=function(N,$){return O.H.useOptimistic(N,$)},oe.useReducer=function(N,$,ht){return O.H.useReducer(N,$,ht)},oe.useRef=function(N){return O.H.useRef(N)},oe.useState=function(N){return O.H.useState(N)},oe.useSyncExternalStore=function(N,$,ht){return O.H.useSyncExternalStore(N,$,ht)},oe.useTransition=function(){return O.H.useTransition()},oe.version="19.2.9",oe}var t_;function qd(){return t_||(t_=1,Th.exports=cM()),Th.exports}var Ah={exports:{}},zn={};var e_;function uM(){if(e_)return zn;e_=1;var r=qd();function t(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)d+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,d,_){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:d,implementation:_}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,zn.createPortal=function(m,d){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(t(299));return c(m,d,null,_)},zn.flushSync=function(m){var d=f.T,_=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=d,s.p=_,s.d.f()}},zn.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,s.d.C(m,d))},zn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},zn.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var _=d.as,v=p(_,d.crossOrigin),g=typeof d.integrity=="string"?d.integrity:void 0,x=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;_==="style"?s.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:v,integrity:g,fetchPriority:x}):_==="script"&&s.d.X(m,{crossOrigin:v,integrity:g,fetchPriority:x,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},zn.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var _=p(d.as,d.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&s.d.M(m)},zn.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var _=d.as,v=p(_,d.crossOrigin);s.d.L(m,_,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},zn.preloadModule=function(m,d){if(typeof m=="string")if(d){var _=p(d.as,d.crossOrigin);s.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else s.d.m(m)},zn.requestFormReset=function(m){s.d.r(m)},zn.unstable_batchedUpdates=function(m,d){return m(d)},zn.useFormState=function(m,d,_){return f.H.useFormState(m,d,_)},zn.useFormStatus=function(){return f.H.useHostTransitionStatus()},zn.version="19.2.9",zn}var n_;function fM(){if(n_)return Ah.exports;n_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Ah.exports=uM(),Ah.exports}var i_;function hM(){if(i_)return Ho;i_=1;var r=lM(),t=qd(),i=fM();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function d(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===a)return m(u),e;if(h===o)return m(u),n;h=h.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=h;else{for(var M=!1,w=u.child;w;){if(w===a){M=!0,a=u,o=h;break}if(w===o){M=!0,o=u,a=h;break}w=w.sibling}if(!M){for(w=h.child;w;){if(w===a){M=!0,a=h,o=u;break}if(w===o){M=!0,o=h,a=u;break}w=w.sibling}if(!M)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function _(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=_(e),n!==null)return n;e=e.sibling}return null}var v=Object.assign,g=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),P=Symbol.for("react.consumer"),I=Symbol.for("react.context"),C=Symbol.for("react.forward_ref"),L=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),F=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function W(e){return e===null||typeof e!="object"?null:(e=H&&e[H]||e["@@iterator"],typeof e=="function"?e:null)}var j=Symbol.for("react.client.reference");function q(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===j?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case R:return"Fragment";case S:return"Profiler";case y:return"StrictMode";case L:return"Suspense";case U:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case I:return e.displayName||"Context";case P:return(e._context.displayName||"Context")+".Consumer";case C:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case O:return n=e.displayName||null,n!==null?n:q(e.type)||"Memo";case T:n=e._payload,e=e._init;try{return q(e(n))}catch{}}return null}var Q=Array.isArray,B=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ot={pending:!1,data:null,method:null,action:null},et=[],ut=-1;function N(e){return{current:e}}function $(e){0>ut||(e.current=et[ut],et[ut]=null,ut--)}function ht(e,n){ut++,et[ut]=e.current,e.current=n}var Et=N(null),Ct=N(null),It=N(null),at=N(null);function pt(e,n){switch(ht(It,n),ht(Ct,e),ht(Et,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?vg(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=vg(n),e=Sg(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}$(Et),ht(Et,e)}function bt(){$(Et),$(Ct),$(It)}function jt(e){e.memoizedState!==null&&ht(at,e);var n=Et.current,a=Sg(n,e.type);n!==a&&(ht(Ct,e),ht(Et,a))}function Ot(e){Ct.current===e&&($(Et),$(Ct)),at.current===e&&($(at),Po._currentValue=ot)}var se,Ze;function re(e){if(se===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);se=n&&n[1]||"",Ze=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+se+e+Ze}var xe=!1;function Ne(e,n){if(!e||xe)return"";xe=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var Mt=function(){throw Error()};if(Object.defineProperty(Mt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Mt,[])}catch(dt){var ct=dt}Reflect.construct(e,[],Mt)}else{try{Mt.call()}catch(dt){ct=dt}e.call(Mt.prototype)}}else{try{throw Error()}catch(dt){ct=dt}(Mt=e())&&typeof Mt.catch=="function"&&Mt.catch(function(){})}}catch(dt){if(dt&&ct&&typeof dt.stack=="string")return[dt.stack,ct.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),M=h[0],w=h[1];if(M&&w){var G=M.split(`
`),rt=w.split(`
`);for(u=o=0;o<G.length&&!G[o].includes("DetermineComponentFrameRoot");)o++;for(;u<rt.length&&!rt[u].includes("DetermineComponentFrameRoot");)u++;if(o===G.length||u===rt.length)for(o=G.length-1,u=rt.length-1;1<=o&&0<=u&&G[o]!==rt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(G[o]!==rt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||G[o]!==rt[u]){var vt=`
`+G[o].replace(" at new "," at ");return e.displayName&&vt.includes("<anonymous>")&&(vt=vt.replace("<anonymous>",e.displayName)),vt}while(1<=o&&0<=u);break}}}finally{xe=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?re(a):""}function ge(e,n){switch(e.tag){case 26:case 27:case 5:return re(e.type);case 16:return re("Lazy");case 13:return e.child!==n&&n!==null?re("Suspense Fallback"):re("Suspense");case 19:return re("SuspenseList");case 0:case 15:return Ne(e.type,!1);case 11:return Ne(e.type.render,!1);case 1:return Ne(e.type,!0);case 31:return re("Activity");default:return""}}function Xe(e){try{var n="",a=null;do n+=ge(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var nn=Object.prototype.hasOwnProperty,bn=r.unstable_scheduleCallback,We=r.unstable_cancelCallback,an=r.unstable_shouldYield,Z=r.unstable_requestPaint,Oe=r.unstable_now,De=r.unstable_getCurrentPriorityLevel,z=r.unstable_ImmediatePriority,b=r.unstable_UserBlockingPriority,J=r.unstable_NormalPriority,lt=r.unstable_LowPriority,mt=r.unstable_IdlePriority,Tt=r.log,Dt=r.unstable_setDisableYieldValue,gt=null,_t=null;function At(e){if(typeof Tt=="function"&&Dt(e),_t&&typeof _t.setStrictMode=="function")try{_t.setStrictMode(gt,e)}catch{}}var Gt=Math.clz32?Math.clz32:Qt,Nt=Math.log,Ut=Math.LN2;function Qt(e){return e>>>=0,e===0?32:31-(Nt(e)/Ut|0)|0}var Jt=256,ne=262144,Y=4194304;function Rt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function St(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,M=e.pingedLanes;e=e.warmLanes;var w=o&134217727;return w!==0?(o=w&~h,o!==0?u=Rt(o):(M&=w,M!==0?u=Rt(M):a||(a=w&~e,a!==0&&(u=Rt(a))))):(w=o&~h,w!==0?u=Rt(w):M!==0?u=Rt(M):a||(a=o&~e,a!==0&&(u=Rt(a)))),u===0?0:n!==0&&n!==u&&(n&h)===0&&(h=u&-u,a=n&-n,h>=a||h===32&&(a&4194048)!==0)?n:u}function wt(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Bt(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yt(){var e=Y;return Y<<=1,(Y&62914560)===0&&(Y=4194304),e}function Zt(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function Xt(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fe(e,n,a,o,u,h){var M=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var w=e.entanglements,G=e.expirationTimes,rt=e.hiddenUpdates;for(a=M&~a;0<a;){var vt=31-Gt(a),Mt=1<<vt;w[vt]=0,G[vt]=-1;var ct=rt[vt];if(ct!==null)for(rt[vt]=null,vt=0;vt<ct.length;vt++){var dt=ct[vt];dt!==null&&(dt.lane&=-536870913)}a&=~Mt}o!==0&&Te(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(M&~n))}function Te(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-Gt(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function qn(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-Gt(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function ii(e,n){var a=n&-n;return a=(a&42)!==0?1:qr(a),(a&(e.suspendedLanes|n))!==0?0:a}function qr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Zr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Kr(){var e=V.p;return e!==0?e:(e=window.event,e===void 0?32:Vg(e.type))}function Ws(e,n){var a=V.p;try{return V.p=e,n()}finally{V.p=a}}var Gi=Math.random().toString(36).slice(2),un="__reactFiber$"+Gi,wn="__reactProps$"+Gi,Zn="__reactContainer$"+Gi,ms="__reactEvents$"+Gi,dl="__reactListeners$"+Gi,pl="__reactHandles$"+Gi,gs="__reactResources$"+Gi,Na="__reactMarker$"+Gi;function Oa(e){delete e[un],delete e[wn],delete e[ms],delete e[dl],delete e[pl]}function na(e){var n=e[un];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Zn]||a[un]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=Ag(e);e!==null;){if(a=e[un])return a;e=Ag(e)}return n}e=a,a=e.parentNode}return null}function ia(e){if(e=e[un]||e[Zn]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function _s(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Pa(e){var n=e[gs];return n||(n=e[gs]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function fn(e){e[Na]=!0}var ml=new Set,Qr={};function A(e,n){k(e,n),k(e+"Capture",n)}function k(e,n){for(Qr[e]=n,e=0;e<n.length;e++)ml.add(n[e])}var ft=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),nt={},it={};function Pt(e){return nn.call(it,e)?!0:nn.call(nt,e)?!1:ft.test(e)?it[e]=!0:(nt[e]=!0,!1)}function Vt(e,n,a){if(Pt(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Lt(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Ft(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function Ht(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ce(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function me(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(M){a=""+M,h.call(this,M)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(M){a=""+M},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Wt(e){if(!e._valueTracker){var n=ce(e)?"checked":"value";e._valueTracker=me(e,n,""+e[n])}}function Ae(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=ce(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function Ke(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ye=/[\n"\\]/g;function he(e){return e.replace(Ye,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function hn(e,n,a,o,u,h,M,w){e.name="",M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"?e.type=M:e.removeAttribute("type"),n!=null?M==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Ht(n)):e.value!==""+Ht(n)&&(e.value=""+Ht(n)):M!=="submit"&&M!=="reset"||e.removeAttribute("value"),n!=null?vn(e,M,Ht(n)):a!=null?vn(e,M,Ht(a)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?e.name=""+Ht(w):e.removeAttribute("name")}function kt(e,n,a,o,u,h,M,w){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),n!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){Wt(e);return}a=a!=null?""+Ht(a):"",n=n!=null?""+Ht(n):a,w||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=w?e.checked:!!o,e.defaultChecked=!!o,M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"&&(e.name=M),Wt(e)}function vn(e,n,a){n==="number"&&Ke(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function de(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+Ht(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Gn(e,n,a){if(n!=null&&(n=""+Ht(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+Ht(a):""}function ai(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(Q(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=Ht(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Wt(e)}function Vn(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var za=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ue(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||za.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function je(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Ue(e,u,o)}else for(var h in n)n.hasOwnProperty(h)&&Ue(e,h,n[h])}function gi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var He=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Vi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function wi(e){return Vi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function _i(){}var _u=null;function vu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ys=null,qs=null;function _p(e){var n=ia(e);if(n&&(e=n.stateNode)){var a=e[wn]||null;t:switch(e=n.stateNode,n.type){case"input":if(hn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+he(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[wn]||null;if(!u)throw Error(s(90));hn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&Ae(o)}break t;case"textarea":Gn(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&de(e,!!a.multiple,n,!1)}}}var Su=!1;function vp(e,n,a){if(Su)return e(n,a);Su=!0;try{var o=e(n);return o}finally{if(Su=!1,(Ys!==null||qs!==null)&&(nc(),Ys&&(n=Ys,e=qs,qs=Ys=null,_p(n),e)))for(n=0;n<e.length;n++)_p(e[n])}}function Jr(e,n){var a=e.stateNode;if(a===null)return null;var o=a[wn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var aa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xu=!1;if(aa)try{var jr={};Object.defineProperty(jr,"passive",{get:function(){xu=!0}}),window.addEventListener("test",jr,jr),window.removeEventListener("test",jr,jr)}catch{xu=!1}var Ia=null,Mu=null,gl=null;function Sp(){if(gl)return gl;var e,n=Mu,a=n.length,o,u="value"in Ia?Ia.value:Ia.textContent,h=u.length;for(e=0;e<a&&n[e]===u[e];e++);var M=a-e;for(o=1;o<=M&&n[a-o]===u[h-o];o++);return gl=u.slice(e,1<o?1-o:void 0)}function _l(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function vl(){return!0}function xp(){return!1}function Kn(e){function n(a,o,u,h,M){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=M,this.currentTarget=null;for(var w in e)e.hasOwnProperty(w)&&(a=e[w],this[w]=a?a(h):h[w]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?vl:xp,this.isPropagationStopped=xp,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=vl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=vl)},persist:function(){},isPersistent:vl}),n}var vs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Sl=Kn(vs),$r=v({},vs,{view:0,detail:0}),iS=Kn($r),yu,Eu,to,xl=v({},$r,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==to&&(to&&e.type==="mousemove"?(yu=e.screenX-to.screenX,Eu=e.screenY-to.screenY):Eu=yu=0,to=e),yu)},movementY:function(e){return"movementY"in e?e.movementY:Eu}}),Mp=Kn(xl),aS=v({},xl,{dataTransfer:0}),sS=Kn(aS),rS=v({},$r,{relatedTarget:0}),bu=Kn(rS),oS=v({},vs,{animationName:0,elapsedTime:0,pseudoElement:0}),lS=Kn(oS),cS=v({},vs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),uS=Kn(cS),fS=v({},vs,{data:0}),yp=Kn(fS),hS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},dS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},pS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function mS(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=pS[e])?!!n[e]:!1}function Tu(){return mS}var gS=v({},$r,{key:function(e){if(e.key){var n=hS[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=_l(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?dS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tu,charCode:function(e){return e.type==="keypress"?_l(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?_l(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),_S=Kn(gS),vS=v({},xl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ep=Kn(vS),SS=v({},$r,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tu}),xS=Kn(SS),MS=v({},vs,{propertyName:0,elapsedTime:0,pseudoElement:0}),yS=Kn(MS),ES=v({},xl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),bS=Kn(ES),TS=v({},vs,{newState:0,oldState:0}),AS=Kn(TS),RS=[9,13,27,32],Au=aa&&"CompositionEvent"in window,eo=null;aa&&"documentMode"in document&&(eo=document.documentMode);var CS=aa&&"TextEvent"in window&&!eo,bp=aa&&(!Au||eo&&8<eo&&11>=eo),Tp=" ",Ap=!1;function Rp(e,n){switch(e){case"keyup":return RS.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Cp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Zs=!1;function wS(e,n){switch(e){case"compositionend":return Cp(n);case"keypress":return n.which!==32?null:(Ap=!0,Tp);case"textInput":return e=n.data,e===Tp&&Ap?null:e;default:return null}}function DS(e,n){if(Zs)return e==="compositionend"||!Au&&Rp(e,n)?(e=Sp(),gl=Mu=Ia=null,Zs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return bp&&n.locale!=="ko"?null:n.data;default:return null}}var US={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wp(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!US[e.type]:n==="textarea"}function Dp(e,n,a,o){Ys?qs?qs.push(o):qs=[o]:Ys=o,n=cc(n,"onChange"),0<n.length&&(a=new Sl("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var no=null,io=null;function LS(e){hg(e,0)}function Ml(e){var n=_s(e);if(Ae(n))return e}function Up(e,n){if(e==="change")return n}var Lp=!1;if(aa){var Ru;if(aa){var Cu="oninput"in document;if(!Cu){var Np=document.createElement("div");Np.setAttribute("oninput","return;"),Cu=typeof Np.oninput=="function"}Ru=Cu}else Ru=!1;Lp=Ru&&(!document.documentMode||9<document.documentMode)}function Op(){no&&(no.detachEvent("onpropertychange",Pp),io=no=null)}function Pp(e){if(e.propertyName==="value"&&Ml(io)){var n=[];Dp(n,io,e,vu(e)),vp(LS,n)}}function NS(e,n,a){e==="focusin"?(Op(),no=n,io=a,no.attachEvent("onpropertychange",Pp)):e==="focusout"&&Op()}function OS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ml(io)}function PS(e,n){if(e==="click")return Ml(n)}function zS(e,n){if(e==="input"||e==="change")return Ml(n)}function IS(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var si=typeof Object.is=="function"?Object.is:IS;function ao(e,n){if(si(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!nn.call(n,u)||!si(e[u],n[u]))return!1}return!0}function zp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ip(e,n){var a=zp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=zp(a)}}function Bp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Bp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Fp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Ke(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=Ke(e.document)}return n}function wu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var BS=aa&&"documentMode"in document&&11>=document.documentMode,Ks=null,Du=null,so=null,Uu=!1;function Hp(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Uu||Ks==null||Ks!==Ke(o)||(o=Ks,"selectionStart"in o&&wu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),so&&ao(so,o)||(so=o,o=cc(Du,"onSelect"),0<o.length&&(n=new Sl("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Ks)))}function Ss(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Qs={animationend:Ss("Animation","AnimationEnd"),animationiteration:Ss("Animation","AnimationIteration"),animationstart:Ss("Animation","AnimationStart"),transitionrun:Ss("Transition","TransitionRun"),transitionstart:Ss("Transition","TransitionStart"),transitioncancel:Ss("Transition","TransitionCancel"),transitionend:Ss("Transition","TransitionEnd")},Lu={},Gp={};aa&&(Gp=document.createElement("div").style,"AnimationEvent"in window||(delete Qs.animationend.animation,delete Qs.animationiteration.animation,delete Qs.animationstart.animation),"TransitionEvent"in window||delete Qs.transitionend.transition);function xs(e){if(Lu[e])return Lu[e];if(!Qs[e])return e;var n=Qs[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Gp)return Lu[e]=n[a];return e}var Vp=xs("animationend"),kp=xs("animationiteration"),Xp=xs("animationstart"),FS=xs("transitionrun"),HS=xs("transitionstart"),GS=xs("transitioncancel"),Wp=xs("transitionend"),Yp=new Map,Nu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Nu.push("scrollEnd");function Di(e,n){Yp.set(e,n),A(n,[e])}var yl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},vi=[],Js=0,Ou=0;function El(){for(var e=Js,n=Ou=Js=0;n<e;){var a=vi[n];vi[n++]=null;var o=vi[n];vi[n++]=null;var u=vi[n];vi[n++]=null;var h=vi[n];if(vi[n++]=null,o!==null&&u!==null){var M=o.pending;M===null?u.next=u:(u.next=M.next,M.next=u),o.pending=u}h!==0&&qp(a,u,h)}}function bl(e,n,a,o){vi[Js++]=e,vi[Js++]=n,vi[Js++]=a,vi[Js++]=o,Ou|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Pu(e,n,a,o){return bl(e,n,a,o),Tl(e)}function Ms(e,n){return bl(e,null,null,n),Tl(e)}function qp(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,h=e.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&n!==null&&(u=31-Gt(a),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),h):null}function Tl(e){if(50<Co)throw Co=0,Wf=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var js={};function VS(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(e,n,a,o){return new VS(e,n,a,o)}function zu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function sa(e,n){var a=e.alternate;return a===null?(a=ri(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Zp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Al(e,n,a,o,u,h){var M=0;if(o=e,typeof e=="function")zu(e)&&(M=1);else if(typeof e=="string")M=qx(e,a,Et.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=ri(31,a,n,u),e.elementType=D,e.lanes=h,e;case R:return ys(a.children,u,h,n);case y:M=8,u|=24;break;case S:return e=ri(12,a,n,u|2),e.elementType=S,e.lanes=h,e;case L:return e=ri(13,a,n,u),e.elementType=L,e.lanes=h,e;case U:return e=ri(19,a,n,u),e.elementType=U,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case I:M=10;break t;case P:M=9;break t;case C:M=11;break t;case O:M=14;break t;case T:M=16,o=null;break t}M=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=ri(M,a,n,u),n.elementType=e,n.type=o,n.lanes=h,n}function ys(e,n,a,o){return e=ri(7,e,o,n),e.lanes=a,e}function Iu(e,n,a){return e=ri(6,e,null,n),e.lanes=a,e}function Kp(e){var n=ri(18,null,null,0);return n.stateNode=e,n}function Bu(e,n,a){return n=ri(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Qp=new WeakMap;function Si(e,n){if(typeof e=="object"&&e!==null){var a=Qp.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Xe(n)},Qp.set(e,n),n)}return{value:e,source:n,stack:Xe(n)}}var $s=[],tr=0,Rl=null,ro=0,xi=[],Mi=0,Ba=null,ki=1,Xi="";function ra(e,n){$s[tr++]=ro,$s[tr++]=Rl,Rl=e,ro=n}function Jp(e,n,a){xi[Mi++]=ki,xi[Mi++]=Xi,xi[Mi++]=Ba,Ba=e;var o=ki;e=Xi;var u=32-Gt(o)-1;o&=~(1<<u),a+=1;var h=32-Gt(n)+u;if(30<h){var M=u-u%5;h=(o&(1<<M)-1).toString(32),o>>=M,u-=M,ki=1<<32-Gt(n)+u|a<<u|o,Xi=h+e}else ki=1<<h|a<<u|o,Xi=e}function Fu(e){e.return!==null&&(ra(e,1),Jp(e,1,0))}function Hu(e){for(;e===Rl;)Rl=$s[--tr],$s[tr]=null,ro=$s[--tr],$s[tr]=null;for(;e===Ba;)Ba=xi[--Mi],xi[Mi]=null,Xi=xi[--Mi],xi[Mi]=null,ki=xi[--Mi],xi[Mi]=null}function jp(e,n){xi[Mi++]=ki,xi[Mi++]=Xi,xi[Mi++]=Ba,ki=n.id,Xi=n.overflow,Ba=e}var Dn=null,Qe=null,Ee=!1,Fa=null,yi=!1,Gu=Error(s(519));function Ha(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw oo(Si(n,e)),Gu}function $p(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[un]=e,n[wn]=o,a){case"dialog":Se("cancel",n),Se("close",n);break;case"iframe":case"object":case"embed":Se("load",n);break;case"video":case"audio":for(a=0;a<Do.length;a++)Se(Do[a],n);break;case"source":Se("error",n);break;case"img":case"image":case"link":Se("error",n),Se("load",n);break;case"details":Se("toggle",n);break;case"input":Se("invalid",n),kt(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Se("invalid",n);break;case"textarea":Se("invalid",n),ai(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||gg(n.textContent,a)?(o.popover!=null&&(Se("beforetoggle",n),Se("toggle",n)),o.onScroll!=null&&Se("scroll",n),o.onScrollEnd!=null&&Se("scrollend",n),o.onClick!=null&&(n.onclick=_i),n=!0):n=!1,n||Ha(e,!0)}function tm(e){for(Dn=e.return;Dn;)switch(Dn.tag){case 5:case 31:case 13:yi=!1;return;case 27:case 3:yi=!0;return;default:Dn=Dn.return}}function er(e){if(e!==Dn)return!1;if(!Ee)return tm(e),Ee=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||rh(e.type,e.memoizedProps)),a=!a),a&&Qe&&Ha(e),tm(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Qe=Tg(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Qe=Tg(e)}else n===27?(n=Qe,ts(e.type)?(e=fh,fh=null,Qe=e):Qe=n):Qe=Dn?bi(e.stateNode.nextSibling):null;return!0}function Es(){Qe=Dn=null,Ee=!1}function Vu(){var e=Fa;return e!==null&&($n===null?$n=e:$n.push.apply($n,e),Fa=null),e}function oo(e){Fa===null?Fa=[e]:Fa.push(e)}var ku=N(null),bs=null,oa=null;function Ga(e,n,a){ht(ku,n._currentValue),n._currentValue=a}function la(e){e._currentValue=ku.current,$(ku)}function Xu(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function Wu(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var M=u.child;h=h.firstContext;t:for(;h!==null;){var w=h;h=u;for(var G=0;G<n.length;G++)if(w.context===n[G]){h.lanes|=a,w=h.alternate,w!==null&&(w.lanes|=a),Xu(h.return,a,e),o||(M=null);break t}h=w.next}}else if(u.tag===18){if(M=u.return,M===null)throw Error(s(341));M.lanes|=a,h=M.alternate,h!==null&&(h.lanes|=a),Xu(M,a,e),M=null}else M=u.child;if(M!==null)M.return=u;else for(M=u;M!==null;){if(M===e){M=null;break}if(u=M.sibling,u!==null){u.return=M.return,M=u;break}M=M.return}u=M}}function nr(e,n,a,o){e=null;for(var u=n,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var M=u.alternate;if(M===null)throw Error(s(387));if(M=M.memoizedProps,M!==null){var w=u.type;si(u.pendingProps.value,M.value)||(e!==null?e.push(w):e=[w])}}else if(u===at.current){if(M=u.alternate,M===null)throw Error(s(387));M.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Po):e=[Po])}u=u.return}e!==null&&Wu(n,e,a,o),n.flags|=262144}function Cl(e){for(e=e.firstContext;e!==null;){if(!si(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ts(e){bs=e,oa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Un(e){return em(bs,e)}function wl(e,n){return bs===null&&Ts(e),em(e,n)}function em(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},oa===null){if(e===null)throw Error(s(308));oa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else oa=oa.next=n;return a}var kS=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},XS=r.unstable_scheduleCallback,WS=r.unstable_NormalPriority,dn={$$typeof:I,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Yu(){return{controller:new kS,data:new Map,refCount:0}}function lo(e){e.refCount--,e.refCount===0&&XS(WS,function(){e.controller.abort()})}var co=null,qu=0,ir=0,ar=null;function YS(e,n){if(co===null){var a=co=[];qu=0,ir=Jf(),ar={status:"pending",value:void 0,then:function(o){a.push(o)}}}return qu++,n.then(nm,nm),n}function nm(){if(--qu===0&&co!==null){ar!==null&&(ar.status="fulfilled");var e=co;co=null,ir=0,ar=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function qS(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var im=B.S;B.S=function(e,n){H0=Oe(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&YS(e,n),im!==null&&im(e,n)};var As=N(null);function Zu(){var e=As.current;return e!==null?e:qe.pooledCache}function Dl(e,n){n===null?ht(As,As.current):ht(As,n.pool)}function am(){var e=Zu();return e===null?null:{parent:dn._currentValue,pool:e}}var sr=Error(s(460)),Ku=Error(s(474)),Ul=Error(s(542)),Ll={then:function(){}};function sm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function rm(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(_i,_i),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,lm(e),e;default:if(typeof n.status=="string")n.then(_i,_i);else{if(e=qe,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,lm(e),e}throw Cs=n,sr}}function Rs(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Cs=a,sr):a}}var Cs=null;function om(){if(Cs===null)throw Error(s(459));var e=Cs;return Cs=null,e}function lm(e){if(e===sr||e===Ul)throw Error(s(483))}var rr=null,uo=0;function Nl(e){var n=uo;return uo+=1,rr===null&&(rr=[]),rm(rr,e,n)}function fo(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Ol(e,n){throw n.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function cm(e){function n(K,X){if(e){var st=K.deletions;st===null?(K.deletions=[X],K.flags|=16):st.push(X)}}function a(K,X){if(!e)return null;for(;X!==null;)n(K,X),X=X.sibling;return null}function o(K){for(var X=new Map;K!==null;)K.key!==null?X.set(K.key,K):X.set(K.index,K),K=K.sibling;return X}function u(K,X){return K=sa(K,X),K.index=0,K.sibling=null,K}function h(K,X,st){return K.index=st,e?(st=K.alternate,st!==null?(st=st.index,st<X?(K.flags|=67108866,X):st):(K.flags|=67108866,X)):(K.flags|=1048576,X)}function M(K){return e&&K.alternate===null&&(K.flags|=67108866),K}function w(K,X,st,xt){return X===null||X.tag!==6?(X=Iu(st,K.mode,xt),X.return=K,X):(X=u(X,st),X.return=K,X)}function G(K,X,st,xt){var $t=st.type;return $t===R?vt(K,X,st.props.children,xt,st.key):X!==null&&(X.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===T&&Rs($t)===X.type)?(X=u(X,st.props),fo(X,st),X.return=K,X):(X=Al(st.type,st.key,st.props,null,K.mode,xt),fo(X,st),X.return=K,X)}function rt(K,X,st,xt){return X===null||X.tag!==4||X.stateNode.containerInfo!==st.containerInfo||X.stateNode.implementation!==st.implementation?(X=Bu(st,K.mode,xt),X.return=K,X):(X=u(X,st.children||[]),X.return=K,X)}function vt(K,X,st,xt,$t){return X===null||X.tag!==7?(X=ys(st,K.mode,xt,$t),X.return=K,X):(X=u(X,st),X.return=K,X)}function Mt(K,X,st){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=Iu(""+X,K.mode,st),X.return=K,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case x:return st=Al(X.type,X.key,X.props,null,K.mode,st),fo(st,X),st.return=K,st;case E:return X=Bu(X,K.mode,st),X.return=K,X;case T:return X=Rs(X),Mt(K,X,st)}if(Q(X)||W(X))return X=ys(X,K.mode,st,null),X.return=K,X;if(typeof X.then=="function")return Mt(K,Nl(X),st);if(X.$$typeof===I)return Mt(K,wl(K,X),st);Ol(K,X)}return null}function ct(K,X,st,xt){var $t=X!==null?X.key:null;if(typeof st=="string"&&st!==""||typeof st=="number"||typeof st=="bigint")return $t!==null?null:w(K,X,""+st,xt);if(typeof st=="object"&&st!==null){switch(st.$$typeof){case x:return st.key===$t?G(K,X,st,xt):null;case E:return st.key===$t?rt(K,X,st,xt):null;case T:return st=Rs(st),ct(K,X,st,xt)}if(Q(st)||W(st))return $t!==null?null:vt(K,X,st,xt,null);if(typeof st.then=="function")return ct(K,X,Nl(st),xt);if(st.$$typeof===I)return ct(K,X,wl(K,st),xt);Ol(K,st)}return null}function dt(K,X,st,xt,$t){if(typeof xt=="string"&&xt!==""||typeof xt=="number"||typeof xt=="bigint")return K=K.get(st)||null,w(X,K,""+xt,$t);if(typeof xt=="object"&&xt!==null){switch(xt.$$typeof){case x:return K=K.get(xt.key===null?st:xt.key)||null,G(X,K,xt,$t);case E:return K=K.get(xt.key===null?st:xt.key)||null,rt(X,K,xt,$t);case T:return xt=Rs(xt),dt(K,X,st,xt,$t)}if(Q(xt)||W(xt))return K=K.get(st)||null,vt(X,K,xt,$t,null);if(typeof xt.then=="function")return dt(K,X,st,Nl(xt),$t);if(xt.$$typeof===I)return dt(K,X,st,wl(X,xt),$t);Ol(X,xt)}return null}function Yt(K,X,st,xt){for(var $t=null,Re=null,qt=X,fe=X=0,ye=null;qt!==null&&fe<st.length;fe++){qt.index>fe?(ye=qt,qt=null):ye=qt.sibling;var Ce=ct(K,qt,st[fe],xt);if(Ce===null){qt===null&&(qt=ye);break}e&&qt&&Ce.alternate===null&&n(K,qt),X=h(Ce,X,fe),Re===null?$t=Ce:Re.sibling=Ce,Re=Ce,qt=ye}if(fe===st.length)return a(K,qt),Ee&&ra(K,fe),$t;if(qt===null){for(;fe<st.length;fe++)qt=Mt(K,st[fe],xt),qt!==null&&(X=h(qt,X,fe),Re===null?$t=qt:Re.sibling=qt,Re=qt);return Ee&&ra(K,fe),$t}for(qt=o(qt);fe<st.length;fe++)ye=dt(qt,K,fe,st[fe],xt),ye!==null&&(e&&ye.alternate!==null&&qt.delete(ye.key===null?fe:ye.key),X=h(ye,X,fe),Re===null?$t=ye:Re.sibling=ye,Re=ye);return e&&qt.forEach(function(ss){return n(K,ss)}),Ee&&ra(K,fe),$t}function ee(K,X,st,xt){if(st==null)throw Error(s(151));for(var $t=null,Re=null,qt=X,fe=X=0,ye=null,Ce=st.next();qt!==null&&!Ce.done;fe++,Ce=st.next()){qt.index>fe?(ye=qt,qt=null):ye=qt.sibling;var ss=ct(K,qt,Ce.value,xt);if(ss===null){qt===null&&(qt=ye);break}e&&qt&&ss.alternate===null&&n(K,qt),X=h(ss,X,fe),Re===null?$t=ss:Re.sibling=ss,Re=ss,qt=ye}if(Ce.done)return a(K,qt),Ee&&ra(K,fe),$t;if(qt===null){for(;!Ce.done;fe++,Ce=st.next())Ce=Mt(K,Ce.value,xt),Ce!==null&&(X=h(Ce,X,fe),Re===null?$t=Ce:Re.sibling=Ce,Re=Ce);return Ee&&ra(K,fe),$t}for(qt=o(qt);!Ce.done;fe++,Ce=st.next())Ce=dt(qt,K,fe,Ce.value,xt),Ce!==null&&(e&&Ce.alternate!==null&&qt.delete(Ce.key===null?fe:Ce.key),X=h(Ce,X,fe),Re===null?$t=Ce:Re.sibling=Ce,Re=Ce);return e&&qt.forEach(function(aM){return n(K,aM)}),Ee&&ra(K,fe),$t}function ke(K,X,st,xt){if(typeof st=="object"&&st!==null&&st.type===R&&st.key===null&&(st=st.props.children),typeof st=="object"&&st!==null){switch(st.$$typeof){case x:t:{for(var $t=st.key;X!==null;){if(X.key===$t){if($t=st.type,$t===R){if(X.tag===7){a(K,X.sibling),xt=u(X,st.props.children),xt.return=K,K=xt;break t}}else if(X.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===T&&Rs($t)===X.type){a(K,X.sibling),xt=u(X,st.props),fo(xt,st),xt.return=K,K=xt;break t}a(K,X);break}else n(K,X);X=X.sibling}st.type===R?(xt=ys(st.props.children,K.mode,xt,st.key),xt.return=K,K=xt):(xt=Al(st.type,st.key,st.props,null,K.mode,xt),fo(xt,st),xt.return=K,K=xt)}return M(K);case E:t:{for($t=st.key;X!==null;){if(X.key===$t)if(X.tag===4&&X.stateNode.containerInfo===st.containerInfo&&X.stateNode.implementation===st.implementation){a(K,X.sibling),xt=u(X,st.children||[]),xt.return=K,K=xt;break t}else{a(K,X);break}else n(K,X);X=X.sibling}xt=Bu(st,K.mode,xt),xt.return=K,K=xt}return M(K);case T:return st=Rs(st),ke(K,X,st,xt)}if(Q(st))return Yt(K,X,st,xt);if(W(st)){if($t=W(st),typeof $t!="function")throw Error(s(150));return st=$t.call(st),ee(K,X,st,xt)}if(typeof st.then=="function")return ke(K,X,Nl(st),xt);if(st.$$typeof===I)return ke(K,X,wl(K,st),xt);Ol(K,st)}return typeof st=="string"&&st!==""||typeof st=="number"||typeof st=="bigint"?(st=""+st,X!==null&&X.tag===6?(a(K,X.sibling),xt=u(X,st),xt.return=K,K=xt):(a(K,X),xt=Iu(st,K.mode,xt),xt.return=K,K=xt),M(K)):a(K,X)}return function(K,X,st,xt){try{uo=0;var $t=ke(K,X,st,xt);return rr=null,$t}catch(qt){if(qt===sr||qt===Ul)throw qt;var Re=ri(29,qt,null,K.mode);return Re.lanes=xt,Re.return=K,Re}}}var ws=cm(!0),um=cm(!1),Va=!1;function Qu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ju(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ka(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Xa(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Tl(e),qp(e,null,a),n}return bl(e,o,n,a),Tl(e)}function ho(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,qn(e,a)}}function ju(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var M={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?u=h=M:h=h.next=M,a=a.next}while(a!==null);h===null?u=h=n:h=h.next=n}else u=h=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var $u=!1;function po(){if($u){var e=ar;if(e!==null)throw e}}function mo(e,n,a,o){$u=!1;var u=e.updateQueue;Va=!1;var h=u.firstBaseUpdate,M=u.lastBaseUpdate,w=u.shared.pending;if(w!==null){u.shared.pending=null;var G=w,rt=G.next;G.next=null,M===null?h=rt:M.next=rt,M=G;var vt=e.alternate;vt!==null&&(vt=vt.updateQueue,w=vt.lastBaseUpdate,w!==M&&(w===null?vt.firstBaseUpdate=rt:w.next=rt,vt.lastBaseUpdate=G))}if(h!==null){var Mt=u.baseState;M=0,vt=rt=G=null,w=h;do{var ct=w.lane&-536870913,dt=ct!==w.lane;if(dt?(Me&ct)===ct:(o&ct)===ct){ct!==0&&ct===ir&&($u=!0),vt!==null&&(vt=vt.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});t:{var Yt=e,ee=w;ct=n;var ke=a;switch(ee.tag){case 1:if(Yt=ee.payload,typeof Yt=="function"){Mt=Yt.call(ke,Mt,ct);break t}Mt=Yt;break t;case 3:Yt.flags=Yt.flags&-65537|128;case 0:if(Yt=ee.payload,ct=typeof Yt=="function"?Yt.call(ke,Mt,ct):Yt,ct==null)break t;Mt=v({},Mt,ct);break t;case 2:Va=!0}}ct=w.callback,ct!==null&&(e.flags|=64,dt&&(e.flags|=8192),dt=u.callbacks,dt===null?u.callbacks=[ct]:dt.push(ct))}else dt={lane:ct,tag:w.tag,payload:w.payload,callback:w.callback,next:null},vt===null?(rt=vt=dt,G=Mt):vt=vt.next=dt,M|=ct;if(w=w.next,w===null){if(w=u.shared.pending,w===null)break;dt=w,w=dt.next,dt.next=null,u.lastBaseUpdate=dt,u.shared.pending=null}}while(!0);vt===null&&(G=Mt),u.baseState=G,u.firstBaseUpdate=rt,u.lastBaseUpdate=vt,h===null&&(u.shared.lanes=0),Ka|=M,e.lanes=M,e.memoizedState=Mt}}function fm(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function hm(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)fm(a[e],n)}var or=N(null),Pl=N(0);function dm(e,n){e=_a,ht(Pl,e),ht(or,n),_a=e|n.baseLanes}function tf(){ht(Pl,_a),ht(or,or.current)}function ef(){_a=Pl.current,$(or),$(Pl)}var oi=N(null),Ei=null;function Wa(e){var n=e.alternate;ht(on,on.current&1),ht(oi,e),Ei===null&&(n===null||or.current!==null||n.memoizedState!==null)&&(Ei=e)}function nf(e){ht(on,on.current),ht(oi,e),Ei===null&&(Ei=e)}function pm(e){e.tag===22?(ht(on,on.current),ht(oi,e),Ei===null&&(Ei=e)):Ya()}function Ya(){ht(on,on.current),ht(oi,oi.current)}function li(e){$(oi),Ei===e&&(Ei=null),$(on)}var on=N(0);function zl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||ch(a)||uh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ca=0,ue=null,Ge=null,pn=null,Il=!1,lr=!1,Ds=!1,Bl=0,go=0,cr=null,ZS=0;function sn(){throw Error(s(321))}function af(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!si(e[a],n[a]))return!1;return!0}function sf(e,n,a,o,u,h){return ca=h,ue=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,B.H=e===null||e.memoizedState===null?Jm:xf,Ds=!1,h=a(o,u),Ds=!1,lr&&(h=gm(n,a,o,u)),mm(e),h}function mm(e){B.H=So;var n=Ge!==null&&Ge.next!==null;if(ca=0,pn=Ge=ue=null,Il=!1,go=0,cr=null,n)throw Error(s(300));e===null||mn||(e=e.dependencies,e!==null&&Cl(e)&&(mn=!0))}function gm(e,n,a,o){ue=e;var u=0;do{if(lr&&(cr=null),go=0,lr=!1,25<=u)throw Error(s(301));if(u+=1,pn=Ge=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}B.H=jm,h=n(a,o)}while(lr);return h}function KS(){var e=B.H,n=e.useState()[0];return n=typeof n.then=="function"?_o(n):n,e=e.useState()[0],(Ge!==null?Ge.memoizedState:null)!==e&&(ue.flags|=1024),n}function rf(){var e=Bl!==0;return Bl=0,e}function of(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function lf(e){if(Il){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Il=!1}ca=0,pn=Ge=ue=null,lr=!1,go=Bl=0,cr=null}function kn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pn===null?ue.memoizedState=pn=e:pn=pn.next=e,pn}function ln(){if(Ge===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=Ge.next;var n=pn===null?ue.memoizedState:pn.next;if(n!==null)pn=n,Ge=e;else{if(e===null)throw ue.alternate===null?Error(s(467)):Error(s(310));Ge=e,e={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},pn===null?ue.memoizedState=pn=e:pn=pn.next=e}return pn}function Fl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function _o(e){var n=go;return go+=1,cr===null&&(cr=[]),e=rm(cr,e,n),n=ue,(pn===null?n.memoizedState:pn.next)===null&&(n=n.alternate,B.H=n===null||n.memoizedState===null?Jm:xf),e}function Hl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return _o(e);if(e.$$typeof===I)return Un(e)}throw Error(s(438,String(e)))}function cf(e){var n=null,a=ue.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ue.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Fl(),ue.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=F;return n.index++,a}function ua(e,n){return typeof n=="function"?n(e):n}function Gl(e){var n=ln();return uf(n,Ge,e)}function uf(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var M=u.next;u.next=h.next,h.next=M}n.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{n=u.next;var w=M=null,G=null,rt=n,vt=!1;do{var Mt=rt.lane&-536870913;if(Mt!==rt.lane?(Me&Mt)===Mt:(ca&Mt)===Mt){var ct=rt.revertLane;if(ct===0)G!==null&&(G=G.next={lane:0,revertLane:0,gesture:null,action:rt.action,hasEagerState:rt.hasEagerState,eagerState:rt.eagerState,next:null}),Mt===ir&&(vt=!0);else if((ca&ct)===ct){rt=rt.next,ct===ir&&(vt=!0);continue}else Mt={lane:0,revertLane:rt.revertLane,gesture:null,action:rt.action,hasEagerState:rt.hasEagerState,eagerState:rt.eagerState,next:null},G===null?(w=G=Mt,M=h):G=G.next=Mt,ue.lanes|=ct,Ka|=ct;Mt=rt.action,Ds&&a(h,Mt),h=rt.hasEagerState?rt.eagerState:a(h,Mt)}else ct={lane:Mt,revertLane:rt.revertLane,gesture:rt.gesture,action:rt.action,hasEagerState:rt.hasEagerState,eagerState:rt.eagerState,next:null},G===null?(w=G=ct,M=h):G=G.next=ct,ue.lanes|=Mt,Ka|=Mt;rt=rt.next}while(rt!==null&&rt!==n);if(G===null?M=h:G.next=w,!si(h,e.memoizedState)&&(mn=!0,vt&&(a=ar,a!==null)))throw a;e.memoizedState=h,e.baseState=M,e.baseQueue=G,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function ff(e){var n=ln(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,h=n.memoizedState;if(u!==null){a.pending=null;var M=u=u.next;do h=e(h,M.action),M=M.next;while(M!==u);si(h,n.memoizedState)||(mn=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),a.lastRenderedState=h}return[h,o]}function _m(e,n,a){var o=ue,u=ln(),h=Ee;if(h){if(a===void 0)throw Error(s(407));a=a()}else a=n();var M=!si((Ge||u).memoizedState,a);if(M&&(u.memoizedState=a,mn=!0),u=u.queue,pf(xm.bind(null,o,u,e),[e]),u.getSnapshot!==n||M||pn!==null&&pn.memoizedState.tag&1){if(o.flags|=2048,ur(9,{destroy:void 0},Sm.bind(null,o,u,a,n),null),qe===null)throw Error(s(349));h||(ca&127)!==0||vm(o,n,a)}return a}function vm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=ue.updateQueue,n===null?(n=Fl(),ue.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function Sm(e,n,a,o){n.value=a,n.getSnapshot=o,Mm(n)&&ym(e)}function xm(e,n,a){return a(function(){Mm(n)&&ym(e)})}function Mm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!si(e,a)}catch{return!0}}function ym(e){var n=Ms(e,2);n!==null&&ti(n,e,2)}function hf(e){var n=kn();if(typeof e=="function"){var a=e;if(e=a(),Ds){At(!0);try{a()}finally{At(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ua,lastRenderedState:e},n}function Em(e,n,a,o){return e.baseState=a,uf(e,Ge,typeof o=="function"?o:ua)}function QS(e,n,a,o,u){if(Xl(e))throw Error(s(485));if(e=n.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(M){h.listeners.push(M)}};B.T!==null?a(!0):h.isTransition=!1,o(h),a=n.pending,a===null?(h.next=n.pending=h,bm(n,h)):(h.next=a.next,n.pending=a.next=h)}}function bm(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var h=B.T,M={};B.T=M;try{var w=a(u,o),G=B.S;G!==null&&G(M,w),Tm(e,n,w)}catch(rt){df(e,n,rt)}finally{h!==null&&M.types!==null&&(h.types=M.types),B.T=h}}else try{h=a(u,o),Tm(e,n,h)}catch(rt){df(e,n,rt)}}function Tm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Am(e,n,o)},function(o){return df(e,n,o)}):Am(e,n,a)}function Am(e,n,a){n.status="fulfilled",n.value=a,Rm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,bm(e,a)))}function df(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Rm(n),n=n.next;while(n!==o)}e.action=null}function Rm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Cm(e,n){return n}function wm(e,n){if(Ee){var a=qe.formState;if(a!==null){t:{var o=ue;if(Ee){if(Qe){e:{for(var u=Qe,h=yi;u.nodeType!==8;){if(!h){u=null;break e}if(u=bi(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){Qe=bi(u.nextSibling),o=u.data==="F!";break t}}Ha(o)}o=!1}o&&(n=a[0])}}return a=kn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Cm,lastRenderedState:n},a.queue=o,a=Zm.bind(null,ue,o),o.dispatch=a,o=hf(!1),h=Sf.bind(null,ue,!1,o.queue),o=kn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=QS.bind(null,ue,u,h,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function Dm(e){var n=ln();return Um(n,Ge,e)}function Um(e,n,a){if(n=uf(e,n,Cm)[0],e=Gl(ua)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=_o(n)}catch(M){throw M===sr?Ul:M}else o=n;n=ln();var u=n.queue,h=u.dispatch;return a!==n.memoizedState&&(ue.flags|=2048,ur(9,{destroy:void 0},JS.bind(null,u,a),null)),[o,h,e]}function JS(e,n){e.action=n}function Lm(e){var n=ln(),a=Ge;if(a!==null)return Um(n,a,e);ln(),n=n.memoizedState,a=ln();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function ur(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=ue.updateQueue,n===null&&(n=Fl(),ue.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function Nm(){return ln().memoizedState}function Vl(e,n,a,o){var u=kn();ue.flags|=e,u.memoizedState=ur(1|n,{destroy:void 0},a,o===void 0?null:o)}function kl(e,n,a,o){var u=ln();o=o===void 0?null:o;var h=u.memoizedState.inst;Ge!==null&&o!==null&&af(o,Ge.memoizedState.deps)?u.memoizedState=ur(n,h,a,o):(ue.flags|=e,u.memoizedState=ur(1|n,h,a,o))}function Om(e,n){Vl(8390656,8,e,n)}function pf(e,n){kl(2048,8,e,n)}function jS(e){ue.flags|=4;var n=ue.updateQueue;if(n===null)n=Fl(),ue.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function Pm(e){var n=ln().memoizedState;return jS({ref:n,nextImpl:e}),function(){if((Le&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function zm(e,n){return kl(4,2,e,n)}function Im(e,n){return kl(4,4,e,n)}function Bm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Fm(e,n,a){a=a!=null?a.concat([e]):null,kl(4,4,Bm.bind(null,n,e),a)}function mf(){}function Hm(e,n){var a=ln();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&af(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Gm(e,n){var a=ln();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&af(n,o[1]))return o[0];if(o=e(),Ds){At(!0);try{e()}finally{At(!1)}}return a.memoizedState=[o,n],o}function gf(e,n,a){return a===void 0||(ca&1073741824)!==0&&(Me&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=V0(),ue.lanes|=e,Ka|=e,a)}function Vm(e,n,a,o){return si(a,n)?a:or.current!==null?(e=gf(e,a,o),si(e,n)||(mn=!0),e):(ca&42)===0||(ca&1073741824)!==0&&(Me&261930)===0?(mn=!0,e.memoizedState=a):(e=V0(),ue.lanes|=e,Ka|=e,n)}function km(e,n,a,o,u){var h=V.p;V.p=h!==0&&8>h?h:8;var M=B.T,w={};B.T=w,Sf(e,!1,n,a);try{var G=u(),rt=B.S;if(rt!==null&&rt(w,G),G!==null&&typeof G=="object"&&typeof G.then=="function"){var vt=qS(G,o);vo(e,n,vt,fi(e))}else vo(e,n,o,fi(e))}catch(Mt){vo(e,n,{then:function(){},status:"rejected",reason:Mt},fi())}finally{V.p=h,M!==null&&w.types!==null&&(M.types=w.types),B.T=M}}function $S(){}function _f(e,n,a,o){if(e.tag!==5)throw Error(s(476));var u=Xm(e).queue;km(e,u,n,ot,a===null?$S:function(){return Wm(e),a(o)})}function Xm(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:ot,baseState:ot,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ua,lastRenderedState:ot},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ua,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Wm(e){var n=Xm(e);n.next===null&&(n=e.alternate.memoizedState),vo(e,n.next.queue,{},fi())}function vf(){return Un(Po)}function Ym(){return ln().memoizedState}function qm(){return ln().memoizedState}function tx(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=fi();e=ka(a);var o=Xa(n,e,a);o!==null&&(ti(o,n,a),ho(o,n,a)),n={cache:Yu()},e.payload=n;return}n=n.return}}function ex(e,n,a){var o=fi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Xl(e)?Km(n,a):(a=Pu(e,n,a,o),a!==null&&(ti(a,e,o),Qm(a,n,o)))}function Zm(e,n,a){var o=fi();vo(e,n,a,o)}function vo(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Xl(e))Km(n,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var M=n.lastRenderedState,w=h(M,a);if(u.hasEagerState=!0,u.eagerState=w,si(w,M))return bl(e,n,u,0),qe===null&&El(),!1}catch{}if(a=Pu(e,n,u,o),a!==null)return ti(a,e,o),Qm(a,n,o),!0}return!1}function Sf(e,n,a,o){if(o={lane:2,revertLane:Jf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Xl(e)){if(n)throw Error(s(479))}else n=Pu(e,a,o,2),n!==null&&ti(n,e,2)}function Xl(e){var n=e.alternate;return e===ue||n!==null&&n===ue}function Km(e,n){lr=Il=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Qm(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,qn(e,a)}}var So={readContext:Un,use:Hl,useCallback:sn,useContext:sn,useEffect:sn,useImperativeHandle:sn,useLayoutEffect:sn,useInsertionEffect:sn,useMemo:sn,useReducer:sn,useRef:sn,useState:sn,useDebugValue:sn,useDeferredValue:sn,useTransition:sn,useSyncExternalStore:sn,useId:sn,useHostTransitionStatus:sn,useFormState:sn,useActionState:sn,useOptimistic:sn,useMemoCache:sn,useCacheRefresh:sn};So.useEffectEvent=sn;var Jm={readContext:Un,use:Hl,useCallback:function(e,n){return kn().memoizedState=[e,n===void 0?null:n],e},useContext:Un,useEffect:Om,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Vl(4194308,4,Bm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Vl(4194308,4,e,n)},useInsertionEffect:function(e,n){Vl(4,2,e,n)},useMemo:function(e,n){var a=kn();n=n===void 0?null:n;var o=e();if(Ds){At(!0);try{e()}finally{At(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=kn();if(a!==void 0){var u=a(n);if(Ds){At(!0);try{a(n)}finally{At(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=ex.bind(null,ue,e),[o.memoizedState,e]},useRef:function(e){var n=kn();return e={current:e},n.memoizedState=e},useState:function(e){e=hf(e);var n=e.queue,a=Zm.bind(null,ue,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:mf,useDeferredValue:function(e,n){var a=kn();return gf(a,e,n)},useTransition:function(){var e=hf(!1);return e=km.bind(null,ue,e.queue,!0,!1),kn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=ue,u=kn();if(Ee){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),qe===null)throw Error(s(349));(Me&127)!==0||vm(o,n,a)}u.memoizedState=a;var h={value:a,getSnapshot:n};return u.queue=h,Om(xm.bind(null,o,h,e),[e]),o.flags|=2048,ur(9,{destroy:void 0},Sm.bind(null,o,h,a,n),null),a},useId:function(){var e=kn(),n=qe.identifierPrefix;if(Ee){var a=Xi,o=ki;a=(o&~(1<<32-Gt(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Bl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=ZS++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:vf,useFormState:wm,useActionState:wm,useOptimistic:function(e){var n=kn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Sf.bind(null,ue,!0,a),a.dispatch=n,[e,n]},useMemoCache:cf,useCacheRefresh:function(){return kn().memoizedState=tx.bind(null,ue)},useEffectEvent:function(e){var n=kn(),a={impl:e};return n.memoizedState=a,function(){if((Le&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},xf={readContext:Un,use:Hl,useCallback:Hm,useContext:Un,useEffect:pf,useImperativeHandle:Fm,useInsertionEffect:zm,useLayoutEffect:Im,useMemo:Gm,useReducer:Gl,useRef:Nm,useState:function(){return Gl(ua)},useDebugValue:mf,useDeferredValue:function(e,n){var a=ln();return Vm(a,Ge.memoizedState,e,n)},useTransition:function(){var e=Gl(ua)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:_o(e),n]},useSyncExternalStore:_m,useId:Ym,useHostTransitionStatus:vf,useFormState:Dm,useActionState:Dm,useOptimistic:function(e,n){var a=ln();return Em(a,Ge,e,n)},useMemoCache:cf,useCacheRefresh:qm};xf.useEffectEvent=Pm;var jm={readContext:Un,use:Hl,useCallback:Hm,useContext:Un,useEffect:pf,useImperativeHandle:Fm,useInsertionEffect:zm,useLayoutEffect:Im,useMemo:Gm,useReducer:ff,useRef:Nm,useState:function(){return ff(ua)},useDebugValue:mf,useDeferredValue:function(e,n){var a=ln();return Ge===null?gf(a,e,n):Vm(a,Ge.memoizedState,e,n)},useTransition:function(){var e=ff(ua)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:_o(e),n]},useSyncExternalStore:_m,useId:Ym,useHostTransitionStatus:vf,useFormState:Lm,useActionState:Lm,useOptimistic:function(e,n){var a=ln();return Ge!==null?Em(a,Ge,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:cf,useCacheRefresh:qm};jm.useEffectEvent=Pm;function Mf(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:v({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var yf={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=fi(),u=ka(o);u.payload=n,a!=null&&(u.callback=a),n=Xa(e,u,o),n!==null&&(ti(n,e,o),ho(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=fi(),u=ka(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Xa(e,u,o),n!==null&&(ti(n,e,o),ho(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=fi(),o=ka(a);o.tag=2,n!=null&&(o.callback=n),n=Xa(e,o,a),n!==null&&(ti(n,e,a),ho(n,e,a))}};function $m(e,n,a,o,u,h,M){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,M):n.prototype&&n.prototype.isPureReactComponent?!ao(a,o)||!ao(u,h):!0}function t0(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&yf.enqueueReplaceState(n,n.state,null)}function Us(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=v({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function e0(e){yl(e)}function n0(e){console.error(e)}function i0(e){yl(e)}function Wl(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function a0(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Ef(e,n,a){return a=ka(a),a.tag=3,a.payload={element:null},a.callback=function(){Wl(e,n)},a}function s0(e){return e=ka(e),e.tag=3,e}function r0(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){a0(n,a,o)}}var M=a.stateNode;M!==null&&typeof M.componentDidCatch=="function"&&(e.callback=function(){a0(n,a,o),typeof u!="function"&&(Qa===null?Qa=new Set([this]):Qa.add(this));var w=o.stack;this.componentDidCatch(o.value,{componentStack:w!==null?w:""})})}function nx(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&nr(n,a,u,!0),a=oi.current,a!==null){switch(a.tag){case 31:case 13:return Ei===null?ic():a.alternate===null&&rn===0&&(rn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Ll?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Zf(e,o,u)),!1;case 22:return a.flags|=65536,o===Ll?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Zf(e,o,u)),!1}throw Error(s(435,a.tag))}return Zf(e,o,u),ic(),!1}if(Ee)return n=oi.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Gu&&(e=Error(s(422),{cause:o}),oo(Si(e,a)))):(o!==Gu&&(n=Error(s(423),{cause:o}),oo(Si(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=Si(o,a),u=Ef(e.stateNode,o,u),ju(e,u),rn!==4&&(rn=2)),!1;var h=Error(s(520),{cause:o});if(h=Si(h,a),Ro===null?Ro=[h]:Ro.push(h),rn!==4&&(rn=2),n===null)return!0;o=Si(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=Ef(a.stateNode,o,e),ju(a,e),!1;case 1:if(n=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Qa===null||!Qa.has(h))))return a.flags|=65536,u&=-u,a.lanes|=u,u=s0(u),r0(u,e,a,o),ju(a,u),!1}a=a.return}while(a!==null);return!1}var bf=Error(s(461)),mn=!1;function Ln(e,n,a,o){n.child=e===null?um(n,null,a,o):ws(n,e.child,a,o)}function o0(e,n,a,o,u){a=a.render;var h=n.ref;if("ref"in o){var M={};for(var w in o)w!=="ref"&&(M[w]=o[w])}else M=o;return Ts(n),o=sf(e,n,a,M,h,u),w=rf(),e!==null&&!mn?(of(e,n,u),fa(e,n,u)):(Ee&&w&&Fu(n),n.flags|=1,Ln(e,n,o,u),n.child)}function l0(e,n,a,o,u){if(e===null){var h=a.type;return typeof h=="function"&&!zu(h)&&h.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=h,c0(e,n,h,o,u)):(e=Al(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(h=e.child,!Lf(e,u)){var M=h.memoizedProps;if(a=a.compare,a=a!==null?a:ao,a(M,o)&&e.ref===n.ref)return fa(e,n,u)}return n.flags|=1,e=sa(h,o),e.ref=n.ref,e.return=n,n.child=e}function c0(e,n,a,o,u){if(e!==null){var h=e.memoizedProps;if(ao(h,o)&&e.ref===n.ref)if(mn=!1,n.pendingProps=o=h,Lf(e,u))(e.flags&131072)!==0&&(mn=!0);else return n.lanes=e.lanes,fa(e,n,u)}return Tf(e,n,a,o,u)}function u0(e,n,a,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,n.child=null;return f0(e,n,h,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Dl(n,h!==null?h.cachePool:null),h!==null?dm(n,h):tf(),pm(n);else return o=n.lanes=536870912,f0(e,n,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(Dl(n,h.cachePool),dm(n,h),Ya(),n.memoizedState=null):(e!==null&&Dl(n,null),tf(),Ya());return Ln(e,n,u,a),n.child}function xo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function f0(e,n,a,o,u){var h=Zu();return h=h===null?null:{parent:dn._currentValue,pool:h},n.memoizedState={baseLanes:a,cachePool:h},e!==null&&Dl(n,null),tf(),pm(n),e!==null&&nr(e,n,o,!0),n.childLanes=u,null}function Yl(e,n){return n=Zl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function h0(e,n,a){return ws(n,e.child,null,a),e=Yl(n,n.pendingProps),e.flags|=2,li(n),n.memoizedState=null,e}function ix(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Ee){if(o.mode==="hidden")return e=Yl(n,o),n.lanes=536870912,xo(null,e);if(nf(n),(e=Qe)?(e=bg(e,yi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Ba!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},a=Kp(e),a.return=n,n.child=a,Dn=n,Qe=null)):e=null,e===null)throw Ha(n);return n.lanes=536870912,null}return Yl(n,o)}var h=e.memoizedState;if(h!==null){var M=h.dehydrated;if(nf(n),u)if(n.flags&256)n.flags&=-257,n=h0(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(mn||nr(e,n,a,!1),u=(a&e.childLanes)!==0,mn||u){if(o=qe,o!==null&&(M=ii(o,a),M!==0&&M!==h.retryLane))throw h.retryLane=M,Ms(e,M),ti(o,e,M),bf;ic(),n=h0(e,n,a)}else e=h.treeContext,Qe=bi(M.nextSibling),Dn=n,Ee=!0,Fa=null,yi=!1,e!==null&&jp(n,e),n=Yl(n,o),n.flags|=4096;return n}return e=sa(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function ql(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function Tf(e,n,a,o,u){return Ts(n),a=sf(e,n,a,o,void 0,u),o=rf(),e!==null&&!mn?(of(e,n,u),fa(e,n,u)):(Ee&&o&&Fu(n),n.flags|=1,Ln(e,n,a,u),n.child)}function d0(e,n,a,o,u,h){return Ts(n),n.updateQueue=null,a=gm(n,o,a,u),mm(e),o=rf(),e!==null&&!mn?(of(e,n,h),fa(e,n,h)):(Ee&&o&&Fu(n),n.flags|=1,Ln(e,n,a,h),n.child)}function p0(e,n,a,o,u){if(Ts(n),n.stateNode===null){var h=js,M=a.contextType;typeof M=="object"&&M!==null&&(h=Un(M)),h=new a(o,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=yf,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=o,h.state=n.memoizedState,h.refs={},Qu(n),M=a.contextType,h.context=typeof M=="object"&&M!==null?Un(M):js,h.state=n.memoizedState,M=a.getDerivedStateFromProps,typeof M=="function"&&(Mf(n,a,M,o),h.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(M=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),M!==h.state&&yf.enqueueReplaceState(h,h.state,null),mo(n,o,h,u),po(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){h=n.stateNode;var w=n.memoizedProps,G=Us(a,w);h.props=G;var rt=h.context,vt=a.contextType;M=js,typeof vt=="object"&&vt!==null&&(M=Un(vt));var Mt=a.getDerivedStateFromProps;vt=typeof Mt=="function"||typeof h.getSnapshotBeforeUpdate=="function",w=n.pendingProps!==w,vt||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(w||rt!==M)&&t0(n,h,o,M),Va=!1;var ct=n.memoizedState;h.state=ct,mo(n,o,h,u),po(),rt=n.memoizedState,w||ct!==rt||Va?(typeof Mt=="function"&&(Mf(n,a,Mt,o),rt=n.memoizedState),(G=Va||$m(n,a,G,o,ct,rt,M))?(vt||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=rt),h.props=o,h.state=rt,h.context=M,o=G):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{h=n.stateNode,Ju(e,n),M=n.memoizedProps,vt=Us(a,M),h.props=vt,Mt=n.pendingProps,ct=h.context,rt=a.contextType,G=js,typeof rt=="object"&&rt!==null&&(G=Un(rt)),w=a.getDerivedStateFromProps,(rt=typeof w=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(M!==Mt||ct!==G)&&t0(n,h,o,G),Va=!1,ct=n.memoizedState,h.state=ct,mo(n,o,h,u),po();var dt=n.memoizedState;M!==Mt||ct!==dt||Va||e!==null&&e.dependencies!==null&&Cl(e.dependencies)?(typeof w=="function"&&(Mf(n,a,w,o),dt=n.memoizedState),(vt=Va||$m(n,a,vt,o,ct,dt,G)||e!==null&&e.dependencies!==null&&Cl(e.dependencies))?(rt||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,dt,G),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,dt,G)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||M===e.memoizedProps&&ct===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&ct===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=dt),h.props=o,h.state=dt,h.context=G,o=vt):(typeof h.componentDidUpdate!="function"||M===e.memoizedProps&&ct===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&ct===e.memoizedState||(n.flags|=1024),o=!1)}return h=o,ql(e,n),o=(n.flags&128)!==0,h||o?(h=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,e!==null&&o?(n.child=ws(n,e.child,null,u),n.child=ws(n,null,a,u)):Ln(e,n,a,u),n.memoizedState=h.state,e=n.child):e=fa(e,n,u),e}function m0(e,n,a,o){return Es(),n.flags|=256,Ln(e,n,a,o),n.child}var Af={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Rf(e){return{baseLanes:e,cachePool:am()}}function Cf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ui),e}function g0(e,n,a){var o=n.pendingProps,u=!1,h=(n.flags&128)!==0,M;if((M=h)||(M=e!==null&&e.memoizedState===null?!1:(on.current&2)!==0),M&&(u=!0,n.flags&=-129),M=(n.flags&32)!==0,n.flags&=-33,e===null){if(Ee){if(u?Wa(n):Ya(),(e=Qe)?(e=bg(e,yi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Ba!==null?{id:ki,overflow:Xi}:null,retryLane:536870912,hydrationErrors:null},a=Kp(e),a.return=n,n.child=a,Dn=n,Qe=null)):e=null,e===null)throw Ha(n);return uh(e)?n.lanes=32:n.lanes=536870912,null}var w=o.children;return o=o.fallback,u?(Ya(),u=n.mode,w=Zl({mode:"hidden",children:w},u),o=ys(o,u,a,null),w.return=n,o.return=n,w.sibling=o,n.child=w,o=n.child,o.memoizedState=Rf(a),o.childLanes=Cf(e,M,a),n.memoizedState=Af,xo(null,o)):(Wa(n),wf(n,w))}var G=e.memoizedState;if(G!==null&&(w=G.dehydrated,w!==null)){if(h)n.flags&256?(Wa(n),n.flags&=-257,n=Df(e,n,a)):n.memoizedState!==null?(Ya(),n.child=e.child,n.flags|=128,n=null):(Ya(),w=o.fallback,u=n.mode,o=Zl({mode:"visible",children:o.children},u),w=ys(w,u,a,null),w.flags|=2,o.return=n,w.return=n,o.sibling=w,n.child=o,ws(n,e.child,null,a),o=n.child,o.memoizedState=Rf(a),o.childLanes=Cf(e,M,a),n.memoizedState=Af,n=xo(null,o));else if(Wa(n),uh(w)){if(M=w.nextSibling&&w.nextSibling.dataset,M)var rt=M.dgst;M=rt,o=Error(s(419)),o.stack="",o.digest=M,oo({value:o,source:null,stack:null}),n=Df(e,n,a)}else if(mn||nr(e,n,a,!1),M=(a&e.childLanes)!==0,mn||M){if(M=qe,M!==null&&(o=ii(M,a),o!==0&&o!==G.retryLane))throw G.retryLane=o,Ms(e,o),ti(M,e,o),bf;ch(w)||ic(),n=Df(e,n,a)}else ch(w)?(n.flags|=192,n.child=e.child,n=null):(e=G.treeContext,Qe=bi(w.nextSibling),Dn=n,Ee=!0,Fa=null,yi=!1,e!==null&&jp(n,e),n=wf(n,o.children),n.flags|=4096);return n}return u?(Ya(),w=o.fallback,u=n.mode,G=e.child,rt=G.sibling,o=sa(G,{mode:"hidden",children:o.children}),o.subtreeFlags=G.subtreeFlags&65011712,rt!==null?w=sa(rt,w):(w=ys(w,u,a,null),w.flags|=2),w.return=n,o.return=n,o.sibling=w,n.child=o,xo(null,o),o=n.child,w=e.child.memoizedState,w===null?w=Rf(a):(u=w.cachePool,u!==null?(G=dn._currentValue,u=u.parent!==G?{parent:G,pool:G}:u):u=am(),w={baseLanes:w.baseLanes|a,cachePool:u}),o.memoizedState=w,o.childLanes=Cf(e,M,a),n.memoizedState=Af,xo(e.child,o)):(Wa(n),a=e.child,e=a.sibling,a=sa(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(M=n.deletions,M===null?(n.deletions=[e],n.flags|=16):M.push(e)),n.child=a,n.memoizedState=null,a)}function wf(e,n){return n=Zl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Zl(e,n){return e=ri(22,e,null,n),e.lanes=0,e}function Df(e,n,a){return ws(n,e.child,null,a),e=wf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function _0(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),Xu(e.return,n,a)}function Uf(e,n,a,o,u,h){var M=e.memoizedState;M===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:h}:(M.isBackwards=n,M.rendering=null,M.renderingStartTime=0,M.last=o,M.tail=a,M.tailMode=u,M.treeForkCount=h)}function v0(e,n,a){var o=n.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var M=on.current,w=(M&2)!==0;if(w?(M=M&1|2,n.flags|=128):M&=1,ht(on,M),Ln(e,n,o,a),o=Ee?ro:0,!w&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&_0(e,a,n);else if(e.tag===19)_0(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&zl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Uf(n,!1,u,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&zl(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Uf(n,!0,a,null,h,o);break;case"together":Uf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function fa(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Ka|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(nr(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=sa(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=sa(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Lf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Cl(e)))}function ax(e,n,a){switch(n.tag){case 3:pt(n,n.stateNode.containerInfo),Ga(n,dn,e.memoizedState.cache),Es();break;case 27:case 5:jt(n);break;case 4:pt(n,n.stateNode.containerInfo);break;case 10:Ga(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,nf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Wa(n),n.flags|=128,null):(a&n.child.childLanes)!==0?g0(e,n,a):(Wa(n),e=fa(e,n,a),e!==null?e.sibling:null);Wa(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(nr(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return v0(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),ht(on,on.current),o)break;return null;case 22:return n.lanes=0,u0(e,n,a,n.pendingProps);case 24:Ga(n,dn,e.memoizedState.cache)}return fa(e,n,a)}function S0(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)mn=!0;else{if(!Lf(e,a)&&(n.flags&128)===0)return mn=!1,ax(e,n,a);mn=(e.flags&131072)!==0}else mn=!1,Ee&&(n.flags&1048576)!==0&&Jp(n,ro,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=Rs(n.elementType),n.type=e,typeof e=="function")zu(e)?(o=Us(e,o),n.tag=1,n=p0(null,n,e,o,a)):(n.tag=0,n=Tf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===C){n.tag=11,n=o0(null,n,e,o,a);break t}else if(u===O){n.tag=14,n=l0(null,n,e,o,a);break t}}throw n=q(e)||e,Error(s(306,n,""))}}return n;case 0:return Tf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Us(o,n.pendingProps),p0(e,n,o,u,a);case 3:t:{if(pt(n,n.stateNode.containerInfo),e===null)throw Error(s(387));o=n.pendingProps;var h=n.memoizedState;u=h.element,Ju(e,n),mo(n,o,null,a);var M=n.memoizedState;if(o=M.cache,Ga(n,dn,o),o!==h.cache&&Wu(n,[dn],a,!0),po(),o=M.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:M.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=m0(e,n,o,a);break t}else if(o!==u){u=Si(Error(s(424)),n),oo(u),n=m0(e,n,o,a);break t}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Qe=bi(e.firstChild),Dn=n,Ee=!0,Fa=null,yi=!0,a=um(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Es(),o===u){n=fa(e,n,a);break t}Ln(e,n,o,a)}n=n.child}return n;case 26:return ql(e,n),e===null?(a=Dg(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ee||(a=n.type,e=n.pendingProps,o=uc(It.current).createElement(a),o[un]=n,o[wn]=e,Nn(o,a,e),fn(o),n.stateNode=o):n.memoizedState=Dg(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return jt(n),e===null&&Ee&&(o=n.stateNode=Rg(n.type,n.pendingProps,It.current),Dn=n,yi=!0,u=Qe,ts(n.type)?(fh=u,Qe=bi(o.firstChild)):Qe=u),Ln(e,n,n.pendingProps.children,a),ql(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Ee&&((u=o=Qe)&&(o=Ox(o,n.type,n.pendingProps,yi),o!==null?(n.stateNode=o,Dn=n,Qe=bi(o.firstChild),yi=!1,u=!0):u=!1),u||Ha(n)),jt(n),u=n.type,h=n.pendingProps,M=e!==null?e.memoizedProps:null,o=h.children,rh(u,h)?o=null:M!==null&&rh(u,M)&&(n.flags|=32),n.memoizedState!==null&&(u=sf(e,n,KS,null,null,a),Po._currentValue=u),ql(e,n),Ln(e,n,o,a),n.child;case 6:return e===null&&Ee&&((e=a=Qe)&&(a=Px(a,n.pendingProps,yi),a!==null?(n.stateNode=a,Dn=n,Qe=null,e=!0):e=!1),e||Ha(n)),null;case 13:return g0(e,n,a);case 4:return pt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=ws(n,null,o,a):Ln(e,n,o,a),n.child;case 11:return o0(e,n,n.type,n.pendingProps,a);case 7:return Ln(e,n,n.pendingProps,a),n.child;case 8:return Ln(e,n,n.pendingProps.children,a),n.child;case 12:return Ln(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ga(n,n.type,o.value),Ln(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Ts(n),u=Un(u),o=o(u),n.flags|=1,Ln(e,n,o,a),n.child;case 14:return l0(e,n,n.type,n.pendingProps,a);case 15:return c0(e,n,n.type,n.pendingProps,a);case 19:return v0(e,n,a);case 31:return ix(e,n,a);case 22:return u0(e,n,a,n.pendingProps);case 24:return Ts(n),o=Un(dn),e===null?(u=Zu(),u===null&&(u=qe,h=Yu(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=a),u=h),n.memoizedState={parent:o,cache:u},Qu(n),Ga(n,dn,u)):((e.lanes&a)!==0&&(Ju(e,n),mo(n,null,null,a),po()),u=e.memoizedState,h=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ga(n,dn,o)):(o=h.cache,Ga(n,dn,o),o!==u.cache&&Wu(n,[dn],a,!0))),Ln(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function ha(e){e.flags|=4}function Nf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Y0())e.flags|=8192;else throw Cs=Ll,Ku}else e.flags&=-16777217}function x0(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Pg(n))if(Y0())e.flags|=8192;else throw Cs=Ll,Ku}function Kl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?yt():536870912,e.lanes|=n,pr|=n)}function Mo(e,n){if(!Ee)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Je(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function sx(e,n,a){var o=n.pendingProps;switch(Hu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Je(n),null;case 1:return Je(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),la(dn),bt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(er(n)?ha(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Vu())),Je(n),null;case 26:var u=n.type,h=n.memoizedState;return e===null?(ha(n),h!==null?(Je(n),x0(n,h)):(Je(n),Nf(n,u,null,o,a))):h?h!==e.memoizedState?(ha(n),Je(n),x0(n,h)):(Je(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&ha(n),Je(n),Nf(n,u,e,o,a)),null;case 27:if(Ot(n),a=It.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ha(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Je(n),null}e=Et.current,er(n)?$p(n):(e=Rg(u,o,a),n.stateNode=e,ha(n))}return Je(n),null;case 5:if(Ot(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ha(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Je(n),null}if(h=Et.current,er(n))$p(n);else{var M=uc(It.current);switch(h){case 1:h=M.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=M.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=M.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=M.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=M.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?M.createElement("select",{is:o.is}):M.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?M.createElement(u,{is:o.is}):M.createElement(u)}}h[un]=n,h[wn]=o;t:for(M=n.child;M!==null;){if(M.tag===5||M.tag===6)h.appendChild(M.stateNode);else if(M.tag!==4&&M.tag!==27&&M.child!==null){M.child.return=M,M=M.child;continue}if(M===n)break t;for(;M.sibling===null;){if(M.return===null||M.return===n)break t;M=M.return}M.sibling.return=M.return,M=M.sibling}n.stateNode=h;t:switch(Nn(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ha(n)}}return Je(n),Nf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&ha(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=It.current,er(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=Dn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[un]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||gg(e.nodeValue,a)),e||Ha(n,!0)}else e=uc(e).createTextNode(o),e[un]=n,n.stateNode=e}return Je(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=er(n),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[un]=n}else Es(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Je(n),e=!1}else a=Vu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(li(n),n):(li(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Je(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=er(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[un]=n}else Es(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Je(n),u=!1}else u=Vu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(li(n),n):(li(n),null)}return li(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Kl(n,n.updateQueue),Je(n),null);case 4:return bt(),e===null&&eh(n.stateNode.containerInfo),Je(n),null;case 10:return la(n.type),Je(n),null;case 19:if($(on),o=n.memoizedState,o===null)return Je(n),null;if(u=(n.flags&128)!==0,h=o.rendering,h===null)if(u)Mo(o,!1);else{if(rn!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(h=zl(e),h!==null){for(n.flags|=128,Mo(o,!1),e=h.updateQueue,n.updateQueue=e,Kl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Zp(a,e),a=a.sibling;return ht(on,on.current&1|2),Ee&&ra(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&Oe()>tc&&(n.flags|=128,u=!0,Mo(o,!1),n.lanes=4194304)}else{if(!u)if(e=zl(h),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Kl(n,e),Mo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Ee)return Je(n),null}else 2*Oe()-o.renderingStartTime>tc&&a!==536870912&&(n.flags|=128,u=!0,Mo(o,!1),n.lanes=4194304);o.isBackwards?(h.sibling=n.child,n.child=h):(e=o.last,e!==null?e.sibling=h:n.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Oe(),e.sibling=null,a=on.current,ht(on,u?a&1|2:a&1),Ee&&ra(n,o.treeForkCount),e):(Je(n),null);case 22:case 23:return li(n),ef(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Je(n),n.subtreeFlags&6&&(n.flags|=8192)):Je(n),a=n.updateQueue,a!==null&&Kl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&$(As),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),la(dn),Je(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function rx(e,n){switch(Hu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return la(dn),bt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Ot(n),null;case 31:if(n.memoizedState!==null){if(li(n),n.alternate===null)throw Error(s(340));Es()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(li(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Es()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return $(on),null;case 4:return bt(),null;case 10:return la(n.type),null;case 22:case 23:return li(n),ef(),e!==null&&$(As),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return la(dn),null;case 25:return null;default:return null}}function M0(e,n){switch(Hu(n),n.tag){case 3:la(dn),bt();break;case 26:case 27:case 5:Ot(n);break;case 4:bt();break;case 31:n.memoizedState!==null&&li(n);break;case 13:li(n);break;case 19:$(on);break;case 10:la(n.type);break;case 22:case 23:li(n),ef(),e!==null&&$(As);break;case 24:la(dn)}}function yo(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var h=a.create,M=a.inst;o=h(),M.destroy=o}a=a.next}while(a!==u)}}catch(w){ze(n,n.return,w)}}function qa(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var M=o.inst,w=M.destroy;if(w!==void 0){M.destroy=void 0,u=n;var G=a,rt=w;try{rt()}catch(vt){ze(u,G,vt)}}}o=o.next}while(o!==h)}}catch(vt){ze(n,n.return,vt)}}function y0(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{hm(n,a)}catch(o){ze(e,e.return,o)}}}function E0(e,n,a){a.props=Us(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){ze(e,n,o)}}function Eo(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){ze(e,n,u)}}function Wi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){ze(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){ze(e,n,u)}else a.current=null}function b0(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){ze(e,e.return,u)}}function Of(e,n,a){try{var o=e.stateNode;Cx(o,e.type,a,n),o[wn]=n}catch(u){ze(e,e.return,u)}}function T0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ts(e.type)||e.tag===4}function Pf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||T0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ts(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zf(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=_i));else if(o!==4&&(o===27&&ts(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(zf(e,n,a),e=e.sibling;e!==null;)zf(e,n,a),e=e.sibling}function Ql(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&ts(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Ql(e,n,a),e=e.sibling;e!==null;)Ql(e,n,a),e=e.sibling}function A0(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Nn(n,o,a),n[un]=e,n[wn]=a}catch(h){ze(e,e.return,h)}}var da=!1,gn=!1,If=!1,R0=typeof WeakSet=="function"?WeakSet:Set,Tn=null;function ox(e,n){if(e=e.containerInfo,ah=_c,e=Fp(e),wu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break t}var M=0,w=-1,G=-1,rt=0,vt=0,Mt=e,ct=null;e:for(;;){for(var dt;Mt!==a||u!==0&&Mt.nodeType!==3||(w=M+u),Mt!==h||o!==0&&Mt.nodeType!==3||(G=M+o),Mt.nodeType===3&&(M+=Mt.nodeValue.length),(dt=Mt.firstChild)!==null;)ct=Mt,Mt=dt;for(;;){if(Mt===e)break e;if(ct===a&&++rt===u&&(w=M),ct===h&&++vt===o&&(G=M),(dt=Mt.nextSibling)!==null)break;Mt=ct,ct=Mt.parentNode}Mt=dt}a=w===-1||G===-1?null:{start:w,end:G}}else a=null}a=a||{start:0,end:0}}else a=null;for(sh={focusedElem:e,selectionRange:a},_c=!1,Tn=n;Tn!==null;)if(n=Tn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,Tn=e;else for(;Tn!==null;){switch(n=Tn,h=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,a=n,u=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var Yt=Us(a.type,u);e=o.getSnapshotBeforeUpdate(Yt,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(ee){ze(a,a.return,ee)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)lh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":lh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,Tn=e;break}Tn=n.return}}function C0(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ma(e,a),o&4&&yo(5,a);break;case 1:if(ma(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(M){ze(a,a.return,M)}else{var u=Us(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(M){ze(a,a.return,M)}}o&64&&y0(a),o&512&&Eo(a,a.return);break;case 3:if(ma(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{hm(e,n)}catch(M){ze(a,a.return,M)}}break;case 27:n===null&&o&4&&A0(a);case 26:case 5:ma(e,a),n===null&&o&4&&b0(a),o&512&&Eo(a,a.return);break;case 12:ma(e,a);break;case 31:ma(e,a),o&4&&U0(e,a);break;case 13:ma(e,a),o&4&&L0(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=gx.bind(null,a),zx(e,a))));break;case 22:if(o=a.memoizedState!==null||da,!o){n=n!==null&&n.memoizedState!==null||gn,u=da;var h=gn;da=o,(gn=n)&&!h?ga(e,a,(a.subtreeFlags&8772)!==0):ma(e,a),da=u,gn=h}break;case 30:break;default:ma(e,a)}}function w0(e){var n=e.alternate;n!==null&&(e.alternate=null,w0(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Oa(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,Qn=!1;function pa(e,n,a){for(a=a.child;a!==null;)D0(e,n,a),a=a.sibling}function D0(e,n,a){if(_t&&typeof _t.onCommitFiberUnmount=="function")try{_t.onCommitFiberUnmount(gt,a)}catch{}switch(a.tag){case 26:gn||Wi(a,n),pa(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:gn||Wi(a,n);var o=$e,u=Qn;ts(a.type)&&($e=a.stateNode,Qn=!1),pa(e,n,a),Lo(a.stateNode),$e=o,Qn=u;break;case 5:gn||Wi(a,n);case 6:if(o=$e,u=Qn,$e=null,pa(e,n,a),$e=o,Qn=u,$e!==null)if(Qn)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(a.stateNode)}catch(h){ze(a,n,h)}else try{$e.removeChild(a.stateNode)}catch(h){ze(a,n,h)}break;case 18:$e!==null&&(Qn?(e=$e,yg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),yr(e)):yg($e,a.stateNode));break;case 4:o=$e,u=Qn,$e=a.stateNode.containerInfo,Qn=!0,pa(e,n,a),$e=o,Qn=u;break;case 0:case 11:case 14:case 15:qa(2,a,n),gn||qa(4,a,n),pa(e,n,a);break;case 1:gn||(Wi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&E0(a,n,o)),pa(e,n,a);break;case 21:pa(e,n,a);break;case 22:gn=(o=gn)||a.memoizedState!==null,pa(e,n,a),gn=o;break;default:pa(e,n,a)}}function U0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{yr(e)}catch(a){ze(n,n.return,a)}}}function L0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{yr(e)}catch(a){ze(n,n.return,a)}}function lx(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new R0),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new R0),n;default:throw Error(s(435,e.tag))}}function Jl(e,n){var a=lx(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=_x.bind(null,e,o);o.then(u,u)}})}function Jn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],h=e,M=n,w=M;t:for(;w!==null;){switch(w.tag){case 27:if(ts(w.type)){$e=w.stateNode,Qn=!1;break t}break;case 5:$e=w.stateNode,Qn=!1;break t;case 3:case 4:$e=w.stateNode.containerInfo,Qn=!0;break t}w=w.return}if($e===null)throw Error(s(160));D0(h,M,u),$e=null,Qn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)N0(n,e),n=n.sibling}var Ui=null;function N0(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(n,e),jn(e),o&4&&(qa(3,e,e.return),yo(3,e),qa(5,e,e.return));break;case 1:Jn(n,e),jn(e),o&512&&(gn||a===null||Wi(a,a.return)),o&64&&da&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ui;if(Jn(n,e),jn(e),o&512&&(gn||a===null||Wi(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[Na]||h[un]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),Nn(h,o,a),h[un]=e,fn(h),o=h;break t;case"link":var M=Ng("link","href",u).get(o+(a.href||""));if(M){for(var w=0;w<M.length;w++)if(h=M[w],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){M.splice(w,1);break e}}h=u.createElement(o),Nn(h,o,a),u.head.appendChild(h);break;case"meta":if(M=Ng("meta","content",u).get(o+(a.content||""))){for(w=0;w<M.length;w++)if(h=M[w],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){M.splice(w,1);break e}}h=u.createElement(o),Nn(h,o,a),u.head.appendChild(h);break;default:throw Error(s(468,o))}h[un]=e,fn(h),o=h}e.stateNode=o}else Og(u,e.type,e.stateNode);else e.stateNode=Lg(u,o,e.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?Og(u,e.type,e.stateNode):Lg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Of(e,e.memoizedProps,a.memoizedProps)}break;case 27:Jn(n,e),jn(e),o&512&&(gn||a===null||Wi(a,a.return)),a!==null&&o&4&&Of(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Jn(n,e),jn(e),o&512&&(gn||a===null||Wi(a,a.return)),e.flags&32){u=e.stateNode;try{Vn(u,"")}catch(Yt){ze(e,e.return,Yt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Of(e,u,a!==null?a.memoizedProps:u)),o&1024&&(If=!0);break;case 6:if(Jn(n,e),jn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Yt){ze(e,e.return,Yt)}}break;case 3:if(dc=null,u=Ui,Ui=fc(n.containerInfo),Jn(n,e),Ui=u,jn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{yr(n.containerInfo)}catch(Yt){ze(e,e.return,Yt)}If&&(If=!1,O0(e));break;case 4:o=Ui,Ui=fc(e.stateNode.containerInfo),Jn(n,e),jn(e),Ui=o;break;case 12:Jn(n,e),jn(e);break;case 31:Jn(n,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Jl(e,o)));break;case 13:Jn(n,e),jn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&($l=Oe()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Jl(e,o)));break;case 22:u=e.memoizedState!==null;var G=a!==null&&a.memoizedState!==null,rt=da,vt=gn;if(da=rt||u,gn=vt||G,Jn(n,e),gn=vt,da=rt,jn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||G||da||gn||Ls(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){G=a=n;try{if(h=G.stateNode,u)M=h.style,typeof M.setProperty=="function"?M.setProperty("display","none","important"):M.display="none";else{w=G.stateNode;var Mt=G.memoizedProps.style,ct=Mt!=null&&Mt.hasOwnProperty("display")?Mt.display:null;w.style.display=ct==null||typeof ct=="boolean"?"":(""+ct).trim()}}catch(Yt){ze(G,G.return,Yt)}}}else if(n.tag===6){if(a===null){G=n;try{G.stateNode.nodeValue=u?"":G.memoizedProps}catch(Yt){ze(G,G.return,Yt)}}}else if(n.tag===18){if(a===null){G=n;try{var dt=G.stateNode;u?Eg(dt,!0):Eg(G.stateNode,!1)}catch(Yt){ze(G,G.return,Yt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Jl(e,a))));break;case 19:Jn(n,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Jl(e,o)));break;case 30:break;case 21:break;default:Jn(n,e),jn(e)}}function jn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(T0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,h=Pf(e);Ql(e,h,u);break;case 5:var M=a.stateNode;a.flags&32&&(Vn(M,""),a.flags&=-33);var w=Pf(e);Ql(e,w,M);break;case 3:case 4:var G=a.stateNode.containerInfo,rt=Pf(e);zf(e,rt,G);break;default:throw Error(s(161))}}catch(vt){ze(e,e.return,vt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function O0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;O0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function ma(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)C0(e,n.alternate,n),n=n.sibling}function Ls(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:qa(4,n,n.return),Ls(n);break;case 1:Wi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&E0(n,n.return,a),Ls(n);break;case 27:Lo(n.stateNode);case 26:case 5:Wi(n,n.return),Ls(n);break;case 22:n.memoizedState===null&&Ls(n);break;case 30:Ls(n);break;default:Ls(n)}e=e.sibling}}function ga(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,h=n,M=h.flags;switch(h.tag){case 0:case 11:case 15:ga(u,h,a),yo(4,h);break;case 1:if(ga(u,h,a),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(rt){ze(o,o.return,rt)}if(o=h,u=o.updateQueue,u!==null){var w=o.stateNode;try{var G=u.shared.hiddenCallbacks;if(G!==null)for(u.shared.hiddenCallbacks=null,u=0;u<G.length;u++)fm(G[u],w)}catch(rt){ze(o,o.return,rt)}}a&&M&64&&y0(h),Eo(h,h.return);break;case 27:A0(h);case 26:case 5:ga(u,h,a),a&&o===null&&M&4&&b0(h),Eo(h,h.return);break;case 12:ga(u,h,a);break;case 31:ga(u,h,a),a&&M&4&&U0(u,h);break;case 13:ga(u,h,a),a&&M&4&&L0(u,h);break;case 22:h.memoizedState===null&&ga(u,h,a),Eo(h,h.return);break;case 30:break;default:ga(u,h,a)}n=n.sibling}}function Bf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&lo(a))}function Ff(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&lo(e))}function Li(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)P0(e,n,a,o),n=n.sibling}function P0(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Li(e,n,a,o),u&2048&&yo(9,n);break;case 1:Li(e,n,a,o);break;case 3:Li(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&lo(e)));break;case 12:if(u&2048){Li(e,n,a,o),e=n.stateNode;try{var h=n.memoizedProps,M=h.id,w=h.onPostCommit;typeof w=="function"&&w(M,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(G){ze(n,n.return,G)}}else Li(e,n,a,o);break;case 31:Li(e,n,a,o);break;case 13:Li(e,n,a,o);break;case 23:break;case 22:h=n.stateNode,M=n.alternate,n.memoizedState!==null?h._visibility&2?Li(e,n,a,o):bo(e,n):h._visibility&2?Li(e,n,a,o):(h._visibility|=2,fr(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Bf(M,n);break;case 24:Li(e,n,a,o),u&2048&&Ff(n.alternate,n);break;default:Li(e,n,a,o)}}function fr(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=e,M=n,w=a,G=o,rt=M.flags;switch(M.tag){case 0:case 11:case 15:fr(h,M,w,G,u),yo(8,M);break;case 23:break;case 22:var vt=M.stateNode;M.memoizedState!==null?vt._visibility&2?fr(h,M,w,G,u):bo(h,M):(vt._visibility|=2,fr(h,M,w,G,u)),u&&rt&2048&&Bf(M.alternate,M);break;case 24:fr(h,M,w,G,u),u&&rt&2048&&Ff(M.alternate,M);break;default:fr(h,M,w,G,u)}n=n.sibling}}function bo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:bo(a,o),u&2048&&Bf(o.alternate,o);break;case 24:bo(a,o),u&2048&&Ff(o.alternate,o);break;default:bo(a,o)}n=n.sibling}}var To=8192;function hr(e,n,a){if(e.subtreeFlags&To)for(e=e.child;e!==null;)z0(e,n,a),e=e.sibling}function z0(e,n,a){switch(e.tag){case 26:hr(e,n,a),e.flags&To&&e.memoizedState!==null&&Zx(a,Ui,e.memoizedState,e.memoizedProps);break;case 5:hr(e,n,a);break;case 3:case 4:var o=Ui;Ui=fc(e.stateNode.containerInfo),hr(e,n,a),Ui=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=To,To=16777216,hr(e,n,a),To=o):hr(e,n,a));break;default:hr(e,n,a)}}function I0(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Ao(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Tn=o,F0(o,e)}I0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)B0(e),e=e.sibling}function B0(e){switch(e.tag){case 0:case 11:case 15:Ao(e),e.flags&2048&&qa(9,e,e.return);break;case 3:Ao(e);break;case 12:Ao(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,jl(e)):Ao(e);break;default:Ao(e)}}function jl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Tn=o,F0(o,e)}I0(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:qa(8,n,n.return),jl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,jl(n));break;default:jl(n)}e=e.sibling}}function F0(e,n){for(;Tn!==null;){var a=Tn;switch(a.tag){case 0:case 11:case 15:qa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:lo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Tn=o;else t:for(a=e;Tn!==null;){o=Tn;var u=o.sibling,h=o.return;if(w0(o),o===a){Tn=null;break t}if(u!==null){u.return=h,Tn=u;break t}Tn=h}}}var cx={getCacheForType:function(e){var n=Un(dn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Un(dn).controller.signal}},ux=typeof WeakMap=="function"?WeakMap:Map,Le=0,qe=null,ve=null,Me=0,Pe=0,ci=null,Za=!1,dr=!1,Hf=!1,_a=0,rn=0,Ka=0,Ns=0,Gf=0,ui=0,pr=0,Ro=null,$n=null,Vf=!1,$l=0,H0=0,tc=1/0,ec=null,Qa=null,Sn=0,Ja=null,mr=null,va=0,kf=0,Xf=null,G0=null,Co=0,Wf=null;function fi(){return(Le&2)!==0&&Me!==0?Me&-Me:B.T!==null?Jf():Kr()}function V0(){if(ui===0)if((Me&536870912)===0||Ee){var e=ne;ne<<=1,(ne&3932160)===0&&(ne=262144),ui=e}else ui=536870912;return e=oi.current,e!==null&&(e.flags|=32),ui}function ti(e,n,a){(e===qe&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)&&(gr(e,0),ja(e,Me,ui,!1)),Xt(e,a),((Le&2)===0||e!==qe)&&(e===qe&&((Le&2)===0&&(Ns|=a),rn===4&&ja(e,Me,ui,!1)),Yi(e))}function k0(e,n,a){if((Le&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||wt(e,n),u=o?dx(e,n):qf(e,n,!0),h=o;do{if(u===0){dr&&!o&&ja(e,n,0,!1);break}else{if(a=e.current.alternate,h&&!fx(a)){u=qf(e,n,!1),h=!1;continue}if(u===2){if(h=n,e.errorRecoveryDisabledLanes&h)var M=0;else M=e.pendingLanes&-536870913,M=M!==0?M:M&536870912?536870912:0;if(M!==0){n=M;t:{var w=e;u=Ro;var G=w.current.memoizedState.isDehydrated;if(G&&(gr(w,M).flags|=256),M=qf(w,M,!1),M!==2){if(Hf&&!G){w.errorRecoveryDisabledLanes|=h,Ns|=h,u=4;break t}h=$n,$n=u,h!==null&&($n===null?$n=h:$n.push.apply($n,h))}u=M}if(h=!1,u!==2)continue}}if(u===1){gr(e,0),ja(e,n,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:ja(o,n,ui,!Za);break t;case 2:$n=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=$l+300-Oe(),10<u)){if(ja(o,n,ui,!Za),St(o,0,!0)!==0)break t;va=n,o.timeoutHandle=xg(X0.bind(null,o,a,$n,ec,Vf,n,ui,Ns,pr,Za,h,"Throttled",-0,0),u);break t}X0(o,a,$n,ec,Vf,n,ui,Ns,pr,Za,h,null,-0,0)}}break}while(!0);Yi(e)}function X0(e,n,a,o,u,h,M,w,G,rt,vt,Mt,ct,dt){if(e.timeoutHandle=-1,Mt=n.subtreeFlags,Mt&8192||(Mt&16785408)===16785408){Mt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:_i},z0(n,h,Mt);var Yt=(h&62914560)===h?$l-Oe():(h&4194048)===h?H0-Oe():0;if(Yt=Kx(Mt,Yt),Yt!==null){va=h,e.cancelPendingCommit=Yt(j0.bind(null,e,n,h,a,o,u,M,w,G,vt,Mt,null,ct,dt)),ja(e,h,M,!rt);return}}j0(e,n,h,a,o,u,M,w,G)}function fx(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],h=u.getSnapshot;u=u.value;try{if(!si(h(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ja(e,n,a,o){n&=~Gf,n&=~Ns,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var h=31-Gt(u),M=1<<h;o[h]=-1,u&=~M}a!==0&&Te(e,a,n)}function nc(){return(Le&6)===0?(wo(0),!1):!0}function Yf(){if(ve!==null){if(Pe===0)var e=ve.return;else e=ve,oa=bs=null,lf(e),rr=null,uo=0,e=ve;for(;e!==null;)M0(e.alternate,e),e=e.return;ve=null}}function gr(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,Ux(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),va=0,Yf(),qe=e,ve=a=sa(e.current,null),Me=n,Pe=0,ci=null,Za=!1,dr=wt(e,n),Hf=!1,pr=ui=Gf=Ns=Ka=rn=0,$n=Ro=null,Vf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-Gt(o),h=1<<u;n|=e[u],o&=~h}return _a=n,El(),a}function W0(e,n){ue=null,B.H=So,n===sr||n===Ul?(n=om(),Pe=3):n===Ku?(n=om(),Pe=4):Pe=n===bf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ci=n,ve===null&&(rn=1,Wl(e,Si(n,e.current)))}function Y0(){var e=oi.current;return e===null?!0:(Me&4194048)===Me?Ei===null:(Me&62914560)===Me||(Me&536870912)!==0?e===Ei:!1}function q0(){var e=B.H;return B.H=So,e===null?So:e}function Z0(){var e=B.A;return B.A=cx,e}function ic(){rn=4,Za||(Me&4194048)!==Me&&oi.current!==null||(dr=!0),(Ka&134217727)===0&&(Ns&134217727)===0||qe===null||ja(qe,Me,ui,!1)}function qf(e,n,a){var o=Le;Le|=2;var u=q0(),h=Z0();(qe!==e||Me!==n)&&(ec=null,gr(e,n)),n=!1;var M=rn;t:do try{if(Pe!==0&&ve!==null){var w=ve,G=ci;switch(Pe){case 8:Yf(),M=6;break t;case 3:case 2:case 9:case 6:oi.current===null&&(n=!0);var rt=Pe;if(Pe=0,ci=null,_r(e,w,G,rt),a&&dr){M=0;break t}break;default:rt=Pe,Pe=0,ci=null,_r(e,w,G,rt)}}hx(),M=rn;break}catch(vt){W0(e,vt)}while(!0);return n&&e.shellSuspendCounter++,oa=bs=null,Le=o,B.H=u,B.A=h,ve===null&&(qe=null,Me=0,El()),M}function hx(){for(;ve!==null;)K0(ve)}function dx(e,n){var a=Le;Le|=2;var o=q0(),u=Z0();qe!==e||Me!==n?(ec=null,tc=Oe()+500,gr(e,n)):dr=wt(e,n);t:do try{if(Pe!==0&&ve!==null){n=ve;var h=ci;e:switch(Pe){case 1:Pe=0,ci=null,_r(e,n,h,1);break;case 2:case 9:if(sm(h)){Pe=0,ci=null,Q0(n);break}n=function(){Pe!==2&&Pe!==9||qe!==e||(Pe=7),Yi(e)},h.then(n,n);break t;case 3:Pe=7;break t;case 4:Pe=5;break t;case 7:sm(h)?(Pe=0,ci=null,Q0(n)):(Pe=0,ci=null,_r(e,n,h,7));break;case 5:var M=null;switch(ve.tag){case 26:M=ve.memoizedState;case 5:case 27:var w=ve;if(M?Pg(M):w.stateNode.complete){Pe=0,ci=null;var G=w.sibling;if(G!==null)ve=G;else{var rt=w.return;rt!==null?(ve=rt,ac(rt)):ve=null}break e}}Pe=0,ci=null,_r(e,n,h,5);break;case 6:Pe=0,ci=null,_r(e,n,h,6);break;case 8:Yf(),rn=6;break t;default:throw Error(s(462))}}px();break}catch(vt){W0(e,vt)}while(!0);return oa=bs=null,B.H=o,B.A=u,Le=a,ve!==null?0:(qe=null,Me=0,El(),rn)}function px(){for(;ve!==null&&!an();)K0(ve)}function K0(e){var n=S0(e.alternate,e,_a);e.memoizedProps=e.pendingProps,n===null?ac(e):ve=n}function Q0(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=d0(a,n,n.pendingProps,n.type,void 0,Me);break;case 11:n=d0(a,n,n.pendingProps,n.type.render,n.ref,Me);break;case 5:lf(n);default:M0(a,n),n=ve=Zp(n,_a),n=S0(a,n,_a)}e.memoizedProps=e.pendingProps,n===null?ac(e):ve=n}function _r(e,n,a,o){oa=bs=null,lf(n),rr=null,uo=0;var u=n.return;try{if(nx(e,u,n,a,Me)){rn=1,Wl(e,Si(a,e.current)),ve=null;return}}catch(h){if(u!==null)throw ve=u,h;rn=1,Wl(e,Si(a,e.current)),ve=null;return}n.flags&32768?(Ee||o===1?e=!0:dr||(Me&536870912)!==0?e=!1:(Za=e=!0,(o===2||o===9||o===3||o===6)&&(o=oi.current,o!==null&&o.tag===13&&(o.flags|=16384))),J0(n,e)):ac(n)}function ac(e){var n=e;do{if((n.flags&32768)!==0){J0(n,Za);return}e=n.return;var a=sx(n.alternate,n,_a);if(a!==null){ve=a;return}if(n=n.sibling,n!==null){ve=n;return}ve=n=e}while(n!==null);rn===0&&(rn=5)}function J0(e,n){do{var a=rx(e.alternate,e);if(a!==null){a.flags&=32767,ve=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){ve=e;return}ve=e=a}while(e!==null);rn=6,ve=null}function j0(e,n,a,o,u,h,M,w,G){e.cancelPendingCommit=null;do sc();while(Sn!==0);if((Le&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(h=n.lanes|n.childLanes,h|=Ou,Fe(e,a,h,M,w,G),e===qe&&(ve=qe=null,Me=0),mr=n,Ja=e,va=a,kf=h,Xf=u,G0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,vx(J,function(){return ig(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=B.T,B.T=null,u=V.p,V.p=2,M=Le,Le|=4;try{ox(e,n,a)}finally{Le=M,V.p=u,B.T=o}}Sn=1,$0(),tg(),eg()}}function $0(){if(Sn===1){Sn=0;var e=Ja,n=mr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=B.T,B.T=null;var o=V.p;V.p=2;var u=Le;Le|=4;try{N0(n,e);var h=sh,M=Fp(e.containerInfo),w=h.focusedElem,G=h.selectionRange;if(M!==w&&w&&w.ownerDocument&&Bp(w.ownerDocument.documentElement,w)){if(G!==null&&wu(w)){var rt=G.start,vt=G.end;if(vt===void 0&&(vt=rt),"selectionStart"in w)w.selectionStart=rt,w.selectionEnd=Math.min(vt,w.value.length);else{var Mt=w.ownerDocument||document,ct=Mt&&Mt.defaultView||window;if(ct.getSelection){var dt=ct.getSelection(),Yt=w.textContent.length,ee=Math.min(G.start,Yt),ke=G.end===void 0?ee:Math.min(G.end,Yt);!dt.extend&&ee>ke&&(M=ke,ke=ee,ee=M);var K=Ip(w,ee),X=Ip(w,ke);if(K&&X&&(dt.rangeCount!==1||dt.anchorNode!==K.node||dt.anchorOffset!==K.offset||dt.focusNode!==X.node||dt.focusOffset!==X.offset)){var st=Mt.createRange();st.setStart(K.node,K.offset),dt.removeAllRanges(),ee>ke?(dt.addRange(st),dt.extend(X.node,X.offset)):(st.setEnd(X.node,X.offset),dt.addRange(st))}}}}for(Mt=[],dt=w;dt=dt.parentNode;)dt.nodeType===1&&Mt.push({element:dt,left:dt.scrollLeft,top:dt.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<Mt.length;w++){var xt=Mt[w];xt.element.scrollLeft=xt.left,xt.element.scrollTop=xt.top}}_c=!!ah,sh=ah=null}finally{Le=u,V.p=o,B.T=a}}e.current=n,Sn=2}}function tg(){if(Sn===2){Sn=0;var e=Ja,n=mr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=B.T,B.T=null;var o=V.p;V.p=2;var u=Le;Le|=4;try{C0(e,n.alternate,n)}finally{Le=u,V.p=o,B.T=a}}Sn=3}}function eg(){if(Sn===4||Sn===3){Sn=0,Z();var e=Ja,n=mr,a=va,o=G0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Sn=5:(Sn=0,mr=Ja=null,ng(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Qa=null),Zr(a),n=n.stateNode,_t&&typeof _t.onCommitFiberRoot=="function")try{_t.onCommitFiberRoot(gt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=B.T,u=V.p,V.p=2,B.T=null;try{for(var h=e.onRecoverableError,M=0;M<o.length;M++){var w=o[M];h(w.value,{componentStack:w.stack})}}finally{B.T=n,V.p=u}}(va&3)!==0&&sc(),Yi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Wf?Co++:(Co=0,Wf=e):Co=0,wo(0)}}function ng(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,lo(n)))}function sc(){return $0(),tg(),eg(),ig()}function ig(){if(Sn!==5)return!1;var e=Ja,n=kf;kf=0;var a=Zr(va),o=B.T,u=V.p;try{V.p=32>a?32:a,B.T=null,a=Xf,Xf=null;var h=Ja,M=va;if(Sn=0,mr=Ja=null,va=0,(Le&6)!==0)throw Error(s(331));var w=Le;if(Le|=4,B0(h.current),P0(h,h.current,M,a),Le=w,wo(0,!1),_t&&typeof _t.onPostCommitFiberRoot=="function")try{_t.onPostCommitFiberRoot(gt,h)}catch{}return!0}finally{V.p=u,B.T=o,ng(e,n)}}function ag(e,n,a){n=Si(a,n),n=Ef(e.stateNode,n,2),e=Xa(e,n,2),e!==null&&(Xt(e,2),Yi(e))}function ze(e,n,a){if(e.tag===3)ag(e,e,a);else for(;n!==null;){if(n.tag===3){ag(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Qa===null||!Qa.has(o))){e=Si(a,e),a=s0(2),o=Xa(n,a,2),o!==null&&(r0(a,o,n,e),Xt(o,2),Yi(o));break}}n=n.return}}function Zf(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new ux;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Hf=!0,u.add(a),e=mx.bind(null,e,n,a),n.then(e,e))}function mx(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,qe===e&&(Me&a)===a&&(rn===4||rn===3&&(Me&62914560)===Me&&300>Oe()-$l?(Le&2)===0&&gr(e,0):Gf|=a,pr===Me&&(pr=0)),Yi(e)}function sg(e,n){n===0&&(n=yt()),e=Ms(e,n),e!==null&&(Xt(e,n),Yi(e))}function gx(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),sg(e,a)}function _x(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),sg(e,a)}function vx(e,n){return bn(e,n)}var rc=null,vr=null,Kf=!1,oc=!1,Qf=!1,$a=0;function Yi(e){e!==vr&&e.next===null&&(vr===null?rc=vr=e:vr=vr.next=e),oc=!0,Kf||(Kf=!0,xx())}function wo(e,n){if(!Qf&&oc){Qf=!0;do for(var a=!1,o=rc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var M=o.suspendedLanes,w=o.pingedLanes;h=(1<<31-Gt(42|e)+1)-1,h&=u&~(M&~w),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,cg(o,h))}else h=Me,h=St(o,o===qe?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||wt(o,h)||(a=!0,cg(o,h));o=o.next}while(a);Qf=!1}}function Sx(){rg()}function rg(){oc=Kf=!1;var e=0;$a!==0&&Dx()&&(e=$a);for(var n=Oe(),a=null,o=rc;o!==null;){var u=o.next,h=og(o,n);h===0?(o.next=null,a===null?rc=u:a.next=u,u===null&&(vr=a)):(a=o,(e!==0||(h&3)!==0)&&(oc=!0)),o=u}Sn!==0&&Sn!==5||wo(e),$a!==0&&($a=0)}function og(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var M=31-Gt(h),w=1<<M,G=u[M];G===-1?((w&a)===0||(w&o)!==0)&&(u[M]=Bt(w,n)):G<=n&&(e.expiredLanes|=w),h&=~w}if(n=qe,a=Me,a=St(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&We(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||wt(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&We(o),Zr(a)){case 2:case 8:a=b;break;case 32:a=J;break;case 268435456:a=mt;break;default:a=J}return o=lg.bind(null,e),a=bn(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&We(o),e.callbackPriority=2,e.callbackNode=null,2}function lg(e,n){if(Sn!==0&&Sn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(sc()&&e.callbackNode!==a)return null;var o=Me;return o=St(e,e===qe?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(k0(e,o,n),og(e,Oe()),e.callbackNode!=null&&e.callbackNode===a?lg.bind(null,e):null)}function cg(e,n){if(sc())return null;k0(e,n,!0)}function xx(){Lx(function(){(Le&6)!==0?bn(z,Sx):rg()})}function Jf(){if($a===0){var e=ir;e===0&&(e=Jt,Jt<<=1,(Jt&261888)===0&&(Jt=256)),$a=e}return $a}function ug(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:wi(""+e)}function fg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function Mx(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var h=ug((u[wn]||null).action),M=o.submitter;M&&(n=(n=M[wn]||null)?ug(n.formAction):M.getAttribute("formAction"),n!==null&&(h=n,M=null));var w=new Sl("action","action",null,o,u);e.push({event:w,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if($a!==0){var G=M?fg(u,M):new FormData(u);_f(a,{pending:!0,data:G,method:u.method,action:h},null,G)}}else typeof h=="function"&&(w.preventDefault(),G=M?fg(u,M):new FormData(u),_f(a,{pending:!0,data:G,method:u.method,action:h},h,G))},currentTarget:u}]})}}for(var jf=0;jf<Nu.length;jf++){var $f=Nu[jf],yx=$f.toLowerCase(),Ex=$f[0].toUpperCase()+$f.slice(1);Di(yx,"on"+Ex)}Di(Vp,"onAnimationEnd"),Di(kp,"onAnimationIteration"),Di(Xp,"onAnimationStart"),Di("dblclick","onDoubleClick"),Di("focusin","onFocus"),Di("focusout","onBlur"),Di(FS,"onTransitionRun"),Di(HS,"onTransitionStart"),Di(GS,"onTransitionCancel"),Di(Wp,"onTransitionEnd"),k("onMouseEnter",["mouseout","mouseover"]),k("onMouseLeave",["mouseout","mouseover"]),k("onPointerEnter",["pointerout","pointerover"]),k("onPointerLeave",["pointerout","pointerover"]),A("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),A("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),A("onBeforeInput",["compositionend","keypress","textInput","paste"]),A("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),A("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),A("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Do="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bx=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Do));function hg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var h=void 0;if(n)for(var M=o.length-1;0<=M;M--){var w=o[M],G=w.instance,rt=w.currentTarget;if(w=w.listener,G!==h&&u.isPropagationStopped())break t;h=w,u.currentTarget=rt;try{h(u)}catch(vt){yl(vt)}u.currentTarget=null,h=G}else for(M=0;M<o.length;M++){if(w=o[M],G=w.instance,rt=w.currentTarget,w=w.listener,G!==h&&u.isPropagationStopped())break t;h=w,u.currentTarget=rt;try{h(u)}catch(vt){yl(vt)}u.currentTarget=null,h=G}}}}function Se(e,n){var a=n[ms];a===void 0&&(a=n[ms]=new Set);var o=e+"__bubble";a.has(o)||(dg(n,e,2,!1),a.add(o))}function th(e,n,a){var o=0;n&&(o|=4),dg(a,e,o,n)}var lc="_reactListening"+Math.random().toString(36).slice(2);function eh(e){if(!e[lc]){e[lc]=!0,ml.forEach(function(a){a!=="selectionchange"&&(bx.has(a)||th(a,!1,e),th(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[lc]||(n[lc]=!0,th("selectionchange",!1,n))}}function dg(e,n,a,o){switch(Vg(n)){case 2:var u=jx;break;case 8:u=$x;break;default:u=gh}a=u.bind(null,n,a,e),u=void 0,!xu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function nh(e,n,a,o,u){var h=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var M=o.tag;if(M===3||M===4){var w=o.stateNode.containerInfo;if(w===u)break;if(M===4)for(M=o.return;M!==null;){var G=M.tag;if((G===3||G===4)&&M.stateNode.containerInfo===u)return;M=M.return}for(;w!==null;){if(M=na(w),M===null)return;if(G=M.tag,G===5||G===6||G===26||G===27){o=h=M;continue t}w=w.parentNode}}o=o.return}vp(function(){var rt=h,vt=vu(a),Mt=[];t:{var ct=Yp.get(e);if(ct!==void 0){var dt=Sl,Yt=e;switch(e){case"keypress":if(_l(a)===0)break t;case"keydown":case"keyup":dt=_S;break;case"focusin":Yt="focus",dt=bu;break;case"focusout":Yt="blur",dt=bu;break;case"beforeblur":case"afterblur":dt=bu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":dt=Mp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":dt=sS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":dt=xS;break;case Vp:case kp:case Xp:dt=lS;break;case Wp:dt=yS;break;case"scroll":case"scrollend":dt=iS;break;case"wheel":dt=bS;break;case"copy":case"cut":case"paste":dt=uS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":dt=Ep;break;case"toggle":case"beforetoggle":dt=AS}var ee=(n&4)!==0,ke=!ee&&(e==="scroll"||e==="scrollend"),K=ee?ct!==null?ct+"Capture":null:ct;ee=[];for(var X=rt,st;X!==null;){var xt=X;if(st=xt.stateNode,xt=xt.tag,xt!==5&&xt!==26&&xt!==27||st===null||K===null||(xt=Jr(X,K),xt!=null&&ee.push(Uo(X,xt,st))),ke)break;X=X.return}0<ee.length&&(ct=new dt(ct,Yt,null,a,vt),Mt.push({event:ct,listeners:ee}))}}if((n&7)===0){t:{if(ct=e==="mouseover"||e==="pointerover",dt=e==="mouseout"||e==="pointerout",ct&&a!==_u&&(Yt=a.relatedTarget||a.fromElement)&&(na(Yt)||Yt[Zn]))break t;if((dt||ct)&&(ct=vt.window===vt?vt:(ct=vt.ownerDocument)?ct.defaultView||ct.parentWindow:window,dt?(Yt=a.relatedTarget||a.toElement,dt=rt,Yt=Yt?na(Yt):null,Yt!==null&&(ke=c(Yt),ee=Yt.tag,Yt!==ke||ee!==5&&ee!==27&&ee!==6)&&(Yt=null)):(dt=null,Yt=rt),dt!==Yt)){if(ee=Mp,xt="onMouseLeave",K="onMouseEnter",X="mouse",(e==="pointerout"||e==="pointerover")&&(ee=Ep,xt="onPointerLeave",K="onPointerEnter",X="pointer"),ke=dt==null?ct:_s(dt),st=Yt==null?ct:_s(Yt),ct=new ee(xt,X+"leave",dt,a,vt),ct.target=ke,ct.relatedTarget=st,xt=null,na(vt)===rt&&(ee=new ee(K,X+"enter",Yt,a,vt),ee.target=st,ee.relatedTarget=ke,xt=ee),ke=xt,dt&&Yt)e:{for(ee=Tx,K=dt,X=Yt,st=0,xt=K;xt;xt=ee(xt))st++;xt=0;for(var $t=X;$t;$t=ee($t))xt++;for(;0<st-xt;)K=ee(K),st--;for(;0<xt-st;)X=ee(X),xt--;for(;st--;){if(K===X||X!==null&&K===X.alternate){ee=K;break e}K=ee(K),X=ee(X)}ee=null}else ee=null;dt!==null&&pg(Mt,ct,dt,ee,!1),Yt!==null&&ke!==null&&pg(Mt,ke,Yt,ee,!0)}}t:{if(ct=rt?_s(rt):window,dt=ct.nodeName&&ct.nodeName.toLowerCase(),dt==="select"||dt==="input"&&ct.type==="file")var Re=Up;else if(wp(ct))if(Lp)Re=zS;else{Re=OS;var qt=NS}else dt=ct.nodeName,!dt||dt.toLowerCase()!=="input"||ct.type!=="checkbox"&&ct.type!=="radio"?rt&&gi(rt.elementType)&&(Re=Up):Re=PS;if(Re&&(Re=Re(e,rt))){Dp(Mt,Re,a,vt);break t}qt&&qt(e,ct,rt),e==="focusout"&&rt&&ct.type==="number"&&rt.memoizedProps.value!=null&&vn(ct,"number",ct.value)}switch(qt=rt?_s(rt):window,e){case"focusin":(wp(qt)||qt.contentEditable==="true")&&(Ks=qt,Du=rt,so=null);break;case"focusout":so=Du=Ks=null;break;case"mousedown":Uu=!0;break;case"contextmenu":case"mouseup":case"dragend":Uu=!1,Hp(Mt,a,vt);break;case"selectionchange":if(BS)break;case"keydown":case"keyup":Hp(Mt,a,vt)}var fe;if(Au)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else Zs?Rp(e,a)&&(ye="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ye="onCompositionStart");ye&&(bp&&a.locale!=="ko"&&(Zs||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&Zs&&(fe=Sp()):(Ia=vt,Mu="value"in Ia?Ia.value:Ia.textContent,Zs=!0)),qt=cc(rt,ye),0<qt.length&&(ye=new yp(ye,e,null,a,vt),Mt.push({event:ye,listeners:qt}),fe?ye.data=fe:(fe=Cp(a),fe!==null&&(ye.data=fe)))),(fe=CS?wS(e,a):DS(e,a))&&(ye=cc(rt,"onBeforeInput"),0<ye.length&&(qt=new yp("onBeforeInput","beforeinput",null,a,vt),Mt.push({event:qt,listeners:ye}),qt.data=fe)),Mx(Mt,e,rt,a,vt)}hg(Mt,n)})}function Uo(e,n,a){return{instance:e,listener:n,currentTarget:a}}function cc(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=Jr(e,a),u!=null&&o.unshift(Uo(e,u,h)),u=Jr(e,n),u!=null&&o.push(Uo(e,u,h))),e.tag===3)return o;e=e.return}return[]}function Tx(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function pg(e,n,a,o,u){for(var h=n._reactName,M=[];a!==null&&a!==o;){var w=a,G=w.alternate,rt=w.stateNode;if(w=w.tag,G!==null&&G===o)break;w!==5&&w!==26&&w!==27||rt===null||(G=rt,u?(rt=Jr(a,h),rt!=null&&M.unshift(Uo(a,rt,G))):u||(rt=Jr(a,h),rt!=null&&M.push(Uo(a,rt,G)))),a=a.return}M.length!==0&&e.push({event:n,listeners:M})}var Ax=/\r\n?/g,Rx=/\u0000|\uFFFD/g;function mg(e){return(typeof e=="string"?e:""+e).replace(Ax,`
`).replace(Rx,"")}function gg(e,n){return n=mg(n),mg(e)===n}function Ve(e,n,a,o,u,h){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Vn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Vn(e,""+o);break;case"className":Lt(e,"class",o);break;case"tabIndex":Lt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Lt(e,a,o);break;case"style":je(e,o,h);break;case"data":if(n!=="object"){Lt(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=wi(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(n!=="input"&&Ve(e,n,"name",u.name,u,null),Ve(e,n,"formEncType",u.formEncType,u,null),Ve(e,n,"formMethod",u.formMethod,u,null),Ve(e,n,"formTarget",u.formTarget,u,null)):(Ve(e,n,"encType",u.encType,u,null),Ve(e,n,"method",u.method,u,null),Ve(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=wi(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=_i);break;case"onScroll":o!=null&&Se("scroll",e);break;case"onScrollEnd":o!=null&&Se("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=wi(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":Se("beforetoggle",e),Se("toggle",e),Vt(e,"popover",o);break;case"xlinkActuate":Ft(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ft(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ft(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ft(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ft(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ft(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ft(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ft(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ft(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Vt(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=He.get(a)||a,Vt(e,a,o))}}function ih(e,n,a,o,u,h){switch(a){case"style":je(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Vn(e,o):(typeof o=="number"||typeof o=="bigint")&&Vn(e,""+o);break;case"onScroll":o!=null&&Se("scroll",e);break;case"onScrollEnd":o!=null&&Se("scrollend",e);break;case"onClick":o!=null&&(e.onclick=_i);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Qr.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),h=e[wn]||null,h=h!=null?h[a]:null,typeof h=="function"&&e.removeEventListener(n,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Vt(e,a,o)}}}function Nn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Se("error",e),Se("load",e);var o=!1,u=!1,h;for(h in a)if(a.hasOwnProperty(h)){var M=a[h];if(M!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ve(e,n,h,M,a,null)}}u&&Ve(e,n,"srcSet",a.srcSet,a,null),o&&Ve(e,n,"src",a.src,a,null);return;case"input":Se("invalid",e);var w=h=M=u=null,G=null,rt=null;for(o in a)if(a.hasOwnProperty(o)){var vt=a[o];if(vt!=null)switch(o){case"name":u=vt;break;case"type":M=vt;break;case"checked":G=vt;break;case"defaultChecked":rt=vt;break;case"value":h=vt;break;case"defaultValue":w=vt;break;case"children":case"dangerouslySetInnerHTML":if(vt!=null)throw Error(s(137,n));break;default:Ve(e,n,o,vt,a,null)}}kt(e,h,w,G,rt,M,u,!1);return;case"select":Se("invalid",e),o=M=h=null;for(u in a)if(a.hasOwnProperty(u)&&(w=a[u],w!=null))switch(u){case"value":h=w;break;case"defaultValue":M=w;break;case"multiple":o=w;default:Ve(e,n,u,w,a,null)}n=h,a=M,e.multiple=!!o,n!=null?de(e,!!o,n,!1):a!=null&&de(e,!!o,a,!0);return;case"textarea":Se("invalid",e),h=u=o=null;for(M in a)if(a.hasOwnProperty(M)&&(w=a[M],w!=null))switch(M){case"value":o=w;break;case"defaultValue":u=w;break;case"children":h=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(s(91));break;default:Ve(e,n,M,w,a,null)}ai(e,o,u,h);return;case"option":for(G in a)a.hasOwnProperty(G)&&(o=a[G],o!=null)&&(G==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":Ve(e,n,G,o,a,null));return;case"dialog":Se("beforetoggle",e),Se("toggle",e),Se("cancel",e),Se("close",e);break;case"iframe":case"object":Se("load",e);break;case"video":case"audio":for(o=0;o<Do.length;o++)Se(Do[o],e);break;case"image":Se("error",e),Se("load",e);break;case"details":Se("toggle",e);break;case"embed":case"source":case"link":Se("error",e),Se("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(rt in a)if(a.hasOwnProperty(rt)&&(o=a[rt],o!=null))switch(rt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ve(e,n,rt,o,a,null)}return;default:if(gi(n)){for(vt in a)a.hasOwnProperty(vt)&&(o=a[vt],o!==void 0&&ih(e,n,vt,o,a,void 0));return}}for(w in a)a.hasOwnProperty(w)&&(o=a[w],o!=null&&Ve(e,n,w,o,a,null))}function Cx(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,M=null,w=null,G=null,rt=null,vt=null;for(dt in a){var Mt=a[dt];if(a.hasOwnProperty(dt)&&Mt!=null)switch(dt){case"checked":break;case"value":break;case"defaultValue":G=Mt;default:o.hasOwnProperty(dt)||Ve(e,n,dt,null,o,Mt)}}for(var ct in o){var dt=o[ct];if(Mt=a[ct],o.hasOwnProperty(ct)&&(dt!=null||Mt!=null))switch(ct){case"type":h=dt;break;case"name":u=dt;break;case"checked":rt=dt;break;case"defaultChecked":vt=dt;break;case"value":M=dt;break;case"defaultValue":w=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(s(137,n));break;default:dt!==Mt&&Ve(e,n,ct,dt,o,Mt)}}hn(e,M,w,G,rt,vt,h,u);return;case"select":dt=M=w=ct=null;for(h in a)if(G=a[h],a.hasOwnProperty(h)&&G!=null)switch(h){case"value":break;case"multiple":dt=G;default:o.hasOwnProperty(h)||Ve(e,n,h,null,o,G)}for(u in o)if(h=o[u],G=a[u],o.hasOwnProperty(u)&&(h!=null||G!=null))switch(u){case"value":ct=h;break;case"defaultValue":w=h;break;case"multiple":M=h;default:h!==G&&Ve(e,n,u,h,o,G)}n=w,a=M,o=dt,ct!=null?de(e,!!a,ct,!1):!!o!=!!a&&(n!=null?de(e,!!a,n,!0):de(e,!!a,a?[]:"",!1));return;case"textarea":dt=ct=null;for(w in a)if(u=a[w],a.hasOwnProperty(w)&&u!=null&&!o.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:Ve(e,n,w,null,o,u)}for(M in o)if(u=o[M],h=a[M],o.hasOwnProperty(M)&&(u!=null||h!=null))switch(M){case"value":ct=u;break;case"defaultValue":dt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==h&&Ve(e,n,M,u,o,h)}Gn(e,ct,dt);return;case"option":for(var Yt in a)ct=a[Yt],a.hasOwnProperty(Yt)&&ct!=null&&!o.hasOwnProperty(Yt)&&(Yt==="selected"?e.selected=!1:Ve(e,n,Yt,null,o,ct));for(G in o)ct=o[G],dt=a[G],o.hasOwnProperty(G)&&ct!==dt&&(ct!=null||dt!=null)&&(G==="selected"?e.selected=ct&&typeof ct!="function"&&typeof ct!="symbol":Ve(e,n,G,ct,o,dt));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ee in a)ct=a[ee],a.hasOwnProperty(ee)&&ct!=null&&!o.hasOwnProperty(ee)&&Ve(e,n,ee,null,o,ct);for(rt in o)if(ct=o[rt],dt=a[rt],o.hasOwnProperty(rt)&&ct!==dt&&(ct!=null||dt!=null))switch(rt){case"children":case"dangerouslySetInnerHTML":if(ct!=null)throw Error(s(137,n));break;default:Ve(e,n,rt,ct,o,dt)}return;default:if(gi(n)){for(var ke in a)ct=a[ke],a.hasOwnProperty(ke)&&ct!==void 0&&!o.hasOwnProperty(ke)&&ih(e,n,ke,void 0,o,ct);for(vt in o)ct=o[vt],dt=a[vt],!o.hasOwnProperty(vt)||ct===dt||ct===void 0&&dt===void 0||ih(e,n,vt,ct,o,dt);return}}for(var K in a)ct=a[K],a.hasOwnProperty(K)&&ct!=null&&!o.hasOwnProperty(K)&&Ve(e,n,K,null,o,ct);for(Mt in o)ct=o[Mt],dt=a[Mt],!o.hasOwnProperty(Mt)||ct===dt||ct==null&&dt==null||Ve(e,n,Mt,ct,o,dt)}function _g(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function wx(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],h=u.transferSize,M=u.initiatorType,w=u.duration;if(h&&w&&_g(M)){for(M=0,w=u.responseEnd,o+=1;o<a.length;o++){var G=a[o],rt=G.startTime;if(rt>w)break;var vt=G.transferSize,Mt=G.initiatorType;vt&&_g(Mt)&&(G=G.responseEnd,M+=vt*(G<w?1:(w-rt)/(G-rt)))}if(--o,n+=8*(h+M)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ah=null,sh=null;function uc(e){return e.nodeType===9?e:e.ownerDocument}function vg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Sg(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function rh(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var oh=null;function Dx(){var e=window.event;return e&&e.type==="popstate"?e===oh?!1:(oh=e,!0):(oh=null,!1)}var xg=typeof setTimeout=="function"?setTimeout:void 0,Ux=typeof clearTimeout=="function"?clearTimeout:void 0,Mg=typeof Promise=="function"?Promise:void 0,Lx=typeof queueMicrotask=="function"?queueMicrotask:typeof Mg<"u"?function(e){return Mg.resolve(null).then(e).catch(Nx)}:xg;function Nx(e){setTimeout(function(){throw e})}function ts(e){return e==="head"}function yg(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),yr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Lo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Lo(a);for(var h=a.firstChild;h;){var M=h.nextSibling,w=h.nodeName;h[Na]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=M}}else a==="body"&&Lo(e.ownerDocument.body);a=u}while(a);yr(n)}function Eg(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function lh(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":lh(a),Oa(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Ox(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Na])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=bi(e.nextSibling),e===null)break}return null}function Px(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=bi(e.nextSibling),e===null))return null;return e}function bg(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=bi(e.nextSibling),e===null))return null;return e}function ch(e){return e.data==="$?"||e.data==="$~"}function uh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function zx(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function bi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var fh=null;function Tg(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return bi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function Ag(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function Rg(e,n,a){switch(n=uc(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Lo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Oa(e)}var Ti=new Map,Cg=new Set;function fc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Sa=V.d;V.d={f:Ix,r:Bx,D:Fx,C:Hx,L:Gx,m:Vx,X:Xx,S:kx,M:Wx};function Ix(){var e=Sa.f(),n=nc();return e||n}function Bx(e){var n=ia(e);n!==null&&n.tag===5&&n.type==="form"?Wm(n):Sa.r(e)}var Sr=typeof document>"u"?null:document;function wg(e,n,a){var o=Sr;if(o&&typeof n=="string"&&n){var u=he(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Cg.has(u)||(Cg.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Nn(n,"link",e),fn(n),o.head.appendChild(n)))}}function Fx(e){Sa.D(e),wg("dns-prefetch",e,null)}function Hx(e,n){Sa.C(e,n),wg("preconnect",e,n)}function Gx(e,n,a){Sa.L(e,n,a);var o=Sr;if(o&&e&&n){var u='link[rel="preload"][as="'+he(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+he(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+he(a.imageSizes)+'"]')):u+='[href="'+he(e)+'"]';var h=u;switch(n){case"style":h=xr(e);break;case"script":h=Mr(e)}Ti.has(h)||(e=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),Ti.set(h,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(No(h))||n==="script"&&o.querySelector(Oo(h))||(n=o.createElement("link"),Nn(n,"link",e),fn(n),o.head.appendChild(n)))}}function Vx(e,n){Sa.m(e,n);var a=Sr;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+he(o)+'"][href="'+he(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Mr(e)}if(!Ti.has(h)&&(e=v({rel:"modulepreload",href:e},n),Ti.set(h,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Oo(h)))return}o=a.createElement("link"),Nn(o,"link",e),fn(o),a.head.appendChild(o)}}}function kx(e,n,a){Sa.S(e,n,a);var o=Sr;if(o&&e){var u=Pa(o).hoistableStyles,h=xr(e);n=n||"default";var M=u.get(h);if(!M){var w={loading:0,preload:null};if(M=o.querySelector(No(h)))w.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":n},a),(a=Ti.get(h))&&hh(e,a);var G=M=o.createElement("link");fn(G),Nn(G,"link",e),G._p=new Promise(function(rt,vt){G.onload=rt,G.onerror=vt}),G.addEventListener("load",function(){w.loading|=1}),G.addEventListener("error",function(){w.loading|=2}),w.loading|=4,hc(M,n,o)}M={type:"stylesheet",instance:M,count:1,state:w},u.set(h,M)}}}function Xx(e,n){Sa.X(e,n);var a=Sr;if(a&&e){var o=Pa(a).hoistableScripts,u=Mr(e),h=o.get(u);h||(h=a.querySelector(Oo(u)),h||(e=v({src:e,async:!0},n),(n=Ti.get(u))&&dh(e,n),h=a.createElement("script"),fn(h),Nn(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function Wx(e,n){Sa.M(e,n);var a=Sr;if(a&&e){var o=Pa(a).hoistableScripts,u=Mr(e),h=o.get(u);h||(h=a.querySelector(Oo(u)),h||(e=v({src:e,async:!0,type:"module"},n),(n=Ti.get(u))&&dh(e,n),h=a.createElement("script"),fn(h),Nn(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function Dg(e,n,a,o){var u=(u=It.current)?fc(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=xr(a.href),a=Pa(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=xr(a.href);var h=Pa(u).hoistableStyles,M=h.get(e);if(M||(u=u.ownerDocument||u,M={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,M),(h=u.querySelector(No(e)))&&!h._p&&(M.instance=h,M.state.loading=5),Ti.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ti.set(e,a),h||Yx(u,e,a,M.state))),n&&o===null)throw Error(s(528,""));return M}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=Mr(a),a=Pa(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function xr(e){return'href="'+he(e)+'"'}function No(e){return'link[rel="stylesheet"]['+e+"]"}function Ug(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function Yx(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Nn(n,"link",a),fn(n),e.head.appendChild(n))}function Mr(e){return'[src="'+he(e)+'"]'}function Oo(e){return"script[async]"+e}function Lg(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+he(a.href)+'"]');if(o)return n.instance=o,fn(o),o;var u=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),fn(o),Nn(o,"style",u),hc(o,a.precedence,e),n.instance=o;case"stylesheet":u=xr(a.href);var h=e.querySelector(No(u));if(h)return n.state.loading|=4,n.instance=h,fn(h),h;o=Ug(a),(u=Ti.get(u))&&hh(o,u),h=(e.ownerDocument||e).createElement("link"),fn(h);var M=h;return M._p=new Promise(function(w,G){M.onload=w,M.onerror=G}),Nn(h,"link",o),n.state.loading|=4,hc(h,a.precedence,e),n.instance=h;case"script":return h=Mr(a.src),(u=e.querySelector(Oo(h)))?(n.instance=u,fn(u),u):(o=a,(u=Ti.get(h))&&(o=v({},a),dh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),fn(u),Nn(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,hc(o,a.precedence,e));return n.instance}function hc(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,M=0;M<o.length;M++){var w=o[M];if(w.dataset.precedence===n)h=w;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function hh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function dh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var dc=null;function Ng(e,n,a){if(dc===null){var o=new Map,u=dc=new Map;u.set(a,o)}else u=dc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var h=a[u];if(!(h[Na]||h[un]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var M=h.getAttribute(n)||"";M=e+M;var w=o.get(M);w?w.push(h):o.set(M,[h])}}return o}function Og(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function qx(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Pg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Zx(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=xr(o.href),h=n.querySelector(No(u));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=pc.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=h,fn(h);return}h=n.ownerDocument||n,o=Ug(o),(u=Ti.get(u))&&hh(o,u),h=h.createElement("link"),fn(h);var M=h;M._p=new Promise(function(w,G){M.onload=w,M.onerror=G}),Nn(h,"link",o),a.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=pc.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var ph=0;function Kx(e,n){return e.stylesheets&&e.count===0&&gc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&gc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+n);0<e.imgBytes&&ph===0&&(ph=62500*wx());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&gc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>ph?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function pc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)gc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var mc=null;function gc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,mc=new Map,n.forEach(Qx,e),mc=null,pc.call(e))}function Qx(e,n){if(!(n.state.loading&4)){var a=mc.get(e);if(a)var o=a.get(null);else{a=new Map,mc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var M=u[h];(M.nodeName==="LINK"||M.getAttribute("media")!=="not all")&&(a.set(M.dataset.precedence,M),o=M)}o&&a.set(null,o)}u=n.instance,M=u.getAttribute("data-precedence"),h=a.get(M)||o,h===o&&a.set(null,u),a.set(M,u),this.count++,o=pc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Po={$$typeof:I,Provider:null,Consumer:null,_currentValue:ot,_currentValue2:ot,_threadCount:0};function Jx(e,n,a,o,u,h,M,w,G){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Zt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zt(0),this.hiddenUpdates=Zt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=M,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=G,this.incompleteTransitions=new Map}function zg(e,n,a,o,u,h,M,w,G,rt,vt,Mt){return e=new Jx(e,n,a,M,G,rt,vt,Mt,w),n=1,h===!0&&(n|=24),h=ri(3,null,null,n),e.current=h,h.stateNode=e,n=Yu(),n.refCount++,e.pooledCache=n,n.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:n},Qu(h),e}function Ig(e){return e?(e=js,e):js}function Bg(e,n,a,o,u,h){u=Ig(u),o.context===null?o.context=u:o.pendingContext=u,o=ka(n),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=Xa(e,o,n),a!==null&&(ti(a,e,n),ho(a,e,n))}function Fg(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function mh(e,n){Fg(e,n),(e=e.alternate)&&Fg(e,n)}function Hg(e){if(e.tag===13||e.tag===31){var n=Ms(e,67108864);n!==null&&ti(n,e,67108864),mh(e,67108864)}}function Gg(e){if(e.tag===13||e.tag===31){var n=fi();n=qr(n);var a=Ms(e,n);a!==null&&ti(a,e,n),mh(e,n)}}var _c=!0;function jx(e,n,a,o){var u=B.T;B.T=null;var h=V.p;try{V.p=2,gh(e,n,a,o)}finally{V.p=h,B.T=u}}function $x(e,n,a,o){var u=B.T;B.T=null;var h=V.p;try{V.p=8,gh(e,n,a,o)}finally{V.p=h,B.T=u}}function gh(e,n,a,o){if(_c){var u=_h(o);if(u===null)nh(e,n,o,vc,a),kg(e,o);else if(eM(u,e,n,a,o))o.stopPropagation();else if(kg(e,o),n&4&&-1<tM.indexOf(e)){for(;u!==null;){var h=ia(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var M=Rt(h.pendingLanes);if(M!==0){var w=h;for(w.pendingLanes|=2,w.entangledLanes|=2;M;){var G=1<<31-Gt(M);w.entanglements[1]|=G,M&=~G}Yi(h),(Le&6)===0&&(tc=Oe()+500,wo(0))}}break;case 31:case 13:w=Ms(h,2),w!==null&&ti(w,h,2),nc(),mh(h,2)}if(h=_h(o),h===null&&nh(e,n,o,vc,a),h===u)break;u=h}u!==null&&o.stopPropagation()}else nh(e,n,o,null,a)}}function _h(e){return e=vu(e),vh(e)}var vc=null;function vh(e){if(vc=null,e=na(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=f(n),e!==null)return e;e=null}else if(a===31){if(e=p(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return vc=e,null}function Vg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(De()){case z:return 2;case b:return 8;case J:case lt:return 32;case mt:return 268435456;default:return 32}default:return 32}}var Sh=!1,es=null,ns=null,is=null,zo=new Map,Io=new Map,as=[],tM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function kg(e,n){switch(e){case"focusin":case"focusout":es=null;break;case"dragenter":case"dragleave":ns=null;break;case"mouseover":case"mouseout":is=null;break;case"pointerover":case"pointerout":zo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Io.delete(n.pointerId)}}function Bo(e,n,a,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},n!==null&&(n=ia(n),n!==null&&Hg(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function eM(e,n,a,o,u){switch(n){case"focusin":return es=Bo(es,e,n,a,o,u),!0;case"dragenter":return ns=Bo(ns,e,n,a,o,u),!0;case"mouseover":return is=Bo(is,e,n,a,o,u),!0;case"pointerover":var h=u.pointerId;return zo.set(h,Bo(zo.get(h)||null,e,n,a,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Io.set(h,Bo(Io.get(h)||null,e,n,a,o,u)),!0}return!1}function Xg(e){var n=na(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){e.blockedOn=n,Ws(e.priority,function(){Gg(a)});return}}else if(n===31){if(n=p(a),n!==null){e.blockedOn=n,Ws(e.priority,function(){Gg(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Sc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=_h(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);_u=o,a.target.dispatchEvent(o),_u=null}else return n=ia(a),n!==null&&Hg(n),e.blockedOn=a,!1;n.shift()}return!0}function Wg(e,n,a){Sc(e)&&a.delete(n)}function nM(){Sh=!1,es!==null&&Sc(es)&&(es=null),ns!==null&&Sc(ns)&&(ns=null),is!==null&&Sc(is)&&(is=null),zo.forEach(Wg),Io.forEach(Wg)}function xc(e,n){e.blockedOn===n&&(e.blockedOn=null,Sh||(Sh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,nM)))}var Mc=null;function Yg(e){Mc!==e&&(Mc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Mc===e&&(Mc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(vh(o||a)===null)continue;break}var h=ia(a);h!==null&&(e.splice(n,3),n-=3,_f(h,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function yr(e){function n(G){return xc(G,e)}es!==null&&xc(es,e),ns!==null&&xc(ns,e),is!==null&&xc(is,e),zo.forEach(n),Io.forEach(n);for(var a=0;a<as.length;a++){var o=as[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<as.length&&(a=as[0],a.blockedOn===null);)Xg(a),a.blockedOn===null&&as.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],h=a[o+1],M=u[wn]||null;if(typeof h=="function")M||Yg(a);else if(M){var w=null;if(h&&h.hasAttribute("formAction")){if(u=h,M=h[wn]||null)w=M.formAction;else if(vh(u)!==null)continue}else w=M.action;typeof w=="function"?a[o+1]=w:(a.splice(o,3),o-=3),Yg(a)}}}function qg(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(M){return u=M})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function xh(e){this._internalRoot=e}yc.prototype.render=xh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=fi();Bg(a,o,e,n,null,null)},yc.prototype.unmount=xh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Bg(e.current,2,null,e,null,null),nc(),n[Zn]=null}};function yc(e){this._internalRoot=e}yc.prototype.unstable_scheduleHydration=function(e){if(e){var n=Kr();e={blockedOn:null,target:e,priority:n};for(var a=0;a<as.length&&n!==0&&n<as[a].priority;a++);as.splice(a,0,e),a===0&&Xg(e)}};var Zg=t.version;if(Zg!=="19.2.9")throw Error(s(527,Zg,"19.2.9"));V.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=d(n),e=e!==null?_(e):null,e=e===null?null:e.stateNode,e};var iM={bundleType:0,version:"19.2.9",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.9"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ec=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ec.isDisabled&&Ec.supportsFiber)try{gt=Ec.inject(iM),_t=Ec}catch{}}return Ho.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",u=e0,h=n0,M=i0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(M=n.onRecoverableError)),n=zg(e,1,!1,null,null,a,o,null,u,h,M,qg),e[Zn]=n.current,eh(e),new xh(n)},Ho.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,u="",h=e0,M=n0,w=i0,G=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(M=a.onCaughtError),a.onRecoverableError!==void 0&&(w=a.onRecoverableError),a.formState!==void 0&&(G=a.formState)),n=zg(e,1,!0,n,a??null,o,u,G,h,M,w,qg),n.context=Ig(null),a=n.current,o=fi(),o=qr(o),u=ka(o),u.callback=null,Xa(a,u,o),a=o,n.current.lanes=a,Xt(n,a),Yi(n),e[Zn]=n.current,eh(e),new yc(n)},Ho.version="19.2.9",Ho}var a_;function dM(){if(a_)return yh.exports;a_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),yh.exports=hM(),yh.exports}var pM=dM(),cn=qd();const Zd="186",Hr={ROTATE:0,DOLLY:1,PAN:2},Br={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},mM=0,s_=1,gM=2,jo=1,_M=2,Zo=3,Hs=0,Yn=1,Qi=2,wa=0,$o=1,r_=2,o_=3,l_=4,vM=5,zr=100,SM=101,xM=102,MM=103,yM=104,EM=200,bM=201,TM=202,AM=203,pv=204,mv=205,RM=206,CM=207,wM=208,DM=209,UM=210,LM=211,NM=212,OM=213,PM=214,sd=0,rd=1,od=2,nl=3,ld=4,cd=5,ud=6,fd=7,cu=0,zM=1,IM=2,$i=0,gv=1,_v=2,vv=3,Kd=4,Sv=5,xv=6,Mv=7,yv=300,Gs=301,kr=302,Rh=303,Ch=304,uu=306,Vs=1e3,Ra=1001,hd=1002,Rn=1003,BM=1004,bc=1005,Pn=1006,wh=1007,Ca=1008,mi=1009,Ev=1010,bv=1011,il=1012,Qd=1013,ta=1014,Ji=1015,ea=1016,Jd=1017,jd=1018,al=1020,Tv=35902,Av=35899,Rv=1021,Cv=1022,Bi=1023,Ua=1026,Fs=1027,wv=1028,$d=1029,ks=1030,tp=1031,ep=1033,Qc=33776,Jc=33777,jc=33778,$c=33779,dd=35840,pd=35841,md=35842,gd=35843,_d=36196,vd=37492,Sd=37496,xd=37488,Md=37489,iu=37490,yd=37491,Ed=37808,bd=37809,Td=37810,Ad=37811,Rd=37812,Cd=37813,wd=37814,Dd=37815,Ud=37816,Ld=37817,Nd=37818,Od=37819,Pd=37820,zd=37821,Id=36492,Bd=36494,Fd=36495,Hd=36283,Gd=36284,au=36285,Vd=36286,FM=3200,su=0,HM=1,fs="",On="srgb",ru="srgb-linear",ou="linear",Ie="srgb",Dh=7680,GM=519,VM=512,kM=513,XM=514,np=515,WM=516,YM=517,ip=518,qM=519,ZM=35044,c_="300 es",ji=2e3,sl=2001;function KM(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function lu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function QM(){const r=lu("canvas");return r.style.display="block",r}const u_={};function f_(...r){const t="THREE."+r.shift();console.log(t,...r)}function Dv(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ie(...r){r=Dv(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...r)}}function we(...r){r=Dv(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...r)}}function Gr(...r){const t=r.join(" ");t in u_||(u_[t]=!0,ie(...r))}function JM(r,t,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const jM={[sd]:rd,[od]:ud,[ld]:fd,[nl]:cd,[rd]:sd,[ud]:od,[fd]:ld,[cd]:nl};class ps{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const s=i[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const In=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let h_=1234567;const tl=Math.PI/180,rl=180/Math.PI;function Wr(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(In[r&255]+In[r>>8&255]+In[r>>16&255]+In[r>>24&255]+"-"+In[t&255]+In[t>>8&255]+"-"+In[t>>16&15|64]+In[t>>24&255]+"-"+In[i&63|128]+In[i>>8&255]+"-"+In[i>>16&255]+In[i>>24&255]+In[s&255]+In[s>>8&255]+In[s>>16&255]+In[s>>24&255]).toLowerCase()}function _e(r,t,i){return Math.max(t,Math.min(i,r))}function ap(r,t){return(r%t+t)%t}function $M(r,t,i,s,l){return s+(r-t)*(l-s)/(i-t)}function ty(r,t,i){return r!==t?(i-r)/(t-r):0}function el(r,t,i){return(1-i)*r+i*t}function ey(r,t,i,s){return el(r,t,1-Math.exp(-i*s))}function ny(r,t=1){return t-Math.abs(ap(r,t*2)-t)}function iy(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*(3-2*r))}function ay(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*r*(r*(r*6-15)+10))}function sy(r,t){return r+Math.floor(Math.random()*(t-r+1))}function ry(r,t){return r+Math.random()*(t-r)}function oy(r){return r*(.5-Math.random())}function ly(r){r!==void 0&&(h_=r);let t=h_+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function cy(r){return r*tl}function uy(r){return r*rl}function fy(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function hy(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function dy(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function py(r,t,i,s,l){const c=Math.cos,f=Math.sin,p=c(i/2),m=f(i/2),d=c((t+s)/2),_=f((t+s)/2),v=c((t-s)/2),g=f((t-s)/2),x=c((s-t)/2),E=f((s-t)/2);switch(l){case"XYX":r.set(p*_,m*v,m*g,p*d);break;case"YZY":r.set(m*g,p*_,m*v,p*d);break;case"ZXZ":r.set(m*v,m*g,p*_,p*d);break;case"XZX":r.set(p*_,m*E,m*x,p*d);break;case"YXY":r.set(m*x,p*_,m*E,p*d);break;case"ZYZ":r.set(m*E,m*x,p*_,p*d);break;default:ie("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function Ir(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const kd={DEG2RAD:tl,RAD2DEG:rl,generateUUID:Wr,clamp:_e,euclideanModulo:ap,mapLinear:$M,inverseLerp:ty,lerp:el,damp:ey,pingpong:ny,smoothstep:iy,smootherstep:ay,randInt:sy,randFloat:ry,randFloatSpread:oy,seededRandom:ly,degToRad:cy,radToDeg:uy,isPowerOfTwo:fy,ceilPowerOfTwo:hy,floorPowerOfTwo:dy,setQuaternionFromProperEuler:py,normalize:Xn,denormalize:Ir};class ae{static{ae.prototype.isVector2=!0}constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(_e(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,f=this.y-t.y;return this.x=c*s-f*l+t.x,this.y=c*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ds{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,f,p){let m=s[l+0],d=s[l+1],_=s[l+2],v=s[l+3],g=c[f+0],x=c[f+1],E=c[f+2],R=c[f+3];if(v!==R||m!==g||d!==x||_!==E){let y=m*g+d*x+_*E+v*R;y<0&&(g=-g,x=-x,E=-E,R=-R,y=-y);let S=1-p;if(y<.9995){const P=Math.acos(y),I=Math.sin(P);S=Math.sin(S*P)/I,p=Math.sin(p*P)/I,m=m*S+g*p,d=d*S+x*p,_=_*S+E*p,v=v*S+R*p}else{m=m*S+g*p,d=d*S+x*p,_=_*S+E*p,v=v*S+R*p;const P=1/Math.sqrt(m*m+d*d+_*_+v*v);m*=P,d*=P,_*=P,v*=P}}t[i]=m,t[i+1]=d,t[i+2]=_,t[i+3]=v}static multiplyQuaternionsFlat(t,i,s,l,c,f){const p=s[l],m=s[l+1],d=s[l+2],_=s[l+3],v=c[f],g=c[f+1],x=c[f+2],E=c[f+3];return t[i]=p*E+_*v+m*x-d*g,t[i+1]=m*E+_*g+d*v-p*x,t[i+2]=d*E+_*x+p*g-m*v,t[i+3]=_*E-p*v-m*g-d*x,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,f=t._order,p=Math.cos,m=Math.sin,d=p(s/2),_=p(l/2),v=p(c/2),g=m(s/2),x=m(l/2),E=m(c/2);switch(f){case"XYZ":this._x=g*_*v+d*x*E,this._y=d*x*v-g*_*E,this._z=d*_*E+g*x*v,this._w=d*_*v-g*x*E;break;case"YXZ":this._x=g*_*v+d*x*E,this._y=d*x*v-g*_*E,this._z=d*_*E-g*x*v,this._w=d*_*v+g*x*E;break;case"ZXY":this._x=g*_*v-d*x*E,this._y=d*x*v+g*_*E,this._z=d*_*E+g*x*v,this._w=d*_*v-g*x*E;break;case"ZYX":this._x=g*_*v-d*x*E,this._y=d*x*v+g*_*E,this._z=d*_*E-g*x*v,this._w=d*_*v+g*x*E;break;case"YZX":this._x=g*_*v+d*x*E,this._y=d*x*v+g*_*E,this._z=d*_*E-g*x*v,this._w=d*_*v-g*x*E;break;case"XZY":this._x=g*_*v-d*x*E,this._y=d*x*v-g*_*E,this._z=d*_*E+g*x*v,this._w=d*_*v+g*x*E;break;default:ie("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],f=i[1],p=i[5],m=i[9],d=i[2],_=i[6],v=i[10],g=s+p+v;if(g>0){const x=.5/Math.sqrt(g+1);this._w=.25/x,this._x=(_-m)*x,this._y=(c-d)*x,this._z=(f-l)*x}else if(s>p&&s>v){const x=2*Math.sqrt(1+s-p-v);this._w=(_-m)/x,this._x=.25*x,this._y=(l+f)/x,this._z=(c+d)/x}else if(p>v){const x=2*Math.sqrt(1+p-s-v);this._w=(c-d)/x,this._x=(l+f)/x,this._y=.25*x,this._z=(m+_)/x}else{const x=2*Math.sqrt(1+v-s-p);this._w=(f-l)/x,this._x=(c+d)/x,this._y=(m+_)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(_e(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,f=t._w,p=i._x,m=i._y,d=i._z,_=i._w;return this._x=s*_+f*p+l*d-c*m,this._y=l*_+f*m+c*p-s*d,this._z=c*_+f*d+s*m-l*p,this._w=f*_-s*p-l*m-c*d,this._onChangeCallback(),this}slerp(t,i){let s=t._x,l=t._y,c=t._z,f=t._w,p=this.dot(t);p<0&&(s=-s,l=-l,c=-c,f=-f,p=-p);let m=1-i;if(p<.9995){const d=Math.acos(p),_=Math.sin(d);m=Math.sin(m*d)/_,i=Math.sin(i*d)/_,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class tt{static{tt.prototype.isVector3=!0}constructor(t=0,i=0,s=0){this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(d_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(d_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,f=t.y,p=t.z,m=t.w,d=2*(f*l-p*s),_=2*(p*i-c*l),v=2*(c*s-f*i);return this.x=i+m*d+f*v-p*_,this.y=s+m*_+p*d-c*v,this.z=l+m*v+c*_-f*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this.z=_e(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this.z=_e(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,f=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*f-s*m,this.z=s*p-l*f,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Uh.copy(this).projectOnVector(t),this.sub(Uh)}reflect(t){return this.sub(Uh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(_e(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Uh=new tt,d_=new ds;class le{static{le.prototype.isMatrix3=!0}constructor(t,i,s,l,c,f,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,f,p,m,d)}set(t,i,s,l,c,f,p,m,d){const _=this.elements;return _[0]=t,_[1]=l,_[2]=p,_[3]=i,_[4]=c,_[5]=m,_[6]=s,_[7]=f,_[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,f=s[0],p=s[3],m=s[6],d=s[1],_=s[4],v=s[7],g=s[2],x=s[5],E=s[8],R=l[0],y=l[3],S=l[6],P=l[1],I=l[4],C=l[7],L=l[2],U=l[5],O=l[8];return c[0]=f*R+p*P+m*L,c[3]=f*y+p*I+m*U,c[6]=f*S+p*C+m*O,c[1]=d*R+_*P+v*L,c[4]=d*y+_*I+v*U,c[7]=d*S+_*C+v*O,c[2]=g*R+x*P+E*L,c[5]=g*y+x*I+E*U,c[8]=g*S+x*C+E*O,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],_=t[8];return i*f*_-i*p*d-s*c*_+s*p*m+l*c*d-l*f*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],_=t[8],v=_*f-p*d,g=p*m-_*c,x=d*c-f*m,E=i*v+s*g+l*x;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/E;return t[0]=v*R,t[1]=(l*d-_*s)*R,t[2]=(p*s-l*f)*R,t[3]=g*R,t[4]=(_*i-l*m)*R,t[5]=(l*c-p*i)*R,t[6]=x*R,t[7]=(s*m-d*i)*R,t[8]=(f*i-s*c)*R,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,f,p){const m=Math.cos(c),d=Math.sin(c);return this.set(s*m,s*d,-s*(m*f+d*p)+f+t,-l*d,l*m,-l*(-d*f+m*p)+p+i,0,0,1),this}scale(t,i){return Gr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Lh.makeScale(t,i)),this}rotate(t){return Gr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Lh.makeRotation(-t)),this}translate(t,i){return Gr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Lh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Lh=new le,p_=new le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),m_=new le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function my(){const r={enabled:!0,workingColorSpace:ru,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Ie&&(l.r=Da(l.r),l.g=Da(l.g),l.b=Da(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Ie&&(l.r=Vr(l.r),l.g=Vr(l.g),l.b=Vr(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===fs?ou:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Gr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Gr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[ru]:{primaries:t,whitePoint:s,transfer:ou,toXYZ:p_,fromXYZ:m_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:On},outputColorSpaceConfig:{drawingBufferColorSpace:On}},[On]:{primaries:t,whitePoint:s,transfer:Ie,toXYZ:p_,fromXYZ:m_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:On}}}),r}const be=my();function Da(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Vr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Er;class gy{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{Er===void 0&&(Er=lu("canvas")),Er.width=t.width,Er.height=t.height;const l=Er.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),s=Er}return s.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=lu("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Da(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Da(i[s]/255)*255):i[s]=Da(i[s]);return{data:i,width:t.width,height:t.height}}else return ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let _y=0;class sp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_y++}),this.uuid=Wr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayWidth,i.displayHeight,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,p=l.length;f<p;f++)l[f].isDataTexture?c.push(Nh(l[f].image)):c.push(Nh(l[f]))}else c=Nh(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function Nh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?gy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ie("Texture: Unable to serialize Texture."),{})}let vy=0;const Oh=new tt;class Fn extends ps{constructor(t=Fn.DEFAULT_IMAGE,i=Fn.DEFAULT_MAPPING,s=Ra,l=Ra,c=Pn,f=Ca,p=Bi,m=mi,d=Fn.DEFAULT_ANISOTROPY,_=fs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vy++}),this.uuid=Wr(),this.name="",this.source=new sp(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Oh).x}get height(){return this.source.getSize(Oh).y}get depth(){return this.source.getSize(Oh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const s=t[i];if(s===void 0){ie(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ie(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==yv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Vs:t.x=t.x-Math.floor(t.x);break;case Ra:t.x=t.x<0?0:1;break;case hd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Vs:t.y=t.y-Math.floor(t.y);break;case Ra:t.y=t.y<0?0:1;break;case hd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Fn.DEFAULT_IMAGE=null;Fn.DEFAULT_MAPPING=yv;Fn.DEFAULT_ANISOTROPY=1;class en{static{en.prototype.isVector4=!0}constructor(t=0,i=0,s=0,l=1){this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const m=t.elements,d=m[0],_=m[4],v=m[8],g=m[1],x=m[5],E=m[9],R=m[2],y=m[6],S=m[10];if(Math.abs(_-g)<.01&&Math.abs(v-R)<.01&&Math.abs(E-y)<.01){if(Math.abs(_+g)<.1&&Math.abs(v+R)<.1&&Math.abs(E+y)<.1&&Math.abs(d+x+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const I=(d+1)/2,C=(x+1)/2,L=(S+1)/2,U=(_+g)/4,O=(v+R)/4,T=(E+y)/4;return I>C&&I>L?I<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(I),l=U/s,c=O/s):C>L?C<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(C),s=U/l,c=T/l):L<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(L),s=O/c,l=T/c),this.set(s,l,c,i),this}let P=Math.sqrt((y-E)*(y-E)+(v-R)*(v-R)+(g-_)*(g-_));return Math.abs(P)<.001&&(P=1),this.x=(y-E)/P,this.y=(v-R)/P,this.z=(g-_)/P,this.w=Math.acos((d+x+S-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this.z=_e(this.z,t.z,i.z),this.w=_e(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this.z=_e(this.z,t,i),this.w=_e(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sy extends ps{constructor(t=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=s.depth,this.scissor=new en(0,0,t,i),this.scissorTest=!1,this.viewport=new en(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:s.depth},c=new Fn(l),f=s.count;for(let p=0;p<f;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(t={}){const i={minFilter:Pn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new sp(l)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const i=t.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fi extends Sy{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class Uv extends Fn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=Ra,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class xy extends Fn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=Ra,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class tn{static{tn.prototype.isMatrix4=!0}constructor(t,i,s,l,c,f,p,m,d,_,v,g,x,E,R,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,f,p,m,d,_,v,g,x,E,R,y)}set(t,i,s,l,c,f,p,m,d,_,v,g,x,E,R,y){const S=this.elements;return S[0]=t,S[4]=i,S[8]=s,S[12]=l,S[1]=c,S[5]=f,S[9]=p,S[13]=m,S[2]=d,S[6]=_,S[10]=v,S[14]=g,S[3]=x,S[7]=E,S[11]=R,S[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tn().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,s=t.elements,l=1/br.setFromMatrixColumn(t,0).length(),c=1/br.setFromMatrixColumn(t,1).length(),f=1/br.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,f=Math.cos(s),p=Math.sin(s),m=Math.cos(l),d=Math.sin(l),_=Math.cos(c),v=Math.sin(c);if(t.order==="XYZ"){const g=f*_,x=f*v,E=p*_,R=p*v;i[0]=m*_,i[4]=-m*v,i[8]=d,i[1]=x+E*d,i[5]=g-R*d,i[9]=-p*m,i[2]=R-g*d,i[6]=E+x*d,i[10]=f*m}else if(t.order==="YXZ"){const g=m*_,x=m*v,E=d*_,R=d*v;i[0]=g+R*p,i[4]=E*p-x,i[8]=f*d,i[1]=f*v,i[5]=f*_,i[9]=-p,i[2]=x*p-E,i[6]=R+g*p,i[10]=f*m}else if(t.order==="ZXY"){const g=m*_,x=m*v,E=d*_,R=d*v;i[0]=g-R*p,i[4]=-f*v,i[8]=E+x*p,i[1]=x+E*p,i[5]=f*_,i[9]=R-g*p,i[2]=-f*d,i[6]=p,i[10]=f*m}else if(t.order==="ZYX"){const g=f*_,x=f*v,E=p*_,R=p*v;i[0]=m*_,i[4]=E*d-x,i[8]=g*d+R,i[1]=m*v,i[5]=R*d+g,i[9]=x*d-E,i[2]=-d,i[6]=p*m,i[10]=f*m}else if(t.order==="YZX"){const g=f*m,x=f*d,E=p*m,R=p*d;i[0]=m*_,i[4]=R-g*v,i[8]=E*v+x,i[1]=v,i[5]=f*_,i[9]=-p*_,i[2]=-d*_,i[6]=x*v+E,i[10]=g-R*v}else if(t.order==="XZY"){const g=f*m,x=f*d,E=p*m,R=p*d;i[0]=m*_,i[4]=-v,i[8]=d*_,i[1]=g*v+R,i[5]=f*_,i[9]=x*v-E,i[2]=E*v-x,i[6]=p*_,i[10]=R*v+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(My,t,yy)}lookAt(t,i,s){const l=this.elements;return hi.subVectors(t,i),hi.lengthSq()===0&&(hi.z=1),hi.normalize(),rs.crossVectors(s,hi),rs.lengthSq()===0&&(Math.abs(s.z)===1?hi.x+=1e-4:hi.z+=1e-4,hi.normalize(),rs.crossVectors(s,hi)),rs.normalize(),Tc.crossVectors(hi,rs),l[0]=rs.x,l[4]=Tc.x,l[8]=hi.x,l[1]=rs.y,l[5]=Tc.y,l[9]=hi.y,l[2]=rs.z,l[6]=Tc.z,l[10]=hi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,f=s[0],p=s[4],m=s[8],d=s[12],_=s[1],v=s[5],g=s[9],x=s[13],E=s[2],R=s[6],y=s[10],S=s[14],P=s[3],I=s[7],C=s[11],L=s[15],U=l[0],O=l[4],T=l[8],D=l[12],F=l[1],H=l[5],W=l[9],j=l[13],q=l[2],Q=l[6],B=l[10],V=l[14],ot=l[3],et=l[7],ut=l[11],N=l[15];return c[0]=f*U+p*F+m*q+d*ot,c[4]=f*O+p*H+m*Q+d*et,c[8]=f*T+p*W+m*B+d*ut,c[12]=f*D+p*j+m*V+d*N,c[1]=_*U+v*F+g*q+x*ot,c[5]=_*O+v*H+g*Q+x*et,c[9]=_*T+v*W+g*B+x*ut,c[13]=_*D+v*j+g*V+x*N,c[2]=E*U+R*F+y*q+S*ot,c[6]=E*O+R*H+y*Q+S*et,c[10]=E*T+R*W+y*B+S*ut,c[14]=E*D+R*j+y*V+S*N,c[3]=P*U+I*F+C*q+L*ot,c[7]=P*O+I*H+C*Q+L*et,c[11]=P*T+I*W+C*B+L*ut,c[15]=P*D+I*j+C*V+L*N,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],f=t[1],p=t[5],m=t[9],d=t[13],_=t[2],v=t[6],g=t[10],x=t[14],E=t[3],R=t[7],y=t[11],S=t[15],P=m*x-d*g,I=p*x-d*v,C=p*g-m*v,L=f*x-d*_,U=f*g-m*_,O=f*v-p*_;return i*(R*P-y*I+S*C)-s*(E*P-y*L+S*U)+l*(E*I-R*L+S*O)-c*(E*C-R*U+y*O)}determinantAffine(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[1],f=t[5],p=t[9],m=t[2],d=t[6],_=t[10];return i*(f*_-p*d)-s*(c*_-p*m)+l*(c*d-f*m)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],_=t[8],v=t[9],g=t[10],x=t[11],E=t[12],R=t[13],y=t[14],S=t[15],P=i*p-s*f,I=i*m-l*f,C=i*d-c*f,L=s*m-l*p,U=s*d-c*p,O=l*d-c*m,T=_*R-v*E,D=_*y-g*E,F=_*S-x*E,H=v*y-g*R,W=v*S-x*R,j=g*S-x*y,q=P*j-I*W+C*H+L*F-U*D+O*T;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Q=1/q;return t[0]=(p*j-m*W+d*H)*Q,t[1]=(l*W-s*j-c*H)*Q,t[2]=(R*O-y*U+S*L)*Q,t[3]=(g*U-v*O-x*L)*Q,t[4]=(m*F-f*j-d*D)*Q,t[5]=(i*j-l*F+c*D)*Q,t[6]=(y*C-E*O-S*I)*Q,t[7]=(_*O-g*C+x*I)*Q,t[8]=(f*W-p*F+d*T)*Q,t[9]=(s*F-i*W-c*T)*Q,t[10]=(E*U-R*C+S*P)*Q,t[11]=(v*C-_*U-x*P)*Q,t[12]=(p*D-f*H-m*T)*Q,t[13]=(i*H-s*D+l*T)*Q,t[14]=(R*I-E*L-y*P)*Q,t[15]=(_*L-v*I+g*P)*Q,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=t.x,p=t.y,m=t.z,d=c*f,_=c*p;return this.set(d*f+s,d*p-l*m,d*m+l*p,0,d*p+l*m,_*p+s,_*m-l*f,0,d*m-l*p,_*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,f){return this.set(1,s,c,0,t,1,f,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,f=i._y,p=i._z,m=i._w,d=c+c,_=f+f,v=p+p,g=c*d,x=c*_,E=c*v,R=f*_,y=f*v,S=p*v,P=m*d,I=m*_,C=m*v,L=s.x,U=s.y,O=s.z;return l[0]=(1-(R+S))*L,l[1]=(x+C)*L,l[2]=(E-I)*L,l[3]=0,l[4]=(x-C)*U,l[5]=(1-(g+S))*U,l[6]=(y+P)*U,l[7]=0,l[8]=(E+I)*O,l[9]=(y-P)*O,l[10]=(1-(g+R))*O,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const c=this.determinantAffine();if(c===0)return s.set(1,1,1),i.identity(),this;let f=br.set(l[0],l[1],l[2]).length();const p=br.set(l[4],l[5],l[6]).length(),m=br.set(l[8],l[9],l[10]).length();c<0&&(f=-f),Ni.copy(this);const d=1/f,_=1/p,v=1/m;return Ni.elements[0]*=d,Ni.elements[1]*=d,Ni.elements[2]*=d,Ni.elements[4]*=_,Ni.elements[5]*=_,Ni.elements[6]*=_,Ni.elements[8]*=v,Ni.elements[9]*=v,Ni.elements[10]*=v,i.setFromRotationMatrix(Ni),s.x=f,s.y=p,s.z=m,this}makePerspective(t,i,s,l,c,f,p=ji,m=!1){const d=this.elements,_=2*c/(i-t),v=2*c/(s-l),g=(i+t)/(i-t),x=(s+l)/(s-l);let E,R;if(m)E=c/(f-c),R=f*c/(f-c);else if(p===ji)E=-(f+c)/(f-c),R=-2*f*c/(f-c);else if(p===sl)E=-f/(f-c),R=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=_,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=v,d[9]=x,d[13]=0,d[2]=0,d[6]=0,d[10]=E,d[14]=R,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,i,s,l,c,f,p=ji,m=!1){const d=this.elements,_=2/(i-t),v=2/(s-l),g=-(i+t)/(i-t),x=-(s+l)/(s-l);let E,R;if(m)E=1/(f-c),R=f/(f-c);else if(p===ji)E=-2/(f-c),R=-(f+c)/(f-c);else if(p===sl)E=-1/(f-c),R=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=_,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=v,d[9]=0,d[13]=x,d[2]=0,d[6]=0,d[10]=E,d[14]=R,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const br=new tt,Ni=new tn,My=new tt(0,0,0),yy=new tt(1,1,1),rs=new tt,Tc=new tt,hi=new tt,g_=new tn,__=new ds;class La{constructor(t=0,i=0,s=0,l=La.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],f=l[4],p=l[8],m=l[1],d=l[5],_=l[9],v=l[2],g=l[6],x=l[10];switch(i){case"XYZ":this._y=Math.asin(_e(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,x),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-_e(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(p,x),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(_e(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-v,x),this._z=Math.atan2(-f,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-_e(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(g,x),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,d));break;case"YZX":this._z=Math.asin(_e(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,d),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(p,x));break;case"XZY":this._z=Math.asin(-_e(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-_,x),this._y=0);break;default:ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return g_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(g_,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return __.setFromEuler(this),this.setFromQuaternion(__,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}La.DEFAULT_ORDER="XYZ";class Lv{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ey=0;const v_=new tt,Tr=new ds,xa=new tn,Ac=new tt,Go=new tt,by=new tt,Ty=new ds,S_=new tt(1,0,0),x_=new tt(0,1,0),M_=new tt(0,0,1),y_={type:"added"},Ay={type:"removed"},Ar={type:"childadded",child:null},Ph={type:"childremoved",child:null};class Cn extends ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ey++}),this.uuid=Wr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Cn.DEFAULT_UP.clone();const t=new tt,i=new La,s=new ds,l=new tt(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new tn},normalMatrix:{value:new le}}),this.matrix=new tn,this.matrixWorld=new tn,this.matrixAutoUpdate=Cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Tr.setFromAxisAngle(t,i),this.quaternion.multiply(Tr),this}rotateOnWorldAxis(t,i){return Tr.setFromAxisAngle(t,i),this.quaternion.premultiply(Tr),this}rotateX(t){return this.rotateOnAxis(S_,t)}rotateY(t){return this.rotateOnAxis(x_,t)}rotateZ(t){return this.rotateOnAxis(M_,t)}translateOnAxis(t,i){return v_.copy(t).applyQuaternion(this.quaternion),this.position.add(v_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(S_,t)}translateY(t){return this.translateOnAxis(x_,t)}translateZ(t){return this.translateOnAxis(M_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xa.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?Ac.copy(t):Ac.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xa.lookAt(Go,Ac,this.up):xa.lookAt(Ac,Go,this.up),this.quaternion.setFromRotationMatrix(xa),l&&(xa.extractRotation(l.matrixWorld),Tr.setFromRotationMatrix(xa),this.quaternion.premultiply(Tr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(we("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(y_),Ar.child=t,this.dispatchEvent(Ar),Ar.child=null):we("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(Ay),Ph.child=t,this.dispatchEvent(Ph),Ph.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xa.multiply(t.parent.matrixWorld)),t.applyMatrix4(xa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(y_),Ar.child=t,this.dispatchEvent(Ar),Ar.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,i);if(f!==void 0)return f}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,t,by),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,Ty,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,s=t.y,l=t.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i,s=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const c=this.children;for(let f=0,p=c.length;f<p;f++)c[f].updateWorldMatrix(!1,!0,s)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,_=m.length;d<_;d++){const v=m[d];c(t.shapes,v)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(c(t.materials,this.material[m]));l.material=p}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(t.animations,m))}}if(i){const p=f(t.geometries),m=f(t.materials),d=f(t.textures),_=f(t.images),v=f(t.shapes),g=f(t.skeletons),x=f(t.animations),E=f(t.nodes);p.length>0&&(s.geometries=p),m.length>0&&(s.materials=m),d.length>0&&(s.textures=d),_.length>0&&(s.images=_),v.length>0&&(s.shapes=v),g.length>0&&(s.skeletons=g),x.length>0&&(s.animations=x),E.length>0&&(s.nodes=E)}return s.object=l,s;function f(p){const m=[];for(const d in p){const _=p[d];delete _.metadata,m.push(_)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Cn.DEFAULT_UP=new tt(0,1,0);Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class hs extends Cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ry={type:"move"};class zh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new tt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new tt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new tt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new tt,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,f=null;const p=this._targetRay,m=this._grip,d=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(d&&t.hand){f=!0;for(const R of t.hand.values()){const y=i.getJointPose(R,s),S=this._getHandJoint(d,R);y!==null&&(S.matrix.fromArray(y.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=y.radius),S.visible=y!==null}const _=d.joints["index-finger-tip"],v=d.joints["thumb-tip"],g=_.position.distanceTo(v.position),x=.02,E=.005;d.inputState.pinching&&g>x+E?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&g<=x-E&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));p!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(Ry)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=f!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new hs;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const Nv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},os={h:0,s:0,l:0},Rc={h:0,s:0,l:0};function Ih(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class Kt{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=On){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,be.colorSpaceToWorking(this,i),this}setRGB(t,i,s,l=be.workingColorSpace){return this.r=t,this.g=i,this.b=s,be.colorSpaceToWorking(this,l),this}setHSL(t,i,s,l=be.workingColorSpace){if(t=ap(t,1),i=_e(i,0,1),s=_e(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=Ih(f,c,t+1/3),this.g=Ih(f,c,t),this.b=Ih(f,c,t-1/3)}return be.colorSpaceToWorking(this,l),this}setStyle(t,i=On){function s(c){c!==void 0&&parseFloat(c)<1&&ie("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],p=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ie("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);ie("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=On){const s=Nv[t.toLowerCase()];return s!==void 0?this.setHex(s,i):ie("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Da(t.r),this.g=Da(t.g),this.b=Da(t.b),this}copyLinearToSRGB(t){return this.r=Vr(t.r),this.g=Vr(t.g),this.b=Vr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=On){return be.workingToColorSpace(Bn.copy(this),t),Math.round(_e(Bn.r*255,0,255))*65536+Math.round(_e(Bn.g*255,0,255))*256+Math.round(_e(Bn.b*255,0,255))}getHexString(t=On){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=be.workingColorSpace){be.workingToColorSpace(Bn.copy(this),i);const s=Bn.r,l=Bn.g,c=Bn.b,f=Math.max(s,l,c),p=Math.min(s,l,c);let m,d;const _=(p+f)/2;if(p===f)m=0,d=0;else{const v=f-p;switch(d=_<=.5?v/(f+p):v/(2-f-p),f){case s:m=(l-c)/v+(l<c?6:0);break;case l:m=(c-s)/v+2;break;case c:m=(s-l)/v+4;break}m/=6}return t.h=m,t.s=d,t.l=_,t}getRGB(t,i=be.workingColorSpace){return be.workingToColorSpace(Bn.copy(this),i),t.r=Bn.r,t.g=Bn.g,t.b=Bn.b,t}getStyle(t=On){be.workingToColorSpace(Bn.copy(this),t);const i=Bn.r,s=Bn.g,l=Bn.b;return t!==On?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(os),this.setHSL(os.h+t,os.s+i,os.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(os),t.getHSL(Rc);const s=el(os.h,Rc.h,i),l=el(os.s,Rc.s,i),c=el(os.l,Rc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bn=new Kt;Kt.NAMES=Nv;class rp{constructor(t,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new Kt(t),this.density=i}clone(){return new rp(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Cy extends Cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new La,this.environmentIntensity=1,this.environmentRotation=new La,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Oi=new tt,Ma=new tt,Bh=new tt,ya=new tt,Rr=new tt,Cr=new tt,E_=new tt,Fh=new tt,Hh=new tt,Gh=new tt,Vh=new en,kh=new en,Xh=new en;class Ii{constructor(t=new tt,i=new tt,s=new tt){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Oi.subVectors(t,i),l.cross(Oi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){Oi.subVectors(l,i),Ma.subVectors(s,i),Bh.subVectors(t,i);const f=Oi.dot(Oi),p=Oi.dot(Ma),m=Oi.dot(Bh),d=Ma.dot(Ma),_=Ma.dot(Bh),v=f*d-p*p;if(v===0)return c.set(0,0,0),null;const g=1/v,x=(d*m-p*_)*g,E=(f*_-p*m)*g;return c.set(1-x-E,E,x)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,ya)===null?!1:ya.x>=0&&ya.y>=0&&ya.x+ya.y<=1}static getInterpolation(t,i,s,l,c,f,p,m){return this.getBarycoord(t,i,s,l,ya)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ya.x),m.addScaledVector(f,ya.y),m.addScaledVector(p,ya.z),m)}static getInterpolatedAttribute(t,i,s,l,c,f){return Vh.setScalar(0),kh.setScalar(0),Xh.setScalar(0),Vh.fromBufferAttribute(t,i),kh.fromBufferAttribute(t,s),Xh.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Vh,c.x),f.addScaledVector(kh,c.y),f.addScaledVector(Xh,c.z),f}static isFrontFacing(t,i,s,l){return Oi.subVectors(s,i),Ma.subVectors(t,i),Oi.cross(Ma).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Oi.subVectors(this.c,this.b),Ma.subVectors(this.a,this.b),Oi.cross(Ma).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ii.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Ii.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return Ii.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return Ii.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ii.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let f,p;Rr.subVectors(l,s),Cr.subVectors(c,s),Fh.subVectors(t,s);const m=Rr.dot(Fh),d=Cr.dot(Fh);if(m<=0&&d<=0)return i.copy(s);Hh.subVectors(t,l);const _=Rr.dot(Hh),v=Cr.dot(Hh);if(_>=0&&v<=_)return i.copy(l);const g=m*v-_*d;if(g<=0&&m>=0&&_<=0)return f=m/(m-_),i.copy(s).addScaledVector(Rr,f);Gh.subVectors(t,c);const x=Rr.dot(Gh),E=Cr.dot(Gh);if(E>=0&&x<=E)return i.copy(c);const R=x*d-m*E;if(R<=0&&d>=0&&E<=0)return p=d/(d-E),i.copy(s).addScaledVector(Cr,p);const y=_*E-x*v;if(y<=0&&v-_>=0&&x-E>=0)return E_.subVectors(c,l),p=(v-_)/(v-_+(x-E)),i.copy(l).addScaledVector(E_,p);const S=1/(y+R+g);return f=R*S,p=g*S,i.copy(s).addScaledVector(Rr,f).addScaledVector(Cr,p)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class fl{constructor(t=new tt(1/0,1/0,1/0),i=new tt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Pi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Pi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Pi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,p=c.count;f<p;f++)t.isMesh===!0?t.getVertexPosition(f,Pi):Pi.fromBufferAttribute(c,f),Pi.applyMatrix4(t.matrixWorld),this.expandByPoint(Pi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Cc.copy(s.boundingBox)),Cc.applyMatrix4(t.matrixWorld),this.union(Cc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pi),Pi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vo),wc.subVectors(this.max,Vo),wr.subVectors(t.a,Vo),Dr.subVectors(t.b,Vo),Ur.subVectors(t.c,Vo),ls.subVectors(Dr,wr),cs.subVectors(Ur,Dr),Os.subVectors(wr,Ur);let i=[0,-ls.z,ls.y,0,-cs.z,cs.y,0,-Os.z,Os.y,ls.z,0,-ls.x,cs.z,0,-cs.x,Os.z,0,-Os.x,-ls.y,ls.x,0,-cs.y,cs.x,0,-Os.y,Os.x,0];return!Wh(i,wr,Dr,Ur,wc)||(i=[1,0,0,0,1,0,0,0,1],!Wh(i,wr,Dr,Ur,wc))?!1:(Dc.crossVectors(ls,cs),i=[Dc.x,Dc.y,Dc.z],Wh(i,wr,Dr,Ur,wc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ea[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ea[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ea[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ea[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ea[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ea[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ea[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ea[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ea),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ea=[new tt,new tt,new tt,new tt,new tt,new tt,new tt,new tt],Pi=new tt,Cc=new fl,wr=new tt,Dr=new tt,Ur=new tt,ls=new tt,cs=new tt,Os=new tt,Vo=new tt,wc=new tt,Dc=new tt,Ps=new tt;function Wh(r,t,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Ps.fromArray(r,c);const p=l.x*Math.abs(Ps.x)+l.y*Math.abs(Ps.y)+l.z*Math.abs(Ps.z),m=t.dot(Ps),d=i.dot(Ps),_=s.dot(Ps);if(Math.max(-Math.max(m,d,_),Math.min(m,d,_))>p)return!1}return!0}const _n=new tt,Uc=new ae;let wy=0;class Hi extends ps{constructor(t,i,s=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wy++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=ZM,this.updateRanges=[],this.gpuType=Ji,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Uc.fromBufferAttribute(this,i),Uc.applyMatrix3(t),this.setXY(i,Uc.x,Uc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyMatrix3(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyMatrix4(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.applyNormalMatrix(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)_n.fromBufferAttribute(this,i),_n.transformDirection(t),this.setXYZ(i,_n.x,_n.y,_n.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=Ir(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Xn(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Ir(i,this.array)),i}setX(t,i){return this.normalized&&(i=Xn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Ir(i,this.array)),i}setY(t,i){return this.normalized&&(i=Xn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Ir(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Xn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Ir(i,this.array)),i}setW(t,i){return this.normalized&&(i=Xn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=Xn(i,this.array),s=Xn(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=Xn(i,this.array),s=Xn(s,this.array),l=Xn(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=Xn(i,this.array),s=Xn(s,this.array),l=Xn(l,this.array),c=Xn(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Ov extends Hi{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class Pv extends Hi{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class Mn extends Hi{constructor(t,i,s){super(new Float32Array(t),i,s)}}const Dy=new fl,ko=new tt,Yh=new tt;class fu{constructor(t=new tt,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):Dy.setFromPoints(t).getCenter(s);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ko.subVectors(t,this.center);const i=ko.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(ko,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ko.copy(t.center).add(Yh)),this.expandByPoint(ko.copy(t.center).sub(Yh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Uy=0;const Ai=new tn,qh=new Cn,Lr=new tt,di=new fl,Xo=new fl,An=new tt;class ni extends ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uy++}),this.uuid=Wr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(KM(t)?Pv:Ov)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new le().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ai.makeRotationFromQuaternion(t),this.applyMatrix4(Ai),this}rotateX(t){return Ai.makeRotationX(t),this.applyMatrix4(Ai),this}rotateY(t){return Ai.makeRotationY(t),this.applyMatrix4(Ai),this}rotateZ(t){return Ai.makeRotationZ(t),this.applyMatrix4(Ai),this}translate(t,i,s){return Ai.makeTranslation(t,i,s),this.applyMatrix4(Ai),this}scale(t,i,s){return Ai.makeScale(t,i,s),this.applyMatrix4(Ai),this}lookAt(t){return qh.lookAt(t),qh.updateMatrix(),this.applyMatrix4(qh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Lr).negate(),this.translate(Lr.x,Lr.y,Lr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Mn(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fl);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){we("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new tt(-1/0,-1/0,-1/0),new tt(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];di.setFromBufferAttribute(c),this.morphTargetsRelative?(An.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(An),An.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(An)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&we('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fu);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){we("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new tt,1/0);return}if(t){const s=this.boundingSphere.center;if(di.setFromBufferAttribute(t),i)for(let c=0,f=i.length;c<f;c++){const p=i[c];Xo.setFromBufferAttribute(p),this.morphTargetsRelative?(An.addVectors(di.min,Xo.min),di.expandByPoint(An),An.addVectors(di.max,Xo.max),di.expandByPoint(An)):(di.expandByPoint(Xo.min),di.expandByPoint(Xo.max))}di.getCenter(s);let l=0;for(let c=0,f=t.count;c<f;c++)An.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(An));if(i)for(let c=0,f=i.length;c<f;c++){const p=i[c],m=this.morphTargetsRelative;for(let d=0,_=p.count;d<_;d++)An.fromBufferAttribute(p,d),m&&(Lr.fromBufferAttribute(t,d),An.add(Lr)),l=Math.max(l,s.distanceToSquared(An))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&we('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){we("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;let f=this.getAttribute("tangent");(f===void 0||f.count!==s.count)&&(f=new Hi(new Float32Array(4*s.count),4),this.setAttribute("tangent",f));const p=[],m=[];for(let T=0;T<s.count;T++)p[T]=new tt,m[T]=new tt;const d=new tt,_=new tt,v=new tt,g=new ae,x=new ae,E=new ae,R=new tt,y=new tt;function S(T,D,F){d.fromBufferAttribute(s,T),_.fromBufferAttribute(s,D),v.fromBufferAttribute(s,F),g.fromBufferAttribute(c,T),x.fromBufferAttribute(c,D),E.fromBufferAttribute(c,F),_.sub(d),v.sub(d),x.sub(g),E.sub(g);const H=1/(x.x*E.y-E.x*x.y);isFinite(H)&&(R.copy(_).multiplyScalar(E.y).addScaledVector(v,-x.y).multiplyScalar(H),y.copy(v).multiplyScalar(x.x).addScaledVector(_,-E.x).multiplyScalar(H),p[T].add(R),p[D].add(R),p[F].add(R),m[T].add(y),m[D].add(y),m[F].add(y))}let P=this.groups;P.length===0&&(P=[{start:0,count:t.count}]);for(let T=0,D=P.length;T<D;++T){const F=P[T],H=F.start,W=F.count;for(let j=H,q=H+W;j<q;j+=3)S(t.getX(j+0),t.getX(j+1),t.getX(j+2))}const I=new tt,C=new tt,L=new tt,U=new tt;function O(T){L.fromBufferAttribute(l,T),U.copy(L);const D=p[T];I.copy(D),I.sub(L.multiplyScalar(L.dot(D))).normalize(),C.crossVectors(U,D);const H=C.dot(m[T])<0?-1:1;f.setXYZW(T,I.x,I.y,I.z,H)}for(let T=0,D=P.length;T<D;++T){const F=P[T],H=F.start,W=F.count;for(let j=H,q=H+W;j<q;j+=3)O(t.getX(j+0)),O(t.getX(j+1)),O(t.getX(j+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new Hi(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,x=s.count;g<x;g++)s.setXYZ(g,0,0,0);const l=new tt,c=new tt,f=new tt,p=new tt,m=new tt,d=new tt,_=new tt,v=new tt;if(t)for(let g=0,x=t.count;g<x;g+=3){const E=t.getX(g+0),R=t.getX(g+1),y=t.getX(g+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,R),f.fromBufferAttribute(i,y),_.subVectors(f,c),v.subVectors(l,c),_.cross(v),p.fromBufferAttribute(s,E),m.fromBufferAttribute(s,R),d.fromBufferAttribute(s,y),p.add(_),m.add(_),d.add(_),s.setXYZ(E,p.x,p.y,p.z),s.setXYZ(R,m.x,m.y,m.z),s.setXYZ(y,d.x,d.y,d.z)}else for(let g=0,x=i.count;g<x;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),_.subVectors(f,c),v.subVectors(l,c),_.cross(v),s.setXYZ(g+0,_.x,_.y,_.z),s.setXYZ(g+1,_.x,_.y,_.z),s.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)An.fromBufferAttribute(t,i),An.normalize(),t.setXYZ(i,An.x,An.y,An.z)}toNonIndexed(){function t(p,m){const d=p.array,_=p.itemSize,v=p.normalized,g=new d.constructor(m.length*_);let x=0,E=0;for(let R=0,y=m.length;R<y;R++){p.isInterleavedBufferAttribute?x=m[R]*p.data.stride+p.offset:x=m[R]*_;for(let S=0;S<_;S++)g[E++]=d[x++]}return new Hi(g,_,v)}if(this.index===null)return ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new ni,s=this.index.array,l=this.attributes;for(const p in l){const m=l[p],d=t(m,s);i.setAttribute(p,d)}const c=this.morphAttributes;for(const p in c){const m=[],d=c[p];for(let _=0,v=d.length;_<v;_++){const g=d[_],x=t(g,s);m.push(x)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let p=0,m=f.length;p<m;p++){const d=f[p];i.addGroup(d.start,d.count,d.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(t[d]=m[d]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const d=s[m];t.data.attributes[m]=d.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],_=[];for(let v=0,g=d.length;v<g;v++){const x=d[v];_.push(x.toJSON(t.data))}_.length>0&&(l[m]=_,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const p=this.boundingSphere;return p!==null&&(t.data.boundingSphere=p.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const l=t.attributes;for(const d in l){const _=l[d];this.setAttribute(d,_.clone(i))}const c=t.morphAttributes;for(const d in c){const _=[],v=c[d];for(let g=0,x=v.length;g<x;g++)_.push(v[g].clone(i));this.morphAttributes[d]=_}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let d=0,_=f.length;d<_;d++){const v=f[d];this.addGroup(v.start,v.count,v.materialIndex)}const p=t.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zh=new tt,Ly=new tt,Ny=new le;class Aa{constructor(t=new tt(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=Zh.subVectors(s,i).cross(Ly.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i,s=!0){const l=t.delta(Zh),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const f=-(t.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(t.start).addScaledVector(l,f)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||Ny.getNormalMatrix(t),l=this.coplanarPoint(Zh).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Oy=0;class Xs extends ps{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Oy++}),this.uuid=Wr(),this.name="",this.type="Material",this.blending=$o,this.side=Hs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pv,this.blendDst=mv,this.blendEquation=zr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=nl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=GM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Dh,this.stencilZFail=Dh,this.stencilZPass=Dh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){ie(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ie(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const p in c){const m=c[p];delete m.metadata,f.push(m)}return f}if(i){const c=l(t.textures),f=l(t.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}fromJSON(t,i){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Kt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(s=>new Aa().fromJSON(s))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=i[t.map]||null),t.matcap!==void 0&&(this.matcap=i[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=i[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=i[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=i[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let s=t.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new ae().fromArray(s)}return t.displacementMap!==void 0&&(this.displacementMap=i[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=i[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=i[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=i[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=i[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=i[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=i[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=i[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=i[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=i[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=i[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ae().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=i[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=i[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=i[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=i[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=i[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ba=new tt,Kh=new tt,Lc=new tt,Nc=new tt;class op{constructor(t=new tt,i=new tt(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ba)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=ba.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(ba.copy(this.origin).addScaledVector(this.direction,i),ba.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){Kh.copy(t).add(i).multiplyScalar(.5),Lc.copy(i).sub(t).normalize(),Nc.copy(this.origin).sub(Kh);const c=t.distanceTo(i)*.5,f=-this.direction.dot(Lc),p=Nc.dot(this.direction),m=-Nc.dot(Lc),d=Nc.lengthSq(),_=Math.abs(1-f*f);let v,g,x,E;if(_>0)if(v=f*m-p,g=f*p-m,E=c*_,v>=0)if(g>=-E)if(g<=E){const R=1/_;v*=R,g*=R,x=v*(v+f*g+2*p)+g*(f*v+g+2*m)+d}else g=c,v=Math.max(0,-(f*g+p)),x=-v*v+g*(g+2*m)+d;else g=-c,v=Math.max(0,-(f*g+p)),x=-v*v+g*(g+2*m)+d;else g<=-E?(v=Math.max(0,-(-f*c+p)),g=v>0?-c:Math.min(Math.max(-c,-m),c),x=-v*v+g*(g+2*m)+d):g<=E?(v=0,g=Math.min(Math.max(-c,-m),c),x=g*(g+2*m)+d):(v=Math.max(0,-(f*c+p)),g=v>0?c:Math.min(Math.max(-c,-m),c),x=-v*v+g*(g+2*m)+d);else g=f>0?-c:c,v=Math.max(0,-(f*g+p)),x=-v*v+g*(g+2*m)+d;return s&&s.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(Kh).addScaledVector(Lc,g),x}intersectSphere(t,i){if(t.radius<0)return null;ba.subVectors(t.center,this.origin);const s=ba.dot(this.direction),l=ba.dot(ba)-s*s,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),p=s-f,m=s+f;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,f,p,m;const d=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,g=this.origin;return d>=0?(s=(t.min.x-g.x)*d,l=(t.max.x-g.x)*d):(s=(t.max.x-g.x)*d,l=(t.min.x-g.x)*d),_>=0?(c=(t.min.y-g.y)*_,f=(t.max.y-g.y)*_):(c=(t.max.y-g.y)*_,f=(t.min.y-g.y)*_),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),v>=0?(p=(t.min.z-g.z)*v,m=(t.max.z-g.z)*v):(p=(t.max.z-g.z)*v,m=(t.min.z-g.z)*v),s>m||p>l)||((p>s||s!==s)&&(s=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,ba)!==null}intersectTriangle(t,i,s,l,c){const f=this.origin,p=this.direction,m=p.x,d=p.y,_=p.z,v=t.x-f.x,g=t.y-f.y,x=t.z-f.z,E=i.x-f.x,R=i.y-f.y,y=i.z-f.z,S=s.x-f.x,P=s.y-f.y,I=s.z-f.z,C=Math.abs(m),L=Math.abs(d),U=Math.abs(_);let O,T,D,F,H,W,j,q,Q,B,V,ot;if(C>=L&&C>=U?(D=m,W=v,Q=E,ot=S,m>=0?(O=d,T=_,F=g,H=x,j=R,q=y,B=P,V=I):(O=_,T=d,F=x,H=g,j=y,q=R,B=I,V=P)):L>=U?(D=d,W=g,Q=R,ot=P,d>=0?(O=_,T=m,F=x,H=v,j=y,q=E,B=I,V=S):(O=m,T=_,F=v,H=x,j=E,q=y,B=S,V=I)):(D=_,W=x,Q=y,ot=I,_>=0?(O=m,T=d,F=v,H=g,j=E,q=R,B=S,V=P):(O=d,T=m,F=g,H=v,j=R,q=E,B=P,V=S)),D===0)return null;const et=O/D,ut=T/D,N=1/D,$=F-et*W,ht=H-ut*W,Et=j-et*Q,Ct=q-ut*Q,It=B-et*ot,at=V-ut*ot,pt=It*Ct-at*Et,bt=$*at-ht*It,jt=Et*ht-Ct*$;if(l){if(pt<0||bt<0||jt<0)return null}else if((pt<0||bt<0||jt<0)&&(pt>0||bt>0||jt>0))return null;const Ot=pt+bt+jt;if(Ot===0)return null;const se=N*(pt*W+bt*Q+jt*ot);return(Ot>0?se<0:se>0)?null:this.at(se/Ot,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class zv extends Xs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new La,this.combine=cu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const b_=new tn,zs=new op,Oc=new fu,T_=new tt,Pc=new tt,zc=new tt,Ic=new tt,Qh=new tt,Bc=new tt,A_=new tt,Fc=new tt;class Hn extends Cn{constructor(t=new ni,i=new zv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const p=this.morphTargetInfluences;if(c&&p){Bc.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const _=p[m],v=c[m];_!==0&&(Qh.fromBufferAttribute(v,t),f?Bc.addScaledVector(Qh,_):Bc.addScaledVector(Qh.sub(i),_))}i.add(Bc)}return i}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Oc.copy(s.boundingSphere),Oc.applyMatrix4(c),zs.copy(t.ray).recast(t.near),!(Oc.containsPoint(zs.origin)===!1&&(zs.intersectSphere(Oc,T_)===null||zs.origin.distanceToSquared(T_)>(t.far-t.near)**2))&&(b_.copy(c).invert(),zs.copy(t.ray).applyMatrix4(b_),!(s.boundingBox!==null&&zs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,zs)))}_computeIntersections(t,i,s){let l;const c=this.geometry,f=this.material,p=c.index,m=c.attributes.position,d=c.attributes.uv,_=c.attributes.uv1,v=c.attributes.normal,g=c.groups,x=c.drawRange;if(p!==null)if(Array.isArray(f))for(let E=0,R=g.length;E<R;E++){const y=g[E],S=f[y.materialIndex],P=Math.max(y.start,x.start),I=Math.min(p.count,Math.min(y.start+y.count,x.start+x.count));for(let C=P,L=I;C<L;C+=3){const U=p.getX(C),O=p.getX(C+1),T=p.getX(C+2);l=Hc(this,S,t,s,d,_,v,U,O,T),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const E=Math.max(0,x.start),R=Math.min(p.count,x.start+x.count);for(let y=E,S=R;y<S;y+=3){const P=p.getX(y),I=p.getX(y+1),C=p.getX(y+2);l=Hc(this,f,t,s,d,_,v,P,I,C),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let E=0,R=g.length;E<R;E++){const y=g[E],S=f[y.materialIndex],P=Math.max(y.start,x.start),I=Math.min(m.count,Math.min(y.start+y.count,x.start+x.count));for(let C=P,L=I;C<L;C+=3){const U=C,O=C+1,T=C+2;l=Hc(this,S,t,s,d,_,v,U,O,T),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const E=Math.max(0,x.start),R=Math.min(m.count,x.start+x.count);for(let y=E,S=R;y<S;y+=3){const P=y,I=y+1,C=y+2;l=Hc(this,f,t,s,d,_,v,P,I,C),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function Py(r,t,i,s,l,c,f,p){let m;if(t.side===Yn?m=s.intersectTriangle(f,c,l,!0,p):m=s.intersectTriangle(l,c,f,t.side===Hs,p),m===null)return null;Fc.copy(p),Fc.applyMatrix4(r.matrixWorld);const d=i.ray.origin.distanceTo(Fc);return d<i.near||d>i.far?null:{distance:d,point:Fc.clone(),object:r}}function Hc(r,t,i,s,l,c,f,p,m,d){r.getVertexPosition(p,Pc),r.getVertexPosition(m,zc),r.getVertexPosition(d,Ic);const _=Py(r,t,i,s,Pc,zc,Ic,A_);if(_){const v=new tt;Ii.getBarycoord(A_,Pc,zc,Ic,v),l&&(_.uv=Ii.getInterpolatedAttribute(l,p,m,d,v,new ae)),c&&(_.uv1=Ii.getInterpolatedAttribute(c,p,m,d,v,new ae)),f&&(_.normal=Ii.getInterpolatedAttribute(f,p,m,d,v,new tt),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const g={a:p,b:m,c:d,normal:new tt,materialIndex:0};Ii.getNormal(Pc,zc,Ic,g.normal),_.face=g,_.barycoord=v}return _}class zy extends Fn{constructor(t=null,i=1,s=1,l,c,f,p,m,d=Rn,_=Rn,v,g){super(null,f,p,m,d,_,l,c,v,g),this.isDataTexture=!0,this.image={data:t,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Is=new fu,Iy=new ae(.5,.5),Gc=new tt;class lp{constructor(t=new Aa,i=new Aa,s=new Aa,l=new Aa,c=new Aa,f=new Aa){this.planes=[t,i,s,l,c,f]}set(t,i,s,l,c,f){const p=this.planes;return p[0].copy(t),p[1].copy(i),p[2].copy(s),p[3].copy(l),p[4].copy(c),p[5].copy(f),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ji,s=!1){const l=this.planes,c=t.elements,f=c[0],p=c[1],m=c[2],d=c[3],_=c[4],v=c[5],g=c[6],x=c[7],E=c[8],R=c[9],y=c[10],S=c[11],P=c[12],I=c[13],C=c[14],L=c[15];if(l[0].setComponents(d-f,x-_,S-E,L-P).normalize(),l[1].setComponents(d+f,x+_,S+E,L+P).normalize(),l[2].setComponents(d+p,x+v,S+R,L+I).normalize(),l[3].setComponents(d-p,x-v,S-R,L-I).normalize(),s)l[4].setComponents(m,g,y,C).normalize(),l[5].setComponents(d-m,x-g,S-y,L-C).normalize();else if(l[4].setComponents(d-m,x-g,S-y,L-C).normalize(),i===ji)l[5].setComponents(d+m,x+g,S+y,L+C).normalize();else if(i===sl)l[5].setComponents(m,g,y,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Is.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Is.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Is)}intersectsSprite(t){Is.center.set(0,0,0);const i=Iy.distanceTo(t.center);return Is.radius=.7071067811865476+i,Is.applyMatrix4(t.matrixWorld),this.intersectsSphere(Is)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Gc.x=l.normal.x>0?t.max.x:t.min.x,Gc.y=l.normal.y>0?t.max.y:t.min.y,Gc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Gc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Iv extends Xs{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const R_=new tn,Xd=new op,Vc=new fu,kc=new tt;class By extends Cn{constructor(t=new ni,i=new Iv){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Vc.copy(s.boundingSphere),Vc.applyMatrix4(l),Vc.radius+=c,t.ray.intersectsSphere(Vc)===!1)return;R_.copy(l).invert(),Xd.copy(t.ray).applyMatrix4(R_);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=s.index,v=s.attributes.position;if(d!==null){const g=Math.max(0,f.start),x=Math.min(d.count,f.start+f.count);for(let E=g,R=x;E<R;E++){const y=d.getX(E);kc.fromBufferAttribute(v,y),C_(kc,y,m,l,t,i,this)}}else{const g=Math.max(0,f.start),x=Math.min(v.count,f.start+f.count);for(let E=g,R=x;E<R;E++)kc.fromBufferAttribute(v,E),C_(kc,E,m,l,t,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function C_(r,t,i,s,l,c,f){const p=Xd.distanceSqToPoint(r);if(p<i){const m=new tt;Xd.closestPointToPoint(r,m),m.applyMatrix4(s);const d=l.ray.origin.distanceTo(m);if(d<l.near||d>l.far)return;c.push({distance:d,distanceToRay:Math.sqrt(p),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class Bv extends Fn{constructor(t=[],i=Gs,s,l,c,f,p,m,d,_){super(t,i,s,l,c,f,p,m,d,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class hu extends Fn{constructor(t,i,s,l,c,f,p,m,d){super(t,i,s,l,c,f,p,m,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ol extends Fn{constructor(t,i,s=ta,l,c,f,p=Rn,m=Rn,d,_=Ua,v=1){if(_!==Ua&&_!==Fs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:i,depth:v};super(g,l,c,f,p,m,_,s,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new sp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return i.compareFunction=this.compareFunction,i}}class Fy extends ol{constructor(t,i=ta,s=Gs,l,c,f=Rn,p=Rn,m,d=Ua){const _={width:t,height:t,depth:1},v=[_,_,_,_,_,_];super(t,t,i,s,l,c,f,p,m,d),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Fv extends Fn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class hl extends ni{constructor(t=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const p=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],d=[],_=[],v=[];let g=0,x=0;E("z","y","x",-1,-1,s,i,t,f,c,0),E("z","y","x",1,-1,s,i,-t,f,c,1),E("x","z","y",1,1,t,s,i,l,f,2),E("x","z","y",1,-1,t,s,-i,l,f,3),E("x","y","z",1,-1,t,i,s,l,c,4),E("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new Mn(d,3)),this.setAttribute("normal",new Mn(_,3)),this.setAttribute("uv",new Mn(v,2));function E(R,y,S,P,I,C,L,U,O,T,D){const F=C/O,H=L/T,W=C/2,j=L/2,q=U/2,Q=O+1,B=T+1;let V=0,ot=0;const et=new tt;for(let ut=0;ut<B;ut++){const N=ut*H-j;for(let $=0;$<Q;$++){const ht=$*F-W;et[R]=ht*P,et[y]=N*I,et[S]=q,d.push(et.x,et.y,et.z),et[R]=0,et[y]=0,et[S]=U>0?1:-1,_.push(et.x,et.y,et.z),v.push($/O),v.push(1-ut/T),V+=1}}for(let ut=0;ut<T;ut++)for(let N=0;N<O;N++){const $=g+N+Q*ut,ht=g+N+Q*(ut+1),Et=g+(N+1)+Q*(ut+1),Ct=g+(N+1)+Q*ut;m.push($,ht,Ct),m.push(ht,Et,Ct),ot+=6}p.addGroup(x,ot,D),x+=ot,g+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class cp extends ni{constructor(t=1,i=32,s=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:s,thetaLength:l},i=Math.max(3,i);const c=[],f=[],p=[],m=[],d=new tt,_=new ae;f.push(0,0,0),p.push(0,0,1),m.push(.5,.5);for(let v=0,g=3;v<=i;v++,g+=3){const x=s+v/i*l;d.x=t*Math.cos(x),d.y=t*Math.sin(x),f.push(d.x,d.y,d.z),p.push(0,0,1),_.x=(f[g]/t+1)/2,_.y=(f[g+1]/t+1)/2,m.push(_.x,_.y)}for(let v=1;v<=i;v++)c.push(v,v+1,0);this.setIndex(c),this.setAttribute("position",new Mn(f,3)),this.setAttribute("normal",new Mn(p,3)),this.setAttribute("uv",new Mn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cp(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class du extends ni{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,f=i/2,p=Math.floor(s),m=Math.floor(l),d=p+1,_=m+1,v=t/p,g=i/m,x=[],E=[],R=[],y=[];for(let S=0;S<_;S++){const P=S*g-f;for(let I=0;I<d;I++){const C=I*v-c;E.push(C,-P,0),R.push(0,0,1),y.push(I/p),y.push(1-S/m)}}for(let S=0;S<m;S++)for(let P=0;P<p;P++){const I=P+d*S,C=P+d*(S+1),L=P+1+d*(S+1),U=P+1+d*S;x.push(I,C,U),x.push(C,L,U)}this.setIndex(x),this.setAttribute("position",new Mn(E,3)),this.setAttribute("normal",new Mn(R,3)),this.setAttribute("uv",new Mn(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new du(t.width,t.height,t.widthSegments,t.heightSegments)}}class up extends ni{constructor(t=1,i=32,s=16,l=0,c=Math.PI*2,f=0,p=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:p},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+p,Math.PI);let d=0;const _=[],v=new tt,g=new tt,x=[],E=[],R=[],y=[];for(let S=0;S<=s;S++){const P=[],I=S/s,C=f+I*p,L=t*Math.cos(C),U=Math.sqrt(t*t-L*L);let O=0;S===0&&f===0?O=.5/i:S===s&&m===Math.PI&&(O=-.5/i);for(let T=0;T<=i;T++){const D=T/i,F=l+D*c;v.x=-U*Math.cos(F),v.y=L,v.z=U*Math.sin(F),E.push(v.x,v.y,v.z),g.copy(v).normalize(),R.push(g.x,g.y,g.z),y.push(D+O,1-I),P.push(d++)}_.push(P)}for(let S=0;S<s;S++)for(let P=0;P<i;P++){const I=_[S][P+1],C=_[S][P],L=_[S+1][P],U=_[S+1][P+1];(S!==0||f>0)&&x.push(I,C,U),(S!==s-1||m<Math.PI)&&x.push(C,L,U)}this.setIndex(x),this.setAttribute("position",new Mn(E,3)),this.setAttribute("normal",new Mn(R,3)),this.setAttribute("uv",new Mn(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new up(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Xr(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];if(w_(l))l.isRenderTargetTexture?(ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone();else if(Array.isArray(l))if(w_(l[0])){const c=[];for(let f=0,p=l.length;f<p;f++)c[f]=l[f].clone();t[i][s]=c}else t[i][s]=l.slice();else t[i][s]=l}}return t}function Wn(r){const t={};for(let i=0;i<r.length;i++){const s=Xr(r[i]);for(const l in s)t[l]=s[l]}return t}function w_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Hy(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function Hv(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:be.workingColorSpace}const Gy={clone:Xr,merge:Wn};var Vy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ky=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends Xs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vy,this.fragmentShader=ky,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xr(t.uniforms),this.uniformsGroups=Hy(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(t,i){if(super.fromJSON(t,i),t.uniforms!==void 0)for(const s in t.uniforms){const l=t.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new Kt().setHex(l.value);break;case"v2":this.uniforms[s].value=new ae().fromArray(l.value);break;case"v3":this.uniforms[s].value=new tt().fromArray(l.value);break;case"v4":this.uniforms[s].value=new en().fromArray(l.value);break;case"m3":this.uniforms[s].value=new le().fromArray(l.value);break;case"m4":this.uniforms[s].value=new tn().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const s in t.extensions)this.extensions[s]=t.extensions[s];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Xy extends Ci{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Wy extends Xs{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Kt(16777215),this.specular=new Kt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=su,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new La,this.combine=cu,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ll extends Xs{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=su,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new La,this.combine=cu,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Yy extends Xs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=FM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class qy extends Xs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class fp extends Cn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=i}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}class Zy extends fp{constructor(t,i,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Kt(i)}copy(t,i){return super.copy(t,i),this.groundColor.copy(t.groundColor),this}toJSON(t){const i=super.toJSON(t);return i.object.groundColor=this.groundColor.getHex(),i}}const Jh=new tn,D_=new tt,U_=new tt;class Ky{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.mapType=mi,this.map=null,this.mapPass=null,this.matrix=new tn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new lp,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new en(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera;D_.setFromMatrixPosition(t.matrixWorld),i.position.copy(D_),U_.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(U_),i.updateMatrixWorld(),this._updateMatrix(i,this.matrix,this._frustum)}_updateMatrix(t,i,s,l){Jh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),s.setFromProjectionMatrix(Jh,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,f=l?l.z/c.x:1,p=l?l.w/c.y:1,m=l?l.x/c.x:0,d=l?l.y/c.y:0;t.coordinateSystem===sl||t.reversedDepth?i.set(.5*f,0,0,.5*f+m,0,.5*p,0,.5*p+d,0,0,1,0,0,0,0,1):i.set(.5*f,0,0,.5*f+m,0,.5*p,0,.5*p+d,0,0,.5,.5,0,0,0,1),i.multiply(Jh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Xc=new tt,Wc=new ds,qi=new tt;class Gv extends Cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tn,this.projectionMatrix=new tn,this.projectionMatrixInverse=new tn,this.coordinateSystem=ji,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Xc,Wc,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xc,Wc,qi.set(1,1,1)).invert()}updateWorldMatrix(t,i,s=!1){super.updateWorldMatrix(t,i,s),this.matrixWorld.decompose(Xc,Wc,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xc,Wc,qi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const us=new tt,L_=new ae,N_=new ae;class Ri extends Gv{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=rl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(tl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rl*2*Math.atan(Math.tan(tl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){us.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(us.x,us.y).multiplyScalar(-t/us.z),us.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(us.x,us.y).multiplyScalar(-t/us.z)}getViewSize(t,i){return this.getViewBounds(t,L_,N_),i.subVectors(N_,L_)}setViewOffset(t,i,s,l,c,f){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(tl*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,d=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/d,l*=f.width/m,s*=f.height/d}const p=this.filmOffset;p!==0&&(c+=t*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class hp extends Gv{constructor(t=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,f=s+t,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,f=c+d*this.view.width,p-=_*this.view.offsetY,m=p-_*this.view.height}this.projectionMatrix.makeOrthographic(c,f,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class Qy extends Ky{constructor(){super(new hp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Jy extends fp{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.target=new Cn,this.shadow=new Qy}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}class jy extends fp{constructor(t,i){super(t,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const Nr=-90,Or=1;class $y extends Cn{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ri(Nr,Or,t,i);l.layers=this.layers,this.add(l);const c=new Ri(Nr,Or,t,i);c.layers=this.layers,this.add(c);const f=new Ri(Nr,Or,t,i);f.layers=this.layers,this.add(f);const p=new Ri(Nr,Or,t,i);p.layers=this.layers,this.add(p);const m=new Ri(Nr,Or,t,i);m.layers=this.layers,this.add(m);const d=new Ri(Nr,Or,t,i);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,p,m]=i;for(const d of i)this.remove(d);if(t===ji)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===sl)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of i)this.add(d),d.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,p,m,d,_]=this.children,v=t.getRenderTarget(),g=t.getActiveCubeFace(),x=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const R=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let y=!1;t.isWebGLRenderer===!0?y=t.state.buffers.depth.getReversed():y=t.reversedDepthBuffer,t.setRenderTarget(s,0,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,c),t.setRenderTarget(s,1,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,f),t.setRenderTarget(s,2,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),t.setRenderTarget(s,3,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(s,4,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),s.texture.generateMipmaps=R,t.setRenderTarget(s,5,l),y&&t.autoClear===!1&&t.clearDepth(),t.render(i,_),t.setRenderTarget(v,g,x),t.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class tE extends Ri{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class O_{constructor(t=1,i=0,s=0){this.radius=t,this.phi=i,this.theta=s}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=_e(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(_e(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Vv{static{Vv.prototype.isMatrix2=!0}constructor(t,i,s,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let s=0;s<4;s++)this.elements[s]=t[s+i];return this}set(t,i,s,l){const c=this.elements;return c[0]=t,c[2]=i,c[1]=s,c[3]=l,this}}class eE extends ps{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function P_(r,t,i,s){const l=nE(s);switch(i){case Rv:return r*t;case wv:return r*t/l.components*l.byteLength;case $d:return r*t/l.components*l.byteLength;case ks:return r*t*2/l.components*l.byteLength;case tp:return r*t*2/l.components*l.byteLength;case Cv:return r*t*3/l.components*l.byteLength;case Bi:return r*t*4/l.components*l.byteLength;case ep:return r*t*4/l.components*l.byteLength;case Qc:case Jc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case jc:case $c:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case pd:case gd:return Math.max(r,16)*Math.max(t,8)/4;case dd:case md:return Math.max(r,8)*Math.max(t,8)/2;case _d:case vd:case xd:case Md:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Sd:case iu:case yd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ed:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case bd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Td:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Ad:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Rd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Cd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case wd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Dd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Ud:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Ld:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Nd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Od:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Pd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case zd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Id:case Bd:case Fd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Hd:case Gd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case au:case Vd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function nE(r){switch(r){case mi:case Ev:return{byteLength:1,components:1};case il:case bv:case ea:return{byteLength:2,components:1};case Jd:case jd:return{byteLength:2,components:4};case ta:case Qd:case Ji:return{byteLength:4,components:1};case Tv:case Av:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zd}}));typeof window<"u"&&(window.__THREE__?ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zd);function kv(){let r=null,t=!1,i=null,s=null;function l(c,f){s=r.requestAnimationFrame(l),i(c,f)}return{start:function(){t!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function iE(r){const t=new WeakMap;function i(p,m){const d=p.array,_=p.usage,v=d.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,d,_),p.onUploadCallback();let x;if(d instanceof Float32Array)x=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)x=r.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?x=r.HALF_FLOAT:x=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=r.SHORT;else if(d instanceof Uint32Array)x=r.UNSIGNED_INT;else if(d instanceof Int32Array)x=r.INT;else if(d instanceof Int8Array)x=r.BYTE;else if(d instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:v}}function s(p,m,d){const _=m.array,v=m.updateRanges;if(r.bindBuffer(d,p),v.length===0)r.bufferSubData(d,0,_);else{v.sort((x,E)=>x.start-E.start);let g=0;for(let x=1;x<v.length;x++){const E=v[g],R=v[x];R.start<=E.start+E.count+1?E.count=Math.max(E.count,R.start+R.count-E.start):(++g,v[g]=R)}v.length=g+1;for(let x=0,E=v.length;x<E;x++){const R=v[x];r.bufferSubData(d,R.start*_.BYTES_PER_ELEMENT,_,R.start,R.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),t.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=t.get(p);m&&(r.deleteBuffer(m.buffer),t.delete(p))}function f(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const _=t.get(p);(!_||_.version<p.version)&&t.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=t.get(p);if(d===void 0)t.set(p,i(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,p,m),d.version=p.version}}return{get:l,remove:c,update:f}}var aE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sE=`#ifdef USE_ALPHAHASH
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
#endif`,rE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,oE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uE=`#ifdef USE_AOMAP
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
#endif`,fE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hE=`#ifdef USE_BATCHING
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
#endif`,dE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_E=`#ifdef USE_IRIDESCENCE
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
#endif`,vE=`#ifdef USE_BUMPMAP
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
#endif`,SE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ME=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,EE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,TE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,AE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,RE=`#define PI 3.141592653589793
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
} // validated`,CE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wE=`vec3 transformedNormal = objectNormal;
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
#endif`,DE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,UE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,LE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,NE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,OE="gl_FragColor = linearToOutputTexel( gl_FragColor );",PE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zE=`#ifdef USE_ENVMAP
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
#endif`,IE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,BE=`#ifdef USE_ENVMAP
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
#endif`,FE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,HE=`#ifdef USE_ENVMAP
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
#endif`,GE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,VE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,XE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,WE=`#ifdef USE_GRADIENTMAP
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
}`,YE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ZE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,KE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,QE=`#ifdef USE_ENVMAP
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
#endif`,JE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$E=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eb=`PhysicalMaterial material;
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
#endif`,nb=`uniform sampler2D dfgLUT;
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
}`,ib=`
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
#endif`,ab=`#if defined( RE_IndirectDiffuse )
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
#endif`,sb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,ob=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ub=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,db=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pb=`#if defined( USE_POINTS_UV )
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
#endif`,mb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_b=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xb=`#ifdef USE_MORPHTARGETS
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
#endif`,Mb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Eb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ab=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Rb=`#ifdef USE_NORMALMAP
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
#endif`,Cb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Db=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ub=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ob=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ib=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,kb=`float getShadowMask() {
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
}`,Xb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wb=`#ifdef USE_SKINNING
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
#endif`,Yb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qb=`#ifdef USE_SKINNING
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
#endif`,Zb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jb=`#ifdef USE_TRANSMISSION
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
#endif`,$b=`#ifdef USE_TRANSMISSION
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
#endif`,tT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,iT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const aT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sT=`uniform sampler2D t2D;
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
}`,rT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uT=`#include <common>
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
}`,fT=`#if DEPTH_PACKING == 3200
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
}`,hT=`#define DISTANCE
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
}`,dT=`#define DISTANCE
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
}`,pT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gT=`uniform float scale;
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
}`,_T=`uniform vec3 diffuse;
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
}`,vT=`#include <common>
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
}`,ST=`uniform vec3 diffuse;
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
}`,xT=`#define LAMBERT
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
}`,MT=`#define LAMBERT
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
}`,yT=`#define MATCAP
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
}`,ET=`#define MATCAP
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
}`,bT=`#define NORMAL
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
}`,TT=`#define NORMAL
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
}`,AT=`#define PHONG
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
}`,RT=`#define PHONG
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
}`,CT=`#define STANDARD
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
}`,wT=`#define STANDARD
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
}`,DT=`#define TOON
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
}`,UT=`#define TOON
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
}`,LT=`uniform float size;
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
}`,NT=`uniform vec3 diffuse;
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
}`,OT=`#include <common>
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
}`,PT=`uniform vec3 color;
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
}`,zT=`uniform float rotation;
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
}`,IT=`uniform vec3 diffuse;
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
}`,pe={alphahash_fragment:aE,alphahash_pars_fragment:sE,alphamap_fragment:rE,alphamap_pars_fragment:oE,alphatest_fragment:lE,alphatest_pars_fragment:cE,aomap_fragment:uE,aomap_pars_fragment:fE,batching_pars_vertex:hE,batching_vertex:dE,begin_vertex:pE,beginnormal_vertex:mE,bsdfs:gE,iridescence_fragment:_E,bumpmap_pars_fragment:vE,clipping_planes_fragment:SE,clipping_planes_pars_fragment:xE,clipping_planes_pars_vertex:ME,clipping_planes_vertex:yE,color_fragment:EE,color_pars_fragment:bE,color_pars_vertex:TE,color_vertex:AE,common:RE,cube_uv_reflection_fragment:CE,defaultnormal_vertex:wE,displacementmap_pars_vertex:DE,displacementmap_vertex:UE,emissivemap_fragment:LE,emissivemap_pars_fragment:NE,colorspace_fragment:OE,colorspace_pars_fragment:PE,envmap_fragment:zE,envmap_common_pars_fragment:IE,envmap_pars_fragment:BE,envmap_pars_vertex:FE,envmap_physical_pars_fragment:QE,envmap_vertex:HE,fog_vertex:GE,fog_pars_vertex:VE,fog_fragment:kE,fog_pars_fragment:XE,gradientmap_pars_fragment:WE,lightmap_pars_fragment:YE,lights_lambert_fragment:qE,lights_lambert_pars_fragment:ZE,lights_pars_begin:KE,lights_toon_fragment:JE,lights_toon_pars_fragment:jE,lights_phong_fragment:$E,lights_phong_pars_fragment:tb,lights_physical_fragment:eb,lights_physical_pars_fragment:nb,lights_fragment_begin:ib,lights_fragment_maps:ab,lights_fragment_end:sb,lightprobes_pars_fragment:rb,logdepthbuf_fragment:ob,logdepthbuf_pars_fragment:lb,logdepthbuf_pars_vertex:cb,logdepthbuf_vertex:ub,map_fragment:fb,map_pars_fragment:hb,map_particle_fragment:db,map_particle_pars_fragment:pb,metalnessmap_fragment:mb,metalnessmap_pars_fragment:gb,morphinstance_vertex:_b,morphcolor_vertex:vb,morphnormal_vertex:Sb,morphtarget_pars_vertex:xb,morphtarget_vertex:Mb,normal_fragment_begin:yb,normal_fragment_maps:Eb,normal_pars_fragment:bb,normal_pars_vertex:Tb,normal_vertex:Ab,normalmap_pars_fragment:Rb,clearcoat_normal_fragment_begin:Cb,clearcoat_normal_fragment_maps:wb,clearcoat_pars_fragment:Db,iridescence_pars_fragment:Ub,opaque_fragment:Lb,packing:Nb,premultiplied_alpha_fragment:Ob,project_vertex:Pb,dithering_fragment:zb,dithering_pars_fragment:Ib,roughnessmap_fragment:Bb,roughnessmap_pars_fragment:Fb,shadowmap_pars_fragment:Hb,shadowmap_pars_vertex:Gb,shadowmap_vertex:Vb,shadowmask_pars_fragment:kb,skinbase_vertex:Xb,skinning_pars_vertex:Wb,skinning_vertex:Yb,skinnormal_vertex:qb,specularmap_fragment:Zb,specularmap_pars_fragment:Kb,tonemapping_fragment:Qb,tonemapping_pars_fragment:Jb,transmission_fragment:jb,transmission_pars_fragment:$b,uv_pars_fragment:tT,uv_pars_vertex:eT,uv_vertex:nT,worldpos_vertex:iT,background_vert:aT,background_frag:sT,backgroundCube_vert:rT,backgroundCube_frag:oT,cube_vert:lT,cube_frag:cT,depth_vert:uT,depth_frag:fT,distance_vert:hT,distance_frag:dT,equirect_vert:pT,equirect_frag:mT,linedashed_vert:gT,linedashed_frag:_T,meshbasic_vert:vT,meshbasic_frag:ST,meshlambert_vert:xT,meshlambert_frag:MT,meshmatcap_vert:yT,meshmatcap_frag:ET,meshnormal_vert:bT,meshnormal_frag:TT,meshphong_vert:AT,meshphong_frag:RT,meshphysical_vert:CT,meshphysical_frag:wT,meshtoon_vert:DT,meshtoon_frag:UT,points_vert:LT,points_frag:NT,shadow_vert:OT,shadow_frag:PT,sprite_vert:zT,sprite_frag:IT},zt={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new le}},envmap:{envMap:{value:null},envMapRotation:{value:new le},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new le},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new tt},probesMax:{value:new tt},probesResolution:{value:new tt}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0},uvTransform:{value:new le}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}}},Ki={basic:{uniforms:Wn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.fog]),vertexShader:pe.meshbasic_vert,fragmentShader:pe.meshbasic_frag},lambert:{uniforms:Wn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new Kt(0)},envMapIntensity:{value:1}}]),vertexShader:pe.meshlambert_vert,fragmentShader:pe.meshlambert_frag},phong:{uniforms:Wn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:pe.meshphong_vert,fragmentShader:pe.meshphong_frag},standard:{uniforms:Wn([zt.common,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.roughnessmap,zt.metalnessmap,zt.fog,zt.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pe.meshphysical_vert,fragmentShader:pe.meshphysical_frag},toon:{uniforms:Wn([zt.common,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.gradientmap,zt.fog,zt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:pe.meshtoon_vert,fragmentShader:pe.meshtoon_frag},matcap:{uniforms:Wn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,{matcap:{value:null}}]),vertexShader:pe.meshmatcap_vert,fragmentShader:pe.meshmatcap_frag},points:{uniforms:Wn([zt.points,zt.fog]),vertexShader:pe.points_vert,fragmentShader:pe.points_frag},dashed:{uniforms:Wn([zt.common,zt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pe.linedashed_vert,fragmentShader:pe.linedashed_frag},depth:{uniforms:Wn([zt.common,zt.displacementmap]),vertexShader:pe.depth_vert,fragmentShader:pe.depth_frag},normal:{uniforms:Wn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,{opacity:{value:1}}]),vertexShader:pe.meshnormal_vert,fragmentShader:pe.meshnormal_frag},sprite:{uniforms:Wn([zt.sprite,zt.fog]),vertexShader:pe.sprite_vert,fragmentShader:pe.sprite_frag},background:{uniforms:{uvTransform:{value:new le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pe.background_vert,fragmentShader:pe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new le}},vertexShader:pe.backgroundCube_vert,fragmentShader:pe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pe.cube_vert,fragmentShader:pe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pe.equirect_vert,fragmentShader:pe.equirect_frag},distance:{uniforms:Wn([zt.common,zt.displacementmap,{referencePosition:{value:new tt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pe.distance_vert,fragmentShader:pe.distance_frag},shadow:{uniforms:Wn([zt.lights,zt.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:pe.shadow_vert,fragmentShader:pe.shadow_frag}};Ki.physical={uniforms:Wn([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new le},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new le},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new le},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new le},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new le},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new le},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new le}}]),vertexShader:pe.meshphysical_vert,fragmentShader:pe.meshphysical_frag};const Yc={r:0,b:0,g:0},BT=new tn,Xv=new le;Xv.set(-1,0,0,0,1,0,0,0,1);function FT(r,t,i,s,l,c){const f=new Kt(0);let p=l===!0?0:1,m,d,_=null,v=0,g=null;function x(P){let I=P.isScene===!0?P.background:null;if(I&&I.isTexture){const C=P.backgroundBlurriness>0;I=t.get(I,C)}return I}function E(P){let I=!1;const C=x(P);C===null?y(f,p):C&&C.isColor&&(y(C,1),I=!0);const L=r.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,c):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||I)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function R(P,I){const C=x(I);C&&(C.isCubeTexture||C.mapping===uu)?(d===void 0&&(d=new Hn(new hl(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:Xr(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(L,U,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=C,d.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(BT.makeRotationFromEuler(I.backgroundRotation)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(Xv),d.material.toneMapped=be.getTransfer(C.colorSpace)!==Ie,(_!==C||v!==C.version||g!==r.toneMapping)&&(d.material.needsUpdate=!0,_=C,v=C.version,g=r.toneMapping),d.layers.enableAll(),P.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(m===void 0&&(m=new Hn(new du(2,2),new Ci({name:"BackgroundMaterial",uniforms:Xr(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:Hs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=C,m.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,m.material.toneMapped=be.getTransfer(C.colorSpace)!==Ie,C.matrixAutoUpdate===!0&&C.updateMatrix(),m.material.uniforms.uvTransform.value.copy(C.matrix),(_!==C||v!==C.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,_=C,v=C.version,g=r.toneMapping),m.layers.enableAll(),P.unshift(m,m.geometry,m.material,0,0,null))}function y(P,I){P.getRGB(Yc,Hv(r)),i.buffers.color.setClear(Yc.r,Yc.g,Yc.b,I,c)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(P,I=1){f.set(P),p=I,y(f,p)},getClearAlpha:function(){return p},setClearAlpha:function(P){p=P,y(f,p)},render:E,addToRenderList:R,dispose:S}}function HT(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function p(H,W,j,q,Q){let B=!1;const V=v(H,q,j,W);c!==V&&(c=V,d(c.object)),B=x(H,q,j,Q),B&&E(H,q,j,Q),Q!==null&&t.update(Q,r.ELEMENT_ARRAY_BUFFER),(B||f)&&(f=!1,C(H,W,j,q),Q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function m(){return r.createVertexArray()}function d(H){return r.bindVertexArray(H)}function _(H){return r.deleteVertexArray(H)}function v(H,W,j,q){const Q=q.wireframe===!0;let B=s[W.id];B===void 0&&(B={},s[W.id]=B);const V=H.isInstancedMesh===!0?H.id:0;let ot=B[V];ot===void 0&&(ot={},B[V]=ot);let et=ot[j.id];et===void 0&&(et={},ot[j.id]=et);let ut=et[Q];return ut===void 0&&(ut=g(m()),et[Q]=ut),ut}function g(H){const W=[],j=[],q=[];for(let Q=0;Q<i;Q++)W[Q]=0,j[Q]=0,q[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:j,attributeDivisors:q,object:H,attributes:{},index:null}}function x(H,W,j,q){const Q=c.attributes,B=W.attributes;let V=0;const ot=j.getAttributes();for(const et in ot)if(ot[et].location>=0){const N=Q[et];let $=B[et];if($===void 0&&(et==="instanceMatrix"&&H.instanceMatrix&&($=H.instanceMatrix),et==="instanceColor"&&H.instanceColor&&($=H.instanceColor)),N===void 0||N.attribute!==$||$&&N.data!==$.data)return!0;V++}return c.attributesNum!==V||c.index!==q}function E(H,W,j,q){const Q={},B=W.attributes;let V=0;const ot=j.getAttributes();for(const et in ot)if(ot[et].location>=0){let N=B[et];N===void 0&&(et==="instanceMatrix"&&H.instanceMatrix&&(N=H.instanceMatrix),et==="instanceColor"&&H.instanceColor&&(N=H.instanceColor));const $={};$.attribute=N,N&&N.data&&($.data=N.data),Q[et]=$,V++}c.attributes=Q,c.attributesNum=V,c.index=q}function R(){const H=c.newAttributes;for(let W=0,j=H.length;W<j;W++)H[W]=0}function y(H){S(H,0)}function S(H,W){const j=c.newAttributes,q=c.enabledAttributes,Q=c.attributeDivisors;j[H]=1,q[H]===0&&(r.enableVertexAttribArray(H),q[H]=1),Q[H]!==W&&(r.vertexAttribDivisor(H,W),Q[H]=W)}function P(){const H=c.newAttributes,W=c.enabledAttributes;for(let j=0,q=W.length;j<q;j++)W[j]!==H[j]&&(r.disableVertexAttribArray(j),W[j]=0)}function I(H,W,j,q,Q,B,V){V===!0?r.vertexAttribIPointer(H,W,j,Q,B):r.vertexAttribPointer(H,W,j,q,Q,B)}function C(H,W,j,q){R();const Q=q.attributes,B=j.getAttributes(),V=W.defaultAttributeValues;for(const ot in B){const et=B[ot];if(et.location>=0){let ut=Q[ot];if(ut===void 0&&(ot==="instanceMatrix"&&H.instanceMatrix&&(ut=H.instanceMatrix),ot==="instanceColor"&&H.instanceColor&&(ut=H.instanceColor)),ut!==void 0){const N=ut.normalized,$=ut.itemSize,ht=t.get(ut);if(ht===void 0)continue;const Et=ht.buffer,Ct=ht.type,It=ht.bytesPerElement,at=Ct===r.INT||Ct===r.UNSIGNED_INT||ut.gpuType===Qd;if(ut.isInterleavedBufferAttribute){const pt=ut.data,bt=pt.stride,jt=ut.offset;if(pt.isInstancedInterleavedBuffer){for(let Ot=0;Ot<et.locationSize;Ot++)S(et.location+Ot,pt.meshPerAttribute);H.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let Ot=0;Ot<et.locationSize;Ot++)y(et.location+Ot);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let Ot=0;Ot<et.locationSize;Ot++)I(et.location+Ot,$/et.locationSize,Ct,N,bt*It,(jt+$/et.locationSize*Ot)*It,at)}else{if(ut.isInstancedBufferAttribute){for(let pt=0;pt<et.locationSize;pt++)S(et.location+pt,ut.meshPerAttribute);H.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let pt=0;pt<et.locationSize;pt++)y(et.location+pt);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let pt=0;pt<et.locationSize;pt++)I(et.location+pt,$/et.locationSize,Ct,N,$*It,$/et.locationSize*pt*It,at)}}else if(V!==void 0){const N=V[ot];if(N!==void 0)switch(N.length){case 2:r.vertexAttrib2fv(et.location,N);break;case 3:r.vertexAttrib3fv(et.location,N);break;case 4:r.vertexAttrib4fv(et.location,N);break;default:r.vertexAttrib1fv(et.location,N)}}}}P()}function L(){D();for(const H in s){const W=s[H];for(const j in W){const q=W[j];for(const Q in q){const B=q[Q];for(const V in B)_(B[V].object),delete B[V];delete q[Q]}}delete s[H]}}function U(H){if(s[H.id]===void 0)return;const W=s[H.id];for(const j in W){const q=W[j];for(const Q in q){const B=q[Q];for(const V in B)_(B[V].object),delete B[V];delete q[Q]}}delete s[H.id]}function O(H){for(const W in s){const j=s[W];for(const q in j){const Q=j[q];if(Q[H.id]===void 0)continue;const B=Q[H.id];for(const V in B)_(B[V].object),delete B[V];delete Q[H.id]}}}function T(H){for(const W in s){const j=s[W],q=H.isInstancedMesh===!0?H.id:0,Q=j[q];if(Q!==void 0){for(const B in Q){const V=Q[B];for(const ot in V)_(V[ot].object),delete V[ot];delete Q[B]}delete j[q],Object.keys(j).length===0&&delete s[W]}}}function D(){F(),f=!0,c!==l&&(c=l,d(c.object))}function F(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:D,resetDefaultState:F,dispose:L,releaseStatesOfGeometry:U,releaseStatesOfObject:T,releaseStatesOfProgram:O,initAttributes:R,enableAttribute:y,disableUnusedAttributes:P}}function GT(r,t,i){let s;function l(m){s=m}function c(m,d){r.drawArrays(s,m,d),i.update(d,s,1)}function f(m,d,_){_!==0&&(r.drawArraysInstanced(s,m,d,_),i.update(d,s,_))}function p(m,d,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,d,0,_);let g=0;for(let x=0;x<_;x++)g+=d[x];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=p}function VT(r,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const O=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(O){return!(O!==Bi&&s.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(O){const T=O===ea&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(O!==mi&&O!==Ji&&!T&&s.convert(O)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function m(O){if(O==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=i.precision!==void 0?i.precision:"highp";const _=m(d);_!==d&&(ie("WebGLRenderer:",d,"not supported, using",_,"instead."),d=_);const v=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const x=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),P=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),I=r.getParameter(r.MAX_VARYING_VECTORS),C=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),L=r.getParameter(r.MAX_SAMPLES),U=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:v,reversedDepthBuffer:g,maxTextures:x,maxVertexTextures:E,maxTextureSize:R,maxCubemapSize:y,maxAttributes:S,maxVertexUniforms:P,maxVaryings:I,maxFragmentUniforms:C,maxSamples:L,samples:U}}function kT(r){const t=this;let i=null,s=0,l=!1,c=!1;const f=new Aa,p=new le,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,g){const x=v.length!==0||g||s!==0||l;return l=g,s=v.length,x},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,g){i=_(v,g,0)},this.setState=function(v,g,x){const E=v.clippingPlanes,R=v.clipIntersection,y=v.clipShadows,S=r.get(v);if(!l||E===null||E.length===0||c&&!y)c?_(null):d();else{const P=c?0:s,I=P*4;let C=S.clippingState||null;m.value=C,C=_(E,g,I,x);for(let L=0;L!==I;++L)C[L]=i[L];S.clippingState=C,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=P}};function d(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function _(v,g,x,E){const R=v!==null?v.length:0;let y=null;if(R!==0){if(y=m.value,E!==!0||y===null){const S=x+R*4,P=g.matrixWorldInverse;p.getNormalMatrix(P),(y===null||y.length<S)&&(y=new Float32Array(S));for(let I=0,C=x;I!==R;++I,C+=4)f.copy(v[I]).applyMatrix4(P,p),f.normal.toArray(y,C),y[C+3]=f.constant}m.value=y,m.needsUpdate=!0}return t.numPlanes=R,t.numIntersection=0,y}}const Fr=4,XT=6,WT=20,YT=256,Wo=new hp,z_=new Kt;let jh=null,$h=0,td=0,ed=!1;const qT=new tt,Bs=new tt;class I_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,s=.1,l=100,c={}){const{size:f=256,position:p=qT}=c;jh=this._renderer.getRenderTarget(),$h=this._renderer.getActiveCubeFace(),td=this._renderer.getActiveMipmapLevel(),ed=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,s,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=H_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=F_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(jh,$h,td),this._renderer.xr.enabled=ed,t.scissorTest=!1,Pr(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Gs||t.mapping===kr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),jh=this._renderer.getRenderTarget(),$h=this._renderer.getActiveCubeFace(),td=this._renderer.getActiveMipmapLevel(),ed=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:ea,format:Bi,colorSpace:ru,depthBuffer:!1},l=B_(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=B_(t,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ZT(c)),this._blurMaterial=QT(c,t,i),this._ggxMaterial=KT(c,t,i)}return l}_compileMaterial(t){const i=new Hn(new ni,t);this._renderer.compile(i,Wo)}_sceneToCubeUV(t,i,s,l,c){const m=new Ri(90,1,i,s),d=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,x=v.toneMapping;v.getClearColor(z_),v.toneMapping=$i,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Hn(new hl,new zv({name:"PMREM.Background",side:Yn,depthWrite:!1,depthTest:!1})));const R=this._backgroundBox,y=R.material;let S=!1;const P=t.background;P?P.isColor&&(y.color.copy(P),t.background=null,S=!0):(y.color.copy(z_),S=!0);for(let I=0;I<6;I++){const C=I%3;C===0?(m.up.set(0,d[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[I],c.y,c.z)):C===1?(m.up.set(0,0,d[I]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[I],c.z)):(m.up.set(0,d[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[I]));const L=this._cubeSize;Pr(l,C*L,I>2?L:0,L,L),v.setRenderTarget(l),S&&v.render(R,m),v.render(t,m)}v.toneMapping=x,v.autoClear=g,t.background=P}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Gs||t.mapping===kr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=H_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=F_());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const p=c.uniforms;p.envMap.value=t;const m=this._cubeSize;Pr(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,Wo)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);i.autoClear=s}_applyGGXFilter(t,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,p=this._lodMeshes[s];p.material=f;const m=f.uniforms,d=s/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),v=Math.sqrt(d*d-_*_),g=d*1.25,x=v*g,{_lodMax:E}=this,R=this._sizeLods[s],y=3*R*(s>E-Fr?s-E+Fr:0),S=4*(this._cubeSize-R);m.envMap.value=t.texture,m.roughness.value=x,m.mipInt.value=E-i,Pr(c,y,S,3*R,2*R),l.setRenderTarget(c),l.render(p,Wo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=E-s,Pr(t,y,S,3*R,2*R),l.setRenderTarget(t),l.render(p,Wo)}_blur(t,i,s,l){const c=this._pingPongRenderTarget,f=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(t,c,i,s,f),this._blurPass(c,t,s,s,f)}_blurPass(t,i,s,l,c){const f=this._renderer,p=this._blurMaterial,m=this._lodMeshes[l];m.material=p;const d=p.uniforms;d.envMap.value=t.texture,d.sigma.value=c,d.mipInt.value=this._lodMax-s;const _=this._sizeLods[l],v=3*_*(l>this._lodMax-Fr?l-this._lodMax+Fr:0),g=4*(this._cubeSize-_);Pr(i,v,g,3*_,2*_),f.setRenderTarget(i),f.render(m,Wo)}}function ZT(r){const t=[],i=[];let s=r;const l=r-Fr+1+XT;for(let c=0;c<l;c++){const f=Math.pow(2,s);t.push(f);const p=1/(f-2),m=-p,d=1+p,_=[m,m,d,m,d,d,m,m,d,d,m,d],v=6,g=6,x=3,E=new Float32Array(x*g*v),R=new Float32Array(x*g*v);for(let S=0;S<v;S++){const P=S%3*2/3-1,I=S>2?0:-1,C=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];E.set(C,x*g*S);for(let L=0;L<g;L++){const U=_[L*2]*2-1,O=_[L*2+1]*2-1;S===0?Bs.set(1,O,U):S===1?Bs.set(-U,1,-O):S===2?Bs.set(-U,O,1):S===3?Bs.set(-1,O,-U):S===4?Bs.set(-U,-1,O):Bs.set(U,O,-1),Bs.toArray(R,(S*g+L)*x)}}const y=new ni;y.setAttribute("position",new Hi(E,x)),y.setAttribute("outputDirection",new Hi(R,x)),i.push(new Hn(y,null)),s>Fr&&s--}return{lodMeshes:i,sizeLods:t}}function B_(r,t,i){const s=new Fi(r,t,i);return s.texture.mapping=uu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Pr(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function KT(r,t,i){return new Ci({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:YT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:pu(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function QT(r,t,i){return new Ci({name:"SphericalGaussianBlur",defines:{SAMPLES:WT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:pu(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function F_(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pu(),fragmentShader:`

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
		`,blending:wa,depthTest:!1,depthWrite:!1})}function H_(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wa,depthTest:!1,depthWrite:!1})}function pu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Wv extends Fi{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new Bv(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new hl(5,5,5),c=new Ci({name:"CubemapFromEquirect",uniforms:Xr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Yn,blending:wa});c.uniforms.tEquirect.value=i;const f=new Hn(l,c),p=i.minFilter;return i.minFilter===Ca&&(i.minFilter=Pn),new $y(1,10,this).update(t,f),i.minFilter=p,f.geometry.dispose(),f.material.dispose(),this}clear(t,i=!0,s=!0,l=!0){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(i,s,l);t.setRenderTarget(c)}}function JT(r){let t=new WeakMap,i=new WeakMap,s=null;function l(g,x=!1){return g==null?null:x?f(g):c(g)}function c(g){if(g&&g.isTexture){const x=g.mapping;if(x===Rh||x===Ch)if(t.has(g)){const E=t.get(g).texture;return p(E,g.mapping)}else{const E=g.image;if(E&&E.height>0){const R=new Wv(E.height);return R.fromEquirectangularTexture(r,g),t.set(g,R),g.addEventListener("dispose",d),p(R.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const x=g.mapping,E=x===Rh||x===Ch,R=x===Gs||x===kr;if(E||R){let y=i.get(g);const S=y!==void 0?y.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return s===null&&(s=new I_(r)),y=E?s.fromEquirectangular(g,y):s.fromCubemap(g,y),y.texture.pmremVersion=g.pmremVersion,i.set(g,y),y.texture;if(y!==void 0)return y.texture;{const P=g.image;return E&&P&&P.height>0||R&&P&&m(P)?(s===null&&(s=new I_(r)),y=E?s.fromEquirectangular(g):s.fromCubemap(g),y.texture.pmremVersion=g.pmremVersion,i.set(g,y),g.addEventListener("dispose",_),y.texture):null}}}return g}function p(g,x){return x===Rh?g.mapping=Gs:x===Ch&&(g.mapping=kr),g}function m(g){let x=0;const E=6;for(let R=0;R<E;R++)g[R]!==void 0&&x++;return x===E}function d(g){const x=g.target;x.removeEventListener("dispose",d);const E=t.get(x);E!==void 0&&(t.delete(x),E.dispose())}function _(g){const x=g.target;x.removeEventListener("dispose",_);const E=i.get(x);E!==void 0&&(i.delete(x),E.dispose())}function v(){t=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:v}}function jT(r){const t={};function i(s){if(t[s]!==void 0)return t[s];const l=r.getExtension(s);return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Gr("WebGLRenderer: "+s+" extension not supported."),l}}}function $T(r,t,i,s){const l={},c=new WeakMap;function f(v){const g=v.target;g.index!==null&&t.remove(g.index);for(const E in g.attributes)t.remove(g.attributes[E]);g.removeEventListener("dispose",f),delete l[g.id];const x=c.get(g);x&&(t.remove(x),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function p(v,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(v){const g=v.attributes;for(const x in g)t.update(g[x],r.ARRAY_BUFFER)}function d(v){const g=[],x=v.index,E=v.attributes.position;let R=0;if(E===void 0)return;if(x!==null){const P=x.array;R=x.version;for(let I=0,C=P.length;I<C;I+=3){const L=P[I+0],U=P[I+1],O=P[I+2];g.push(L,U,U,O,O,L)}}else{const P=E.array;R=E.version;for(let I=0,C=P.length/3-1;I<C;I+=3){const L=I+0,U=I+1,O=I+2;g.push(L,U,U,O,O,L)}}const y=new(E.count>=65535?Pv:Ov)(g,1);y.version=R;const S=c.get(v);S&&t.remove(S),c.set(v,y)}function _(v){const g=c.get(v);if(g){const x=v.index;x!==null&&g.version<x.version&&d(v)}else d(v);return c.get(v)}return{get:p,update:m,getWireframeAttribute:_}}function t1(r,t,i){let s;function l(v){s=v}let c,f;function p(v){c=v.type,f=v.bytesPerElement}function m(v,g){r.drawElements(s,g,c,v*f),i.update(g,s,1)}function d(v,g,x){x!==0&&(r.drawElementsInstanced(s,g,c,v*f,x),i.update(g,s,x))}function _(v,g,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,v,0,x);let R=0;for(let y=0;y<x;y++)R+=g[y];i.update(R,s,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=_}function e1(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,p){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=p*(c/3);break;case r.LINES:i.lines+=p*(c/2);break;case r.LINE_STRIP:i.lines+=p*(c-1);break;case r.LINE_LOOP:i.lines+=p*c;break;case r.POINTS:i.points+=p*c;break;default:we("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function n1(r,t,i){const s=new WeakMap,l=new en;function c(f,p,m){const d=f.morphTargetInfluences,_=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,v=_!==void 0?_.length:0;let g=s.get(p);if(g===void 0||g.count!==v){let F=function(){T.dispose(),s.delete(p),p.removeEventListener("dispose",F)};var x=F;g!==void 0&&g.texture.dispose();const E=p.morphAttributes.position!==void 0,R=p.morphAttributes.normal!==void 0,y=p.morphAttributes.color!==void 0,S=p.morphAttributes.position||[],P=p.morphAttributes.normal||[],I=p.morphAttributes.color||[];let C=0;E===!0&&(C=1),R===!0&&(C=2),y===!0&&(C=3);let L=p.attributes.position.count*C,U=1;L>t.maxTextureSize&&(U=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const O=new Float32Array(L*U*4*v),T=new Uv(O,L,U,v);T.type=Ji,T.needsUpdate=!0;const D=C*4;for(let H=0;H<v;H++){const W=S[H],j=P[H],q=I[H],Q=L*U*4*H;for(let B=0;B<W.count;B++){const V=B*D;E===!0&&(l.fromBufferAttribute(W,B),O[Q+V+0]=l.x,O[Q+V+1]=l.y,O[Q+V+2]=l.z,O[Q+V+3]=0),R===!0&&(l.fromBufferAttribute(j,B),O[Q+V+4]=l.x,O[Q+V+5]=l.y,O[Q+V+6]=l.z,O[Q+V+7]=0),y===!0&&(l.fromBufferAttribute(q,B),O[Q+V+8]=l.x,O[Q+V+9]=l.y,O[Q+V+10]=l.z,O[Q+V+11]=q.itemSize===4?l.w:1)}}g={count:v,texture:T,size:new ae(L,U)},s.set(p,g),p.addEventListener("dispose",F)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let E=0;for(let y=0;y<d.length;y++)E+=d[y];const R=p.morphTargetsRelative?1:1-E;m.getUniforms().setValue(r,"morphTargetBaseInfluence",R),m.getUniforms().setValue(r,"morphTargetInfluences",d)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function i1(r,t,i,s,l){let c=new WeakMap;function f(d){const _=l.render.frame,v=d.geometry,g=t.get(d,v);if(c.get(g)!==_&&(t.update(g),c.set(g,_)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==_&&(i.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&i.update(d.instanceColor,r.ARRAY_BUFFER),c.set(d,_))),d.isSkinnedMesh){const x=d.skeleton;c.get(x)!==_&&(x.update(),c.set(x,_))}return g}function p(){c=new WeakMap}function m(d){const _=d.target;_.removeEventListener("dispose",m),s.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:f,dispose:p}}const a1={[gv]:"LINEAR_TONE_MAPPING",[_v]:"REINHARD_TONE_MAPPING",[vv]:"CINEON_TONE_MAPPING",[Kd]:"ACES_FILMIC_TONE_MAPPING",[xv]:"AGX_TONE_MAPPING",[Mv]:"NEUTRAL_TONE_MAPPING",[Sv]:"CUSTOM_TONE_MAPPING"};function s1(r,t,i,s,l,c){const f=new Fi(t,i,{type:r,depthBuffer:l,stencilBuffer:c,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let p=null,m=null;const d=new ni;d.setAttribute("position",new Mn([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Mn([0,2,0,0,2,0],2));const _=new Xy({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),v=new Hn(d,_),g=new hp(-1,1,1,-1,0,1);let x=null,E=null,R=!1,y,S=null,P=[],I=!1;this.setSize=function(C,L){f.setSize(C,L),p!==null&&p.setSize(C,L),m!==null&&m.setSize(C,L);for(let U=0;U<P.length;U++){const O=P[U];O.setSize&&O.setSize(C,L)}},this.setEffects=function(C){P=C,I=P.length>0&&P[0].isRenderPass===!0;const L=f.width,U=f.height;P.length>0&&p===null&&(p=new Fi(L,U,{type:ea,depthBuffer:!1,stencilBuffer:!1}),m=new Fi(L,U,{type:ea,depthBuffer:!1,stencilBuffer:!1}));for(let O=0;O<P.length;O++){const T=P[O];T.setSize&&T.setSize(L,U)}},this.begin=function(C,L){if(R||C.toneMapping===$i&&P.length===0)return!1;if(S=L,L!==null){const U=L.width,O=L.height;(f.width!==U||f.height!==O)&&this.setSize(U,O)}return I===!1&&C.setRenderTarget(f),y=C.toneMapping,C.toneMapping=$i,!0},this.hasRenderPass=function(){return I},this.end=function(C,L){C.toneMapping=y,R=!0;let U=f,O=p;for(let T=0;T<P.length;T++){const D=P[T];D.enabled!==!1&&(D.render(C,O,U,L),D.needsSwap!==!1&&(U=O,O=O===p?m:p))}if(x!==C.outputColorSpace||E!==C.toneMapping){x=C.outputColorSpace,E=C.toneMapping,_.defines={},be.getTransfer(x)===Ie&&(_.defines.SRGB_TRANSFER="");const T=a1[E];T&&(_.defines[T]=""),_.needsUpdate=!0}_.uniforms.tDiffuse.value=U.texture,C.setRenderTarget(S),C.render(v,g),S=null,R=!1},this.isCompositing=function(){return R},this.dispose=function(){f.dispose(),p!==null&&p.dispose(),m!==null&&m.dispose(),d.dispose(),_.dispose()}}const Yv=new Fn,Wd=new ol(1,1),qv=new Uv,Zv=new xy,Kv=new Bv,G_=[],V_=[],k_=new Float32Array(16),X_=new Float32Array(9),W_=new Float32Array(4);function Yr(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let c=G_[l];if(c===void 0&&(c=new Float32Array(l),G_[l]=c),t!==0){s.toArray(c,0);for(let f=1,p=0;f!==t;++f)p+=i,r[f].toArray(c,p)}return c}function yn(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function En(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function mu(r,t){let i=V_[t];i===void 0&&(i=new Int32Array(t),V_[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function r1(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function o1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(yn(i,t))return;r.uniform2fv(this.addr,t),En(i,t)}}function l1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(yn(i,t))return;r.uniform3fv(this.addr,t),En(i,t)}}function c1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(yn(i,t))return;r.uniform4fv(this.addr,t),En(i,t)}}function u1(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(yn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),En(i,t)}else{if(yn(i,s))return;W_.set(s),r.uniformMatrix2fv(this.addr,!1,W_),En(i,s)}}function f1(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(yn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),En(i,t)}else{if(yn(i,s))return;X_.set(s),r.uniformMatrix3fv(this.addr,!1,X_),En(i,s)}}function h1(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(yn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),En(i,t)}else{if(yn(i,s))return;k_.set(s),r.uniformMatrix4fv(this.addr,!1,k_),En(i,s)}}function d1(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function p1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(yn(i,t))return;r.uniform2iv(this.addr,t),En(i,t)}}function m1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(yn(i,t))return;r.uniform3iv(this.addr,t),En(i,t)}}function g1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(yn(i,t))return;r.uniform4iv(this.addr,t),En(i,t)}}function _1(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function v1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(yn(i,t))return;r.uniform2uiv(this.addr,t),En(i,t)}}function S1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(yn(i,t))return;r.uniform3uiv(this.addr,t),En(i,t)}}function x1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(yn(i,t))return;r.uniform4uiv(this.addr,t),En(i,t)}}function M1(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Wd.compareFunction=i.isReversedDepthBuffer()?ip:np,c=Wd):c=Yv,i.setTexture2D(t||c,l)}function y1(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||Zv,l)}function E1(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||Kv,l)}function b1(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||qv,l)}function T1(r){switch(r){case 5126:return r1;case 35664:return o1;case 35665:return l1;case 35666:return c1;case 35674:return u1;case 35675:return f1;case 35676:return h1;case 5124:case 35670:return d1;case 35667:case 35671:return p1;case 35668:case 35672:return m1;case 35669:case 35673:return g1;case 5125:return _1;case 36294:return v1;case 36295:return S1;case 36296:return x1;case 35678:case 36198:case 36298:case 36306:case 35682:return M1;case 35679:case 36299:case 36307:return y1;case 35680:case 36300:case 36308:case 36293:return E1;case 36289:case 36303:case 36311:case 36292:return b1}}function A1(r,t){r.uniform1fv(this.addr,t)}function R1(r,t){const i=Yr(t,this.size,2);r.uniform2fv(this.addr,i)}function C1(r,t){const i=Yr(t,this.size,3);r.uniform3fv(this.addr,i)}function w1(r,t){const i=Yr(t,this.size,4);r.uniform4fv(this.addr,i)}function D1(r,t){const i=Yr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function U1(r,t){const i=Yr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function L1(r,t){const i=Yr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function N1(r,t){r.uniform1iv(this.addr,t)}function O1(r,t){r.uniform2iv(this.addr,t)}function P1(r,t){r.uniform3iv(this.addr,t)}function z1(r,t){r.uniform4iv(this.addr,t)}function I1(r,t){r.uniform1uiv(this.addr,t)}function B1(r,t){r.uniform2uiv(this.addr,t)}function F1(r,t){r.uniform3uiv(this.addr,t)}function H1(r,t){r.uniform4uiv(this.addr,t)}function G1(r,t,i){const s=this.cache,l=t.length,c=mu(i,l);yn(s,c)||(r.uniform1iv(this.addr,c),En(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=Wd:f=Yv;for(let p=0;p!==l;++p)i.setTexture2D(t[p]||f,c[p])}function V1(r,t,i){const s=this.cache,l=t.length,c=mu(i,l);yn(s,c)||(r.uniform1iv(this.addr,c),En(s,c));for(let f=0;f!==l;++f)i.setTexture3D(t[f]||Zv,c[f])}function k1(r,t,i){const s=this.cache,l=t.length,c=mu(i,l);yn(s,c)||(r.uniform1iv(this.addr,c),En(s,c));for(let f=0;f!==l;++f)i.setTextureCube(t[f]||Kv,c[f])}function X1(r,t,i){const s=this.cache,l=t.length,c=mu(i,l);yn(s,c)||(r.uniform1iv(this.addr,c),En(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(t[f]||qv,c[f])}function W1(r){switch(r){case 5126:return A1;case 35664:return R1;case 35665:return C1;case 35666:return w1;case 35674:return D1;case 35675:return U1;case 35676:return L1;case 5124:case 35670:return N1;case 35667:case 35671:return O1;case 35668:case 35672:return P1;case 35669:case 35673:return z1;case 5125:return I1;case 36294:return B1;case 36295:return F1;case 36296:return H1;case 35678:case 36198:case 36298:case 36306:case 35682:return G1;case 35679:case 36299:case 36307:return V1;case 35680:case 36300:case 36308:case 36293:return k1;case 36289:case 36303:case 36311:case 36292:return X1}}class Y1{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=T1(i.type)}}class q1{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=W1(i.type)}}class Z1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const p=l[c];p.setValue(t,i[p.id],s)}}}const nd=/(\w+)(\])?(\[|\.)?/g;function Y_(r,t){r.seq.push(t),r.map[t.id]=t}function K1(r,t,i){const s=r.name,l=s.length;for(nd.lastIndex=0;;){const c=nd.exec(s),f=nd.lastIndex;let p=c[1];const m=c[2]==="]",d=c[3];if(m&&(p=p|0),d===void 0||d==="["&&f+2===l){Y_(i,d===void 0?new Y1(p,r,t):new q1(p,r,t));break}else{let v=i.map[p];v===void 0&&(v=new Z1(p),Y_(i,v)),i=v}}}class tu{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const p=t.getActiveUniform(i,f),m=t.getUniformLocation(i,p.name);K1(p,m,this)}const l=[],c=[];for(const f of this.seq)f.type===t.SAMPLER_2D_SHADOW||f.type===t.SAMPLER_CUBE_SHADOW||f.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,f=i.length;c!==f;++c){const p=i[c],m=s[p.id];m.needsUpdate!==!1&&p.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in i&&s.push(f)}return s}}function q_(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const Q1=37297;let J1=0;function j1(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let f=l;f<c;f++){const p=f+1;s.push(`${p===t?">":" "} ${p}: ${i[f]}`)}return s.join(`
`)}const Z_=new le;function $1(r){be._getMatrix(Z_,be.workingColorSpace,r);const t=`mat3( ${Z_.elements.map(i=>i.toFixed(4))} )`;switch(be.getTransfer(r)){case ou:return[t,"LinearTransferOETF"];case Ie:return[t,"sRGBTransferOETF"];default:return ie("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function K_(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const p=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+j1(r.getShaderSource(t),p)}else return c}function tA(r,t){const i=$1(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const eA={[gv]:"Linear",[_v]:"Reinhard",[vv]:"Cineon",[Kd]:"ACESFilmic",[xv]:"AgX",[Mv]:"Neutral",[Sv]:"Custom"};function nA(r,t){const i=eA[t];return i===void 0?(ie("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const qc=new tt;function iA(){be.getLuminanceCoefficients(qc);const r=qc.x.toFixed(4),t=qc.y.toFixed(4),i=qc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function aA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ko).join(`
`)}function sA(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function rA(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),f=c.name;let p=1;c.type===r.FLOAT_MAT2&&(p=2),c.type===r.FLOAT_MAT3&&(p=3),c.type===r.FLOAT_MAT4&&(p=4),i[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:p}}return i}function Ko(r){return r!==""}function Q_(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function J_(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const oA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yd(r){return r.replace(oA,cA)}const lA=new Map;function cA(r,t){let i=pe[t];if(i===void 0){const s=lA.get(t);if(s!==void 0)i=pe[s],ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Yd(i)}const uA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function j_(r){return r.replace(uA,fA)}function fA(r,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function $_(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const hA={[jo]:"SHADOWMAP_TYPE_PCF",[Zo]:"SHADOWMAP_TYPE_VSM"};function dA(r){return hA[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const pA={[Gs]:"ENVMAP_TYPE_CUBE",[kr]:"ENVMAP_TYPE_CUBE",[uu]:"ENVMAP_TYPE_CUBE_UV"};function mA(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":pA[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const gA={[kr]:"ENVMAP_MODE_REFRACTION"};function _A(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":gA[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const vA={[cu]:"ENVMAP_BLENDING_MULTIPLY",[zM]:"ENVMAP_BLENDING_MIX",[IM]:"ENVMAP_BLENDING_ADD"};function SA(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":vA[r.combine]||"ENVMAP_BLENDING_NONE"}function xA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function MA(r,t,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,p=i.fragmentShader;const m=dA(i),d=mA(i),_=_A(i),v=SA(i),g=xA(i),x=aA(i),E=sA(c),R=l.createProgram();let y,S,P=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Ko).join(`
`),y.length>0&&(y+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Ko).join(`
`),S.length>0&&(S+=`
`)):(y=[$_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ko).join(`
`),S=[$_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.envMap?"#define "+_:"",i.envMap?"#define "+v:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==$i?"#define TONE_MAPPING":"",i.toneMapping!==$i?pe.tonemapping_pars_fragment:"",i.toneMapping!==$i?nA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",pe.colorspace_pars_fragment,tA("linearToOutputTexel",i.outputColorSpace),iA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Ko).join(`
`)),f=Yd(f),f=Q_(f,i),f=J_(f,i),p=Yd(p),p=Q_(p,i),p=J_(p,i),f=j_(f),p=j_(p),i.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,y=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,S=["#define varying in",i.glslVersion===c_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===c_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const I=P+y+f,C=P+S+p,L=q_(l,l.VERTEX_SHADER,I),U=q_(l,l.FRAGMENT_SHADER,C);l.attachShader(R,L),l.attachShader(R,U),i.index0AttributeName!==void 0?l.bindAttribLocation(R,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(R,0,"position"),l.linkProgram(R);function O(H){if(r.debug.checkShaderErrors){const W=l.getProgramInfoLog(R)||"",j=l.getShaderInfoLog(L)||"",q=l.getShaderInfoLog(U)||"",Q=W.trim(),B=j.trim(),V=q.trim();let ot=!0,et=!0;if(l.getProgramParameter(R,l.LINK_STATUS)===!1)if(ot=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,R,L,U);else{const ut=K_(l,L,"vertex"),N=K_(l,U,"fragment");we("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(R,l.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+Q+`
`+ut+`
`+N)}else Q!==""?ie("WebGLProgram: Program Info Log:",Q):(B===""||V==="")&&(et=!1);et&&(H.diagnostics={runnable:ot,programLog:Q,vertexShader:{log:B,prefix:y},fragmentShader:{log:V,prefix:S}})}l.deleteShader(L),l.deleteShader(U),T=new tu(l,R),D=rA(l,R)}let T;this.getUniforms=function(){return T===void 0&&O(this),T};let D;this.getAttributes=function(){return D===void 0&&O(this),D};let F=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=l.getProgramParameter(R,Q1)),F},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(R),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=J1++,this.cacheKey=t,this.usedTimes=1,this.program=R,this.vertexShader=L,this.fragmentShader=U,this}let yA=0;class EA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,i,s){const l=this._getShaderCacheForMaterial(t);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new bA(t),i.set(t,s)),s}}class bA{constructor(t){this.id=yA++,this.code=t,this.usedTimes=0}}function TA(r){return r===ks||r===iu||r===au}function AA(r,t,i,s,l,c){const f=new Lv,p=new EA,m=new Set,d=[],_=new Map,v=s.logarithmicDepthBuffer;let g=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(T){return m.add(T),T===0?"uv":`uv${T}`}function R(T,D,F,H,W,j){const q=H.fog,Q=W.geometry,B=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?H.environment:null,V=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,ot=t.get(T.envMap||B,V),et=ot&&ot.mapping===uu?ot.image.height:null,ut=x[T.type];T.precision!==null&&(g=s.getMaxPrecision(T.precision),g!==T.precision&&ie("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const N=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,$=N!==void 0?N.length:0;let ht=0;Q.morphAttributes.position!==void 0&&(ht=1),Q.morphAttributes.normal!==void 0&&(ht=2),Q.morphAttributes.color!==void 0&&(ht=3);let Et,Ct,It,at;if(ut){const Fe=Ki[ut];Et=Fe.vertexShader,Ct=Fe.fragmentShader}else{Et=T.vertexShader,Ct=T.fragmentShader;const Fe=p.getVertexShaderStage(T),Te=p.getFragmentShaderStage(T);p.update(T,Fe,Te),It=Fe.id,at=Te.id}const pt=r.getRenderTarget(),bt=r.state.buffers.depth.getReversed(),jt=W.isInstancedMesh===!0,Ot=W.isBatchedMesh===!0,se=!!T.map,Ze=!!T.matcap,re=!!ot,xe=!!T.aoMap,Ne=!!T.lightMap,ge=!!T.bumpMap&&T.wireframe===!1,Xe=!!T.normalMap,nn=!!T.displacementMap,bn=!!T.emissiveMap,We=!!T.metalnessMap,an=!!T.roughnessMap,Z=T.anisotropy>0,Oe=T.clearcoat>0,De=T.dispersion>0,z=T.retroreflectivity>0,b=T.iridescence>0,J=T.sheen>0,lt=T.transmission>0,mt=Z&&!!T.anisotropyMap,Tt=Oe&&!!T.clearcoatMap,Dt=Oe&&!!T.clearcoatNormalMap,gt=Oe&&!!T.clearcoatRoughnessMap,_t=b&&!!T.iridescenceMap,At=b&&!!T.iridescenceThicknessMap,Gt=J&&!!T.sheenColorMap,Nt=J&&!!T.sheenRoughnessMap,Ut=!!T.specularMap,Qt=!!T.specularColorMap,Jt=!!T.specularIntensityMap,ne=lt&&!!T.transmissionMap,Y=lt&&!!T.thicknessMap,Rt=!!T.gradientMap,St=!!T.alphaMap,wt=T.alphaTest>0,Bt=!!T.alphaHash,yt=!!T.extensions;let Zt=$i;T.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(Zt=r.toneMapping);const Xt={shaderID:ut,shaderType:T.type,shaderName:T.name,vertexShader:Et,fragmentShader:Ct,defines:T.defines,customVertexShaderID:It,customFragmentShaderID:at,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:Ot,batchingColor:Ot&&W._colorsTexture!==null,instancing:jt,instancingColor:jt&&W.instanceColor!==null,instancingMorph:jt&&W.morphTexture!==null,outputColorSpace:pt===null?r.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:be.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:se,matcap:Ze,envMap:re,envMapMode:re&&ot.mapping,envMapCubeUVHeight:et,aoMap:xe,lightMap:Ne,bumpMap:ge,normalMap:Xe,displacementMap:nn,emissiveMap:bn,normalMapObjectSpace:Xe&&T.normalMapType===HM,normalMapTangentSpace:Xe&&T.normalMapType===su,packedNormalMap:Xe&&T.normalMapType===su&&TA(T.normalMap.format),metalnessMap:We,roughnessMap:an,anisotropy:Z,anisotropyMap:mt,clearcoat:Oe,clearcoatMap:Tt,clearcoatNormalMap:Dt,clearcoatRoughnessMap:gt,dispersion:De,retroreflection:z,iridescence:b,iridescenceMap:_t,iridescenceThicknessMap:At,sheen:J,sheenColorMap:Gt,sheenRoughnessMap:Nt,specularMap:Ut,specularColorMap:Qt,specularIntensityMap:Jt,transmission:lt,transmissionMap:ne,thicknessMap:Y,gradientMap:Rt,opaque:T.transparent===!1&&T.blending===$o&&T.alphaToCoverage===!1,alphaMap:St,alphaTest:wt,alphaHash:Bt,combine:T.combine,mapUv:se&&E(T.map.channel),aoMapUv:xe&&E(T.aoMap.channel),lightMapUv:Ne&&E(T.lightMap.channel),bumpMapUv:ge&&E(T.bumpMap.channel),normalMapUv:Xe&&E(T.normalMap.channel),displacementMapUv:nn&&E(T.displacementMap.channel),emissiveMapUv:bn&&E(T.emissiveMap.channel),metalnessMapUv:We&&E(T.metalnessMap.channel),roughnessMapUv:an&&E(T.roughnessMap.channel),anisotropyMapUv:mt&&E(T.anisotropyMap.channel),clearcoatMapUv:Tt&&E(T.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&E(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&E(T.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&E(T.iridescenceMap.channel),iridescenceThicknessMapUv:At&&E(T.iridescenceThicknessMap.channel),sheenColorMapUv:Gt&&E(T.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&E(T.sheenRoughnessMap.channel),specularMapUv:Ut&&E(T.specularMap.channel),specularColorMapUv:Qt&&E(T.specularColorMap.channel),specularIntensityMapUv:Jt&&E(T.specularIntensityMap.channel),transmissionMapUv:ne&&E(T.transmissionMap.channel),thicknessMapUv:Y&&E(T.thicknessMap.channel),alphaMapUv:St&&E(T.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Xe||Z),vertexNormals:!!Q.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!Q.attributes.uv&&(se||St),fog:!!q,useFog:T.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||Q.attributes.normal===void 0&&Xe===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:bt,skinning:W.isSkinnedMesh===!0,hasPositionAttribute:Q.attributes.position!==void 0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:ht,numSunLights:D.sun.length,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numSunLightShadows:D.sunShadowMap.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:j.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&F.length>0,shadowMapType:r.shadowMap.type,toneMapping:Zt,decodeVideoTexture:se&&T.map.isVideoTexture===!0&&be.getTransfer(T.map.colorSpace)===Ie,decodeVideoTextureEmissive:bn&&T.emissiveMap.isVideoTexture===!0&&be.getTransfer(T.emissiveMap.colorSpace)===Ie,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Qi,flipSided:T.side===Yn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:yt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(yt&&T.extensions.multiDraw===!0||Ot)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Xt.vertexUv1s=m.has(1),Xt.vertexUv2s=m.has(2),Xt.vertexUv3s=m.has(3),m.clear(),Xt}function y(T){const D=[];if(T.shaderID?D.push(T.shaderID):(D.push(T.customVertexShaderID),D.push(T.customFragmentShaderID)),T.defines!==void 0)for(const F in T.defines)D.push(F),D.push(T.defines[F]);return T.isRawShaderMaterial===!1&&(S(D,T),P(D,T),D.push(r.outputColorSpace)),D.push(T.customProgramCacheKey),D.join()}function S(T,D){T.push(D.precision),T.push(D.outputColorSpace),T.push(D.envMapMode),T.push(D.envMapCubeUVHeight),T.push(D.mapUv),T.push(D.alphaMapUv),T.push(D.lightMapUv),T.push(D.aoMapUv),T.push(D.bumpMapUv),T.push(D.normalMapUv),T.push(D.displacementMapUv),T.push(D.emissiveMapUv),T.push(D.metalnessMapUv),T.push(D.roughnessMapUv),T.push(D.anisotropyMapUv),T.push(D.clearcoatMapUv),T.push(D.clearcoatNormalMapUv),T.push(D.clearcoatRoughnessMapUv),T.push(D.iridescenceMapUv),T.push(D.iridescenceThicknessMapUv),T.push(D.sheenColorMapUv),T.push(D.sheenRoughnessMapUv),T.push(D.specularMapUv),T.push(D.specularColorMapUv),T.push(D.specularIntensityMapUv),T.push(D.transmissionMapUv),T.push(D.thicknessMapUv),T.push(D.combine),T.push(D.fogExp2),T.push(D.sizeAttenuation),T.push(D.morphTargetsCount),T.push(D.morphAttributeCount),T.push(D.numSunLights),T.push(D.numDirLights),T.push(D.numPointLights),T.push(D.numSpotLights),T.push(D.numSpotLightMaps),T.push(D.numHemiLights),T.push(D.numRectAreaLights),T.push(D.numSunLightShadows),T.push(D.numDirLightShadows),T.push(D.numPointLightShadows),T.push(D.numSpotLightShadows),T.push(D.numSpotLightShadowsWithMaps),T.push(D.numLightProbes),T.push(D.shadowMapType),T.push(D.toneMapping),T.push(D.numClippingPlanes),T.push(D.numClipIntersection),T.push(D.depthPacking)}function P(T,D){f.disableAll(),D.instancing&&f.enable(0),D.instancingColor&&f.enable(1),D.instancingMorph&&f.enable(2),D.matcap&&f.enable(3),D.envMap&&f.enable(4),D.normalMapObjectSpace&&f.enable(5),D.normalMapTangentSpace&&f.enable(6),D.clearcoat&&f.enable(7),D.iridescence&&f.enable(8),D.alphaTest&&f.enable(9),D.vertexColors&&f.enable(10),D.vertexAlphas&&f.enable(11),D.vertexUv1s&&f.enable(12),D.vertexUv2s&&f.enable(13),D.vertexUv3s&&f.enable(14),D.vertexTangents&&f.enable(15),D.anisotropy&&f.enable(16),D.alphaHash&&f.enable(17),D.batching&&f.enable(18),D.dispersion&&f.enable(19),D.retroreflection&&f.enable(24),D.batchingColor&&f.enable(20),D.gradientMap&&f.enable(21),D.packedNormalMap&&f.enable(22),D.vertexNormals&&f.enable(23),T.push(f.mask),f.disableAll(),D.fog&&f.enable(0),D.useFog&&f.enable(1),D.flatShading&&f.enable(2),D.logarithmicDepthBuffer&&f.enable(3),D.reversedDepthBuffer&&f.enable(4),D.skinning&&f.enable(5),D.morphTargets&&f.enable(6),D.morphNormals&&f.enable(7),D.morphColors&&f.enable(8),D.premultipliedAlpha&&f.enable(9),D.shadowMapEnabled&&f.enable(10),D.doubleSided&&f.enable(11),D.flipSided&&f.enable(12),D.useDepthPacking&&f.enable(13),D.dithering&&f.enable(14),D.transmission&&f.enable(15),D.sheen&&f.enable(16),D.opaque&&f.enable(17),D.pointsUvs&&f.enable(18),D.decodeVideoTexture&&f.enable(19),D.decodeVideoTextureEmissive&&f.enable(20),D.alphaToCoverage&&f.enable(21),D.numLightProbeGrids>0&&f.enable(22),D.hasPositionAttribute&&f.enable(23),T.push(f.mask)}function I(T){const D=x[T.type];let F;if(D){const H=Ki[D];F=Gy.clone(H.uniforms)}else F=T.uniforms;return F}function C(T,D){let F=_.get(D);return F!==void 0?++F.usedTimes:(F=new MA(r,D,T,l),d.push(F),_.set(D,F)),F}function L(T){if(--T.usedTimes===0){const D=d.indexOf(T);d[D]=d[d.length-1],d.pop(),_.delete(T.cacheKey),T.destroy()}}function U(T){p.remove(T)}function O(){p.dispose()}return{getParameters:R,getProgramCacheKey:y,getUniforms:I,acquireProgram:C,releaseProgram:L,releaseShaderCache:U,programs:d,dispose:O}}function RA(){let r=new WeakMap;function t(f){return r.has(f)}function i(f){let p=r.get(f);return p===void 0&&(p={},r.set(f,p)),p}function s(f){r.delete(f)}function l(f,p,m){r.get(f)[p]=m}function c(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function CA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function tv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function ev(){const r=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function f(g){let x=0;return g.isInstancedMesh&&(x+=2),g.isSkinnedMesh&&(x+=1),x}function p(g,x,E,R,y,S){let P=r[t];return P===void 0?(P={id:g.id,object:g,geometry:x,material:E,materialVariant:f(g),groupOrder:R,renderOrder:g.renderOrder,z:y,group:S},r[t]=P):(P.id=g.id,P.object=g,P.geometry=x,P.material=E,P.materialVariant=f(g),P.groupOrder=R,P.renderOrder=g.renderOrder,P.z=y,P.group=S),t++,P}function m(g,x,E,R,y,S,P){P.reversedDepth===!0&&(y=-y);const I=p(g,x,E,R,y,S);E.transmission>0?s.push(I):E.transparent===!0?l.push(I):i.push(I)}function d(g,x,E,R,y,S){const P=p(g,x,E,R,y,S);E.transmission>0?s.unshift(P):E.transparent===!0?l.unshift(P):i.unshift(P)}function _(g,x){i.length>1&&i.sort(g||CA),s.length>1&&s.sort(x||tv),l.length>1&&l.sort(x||tv)}function v(){for(let g=t,x=r.length;g<x;g++){const E=r[g];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:d,finish:v,sort:_}}function wA(){let r=new WeakMap;function t(s,l){const c=r.get(s);let f;return c===void 0?(f=new ev,r.set(s,[f])):l>=c.length?(f=new ev,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:t,dispose:i}}function DA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={direction:new tt,color:new Kt};break;case"SpotLight":i={position:new tt,direction:new tt,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new tt,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":i={direction:new tt,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":i={color:new Kt,position:new tt,halfWidth:new tt,halfHeight:new tt};break}return r[t.id]=i,i}}}function UA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let LA=0;function NA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function OA(r){const t=new DA,i=UA(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new tt);const l=new tt,c=new tn,f=new tn;function p(d){let _=0,v=0,g=0;for(let W=0;W<9;W++)s.probe[W].set(0,0,0);let x=0,E=0,R=0,y=0,S=0,P=0,I=0,C=0,L=0,U=0,O=0,T=0,D=0,F=0;d.sort(NA);for(let W=0,j=d.length;W<j;W++){const q=d[W],Q=q.color,B=q.intensity,V=q.distance;let ot=null;if(q.shadow&&q.shadow.map&&(q.shadow.map.texture.format===ks?ot=q.shadow.map.texture:ot=q.shadow.map.depthTexture||q.shadow.map.texture),q.isAmbientLight)_+=Q.r*B,v+=Q.g*B,g+=Q.b*B;else if(q.isLightProbe){for(let et=0;et<9;et++)s.probe[et].addScaledVector(q.sh.coefficients[et],B);F++}else if(q.isSunLight){const et=t.get(q);if(et.color.copy(q.color).multiplyScalar(q.intensity),q.castShadow){const ut=q.shadow,N=i.get(q);N.shadowIntensity=ut.intensity,N.shadowBias=ut.bias,N.shadowNormalBias=ut.normalBias,N.shadowRadius=ut.radius,N.shadowMapSize.copy(ut.mapSize).multiply(ut.getFrameExtents()),s.sunShadow[E]=N,s.sunShadowMap[E]=ot;const $=ut.getViewportCount();for(let ht=0;ht<$;ht++)s.sunShadowMatrix[R+ht]=ut.getMatrix(ht),s.sunShadowCascade[R+ht]=ut._cascadeData[ht];R+=$,E++}s.sun[x]=et,x++}else if(q.isDirectionalLight){const et=t.get(q);if(et.color.copy(q.color).multiplyScalar(q.intensity),q.castShadow){const ut=q.shadow,N=i.get(q);N.shadowIntensity=ut.intensity,N.shadowBias=ut.bias,N.shadowNormalBias=ut.normalBias,N.shadowRadius=ut.radius,N.shadowMapSize=ut.mapSize,s.directionalShadow[y]=N,s.directionalShadowMap[y]=ot,s.directionalShadowMatrix[y]=q.shadow.matrix,L++}s.directional[y]=et,y++}else if(q.isSpotLight){const et=t.get(q);et.position.setFromMatrixPosition(q.matrixWorld),et.color.copy(Q).multiplyScalar(B),et.distance=V,et.coneCos=Math.cos(q.angle),et.penumbraCos=Math.cos(q.angle*(1-q.penumbra)),et.decay=q.decay,s.spot[P]=et;const ut=q.shadow;if(q.map&&(s.spotLightMap[T]=q.map,T++,ut.updateMatrices(q),q.castShadow&&D++),s.spotLightMatrix[P]=ut.matrix,q.castShadow){const N=i.get(q);N.shadowIntensity=ut.intensity,N.shadowBias=ut.bias,N.shadowNormalBias=ut.normalBias,N.shadowRadius=ut.radius,N.shadowMapSize=ut.mapSize,s.spotShadow[P]=N,s.spotShadowMap[P]=ot,O++}P++}else if(q.isRectAreaLight){const et=t.get(q);et.color.copy(Q).multiplyScalar(B),et.halfWidth.set(q.width*.5,0,0),et.halfHeight.set(0,q.height*.5,0),s.rectArea[I]=et,I++}else if(q.isPointLight){const et=t.get(q);if(et.color.copy(q.color).multiplyScalar(q.intensity),et.distance=q.distance,et.decay=q.decay,q.castShadow){const ut=q.shadow,N=i.get(q);N.shadowIntensity=ut.intensity,N.shadowBias=ut.bias,N.shadowNormalBias=ut.normalBias,N.shadowRadius=ut.radius,N.shadowMapSize=ut.mapSize,N.shadowCameraNear=ut.camera.near,N.shadowCameraFar=ut.camera.far,s.pointShadow[S]=N,s.pointShadowMap[S]=ot,s.pointShadowMatrix[S]=q.shadow.matrix,U++}s.point[S]=et,S++}else if(q.isHemisphereLight){const et=t.get(q);et.skyColor.copy(q.color).multiplyScalar(B),et.groundColor.copy(q.groundColor).multiplyScalar(B),s.hemi[C]=et,C++}}I>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=zt.LTC_FLOAT_1,s.rectAreaLTC2=zt.LTC_FLOAT_2):(s.rectAreaLTC1=zt.LTC_HALF_1,s.rectAreaLTC2=zt.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=v,s.ambient[2]=g;const H=s.hash;(H.sunLength!==x||H.directionalLength!==y||H.pointLength!==S||H.spotLength!==P||H.rectAreaLength!==I||H.hemiLength!==C||H.numSunShadows!==E||H.numDirectionalShadows!==L||H.numPointShadows!==U||H.numSpotShadows!==O||H.numSpotMaps!==T||H.numLightProbes!==F)&&(s.sun.length=x,s.directional.length=y,s.spot.length=P,s.rectArea.length=I,s.point.length=S,s.hemi.length=C,s.sunShadow.length=E,s.sunShadowMap.length=E,s.sunShadowMatrix.length=R,s.sunShadowCascade.length=R,s.directionalShadow.length=L,s.directionalShadowMap.length=L,s.directionalShadowMatrix.length=L,s.pointShadow.length=U,s.pointShadowMap.length=U,s.pointShadowMatrix.length=U,s.spotShadow.length=O,s.spotShadowMap.length=O,s.spotLightMatrix.length=O+T-D,s.spotLightMap.length=T,s.numSpotLightShadowsWithMaps=D,s.numLightProbes=F,H.sunLength=x,H.directionalLength=y,H.pointLength=S,H.spotLength=P,H.rectAreaLength=I,H.hemiLength=C,H.numSunShadows=E,H.numDirectionalShadows=L,H.numPointShadows=U,H.numSpotShadows=O,H.numSpotMaps=T,H.numLightProbes=F,s.version=LA++)}function m(d,_){let v=0,g=0,x=0,E=0,R=0,y=0;const S=_.matrixWorldInverse;for(let P=0,I=d.length;P<I;P++){const C=d[P];if(C.isSunLight){const L=s.sun[v];L.direction.setFromMatrixPosition(C.matrixWorld),L.direction.transformDirection(S),v++}else if(C.isDirectionalLight){const L=s.directional[g];L.direction.setFromMatrixPosition(C.matrixWorld),l.setFromMatrixPosition(C.target.matrixWorld),L.direction.sub(l),L.direction.transformDirection(S),g++}else if(C.isSpotLight){const L=s.spot[E];L.position.setFromMatrixPosition(C.matrixWorld),L.position.applyMatrix4(S),L.direction.setFromMatrixPosition(C.matrixWorld),l.setFromMatrixPosition(C.target.matrixWorld),L.direction.sub(l),L.direction.transformDirection(S),E++}else if(C.isRectAreaLight){const L=s.rectArea[R];L.position.setFromMatrixPosition(C.matrixWorld),L.position.applyMatrix4(S),f.identity(),c.copy(C.matrixWorld),c.premultiply(S),f.extractRotation(c),L.halfWidth.set(C.width*.5,0,0),L.halfHeight.set(0,C.height*.5,0),L.halfWidth.applyMatrix4(f),L.halfHeight.applyMatrix4(f),R++}else if(C.isPointLight){const L=s.point[x];L.position.setFromMatrixPosition(C.matrixWorld),L.position.applyMatrix4(S),x++}else if(C.isHemisphereLight){const L=s.hemi[y];L.direction.setFromMatrixPosition(C.matrixWorld),L.direction.transformDirection(S),y++}}}return{setup:p,setupView:m,state:s}}function nv(r){const t=new OA(r),i=[],s=[],l=[];function c(g){v.camera=g,i.length=0,s.length=0,l.length=0}function f(g){i.push(g)}function p(g){s.push(g)}function m(g){l.push(g)}function d(){t.setup(i)}function _(g){t.setupView(i,g)}const v={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:v,setupLights:d,setupLightsView:_,pushLight:f,pushShadow:p,pushLightProbeGrid:m}}function PA(r){let t=new WeakMap;function i(l,c=0){const f=t.get(l);let p;return f===void 0?(p=new nv(r),t.set(l,[p])):c>=f.length?(p=new nv(r),f.push(p)):p=f[c],p}function s(){t=new WeakMap}return{get:i,dispose:s}}const zA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,IA=`uniform sampler2D shadow_pass;
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
}`,BA=[new tt(1,0,0),new tt(-1,0,0),new tt(0,1,0),new tt(0,-1,0),new tt(0,0,1),new tt(0,0,-1)],FA=[new tt(0,-1,0),new tt(0,-1,0),new tt(0,0,1),new tt(0,0,-1),new tt(0,-1,0),new tt(0,-1,0)],iv=new tn,Yo=new tt,id=new tt;function HA(r,t,i){let s=new lp;const l=new ae,c=new ae,f=new en,p=new Yy,m=new qy,d={},_=i.maxTextureSize,v={[Hs]:Yn,[Yn]:Hs,[Qi]:Qi},g=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:zA,fragmentShader:IA}),x=g.clone();x.defines.HORIZONTAL_PASS=1;const E=new ni;E.setAttribute("position",new Hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new Hn(E,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jo;let S=this.type;this.render=function(U,O,T){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||U.length===0)return;this.type===_M&&(ie("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=jo);const D=r.getRenderTarget(),F=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),W=r.state;W.setBlending(wa),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const j=S!==this.type;j&&O.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(Q=>Q.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,Q=U.length;q<Q;q++){const B=U[q],V=B.shadow;if(V===void 0){ie("WebGLShadowMap:",B,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;l.copy(V.mapSize);const ot=V.getFrameExtents();l.multiply(ot),c.copy(V.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/ot.x),l.x=c.x*ot.x,V.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/ot.y),l.y=c.y*ot.y,V.mapSize.y=c.y));const et=r.state.buffers.depth.getReversed();if(V.camera._reversedDepth=et,V.map===null||j===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Zo){if(B.isPointLight){ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Fi(l.x,l.y,{format:ks,type:ea,minFilter:Pn,magFilter:Pn,generateMipmaps:!1}),V.map.texture.name=B.name+".shadowMap",V.map.depthTexture=new ol(l.x,l.y,Ji),V.map.depthTexture.name=B.name+".shadowMapDepth",V.map.depthTexture.format=Ua,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Rn,V.map.depthTexture.magFilter=Rn}else B.isPointLight?(V.map=new Wv(l.x),V.map.depthTexture=new Fy(l.x,ta)):(V.map=new Fi(l.x,l.y),V.map.depthTexture=new ol(l.x,l.y,ta)),V.map.depthTexture.name=B.name+".shadowMap",V.map.depthTexture.format=Ua,this.type===jo?(V.map.depthTexture.compareFunction=et?ip:np,V.map.depthTexture.minFilter=Pn,V.map.depthTexture.magFilter=Pn):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Rn,V.map.depthTexture.magFilter=Rn);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==l.x||V.map.height!==l.y)&&V.map.setSize(l.x,l.y);const ut=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();B.isPointLight!==!0&&V.updateMatrices(B,T);for(let N=0;N<ut;N++){const $=V.getCamera(N);if(B.isPointLight){const ht=V.camera,Et=V.matrix,Ct=B.distance||ht.far;Ct!==ht.far&&(ht.far=Ct,ht.updateProjectionMatrix()),Yo.setFromMatrixPosition(B.matrixWorld),ht.position.copy(Yo),id.copy(ht.position),id.add(BA[N]),ht.up.copy(FA[N]),ht.lookAt(id),ht.updateMatrixWorld(),Et.makeTranslation(-Yo.x,-Yo.y,-Yo.z),iv.multiplyMatrices(ht.projectionMatrix,ht.matrixWorldInverse),V._frustum.setFromProjectionMatrix(iv,ht.coordinateSystem,ht.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)r.setRenderTarget(V.map,N),r.clear();else{N===0&&(r.setRenderTarget(V.map),r.clear());const ht=V.getViewport(N);f.set(c.x*ht.x,c.y*ht.y,c.x*ht.z,c.y*ht.w),W.viewport(f)}s=V.getFrustum(N),C(O,T,$,B,this.type)}V.isPointLightShadow!==!0&&this.type===Zo&&P(V,T),V.needsUpdate=!1}S=this.type,y.needsUpdate=!1,r.setRenderTarget(D,F,H)};function P(U,O){const T=t.update(R);g.defines.VSM_SAMPLES!==U.blurSamples&&(g.defines.VSM_SAMPLES=U.blurSamples,x.defines.VSM_SAMPLES=U.blurSamples,g.needsUpdate=!0,x.needsUpdate=!0),U.mapPass===null?U.mapPass=new Fi(l.x,l.y,{format:ks,type:ea}):(U.mapPass.width!==U.map.width||U.mapPass.height!==U.map.height)&&U.mapPass.setSize(U.map.width,U.map.height),g.uniforms.shadow_pass.value=U.map.depthTexture,g.uniforms.resolution.value.set(U.map.width,U.map.height),g.uniforms.radius.value=U.radius,r.setRenderTarget(U.mapPass),r.clear(),r.renderBufferDirect(O,null,T,g,R,null),x.uniforms.shadow_pass.value=U.mapPass.texture,x.uniforms.resolution.value.set(U.map.width,U.map.height),x.uniforms.radius.value=U.radius,r.setRenderTarget(U.map),r.clear(),r.renderBufferDirect(O,null,T,x,R,null)}function I(U,O,T,D){let F=null;const H=T.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(H!==void 0)F=H;else if(F=T.isPointLight===!0?m:p,r.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0||O.alphaToCoverage===!0){const W=F.uuid,j=O.uuid;let q=d[W];q===void 0&&(q={},d[W]=q);let Q=q[j];Q===void 0&&(Q=F.clone(),q[j]=Q,O.addEventListener("dispose",L)),F=Q}if(F.visible=O.visible,F.wireframe=O.wireframe,D===Zo?F.side=O.shadowSide!==null?O.shadowSide:O.side:F.side=O.shadowSide!==null?O.shadowSide:v[O.side],F.alphaMap=O.alphaMap,F.alphaTest=O.alphaToCoverage===!0?.5:O.alphaTest,F.map=O.map,F.clipShadows=O.clipShadows,F.clippingPlanes=O.clippingPlanes,F.clipIntersection=O.clipIntersection,F.displacementMap=O.displacementMap,F.displacementScale=O.displacementScale,F.displacementBias=O.displacementBias,F.wireframeLinewidth=O.wireframeLinewidth,F.linewidth=O.linewidth,T.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const W=r.properties.get(F);W.light=T}return F}function C(U,O,T,D,F){if(U.visible===!1)return;if(U.layers.test(O.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&F===Zo)&&(!U.frustumCulled||U.intersectsFrustum(s))){U.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,U.matrixWorld);const j=t.update(U),q=U.material;if(Array.isArray(q)){const Q=j.groups;for(let B=0,V=Q.length;B<V;B++){const ot=Q[B],et=q[ot.materialIndex];if(et&&et.visible){const ut=I(U,et,D,F);U.onBeforeShadow(r,U,O,T,j,ut,ot),r.renderBufferDirect(T,null,j,ut,U,ot),U.onAfterShadow(r,U,O,T,j,ut,ot)}}}else if(q.visible){const Q=I(U,q,D,F);U.onBeforeShadow(r,U,O,T,j,Q,null),r.renderBufferDirect(T,null,j,Q,U,null),U.onAfterShadow(r,U,O,T,j,Q,null)}}const W=U.children;for(let j=0,q=W.length;j<q;j++)C(W[j],O,T,D,F)}function L(U){U.target.removeEventListener("dispose",L);for(const T in d){const D=d[T],F=U.target.uuid;F in D&&(D[F].dispose(),delete D[F])}}}function GA(r,t){function i(){let Y=!1;const Rt=new en;let St=null;const wt=new en(0,0,0,0);return{setMask:function(Bt){St!==Bt&&!Y&&(r.colorMask(Bt,Bt,Bt,Bt),St=Bt)},setLocked:function(Bt){Y=Bt},setClear:function(Bt,yt,Zt,Xt,Fe){Fe===!0&&(Bt*=Xt,yt*=Xt,Zt*=Xt),Rt.set(Bt,yt,Zt,Xt),wt.equals(Rt)===!1&&(r.clearColor(Bt,yt,Zt,Xt),wt.copy(Rt))},reset:function(){Y=!1,St=null,wt.set(-1,0,0,0)}}}function s(){let Y=!1,Rt=!1,St=null,wt=null,Bt=null;return{setReversed:function(yt){if(Rt!==yt){const Zt=t.get("EXT_clip_control");yt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT),Rt=yt;const Xt=Bt;Bt=null,this.setClear(Xt)}},getReversed:function(){return Rt},setTest:function(yt){yt?pt(r.DEPTH_TEST):bt(r.DEPTH_TEST)},setMask:function(yt){St!==yt&&!Y&&(r.depthMask(yt),St=yt)},setFunc:function(yt){if(Rt&&(yt=jM[yt]),wt!==yt){switch(yt){case sd:r.depthFunc(r.NEVER);break;case rd:r.depthFunc(r.ALWAYS);break;case od:r.depthFunc(r.LESS);break;case nl:r.depthFunc(r.LEQUAL);break;case ld:r.depthFunc(r.EQUAL);break;case cd:r.depthFunc(r.GEQUAL);break;case ud:r.depthFunc(r.GREATER);break;case fd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}wt=yt}},setLocked:function(yt){Y=yt},setClear:function(yt){Bt!==yt&&(Bt=yt,Rt&&(yt=1-yt),r.clearDepth(yt))},reset:function(){Y=!1,St=null,wt=null,Bt=null,Rt=!1}}}function l(){let Y=!1,Rt=null,St=null,wt=null,Bt=null,yt=null,Zt=null,Xt=null,Fe=null;return{setTest:function(Te){Y||(Te?pt(r.STENCIL_TEST):bt(r.STENCIL_TEST))},setMask:function(Te){Rt!==Te&&!Y&&(r.stencilMask(Te),Rt=Te)},setFunc:function(Te,qn,ii){(St!==Te||wt!==qn||Bt!==ii)&&(r.stencilFunc(Te,qn,ii),St=Te,wt=qn,Bt=ii)},setOp:function(Te,qn,ii){(yt!==Te||Zt!==qn||Xt!==ii)&&(r.stencilOp(Te,qn,ii),yt=Te,Zt=qn,Xt=ii)},setLocked:function(Te){Y=Te},setClear:function(Te){Fe!==Te&&(r.clearStencil(Te),Fe=Te)},reset:function(){Y=!1,Rt=null,St=null,wt=null,Bt=null,yt=null,Zt=null,Xt=null,Fe=null}}}const c=new i,f=new s,p=new l,m=new WeakMap,d=new WeakMap;let _={},v={},g={},x=new WeakMap,E=[],R=null,y=!1,S=null,P=null,I=null,C=null,L=null,U=null,O=null,T=new Kt(0,0,0),D=0,F=!1,H=null,W=null,j=null,q=null,Q=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,ot=0;const et=r.getParameter(r.VERSION);et.indexOf("WebGL")!==-1?(ot=parseFloat(/^WebGL (\d)/.exec(et)[1]),V=ot>=1):et.indexOf("OpenGL ES")!==-1&&(ot=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),V=ot>=2);let ut=null,N={};const $=r.getParameter(r.SCISSOR_BOX),ht=r.getParameter(r.VIEWPORT),Et=new en().fromArray($),Ct=new en().fromArray(ht);function It(Y,Rt,St,wt){const Bt=new Uint8Array(4),yt=r.createTexture();r.bindTexture(Y,yt),r.texParameteri(Y,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Y,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Zt=0;Zt<St;Zt++)Y===r.TEXTURE_3D||Y===r.TEXTURE_2D_ARRAY?r.texImage3D(Rt,0,r.RGBA,1,1,wt,0,r.RGBA,r.UNSIGNED_BYTE,Bt):r.texImage2D(Rt+Zt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Bt);return yt}const at={};at[r.TEXTURE_2D]=It(r.TEXTURE_2D,r.TEXTURE_2D,1),at[r.TEXTURE_CUBE_MAP]=It(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[r.TEXTURE_2D_ARRAY]=It(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),at[r.TEXTURE_3D]=It(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),p.setClear(0),pt(r.DEPTH_TEST),f.setFunc(nl),ge(!1),Xe(s_),pt(r.CULL_FACE),xe(wa);function pt(Y){_[Y]!==!0&&(r.enable(Y),_[Y]=!0)}function bt(Y){_[Y]!==!1&&(r.disable(Y),_[Y]=!1)}function jt(Y,Rt){return g[Y]!==Rt?(r.bindFramebuffer(Y,Rt),g[Y]=Rt,Y===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Rt),Y===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Rt),!0):!1}function Ot(Y,Rt){let St=E,wt=!1;if(Y){St=x.get(Rt),St===void 0&&(St=[],x.set(Rt,St));const Bt=Y.textures;if(St.length!==Bt.length||St[0]!==r.COLOR_ATTACHMENT0){for(let yt=0,Zt=Bt.length;yt<Zt;yt++)St[yt]=r.COLOR_ATTACHMENT0+yt;St.length=Bt.length,wt=!0}}else St[0]!==r.BACK&&(St[0]=r.BACK,wt=!0);wt&&r.drawBuffers(St)}function se(Y){return R!==Y?(r.useProgram(Y),R=Y,!0):!1}const Ze={[zr]:r.FUNC_ADD,[SM]:r.FUNC_SUBTRACT,[xM]:r.FUNC_REVERSE_SUBTRACT};Ze[MM]=r.MIN,Ze[yM]=r.MAX;const re={[EM]:r.ZERO,[bM]:r.ONE,[TM]:r.SRC_COLOR,[pv]:r.SRC_ALPHA,[UM]:r.SRC_ALPHA_SATURATE,[wM]:r.DST_COLOR,[RM]:r.DST_ALPHA,[AM]:r.ONE_MINUS_SRC_COLOR,[mv]:r.ONE_MINUS_SRC_ALPHA,[DM]:r.ONE_MINUS_DST_COLOR,[CM]:r.ONE_MINUS_DST_ALPHA,[LM]:r.CONSTANT_COLOR,[NM]:r.ONE_MINUS_CONSTANT_COLOR,[OM]:r.CONSTANT_ALPHA,[PM]:r.ONE_MINUS_CONSTANT_ALPHA};function xe(Y,Rt,St,wt,Bt,yt,Zt,Xt,Fe,Te){if(Y===wa){y===!0&&(bt(r.BLEND),y=!1);return}if(y===!1&&(pt(r.BLEND),y=!0),Y!==vM){if(Y!==S||Te!==F){if((P!==zr||L!==zr)&&(r.blendEquation(r.FUNC_ADD),P=zr,L=zr),Te)switch(Y){case $o:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case r_:r.blendFunc(r.ONE,r.ONE);break;case o_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case l_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:we("WebGLState: Invalid blending: ",Y);break}else switch(Y){case $o:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case r_:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case o_:we("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case l_:we("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:we("WebGLState: Invalid blending: ",Y);break}I=null,C=null,U=null,O=null,T.set(0,0,0),D=0,S=Y,F=Te}return}Bt=Bt||Rt,yt=yt||St,Zt=Zt||wt,(Rt!==P||Bt!==L)&&(r.blendEquationSeparate(Ze[Rt],Ze[Bt]),P=Rt,L=Bt),(St!==I||wt!==C||yt!==U||Zt!==O)&&(r.blendFuncSeparate(re[St],re[wt],re[yt],re[Zt]),I=St,C=wt,U=yt,O=Zt),(Xt.equals(T)===!1||Fe!==D)&&(r.blendColor(Xt.r,Xt.g,Xt.b,Fe),T.copy(Xt),D=Fe),S=Y,F=!1}function Ne(Y,Rt){Y.side===Qi?bt(r.CULL_FACE):pt(r.CULL_FACE);let St=Y.side===Yn;Rt&&(St=!St),ge(St),Y.blending===$o&&Y.transparent===!1?xe(wa):xe(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),f.setFunc(Y.depthFunc),f.setTest(Y.depthTest),f.setMask(Y.depthWrite),c.setMask(Y.colorWrite);const wt=Y.stencilWrite;p.setTest(wt),wt&&(p.setMask(Y.stencilWriteMask),p.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),p.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),bn(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?pt(r.SAMPLE_ALPHA_TO_COVERAGE):bt(r.SAMPLE_ALPHA_TO_COVERAGE)}function ge(Y){H!==Y&&(Y?r.frontFace(r.CW):r.frontFace(r.CCW),H=Y)}function Xe(Y){Y!==mM?(pt(r.CULL_FACE),Y!==W&&(Y===s_?r.cullFace(r.BACK):Y===gM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):bt(r.CULL_FACE),W=Y}function nn(Y){Y!==j&&(V&&r.lineWidth(Y),j=Y)}function bn(Y,Rt,St){Y?(pt(r.POLYGON_OFFSET_FILL),(q!==Rt||Q!==St)&&(q=Rt,Q=St,f.getReversed()&&(Rt=-Rt),r.polygonOffset(Rt,St))):bt(r.POLYGON_OFFSET_FILL)}function We(Y){Y?pt(r.SCISSOR_TEST):bt(r.SCISSOR_TEST)}function an(Y){Y===void 0&&(Y=r.TEXTURE0+B-1),ut!==Y&&(r.activeTexture(Y),ut=Y)}function Z(Y,Rt,St){St===void 0&&(ut===null?St=r.TEXTURE0+B-1:St=ut);let wt=N[St];wt===void 0&&(wt={type:void 0,texture:void 0},N[St]=wt),(wt.type!==Y||wt.texture!==Rt)&&(ut!==St&&(r.activeTexture(St),ut=St),r.bindTexture(Y,Rt||at[Y]),wt.type=Y,wt.texture=Rt)}function Oe(){const Y=N[ut];Y!==void 0&&Y.type!==void 0&&(r.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function De(){try{r.compressedTexImage2D(...arguments)}catch(Y){we("WebGLState:",Y)}}function z(){try{r.compressedTexImage3D(...arguments)}catch(Y){we("WebGLState:",Y)}}function b(){try{r.texSubImage2D(...arguments)}catch(Y){we("WebGLState:",Y)}}function J(){try{r.texSubImage3D(...arguments)}catch(Y){we("WebGLState:",Y)}}function lt(){try{r.compressedTexSubImage2D(...arguments)}catch(Y){we("WebGLState:",Y)}}function mt(){try{r.compressedTexSubImage3D(...arguments)}catch(Y){we("WebGLState:",Y)}}function Tt(){try{r.texStorage2D(...arguments)}catch(Y){we("WebGLState:",Y)}}function Dt(){try{r.texStorage3D(...arguments)}catch(Y){we("WebGLState:",Y)}}function gt(){try{r.texImage2D(...arguments)}catch(Y){we("WebGLState:",Y)}}function _t(){try{r.texImage3D(...arguments)}catch(Y){we("WebGLState:",Y)}}function At(Y){return v[Y]!==void 0?v[Y]:r.getParameter(Y)}function Gt(Y,Rt){v[Y]!==Rt&&(r.pixelStorei(Y,Rt),v[Y]=Rt)}function Nt(Y){Et.equals(Y)===!1&&(r.scissor(Y.x,Y.y,Y.z,Y.w),Et.copy(Y))}function Ut(Y){Ct.equals(Y)===!1&&(r.viewport(Y.x,Y.y,Y.z,Y.w),Ct.copy(Y))}function Qt(Y,Rt){let St=d.get(Rt);St===void 0&&(St=new WeakMap,d.set(Rt,St));let wt=St.get(Y);wt===void 0&&(wt=r.getUniformBlockIndex(Rt,Y.name),St.set(Y,wt))}function Jt(Y,Rt){const wt=d.get(Rt).get(Y);m.get(Rt)!==wt&&(r.uniformBlockBinding(Rt,wt,Y.__bindingPointIndex),m.set(Rt,wt))}function ne(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),_={},v={},ut=null,N={},g={},x=new WeakMap,E=[],R=null,y=!1,S=null,P=null,I=null,C=null,L=null,U=null,O=null,T=new Kt(0,0,0),D=0,F=!1,H=null,W=null,j=null,q=null,Q=null,Et.set(0,0,r.canvas.width,r.canvas.height),Ct.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),p.reset()}return{buffers:{color:c,depth:f,stencil:p},enable:pt,disable:bt,bindFramebuffer:jt,drawBuffers:Ot,useProgram:se,setBlending:xe,setMaterial:Ne,setFlipSided:ge,setCullFace:Xe,setLineWidth:nn,setPolygonOffset:bn,setScissorTest:We,activeTexture:an,bindTexture:Z,unbindTexture:Oe,compressedTexImage2D:De,compressedTexImage3D:z,texImage2D:gt,texImage3D:_t,pixelStorei:Gt,getParameter:At,updateUBOMapping:Qt,uniformBlockBinding:Jt,texStorage2D:Tt,texStorage3D:Dt,texSubImage2D:b,texSubImage3D:J,compressedTexSubImage2D:lt,compressedTexSubImage3D:mt,scissor:Nt,viewport:Ut,reset:ne}}function VA(r,t,i,s,l,c,f){const p=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new ae,_=new WeakMap,v=new Set;let g;const x=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function R(z,b){return E?new OffscreenCanvas(z,b):lu("canvas")}function y(z,b,J){let lt=1;const mt=De(z);if((mt.width>J||mt.height>J)&&(lt=J/Math.max(mt.width,mt.height)),lt<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const Tt=Math.floor(lt*mt.width),Dt=Math.floor(lt*mt.height);g===void 0&&(g=R(Tt,Dt));const gt=b?R(Tt,Dt):g;return gt.width=Tt,gt.height=Dt,gt.getContext("2d").drawImage(z,0,0,Tt,Dt),ie("WebGLRenderer: Texture has been resized from ("+mt.width+"x"+mt.height+") to ("+Tt+"x"+Dt+")."),gt}else return"data"in z&&ie("WebGLRenderer: Image in DataTexture is too big ("+mt.width+"x"+mt.height+")."),z;return z}function S(z){return z.generateMipmaps}function P(z){r.generateMipmap(z)}function I(z){return z.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?r.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function C(z,b,J,lt,mt,Tt=!1){if(z!==null){if(r[z]!==void 0)return r[z];ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let Dt;lt&&(Dt=t.get("EXT_texture_norm16"),Dt||ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let gt=b;if(b===r.RED&&(J===r.FLOAT&&(gt=r.R32F),J===r.HALF_FLOAT&&(gt=r.R16F),J===r.UNSIGNED_BYTE&&(gt=r.R8),J===r.UNSIGNED_SHORT&&Dt&&(gt=Dt.R16_EXT),J===r.SHORT&&Dt&&(gt=Dt.R16_SNORM_EXT)),b===r.RED_INTEGER&&(J===r.UNSIGNED_BYTE&&(gt=r.R8UI),J===r.UNSIGNED_SHORT&&(gt=r.R16UI),J===r.UNSIGNED_INT&&(gt=r.R32UI),J===r.BYTE&&(gt=r.R8I),J===r.SHORT&&(gt=r.R16I),J===r.INT&&(gt=r.R32I)),b===r.RG&&(J===r.FLOAT&&(gt=r.RG32F),J===r.HALF_FLOAT&&(gt=r.RG16F),J===r.UNSIGNED_BYTE&&(gt=r.RG8),J===r.UNSIGNED_SHORT&&Dt&&(gt=Dt.RG16_EXT),J===r.SHORT&&Dt&&(gt=Dt.RG16_SNORM_EXT)),b===r.RG_INTEGER&&(J===r.UNSIGNED_BYTE&&(gt=r.RG8UI),J===r.UNSIGNED_SHORT&&(gt=r.RG16UI),J===r.UNSIGNED_INT&&(gt=r.RG32UI),J===r.BYTE&&(gt=r.RG8I),J===r.SHORT&&(gt=r.RG16I),J===r.INT&&(gt=r.RG32I)),b===r.RGB_INTEGER&&(J===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),J===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),J===r.UNSIGNED_INT&&(gt=r.RGB32UI),J===r.BYTE&&(gt=r.RGB8I),J===r.SHORT&&(gt=r.RGB16I),J===r.INT&&(gt=r.RGB32I)),b===r.RGBA_INTEGER&&(J===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),J===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),J===r.UNSIGNED_INT&&(gt=r.RGBA32UI),J===r.BYTE&&(gt=r.RGBA8I),J===r.SHORT&&(gt=r.RGBA16I),J===r.INT&&(gt=r.RGBA32I)),b===r.RGB&&(J===r.UNSIGNED_SHORT&&Dt&&(gt=Dt.RGB16_EXT),J===r.SHORT&&Dt&&(gt=Dt.RGB16_SNORM_EXT),J===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),J===r.UNSIGNED_INT_10F_11F_11F_REV&&(gt=r.R11F_G11F_B10F)),b===r.RGBA){const _t=Tt?ou:be.getTransfer(mt);J===r.FLOAT&&(gt=r.RGBA32F),J===r.HALF_FLOAT&&(gt=r.RGBA16F),J===r.UNSIGNED_BYTE&&(gt=_t===Ie?r.SRGB8_ALPHA8:r.RGBA8),J===r.UNSIGNED_SHORT&&Dt&&(gt=Dt.RGBA16_EXT),J===r.SHORT&&Dt&&(gt=Dt.RGBA16_SNORM_EXT),J===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),J===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function L(z,b){let J;return z?b===null||b===ta||b===al?J=r.DEPTH24_STENCIL8:b===Ji?J=r.DEPTH32F_STENCIL8:b===il&&(J=r.DEPTH24_STENCIL8,ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===ta||b===al?J=r.DEPTH_COMPONENT24:b===Ji?J=r.DEPTH_COMPONENT32F:b===il&&(J=r.DEPTH_COMPONENT16),J}function U(z,b){return S(z)===!0||z.isFramebufferTexture&&z.minFilter!==Rn&&z.minFilter!==Pn?Math.log2(Math.max(b.width,b.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?b.mipmaps.length:1}function O(z){const b=z.target;b.removeEventListener("dispose",O),D(b),b.isVideoTexture&&_.delete(b),b.isHTMLTexture&&v.delete(b)}function T(z){const b=z.target;b.removeEventListener("dispose",T),H(b)}function D(z){const b=s.get(z);if(b.__webglInit===void 0)return;const J=z.source,lt=x.get(J);if(lt){const mt=lt[b.__cacheKey];mt.usedTimes--,mt.usedTimes===0&&F(z),Object.keys(lt).length===0&&x.delete(J)}s.remove(z)}function F(z){const b=s.get(z);r.deleteTexture(b.__webglTexture);const J=z.source,lt=x.get(J);delete lt[b.__cacheKey],f.memory.textures--}function H(z){const b=s.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),s.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(b.__webglFramebuffer[lt]))for(let mt=0;mt<b.__webglFramebuffer[lt].length;mt++)r.deleteFramebuffer(b.__webglFramebuffer[lt][mt]);else r.deleteFramebuffer(b.__webglFramebuffer[lt]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[lt])}else{if(Array.isArray(b.__webglFramebuffer))for(let lt=0;lt<b.__webglFramebuffer.length;lt++)r.deleteFramebuffer(b.__webglFramebuffer[lt]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let lt=0;lt<b.__webglColorRenderbuffer.length;lt++)b.__webglColorRenderbuffer[lt]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[lt]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const J=z.textures;for(let lt=0,mt=J.length;lt<mt;lt++){const Tt=s.get(J[lt]);Tt.__webglTexture&&(r.deleteTexture(Tt.__webglTexture),f.memory.textures--),s.remove(J[lt])}s.remove(z)}let W=0;function j(){W=0}function q(){return W}function Q(z){W=z}function B(){const z=W;return z>=l.maxTextures&&ie("WebGLTextures: Trying to use "+(z+1)+" texture units while this GPU supports only "+l.maxTextures),W+=1,z}function V(z){const b=[];return b.push(z.wrapS),b.push(z.wrapT),b.push(z.wrapR||0),b.push(z.magFilter),b.push(z.minFilter),b.push(z.anisotropy),b.push(z.internalFormat),b.push(z.format),b.push(z.type),b.push(z.generateMipmaps),b.push(z.premultiplyAlpha),b.push(z.flipY),b.push(z.unpackAlignment),b.push(z.colorSpace),b.join()}function ot(z,b){const J=s.get(z);if(z.isVideoTexture&&Z(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&J.__version!==z.version){const lt=z.image;if(lt===null)ie("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)ie("WebGLRenderer: Texture marked for update but image is incomplete");else{bt(J,z,b);return}}else z.isExternalTexture&&(J.__webglTexture=z.sourceTexture?z.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,J.__webglTexture,r.TEXTURE0+b)}function et(z,b){const J=s.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&J.__version!==z.version){bt(J,z,b);return}else z.isExternalTexture&&(J.__webglTexture=z.sourceTexture?z.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,J.__webglTexture,r.TEXTURE0+b)}function ut(z,b){const J=s.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&J.__version!==z.version){bt(J,z,b);return}i.bindTexture(r.TEXTURE_3D,J.__webglTexture,r.TEXTURE0+b)}function N(z,b){const J=s.get(z);if(z.isCubeDepthTexture!==!0&&z.version>0&&J.__version!==z.version){jt(J,z,b);return}i.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture,r.TEXTURE0+b)}const $={[Vs]:r.REPEAT,[Ra]:r.CLAMP_TO_EDGE,[hd]:r.MIRRORED_REPEAT},ht={[Rn]:r.NEAREST,[BM]:r.NEAREST_MIPMAP_NEAREST,[bc]:r.NEAREST_MIPMAP_LINEAR,[Pn]:r.LINEAR,[wh]:r.LINEAR_MIPMAP_NEAREST,[Ca]:r.LINEAR_MIPMAP_LINEAR},Et={[VM]:r.NEVER,[qM]:r.ALWAYS,[kM]:r.LESS,[np]:r.LEQUAL,[XM]:r.EQUAL,[ip]:r.GEQUAL,[WM]:r.GREATER,[YM]:r.NOTEQUAL};function Ct(z,b){if(b.type===Ji&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Pn||b.magFilter===wh||b.magFilter===bc||b.magFilter===Ca||b.minFilter===Pn||b.minFilter===wh||b.minFilter===bc||b.minFilter===Ca)&&ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(z,r.TEXTURE_WRAP_S,$[b.wrapS]),r.texParameteri(z,r.TEXTURE_WRAP_T,$[b.wrapT]),(z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY)&&r.texParameteri(z,r.TEXTURE_WRAP_R,$[b.wrapR]),r.texParameteri(z,r.TEXTURE_MAG_FILTER,ht[b.magFilter]),r.texParameteri(z,r.TEXTURE_MIN_FILTER,ht[b.minFilter]),b.compareFunction&&(r.texParameteri(z,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(z,r.TEXTURE_COMPARE_FUNC,Et[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Rn||b.minFilter!==bc&&b.minFilter!==Ca||b.type===Ji&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||s.get(b).__currentAnisotropy){const J=t.get("EXT_texture_filter_anisotropic");r.texParameterf(z,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,l.getMaxAnisotropy())),s.get(b).__currentAnisotropy=b.anisotropy}}}function It(z,b){let J=!1;z.__webglInit===void 0&&(z.__webglInit=!0,b.addEventListener("dispose",O));const lt=b.source;let mt=x.get(lt);mt===void 0&&(mt={},x.set(lt,mt));const Tt=V(b);if(Tt!==z.__cacheKey){mt[Tt]===void 0&&(mt[Tt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,J=!0),mt[Tt].usedTimes++;const Dt=mt[z.__cacheKey];Dt!==void 0&&(mt[z.__cacheKey].usedTimes--,Dt.usedTimes===0&&F(b)),z.__cacheKey=Tt,z.__webglTexture=mt[Tt].texture}return J}function at(z,b,J){return Math.floor(Math.floor(z/J)/b)}function pt(z,b,J,lt){const Tt=z.updateRanges;if(Tt.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,b.width,b.height,J,lt,b.data);else{Tt.sort((Gt,Nt)=>Gt.start-Nt.start);let Dt=0;for(let Gt=1;Gt<Tt.length;Gt++){const Nt=Tt[Dt],Ut=Tt[Gt],Qt=Nt.start+Nt.count,Jt=at(Ut.start,b.width,4),ne=at(Nt.start,b.width,4);Ut.start<=Qt+1&&Jt===ne&&at(Ut.start+Ut.count-1,b.width,4)===Jt?Nt.count=Math.max(Nt.count,Ut.start+Ut.count-Nt.start):(++Dt,Tt[Dt]=Ut)}Tt.length=Dt+1;const gt=i.getParameter(r.UNPACK_ROW_LENGTH),_t=i.getParameter(r.UNPACK_SKIP_PIXELS),At=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,b.width);for(let Gt=0,Nt=Tt.length;Gt<Nt;Gt++){const Ut=Tt[Gt],Qt=Math.floor(Ut.start/4),Jt=Math.ceil(Ut.count/4),ne=Qt%b.width,Y=Math.floor(Qt/b.width),Rt=Jt,St=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,ne),i.pixelStorei(r.UNPACK_SKIP_ROWS,Y),i.texSubImage2D(r.TEXTURE_2D,0,ne,Y,Rt,St,J,lt,b.data)}z.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,gt),i.pixelStorei(r.UNPACK_SKIP_PIXELS,_t),i.pixelStorei(r.UNPACK_SKIP_ROWS,At)}}function bt(z,b,J){let lt=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(lt=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(lt=r.TEXTURE_3D);const mt=It(z,b),Tt=b.source;i.bindTexture(lt,z.__webglTexture,r.TEXTURE0+J);const Dt=s.get(Tt);if(Tt.version!==Dt.__version||mt===!0){if(i.activeTexture(r.TEXTURE0+J),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const St=be.getPrimaries(be.workingColorSpace),wt=b.colorSpace===fs?null:be.getPrimaries(b.colorSpace),Bt=b.colorSpace===fs||St===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Bt)}i.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment);let _t=y(b.image,!1,l.maxTextureSize);_t=Oe(b,_t);const At=c.convert(b.format,b.colorSpace),Gt=c.convert(b.type);let Nt=C(b.internalFormat,At,Gt,b.normalized,b.colorSpace,b.isVideoTexture);Ct(lt,b);let Ut;const Qt=b.mipmaps,Jt=b.isVideoTexture!==!0,ne=Dt.__version===void 0||mt===!0,Y=Tt.dataReady,Rt=U(b,_t);if(b.isDepthTexture)Nt=L(b.format===Fs,b.type),ne&&(Jt?i.texStorage2D(r.TEXTURE_2D,1,Nt,_t.width,_t.height):i.texImage2D(r.TEXTURE_2D,0,Nt,_t.width,_t.height,0,At,Gt,null));else if(b.isDataTexture)if(Qt.length>0){Jt&&ne&&i.texStorage2D(r.TEXTURE_2D,Rt,Nt,Qt[0].width,Qt[0].height);for(let St=0,wt=Qt.length;St<wt;St++)Ut=Qt[St],Jt?Y&&i.texSubImage2D(r.TEXTURE_2D,St,0,0,Ut.width,Ut.height,At,Gt,Ut.data):i.texImage2D(r.TEXTURE_2D,St,Nt,Ut.width,Ut.height,0,At,Gt,Ut.data);b.generateMipmaps=!1}else Jt?(ne&&i.texStorage2D(r.TEXTURE_2D,Rt,Nt,_t.width,_t.height),Y&&pt(b,_t,At,Gt)):i.texImage2D(r.TEXTURE_2D,0,Nt,_t.width,_t.height,0,At,Gt,_t.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Jt&&ne&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Nt,Qt[0].width,Qt[0].height,_t.depth);for(let St=0,wt=Qt.length;St<wt;St++)if(Ut=Qt[St],b.format!==Bi)if(At!==null)if(Jt){if(Y)if(b.layerUpdates.size>0){const Bt=P_(Ut.width,Ut.height,b.format,b.type);for(const yt of b.layerUpdates){const Zt=Ut.data.subarray(yt*Bt/Ut.data.BYTES_PER_ELEMENT,(yt+1)*Bt/Ut.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,St,0,0,yt,Ut.width,Ut.height,1,At,Zt)}}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,St,0,0,0,Ut.width,Ut.height,_t.depth,At,Ut.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,St,Nt,Ut.width,Ut.height,_t.depth,0,Ut.data,0,0);else ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?Y&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,St,0,0,0,Ut.width,Ut.height,_t.depth,At,Gt,Ut.data):i.texImage3D(r.TEXTURE_2D_ARRAY,St,Nt,Ut.width,Ut.height,_t.depth,0,At,Gt,Ut.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{Jt&&ne&&i.texStorage2D(r.TEXTURE_2D,Rt,Nt,Qt[0].width,Qt[0].height);for(let St=0,wt=Qt.length;St<wt;St++)Ut=Qt[St],b.format!==Bi?At!==null?Jt?Y&&i.compressedTexSubImage2D(r.TEXTURE_2D,St,0,0,Ut.width,Ut.height,At,Ut.data):i.compressedTexImage2D(r.TEXTURE_2D,St,Nt,Ut.width,Ut.height,0,Ut.data):ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?Y&&i.texSubImage2D(r.TEXTURE_2D,St,0,0,Ut.width,Ut.height,At,Gt,Ut.data):i.texImage2D(r.TEXTURE_2D,St,Nt,Ut.width,Ut.height,0,At,Gt,Ut.data)}else if(b.isDataArrayTexture)if(Jt){if(ne&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Nt,_t.width,_t.height,_t.depth),Y)if(b.layerUpdates.size>0){const St=P_(_t.width,_t.height,b.format,b.type);for(const wt of b.layerUpdates){const Bt=_t.data.subarray(wt*St/_t.data.BYTES_PER_ELEMENT,(wt+1)*St/_t.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,wt,_t.width,_t.height,1,At,Gt,Bt)}b.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,_t.width,_t.height,_t.depth,At,Gt,_t.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Nt,_t.width,_t.height,_t.depth,0,At,Gt,_t.data);else if(b.isData3DTexture)Jt?(ne&&i.texStorage3D(r.TEXTURE_3D,Rt,Nt,_t.width,_t.height,_t.depth),Y&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,_t.width,_t.height,_t.depth,At,Gt,_t.data)):i.texImage3D(r.TEXTURE_3D,0,Nt,_t.width,_t.height,_t.depth,0,At,Gt,_t.data);else if(b.isFramebufferTexture){if(ne)if(Jt)i.texStorage2D(r.TEXTURE_2D,Rt,Nt,_t.width,_t.height);else{let St=_t.width,wt=_t.height;for(let Bt=0;Bt<Rt;Bt++)i.texImage2D(r.TEXTURE_2D,Bt,Nt,St,wt,0,At,Gt,null),St>>=1,wt>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in r){const St=r.canvas;if(St.hasAttribute("layoutsubtree")||St.setAttribute("layoutsubtree","true"),_t.parentNode!==St){St.appendChild(_t),v.add(b),St.onpaint=wt=>{const Bt=wt.changedElements;for(const yt of v)Bt.includes(yt.image)&&(yt.needsUpdate=!0)},St.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,_t);else{const Bt=r.RGBA,yt=r.RGBA,Zt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Bt,yt,Zt,_t)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Qt.length>0){if(Jt&&ne){const St=De(Qt[0]);i.texStorage2D(r.TEXTURE_2D,Rt,Nt,St.width,St.height)}for(let St=0,wt=Qt.length;St<wt;St++)Ut=Qt[St],Jt?Y&&i.texSubImage2D(r.TEXTURE_2D,St,0,0,At,Gt,Ut):i.texImage2D(r.TEXTURE_2D,St,Nt,At,Gt,Ut);b.generateMipmaps=!1}else if(Jt){if(ne){const St=De(_t);i.texStorage2D(r.TEXTURE_2D,Rt,Nt,St.width,St.height)}Y&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,At,Gt,_t)}else i.texImage2D(r.TEXTURE_2D,0,Nt,At,Gt,_t);S(b)&&P(lt),Dt.__version=Tt.version,b.onUpdate&&b.onUpdate(b)}z.__version=b.version}function jt(z,b,J){if(b.image.length!==6)return;const lt=It(z,b),mt=b.source;i.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+J);const Tt=s.get(mt);if(mt.version!==Tt.__version||lt===!0){i.activeTexture(r.TEXTURE0+J);const Dt=be.getPrimaries(be.workingColorSpace),gt=b.colorSpace===fs?null:be.getPrimaries(b.colorSpace),_t=b.colorSpace===fs||Dt===gt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const At=b.isCompressedTexture||b.image[0].isCompressedTexture,Gt=b.image[0]&&b.image[0].isDataTexture,Nt=[];for(let yt=0;yt<6;yt++)!At&&!Gt?Nt[yt]=y(b.image[yt],!0,l.maxCubemapSize):Nt[yt]=Gt?b.image[yt].image:b.image[yt],Nt[yt]=Oe(b,Nt[yt]);const Ut=Nt[0],Qt=c.convert(b.format,b.colorSpace),Jt=c.convert(b.type),ne=C(b.internalFormat,Qt,Jt,b.normalized,b.colorSpace),Y=b.isVideoTexture!==!0,Rt=Tt.__version===void 0||lt===!0,St=mt.dataReady;let wt=U(b,Ut);Ct(r.TEXTURE_CUBE_MAP,b);let Bt;if(At){Y&&Rt&&i.texStorage2D(r.TEXTURE_CUBE_MAP,wt,ne,Ut.width,Ut.height);for(let yt=0;yt<6;yt++){Bt=Nt[yt].mipmaps;for(let Zt=0;Zt<Bt.length;Zt++){const Xt=Bt[Zt];b.format!==Bi?Qt!==null?Y?St&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Zt,0,0,Xt.width,Xt.height,Qt,Xt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Zt,ne,Xt.width,Xt.height,0,Xt.data):ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?St&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Zt,0,0,Xt.width,Xt.height,Qt,Jt,Xt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Zt,ne,Xt.width,Xt.height,0,Qt,Jt,Xt.data)}}}else{if(Bt=b.mipmaps,Y&&Rt){Bt.length>0&&wt++;const yt=De(Nt[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,wt,ne,yt.width,yt.height)}for(let yt=0;yt<6;yt++)if(Gt){Y?St&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Nt[yt].width,Nt[yt].height,Qt,Jt,Nt[yt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,ne,Nt[yt].width,Nt[yt].height,0,Qt,Jt,Nt[yt].data);for(let Zt=0;Zt<Bt.length;Zt++){const Fe=Bt[Zt].image[yt].image;Y?St&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Zt+1,0,0,Fe.width,Fe.height,Qt,Jt,Fe.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Zt+1,ne,Fe.width,Fe.height,0,Qt,Jt,Fe.data)}}else{Y?St&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Qt,Jt,Nt[yt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,ne,Qt,Jt,Nt[yt]);for(let Zt=0;Zt<Bt.length;Zt++){const Xt=Bt[Zt];Y?St&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Zt+1,0,0,Qt,Jt,Xt.image[yt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Zt+1,ne,Qt,Jt,Xt.image[yt])}}}S(b)&&P(r.TEXTURE_CUBE_MAP),Tt.__version=mt.version,b.onUpdate&&b.onUpdate(b)}z.__version=b.version}function Ot(z,b,J,lt,mt,Tt){const Dt=c.convert(J.format,J.colorSpace),gt=c.convert(J.type),_t=C(J.internalFormat,Dt,gt,J.normalized,J.colorSpace),At=s.get(b),Gt=s.get(J);if(Gt.__renderTarget=b,!At.__hasExternalTextures){const Nt=Math.max(1,b.width>>Tt),Ut=Math.max(1,b.height>>Tt);mt===r.TEXTURE_3D||mt===r.TEXTURE_2D_ARRAY?i.texImage3D(mt,Tt,_t,Nt,Ut,b.depth,0,Dt,gt,null):i.texImage2D(mt,Tt,_t,Nt,Ut,0,Dt,gt,null)}i.bindFramebuffer(r.FRAMEBUFFER,z),an(b)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,lt,mt,Gt.__webglTexture,0,We(b)):(mt===r.TEXTURE_2D||mt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&mt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,lt,mt,Gt.__webglTexture,Tt),i.bindFramebuffer(r.FRAMEBUFFER,null)}function se(z,b,J){if(r.bindRenderbuffer(r.RENDERBUFFER,z),b.depthBuffer){const lt=b.depthTexture,mt=lt&&lt.isDepthTexture?lt.type:null,Tt=L(b.stencilBuffer,mt),Dt=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;an(b)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We(b),Tt,b.width,b.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,We(b),Tt,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,Tt,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Dt,r.RENDERBUFFER,z)}else{const lt=b.textures;for(let mt=0;mt<lt.length;mt++){const Tt=lt[mt],Dt=c.convert(Tt.format,Tt.colorSpace),gt=c.convert(Tt.type),_t=C(Tt.internalFormat,Dt,gt,Tt.normalized,Tt.colorSpace);an(b)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,We(b),_t,b.width,b.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,We(b),_t,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,_t,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ze(z,b,J){const lt=b.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,z),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const mt=s.get(b.depthTexture);if(mt.__renderTarget=b,(!mt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),lt){if(mt.__webglInit===void 0&&(mt.__webglInit=!0,b.depthTexture.addEventListener("dispose",O)),mt.__webglTexture===void 0){mt.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,mt.__webglTexture),Ct(r.TEXTURE_CUBE_MAP,b.depthTexture);const At=c.convert(b.depthTexture.format),Gt=c.convert(b.depthTexture.type);let Nt;b.depthTexture.format===Ua?Nt=r.DEPTH_COMPONENT24:b.depthTexture.format===Fs&&(Nt=r.DEPTH24_STENCIL8);for(let Ut=0;Ut<6;Ut++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ut,0,Nt,b.width,b.height,0,At,Gt,null)}}else ot(b.depthTexture,0);const Tt=mt.__webglTexture,Dt=We(b),gt=lt?r.TEXTURE_CUBE_MAP_POSITIVE_X+J:r.TEXTURE_2D,_t=b.depthTexture.format===Fs?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(b.depthTexture.format===Ua)an(b)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,_t,gt,Tt,0,Dt):r.framebufferTexture2D(r.FRAMEBUFFER,_t,gt,Tt,0);else if(b.depthTexture.format===Fs)an(b)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,_t,gt,Tt,0,Dt):r.framebufferTexture2D(r.FRAMEBUFFER,_t,gt,Tt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function re(z){const b=s.get(z),J=z.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==z.depthTexture){const lt=z.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),lt){const mt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,lt.removeEventListener("dispose",mt)};lt.addEventListener("dispose",mt),b.__depthDisposeCallback=mt}b.__boundDepthTexture=lt}if(z.depthTexture&&!b.__autoAllocateDepthBuffer)if(J)for(let lt=0;lt<6;lt++)Ze(b.__webglFramebuffer[lt],z,lt);else{const lt=z.texture.mipmaps;lt&&lt.length>0?Ze(b.__webglFramebuffer[0],z,0):Ze(b.__webglFramebuffer,z,0)}else if(J){b.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(i.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[lt]),b.__webglDepthbuffer[lt]===void 0)b.__webglDepthbuffer[lt]=r.createRenderbuffer(),se(b.__webglDepthbuffer[lt],z,!1);else{const mt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Tt=b.__webglDepthbuffer[lt];r.bindRenderbuffer(r.RENDERBUFFER,Tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,mt,r.RENDERBUFFER,Tt)}}else{const lt=z.texture.mipmaps;if(lt&&lt.length>0?i.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),se(b.__webglDepthbuffer,z,!1);else{const mt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Tt=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Tt),r.framebufferRenderbuffer(r.FRAMEBUFFER,mt,r.RENDERBUFFER,Tt)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function xe(z,b,J){const lt=s.get(z);b!==void 0&&Ot(lt.__webglFramebuffer,z,z.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),J!==void 0&&re(z)}function Ne(z){const b=z.texture,J=s.get(z),lt=s.get(b);z.addEventListener("dispose",T);const mt=z.textures,Tt=z.isWebGLCubeRenderTarget===!0,Dt=mt.length>1;if(Dt||(lt.__webglTexture===void 0&&(lt.__webglTexture=r.createTexture()),lt.__version=b.version,f.memory.textures++),Tt){J.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(b.mipmaps&&b.mipmaps.length>0){J.__webglFramebuffer[gt]=[];for(let _t=0;_t<b.mipmaps.length;_t++)J.__webglFramebuffer[gt][_t]=r.createFramebuffer()}else J.__webglFramebuffer[gt]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){J.__webglFramebuffer=[];for(let gt=0;gt<b.mipmaps.length;gt++)J.__webglFramebuffer[gt]=r.createFramebuffer()}else J.__webglFramebuffer=r.createFramebuffer();if(Dt)for(let gt=0,_t=mt.length;gt<_t;gt++){const At=s.get(mt[gt]);At.__webglTexture===void 0&&(At.__webglTexture=r.createTexture(),f.memory.textures++)}if(z.samples>0&&an(z)===!1){J.__webglMultisampledFramebuffer=r.createFramebuffer(),J.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let gt=0;gt<mt.length;gt++){const _t=mt[gt];J.__webglColorRenderbuffer[gt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,J.__webglColorRenderbuffer[gt]);const At=c.convert(_t.format,_t.colorSpace),Gt=c.convert(_t.type),Nt=C(_t.internalFormat,At,Gt,_t.normalized,_t.colorSpace,z.isXRRenderTarget===!0),Ut=We(z);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ut,Nt,z.width,z.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+gt,r.RENDERBUFFER,J.__webglColorRenderbuffer[gt])}r.bindRenderbuffer(r.RENDERBUFFER,null),z.depthBuffer&&(J.__webglDepthRenderbuffer=r.createRenderbuffer(),se(J.__webglDepthRenderbuffer,z,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Tt){i.bindTexture(r.TEXTURE_CUBE_MAP,lt.__webglTexture),Ct(r.TEXTURE_CUBE_MAP,b);for(let gt=0;gt<6;gt++)if(b.mipmaps&&b.mipmaps.length>0)for(let _t=0;_t<b.mipmaps.length;_t++)Ot(J.__webglFramebuffer[gt][_t],z,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,_t);else Ot(J.__webglFramebuffer[gt],z,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);S(b)&&P(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Dt){for(let gt=0,_t=mt.length;gt<_t;gt++){const At=mt[gt],Gt=s.get(At);let Nt=r.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Nt=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Nt,Gt.__webglTexture),Ct(Nt,At),Ot(J.__webglFramebuffer,z,At,r.COLOR_ATTACHMENT0+gt,Nt,0),S(At)&&P(Nt)}i.unbindTexture()}else{let gt=r.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(gt=z.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(gt,lt.__webglTexture),Ct(gt,b),b.mipmaps&&b.mipmaps.length>0)for(let _t=0;_t<b.mipmaps.length;_t++)Ot(J.__webglFramebuffer[_t],z,b,r.COLOR_ATTACHMENT0,gt,_t);else Ot(J.__webglFramebuffer,z,b,r.COLOR_ATTACHMENT0,gt,0);S(b)&&P(gt),i.unbindTexture()}z.depthBuffer&&re(z)}function ge(z){const b=z.textures;for(let J=0,lt=b.length;J<lt;J++){const mt=b[J];if(S(mt)){const Tt=I(z),Dt=s.get(mt).__webglTexture;i.bindTexture(Tt,Dt),P(Tt),i.unbindTexture()}}}const Xe=[],nn=[];function bn(z){if(z.samples>0){if(an(z)===!1){const b=z.textures,J=z.width,lt=z.height;let mt=r.COLOR_BUFFER_BIT;const Tt=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Dt=s.get(z),gt=b.length>1;if(gt)for(let At=0;At<b.length;At++)i.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer);const _t=z.texture.mipmaps;_t&&_t.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let At=0;At<b.length;At++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(mt|=r.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(mt|=r.STENCIL_BUFFER_BIT)),gt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Dt.__webglColorRenderbuffer[At]);const Gt=s.get(b[At]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Gt,0)}r.blitFramebuffer(0,0,J,lt,0,0,J,lt,mt,r.NEAREST),m===!0&&(Xe.length=0,nn.length=0,Xe.push(r.COLOR_ATTACHMENT0+At),z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&(Xe.push(Tt),nn.push(Tt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,nn)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Xe))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),gt)for(let At=0;At<b.length;At++){i.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.RENDERBUFFER,Dt.__webglColorRenderbuffer[At]);const Gt=s.get(b[At]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Dt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+At,r.TEXTURE_2D,Gt,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&m){const b=z.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function We(z){return Math.min(l.maxSamples,z.samples)}function an(z){const b=s.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Z(z){const b=f.render.frame;_.get(z)!==b&&(_.set(z,b),z.update())}function Oe(z,b){const J=z.colorSpace,lt=z.format,mt=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||J!==ru&&J!==fs&&(be.getTransfer(J)===Ie?(lt!==Bi||mt!==mi)&&ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):we("WebGLTextures: Unsupported texture color space:",J)),b}function De(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(d.width=z.naturalWidth||z.width,d.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(d.width=z.displayWidth,d.height=z.displayHeight):(d.width=z.width,d.height=z.height),d}this.allocateTextureUnit=B,this.resetTextureUnits=j,this.getTextureUnits=q,this.setTextureUnits=Q,this.setTexture2D=ot,this.setTexture2DArray=et,this.setTexture3D=ut,this.setTextureCube=N,this.rebindTextures=xe,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=bn,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=Ot,this.useMultisampledRTT=an,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function kA(r,t){function i(s,l=fs){let c;const f=be.getTransfer(l);if(s===mi)return r.UNSIGNED_BYTE;if(s===Jd)return r.UNSIGNED_SHORT_4_4_4_4;if(s===jd)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Tv)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===Av)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===Ev)return r.BYTE;if(s===bv)return r.SHORT;if(s===il)return r.UNSIGNED_SHORT;if(s===Qd)return r.INT;if(s===ta)return r.UNSIGNED_INT;if(s===Ji)return r.FLOAT;if(s===ea)return r.HALF_FLOAT;if(s===Rv)return r.ALPHA;if(s===Cv)return r.RGB;if(s===Bi)return r.RGBA;if(s===Ua)return r.DEPTH_COMPONENT;if(s===Fs)return r.DEPTH_STENCIL;if(s===wv)return r.RED;if(s===$d)return r.RED_INTEGER;if(s===ks)return r.RG;if(s===tp)return r.RG_INTEGER;if(s===ep)return r.RGBA_INTEGER;if(s===Qc||s===Jc||s===jc||s===$c)if(f===Ie)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Qc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Jc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===jc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===$c)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Qc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Jc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===jc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===$c)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===dd||s===pd||s===md||s===gd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===dd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===pd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===md)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===gd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===_d||s===vd||s===Sd||s===xd||s===Md||s===iu||s===yd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===_d||s===vd)return f===Ie?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Sd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===xd)return c.COMPRESSED_R11_EAC;if(s===Md)return c.COMPRESSED_SIGNED_R11_EAC;if(s===iu)return c.COMPRESSED_RG11_EAC;if(s===yd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Ed||s===bd||s===Td||s===Ad||s===Rd||s===Cd||s===wd||s===Dd||s===Ud||s===Ld||s===Nd||s===Od||s===Pd||s===zd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Ed)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===bd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Td)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ad)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Rd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Cd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===wd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Dd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ud)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ld)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Nd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Od)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Pd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===zd)return f===Ie?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Id||s===Bd||s===Fd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===Id)return f===Ie?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Bd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Fd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Hd||s===Gd||s===au||s===Vd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===Hd)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Gd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===au)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Vd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===al?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const XA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,WA=`
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

}`;class YA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const s=new Fv(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new Ci({vertexShader:XA,fragmentShader:WA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Hn(new du(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qA extends ps{constructor(t,i){super();const s=this;let l=null,c=1,f=null,p="local-floor",m=1,d=null,_=null,v=null,g=null,x=null,E=null;const R=typeof XRWebGLBinding<"u",y=new YA,S={},P=i.getContextAttributes();let I=null,C=null;const L=[],U=[],O=new ae;let T=null,D=null;const F=new Ri;F.viewport=new en;const H=new Ri;H.viewport=new en;const W=[F,H],j=new tE;let q=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(at){let pt=L[at];return pt===void 0&&(pt=new zh,L[at]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(at){let pt=L[at];return pt===void 0&&(pt=new zh,L[at]=pt),pt.getGripSpace()},this.getHand=function(at){let pt=L[at];return pt===void 0&&(pt=new zh,L[at]=pt),pt.getHandSpace()};function B(at){const pt=U.indexOf(at.inputSource);if(pt===-1)return;const bt=L[pt];bt!==void 0&&(bt.update(at.inputSource,at.frame,d||f),bt.dispatchEvent({type:at.type,data:at.inputSource}))}function V(){l.removeEventListener("select",B),l.removeEventListener("selectstart",B),l.removeEventListener("selectend",B),l.removeEventListener("squeeze",B),l.removeEventListener("squeezestart",B),l.removeEventListener("squeezeend",B),l.removeEventListener("end",V),l.removeEventListener("inputsourceschange",ot);for(let at=0;at<L.length;at++){const pt=U[at];pt!==null&&(U[at]=null,L[at].disconnect(pt))}q=null,Q=null,y.reset();for(const at in S)delete S[at];if(t.setRenderTarget(I),x=null,g=null,v=null,l=null,C=null,It.stop(),s.isPresenting=!1,t.setPixelRatio(T),t.setSize(O.width,O.height,!1),D!==null){const at=D.camera;at.fov=D.fov,at.zoom=D.zoom,at.updateProjectionMatrix(),D=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(at){c=at,s.isPresenting===!0&&ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(at){p=at,s.isPresenting===!0&&ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||f},this.setReferenceSpace=function(at){d=at},this.getBaseLayer=function(){return g!==null?g:x},this.getBinding=function(){return v===null&&R&&(v=new XRWebGLBinding(l,i)),v},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(at){if(l=at,l!==null){if(I=t.getRenderTarget(),l.addEventListener("select",B),l.addEventListener("selectstart",B),l.addEventListener("selectend",B),l.addEventListener("squeeze",B),l.addEventListener("squeezestart",B),l.addEventListener("squeezeend",B),l.addEventListener("end",V),l.addEventListener("inputsourceschange",ot),P.xrCompatible!==!0&&await i.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(O),R&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,jt=null,Ot=null;P.depth&&(Ot=P.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,bt=P.stencil?Fs:Ua,jt=P.stencil?al:ta);const se={colorFormat:i.RGBA8,depthFormat:Ot,scaleFactor:c};v=this.getBinding(),g=v.createProjectionLayer(se),l.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),C=new Fi(g.textureWidth,g.textureHeight,{format:Bi,type:mi,depthTexture:new ol(g.textureWidth,g.textureHeight,jt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:P.stencil,colorSpace:t.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}else{const bt={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:c};x=new XRWebGLLayer(l,i,bt),l.updateRenderState({baseLayer:x}),t.setPixelRatio(1),t.setSize(x.framebufferWidth,x.framebufferHeight,!1),C=new Fi(x.framebufferWidth,x.framebufferHeight,{format:Bi,type:mi,colorSpace:t.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(m),d=null,f=await l.requestReferenceSpace(p),It.setContext(l),It.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function ot(at){for(let pt=0;pt<at.removed.length;pt++){const bt=at.removed[pt],jt=U.indexOf(bt);jt>=0&&(U[jt]=null,L[jt].disconnect(bt))}for(let pt=0;pt<at.added.length;pt++){const bt=at.added[pt];let jt=U.indexOf(bt);if(jt===-1){for(let se=0;se<L.length;se++)if(se>=U.length){U.push(bt),jt=se;break}else if(U[se]===null){U[se]=bt,jt=se;break}if(jt===-1)break}const Ot=L[jt];Ot&&Ot.connect(bt)}}const et=new tt,ut=new tt;function N(at,pt,bt){et.setFromMatrixPosition(pt.matrixWorld),ut.setFromMatrixPosition(bt.matrixWorld);const jt=et.distanceTo(ut),Ot=pt.projectionMatrix.elements,se=bt.projectionMatrix.elements,Ze=Ot[14]/(Ot[10]-1),re=Ot[14]/(Ot[10]+1),xe=(Ot[9]+1)/Ot[5],Ne=(Ot[9]-1)/Ot[5],ge=(Ot[8]-1)/Ot[0],Xe=(se[8]+1)/se[0],nn=Ze*ge,bn=Ze*Xe,We=jt/(-ge+Xe),an=We*-ge;if(pt.matrixWorld.decompose(at.position,at.quaternion,at.scale),at.translateX(an),at.translateZ(We),at.matrixWorld.compose(at.position,at.quaternion,at.scale),at.matrixWorldInverse.copy(at.matrixWorld).invert(),Ot[10]===-1)at.projectionMatrix.copy(pt.projectionMatrix),at.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const Z=Ze+We,Oe=re+We,De=nn-an,z=bn+(jt-an),b=xe*re/Oe*Z,J=Ne*re/Oe*Z;at.projectionMatrix.makePerspective(De,z,b,J,Z,Oe),at.projectionMatrixInverse.copy(at.projectionMatrix).invert()}}function $(at,pt){pt===null?at.matrixWorld.copy(at.matrix):at.matrixWorld.multiplyMatrices(pt.matrixWorld,at.matrix),at.matrixWorldInverse.copy(at.matrixWorld).invert()}this.updateCamera=function(at){if(l===null)return;let pt=at.near,bt=at.far;y.texture!==null&&(y.depthNear>0&&(pt=y.depthNear),y.depthFar>0&&(bt=y.depthFar)),j.near=H.near=F.near=pt,j.far=H.far=F.far=bt,(q!==j.near||Q!==j.far)&&(l.updateRenderState({depthNear:j.near,depthFar:j.far}),q=j.near,Q=j.far),j.layers.mask=at.layers.mask|6,F.layers.mask=j.layers.mask&-5,H.layers.mask=j.layers.mask&-3;const jt=at.parent,Ot=j.cameras;$(j,jt);for(let se=0;se<Ot.length;se++)$(Ot[se],jt);Ot.length===2?N(j,F,H):j.projectionMatrix.copy(F.projectionMatrix),D===null&&at.isPerspectiveCamera&&(D={camera:at,fov:at.fov,zoom:at.zoom}),ht(at,j,jt)};function ht(at,pt,bt){bt===null?at.matrix.copy(pt.matrixWorld):(at.matrix.copy(bt.matrixWorld),at.matrix.invert(),at.matrix.multiply(pt.matrixWorld)),at.matrix.decompose(at.position,at.quaternion,at.scale),at.updateMatrixWorld(!0),at.projectionMatrix.copy(pt.projectionMatrix),at.projectionMatrixInverse.copy(pt.projectionMatrixInverse),at.isPerspectiveCamera&&(at.fov=rl*2*Math.atan(1/at.projectionMatrix.elements[5]),at.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(g===null&&x===null))return m},this.setFoveation=function(at){m=at,g!==null&&(g.fixedFoveation=at),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=at)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(j)},this.getCameraTexture=function(at){return S[at]};let Et=null;function Ct(at,pt){if(_=pt.getViewerPose(d||f),E=pt,_!==null){const bt=_.views;x!==null&&(t.setRenderTargetFramebuffer(C,x.framebuffer),t.setRenderTarget(C));let jt=!1;bt.length!==j.cameras.length&&(j.cameras.length=0,jt=!0);for(let re=0;re<bt.length;re++){const xe=bt[re];let Ne=null;if(x!==null)Ne=x.getViewport(xe);else{const Xe=v.getViewSubImage(g,xe);Ne=Xe.viewport,re===0&&(t.setRenderTargetTextures(C,Xe.colorTexture,Xe.depthStencilTexture),t.setRenderTarget(C))}let ge=W[re];ge===void 0&&(ge=new Ri,ge.layers.enable(re),ge.viewport=new en,W[re]=ge),ge.matrix.fromArray(xe.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(xe.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),re===0&&(j.matrix.copy(ge.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),jt===!0&&j.cameras.push(ge)}const Ot=l.enabledFeatures;if(Ot&&Ot.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&R){v=s.getBinding();const re=v.getDepthInformation(bt[0]);re&&re.isValid&&re.texture&&y.init(re,l.renderState)}if(Ot&&Ot.includes("camera-access")&&R){t.state.unbindTexture(),v=s.getBinding();for(let re=0;re<bt.length;re++){const xe=bt[re].camera;if(xe){let Ne=S[xe];Ne||(Ne=new Fv,S[xe]=Ne);const ge=v.getCameraImage(xe);Ne.sourceTexture=ge}}}}for(let bt=0;bt<L.length;bt++){const jt=U[bt],Ot=L[bt];jt!==null&&Ot!==void 0&&Ot.update(jt,pt,d||f)}Et&&Et(at,pt),pt.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:pt}),E=null}const It=new kv;It.setAnimationLoop(Ct),this.setAnimationLoop=function(at){Et=at},this.dispose=function(){}}}const ZA=new tn,Qv=new le;Qv.set(-1,0,0,0,1,0,0,0,1);function KA(r,t){function i(y,S){y.matrixAutoUpdate===!0&&y.updateMatrix(),S.value.copy(y.matrix)}function s(y,S){S.color.getRGB(y.fogColor.value,Hv(r)),S.isFog?(y.fogNear.value=S.near,y.fogFar.value=S.far):S.isFogExp2&&(y.fogDensity.value=S.density)}function l(y,S,P,I,C){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(y,S):S.isMeshLambertMaterial?(c(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(y,S),v(y,S)):S.isMeshPhongMaterial?(c(y,S),_(y,S),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(y,S),g(y,S),S.isMeshPhysicalMaterial&&x(y,S,C)):S.isMeshMatcapMaterial?(c(y,S),E(y,S)):S.isMeshDepthMaterial?c(y,S):S.isMeshDistanceMaterial?(c(y,S),R(y,S)):S.isMeshNormalMaterial?c(y,S):S.isLineBasicMaterial?(f(y,S),S.isLineDashedMaterial&&p(y,S)):S.isPointsMaterial?m(y,S,P,I):S.isSpriteMaterial?d(y,S):S.isShadowMaterial?(y.color.value.copy(S.color),y.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(y,S){y.opacity.value=S.opacity,S.color&&y.diffuse.value.copy(S.color),S.emissive&&y.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.bumpMap&&(y.bumpMap.value=S.bumpMap,i(S.bumpMap,y.bumpMapTransform),y.bumpScale.value=S.bumpScale,S.side===Yn&&(y.bumpScale.value*=-1)),S.normalMap&&(y.normalMap.value=S.normalMap,i(S.normalMap,y.normalMapTransform),y.normalScale.value.copy(S.normalScale),S.side===Yn&&y.normalScale.value.negate()),S.displacementMap&&(y.displacementMap.value=S.displacementMap,i(S.displacementMap,y.displacementMapTransform),y.displacementScale.value=S.displacementScale,y.displacementBias.value=S.displacementBias),S.emissiveMap&&(y.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,y.emissiveMapTransform)),S.specularMap&&(y.specularMap.value=S.specularMap,i(S.specularMap,y.specularMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest);const P=t.get(S),I=P.envMap,C=P.envMapRotation;I&&(y.envMap.value=I,y.envMapRotation.value.setFromMatrix4(ZA.makeRotationFromEuler(C)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(Qv),y.reflectivity.value=S.reflectivity,y.ior.value=S.ior,y.refractionRatio.value=S.refractionRatio),S.lightMap&&(y.lightMap.value=S.lightMap,y.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,y.lightMapTransform)),S.aoMap&&(y.aoMap.value=S.aoMap,y.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,y.aoMapTransform))}function f(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform))}function p(y,S){y.dashSize.value=S.dashSize,y.totalSize.value=S.dashSize+S.gapSize,y.scale.value=S.scale}function m(y,S,P,I){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.size.value=S.size*P,y.scale.value=I*.5,S.map&&(y.map.value=S.map,i(S.map,y.uvTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function d(y,S){y.diffuse.value.copy(S.color),y.opacity.value=S.opacity,y.rotation.value=S.rotation,S.map&&(y.map.value=S.map,i(S.map,y.mapTransform)),S.alphaMap&&(y.alphaMap.value=S.alphaMap,i(S.alphaMap,y.alphaMapTransform)),S.alphaTest>0&&(y.alphaTest.value=S.alphaTest)}function _(y,S){y.specular.value.copy(S.specular),y.shininess.value=Math.max(S.shininess,1e-4)}function v(y,S){S.gradientMap&&(y.gradientMap.value=S.gradientMap)}function g(y,S){y.metalness.value=S.metalness,S.metalnessMap&&(y.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,y.metalnessMapTransform)),y.roughness.value=S.roughness,S.roughnessMap&&(y.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,y.roughnessMapTransform)),S.envMap&&(y.envMapIntensity.value=S.envMapIntensity)}function x(y,S,P){y.ior.value=S.ior,S.sheen>0&&(y.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),y.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(y.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,y.sheenColorMapTransform)),S.sheenRoughnessMap&&(y.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,y.sheenRoughnessMapTransform))),S.clearcoat>0&&(y.clearcoat.value=S.clearcoat,y.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(y.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,y.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(y.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Yn&&y.clearcoatNormalScale.value.negate())),S.dispersion>0&&(y.dispersion.value=S.dispersion),S.retroreflectivity>0&&(y.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(y.iridescence.value=S.iridescence,y.iridescenceIOR.value=S.iridescenceIOR,y.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(y.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,y.iridescenceMapTransform)),S.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),S.transmission>0&&(y.transmission.value=S.transmission,y.transmissionSamplerMap.value=P.texture,y.transmissionSamplerSize.value.set(P.width,P.height),S.transmissionMap&&(y.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,y.transmissionMapTransform)),y.thickness.value=S.thickness,S.thicknessMap&&(y.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=S.attenuationDistance,y.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(y.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(y.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=S.specularIntensity,y.specularColor.value.copy(S.specularColor),S.specularColorMap&&(y.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,y.specularColorMapTransform)),S.specularIntensityMap&&(y.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,S){S.matcap&&(y.matcap.value=S.matcap)}function R(y,S){const P=t.get(S).light;y.referencePosition.value.setFromMatrixPosition(P.matrixWorld),y.nearDistance.value=P.shadow.camera.near,y.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function QA(r,t,i,s){let l={},c={},f=[];const p=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(C,L){const U=L.program;s.uniformBlockBinding(C,U)}function d(C,L){let U=l[C.id];U===void 0&&(y(C),U=_(C),l[C.id]=U,C.addEventListener("dispose",P));const O=L.program;s.updateUBOMapping(C,O);const T=t.render.frame;c[C.id]!==T&&(g(C),c[C.id]=T)}function _(C){const L=v();C.__bindingPointIndex=L;const U=r.createBuffer(),O=C.__size,T=C.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,O,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,L,U),U}function v(){for(let C=0;C<p;C++)if(f.indexOf(C)===-1)return f.push(C),C;return we("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(C){const L=l[C.id],U=C.uniforms,O=C.__cache;r.bindBuffer(r.UNIFORM_BUFFER,L);for(let T=0,D=U.length;T<D;T++){const F=U[T];if(Array.isArray(F))for(let H=0,W=F.length;H<W;H++)x(F[H],T,H,O);else x(F,T,0,O)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function x(C,L,U,O){if(R(C,L,U,O)===!0){const T=C.__offset,D=C.value;if(Array.isArray(D)){let F=0;for(let H=0;H<D.length;H++){const W=D[H],j=S(W);E(W,C.__data,F),typeof W!="number"&&typeof W!="boolean"&&!W.isMatrix3&&!ArrayBuffer.isView(W)&&(F+=j.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(D,C.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,T,C.__data)}}function E(C,L,U){typeof C=="number"||typeof C=="boolean"?L[0]=C:C.isMatrix3?(L[0]=C.elements[0],L[1]=C.elements[1],L[2]=C.elements[2],L[3]=0,L[4]=C.elements[3],L[5]=C.elements[4],L[6]=C.elements[5],L[7]=0,L[8]=C.elements[6],L[9]=C.elements[7],L[10]=C.elements[8],L[11]=0):ArrayBuffer.isView(C)?L.set(new C.constructor(C.buffer,C.byteOffset,L.length)):C.toArray(L,U)}function R(C,L,U,O){const T=C.value,D=L+"_"+U;if(O[D]===void 0)return typeof T=="number"||typeof T=="boolean"?O[D]=T:ArrayBuffer.isView(T)?O[D]=T.slice():O[D]=T.clone(),!0;{const F=O[D];if(typeof T=="number"||typeof T=="boolean"){if(F!==T)return O[D]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(F.equals(T)===!1)return F.copy(T),!0}}return!1}function y(C){const L=C.uniforms;let U=0;const O=16;for(let D=0,F=L.length;D<F;D++){const H=Array.isArray(L[D])?L[D]:[L[D]];for(let W=0,j=H.length;W<j;W++){const q=H[W],Q=Array.isArray(q.value)?q.value:[q.value];for(let B=0,V=Q.length;B<V;B++){const ot=Q[B],et=S(ot),ut=U%O,N=ut%et.boundary,$=ut+N;U+=N,$!==0&&O-$<et.storage&&(U+=O-$),q.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=U,U+=et.storage}}}const T=U%O;return T>0&&(U+=O-T),C.__size=U,C.__cache={},this}function S(C){const L={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(L.boundary=4,L.storage=4):C.isVector2?(L.boundary=8,L.storage=8):C.isVector3||C.isColor?(L.boundary=16,L.storage=12):C.isVector4?(L.boundary=16,L.storage=16):C.isMatrix3?(L.boundary=48,L.storage=48):C.isMatrix4?(L.boundary=64,L.storage=64):C.isTexture?ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(C)?(L.boundary=16,L.storage=C.byteLength):ie("WebGLRenderer: Unsupported uniform value type.",C),L}function P(C){const L=C.target;L.removeEventListener("dispose",P);const U=f.indexOf(L.__bindingPointIndex);f.splice(U,1),r.deleteBuffer(l[L.id]),delete l[L.id],delete c[L.id]}function I(){for(const C in l)r.deleteBuffer(l[C]);f=[],l={},c={}}return{bind:m,update:d,dispose:I}}const JA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Zi=null;function jA(){return Zi===null&&(Zi=new zy(JA,16,16,ks,ea),Zi.name="DFG_LUT",Zi.minFilter=Pn,Zi.magFilter=Pn,Zi.wrapS=Ra,Zi.wrapT=Ra,Zi.generateMipmaps=!1,Zi.needsUpdate=!0),Zi}class $A{constructor(t={}){const{canvas:i=QM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:g=!1,outputBufferType:x=mi}=t;this.isWebGLRenderer=!0;let E;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=s.getContextAttributes().alpha}else E=f;const R=x,y=new Set([ep,tp,$d]),S=new Set([mi,ta,il,al,Jd,jd]),P=new Uint32Array(4),I=new Int32Array(4),C=new tt;let L=null,U=null;const O=[],T=[];let D=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let H=!1,W=null,j=null,q=null,Q=null;this._outputColorSpace=On;let B=0,V=0,ot=null,et=-1,ut=null;const N=new en,$=new en;let ht=null;const Et=new Kt(0);let Ct=0,It=i.width,at=i.height,pt=1,bt=null,jt=null;const Ot=new en(0,0,It,at),se=new en(0,0,It,at);let Ze=!1;const re=new lp;let xe=!1,Ne=!1;const ge=new tn,Xe=new tt,nn=new en,bn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function an(){return ot===null?pt:1}let Z=s;function Oe(A,k){return i.getContext(A,k)}let De,z,b,J,lt,mt,Tt,Dt,gt,_t,At,Gt,Nt,Ut,Qt,Jt,ne,Y,Rt,St,wt,Bt,yt;try{const A={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Zd}`),i.addEventListener("webglcontextlost",Fe,!1),i.addEventListener("webglcontextrestored",Te,!1),i.addEventListener("webglcontextcreationerror",qn,!1),Z===null){const k="webgl2";if(Z=Oe(k,A),Z===null)throw Oe(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Zt()}catch(A){throw i.removeEventListener("webglcontextlost",Fe,!1),i.removeEventListener("webglcontextrestored",Te,!1),i.removeEventListener("webglcontextcreationerror",qn,!1),we("WebGLRenderer: "+A.message),A}function Zt(){De=new jT(Z),De.init(),wt=new kA(Z,De),z=new VT(Z,De,t,wt),b=new GA(Z,De),z.reversedDepthBuffer&&g&&b.buffers.depth.setReversed(!0),j=Z.createFramebuffer(),q=Z.createFramebuffer(),Q=Z.createFramebuffer(),J=new e1(Z),lt=new RA,mt=new VA(Z,De,b,lt,z,wt,J),Tt=new JT(F),Dt=new iE(Z),Bt=new HT(Z,Dt),gt=new $T(Z,Dt,J,Bt),_t=new i1(Z,gt,Dt,Bt,J),Y=new n1(Z,z,mt),Qt=new kT(lt),At=new AA(F,Tt,De,z,Bt,Qt),Gt=new KA(F,lt),Nt=new wA,Ut=new PA(De),ne=new FT(F,Tt,b,_t,E,m),Jt=new HA(F,_t,z),yt=new QA(Z,J,z,b),Rt=new GT(Z,De,J),St=new t1(Z,De,J),J.programs=At.programs,F.capabilities=z,F.extensions=De,F.properties=lt,F.renderLists=Nt,F.shadowMap=Jt,F.state=b,F.info=J}R!==mi&&(D=new s1(R,i.width,i.height,p,l,c));const Xt=new qA(F,Z);this.xr=Xt,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){const A=De.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=De.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return pt},this.setPixelRatio=function(A){A!==void 0&&(pt=A,this.setSize(It,at,!1))},this.getSize=function(A){return A.set(It,at)},this.setSize=function(A,k,ft=!0){if(Xt.isPresenting){ie("WebGLRenderer: Can't change size while VR device is presenting.");return}It=A,at=k,i.width=Math.floor(A*pt),i.height=Math.floor(k*pt),ft===!0&&(i.style.width=A+"px",i.style.height=k+"px"),D!==null&&D.setSize(i.width,i.height),this.setViewport(0,0,A,k)},this.getDrawingBufferSize=function(A){return A.set(It*pt,at*pt).floor()},this.setDrawingBufferSize=function(A,k,ft){It=A,at=k,pt=ft,i.width=Math.floor(A*ft),i.height=Math.floor(k*ft),this.setViewport(0,0,A,k)},this.setEffects=function(A){if(R===mi){we("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let k=0;k<A.length;k++)if(A[k].isOutputPass===!0){ie("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(N)},this.getViewport=function(A){return A.copy(Ot)},this.setViewport=function(A,k,ft,nt){A.isVector4?Ot.set(A.x,A.y,A.z,A.w):Ot.set(A,k,ft,nt),b.viewport(N.copy(Ot).multiplyScalar(pt).round())},this.getScissor=function(A){return A.copy(se)},this.setScissor=function(A,k,ft,nt){A.isVector4?se.set(A.x,A.y,A.z,A.w):se.set(A,k,ft,nt),b.scissor($.copy(se).multiplyScalar(pt).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(A){b.setScissorTest(Ze=A)},this.setOpaqueSort=function(A){bt=A},this.setTransparentSort=function(A){jt=A},this.getClearColor=function(A){return A.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor(...arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha(...arguments)},this.clear=function(A=!0,k=!0,ft=!0){let nt=0;if(A){let it=!1;if(ot!==null){const Pt=ot.texture.format;it=y.has(Pt)}if(it){const Pt=ot.texture.type,Vt=S.has(Pt),Lt=ne.getClearColor(),Ft=ne.getClearAlpha(),Ht=Lt.r,ce=Lt.g,me=Lt.b;Vt?(P[0]=Ht,P[1]=ce,P[2]=me,P[3]=Ft,Z.clearBufferuiv(Z.COLOR,0,P)):(I[0]=Ht,I[1]=ce,I[2]=me,I[3]=Ft,Z.clearBufferiv(Z.COLOR,0,I))}else nt|=Z.COLOR_BUFFER_BIT}k&&(nt|=Z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ft&&(nt|=Z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),nt!==0&&Z.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),W=A},this.dispose=function(){i.removeEventListener("webglcontextlost",Fe,!1),i.removeEventListener("webglcontextrestored",Te,!1),i.removeEventListener("webglcontextcreationerror",qn,!1),ne.dispose(),Nt.dispose(),Ut.dispose(),lt.dispose(),Tt.dispose(),_t.dispose(),Bt.dispose(),yt.dispose(),At.dispose(),Xt.dispose(),Xt.removeEventListener("sessionstart",un),Xt.removeEventListener("sessionend",wn),Zn.stop()};function Fe(A){A.preventDefault(),f_("WebGLRenderer: Context Lost."),H=!0}function Te(){f_("WebGLRenderer: Context Restored."),H=!1;const A=J.autoReset,k=Jt.enabled,ft=Jt.autoUpdate,nt=Jt.needsUpdate,it=Jt.type;Zt(),J.autoReset=A,Jt.enabled=k,Jt.autoUpdate=ft,Jt.needsUpdate=nt,Jt.type=it}function qn(A){we("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ii(A){const k=A.target;k.removeEventListener("dispose",ii),qr(k)}function qr(A){Zr(A),lt.remove(A)}function Zr(A){const k=lt.get(A).programs;k!==void 0&&(k.forEach(function(ft){At.releaseProgram(ft)}),A.isShaderMaterial&&At.releaseShaderCache(A))}this.renderBufferDirect=function(A,k,ft,nt,it,Pt){k===null&&(k=bn);const Vt=it.isMesh&&it.matrixWorld.determinantAffine()<0,Lt=Pa(A,k,ft,nt,it);b.setMaterial(nt,Vt);let Ft=ft.index,Ht=1;if(nt.wireframe===!0){if(Ft=gt.getWireframeAttribute(ft),Ft===void 0)return;Ht=2}const ce=ft.drawRange,me=ft.attributes.position;let Wt=ce.start*Ht,Ae=(ce.start+ce.count)*Ht;Pt!==null&&(Wt=Math.max(Wt,Pt.start*Ht),Ae=Math.min(Ae,(Pt.start+Pt.count)*Ht)),Ft!==null?(Wt=Math.max(Wt,0),Ae=Math.min(Ae,Ft.count)):me!=null&&(Wt=Math.max(Wt,0),Ae=Math.min(Ae,me.count));const Ke=Ae-Wt;if(Ke<0||Ke===1/0)return;Bt.setup(it,nt,Lt,ft,Ft);let Ye,he=Rt;if(Ft!==null&&(Ye=Dt.get(Ft),he=St,he.setIndex(Ye)),it.isMesh)nt.wireframe===!0?(b.setLineWidth(nt.wireframeLinewidth*an()),he.setMode(Z.LINES)):he.setMode(Z.TRIANGLES);else if(it.isLine){let hn=nt.linewidth;hn===void 0&&(hn=1),b.setLineWidth(hn*an()),it.isLineSegments?he.setMode(Z.LINES):it.isLineLoop?he.setMode(Z.LINE_LOOP):he.setMode(Z.LINE_STRIP)}else it.isPoints?he.setMode(Z.POINTS):it.isSprite&&he.setMode(Z.TRIANGLES);if(it.isBatchedMesh)if(De.get("WEBGL_multi_draw"))he.renderMultiDraw(it._multiDrawStarts,it._multiDrawCounts,it._multiDrawCount);else{const hn=it._multiDrawStarts,kt=it._multiDrawCounts,vn=it._multiDrawCount,de=Ft?Dt.get(Ft).bytesPerElement:1,Gn=lt.get(nt).currentProgram.getUniforms();for(let ai=0;ai<vn;ai++)Gn.setValue(Z,"_gl_DrawID",ai),he.render(hn[ai]/de,kt[ai])}else if(it.isInstancedMesh)he.renderInstances(Wt,Ke,it.count);else if(ft.isInstancedBufferGeometry){const hn=ft._maxInstanceCount!==void 0?ft._maxInstanceCount:1/0,kt=Math.min(ft.instanceCount,hn);he.renderInstances(Wt,Ke,kt)}else he.render(Wt,Ke)};function Kr(A,k,ft,nt){W!==null&&A.isNodeMaterial&&W.setObject(nt,A),xe===!0&&Qt.setState(A,ft,!1),A.transparent===!0&&A.side===Qi&&A.forceSinglePass===!1?(A.side=Yn,A.needsUpdate=!0,Oa(A,k,nt),A.side=Hs,A.needsUpdate=!0,Oa(A,k,nt),A.side=Qi):Oa(A,k,nt)}this.compile=function(A,k,ft=null){ft===null&&(ft=A),W!==null&&W.renderStart(A,k,ft),U=Ut.get(ft),U.init(k),T.push(U),ft.traverseVisible(function(it){it.isLight&&it.layers.test(k.layers)&&(U.pushLight(it),it.castShadow&&U.pushShadow(it))}),A!==ft&&A.traverseVisible(function(it){it.isLight&&it.layers.test(k.layers)&&(U.pushLight(it),it.castShadow&&U.pushShadow(it))}),U.setupLights(),W!==null&&W.updateLights(U.state.lightsArray),Ne=this.localClippingEnabled,xe=Qt.init(this.clippingPlanes,Ne),xe===!0&&Qt.setGlobalState(this.clippingPlanes,k),W!==null&&Jt.render(U.state.shadowsArray,ft,k);const nt=new Set;return A.traverse(function(it){if(!(it.isMesh||it.isPoints||it.isLine||it.isSprite))return;const Pt=it.material;if(Pt)if(Array.isArray(Pt))for(let Vt=0;Vt<Pt.length;Vt++){const Lt=Pt[Vt];Kr(Lt,ft,k,it),nt.add(Lt)}else Kr(Pt,ft,k,it),nt.add(Pt)}),U=T.pop(),W!==null&&W.renderEnd(),nt},this.compileAsync=function(A,k,ft=null){const nt=this.compile(A,k,ft);return new Promise(it=>{function Pt(){if(nt.forEach(function(Vt){const Ft=lt.get(Vt).currentProgram;(Ft===void 0||Ft.isReady())&&nt.delete(Vt)}),nt.size===0){it(A);return}setTimeout(Pt,10)}De.get("KHR_parallel_shader_compile")!==null?Pt():setTimeout(Pt,10)})};let Ws=null;function Gi(A){Ws&&Ws(A)}function un(){Zn.stop()}function wn(){Zn.start()}const Zn=new kv;Zn.setAnimationLoop(Gi),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(A){Ws=A,Xt.setAnimationLoop(A),A===null?Zn.stop():Zn.start()},Xt.addEventListener("sessionstart",un),Xt.addEventListener("sessionend",wn),this.render=function(A,k){if(k!==void 0&&k.isCamera!==!0){we("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;W!==null&&W.renderStart(A,k);const ft=Xt.enabled===!0&&Xt.isPresenting===!0,nt=D!==null&&(ot===null||ft)&&D.begin(F,ot);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Xt.enabled===!0&&Xt.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(Xt.cameraAutoUpdate===!0&&Xt.updateCamera(k),k=Xt.getCamera()),A.isScene===!0&&A.onBeforeRender(F,A,k,ot),U=Ut.get(A,T.length),U.init(k),U.state.textureUnits=mt.getTextureUnits(),T.push(U),ge.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),re.setFromProjectionMatrix(ge,ji,k.reversedDepth),Ne=this.localClippingEnabled,xe=Qt.init(this.clippingPlanes,Ne),L=Nt.get(A,O.length),L.init(),O.push(L),Xt.enabled===!0&&Xt.isPresenting===!0){const Vt=F.xr.getDepthSensingMesh();Vt!==null&&ms(Vt,k,-1/0,F.sortObjects)}ms(A,k,0,F.sortObjects),L.finish(),W!==null&&W.updateLights(U.state.lightsArray),F.sortObjects===!0&&L.sort(bt,jt),We=Xt.enabled===!1||Xt.isPresenting===!1||Xt.hasDepthSensing()===!1,We&&ne.addToRenderList(L,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),xe===!0&&Qt.beginShadows();const it=U.state.shadowsArray;if(Jt.render(it,A,k),xe===!0&&Qt.endShadows(),(nt&&D.hasRenderPass())===!1){const Vt=L.opaque,Lt=L.transmissive;if(U.setupLights(),k.isArrayCamera){const Ft=k.cameras;if(Lt.length>0)for(let Ht=0,ce=Ft.length;Ht<ce;Ht++){const me=Ft[Ht];pl(Vt,Lt,A,me)}We&&ne.render(A);for(let Ht=0,ce=Ft.length;Ht<ce;Ht++){const me=Ft[Ht];dl(L,A,me,me.viewport)}}else Lt.length>0&&pl(Vt,Lt,A,k),We&&ne.render(A),dl(L,A,k)}ot!==null&&V===0&&(mt.updateMultisampleRenderTarget(ot),mt.updateRenderTargetMipmap(ot)),nt&&D.end(F),A.isScene===!0&&A.onAfterRender(F,A,k),Bt.resetDefaultState(),et=-1,ut=null,T.pop(),T.length>0?(U=T[T.length-1],mt.setTextureUnits(U.state.textureUnits),xe===!0&&Qt.setGlobalState(F.clippingPlanes,U.state.camera)):U=null,O.pop(),O.length>0?L=O[O.length-1]:L=null,W!==null&&W.renderEnd()};function ms(A,k,ft,nt){if(A.visible===!1)return;if(A.layers.test(k.layers)){if(A.isGroup)ft=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(k);else if(A.isLightProbeGrid)U.pushLightProbeGrid(A);else if(A.isLight)U.pushLight(A),A.castShadow&&U.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(re)){nt&&nn.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ge);const Vt=_t.update(A),Lt=A.material;Lt.visible&&L.push(A,Vt,Lt,ft,nn.z,null,k)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(re))){const Vt=_t.update(A),Lt=A.material;if(nt&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),nn.copy(A.boundingSphere.center)):(Vt.boundingSphere===null&&Vt.computeBoundingSphere(),nn.copy(Vt.boundingSphere.center)),nn.applyMatrix4(A.matrixWorld).applyMatrix4(ge)),Array.isArray(Lt)){const Ft=Vt.groups;for(let Ht=0,ce=Ft.length;Ht<ce;Ht++){const me=Ft[Ht],Wt=Lt[me.materialIndex];Wt&&Wt.visible&&L.push(A,Vt,Wt,ft,nn.z,me,k)}}else Lt.visible&&L.push(A,Vt,Lt,ft,nn.z,null,k)}}const Pt=A.children;for(let Vt=0,Lt=Pt.length;Vt<Lt;Vt++)ms(Pt[Vt],k,ft,nt)}function dl(A,k,ft,nt){const{opaque:it,transmissive:Pt,transparent:Vt}=A;U.setupLightsView(ft),xe===!0&&Qt.setGlobalState(F.clippingPlanes,ft),nt&&b.viewport(N.copy(nt)),it.length>0&&gs(it,k,ft),Pt.length>0&&gs(Pt,k,ft),Vt.length>0&&gs(Vt,k,ft),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function pl(A,k,ft,nt){if((ft.isScene===!0?ft.overrideMaterial:null)!==null)return;if(U.state.transmissionRenderTarget[nt.id]===void 0){const Wt=De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float");U.state.transmissionRenderTarget[nt.id]=new Fi(1,1,{generateMipmaps:!0,type:Wt?ea:mi,minFilter:Ca,samples:Math.max(4,z.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:be.workingColorSpace})}const Pt=U.state.transmissionRenderTarget[nt.id],Vt=nt.viewport||N;Pt.setSize(Vt.z*F.transmissionResolutionScale,Vt.w*F.transmissionResolutionScale);const Lt=F.getRenderTarget(),Ft=F.getActiveCubeFace(),Ht=F.getActiveMipmapLevel();F.setRenderTarget(Pt),F.getClearColor(Et),Ct=F.getClearAlpha(),Ct<1&&F.setClearColor(16777215,.5),F.clear(),We&&ne.render(ft);const ce=F.toneMapping;F.toneMapping=$i;const me=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),U.setupLightsView(nt),xe===!0&&Qt.setGlobalState(F.clippingPlanes,nt),gs(A,ft,nt),mt.updateMultisampleRenderTarget(Pt),mt.updateRenderTargetMipmap(Pt),De.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Ae=0,Ke=k.length;Ae<Ke;Ae++){const Ye=k[Ae],{object:he,geometry:hn,material:kt,group:vn}=Ye;if(kt.side===Qi&&he.layers.test(nt.layers)){const de=kt.side;kt.side=Yn,kt.needsUpdate=!0,Na(he,ft,nt,hn,kt,vn),kt.side=de,kt.needsUpdate=!0,Wt=!0}}Wt===!0&&(mt.updateMultisampleRenderTarget(Pt),mt.updateRenderTargetMipmap(Pt))}F.setRenderTarget(Lt,Ft,Ht),F.setClearColor(Et,Ct),me!==void 0&&(nt.viewport=me),F.toneMapping=ce}function gs(A,k,ft){const nt=k.isScene===!0?k.overrideMaterial:null;for(let it=0,Pt=A.length;it<Pt;it++){const Vt=A[it],{object:Lt,geometry:Ft,group:Ht}=Vt;let ce=Vt.material;ce.allowOverride===!0&&nt!==null&&(ce=nt),Lt.layers.test(ft.layers)&&Na(Lt,k,ft,Ft,ce,Ht)}}function Na(A,k,ft,nt,it,Pt){W!==null&&it.isNodeMaterial&&W.setObject(A,it),A.onBeforeRender(F,k,ft,nt,it,Pt),A.modelViewMatrix.multiplyMatrices(ft.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),it.onBeforeRender(F,k,ft,nt,A,Pt),it.transparent===!0&&it.side===Qi&&it.forceSinglePass===!1?(it.side=Yn,it.needsUpdate=!0,F.renderBufferDirect(ft,k,nt,it,A,Pt),it.side=Hs,it.needsUpdate=!0,F.renderBufferDirect(ft,k,nt,it,A,Pt),it.side=Qi):F.renderBufferDirect(ft,k,nt,it,A,Pt),A.onAfterRender(F,k,ft,nt,it,Pt)}function Oa(A,k,ft){k.isScene!==!0&&(k=bn);const nt=lt.get(A),it=U.state.lights,Pt=U.state.shadowsArray,Vt=it.state.version,Lt=At.getParameters(A,it.state,Pt,k,ft,U.state.lightProbeGridArray),Ft=At.getProgramCacheKey(Lt);let Ht=nt.programs;nt.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?k.environment:null,nt.fog=k.fog;const ce=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;nt.envMap=Tt.get(A.envMap||nt.environment,ce),nt.envMapRotation=nt.environment!==null&&A.envMap===null?k.environmentRotation:A.envMapRotation,Ht===void 0&&(A.addEventListener("dispose",ii),Ht=new Map,nt.programs=Ht);let me=Ht.get(Ft);if(me!==void 0){if(nt.currentProgram===me&&nt.lightsStateVersion===Vt)return ia(A,Lt),me}else Lt.uniforms=At.getUniforms(A),W!==null&&A.isNodeMaterial&&W.build(A,ft,Lt),A.onBeforeCompile(Lt,F),me=At.acquireProgram(Lt,Ft),Ht.set(Ft,me),nt.uniforms=Lt.uniforms;const Wt=nt.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Wt.clippingPlanes=Qt.uniform),ia(A,Lt),nt.needsLights=ml(A),nt.lightsStateVersion=Vt,nt.needsLights&&(Wt.ambientLightColor.value=it.state.ambient,Wt.lightProbe.value=it.state.probe,Wt.sunLights.value=it.state.sun,Wt.sunLightShadows.value=it.state.sunShadow,Wt.directionalLights.value=it.state.directional,Wt.directionalLightShadows.value=it.state.directionalShadow,Wt.spotLights.value=it.state.spot,Wt.spotLightShadows.value=it.state.spotShadow,Wt.rectAreaLights.value=it.state.rectArea,Wt.ltc_1.value=it.state.rectAreaLTC1,Wt.ltc_2.value=it.state.rectAreaLTC2,Wt.pointLights.value=it.state.point,Wt.pointLightShadows.value=it.state.pointShadow,Wt.hemisphereLights.value=it.state.hemi,Wt.sunShadowMatrix.value=it.state.sunShadowMatrix,Wt.sunShadowCascade.value=it.state.sunShadowCascade,Wt.directionalShadowMatrix.value=it.state.directionalShadowMatrix,Wt.spotLightMatrix.value=it.state.spotLightMatrix,Wt.spotLightMap.value=it.state.spotLightMap,Wt.pointShadowMatrix.value=it.state.pointShadowMatrix),nt.lightProbeGrid=U.state.lightProbeGridArray.length>0,nt.currentProgram=me,nt.uniformsList=null,me}function na(A){if(A.uniformsList===null){const k=A.currentProgram.getUniforms();A.uniformsList=tu.seqWithValue(k.seq,A.uniforms)}return A.uniformsList}function ia(A,k){const ft=lt.get(A);ft.outputColorSpace=k.outputColorSpace,ft.batching=k.batching,ft.batchingColor=k.batchingColor,ft.instancing=k.instancing,ft.instancingColor=k.instancingColor,ft.instancingMorph=k.instancingMorph,ft.skinning=k.skinning,ft.morphTargets=k.morphTargets,ft.morphNormals=k.morphNormals,ft.morphColors=k.morphColors,ft.morphTargetsCount=k.morphTargetsCount,ft.numClippingPlanes=k.numClippingPlanes,ft.numIntersection=k.numClipIntersection,ft.vertexAlphas=k.vertexAlphas,ft.vertexTangents=k.vertexTangents,ft.toneMapping=k.toneMapping}function _s(A,k){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;C.setFromMatrixPosition(k.matrixWorld);for(let ft=0,nt=A.length;ft<nt;ft++){const it=A[ft];if(it.texture!==null&&it.boundingBox.containsPoint(C))return it}return null}function Pa(A,k,ft,nt,it){k.isScene!==!0&&(k=bn),mt.resetTextureUnits();const Pt=k.fog,Vt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial?k.environment:null,Lt=ot===null?F.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:be.workingColorSpace,Ft=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial&&!nt.envMap||nt.isMeshPhongMaterial&&!nt.envMap,Ht=Tt.get(nt.envMap||Vt,Ft),ce=nt.vertexColors===!0&&!!ft.attributes.color&&ft.attributes.color.itemSize===4,me=!!ft.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Wt=!!ft.morphAttributes.position,Ae=!!ft.morphAttributes.normal,Ke=!!ft.morphAttributes.color;let Ye=$i;nt.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(Ye=F.toneMapping);const he=ft.morphAttributes.position||ft.morphAttributes.normal||ft.morphAttributes.color,hn=he!==void 0?he.length:0,kt=lt.get(nt),vn=U.state.lights;if(xe===!0&&(Ne===!0||A!==ut)){const He=A===ut&&nt.id===et;Qt.setState(nt,A,He)}let de=!1;nt.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==vn.state.version||kt.outputColorSpace!==Lt||it.isBatchedMesh&&kt.batching===!1||!it.isBatchedMesh&&kt.batching===!0||it.isBatchedMesh&&kt.batchingColor===!0&&it._colorsTexture===null||it.isBatchedMesh&&kt.batchingColor===!1&&it._colorsTexture!==null||it.isInstancedMesh&&kt.instancing===!1||!it.isInstancedMesh&&kt.instancing===!0||it.isSkinnedMesh&&kt.skinning===!1||!it.isSkinnedMesh&&kt.skinning===!0||it.isInstancedMesh&&kt.instancingColor===!0&&it.instanceColor===null||it.isInstancedMesh&&kt.instancingColor===!1&&it.instanceColor!==null||it.isInstancedMesh&&kt.instancingMorph===!0&&it.morphTexture===null||it.isInstancedMesh&&kt.instancingMorph===!1&&it.morphTexture!==null||kt.envMap!==Ht||nt.fog===!0&&kt.fog!==Pt||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==Qt.numPlanes||kt.numIntersection!==Qt.numIntersection)||kt.vertexAlphas!==ce||kt.vertexTangents!==me||kt.morphTargets!==Wt||kt.morphNormals!==Ae||kt.morphColors!==Ke||kt.toneMapping!==Ye||kt.morphTargetsCount!==hn||!!kt.lightProbeGrid!=U.state.lightProbeGridArray.length>0)&&(de=!0):(de=!0,kt.__version=nt.version);let Gn=kt.currentProgram;de===!0&&(Gn=Oa(nt,k,it),W&&nt.isNodeMaterial&&W.onUpdateProgram(nt,Gn,kt));let ai=!1,Vn=!1,za=!1;const Ue=Gn.getUniforms(),je=kt.uniforms;if(b.useProgram(Gn.program)&&(ai=!0,Vn=!0,za=!0),nt.id!==et&&(et=nt.id,Vn=!0),kt.needsLights){const He=_s(U.state.lightProbeGridArray,it);kt.lightProbeGrid!==He&&(kt.lightProbeGrid=He,Vn=!0)}if(ai||ut!==A){b.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ue.setValue(Z,"projectionMatrix",A.projectionMatrix),Ue.setValue(Z,"viewMatrix",A.matrixWorldInverse);const Vi=Ue.map.cameraPosition;Vi!==void 0&&Vi.setValue(Z,Xe.setFromMatrixPosition(A.matrixWorld)),z.logarithmicDepthBuffer&&Ue.setValue(Z,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&Ue.setValue(Z,"isOrthographic",A.isOrthographicCamera===!0),ut!==A&&(ut=A,Vn=!0,za=!0)}if(kt.needsLights&&(vn.state.sunShadowMap.length>0&&Ue.setValue(Z,"sunShadowMap",vn.state.sunShadowMap,mt),vn.state.directionalShadowMap.length>0&&Ue.setValue(Z,"directionalShadowMap",vn.state.directionalShadowMap,mt),vn.state.spotShadowMap.length>0&&Ue.setValue(Z,"spotShadowMap",vn.state.spotShadowMap,mt),vn.state.pointShadowMap.length>0&&Ue.setValue(Z,"pointShadowMap",vn.state.pointShadowMap,mt)),it.isSkinnedMesh){Ue.setOptional(Z,it,"bindMatrix"),Ue.setOptional(Z,it,"bindMatrixInverse");const He=it.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),Ue.setValue(Z,"boneTexture",He.boneTexture,mt))}it.isBatchedMesh&&(Ue.setOptional(Z,it,"batchingTexture"),Ue.setValue(Z,"batchingTexture",it._matricesTexture,mt),Ue.setOptional(Z,it,"batchingIdTexture"),Ue.setValue(Z,"batchingIdTexture",it._indirectTexture,mt),Ue.setOptional(Z,it,"batchingColorTexture"),it._colorsTexture!==null&&Ue.setValue(Z,"batchingColorTexture",it._colorsTexture,mt));const gi=ft.morphAttributes;if((gi.position!==void 0||gi.normal!==void 0||gi.color!==void 0)&&Y.update(it,ft,Gn),(Vn||kt.receiveShadow!==it.receiveShadow)&&(kt.receiveShadow=it.receiveShadow,Ue.setValue(Z,"receiveShadow",it.receiveShadow)),(nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial)&&nt.envMap===null&&k.environment!==null&&(je.envMapIntensity.value=k.environmentIntensity),je.dfgLUT!==void 0&&(je.dfgLUT.value=jA()),Vn){if(Ue.setValue(Z,"toneMappingExposure",F.toneMappingExposure),kt.needsLights&&fn(je,za),Pt&&nt.fog===!0&&Gt.refreshFogUniforms(je,Pt),Gt.refreshMaterialUniforms(je,nt,pt,at,U.state.transmissionRenderTarget[A.id]),kt.needsLights&&kt.lightProbeGrid){const He=kt.lightProbeGrid;je.probesSH.value=He.texture,je.probesMin.value.copy(He.boundingBox.min),je.probesMax.value.copy(He.boundingBox.max),je.probesResolution.value.copy(He.resolution)}tu.upload(Z,na(kt),je,mt)}if(nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(tu.upload(Z,na(kt),je,mt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&Ue.setValue(Z,"center",it.center),Ue.setValue(Z,"modelViewMatrix",it.modelViewMatrix),Ue.setValue(Z,"normalMatrix",it.normalMatrix),Ue.setValue(Z,"modelMatrix",it.matrixWorld),nt.uniformsGroups!==void 0){const He=nt.uniformsGroups;for(let Vi=0,wi=He.length;Vi<wi;Vi++){const _i=He[Vi];yt.update(_i,Gn),yt.bind(_i,Gn)}}return Gn}function fn(A,k){A.ambientLightColor.needsUpdate=k,A.lightProbe.needsUpdate=k,A.sunLights.needsUpdate=k,A.sunLightShadows.needsUpdate=k,A.directionalLights.needsUpdate=k,A.directionalLightShadows.needsUpdate=k,A.pointLights.needsUpdate=k,A.pointLightShadows.needsUpdate=k,A.spotLights.needsUpdate=k,A.spotLightShadows.needsUpdate=k,A.rectAreaLights.needsUpdate=k,A.hemisphereLights.needsUpdate=k}function ml(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return ot},this.setRenderTargetTextures=function(A,k,ft){const nt=lt.get(A);nt.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),lt.get(A.texture).__webglTexture=k,lt.get(A.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:ft,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,k){const ft=lt.get(A);ft.__webglFramebuffer=k,ft.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(A,k=0,ft=0){ot=A,B=k,V=ft;let nt=null,it=!1,Pt=!1;if(A){const Lt=lt.get(A);if(Lt.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(Z.FRAMEBUFFER,Lt.__webglFramebuffer),N.copy(A.viewport),$.copy(A.scissor),ht=A.scissorTest,b.viewport(N),b.scissor($),b.setScissorTest(ht),et=-1;return}else if(Lt.__webglFramebuffer===void 0)mt.setupRenderTarget(A);else if(Lt.__hasExternalTextures)mt.rebindTextures(A,lt.get(A.texture).__webglTexture,lt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const ce=A.depthTexture;if(Lt.__boundDepthTexture!==ce){if(ce!==null&&lt.has(ce)&&(A.width!==ce.image.width||A.height!==ce.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");mt.setupDepthRenderbuffer(A)}}const Ft=A.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(Pt=!0);const Ht=lt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ht[k])?nt=Ht[k][ft]:nt=Ht[k],it=!0):A.samples>0&&mt.useMultisampledRTT(A)===!1?nt=lt.get(A).__webglMultisampledFramebuffer:Array.isArray(Ht)?nt=Ht[ft]:nt=Ht,N.copy(A.viewport),$.copy(A.scissor),ht=A.scissorTest}else N.copy(Ot).multiplyScalar(pt).floor(),$.copy(se).multiplyScalar(pt).floor(),ht=Ze;if(ft!==0&&(nt=j),b.bindFramebuffer(Z.FRAMEBUFFER,nt)&&b.drawBuffers(A,nt),b.viewport(N),b.scissor($),b.setScissorTest(ht),it){const Lt=lt.get(A.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_CUBE_MAP_POSITIVE_X+k,Lt.__webglTexture,ft)}else if(Pt){const Lt=k;for(let Ft=0;Ft<A.textures.length;Ft++){const Ht=lt.get(A.textures[Ft]);Z.framebufferTextureLayer(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0+Ft,Ht.__webglTexture,ft,Lt)}}else if(A!==null&&ft!==0){const Lt=lt.get(A.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,Lt.__webglTexture,ft)}et=-1};function Qr(A){const k=lt.get(A);return(k.__readFormat!==A.format||k.__readType!==A.type)&&(k.__readFormat=A.format,k.__readType=A.type,k.__formatReadable=z.textureFormatReadable(A.format),k.__typeReadable=z.textureTypeReadable(A.type)),k}this.readRenderTargetPixels=function(A,k,ft,nt,it,Pt,Vt,Lt=0){if(!(A&&A.isWebGLRenderTarget)){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=lt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Vt!==void 0&&(Ft=Ft[Vt]),Ft){b.bindFramebuffer(Z.FRAMEBUFFER,Ft);try{const Ht=A.textures[Lt],ce=Ht.format,me=Ht.type;A.textures.length>1&&Z.readBuffer(Z.COLOR_ATTACHMENT0+Lt);const Wt=Qr(Ht);if(Wt.__formatReadable===!1){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Wt.__typeReadable===!1){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=A.width-nt&&ft>=0&&ft<=A.height-it&&Z.readPixels(k,ft,nt,it,wt.convert(ce),wt.convert(me),Pt)}finally{const Ht=ot!==null?lt.get(ot).__webglFramebuffer:null;b.bindFramebuffer(Z.FRAMEBUFFER,Ht)}}},this.readRenderTargetPixelsAsync=async function(A,k,ft,nt,it,Pt,Vt,Lt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=lt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Vt!==void 0&&(Ft=Ft[Vt]),Ft)if(k>=0&&k<=A.width-nt&&ft>=0&&ft<=A.height-it){b.bindFramebuffer(Z.FRAMEBUFFER,Ft);const Ht=A.textures[Lt],ce=Ht.format,me=Ht.type;A.textures.length>1&&Z.readBuffer(Z.COLOR_ATTACHMENT0+Lt);const Wt=Qr(Ht);if(Wt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Wt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ae=Z.createBuffer();Z.bindBuffer(Z.PIXEL_PACK_BUFFER,Ae),Z.bufferData(Z.PIXEL_PACK_BUFFER,Pt.byteLength,Z.STREAM_READ),Z.readPixels(k,ft,nt,it,wt.convert(ce),wt.convert(me),0),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,null);const Ke=ot!==null?lt.get(ot).__webglFramebuffer:null;b.bindFramebuffer(Z.FRAMEBUFFER,Ke);const Ye=Z.fenceSync(Z.SYNC_GPU_COMMANDS_COMPLETE,0);return Z.flush(),await JM(Z,Ye,4),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,Ae),Z.getBufferSubData(Z.PIXEL_PACK_BUFFER,0,Pt),Z.bindBuffer(Z.PIXEL_PACK_BUFFER,null),Z.deleteBuffer(Ae),Z.deleteSync(Ye),Pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,k=null,ft=0){const nt=Math.pow(2,-ft),it=Math.floor(A.image.width*nt),Pt=Math.floor(A.image.height*nt),Vt=k!==null?k.x:0,Lt=k!==null?k.y:0;mt.setTexture2D(A,0),Z.copyTexSubImage2D(Z.TEXTURE_2D,ft,0,0,Vt,Lt,it,Pt),b.unbindTexture()},this.copyTextureToTexture=function(A,k,ft=null,nt=null,it=0,Pt=0){let Vt,Lt,Ft,Ht,ce,me,Wt,Ae,Ke;const Ye=A.isCompressedTexture?A.mipmaps[Pt]:A.image;if(ft!==null)Vt=ft.max.x-ft.min.x,Lt=ft.max.y-ft.min.y,Ft=ft.isBox3?ft.max.z-ft.min.z:1,Ht=ft.min.x,ce=ft.min.y,me=ft.isBox3?ft.min.z:0;else{const je=Math.pow(2,-it);Vt=Math.floor(Ye.width*je),Lt=Math.floor(Ye.height*je),A.isDataArrayTexture?Ft=Ye.depth:A.isData3DTexture?Ft=Math.floor(Ye.depth*je):Ft=1,Ht=0,ce=0,me=0}nt!==null?(Wt=nt.x,Ae=nt.y,Ke=nt.z):(Wt=0,Ae=0,Ke=0);const he=wt.convert(k.format),hn=wt.convert(k.type);let kt;k.isData3DTexture?(mt.setTexture3D(k,0),kt=Z.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(mt.setTexture2DArray(k,0),kt=Z.TEXTURE_2D_ARRAY):(mt.setTexture2D(k,0),kt=Z.TEXTURE_2D),b.activeTexture(Z.TEXTURE0),b.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,k.flipY),b.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),b.pixelStorei(Z.UNPACK_ALIGNMENT,k.unpackAlignment);const vn=b.getParameter(Z.UNPACK_ROW_LENGTH),de=b.getParameter(Z.UNPACK_IMAGE_HEIGHT),Gn=b.getParameter(Z.UNPACK_SKIP_PIXELS),ai=b.getParameter(Z.UNPACK_SKIP_ROWS),Vn=b.getParameter(Z.UNPACK_SKIP_IMAGES);b.pixelStorei(Z.UNPACK_ROW_LENGTH,Ye.width),b.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,Ye.height),b.pixelStorei(Z.UNPACK_SKIP_PIXELS,Ht),b.pixelStorei(Z.UNPACK_SKIP_ROWS,ce),b.pixelStorei(Z.UNPACK_SKIP_IMAGES,me);const za=A.isDataArrayTexture||A.isData3DTexture,Ue=k.isDataArrayTexture||k.isData3DTexture;if(A.isDepthTexture){const je=lt.get(A),gi=lt.get(k),He=lt.get(je.__renderTarget),Vi=lt.get(gi.__renderTarget);b.bindFramebuffer(Z.READ_FRAMEBUFFER,He.__webglFramebuffer),b.bindFramebuffer(Z.DRAW_FRAMEBUFFER,Vi.__webglFramebuffer);for(let wi=0;wi<Ft;wi++)za&&(Z.framebufferTextureLayer(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,lt.get(A).__webglTexture,it,me+wi),Z.framebufferTextureLayer(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,lt.get(k).__webglTexture,Pt,Ke+wi)),Z.blitFramebuffer(Ht,ce,Vt,Lt,Wt,Ae,Vt,Lt,Z.DEPTH_BUFFER_BIT,Z.NEAREST);b.bindFramebuffer(Z.READ_FRAMEBUFFER,null),b.bindFramebuffer(Z.DRAW_FRAMEBUFFER,null)}else if(it!==0||A.isRenderTargetTexture||lt.has(A)){const je=lt.get(A),gi=lt.get(k);b.bindFramebuffer(Z.READ_FRAMEBUFFER,q),b.bindFramebuffer(Z.DRAW_FRAMEBUFFER,Q);for(let He=0;He<Ft;He++)za?Z.framebufferTextureLayer(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,je.__webglTexture,it,me+He):Z.framebufferTexture2D(Z.READ_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,je.__webglTexture,it),Ue?Z.framebufferTextureLayer(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,gi.__webglTexture,Pt,Ke+He):Z.framebufferTexture2D(Z.DRAW_FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_2D,gi.__webglTexture,Pt),it!==0?Z.blitFramebuffer(Ht,ce,Vt,Lt,Wt,Ae,Vt,Lt,Z.COLOR_BUFFER_BIT,Z.NEAREST):Ue?Z.copyTexSubImage3D(kt,Pt,Wt,Ae,Ke+He,Ht,ce,Vt,Lt):Z.copyTexSubImage2D(kt,Pt,Wt,Ae,Ht,ce,Vt,Lt);b.bindFramebuffer(Z.READ_FRAMEBUFFER,null),b.bindFramebuffer(Z.DRAW_FRAMEBUFFER,null)}else Ue?A.isDataTexture||A.isData3DTexture?Z.texSubImage3D(kt,Pt,Wt,Ae,Ke,Vt,Lt,Ft,he,hn,Ye.data):k.isCompressedArrayTexture?Z.compressedTexSubImage3D(kt,Pt,Wt,Ae,Ke,Vt,Lt,Ft,he,Ye.data):Z.texSubImage3D(kt,Pt,Wt,Ae,Ke,Vt,Lt,Ft,he,hn,Ye):A.isDataTexture?Z.texSubImage2D(Z.TEXTURE_2D,Pt,Wt,Ae,Vt,Lt,he,hn,Ye.data):A.isCompressedTexture?Z.compressedTexSubImage2D(Z.TEXTURE_2D,Pt,Wt,Ae,Ye.width,Ye.height,he,Ye.data):Z.texSubImage2D(Z.TEXTURE_2D,Pt,Wt,Ae,Vt,Lt,he,hn,Ye);b.pixelStorei(Z.UNPACK_ROW_LENGTH,vn),b.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,de),b.pixelStorei(Z.UNPACK_SKIP_PIXELS,Gn),b.pixelStorei(Z.UNPACK_SKIP_ROWS,ai),b.pixelStorei(Z.UNPACK_SKIP_IMAGES,Vn),Pt===0&&k.generateMipmaps&&Z.generateMipmap(kt),b.unbindTexture()},this.initRenderTarget=function(A){lt.get(A).__webglFramebuffer===void 0&&mt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?mt.setTextureCube(A,0):A.isData3DTexture?mt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?mt.setTexture2DArray(A,0):mt.setTexture2D(A,0),b.unbindTexture()},this.resetState=function(){B=0,V=0,ot=null,b.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=be._getDrawingBufferColorSpace(t),i.unpackColorSpace=be._getUnpackColorSpace()}}const av={type:"change"},dp={type:"start"},Jv={type:"end"},Zc=new op,sv=new Aa,tR=Math.cos(70*kd.DEG2RAD),xn=new tt,ei=2*Math.PI,Be={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ad=1e-6;class eR extends eE{constructor(t,i=null){super(t,i),this.state=Be.NONE,this.target=new tt,this.cursor=new tt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Hr.ROTATE,MIDDLE:Hr.DOLLY,RIGHT:Hr.PAN},this.touches={ONE:Br.ROTATE,TWO:Br.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new tt,this._lastQuaternion=new ds,this._lastTargetPosition=new tt,this._quat=new ds().setFromUnitVectors(t.up,new tt(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new O_,this._sphericalDelta=new O_,this._scale=1,this._panOffset=new tt,this._rotateStart=new ae,this._rotateEnd=new ae,this._rotateDelta=new ae,this._panStart=new ae,this._panEnd=new ae,this._panDelta=new ae,this._dollyStart=new ae,this._dollyEnd=new ae,this._dollyDelta=new ae,this._dollyDirection=new tt,this._mouse=new ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=iR.bind(this),this._onPointerDown=nR.bind(this),this._onPointerUp=aR.bind(this),this._onContextMenu=fR.bind(this),this._onMouseWheel=oR.bind(this),this._onKeyDown=lR.bind(this),this._onTouchStart=cR.bind(this),this._onTouchMove=uR.bind(this),this._onMouseDown=sR.bind(this),this._onMouseMove=rR.bind(this),this._interceptControlDown=hR.bind(this),this._interceptControlUp=dR.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Be.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(av),this.update(),this.state=Be.NONE}pan(t,i){this._pan(t,i),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const i=this.object.position;xn.copy(i).sub(this.target),xn.applyQuaternion(this._quat),this._spherical.setFromVector3(xn),this.autoRotate&&this.state===Be.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=ei:s>Math.PI&&(s-=ei),l<-Math.PI?l+=ei:l>Math.PI&&(l-=ei),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(xn.setFromSpherical(this._spherical),xn.applyQuaternion(this._quatInverse),i.copy(this.target).add(xn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const p=xn.length();f=this._clampDistance(p*this._scale);const m=p-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const p=new tt(this._mouse.x,this._mouse.y,0);p.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const d=new tt(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(p),this.object.updateMatrixWorld(),f=xn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Zc.origin.copy(this.object.position),Zc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Zc.direction))<tR?this.object.lookAt(this.target):(sv.setFromNormalAndCoplanarPoint(this.object.up,this.target),Zc.intersectPlane(sv,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>ad||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ad||this._lastTargetPosition.distanceToSquared(this.target)>ad?(this.dispatchEvent(av),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ei/60*this.autoRotateSpeed*t:ei/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){xn.setFromMatrixColumn(i,0),xn.multiplyScalar(-t),this._panOffset.add(xn)}_panUp(t,i){this.screenSpacePanning===!0?xn.setFromMatrixColumn(i,1):(xn.setFromMatrixColumn(i,0),xn.crossVectors(this.object.up,xn)),xn.multiplyScalar(t),this._panOffset.add(xn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;xn.copy(l).sub(this.target);let c=xn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=i-s.top,f=s.width,p=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/p)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ei*this._rotateDelta.x/i.clientHeight),this._rotateUp(ei*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ei*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ei*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ei*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ei*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ei*this._rotateDelta.x/i.clientHeight),this._rotateUp(ei*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(t.pageX+i.x)*.5,p=(t.pageY+i.y)*.5;this._updateZoomParameters(f,p)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new ae,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function nR(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function iR(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function aR(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Jv),this.state=Be.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function sR(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Hr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=Be.DOLLY;break;case Hr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Be.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Be.ROTATE}break;case Hr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Be.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Be.PAN}break;default:this.state=Be.NONE}this.state!==Be.NONE&&this.dispatchEvent(dp)}function rR(r){switch(this.state){case Be.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case Be.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case Be.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function oR(r){this.enabled===!1||this.enableZoom===!1||this.state!==Be.NONE||(r.preventDefault(),this.dispatchEvent(dp),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Jv))}function lR(r){this.enabled!==!1&&this._handleKeyDown(r)}function cR(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Br.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=Be.TOUCH_ROTATE;break;case Br.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=Be.TOUCH_PAN;break;default:this.state=Be.NONE}break;case 2:switch(this.touches.TWO){case Br.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=Be.TOUCH_DOLLY_PAN;break;case Br.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=Be.TOUCH_DOLLY_ROTATE;break;default:this.state=Be.NONE}break;default:this.state=Be.NONE}this.state!==Be.NONE&&this.dispatchEvent(dp)}function uR(r){switch(this._trackPointer(r),this.state){case Be.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case Be.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case Be.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case Be.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=Be.NONE}}function fR(r){this.enabled!==!1&&r.preventDefault()}function hR(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function dR(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function pp(r){let t=r>>>0;return()=>{t=t+1831565813>>>0;let i=t;return i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296}}function Kc(r,t,i){let s=Math.imul(r,668265261)^Math.imul(t,374761393)^Math.imul(i,2654435761);return s=Math.imul(s^s>>>15,2246822507),s=Math.imul(s^s>>>13,3266489909),((s^s>>>16)>>>0)/4294967296}function rv(r){return r*r*(3-2*r)}function jv(r,t,i){const s=Math.floor(r),l=Math.floor(t),c=rv(r-s),f=rv(t-l),p=Kc(s,l,i),m=Kc(s+1,l,i),d=Kc(s,l+1,i),_=Kc(s+1,l+1,i),v=p+(m-p)*c,g=d+(_-d)*c;return v+(g-v)*f}function mp(r,t,i,s,l=2,c=.5){let f=1,p=1,m=0,d=0;for(let _=0;_<s;_++)m+=f*jv(r*p,t*p,i+_*1013),d+=f,f*=c,p*=l;return m/d}function pR(r,t,i,s){let l=.5,c=1,f=0,p=0,m=1;for(let d=0;d<s;d++){const _=jv(r*c,t*c,i+d*7919);let v=1-Math.abs(_*2-1);v*=v,v*=m,m=Math.min(1,Math.max(0,v*2)),f+=l*v,p+=l,l*=.52,c*=2.03}return f/p}function eu(r,t,i){return r<t?t:r>i?i:r}function Qo(r,t,i){if(r===t)return i<r?0:1;const s=eu((i-r)/(t-r),0,1);return s*s*(3-2*s)}function nu(r,t,i){return r+(t-r)*i}function cl(){return{positions:[],normals:[],uvs:[],colors:[]}}function zi(r,t,i,s,l,c,f,p,m,d,_,v,g,x){r.positions.push(t[0],t[1],t[2],i[0],i[1],i[2],s[0],s[1],s[2],l[0],l[1],l[2]);for(let E=0;E<4;E++)r.normals.push(c[0],c[1],c[2]);r.uvs.push(f[0],f[1],p[0],p[1],m[0],m[1],d[0],d[1]),r.colors.push(_[0],_[1],_[2],v[0],v[1],v[2],g[0],g[1],g[2],x[0],x[1],x[2])}function pi(r,t,i,s,l){const c=l??new Set,[f,p,m]=t,[d,_,v]=i;c.has("+y")||zi(r,[f,_,m],[f,_,v],[d,_,v],[d,_,m],[0,1,0],[f,m],[f,v],[d,v],[d,m],s,s,s,s),c.has("-y")||zi(r,[f,p,v],[f,p,m],[d,p,m],[d,p,v],[0,-1,0],[f,v],[f,m],[d,m],[d,v],s,s,s,s),c.has("+x")||zi(r,[d,p,v],[d,p,m],[d,_,m],[d,_,v],[1,0,0],[v,p],[m,p],[m,_],[v,_],s,s,s,s),c.has("-x")||zi(r,[f,p,m],[f,p,v],[f,_,v],[f,_,m],[-1,0,0],[m,p],[v,p],[v,_],[m,_],s,s,s,s),c.has("+z")||zi(r,[f,p,v],[d,p,v],[d,_,v],[f,_,v],[0,0,1],[f,p],[d,p],[d,_],[f,_],s,s,s,s),c.has("-z")||zi(r,[d,p,m],[f,p,m],[f,_,m],[d,_,m],[0,0,-1],[d,p],[f,p],[f,_],[d,_],s,s,s,s)}function ul(r){const t=new ni;t.setAttribute("position",new Mn(r.positions,3)),t.setAttribute("normal",new Mn(r.normals,3)),t.setAttribute("uv",new Mn(r.uvs,2)),t.setAttribute("color",new Mn(r.colors,3));const i=r.positions.length/12,s=new Uint32Array(i*6);for(let l=0;l<i;l++){const c=l*4,f=l*6;s[f]=c,s[f+1]=c+1,s[f+2]=c+2,s[f+3]=c,s[f+4]=c+2,s[f+5]=c+3}return t.setIndex(new Hi(s,1)),t.computeBoundingSphere(),t}const mR=[{x:-.1,z:-.06,r:.5,h:1},{x:.47,z:.19,r:.29,h:.6},{x:-.47,z:.31,r:.26,h:.54},{x:.1,z:.55,r:.21,h:.4},{x:-.63,z:-.4,r:.19,h:.32}];function gR(r,t,i){let s=0;for(const m of mR){const d=(r-m.x)*1.15,_=(t-m.z)*1,v=(d*d+_*_)/(m.r*m.r);s+=m.h*Math.exp(-v)}const l=pR(r*1.55+11.3,t*1.55-7.1,i.seed,5);s+=l*l*.5*i.ridgeSharpness;const c=mp(r*6.2,t*6.2,i.seed+977,3);s+=(c-.5)*.07;const f=Math.min(1-Math.abs(r),1-Math.abs(t)),p=Qo(0,.2,f);return s*(.14+.86*p)+.015}class _R{keys=[];values=[];get size(){return this.keys.length}push(t,i){this.keys.push(t),this.values.push(i);let s=this.keys.length-1;for(;s>0;){const l=s-1>>1;if(this.keys[l]<=this.keys[s])break;this.swap(s,l),s=l}}pop(){if(this.keys.length===0)return;const t=this.keys[0],i=this.values[0],s=this.keys.pop(),l=this.values.pop();if(this.keys.length>0){this.keys[0]=s,this.values[0]=l;let c=0;for(;;){const f=c*2+1,p=f+1;let m=c;if(f<this.keys.length&&this.keys[f]<this.keys[m]&&(m=f),p<this.keys.length&&this.keys[p]<this.keys[m]&&(m=p),m===c)break;this.swap(c,m),c=m}}return{key:t,value:i}}swap(t,i){const s=this.keys[t];this.keys[t]=this.keys[i],this.keys[i]=s;const l=this.values[t];this.values[t]=this.values[i],this.values[i]=l}}function vR(r,t){const i=new Float64Array(t*t).fill(1/0),s=new _R;for(let l=0;l<t;l++)for(let c=0;c<t;c++)if(r[l*t+c]<=3){const f=l*t+c;i[f]=0,s.push(0,f)}for(;s.size>0;){const l=s.pop();if(!l)break;const c=l.value,f=l.key;if(f>i[c])continue;const p=c%t,m=(c-p)/t,d=r[c];for(const[_,v]of gp){const g=p+_,x=m+v;if(g<0||x<0||g>=t||x>=t)continue;const E=x*t+g,R=r[E],y=Math.hypot(_,v),S=Math.max(0,R-d),P=f+y+S*3.5;P<i[E]&&(i[E]=P,s.push(P,E))}}return i}function SR(r,t,i){let s=0;for(let m=0;m<r.length;m++)s=Math.max(s,r[m]);const l=s*.5,c=[];for(let m=0;m<t;m++)for(let d=0;d<t;d++){const _=r[m*t+d];_>=l&&c.push({x:d,z:m,h:_})}c.sort((m,d)=>d.h-m.h);const f=t*.22,p=[];for(const m of c){if(p.length>=i)break;let d=!0;for(const _ of p)if(Math.hypot(m.x-_.x,m.z-_.z)<f){d=!1;break}d&&p.push(m)}return p}const gp=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];function xR(r,t,i,s){const l=[];let c=s.x,f=s.z,p=0,m=0;const d=new Set;for(let _=0;_<i*10;_++){const v=f*i+c;if(d.has(v))break;d.add(v);const g=r[v];if(l.push({x:c,z:f,h:g,dirX:p,dirZ:m}),g<=2.5)break;let x=0,E=0,R=1/0;for(const[y,S]of gp){const P=c+y,I=f+S;if(P<0||I<0||P>=i||I>=i)continue;const C=I*i+P,L=g-r[C],U=t[C]-L*.001;U<R&&(R=U,x=y,E=S)}if(!Number.isFinite(R))break;p=x,m=E,c+=x,f+=E}return l}function MR(r,t,i,s,l){const c=i[s],f=i[Math.min(i.length-1,s+1)];let p=f.x-c.x,m=f.z-c.z;const d=Math.hypot(p,m);if(d===0)return!1;p/=d,m/=d;const _=-m,v=p,g=Math.round(Math.min(28,Math.max(12,l*.34))),x=3.2,E=4,R=16;for(let y=0;y<t;y++)for(let S=0;S<t;S++){const P=S-c.x,I=y-c.z,C=P*p+I*m;if(C<=.6||C>R||Math.abs(P*_+I*v)>x)continue;const U=C<=E?g:Math.round(g*(1-(C-E)/R)),O=y*t+S;r[O]=Math.max(0,r[O]-U)}return!0}function yR(r){const t=r.size,i=(t-1)/2,s=new Float32Array(t*t);for(let _=0;_<t;_++)for(let v=0;v<t;v++){const g=(v-i)/i,x=(_-i)/i,E=gR(g,x,r)*r.peakHeight;s[_*t+v]=E}let l=0;for(let _=0;_<s.length;_++)s[_]=Math.max(0,Math.round(s[_])),s[_]>l&&(l=s[_]);const c=vR(s,t),f=SR(s,t,Math.max(1,r.waterStreams)),p=[];for(let _=0;_<f.length;_++){const v=f[_],g=xR(s,c,t,v);if(g.length<8)continue;for(let U=-2;U<=2;U++)for(let O=-2;O<=2;O++){const T=v.x+O,D=v.z+U;if(T<0||D<0||T>=t||D>=t)continue;const F=Math.hypot(O,U);if(F>2.2)continue;const H=D*t+T;s[H]=Math.min(s[H],Math.max(0,v.h-(F<1.6?2:1)))}const x=Math.max(4,Math.min(g.length-6,Math.round(g.length*.45))),E=MR(s,t,g,x,r.peakHeight);if(E){const U=g[Math.min(g.length-1,x+4)],O=Math.max(0,s[U.z*t+U.x]);for(let T=-3;T<=3;T++)for(let D=-3;D<=3;D++){const F=U.x+D,H=U.z+T;if(F<0||H<0||F>=t||H>=t)continue;const W=H*t+F;s[W]=Math.min(s[W],O)}}const R=g[g.length-1],y=6;let S=1/0;for(let U=-7;U<=7;U++)for(let O=-7;O<=7;O++){const T=R.x+O,D=R.z+U;if(T<0||D<0||T>=t||D>=t)continue;const F=Math.hypot(O,U);if(F>y)continue;const H=D*t+T,W=Math.max(0,R.h-2-Math.max(0,F-y+2));s[H]=Math.min(s[H],W),S=Math.min(S,s[H])}const P=(Number.isFinite(S)?S:R.h-2)+1,I=[];let C=1/0;for(const U of g){const O=U.z*t+U.x,T=Math.min(s[O]+1,C);I.push(T),C=T}const L=[{x:R.x-i,z:R.z-i,level:P,radius:y+2}];if(E){const U=g[Math.min(g.length-1,x+4)],O=U.z*t+U.x;L.push({x:U.x-i,z:U.z-i,level:s[O]+1,radius:4.2})}p.push({id:_,path:g,surface:I,pools:L})}const m=new Float32Array(t*t);for(let _=0;_<t;_++)for(let v=0;v<t;v++){const g=s[_*t+v];let x=0;for(const[E,R]of gp){const y=v+E,S=_+R;y<0||S<0||y>=t||S>=t||(x=Math.max(x,Math.abs(g-s[S*t+y])))}m[_*t+v]=x}let d=0;for(const _ of p)for(const v of _.pools)d=Math.max(d,v.level);return{options:r,size:t,half:i,maxHeight:l,heights:s,slope:m,waterfalls:p,waterLevel:d}}const $v=new Kt("#4f7f31"),ER=new Kt("#86b455"),bR=new Kt("#6b717a"),tS=new Kt("#979da6"),eS=new Kt("#eef4fb"),TR=new Kt("#c9ad7c"),AR=new Kt("#6d5136"),RR=[.5,.7,.86,1];function ov(r,t,i,s){return s.setRGB(nu(r.r,t.r,i),nu(r.g,t.g,i),nu(r.b,t.b,i)),s}function CR(r,t,i,s,l){const{options:c,maxHeight:f,slope:p,size:m}=r,d=f>0?s/f:0,_=eu(p[i*m+t]/5,0,1),v=mp(t*.09,i*.09,c.seed+313,2),g=eu(Qo(.42,.85,d)*.85+_*.55,0,1),x=Qo(c.snowLine,c.snowLine+.07,d),E=Qo(.02,.06,d)*(1-Qo(c.treeLine,c.treeLine+.16,d));ov($v,ER,v,l);const R=new Kt;return ov(bR,tS,v*.8+.1,R),l.lerp(R,g),l.lerp(eS,x),s<=2&&l.lerp(TR,eu(1-s/2,0,1)*.85),{rock:g,snow:x,grass:E>.35}}function wR(r){const{size:t,half:i,heights:s}=r,l=cl(),c=new Kt,f=new Kt,p=(v,g)=>v<0||g<0||v>=t||g>=t?0:s[g*t+v],m=(v,g,x)=>p(v,g)>x,d=(v,g,x,E,R)=>{const y=E===v?-1:1,S=R===g?-1:1,P=m(v+y,g,x)?1:0,I=m(v,g+S,x)?1:0,C=m(v+y,g+S,x)?1:0,L=P&&I?0:3-(P+I+C);return RR[L]};for(let v=0;v<t;v++)for(let g=0;g<t;g++){const x=s[v*t+g];if(x<=0)continue;const E=g-i,R=v-i,y=CR(r,g,v,x,c),S=.94+(g*73856093^v*19349663)%97/97*.12;c.multiplyScalar(S);const P=d(g,v,x,g,v),I=d(g,v,x,g,v+1),C=d(g,v,x,g+1,v+1),L=d(g,v,x,g+1,v),U=D=>(f.copy(c).multiplyScalar(D),[f.r,f.g,f.b]);zi(l,[E,x,R],[E,x,R+1],[E+1,x,R+1],[E+1,x,R],[0,1,0],[g,v],[g,v+1],[g+1,v+1],[g+1,v],U(P),U(I),U(C),U(L));const O=(D,F)=>{if(D>=x)return;const W=y.grass&&!y.snow&&x-D>=1?x-1:D;W>D&&F(D,W),F(W,x)},T=(D,F,H)=>{const W=y.snow>.4?eS:y.rock>.5?tS:AR;f.copy(W).multiplyScalar(.8+.2*((g*31+v*17)%11)/11);const j=B=>{const V=F===D?1:(B-D)/(F-D);return nu(.64,1,V)},q=[f.r*j(D),f.g*j(D),f.b*j(D)],Q=[f.r*j(F),f.g*j(F),f.b*j(F)];if(H&&!y.snow){const B=$v.clone().multiplyScalar(.95);return[[B.r,B.g,B.b],[B.r,B.g,B.b],Q,Q]}return[q,q,Q,Q]};O(p(g-1,v),(D,F)=>{const H=T(D,F,D>=x-1);zi(l,[E,D,R],[E,D,R+1],[E,F,R+1],[E,F,R],[-1,0,0],[v,D],[v+1,D],[v+1,F],[v,F],H[0],H[1],H[2],H[3])}),O(p(g+1,v),(D,F)=>{const H=T(D,F,D>=x-1);zi(l,[E+1,D,R+1],[E+1,D,R],[E+1,F,R],[E+1,F,R+1],[1,0,0],[v+1,D],[v,D],[v,F],[v+1,F],H[0],H[1],H[2],H[3])}),O(p(g,v-1),(D,F)=>{const H=T(D,F,D>=x-1);zi(l,[E,D,R],[E,F,R],[E+1,F,R],[E+1,D,R],[0,0,-1],[g,D],[g,F],[g+1,F],[g+1,D],H[0],H[1],H[2],H[3])}),O(p(g,v+1),(D,F)=>{const H=T(D,F,D>=x-1);zi(l,[E,D,R+1],[E+1,D,R+1],[E+1,F,R+1],[E,F,R+1],[0,0,1],[g,D],[g+1,D],[g+1,F],[g,F],H[0],H[1],H[2],H[3])})}return{geometry:ul(l)}}function gu(r){const t=document.createElement("canvas");t.width=r,t.height=r;const i=t.getContext("2d");if(!i)throw new Error("2D canvas context is unavailable");return{canvas:t,ctx:i}}function DR(){const{canvas:t,ctx:i}=gu(32),s=pp(388817),l=i.createImageData(32,32);for(let f=0;f<1024;f++){const p=196+Math.floor(s()*59);l.data[f*4+0]=p,l.data[f*4+1]=p,l.data[f*4+2]=p,l.data[f*4+3]=255}i.putImageData(l,0,0),i.globalAlpha=.3,i.fillStyle="#000000",i.fillRect(30,0,2,32),i.fillRect(0,30,32,2),i.globalAlpha=1;const c=new hu(t);return c.wrapS=Vs,c.wrapT=Vs,c.magFilter=Rn,c.minFilter=Ca,c.generateMipmaps=!0,c.colorSpace=On,c}function UR(){const{canvas:t,ctx:i}=gu(64),s=pp(501733);i.fillStyle="#cfe9ff",i.fillRect(0,0,64,64);for(let c=0;c<90;c++){const f=Math.floor(s()*64),p=1+Math.floor(s()*3),m=150+Math.floor(s()*105);i.fillStyle=`rgba(${m},${m+18},255,${.25+s()*.5})`,i.fillRect(f,0,p,64)}for(let c=0;c<40;c++){const f=Math.floor(s()*64),p=1+Math.floor(s()*2);i.fillStyle=`rgba(255,255,255,${.15+s()*.4})`,i.fillRect(f,0,p,64)}const l=new hu(t);return l.wrapS=Vs,l.wrapT=Vs,l.magFilter=Pn,l.minFilter=Ca,l.colorSpace=On,l}function LR(){const{canvas:t,ctx:i}=gu(64),s=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);s.addColorStop(0,"rgba(255,255,255,0.95)"),s.addColorStop(.35,"rgba(224,242,255,0.55)"),s.addColorStop(1,"rgba(200,230,255,0)"),i.fillStyle=s,i.fillRect(0,0,64,64);const l=new hu(t);return l.colorSpace=On,l}function NR(){const{canvas:t,ctx:i}=gu(64),s=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);s.addColorStop(0,"rgba(255,255,255,0.7)"),s.addColorStop(.45,"rgba(236,246,255,0.32)"),s.addColorStop(1,"rgba(220,238,255,0)"),i.fillStyle=s,i.fillRect(0,0,64,64);const l=new hu(t);return l.colorSpace=On,l}const lv=[.74,.9,1],OR=2.9;function PR(r,t){const i=cl(),{half:s,heights:l,size:c}=r,{path:f,surface:p}=t;for(let m=0;m<f.length;m++){const d=f[m],_=p[m],v=l[d.z*c+d.x],g=[[d.x,d.z]],x=d.dirX,E=d.dirZ,R=Math.hypot(x,E);if(R>0){const y=-E/R,S=x/R;for(const P of[-1,1]){const I=Math.round(d.x+y*P),C=Math.round(d.z+S*P);I<0||C<0||I>=c||C>=c||l[C*c+I]>v+1||g.push([I,C])}}for(const[y,S]of g){const P=y-s,I=S-s;pi(i,[P+.02,_-.5,I+.02],[P+.98,_,I+.98],lv)}}for(let m=0;m<f.length-1;m++){const d=f[m],_=f[m+1],v=p[m],g=p[m+1];if(v-g<=.45)continue;const E=Math.sign(_.x-d.x),R=Math.sign(_.z-d.z),y=Math.hypot(E,R)||1,S=E/y,P=R/y,I=d.x-s+(E===0?0:E>0?1:0),C=d.z-s+(R===0?0:R>0?1:0),L=I+S*.08,U=C+P*.08,O=-P,T=S,D=OR,F=.2,H=L-Math.abs(O)*D-Math.abs(S)*F,W=L+Math.abs(O)*D+Math.abs(S)*F,j=U-Math.abs(T)*D-Math.abs(P)*F,q=U+Math.abs(T)*D+Math.abs(P)*F;pi(i,[Math.min(H,W),g-.3,Math.min(j,q)],[Math.max(H,W),v+.05,Math.max(j,q)],lv)}return ul(i)}const zR=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,IR=`
  precision highp float;
  uniform float uTime;
  uniform float uImpact;
  uniform vec3 uShallow;
  uniform vec3 uDeep;
  uniform vec3 uSky;
  uniform vec3 uSun;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;

    // Concentric ripples spreading from where the fall lands.
    float wave = sin(r * 34.0 - uTime * 4.0) * exp(-r * 3.2);
    float wave2 = sin(r * 61.0 - uTime * 6.3 + uImpact) * exp(-r * 5.0) * 0.5;
    float chop = noise(p * 9.0 + vec2(uTime * 0.35, -uTime * 0.22)) - 0.5;

    float depth = smoothstep(0.15, 1.0, r);
    vec3 color = mix(uShallow, uDeep, depth);
    float highlight = clamp(wave + wave2 + chop * 0.6, -1.0, 1.0);
    color += uSun * max(highlight, 0.0) * 0.55;
    color = mix(color, uSky, smoothstep(0.45, 1.0, r) * 0.45);

    float alpha = mix(0.85, 0.5, smoothstep(0.7, 1.0, r));
    alpha *= smoothstep(1.0, 0.92, r);
    gl_FragColor = vec4(color, alpha);
  }
`;function cv(r,t,i,s){const l=new Float32Array(t*3),c=new Float32Array(t*3),f=new Float32Array(t);for(let _=0;_<t;_++){const v=Math.random()*Math.PI*2,g=Math.random()*s.spread;l[_*3+0]=r.x+(Math.random()-.5)*s.span,l[_*3+1]=r.y+Math.random()*.8,l[_*3+2]=r.z+(Math.random()-.5)*s.span,c[_*3+0]=Math.cos(v)*g,c[_*3+1]=s.rise*(.6+Math.random()*.8),c[_*3+2]=Math.sin(v)*g,f[_]=Math.random()}const p=new ni;p.setAttribute("position",new Hi(l,3));const m=new Iv({size:s.size,map:i,transparent:!0,opacity:.6,depthWrite:!1,sizeAttenuation:!0}),d=new By(p,m);return d.frustumCulled=!1,{points:d,velocities:c,count:t,life:f,span:s.span,rise:s.rise,size:s.size}}function BR(r,t,i){const s=new hs,l=UR();l.repeat.set(1,1);const c=new Wy({map:l,color:16777215,transparent:!0,opacity:.9,shininess:120,specular:16777215,emissive:new Kt(5078942),emissiveIntensity:.85,side:Qi,depthWrite:!1}),f=LR(),p=NR(),m=[],d=[];for(const _ of r.waterfalls){const v=PR(r,_),g=new Hn(v,c);g.renderOrder=2,s.add(g);for(const x of _.pools){const E=new Ci({uniforms:{uTime:{value:0},uImpact:{value:_.id*1.7},uShallow:{value:new Kt(9425896)},uDeep:{value:new Kt(1924986)},uSky:{value:t.clone()},uSun:{value:i.clone()}},vertexShader:zR,fragmentShader:IR,transparent:!0,depthWrite:!1}),R=new Hn(new cp(x.radius,48),E);R.rotation.x=-Math.PI/2,R.position.set(x.x,x.level+.02,x.z),R.renderOrder=1,s.add(R),d.push(E);const y=new tt(x.x,x.level,x.z);m.push(cv(y,240,f,{size:1.4,rise:5.5,spread:2.6,span:x.radius*1.2})),m.push(cv(y,90,p,{size:6.5,rise:1.5,spread:1.1,span:x.radius*.9}))}}for(const _ of m)s.add(_.points);return{group:s,update:(_,v)=>{l.offset.y=(l.offset.y-v*1.5)%1;for(const g of d)g.uniforms.uTime.value=_;for(const g of m){const x=g.points.geometry.getAttribute("position"),E=x.array;for(let R=0;R<g.count;R++){const y=R*3;if(E[y+1]+=g.velocities[y+1]*v,E[y+0]+=g.velocities[y+0]*v,E[y+2]+=g.velocities[y+2]*v,g.velocities[y+1]-=3.4*v,g.life[R]+=v*.55,g.life[R]>1||E[y+1]<g.rise*.05){g.life[R]=0;const S=Math.random()*Math.PI*2,P=Math.random()*g.size*.4;E[y+0]=(Math.random()-.5)*g.span,E[y+2]=(Math.random()-.5)*g.span,E[y+1]=0,g.velocities[y+0]=Math.cos(S)*P,g.velocities[y+1]=g.rise*(.6+Math.random()*.8),g.velocities[y+2]=Math.sin(S)*P}}x.needsUpdate=!0}},dispose:()=>{l.dispose(),c.dispose(),f.dispose(),p.dispose(),s.traverse(_=>{const v=_;if(v.geometry&&v.geometry.dispose(),v.material){const g=v.material;Array.isArray(g)?g.forEach(x=>x.dispose()):g.dispose()}})}}}function FR(r){const t=new hs,i=cl(),s=6.4,l=Math.ceil(r.size*1.04/s),c=r.altitude,f=pp(r.seed+4021),p=(r.size-1)/2;for(let g=0;g<l;g++)for(let x=0;x<l;x++){const E=(x-l/2)*s,R=(g-l/2)*s,y=Math.hypot(E,R)/(r.size*.56);if(y>1)continue;const S=Math.round(E+p),P=Math.round(R+p);if(S<0||P<0||S>=r.size||P>=r.size||r.heights[P*r.size+S]<c*.5)continue;const C=mp(x*.13+4.1,g*.13-2.7,r.seed+71,4),L=.42-r.coverage*.26+y*.34;if(C<L)continue;const U=Math.min(1,(C-L)*4.5),O=s*(1.5+U*1.3),T=2.6+U*4.6,D=f()*1.6,F=.93+f()*.07;pi(i,[E-O/2,c+D,R-O/2],[E+O/2,c+D+T,R+O/2],[F,F,F*1.01]);const H=3+Math.floor(f()*4);for(let W=0;W<H;W++){const j=O*(.45+f()*.6),q=O*(.45+f()*.6),Q=T*(.5+f()*.8),B=(f()-.5)*O*1.3,V=(f()-.5)*O*1.3,ot=D+T*(f()*.8),et=.89+f()*.11;pi(i,[E+B-j/2,c+ot,R+V-q/2],[E+B+j/2,c+ot+Q,R+V+q/2],[et,et,et*1.02])}}const m=ul(i),d=new ll({color:16777215,vertexColors:!0,transparent:!0,opacity:.95,emissive:new Kt(9346482),emissiveIntensity:.62}),_=new Hn(m,d);_.renderOrder=3,t.add(_);const v=r.size*.05;return{group:t,update:g=>{t.position.x=Math.sin(g*.035)*v,t.position.z=Math.cos(g*.021)*v*.6},dispose:()=>{m.dispose(),d.dispose()}}}const uv=[.33,.24,.16],HR=[.42,.31,.2],fv=[.22,.46,.18],hv=[.32,.58,.22],GR=[.13,.32,.22],VR=[.18,.4,.26],kR=[.44,.46,.5],XR=[.82,.24,.26],WR=[.93,.79,.29];function YR(r){const t=new hs,i=cl(),s=cl(),{size:l,half:c,heights:f,slope:p,maxHeight:m,options:d}=r,_=(I,C)=>{let L=Math.imul(I,73856093)^Math.imul(C,19349663)^d.seed;return L=Math.imul(L^L>>>13,1540483477),((L^L>>>15)>>>0)/4294967296},v=2,g=Math.round(m*d.treeLine);for(let I=1;I<l-1;I++)for(let C=1;C<l-1;C++){const L=f[I*l+C];if(L<=v||L>g||p[I*l+C]>2)continue;const U=_(C,I);if(U>.085)continue;const O=C-c+.5,T=I-c+.5;if(L/Math.max(1,m)>d.treeLine*.62){const H=2+Math.floor(U*5);pi(i,[O-.2,L,T-.2],[O+.2,L+H,T+.2],uv);let W=1.8,j=L+H*.45,q=0;for(;W>.2;){const Q=q%2===0?GR:VR;pi(i,[O-W,j,T-W],[O+W,j+1.1,T+W],Q),W-=.42,j+=1,q++}}else{const H=3+Math.floor(U*4);pi(i,[O-.25,L,T-.25],[O+.25,L+H,T+.25],U>.5?uv:HR);const W=1.75,j=1.05;pi(i,[O-W,L+H-.4,T-W],[O+W,L+H+.9,T+W],fv),pi(i,[O-j,L+H+.9,T-j],[O+j,L+H+2,T+j],hv),pi(i,[O-.55,L+H+2,T-.55],[O+.55,L+H+2.8,T+.55],fv)}}for(let I=0;I<l;I++)for(let C=0;C<l;C++){const L=f[I*l+C];if(L<=1)continue;const U=_(C*3+1,I*5-2);if(U>.02||p[I*l+C]>1)continue;const O=C-c+.5,T=I-c+.5,D=.3+U*9;pi(s,[O-D,L-.1,T-D],[O+D,L+D*.9,T+D],kR)}for(let I=0;I<l;I++)for(let C=0;C<l;C++){const L=f[I*l+C];if(L<=1||L>g||p[I*l+C]>1)continue;const U=_(C*11-5,I*7+9);if(U>.16)continue;const O=C-c+.5,T=I-c+.5,D=.3+U*.5;if(pi(s,[O-.16,L,T-.16],[O+.16,L+D,T+.16],hv,new Set(["-y"])),U>.145){const F=(C+I)%3===0?XR:WR;pi(s,[O-.1,L+D,T-.1],[O+.1,L+D+.22,T+.1],F)}}const x=ul(i),E=new ll({vertexColors:!0}),R=new Hn(x,E);t.add(R);const y=ul(s),S=new ll({vertexColors:!0}),P=new Hn(y,S);return t.add(P),{group:t,dispose:()=>{x.dispose(),E.dispose(),y.dispose(),S.dispose()}}}const Jo=[{id:"dawn",label:"晨曦",sunColor:16757880,sunIntensity:2.4,sunElevation:11,sunAzimuth:108,topColor:1780822,horizonColor:15769695,hemiSky:10335453,hemiGround:7035461,hemiIntensity:.85,ambient:.18,fogDensity:.0032,exposure:1.05},{id:"morning",label:"清晨",sunColor:16773330,sunIntensity:2.9,sunElevation:33,sunAzimuth:74,topColor:4030150,horizonColor:13624566,hemiSky:11061482,hemiGround:6975577,hemiIntensity:.8,ambient:.14,fogDensity:.0022,exposure:1},{id:"noon",label:"正午",sunColor:16776692,sunIntensity:3.1,sunElevation:63,sunAzimuth:38,topColor:2912187,horizonColor:12376560,hemiSky:11128302,hemiGround:6253134,hemiIntensity:.75,ambient:.12,fogDensity:.0016,exposure:.95},{id:"dusk",label:"黄昏",sunColor:16747348,sunIntensity:2.2,sunElevation:7,sunAzimuth:248,topColor:1581126,horizonColor:14510908,hemiSky:8226496,hemiGround:5915699,hemiIntensity:.8,ambient:.16,fogDensity:.0036,exposure:1.05},{id:"night",label:"月夜",sunColor:10467055,sunIntensity:.55,sunElevation:46,sunAzimuth:300,topColor:263951,horizonColor:923696,hemiSky:2568783,hemiGround:1119775,hemiIntensity:.5,ambient:.1,fogDensity:.0042,exposure:1.2}],qR=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,ZR=`
  precision highp float;
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uSunColor;
  uniform vec3 uSunDirection;
  uniform float uSunStrength;
  varying vec3 vDir;

  void main() {
    vec3 dir = normalize(vDir);
    float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 color = mix(uHorizon, uTop, pow(h, 0.75));
    float sun = max(dot(dir, normalize(uSunDirection)), 0.0);
    color += uSunColor * pow(sun, 900.0) * 6.0 * uSunStrength;
    color += uSunColor * pow(sun, 12.0) * 0.28 * uSunStrength;
    color += uSunColor * pow(sun, 3.0) * 0.08 * uSunStrength;
    gl_FragColor = vec4(color, 1.0);
  }
`;function KR(){const r=new up(1,32,20),t=new Ci({uniforms:{uTop:{value:new Kt(2912187)},uHorizon:{value:new Kt(12376560)},uSunColor:{value:new Kt(16776692)},uSunDirection:{value:new tt(.4,.6,.6)},uSunStrength:{value:1}},vertexShader:qR,fragmentShader:ZR,side:Yn,depthWrite:!1,depthTest:!1}),i=new Hn(r,t);i.scale.setScalar(4e3),i.renderOrder=-1e3,i.frustumCulled=!1;const s=new Jy(16777215,3);s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.near=1,s.shadow.camera.far=900,s.shadow.bias=-9e-4,s.shadow.normalBias=.035;const l=new Zy(11128302,6253134,.75),c=new jy(16777215,.12),f=new tt;return{sky:i,sun:s,hemi:l,ambient:c,sunDirection:f,apply:p=>{const m=kd.degToRad(p.sunElevation),d=kd.degToRad(p.sunAzimuth);f.set(Math.cos(m)*Math.sin(d),Math.sin(m),Math.cos(m)*Math.cos(d)),t.uniforms.uTop.value.setHex(p.topColor),t.uniforms.uHorizon.value.setHex(p.horizonColor),t.uniforms.uSunColor.value.setHex(p.sunColor),t.uniforms.uSunDirection.value.copy(f),t.uniforms.uSunStrength.value=p.sunIntensity/2.6,s.color.setHex(p.sunColor),s.intensity=p.sunIntensity,s.position.copy(f).multiplyScalar(320),l.color.setHex(p.hemiSky),l.groundColor.setHex(p.hemiGround),l.intensity=p.hemiIntensity,c.intensity=p.ambient},dispose:()=>{r.dispose(),t.dispose()}}}const QR=r=>1-Math.pow(1-r,3),JR=r=>r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2;function qo(r,t,i,s){return new tt(r.x+s*Math.cos(i)*Math.sin(t),r.y+s*Math.sin(i),r.z+s*Math.cos(i)*Math.cos(t))}function jR({params:r,presetIndex:t,onStats:i,onBuildingChange:s}){const l=cn.useRef(null),c=cn.useRef(null),f=cn.useRef(r);f.current=r;const p=cn.useRef(t);p.current=t;const m=cn.useRef(i);m.current=i;const d=cn.useRef(s);return d.current=s,cn.useEffect(()=>{const _=l.current;if(!_)return;const v=new $A({antialias:!0,powerPreference:"high-performance",alpha:!1});v.setPixelRatio(Math.min(window.devicePixelRatio,2)),v.setSize(_.clientWidth,_.clientHeight),v.outputColorSpace=On,v.toneMapping=Kd,v.toneMappingExposure=1,v.shadowMap.enabled=!0,v.shadowMap.type=jo,_.appendChild(v.domElement);const g=new Cy,x=new Ri(45,_.clientWidth/Math.max(1,_.clientHeight),.5,9e3);x.position.set(190,130,230);const E=new eR(x,v.domElement);E.enableDamping=!0,E.dampingFactor=.07,E.minDistance=30,E.maxDistance=900,E.maxPolarAngle=Math.PI*.495,E.minPolarAngle=.08,E.target.set(0,22,0),E.autoRotateSpeed=.35;const R=KR();x.add(R.sky),g.add(x),g.add(R.sun),g.add(R.sun.target),g.add(R.hemi),g.add(R.ambient),R.sun.target.position.set(0,0,0);const y=new hs;g.add(y);const S=DR(),P=new ll({map:S,vertexColors:!0}),I={camera:x,controls:E,field:null,water:null,clouds:null,vegetation:null,sky:R,renderer:v,scene:g,worldGroup:y,terrainMesh:null,grainTexture:S,presetIndex:0,applyPreset:()=>{},dispose:()=>{}};c.current=I;let C=null;const L=ut=>{const N=f.current,$=N.size/2,ht=N.peakHeight,Et=new tt(0,ht*.3,0);let Ct;switch(ut){case 1:Et.set(0,ht*.26,0),Ct=qo(Et,.12,.3,N.size*1.28);break;case 2:{const It=I.field?.waterfalls[0];if(It){const at=Math.floor(It.path.length*.45),pt=It.path[at],bt=It.surface[at];let jt=pt.dirX,Ot=pt.dirZ;const se=Math.hypot(jt,Ot);se===0?(jt=0,Ot=1):(jt/=se,Ot/=se),Et.set(pt.x-$,bt-3,pt.z-$);const Ze=N.size*.42;Ct=new tt(Et.x+jt*Ze,Et.y+Ze*.22,Et.z+Ot*Ze)}else Et.set(0,ht*.3,0),Ct=qo(Et,.85,.42,N.size*1.35);break}case 3:Et.set(0,ht*.16,0),Ct=qo(Et,.78,.92,N.size*1.2);break;default:Et.set(0,ht*.3,0),Ct=qo(Et,1.05,.38,N.size*1.25);break}return{position:Ct,target:Et}},U=(ut,N)=>{const{position:$,target:ht}=L(ut);C={fromPos:x.position.clone(),toPos:$,fromTarget:E.target.clone(),toTarget:ht,t:0,duration:N},I.presetIndex=ut};I.applyPreset=ut=>U(ut,1.15);const O=L(0);x.position.set(O.position.x*1.55,O.position.y*1.5+40,O.position.z*1.55),E.target.copy(O.target);let T=0;const D=x.position.clone(),F=E.target.clone();let H=!1;const W=()=>{H=!0};v.domElement.addEventListener("pointerdown",W,{once:!0}),v.domElement.addEventListener("wheel",W,{once:!0,passive:!0});const j={last:performance.now()/1e3,elapsed:0};let q=0,Q=0,B=0,V=0;const ot=()=>{!_.clientWidth||!_.clientHeight||(x.aspect=_.clientWidth/_.clientHeight,x.updateProjectionMatrix(),v.setSize(_.clientWidth,_.clientHeight))};window.addEventListener("resize",ot);const et=new ResizeObserver(ot);return et.observe(_),v.setAnimationLoop(()=>{const ut=performance.now()/1e3,N=Math.min(ut-j.last,.05);j.last=ut,j.elapsed+=N;const $=j.elapsed;if(!H&&T<1){T=Math.min(1,T+N/2.6);const ht=QR(T);x.position.lerpVectors(D,O.position,ht),E.target.lerpVectors(F,O.target,ht)}if(C){C.t=Math.min(1,C.t+N/C.duration);const ht=JR(C.t);x.position.lerpVectors(C.fromPos,C.toPos,ht),E.target.lerpVectors(C.fromTarget,C.toTarget,ht),C.t>=1&&(C=null)}if(E.autoRotate=f.current.autoRotate,E.update(),I.water?.update($,N),I.clouds?.update($),v.render(g,x),q+=1,Q+=N,Q>=.5&&(B=q/Q,q=0,Q=0),$-V>.4){V=$;const ht=v.info.render.triangles;m.current({voxels:I.field?I.field.size*I.field.size:0,triangles:ht,fps:B,buildMs:(I.field,0)})}}),I.dispose=()=>{v.setAnimationLoop(null),window.removeEventListener("resize",ot),et.disconnect(),E.dispose(),I.water?.dispose(),I.clouds?.dispose(),I.vegetation?.dispose(),I.terrainMesh?.geometry.dispose(),P.dispose(),S.dispose(),R.dispose(),v.dispose(),v.domElement.parentNode===_&&_.removeChild(v.domElement),delete window.__VOXEL__},window.__VOXEL__={scene:g,camera:x,renderer:v,controls:E,handle:I},()=>{I.dispose(),c.current=null}},[]),cn.useEffect(()=>{const _=c.current;if(!_)return;const v=performance.now();d.current(!0);const g=yR({size:r.size,peakHeight:r.peakHeight,seed:r.seed,ridgeSharpness:r.ridgeSharpness,snowLine:r.snowLine,treeLine:r.treeLine,waterStreams:r.waterStreams});_.field=g,_.terrainMesh&&(_.worldGroup.remove(_.terrainMesh),_.terrainMesh.geometry.dispose());const{geometry:x}=wR(g),E=new ll({map:_.grainTexture,vertexColors:!0}),R=new Hn(x,E);R.castShadow=!0,R.receiveShadow=!0,_.worldGroup.add(R),_.terrainMesh=R,_.water?.dispose(),_.water&&_.worldGroup.remove(_.water.group);const y=Jo[r.skyIndex]??Jo[1],S=BR(g,new Kt(y.horizonColor),new Kt(y.sunColor));_.water=S,_.worldGroup.add(S.group),_.clouds?.dispose(),_.clouds&&_.worldGroup.remove(_.clouds.group);const P=FR({size:g.size,maxHeight:g.maxHeight,altitude:g.maxHeight*r.cloudAltitude,coverage:r.cloudCoverage,seed:r.seed,heights:g.heights});_.clouds=P,_.worldGroup.add(P.group),_.vegetation?.dispose(),_.vegetation&&_.worldGroup.remove(_.vegetation.group);const I=YR(g);_.vegetation=I,_.worldGroup.add(I.group);const C=r.size*1.25,L=new tt(0,r.peakHeight*.3,0),U=qo(L,1.05,.38,C);_.camera.position.copy(U),_.controls.target.copy(L),_.controls.update();const O=performance.now()-v;d.current(!1),m.current({voxels:g.size*g.size,triangles:_.renderer.info.render.triangles,fps:0,buildMs:O})},[r.size,r.peakHeight,r.seed,r.ridgeSharpness,r.snowLine,r.treeLine,r.waterStreams,r.cloudCoverage,r.cloudAltitude]),cn.useEffect(()=>{const _=c.current;if(!_)return;const v=Jo[r.skyIndex]??Jo[1];_.sky.apply(v),_.renderer.toneMappingExposure=v.exposure,_.scene.fog=new rp(new Kt(v.horizonColor),v.fogDensity*r.fogScale),_.scene.background=new Kt(v.horizonColor),_.renderer.shadowMap.enabled=r.shadows,_.sky.sun.castShadow=r.shadows;const g=r.size*.62,x=_.sky.sun.shadow.camera;x.left=-g,x.right=g,x.top=g,x.bottom=-g,x.updateProjectionMatrix(),_.worldGroup.traverse(E=>{const R=E;R.isMesh&&R!==_.terrainMesh&&(R.castShadow=r.shadows)}),_.worldGroup.traverse(E=>{const R=E;R.isMesh&&(R.receiveShadow=r.shadows)})},[r.skyIndex,r.fogScale,r.shadows,r.size]),cn.useEffect(()=>{c.current?.applyPreset(t)},[t]),te.jsx("div",{ref:l,className:"world-canvas"})}const $R={size:224,peakHeight:68,seed:20260928,ridgeSharpness:1,snowLine:.66,treeLine:.62,waterStreams:3,cloudCoverage:.48,cloudAltitude:.44,vegetation:1,fogScale:1,skyIndex:1,shadows:!0,autoRotate:!1},t2=[{id:"panorama",label:"全景"},{id:"front",label:"正面"},{id:"waterfall",label:"瀑布"},{id:"aerial",label:"俯瞰"}];function Ta({label:r,value:t,min:i,max:s,step:l,suffix:c,onChange:f}){const p=(t-i)/(s-i)*100;return te.jsxs("label",{className:"ctrl",children:[te.jsxs("span",{className:"ctrl-label",children:[r,te.jsxs("b",{children:[Number.isInteger(l)?Math.round(t):t.toFixed(2),c??""]})]}),te.jsx("input",{type:"range",min:i,max:s,step:l,value:t,style:{"--fill":`${p}%`},onChange:m=>f(Number(m.target.value))})]})}function dv({label:r,checked:t,onChange:i}){return te.jsxs("label",{className:"toggle",children:[te.jsx("span",{children:r}),te.jsx("input",{type:"checkbox",checked:t,onChange:s=>i(s.target.checked)}),te.jsx("i",{"aria-hidden":"true"})]})}function e2({params:r,stats:t,presetIndex:i,onChange:s,onPreset:l}){const[c,f]=cn.useState(()=>window.innerWidth>720),[p,m]=cn.useState("terrain");return te.jsxs("aside",{className:`panel ${c?"is-open":"is-closed"}`,children:[te.jsxs("header",{className:"panel-head",children:[te.jsxs("div",{children:[te.jsx("h2",{children:"场景参数"}),te.jsx("p",{children:"Scene Parameters"})]}),te.jsx("button",{className:"icon-btn",onClick:()=>f(d=>!d),"aria-label":"切换面板",children:c?"—":"+"})]}),c&&te.jsxs("div",{className:"panel-body",children:[te.jsx("nav",{className:"tabs",children:[["terrain","地形"],["atmosphere","光影"],["view","视角"]].map(([d,_])=>te.jsx("button",{className:p===d?"active":"",onClick:()=>m(d),children:_},d))}),p==="terrain"&&te.jsxs("div",{className:"group",children:[te.jsx(Ta,{label:"体素网格",value:r.size,min:128,max:256,step:16,suffix:" × ",onChange:d=>s({size:d})}),te.jsx(Ta,{label:"主峰高度",value:r.peakHeight,min:28,max:104,step:1,suffix:" 格",onChange:d=>s({peakHeight:d})}),te.jsx(Ta,{label:"山脊锐度",value:r.ridgeSharpness,min:.2,max:1.8,step:.05,onChange:d=>s({ridgeSharpness:d})}),te.jsx(Ta,{label:"雪线",value:r.snowLine,min:.3,max:.95,step:.01,onChange:d=>s({snowLine:d})}),te.jsx(Ta,{label:"林线",value:r.treeLine,min:.25,max:.9,step:.01,onChange:d=>s({treeLine:d})}),te.jsx(Ta,{label:"瀑布数量",value:r.waterStreams,min:1,max:4,step:1,onChange:d=>s({waterStreams:d})}),te.jsx(Ta,{label:"云层覆盖",value:r.cloudCoverage,min:0,max:1,step:.01,onChange:d=>s({cloudCoverage:d})}),te.jsx(Ta,{label:"云层高度",value:r.cloudAltitude,min:.18,max:.72,step:.01,onChange:d=>s({cloudAltitude:d})}),te.jsx("div",{className:"row",children:te.jsx("button",{className:"wide-btn",onClick:()=>s({seed:Math.floor(Math.random()*1e6)}),children:"换一座山 · 随机种子"})})]}),p==="atmosphere"&&te.jsxs("div",{className:"group",children:[te.jsx("div",{className:"row wrap",children:Jo.map((d,_)=>te.jsx("button",{className:`chip ${r.skyIndex===_?"active":""}`,onClick:()=>s({skyIndex:_}),children:d.label},d.id))}),te.jsx(Ta,{label:"雾气浓度",value:r.fogScale,min:0,max:2.4,step:.05,onChange:d=>s({fogScale:d})}),te.jsx(dv,{label:"投射阴影",checked:r.shadows,onChange:d=>s({shadows:d})}),te.jsx(dv,{label:"自动环绕",checked:r.autoRotate,onChange:d=>s({autoRotate:d})})]}),p==="view"&&te.jsxs("div",{className:"group",children:[te.jsx("div",{className:"row wrap",children:t2.map((d,_)=>te.jsx("button",{className:`chip ${i===_?"active":""}`,onClick:()=>l(_),children:d.label},d.id))}),te.jsx("p",{className:"hint",children:"拖拽旋转 · 滚轮缩放 · 右键平移"})]}),te.jsxs("footer",{className:"panel-foot",children:[te.jsxs("span",{children:["体素 ",t.voxels.toLocaleString()]}),te.jsxs("span",{children:["三角面 ",t.triangles.toLocaleString()]}),te.jsxs("span",{children:[Math.round(t.fps)," FPS"]})]})]})]})}function n2(r,t){const[i,s]=cn.useState(r),l=cn.useRef(!0);return cn.useEffect(()=>{if(l.current){l.current=!1;return}const c=window.setTimeout(()=>s(r),t);return()=>window.clearTimeout(c)},[r,t]),i}const i2={voxels:0,triangles:0,fps:0,buildMs:0};function a2(){const[r,t]=cn.useState($R),[i,s]=cn.useState(0),[l,c]=cn.useState(i2),[f,p]=cn.useState(!0),m=n2(r,170),d=cn.useCallback(v=>{t(g=>({...g,...v}))},[]),_=cn.useCallback(v=>{c(g=>({...v,buildMs:v.buildMs||g.buildMs}))},[]);return te.jsxs("div",{className:"app",children:[te.jsx(jR,{params:m,presetIndex:i,onStats:_,onBuildingChange:p}),te.jsx("div",{className:"vignette","aria-hidden":"true"}),te.jsxs("header",{className:"title-card",children:[te.jsx("p",{className:"eyebrow",children:"VOXEL LANDSCAPE · REALTIME"}),te.jsx("h1",{children:"云山飞瀑"}),te.jsxs("p",{className:"subtitle",children:["体素山脉 · 悬瀑穿云 · ",m.size,"×",m.size," 网格"]})]}),te.jsx(e2,{params:r,stats:l,presetIndex:i,onChange:d,onPreset:s}),f&&te.jsxs("div",{className:"loading",role:"status",children:[te.jsx("span",{className:"spinner","aria-hidden":"true"}),"正在重建场景…"]})]})}const nS=document.getElementById("root");if(!nS)throw new Error("#root is missing");pM.createRoot(nS).render(te.jsx(a2,{}));
