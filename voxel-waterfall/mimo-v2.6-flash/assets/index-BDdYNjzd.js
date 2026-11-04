(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const f of l)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const f={};return l.integrity&&(f.integrity=l.integrity),l.referrerPolicy&&(f.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?f.credentials="include":l.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function s(l){if(l.ep)return;l.ep=!0;const f=i(l);fetch(l.href,f)}})();var fd={exports:{}},ll={};var ov;function OM(){if(ov)return ll;ov=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,f){var h=null;if(f!==void 0&&(h=""+f),l.key!==void 0&&(h=""+l.key),"key"in l){f={};for(var d in l)d!=="key"&&(f[d]=l[d])}else f=l;return l=f.ref,{$$typeof:o,type:s,key:h,ref:l!==void 0?l:null,props:f}}return ll.Fragment=e,ll.jsx=i,ll.jsxs=i,ll}var lv;function PM(){return lv||(lv=1,fd.exports=OM()),fd.exports}var _e=PM(),hd={exports:{}},ce={};var uv;function zM(){if(uv)return ce;uv=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),m=Symbol.for("react.activity"),S=Symbol.for("react.view_transition"),M=Symbol.iterator;function T(w){return w===null||typeof w!="object"?null:(w=M&&w[M]||w["@@iterator"],typeof w=="function"?w:null)}var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},x=Object.assign,y={};function O(w,Z,_t){this.props=w,this.context=Z,this.refs=y,this.updater=_t||A}O.prototype.isReactComponent={},O.prototype.setState=function(w,Z){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,Z,"setState")},O.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function N(){}N.prototype=O.prototype;function D(w,Z,_t){this.props=w,this.context=Z,this.refs=y,this.updater=_t||A}var G=D.prototype=new N;G.constructor=D,x(G,O.prototype),G.isPureReactComponent=!0;var I=Array.isArray;function L(){}var F={H:null,A:null,T:null,S:null},U=Object.prototype.hasOwnProperty;function C(w,Z,_t){var ut=_t.ref;return{$$typeof:o,type:w,key:Z,ref:ut!==void 0?ut:null,props:_t}}function H(w,Z){return C(w.type,Z,w.props)}function ot(w){return typeof w=="object"&&w!==null&&w.$$typeof===o}function st(w){var Z={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(_t){return Z[_t]})}var mt=/\/+/g;function ct(w,Z){return typeof w=="object"&&w!==null&&w.key!=null?st(""+w.key):Z.toString(36)}function Y(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(L,L):(w.status="pending",w.then(function(Z){w.status==="pending"&&(w.status="fulfilled",w.value=Z)},function(Z){w.status==="pending"&&(w.status="rejected",w.reason=Z)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function it(w,Z,_t,ut,Tt){var It=typeof w;(It==="undefined"||It==="boolean")&&(w=null);var lt=!1;if(w===null)lt=!0;else switch(It){case"bigint":case"string":case"number":lt=!0;break;case"object":switch(w.$$typeof){case o:case e:lt=!0;break;case v:return lt=w._init,it(lt(w._payload),Z,_t,ut,Tt)}}if(lt)return Tt=Tt(w),lt=ut===""?"."+ct(w,0):ut,I(Tt)?(_t="",lt!=null&&(_t=lt.replace(mt,"$&/")+"/"),it(Tt,Z,_t,"",function(qt){return qt})):Tt!=null&&(ot(Tt)&&(Tt=H(Tt,_t+(Tt.key==null||w&&w.key===Tt.key?"":(""+Tt.key).replace(mt,"$&/")+"/")+lt)),Z.push(Tt)),1;lt=0;var gt=ut===""?".":ut+":";if(I(w))for(var Ct=0;Ct<w.length;Ct++)ut=w[Ct],It=gt+ct(ut,Ct),lt+=it(ut,Z,_t,It,Tt);else if(Ct=T(w),typeof Ct=="function")for(w=Ct.call(w),Ct=0;!(ut=w.next()).done;)ut=ut.value,It=gt+ct(ut,Ct++),lt+=it(ut,Z,_t,It,Tt);else if(It==="object"){if(typeof w.then=="function")return it(Y(w),Z,_t,ut,Tt);throw Z=String(w),Error("Objects are not valid as a React child (found: "+(Z==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":Z)+"). If you meant to render a collection of children, use an array instead.")}return lt}function W(w,Z,_t){if(w==null)return w;var ut=[],Tt=0;return it(w,ut,"","",function(It){return Z.call(_t,It,Tt++)}),ut}function xt(w){if(w._status===-1){var Z=w._result,_t=Z();_t.then(function(ut){(w._status===0||w._status===-1)&&(w._status=1,w._result=ut,_t.status===void 0&&(_t.status="fulfilled",_t.value=ut))},function(ut){(w._status===0||w._status===-1)&&(w._status=2,w._result=ut,_t.status===void 0&&(_t.status="rejected",_t.reason=ut))}),w._status===-1&&(w._status=0,w._result=_t)}if(w._status===1)return w._result.default;throw w._result}var yt=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(Z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)};function Ft(w){var Z=F.T,_t={};_t.types=Z!==null?Z.types:null,F.T=_t;try{var ut=w(),Tt=F.S;Tt!==null&&Tt(_t,ut),typeof ut=="object"&&ut!==null&&typeof ut.then=="function"&&ut.then(L,yt)}catch(It){yt(It)}finally{Z!==null&&_t.types!==null&&(Z.types=_t.types),F.T=Z}}function ie(w){var Z=F.T;if(Z!==null){var _t=Z.types;_t===null?Z.types=[w]:_t.indexOf(w)===-1&&_t.push(w)}else Ft(ie.bind(null,w))}var re={map:W,forEach:function(w,Z,_t){W(w,function(){Z.apply(this,arguments)},_t)},count:function(w){var Z=0;return W(w,function(){Z++}),Z},toArray:function(w){return W(w,function(Z){return Z})||[]},only:function(w){if(!ot(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return ce.Activity=m,ce.Children=re,ce.Component=O,ce.Fragment=i,ce.Profiler=l,ce.PureComponent=D,ce.StrictMode=s,ce.Suspense=p,ce.ViewTransition=S,ce.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=F,ce.__COMPILER_RUNTIME={__proto__:null,c:function(w){return F.H.useMemoCache(w)}},ce.addTransitionType=ie,ce.cache=function(w){return function(){return w.apply(null,arguments)}},ce.cacheSignal=function(){return null},ce.cloneElement=function(w,Z,_t){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var ut=x({},w.props),Tt=w.key;if(Z!=null)for(It in Z.key!==void 0&&(Tt=""+Z.key),Z)!U.call(Z,It)||It==="key"||It==="__self"||It==="__source"||It==="ref"&&Z.ref===void 0||(ut[It]=Z[It]);var It=arguments.length-2;if(It===1)ut.children=_t;else if(1<It){for(var lt=Array(It),gt=0;gt<It;gt++)lt[gt]=arguments[gt+2];ut.children=lt}return C(w.type,Tt,ut)},ce.createContext=function(w){return w={$$typeof:h,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:f,_context:w},w},ce.createElement=function(w,Z,_t){var ut,Tt={},It=null;if(Z!=null)for(ut in Z.key!==void 0&&(It=""+Z.key),Z)U.call(Z,ut)&&ut!=="key"&&ut!=="__self"&&ut!=="__source"&&(Tt[ut]=Z[ut]);var lt=arguments.length-2;if(lt===1)Tt.children=_t;else if(1<lt){for(var gt=Array(lt),Ct=0;Ct<lt;Ct++)gt[Ct]=arguments[Ct+2];Tt.children=gt}if(w&&w.defaultProps)for(ut in lt=w.defaultProps,lt)Tt[ut]===void 0&&(Tt[ut]=lt[ut]);return C(w,It,Tt)},ce.createRef=function(){return{current:null}},ce.forwardRef=function(w){return{$$typeof:d,render:w}},ce.isValidElement=ot,ce.lazy=function(w){return{$$typeof:v,_payload:{_status:-1,_result:w},_init:xt}},ce.memo=function(w,Z){return{$$typeof:g,type:w,compare:Z===void 0?null:Z}},ce.startTransition=Ft,ce.unstable_useCacheRefresh=function(){return F.H.useCacheRefresh()},ce.use=function(w){return F.H.use(w)},ce.useActionState=function(w,Z,_t){return F.H.useActionState(w,Z,_t)},ce.useCallback=function(w,Z){return F.H.useCallback(w,Z)},ce.useContext=function(w){return F.H.useContext(w)},ce.useDebugValue=function(){},ce.useDeferredValue=function(w,Z){return F.H.useDeferredValue(w,Z)},ce.useEffect=function(w,Z){return F.H.useEffect(w,Z)},ce.useEffectEvent=function(w){return F.H.useEffectEvent(w)},ce.useId=function(){return F.H.useId()},ce.useImperativeHandle=function(w,Z,_t){return F.H.useImperativeHandle(w,Z,_t)},ce.useInsertionEffect=function(w,Z){return F.H.useInsertionEffect(w,Z)},ce.useLayoutEffect=function(w,Z){return F.H.useLayoutEffect(w,Z)},ce.useMemo=function(w,Z){return F.H.useMemo(w,Z)},ce.useOptimistic=function(w,Z){return F.H.useOptimistic(w,Z)},ce.useReducer=function(w,Z,_t){return F.H.useReducer(w,Z,_t)},ce.useRef=function(w){return F.H.useRef(w)},ce.useState=function(w){return F.H.useState(w)},ce.useSyncExternalStore=function(w,Z,_t){return F.H.useSyncExternalStore(w,Z,_t)},ce.useTransition=function(){return F.H.useTransition()},ce.version="19.3.0",ce}var cv;function zp(){return cv||(cv=1,hd.exports=zM()),hd.exports}var Ea=zp(),dd={exports:{}},ul={},pd={exports:{}},md={};var fv;function IM(){return fv||(fv=1,(function(o){function e(Y,it){var W=Y.length;Y.push(it);t:for(;0<W;){var xt=W-1>>>1,yt=Y[xt];if(0<l(yt,it))Y[xt]=it,Y[W]=yt,W=xt;else break t}}function i(Y){return Y.length===0?null:Y[0]}function s(Y){if(Y.length===0)return null;var it=Y[0],W=Y.pop();if(W!==it){Y[0]=W;t:for(var xt=0,yt=Y.length,Ft=yt>>>1;xt<Ft;){var ie=2*(xt+1)-1,re=Y[ie],w=ie+1,Z=Y[w];if(0>l(re,W))w<yt&&0>l(Z,re)?(Y[xt]=Z,Y[w]=W,xt=w):(Y[xt]=re,Y[ie]=W,xt=ie);else if(w<yt&&0>l(Z,W))Y[xt]=Z,Y[w]=W,xt=w;else break t}}return it}function l(Y,it){var W=Y.sortIndex-it.sortIndex;return W!==0?W:Y.id-it.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;o.unstable_now=function(){return f.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var p=[],g=[],v=1,m=null,S=3,M=!1,T=!1,A=!1,x=!1,y=typeof setTimeout=="function"?setTimeout:null,O=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function D(Y){for(var it=i(g);it!==null;){if(it.callback===null)s(g);else if(it.startTime<=Y)s(g),it.sortIndex=it.expirationTime,e(p,it);else break;it=i(g)}}function G(Y){if(A=!1,D(Y),!T)if(i(p)!==null)T=!0,I||(I=!0,ot());else{var it=i(g);it!==null&&ct(G,it.startTime-Y)}}var I=!1,L=-1,F=5,U=-1;function C(){return x?!0:!(o.unstable_now()-U<F)}function H(){if(x=!1,I){var Y=o.unstable_now();U=Y;var it=!0;try{t:{T=!1,A&&(A=!1,O(L),L=-1),M=!0;var W=S;try{e:{for(D(Y),m=i(p);m!==null&&!(m.expirationTime>Y&&C());){var xt=m.callback;if(typeof xt=="function"){m.callback=null,S=m.priorityLevel;var yt=xt(m.expirationTime<=Y);if(Y=o.unstable_now(),typeof yt=="function"){m.callback=yt,D(Y),it=!0;break e}m===i(p)&&s(p),D(Y)}else s(p);m=i(p)}if(m!==null)it=!0;else{var Ft=i(g);Ft!==null&&ct(G,Ft.startTime-Y),it=!1}}break t}finally{m=null,S=W,M=!1}it=void 0}}finally{it?ot():I=!1}}}var ot;if(typeof N=="function")ot=function(){N(H)};else if(typeof MessageChannel<"u"){var st=new MessageChannel,mt=st.port2;st.port1.onmessage=H,ot=function(){mt.postMessage(null)}}else ot=function(){y(H,0)};function ct(Y,it){L=y(function(){Y(o.unstable_now())},it)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(Y){Y.callback=null},o.unstable_forceFrameRate=function(Y){0>Y||125<Y?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):F=0<Y?Math.floor(1e3/Y):5},o.unstable_getCurrentPriorityLevel=function(){return S},o.unstable_next=function(Y){switch(S){case 1:case 2:case 3:var it=3;break;default:it=S}var W=S;S=it;try{return Y()}finally{S=W}},o.unstable_requestPaint=function(){x=!0},o.unstable_runWithPriority=function(Y,it){switch(Y){case 1:case 2:case 3:case 4:case 5:break;default:Y=3}var W=S;S=Y;try{return it()}finally{S=W}},o.unstable_scheduleCallback=function(Y,it,W){var xt=o.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?xt+W:xt):W=xt,Y){case 1:var yt=-1;break;case 2:yt=250;break;case 5:yt=1073741823;break;case 4:yt=1e4;break;default:yt=5e3}return yt=W+yt,Y={id:v++,callback:it,priorityLevel:Y,startTime:W,expirationTime:yt,sortIndex:-1},W>xt?(Y.sortIndex=W,e(g,Y),i(p)===null&&Y===i(g)&&(A?(O(L),L=-1):A=!0,ct(G,W-xt))):(Y.sortIndex=yt,e(p,Y),T||M||(T=!0,I||(I=!0,ot()))),Y},o.unstable_shouldYield=C,o.unstable_wrapCallback=function(Y){var it=S;return function(){var W=S;S=it;try{return Y.apply(this,arguments)}finally{S=W}}}})(md)),md}var hv;function BM(){return hv||(hv=1,pd.exports=IM()),pd.exports}var _d={exports:{}},Un={};var dv;function FM(){if(dv)return Un;dv=1;var o=zp();function e(v){var m="https://react.dev/errors/"+v;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var S=2;S<arguments.length;S++)m+="&args[]="+encodeURIComponent(arguments[S])}return"Minified React error #"+v+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal"),f=Symbol.for("react.recoverable"),h=Symbol.for("react.optimistic_key");function d(v,m,S){var M=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:M==null?null:M===h?h:""+M,children:v,containerInfo:m,implementation:S}}var p=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function g(v,m){if(v==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Un.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Un.browser=function(v){return{$$typeof:f,_reason:v}},Un.createPortal=function(v,m){var S=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(e(299));return d(v,m,null,S)},Un.flushSync=function(v){var m=p.T,S=s.p;try{if(p.T=null,s.p=2,v)return v()}finally{p.T=m,s.p=S,s.d.f()}},Un.preconnect=function(v,m){typeof v=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,s.d.C(v,m))},Un.prefetchDNS=function(v){typeof v=="string"&&s.d.D(v)},Un.preinit=function(v,m){if(typeof v=="string"&&m&&typeof m.as=="string"){var S=m.as,M=g(S,m.crossOrigin),T=typeof m.integrity=="string"?m.integrity:void 0,A=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;S==="style"?s.d.S(v,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:M,integrity:T,fetchPriority:A}):S==="script"&&s.d.X(v,{crossOrigin:M,integrity:T,fetchPriority:A,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Un.preinitModule=function(v,m){if(typeof v=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var S=g(m.as,m.crossOrigin);s.d.M(v,{crossOrigin:S,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0})}}else m==null&&s.d.M(v)},Un.preload=function(v,m){if(typeof v=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var S=m.as,M=g(S,m.crossOrigin);s.d.L(v,S,{crossOrigin:M,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Un.preloadModule=function(v,m){if(typeof v=="string")if(m){var S=g(m.as,m.crossOrigin);s.d.m(v,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:S,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0})}else s.d.m(v)},Un.requestFormReset=function(v){s.d.r(v)},Un.unstable_batchedUpdates=function(v,m){return v(m)},Un.useFormState=function(v,m,S){return p.H.useFormState(v,m,S)},Un.useFormStatus=function(){return p.H.useHostTransitionStatus()},Un.version="19.3.0",Un}var pv;function HM(){if(pv)return _d.exports;pv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),_d.exports=FM(),_d.exports}var mv;function GM(){if(mv)return ul;mv=1;var o=BM(),e=zp(),i=HM();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(f(t)!==t)throw Error(s(188))}function g(t){var n=t.alternate;if(!n){if(n=f(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,r=n;;){var u=a.return;if(u===null)break;var c=u.alternate;if(c===null){if(r=u.return,r!==null){a=r;continue}break}if(u.child===c.child){for(c=u.child;c;){if(c===a)return p(u),t;if(c===r)return p(u),n;c=c.sibling}throw Error(s(188))}if(a.return!==r.return)a=u,r=c;else{for(var _=!1,E=u.child;E;){if(E===a){_=!0,a=u,r=c;break}if(E===r){_=!0,r=u,a=c;break}E=E.sibling}if(!_){for(E=c.child;E;){if(E===a){_=!0,a=c,r=u;break}if(E===r){_=!0,r=c,a=u;break}E=E.sibling}if(!_)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}function m(t,n,a,r,u,c){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,r,u,c)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&m(t.child,n,a,r,u,c))return!0;t=t.sibling}return!1}function S(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function M(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function T(t){var n=[null,null],a=S(t);return a===null||A(n,t,a.child,{foundSelf:!1}),n}function A(t,n,a,r){for(;a!==null;){if(a===n)r.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(r.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&A(t,n,a.child,r))return!0;a=a.sibling}return!1}function x(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(s(559))}}var y=null,O=null;function N(t,n,a){return t===a?!0:t===n?(y=t,!0):!1}function D(t,n,a){return t===a?(O=t,!1):t===n?(O!==null&&(y=t),!0):!1}function G(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function I(t,n,a){for(var r=0,u=t;u;u=a(u))r++;u=0;for(var c=n;c;c=a(c))u++;for(;0<r-u;)t=a(t),r--;for(;0<u-r;)n=a(n),u--;for(;r--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var L=Object.assign,F=Symbol.for("react.element"),U=Symbol.for("react.transitional.element"),C=Symbol.for("react.portal"),H=Symbol.for("react.fragment"),ot=Symbol.for("react.strict_mode"),st=Symbol.for("react.profiler"),mt=Symbol.for("react.consumer"),ct=Symbol.for("react.context"),Y=Symbol.for("react.forward_ref"),it=Symbol.for("react.suspense"),W=Symbol.for("react.suspense_list"),xt=Symbol.for("react.memo"),yt=Symbol.for("react.lazy"),Ft=Symbol.for("react.activity"),ie=Symbol.for("react.legacy_hidden"),re=Symbol.for("react.memo_cache_sentinel"),w=Symbol.for("react.view_transition"),Z=Symbol.for("react.recoverable"),_t=Symbol.iterator;function ut(t){return t===null||typeof t!="object"?null:(t=_t&&t[_t]||t["@@iterator"],typeof t=="function"?t:null)}var Tt=Symbol.for("react.client.reference");function It(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===Tt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case H:return"Fragment";case st:return"Profiler";case ot:return"StrictMode";case it:return"Suspense";case W:return"SuspenseList";case Ft:return"Activity";case w:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case C:return"Portal";case ct:return t.displayName||"Context";case mt:return(t._context.displayName||"Context")+".Consumer";case Y:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case xt:return n=t.displayName||null,n!==null?n:It(t.type)||"Memo";case yt:n=t._payload,t=t._init;try{return It(t(n))}catch{}}return null}var lt=Array.isArray,gt=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ct=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,qt={pending:!1,data:null,method:null,action:null},B=[],We=-1;function le(t){return{current:t}}function ae(t){0>We||(t.current=B[We],B[We]=null,We--)}function bt(t,n){We++,B[We]=t.current,t.current=n}var fe=le(null),jt=le(null),$t=le(null),$e=le(null);function P(t,n){switch(bt($t,n),bt(jt,t),bt(fe,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?_0(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=_0(n),t=g0(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}ae(fe),bt(fe,t)}function b(){ae(fe),ae(jt),ae($t)}function et(t){var n=t.memoizedState;n!==null&&(Ir._currentValue=n.memoizedState,bt($e,t)),n=fe.current;var a=g0(n,t.type);n!==a&&(bt(jt,t),bt(fe,a))}function pt(t){jt.current===t&&(ae(fe),ae(jt)),$e.current===t&&(ae($e),Ir._currentValue=qt)}var St,ft;function Vt(t){if(St===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);St=n&&n[1]||"",ft=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+St+t+ft}var Lt=!1;function Yt(t,n){if(!t||Lt)return"";Lt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var dt=function(){throw Error()};if(Object.defineProperty(dt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(dt,[])}catch(Ut){var k=Ut}Reflect.construct(t,[],dt)}else{try{dt.call()}catch(Ut){k=Ut}dt=!1;try{var $=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),dt=!0,new t}finally{dt&&($!==void 0?Object.defineProperty(t.prototype,"props",$):delete t.prototype.props)}}}else{try{throw Error()}catch(Ut){k=Ut}(dt=t())&&typeof dt.catch=="function"&&dt.catch(function(){})}}catch(Ut){if(Ut&&k&&typeof Ut.stack=="string")return[Ut.stack,k.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=r.DetermineComponentFrameRoot(),_=c[0],E=c[1];if(_&&E){var z=_.split(`
`),j=E.split(`
`);for(u=r=0;r<z.length&&!z[r].includes("DetermineComponentFrameRoot");)r++;for(;u<j.length&&!j[u].includes("DetermineComponentFrameRoot");)u++;if(r===z.length||u===j.length)for(r=z.length-1,u=j.length-1;1<=r&&0<=u&&z[r]!==j[u];)u--;for(;1<=r&&0<=u;r--,u--)if(z[r]!==j[u]){if(r!==1||u!==1)do if(r--,u--,0>u||z[r]!==j[u]){var nt=`
`+z[r].replace(" at new "," at ");return t.displayName&&nt.includes("<anonymous>")&&(nt=nt.replace("<anonymous>",t.displayName)),nt}while(1<=r&&0<=u);break}}}finally{Lt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Vt(a):""}function Zt(t,n){switch(t.tag){case 26:case 27:case 5:return Vt(t.type);case 16:return Vt("Lazy");case 13:return t.child!==n&&n!==null?Vt("Suspense Fallback"):Vt("Suspense");case 19:return Vt("SuspenseList");case 0:case 15:return Yt(t.type,!1);case 11:return Yt(t.type.render,!1);case 1:return Yt(t.type,!0);case 31:return Vt("Activity");case 30:return Vt("ViewTransition");default:return""}}function Mt(t){try{var n="",a=null;do n+=Zt(t,a),a=t,t=t.return;while(t);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var Bt=Object.prototype.hasOwnProperty,ee=o.unstable_scheduleCallback,Jt=o.unstable_cancelCallback,Ot=o.unstable_shouldYield,ue=o.unstable_requestPaint,X=o.unstable_now,zt=o.unstable_getCurrentPriorityLevel,Et=o.unstable_ImmediatePriority,Gt=o.unstable_UserBlockingPriority,At=o.unstable_NormalPriority,vt=o.unstable_LowPriority,Xt=o.unstable_IdlePriority,he=o.log,ke=o.unstable_setDisableYieldValue,Re=null,Qe=null;function Sn(t){if(typeof he=="function"&&ke(t),Qe&&typeof Qe.setStrictMode=="function")try{Qe.setStrictMode(Re,t)}catch{}}var Ln=Math.clz32?Math.clz32:go,Dl=Math.log,Ji=Math.LN2;function go(t){return t>>>=0,t===0?32:31-(Dl(t)/Ji|0)|0}var ms=256,_s=262144,$i=4194304;function Oi(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ta(t,n,a){var r=t.pendingLanes;if(r===0)return 0;var u=0,c=t.suspendedLanes,_=t.pingedLanes;t=t.warmLanes;var E=r&134217727;return E!==0?(r=E&~c,r!==0?u=Oi(r):(_&=E,_!==0?u=Oi(_):a||(a=E&~t,a!==0&&(u=Oi(a))))):(E=r&~c,E!==0?u=Oi(E):_!==0?u=Oi(_):a||(a=r&~t,a!==0&&(u=Oi(a)))),u===0?0:n!==0&&n!==u&&(n&c)===0&&(c=u&-u,a=n&-n,c>=a||c===32&&(a&4194048)!==0)?n:u}function Ca(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function vo(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var r=31-Ln(a),u=1<<r;n|=t[r],a&=~u}return n}function Bc(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ul(){var t=$i;return $i<<=1,($i&62914560)===0&&($i=4194304),t}function So(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function gs(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Fc(t,n,a,r,u,c){var _=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var E=t.entanglements,z=t.expirationTimes,j=t.hiddenUpdates;for(a=_&~a;0<a;){var nt=31-Ln(a),dt=1<<nt;E[nt]=0,z[nt]=-1;var k=j[nt];if(k!==null)for(j[nt]=null,nt=0;nt<k.length;nt++){var $=k[nt];$!==null&&($.lane&=-536870913)}a&=~dt}r!==0&&Nl(t,r,0),c!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=c&~(_&~n))}function Nl(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var r=31-Ln(n);t.entangledLanes|=n,t.entanglements[r]=t.entanglements[r]|1073741824|a&261930}function R(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var r=31-Ln(a),u=1<<r;u&n|t[r]&n&&(t[r]|=n),a&=~u}}function K(t,n){var a=n&-n;return a=(a&42)!==0?1:at(a),(a&(t.suspendedLanes|n))!==0?0:a}function at(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function rt(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Q(){var t=Ct.p;return t!==0?t:(t=window.event,t===void 0?32:tv(t.type))}function Rt(t,n){var a=Ct.p;try{return Ct.p=t,n()}finally{Ct.p=a}}var wt=Math.random().toString(36).slice(2),Nt="__reactFiber$"+wt,Dt="__reactProps$"+wt,te="__reactContainer$"+wt,oe="__reactEvents$"+wt,Qt="__reactListeners$"+wt,ye="__reactHandles$"+wt,Ne="__reactResources$"+wt,He="__reactMarker$"+wt,Oe="__reactLoad$"+wt;function we(t){delete t[Nt],delete t[Dt],delete t[Qt],delete t[ye]}function Wt(t){var n;if(n=t[Nt])return n;for(var a=t.parentNode;a;){if(n=a[te]||a[Nt]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=O0(t);t!==null;){if(a=t[Nt])return a;t=O0(t)}return n}t=a,a=t.parentNode}return null}function Pe(t){if(t=t[Nt]||t[te]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function xe(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function on(t){var n=t[Ne];return n||(n=t[Ne]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Je(t){t[He]=!0}function On(t){t[Oe]=void 0}var wa=new Set,Ye={};function ln(t,n){pn(t,n),pn(t+"Capture",n)}function pn(t,n){for(Ye[t]=n,t=0;t<n.length;t++)wa.add(n[t])}var Tn=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),bn={},tr={};function ea(t){return Bt.call(tr,t)?!0:Bt.call(bn,t)?!1:Tn.test(t)?tr[t]=!0:(bn[t]=!0,!1)}var De=!1;function nm(){var t=De;return De=!1,t}function Ll(t,n,a){if(ea(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function Ol(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function na(t,n,a,r){if(r===null)t.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,r)}}function Jn(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function im(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function ty(t,n,a){var r=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var u=r.get,c=r.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(_){a=""+_,c.call(this,_)}}),Object.defineProperty(t,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(_){a=""+_},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Hc(t){if(!t._valueTracker){var n=im(t)?"checked":"value";t._valueTracker=ty(t,n,""+t[n])}}function am(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return t&&(r=im(t)?t.checked?"true":"false":t.value),t=r,t!==a?(n.setValue(t),!0):!1}var ey=/[\n"\\]/g;function ci(t){return t.replace(ey,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Gc(t,n,a,r,u,c,_,E){t.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?t.type=_:t.removeAttribute("type"),n!=null?_==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+Jn(n)):t.value!==""+Jn(n)&&(t.value=""+Jn(n)):_!=="submit"&&_!=="reset"||t.removeAttribute("value"),n!=null?_==="number"&&t.value==n?Vc(t,Jn(t.value)):Vc(t,Jn(n)):a!=null?Vc(t,Jn(a)):r!=null&&t.removeAttribute("value"),u==null&&c!=null&&(t.defaultChecked=!!c),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?t.name=""+Jn(E):t.removeAttribute("name")}function sm(t,n,a,r,u,c,_,E){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.type=c),n!=null||a!=null){if(!(c!=="submit"&&c!=="reset"||n!=null)){Hc(t);return}a=a!=null?""+Jn(a):"",n=n!=null?""+Jn(n):a,E||n===t.value||(t.value=n),t.defaultValue=n}r=r??u,r=typeof r!="function"&&typeof r!="symbol"&&!!r,t.checked=E?t.checked:!!r,t.defaultChecked=!!r,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(t.name=_),Hc(t)}function Vc(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function er(t,n,a,r){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&r&&(t[a].defaultSelected=!0)}else{for(a=""+Jn(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,r&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function rm(t,n,a){if(n!=null&&(n=""+Jn(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+Jn(a):""}function om(t,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(lt(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=Jn(n),t.defaultValue=a,r=t.textContent,r===a&&r!==""&&r!==null&&(t.value=r),Hc(t)}function nr(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var ny=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function lm(t,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":r?t.setProperty(n,a):typeof a!="number"||a===0||ny.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function um(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?t.setProperty(r,""):r==="float"?t.cssFloat="":t[r]="",De=!0);for(var u in n)r=n[u],n.hasOwnProperty(u)&&a[u]!==r&&(lm(t,u,r),De=!0)}else for(var c in n)n.hasOwnProperty(c)&&lm(t,c,n[c])}function Xc(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var iy=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ay=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Pl(t){return ay.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Pi(){}var kc=null;function Yc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ir=null,ar=null;function cm(t){var n=Pe(t);if(n&&(t=n.stateNode)){var a=t[Dt]||null;t:switch(t=n.stateNode,n.type){case"input":if(Gc(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ci(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==t&&r.form===t.form){var u=r[Dt]||null;if(!u)throw Error(s(90));Gc(r,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===t.form&&am(r)}break t;case"textarea":rm(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&er(t,!!a.multiple,n,!1)}}}var qc=!1;function fm(t,n,a){if(qc)return t(n,a);qc=!0;try{var r=t(n);return r}finally{if(qc=!1,(ir!==null||ar!==null)&&(Pu(),ir&&(n=ir,t=ar,ar=ir=null,cm(n),t)))for(n=0;n<t.length;n++)cm(t[n])}}function yo(t,n){var a=t.stateNode;if(a===null)return null;var r=a[Dt]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var ia=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Wc=!1;if(ia)try{var xo={};Object.defineProperty(xo,"passive",{get:function(){Wc=!0}}),window.addEventListener("test",xo,xo),window.removeEventListener("test",xo,xo)}catch{Wc=!1}var Da=null,jc=null,zl=null;function hm(){if(zl)return zl;var t,n=jc,a=n.length,r,u="value"in Da?Da.value:Da.textContent,c=u.length;for(t=0;t<a&&n[t]===u[t];t++);var _=a-t;for(r=1;r<=_&&n[a-r]===u[c-r];r++);return zl=u.slice(t,1<r?1-r:void 0)}function Il(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Bl(){return!0}function dm(){return!1}function Bn(t){function n(a,r,u,c,_){this._reactName=a,this._targetInst=u,this.type=r,this.nativeEvent=c,this.target=_,this.currentTarget=null;for(var E in t)t.hasOwnProperty(E)&&(a=t[E],this[E]=a?a(c):c[E]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?Bl:dm,this.isPropagationStopped=dm,this}return L(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Bl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Bl)},persist:function(){},isPersistent:Bl}),n}var Ua={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Fl=Bn(Ua),Mo=L({},Ua,{view:0,detail:0}),sy=Bn(Mo),Zc,Kc,Eo,Hl=L({},Mo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Jc,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Eo&&(Eo&&t.type==="mousemove"?(Zc=t.screenX-Eo.screenX,Kc=t.screenY-Eo.screenY):Kc=Zc=0,Eo=t),Zc)},movementY:function(t){return"movementY"in t?t.movementY:Kc}}),pm=Bn(Hl),ry=L({},Hl,{dataTransfer:0}),oy=Bn(ry),ly=L({},Mo,{relatedTarget:0}),Qc=Bn(ly),uy=L({},Ua,{animationName:0,elapsedTime:0,pseudoElement:0}),cy=Bn(uy),fy=L({},Ua,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),hy=Bn(fy),dy=L({},Ua,{data:0}),mm=Bn(dy),py={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},my={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},_y={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gy(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=_y[t])?!!n[t]:!1}function Jc(){return gy}var vy=L({},Mo,{key:function(t){if(t.key){var n=py[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Il(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?my[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Jc,charCode:function(t){return t.type==="keypress"?Il(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Il(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Sy=Bn(vy),yy=L({},Hl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_m=Bn(yy),xy=L({},Ua,{submitter:0}),My=Bn(xy),Ey=L({},Mo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Jc}),Ty=Bn(Ey),by=L({},Ua,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ay=Bn(by),Ry=L({},Hl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Cy=Bn(Ry),wy=L({},Ua,{newState:0,oldState:0,source:0}),Dy=Bn(wy),Uy=[9,13,27,32],$c=ia&&"CompositionEvent"in window,To=null;ia&&"documentMode"in document&&(To=document.documentMode);var Ny=ia&&"TextEvent"in window&&!To,gm=ia&&(!$c||To&&8<To&&11>=To),vm=" ",Sm=!1;function ym(t,n){switch(t){case"keyup":return Uy.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var sr=!1;function Ly(t,n){switch(t){case"compositionend":return xm(n);case"keypress":return n.which!==32?null:(Sm=!0,vm);case"textInput":return t=n.data,t===vm&&Sm?null:t;default:return null}}function Oy(t,n){if(sr)return t==="compositionend"||!$c&&ym(t,n)?(t=hm(),zl=jc=Da=null,sr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return gm&&n.locale!=="ko"?null:n.data;default:return null}}var Py={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mm(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Py[t.type]:n==="textarea"}function Em(t,n,a,r){ir?ar?ar.push(r):ar=[r]:ir=r,n=Gu(n,"onChange"),0<n.length&&(a=new Fl("onChange","change",null,a,r),t.push({event:a,listeners:n}))}var bo=null,Ao=null;function zy(t){c0(t,0)}function Gl(t){var n=xe(t);if(am(n))return t}function Tm(t,n){if(t==="change")return n}var bm=!1;if(ia){var tf;if(ia){var ef="oninput"in document;if(!ef){var Am=document.createElement("div");Am.setAttribute("oninput","return;"),ef=typeof Am.oninput=="function"}tf=ef}else tf=!1;bm=tf&&(!document.documentMode||9<document.documentMode)}function Rm(){bo&&(bo.detachEvent("onpropertychange",Cm),Ao=bo=null)}function Cm(t){if(t.propertyName==="value"&&Gl(Ao)){var n=[];Em(n,Ao,t,Yc(t)),fm(zy,n)}}function Iy(t,n,a){t==="focusin"?(Rm(),bo=n,Ao=a,bo.attachEvent("onpropertychange",Cm)):t==="focusout"&&Rm()}function By(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Gl(Ao)}function Fy(t,n){if(t==="click")return Gl(n)}function Hy(t,n){if(t==="input"||t==="change")return Gl(n)}function Gy(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var $n=typeof Object.is=="function"?Object.is:Gy;function Ro(t,n){if($n(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var u=a[r];if(!Bt.call(n,u)||!$n(t[u],n[u]))return!1}return!0}function nf(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function wm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Dm(t,n){var a=wm(t);t=0;for(var r;a;){if(a.nodeType===3){if(r=t+a.textContent.length,t<=n&&r>=n)return{node:a,offset:n-t};t=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=wm(a)}}function Um(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Um(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Nm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=nf(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=nf(t.document)}return n}function af(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Vy=ia&&"documentMode"in document&&11>=document.documentMode,rr=null,sf=null,Co=null,rf=!1;function Lm(t,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;rf||rr==null||rr!==nf(r)||(r=rr,"selectionStart"in r&&af(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Co&&Ro(Co,r)||(Co=r,r=Gu(sf,"onSelect"),0<r.length&&(n=new Fl("onSelect","select",null,n,a),t.push({event:n,listeners:r}),n.target=rr)))}function vs(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var or={animationend:vs("Animation","AnimationEnd"),animationiteration:vs("Animation","AnimationIteration"),animationstart:vs("Animation","AnimationStart"),transitionrun:vs("Transition","TransitionRun"),transitionstart:vs("Transition","TransitionStart"),transitioncancel:vs("Transition","TransitionCancel"),transitionend:vs("Transition","TransitionEnd")},of={},Om={};ia&&(Om=document.createElement("div").style,"AnimationEvent"in window||(delete or.animationend.animation,delete or.animationiteration.animation,delete or.animationstart.animation),"TransitionEvent"in window||delete or.transitionend.transition);function Ss(t){if(of[t])return of[t];if(!or[t])return t;var n=or[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Om)return of[t]=n[a];return t}var Pm=Ss("animationend"),zm=Ss("animationiteration"),Im=Ss("animationstart"),Xy=Ss("transitionrun"),ky=Ss("transitionstart"),Yy=Ss("transitioncancel"),Bm=Ss("transitionend"),Fm=new Map,lf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");lf.push("scrollEnd");function Mi(t,n){Fm.set(t,n),ln(n,[t])}var qy=0;function aa(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=Ai.identifierPrefix;var a=qy++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function Hm(t){if(t==null||typeof t=="string")return t;var n=null,a=Rr;if(a!==null)for(var r=0;r<a.length;r++){var u=t[a[r]];if(u!=null){if(u==="none")return"none";n=n==null?u:n+(" "+u)}}return n??t.default}function sa(t,n){return t=Hm(t),n=Hm(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var Vl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},fi=[],lr=0,uf=0;function Xl(){for(var t=lr,n=uf=lr=0;n<t;){var a=fi[n];fi[n++]=null;var r=fi[n];fi[n++]=null;var u=fi[n];fi[n++]=null;var c=fi[n];if(fi[n++]=null,r!==null&&u!==null){var _=r.pending;_===null?u.next=u:(u.next=_.next,_.next=u),r.pending=u}c!==0&&Gm(a,u,c)}}function kl(t,n,a,r){fi[lr++]=t,fi[lr++]=n,fi[lr++]=a,fi[lr++]=r,uf|=r,t.lanes|=r,t=t.alternate,t!==null&&(t.lanes|=r)}function cf(t,n,a,r){return kl(t,n,a,r),Yl(t)}function ys(t,n){return kl(t,null,null,n),Yl(t)}function Gm(t,n,a){t.lanes|=a;var r=t.alternate;r!==null&&(r.lanes|=a);for(var u=!1,c=t.return;c!==null;)c.childLanes|=a,r=c.alternate,r!==null&&(r.childLanes|=a),c.tag===22&&(t=c.stateNode,t===null||t._visibility&1||(u=!0)),t=c,c=c.return;return t.tag===3?(c=t.stateNode,u&&n!==null&&(u=31-Ln(a),t=c.hiddenUpdates,r=t[u],r===null?t[u]=[n]:r.push(n),n.lane=a|536870912),c):null}function Yl(t){if(50<Ko)throw Ko=0,Ou=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var ur={};function Wy(t,n,a,r){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function qn(t,n,a,r){return new Wy(t,n,a,r)}function ff(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ra(t,n){var a=t.alternate;return a===null?(a=qn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Vm(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function ql(t,n,a,r,u,c){var _=0;if(r=t,typeof r=="function")ff(r)&&(_=1);else if(typeof r=="string")_=xM(t,a,fe.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(r){case Ft:return t=qn(31,a,n,u),t.elementType=Ft,t.lanes=c,t;case H:return xs(a.children,u,c,n);case ot:_=8,u|=24;break;case st:return t=qn(12,a,n,u|2),t.elementType=st,t.lanes=c,t;case it:return t=qn(13,a,n,u),t.elementType=it,t.lanes=c,t;case W:return t=qn(19,a,n,u),t.elementType=W,t.lanes=c,t;case ie:case w:return t=u|32,t=qn(30,a,n,t),t.elementType=w,t.lanes=c,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case ct:_=10;break t;case mt:_=9;break t;case Y:_=11;break t;case xt:_=14;break t;case yt:_=16,r=null;break t}_=29,a=Error(s(130,t===null?"null":typeof t,"")),r=null}return n=qn(_,a,n,u),n.elementType=t,n.type=r,n.lanes=c,n}function xs(t,n,a,r){return t=qn(7,t,r,n),t.lanes=a,t}function hf(t,n,a){return t=qn(6,t,null,n),t.lanes=a,t}function Xm(t){var n=qn(18,null,null,0);return n.stateNode=t,n}function df(t,n,a){return n=qn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var km=new WeakMap;function hi(t,n){if(typeof t=="object"&&t!==null){var a=km.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Mt(n)},km.set(t,n),n)}return{value:t,source:n,stack:Mt(n)}}var cr=[],fr=0,Wl=null,wo=0,di=[],pi=0,Na=null,zi=1,Ii="";function oa(t,n){cr[fr++]=wo,cr[fr++]=Wl,Wl=t,wo=n}function Ym(t,n,a){di[pi++]=zi,di[pi++]=Ii,di[pi++]=Na,Na=t;var r=zi;t=Ii;var u=32-Ln(r)-1;r&=~(1<<u),a+=1;var c=32-Ln(n)+u;if(30<c){var _=u-u%5;c=(r&(1<<_)-1).toString(32),r>>=_,u-=_,zi=1<<32-Ln(n)+u|a<<u|r,Ii=c+t}else zi=1<<c|a<<u|r,Ii=t}function jl(t){t.return!==null&&(oa(t,1),Ym(t,1,0))}function pf(t){for(;t===Wl;)Wl=cr[--fr],cr[fr]=null,wo=cr[--fr],cr[fr]=null;for(;t===Na;)Na=di[--pi],di[pi]=null,Ii=di[--pi],di[pi]=null,zi=di[--pi],di[pi]=null}function qm(t,n){di[pi++]=zi,di[pi++]=Ii,di[pi++]=Na,zi=n.id,Ii=n.overflow,Na=t}var yn=null,je=null,Se=!1,La=null,mi=!1,mf=Error(s(519));function Oa(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Do(hi(n,t)),mf}function Wm(t){var n=t.stateNode,a=t.type,r=t.memoizedProps;switch(n[Nt]=t,n[Dt]=r,a){case"dialog":Te("cancel",n),Te("close",n);break;case"iframe":case"object":case"embed":Te("load",n);break;case"video":case"audio":for(a=0;a<Jo.length;a++)Te(Jo[a],n);break;case"source":Te("error",n);break;case"img":case"image":case"link":Te("error",n),Te("load",n);break;case"details":Te("toggle",n);break;case"input":Te("invalid",n),sm(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":Te("invalid",n);break;case"textarea":Te("invalid",n),om(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||p0(n.textContent,a)?(r.popover!=null&&(Te("beforetoggle",n),Te("toggle",n)),r.onScroll!=null&&Te("scroll",n),r.onScrollEnd!=null&&Te("scrollend",n),r.onClick!=null&&(n.onclick=Pi),n=!0):n=!1,n||Oa(t,!0)}function Zl(t){for(yn=t.return;yn;)switch(yn.tag){case 5:case 31:case 13:mi=!1;return;case 27:case 3:mi=!0;return;default:yn=yn.return}}function hr(t){if(t!==yn)return!1;if(!Se)return Zl(t),Se=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Yh(t.type,t.memoizedProps)),a=!a),a&&je&&Oa(t),Zl(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));je=L0(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));je=L0(t)}else n===27?(n=je,Ka(t.type)?(t=td,td=null,je=t):je=n):je=yn?gi(t.stateNode.nextSibling):null;return!0}function Ms(){je=yn=null,Se=!1}function _f(){var t=La;return t!==null&&(Zn===null?Zn=t:Zn.push.apply(Zn,t),La=null),t}function Do(t){La===null?La=[t]:La.push(t)}var gf=le(null),Es=null,la=null;function Pa(t,n,a){bt(gf,n._currentValue),n._currentValue=a}function ua(t){t._currentValue=gf.current,ae(gf)}function Kl(t,n,a){for(;t!==null;){var r=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),t===a)break;t=t.return}}function vf(t,n,a,r){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var c=u.dependencies;if(c!==null){var _=u.child;c=c.firstContext;t:for(;c!==null;){var E=c;c=u;for(var z=0;z<n.length;z++)if(E.context===n[z]){c.lanes|=a,E=c.alternate,E!==null&&(E.lanes|=a),Kl(c.return,a,t),r||(_=null);break t}c=E.next}}else if(u.tag===18){if(_=u.return,_===null)throw Error(s(341));_.lanes|=a,c=_.alternate,c!==null&&(c.lanes|=a),Kl(_,a,t),_=null}else u.tag===13&&u.memoizedState!==null&&u.memoizedState.dehydrated===null?(u.lanes|=a,_=u.alternate,_!==null&&(_.lanes|=a),Kl(u.return,a,t),_=u.child,_=_!==null?_.sibling:null):_=u.child;if(_!==null)_.return=u;else for(_=u;_!==null;){if(_===t){_=null;break}if(u=_.sibling,u!==null){u.return=_.return,_=u;break}_=_.return}u=_}}function Ts(t,n,a,r){t=null;for(var u=n,c=!1;u!==null;){if(!c){if((u.flags&524288)!==0)c=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var _=u.alternate;if(_===null)throw Error(s(387));if(_=_.memoizedProps,_!==null){var E=u.type;$n(u.pendingProps.value,_.value)||(t!==null?t.push(E):t=[E])}}else if(u===$e.current){if(_=u.alternate,_===null)throw Error(s(387));_.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Ir):t=[Ir])}u=u.return}return t!==null&&vf(n,t,a,r),n.flags|=262144,t!==null}function Ql(t){for(t=t.firstContext;t!==null;){if(!$n(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function bs(t){Es=t,la=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function An(t){return jm(Es,t)}function Jl(t,n){return Es===null&&bs(t),jm(t,n)}function jm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},la===null){if(t===null)throw Error(s(308));la=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else la=la.next=n;return a}var jy=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,r){t.push(r)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},Zy=o.unstable_scheduleCallback,Ky=o.unstable_NormalPriority,un={$$typeof:ct,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Sf(){return{controller:new jy,data:new Map,refCount:0}}function Uo(t){t.refCount--,t.refCount===0&&Zy(Ky,function(){t.controller.abort()})}function Zm(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var r=n[t];a.indexOf(r)===-1&&a.push(r)}}}var No=null;function Qy(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var Lo=null,yf=0,As=0,dr=null;function Jy(t,n){if(Lo===null){var a=Lo=[];yf=0,As=zh(),dr={status:"pending",value:void 0,then:function(r){a.push(r)}}}return yf++,n.then(Km,Km),n}function Km(){if(--yf===0&&(No=null,Lo!==null)){dr!==null&&(dr.status="fulfilled");var t=Lo;Lo=null,As=0,dr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function $y(t,n){var a=[],r={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){r.status="fulfilled",r.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(r.status="rejected",r.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),r}var Qm=gt.S;gt.S=function(t,n){if(Xg=X(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Jy(t,n),No!==null)for(var a=Ur;a!==null;)Zm(a,No),a=a.next;if(a=t.types,a!==null){for(var r=Ur;r!==null;)Zm(r,a),r=r.next;if(As!==0){r=No,r===null&&(r=No=[]);for(var u=0;u<a.length;u++){var c=a[u];r.indexOf(c)===-1&&r.push(c)}}}Qm!==null&&Qm(t,n)};var Rs=le(null);function xf(){var t=Rs.current;return t!==null?t:qe.pooledCache}function $l(t,n){n===null?bt(Rs,Rs.current):bt(Rs,n.pool)}function Jm(){var t=xf();return t===null?null:{parent:un._currentValue,pool:t}}var pr=Error(s(460)),Mf=Error(s(474)),tu=Error(s(542)),eu={then:function(){}};function $m(t){return t=t.status,t==="fulfilled"||t==="rejected"}function t_(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Pi,Pi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,n_(t),t===void 0&&!("reason"in n)?Error(s(600)):t;default:if(typeof n.status=="string")n.then(Pi,Pi);else{if(t=qe,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(r){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=r}},function(r){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,n_(t),t}throw ws=n,pr}}function Cs(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ws=a,pr):a}}var ws=null;function e_(){if(ws===null)throw Error(s(459));var t=ws;return ws=null,t}function n_(t){if(t===pr||t===tu)throw Error(s(483))}var mr=null,Oo=0;function nu(t){var n=Oo;return Oo+=1,mr===null&&(mr=[]),t_(mr,t,n)}function za(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function iu(t,n){throw n.$$typeof===F?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function i_(t){function n(q,V){if(t){var J=q.deletions;J===null?(q.deletions=[V],q.flags|=16):J.push(V)}}function a(q,V){if(!t)return null;for(;V!==null;)n(q,V),V=V.sibling;return null}function r(q){for(var V=new Map;q!==null;)q.key===null?V.set(q.index,q):V.set(q.key,q),q=q.sibling;return V}function u(q,V){return q=ra(q,V),q.index=0,q.sibling=null,q}function c(q,V,J){return q.index=J,t?(J=q.alternate,J!==null?(J=J.index,J<V?(q.flags|=2,V):J):(q.flags|=134217730,V)):(q.flags|=1048576,V)}function _(q){return t&&q.alternate===null&&(q.flags|=134217730),q}function E(q,V,J,ht){return V===null||V.tag!==6?(V=hf(J,q.mode,ht),V.return=q,V):(V=u(V,J),V.return=q,V)}function z(q,V,J,ht){var Ht=J.type;return Ht===H?(q=nt(q,V,J.props.children,ht,J.key),za(q,J),q):V!==null&&(V.elementType===Ht||typeof Ht=="object"&&Ht!==null&&Ht.$$typeof===yt&&Cs(Ht)===V.type)?(V=u(V,J.props),za(V,J),V.return=q,V):(V=ql(J.type,J.key,J.props,null,q.mode,ht),za(V,J),V.return=q,V)}function j(q,V,J,ht){return V===null||V.tag!==4||V.stateNode.containerInfo!==J.containerInfo||V.stateNode.implementation!==J.implementation?(V=df(J,q.mode,ht),V.return=q,V):(V=u(V,J.children||[]),V.return=q,V)}function nt(q,V,J,ht,Ht){return V===null||V.tag!==7?(V=xs(J,q.mode,ht,Ht),V.return=q,V):(V=u(V,J),V.return=q,V)}function dt(q,V,J){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return V=hf(""+V,q.mode,J),V.return=q,V;if(typeof V=="object"&&V!==null){switch(V.$$typeof){case U:return J=ql(V.type,V.key,V.props,null,q.mode,J),za(J,V),J.return=q,J;case C:return V=df(V,q.mode,J),V.return=q,V;case yt:return V=Cs(V),dt(q,V,J)}if(lt(V)||ut(V))return V=xs(V,q.mode,J,null),V.return=q,V;if(typeof V.then=="function")return dt(q,nu(V),J);if(V.$$typeof===ct)return dt(q,Jl(q,V),J);iu(q,V)}return null}function k(q,V,J,ht){var Ht=V!==null?V.key:null;if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return Ht!==null?null:E(q,V,""+J,ht);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case U:return J.key===Ht?z(q,V,J,ht):null;case C:return J.key===Ht?j(q,V,J,ht):null;case yt:return J=Cs(J),k(q,V,J,ht)}if(lt(J)||ut(J))return Ht!==null?null:nt(q,V,J,ht,null);if(typeof J.then=="function")return k(q,V,nu(J),ht);if(J.$$typeof===ct)return k(q,V,Jl(q,J),ht);iu(q,J)}return null}function $(q,V,J,ht,Ht){if(typeof ht=="string"&&ht!==""||typeof ht=="number"||typeof ht=="bigint")return q=q.get(J)||null,E(V,q,""+ht,Ht);if(typeof ht=="object"&&ht!==null){switch(ht.$$typeof){case U:return q=q.get(ht.key===null?J:ht.key)||null,z(V,q,ht,Ht);case C:return q=q.get(ht.key===null?J:ht.key)||null,j(V,q,ht,Ht);case yt:return ht=Cs(ht),$(q,V,J,ht,Ht)}if(lt(ht)||ut(ht))return q=q.get(J)||null,nt(V,q,ht,Ht,null);if(typeof ht.then=="function")return $(q,V,J,nu(ht),Ht);if(ht.$$typeof===ct)return $(q,V,J,Jl(V,ht),Ht);iu(V,ht)}return null}function Ut(q,V,J,ht){for(var Ht=null,Ae=null,Kt=V,se=V=0,hn=null;Kt!==null&&se<J.length;se++){Kt.index>se?(hn=Kt,Kt=null):hn=Kt.sibling;var Ce=k(q,Kt,J[se],ht);if(Ce===null){Kt===null&&(Kt=hn);break}t&&Kt&&Ce.alternate===null&&n(q,Kt),V=c(Ce,V,se),Ae===null?Ht=Ce:Ae.sibling=Ce,Ae=Ce,Kt=hn}if(se===J.length)return a(q,Kt),Se&&oa(q,se),Ht;if(Kt===null){for(;se<J.length;se++)Kt=dt(q,J[se],ht),Kt!==null&&(V=c(Kt,V,se),Ae===null?Ht=Kt:Ae.sibling=Kt,Ae=Kt);return Se&&oa(q,se),Ht}for(Kt=r(Kt);se<J.length;se++)hn=$(Kt,q,se,J[se],ht),hn!==null&&(t&&(Ce=hn.alternate,Ce!==null&&Kt.delete(Ce.key===null?se:Ce.key)),V=c(hn,V,se),Ae===null?Ht=hn:Ae.sibling=hn,Ae=hn);return t&&Kt.forEach(function(es){return n(q,es)}),Se&&oa(q,se),Ht}function kt(q,V,J,ht){if(J==null)throw Error(s(151));for(var Ht=null,Ae=null,Kt=V,se=V=0,hn=null,Ce=J.next();Kt!==null&&!Ce.done;se++,Ce=J.next()){Kt.index>se?(hn=Kt,Kt=null):hn=Kt.sibling;var es=k(q,Kt,Ce.value,ht);if(es===null){Kt===null&&(Kt=hn);break}t&&Kt&&es.alternate===null&&n(q,Kt),V=c(es,V,se),Ae===null?Ht=es:Ae.sibling=es,Ae=es,Kt=hn}if(Ce.done)return a(q,Kt),Se&&oa(q,se),Ht;if(Kt===null){for(;!Ce.done;se++,Ce=J.next())Ce=dt(q,Ce.value,ht),Ce!==null&&(V=c(Ce,V,se),Ae===null?Ht=Ce:Ae.sibling=Ce,Ae=Ce);return Se&&oa(q,se),Ht}for(Kt=r(Kt);!Ce.done;se++,Ce=J.next())Ce=$(Kt,q,se,Ce.value,ht),Ce!==null&&(t&&(hn=Ce.alternate,hn!==null&&Kt.delete(hn.key===null?se:hn.key)),V=c(Ce,V,se),Ae===null?Ht=Ce:Ae.sibling=Ce,Ae=Ce);return t&&Kt.forEach(function(LM){return n(q,LM)}),Se&&oa(q,se),Ht}function pe(q,V,J,ht){if(typeof J=="object"&&J!==null&&J.type===H&&J.key===null&&J.props.ref===void 0&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case U:t:{for(var Ht=J.key;V!==null;){if(V.key===Ht){if(Ht=J.type,Ht===H){if(V.tag===7){a(q,V.sibling),ht=u(V,J.props.children),za(ht,J),ht.return=q,q=ht;break t}}else if(V.elementType===Ht||typeof Ht=="object"&&Ht!==null&&Ht.$$typeof===yt&&Cs(Ht)===V.type){a(q,V.sibling),ht=u(V,J.props),za(ht,J),ht.return=q,q=ht;break t}a(q,V);break}else n(q,V);V=V.sibling}J.type===H?(ht=xs(J.props.children,q.mode,ht,J.key),za(ht,J),ht.return=q,q=ht):(ht=ql(J.type,J.key,J.props,null,q.mode,ht),za(ht,J),ht.return=q,q=ht)}return _(q);case C:t:{for(Ht=J.key;V!==null;){if(V.key===Ht)if(V.tag===4&&V.stateNode.containerInfo===J.containerInfo&&V.stateNode.implementation===J.implementation){a(q,V.sibling),ht=u(V,J.children||[]),ht.return=q,q=ht;break t}else{a(q,V);break}else n(q,V);V=V.sibling}ht=df(J,q.mode,ht),ht.return=q,q=ht}return _(q);case yt:return J=Cs(J),pe(q,V,J,ht)}if(lt(J))return Ut(q,V,J,ht);if(ut(J)){if(Ht=ut(J),typeof Ht!="function")throw Error(s(150));return J=Ht.call(J),kt(q,V,J,ht)}if(typeof J.then=="function")return pe(q,V,nu(J),ht);if(J.$$typeof===ct)return pe(q,V,Jl(q,J),ht);iu(q,J)}return typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint"?(J=""+J,V!==null&&V.tag===6?(a(q,V.sibling),ht=u(V,J),ht.return=q,q=ht):(a(q,V),ht=hf(J,q.mode,ht),ht.return=q,q=ht),_(q)):a(q,V)}return function(q,V,J,ht){try{Oo=0;var Ht=pe(q,V,J,ht);return mr=null,Ht}catch(Kt){if(Kt===pr||Kt===tu)throw Kt;var Ae=qn(29,Kt,null,q.mode);return Ae.lanes=ht,Ae.return=q,Ae}}}var Ds=i_(!0),a_=i_(!1),Ia=!1;function Ef(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Tf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ba(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Fa(t,n,a){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,(Le&2)!==0){var u=r.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),r.pending=n,n=Yl(t),Gm(t,null,a),n}return kl(t,r,n,a),Yl(t)}function Po(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,R(t,a)}}function bf(t,n){var a=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var u=null,c=null;if(a=a.firstBaseUpdate,a!==null){do{var _={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};c===null?u=c=_:c=c.next=_,a=a.next}while(a!==null);c===null?u=c=n:c=c.next=n}else u=c=n;a={baseState:r.baseState,firstBaseUpdate:u,lastBaseUpdate:c,shared:r.shared,callbacks:r.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Af=!1;function zo(){if(Af){var t=dr;if(t!==null)throw t}}function Io(t,n,a,r){Af=!1;var u=t.updateQueue;Ia=!1;var c=u.firstBaseUpdate,_=u.lastBaseUpdate,E=u.shared.pending;if(E!==null){u.shared.pending=null;var z=E,j=z.next;z.next=null,_===null?c=j:_.next=j,_=z;var nt=t.alternate;nt!==null&&(nt=nt.updateQueue,E=nt.lastBaseUpdate,E!==_&&(E===null?nt.firstBaseUpdate=j:E.next=j,nt.lastBaseUpdate=z))}if(c!==null){var dt=u.baseState;_=0,nt=j=z=null,E=c;do{var k=E.lane&-536870913,$=k!==E.lane;if($?(be&k)===k:(r&k)===k){k!==0&&k===As&&(Af=!0),nt!==null&&(nt=nt.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});t:{var Ut=t,kt=E;k=n;var pe=a;switch(kt.tag){case 1:if(Ut=kt.payload,typeof Ut=="function"){dt=Ut.call(pe,dt,k);break t}dt=Ut;break t;case 3:Ut.flags=Ut.flags&-65537|128;case 0:if(Ut=kt.payload,k=typeof Ut=="function"?Ut.call(pe,dt,k):Ut,k==null)break t;dt=L({},dt,k);break t;case 2:Ia=!0}}k=E.callback,k!==null&&(t.flags|=64,$&&(t.flags|=8192),$=u.callbacks,$===null?u.callbacks=[k]:$.push(k))}else $={lane:k,tag:E.tag,payload:E.payload,callback:E.callback,next:null},nt===null?(j=nt=$,z=dt):nt=nt.next=$,_|=k;if(E=E.next,E===null){if(E=u.shared.pending,E===null)break;$=E,E=$.next,$.next=null,u.lastBaseUpdate=$,u.shared.pending=null}}while(!0);nt===null&&(z=dt),u.baseState=z,u.firstBaseUpdate=j,u.lastBaseUpdate=nt,c===null&&(u.shared.lanes=0),qa|=_,t.lanes=_,t.memoizedState=dt}}function s_(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function r_(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)s_(a[t],n)}var Ha=le(null),au=le(0);function o_(t,n){t=pa,bt(au,t),bt(Ha,n),pa=t|n.baseLanes}function Rf(){bt(au,pa),bt(Ha,Ha.current)}function Cf(){pa=au.current,ae(Ha),ae(au)}var Rn=le(null),Pn=null;function Ga(t){var n=t.alternate;bt(Cn,Cn.current&1),bt(Rn,t),Pn===null&&(n===null||Ha.current!==null||n.memoizedState!==null)&&(Pn=t)}function wf(t){bt(Cn,Cn.current),bt(Rn,t),Pn===null&&(Pn=t)}function l_(t){t.tag===22?(bt(Cn,Cn.current),bt(Rn,t),Pn===null&&(Pn=t)):Va()}function Va(){bt(Cn,Cn.current),bt(Rn,Rn.current)}function ti(t){ae(Rn),Pn===t&&(Pn=null),ae(Cn)}var Cn=le(0);function Bo(t,n){bt(Rn,Rn.current),bt(Cn,n)}function Df(t){ae(Cn),ae(Rn),Pn===t&&(Pn=null)}function su(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Jh(a)||$h(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ca=0,de=null,Ge=null,cn=null,ru=!1,_r=!1,Us=!1,ou=0,Fo=0,gr=null,tx=0;function nn(){throw Error(s(321))}function Uf(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!$n(t[a],n[a]))return!1;return!0}function Nf(t,n,a,r,u,c){return ca=c,de=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,gt.H=t===null||t.memoizedState===null?Y_:q_,Us=!1,c=a(r,u),Us=!1,_r&&(c=c_(n,a,r,u)),u_(t),c}function u_(t){gt.H=pu;var n=Ge!==null&&Ge.next!==null;if(ca=0,cn=Ge=de=null,ru=!1,Fo=0,gr=null,n)throw Error(s(300));t===null||fn||(t=t.dependencies,t!==null&&Ql(t)&&(fn=!0))}function c_(t,n,a,r){de=t;var u=0;do{if(_r&&(gr=null),Fo=0,_r=!1,25<=u)throw Error(s(301));if(u+=1,cn=Ge=null,t.updateQueue!=null){var c=t.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}gt.H=lx,c=n(a,r)}while(_r);return c}function ex(){var t=gt.H,n=t.useState()[0];return n=typeof n.then=="function"?Ho(n):n,t=t.useState()[0],(Ge!==null?Ge.memoizedState:null)!==t&&(de.flags|=1024),n}function Lf(){var t=ou!==0;return ou=0,t}function Of(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Pf(t){if(ru){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}ru=!1}ca=0,cn=Ge=de=null,_r=!1,Fo=ou=0,gr=null}function Fn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return cn===null?de.memoizedState=cn=t:cn=cn.next=t,cn}function rn(){if(Ge===null){var t=de.alternate;t=t!==null?t.memoizedState:null}else t=Ge.next;var n=cn===null?de.memoizedState:cn.next;if(n!==null)cn=n,Ge=t;else{if(t===null)throw de.alternate===null?Error(s(467)):Error(s(310));Ge=t,t={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},cn===null?de.memoizedState=cn=t:cn=cn.next=t}return cn}function lu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ho(t){var n=Fo;return Fo+=1,gr===null&&(gr=[]),t=t_(gr,t,n),n=de,(cn===null?n.memoizedState:cn.next)===null&&(n=n.alternate,gt.H=n===null||n.memoizedState===null?Y_:q_),t}function uu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Ho(t);if(t.$$typeof===Z)return;if(t.$$typeof===ct)return An(t)}throw Error(s(438,String(t)))}function zf(t){var n=null,a=de.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=de.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=lu(),de.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),r=0;r<t;r++)a[r]=re;return n.index++,a}function fa(t,n){return typeof n=="function"?n(t):n}function cu(t){var n=rn();return If(n,Ge,t)}function If(t,n,a){var r=t.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var u=t.baseQueue,c=r.pending;if(c!==null){if(u!==null){var _=u.next;u.next=c.next,c.next=_}n.baseQueue=u=c,r.pending=null}if(c=t.baseState,u===null)t.memoizedState=c;else{n=u.next;var E=_=null,z=null,j=n,nt=!1;do{var dt=j.lane&-536870913;if(dt!==j.lane?(be&dt)===dt:(ca&dt)===dt){var k=j.revertLane;if(k===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null}),dt===As&&(nt=!0);else if((ca&k)===k){j=j.next,k===As&&(nt=!0);continue}else dt={lane:0,revertLane:j.revertLane,gesture:null,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},z===null?(E=z=dt,_=c):z=z.next=dt,de.lanes|=k,qa|=k;dt=j.action,Us&&a(c,dt),c=j.hasEagerState?j.eagerState:a(c,dt)}else k={lane:dt,revertLane:j.revertLane,gesture:j.gesture,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},z===null?(E=z=k,_=c):z=z.next=k,de.lanes|=dt,qa|=dt;j=j.next}while(j!==null&&j!==n);if(z===null?_=c:z.next=E,!$n(c,t.memoizedState)&&(fn=!0,nt&&(a=dr,a!==null)))throw a;t.memoizedState=c,t.baseState=_,t.baseQueue=z,r.lastRenderedState=c}return u===null&&(r.lanes=0),[t.memoizedState,r.dispatch]}function Bf(t){var n=rn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var r=a.dispatch,u=a.pending,c=n.memoizedState;if(u!==null){a.pending=null;var _=u=u.next;do c=t(c,_.action),_=_.next;while(_!==u);$n(c,n.memoizedState)||(fn=!0),n.memoizedState=c,n.baseQueue===null&&(n.baseState=c),a.lastRenderedState=c}return[c,r]}function f_(t,n,a){var r=de,u=rn(),c=Se;if(c){if(a===void 0)throw Error(s(407));a=a()}else a=n();var _=!$n((Ge||u).memoizedState,a);if(_&&(u.memoizedState=a,fn=!0),u=u.queue,Gf(p_.bind(null,r,u,t),[t]),t=u.getSnapshot!==n||_||cn!==null&&(cn.memoizedState.tag&1)!==0,vr(t?9:8,{destroy:void 0},d_.bind(null,r,u,a,n),null),t){if(r.flags|=2048,qe===null)throw Error(s(349));c||(ca&127)!==0||h_(r,n,a)}return a}function h_(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=de.updateQueue,n===null?(n=lu(),de.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function d_(t,n,a,r){n.value=a,n.getSnapshot=r,m_(n)&&__(t)}function p_(t,n,a){return a(function(){m_(n)&&__(t)})}function m_(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!$n(t,a)}catch{return!0}}function __(t){var n=ys(t,2);n!==null&&Kn(n,t,2)}function Ff(t){var n=Fn();if(typeof t=="function"){var a=t;if(t=a(),Us){Sn(!0);try{a()}finally{Sn(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fa,lastRenderedState:t},n}function g_(t,n,a,r){return t.baseState=a,If(t,Ge,typeof r=="function"?r:fa)}function nx(t,n,a,r,u){if(du(t))throw Error(s(485));if(t=n.action,t!==null){var c={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){c.listeners.push(_)}};gt.T!==null?a(!0):c.isTransition=!1,r(c),a=n.pending,a===null?(c.next=n.pending=c,v_(n,c)):(c.next=a.next,n.pending=a.next=c)}}function v_(t,n){var a=n.action,r=n.payload,u=t.state;if(n.isTransition){var c=gt.T,_={};_.types=c!==null?c.types:null,gt.T=_;try{var E=a(u,r),z=gt.S;z!==null&&z(_,E),S_(t,n,E)}catch(j){Hf(t,n,j)}finally{c!==null&&_.types!==null&&(c.types=_.types),gt.T=c}}else try{c=a(u,r),S_(t,n,c)}catch(j){Hf(t,n,j)}}function S_(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){y_(t,n,r)},function(r){return Hf(t,n,r)}):y_(t,n,a)}function y_(t,n,a){n.status="fulfilled",n.value=a,x_(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,v_(t,a)))}function Hf(t,n,a){var r=t.pending;if(t.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,x_(n),n=n.next;while(n!==r)}t.action=null}function x_(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function M_(t,n){return n}function E_(t,n){if(Se){var a=qe.formState;if(a!==null){t:{var r=de;if(Se){if(je){e:{for(var u=je,c=mi;u.nodeType!==8;){if(!c){u=null;break e}if(u=gi(u.nextSibling),u===null){u=null;break e}}c=u.data,u=c==="F!"||c==="F"?u:null}if(u){je=gi(u.nextSibling),r=u.data==="F!";break t}}Oa(r)}r=!1}r&&(n=a[0])}}return a=Fn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:M_,lastRenderedState:n},a.queue=r,a=V_.bind(null,de,r),r.dispatch=a,r=Ff(!1),c=qf.bind(null,de,!1,r.queue),r=Fn(),u={state:n,dispatch:null,action:t,pending:null},r.queue=u,a=nx.bind(null,de,u,c,a),u.dispatch=a,r.memoizedState=t,[n,a,!1]}function T_(t){var n=rn();return b_(n,Ge,t)}function b_(t,n,a){if(n=If(t,n,M_)[0],t=cu(fa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=Ho(n)}catch(_){throw _===pr?tu:_}else r=n;n=rn();var u=n.queue,c=u.dispatch;return a!==n.memoizedState&&(de.flags|=2048,vr(9,{destroy:void 0},ix.bind(null,u,a),null)),[r,c,t]}function ix(t,n){t.action=n}function A_(t){var n=rn(),a=Ge;if(a!==null)return b_(n,a,t);rn(),n=n.memoizedState,a=rn();var r=a.queue.dispatch;return a.memoizedState=t,[n,r,!1]}function vr(t,n,a,r){return t={tag:t,create:a,deps:r,inst:n,next:null},n=de.updateQueue,n===null&&(n=lu(),de.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(r=a.next,a.next=t,t.next=r,n.lastEffect=t),t}function R_(){return rn().memoizedState}function fu(t,n,a,r){var u=Fn();de.flags|=t,u.memoizedState=vr(1|n,{destroy:void 0},a,r===void 0?null:r)}function hu(t,n,a,r){var u=rn();r=r===void 0?null:r;var c=u.memoizedState.inst;Ge!==null&&r!==null&&Uf(r,Ge.memoizedState.deps)?u.memoizedState=vr(n,c,a,r):(de.flags|=t,u.memoizedState=vr(1|n,c,a,r))}function C_(t,n){fu(8390656,8,t,n)}function Gf(t,n){hu(2048,8,t,n)}function ax(t){de.flags|=4;var n=de.updateQueue;if(n===null)n=lu(),de.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function w_(t){var n=rn().memoizedState;return ax({ref:n,nextImpl:t}),function(){if((Le&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function D_(t,n){return hu(4,2,t,n)}function U_(t,n){return hu(4,4,t,n)}function N_(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function L_(t,n,a){a=a!=null?a.concat([t]):null,hu(4,4,N_.bind(null,n,t),a)}function Vf(){}function O_(t,n){var a=rn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Uf(n,r[1])?r[0]:(a.memoizedState=[t,n],t)}function P_(t,n){var a=rn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Uf(n,r[1]))return r[0];if(r=t(),Us){Sn(!0);try{t()}finally{Sn(!1)}}return a.memoizedState=[r,n],r}function Xf(t,n,a){return a===void 0||(ca&1073741824)!==0&&(be&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=Yg(),de.lanes|=t,qa|=t,a)}function z_(t,n,a,r){return $n(a,n)?a:Ha.current!==null?(t=Xf(t,a,r),$n(t,n)||(fn=!0),t):(ca&106)===0||(ca&1073741824)!==0&&(be&261930)===0?(fn=!0,t.memoizedState=a):(t=Yg(),de.lanes|=t,qa|=t,n)}function I_(t,n,a,r,u){var c=Ct.p;Ct.p=c!==0&&8>c?c:8;var _=gt.T,E={};E.types=_!==null?_.types:null,gt.T=E,qf(t,!1,n,a);try{var z=u(),j=gt.S;if(j!==null&&j(E,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var nt=$y(z,r);Go(t,n,nt,ai(t))}else Go(t,n,r,ai(t))}catch(dt){Go(t,n,{then:function(){},status:"rejected",reason:dt},ai())}finally{Ct.p=c,_!==null&&E.types!==null&&(_.types=E.types),gt.T=_}}function sx(){}function kf(t,n,a,r){if(t.tag!==5)throw Error(s(476));var u=B_(t).queue;I_(t,u,n,qt,a===null?sx:function(){return F_(t),a(r)})}function B_(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:qt,baseState:qt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fa,lastRenderedState:qt},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fa,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function F_(t){var n=B_(t);n.next===null&&(n=t.alternate.memoizedState),Go(t,n.next.queue,{},ai())}function Yf(){return An(Ir)}function H_(){return rn().memoizedState}function G_(){return rn().memoizedState}function rx(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ai();t=Ba(a);var r=Fa(n,t,a);r!==null&&(Kn(r,n,a),Po(r,n,a)),n={cache:Sf()},t.payload=n;return}n=n.return}}function ox(t,n,a){var r=ai();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},du(t)?X_(n,a):(a=cf(t,n,a,r),a!==null&&(Kn(a,t,r),k_(a,n,r)))}function V_(t,n,a){var r=ai();Go(t,n,a,r)}function Go(t,n,a,r){var u={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(du(t))X_(n,u);else{var c=t.alternate;if(t.lanes===0&&(c===null||c.lanes===0)&&(c=n.lastRenderedReducer,c!==null))try{var _=n.lastRenderedState,E=c(_,a);if(u.hasEagerState=!0,u.eagerState=E,$n(E,_))return kl(t,n,u,0),qe===null&&Xl(),!1}catch{}if(a=cf(t,n,u,r),a!==null)return Kn(a,t,r),k_(a,n,r),!0}return!1}function qf(t,n,a,r){if(r={lane:2,revertLane:zh(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},du(t)){if(n)throw Error(s(479))}else n=cf(t,a,r,2),n!==null&&Kn(n,t,2)}function du(t){var n=t.alternate;return t===de||n!==null&&n===de}function X_(t,n){_r=ru=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function k_(t,n,a){if((a&4194048)!==0){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,R(t,a)}}var pu={readContext:An,use:uu,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn,useEffectEvent:nn},Y_={readContext:An,use:uu,useCallback:function(t,n){return Fn().memoizedState=[t,n===void 0?null:n],t},useContext:An,useEffect:C_,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,fu(4194308,4,N_.bind(null,n,t),a)},useLayoutEffect:function(t,n){return fu(4194308,4,t,n)},useInsertionEffect:function(t,n){fu(4,2,t,n)},useMemo:function(t,n){var a=Fn();n=n===void 0?null:n;var r=t();if(Us){Sn(!0);try{t()}finally{Sn(!1)}}return a.memoizedState=[r,n],r},useReducer:function(t,n,a){var r=Fn();if(a!==void 0){var u=a(n);if(Us){Sn(!0);try{a(n)}finally{Sn(!1)}}}else u=n;return r.memoizedState=r.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},r.queue=t,t=t.dispatch=ox.bind(null,de,t),[r.memoizedState,t]},useRef:function(t){var n=Fn();return t={current:t},n.memoizedState=t},useState:function(t){t=Ff(t);var n=t.queue,a=V_.bind(null,de,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Vf,useDeferredValue:function(t,n){var a=Fn();return Xf(a,t,n)},useTransition:function(){var t=Ff(!1);return t=I_.bind(null,de,t.queue,!0,!1),Fn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var r=de,u=Fn();if(Se){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),qe===null)throw Error(s(349));(be&127)!==0||h_(r,n,a)}u.memoizedState=a;var c={value:a,getSnapshot:n};return u.queue=c,C_(p_.bind(null,r,c,t),[t]),r.flags|=2048,vr(9,{destroy:void 0},d_.bind(null,r,c,a,n),null),a},useId:function(){var t=Fn(),n=qe.identifierPrefix;if(Se){var a=Ii,r=zi;a=(r&~(1<<32-Ln(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=ou++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=tx++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Yf,useFormState:E_,useActionState:E_,useOptimistic:function(t){var n=Fn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=qf.bind(null,de,!0,a),a.dispatch=n,[t,n]},useMemoCache:zf,useCacheRefresh:function(){return Fn().memoizedState=rx.bind(null,de)},useEffectEvent:function(t){var n=Fn(),a={impl:t};return n.memoizedState=a,function(){if((Le&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},q_={readContext:An,use:uu,useCallback:O_,useContext:An,useEffect:Gf,useImperativeHandle:L_,useInsertionEffect:D_,useLayoutEffect:U_,useMemo:P_,useReducer:cu,useRef:R_,useState:function(){return cu(fa)},useDebugValue:Vf,useDeferredValue:function(t,n){var a=rn();return z_(a,Ge.memoizedState,t,n)},useTransition:function(){var t=cu(fa)[0],n=rn().memoizedState;return[typeof t=="boolean"?t:Ho(t),n]},useSyncExternalStore:f_,useId:H_,useHostTransitionStatus:Yf,useFormState:T_,useActionState:T_,useOptimistic:function(t,n){var a=rn();return g_(a,Ge,t,n)},useMemoCache:zf,useCacheRefresh:G_,useEffectEvent:w_},lx={readContext:An,use:uu,useCallback:O_,useContext:An,useEffect:Gf,useImperativeHandle:L_,useInsertionEffect:D_,useLayoutEffect:U_,useMemo:P_,useReducer:Bf,useRef:R_,useState:function(){return Bf(fa)},useDebugValue:Vf,useDeferredValue:function(t,n){var a=rn();return Ge===null?Xf(a,t,n):z_(a,Ge.memoizedState,t,n)},useTransition:function(){var t=Bf(fa)[0],n=rn().memoizedState;return[typeof t=="boolean"?t:Ho(t),n]},useSyncExternalStore:f_,useId:H_,useHostTransitionStatus:Yf,useFormState:A_,useActionState:A_,useOptimistic:function(t,n){var a=rn();return Ge!==null?g_(a,Ge,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:zf,useCacheRefresh:G_,useEffectEvent:w_};function Wf(t,n,a,r){n=t.memoizedState,a=a(r,n),a=a==null?n:L({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var jf={enqueueSetState:function(t,n,a){t=t._reactInternals;var r=ai(),u=Ba(r);u.payload=n,a!=null&&(u.callback=a),n=Fa(t,u,r),n!==null&&(Kn(n,t,r),Po(n,t,r))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var r=ai(),u=Ba(r);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Fa(t,u,r),n!==null&&(Kn(n,t,r),Po(n,t,r))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ai(),r=Ba(a);r.tag=2,n!=null&&(r.callback=n),n=Fa(t,r,a),n!==null&&(Kn(n,t,a),Po(n,t,a))}};function W_(t,n,a,r,u,c,_){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,c,_):n.prototype&&n.prototype.isPureReactComponent?!Ro(a,r)||!Ro(u,c):!0}function j_(t,n,a,r){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==t&&jf.enqueueReplaceState(n,n.state,null)}function Ns(t,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(t=t.defaultProps){a===n&&(a=L({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Z_(t){Vl(t)}function K_(t){console.error(t)}function Q_(t){Vl(t)}function mu(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function J_(t,n,a){try{var r=t.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Zf(t,n,a){return a=Ba(a),a.tag=3,a.payload={element:null},a.callback=function(){mu(t,n)},a}function $_(t){return t=Ba(t),t.tag=3,t}function tg(t,n,a,r){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var c=r.value;t.payload=function(){return u(c)},t.callback=function(){J_(n,a,r)}}var _=a.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(t.callback=function(){J_(n,a,r),typeof u!="function"&&(Wa===null?Wa=new Set([this]):Wa.add(this));var E=r.stack;this.componentDidCatch(r.value,{componentStack:E!==null?E:""})})}function ux(t,n,a,r,u){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&Ts(n,a,u,!0),a=Rn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return Pn===null?zu():a.alternate===null&&an===0&&(an=3),a.flags&=-257,a.flags|=65536,a.lanes=u,r===eu?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),Lh(t,r,u)),!1;case 22:return a.flags|=65536,r===eu?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),Lh(t,r,u)),!1}throw Error(s(435,a.tag))}return Lh(t,r,u),zu(),!1}if(Se)return n=Rn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,r!==mf&&(t=Error(s(422),{cause:r}),Do(hi(t,a)))):(r!==mf&&(n=Error(s(423),{cause:r}),Do(hi(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,r=hi(r,a),u=Zf(t.stateNode,r,u),bf(t,u),an!==4&&(an=2)),!1;var c=Error(s(520),{cause:r});if(c=hi(c,a),Zo===null?Zo=[c]:Zo.push(c),an!==4&&(an=2),n===null)return!0;r=hi(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=Zf(a.stateNode,r,t),bf(a,t),!1;case 1:if(n=a.type,c=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Wa===null||!Wa.has(c))))return a.flags|=65536,u&=-u,a.lanes|=u,u=$_(u),tg(u,t,a,r),bf(a,u),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var Kf=Error(s(461)),fn=!1;function mn(t,n,a,r){n.child=t===null?a_(n,null,a,r):Ds(n,t.child,a,r)}function eg(t,n,a,r,u){a=a.render;var c=n.ref;if("ref"in r){var _={};for(var E in r)E!=="ref"&&(_[E]=r[E])}else _=r;return bs(n),r=Nf(t,n,a,_,c,u),E=Lf(),t!==null&&!fn?(Of(t,n,u),ha(t,n,u)):(Se&&E&&jl(n),n.flags|=1,mn(t,n,r,u),n.child)}function ng(t,n,a,r,u){if(t===null){var c=a.type;return typeof c=="function"&&!ff(c)&&c.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=c,ig(t,n,c,r,u)):(t=ql(a.type,null,r,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(c=t.child,!ah(t,u)){var _=c.memoizedProps;if(a=a.compare,a=a!==null?a:Ro,a(_,r)&&t.ref===n.ref)return ha(t,n,u)}return n.flags|=1,t=ra(c,r),t.ref=n.ref,t.return=n,n.child=t}function ig(t,n,a,r,u){if(t!==null){var c=t.memoizedProps;if(Ro(c,r)&&t.ref===n.ref)if(fn=!1,n.pendingProps=r=c,ah(t,u))(t.flags&131072)!==0&&(fn=!0);else return n.lanes=t.lanes,ha(t,n,u)}return Qf(t,n,a,r,u)}function ag(t,n,a,r){var u=r.children,c=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(c=c!==null?c.baseLanes|a:a,t!==null){for(r=n.child=t.child,u=0;r!==null;)u=u|r.lanes|r.childLanes,r=r.sibling;r=u&~c}else r=0,n.child=null;return sg(t,n,c,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&$l(n,c!==null?c.cachePool:null),c!==null?o_(n,c):Rf(),l_(n);else return r=n.lanes=536870912,sg(t,n,c!==null?c.baseLanes|a:a,a,r)}else c!==null?($l(n,c.cachePool),o_(n,c),Va(),n.memoizedState=null):(t!==null&&$l(n,null),Rf(),Va());return mn(t,n,u,a),n.child}function Vo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function sg(t,n,a,r,u){var c=xf();return c=c===null?null:{parent:un._currentValue,pool:c},n.memoizedState={baseLanes:a,cachePool:c},t!==null&&$l(n,null),Rf(),l_(n),t!==null&&Ts(t,n,r,!0),n.childLanes=u,null}function _u(t,n){return n=gu({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function rg(t,n,a){return Ds(n,t.child,null,a),t=_u(n,n.pendingProps),t.flags|=2,ti(n),n.memoizedState=null,t}function cx(t,n,a){var r=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Se){if(r.mode==="hidden")return t=_u(n,r),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Vo(null,t);if(wf(n),(t=je)?(t=N0(t,mi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Na!==null?{id:zi,overflow:Ii}:null,retryLane:536870912,hydrationErrors:null},a=Xm(t),a.return=n,n.child=a,yn=n,je=null)):t=null,t===null)throw Oa(n);return n.lanes=536870912,null}return _u(n,r)}var c=t.memoizedState;if(c!==null){var _=c.dehydrated;if(wf(n),u)if(n.flags&256)n.flags&=-257,n=rg(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(fn||Ts(t,n,a,!1),u=(a&t.childLanes)!==0,fn||u){if(Ha.current===null){if(r=qe,r!==null&&(_=K(r,a),_!==0&&_!==c.retryLane))throw c.retryLane=_,ys(t,_),Kn(r,t,_),Kf;zu()}n=rg(t,n,a)}else t=c.treeContext,je=gi(_.nextSibling),yn=n,Se=!0,La=null,mi=!1,t!==null&&qm(n,t),n=_u(n,r),n.flags|=134221824;return n}return t=ra(t.child,{mode:r.mode,children:r.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Sr(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Qf(t,n,a,r,u){return bs(n),a=Nf(t,n,a,r,void 0,u),r=Lf(),t!==null&&!fn?(Of(t,n,u),ha(t,n,u)):(Se&&r&&jl(n),n.flags|=1,mn(t,n,a,u),n.child)}function og(t,n,a,r,u,c){return bs(n),n.updateQueue=null,a=c_(n,r,a,u),u_(t),r=Lf(),t!==null&&!fn?(Of(t,n,c),ha(t,n,c)):(Se&&r&&jl(n),n.flags|=1,mn(t,n,a,c),n.child)}function lg(t,n,a,r,u){if(bs(n),n.stateNode===null){var c=ur,_=a.contextType;typeof _=="object"&&_!==null&&(c=An(_)),c=new a(r,c),n.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=jf,n.stateNode=c,c._reactInternals=n,c=n.stateNode,c.props=r,c.state=n.memoizedState,c.refs={},Ef(n),_=a.contextType,c.context=typeof _=="object"&&_!==null?An(_):ur,c.state=n.memoizedState,_=a.getDerivedStateFromProps,typeof _=="function"&&(Wf(n,a,_,r),c.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(_=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),_!==c.state&&jf.enqueueReplaceState(c,c.state,null),Io(n,r,c,u),zo(),c.state=n.memoizedState),typeof c.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(t===null){c=n.stateNode;var E=n.memoizedProps,z=Ns(a,E);c.props=z;var j=c.context,nt=a.contextType;_=ur,typeof nt=="object"&&nt!==null&&(_=An(nt));var dt=a.getDerivedStateFromProps;nt=typeof dt=="function"||typeof c.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,nt||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(E||j!==_)&&j_(n,c,r,_),Ia=!1;var k=n.memoizedState;c.state=k,Io(n,r,c,u),zo(),j=n.memoizedState,E||k!==j||Ia?(typeof dt=="function"&&(Wf(n,a,dt,r),j=n.memoizedState),(z=Ia||W_(n,a,z,r,k,j,_))?(nt||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(n.flags|=4194308)):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=j),c.props=r,c.state=j,c.context=_,r=z):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{c=n.stateNode,Tf(t,n),_=n.memoizedProps,nt=Ns(a,_),c.props=nt,dt=n.pendingProps,k=c.context,j=a.contextType,z=ur,typeof j=="object"&&j!==null&&(z=An(j)),E=a.getDerivedStateFromProps,(j=typeof E=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(_!==dt||k!==z)&&j_(n,c,r,z),Ia=!1,k=n.memoizedState,c.state=k,Io(n,r,c,u),zo();var $=n.memoizedState;_!==dt||k!==$||Ia||t!==null&&t.dependencies!==null&&Ql(t.dependencies)?(typeof E=="function"&&(Wf(n,a,E,r),$=n.memoizedState),(nt=Ia||W_(n,a,nt,r,k,$,z)||t!==null&&t.dependencies!==null&&Ql(t.dependencies))?(j||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(r,$,z),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(r,$,z)),typeof c.componentDidUpdate=="function"&&(n.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof c.componentDidUpdate!="function"||_===t.memoizedProps&&k===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&k===t.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=$),c.props=r,c.state=$,c.context=z,r=nt):(typeof c.componentDidUpdate!="function"||_===t.memoizedProps&&k===t.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&k===t.memoizedState||(n.flags|=1024),r=!1)}return c=r,Sr(t,n),r=(n.flags&128)!==0,c||r?(c=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:c.render(),n.flags|=1,t!==null&&r?(n.child=Ds(n,t.child,null,u),n.child=Ds(n,null,a,u)):mn(t,n,a,u),n.memoizedState=c.state,t=n.child):t=ha(t,n,u),t}function ug(t,n,a,r){return Ms(),n.flags|=256,mn(t,n,a,r),n.child}var Jf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $f(t){return{baseLanes:t,cachePool:Jm()}}function th(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ii),t}function cg(t,n,a){var r=n.pendingProps,u=!1,c=(n.flags&128)!==0,_;if((_=c)||(_=t!==null&&t.memoizedState===null?!1:(Cn.current&2)!==0),_&&(u=!0,n.flags&=-129),_=(n.flags&32)!==0,n.flags&=-33,t===null){if(Se){if(u?Ga(n):Va(),(t=je)?(t=N0(t,mi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Na!==null?{id:zi,overflow:Ii}:null,retryLane:536870912,hydrationErrors:null},a=Xm(t),a.return=n,n.child=a,yn=n,je=null)):t=null,t===null)throw Oa(n);return $h(t)?n.lanes=32:n.lanes=536870912,null}return c=r.children,r=r.fallback,u?(Va(),u=n.mode,c=gu({mode:"hidden",children:c},u),r=xs(r,u,a,null),c.return=n,r.return=n,c.sibling=r,n.child=c,r=n.child,r.memoizedState=$f(a),r.childLanes=th(t,_,a),n.memoizedState=Jf,Vo(null,r)):(Ga(n),eh(n,c))}var E=t.memoizedState;if(E!==null){var z=E.dehydrated;if(z!==null)return fx(t,n,c,_,r,z,E,a)}return u?(Va(),u=r.fallback,c=n.mode,E=t.child,z=E.sibling,r=ra(E,{mode:"hidden",children:r.children}),r.subtreeFlags=E.subtreeFlags&1206910976,z!==null?u=ra(z,u):(u=xs(u,c,a,null),u.flags|=2),u.return=n,r.return=n,r.sibling=u,n.child=r,Vo(null,r),r=n.child,u=t.child.memoizedState,u===null?u=$f(a):(c=u.cachePool,c!==null?(E=un._currentValue,c=c.parent!==E?{parent:E,pool:E}:c):c=Jm(),u={baseLanes:u.baseLanes|a,cachePool:c}),r.memoizedState=u,r.childLanes=th(t,_,a),n.memoizedState=Jf,Vo(t.child,r)):(Ga(n),a=t.child,t=a.sibling,a=ra(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,t!==null&&(_=n.deletions,_===null?(n.deletions=[t],n.flags|=16):_.push(t)),n.child=a,n.memoizedState=null,a)}function eh(t,n){return n=gu({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function gu(t,n){return t=qn(22,t,null,n),t.lanes=0,t}function vu(t,n,a){return Ds(n,t.child,null,a),t=eh(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function fx(t,n,a,r,u,c,_,E){if(a)return n.flags&256?(Ga(n),n.flags&=-257,vu(t,n,E)):n.memoizedState!==null?(Va(),n.child=t.child,n.flags|=128,null):(Va(),c=u.fallback,_=n.mode,u=gu({mode:"visible",children:u.children},_),c=xs(c,_,E,null),c.flags|=2,u.return=n,c.return=n,u.sibling=c,n.child=u,Ds(n,t.child,null,E),u=n.child,u.memoizedState=$f(E),u.childLanes=th(t,r,E),n.memoizedState=Jf,Vo(null,u));if(Ga(n),$h(c)){if(r=c.nextSibling&&c.nextSibling.dataset,r)var z=r.dgst;return r=z,r!==""&&(u=Error(s(419)),u.stack="",u.digest=r,Do({value:u,source:null,stack:null})),vu(t,n,E)}if(fn||Ts(t,n,E,!1),r=(E&t.childLanes)!==0,fn||r){if(Ha.current!==null)return vu(t,n,E);if(r=qe,r!==null&&(u=K(r,E),u!==0&&u!==_.retryLane))throw _.retryLane=u,ys(t,u),Kn(r,t,u),Kf;return Jh(c)||zu(),vu(t,n,E)}return Jh(c)?(n.flags|=192,n.child=t.child,null):(t=_.treeContext,je=gi(c.nextSibling),yn=n,Se=!0,La=null,mi=!1,t!==null&&qm(n,t),n=eh(n,u.children),n.flags|=134221824,n)}function fg(t,n,a){t.lanes|=n;var r=t.alternate;r!==null&&(r.lanes|=n),Kl(t.return,n,a)}function hg(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&su(a)===null&&(n=t),t=t.sibling}return n}function Su(t,n,a,r,u,c){var _=t.memoizedState;_===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:u,treeForkCount:c}:(_.isBackwards=n,_.rendering=null,_.renderingStartTime=0,_.last=r,_.tail=a,_.tailMode=u,_.treeForkCount=c)}function nh(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function ih(t,n,a){var r=n.pendingProps,u=r.revealOrder,c=r.tail;r=r.children;var _=Cn.current;if(n.flags&128)return Bo(n,_),null;var E=(_&2)!==0;if(E?(_=_&1|2,n.flags|=128):_&=1,Bo(n,_),u==="backwards"&&t!==null?(nh(t),mn(t,n,r,a),nh(t)):mn(t,n,r,a),r=Se?wo:0,!E&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&fg(t,a,n);else if(t.tag===19)fg(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"backwards":a=hg(n.child),a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null,nh(n)),Su(n,!0,u,null,c,r);break;case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&su(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Su(n,!0,a,null,c,r);break;case"together":Su(n,!1,null,null,void 0,r);break;case"independent":n.memoizedState=null;break;default:a=hg(n.child),a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Su(n,!1,u,a,c,r)}return n.child}function dg(t,n,a){var r=n.pendingProps;return Pa(n,n.type,r.value),mn(t,n,r.children,a),n.child}function ha(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),qa|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Ts(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=ra(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=ra(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function ah(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Ql(t)))}function hx(t,n,a){switch(n.tag){case 3:P(n,n.stateNode.containerInfo),Pa(n,un,t.memoizedState.cache),Ms();break;case 27:case 5:et(n);break;case 4:P(n,n.stateNode.containerInfo);break;case 10:Pa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,wf(n),null;break;case 13:var r=n.memoizedState;if(r!==null){if(r.dehydrated!==null)return Ga(n),n.flags|=128,null;r=Ts(t,n,a,!1);var u=n.child.childLanes;return r||(a&u)!==0?cg(t,n,a):(Ga(n),t=ha(t,n,a),t!==null?t.sibling:null)}Ga(n);break;case 19:if(n.flags&128)return ih(t,n,a);if(u=(t.flags&128)!==0,r=(a&n.childLanes)!==0,r||(Ts(t,n,a,!1),r=(a&n.childLanes)!==0),u){if(r)return ih(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Bo(n,Cn.current),r)break;return null;case 22:return n.lanes=0,ag(t,n,a,n.pendingProps);case 24:Pa(n,un,t.memoizedState.cache)}return ha(t,n,a)}function pg(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)fn=!0;else{if(!ah(t,a)&&(n.flags&128)===0)return fn=!1,hx(t,n,a);fn=(t.flags&131072)!==0}else fn=!1,Se&&(n.flags&1048576)!==0&&Ym(n,wo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(t=Cs(n.elementType),n.type=t,typeof t=="function")ff(t)?(r=Ns(t,r),n.tag=1,n=lg(null,n,t,r,a)):(n.tag=0,n=Qf(null,n,t,r,a));else{if(t!=null){var u=t.$$typeof;if(u===Y){n.tag=11,n=eg(null,n,t,r,a);break t}else if(u===xt){n.tag=14,n=ng(null,n,t,r,a);break t}else if(u===ct){n.tag=10,n.type=t,n=dg(null,n,a);break t}}throw n=It(t)||t,Error(s(306,n,""))}}return n;case 0:return Qf(t,n,n.type,n.pendingProps,a);case 1:return r=n.type,u=Ns(r,n.pendingProps),lg(t,n,r,u,a);case 3:t:{if(P(n,n.stateNode.containerInfo),t===null)throw Error(s(387));r=n.pendingProps;var c=n.memoizedState;u=c.element,Tf(t,n),Io(n,r,null,a);var _=n.memoizedState;if(r=_.cache,Pa(n,un,r),r!==c.cache&&vf(n,[un],a,!0),zo(),r=_.element,c.isDehydrated)if(c={element:r,isDehydrated:!1,cache:_.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=ug(t,n,r,a);break t}else if(r!==u){u=hi(Error(s(424)),n),Do(u),n=ug(t,n,r,a);break t}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,je=gi(t.firstChild),yn=n,Se=!0,La=null,mi=!0,a=a_(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling;else{if(Ms(),r===u){n=ha(t,n,a);break t}mn(t,n,r,a)}n=n.child}return n;case 26:return Sr(t,n),t===null?(a=F0(n.type,null,n.pendingProps,null))?n.memoizedState=a:Se||(n.stateNode=v0(n.type,n.pendingProps,$t.current,n)):n.memoizedState=F0(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return et(n),t===null&&Se&&(r=n.stateNode=P0(n.type,n.pendingProps,$t.current),yn=n,mi=!0,u=je,Ka(n.type)?(td=u,je=gi(r.firstChild)):je=u),mn(t,n,n.pendingProps.children,a),Sr(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Se&&((u=r=je)&&(r=rM(r,n.type,n.pendingProps,mi),r!==null?(n.stateNode=r,yn=n,je=gi(r.firstChild),mi=!1,u=!0):u=!1),u||Oa(n)),et(n),u=n.type,c=n.pendingProps,_=t!==null?t.memoizedProps:null,r=c.children,Yh(u,c)?r=null:_!==null&&Yh(u,_)&&(n.flags|=32),n.memoizedState!==null&&(u=Nf(t,n,ex,null,null,a),Ir._currentValue=u),Sr(t,n),mn(t,n,r,a),n.child;case 6:return t===null&&Se&&((t=a=je)&&(a=oM(a,n.pendingProps,mi),a!==null?(n.stateNode=a,yn=n,je=null,t=!0):t=!1),t||Oa(n)),null;case 13:return cg(t,n,a);case 4:return P(n,n.stateNode.containerInfo),r=n.pendingProps,t===null?n.child=Ds(n,null,r,a):mn(t,n,r,a),n.child;case 11:return eg(t,n,n.type,n.pendingProps,a);case 7:return r=n.pendingProps,Sr(t,n),mn(t,n,r,a),n.child;case 8:return mn(t,n,n.pendingProps.children,a),n.child;case 12:return mn(t,n,n.pendingProps.children,a),n.child;case 10:return dg(t,n,a);case 9:return u=n.type._context,r=n.pendingProps.children,bs(n),u=An(u),r=r(u),n.flags|=1,mn(t,n,r,a),n.child;case 14:return ng(t,n,n.type,n.pendingProps,a);case 15:return ig(t,n,n.type,n.pendingProps,a);case 19:return ih(t,n,a);case 31:return cx(t,n,a);case 22:return ag(t,n,a,n.pendingProps);case 24:return bs(n),r=An(un),t===null?(u=xf(),u===null&&(u=qe,c=Sf(),u.pooledCache=c,c.refCount++,c!==null&&(u.pooledCacheLanes|=a),u=c),n.memoizedState={parent:r,cache:u},Ef(n),Pa(n,un,u)):((t.lanes&a)!==0&&(Tf(t,n),Io(n,null,null,a),zo()),u=t.memoizedState,c=n.memoizedState,u.parent!==r?(u={parent:r,cache:r},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Pa(n,un,r)):(r=c.cache,Pa(n,un,r),r!==u.cache&&vf(n,[un],a,!0))),mn(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=n.pendingProps,r.name!=null&&r.name!=="auto"?n.flags|=t===null?18882560:18874368:Se&&jl(n),t!==null&&t.memoizedProps.name!==r.name?n.flags|=4194816:Sr(t,n),mn(t,n,r.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function da(t){t.flags|=4}function sh(t,n,a,r,u){var c;if((c=(t.mode&32)!==0)&&(c=a===null?X0(n,r):X0(n,r)&&(r.src!==a.src||r.srcSet!==a.srcSet)),c){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(Zg())t.flags|=8192;else throw ws=eu,Mf}else t.flags&=-16777217}function mg(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!k0(n))if(Zg())t.flags|=8192;else throw ws=eu,Mf}function yu(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Ul():536870912,t.lanes|=n,Tr|=n)}function Xo(t,n){if(!Se)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function Ze(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,r=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,r|=u.subtreeFlags&1206910976,r|=u.flags&1206910976,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,r|=u.subtreeFlags,r|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=r,t.childLanes=a,n}function dx(t,n,a){var r=n.pendingProps;switch(pf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ze(n),null;case 1:return Ze(n),null;case 3:return a=n.stateNode,r=null,t!==null&&(r=t.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),ua(un),b(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(hr(n)?da(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,_f())),Ze(n),null;case 26:var u=n.type,c=n.memoizedState;return t===null?(da(n),c!==null?(Ze(n),mg(n,c)):(Ze(n),sh(n,u,null,r,a))):c?c!==t.memoizedState?(da(n),Ze(n),mg(n,c)):(Ze(n),n.flags&=-16777217):(t=t.memoizedProps,t!==r&&da(n),Ze(n),sh(n,u,t,r,a)),null;case 27:if(pt(n),a=$t.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&da(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return Ze(n),n.subtreeFlags&=-33554433,null}t=fe.current,hr(n)?Wm(n):(t=P0(u,r,a),n.stateNode=t,da(n))}return Ze(n),n.subtreeFlags&=-33554433,null;case 5:if(pt(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&da(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return Ze(n),n.subtreeFlags&=-33554433,null}if(c=fe.current,hr(n))Wm(n);else{var _=tl($t.current);switch(c){case 1:c=_.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:c=_.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":c=_.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":c=_.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":c=_.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof r.is=="string"?_.createElement("select",{is:r.is}):_.createElement("select"),r.multiple?c.multiple=!0:r.size&&(c.size=r.size);break;default:c=typeof r.is=="string"?_.createElement(u,{is:r.is}):_.createElement(u)}}c[Nt]=n,c[Dt]=r;t:for(_=n.child;_!==null;){if(_.tag===5||_.tag===6)c.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===n)break t;for(;_.sibling===null;){if(_.return===null||_.return===n)break t;_=_.return}_.sibling.return=_.return,_=_.sibling}n.stateNode=c;t:switch(Dn(c,u,r),u){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&da(n)}}return Ze(n),n.subtreeFlags&=-33554433,sh(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==r&&da(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(t=$t.current,hr(n)){if(t=n.stateNode,a=n.memoizedProps,r=null,u=yn,u!==null)switch(u.tag){case 27:case 5:r=u.memoizedProps}t[Nt]=n,t=!!(t.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||p0(t.nodeValue,a)),t||Oa(n,!0)}else t=tl(t).createTextNode(r),t[Nt]=n,n.stateNode=t}return Ze(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(r=hr(n),a!==null){if(t===null){if(!r)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[Nt]=n}else Ms(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ze(n),t=!1}else a=_f(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ti(n),n):(ti(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Ze(n),null;case 13:if(r=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=hr(n),r!==null&&r.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[Nt]=n}else Ms(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ze(n),u=!1}else u=_f(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ti(n),n):(ti(n),null)}return ti(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,t=t!==null&&t.memoizedState!==null,a&&(r=n.child,u=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(u=r.alternate.memoizedState.cachePool.pool),c=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(c=r.memoizedState.cachePool.pool),c!==u&&(r.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),yu(n,n.updateQueue),Ze(n),null);case 4:return b(),t===null&&Hh(n.stateNode.containerInfo),n.flags|=67108864,Ze(n),null;case 10:return ua(n.type),Ze(n),null;case 19:if(Df(n),r=n.memoizedState,r===null)return Ze(n),null;if(u=(n.flags&128)!==0,c=r.rendering,c===null)if(u)Xo(r,!1);else{if(an!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(c=su(t),c!==null){for(n.flags|=128,Xo(r,!1),t=c.updateQueue,n.updateQueue=t,yu(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Vm(a,t),a=a.sibling;return Bo(n,Cn.current&1|2),Se&&oa(n,r.treeForkCount),n.child}t=t.sibling}r.tail!==null&&X()>Nu&&(n.flags|=128,u=!0,Xo(r,!1),n.lanes=4194304)}else{if(!u)if(t=su(c),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,yu(n,t),Xo(r,!0),r.tail===null&&r.tailMode!=="collapsed"&&r.tailMode!=="visible"&&!c.alternate&&!Se)return Ze(n),null}else 2*X()-r.renderingStartTime>Nu&&a!==536870912&&(n.flags|=128,u=!0,Xo(r,!1),n.lanes=4194304);r.isBackwards?(c.sibling=n.child,n.child=c):(t=r.last,t!==null?t.sibling=c:n.child=c,r.last=c)}if(r.tail!==null){t=r.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return r.rendering=t,r.tail=t.sibling,r.renderingStartTime=X(),t.sibling=null,c=Cn.current,c=u?c&1|2:c&1,r.tailMode==="visible"||r.tailMode==="collapsed"||!a||Se?Bo(n,c):(a=c,bt(Rn,n),bt(Cn,a),Pn===null&&(Pn=n)),Se&&oa(n,r.treeForkCount),t}return Ze(n),null;case 22:case 23:return ti(n),Cf(),r=n.memoizedState!==null,t!==null?t.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(Ze(n),n.subtreeFlags&6&&(n.flags|=8192)):Ze(n),a=n.updateQueue,a!==null&&yu(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),t!==null&&ae(Rs),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ua(un),Ze(n),null;case 25:return null;case 30:return n.flags|=33554432,Ze(n),null}throw Error(s(156,n.tag))}function px(t,n){switch(pf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return ua(un),b(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return pt(n),null;case 31:if(n.memoizedState!==null){if(ti(n),n.alternate===null)throw Error(s(340));Ms()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ti(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Ms()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Df(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return b(),null;case 10:return ua(n.type),null;case 22:case 23:return ti(n),Cf(),t!==null&&ae(Rs),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return ua(un),null;case 25:return null;default:return null}}function _g(t,n){switch(pf(n),n.tag){case 3:ua(un),b();break;case 26:case 27:case 5:pt(n);break;case 4:b();break;case 31:n.memoizedState!==null&&ti(n);break;case 13:ti(n);break;case 19:Df(n);break;case 10:ua(n.type);break;case 22:case 23:ti(n),Cf(),t!==null&&ae(Rs);break;case 24:ua(un)}}function ko(t,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var u=r.next;a=u;do{if((a.tag&t)===t){r=void 0;var c=a.create,_=a.inst;r=c(),_.destroy=r}a=a.next}while(a!==u)}}catch(E){Be(n,n.return,E)}}function Xa(t,n,a){try{var r=n.updateQueue,u=r!==null?r.lastEffect:null;if(u!==null){var c=u.next;r=c;do{if((r.tag&t)===t){var _=r.inst,E=_.destroy;if(E!==void 0){_.destroy=void 0,u=n;var z=a,j=E;try{j()}catch(nt){Be(u,z,nt)}}}r=r.next}while(r!==c)}}catch(nt){Be(n,n.return,nt)}}function gg(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{r_(n,a)}catch(r){Be(t,t.return,r)}}}function vg(t,n,a){a.props=Ns(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(r){Be(t,n,r)}}function Bi(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var r=t.stateNode;break;case 30:var u=t.stateNode,c=aa(t.memoizedProps,u);(u.ref===null||u.ref.name!==c)&&(u.ref=b0(c)),r=u.ref;break;case 7:if(t.stateNode===null){var _=new si(t);m(t.child,!1,aM,_,void 0,void 0),t.stateNode=_}r=t.stateNode;break;default:r=t.stateNode}typeof a=="function"?t.refCleanup=a(r):a.current=r}}catch(E){Be(t,n,E)}}function wn(t,n){var a=t.ref,r=t.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(u){Be(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Be(t,n,u)}else a.current=null}function xu(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)U0(t.stateNode,n[a])}function Sg(t){for(var n=t.return;n!==null&&(oh(n)&&U0(t.stateNode,n.stateNode),!rh(n));)n=n.return}function Yo(t){for(var n=t.return;n!==null&&(oh(n)&&sM(t.stateNode,n.stateNode),!rh(n));)n=n.return}function rh(t){return t.tag===5||t.tag===3||t.tag===27}function oh(t){return t&&t.tag===7&&t.stateNode!==null}function lh(t){var n=t.type,a=t.memoizedProps,r=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(u){Be(t,t.return,u)}}function uh(t,n,a){try{var r=t.stateNode;Hx(r,t.type,a,n),r[Dt]=n}catch(u){Be(t,t.return,u)}}function yg(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Ka(t.type)||t.tag===4}function ch(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||yg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Ka(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function fh(t,n,a,r){var u=t.tag;if(u===5||u===6)u=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(u,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(u),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Pi)),xu(t,r),De=!0;else if(u!==4&&(u===27&&(xu(t,r),r=null,Ka(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(fh(t,n,a,r),t=t.sibling;t!==null;)fh(t,n,a,r),t=t.sibling}function Mu(t,n,a,r){var u=t.tag;if(u===5||u===6)u=t.stateNode,n?a.insertBefore(u,n):a.appendChild(u),xu(t,r),De=!0;else if(u!==4&&(u===27&&(xu(t,r),r=null,Ka(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(Mu(t,n,a,r),t=t.sibling;t!==null;)Mu(t,n,a,r),t=t.sibling}function xg(t){var n=t.stateNode,a=t.memoizedProps;try{for(var r=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Dn(n,r,a),n[Nt]=t,n[Dt]=a}catch(c){Be(t,t.return,c)}}var Eu=!1,ei=null;function Mg(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(Eu=!0)}var Fi=null;function Eg(){var t=Fi;return Fi=null,t}var Wn=0;function yr(t,n,a,r,u){return Wn=0,Tg(t.child,n,a,r,u)}function Tg(t,n,a,r,u){for(var c=!1;t!==null;){if(t.tag===5){var _=t.stateNode;if(r!==null){var E=jh(_);r.push(E),E.view&&(c=!0)}else c||jh(_).view&&(c=!0);Eu=!0,E0(_,Wn===0?n:n+"_"+Wn,a),Wn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&u||Tg(t.child,n,a,r,u)&&(c=!0));t=t.sibling}return c}function Hi(t,n){for(;t!==null;)t.tag===5?T0(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||Hi(t.child,n)),t=t.sibling}function Tu(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Tu(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(s(544));var a=n.name;n=sa(n.default,n.share),n!=="none"&&(yr(t,a,n,null,!1)||Hi(t.child,!1))}t=t.sibling}}function hh(t,n){if(t.tag===30){var a=t.stateNode,r=t.memoizedProps,u=aa(r,a),c=sa(r.default,a.paired?r.share:r.enter);c!=="none"?yr(t,u,c,null,!1)?(Tu(t),a.paired||n||Cr(t,r.onEnter)):Hi(t.child,!1):Tu(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)hh(t,n),t=t.sibling;else Tu(t)}function dh(t){if(ei!==null&&ei.size!==0){var n=ei;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,r=a.name;if(r!=null&&r!=="auto"){var u=n.get(r);if(u!==void 0){var c=sa(a.default,a.share);if(c!=="none"&&(yr(t,r,c,null,!1)?(c=t.stateNode,u.paired=c,c.paired=u,Cr(t,a.onShare)):Hi(t.child,!1)),n.delete(r),n.size===0)break}}}dh(t)}t=t.sibling}}}function ph(t){if(t.tag===30){var n=t.memoizedProps,a=aa(n,t.stateNode),r=ei!==null?ei.get(a):void 0,u=sa(n.default,r!==void 0?n.share:n.exit);u!=="none"&&(yr(t,a,u,null,!1)?r!==void 0?(u=t.stateNode,r.paired=u,u.paired=r,ei.delete(a),Cr(t,n.onShare)):Cr(t,n.onExit):Hi(t.child,!1)),ei!==null&&dh(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)ph(t),t=t.sibling;else ei!==null&&dh(t)}function bg(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=aa(n,t.stateNode);n=sa(n.default,n.update),t.flags&=-5,n!=="none"&&yr(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&bg(t);t=t.sibling}}function mh(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,Hi(t.child,!1))}mh(t)}t=t.sibling}}function bu(t){if(t.tag===30)t.stateNode.paired=null,Hi(t.child,!1),mh(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)bu(t),t=t.sibling;else mh(t)}function Ag(t){for(t=t.child;t!==null;)t.tag===30?Hi(t.child,!1):(t.subtreeFlags&33554432)!==0&&Ag(t),t=t.sibling}function _h(t,n,a,r,u,c,_){for(var E=!1;n!==null;){if(n.tag===5){var z=n.stateNode;if(c!==null&&Wn<c.length){var j=c[Wn],nt=jh(z);(j.view||nt.view)&&(E=!0);var dt;if(dt=(t.flags&4)===0)if(nt.clip)dt=!0;else{dt=j.rect;var k=nt.rect;dt=dt.y!==k.y||dt.x!==k.x||dt.height!==k.height||dt.width!==k.width}dt&&(t.flags|=4),nt.abs?nt=!j.abs:(j=j.rect,nt=nt.rect,nt=j.height!==nt.height||j.width!==nt.width),nt&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&E0(z,Wn===0?a:a+"_"+Wn,u),E&&(t.flags&4)!==0||(Fi===null&&(Fi=[]),Fi.push(z,Wn===0?r:r+"_"+Wn,n.memoizedProps)),Wn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&_?t.flags|=n.flags&32:_h(t,n.child,a,r,u,c,_)&&(E=!0));n=n.sibling}return E}function Rg(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,r=t.stateNode,u=aa(a,r),c=sa(a.default,a.update),_;_=t.memoizedState,t.memoizedState=null,r=t;var E=t.child;Wn=0,u=_h(r,E,u,u,c,_,!1),(t.flags&4)!==0&&u&&Cr(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&Rg(t);t=t.sibling}}var xn=!1,ze=!1,Gi=!1,gh=!1,Cg=typeof WeakSet=="function"?WeakSet:Set,Mn=null,Vi=!1,qo=!1,Au=!1,vh=!1;function mx(t,n,a){if(t=t.containerInfo,Xh=Br,t=Nm(t),af(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else t:{r=(r=t.ownerDocument)&&r.defaultView||window;var u=r.getSelection&&r.getSelection();if(u&&u.rangeCount!==0){r=u.anchorNode;var c=u.anchorOffset,_=u.focusNode;u=u.focusOffset;try{r.nodeType,_.nodeType}catch{r=null;break t}var E=0,z=-1,j=-1,nt=0,dt=0,k=t,$=null;e:for(;;){for(var Ut;k!==r||c!==0&&k.nodeType!==3||(z=E+c),k!==_||u!==0&&k.nodeType!==3||(j=E+u),k.nodeType===3&&(E+=k.nodeValue.length),(Ut=k.firstChild)!==null;)$=k,k=Ut;for(;;){if(k===t)break e;if($===r&&++nt===c&&(z=E),$===_&&++dt===u&&(j=E),(Ut=k.nextSibling)!==null)break;k=$,$=k.parentNode}k=Ut}r=z===-1||j===-1?null:{start:z,end:j}}else r=null}r=r||{start:0,end:0}}else r=null;for(kh={focusedElem:t,selectionRange:r},Br=!1,a=(a&335544064)===a,Mn=n,n=a?9270:1024;Mn!==null;){if(t=Mn,a&&(r=t.deletions,r!==null))for(c=0;c<r.length;c++)a&&ph(r[c]);if(t.alternate===null&&(t.flags&2)!==0)a&&Mg(t),Ru(a);else{if(t.tag===22){if(r=t.alternate,t.memoizedState!==null){r!==null&&r.memoizedState===null&&a&&ph(r),Ru(a);continue}else if(r!==null&&r.memoizedState!==null){a&&Mg(t),Ru(a);continue}}r=t.child,(t.subtreeFlags&n)!==0&&r!==null?(r.return=t,Mn=r):(a&&bg(t),Ru(a))}}ei=null}function Ru(t){for(;Mn!==null;){var n=Mn,a=t,r=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((u&1024)!==0&&r!==null){a=void 0,u=r.memoizedProps,r=r.memoizedState;var c=n.stateNode;try{var _=Ns(n.type,u);a=c.getSnapshotBeforeUpdate(_,r),c.__reactInternalSnapshotBeforeUpdate=a}catch(E){Be(n,n.return,E)}}break;case 3:if((u&1024)!==0){if(r=n.stateNode.containerInfo,a=r.nodeType,a===9)Qh(r);else if(a===1)switch(r.nodeName){case"HEAD":case"HTML":case"BODY":Qh(r);break;default:r.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&r!==null&&(a=aa(r.memoizedProps,r.stateNode),u=n.memoizedProps,u=sa(u.default,u.update),u!=="none"&&yr(r,a,u,r.memoizedState=[],!0));break;default:if((u&1024)!==0)throw Error(s(163))}if(r=n.sibling,r!==null){r.return=n.return,Mn=r;break}Mn=n.return}}function wg(t,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:Xi(t,a),r&4&&ko(5,a);break;case 1:if(Xi(t,a),r&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(_){Be(a,a.return,_)}else{var u=Ns(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(_){Be(a,a.return,_)}}r&64&&gg(a),r&512&&Bi(a,a.return);break;case 3:if(Xi(t,a),r&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{r_(t,n)}catch(_){Be(a,a.return,_)}}break;case 27:n===null&&r&4&&xg(a);case 26:case 5:Xi(t,a),n===null&&r&4&&lh(a),r&512&&Bi(a,a.return);break;case 12:Xi(t,a);break;case 31:Xi(t,a),r&4&&Lg(t,a);break;case 13:Xi(t,a),r&4&&Og(t,a),r&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=Rx.bind(null,a),lM(t,a))));break;case 22:if(r=a.memoizedState!==null||xn,!r){var c=n!==null&&n.memoizedState!==null||ze;n=xn,u=ze,xn=r,(ze=c)&&!u?(r=2,(a.subtreeFlags&8772)!==0&&(r|=1),bi(t,a,r)):Xi(t,a),xn=n,ze=u}break;case 30:Xi(t,a),r&512&&Bi(a,a.return);break;case 7:r&512&&Bi(a,a.return);default:Xi(t,a)}}function Sh(t,n){for(t=t.child;t!==null;)Dg(t,n),t=t.sibling}function Dg(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var r=a.style;typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"}else{var u=t.stateNode,c=t.memoizedProps.style,_=c!=null&&c.hasOwnProperty("display")?c.display:null;u.style.display=_==null||typeof _=="boolean"?"":(""+_).trim()}}catch(z){Be(t,t.return,z)}yh(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,De=!0}catch(z){Be(t,t.return,z)}break;case 18:try{var E=t.stateNode;n?M0(E,!0):M0(t.stateNode,!1)}catch(z){Be(t,t.return,z)}break;case 22:case 23:t.memoizedState===null&&Sh(t,n);break;default:Sh(t,n)}}function yh(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,r=n;switch(a.tag){case 4:Dg(a,r);break t;case 22:a.memoizedState===null&&yh(a,r);break t;default:yh(a,r)}}t=t.sibling}}function Ug(t){var n=t.alternate;n!==null&&(t.alternate=null,Ug(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&we(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var tn=null,jn=!1;function Ei(t,n,a){for(a=a.child;a!==null;)Ng(t,n,a),a=a.sibling}function Ng(t,n,a){if(Qe&&typeof Qe.onCommitFiberUnmount=="function")try{Qe.onCommitFiberUnmount(Re,a)}catch{}switch(a.tag){case 26:ze||wn(a,n),Ei(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!ze&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:ze||wn(a,n),Yo(a);var r=tn,u=jn;Ka(a.type)&&(tn=a.stateNode,jn=!1),Ei(t,n,a),z0(a.stateNode,a.type,a.memoizedProps),tn=r,jn=u;break;case 5:ze||wn(a,n),Yo(a);case 6:if(a.tag===6&&Yo(a),r=tn,u=jn,tn=null,Ei(t,n,a),tn=r,jn=u,tn!==null)if(jn)try{(tn.nodeType===9?tn.body:tn.nodeName==="HTML"?tn.ownerDocument.body:tn).removeChild(a.stateNode),De=!0}catch(c){Be(a,n,c)}else try{tn.removeChild(a.stateNode),De=!0}catch(c){Be(a,n,c)}break;case 18:tn!==null&&(jn?(t=tn,x0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Fr(t)):x0(tn,a.stateNode));break;case 4:r=tn,u=jn,tn=a.stateNode.containerInfo,jn=!0,Ei(t,n,a),tn=r,jn=u;break;case 0:case 11:case 14:case 15:Xa(2,a,n),ze||Xa(4,a,n),Ei(t,n,a);break;case 1:ze||(wn(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&vg(a,n,r)),Ei(t,n,a);break;case 21:Ei(t,n,a);break;case 22:ze=(r=ze)||a.memoizedState!==null,Ei(t,n,a),ze=r;break;case 30:wn(a,n),Ei(t,n,a);break;case 7:ze||wn(a,n),Ei(t,n,a);break;default:Ei(t,n,a)}}function Lg(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Fr(t)}catch(a){Be(n,n.return,a)}}}function Og(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Fr(t)}catch(a){Be(n,n.return,a)}}function _x(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new Cg),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new Cg),n;default:throw Error(s(435,t.tag))}}function Cu(t,n){var a=_x(t);n.forEach(function(r){if(!a.has(r)){a.add(r);var u=Cx.bind(null,t,r);r.then(u,u)}})}function Hn(t,n,a){var r=n.deletions;if(r!==null)for(var u=0;u<r.length;u++){var c=r[u],_=t,E=n,z=E;t:for(;z!==null;){switch(z.tag){case 27:if(Ka(z.type)){tn=z.stateNode,jn=!1;break t}break;case 5:tn=z.stateNode,jn=!1;break t;case 3:case 4:tn=z.stateNode.containerInfo,jn=!0;break t}z=z.return}if(tn===null)throw Error(s(160));Ng(_,E,c),tn=null,jn=!1,_=c.alternate,_!==null&&(_.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Pg(n,t,a),n=n.sibling}var Ti=null;function Pg(t,n,a){var r=t.alternate,u=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(u&4&&(r=t.updateQueue,r=r!==null?r.events:null,r!==null))for(var c=0;c<r.length;c++){var _=r[c];_.ref.impl=_.nextImpl}Hn(n,t,a),Gn(t),u&4&&(Xa(3,t,t.return),ko(3,t),Xa(5,t,t.return));break;case 1:Hn(n,t,a),Gn(t),u&512&&(ze||r===null||wn(r,r.return)),u&64&&xn&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(c=Ti,Hn(n,t,a),Gn(t),u&512&&(ze||r===null||wn(r,r.return)),u&4)if(u=r!==null?r.memoizedState:null,a=t.memoizedState,r===null)if(a===null)if(t.stateNode===null)if(xn)t.stateNode=v0(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,u=c.ownerDocument||c;e:switch(n){case"title":r=u.getElementsByTagName("title")[0],(!r||r[He]||r[Nt]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=u.createElement(n),u.head.insertBefore(r,u.querySelector("head > title"))),Dn(r,n,a),r[Nt]=t,Je(r),n=r;break t;case"link":if(c=V0("link","href",u).get(n+(a.href||""))){for(_=0;_<c.length;_++)if(r=c[_],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){c.splice(_,1);break e}}r=u.createElement(n),Dn(r,n,a),u.head.appendChild(r);break;case"meta":if(c=V0("meta","content",u).get(n+(a.content||""))){for(_=0;_<c.length;_++)if(r=c[_],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){c.splice(_,1);break e}}r=u.createElement(n),Dn(r,n,a),u.head.appendChild(r);break;default:throw Error(s(468,n))}r[Nt]=t,Je(r),n=r}t.stateNode=n}else xn||ad(c,t.type,t.stateNode);else t.stateNode=G0(c,a,t.memoizedProps);else u!==a?(u===null?(n=r.stateNode,n===null||ze||n.parentNode.removeChild(n)):u.count--,a===null?xn||ad(c,t.type,t.stateNode):G0(c,a,t.memoizedProps)):a===null&&t.stateNode!==null&&uh(t,t.memoizedProps,r.memoizedProps);break;case 27:Hn(n,t,a),Gn(t),u&512&&(ze||r===null||wn(r,r.return)),r!==null&&u&4&&uh(t,t.memoizedProps,r.memoizedProps);break;case 5:if(c=Gi,Gi=!1,Hn(n,t,a),Gi=c,Gn(t),u&512&&(ze||r===null||wn(r,r.return)),t.flags&32){n=t.stateNode;try{nr(n,""),De=!0}catch(nt){Be(t,t.return,nt)}}u&4&&t.stateNode!=null&&(n=t.memoizedProps,uh(t,n,r!==null?r.memoizedProps:n)),u&1024&&(gh=!0);break;case 6:if(Hn(n,t,a),Gn(t),u&4){if(t.stateNode===null)throw Error(s(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,De=!0}catch(nt){Be(t,t.return,nt)}}break;case 3:if(De=!1,Xu=null,c=Ti,Ti=el(n.containerInfo),Hn(n,t,a),Ti=c,Gn(t),u&4&&r!==null&&r.memoizedState.isDehydrated)try{Fr(n.containerInfo)}catch(nt){Be(t,t.return,nt)}gh&&(gh=!1,zg(t)),De=!1;break;case 4:u=Gi,Gi=xn,r=nm(),c=Ti,Ti=el(t.stateNode.containerInfo),Hn(n,t,a),Gn(t),Ti=c,De&&qo&&(Au=!0),De=r,Gi=u;break;case 12:Hn(n,t,a),Gn(t);break;case 31:Hn(n,t,a),Gn(t),u&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Cu(t,n)));break;case 13:Hn(n,t,a),Gn(t),t.child.flags&8192&&t.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(Uu=X()),u&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Cu(t,n)));break;case 22:c=t.memoizedState!==null,_=r!==null&&r.memoizedState!==null;var E=xn,z=ze,j=Gi;xn=E||c,Gi=j||c,ze=z||_,Hn(n,t,a),ze=z,Gi=j,xn=E,Gn(t),u&8192&&(n=t.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,!c||r===null||_||xn||ze||(n=_||ze,a=xn,r=ze,xn=c||xn,ze=n,ka(t,2),xn=a,ze=r),!c&&Gi||Sh(t,c)),u&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Cu(t,a))));break;case 19:Hn(n,t,a),Gn(t),u&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Cu(t,n)));break;case 30:u&512&&(ze||r===null||wn(r,r.return)),u=nm(),c=qo,_=(a&335544064)===a,E=t.memoizedProps,qo=_&&sa(E.default,E.update)!=="none",Hn(n,t,a),Gn(t),_&&r!==null&&De&&(t.flags|=4),qo=c,De=u;break;case 21:break;case 7:u&512&&(ze||r===null||wn(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=t);default:Hn(n,t,a),Gn(t)}}function Gn(t){var n=t.flags;if(n&2){try{for(var a,r=t.return;r!==null;){if(yg(r)){a=r;break}r=r.return}r=null;for(var u=t.return;u!==null;){if(oh(u)){var c=u.stateNode;r===null?r=[c]:r.push(c)}if(rh(u))break;u=u.return}var _=r;if(a==null)throw Error(s(160));switch(a.tag){case 27:var E=a.stateNode,z=ch(t);Mu(t,z,E,_);break;case 5:var j=a.stateNode;a.flags&32&&(nr(j,""),a.flags&=-33);var nt=ch(t);Mu(t,nt,j,_);break;case 3:case 4:var dt=a.stateNode.containerInfo,k=ch(t);fh(t,k,dt,_);break;default:throw Error(s(161))}}catch($){Be(t,t.return,$)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function zg(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;zg(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Br=!0,n.reset(),Br=!1),t=t.sibling}}function xr(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)Ig(n,t),n=n.sibling;else Rg(n)}function Ig(t,n){var a=t.alternate;if(a===null)hh(t,!1);else switch(t.tag){case 3:if(vh=Vi=!1,Eg(),xr(n,t),!Vi&&!Au){if(t=Fi,t!==null)for(var r=0;r<t.length;r+=3){a=t[r];var u=t[r+1];T0(a,t[r+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+u+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),vh=!0}Fi=null;break;case 5:xr(n,t);break;case 4:r=Vi,Vi=!1,xr(n,t),Vi&&(Au=!0),Vi=r;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?hh(t,!1):xr(n,t));break;case 30:r=Vi,u=Eg(),Vi=!1,xr(n,t),Vi&&(t.flags|=4);var c=t.memoizedProps,_=t.stateNode;n=aa(c,_),_=aa(a.memoizedProps,_);var E=sa(c.default,c.update);E==="none"?n=!1:(c=a.memoizedState,a.memoizedState=null,a=t.child,Wn=0,n=_h(t,a,n,_,E,c,!0),Wn!==(c===null?0:c.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(Cr(t,t.memoizedProps.onUpdate),Fi=u):u!==null&&(u.push.apply(u,Fi),Fi=u),Vi=(t.flags&32)!==0?!0:r;break;default:xr(n,t)}}function Xi(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)wg(t,n.alternate,n),n=n.sibling}function ka(t,n){for(t=t.child;t!==null;){var a=t,r=n;switch(a.tag){case 0:case 11:case 14:case 15:Xa(4,a,a.return),ka(a,r);break;case 1:wn(a,a.return);var u=a.stateNode;typeof u.componentWillUnmount=="function"&&vg(a,a.return,u),ka(a,r);break;case 27:(r&2)!==0&&z0(a.stateNode,a.type,a.memoizedProps);case 5:wn(a,a.return),a.tag!==5&&a.tag!==27||Yo(a),ka(a,r);break;case 6:Yo(a);break;case 26:wn(a,a.return),u=a.stateNode,a.memoizedState!==null||u===null||ze||u.parentNode.removeChild(u),ka(a,r);break;case 22:a.memoizedState===null&&ka(a,r);break;case 30:wn(a,a.return),ka(a,r);break;case 7:wn(a,a.return);default:ka(a,r)}t=t.sibling}}function bi(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var r=n.alternate,u=t,c=n,_=c.flags,E=(a&1)!==0;switch(c.tag){case 0:case 11:case 15:bi(u,c,a),ko(4,c);break;case 1:if(bi(u,c,a),r=c,u=r.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(nt){Be(r,r.return,nt)}if(r=c,u=r.updateQueue,u!==null){var z=r.stateNode;try{var j=u.shared.hiddenCallbacks;if(j!==null)for(u.shared.hiddenCallbacks=null,u=0;u<j.length;u++)s_(j[u],z)}catch(nt){Be(r,r.return,nt)}}E&&_&64&&gg(c),Bi(c,c.return);break;case 27:(a&2)!==0&&xg(c);case 5:c.tag!==5&&c.tag!==27||Sg(c),bi(u,c,a),E&&r===null&&_&4&&lh(c),Bi(c,c.return);break;case 6:Sg(c);break;case 26:z=c.stateNode,c.memoizedState!==null||z===null||xn||ad(el(z.ownerDocument),c.type,z),bi(u,c,a),E&&r===null&&_&4&&lh(c),Bi(c,c.return);break;case 12:bi(u,c,a);break;case 31:bi(u,c,a),E&&_&4&&Lg(u,c);break;case 13:bi(u,c,a),E&&_&4&&Og(u,c);break;case 22:c.memoizedState===null&&bi(u,c,a),Bi(c,c.return);break;case 30:bi(u,c,a),Bi(c,c.return);break;case 7:Bi(c,c.return);default:bi(u,c,a)}n=n.sibling}}function xh(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Uo(a))}function Mh(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Uo(t))}function _i(t,n,a,r){var u=(a&335544064)===a;if(n.subtreeFlags&(u?10262:10256))for(n=n.child;n!==null;)Bg(t,n,a,r),n=n.sibling;else u&&Ag(n)}function Bg(t,n,a,r){var u=(a&335544064)===a;u&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&bu(n);var c=n.flags;switch(n.tag){case 0:case 11:case 15:_i(t,n,a,r),c&2048&&ko(9,n);break;case 1:_i(t,n,a,r);break;case 3:_i(t,n,a,r),u&&vh&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),c&2048&&(c=null,n.alternate!==null&&(c=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==c&&(n.refCount++,c!=null&&Uo(c)));break;case 12:if(c&2048){_i(t,n,a,r),c=n.stateNode;try{var _=n.memoizedProps,E=_.id,z=_.onPostCommit;typeof z=="function"&&z(E,n.alternate===null?"mount":"update",c.passiveEffectDuration,-0)}catch(j){Be(n,n.return,j)}}else _i(t,n,a,r);break;case 31:_i(t,n,a,r);break;case 13:_i(t,n,a,r);break;case 23:break;case 22:_=n.stateNode,E=n.alternate,n.memoizedState!==null?(u&&E!==null&&E.memoizedState===null&&bu(E),_._visibility&2?_i(t,n,a,r):Wo(t,n)):(u&&E!==null&&E.memoizedState!==null&&bu(n),_._visibility&2?_i(t,n,a,r):(_._visibility|=2,Mr(t,n,a,r,(n.subtreeFlags&10256)!==0||!1))),c&2048&&xh(E,n);break;case 24:_i(t,n,a,r),c&2048&&Mh(n.alternate,n);break;case 30:u&&(c=n.alternate,c!==null&&(Hi(c.child,!0),Hi(n.child,!0))),_i(t,n,a,r);break;default:_i(t,n,a,r)}}function Mr(t,n,a,r,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var c=t,_=n,E=a,z=r,j=_.flags;switch(_.tag){case 0:case 11:case 15:Mr(c,_,E,z,u),ko(8,_);break;case 23:break;case 22:var nt=_.stateNode;_.memoizedState!==null?nt._visibility&2?Mr(c,_,E,z,u):Wo(c,_):(nt._visibility|=2,Mr(c,_,E,z,u)),u&&j&2048&&xh(_.alternate,_);break;case 24:Mr(c,_,E,z,u),u&&j&2048&&Mh(_.alternate,_);break;default:Mr(c,_,E,z,u)}n=n.sibling}}function Wo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,r=n,u=r.flags;switch(r.tag){case 22:Wo(a,r),u&2048&&xh(r.alternate,r);break;case 24:Wo(a,r),u&2048&&Mh(r.alternate,r);break;default:Wo(a,r)}n=n.sibling}}var Ls=8192;function Os(t,n,a){if(t.subtreeFlags&Ls)for(t=t.child;t!==null;)Fg(t,n,a),t=t.sibling}function Fg(t,n,a){switch(t.tag){case 26:Os(t,n,a),t.flags&Ls&&(t.memoizedState!==null?MM(a,Ti,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&q0(a,t)));break;case 5:Os(t,n,a),t.flags&Ls&&(t=t.stateNode,(n&335544128)===n&&q0(a,t));break;case 3:case 4:var r=Ti;Ti=el(t.stateNode.containerInfo),Os(t,n,a),Ti=r;break;case 22:t.memoizedState===null&&(r=t.alternate,r!==null&&r.memoizedState!==null?(r=Ls,Ls=16777216,Os(t,n,a),Ls=r):Os(t,n,a));break;case 30:if((t.flags&Ls)!==0&&(r=t.memoizedProps.name,r!=null&&r!=="auto")){var u=t.stateNode;u.paired=null,ei===null&&(ei=new Map),ei.set(r,u)}Os(t,n,a);break;default:Os(t,n,a)}}function Hg(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function jo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];Mn=r,Vg(r,t)}Hg(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Gg(t),t=t.sibling}function Gg(t){switch(t.tag){case 0:case 11:case 15:jo(t),t.flags&2048&&Xa(9,t,t.return);break;case 3:jo(t);break;case 12:jo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,wu(t)):jo(t);break;default:jo(t)}}function wu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];Mn=r,Vg(r,t)}Hg(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Xa(8,n,n.return),wu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,wu(n));break;default:wu(n)}t=t.sibling}}function Vg(t,n){for(;Mn!==null;){var a=Mn;switch(a.tag){case 0:case 11:case 15:Xa(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Uo(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,Mn=r;else t:for(a=t;Mn!==null;){r=Mn;var u=r.sibling,c=r.return;if(Ug(r),r===a){Mn=null;break t}if(u!==null){u.return=c,Mn=u;break t}Mn=c}}}var gx={getCacheForType:function(t){var n=An(un),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return An(un).controller.signal}},vx=typeof WeakMap=="function"?WeakMap:Map,Le=0,qe=null,Ee=null,be=0,Ie=0,ni=null,Ya=!1,Er=!1,Eh=!1,pa=0,an=0,qa=0,Ps=0,Du=0,ii=0,Tr=0,Zo=null,Zn=null,Th=!1,Uu=0,Xg=0,Nu=1/0,Lu=null,Wa=null,en=0,Ai=null,zs=null,ki=0,bh=0,Ah=null,kg=null,br=null,Ar=null,Rr=null,Ko=0,Ou=null;function ai(){return(Le&2)!==0&&be!==0?be&-be:gt.T!==null?zh():Q()}function Yg(){if(ii===0)if((be&536870912)===0||Se){var t=_s;_s<<=1,(_s&3932160)===0&&(_s=262144),ii=t}else ii=536870912;return t=Rn.current,t!==null&&(t.flags|=32),ii}function Cr(t,n){if(n!=null){var a=t.stateNode,r=a.ref;r===null&&(r=a.ref=b0(aa(t.memoizedProps,a))),Ar===null&&(Ar=[]),Ar.push(n.bind(null,r))}}function Kn(t,n,a){(t===qe&&(Ie===2||Ie===9)||t.cancelPendingCommit!==null)&&(wr(t,0),ja(t,be,ii,!1)),gs(t,a),((Le&2)===0||t!==qe)&&(t===qe&&((Le&2)===0&&(Ps|=a),an===4&&ja(t,be,ii,!1)),Yi(t))}function qg(t,n,a){if((Le&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Ca(t,n),u=r?xx(t,n):Ch(t,n,!0),c=r;do{if(u===0){Er&&!r&&ja(t,n,0,!1);break}else{if(a=t.current.alternate,c&&!Sx(a)){u=Ch(t,n,!1),c=!1;continue}if(u===2){if(c=n,t.errorRecoveryDisabledLanes&c)var _=0;else _=t.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){n=_;t:{var E=t;u=Zo;var z=E.current.memoizedState.isDehydrated;if(z&&(wr(E,_).flags|=256),_=Ch(E,_,!1),_!==2&&_!==6){if(Eh&&!z){E.errorRecoveryDisabledLanes|=c,Ps|=c,u=4;break t}c=Zn,Zn=u,c!==null&&(Zn===null?Zn=c:Zn.push.apply(Zn,c))}u=_}if(c=!1,u!==2)continue}}if(u===1){wr(t,0),ja(t,n,0,!0);break}t:{switch(r=t,c=u,c){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:ja(r,n,ii,!Ya);break t;case 2:Zn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Uu+300-X(),10<u)){if(ja(r,n,ii,!Ya),ta(r,0,!0)!==0)break t;ki=n,r.timeoutHandle=Wh(Wg.bind(null,r,a,Zn,Lu,Th,n,ii,Ps,Tr,Ya,c,"Throttled",-0,0),u);break t}Wg(r,a,Zn,Lu,Th,n,ii,Ps,Tr,Ya,c,null,-0,0)}}break}while(!0);Yi(t)}function Wg(t,n,a,r,u,c,_,E,z,j,nt,dt,k,$){t.timeoutHandle=-1;var Ut=n.subtreeFlags,kt=(c&335544064)===c;if(dt=null,(kt||Ut&8192||(Ut&16785408)===16785408)&&(dt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Pi},ei=null,Fg(n,c,dt),kt&&(Ut=dt,kt=t.containerInfo,kt=(kt.nodeType===9?kt:kt.ownerDocument).__reactViewTransition,kt!=null&&(Ut.count++,Ut.waitingForViewTransition=!0,Ut=al.bind(Ut),kt.finished.then(Ut,Ut))),Ut=(c&62914560)===c?Uu-X():(c&4194048)===c?Xg-X():0,Ut=EM(dt,Ut),Ut!==null)){ki=c,t.cancelPendingCommit=Ut(e0.bind(null,t,n,c,a,r,u,_,E,z,j,nt,dt,null,k,$)),ja(t,c,_,!j);return}e0(t,n,c,a,r,u,_,E,z,j,nt,dt)}function Sx(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var u=a[r],c=u.getSnapshot;u=u.value;try{if(!$n(c(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ja(t,n,a,r){n=vo(t,n),n&=~Du,n&=~Ps,t.suspendedLanes|=n,t.pingedLanes&=~n,r&&(t.warmLanes|=n),r=t.expirationTimes;for(var u=n;0<u;){var c=31-Ln(u),_=1<<c;r[c]=-1,u&=~_}a!==0&&Nl(t,a,n)}function Pu(){return(Le&6)===0?(Qo(0),!1):!0}function Rh(){if(Ee!==null){if(Ie===0)var t=Ee.return;else t=Ee,la=Es=null,Pf(t),mr=null,Oo=0,t=Ee;for(;t!==null;)_g(t.alternate,t),t=t.return;Ee=null}}function wr(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,Xx(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ki=0,Rh(),qe=t,Ee=a=ra(t.current,null),be=n,Ie=0,ni=null,Ya=!1,Er=Ca(t,n),Eh=!1,Tr=ii=Du=Ps=qa=an=0,Zn=Zo=null,Th=!1,pa=vo(t,n),Xl(),a}function jg(t,n){de=null,gt.H=pu,n===pr||n===tu?(n=e_(),Ie=3):n===Mf?(n=e_(),Ie=4):Ie=n===Kf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ni=n,Ee===null&&(an=1,mu(t,hi(n,t.current)))}function Zg(){var t=Rn.current;return t===null?!0:(be&4194048)===be?Pn===null:(be&62914560)===be||(be&536870912)!==0?t===Pn:!1}function Kg(){var t=gt.H;return gt.H=pu,t===null?pu:t}function Qg(){var t=gt.A;return gt.A=gx,t}function zu(){an=4,Ya||(be&4194048)!==be&&Rn.current!==null||(Er=!0),(qa&134217727)===0&&(Ps&134217727)===0||qe===null||ja(qe,be,ii,!1)}function Ch(t,n,a){var r=Le;Le|=2;var u=Kg(),c=Qg();(qe!==t||be!==n)&&(Lu=null,wr(t,n)),n=!1;var _=an;t:do try{if(Ie!==0&&Ee!==null){var E=Ee,z=ni;switch(Ie){case 8:Rh(),_=6;break t;case 3:case 2:case 9:case 6:Rn.current===null&&(n=!0);var j=Ie;if(Ie=0,ni=null,Dr(t,E,z,j),a&&Er){_=0;break t}break;default:j=Ie,Ie=0,ni=null,Dr(t,E,z,j)}}yx(),_=an;break}catch(nt){jg(t,nt)}while(!0);return n&&t.shellSuspendCounter++,la=Es=null,Le=r,gt.H=u,gt.A=c,Ee===null&&(qe=null,be=0,Xl()),_}function yx(){for(;Ee!==null;)Jg(Ee)}function xx(t,n){var a=Le;Le|=2;var r=Kg(),u=Qg();qe!==t||be!==n?(Lu=null,Nu=X()+500,wr(t,n)):Er=Ca(t,n);t:do try{if(Ie!==0&&Ee!==null){n=Ee;var c=ni;e:switch(Ie){case 1:Ie=0,ni=null,Dr(t,n,c,1);break;case 2:case 9:if($m(c)){Ie=0,ni=null,$g(n);break}n=function(){Ie!==2&&Ie!==9||qe!==t||(Ie=7),Yi(t)},c.then(n,n);break t;case 3:Ie=7;break t;case 4:Ie=5;break t;case 7:$m(c)?(Ie=0,ni=null,$g(n)):(Ie=0,ni=null,Dr(t,n,c,7));break;case 5:var _=null;switch(Ee.tag){case 26:_=Ee.memoizedState;case 5:case 27:var E=Ee;if(_?k0(_):E.stateNode.complete){Ie=0,ni=null;var z=E.sibling;if(z!==null)Ee=z;else{var j=E.return;j!==null?(Ee=j,Iu(j)):Ee=null}break e}}Ie=0,ni=null,Dr(t,n,c,5);break;case 6:Ie=0,ni=null,Dr(t,n,c,6);break;case 8:Rh(),an=6;break t;default:throw Error(s(462))}}Mx();break}catch(nt){jg(t,nt)}while(!0);return la=Es=null,gt.H=r,gt.A=u,Le=a,Ee!==null?0:(qe=null,be=0,Xl(),an)}function Mx(){for(;Ee!==null&&!Ot();)Jg(Ee)}function Jg(t){var n=pg(t.alternate,t,pa);t.memoizedProps=t.pendingProps,n===null?Iu(t):Ee=n}function $g(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=og(a,n,n.pendingProps,n.type,void 0,be);break;case 11:n=og(a,n,n.pendingProps,n.type.render,n.ref,be);break;case 5:Pf(n);var r=n;r===yn&&(Se?(Zl(r),r.tag===5&&r.stateNode!=null&&(je=r.stateNode)):(Zl(r),Se=!0));default:_g(a,n),n=Ee=Vm(n,pa),n=pg(a,n,pa)}t.memoizedProps=t.pendingProps,n===null?Iu(t):Ee=n}function Dr(t,n,a,r){la=Es=null,Pf(n),mr=null,Oo=0;var u=n.return;try{if(ux(t,u,n,a,be)){an=1,mu(t,hi(a,t.current)),Ee=null;return}}catch(c){if(u!==null)throw Ee=u,c;an=1,mu(t,hi(a,t.current)),Ee=null;return}n.flags&32768?(Se||r===1?t=!0:Er||(be&536870912)!==0?t=!1:(Ya=t=!0,(r===2||r===9||r===3||r===6)&&(r=Rn.current,r!==null&&r.tag===13&&(r.flags|=16384))),t0(n,t)):Iu(n)}function Iu(t){var n=t;do{if((n.flags&32768)!==0){t0(n,Ya);return}t=n.return;var a=dx(n.alternate,n,pa);if(a!==null){Ee=a;return}if(n=n.sibling,n!==null){Ee=n;return}Ee=n=t}while(n!==null);an===0&&(an=5)}function t0(t,n){do{var a=px(t.alternate,t);if(a!==null){a.flags&=32767,Ee=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Ee=t;return}Ee=t=a}while(t!==null);an=6,Ee=null}function e0(t,n,a,r,u,c,_,E,z,j,nt,dt){t.cancelPendingCommit=null;do Bu();while(en!==0);if((Le&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));t===qe&&(Ee=qe=null,be=0),zs=n,Ai=t,ki=a,Ah=u,kg=r,Ex(t,n,a,_,E,z,dt)}}function Ex(t,n,a,r,u,c,_){var E=n.lanes|n.childLanes;if(bh=E,E|=uf,Fc(t,a,E,r,u,c),Ar=null,(a&335544064)===a?(Rr=Qy(t),r=10262):(Rr=null,r=10256),(n.subtreeFlags&r)!==0||(n.flags&r)!==0?(t.callbackNode=null,t.callbackPriority=0,wx(At,function(){return Nh(),null})):(t.callbackNode=null,t.callbackPriority=0),Eu=!1,r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=gt.T,gt.T=null,u=Ct.p,Ct.p=2,c=Le,Le|=4;try{mx(t,n,a)}finally{Le=c,Ct.p=u,gt.T=r}}en=1,Eu?br=Zx(_,t.containerInfo,Rr,wh,Dh,bx,Uh,Nh,Tx):(wh(),Dh(),Uh())}function Tx(t){if(en!==0){var n=Ai.onRecoverableError;n(t,{componentStack:null})}}function bx(){en===3&&(en=0,Ig(zs,Ai),en=4)}function wh(){if(en===1){en=0;var t=Ai,n=zs,a=ki,r=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||r){r=gt.T,gt.T=null;var u=Ct.p;Ct.p=2;var c=Le;Le|=4;try{qo=Au=!1,Pg(n,t,a),a=kh;var _=Nm(t.containerInfo),E=a.focusedElem,z=a.selectionRange;if(_!==E&&E&&E.ownerDocument&&Um(E.ownerDocument.documentElement,E)){if(z!==null&&af(E)){var j=z.start,nt=z.end;if(nt===void 0&&(nt=j),"selectionStart"in E)E.selectionStart=j,E.selectionEnd=Math.min(nt,E.value.length);else{var dt=E.ownerDocument||document,k=dt&&dt.defaultView||window;if(k.getSelection){var $=k.getSelection(),Ut=E.textContent.length,kt=Math.min(z.start,Ut),pe=z.end===void 0?kt:Math.min(z.end,Ut);!$.extend&&kt>pe&&(_=pe,pe=kt,kt=_);var q=Dm(E,kt),V=Dm(E,pe);if(q&&V&&($.rangeCount!==1||$.anchorNode!==q.node||$.anchorOffset!==q.offset||$.focusNode!==V.node||$.focusOffset!==V.offset)){var J=dt.createRange();J.setStart(q.node,q.offset),$.removeAllRanges(),kt>pe?($.addRange(J),$.extend(V.node,V.offset)):(J.setEnd(V.node,V.offset),$.addRange(J))}}}}for(dt=[],$=E;$=$.parentNode;)$.nodeType===1&&dt.push({element:$,left:$.scrollLeft,top:$.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<dt.length;E++){var ht=dt[E];ht.element.scrollLeft=ht.left,ht.element.scrollTop=ht.top}}Br=!!Xh,kh=Xh=null}finally{Le=c,Ct.p=u,gt.T=r}}t.current=n,en=2}}function Dh(){if(en===2){en=0;var t=Ai,n=zs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=gt.T,gt.T=null;var r=Ct.p;Ct.p=2;var u=Le;Le|=4;try{wg(t,n.alternate,n)}finally{Le=u,Ct.p=r,gt.T=a}}en=3}}function Uh(){if(en===4||en===3){en=0;var t=br;br=null,ue();var n=Ai,a=zs,r=ki,u=kg,c=(r&335544064)===r?10262:10256;if((a.subtreeFlags&c)!==0||(a.flags&c)!==0?en=5:(en=0,zs=Ai=null,n0(n,n.pendingLanes)),c=n.pendingLanes,c===0&&(Wa=null),rt(r),a=a.stateNode,Qe&&typeof Qe.onCommitFiberRoot=="function")try{Qe.onCommitFiberRoot(Re,a,void 0,(a.current.flags&128)===128)}catch{}if(u!==null){a=gt.T,c=Ct.p,Ct.p=2,gt.T=null;try{for(var _=n.onRecoverableError,E=0;E<u.length;E++){var z=u[E];_(z.value,{componentStack:z.stack})}}finally{gt.T=a,Ct.p=c}}if(u=Ar,_=Rr,Rr=null,u!==null&&(Ar=null,_===null&&(_=[]),t!==null))for(z=0;z<u.length;z++)a=(0,u[z])(_),a!==void 0&&t.finished.finally(a);(ki&3)!==0&&Bu(),Yi(n),c=n.pendingLanes,(r&261930)!==0&&(c&42)!==0?n===Ou?Ko++:(Ko=0,Ou=n):(Ko=0,Ou=null),Qo(0)}}function n0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Uo(n)))}function Bu(){return br!==null&&(br.skipTransition(),br=null),wh(),Dh(),Uh(),Nh()}function Nh(){if(en!==5)return!1;var t=Ai,n=bh;bh=0;var a=rt(ki),r=gt.T,u=Ct.p;try{Ct.p=32>a?32:a,gt.T=null,a=Ah,Ah=null;var c=Ai,_=ki;if(en=0,zs=Ai=null,ki=0,(Le&6)!==0)throw Error(s(331));var E=Le;if(Le|=4,Gg(c.current),Bg(c,c.current,_,a),Le=E,Qo(0,!1),Qe&&typeof Qe.onPostCommitFiberRoot=="function")try{Qe.onPostCommitFiberRoot(Re,c)}catch{}return!0}finally{Ct.p=u,gt.T=r,n0(t,n)}}function i0(t,n,a){n=hi(a,n),n=Zf(t.stateNode,n,2),t=Fa(t,n,2),t!==null&&(gs(t,2),Yi(t))}function Be(t,n,a){if(t.tag===3)i0(t,t,a);else for(;n!==null;){if(n.tag===3){i0(n,t,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Wa===null||!Wa.has(r))){t=hi(a,t),a=$_(2),r=Fa(n,a,2),r!==null&&(tg(a,r,n,t),gs(r,2),Yi(r));break}}n=n.return}}function Lh(t,n,a){var r=t.pingCache;if(r===null){r=t.pingCache=new vx;var u=new Set;r.set(n,u)}else u=r.get(n),u===void 0&&(u=new Set,r.set(n,u));u.has(a)||(Eh=!0,u.add(a),t=Ax.bind(null,t,n,a),n.then(t,t))}function Ax(t,n,a){var r=t.pingCache;r!==null&&r.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,qe===t&&(be&a)===a&&((an===4||an===3&&(be&62914560)===be&&300>X()-Uu)&&(Le&2)===0?wr(t,0):Du|=a,Tr===be&&(Tr=0)),Yi(t)}function a0(t,n){n===0&&(n=Ul()),t=ys(t,n),t!==null&&(gs(t,n),Yi(t))}function Rx(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),a0(t,a)}function Cx(t,n){var a=0;switch(t.tag){case 31:case 13:var r=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:r=t.stateNode;break;case 22:r=t.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),a0(t,a)}function wx(t,n){return ee(t,n)}var Ur=null,Nr=null,Oh=!1,Fu=!1,Ph=!1,Za=0;function Yi(t){t!==Nr&&t.next===null&&(Nr===null?Ur=Nr=t:Nr=Nr.next=t),Fu=!0,Oh||(Oh=!0,Ux())}function Qo(t,n){if(!Ph&&Fu){Ph=!0;do for(var a=!1,r=Ur;r!==null;){if(t!==0){var u=r.pendingLanes;if(u===0)var c=0;else{var _=r.suspendedLanes,E=r.pingedLanes;c=(1<<31-Ln(42|t)+1)-1,c&=u&~(_&~E),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(a=!0,l0(r,c))}else c=be,c=ta(r,r===qe?c:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(c&3)===0||Ca(r,c)||(a=!0,l0(r,c));r=r.next}while(a);Ph=!1}}function Dx(){s0()}function s0(){Fu=Oh=!1;var t=0;Za!==0&&Vx()&&(t=Za);for(var n=X(),a=null,r=Ur;r!==null;){var u=r.next,c=r0(r,n);c===0?(r.next=null,a===null?Ur=u:a.next=u,u===null&&(Nr=a)):(a=r,(t!==0||(c&3)!==0)&&(Fu=!0)),r=u}en!==0&&en!==5||Qo(t),Za!==0&&(Za=0)}function r0(t,n){for(var a=t.suspendedLanes,r=t.pingedLanes,u=t.expirationTimes,c=t.pendingLanes&-62914561;0<c;){var _=31-Ln(c),E=1<<_,z=u[_];z===-1?((E&a)===0||(E&r)!==0)&&(u[_]=Bc(E,n)):z<=n&&(t.expiredLanes|=E),c&=~E}if(n=qe,a=be,a=ta(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r=t.callbackNode,a===0||t===n&&(Ie===2||Ie===9)||t.cancelPendingCommit!==null)return r!==null&&r!==null&&Jt(r),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Ca(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(r!==null&&Jt(r),rt(a)){case 2:case 8:a=Gt;break;case 32:a=At;break;case 268435456:a=Xt;break;default:a=At}return r=o0.bind(null,t),a=ee(a,r),t.callbackPriority=n,t.callbackNode=a,n}return r!==null&&r!==null&&Jt(r),t.callbackPriority=2,t.callbackNode=null,2}function o0(t,n){if(en!==0&&en!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Bu()&&t.callbackNode!==a)return null;var r=be;return r=ta(t,t===qe?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r===0?null:(qg(t,r,n),r0(t,X()),t.callbackNode!=null&&t.callbackNode===a?o0.bind(null,t):null)}function l0(t,n){if(Bu())return null;qg(t,n,!0)}function Ux(){kx(function(){(Le&6)!==0?ee(Et,Dx):s0()})}function zh(){if(Za===0){var t=As;t===0&&(t=ms,ms<<=1,(ms&261888)===0&&(ms=256)),Za=t}return Za}function u0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Pl(t)}function Nx(t,n,a,r,u){if(n==="submit"&&a&&a.stateNode===u){var c=u0((u[Dt]||null).action),_=r.submitter;_&&(n=(n=_[Dt]||null)?u0(n.formAction):_.getAttribute("formAction"),n!==null&&(c=n,_=null));var E=new Fl("action","action",null,r,u);t.push({event:E,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Za!==0){var z=new FormData(u,_);kf(a,{pending:!0,data:z,method:u.method,action:c},null,z)}}else typeof c=="function"&&(E.preventDefault(),z=new FormData(u,_),kf(a,{pending:!0,data:z,method:u.method,action:c},c,z))},currentTarget:u}]})}}for(var Ih=0;Ih<lf.length;Ih++){var Bh=lf[Ih],Lx=Bh.toLowerCase(),Ox=Bh[0].toUpperCase()+Bh.slice(1);Mi(Lx,"on"+Ox)}Mi(Pm,"onAnimationEnd"),Mi(zm,"onAnimationIteration"),Mi(Im,"onAnimationStart"),Mi("dblclick","onDoubleClick"),Mi("focusin","onFocus"),Mi("focusout","onBlur"),Mi(Xy,"onTransitionRun"),Mi(ky,"onTransitionStart"),Mi(Yy,"onTransitionCancel"),Mi(Bm,"onTransitionEnd"),pn("onMouseEnter",["mouseout","mouseover"]),pn("onMouseLeave",["mouseout","mouseover"]),pn("onPointerEnter",["pointerout","pointerover"]),pn("onPointerLeave",["pointerout","pointerover"]),ln("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ln("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ln("onBeforeInput",["compositionend","keypress","textInput","paste"]),ln("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ln("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ln("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Jo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Px=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jo));function c0(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var r=t[a],u=r.event;r=r.listeners;t:{var c=void 0;if(n)for(var _=r.length-1;0<=_;_--){var E=r[_],z=E.instance,j=E.currentTarget;if(E=E.listener,z!==c&&u.isPropagationStopped())break t;c=E,u.currentTarget=j;try{c(u)}catch(nt){Vl(nt)}u.currentTarget=null,c=z}else for(_=0;_<r.length;_++){if(E=r[_],z=E.instance,j=E.currentTarget,E=E.listener,z!==c&&u.isPropagationStopped())break t;c=E,u.currentTarget=j;try{c(u)}catch(nt){Vl(nt)}u.currentTarget=null,c=z}}}}function Te(t,n){var a=n[oe];a===void 0&&(a=n[oe]=new Set);var r=t+"__bubble";a.has(r)||(f0(n,t,2,!1),a.add(r))}function Fh(t,n,a){var r=0;n&&(r|=4),f0(a,t,r,n)}var Hu="_reactListening"+Math.random().toString(36).slice(2);function Hh(t){if(!t[Hu]){t[Hu]=!0,wa.forEach(function(a){a!=="selectionchange"&&(Px.has(a)||Fh(a,!1,t),Fh(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Hu]||(n[Hu]=!0,Fh("selectionchange",!1,n))}}function f0(t,n,a,r){switch(tv(n)){case 2:var u=RM;break;case 8:u=CM;break;default:u=rd}a=u.bind(null,n,a,t),u=void 0,!Wc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),r?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function Gh(t,n,a,r,u){var c=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var _=r.tag;if(_===3||_===4){var E=r.stateNode.containerInfo;if(E===u)break;if(_===4)for(_=r.return;_!==null;){var z=_.tag;if((z===3||z===4)&&_.stateNode.containerInfo===u)return;_=_.return}for(;E!==null;){if(_=Wt(E),_===null)return;if(z=_.tag,z===5||z===6||z===26||z===27){r=c=_;continue t}E=E.parentNode}}r=r.return}fm(function(){var j=c,nt=Yc(a),dt=[];t:{var k=Fm.get(t);if(k!==void 0){var $=Fl,Ut=t;switch(t){case"keypress":if(Il(a)===0)break t;case"keydown":case"keyup":$=Sy;break;case"focusin":Ut="focus",$=Qc;break;case"focusout":Ut="blur",$=Qc;break;case"beforeblur":case"afterblur":$=Qc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":$=pm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":$=oy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":$=Ty;break;case Pm:case zm:case Im:$=cy;break;case Bm:$=Ay;break;case"scroll":case"scrollend":$=sy;break;case"wheel":$=Cy;break;case"copy":case"cut":case"paste":$=hy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":$=_m;break;case"submit":$=My;break;case"toggle":case"beforetoggle":$=Dy}var kt=(n&4)!==0,pe=!kt&&(t==="scroll"||t==="scrollend"),q=kt?k!==null?k+"Capture":null:k;kt=[];for(var V=j,J;V!==null;){var ht=V;if(J=ht.stateNode,ht=ht.tag,ht!==5&&ht!==26&&ht!==27||J===null||q===null||(ht=yo(V,q),ht!=null&&kt.push($o(V,ht,J))),pe)break;V=V.return}0<kt.length&&(k=new $(k,Ut,null,a,nt),dt.push({event:k,listeners:kt}))}}if((n&7)===0){t:{if($=t==="mouseover"||t==="pointerover",k=t==="mouseout"||t==="pointerout",$&&a!==kc&&(Ut=a.relatedTarget||a.fromElement)&&(Wt(Ut)||Ut[te]))break t;(k||$)&&(Ut=nt.window===nt?nt:($=nt.ownerDocument)?$.defaultView||$.parentWindow:window,k?($=a.relatedTarget||a.toElement,k=j,$=$?Wt($):null,$!==null&&(pe=f($),kt=$.tag,$!==pe||kt!==5&&kt!==27&&kt!==6)&&($=null)):(k=null,$=j),k!==$&&(kt=pm,ht="onMouseLeave",q="onMouseEnter",V="mouse",(t==="pointerout"||t==="pointerover")&&(kt=_m,ht="onPointerLeave",q="onPointerEnter",V="pointer"),pe=k==null?Ut:xe(k),J=$==null?Ut:xe($),Ut=new kt(ht,V+"leave",k,a,nt),Ut.target=pe,Ut.relatedTarget=J,ht=null,Wt(nt)===j&&(kt=new kt(q,V+"enter",$,a,nt),kt.target=J,kt.relatedTarget=pe,ht=kt),pe=ht,kt=k&&$?I(k,$,zx):null,k!==null&&h0(dt,Ut,k,kt,!1),$!==null&&pe!==null&&h0(dt,pe,$,kt,!0)))}t:{if(k=j?xe(j):window,$=k.nodeName&&k.nodeName.toLowerCase(),$==="select"||$==="input"&&k.type==="file")var Ht=Tm;else if(Mm(k))if(bm)Ht=Hy;else{Ht=By;var Ae=Iy}else $=k.nodeName,!$||$.toLowerCase()!=="input"||k.type!=="checkbox"&&k.type!=="radio"?j&&Xc(j.elementType)&&(Ht=Tm):Ht=Fy;if(Ht&&(Ht=Ht(t,j))){Em(dt,Ht,a,nt);break t}Ae&&Ae(t,k,j)}switch(Ae=j?xe(j):window,t){case"focusin":(Mm(Ae)||Ae.contentEditable==="true")&&(rr=Ae,sf=j,Co=null);break;case"focusout":Co=sf=rr=null;break;case"mousedown":rf=!0;break;case"contextmenu":case"mouseup":case"dragend":rf=!1,Lm(dt,a,nt);break;case"selectionchange":if(Vy)break;case"keydown":case"keyup":Lm(dt,a,nt)}var Kt;if($c)t:{switch(t){case"compositionstart":var se="onCompositionStart";break t;case"compositionend":se="onCompositionEnd";break t;case"compositionupdate":se="onCompositionUpdate";break t}se=void 0}else sr?ym(t,a)&&(se="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(se="onCompositionStart");se&&(gm&&a.locale!=="ko"&&(sr||se!=="onCompositionStart"?se==="onCompositionEnd"&&sr&&(Kt=hm()):(Da=nt,jc="value"in Da?Da.value:Da.textContent,sr=!0)),Ae=Gu(j,se),0<Ae.length&&(se=new mm(se,t,null,a,nt),dt.push({event:se,listeners:Ae}),Kt?se.data=Kt:(Kt=xm(a),Kt!==null&&(se.data=Kt)))),(Kt=Ny?Ly(t,a):Oy(t,a))&&(se=Gu(j,"onBeforeInput"),0<se.length&&(Ae=new mm("onBeforeInput","beforeinput",null,a,nt),dt.push({event:Ae,listeners:se}),Ae.data=Kt)),Nx(dt,t,j,a,nt)}c0(dt,n)})}function $o(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Gu(t,n){for(var a=n+"Capture",r=[];t!==null;){var u=t,c=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||c===null||(u=yo(t,a),u!=null&&r.unshift($o(t,u,c)),u=yo(t,n),u!=null&&r.push($o(t,u,c))),t.tag===3)return r;t=t.return}return[]}function zx(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function h0(t,n,a,r,u){for(var c=n._reactName,_=[];a!==null&&a!==r;){var E=a,z=E.alternate,j=E.stateNode;if(E=E.tag,z!==null&&z===r)break;E!==5&&E!==26&&E!==27||j===null||(z=j,u?(j=yo(a,c),j!=null&&_.unshift($o(a,j,z))):u||(j=yo(a,c),j!=null&&_.push($o(a,j,z)))),a=a.return}_.length!==0&&t.push({event:n,listeners:_})}var Ix=/\r\n?/g,Bx=/\u0000|\uFFFD/g;function d0(t){return(typeof t=="string"?t:""+t).replace(Ix,`
`).replace(Bx,"")}function p0(t,n){return n=d0(n),d0(t)===n}function Fe(t,n,a,r,u,c){switch(a){case"children":if(typeof r=="string")n==="body"||n==="textarea"&&r===""||nr(t,r);else if(typeof r=="number"||typeof r=="bigint")n!=="body"&&nr(t,""+r);else return;break;case"className":Ol(t,"class",r);break;case"tabIndex":Ol(t,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":Ol(t,a,r);break;case"style":um(t,r,c);return;case"data":if(n!=="object"){Ol(t,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Pl(r),t.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(a==="formAction"?(n!=="input"&&Fe(t,n,"name",u.name,u,null),Fe(t,n,"formEncType",u.formEncType,u,null),Fe(t,n,"formMethod",u.formMethod,u,null),Fe(t,n,"formTarget",u.formTarget,u,null)):(Fe(t,n,"encType",u.encType,u,null),Fe(t,n,"method",u.method,u,null),Fe(t,n,"target",u.target,u,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Pl(r),t.setAttribute(a,r);break;case"onClick":r!=null&&(t.onclick=Pi);return;case"onScroll":r!=null&&Te("scroll",t);return;case"onScrollEnd":r!=null&&Te("scrollend",t);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(u.children!=null)throw Error(s(60));c?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":t.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){t.removeAttribute("xlink:href");break}a=Pl(r),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":r===!0?t.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?t.setAttribute(a,r):t.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?t.removeAttribute(a):t.setAttribute(a,r);break;case"popover":Te("beforetoggle",t),Te("toggle",t),Ll(t,"popover",r);break;case"xlinkActuate":na(t,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":na(t,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":na(t,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":na(t,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":na(t,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":na(t,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":na(t,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":na(t,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":na(t,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":Ll(t,"is",r);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=iy.get(a)||a,Ll(t,a,r);else return}De=!0}function Vh(t,n,a,r,u,c){switch(a){case"style":um(t,r,c);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(u.children!=null)throw Error(s(60));c?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof r=="string")nr(t,r);else if(typeof r=="number"||typeof r=="bigint")nr(t,""+r);else return;break;case"onScroll":r!=null&&Te("scroll",t);return;case"onScrollEnd":r!=null&&Te("scrollend",t);return;case"onClick":r!=null&&(t.onclick=Pi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!Ye.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),c=a.slice(2,u?a.length-7:void 0),n=t[Dt]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(c,n,u),typeof r=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(c,r,u);break t}De=!0,a in t?t[a]=r:r===!0?t.setAttribute(a,""):Ll(t,a,r)}return}De=!0}function Dn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Te("error",t),Te("load",t);var r=!1,u=!1,c;for(c in a)if(a.hasOwnProperty(c)){var _=a[c];if(_!=null)switch(c){case"src":r=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Fe(t,n,c,_,a,null)}}u&&Fe(t,n,"srcSet",a.srcSet,a,null),r&&Fe(t,n,"src",a.src,a,null);return;case"input":Te("invalid",t);var E=c=_=u=null,z=null,j=null;for(r in a)if(a.hasOwnProperty(r)){var nt=a[r];if(nt!=null)switch(r){case"name":u=nt;break;case"type":_=nt;break;case"checked":z=nt;break;case"defaultChecked":j=nt;break;case"value":c=nt;break;case"defaultValue":E=nt;break;case"children":case"dangerouslySetInnerHTML":if(nt!=null)throw Error(s(137,n));break;default:Fe(t,n,r,nt,a,null)}}sm(t,c,E,z,j,_,u,!1);return;case"select":Te("invalid",t),r=_=c=null;for(u in a)if(a.hasOwnProperty(u)&&(E=a[u],E!=null))switch(u){case"value":c=E;break;case"defaultValue":_=E;break;case"multiple":r=E;default:Fe(t,n,u,E,a,null)}n=c,a=_,t.multiple=!!r,n!=null?er(t,!!r,n,!1):a!=null&&er(t,!!r,a,!0);return;case"textarea":Te("invalid",t),c=u=r=null;for(_ in a)if(a.hasOwnProperty(_)&&(E=a[_],E!=null))switch(_){case"value":r=E;break;case"defaultValue":u=E;break;case"children":c=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(s(91));break;default:Fe(t,n,_,E,a,null)}om(t,r,u,c);return;case"option":for(z in a)a.hasOwnProperty(z)&&(r=a[z],r!=null)&&(z==="selected"?t.selected=r&&typeof r!="function"&&typeof r!="symbol":Fe(t,n,z,r,a,null));return;case"dialog":Te("beforetoggle",t),Te("toggle",t),Te("cancel",t),Te("close",t);break;case"iframe":case"object":Te("load",t);break;case"video":case"audio":for(r=0;r<Jo.length;r++)Te(Jo[r],t);break;case"image":Te("error",t),Te("load",t);break;case"details":Te("toggle",t);break;case"embed":case"source":case"link":Te("error",t),Te("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(j in a)if(a.hasOwnProperty(j)&&(r=a[j],r!=null))switch(j){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Fe(t,n,j,r,a,null)}return;default:if(Xc(n)){for(nt in a)a.hasOwnProperty(nt)&&(r=a[nt],r!==void 0&&Vh(t,n,nt,r,a,void 0));return}}for(E in a)a.hasOwnProperty(E)&&(r=a[E],r!=null&&Fe(t,n,E,r,a,null))}var Fx={};function Hx(t,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,c=null,_=null,E=null,z=null,j=null,nt=null;for($ in a){var dt=a[$];if(a.hasOwnProperty($)&&dt!=null)switch($){case"checked":break;case"value":break;case"defaultValue":z=dt;default:r.hasOwnProperty($)||Fe(t,n,$,null,r,dt)}}for(var k in r){var $=r[k];if(dt=a[k],r.hasOwnProperty(k)&&($!=null||dt!=null))switch(k){case"type":$!==dt&&(De=!0),c=$;break;case"name":$!==dt&&(De=!0),u=$;break;case"checked":$!==dt&&(De=!0),j=$;break;case"defaultChecked":$!==dt&&(De=!0),nt=$;break;case"value":$!==dt&&(De=!0),_=$;break;case"defaultValue":$!==dt&&(De=!0),E=$;break;case"children":case"dangerouslySetInnerHTML":if($!=null)throw Error(s(137,n));break;default:$!==dt&&Fe(t,n,k,$,r,dt)}}Gc(t,_,E,z,j,nt,c,u);return;case"select":$=_=E=k=null;for(c in a)if(z=a[c],a.hasOwnProperty(c)&&z!=null)switch(c){case"value":break;case"multiple":$=z;default:r.hasOwnProperty(c)||Fe(t,n,c,null,r,z)}for(u in r)if(c=r[u],z=a[u],r.hasOwnProperty(u)&&(c!=null||z!=null))switch(u){case"value":c!==z&&(De=!0),k=c;break;case"defaultValue":c!==z&&(De=!0),E=c;break;case"multiple":c!==z&&(De=!0),_=c;default:c!==z&&Fe(t,n,u,c,r,z)}n=E,a=_,r=$,k!=null?er(t,!!a,k,!1):!!r!=!!a&&(n!=null?er(t,!!a,n,!0):er(t,!!a,a?[]:"",!1));return;case"textarea":$=k=null;for(E in a)if(u=a[E],a.hasOwnProperty(E)&&u!=null&&!r.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:Fe(t,n,E,null,r,u)}for(_ in r)if(u=r[_],c=a[_],r.hasOwnProperty(_)&&(u!=null||c!=null))switch(_){case"value":u!==c&&(De=!0),k=u;break;case"defaultValue":u!==c&&(De=!0),$=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==c&&Fe(t,n,_,u,r,c)}rm(t,k,$);return;case"option":for(var Ut in a)k=a[Ut],a.hasOwnProperty(Ut)&&k!=null&&!r.hasOwnProperty(Ut)&&(Ut==="selected"?t.selected=!1:Fe(t,n,Ut,null,r,k));for(z in r)k=r[z],$=a[z],r.hasOwnProperty(z)&&k!==$&&(k!=null||$!=null)&&(z==="selected"?(k!==$&&(De=!0),t.selected=k&&typeof k!="function"&&typeof k!="symbol"):Fe(t,n,z,k,r,$));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var kt in a)k=a[kt],a.hasOwnProperty(kt)&&k!=null&&!r.hasOwnProperty(kt)&&Fe(t,n,kt,null,r,k);for(j in r)if(k=r[j],$=a[j],r.hasOwnProperty(j)&&k!==$&&(k!=null||$!=null))switch(j){case"children":case"dangerouslySetInnerHTML":if(k!=null)throw Error(s(137,n));break;default:Fe(t,n,j,k,r,$)}return;default:if(Xc(n)){for(var pe in a)k=a[pe],a.hasOwnProperty(pe)&&k!==void 0&&!r.hasOwnProperty(pe)&&Vh(t,n,pe,void 0,r,k);for(nt in r)k=r[nt],$=a[nt],!r.hasOwnProperty(nt)||k===$||k===void 0&&$===void 0||Vh(t,n,nt,k,r,$);return}}for(var q in a)k=a[q],a.hasOwnProperty(q)&&k!=null&&!r.hasOwnProperty(q)&&Fe(t,n,q,null,r,k);for(dt in r)k=r[dt],$=a[dt],!r.hasOwnProperty(dt)||k===$||k==null&&$==null||Fe(t,n,dt,k,r,$)}function m0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Gx(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var u=a[r],c=u.transferSize,_=u.initiatorType,E=u.duration;if(c&&E&&m0(_)){for(_=0,E=u.responseEnd,r+=1;r<a.length;r++){var z=a[r],j=z.startTime;if(j>E)break;var nt=z.transferSize,dt=z.initiatorType;nt&&m0(dt)&&(z=z.responseEnd,_+=nt*(z<E?1:(E-j)/(z-j)))}if(--r,n+=8*(c+_)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Xh=null,kh=null;function tl(t){return t.nodeType===9?t:t.ownerDocument}function _0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function g0(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function v0(t,n,a,r){return a=tl(a).createElement(t),a[Nt]=r,a[Dt]=n,Dn(a,t,n),Je(a),a}function Yh(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var qh=null;function Vx(){var t=window.event;return t&&t.type==="popstate"?t===qh?!1:(qh=t,!0):(qh=null,!1)}var Wh=typeof setTimeout=="function"?setTimeout:void 0,Xx=typeof clearTimeout=="function"?clearTimeout:void 0,S0=typeof Promise=="function"?Promise:void 0,y0=typeof requestAnimationFrame=="function"?requestAnimationFrame:Wh,kx=typeof queueMicrotask=="function"?queueMicrotask:typeof S0<"u"?function(t){return S0.resolve(null).then(t).catch(Yx)}:Wh;function Yx(t){setTimeout(function(){throw t})}function Ka(t){return t==="head"}function x0(t,n){var a=n,r=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(r===0){t.removeChild(u),Fr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")ed(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,ed(a);for(var c=a.firstChild;c;){var _=c.nextSibling,E=c.nodeName;c[He]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&c.rel.toLowerCase()==="stylesheet"||a.removeChild(c),c=_}}else a==="body"&&ed(t.ownerDocument.body);a=u}while(a);Fr(n)}function M0(t,n){var a=t;t=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=r}while(a)}function E0(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var r=1;else for(var u=r=0;u<n.length;u++){var c=n[u];0<c.width&&0<c.height&&r++}r===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function T0(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function qx(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function jh(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return qx(n,a,t)}function Wx(t){return t.documentElement.clientHeight}function jx(t){this.addEventListener("load",t),this.addEventListener("error",t)}function Zx(t,n,a,r,u,c,_,E,z){var j=n.nodeType===9?n:n.ownerDocument;try{var nt=j.startViewTransition({update:function(){var k=j.defaultView,$=k.navigation&&k.navigation.transition,Ut=j.fonts.status;r();var kt=[];if(Ut==="loaded"&&(Wx(j),j.fonts.status==="loading"&&kt.push(j.fonts.ready)),Ut=kt.length,t!==null)for(var pe=t.suspenseyImages,q=0,V=0;V<pe.length;V++){var J=pe[V];if(!J.complete){var ht=J.getBoundingClientRect();if(0<ht.bottom&&0<ht.right&&ht.top<k.innerHeight&&ht.left<k.innerWidth){if(q+=Y0(J),q>ku){kt.length=Ut;break}J=new Promise(jx.bind(J)),kt.push(J)}}}if(0<kt.length)return k=Promise.race([Promise.all(kt),new Promise(function(Ht){return setTimeout(Ht,500)})]).then(u,u),($?Promise.allSettled([$.finished,k]):k).then(c,c);if(u(),$)return $.finished.then(c,c);c()},types:a});j.__reactViewTransition=nt;var dt=[];return nt.ready.then(function(){for(var k=j.documentElement.getAnimations({subtree:!0}),$=0;$<k.length;$++){var Ut=k[$],kt=Ut.effect,pe=kt.pseudoElement;if(pe!=null&&pe.startsWith("::view-transition")){dt.push(Ut),Ut=kt.getKeyframes();for(var q=pe=void 0,V=!0,J=0;J<Ut.length;J++){var ht=Ut[J],Ht=ht.width;if(pe===void 0)pe=Ht;else if(pe!==Ht){V=!1;break}if(Ht=ht.height,q===void 0)q=Ht;else if(q!==Ht){V=!1;break}delete ht.width,delete ht.height,ht.transform==="none"&&delete ht.transform}V&&pe!==void 0&&q!==void 0&&(kt.setKeyframes(Ut),V=getComputedStyle(kt.target,kt.pseudoElement),V.width!==pe||V.height!==q)&&(V=Ut[0],V.width=pe,V.height=q,V=Ut[Ut.length-1],V.width=pe,V.height=q,kt.setKeyframes(Ut))}}_()},function(k){j.__reactViewTransition===nt&&(j.__reactViewTransition=null);try{typeof k=="object"&&k!==null&&k.name==="InvalidStateError"&&(k.message==="View transition was skipped because document visibility state is hidden."||k.message==="Skipping view transition because document visibility state has become hidden."||k.message==="Skipping view transition because viewport size changed."||k.message==="Transition was aborted because of invalid state")&&(k=null),k!==null&&z(k)}finally{r(),u(),_()}}),nt.finished.finally(function(){for(var k=0;k<dt.length;k++)dt[k].cancel();j.__reactViewTransition===nt&&(j.__reactViewTransition=null),E()}),nt}catch{return r(),u(),_(),null}}function Is(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}Is.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:L({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},Is.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),r=[],u=0;u<a.length;u++){var c=a[u].effect;c!==null&&c.target===t&&c.pseudoElement===n&&r.push(a[u])}return r},Is.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function b0(t){return{name:t,group:new Is("group",t),imagePair:new Is("image-pair",t),old:new Is("old",t),new:new Is("new",t)}}function si(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}si.prototype.addEventListener=function(t,n,a){var r=null,u=null;if(!(a!=null&&typeof a!="boolean"&&(r=a.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var c=this._eventListeners;if(R0(c,t,n,a)===-1){var _=this,E=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(E=function(z){_.removeEventListener(t,n,a),typeof n=="function"?n.call(this,z):n.handleEvent(z)}),r!==null&&(u=_.removeEventListener.bind(_,t,n,a),r.addEventListener("abort",u,{once:!0}),u=r.removeEventListener.bind(r,"abort",u)),r=Lr(a),c.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:E,cleanup:u}),m(this._fragmentFiber.child,!1,Kx,t,E,r)}this._eventListeners=c}};function Kx(t,n,a,r){return x(t).addEventListener(n,a,r),!1}si.prototype.removeEventListener=function(t,n,a){var r=this._eventListeners;if(r!==null&&(n=R0(r,t,n,a),n!==-1)){var u=r[n];a=u.attachedListener;var c=u.cleanup;u=Lr(u.optionsOrUseCapture),m(this._fragmentFiber.child,!1,Qx,t,a,u),r.splice(n,1),c!==null&&c()}};function Qx(t,n,a,r){return x(t).removeEventListener(n,a,r),!1}function Lr(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function A0(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function R0(t,n,a,r){if(t.length===0)return-1;r=A0(r);for(var u=0;u<t.length;u++){var c=t[u];if(c.type===n&&c.listener===a&&A0(c.optionsOrUseCapture)===r)return u}return-1}si.prototype.dispatchEvent=function(t){var n=S(this._fragmentFiber);if(n===null)return!0;n=x(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var r=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var u=0;u<a.length;u++){var c=a[u];r.addEventListener(c.type,c.attachedListener,Lr(c.optionsOrUseCapture))}if(n.appendChild(r),t=r.dispatchEvent(t),a)for(u=0;u<a.length;u++)c=a[u],r.removeEventListener(c.type,c.attachedListener,Lr(c.optionsOrUseCapture));return n.removeChild(r),t}return n.dispatchEvent(t)},si.prototype.focus=function(t){m(this._fragmentFiber.child,!0,C0,t,void 0,void 0)};function C0(t,n){return t.tag===6?!1:(t=x(t),uM(t,n))}si.prototype.focusLast=function(t){var n=[];m(this._fragmentFiber.child,!0,Zh,n,void 0,void 0);for(var a=n.length-1;0<=a&&!C0(n[a],t);a--);};function Zh(t,n){return n.push(t),!1}si.prototype.blur=function(){var t=S(this._fragmentFiber);t!==null&&(t=x(t),t=tl(t).activeElement,t!==null&&m(this._fragmentFiber.child,!1,Jx,t,void 0,void 0))};function Jx(t,n){return t.tag===6?!1:(t=x(t),t===n||t.contains(n)?(n.blur(),!0):!1)}si.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),m(this._fragmentFiber.child,!1,$x,t,void 0,void 0)};function $x(t,n){return t.tag===6||(t=x(t),n.observe(t)),!1}si.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),m(this._fragmentFiber.child,!1,tM,t,void 0,void 0);for(var a=n=0;a<Ri.length;a++){var r=Ri[a];r.fragmentInstance===this&&r.observer===t?t.unobserve(r.instance):Ri[n++]=r}Ri.length=n}};function tM(t,n){return t.tag===6||(t=x(t),n.unobserve(t)),!1}var Ri=[],Kh=!1;function eM(t,n,a){Ri.push({fragmentInstance:t,observer:n,instance:a}),Kh||(Kh=!0,cM(function(){Kh=!1;var r=Ri;Ri=[];for(var u=0;u<r.length;u++){var c=r[u];c.observer.unobserve(c.instance)}}))}si.prototype.getClientRects=function(){var t=[];return m(this._fragmentFiber.child,!1,nM,t,void 0,void 0),t};function nM(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=x(t),n.push.apply(n,t.getClientRects());return!1}si.prototype.getRootNode=function(t){var n=S(this._fragmentFiber);return n===null?this:x(n).getRootNode(t)},si.prototype.compareDocumentPosition=function(t){var n=S(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];m(this._fragmentFiber.child,!1,Zh,a,void 0,void 0);var r=x(n);if(a.length===0){if(a=r,M(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var u=r=a.compareDocumentPosition(t);return a===t?u=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=T(n)[1],a===null?u=Node.DOCUMENT_POSITION_PRECEDING:(t=x(a).compareDocumentPosition(t),u=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),u|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=x(a[0]),u=x(a[a.length-1]);var c=M(this._fragmentFiber)?n.parentElement:r;if(c==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=c.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,c=c.compareDocumentPosition(u)&Node.DOCUMENT_POSITION_CONTAINED_BY;var _=n.compareDocumentPosition(t),E=u.compareDocumentPosition(t),z=_&Node.DOCUMENT_POSITION_CONTAINED_BY||E&Node.DOCUMENT_POSITION_CONTAINED_BY;return E=r&&c&&_&Node.DOCUMENT_POSITION_FOLLOWING&&E&Node.DOCUMENT_POSITION_PRECEDING,n=r&&n===t||c&&u===t||z||E?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&n===t||!c&&u===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:_,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||iM(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function iM(t,n,a,r,u){var c=Wt(u);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!c)t:{for(;c!==null;){if(c.tag===7&&(c===n||c.alternate===n)){a=!0;break t}c=c.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(c===null)return c=u.ownerDocument,u===c||u===c.documentElement||u===c.body;t:{for(c=n,n=S(n);c!==null;){if(!(c.tag!==5&&c.tag!==3&&c.tag!==27||c!==n&&c.alternate!==n)){c=!0;break t}c=c.return}c=!1}return c}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!c)&&!(n=c===a)&&(n=I(a,c,G),n===null?n=!1:(m(n,!0,N,c,a),c=y,y=null,n=c!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!c)&&!(n=c===r)&&(n=I(r,c,G),n===null?n=!1:(m(n,!0,D,c,r),c=y,O=y=null,n=c!==null)),n):!1}function w0(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}si.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(s(566));var n=[];m(this._fragmentFiber.child,!1,Zh,n,void 0,void 0);var a=t!==!1;if(n.length===0){var r=T(this._fragmentFiber);if(r=a?r[1]||r[0]||S(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){t=x(r),w0(t,a);return}if(r=x(r),r.nodeType!==9){if(r.nodeType===11){a="host"in r?r.host:null,a!==null&&a.scrollIntoView(t);return}r.scrollIntoView(t)}}for(r=a?n.length-1:0;r!==(a?-1:n.length);){var u=n[r];u.tag===6?(u=x(u),w0(u,a)):x(u).scrollIntoView(t),r+=a?-1:1}};function aM(t,n){return t=x(t),D0(t,n),!1}function D0(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function U0(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var u=a[r];t.addEventListener(u.type,u.attachedListener,Lr(u.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){for(var _=0,E=0;E<Ri.length;E++){var z=Ri[E];(z.fragmentInstance!==n||z.observer!==c||z.instance!==t)&&(Ri[_++]=z)}Ri.length=_,c.observe(t)}),D0(t,n))}function sM(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var u=a[r];t.removeEventListener(u.type,u.attachedListener,Lr(u.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(c){typeof c.rootMargin=="string"?eM(n,c,t):c.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function Qh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Qh(a),we(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function rM(t,n,a,r){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(r){if(!t[He])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(c=t.getAttribute("rel"),c==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(c!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(c=t.getAttribute("src"),(c!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&c&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var c=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===c)return t}else return t;if(t=gi(t.nextSibling),t===null)break}return null}function oM(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=gi(t.nextSibling),t===null))return null;return t}function N0(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=gi(t.nextSibling),t===null))return null;return t}function Jh(t){return t.data==="$?"||t.data==="$~"}function $h(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function lM(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),t._reactRetry=r}}function gi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var td=null;function L0(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return gi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function O0(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function uM(t,n){function a(){r=!0}if(t.ownerDocument.activeElement===t)return!0;var r=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return r}function cM(t){y0(function(){y0(function(n){return t(n)})})}function P0(t,n,a){switch(n=tl(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function z0(t,n,a){for(var r in a){var u=a[r];a.hasOwnProperty(r)&&u!=null&&Fe(t,n,r,null,Fx,u)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Pi&&(t.onclick=null),we(t)}function ed(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);we(t)}var vi=new Map,I0=new Set;function el(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var ma=Ct.d;Ct.d={f:fM,r:hM,D:dM,C:pM,L:mM,m:_M,X:vM,S:gM,M:SM};function fM(){var t=ma.f(),n=Pu();return t||n}function hM(t){var n=Pe(t);n!==null&&n.tag===5&&n.type==="form"?F_(n):ma.r(t)}var Or=typeof document>"u"?null:document;function B0(t,n,a){var r=Or;if(r&&typeof n=="string"&&n){var u=ci(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),I0.has(u)||(I0.add(u),t={rel:t,crossOrigin:a,href:n},r.querySelector(u)===null&&(n=r.createElement("link"),Dn(n,"link",t),Je(n),r.head.appendChild(n)))}}function dM(t){ma.D(t),B0("dns-prefetch",t,null)}function pM(t,n){ma.C(t,n),B0("preconnect",t,n)}function mM(t,n,a){ma.L(t,n,a);var r=Or;if(r&&t&&n){var u='link[rel="preload"][as="'+ci(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+ci(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+ci(a.imageSizes)+'"]')):u+='[href="'+ci(t)+'"]';var c=u;switch(n){case"style":c=Pr(t);break;case"script":c=zr(t)}if(!(vi.has(c)||(t=L({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),vi.set(c,t),r.querySelector(u)!==null||n==="style"&&r.querySelector(nl(c))||n==="script"&&r.querySelector(il(c))))){var _=r.createElement("link");Dn(_,"link",t),n==="style"&&(_[Oe]=!0,_.onload=_.onerror=function(){On(_)}),Je(_),r.head.appendChild(_)}}}function _M(t,n){ma.m(t,n);var a=Or;if(a&&t){var r=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+ci(r)+'"][href="'+ci(t)+'"]',c=u;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=zr(t)}if(!vi.has(c)&&(t=L({rel:"modulepreload",href:t},n),vi.set(c,t),a.querySelector(u)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(il(c)))return}r=a.createElement("link"),Dn(r,"link",t),Je(r),a.head.appendChild(r)}}}function gM(t,n,a){ma.S(t,n,a);var r=Or;if(r&&t){var u=on(r).hoistableStyles,c=Pr(t);n=n||"default";var _=u.get(c);if(!_){var E={loading:0,preload:null};if(_=r.querySelector(nl(c)))E.loading=5;else{t=L({rel:"stylesheet",href:t,"data-precedence":n},a),(a=vi.get(c))&&nd(t,a);var z=_=r.createElement("link");Je(z),Dn(z,"link",t),z._p=new Promise(function(j,nt){z.onload=j,z.onerror=nt}),z.addEventListener("load",function(){E.loading|=1}),z.addEventListener("error",function(){E.loading|=2}),E.loading|=4,Vu(_,n,r)}_={type:"stylesheet",instance:_,count:1,state:E},u.set(c,_)}}}function vM(t,n){ma.X(t,n);var a=Or;if(a&&t){var r=on(a).hoistableScripts,u=zr(t),c=r.get(u);c||(c=a.querySelector(il(u)),c||(t=L({src:t,async:!0},n),(n=vi.get(u))&&id(t,n),c=a.createElement("script"),Je(c),Dn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},r.set(u,c))}}function SM(t,n){ma.M(t,n);var a=Or;if(a&&t){var r=on(a).hoistableScripts,u=zr(t),c=r.get(u);c||(c=a.querySelector(il(u)),c||(t=L({src:t,async:!0,type:"module"},n),(n=vi.get(u))&&id(t,n),c=a.createElement("script"),Je(c),Dn(c,"link",t),a.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},r.set(u,c))}}function F0(t,n,a,r){var u=(u=$t.current)?el(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=Pr(a.href),n=on(u).hoistableStyles,r=n.get(a),r||(r={type:"style",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Pr(a.href);var c=on(u).hoistableStyles,_=c.get(t);if(_||(u=u.ownerDocument||u,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(t,_),(c=u.querySelector(nl(t)))?c._p||(_.instance=c,_.state.loading=5):(c=vi.get(t),c||(c={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},vi.set(t,c)),yM(u,t,c,_.state))),n&&r===null)throw Error(s(528,""));return _}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=zr(a),n=on(u).hoistableScripts,r=n.get(a),r||(r={type:"script",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function Pr(t){return'href="'+ci(t)+'"'}function nl(t){return'link[rel="stylesheet"]['+t+"]"}function H0(t){return L({},t,{"data-precedence":t.precedence,precedence:null})}function yM(t,n,a,r){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[Oe]!==!0){r.loading=1;return}}else n=t.createElement("link"),n[Oe]=!0,n.onload=n.onerror=On.bind(null,n),Dn(n,"link",a),Je(n),t.head.appendChild(n);r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2})}function zr(t){return'[src="'+ci(t)+'"]'}function il(t){return"script[async]"+t}function G0(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=t.querySelector('style[data-href~="'+ci(a.href)+'"]');if(r)return n.instance=r,Je(r),r;var u=L({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(t.ownerDocument||t).createElement("style"),Je(r),Dn(r,"style",u),Vu(r,a.precedence,t),n.instance=r;case"stylesheet":u=Pr(a.href);var c=t.querySelector(nl(u));if(c)return n.state.loading|=4,n.instance=c,Je(c),c;r=H0(a),(u=vi.get(u))&&nd(r,u),c=(t.ownerDocument||t).createElement("link"),Je(c);var _=c;return _._p=new Promise(function(E,z){_.onload=E,_.onerror=z}),Dn(c,"link",r),n.state.loading|=4,Vu(c,a.precedence,t),n.instance=c;case"script":return c=zr(a.src),(u=t.querySelector(il(c)))?(n.instance=u,Je(u),u):(r=a,(u=vi.get(c))&&(r=L({},a),id(r,u)),t=t.ownerDocument||t,u=t.createElement("script"),Je(u),Dn(u,"link",r),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,Vu(r,a.precedence,t));return n.instance}function Vu(t,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=r.length?r[r.length-1]:null,c=u,_=0;_<r.length;_++){var E=r[_];if(E.dataset.precedence===n)c=E;else if(c!==u)break}c?c.parentNode.insertBefore(t,c.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function nd(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function id(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Xu=null;function V0(t,n,a){if(Xu===null){var r=new Map,u=Xu=new Map;u.set(a,r)}else u=Xu,r=u.get(a),r||(r=new Map,u.set(a,r));if(r.has(t))return r;for(r.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var c=a[u];if(!(c[He]||c[Nt]||t==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var _=c.getAttribute(n)||"";_=t+_;var E=r.get(_);E?E.push(c):r.set(_,[c])}}return r}function ad(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function xM(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function X0(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function k0(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Y0(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function q0(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=Y0(n),t.suspenseyImages.push(n)),t=TM.bind(t),n.decode().then(t,t))}function MM(t,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Pr(r.href),c=n.querySelector(nl(u));if(c){n=c._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=al.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=c,Je(c);return}c=n.ownerDocument||n,r=H0(r),(u=vi.get(u))&&nd(r,u),c=c.createElement("link"),Je(c);var _=c;_._p=new Promise(function(E,z){_.onload=E,_.onerror=z}),Dn(c,"link",r),a.instance=c}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=al.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var ku=0;function EM(t,n){return t.stylesheets&&t.count===0&&qu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var r=setTimeout(function(){if(t.stylesheets&&qu(t,t.stylesheets),t.unsuspend){var c=t.unsuspend;t.unsuspend=null,c()}},6e4+n);0<t.imgBytes&&ku===0&&(ku=62500*Gx());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&qu(t,t.stylesheets),t.unsuspend)){var c=t.unsuspend;t.unsuspend=null,c()}},(t.imgBytes>ku?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(r),clearTimeout(u)}}:null}function W0(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)qu(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function al(){this.count--,W0(this)}function TM(){this.imgCount--,W0(this)}var Yu=null;function qu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Yu=new Map,n.forEach(bM,t),Yu=null,al.call(t))}function bM(t,n){if(!(n.state.loading&4)){var a=Yu.get(t);if(a)var r=a.get(null);else{a=new Map,Yu.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<u.length;c++){var _=u[c];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(a.set(_.dataset.precedence,_),r=_)}r&&a.set(null,r)}u=n.instance,_=u.getAttribute("data-precedence"),c=a.get(_)||r,c===r&&a.set(null,u),a.set(_,u),this.count++,r=al.bind(this),u.addEventListener("load",r),u.addEventListener("error",r),c?c.parentNode.insertBefore(u,c.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Ir={$$typeof:ct,Provider:null,Consumer:null,_currentValue:qt,_currentValue2:qt,_threadCount:0};function AM(t,n,a,r,u,c,_,E,z){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=So(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=So(0),this.hiddenUpdates=So(null),this.identifierPrefix=r,this.onUncaughtError=u,this.onCaughtError=c,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.transitionTypes=null,this.incompleteTransitions=new Map}function j0(t,n,a,r,u,c,_,E,z,j,nt,dt){return t=new AM(t,n,a,_,z,j,nt,dt,E),n=1,c===!0&&(n|=24),c=qn(3,null,null,n),t.current=c,c.stateNode=t,n=Sf(),n.refCount++,t.pooledCache=n,n.refCount++,c.memoizedState={element:r,isDehydrated:a,cache:n},Ef(c),t}function Z0(t){return t?(t=ur,t):ur}function K0(t,n,a,r,u,c){u=Z0(u),r.context===null?r.context=u:r.pendingContext=u,r=Ba(n),r.payload={element:a},c=c===void 0?null:c,c!==null&&(r.callback=c),a=Fa(t,r,n),a!==null&&(Kn(a,t,n),Po(a,t,n))}function Q0(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function sd(t,n){Q0(t,n),(t=t.alternate)&&Q0(t,n)}function J0(t){if(t.tag===13||t.tag===31){var n=ys(t,67108864);n!==null&&Kn(n,t,67108864),sd(t,67108864)}}function $0(t){if(t.tag===13||t.tag===31){var n=ai();n=at(n);var a=ys(t,n);a!==null&&Kn(a,t,n),sd(t,n)}}var Br=!0;function RM(t,n,a,r){var u=gt.T;gt.T=null;var c=Ct.p;try{Ct.p=2,rd(t,n,a,r)}finally{Ct.p=c,gt.T=u}}function CM(t,n,a,r){var u=gt.T;gt.T=null;var c=Ct.p;try{Ct.p=8,rd(t,n,a,r)}finally{Ct.p=c,gt.T=u}}function rd(t,n,a,r){if(Br){var u=od(r);if(u===null)Gh(t,n,r,Wu,a),ev(t,r);else if(DM(u,t,n,a,r))r.stopPropagation();else if(ev(t,r),n&4&&-1<wM.indexOf(t)){for(;u!==null;){var c=Pe(u);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var _=Oi(c.pendingLanes);if(_!==0){var E=c;for(E.pendingLanes|=2,E.entangledLanes|=2;_;){var z=1<<31-Ln(_);E.entanglements[1]|=z,_&=~z}Yi(c),(Le&6)===0&&(Nu=X()+500,Qo(0))}}break;case 31:case 13:E=ys(c,2),E!==null&&Kn(E,c,2),Pu(),sd(c,2)}if(c=od(r),c===null&&Gh(t,n,r,Wu,a),c===u)break;u=c}u!==null&&r.stopPropagation()}else Gh(t,n,r,null,a)}}function od(t){return t=Yc(t),ld(t)}var Wu=null;function ld(t){if(Wu=null,t=Wt(t),t!==null){var n=f(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Wu=t,null}function tv(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(zt()){case Et:return 2;case Gt:return 8;case At:case vt:return 32;case Xt:return 268435456;default:return 32}default:return 32}}var ud=!1,Qa=null,Ja=null,$a=null,sl=new Map,rl=new Map,ts=[],wM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function ev(t,n){switch(t){case"focusin":case"focusout":Qa=null;break;case"dragenter":case"dragleave":Ja=null;break;case"mouseover":case"mouseout":$a=null;break;case"pointerover":case"pointerout":sl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":rl.delete(n.pointerId)}}function ol(t,n,a,r,u,c){return t===null||t.nativeEvent!==c?(t={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:c,targetContainers:[u]},n!==null&&(n=Pe(n),n!==null&&J0(n)),t):(t.eventSystemFlags|=r,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function DM(t,n,a,r,u){switch(n){case"focusin":return Qa=ol(Qa,t,n,a,r,u),!0;case"dragenter":return Ja=ol(Ja,t,n,a,r,u),!0;case"mouseover":return $a=ol($a,t,n,a,r,u),!0;case"pointerover":var c=u.pointerId;return sl.set(c,ol(sl.get(c)||null,t,n,a,r,u)),!0;case"gotpointercapture":return c=u.pointerId,rl.set(c,ol(rl.get(c)||null,t,n,a,r,u)),!0}return!1}function nv(t){var n=Wt(t.target);if(n!==null){var a=f(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,Rt(t.priority,function(){$0(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,Rt(t.priority,function(){$0(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ju(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=od(t.nativeEvent);if(a===null){a=t.nativeEvent;var r=new a.constructor(a.type,a);kc=r,a.target.dispatchEvent(r),kc=null}else return n=Pe(a),n!==null&&J0(n),t.blockedOn=a,!1;n.shift()}return!0}function iv(t,n,a){ju(t)&&a.delete(n)}function UM(){ud=!1,Qa!==null&&ju(Qa)&&(Qa=null),Ja!==null&&ju(Ja)&&(Ja=null),$a!==null&&ju($a)&&($a=null),sl.forEach(iv),rl.forEach(iv)}function Zu(t,n){t.blockedOn===n&&(t.blockedOn=null,ud||(ud=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,UM)))}var Ku=null;function av(t){Ku!==t&&(Ku=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){Ku===t&&(Ku=null);for(var n=0;n<t.length;n+=3){var a=t[n],r=t[n+1],u=t[n+2];if(typeof r!="function"){if(ld(r||a)===null)continue;break}var c=Pe(a);c!==null&&(t.splice(n,3),n-=3,kf(c,{pending:!0,data:u,method:a.method,action:r},r,u))}}))}function Fr(t){function n(z){return Zu(z,t)}Qa!==null&&Zu(Qa,t),Ja!==null&&Zu(Ja,t),$a!==null&&Zu($a,t),sl.forEach(n),rl.forEach(n);for(var a=0;a<ts.length;a++){var r=ts[a];r.blockedOn===t&&(r.blockedOn=null)}for(;0<ts.length&&(a=ts[0],a.blockedOn===null);)nv(a),a.blockedOn===null&&ts.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var u=a[r],c=a[r+1],_=u[Dt]||null;if(typeof c=="function")_||av(a);else if(_){var E=null;if(c&&c.hasAttribute("formAction")){if(u=c,_=c[Dt]||null)E=_.formAction;else if(ld(u)!==null)continue}else E=_.action;typeof E=="function"?a[r+1]=E:(a.splice(r,3),r-=3),av(a)}}}function sv(){function t(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(_){return u=_})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function cd(t){this._internalRoot=t}Qu.prototype.render=cd.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ai();K0(a,r,t,n,null,null)},Qu.prototype.unmount=cd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;K0(t.current,2,null,t,null,null),Pu(),n[te]=null}};function Qu(t){this._internalRoot=t}Qu.prototype.unstable_scheduleHydration=function(t){if(t){var n=Q();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ts.length&&n!==0&&n<ts[a].priority;a++);ts.splice(a,0,t),a===0&&nv(t)}};var rv=e.version;if(rv!=="19.3.0")throw Error(s(527,rv,"19.3.0"));Ct.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=g(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var NM={bundleType:0,version:"19.3.0",rendererPackageName:"react-dom",currentDispatcherRef:gt,reconcilerVersion:"19.3.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ju=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ju.isDisabled&&Ju.supportsFiber)try{Re=Ju.inject(NM),Qe=Ju}catch{}}return ul.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,r="",u=Z_,c=K_,_=Q_;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(_=n.onRecoverableError)),n=j0(t,1,!1,null,null,a,r,null,u,c,_,sv),t[te]=n.current,Hh(t),new cd(n)},ul.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var r=!1,u="",c=Z_,_=K_,E=Q_,z=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(c=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(E=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=j0(t,1,!0,n,a??null,r,u,z,c,_,E,sv),n.context=Z0(null),a=n.current,r=ai(),r=at(r),u=Ba(r),u.callback=null,Fa(a,u,r),a=r,n.current.lanes=a,gs(n,a),Yi(n),t[te]=n.current,Hh(t),new Qu(n)},ul.version="19.3.0",ul}var _v;function VM(){if(_v)return dd.exports;_v=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),dd.exports=GM(),dd.exports}var XM=VM();const Ip="178",ao={ROTATE:0,DOLLY:1,PAN:2},no={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},kM=0,gv=1,YM=2,xS=1,MS=2,Ma=3,ds=0,kn=1,Ta=2,fs=0,so=1,vv=2,Sv=3,yv=4,qM=5,Ys=100,WM=101,jM=102,ZM=103,KM=104,QM=200,JM=201,$M=202,tE=203,Zd=204,Kd=205,eE=206,nE=207,iE=208,aE=209,sE=210,rE=211,oE=212,lE=213,uE=214,Qd=0,Jd=1,$d=2,lo=3,tp=4,ep=5,np=6,ip=7,Bp=0,cE=1,fE=2,hs=0,hE=1,dE=2,pE=3,ES=4,mE=5,_E=6,gE=7,TS=300,uo=301,co=302,ap=303,sp=304,zc=306,rp=1e3,Ws=1001,op=1002,ui=1003,vE=1004,$u=1005,Wi=1006,gd=1007,js=1008,Ki=1009,bS=1010,AS=1011,yl=1012,Fp=1013,Zs=1014,ji=1015,Al=1016,Hp=1017,Gp=1018,xl=1020,RS=35902,CS=1021,wS=1022,Ni=1023,Ml=1026,El=1027,Vp=1028,Xp=1029,DS=1030,kp=1031,Yp=1033,Rc=33776,Cc=33777,wc=33778,Dc=33779,lp=35840,up=35841,cp=35842,fp=35843,hp=36196,dp=37492,pp=37496,mp=37808,_p=37809,gp=37810,vp=37811,Sp=37812,yp=37813,xp=37814,Mp=37815,Ep=37816,Tp=37817,bp=37818,Ap=37819,Rp=37820,Cp=37821,Uc=36492,wp=36494,Dp=36495,US=36283,Up=36284,Np=36285,Lp=36286,SE=3200,yE=3201,NS=0,xE=1,us="",yi="srgb",fo="srgb-linear",Lc="linear",Ve="srgb",Hr=7680,xv=519,ME=512,EE=513,TE=514,LS=515,bE=516,AE=517,RE=518,CE=519,Mv=35044,Ev="300 es",ba=2e3,Oc=2001;class Js{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const f=l.indexOf(i);f!==-1&&l.splice(f,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let f=0,h=l.length;f<h;f++)l[f].call(this,e);e.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tv=1234567;const vl=Math.PI/180,Tl=180/Math.PI;function po(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(zn[o&255]+zn[o>>8&255]+zn[o>>16&255]+zn[o>>24&255]+"-"+zn[e&255]+zn[e>>8&255]+"-"+zn[e>>16&15|64]+zn[e>>24&255]+"-"+zn[i&63|128]+zn[i>>8&255]+"-"+zn[i>>16&255]+zn[i>>24&255]+zn[s&255]+zn[s>>8&255]+zn[s>>16&255]+zn[s>>24&255]).toLowerCase()}function Me(o,e,i){return Math.max(e,Math.min(i,o))}function qp(o,e){return(o%e+e)%e}function wE(o,e,i,s,l){return s+(o-e)*(l-s)/(i-e)}function DE(o,e,i){return o!==e?(i-o)/(e-o):0}function Sl(o,e,i){return(1-i)*o+i*e}function UE(o,e,i,s){return Sl(o,e,1-Math.exp(-i*s))}function NE(o,e=1){return e-Math.abs(qp(o,e*2)-e)}function LE(o,e,i){return o<=e?0:o>=i?1:(o=(o-e)/(i-e),o*o*(3-2*o))}function OE(o,e,i){return o<=e?0:o>=i?1:(o=(o-e)/(i-e),o*o*o*(o*(o*6-15)+10))}function PE(o,e){return o+Math.floor(Math.random()*(e-o+1))}function zE(o,e){return o+Math.random()*(e-o)}function IE(o){return o*(.5-Math.random())}function BE(o){o!==void 0&&(Tv=o);let e=Tv+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function FE(o){return o*vl}function HE(o){return o*Tl}function GE(o){return(o&o-1)===0&&o!==0}function VE(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function XE(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function kE(o,e,i,s,l){const f=Math.cos,h=Math.sin,d=f(i/2),p=h(i/2),g=f((e+s)/2),v=h((e+s)/2),m=f((e-s)/2),S=h((e-s)/2),M=f((s-e)/2),T=h((s-e)/2);switch(l){case"XYX":o.set(d*v,p*m,p*S,d*g);break;case"YZY":o.set(p*S,d*v,p*m,d*g);break;case"ZXZ":o.set(p*m,p*S,d*v,d*g);break;case"XZX":o.set(d*v,p*T,p*M,d*g);break;case"YXY":o.set(p*M,d*v,p*T,d*g);break;case"ZYZ":o.set(p*T,p*M,d*v,d*g);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function eo(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Vn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const Wp={DEG2RAD:vl,RAD2DEG:Tl,generateUUID:po,clamp:Me,euclideanModulo:qp,mapLinear:wE,inverseLerp:DE,lerp:Sl,damp:UE,pingpong:NE,smoothstep:LE,smootherstep:OE,randInt:PE,randFloat:zE,randFloatSpread:IE,seededRandom:BE,degToRad:FE,radToDeg:HE,isPowerOfTwo:GE,ceilPowerOfTwo:VE,floorPowerOfTwo:XE,setQuaternionFromProperEuler:kE,normalize:Vn,denormalize:eo};class me{constructor(e=0,i=0){me.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Me(this.x,e.x,i.x),this.y=Me(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Me(this.x,e,i),this.y=Me(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Me(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Me(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),f=this.x-e.x,h=this.y-e.y;return this.x=f*s-h*l+e.x,this.y=f*l+h*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ks{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,f,h,d){let p=s[l+0],g=s[l+1],v=s[l+2],m=s[l+3];const S=f[h+0],M=f[h+1],T=f[h+2],A=f[h+3];if(d===0){e[i+0]=p,e[i+1]=g,e[i+2]=v,e[i+3]=m;return}if(d===1){e[i+0]=S,e[i+1]=M,e[i+2]=T,e[i+3]=A;return}if(m!==A||p!==S||g!==M||v!==T){let x=1-d;const y=p*S+g*M+v*T+m*A,O=y>=0?1:-1,N=1-y*y;if(N>Number.EPSILON){const G=Math.sqrt(N),I=Math.atan2(G,y*O);x=Math.sin(x*I)/G,d=Math.sin(d*I)/G}const D=d*O;if(p=p*x+S*D,g=g*x+M*D,v=v*x+T*D,m=m*x+A*D,x===1-d){const G=1/Math.sqrt(p*p+g*g+v*v+m*m);p*=G,g*=G,v*=G,m*=G}}e[i]=p,e[i+1]=g,e[i+2]=v,e[i+3]=m}static multiplyQuaternionsFlat(e,i,s,l,f,h){const d=s[l],p=s[l+1],g=s[l+2],v=s[l+3],m=f[h],S=f[h+1],M=f[h+2],T=f[h+3];return e[i]=d*T+v*m+p*M-g*S,e[i+1]=p*T+v*S+g*m-d*M,e[i+2]=g*T+v*M+d*S-p*m,e[i+3]=v*T-d*m-p*S-g*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,f=e._z,h=e._order,d=Math.cos,p=Math.sin,g=d(s/2),v=d(l/2),m=d(f/2),S=p(s/2),M=p(l/2),T=p(f/2);switch(h){case"XYZ":this._x=S*v*m+g*M*T,this._y=g*M*m-S*v*T,this._z=g*v*T+S*M*m,this._w=g*v*m-S*M*T;break;case"YXZ":this._x=S*v*m+g*M*T,this._y=g*M*m-S*v*T,this._z=g*v*T-S*M*m,this._w=g*v*m+S*M*T;break;case"ZXY":this._x=S*v*m-g*M*T,this._y=g*M*m+S*v*T,this._z=g*v*T+S*M*m,this._w=g*v*m-S*M*T;break;case"ZYX":this._x=S*v*m-g*M*T,this._y=g*M*m+S*v*T,this._z=g*v*T-S*M*m,this._w=g*v*m+S*M*T;break;case"YZX":this._x=S*v*m+g*M*T,this._y=g*M*m+S*v*T,this._z=g*v*T-S*M*m,this._w=g*v*m-S*M*T;break;case"XZY":this._x=S*v*m-g*M*T,this._y=g*M*m-S*v*T,this._z=g*v*T+S*M*m,this._w=g*v*m+S*M*T;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],f=i[8],h=i[1],d=i[5],p=i[9],g=i[2],v=i[6],m=i[10],S=s+d+m;if(S>0){const M=.5/Math.sqrt(S+1);this._w=.25/M,this._x=(v-p)*M,this._y=(f-g)*M,this._z=(h-l)*M}else if(s>d&&s>m){const M=2*Math.sqrt(1+s-d-m);this._w=(v-p)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(f+g)/M}else if(d>m){const M=2*Math.sqrt(1+d-s-m);this._w=(f-g)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(p+v)/M}else{const M=2*Math.sqrt(1+m-s-d);this._w=(h-l)/M,this._x=(f+g)/M,this._y=(p+v)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Me(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,f=e._z,h=e._w,d=i._x,p=i._y,g=i._z,v=i._w;return this._x=s*v+h*d+l*g-f*p,this._y=l*v+h*p+f*d-s*g,this._z=f*v+h*g+s*p-l*d,this._w=h*v-s*d-l*p-f*g,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const s=this._x,l=this._y,f=this._z,h=this._w;let d=h*e._w+s*e._x+l*e._y+f*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=h,this._x=s,this._y=l,this._z=f,this;const p=1-d*d;if(p<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*s+i*this._x,this._y=M*l+i*this._y,this._z=M*f+i*this._z,this.normalize(),this}const g=Math.sqrt(p),v=Math.atan2(g,d),m=Math.sin((1-i)*v)/g,S=Math.sin(i*v)/g;return this._w=h*m+this._w*S,this._x=s*m+this._x*S,this._y=l*m+this._y*S,this._z=f*m+this._z*S,this._onChangeCallback(),this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),f=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),f*Math.sin(i),f*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class tt{constructor(e=0,i=0,s=0){tt.prototype.isVector3=!0,this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(bv.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(bv.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,f=e.elements;return this.x=f[0]*i+f[3]*s+f[6]*l,this.y=f[1]*i+f[4]*s+f[7]*l,this.z=f[2]*i+f[5]*s+f[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,f=e.elements,h=1/(f[3]*i+f[7]*s+f[11]*l+f[15]);return this.x=(f[0]*i+f[4]*s+f[8]*l+f[12])*h,this.y=(f[1]*i+f[5]*s+f[9]*l+f[13])*h,this.z=(f[2]*i+f[6]*s+f[10]*l+f[14])*h,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,f=e.x,h=e.y,d=e.z,p=e.w,g=2*(h*l-d*s),v=2*(d*i-f*l),m=2*(f*s-h*i);return this.x=i+p*g+h*m-d*v,this.y=s+p*v+d*g-f*m,this.z=l+p*m+f*v-h*g,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l,this.y=f[1]*i+f[5]*s+f[9]*l,this.z=f[2]*i+f[6]*s+f[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Me(this.x,e.x,i.x),this.y=Me(this.y,e.y,i.y),this.z=Me(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Me(this.x,e,i),this.y=Me(this.y,e,i),this.z=Me(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Me(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,f=e.z,h=i.x,d=i.y,p=i.z;return this.x=l*p-f*d,this.y=f*h-s*p,this.z=s*d-l*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return vd.copy(this).projectOnVector(e),this.sub(vd)}reflect(e){return this.sub(vd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Me(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vd=new tt,bv=new Ks;class ge{constructor(e,i,s,l,f,h,d,p,g){ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,f,h,d,p,g)}set(e,i,s,l,f,h,d,p,g){const v=this.elements;return v[0]=e,v[1]=l,v[2]=d,v[3]=i,v[4]=f,v[5]=p,v[6]=s,v[7]=h,v[8]=g,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,f=this.elements,h=s[0],d=s[3],p=s[6],g=s[1],v=s[4],m=s[7],S=s[2],M=s[5],T=s[8],A=l[0],x=l[3],y=l[6],O=l[1],N=l[4],D=l[7],G=l[2],I=l[5],L=l[8];return f[0]=h*A+d*O+p*G,f[3]=h*x+d*N+p*I,f[6]=h*y+d*D+p*L,f[1]=g*A+v*O+m*G,f[4]=g*x+v*N+m*I,f[7]=g*y+v*D+m*L,f[2]=S*A+M*O+T*G,f[5]=S*x+M*N+T*I,f[8]=S*y+M*D+T*L,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],h=e[4],d=e[5],p=e[6],g=e[7],v=e[8];return i*h*v-i*d*g-s*f*v+s*d*p+l*f*g-l*h*p}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],h=e[4],d=e[5],p=e[6],g=e[7],v=e[8],m=v*h-d*g,S=d*p-v*f,M=g*f-h*p,T=i*m+s*S+l*M;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=m*A,e[1]=(l*g-v*s)*A,e[2]=(d*s-l*h)*A,e[3]=S*A,e[4]=(v*i-l*p)*A,e[5]=(l*f-d*i)*A,e[6]=M*A,e[7]=(s*p-g*i)*A,e[8]=(h*i-s*f)*A,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,f,h,d){const p=Math.cos(f),g=Math.sin(f);return this.set(s*p,s*g,-s*(p*h+g*d)+h+e,-l*g,l*p,-l*(-g*h+p*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(Sd.makeScale(e,i)),this}rotate(e){return this.premultiply(Sd.makeRotation(-e)),this}translate(e,i){return this.premultiply(Sd.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Sd=new ge;function OS(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Pc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function YE(){const o=Pc("canvas");return o.style.display="block",o}const Av={};function ro(o){o in Av||(Av[o]=!0,console.warn(o))}function qE(o,e,i){return new Promise(function(s,l){function f(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(f,i);break;default:s()}}setTimeout(f,i)})}function WE(o){const e=o.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function jE(o){const e=o.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Rv=new ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cv=new ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ZE(){const o={enabled:!0,workingColorSpace:fo,spaces:{},convert:function(l,f,h){return this.enabled===!1||f===h||!f||!h||(this.spaces[f].transfer===Ve&&(l.r=Aa(l.r),l.g=Aa(l.g),l.b=Aa(l.b)),this.spaces[f].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[f].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Ve&&(l.r=oo(l.r),l.g=oo(l.g),l.b=oo(l.b))),l},workingToColorSpace:function(l,f){return this.convert(l,this.workingColorSpace,f)},colorSpaceToWorking:function(l,f){return this.convert(l,f,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===us?Lc:this.spaces[l].transfer},getLuminanceCoefficients:function(l,f=this.workingColorSpace){return l.fromArray(this.spaces[f].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,f,h){return l.copy(this.spaces[f].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,f){return ro("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(l,f)},toWorkingColorSpace:function(l,f){return ro("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(l,f)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[fo]:{primaries:e,whitePoint:s,transfer:Lc,toXYZ:Rv,fromXYZ:Cv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:yi},outputColorSpaceConfig:{drawingBufferColorSpace:yi}},[yi]:{primaries:e,whitePoint:s,transfer:Ve,toXYZ:Rv,fromXYZ:Cv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:yi}}}),o}const Ue=ZE();function Aa(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function oo(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Gr;class KE{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{Gr===void 0&&(Gr=Pc("canvas")),Gr.width=e.width,Gr.height=e.height;const l=Gr.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=Gr}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Pc("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),f=l.data;for(let h=0;h<f.length;h++)f[h]=Aa(f[h]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Aa(i[s]/255)*255):i[s]=Aa(i[s]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let QE=0;class jp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:QE++}),this.uuid=po(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let f;if(Array.isArray(l)){f=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?f.push(yd(l[h].image)):f.push(yd(l[h]))}else f=yd(l);s.url=f}return i||(e.images[this.uuid]=s),s}}function yd(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?KE.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let JE=0;const xd=new tt;class Yn extends Js{constructor(e=Yn.DEFAULT_IMAGE,i=Yn.DEFAULT_MAPPING,s=Ws,l=Ws,f=Wi,h=js,d=Ni,p=Ki,g=Yn.DEFAULT_ANISOTROPY,v=us){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:JE++}),this.uuid=po(),this.name="",this.source=new jp(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=f,this.minFilter=h,this.anisotropy=g,this.format=d,this.internalFormat=null,this.type=p,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(xd).x}get height(){return this.source.getSize(xd).y}get depth(){return this.source.getSize(xd).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){console.warn(`THREE.Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==TS)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case rp:e.x=e.x-Math.floor(e.x);break;case Ws:e.x=e.x<0?0:1;break;case op:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case rp:e.y=e.y-Math.floor(e.y);break;case Ws:e.y=e.y<0?0:1;break;case op:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yn.DEFAULT_IMAGE=null;Yn.DEFAULT_MAPPING=TS;Yn.DEFAULT_ANISOTROPY=1;class sn{constructor(e=0,i=0,s=0,l=1){sn.prototype.isVector4=!0,this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,f=this.w,h=e.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*f,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*f,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*f,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*f,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,f;const p=e.elements,g=p[0],v=p[4],m=p[8],S=p[1],M=p[5],T=p[9],A=p[2],x=p[6],y=p[10];if(Math.abs(v-S)<.01&&Math.abs(m-A)<.01&&Math.abs(T-x)<.01){if(Math.abs(v+S)<.1&&Math.abs(m+A)<.1&&Math.abs(T+x)<.1&&Math.abs(g+M+y-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const N=(g+1)/2,D=(M+1)/2,G=(y+1)/2,I=(v+S)/4,L=(m+A)/4,F=(T+x)/4;return N>D&&N>G?N<.01?(s=0,l=.707106781,f=.707106781):(s=Math.sqrt(N),l=I/s,f=L/s):D>G?D<.01?(s=.707106781,l=0,f=.707106781):(l=Math.sqrt(D),s=I/l,f=F/l):G<.01?(s=.707106781,l=.707106781,f=0):(f=Math.sqrt(G),s=L/f,l=F/f),this.set(s,l,f,i),this}let O=Math.sqrt((x-T)*(x-T)+(m-A)*(m-A)+(S-v)*(S-v));return Math.abs(O)<.001&&(O=1),this.x=(x-T)/O,this.y=(m-A)/O,this.z=(S-v)/O,this.w=Math.acos((g+M+y-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Me(this.x,e.x,i.x),this.y=Me(this.y,e.y,i.y),this.z=Me(this.z,e.z,i.z),this.w=Me(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Me(this.x,e,i),this.y=Me(this.y,e,i),this.z=Me(this.z,e,i),this.w=Me(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Me(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $E extends Js{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new sn(0,0,e,i),this.scissorTest=!1,this.viewport=new sn(0,0,e,i);const l={width:e,height:i,depth:s.depth},f=new Yn(l);this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=f.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:Wi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,f=this.textures.length;l<f;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isArrayTexture=this.textures[l].image.depth>1;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new jp(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qs extends $E{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class PS extends Yn{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=ui,this.minFilter=ui,this.wrapR=Ws,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tT extends Yn{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=ui,this.minFilter=ui,this.wrapR=Ws,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $s{constructor(e=new tt(1/0,1/0,1/0),i=new tt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Ci.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Ci.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Ci.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const f=s.getAttribute("position");if(i===!0&&f!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=f.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Ci):Ci.fromBufferAttribute(f,h),Ci.applyMatrix4(e.matrixWorld),this.expandByPoint(Ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),tc.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),tc.copy(s.boundingBox)),tc.applyMatrix4(e.matrixWorld),this.union(tc)}const l=e.children;for(let f=0,h=l.length;f<h;f++)this.expandByObject(l[f],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ci),Ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cl),ec.subVectors(this.max,cl),Vr.subVectors(e.a,cl),Xr.subVectors(e.b,cl),kr.subVectors(e.c,cl),ns.subVectors(Xr,Vr),is.subVectors(kr,Xr),Bs.subVectors(Vr,kr);let i=[0,-ns.z,ns.y,0,-is.z,is.y,0,-Bs.z,Bs.y,ns.z,0,-ns.x,is.z,0,-is.x,Bs.z,0,-Bs.x,-ns.y,ns.x,0,-is.y,is.x,0,-Bs.y,Bs.x,0];return!Md(i,Vr,Xr,kr,ec)||(i=[1,0,0,0,1,0,0,0,1],!Md(i,Vr,Xr,kr,ec))?!1:(nc.crossVectors(ns,is),i=[nc.x,nc.y,nc.z],Md(i,Vr,Xr,kr,ec))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_a),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _a=[new tt,new tt,new tt,new tt,new tt,new tt,new tt,new tt],Ci=new tt,tc=new $s,Vr=new tt,Xr=new tt,kr=new tt,ns=new tt,is=new tt,Bs=new tt,cl=new tt,ec=new tt,nc=new tt,Fs=new tt;function Md(o,e,i,s,l){for(let f=0,h=o.length-3;f<=h;f+=3){Fs.fromArray(o,f);const d=l.x*Math.abs(Fs.x)+l.y*Math.abs(Fs.y)+l.z*Math.abs(Fs.z),p=e.dot(Fs),g=i.dot(Fs),v=s.dot(Fs);if(Math.max(-Math.max(p,g,v),Math.min(p,g,v))>d)return!1}return!0}const eT=new $s,fl=new tt,Ed=new tt;class Rl{constructor(e=new tt,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):eT.setFromPoints(e).getCenter(s);let l=0;for(let f=0,h=e.length;f<h;f++)l=Math.max(l,s.distanceToSquared(e[f]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fl.subVectors(e,this.center);const i=fl.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(fl,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ed.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fl.copy(e.center).add(Ed)),this.expandByPoint(fl.copy(e.center).sub(Ed))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ga=new tt,Td=new tt,ic=new tt,as=new tt,bd=new tt,ac=new tt,Ad=new tt;class zS{constructor(e=new tt,i=new tt(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ga)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=ga.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(ga.copy(this.origin).addScaledVector(this.direction,i),ga.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){Td.copy(e).add(i).multiplyScalar(.5),ic.copy(i).sub(e).normalize(),as.copy(this.origin).sub(Td);const f=e.distanceTo(i)*.5,h=-this.direction.dot(ic),d=as.dot(this.direction),p=-as.dot(ic),g=as.lengthSq(),v=Math.abs(1-h*h);let m,S,M,T;if(v>0)if(m=h*p-d,S=h*d-p,T=f*v,m>=0)if(S>=-T)if(S<=T){const A=1/v;m*=A,S*=A,M=m*(m+h*S+2*d)+S*(h*m+S+2*p)+g}else S=f,m=Math.max(0,-(h*S+d)),M=-m*m+S*(S+2*p)+g;else S=-f,m=Math.max(0,-(h*S+d)),M=-m*m+S*(S+2*p)+g;else S<=-T?(m=Math.max(0,-(-h*f+d)),S=m>0?-f:Math.min(Math.max(-f,-p),f),M=-m*m+S*(S+2*p)+g):S<=T?(m=0,S=Math.min(Math.max(-f,-p),f),M=S*(S+2*p)+g):(m=Math.max(0,-(h*f+d)),S=m>0?f:Math.min(Math.max(-f,-p),f),M=-m*m+S*(S+2*p)+g);else S=h>0?-f:f,m=Math.max(0,-(h*S+d)),M=-m*m+S*(S+2*p)+g;return s&&s.copy(this.origin).addScaledVector(this.direction,m),l&&l.copy(Td).addScaledVector(ic,S),M}intersectSphere(e,i){ga.subVectors(e.center,this.origin);const s=ga.dot(this.direction),l=ga.dot(ga)-s*s,f=e.radius*e.radius;if(l>f)return null;const h=Math.sqrt(f-l),d=s-h,p=s+h;return p<0?null:d<0?this.at(p,i):this.at(d,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,f,h,d,p;const g=1/this.direction.x,v=1/this.direction.y,m=1/this.direction.z,S=this.origin;return g>=0?(s=(e.min.x-S.x)*g,l=(e.max.x-S.x)*g):(s=(e.max.x-S.x)*g,l=(e.min.x-S.x)*g),v>=0?(f=(e.min.y-S.y)*v,h=(e.max.y-S.y)*v):(f=(e.max.y-S.y)*v,h=(e.min.y-S.y)*v),s>h||f>l||((f>s||isNaN(s))&&(s=f),(h<l||isNaN(l))&&(l=h),m>=0?(d=(e.min.z-S.z)*m,p=(e.max.z-S.z)*m):(d=(e.max.z-S.z)*m,p=(e.min.z-S.z)*m),s>p||d>l)||((d>s||s!==s)&&(s=d),(p<l||l!==l)&&(l=p),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,ga)!==null}intersectTriangle(e,i,s,l,f){bd.subVectors(i,e),ac.subVectors(s,e),Ad.crossVectors(bd,ac);let h=this.direction.dot(Ad),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;as.subVectors(this.origin,e);const p=d*this.direction.dot(ac.crossVectors(as,ac));if(p<0)return null;const g=d*this.direction.dot(bd.cross(as));if(g<0||p+g>h)return null;const v=-d*as.dot(Ad);return v<0?null:this.at(v/h,f)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ke{constructor(e,i,s,l,f,h,d,p,g,v,m,S,M,T,A,x){Ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,f,h,d,p,g,v,m,S,M,T,A,x)}set(e,i,s,l,f,h,d,p,g,v,m,S,M,T,A,x){const y=this.elements;return y[0]=e,y[4]=i,y[8]=s,y[12]=l,y[1]=f,y[5]=h,y[9]=d,y[13]=p,y[2]=g,y[6]=v,y[10]=m,y[14]=S,y[3]=M,y[7]=T,y[11]=A,y[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ke().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,s=e.elements,l=1/Yr.setFromMatrixColumn(e,0).length(),f=1/Yr.setFromMatrixColumn(e,1).length(),h=1/Yr.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*f,i[5]=s[5]*f,i[6]=s[6]*f,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,f=e.z,h=Math.cos(s),d=Math.sin(s),p=Math.cos(l),g=Math.sin(l),v=Math.cos(f),m=Math.sin(f);if(e.order==="XYZ"){const S=h*v,M=h*m,T=d*v,A=d*m;i[0]=p*v,i[4]=-p*m,i[8]=g,i[1]=M+T*g,i[5]=S-A*g,i[9]=-d*p,i[2]=A-S*g,i[6]=T+M*g,i[10]=h*p}else if(e.order==="YXZ"){const S=p*v,M=p*m,T=g*v,A=g*m;i[0]=S+A*d,i[4]=T*d-M,i[8]=h*g,i[1]=h*m,i[5]=h*v,i[9]=-d,i[2]=M*d-T,i[6]=A+S*d,i[10]=h*p}else if(e.order==="ZXY"){const S=p*v,M=p*m,T=g*v,A=g*m;i[0]=S-A*d,i[4]=-h*m,i[8]=T+M*d,i[1]=M+T*d,i[5]=h*v,i[9]=A-S*d,i[2]=-h*g,i[6]=d,i[10]=h*p}else if(e.order==="ZYX"){const S=h*v,M=h*m,T=d*v,A=d*m;i[0]=p*v,i[4]=T*g-M,i[8]=S*g+A,i[1]=p*m,i[5]=A*g+S,i[9]=M*g-T,i[2]=-g,i[6]=d*p,i[10]=h*p}else if(e.order==="YZX"){const S=h*p,M=h*g,T=d*p,A=d*g;i[0]=p*v,i[4]=A-S*m,i[8]=T*m+M,i[1]=m,i[5]=h*v,i[9]=-d*v,i[2]=-g*v,i[6]=M*m+T,i[10]=S-A*m}else if(e.order==="XZY"){const S=h*p,M=h*g,T=d*p,A=d*g;i[0]=p*v,i[4]=-m,i[8]=g*v,i[1]=S*m+A,i[5]=h*v,i[9]=M*m-T,i[2]=T*m-M,i[6]=d*v,i[10]=A*m+S}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nT,e,iT)}lookAt(e,i,s){const l=this.elements;return ri.subVectors(e,i),ri.lengthSq()===0&&(ri.z=1),ri.normalize(),ss.crossVectors(s,ri),ss.lengthSq()===0&&(Math.abs(s.z)===1?ri.x+=1e-4:ri.z+=1e-4,ri.normalize(),ss.crossVectors(s,ri)),ss.normalize(),sc.crossVectors(ri,ss),l[0]=ss.x,l[4]=sc.x,l[8]=ri.x,l[1]=ss.y,l[5]=sc.y,l[9]=ri.y,l[2]=ss.z,l[6]=sc.z,l[10]=ri.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,f=this.elements,h=s[0],d=s[4],p=s[8],g=s[12],v=s[1],m=s[5],S=s[9],M=s[13],T=s[2],A=s[6],x=s[10],y=s[14],O=s[3],N=s[7],D=s[11],G=s[15],I=l[0],L=l[4],F=l[8],U=l[12],C=l[1],H=l[5],ot=l[9],st=l[13],mt=l[2],ct=l[6],Y=l[10],it=l[14],W=l[3],xt=l[7],yt=l[11],Ft=l[15];return f[0]=h*I+d*C+p*mt+g*W,f[4]=h*L+d*H+p*ct+g*xt,f[8]=h*F+d*ot+p*Y+g*yt,f[12]=h*U+d*st+p*it+g*Ft,f[1]=v*I+m*C+S*mt+M*W,f[5]=v*L+m*H+S*ct+M*xt,f[9]=v*F+m*ot+S*Y+M*yt,f[13]=v*U+m*st+S*it+M*Ft,f[2]=T*I+A*C+x*mt+y*W,f[6]=T*L+A*H+x*ct+y*xt,f[10]=T*F+A*ot+x*Y+y*yt,f[14]=T*U+A*st+x*it+y*Ft,f[3]=O*I+N*C+D*mt+G*W,f[7]=O*L+N*H+D*ct+G*xt,f[11]=O*F+N*ot+D*Y+G*yt,f[15]=O*U+N*st+D*it+G*Ft,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],f=e[12],h=e[1],d=e[5],p=e[9],g=e[13],v=e[2],m=e[6],S=e[10],M=e[14],T=e[3],A=e[7],x=e[11],y=e[15];return T*(+f*p*m-l*g*m-f*d*S+s*g*S+l*d*M-s*p*M)+A*(+i*p*M-i*g*S+f*h*S-l*h*M+l*g*v-f*p*v)+x*(+i*g*m-i*d*M-f*h*m+s*h*M+f*d*v-s*g*v)+y*(-l*d*v-i*p*m+i*d*S+l*h*m-s*h*S+s*p*v)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],h=e[4],d=e[5],p=e[6],g=e[7],v=e[8],m=e[9],S=e[10],M=e[11],T=e[12],A=e[13],x=e[14],y=e[15],O=m*x*g-A*S*g+A*p*M-d*x*M-m*p*y+d*S*y,N=T*S*g-v*x*g-T*p*M+h*x*M+v*p*y-h*S*y,D=v*A*g-T*m*g+T*d*M-h*A*M-v*d*y+h*m*y,G=T*m*p-v*A*p-T*d*S+h*A*S+v*d*x-h*m*x,I=i*O+s*N+l*D+f*G;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/I;return e[0]=O*L,e[1]=(A*S*f-m*x*f-A*l*M+s*x*M+m*l*y-s*S*y)*L,e[2]=(d*x*f-A*p*f+A*l*g-s*x*g-d*l*y+s*p*y)*L,e[3]=(m*p*f-d*S*f-m*l*g+s*S*g+d*l*M-s*p*M)*L,e[4]=N*L,e[5]=(v*x*f-T*S*f+T*l*M-i*x*M-v*l*y+i*S*y)*L,e[6]=(T*p*f-h*x*f-T*l*g+i*x*g+h*l*y-i*p*y)*L,e[7]=(h*S*f-v*p*f+v*l*g-i*S*g-h*l*M+i*p*M)*L,e[8]=D*L,e[9]=(T*m*f-v*A*f-T*s*M+i*A*M+v*s*y-i*m*y)*L,e[10]=(h*A*f-T*d*f+T*s*g-i*A*g-h*s*y+i*d*y)*L,e[11]=(v*d*f-h*m*f-v*s*g+i*m*g+h*s*M-i*d*M)*L,e[12]=G*L,e[13]=(v*A*l-T*m*l+T*s*S-i*A*S-v*s*x+i*m*x)*L,e[14]=(T*d*l-h*A*l-T*s*p+i*A*p+h*s*x-i*d*x)*L,e[15]=(h*m*l-v*d*l+v*s*p-i*m*p-h*s*S+i*d*S)*L,this}scale(e){const i=this.elements,s=e.x,l=e.y,f=e.z;return i[0]*=s,i[4]*=l,i[8]*=f,i[1]*=s,i[5]*=l,i[9]*=f,i[2]*=s,i[6]*=l,i[10]*=f,i[3]*=s,i[7]*=l,i[11]*=f,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),f=1-s,h=e.x,d=e.y,p=e.z,g=f*h,v=f*d;return this.set(g*h+s,g*d-l*p,g*p+l*d,0,g*d+l*p,v*d+s,v*p-l*h,0,g*p-l*d,v*p+l*h,f*p*p+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,f,h){return this.set(1,s,f,0,e,1,h,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,f=i._x,h=i._y,d=i._z,p=i._w,g=f+f,v=h+h,m=d+d,S=f*g,M=f*v,T=f*m,A=h*v,x=h*m,y=d*m,O=p*g,N=p*v,D=p*m,G=s.x,I=s.y,L=s.z;return l[0]=(1-(A+y))*G,l[1]=(M+D)*G,l[2]=(T-N)*G,l[3]=0,l[4]=(M-D)*I,l[5]=(1-(S+y))*I,l[6]=(x+O)*I,l[7]=0,l[8]=(T+N)*L,l[9]=(x-O)*L,l[10]=(1-(S+A))*L,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;let f=Yr.set(l[0],l[1],l[2]).length();const h=Yr.set(l[4],l[5],l[6]).length(),d=Yr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(f=-f),e.x=l[12],e.y=l[13],e.z=l[14],wi.copy(this);const g=1/f,v=1/h,m=1/d;return wi.elements[0]*=g,wi.elements[1]*=g,wi.elements[2]*=g,wi.elements[4]*=v,wi.elements[5]*=v,wi.elements[6]*=v,wi.elements[8]*=m,wi.elements[9]*=m,wi.elements[10]*=m,i.setFromRotationMatrix(wi),s.x=f,s.y=h,s.z=d,this}makePerspective(e,i,s,l,f,h,d=ba){const p=this.elements,g=2*f/(i-e),v=2*f/(s-l),m=(i+e)/(i-e),S=(s+l)/(s-l);let M,T;if(d===ba)M=-(h+f)/(h-f),T=-2*h*f/(h-f);else if(d===Oc)M=-h/(h-f),T=-h*f/(h-f);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=m,p[12]=0,p[1]=0,p[5]=v,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=T,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,f,h,d=ba){const p=this.elements,g=1/(i-e),v=1/(s-l),m=1/(h-f),S=(i+e)*g,M=(s+l)*v;let T,A;if(d===ba)T=(h+f)*m,A=-2*m;else if(d===Oc)T=f*m,A=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=2*g,p[4]=0,p[8]=0,p[12]=-S,p[1]=0,p[5]=2*v,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=A,p[14]=-T,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const Yr=new tt,wi=new Ke,nT=new tt(0,0,0),iT=new tt(1,1,1),ss=new tt,sc=new tt,ri=new tt,wv=new Ke,Dv=new Ks;class Qi{constructor(e=0,i=0,s=0,l=Qi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,f=l[0],h=l[4],d=l[8],p=l[1],g=l[5],v=l[9],m=l[2],S=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(Me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,M),this._z=Math.atan2(-h,f)):(this._x=Math.atan2(S,g),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(p,g)):(this._y=Math.atan2(-m,f),this._z=0);break;case"ZXY":this._x=Math.asin(Me(S,-1,1)),Math.abs(S)<.9999999?(this._y=Math.atan2(-m,M),this._z=Math.atan2(-h,g)):(this._y=0,this._z=Math.atan2(p,f));break;case"ZYX":this._y=Math.asin(-Me(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(S,M),this._z=Math.atan2(p,f)):(this._x=0,this._z=Math.atan2(-h,g));break;case"YZX":this._z=Math.asin(Me(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,g),this._y=Math.atan2(-m,f)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-Me(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(S,g),this._y=Math.atan2(d,f)):(this._x=Math.atan2(-v,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return wv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wv,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return Dv.setFromEuler(this),this.setFromQuaternion(Dv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qi.DEFAULT_ORDER="XYZ";class IS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let aT=0;const Uv=new tt,qr=new Ks,va=new Ke,rc=new tt,hl=new tt,sT=new tt,rT=new Ks,Nv=new tt(1,0,0),Lv=new tt(0,1,0),Ov=new tt(0,0,1),Pv={type:"added"},oT={type:"removed"},Wr={type:"childadded",child:null},Rd={type:"childremoved",child:null};class Nn extends Js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:aT++}),this.uuid=po(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nn.DEFAULT_UP.clone();const e=new tt,i=new Qi,s=new Ks,l=new tt(1,1,1);function f(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(f),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Ke},normalMatrix:{value:new ge}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=Nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new IS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return qr.setFromAxisAngle(e,i),this.quaternion.multiply(qr),this}rotateOnWorldAxis(e,i){return qr.setFromAxisAngle(e,i),this.quaternion.premultiply(qr),this}rotateX(e){return this.rotateOnAxis(Nv,e)}rotateY(e){return this.rotateOnAxis(Lv,e)}rotateZ(e){return this.rotateOnAxis(Ov,e)}translateOnAxis(e,i){return Uv.copy(e).applyQuaternion(this.quaternion),this.position.add(Uv.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(Nv,e)}translateY(e){return this.translateOnAxis(Lv,e)}translateZ(e){return this.translateOnAxis(Ov,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(va.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?rc.copy(e):rc.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),hl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?va.lookAt(hl,rc,this.up):va.lookAt(rc,hl,this.up),this.quaternion.setFromRotationMatrix(va),l&&(va.extractRotation(l.matrixWorld),qr.setFromRotationMatrix(va),this.quaternion.premultiply(qr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pv),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(oT),Rd.child=e,this.dispatchEvent(Rd),Rd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),va.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),va.multiply(e.parent.matrixWorld)),e.applyMatrix4(va),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pv),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let f=0,h=l.length;f<h;f++)l[f].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hl,e,sT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hl,rT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let f=0,h=l.length;f<h;f++)l[f].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function f(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=f(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let g=0,v=p.length;g<v;g++){const m=p[g];f(e.shapes,m)}else f(e.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(f(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,g=this.material.length;p<g;p++)d.push(f(e.materials,this.material[p]));l.material=d}else l.material=f(e.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];l.animations.push(f(e.animations,p))}}if(i){const d=h(e.geometries),p=h(e.materials),g=h(e.textures),v=h(e.images),m=h(e.shapes),S=h(e.skeletons),M=h(e.animations),T=h(e.nodes);d.length>0&&(s.geometries=d),p.length>0&&(s.materials=p),g.length>0&&(s.textures=g),v.length>0&&(s.images=v),m.length>0&&(s.shapes=m),S.length>0&&(s.skeletons=S),M.length>0&&(s.animations=M),T.length>0&&(s.nodes=T)}return s.object=l,s;function h(d){const p=[];for(const g in d){const v=d[g];delete v.metadata,p.push(v)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}Nn.DEFAULT_UP=new tt(0,1,0);Nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Di=new tt,Sa=new tt,Cd=new tt,ya=new tt,jr=new tt,Zr=new tt,zv=new tt,wd=new tt,Dd=new tt,Ud=new tt,Nd=new sn,Ld=new sn,Od=new sn;class Ui{constructor(e=new tt,i=new tt,s=new tt){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),Di.subVectors(e,i),l.cross(Di);const f=l.lengthSq();return f>0?l.multiplyScalar(1/Math.sqrt(f)):l.set(0,0,0)}static getBarycoord(e,i,s,l,f){Di.subVectors(l,i),Sa.subVectors(s,i),Cd.subVectors(e,i);const h=Di.dot(Di),d=Di.dot(Sa),p=Di.dot(Cd),g=Sa.dot(Sa),v=Sa.dot(Cd),m=h*g-d*d;if(m===0)return f.set(0,0,0),null;const S=1/m,M=(g*p-d*v)*S,T=(h*v-d*p)*S;return f.set(1-M-T,T,M)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,ya)===null?!1:ya.x>=0&&ya.y>=0&&ya.x+ya.y<=1}static getInterpolation(e,i,s,l,f,h,d,p){return this.getBarycoord(e,i,s,l,ya)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(f,ya.x),p.addScaledVector(h,ya.y),p.addScaledVector(d,ya.z),p)}static getInterpolatedAttribute(e,i,s,l,f,h){return Nd.setScalar(0),Ld.setScalar(0),Od.setScalar(0),Nd.fromBufferAttribute(e,i),Ld.fromBufferAttribute(e,s),Od.fromBufferAttribute(e,l),h.setScalar(0),h.addScaledVector(Nd,f.x),h.addScaledVector(Ld,f.y),h.addScaledVector(Od,f.z),h}static isFrontFacing(e,i,s,l){return Di.subVectors(s,i),Sa.subVectors(e,i),Di.cross(Sa).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Di.subVectors(this.c,this.b),Sa.subVectors(this.a,this.b),Di.cross(Sa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ui.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ui.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,f){return Ui.getInterpolation(e,this.a,this.b,this.c,i,s,l,f)}containsPoint(e){return Ui.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ui.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,f=this.c;let h,d;jr.subVectors(l,s),Zr.subVectors(f,s),wd.subVectors(e,s);const p=jr.dot(wd),g=Zr.dot(wd);if(p<=0&&g<=0)return i.copy(s);Dd.subVectors(e,l);const v=jr.dot(Dd),m=Zr.dot(Dd);if(v>=0&&m<=v)return i.copy(l);const S=p*m-v*g;if(S<=0&&p>=0&&v<=0)return h=p/(p-v),i.copy(s).addScaledVector(jr,h);Ud.subVectors(e,f);const M=jr.dot(Ud),T=Zr.dot(Ud);if(T>=0&&M<=T)return i.copy(f);const A=M*g-p*T;if(A<=0&&g>=0&&T<=0)return d=g/(g-T),i.copy(s).addScaledVector(Zr,d);const x=v*T-M*m;if(x<=0&&m-v>=0&&M-T>=0)return zv.subVectors(f,l),d=(m-v)/(m-v+(M-T)),i.copy(l).addScaledVector(zv,d);const y=1/(x+A+S);return h=A*y,d=S*y,i.copy(s).addScaledVector(jr,h).addScaledVector(Zr,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const BS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rs={h:0,s:0,l:0},oc={h:0,s:0,l:0};function Pd(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class ne{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=yi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ue.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=Ue.workingColorSpace){return this.r=e,this.g=i,this.b=s,Ue.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=Ue.workingColorSpace){if(e=qp(e,1),i=Me(i,0,1),s=Me(s,0,1),i===0)this.r=this.g=this.b=s;else{const f=s<=.5?s*(1+i):s+i-s*i,h=2*s-f;this.r=Pd(h,f,e+1/3),this.g=Pd(h,f,e),this.b=Pd(h,f,e-1/3)}return Ue.colorSpaceToWorking(this,l),this}setStyle(e,i=yi){function s(f){f!==void 0&&parseFloat(f)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let f;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(f=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(f[4]),this.setRGB(Math.min(255,parseInt(f[1],10))/255,Math.min(255,parseInt(f[2],10))/255,Math.min(255,parseInt(f[3],10))/255,i);if(f=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(f[4]),this.setRGB(Math.min(100,parseInt(f[1],10))/100,Math.min(100,parseInt(f[2],10))/100,Math.min(100,parseInt(f[3],10))/100,i);break;case"hsl":case"hsla":if(f=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(f[4]),this.setHSL(parseFloat(f[1])/360,parseFloat(f[2])/100,parseFloat(f[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const f=l[1],h=f.length;if(h===3)return this.setRGB(parseInt(f.charAt(0),16)/15,parseInt(f.charAt(1),16)/15,parseInt(f.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(f,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=yi){const s=BS[e.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Aa(e.r),this.g=Aa(e.g),this.b=Aa(e.b),this}copyLinearToSRGB(e){return this.r=oo(e.r),this.g=oo(e.g),this.b=oo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yi){return Ue.workingToColorSpace(In.copy(this),e),Math.round(Me(In.r*255,0,255))*65536+Math.round(Me(In.g*255,0,255))*256+Math.round(Me(In.b*255,0,255))}getHexString(e=yi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Ue.workingColorSpace){Ue.workingToColorSpace(In.copy(this),i);const s=In.r,l=In.g,f=In.b,h=Math.max(s,l,f),d=Math.min(s,l,f);let p,g;const v=(d+h)/2;if(d===h)p=0,g=0;else{const m=h-d;switch(g=v<=.5?m/(h+d):m/(2-h-d),h){case s:p=(l-f)/m+(l<f?6:0);break;case l:p=(f-s)/m+2;break;case f:p=(s-l)/m+4;break}p/=6}return e.h=p,e.s=g,e.l=v,e}getRGB(e,i=Ue.workingColorSpace){return Ue.workingToColorSpace(In.copy(this),i),e.r=In.r,e.g=In.g,e.b=In.b,e}getStyle(e=yi){Ue.workingToColorSpace(In.copy(this),e);const i=In.r,s=In.g,l=In.b;return e!==yi?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(rs),this.setHSL(rs.h+e,rs.s+i,rs.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(rs),e.getHSL(oc);const s=Sl(rs.h,oc.h,i),l=Sl(rs.s,oc.s,i),f=Sl(rs.l,oc.l,i);return this.setHSL(s,l,f),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,f=e.elements;return this.r=f[0]*i+f[3]*s+f[6]*l,this.g=f[1]*i+f[4]*s+f[7]*l,this.b=f[2]*i+f[5]*s+f[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const In=new ne;ne.NAMES=BS;let lT=0;class Cl extends Js{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lT++}),this.uuid=po(),this.name="",this.type="Material",this.blending=so,this.side=ds,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zd,this.blendDst=Kd,this.blendEquation=Ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ne(0,0,0),this.blendAlpha=0,this.depthFunc=lo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==so&&(s.blending=this.blending),this.side!==ds&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Zd&&(s.blendSrc=this.blendSrc),this.blendDst!==Kd&&(s.blendDst=this.blendDst),this.blendEquation!==Ys&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==lo&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xv&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Hr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Hr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(f){const h=[];for(const d in f){const p=f[d];delete p.metadata,h.push(p)}return h}if(i){const f=l(e.textures),h=l(e.images);f.length>0&&(s.textures=f),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let f=0;f!==l;++f)s[f]=i[f].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class FS extends Cl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=Bp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dn=new tt,lc=new me;let uT=0;class Li{constructor(e,i,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:uT++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=Mv,this.updateRanges=[],this.gpuType=ji,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,f=this.itemSize;l<f;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)lc.fromBufferAttribute(this,i),lc.applyMatrix3(e),this.setXY(i,lc.x,lc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)dn.fromBufferAttribute(this,i),dn.applyMatrix3(e),this.setXYZ(i,dn.x,dn.y,dn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)dn.fromBufferAttribute(this,i),dn.applyMatrix4(e),this.setXYZ(i,dn.x,dn.y,dn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)dn.fromBufferAttribute(this,i),dn.applyNormalMatrix(e),this.setXYZ(i,dn.x,dn.y,dn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)dn.fromBufferAttribute(this,i),dn.transformDirection(e),this.setXYZ(i,dn.x,dn.y,dn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=eo(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=Vn(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=eo(i,this.array)),i}setX(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=eo(i,this.array)),i}setY(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=eo(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=eo(i,this.array)),i}setW(e,i){return this.normalized&&(i=Vn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array),l=Vn(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,f){return e*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array),l=Vn(l,this.array),f=Vn(f,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=f,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Mv&&(e.usage=this.usage),e}}class HS extends Li{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class GS extends Li{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class Zi extends Li{constructor(e,i,s){super(new Float32Array(e),i,s)}}let cT=0;const Si=new Ke,zd=new Nn,Kr=new tt,oi=new $s,dl=new $s,En=new tt;class ps extends Js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cT++}),this.uuid=po(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(OS(e)?GS:HS)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const f=new ge().getNormalMatrix(e);s.applyNormalMatrix(f),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Si.makeRotationFromQuaternion(e),this.applyMatrix4(Si),this}rotateX(e){return Si.makeRotationX(e),this.applyMatrix4(Si),this}rotateY(e){return Si.makeRotationY(e),this.applyMatrix4(Si),this}rotateZ(e){return Si.makeRotationZ(e),this.applyMatrix4(Si),this}translate(e,i,s){return Si.makeTranslation(e,i,s),this.applyMatrix4(Si),this}scale(e,i,s){return Si.makeScale(e,i,s),this.applyMatrix4(Si),this}lookAt(e){return zd.lookAt(e),zd.updateMatrix(),this.applyMatrix4(zd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kr).negate(),this.translate(Kr.x,Kr.y,Kr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,f=e.length;l<f;l++){const h=e[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Zi(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const f=e[l];i.setXYZ(l,f.x,f.y,f.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $s);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new tt(-1/0,-1/0,-1/0),new tt(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const f=i[s];oi.setFromBufferAttribute(f),this.morphTargetsRelative?(En.addVectors(this.boundingBox.min,oi.min),this.boundingBox.expandByPoint(En),En.addVectors(this.boundingBox.max,oi.max),this.boundingBox.expandByPoint(En)):(this.boundingBox.expandByPoint(oi.min),this.boundingBox.expandByPoint(oi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rl);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new tt,1/0);return}if(e){const s=this.boundingSphere.center;if(oi.setFromBufferAttribute(e),i)for(let f=0,h=i.length;f<h;f++){const d=i[f];dl.setFromBufferAttribute(d),this.morphTargetsRelative?(En.addVectors(oi.min,dl.min),oi.expandByPoint(En),En.addVectors(oi.max,dl.max),oi.expandByPoint(En)):(oi.expandByPoint(dl.min),oi.expandByPoint(dl.max))}oi.getCenter(s);let l=0;for(let f=0,h=e.count;f<h;f++)En.fromBufferAttribute(e,f),l=Math.max(l,s.distanceToSquared(En));if(i)for(let f=0,h=i.length;f<h;f++){const d=i[f],p=this.morphTargetsRelative;for(let g=0,v=d.count;g<v;g++)En.fromBufferAttribute(d,g),p&&(Kr.fromBufferAttribute(e,g),En.add(Kr)),l=Math.max(l,s.distanceToSquared(En))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,f=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Li(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],p=[];for(let F=0;F<s.count;F++)d[F]=new tt,p[F]=new tt;const g=new tt,v=new tt,m=new tt,S=new me,M=new me,T=new me,A=new tt,x=new tt;function y(F,U,C){g.fromBufferAttribute(s,F),v.fromBufferAttribute(s,U),m.fromBufferAttribute(s,C),S.fromBufferAttribute(f,F),M.fromBufferAttribute(f,U),T.fromBufferAttribute(f,C),v.sub(g),m.sub(g),M.sub(S),T.sub(S);const H=1/(M.x*T.y-T.x*M.y);isFinite(H)&&(A.copy(v).multiplyScalar(T.y).addScaledVector(m,-M.y).multiplyScalar(H),x.copy(m).multiplyScalar(M.x).addScaledVector(v,-T.x).multiplyScalar(H),d[F].add(A),d[U].add(A),d[C].add(A),p[F].add(x),p[U].add(x),p[C].add(x))}let O=this.groups;O.length===0&&(O=[{start:0,count:e.count}]);for(let F=0,U=O.length;F<U;++F){const C=O[F],H=C.start,ot=C.count;for(let st=H,mt=H+ot;st<mt;st+=3)y(e.getX(st+0),e.getX(st+1),e.getX(st+2))}const N=new tt,D=new tt,G=new tt,I=new tt;function L(F){G.fromBufferAttribute(l,F),I.copy(G);const U=d[F];N.copy(U),N.sub(G.multiplyScalar(G.dot(U))).normalize(),D.crossVectors(I,U);const H=D.dot(p[F])<0?-1:1;h.setXYZW(F,N.x,N.y,N.z,H)}for(let F=0,U=O.length;F<U;++F){const C=O[F],H=C.start,ot=C.count;for(let st=H,mt=H+ot;st<mt;st+=3)L(e.getX(st+0)),L(e.getX(st+1)),L(e.getX(st+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Li(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let S=0,M=s.count;S<M;S++)s.setXYZ(S,0,0,0);const l=new tt,f=new tt,h=new tt,d=new tt,p=new tt,g=new tt,v=new tt,m=new tt;if(e)for(let S=0,M=e.count;S<M;S+=3){const T=e.getX(S+0),A=e.getX(S+1),x=e.getX(S+2);l.fromBufferAttribute(i,T),f.fromBufferAttribute(i,A),h.fromBufferAttribute(i,x),v.subVectors(h,f),m.subVectors(l,f),v.cross(m),d.fromBufferAttribute(s,T),p.fromBufferAttribute(s,A),g.fromBufferAttribute(s,x),d.add(v),p.add(v),g.add(v),s.setXYZ(T,d.x,d.y,d.z),s.setXYZ(A,p.x,p.y,p.z),s.setXYZ(x,g.x,g.y,g.z)}else for(let S=0,M=i.count;S<M;S+=3)l.fromBufferAttribute(i,S+0),f.fromBufferAttribute(i,S+1),h.fromBufferAttribute(i,S+2),v.subVectors(h,f),m.subVectors(l,f),v.cross(m),s.setXYZ(S+0,v.x,v.y,v.z),s.setXYZ(S+1,v.x,v.y,v.z),s.setXYZ(S+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)En.fromBufferAttribute(e,i),En.normalize(),e.setXYZ(i,En.x,En.y,En.z)}toNonIndexed(){function e(d,p){const g=d.array,v=d.itemSize,m=d.normalized,S=new g.constructor(p.length*v);let M=0,T=0;for(let A=0,x=p.length;A<x;A++){d.isInterleavedBufferAttribute?M=p[A]*d.data.stride+d.offset:M=p[A]*v;for(let y=0;y<v;y++)S[T++]=g[M++]}return new Li(S,v,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new ps,s=this.index.array,l=this.attributes;for(const d in l){const p=l[d],g=e(p,s);i.setAttribute(d,g)}const f=this.morphAttributes;for(const d in f){const p=[],g=f[d];for(let v=0,m=g.length;v<m;v++){const S=g[v],M=e(S,s);p.push(M)}i.morphAttributes[d]=p}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,p=h.length;d<p;d++){const g=h[d];i.addGroup(g.start,g.count,g.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const g in p)p[g]!==void 0&&(e[g]=p[g]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const g=s[p];e.data.attributes[p]=g.toJSON(e.data)}const l={};let f=!1;for(const p in this.morphAttributes){const g=this.morphAttributes[p],v=[];for(let m=0,S=g.length;m<S;m++){const M=g[m];v.push(M.toJSON(e.data))}v.length>0&&(l[p]=v,f=!0)}f&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const g in l){const v=l[g];this.setAttribute(g,v.clone(i))}const f=e.morphAttributes;for(const g in f){const v=[],m=f[g];for(let S=0,M=m.length;S<M;S++)v.push(m[S].clone(i));this.morphAttributes[g]=v}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let g=0,v=h.length;g<v;g++){const m=h[g];this.addGroup(m.start,m.count,m.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Iv=new Ke,Hs=new zS,uc=new Rl,Bv=new tt,cc=new tt,fc=new tt,hc=new tt,Id=new tt,dc=new tt,Fv=new tt,pc=new tt;class li extends Nn{constructor(e=new ps,i=new FS){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,h=l.length;f<h;f++){const d=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=f}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,f=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const d=this.morphTargetInfluences;if(f&&d){dc.set(0,0,0);for(let p=0,g=f.length;p<g;p++){const v=d[p],m=f[p];v!==0&&(Id.fromBufferAttribute(m,e),h?dc.addScaledVector(Id,v):dc.addScaledVector(Id.sub(i),v))}i.add(dc)}return i}raycast(e,i){const s=this.geometry,l=this.material,f=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),uc.copy(s.boundingSphere),uc.applyMatrix4(f),Hs.copy(e.ray).recast(e.near),!(uc.containsPoint(Hs.origin)===!1&&(Hs.intersectSphere(uc,Bv)===null||Hs.origin.distanceToSquared(Bv)>(e.far-e.near)**2))&&(Iv.copy(f).invert(),Hs.copy(e.ray).applyMatrix4(Iv),!(s.boundingBox!==null&&Hs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Hs)))}_computeIntersections(e,i,s){let l;const f=this.geometry,h=this.material,d=f.index,p=f.attributes.position,g=f.attributes.uv,v=f.attributes.uv1,m=f.attributes.normal,S=f.groups,M=f.drawRange;if(d!==null)if(Array.isArray(h))for(let T=0,A=S.length;T<A;T++){const x=S[T],y=h[x.materialIndex],O=Math.max(x.start,M.start),N=Math.min(d.count,Math.min(x.start+x.count,M.start+M.count));for(let D=O,G=N;D<G;D+=3){const I=d.getX(D),L=d.getX(D+1),F=d.getX(D+2);l=mc(this,y,e,s,g,v,m,I,L,F),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const T=Math.max(0,M.start),A=Math.min(d.count,M.start+M.count);for(let x=T,y=A;x<y;x+=3){const O=d.getX(x),N=d.getX(x+1),D=d.getX(x+2);l=mc(this,h,e,s,g,v,m,O,N,D),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(h))for(let T=0,A=S.length;T<A;T++){const x=S[T],y=h[x.materialIndex],O=Math.max(x.start,M.start),N=Math.min(p.count,Math.min(x.start+x.count,M.start+M.count));for(let D=O,G=N;D<G;D+=3){const I=D,L=D+1,F=D+2;l=mc(this,y,e,s,g,v,m,I,L,F),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const T=Math.max(0,M.start),A=Math.min(p.count,M.start+M.count);for(let x=T,y=A;x<y;x+=3){const O=x,N=x+1,D=x+2;l=mc(this,h,e,s,g,v,m,O,N,D),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}}}function fT(o,e,i,s,l,f,h,d){let p;if(e.side===kn?p=s.intersectTriangle(h,f,l,!0,d):p=s.intersectTriangle(l,f,h,e.side===ds,d),p===null)return null;pc.copy(d),pc.applyMatrix4(o.matrixWorld);const g=i.ray.origin.distanceTo(pc);return g<i.near||g>i.far?null:{distance:g,point:pc.clone(),object:o}}function mc(o,e,i,s,l,f,h,d,p,g){o.getVertexPosition(d,cc),o.getVertexPosition(p,fc),o.getVertexPosition(g,hc);const v=fT(o,e,i,s,cc,fc,hc,Fv);if(v){const m=new tt;Ui.getBarycoord(Fv,cc,fc,hc,m),l&&(v.uv=Ui.getInterpolatedAttribute(l,d,p,g,m,new me)),f&&(v.uv1=Ui.getInterpolatedAttribute(f,d,p,g,m,new me)),h&&(v.normal=Ui.getInterpolatedAttribute(h,d,p,g,m,new tt),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const S={a:d,b:p,c:g,normal:new tt,materialIndex:0};Ui.getNormal(cc,fc,hc,S.normal),v.face=S,v.barycoord=m}return v}class mo extends ps{constructor(e=1,i=1,s=1,l=1,f=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:f,depthSegments:h};const d=this;l=Math.floor(l),f=Math.floor(f),h=Math.floor(h);const p=[],g=[],v=[],m=[];let S=0,M=0;T("z","y","x",-1,-1,s,i,e,h,f,0),T("z","y","x",1,-1,s,i,-e,h,f,1),T("x","z","y",1,1,e,s,i,l,h,2),T("x","z","y",1,-1,e,s,-i,l,h,3),T("x","y","z",1,-1,e,i,s,l,f,4),T("x","y","z",-1,-1,e,i,-s,l,f,5),this.setIndex(p),this.setAttribute("position",new Zi(g,3)),this.setAttribute("normal",new Zi(v,3)),this.setAttribute("uv",new Zi(m,2));function T(A,x,y,O,N,D,G,I,L,F,U){const C=D/L,H=G/F,ot=D/2,st=G/2,mt=I/2,ct=L+1,Y=F+1;let it=0,W=0;const xt=new tt;for(let yt=0;yt<Y;yt++){const Ft=yt*H-st;for(let ie=0;ie<ct;ie++){const re=ie*C-ot;xt[A]=re*O,xt[x]=Ft*N,xt[y]=mt,g.push(xt.x,xt.y,xt.z),xt[A]=0,xt[x]=0,xt[y]=I>0?1:-1,v.push(xt.x,xt.y,xt.z),m.push(ie/L),m.push(1-yt/F),it+=1}}for(let yt=0;yt<F;yt++)for(let Ft=0;Ft<L;Ft++){const ie=S+Ft+ct*yt,re=S+Ft+ct*(yt+1),w=S+(Ft+1)+ct*(yt+1),Z=S+(Ft+1)+ct*yt;p.push(ie,re,Z),p.push(re,w,Z),W+=6}d.addGroup(M,W,U),M+=W,S+=it}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ho(o){const e={};for(const i in o){e[i]={};for(const s in o[i]){const l=o[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone():Array.isArray(l)?e[i][s]=l.slice():e[i][s]=l}}return e}function Xn(o){const e={};for(let i=0;i<o.length;i++){const s=ho(o[i]);for(const l in s)e[l]=s[l]}return e}function hT(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function VS(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ue.workingColorSpace}const dT={clone:ho,merge:Xn};var pT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ra extends Cl{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pT,this.fragmentShader=mT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ho(e.uniforms),this.uniformsGroups=hT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class XS extends Nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=ba}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const os=new tt,Hv=new me,Gv=new me;class xi extends XS{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Tl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Tl*2*Math.atan(Math.tan(vl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(os.x,os.y).multiplyScalar(-e/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(os.x,os.y).multiplyScalar(-e/os.z)}getViewSize(e,i){return this.getViewBounds(e,Hv,Gv),i.subVectors(Gv,Hv)}setViewOffset(e,i,s,l,f,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(vl*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,f=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const p=h.fullWidth,g=h.fullHeight;f+=h.offsetX*l/p,i-=h.offsetY*s/g,l*=h.width/p,s*=h.height/g}const d=this.filmOffset;d!==0&&(f+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(f,f+l,i,i-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Qr=-90,Jr=1;class _T extends Nn{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new xi(Qr,Jr,e,i);l.layers=this.layers,this.add(l);const f=new xi(Qr,Jr,e,i);f.layers=this.layers,this.add(f);const h=new xi(Qr,Jr,e,i);h.layers=this.layers,this.add(h);const d=new xi(Qr,Jr,e,i);d.layers=this.layers,this.add(d);const p=new xi(Qr,Jr,e,i);p.layers=this.layers,this.add(p);const g=new xi(Qr,Jr,e,i);g.layers=this.layers,this.add(g)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,f,h,d,p]=i;for(const g of i)this.remove(g);if(e===ba)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),f.up.set(0,0,-1),f.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Oc)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),f.up.set(0,0,1),f.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const g of i)this.add(g),g.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[f,h,d,p,g,v]=this.children,m=e.getRenderTarget(),S=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const A=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,l),e.render(i,f),e.setRenderTarget(s,1,l),e.render(i,h),e.setRenderTarget(s,2,l),e.render(i,d),e.setRenderTarget(s,3,l),e.render(i,p),e.setRenderTarget(s,4,l),e.render(i,g),s.texture.generateMipmaps=A,e.setRenderTarget(s,5,l),e.render(i,v),e.setRenderTarget(m,S,M),e.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class kS extends Yn{constructor(e=[],i=uo,s,l,f,h,d,p,g,v){super(e,i,s,l,f,h,d,p,g,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gT extends Qs{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new kS(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new mo(5,5,5),f=new Ra({name:"CubemapFromEquirect",uniforms:ho(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:kn,blending:fs});f.uniforms.tEquirect.value=i;const h=new li(l,f),d=i.minFilter;return i.minFilter===js&&(i.minFilter=Wi),new _T(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const f=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,s,l);e.setRenderTarget(f)}}class _c extends Nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vT={type:"move"};class Bd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _c,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _c,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new tt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new tt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _c,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new tt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new tt),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,f=null,h=null;const d=this._targetRay,p=this._grip,g=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(g&&e.hand){h=!0;for(const A of e.hand.values()){const x=i.getJointPose(A,s),y=this._getHandJoint(g,A);x!==null&&(y.matrix.fromArray(x.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=x.radius),y.visible=x!==null}const v=g.joints["index-finger-tip"],m=g.joints["thumb-tip"],S=v.position.distanceTo(m.position),M=.02,T=.005;g.inputState.pinching&&S>M+T?(g.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!g.inputState.pinching&&S<=M-T&&(g.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(f=i.getPose(e.gripSpace,s),f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,f.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(f.linearVelocity)):p.hasLinearVelocity=!1,f.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(f.angularVelocity)):p.hasAngularVelocity=!1));d!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&f!==null&&(l=f),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(vT)))}return d!==null&&(d.visible=l!==null),p!==null&&(p.visible=f!==null),g!==null&&(g.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new _c;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}class Zp{constructor(e,i=1,s=1e3){this.isFog=!0,this.name="",this.color=new ne(e),this.near=i,this.far=s}clone(){return new Zp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ST extends Nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class yT extends Yn{constructor(e=null,i=1,s=1,l,f,h,d,p,g=ui,v=ui,m,S){super(null,h,d,p,g,v,l,f,m,S),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Op extends Li{constructor(e,i,s,l=1){super(e,i,s),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=l}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const $r=new Ke,Vv=new Ke,gc=[],Xv=new $s,xT=new Ke,pl=new li,ml=new Rl;class vc extends li{constructor(e,i,s){super(e,i),this.isInstancedMesh=!0,this.instanceMatrix=new Op(new Float32Array(s*16),16),this.instanceColor=null,this.morphTexture=null,this.count=s,this.boundingBox=null,this.boundingSphere=null;for(let l=0;l<s;l++)this.setMatrixAt(l,xT)}computeBoundingBox(){const e=this.geometry,i=this.count;this.boundingBox===null&&(this.boundingBox=new $s),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let s=0;s<i;s++)this.getMatrixAt(s,$r),Xv.copy(e.boundingBox).applyMatrix4($r),this.boundingBox.union(Xv)}computeBoundingSphere(){const e=this.geometry,i=this.count;this.boundingSphere===null&&(this.boundingSphere=new Rl),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let s=0;s<i;s++)this.getMatrixAt(s,$r),ml.copy(e.boundingSphere).applyMatrix4($r),this.boundingSphere.union(ml)}copy(e,i){return super.copy(e,i),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,i){i.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,i){i.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,i){const s=i.morphTargetInfluences,l=this.morphTexture.source.data.data,f=s.length+1,h=e*f+1;for(let d=0;d<s.length;d++)s[d]=l[h+d]}raycast(e,i){const s=this.matrixWorld,l=this.count;if(pl.geometry=this.geometry,pl.material=this.material,pl.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ml.copy(this.boundingSphere),ml.applyMatrix4(s),e.ray.intersectsSphere(ml)!==!1))for(let f=0;f<l;f++){this.getMatrixAt(f,$r),Vv.multiplyMatrices(s,$r),pl.matrixWorld=Vv,pl.raycast(e,gc);for(let h=0,d=gc.length;h<d;h++){const p=gc[h];p.instanceId=f,p.object=this,i.push(p)}gc.length=0}}setColorAt(e,i){this.instanceColor===null&&(this.instanceColor=new Op(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),i.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,i){i.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,i){const s=i.morphTargetInfluences,l=s.length+1;this.morphTexture===null&&(this.morphTexture=new yT(new Float32Array(l*this.count),l,this.count,Vp,ji));const f=this.morphTexture.source.data.data;let h=0;for(let g=0;g<s.length;g++)h+=s[g];const d=this.geometry.morphTargetsRelative?1:1-h,p=l*e;f[p]=d,f.set(s,p+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Fd=new tt,MT=new tt,ET=new ge;class ls{constructor(e=new tt(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=Fd.subVectors(s,i).cross(MT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const s=e.delta(Fd),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/l;return f<0||f>1?null:i.copy(e.start).addScaledVector(s,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||ET.getNormalMatrix(e),l=this.coplanarPoint(Fd).applyMatrix4(e),f=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(f),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Gs=new Rl,TT=new me(.5,.5),Sc=new tt;class Kp{constructor(e=new ls,i=new ls,s=new ls,l=new ls,f=new ls,h=new ls){this.planes=[e,i,s,l,f,h]}set(e,i,s,l,f,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(f),d[5].copy(h),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=ba){const s=this.planes,l=e.elements,f=l[0],h=l[1],d=l[2],p=l[3],g=l[4],v=l[5],m=l[6],S=l[7],M=l[8],T=l[9],A=l[10],x=l[11],y=l[12],O=l[13],N=l[14],D=l[15];if(s[0].setComponents(p-f,S-g,x-M,D-y).normalize(),s[1].setComponents(p+f,S+g,x+M,D+y).normalize(),s[2].setComponents(p+h,S+v,x+T,D+O).normalize(),s[3].setComponents(p-h,S-v,x-T,D-O).normalize(),s[4].setComponents(p-d,S-m,x-A,D-N).normalize(),i===ba)s[5].setComponents(p+d,S+m,x+A,D+N).normalize();else if(i===Oc)s[5].setComponents(d,m,A,N).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Gs.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gs)}intersectsSprite(e){Gs.center.set(0,0,0);const i=TT.distanceTo(e.center);return Gs.radius=.7071067811865476+i,Gs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gs)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let f=0;f<6;f++)if(i[f].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Sc.x=l.normal.x>0?e.max.x:e.min.x,Sc.y=l.normal.y>0?e.max.y:e.min.y,Sc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Sc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class YS extends Yn{constructor(e,i,s=Zs,l,f,h,d=ui,p=ui,g,v=Ml,m=1){if(v!==Ml&&v!==El)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const S={width:e,height:i,depth:m};super(S,l,f,h,d,p,v,s,g),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new jp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class wl extends ps{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const f=e/2,h=i/2,d=Math.floor(s),p=Math.floor(l),g=d+1,v=p+1,m=e/d,S=i/p,M=[],T=[],A=[],x=[];for(let y=0;y<v;y++){const O=y*S-h;for(let N=0;N<g;N++){const D=N*m-f;T.push(D,-O,0),A.push(0,0,1),x.push(N/d),x.push(1-y/p)}}for(let y=0;y<p;y++)for(let O=0;O<d;O++){const N=O+g*y,D=O+g*(y+1),G=O+1+g*(y+1),I=O+1+g*y;M.push(N,D,I),M.push(D,G,I)}this.setIndex(M),this.setAttribute("position",new Zi(T,3)),this.setAttribute("normal",new Zi(A,3)),this.setAttribute("uv",new Zi(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wl(e.width,e.height,e.widthSegments,e.heightSegments)}}class Qp extends ps{constructor(e=1,i=32,s=16,l=0,f=Math.PI*2,h=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:f,thetaStart:h,thetaLength:d},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const p=Math.min(h+d,Math.PI);let g=0;const v=[],m=new tt,S=new tt,M=[],T=[],A=[],x=[];for(let y=0;y<=s;y++){const O=[],N=y/s;let D=0;y===0&&h===0?D=.5/i:y===s&&p===Math.PI&&(D=-.5/i);for(let G=0;G<=i;G++){const I=G/i;m.x=-e*Math.cos(l+I*f)*Math.sin(h+N*d),m.y=e*Math.cos(h+N*d),m.z=e*Math.sin(l+I*f)*Math.sin(h+N*d),T.push(m.x,m.y,m.z),S.copy(m).normalize(),A.push(S.x,S.y,S.z),x.push(I+D,1-N),O.push(g++)}v.push(O)}for(let y=0;y<s;y++)for(let O=0;O<i;O++){const N=v[y][O+1],D=v[y][O],G=v[y+1][O],I=v[y+1][O+1];(y!==0||h>0)&&M.push(N,D,I),(y!==s-1||p<Math.PI)&&M.push(D,G,I)}this.setIndex(M),this.setAttribute("position",new Zi(T,3)),this.setAttribute("normal",new Zi(A,3)),this.setAttribute("uv",new Zi(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qp(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class _l extends Cl{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=NS,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=Bp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bT extends Cl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=SE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class AT extends Cl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class qS extends Nn{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new ne(e),this.intensity=i}dispose(){}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}class RT extends qS{constructor(e,i,s){super(e,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ne(i)}copy(e,i){return super.copy(e,i),this.groundColor.copy(e.groundColor),this}}const Hd=new Ke,kv=new tt,Yv=new tt;class CT{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.mapType=Ki,this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kp,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera,s=this.matrix;kv.setFromMatrixPosition(e.matrixWorld),i.position.copy(kv),Yv.setFromMatrixPosition(e.target.matrixWorld),i.lookAt(Yv),i.updateMatrixWorld(),Hd.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hd),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Hd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class WS extends XS{constructor(e=-1,i=1,s=1,l=-1,f=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=f,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,f,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=f,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let f=s-e,h=s+e,d=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const g=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;f+=g*this.view.offsetX,h=f+g*this.view.width,d-=v*this.view.offsetY,p=d-v*this.view.height}this.projectionMatrix.makeOrthographic(f,h,d,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class wT extends CT{constructor(){super(new WS(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class DT extends qS{constructor(e,i){super(e,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nn.DEFAULT_UP),this.updateMatrix(),this.target=new Nn,this.shadow=new wT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class UT extends xi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class NT{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=performance.now();e=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=e}return e}}class qv{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Me(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(Me(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class LT extends Js{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Wv(o,e,i,s){const l=OT(s);switch(i){case CS:return o*e;case Vp:return o*e/l.components*l.byteLength;case Xp:return o*e/l.components*l.byteLength;case DS:return o*e*2/l.components*l.byteLength;case kp:return o*e*2/l.components*l.byteLength;case wS:return o*e*3/l.components*l.byteLength;case Ni:return o*e*4/l.components*l.byteLength;case Yp:return o*e*4/l.components*l.byteLength;case Rc:case Cc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case wc:case Dc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case up:case fp:return Math.max(o,16)*Math.max(e,8)/4;case lp:case cp:return Math.max(o,8)*Math.max(e,8)/2;case hp:case dp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case pp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case mp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case _p:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case gp:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case vp:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case Sp:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case yp:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case xp:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Mp:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case Ep:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Tp:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case bp:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Ap:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Rp:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Cp:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Uc:case wp:case Dp:return Math.ceil(o/4)*Math.ceil(e/4)*16;case US:case Up:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Np:case Lp:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function OT(o){switch(o){case Ki:case bS:return{byteLength:1,components:1};case yl:case AS:case Al:return{byteLength:2,components:1};case Hp:case Gp:return{byteLength:2,components:4};case Zs:case Fp:case ji:return{byteLength:4,components:1};case RS:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ip}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ip);function jS(){let o=null,e=!1,i=null,s=null;function l(f,h){i(f,h),s=o.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&(s=o.requestAnimationFrame(l),e=!0)},stop:function(){o.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(f){i=f},setContext:function(f){o=f}}}function PT(o){const e=new WeakMap;function i(d,p){const g=d.array,v=d.usage,m=g.byteLength,S=o.createBuffer();o.bindBuffer(p,S),o.bufferData(p,g,v),d.onUploadCallback();let M;if(g instanceof Float32Array)M=o.FLOAT;else if(typeof Float16Array<"u"&&g instanceof Float16Array)M=o.HALF_FLOAT;else if(g instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(g instanceof Int16Array)M=o.SHORT;else if(g instanceof Uint32Array)M=o.UNSIGNED_INT;else if(g instanceof Int32Array)M=o.INT;else if(g instanceof Int8Array)M=o.BYTE;else if(g instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(g instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:S,type:M,bytesPerElement:g.BYTES_PER_ELEMENT,version:d.version,size:m}}function s(d,p,g){const v=p.array,m=p.updateRanges;if(o.bindBuffer(g,d),m.length===0)o.bufferSubData(g,0,v);else{m.sort((M,T)=>M.start-T.start);let S=0;for(let M=1;M<m.length;M++){const T=m[S],A=m[M];A.start<=T.start+T.count+1?T.count=Math.max(T.count,A.start+A.count-T.start):(++S,m[S]=A)}m.length=S+1;for(let M=0,T=m.length;M<T;M++){const A=m[M];o.bufferSubData(g,A.start*v.BYTES_PER_ELEMENT,v,A.start,A.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function f(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=e.get(d);p&&(o.deleteBuffer(p.buffer),e.delete(d))}function h(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=e.get(d);(!v||v.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const g=e.get(d);if(g===void 0)e.set(d,i(d,p));else if(g.version<d.version){if(g.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(g.buffer,d,p),g.version=d.version}}return{get:l,remove:f,update:h}}var zT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,IT=`#ifdef USE_ALPHAHASH
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
#endif`,BT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,FT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,HT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,GT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,VT=`#ifdef USE_AOMAP
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
#endif`,kT=`#ifdef USE_BATCHING
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
#endif`,YT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,WT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ZT=`#ifdef USE_IRIDESCENCE
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
#endif`,KT=`#ifdef USE_BUMPMAP
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
#endif`,QT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,JT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$T=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,eb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,nb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ib=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ab=`#if defined( USE_COLOR_ALPHA )
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
#endif`,sb=`#define PI 3.141592653589793
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
} // validated`,rb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ob=`vec3 transformedNormal = objectNormal;
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
#endif`,lb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ub=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hb="gl_FragColor = linearToOutputTexel( gl_FragColor );",db=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pb=`#ifdef USE_ENVMAP
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
#endif`,mb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
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
#endif`,gb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vb=`#ifdef USE_ENVMAP
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
#endif`,Sb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Eb=`#ifdef USE_GRADIENTMAP
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
}`,Tb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ab=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rb=`uniform bool receiveShadow;
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
#endif`,Cb=`#ifdef USE_ENVMAP
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
#endif`,wb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Db=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ub=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lb=`PhysicalMaterial material;
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
#endif`,Ob=`struct PhysicalMaterial {
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
}`,Pb=`
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
#endif`,zb=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ib=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bb=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fb=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hb=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gb=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qb=`#ifdef USE_MORPHTARGETS
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
#endif`,Jb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$b=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,t1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,e1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,i1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,a1=`#ifdef USE_NORMALMAP
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
#endif`,s1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,r1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,l1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,u1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,f1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,h1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,d1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,p1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,m1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,g1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,v1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,S1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,y1=`float getShadowMask() {
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
}`,x1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,M1=`#ifdef USE_SKINNING
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
#endif`,E1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,T1=`#ifdef USE_SKINNING
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
#endif`,b1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,A1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,R1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,C1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,w1=`#ifdef USE_TRANSMISSION
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
#endif`,D1=`#ifdef USE_TRANSMISSION
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
#endif`,U1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,N1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,O1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const P1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,z1=`uniform sampler2D t2D;
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
}`,I1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,F1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,G1=`#include <common>
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
}`,V1=`#if DEPTH_PACKING == 3200
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
}`,X1=`#define DISTANCE
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
}`,k1=`#define DISTANCE
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
}`,Y1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,q1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W1=`uniform float scale;
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
}`,j1=`uniform vec3 diffuse;
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
}`,Z1=`#include <common>
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
}`,K1=`uniform vec3 diffuse;
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
}`,Q1=`#define LAMBERT
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
}`,J1=`#define LAMBERT
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
}`,$1=`#define MATCAP
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
}`,tA=`#define MATCAP
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
}`,eA=`#define NORMAL
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
}`,nA=`#define NORMAL
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
}`,iA=`#define PHONG
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
}`,aA=`#define PHONG
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
}`,sA=`#define STANDARD
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
}`,rA=`#define STANDARD
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
}`,oA=`#define TOON
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
}`,lA=`#define TOON
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
}`,uA=`uniform float size;
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
}`,cA=`uniform vec3 diffuse;
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
}`,fA=`#include <common>
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
}`,hA=`uniform vec3 color;
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
}`,dA=`uniform float rotation;
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
}`,pA=`uniform vec3 diffuse;
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
}`,ve={alphahash_fragment:zT,alphahash_pars_fragment:IT,alphamap_fragment:BT,alphamap_pars_fragment:FT,alphatest_fragment:HT,alphatest_pars_fragment:GT,aomap_fragment:VT,aomap_pars_fragment:XT,batching_pars_vertex:kT,batching_vertex:YT,begin_vertex:qT,beginnormal_vertex:WT,bsdfs:jT,iridescence_fragment:ZT,bumpmap_pars_fragment:KT,clipping_planes_fragment:QT,clipping_planes_pars_fragment:JT,clipping_planes_pars_vertex:$T,clipping_planes_vertex:tb,color_fragment:eb,color_pars_fragment:nb,color_pars_vertex:ib,color_vertex:ab,common:sb,cube_uv_reflection_fragment:rb,defaultnormal_vertex:ob,displacementmap_pars_vertex:lb,displacementmap_vertex:ub,emissivemap_fragment:cb,emissivemap_pars_fragment:fb,colorspace_fragment:hb,colorspace_pars_fragment:db,envmap_fragment:pb,envmap_common_pars_fragment:mb,envmap_pars_fragment:_b,envmap_pars_vertex:gb,envmap_physical_pars_fragment:Cb,envmap_vertex:vb,fog_vertex:Sb,fog_pars_vertex:yb,fog_fragment:xb,fog_pars_fragment:Mb,gradientmap_pars_fragment:Eb,lightmap_pars_fragment:Tb,lights_lambert_fragment:bb,lights_lambert_pars_fragment:Ab,lights_pars_begin:Rb,lights_toon_fragment:wb,lights_toon_pars_fragment:Db,lights_phong_fragment:Ub,lights_phong_pars_fragment:Nb,lights_physical_fragment:Lb,lights_physical_pars_fragment:Ob,lights_fragment_begin:Pb,lights_fragment_maps:zb,lights_fragment_end:Ib,logdepthbuf_fragment:Bb,logdepthbuf_pars_fragment:Fb,logdepthbuf_pars_vertex:Hb,logdepthbuf_vertex:Gb,map_fragment:Vb,map_pars_fragment:Xb,map_particle_fragment:kb,map_particle_pars_fragment:Yb,metalnessmap_fragment:qb,metalnessmap_pars_fragment:Wb,morphinstance_vertex:jb,morphcolor_vertex:Zb,morphnormal_vertex:Kb,morphtarget_pars_vertex:Qb,morphtarget_vertex:Jb,normal_fragment_begin:$b,normal_fragment_maps:t1,normal_pars_fragment:e1,normal_pars_vertex:n1,normal_vertex:i1,normalmap_pars_fragment:a1,clearcoat_normal_fragment_begin:s1,clearcoat_normal_fragment_maps:r1,clearcoat_pars_fragment:o1,iridescence_pars_fragment:l1,opaque_fragment:u1,packing:c1,premultiplied_alpha_fragment:f1,project_vertex:h1,dithering_fragment:d1,dithering_pars_fragment:p1,roughnessmap_fragment:m1,roughnessmap_pars_fragment:_1,shadowmap_pars_fragment:g1,shadowmap_pars_vertex:v1,shadowmap_vertex:S1,shadowmask_pars_fragment:y1,skinbase_vertex:x1,skinning_pars_vertex:M1,skinning_vertex:E1,skinnormal_vertex:T1,specularmap_fragment:b1,specularmap_pars_fragment:A1,tonemapping_fragment:R1,tonemapping_pars_fragment:C1,transmission_fragment:w1,transmission_pars_fragment:D1,uv_pars_fragment:U1,uv_pars_vertex:N1,uv_vertex:L1,worldpos_vertex:O1,background_vert:P1,background_frag:z1,backgroundCube_vert:I1,backgroundCube_frag:B1,cube_vert:F1,cube_frag:H1,depth_vert:G1,depth_frag:V1,distanceRGBA_vert:X1,distanceRGBA_frag:k1,equirect_vert:Y1,equirect_frag:q1,linedashed_vert:W1,linedashed_frag:j1,meshbasic_vert:Z1,meshbasic_frag:K1,meshlambert_vert:Q1,meshlambert_frag:J1,meshmatcap_vert:$1,meshmatcap_frag:tA,meshnormal_vert:eA,meshnormal_frag:nA,meshphong_vert:iA,meshphong_frag:aA,meshphysical_vert:sA,meshphysical_frag:rA,meshtoon_vert:oA,meshtoon_frag:lA,points_vert:uA,points_frag:cA,shadow_vert:fA,shadow_frag:hA,sprite_vert:dA,sprite_frag:pA},Pt={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ge},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ge}},envmap:{envMap:{value:null},envMapRotation:{value:new ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ge},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0},uvTransform:{value:new ge}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ge},alphaMap:{value:null},alphaMapTransform:{value:new ge},alphaTest:{value:0}}},qi={basic:{uniforms:Xn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:ve.meshbasic_vert,fragmentShader:ve.meshbasic_frag},lambert:{uniforms:Xn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new ne(0)}}]),vertexShader:ve.meshlambert_vert,fragmentShader:ve.meshlambert_frag},phong:{uniforms:Xn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30}}]),vertexShader:ve.meshphong_vert,fragmentShader:ve.meshphong_frag},standard:{uniforms:Xn([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ve.meshphysical_vert,fragmentShader:ve.meshphysical_frag},toon:{uniforms:Xn([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new ne(0)}}]),vertexShader:ve.meshtoon_vert,fragmentShader:ve.meshtoon_frag},matcap:{uniforms:Xn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:ve.meshmatcap_vert,fragmentShader:ve.meshmatcap_frag},points:{uniforms:Xn([Pt.points,Pt.fog]),vertexShader:ve.points_vert,fragmentShader:ve.points_frag},dashed:{uniforms:Xn([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ve.linedashed_vert,fragmentShader:ve.linedashed_frag},depth:{uniforms:Xn([Pt.common,Pt.displacementmap]),vertexShader:ve.depth_vert,fragmentShader:ve.depth_frag},normal:{uniforms:Xn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:ve.meshnormal_vert,fragmentShader:ve.meshnormal_frag},sprite:{uniforms:Xn([Pt.sprite,Pt.fog]),vertexShader:ve.sprite_vert,fragmentShader:ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ve.background_vert,fragmentShader:ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ge}},vertexShader:ve.backgroundCube_vert,fragmentShader:ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ve.cube_vert,fragmentShader:ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ve.equirect_vert,fragmentShader:ve.equirect_frag},distanceRGBA:{uniforms:Xn([Pt.common,Pt.displacementmap,{referencePosition:{value:new tt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ve.distanceRGBA_vert,fragmentShader:ve.distanceRGBA_frag},shadow:{uniforms:Xn([Pt.lights,Pt.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:ve.shadow_vert,fragmentShader:ve.shadow_frag}};qi.physical={uniforms:Xn([qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ge},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ge},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ge},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ge},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ge},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ge}}]),vertexShader:ve.meshphysical_vert,fragmentShader:ve.meshphysical_frag};const yc={r:0,b:0,g:0},Vs=new Qi,mA=new Ke;function _A(o,e,i,s,l,f,h){const d=new ne(0);let p=f===!0?0:1,g,v,m=null,S=0,M=null;function T(N){let D=N.isScene===!0?N.background:null;return D&&D.isTexture&&(D=(N.backgroundBlurriness>0?i:e).get(D)),D}function A(N){let D=!1;const G=T(N);G===null?y(d,p):G&&G.isColor&&(y(G,1),D=!0);const I=o.xr.getEnvironmentBlendMode();I==="additive"?s.buffers.color.setClear(0,0,0,1,h):I==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(o.autoClear||D)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function x(N,D){const G=T(D);G&&(G.isCubeTexture||G.mapping===zc)?(v===void 0&&(v=new li(new mo(1,1,1),new Ra({name:"BackgroundCubeMaterial",uniforms:ho(qi.backgroundCube.uniforms),vertexShader:qi.backgroundCube.vertexShader,fragmentShader:qi.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(I,L,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(v)),Vs.copy(D.backgroundRotation),Vs.x*=-1,Vs.y*=-1,Vs.z*=-1,G.isCubeTexture&&G.isRenderTargetTexture===!1&&(Vs.y*=-1,Vs.z*=-1),v.material.uniforms.envMap.value=G,v.material.uniforms.flipEnvMap.value=G.isCubeTexture&&G.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(mA.makeRotationFromEuler(Vs)),v.material.toneMapped=Ue.getTransfer(G.colorSpace)!==Ve,(m!==G||S!==G.version||M!==o.toneMapping)&&(v.material.needsUpdate=!0,m=G,S=G.version,M=o.toneMapping),v.layers.enableAll(),N.unshift(v,v.geometry,v.material,0,0,null)):G&&G.isTexture&&(g===void 0&&(g=new li(new wl(2,2),new Ra({name:"BackgroundMaterial",uniforms:ho(qi.background.uniforms),vertexShader:qi.background.vertexShader,fragmentShader:qi.background.fragmentShader,side:ds,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),Object.defineProperty(g.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(g)),g.material.uniforms.t2D.value=G,g.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,g.material.toneMapped=Ue.getTransfer(G.colorSpace)!==Ve,G.matrixAutoUpdate===!0&&G.updateMatrix(),g.material.uniforms.uvTransform.value.copy(G.matrix),(m!==G||S!==G.version||M!==o.toneMapping)&&(g.material.needsUpdate=!0,m=G,S=G.version,M=o.toneMapping),g.layers.enableAll(),N.unshift(g,g.geometry,g.material,0,0,null))}function y(N,D){N.getRGB(yc,VS(o)),s.buffers.color.setClear(yc.r,yc.g,yc.b,D,h)}function O(){v!==void 0&&(v.geometry.dispose(),v.material.dispose(),v=void 0),g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0)}return{getClearColor:function(){return d},setClearColor:function(N,D=1){d.set(N),p=D,y(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(N){p=N,y(d,p)},render:A,addToRenderList:x,dispose:O}}function gA(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=S(null);let f=l,h=!1;function d(C,H,ot,st,mt){let ct=!1;const Y=m(st,ot,H);f!==Y&&(f=Y,g(f.object)),ct=M(C,st,ot,mt),ct&&T(C,st,ot,mt),mt!==null&&e.update(mt,o.ELEMENT_ARRAY_BUFFER),(ct||h)&&(h=!1,D(C,H,ot,st),mt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(mt).buffer))}function p(){return o.createVertexArray()}function g(C){return o.bindVertexArray(C)}function v(C){return o.deleteVertexArray(C)}function m(C,H,ot){const st=ot.wireframe===!0;let mt=s[C.id];mt===void 0&&(mt={},s[C.id]=mt);let ct=mt[H.id];ct===void 0&&(ct={},mt[H.id]=ct);let Y=ct[st];return Y===void 0&&(Y=S(p()),ct[st]=Y),Y}function S(C){const H=[],ot=[],st=[];for(let mt=0;mt<i;mt++)H[mt]=0,ot[mt]=0,st[mt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:ot,attributeDivisors:st,object:C,attributes:{},index:null}}function M(C,H,ot,st){const mt=f.attributes,ct=H.attributes;let Y=0;const it=ot.getAttributes();for(const W in it)if(it[W].location>=0){const yt=mt[W];let Ft=ct[W];if(Ft===void 0&&(W==="instanceMatrix"&&C.instanceMatrix&&(Ft=C.instanceMatrix),W==="instanceColor"&&C.instanceColor&&(Ft=C.instanceColor)),yt===void 0||yt.attribute!==Ft||Ft&&yt.data!==Ft.data)return!0;Y++}return f.attributesNum!==Y||f.index!==st}function T(C,H,ot,st){const mt={},ct=H.attributes;let Y=0;const it=ot.getAttributes();for(const W in it)if(it[W].location>=0){let yt=ct[W];yt===void 0&&(W==="instanceMatrix"&&C.instanceMatrix&&(yt=C.instanceMatrix),W==="instanceColor"&&C.instanceColor&&(yt=C.instanceColor));const Ft={};Ft.attribute=yt,yt&&yt.data&&(Ft.data=yt.data),mt[W]=Ft,Y++}f.attributes=mt,f.attributesNum=Y,f.index=st}function A(){const C=f.newAttributes;for(let H=0,ot=C.length;H<ot;H++)C[H]=0}function x(C){y(C,0)}function y(C,H){const ot=f.newAttributes,st=f.enabledAttributes,mt=f.attributeDivisors;ot[C]=1,st[C]===0&&(o.enableVertexAttribArray(C),st[C]=1),mt[C]!==H&&(o.vertexAttribDivisor(C,H),mt[C]=H)}function O(){const C=f.newAttributes,H=f.enabledAttributes;for(let ot=0,st=H.length;ot<st;ot++)H[ot]!==C[ot]&&(o.disableVertexAttribArray(ot),H[ot]=0)}function N(C,H,ot,st,mt,ct,Y){Y===!0?o.vertexAttribIPointer(C,H,ot,mt,ct):o.vertexAttribPointer(C,H,ot,st,mt,ct)}function D(C,H,ot,st){A();const mt=st.attributes,ct=ot.getAttributes(),Y=H.defaultAttributeValues;for(const it in ct){const W=ct[it];if(W.location>=0){let xt=mt[it];if(xt===void 0&&(it==="instanceMatrix"&&C.instanceMatrix&&(xt=C.instanceMatrix),it==="instanceColor"&&C.instanceColor&&(xt=C.instanceColor)),xt!==void 0){const yt=xt.normalized,Ft=xt.itemSize,ie=e.get(xt);if(ie===void 0)continue;const re=ie.buffer,w=ie.type,Z=ie.bytesPerElement,_t=w===o.INT||w===o.UNSIGNED_INT||xt.gpuType===Fp;if(xt.isInterleavedBufferAttribute){const ut=xt.data,Tt=ut.stride,It=xt.offset;if(ut.isInstancedInterleavedBuffer){for(let lt=0;lt<W.locationSize;lt++)y(W.location+lt,ut.meshPerAttribute);C.isInstancedMesh!==!0&&st._maxInstanceCount===void 0&&(st._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let lt=0;lt<W.locationSize;lt++)x(W.location+lt);o.bindBuffer(o.ARRAY_BUFFER,re);for(let lt=0;lt<W.locationSize;lt++)N(W.location+lt,Ft/W.locationSize,w,yt,Tt*Z,(It+Ft/W.locationSize*lt)*Z,_t)}else{if(xt.isInstancedBufferAttribute){for(let ut=0;ut<W.locationSize;ut++)y(W.location+ut,xt.meshPerAttribute);C.isInstancedMesh!==!0&&st._maxInstanceCount===void 0&&(st._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let ut=0;ut<W.locationSize;ut++)x(W.location+ut);o.bindBuffer(o.ARRAY_BUFFER,re);for(let ut=0;ut<W.locationSize;ut++)N(W.location+ut,Ft/W.locationSize,w,yt,Ft*Z,Ft/W.locationSize*ut*Z,_t)}}else if(Y!==void 0){const yt=Y[it];if(yt!==void 0)switch(yt.length){case 2:o.vertexAttrib2fv(W.location,yt);break;case 3:o.vertexAttrib3fv(W.location,yt);break;case 4:o.vertexAttrib4fv(W.location,yt);break;default:o.vertexAttrib1fv(W.location,yt)}}}}O()}function G(){F();for(const C in s){const H=s[C];for(const ot in H){const st=H[ot];for(const mt in st)v(st[mt].object),delete st[mt];delete H[ot]}delete s[C]}}function I(C){if(s[C.id]===void 0)return;const H=s[C.id];for(const ot in H){const st=H[ot];for(const mt in st)v(st[mt].object),delete st[mt];delete H[ot]}delete s[C.id]}function L(C){for(const H in s){const ot=s[H];if(ot[C.id]===void 0)continue;const st=ot[C.id];for(const mt in st)v(st[mt].object),delete st[mt];delete ot[C.id]}}function F(){U(),h=!0,f!==l&&(f=l,g(f.object))}function U(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:F,resetDefaultState:U,dispose:G,releaseStatesOfGeometry:I,releaseStatesOfProgram:L,initAttributes:A,enableAttribute:x,disableUnusedAttributes:O}}function vA(o,e,i){let s;function l(g){s=g}function f(g,v){o.drawArrays(s,g,v),i.update(v,s,1)}function h(g,v,m){m!==0&&(o.drawArraysInstanced(s,g,v,m),i.update(v,s,m))}function d(g,v,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,g,0,v,0,m);let M=0;for(let T=0;T<m;T++)M+=v[T];i.update(M,s,1)}function p(g,v,m,S){if(m===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let T=0;T<g.length;T++)h(g[T],v[T],S[T]);else{M.multiDrawArraysInstancedWEBGL(s,g,0,v,0,S,0,m);let T=0;for(let A=0;A<m;A++)T+=v[A]*S[A];i.update(T,s,1)}}this.setMode=l,this.render=f,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function SA(o,e,i,s){let l;function f(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");l=o.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(L){return!(L!==Ni&&s.convert(L)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(L){const F=L===Al&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Ki&&s.convert(L)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==ji&&!F)}function p(L){if(L==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let g=i.precision!==void 0?i.precision:"highp";const v=p(g);v!==g&&(console.warn("THREE.WebGLRenderer:",g,"not supported, using",v,"instead."),g=v);const m=i.logarithmicDepthBuffer===!0,S=i.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),T=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=o.getParameter(o.MAX_TEXTURE_SIZE),x=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),y=o.getParameter(o.MAX_VERTEX_ATTRIBS),O=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),N=o.getParameter(o.MAX_VARYING_VECTORS),D=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),G=T>0,I=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:p,textureFormatReadable:h,textureTypeReadable:d,precision:g,logarithmicDepthBuffer:m,reverseDepthBuffer:S,maxTextures:M,maxVertexTextures:T,maxTextureSize:A,maxCubemapSize:x,maxAttributes:y,maxVertexUniforms:O,maxVaryings:N,maxFragmentUniforms:D,vertexTextures:G,maxSamples:I}}function yA(o){const e=this;let i=null,s=0,l=!1,f=!1;const h=new ls,d=new ge,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(m,S){const M=m.length!==0||S||s!==0||l;return l=S,s=m.length,M},this.beginShadows=function(){f=!0,v(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(m,S){i=v(m,S,0)},this.setState=function(m,S,M){const T=m.clippingPlanes,A=m.clipIntersection,x=m.clipShadows,y=o.get(m);if(!l||T===null||T.length===0||f&&!x)f?v(null):g();else{const O=f?0:s,N=O*4;let D=y.clippingState||null;p.value=D,D=v(T,S,N,M);for(let G=0;G!==N;++G)D[G]=i[G];y.clippingState=D,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=O}};function g(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function v(m,S,M,T){const A=m!==null?m.length:0;let x=null;if(A!==0){if(x=p.value,T!==!0||x===null){const y=M+A*4,O=S.matrixWorldInverse;d.getNormalMatrix(O),(x===null||x.length<y)&&(x=new Float32Array(y));for(let N=0,D=M;N!==A;++N,D+=4)h.copy(m[N]).applyMatrix4(O,d),h.normal.toArray(x,D),x[D+3]=h.constant}p.value=x,p.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,x}}function xA(o){let e=new WeakMap;function i(h,d){return d===ap?h.mapping=uo:d===sp&&(h.mapping=co),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===ap||d===sp)if(e.has(h)){const p=e.get(h).texture;return i(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const g=new gT(p.height);return g.fromEquirectangularTexture(o,h),e.set(h,g),h.addEventListener("dispose",l),i(g.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){e=new WeakMap}return{get:s,dispose:f}}const io=4,jv=[.125,.215,.35,.446,.526,.582],qs=20,Gd=new WS,Zv=new ne;let Vd=null,Xd=0,kd=0,Yd=!1;const ks=(1+Math.sqrt(5))/2,to=1/ks,Kv=[new tt(-ks,to,0),new tt(ks,to,0),new tt(-to,0,ks),new tt(to,0,ks),new tt(0,ks,-to),new tt(0,ks,to),new tt(-1,1,-1),new tt(1,1,-1),new tt(-1,1,1),new tt(1,1,1)],MA=new tt;class Qv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,s=.1,l=100,f={}){const{size:h=256,position:d=MA}=f;Vd=this._renderer.getRenderTarget(),Xd=this._renderer.getActiveCubeFace(),kd=this._renderer.getActiveMipmapLevel(),Yd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,s,l,p,d),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tS(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$v(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vd,Xd,kd),this._renderer.xr.enabled=Yd,e.scissorTest=!1,xc(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===uo||e.mapping===co?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vd=this._renderer.getRenderTarget(),Xd=this._renderer.getActiveCubeFace(),kd=this._renderer.getActiveMipmapLevel(),Yd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Wi,minFilter:Wi,generateMipmaps:!1,type:Al,format:Ni,colorSpace:fo,depthBuffer:!1},l=Jv(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jv(e,i,s);const{_lodMax:f}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=EA(f)),this._blurMaterial=TA(f,e,i)}return l}_compileMaterial(e){const i=new li(this._lodPlanes[0],e);this._renderer.compile(i,Gd)}_sceneToCubeUV(e,i,s,l,f){const p=new xi(90,1,i,s),g=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],m=this._renderer,S=m.autoClear,M=m.toneMapping;m.getClearColor(Zv),m.toneMapping=hs,m.autoClear=!1;const T=new FS({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1}),A=new li(new mo,T);let x=!1;const y=e.background;y?y.isColor&&(T.color.copy(y),e.background=null,x=!0):(T.color.copy(Zv),x=!0);for(let O=0;O<6;O++){const N=O%3;N===0?(p.up.set(0,g[O],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x+v[O],f.y,f.z)):N===1?(p.up.set(0,0,g[O]),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y+v[O],f.z)):(p.up.set(0,g[O],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y,f.z+v[O]));const D=this._cubeSize;xc(l,N*D,O>2?D:0,D,D),m.setRenderTarget(l),x&&m.render(A,p),m.render(e,p)}A.geometry.dispose(),A.material.dispose(),m.toneMapping=M,m.autoClear=S,e.background=y}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===uo||e.mapping===co;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=tS()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$v());const f=l?this._cubemapMaterial:this._equirectMaterial,h=new li(this._lodPlanes[0],f),d=f.uniforms;d.envMap.value=e;const p=this._cubeSize;xc(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(h,Gd)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let f=1;f<l;f++){const h=Math.sqrt(this._sigmas[f]*this._sigmas[f]-this._sigmas[f-1]*this._sigmas[f-1]),d=Kv[(l-f-1)%Kv.length];this._blur(e,f-1,f,h,d)}i.autoClear=s}_blur(e,i,s,l,f){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,s,l,"latitudinal",f),this._halfBlur(h,e,s,s,l,"longitudinal",f)}_halfBlur(e,i,s,l,f,h,d){const p=this._renderer,g=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,m=new li(this._lodPlanes[l],g),S=g.uniforms,M=this._sizeLods[s]-1,T=isFinite(f)?Math.PI/(2*M):2*Math.PI/(2*qs-1),A=f/T,x=isFinite(f)?1+Math.floor(v*A):qs;x>qs&&console.warn(`sigmaRadians, ${f}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${qs}`);const y=[];let O=0;for(let L=0;L<qs;++L){const F=L/A,U=Math.exp(-F*F/2);y.push(U),L===0?O+=U:L<x&&(O+=2*U)}for(let L=0;L<y.length;L++)y[L]=y[L]/O;S.envMap.value=e.texture,S.samples.value=x,S.weights.value=y,S.latitudinal.value=h==="latitudinal",d&&(S.poleAxis.value=d);const{_lodMax:N}=this;S.dTheta.value=T,S.mipInt.value=N-s;const D=this._sizeLods[l],G=3*D*(l>N-io?l-N+io:0),I=4*(this._cubeSize-D);xc(i,G,I,3*D,2*D),p.setRenderTarget(i),p.render(m,Gd)}}function EA(o){const e=[],i=[],s=[];let l=o;const f=o-io+1+jv.length;for(let h=0;h<f;h++){const d=Math.pow(2,l);i.push(d);let p=1/d;h>o-io?p=jv[h-o+io-1]:h===0&&(p=0),s.push(p);const g=1/(d-2),v=-g,m=1+g,S=[v,v,m,v,m,m,v,v,m,m,v,m],M=6,T=6,A=3,x=2,y=1,O=new Float32Array(A*T*M),N=new Float32Array(x*T*M),D=new Float32Array(y*T*M);for(let I=0;I<M;I++){const L=I%3*2/3-1,F=I>2?0:-1,U=[L,F,0,L+2/3,F,0,L+2/3,F+1,0,L,F,0,L+2/3,F+1,0,L,F+1,0];O.set(U,A*T*I),N.set(S,x*T*I);const C=[I,I,I,I,I,I];D.set(C,y*T*I)}const G=new ps;G.setAttribute("position",new Li(O,A)),G.setAttribute("uv",new Li(N,x)),G.setAttribute("faceIndex",new Li(D,y)),e.push(G),l>io&&l--}return{lodPlanes:e,sizeLods:i,sigmas:s}}function Jv(o,e,i){const s=new Qs(o,e,i);return s.texture.mapping=zc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function xc(o,e,i,s,l){o.viewport.set(e,i,s,l),o.scissor.set(e,i,s,l)}function TA(o,e,i){const s=new Float32Array(qs),l=new tt(0,1,0);return new Ra({name:"SphericalGaussianBlur",defines:{n:qs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Jp(),fragmentShader:`

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
		`,blending:fs,depthTest:!1,depthWrite:!1})}function $v(){return new Ra({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jp(),fragmentShader:`

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
		`,blending:fs,depthTest:!1,depthWrite:!1})}function tS(){return new Ra({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fs,depthTest:!1,depthWrite:!1})}function Jp(){return`

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
	`}function bA(o){let e=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const p=d.mapping,g=p===ap||p===sp,v=p===uo||p===co;if(g||v){let m=e.get(d);const S=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==S)return i===null&&(i=new Qv(o)),m=g?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{const M=d.image;return g&&M&&M.height>0||v&&M&&l(M)?(i===null&&(i=new Qv(o)),m=g?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",f),m.texture):null}}}return d}function l(d){let p=0;const g=6;for(let v=0;v<g;v++)d[v]!==void 0&&p++;return p===g}function f(d){const p=d.target;p.removeEventListener("dispose",f);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function AA(o){const e={};function i(s){if(e[s]!==void 0)return e[s];let l;switch(s){case"WEBGL_depth_texture":l=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=o.getExtension(s)}return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&ro("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function RA(o,e,i,s){const l={},f=new WeakMap;function h(m){const S=m.target;S.index!==null&&e.remove(S.index);for(const T in S.attributes)e.remove(S.attributes[T]);S.removeEventListener("dispose",h),delete l[S.id];const M=f.get(S);M&&(e.remove(M),f.delete(S)),s.releaseStatesOfGeometry(S),S.isInstancedBufferGeometry===!0&&delete S._maxInstanceCount,i.memory.geometries--}function d(m,S){return l[S.id]===!0||(S.addEventListener("dispose",h),l[S.id]=!0,i.memory.geometries++),S}function p(m){const S=m.attributes;for(const M in S)e.update(S[M],o.ARRAY_BUFFER)}function g(m){const S=[],M=m.index,T=m.attributes.position;let A=0;if(M!==null){const O=M.array;A=M.version;for(let N=0,D=O.length;N<D;N+=3){const G=O[N+0],I=O[N+1],L=O[N+2];S.push(G,I,I,L,L,G)}}else if(T!==void 0){const O=T.array;A=T.version;for(let N=0,D=O.length/3-1;N<D;N+=3){const G=N+0,I=N+1,L=N+2;S.push(G,I,I,L,L,G)}}else return;const x=new(OS(S)?GS:HS)(S,1);x.version=A;const y=f.get(m);y&&e.remove(y),f.set(m,x)}function v(m){const S=f.get(m);if(S){const M=m.index;M!==null&&S.version<M.version&&g(m)}else g(m);return f.get(m)}return{get:d,update:p,getWireframeAttribute:v}}function CA(o,e,i){let s;function l(S){s=S}let f,h;function d(S){f=S.type,h=S.bytesPerElement}function p(S,M){o.drawElements(s,M,f,S*h),i.update(M,s,1)}function g(S,M,T){T!==0&&(o.drawElementsInstanced(s,M,f,S*h,T),i.update(M,s,T))}function v(S,M,T){if(T===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,f,S,0,T);let x=0;for(let y=0;y<T;y++)x+=M[y];i.update(x,s,1)}function m(S,M,T,A){if(T===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<S.length;y++)g(S[y]/h,M[y],A[y]);else{x.multiDrawElementsInstancedWEBGL(s,M,0,f,S,0,A,0,T);let y=0;for(let O=0;O<T;O++)y+=M[O]*A[O];i.update(y,s,1)}}this.setMode=l,this.setIndex=d,this.render=p,this.renderInstances=g,this.renderMultiDraw=v,this.renderMultiDrawInstances=m}function wA(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(f,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(f/3);break;case o.LINES:i.lines+=d*(f/2);break;case o.LINE_STRIP:i.lines+=d*(f-1);break;case o.LINE_LOOP:i.lines+=d*f;break;case o.POINTS:i.points+=d*f;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function DA(o,e,i){const s=new WeakMap,l=new sn;function f(h,d,p){const g=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,m=v!==void 0?v.length:0;let S=s.get(d);if(S===void 0||S.count!==m){let C=function(){F.dispose(),s.delete(d),d.removeEventListener("dispose",C)};var M=C;S!==void 0&&S.texture.dispose();const T=d.morphAttributes.position!==void 0,A=d.morphAttributes.normal!==void 0,x=d.morphAttributes.color!==void 0,y=d.morphAttributes.position||[],O=d.morphAttributes.normal||[],N=d.morphAttributes.color||[];let D=0;T===!0&&(D=1),A===!0&&(D=2),x===!0&&(D=3);let G=d.attributes.position.count*D,I=1;G>e.maxTextureSize&&(I=Math.ceil(G/e.maxTextureSize),G=e.maxTextureSize);const L=new Float32Array(G*I*4*m),F=new PS(L,G,I,m);F.type=ji,F.needsUpdate=!0;const U=D*4;for(let H=0;H<m;H++){const ot=y[H],st=O[H],mt=N[H],ct=G*I*4*H;for(let Y=0;Y<ot.count;Y++){const it=Y*U;T===!0&&(l.fromBufferAttribute(ot,Y),L[ct+it+0]=l.x,L[ct+it+1]=l.y,L[ct+it+2]=l.z,L[ct+it+3]=0),A===!0&&(l.fromBufferAttribute(st,Y),L[ct+it+4]=l.x,L[ct+it+5]=l.y,L[ct+it+6]=l.z,L[ct+it+7]=0),x===!0&&(l.fromBufferAttribute(mt,Y),L[ct+it+8]=l.x,L[ct+it+9]=l.y,L[ct+it+10]=l.z,L[ct+it+11]=mt.itemSize===4?l.w:1)}}S={count:m,texture:F,size:new me(G,I)},s.set(d,S),d.addEventListener("dispose",C)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)p.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let T=0;for(let x=0;x<g.length;x++)T+=g[x];const A=d.morphTargetsRelative?1:1-T;p.getUniforms().setValue(o,"morphTargetBaseInfluence",A),p.getUniforms().setValue(o,"morphTargetInfluences",g)}p.getUniforms().setValue(o,"morphTargetsTexture",S.texture,i),p.getUniforms().setValue(o,"morphTargetsTextureSize",S.size)}return{update:f}}function UA(o,e,i,s){let l=new WeakMap;function f(p){const g=s.render.frame,v=p.geometry,m=e.get(p,v);if(l.get(m)!==g&&(e.update(m),l.set(m,g)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),l.get(p)!==g&&(i.update(p.instanceMatrix,o.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,o.ARRAY_BUFFER),l.set(p,g))),p.isSkinnedMesh){const S=p.skeleton;l.get(S)!==g&&(S.update(),l.set(S,g))}return m}function h(){l=new WeakMap}function d(p){const g=p.target;g.removeEventListener("dispose",d),i.remove(g.instanceMatrix),g.instanceColor!==null&&i.remove(g.instanceColor)}return{update:f,dispose:h}}const ZS=new Yn,eS=new YS(1,1),KS=new PS,QS=new tT,JS=new kS,nS=[],iS=[],aS=new Float32Array(16),sS=new Float32Array(9),rS=new Float32Array(4);function _o(o,e,i){const s=o[0];if(s<=0||s>0)return o;const l=e*i;let f=nS[l];if(f===void 0&&(f=new Float32Array(l),nS[l]=f),e!==0){s.toArray(f,0);for(let h=1,d=0;h!==e;++h)d+=i,o[h].toArray(f,d)}return f}function gn(o,e){if(o.length!==e.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==e[i])return!1;return!0}function vn(o,e){for(let i=0,s=e.length;i<s;i++)o[i]=e[i]}function Ic(o,e){let i=iS[e];i===void 0&&(i=new Int32Array(e),iS[e]=i);for(let s=0;s!==e;++s)i[s]=o.allocateTextureUnit();return i}function NA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function LA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gn(i,e))return;o.uniform2fv(this.addr,e),vn(i,e)}}function OA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(gn(i,e))return;o.uniform3fv(this.addr,e),vn(i,e)}}function PA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gn(i,e))return;o.uniform4fv(this.addr,e),vn(i,e)}}function zA(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(gn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),vn(i,e)}else{if(gn(i,s))return;rS.set(s),o.uniformMatrix2fv(this.addr,!1,rS),vn(i,s)}}function IA(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(gn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),vn(i,e)}else{if(gn(i,s))return;sS.set(s),o.uniformMatrix3fv(this.addr,!1,sS),vn(i,s)}}function BA(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(gn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),vn(i,e)}else{if(gn(i,s))return;aS.set(s),o.uniformMatrix4fv(this.addr,!1,aS),vn(i,s)}}function FA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function HA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gn(i,e))return;o.uniform2iv(this.addr,e),vn(i,e)}}function GA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(gn(i,e))return;o.uniform3iv(this.addr,e),vn(i,e)}}function VA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gn(i,e))return;o.uniform4iv(this.addr,e),vn(i,e)}}function XA(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function kA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(gn(i,e))return;o.uniform2uiv(this.addr,e),vn(i,e)}}function YA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(gn(i,e))return;o.uniform3uiv(this.addr,e),vn(i,e)}}function qA(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(gn(i,e))return;o.uniform4uiv(this.addr,e),vn(i,e)}}function WA(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let f;this.type===o.SAMPLER_2D_SHADOW?(eS.compareFunction=LS,f=eS):f=ZS,i.setTexture2D(e||f,l)}function jA(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||QS,l)}function ZA(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||JS,l)}function KA(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||KS,l)}function QA(o){switch(o){case 5126:return NA;case 35664:return LA;case 35665:return OA;case 35666:return PA;case 35674:return zA;case 35675:return IA;case 35676:return BA;case 5124:case 35670:return FA;case 35667:case 35671:return HA;case 35668:case 35672:return GA;case 35669:case 35673:return VA;case 5125:return XA;case 36294:return kA;case 36295:return YA;case 36296:return qA;case 35678:case 36198:case 36298:case 36306:case 35682:return WA;case 35679:case 36299:case 36307:return jA;case 35680:case 36300:case 36308:case 36293:return ZA;case 36289:case 36303:case 36311:case 36292:return KA}}function JA(o,e){o.uniform1fv(this.addr,e)}function $A(o,e){const i=_o(e,this.size,2);o.uniform2fv(this.addr,i)}function tR(o,e){const i=_o(e,this.size,3);o.uniform3fv(this.addr,i)}function eR(o,e){const i=_o(e,this.size,4);o.uniform4fv(this.addr,i)}function nR(o,e){const i=_o(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function iR(o,e){const i=_o(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function aR(o,e){const i=_o(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function sR(o,e){o.uniform1iv(this.addr,e)}function rR(o,e){o.uniform2iv(this.addr,e)}function oR(o,e){o.uniform3iv(this.addr,e)}function lR(o,e){o.uniform4iv(this.addr,e)}function uR(o,e){o.uniform1uiv(this.addr,e)}function cR(o,e){o.uniform2uiv(this.addr,e)}function fR(o,e){o.uniform3uiv(this.addr,e)}function hR(o,e){o.uniform4uiv(this.addr,e)}function dR(o,e,i){const s=this.cache,l=e.length,f=Ic(i,l);gn(s,f)||(o.uniform1iv(this.addr,f),vn(s,f));for(let h=0;h!==l;++h)i.setTexture2D(e[h]||ZS,f[h])}function pR(o,e,i){const s=this.cache,l=e.length,f=Ic(i,l);gn(s,f)||(o.uniform1iv(this.addr,f),vn(s,f));for(let h=0;h!==l;++h)i.setTexture3D(e[h]||QS,f[h])}function mR(o,e,i){const s=this.cache,l=e.length,f=Ic(i,l);gn(s,f)||(o.uniform1iv(this.addr,f),vn(s,f));for(let h=0;h!==l;++h)i.setTextureCube(e[h]||JS,f[h])}function _R(o,e,i){const s=this.cache,l=e.length,f=Ic(i,l);gn(s,f)||(o.uniform1iv(this.addr,f),vn(s,f));for(let h=0;h!==l;++h)i.setTexture2DArray(e[h]||KS,f[h])}function gR(o){switch(o){case 5126:return JA;case 35664:return $A;case 35665:return tR;case 35666:return eR;case 35674:return nR;case 35675:return iR;case 35676:return aR;case 5124:case 35670:return sR;case 35667:case 35671:return rR;case 35668:case 35672:return oR;case 35669:case 35673:return lR;case 5125:return uR;case 36294:return cR;case 36295:return fR;case 36296:return hR;case 35678:case 36198:case 36298:case 36306:case 35682:return dR;case 35679:case 36299:case 36307:return pR;case 35680:case 36300:case 36308:case 36293:return mR;case 36289:case 36303:case 36311:case 36292:return _R}}class vR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=QA(i.type)}}class SR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=gR(i.type)}}class yR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let f=0,h=l.length;f!==h;++f){const d=l[f];d.setValue(e,i[d.id],s)}}}const qd=/(\w+)(\])?(\[|\.)?/g;function oS(o,e){o.seq.push(e),o.map[e.id]=e}function xR(o,e,i){const s=o.name,l=s.length;for(qd.lastIndex=0;;){const f=qd.exec(s),h=qd.lastIndex;let d=f[1];const p=f[2]==="]",g=f[3];if(p&&(d=d|0),g===void 0||g==="["&&h+2===l){oS(i,g===void 0?new vR(d,o,e):new SR(d,o,e));break}else{let m=i.map[d];m===void 0&&(m=new yR(d),oS(i,m)),i=m}}}class Nc{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const f=e.getActiveUniform(i,l),h=e.getUniformLocation(i,f.name);xR(f,h,this)}}setValue(e,i,s,l){const f=this.map[i];f!==void 0&&f.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let f=0,h=i.length;f!==h;++f){const d=i[f],p=s[d.id];p.needsUpdate!==!1&&d.setValue(e,p.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,f=e.length;l!==f;++l){const h=e[l];h.id in i&&s.push(h)}return s}}function lS(o,e,i){const s=o.createShader(e);return o.shaderSource(s,i),o.compileShader(s),s}const MR=37297;let ER=0;function TR(o,e){const i=o.split(`
`),s=[],l=Math.max(e-6,0),f=Math.min(e+6,i.length);for(let h=l;h<f;h++){const d=h+1;s.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const uS=new ge;function bR(o){Ue._getMatrix(uS,Ue.workingColorSpace,o);const e=`mat3( ${uS.elements.map(i=>i.toFixed(4))} )`;switch(Ue.getTransfer(o)){case Lc:return[e,"LinearTransferOETF"];case Ve:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function cS(o,e,i){const s=o.getShaderParameter(e,o.COMPILE_STATUS),l=o.getShaderInfoLog(e).trim();if(s&&l==="")return"";const f=/ERROR: 0:(\d+)/.exec(l);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+l+`

`+TR(o.getShaderSource(e),h)}else return l}function AR(o,e){const i=bR(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function RR(o,e){let i;switch(e){case hE:i="Linear";break;case dE:i="Reinhard";break;case pE:i="Cineon";break;case ES:i="ACESFilmic";break;case _E:i="AgX";break;case gE:i="Neutral";break;case mE:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Mc=new tt;function CR(){Ue.getLuminanceCoefficients(Mc);const o=Mc.x.toFixed(4),e=Mc.y.toFixed(4),i=Mc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wR(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gl).join(`
`)}function DR(o){const e=[];for(const i in o){const s=o[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function UR(o,e){const i={},s=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const f=o.getActiveAttrib(e,l),h=f.name;let d=1;f.type===o.FLOAT_MAT2&&(d=2),f.type===o.FLOAT_MAT3&&(d=3),f.type===o.FLOAT_MAT4&&(d=4),i[h]={type:f.type,location:o.getAttribLocation(e,h),locationSize:d}}return i}function gl(o){return o!==""}function fS(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function hS(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const NR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pp(o){return o.replace(NR,OR)}const LR=new Map;function OR(o,e){let i=ve[e];if(i===void 0){const s=LR.get(e);if(s!==void 0)i=ve[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Pp(i)}const PR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dS(o){return o.replace(PR,zR)}function zR(o,e,i,s){let l="";for(let f=parseInt(e);f<parseInt(i);f++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return l}function pS(o){let e=`precision ${o.precision} float;
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
#define LOW_PRECISION`),e}function IR(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===xS?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===MS?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Ma&&(e="SHADOWMAP_TYPE_VSM"),e}function BR(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case uo:case co:e="ENVMAP_TYPE_CUBE";break;case zc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function FR(o){let e="ENVMAP_MODE_REFLECTION";return o.envMap&&o.envMapMode===co&&(e="ENVMAP_MODE_REFRACTION"),e}function HR(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case Bp:e="ENVMAP_BLENDING_MULTIPLY";break;case cE:e="ENVMAP_BLENDING_MIX";break;case fE:e="ENVMAP_BLENDING_ADD";break}return e}function GR(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function VR(o,e,i,s){const l=o.getContext(),f=i.defines;let h=i.vertexShader,d=i.fragmentShader;const p=IR(i),g=BR(i),v=FR(i),m=HR(i),S=GR(i),M=wR(i),T=DR(f),A=l.createProgram();let x,y,O=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(gl).join(`
`),x.length>0&&(x+=`
`),y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(gl).join(`
`),y.length>0&&(y+=`
`)):(x=[pS(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gl).join(`
`),y=[pS(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.envMap?"#define "+v:"",i.envMap?"#define "+m:"",S?"#define CUBEUV_TEXEL_WIDTH "+S.texelWidth:"",S?"#define CUBEUV_TEXEL_HEIGHT "+S.texelHeight:"",S?"#define CUBEUV_MAX_MIP "+S.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==hs?"#define TONE_MAPPING":"",i.toneMapping!==hs?ve.tonemapping_pars_fragment:"",i.toneMapping!==hs?RR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ve.colorspace_pars_fragment,AR("linearToOutputTexel",i.outputColorSpace),CR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(gl).join(`
`)),h=Pp(h),h=fS(h,i),h=hS(h,i),d=Pp(d),d=fS(d,i),d=hS(d,i),h=dS(h),d=dS(d),i.isRawShaderMaterial!==!0&&(O=`#version 300 es
`,x=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,y=["#define varying in",i.glslVersion===Ev?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Ev?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const N=O+x+h,D=O+y+d,G=lS(l,l.VERTEX_SHADER,N),I=lS(l,l.FRAGMENT_SHADER,D);l.attachShader(A,G),l.attachShader(A,I),i.index0AttributeName!==void 0?l.bindAttribLocation(A,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(A,0,"position"),l.linkProgram(A);function L(H){if(o.debug.checkShaderErrors){const ot=l.getProgramInfoLog(A).trim(),st=l.getShaderInfoLog(G).trim(),mt=l.getShaderInfoLog(I).trim();let ct=!0,Y=!0;if(l.getProgramParameter(A,l.LINK_STATUS)===!1)if(ct=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,A,G,I);else{const it=cS(l,G,"vertex"),W=cS(l,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(A,l.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+ot+`
`+it+`
`+W)}else ot!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ot):(st===""||mt==="")&&(Y=!1);Y&&(H.diagnostics={runnable:ct,programLog:ot,vertexShader:{log:st,prefix:x},fragmentShader:{log:mt,prefix:y}})}l.deleteShader(G),l.deleteShader(I),F=new Nc(l,A),U=UR(l,A)}let F;this.getUniforms=function(){return F===void 0&&L(this),F};let U;this.getAttributes=function(){return U===void 0&&L(this),U};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(A,MR)),C},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(A),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=ER++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=G,this.fragmentShader=I,this}let XR=0;class kR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),f=this._getShaderStage(s),h=this._getShaderCacheForMaterial(e);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(f)===!1&&(h.add(f),f.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new YR(e),i.set(e,s)),s}}class YR{constructor(e){this.id=XR++,this.code=e,this.usedTimes=0}}function qR(o,e,i,s,l,f,h){const d=new IS,p=new kR,g=new Set,v=[],m=l.logarithmicDepthBuffer,S=l.vertexTextures;let M=l.precision;const T={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(U){return g.add(U),U===0?"uv":`uv${U}`}function x(U,C,H,ot,st){const mt=ot.fog,ct=st.geometry,Y=U.isMeshStandardMaterial?ot.environment:null,it=(U.isMeshStandardMaterial?i:e).get(U.envMap||Y),W=it&&it.mapping===zc?it.image.height:null,xt=T[U.type];U.precision!==null&&(M=l.getMaxPrecision(U.precision),M!==U.precision&&console.warn("THREE.WebGLProgram.getParameters:",U.precision,"not supported, using",M,"instead."));const yt=ct.morphAttributes.position||ct.morphAttributes.normal||ct.morphAttributes.color,Ft=yt!==void 0?yt.length:0;let ie=0;ct.morphAttributes.position!==void 0&&(ie=1),ct.morphAttributes.normal!==void 0&&(ie=2),ct.morphAttributes.color!==void 0&&(ie=3);let re,w,Z,_t;if(xt){const Re=qi[xt];re=Re.vertexShader,w=Re.fragmentShader}else re=U.vertexShader,w=U.fragmentShader,p.update(U),Z=p.getVertexShaderID(U),_t=p.getFragmentShaderID(U);const ut=o.getRenderTarget(),Tt=o.state.buffers.depth.getReversed(),It=st.isInstancedMesh===!0,lt=st.isBatchedMesh===!0,gt=!!U.map,Ct=!!U.matcap,qt=!!it,B=!!U.aoMap,We=!!U.lightMap,le=!!U.bumpMap,ae=!!U.normalMap,bt=!!U.displacementMap,fe=!!U.emissiveMap,jt=!!U.metalnessMap,$t=!!U.roughnessMap,$e=U.anisotropy>0,P=U.clearcoat>0,b=U.dispersion>0,et=U.iridescence>0,pt=U.sheen>0,St=U.transmission>0,ft=$e&&!!U.anisotropyMap,Vt=P&&!!U.clearcoatMap,Lt=P&&!!U.clearcoatNormalMap,Yt=P&&!!U.clearcoatRoughnessMap,Zt=et&&!!U.iridescenceMap,Mt=et&&!!U.iridescenceThicknessMap,Bt=pt&&!!U.sheenColorMap,ee=pt&&!!U.sheenRoughnessMap,Jt=!!U.specularMap,Ot=!!U.specularColorMap,ue=!!U.specularIntensityMap,X=St&&!!U.transmissionMap,zt=St&&!!U.thicknessMap,Et=!!U.gradientMap,Gt=!!U.alphaMap,At=U.alphaTest>0,vt=!!U.alphaHash,Xt=!!U.extensions;let he=hs;U.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(he=o.toneMapping);const ke={shaderID:xt,shaderType:U.type,shaderName:U.name,vertexShader:re,fragmentShader:w,defines:U.defines,customVertexShaderID:Z,customFragmentShaderID:_t,isRawShaderMaterial:U.isRawShaderMaterial===!0,glslVersion:U.glslVersion,precision:M,batching:lt,batchingColor:lt&&st._colorsTexture!==null,instancing:It,instancingColor:It&&st.instanceColor!==null,instancingMorph:It&&st.morphTexture!==null,supportsVertexTextures:S,outputColorSpace:ut===null?o.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:fo,alphaToCoverage:!!U.alphaToCoverage,map:gt,matcap:Ct,envMap:qt,envMapMode:qt&&it.mapping,envMapCubeUVHeight:W,aoMap:B,lightMap:We,bumpMap:le,normalMap:ae,displacementMap:S&&bt,emissiveMap:fe,normalMapObjectSpace:ae&&U.normalMapType===xE,normalMapTangentSpace:ae&&U.normalMapType===NS,metalnessMap:jt,roughnessMap:$t,anisotropy:$e,anisotropyMap:ft,clearcoat:P,clearcoatMap:Vt,clearcoatNormalMap:Lt,clearcoatRoughnessMap:Yt,dispersion:b,iridescence:et,iridescenceMap:Zt,iridescenceThicknessMap:Mt,sheen:pt,sheenColorMap:Bt,sheenRoughnessMap:ee,specularMap:Jt,specularColorMap:Ot,specularIntensityMap:ue,transmission:St,transmissionMap:X,thicknessMap:zt,gradientMap:Et,opaque:U.transparent===!1&&U.blending===so&&U.alphaToCoverage===!1,alphaMap:Gt,alphaTest:At,alphaHash:vt,combine:U.combine,mapUv:gt&&A(U.map.channel),aoMapUv:B&&A(U.aoMap.channel),lightMapUv:We&&A(U.lightMap.channel),bumpMapUv:le&&A(U.bumpMap.channel),normalMapUv:ae&&A(U.normalMap.channel),displacementMapUv:bt&&A(U.displacementMap.channel),emissiveMapUv:fe&&A(U.emissiveMap.channel),metalnessMapUv:jt&&A(U.metalnessMap.channel),roughnessMapUv:$t&&A(U.roughnessMap.channel),anisotropyMapUv:ft&&A(U.anisotropyMap.channel),clearcoatMapUv:Vt&&A(U.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&A(U.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Yt&&A(U.clearcoatRoughnessMap.channel),iridescenceMapUv:Zt&&A(U.iridescenceMap.channel),iridescenceThicknessMapUv:Mt&&A(U.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&A(U.sheenColorMap.channel),sheenRoughnessMapUv:ee&&A(U.sheenRoughnessMap.channel),specularMapUv:Jt&&A(U.specularMap.channel),specularColorMapUv:Ot&&A(U.specularColorMap.channel),specularIntensityMapUv:ue&&A(U.specularIntensityMap.channel),transmissionMapUv:X&&A(U.transmissionMap.channel),thicknessMapUv:zt&&A(U.thicknessMap.channel),alphaMapUv:Gt&&A(U.alphaMap.channel),vertexTangents:!!ct.attributes.tangent&&(ae||$e),vertexColors:U.vertexColors,vertexAlphas:U.vertexColors===!0&&!!ct.attributes.color&&ct.attributes.color.itemSize===4,pointsUvs:st.isPoints===!0&&!!ct.attributes.uv&&(gt||Gt),fog:!!mt,useFog:U.fog===!0,fogExp2:!!mt&&mt.isFogExp2,flatShading:U.flatShading===!0&&U.wireframe===!1,sizeAttenuation:U.sizeAttenuation===!0,logarithmicDepthBuffer:m,reverseDepthBuffer:Tt,skinning:st.isSkinnedMesh===!0,morphTargets:ct.morphAttributes.position!==void 0,morphNormals:ct.morphAttributes.normal!==void 0,morphColors:ct.morphAttributes.color!==void 0,morphTargetsCount:Ft,morphTextureStride:ie,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:U.dithering,shadowMapEnabled:o.shadowMap.enabled&&H.length>0,shadowMapType:o.shadowMap.type,toneMapping:he,decodeVideoTexture:gt&&U.map.isVideoTexture===!0&&Ue.getTransfer(U.map.colorSpace)===Ve,decodeVideoTextureEmissive:fe&&U.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(U.emissiveMap.colorSpace)===Ve,premultipliedAlpha:U.premultipliedAlpha,doubleSided:U.side===Ta,flipSided:U.side===kn,useDepthPacking:U.depthPacking>=0,depthPacking:U.depthPacking||0,index0AttributeName:U.index0AttributeName,extensionClipCullDistance:Xt&&U.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&U.extensions.multiDraw===!0||lt)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:U.customProgramCacheKey()};return ke.vertexUv1s=g.has(1),ke.vertexUv2s=g.has(2),ke.vertexUv3s=g.has(3),g.clear(),ke}function y(U){const C=[];if(U.shaderID?C.push(U.shaderID):(C.push(U.customVertexShaderID),C.push(U.customFragmentShaderID)),U.defines!==void 0)for(const H in U.defines)C.push(H),C.push(U.defines[H]);return U.isRawShaderMaterial===!1&&(O(C,U),N(C,U),C.push(o.outputColorSpace)),C.push(U.customProgramCacheKey),C.join()}function O(U,C){U.push(C.precision),U.push(C.outputColorSpace),U.push(C.envMapMode),U.push(C.envMapCubeUVHeight),U.push(C.mapUv),U.push(C.alphaMapUv),U.push(C.lightMapUv),U.push(C.aoMapUv),U.push(C.bumpMapUv),U.push(C.normalMapUv),U.push(C.displacementMapUv),U.push(C.emissiveMapUv),U.push(C.metalnessMapUv),U.push(C.roughnessMapUv),U.push(C.anisotropyMapUv),U.push(C.clearcoatMapUv),U.push(C.clearcoatNormalMapUv),U.push(C.clearcoatRoughnessMapUv),U.push(C.iridescenceMapUv),U.push(C.iridescenceThicknessMapUv),U.push(C.sheenColorMapUv),U.push(C.sheenRoughnessMapUv),U.push(C.specularMapUv),U.push(C.specularColorMapUv),U.push(C.specularIntensityMapUv),U.push(C.transmissionMapUv),U.push(C.thicknessMapUv),U.push(C.combine),U.push(C.fogExp2),U.push(C.sizeAttenuation),U.push(C.morphTargetsCount),U.push(C.morphAttributeCount),U.push(C.numDirLights),U.push(C.numPointLights),U.push(C.numSpotLights),U.push(C.numSpotLightMaps),U.push(C.numHemiLights),U.push(C.numRectAreaLights),U.push(C.numDirLightShadows),U.push(C.numPointLightShadows),U.push(C.numSpotLightShadows),U.push(C.numSpotLightShadowsWithMaps),U.push(C.numLightProbes),U.push(C.shadowMapType),U.push(C.toneMapping),U.push(C.numClippingPlanes),U.push(C.numClipIntersection),U.push(C.depthPacking)}function N(U,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),C.gradientMap&&d.enable(22),U.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reverseDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),U.push(d.mask)}function D(U){const C=T[U.type];let H;if(C){const ot=qi[C];H=dT.clone(ot.uniforms)}else H=U.uniforms;return H}function G(U,C){let H;for(let ot=0,st=v.length;ot<st;ot++){const mt=v[ot];if(mt.cacheKey===C){H=mt,++H.usedTimes;break}}return H===void 0&&(H=new VR(o,C,U,f),v.push(H)),H}function I(U){if(--U.usedTimes===0){const C=v.indexOf(U);v[C]=v[v.length-1],v.pop(),U.destroy()}}function L(U){p.remove(U)}function F(){p.dispose()}return{getParameters:x,getProgramCacheKey:y,getUniforms:D,acquireProgram:G,releaseProgram:I,releaseShaderCache:L,programs:v,dispose:F}}function WR(){let o=new WeakMap;function e(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function s(h){o.delete(h)}function l(h,d,p){o.get(h)[d]=p}function f(){o=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:f}}function jR(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function mS(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function _S(){const o=[];let e=0;const i=[],s=[],l=[];function f(){e=0,i.length=0,s.length=0,l.length=0}function h(m,S,M,T,A,x){let y=o[e];return y===void 0?(y={id:m.id,object:m,geometry:S,material:M,groupOrder:T,renderOrder:m.renderOrder,z:A,group:x},o[e]=y):(y.id=m.id,y.object=m,y.geometry=S,y.material=M,y.groupOrder=T,y.renderOrder=m.renderOrder,y.z=A,y.group=x),e++,y}function d(m,S,M,T,A,x){const y=h(m,S,M,T,A,x);M.transmission>0?s.push(y):M.transparent===!0?l.push(y):i.push(y)}function p(m,S,M,T,A,x){const y=h(m,S,M,T,A,x);M.transmission>0?s.unshift(y):M.transparent===!0?l.unshift(y):i.unshift(y)}function g(m,S){i.length>1&&i.sort(m||jR),s.length>1&&s.sort(S||mS),l.length>1&&l.sort(S||mS)}function v(){for(let m=e,S=o.length;m<S;m++){const M=o[m];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:f,push:d,unshift:p,finish:v,sort:g}}function ZR(){let o=new WeakMap;function e(s,l){const f=o.get(s);let h;return f===void 0?(h=new _S,o.set(s,[h])):l>=f.length?(h=new _S,f.push(h)):h=f[l],h}function i(){o=new WeakMap}return{get:e,dispose:i}}function KR(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new tt,color:new ne};break;case"SpotLight":i={position:new tt,direction:new tt,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new tt,color:new ne,distance:0,decay:0};break;case"HemisphereLight":i={direction:new tt,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":i={color:new ne,position:new tt,halfWidth:new tt,halfHeight:new tt};break}return o[e.id]=i,i}}}function QR(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let JR=0;function $R(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function tC(o){const e=new KR,i=QR(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let g=0;g<9;g++)s.probe.push(new tt);const l=new tt,f=new Ke,h=new Ke;function d(g){let v=0,m=0,S=0;for(let U=0;U<9;U++)s.probe[U].set(0,0,0);let M=0,T=0,A=0,x=0,y=0,O=0,N=0,D=0,G=0,I=0,L=0;g.sort($R);for(let U=0,C=g.length;U<C;U++){const H=g[U],ot=H.color,st=H.intensity,mt=H.distance,ct=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)v+=ot.r*st,m+=ot.g*st,S+=ot.b*st;else if(H.isLightProbe){for(let Y=0;Y<9;Y++)s.probe[Y].addScaledVector(H.sh.coefficients[Y],st);L++}else if(H.isDirectionalLight){const Y=e.get(H);if(Y.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const it=H.shadow,W=i.get(H);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,s.directionalShadow[M]=W,s.directionalShadowMap[M]=ct,s.directionalShadowMatrix[M]=H.shadow.matrix,O++}s.directional[M]=Y,M++}else if(H.isSpotLight){const Y=e.get(H);Y.position.setFromMatrixPosition(H.matrixWorld),Y.color.copy(ot).multiplyScalar(st),Y.distance=mt,Y.coneCos=Math.cos(H.angle),Y.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),Y.decay=H.decay,s.spot[A]=Y;const it=H.shadow;if(H.map&&(s.spotLightMap[G]=H.map,G++,it.updateMatrices(H),H.castShadow&&I++),s.spotLightMatrix[A]=it.matrix,H.castShadow){const W=i.get(H);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,s.spotShadow[A]=W,s.spotShadowMap[A]=ct,D++}A++}else if(H.isRectAreaLight){const Y=e.get(H);Y.color.copy(ot).multiplyScalar(st),Y.halfWidth.set(H.width*.5,0,0),Y.halfHeight.set(0,H.height*.5,0),s.rectArea[x]=Y,x++}else if(H.isPointLight){const Y=e.get(H);if(Y.color.copy(H.color).multiplyScalar(H.intensity),Y.distance=H.distance,Y.decay=H.decay,H.castShadow){const it=H.shadow,W=i.get(H);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,W.shadowCameraNear=it.camera.near,W.shadowCameraFar=it.camera.far,s.pointShadow[T]=W,s.pointShadowMap[T]=ct,s.pointShadowMatrix[T]=H.shadow.matrix,N++}s.point[T]=Y,T++}else if(H.isHemisphereLight){const Y=e.get(H);Y.skyColor.copy(H.color).multiplyScalar(st),Y.groundColor.copy(H.groundColor).multiplyScalar(st),s.hemi[y]=Y,y++}}x>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Pt.LTC_FLOAT_1,s.rectAreaLTC2=Pt.LTC_FLOAT_2):(s.rectAreaLTC1=Pt.LTC_HALF_1,s.rectAreaLTC2=Pt.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=m,s.ambient[2]=S;const F=s.hash;(F.directionalLength!==M||F.pointLength!==T||F.spotLength!==A||F.rectAreaLength!==x||F.hemiLength!==y||F.numDirectionalShadows!==O||F.numPointShadows!==N||F.numSpotShadows!==D||F.numSpotMaps!==G||F.numLightProbes!==L)&&(s.directional.length=M,s.spot.length=A,s.rectArea.length=x,s.point.length=T,s.hemi.length=y,s.directionalShadow.length=O,s.directionalShadowMap.length=O,s.pointShadow.length=N,s.pointShadowMap.length=N,s.spotShadow.length=D,s.spotShadowMap.length=D,s.directionalShadowMatrix.length=O,s.pointShadowMatrix.length=N,s.spotLightMatrix.length=D+G-I,s.spotLightMap.length=G,s.numSpotLightShadowsWithMaps=I,s.numLightProbes=L,F.directionalLength=M,F.pointLength=T,F.spotLength=A,F.rectAreaLength=x,F.hemiLength=y,F.numDirectionalShadows=O,F.numPointShadows=N,F.numSpotShadows=D,F.numSpotMaps=G,F.numLightProbes=L,s.version=JR++)}function p(g,v){let m=0,S=0,M=0,T=0,A=0;const x=v.matrixWorldInverse;for(let y=0,O=g.length;y<O;y++){const N=g[y];if(N.isDirectionalLight){const D=s.directional[m];D.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(x),m++}else if(N.isSpotLight){const D=s.spot[M];D.position.setFromMatrixPosition(N.matrixWorld),D.position.applyMatrix4(x),D.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(x),M++}else if(N.isRectAreaLight){const D=s.rectArea[T];D.position.setFromMatrixPosition(N.matrixWorld),D.position.applyMatrix4(x),h.identity(),f.copy(N.matrixWorld),f.premultiply(x),h.extractRotation(f),D.halfWidth.set(N.width*.5,0,0),D.halfHeight.set(0,N.height*.5,0),D.halfWidth.applyMatrix4(h),D.halfHeight.applyMatrix4(h),T++}else if(N.isPointLight){const D=s.point[S];D.position.setFromMatrixPosition(N.matrixWorld),D.position.applyMatrix4(x),S++}else if(N.isHemisphereLight){const D=s.hemi[A];D.direction.setFromMatrixPosition(N.matrixWorld),D.direction.transformDirection(x),A++}}}return{setup:d,setupView:p,state:s}}function gS(o){const e=new tC(o),i=[],s=[];function l(v){g.camera=v,i.length=0,s.length=0}function f(v){i.push(v)}function h(v){s.push(v)}function d(){e.setup(i)}function p(v){e.setupView(i,v)}const g={lightsArray:i,shadowsArray:s,camera:null,lights:e,transmissionRenderTarget:{}};return{init:l,state:g,setupLights:d,setupLightsView:p,pushLight:f,pushShadow:h}}function eC(o){let e=new WeakMap;function i(l,f=0){const h=e.get(l);let d;return h===void 0?(d=new gS(o),e.set(l,[d])):f>=h.length?(d=new gS(o),h.push(d)):d=h[f],d}function s(){e=new WeakMap}return{get:i,dispose:s}}const nC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iC=`uniform sampler2D shadow_pass;
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
}`;function aC(o,e,i){let s=new Kp;const l=new me,f=new me,h=new sn,d=new bT({depthPacking:yE}),p=new AT,g={},v=i.maxTextureSize,m={[ds]:kn,[kn]:ds,[Ta]:Ta},S=new Ra({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:nC,fragmentShader:iC}),M=S.clone();M.defines.HORIZONTAL_PASS=1;const T=new ps;T.setAttribute("position",new Li(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new li(T,S),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xS;let y=this.type;this.render=function(I,L,F){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||I.length===0)return;const U=o.getRenderTarget(),C=o.getActiveCubeFace(),H=o.getActiveMipmapLevel(),ot=o.state;ot.setBlending(fs),ot.buffers.color.setClear(1,1,1,1),ot.buffers.depth.setTest(!0),ot.setScissorTest(!1);const st=y!==Ma&&this.type===Ma,mt=y===Ma&&this.type!==Ma;for(let ct=0,Y=I.length;ct<Y;ct++){const it=I[ct],W=it.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;l.copy(W.mapSize);const xt=W.getFrameExtents();if(l.multiply(xt),f.copy(W.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(f.x=Math.floor(v/xt.x),l.x=f.x*xt.x,W.mapSize.x=f.x),l.y>v&&(f.y=Math.floor(v/xt.y),l.y=f.y*xt.y,W.mapSize.y=f.y)),W.map===null||st===!0||mt===!0){const Ft=this.type!==Ma?{minFilter:ui,magFilter:ui}:{};W.map!==null&&W.map.dispose(),W.map=new Qs(l.x,l.y,Ft),W.map.texture.name=it.name+".shadowMap",W.camera.updateProjectionMatrix()}o.setRenderTarget(W.map),o.clear();const yt=W.getViewportCount();for(let Ft=0;Ft<yt;Ft++){const ie=W.getViewport(Ft);h.set(f.x*ie.x,f.y*ie.y,f.x*ie.z,f.y*ie.w),ot.viewport(h),W.updateMatrices(it,Ft),s=W.getFrustum(),D(L,F,W.camera,it,this.type)}W.isPointLightShadow!==!0&&this.type===Ma&&O(W,F),W.needsUpdate=!1}y=this.type,x.needsUpdate=!1,o.setRenderTarget(U,C,H)};function O(I,L){const F=e.update(A);S.defines.VSM_SAMPLES!==I.blurSamples&&(S.defines.VSM_SAMPLES=I.blurSamples,M.defines.VSM_SAMPLES=I.blurSamples,S.needsUpdate=!0,M.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Qs(l.x,l.y)),S.uniforms.shadow_pass.value=I.map.texture,S.uniforms.resolution.value=I.mapSize,S.uniforms.radius.value=I.radius,o.setRenderTarget(I.mapPass),o.clear(),o.renderBufferDirect(L,null,F,S,A,null),M.uniforms.shadow_pass.value=I.mapPass.texture,M.uniforms.resolution.value=I.mapSize,M.uniforms.radius.value=I.radius,o.setRenderTarget(I.map),o.clear(),o.renderBufferDirect(L,null,F,M,A,null)}function N(I,L,F,U){let C=null;const H=F.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(H!==void 0)C=H;else if(C=F.isPointLight===!0?p:d,o.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const ot=C.uuid,st=L.uuid;let mt=g[ot];mt===void 0&&(mt={},g[ot]=mt);let ct=mt[st];ct===void 0&&(ct=C.clone(),mt[st]=ct,L.addEventListener("dispose",G)),C=ct}if(C.visible=L.visible,C.wireframe=L.wireframe,U===Ma?C.side=L.shadowSide!==null?L.shadowSide:L.side:C.side=L.shadowSide!==null?L.shadowSide:m[L.side],C.alphaMap=L.alphaMap,C.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,C.map=L.map,C.clipShadows=L.clipShadows,C.clippingPlanes=L.clippingPlanes,C.clipIntersection=L.clipIntersection,C.displacementMap=L.displacementMap,C.displacementScale=L.displacementScale,C.displacementBias=L.displacementBias,C.wireframeLinewidth=L.wireframeLinewidth,C.linewidth=L.linewidth,F.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const ot=o.properties.get(C);ot.light=F}return C}function D(I,L,F,U,C){if(I.visible===!1)return;if(I.layers.test(L.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&C===Ma)&&(!I.frustumCulled||s.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,I.matrixWorld);const st=e.update(I),mt=I.material;if(Array.isArray(mt)){const ct=st.groups;for(let Y=0,it=ct.length;Y<it;Y++){const W=ct[Y],xt=mt[W.materialIndex];if(xt&&xt.visible){const yt=N(I,xt,U,C);I.onBeforeShadow(o,I,L,F,st,yt,W),o.renderBufferDirect(F,null,st,yt,I,W),I.onAfterShadow(o,I,L,F,st,yt,W)}}}else if(mt.visible){const ct=N(I,mt,U,C);I.onBeforeShadow(o,I,L,F,st,ct,null),o.renderBufferDirect(F,null,st,ct,I,null),I.onAfterShadow(o,I,L,F,st,ct,null)}}const ot=I.children;for(let st=0,mt=ot.length;st<mt;st++)D(ot[st],L,F,U,C)}function G(I){I.target.removeEventListener("dispose",G);for(const F in g){const U=g[F],C=I.target.uuid;C in U&&(U[C].dispose(),delete U[C])}}}const sC={[Qd]:Jd,[$d]:np,[tp]:ip,[lo]:ep,[Jd]:Qd,[np]:$d,[ip]:tp,[ep]:lo};function rC(o,e){function i(){let X=!1;const zt=new sn;let Et=null;const Gt=new sn(0,0,0,0);return{setMask:function(At){Et!==At&&!X&&(o.colorMask(At,At,At,At),Et=At)},setLocked:function(At){X=At},setClear:function(At,vt,Xt,he,ke){ke===!0&&(At*=he,vt*=he,Xt*=he),zt.set(At,vt,Xt,he),Gt.equals(zt)===!1&&(o.clearColor(At,vt,Xt,he),Gt.copy(zt))},reset:function(){X=!1,Et=null,Gt.set(-1,0,0,0)}}}function s(){let X=!1,zt=!1,Et=null,Gt=null,At=null;return{setReversed:function(vt){if(zt!==vt){const Xt=e.get("EXT_clip_control");vt?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT),zt=vt;const he=At;At=null,this.setClear(he)}},getReversed:function(){return zt},setTest:function(vt){vt?ut(o.DEPTH_TEST):Tt(o.DEPTH_TEST)},setMask:function(vt){Et!==vt&&!X&&(o.depthMask(vt),Et=vt)},setFunc:function(vt){if(zt&&(vt=sC[vt]),Gt!==vt){switch(vt){case Qd:o.depthFunc(o.NEVER);break;case Jd:o.depthFunc(o.ALWAYS);break;case $d:o.depthFunc(o.LESS);break;case lo:o.depthFunc(o.LEQUAL);break;case tp:o.depthFunc(o.EQUAL);break;case ep:o.depthFunc(o.GEQUAL);break;case np:o.depthFunc(o.GREATER);break;case ip:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Gt=vt}},setLocked:function(vt){X=vt},setClear:function(vt){At!==vt&&(zt&&(vt=1-vt),o.clearDepth(vt),At=vt)},reset:function(){X=!1,Et=null,Gt=null,At=null,zt=!1}}}function l(){let X=!1,zt=null,Et=null,Gt=null,At=null,vt=null,Xt=null,he=null,ke=null;return{setTest:function(Re){X||(Re?ut(o.STENCIL_TEST):Tt(o.STENCIL_TEST))},setMask:function(Re){zt!==Re&&!X&&(o.stencilMask(Re),zt=Re)},setFunc:function(Re,Qe,Sn){(Et!==Re||Gt!==Qe||At!==Sn)&&(o.stencilFunc(Re,Qe,Sn),Et=Re,Gt=Qe,At=Sn)},setOp:function(Re,Qe,Sn){(vt!==Re||Xt!==Qe||he!==Sn)&&(o.stencilOp(Re,Qe,Sn),vt=Re,Xt=Qe,he=Sn)},setLocked:function(Re){X=Re},setClear:function(Re){ke!==Re&&(o.clearStencil(Re),ke=Re)},reset:function(){X=!1,zt=null,Et=null,Gt=null,At=null,vt=null,Xt=null,he=null,ke=null}}}const f=new i,h=new s,d=new l,p=new WeakMap,g=new WeakMap;let v={},m={},S=new WeakMap,M=[],T=null,A=!1,x=null,y=null,O=null,N=null,D=null,G=null,I=null,L=new ne(0,0,0),F=0,U=!1,C=null,H=null,ot=null,st=null,mt=null;const ct=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,it=0;const W=o.getParameter(o.VERSION);W.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(W)[1]),Y=it>=1):W.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Y=it>=2);let xt=null,yt={};const Ft=o.getParameter(o.SCISSOR_BOX),ie=o.getParameter(o.VIEWPORT),re=new sn().fromArray(Ft),w=new sn().fromArray(ie);function Z(X,zt,Et,Gt){const At=new Uint8Array(4),vt=o.createTexture();o.bindTexture(X,vt),o.texParameteri(X,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(X,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Xt=0;Xt<Et;Xt++)X===o.TEXTURE_3D||X===o.TEXTURE_2D_ARRAY?o.texImage3D(zt,0,o.RGBA,1,1,Gt,0,o.RGBA,o.UNSIGNED_BYTE,At):o.texImage2D(zt+Xt,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,At);return vt}const _t={};_t[o.TEXTURE_2D]=Z(o.TEXTURE_2D,o.TEXTURE_2D,1),_t[o.TEXTURE_CUBE_MAP]=Z(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[o.TEXTURE_2D_ARRAY]=Z(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),_t[o.TEXTURE_3D]=Z(o.TEXTURE_3D,o.TEXTURE_3D,1,1),f.setClear(0,0,0,1),h.setClear(1),d.setClear(0),ut(o.DEPTH_TEST),h.setFunc(lo),le(!1),ae(gv),ut(o.CULL_FACE),B(fs);function ut(X){v[X]!==!0&&(o.enable(X),v[X]=!0)}function Tt(X){v[X]!==!1&&(o.disable(X),v[X]=!1)}function It(X,zt){return m[X]!==zt?(o.bindFramebuffer(X,zt),m[X]=zt,X===o.DRAW_FRAMEBUFFER&&(m[o.FRAMEBUFFER]=zt),X===o.FRAMEBUFFER&&(m[o.DRAW_FRAMEBUFFER]=zt),!0):!1}function lt(X,zt){let Et=M,Gt=!1;if(X){Et=S.get(zt),Et===void 0&&(Et=[],S.set(zt,Et));const At=X.textures;if(Et.length!==At.length||Et[0]!==o.COLOR_ATTACHMENT0){for(let vt=0,Xt=At.length;vt<Xt;vt++)Et[vt]=o.COLOR_ATTACHMENT0+vt;Et.length=At.length,Gt=!0}}else Et[0]!==o.BACK&&(Et[0]=o.BACK,Gt=!0);Gt&&o.drawBuffers(Et)}function gt(X){return T!==X?(o.useProgram(X),T=X,!0):!1}const Ct={[Ys]:o.FUNC_ADD,[WM]:o.FUNC_SUBTRACT,[jM]:o.FUNC_REVERSE_SUBTRACT};Ct[ZM]=o.MIN,Ct[KM]=o.MAX;const qt={[QM]:o.ZERO,[JM]:o.ONE,[$M]:o.SRC_COLOR,[Zd]:o.SRC_ALPHA,[sE]:o.SRC_ALPHA_SATURATE,[iE]:o.DST_COLOR,[eE]:o.DST_ALPHA,[tE]:o.ONE_MINUS_SRC_COLOR,[Kd]:o.ONE_MINUS_SRC_ALPHA,[aE]:o.ONE_MINUS_DST_COLOR,[nE]:o.ONE_MINUS_DST_ALPHA,[rE]:o.CONSTANT_COLOR,[oE]:o.ONE_MINUS_CONSTANT_COLOR,[lE]:o.CONSTANT_ALPHA,[uE]:o.ONE_MINUS_CONSTANT_ALPHA};function B(X,zt,Et,Gt,At,vt,Xt,he,ke,Re){if(X===fs){A===!0&&(Tt(o.BLEND),A=!1);return}if(A===!1&&(ut(o.BLEND),A=!0),X!==qM){if(X!==x||Re!==U){if((y!==Ys||D!==Ys)&&(o.blendEquation(o.FUNC_ADD),y=Ys,D=Ys),Re)switch(X){case so:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case vv:o.blendFunc(o.ONE,o.ONE);break;case Sv:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case yv:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case so:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case vv:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case Sv:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yv:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}O=null,N=null,G=null,I=null,L.set(0,0,0),F=0,x=X,U=Re}return}At=At||zt,vt=vt||Et,Xt=Xt||Gt,(zt!==y||At!==D)&&(o.blendEquationSeparate(Ct[zt],Ct[At]),y=zt,D=At),(Et!==O||Gt!==N||vt!==G||Xt!==I)&&(o.blendFuncSeparate(qt[Et],qt[Gt],qt[vt],qt[Xt]),O=Et,N=Gt,G=vt,I=Xt),(he.equals(L)===!1||ke!==F)&&(o.blendColor(he.r,he.g,he.b,ke),L.copy(he),F=ke),x=X,U=!1}function We(X,zt){X.side===Ta?Tt(o.CULL_FACE):ut(o.CULL_FACE);let Et=X.side===kn;zt&&(Et=!Et),le(Et),X.blending===so&&X.transparent===!1?B(fs):B(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),h.setFunc(X.depthFunc),h.setTest(X.depthTest),h.setMask(X.depthWrite),f.setMask(X.colorWrite);const Gt=X.stencilWrite;d.setTest(Gt),Gt&&(d.setMask(X.stencilWriteMask),d.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),d.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),fe(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?ut(o.SAMPLE_ALPHA_TO_COVERAGE):Tt(o.SAMPLE_ALPHA_TO_COVERAGE)}function le(X){C!==X&&(X?o.frontFace(o.CW):o.frontFace(o.CCW),C=X)}function ae(X){X!==kM?(ut(o.CULL_FACE),X!==H&&(X===gv?o.cullFace(o.BACK):X===YM?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Tt(o.CULL_FACE),H=X}function bt(X){X!==ot&&(Y&&o.lineWidth(X),ot=X)}function fe(X,zt,Et){X?(ut(o.POLYGON_OFFSET_FILL),(st!==zt||mt!==Et)&&(o.polygonOffset(zt,Et),st=zt,mt=Et)):Tt(o.POLYGON_OFFSET_FILL)}function jt(X){X?ut(o.SCISSOR_TEST):Tt(o.SCISSOR_TEST)}function $t(X){X===void 0&&(X=o.TEXTURE0+ct-1),xt!==X&&(o.activeTexture(X),xt=X)}function $e(X,zt,Et){Et===void 0&&(xt===null?Et=o.TEXTURE0+ct-1:Et=xt);let Gt=yt[Et];Gt===void 0&&(Gt={type:void 0,texture:void 0},yt[Et]=Gt),(Gt.type!==X||Gt.texture!==zt)&&(xt!==Et&&(o.activeTexture(Et),xt=Et),o.bindTexture(X,zt||_t[X]),Gt.type=X,Gt.texture=zt)}function P(){const X=yt[xt];X!==void 0&&X.type!==void 0&&(o.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function b(){try{o.compressedTexImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function et(){try{o.compressedTexImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function pt(){try{o.texSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function St(){try{o.texSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ft(){try{o.compressedTexSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Vt(){try{o.compressedTexSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Lt(){try{o.texStorage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Yt(){try{o.texStorage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Zt(){try{o.texImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Mt(){try{o.texImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Bt(X){re.equals(X)===!1&&(o.scissor(X.x,X.y,X.z,X.w),re.copy(X))}function ee(X){w.equals(X)===!1&&(o.viewport(X.x,X.y,X.z,X.w),w.copy(X))}function Jt(X,zt){let Et=g.get(zt);Et===void 0&&(Et=new WeakMap,g.set(zt,Et));let Gt=Et.get(X);Gt===void 0&&(Gt=o.getUniformBlockIndex(zt,X.name),Et.set(X,Gt))}function Ot(X,zt){const Gt=g.get(zt).get(X);p.get(zt)!==Gt&&(o.uniformBlockBinding(zt,Gt,X.__bindingPointIndex),p.set(zt,Gt))}function ue(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),v={},xt=null,yt={},m={},S=new WeakMap,M=[],T=null,A=!1,x=null,y=null,O=null,N=null,D=null,G=null,I=null,L=new ne(0,0,0),F=0,U=!1,C=null,H=null,ot=null,st=null,mt=null,re.set(0,0,o.canvas.width,o.canvas.height),w.set(0,0,o.canvas.width,o.canvas.height),f.reset(),h.reset(),d.reset()}return{buffers:{color:f,depth:h,stencil:d},enable:ut,disable:Tt,bindFramebuffer:It,drawBuffers:lt,useProgram:gt,setBlending:B,setMaterial:We,setFlipSided:le,setCullFace:ae,setLineWidth:bt,setPolygonOffset:fe,setScissorTest:jt,activeTexture:$t,bindTexture:$e,unbindTexture:P,compressedTexImage2D:b,compressedTexImage3D:et,texImage2D:Zt,texImage3D:Mt,updateUBOMapping:Jt,uniformBlockBinding:Ot,texStorage2D:Lt,texStorage3D:Yt,texSubImage2D:pt,texSubImage3D:St,compressedTexSubImage2D:ft,compressedTexSubImage3D:Vt,scissor:Bt,viewport:ee,reset:ue}}function oC(o,e,i,s,l,f,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new me,v=new WeakMap;let m;const S=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(P,b){return M?new OffscreenCanvas(P,b):Pc("canvas")}function A(P,b,et){let pt=1;const St=$e(P);if((St.width>et||St.height>et)&&(pt=et/Math.max(St.width,St.height)),pt<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ft=Math.floor(pt*St.width),Vt=Math.floor(pt*St.height);m===void 0&&(m=T(ft,Vt));const Lt=b?T(ft,Vt):m;return Lt.width=ft,Lt.height=Vt,Lt.getContext("2d").drawImage(P,0,0,ft,Vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+St.width+"x"+St.height+") to ("+ft+"x"+Vt+")."),Lt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+St.width+"x"+St.height+")."),P;return P}function x(P){return P.generateMipmaps}function y(P){o.generateMipmap(P)}function O(P){return P.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?o.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function N(P,b,et,pt,St=!1){if(P!==null){if(o[P]!==void 0)return o[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ft=b;if(b===o.RED&&(et===o.FLOAT&&(ft=o.R32F),et===o.HALF_FLOAT&&(ft=o.R16F),et===o.UNSIGNED_BYTE&&(ft=o.R8)),b===o.RED_INTEGER&&(et===o.UNSIGNED_BYTE&&(ft=o.R8UI),et===o.UNSIGNED_SHORT&&(ft=o.R16UI),et===o.UNSIGNED_INT&&(ft=o.R32UI),et===o.BYTE&&(ft=o.R8I),et===o.SHORT&&(ft=o.R16I),et===o.INT&&(ft=o.R32I)),b===o.RG&&(et===o.FLOAT&&(ft=o.RG32F),et===o.HALF_FLOAT&&(ft=o.RG16F),et===o.UNSIGNED_BYTE&&(ft=o.RG8)),b===o.RG_INTEGER&&(et===o.UNSIGNED_BYTE&&(ft=o.RG8UI),et===o.UNSIGNED_SHORT&&(ft=o.RG16UI),et===o.UNSIGNED_INT&&(ft=o.RG32UI),et===o.BYTE&&(ft=o.RG8I),et===o.SHORT&&(ft=o.RG16I),et===o.INT&&(ft=o.RG32I)),b===o.RGB_INTEGER&&(et===o.UNSIGNED_BYTE&&(ft=o.RGB8UI),et===o.UNSIGNED_SHORT&&(ft=o.RGB16UI),et===o.UNSIGNED_INT&&(ft=o.RGB32UI),et===o.BYTE&&(ft=o.RGB8I),et===o.SHORT&&(ft=o.RGB16I),et===o.INT&&(ft=o.RGB32I)),b===o.RGBA_INTEGER&&(et===o.UNSIGNED_BYTE&&(ft=o.RGBA8UI),et===o.UNSIGNED_SHORT&&(ft=o.RGBA16UI),et===o.UNSIGNED_INT&&(ft=o.RGBA32UI),et===o.BYTE&&(ft=o.RGBA8I),et===o.SHORT&&(ft=o.RGBA16I),et===o.INT&&(ft=o.RGBA32I)),b===o.RGB&&et===o.UNSIGNED_INT_5_9_9_9_REV&&(ft=o.RGB9_E5),b===o.RGBA){const Vt=St?Lc:Ue.getTransfer(pt);et===o.FLOAT&&(ft=o.RGBA32F),et===o.HALF_FLOAT&&(ft=o.RGBA16F),et===o.UNSIGNED_BYTE&&(ft=Vt===Ve?o.SRGB8_ALPHA8:o.RGBA8),et===o.UNSIGNED_SHORT_4_4_4_4&&(ft=o.RGBA4),et===o.UNSIGNED_SHORT_5_5_5_1&&(ft=o.RGB5_A1)}return(ft===o.R16F||ft===o.R32F||ft===o.RG16F||ft===o.RG32F||ft===o.RGBA16F||ft===o.RGBA32F)&&e.get("EXT_color_buffer_float"),ft}function D(P,b){let et;return P?b===null||b===Zs||b===xl?et=o.DEPTH24_STENCIL8:b===ji?et=o.DEPTH32F_STENCIL8:b===yl&&(et=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Zs||b===xl?et=o.DEPTH_COMPONENT24:b===ji?et=o.DEPTH_COMPONENT32F:b===yl&&(et=o.DEPTH_COMPONENT16),et}function G(P,b){return x(P)===!0||P.isFramebufferTexture&&P.minFilter!==ui&&P.minFilter!==Wi?Math.log2(Math.max(b.width,b.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?b.mipmaps.length:1}function I(P){const b=P.target;b.removeEventListener("dispose",I),F(b),b.isVideoTexture&&v.delete(b)}function L(P){const b=P.target;b.removeEventListener("dispose",L),C(b)}function F(P){const b=s.get(P);if(b.__webglInit===void 0)return;const et=P.source,pt=S.get(et);if(pt){const St=pt[b.__cacheKey];St.usedTimes--,St.usedTimes===0&&U(P),Object.keys(pt).length===0&&S.delete(et)}s.remove(P)}function U(P){const b=s.get(P);o.deleteTexture(b.__webglTexture);const et=P.source,pt=S.get(et);delete pt[b.__cacheKey],h.memory.textures--}function C(P){const b=s.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),s.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let pt=0;pt<6;pt++){if(Array.isArray(b.__webglFramebuffer[pt]))for(let St=0;St<b.__webglFramebuffer[pt].length;St++)o.deleteFramebuffer(b.__webglFramebuffer[pt][St]);else o.deleteFramebuffer(b.__webglFramebuffer[pt]);b.__webglDepthbuffer&&o.deleteRenderbuffer(b.__webglDepthbuffer[pt])}else{if(Array.isArray(b.__webglFramebuffer))for(let pt=0;pt<b.__webglFramebuffer.length;pt++)o.deleteFramebuffer(b.__webglFramebuffer[pt]);else o.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&o.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&o.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let pt=0;pt<b.__webglColorRenderbuffer.length;pt++)b.__webglColorRenderbuffer[pt]&&o.deleteRenderbuffer(b.__webglColorRenderbuffer[pt]);b.__webglDepthRenderbuffer&&o.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const et=P.textures;for(let pt=0,St=et.length;pt<St;pt++){const ft=s.get(et[pt]);ft.__webglTexture&&(o.deleteTexture(ft.__webglTexture),h.memory.textures--),s.remove(et[pt])}s.remove(P)}let H=0;function ot(){H=0}function st(){const P=H;return P>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+l.maxTextures),H+=1,P}function mt(P){const b=[];return b.push(P.wrapS),b.push(P.wrapT),b.push(P.wrapR||0),b.push(P.magFilter),b.push(P.minFilter),b.push(P.anisotropy),b.push(P.internalFormat),b.push(P.format),b.push(P.type),b.push(P.generateMipmaps),b.push(P.premultiplyAlpha),b.push(P.flipY),b.push(P.unpackAlignment),b.push(P.colorSpace),b.join()}function ct(P,b){const et=s.get(P);if(P.isVideoTexture&&jt(P),P.isRenderTargetTexture===!1&&P.version>0&&et.__version!==P.version){const pt=P.image;if(pt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{_t(et,P,b);return}}i.bindTexture(o.TEXTURE_2D,et.__webglTexture,o.TEXTURE0+b)}function Y(P,b){const et=s.get(P);if(P.version>0&&et.__version!==P.version){_t(et,P,b);return}i.bindTexture(o.TEXTURE_2D_ARRAY,et.__webglTexture,o.TEXTURE0+b)}function it(P,b){const et=s.get(P);if(P.version>0&&et.__version!==P.version){_t(et,P,b);return}i.bindTexture(o.TEXTURE_3D,et.__webglTexture,o.TEXTURE0+b)}function W(P,b){const et=s.get(P);if(P.version>0&&et.__version!==P.version){ut(et,P,b);return}i.bindTexture(o.TEXTURE_CUBE_MAP,et.__webglTexture,o.TEXTURE0+b)}const xt={[rp]:o.REPEAT,[Ws]:o.CLAMP_TO_EDGE,[op]:o.MIRRORED_REPEAT},yt={[ui]:o.NEAREST,[vE]:o.NEAREST_MIPMAP_NEAREST,[$u]:o.NEAREST_MIPMAP_LINEAR,[Wi]:o.LINEAR,[gd]:o.LINEAR_MIPMAP_NEAREST,[js]:o.LINEAR_MIPMAP_LINEAR},Ft={[ME]:o.NEVER,[CE]:o.ALWAYS,[EE]:o.LESS,[LS]:o.LEQUAL,[TE]:o.EQUAL,[RE]:o.GEQUAL,[bE]:o.GREATER,[AE]:o.NOTEQUAL};function ie(P,b){if(b.type===ji&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Wi||b.magFilter===gd||b.magFilter===$u||b.magFilter===js||b.minFilter===Wi||b.minFilter===gd||b.minFilter===$u||b.minFilter===js)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(P,o.TEXTURE_WRAP_S,xt[b.wrapS]),o.texParameteri(P,o.TEXTURE_WRAP_T,xt[b.wrapT]),(P===o.TEXTURE_3D||P===o.TEXTURE_2D_ARRAY)&&o.texParameteri(P,o.TEXTURE_WRAP_R,xt[b.wrapR]),o.texParameteri(P,o.TEXTURE_MAG_FILTER,yt[b.magFilter]),o.texParameteri(P,o.TEXTURE_MIN_FILTER,yt[b.minFilter]),b.compareFunction&&(o.texParameteri(P,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(P,o.TEXTURE_COMPARE_FUNC,Ft[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ui||b.minFilter!==$u&&b.minFilter!==js||b.type===ji&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||s.get(b).__currentAnisotropy){const et=e.get("EXT_texture_filter_anisotropic");o.texParameterf(P,et.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,l.getMaxAnisotropy())),s.get(b).__currentAnisotropy=b.anisotropy}}}function re(P,b){let et=!1;P.__webglInit===void 0&&(P.__webglInit=!0,b.addEventListener("dispose",I));const pt=b.source;let St=S.get(pt);St===void 0&&(St={},S.set(pt,St));const ft=mt(b);if(ft!==P.__cacheKey){St[ft]===void 0&&(St[ft]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,et=!0),St[ft].usedTimes++;const Vt=St[P.__cacheKey];Vt!==void 0&&(St[P.__cacheKey].usedTimes--,Vt.usedTimes===0&&U(b)),P.__cacheKey=ft,P.__webglTexture=St[ft].texture}return et}function w(P,b,et){return Math.floor(Math.floor(P/et)/b)}function Z(P,b,et,pt){const ft=P.updateRanges;if(ft.length===0)i.texSubImage2D(o.TEXTURE_2D,0,0,0,b.width,b.height,et,pt,b.data);else{ft.sort((Mt,Bt)=>Mt.start-Bt.start);let Vt=0;for(let Mt=1;Mt<ft.length;Mt++){const Bt=ft[Vt],ee=ft[Mt],Jt=Bt.start+Bt.count,Ot=w(ee.start,b.width,4),ue=w(Bt.start,b.width,4);ee.start<=Jt+1&&Ot===ue&&w(ee.start+ee.count-1,b.width,4)===Ot?Bt.count=Math.max(Bt.count,ee.start+ee.count-Bt.start):(++Vt,ft[Vt]=ee)}ft.length=Vt+1;const Lt=o.getParameter(o.UNPACK_ROW_LENGTH),Yt=o.getParameter(o.UNPACK_SKIP_PIXELS),Zt=o.getParameter(o.UNPACK_SKIP_ROWS);o.pixelStorei(o.UNPACK_ROW_LENGTH,b.width);for(let Mt=0,Bt=ft.length;Mt<Bt;Mt++){const ee=ft[Mt],Jt=Math.floor(ee.start/4),Ot=Math.ceil(ee.count/4),ue=Jt%b.width,X=Math.floor(Jt/b.width),zt=Ot,Et=1;o.pixelStorei(o.UNPACK_SKIP_PIXELS,ue),o.pixelStorei(o.UNPACK_SKIP_ROWS,X),i.texSubImage2D(o.TEXTURE_2D,0,ue,X,zt,Et,et,pt,b.data)}P.clearUpdateRanges(),o.pixelStorei(o.UNPACK_ROW_LENGTH,Lt),o.pixelStorei(o.UNPACK_SKIP_PIXELS,Yt),o.pixelStorei(o.UNPACK_SKIP_ROWS,Zt)}}function _t(P,b,et){let pt=o.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(pt=o.TEXTURE_2D_ARRAY),b.isData3DTexture&&(pt=o.TEXTURE_3D);const St=re(P,b),ft=b.source;i.bindTexture(pt,P.__webglTexture,o.TEXTURE0+et);const Vt=s.get(ft);if(ft.version!==Vt.__version||St===!0){i.activeTexture(o.TEXTURE0+et);const Lt=Ue.getPrimaries(Ue.workingColorSpace),Yt=b.colorSpace===us?null:Ue.getPrimaries(b.colorSpace),Zt=b.colorSpace===us||Lt===Yt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,b.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,b.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Zt);let Mt=A(b.image,!1,l.maxTextureSize);Mt=$t(b,Mt);const Bt=f.convert(b.format,b.colorSpace),ee=f.convert(b.type);let Jt=N(b.internalFormat,Bt,ee,b.colorSpace,b.isVideoTexture);ie(pt,b);let Ot;const ue=b.mipmaps,X=b.isVideoTexture!==!0,zt=Vt.__version===void 0||St===!0,Et=ft.dataReady,Gt=G(b,Mt);if(b.isDepthTexture)Jt=D(b.format===El,b.type),zt&&(X?i.texStorage2D(o.TEXTURE_2D,1,Jt,Mt.width,Mt.height):i.texImage2D(o.TEXTURE_2D,0,Jt,Mt.width,Mt.height,0,Bt,ee,null));else if(b.isDataTexture)if(ue.length>0){X&&zt&&i.texStorage2D(o.TEXTURE_2D,Gt,Jt,ue[0].width,ue[0].height);for(let At=0,vt=ue.length;At<vt;At++)Ot=ue[At],X?Et&&i.texSubImage2D(o.TEXTURE_2D,At,0,0,Ot.width,Ot.height,Bt,ee,Ot.data):i.texImage2D(o.TEXTURE_2D,At,Jt,Ot.width,Ot.height,0,Bt,ee,Ot.data);b.generateMipmaps=!1}else X?(zt&&i.texStorage2D(o.TEXTURE_2D,Gt,Jt,Mt.width,Mt.height),Et&&Z(b,Mt,Bt,ee)):i.texImage2D(o.TEXTURE_2D,0,Jt,Mt.width,Mt.height,0,Bt,ee,Mt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){X&&zt&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Gt,Jt,ue[0].width,ue[0].height,Mt.depth);for(let At=0,vt=ue.length;At<vt;At++)if(Ot=ue[At],b.format!==Ni)if(Bt!==null)if(X){if(Et)if(b.layerUpdates.size>0){const Xt=Wv(Ot.width,Ot.height,b.format,b.type);for(const he of b.layerUpdates){const ke=Ot.data.subarray(he*Xt/Ot.data.BYTES_PER_ELEMENT,(he+1)*Xt/Ot.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,At,0,0,he,Ot.width,Ot.height,1,Bt,ke)}b.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,At,0,0,0,Ot.width,Ot.height,Mt.depth,Bt,Ot.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,At,Jt,Ot.width,Ot.height,Mt.depth,0,Ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else X?Et&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,At,0,0,0,Ot.width,Ot.height,Mt.depth,Bt,ee,Ot.data):i.texImage3D(o.TEXTURE_2D_ARRAY,At,Jt,Ot.width,Ot.height,Mt.depth,0,Bt,ee,Ot.data)}else{X&&zt&&i.texStorage2D(o.TEXTURE_2D,Gt,Jt,ue[0].width,ue[0].height);for(let At=0,vt=ue.length;At<vt;At++)Ot=ue[At],b.format!==Ni?Bt!==null?X?Et&&i.compressedTexSubImage2D(o.TEXTURE_2D,At,0,0,Ot.width,Ot.height,Bt,Ot.data):i.compressedTexImage2D(o.TEXTURE_2D,At,Jt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):X?Et&&i.texSubImage2D(o.TEXTURE_2D,At,0,0,Ot.width,Ot.height,Bt,ee,Ot.data):i.texImage2D(o.TEXTURE_2D,At,Jt,Ot.width,Ot.height,0,Bt,ee,Ot.data)}else if(b.isDataArrayTexture)if(X){if(zt&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Gt,Jt,Mt.width,Mt.height,Mt.depth),Et)if(b.layerUpdates.size>0){const At=Wv(Mt.width,Mt.height,b.format,b.type);for(const vt of b.layerUpdates){const Xt=Mt.data.subarray(vt*At/Mt.data.BYTES_PER_ELEMENT,(vt+1)*At/Mt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,vt,Mt.width,Mt.height,1,Bt,ee,Xt)}b.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,Mt.width,Mt.height,Mt.depth,Bt,ee,Mt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Jt,Mt.width,Mt.height,Mt.depth,0,Bt,ee,Mt.data);else if(b.isData3DTexture)X?(zt&&i.texStorage3D(o.TEXTURE_3D,Gt,Jt,Mt.width,Mt.height,Mt.depth),Et&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,Mt.width,Mt.height,Mt.depth,Bt,ee,Mt.data)):i.texImage3D(o.TEXTURE_3D,0,Jt,Mt.width,Mt.height,Mt.depth,0,Bt,ee,Mt.data);else if(b.isFramebufferTexture){if(zt)if(X)i.texStorage2D(o.TEXTURE_2D,Gt,Jt,Mt.width,Mt.height);else{let At=Mt.width,vt=Mt.height;for(let Xt=0;Xt<Gt;Xt++)i.texImage2D(o.TEXTURE_2D,Xt,Jt,At,vt,0,Bt,ee,null),At>>=1,vt>>=1}}else if(ue.length>0){if(X&&zt){const At=$e(ue[0]);i.texStorage2D(o.TEXTURE_2D,Gt,Jt,At.width,At.height)}for(let At=0,vt=ue.length;At<vt;At++)Ot=ue[At],X?Et&&i.texSubImage2D(o.TEXTURE_2D,At,0,0,Bt,ee,Ot):i.texImage2D(o.TEXTURE_2D,At,Jt,Bt,ee,Ot);b.generateMipmaps=!1}else if(X){if(zt){const At=$e(Mt);i.texStorage2D(o.TEXTURE_2D,Gt,Jt,At.width,At.height)}Et&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Bt,ee,Mt)}else i.texImage2D(o.TEXTURE_2D,0,Jt,Bt,ee,Mt);x(b)&&y(pt),Vt.__version=ft.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function ut(P,b,et){if(b.image.length!==6)return;const pt=re(P,b),St=b.source;i.bindTexture(o.TEXTURE_CUBE_MAP,P.__webglTexture,o.TEXTURE0+et);const ft=s.get(St);if(St.version!==ft.__version||pt===!0){i.activeTexture(o.TEXTURE0+et);const Vt=Ue.getPrimaries(Ue.workingColorSpace),Lt=b.colorSpace===us?null:Ue.getPrimaries(b.colorSpace),Yt=b.colorSpace===us||Vt===Lt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,b.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,b.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);const Zt=b.isCompressedTexture||b.image[0].isCompressedTexture,Mt=b.image[0]&&b.image[0].isDataTexture,Bt=[];for(let vt=0;vt<6;vt++)!Zt&&!Mt?Bt[vt]=A(b.image[vt],!0,l.maxCubemapSize):Bt[vt]=Mt?b.image[vt].image:b.image[vt],Bt[vt]=$t(b,Bt[vt]);const ee=Bt[0],Jt=f.convert(b.format,b.colorSpace),Ot=f.convert(b.type),ue=N(b.internalFormat,Jt,Ot,b.colorSpace),X=b.isVideoTexture!==!0,zt=ft.__version===void 0||pt===!0,Et=St.dataReady;let Gt=G(b,ee);ie(o.TEXTURE_CUBE_MAP,b);let At;if(Zt){X&&zt&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Gt,ue,ee.width,ee.height);for(let vt=0;vt<6;vt++){At=Bt[vt].mipmaps;for(let Xt=0;Xt<At.length;Xt++){const he=At[Xt];b.format!==Ni?Jt!==null?X?Et&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt,0,0,he.width,he.height,Jt,he.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt,ue,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?Et&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt,0,0,he.width,he.height,Jt,Ot,he.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt,ue,he.width,he.height,0,Jt,Ot,he.data)}}}else{if(At=b.mipmaps,X&&zt){At.length>0&&Gt++;const vt=$e(Bt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Gt,ue,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(Mt){X?Et&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Bt[vt].width,Bt[vt].height,Jt,Ot,Bt[vt].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,ue,Bt[vt].width,Bt[vt].height,0,Jt,Ot,Bt[vt].data);for(let Xt=0;Xt<At.length;Xt++){const ke=At[Xt].image[vt].image;X?Et&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt+1,0,0,ke.width,ke.height,Jt,Ot,ke.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt+1,ue,ke.width,ke.height,0,Jt,Ot,ke.data)}}else{X?Et&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Jt,Ot,Bt[vt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,ue,Jt,Ot,Bt[vt]);for(let Xt=0;Xt<At.length;Xt++){const he=At[Xt];X?Et&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt+1,0,0,Jt,Ot,he.image[vt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt+1,ue,Jt,Ot,he.image[vt])}}}x(b)&&y(o.TEXTURE_CUBE_MAP),ft.__version=St.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function Tt(P,b,et,pt,St,ft){const Vt=f.convert(et.format,et.colorSpace),Lt=f.convert(et.type),Yt=N(et.internalFormat,Vt,Lt,et.colorSpace),Zt=s.get(b),Mt=s.get(et);if(Mt.__renderTarget=b,!Zt.__hasExternalTextures){const Bt=Math.max(1,b.width>>ft),ee=Math.max(1,b.height>>ft);St===o.TEXTURE_3D||St===o.TEXTURE_2D_ARRAY?i.texImage3D(St,ft,Yt,Bt,ee,b.depth,0,Vt,Lt,null):i.texImage2D(St,ft,Yt,Bt,ee,0,Vt,Lt,null)}i.bindFramebuffer(o.FRAMEBUFFER,P),fe(b)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,pt,St,Mt.__webglTexture,0,bt(b)):(St===o.TEXTURE_2D||St>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&St<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,pt,St,Mt.__webglTexture,ft),i.bindFramebuffer(o.FRAMEBUFFER,null)}function It(P,b,et){if(o.bindRenderbuffer(o.RENDERBUFFER,P),b.depthBuffer){const pt=b.depthTexture,St=pt&&pt.isDepthTexture?pt.type:null,ft=D(b.stencilBuffer,St),Vt=b.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Lt=bt(b);fe(b)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Lt,ft,b.width,b.height):et?o.renderbufferStorageMultisample(o.RENDERBUFFER,Lt,ft,b.width,b.height):o.renderbufferStorage(o.RENDERBUFFER,ft,b.width,b.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Vt,o.RENDERBUFFER,P)}else{const pt=b.textures;for(let St=0;St<pt.length;St++){const ft=pt[St],Vt=f.convert(ft.format,ft.colorSpace),Lt=f.convert(ft.type),Yt=N(ft.internalFormat,Vt,Lt,ft.colorSpace),Zt=bt(b);et&&fe(b)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,Zt,Yt,b.width,b.height):fe(b)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Zt,Yt,b.width,b.height):o.renderbufferStorage(o.RENDERBUFFER,Yt,b.width,b.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function lt(P,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,P),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pt=s.get(b.depthTexture);pt.__renderTarget=b,(!pt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ct(b.depthTexture,0);const St=pt.__webglTexture,ft=bt(b);if(b.depthTexture.format===Ml)fe(b)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,St,0,ft):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,St,0);else if(b.depthTexture.format===El)fe(b)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,St,0,ft):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,St,0);else throw new Error("Unknown depthTexture format")}function gt(P){const b=s.get(P),et=P.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==P.depthTexture){const pt=P.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),pt){const St=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,pt.removeEventListener("dispose",St)};pt.addEventListener("dispose",St),b.__depthDisposeCallback=St}b.__boundDepthTexture=pt}if(P.depthTexture&&!b.__autoAllocateDepthBuffer){if(et)throw new Error("target.depthTexture not supported in Cube render targets");const pt=P.texture.mipmaps;pt&&pt.length>0?lt(b.__webglFramebuffer[0],P):lt(b.__webglFramebuffer,P)}else if(et){b.__webglDepthbuffer=[];for(let pt=0;pt<6;pt++)if(i.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer[pt]),b.__webglDepthbuffer[pt]===void 0)b.__webglDepthbuffer[pt]=o.createRenderbuffer(),It(b.__webglDepthbuffer[pt],P,!1);else{const St=P.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ft=b.__webglDepthbuffer[pt];o.bindRenderbuffer(o.RENDERBUFFER,ft),o.framebufferRenderbuffer(o.FRAMEBUFFER,St,o.RENDERBUFFER,ft)}}else{const pt=P.texture.mipmaps;if(pt&&pt.length>0?i.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer[0]):i.bindFramebuffer(o.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=o.createRenderbuffer(),It(b.__webglDepthbuffer,P,!1);else{const St=P.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ft=b.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,ft),o.framebufferRenderbuffer(o.FRAMEBUFFER,St,o.RENDERBUFFER,ft)}}i.bindFramebuffer(o.FRAMEBUFFER,null)}function Ct(P,b,et){const pt=s.get(P);b!==void 0&&Tt(pt.__webglFramebuffer,P,P.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),et!==void 0&&gt(P)}function qt(P){const b=P.texture,et=s.get(P),pt=s.get(b);P.addEventListener("dispose",L);const St=P.textures,ft=P.isWebGLCubeRenderTarget===!0,Vt=St.length>1;if(Vt||(pt.__webglTexture===void 0&&(pt.__webglTexture=o.createTexture()),pt.__version=b.version,h.memory.textures++),ft){et.__webglFramebuffer=[];for(let Lt=0;Lt<6;Lt++)if(b.mipmaps&&b.mipmaps.length>0){et.__webglFramebuffer[Lt]=[];for(let Yt=0;Yt<b.mipmaps.length;Yt++)et.__webglFramebuffer[Lt][Yt]=o.createFramebuffer()}else et.__webglFramebuffer[Lt]=o.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){et.__webglFramebuffer=[];for(let Lt=0;Lt<b.mipmaps.length;Lt++)et.__webglFramebuffer[Lt]=o.createFramebuffer()}else et.__webglFramebuffer=o.createFramebuffer();if(Vt)for(let Lt=0,Yt=St.length;Lt<Yt;Lt++){const Zt=s.get(St[Lt]);Zt.__webglTexture===void 0&&(Zt.__webglTexture=o.createTexture(),h.memory.textures++)}if(P.samples>0&&fe(P)===!1){et.__webglMultisampledFramebuffer=o.createFramebuffer(),et.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,et.__webglMultisampledFramebuffer);for(let Lt=0;Lt<St.length;Lt++){const Yt=St[Lt];et.__webglColorRenderbuffer[Lt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,et.__webglColorRenderbuffer[Lt]);const Zt=f.convert(Yt.format,Yt.colorSpace),Mt=f.convert(Yt.type),Bt=N(Yt.internalFormat,Zt,Mt,Yt.colorSpace,P.isXRRenderTarget===!0),ee=bt(P);o.renderbufferStorageMultisample(o.RENDERBUFFER,ee,Bt,P.width,P.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Lt,o.RENDERBUFFER,et.__webglColorRenderbuffer[Lt])}o.bindRenderbuffer(o.RENDERBUFFER,null),P.depthBuffer&&(et.__webglDepthRenderbuffer=o.createRenderbuffer(),It(et.__webglDepthRenderbuffer,P,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(ft){i.bindTexture(o.TEXTURE_CUBE_MAP,pt.__webglTexture),ie(o.TEXTURE_CUBE_MAP,b);for(let Lt=0;Lt<6;Lt++)if(b.mipmaps&&b.mipmaps.length>0)for(let Yt=0;Yt<b.mipmaps.length;Yt++)Tt(et.__webglFramebuffer[Lt][Yt],P,b,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,Yt);else Tt(et.__webglFramebuffer[Lt],P,b,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0);x(b)&&y(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Vt){for(let Lt=0,Yt=St.length;Lt<Yt;Lt++){const Zt=St[Lt],Mt=s.get(Zt);i.bindTexture(o.TEXTURE_2D,Mt.__webglTexture),ie(o.TEXTURE_2D,Zt),Tt(et.__webglFramebuffer,P,Zt,o.COLOR_ATTACHMENT0+Lt,o.TEXTURE_2D,0),x(Zt)&&y(o.TEXTURE_2D)}i.unbindTexture()}else{let Lt=o.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Lt=P.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Lt,pt.__webglTexture),ie(Lt,b),b.mipmaps&&b.mipmaps.length>0)for(let Yt=0;Yt<b.mipmaps.length;Yt++)Tt(et.__webglFramebuffer[Yt],P,b,o.COLOR_ATTACHMENT0,Lt,Yt);else Tt(et.__webglFramebuffer,P,b,o.COLOR_ATTACHMENT0,Lt,0);x(b)&&y(Lt),i.unbindTexture()}P.depthBuffer&&gt(P)}function B(P){const b=P.textures;for(let et=0,pt=b.length;et<pt;et++){const St=b[et];if(x(St)){const ft=O(P),Vt=s.get(St).__webglTexture;i.bindTexture(ft,Vt),y(ft),i.unbindTexture()}}}const We=[],le=[];function ae(P){if(P.samples>0){if(fe(P)===!1){const b=P.textures,et=P.width,pt=P.height;let St=o.COLOR_BUFFER_BIT;const ft=P.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Vt=s.get(P),Lt=b.length>1;if(Lt)for(let Zt=0;Zt<b.length;Zt++)i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Zt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Zt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Vt.__webglMultisampledFramebuffer);const Yt=P.texture.mipmaps;Yt&&Yt.length>0?i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Vt.__webglFramebuffer[0]):i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Vt.__webglFramebuffer);for(let Zt=0;Zt<b.length;Zt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(St|=o.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(St|=o.STENCIL_BUFFER_BIT)),Lt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Vt.__webglColorRenderbuffer[Zt]);const Mt=s.get(b[Zt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,Mt,0)}o.blitFramebuffer(0,0,et,pt,0,0,et,pt,St,o.NEAREST),p===!0&&(We.length=0,le.length=0,We.push(o.COLOR_ATTACHMENT0+Zt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(We.push(ft),le.push(ft),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,le)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,We))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Lt)for(let Zt=0;Zt<b.length;Zt++){i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Zt,o.RENDERBUFFER,Vt.__webglColorRenderbuffer[Zt]);const Mt=s.get(b[Zt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Vt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Zt,o.TEXTURE_2D,Mt,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Vt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&p){const b=P.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[b])}}}function bt(P){return Math.min(l.maxSamples,P.samples)}function fe(P){const b=s.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function jt(P){const b=h.render.frame;v.get(P)!==b&&(v.set(P,b),P.update())}function $t(P,b){const et=P.colorSpace,pt=P.format,St=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||et!==fo&&et!==us&&(Ue.getTransfer(et)===Ve?(pt!==Ni||St!==Ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",et)),b}function $e(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(g.width=P.naturalWidth||P.width,g.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(g.width=P.displayWidth,g.height=P.displayHeight):(g.width=P.width,g.height=P.height),g}this.allocateTextureUnit=st,this.resetTextureUnits=ot,this.setTexture2D=ct,this.setTexture2DArray=Y,this.setTexture3D=it,this.setTextureCube=W,this.rebindTextures=Ct,this.setupRenderTarget=qt,this.updateRenderTargetMipmap=B,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=gt,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=fe}function lC(o,e){function i(s,l=us){let f;const h=Ue.getTransfer(l);if(s===Ki)return o.UNSIGNED_BYTE;if(s===Hp)return o.UNSIGNED_SHORT_4_4_4_4;if(s===Gp)return o.UNSIGNED_SHORT_5_5_5_1;if(s===RS)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===bS)return o.BYTE;if(s===AS)return o.SHORT;if(s===yl)return o.UNSIGNED_SHORT;if(s===Fp)return o.INT;if(s===Zs)return o.UNSIGNED_INT;if(s===ji)return o.FLOAT;if(s===Al)return o.HALF_FLOAT;if(s===CS)return o.ALPHA;if(s===wS)return o.RGB;if(s===Ni)return o.RGBA;if(s===Ml)return o.DEPTH_COMPONENT;if(s===El)return o.DEPTH_STENCIL;if(s===Vp)return o.RED;if(s===Xp)return o.RED_INTEGER;if(s===DS)return o.RG;if(s===kp)return o.RG_INTEGER;if(s===Yp)return o.RGBA_INTEGER;if(s===Rc||s===Cc||s===wc||s===Dc)if(h===Ve)if(f=e.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(s===Rc)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Cc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===wc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Dc)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=e.get("WEBGL_compressed_texture_s3tc"),f!==null){if(s===Rc)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Cc)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===wc)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Dc)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===lp||s===up||s===cp||s===fp)if(f=e.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(s===lp)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===up)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===cp)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===fp)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===hp||s===dp||s===pp)if(f=e.get("WEBGL_compressed_texture_etc"),f!==null){if(s===hp||s===dp)return h===Ve?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(s===pp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===mp||s===_p||s===gp||s===vp||s===Sp||s===yp||s===xp||s===Mp||s===Ep||s===Tp||s===bp||s===Ap||s===Rp||s===Cp)if(f=e.get("WEBGL_compressed_texture_astc"),f!==null){if(s===mp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===_p)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===gp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===vp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Sp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===yp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===xp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Mp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ep)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Tp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===bp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ap)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Rp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Cp)return h===Ve?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Uc||s===wp||s===Dp)if(f=e.get("EXT_texture_compression_bptc"),f!==null){if(s===Uc)return h===Ve?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===wp)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Dp)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===US||s===Up||s===Np||s===Lp)if(f=e.get("EXT_texture_compression_rgtc"),f!==null){if(s===Uc)return f.COMPRESSED_RED_RGTC1_EXT;if(s===Up)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Np)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Lp)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===xl?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const uC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cC=`
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

}`;class fC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i,s){if(this.texture===null){const l=new Yn,f=e.properties.get(l);f.__webglTexture=i.texture,(i.depthNear!==s.depthNear||i.depthFar!==s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new Ra({vertexShader:uC,fragmentShader:cC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new li(new wl(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hC extends Js{constructor(e,i){super();const s=this;let l=null,f=1,h=null,d="local-floor",p=1,g=null,v=null,m=null,S=null,M=null,T=null;const A=new fC,x=i.getContextAttributes();let y=null,O=null;const N=[],D=[],G=new me;let I=null;const L=new xi;L.viewport=new sn;const F=new xi;F.viewport=new sn;const U=[L,F],C=new UT;let H=null,ot=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(w){let Z=N[w];return Z===void 0&&(Z=new Bd,N[w]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(w){let Z=N[w];return Z===void 0&&(Z=new Bd,N[w]=Z),Z.getGripSpace()},this.getHand=function(w){let Z=N[w];return Z===void 0&&(Z=new Bd,N[w]=Z),Z.getHandSpace()};function st(w){const Z=D.indexOf(w.inputSource);if(Z===-1)return;const _t=N[Z];_t!==void 0&&(_t.update(w.inputSource,w.frame,g||h),_t.dispatchEvent({type:w.type,data:w.inputSource}))}function mt(){l.removeEventListener("select",st),l.removeEventListener("selectstart",st),l.removeEventListener("selectend",st),l.removeEventListener("squeeze",st),l.removeEventListener("squeezestart",st),l.removeEventListener("squeezeend",st),l.removeEventListener("end",mt),l.removeEventListener("inputsourceschange",ct);for(let w=0;w<N.length;w++){const Z=D[w];Z!==null&&(D[w]=null,N[w].disconnect(Z))}H=null,ot=null,A.reset(),e.setRenderTarget(y),M=null,S=null,m=null,l=null,O=null,re.stop(),s.isPresenting=!1,e.setPixelRatio(I),e.setSize(G.width,G.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(w){f=w,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(w){d=w,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return g||h},this.setReferenceSpace=function(w){g=w},this.getBaseLayer=function(){return S!==null?S:M},this.getBinding=function(){return m},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function(w){if(l=w,l!==null){if(y=e.getRenderTarget(),l.addEventListener("select",st),l.addEventListener("selectstart",st),l.addEventListener("selectend",st),l.addEventListener("squeeze",st),l.addEventListener("squeezestart",st),l.addEventListener("squeezeend",st),l.addEventListener("end",mt),l.addEventListener("inputsourceschange",ct),x.xrCompatible!==!0&&await i.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(G),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,ut=null,Tt=null;x.depth&&(Tt=x.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,_t=x.stencil?El:Ml,ut=x.stencil?xl:Zs);const It={colorFormat:i.RGBA8,depthFormat:Tt,scaleFactor:f};m=new XRWebGLBinding(l,i),S=m.createProjectionLayer(It),l.updateRenderState({layers:[S]}),e.setPixelRatio(1),e.setSize(S.textureWidth,S.textureHeight,!1),O=new Qs(S.textureWidth,S.textureHeight,{format:Ni,type:Ki,depthTexture:new YS(S.textureWidth,S.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}else{const _t={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:f};M=new XRWebGLLayer(l,i,_t),l.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),O=new Qs(M.framebufferWidth,M.framebufferHeight,{format:Ni,type:Ki,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}O.isXRRenderTarget=!0,this.setFoveation(p),g=null,h=await l.requestReferenceSpace(d),re.setContext(l),re.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return A.getDepthTexture()};function ct(w){for(let Z=0;Z<w.removed.length;Z++){const _t=w.removed[Z],ut=D.indexOf(_t);ut>=0&&(D[ut]=null,N[ut].disconnect(_t))}for(let Z=0;Z<w.added.length;Z++){const _t=w.added[Z];let ut=D.indexOf(_t);if(ut===-1){for(let It=0;It<N.length;It++)if(It>=D.length){D.push(_t),ut=It;break}else if(D[It]===null){D[It]=_t,ut=It;break}if(ut===-1)break}const Tt=N[ut];Tt&&Tt.connect(_t)}}const Y=new tt,it=new tt;function W(w,Z,_t){Y.setFromMatrixPosition(Z.matrixWorld),it.setFromMatrixPosition(_t.matrixWorld);const ut=Y.distanceTo(it),Tt=Z.projectionMatrix.elements,It=_t.projectionMatrix.elements,lt=Tt[14]/(Tt[10]-1),gt=Tt[14]/(Tt[10]+1),Ct=(Tt[9]+1)/Tt[5],qt=(Tt[9]-1)/Tt[5],B=(Tt[8]-1)/Tt[0],We=(It[8]+1)/It[0],le=lt*B,ae=lt*We,bt=ut/(-B+We),fe=bt*-B;if(Z.matrixWorld.decompose(w.position,w.quaternion,w.scale),w.translateX(fe),w.translateZ(bt),w.matrixWorld.compose(w.position,w.quaternion,w.scale),w.matrixWorldInverse.copy(w.matrixWorld).invert(),Tt[10]===-1)w.projectionMatrix.copy(Z.projectionMatrix),w.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const jt=lt+bt,$t=gt+bt,$e=le-fe,P=ae+(ut-fe),b=Ct*gt/$t*jt,et=qt*gt/$t*jt;w.projectionMatrix.makePerspective($e,P,b,et,jt,$t),w.projectionMatrixInverse.copy(w.projectionMatrix).invert()}}function xt(w,Z){Z===null?w.matrixWorld.copy(w.matrix):w.matrixWorld.multiplyMatrices(Z.matrixWorld,w.matrix),w.matrixWorldInverse.copy(w.matrixWorld).invert()}this.updateCamera=function(w){if(l===null)return;let Z=w.near,_t=w.far;A.texture!==null&&(A.depthNear>0&&(Z=A.depthNear),A.depthFar>0&&(_t=A.depthFar)),C.near=F.near=L.near=Z,C.far=F.far=L.far=_t,(H!==C.near||ot!==C.far)&&(l.updateRenderState({depthNear:C.near,depthFar:C.far}),H=C.near,ot=C.far),L.layers.mask=w.layers.mask|2,F.layers.mask=w.layers.mask|4,C.layers.mask=L.layers.mask|F.layers.mask;const ut=w.parent,Tt=C.cameras;xt(C,ut);for(let It=0;It<Tt.length;It++)xt(Tt[It],ut);Tt.length===2?W(C,L,F):C.projectionMatrix.copy(L.projectionMatrix),yt(w,C,ut)};function yt(w,Z,_t){_t===null?w.matrix.copy(Z.matrixWorld):(w.matrix.copy(_t.matrixWorld),w.matrix.invert(),w.matrix.multiply(Z.matrixWorld)),w.matrix.decompose(w.position,w.quaternion,w.scale),w.updateMatrixWorld(!0),w.projectionMatrix.copy(Z.projectionMatrix),w.projectionMatrixInverse.copy(Z.projectionMatrixInverse),w.isPerspectiveCamera&&(w.fov=Tl*2*Math.atan(1/w.projectionMatrix.elements[5]),w.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(S===null&&M===null))return p},this.setFoveation=function(w){p=w,S!==null&&(S.fixedFoveation=w),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=w)},this.hasDepthSensing=function(){return A.texture!==null},this.getDepthSensingMesh=function(){return A.getMesh(C)};let Ft=null;function ie(w,Z){if(v=Z.getViewerPose(g||h),T=Z,v!==null){const _t=v.views;M!==null&&(e.setRenderTargetFramebuffer(O,M.framebuffer),e.setRenderTarget(O));let ut=!1;_t.length!==C.cameras.length&&(C.cameras.length=0,ut=!0);for(let lt=0;lt<_t.length;lt++){const gt=_t[lt];let Ct=null;if(M!==null)Ct=M.getViewport(gt);else{const B=m.getViewSubImage(S,gt);Ct=B.viewport,lt===0&&(e.setRenderTargetTextures(O,B.colorTexture,B.depthStencilTexture),e.setRenderTarget(O))}let qt=U[lt];qt===void 0&&(qt=new xi,qt.layers.enable(lt),qt.viewport=new sn,U[lt]=qt),qt.matrix.fromArray(gt.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(gt.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(Ct.x,Ct.y,Ct.width,Ct.height),lt===0&&(C.matrix.copy(qt.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),ut===!0&&C.cameras.push(qt)}const Tt=l.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&m){const lt=m.getDepthInformation(_t[0]);lt&&lt.isValid&&lt.texture&&A.init(e,lt,l.renderState)}}for(let _t=0;_t<N.length;_t++){const ut=D[_t],Tt=N[_t];ut!==null&&Tt!==void 0&&Tt.update(ut,Z,g||h)}Ft&&Ft(w,Z),Z.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Z}),T=null}const re=new jS;re.setAnimationLoop(ie),this.setAnimationLoop=function(w){Ft=w},this.dispose=function(){}}}const Xs=new Qi,dC=new Ke;function pC(o,e){function i(x,y){x.matrixAutoUpdate===!0&&x.updateMatrix(),y.value.copy(x.matrix)}function s(x,y){y.color.getRGB(x.fogColor.value,VS(o)),y.isFog?(x.fogNear.value=y.near,x.fogFar.value=y.far):y.isFogExp2&&(x.fogDensity.value=y.density)}function l(x,y,O,N,D){y.isMeshBasicMaterial||y.isMeshLambertMaterial?f(x,y):y.isMeshToonMaterial?(f(x,y),m(x,y)):y.isMeshPhongMaterial?(f(x,y),v(x,y)):y.isMeshStandardMaterial?(f(x,y),S(x,y),y.isMeshPhysicalMaterial&&M(x,y,D)):y.isMeshMatcapMaterial?(f(x,y),T(x,y)):y.isMeshDepthMaterial?f(x,y):y.isMeshDistanceMaterial?(f(x,y),A(x,y)):y.isMeshNormalMaterial?f(x,y):y.isLineBasicMaterial?(h(x,y),y.isLineDashedMaterial&&d(x,y)):y.isPointsMaterial?p(x,y,O,N):y.isSpriteMaterial?g(x,y):y.isShadowMaterial?(x.color.value.copy(y.color),x.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function f(x,y){x.opacity.value=y.opacity,y.color&&x.diffuse.value.copy(y.color),y.emissive&&x.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(x.map.value=y.map,i(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,i(y.alphaMap,x.alphaMapTransform)),y.bumpMap&&(x.bumpMap.value=y.bumpMap,i(y.bumpMap,x.bumpMapTransform),x.bumpScale.value=y.bumpScale,y.side===kn&&(x.bumpScale.value*=-1)),y.normalMap&&(x.normalMap.value=y.normalMap,i(y.normalMap,x.normalMapTransform),x.normalScale.value.copy(y.normalScale),y.side===kn&&x.normalScale.value.negate()),y.displacementMap&&(x.displacementMap.value=y.displacementMap,i(y.displacementMap,x.displacementMapTransform),x.displacementScale.value=y.displacementScale,x.displacementBias.value=y.displacementBias),y.emissiveMap&&(x.emissiveMap.value=y.emissiveMap,i(y.emissiveMap,x.emissiveMapTransform)),y.specularMap&&(x.specularMap.value=y.specularMap,i(y.specularMap,x.specularMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest);const O=e.get(y),N=O.envMap,D=O.envMapRotation;N&&(x.envMap.value=N,Xs.copy(D),Xs.x*=-1,Xs.y*=-1,Xs.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(Xs.y*=-1,Xs.z*=-1),x.envMapRotation.value.setFromMatrix4(dC.makeRotationFromEuler(Xs)),x.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=y.reflectivity,x.ior.value=y.ior,x.refractionRatio.value=y.refractionRatio),y.lightMap&&(x.lightMap.value=y.lightMap,x.lightMapIntensity.value=y.lightMapIntensity,i(y.lightMap,x.lightMapTransform)),y.aoMap&&(x.aoMap.value=y.aoMap,x.aoMapIntensity.value=y.aoMapIntensity,i(y.aoMap,x.aoMapTransform))}function h(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,y.map&&(x.map.value=y.map,i(y.map,x.mapTransform))}function d(x,y){x.dashSize.value=y.dashSize,x.totalSize.value=y.dashSize+y.gapSize,x.scale.value=y.scale}function p(x,y,O,N){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.size.value=y.size*O,x.scale.value=N*.5,y.map&&(x.map.value=y.map,i(y.map,x.uvTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,i(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function g(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.rotation.value=y.rotation,y.map&&(x.map.value=y.map,i(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,i(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function v(x,y){x.specular.value.copy(y.specular),x.shininess.value=Math.max(y.shininess,1e-4)}function m(x,y){y.gradientMap&&(x.gradientMap.value=y.gradientMap)}function S(x,y){x.metalness.value=y.metalness,y.metalnessMap&&(x.metalnessMap.value=y.metalnessMap,i(y.metalnessMap,x.metalnessMapTransform)),x.roughness.value=y.roughness,y.roughnessMap&&(x.roughnessMap.value=y.roughnessMap,i(y.roughnessMap,x.roughnessMapTransform)),y.envMap&&(x.envMapIntensity.value=y.envMapIntensity)}function M(x,y,O){x.ior.value=y.ior,y.sheen>0&&(x.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),x.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(x.sheenColorMap.value=y.sheenColorMap,i(y.sheenColorMap,x.sheenColorMapTransform)),y.sheenRoughnessMap&&(x.sheenRoughnessMap.value=y.sheenRoughnessMap,i(y.sheenRoughnessMap,x.sheenRoughnessMapTransform))),y.clearcoat>0&&(x.clearcoat.value=y.clearcoat,x.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(x.clearcoatMap.value=y.clearcoatMap,i(y.clearcoatMap,x.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,i(y.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(x.clearcoatNormalMap.value=y.clearcoatNormalMap,i(y.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===kn&&x.clearcoatNormalScale.value.negate())),y.dispersion>0&&(x.dispersion.value=y.dispersion),y.iridescence>0&&(x.iridescence.value=y.iridescence,x.iridescenceIOR.value=y.iridescenceIOR,x.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(x.iridescenceMap.value=y.iridescenceMap,i(y.iridescenceMap,x.iridescenceMapTransform)),y.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=y.iridescenceThicknessMap,i(y.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),y.transmission>0&&(x.transmission.value=y.transmission,x.transmissionSamplerMap.value=O.texture,x.transmissionSamplerSize.value.set(O.width,O.height),y.transmissionMap&&(x.transmissionMap.value=y.transmissionMap,i(y.transmissionMap,x.transmissionMapTransform)),x.thickness.value=y.thickness,y.thicknessMap&&(x.thicknessMap.value=y.thicknessMap,i(y.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=y.attenuationDistance,x.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(x.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(x.anisotropyMap.value=y.anisotropyMap,i(y.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=y.specularIntensity,x.specularColor.value.copy(y.specularColor),y.specularColorMap&&(x.specularColorMap.value=y.specularColorMap,i(y.specularColorMap,x.specularColorMapTransform)),y.specularIntensityMap&&(x.specularIntensityMap.value=y.specularIntensityMap,i(y.specularIntensityMap,x.specularIntensityMapTransform))}function T(x,y){y.matcap&&(x.matcap.value=y.matcap)}function A(x,y){const O=e.get(y).light;x.referencePosition.value.setFromMatrixPosition(O.matrixWorld),x.nearDistance.value=O.shadow.camera.near,x.farDistance.value=O.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function mC(o,e,i,s){let l={},f={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function p(O,N){const D=N.program;s.uniformBlockBinding(O,D)}function g(O,N){let D=l[O.id];D===void 0&&(T(O),D=v(O),l[O.id]=D,O.addEventListener("dispose",x));const G=N.program;s.updateUBOMapping(O,G);const I=e.render.frame;f[O.id]!==I&&(S(O),f[O.id]=I)}function v(O){const N=m();O.__bindingPointIndex=N;const D=o.createBuffer(),G=O.__size,I=O.usage;return o.bindBuffer(o.UNIFORM_BUFFER,D),o.bufferData(o.UNIFORM_BUFFER,G,I),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,N,D),D}function m(){for(let O=0;O<d;O++)if(h.indexOf(O)===-1)return h.push(O),O;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function S(O){const N=l[O.id],D=O.uniforms,G=O.__cache;o.bindBuffer(o.UNIFORM_BUFFER,N);for(let I=0,L=D.length;I<L;I++){const F=Array.isArray(D[I])?D[I]:[D[I]];for(let U=0,C=F.length;U<C;U++){const H=F[U];if(M(H,I,U,G)===!0){const ot=H.__offset,st=Array.isArray(H.value)?H.value:[H.value];let mt=0;for(let ct=0;ct<st.length;ct++){const Y=st[ct],it=A(Y);typeof Y=="number"||typeof Y=="boolean"?(H.__data[0]=Y,o.bufferSubData(o.UNIFORM_BUFFER,ot+mt,H.__data)):Y.isMatrix3?(H.__data[0]=Y.elements[0],H.__data[1]=Y.elements[1],H.__data[2]=Y.elements[2],H.__data[3]=0,H.__data[4]=Y.elements[3],H.__data[5]=Y.elements[4],H.__data[6]=Y.elements[5],H.__data[7]=0,H.__data[8]=Y.elements[6],H.__data[9]=Y.elements[7],H.__data[10]=Y.elements[8],H.__data[11]=0):(Y.toArray(H.__data,mt),mt+=it.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,ot,H.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(O,N,D,G){const I=O.value,L=N+"_"+D;if(G[L]===void 0)return typeof I=="number"||typeof I=="boolean"?G[L]=I:G[L]=I.clone(),!0;{const F=G[L];if(typeof I=="number"||typeof I=="boolean"){if(F!==I)return G[L]=I,!0}else if(F.equals(I)===!1)return F.copy(I),!0}return!1}function T(O){const N=O.uniforms;let D=0;const G=16;for(let L=0,F=N.length;L<F;L++){const U=Array.isArray(N[L])?N[L]:[N[L]];for(let C=0,H=U.length;C<H;C++){const ot=U[C],st=Array.isArray(ot.value)?ot.value:[ot.value];for(let mt=0,ct=st.length;mt<ct;mt++){const Y=st[mt],it=A(Y),W=D%G,xt=W%it.boundary,yt=W+xt;D+=xt,yt!==0&&G-yt<it.storage&&(D+=G-yt),ot.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),ot.__offset=D,D+=it.storage}}}const I=D%G;return I>0&&(D+=G-I),O.__size=D,O.__cache={},this}function A(O){const N={boundary:0,storage:0};return typeof O=="number"||typeof O=="boolean"?(N.boundary=4,N.storage=4):O.isVector2?(N.boundary=8,N.storage=8):O.isVector3||O.isColor?(N.boundary=16,N.storage=12):O.isVector4?(N.boundary=16,N.storage=16):O.isMatrix3?(N.boundary=48,N.storage=48):O.isMatrix4?(N.boundary=64,N.storage=64):O.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",O),N}function x(O){const N=O.target;N.removeEventListener("dispose",x);const D=h.indexOf(N.__bindingPointIndex);h.splice(D,1),o.deleteBuffer(l[N.id]),delete l[N.id],delete f[N.id]}function y(){for(const O in l)o.deleteBuffer(l[O]);h=[],l={},f={}}return{bind:p,update:g,dispose:y}}class _C{constructor(e={}){const{canvas:i=YE(),context:s=null,depth:l=!0,stencil:f=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:g=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:m=!1,reverseDepthBuffer:S=!1}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=h;const T=new Uint32Array(4),A=new Int32Array(4);let x=null,y=null;const O=[],N=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let G=!1;this._outputColorSpace=yi;let I=0,L=0,F=null,U=-1,C=null;const H=new sn,ot=new sn;let st=null;const mt=new ne(0);let ct=0,Y=i.width,it=i.height,W=1,xt=null,yt=null;const Ft=new sn(0,0,Y,it),ie=new sn(0,0,Y,it);let re=!1;const w=new Kp;let Z=!1,_t=!1;const ut=new Ke,Tt=new Ke,It=new tt,lt=new sn,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ct=!1;function qt(){return F===null?W:1}let B=s;function We(R,K){return i.getContext(R,K)}try{const R={alpha:!0,depth:l,stencil:f,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:g,powerPreference:v,failIfMajorPerformanceCaveat:m};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Ip}`),i.addEventListener("webglcontextlost",Gt,!1),i.addEventListener("webglcontextrestored",At,!1),i.addEventListener("webglcontextcreationerror",vt,!1),B===null){const K="webgl2";if(B=We(K,R),B===null)throw We(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let le,ae,bt,fe,jt,$t,$e,P,b,et,pt,St,ft,Vt,Lt,Yt,Zt,Mt,Bt,ee,Jt,Ot,ue,X;function zt(){le=new AA(B),le.init(),Ot=new lC(B,le),ae=new SA(B,le,e,Ot),bt=new rC(B,le),ae.reverseDepthBuffer&&S&&bt.buffers.depth.setReversed(!0),fe=new wA(B),jt=new WR,$t=new oC(B,le,bt,jt,ae,Ot,fe),$e=new xA(D),P=new bA(D),b=new PT(B),ue=new gA(B,b),et=new RA(B,b,fe,ue),pt=new UA(B,et,b,fe),Bt=new DA(B,ae,$t),Yt=new yA(jt),St=new qR(D,$e,P,le,ae,ue,Yt),ft=new pC(D,jt),Vt=new ZR,Lt=new eC(le),Mt=new _A(D,$e,P,bt,pt,M,p),Zt=new aC(D,pt,ae),X=new mC(B,fe,ae,bt),ee=new vA(B,le,fe),Jt=new CA(B,le,fe),fe.programs=St.programs,D.capabilities=ae,D.extensions=le,D.properties=jt,D.renderLists=Vt,D.shadowMap=Zt,D.state=bt,D.info=fe}zt();const Et=new hC(D,B);this.xr=Et,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const R=le.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=le.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(R){R!==void 0&&(W=R,this.setSize(Y,it,!1))},this.getSize=function(R){return R.set(Y,it)},this.setSize=function(R,K,at=!0){if(Et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=R,it=K,i.width=Math.floor(R*W),i.height=Math.floor(K*W),at===!0&&(i.style.width=R+"px",i.style.height=K+"px"),this.setViewport(0,0,R,K)},this.getDrawingBufferSize=function(R){return R.set(Y*W,it*W).floor()},this.setDrawingBufferSize=function(R,K,at){Y=R,it=K,W=at,i.width=Math.floor(R*at),i.height=Math.floor(K*at),this.setViewport(0,0,R,K)},this.getCurrentViewport=function(R){return R.copy(H)},this.getViewport=function(R){return R.copy(Ft)},this.setViewport=function(R,K,at,rt){R.isVector4?Ft.set(R.x,R.y,R.z,R.w):Ft.set(R,K,at,rt),bt.viewport(H.copy(Ft).multiplyScalar(W).round())},this.getScissor=function(R){return R.copy(ie)},this.setScissor=function(R,K,at,rt){R.isVector4?ie.set(R.x,R.y,R.z,R.w):ie.set(R,K,at,rt),bt.scissor(ot.copy(ie).multiplyScalar(W).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(R){bt.setScissorTest(re=R)},this.setOpaqueSort=function(R){xt=R},this.setTransparentSort=function(R){yt=R},this.getClearColor=function(R){return R.copy(Mt.getClearColor())},this.setClearColor=function(){Mt.setClearColor(...arguments)},this.getClearAlpha=function(){return Mt.getClearAlpha()},this.setClearAlpha=function(){Mt.setClearAlpha(...arguments)},this.clear=function(R=!0,K=!0,at=!0){let rt=0;if(R){let Q=!1;if(F!==null){const Rt=F.texture.format;Q=Rt===Yp||Rt===kp||Rt===Xp}if(Q){const Rt=F.texture.type,wt=Rt===Ki||Rt===Zs||Rt===yl||Rt===xl||Rt===Hp||Rt===Gp,Nt=Mt.getClearColor(),Dt=Mt.getClearAlpha(),te=Nt.r,oe=Nt.g,Qt=Nt.b;wt?(T[0]=te,T[1]=oe,T[2]=Qt,T[3]=Dt,B.clearBufferuiv(B.COLOR,0,T)):(A[0]=te,A[1]=oe,A[2]=Qt,A[3]=Dt,B.clearBufferiv(B.COLOR,0,A))}else rt|=B.COLOR_BUFFER_BIT}K&&(rt|=B.DEPTH_BUFFER_BIT),at&&(rt|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",Gt,!1),i.removeEventListener("webglcontextrestored",At,!1),i.removeEventListener("webglcontextcreationerror",vt,!1),Mt.dispose(),Vt.dispose(),Lt.dispose(),jt.dispose(),$e.dispose(),P.dispose(),pt.dispose(),ue.dispose(),X.dispose(),St.dispose(),Et.dispose(),Et.removeEventListener("sessionstart",Ln),Et.removeEventListener("sessionend",Dl),Ji.stop()};function Gt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),G=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),G=!1;const R=fe.autoReset,K=Zt.enabled,at=Zt.autoUpdate,rt=Zt.needsUpdate,Q=Zt.type;zt(),fe.autoReset=R,Zt.enabled=K,Zt.autoUpdate=at,Zt.needsUpdate=rt,Zt.type=Q}function vt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Xt(R){const K=R.target;K.removeEventListener("dispose",Xt),he(K)}function he(R){ke(R),jt.remove(R)}function ke(R){const K=jt.get(R).programs;K!==void 0&&(K.forEach(function(at){St.releaseProgram(at)}),R.isShaderMaterial&&St.releaseShaderCache(R))}this.renderBufferDirect=function(R,K,at,rt,Q,Rt){K===null&&(K=gt);const wt=Q.isMesh&&Q.matrixWorld.determinant()<0,Nt=Bc(R,K,at,rt,Q);bt.setMaterial(rt,wt);let Dt=at.index,te=1;if(rt.wireframe===!0){if(Dt=et.getWireframeAttribute(at),Dt===void 0)return;te=2}const oe=at.drawRange,Qt=at.attributes.position;let ye=oe.start*te,Ne=(oe.start+oe.count)*te;Rt!==null&&(ye=Math.max(ye,Rt.start*te),Ne=Math.min(Ne,(Rt.start+Rt.count)*te)),Dt!==null?(ye=Math.max(ye,0),Ne=Math.min(Ne,Dt.count)):Qt!=null&&(ye=Math.max(ye,0),Ne=Math.min(Ne,Qt.count));const He=Ne-ye;if(He<0||He===1/0)return;ue.setup(Q,rt,Nt,at,Dt);let Oe,we=ee;if(Dt!==null&&(Oe=b.get(Dt),we=Jt,we.setIndex(Oe)),Q.isMesh)rt.wireframe===!0?(bt.setLineWidth(rt.wireframeLinewidth*qt()),we.setMode(B.LINES)):we.setMode(B.TRIANGLES);else if(Q.isLine){let Wt=rt.linewidth;Wt===void 0&&(Wt=1),bt.setLineWidth(Wt*qt()),Q.isLineSegments?we.setMode(B.LINES):Q.isLineLoop?we.setMode(B.LINE_LOOP):we.setMode(B.LINE_STRIP)}else Q.isPoints?we.setMode(B.POINTS):Q.isSprite&&we.setMode(B.TRIANGLES);if(Q.isBatchedMesh)if(Q._multiDrawInstances!==null)ro("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),we.renderMultiDrawInstances(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount,Q._multiDrawInstances);else if(le.get("WEBGL_multi_draw"))we.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const Wt=Q._multiDrawStarts,Pe=Q._multiDrawCounts,xe=Q._multiDrawCount,on=Dt?b.get(Dt).bytesPerElement:1,Je=jt.get(rt).currentProgram.getUniforms();for(let On=0;On<xe;On++)Je.setValue(B,"_gl_DrawID",On),we.render(Wt[On]/on,Pe[On])}else if(Q.isInstancedMesh)we.renderInstances(ye,He,Q.count);else if(at.isInstancedBufferGeometry){const Wt=at._maxInstanceCount!==void 0?at._maxInstanceCount:1/0,Pe=Math.min(at.instanceCount,Wt);we.renderInstances(ye,He,Pe)}else we.render(ye,He)};function Re(R,K,at){R.transparent===!0&&R.side===Ta&&R.forceSinglePass===!1?(R.side=kn,R.needsUpdate=!0,ta(R,K,at),R.side=ds,R.needsUpdate=!0,ta(R,K,at),R.side=Ta):ta(R,K,at)}this.compile=function(R,K,at=null){at===null&&(at=R),y=Lt.get(at),y.init(K),N.push(y),at.traverseVisible(function(Q){Q.isLight&&Q.layers.test(K.layers)&&(y.pushLight(Q),Q.castShadow&&y.pushShadow(Q))}),R!==at&&R.traverseVisible(function(Q){Q.isLight&&Q.layers.test(K.layers)&&(y.pushLight(Q),Q.castShadow&&y.pushShadow(Q))}),y.setupLights();const rt=new Set;return R.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const Rt=Q.material;if(Rt)if(Array.isArray(Rt))for(let wt=0;wt<Rt.length;wt++){const Nt=Rt[wt];Re(Nt,at,Q),rt.add(Nt)}else Re(Rt,at,Q),rt.add(Rt)}),y=N.pop(),rt},this.compileAsync=function(R,K,at=null){const rt=this.compile(R,K,at);return new Promise(Q=>{function Rt(){if(rt.forEach(function(wt){jt.get(wt).currentProgram.isReady()&&rt.delete(wt)}),rt.size===0){Q(R);return}setTimeout(Rt,10)}le.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let Qe=null;function Sn(R){Qe&&Qe(R)}function Ln(){Ji.stop()}function Dl(){Ji.start()}const Ji=new jS;Ji.setAnimationLoop(Sn),typeof self<"u"&&Ji.setContext(self),this.setAnimationLoop=function(R){Qe=R,Et.setAnimationLoop(R),R===null?Ji.stop():Ji.start()},Et.addEventListener("sessionstart",Ln),Et.addEventListener("sessionend",Dl),this.render=function(R,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Et.enabled===!0&&Et.isPresenting===!0&&(Et.cameraAutoUpdate===!0&&Et.updateCamera(K),K=Et.getCamera()),R.isScene===!0&&R.onBeforeRender(D,R,K,F),y=Lt.get(R,N.length),y.init(K),N.push(y),Tt.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),w.setFromProjectionMatrix(Tt),_t=this.localClippingEnabled,Z=Yt.init(this.clippingPlanes,_t),x=Vt.get(R,O.length),x.init(),O.push(x),Et.enabled===!0&&Et.isPresenting===!0){const Rt=D.xr.getDepthSensingMesh();Rt!==null&&go(Rt,K,-1/0,D.sortObjects)}go(R,K,0,D.sortObjects),x.finish(),D.sortObjects===!0&&x.sort(xt,yt),Ct=Et.enabled===!1||Et.isPresenting===!1||Et.hasDepthSensing()===!1,Ct&&Mt.addToRenderList(x,R),this.info.render.frame++,Z===!0&&Yt.beginShadows();const at=y.state.shadowsArray;Zt.render(at,R,K),Z===!0&&Yt.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=x.opaque,Q=x.transmissive;if(y.setupLights(),K.isArrayCamera){const Rt=K.cameras;if(Q.length>0)for(let wt=0,Nt=Rt.length;wt<Nt;wt++){const Dt=Rt[wt];_s(rt,Q,R,Dt)}Ct&&Mt.render(R);for(let wt=0,Nt=Rt.length;wt<Nt;wt++){const Dt=Rt[wt];ms(x,R,Dt,Dt.viewport)}}else Q.length>0&&_s(rt,Q,R,K),Ct&&Mt.render(R),ms(x,R,K);F!==null&&L===0&&($t.updateMultisampleRenderTarget(F),$t.updateRenderTargetMipmap(F)),R.isScene===!0&&R.onAfterRender(D,R,K),ue.resetDefaultState(),U=-1,C=null,N.pop(),N.length>0?(y=N[N.length-1],Z===!0&&Yt.setGlobalState(D.clippingPlanes,y.state.camera)):y=null,O.pop(),O.length>0?x=O[O.length-1]:x=null};function go(R,K,at,rt){if(R.visible===!1)return;if(R.layers.test(K.layers)){if(R.isGroup)at=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(K);else if(R.isLight)y.pushLight(R),R.castShadow&&y.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||w.intersectsSprite(R)){rt&&lt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Tt);const wt=pt.update(R),Nt=R.material;Nt.visible&&x.push(R,wt,Nt,at,lt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||w.intersectsObject(R))){const wt=pt.update(R),Nt=R.material;if(rt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),lt.copy(R.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),lt.copy(wt.boundingSphere.center)),lt.applyMatrix4(R.matrixWorld).applyMatrix4(Tt)),Array.isArray(Nt)){const Dt=wt.groups;for(let te=0,oe=Dt.length;te<oe;te++){const Qt=Dt[te],ye=Nt[Qt.materialIndex];ye&&ye.visible&&x.push(R,wt,ye,at,lt.z,Qt)}}else Nt.visible&&x.push(R,wt,Nt,at,lt.z,null)}}const Rt=R.children;for(let wt=0,Nt=Rt.length;wt<Nt;wt++)go(Rt[wt],K,at,rt)}function ms(R,K,at,rt){const Q=R.opaque,Rt=R.transmissive,wt=R.transparent;y.setupLightsView(at),Z===!0&&Yt.setGlobalState(D.clippingPlanes,at),rt&&bt.viewport(H.copy(rt)),Q.length>0&&$i(Q,K,at),Rt.length>0&&$i(Rt,K,at),wt.length>0&&$i(wt,K,at),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function _s(R,K,at,rt){if((at.isScene===!0?at.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[rt.id]===void 0&&(y.state.transmissionRenderTarget[rt.id]=new Qs(1,1,{generateMipmaps:!0,type:le.has("EXT_color_buffer_half_float")||le.has("EXT_color_buffer_float")?Al:Ki,minFilter:js,samples:4,stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ue.workingColorSpace}));const Rt=y.state.transmissionRenderTarget[rt.id],wt=rt.viewport||H;Rt.setSize(wt.z*D.transmissionResolutionScale,wt.w*D.transmissionResolutionScale);const Nt=D.getRenderTarget(),Dt=D.getActiveCubeFace(),te=D.getActiveMipmapLevel();D.setRenderTarget(Rt),D.getClearColor(mt),ct=D.getClearAlpha(),ct<1&&D.setClearColor(16777215,.5),D.clear(),Ct&&Mt.render(at);const oe=D.toneMapping;D.toneMapping=hs;const Qt=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),y.setupLightsView(rt),Z===!0&&Yt.setGlobalState(D.clippingPlanes,rt),$i(R,at,rt),$t.updateMultisampleRenderTarget(Rt),$t.updateRenderTargetMipmap(Rt),le.has("WEBGL_multisampled_render_to_texture")===!1){let ye=!1;for(let Ne=0,He=K.length;Ne<He;Ne++){const Oe=K[Ne],we=Oe.object,Wt=Oe.geometry,Pe=Oe.material,xe=Oe.group;if(Pe.side===Ta&&we.layers.test(rt.layers)){const on=Pe.side;Pe.side=kn,Pe.needsUpdate=!0,Oi(we,at,rt,Wt,Pe,xe),Pe.side=on,Pe.needsUpdate=!0,ye=!0}}ye===!0&&($t.updateMultisampleRenderTarget(Rt),$t.updateRenderTargetMipmap(Rt))}D.setRenderTarget(Nt,Dt,te),D.setClearColor(mt,ct),Qt!==void 0&&(rt.viewport=Qt),D.toneMapping=oe}function $i(R,K,at){const rt=K.isScene===!0?K.overrideMaterial:null;for(let Q=0,Rt=R.length;Q<Rt;Q++){const wt=R[Q],Nt=wt.object,Dt=wt.geometry,te=wt.group;let oe=wt.material;oe.allowOverride===!0&&rt!==null&&(oe=rt),Nt.layers.test(at.layers)&&Oi(Nt,K,at,Dt,oe,te)}}function Oi(R,K,at,rt,Q,Rt){R.onBeforeRender(D,K,at,rt,Q,Rt),R.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Q.onBeforeRender(D,K,at,rt,R,Rt),Q.transparent===!0&&Q.side===Ta&&Q.forceSinglePass===!1?(Q.side=kn,Q.needsUpdate=!0,D.renderBufferDirect(at,K,rt,Q,R,Rt),Q.side=ds,Q.needsUpdate=!0,D.renderBufferDirect(at,K,rt,Q,R,Rt),Q.side=Ta):D.renderBufferDirect(at,K,rt,Q,R,Rt),R.onAfterRender(D,K,at,rt,Q,Rt)}function ta(R,K,at){K.isScene!==!0&&(K=gt);const rt=jt.get(R),Q=y.state.lights,Rt=y.state.shadowsArray,wt=Q.state.version,Nt=St.getParameters(R,Q.state,Rt,K,at),Dt=St.getProgramCacheKey(Nt);let te=rt.programs;rt.environment=R.isMeshStandardMaterial?K.environment:null,rt.fog=K.fog,rt.envMap=(R.isMeshStandardMaterial?P:$e).get(R.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&R.envMap===null?K.environmentRotation:R.envMapRotation,te===void 0&&(R.addEventListener("dispose",Xt),te=new Map,rt.programs=te);let oe=te.get(Dt);if(oe!==void 0){if(rt.currentProgram===oe&&rt.lightsStateVersion===wt)return vo(R,Nt),oe}else Nt.uniforms=St.getUniforms(R),R.onBeforeCompile(Nt,D),oe=St.acquireProgram(Nt,Dt),te.set(Dt,oe),rt.uniforms=Nt.uniforms;const Qt=rt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Qt.clippingPlanes=Yt.uniform),vo(R,Nt),rt.needsLights=So(R),rt.lightsStateVersion=wt,rt.needsLights&&(Qt.ambientLightColor.value=Q.state.ambient,Qt.lightProbe.value=Q.state.probe,Qt.directionalLights.value=Q.state.directional,Qt.directionalLightShadows.value=Q.state.directionalShadow,Qt.spotLights.value=Q.state.spot,Qt.spotLightShadows.value=Q.state.spotShadow,Qt.rectAreaLights.value=Q.state.rectArea,Qt.ltc_1.value=Q.state.rectAreaLTC1,Qt.ltc_2.value=Q.state.rectAreaLTC2,Qt.pointLights.value=Q.state.point,Qt.pointLightShadows.value=Q.state.pointShadow,Qt.hemisphereLights.value=Q.state.hemi,Qt.directionalShadowMap.value=Q.state.directionalShadowMap,Qt.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Qt.spotShadowMap.value=Q.state.spotShadowMap,Qt.spotLightMatrix.value=Q.state.spotLightMatrix,Qt.spotLightMap.value=Q.state.spotLightMap,Qt.pointShadowMap.value=Q.state.pointShadowMap,Qt.pointShadowMatrix.value=Q.state.pointShadowMatrix),rt.currentProgram=oe,rt.uniformsList=null,oe}function Ca(R){if(R.uniformsList===null){const K=R.currentProgram.getUniforms();R.uniformsList=Nc.seqWithValue(K.seq,R.uniforms)}return R.uniformsList}function vo(R,K){const at=jt.get(R);at.outputColorSpace=K.outputColorSpace,at.batching=K.batching,at.batchingColor=K.batchingColor,at.instancing=K.instancing,at.instancingColor=K.instancingColor,at.instancingMorph=K.instancingMorph,at.skinning=K.skinning,at.morphTargets=K.morphTargets,at.morphNormals=K.morphNormals,at.morphColors=K.morphColors,at.morphTargetsCount=K.morphTargetsCount,at.numClippingPlanes=K.numClippingPlanes,at.numIntersection=K.numClipIntersection,at.vertexAlphas=K.vertexAlphas,at.vertexTangents=K.vertexTangents,at.toneMapping=K.toneMapping}function Bc(R,K,at,rt,Q){K.isScene!==!0&&(K=gt),$t.resetTextureUnits();const Rt=K.fog,wt=rt.isMeshStandardMaterial?K.environment:null,Nt=F===null?D.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:fo,Dt=(rt.isMeshStandardMaterial?P:$e).get(rt.envMap||wt),te=rt.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,oe=!!at.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),Qt=!!at.morphAttributes.position,ye=!!at.morphAttributes.normal,Ne=!!at.morphAttributes.color;let He=hs;rt.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(He=D.toneMapping);const Oe=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,we=Oe!==void 0?Oe.length:0,Wt=jt.get(rt),Pe=y.state.lights;if(Z===!0&&(_t===!0||R!==C)){const Tn=R===C&&rt.id===U;Yt.setState(rt,R,Tn)}let xe=!1;rt.version===Wt.__version?(Wt.needsLights&&Wt.lightsStateVersion!==Pe.state.version||Wt.outputColorSpace!==Nt||Q.isBatchedMesh&&Wt.batching===!1||!Q.isBatchedMesh&&Wt.batching===!0||Q.isBatchedMesh&&Wt.batchingColor===!0&&Q.colorTexture===null||Q.isBatchedMesh&&Wt.batchingColor===!1&&Q.colorTexture!==null||Q.isInstancedMesh&&Wt.instancing===!1||!Q.isInstancedMesh&&Wt.instancing===!0||Q.isSkinnedMesh&&Wt.skinning===!1||!Q.isSkinnedMesh&&Wt.skinning===!0||Q.isInstancedMesh&&Wt.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Wt.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Wt.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Wt.instancingMorph===!1&&Q.morphTexture!==null||Wt.envMap!==Dt||rt.fog===!0&&Wt.fog!==Rt||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==Yt.numPlanes||Wt.numIntersection!==Yt.numIntersection)||Wt.vertexAlphas!==te||Wt.vertexTangents!==oe||Wt.morphTargets!==Qt||Wt.morphNormals!==ye||Wt.morphColors!==Ne||Wt.toneMapping!==He||Wt.morphTargetsCount!==we)&&(xe=!0):(xe=!0,Wt.__version=rt.version);let on=Wt.currentProgram;xe===!0&&(on=ta(rt,K,Q));let Je=!1,On=!1,wa=!1;const Ye=on.getUniforms(),ln=Wt.uniforms;if(bt.useProgram(on.program)&&(Je=!0,On=!0,wa=!0),rt.id!==U&&(U=rt.id,On=!0),Je||C!==R){bt.buffers.depth.getReversed()?(ut.copy(R.projectionMatrix),WE(ut),jE(ut),Ye.setValue(B,"projectionMatrix",ut)):Ye.setValue(B,"projectionMatrix",R.projectionMatrix),Ye.setValue(B,"viewMatrix",R.matrixWorldInverse);const bn=Ye.map.cameraPosition;bn!==void 0&&bn.setValue(B,It.setFromMatrixPosition(R.matrixWorld)),ae.logarithmicDepthBuffer&&Ye.setValue(B,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&Ye.setValue(B,"isOrthographic",R.isOrthographicCamera===!0),C!==R&&(C=R,On=!0,wa=!0)}if(Q.isSkinnedMesh){Ye.setOptional(B,Q,"bindMatrix"),Ye.setOptional(B,Q,"bindMatrixInverse");const Tn=Q.skeleton;Tn&&(Tn.boneTexture===null&&Tn.computeBoneTexture(),Ye.setValue(B,"boneTexture",Tn.boneTexture,$t))}Q.isBatchedMesh&&(Ye.setOptional(B,Q,"batchingTexture"),Ye.setValue(B,"batchingTexture",Q._matricesTexture,$t),Ye.setOptional(B,Q,"batchingIdTexture"),Ye.setValue(B,"batchingIdTexture",Q._indirectTexture,$t),Ye.setOptional(B,Q,"batchingColorTexture"),Q._colorsTexture!==null&&Ye.setValue(B,"batchingColorTexture",Q._colorsTexture,$t));const pn=at.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&Bt.update(Q,at,on),(On||Wt.receiveShadow!==Q.receiveShadow)&&(Wt.receiveShadow=Q.receiveShadow,Ye.setValue(B,"receiveShadow",Q.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(ln.envMap.value=Dt,ln.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&K.environment!==null&&(ln.envMapIntensity.value=K.environmentIntensity),On&&(Ye.setValue(B,"toneMappingExposure",D.toneMappingExposure),Wt.needsLights&&Ul(ln,wa),Rt&&rt.fog===!0&&ft.refreshFogUniforms(ln,Rt),ft.refreshMaterialUniforms(ln,rt,W,it,y.state.transmissionRenderTarget[R.id]),Nc.upload(B,Ca(Wt),ln,$t)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(Nc.upload(B,Ca(Wt),ln,$t),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&Ye.setValue(B,"center",Q.center),Ye.setValue(B,"modelViewMatrix",Q.modelViewMatrix),Ye.setValue(B,"normalMatrix",Q.normalMatrix),Ye.setValue(B,"modelMatrix",Q.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const Tn=rt.uniformsGroups;for(let bn=0,tr=Tn.length;bn<tr;bn++){const ea=Tn[bn];X.update(ea,on),X.bind(ea,on)}}return on}function Ul(R,K){R.ambientLightColor.needsUpdate=K,R.lightProbe.needsUpdate=K,R.directionalLights.needsUpdate=K,R.directionalLightShadows.needsUpdate=K,R.pointLights.needsUpdate=K,R.pointLightShadows.needsUpdate=K,R.spotLights.needsUpdate=K,R.spotLightShadows.needsUpdate=K,R.rectAreaLights.needsUpdate=K,R.hemisphereLights.needsUpdate=K}function So(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(R,K,at){const rt=jt.get(R);rt.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,rt.__autoAllocateDepthBuffer===!1&&(rt.__useRenderToTexture=!1),jt.get(R.texture).__webglTexture=K,jt.get(R.depthTexture).__webglTexture=rt.__autoAllocateDepthBuffer?void 0:at,rt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,K){const at=jt.get(R);at.__webglFramebuffer=K,at.__useDefaultFramebuffer=K===void 0};const gs=B.createFramebuffer();this.setRenderTarget=function(R,K=0,at=0){F=R,I=K,L=at;let rt=!0,Q=null,Rt=!1,wt=!1;if(R){const Dt=jt.get(R);if(Dt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(B.FRAMEBUFFER,null),rt=!1;else if(Dt.__webglFramebuffer===void 0)$t.setupRenderTarget(R);else if(Dt.__hasExternalTextures)$t.rebindTextures(R,jt.get(R.texture).__webglTexture,jt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Qt=R.depthTexture;if(Dt.__boundDepthTexture!==Qt){if(Qt!==null&&jt.has(Qt)&&(R.width!==Qt.image.width||R.height!==Qt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");$t.setupDepthRenderbuffer(R)}}const te=R.texture;(te.isData3DTexture||te.isDataArrayTexture||te.isCompressedArrayTexture)&&(wt=!0);const oe=jt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(oe[K])?Q=oe[K][at]:Q=oe[K],Rt=!0):R.samples>0&&$t.useMultisampledRTT(R)===!1?Q=jt.get(R).__webglMultisampledFramebuffer:Array.isArray(oe)?Q=oe[at]:Q=oe,H.copy(R.viewport),ot.copy(R.scissor),st=R.scissorTest}else H.copy(Ft).multiplyScalar(W).floor(),ot.copy(ie).multiplyScalar(W).floor(),st=re;if(at!==0&&(Q=gs),bt.bindFramebuffer(B.FRAMEBUFFER,Q)&&rt&&bt.drawBuffers(R,Q),bt.viewport(H),bt.scissor(ot),bt.setScissorTest(st),Rt){const Dt=jt.get(R.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+K,Dt.__webglTexture,at)}else if(wt){const Dt=jt.get(R.texture),te=K;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Dt.__webglTexture,at,te)}else if(R!==null&&at!==0){const Dt=jt.get(R.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Dt.__webglTexture,at)}U=-1},this.readRenderTargetPixels=function(R,K,at,rt,Q,Rt,wt,Nt=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=jt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&wt!==void 0&&(Dt=Dt[wt]),Dt){bt.bindFramebuffer(B.FRAMEBUFFER,Dt);try{const te=R.textures[Nt],oe=te.format,Qt=te.type;if(!ae.textureFormatReadable(oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ae.textureTypeReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=R.width-rt&&at>=0&&at<=R.height-Q&&(R.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Nt),B.readPixels(K,at,rt,Q,Ot.convert(oe),Ot.convert(Qt),Rt))}finally{const te=F!==null?jt.get(F).__webglFramebuffer:null;bt.bindFramebuffer(B.FRAMEBUFFER,te)}}},this.readRenderTargetPixelsAsync=async function(R,K,at,rt,Q,Rt,wt,Nt=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=jt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&wt!==void 0&&(Dt=Dt[wt]),Dt)if(K>=0&&K<=R.width-rt&&at>=0&&at<=R.height-Q){bt.bindFramebuffer(B.FRAMEBUFFER,Dt);const te=R.textures[Nt],oe=te.format,Qt=te.type;if(!ae.textureFormatReadable(oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ae.textureTypeReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ye=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,ye),B.bufferData(B.PIXEL_PACK_BUFFER,Rt.byteLength,B.STREAM_READ),R.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Nt),B.readPixels(K,at,rt,Q,Ot.convert(oe),Ot.convert(Qt),0);const Ne=F!==null?jt.get(F).__webglFramebuffer:null;bt.bindFramebuffer(B.FRAMEBUFFER,Ne);const He=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await qE(B,He,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,ye),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Rt),B.deleteBuffer(ye),B.deleteSync(He),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,K=null,at=0){const rt=Math.pow(2,-at),Q=Math.floor(R.image.width*rt),Rt=Math.floor(R.image.height*rt),wt=K!==null?K.x:0,Nt=K!==null?K.y:0;$t.setTexture2D(R,0),B.copyTexSubImage2D(B.TEXTURE_2D,at,0,0,wt,Nt,Q,Rt),bt.unbindTexture()};const Fc=B.createFramebuffer(),Nl=B.createFramebuffer();this.copyTextureToTexture=function(R,K,at=null,rt=null,Q=0,Rt=null){Rt===null&&(Q!==0?(ro("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Rt=Q,Q=0):Rt=0);let wt,Nt,Dt,te,oe,Qt,ye,Ne,He;const Oe=R.isCompressedTexture?R.mipmaps[Rt]:R.image;if(at!==null)wt=at.max.x-at.min.x,Nt=at.max.y-at.min.y,Dt=at.isBox3?at.max.z-at.min.z:1,te=at.min.x,oe=at.min.y,Qt=at.isBox3?at.min.z:0;else{const pn=Math.pow(2,-Q);wt=Math.floor(Oe.width*pn),Nt=Math.floor(Oe.height*pn),R.isDataArrayTexture?Dt=Oe.depth:R.isData3DTexture?Dt=Math.floor(Oe.depth*pn):Dt=1,te=0,oe=0,Qt=0}rt!==null?(ye=rt.x,Ne=rt.y,He=rt.z):(ye=0,Ne=0,He=0);const we=Ot.convert(K.format),Wt=Ot.convert(K.type);let Pe;K.isData3DTexture?($t.setTexture3D(K,0),Pe=B.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?($t.setTexture2DArray(K,0),Pe=B.TEXTURE_2D_ARRAY):($t.setTexture2D(K,0),Pe=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,K.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,K.unpackAlignment);const xe=B.getParameter(B.UNPACK_ROW_LENGTH),on=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Je=B.getParameter(B.UNPACK_SKIP_PIXELS),On=B.getParameter(B.UNPACK_SKIP_ROWS),wa=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Oe.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Oe.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,te),B.pixelStorei(B.UNPACK_SKIP_ROWS,oe),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Qt);const Ye=R.isDataArrayTexture||R.isData3DTexture,ln=K.isDataArrayTexture||K.isData3DTexture;if(R.isDepthTexture){const pn=jt.get(R),Tn=jt.get(K),bn=jt.get(pn.__renderTarget),tr=jt.get(Tn.__renderTarget);bt.bindFramebuffer(B.READ_FRAMEBUFFER,bn.__webglFramebuffer),bt.bindFramebuffer(B.DRAW_FRAMEBUFFER,tr.__webglFramebuffer);for(let ea=0;ea<Dt;ea++)Ye&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,jt.get(R).__webglTexture,Q,Qt+ea),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,jt.get(K).__webglTexture,Rt,He+ea)),B.blitFramebuffer(te,oe,wt,Nt,ye,Ne,wt,Nt,B.DEPTH_BUFFER_BIT,B.NEAREST);bt.bindFramebuffer(B.READ_FRAMEBUFFER,null),bt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(Q!==0||R.isRenderTargetTexture||jt.has(R)){const pn=jt.get(R),Tn=jt.get(K);bt.bindFramebuffer(B.READ_FRAMEBUFFER,Fc),bt.bindFramebuffer(B.DRAW_FRAMEBUFFER,Nl);for(let bn=0;bn<Dt;bn++)Ye?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,pn.__webglTexture,Q,Qt+bn):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,pn.__webglTexture,Q),ln?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Tn.__webglTexture,Rt,He+bn):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Tn.__webglTexture,Rt),Q!==0?B.blitFramebuffer(te,oe,wt,Nt,ye,Ne,wt,Nt,B.COLOR_BUFFER_BIT,B.NEAREST):ln?B.copyTexSubImage3D(Pe,Rt,ye,Ne,He+bn,te,oe,wt,Nt):B.copyTexSubImage2D(Pe,Rt,ye,Ne,te,oe,wt,Nt);bt.bindFramebuffer(B.READ_FRAMEBUFFER,null),bt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else ln?R.isDataTexture||R.isData3DTexture?B.texSubImage3D(Pe,Rt,ye,Ne,He,wt,Nt,Dt,we,Wt,Oe.data):K.isCompressedArrayTexture?B.compressedTexSubImage3D(Pe,Rt,ye,Ne,He,wt,Nt,Dt,we,Oe.data):B.texSubImage3D(Pe,Rt,ye,Ne,He,wt,Nt,Dt,we,Wt,Oe):R.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Rt,ye,Ne,wt,Nt,we,Wt,Oe.data):R.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Rt,ye,Ne,Oe.width,Oe.height,we,Oe.data):B.texSubImage2D(B.TEXTURE_2D,Rt,ye,Ne,wt,Nt,we,Wt,Oe);B.pixelStorei(B.UNPACK_ROW_LENGTH,xe),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,on),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Je),B.pixelStorei(B.UNPACK_SKIP_ROWS,On),B.pixelStorei(B.UNPACK_SKIP_IMAGES,wa),Rt===0&&K.generateMipmaps&&B.generateMipmap(Pe),bt.unbindTexture()},this.copyTextureToTexture3D=function(R,K,at=null,rt=null,Q=0){return ro('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,K,at,rt,Q)},this.initRenderTarget=function(R){jt.get(R).__webglFramebuffer===void 0&&$t.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?$t.setTextureCube(R,0):R.isData3DTexture?$t.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?$t.setTexture2DArray(R,0):$t.setTexture2D(R,0),bt.unbindTexture()},this.resetState=function(){I=0,L=0,F=null,bt.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ba}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Ue._getDrawingBufferColorSpace(e),i.unpackColorSpace=Ue._getUnpackColorSpace()}}const vS={type:"change"},$p={type:"start"},$S={type:"end"},Ec=new zS,SS=new ls,gC=Math.cos(70*Wp.DEG2RAD),_n=new tt,Qn=2*Math.PI,Xe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Wd=1e-6;class vC extends LT{constructor(e,i=null){super(e,i),this.state=Xe.NONE,this.target=new tt,this.cursor=new tt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ao.ROTATE,MIDDLE:ao.DOLLY,RIGHT:ao.PAN},this.touches={ONE:no.ROTATE,TWO:no.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new tt,this._lastQuaternion=new Ks,this._lastTargetPosition=new tt,this._quat=new Ks().setFromUnitVectors(e.up,new tt(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new qv,this._sphericalDelta=new qv,this._scale=1,this._panOffset=new tt,this._rotateStart=new me,this._rotateEnd=new me,this._rotateDelta=new me,this._panStart=new me,this._panEnd=new me,this._panDelta=new me,this._dollyStart=new me,this._dollyEnd=new me,this._dollyDelta=new me,this._dollyDirection=new tt,this._mouse=new me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=yC.bind(this),this._onPointerDown=SC.bind(this),this._onPointerUp=xC.bind(this),this._onContextMenu=CC.bind(this),this._onMouseWheel=TC.bind(this),this._onKeyDown=bC.bind(this),this._onTouchStart=AC.bind(this),this._onTouchMove=RC.bind(this),this._onMouseDown=MC.bind(this),this._onMouseMove=EC.bind(this),this._interceptControlDown=wC.bind(this),this._interceptControlUp=DC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(vS),this.update(),this.state=Xe.NONE}update(e=null){const i=this.object.position;_n.copy(i).sub(this.target),_n.applyQuaternion(this._quat),this._spherical.setFromVector3(_n),this.autoRotate&&this.state===Xe.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Qn:s>Math.PI&&(s-=Qn),l<-Math.PI?l+=Qn:l>Math.PI&&(l-=Qn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=h!=this._spherical.radius}if(_n.setFromSpherical(this._spherical),_n.applyQuaternion(this._quatInverse),i.copy(this.target).add(_n),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=_n.length();h=this._clampDistance(d*this._scale);const p=d-h;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),f=!!p}else if(this.object.isOrthographicCamera){const d=new tt(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=p!==this.object.zoom;const g=new tt(this._mouse.x,this._mouse.y,0);g.unproject(this.object),this.object.position.sub(g).add(d),this.object.updateMatrixWorld(),h=_n.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Ec.origin.copy(this.object.position),Ec.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ec.direction))<gC?this.object.lookAt(this.target):(SS.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ec.intersectPlane(SS,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>Wd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Wd||this._lastTargetPosition.distanceToSquared(this.target)>Wd?(this.dispatchEvent(vS),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qn/60*this.autoRotateSpeed*e:Qn/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){_n.setFromMatrixColumn(i,0),_n.multiplyScalar(-e),this._panOffset.add(_n)}_panUp(e,i){this.screenSpacePanning===!0?_n.setFromMatrixColumn(i,1):(_n.setFromMatrixColumn(i,0),_n.crossVectors(this.object.up,_n)),_n.multiplyScalar(e),this._panOffset.add(_n)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;_n.copy(l).sub(this.target);let f=_n.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*f/s.clientHeight,this.object.matrix),this._panUp(2*i*f/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,f=i-s.top,h=s.width,d=s.height;this._mouse.x=l/h*2-1,this._mouse.y=-(f/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,f=Math.sqrt(s*s+l*l);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),f=.5*(e.pageY+s.y);this._rotateEnd.set(l,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,f=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(e.pageX+i.x)*.5,d=(e.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new me,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function SC(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function yC(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function xC(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent($S),this.state=Xe.NONE;break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function MC(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ao.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=Xe.DOLLY;break;case ao.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Xe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Xe.ROTATE}break;case ao.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Xe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Xe.PAN}break;default:this.state=Xe.NONE}this.state!==Xe.NONE&&this.dispatchEvent($p)}function EC(o){switch(this.state){case Xe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case Xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case Xe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function TC(o){this.enabled===!1||this.enableZoom===!1||this.state!==Xe.NONE||(o.preventDefault(),this.dispatchEvent($p),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent($S))}function bC(o){this.enabled!==!1&&this._handleKeyDown(o)}function AC(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case no.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=Xe.TOUCH_ROTATE;break;case no.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=Xe.TOUCH_PAN;break;default:this.state=Xe.NONE}break;case 2:switch(this.touches.TWO){case no.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=Xe.TOUCH_DOLLY_PAN;break;case no.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=Xe.TOUCH_DOLLY_ROTATE;break;default:this.state=Xe.NONE}break;default:this.state=Xe.NONE}this.state!==Xe.NONE&&this.dispatchEvent($p)}function RC(o){switch(this._trackPointer(o),this.state){case Xe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case Xe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case Xe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case Xe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=Xe.NONE}}function CC(o){this.enabled!==!1&&o.preventDefault()}function wC(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function DC(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function tm(o){let e=o>>>0;return function(){e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}function Tc(o,e,i){let s=i+Math.imul(o,374761393)+Math.imul(e,668265263)|0;return s=Math.imul(s^s>>>13,1274126177),s=(s^s>>>16)>>>0,s/4294967296}function yS(o){return o*o*(3-2*o)}function UC(o,e,i){const s=Math.floor(o),l=Math.floor(e),f=o-s,h=e-l,d=Tc(s,l,i),p=Tc(s+1,l,i),g=Tc(s,l+1,i),v=Tc(s+1,l+1,i),m=yS(f),S=yS(h);return d+(p-d)*m+(g-d)*S+(d-p-g+v)*m*S}function bl(o,e,i,s=4){let l=.5,f=1,h=0,d=0;for(let p=0;p<s;p++)h+=UC(o*f,e*f,i+p*1013|0)*l,d+=l,l*=.5,f*=2;return h/d}function NC(o,e,i,s=4){const l=bl(o,e,i,s);return Math.pow(1-Math.abs(2*l-1),1.35)}function LC(o,e,i){const s=Math.min(1,Math.max(0,(i-o)/(e-o)));return s*s*(3-2*s)}const cs=3,em=5;function OC(o,e){const i=new Int16Array(o*o),s=o/2,l=e|0,f=[{x:-.04*o,z:-.16*o,amp:.52,sig:.15*o},{x:.26*o,z:.02*o,amp:.36,sig:.12*o},{x:-.3*o,z:.08*o,amp:.3,sig:.11*o},{x:.14*o,z:-.3*o,amp:.33,sig:.1*o},{x:-.18*o,z:.28*o,amp:.22,sig:.1*o}],h=.52*o*.62;for(let d=0;d<o;d++)for(let p=0;p<o;p++){const g=p-s,v=d-s,m=Math.sqrt(g*g+v*v)/s,S=LC(1,.3,m),M=NC(g*.028,v*.028,l,4),T=bl(g*.09,v*.09,l+77,3)-.5;let A=0;for(const y of f){const O=g-y.x,N=v-y.z,D=Math.exp(-(O*O+N*N)/(2*y.sig*y.sig)),G=.8+.4*bl(g*.05+y.x,v*.05+y.z,l+31,3);A+=y.amp*h*D*G}let x=(M*h*.55+A+T*h*.16)*S;x+=1.6*(1-S),x+=.6,i[d*o+p]=Math.max(1,Math.round(x))}return PC(i,o,2),i}function PC(o,e,i){let s=o;for(let l=0;l<i;l++){const f=new Int16Array(s.length);for(let h=0;h<e;h++)for(let d=0;d<e;d++){let p=0,g=0;for(let v=-1;v<=1;v++){const m=h+v;if(!(m<0||m>=e))for(let S=-1;S<=1;S++){const M=d+S;M<0||M>=e||(p+=s[m*e+M],g++)}}f[h*e+d]=Math.round(p/g)}s=f}o.set(s)}function zC(o,e,i,s){const l=o[s*e+i];let f=0,h=0;for(const[d,p]of IC){const g=i+d,v=s+p;g<0||g>=e||v<0||v>=e||(f+=Math.abs(o[v*e+g]-l),h++)}return h?f/h:0}const IC=[[1,0],[-1,0],[0,1],[0,-1]];function BC(o,e,i,s,l){const f=new Map,h=new Set,d=e/2,p=tm(i^24301),g=(T,A,x)=>`${T},${A},${x}`,v=(T,A,x,y,O=1)=>{const N=g(T,A,x),D=f.get(N);(!D||O>D.kind||y<D.flow)&&f.set(N,{flow:y,kind:Math.max(O,D?D.kind:0)})},m=[];for(let T=2;T<e-2;T++)for(let A=2;A<e-2;A++){const x=o[T*e+A];if(x>em+14){const y=(T>e/2?28:0)+(A>e/2?8:0);m.push({i:A,j:T,h:x,score:x+y})}}m.sort((T,A)=>A.score-T.score);const S=[],M=Math.max(14,e*.16);for(const T of m){if(S.length>=s)break;S.every(x=>{const y=x.i-T.i,O=x.j-T.j;return y*y+O*O>M*M})&&S.push(T)}for(const T of S)FC(o,e,T.i,T.j,{addWater:v,pathCells:h,rng:p,half:d,width:l});return{cells:f,pathCells:h}}function FC(o,e,i,s,l){const{addWater:f,pathCells:h,rng:d,half:p,width:g}=l;let v=i,m=s,S=o[m*e+v],M=0,T=0,A=1,x=0;const y=e*4;for(;x++<y;){if(h.add(`${v},${m}`),f(v-p,S+1,m-p,M),M+=1,S<=em){GC(o,e,v,m,p,M,d,f,h,g+1);break}let O=1/0;for(let G=-1;G<=1;G++)for(let I=-1;I<=1;I++){if(I===0&&G===0)continue;const L=v+I,F=m+G;if(L<1||L>=e-1||F<1||F>=e-1)continue;const U=o[F*e+L];U<O&&(O=U)}if(O===1/0)break;let N=null;for(let G=-1;G<=1;G++)for(let I=-1;I<=1;I++){if(I===0&&G===0)continue;const L=v+I,F=m+G;if(L<1||L>=e-1||F<1||F>=e-1||o[F*e+L]>O)continue;const U=G*1.6+(I*T+G*A)*1.2+-Math.abs(I)*.35+d()*.4;(!N||U>N.score)&&(N={ni:L,nj:F,score:U})}if(!N)break;let D=O;if(O>=S){if(S-1<cs+1)break;o[N.nj*e+N.ni]=S-1,D=S-1}for(let G=D+1;G<=S+1;G++)f(N.ni-p,G,N.nj-p,M+(S-G)*.15);h.add(`${N.ni},${N.nj}`),g>1&&HC(o,e,N.ni,N.nj,D,g,M,p,f,h),T=N.ni-v,A=N.nj-m,v=N.ni,m=N.nj,S=D,M+=1}}function HC(o,e,i,s,l,f,h,d,p,g){const v=f-1;for(let m=-v;m<=v;m++)for(let S=-v;S<=v;S++){if(S===0&&m===0)continue;const M=i+S,T=s+m;if(M<0||M>=e||T<0||T>=e)continue;const A=o[T*e+M];Math.abs(A-l)>1||(p(M-d,A+1,T-d,h+.3),g.add(`${M},${T}`))}}function GC(o,e,i,s,l,f,h,d,p,g){for(let v=-g;v<=g;v++)for(let m=-g;m<=g;m++){const S=i+m,M=s+v;if(S<0||S>=e||M<0||M>=e)continue;const T=Math.abs(m)+Math.abs(v);if(T>g+1||h()>.75-T*.12)continue;const A=o[M*e+S];d(S-l,A+1,M-l,f+T*.4,2),h()<.3&&A+2<=em+3&&d(S-l,A+2,M-l,f+T*.4,2),p.add(`${S},${M}`)}}function VC(o,e,i){const s=e/2;for(let l=0;l<e;l++)for(let f=0;f<e;f++){const h=o[l*e+f];if(h>=cs)continue;const d=f-s,p=l-s,g=-(bl(d*.12,p*.12,4242,3)*14+1);for(let v=h+1;v<=cs;v++){const m=`${d},${v},${p}`;i.has(m)||i.set(m,{flow:g,kind:0})}}}function XC(o,e,i,s){const l=tm(e^49421|0),f=o/2,h=[],d=Math.floor(s*o*.6),p=9500,g=e|0;for(let v=0;v<d*3&&h.length/3<p;v++){const m=(l()-.5)*o*1.02,S=(l()-.5)*o*1.02,M=Math.sqrt(m*m+S*S)/f,T=M<.45?1:M<.7?.8:.35;if(l()>T)continue;const A=i+Math.round((l()-.5)*4),x=4+l()*8,y=1.2+l()*1.6,O=4+l()*8,N=Math.floor(m-x)-1,D=Math.ceil(m+x)+1,G=Math.floor(S-O)-1,I=Math.ceil(S+O)+1,L=Math.floor(A-y)-1,F=Math.ceil(A+y)+1;for(let U=L;U<=F;U++)for(let C=G;C<=I;C++)for(let H=N;H<=D&&!(h.length/3>=p);H++){const ot=(H+.5-m)/x,st=(U+.5-A)/y,mt=(C+.5-S)/O,ct=ot*ot+st*st+mt*mt;if(ct>1)continue;const Y=bl(H*.35,C*.35+U*.5,g+999,2);ct>.5&&Y<.42||H<-f-6||H>f+6||C<-f-6||C>f+6||h.push(H,U,C)}}return new Float32Array(h)}function kC(o,e,i,s,l){const f=tm(i^32485|0),h=e/2;jd.fill(0);const d=[],p=[],g=Math.floor(900*s)+40,v=26;let m=0;for(let S=0;S<e*e*2&&m<g;S++){const M=2+Math.floor(f()*(e-4)),T=2+Math.floor(f()*(e-4)),A=o[T*e+M];if(A<=cs||A>v||zC(o,e,M,T)>2.2||l.has(`${M},${T}`)||f()>s*.5)continue;let x=!1;for(let G=-2;G<=2&&!x;G++)for(let I=-2;I<=2;I++){const L=M+I,F=T+G;if(!(L<0||L>=e||F<0||F>=e)&&jd[F*e+L]){x=!0;break}}if(x)continue;jd[T*e+M]=1,m++;const y=M-h,O=T-h,N=3+Math.floor(f()*2);for(let G=1;G<=N;G++)d.push(y,A+G,O);const D=A+N;for(let G=0;G<=2;G++){const I=G===2?1:2;for(let L=-I;L<=I;L++)for(let F=-I;F<=I;F++)Math.abs(F)===I&&Math.abs(L)===I&&f()<.6||G===0&&Math.abs(F)===2&&Math.abs(L)===2||p.push(y+F,D+G,O+L)}p.push(y,D+3,O)}return{trunks:new Float32Array(d),leaves:new Float32Array(p)}}const jd=new Uint8Array(1024*1024),YC=["seed","gridSize","waterfallCount","waterfallWidth","cloudHeight","cloudDensity","treeDensity"],bc=new mo(1,1,1);function Ac(o,e,i){return o.clone().lerp(e,i)}function qC(o){const e={horizon:new ne("#ffb894"),zenith:new ne("#4a6bb5"),sun:new ne("#ff9d5c"),fog:new ne("#edc0a6")},i={horizon:new ne("#d6ecf8"),zenith:new ne("#4f8fd6"),sun:new ne("#fff3de"),fog:new ne("#cfe4ef")},s={horizon:new ne("#ff9470"),zenith:new ne("#45598f"),sun:new ne("#ff8a5a"),fog:new ne("#e0aa98")},l=Wp.clamp(o,0,1),f=l<.5?e:i,h=l<.5?i:s,d=l<.5?l*2:(l-.5)*2;return{horizon:Ac(f.horizon,h.horizon,d),zenith:Ac(f.zenith,h.zenith,d),sun:Ac(f.sun,h.sun,d),fog:Ac(f.fog,h.fog,d)}}function WC(o){const e=Wp.clamp(o,0,1),i=6+68*Math.sin(e*Math.PI),s=-70+140*e,l=i*Math.PI/180,f=s*Math.PI/180;return new tt(Math.sin(f)*Math.cos(l),Math.sin(l),Math.cos(f)*Math.cos(l)).normalize()}function jC(o,e,i,s,l){if(o>=i)l.setRGB(1.05,1.1,1.25);else if(o>=s||e>4.5){const f=(o-s)/Math.max(1,i-s);l.setRGB(.46+f*.15,.43+f*.13,.4+f*.12)}else{const f=o/s;l.setRGB(.28+f*.16,.46-f*.06,.2+f*.04)}return l}function ZC(){const o=new _l({color:16777215,transparent:!0,opacity:.92,depthWrite:!0});return o.userData.uTime={value:0},o.onBeforeCompile=e=>{e.uniforms.uTime=o.userData.uTime,e.vertexShader=`attribute float aFlow;
varying float vFlow;
varying float vInstY;
`+e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        #ifdef USE_INSTANCING
          vInstY = instanceMatrix[3].y;
        #else
          vInstY = 0.0;
        #endif
        vFlow = aFlow;`),e.fragmentShader=`uniform float uTime;
varying float vFlow;
varying float vInstY;
`+e.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
        {
          float isSea = 1.0 - step(-0.5, vFlow);
          float phase = vFlow + isSea * 1.0;
          float wave = sin(phase * 0.9 - uTime * 5.0 + vInstY * 1.3);
          float shimmer = 0.9 + 0.16 * wave;
          diffuseColor.rgb *= mix(1.0, shimmer, 1.0 - isSea * 0.5);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0), smoothstep(0.9, 1.06, wave) * 0.3 * (1.0 - isSea));
        }`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
        // Waterfalls / foam self-lift so they read on shaded faces; sea stays
        // flat-lit to match the outer ocean plane.
        totalEmissiveRadiance += vec3(0.1, 0.24, 0.38) * step(-0.5, vFlow);`)},o}class KC{constructor(e){this.container=e,this.renderer=new _C({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=MS,this.renderer.toneMapping=ES,this.renderer.toneMappingExposure=1.05,e.appendChild(this.renderer.domElement),this.scene=new ST,this.camera=new xi(50,e.clientWidth/e.clientHeight,.5,2e3),this.controls=new vC(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.06,this.controls.maxPolarAngle=Math.PI*.49,this.controls.minDistance=30,this.controls.maxDistance=900,this.sun=new DT(16777215,1.6),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-4e-4,this.scene.add(this.sun),this.scene.add(this.sun.target),this.hemi=new RT(12572927,7035466,.65),this.scene.add(this.hemi),this.skyUniforms={uZenith:{value:new ne("#4f8fd6")},uHorizon:{value:new ne("#d6ecf8")},uSunColor:{value:new ne("#fff3de")},uSunDir:{value:new tt(0,1,0)}};const i=new Ra({uniforms:this.skyUniforms,side:kn,depthWrite:!1,fog:!1,vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 uZenith;
        uniform vec3 uHorizon;
        uniform vec3 uSunColor;
        uniform vec3 uSunDir;
        varying vec3 vDir;
        void main() {
          vec3 dir = normalize(vDir);
          float h = dir.y;
          vec3 col = mix(uHorizon, uZenith, pow(clamp(h, 0.0, 1.0), 0.55));
          if (h < 0.0) col = mix(uHorizon, uHorizon * 0.7, clamp(-h * 2.5, 0.0, 1.0));
          float sun = max(dot(dir, normalize(uSunDir)), 0.0);
          col += uSunColor * (pow(sun, 40.0) * 1.1 + pow(sun, 5.0) * 0.22);
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `});this.sky=new li(new Qp(900,32,16),i),this.sky.frustumCulled=!1,this.scene.add(this.sky),this.terrainMesh=null,this.waterMesh=null,this.cloudMesh=null,this.propMesh=null,this.waterMaterial=ZC(),this.fog=new Zp(13624559,200,700),this.scene.fog=this.fog,this.stats={grid:0,terrain:0,water:0,clouds:0,props:0,total:0},this.prevOptions=null,this.clock=new NT,this._onResize=()=>this.resize(),this.resizeObserver=new ResizeObserver(this._onResize),this.resizeObserver.observe(e),this._disposed=!1}update(e){const i=this.prevOptions;(!i||YC.some(l=>i[l]!==e[l]))&&this.rebuild(e),this.applyEnvironment(e),this.prevOptions={...e},this.statsListener?.(this.stats)}rebuild(e){const{seed:i,gridSize:s,waterfallCount:l,waterfallWidth:f}=e;this._disposeMesh("terrainMesh"),this._disposeMesh("waterMesh"),this._disposeMesh("cloudMesh"),this._disposeMesh("propMesh"),this._disposeMesh("oceanMesh");const h=OC(s,i);let d=0;for(let lt=0;lt<h.length;lt++)h[lt]>d&&(d=h[lt]);const p=[];for(let lt=0;lt<h.length;lt+=3)h[lt]>cs&&p.push(h[lt]);p.sort((lt,gt)=>lt-gt);const g=lt=>p[Math.min(p.length-1,Math.floor(lt*p.length))],v=g(.85),m=g(.3),{cells:S,pathCells:M}=BC(h,s,i,l,f);VC(h,s,S);const T=new ne,A=s/2;let x=0;const y=new Int32Array(s*s),O=new Int32Array(s*s);for(let lt=0;lt<s;lt++)for(let gt=0;gt<s;gt++){const Ct=lt*s+gt,qt=h[Ct];let B=qt;for(const[We,le]of[[1,0],[-1,0],[0,1],[0,-1]]){const ae=gt+We,bt=lt+le;if(ae<0||ae>=s||bt<0||bt>=s){B=Math.min(B,qt-1);continue}B=Math.min(B,h[bt*s+ae])}y[Ct]=qt,O[Ct]=Math.max(Math.min(B,qt-1)+1,qt-40),x+=qt-O[Ct]+1}const N=new vc(bc,this._terrainMaterial(),x);N.castShadow=!0,N.receiveShadow=!0;const D=new Ke;let G=0;for(let lt=0;lt<s;lt++)for(let gt=0;gt<s;gt++){const Ct=lt*s+gt,qt=y[Ct],B=gt-A,We=lt-A,le=qt-Math.min(gt+1<s?h[Ct+1]:qt,gt>0?h[Ct-1]:qt,lt+1<s?h[Ct+s]:qt,lt>0?h[Ct-s]:qt),ae=O[Ct];for(let bt=ae;bt<=qt;bt++){if(D.setPosition(B,bt,We),N.setMatrixAt(G,D),bt===qt)jC(qt,le,v,m,T);else{const $t=.72+(bt%5+5)%5*.045;T.setRGB(.44*$t,.4*$t,.36*$t),qt<cs+2&&bt<=cs&&T.setRGB(.32,.3,.27)}const fe=.94+(gt*7+lt*13+bt*3)%10*.012;N.setColorAt(G,T.clone().multiplyScalar(fe)),G++}}N.instanceMatrix.needsUpdate=!0,N.instanceColor&&(N.instanceColor.needsUpdate=!0),N.computeBoundingSphere(),this.scene.add(N),this.terrainMesh=N;const I=G;let L=S.size;const F=new vc(bc,this.waterMaterial,Math.max(1,L)),U=new Float32Array(Math.max(1,L)),C=new ne;let H=0,ot=0,st=0,mt=0;for(const[lt,gt]of S){const[Ct,qt,B]=lt.split(",").map(Number);D.setPosition(Ct,qt,B),F.setMatrixAt(H,D),U[H]=gt.flow,gt.kind===0?C.setRGB(.1,.36,.52):gt.kind===2?C.setRGB(.88,.96,1):(C.setRGB(.45,.76,1),st+=Ct,mt+=B,ot++),F.setColorAt(H,C),H++}F.count=H,F.geometry.setAttribute("aFlow",new Op(U,1)),F.instanceMatrix.needsUpdate=!0,F.instanceColor&&(F.instanceColor.needsUpdate=!0),F.computeBoundingSphere(),this.scene.add(F),this.waterMesh=F,this._oceanMat||(this._oceanMat=new _l({color:new ne().setRGB(.11,.38,.55)}));const ct=new li(new wl(s*5,s*5),this._oceanMat);ct.rotation.x=-Math.PI/2,ct.position.y=cs+.49,this.scene.add(ct),this.oceanMesh=ct;const Y=XC(s,i,e.cloudHeight,e.cloudDensity),it=Y.length/3,W=new vc(bc,this._cloudMaterial(),Math.max(1,it));W.count=it;const xt=new ne;for(let lt=0;lt<it;lt++){D.setPosition(Y[lt*3],Y[lt*3+1],Y[lt*3+2]),W.setMatrixAt(lt,D);const gt=.9+lt*17%10*.01;xt.setRGB(gt,gt,Math.min(1,gt+.02)),W.setColorAt(lt,xt)}W.instanceMatrix.needsUpdate=!0,W.instanceColor&&(W.instanceColor.needsUpdate=!0),W.computeBoundingSphere(),this.scene.add(W),this.cloudMesh=W;const yt=kC(h,s,i,e.treeDensity,M),Ft=yt.trunks.length/3,ie=yt.leaves.length/3,re=new vc(bc,this._propMaterial(),Math.max(1,Ft+ie));let w=0;for(let lt=0;lt<Ft;lt++)D.setPosition(yt.trunks[lt*3],yt.trunks[lt*3+1],yt.trunks[lt*3+2]),re.setMatrixAt(w,D),T.setRGB(.36,.24,.13),re.setColorAt(w,T),w++;for(let lt=0;lt<ie;lt++){D.setPosition(yt.leaves[lt*3],yt.leaves[lt*3+1],yt.leaves[lt*3+2]),re.setMatrixAt(w,D);const gt=.85+lt*7%8*.03;T.setRGB(.16*gt,.42*gt,.14*gt),re.setColorAt(w,T),w++}re.count=w,re.instanceMatrix.needsUpdate=!0,re.instanceColor&&(re.instanceColor.needsUpdate=!0),re.castShadow=!0,re.receiveShadow=!0,re.computeBoundingSphere(),this.scene.add(re),this.propMesh=re;const Z=s*1.12;this.controls.target.set(0,d*.35,0);const _t=ot?Math.atan2(st/ot*.5+s*.18,mt/ot*.5+s*.55):Math.atan2(.62,.78),ut=Z*.99;this.camera.position.set(Math.sin(_t)*ut,Z*.5,Math.cos(_t)*ut),this.controls.update();const Tt=this.sun.shadow.camera,It=s*.75;Tt.left=-It,Tt.right=It,Tt.top=It,Tt.bottom=-It,Tt.near=1,Tt.far=s*3,Tt.updateProjectionMatrix(),this.maxH=d,this.gridN=s,this.stats={grid:`${s} x ${s}`,terrain:I,water:H,clouds:it,props:w,total:I+H+it+w}}applyEnvironment(e){const i=qC(e.timeOfDay),s=WC(e.timeOfDay);this.skyUniforms.uZenith.value.copy(i.zenith),this.skyUniforms.uHorizon.value.copy(i.horizon),this.skyUniforms.uSunColor.value.copy(i.sun),this.skyUniforms.uSunDir.value.copy(s);const l=this.gridN||e.gridSize;this.sun.position.copy(s).multiplyScalar(l*1.6),this.sun.position.y=Math.max(this.sun.position.y,l*.3),this.sun.target.position.set(0,(this.maxH||30)*.3,0),this.sun.color.copy(i.sun),this.sun.intensity=1.1+.7*Math.sin(e.timeOfDay*Math.PI),this.hemi.color.copy(i.zenith),this.hemi.groundColor.setRGB(.42,.36,.3),this.hemi.intensity=.72,this.fog.color.copy(i.fog),this.scene.background=i.fog,this.fog.near=l*.55,this.fog.far=l*(5.5-e.fogDensity*4),this.controls.autoRotate=e.autoRotate,this.controls.autoRotateSpeed=.4}_terrainMaterial(){return this._terrainMat||(this._terrainMat=new _l),this._terrainMat}_cloudMaterial(){return this._cloudMat||(this._cloudMat=new _l({transparent:!0,opacity:.9,depthWrite:!0,emissive:10133676,emissiveIntensity:.55})),this._cloudMat}_propMaterial(){return this._propMat||(this._propMat=new _l),this._propMat}_disposeMesh(e){const i=this[e];i&&(this.scene.remove(i),typeof i.dispose=="function"&&i.dispose(),this[e]=null)}resize(){const e=this.container.clientWidth,i=this.container.clientHeight;!e||!i||(this.camera.aspect=e/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,i))}start(){const e=()=>{if(this._disposed)return;this._raf=requestAnimationFrame(e);const i=this.clock.getDelta();this.waterMaterial.userData.uTime.value+=i,this.controls.update(),this.renderer.render(this.scene,this.camera)};e()}dispose(){this._disposed=!0,cancelAnimationFrame(this._raf),this.resizeObserver.disconnect(),this._disposeMesh("terrainMesh"),this._disposeMesh("waterMesh"),this._disposeMesh("cloudMesh"),this._disposeMesh("propMesh"),this._disposeMesh("oceanMesh"),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}}const QC={seed:20260922,gridSize:208,waterfallCount:2,waterfallWidth:2,cloudHeight:32,cloudDensity:1,treeDensity:.6,timeOfDay:.18,fogDensity:.35,autoRotate:!0};function JC({options:o,onStats:e}){const i=Ea.useRef(null),s=Ea.useRef(null),l=Ea.useRef(e);return l.current=e,Ea.useEffect(()=>{const f=new KC(i.current);return s.current=f,f.statsListener=h=>l.current?.(h),window.__voxelWorld=f,f.update(o),f.start(),()=>{f.dispose(),s.current=null,window.__voxelWorld===f&&delete window.__voxelWorld}},[]),Ea.useEffect(()=>{s.current?.update(o)},[o]),_e.jsx("div",{className:"scene",ref:i})}function xa({label:o,value:e,min:i,max:s,step:l=1,onChange:f,format:h}){return _e.jsxs("label",{className:"opt",children:[_e.jsxs("span",{className:"opt-label",children:[o,_e.jsx("em",{children:h?h(e):e})]}),_e.jsx("input",{type:"range",min:i,max:s,step:l,value:e,onChange:d=>f(Number(d.target.value))})]})}function $C({options:o,setOptions:e,stats:i}){const s=Ea.useCallback(l=>f=>e(h=>({...h,[l]:f})),[e]);return _e.jsxs("aside",{className:"panel",children:[_e.jsx("h1",{children:"体素瀑布 · Voxel Waterfall"}),i.grid?_e.jsxs("div",{className:"stats",children:[_e.jsxs("div",{children:["网格 ",_e.jsx("b",{children:i.grid})]}),_e.jsxs("div",{children:["体素总数 ",_e.jsx("b",{children:i.total.toLocaleString()})]}),_e.jsxs("div",{className:"stats-sub",children:["山体 ",i.terrain.toLocaleString()," · 水体 ",i.water.toLocaleString()," · 云 ",i.clouds.toLocaleString()," · 植被 ",i.props.toLocaleString()]})]}):_e.jsx("div",{className:"stats",children:"生成中…"}),_e.jsxs("section",{children:[_e.jsx("h2",{children:"地形"}),_e.jsx(xa,{label:"随机种子",value:o.seed,min:1,max:99999,onChange:s("seed")}),_e.jsx(xa,{label:"网格尺寸",value:o.gridSize,min:200,max:260,step:2,onChange:s("gridSize"),format:l=>`${l} × ${l}`})]}),_e.jsxs("section",{children:[_e.jsx("h2",{children:"瀑布"}),_e.jsx(xa,{label:"瀑布道数",value:o.waterfallCount,min:1,max:3,onChange:s("waterfallCount")}),_e.jsx(xa,{label:"水流宽度",value:o.waterfallWidth,min:1,max:3,onChange:s("waterfallWidth")})]}),_e.jsxs("section",{children:[_e.jsx("h2",{children:"云层"}),_e.jsx(xa,{label:"云带高度",value:o.cloudHeight,min:14,max:48,onChange:s("cloudHeight")}),_e.jsx(xa,{label:"云量",value:o.cloudDensity,min:.2,max:1.8,step:.1,onChange:s("cloudDensity"),format:l=>`${Math.round(l*100)}%`})]}),_e.jsxs("section",{children:[_e.jsx("h2",{children:"环境"}),_e.jsx(xa,{label:"晨昏时间",value:o.timeOfDay,min:0,max:1,step:.02,onChange:s("timeOfDay"),format:l=>l<.33?"清晨":l<.66?"正午":"黄昏"}),_e.jsx(xa,{label:"雾气",value:o.fogDensity,min:0,max:1,step:.05,onChange:s("fogDensity"),format:l=>`${Math.round(l*100)}%`}),_e.jsx(xa,{label:"植被密度",value:o.treeDensity,min:0,max:1,step:.05,onChange:s("treeDensity"),format:l=>`${Math.round(l*100)}%`}),_e.jsxs("label",{className:"opt opt-check",children:[_e.jsx("input",{type:"checkbox",checked:o.autoRotate,onChange:l=>s("autoRotate")(l.target.checked)}),_e.jsx("span",{children:"自动环绕"})]})]}),_e.jsx("button",{className:"btn",onClick:()=>s("seed")(1+Math.floor(Math.random()*99998)),children:"随机生成新地形"}),_e.jsx("p",{className:"hint",children:"拖拽旋转 · 滚轮缩放 · 右键平移"})]})}function t2(){const[o,e]=Ea.useState(QC),[i,s]=Ea.useState({});return _e.jsxs("div",{className:"app",children:[_e.jsx(JC,{options:o,onStats:s}),_e.jsx($C,{options:o,setOptions:e,stats:i})]})}XM.createRoot(document.getElementById("root")).render(_e.jsx(Ea.StrictMode,{children:_e.jsx(t2,{})}));
