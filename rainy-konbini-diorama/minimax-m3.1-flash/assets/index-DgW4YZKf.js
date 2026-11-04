(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var Hh={exports:{}},Jo={};var y_;function OM(){if(y_)return Jo;y_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Jo.Fragment=t,Jo.jsx=i,Jo.jsxs=i,Jo}var E_;function PM(){return E_||(E_=1,Hh.exports=OM()),Hh.exports}var gl=PM(),Gh={exports:{}},de={};var b_;function BM(){if(b_)return de;b_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),g=Symbol.iterator;function y(L){return L===null||typeof L!="object"?null:(L=g&&L[g]||L["@@iterator"],typeof L=="function"?L:null)}var T={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},U=Object.assign,M={};function S(L,tt,mt){this.props=L,this.context=tt,this.refs=M,this.updater=mt||T}S.prototype.isReactComponent={},S.prototype.setState=function(L,tt){if(typeof L!="object"&&typeof L!="function"&&L!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,L,tt,"setState")},S.prototype.forceUpdate=function(L){this.updater.enqueueForceUpdate(this,L,"forceUpdate")};function P(){}P.prototype=S.prototype;function I(L,tt,mt){this.props=L,this.context=tt,this.refs=M,this.updater=mt||T}var D=I.prototype=new P;D.constructor=I,U(D,S.prototype),D.isPureReactComponent=!0;var N=Array.isArray;function C(){}var R={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function O(L,tt,mt){var Tt=mt.ref;return{$$typeof:r,type:L,key:tt,ref:Tt!==void 0?Tt:null,props:mt}}function H(L,tt){return O(L.type,tt,L.props)}function K(L){return typeof L=="object"&&L!==null&&L.$$typeof===r}function q(L){var tt={"=":"=0",":":"=2"};return"$"+L.replace(/[=:]/g,function(mt){return tt[mt]})}var ct=/\/+/g;function Z(L,tt){return typeof L=="object"&&L!==null&&L.key!=null?q(""+L.key):tt.toString(36)}function $(L){switch(L.status){case"fulfilled":return L.value;case"rejected":throw L.reason;default:switch(typeof L.status=="string"?L.then(C,C):(L.status="pending",L.then(function(tt){L.status==="pending"&&(L.status="fulfilled",L.value=tt)},function(tt){L.status==="pending"&&(L.status="rejected",L.reason=tt)})),L.status){case"fulfilled":return L.value;case"rejected":throw L.reason}}throw L}function F(L,tt,mt,Tt,Ut){var Ht=typeof L;(Ht==="undefined"||Ht==="boolean")&&(L=null);var it=!1;if(L===null)it=!0;else switch(Ht){case"bigint":case"string":case"number":it=!0;break;case"object":switch(L.$$typeof){case r:case t:it=!0;break;case _:return it=L._init,F(it(L._payload),tt,mt,Tt,Ut)}}if(it)return Ut=Ut(L),it=Tt===""?"."+Z(L,0):Tt,N(Ut)?(mt="",it!=null&&(mt=it.replace(ct,"$&/")+"/"),F(Ut,tt,mt,"",function(se){return se})):Ut!=null&&(K(Ut)&&(Ut=H(Ut,mt+(Ut.key==null||L&&L.key===Ut.key?"":(""+Ut.key).replace(ct,"$&/")+"/")+it)),tt.push(Ut)),1;it=0;var vt=Tt===""?".":Tt+":";if(N(L))for(var At=0;At<L.length;At++)Tt=L[At],Ht=vt+Z(Tt,At),it+=F(Tt,tt,mt,Ht,Ut);else if(At=y(L),typeof At=="function")for(L=At.call(L),At=0;!(Tt=L.next()).done;)Tt=Tt.value,Ht=vt+Z(Tt,At++),it+=F(Tt,tt,mt,Ht,Ut);else if(Ht==="object"){if(typeof L.then=="function")return F($(L),tt,mt,Tt,Ut);throw tt=String(L),Error("Objects are not valid as a React child (found: "+(tt==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":tt)+"). If you meant to render a collection of children, use an array instead.")}return it}function G(L,tt,mt){if(L==null)return L;var Tt=[],Ut=0;return F(L,Tt,"","",function(Ht){return tt.call(mt,Ht,Ut++)}),Tt}function ut(L){if(L._status===-1){var tt=L._result;tt=tt(),tt.then(function(mt){(L._status===0||L._status===-1)&&(L._status=1,L._result=mt)},function(mt){(L._status===0||L._status===-1)&&(L._status=2,L._result=mt)}),L._status===-1&&(L._status=0,L._result=tt)}if(L._status===1)return L._result.default;throw L._result}var st=typeof reportError=="function"?reportError:function(L){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var tt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof L=="object"&&L!==null&&typeof L.message=="string"?String(L.message):String(L),error:L});if(!window.dispatchEvent(tt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",L);return}console.error(L)},dt={map:G,forEach:function(L,tt,mt){G(L,function(){tt.apply(this,arguments)},mt)},count:function(L){var tt=0;return G(L,function(){tt++}),tt},toArray:function(L){return G(L,function(tt){return tt})||[]},only:function(L){if(!K(L))throw Error("React.Children.only expected to receive a single React element child.");return L}};return de.Activity=v,de.Children=dt,de.Component=S,de.Fragment=i,de.Profiler=l,de.PureComponent=I,de.StrictMode=s,de.Suspense=m,de.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=R,de.__COMPILER_RUNTIME={__proto__:null,c:function(L){return R.H.useMemoCache(L)}},de.cache=function(L){return function(){return L.apply(null,arguments)}},de.cacheSignal=function(){return null},de.cloneElement=function(L,tt,mt){if(L==null)throw Error("The argument must be a React element, but you passed "+L+".");var Tt=U({},L.props),Ut=L.key;if(tt!=null)for(Ht in tt.key!==void 0&&(Ut=""+tt.key),tt)!E.call(tt,Ht)||Ht==="key"||Ht==="__self"||Ht==="__source"||Ht==="ref"&&tt.ref===void 0||(Tt[Ht]=tt[Ht]);var Ht=arguments.length-2;if(Ht===1)Tt.children=mt;else if(1<Ht){for(var it=Array(Ht),vt=0;vt<Ht;vt++)it[vt]=arguments[vt+2];Tt.children=it}return O(L.type,Ut,Tt)},de.createContext=function(L){return L={$$typeof:f,_currentValue:L,_currentValue2:L,_threadCount:0,Provider:null,Consumer:null},L.Provider=L,L.Consumer={$$typeof:c,_context:L},L},de.createElement=function(L,tt,mt){var Tt,Ut={},Ht=null;if(tt!=null)for(Tt in tt.key!==void 0&&(Ht=""+tt.key),tt)E.call(tt,Tt)&&Tt!=="key"&&Tt!=="__self"&&Tt!=="__source"&&(Ut[Tt]=tt[Tt]);var it=arguments.length-2;if(it===1)Ut.children=mt;else if(1<it){for(var vt=Array(it),At=0;At<it;At++)vt[At]=arguments[At+2];Ut.children=vt}if(L&&L.defaultProps)for(Tt in it=L.defaultProps,it)Ut[Tt]===void 0&&(Ut[Tt]=it[Tt]);return O(L,Ht,Ut)},de.createRef=function(){return{current:null}},de.forwardRef=function(L){return{$$typeof:p,render:L}},de.isValidElement=K,de.lazy=function(L){return{$$typeof:_,_payload:{_status:-1,_result:L},_init:ut}},de.memo=function(L,tt){return{$$typeof:d,type:L,compare:tt===void 0?null:tt}},de.startTransition=function(L){var tt=R.T,mt={};R.T=mt;try{var Tt=L(),Ut=R.S;Ut!==null&&Ut(mt,Tt),typeof Tt=="object"&&Tt!==null&&typeof Tt.then=="function"&&Tt.then(C,st)}catch(Ht){st(Ht)}finally{tt!==null&&mt.types!==null&&(tt.types=mt.types),R.T=tt}},de.unstable_useCacheRefresh=function(){return R.H.useCacheRefresh()},de.use=function(L){return R.H.use(L)},de.useActionState=function(L,tt,mt){return R.H.useActionState(L,tt,mt)},de.useCallback=function(L,tt){return R.H.useCallback(L,tt)},de.useContext=function(L){return R.H.useContext(L)},de.useDebugValue=function(){},de.useDeferredValue=function(L,tt){return R.H.useDeferredValue(L,tt)},de.useEffect=function(L,tt){return R.H.useEffect(L,tt)},de.useEffectEvent=function(L){return R.H.useEffectEvent(L)},de.useId=function(){return R.H.useId()},de.useImperativeHandle=function(L,tt,mt){return R.H.useImperativeHandle(L,tt,mt)},de.useInsertionEffect=function(L,tt){return R.H.useInsertionEffect(L,tt)},de.useLayoutEffect=function(L,tt){return R.H.useLayoutEffect(L,tt)},de.useMemo=function(L,tt){return R.H.useMemo(L,tt)},de.useOptimistic=function(L,tt){return R.H.useOptimistic(L,tt)},de.useReducer=function(L,tt,mt){return R.H.useReducer(L,tt,mt)},de.useRef=function(L){return R.H.useRef(L)},de.useState=function(L){return R.H.useState(L)},de.useSyncExternalStore=function(L,tt,mt){return R.H.useSyncExternalStore(L,tt,mt)},de.useTransition=function(){return R.H.useTransition()},de.version="19.2.9",de}var T_;function Ep(){return T_||(T_=1,Gh.exports=BM()),Gh.exports}var Ld=Ep(),Vh={exports:{}},jo={},kh={exports:{}},Xh={};var A_;function IM(){return A_||(A_=1,(function(r){function t(F,G){var ut=F.length;F.push(G);t:for(;0<ut;){var st=ut-1>>>1,dt=F[st];if(0<l(dt,G))F[st]=G,F[ut]=dt,ut=st;else break t}}function i(F){return F.length===0?null:F[0]}function s(F){if(F.length===0)return null;var G=F[0],ut=F.pop();if(ut!==G){F[0]=ut;t:for(var st=0,dt=F.length,L=dt>>>1;st<L;){var tt=2*(st+1)-1,mt=F[tt],Tt=tt+1,Ut=F[Tt];if(0>l(mt,ut))Tt<dt&&0>l(Ut,mt)?(F[st]=Ut,F[Tt]=ut,st=Tt):(F[st]=mt,F[tt]=ut,st=tt);else if(Tt<dt&&0>l(Ut,ut))F[st]=Ut,F[Tt]=ut,st=Tt;else break t}}return G}function l(F,G){var ut=F.sortIndex-G.sortIndex;return ut!==0?ut:F.id-G.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,p=f.now();r.unstable_now=function(){return f.now()-p}}var m=[],d=[],_=1,v=null,g=3,y=!1,T=!1,U=!1,M=!1,S=typeof setTimeout=="function"?setTimeout:null,P=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;function D(F){for(var G=i(d);G!==null;){if(G.callback===null)s(d);else if(G.startTime<=F)s(d),G.sortIndex=G.expirationTime,t(m,G);else break;G=i(d)}}function N(F){if(U=!1,D(F),!T)if(i(m)!==null)T=!0,C||(C=!0,q());else{var G=i(d);G!==null&&$(N,G.startTime-F)}}var C=!1,R=-1,E=5,O=-1;function H(){return M?!0:!(r.unstable_now()-O<E)}function K(){if(M=!1,C){var F=r.unstable_now();O=F;var G=!0;try{t:{T=!1,U&&(U=!1,P(R),R=-1),y=!0;var ut=g;try{e:{for(D(F),v=i(m);v!==null&&!(v.expirationTime>F&&H());){var st=v.callback;if(typeof st=="function"){v.callback=null,g=v.priorityLevel;var dt=st(v.expirationTime<=F);if(F=r.unstable_now(),typeof dt=="function"){v.callback=dt,D(F),G=!0;break e}v===i(m)&&s(m),D(F)}else s(m);v=i(m)}if(v!==null)G=!0;else{var L=i(d);L!==null&&$(N,L.startTime-F),G=!1}}break t}finally{v=null,g=ut,y=!1}G=void 0}}finally{G?q():C=!1}}}var q;if(typeof I=="function")q=function(){I(K)};else if(typeof MessageChannel<"u"){var ct=new MessageChannel,Z=ct.port2;ct.port1.onmessage=K,q=function(){Z.postMessage(null)}}else q=function(){S(K,0)};function $(F,G){R=S(function(){F(r.unstable_now())},G)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(F){F.callback=null},r.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<F?Math.floor(1e3/F):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(F){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var ut=g;g=G;try{return F()}finally{g=ut}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(F,G){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var ut=g;g=F;try{return G()}finally{g=ut}},r.unstable_scheduleCallback=function(F,G,ut){var st=r.unstable_now();switch(typeof ut=="object"&&ut!==null?(ut=ut.delay,ut=typeof ut=="number"&&0<ut?st+ut:st):ut=st,F){case 1:var dt=-1;break;case 2:dt=250;break;case 5:dt=1073741823;break;case 4:dt=1e4;break;default:dt=5e3}return dt=ut+dt,F={id:_++,callback:G,priorityLevel:F,startTime:ut,expirationTime:dt,sortIndex:-1},ut>st?(F.sortIndex=ut,t(d,F),i(m)===null&&F===i(d)&&(U?(P(R),R=-1):U=!0,$(N,ut-st))):(F.sortIndex=dt,t(m,F),T||y||(T=!0,C||(C=!0,q()))),F},r.unstable_shouldYield=H,r.unstable_wrapCallback=function(F){var G=g;return function(){var ut=g;g=G;try{return F.apply(this,arguments)}finally{g=ut}}}})(Xh)),Xh}var R_;function FM(){return R_||(R_=1,kh.exports=IM()),kh.exports}var Wh={exports:{}},Gn={};var w_;function zM(){if(w_)return Gn;w_=1;var r=Ep();function t(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)d+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,d,_){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:d,implementation:_}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return Gn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Gn.createPortal=function(m,d){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(t(299));return c(m,d,null,_)},Gn.flushSync=function(m){var d=f.T,_=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=d,s.p=_,s.d.f()}},Gn.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,s.d.C(m,d))},Gn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Gn.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var _=d.as,v=p(_,d.crossOrigin),g=typeof d.integrity=="string"?d.integrity:void 0,y=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;_==="style"?s.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:v,integrity:g,fetchPriority:y}):_==="script"&&s.d.X(m,{crossOrigin:v,integrity:g,fetchPriority:y,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},Gn.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var _=p(d.as,d.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&s.d.M(m)},Gn.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var _=d.as,v=p(_,d.crossOrigin);s.d.L(m,_,{crossOrigin:v,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},Gn.preloadModule=function(m,d){if(typeof m=="string")if(d){var _=p(d.as,d.crossOrigin);s.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else s.d.m(m)},Gn.requestFormReset=function(m){s.d.r(m)},Gn.unstable_batchedUpdates=function(m,d){return m(d)},Gn.useFormState=function(m,d,_){return f.H.useFormState(m,d,_)},Gn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Gn.version="19.2.9",Gn}var C_;function HM(){if(C_)return Wh.exports;C_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Wh.exports=zM(),Wh.exports}var D_;function GM(){if(D_)return jo;D_=1;var r=FM(),t=Ep(),i=HM();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function d(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===a)return m(u),e;if(h===o)return m(u),n;h=h.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=h;else{for(var x=!1,w=u.child;w;){if(w===a){x=!0,a=u,o=h;break}if(w===o){x=!0,o=u,a=h;break}w=w.sibling}if(!x){for(w=h.child;w;){if(w===a){x=!0,a=h,o=u;break}if(w===o){x=!0,o=h,a=u;break}w=w.sibling}if(!x)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function _(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=_(e),n!==null)return n;e=e.sibling}return null}var v=Object.assign,g=Symbol.for("react.element"),y=Symbol.for("react.transitional.element"),T=Symbol.for("react.portal"),U=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),P=Symbol.for("react.consumer"),I=Symbol.for("react.context"),D=Symbol.for("react.forward_ref"),N=Symbol.for("react.suspense"),C=Symbol.for("react.suspense_list"),R=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),O=Symbol.for("react.activity"),H=Symbol.for("react.memo_cache_sentinel"),K=Symbol.iterator;function q(e){return e===null||typeof e!="object"?null:(e=K&&e[K]||e["@@iterator"],typeof e=="function"?e:null)}var ct=Symbol.for("react.client.reference");function Z(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ct?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case U:return"Fragment";case S:return"Profiler";case M:return"StrictMode";case N:return"Suspense";case C:return"SuspenseList";case O:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case T:return"Portal";case I:return e.displayName||"Context";case P:return(e._context.displayName||"Context")+".Consumer";case D:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case R:return n=e.displayName||null,n!==null?n:Z(e.type)||"Memo";case E:n=e._payload,e=e._init;try{return Z(e(n))}catch{}}return null}var $=Array.isArray,F=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ut={pending:!1,data:null,method:null,action:null},st=[],dt=-1;function L(e){return{current:e}}function tt(e){0>dt||(e.current=st[dt],st[dt]=null,dt--)}function mt(e,n){dt++,st[dt]=e.current,e.current=n}var Tt=L(null),Ut=L(null),Ht=L(null),it=L(null);function vt(e,n){switch(mt(Ht,n),mt(Ut,e),mt(Tt,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?Wg(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=Wg(n),e=Yg(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}tt(Tt),mt(Tt,e)}function At(){tt(Tt),tt(Ut),tt(Ht)}function se(e){e.memoizedState!==null&&mt(it,e);var n=Tt.current,a=Yg(n,e.type);n!==a&&(mt(Ut,e),mt(Tt,a))}function zt(e){Ut.current===e&&(tt(Tt),tt(Ut)),it.current===e&&(tt(it),qo._currentValue=ut)}var he,en;function Jt(e){if(he===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);he=n&&n[1]||"",en=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+he+e+en}var ee=!1;function fe(e,n){if(!e||ee)return"";ee=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var Et=function(){throw Error()};if(Object.defineProperty(Et.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Et,[])}catch(pt){var ft=pt}Reflect.construct(e,[],Et)}else{try{Et.call()}catch(pt){ft=pt}e.call(Et.prototype)}}else{try{throw Error()}catch(pt){ft=pt}(Et=e())&&typeof Et.catch=="function"&&Et.catch(function(){})}}catch(pt){if(pt&&ft&&typeof pt.stack=="string")return[pt.stack,ft.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),x=h[0],w=h[1];if(x&&w){var z=x.split(`
`),ot=w.split(`
`);for(u=o=0;o<z.length&&!z[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ot.length&&!ot[u].includes("DetermineComponentFrameRoot");)u++;if(o===z.length||u===ot.length)for(o=z.length-1,u=ot.length-1;1<=o&&0<=u&&z[o]!==ot[u];)u--;for(;1<=o&&0<=u;o--,u--)if(z[o]!==ot[u]){if(o!==1||u!==1)do if(o--,u--,0>u||z[o]!==ot[u]){var xt=`
`+z[o].replace(" at new "," at ");return e.displayName&&xt.includes("<anonymous>")&&(xt=xt.replace("<anonymous>",e.displayName)),xt}while(1<=o&&0<=u);break}}}finally{ee=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Jt(a):""}function re(e,n){switch(e.tag){case 26:case 27:case 5:return Jt(e.type);case 16:return Jt("Lazy");case 13:return e.child!==n&&n!==null?Jt("Suspense Fallback"):Jt("Suspense");case 19:return Jt("SuspenseList");case 0:case 15:return fe(e.type,!1);case 11:return fe(e.type.render,!1);case 1:return fe(e.type,!0);case 31:return Jt("Activity");default:return""}}function Ce(e){try{var n="",a=null;do n+=re(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var He=Object.prototype.hasOwnProperty,dn=r.unstable_scheduleCallback,Fe=r.unstable_cancelCallback,nn=r.unstable_shouldYield,W=r.unstable_requestPaint,ze=r.unstable_now,Pe=r.unstable_getCurrentPriorityLevel,B=r.unstable_ImmediatePriority,b=r.unstable_UserBlockingPriority,j=r.unstable_NormalPriority,lt=r.unstable_LowPriority,gt=r.unstable_IdlePriority,Rt=r.log,Lt=r.unstable_setDisableYieldValue,_t=null,St=null;function wt(e){if(typeof Rt=="function"&&Lt(e),St&&typeof St.setStrictMode=="function")try{St.setStrictMode(_t,e)}catch{}}var Xt=Math.clz32?Math.clz32:te,Bt=Math.log,Nt=Math.LN2;function te(e){return e>>>=0,e===0?32:31-(Bt(e)/Nt|0)|0}var ne=256,ue=262144,X=4194304;function Ct(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Mt(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,x=e.pingedLanes;e=e.warmLanes;var w=o&134217727;return w!==0?(o=w&~h,o!==0?u=Ct(o):(x&=w,x!==0?u=Ct(x):a||(a=w&~e,a!==0&&(u=Ct(a))))):(w=o&~h,w!==0?u=Ct(w):x!==0?u=Ct(x):a||(a=o&~e,a!==0&&(u=Ct(a)))),u===0?0:n!==0&&n!==u&&(n&h)===0&&(h=u&-u,a=n&-n,h>=a||h===32&&(a&4194048)!==0)?n:u}function Dt(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Gt(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bt(){var e=X;return X<<=1,(X&62914560)===0&&(X=4194304),e}function $t(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function Zt(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function We(e,n,a,o,u,h){var x=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var w=e.entanglements,z=e.expirationTimes,ot=e.hiddenUpdates;for(a=x&~a;0<a;){var xt=31-Xt(a),Et=1<<xt;w[xt]=0,z[xt]=-1;var ft=ot[xt];if(ft!==null)for(ot[xt]=null,xt=0;xt<ft.length;xt++){var pt=ft[xt];pt!==null&&(pt.lane&=-536870913)}a&=~Et}o!==0&&De(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(x&~n))}function De(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-Xt(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function $n(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-Xt(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function ci(e,n){var a=n&-n;return a=(a&42)!==0?1:so(a),(a&(e.suspendedLanes|n))!==0?0:a}function so(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ro(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function oo(){var e=G.p;return e!==0?e:(e=window.event,e===void 0?32:m_(e.type))}function Zs(e,n){var a=G.p;try{return G.p=e,n()}finally{G.p=a}}var Xi=Math.random().toString(36).slice(2),_n="__reactFiber$"+Xi,Bn="__reactProps$"+Xi,ti="__reactContainer$"+Xi,Ss="__reactEvents$"+Xi,Tl="__reactListeners$"+Xi,Al="__reactHandles$"+Xi,xs="__reactResources$"+Xi,Oa="__reactMarker$"+Xi;function Pa(e){delete e[_n],delete e[Bn],delete e[Ss],delete e[Tl],delete e[Al]}function ra(e){var n=e[_n];if(n)return n;for(var a=e.parentNode;a;){if(n=a[ti]||a[_n]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=$g(e);e!==null;){if(a=e[_n])return a;e=$g(e)}return n}e=a,a=e.parentNode}return null}function oa(e){if(e=e[_n]||e[ti]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Ms(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Ba(e){var n=e[xs];return n||(n=e[xs]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function vn(e){e[Oa]=!0}var Rl=new Set,lo={};function A(e,n){V(e,n),V(e+"Capture",n)}function V(e,n){for(lo[e]=n,e=0;e<n.length;e++)Rl.add(n[e])}var ht=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),et={},nt={};function It(e){return He.call(nt,e)?!0:He.call(et,e)?!1:ht.test(e)?nt[e]=!0:(et[e]=!0,!1)}function Wt(e,n,a){if(It(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Ot(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Vt(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function kt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function me(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Me(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(x){a=""+x,h.call(this,x)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(x){a=""+x},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Kt(e){if(!e._valueTracker){var n=me(e)?"checked":"value";e._valueTracker=Me(e,n,""+e[n])}}function Ue(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=me(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function an(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var je=/[\n"\\]/g;function ve(e){return e.replace(je,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Sn(e,n,a,o,u,h,x,w){e.name="",x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"?e.type=x:e.removeAttribute("type"),n!=null?x==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+kt(n)):e.value!==""+kt(n)&&(e.value=""+kt(n)):x!=="submit"&&x!=="reset"||e.removeAttribute("value"),n!=null?An(e,x,kt(n)):a!=null?An(e,x,kt(a)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?e.name=""+kt(w):e.removeAttribute("name")}function Yt(e,n,a,o,u,h,x,w){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),n!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){Kt(e);return}a=a!=null?""+kt(a):"",n=n!=null?""+kt(n):a,w||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=w?e.checked:!!o,e.defaultChecked=!!o,x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"&&(e.name=x),Kt(e)}function An(e,n,a){n==="number"&&an(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Se(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+kt(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Zn(e,n,a){if(n!=null&&(n=""+kt(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+kt(a):""}function ui(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if($(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=kt(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Kt(e)}function Kn(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var Ia=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Be(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||Ia.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function ln(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Be(e,u,o)}else for(var h in n)n.hasOwnProperty(h)&&Be(e,h,n[h])}function yi(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ye=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Wi=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Pi(e){return Wi.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ei(){}var Bu=null;function Iu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ks=null,Qs=null;function Xp(e){var n=oa(e);if(n&&(e=n.stateNode)){var a=e[Bn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Sn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ve(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[Bn]||null;if(!u)throw Error(s(90));Sn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&Ue(o)}break t;case"textarea":Zn(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&Se(e,!!a.multiple,n,!1)}}}var Fu=!1;function Wp(e,n,a){if(Fu)return e(n,a);Fu=!0;try{var o=e(n);return o}finally{if(Fu=!1,(Ks!==null||Qs!==null)&&(pc(),Ks&&(n=Ks,e=Qs,Qs=Ks=null,Xp(n),e)))for(n=0;n<e.length;n++)Xp(e[n])}}function co(e,n){var a=e.stateNode;if(a===null)return null;var o=a[Bn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var la=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zu=!1;if(la)try{var uo={};Object.defineProperty(uo,"passive",{get:function(){zu=!0}}),window.addEventListener("test",uo,uo),window.removeEventListener("test",uo,uo)}catch{zu=!1}var Fa=null,Hu=null,wl=null;function Yp(){if(wl)return wl;var e,n=Hu,a=n.length,o,u="value"in Fa?Fa.value:Fa.textContent,h=u.length;for(e=0;e<a&&n[e]===u[e];e++);var x=a-e;for(o=1;o<=x&&n[a-o]===u[h-o];o++);return wl=u.slice(e,1<o?1-o:void 0)}function Cl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Dl(){return!0}function qp(){return!1}function ei(e){function n(a,o,u,h,x){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=x,this.currentTarget=null;for(var w in e)e.hasOwnProperty(w)&&(a=e[w],this[w]=a?a(h):h[w]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?Dl:qp,this.isPropagationStopped=qp,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Dl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Dl)},persist:function(){},isPersistent:Dl}),n}var ys={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ul=ei(ys),fo=v({},ys,{view:0,detail:0}),LS=ei(fo),Gu,Vu,ho,Ll=v({},fo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Xu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ho&&(ho&&e.type==="mousemove"?(Gu=e.screenX-ho.screenX,Vu=e.screenY-ho.screenY):Vu=Gu=0,ho=e),Gu)},movementY:function(e){return"movementY"in e?e.movementY:Vu}}),Zp=ei(Ll),NS=v({},Ll,{dataTransfer:0}),OS=ei(NS),PS=v({},fo,{relatedTarget:0}),ku=ei(PS),BS=v({},ys,{animationName:0,elapsedTime:0,pseudoElement:0}),IS=ei(BS),FS=v({},ys,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),zS=ei(FS),HS=v({},ys,{data:0}),Kp=ei(HS),GS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},VS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function XS(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=kS[e])?!!n[e]:!1}function Xu(){return XS}var WS=v({},fo,{key:function(e){if(e.key){var n=GS[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Cl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?VS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Xu,charCode:function(e){return e.type==="keypress"?Cl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Cl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),YS=ei(WS),qS=v({},Ll,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qp=ei(qS),ZS=v({},fo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Xu}),KS=ei(ZS),QS=v({},ys,{propertyName:0,elapsedTime:0,pseudoElement:0}),JS=ei(QS),jS=v({},Ll,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),$S=ei(jS),tx=v({},ys,{newState:0,oldState:0}),ex=ei(tx),nx=[9,13,27,32],Wu=la&&"CompositionEvent"in window,po=null;la&&"documentMode"in document&&(po=document.documentMode);var ix=la&&"TextEvent"in window&&!po,Jp=la&&(!Wu||po&&8<po&&11>=po),jp=" ",$p=!1;function tm(e,n){switch(e){case"keyup":return nx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function em(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Js=!1;function ax(e,n){switch(e){case"compositionend":return em(n);case"keypress":return n.which!==32?null:($p=!0,jp);case"textInput":return e=n.data,e===jp&&$p?null:e;default:return null}}function sx(e,n){if(Js)return e==="compositionend"||!Wu&&tm(e,n)?(e=Yp(),wl=Hu=Fa=null,Js=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Jp&&n.locale!=="ko"?null:n.data;default:return null}}var rx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function nm(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!rx[e.type]:n==="textarea"}function im(e,n,a,o){Ks?Qs?Qs.push(o):Qs=[o]:Ks=o,n=Mc(n,"onChange"),0<n.length&&(a=new Ul("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var mo=null,go=null;function ox(e){zg(e,0)}function Nl(e){var n=Ms(e);if(Ue(n))return e}function am(e,n){if(e==="change")return n}var sm=!1;if(la){var Yu;if(la){var qu="oninput"in document;if(!qu){var rm=document.createElement("div");rm.setAttribute("oninput","return;"),qu=typeof rm.oninput=="function"}Yu=qu}else Yu=!1;sm=Yu&&(!document.documentMode||9<document.documentMode)}function om(){mo&&(mo.detachEvent("onpropertychange",lm),go=mo=null)}function lm(e){if(e.propertyName==="value"&&Nl(go)){var n=[];im(n,go,e,Iu(e)),Wp(ox,n)}}function lx(e,n,a){e==="focusin"?(om(),mo=n,go=a,mo.attachEvent("onpropertychange",lm)):e==="focusout"&&om()}function cx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Nl(go)}function ux(e,n){if(e==="click")return Nl(n)}function fx(e,n){if(e==="input"||e==="change")return Nl(n)}function hx(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var fi=typeof Object.is=="function"?Object.is:hx;function _o(e,n){if(fi(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!He.call(n,u)||!fi(e[u],n[u]))return!1}return!0}function cm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function um(e,n){var a=cm(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=cm(a)}}function fm(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?fm(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function hm(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=an(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=an(e.document)}return n}function Zu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var dx=la&&"documentMode"in document&&11>=document.documentMode,js=null,Ku=null,vo=null,Qu=!1;function dm(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Qu||js==null||js!==an(o)||(o=js,"selectionStart"in o&&Zu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),vo&&_o(vo,o)||(vo=o,o=Mc(Ku,"onSelect"),0<o.length&&(n=new Ul("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=js)))}function Es(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var $s={animationend:Es("Animation","AnimationEnd"),animationiteration:Es("Animation","AnimationIteration"),animationstart:Es("Animation","AnimationStart"),transitionrun:Es("Transition","TransitionRun"),transitionstart:Es("Transition","TransitionStart"),transitioncancel:Es("Transition","TransitionCancel"),transitionend:Es("Transition","TransitionEnd")},Ju={},pm={};la&&(pm=document.createElement("div").style,"AnimationEvent"in window||(delete $s.animationend.animation,delete $s.animationiteration.animation,delete $s.animationstart.animation),"TransitionEvent"in window||delete $s.transitionend.transition);function bs(e){if(Ju[e])return Ju[e];if(!$s[e])return e;var n=$s[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in pm)return Ju[e]=n[a];return e}var mm=bs("animationend"),gm=bs("animationiteration"),_m=bs("animationstart"),px=bs("transitionrun"),mx=bs("transitionstart"),gx=bs("transitioncancel"),vm=bs("transitionend"),Sm=new Map,ju="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ju.push("scrollEnd");function Bi(e,n){Sm.set(e,n),A(n,[e])}var Ol=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},bi=[],tr=0,$u=0;function Pl(){for(var e=tr,n=$u=tr=0;n<e;){var a=bi[n];bi[n++]=null;var o=bi[n];bi[n++]=null;var u=bi[n];bi[n++]=null;var h=bi[n];if(bi[n++]=null,o!==null&&u!==null){var x=o.pending;x===null?u.next=u:(u.next=x.next,x.next=u),o.pending=u}h!==0&&xm(a,u,h)}}function Bl(e,n,a,o){bi[tr++]=e,bi[tr++]=n,bi[tr++]=a,bi[tr++]=o,$u|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function tf(e,n,a,o){return Bl(e,n,a,o),Il(e)}function Ts(e,n){return Bl(e,null,null,n),Il(e)}function xm(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,h=e.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&n!==null&&(u=31-Xt(a),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),h):null}function Il(e){if(50<Ho)throw Ho=0,uh=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var er={};function _x(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hi(e,n,a,o){return new _x(e,n,a,o)}function ef(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ca(e,n){var a=e.alternate;return a===null?(a=hi(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Mm(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Fl(e,n,a,o,u,h){var x=0;if(o=e,typeof e=="function")ef(e)&&(x=1);else if(typeof e=="string")x=yM(e,a,Tt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case O:return e=hi(31,a,n,u),e.elementType=O,e.lanes=h,e;case U:return As(a.children,u,h,n);case M:x=8,u|=24;break;case S:return e=hi(12,a,n,u|2),e.elementType=S,e.lanes=h,e;case N:return e=hi(13,a,n,u),e.elementType=N,e.lanes=h,e;case C:return e=hi(19,a,n,u),e.elementType=C,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case I:x=10;break t;case P:x=9;break t;case D:x=11;break t;case R:x=14;break t;case E:x=16,o=null;break t}x=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=hi(x,a,n,u),n.elementType=e,n.type=o,n.lanes=h,n}function As(e,n,a,o){return e=hi(7,e,o,n),e.lanes=a,e}function nf(e,n,a){return e=hi(6,e,null,n),e.lanes=a,e}function ym(e){var n=hi(18,null,null,0);return n.stateNode=e,n}function af(e,n,a){return n=hi(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Em=new WeakMap;function Ti(e,n){if(typeof e=="object"&&e!==null){var a=Em.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Ce(n)},Em.set(e,n),n)}return{value:e,source:n,stack:Ce(n)}}var nr=[],ir=0,zl=null,So=0,Ai=[],Ri=0,za=null,Yi=1,qi="";function ua(e,n){nr[ir++]=So,nr[ir++]=zl,zl=e,So=n}function bm(e,n,a){Ai[Ri++]=Yi,Ai[Ri++]=qi,Ai[Ri++]=za,za=e;var o=Yi;e=qi;var u=32-Xt(o)-1;o&=~(1<<u),a+=1;var h=32-Xt(n)+u;if(30<h){var x=u-u%5;h=(o&(1<<x)-1).toString(32),o>>=x,u-=x,Yi=1<<32-Xt(n)+u|a<<u|o,qi=h+e}else Yi=1<<h|a<<u|o,qi=e}function sf(e){e.return!==null&&(ua(e,1),bm(e,1,0))}function rf(e){for(;e===zl;)zl=nr[--ir],nr[ir]=null,So=nr[--ir],nr[ir]=null;for(;e===za;)za=Ai[--Ri],Ai[Ri]=null,qi=Ai[--Ri],Ai[Ri]=null,Yi=Ai[--Ri],Ai[Ri]=null}function Tm(e,n){Ai[Ri++]=Yi,Ai[Ri++]=qi,Ai[Ri++]=za,Yi=n.id,qi=n.overflow,za=e}var In=null,sn=null,Re=!1,Ha=null,wi=!1,of=Error(s(519));function Ga(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw xo(Ti(n,e)),of}function Am(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[_n]=e,n[Bn]=o,a){case"dialog":Ee("cancel",n),Ee("close",n);break;case"iframe":case"object":case"embed":Ee("load",n);break;case"video":case"audio":for(a=0;a<Vo.length;a++)Ee(Vo[a],n);break;case"source":Ee("error",n);break;case"img":case"image":case"link":Ee("error",n),Ee("load",n);break;case"details":Ee("toggle",n);break;case"input":Ee("invalid",n),Yt(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Ee("invalid",n);break;case"textarea":Ee("invalid",n),ui(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||kg(n.textContent,a)?(o.popover!=null&&(Ee("beforetoggle",n),Ee("toggle",n)),o.onScroll!=null&&Ee("scroll",n),o.onScrollEnd!=null&&Ee("scrollend",n),o.onClick!=null&&(n.onclick=Ei),n=!0):n=!1,n||Ga(e,!0)}function Rm(e){for(In=e.return;In;)switch(In.tag){case 5:case 31:case 13:wi=!1;return;case 27:case 3:wi=!0;return;default:In=In.return}}function ar(e){if(e!==In)return!1;if(!Re)return Rm(e),Re=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Th(e.type,e.memoizedProps)),a=!a),a&&sn&&Ga(e),Rm(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));sn=jg(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));sn=jg(e)}else n===27?(n=sn,es(e.type)?(e=Dh,Dh=null,sn=e):sn=n):sn=In?Di(e.stateNode.nextSibling):null;return!0}function Rs(){sn=In=null,Re=!1}function lf(){var e=Ha;return e!==null&&(si===null?si=e:si.push.apply(si,e),Ha=null),e}function xo(e){Ha===null?Ha=[e]:Ha.push(e)}var cf=L(null),ws=null,fa=null;function Va(e,n,a){mt(cf,n._currentValue),n._currentValue=a}function ha(e){e._currentValue=cf.current,tt(cf)}function uf(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function ff(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var x=u.child;h=h.firstContext;t:for(;h!==null;){var w=h;h=u;for(var z=0;z<n.length;z++)if(w.context===n[z]){h.lanes|=a,w=h.alternate,w!==null&&(w.lanes|=a),uf(h.return,a,e),o||(x=null);break t}h=w.next}}else if(u.tag===18){if(x=u.return,x===null)throw Error(s(341));x.lanes|=a,h=x.alternate,h!==null&&(h.lanes|=a),uf(x,a,e),x=null}else x=u.child;if(x!==null)x.return=u;else for(x=u;x!==null;){if(x===e){x=null;break}if(u=x.sibling,u!==null){u.return=x.return,x=u;break}x=x.return}u=x}}function sr(e,n,a,o){e=null;for(var u=n,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var x=u.alternate;if(x===null)throw Error(s(387));if(x=x.memoizedProps,x!==null){var w=u.type;fi(u.pendingProps.value,x.value)||(e!==null?e.push(w):e=[w])}}else if(u===it.current){if(x=u.alternate,x===null)throw Error(s(387));x.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(qo):e=[qo])}u=u.return}e!==null&&ff(n,e,a,o),n.flags|=262144}function Hl(e){for(e=e.firstContext;e!==null;){if(!fi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Cs(e){ws=e,fa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Fn(e){return wm(ws,e)}function Gl(e,n){return ws===null&&Cs(e),wm(e,n)}function wm(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},fa===null){if(e===null)throw Error(s(308));fa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else fa=fa.next=n;return a}var vx=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},Sx=r.unstable_scheduleCallback,xx=r.unstable_NormalPriority,xn={$$typeof:I,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function hf(){return{controller:new vx,data:new Map,refCount:0}}function Mo(e){e.refCount--,e.refCount===0&&Sx(xx,function(){e.controller.abort()})}var yo=null,df=0,rr=0,or=null;function Mx(e,n){if(yo===null){var a=yo=[];df=0,rr=gh(),or={status:"pending",value:void 0,then:function(o){a.push(o)}}}return df++,n.then(Cm,Cm),n}function Cm(){if(--df===0&&yo!==null){or!==null&&(or.status="fulfilled");var e=yo;yo=null,rr=0,or=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function yx(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Dm=F.S;F.S=function(e,n){dg=ze(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Mx(e,n),Dm!==null&&Dm(e,n)};var Ds=L(null);function pf(){var e=Ds.current;return e!==null?e:$e.pooledCache}function Vl(e,n){n===null?mt(Ds,Ds.current):mt(Ds,n.pool)}function Um(){var e=pf();return e===null?null:{parent:xn._currentValue,pool:e}}var lr=Error(s(460)),mf=Error(s(474)),kl=Error(s(542)),Xl={then:function(){}};function Lm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Nm(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Ei,Ei),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Pm(e),e;default:if(typeof n.status=="string")n.then(Ei,Ei);else{if(e=$e,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Pm(e),e}throw Ls=n,lr}}function Us(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ls=a,lr):a}}var Ls=null;function Om(){if(Ls===null)throw Error(s(459));var e=Ls;return Ls=null,e}function Pm(e){if(e===lr||e===kl)throw Error(s(483))}var cr=null,Eo=0;function Wl(e){var n=Eo;return Eo+=1,cr===null&&(cr=[]),Nm(cr,e,n)}function bo(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Yl(e,n){throw n.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Bm(e){function n(J,k){if(e){var rt=J.deletions;rt===null?(J.deletions=[k],J.flags|=16):rt.push(k)}}function a(J,k){if(!e)return null;for(;k!==null;)n(J,k),k=k.sibling;return null}function o(J){for(var k=new Map;J!==null;)J.key!==null?k.set(J.key,J):k.set(J.index,J),J=J.sibling;return k}function u(J,k){return J=ca(J,k),J.index=0,J.sibling=null,J}function h(J,k,rt){return J.index=rt,e?(rt=J.alternate,rt!==null?(rt=rt.index,rt<k?(J.flags|=67108866,k):rt):(J.flags|=67108866,k)):(J.flags|=1048576,k)}function x(J){return e&&J.alternate===null&&(J.flags|=67108866),J}function w(J,k,rt,yt){return k===null||k.tag!==6?(k=nf(rt,J.mode,yt),k.return=J,k):(k=u(k,rt),k.return=J,k)}function z(J,k,rt,yt){var ie=rt.type;return ie===U?xt(J,k,rt.props.children,yt,rt.key):k!==null&&(k.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===E&&Us(ie)===k.type)?(k=u(k,rt.props),bo(k,rt),k.return=J,k):(k=Fl(rt.type,rt.key,rt.props,null,J.mode,yt),bo(k,rt),k.return=J,k)}function ot(J,k,rt,yt){return k===null||k.tag!==4||k.stateNode.containerInfo!==rt.containerInfo||k.stateNode.implementation!==rt.implementation?(k=af(rt,J.mode,yt),k.return=J,k):(k=u(k,rt.children||[]),k.return=J,k)}function xt(J,k,rt,yt,ie){return k===null||k.tag!==7?(k=As(rt,J.mode,yt,ie),k.return=J,k):(k=u(k,rt),k.return=J,k)}function Et(J,k,rt){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return k=nf(""+k,J.mode,rt),k.return=J,k;if(typeof k=="object"&&k!==null){switch(k.$$typeof){case y:return rt=Fl(k.type,k.key,k.props,null,J.mode,rt),bo(rt,k),rt.return=J,rt;case T:return k=af(k,J.mode,rt),k.return=J,k;case E:return k=Us(k),Et(J,k,rt)}if($(k)||q(k))return k=As(k,J.mode,rt,null),k.return=J,k;if(typeof k.then=="function")return Et(J,Wl(k),rt);if(k.$$typeof===I)return Et(J,Gl(J,k),rt);Yl(J,k)}return null}function ft(J,k,rt,yt){var ie=k!==null?k.key:null;if(typeof rt=="string"&&rt!==""||typeof rt=="number"||typeof rt=="bigint")return ie!==null?null:w(J,k,""+rt,yt);if(typeof rt=="object"&&rt!==null){switch(rt.$$typeof){case y:return rt.key===ie?z(J,k,rt,yt):null;case T:return rt.key===ie?ot(J,k,rt,yt):null;case E:return rt=Us(rt),ft(J,k,rt,yt)}if($(rt)||q(rt))return ie!==null?null:xt(J,k,rt,yt,null);if(typeof rt.then=="function")return ft(J,k,Wl(rt),yt);if(rt.$$typeof===I)return ft(J,k,Gl(J,rt),yt);Yl(J,rt)}return null}function pt(J,k,rt,yt,ie){if(typeof yt=="string"&&yt!==""||typeof yt=="number"||typeof yt=="bigint")return J=J.get(rt)||null,w(k,J,""+yt,ie);if(typeof yt=="object"&&yt!==null){switch(yt.$$typeof){case y:return J=J.get(yt.key===null?rt:yt.key)||null,z(k,J,yt,ie);case T:return J=J.get(yt.key===null?rt:yt.key)||null,ot(k,J,yt,ie);case E:return yt=Us(yt),pt(J,k,rt,yt,ie)}if($(yt)||q(yt))return J=J.get(rt)||null,xt(k,J,yt,ie,null);if(typeof yt.then=="function")return pt(J,k,rt,Wl(yt),ie);if(yt.$$typeof===I)return pt(J,k,rt,Gl(k,yt),ie);Yl(k,yt)}return null}function Qt(J,k,rt,yt){for(var ie=null,Ne=null,jt=k,_e=k=0,Ae=null;jt!==null&&_e<rt.length;_e++){jt.index>_e?(Ae=jt,jt=null):Ae=jt.sibling;var Oe=ft(J,jt,rt[_e],yt);if(Oe===null){jt===null&&(jt=Ae);break}e&&jt&&Oe.alternate===null&&n(J,jt),k=h(Oe,k,_e),Ne===null?ie=Oe:Ne.sibling=Oe,Ne=Oe,jt=Ae}if(_e===rt.length)return a(J,jt),Re&&ua(J,_e),ie;if(jt===null){for(;_e<rt.length;_e++)jt=Et(J,rt[_e],yt),jt!==null&&(k=h(jt,k,_e),Ne===null?ie=jt:Ne.sibling=jt,Ne=jt);return Re&&ua(J,_e),ie}for(jt=o(jt);_e<rt.length;_e++)Ae=pt(jt,J,_e,rt[_e],yt),Ae!==null&&(e&&Ae.alternate!==null&&jt.delete(Ae.key===null?_e:Ae.key),k=h(Ae,k,_e),Ne===null?ie=Ae:Ne.sibling=Ae,Ne=Ae);return e&&jt.forEach(function(rs){return n(J,rs)}),Re&&ua(J,_e),ie}function oe(J,k,rt,yt){if(rt==null)throw Error(s(151));for(var ie=null,Ne=null,jt=k,_e=k=0,Ae=null,Oe=rt.next();jt!==null&&!Oe.done;_e++,Oe=rt.next()){jt.index>_e?(Ae=jt,jt=null):Ae=jt.sibling;var rs=ft(J,jt,Oe.value,yt);if(rs===null){jt===null&&(jt=Ae);break}e&&jt&&rs.alternate===null&&n(J,jt),k=h(rs,k,_e),Ne===null?ie=rs:Ne.sibling=rs,Ne=rs,jt=Ae}if(Oe.done)return a(J,jt),Re&&ua(J,_e),ie;if(jt===null){for(;!Oe.done;_e++,Oe=rt.next())Oe=Et(J,Oe.value,yt),Oe!==null&&(k=h(Oe,k,_e),Ne===null?ie=Oe:Ne.sibling=Oe,Ne=Oe);return Re&&ua(J,_e),ie}for(jt=o(jt);!Oe.done;_e++,Oe=rt.next())Oe=pt(jt,J,_e,Oe.value,yt),Oe!==null&&(e&&Oe.alternate!==null&&jt.delete(Oe.key===null?_e:Oe.key),k=h(Oe,k,_e),Ne===null?ie=Oe:Ne.sibling=Oe,Ne=Oe);return e&&jt.forEach(function(NM){return n(J,NM)}),Re&&ua(J,_e),ie}function Ke(J,k,rt,yt){if(typeof rt=="object"&&rt!==null&&rt.type===U&&rt.key===null&&(rt=rt.props.children),typeof rt=="object"&&rt!==null){switch(rt.$$typeof){case y:t:{for(var ie=rt.key;k!==null;){if(k.key===ie){if(ie=rt.type,ie===U){if(k.tag===7){a(J,k.sibling),yt=u(k,rt.props.children),yt.return=J,J=yt;break t}}else if(k.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===E&&Us(ie)===k.type){a(J,k.sibling),yt=u(k,rt.props),bo(yt,rt),yt.return=J,J=yt;break t}a(J,k);break}else n(J,k);k=k.sibling}rt.type===U?(yt=As(rt.props.children,J.mode,yt,rt.key),yt.return=J,J=yt):(yt=Fl(rt.type,rt.key,rt.props,null,J.mode,yt),bo(yt,rt),yt.return=J,J=yt)}return x(J);case T:t:{for(ie=rt.key;k!==null;){if(k.key===ie)if(k.tag===4&&k.stateNode.containerInfo===rt.containerInfo&&k.stateNode.implementation===rt.implementation){a(J,k.sibling),yt=u(k,rt.children||[]),yt.return=J,J=yt;break t}else{a(J,k);break}else n(J,k);k=k.sibling}yt=af(rt,J.mode,yt),yt.return=J,J=yt}return x(J);case E:return rt=Us(rt),Ke(J,k,rt,yt)}if($(rt))return Qt(J,k,rt,yt);if(q(rt)){if(ie=q(rt),typeof ie!="function")throw Error(s(150));return rt=ie.call(rt),oe(J,k,rt,yt)}if(typeof rt.then=="function")return Ke(J,k,Wl(rt),yt);if(rt.$$typeof===I)return Ke(J,k,Gl(J,rt),yt);Yl(J,rt)}return typeof rt=="string"&&rt!==""||typeof rt=="number"||typeof rt=="bigint"?(rt=""+rt,k!==null&&k.tag===6?(a(J,k.sibling),yt=u(k,rt),yt.return=J,J=yt):(a(J,k),yt=nf(rt,J.mode,yt),yt.return=J,J=yt),x(J)):a(J,k)}return function(J,k,rt,yt){try{Eo=0;var ie=Ke(J,k,rt,yt);return cr=null,ie}catch(jt){if(jt===lr||jt===kl)throw jt;var Ne=hi(29,jt,null,J.mode);return Ne.lanes=yt,Ne.return=J,Ne}}}var Ns=Bm(!0),Im=Bm(!1),ka=!1;function gf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function _f(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Xa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Wa(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Ie&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Il(e),xm(e,null,a),n}return Bl(e,o,n,a),Il(e)}function To(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,$n(e,a)}}function vf(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var x={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?u=h=x:h=h.next=x,a=a.next}while(a!==null);h===null?u=h=n:h=h.next=n}else u=h=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Sf=!1;function Ao(){if(Sf){var e=or;if(e!==null)throw e}}function Ro(e,n,a,o){Sf=!1;var u=e.updateQueue;ka=!1;var h=u.firstBaseUpdate,x=u.lastBaseUpdate,w=u.shared.pending;if(w!==null){u.shared.pending=null;var z=w,ot=z.next;z.next=null,x===null?h=ot:x.next=ot,x=z;var xt=e.alternate;xt!==null&&(xt=xt.updateQueue,w=xt.lastBaseUpdate,w!==x&&(w===null?xt.firstBaseUpdate=ot:w.next=ot,xt.lastBaseUpdate=z))}if(h!==null){var Et=u.baseState;x=0,xt=ot=z=null,w=h;do{var ft=w.lane&-536870913,pt=ft!==w.lane;if(pt?(Te&ft)===ft:(o&ft)===ft){ft!==0&&ft===rr&&(Sf=!0),xt!==null&&(xt=xt.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});t:{var Qt=e,oe=w;ft=n;var Ke=a;switch(oe.tag){case 1:if(Qt=oe.payload,typeof Qt=="function"){Et=Qt.call(Ke,Et,ft);break t}Et=Qt;break t;case 3:Qt.flags=Qt.flags&-65537|128;case 0:if(Qt=oe.payload,ft=typeof Qt=="function"?Qt.call(Ke,Et,ft):Qt,ft==null)break t;Et=v({},Et,ft);break t;case 2:ka=!0}}ft=w.callback,ft!==null&&(e.flags|=64,pt&&(e.flags|=8192),pt=u.callbacks,pt===null?u.callbacks=[ft]:pt.push(ft))}else pt={lane:ft,tag:w.tag,payload:w.payload,callback:w.callback,next:null},xt===null?(ot=xt=pt,z=Et):xt=xt.next=pt,x|=ft;if(w=w.next,w===null){if(w=u.shared.pending,w===null)break;pt=w,w=pt.next,pt.next=null,u.lastBaseUpdate=pt,u.shared.pending=null}}while(!0);xt===null&&(z=Et),u.baseState=z,u.firstBaseUpdate=ot,u.lastBaseUpdate=xt,h===null&&(u.shared.lanes=0),Qa|=x,e.lanes=x,e.memoizedState=Et}}function Fm(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function zm(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Fm(a[e],n)}var ur=L(null),ql=L(0);function Hm(e,n){e=Ma,mt(ql,e),mt(ur,n),Ma=e|n.baseLanes}function xf(){mt(ql,Ma),mt(ur,ur.current)}function Mf(){Ma=ql.current,tt(ur),tt(ql)}var di=L(null),Ci=null;function Ya(e){var n=e.alternate;mt(pn,pn.current&1),mt(di,e),Ci===null&&(n===null||ur.current!==null||n.memoizedState!==null)&&(Ci=e)}function yf(e){mt(pn,pn.current),mt(di,e),Ci===null&&(Ci=e)}function Gm(e){e.tag===22?(mt(pn,pn.current),mt(di,e),Ci===null&&(Ci=e)):qa()}function qa(){mt(pn,pn.current),mt(di,di.current)}function pi(e){tt(di),Ci===e&&(Ci=null),tt(pn)}var pn=L(0);function Zl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||wh(a)||Ch(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var da=0,ge=null,qe=null,Mn=null,Kl=!1,fr=!1,Os=!1,Ql=0,wo=0,hr=null,Ex=0;function fn(){throw Error(s(321))}function Ef(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!fi(e[a],n[a]))return!1;return!0}function bf(e,n,a,o,u,h){return da=h,ge=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,F.H=e===null||e.memoizedState===null?b0:zf,Os=!1,h=a(o,u),Os=!1,fr&&(h=km(n,a,o,u)),Vm(e),h}function Vm(e){F.H=Uo;var n=qe!==null&&qe.next!==null;if(da=0,Mn=qe=ge=null,Kl=!1,wo=0,hr=null,n)throw Error(s(300));e===null||yn||(e=e.dependencies,e!==null&&Hl(e)&&(yn=!0))}function km(e,n,a,o){ge=e;var u=0;do{if(fr&&(hr=null),wo=0,fr=!1,25<=u)throw Error(s(301));if(u+=1,Mn=qe=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}F.H=T0,h=n(a,o)}while(fr);return h}function bx(){var e=F.H,n=e.useState()[0];return n=typeof n.then=="function"?Co(n):n,e=e.useState()[0],(qe!==null?qe.memoizedState:null)!==e&&(ge.flags|=1024),n}function Tf(){var e=Ql!==0;return Ql=0,e}function Af(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function Rf(e){if(Kl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Kl=!1}da=0,Mn=qe=ge=null,fr=!1,wo=Ql=0,hr=null}function Qn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Mn===null?ge.memoizedState=Mn=e:Mn=Mn.next=e,Mn}function mn(){if(qe===null){var e=ge.alternate;e=e!==null?e.memoizedState:null}else e=qe.next;var n=Mn===null?ge.memoizedState:Mn.next;if(n!==null)Mn=n,qe=e;else{if(e===null)throw ge.alternate===null?Error(s(467)):Error(s(310));qe=e,e={memoizedState:qe.memoizedState,baseState:qe.baseState,baseQueue:qe.baseQueue,queue:qe.queue,next:null},Mn===null?ge.memoizedState=Mn=e:Mn=Mn.next=e}return Mn}function Jl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Co(e){var n=wo;return wo+=1,hr===null&&(hr=[]),e=Nm(hr,e,n),n=ge,(Mn===null?n.memoizedState:Mn.next)===null&&(n=n.alternate,F.H=n===null||n.memoizedState===null?b0:zf),e}function jl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Co(e);if(e.$$typeof===I)return Fn(e)}throw Error(s(438,String(e)))}function wf(e){var n=null,a=ge.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ge.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Jl(),ge.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=H;return n.index++,a}function pa(e,n){return typeof n=="function"?n(e):n}function $l(e){var n=mn();return Cf(n,qe,e)}function Cf(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var x=u.next;u.next=h.next,h.next=x}n.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{n=u.next;var w=x=null,z=null,ot=n,xt=!1;do{var Et=ot.lane&-536870913;if(Et!==ot.lane?(Te&Et)===Et:(da&Et)===Et){var ft=ot.revertLane;if(ft===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:ot.action,hasEagerState:ot.hasEagerState,eagerState:ot.eagerState,next:null}),Et===rr&&(xt=!0);else if((da&ft)===ft){ot=ot.next,ft===rr&&(xt=!0);continue}else Et={lane:0,revertLane:ot.revertLane,gesture:null,action:ot.action,hasEagerState:ot.hasEagerState,eagerState:ot.eagerState,next:null},z===null?(w=z=Et,x=h):z=z.next=Et,ge.lanes|=ft,Qa|=ft;Et=ot.action,Os&&a(h,Et),h=ot.hasEagerState?ot.eagerState:a(h,Et)}else ft={lane:Et,revertLane:ot.revertLane,gesture:ot.gesture,action:ot.action,hasEagerState:ot.hasEagerState,eagerState:ot.eagerState,next:null},z===null?(w=z=ft,x=h):z=z.next=ft,ge.lanes|=Et,Qa|=Et;ot=ot.next}while(ot!==null&&ot!==n);if(z===null?x=h:z.next=w,!fi(h,e.memoizedState)&&(yn=!0,xt&&(a=or,a!==null)))throw a;e.memoizedState=h,e.baseState=x,e.baseQueue=z,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Df(e){var n=mn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,h=n.memoizedState;if(u!==null){a.pending=null;var x=u=u.next;do h=e(h,x.action),x=x.next;while(x!==u);fi(h,n.memoizedState)||(yn=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),a.lastRenderedState=h}return[h,o]}function Xm(e,n,a){var o=ge,u=mn(),h=Re;if(h){if(a===void 0)throw Error(s(407));a=a()}else a=n();var x=!fi((qe||u).memoizedState,a);if(x&&(u.memoizedState=a,yn=!0),u=u.queue,Nf(qm.bind(null,o,u,e),[e]),u.getSnapshot!==n||x||Mn!==null&&Mn.memoizedState.tag&1){if(o.flags|=2048,dr(9,{destroy:void 0},Ym.bind(null,o,u,a,n),null),$e===null)throw Error(s(349));h||(da&127)!==0||Wm(o,n,a)}return a}function Wm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=ge.updateQueue,n===null?(n=Jl(),ge.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function Ym(e,n,a,o){n.value=a,n.getSnapshot=o,Zm(n)&&Km(e)}function qm(e,n,a){return a(function(){Zm(n)&&Km(e)})}function Zm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!fi(e,a)}catch{return!0}}function Km(e){var n=Ts(e,2);n!==null&&ri(n,e,2)}function Uf(e){var n=Qn();if(typeof e=="function"){var a=e;if(e=a(),Os){wt(!0);try{a()}finally{wt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:e},n}function Qm(e,n,a,o){return e.baseState=a,Cf(e,qe,typeof o=="function"?o:pa)}function Tx(e,n,a,o,u){if(nc(e))throw Error(s(485));if(e=n.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(x){h.listeners.push(x)}};F.T!==null?a(!0):h.isTransition=!1,o(h),a=n.pending,a===null?(h.next=n.pending=h,Jm(n,h)):(h.next=a.next,n.pending=a.next=h)}}function Jm(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var h=F.T,x={};F.T=x;try{var w=a(u,o),z=F.S;z!==null&&z(x,w),jm(e,n,w)}catch(ot){Lf(e,n,ot)}finally{h!==null&&x.types!==null&&(h.types=x.types),F.T=h}}else try{h=a(u,o),jm(e,n,h)}catch(ot){Lf(e,n,ot)}}function jm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){$m(e,n,o)},function(o){return Lf(e,n,o)}):$m(e,n,a)}function $m(e,n,a){n.status="fulfilled",n.value=a,t0(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,Jm(e,a)))}function Lf(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,t0(n),n=n.next;while(n!==o)}e.action=null}function t0(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function e0(e,n){return n}function n0(e,n){if(Re){var a=$e.formState;if(a!==null){t:{var o=ge;if(Re){if(sn){e:{for(var u=sn,h=wi;u.nodeType!==8;){if(!h){u=null;break e}if(u=Di(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){sn=Di(u.nextSibling),o=u.data==="F!";break t}}Ga(o)}o=!1}o&&(n=a[0])}}return a=Qn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e0,lastRenderedState:n},a.queue=o,a=M0.bind(null,ge,o),o.dispatch=a,o=Uf(!1),h=Ff.bind(null,ge,!1,o.queue),o=Qn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=Tx.bind(null,ge,u,h,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function i0(e){var n=mn();return a0(n,qe,e)}function a0(e,n,a){if(n=Cf(e,n,e0)[0],e=$l(pa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Co(n)}catch(x){throw x===lr?kl:x}else o=n;n=mn();var u=n.queue,h=u.dispatch;return a!==n.memoizedState&&(ge.flags|=2048,dr(9,{destroy:void 0},Ax.bind(null,u,a),null)),[o,h,e]}function Ax(e,n){e.action=n}function s0(e){var n=mn(),a=qe;if(a!==null)return a0(n,a,e);mn(),n=n.memoizedState,a=mn();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function dr(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=ge.updateQueue,n===null&&(n=Jl(),ge.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function r0(){return mn().memoizedState}function tc(e,n,a,o){var u=Qn();ge.flags|=e,u.memoizedState=dr(1|n,{destroy:void 0},a,o===void 0?null:o)}function ec(e,n,a,o){var u=mn();o=o===void 0?null:o;var h=u.memoizedState.inst;qe!==null&&o!==null&&Ef(o,qe.memoizedState.deps)?u.memoizedState=dr(n,h,a,o):(ge.flags|=e,u.memoizedState=dr(1|n,h,a,o))}function o0(e,n){tc(8390656,8,e,n)}function Nf(e,n){ec(2048,8,e,n)}function Rx(e){ge.flags|=4;var n=ge.updateQueue;if(n===null)n=Jl(),ge.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function l0(e){var n=mn().memoizedState;return Rx({ref:n,nextImpl:e}),function(){if((Ie&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function c0(e,n){return ec(4,2,e,n)}function u0(e,n){return ec(4,4,e,n)}function f0(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function h0(e,n,a){a=a!=null?a.concat([e]):null,ec(4,4,f0.bind(null,n,e),a)}function Of(){}function d0(e,n){var a=mn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Ef(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function p0(e,n){var a=mn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Ef(n,o[1]))return o[0];if(o=e(),Os){wt(!0);try{e()}finally{wt(!1)}}return a.memoizedState=[o,n],o}function Pf(e,n,a){return a===void 0||(da&1073741824)!==0&&(Te&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=mg(),ge.lanes|=e,Qa|=e,a)}function m0(e,n,a,o){return fi(a,n)?a:ur.current!==null?(e=Pf(e,a,o),fi(e,n)||(yn=!0),e):(da&42)===0||(da&1073741824)!==0&&(Te&261930)===0?(yn=!0,e.memoizedState=a):(e=mg(),ge.lanes|=e,Qa|=e,n)}function g0(e,n,a,o,u){var h=G.p;G.p=h!==0&&8>h?h:8;var x=F.T,w={};F.T=w,Ff(e,!1,n,a);try{var z=u(),ot=F.S;if(ot!==null&&ot(w,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var xt=yx(z,o);Do(e,n,xt,_i(e))}else Do(e,n,o,_i(e))}catch(Et){Do(e,n,{then:function(){},status:"rejected",reason:Et},_i())}finally{G.p=h,x!==null&&w.types!==null&&(x.types=w.types),F.T=x}}function wx(){}function Bf(e,n,a,o){if(e.tag!==5)throw Error(s(476));var u=_0(e).queue;g0(e,u,n,ut,a===null?wx:function(){return v0(e),a(o)})}function _0(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:ut,baseState:ut,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:ut},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function v0(e){var n=_0(e);n.next===null&&(n=e.alternate.memoizedState),Do(e,n.next.queue,{},_i())}function If(){return Fn(qo)}function S0(){return mn().memoizedState}function x0(){return mn().memoizedState}function Cx(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=_i();e=Xa(a);var o=Wa(n,e,a);o!==null&&(ri(o,n,a),To(o,n,a)),n={cache:hf()},e.payload=n;return}n=n.return}}function Dx(e,n,a){var o=_i();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},nc(e)?y0(n,a):(a=tf(e,n,a,o),a!==null&&(ri(a,e,o),E0(a,n,o)))}function M0(e,n,a){var o=_i();Do(e,n,a,o)}function Do(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(nc(e))y0(n,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var x=n.lastRenderedState,w=h(x,a);if(u.hasEagerState=!0,u.eagerState=w,fi(w,x))return Bl(e,n,u,0),$e===null&&Pl(),!1}catch{}if(a=tf(e,n,u,o),a!==null)return ri(a,e,o),E0(a,n,o),!0}return!1}function Ff(e,n,a,o){if(o={lane:2,revertLane:gh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},nc(e)){if(n)throw Error(s(479))}else n=tf(e,a,o,2),n!==null&&ri(n,e,2)}function nc(e){var n=e.alternate;return e===ge||n!==null&&n===ge}function y0(e,n){fr=Kl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function E0(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,$n(e,a)}}var Uo={readContext:Fn,use:jl,useCallback:fn,useContext:fn,useEffect:fn,useImperativeHandle:fn,useLayoutEffect:fn,useInsertionEffect:fn,useMemo:fn,useReducer:fn,useRef:fn,useState:fn,useDebugValue:fn,useDeferredValue:fn,useTransition:fn,useSyncExternalStore:fn,useId:fn,useHostTransitionStatus:fn,useFormState:fn,useActionState:fn,useOptimistic:fn,useMemoCache:fn,useCacheRefresh:fn};Uo.useEffectEvent=fn;var b0={readContext:Fn,use:jl,useCallback:function(e,n){return Qn().memoizedState=[e,n===void 0?null:n],e},useContext:Fn,useEffect:o0,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,tc(4194308,4,f0.bind(null,n,e),a)},useLayoutEffect:function(e,n){return tc(4194308,4,e,n)},useInsertionEffect:function(e,n){tc(4,2,e,n)},useMemo:function(e,n){var a=Qn();n=n===void 0?null:n;var o=e();if(Os){wt(!0);try{e()}finally{wt(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=Qn();if(a!==void 0){var u=a(n);if(Os){wt(!0);try{a(n)}finally{wt(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Dx.bind(null,ge,e),[o.memoizedState,e]},useRef:function(e){var n=Qn();return e={current:e},n.memoizedState=e},useState:function(e){e=Uf(e);var n=e.queue,a=M0.bind(null,ge,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:Of,useDeferredValue:function(e,n){var a=Qn();return Pf(a,e,n)},useTransition:function(){var e=Uf(!1);return e=g0.bind(null,ge,e.queue,!0,!1),Qn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=ge,u=Qn();if(Re){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),$e===null)throw Error(s(349));(Te&127)!==0||Wm(o,n,a)}u.memoizedState=a;var h={value:a,getSnapshot:n};return u.queue=h,o0(qm.bind(null,o,h,e),[e]),o.flags|=2048,dr(9,{destroy:void 0},Ym.bind(null,o,h,a,n),null),a},useId:function(){var e=Qn(),n=$e.identifierPrefix;if(Re){var a=qi,o=Yi;a=(o&~(1<<32-Xt(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Ql++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Ex++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:If,useFormState:n0,useActionState:n0,useOptimistic:function(e){var n=Qn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Ff.bind(null,ge,!0,a),a.dispatch=n,[e,n]},useMemoCache:wf,useCacheRefresh:function(){return Qn().memoizedState=Cx.bind(null,ge)},useEffectEvent:function(e){var n=Qn(),a={impl:e};return n.memoizedState=a,function(){if((Ie&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},zf={readContext:Fn,use:jl,useCallback:d0,useContext:Fn,useEffect:Nf,useImperativeHandle:h0,useInsertionEffect:c0,useLayoutEffect:u0,useMemo:p0,useReducer:$l,useRef:r0,useState:function(){return $l(pa)},useDebugValue:Of,useDeferredValue:function(e,n){var a=mn();return m0(a,qe.memoizedState,e,n)},useTransition:function(){var e=$l(pa)[0],n=mn().memoizedState;return[typeof e=="boolean"?e:Co(e),n]},useSyncExternalStore:Xm,useId:S0,useHostTransitionStatus:If,useFormState:i0,useActionState:i0,useOptimistic:function(e,n){var a=mn();return Qm(a,qe,e,n)},useMemoCache:wf,useCacheRefresh:x0};zf.useEffectEvent=l0;var T0={readContext:Fn,use:jl,useCallback:d0,useContext:Fn,useEffect:Nf,useImperativeHandle:h0,useInsertionEffect:c0,useLayoutEffect:u0,useMemo:p0,useReducer:Df,useRef:r0,useState:function(){return Df(pa)},useDebugValue:Of,useDeferredValue:function(e,n){var a=mn();return qe===null?Pf(a,e,n):m0(a,qe.memoizedState,e,n)},useTransition:function(){var e=Df(pa)[0],n=mn().memoizedState;return[typeof e=="boolean"?e:Co(e),n]},useSyncExternalStore:Xm,useId:S0,useHostTransitionStatus:If,useFormState:s0,useActionState:s0,useOptimistic:function(e,n){var a=mn();return qe!==null?Qm(a,qe,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:wf,useCacheRefresh:x0};T0.useEffectEvent=l0;function Hf(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:v({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Gf={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=_i(),u=Xa(o);u.payload=n,a!=null&&(u.callback=a),n=Wa(e,u,o),n!==null&&(ri(n,e,o),To(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=_i(),u=Xa(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Wa(e,u,o),n!==null&&(ri(n,e,o),To(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=_i(),o=Xa(a);o.tag=2,n!=null&&(o.callback=n),n=Wa(e,o,a),n!==null&&(ri(n,e,a),To(n,e,a))}};function A0(e,n,a,o,u,h,x){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,x):n.prototype&&n.prototype.isPureReactComponent?!_o(a,o)||!_o(u,h):!0}function R0(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&Gf.enqueueReplaceState(n,n.state,null)}function Ps(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=v({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function w0(e){Ol(e)}function C0(e){console.error(e)}function D0(e){Ol(e)}function ic(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function U0(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Vf(e,n,a){return a=Xa(a),a.tag=3,a.payload={element:null},a.callback=function(){ic(e,n)},a}function L0(e){return e=Xa(e),e.tag=3,e}function N0(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){U0(n,a,o)}}var x=a.stateNode;x!==null&&typeof x.componentDidCatch=="function"&&(e.callback=function(){U0(n,a,o),typeof u!="function"&&(Ja===null?Ja=new Set([this]):Ja.add(this));var w=o.stack;this.componentDidCatch(o.value,{componentStack:w!==null?w:""})})}function Ux(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&sr(n,a,u,!0),a=di.current,a!==null){switch(a.tag){case 31:case 13:return Ci===null?mc():a.alternate===null&&hn===0&&(hn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Xl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),dh(e,o,u)),!1;case 22:return a.flags|=65536,o===Xl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),dh(e,o,u)),!1}throw Error(s(435,a.tag))}return dh(e,o,u),mc(),!1}if(Re)return n=di.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==of&&(e=Error(s(422),{cause:o}),xo(Ti(e,a)))):(o!==of&&(n=Error(s(423),{cause:o}),xo(Ti(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=Ti(o,a),u=Vf(e.stateNode,o,u),vf(e,u),hn!==4&&(hn=2)),!1;var h=Error(s(520),{cause:o});if(h=Ti(h,a),zo===null?zo=[h]:zo.push(h),hn!==4&&(hn=2),n===null)return!0;o=Ti(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=Vf(a.stateNode,o,e),vf(a,e),!1;case 1:if(n=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Ja===null||!Ja.has(h))))return a.flags|=65536,u&=-u,a.lanes|=u,u=L0(u),N0(u,e,a,o),vf(a,u),!1}a=a.return}while(a!==null);return!1}var kf=Error(s(461)),yn=!1;function zn(e,n,a,o){n.child=e===null?Im(n,null,a,o):Ns(n,e.child,a,o)}function O0(e,n,a,o,u){a=a.render;var h=n.ref;if("ref"in o){var x={};for(var w in o)w!=="ref"&&(x[w]=o[w])}else x=o;return Cs(n),o=bf(e,n,a,x,h,u),w=Tf(),e!==null&&!yn?(Af(e,n,u),ma(e,n,u)):(Re&&w&&sf(n),n.flags|=1,zn(e,n,o,u),n.child)}function P0(e,n,a,o,u){if(e===null){var h=a.type;return typeof h=="function"&&!ef(h)&&h.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=h,B0(e,n,h,o,u)):(e=Fl(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(h=e.child,!Jf(e,u)){var x=h.memoizedProps;if(a=a.compare,a=a!==null?a:_o,a(x,o)&&e.ref===n.ref)return ma(e,n,u)}return n.flags|=1,e=ca(h,o),e.ref=n.ref,e.return=n,n.child=e}function B0(e,n,a,o,u){if(e!==null){var h=e.memoizedProps;if(_o(h,o)&&e.ref===n.ref)if(yn=!1,n.pendingProps=o=h,Jf(e,u))(e.flags&131072)!==0&&(yn=!0);else return n.lanes=e.lanes,ma(e,n,u)}return Xf(e,n,a,o,u)}function I0(e,n,a,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,n.child=null;return F0(e,n,h,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Vl(n,h!==null?h.cachePool:null),h!==null?Hm(n,h):xf(),Gm(n);else return o=n.lanes=536870912,F0(e,n,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(Vl(n,h.cachePool),Hm(n,h),qa(),n.memoizedState=null):(e!==null&&Vl(n,null),xf(),qa());return zn(e,n,u,a),n.child}function Lo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function F0(e,n,a,o,u){var h=pf();return h=h===null?null:{parent:xn._currentValue,pool:h},n.memoizedState={baseLanes:a,cachePool:h},e!==null&&Vl(n,null),xf(),Gm(n),e!==null&&sr(e,n,o,!0),n.childLanes=u,null}function ac(e,n){return n=rc({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function z0(e,n,a){return Ns(n,e.child,null,a),e=ac(n,n.pendingProps),e.flags|=2,pi(n),n.memoizedState=null,e}function Lx(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Re){if(o.mode==="hidden")return e=ac(n,o),n.lanes=536870912,Lo(null,e);if(yf(n),(e=sn)?(e=Jg(e,wi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:za!==null?{id:Yi,overflow:qi}:null,retryLane:536870912,hydrationErrors:null},a=ym(e),a.return=n,n.child=a,In=n,sn=null)):e=null,e===null)throw Ga(n);return n.lanes=536870912,null}return ac(n,o)}var h=e.memoizedState;if(h!==null){var x=h.dehydrated;if(yf(n),u)if(n.flags&256)n.flags&=-257,n=z0(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(yn||sr(e,n,a,!1),u=(a&e.childLanes)!==0,yn||u){if(o=$e,o!==null&&(x=ci(o,a),x!==0&&x!==h.retryLane))throw h.retryLane=x,Ts(e,x),ri(o,e,x),kf;mc(),n=z0(e,n,a)}else e=h.treeContext,sn=Di(x.nextSibling),In=n,Re=!0,Ha=null,wi=!1,e!==null&&Tm(n,e),n=ac(n,o),n.flags|=4096;return n}return e=ca(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function sc(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function Xf(e,n,a,o,u){return Cs(n),a=bf(e,n,a,o,void 0,u),o=Tf(),e!==null&&!yn?(Af(e,n,u),ma(e,n,u)):(Re&&o&&sf(n),n.flags|=1,zn(e,n,a,u),n.child)}function H0(e,n,a,o,u,h){return Cs(n),n.updateQueue=null,a=km(n,o,a,u),Vm(e),o=Tf(),e!==null&&!yn?(Af(e,n,h),ma(e,n,h)):(Re&&o&&sf(n),n.flags|=1,zn(e,n,a,h),n.child)}function G0(e,n,a,o,u){if(Cs(n),n.stateNode===null){var h=er,x=a.contextType;typeof x=="object"&&x!==null&&(h=Fn(x)),h=new a(o,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Gf,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=o,h.state=n.memoizedState,h.refs={},gf(n),x=a.contextType,h.context=typeof x=="object"&&x!==null?Fn(x):er,h.state=n.memoizedState,x=a.getDerivedStateFromProps,typeof x=="function"&&(Hf(n,a,x,o),h.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(x=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),x!==h.state&&Gf.enqueueReplaceState(h,h.state,null),Ro(n,o,h,u),Ao(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){h=n.stateNode;var w=n.memoizedProps,z=Ps(a,w);h.props=z;var ot=h.context,xt=a.contextType;x=er,typeof xt=="object"&&xt!==null&&(x=Fn(xt));var Et=a.getDerivedStateFromProps;xt=typeof Et=="function"||typeof h.getSnapshotBeforeUpdate=="function",w=n.pendingProps!==w,xt||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(w||ot!==x)&&R0(n,h,o,x),ka=!1;var ft=n.memoizedState;h.state=ft,Ro(n,o,h,u),Ao(),ot=n.memoizedState,w||ft!==ot||ka?(typeof Et=="function"&&(Hf(n,a,Et,o),ot=n.memoizedState),(z=ka||A0(n,a,z,o,ft,ot,x))?(xt||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ot),h.props=o,h.state=ot,h.context=x,o=z):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{h=n.stateNode,_f(e,n),x=n.memoizedProps,xt=Ps(a,x),h.props=xt,Et=n.pendingProps,ft=h.context,ot=a.contextType,z=er,typeof ot=="object"&&ot!==null&&(z=Fn(ot)),w=a.getDerivedStateFromProps,(ot=typeof w=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(x!==Et||ft!==z)&&R0(n,h,o,z),ka=!1,ft=n.memoizedState,h.state=ft,Ro(n,o,h,u),Ao();var pt=n.memoizedState;x!==Et||ft!==pt||ka||e!==null&&e.dependencies!==null&&Hl(e.dependencies)?(typeof w=="function"&&(Hf(n,a,w,o),pt=n.memoizedState),(xt=ka||A0(n,a,xt,o,ft,pt,z)||e!==null&&e.dependencies!==null&&Hl(e.dependencies))?(ot||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,pt,z),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,pt,z)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||x===e.memoizedProps&&ft===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||x===e.memoizedProps&&ft===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=pt),h.props=o,h.state=pt,h.context=z,o=xt):(typeof h.componentDidUpdate!="function"||x===e.memoizedProps&&ft===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||x===e.memoizedProps&&ft===e.memoizedState||(n.flags|=1024),o=!1)}return h=o,sc(e,n),o=(n.flags&128)!==0,h||o?(h=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,e!==null&&o?(n.child=Ns(n,e.child,null,u),n.child=Ns(n,null,a,u)):zn(e,n,a,u),n.memoizedState=h.state,e=n.child):e=ma(e,n,u),e}function V0(e,n,a,o){return Rs(),n.flags|=256,zn(e,n,a,o),n.child}var Wf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yf(e){return{baseLanes:e,cachePool:Um()}}function qf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=gi),e}function k0(e,n,a){var o=n.pendingProps,u=!1,h=(n.flags&128)!==0,x;if((x=h)||(x=e!==null&&e.memoizedState===null?!1:(pn.current&2)!==0),x&&(u=!0,n.flags&=-129),x=(n.flags&32)!==0,n.flags&=-33,e===null){if(Re){if(u?Ya(n):qa(),(e=sn)?(e=Jg(e,wi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:za!==null?{id:Yi,overflow:qi}:null,retryLane:536870912,hydrationErrors:null},a=ym(e),a.return=n,n.child=a,In=n,sn=null)):e=null,e===null)throw Ga(n);return Ch(e)?n.lanes=32:n.lanes=536870912,null}var w=o.children;return o=o.fallback,u?(qa(),u=n.mode,w=rc({mode:"hidden",children:w},u),o=As(o,u,a,null),w.return=n,o.return=n,w.sibling=o,n.child=w,o=n.child,o.memoizedState=Yf(a),o.childLanes=qf(e,x,a),n.memoizedState=Wf,Lo(null,o)):(Ya(n),Zf(n,w))}var z=e.memoizedState;if(z!==null&&(w=z.dehydrated,w!==null)){if(h)n.flags&256?(Ya(n),n.flags&=-257,n=Kf(e,n,a)):n.memoizedState!==null?(qa(),n.child=e.child,n.flags|=128,n=null):(qa(),w=o.fallback,u=n.mode,o=rc({mode:"visible",children:o.children},u),w=As(w,u,a,null),w.flags|=2,o.return=n,w.return=n,o.sibling=w,n.child=o,Ns(n,e.child,null,a),o=n.child,o.memoizedState=Yf(a),o.childLanes=qf(e,x,a),n.memoizedState=Wf,n=Lo(null,o));else if(Ya(n),Ch(w)){if(x=w.nextSibling&&w.nextSibling.dataset,x)var ot=x.dgst;x=ot,o=Error(s(419)),o.stack="",o.digest=x,xo({value:o,source:null,stack:null}),n=Kf(e,n,a)}else if(yn||sr(e,n,a,!1),x=(a&e.childLanes)!==0,yn||x){if(x=$e,x!==null&&(o=ci(x,a),o!==0&&o!==z.retryLane))throw z.retryLane=o,Ts(e,o),ri(x,e,o),kf;wh(w)||mc(),n=Kf(e,n,a)}else wh(w)?(n.flags|=192,n.child=e.child,n=null):(e=z.treeContext,sn=Di(w.nextSibling),In=n,Re=!0,Ha=null,wi=!1,e!==null&&Tm(n,e),n=Zf(n,o.children),n.flags|=4096);return n}return u?(qa(),w=o.fallback,u=n.mode,z=e.child,ot=z.sibling,o=ca(z,{mode:"hidden",children:o.children}),o.subtreeFlags=z.subtreeFlags&65011712,ot!==null?w=ca(ot,w):(w=As(w,u,a,null),w.flags|=2),w.return=n,o.return=n,o.sibling=w,n.child=o,Lo(null,o),o=n.child,w=e.child.memoizedState,w===null?w=Yf(a):(u=w.cachePool,u!==null?(z=xn._currentValue,u=u.parent!==z?{parent:z,pool:z}:u):u=Um(),w={baseLanes:w.baseLanes|a,cachePool:u}),o.memoizedState=w,o.childLanes=qf(e,x,a),n.memoizedState=Wf,Lo(e.child,o)):(Ya(n),a=e.child,e=a.sibling,a=ca(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(x=n.deletions,x===null?(n.deletions=[e],n.flags|=16):x.push(e)),n.child=a,n.memoizedState=null,a)}function Zf(e,n){return n=rc({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function rc(e,n){return e=hi(22,e,null,n),e.lanes=0,e}function Kf(e,n,a){return Ns(n,e.child,null,a),e=Zf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function X0(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),uf(e.return,n,a)}function Qf(e,n,a,o,u,h){var x=e.memoizedState;x===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:h}:(x.isBackwards=n,x.rendering=null,x.renderingStartTime=0,x.last=o,x.tail=a,x.tailMode=u,x.treeForkCount=h)}function W0(e,n,a){var o=n.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var x=pn.current,w=(x&2)!==0;if(w?(x=x&1|2,n.flags|=128):x&=1,mt(pn,x),zn(e,n,o,a),o=Re?So:0,!w&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&X0(e,a,n);else if(e.tag===19)X0(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&Zl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Qf(n,!1,u,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Zl(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Qf(n,!0,a,null,h,o);break;case"together":Qf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ma(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Qa|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(sr(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=ca(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=ca(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Jf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Hl(e)))}function Nx(e,n,a){switch(n.tag){case 3:vt(n,n.stateNode.containerInfo),Va(n,xn,e.memoizedState.cache),Rs();break;case 27:case 5:se(n);break;case 4:vt(n,n.stateNode.containerInfo);break;case 10:Va(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,yf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Ya(n),n.flags|=128,null):(a&n.child.childLanes)!==0?k0(e,n,a):(Ya(n),e=ma(e,n,a),e!==null?e.sibling:null);Ya(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(sr(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return W0(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),mt(pn,pn.current),o)break;return null;case 22:return n.lanes=0,I0(e,n,a,n.pendingProps);case 24:Va(n,xn,e.memoizedState.cache)}return ma(e,n,a)}function Y0(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)yn=!0;else{if(!Jf(e,a)&&(n.flags&128)===0)return yn=!1,Nx(e,n,a);yn=(e.flags&131072)!==0}else yn=!1,Re&&(n.flags&1048576)!==0&&bm(n,So,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=Us(n.elementType),n.type=e,typeof e=="function")ef(e)?(o=Ps(e,o),n.tag=1,n=G0(null,n,e,o,a)):(n.tag=0,n=Xf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===D){n.tag=11,n=O0(null,n,e,o,a);break t}else if(u===R){n.tag=14,n=P0(null,n,e,o,a);break t}}throw n=Z(e)||e,Error(s(306,n,""))}}return n;case 0:return Xf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Ps(o,n.pendingProps),G0(e,n,o,u,a);case 3:t:{if(vt(n,n.stateNode.containerInfo),e===null)throw Error(s(387));o=n.pendingProps;var h=n.memoizedState;u=h.element,_f(e,n),Ro(n,o,null,a);var x=n.memoizedState;if(o=x.cache,Va(n,xn,o),o!==h.cache&&ff(n,[xn],a,!0),Ao(),o=x.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:x.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=V0(e,n,o,a);break t}else if(o!==u){u=Ti(Error(s(424)),n),xo(u),n=V0(e,n,o,a);break t}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,sn=Di(e.firstChild),In=n,Re=!0,Ha=null,wi=!0,a=Im(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Rs(),o===u){n=ma(e,n,a);break t}zn(e,n,o,a)}n=n.child}return n;case 26:return sc(e,n),e===null?(a=i_(n.type,null,n.pendingProps,null))?n.memoizedState=a:Re||(a=n.type,e=n.pendingProps,o=yc(Ht.current).createElement(a),o[_n]=n,o[Bn]=e,Hn(o,a,e),vn(o),n.stateNode=o):n.memoizedState=i_(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return se(n),e===null&&Re&&(o=n.stateNode=t_(n.type,n.pendingProps,Ht.current),In=n,wi=!0,u=sn,es(n.type)?(Dh=u,sn=Di(o.firstChild)):sn=u),zn(e,n,n.pendingProps.children,a),sc(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Re&&((u=o=sn)&&(o=cM(o,n.type,n.pendingProps,wi),o!==null?(n.stateNode=o,In=n,sn=Di(o.firstChild),wi=!1,u=!0):u=!1),u||Ga(n)),se(n),u=n.type,h=n.pendingProps,x=e!==null?e.memoizedProps:null,o=h.children,Th(u,h)?o=null:x!==null&&Th(u,x)&&(n.flags|=32),n.memoizedState!==null&&(u=bf(e,n,bx,null,null,a),qo._currentValue=u),sc(e,n),zn(e,n,o,a),n.child;case 6:return e===null&&Re&&((e=a=sn)&&(a=uM(a,n.pendingProps,wi),a!==null?(n.stateNode=a,In=n,sn=null,e=!0):e=!1),e||Ga(n)),null;case 13:return k0(e,n,a);case 4:return vt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=Ns(n,null,o,a):zn(e,n,o,a),n.child;case 11:return O0(e,n,n.type,n.pendingProps,a);case 7:return zn(e,n,n.pendingProps,a),n.child;case 8:return zn(e,n,n.pendingProps.children,a),n.child;case 12:return zn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Va(n,n.type,o.value),zn(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Cs(n),u=Fn(u),o=o(u),n.flags|=1,zn(e,n,o,a),n.child;case 14:return P0(e,n,n.type,n.pendingProps,a);case 15:return B0(e,n,n.type,n.pendingProps,a);case 19:return W0(e,n,a);case 31:return Lx(e,n,a);case 22:return I0(e,n,a,n.pendingProps);case 24:return Cs(n),o=Fn(xn),e===null?(u=pf(),u===null&&(u=$e,h=hf(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=a),u=h),n.memoizedState={parent:o,cache:u},gf(n),Va(n,xn,u)):((e.lanes&a)!==0&&(_f(e,n),Ro(n,null,null,a),Ao()),u=e.memoizedState,h=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Va(n,xn,o)):(o=h.cache,Va(n,xn,o),o!==u.cache&&ff(n,[xn],a,!0))),zn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function ga(e){e.flags|=4}function jf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Sg())e.flags|=8192;else throw Ls=Xl,mf}else e.flags&=-16777217}function q0(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!l_(n))if(Sg())e.flags|=8192;else throw Ls=Xl,mf}function oc(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?bt():536870912,e.lanes|=n,_r|=n)}function No(e,n){if(!Re)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function rn(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function Ox(e,n,a){var o=n.pendingProps;switch(rf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rn(n),null;case 1:return rn(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ha(xn),At(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ar(n)?ga(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,lf())),rn(n),null;case 26:var u=n.type,h=n.memoizedState;return e===null?(ga(n),h!==null?(rn(n),q0(n,h)):(rn(n),jf(n,u,null,o,a))):h?h!==e.memoizedState?(ga(n),rn(n),q0(n,h)):(rn(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&ga(n),rn(n),jf(n,u,e,o,a)),null;case 27:if(zt(n),a=Ht.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ga(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return rn(n),null}e=Tt.current,ar(n)?Am(n):(e=t_(u,o,a),n.stateNode=e,ga(n))}return rn(n),null;case 5:if(zt(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&ga(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return rn(n),null}if(h=Tt.current,ar(n))Am(n);else{var x=yc(Ht.current);switch(h){case 1:h=x.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=x.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=x.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=x.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=x.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?x.createElement("select",{is:o.is}):x.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?x.createElement(u,{is:o.is}):x.createElement(u)}}h[_n]=n,h[Bn]=o;t:for(x=n.child;x!==null;){if(x.tag===5||x.tag===6)h.appendChild(x.stateNode);else if(x.tag!==4&&x.tag!==27&&x.child!==null){x.child.return=x,x=x.child;continue}if(x===n)break t;for(;x.sibling===null;){if(x.return===null||x.return===n)break t;x=x.return}x.sibling.return=x.return,x=x.sibling}n.stateNode=h;t:switch(Hn(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ga(n)}}return rn(n),jf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&ga(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=Ht.current,ar(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=In,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[_n]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||kg(e.nodeValue,a)),e||Ga(n,!0)}else e=yc(e).createTextNode(o),e[_n]=n,n.stateNode=e}return rn(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=ar(n),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[_n]=n}else Rs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;rn(n),e=!1}else a=lf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(pi(n),n):(pi(n),null);if((n.flags&128)!==0)throw Error(s(558))}return rn(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=ar(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[_n]=n}else Rs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;rn(n),u=!1}else u=lf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(pi(n),n):(pi(n),null)}return pi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),oc(n,n.updateQueue),rn(n),null);case 4:return At(),e===null&&xh(n.stateNode.containerInfo),rn(n),null;case 10:return ha(n.type),rn(n),null;case 19:if(tt(pn),o=n.memoizedState,o===null)return rn(n),null;if(u=(n.flags&128)!==0,h=o.rendering,h===null)if(u)No(o,!1);else{if(hn!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(h=Zl(e),h!==null){for(n.flags|=128,No(o,!1),e=h.updateQueue,n.updateQueue=e,oc(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Mm(a,e),a=a.sibling;return mt(pn,pn.current&1|2),Re&&ua(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&ze()>hc&&(n.flags|=128,u=!0,No(o,!1),n.lanes=4194304)}else{if(!u)if(e=Zl(h),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,oc(n,e),No(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Re)return rn(n),null}else 2*ze()-o.renderingStartTime>hc&&a!==536870912&&(n.flags|=128,u=!0,No(o,!1),n.lanes=4194304);o.isBackwards?(h.sibling=n.child,n.child=h):(e=o.last,e!==null?e.sibling=h:n.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=ze(),e.sibling=null,a=pn.current,mt(pn,u?a&1|2:a&1),Re&&ua(n,o.treeForkCount),e):(rn(n),null);case 22:case 23:return pi(n),Mf(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(rn(n),n.subtreeFlags&6&&(n.flags|=8192)):rn(n),a=n.updateQueue,a!==null&&oc(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&tt(Ds),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ha(xn),rn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Px(e,n){switch(rf(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ha(xn),At(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return zt(n),null;case 31:if(n.memoizedState!==null){if(pi(n),n.alternate===null)throw Error(s(340));Rs()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(pi(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Rs()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return tt(pn),null;case 4:return At(),null;case 10:return ha(n.type),null;case 22:case 23:return pi(n),Mf(),e!==null&&tt(Ds),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ha(xn),null;case 25:return null;default:return null}}function Z0(e,n){switch(rf(n),n.tag){case 3:ha(xn),At();break;case 26:case 27:case 5:zt(n);break;case 4:At();break;case 31:n.memoizedState!==null&&pi(n);break;case 13:pi(n);break;case 19:tt(pn);break;case 10:ha(n.type);break;case 22:case 23:pi(n),Mf(),e!==null&&tt(Ds);break;case 24:ha(xn)}}function Oo(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var h=a.create,x=a.inst;o=h(),x.destroy=o}a=a.next}while(a!==u)}}catch(w){Ve(n,n.return,w)}}function Za(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var x=o.inst,w=x.destroy;if(w!==void 0){x.destroy=void 0,u=n;var z=a,ot=w;try{ot()}catch(xt){Ve(u,z,xt)}}}o=o.next}while(o!==h)}}catch(xt){Ve(n,n.return,xt)}}function K0(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{zm(n,a)}catch(o){Ve(e,e.return,o)}}}function Q0(e,n,a){a.props=Ps(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Ve(e,n,o)}}function Po(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Ve(e,n,u)}}function Zi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ve(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ve(e,n,u)}else a.current=null}function J0(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ve(e,e.return,u)}}function $f(e,n,a){try{var o=e.stateNode;iM(o,e.type,a,n),o[Bn]=n}catch(u){Ve(e,e.return,u)}}function j0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&es(e.type)||e.tag===4}function th(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||j0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&es(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function eh(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Ei));else if(o!==4&&(o===27&&es(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(eh(e,n,a),e=e.sibling;e!==null;)eh(e,n,a),e=e.sibling}function lc(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&es(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(lc(e,n,a),e=e.sibling;e!==null;)lc(e,n,a),e=e.sibling}function $0(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Hn(n,o,a),n[_n]=e,n[Bn]=a}catch(h){Ve(e,e.return,h)}}var _a=!1,En=!1,nh=!1,tg=typeof WeakSet=="function"?WeakSet:Set,Ln=null;function Bx(e,n){if(e=e.containerInfo,Eh=Cc,e=hm(e),Zu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break t}var x=0,w=-1,z=-1,ot=0,xt=0,Et=e,ft=null;e:for(;;){for(var pt;Et!==a||u!==0&&Et.nodeType!==3||(w=x+u),Et!==h||o!==0&&Et.nodeType!==3||(z=x+o),Et.nodeType===3&&(x+=Et.nodeValue.length),(pt=Et.firstChild)!==null;)ft=Et,Et=pt;for(;;){if(Et===e)break e;if(ft===a&&++ot===u&&(w=x),ft===h&&++xt===o&&(z=x),(pt=Et.nextSibling)!==null)break;Et=ft,ft=Et.parentNode}Et=pt}a=w===-1||z===-1?null:{start:w,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(bh={focusedElem:e,selectionRange:a},Cc=!1,Ln=n;Ln!==null;)if(n=Ln,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,Ln=e;else for(;Ln!==null;){switch(n=Ln,h=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,a=n,u=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var Qt=Ps(a.type,u);e=o.getSnapshotBeforeUpdate(Qt,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(oe){Ve(a,a.return,oe)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)Rh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Rh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,Ln=e;break}Ln=n.return}}function eg(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:Sa(e,a),o&4&&Oo(5,a);break;case 1:if(Sa(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(x){Ve(a,a.return,x)}else{var u=Ps(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(x){Ve(a,a.return,x)}}o&64&&K0(a),o&512&&Po(a,a.return);break;case 3:if(Sa(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{zm(e,n)}catch(x){Ve(a,a.return,x)}}break;case 27:n===null&&o&4&&$0(a);case 26:case 5:Sa(e,a),n===null&&o&4&&J0(a),o&512&&Po(a,a.return);break;case 12:Sa(e,a);break;case 31:Sa(e,a),o&4&&ag(e,a);break;case 13:Sa(e,a),o&4&&sg(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Wx.bind(null,a),fM(e,a))));break;case 22:if(o=a.memoizedState!==null||_a,!o){n=n!==null&&n.memoizedState!==null||En,u=_a;var h=En;_a=o,(En=n)&&!h?xa(e,a,(a.subtreeFlags&8772)!==0):Sa(e,a),_a=u,En=h}break;case 30:break;default:Sa(e,a)}}function ng(e){var n=e.alternate;n!==null&&(e.alternate=null,ng(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Pa(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var cn=null,ni=!1;function va(e,n,a){for(a=a.child;a!==null;)ig(e,n,a),a=a.sibling}function ig(e,n,a){if(St&&typeof St.onCommitFiberUnmount=="function")try{St.onCommitFiberUnmount(_t,a)}catch{}switch(a.tag){case 26:En||Zi(a,n),va(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:En||Zi(a,n);var o=cn,u=ni;es(a.type)&&(cn=a.stateNode,ni=!1),va(e,n,a),Xo(a.stateNode),cn=o,ni=u;break;case 5:En||Zi(a,n);case 6:if(o=cn,u=ni,cn=null,va(e,n,a),cn=o,ni=u,cn!==null)if(ni)try{(cn.nodeType===9?cn.body:cn.nodeName==="HTML"?cn.ownerDocument.body:cn).removeChild(a.stateNode)}catch(h){Ve(a,n,h)}else try{cn.removeChild(a.stateNode)}catch(h){Ve(a,n,h)}break;case 18:cn!==null&&(ni?(e=cn,Kg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Tr(e)):Kg(cn,a.stateNode));break;case 4:o=cn,u=ni,cn=a.stateNode.containerInfo,ni=!0,va(e,n,a),cn=o,ni=u;break;case 0:case 11:case 14:case 15:Za(2,a,n),En||Za(4,a,n),va(e,n,a);break;case 1:En||(Zi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Q0(a,n,o)),va(e,n,a);break;case 21:va(e,n,a);break;case 22:En=(o=En)||a.memoizedState!==null,va(e,n,a),En=o;break;default:va(e,n,a)}}function ag(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Tr(e)}catch(a){Ve(n,n.return,a)}}}function sg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Tr(e)}catch(a){Ve(n,n.return,a)}}function Ix(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new tg),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new tg),n;default:throw Error(s(435,e.tag))}}function cc(e,n){var a=Ix(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=Yx.bind(null,e,o);o.then(u,u)}})}function ii(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],h=e,x=n,w=x;t:for(;w!==null;){switch(w.tag){case 27:if(es(w.type)){cn=w.stateNode,ni=!1;break t}break;case 5:cn=w.stateNode,ni=!1;break t;case 3:case 4:cn=w.stateNode.containerInfo,ni=!0;break t}w=w.return}if(cn===null)throw Error(s(160));ig(h,x,u),cn=null,ni=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)rg(n,e),n=n.sibling}var Ii=null;function rg(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ii(n,e),ai(e),o&4&&(Za(3,e,e.return),Oo(3,e),Za(5,e,e.return));break;case 1:ii(n,e),ai(e),o&512&&(En||a===null||Zi(a,a.return)),o&64&&_a&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ii;if(ii(n,e),ai(e),o&512&&(En||a===null||Zi(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[Oa]||h[_n]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),Hn(h,o,a),h[_n]=e,vn(h),o=h;break t;case"link":var x=r_("link","href",u).get(o+(a.href||""));if(x){for(var w=0;w<x.length;w++)if(h=x[w],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){x.splice(w,1);break e}}h=u.createElement(o),Hn(h,o,a),u.head.appendChild(h);break;case"meta":if(x=r_("meta","content",u).get(o+(a.content||""))){for(w=0;w<x.length;w++)if(h=x[w],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){x.splice(w,1);break e}}h=u.createElement(o),Hn(h,o,a),u.head.appendChild(h);break;default:throw Error(s(468,o))}h[_n]=e,vn(h),o=h}e.stateNode=o}else o_(u,e.type,e.stateNode);else e.stateNode=s_(u,o,e.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?o_(u,e.type,e.stateNode):s_(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&$f(e,e.memoizedProps,a.memoizedProps)}break;case 27:ii(n,e),ai(e),o&512&&(En||a===null||Zi(a,a.return)),a!==null&&o&4&&$f(e,e.memoizedProps,a.memoizedProps);break;case 5:if(ii(n,e),ai(e),o&512&&(En||a===null||Zi(a,a.return)),e.flags&32){u=e.stateNode;try{Kn(u,"")}catch(Qt){Ve(e,e.return,Qt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,$f(e,u,a!==null?a.memoizedProps:u)),o&1024&&(nh=!0);break;case 6:if(ii(n,e),ai(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Qt){Ve(e,e.return,Qt)}}break;case 3:if(Tc=null,u=Ii,Ii=Ec(n.containerInfo),ii(n,e),Ii=u,ai(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Tr(n.containerInfo)}catch(Qt){Ve(e,e.return,Qt)}nh&&(nh=!1,og(e));break;case 4:o=Ii,Ii=Ec(e.stateNode.containerInfo),ii(n,e),ai(e),Ii=o;break;case 12:ii(n,e),ai(e);break;case 31:ii(n,e),ai(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,cc(e,o)));break;case 13:ii(n,e),ai(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(fc=ze()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,cc(e,o)));break;case 22:u=e.memoizedState!==null;var z=a!==null&&a.memoizedState!==null,ot=_a,xt=En;if(_a=ot||u,En=xt||z,ii(n,e),En=xt,_a=ot,ai(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||z||_a||En||Bs(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){z=a=n;try{if(h=z.stateNode,u)x=h.style,typeof x.setProperty=="function"?x.setProperty("display","none","important"):x.display="none";else{w=z.stateNode;var Et=z.memoizedProps.style,ft=Et!=null&&Et.hasOwnProperty("display")?Et.display:null;w.style.display=ft==null||typeof ft=="boolean"?"":(""+ft).trim()}}catch(Qt){Ve(z,z.return,Qt)}}}else if(n.tag===6){if(a===null){z=n;try{z.stateNode.nodeValue=u?"":z.memoizedProps}catch(Qt){Ve(z,z.return,Qt)}}}else if(n.tag===18){if(a===null){z=n;try{var pt=z.stateNode;u?Qg(pt,!0):Qg(z.stateNode,!1)}catch(Qt){Ve(z,z.return,Qt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,cc(e,a))));break;case 19:ii(n,e),ai(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,cc(e,o)));break;case 30:break;case 21:break;default:ii(n,e),ai(e)}}function ai(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(j0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,h=th(e);lc(e,h,u);break;case 5:var x=a.stateNode;a.flags&32&&(Kn(x,""),a.flags&=-33);var w=th(e);lc(e,w,x);break;case 3:case 4:var z=a.stateNode.containerInfo,ot=th(e);eh(e,ot,z);break;default:throw Error(s(161))}}catch(xt){Ve(e,e.return,xt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function og(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;og(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function Sa(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)eg(e,n.alternate,n),n=n.sibling}function Bs(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Za(4,n,n.return),Bs(n);break;case 1:Zi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Q0(n,n.return,a),Bs(n);break;case 27:Xo(n.stateNode);case 26:case 5:Zi(n,n.return),Bs(n);break;case 22:n.memoizedState===null&&Bs(n);break;case 30:Bs(n);break;default:Bs(n)}e=e.sibling}}function xa(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,h=n,x=h.flags;switch(h.tag){case 0:case 11:case 15:xa(u,h,a),Oo(4,h);break;case 1:if(xa(u,h,a),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ot){Ve(o,o.return,ot)}if(o=h,u=o.updateQueue,u!==null){var w=o.stateNode;try{var z=u.shared.hiddenCallbacks;if(z!==null)for(u.shared.hiddenCallbacks=null,u=0;u<z.length;u++)Fm(z[u],w)}catch(ot){Ve(o,o.return,ot)}}a&&x&64&&K0(h),Po(h,h.return);break;case 27:$0(h);case 26:case 5:xa(u,h,a),a&&o===null&&x&4&&J0(h),Po(h,h.return);break;case 12:xa(u,h,a);break;case 31:xa(u,h,a),a&&x&4&&ag(u,h);break;case 13:xa(u,h,a),a&&x&4&&sg(u,h);break;case 22:h.memoizedState===null&&xa(u,h,a),Po(h,h.return);break;case 30:break;default:xa(u,h,a)}n=n.sibling}}function ih(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Mo(a))}function ah(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Mo(e))}function Fi(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)lg(e,n,a,o),n=n.sibling}function lg(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Fi(e,n,a,o),u&2048&&Oo(9,n);break;case 1:Fi(e,n,a,o);break;case 3:Fi(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Mo(e)));break;case 12:if(u&2048){Fi(e,n,a,o),e=n.stateNode;try{var h=n.memoizedProps,x=h.id,w=h.onPostCommit;typeof w=="function"&&w(x,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(z){Ve(n,n.return,z)}}else Fi(e,n,a,o);break;case 31:Fi(e,n,a,o);break;case 13:Fi(e,n,a,o);break;case 23:break;case 22:h=n.stateNode,x=n.alternate,n.memoizedState!==null?h._visibility&2?Fi(e,n,a,o):Bo(e,n):h._visibility&2?Fi(e,n,a,o):(h._visibility|=2,pr(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&ih(x,n);break;case 24:Fi(e,n,a,o),u&2048&&ah(n.alternate,n);break;default:Fi(e,n,a,o)}}function pr(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=e,x=n,w=a,z=o,ot=x.flags;switch(x.tag){case 0:case 11:case 15:pr(h,x,w,z,u),Oo(8,x);break;case 23:break;case 22:var xt=x.stateNode;x.memoizedState!==null?xt._visibility&2?pr(h,x,w,z,u):Bo(h,x):(xt._visibility|=2,pr(h,x,w,z,u)),u&&ot&2048&&ih(x.alternate,x);break;case 24:pr(h,x,w,z,u),u&&ot&2048&&ah(x.alternate,x);break;default:pr(h,x,w,z,u)}n=n.sibling}}function Bo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:Bo(a,o),u&2048&&ih(o.alternate,o);break;case 24:Bo(a,o),u&2048&&ah(o.alternate,o);break;default:Bo(a,o)}n=n.sibling}}var Io=8192;function mr(e,n,a){if(e.subtreeFlags&Io)for(e=e.child;e!==null;)cg(e,n,a),e=e.sibling}function cg(e,n,a){switch(e.tag){case 26:mr(e,n,a),e.flags&Io&&e.memoizedState!==null&&EM(a,Ii,e.memoizedState,e.memoizedProps);break;case 5:mr(e,n,a);break;case 3:case 4:var o=Ii;Ii=Ec(e.stateNode.containerInfo),mr(e,n,a),Ii=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Io,Io=16777216,mr(e,n,a),Io=o):mr(e,n,a));break;default:mr(e,n,a)}}function ug(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Fo(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Ln=o,hg(o,e)}ug(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)fg(e),e=e.sibling}function fg(e){switch(e.tag){case 0:case 11:case 15:Fo(e),e.flags&2048&&Za(9,e,e.return);break;case 3:Fo(e);break;case 12:Fo(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,uc(e)):Fo(e);break;default:Fo(e)}}function uc(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Ln=o,hg(o,e)}ug(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Za(8,n,n.return),uc(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,uc(n));break;default:uc(n)}e=e.sibling}}function hg(e,n){for(;Ln!==null;){var a=Ln;switch(a.tag){case 0:case 11:case 15:Za(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:Mo(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Ln=o;else t:for(a=e;Ln!==null;){o=Ln;var u=o.sibling,h=o.return;if(ng(o),o===a){Ln=null;break t}if(u!==null){u.return=h,Ln=u;break t}Ln=h}}}var Fx={getCacheForType:function(e){var n=Fn(xn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Fn(xn).controller.signal}},zx=typeof WeakMap=="function"?WeakMap:Map,Ie=0,$e=null,ye=null,Te=0,Ge=0,mi=null,Ka=!1,gr=!1,sh=!1,Ma=0,hn=0,Qa=0,Is=0,rh=0,gi=0,_r=0,zo=null,si=null,oh=!1,fc=0,dg=0,hc=1/0,dc=null,Ja=null,Rn=0,ja=null,vr=null,ya=0,lh=0,ch=null,pg=null,Ho=0,uh=null;function _i(){return(Ie&2)!==0&&Te!==0?Te&-Te:F.T!==null?gh():oo()}function mg(){if(gi===0)if((Te&536870912)===0||Re){var e=ue;ue<<=1,(ue&3932160)===0&&(ue=262144),gi=e}else gi=536870912;return e=di.current,e!==null&&(e.flags|=32),gi}function ri(e,n,a){(e===$e&&(Ge===2||Ge===9)||e.cancelPendingCommit!==null)&&(Sr(e,0),$a(e,Te,gi,!1)),Zt(e,a),((Ie&2)===0||e!==$e)&&(e===$e&&((Ie&2)===0&&(Is|=a),hn===4&&$a(e,Te,gi,!1)),Ki(e))}function gg(e,n,a){if((Ie&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||Dt(e,n),u=o?Vx(e,n):hh(e,n,!0),h=o;do{if(u===0){gr&&!o&&$a(e,n,0,!1);break}else{if(a=e.current.alternate,h&&!Hx(a)){u=hh(e,n,!1),h=!1;continue}if(u===2){if(h=n,e.errorRecoveryDisabledLanes&h)var x=0;else x=e.pendingLanes&-536870913,x=x!==0?x:x&536870912?536870912:0;if(x!==0){n=x;t:{var w=e;u=zo;var z=w.current.memoizedState.isDehydrated;if(z&&(Sr(w,x).flags|=256),x=hh(w,x,!1),x!==2){if(sh&&!z){w.errorRecoveryDisabledLanes|=h,Is|=h,u=4;break t}h=si,si=u,h!==null&&(si===null?si=h:si.push.apply(si,h))}u=x}if(h=!1,u!==2)continue}}if(u===1){Sr(e,0),$a(e,n,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:$a(o,n,gi,!Ka);break t;case 2:si=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=fc+300-ze(),10<u)){if($a(o,n,gi,!Ka),Mt(o,0,!0)!==0)break t;ya=n,o.timeoutHandle=qg(_g.bind(null,o,a,si,dc,oh,n,gi,Is,_r,Ka,h,"Throttled",-0,0),u);break t}_g(o,a,si,dc,oh,n,gi,Is,_r,Ka,h,null,-0,0)}}break}while(!0);Ki(e)}function _g(e,n,a,o,u,h,x,w,z,ot,xt,Et,ft,pt){if(e.timeoutHandle=-1,Et=n.subtreeFlags,Et&8192||(Et&16785408)===16785408){Et={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ei},cg(n,h,Et);var Qt=(h&62914560)===h?fc-ze():(h&4194048)===h?dg-ze():0;if(Qt=bM(Et,Qt),Qt!==null){ya=h,e.cancelPendingCommit=Qt(Tg.bind(null,e,n,h,a,o,u,x,w,z,xt,Et,null,ft,pt)),$a(e,h,x,!ot);return}}Tg(e,n,h,a,o,u,x,w,z)}function Hx(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],h=u.getSnapshot;u=u.value;try{if(!fi(h(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function $a(e,n,a,o){n&=~rh,n&=~Is,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var h=31-Xt(u),x=1<<h;o[h]=-1,u&=~x}a!==0&&De(e,a,n)}function pc(){return(Ie&6)===0?(Go(0),!1):!0}function fh(){if(ye!==null){if(Ge===0)var e=ye.return;else e=ye,fa=ws=null,Rf(e),cr=null,Eo=0,e=ye;for(;e!==null;)Z0(e.alternate,e),e=e.return;ye=null}}function Sr(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,rM(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ya=0,fh(),$e=e,ye=a=ca(e.current,null),Te=n,Ge=0,mi=null,Ka=!1,gr=Dt(e,n),sh=!1,_r=gi=rh=Is=Qa=hn=0,si=zo=null,oh=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-Xt(o),h=1<<u;n|=e[u],o&=~h}return Ma=n,Pl(),a}function vg(e,n){ge=null,F.H=Uo,n===lr||n===kl?(n=Om(),Ge=3):n===mf?(n=Om(),Ge=4):Ge=n===kf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,mi=n,ye===null&&(hn=1,ic(e,Ti(n,e.current)))}function Sg(){var e=di.current;return e===null?!0:(Te&4194048)===Te?Ci===null:(Te&62914560)===Te||(Te&536870912)!==0?e===Ci:!1}function xg(){var e=F.H;return F.H=Uo,e===null?Uo:e}function Mg(){var e=F.A;return F.A=Fx,e}function mc(){hn=4,Ka||(Te&4194048)!==Te&&di.current!==null||(gr=!0),(Qa&134217727)===0&&(Is&134217727)===0||$e===null||$a($e,Te,gi,!1)}function hh(e,n,a){var o=Ie;Ie|=2;var u=xg(),h=Mg();($e!==e||Te!==n)&&(dc=null,Sr(e,n)),n=!1;var x=hn;t:do try{if(Ge!==0&&ye!==null){var w=ye,z=mi;switch(Ge){case 8:fh(),x=6;break t;case 3:case 2:case 9:case 6:di.current===null&&(n=!0);var ot=Ge;if(Ge=0,mi=null,xr(e,w,z,ot),a&&gr){x=0;break t}break;default:ot=Ge,Ge=0,mi=null,xr(e,w,z,ot)}}Gx(),x=hn;break}catch(xt){vg(e,xt)}while(!0);return n&&e.shellSuspendCounter++,fa=ws=null,Ie=o,F.H=u,F.A=h,ye===null&&($e=null,Te=0,Pl()),x}function Gx(){for(;ye!==null;)yg(ye)}function Vx(e,n){var a=Ie;Ie|=2;var o=xg(),u=Mg();$e!==e||Te!==n?(dc=null,hc=ze()+500,Sr(e,n)):gr=Dt(e,n);t:do try{if(Ge!==0&&ye!==null){n=ye;var h=mi;e:switch(Ge){case 1:Ge=0,mi=null,xr(e,n,h,1);break;case 2:case 9:if(Lm(h)){Ge=0,mi=null,Eg(n);break}n=function(){Ge!==2&&Ge!==9||$e!==e||(Ge=7),Ki(e)},h.then(n,n);break t;case 3:Ge=7;break t;case 4:Ge=5;break t;case 7:Lm(h)?(Ge=0,mi=null,Eg(n)):(Ge=0,mi=null,xr(e,n,h,7));break;case 5:var x=null;switch(ye.tag){case 26:x=ye.memoizedState;case 5:case 27:var w=ye;if(x?l_(x):w.stateNode.complete){Ge=0,mi=null;var z=w.sibling;if(z!==null)ye=z;else{var ot=w.return;ot!==null?(ye=ot,gc(ot)):ye=null}break e}}Ge=0,mi=null,xr(e,n,h,5);break;case 6:Ge=0,mi=null,xr(e,n,h,6);break;case 8:fh(),hn=6;break t;default:throw Error(s(462))}}kx();break}catch(xt){vg(e,xt)}while(!0);return fa=ws=null,F.H=o,F.A=u,Ie=a,ye!==null?0:($e=null,Te=0,Pl(),hn)}function kx(){for(;ye!==null&&!nn();)yg(ye)}function yg(e){var n=Y0(e.alternate,e,Ma);e.memoizedProps=e.pendingProps,n===null?gc(e):ye=n}function Eg(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=H0(a,n,n.pendingProps,n.type,void 0,Te);break;case 11:n=H0(a,n,n.pendingProps,n.type.render,n.ref,Te);break;case 5:Rf(n);default:Z0(a,n),n=ye=Mm(n,Ma),n=Y0(a,n,Ma)}e.memoizedProps=e.pendingProps,n===null?gc(e):ye=n}function xr(e,n,a,o){fa=ws=null,Rf(n),cr=null,Eo=0;var u=n.return;try{if(Ux(e,u,n,a,Te)){hn=1,ic(e,Ti(a,e.current)),ye=null;return}}catch(h){if(u!==null)throw ye=u,h;hn=1,ic(e,Ti(a,e.current)),ye=null;return}n.flags&32768?(Re||o===1?e=!0:gr||(Te&536870912)!==0?e=!1:(Ka=e=!0,(o===2||o===9||o===3||o===6)&&(o=di.current,o!==null&&o.tag===13&&(o.flags|=16384))),bg(n,e)):gc(n)}function gc(e){var n=e;do{if((n.flags&32768)!==0){bg(n,Ka);return}e=n.return;var a=Ox(n.alternate,n,Ma);if(a!==null){ye=a;return}if(n=n.sibling,n!==null){ye=n;return}ye=n=e}while(n!==null);hn===0&&(hn=5)}function bg(e,n){do{var a=Px(e.alternate,e);if(a!==null){a.flags&=32767,ye=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){ye=e;return}ye=e=a}while(e!==null);hn=6,ye=null}function Tg(e,n,a,o,u,h,x,w,z){e.cancelPendingCommit=null;do _c();while(Rn!==0);if((Ie&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(h=n.lanes|n.childLanes,h|=$u,We(e,a,h,x,w,z),e===$e&&(ye=$e=null,Te=0),vr=n,ja=e,ya=a,lh=h,ch=u,pg=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,qx(j,function(){return Dg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=F.T,F.T=null,u=G.p,G.p=2,x=Ie,Ie|=4;try{Bx(e,n,a)}finally{Ie=x,G.p=u,F.T=o}}Rn=1,Ag(),Rg(),wg()}}function Ag(){if(Rn===1){Rn=0;var e=ja,n=vr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=F.T,F.T=null;var o=G.p;G.p=2;var u=Ie;Ie|=4;try{rg(n,e);var h=bh,x=hm(e.containerInfo),w=h.focusedElem,z=h.selectionRange;if(x!==w&&w&&w.ownerDocument&&fm(w.ownerDocument.documentElement,w)){if(z!==null&&Zu(w)){var ot=z.start,xt=z.end;if(xt===void 0&&(xt=ot),"selectionStart"in w)w.selectionStart=ot,w.selectionEnd=Math.min(xt,w.value.length);else{var Et=w.ownerDocument||document,ft=Et&&Et.defaultView||window;if(ft.getSelection){var pt=ft.getSelection(),Qt=w.textContent.length,oe=Math.min(z.start,Qt),Ke=z.end===void 0?oe:Math.min(z.end,Qt);!pt.extend&&oe>Ke&&(x=Ke,Ke=oe,oe=x);var J=um(w,oe),k=um(w,Ke);if(J&&k&&(pt.rangeCount!==1||pt.anchorNode!==J.node||pt.anchorOffset!==J.offset||pt.focusNode!==k.node||pt.focusOffset!==k.offset)){var rt=Et.createRange();rt.setStart(J.node,J.offset),pt.removeAllRanges(),oe>Ke?(pt.addRange(rt),pt.extend(k.node,k.offset)):(rt.setEnd(k.node,k.offset),pt.addRange(rt))}}}}for(Et=[],pt=w;pt=pt.parentNode;)pt.nodeType===1&&Et.push({element:pt,left:pt.scrollLeft,top:pt.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<Et.length;w++){var yt=Et[w];yt.element.scrollLeft=yt.left,yt.element.scrollTop=yt.top}}Cc=!!Eh,bh=Eh=null}finally{Ie=u,G.p=o,F.T=a}}e.current=n,Rn=2}}function Rg(){if(Rn===2){Rn=0;var e=ja,n=vr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=F.T,F.T=null;var o=G.p;G.p=2;var u=Ie;Ie|=4;try{eg(e,n.alternate,n)}finally{Ie=u,G.p=o,F.T=a}}Rn=3}}function wg(){if(Rn===4||Rn===3){Rn=0,W();var e=ja,n=vr,a=ya,o=pg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Rn=5:(Rn=0,vr=ja=null,Cg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Ja=null),ro(a),n=n.stateNode,St&&typeof St.onCommitFiberRoot=="function")try{St.onCommitFiberRoot(_t,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=F.T,u=G.p,G.p=2,F.T=null;try{for(var h=e.onRecoverableError,x=0;x<o.length;x++){var w=o[x];h(w.value,{componentStack:w.stack})}}finally{F.T=n,G.p=u}}(ya&3)!==0&&_c(),Ki(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===uh?Ho++:(Ho=0,uh=e):Ho=0,Go(0)}}function Cg(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,Mo(n)))}function _c(){return Ag(),Rg(),wg(),Dg()}function Dg(){if(Rn!==5)return!1;var e=ja,n=lh;lh=0;var a=ro(ya),o=F.T,u=G.p;try{G.p=32>a?32:a,F.T=null,a=ch,ch=null;var h=ja,x=ya;if(Rn=0,vr=ja=null,ya=0,(Ie&6)!==0)throw Error(s(331));var w=Ie;if(Ie|=4,fg(h.current),lg(h,h.current,x,a),Ie=w,Go(0,!1),St&&typeof St.onPostCommitFiberRoot=="function")try{St.onPostCommitFiberRoot(_t,h)}catch{}return!0}finally{G.p=u,F.T=o,Cg(e,n)}}function Ug(e,n,a){n=Ti(a,n),n=Vf(e.stateNode,n,2),e=Wa(e,n,2),e!==null&&(Zt(e,2),Ki(e))}function Ve(e,n,a){if(e.tag===3)Ug(e,e,a);else for(;n!==null;){if(n.tag===3){Ug(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ja===null||!Ja.has(o))){e=Ti(a,e),a=L0(2),o=Wa(n,a,2),o!==null&&(N0(a,o,n,e),Zt(o,2),Ki(o));break}}n=n.return}}function dh(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new zx;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(sh=!0,u.add(a),e=Xx.bind(null,e,n,a),n.then(e,e))}function Xx(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,$e===e&&(Te&a)===a&&(hn===4||hn===3&&(Te&62914560)===Te&&300>ze()-fc?(Ie&2)===0&&Sr(e,0):rh|=a,_r===Te&&(_r=0)),Ki(e)}function Lg(e,n){n===0&&(n=bt()),e=Ts(e,n),e!==null&&(Zt(e,n),Ki(e))}function Wx(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),Lg(e,a)}function Yx(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),Lg(e,a)}function qx(e,n){return dn(e,n)}var vc=null,Mr=null,ph=!1,Sc=!1,mh=!1,ts=0;function Ki(e){e!==Mr&&e.next===null&&(Mr===null?vc=Mr=e:Mr=Mr.next=e),Sc=!0,ph||(ph=!0,Kx())}function Go(e,n){if(!mh&&Sc){mh=!0;do for(var a=!1,o=vc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var x=o.suspendedLanes,w=o.pingedLanes;h=(1<<31-Xt(42|e)+1)-1,h&=u&~(x&~w),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,Bg(o,h))}else h=Te,h=Mt(o,o===$e?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||Dt(o,h)||(a=!0,Bg(o,h));o=o.next}while(a);mh=!1}}function Zx(){Ng()}function Ng(){Sc=ph=!1;var e=0;ts!==0&&sM()&&(e=ts);for(var n=ze(),a=null,o=vc;o!==null;){var u=o.next,h=Og(o,n);h===0?(o.next=null,a===null?vc=u:a.next=u,u===null&&(Mr=a)):(a=o,(e!==0||(h&3)!==0)&&(Sc=!0)),o=u}Rn!==0&&Rn!==5||Go(e),ts!==0&&(ts=0)}function Og(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var x=31-Xt(h),w=1<<x,z=u[x];z===-1?((w&a)===0||(w&o)!==0)&&(u[x]=Gt(w,n)):z<=n&&(e.expiredLanes|=w),h&=~w}if(n=$e,a=Te,a=Mt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Ge===2||Ge===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&Fe(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Dt(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&Fe(o),ro(a)){case 2:case 8:a=b;break;case 32:a=j;break;case 268435456:a=gt;break;default:a=j}return o=Pg.bind(null,e),a=dn(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&Fe(o),e.callbackPriority=2,e.callbackNode=null,2}function Pg(e,n){if(Rn!==0&&Rn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(_c()&&e.callbackNode!==a)return null;var o=Te;return o=Mt(e,e===$e?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(gg(e,o,n),Og(e,ze()),e.callbackNode!=null&&e.callbackNode===a?Pg.bind(null,e):null)}function Bg(e,n){if(_c())return null;gg(e,n,!0)}function Kx(){oM(function(){(Ie&6)!==0?dn(B,Zx):Ng()})}function gh(){if(ts===0){var e=rr;e===0&&(e=ne,ne<<=1,(ne&261888)===0&&(ne=256)),ts=e}return ts}function Ig(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Pi(""+e)}function Fg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function Qx(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var h=Ig((u[Bn]||null).action),x=o.submitter;x&&(n=(n=x[Bn]||null)?Ig(n.formAction):x.getAttribute("formAction"),n!==null&&(h=n,x=null));var w=new Ul("action","action",null,o,u);e.push({event:w,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(ts!==0){var z=x?Fg(u,x):new FormData(u);Bf(a,{pending:!0,data:z,method:u.method,action:h},null,z)}}else typeof h=="function"&&(w.preventDefault(),z=x?Fg(u,x):new FormData(u),Bf(a,{pending:!0,data:z,method:u.method,action:h},h,z))},currentTarget:u}]})}}for(var _h=0;_h<ju.length;_h++){var vh=ju[_h],Jx=vh.toLowerCase(),jx=vh[0].toUpperCase()+vh.slice(1);Bi(Jx,"on"+jx)}Bi(mm,"onAnimationEnd"),Bi(gm,"onAnimationIteration"),Bi(_m,"onAnimationStart"),Bi("dblclick","onDoubleClick"),Bi("focusin","onFocus"),Bi("focusout","onBlur"),Bi(px,"onTransitionRun"),Bi(mx,"onTransitionStart"),Bi(gx,"onTransitionCancel"),Bi(vm,"onTransitionEnd"),V("onMouseEnter",["mouseout","mouseover"]),V("onMouseLeave",["mouseout","mouseover"]),V("onPointerEnter",["pointerout","pointerover"]),V("onPointerLeave",["pointerout","pointerover"]),A("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),A("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),A("onBeforeInput",["compositionend","keypress","textInput","paste"]),A("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),A("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),A("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Vo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$x=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vo));function zg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var h=void 0;if(n)for(var x=o.length-1;0<=x;x--){var w=o[x],z=w.instance,ot=w.currentTarget;if(w=w.listener,z!==h&&u.isPropagationStopped())break t;h=w,u.currentTarget=ot;try{h(u)}catch(xt){Ol(xt)}u.currentTarget=null,h=z}else for(x=0;x<o.length;x++){if(w=o[x],z=w.instance,ot=w.currentTarget,w=w.listener,z!==h&&u.isPropagationStopped())break t;h=w,u.currentTarget=ot;try{h(u)}catch(xt){Ol(xt)}u.currentTarget=null,h=z}}}}function Ee(e,n){var a=n[Ss];a===void 0&&(a=n[Ss]=new Set);var o=e+"__bubble";a.has(o)||(Hg(n,e,2,!1),a.add(o))}function Sh(e,n,a){var o=0;n&&(o|=4),Hg(a,e,o,n)}var xc="_reactListening"+Math.random().toString(36).slice(2);function xh(e){if(!e[xc]){e[xc]=!0,Rl.forEach(function(a){a!=="selectionchange"&&($x.has(a)||Sh(a,!1,e),Sh(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[xc]||(n[xc]=!0,Sh("selectionchange",!1,n))}}function Hg(e,n,a,o){switch(m_(n)){case 2:var u=RM;break;case 8:u=wM;break;default:u=Ph}a=u.bind(null,n,a,e),u=void 0,!zu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function Mh(e,n,a,o,u){var h=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var x=o.tag;if(x===3||x===4){var w=o.stateNode.containerInfo;if(w===u)break;if(x===4)for(x=o.return;x!==null;){var z=x.tag;if((z===3||z===4)&&x.stateNode.containerInfo===u)return;x=x.return}for(;w!==null;){if(x=ra(w),x===null)return;if(z=x.tag,z===5||z===6||z===26||z===27){o=h=x;continue t}w=w.parentNode}}o=o.return}Wp(function(){var ot=h,xt=Iu(a),Et=[];t:{var ft=Sm.get(e);if(ft!==void 0){var pt=Ul,Qt=e;switch(e){case"keypress":if(Cl(a)===0)break t;case"keydown":case"keyup":pt=YS;break;case"focusin":Qt="focus",pt=ku;break;case"focusout":Qt="blur",pt=ku;break;case"beforeblur":case"afterblur":pt=ku;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":pt=Zp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":pt=OS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":pt=KS;break;case mm:case gm:case _m:pt=IS;break;case vm:pt=JS;break;case"scroll":case"scrollend":pt=LS;break;case"wheel":pt=$S;break;case"copy":case"cut":case"paste":pt=zS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":pt=Qp;break;case"toggle":case"beforetoggle":pt=ex}var oe=(n&4)!==0,Ke=!oe&&(e==="scroll"||e==="scrollend"),J=oe?ft!==null?ft+"Capture":null:ft;oe=[];for(var k=ot,rt;k!==null;){var yt=k;if(rt=yt.stateNode,yt=yt.tag,yt!==5&&yt!==26&&yt!==27||rt===null||J===null||(yt=co(k,J),yt!=null&&oe.push(ko(k,yt,rt))),Ke)break;k=k.return}0<oe.length&&(ft=new pt(ft,Qt,null,a,xt),Et.push({event:ft,listeners:oe}))}}if((n&7)===0){t:{if(ft=e==="mouseover"||e==="pointerover",pt=e==="mouseout"||e==="pointerout",ft&&a!==Bu&&(Qt=a.relatedTarget||a.fromElement)&&(ra(Qt)||Qt[ti]))break t;if((pt||ft)&&(ft=xt.window===xt?xt:(ft=xt.ownerDocument)?ft.defaultView||ft.parentWindow:window,pt?(Qt=a.relatedTarget||a.toElement,pt=ot,Qt=Qt?ra(Qt):null,Qt!==null&&(Ke=c(Qt),oe=Qt.tag,Qt!==Ke||oe!==5&&oe!==27&&oe!==6)&&(Qt=null)):(pt=null,Qt=ot),pt!==Qt)){if(oe=Zp,yt="onMouseLeave",J="onMouseEnter",k="mouse",(e==="pointerout"||e==="pointerover")&&(oe=Qp,yt="onPointerLeave",J="onPointerEnter",k="pointer"),Ke=pt==null?ft:Ms(pt),rt=Qt==null?ft:Ms(Qt),ft=new oe(yt,k+"leave",pt,a,xt),ft.target=Ke,ft.relatedTarget=rt,yt=null,ra(xt)===ot&&(oe=new oe(J,k+"enter",Qt,a,xt),oe.target=rt,oe.relatedTarget=Ke,yt=oe),Ke=yt,pt&&Qt)e:{for(oe=tM,J=pt,k=Qt,rt=0,yt=J;yt;yt=oe(yt))rt++;yt=0;for(var ie=k;ie;ie=oe(ie))yt++;for(;0<rt-yt;)J=oe(J),rt--;for(;0<yt-rt;)k=oe(k),yt--;for(;rt--;){if(J===k||k!==null&&J===k.alternate){oe=J;break e}J=oe(J),k=oe(k)}oe=null}else oe=null;pt!==null&&Gg(Et,ft,pt,oe,!1),Qt!==null&&Ke!==null&&Gg(Et,Ke,Qt,oe,!0)}}t:{if(ft=ot?Ms(ot):window,pt=ft.nodeName&&ft.nodeName.toLowerCase(),pt==="select"||pt==="input"&&ft.type==="file")var Ne=am;else if(nm(ft))if(sm)Ne=fx;else{Ne=cx;var jt=lx}else pt=ft.nodeName,!pt||pt.toLowerCase()!=="input"||ft.type!=="checkbox"&&ft.type!=="radio"?ot&&yi(ot.elementType)&&(Ne=am):Ne=ux;if(Ne&&(Ne=Ne(e,ot))){im(Et,Ne,a,xt);break t}jt&&jt(e,ft,ot),e==="focusout"&&ot&&ft.type==="number"&&ot.memoizedProps.value!=null&&An(ft,"number",ft.value)}switch(jt=ot?Ms(ot):window,e){case"focusin":(nm(jt)||jt.contentEditable==="true")&&(js=jt,Ku=ot,vo=null);break;case"focusout":vo=Ku=js=null;break;case"mousedown":Qu=!0;break;case"contextmenu":case"mouseup":case"dragend":Qu=!1,dm(Et,a,xt);break;case"selectionchange":if(dx)break;case"keydown":case"keyup":dm(Et,a,xt)}var _e;if(Wu)t:{switch(e){case"compositionstart":var Ae="onCompositionStart";break t;case"compositionend":Ae="onCompositionEnd";break t;case"compositionupdate":Ae="onCompositionUpdate";break t}Ae=void 0}else Js?tm(e,a)&&(Ae="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Ae="onCompositionStart");Ae&&(Jp&&a.locale!=="ko"&&(Js||Ae!=="onCompositionStart"?Ae==="onCompositionEnd"&&Js&&(_e=Yp()):(Fa=xt,Hu="value"in Fa?Fa.value:Fa.textContent,Js=!0)),jt=Mc(ot,Ae),0<jt.length&&(Ae=new Kp(Ae,e,null,a,xt),Et.push({event:Ae,listeners:jt}),_e?Ae.data=_e:(_e=em(a),_e!==null&&(Ae.data=_e)))),(_e=ix?ax(e,a):sx(e,a))&&(Ae=Mc(ot,"onBeforeInput"),0<Ae.length&&(jt=new Kp("onBeforeInput","beforeinput",null,a,xt),Et.push({event:jt,listeners:Ae}),jt.data=_e)),Qx(Et,e,ot,a,xt)}zg(Et,n)})}function ko(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Mc(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=co(e,a),u!=null&&o.unshift(ko(e,u,h)),u=co(e,n),u!=null&&o.push(ko(e,u,h))),e.tag===3)return o;e=e.return}return[]}function tM(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Gg(e,n,a,o,u){for(var h=n._reactName,x=[];a!==null&&a!==o;){var w=a,z=w.alternate,ot=w.stateNode;if(w=w.tag,z!==null&&z===o)break;w!==5&&w!==26&&w!==27||ot===null||(z=ot,u?(ot=co(a,h),ot!=null&&x.unshift(ko(a,ot,z))):u||(ot=co(a,h),ot!=null&&x.push(ko(a,ot,z)))),a=a.return}x.length!==0&&e.push({event:n,listeners:x})}var eM=/\r\n?/g,nM=/\u0000|\uFFFD/g;function Vg(e){return(typeof e=="string"?e:""+e).replace(eM,`
`).replace(nM,"")}function kg(e,n){return n=Vg(n),Vg(e)===n}function Ze(e,n,a,o,u,h){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Kn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Kn(e,""+o);break;case"className":Ot(e,"class",o);break;case"tabIndex":Ot(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ot(e,a,o);break;case"style":ln(e,o,h);break;case"data":if(n!=="object"){Ot(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Pi(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(n!=="input"&&Ze(e,n,"name",u.name,u,null),Ze(e,n,"formEncType",u.formEncType,u,null),Ze(e,n,"formMethod",u.formMethod,u,null),Ze(e,n,"formTarget",u.formTarget,u,null)):(Ze(e,n,"encType",u.encType,u,null),Ze(e,n,"method",u.method,u,null),Ze(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Pi(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Ei);break;case"onScroll":o!=null&&Ee("scroll",e);break;case"onScrollEnd":o!=null&&Ee("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=Pi(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":Ee("beforetoggle",e),Ee("toggle",e),Wt(e,"popover",o);break;case"xlinkActuate":Vt(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Vt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Vt(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Vt(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Vt(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Vt(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Vt(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Wt(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Ye.get(a)||a,Wt(e,a,o))}}function yh(e,n,a,o,u,h){switch(a){case"style":ln(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Kn(e,o):(typeof o=="number"||typeof o=="bigint")&&Kn(e,""+o);break;case"onScroll":o!=null&&Ee("scroll",e);break;case"onScrollEnd":o!=null&&Ee("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Ei);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!lo.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),h=e[Bn]||null,h=h!=null?h[a]:null,typeof h=="function"&&e.removeEventListener(n,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Wt(e,a,o)}}}function Hn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ee("error",e),Ee("load",e);var o=!1,u=!1,h;for(h in a)if(a.hasOwnProperty(h)){var x=a[h];if(x!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ze(e,n,h,x,a,null)}}u&&Ze(e,n,"srcSet",a.srcSet,a,null),o&&Ze(e,n,"src",a.src,a,null);return;case"input":Ee("invalid",e);var w=h=x=u=null,z=null,ot=null;for(o in a)if(a.hasOwnProperty(o)){var xt=a[o];if(xt!=null)switch(o){case"name":u=xt;break;case"type":x=xt;break;case"checked":z=xt;break;case"defaultChecked":ot=xt;break;case"value":h=xt;break;case"defaultValue":w=xt;break;case"children":case"dangerouslySetInnerHTML":if(xt!=null)throw Error(s(137,n));break;default:Ze(e,n,o,xt,a,null)}}Yt(e,h,w,z,ot,x,u,!1);return;case"select":Ee("invalid",e),o=x=h=null;for(u in a)if(a.hasOwnProperty(u)&&(w=a[u],w!=null))switch(u){case"value":h=w;break;case"defaultValue":x=w;break;case"multiple":o=w;default:Ze(e,n,u,w,a,null)}n=h,a=x,e.multiple=!!o,n!=null?Se(e,!!o,n,!1):a!=null&&Se(e,!!o,a,!0);return;case"textarea":Ee("invalid",e),h=u=o=null;for(x in a)if(a.hasOwnProperty(x)&&(w=a[x],w!=null))switch(x){case"value":o=w;break;case"defaultValue":u=w;break;case"children":h=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(s(91));break;default:Ze(e,n,x,w,a,null)}ui(e,o,u,h);return;case"option":for(z in a)a.hasOwnProperty(z)&&(o=a[z],o!=null)&&(z==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":Ze(e,n,z,o,a,null));return;case"dialog":Ee("beforetoggle",e),Ee("toggle",e),Ee("cancel",e),Ee("close",e);break;case"iframe":case"object":Ee("load",e);break;case"video":case"audio":for(o=0;o<Vo.length;o++)Ee(Vo[o],e);break;case"image":Ee("error",e),Ee("load",e);break;case"details":Ee("toggle",e);break;case"embed":case"source":case"link":Ee("error",e),Ee("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ot in a)if(a.hasOwnProperty(ot)&&(o=a[ot],o!=null))switch(ot){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ze(e,n,ot,o,a,null)}return;default:if(yi(n)){for(xt in a)a.hasOwnProperty(xt)&&(o=a[xt],o!==void 0&&yh(e,n,xt,o,a,void 0));return}}for(w in a)a.hasOwnProperty(w)&&(o=a[w],o!=null&&Ze(e,n,w,o,a,null))}function iM(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,x=null,w=null,z=null,ot=null,xt=null;for(pt in a){var Et=a[pt];if(a.hasOwnProperty(pt)&&Et!=null)switch(pt){case"checked":break;case"value":break;case"defaultValue":z=Et;default:o.hasOwnProperty(pt)||Ze(e,n,pt,null,o,Et)}}for(var ft in o){var pt=o[ft];if(Et=a[ft],o.hasOwnProperty(ft)&&(pt!=null||Et!=null))switch(ft){case"type":h=pt;break;case"name":u=pt;break;case"checked":ot=pt;break;case"defaultChecked":xt=pt;break;case"value":x=pt;break;case"defaultValue":w=pt;break;case"children":case"dangerouslySetInnerHTML":if(pt!=null)throw Error(s(137,n));break;default:pt!==Et&&Ze(e,n,ft,pt,o,Et)}}Sn(e,x,w,z,ot,xt,h,u);return;case"select":pt=x=w=ft=null;for(h in a)if(z=a[h],a.hasOwnProperty(h)&&z!=null)switch(h){case"value":break;case"multiple":pt=z;default:o.hasOwnProperty(h)||Ze(e,n,h,null,o,z)}for(u in o)if(h=o[u],z=a[u],o.hasOwnProperty(u)&&(h!=null||z!=null))switch(u){case"value":ft=h;break;case"defaultValue":w=h;break;case"multiple":x=h;default:h!==z&&Ze(e,n,u,h,o,z)}n=w,a=x,o=pt,ft!=null?Se(e,!!a,ft,!1):!!o!=!!a&&(n!=null?Se(e,!!a,n,!0):Se(e,!!a,a?[]:"",!1));return;case"textarea":pt=ft=null;for(w in a)if(u=a[w],a.hasOwnProperty(w)&&u!=null&&!o.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:Ze(e,n,w,null,o,u)}for(x in o)if(u=o[x],h=a[x],o.hasOwnProperty(x)&&(u!=null||h!=null))switch(x){case"value":ft=u;break;case"defaultValue":pt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==h&&Ze(e,n,x,u,o,h)}Zn(e,ft,pt);return;case"option":for(var Qt in a)ft=a[Qt],a.hasOwnProperty(Qt)&&ft!=null&&!o.hasOwnProperty(Qt)&&(Qt==="selected"?e.selected=!1:Ze(e,n,Qt,null,o,ft));for(z in o)ft=o[z],pt=a[z],o.hasOwnProperty(z)&&ft!==pt&&(ft!=null||pt!=null)&&(z==="selected"?e.selected=ft&&typeof ft!="function"&&typeof ft!="symbol":Ze(e,n,z,ft,o,pt));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var oe in a)ft=a[oe],a.hasOwnProperty(oe)&&ft!=null&&!o.hasOwnProperty(oe)&&Ze(e,n,oe,null,o,ft);for(ot in o)if(ft=o[ot],pt=a[ot],o.hasOwnProperty(ot)&&ft!==pt&&(ft!=null||pt!=null))switch(ot){case"children":case"dangerouslySetInnerHTML":if(ft!=null)throw Error(s(137,n));break;default:Ze(e,n,ot,ft,o,pt)}return;default:if(yi(n)){for(var Ke in a)ft=a[Ke],a.hasOwnProperty(Ke)&&ft!==void 0&&!o.hasOwnProperty(Ke)&&yh(e,n,Ke,void 0,o,ft);for(xt in o)ft=o[xt],pt=a[xt],!o.hasOwnProperty(xt)||ft===pt||ft===void 0&&pt===void 0||yh(e,n,xt,ft,o,pt);return}}for(var J in a)ft=a[J],a.hasOwnProperty(J)&&ft!=null&&!o.hasOwnProperty(J)&&Ze(e,n,J,null,o,ft);for(Et in o)ft=o[Et],pt=a[Et],!o.hasOwnProperty(Et)||ft===pt||ft==null&&pt==null||Ze(e,n,Et,ft,o,pt)}function Xg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function aM(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],h=u.transferSize,x=u.initiatorType,w=u.duration;if(h&&w&&Xg(x)){for(x=0,w=u.responseEnd,o+=1;o<a.length;o++){var z=a[o],ot=z.startTime;if(ot>w)break;var xt=z.transferSize,Et=z.initiatorType;xt&&Xg(Et)&&(z=z.responseEnd,x+=xt*(z<w?1:(w-ot)/(z-ot)))}if(--o,n+=8*(h+x)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Eh=null,bh=null;function yc(e){return e.nodeType===9?e:e.ownerDocument}function Wg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Yg(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Th(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ah=null;function sM(){var e=window.event;return e&&e.type==="popstate"?e===Ah?!1:(Ah=e,!0):(Ah=null,!1)}var qg=typeof setTimeout=="function"?setTimeout:void 0,rM=typeof clearTimeout=="function"?clearTimeout:void 0,Zg=typeof Promise=="function"?Promise:void 0,oM=typeof queueMicrotask=="function"?queueMicrotask:typeof Zg<"u"?function(e){return Zg.resolve(null).then(e).catch(lM)}:qg;function lM(e){setTimeout(function(){throw e})}function es(e){return e==="head"}function Kg(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),Tr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Xo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Xo(a);for(var h=a.firstChild;h;){var x=h.nextSibling,w=h.nodeName;h[Oa]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=x}}else a==="body"&&Xo(e.ownerDocument.body);a=u}while(a);Tr(n)}function Qg(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function Rh(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Rh(a),Pa(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function cM(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Oa])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Di(e.nextSibling),e===null)break}return null}function uM(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Di(e.nextSibling),e===null))return null;return e}function Jg(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Di(e.nextSibling),e===null))return null;return e}function wh(e){return e.data==="$?"||e.data==="$~"}function Ch(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function fM(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Di(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Dh=null;function jg(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return Di(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function $g(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function t_(e,n,a){switch(n=yc(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Xo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Pa(e)}var Ui=new Map,e_=new Set;function Ec(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ea=G.d;G.d={f:hM,r:dM,D:pM,C:mM,L:gM,m:_M,X:SM,S:vM,M:xM};function hM(){var e=Ea.f(),n=pc();return e||n}function dM(e){var n=oa(e);n!==null&&n.tag===5&&n.type==="form"?v0(n):Ea.r(e)}var yr=typeof document>"u"?null:document;function n_(e,n,a){var o=yr;if(o&&typeof n=="string"&&n){var u=ve(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),e_.has(u)||(e_.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Hn(n,"link",e),vn(n),o.head.appendChild(n)))}}function pM(e){Ea.D(e),n_("dns-prefetch",e,null)}function mM(e,n){Ea.C(e,n),n_("preconnect",e,n)}function gM(e,n,a){Ea.L(e,n,a);var o=yr;if(o&&e&&n){var u='link[rel="preload"][as="'+ve(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+ve(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+ve(a.imageSizes)+'"]')):u+='[href="'+ve(e)+'"]';var h=u;switch(n){case"style":h=Er(e);break;case"script":h=br(e)}Ui.has(h)||(e=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),Ui.set(h,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(Wo(h))||n==="script"&&o.querySelector(Yo(h))||(n=o.createElement("link"),Hn(n,"link",e),vn(n),o.head.appendChild(n)))}}function _M(e,n){Ea.m(e,n);var a=yr;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+ve(o)+'"][href="'+ve(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=br(e)}if(!Ui.has(h)&&(e=v({rel:"modulepreload",href:e},n),Ui.set(h,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Yo(h)))return}o=a.createElement("link"),Hn(o,"link",e),vn(o),a.head.appendChild(o)}}}function vM(e,n,a){Ea.S(e,n,a);var o=yr;if(o&&e){var u=Ba(o).hoistableStyles,h=Er(e);n=n||"default";var x=u.get(h);if(!x){var w={loading:0,preload:null};if(x=o.querySelector(Wo(h)))w.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":n},a),(a=Ui.get(h))&&Uh(e,a);var z=x=o.createElement("link");vn(z),Hn(z,"link",e),z._p=new Promise(function(ot,xt){z.onload=ot,z.onerror=xt}),z.addEventListener("load",function(){w.loading|=1}),z.addEventListener("error",function(){w.loading|=2}),w.loading|=4,bc(x,n,o)}x={type:"stylesheet",instance:x,count:1,state:w},u.set(h,x)}}}function SM(e,n){Ea.X(e,n);var a=yr;if(a&&e){var o=Ba(a).hoistableScripts,u=br(e),h=o.get(u);h||(h=a.querySelector(Yo(u)),h||(e=v({src:e,async:!0},n),(n=Ui.get(u))&&Lh(e,n),h=a.createElement("script"),vn(h),Hn(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function xM(e,n){Ea.M(e,n);var a=yr;if(a&&e){var o=Ba(a).hoistableScripts,u=br(e),h=o.get(u);h||(h=a.querySelector(Yo(u)),h||(e=v({src:e,async:!0,type:"module"},n),(n=Ui.get(u))&&Lh(e,n),h=a.createElement("script"),vn(h),Hn(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function i_(e,n,a,o){var u=(u=Ht.current)?Ec(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=Er(a.href),a=Ba(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Er(a.href);var h=Ba(u).hoistableStyles,x=h.get(e);if(x||(u=u.ownerDocument||u,x={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,x),(h=u.querySelector(Wo(e)))&&!h._p&&(x.instance=h,x.state.loading=5),Ui.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ui.set(e,a),h||MM(u,e,a,x.state))),n&&o===null)throw Error(s(528,""));return x}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=br(a),a=Ba(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Er(e){return'href="'+ve(e)+'"'}function Wo(e){return'link[rel="stylesheet"]['+e+"]"}function a_(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function MM(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Hn(n,"link",a),vn(n),e.head.appendChild(n))}function br(e){return'[src="'+ve(e)+'"]'}function Yo(e){return"script[async]"+e}function s_(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+ve(a.href)+'"]');if(o)return n.instance=o,vn(o),o;var u=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),vn(o),Hn(o,"style",u),bc(o,a.precedence,e),n.instance=o;case"stylesheet":u=Er(a.href);var h=e.querySelector(Wo(u));if(h)return n.state.loading|=4,n.instance=h,vn(h),h;o=a_(a),(u=Ui.get(u))&&Uh(o,u),h=(e.ownerDocument||e).createElement("link"),vn(h);var x=h;return x._p=new Promise(function(w,z){x.onload=w,x.onerror=z}),Hn(h,"link",o),n.state.loading|=4,bc(h,a.precedence,e),n.instance=h;case"script":return h=br(a.src),(u=e.querySelector(Yo(h)))?(n.instance=u,vn(u),u):(o=a,(u=Ui.get(h))&&(o=v({},a),Lh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),vn(u),Hn(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,bc(o,a.precedence,e));return n.instance}function bc(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,x=0;x<o.length;x++){var w=o[x];if(w.dataset.precedence===n)h=w;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function Uh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Lh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Tc=null;function r_(e,n,a){if(Tc===null){var o=new Map,u=Tc=new Map;u.set(a,o)}else u=Tc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var h=a[u];if(!(h[Oa]||h[_n]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var x=h.getAttribute(n)||"";x=e+x;var w=o.get(x);w?w.push(h):o.set(x,[h])}}return o}function o_(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function yM(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function l_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function EM(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Er(o.href),h=n.querySelector(Wo(u));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Ac.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=h,vn(h);return}h=n.ownerDocument||n,o=a_(o),(u=Ui.get(u))&&Uh(o,u),h=h.createElement("link"),vn(h);var x=h;x._p=new Promise(function(w,z){x.onload=w,x.onerror=z}),Hn(h,"link",o),a.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=Ac.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var Nh=0;function bM(e,n){return e.stylesheets&&e.count===0&&wc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&wc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+n);0<e.imgBytes&&Nh===0&&(Nh=62500*aM());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&wc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>Nh?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function Ac(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)wc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Rc=null;function wc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Rc=new Map,n.forEach(TM,e),Rc=null,Ac.call(e))}function TM(e,n){if(!(n.state.loading&4)){var a=Rc.get(e);if(a)var o=a.get(null);else{a=new Map,Rc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var x=u[h];(x.nodeName==="LINK"||x.getAttribute("media")!=="not all")&&(a.set(x.dataset.precedence,x),o=x)}o&&a.set(null,o)}u=n.instance,x=u.getAttribute("data-precedence"),h=a.get(x)||o,h===o&&a.set(null,u),a.set(x,u),this.count++,o=Ac.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var qo={$$typeof:I,Provider:null,Consumer:null,_currentValue:ut,_currentValue2:ut,_threadCount:0};function AM(e,n,a,o,u,h,x,w,z){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=$t(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=$t(0),this.hiddenUpdates=$t(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=x,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function c_(e,n,a,o,u,h,x,w,z,ot,xt,Et){return e=new AM(e,n,a,x,z,ot,xt,Et,w),n=1,h===!0&&(n|=24),h=hi(3,null,null,n),e.current=h,h.stateNode=e,n=hf(),n.refCount++,e.pooledCache=n,n.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:n},gf(h),e}function u_(e){return e?(e=er,e):er}function f_(e,n,a,o,u,h){u=u_(u),o.context===null?o.context=u:o.pendingContext=u,o=Xa(n),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=Wa(e,o,n),a!==null&&(ri(a,e,n),To(a,e,n))}function h_(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function Oh(e,n){h_(e,n),(e=e.alternate)&&h_(e,n)}function d_(e){if(e.tag===13||e.tag===31){var n=Ts(e,67108864);n!==null&&ri(n,e,67108864),Oh(e,67108864)}}function p_(e){if(e.tag===13||e.tag===31){var n=_i();n=so(n);var a=Ts(e,n);a!==null&&ri(a,e,n),Oh(e,n)}}var Cc=!0;function RM(e,n,a,o){var u=F.T;F.T=null;var h=G.p;try{G.p=2,Ph(e,n,a,o)}finally{G.p=h,F.T=u}}function wM(e,n,a,o){var u=F.T;F.T=null;var h=G.p;try{G.p=8,Ph(e,n,a,o)}finally{G.p=h,F.T=u}}function Ph(e,n,a,o){if(Cc){var u=Bh(o);if(u===null)Mh(e,n,o,Dc,a),g_(e,o);else if(DM(u,e,n,a,o))o.stopPropagation();else if(g_(e,o),n&4&&-1<CM.indexOf(e)){for(;u!==null;){var h=oa(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var x=Ct(h.pendingLanes);if(x!==0){var w=h;for(w.pendingLanes|=2,w.entangledLanes|=2;x;){var z=1<<31-Xt(x);w.entanglements[1]|=z,x&=~z}Ki(h),(Ie&6)===0&&(hc=ze()+500,Go(0))}}break;case 31:case 13:w=Ts(h,2),w!==null&&ri(w,h,2),pc(),Oh(h,2)}if(h=Bh(o),h===null&&Mh(e,n,o,Dc,a),h===u)break;u=h}u!==null&&o.stopPropagation()}else Mh(e,n,o,null,a)}}function Bh(e){return e=Iu(e),Ih(e)}var Dc=null;function Ih(e){if(Dc=null,e=ra(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=f(n),e!==null)return e;e=null}else if(a===31){if(e=p(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Dc=e,null}function m_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Pe()){case B:return 2;case b:return 8;case j:case lt:return 32;case gt:return 268435456;default:return 32}default:return 32}}var Fh=!1,ns=null,is=null,as=null,Zo=new Map,Ko=new Map,ss=[],CM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function g_(e,n){switch(e){case"focusin":case"focusout":ns=null;break;case"dragenter":case"dragleave":is=null;break;case"mouseover":case"mouseout":as=null;break;case"pointerover":case"pointerout":Zo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ko.delete(n.pointerId)}}function Qo(e,n,a,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},n!==null&&(n=oa(n),n!==null&&d_(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function DM(e,n,a,o,u){switch(n){case"focusin":return ns=Qo(ns,e,n,a,o,u),!0;case"dragenter":return is=Qo(is,e,n,a,o,u),!0;case"mouseover":return as=Qo(as,e,n,a,o,u),!0;case"pointerover":var h=u.pointerId;return Zo.set(h,Qo(Zo.get(h)||null,e,n,a,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Ko.set(h,Qo(Ko.get(h)||null,e,n,a,o,u)),!0}return!1}function __(e){var n=ra(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){e.blockedOn=n,Zs(e.priority,function(){p_(a)});return}}else if(n===31){if(n=p(a),n!==null){e.blockedOn=n,Zs(e.priority,function(){p_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Uc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=Bh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);Bu=o,a.target.dispatchEvent(o),Bu=null}else return n=oa(a),n!==null&&d_(n),e.blockedOn=a,!1;n.shift()}return!0}function v_(e,n,a){Uc(e)&&a.delete(n)}function UM(){Fh=!1,ns!==null&&Uc(ns)&&(ns=null),is!==null&&Uc(is)&&(is=null),as!==null&&Uc(as)&&(as=null),Zo.forEach(v_),Ko.forEach(v_)}function Lc(e,n){e.blockedOn===n&&(e.blockedOn=null,Fh||(Fh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,UM)))}var Nc=null;function S_(e){Nc!==e&&(Nc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Nc===e&&(Nc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(Ih(o||a)===null)continue;break}var h=oa(a);h!==null&&(e.splice(n,3),n-=3,Bf(h,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Tr(e){function n(z){return Lc(z,e)}ns!==null&&Lc(ns,e),is!==null&&Lc(is,e),as!==null&&Lc(as,e),Zo.forEach(n),Ko.forEach(n);for(var a=0;a<ss.length;a++){var o=ss[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<ss.length&&(a=ss[0],a.blockedOn===null);)__(a),a.blockedOn===null&&ss.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],h=a[o+1],x=u[Bn]||null;if(typeof h=="function")x||S_(a);else if(x){var w=null;if(h&&h.hasAttribute("formAction")){if(u=h,x=h[Bn]||null)w=x.formAction;else if(Ih(u)!==null)continue}else w=x.action;typeof w=="function"?a[o+1]=w:(a.splice(o,3),o-=3),S_(a)}}}function x_(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(x){return u=x})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function zh(e){this._internalRoot=e}Oc.prototype.render=zh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=_i();f_(a,o,e,n,null,null)},Oc.prototype.unmount=zh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;f_(e.current,2,null,e,null,null),pc(),n[ti]=null}};function Oc(e){this._internalRoot=e}Oc.prototype.unstable_scheduleHydration=function(e){if(e){var n=oo();e={blockedOn:null,target:e,priority:n};for(var a=0;a<ss.length&&n!==0&&n<ss[a].priority;a++);ss.splice(a,0,e),a===0&&__(e)}};var M_=t.version;if(M_!=="19.2.9")throw Error(s(527,M_,"19.2.9"));G.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=d(n),e=e!==null?_(e):null,e=e===null?null:e.stateNode,e};var LM={bundleType:0,version:"19.2.9",rendererPackageName:"react-dom",currentDispatcherRef:F,reconcilerVersion:"19.2.9"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Pc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Pc.isDisabled&&Pc.supportsFiber)try{_t=Pc.inject(LM),St=Pc}catch{}}return jo.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",u=w0,h=C0,x=D0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(x=n.onRecoverableError)),n=c_(e,1,!1,null,null,a,o,null,u,h,x,x_),e[ti]=n.current,xh(e),new zh(n)},jo.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,u="",h=w0,x=C0,w=D0,z=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(x=a.onCaughtError),a.onRecoverableError!==void 0&&(w=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=c_(e,1,!0,n,a??null,o,u,z,h,x,w,x_),n.context=u_(null),a=n.current,o=_i(),o=so(o),u=Xa(o),u.callback=null,Wa(a,u,o),a=o,n.current.lanes=a,Zt(n,a),Ki(n),e[ti]=n.current,xh(e),new Oc(n)},jo.version="19.2.9",jo}var U_;function VM(){if(U_)return Vh.exports;U_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Vh.exports=GM(),Vh.exports}var kM=VM();const bp="186",Jr={ROTATE:0,DOLLY:1,PAN:2},Kr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},XM=0,L_=1,WM=2,dl=1,YM=2,ul=3,ms=0,Yn=1,ta=2,Ua=0,pl=1,_l=2,N_=3,O_=4,qM=5,Zr=100,ZM=101,KM=102,QM=103,JM=104,jM=200,$M=201,ty=202,ey=203,Vv=204,kv=205,ny=206,iy=207,ay=208,sy=209,ry=210,oy=211,ly=212,cy=213,uy=214,Nd=0,Od=1,Pd=2,vl=3,Bd=4,Id=5,Fd=6,zd=7,Xv=0,fy=1,hy=2,aa=0,Wv=1,Yv=2,qv=3,Tp=4,Zv=5,Kv=6,Qv=7,Jv=300,Ws=301,to=302,Yh=303,qh=304,Uu=306,Hd=1e3,Da=1001,Gd=1002,Cn=1003,dy=1004,Bc=1005,Xn=1006,Zh=1007,ks=1008,Mi=1009,jv=1010,$v=1011,Sl=1012,Ap=1013,sa=1014,na=1015,ki=1016,Rp=1017,wp=1018,xl=1020,tS=35902,eS=35899,nS=1021,iS=1022,Vi=1023,Na=1026,Xs=1027,Cp=1028,Dp=1029,Ys=1030,Up=1031,Lp=1033,pu=33776,mu=33777,gu=33778,_u=33779,Vd=35840,kd=35841,Xd=35842,Wd=35843,Yd=36196,qd=37492,Zd=37496,Kd=37488,Qd=37489,xu=37490,Jd=37491,jd=37808,$d=37809,tp=37810,ep=37811,np=37812,ip=37813,ap=37814,sp=37815,rp=37816,op=37817,lp=37818,cp=37819,up=37820,fp=37821,hp=36492,dp=36494,pp=36495,mp=36283,gp=36284,Mu=36285,_p=36286,py=3200,vp=0,my=1,ds="",li="srgb",yu="srgb-linear",Eu="linear",ke="srgb",Kh=7680,gy=519,_y=512,vy=513,Sy=514,Np=515,xy=516,My=517,Op=518,yy=519,aS=35044,P_="300 es",ia=2e3,Ml=2001;function Ey(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function bu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function by(){const r=bu("canvas");return r.style.display="block",r}const B_={};function Tu(...r){const t="THREE."+r.shift();console.log(t,...r)}function sS(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ce(...r){r=sS(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...r)}}function Le(...r){r=sS(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...r)}}function jr(...r){const t=r.join(" ");t in B_||(B_[t]=!0,ce(...r))}function Ty(r,t,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const Ay={[Nd]:Od,[Pd]:Fd,[Bd]:zd,[vl]:Id,[Od]:Nd,[Fd]:Pd,[zd]:Bd,[Id]:vl};class _s{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const s=i[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vu=Math.PI/180,Sp=180/Math.PI;function ps(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Vn[r&255]+Vn[r>>8&255]+Vn[r>>16&255]+Vn[r>>24&255]+"-"+Vn[t&255]+Vn[t>>8&255]+"-"+Vn[t>>16&15|64]+Vn[t>>24&255]+"-"+Vn[i&63|128]+Vn[i>>8&255]+"-"+Vn[i>>16&255]+Vn[i>>24&255]+Vn[s&255]+Vn[s>>8&255]+Vn[s>>16&255]+Vn[s>>24&255]).toLowerCase()}function be(r,t,i){return Math.max(t,Math.min(i,r))}function Ry(r,t){return(r%t+t)%t}function Qh(r,t,i){return(1-i)*r+i*t}function ea(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Qe(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const wy={DEG2RAD:vu};class ae{static{ae.prototype.isVector2=!0}constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=be(this.x,t.x,i.x),this.y=be(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=be(this.x,t,i),this.y=be(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(be(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(be(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,f=this.y-t.y;return this.x=c*s-f*l+t.x,this.y=c*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class gs{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,f,p){let m=s[l+0],d=s[l+1],_=s[l+2],v=s[l+3],g=c[f+0],y=c[f+1],T=c[f+2],U=c[f+3];if(v!==U||m!==g||d!==y||_!==T){let M=m*g+d*y+_*T+v*U;M<0&&(g=-g,y=-y,T=-T,U=-U,M=-M);let S=1-p;if(M<.9995){const P=Math.acos(M),I=Math.sin(P);S=Math.sin(S*P)/I,p=Math.sin(p*P)/I,m=m*S+g*p,d=d*S+y*p,_=_*S+T*p,v=v*S+U*p}else{m=m*S+g*p,d=d*S+y*p,_=_*S+T*p,v=v*S+U*p;const P=1/Math.sqrt(m*m+d*d+_*_+v*v);m*=P,d*=P,_*=P,v*=P}}t[i]=m,t[i+1]=d,t[i+2]=_,t[i+3]=v}static multiplyQuaternionsFlat(t,i,s,l,c,f){const p=s[l],m=s[l+1],d=s[l+2],_=s[l+3],v=c[f],g=c[f+1],y=c[f+2],T=c[f+3];return t[i]=p*T+_*v+m*y-d*g,t[i+1]=m*T+_*g+d*v-p*y,t[i+2]=d*T+_*y+p*g-m*v,t[i+3]=_*T-p*v-m*g-d*y,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,f=t._order,p=Math.cos,m=Math.sin,d=p(s/2),_=p(l/2),v=p(c/2),g=m(s/2),y=m(l/2),T=m(c/2);switch(f){case"XYZ":this._x=g*_*v+d*y*T,this._y=d*y*v-g*_*T,this._z=d*_*T+g*y*v,this._w=d*_*v-g*y*T;break;case"YXZ":this._x=g*_*v+d*y*T,this._y=d*y*v-g*_*T,this._z=d*_*T-g*y*v,this._w=d*_*v+g*y*T;break;case"ZXY":this._x=g*_*v-d*y*T,this._y=d*y*v+g*_*T,this._z=d*_*T+g*y*v,this._w=d*_*v-g*y*T;break;case"ZYX":this._x=g*_*v-d*y*T,this._y=d*y*v+g*_*T,this._z=d*_*T-g*y*v,this._w=d*_*v+g*y*T;break;case"YZX":this._x=g*_*v+d*y*T,this._y=d*y*v+g*_*T,this._z=d*_*T-g*y*v,this._w=d*_*v-g*y*T;break;case"XZY":this._x=g*_*v-d*y*T,this._y=d*y*v-g*_*T,this._z=d*_*T+g*y*v,this._w=d*_*v+g*y*T;break;default:ce("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],f=i[1],p=i[5],m=i[9],d=i[2],_=i[6],v=i[10],g=s+p+v;if(g>0){const y=.5/Math.sqrt(g+1);this._w=.25/y,this._x=(_-m)*y,this._y=(c-d)*y,this._z=(f-l)*y}else if(s>p&&s>v){const y=2*Math.sqrt(1+s-p-v);this._w=(_-m)/y,this._x=.25*y,this._y=(l+f)/y,this._z=(c+d)/y}else if(p>v){const y=2*Math.sqrt(1+p-s-v);this._w=(c-d)/y,this._x=(l+f)/y,this._y=.25*y,this._z=(m+_)/y}else{const y=2*Math.sqrt(1+v-s-p);this._w=(f-l)/y,this._x=(c+d)/y,this._y=(m+_)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,f=t._w,p=i._x,m=i._y,d=i._z,_=i._w;return this._x=s*_+f*p+l*d-c*m,this._y=l*_+f*m+c*p-s*d,this._z=c*_+f*d+s*m-l*p,this._w=f*_-s*p-l*m-c*d,this._onChangeCallback(),this}slerp(t,i){let s=t._x,l=t._y,c=t._z,f=t._w,p=this.dot(t);p<0&&(s=-s,l=-l,c=-c,f=-f,p=-p);let m=1-i;if(p<.9995){const d=Math.acos(p),_=Math.sin(d);m=Math.sin(m*d)/_,i=Math.sin(i*d)/_,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{static{Q.prototype.isVector3=!0}constructor(t=0,i=0,s=0){this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(I_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(I_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,f=t.y,p=t.z,m=t.w,d=2*(f*l-p*s),_=2*(p*i-c*l),v=2*(c*s-f*i);return this.x=i+m*d+f*v-p*_,this.y=s+m*_+p*d-c*v,this.z=l+m*v+c*_-f*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=be(this.x,t.x,i.x),this.y=be(this.y,t.y,i.y),this.z=be(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=be(this.x,t,i),this.y=be(this.y,t,i),this.z=be(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(be(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,f=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*f-s*m,this.z=s*p-l*f,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Jh.copy(this).projectOnVector(t),this.sub(Jh)}reflect(t){return this.sub(Jh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(be(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jh=new Q,I_=new gs;class pe{static{pe.prototype.isMatrix3=!0}constructor(t,i,s,l,c,f,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,f,p,m,d)}set(t,i,s,l,c,f,p,m,d){const _=this.elements;return _[0]=t,_[1]=l,_[2]=p,_[3]=i,_[4]=c,_[5]=m,_[6]=s,_[7]=f,_[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,f=s[0],p=s[3],m=s[6],d=s[1],_=s[4],v=s[7],g=s[2],y=s[5],T=s[8],U=l[0],M=l[3],S=l[6],P=l[1],I=l[4],D=l[7],N=l[2],C=l[5],R=l[8];return c[0]=f*U+p*P+m*N,c[3]=f*M+p*I+m*C,c[6]=f*S+p*D+m*R,c[1]=d*U+_*P+v*N,c[4]=d*M+_*I+v*C,c[7]=d*S+_*D+v*R,c[2]=g*U+y*P+T*N,c[5]=g*M+y*I+T*C,c[8]=g*S+y*D+T*R,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],_=t[8];return i*f*_-i*p*d-s*c*_+s*p*m+l*c*d-l*f*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],_=t[8],v=_*f-p*d,g=p*m-_*c,y=d*c-f*m,T=i*v+s*g+l*y;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const U=1/T;return t[0]=v*U,t[1]=(l*d-_*s)*U,t[2]=(p*s-l*f)*U,t[3]=g*U,t[4]=(_*i-l*m)*U,t[5]=(l*c-p*i)*U,t[6]=y*U,t[7]=(s*m-d*i)*U,t[8]=(f*i-s*c)*U,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,f,p){const m=Math.cos(c),d=Math.sin(c);return this.set(s*m,s*d,-s*(m*f+d*p)+f+t,-l*d,l*m,-l*(-d*f+m*p)+p+i,0,0,1),this}scale(t,i){return jr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(jh.makeScale(t,i)),this}rotate(t){return jr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(jh.makeRotation(-t)),this}translate(t,i){return jr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(jh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const jh=new pe,F_=new pe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),z_=new pe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cy(){const r={enabled:!0,workingColorSpace:yu,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===ke&&(l.r=La(l.r),l.g=La(l.g),l.b=La(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===ke&&(l.r=$r(l.r),l.g=$r(l.g),l.b=$r(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===ds?Eu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return jr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return jr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[yu]:{primaries:t,whitePoint:s,transfer:Eu,toXYZ:F_,fromXYZ:z_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:li},outputColorSpaceConfig:{drawingBufferColorSpace:li}},[li]:{primaries:t,whitePoint:s,transfer:ke,toXYZ:F_,fromXYZ:z_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:li}}}),r}const we=Cy();function La(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function $r(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ar;class Dy{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{Ar===void 0&&(Ar=bu("canvas")),Ar.width=t.width,Ar.height=t.height;const l=Ar.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),s=Ar}return s.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=bu("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=La(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(La(i[s]/255)*255):i[s]=La(i[s]);return{data:i,width:t.width,height:t.height}}else return ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Uy=0;class Pp{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Uy++}),this.uuid=ps(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayWidth,i.displayHeight,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,p=l.length;f<p;f++)l[f].isDataTexture?c.push($h(l[f].image)):c.push($h(l[f]))}else c=$h(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function $h(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Dy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ce("Texture: Unable to serialize Texture."),{})}let Ly=0;const td=new Q;class qn extends _s{constructor(t=qn.DEFAULT_IMAGE,i=qn.DEFAULT_MAPPING,s=Da,l=Da,c=Xn,f=ks,p=Vi,m=Mi,d=qn.DEFAULT_ANISOTROPY,_=ds){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ly++}),this.uuid=ps(),this.name="",this.source=new Pp(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(td).x}get height(){return this.source.getSize(td).y}get depth(){return this.source.getSize(td).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const s=t[i];if(s===void 0){ce(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ce(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Jv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hd:t.x=t.x-Math.floor(t.x);break;case Da:t.x=t.x<0?0:1;break;case Gd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hd:t.y=t.y-Math.floor(t.y);break;case Da:t.y=t.y<0?0:1;break;case Gd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=Jv;qn.DEFAULT_ANISOTROPY=1;class on{static{on.prototype.isVector4=!0}constructor(t=0,i=0,s=0,l=1){this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const m=t.elements,d=m[0],_=m[4],v=m[8],g=m[1],y=m[5],T=m[9],U=m[2],M=m[6],S=m[10];if(Math.abs(_-g)<.01&&Math.abs(v-U)<.01&&Math.abs(T-M)<.01){if(Math.abs(_+g)<.1&&Math.abs(v+U)<.1&&Math.abs(T+M)<.1&&Math.abs(d+y+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const I=(d+1)/2,D=(y+1)/2,N=(S+1)/2,C=(_+g)/4,R=(v+U)/4,E=(T+M)/4;return I>D&&I>N?I<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(I),l=C/s,c=R/s):D>N?D<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(D),s=C/l,c=E/l):N<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(N),s=R/c,l=E/c),this.set(s,l,c,i),this}let P=Math.sqrt((M-T)*(M-T)+(v-U)*(v-U)+(g-_)*(g-_));return Math.abs(P)<.001&&(P=1),this.x=(M-T)/P,this.y=(v-U)/P,this.z=(g-_)/P,this.w=Math.acos((d+y+S-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=be(this.x,t.x,i.x),this.y=be(this.y,t.y,i.y),this.z=be(this.z,t.z,i.z),this.w=be(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=be(this.x,t,i),this.y=be(this.y,t,i),this.z=be(this.z,t,i),this.w=be(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(be(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ny extends _s{constructor(t=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=s.depth,this.scissor=new on(0,0,t,i),this.scissorTest=!1,this.viewport=new on(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:s.depth},c=new qn(l),f=s.count;for(let p=0;p<f;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(t={}){const i={minFilter:Xn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new Pp(l)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const i=t.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Oi extends Ny{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class rS extends qn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Da,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Oy extends qn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Da,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Je{static{Je.prototype.isMatrix4=!0}constructor(t,i,s,l,c,f,p,m,d,_,v,g,y,T,U,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,f,p,m,d,_,v,g,y,T,U,M)}set(t,i,s,l,c,f,p,m,d,_,v,g,y,T,U,M){const S=this.elements;return S[0]=t,S[4]=i,S[8]=s,S[12]=l,S[1]=c,S[5]=f,S[9]=p,S[13]=m,S[2]=d,S[6]=_,S[10]=v,S[14]=g,S[3]=y,S[7]=T,S[11]=U,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,s=t.elements,l=1/Rr.setFromMatrixColumn(t,0).length(),c=1/Rr.setFromMatrixColumn(t,1).length(),f=1/Rr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,f=Math.cos(s),p=Math.sin(s),m=Math.cos(l),d=Math.sin(l),_=Math.cos(c),v=Math.sin(c);if(t.order==="XYZ"){const g=f*_,y=f*v,T=p*_,U=p*v;i[0]=m*_,i[4]=-m*v,i[8]=d,i[1]=y+T*d,i[5]=g-U*d,i[9]=-p*m,i[2]=U-g*d,i[6]=T+y*d,i[10]=f*m}else if(t.order==="YXZ"){const g=m*_,y=m*v,T=d*_,U=d*v;i[0]=g+U*p,i[4]=T*p-y,i[8]=f*d,i[1]=f*v,i[5]=f*_,i[9]=-p,i[2]=y*p-T,i[6]=U+g*p,i[10]=f*m}else if(t.order==="ZXY"){const g=m*_,y=m*v,T=d*_,U=d*v;i[0]=g-U*p,i[4]=-f*v,i[8]=T+y*p,i[1]=y+T*p,i[5]=f*_,i[9]=U-g*p,i[2]=-f*d,i[6]=p,i[10]=f*m}else if(t.order==="ZYX"){const g=f*_,y=f*v,T=p*_,U=p*v;i[0]=m*_,i[4]=T*d-y,i[8]=g*d+U,i[1]=m*v,i[5]=U*d+g,i[9]=y*d-T,i[2]=-d,i[6]=p*m,i[10]=f*m}else if(t.order==="YZX"){const g=f*m,y=f*d,T=p*m,U=p*d;i[0]=m*_,i[4]=U-g*v,i[8]=T*v+y,i[1]=v,i[5]=f*_,i[9]=-p*_,i[2]=-d*_,i[6]=y*v+T,i[10]=g-U*v}else if(t.order==="XZY"){const g=f*m,y=f*d,T=p*m,U=p*d;i[0]=m*_,i[4]=-v,i[8]=d*_,i[1]=g*v+U,i[5]=f*_,i[9]=y*v-T,i[2]=T*v-y,i[6]=p*_,i[10]=U*v+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Py,t,By)}lookAt(t,i,s){const l=this.elements;return vi.subVectors(t,i),vi.lengthSq()===0&&(vi.z=1),vi.normalize(),os.crossVectors(s,vi),os.lengthSq()===0&&(Math.abs(s.z)===1?vi.x+=1e-4:vi.z+=1e-4,vi.normalize(),os.crossVectors(s,vi)),os.normalize(),Ic.crossVectors(vi,os),l[0]=os.x,l[4]=Ic.x,l[8]=vi.x,l[1]=os.y,l[5]=Ic.y,l[9]=vi.y,l[2]=os.z,l[6]=Ic.z,l[10]=vi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,f=s[0],p=s[4],m=s[8],d=s[12],_=s[1],v=s[5],g=s[9],y=s[13],T=s[2],U=s[6],M=s[10],S=s[14],P=s[3],I=s[7],D=s[11],N=s[15],C=l[0],R=l[4],E=l[8],O=l[12],H=l[1],K=l[5],q=l[9],ct=l[13],Z=l[2],$=l[6],F=l[10],G=l[14],ut=l[3],st=l[7],dt=l[11],L=l[15];return c[0]=f*C+p*H+m*Z+d*ut,c[4]=f*R+p*K+m*$+d*st,c[8]=f*E+p*q+m*F+d*dt,c[12]=f*O+p*ct+m*G+d*L,c[1]=_*C+v*H+g*Z+y*ut,c[5]=_*R+v*K+g*$+y*st,c[9]=_*E+v*q+g*F+y*dt,c[13]=_*O+v*ct+g*G+y*L,c[2]=T*C+U*H+M*Z+S*ut,c[6]=T*R+U*K+M*$+S*st,c[10]=T*E+U*q+M*F+S*dt,c[14]=T*O+U*ct+M*G+S*L,c[3]=P*C+I*H+D*Z+N*ut,c[7]=P*R+I*K+D*$+N*st,c[11]=P*E+I*q+D*F+N*dt,c[15]=P*O+I*ct+D*G+N*L,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],f=t[1],p=t[5],m=t[9],d=t[13],_=t[2],v=t[6],g=t[10],y=t[14],T=t[3],U=t[7],M=t[11],S=t[15],P=m*y-d*g,I=p*y-d*v,D=p*g-m*v,N=f*y-d*_,C=f*g-m*_,R=f*v-p*_;return i*(U*P-M*I+S*D)-s*(T*P-M*N+S*C)+l*(T*I-U*N+S*R)-c*(T*D-U*C+M*R)}determinantAffine(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[1],f=t[5],p=t[9],m=t[2],d=t[6],_=t[10];return i*(f*_-p*d)-s*(c*_-p*m)+l*(c*d-f*m)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],_=t[8],v=t[9],g=t[10],y=t[11],T=t[12],U=t[13],M=t[14],S=t[15],P=i*p-s*f,I=i*m-l*f,D=i*d-c*f,N=s*m-l*p,C=s*d-c*p,R=l*d-c*m,E=_*U-v*T,O=_*M-g*T,H=_*S-y*T,K=v*M-g*U,q=v*S-y*U,ct=g*S-y*M,Z=P*ct-I*q+D*K+N*H-C*O+R*E;if(Z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/Z;return t[0]=(p*ct-m*q+d*K)*$,t[1]=(l*q-s*ct-c*K)*$,t[2]=(U*R-M*C+S*N)*$,t[3]=(g*C-v*R-y*N)*$,t[4]=(m*H-f*ct-d*O)*$,t[5]=(i*ct-l*H+c*O)*$,t[6]=(M*D-T*R-S*I)*$,t[7]=(_*R-g*D+y*I)*$,t[8]=(f*q-p*H+d*E)*$,t[9]=(s*H-i*q-c*E)*$,t[10]=(T*C-U*D+S*P)*$,t[11]=(v*D-_*C-y*P)*$,t[12]=(p*O-f*K-m*E)*$,t[13]=(i*K-s*O+l*E)*$,t[14]=(U*I-T*N-M*P)*$,t[15]=(_*N-v*I+g*P)*$,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=t.x,p=t.y,m=t.z,d=c*f,_=c*p;return this.set(d*f+s,d*p-l*m,d*m+l*p,0,d*p+l*m,_*p+s,_*m-l*f,0,d*m-l*p,_*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,f){return this.set(1,s,c,0,t,1,f,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,f=i._y,p=i._z,m=i._w,d=c+c,_=f+f,v=p+p,g=c*d,y=c*_,T=c*v,U=f*_,M=f*v,S=p*v,P=m*d,I=m*_,D=m*v,N=s.x,C=s.y,R=s.z;return l[0]=(1-(U+S))*N,l[1]=(y+D)*N,l[2]=(T-I)*N,l[3]=0,l[4]=(y-D)*C,l[5]=(1-(g+S))*C,l[6]=(M+P)*C,l[7]=0,l[8]=(T+I)*R,l[9]=(M-P)*R,l[10]=(1-(g+U))*R,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const c=this.determinantAffine();if(c===0)return s.set(1,1,1),i.identity(),this;let f=Rr.set(l[0],l[1],l[2]).length();const p=Rr.set(l[4],l[5],l[6]).length(),m=Rr.set(l[8],l[9],l[10]).length();c<0&&(f=-f),zi.copy(this);const d=1/f,_=1/p,v=1/m;return zi.elements[0]*=d,zi.elements[1]*=d,zi.elements[2]*=d,zi.elements[4]*=_,zi.elements[5]*=_,zi.elements[6]*=_,zi.elements[8]*=v,zi.elements[9]*=v,zi.elements[10]*=v,i.setFromRotationMatrix(zi),s.x=f,s.y=p,s.z=m,this}makePerspective(t,i,s,l,c,f,p=ia,m=!1){const d=this.elements,_=2*c/(i-t),v=2*c/(s-l),g=(i+t)/(i-t),y=(s+l)/(s-l);let T,U;if(m)T=c/(f-c),U=f*c/(f-c);else if(p===ia)T=-(f+c)/(f-c),U=-2*f*c/(f-c);else if(p===Ml)T=-f/(f-c),U=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=_,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=v,d[9]=y,d[13]=0,d[2]=0,d[6]=0,d[10]=T,d[14]=U,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,i,s,l,c,f,p=ia,m=!1){const d=this.elements,_=2/(i-t),v=2/(s-l),g=-(i+t)/(i-t),y=-(s+l)/(s-l);let T,U;if(m)T=1/(f-c),U=f/(f-c);else if(p===ia)T=-2/(f-c),U=-(f+c)/(f-c);else if(p===Ml)T=-1/(f-c),U=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=_,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=v,d[9]=0,d[13]=y,d[2]=0,d[6]=0,d[10]=T,d[14]=U,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const Rr=new Q,zi=new Je,Py=new Q(0,0,0),By=new Q(1,1,1),os=new Q,Ic=new Q,vi=new Q,H_=new Je,G_=new gs;class qs{constructor(t=0,i=0,s=0,l=qs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],f=l[4],p=l[8],m=l[1],d=l[5],_=l[9],v=l[2],g=l[6],y=l[10];switch(i){case"XYZ":this._y=Math.asin(be(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,y),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-be(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(p,y),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(be(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-v,y),this._z=Math.atan2(-f,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-be(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(g,y),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,d));break;case"YZX":this._z=Math.asin(be(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,d),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(p,y));break;case"XZY":this._z=Math.asin(-be(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-_,y),this._y=0);break;default:ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return H_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(H_,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return G_.setFromEuler(this),this.setFromQuaternion(G_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qs.DEFAULT_ORDER="XYZ";class oS{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Iy=0;const V_=new Q,wr=new gs,ba=new Je,Fc=new Q,$o=new Q,Fy=new Q,zy=new gs,k_=new Q(1,0,0),X_=new Q(0,1,0),W_=new Q(0,0,1),Y_={type:"added"},Hy={type:"removed"},Cr={type:"childadded",child:null},ed={type:"childremoved",child:null};class Tn extends _s{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tn.DEFAULT_UP.clone();const t=new Q,i=new qs,s=new gs,l=new Q(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Je},normalMatrix:{value:new pe}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=Tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new oS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return wr.setFromAxisAngle(t,i),this.quaternion.multiply(wr),this}rotateOnWorldAxis(t,i){return wr.setFromAxisAngle(t,i),this.quaternion.premultiply(wr),this}rotateX(t){return this.rotateOnAxis(k_,t)}rotateY(t){return this.rotateOnAxis(X_,t)}rotateZ(t){return this.rotateOnAxis(W_,t)}translateOnAxis(t,i){return V_.copy(t).applyQuaternion(this.quaternion),this.position.add(V_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(k_,t)}translateY(t){return this.translateOnAxis(X_,t)}translateZ(t){return this.translateOnAxis(W_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ba.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?Fc.copy(t):Fc.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),$o.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ba.lookAt($o,Fc,this.up):ba.lookAt(Fc,$o,this.up),this.quaternion.setFromRotationMatrix(ba),l&&(ba.extractRotation(l.matrixWorld),wr.setFromRotationMatrix(ba),this.quaternion.premultiply(wr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Le("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Y_),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null):Le("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(Hy),ed.child=t,this.dispatchEvent(ed),ed.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ba.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ba.multiply(t.parent.matrixWorld)),t.applyMatrix4(ba),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Y_),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,i);if(f!==void 0)return f}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($o,t,Fy),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($o,zy,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,s=t.y,l=t.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i,s=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const c=this.children;for(let f=0,p=c.length;f<p;f++)c[f].updateWorldMatrix(!1,!0,s)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,_=m.length;d<_;d++){const v=m[d];c(t.shapes,v)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(c(t.materials,this.material[m]));l.material=p}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(t.animations,m))}}if(i){const p=f(t.geometries),m=f(t.materials),d=f(t.textures),_=f(t.images),v=f(t.shapes),g=f(t.skeletons),y=f(t.animations),T=f(t.nodes);p.length>0&&(s.geometries=p),m.length>0&&(s.materials=m),d.length>0&&(s.textures=d),_.length>0&&(s.images=_),v.length>0&&(s.shapes=v),g.length>0&&(s.skeletons=g),y.length>0&&(s.animations=y),T.length>0&&(s.nodes=T)}return s.object=l,s;function f(p){const m=[];for(const d in p){const _=p[d];delete _.metadata,m.push(_)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Tn.DEFAULT_UP=new Q(0,1,0);Tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fl extends Tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gy={type:"move"};class nd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,f=null;const p=this._targetRay,m=this._grip,d=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(d&&t.hand){f=!0;for(const U of t.hand.values()){const M=i.getJointPose(U,s),S=this._getHandJoint(d,U);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const _=d.joints["index-finger-tip"],v=d.joints["thumb-tip"],g=_.position.distanceTo(v.position),y=.02,T=.005;d.inputState.pinching&&g>y+T?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&g<=y-T&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));p!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(Gy)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=f!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new fl;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const lS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ls={h:0,s:0,l:0},zc={h:0,s:0,l:0};function id(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class le{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=li){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,we.colorSpaceToWorking(this,i),this}setRGB(t,i,s,l=we.workingColorSpace){return this.r=t,this.g=i,this.b=s,we.colorSpaceToWorking(this,l),this}setHSL(t,i,s,l=we.workingColorSpace){if(t=Ry(t,1),i=be(i,0,1),s=be(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=id(f,c,t+1/3),this.g=id(f,c,t),this.b=id(f,c,t-1/3)}return we.colorSpaceToWorking(this,l),this}setStyle(t,i=li){function s(c){c!==void 0&&parseFloat(c)<1&&ce("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],p=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ce("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);ce("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=li){const s=lS[t.toLowerCase()];return s!==void 0?this.setHex(s,i):ce("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=La(t.r),this.g=La(t.g),this.b=La(t.b),this}copyLinearToSRGB(t){return this.r=$r(t.r),this.g=$r(t.g),this.b=$r(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=li){return we.workingToColorSpace(kn.copy(this),t),Math.round(be(kn.r*255,0,255))*65536+Math.round(be(kn.g*255,0,255))*256+Math.round(be(kn.b*255,0,255))}getHexString(t=li){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=we.workingColorSpace){we.workingToColorSpace(kn.copy(this),i);const s=kn.r,l=kn.g,c=kn.b,f=Math.max(s,l,c),p=Math.min(s,l,c);let m,d;const _=(p+f)/2;if(p===f)m=0,d=0;else{const v=f-p;switch(d=_<=.5?v/(f+p):v/(2-f-p),f){case s:m=(l-c)/v+(l<c?6:0);break;case l:m=(c-s)/v+2;break;case c:m=(s-l)/v+4;break}m/=6}return t.h=m,t.s=d,t.l=_,t}getRGB(t,i=we.workingColorSpace){return we.workingToColorSpace(kn.copy(this),i),t.r=kn.r,t.g=kn.g,t.b=kn.b,t}getStyle(t=li){we.workingToColorSpace(kn.copy(this),t);const i=kn.r,s=kn.g,l=kn.b;return t!==li?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(ls),this.setHSL(ls.h+t,ls.s+i,ls.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(ls),t.getHSL(zc);const s=Qh(ls.h,zc.h,i),l=Qh(ls.s,zc.s,i),c=Qh(ls.l,zc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kn=new le;le.NAMES=lS;class Bp{constructor(t,i=1,s=1e3){this.isFog=!0,this.name="",this.color=new le(t),this.near=i,this.far=s}clone(){return new Bp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Vy extends Tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qs,this.environmentIntensity=1,this.environmentRotation=new qs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Hi=new Q,Ta=new Q,ad=new Q,Aa=new Q,Dr=new Q,Ur=new Q,q_=new Q,sd=new Q,rd=new Q,od=new Q,ld=new on,cd=new on,ud=new on;class Ni{constructor(t=new Q,i=new Q,s=new Q){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Hi.subVectors(t,i),l.cross(Hi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){Hi.subVectors(l,i),Ta.subVectors(s,i),ad.subVectors(t,i);const f=Hi.dot(Hi),p=Hi.dot(Ta),m=Hi.dot(ad),d=Ta.dot(Ta),_=Ta.dot(ad),v=f*d-p*p;if(v===0)return c.set(0,0,0),null;const g=1/v,y=(d*m-p*_)*g,T=(f*_-p*m)*g;return c.set(1-y-T,T,y)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,Aa)===null?!1:Aa.x>=0&&Aa.y>=0&&Aa.x+Aa.y<=1}static getInterpolation(t,i,s,l,c,f,p,m){return this.getBarycoord(t,i,s,l,Aa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Aa.x),m.addScaledVector(f,Aa.y),m.addScaledVector(p,Aa.z),m)}static getInterpolatedAttribute(t,i,s,l,c,f){return ld.setScalar(0),cd.setScalar(0),ud.setScalar(0),ld.fromBufferAttribute(t,i),cd.fromBufferAttribute(t,s),ud.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(ld,c.x),f.addScaledVector(cd,c.y),f.addScaledVector(ud,c.z),f}static isFrontFacing(t,i,s,l){return Hi.subVectors(s,i),Ta.subVectors(t,i),Hi.cross(Ta).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Hi.subVectors(this.c,this.b),Ta.subVectors(this.a,this.b),Hi.cross(Ta).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ni.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Ni.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return Ni.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return Ni.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ni.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let f,p;Dr.subVectors(l,s),Ur.subVectors(c,s),sd.subVectors(t,s);const m=Dr.dot(sd),d=Ur.dot(sd);if(m<=0&&d<=0)return i.copy(s);rd.subVectors(t,l);const _=Dr.dot(rd),v=Ur.dot(rd);if(_>=0&&v<=_)return i.copy(l);const g=m*v-_*d;if(g<=0&&m>=0&&_<=0)return f=m/(m-_),i.copy(s).addScaledVector(Dr,f);od.subVectors(t,c);const y=Dr.dot(od),T=Ur.dot(od);if(T>=0&&y<=T)return i.copy(c);const U=y*d-m*T;if(U<=0&&d>=0&&T<=0)return p=d/(d-T),i.copy(s).addScaledVector(Ur,p);const M=_*T-y*v;if(M<=0&&v-_>=0&&y-T>=0)return q_.subVectors(c,l),p=(v-_)/(v-_+(y-T)),i.copy(l).addScaledVector(q_,p);const S=1/(M+U+g);return f=U*S,p=g*S,i.copy(s).addScaledVector(Dr,f).addScaledVector(Ur,p)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class El{constructor(t=new Q(1/0,1/0,1/0),i=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Gi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Gi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Gi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,p=c.count;f<p;f++)t.isMesh===!0?t.getVertexPosition(f,Gi):Gi.fromBufferAttribute(c,f),Gi.applyMatrix4(t.matrixWorld),this.expandByPoint(Gi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Hc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Hc.copy(s.boundingBox)),Hc.applyMatrix4(t.matrixWorld),this.union(Hc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gi),Gi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(tl),Gc.subVectors(this.max,tl),Lr.subVectors(t.a,tl),Nr.subVectors(t.b,tl),Or.subVectors(t.c,tl),cs.subVectors(Nr,Lr),us.subVectors(Or,Nr),Fs.subVectors(Lr,Or);let i=[0,-cs.z,cs.y,0,-us.z,us.y,0,-Fs.z,Fs.y,cs.z,0,-cs.x,us.z,0,-us.x,Fs.z,0,-Fs.x,-cs.y,cs.x,0,-us.y,us.x,0,-Fs.y,Fs.x,0];return!fd(i,Lr,Nr,Or,Gc)||(i=[1,0,0,0,1,0,0,0,1],!fd(i,Lr,Nr,Or,Gc))?!1:(Vc.crossVectors(cs,us),i=[Vc.x,Vc.y,Vc.z],fd(i,Lr,Nr,Or,Gc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ra[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ra[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ra[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ra[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ra[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ra[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ra[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ra[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ra),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ra=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Gi=new Q,Hc=new El,Lr=new Q,Nr=new Q,Or=new Q,cs=new Q,us=new Q,Fs=new Q,tl=new Q,Gc=new Q,Vc=new Q,zs=new Q;function fd(r,t,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){zs.fromArray(r,c);const p=l.x*Math.abs(zs.x)+l.y*Math.abs(zs.y)+l.z*Math.abs(zs.z),m=t.dot(zs),d=i.dot(zs),_=s.dot(zs);if(Math.max(-Math.max(m,d,_),Math.min(m,d,_))>p)return!1}return!0}const bn=new Q,kc=new ae;let ky=0;class Wn extends _s{constructor(t,i,s=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ky++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=aS,this.updateRanges=[],this.gpuType=na,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)kc.fromBufferAttribute(this,i),kc.applyMatrix3(t),this.setXY(i,kc.x,kc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)bn.fromBufferAttribute(this,i),bn.applyMatrix3(t),this.setXYZ(i,bn.x,bn.y,bn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)bn.fromBufferAttribute(this,i),bn.applyMatrix4(t),this.setXYZ(i,bn.x,bn.y,bn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)bn.fromBufferAttribute(this,i),bn.applyNormalMatrix(t),this.setXYZ(i,bn.x,bn.y,bn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)bn.fromBufferAttribute(this,i),bn.transformDirection(t),this.setXYZ(i,bn.x,bn.y,bn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=ea(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Qe(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=ea(i,this.array)),i}setX(t,i){return this.normalized&&(i=Qe(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=ea(i,this.array)),i}setY(t,i){return this.normalized&&(i=Qe(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=ea(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Qe(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=ea(i,this.array)),i}setW(t,i){return this.normalized&&(i=Qe(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=Qe(i,this.array),s=Qe(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=Qe(i,this.array),s=Qe(s,this.array),l=Qe(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=Qe(i,this.array),s=Qe(s,this.array),l=Qe(l,this.array),c=Qe(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class cS extends Wn{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class uS extends Wn{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class un extends Wn{constructor(t,i,s){super(new Float32Array(t),i,s)}}const Xy=new El,el=new Q,hd=new Q;class bl{constructor(t=new Q,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):Xy.setFromPoints(t).getCenter(s);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;el.subVectors(t,this.center);const i=el.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(el,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(hd.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(el.copy(t.center).add(hd)),this.expandByPoint(el.copy(t.center).sub(hd))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Wy=0;const Li=new Je,dd=new Tn,Pr=new Q,Si=new El,nl=new El,Nn=new Q;class On extends _s{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wy++}),this.uuid=ps(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ey(t)?uS:cS)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new pe().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Li.makeRotationFromQuaternion(t),this.applyMatrix4(Li),this}rotateX(t){return Li.makeRotationX(t),this.applyMatrix4(Li),this}rotateY(t){return Li.makeRotationY(t),this.applyMatrix4(Li),this}rotateZ(t){return Li.makeRotationZ(t),this.applyMatrix4(Li),this}translate(t,i,s){return Li.makeTranslation(t,i,s),this.applyMatrix4(Li),this}scale(t,i,s){return Li.makeScale(t,i,s),this.applyMatrix4(Li),this}lookAt(t){return dd.lookAt(t),dd.updateMatrix(),this.applyMatrix4(dd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new un(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new El);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];Si.setFromBufferAttribute(c),this.morphTargetsRelative?(Nn.addVectors(this.boundingBox.min,Si.min),this.boundingBox.expandByPoint(Nn),Nn.addVectors(this.boundingBox.max,Si.max),this.boundingBox.expandByPoint(Nn)):(this.boundingBox.expandByPoint(Si.min),this.boundingBox.expandByPoint(Si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bl);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(t){const s=this.boundingSphere.center;if(Si.setFromBufferAttribute(t),i)for(let c=0,f=i.length;c<f;c++){const p=i[c];nl.setFromBufferAttribute(p),this.morphTargetsRelative?(Nn.addVectors(Si.min,nl.min),Si.expandByPoint(Nn),Nn.addVectors(Si.max,nl.max),Si.expandByPoint(Nn)):(Si.expandByPoint(nl.min),Si.expandByPoint(nl.max))}Si.getCenter(s);let l=0;for(let c=0,f=t.count;c<f;c++)Nn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(Nn));if(i)for(let c=0,f=i.length;c<f;c++){const p=i[c],m=this.morphTargetsRelative;for(let d=0,_=p.count;d<_;d++)Nn.fromBufferAttribute(p,d),m&&(Pr.fromBufferAttribute(t,d),Nn.add(Pr)),l=Math.max(l,s.distanceToSquared(Nn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;let f=this.getAttribute("tangent");(f===void 0||f.count!==s.count)&&(f=new Wn(new Float32Array(4*s.count),4),this.setAttribute("tangent",f));const p=[],m=[];for(let E=0;E<s.count;E++)p[E]=new Q,m[E]=new Q;const d=new Q,_=new Q,v=new Q,g=new ae,y=new ae,T=new ae,U=new Q,M=new Q;function S(E,O,H){d.fromBufferAttribute(s,E),_.fromBufferAttribute(s,O),v.fromBufferAttribute(s,H),g.fromBufferAttribute(c,E),y.fromBufferAttribute(c,O),T.fromBufferAttribute(c,H),_.sub(d),v.sub(d),y.sub(g),T.sub(g);const K=1/(y.x*T.y-T.x*y.y);isFinite(K)&&(U.copy(_).multiplyScalar(T.y).addScaledVector(v,-y.y).multiplyScalar(K),M.copy(v).multiplyScalar(y.x).addScaledVector(_,-T.x).multiplyScalar(K),p[E].add(U),p[O].add(U),p[H].add(U),m[E].add(M),m[O].add(M),m[H].add(M))}let P=this.groups;P.length===0&&(P=[{start:0,count:t.count}]);for(let E=0,O=P.length;E<O;++E){const H=P[E],K=H.start,q=H.count;for(let ct=K,Z=K+q;ct<Z;ct+=3)S(t.getX(ct+0),t.getX(ct+1),t.getX(ct+2))}const I=new Q,D=new Q,N=new Q,C=new Q;function R(E){N.fromBufferAttribute(l,E),C.copy(N);const O=p[E];I.copy(O),I.sub(N.multiplyScalar(N.dot(O))).normalize(),D.crossVectors(C,O);const K=D.dot(m[E])<0?-1:1;f.setXYZW(E,I.x,I.y,I.z,K)}for(let E=0,O=P.length;E<O;++E){const H=P[E],K=H.start,q=H.count;for(let ct=K,Z=K+q;ct<Z;ct+=3)R(t.getX(ct+0)),R(t.getX(ct+1)),R(t.getX(ct+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new Wn(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,y=s.count;g<y;g++)s.setXYZ(g,0,0,0);const l=new Q,c=new Q,f=new Q,p=new Q,m=new Q,d=new Q,_=new Q,v=new Q;if(t)for(let g=0,y=t.count;g<y;g+=3){const T=t.getX(g+0),U=t.getX(g+1),M=t.getX(g+2);l.fromBufferAttribute(i,T),c.fromBufferAttribute(i,U),f.fromBufferAttribute(i,M),_.subVectors(f,c),v.subVectors(l,c),_.cross(v),p.fromBufferAttribute(s,T),m.fromBufferAttribute(s,U),d.fromBufferAttribute(s,M),p.add(_),m.add(_),d.add(_),s.setXYZ(T,p.x,p.y,p.z),s.setXYZ(U,m.x,m.y,m.z),s.setXYZ(M,d.x,d.y,d.z)}else for(let g=0,y=i.count;g<y;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),_.subVectors(f,c),v.subVectors(l,c),_.cross(v),s.setXYZ(g+0,_.x,_.y,_.z),s.setXYZ(g+1,_.x,_.y,_.z),s.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)Nn.fromBufferAttribute(t,i),Nn.normalize(),t.setXYZ(i,Nn.x,Nn.y,Nn.z)}toNonIndexed(){function t(p,m){const d=p.array,_=p.itemSize,v=p.normalized,g=new d.constructor(m.length*_);let y=0,T=0;for(let U=0,M=m.length;U<M;U++){p.isInterleavedBufferAttribute?y=m[U]*p.data.stride+p.offset:y=m[U]*_;for(let S=0;S<_;S++)g[T++]=d[y++]}return new Wn(g,_,v)}if(this.index===null)return ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new On,s=this.index.array,l=this.attributes;for(const p in l){const m=l[p],d=t(m,s);i.setAttribute(p,d)}const c=this.morphAttributes;for(const p in c){const m=[],d=c[p];for(let _=0,v=d.length;_<v;_++){const g=d[_],y=t(g,s);m.push(y)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let p=0,m=f.length;p<m;p++){const d=f[p];i.addGroup(d.start,d.count,d.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(t[d]=m[d]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const d=s[m];t.data.attributes[m]=d.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],_=[];for(let v=0,g=d.length;v<g;v++){const y=d[v];_.push(y.toJSON(t.data))}_.length>0&&(l[m]=_,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const p=this.boundingSphere;return p!==null&&(t.data.boundingSphere=p.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const l=t.attributes;for(const d in l){const _=l[d];this.setAttribute(d,_.clone(i))}const c=t.morphAttributes;for(const d in c){const _=[],v=c[d];for(let g=0,y=v.length;g<y;g++)_.push(v[g].clone(i));this.morphAttributes[d]=_}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let d=0,_=f.length;d<_;d++){const v=f[d];this.addGroup(v.start,v.count,v.materialIndex)}const p=t.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yy{constructor(t,i){this.isInterleavedBuffer=!0,this.array=t,this.stride=i,this.count=t!==void 0?t.length/i:0,this.usage=aS,this.updateRanges=[],this.version=0,this.uuid=ps()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,i,s){t*=this.stride,s*=i.stride;for(let l=0,c=this.stride;l<c;l++)this.array[t+l]=i.array[s+l];return this}set(t,i=0){return this.array.set(t,i),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ps()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const i=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ps()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const i={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}}const Jn=new Q;class Au{constructor(t,i,s,l=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=i,this.offset=s,this.normalized=l}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let i=0,s=this.data.count;i<s;i++)Jn.fromBufferAttribute(this,i),Jn.applyMatrix4(t),this.setXYZ(i,Jn.x,Jn.y,Jn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)Jn.fromBufferAttribute(this,i),Jn.applyNormalMatrix(t),this.setXYZ(i,Jn.x,Jn.y,Jn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)Jn.fromBufferAttribute(this,i),Jn.transformDirection(t),this.setXYZ(i,Jn.x,Jn.y,Jn.z);return this}getComponent(t,i){let s=this.array[t*this.data.stride+this.offset+i];return this.normalized&&(s=ea(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Qe(s,this.array)),this.data.array[t*this.data.stride+this.offset+i]=s,this}setX(t,i){return this.normalized&&(i=Qe(i,this.array)),this.data.array[t*this.data.stride+this.offset]=i,this}setY(t,i){return this.normalized&&(i=Qe(i,this.array)),this.data.array[t*this.data.stride+this.offset+1]=i,this}setZ(t,i){return this.normalized&&(i=Qe(i,this.array)),this.data.array[t*this.data.stride+this.offset+2]=i,this}setW(t,i){return this.normalized&&(i=Qe(i,this.array)),this.data.array[t*this.data.stride+this.offset+3]=i,this}getX(t){let i=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(i=ea(i,this.array)),i}getY(t){let i=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(i=ea(i,this.array)),i}getZ(t){let i=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(i=ea(i,this.array)),i}getW(t){let i=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(i=ea(i,this.array)),i}setXY(t,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(i=Qe(i,this.array),s=Qe(s,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=s,this}setXYZ(t,i,s,l){return t=t*this.data.stride+this.offset,this.normalized&&(i=Qe(i,this.array),s=Qe(s,this.array),l=Qe(l,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=s,this.data.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t=t*this.data.stride+this.offset,this.normalized&&(i=Qe(i,this.array),s=Qe(s,this.array),l=Qe(l,this.array),c=Qe(c,this.array)),this.data.array[t+0]=i,this.data.array[t+1]=s,this.data.array[t+2]=l,this.data.array[t+3]=c,this}clone(t){if(t===void 0){Tu("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const i=[];for(let s=0;s<this.count;s++){const l=s*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)i.push(this.data.array[l+c])}return new Wn(new this.array.constructor(i),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Au(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Tu("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const i=[];for(let s=0;s<this.count;s++){const l=s*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)i.push(this.data.array[l+c])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:i,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const pd=new Q,qy=new Q,Zy=new pe;class ji{constructor(t=new Q(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=pd.subVectors(s,i).cross(qy.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i,s=!0){const l=t.delta(pd),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const f=-(t.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(t.start).addScaledVector(l,f)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||Zy.getNormalMatrix(t),l=this.coplanarPoint(pd).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Ky=0;class vs extends _s{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ky++}),this.uuid=ps(),this.name="",this.type="Material",this.blending=pl,this.side=ms,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vv,this.blendDst=kv,this.blendEquation=Zr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new le(0,0,0),this.blendAlpha=0,this.depthFunc=vl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gy,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kh,this.stencilZFail=Kh,this.stencilZPass=Kh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){ce(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ce(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(c=>c.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const p in c){const m=c[p];delete m.metadata,f.push(m)}return f}if(i){const c=l(t.textures),f=l(t.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}fromJSON(t,i){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new le().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(s=>new ji().fromJSON(s))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=i[t.map]||null),t.matcap!==void 0&&(this.matcap=i[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=i[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=i[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=i[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let s=t.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new ae().fromArray(s)}return t.displacementMap!==void 0&&(this.displacementMap=i[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=i[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=i[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=i[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=i[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=i[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=i[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=i[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=i[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=i[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=i[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ae().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=i[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=i[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=i[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=i[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=i[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class fS extends vs{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Br;const il=new Q,Ir=new Q,Fr=new Q,zr=new ae,al=new ae,hS=new Je,Xc=new Q,sl=new Q,Wc=new Q,Z_=new ae,md=new ae,K_=new ae;class Qy extends Tn{constructor(t=new fS){if(super(),this.isSprite=!0,this.type="Sprite",Br===void 0){Br=new On;const i=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),s=new Yy(i,5);Br.setIndex([0,1,2,0,2,3]),Br.setAttribute("position",new Au(s,3,0,!1)),Br.setAttribute("uv",new Au(s,2,3,!1))}this.geometry=Br,this.material=t,this.center=new ae(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,i){t.camera===null&&Le('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ir.setFromMatrixScale(this.matrixWorld),hS.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Fr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ir.multiplyScalar(-Fr.z);const s=this.material.rotation;let l,c;s!==0&&(c=Math.cos(s),l=Math.sin(s));const f=this.center;Yc(Xc.set(-.5,-.5,0),Fr,f,Ir,l,c),Yc(sl.set(.5,-.5,0),Fr,f,Ir,l,c),Yc(Wc.set(.5,.5,0),Fr,f,Ir,l,c),Z_.set(0,0),md.set(1,0),K_.set(1,1);let p=t.ray.intersectTriangle(Xc,sl,Wc,!1,il);if(p===null&&(Yc(sl.set(-.5,.5,0),Fr,f,Ir,l,c),md.set(0,1),p=t.ray.intersectTriangle(Xc,Wc,sl,!1,il),p===null))return;const m=t.ray.origin.distanceTo(il);m<t.near||m>t.far||i.push({distance:m,point:il.clone(),uv:Ni.getInterpolation(il,Xc,sl,Wc,Z_,md,K_,new ae),face:null,object:this})}copy(t,i){return super.copy(t,i),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Yc(r,t,i,s,l,c){zr.subVectors(r,i).addScalar(.5).multiply(s),l!==void 0?(al.x=c*zr.x-l*zr.y,al.y=l*zr.x+c*zr.y):al.copy(zr),r.copy(t),r.x+=al.x,r.y+=al.y,r.applyMatrix4(hS)}const wa=new Q,gd=new Q,qc=new Q,Zc=new Q;class Lu{constructor(t=new Q,i=new Q(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wa)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=wa.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(wa.copy(this.origin).addScaledVector(this.direction,i),wa.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){gd.copy(t).add(i).multiplyScalar(.5),qc.copy(i).sub(t).normalize(),Zc.copy(this.origin).sub(gd);const c=t.distanceTo(i)*.5,f=-this.direction.dot(qc),p=Zc.dot(this.direction),m=-Zc.dot(qc),d=Zc.lengthSq(),_=Math.abs(1-f*f);let v,g,y,T;if(_>0)if(v=f*m-p,g=f*p-m,T=c*_,v>=0)if(g>=-T)if(g<=T){const U=1/_;v*=U,g*=U,y=v*(v+f*g+2*p)+g*(f*v+g+2*m)+d}else g=c,v=Math.max(0,-(f*g+p)),y=-v*v+g*(g+2*m)+d;else g=-c,v=Math.max(0,-(f*g+p)),y=-v*v+g*(g+2*m)+d;else g<=-T?(v=Math.max(0,-(-f*c+p)),g=v>0?-c:Math.min(Math.max(-c,-m),c),y=-v*v+g*(g+2*m)+d):g<=T?(v=0,g=Math.min(Math.max(-c,-m),c),y=g*(g+2*m)+d):(v=Math.max(0,-(f*c+p)),g=v>0?c:Math.min(Math.max(-c,-m),c),y=-v*v+g*(g+2*m)+d);else g=f>0?-c:c,v=Math.max(0,-(f*g+p)),y=-v*v+g*(g+2*m)+d;return s&&s.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(gd).addScaledVector(qc,g),y}intersectSphere(t,i){if(t.radius<0)return null;wa.subVectors(t.center,this.origin);const s=wa.dot(this.direction),l=wa.dot(wa)-s*s,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),p=s-f,m=s+f;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,f,p,m;const d=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,g=this.origin;return d>=0?(s=(t.min.x-g.x)*d,l=(t.max.x-g.x)*d):(s=(t.max.x-g.x)*d,l=(t.min.x-g.x)*d),_>=0?(c=(t.min.y-g.y)*_,f=(t.max.y-g.y)*_):(c=(t.max.y-g.y)*_,f=(t.min.y-g.y)*_),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),v>=0?(p=(t.min.z-g.z)*v,m=(t.max.z-g.z)*v):(p=(t.max.z-g.z)*v,m=(t.min.z-g.z)*v),s>m||p>l)||((p>s||s!==s)&&(s=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,wa)!==null}intersectTriangle(t,i,s,l,c){const f=this.origin,p=this.direction,m=p.x,d=p.y,_=p.z,v=t.x-f.x,g=t.y-f.y,y=t.z-f.z,T=i.x-f.x,U=i.y-f.y,M=i.z-f.z,S=s.x-f.x,P=s.y-f.y,I=s.z-f.z,D=Math.abs(m),N=Math.abs(d),C=Math.abs(_);let R,E,O,H,K,q,ct,Z,$,F,G,ut;if(D>=N&&D>=C?(O=m,q=v,$=T,ut=S,m>=0?(R=d,E=_,H=g,K=y,ct=U,Z=M,F=P,G=I):(R=_,E=d,H=y,K=g,ct=M,Z=U,F=I,G=P)):N>=C?(O=d,q=g,$=U,ut=P,d>=0?(R=_,E=m,H=y,K=v,ct=M,Z=T,F=I,G=S):(R=m,E=_,H=v,K=y,ct=T,Z=M,F=S,G=I)):(O=_,q=y,$=M,ut=I,_>=0?(R=m,E=d,H=v,K=g,ct=T,Z=U,F=S,G=P):(R=d,E=m,H=g,K=v,ct=U,Z=T,F=P,G=S)),O===0)return null;const st=R/O,dt=E/O,L=1/O,tt=H-st*q,mt=K-dt*q,Tt=ct-st*$,Ut=Z-dt*$,Ht=F-st*ut,it=G-dt*ut,vt=Ht*Ut-it*Tt,At=tt*it-mt*Ht,se=Tt*mt-Ut*tt;if(l){if(vt<0||At<0||se<0)return null}else if((vt<0||At<0||se<0)&&(vt>0||At>0||se>0))return null;const zt=vt+At+se;if(zt===0)return null;const he=L*(vt*q+At*$+se*ut);return(zt>0?he<0:he>0)?null:this.at(he/zt,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ip extends vs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qs,this.combine=Xv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Q_=new Je,Hs=new Lu,Kc=new bl,J_=new Q,Qc=new Q,Jc=new Q,jc=new Q,_d=new Q,$c=new Q,j_=new Q,tu=new Q;class gn extends Tn{constructor(t=new On,i=new Ip){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const p=this.morphTargetInfluences;if(c&&p){$c.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const _=p[m],v=c[m];_!==0&&(_d.fromBufferAttribute(v,t),f?$c.addScaledVector(_d,_):$c.addScaledVector(_d.sub(i),_))}i.add($c)}return i}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Kc.copy(s.boundingSphere),Kc.applyMatrix4(c),Hs.copy(t.ray).recast(t.near),!(Kc.containsPoint(Hs.origin)===!1&&(Hs.intersectSphere(Kc,J_)===null||Hs.origin.distanceToSquared(J_)>(t.far-t.near)**2))&&(Q_.copy(c).invert(),Hs.copy(t.ray).applyMatrix4(Q_),!(s.boundingBox!==null&&Hs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,Hs)))}_computeIntersections(t,i,s){let l;const c=this.geometry,f=this.material,p=c.index,m=c.attributes.position,d=c.attributes.uv,_=c.attributes.uv1,v=c.attributes.normal,g=c.groups,y=c.drawRange;if(p!==null)if(Array.isArray(f))for(let T=0,U=g.length;T<U;T++){const M=g[T],S=f[M.materialIndex],P=Math.max(M.start,y.start),I=Math.min(p.count,Math.min(M.start+M.count,y.start+y.count));for(let D=P,N=I;D<N;D+=3){const C=p.getX(D),R=p.getX(D+1),E=p.getX(D+2);l=eu(this,S,t,s,d,_,v,C,R,E),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const T=Math.max(0,y.start),U=Math.min(p.count,y.start+y.count);for(let M=T,S=U;M<S;M+=3){const P=p.getX(M),I=p.getX(M+1),D=p.getX(M+2);l=eu(this,f,t,s,d,_,v,P,I,D),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let T=0,U=g.length;T<U;T++){const M=g[T],S=f[M.materialIndex],P=Math.max(M.start,y.start),I=Math.min(m.count,Math.min(M.start+M.count,y.start+y.count));for(let D=P,N=I;D<N;D+=3){const C=D,R=D+1,E=D+2;l=eu(this,S,t,s,d,_,v,C,R,E),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const T=Math.max(0,y.start),U=Math.min(m.count,y.start+y.count);for(let M=T,S=U;M<S;M+=3){const P=M,I=M+1,D=M+2;l=eu(this,f,t,s,d,_,v,P,I,D),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function Jy(r,t,i,s,l,c,f,p){let m;if(t.side===Yn?m=s.intersectTriangle(f,c,l,!0,p):m=s.intersectTriangle(l,c,f,t.side===ms,p),m===null)return null;tu.copy(p),tu.applyMatrix4(r.matrixWorld);const d=i.ray.origin.distanceTo(tu);return d<i.near||d>i.far?null:{distance:d,point:tu.clone(),object:r}}function eu(r,t,i,s,l,c,f,p,m,d){r.getVertexPosition(p,Qc),r.getVertexPosition(m,Jc),r.getVertexPosition(d,jc);const _=Jy(r,t,i,s,Qc,Jc,jc,j_);if(_){const v=new Q;Ni.getBarycoord(j_,Qc,Jc,jc,v),l&&(_.uv=Ni.getInterpolatedAttribute(l,p,m,d,v,new ae)),c&&(_.uv1=Ni.getInterpolatedAttribute(c,p,m,d,v,new ae)),f&&(_.normal=Ni.getInterpolatedAttribute(f,p,m,d,v,new Q),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const g={a:p,b:m,c:d,normal:new Q,materialIndex:0};Ni.getNormal(Qc,Jc,jc,g.normal),_.face=g,_.barycoord=v}return _}class dS extends qn{constructor(t=null,i=1,s=1,l,c,f,p,m,d=Cn,_=Cn,v,g){super(null,f,p,m,d,_,l,c,v,g),this.isDataTexture=!0,this.image={data:t,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Gs=new bl,jy=new ae(.5,.5),nu=new Q;class Fp{constructor(t=new ji,i=new ji,s=new ji,l=new ji,c=new ji,f=new ji){this.planes=[t,i,s,l,c,f]}set(t,i,s,l,c,f){const p=this.planes;return p[0].copy(t),p[1].copy(i),p[2].copy(s),p[3].copy(l),p[4].copy(c),p[5].copy(f),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ia,s=!1){const l=this.planes,c=t.elements,f=c[0],p=c[1],m=c[2],d=c[3],_=c[4],v=c[5],g=c[6],y=c[7],T=c[8],U=c[9],M=c[10],S=c[11],P=c[12],I=c[13],D=c[14],N=c[15];if(l[0].setComponents(d-f,y-_,S-T,N-P).normalize(),l[1].setComponents(d+f,y+_,S+T,N+P).normalize(),l[2].setComponents(d+p,y+v,S+U,N+I).normalize(),l[3].setComponents(d-p,y-v,S-U,N-I).normalize(),s)l[4].setComponents(m,g,M,D).normalize(),l[5].setComponents(d-m,y-g,S-M,N-D).normalize();else if(l[4].setComponents(d-m,y-g,S-M,N-D).normalize(),i===ia)l[5].setComponents(d+m,y+g,S+M,N+D).normalize();else if(i===Ml)l[5].setComponents(m,g,M,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Gs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Gs.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Gs)}intersectsSprite(t){Gs.center.set(0,0,0);const i=jy.distanceTo(t.center);return Gs.radius=.7071067811865476+i,Gs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Gs)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(nu.x=l.normal.x>0?t.max.x:t.min.x,nu.y=l.normal.y>0?t.max.y:t.min.y,nu.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(nu)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $y extends vs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ru=new Q,wu=new Q,$_=new Je,rl=new Lu,iu=new bl,vd=new Q,tv=new Q;class t1 extends Tn{constructor(t=new On,i=new $y){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[0];for(let l=1,c=i.count;l<c;l++)Ru.fromBufferAttribute(i,l-1),wu.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=Ru.distanceTo(wu);t.setAttribute("lineDistance",new un(s,1))}else ce("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),iu.copy(s.boundingSphere),iu.applyMatrix4(l),iu.radius+=c,t.ray.intersectsSphere(iu)===!1)return;$_.copy(l).invert(),rl.copy(t.ray).applyMatrix4($_);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=this.isLineSegments?2:1,_=s.index,g=s.attributes.position;if(_!==null){const y=Math.max(0,f.start),T=Math.min(_.count,f.start+f.count);for(let U=y,M=T-1;U<M;U+=d){const S=_.getX(U),P=_.getX(U+1),I=au(this,t,rl,m,S,P,U);I&&i.push(I)}if(this.isLineLoop){const U=_.getX(T-1),M=_.getX(y),S=au(this,t,rl,m,U,M,T-1);S&&i.push(S)}}else{const y=Math.max(0,f.start),T=Math.min(g.count,f.start+f.count);for(let U=y,M=T-1;U<M;U+=d){const S=au(this,t,rl,m,U,U+1,U);S&&i.push(S)}if(this.isLineLoop){const U=au(this,t,rl,m,T-1,y,T-1);U&&i.push(U)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function au(r,t,i,s,l,c,f){const p=r.geometry.attributes.position;if(Ru.fromBufferAttribute(p,l),wu.fromBufferAttribute(p,c),i.distanceSqToSegment(Ru,wu,vd,tv)>s)return;vd.applyMatrix4(r.matrixWorld);const d=t.ray.origin.distanceTo(vd);if(!(d<t.near||d>t.far))return{distance:d,point:tv.clone().applyMatrix4(r.matrixWorld),index:f,face:null,faceIndex:null,barycoord:null,object:r}}const ev=new Q,nv=new Q;class e1 extends t1{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[];for(let l=0,c=i.count;l<c;l+=2)ev.fromBufferAttribute(i,l),nv.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+ev.distanceTo(nv);t.setAttribute("lineDistance",new un(s,1))}else ce("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class pS extends vs{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const iv=new Je,xp=new Lu,su=new bl,ru=new Q;class n1 extends Tn{constructor(t=new On,i=new pS){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),su.copy(s.boundingSphere),su.applyMatrix4(l),su.radius+=c,t.ray.intersectsSphere(su)===!1)return;iv.copy(l).invert(),xp.copy(t.ray).applyMatrix4(iv);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=s.index,v=s.attributes.position;if(d!==null){const g=Math.max(0,f.start),y=Math.min(d.count,f.start+f.count);for(let T=g,U=y;T<U;T++){const M=d.getX(T);ru.fromBufferAttribute(v,M),av(ru,M,m,l,t,i,this)}}else{const g=Math.max(0,f.start),y=Math.min(v.count,f.start+f.count);for(let T=g,U=y;T<U;T++)ru.fromBufferAttribute(v,T),av(ru,T,m,l,t,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function av(r,t,i,s,l,c,f){const p=xp.distanceSqToPoint(r);if(p<i){const m=new Q;xp.closestPointToPoint(r,m),m.applyMatrix4(s);const d=l.ray.origin.distanceTo(m);if(d<l.near||d>l.far)return;c.push({distance:d,distanceToRay:Math.sqrt(p),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class mS extends qn{constructor(t=[],i=Ws,s,l,c,f,p,m,d,_){super(t,i,s,l,c,f,p,m,d,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class i1 extends qn{constructor(t,i,s,l,c,f,p,m,d){super(t,i,s,l,c,f,p,m,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class yl extends qn{constructor(t,i,s=sa,l,c,f,p=Cn,m=Cn,d,_=Na,v=1){if(_!==Na&&_!==Xs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:i,depth:v};super(g,l,c,f,p,m,_,s,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Pp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return i.compareFunction=this.compareFunction,i}}class a1 extends yl{constructor(t,i=sa,s=Ws,l,c,f=Cn,p=Cn,m,d=Na){const _={width:t,height:t,depth:1},v=[_,_,_,_,_,_];super(t,t,i,s,l,c,f,p,m,d),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class gS extends qn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class io extends On{constructor(t=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const p=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],d=[],_=[],v=[];let g=0,y=0;T("z","y","x",-1,-1,s,i,t,f,c,0),T("z","y","x",1,-1,s,i,-t,f,c,1),T("x","z","y",1,1,t,s,i,l,f,2),T("x","z","y",1,-1,t,s,-i,l,f,3),T("x","y","z",1,-1,t,i,s,l,c,4),T("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new un(d,3)),this.setAttribute("normal",new un(_,3)),this.setAttribute("uv",new un(v,2));function T(U,M,S,P,I,D,N,C,R,E,O){const H=D/R,K=N/E,q=D/2,ct=N/2,Z=C/2,$=R+1,F=E+1;let G=0,ut=0;const st=new Q;for(let dt=0;dt<F;dt++){const L=dt*K-ct;for(let tt=0;tt<$;tt++){const mt=tt*H-q;st[U]=mt*P,st[M]=L*I,st[S]=Z,d.push(st.x,st.y,st.z),st[U]=0,st[M]=0,st[S]=C>0?1:-1,_.push(st.x,st.y,st.z),v.push(tt/R),v.push(1-dt/E),G+=1}}for(let dt=0;dt<E;dt++)for(let L=0;L<R;L++){const tt=g+L+$*dt,mt=g+L+$*(dt+1),Tt=g+(L+1)+$*(dt+1),Ut=g+(L+1)+$*dt;m.push(tt,mt,Ut),m.push(mt,Tt,Ut),ut+=6}p.addGroup(y,ut,O),y+=ut,g+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new io(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class zp extends On{constructor(t=1,i=32,s=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:s,thetaLength:l},i=Math.max(3,i);const c=[],f=[],p=[],m=[],d=new Q,_=new ae;f.push(0,0,0),p.push(0,0,1),m.push(.5,.5);for(let v=0,g=3;v<=i;v++,g+=3){const y=s+v/i*l;d.x=t*Math.cos(y),d.y=t*Math.sin(y),f.push(d.x,d.y,d.z),p.push(0,0,1),_.x=(f[g]/t+1)/2,_.y=(f[g+1]/t+1)/2,m.push(_.x,_.y)}for(let v=1;v<=i;v++)c.push(v,v+1,0);this.setIndex(c),this.setAttribute("position",new un(f,3)),this.setAttribute("normal",new un(p,3)),this.setAttribute("uv",new un(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zp(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class eo extends On{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,f=i/2,p=Math.floor(s),m=Math.floor(l),d=p+1,_=m+1,v=t/p,g=i/m,y=[],T=[],U=[],M=[];for(let S=0;S<_;S++){const P=S*g-f;for(let I=0;I<d;I++){const D=I*v-c;T.push(D,-P,0),U.push(0,0,1),M.push(I/p),M.push(1-S/m)}}for(let S=0;S<m;S++)for(let P=0;P<p;P++){const I=P+d*S,D=P+d*(S+1),N=P+1+d*(S+1),C=P+1+d*S;y.push(I,D,C),y.push(D,N,C)}this.setIndex(y),this.setAttribute("position",new un(T,3)),this.setAttribute("normal",new un(U,3)),this.setAttribute("uv",new un(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new eo(t.width,t.height,t.widthSegments,t.heightSegments)}}class Hp extends On{constructor(t=1,i=32,s=16,l=0,c=Math.PI*2,f=0,p=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:p},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+p,Math.PI);let d=0;const _=[],v=new Q,g=new Q,y=[],T=[],U=[],M=[];for(let S=0;S<=s;S++){const P=[],I=S/s,D=f+I*p,N=t*Math.cos(D),C=Math.sqrt(t*t-N*N);let R=0;S===0&&f===0?R=.5/i:S===s&&m===Math.PI&&(R=-.5/i);for(let E=0;E<=i;E++){const O=E/i,H=l+O*c;v.x=-C*Math.cos(H),v.y=N,v.z=C*Math.sin(H),T.push(v.x,v.y,v.z),g.copy(v).normalize(),U.push(g.x,g.y,g.z),M.push(O+R,1-I),P.push(d++)}_.push(P)}for(let S=0;S<s;S++)for(let P=0;P<i;P++){const I=_[S][P+1],D=_[S][P],N=_[S+1][P],C=_[S+1][P+1];(S!==0||f>0)&&y.push(I,D,C),(S!==s-1||m<Math.PI)&&y.push(D,N,C)}this.setIndex(y),this.setAttribute("position",new un(T,3)),this.setAttribute("normal",new un(U,3)),this.setAttribute("uv",new un(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hp(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function no(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];if(sv(l))l.isRenderTargetTexture?(ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone();else if(Array.isArray(l))if(sv(l[0])){const c=[];for(let f=0,p=l.length;f<p;f++)c[f]=l[f].clone();t[i][s]=c}else t[i][s]=l.slice();else t[i][s]=l}}return t}function jn(r){const t={};for(let i=0;i<r.length;i++){const s=no(r[i]);for(const l in s)t[l]=s[l]}return t}function sv(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function s1(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function _S(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:we.workingColorSpace}const vS={clone:no,merge:jn};var r1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,o1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pn extends vs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=r1,this.fragmentShader=o1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=no(t.uniforms),this.uniformsGroups=s1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(t,i){if(super.fromJSON(t,i),t.uniforms!==void 0)for(const s in t.uniforms){const l=t.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new le().setHex(l.value);break;case"v2":this.uniforms[s].value=new ae().fromArray(l.value);break;case"v3":this.uniforms[s].value=new Q().fromArray(l.value);break;case"v4":this.uniforms[s].value=new on().fromArray(l.value);break;case"m3":this.uniforms[s].value=new pe().fromArray(l.value);break;case"m4":this.uniforms[s].value=new Je().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const s in t.extensions)this.extensions[s]=t.extensions[s];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class l1 extends Pn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class c1 extends vs{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new le(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vp,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class u1 extends vs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=py,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class f1 extends vs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Gp extends Tn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new le(t),this.intensity=i}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}class h1 extends Gp{constructor(t,i,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new le(i)}copy(t,i){return super.copy(t,i),this.groundColor.copy(t.groundColor),this}toJSON(t){const i=super.toJSON(t);return i.object.groundColor=this.groundColor.getHex(),i}}const Sd=new Je,rv=new Q,ov=new Q;class SS{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.mapType=Mi,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fp,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new on(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera;rv.setFromMatrixPosition(t.matrixWorld),i.position.copy(rv),ov.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(ov),i.updateMatrixWorld(),this._updateMatrix(i,this.matrix,this._frustum)}_updateMatrix(t,i,s,l){Sd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),s.setFromProjectionMatrix(Sd,t.coordinateSystem,t.reversedDepth);const c=this._frameExtents,f=l?l.z/c.x:1,p=l?l.w/c.y:1,m=l?l.x/c.x:0,d=l?l.y/c.y:0;t.coordinateSystem===Ml||t.reversedDepth?i.set(.5*f,0,0,.5*f+m,0,.5*p,0,.5*p+d,0,0,1,0,0,0,0,1):i.set(.5*f,0,0,.5*f+m,0,.5*p,0,.5*p+d,0,0,.5,.5,0,0,0,1),i.multiply(Sd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ou=new Q,lu=new gs,Qi=new Q;class xS extends Tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=ia,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ou,lu,Qi),Qi.x===1&&Qi.y===1&&Qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ou,lu,Qi.set(1,1,1)).invert()}updateWorldMatrix(t,i,s=!1){super.updateWorldMatrix(t,i,s),this.matrixWorld.decompose(ou,lu,Qi),Qi.x===1&&Qi.y===1&&Qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ou,lu,Qi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const fs=new Q,lv=new ae,cv=new ae;class xi extends xS{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Sp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(vu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Sp*2*Math.atan(Math.tan(vu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){fs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(fs.x,fs.y).multiplyScalar(-t/fs.z),fs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(fs.x,fs.y).multiplyScalar(-t/fs.z)}getViewSize(t,i){return this.getViewBounds(t,lv,cv),i.subVectors(cv,lv)}setViewOffset(t,i,s,l,c,f){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(vu*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,d=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/d,l*=f.width/m,s*=f.height/d}const p=this.filmOffset;p!==0&&(c+=t*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class d1 extends SS{constructor(){super(new xi(90,1,.5,500)),this.isPointLightShadow=!0}}class Hr extends Gp{constructor(t,i,s=0,l=2){super(t,i),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=l,this.shadow=new d1}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,i){return super.copy(t,i),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.distance=this.distance,i.object.decay=this.decay,i.object.shadow=this.shadow.toJSON(),i}}class Vp extends xS{constructor(t=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,f=s+t,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,f=c+d*this.view.width,p-=_*this.view.offsetY,m=p-_*this.view.height}this.projectionMatrix.makeOrthographic(c,f,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class p1 extends SS{constructor(){super(new Vp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class m1 extends Gp{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tn.DEFAULT_UP),this.updateMatrix(),this.target=new Tn,this.shadow=new p1}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}const Gr=-90,Vr=1;class g1 extends Tn{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new xi(Gr,Vr,t,i);l.layers=this.layers,this.add(l);const c=new xi(Gr,Vr,t,i);c.layers=this.layers,this.add(c);const f=new xi(Gr,Vr,t,i);f.layers=this.layers,this.add(f);const p=new xi(Gr,Vr,t,i);p.layers=this.layers,this.add(p);const m=new xi(Gr,Vr,t,i);m.layers=this.layers,this.add(m);const d=new xi(Gr,Vr,t,i);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,p,m]=i;for(const d of i)this.remove(d);if(t===ia)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Ml)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of i)this.add(d),d.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,p,m,d,_]=this.children,v=t.getRenderTarget(),g=t.getActiveCubeFace(),y=t.getActiveMipmapLevel(),T=t.xr.enabled;t.xr.enabled=!1;const U=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let M=!1;t.isWebGLRenderer===!0?M=t.state.buffers.depth.getReversed():M=t.reversedDepthBuffer,t.setRenderTarget(s,0,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,c),t.setRenderTarget(s,1,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,f),t.setRenderTarget(s,2,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),t.setRenderTarget(s,3,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(s,4,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),s.texture.generateMipmaps=U,t.setRenderTarget(s,5,l),M&&t.autoClear===!1&&t.clearDepth(),t.render(i,_),t.setRenderTarget(v,g,y),t.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class _1 extends xi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class uv{constructor(t=1,i=0,s=0){this.radius=t,this.phi=i,this.theta=s}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=be(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(be(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class MS{static{MS.prototype.isMatrix2=!0}constructor(t,i,s,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let s=0;s<4;s++)this.elements[s]=t[s+i];return this}set(t,i,s,l){const c=this.elements;return c[0]=t,c[2]=i,c[1]=s,c[3]=l,this}}class v1 extends _s{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function fv(r,t,i,s){const l=S1(s);switch(i){case nS:return r*t;case Cp:return r*t/l.components*l.byteLength;case Dp:return r*t/l.components*l.byteLength;case Ys:return r*t*2/l.components*l.byteLength;case Up:return r*t*2/l.components*l.byteLength;case iS:return r*t*3/l.components*l.byteLength;case Vi:return r*t*4/l.components*l.byteLength;case Lp:return r*t*4/l.components*l.byteLength;case pu:case mu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case gu:case _u:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case kd:case Wd:return Math.max(r,16)*Math.max(t,8)/4;case Vd:case Xd:return Math.max(r,8)*Math.max(t,8)/2;case Yd:case qd:case Kd:case Qd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Zd:case xu:case Jd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case jd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case $d:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case tp:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case ep:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case np:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ip:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case ap:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case sp:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case rp:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case op:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case lp:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case cp:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case up:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case fp:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case hp:case dp:case pp:return Math.ceil(r/4)*Math.ceil(t/4)*16;case mp:case gp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Mu:case _p:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function S1(r){switch(r){case Mi:case jv:return{byteLength:1,components:1};case Sl:case $v:case ki:return{byteLength:2,components:1};case Rp:case wp:return{byteLength:2,components:4};case sa:case Ap:case na:return{byteLength:4,components:1};case tS:case eS:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bp}}));typeof window<"u"&&(window.__THREE__?ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bp);function yS(){let r=null,t=!1,i=null,s=null;function l(c,f){s=r.requestAnimationFrame(l),i(c,f)}return{start:function(){t!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function x1(r){const t=new WeakMap;function i(p,m){const d=p.array,_=p.usage,v=d.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,d,_),p.onUploadCallback();let y;if(d instanceof Float32Array)y=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)y=r.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?y=r.HALF_FLOAT:y=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)y=r.SHORT;else if(d instanceof Uint32Array)y=r.UNSIGNED_INT;else if(d instanceof Int32Array)y=r.INT;else if(d instanceof Int8Array)y=r.BYTE;else if(d instanceof Uint8Array)y=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)y=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:y,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:v}}function s(p,m,d){const _=m.array,v=m.updateRanges;if(r.bindBuffer(d,p),v.length===0)r.bufferSubData(d,0,_);else{v.sort((y,T)=>y.start-T.start);let g=0;for(let y=1;y<v.length;y++){const T=v[g],U=v[y];U.start<=T.start+T.count+1?T.count=Math.max(T.count,U.start+U.count-T.start):(++g,v[g]=U)}v.length=g+1;for(let y=0,T=v.length;y<T;y++){const U=v[y];r.bufferSubData(d,U.start*_.BYTES_PER_ELEMENT,_,U.start,U.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),t.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=t.get(p);m&&(r.deleteBuffer(m.buffer),t.delete(p))}function f(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const _=t.get(p);(!_||_.version<p.version)&&t.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=t.get(p);if(d===void 0)t.set(p,i(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,p,m),d.version=p.version}}return{get:l,remove:c,update:f}}var M1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,y1=`#ifdef USE_ALPHAHASH
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
#endif`,E1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,b1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,T1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,A1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,R1=`#ifdef USE_AOMAP
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
#endif`,w1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,C1=`#ifdef USE_BATCHING
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
#endif`,D1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,U1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,L1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,N1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,O1=`#ifdef USE_IRIDESCENCE
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
#endif`,P1=`#ifdef USE_BUMPMAP
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
#endif`,B1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,I1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,F1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,z1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,H1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,G1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,V1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,k1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,X1=`#define PI 3.141592653589793
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
} // validated`,W1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Y1=`vec3 transformedNormal = objectNormal;
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
#endif`,q1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Z1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,K1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Q1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,J1="gl_FragColor = linearToOutputTexel( gl_FragColor );",j1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$1=`#ifdef USE_ENVMAP
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
#endif`,tE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,eE=`#ifdef USE_ENVMAP
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
#endif`,nE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,iE=`#ifdef USE_ENVMAP
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
#endif`,aE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,oE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lE=`#ifdef USE_GRADIENTMAP
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
}`,cE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,dE=`#ifdef USE_ENVMAP
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
#endif`,pE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_E=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vE=`PhysicalMaterial material;
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
#endif`,SE=`uniform sampler2D dfgLUT;
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
}`,xE=`
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
#endif`,ME=`#if defined( RE_IndirectDiffuse )
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
#endif`,yE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,EE=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,bE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,TE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,AE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,RE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,CE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,DE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,UE=`#if defined( USE_POINTS_UV )
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
#endif`,LE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,NE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,OE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,PE=`#if defined( USE_MORPHCOLORS )
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
#endif`,IE=`#ifdef USE_MORPHTARGETS
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
#endif`,FE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,HE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,GE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,VE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,XE=`#ifdef USE_NORMALMAP
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
#endif`,WE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,YE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ZE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,KE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,QE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,JE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$E=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,eb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ib=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ab=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rb=`float getShadowMask() {
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
}`,ob=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lb=`#ifdef USE_SKINNING
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
#endif`,cb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ub=`#ifdef USE_SKINNING
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
#endif`,fb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,db=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mb=`#ifdef USE_TRANSMISSION
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
#endif`,gb=`#ifdef USE_TRANSMISSION
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
#endif`,_b=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yb=`uniform sampler2D t2D;
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
}`,Eb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ab=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rb=`#include <common>
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
}`,wb=`#if DEPTH_PACKING == 3200
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
}`,Cb=`#define DISTANCE
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
}`,Db=`#define DISTANCE
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
}`,Ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nb=`uniform float scale;
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
}`,Ob=`uniform vec3 diffuse;
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
}`,Pb=`#include <common>
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
}`,Bb=`uniform vec3 diffuse;
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
}`,Ib=`#define LAMBERT
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
}`,Fb=`#define LAMBERT
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
}`,zb=`#define MATCAP
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
}`,Hb=`#define MATCAP
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
}`,Gb=`#define NORMAL
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
}`,Vb=`#define NORMAL
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
}`,kb=`#define PHONG
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
}`,Xb=`#define PHONG
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
}`,Wb=`#define STANDARD
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
}`,Yb=`#define STANDARD
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
}`,qb=`#define TOON
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
}`,Zb=`#define TOON
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
}`,Kb=`uniform float size;
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
}`,Qb=`uniform vec3 diffuse;
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
}`,Jb=`#include <common>
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
}`,jb=`uniform vec3 color;
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
}`,$b=`uniform float rotation;
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
}`,tT=`uniform vec3 diffuse;
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
}`,xe={alphahash_fragment:M1,alphahash_pars_fragment:y1,alphamap_fragment:E1,alphamap_pars_fragment:b1,alphatest_fragment:T1,alphatest_pars_fragment:A1,aomap_fragment:R1,aomap_pars_fragment:w1,batching_pars_vertex:C1,batching_vertex:D1,begin_vertex:U1,beginnormal_vertex:L1,bsdfs:N1,iridescence_fragment:O1,bumpmap_pars_fragment:P1,clipping_planes_fragment:B1,clipping_planes_pars_fragment:I1,clipping_planes_pars_vertex:F1,clipping_planes_vertex:z1,color_fragment:H1,color_pars_fragment:G1,color_pars_vertex:V1,color_vertex:k1,common:X1,cube_uv_reflection_fragment:W1,defaultnormal_vertex:Y1,displacementmap_pars_vertex:q1,displacementmap_vertex:Z1,emissivemap_fragment:K1,emissivemap_pars_fragment:Q1,colorspace_fragment:J1,colorspace_pars_fragment:j1,envmap_fragment:$1,envmap_common_pars_fragment:tE,envmap_pars_fragment:eE,envmap_pars_vertex:nE,envmap_physical_pars_fragment:dE,envmap_vertex:iE,fog_vertex:aE,fog_pars_vertex:sE,fog_fragment:rE,fog_pars_fragment:oE,gradientmap_pars_fragment:lE,lightmap_pars_fragment:cE,lights_lambert_fragment:uE,lights_lambert_pars_fragment:fE,lights_pars_begin:hE,lights_toon_fragment:pE,lights_toon_pars_fragment:mE,lights_phong_fragment:gE,lights_phong_pars_fragment:_E,lights_physical_fragment:vE,lights_physical_pars_fragment:SE,lights_fragment_begin:xE,lights_fragment_maps:ME,lights_fragment_end:yE,lightprobes_pars_fragment:EE,logdepthbuf_fragment:bE,logdepthbuf_pars_fragment:TE,logdepthbuf_pars_vertex:AE,logdepthbuf_vertex:RE,map_fragment:wE,map_pars_fragment:CE,map_particle_fragment:DE,map_particle_pars_fragment:UE,metalnessmap_fragment:LE,metalnessmap_pars_fragment:NE,morphinstance_vertex:OE,morphcolor_vertex:PE,morphnormal_vertex:BE,morphtarget_pars_vertex:IE,morphtarget_vertex:FE,normal_fragment_begin:zE,normal_fragment_maps:HE,normal_pars_fragment:GE,normal_pars_vertex:VE,normal_vertex:kE,normalmap_pars_fragment:XE,clearcoat_normal_fragment_begin:WE,clearcoat_normal_fragment_maps:YE,clearcoat_pars_fragment:qE,iridescence_pars_fragment:ZE,opaque_fragment:KE,packing:QE,premultiplied_alpha_fragment:JE,project_vertex:jE,dithering_fragment:$E,dithering_pars_fragment:tb,roughnessmap_fragment:eb,roughnessmap_pars_fragment:nb,shadowmap_pars_fragment:ib,shadowmap_pars_vertex:ab,shadowmap_vertex:sb,shadowmask_pars_fragment:rb,skinbase_vertex:ob,skinning_pars_vertex:lb,skinning_vertex:cb,skinnormal_vertex:ub,specularmap_fragment:fb,specularmap_pars_fragment:hb,tonemapping_fragment:db,tonemapping_pars_fragment:pb,transmission_fragment:mb,transmission_pars_fragment:gb,uv_pars_fragment:_b,uv_pars_vertex:vb,uv_vertex:Sb,worldpos_vertex:xb,background_vert:Mb,background_frag:yb,backgroundCube_vert:Eb,backgroundCube_frag:bb,cube_vert:Tb,cube_frag:Ab,depth_vert:Rb,depth_frag:wb,distance_vert:Cb,distance_frag:Db,equirect_vert:Ub,equirect_frag:Lb,linedashed_vert:Nb,linedashed_frag:Ob,meshbasic_vert:Pb,meshbasic_frag:Bb,meshlambert_vert:Ib,meshlambert_frag:Fb,meshmatcap_vert:zb,meshmatcap_frag:Hb,meshnormal_vert:Gb,meshnormal_frag:Vb,meshphong_vert:kb,meshphong_frag:Xb,meshphysical_vert:Wb,meshphysical_frag:Yb,meshtoon_vert:qb,meshtoon_frag:Zb,points_vert:Kb,points_frag:Qb,shadow_vert:Jb,shadow_frag:jb,sprite_vert:$b,sprite_frag:tT},Ft={common:{diffuse:{value:new le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pe},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pe}},envmap:{envMap:{value:null},envMapRotation:{value:new pe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pe},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Q},probesMax:{value:new Q},probesResolution:{value:new Q}},points:{diffuse:{value:new le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0},uvTransform:{value:new pe}},sprite:{diffuse:{value:new le(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pe},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0}}},$i={basic:{uniforms:jn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:xe.meshbasic_vert,fragmentShader:xe.meshbasic_frag},lambert:{uniforms:jn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new le(0)},envMapIntensity:{value:1}}]),vertexShader:xe.meshlambert_vert,fragmentShader:xe.meshlambert_frag},phong:{uniforms:jn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new le(0)},specular:{value:new le(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:xe.meshphong_vert,fragmentShader:xe.meshphong_frag},standard:{uniforms:jn([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xe.meshphysical_vert,fragmentShader:xe.meshphysical_frag},toon:{uniforms:jn([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new le(0)}}]),vertexShader:xe.meshtoon_vert,fragmentShader:xe.meshtoon_frag},matcap:{uniforms:jn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:xe.meshmatcap_vert,fragmentShader:xe.meshmatcap_frag},points:{uniforms:jn([Ft.points,Ft.fog]),vertexShader:xe.points_vert,fragmentShader:xe.points_frag},dashed:{uniforms:jn([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xe.linedashed_vert,fragmentShader:xe.linedashed_frag},depth:{uniforms:jn([Ft.common,Ft.displacementmap]),vertexShader:xe.depth_vert,fragmentShader:xe.depth_frag},normal:{uniforms:jn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:xe.meshnormal_vert,fragmentShader:xe.meshnormal_frag},sprite:{uniforms:jn([Ft.sprite,Ft.fog]),vertexShader:xe.sprite_vert,fragmentShader:xe.sprite_frag},background:{uniforms:{uvTransform:{value:new pe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xe.background_vert,fragmentShader:xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pe}},vertexShader:xe.backgroundCube_vert,fragmentShader:xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xe.cube_vert,fragmentShader:xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xe.equirect_vert,fragmentShader:xe.equirect_frag},distance:{uniforms:jn([Ft.common,Ft.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xe.distance_vert,fragmentShader:xe.distance_frag},shadow:{uniforms:jn([Ft.lights,Ft.fog,{color:{value:new le(0)},opacity:{value:1}}]),vertexShader:xe.shadow_vert,fragmentShader:xe.shadow_frag}};$i.physical={uniforms:jn([$i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pe},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pe},sheen:{value:0},sheenColor:{value:new le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pe},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pe},attenuationDistance:{value:0},attenuationColor:{value:new le(0)},specularColor:{value:new le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pe},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pe}}]),vertexShader:xe.meshphysical_vert,fragmentShader:xe.meshphysical_frag};const cu={r:0,b:0,g:0},eT=new Je,ES=new pe;ES.set(-1,0,0,0,1,0,0,0,1);function nT(r,t,i,s,l,c){const f=new le(0);let p=l===!0?0:1,m,d,_=null,v=0,g=null;function y(P){let I=P.isScene===!0?P.background:null;if(I&&I.isTexture){const D=P.backgroundBlurriness>0;I=t.get(I,D)}return I}function T(P){let I=!1;const D=y(P);D===null?M(f,p):D&&D.isColor&&(M(D,1),I=!0);const N=r.xr.getEnvironmentBlendMode();N==="additive"?i.buffers.color.setClear(0,0,0,1,c):N==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||I)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function U(P,I){const D=y(I);D&&(D.isCubeTexture||D.mapping===Uu)?(d===void 0&&(d=new gn(new io(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:no($i.backgroundCube.uniforms),vertexShader:$i.backgroundCube.vertexShader,fragmentShader:$i.backgroundCube.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(N,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=D,d.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(eT.makeRotationFromEuler(I.backgroundRotation)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(ES),d.material.toneMapped=we.getTransfer(D.colorSpace)!==ke,(_!==D||v!==D.version||g!==r.toneMapping)&&(d.material.needsUpdate=!0,_=D,v=D.version,g=r.toneMapping),d.layers.enableAll(),P.unshift(d,d.geometry,d.material,0,0,null)):D&&D.isTexture&&(m===void 0&&(m=new gn(new eo(2,2),new Pn({name:"BackgroundMaterial",uniforms:no($i.background.uniforms),vertexShader:$i.background.vertexShader,fragmentShader:$i.background.fragmentShader,side:ms,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=D,m.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,m.material.toneMapped=we.getTransfer(D.colorSpace)!==ke,D.matrixAutoUpdate===!0&&D.updateMatrix(),m.material.uniforms.uvTransform.value.copy(D.matrix),(_!==D||v!==D.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,_=D,v=D.version,g=r.toneMapping),m.layers.enableAll(),P.unshift(m,m.geometry,m.material,0,0,null))}function M(P,I){P.getRGB(cu,_S(r)),i.buffers.color.setClear(cu.r,cu.g,cu.b,I,c)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(P,I=1){f.set(P),p=I,M(f,p)},getClearAlpha:function(){return p},setClearAlpha:function(P){p=P,M(f,p)},render:T,addToRenderList:U,dispose:S}}function iT(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function p(K,q,ct,Z,$){let F=!1;const G=v(K,Z,ct,q);c!==G&&(c=G,d(c.object)),F=y(K,Z,ct,$),F&&T(K,Z,ct,$),$!==null&&t.update($,r.ELEMENT_ARRAY_BUFFER),(F||f)&&(f=!1,D(K,q,ct,Z),$!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function m(){return r.createVertexArray()}function d(K){return r.bindVertexArray(K)}function _(K){return r.deleteVertexArray(K)}function v(K,q,ct,Z){const $=Z.wireframe===!0;let F=s[q.id];F===void 0&&(F={},s[q.id]=F);const G=K.isInstancedMesh===!0?K.id:0;let ut=F[G];ut===void 0&&(ut={},F[G]=ut);let st=ut[ct.id];st===void 0&&(st={},ut[ct.id]=st);let dt=st[$];return dt===void 0&&(dt=g(m()),st[$]=dt),dt}function g(K){const q=[],ct=[],Z=[];for(let $=0;$<i;$++)q[$]=0,ct[$]=0,Z[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ct,attributeDivisors:Z,object:K,attributes:{},index:null}}function y(K,q,ct,Z){const $=c.attributes,F=q.attributes;let G=0;const ut=ct.getAttributes();for(const st in ut)if(ut[st].location>=0){const L=$[st];let tt=F[st];if(tt===void 0&&(st==="instanceMatrix"&&K.instanceMatrix&&(tt=K.instanceMatrix),st==="instanceColor"&&K.instanceColor&&(tt=K.instanceColor)),L===void 0||L.attribute!==tt||tt&&L.data!==tt.data)return!0;G++}return c.attributesNum!==G||c.index!==Z}function T(K,q,ct,Z){const $={},F=q.attributes;let G=0;const ut=ct.getAttributes();for(const st in ut)if(ut[st].location>=0){let L=F[st];L===void 0&&(st==="instanceMatrix"&&K.instanceMatrix&&(L=K.instanceMatrix),st==="instanceColor"&&K.instanceColor&&(L=K.instanceColor));const tt={};tt.attribute=L,L&&L.data&&(tt.data=L.data),$[st]=tt,G++}c.attributes=$,c.attributesNum=G,c.index=Z}function U(){const K=c.newAttributes;for(let q=0,ct=K.length;q<ct;q++)K[q]=0}function M(K){S(K,0)}function S(K,q){const ct=c.newAttributes,Z=c.enabledAttributes,$=c.attributeDivisors;ct[K]=1,Z[K]===0&&(r.enableVertexAttribArray(K),Z[K]=1),$[K]!==q&&(r.vertexAttribDivisor(K,q),$[K]=q)}function P(){const K=c.newAttributes,q=c.enabledAttributes;for(let ct=0,Z=q.length;ct<Z;ct++)q[ct]!==K[ct]&&(r.disableVertexAttribArray(ct),q[ct]=0)}function I(K,q,ct,Z,$,F,G){G===!0?r.vertexAttribIPointer(K,q,ct,$,F):r.vertexAttribPointer(K,q,ct,Z,$,F)}function D(K,q,ct,Z){U();const $=Z.attributes,F=ct.getAttributes(),G=q.defaultAttributeValues;for(const ut in F){const st=F[ut];if(st.location>=0){let dt=$[ut];if(dt===void 0&&(ut==="instanceMatrix"&&K.instanceMatrix&&(dt=K.instanceMatrix),ut==="instanceColor"&&K.instanceColor&&(dt=K.instanceColor)),dt!==void 0){const L=dt.normalized,tt=dt.itemSize,mt=t.get(dt);if(mt===void 0)continue;const Tt=mt.buffer,Ut=mt.type,Ht=mt.bytesPerElement,it=Ut===r.INT||Ut===r.UNSIGNED_INT||dt.gpuType===Ap;if(dt.isInterleavedBufferAttribute){const vt=dt.data,At=vt.stride,se=dt.offset;if(vt.isInstancedInterleavedBuffer){for(let zt=0;zt<st.locationSize;zt++)S(st.location+zt,vt.meshPerAttribute);K.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let zt=0;zt<st.locationSize;zt++)M(st.location+zt);r.bindBuffer(r.ARRAY_BUFFER,Tt);for(let zt=0;zt<st.locationSize;zt++)I(st.location+zt,tt/st.locationSize,Ut,L,At*Ht,(se+tt/st.locationSize*zt)*Ht,it)}else{if(dt.isInstancedBufferAttribute){for(let vt=0;vt<st.locationSize;vt++)S(st.location+vt,dt.meshPerAttribute);K.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let vt=0;vt<st.locationSize;vt++)M(st.location+vt);r.bindBuffer(r.ARRAY_BUFFER,Tt);for(let vt=0;vt<st.locationSize;vt++)I(st.location+vt,tt/st.locationSize,Ut,L,tt*Ht,tt/st.locationSize*vt*Ht,it)}}else if(G!==void 0){const L=G[ut];if(L!==void 0)switch(L.length){case 2:r.vertexAttrib2fv(st.location,L);break;case 3:r.vertexAttrib3fv(st.location,L);break;case 4:r.vertexAttrib4fv(st.location,L);break;default:r.vertexAttrib1fv(st.location,L)}}}}P()}function N(){O();for(const K in s){const q=s[K];for(const ct in q){const Z=q[ct];for(const $ in Z){const F=Z[$];for(const G in F)_(F[G].object),delete F[G];delete Z[$]}}delete s[K]}}function C(K){if(s[K.id]===void 0)return;const q=s[K.id];for(const ct in q){const Z=q[ct];for(const $ in Z){const F=Z[$];for(const G in F)_(F[G].object),delete F[G];delete Z[$]}}delete s[K.id]}function R(K){for(const q in s){const ct=s[q];for(const Z in ct){const $=ct[Z];if($[K.id]===void 0)continue;const F=$[K.id];for(const G in F)_(F[G].object),delete F[G];delete $[K.id]}}}function E(K){for(const q in s){const ct=s[q],Z=K.isInstancedMesh===!0?K.id:0,$=ct[Z];if($!==void 0){for(const F in $){const G=$[F];for(const ut in G)_(G[ut].object),delete G[ut];delete $[F]}delete ct[Z],Object.keys(ct).length===0&&delete s[q]}}}function O(){H(),f=!0,c!==l&&(c=l,d(c.object))}function H(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:O,resetDefaultState:H,dispose:N,releaseStatesOfGeometry:C,releaseStatesOfObject:E,releaseStatesOfProgram:R,initAttributes:U,enableAttribute:M,disableUnusedAttributes:P}}function aT(r,t,i){let s;function l(m){s=m}function c(m,d){r.drawArrays(s,m,d),i.update(d,s,1)}function f(m,d,_){_!==0&&(r.drawArraysInstanced(s,m,d,_),i.update(d,s,_))}function p(m,d,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,d,0,_);let g=0;for(let y=0;y<_;y++)g+=d[y];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=p}function sT(r,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(R){return!(R!==Vi&&s.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(R){const E=R===ki&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Mi&&R!==na&&!E&&s.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function m(R){if(R==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=i.precision!==void 0?i.precision:"highp";const _=m(d);_!==d&&(ce("WebGLRenderer:",d,"not supported, using",_,"instead."),d=_);const v=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const y=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),U=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),P=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),I=r.getParameter(r.MAX_VARYING_VECTORS),D=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),N=r.getParameter(r.MAX_SAMPLES),C=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:v,reversedDepthBuffer:g,maxTextures:y,maxVertexTextures:T,maxTextureSize:U,maxCubemapSize:M,maxAttributes:S,maxVertexUniforms:P,maxVaryings:I,maxFragmentUniforms:D,maxSamples:N,samples:C}}function rT(r){const t=this;let i=null,s=0,l=!1,c=!1;const f=new ji,p=new pe,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,g){const y=v.length!==0||g||s!==0||l;return l=g,s=v.length,y},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,g){i=_(v,g,0)},this.setState=function(v,g,y){const T=v.clippingPlanes,U=v.clipIntersection,M=v.clipShadows,S=r.get(v);if(!l||T===null||T.length===0||c&&!M)c?_(null):d();else{const P=c?0:s,I=P*4;let D=S.clippingState||null;m.value=D,D=_(T,g,I,y);for(let N=0;N!==I;++N)D[N]=i[N];S.clippingState=D,this.numIntersection=U?this.numPlanes:0,this.numPlanes+=P}};function d(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function _(v,g,y,T){const U=v!==null?v.length:0;let M=null;if(U!==0){if(M=m.value,T!==!0||M===null){const S=y+U*4,P=g.matrixWorldInverse;p.getNormalMatrix(P),(M===null||M.length<S)&&(M=new Float32Array(S));for(let I=0,D=y;I!==U;++I,D+=4)f.copy(v[I]).applyMatrix4(P,p),f.normal.toArray(M,D),M[D+3]=f.constant}m.value=M,m.needsUpdate=!0}return t.numPlanes=U,t.numIntersection=0,M}}const Qr=4,oT=6,lT=20,cT=256,ol=new Vp,hv=new le;let xd=null,Md=0,yd=0,Ed=!1;const uT=new Q,Vs=new Q;class dv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,s=.1,l=100,c={}){const{size:f=256,position:p=uT}=c;xd=this._renderer.getRenderTarget(),Md=this._renderer.getActiveCubeFace(),yd=this._renderer.getActiveMipmapLevel(),Ed=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,s,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(xd,Md,yd),this._renderer.xr.enabled=Ed,t.scissorTest=!1,kr(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Ws||t.mapping===to?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xd=this._renderer.getRenderTarget(),Md=this._renderer.getActiveCubeFace(),yd=this._renderer.getActiveMipmapLevel(),Ed=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Xn,minFilter:Xn,generateMipmaps:!1,type:ki,format:Vi,colorSpace:yu,depthBuffer:!1},l=pv(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pv(t,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=fT(c)),this._blurMaterial=dT(c,t,i),this._ggxMaterial=hT(c,t,i)}return l}_compileMaterial(t){const i=new gn(new On,t);this._renderer.compile(i,ol)}_sceneToCubeUV(t,i,s,l,c){const m=new xi(90,1,i,s),d=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,y=v.toneMapping;v.getClearColor(hv),v.toneMapping=aa,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(l),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new gn(new io,new Ip({name:"PMREM.Background",side:Yn,depthWrite:!1,depthTest:!1})));const U=this._backgroundBox,M=U.material;let S=!1;const P=t.background;P?P.isColor&&(M.color.copy(P),t.background=null,S=!0):(M.color.copy(hv),S=!0);for(let I=0;I<6;I++){const D=I%3;D===0?(m.up.set(0,d[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[I],c.y,c.z)):D===1?(m.up.set(0,0,d[I]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[I],c.z)):(m.up.set(0,d[I],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[I]));const N=this._cubeSize;kr(l,D*N,I>2?N:0,N,N),v.setRenderTarget(l),S&&v.render(U,m),v.render(t,m)}v.toneMapping=y,v.autoClear=g,t.background=P}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Ws||t.mapping===to;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=gv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const p=c.uniforms;p.envMap.value=t;const m=this._cubeSize;kr(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,ol)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);i.autoClear=s}_applyGGXFilter(t,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,p=this._lodMeshes[s];p.material=f;const m=f.uniforms,d=s/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),v=Math.sqrt(d*d-_*_),g=d*1.25,y=v*g,{_lodMax:T}=this,U=this._sizeLods[s],M=3*U*(s>T-Qr?s-T+Qr:0),S=4*(this._cubeSize-U);m.envMap.value=t.texture,m.roughness.value=y,m.mipInt.value=T-i,kr(c,M,S,3*U,2*U),l.setRenderTarget(c),l.render(p,ol),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=T-s,kr(t,M,S,3*U,2*U),l.setRenderTarget(t),l.render(p,ol)}_blur(t,i,s,l){const c=this._pingPongRenderTarget,f=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(t,c,i,s,f),this._blurPass(c,t,s,s,f)}_blurPass(t,i,s,l,c){const f=this._renderer,p=this._blurMaterial,m=this._lodMeshes[l];m.material=p;const d=p.uniforms;d.envMap.value=t.texture,d.sigma.value=c,d.mipInt.value=this._lodMax-s;const _=this._sizeLods[l],v=3*_*(l>this._lodMax-Qr?l-this._lodMax+Qr:0),g=4*(this._cubeSize-_);kr(i,v,g,3*_,2*_),f.setRenderTarget(i),f.render(m,ol)}}function fT(r){const t=[],i=[];let s=r;const l=r-Qr+1+oT;for(let c=0;c<l;c++){const f=Math.pow(2,s);t.push(f);const p=1/(f-2),m=-p,d=1+p,_=[m,m,d,m,d,d,m,m,d,d,m,d],v=6,g=6,y=3,T=new Float32Array(y*g*v),U=new Float32Array(y*g*v);for(let S=0;S<v;S++){const P=S%3*2/3-1,I=S>2?0:-1,D=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];T.set(D,y*g*S);for(let N=0;N<g;N++){const C=_[N*2]*2-1,R=_[N*2+1]*2-1;S===0?Vs.set(1,R,C):S===1?Vs.set(-C,1,-R):S===2?Vs.set(-C,R,1):S===3?Vs.set(-1,R,-C):S===4?Vs.set(-C,-1,R):Vs.set(C,R,-1),Vs.toArray(U,(S*g+N)*y)}}const M=new On;M.setAttribute("position",new Wn(T,y)),M.setAttribute("outputDirection",new Wn(U,y)),i.push(new gn(M,null)),s>Qr&&s--}return{lodMeshes:i,sizeLods:t}}function pv(r,t,i){const s=new Oi(r,t,i);return s.texture.mapping=Uu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function kr(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function hT(r,t,i){return new Pn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:cT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nu(),fragmentShader:`

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
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function dT(r,t,i){return new Pn({name:"SphericalGaussianBlur",defines:{SAMPLES:lT,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Nu(),fragmentShader:`

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
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function mv(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nu(),fragmentShader:`

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
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function gv(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ua,depthTest:!1,depthWrite:!1})}function Nu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class bS extends Oi{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new mS(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new io(5,5,5),c=new Pn({name:"CubemapFromEquirect",uniforms:no(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Yn,blending:Ua});c.uniforms.tEquirect.value=i;const f=new gn(l,c),p=i.minFilter;return i.minFilter===ks&&(i.minFilter=Xn),new g1(1,10,this).update(t,f),i.minFilter=p,f.geometry.dispose(),f.material.dispose(),this}clear(t,i=!0,s=!0,l=!0){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(i,s,l);t.setRenderTarget(c)}}function pT(r){let t=new WeakMap,i=new WeakMap,s=null;function l(g,y=!1){return g==null?null:y?f(g):c(g)}function c(g){if(g&&g.isTexture){const y=g.mapping;if(y===Yh||y===qh)if(t.has(g)){const T=t.get(g).texture;return p(T,g.mapping)}else{const T=g.image;if(T&&T.height>0){const U=new bS(T.height);return U.fromEquirectangularTexture(r,g),t.set(g,U),g.addEventListener("dispose",d),p(U.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const y=g.mapping,T=y===Yh||y===qh,U=y===Ws||y===to;if(T||U){let M=i.get(g);const S=M!==void 0?M.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return s===null&&(s=new dv(r)),M=T?s.fromEquirectangular(g,M):s.fromCubemap(g,M),M.texture.pmremVersion=g.pmremVersion,i.set(g,M),M.texture;if(M!==void 0)return M.texture;{const P=g.image;return T&&P&&P.height>0||U&&P&&m(P)?(s===null&&(s=new dv(r)),M=T?s.fromEquirectangular(g):s.fromCubemap(g),M.texture.pmremVersion=g.pmremVersion,i.set(g,M),g.addEventListener("dispose",_),M.texture):null}}}return g}function p(g,y){return y===Yh?g.mapping=Ws:y===qh&&(g.mapping=to),g}function m(g){let y=0;const T=6;for(let U=0;U<T;U++)g[U]!==void 0&&y++;return y===T}function d(g){const y=g.target;y.removeEventListener("dispose",d);const T=t.get(y);T!==void 0&&(t.delete(y),T.dispose())}function _(g){const y=g.target;y.removeEventListener("dispose",_);const T=i.get(y);T!==void 0&&(i.delete(y),T.dispose())}function v(){t=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:v}}function mT(r){const t={};function i(s){if(t[s]!==void 0)return t[s];const l=r.getExtension(s);return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&jr("WebGLRenderer: "+s+" extension not supported."),l}}}function gT(r,t,i,s){const l={},c=new WeakMap;function f(v){const g=v.target;g.index!==null&&t.remove(g.index);for(const T in g.attributes)t.remove(g.attributes[T]);g.removeEventListener("dispose",f),delete l[g.id];const y=c.get(g);y&&(t.remove(y),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function p(v,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(v){const g=v.attributes;for(const y in g)t.update(g[y],r.ARRAY_BUFFER)}function d(v){const g=[],y=v.index,T=v.attributes.position;let U=0;if(T===void 0)return;if(y!==null){const P=y.array;U=y.version;for(let I=0,D=P.length;I<D;I+=3){const N=P[I+0],C=P[I+1],R=P[I+2];g.push(N,C,C,R,R,N)}}else{const P=T.array;U=T.version;for(let I=0,D=P.length/3-1;I<D;I+=3){const N=I+0,C=I+1,R=I+2;g.push(N,C,C,R,R,N)}}const M=new(T.count>=65535?uS:cS)(g,1);M.version=U;const S=c.get(v);S&&t.remove(S),c.set(v,M)}function _(v){const g=c.get(v);if(g){const y=v.index;y!==null&&g.version<y.version&&d(v)}else d(v);return c.get(v)}return{get:p,update:m,getWireframeAttribute:_}}function _T(r,t,i){let s;function l(v){s=v}let c,f;function p(v){c=v.type,f=v.bytesPerElement}function m(v,g){r.drawElements(s,g,c,v*f),i.update(g,s,1)}function d(v,g,y){y!==0&&(r.drawElementsInstanced(s,g,c,v*f,y),i.update(g,s,y))}function _(v,g,y){if(y===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,v,0,y);let U=0;for(let M=0;M<y;M++)U+=g[M];i.update(U,s,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=_}function vT(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,p){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=p*(c/3);break;case r.LINES:i.lines+=p*(c/2);break;case r.LINE_STRIP:i.lines+=p*(c-1);break;case r.LINE_LOOP:i.lines+=p*c;break;case r.POINTS:i.points+=p*c;break;default:Le("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function ST(r,t,i){const s=new WeakMap,l=new on;function c(f,p,m){const d=f.morphTargetInfluences,_=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,v=_!==void 0?_.length:0;let g=s.get(p);if(g===void 0||g.count!==v){let H=function(){E.dispose(),s.delete(p),p.removeEventListener("dispose",H)};var y=H;g!==void 0&&g.texture.dispose();const T=p.morphAttributes.position!==void 0,U=p.morphAttributes.normal!==void 0,M=p.morphAttributes.color!==void 0,S=p.morphAttributes.position||[],P=p.morphAttributes.normal||[],I=p.morphAttributes.color||[];let D=0;T===!0&&(D=1),U===!0&&(D=2),M===!0&&(D=3);let N=p.attributes.position.count*D,C=1;N>t.maxTextureSize&&(C=Math.ceil(N/t.maxTextureSize),N=t.maxTextureSize);const R=new Float32Array(N*C*4*v),E=new rS(R,N,C,v);E.type=na,E.needsUpdate=!0;const O=D*4;for(let K=0;K<v;K++){const q=S[K],ct=P[K],Z=I[K],$=N*C*4*K;for(let F=0;F<q.count;F++){const G=F*O;T===!0&&(l.fromBufferAttribute(q,F),R[$+G+0]=l.x,R[$+G+1]=l.y,R[$+G+2]=l.z,R[$+G+3]=0),U===!0&&(l.fromBufferAttribute(ct,F),R[$+G+4]=l.x,R[$+G+5]=l.y,R[$+G+6]=l.z,R[$+G+7]=0),M===!0&&(l.fromBufferAttribute(Z,F),R[$+G+8]=l.x,R[$+G+9]=l.y,R[$+G+10]=l.z,R[$+G+11]=Z.itemSize===4?l.w:1)}}g={count:v,texture:E,size:new ae(N,C)},s.set(p,g),p.addEventListener("dispose",H)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let T=0;for(let M=0;M<d.length;M++)T+=d[M];const U=p.morphTargetsRelative?1:1-T;m.getUniforms().setValue(r,"morphTargetBaseInfluence",U),m.getUniforms().setValue(r,"morphTargetInfluences",d)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function xT(r,t,i,s,l){let c=new WeakMap;function f(d){const _=l.render.frame,v=d.geometry,g=t.get(d,v);if(c.get(g)!==_&&(t.update(g),c.set(g,_)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==_&&(i.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&i.update(d.instanceColor,r.ARRAY_BUFFER),c.set(d,_))),d.isSkinnedMesh){const y=d.skeleton;c.get(y)!==_&&(y.update(),c.set(y,_))}return g}function p(){c=new WeakMap}function m(d){const _=d.target;_.removeEventListener("dispose",m),s.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:f,dispose:p}}const MT={[Wv]:"LINEAR_TONE_MAPPING",[Yv]:"REINHARD_TONE_MAPPING",[qv]:"CINEON_TONE_MAPPING",[Tp]:"ACES_FILMIC_TONE_MAPPING",[Kv]:"AGX_TONE_MAPPING",[Qv]:"NEUTRAL_TONE_MAPPING",[Zv]:"CUSTOM_TONE_MAPPING"};function yT(r,t,i,s,l,c){const f=new Oi(t,i,{type:r,depthBuffer:l,stencilBuffer:c,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let p=null,m=null;const d=new On;d.setAttribute("position",new un([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new un([0,2,0,0,2,0],2));const _=new l1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),v=new gn(d,_),g=new Vp(-1,1,1,-1,0,1);let y=null,T=null,U=!1,M,S=null,P=[],I=!1;this.setSize=function(D,N){f.setSize(D,N),p!==null&&p.setSize(D,N),m!==null&&m.setSize(D,N);for(let C=0;C<P.length;C++){const R=P[C];R.setSize&&R.setSize(D,N)}},this.setEffects=function(D){P=D,I=P.length>0&&P[0].isRenderPass===!0;const N=f.width,C=f.height;P.length>0&&p===null&&(p=new Oi(N,C,{type:ki,depthBuffer:!1,stencilBuffer:!1}),m=new Oi(N,C,{type:ki,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<P.length;R++){const E=P[R];E.setSize&&E.setSize(N,C)}},this.begin=function(D,N){if(U||D.toneMapping===aa&&P.length===0)return!1;if(S=N,N!==null){const C=N.width,R=N.height;(f.width!==C||f.height!==R)&&this.setSize(C,R)}return I===!1&&D.setRenderTarget(f),M=D.toneMapping,D.toneMapping=aa,!0},this.hasRenderPass=function(){return I},this.end=function(D,N){D.toneMapping=M,U=!0;let C=f,R=p;for(let E=0;E<P.length;E++){const O=P[E];O.enabled!==!1&&(O.render(D,R,C,N),O.needsSwap!==!1&&(C=R,R=R===p?m:p))}if(y!==D.outputColorSpace||T!==D.toneMapping){y=D.outputColorSpace,T=D.toneMapping,_.defines={},we.getTransfer(y)===ke&&(_.defines.SRGB_TRANSFER="");const E=MT[T];E&&(_.defines[E]=""),_.needsUpdate=!0}_.uniforms.tDiffuse.value=C.texture,D.setRenderTarget(S),D.render(v,g),S=null,U=!1},this.isCompositing=function(){return U},this.dispose=function(){f.dispose(),p!==null&&p.dispose(),m!==null&&m.dispose(),d.dispose(),_.dispose()}}const TS=new qn,Mp=new yl(1,1),AS=new rS,RS=new Oy,wS=new mS,_v=[],vv=[],Sv=new Float32Array(16),xv=new Float32Array(9),Mv=new Float32Array(4);function ao(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let c=_v[l];if(c===void 0&&(c=new Float32Array(l),_v[l]=c),t!==0){s.toArray(c,0);for(let f=1,p=0;f!==t;++f)p+=i,r[f].toArray(c,p)}return c}function Dn(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function Un(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function Ou(r,t){let i=vv[t];i===void 0&&(i=new Int32Array(t),vv[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function ET(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function bT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Dn(i,t))return;r.uniform2fv(this.addr,t),Un(i,t)}}function TT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Dn(i,t))return;r.uniform3fv(this.addr,t),Un(i,t)}}function AT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Dn(i,t))return;r.uniform4fv(this.addr,t),Un(i,t)}}function RT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Dn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),Un(i,t)}else{if(Dn(i,s))return;Mv.set(s),r.uniformMatrix2fv(this.addr,!1,Mv),Un(i,s)}}function wT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Dn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),Un(i,t)}else{if(Dn(i,s))return;xv.set(s),r.uniformMatrix3fv(this.addr,!1,xv),Un(i,s)}}function CT(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Dn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),Un(i,t)}else{if(Dn(i,s))return;Sv.set(s),r.uniformMatrix4fv(this.addr,!1,Sv),Un(i,s)}}function DT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function UT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Dn(i,t))return;r.uniform2iv(this.addr,t),Un(i,t)}}function LT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Dn(i,t))return;r.uniform3iv(this.addr,t),Un(i,t)}}function NT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Dn(i,t))return;r.uniform4iv(this.addr,t),Un(i,t)}}function OT(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function PT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Dn(i,t))return;r.uniform2uiv(this.addr,t),Un(i,t)}}function BT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Dn(i,t))return;r.uniform3uiv(this.addr,t),Un(i,t)}}function IT(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Dn(i,t))return;r.uniform4uiv(this.addr,t),Un(i,t)}}function FT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Mp.compareFunction=i.isReversedDepthBuffer()?Op:Np,c=Mp):c=TS,i.setTexture2D(t||c,l)}function zT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||RS,l)}function HT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||wS,l)}function GT(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||AS,l)}function VT(r){switch(r){case 5126:return ET;case 35664:return bT;case 35665:return TT;case 35666:return AT;case 35674:return RT;case 35675:return wT;case 35676:return CT;case 5124:case 35670:return DT;case 35667:case 35671:return UT;case 35668:case 35672:return LT;case 35669:case 35673:return NT;case 5125:return OT;case 36294:return PT;case 36295:return BT;case 36296:return IT;case 35678:case 36198:case 36298:case 36306:case 35682:return FT;case 35679:case 36299:case 36307:return zT;case 35680:case 36300:case 36308:case 36293:return HT;case 36289:case 36303:case 36311:case 36292:return GT}}function kT(r,t){r.uniform1fv(this.addr,t)}function XT(r,t){const i=ao(t,this.size,2);r.uniform2fv(this.addr,i)}function WT(r,t){const i=ao(t,this.size,3);r.uniform3fv(this.addr,i)}function YT(r,t){const i=ao(t,this.size,4);r.uniform4fv(this.addr,i)}function qT(r,t){const i=ao(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function ZT(r,t){const i=ao(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function KT(r,t){const i=ao(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function QT(r,t){r.uniform1iv(this.addr,t)}function JT(r,t){r.uniform2iv(this.addr,t)}function jT(r,t){r.uniform3iv(this.addr,t)}function $T(r,t){r.uniform4iv(this.addr,t)}function tA(r,t){r.uniform1uiv(this.addr,t)}function eA(r,t){r.uniform2uiv(this.addr,t)}function nA(r,t){r.uniform3uiv(this.addr,t)}function iA(r,t){r.uniform4uiv(this.addr,t)}function aA(r,t,i){const s=this.cache,l=t.length,c=Ou(i,l);Dn(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=Mp:f=TS;for(let p=0;p!==l;++p)i.setTexture2D(t[p]||f,c[p])}function sA(r,t,i){const s=this.cache,l=t.length,c=Ou(i,l);Dn(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));for(let f=0;f!==l;++f)i.setTexture3D(t[f]||RS,c[f])}function rA(r,t,i){const s=this.cache,l=t.length,c=Ou(i,l);Dn(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));for(let f=0;f!==l;++f)i.setTextureCube(t[f]||wS,c[f])}function oA(r,t,i){const s=this.cache,l=t.length,c=Ou(i,l);Dn(s,c)||(r.uniform1iv(this.addr,c),Un(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(t[f]||AS,c[f])}function lA(r){switch(r){case 5126:return kT;case 35664:return XT;case 35665:return WT;case 35666:return YT;case 35674:return qT;case 35675:return ZT;case 35676:return KT;case 5124:case 35670:return QT;case 35667:case 35671:return JT;case 35668:case 35672:return jT;case 35669:case 35673:return $T;case 5125:return tA;case 36294:return eA;case 36295:return nA;case 36296:return iA;case 35678:case 36198:case 36298:case 36306:case 35682:return aA;case 35679:case 36299:case 36307:return sA;case 35680:case 36300:case 36308:case 36293:return rA;case 36289:case 36303:case 36311:case 36292:return oA}}class cA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=VT(i.type)}}class uA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=lA(i.type)}}class fA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const p=l[c];p.setValue(t,i[p.id],s)}}}const bd=/(\w+)(\])?(\[|\.)?/g;function yv(r,t){r.seq.push(t),r.map[t.id]=t}function hA(r,t,i){const s=r.name,l=s.length;for(bd.lastIndex=0;;){const c=bd.exec(s),f=bd.lastIndex;let p=c[1];const m=c[2]==="]",d=c[3];if(m&&(p=p|0),d===void 0||d==="["&&f+2===l){yv(i,d===void 0?new cA(p,r,t):new uA(p,r,t));break}else{let v=i.map[p];v===void 0&&(v=new fA(p),yv(i,v)),i=v}}}class Su{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const p=t.getActiveUniform(i,f),m=t.getUniformLocation(i,p.name);hA(p,m,this)}const l=[],c=[];for(const f of this.seq)f.type===t.SAMPLER_2D_SHADOW||f.type===t.SAMPLER_CUBE_SHADOW||f.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,f=i.length;c!==f;++c){const p=i[c],m=s[p.id];m.needsUpdate!==!1&&p.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in i&&s.push(f)}return s}}function Ev(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const dA=37297;let pA=0;function mA(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let f=l;f<c;f++){const p=f+1;s.push(`${p===t?">":" "} ${p}: ${i[f]}`)}return s.join(`
`)}const bv=new pe;function gA(r){we._getMatrix(bv,we.workingColorSpace,r);const t=`mat3( ${bv.elements.map(i=>i.toFixed(4))} )`;switch(we.getTransfer(r)){case Eu:return[t,"LinearTransferOETF"];case ke:return[t,"sRGBTransferOETF"];default:return ce("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Tv(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const p=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+mA(r.getShaderSource(t),p)}else return c}function _A(r,t){const i=gA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const vA={[Wv]:"Linear",[Yv]:"Reinhard",[qv]:"Cineon",[Tp]:"ACESFilmic",[Kv]:"AgX",[Qv]:"Neutral",[Zv]:"Custom"};function SA(r,t){const i=vA[t];return i===void 0?(ce("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const uu=new Q;function xA(){we.getLuminanceCoefficients(uu);const r=uu.x.toFixed(4),t=uu.y.toFixed(4),i=uu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function MA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hl).join(`
`)}function yA(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function EA(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),f=c.name;let p=1;c.type===r.FLOAT_MAT2&&(p=2),c.type===r.FLOAT_MAT3&&(p=3),c.type===r.FLOAT_MAT4&&(p=4),i[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:p}}return i}function hl(r){return r!==""}function Av(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const bA=/^[ \t]*#include +<([\w\d./]+)>/gm;function yp(r){return r.replace(bA,AA)}const TA=new Map;function AA(r,t){let i=xe[t];if(i===void 0){const s=TA.get(t);if(s!==void 0)i=xe[s],ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return yp(i)}const RA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wv(r){return r.replace(RA,wA)}function wA(r,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Cv(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}const CA={[dl]:"SHADOWMAP_TYPE_PCF",[ul]:"SHADOWMAP_TYPE_VSM"};function DA(r){return CA[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const UA={[Ws]:"ENVMAP_TYPE_CUBE",[to]:"ENVMAP_TYPE_CUBE",[Uu]:"ENVMAP_TYPE_CUBE_UV"};function LA(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":UA[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const NA={[to]:"ENVMAP_MODE_REFRACTION"};function OA(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":NA[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const PA={[Xv]:"ENVMAP_BLENDING_MULTIPLY",[fy]:"ENVMAP_BLENDING_MIX",[hy]:"ENVMAP_BLENDING_ADD"};function BA(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":PA[r.combine]||"ENVMAP_BLENDING_NONE"}function IA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function FA(r,t,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,p=i.fragmentShader;const m=DA(i),d=LA(i),_=OA(i),v=BA(i),g=IA(i),y=MA(i),T=yA(c),U=l.createProgram();let M,S,P=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(hl).join(`
`),M.length>0&&(M+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(hl).join(`
`),S.length>0&&(S+=`
`)):(M=[Cv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hl).join(`
`),S=[Cv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.envMap?"#define "+_:"",i.envMap?"#define "+v:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==aa?"#define TONE_MAPPING":"",i.toneMapping!==aa?xe.tonemapping_pars_fragment:"",i.toneMapping!==aa?SA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",xe.colorspace_pars_fragment,_A("linearToOutputTexel",i.outputColorSpace),xA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(hl).join(`
`)),f=yp(f),f=Av(f,i),f=Rv(f,i),p=yp(p),p=Av(p,i),p=Rv(p,i),f=wv(f),p=wv(p),i.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,M=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,S=["#define varying in",i.glslVersion===P_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===P_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const I=P+M+f,D=P+S+p,N=Ev(l,l.VERTEX_SHADER,I),C=Ev(l,l.FRAGMENT_SHADER,D);l.attachShader(U,N),l.attachShader(U,C),i.index0AttributeName!==void 0?l.bindAttribLocation(U,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(U,0,"position"),l.linkProgram(U);function R(K){if(r.debug.checkShaderErrors){const q=l.getProgramInfoLog(U)||"",ct=l.getShaderInfoLog(N)||"",Z=l.getShaderInfoLog(C)||"",$=q.trim(),F=ct.trim(),G=Z.trim();let ut=!0,st=!0;if(l.getProgramParameter(U,l.LINK_STATUS)===!1)if(ut=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,U,N,C);else{const dt=Tv(l,N,"vertex"),L=Tv(l,C,"fragment");Le("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(U,l.VALIDATE_STATUS)+`

Material Name: `+K.name+`
Material Type: `+K.type+`

Program Info Log: `+$+`
`+dt+`
`+L)}else $!==""?ce("WebGLProgram: Program Info Log:",$):(F===""||G==="")&&(st=!1);st&&(K.diagnostics={runnable:ut,programLog:$,vertexShader:{log:F,prefix:M},fragmentShader:{log:G,prefix:S}})}l.deleteShader(N),l.deleteShader(C),E=new Su(l,U),O=EA(l,U)}let E;this.getUniforms=function(){return E===void 0&&R(this),E};let O;this.getAttributes=function(){return O===void 0&&R(this),O};let H=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=l.getProgramParameter(U,dA)),H},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(U),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=pA++,this.cacheKey=t,this.usedTimes=1,this.program=U,this.vertexShader=N,this.fragmentShader=C,this}let zA=0;class HA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,i,s){const l=this._getShaderCacheForMaterial(t);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new GA(t),i.set(t,s)),s}}class GA{constructor(t){this.id=zA++,this.code=t,this.usedTimes=0}}function VA(r){return r===Ys||r===xu||r===Mu}function kA(r,t,i,s,l,c){const f=new oS,p=new HA,m=new Set,d=[],_=new Map,v=s.logarithmicDepthBuffer;let g=s.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(E){return m.add(E),E===0?"uv":`uv${E}`}function U(E,O,H,K,q,ct){const Z=K.fog,$=q.geometry,F=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?K.environment:null,G=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,ut=t.get(E.envMap||F,G),st=ut&&ut.mapping===Uu?ut.image.height:null,dt=y[E.type];E.precision!==null&&(g=s.getMaxPrecision(E.precision),g!==E.precision&&ce("WebGLProgram.getParameters:",E.precision,"not supported, using",g,"instead."));const L=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,tt=L!==void 0?L.length:0;let mt=0;$.morphAttributes.position!==void 0&&(mt=1),$.morphAttributes.normal!==void 0&&(mt=2),$.morphAttributes.color!==void 0&&(mt=3);let Tt,Ut,Ht,it;if(dt){const We=$i[dt];Tt=We.vertexShader,Ut=We.fragmentShader}else{Tt=E.vertexShader,Ut=E.fragmentShader;const We=p.getVertexShaderStage(E),De=p.getFragmentShaderStage(E);p.update(E,We,De),Ht=We.id,it=De.id}const vt=r.getRenderTarget(),At=r.state.buffers.depth.getReversed(),se=q.isInstancedMesh===!0,zt=q.isBatchedMesh===!0,he=!!E.map,en=!!E.matcap,Jt=!!ut,ee=!!E.aoMap,fe=!!E.lightMap,re=!!E.bumpMap&&E.wireframe===!1,Ce=!!E.normalMap,He=!!E.displacementMap,dn=!!E.emissiveMap,Fe=!!E.metalnessMap,nn=!!E.roughnessMap,W=E.anisotropy>0,ze=E.clearcoat>0,Pe=E.dispersion>0,B=E.retroreflectivity>0,b=E.iridescence>0,j=E.sheen>0,lt=E.transmission>0,gt=W&&!!E.anisotropyMap,Rt=ze&&!!E.clearcoatMap,Lt=ze&&!!E.clearcoatNormalMap,_t=ze&&!!E.clearcoatRoughnessMap,St=b&&!!E.iridescenceMap,wt=b&&!!E.iridescenceThicknessMap,Xt=j&&!!E.sheenColorMap,Bt=j&&!!E.sheenRoughnessMap,Nt=!!E.specularMap,te=!!E.specularColorMap,ne=!!E.specularIntensityMap,ue=lt&&!!E.transmissionMap,X=lt&&!!E.thicknessMap,Ct=!!E.gradientMap,Mt=!!E.alphaMap,Dt=E.alphaTest>0,Gt=!!E.alphaHash,bt=!!E.extensions;let $t=aa;E.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&($t=r.toneMapping);const Zt={shaderID:dt,shaderType:E.type,shaderName:E.name,vertexShader:Tt,fragmentShader:Ut,defines:E.defines,customVertexShaderID:Ht,customFragmentShaderID:it,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:g,batching:zt,batchingColor:zt&&q._colorsTexture!==null,instancing:se,instancingColor:se&&q.instanceColor!==null,instancingMorph:se&&q.morphTexture!==null,outputColorSpace:vt===null?r.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:we.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:he,matcap:en,envMap:Jt,envMapMode:Jt&&ut.mapping,envMapCubeUVHeight:st,aoMap:ee,lightMap:fe,bumpMap:re,normalMap:Ce,displacementMap:He,emissiveMap:dn,normalMapObjectSpace:Ce&&E.normalMapType===my,normalMapTangentSpace:Ce&&E.normalMapType===vp,packedNormalMap:Ce&&E.normalMapType===vp&&VA(E.normalMap.format),metalnessMap:Fe,roughnessMap:nn,anisotropy:W,anisotropyMap:gt,clearcoat:ze,clearcoatMap:Rt,clearcoatNormalMap:Lt,clearcoatRoughnessMap:_t,dispersion:Pe,retroreflection:B,iridescence:b,iridescenceMap:St,iridescenceThicknessMap:wt,sheen:j,sheenColorMap:Xt,sheenRoughnessMap:Bt,specularMap:Nt,specularColorMap:te,specularIntensityMap:ne,transmission:lt,transmissionMap:ue,thicknessMap:X,gradientMap:Ct,opaque:E.transparent===!1&&E.blending===pl&&E.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Dt,alphaHash:Gt,combine:E.combine,mapUv:he&&T(E.map.channel),aoMapUv:ee&&T(E.aoMap.channel),lightMapUv:fe&&T(E.lightMap.channel),bumpMapUv:re&&T(E.bumpMap.channel),normalMapUv:Ce&&T(E.normalMap.channel),displacementMapUv:He&&T(E.displacementMap.channel),emissiveMapUv:dn&&T(E.emissiveMap.channel),metalnessMapUv:Fe&&T(E.metalnessMap.channel),roughnessMapUv:nn&&T(E.roughnessMap.channel),anisotropyMapUv:gt&&T(E.anisotropyMap.channel),clearcoatMapUv:Rt&&T(E.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&T(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&T(E.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&T(E.iridescenceMap.channel),iridescenceThicknessMapUv:wt&&T(E.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&T(E.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&T(E.sheenRoughnessMap.channel),specularMapUv:Nt&&T(E.specularMap.channel),specularColorMapUv:te&&T(E.specularColorMap.channel),specularIntensityMapUv:ne&&T(E.specularIntensityMap.channel),transmissionMapUv:ue&&T(E.transmissionMap.channel),thicknessMapUv:X&&T(E.thicknessMap.channel),alphaMapUv:Mt&&T(E.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Ce||W),vertexNormals:!!$.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!$.attributes.uv&&(he||Mt),fog:!!Z,useFog:E.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||$.attributes.normal===void 0&&Ce===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:At,skinning:q.isSkinnedMesh===!0,hasPositionAttribute:$.attributes.position!==void 0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:mt,numSunLights:O.sun.length,numDirLights:O.directional.length,numPointLights:O.point.length,numSpotLights:O.spot.length,numSpotLightMaps:O.spotLightMap.length,numRectAreaLights:O.rectArea.length,numHemiLights:O.hemi.length,numSunLightShadows:O.sunShadowMap.length,numDirLightShadows:O.directionalShadowMap.length,numPointLightShadows:O.pointShadowMap.length,numSpotLightShadows:O.spotShadowMap.length,numSpotLightShadowsWithMaps:O.numSpotLightShadowsWithMaps,numLightProbes:O.numLightProbes,numLightProbeGrids:ct.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&H.length>0,shadowMapType:r.shadowMap.type,toneMapping:$t,decodeVideoTexture:he&&E.map.isVideoTexture===!0&&we.getTransfer(E.map.colorSpace)===ke,decodeVideoTextureEmissive:dn&&E.emissiveMap.isVideoTexture===!0&&we.getTransfer(E.emissiveMap.colorSpace)===ke,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ta,flipSided:E.side===Yn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:bt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(bt&&E.extensions.multiDraw===!0||zt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Zt.vertexUv1s=m.has(1),Zt.vertexUv2s=m.has(2),Zt.vertexUv3s=m.has(3),m.clear(),Zt}function M(E){const O=[];if(E.shaderID?O.push(E.shaderID):(O.push(E.customVertexShaderID),O.push(E.customFragmentShaderID)),E.defines!==void 0)for(const H in E.defines)O.push(H),O.push(E.defines[H]);return E.isRawShaderMaterial===!1&&(S(O,E),P(O,E),O.push(r.outputColorSpace)),O.push(E.customProgramCacheKey),O.join()}function S(E,O){E.push(O.precision),E.push(O.outputColorSpace),E.push(O.envMapMode),E.push(O.envMapCubeUVHeight),E.push(O.mapUv),E.push(O.alphaMapUv),E.push(O.lightMapUv),E.push(O.aoMapUv),E.push(O.bumpMapUv),E.push(O.normalMapUv),E.push(O.displacementMapUv),E.push(O.emissiveMapUv),E.push(O.metalnessMapUv),E.push(O.roughnessMapUv),E.push(O.anisotropyMapUv),E.push(O.clearcoatMapUv),E.push(O.clearcoatNormalMapUv),E.push(O.clearcoatRoughnessMapUv),E.push(O.iridescenceMapUv),E.push(O.iridescenceThicknessMapUv),E.push(O.sheenColorMapUv),E.push(O.sheenRoughnessMapUv),E.push(O.specularMapUv),E.push(O.specularColorMapUv),E.push(O.specularIntensityMapUv),E.push(O.transmissionMapUv),E.push(O.thicknessMapUv),E.push(O.combine),E.push(O.fogExp2),E.push(O.sizeAttenuation),E.push(O.morphTargetsCount),E.push(O.morphAttributeCount),E.push(O.numSunLights),E.push(O.numDirLights),E.push(O.numPointLights),E.push(O.numSpotLights),E.push(O.numSpotLightMaps),E.push(O.numHemiLights),E.push(O.numRectAreaLights),E.push(O.numSunLightShadows),E.push(O.numDirLightShadows),E.push(O.numPointLightShadows),E.push(O.numSpotLightShadows),E.push(O.numSpotLightShadowsWithMaps),E.push(O.numLightProbes),E.push(O.shadowMapType),E.push(O.toneMapping),E.push(O.numClippingPlanes),E.push(O.numClipIntersection),E.push(O.depthPacking)}function P(E,O){f.disableAll(),O.instancing&&f.enable(0),O.instancingColor&&f.enable(1),O.instancingMorph&&f.enable(2),O.matcap&&f.enable(3),O.envMap&&f.enable(4),O.normalMapObjectSpace&&f.enable(5),O.normalMapTangentSpace&&f.enable(6),O.clearcoat&&f.enable(7),O.iridescence&&f.enable(8),O.alphaTest&&f.enable(9),O.vertexColors&&f.enable(10),O.vertexAlphas&&f.enable(11),O.vertexUv1s&&f.enable(12),O.vertexUv2s&&f.enable(13),O.vertexUv3s&&f.enable(14),O.vertexTangents&&f.enable(15),O.anisotropy&&f.enable(16),O.alphaHash&&f.enable(17),O.batching&&f.enable(18),O.dispersion&&f.enable(19),O.retroreflection&&f.enable(24),O.batchingColor&&f.enable(20),O.gradientMap&&f.enable(21),O.packedNormalMap&&f.enable(22),O.vertexNormals&&f.enable(23),E.push(f.mask),f.disableAll(),O.fog&&f.enable(0),O.useFog&&f.enable(1),O.flatShading&&f.enable(2),O.logarithmicDepthBuffer&&f.enable(3),O.reversedDepthBuffer&&f.enable(4),O.skinning&&f.enable(5),O.morphTargets&&f.enable(6),O.morphNormals&&f.enable(7),O.morphColors&&f.enable(8),O.premultipliedAlpha&&f.enable(9),O.shadowMapEnabled&&f.enable(10),O.doubleSided&&f.enable(11),O.flipSided&&f.enable(12),O.useDepthPacking&&f.enable(13),O.dithering&&f.enable(14),O.transmission&&f.enable(15),O.sheen&&f.enable(16),O.opaque&&f.enable(17),O.pointsUvs&&f.enable(18),O.decodeVideoTexture&&f.enable(19),O.decodeVideoTextureEmissive&&f.enable(20),O.alphaToCoverage&&f.enable(21),O.numLightProbeGrids>0&&f.enable(22),O.hasPositionAttribute&&f.enable(23),E.push(f.mask)}function I(E){const O=y[E.type];let H;if(O){const K=$i[O];H=vS.clone(K.uniforms)}else H=E.uniforms;return H}function D(E,O){let H=_.get(O);return H!==void 0?++H.usedTimes:(H=new FA(r,O,E,l),d.push(H),_.set(O,H)),H}function N(E){if(--E.usedTimes===0){const O=d.indexOf(E);d[O]=d[d.length-1],d.pop(),_.delete(E.cacheKey),E.destroy()}}function C(E){p.remove(E)}function R(){p.dispose()}return{getParameters:U,getProgramCacheKey:M,getUniforms:I,acquireProgram:D,releaseProgram:N,releaseShaderCache:C,programs:d,dispose:R}}function XA(){let r=new WeakMap;function t(f){return r.has(f)}function i(f){let p=r.get(f);return p===void 0&&(p={},r.set(f,p)),p}function s(f){r.delete(f)}function l(f,p,m){r.get(f)[p]=m}function c(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function WA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function Dv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Uv(){const r=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function f(g){let y=0;return g.isInstancedMesh&&(y+=2),g.isSkinnedMesh&&(y+=1),y}function p(g,y,T,U,M,S){let P=r[t];return P===void 0?(P={id:g.id,object:g,geometry:y,material:T,materialVariant:f(g),groupOrder:U,renderOrder:g.renderOrder,z:M,group:S},r[t]=P):(P.id=g.id,P.object=g,P.geometry=y,P.material=T,P.materialVariant=f(g),P.groupOrder=U,P.renderOrder=g.renderOrder,P.z=M,P.group=S),t++,P}function m(g,y,T,U,M,S,P){P.reversedDepth===!0&&(M=-M);const I=p(g,y,T,U,M,S);T.transmission>0?s.push(I):T.transparent===!0?l.push(I):i.push(I)}function d(g,y,T,U,M,S){const P=p(g,y,T,U,M,S);T.transmission>0?s.unshift(P):T.transparent===!0?l.unshift(P):i.unshift(P)}function _(g,y){i.length>1&&i.sort(g||WA),s.length>1&&s.sort(y||Dv),l.length>1&&l.sort(y||Dv)}function v(){for(let g=t,y=r.length;g<y;g++){const T=r[g];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:d,finish:v,sort:_}}function YA(){let r=new WeakMap;function t(s,l){const c=r.get(s);let f;return c===void 0?(f=new Uv,r.set(s,[f])):l>=c.length?(f=new Uv,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:t,dispose:i}}function qA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={direction:new Q,color:new le};break;case"SpotLight":i={position:new Q,direction:new Q,color:new le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new Q,color:new le,distance:0,decay:0};break;case"HemisphereLight":i={direction:new Q,skyColor:new le,groundColor:new le};break;case"RectAreaLight":i={color:new le,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return r[t.id]=i,i}}}function ZA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let KA=0;function QA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function JA(r){const t=new qA,i=ZA(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new Q);const l=new Q,c=new Je,f=new Je;function p(d){let _=0,v=0,g=0;for(let q=0;q<9;q++)s.probe[q].set(0,0,0);let y=0,T=0,U=0,M=0,S=0,P=0,I=0,D=0,N=0,C=0,R=0,E=0,O=0,H=0;d.sort(QA);for(let q=0,ct=d.length;q<ct;q++){const Z=d[q],$=Z.color,F=Z.intensity,G=Z.distance;let ut=null;if(Z.shadow&&Z.shadow.map&&(Z.shadow.map.texture.format===Ys?ut=Z.shadow.map.texture:ut=Z.shadow.map.depthTexture||Z.shadow.map.texture),Z.isAmbientLight)_+=$.r*F,v+=$.g*F,g+=$.b*F;else if(Z.isLightProbe){for(let st=0;st<9;st++)s.probe[st].addScaledVector(Z.sh.coefficients[st],F);H++}else if(Z.isSunLight){const st=t.get(Z);if(st.color.copy(Z.color).multiplyScalar(Z.intensity),Z.castShadow){const dt=Z.shadow,L=i.get(Z);L.shadowIntensity=dt.intensity,L.shadowBias=dt.bias,L.shadowNormalBias=dt.normalBias,L.shadowRadius=dt.radius,L.shadowMapSize.copy(dt.mapSize).multiply(dt.getFrameExtents()),s.sunShadow[T]=L,s.sunShadowMap[T]=ut;const tt=dt.getViewportCount();for(let mt=0;mt<tt;mt++)s.sunShadowMatrix[U+mt]=dt.getMatrix(mt),s.sunShadowCascade[U+mt]=dt._cascadeData[mt];U+=tt,T++}s.sun[y]=st,y++}else if(Z.isDirectionalLight){const st=t.get(Z);if(st.color.copy(Z.color).multiplyScalar(Z.intensity),Z.castShadow){const dt=Z.shadow,L=i.get(Z);L.shadowIntensity=dt.intensity,L.shadowBias=dt.bias,L.shadowNormalBias=dt.normalBias,L.shadowRadius=dt.radius,L.shadowMapSize=dt.mapSize,s.directionalShadow[M]=L,s.directionalShadowMap[M]=ut,s.directionalShadowMatrix[M]=Z.shadow.matrix,N++}s.directional[M]=st,M++}else if(Z.isSpotLight){const st=t.get(Z);st.position.setFromMatrixPosition(Z.matrixWorld),st.color.copy($).multiplyScalar(F),st.distance=G,st.coneCos=Math.cos(Z.angle),st.penumbraCos=Math.cos(Z.angle*(1-Z.penumbra)),st.decay=Z.decay,s.spot[P]=st;const dt=Z.shadow;if(Z.map&&(s.spotLightMap[E]=Z.map,E++,dt.updateMatrices(Z),Z.castShadow&&O++),s.spotLightMatrix[P]=dt.matrix,Z.castShadow){const L=i.get(Z);L.shadowIntensity=dt.intensity,L.shadowBias=dt.bias,L.shadowNormalBias=dt.normalBias,L.shadowRadius=dt.radius,L.shadowMapSize=dt.mapSize,s.spotShadow[P]=L,s.spotShadowMap[P]=ut,R++}P++}else if(Z.isRectAreaLight){const st=t.get(Z);st.color.copy($).multiplyScalar(F),st.halfWidth.set(Z.width*.5,0,0),st.halfHeight.set(0,Z.height*.5,0),s.rectArea[I]=st,I++}else if(Z.isPointLight){const st=t.get(Z);if(st.color.copy(Z.color).multiplyScalar(Z.intensity),st.distance=Z.distance,st.decay=Z.decay,Z.castShadow){const dt=Z.shadow,L=i.get(Z);L.shadowIntensity=dt.intensity,L.shadowBias=dt.bias,L.shadowNormalBias=dt.normalBias,L.shadowRadius=dt.radius,L.shadowMapSize=dt.mapSize,L.shadowCameraNear=dt.camera.near,L.shadowCameraFar=dt.camera.far,s.pointShadow[S]=L,s.pointShadowMap[S]=ut,s.pointShadowMatrix[S]=Z.shadow.matrix,C++}s.point[S]=st,S++}else if(Z.isHemisphereLight){const st=t.get(Z);st.skyColor.copy(Z.color).multiplyScalar(F),st.groundColor.copy(Z.groundColor).multiplyScalar(F),s.hemi[D]=st,D++}}I>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ft.LTC_FLOAT_1,s.rectAreaLTC2=Ft.LTC_FLOAT_2):(s.rectAreaLTC1=Ft.LTC_HALF_1,s.rectAreaLTC2=Ft.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=v,s.ambient[2]=g;const K=s.hash;(K.sunLength!==y||K.directionalLength!==M||K.pointLength!==S||K.spotLength!==P||K.rectAreaLength!==I||K.hemiLength!==D||K.numSunShadows!==T||K.numDirectionalShadows!==N||K.numPointShadows!==C||K.numSpotShadows!==R||K.numSpotMaps!==E||K.numLightProbes!==H)&&(s.sun.length=y,s.directional.length=M,s.spot.length=P,s.rectArea.length=I,s.point.length=S,s.hemi.length=D,s.sunShadow.length=T,s.sunShadowMap.length=T,s.sunShadowMatrix.length=U,s.sunShadowCascade.length=U,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.directionalShadowMatrix.length=N,s.pointShadow.length=C,s.pointShadowMap.length=C,s.pointShadowMatrix.length=C,s.spotShadow.length=R,s.spotShadowMap.length=R,s.spotLightMatrix.length=R+E-O,s.spotLightMap.length=E,s.numSpotLightShadowsWithMaps=O,s.numLightProbes=H,K.sunLength=y,K.directionalLength=M,K.pointLength=S,K.spotLength=P,K.rectAreaLength=I,K.hemiLength=D,K.numSunShadows=T,K.numDirectionalShadows=N,K.numPointShadows=C,K.numSpotShadows=R,K.numSpotMaps=E,K.numLightProbes=H,s.version=KA++)}function m(d,_){let v=0,g=0,y=0,T=0,U=0,M=0;const S=_.matrixWorldInverse;for(let P=0,I=d.length;P<I;P++){const D=d[P];if(D.isSunLight){const N=s.sun[v];N.direction.setFromMatrixPosition(D.matrixWorld),N.direction.transformDirection(S),v++}else if(D.isDirectionalLight){const N=s.directional[g];N.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(S),g++}else if(D.isSpotLight){const N=s.spot[T];N.position.setFromMatrixPosition(D.matrixWorld),N.position.applyMatrix4(S),N.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(S),T++}else if(D.isRectAreaLight){const N=s.rectArea[U];N.position.setFromMatrixPosition(D.matrixWorld),N.position.applyMatrix4(S),f.identity(),c.copy(D.matrixWorld),c.premultiply(S),f.extractRotation(c),N.halfWidth.set(D.width*.5,0,0),N.halfHeight.set(0,D.height*.5,0),N.halfWidth.applyMatrix4(f),N.halfHeight.applyMatrix4(f),U++}else if(D.isPointLight){const N=s.point[y];N.position.setFromMatrixPosition(D.matrixWorld),N.position.applyMatrix4(S),y++}else if(D.isHemisphereLight){const N=s.hemi[M];N.direction.setFromMatrixPosition(D.matrixWorld),N.direction.transformDirection(S),M++}}}return{setup:p,setupView:m,state:s}}function Lv(r){const t=new JA(r),i=[],s=[],l=[];function c(g){v.camera=g,i.length=0,s.length=0,l.length=0}function f(g){i.push(g)}function p(g){s.push(g)}function m(g){l.push(g)}function d(){t.setup(i)}function _(g){t.setupView(i,g)}const v={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:v,setupLights:d,setupLightsView:_,pushLight:f,pushShadow:p,pushLightProbeGrid:m}}function jA(r){let t=new WeakMap;function i(l,c=0){const f=t.get(l);let p;return f===void 0?(p=new Lv(r),t.set(l,[p])):c>=f.length?(p=new Lv(r),f.push(p)):p=f[c],p}function s(){t=new WeakMap}return{get:i,dispose:s}}const $A=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t2=`uniform sampler2D shadow_pass;
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
}`,e2=[new Q(1,0,0),new Q(-1,0,0),new Q(0,1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1)],n2=[new Q(0,-1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,-1,0),new Q(0,-1,0)],Nv=new Je,ll=new Q,Td=new Q;function i2(r,t,i){let s=new Fp;const l=new ae,c=new ae,f=new on,p=new u1,m=new f1,d={},_=i.maxTextureSize,v={[ms]:Yn,[Yn]:ms,[ta]:ta},g=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:$A,fragmentShader:t2}),y=g.clone();y.defines.HORIZONTAL_PASS=1;const T=new On;T.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const U=new gn(T,g),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dl;let S=this.type;this.render=function(C,R,E){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||C.length===0)return;this.type===YM&&(ce("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=dl);const O=r.getRenderTarget(),H=r.getActiveCubeFace(),K=r.getActiveMipmapLevel(),q=r.state;q.setBlending(Ua),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const ct=S!==this.type;ct&&R.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach($=>$.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,$=C.length;Z<$;Z++){const F=C[Z],G=F.shadow;if(G===void 0){ce("WebGLShadowMap:",F,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const ut=G.getFrameExtents();l.multiply(ut),c.copy(G.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/ut.x),l.x=c.x*ut.x,G.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/ut.y),l.y=c.y*ut.y,G.mapSize.y=c.y));const st=r.state.buffers.depth.getReversed();if(G.camera._reversedDepth=st,G.map===null||ct===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===ul){if(F.isPointLight){ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Oi(l.x,l.y,{format:Ys,type:ki,minFilter:Xn,magFilter:Xn,generateMipmaps:!1}),G.map.texture.name=F.name+".shadowMap",G.map.depthTexture=new yl(l.x,l.y,na),G.map.depthTexture.name=F.name+".shadowMapDepth",G.map.depthTexture.format=Na,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Cn,G.map.depthTexture.magFilter=Cn}else F.isPointLight?(G.map=new bS(l.x),G.map.depthTexture=new a1(l.x,sa)):(G.map=new Oi(l.x,l.y),G.map.depthTexture=new yl(l.x,l.y,sa)),G.map.depthTexture.name=F.name+".shadowMap",G.map.depthTexture.format=Na,this.type===dl?(G.map.depthTexture.compareFunction=st?Op:Np,G.map.depthTexture.minFilter=Xn,G.map.depthTexture.magFilter=Xn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Cn,G.map.depthTexture.magFilter=Cn);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==l.x||G.map.height!==l.y)&&G.map.setSize(l.x,l.y);const dt=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();F.isPointLight!==!0&&G.updateMatrices(F,E);for(let L=0;L<dt;L++){const tt=G.getCamera(L);if(F.isPointLight){const mt=G.camera,Tt=G.matrix,Ut=F.distance||mt.far;Ut!==mt.far&&(mt.far=Ut,mt.updateProjectionMatrix()),ll.setFromMatrixPosition(F.matrixWorld),mt.position.copy(ll),Td.copy(mt.position),Td.add(e2[L]),mt.up.copy(n2[L]),mt.lookAt(Td),mt.updateMatrixWorld(),Tt.makeTranslation(-ll.x,-ll.y,-ll.z),Nv.multiplyMatrices(mt.projectionMatrix,mt.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Nv,mt.coordinateSystem,mt.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,L),r.clear();else{L===0&&(r.setRenderTarget(G.map),r.clear());const mt=G.getViewport(L);f.set(c.x*mt.x,c.y*mt.y,c.x*mt.z,c.y*mt.w),q.viewport(f)}s=G.getFrustum(L),D(R,E,tt,F,this.type)}G.isPointLightShadow!==!0&&this.type===ul&&P(G,E),G.needsUpdate=!1}S=this.type,M.needsUpdate=!1,r.setRenderTarget(O,H,K)};function P(C,R){const E=t.update(U);g.defines.VSM_SAMPLES!==C.blurSamples&&(g.defines.VSM_SAMPLES=C.blurSamples,y.defines.VSM_SAMPLES=C.blurSamples,g.needsUpdate=!0,y.needsUpdate=!0),C.mapPass===null?C.mapPass=new Oi(l.x,l.y,{format:Ys,type:ki}):(C.mapPass.width!==C.map.width||C.mapPass.height!==C.map.height)&&C.mapPass.setSize(C.map.width,C.map.height),g.uniforms.shadow_pass.value=C.map.depthTexture,g.uniforms.resolution.value.set(C.map.width,C.map.height),g.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(R,null,E,g,U,null),y.uniforms.shadow_pass.value=C.mapPass.texture,y.uniforms.resolution.value.set(C.map.width,C.map.height),y.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(R,null,E,y,U,null)}function I(C,R,E,O){let H=null;const K=E.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(K!==void 0)H=K;else if(H=E.isPointLight===!0?m:p,r.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const q=H.uuid,ct=R.uuid;let Z=d[q];Z===void 0&&(Z={},d[q]=Z);let $=Z[ct];$===void 0&&($=H.clone(),Z[ct]=$,R.addEventListener("dispose",N)),H=$}if(H.visible=R.visible,H.wireframe=R.wireframe,O===ul?H.side=R.shadowSide!==null?R.shadowSide:R.side:H.side=R.shadowSide!==null?R.shadowSide:v[R.side],H.alphaMap=R.alphaMap,H.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,H.map=R.map,H.clipShadows=R.clipShadows,H.clippingPlanes=R.clippingPlanes,H.clipIntersection=R.clipIntersection,H.displacementMap=R.displacementMap,H.displacementScale=R.displacementScale,H.displacementBias=R.displacementBias,H.wireframeLinewidth=R.wireframeLinewidth,H.linewidth=R.linewidth,E.isPointLight===!0&&H.isMeshDistanceMaterial===!0){const q=r.properties.get(H);q.light=E}return H}function D(C,R,E,O,H){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&H===ul)&&(!C.frustumCulled||C.intersectsFrustum(s))){C.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,C.matrixWorld);const ct=t.update(C),Z=C.material;if(Array.isArray(Z)){const $=ct.groups;for(let F=0,G=$.length;F<G;F++){const ut=$[F],st=Z[ut.materialIndex];if(st&&st.visible){const dt=I(C,st,O,H);C.onBeforeShadow(r,C,R,E,ct,dt,ut),r.renderBufferDirect(E,null,ct,dt,C,ut),C.onAfterShadow(r,C,R,E,ct,dt,ut)}}}else if(Z.visible){const $=I(C,Z,O,H);C.onBeforeShadow(r,C,R,E,ct,$,null),r.renderBufferDirect(E,null,ct,$,C,null),C.onAfterShadow(r,C,R,E,ct,$,null)}}const q=C.children;for(let ct=0,Z=q.length;ct<Z;ct++)D(q[ct],R,E,O,H)}function N(C){C.target.removeEventListener("dispose",N);for(const E in d){const O=d[E],H=C.target.uuid;H in O&&(O[H].dispose(),delete O[H])}}}function a2(r,t){function i(){let X=!1;const Ct=new on;let Mt=null;const Dt=new on(0,0,0,0);return{setMask:function(Gt){Mt!==Gt&&!X&&(r.colorMask(Gt,Gt,Gt,Gt),Mt=Gt)},setLocked:function(Gt){X=Gt},setClear:function(Gt,bt,$t,Zt,We){We===!0&&(Gt*=Zt,bt*=Zt,$t*=Zt),Ct.set(Gt,bt,$t,Zt),Dt.equals(Ct)===!1&&(r.clearColor(Gt,bt,$t,Zt),Dt.copy(Ct))},reset:function(){X=!1,Mt=null,Dt.set(-1,0,0,0)}}}function s(){let X=!1,Ct=!1,Mt=null,Dt=null,Gt=null;return{setReversed:function(bt){if(Ct!==bt){const $t=t.get("EXT_clip_control");bt?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT),Ct=bt;const Zt=Gt;Gt=null,this.setClear(Zt)}},getReversed:function(){return Ct},setTest:function(bt){bt?vt(r.DEPTH_TEST):At(r.DEPTH_TEST)},setMask:function(bt){Mt!==bt&&!X&&(r.depthMask(bt),Mt=bt)},setFunc:function(bt){if(Ct&&(bt=Ay[bt]),Dt!==bt){switch(bt){case Nd:r.depthFunc(r.NEVER);break;case Od:r.depthFunc(r.ALWAYS);break;case Pd:r.depthFunc(r.LESS);break;case vl:r.depthFunc(r.LEQUAL);break;case Bd:r.depthFunc(r.EQUAL);break;case Id:r.depthFunc(r.GEQUAL);break;case Fd:r.depthFunc(r.GREATER);break;case zd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Dt=bt}},setLocked:function(bt){X=bt},setClear:function(bt){Gt!==bt&&(Gt=bt,Ct&&(bt=1-bt),r.clearDepth(bt))},reset:function(){X=!1,Mt=null,Dt=null,Gt=null,Ct=!1}}}function l(){let X=!1,Ct=null,Mt=null,Dt=null,Gt=null,bt=null,$t=null,Zt=null,We=null;return{setTest:function(De){X||(De?vt(r.STENCIL_TEST):At(r.STENCIL_TEST))},setMask:function(De){Ct!==De&&!X&&(r.stencilMask(De),Ct=De)},setFunc:function(De,$n,ci){(Mt!==De||Dt!==$n||Gt!==ci)&&(r.stencilFunc(De,$n,ci),Mt=De,Dt=$n,Gt=ci)},setOp:function(De,$n,ci){(bt!==De||$t!==$n||Zt!==ci)&&(r.stencilOp(De,$n,ci),bt=De,$t=$n,Zt=ci)},setLocked:function(De){X=De},setClear:function(De){We!==De&&(r.clearStencil(De),We=De)},reset:function(){X=!1,Ct=null,Mt=null,Dt=null,Gt=null,bt=null,$t=null,Zt=null,We=null}}}const c=new i,f=new s,p=new l,m=new WeakMap,d=new WeakMap;let _={},v={},g={},y=new WeakMap,T=[],U=null,M=!1,S=null,P=null,I=null,D=null,N=null,C=null,R=null,E=new le(0,0,0),O=0,H=!1,K=null,q=null,ct=null,Z=null,$=null;const F=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,ut=0;const st=r.getParameter(r.VERSION);st.indexOf("WebGL")!==-1?(ut=parseFloat(/^WebGL (\d)/.exec(st)[1]),G=ut>=1):st.indexOf("OpenGL ES")!==-1&&(ut=parseFloat(/^OpenGL ES (\d)/.exec(st)[1]),G=ut>=2);let dt=null,L={};const tt=r.getParameter(r.SCISSOR_BOX),mt=r.getParameter(r.VIEWPORT),Tt=new on().fromArray(tt),Ut=new on().fromArray(mt);function Ht(X,Ct,Mt,Dt){const Gt=new Uint8Array(4),bt=r.createTexture();r.bindTexture(X,bt),r.texParameteri(X,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(X,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let $t=0;$t<Mt;$t++)X===r.TEXTURE_3D||X===r.TEXTURE_2D_ARRAY?r.texImage3D(Ct,0,r.RGBA,1,1,Dt,0,r.RGBA,r.UNSIGNED_BYTE,Gt):r.texImage2D(Ct+$t,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Gt);return bt}const it={};it[r.TEXTURE_2D]=Ht(r.TEXTURE_2D,r.TEXTURE_2D,1),it[r.TEXTURE_CUBE_MAP]=Ht(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[r.TEXTURE_2D_ARRAY]=Ht(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),it[r.TEXTURE_3D]=Ht(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),p.setClear(0),vt(r.DEPTH_TEST),f.setFunc(vl),re(!1),Ce(L_),vt(r.CULL_FACE),ee(Ua);function vt(X){_[X]!==!0&&(r.enable(X),_[X]=!0)}function At(X){_[X]!==!1&&(r.disable(X),_[X]=!1)}function se(X,Ct){return g[X]!==Ct?(r.bindFramebuffer(X,Ct),g[X]=Ct,X===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Ct),X===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Ct),!0):!1}function zt(X,Ct){let Mt=T,Dt=!1;if(X){Mt=y.get(Ct),Mt===void 0&&(Mt=[],y.set(Ct,Mt));const Gt=X.textures;if(Mt.length!==Gt.length||Mt[0]!==r.COLOR_ATTACHMENT0){for(let bt=0,$t=Gt.length;bt<$t;bt++)Mt[bt]=r.COLOR_ATTACHMENT0+bt;Mt.length=Gt.length,Dt=!0}}else Mt[0]!==r.BACK&&(Mt[0]=r.BACK,Dt=!0);Dt&&r.drawBuffers(Mt)}function he(X){return U!==X?(r.useProgram(X),U=X,!0):!1}const en={[Zr]:r.FUNC_ADD,[ZM]:r.FUNC_SUBTRACT,[KM]:r.FUNC_REVERSE_SUBTRACT};en[QM]=r.MIN,en[JM]=r.MAX;const Jt={[jM]:r.ZERO,[$M]:r.ONE,[ty]:r.SRC_COLOR,[Vv]:r.SRC_ALPHA,[ry]:r.SRC_ALPHA_SATURATE,[ay]:r.DST_COLOR,[ny]:r.DST_ALPHA,[ey]:r.ONE_MINUS_SRC_COLOR,[kv]:r.ONE_MINUS_SRC_ALPHA,[sy]:r.ONE_MINUS_DST_COLOR,[iy]:r.ONE_MINUS_DST_ALPHA,[oy]:r.CONSTANT_COLOR,[ly]:r.ONE_MINUS_CONSTANT_COLOR,[cy]:r.CONSTANT_ALPHA,[uy]:r.ONE_MINUS_CONSTANT_ALPHA};function ee(X,Ct,Mt,Dt,Gt,bt,$t,Zt,We,De){if(X===Ua){M===!0&&(At(r.BLEND),M=!1);return}if(M===!1&&(vt(r.BLEND),M=!0),X!==qM){if(X!==S||De!==H){if((P!==Zr||N!==Zr)&&(r.blendEquation(r.FUNC_ADD),P=Zr,N=Zr),De)switch(X){case pl:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case _l:r.blendFunc(r.ONE,r.ONE);break;case N_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case O_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Le("WebGLState: Invalid blending: ",X);break}else switch(X){case pl:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case _l:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case N_:Le("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case O_:Le("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Le("WebGLState: Invalid blending: ",X);break}I=null,D=null,C=null,R=null,E.set(0,0,0),O=0,S=X,H=De}return}Gt=Gt||Ct,bt=bt||Mt,$t=$t||Dt,(Ct!==P||Gt!==N)&&(r.blendEquationSeparate(en[Ct],en[Gt]),P=Ct,N=Gt),(Mt!==I||Dt!==D||bt!==C||$t!==R)&&(r.blendFuncSeparate(Jt[Mt],Jt[Dt],Jt[bt],Jt[$t]),I=Mt,D=Dt,C=bt,R=$t),(Zt.equals(E)===!1||We!==O)&&(r.blendColor(Zt.r,Zt.g,Zt.b,We),E.copy(Zt),O=We),S=X,H=!1}function fe(X,Ct){X.side===ta?At(r.CULL_FACE):vt(r.CULL_FACE);let Mt=X.side===Yn;Ct&&(Mt=!Mt),re(Mt),X.blending===pl&&X.transparent===!1?ee(Ua):ee(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),f.setFunc(X.depthFunc),f.setTest(X.depthTest),f.setMask(X.depthWrite),c.setMask(X.colorWrite);const Dt=X.stencilWrite;p.setTest(Dt),Dt&&(p.setMask(X.stencilWriteMask),p.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),p.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),dn(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?vt(r.SAMPLE_ALPHA_TO_COVERAGE):At(r.SAMPLE_ALPHA_TO_COVERAGE)}function re(X){K!==X&&(X?r.frontFace(r.CW):r.frontFace(r.CCW),K=X)}function Ce(X){X!==XM?(vt(r.CULL_FACE),X!==q&&(X===L_?r.cullFace(r.BACK):X===WM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):At(r.CULL_FACE),q=X}function He(X){X!==ct&&(G&&r.lineWidth(X),ct=X)}function dn(X,Ct,Mt){X?(vt(r.POLYGON_OFFSET_FILL),(Z!==Ct||$!==Mt)&&(Z=Ct,$=Mt,f.getReversed()&&(Ct=-Ct),r.polygonOffset(Ct,Mt))):At(r.POLYGON_OFFSET_FILL)}function Fe(X){X?vt(r.SCISSOR_TEST):At(r.SCISSOR_TEST)}function nn(X){X===void 0&&(X=r.TEXTURE0+F-1),dt!==X&&(r.activeTexture(X),dt=X)}function W(X,Ct,Mt){Mt===void 0&&(dt===null?Mt=r.TEXTURE0+F-1:Mt=dt);let Dt=L[Mt];Dt===void 0&&(Dt={type:void 0,texture:void 0},L[Mt]=Dt),(Dt.type!==X||Dt.texture!==Ct)&&(dt!==Mt&&(r.activeTexture(Mt),dt=Mt),r.bindTexture(X,Ct||it[X]),Dt.type=X,Dt.texture=Ct)}function ze(){const X=L[dt];X!==void 0&&X.type!==void 0&&(r.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Pe(){try{r.compressedTexImage2D(...arguments)}catch(X){Le("WebGLState:",X)}}function B(){try{r.compressedTexImage3D(...arguments)}catch(X){Le("WebGLState:",X)}}function b(){try{r.texSubImage2D(...arguments)}catch(X){Le("WebGLState:",X)}}function j(){try{r.texSubImage3D(...arguments)}catch(X){Le("WebGLState:",X)}}function lt(){try{r.compressedTexSubImage2D(...arguments)}catch(X){Le("WebGLState:",X)}}function gt(){try{r.compressedTexSubImage3D(...arguments)}catch(X){Le("WebGLState:",X)}}function Rt(){try{r.texStorage2D(...arguments)}catch(X){Le("WebGLState:",X)}}function Lt(){try{r.texStorage3D(...arguments)}catch(X){Le("WebGLState:",X)}}function _t(){try{r.texImage2D(...arguments)}catch(X){Le("WebGLState:",X)}}function St(){try{r.texImage3D(...arguments)}catch(X){Le("WebGLState:",X)}}function wt(X){return v[X]!==void 0?v[X]:r.getParameter(X)}function Xt(X,Ct){v[X]!==Ct&&(r.pixelStorei(X,Ct),v[X]=Ct)}function Bt(X){Tt.equals(X)===!1&&(r.scissor(X.x,X.y,X.z,X.w),Tt.copy(X))}function Nt(X){Ut.equals(X)===!1&&(r.viewport(X.x,X.y,X.z,X.w),Ut.copy(X))}function te(X,Ct){let Mt=d.get(Ct);Mt===void 0&&(Mt=new WeakMap,d.set(Ct,Mt));let Dt=Mt.get(X);Dt===void 0&&(Dt=r.getUniformBlockIndex(Ct,X.name),Mt.set(X,Dt))}function ne(X,Ct){const Dt=d.get(Ct).get(X);m.get(Ct)!==Dt&&(r.uniformBlockBinding(Ct,Dt,X.__bindingPointIndex),m.set(Ct,Dt))}function ue(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),_={},v={},dt=null,L={},g={},y=new WeakMap,T=[],U=null,M=!1,S=null,P=null,I=null,D=null,N=null,C=null,R=null,E=new le(0,0,0),O=0,H=!1,K=null,q=null,ct=null,Z=null,$=null,Tt.set(0,0,r.canvas.width,r.canvas.height),Ut.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),p.reset()}return{buffers:{color:c,depth:f,stencil:p},enable:vt,disable:At,bindFramebuffer:se,drawBuffers:zt,useProgram:he,setBlending:ee,setMaterial:fe,setFlipSided:re,setCullFace:Ce,setLineWidth:He,setPolygonOffset:dn,setScissorTest:Fe,activeTexture:nn,bindTexture:W,unbindTexture:ze,compressedTexImage2D:Pe,compressedTexImage3D:B,texImage2D:_t,texImage3D:St,pixelStorei:Xt,getParameter:wt,updateUBOMapping:te,uniformBlockBinding:ne,texStorage2D:Rt,texStorage3D:Lt,texSubImage2D:b,texSubImage3D:j,compressedTexSubImage2D:lt,compressedTexSubImage3D:gt,scissor:Bt,viewport:Nt,reset:ue}}function s2(r,t,i,s,l,c,f){const p=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new ae,_=new WeakMap,v=new Set;let g;const y=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function U(B,b){return T?new OffscreenCanvas(B,b):bu("canvas")}function M(B,b,j){let lt=1;const gt=Pe(B);if((gt.width>j||gt.height>j)&&(lt=j/Math.max(gt.width,gt.height)),lt<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const Rt=Math.floor(lt*gt.width),Lt=Math.floor(lt*gt.height);g===void 0&&(g=U(Rt,Lt));const _t=b?U(Rt,Lt):g;return _t.width=Rt,_t.height=Lt,_t.getContext("2d").drawImage(B,0,0,Rt,Lt),ce("WebGLRenderer: Texture has been resized from ("+gt.width+"x"+gt.height+") to ("+Rt+"x"+Lt+")."),_t}else return"data"in B&&ce("WebGLRenderer: Image in DataTexture is too big ("+gt.width+"x"+gt.height+")."),B;return B}function S(B){return B.generateMipmaps}function P(B){r.generateMipmap(B)}function I(B){return B.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:B.isWebGL3DRenderTarget?r.TEXTURE_3D:B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function D(B,b,j,lt,gt,Rt=!1){if(B!==null){if(r[B]!==void 0)return r[B];ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let Lt;lt&&(Lt=t.get("EXT_texture_norm16"),Lt||ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let _t=b;if(b===r.RED&&(j===r.FLOAT&&(_t=r.R32F),j===r.HALF_FLOAT&&(_t=r.R16F),j===r.UNSIGNED_BYTE&&(_t=r.R8),j===r.UNSIGNED_SHORT&&Lt&&(_t=Lt.R16_EXT),j===r.SHORT&&Lt&&(_t=Lt.R16_SNORM_EXT)),b===r.RED_INTEGER&&(j===r.UNSIGNED_BYTE&&(_t=r.R8UI),j===r.UNSIGNED_SHORT&&(_t=r.R16UI),j===r.UNSIGNED_INT&&(_t=r.R32UI),j===r.BYTE&&(_t=r.R8I),j===r.SHORT&&(_t=r.R16I),j===r.INT&&(_t=r.R32I)),b===r.RG&&(j===r.FLOAT&&(_t=r.RG32F),j===r.HALF_FLOAT&&(_t=r.RG16F),j===r.UNSIGNED_BYTE&&(_t=r.RG8),j===r.UNSIGNED_SHORT&&Lt&&(_t=Lt.RG16_EXT),j===r.SHORT&&Lt&&(_t=Lt.RG16_SNORM_EXT)),b===r.RG_INTEGER&&(j===r.UNSIGNED_BYTE&&(_t=r.RG8UI),j===r.UNSIGNED_SHORT&&(_t=r.RG16UI),j===r.UNSIGNED_INT&&(_t=r.RG32UI),j===r.BYTE&&(_t=r.RG8I),j===r.SHORT&&(_t=r.RG16I),j===r.INT&&(_t=r.RG32I)),b===r.RGB_INTEGER&&(j===r.UNSIGNED_BYTE&&(_t=r.RGB8UI),j===r.UNSIGNED_SHORT&&(_t=r.RGB16UI),j===r.UNSIGNED_INT&&(_t=r.RGB32UI),j===r.BYTE&&(_t=r.RGB8I),j===r.SHORT&&(_t=r.RGB16I),j===r.INT&&(_t=r.RGB32I)),b===r.RGBA_INTEGER&&(j===r.UNSIGNED_BYTE&&(_t=r.RGBA8UI),j===r.UNSIGNED_SHORT&&(_t=r.RGBA16UI),j===r.UNSIGNED_INT&&(_t=r.RGBA32UI),j===r.BYTE&&(_t=r.RGBA8I),j===r.SHORT&&(_t=r.RGBA16I),j===r.INT&&(_t=r.RGBA32I)),b===r.RGB&&(j===r.UNSIGNED_SHORT&&Lt&&(_t=Lt.RGB16_EXT),j===r.SHORT&&Lt&&(_t=Lt.RGB16_SNORM_EXT),j===r.UNSIGNED_INT_5_9_9_9_REV&&(_t=r.RGB9_E5),j===r.UNSIGNED_INT_10F_11F_11F_REV&&(_t=r.R11F_G11F_B10F)),b===r.RGBA){const St=Rt?Eu:we.getTransfer(gt);j===r.FLOAT&&(_t=r.RGBA32F),j===r.HALF_FLOAT&&(_t=r.RGBA16F),j===r.UNSIGNED_BYTE&&(_t=St===ke?r.SRGB8_ALPHA8:r.RGBA8),j===r.UNSIGNED_SHORT&&Lt&&(_t=Lt.RGBA16_EXT),j===r.SHORT&&Lt&&(_t=Lt.RGBA16_SNORM_EXT),j===r.UNSIGNED_SHORT_4_4_4_4&&(_t=r.RGBA4),j===r.UNSIGNED_SHORT_5_5_5_1&&(_t=r.RGB5_A1)}return(_t===r.R16F||_t===r.R32F||_t===r.RG16F||_t===r.RG32F||_t===r.RGBA16F||_t===r.RGBA32F)&&t.get("EXT_color_buffer_float"),_t}function N(B,b){let j;return B?b===null||b===sa||b===xl?j=r.DEPTH24_STENCIL8:b===na?j=r.DEPTH32F_STENCIL8:b===Sl&&(j=r.DEPTH24_STENCIL8,ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===sa||b===xl?j=r.DEPTH_COMPONENT24:b===na?j=r.DEPTH_COMPONENT32F:b===Sl&&(j=r.DEPTH_COMPONENT16),j}function C(B,b){return S(B)===!0||B.isFramebufferTexture&&B.minFilter!==Cn&&B.minFilter!==Xn?Math.log2(Math.max(b.width,b.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?b.mipmaps.length:1}function R(B){const b=B.target;b.removeEventListener("dispose",R),O(b),b.isVideoTexture&&_.delete(b),b.isHTMLTexture&&v.delete(b)}function E(B){const b=B.target;b.removeEventListener("dispose",E),K(b)}function O(B){const b=s.get(B);if(b.__webglInit===void 0)return;const j=B.source,lt=y.get(j);if(lt){const gt=lt[b.__cacheKey];gt.usedTimes--,gt.usedTimes===0&&H(B),Object.keys(lt).length===0&&y.delete(j)}s.remove(B)}function H(B){const b=s.get(B);r.deleteTexture(b.__webglTexture);const j=B.source,lt=y.get(j);delete lt[b.__cacheKey],f.memory.textures--}function K(B){const b=s.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),s.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(b.__webglFramebuffer[lt]))for(let gt=0;gt<b.__webglFramebuffer[lt].length;gt++)r.deleteFramebuffer(b.__webglFramebuffer[lt][gt]);else r.deleteFramebuffer(b.__webglFramebuffer[lt]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[lt])}else{if(Array.isArray(b.__webglFramebuffer))for(let lt=0;lt<b.__webglFramebuffer.length;lt++)r.deleteFramebuffer(b.__webglFramebuffer[lt]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let lt=0;lt<b.__webglColorRenderbuffer.length;lt++)b.__webglColorRenderbuffer[lt]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[lt]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const j=B.textures;for(let lt=0,gt=j.length;lt<gt;lt++){const Rt=s.get(j[lt]);Rt.__webglTexture&&(r.deleteTexture(Rt.__webglTexture),f.memory.textures--),s.remove(j[lt])}s.remove(B)}let q=0;function ct(){q=0}function Z(){return q}function $(B){q=B}function F(){const B=q;return B>=l.maxTextures&&ce("WebGLTextures: Trying to use "+(B+1)+" texture units while this GPU supports only "+l.maxTextures),q+=1,B}function G(B){const b=[];return b.push(B.wrapS),b.push(B.wrapT),b.push(B.wrapR||0),b.push(B.magFilter),b.push(B.minFilter),b.push(B.anisotropy),b.push(B.internalFormat),b.push(B.format),b.push(B.type),b.push(B.generateMipmaps),b.push(B.premultiplyAlpha),b.push(B.flipY),b.push(B.unpackAlignment),b.push(B.colorSpace),b.join()}function ut(B,b){const j=s.get(B);if(B.isVideoTexture&&W(B),B.isRenderTargetTexture===!1&&B.isExternalTexture!==!0&&B.version>0&&j.__version!==B.version){const lt=B.image;if(lt===null)ce("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)ce("WebGLRenderer: Texture marked for update but image is incomplete");else{At(j,B,b);return}}else B.isExternalTexture&&(j.__webglTexture=B.sourceTexture?B.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,j.__webglTexture,r.TEXTURE0+b)}function st(B,b){const j=s.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&j.__version!==B.version){At(j,B,b);return}else B.isExternalTexture&&(j.__webglTexture=B.sourceTexture?B.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,j.__webglTexture,r.TEXTURE0+b)}function dt(B,b){const j=s.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&j.__version!==B.version){At(j,B,b);return}i.bindTexture(r.TEXTURE_3D,j.__webglTexture,r.TEXTURE0+b)}function L(B,b){const j=s.get(B);if(B.isCubeDepthTexture!==!0&&B.version>0&&j.__version!==B.version){se(j,B,b);return}i.bindTexture(r.TEXTURE_CUBE_MAP,j.__webglTexture,r.TEXTURE0+b)}const tt={[Hd]:r.REPEAT,[Da]:r.CLAMP_TO_EDGE,[Gd]:r.MIRRORED_REPEAT},mt={[Cn]:r.NEAREST,[dy]:r.NEAREST_MIPMAP_NEAREST,[Bc]:r.NEAREST_MIPMAP_LINEAR,[Xn]:r.LINEAR,[Zh]:r.LINEAR_MIPMAP_NEAREST,[ks]:r.LINEAR_MIPMAP_LINEAR},Tt={[_y]:r.NEVER,[yy]:r.ALWAYS,[vy]:r.LESS,[Np]:r.LEQUAL,[Sy]:r.EQUAL,[Op]:r.GEQUAL,[xy]:r.GREATER,[My]:r.NOTEQUAL};function Ut(B,b){if(b.type===na&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Xn||b.magFilter===Zh||b.magFilter===Bc||b.magFilter===ks||b.minFilter===Xn||b.minFilter===Zh||b.minFilter===Bc||b.minFilter===ks)&&ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(B,r.TEXTURE_WRAP_S,tt[b.wrapS]),r.texParameteri(B,r.TEXTURE_WRAP_T,tt[b.wrapT]),(B===r.TEXTURE_3D||B===r.TEXTURE_2D_ARRAY)&&r.texParameteri(B,r.TEXTURE_WRAP_R,tt[b.wrapR]),r.texParameteri(B,r.TEXTURE_MAG_FILTER,mt[b.magFilter]),r.texParameteri(B,r.TEXTURE_MIN_FILTER,mt[b.minFilter]),b.compareFunction&&(r.texParameteri(B,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(B,r.TEXTURE_COMPARE_FUNC,Tt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Cn||b.minFilter!==Bc&&b.minFilter!==ks||b.type===na&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||s.get(b).__currentAnisotropy){const j=t.get("EXT_texture_filter_anisotropic");r.texParameterf(B,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,l.getMaxAnisotropy())),s.get(b).__currentAnisotropy=b.anisotropy}}}function Ht(B,b){let j=!1;B.__webglInit===void 0&&(B.__webglInit=!0,b.addEventListener("dispose",R));const lt=b.source;let gt=y.get(lt);gt===void 0&&(gt={},y.set(lt,gt));const Rt=G(b);if(Rt!==B.__cacheKey){gt[Rt]===void 0&&(gt[Rt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,j=!0),gt[Rt].usedTimes++;const Lt=gt[B.__cacheKey];Lt!==void 0&&(gt[B.__cacheKey].usedTimes--,Lt.usedTimes===0&&H(b)),B.__cacheKey=Rt,B.__webglTexture=gt[Rt].texture}return j}function it(B,b,j){return Math.floor(Math.floor(B/j)/b)}function vt(B,b,j,lt){const Rt=B.updateRanges;if(Rt.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,b.width,b.height,j,lt,b.data);else{Rt.sort((Xt,Bt)=>Xt.start-Bt.start);let Lt=0;for(let Xt=1;Xt<Rt.length;Xt++){const Bt=Rt[Lt],Nt=Rt[Xt],te=Bt.start+Bt.count,ne=it(Nt.start,b.width,4),ue=it(Bt.start,b.width,4);Nt.start<=te+1&&ne===ue&&it(Nt.start+Nt.count-1,b.width,4)===ne?Bt.count=Math.max(Bt.count,Nt.start+Nt.count-Bt.start):(++Lt,Rt[Lt]=Nt)}Rt.length=Lt+1;const _t=i.getParameter(r.UNPACK_ROW_LENGTH),St=i.getParameter(r.UNPACK_SKIP_PIXELS),wt=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,b.width);for(let Xt=0,Bt=Rt.length;Xt<Bt;Xt++){const Nt=Rt[Xt],te=Math.floor(Nt.start/4),ne=Math.ceil(Nt.count/4),ue=te%b.width,X=Math.floor(te/b.width),Ct=ne,Mt=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,ue),i.pixelStorei(r.UNPACK_SKIP_ROWS,X),i.texSubImage2D(r.TEXTURE_2D,0,ue,X,Ct,Mt,j,lt,b.data)}B.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,_t),i.pixelStorei(r.UNPACK_SKIP_PIXELS,St),i.pixelStorei(r.UNPACK_SKIP_ROWS,wt)}}function At(B,b,j){let lt=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(lt=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(lt=r.TEXTURE_3D);const gt=Ht(B,b),Rt=b.source;i.bindTexture(lt,B.__webglTexture,r.TEXTURE0+j);const Lt=s.get(Rt);if(Rt.version!==Lt.__version||gt===!0){if(i.activeTexture(r.TEXTURE0+j),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const Mt=we.getPrimaries(we.workingColorSpace),Dt=b.colorSpace===ds?null:we.getPrimaries(b.colorSpace),Gt=b.colorSpace===ds||Mt===Dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt)}i.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment);let St=M(b.image,!1,l.maxTextureSize);St=ze(b,St);const wt=c.convert(b.format,b.colorSpace),Xt=c.convert(b.type);let Bt=D(b.internalFormat,wt,Xt,b.normalized,b.colorSpace,b.isVideoTexture);Ut(lt,b);let Nt;const te=b.mipmaps,ne=b.isVideoTexture!==!0,ue=Lt.__version===void 0||gt===!0,X=Rt.dataReady,Ct=C(b,St);if(b.isDepthTexture)Bt=N(b.format===Xs,b.type),ue&&(ne?i.texStorage2D(r.TEXTURE_2D,1,Bt,St.width,St.height):i.texImage2D(r.TEXTURE_2D,0,Bt,St.width,St.height,0,wt,Xt,null));else if(b.isDataTexture)if(te.length>0){ne&&ue&&i.texStorage2D(r.TEXTURE_2D,Ct,Bt,te[0].width,te[0].height);for(let Mt=0,Dt=te.length;Mt<Dt;Mt++)Nt=te[Mt],ne?X&&i.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Nt.width,Nt.height,wt,Xt,Nt.data):i.texImage2D(r.TEXTURE_2D,Mt,Bt,Nt.width,Nt.height,0,wt,Xt,Nt.data);b.generateMipmaps=!1}else ne?(ue&&i.texStorage2D(r.TEXTURE_2D,Ct,Bt,St.width,St.height),X&&vt(b,St,wt,Xt)):i.texImage2D(r.TEXTURE_2D,0,Bt,St.width,St.height,0,wt,Xt,St.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){ne&&ue&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ct,Bt,te[0].width,te[0].height,St.depth);for(let Mt=0,Dt=te.length;Mt<Dt;Mt++)if(Nt=te[Mt],b.format!==Vi)if(wt!==null)if(ne){if(X)if(b.layerUpdates.size>0){const Gt=fv(Nt.width,Nt.height,b.format,b.type);for(const bt of b.layerUpdates){const $t=Nt.data.subarray(bt*Gt/Nt.data.BYTES_PER_ELEMENT,(bt+1)*Gt/Nt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,bt,Nt.width,Nt.height,1,wt,$t)}}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Nt.width,Nt.height,St.depth,wt,Nt.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Mt,Bt,Nt.width,Nt.height,St.depth,0,Nt.data,0,0);else ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ne?X&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Nt.width,Nt.height,St.depth,wt,Xt,Nt.data):i.texImage3D(r.TEXTURE_2D_ARRAY,Mt,Bt,Nt.width,Nt.height,St.depth,0,wt,Xt,Nt.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{ne&&ue&&i.texStorage2D(r.TEXTURE_2D,Ct,Bt,te[0].width,te[0].height);for(let Mt=0,Dt=te.length;Mt<Dt;Mt++)Nt=te[Mt],b.format!==Vi?wt!==null?ne?X&&i.compressedTexSubImage2D(r.TEXTURE_2D,Mt,0,0,Nt.width,Nt.height,wt,Nt.data):i.compressedTexImage2D(r.TEXTURE_2D,Mt,Bt,Nt.width,Nt.height,0,Nt.data):ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?X&&i.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Nt.width,Nt.height,wt,Xt,Nt.data):i.texImage2D(r.TEXTURE_2D,Mt,Bt,Nt.width,Nt.height,0,wt,Xt,Nt.data)}else if(b.isDataArrayTexture)if(ne){if(ue&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ct,Bt,St.width,St.height,St.depth),X)if(b.layerUpdates.size>0){const Mt=fv(St.width,St.height,b.format,b.type);for(const Dt of b.layerUpdates){const Gt=St.data.subarray(Dt*Mt/St.data.BYTES_PER_ELEMENT,(Dt+1)*Mt/St.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Dt,St.width,St.height,1,wt,Xt,Gt)}b.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,St.width,St.height,St.depth,wt,Xt,St.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Bt,St.width,St.height,St.depth,0,wt,Xt,St.data);else if(b.isData3DTexture)ne?(ue&&i.texStorage3D(r.TEXTURE_3D,Ct,Bt,St.width,St.height,St.depth),X&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,St.width,St.height,St.depth,wt,Xt,St.data)):i.texImage3D(r.TEXTURE_3D,0,Bt,St.width,St.height,St.depth,0,wt,Xt,St.data);else if(b.isFramebufferTexture){if(ue)if(ne)i.texStorage2D(r.TEXTURE_2D,Ct,Bt,St.width,St.height);else{let Mt=St.width,Dt=St.height;for(let Gt=0;Gt<Ct;Gt++)i.texImage2D(r.TEXTURE_2D,Gt,Bt,Mt,Dt,0,wt,Xt,null),Mt>>=1,Dt>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in r){const Mt=r.canvas;if(Mt.hasAttribute("layoutsubtree")||Mt.setAttribute("layoutsubtree","true"),St.parentNode!==Mt){Mt.appendChild(St),v.add(b),Mt.onpaint=Dt=>{const Gt=Dt.changedElements;for(const bt of v)Gt.includes(bt.image)&&(bt.needsUpdate=!0)},Mt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,St);else{const Gt=r.RGBA,bt=r.RGBA,$t=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Gt,bt,$t,St)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(te.length>0){if(ne&&ue){const Mt=Pe(te[0]);i.texStorage2D(r.TEXTURE_2D,Ct,Bt,Mt.width,Mt.height)}for(let Mt=0,Dt=te.length;Mt<Dt;Mt++)Nt=te[Mt],ne?X&&i.texSubImage2D(r.TEXTURE_2D,Mt,0,0,wt,Xt,Nt):i.texImage2D(r.TEXTURE_2D,Mt,Bt,wt,Xt,Nt);b.generateMipmaps=!1}else if(ne){if(ue){const Mt=Pe(St);i.texStorage2D(r.TEXTURE_2D,Ct,Bt,Mt.width,Mt.height)}X&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,wt,Xt,St)}else i.texImage2D(r.TEXTURE_2D,0,Bt,wt,Xt,St);S(b)&&P(lt),Lt.__version=Rt.version,b.onUpdate&&b.onUpdate(b)}B.__version=b.version}function se(B,b,j){if(b.image.length!==6)return;const lt=Ht(B,b),gt=b.source;i.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+j);const Rt=s.get(gt);if(gt.version!==Rt.__version||lt===!0){i.activeTexture(r.TEXTURE0+j);const Lt=we.getPrimaries(we.workingColorSpace),_t=b.colorSpace===ds?null:we.getPrimaries(b.colorSpace),St=b.colorSpace===ds||Lt===_t?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const wt=b.isCompressedTexture||b.image[0].isCompressedTexture,Xt=b.image[0]&&b.image[0].isDataTexture,Bt=[];for(let bt=0;bt<6;bt++)!wt&&!Xt?Bt[bt]=M(b.image[bt],!0,l.maxCubemapSize):Bt[bt]=Xt?b.image[bt].image:b.image[bt],Bt[bt]=ze(b,Bt[bt]);const Nt=Bt[0],te=c.convert(b.format,b.colorSpace),ne=c.convert(b.type),ue=D(b.internalFormat,te,ne,b.normalized,b.colorSpace),X=b.isVideoTexture!==!0,Ct=Rt.__version===void 0||lt===!0,Mt=gt.dataReady;let Dt=C(b,Nt);Ut(r.TEXTURE_CUBE_MAP,b);let Gt;if(wt){X&&Ct&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Dt,ue,Nt.width,Nt.height);for(let bt=0;bt<6;bt++){Gt=Bt[bt].mipmaps;for(let $t=0;$t<Gt.length;$t++){const Zt=Gt[$t];b.format!==Vi?te!==null?X?Mt&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,$t,0,0,Zt.width,Zt.height,te,Zt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,$t,ue,Zt.width,Zt.height,0,Zt.data):ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?Mt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,$t,0,0,Zt.width,Zt.height,te,ne,Zt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,$t,ue,Zt.width,Zt.height,0,te,ne,Zt.data)}}}else{if(Gt=b.mipmaps,X&&Ct){Gt.length>0&&Dt++;const bt=Pe(Bt[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Dt,ue,bt.width,bt.height)}for(let bt=0;bt<6;bt++)if(Xt){X?Mt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,Bt[bt].width,Bt[bt].height,te,ne,Bt[bt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,ue,Bt[bt].width,Bt[bt].height,0,te,ne,Bt[bt].data);for(let $t=0;$t<Gt.length;$t++){const We=Gt[$t].image[bt].image;X?Mt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,$t+1,0,0,We.width,We.height,te,ne,We.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,$t+1,ue,We.width,We.height,0,te,ne,We.data)}}else{X?Mt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,te,ne,Bt[bt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,ue,te,ne,Bt[bt]);for(let $t=0;$t<Gt.length;$t++){const Zt=Gt[$t];X?Mt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,$t+1,0,0,te,ne,Zt.image[bt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+bt,$t+1,ue,te,ne,Zt.image[bt])}}}S(b)&&P(r.TEXTURE_CUBE_MAP),Rt.__version=gt.version,b.onUpdate&&b.onUpdate(b)}B.__version=b.version}function zt(B,b,j,lt,gt,Rt){const Lt=c.convert(j.format,j.colorSpace),_t=c.convert(j.type),St=D(j.internalFormat,Lt,_t,j.normalized,j.colorSpace),wt=s.get(b),Xt=s.get(j);if(Xt.__renderTarget=b,!wt.__hasExternalTextures){const Bt=Math.max(1,b.width>>Rt),Nt=Math.max(1,b.height>>Rt);gt===r.TEXTURE_3D||gt===r.TEXTURE_2D_ARRAY?i.texImage3D(gt,Rt,St,Bt,Nt,b.depth,0,Lt,_t,null):i.texImage2D(gt,Rt,St,Bt,Nt,0,Lt,_t,null)}i.bindFramebuffer(r.FRAMEBUFFER,B),nn(b)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,lt,gt,Xt.__webglTexture,0,Fe(b)):(gt===r.TEXTURE_2D||gt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&gt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,lt,gt,Xt.__webglTexture,Rt),i.bindFramebuffer(r.FRAMEBUFFER,null)}function he(B,b,j){if(r.bindRenderbuffer(r.RENDERBUFFER,B),b.depthBuffer){const lt=b.depthTexture,gt=lt&&lt.isDepthTexture?lt.type:null,Rt=N(b.stencilBuffer,gt),Lt=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;nn(b)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Fe(b),Rt,b.width,b.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,Fe(b),Rt,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,Rt,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Lt,r.RENDERBUFFER,B)}else{const lt=b.textures;for(let gt=0;gt<lt.length;gt++){const Rt=lt[gt],Lt=c.convert(Rt.format,Rt.colorSpace),_t=c.convert(Rt.type),St=D(Rt.internalFormat,Lt,_t,Rt.normalized,Rt.colorSpace);nn(b)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Fe(b),St,b.width,b.height):j?r.renderbufferStorageMultisample(r.RENDERBUFFER,Fe(b),St,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,St,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function en(B,b,j){const lt=b.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,B),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const gt=s.get(b.depthTexture);if(gt.__renderTarget=b,(!gt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),lt){if(gt.__webglInit===void 0&&(gt.__webglInit=!0,b.depthTexture.addEventListener("dispose",R)),gt.__webglTexture===void 0){gt.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,gt.__webglTexture),Ut(r.TEXTURE_CUBE_MAP,b.depthTexture);const wt=c.convert(b.depthTexture.format),Xt=c.convert(b.depthTexture.type);let Bt;b.depthTexture.format===Na?Bt=r.DEPTH_COMPONENT24:b.depthTexture.format===Xs&&(Bt=r.DEPTH24_STENCIL8);for(let Nt=0;Nt<6;Nt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Nt,0,Bt,b.width,b.height,0,wt,Xt,null)}}else ut(b.depthTexture,0);const Rt=gt.__webglTexture,Lt=Fe(b),_t=lt?r.TEXTURE_CUBE_MAP_POSITIVE_X+j:r.TEXTURE_2D,St=b.depthTexture.format===Xs?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(b.depthTexture.format===Na)nn(b)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,St,_t,Rt,0,Lt):r.framebufferTexture2D(r.FRAMEBUFFER,St,_t,Rt,0);else if(b.depthTexture.format===Xs)nn(b)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,St,_t,Rt,0,Lt):r.framebufferTexture2D(r.FRAMEBUFFER,St,_t,Rt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Jt(B){const b=s.get(B),j=B.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==B.depthTexture){const lt=B.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),lt){const gt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,lt.removeEventListener("dispose",gt)};lt.addEventListener("dispose",gt),b.__depthDisposeCallback=gt}b.__boundDepthTexture=lt}if(B.depthTexture&&!b.__autoAllocateDepthBuffer)if(j)for(let lt=0;lt<6;lt++)en(b.__webglFramebuffer[lt],B,lt);else{const lt=B.texture.mipmaps;lt&&lt.length>0?en(b.__webglFramebuffer[0],B,0):en(b.__webglFramebuffer,B,0)}else if(j){b.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(i.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[lt]),b.__webglDepthbuffer[lt]===void 0)b.__webglDepthbuffer[lt]=r.createRenderbuffer(),he(b.__webglDepthbuffer[lt],B,!1);else{const gt=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Rt=b.__webglDepthbuffer[lt];r.bindRenderbuffer(r.RENDERBUFFER,Rt),r.framebufferRenderbuffer(r.FRAMEBUFFER,gt,r.RENDERBUFFER,Rt)}}else{const lt=B.texture.mipmaps;if(lt&&lt.length>0?i.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),he(b.__webglDepthbuffer,B,!1);else{const gt=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Rt=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Rt),r.framebufferRenderbuffer(r.FRAMEBUFFER,gt,r.RENDERBUFFER,Rt)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function ee(B,b,j){const lt=s.get(B);b!==void 0&&zt(lt.__webglFramebuffer,B,B.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),j!==void 0&&Jt(B)}function fe(B){const b=B.texture,j=s.get(B),lt=s.get(b);B.addEventListener("dispose",E);const gt=B.textures,Rt=B.isWebGLCubeRenderTarget===!0,Lt=gt.length>1;if(Lt||(lt.__webglTexture===void 0&&(lt.__webglTexture=r.createTexture()),lt.__version=b.version,f.memory.textures++),Rt){j.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(b.mipmaps&&b.mipmaps.length>0){j.__webglFramebuffer[_t]=[];for(let St=0;St<b.mipmaps.length;St++)j.__webglFramebuffer[_t][St]=r.createFramebuffer()}else j.__webglFramebuffer[_t]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){j.__webglFramebuffer=[];for(let _t=0;_t<b.mipmaps.length;_t++)j.__webglFramebuffer[_t]=r.createFramebuffer()}else j.__webglFramebuffer=r.createFramebuffer();if(Lt)for(let _t=0,St=gt.length;_t<St;_t++){const wt=s.get(gt[_t]);wt.__webglTexture===void 0&&(wt.__webglTexture=r.createTexture(),f.memory.textures++)}if(B.samples>0&&nn(B)===!1){j.__webglMultisampledFramebuffer=r.createFramebuffer(),j.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let _t=0;_t<gt.length;_t++){const St=gt[_t];j.__webglColorRenderbuffer[_t]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,j.__webglColorRenderbuffer[_t]);const wt=c.convert(St.format,St.colorSpace),Xt=c.convert(St.type),Bt=D(St.internalFormat,wt,Xt,St.normalized,St.colorSpace,B.isXRRenderTarget===!0),Nt=Fe(B);r.renderbufferStorageMultisample(r.RENDERBUFFER,Nt,Bt,B.width,B.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,j.__webglColorRenderbuffer[_t])}r.bindRenderbuffer(r.RENDERBUFFER,null),B.depthBuffer&&(j.__webglDepthRenderbuffer=r.createRenderbuffer(),he(j.__webglDepthRenderbuffer,B,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Rt){i.bindTexture(r.TEXTURE_CUBE_MAP,lt.__webglTexture),Ut(r.TEXTURE_CUBE_MAP,b);for(let _t=0;_t<6;_t++)if(b.mipmaps&&b.mipmaps.length>0)for(let St=0;St<b.mipmaps.length;St++)zt(j.__webglFramebuffer[_t][St],B,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,St);else zt(j.__webglFramebuffer[_t],B,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);S(b)&&P(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Lt){for(let _t=0,St=gt.length;_t<St;_t++){const wt=gt[_t],Xt=s.get(wt);let Bt=r.TEXTURE_2D;(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(Bt=B.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Bt,Xt.__webglTexture),Ut(Bt,wt),zt(j.__webglFramebuffer,B,wt,r.COLOR_ATTACHMENT0+_t,Bt,0),S(wt)&&P(Bt)}i.unbindTexture()}else{let _t=r.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(_t=B.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(_t,lt.__webglTexture),Ut(_t,b),b.mipmaps&&b.mipmaps.length>0)for(let St=0;St<b.mipmaps.length;St++)zt(j.__webglFramebuffer[St],B,b,r.COLOR_ATTACHMENT0,_t,St);else zt(j.__webglFramebuffer,B,b,r.COLOR_ATTACHMENT0,_t,0);S(b)&&P(_t),i.unbindTexture()}B.depthBuffer&&Jt(B)}function re(B){const b=B.textures;for(let j=0,lt=b.length;j<lt;j++){const gt=b[j];if(S(gt)){const Rt=I(B),Lt=s.get(gt).__webglTexture;i.bindTexture(Rt,Lt),P(Rt),i.unbindTexture()}}}const Ce=[],He=[];function dn(B){if(B.samples>0){if(nn(B)===!1){const b=B.textures,j=B.width,lt=B.height;let gt=r.COLOR_BUFFER_BIT;const Rt=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Lt=s.get(B),_t=b.length>1;if(_t)for(let wt=0;wt<b.length;wt++)i.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);const St=B.texture.mipmaps;St&&St.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let wt=0;wt<b.length;wt++){if(B.resolveDepthBuffer&&(B.depthBuffer&&(gt|=r.DEPTH_BUFFER_BIT),B.stencilBuffer&&B.resolveStencilBuffer&&(gt|=r.STENCIL_BUFFER_BIT)),_t){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Lt.__webglColorRenderbuffer[wt]);const Xt=s.get(b[wt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Xt,0)}r.blitFramebuffer(0,0,j,lt,0,0,j,lt,gt,r.NEAREST),m===!0&&(Ce.length=0,He.length=0,Ce.push(r.COLOR_ATTACHMENT0+wt),B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&(Ce.push(Rt),He.push(Rt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,He)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ce))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),_t)for(let wt=0;wt<b.length;wt++){i.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.RENDERBUFFER,Lt.__webglColorRenderbuffer[wt]);const Xt=s.get(b[wt]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.TEXTURE_2D,Xt,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&m){const b=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function Fe(B){return Math.min(l.maxSamples,B.samples)}function nn(B){const b=s.get(B);return B.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function W(B){const b=f.render.frame;_.get(B)!==b&&(_.set(B,b),B.update())}function ze(B,b){const j=B.colorSpace,lt=B.format,gt=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||j!==yu&&j!==ds&&(we.getTransfer(j)===ke?(lt!==Vi||gt!==Mi)&&ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Le("WebGLTextures: Unsupported texture color space:",j)),b}function Pe(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(d.width=B.naturalWidth||B.width,d.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(d.width=B.displayWidth,d.height=B.displayHeight):(d.width=B.width,d.height=B.height),d}this.allocateTextureUnit=F,this.resetTextureUnits=ct,this.getTextureUnits=Z,this.setTextureUnits=$,this.setTexture2D=ut,this.setTexture2DArray=st,this.setTexture3D=dt,this.setTextureCube=L,this.rebindTextures=ee,this.setupRenderTarget=fe,this.updateRenderTargetMipmap=re,this.updateMultisampleRenderTarget=dn,this.setupDepthRenderbuffer=Jt,this.setupFrameBufferTexture=zt,this.useMultisampledRTT=nn,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function r2(r,t){function i(s,l=ds){let c;const f=we.getTransfer(l);if(s===Mi)return r.UNSIGNED_BYTE;if(s===Rp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===wp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===tS)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===eS)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===jv)return r.BYTE;if(s===$v)return r.SHORT;if(s===Sl)return r.UNSIGNED_SHORT;if(s===Ap)return r.INT;if(s===sa)return r.UNSIGNED_INT;if(s===na)return r.FLOAT;if(s===ki)return r.HALF_FLOAT;if(s===nS)return r.ALPHA;if(s===iS)return r.RGB;if(s===Vi)return r.RGBA;if(s===Na)return r.DEPTH_COMPONENT;if(s===Xs)return r.DEPTH_STENCIL;if(s===Cp)return r.RED;if(s===Dp)return r.RED_INTEGER;if(s===Ys)return r.RG;if(s===Up)return r.RG_INTEGER;if(s===Lp)return r.RGBA_INTEGER;if(s===pu||s===mu||s===gu||s===_u)if(f===ke)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===pu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===mu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===gu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===_u)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===pu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===mu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===gu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===_u)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Vd||s===kd||s===Xd||s===Wd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Vd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===kd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Xd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Wd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Yd||s===qd||s===Zd||s===Kd||s===Qd||s===xu||s===Jd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Yd||s===qd)return f===ke?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Zd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Kd)return c.COMPRESSED_R11_EAC;if(s===Qd)return c.COMPRESSED_SIGNED_R11_EAC;if(s===xu)return c.COMPRESSED_RG11_EAC;if(s===Jd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===jd||s===$d||s===tp||s===ep||s===np||s===ip||s===ap||s===sp||s===rp||s===op||s===lp||s===cp||s===up||s===fp)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===jd)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===$d)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===tp)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ep)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===np)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ip)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===ap)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===sp)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===rp)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===op)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===lp)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===cp)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===up)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===fp)return f===ke?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===hp||s===dp||s===pp)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===hp)return f===ke?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===dp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===pp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===mp||s===gp||s===Mu||s===_p)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===mp)return c.COMPRESSED_RED_RGTC1_EXT;if(s===gp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Mu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===_p)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===xl?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const o2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l2=`
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

}`;class c2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const s=new gS(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new Pn({vertexShader:o2,fragmentShader:l2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new gn(new eo(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class u2 extends _s{constructor(t,i){super();const s=this;let l=null,c=1,f=null,p="local-floor",m=1,d=null,_=null,v=null,g=null,y=null,T=null;const U=typeof XRWebGLBinding<"u",M=new c2,S={},P=i.getContextAttributes();let I=null,D=null;const N=[],C=[],R=new ae;let E=null,O=null;const H=new xi;H.viewport=new on;const K=new xi;K.viewport=new on;const q=[H,K],ct=new _1;let Z=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(it){let vt=N[it];return vt===void 0&&(vt=new nd,N[it]=vt),vt.getTargetRaySpace()},this.getControllerGrip=function(it){let vt=N[it];return vt===void 0&&(vt=new nd,N[it]=vt),vt.getGripSpace()},this.getHand=function(it){let vt=N[it];return vt===void 0&&(vt=new nd,N[it]=vt),vt.getHandSpace()};function F(it){const vt=C.indexOf(it.inputSource);if(vt===-1)return;const At=N[vt];At!==void 0&&(At.update(it.inputSource,it.frame,d||f),At.dispatchEvent({type:it.type,data:it.inputSource}))}function G(){l.removeEventListener("select",F),l.removeEventListener("selectstart",F),l.removeEventListener("selectend",F),l.removeEventListener("squeeze",F),l.removeEventListener("squeezestart",F),l.removeEventListener("squeezeend",F),l.removeEventListener("end",G),l.removeEventListener("inputsourceschange",ut);for(let it=0;it<N.length;it++){const vt=C[it];vt!==null&&(C[it]=null,N[it].disconnect(vt))}Z=null,$=null,M.reset();for(const it in S)delete S[it];if(t.setRenderTarget(I),y=null,g=null,v=null,l=null,D=null,Ht.stop(),s.isPresenting=!1,t.setPixelRatio(E),t.setSize(R.width,R.height,!1),O!==null){const it=O.camera;it.fov=O.fov,it.zoom=O.zoom,it.updateProjectionMatrix(),O=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(it){c=it,s.isPresenting===!0&&ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(it){p=it,s.isPresenting===!0&&ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||f},this.setReferenceSpace=function(it){d=it},this.getBaseLayer=function(){return g!==null?g:y},this.getBinding=function(){return v===null&&U&&(v=new XRWebGLBinding(l,i)),v},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function(it){if(l=it,l!==null){if(I=t.getRenderTarget(),l.addEventListener("select",F),l.addEventListener("selectstart",F),l.addEventListener("selectend",F),l.addEventListener("squeeze",F),l.addEventListener("squeezestart",F),l.addEventListener("squeezeend",F),l.addEventListener("end",G),l.addEventListener("inputsourceschange",ut),P.xrCompatible!==!0&&await i.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(R),U&&"createProjectionLayer"in XRWebGLBinding.prototype){let At=null,se=null,zt=null;P.depth&&(zt=P.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,At=P.stencil?Xs:Na,se=P.stencil?xl:sa);const he={colorFormat:i.RGBA8,depthFormat:zt,scaleFactor:c};v=this.getBinding(),g=v.createProjectionLayer(he),l.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),D=new Oi(g.textureWidth,g.textureHeight,{format:Vi,type:Mi,depthTexture:new yl(g.textureWidth,g.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,At),stencilBuffer:P.stencil,colorSpace:t.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}else{const At={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:c};y=new XRWebGLLayer(l,i,At),l.updateRenderState({baseLayer:y}),t.setPixelRatio(1),t.setSize(y.framebufferWidth,y.framebufferHeight,!1),D=new Oi(y.framebufferWidth,y.framebufferHeight,{format:Vi,type:Mi,colorSpace:t.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1,storeMultisampledDepthBuffer:y.ignoreDepthValues===!1,storeMultisampledStencilBuffer:y.ignoreDepthValues===!1})}D.isXRRenderTarget=!0,this.setFoveation(m),d=null,f=await l.requestReferenceSpace(p),Ht.setContext(l),Ht.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function ut(it){for(let vt=0;vt<it.removed.length;vt++){const At=it.removed[vt],se=C.indexOf(At);se>=0&&(C[se]=null,N[se].disconnect(At))}for(let vt=0;vt<it.added.length;vt++){const At=it.added[vt];let se=C.indexOf(At);if(se===-1){for(let he=0;he<N.length;he++)if(he>=C.length){C.push(At),se=he;break}else if(C[he]===null){C[he]=At,se=he;break}if(se===-1)break}const zt=N[se];zt&&zt.connect(At)}}const st=new Q,dt=new Q;function L(it,vt,At){st.setFromMatrixPosition(vt.matrixWorld),dt.setFromMatrixPosition(At.matrixWorld);const se=st.distanceTo(dt),zt=vt.projectionMatrix.elements,he=At.projectionMatrix.elements,en=zt[14]/(zt[10]-1),Jt=zt[14]/(zt[10]+1),ee=(zt[9]+1)/zt[5],fe=(zt[9]-1)/zt[5],re=(zt[8]-1)/zt[0],Ce=(he[8]+1)/he[0],He=en*re,dn=en*Ce,Fe=se/(-re+Ce),nn=Fe*-re;if(vt.matrixWorld.decompose(it.position,it.quaternion,it.scale),it.translateX(nn),it.translateZ(Fe),it.matrixWorld.compose(it.position,it.quaternion,it.scale),it.matrixWorldInverse.copy(it.matrixWorld).invert(),zt[10]===-1)it.projectionMatrix.copy(vt.projectionMatrix),it.projectionMatrixInverse.copy(vt.projectionMatrixInverse);else{const W=en+Fe,ze=Jt+Fe,Pe=He-nn,B=dn+(se-nn),b=ee*Jt/ze*W,j=fe*Jt/ze*W;it.projectionMatrix.makePerspective(Pe,B,b,j,W,ze),it.projectionMatrixInverse.copy(it.projectionMatrix).invert()}}function tt(it,vt){vt===null?it.matrixWorld.copy(it.matrix):it.matrixWorld.multiplyMatrices(vt.matrixWorld,it.matrix),it.matrixWorldInverse.copy(it.matrixWorld).invert()}this.updateCamera=function(it){if(l===null)return;let vt=it.near,At=it.far;M.texture!==null&&(M.depthNear>0&&(vt=M.depthNear),M.depthFar>0&&(At=M.depthFar)),ct.near=K.near=H.near=vt,ct.far=K.far=H.far=At,(Z!==ct.near||$!==ct.far)&&(l.updateRenderState({depthNear:ct.near,depthFar:ct.far}),Z=ct.near,$=ct.far),ct.layers.mask=it.layers.mask|6,H.layers.mask=ct.layers.mask&-5,K.layers.mask=ct.layers.mask&-3;const se=it.parent,zt=ct.cameras;tt(ct,se);for(let he=0;he<zt.length;he++)tt(zt[he],se);zt.length===2?L(ct,H,K):ct.projectionMatrix.copy(H.projectionMatrix),O===null&&it.isPerspectiveCamera&&(O={camera:it,fov:it.fov,zoom:it.zoom}),mt(it,ct,se)};function mt(it,vt,At){At===null?it.matrix.copy(vt.matrixWorld):(it.matrix.copy(At.matrixWorld),it.matrix.invert(),it.matrix.multiply(vt.matrixWorld)),it.matrix.decompose(it.position,it.quaternion,it.scale),it.updateMatrixWorld(!0),it.projectionMatrix.copy(vt.projectionMatrix),it.projectionMatrixInverse.copy(vt.projectionMatrixInverse),it.isPerspectiveCamera&&(it.fov=Sp*2*Math.atan(1/it.projectionMatrix.elements[5]),it.zoom=1)}this.getCamera=function(){return ct},this.getFoveation=function(){if(!(g===null&&y===null))return m},this.setFoveation=function(it){m=it,g!==null&&(g.fixedFoveation=it),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=it)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(ct)},this.getCameraTexture=function(it){return S[it]};let Tt=null;function Ut(it,vt){if(_=vt.getViewerPose(d||f),T=vt,_!==null){const At=_.views;y!==null&&(t.setRenderTargetFramebuffer(D,y.framebuffer),t.setRenderTarget(D));let se=!1;At.length!==ct.cameras.length&&(ct.cameras.length=0,se=!0);for(let Jt=0;Jt<At.length;Jt++){const ee=At[Jt];let fe=null;if(y!==null)fe=y.getViewport(ee);else{const Ce=v.getViewSubImage(g,ee);fe=Ce.viewport,Jt===0&&(t.setRenderTargetTextures(D,Ce.colorTexture,Ce.depthStencilTexture),t.setRenderTarget(D))}let re=q[Jt];re===void 0&&(re=new xi,re.layers.enable(Jt),re.viewport=new on,q[Jt]=re),re.matrix.fromArray(ee.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(ee.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(fe.x,fe.y,fe.width,fe.height),Jt===0&&(ct.matrix.copy(re.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale)),se===!0&&ct.cameras.push(re)}const zt=l.enabledFeatures;if(zt&&zt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&U){v=s.getBinding();const Jt=v.getDepthInformation(At[0]);Jt&&Jt.isValid&&Jt.texture&&M.init(Jt,l.renderState)}if(zt&&zt.includes("camera-access")&&U){t.state.unbindTexture(),v=s.getBinding();for(let Jt=0;Jt<At.length;Jt++){const ee=At[Jt].camera;if(ee){let fe=S[ee];fe||(fe=new gS,S[ee]=fe);const re=v.getCameraImage(ee);fe.sourceTexture=re}}}}for(let At=0;At<N.length;At++){const se=C[At],zt=N[At];se!==null&&zt!==void 0&&zt.update(se,vt,d||f)}Tt&&Tt(it,vt),vt.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:vt}),T=null}const Ht=new yS;Ht.setAnimationLoop(Ut),this.setAnimationLoop=function(it){Tt=it},this.dispose=function(){}}}const f2=new Je,CS=new pe;CS.set(-1,0,0,0,1,0,0,0,1);function h2(r,t){function i(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function s(M,S){S.color.getRGB(M.fogColor.value,_S(r)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function l(M,S,P,I,D){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(M,S):S.isMeshLambertMaterial?(c(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(M,S),v(M,S)):S.isMeshPhongMaterial?(c(M,S),_(M,S),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(M,S),g(M,S),S.isMeshPhysicalMaterial&&y(M,S,D)):S.isMeshMatcapMaterial?(c(M,S),T(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),U(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(f(M,S),S.isLineDashedMaterial&&p(M,S)):S.isPointsMaterial?m(M,S,P,I):S.isSpriteMaterial?d(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,i(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===Yn&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,i(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===Yn&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,i(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,i(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const P=t.get(S),I=P.envMap,D=P.envMapRotation;I&&(M.envMap.value=I,M.envMapRotation.value.setFromMatrix4(f2.makeRotationFromEuler(D)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(CS),M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap&&(M.lightMap.value=S.lightMap,M.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,M.lightMapTransform)),S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,M.aoMapTransform))}function f(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform))}function p(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function m(M,S,P,I){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*P,M.scale.value=I*.5,S.map&&(M.map.value=S.map,i(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function d(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,i(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,i(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function _(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function v(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function g(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,M.roughnessMapTransform)),S.envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function y(M,S,P){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Yn&&M.clearcoatNormalScale.value.negate())),S.dispersion>0&&(M.dispersion.value=S.dispersion),S.retroreflectivity>0&&(M.retroreflectivity.value=S.retroreflectivity),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=P.texture,M.transmissionSamplerSize.value.set(P.width,P.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,M.specularIntensityMapTransform))}function T(M,S){S.matcap&&(M.matcap.value=S.matcap)}function U(M,S){const P=t.get(S).light;M.referencePosition.value.setFromMatrixPosition(P.matrixWorld),M.nearDistance.value=P.shadow.camera.near,M.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function d2(r,t,i,s){let l={},c={},f=[];const p=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(D,N){const C=N.program;s.uniformBlockBinding(D,C)}function d(D,N){let C=l[D.id];C===void 0&&(M(D),C=_(D),l[D.id]=C,D.addEventListener("dispose",P));const R=N.program;s.updateUBOMapping(D,R);const E=t.render.frame;c[D.id]!==E&&(g(D),c[D.id]=E)}function _(D){const N=v();D.__bindingPointIndex=N;const C=r.createBuffer(),R=D.__size,E=D.usage;return r.bindBuffer(r.UNIFORM_BUFFER,C),r.bufferData(r.UNIFORM_BUFFER,R,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,N,C),C}function v(){for(let D=0;D<p;D++)if(f.indexOf(D)===-1)return f.push(D),D;return Le("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(D){const N=l[D.id],C=D.uniforms,R=D.__cache;r.bindBuffer(r.UNIFORM_BUFFER,N);for(let E=0,O=C.length;E<O;E++){const H=C[E];if(Array.isArray(H))for(let K=0,q=H.length;K<q;K++)y(H[K],E,K,R);else y(H,E,0,R)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function y(D,N,C,R){if(U(D,N,C,R)===!0){const E=D.__offset,O=D.value;if(Array.isArray(O)){let H=0;for(let K=0;K<O.length;K++){const q=O[K],ct=S(q);T(q,D.__data,H),typeof q!="number"&&typeof q!="boolean"&&!q.isMatrix3&&!ArrayBuffer.isView(q)&&(H+=ct.storage/Float32Array.BYTES_PER_ELEMENT)}}else T(O,D.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,E,D.__data)}}function T(D,N,C){typeof D=="number"||typeof D=="boolean"?N[0]=D:D.isMatrix3?(N[0]=D.elements[0],N[1]=D.elements[1],N[2]=D.elements[2],N[3]=0,N[4]=D.elements[3],N[5]=D.elements[4],N[6]=D.elements[5],N[7]=0,N[8]=D.elements[6],N[9]=D.elements[7],N[10]=D.elements[8],N[11]=0):ArrayBuffer.isView(D)?N.set(new D.constructor(D.buffer,D.byteOffset,N.length)):D.toArray(N,C)}function U(D,N,C,R){const E=D.value,O=N+"_"+C;if(R[O]===void 0)return typeof E=="number"||typeof E=="boolean"?R[O]=E:ArrayBuffer.isView(E)?R[O]=E.slice():R[O]=E.clone(),!0;{const H=R[O];if(typeof E=="number"||typeof E=="boolean"){if(H!==E)return R[O]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(H.equals(E)===!1)return H.copy(E),!0}}return!1}function M(D){const N=D.uniforms;let C=0;const R=16;for(let O=0,H=N.length;O<H;O++){const K=Array.isArray(N[O])?N[O]:[N[O]];for(let q=0,ct=K.length;q<ct;q++){const Z=K[q],$=Array.isArray(Z.value)?Z.value:[Z.value];for(let F=0,G=$.length;F<G;F++){const ut=$[F],st=S(ut),dt=C%R,L=dt%st.boundary,tt=dt+L;C+=L,tt!==0&&R-tt<st.storage&&(C+=R-tt),Z.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=C,C+=st.storage}}}const E=C%R;return E>0&&(C+=R-E),D.__size=C,D.__cache={},this}function S(D){const N={boundary:0,storage:0};return typeof D=="number"||typeof D=="boolean"?(N.boundary=4,N.storage=4):D.isVector2?(N.boundary=8,N.storage=8):D.isVector3||D.isColor?(N.boundary=16,N.storage=12):D.isVector4?(N.boundary=16,N.storage=16):D.isMatrix3?(N.boundary=48,N.storage=48):D.isMatrix4?(N.boundary=64,N.storage=64):D.isTexture?ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(D)?(N.boundary=16,N.storage=D.byteLength):ce("WebGLRenderer: Unsupported uniform value type.",D),N}function P(D){const N=D.target;N.removeEventListener("dispose",P);const C=f.indexOf(N.__bindingPointIndex);f.splice(C,1),r.deleteBuffer(l[N.id]),delete l[N.id],delete c[N.id]}function I(){for(const D in l)r.deleteBuffer(l[D]);f=[],l={},c={}}return{bind:m,update:d,dispose:I}}const p2=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ji=null;function m2(){return Ji===null&&(Ji=new dS(p2,16,16,Ys,ki),Ji.name="DFG_LUT",Ji.minFilter=Xn,Ji.magFilter=Xn,Ji.wrapS=Da,Ji.wrapT=Da,Ji.generateMipmaps=!1,Ji.needsUpdate=!0),Ji}class g2{constructor(t={}){const{canvas:i=by(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:g=!1,outputBufferType:y=Mi}=t;this.isWebGLRenderer=!0;let T;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=s.getContextAttributes().alpha}else T=f;const U=y,M=new Set([Lp,Up,Dp]),S=new Set([Mi,sa,Sl,xl,Rp,wp]),P=new Uint32Array(4),I=new Int32Array(4),D=new Q;let N=null,C=null;const R=[],E=[];let O=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=aa,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const H=this;let K=!1,q=null,ct=null,Z=null,$=null;this._outputColorSpace=li;let F=0,G=0,ut=null,st=-1,dt=null;const L=new on,tt=new on;let mt=null;const Tt=new le(0);let Ut=0,Ht=i.width,it=i.height,vt=1,At=null,se=null;const zt=new on(0,0,Ht,it),he=new on(0,0,Ht,it);let en=!1;const Jt=new Fp;let ee=!1,fe=!1;const re=new Je,Ce=new Q,He=new on,dn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function nn(){return ut===null?vt:1}let W=s;function ze(A,V){return i.getContext(A,V)}let Pe,B,b,j,lt,gt,Rt,Lt,_t,St,wt,Xt,Bt,Nt,te,ne,ue,X,Ct,Mt,Dt,Gt,bt;try{const A={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${bp}`),i.addEventListener("webglcontextlost",We,!1),i.addEventListener("webglcontextrestored",De,!1),i.addEventListener("webglcontextcreationerror",$n,!1),W===null){const V="webgl2";if(W=ze(V,A),W===null)throw ze(V)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}$t()}catch(A){throw i.removeEventListener("webglcontextlost",We,!1),i.removeEventListener("webglcontextrestored",De,!1),i.removeEventListener("webglcontextcreationerror",$n,!1),Le("WebGLRenderer: "+A.message),A}function $t(){Pe=new mT(W),Pe.init(),Dt=new r2(W,Pe),B=new sT(W,Pe,t,Dt),b=new a2(W,Pe),B.reversedDepthBuffer&&g&&b.buffers.depth.setReversed(!0),ct=W.createFramebuffer(),Z=W.createFramebuffer(),$=W.createFramebuffer(),j=new vT(W),lt=new XA,gt=new s2(W,Pe,b,lt,B,Dt,j),Rt=new pT(H),Lt=new x1(W),Gt=new iT(W,Lt),_t=new gT(W,Lt,j,Gt),St=new xT(W,_t,Lt,Gt,j),X=new ST(W,B,gt),te=new rT(lt),wt=new kA(H,Rt,Pe,B,Gt,te),Xt=new h2(H,lt),Bt=new YA,Nt=new jA(Pe),ue=new nT(H,Rt,b,St,T,m),ne=new i2(H,St,B),bt=new d2(W,j,B,b),Ct=new aT(W,Pe,j),Mt=new _T(W,Pe,j),j.programs=wt.programs,H.capabilities=B,H.extensions=Pe,H.properties=lt,H.renderLists=Bt,H.shadowMap=ne,H.state=b,H.info=j}U!==Mi&&(O=new yT(U,i.width,i.height,p,l,c));const Zt=new u2(H,W);this.xr=Zt,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const A=Pe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Pe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return vt},this.setPixelRatio=function(A){A!==void 0&&(vt=A,this.setSize(Ht,it,!1))},this.getSize=function(A){return A.set(Ht,it)},this.setSize=function(A,V,ht=!0){if(Zt.isPresenting){ce("WebGLRenderer: Can't change size while VR device is presenting.");return}Ht=A,it=V,i.width=Math.floor(A*vt),i.height=Math.floor(V*vt),ht===!0&&(i.style.width=A+"px",i.style.height=V+"px"),O!==null&&O.setSize(i.width,i.height),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(Ht*vt,it*vt).floor()},this.setDrawingBufferSize=function(A,V,ht){Ht=A,it=V,vt=ht,i.width=Math.floor(A*ht),i.height=Math.floor(V*ht),this.setViewport(0,0,A,V)},this.setEffects=function(A){if(U===Mi){Le("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let V=0;V<A.length;V++)if(A[V].isOutputPass===!0){ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(L)},this.getViewport=function(A){return A.copy(zt)},this.setViewport=function(A,V,ht,et){A.isVector4?zt.set(A.x,A.y,A.z,A.w):zt.set(A,V,ht,et),b.viewport(L.copy(zt).multiplyScalar(vt).round())},this.getScissor=function(A){return A.copy(he)},this.setScissor=function(A,V,ht,et){A.isVector4?he.set(A.x,A.y,A.z,A.w):he.set(A,V,ht,et),b.scissor(tt.copy(he).multiplyScalar(vt).round())},this.getScissorTest=function(){return en},this.setScissorTest=function(A){b.setScissorTest(en=A)},this.setOpaqueSort=function(A){At=A},this.setTransparentSort=function(A){se=A},this.getClearColor=function(A){return A.copy(ue.getClearColor())},this.setClearColor=function(){ue.setClearColor(...arguments)},this.getClearAlpha=function(){return ue.getClearAlpha()},this.setClearAlpha=function(){ue.setClearAlpha(...arguments)},this.clear=function(A=!0,V=!0,ht=!0){let et=0;if(A){let nt=!1;if(ut!==null){const It=ut.texture.format;nt=M.has(It)}if(nt){const It=ut.texture.type,Wt=S.has(It),Ot=ue.getClearColor(),Vt=ue.getClearAlpha(),kt=Ot.r,me=Ot.g,Me=Ot.b;Wt?(P[0]=kt,P[1]=me,P[2]=Me,P[3]=Vt,W.clearBufferuiv(W.COLOR,0,P)):(I[0]=kt,I[1]=me,I[2]=Me,I[3]=Vt,W.clearBufferiv(W.COLOR,0,I))}else et|=W.COLOR_BUFFER_BIT}V&&(et|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ht&&(et|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),et!==0&&W.clear(et)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),q=A},this.dispose=function(){i.removeEventListener("webglcontextlost",We,!1),i.removeEventListener("webglcontextrestored",De,!1),i.removeEventListener("webglcontextcreationerror",$n,!1),ue.dispose(),Bt.dispose(),Nt.dispose(),lt.dispose(),Rt.dispose(),St.dispose(),Gt.dispose(),bt.dispose(),wt.dispose(),Zt.dispose(),Zt.removeEventListener("sessionstart",_n),Zt.removeEventListener("sessionend",Bn),ti.stop()};function We(A){A.preventDefault(),Tu("WebGLRenderer: Context Lost."),K=!0}function De(){Tu("WebGLRenderer: Context Restored."),K=!1;const A=j.autoReset,V=ne.enabled,ht=ne.autoUpdate,et=ne.needsUpdate,nt=ne.type;$t(),j.autoReset=A,ne.enabled=V,ne.autoUpdate=ht,ne.needsUpdate=et,ne.type=nt}function $n(A){Le("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ci(A){const V=A.target;V.removeEventListener("dispose",ci),so(V)}function so(A){ro(A),lt.remove(A)}function ro(A){const V=lt.get(A).programs;V!==void 0&&(V.forEach(function(ht){wt.releaseProgram(ht)}),A.isShaderMaterial&&wt.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,ht,et,nt,It){V===null&&(V=dn);const Wt=nt.isMesh&&nt.matrixWorld.determinantAffine()<0,Ot=Ba(A,V,ht,et,nt);b.setMaterial(et,Wt);let Vt=ht.index,kt=1;if(et.wireframe===!0){if(Vt=_t.getWireframeAttribute(ht),Vt===void 0)return;kt=2}const me=ht.drawRange,Me=ht.attributes.position;let Kt=me.start*kt,Ue=(me.start+me.count)*kt;It!==null&&(Kt=Math.max(Kt,It.start*kt),Ue=Math.min(Ue,(It.start+It.count)*kt)),Vt!==null?(Kt=Math.max(Kt,0),Ue=Math.min(Ue,Vt.count)):Me!=null&&(Kt=Math.max(Kt,0),Ue=Math.min(Ue,Me.count));const an=Ue-Kt;if(an<0||an===1/0)return;Gt.setup(nt,et,Ot,ht,Vt);let je,ve=Ct;if(Vt!==null&&(je=Lt.get(Vt),ve=Mt,ve.setIndex(je)),nt.isMesh)et.wireframe===!0?(b.setLineWidth(et.wireframeLinewidth*nn()),ve.setMode(W.LINES)):ve.setMode(W.TRIANGLES);else if(nt.isLine){let Sn=et.linewidth;Sn===void 0&&(Sn=1),b.setLineWidth(Sn*nn()),nt.isLineSegments?ve.setMode(W.LINES):nt.isLineLoop?ve.setMode(W.LINE_LOOP):ve.setMode(W.LINE_STRIP)}else nt.isPoints?ve.setMode(W.POINTS):nt.isSprite&&ve.setMode(W.TRIANGLES);if(nt.isBatchedMesh)if(Pe.get("WEBGL_multi_draw"))ve.renderMultiDraw(nt._multiDrawStarts,nt._multiDrawCounts,nt._multiDrawCount);else{const Sn=nt._multiDrawStarts,Yt=nt._multiDrawCounts,An=nt._multiDrawCount,Se=Vt?Lt.get(Vt).bytesPerElement:1,Zn=lt.get(et).currentProgram.getUniforms();for(let ui=0;ui<An;ui++)Zn.setValue(W,"_gl_DrawID",ui),ve.render(Sn[ui]/Se,Yt[ui])}else if(nt.isInstancedMesh)ve.renderInstances(Kt,an,nt.count);else if(ht.isInstancedBufferGeometry){const Sn=ht._maxInstanceCount!==void 0?ht._maxInstanceCount:1/0,Yt=Math.min(ht.instanceCount,Sn);ve.renderInstances(Kt,an,Yt)}else ve.render(Kt,an)};function oo(A,V,ht,et){q!==null&&A.isNodeMaterial&&q.setObject(et,A),ee===!0&&te.setState(A,ht,!1),A.transparent===!0&&A.side===ta&&A.forceSinglePass===!1?(A.side=Yn,A.needsUpdate=!0,Pa(A,V,et),A.side=ms,A.needsUpdate=!0,Pa(A,V,et),A.side=ta):Pa(A,V,et)}this.compile=function(A,V,ht=null){ht===null&&(ht=A),q!==null&&q.renderStart(A,V,ht),C=Nt.get(ht),C.init(V),E.push(C),ht.traverseVisible(function(nt){nt.isLight&&nt.layers.test(V.layers)&&(C.pushLight(nt),nt.castShadow&&C.pushShadow(nt))}),A!==ht&&A.traverseVisible(function(nt){nt.isLight&&nt.layers.test(V.layers)&&(C.pushLight(nt),nt.castShadow&&C.pushShadow(nt))}),C.setupLights(),q!==null&&q.updateLights(C.state.lightsArray),fe=this.localClippingEnabled,ee=te.init(this.clippingPlanes,fe),ee===!0&&te.setGlobalState(this.clippingPlanes,V),q!==null&&ne.render(C.state.shadowsArray,ht,V);const et=new Set;return A.traverse(function(nt){if(!(nt.isMesh||nt.isPoints||nt.isLine||nt.isSprite))return;const It=nt.material;if(It)if(Array.isArray(It))for(let Wt=0;Wt<It.length;Wt++){const Ot=It[Wt];oo(Ot,ht,V,nt),et.add(Ot)}else oo(It,ht,V,nt),et.add(It)}),C=E.pop(),q!==null&&q.renderEnd(),et},this.compileAsync=function(A,V,ht=null){const et=this.compile(A,V,ht);return new Promise(nt=>{function It(){if(et.forEach(function(Wt){const Vt=lt.get(Wt).currentProgram;(Vt===void 0||Vt.isReady())&&et.delete(Wt)}),et.size===0){nt(A);return}setTimeout(It,10)}Pe.get("KHR_parallel_shader_compile")!==null?It():setTimeout(It,10)})};let Zs=null;function Xi(A){Zs&&Zs(A)}function _n(){ti.stop()}function Bn(){ti.start()}const ti=new yS;ti.setAnimationLoop(Xi),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(A){Zs=A,Zt.setAnimationLoop(A),A===null?ti.stop():ti.start()},Zt.addEventListener("sessionstart",_n),Zt.addEventListener("sessionend",Bn),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){Le("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(K===!0)return;q!==null&&q.renderStart(A,V);const ht=Zt.enabled===!0&&Zt.isPresenting===!0,et=O!==null&&(ut===null||ht)&&O.begin(H,ut);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Zt.enabled===!0&&Zt.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(Zt.cameraAutoUpdate===!0&&Zt.updateCamera(V),V=Zt.getCamera()),A.isScene===!0&&A.onBeforeRender(H,A,V,ut),C=Nt.get(A,E.length),C.init(V),C.state.textureUnits=gt.getTextureUnits(),E.push(C),re.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Jt.setFromProjectionMatrix(re,ia,V.reversedDepth),fe=this.localClippingEnabled,ee=te.init(this.clippingPlanes,fe),N=Bt.get(A,R.length),N.init(),R.push(N),Zt.enabled===!0&&Zt.isPresenting===!0){const Wt=H.xr.getDepthSensingMesh();Wt!==null&&Ss(Wt,V,-1/0,H.sortObjects)}Ss(A,V,0,H.sortObjects),N.finish(),q!==null&&q.updateLights(C.state.lightsArray),H.sortObjects===!0&&N.sort(At,se),Fe=Zt.enabled===!1||Zt.isPresenting===!1||Zt.hasDepthSensing()===!1,Fe&&ue.addToRenderList(N,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ee===!0&&te.beginShadows();const nt=C.state.shadowsArray;if(ne.render(nt,A,V),ee===!0&&te.endShadows(),(et&&O.hasRenderPass())===!1){const Wt=N.opaque,Ot=N.transmissive;if(C.setupLights(),V.isArrayCamera){const Vt=V.cameras;if(Ot.length>0)for(let kt=0,me=Vt.length;kt<me;kt++){const Me=Vt[kt];Al(Wt,Ot,A,Me)}Fe&&ue.render(A);for(let kt=0,me=Vt.length;kt<me;kt++){const Me=Vt[kt];Tl(N,A,Me,Me.viewport)}}else Ot.length>0&&Al(Wt,Ot,A,V),Fe&&ue.render(A),Tl(N,A,V)}ut!==null&&G===0&&(gt.updateMultisampleRenderTarget(ut),gt.updateRenderTargetMipmap(ut)),et&&O.end(H),A.isScene===!0&&A.onAfterRender(H,A,V),Gt.resetDefaultState(),st=-1,dt=null,E.pop(),E.length>0?(C=E[E.length-1],gt.setTextureUnits(C.state.textureUnits),ee===!0&&te.setGlobalState(H.clippingPlanes,C.state.camera)):C=null,R.pop(),R.length>0?N=R[R.length-1]:N=null,q!==null&&q.renderEnd()};function Ss(A,V,ht,et){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)ht=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLightProbeGrid)C.pushLightProbeGrid(A);else if(A.isLight)C.pushLight(A),A.castShadow&&C.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(Jt)){et&&He.setFromMatrixPosition(A.matrixWorld).applyMatrix4(re);const Wt=St.update(A),Ot=A.material;Ot.visible&&N.push(A,Wt,Ot,ht,He.z,null,V)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(Jt))){const Wt=St.update(A),Ot=A.material;if(et&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),He.copy(A.boundingSphere.center)):(Wt.boundingSphere===null&&Wt.computeBoundingSphere(),He.copy(Wt.boundingSphere.center)),He.applyMatrix4(A.matrixWorld).applyMatrix4(re)),Array.isArray(Ot)){const Vt=Wt.groups;for(let kt=0,me=Vt.length;kt<me;kt++){const Me=Vt[kt],Kt=Ot[Me.materialIndex];Kt&&Kt.visible&&N.push(A,Wt,Kt,ht,He.z,Me,V)}}else Ot.visible&&N.push(A,Wt,Ot,ht,He.z,null,V)}}const It=A.children;for(let Wt=0,Ot=It.length;Wt<Ot;Wt++)Ss(It[Wt],V,ht,et)}function Tl(A,V,ht,et){const{opaque:nt,transmissive:It,transparent:Wt}=A;C.setupLightsView(ht),ee===!0&&te.setGlobalState(H.clippingPlanes,ht),et&&b.viewport(L.copy(et)),nt.length>0&&xs(nt,V,ht),It.length>0&&xs(It,V,ht),Wt.length>0&&xs(Wt,V,ht),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Al(A,V,ht,et){if((ht.isScene===!0?ht.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[et.id]===void 0){const Kt=Pe.has("EXT_color_buffer_half_float")||Pe.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[et.id]=new Oi(1,1,{generateMipmaps:!0,type:Kt?ki:Mi,minFilter:ks,samples:Math.max(4,B.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:we.workingColorSpace})}const It=C.state.transmissionRenderTarget[et.id],Wt=et.viewport||L;It.setSize(Wt.z*H.transmissionResolutionScale,Wt.w*H.transmissionResolutionScale);const Ot=H.getRenderTarget(),Vt=H.getActiveCubeFace(),kt=H.getActiveMipmapLevel();H.setRenderTarget(It),H.getClearColor(Tt),Ut=H.getClearAlpha(),Ut<1&&H.setClearColor(16777215,.5),H.clear(),Fe&&ue.render(ht);const me=H.toneMapping;H.toneMapping=aa;const Me=et.viewport;if(et.viewport!==void 0&&(et.viewport=void 0),C.setupLightsView(et),ee===!0&&te.setGlobalState(H.clippingPlanes,et),xs(A,ht,et),gt.updateMultisampleRenderTarget(It),gt.updateRenderTargetMipmap(It),Pe.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let Ue=0,an=V.length;Ue<an;Ue++){const je=V[Ue],{object:ve,geometry:Sn,material:Yt,group:An}=je;if(Yt.side===ta&&ve.layers.test(et.layers)){const Se=Yt.side;Yt.side=Yn,Yt.needsUpdate=!0,Oa(ve,ht,et,Sn,Yt,An),Yt.side=Se,Yt.needsUpdate=!0,Kt=!0}}Kt===!0&&(gt.updateMultisampleRenderTarget(It),gt.updateRenderTargetMipmap(It))}H.setRenderTarget(Ot,Vt,kt),H.setClearColor(Tt,Ut),Me!==void 0&&(et.viewport=Me),H.toneMapping=me}function xs(A,V,ht){const et=V.isScene===!0?V.overrideMaterial:null;for(let nt=0,It=A.length;nt<It;nt++){const Wt=A[nt],{object:Ot,geometry:Vt,group:kt}=Wt;let me=Wt.material;me.allowOverride===!0&&et!==null&&(me=et),Ot.layers.test(ht.layers)&&Oa(Ot,V,ht,Vt,me,kt)}}function Oa(A,V,ht,et,nt,It){q!==null&&nt.isNodeMaterial&&q.setObject(A,nt),A.onBeforeRender(H,V,ht,et,nt,It),A.modelViewMatrix.multiplyMatrices(ht.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),nt.onBeforeRender(H,V,ht,et,A,It),nt.transparent===!0&&nt.side===ta&&nt.forceSinglePass===!1?(nt.side=Yn,nt.needsUpdate=!0,H.renderBufferDirect(ht,V,et,nt,A,It),nt.side=ms,nt.needsUpdate=!0,H.renderBufferDirect(ht,V,et,nt,A,It),nt.side=ta):H.renderBufferDirect(ht,V,et,nt,A,It),A.onAfterRender(H,V,ht,et,nt,It)}function Pa(A,V,ht){V.isScene!==!0&&(V=dn);const et=lt.get(A),nt=C.state.lights,It=C.state.shadowsArray,Wt=nt.state.version,Ot=wt.getParameters(A,nt.state,It,V,ht,C.state.lightProbeGridArray),Vt=wt.getProgramCacheKey(Ot);let kt=et.programs;et.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?V.environment:null,et.fog=V.fog;const me=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;et.envMap=Rt.get(A.envMap||et.environment,me),et.envMapRotation=et.environment!==null&&A.envMap===null?V.environmentRotation:A.envMapRotation,kt===void 0&&(A.addEventListener("dispose",ci),kt=new Map,et.programs=kt);let Me=kt.get(Vt);if(Me!==void 0){if(et.currentProgram===Me&&et.lightsStateVersion===Wt)return oa(A,Ot),Me}else Ot.uniforms=wt.getUniforms(A),q!==null&&A.isNodeMaterial&&q.build(A,ht,Ot),A.onBeforeCompile(Ot,H),Me=wt.acquireProgram(Ot,Vt),kt.set(Vt,Me),et.uniforms=Ot.uniforms;const Kt=et.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Kt.clippingPlanes=te.uniform),oa(A,Ot),et.needsLights=Rl(A),et.lightsStateVersion=Wt,et.needsLights&&(Kt.ambientLightColor.value=nt.state.ambient,Kt.lightProbe.value=nt.state.probe,Kt.sunLights.value=nt.state.sun,Kt.sunLightShadows.value=nt.state.sunShadow,Kt.directionalLights.value=nt.state.directional,Kt.directionalLightShadows.value=nt.state.directionalShadow,Kt.spotLights.value=nt.state.spot,Kt.spotLightShadows.value=nt.state.spotShadow,Kt.rectAreaLights.value=nt.state.rectArea,Kt.ltc_1.value=nt.state.rectAreaLTC1,Kt.ltc_2.value=nt.state.rectAreaLTC2,Kt.pointLights.value=nt.state.point,Kt.pointLightShadows.value=nt.state.pointShadow,Kt.hemisphereLights.value=nt.state.hemi,Kt.sunShadowMatrix.value=nt.state.sunShadowMatrix,Kt.sunShadowCascade.value=nt.state.sunShadowCascade,Kt.directionalShadowMatrix.value=nt.state.directionalShadowMatrix,Kt.spotLightMatrix.value=nt.state.spotLightMatrix,Kt.spotLightMap.value=nt.state.spotLightMap,Kt.pointShadowMatrix.value=nt.state.pointShadowMatrix),et.lightProbeGrid=C.state.lightProbeGridArray.length>0,et.currentProgram=Me,et.uniformsList=null,Me}function ra(A){if(A.uniformsList===null){const V=A.currentProgram.getUniforms();A.uniformsList=Su.seqWithValue(V.seq,A.uniforms)}return A.uniformsList}function oa(A,V){const ht=lt.get(A);ht.outputColorSpace=V.outputColorSpace,ht.batching=V.batching,ht.batchingColor=V.batchingColor,ht.instancing=V.instancing,ht.instancingColor=V.instancingColor,ht.instancingMorph=V.instancingMorph,ht.skinning=V.skinning,ht.morphTargets=V.morphTargets,ht.morphNormals=V.morphNormals,ht.morphColors=V.morphColors,ht.morphTargetsCount=V.morphTargetsCount,ht.numClippingPlanes=V.numClippingPlanes,ht.numIntersection=V.numClipIntersection,ht.vertexAlphas=V.vertexAlphas,ht.vertexTangents=V.vertexTangents,ht.toneMapping=V.toneMapping}function Ms(A,V){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;D.setFromMatrixPosition(V.matrixWorld);for(let ht=0,et=A.length;ht<et;ht++){const nt=A[ht];if(nt.texture!==null&&nt.boundingBox.containsPoint(D))return nt}return null}function Ba(A,V,ht,et,nt){V.isScene!==!0&&(V=dn),gt.resetTextureUnits();const It=V.fog,Wt=et.isMeshStandardMaterial||et.isMeshLambertMaterial||et.isMeshPhongMaterial?V.environment:null,Ot=ut===null?H.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:we.workingColorSpace,Vt=et.isMeshStandardMaterial||et.isMeshLambertMaterial&&!et.envMap||et.isMeshPhongMaterial&&!et.envMap,kt=Rt.get(et.envMap||Wt,Vt),me=et.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,Me=!!ht.attributes.tangent&&(!!et.normalMap||et.anisotropy>0),Kt=!!ht.morphAttributes.position,Ue=!!ht.morphAttributes.normal,an=!!ht.morphAttributes.color;let je=aa;et.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(je=H.toneMapping);const ve=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,Sn=ve!==void 0?ve.length:0,Yt=lt.get(et),An=C.state.lights;if(ee===!0&&(fe===!0||A!==dt)){const Ye=A===dt&&et.id===st;te.setState(et,A,Ye)}let Se=!1;et.version===Yt.__version?(Yt.needsLights&&Yt.lightsStateVersion!==An.state.version||Yt.outputColorSpace!==Ot||nt.isBatchedMesh&&Yt.batching===!1||!nt.isBatchedMesh&&Yt.batching===!0||nt.isBatchedMesh&&Yt.batchingColor===!0&&nt._colorsTexture===null||nt.isBatchedMesh&&Yt.batchingColor===!1&&nt._colorsTexture!==null||nt.isInstancedMesh&&Yt.instancing===!1||!nt.isInstancedMesh&&Yt.instancing===!0||nt.isSkinnedMesh&&Yt.skinning===!1||!nt.isSkinnedMesh&&Yt.skinning===!0||nt.isInstancedMesh&&Yt.instancingColor===!0&&nt.instanceColor===null||nt.isInstancedMesh&&Yt.instancingColor===!1&&nt.instanceColor!==null||nt.isInstancedMesh&&Yt.instancingMorph===!0&&nt.morphTexture===null||nt.isInstancedMesh&&Yt.instancingMorph===!1&&nt.morphTexture!==null||Yt.envMap!==kt||et.fog===!0&&Yt.fog!==It||Yt.numClippingPlanes!==void 0&&(Yt.numClippingPlanes!==te.numPlanes||Yt.numIntersection!==te.numIntersection)||Yt.vertexAlphas!==me||Yt.vertexTangents!==Me||Yt.morphTargets!==Kt||Yt.morphNormals!==Ue||Yt.morphColors!==an||Yt.toneMapping!==je||Yt.morphTargetsCount!==Sn||!!Yt.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(Se=!0):(Se=!0,Yt.__version=et.version);let Zn=Yt.currentProgram;Se===!0&&(Zn=Pa(et,V,nt),q&&et.isNodeMaterial&&q.onUpdateProgram(et,Zn,Yt));let ui=!1,Kn=!1,Ia=!1;const Be=Zn.getUniforms(),ln=Yt.uniforms;if(b.useProgram(Zn.program)&&(ui=!0,Kn=!0,Ia=!0),et.id!==st&&(st=et.id,Kn=!0),Yt.needsLights){const Ye=Ms(C.state.lightProbeGridArray,nt);Yt.lightProbeGrid!==Ye&&(Yt.lightProbeGrid=Ye,Kn=!0)}if(ui||dt!==A){b.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Be.setValue(W,"projectionMatrix",A.projectionMatrix),Be.setValue(W,"viewMatrix",A.matrixWorldInverse);const Wi=Be.map.cameraPosition;Wi!==void 0&&Wi.setValue(W,Ce.setFromMatrixPosition(A.matrixWorld)),B.logarithmicDepthBuffer&&Be.setValue(W,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&Be.setValue(W,"isOrthographic",A.isOrthographicCamera===!0),dt!==A&&(dt=A,Kn=!0,Ia=!0)}if(Yt.needsLights&&(An.state.sunShadowMap.length>0&&Be.setValue(W,"sunShadowMap",An.state.sunShadowMap,gt),An.state.directionalShadowMap.length>0&&Be.setValue(W,"directionalShadowMap",An.state.directionalShadowMap,gt),An.state.spotShadowMap.length>0&&Be.setValue(W,"spotShadowMap",An.state.spotShadowMap,gt),An.state.pointShadowMap.length>0&&Be.setValue(W,"pointShadowMap",An.state.pointShadowMap,gt)),nt.isSkinnedMesh){Be.setOptional(W,nt,"bindMatrix"),Be.setOptional(W,nt,"bindMatrixInverse");const Ye=nt.skeleton;Ye&&(Ye.boneTexture===null&&Ye.computeBoneTexture(),Be.setValue(W,"boneTexture",Ye.boneTexture,gt))}nt.isBatchedMesh&&(Be.setOptional(W,nt,"batchingTexture"),Be.setValue(W,"batchingTexture",nt._matricesTexture,gt),Be.setOptional(W,nt,"batchingIdTexture"),Be.setValue(W,"batchingIdTexture",nt._indirectTexture,gt),Be.setOptional(W,nt,"batchingColorTexture"),nt._colorsTexture!==null&&Be.setValue(W,"batchingColorTexture",nt._colorsTexture,gt));const yi=ht.morphAttributes;if((yi.position!==void 0||yi.normal!==void 0||yi.color!==void 0)&&X.update(nt,ht,Zn),(Kn||Yt.receiveShadow!==nt.receiveShadow)&&(Yt.receiveShadow=nt.receiveShadow,Be.setValue(W,"receiveShadow",nt.receiveShadow)),(et.isMeshStandardMaterial||et.isMeshLambertMaterial||et.isMeshPhongMaterial)&&et.envMap===null&&V.environment!==null&&(ln.envMapIntensity.value=V.environmentIntensity),ln.dfgLUT!==void 0&&(ln.dfgLUT.value=m2()),Kn){if(Be.setValue(W,"toneMappingExposure",H.toneMappingExposure),Yt.needsLights&&vn(ln,Ia),It&&et.fog===!0&&Xt.refreshFogUniforms(ln,It),Xt.refreshMaterialUniforms(ln,et,vt,it,C.state.transmissionRenderTarget[A.id]),Yt.needsLights&&Yt.lightProbeGrid){const Ye=Yt.lightProbeGrid;ln.probesSH.value=Ye.texture,ln.probesMin.value.copy(Ye.boundingBox.min),ln.probesMax.value.copy(Ye.boundingBox.max),ln.probesResolution.value.copy(Ye.resolution)}Su.upload(W,ra(Yt),ln,gt)}if(et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(Su.upload(W,ra(Yt),ln,gt),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&Be.setValue(W,"center",nt.center),Be.setValue(W,"modelViewMatrix",nt.modelViewMatrix),Be.setValue(W,"normalMatrix",nt.normalMatrix),Be.setValue(W,"modelMatrix",nt.matrixWorld),et.uniformsGroups!==void 0){const Ye=et.uniformsGroups;for(let Wi=0,Pi=Ye.length;Wi<Pi;Wi++){const Ei=Ye[Wi];bt.update(Ei,Zn),bt.bind(Ei,Zn)}}return Zn}function vn(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.sunLights.needsUpdate=V,A.sunLightShadows.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function Rl(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return ut},this.setRenderTargetTextures=function(A,V,ht){const et=lt.get(A);et.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,et.__autoAllocateDepthBuffer===!1&&(et.__useRenderToTexture=!1),lt.get(A.texture).__webglTexture=V,lt.get(A.depthTexture).__webglTexture=et.__autoAllocateDepthBuffer?void 0:ht,et.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,V){const ht=lt.get(A);ht.__webglFramebuffer=V,ht.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(A,V=0,ht=0){ut=A,F=V,G=ht;let et=null,nt=!1,It=!1;if(A){const Ot=lt.get(A);if(Ot.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(W.FRAMEBUFFER,Ot.__webglFramebuffer),L.copy(A.viewport),tt.copy(A.scissor),mt=A.scissorTest,b.viewport(L),b.scissor(tt),b.setScissorTest(mt),st=-1;return}else if(Ot.__webglFramebuffer===void 0)gt.setupRenderTarget(A);else if(Ot.__hasExternalTextures)gt.rebindTextures(A,lt.get(A.texture).__webglTexture,lt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const me=A.depthTexture;if(Ot.__boundDepthTexture!==me){if(me!==null&&lt.has(me)&&(A.width!==me.image.width||A.height!==me.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");gt.setupDepthRenderbuffer(A)}}const Vt=A.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(It=!0);const kt=lt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(kt[V])?et=kt[V][ht]:et=kt[V],nt=!0):A.samples>0&&gt.useMultisampledRTT(A)===!1?et=lt.get(A).__webglMultisampledFramebuffer:Array.isArray(kt)?et=kt[ht]:et=kt,L.copy(A.viewport),tt.copy(A.scissor),mt=A.scissorTest}else L.copy(zt).multiplyScalar(vt).floor(),tt.copy(he).multiplyScalar(vt).floor(),mt=en;if(ht!==0&&(et=ct),b.bindFramebuffer(W.FRAMEBUFFER,et)&&b.drawBuffers(A,et),b.viewport(L),b.scissor(tt),b.setScissorTest(mt),nt){const Ot=lt.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+V,Ot.__webglTexture,ht)}else if(It){const Ot=V;for(let Vt=0;Vt<A.textures.length;Vt++){const kt=lt.get(A.textures[Vt]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+Vt,kt.__webglTexture,ht,Ot)}}else if(A!==null&&ht!==0){const Ot=lt.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Ot.__webglTexture,ht)}st=-1};function lo(A){const V=lt.get(A);return(V.__readFormat!==A.format||V.__readType!==A.type)&&(V.__readFormat=A.format,V.__readType=A.type,V.__formatReadable=B.textureFormatReadable(A.format),V.__typeReadable=B.textureTypeReadable(A.type)),V}this.readRenderTargetPixels=function(A,V,ht,et,nt,It,Wt,Ot=0){if(!(A&&A.isWebGLRenderTarget)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Vt=lt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Wt!==void 0&&(Vt=Vt[Wt]),Vt){b.bindFramebuffer(W.FRAMEBUFFER,Vt);try{const kt=A.textures[Ot],me=kt.format,Me=kt.type;A.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+Ot);const Kt=lo(kt);if(Kt.__formatReadable===!1){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Kt.__typeReadable===!1){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-et&&ht>=0&&ht<=A.height-nt&&W.readPixels(V,ht,et,nt,Dt.convert(me),Dt.convert(Me),It)}finally{const kt=ut!==null?lt.get(ut).__webglFramebuffer:null;b.bindFramebuffer(W.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(A,V,ht,et,nt,It,Wt,Ot=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Vt=lt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Wt!==void 0&&(Vt=Vt[Wt]),Vt)if(V>=0&&V<=A.width-et&&ht>=0&&ht<=A.height-nt){b.bindFramebuffer(W.FRAMEBUFFER,Vt);const kt=A.textures[Ot],me=kt.format,Me=kt.type;A.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+Ot);const Kt=lo(kt);if(Kt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Kt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ue=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,Ue),W.bufferData(W.PIXEL_PACK_BUFFER,It.byteLength,W.STREAM_READ),W.readPixels(V,ht,et,nt,Dt.convert(me),Dt.convert(Me),0),W.bindBuffer(W.PIXEL_PACK_BUFFER,null);const an=ut!==null?lt.get(ut).__webglFramebuffer:null;b.bindFramebuffer(W.FRAMEBUFFER,an);const je=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await Ty(W,je,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,Ue),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,It),W.bindBuffer(W.PIXEL_PACK_BUFFER,null),W.deleteBuffer(Ue),W.deleteSync(je),It}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,V=null,ht=0){const et=Math.pow(2,-ht),nt=Math.floor(A.image.width*et),It=Math.floor(A.image.height*et),Wt=V!==null?V.x:0,Ot=V!==null?V.y:0;gt.setTexture2D(A,0),W.copyTexSubImage2D(W.TEXTURE_2D,ht,0,0,Wt,Ot,nt,It),b.unbindTexture()},this.copyTextureToTexture=function(A,V,ht=null,et=null,nt=0,It=0){let Wt,Ot,Vt,kt,me,Me,Kt,Ue,an;const je=A.isCompressedTexture?A.mipmaps[It]:A.image;if(ht!==null)Wt=ht.max.x-ht.min.x,Ot=ht.max.y-ht.min.y,Vt=ht.isBox3?ht.max.z-ht.min.z:1,kt=ht.min.x,me=ht.min.y,Me=ht.isBox3?ht.min.z:0;else{const ln=Math.pow(2,-nt);Wt=Math.floor(je.width*ln),Ot=Math.floor(je.height*ln),A.isDataArrayTexture?Vt=je.depth:A.isData3DTexture?Vt=Math.floor(je.depth*ln):Vt=1,kt=0,me=0,Me=0}et!==null?(Kt=et.x,Ue=et.y,an=et.z):(Kt=0,Ue=0,an=0);const ve=Dt.convert(V.format),Sn=Dt.convert(V.type);let Yt;V.isData3DTexture?(gt.setTexture3D(V,0),Yt=W.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(gt.setTexture2DArray(V,0),Yt=W.TEXTURE_2D_ARRAY):(gt.setTexture2D(V,0),Yt=W.TEXTURE_2D),b.activeTexture(W.TEXTURE0),b.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,V.flipY),b.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),b.pixelStorei(W.UNPACK_ALIGNMENT,V.unpackAlignment);const An=b.getParameter(W.UNPACK_ROW_LENGTH),Se=b.getParameter(W.UNPACK_IMAGE_HEIGHT),Zn=b.getParameter(W.UNPACK_SKIP_PIXELS),ui=b.getParameter(W.UNPACK_SKIP_ROWS),Kn=b.getParameter(W.UNPACK_SKIP_IMAGES);b.pixelStorei(W.UNPACK_ROW_LENGTH,je.width),b.pixelStorei(W.UNPACK_IMAGE_HEIGHT,je.height),b.pixelStorei(W.UNPACK_SKIP_PIXELS,kt),b.pixelStorei(W.UNPACK_SKIP_ROWS,me),b.pixelStorei(W.UNPACK_SKIP_IMAGES,Me);const Ia=A.isDataArrayTexture||A.isData3DTexture,Be=V.isDataArrayTexture||V.isData3DTexture;if(A.isDepthTexture){const ln=lt.get(A),yi=lt.get(V),Ye=lt.get(ln.__renderTarget),Wi=lt.get(yi.__renderTarget);b.bindFramebuffer(W.READ_FRAMEBUFFER,Ye.__webglFramebuffer),b.bindFramebuffer(W.DRAW_FRAMEBUFFER,Wi.__webglFramebuffer);for(let Pi=0;Pi<Vt;Pi++)Ia&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,lt.get(A).__webglTexture,nt,Me+Pi),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,lt.get(V).__webglTexture,It,an+Pi)),W.blitFramebuffer(kt,me,Wt,Ot,Kt,Ue,Wt,Ot,W.DEPTH_BUFFER_BIT,W.NEAREST);b.bindFramebuffer(W.READ_FRAMEBUFFER,null),b.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(nt!==0||A.isRenderTargetTexture||lt.has(A)){const ln=lt.get(A),yi=lt.get(V);b.bindFramebuffer(W.READ_FRAMEBUFFER,Z),b.bindFramebuffer(W.DRAW_FRAMEBUFFER,$);for(let Ye=0;Ye<Vt;Ye++)Ia?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ln.__webglTexture,nt,Me+Ye):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,ln.__webglTexture,nt),Be?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,yi.__webglTexture,It,an+Ye):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,yi.__webglTexture,It),nt!==0?W.blitFramebuffer(kt,me,Wt,Ot,Kt,Ue,Wt,Ot,W.COLOR_BUFFER_BIT,W.NEAREST):Be?W.copyTexSubImage3D(Yt,It,Kt,Ue,an+Ye,kt,me,Wt,Ot):W.copyTexSubImage2D(Yt,It,Kt,Ue,kt,me,Wt,Ot);b.bindFramebuffer(W.READ_FRAMEBUFFER,null),b.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else Be?A.isDataTexture||A.isData3DTexture?W.texSubImage3D(Yt,It,Kt,Ue,an,Wt,Ot,Vt,ve,Sn,je.data):V.isCompressedArrayTexture?W.compressedTexSubImage3D(Yt,It,Kt,Ue,an,Wt,Ot,Vt,ve,je.data):W.texSubImage3D(Yt,It,Kt,Ue,an,Wt,Ot,Vt,ve,Sn,je):A.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,It,Kt,Ue,Wt,Ot,ve,Sn,je.data):A.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,It,Kt,Ue,je.width,je.height,ve,je.data):W.texSubImage2D(W.TEXTURE_2D,It,Kt,Ue,Wt,Ot,ve,Sn,je);b.pixelStorei(W.UNPACK_ROW_LENGTH,An),b.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Se),b.pixelStorei(W.UNPACK_SKIP_PIXELS,Zn),b.pixelStorei(W.UNPACK_SKIP_ROWS,ui),b.pixelStorei(W.UNPACK_SKIP_IMAGES,Kn),It===0&&V.generateMipmaps&&W.generateMipmap(Yt),b.unbindTexture()},this.initRenderTarget=function(A){lt.get(A).__webglFramebuffer===void 0&&gt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?gt.setTextureCube(A,0):A.isData3DTexture?gt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?gt.setTexture2DArray(A,0):gt.setTexture2D(A,0),b.unbindTexture()},this.resetState=function(){F=0,G=0,ut=null,b.reset(),Gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ia}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=we._getDrawingBufferColorSpace(t),i.unpackColorSpace=we._getUnpackColorSpace()}}const Ov={type:"change"},kp={type:"start"},DS={type:"end"},fu=new Lu,Pv=new ji,_2=Math.cos(70*wy.DEG2RAD),wn=new Q,oi=2*Math.PI,Xe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ad=1e-6;class v2 extends v1{constructor(t,i=null){super(t,i),this.state=Xe.NONE,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Jr.ROTATE,MIDDLE:Jr.DOLLY,RIGHT:Jr.PAN},this.touches={ONE:Kr.ROTATE,TWO:Kr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new Q,this._lastQuaternion=new gs,this._lastTargetPosition=new Q,this._quat=new gs().setFromUnitVectors(t.up,new Q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new uv,this._sphericalDelta=new uv,this._scale=1,this._panOffset=new Q,this._rotateStart=new ae,this._rotateEnd=new ae,this._rotateDelta=new ae,this._panStart=new ae,this._panEnd=new ae,this._panDelta=new ae,this._dollyStart=new ae,this._dollyEnd=new ae,this._dollyDelta=new ae,this._dollyDirection=new Q,this._mouse=new ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=x2.bind(this),this._onPointerDown=S2.bind(this),this._onPointerUp=M2.bind(this),this._onContextMenu=w2.bind(this),this._onMouseWheel=b2.bind(this),this._onKeyDown=T2.bind(this),this._onTouchStart=A2.bind(this),this._onTouchMove=R2.bind(this),this._onMouseDown=y2.bind(this),this._onMouseMove=E2.bind(this),this._interceptControlDown=C2.bind(this),this._interceptControlUp=D2.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Xe.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ov),this.update(),this.state=Xe.NONE}pan(t,i){this._pan(t,i),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const i=this.object.position;wn.copy(i).sub(this.target),wn.applyQuaternion(this._quat),this._spherical.setFromVector3(wn),this.autoRotate&&this.state===Xe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=oi:s>Math.PI&&(s-=oi),l<-Math.PI?l+=oi:l>Math.PI&&(l-=oi),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(wn.setFromSpherical(this._spherical),wn.applyQuaternion(this._quatInverse),i.copy(this.target).add(wn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const p=wn.length();f=this._clampDistance(p*this._scale);const m=p-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const p=new Q(this._mouse.x,this._mouse.y,0);p.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const d=new Q(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(p),this.object.updateMatrixWorld(),f=wn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(fu.origin.copy(this.object.position),fu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(fu.direction))<_2?this.object.lookAt(this.target):(Pv.setFromNormalAndCoplanarPoint(this.object.up,this.target),fu.intersectPlane(Pv,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Ad||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ad||this._lastTargetPosition.distanceToSquared(this.target)>Ad?(this.dispatchEvent(Ov),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?oi/60*this.autoRotateSpeed*t:oi/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){wn.setFromMatrixColumn(i,0),wn.multiplyScalar(-t),this._panOffset.add(wn)}_panUp(t,i){this.screenSpacePanning===!0?wn.setFromMatrixColumn(i,1):(wn.setFromMatrixColumn(i,0),wn.crossVectors(this.object.up,wn)),wn.multiplyScalar(t),this._panOffset.add(wn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;wn.copy(l).sub(this.target);let c=wn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=i-s.top,f=s.width,p=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/p)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(oi*this._rotateDelta.x/i.clientHeight),this._rotateUp(oi*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(oi*this._rotateDelta.x/i.clientHeight),this._rotateUp(oi*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(t.pageX+i.x)*.5,p=(t.pageY+i.y)*.5;this._updateZoomParameters(f,p)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new ae,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function S2(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function x2(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function M2(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(DS),this.state=Xe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function y2(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Jr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=Xe.DOLLY;break;case Jr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Xe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Xe.ROTATE}break;case Jr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Xe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Xe.PAN}break;default:this.state=Xe.NONE}this.state!==Xe.NONE&&this.dispatchEvent(kp)}function E2(r){switch(this.state){case Xe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case Xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case Xe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function b2(r){this.enabled===!1||this.enableZoom===!1||this.state!==Xe.NONE||(r.preventDefault(),this.dispatchEvent(kp),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(DS))}function T2(r){this.enabled!==!1&&this._handleKeyDown(r)}function A2(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Kr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=Xe.TOUCH_ROTATE;break;case Kr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=Xe.TOUCH_PAN;break;default:this.state=Xe.NONE}break;case 2:switch(this.touches.TWO){case Kr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=Xe.TOUCH_DOLLY_PAN;break;case Kr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=Xe.TOUCH_DOLLY_ROTATE;break;default:this.state=Xe.NONE}break;default:this.state=Xe.NONE}this.state!==Xe.NONE&&this.dispatchEvent(kp)}function R2(r){switch(this._trackPointer(r),this.state){case Xe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case Xe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case Xe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case Xe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=Xe.NONE}}function w2(r){this.enabled!==!1&&r.preventDefault()}function C2(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function D2(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Pu extends gn{constructor(t,i={}){super(t),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this._reflectionCameras=new WeakMap;const s=this,l=i.color!==void 0?new le(i.color):new le(8355711),c=i.textureWidth||512,f=i.textureHeight||512,p=i.clipBias||0,m=i.shader||Pu.ReflectorShader,d=i.multisample!==void 0?i.multisample:4,_=new ji,v=new Q,g=new Q,y=new Q,T=new Je,U=new Q(0,0,-1),M=new on,S=new Q,P=new Q,I=new on,D=new Je,N=new Oi(c,f,{samples:d,type:ki}),C=new Pn({name:m.name!==void 0?m.name:"unspecified",uniforms:vS.clone(m.uniforms),fragmentShader:m.fragmentShader,vertexShader:m.vertexShader});C.uniforms.tDiffuse.value=N.texture,C.uniforms.color.value=l,C.uniforms.textureMatrix.value=D,this.material=C,this.onBeforeRender=function(R,E,O){const H=this.getReflectionCamera(O);if(g.setFromMatrixPosition(s.matrixWorld),y.setFromMatrixPosition(O.matrixWorld),T.extractRotation(s.matrixWorld),v.set(0,0,1),v.applyMatrix4(T),S.subVectors(g,y),S.dot(v)>0===!0&&this.forceUpdate===!1)return;S.reflect(v).negate(),S.add(g),T.extractRotation(O.matrixWorld),U.set(0,0,-1),U.applyMatrix4(T),U.add(y),P.subVectors(g,U),P.reflect(v).negate(),P.add(g),H.position.copy(S),H.up.set(0,1,0),H.up.applyMatrix4(T),H.up.reflect(v),H.lookAt(P),H.far=O.far,H.updateMatrixWorld(),H.projectionMatrix.copy(O.projectionMatrix),D.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),D.multiply(H.projectionMatrix),D.multiply(H.matrixWorldInverse),D.multiply(s.matrixWorld),_.setFromNormalAndCoplanarPoint(v,g),_.applyMatrix4(H.matrixWorldInverse),M.set(_.normal.x,_.normal.y,_.normal.z,_.constant);const q=H.projectionMatrix;H.isOrthographicCamera?(I.x=(Math.sign(M.x)+q.elements[8])/q.elements[0],I.y=(Math.sign(M.y)+q.elements[9])/q.elements[5],I.z=-O.far,I.w=1):(I.x=(Math.sign(M.x)+q.elements[8])/q.elements[0],I.y=(Math.sign(M.y)+q.elements[9])/q.elements[5],I.z=-1,I.w=(1+q.elements[10])/q.elements[14]),M.multiplyScalar(2/M.dot(I)),q.elements[2]=M.x,q.elements[6]=M.y,H.isOrthographicCamera?(q.elements[10]=M.z-p,q.elements[14]=M.w-1):(q.elements[10]=M.z+1-p,q.elements[14]=M.w),s.visible=!1;const ct=R.getRenderTarget(),Z=R.xr.enabled,$=R.shadowMap.autoUpdate;R.xr.enabled=!1,R.shadowMap.autoUpdate=!1,R.setRenderTarget(N),R.state.buffers.depth.setMask(!0),R.autoClear===!1&&R.clear(),R.render(E,H),R.xr.enabled=Z,R.shadowMap.autoUpdate=$,R.setRenderTarget(ct);const F=O.viewport;F!==void 0&&R.state.viewport(F),s.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return N},this.dispose=function(){N.dispose(),s.material.dispose()},this.getReflectionCamera=function(R){let E=this._reflectionCameras.get(R);return E===void 0&&(E=R.clone(),this._reflectionCameras.set(R,E)),E}}}Pu.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};const at={asphalt:[.1,.11,.13],sidewalk:[.3,.31,.32],curb:[.5,.51,.51],roadLineYellow:[.68,.57,.2],roadLineWhite:[.62,.63,.61],crosswalk:[.6,.61,.58],drain:[.16,.17,.19],drainGrate:[.3,.31,.33],basePlinth:[.13,.13,.16],baseEdge:[.15,.15,.17],wallCream:[.78,.77,.73],wallShade:[.78,.78,.76],wallTrim:[.82,.82,.79],roofGrey:[.16,.17,.2],frame:[.86,.87,.86],frameDark:[.45,.47,.5],glass:[.62,.78,.86],kickPlate:[.24,.26,.3],awningBlue:[.16,.36,.66],awningWhite:[.94,.94,.9],signGreen:[.13,.55,.36],signBlue:[.12,.32,.62],signWhite:[.97,.97,.95],neonWarm:[1,.86,.58],neonCool:[.62,.86,1],floorTile:[.78,.77,.74],floorGuide:[.2,.6,.85],shelfWhite:[.84,.84,.82],shelfGrey:[.72,.73,.74],counter:[.78,.77,.73],steel:[.68,.71,.74],steelDark:[.46,.49,.53],doorGlass:[.48,.63,.7],backWall:[.72,.71,.68],locker:[.7,.72,.73],vendingWhite:[.94,.94,.92],vendingBlue:[.15,.36,.68],vendingRed:[.78,.2,.22],bikeRed:[.7,.2,.22],bikeTeal:[.2,.5,.55],bikeYellow:[.88,.76,.28],tire:[.21,.21,.23],poleConcrete:[.56,.57,.57],wire:[.08,.08,.09],binGreen:[.18,.32,.24],binGrey:[.4,.41,.42],umbrellaRed:[.72,.22,.26],umbrellaNavy:[.16,.2,.36],umbrellaWhite:[.85,.85,.82],signBluePlate:[.16,.4,.66],signRedPlate:[.76,.2,.2],signWhitePlate:[.92,.92,.9],guardrail:[.68,.7,.7],acUnit:[.66,.67,.68],posterPink:[.92,.5,.62],posterYellow:[.95,.8,.35],posterBlue:[.36,.6,.85],lampWarm:[1,.85,.6]};function Cu(r,t){return[Math.max(0,Math.min(1,r[0]*t)),Math.max(0,Math.min(1,r[1]*t)),Math.max(0,Math.min(1,r[2]*t))]}function Xr(){return{positions:[],normals:[],uvs:[],colors:[],oPositions:[],oNormals:[],oColors:[]}}const tn=1/Math.sqrt(3);function Rd(r){return r<=.04045?r/12.92:Math.pow((r+.055)/1.055,2.4)}function Wr(r,t,i,s,l,c,f,p,m,d,_,v,g,y,T,U,M,S,P){r.positions.push(t[0],t[1],t[2],i[0],i[1],i[2],s[0],s[1],s[2],l[0],l[1],l[2]);for(let I=0;I<4;I++)r.normals.push(c[0],c[1],c[2]);r.uvs.push(f[0],f[1],p[0],p[1],m[0],m[1],d[0],d[1]);for(let I=0;I<4;I++)r.colors.push(_[0],_[1],_[2]);r.oPositions.push(v[0],v[1],v[2],g[0],g[1],g[2],y[0],y[1],y[2],T[0],T[1],T[2]),r.oNormals.push(U[0],U[1],U[2],M[0],M[1],M[2],S[0],S[1],S[2],P[0],P[1],P[2]);for(let I=0;I<4;I++)r.oColors.push(_[0]*.25,_[1]*.25,_[2]*.25)}function Y(r,t,i,s,l=.016,c){const f=c??new Set,[p,m,d]=[Math.min(t[0],i[0]),Math.min(t[1],i[1]),Math.min(t[2],i[2])],[_,v,g]=[Math.max(t[0],i[0]),Math.max(t[1],i[1]),Math.max(t[2],i[2])],y=[Rd(s[0]),Rd(s[1]),Rd(s[2])],T=Math.max(l,.005),U=[p-T*tn,m-T*tn,d-T*tn],M=[_+T*tn,m-T*tn,d-T*tn],S=[_+T*tn,v+T*tn,d-T*tn],P=[p-T*tn,v+T*tn,d-T*tn],I=[p-T*tn,m-T*tn,g+T*tn],D=[_+T*tn,m-T*tn,g+T*tn],N=[_+T*tn,v+T*tn,g+T*tn],C=[p-T*tn,v+T*tn,g+T*tn],R=(E,O,H)=>[E*tn,O*tn,H*tn];f.has("+y")||Wr(r,[p,v,d],[p,v,g],[_,v,g],[_,v,d],[0,1,0],[p,d],[p,g],[_,g],[_,d],y,P,C,N,S,R(-1,1,-1),R(-1,1,1),R(1,1,1),R(1,1,-1)),f.has("-y")||Wr(r,[p,m,g],[p,m,d],[_,m,d],[_,m,g],[0,-1,0],[p,g],[p,d],[_,d],[_,g],y,I,U,M,D,R(-1,-1,1),R(-1,-1,-1),R(1,-1,-1),R(1,-1,1)),f.has("+x")||Wr(r,[_,m,g],[_,m,d],[_,v,d],[_,v,g],[1,0,0],[g,m],[d,m],[d,v],[g,v],y,D,M,S,N,R(1,-1,1),R(1,-1,-1),R(1,1,-1),R(1,1,1)),f.has("-x")||Wr(r,[p,m,d],[p,m,g],[p,v,g],[p,v,d],[-1,0,0],[d,m],[g,m],[g,v],[d,v],y,U,I,C,P,R(-1,-1,-1),R(-1,-1,1),R(-1,1,1),R(-1,1,-1)),f.has("+z")||Wr(r,[p,m,g],[_,m,g],[_,v,g],[p,v,g],[0,0,1],[p,m],[_,m],[_,v],[p,v],y,I,D,N,C,R(-1,-1,1),R(1,-1,1),R(1,1,1),R(-1,1,1)),f.has("-z")||Wr(r,[_,m,d],[p,m,d],[p,v,d],[_,v,d],[0,0,-1],[_,m],[p,m],[p,v],[_,v],y,M,U,P,S,R(1,-1,-1),R(-1,-1,-1),R(-1,1,-1),R(1,1,-1))}function Ca(r,t,i,s,l=0){Y(r,t,i,s,l,new Set(["-y","+x","-x","+z","-z"]))}function Yr(r){const t=new On;t.setAttribute("position",new un(r.positions,3)),t.setAttribute("normal",new un(r.normals,3)),t.setAttribute("uv",new un(r.uvs,2)),t.setAttribute("color",new un(r.colors,3));const i=r.positions.length/12,s=new Uint32Array(i*6);for(let l=0;l<i;l++){const c=l*4,f=l*6;s[f]=c,s[f+1]=c+1,s[f+2]=c+2,s[f+3]=c,s[f+4]=c+2,s[f+5]=c+3}return t.setIndex(new Wn(s,1)),t.computeBoundingSphere(),t}function U2(r){const t=new On;t.setAttribute("position",new un(r.oPositions,3)),t.setAttribute("normal",new un(r.oNormals,3)),t.setAttribute("color",new un(r.oColors,3));const i=r.oPositions.length/12,s=new Uint32Array(i*6);for(let l=0;l<i;l++){const c=l*4,f=l*6;s[f]=c,s[f+1]=c+1,s[f+2]=c+2,s[f+3]=c,s[f+4]=c+2,s[f+5]=c+3}return t.setIndex(new Wn(s,1)),t.computeBoundingSphere(),t}const Pt={x0:-5.4,x1:2.6,z0:-6.2,z1:-2.6,wallTop:3.14,signBottom:2.78,signTop:3.12,glassBottom:.55,glassTop:2.55,doorX0:-2.6,doorX1:-1.4,windowAX0:-5.16,windowAX1:-2.72,windowBX0:-1.28,windowBX1:2.36},ml=[[.82,.24,.24],[.9,.55,.2],[.93,.82,.3],[.32,.62,.34],[.26,.45,.76],[.86,.44,.62],[.93,.93,.9],[.6,.42,.28]];function Bv(r){const t=Math.sin(r*12.9898)*47453.5453;return t-Math.floor(t)}function cl(r,t,i,s,l,c,f,p,m=.72){const d=Math.max(.1,s-t),_=Math.max(.08,l-i),v=Math.max(1,Math.floor(d/.17)),g=Math.max(1,Math.floor(_/.12));for(let y=0;y<g;y++)for(let T=0;T<v;T++){if(Bv(p*31+y*7+T)>m)continue;const U=ml[Math.floor(Bv(p*17+T*5+y)*ml.length)%ml.length],M=t+(T+.15)*(d/v),S=i+(y+.2)*(_/g);Y(r,[M,c,S],[M+d/v*.72,c+f,S+_/g*.62],U,.006)}}function L2(){const r=Xr(),t=Xr(),i=Xr(),s=Xr(),l=Xr(),c=Xr(),{x0:f,x1:p,z0:m,z1:d}=Pt;Y(r,[f-.12,0,m-.12],[p+.12,.2,d+.12],at.kickPlate,.012),Y(r,[f,.2,m],[p,Pt.wallTop,m+.2],at.wallCream,.016),Y(r,[f,.2,m],[f+.2,Pt.wallTop,d],at.wallCream,.016);const _=-4.5,v=-3.4;Y(r,[p-.2,.2,m+.2],[p,.7,_],at.wallCream,.016),Y(r,[p-.2,.7,v],[p,Pt.wallTop,d],at.wallCream,.016),Y(r,[p-.2,.7,_],[p,2.45,v],at.wallCream,.016),Y(r,[p-.2,2.45,_],[p,Pt.wallTop,v],at.wallCream,.016),Y(s,[p-.16,.72,_+.06],[p-.04,2.43,v-.06],at.glass,0),Y(r,[p-.24,.64,_-.05],[p-.12,.72,v+.05],at.frameDark,.01),Y(r,[f,.2,d-.2],[p,Pt.glassBottom,d],at.kickPlate,.012),Y(r,[f,.2,d-.2],[f+.24,Pt.signBottom,d],at.wallTrim,.014),Y(r,[p-.24,.2,d-.2],[p,Pt.signBottom,d],at.wallTrim,.014),Y(r,[Pt.windowAX1,Pt.glassBottom,d-.18],[Pt.windowAX1+.12,Pt.signBottom,d],at.frame,.01),Y(r,[Pt.doorX0-.12,Pt.glassBottom,d-.2],[Pt.doorX0,Pt.signBottom,d],at.frame,.012),Y(r,[Pt.doorX1,Pt.glassBottom,d-.2],[Pt.doorX1+.12,Pt.signBottom,d],at.frame,.012),Y(r,[Pt.windowBX0-.12,Pt.glassBottom,d-.18],[Pt.windowBX0,Pt.signBottom,d],at.frame,.01),Y(r,[-.1,Pt.glassBottom,d-.18],[.02,Pt.signBottom,d],at.frame,.01),Y(r,[1.1,Pt.glassBottom,d-.18],[1.22,Pt.signBottom,d],at.frame,.01),Y(s,[Pt.windowAX0,Pt.glassBottom,d-.12],[Pt.windowAX1,Pt.glassTop,d-.04],at.glass,0),Y(s,[Pt.windowBX0,Pt.glassBottom,d-.12],[Pt.windowBX1,Pt.glassTop,d-.04],at.glass,0),Y(r,[Pt.doorX0-.12,Pt.glassTop,d-.26],[Pt.doorX1+.12,Pt.signBottom,d-.02],at.frame,.012),Y(r,[Pt.doorX0-.12,.2,d-.26],[Pt.doorX1+.12,Pt.glassBottom,d-.02],at.steelDark,.01);const g=d-.26,y=d-.2,T=(Pt.doorX0+Pt.doorX1)/2;for(const[R,E,O]of[[l,Pt.doorX0,T],[c,T,Pt.doorX1]])Y(R,[E+.03,Pt.glassBottom,g],[O-.03,Pt.glassTop,y],at.doorGlass,0),Y(R,[E+.05,1.02,y-.01],[O-.05,1.18,y+.03],[.92,.78,.24],.006),Y(R,[E+.05,2.12,y-.01],[O-.05,2.26,y+.03],[.92,.78,.24],.006);const U=[[-5.4,-4.1,at.signGreen],[-4.1,-2.5,at.signWhite],[-2.5,-.9,at.signGreen],[-.9,.7,at.signWhite],[.7,2.6,at.signGreen]];for(const[R,E,O]of U)Y(i,[R,Pt.signBottom,d-.22],[E,Pt.signTop,d-.02],O,.014);Y(i,[-4.45,Pt.signBottom+.13,d-.26],[-2.75,Pt.signTop-.11,d-.2],at.signWhite,.01),Y(i,[-4.15,Pt.signBottom+.24,d-.3],[-3.85,Pt.signTop-.23,d-.25],at.signBlue,.008),Y(r,[f-.08,Pt.signTop,m-.08],[p+.08,3.26,d+.08],at.wallTrim,.016),Y(r,[f-.02,3.26,m-.02],[p+.02,3.44,d+.02],at.roofGrey,.016),Y(r,[f-.02,3.44,m-.02],[p+.02,3.56,m+.16],[.32,.34,.38],.012),Y(r,[f-.02,3.44,d-.16],[p+.02,3.56,d+.02],[.32,.34,.38],.012),Y(r,[f-.02,3.44,m-.02],[f+.16,3.56,d+.02],[.32,.34,.38],.012),Y(r,[p-.16,3.44,m-.02],[p+.02,3.56,d+.02],[.32,.34,.38],.012),Y(r,[-.9,3.56,-5.5],[.2,4.12,-4.8],at.acUnit,.014),Y(r,[-.82,3.64,-5.42],[.12,4.04,-5.34],at.steelDark,.006),Y(r,[-.82,3.64,-4.96],[.12,4.04,-4.88],at.steelDark,.006);for(const[R,E]of[[-2.8,-5.6],[-2.3,-5.6],[1.3,-5.6]])Y(r,[R-.09,3.44,E-.09],[R+.09,3.92,E+.09],at.steel,.008),Y(r,[R-.13,3.92,E-.13],[R+.13,4.04,E+.13],at.steelDark,.008);Y(r,[-4.2,3.56,-5.6],[-3,4.24,-4.5],[.74,.76,.78],.014),Y(r,[-4.2,3.56,-5.6],[-3,3.72,-4.5],[.6,.62,.64],.012);for(const R of[-4.08,-3.12])for(const E of[-5.48,-4.62])Y(r,[R-.05,3.44,E-.05],[R+.05,3.56,E+.05],at.steelDark,.006);const M=Pt.glassTop,S=.62;for(let R=0;R<11;R++){const E=f+R*(p-f)/11,O=f+(R+1)*(p-f)/11,H=R%2===0?at.awningBlue:at.awningWhite;Y(r,[E,M,d],[O,M+.12,d+S],H,.01),Y(r,[E,M-.16,d+S-.06],[O,M,d+S],H,.01)}Y(r,[f,M+.12,d+S-.14],[p,M+.2,d+S],at.frameDark,.008),Y(r,[1.85,2.1,d+.06],[2.58,3.4,d+.62],at.frameDark,.016),Y(i,[1.88,2.15,d+.6],[2.55,3.35,d+.66],at.signGreen,.012),Y(i,[2.02,2.5,d+.65],[2.42,3,d+.7],at.signWhite,.008),Y(i,[2.02,2.6,d+.69],[2.42,2.9,d+.73],at.signBlue,.006),Y(r,[f+.3,2.05,m-.42],[f+1.1,2.6,m],at.acUnit,.014),Y(r,[f+.42,2.1,m-.44],[f+.98,2.55,m-.4],at.steelDark,.008),Y(r,[p-.42,.2,m-.16],[p-.3,3,m],at.steelDark,.008),Y(r,[p-.24,1.2,-3.1],[p-.16,1.8,-2.7],at.posterYellow,.008);const P=f+.2,I=p-.2,D=m+.2,N=d-.2,C=R=>D+R;Y(t,[P,.2,D],[I,.26,N],at.floorTile,0),Y(t,[-2.15,.26,C(.4)],[-1.75,.28,N-.1],at.floorGuide,0),Y(t,[-2.06,.26,N-.55],[-1.84,.28,N-.2],at.floorGuide,0),Y(t,[P,2.86,D],[I,2.96,N],at.wallShade,0);for(let R=0;R<4;R++){const E=P+.45+R*1.7;Y(t,[E,2.78,C(.3)],[E+.34,2.88,N-.5],at.neonWarm,0)}Y(t,[P,.26,D],[I,2.86,D+.1],at.backWall,0),Y(t,[-5.05,.26,C(.1)],[-1.9,2.1,C(.6)],at.steel,.008);for(let R=0;R<4;R++){const E=.42+R*.4;Y(t,[-5.01,E,C(.14)],[-1.94,E+.3,C(.56)],Cu(at.steelDark,1.1),0),cl(t,-4.95,C(.16),-2,C(.54),E+.02,.26,10+R,.9)}Y(t,[-5.07,2.1,C(.08)],[-1.88,2.2,C(.62)],at.neonWarm,0),Y(t,[-5.05,.26,C(.85)],[-2.9,1.75,C(1.5)],at.steel,.008),Y(t,[-5,.3,C(.89)],[-2.95,1.7,C(1.46)],[.9,.82,.68],0);for(let R=0;R<3;R++){const E=.42+R*.42;Y(t,[-4.95,E,C(.91)],[-2.95,E+.34,C(1.44)],[.96,.9,.78],0),cl(t,-4.9,C(.93),-3,C(1.42),E+.03,.28,30+R,.85)}Y(t,[-5.06,1.75,C(.83)],[-2.89,1.86,C(1.53)],at.neonWarm,0);for(let R=0;R<3;R++){const E=.6+R*.6;Y(t,[-5.15,E,C(2.2)],[-4.75,E+.1,C(3.1)],at.shelfWhite,0),cl(t,-5.13,C(2.24),-4.77,C(3.06),E+.1,.38,50+R,.6)}Y(t,[-5.18,.26,C(2.15)],[-5.1,2.4,C(3.15)],at.shelfGrey,0);for(let R=0;R<2;R++){const E=C(1+R*.8);Y(t,[-1.2,.26,E-.2],[1,2,E+.2],at.shelfGrey,0);for(let O=0;O<4;O++){const H=.42+O*.4;Y(t,[-1.14,H,E-.22],[.94,H+.08,E+.22],at.shelfWhite,0),cl(t,-1.1,E-.18,.9,E+.18,H+.08,.28,70+R*5+O,.8)}Y(t,[-1.2,2,E-.22],[1,2.1,E+.22],at.shelfWhite,0)}Y(t,[-1.2,.26,C(2.5)],[.1,1.9,C(2.95)],at.shelfGrey,0);for(let R=0;R<3;R++){const E=.5+R*.45;Y(t,[-1.14,E,C(2.52)],[.04,E+.08,C(2.93)],at.shelfWhite,0),cl(t,-1.1,C(2.56),0,C(2.89),E+.08,.32,90+R,.7)}Y(t,[.25,.26,C(2.6)],[1.1,.95,C(3.1)],at.counter,.008),Y(t,[.33,.95,C(2.66)],[1.02,1.14,C(3.04)],at.steel,.008),Y(t,[.37,1.1,C(2.7)],[.98,1.16,C(3)],[.9,.72,.5],0),Y(t,[1.25,.26,C(2.5)],[2.35,1.02,C(3.1)],at.counter,.008),Y(t,[1.33,1.02,C(2.56)],[1.77,1.14,C(2.98)],at.steelDark,.006),Y(t,[1.81,1.02,C(2.62)],[2.09,1.3,C(2.94)],[.2,.22,.26],.006),Y(t,[1.83,1.3,C(2.64)],[2.07,1.62,C(2.92)],[.16,.18,.22],.006),Y(t,[1.85,1.32,C(2.65)],[2.05,1.58,C(2.67)],at.neonCool,0),Y(t,[1.29,1.14,C(2.96)],[1.61,1.72,C(3.12)],at.steel,.006),Y(t,[1.33,1.18,C(2.98)],[1.55,1.42,C(3.02)],[.3,.2,.14],0),Y(t,[-1.35,.26,C(2.6)],[-1.17,1.5,C(3.1)],at.shelfGrey,0);for(let R=0;R<6;R++){const E=.6+R*.14,O=ml[R%ml.length];Y(t,[-1.34,E,C(2.64)],[-1.19,E+.12,C(3.06)],O,0)}Y(t,[1.25,1.2,D+.08],[1.85,2.3,D+.12],at.posterPink,0),Y(t,[1.95,1.2,D+.08],[2.4,2.3,D+.12],at.posterBlue,0),Y(t,[-1.85,1.1,D+.08],[-1.05,2.2,D+.12],at.posterYellow,0),Y(t,[1.5,.26,D+.06],[2.4,1.95,D+.5],at.locker,0);for(let R=0;R<2;R++)for(let E=0;E<3;E++)Y(t,[1.56+E*.24,.34+R*.55,D+.48],[1.76+E*.24,.86+R*.55,D+.52],Cu(at.locker,.86),0);return Y(t,[-2.2,.26,D+.06],[-1.6,2.1,D+.16],at.steelDark,0),Y(t,[-2.16,.26,D+.15],[-1.64,2.06,D+.19],[.6,.62,.64],0),Y(t,[Pt.doorX0,2.6,N-.1],[Pt.doorX1,2.7,N-.04],at.neonWarm,0),{shell:r,interior:t,neon:i,glass:s,doorLeft:l,doorRight:c}}const qt={half:7,roadSouthZ0:-.9,roadSouthZ1:3,roadEastX0:2.6,roadEastX1:5.6,walkHeight:.15,wetTop:.012},Du={x:5.85,z:.9};function wd(r){const t=Math.sin(r*91.3458)*47453.1234;return t-Math.floor(t)}function N2(){const r={positions:[],normals:[],uvs:[],colors:[],oPositions:[],oNormals:[],oColors:[]},t={positions:[],normals:[],uvs:[],colors:[],oPositions:[],oNormals:[],oColors:[]},i=[],s=qt.half,{roadSouthZ0:l,roadSouthZ1:c,roadEastX0:f,roadEastX1:p}=qt;Y(r,[-s-.28,-.55,-s-.28],[s+.28,-.14,s+.28],at.basePlinth,.02),Y(r,[-s-.12,-.14,-s-.12],[s+.12,0,s+.12],at.baseEdge,.014),Y(r,[Pt.x0,0,-s],[f,qt.walkHeight,l],at.sidewalk,.01),Y(r,[-s,0,c],[f,qt.walkHeight,s],at.sidewalk,.01),Y(r,[p,0,-s],[s,qt.walkHeight,s],at.sidewalk,.01),Y(r,[Pt.x0,0,l-.12],[f,qt.walkHeight,l],at.curb,.008),Y(r,[f-.12,0,-s],[f,qt.walkHeight,l],at.curb,.008),Y(r,[f,0,c],[p,qt.walkHeight,c+.12],at.curb,.008),Y(r,[p,0,c],[p+.12,qt.walkHeight,s],at.curb,.008),Y(r,[-s,0,c],[f,qt.walkHeight,c+.12],at.curb,.008),Y(r,[p,0,-s],[p+.12,qt.walkHeight,c],at.curb,.008),Y(t,[-s,-.06,l],[s,qt.wetTop,c],at.asphalt,0),Y(t,[f,-.06,-s],[p,qt.wetTop,s],at.asphalt,0);for(let m=0;m<9;m++){const d=-6.6+m*1.6;d>1.9&&d<2.7||Ca(r,[d,qt.wetTop+.004,.82],[d+.85,qt.wetTop+.014,.94],at.roadLineYellow,0)}Ca(r,[f+.1,qt.wetTop+.004,c-.32],[f+.24,qt.wetTop+.014,c],at.roadLineWhite,0);for(let m=0;m<6;m++){const d=-.7+m*.52;Ca(r,[d,qt.wetTop+.004,l+.16],[d+.32,qt.wetTop+.014,c-.16],at.crosswalk,0)}for(let m=0;m<5;m++){const d=.2+m*.5;Ca(r,[f+.16,qt.wetTop+.004,d],[p-.16,qt.wetTop+.014,d+.3],at.crosswalk,0)}for(let m=0;m<4;m++){const d=-6.5+m*1.5;Ca(r,[d,qt.walkHeight+.011,3.4],[d+.08,qt.walkHeight+.021,6.1],at.roadLineWhite,0)}Ca(r,[-6.5,qt.walkHeight+.011,3.4],[-5,qt.walkHeight+.021,3.48],at.roadLineWhite,0),Ca(r,[-s,.004,l+.04],[f,.028,l+.26],at.drain,0);for(let m=0;m<22;m++){const d=-6.6+m*.33;if(d>1.9)break;Ca(r,[d,.03,l+.06],[d+.24,.042,l+.24],at.drainGrate,0)}Ca(r,[f+.04,.004,-s],[f+.26,.028,l],at.drain,0),i.push([-1.9,.8,1.4,.9]),i.push([1.1,2.1,1,.7]),i.push([4.1,-2.4,1,1.3]),i.push([4.6,.9,.9,.8]),i.push([-4.2,1.9,1.3,.8]),i.push([3.8,-4.6,.9,1.2]),i.push([.1,-.4,1.1,.6]),i.push([-5.6,.7,.8,1]),Y(r,[-s,0,Pt.z0],[-6.2,.05,l],at.asphalt,0),Y(r,[-s,0,Pt.z0],[-6.05,3.6,l],[.2,.21,.24],.016);for(let m=0;m<4;m++)Y(r,[-6,1.1+m*.72,-5.6+m%2*1.8],[-5.85,1.55+m*.72,-5+m%2*1.8],[.85,.8,.62],.01);Y(r,[Pt.x0,1.9,-4.3],[Pt.x0+.14,2.2,-3.7],[.98,.82,.52],.01),Y(r,[Pt.x0+.1,1.84,-4.35],[Pt.x0+.28,2.26,-3.65],[.16,.17,.2],.01),Y(r,[-6.15,2.5,l-.06],[-5.25,2.95,l],at.frameDark,.012),Y(r,[-6.09,2.56,l-.1],[-5.31,2.89,l-.05],at.neonCool,.008),Iv(r,2.03,-5.7,at.vendingBlue),Iv(r,2.03,-4.65,at.vendingRed),hu(r,-5.85,-2.05,.18,at.bikeRed),hu(r,-5.25,-1.98,-.12,at.bikeTeal),hu(r,-6.35,-1.5,.08,at.bikeYellow),Y(r,[Pt.doorX0-.15,qt.walkHeight,Pt.z1+.12],[Pt.doorX1+.15,qt.walkHeight+.09,Pt.z1+.62],[.4,.43,.48],.008),Y(r,[Pt.doorX0-.05,qt.walkHeight+.09,Pt.z1+.18],[Pt.doorX1+.05,qt.walkHeight+.11,Pt.z1+.56],[.55,.58,.63],.006),P2(r,.55,-1.62),Fv(r,-5.05,-1.32,at.binGreen),Fv(r,-5.05,-1,at.binGrey),du(r,2.2,-1.2),du(r,-6.3,3.7),du(r,5.9,-1),du(r,5.75,5),B2(r,Du.x,Du.z),zv(r,6.4,-4.2),zv(r,6.4,2.2);for(const m of[4.42,4.76,5.1])for(let d=0;d<8;d++){const _=d/8,v=(d+1)/8,g=y=>Math.sin(y*Math.PI)*.28;Y(r,[6.32,m-g(_),-4.2+_*6.4],[6.48,m-g(v)+.02,-4.2+v*6.4],at.wire,0)}Dd(r,2.25,-2.2,at.signRedPlate,.62),Dd(r,5.9,-1.9,at.signBluePlate,.5),Dd(r,-4.3,-1.15,at.signWhitePlate,.44),Hv(r,-6.1,l+.16,-5.35,l+.16),Hv(r,-6.4,c-.16,-1.4,c-.16),I2(r,1.55,-1.3,.85),Y(r,[Pt.x1,2.4,-4.6],[Pt.x1+.36,2.95,-3.85],at.acUnit,.012),Y(r,[Pt.x1+.04,2.48,-4.55],[Pt.x1+.32,2.88,-3.9],at.steelDark,.006),Y(r,[p+.3,0,-s],[s,3.4,-1.8],[.24,.25,.28],.016),Y(r,[p+.3,3.4,-s],[s,3.62,-1.8],[.3,.31,.34],.016),Y(r,[p+.45,0,2.2],[s,1.9,4.3],[.22,.23,.26],.016),Y(r,[p+.45,1.9,2.2],[s,2.06,4.3],[.3,.31,.34],.014);for(let m=0;m<4;m++)Y(r,[p+.3,.9+m*.7,-3.2],[s-.4,1.32+m*.7,-2.5],[.84,.8,.62],.01);for(let m=0;m<2;m++)Y(r,[p+.45,.8+m*.66,3.5],[s-.55,1.14+m*.66,3.95],[.8,.78,.64],.01);for(let m=0;m<6;m++){const d=4.5+m*.45;Y(r,[p+.5,qt.walkHeight,d],[p+.62,qt.walkHeight+.85,d+.1],at.guardrail,.008)}Y(r,[p+.5,qt.walkHeight+.6,4.5],[p+.62,qt.walkHeight+.72,7],at.guardrail,.008),Y(r,[p+.38,0,-1.7],[p+.48,3.4,-1.6],at.steelDark,.008),Y(r,[p+.32,1.5,-.7],[p+.38,2.1,-.3],at.posterBlue,.008),Cd(r,-6.1,4.9,0,[.88,.9,.92]),Cd(r,-4.6,4.9,0,[.4,.5,.72]),Cd(r,-3.1,4.9,0,[.8,.28,.25]);for(let m=0;m<5;m++)hu(r,-1.9+m*.55,5.4,1.57,[.42,.52,.6]);Y(r,[-2.1,qt.walkHeight,5.02],[-.2,qt.walkHeight+.12,5.12],at.steelDark,.008);for(let m=0;m<8;m++){const d=-6.6+m*1.1+wd(m)*.4,_=6.5+wd(m+9)*.4,v=.3+wd(m+3)*.22;Y(r,[d-v,qt.walkHeight,_-v],[d+v,qt.walkHeight+v*1.4,_+v],[.19,.32,.21],.012)}Y(r,[-s,qt.walkHeight,6.9],[f,qt.walkHeight+.42,7.06],[.42,.43,.44],.012),Y(r,[-.2,qt.walkHeight,6.4],[1.2,qt.walkHeight+.1,6.75],[.55,.42,.3],.01),Y(r,[-.2,qt.walkHeight+.1,6.62],[1.2,qt.walkHeight+.52,6.75],[.55,.42,.3],.01);for(const m of[-.05,.95])Y(r,[m-.05,qt.walkHeight,6.42],[m+.05,qt.walkHeight+.12,6.7],at.steelDark,.006);return O2(r,1.7,3.75),{builder:r,wet:t,puddles:i}}function O2(r,t,i){for(const f of[-1/2+.06,1/2-.06])Y(r,[t+f-.05,qt.walkHeight,i-.5/2],[t+f+.05,qt.walkHeight+2.05,i-.5/2+.1],at.steelDark,.008),Y(r,[t+f-.05,qt.walkHeight,i+.5/2-.1],[t+f+.05,qt.walkHeight+2.05,i+.5/2],at.steelDark,.008);Y(r,[t-1/2-.08,qt.walkHeight+2.05,i-.5/2-.08],[t+1/2+.08,qt.walkHeight+2.05+.1,i+.5/2+.08],[.34,.36,.4],.012),Y(r,[t-1/2,qt.walkHeight+.2,i-.5/2],[t+1/2,qt.walkHeight+2.05-.15,i-.5/2+.08],[.16,.2,.26],.01),Y(r,[t-1/2+.08,qt.walkHeight+.3,i-.5/2-.03],[t+1/2-.08,qt.walkHeight+2.05-.25,i-.5/2+.01],[.95,.88,.7],.006),Y(r,[t-1/2+.14,qt.walkHeight+.38,i-.5/2-.05],[t+.02,qt.walkHeight+2.05-.33,i-.5/2-.02],at.posterPink,.004),Y(r,[t-1/2,qt.walkHeight+.2,i+.5/2-.08],[t+1/2,qt.walkHeight+2.05-.15,i+.5/2],[.16,.2,.26],.01),Y(r,[t-1/2+.08,qt.walkHeight+.3,i+.5/2-.01],[t+1/2-.08,qt.walkHeight+2.05-.25,i+.5/2+.03],[.95,.88,.7],.006),Y(r,[t-1/2+.14,qt.walkHeight+.38,i+.5/2+.02],[t+.02,qt.walkHeight+2.05-.33,i+.5/2+.05],at.posterBlue,.004),Y(r,[t+.06,qt.walkHeight+.44,i-.5/2-.05],[t+1/2-.14,qt.walkHeight+2.05-.4,i-.5/2-.02],at.posterBlue,.004),Y(r,[t-1/2+.1,qt.walkHeight+.42,i+.02],[t+1/2-.1,qt.walkHeight+.5,i+.3],[.5,.4,.3],.008)}function Iv(r,t,i,s){Y(r,[t,.15,i-.95/2],[t+.52,.15+1.92,i+.95/2],at.vendingWhite,.014),Y(r,[t+.52-.04,.35,i-.95/2+.08],[t+.52+.02,.35+1.92-.45,i+.95/2-.08],[.95,.88,.72],.008);for(let p=0;p<4;p++)for(let m=0;m<5;m++){const d=t+.52-.02,_=i-.95/2+.14+m*.16,v=.45+p*.34,g=[[.85,.25,.25],[.3,.6,.8],[.95,.8,.3],[.4,.7,.4],[.9,.5,.7]];Y(r,[d,v,_],[d+.05,v+.24,_+.12],g[(p*5+m)%5],.004)}Y(r,[t+.52,1.62,i-.95/2+.06],[t+.52+.03,1.86,i+.95/2-.06],s,.01),Y(r,[t,.15,i-.95/2-.03],[t+.52,.32,i+.95/2+.03],s,.01),Y(r,[t-.02,.16,i-.95/2+.1],[t+.06,.3,i+.95/2-.1],at.steelDark,.006)}function hu(r,t,i,s,l){for(const d of[-.52,.52]){const _=t+Math.cos(s)*d,v=i+Math.sin(s)*d;for(let g=0;g<20;g++){const y=g/20*Math.PI*2,T=_+Math.cos(y)*.34,U=v+Math.sin(y)*.34,M=.15+.34+Math.sin(y)*.34;Y(r,[T-.05,M-.05,U-.05],[T+.05,M+.05,U+.05],at.tire,.003)}Y(r,[_-.04,.15+.34-.04,v-.04],[_+.04,.15+.34+.04,v+.04],at.steelDark,.004)}const p=t+Math.cos(s)*.1,m=i+Math.sin(s)*.1;Y(r,[p-.45,.15+.34+.02,m-.035],[p+.3,.15+.34+.12,m+.035],l,.006),Y(r,[p-.08,.15+.34+.1,m-.035],[p+.06,.15+.34+.75,m+.035],l,.006),Y(r,[p-.42,.15+.34+.6,m-.03],[p-.3,.15+.34+.72,m+.03],at.steelDark,.005),Y(r,[p-.12,.15+.34+.72,m-.22],[p-.04,.15+.34+.8,m+.22],at.steelDark,.005),Y(r,[p-.3,.15+.34+.76,m-.08],[p-.14,.15+.34+.84,m+.08],[.26,.26,.3],.005),Y(r,[p+.24,.15+.34+.24,m-.16],[p+.52,.15+.34+.56,m+.16],at.shelfGrey,.006)}function Cd(r,t,i,s,l){const c=Math.cos(s),f=Math.sin(s),p=(v,g)=>[t+v*c-g*f,i+v*f+g*c],m=.68,d=1.6,_=(v,g,y,T,U,M,S)=>{const[P,I]=p(v,g),[D,N]=p(y,T);Y(r,[Math.min(P,D),U,Math.min(I,N)],[Math.max(P,D),M,Math.max(I,N)],S,.012)};_(-m,-d,m,d,.32,.54,Cu(l,.62)),_(-m,-d,m,d,.54,1,l),_(-m+.04,-d+.1,m-.04,-d+.9,1,1.12,l),_(-m+.16,-1.02,m-.16,.62,1,1.08,l),_(-m+.13,-.9,m-.13,.5,1.08,1.42,l),_(-m+.11,-.82,m-.11,.42,1.16,1.34,[.14,.2,.28]),_(-m+.15,-.78,m-.15,.38,1.42,1.48,l);for(const v of[-m-.01,m-.13])for(const g of[-1,.62]){const[y,T]=p(v,g);Y(r,[y,.13,T-.32],[y+.14,.46,T+.32],at.tire,.006)}_(-m+.12,d-.06,m-.12,d+.02,.68,.84,[.96,.94,.82]),_(-m+.12,-d-.02,m-.12,-d+.06,.68,.84,[.85,.2,.18])}function P2(r,t,i){Y(r,[t-.22,.15,i-.22],[t+.22,.28,i+.22],at.steelDark,.008);const s=[at.umbrellaRed,at.umbrellaNavy,at.umbrellaWhite,at.umbrellaRed];for(let l=0;l<4;l++){const c=l/4*Math.PI*2,f=t+Math.cos(c)*.11,p=i+Math.sin(c)*.11;Y(r,[f-.045,.28,p-.045],[f+.045,.9,p+.045],at.steelDark,.005),Y(r,[f-.06,.8,p-.06],[f+.06,1.06,p+.06],s[l],.006)}}function Fv(r,t,i,s){Y(r,[t-.22,.15,i-.22],[t+.22,.78,i+.22],s,.01),Y(r,[t-.25,.78,i-.25],[t+.25,.88,i+.25],Cu(s,.8),.01),Y(r,[t-.12,.88,i-.12],[t+.12,.94,i+.12],[.1,.11,.12],.006)}function du(r,t,i){Y(r,[t-.09,.15,i-.09],[t+.09,3.95,i+.09],at.poleConcrete,.012),Y(r,[t-.08,3.5,i-.08],[t+.08,3.95,i+.08],at.steelDark,.01),Y(r,[t-.46,3.85,i-.18],[t+.1,4.02,i+.18],at.steelDark,.01),Y(r,[t-.48,3.72,i-.16],[t-.28,3.85,i+.16],at.lampWarm,.008),Y(r,[t-.2,.15,i-.2],[t+.2,.3,i+.2],at.steelDark,.008)}function B2(r,t,i){Y(r,[t-.1,.15,i-.1],[t+.1,3,i+.1],at.poleConcrete,.012),Y(r,[t-.22,2.3,i-.18],[t+.22,3.05,i+.18],[.16,.17,.19],.012),Y(r,[t-.16,2.95,i-.14],[t+.16,3.1,i+.14],at.steelDark,.008);for(let s=0;s<3;s++){const l=2.74-s*.18;Y(r,[t-.08,l,i+.14],[t+.08,l+.14,i+.2],[.07,.08,.09],.004)}}function zv(r,t,i){Y(r,[t-.14,.15,i-.14],[t+.14,5.4,i+.14],at.poleConcrete,.012);for(let s=0;s<3;s++){const l=4.4+s*.34;Y(r,[t-.5,l,i-.05],[t+.5,l+.08,i+.05],at.poleConcrete,.008);for(const c of[-1,1])Y(r,[t+c*.42-.05,l-.12,i-.05],[t+c*.42+.05,l+.2,i+.05],[.3,.42,.5],.005)}Y(r,[t-.18,.15,i-.18],[t+.18,.4,i+.18],[.4,.42,.44],.008)}function Dd(r,t,i,s,l){Y(r,[t-.05,.15,i-.05],[t+.05,2.1,i+.05],at.steelDark,.008),Y(r,[t-.04,1.85,i-.04],[t+.04,2.1,i+.04],at.steelDark,.006),Y(r,[t-l/2,1.95,i-.04],[t+l/2,1.95+l*.72,i+.04],s,.01),Y(r,[t-l/2+.06,2.05,i+.03],[t+l/2-.06,2.05+l*.5,i+.05],at.signWhitePlate,.006)}function Hv(r,t,i,s,l){const c=Math.hypot(s-t,l-i),f=Math.max(1,Math.round(c/.5));for(let p=0;p<=f;p++){const m=p/f,d=t+(s-t)*m,_=i+(l-i)*m;Y(r,[d-.05,.15,_-.05],[d+.05,.95,_+.05],at.guardrail,.008)}Y(r,[t-.04,.75,i-.04],[s+.04,.9,l+.04],at.guardrail,.008)}function I2(r,t,i,s){Y(r,[t-.05,s-.7,i-.06],[t+.05,s+.7,i+.02],[.3,.34,.38],.01),Y(r,[t-.52,s-.72,i-.08],[t+.52,s+.72,i+.04],[.22,.25,.3],.01);const l=[at.posterPink,at.posterYellow,at.posterBlue,at.signWhitePlate];for(let c=0;c<4;c++){const f=t-.44+c%2*.46,p=s-.58+Math.floor(c/2)*.58;Y(r,[f,p,i+.04],[f+.4,p+.48,i+.07],l[c],.004)}}let hs=null;function F2(){if(hs)return hs;const r=new Uint8Array([70,140,210,255]);return hs=new dS(r,4,1,Cp),hs.minFilter=Cn,hs.magFilter=Cn,hs.generateMipmaps=!1,hs.needsUpdate=!0,hs}function Ud(r={}){return new c1({color:16777215,vertexColors:!0,gradientMap:F2(),emissive:new le(r.emissive??0),emissiveIntensity:r.emissiveIntensity??1,transparent:r.transparent??!1,opacity:r.opacity??1,side:r.side??ms})}function z2(){return new Pn({vertexShader:`
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      precision highp float;
      uniform vec3 uInk;
      void main() {
        gl_FragColor = vec4(uInk, 1.0);
      }
    `,uniforms:{uInk:{value:new le(.06,.06,.09)}},side:Yn,depthWrite:!1})}function Gv(r,t,i=0){return new Pn({uniforms:{uTime:{value:0},uTint:{value:r},uOpacity:{value:t},uSeed:{value:i}},vertexShader:`
      varying vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,fragmentShader:`
      precision highp float;
      uniform float uTime;
      uniform vec3 uTint;
      uniform float uOpacity;
      uniform float uSeed;
      varying vec3 vWorld;

      void main() {
        float x = (vWorld.x + vWorld.z) * 16.0;
        float column = floor(x);
        float seed = fract(sin(column * 127.1 + uSeed) * 43758.5453);
        float speed = 0.9 + seed * 1.8;
        float y = vWorld.y * 2.4 + uTime * speed * 2.0;
        float f = fract(y);
        float head = smoothstep(0.86, 1.0, f);
        float tail = smoothstep(0.0, 0.55, f) * 0.32;
        float streak = (head + tail) * (0.35 + seed * 0.65);

        vec2 bead = floor(vec2(x, vWorld.y * 9.0));
        float bseed = fract(sin(dot(bead, vec2(41.3, 289.1))) * 24634.6345);
        float beads = step(0.9, bseed) * 0.22;

        float wet = clamp(streak + beads, 0.0, 1.0);
        vec3 color = mix(uTint, vec3(0.93, 0.97, 1.0), wet * 0.2);
        float alpha = clamp(uOpacity + wet * 0.12, 0.0, 1.0);
        gl_FragColor = vec4(color, alpha);
      }
    `,transparent:!0,depthWrite:!1,side:ta})}function H2(){return new Pn({uniforms:{uBrightness:{value:1}},vertexShader:`
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
        float facing = 0.74 + 0.26 * abs(vNormal.z);
        gl_FragColor = vec4(vColor * uBrightness * facing, 1.0);
      }
    `,vertexColors:!0})}function G2(r,t){return new Pn({uniforms:{uTop:{value:r},uBottom:{value:t}},vertexShader:`
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
    `,side:Yn,depthWrite:!1})}function V2(r,t,i,s,l){return new Pn({uniforms:{uCenter:{value:r},uRadius:{value:t},uColor:{value:i},uHalf:{value:s},uIntensity:{value:l}},vertexShader:`
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
        float a = smoothstep(uRadius, uRadius * 0.12, d);
        float edge = min(uHalf - abs(vWorld.x), uHalf - abs(vWorld.y));
        a *= smoothstep(0.0, 0.7, edge);
        if (a < 0.004) discard;
        gl_FragColor = vec4(uColor * a * uIntensity, a);
      }
    `,transparent:!0,depthWrite:!1,blending:_l})}function k2(){const t=document.createElement("canvas");t.width=128,t.height=128;const i=t.getContext("2d");if(!i)throw new Error("2D canvas context is unavailable");const s=i.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.3,"rgba(255,246,220,0.55)"),s.addColorStop(1,"rgba(255,240,200,0)"),i.fillStyle=s,i.fillRect(0,0,128,128);const l=new i1(t);return l.colorSpace=li,l}const X2=`
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
`,W2=`
  precision highp float;
  uniform vec3 uColor;
  varying float vFade;
  void main() {
    gl_FragColor = vec4(uColor, vFade * 0.24);
  }
`;function Y2(r,t,i){const s=new Float32Array(t*2*3),l=new Float32Array(t*2),c=new Float32Array(t*2);for(let U=0;U<t;U++){const M=(Math.random()*2-1)*r.half,S=(Math.random()*2-1)*r.half,P=Math.random();for(let I=0;I<2;I++){const D=(U*2+I)*3;s[D]=M,s[D+1]=0,s[D+2]=S,l[U*2+I]=P,c[U*2+I]=I}}const f=new On;f.setAttribute("position",new Wn(s,3)),f.setAttribute("aSeed",new Wn(l,1)),f.setAttribute("aEnd",new Wn(c,1));const p=new Pn({uniforms:{uTime:{value:0},uHeight:{value:r.height},uSpeed:{value:11},uColor:{value:i}},vertexShader:X2,fragmentShader:W2,transparent:!0,depthWrite:!1,blending:_l}),m=new e1(f,p);m.frustumCulled=!1;const d=90,_=new Float32Array(d*3),v=new Float32Array(d);for(let U=0;U<d;U++)_[U*3]=-6.1+Math.random()*8.2,_[U*3+1]=2.4+Math.random()*.6,_[U*3+2]=-3+Math.random()*.1,v[U]=1.8+Math.random()*1.4;const g=new On;g.setAttribute("position",new Wn(_,3));const y=new pS({color:13624565,size:.05,transparent:!0,opacity:.75,depthWrite:!1}),T=new n1(g,y);return T.frustumCulled=!1,{lines:m,drips:T,update:(U,M)=>{p.uniforms.uTime.value=U;const S=g.getAttribute("position"),P=S.array;for(let I=0;I<d;I++)P[I*3+1]-=v[I]*M,P[I*3+1]<.15&&(P[I*3+1]=2.4+Math.random()*.6,P[I*3]=-6.1+Math.random()*8.2);S.needsUpdate=!0},dispose:()=>{f.dispose(),p.dispose(),g.dispose(),y.dispose()}}}const q2=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Z2=`
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
`;function K2(r){const t=new fl,i=[];return r.forEach(([s,l,c,f],p)=>{const m=new Pn({uniforms:{uTime:{value:0},uDeep:{value:new le(.04,.05,.08)},uSky:{value:new le(.16,.2,.3)},uSeed:{value:p*1.7}},vertexShader:q2,fragmentShader:Z2,transparent:!0,depthWrite:!1});i.push(m);const d=new gn(new zp(1,28),m);d.rotation.x=-Math.PI/2,d.scale.set(c,f,1),d.position.set(s,.026,l),d.renderOrder=4,t.add(d)}),{mesh:t,update:s=>{for(const l of i)l.uniforms.uTime.value=s},dispose:()=>{t.traverse(s=>{const l=s;l.geometry&&l.geometry.dispose()});for(const s of i)s.dispose()}}}const qr={fov:33,azimuth:.68,elevation:.42,distance:30,target:new Q(-.2,.7,-.3)};function Q2(r,t,i,s){const l=Math.cos(i)*s;return new Q(r.x+l*Math.sin(t),r.y+Math.sin(i)*s,r.z+l*Math.cos(t))}function J2(){const r=Ld.useRef(null);return Ld.useEffect(()=>{const t=r.current;if(!t)return;const i=new g2({antialias:!0,powerPreference:"high-performance"});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(t.clientWidth,t.clientHeight),i.outputColorSpace=li,i.toneMapping=Tp,i.toneMappingExposure=1.45,i.shadowMap.enabled=!0,i.shadowMap.type=dl,t.appendChild(i.domElement);const s=new Vy;s.background=new le(527380),s.fog=new Bp(659480,26,62);const l=new xi(qr.fov,t.clientWidth/t.clientHeight,.1,200);l.position.copy(Q2(qr.target,qr.azimuth,qr.elevation,qr.distance));const c=new v2(l,i.domElement);c.target.copy(qr.target),c.enableDamping=!0,c.dampingFactor=.07,c.rotateSpeed=.7,c.zoomSpeed=.9,c.minDistance=5,c.maxDistance=46,c.minPolarAngle=.12,c.maxPolarAngle=1.46,c.update();const f=new gn(new Hp(80,24,16),G2(new le(461330),new le(1778739)));f.renderOrder=-10,s.add(f);const p=new m1(11060458,1.4);p.position.set(8,19,12),p.castShadow=!0,p.shadow.mapSize.set(2048,2048),p.shadow.camera.left=-10,p.shadow.camera.right=10,p.shadow.camera.top=10,p.shadow.camera.bottom=-10,p.shadow.camera.near=2,p.shadow.camera.far=60,p.shadow.bias=-.0028,s.add(p),s.add(new h1(4019576,1053725,1.6));const m=new Hr(16766624,16,4.6,2);m.position.set(-1.8,1.7,-4.2),s.add(m);const d=new Hr(16768176,9,3.4,2);d.position.set(1.1,1.7,-4.1),s.add(d);const _=new Hr(16769724,9,3.4,2);_.position.set(-3.5,1.7,-5),s.add(_);const v=new Hr(16773330,9,5,2);v.position.set(-1.6,3.24,-2.62),s.add(v);const g=new Hr(13624575,9,5,2);g.position.set(2.3,1.3,-5.2),s.add(g);const y=new Hr(16760442,8,4.5,2);y.position.set(-5.15,2.05,-4),s.add(y);const T=new Qy(new fS({map:k2(),color:16767392,transparent:!0,depthWrite:!1,blending:_l}));T.position.set(1.75,3.78,-1.2),T.scale.set(1.3,1.3,1),s.add(T);const U=T.clone();U.position.set(-6.65,3.78,3.7);const M=T.clone();M.position.set(5.45,3.78,-1);const S=T.clone();S.position.set(5.3,3.78,5),s.add(S),s.add(M),U.scale.set(1.4,1.4,1),s.add(U);const P=(Jt,ee,fe,re,Ce=.03)=>{const He=new gn(new eo(fe*2.2,fe*2.2),V2(new ae(Jt,ee),fe,new le(re),qt.half,1.6));He.rotation.x=-Math.PI/2,He.position.set(Jt,Ce,ee),He.renderOrder=5,s.add(He)};P(1.75,-1.2,3.1,10122304),P(5.45,-1,3.2,10122304),P(5.3,4.6,3.4,10122304),P(-5.2,4.6,4.4,12618309,.17);const I=new Pu(new eo(14.2,14.2),{color:7174281,textureWidth:1024,textureHeight:1024});I.rotation.x=-Math.PI/2,I.position.y=.005,I.renderOrder=-3,s.add(I);const D=z2(),N=Ud(),C=(Jt,ee,fe=!0)=>{const re=new gn(Yr(Jt),ee);re.castShadow=fe,re.receiveShadow=!0,s.add(re);const Ce=new gn(U2(Jt),D);return Ce.renderOrder=1,s.add(Ce),re},R=N2();C(R.builder,N);const E=Ud({transparent:!0,opacity:.52});E.depthWrite=!1;const O=new gn(Yr(R.wet),E);O.renderOrder=3,s.add(O);const H=L2();C(H.shell,N);const K=Ud({emissive:6046240,emissiveIntensity:1});C(H.interior,K,!1);const q=H2(),ct=new gn(Yr(H.neon),q);s.add(ct);const Z=Gv(new le(.4,.56,.68),.13,0),$=new gn(Yr(H.glass),Z);$.renderOrder=6,s.add($);const F=Gv(new le(.42,.58,.68),.12,3.1),G=new gn(Yr(H.doorLeft),F),ut=new gn(Yr(H.doorRight),F);G.renderOrder=6,ut.renderOrder=6,s.add(G,ut);const st=K2(R.puddles);s.add(st.mesh);const dt=Y2({half:12,height:14},1300,new le(.72,.84,1));s.add(dt.lines,dt.drips);const L=[16726832,16756768,3139690],tt=L.map((Jt,ee)=>{const fe=new Ip({color:Jt}),re=new gn(new io(.12,.12,.03),fe);return re.position.set(Du.x,2.8-ee*.18,Du.z+.19),s.add(re),re});let mt=0,Tt=0,Ut=6,Ht=0,it=2,vt=3;const At={last:performance.now()/1e3,elapsed:0};let se=0;const zt=()=>{se=requestAnimationFrame(zt);const Jt=performance.now()/1e3,ee=Math.min(.05,Jt-At.last);At.last=Jt,At.elapsed+=ee;const fe=At.elapsed;dt.update(fe,ee),st.update(fe),Z.uniforms.uTime.value=fe,F.uniforms.uTime.value=fe,Ut-=ee,Ut<=0&&(Tt=Tt>.5?0:1,Ut=Tt>.5?4.5+Math.random()*3:9+Math.random()*14),mt+=(Tt-mt)*Math.min(1,ee*2.4);const re=mt*.5;G.position.x=-re,ut.position.x=re,vt-=ee,vt<=0&&(vt=4+Math.random()*9,q.uniforms.uBrightness.value=.55+Math.random()*.2);const Ce=1+Math.sin(fe*1.7)*.035;q.uniforms.uBrightness.value+=(Ce-q.uniforms.uBrightness.value)*Math.min(1,ee*6),m.intensity=24+Math.sin(fe*.9)*1.6,Ht+=ee,Ht>7.5&&(Ht=0,it=(it+1)%3),tt.forEach((He,dn)=>{const Fe=He.material,nn=dn===it,W=nn?1:.12;Fe.color.setHex(L[dn]),Fe.color.multiplyScalar(W*(nn?.9+Math.sin(fe*9)*.08:1))}),c.update(),i.render(s,l)};zt();const he=()=>{const Jt=t.clientWidth,ee=t.clientHeight;l.aspect=Jt/ee,l.updateProjectionMatrix(),i.setSize(Jt,ee)},en=new ResizeObserver(he);return en.observe(t),()=>{cancelAnimationFrame(se),en.disconnect(),c.dispose(),dt.dispose(),st.dispose(),I.dispose(),s.traverse(Jt=>{const ee=Jt;ee.geometry&&ee.geometry.dispose()}),D.dispose(),N.dispose(),q.dispose(),Z.dispose(),F.dispose(),i.dispose(),t.removeChild(i.domElement)}},[]),gl.jsx("div",{className:"world",ref:r})}function j2(){return gl.jsx("div",{className:"app",children:gl.jsx(J2,{})})}const US=document.getElementById("root");if(!US)throw new Error("The root element is missing");kM.createRoot(US).render(gl.jsx(Ld.StrictMode,{children:gl.jsx(j2,{})}));
