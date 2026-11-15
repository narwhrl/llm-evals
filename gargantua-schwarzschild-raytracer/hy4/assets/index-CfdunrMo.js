(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function r(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();var eh={exports:{}},No={};var b_;function xx(){if(b_)return No;b_=1;var s=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(r,l,u){var h=null;if(u!==void 0&&(h=""+u),l.key!==void 0&&(h=""+l.key),"key"in l){u={};for(var d in l)d!=="key"&&(u[d]=l[d])}else u=l;return l=u.ref,{$$typeof:s,type:r,key:h,ref:l!==void 0?l:null,props:u}}return No.Fragment=t,No.jsx=i,No.jsxs=i,No}var T_;function yx(){return T_||(T_=1,eh.exports=xx()),eh.exports}var Mt=yx(),nh={exports:{}},Oo={},ih={exports:{}},ah={};var A_;function Mx(){return A_||(A_=1,(function(s){function t(O,j){var Y=O.length;O.push(j);t:for(;0<Y;){var vt=Y-1>>>1,Et=O[vt];if(0<l(Et,j))O[vt]=j,O[Y]=Et,Y=vt;else break t}}function i(O){return O.length===0?null:O[0]}function r(O){if(O.length===0)return null;var j=O[0],Y=O.pop();if(Y!==j){O[0]=Y;t:for(var vt=0,Et=O.length,L=Et>>>1;vt<L;){var et=2*(vt+1)-1,xt=O[et],At=et+1,Ot=O[At];if(0>l(xt,Y))At<Et&&0>l(Ot,xt)?(O[vt]=Ot,O[At]=Y,vt=At):(O[vt]=xt,O[et]=Y,vt=et);else if(At<Et&&0>l(Ot,Y))O[vt]=Ot,O[At]=Y,vt=At;else break t}}return j}function l(O,j){var Y=O.sortIndex-j.sortIndex;return Y!==0?Y:O.id-j.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;s.unstable_now=function(){return u.now()}}else{var h=Date,d=h.now();s.unstable_now=function(){return h.now()-d}}var m=[],p=[],S=1,_=null,x=3,M=!1,A=!1,R=!1,y=!1,v=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function w(O){for(var j=i(p);j!==null;){if(j.callback===null)r(p);else if(j.startTime<=O)r(p),j.sortIndex=j.expirationTime,t(m,j);else break;j=i(p)}}function H(O){if(R=!1,w(O),!A)if(i(m)!==null)A=!0,F||(F=!0,it());else{var j=i(p);j!==null&&ft(H,j.startTime-O)}}var F=!1,P=-1,Z=5,C=-1;function D(){return y?!0:!(s.unstable_now()-C<Z)}function V(){if(y=!1,F){var O=s.unstable_now();C=O;var j=!0;try{t:{A=!1,R&&(R=!1,I(P),P=-1),M=!0;var Y=x;try{e:{for(w(O),_=i(m);_!==null&&!(_.expirationTime>O&&D());){var vt=_.callback;if(typeof vt=="function"){_.callback=null,x=_.priorityLevel;var Et=vt(_.expirationTime<=O);if(O=s.unstable_now(),typeof Et=="function"){_.callback=Et,w(O),j=!0;break e}_===i(m)&&r(m),w(O)}else r(m);_=i(m)}if(_!==null)j=!0;else{var L=i(p);L!==null&&ft(H,L.startTime-O),j=!1}}break t}finally{_=null,x=Y,M=!1}j=void 0}}finally{j?it():F=!1}}}var it;if(typeof N=="function")it=function(){N(V)};else if(typeof MessageChannel<"u"){var ct=new MessageChannel,gt=ct.port2;ct.port1.onmessage=V,it=function(){gt.postMessage(null)}}else it=function(){v(V,0)};function ft(O,j){P=v(function(){O(s.unstable_now())},j)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(O){O.callback=null},s.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Z=0<O?Math.floor(1e3/O):5},s.unstable_getCurrentPriorityLevel=function(){return x},s.unstable_next=function(O){switch(x){case 1:case 2:case 3:var j=3;break;default:j=x}var Y=x;x=j;try{return O()}finally{x=Y}},s.unstable_requestPaint=function(){y=!0},s.unstable_runWithPriority=function(O,j){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var Y=x;x=O;try{return j()}finally{x=Y}},s.unstable_scheduleCallback=function(O,j,Y){var vt=s.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?vt+Y:vt):Y=vt,O){case 1:var Et=-1;break;case 2:Et=250;break;case 5:Et=1073741823;break;case 4:Et=1e4;break;default:Et=5e3}return Et=Y+Et,O={id:S++,callback:j,priorityLevel:O,startTime:Y,expirationTime:Et,sortIndex:-1},Y>vt?(O.sortIndex=Y,t(p,O),i(m)===null&&O===i(p)&&(R?(I(P),P=-1):R=!0,ft(H,Y-vt))):(O.sortIndex=Et,t(m,O),A||M||(A=!0,F||(F=!0,it()))),O},s.unstable_shouldYield=D,s.unstable_wrapCallback=function(O){var j=x;return function(){var Y=x;x=j;try{return O.apply(this,arguments)}finally{x=Y}}}})(ah)),ah}var R_;function Ex(){return R_||(R_=1,ih.exports=Mx()),ih.exports}var rh={exports:{}},se={};var C_;function bx(){if(C_)return se;C_=1;var s=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),x=Symbol.iterator;function M(L){return L===null||typeof L!="object"?null:(L=x&&L[x]||L["@@iterator"],typeof L=="function"?L:null)}var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,y={};function v(L,et,xt){this.props=L,this.context=et,this.refs=y,this.updater=xt||A}v.prototype.isReactComponent={},v.prototype.setState=function(L,et){if(typeof L!="object"&&typeof L!="function"&&L!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,L,et,"setState")},v.prototype.forceUpdate=function(L){this.updater.enqueueForceUpdate(this,L,"forceUpdate")};function I(){}I.prototype=v.prototype;function N(L,et,xt){this.props=L,this.context=et,this.refs=y,this.updater=xt||A}var w=N.prototype=new I;w.constructor=N,R(w,v.prototype),w.isPureReactComponent=!0;var H=Array.isArray;function F(){}var P={H:null,A:null,T:null,S:null},Z=Object.prototype.hasOwnProperty;function C(L,et,xt){var At=xt.ref;return{$$typeof:s,type:L,key:et,ref:At!==void 0?At:null,props:xt}}function D(L,et){return C(L.type,et,L.props)}function V(L){return typeof L=="object"&&L!==null&&L.$$typeof===s}function it(L){var et={"=":"=0",":":"=2"};return"$"+L.replace(/[=:]/g,function(xt){return et[xt]})}var ct=/\/+/g;function gt(L,et){return typeof L=="object"&&L!==null&&L.key!=null?it(""+L.key):et.toString(36)}function ft(L){switch(L.status){case"fulfilled":return L.value;case"rejected":throw L.reason;default:switch(typeof L.status=="string"?L.then(F,F):(L.status="pending",L.then(function(et){L.status==="pending"&&(L.status="fulfilled",L.value=et)},function(et){L.status==="pending"&&(L.status="rejected",L.reason=et)})),L.status){case"fulfilled":return L.value;case"rejected":throw L.reason}}throw L}function O(L,et,xt,At,Ot){var nt=typeof L;(nt==="undefined"||nt==="boolean")&&(L=null);var ot=!1;if(L===null)ot=!0;else switch(nt){case"bigint":case"string":case"number":ot=!0;break;case"object":switch(L.$$typeof){case s:case t:ot=!0;break;case S:return ot=L._init,O(ot(L._payload),et,xt,At,Ot)}}if(ot)return Ot=Ot(L),ot=At===""?"."+gt(L,0):At,H(Ot)?(xt="",ot!=null&&(xt=ot.replace(ct,"$&/")+"/"),O(Ot,et,xt,"",function(Xt){return Xt})):Ot!=null&&(V(Ot)&&(Ot=D(Ot,xt+(Ot.key==null||L&&L.key===Ot.key?"":(""+Ot.key).replace(ct,"$&/")+"/")+ot)),et.push(Ot)),1;ot=0;var wt=At===""?".":At+":";if(H(L))for(var It=0;It<L.length;It++)At=L[It],nt=wt+gt(At,It),ot+=O(At,et,xt,nt,Ot);else if(It=M(L),typeof It=="function")for(L=It.call(L),It=0;!(At=L.next()).done;)At=At.value,nt=wt+gt(At,It++),ot+=O(At,et,xt,nt,Ot);else if(nt==="object"){if(typeof L.then=="function")return O(ft(L),et,xt,At,Ot);throw et=String(L),Error("Objects are not valid as a React child (found: "+(et==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":et)+"). If you meant to render a collection of children, use an array instead.")}return ot}function j(L,et,xt){if(L==null)return L;var At=[],Ot=0;return O(L,At,"","",function(nt){return et.call(xt,nt,Ot++)}),At}function Y(L){if(L._status===-1){var et=L._result;et=et(),et.then(function(xt){(L._status===0||L._status===-1)&&(L._status=1,L._result=xt)},function(xt){(L._status===0||L._status===-1)&&(L._status=2,L._result=xt)}),L._status===-1&&(L._status=0,L._result=et)}if(L._status===1)return L._result.default;throw L._result}var vt=typeof reportError=="function"?reportError:function(L){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var et=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof L=="object"&&L!==null&&typeof L.message=="string"?String(L.message):String(L),error:L});if(!window.dispatchEvent(et))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",L);return}console.error(L)},Et={map:j,forEach:function(L,et,xt){j(L,function(){et.apply(this,arguments)},xt)},count:function(L){var et=0;return j(L,function(){et++}),et},toArray:function(L){return j(L,function(et){return et})||[]},only:function(L){if(!V(L))throw Error("React.Children.only expected to receive a single React element child.");return L}};return se.Activity=_,se.Children=Et,se.Component=v,se.Fragment=i,se.Profiler=l,se.PureComponent=N,se.StrictMode=r,se.Suspense=m,se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,se.__COMPILER_RUNTIME={__proto__:null,c:function(L){return P.H.useMemoCache(L)}},se.cache=function(L){return function(){return L.apply(null,arguments)}},se.cacheSignal=function(){return null},se.cloneElement=function(L,et,xt){if(L==null)throw Error("The argument must be a React element, but you passed "+L+".");var At=R({},L.props),Ot=L.key;if(et!=null)for(nt in et.key!==void 0&&(Ot=""+et.key),et)!Z.call(et,nt)||nt==="key"||nt==="__self"||nt==="__source"||nt==="ref"&&et.ref===void 0||(At[nt]=et[nt]);var nt=arguments.length-2;if(nt===1)At.children=xt;else if(1<nt){for(var ot=Array(nt),wt=0;wt<nt;wt++)ot[wt]=arguments[wt+2];At.children=ot}return C(L.type,Ot,At)},se.createContext=function(L){return L={$$typeof:h,_currentValue:L,_currentValue2:L,_threadCount:0,Provider:null,Consumer:null},L.Provider=L,L.Consumer={$$typeof:u,_context:L},L},se.createElement=function(L,et,xt){var At,Ot={},nt=null;if(et!=null)for(At in et.key!==void 0&&(nt=""+et.key),et)Z.call(et,At)&&At!=="key"&&At!=="__self"&&At!=="__source"&&(Ot[At]=et[At]);var ot=arguments.length-2;if(ot===1)Ot.children=xt;else if(1<ot){for(var wt=Array(ot),It=0;It<ot;It++)wt[It]=arguments[It+2];Ot.children=wt}if(L&&L.defaultProps)for(At in ot=L.defaultProps,ot)Ot[At]===void 0&&(Ot[At]=ot[At]);return C(L,nt,Ot)},se.createRef=function(){return{current:null}},se.forwardRef=function(L){return{$$typeof:d,render:L}},se.isValidElement=V,se.lazy=function(L){return{$$typeof:S,_payload:{_status:-1,_result:L},_init:Y}},se.memo=function(L,et){return{$$typeof:p,type:L,compare:et===void 0?null:et}},se.startTransition=function(L){var et=P.T,xt={};P.T=xt;try{var At=L(),Ot=P.S;Ot!==null&&Ot(xt,At),typeof At=="object"&&At!==null&&typeof At.then=="function"&&At.then(F,vt)}catch(nt){vt(nt)}finally{et!==null&&xt.types!==null&&(et.types=xt.types),P.T=et}},se.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},se.use=function(L){return P.H.use(L)},se.useActionState=function(L,et,xt){return P.H.useActionState(L,et,xt)},se.useCallback=function(L,et){return P.H.useCallback(L,et)},se.useContext=function(L){return P.H.useContext(L)},se.useDebugValue=function(){},se.useDeferredValue=function(L,et){return P.H.useDeferredValue(L,et)},se.useEffect=function(L,et){return P.H.useEffect(L,et)},se.useEffectEvent=function(L){return P.H.useEffectEvent(L)},se.useId=function(){return P.H.useId()},se.useImperativeHandle=function(L,et,xt){return P.H.useImperativeHandle(L,et,xt)},se.useInsertionEffect=function(L,et){return P.H.useInsertionEffect(L,et)},se.useLayoutEffect=function(L,et){return P.H.useLayoutEffect(L,et)},se.useMemo=function(L,et){return P.H.useMemo(L,et)},se.useOptimistic=function(L,et){return P.H.useOptimistic(L,et)},se.useReducer=function(L,et,xt){return P.H.useReducer(L,et,xt)},se.useRef=function(L){return P.H.useRef(L)},se.useState=function(L){return P.H.useState(L)},se.useSyncExternalStore=function(L,et,xt){return P.H.useSyncExternalStore(L,et,xt)},se.useTransition=function(){return P.H.useTransition()},se.version="19.2.9",se}var D_;function Cd(){return D_||(D_=1,rh.exports=bx()),rh.exports}var sh={exports:{}},Rn={};var w_;function Tx(){if(w_)return Rn;w_=1;var s=Cd();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var S=2;S<arguments.length;S++)p+="&args[]="+encodeURIComponent(arguments[S])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function u(m,p,S){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:p,implementation:S}}var h=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Rn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Rn.createPortal=function(m,p){var S=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return u(m,p,null,S)},Rn.flushSync=function(m){var p=h.T,S=r.p;try{if(h.T=null,r.p=2,m)return m()}finally{h.T=p,r.p=S,r.d.f()}},Rn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,r.d.C(m,p))},Rn.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},Rn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var S=p.as,_=d(S,p.crossOrigin),x=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;S==="style"?r.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:x,fetchPriority:M}):S==="script"&&r.d.X(m,{crossOrigin:_,integrity:x,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Rn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var S=d(p.as,p.crossOrigin);r.d.M(m,{crossOrigin:S,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&r.d.M(m)},Rn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var S=p.as,_=d(S,p.crossOrigin);r.d.L(m,S,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Rn.preloadModule=function(m,p){if(typeof m=="string")if(p){var S=d(p.as,p.crossOrigin);r.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:S,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else r.d.m(m)},Rn.requestFormReset=function(m){r.d.r(m)},Rn.unstable_batchedUpdates=function(m,p){return m(p)},Rn.useFormState=function(m,p,S){return h.H.useFormState(m,p,S)},Rn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Rn.version="19.2.9",Rn}var U_;function Ax(){if(U_)return sh.exports;U_=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(t){console.error(t)}}return s(),sh.exports=Tx(),sh.exports}var L_;function Rx(){if(L_)return Oo;L_=1;var s=Ex(),t=Cd(),i=Ax();function r(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function u(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(u(e)!==e)throw Error(r(188))}function p(e){var n=e.alternate;if(!n){if(n=u(e),n===null)throw Error(r(188));return n!==e?null:e}for(var a=e,o=n;;){var c=a.return;if(c===null)break;var f=c.alternate;if(f===null){if(o=c.return,o!==null){a=o;continue}break}if(c.child===f.child){for(f=c.child;f;){if(f===a)return m(c),e;if(f===o)return m(c),n;f=f.sibling}throw Error(r(188))}if(a.return!==o.return)a=c,o=f;else{for(var g=!1,b=c.child;b;){if(b===a){g=!0,a=c,o=f;break}if(b===o){g=!0,o=c,a=f;break}b=b.sibling}if(!g){for(b=f.child;b;){if(b===a){g=!0,a=f,o=c;break}if(b===o){g=!0,o=f,a=c;break}b=b.sibling}if(!g)throw Error(r(189))}}if(a.alternate!==o)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?e:n}function S(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=S(e),n!==null)return n;e=e.sibling}return null}var _=Object.assign,x=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),A=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),N=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),H=Symbol.for("react.suspense"),F=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),Z=Symbol.for("react.lazy"),C=Symbol.for("react.activity"),D=Symbol.for("react.memo_cache_sentinel"),V=Symbol.iterator;function it(e){return e===null||typeof e!="object"?null:(e=V&&e[V]||e["@@iterator"],typeof e=="function"?e:null)}var ct=Symbol.for("react.client.reference");function gt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ct?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case R:return"Fragment";case v:return"Profiler";case y:return"StrictMode";case H:return"Suspense";case F:return"SuspenseList";case C:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case A:return"Portal";case N:return e.displayName||"Context";case I:return(e._context.displayName||"Context")+".Consumer";case w:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case P:return n=e.displayName||null,n!==null?n:gt(e.type)||"Memo";case Z:n=e._payload,e=e._init;try{return gt(e(n))}catch{}}return null}var ft=Array.isArray,O=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Y={pending:!1,data:null,method:null,action:null},vt=[],Et=-1;function L(e){return{current:e}}function et(e){0>Et||(e.current=vt[Et],vt[Et]=null,Et--)}function xt(e,n){Et++,vt[Et]=e.current,e.current=n}var At=L(null),Ot=L(null),nt=L(null),ot=L(null);function wt(e,n){switch(xt(nt,n),xt(Ot,e),xt(At,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?Yg(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=Yg(n),e=jg(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}et(At),xt(At,e)}function It(){et(At),et(Ot),et(nt)}function Xt(e){e.memoizedState!==null&&xt(ot,e);var n=At.current,a=jg(n,e.type);n!==a&&(xt(Ot,e),xt(At,a))}function de(e){Ot.current===e&&(et(At),et(Ot)),ot.current===e&&(et(ot),Do._currentValue=Y)}var an,B;function Te(e){if(an===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);an=n&&n[1]||"",B=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+an+e+B}var ie=!1;function te(e,n){if(!e||ie)return"";ie=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var pt=function(){throw Error()};if(Object.defineProperty(pt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(pt,[])}catch(st){var tt=st}Reflect.construct(e,[],pt)}else{try{pt.call()}catch(st){tt=st}e.call(pt.prototype)}}else{try{throw Error()}catch(st){tt=st}(pt=e())&&typeof pt.catch=="function"&&pt.catch(function(){})}}catch(st){if(st&&tt&&typeof st.stack=="string")return[st.stack,tt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),g=f[0],b=f[1];if(g&&b){var z=g.split(`
`),Q=b.split(`
`);for(c=o=0;o<z.length&&!z[o].includes("DetermineComponentFrameRoot");)o++;for(;c<Q.length&&!Q[c].includes("DetermineComponentFrameRoot");)c++;if(o===z.length||c===Q.length)for(o=z.length-1,c=Q.length-1;1<=o&&0<=c&&z[o]!==Q[c];)c--;for(;1<=o&&0<=c;o--,c--)if(z[o]!==Q[c]){if(o!==1||c!==1)do if(o--,c--,0>c||z[o]!==Q[c]){var ut=`
`+z[o].replace(" at new "," at ");return e.displayName&&ut.includes("<anonymous>")&&(ut=ut.replace("<anonymous>",e.displayName)),ut}while(1<=o&&0<=c);break}}}finally{ie=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Te(a):""}function qt(e,n){switch(e.tag){case 26:case 27:case 5:return Te(e.type);case 16:return Te("Lazy");case 13:return e.child!==n&&n!==null?Te("Suspense Fallback"):Te("Suspense");case 19:return Te("SuspenseList");case 0:case 15:return te(e.type,!1);case 11:return te(e.type.render,!1);case 1:return te(e.type,!0);case 31:return Te("Activity");default:return""}}function Ge(e){try{var n="",a=null;do n+=qt(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var kt=Object.prototype.hasOwnProperty,re=s.unstable_scheduleCallback,Ze=s.unstable_cancelCallback,je=s.unstable_shouldYield,U=s.unstable_requestPaint,E=s.unstable_now,J=s.unstable_getCurrentPriorityLevel,ht=s.unstable_ImmediatePriority,St=s.unstable_UserBlockingPriority,lt=s.unstable_NormalPriority,Zt=s.unstable_LowPriority,Rt=s.unstable_IdlePriority,Yt=s.log,jt=s.unstable_setDisableYieldValue,bt=null,Ct=null;function Kt(e){if(typeof Yt=="function"&&jt(e),Ct&&typeof Ct.setStrictMode=="function")try{Ct.setStrictMode(bt,e)}catch{}}var zt=Math.clz32?Math.clz32:k,Ut=Math.log,oe=Math.LN2;function k(e){return e>>>=0,e===0?32:31-(Ut(e)/oe|0)|0}var Tt=256,Dt=262144,Bt=4194304;function yt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function mt(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var c=0,f=e.suspendedLanes,g=e.pingedLanes;e=e.warmLanes;var b=o&134217727;return b!==0?(o=b&~f,o!==0?c=yt(o):(g&=b,g!==0?c=yt(g):a||(a=b&~e,a!==0&&(c=yt(a))))):(b=o&~f,b!==0?c=yt(b):g!==0?c=yt(g):a||(a=o&~e,a!==0&&(c=yt(a)))),c===0?0:n!==0&&n!==c&&(n&f)===0&&(f=c&-c,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:c}function Ft(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function ae(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Le(){var e=Bt;return Bt<<=1,(Bt&62914560)===0&&(Bt=4194304),e}function Ee(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function wn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ii(e,n,a,o,c,f){var g=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var b=e.entanglements,z=e.expirationTimes,Q=e.hiddenUpdates;for(a=g&~a;0<a;){var ut=31-zt(a),pt=1<<ut;b[ut]=0,z[ut]=-1;var tt=Q[ut];if(tt!==null)for(Q[ut]=null,ut=0;ut<tt.length;ut++){var st=tt[ut];st!==null&&(st.lane&=-536870913)}a&=~pt}o!==0&&Vs(e,o,0),f!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=f&~(g&~n))}function Vs(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-zt(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function Ti(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-zt(a),c=1<<o;c&n|e[o]&n&&(e[o]|=n),a&=~c}}function Dr(e,n){var a=n&-n;return a=(a&42)!==0?1:wr(a),(a&(e.suspendedLanes|n))!==0?0:a}function wr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ur(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Ya(){var e=j.p;return e!==0?e:(e=window.event,e===void 0?32:__(e.type))}function ks(e,n){var a=j.p;try{return j.p=e,n()}finally{j.p=a}}var qn=Math.random().toString(36).slice(2),rn="__reactFiber$"+qn,xn="__reactProps$"+qn,ha="__reactContainer$"+qn,Xs="__reactEvents$"+qn,jc="__reactListeners$"+qn,Zc="__reactHandles$"+qn,el="__reactResources$"+qn,ja="__reactMarker$"+qn;function T(e){delete e[rn],delete e[xn],delete e[Xs],delete e[jc],delete e[Zc]}function X(e){var n=e[rn];if(n)return n;for(var a=e.parentNode;a;){if(n=a[ha]||a[rn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=e_(e);e!==null;){if(a=e[rn])return a;e=e_(e)}return n}e=a,a=e.parentNode}return null}function at(e){if(e=e[rn]||e[ha]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function rt(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(r(33))}function W(e){var n=e[el];return n||(n=e[el]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function _t(e){e[ja]=!0}var Lt=new Set,Gt={};function Pt(e,n){Qt(e,n),Qt(e+"Capture",n)}function Qt(e,n){for(Gt[e]=n,e=0;e<n.length;e++)Lt.add(n[e])}var ne=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Jt={},pe={};function we(e){return kt.call(pe,e)?!0:kt.call(Jt,e)?!1:ne.test(e)?pe[e]=!0:(Jt[e]=!0,!1)}function Ve(e,n,a){if(we(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Ue(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function ge(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function Vt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Xe(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function be(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var c=o.get,f=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return c.call(this)},set:function(g){a=""+g,f.call(this,g)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(g){a=""+g},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function yn(e){if(!e._valueTracker){var n=Xe(e)?"checked":"value";e._valueTracker=be(e,n,""+e[n])}}function zi(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=Xe(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function _n(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Za=/[\n"\\]/g;function Se(e){return e.replace(Za,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function An(e,n,a,o,c,f,g,b){e.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?e.type=g:e.removeAttribute("type"),n!=null?g==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Vt(n)):e.value!==""+Vt(n)&&(e.value=""+Vt(n)):g!=="submit"&&g!=="reset"||e.removeAttribute("value"),n!=null?fn(e,g,Vt(n)):a!=null?fn(e,g,Vt(a)):o!=null&&e.removeAttribute("value"),c==null&&f!=null&&(e.defaultChecked=!!f),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+Vt(b):e.removeAttribute("name")}function Un(e,n,a,o,c,f,g,b){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){yn(e);return}a=a!=null?""+Vt(a):"",n=n!=null?""+Vt(n):a,b||n===e.value||(e.value=n),e.defaultValue=n}o=o??c,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(e.name=g),yn(e)}function fn(e,n,a){n==="number"&&_n(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Je(e,n,a,o){if(e=e.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<e.length;a++)c=n.hasOwnProperty("$"+e[a].value),e[a].selected!==c&&(e[a].selected=c),c&&o&&(e[a].defaultSelected=!0)}else{for(a=""+Vt(a),n=null,c=0;c<e.length;c++){if(e[c].value===a){e[c].selected=!0,o&&(e[c].defaultSelected=!0);return}n!==null||e[c].disabled||(n=e[c])}n!==null&&(n.selected=!0)}}function Lr(e,n,a){if(n!=null&&(n=""+Vt(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+Vt(a):""}function Ai(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(r(92));if(ft(o)){if(1<o.length)throw Error(r(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=Vt(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),yn(e)}function Nr(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var mv=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Xd(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||mv.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function qd(e,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var c in n)o=n[c],n.hasOwnProperty(c)&&a[c]!==o&&Xd(e,c,o)}else for(var f in n)n.hasOwnProperty(f)&&Xd(e,f,n[f])}function Kc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gv=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),_v=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function nl(e){return _v.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Bi(){}var Qc=null;function Jc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Or=null,Pr=null;function Wd(e){var n=at(e);if(n&&(e=n.stateNode)){var a=e[xn]||null;t:switch(e=n.stateNode,n.type){case"input":if(An(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Se(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var c=o[xn]||null;if(!c)throw Error(r(90));An(o,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&zi(o)}break t;case"textarea":Lr(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&Je(e,!!a.multiple,n,!1)}}}var $c=!1;function Yd(e,n,a){if($c)return e(n,a);$c=!0;try{var o=e(n);return o}finally{if($c=!1,(Or!==null||Pr!==null)&&(kl(),Or&&(n=Or,e=Pr,Pr=Or=null,Wd(n),e)))for(n=0;n<e.length;n++)Wd(e[n])}}function qs(e,n){var a=e.stateNode;if(a===null)return null;var o=a[xn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var Ii=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),tu=!1;if(Ii)try{var Ws={};Object.defineProperty(Ws,"passive",{get:function(){tu=!0}}),window.addEventListener("test",Ws,Ws),window.removeEventListener("test",Ws,Ws)}catch{tu=!1}var da=null,eu=null,il=null;function jd(){if(il)return il;var e,n=eu,a=n.length,o,c="value"in da?da.value:da.textContent,f=c.length;for(e=0;e<a&&n[e]===c[e];e++);var g=a-e;for(o=1;o<=g&&n[a-o]===c[f-o];o++);return il=c.slice(e,1<o?1-o:void 0)}function al(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function rl(){return!0}function Zd(){return!1}function Pn(e){function n(a,o,c,f,g){this._reactName=a,this._targetInst=c,this.type=o,this.nativeEvent=f,this.target=g,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(a=e[b],this[b]=a?a(f):f[b]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?rl:Zd,this.isPropagationStopped=Zd,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=rl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=rl)},persist:function(){},isPersistent:rl}),n}var Ka={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},sl=Pn(Ka),Ys=_({},Ka,{view:0,detail:0}),vv=Pn(Ys),nu,iu,js,ol=_({},Ys,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ru,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==js&&(js&&e.type==="mousemove"?(nu=e.screenX-js.screenX,iu=e.screenY-js.screenY):iu=nu=0,js=e),nu)},movementY:function(e){return"movementY"in e?e.movementY:iu}}),Kd=Pn(ol),Sv=_({},ol,{dataTransfer:0}),xv=Pn(Sv),yv=_({},Ys,{relatedTarget:0}),au=Pn(yv),Mv=_({},Ka,{animationName:0,elapsedTime:0,pseudoElement:0}),Ev=Pn(Mv),bv=_({},Ka,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Tv=Pn(bv),Av=_({},Ka,{data:0}),Qd=Pn(Av),Rv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Cv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Dv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function wv(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Dv[e])?!!n[e]:!1}function ru(){return wv}var Uv=_({},Ys,{key:function(e){if(e.key){var n=Rv[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=al(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Cv[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ru,charCode:function(e){return e.type==="keypress"?al(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?al(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Lv=Pn(Uv),Nv=_({},ol,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Jd=Pn(Nv),Ov=_({},Ys,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ru}),Pv=Pn(Ov),zv=_({},Ka,{propertyName:0,elapsedTime:0,pseudoElement:0}),Bv=Pn(zv),Iv=_({},ol,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Fv=Pn(Iv),Hv=_({},Ka,{newState:0,oldState:0}),Gv=Pn(Hv),Vv=[9,13,27,32],su=Ii&&"CompositionEvent"in window,Zs=null;Ii&&"documentMode"in document&&(Zs=document.documentMode);var kv=Ii&&"TextEvent"in window&&!Zs,$d=Ii&&(!su||Zs&&8<Zs&&11>=Zs),tp=" ",ep=!1;function np(e,n){switch(e){case"keyup":return Vv.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ip(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var zr=!1;function Xv(e,n){switch(e){case"compositionend":return ip(n);case"keypress":return n.which!==32?null:(ep=!0,tp);case"textInput":return e=n.data,e===tp&&ep?null:e;default:return null}}function qv(e,n){if(zr)return e==="compositionend"||!su&&np(e,n)?(e=jd(),il=eu=da=null,zr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return $d&&n.locale!=="ko"?null:n.data;default:return null}}var Wv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ap(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Wv[e.type]:n==="textarea"}function rp(e,n,a,o){Or?Pr?Pr.push(o):Pr=[o]:Or=o,n=Kl(n,"onChange"),0<n.length&&(a=new sl("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var Ks=null,Qs=null;function Yv(e){Gg(e,0)}function ll(e){var n=rt(e);if(zi(n))return e}function sp(e,n){if(e==="change")return n}var op=!1;if(Ii){var ou;if(Ii){var lu="oninput"in document;if(!lu){var lp=document.createElement("div");lp.setAttribute("oninput","return;"),lu=typeof lp.oninput=="function"}ou=lu}else ou=!1;op=ou&&(!document.documentMode||9<document.documentMode)}function cp(){Ks&&(Ks.detachEvent("onpropertychange",up),Qs=Ks=null)}function up(e){if(e.propertyName==="value"&&ll(Qs)){var n=[];rp(n,Qs,e,Jc(e)),Yd(Yv,n)}}function jv(e,n,a){e==="focusin"?(cp(),Ks=n,Qs=a,Ks.attachEvent("onpropertychange",up)):e==="focusout"&&cp()}function Zv(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ll(Qs)}function Kv(e,n){if(e==="click")return ll(n)}function Qv(e,n){if(e==="input"||e==="change")return ll(n)}function Jv(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Wn=typeof Object.is=="function"?Object.is:Jv;function Js(e,n){if(Wn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var c=a[o];if(!kt.call(n,c)||!Wn(e[c],n[c]))return!1}return!0}function fp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hp(e,n){var a=fp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=fp(a)}}function dp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?dp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function pp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=_n(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=_n(e.document)}return n}function cu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var $v=Ii&&"documentMode"in document&&11>=document.documentMode,Br=null,uu=null,$s=null,fu=!1;function mp(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;fu||Br==null||Br!==_n(o)||(o=Br,"selectionStart"in o&&cu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),$s&&Js($s,o)||($s=o,o=Kl(uu,"onSelect"),0<o.length&&(n=new sl("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Br)))}function Qa(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Ir={animationend:Qa("Animation","AnimationEnd"),animationiteration:Qa("Animation","AnimationIteration"),animationstart:Qa("Animation","AnimationStart"),transitionrun:Qa("Transition","TransitionRun"),transitionstart:Qa("Transition","TransitionStart"),transitioncancel:Qa("Transition","TransitionCancel"),transitionend:Qa("Transition","TransitionEnd")},hu={},gp={};Ii&&(gp=document.createElement("div").style,"AnimationEvent"in window||(delete Ir.animationend.animation,delete Ir.animationiteration.animation,delete Ir.animationstart.animation),"TransitionEvent"in window||delete Ir.transitionend.transition);function Ja(e){if(hu[e])return hu[e];if(!Ir[e])return e;var n=Ir[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in gp)return hu[e]=n[a];return e}var _p=Ja("animationend"),vp=Ja("animationiteration"),Sp=Ja("animationstart"),tS=Ja("transitionrun"),eS=Ja("transitionstart"),nS=Ja("transitioncancel"),xp=Ja("transitionend"),yp=new Map,du="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");du.push("scrollEnd");function _i(e,n){yp.set(e,n),Pt(n,[e])}var cl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ai=[],Fr=0,pu=0;function ul(){for(var e=Fr,n=pu=Fr=0;n<e;){var a=ai[n];ai[n++]=null;var o=ai[n];ai[n++]=null;var c=ai[n];ai[n++]=null;var f=ai[n];if(ai[n++]=null,o!==null&&c!==null){var g=o.pending;g===null?c.next=c:(c.next=g.next,g.next=c),o.pending=c}f!==0&&Mp(a,c,f)}}function fl(e,n,a,o){ai[Fr++]=e,ai[Fr++]=n,ai[Fr++]=a,ai[Fr++]=o,pu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function mu(e,n,a,o){return fl(e,n,a,o),hl(e)}function $a(e,n){return fl(e,null,null,n),hl(e)}function Mp(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var c=!1,f=e.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(c=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,c&&n!==null&&(c=31-zt(a),e=f.hiddenUpdates,o=e[c],o===null?e[c]=[n]:o.push(n),n.lane=a|536870912),f):null}function hl(e){if(50<Mo)throw Mo=0,Tf=null,Error(r(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Hr={};function iS(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(e,n,a,o){return new iS(e,n,a,o)}function gu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Fi(e,n){var a=e.alternate;return a===null?(a=Yn(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Ep(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function dl(e,n,a,o,c,f){var g=0;if(o=e,typeof e=="function")gu(e)&&(g=1);else if(typeof e=="string")g=lx(e,a,At.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case C:return e=Yn(31,a,n,c),e.elementType=C,e.lanes=f,e;case R:return tr(a.children,c,f,n);case y:g=8,c|=24;break;case v:return e=Yn(12,a,n,c|2),e.elementType=v,e.lanes=f,e;case H:return e=Yn(13,a,n,c),e.elementType=H,e.lanes=f,e;case F:return e=Yn(19,a,n,c),e.elementType=F,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case N:g=10;break t;case I:g=9;break t;case w:g=11;break t;case P:g=14;break t;case Z:g=16,o=null;break t}g=29,a=Error(r(130,e===null?"null":typeof e,"")),o=null}return n=Yn(g,a,n,c),n.elementType=e,n.type=o,n.lanes=f,n}function tr(e,n,a,o){return e=Yn(7,e,o,n),e.lanes=a,e}function _u(e,n,a){return e=Yn(6,e,null,n),e.lanes=a,e}function bp(e){var n=Yn(18,null,null,0);return n.stateNode=e,n}function vu(e,n,a){return n=Yn(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Tp=new WeakMap;function ri(e,n){if(typeof e=="object"&&e!==null){var a=Tp.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Ge(n)},Tp.set(e,n),n)}return{value:e,source:n,stack:Ge(n)}}var Gr=[],Vr=0,pl=null,to=0,si=[],oi=0,pa=null,Ri=1,Ci="";function Hi(e,n){Gr[Vr++]=to,Gr[Vr++]=pl,pl=e,to=n}function Ap(e,n,a){si[oi++]=Ri,si[oi++]=Ci,si[oi++]=pa,pa=e;var o=Ri;e=Ci;var c=32-zt(o)-1;o&=~(1<<c),a+=1;var f=32-zt(n)+c;if(30<f){var g=c-c%5;f=(o&(1<<g)-1).toString(32),o>>=g,c-=g,Ri=1<<32-zt(n)+c|a<<c|o,Ci=f+e}else Ri=1<<f|a<<c|o,Ci=e}function Su(e){e.return!==null&&(Hi(e,1),Ap(e,1,0))}function xu(e){for(;e===pl;)pl=Gr[--Vr],Gr[Vr]=null,to=Gr[--Vr],Gr[Vr]=null;for(;e===pa;)pa=si[--oi],si[oi]=null,Ci=si[--oi],si[oi]=null,Ri=si[--oi],si[oi]=null}function Rp(e,n){si[oi++]=Ri,si[oi++]=Ci,si[oi++]=pa,Ri=n.id,Ci=n.overflow,pa=e}var Mn=null,qe=null,Me=!1,ma=null,li=!1,yu=Error(r(519));function ga(e){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw eo(ri(n,e)),yu}function Cp(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[rn]=e,n[xn]=o,a){case"dialog":ve("cancel",n),ve("close",n);break;case"iframe":case"object":case"embed":ve("load",n);break;case"video":case"audio":for(a=0;a<bo.length;a++)ve(bo[a],n);break;case"source":ve("error",n);break;case"img":case"image":case"link":ve("error",n),ve("load",n);break;case"details":ve("toggle",n);break;case"input":ve("invalid",n),Un(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":ve("invalid",n);break;case"textarea":ve("invalid",n),Ai(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||qg(n.textContent,a)?(o.popover!=null&&(ve("beforetoggle",n),ve("toggle",n)),o.onScroll!=null&&ve("scroll",n),o.onScrollEnd!=null&&ve("scrollend",n),o.onClick!=null&&(n.onclick=Bi),n=!0):n=!1,n||ga(e,!0)}function Dp(e){for(Mn=e.return;Mn;)switch(Mn.tag){case 5:case 31:case 13:li=!1;return;case 27:case 3:li=!0;return;default:Mn=Mn.return}}function kr(e){if(e!==Mn)return!1;if(!Me)return Dp(e),Me=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Hf(e.type,e.memoizedProps)),a=!a),a&&qe&&ga(e),Dp(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));qe=t_(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));qe=t_(e)}else n===27?(n=qe,wa(e.type)?(e=qf,qf=null,qe=e):qe=n):qe=Mn?ui(e.stateNode.nextSibling):null;return!0}function er(){qe=Mn=null,Me=!1}function Mu(){var e=ma;return e!==null&&(Fn===null?Fn=e:Fn.push.apply(Fn,e),ma=null),e}function eo(e){ma===null?ma=[e]:ma.push(e)}var Eu=L(null),nr=null,Gi=null;function _a(e,n,a){xt(Eu,n._currentValue),n._currentValue=a}function Vi(e){e._currentValue=Eu.current,et(Eu)}function bu(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function Tu(e,n,a,o){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var f=c.dependencies;if(f!==null){var g=c.child;f=f.firstContext;t:for(;f!==null;){var b=f;f=c;for(var z=0;z<n.length;z++)if(b.context===n[z]){f.lanes|=a,b=f.alternate,b!==null&&(b.lanes|=a),bu(f.return,a,e),o||(g=null);break t}f=b.next}}else if(c.tag===18){if(g=c.return,g===null)throw Error(r(341));g.lanes|=a,f=g.alternate,f!==null&&(f.lanes|=a),bu(g,a,e),g=null}else g=c.child;if(g!==null)g.return=c;else for(g=c;g!==null;){if(g===e){g=null;break}if(c=g.sibling,c!==null){c.return=g.return,g=c;break}g=g.return}c=g}}function Xr(e,n,a,o){e=null;for(var c=n,f=!1;c!==null;){if(!f){if((c.flags&524288)!==0)f=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var g=c.alternate;if(g===null)throw Error(r(387));if(g=g.memoizedProps,g!==null){var b=c.type;Wn(c.pendingProps.value,g.value)||(e!==null?e.push(b):e=[b])}}else if(c===ot.current){if(g=c.alternate,g===null)throw Error(r(387));g.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Do):e=[Do])}c=c.return}e!==null&&Tu(n,e,a,o),n.flags|=262144}function ml(e){for(e=e.firstContext;e!==null;){if(!Wn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ir(e){nr=e,Gi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function En(e){return wp(nr,e)}function gl(e,n){return nr===null&&ir(e),wp(e,n)}function wp(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Gi===null){if(e===null)throw Error(r(308));Gi=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Gi=Gi.next=n;return a}var aS=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},rS=s.unstable_scheduleCallback,sS=s.unstable_NormalPriority,sn={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Au(){return{controller:new aS,data:new Map,refCount:0}}function no(e){e.refCount--,e.refCount===0&&rS(sS,function(){e.controller.abort()})}var io=null,Ru=0,qr=0,Wr=null;function oS(e,n){if(io===null){var a=io=[];Ru=0,qr=Uf(),Wr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Ru++,n.then(Up,Up),n}function Up(){if(--Ru===0&&io!==null){Wr!==null&&(Wr.status="fulfilled");var e=io;io=null,qr=0,Wr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function lS(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(o.status="rejected",o.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),o}var Lp=O.S;O.S=function(e,n){mg=E(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&oS(e,n),Lp!==null&&Lp(e,n)};var ar=L(null);function Cu(){var e=ar.current;return e!==null?e:ke.pooledCache}function _l(e,n){n===null?xt(ar,ar.current):xt(ar,n.pool)}function Np(){var e=Cu();return e===null?null:{parent:sn._currentValue,pool:e}}var Yr=Error(r(460)),Du=Error(r(474)),vl=Error(r(542)),Sl={then:function(){}};function Op(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Pp(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Bi,Bi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Bp(e),e;default:if(typeof n.status=="string")n.then(Bi,Bi);else{if(e=ke,e!==null&&100<e.shellSuspendCounter)throw Error(r(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=o}},function(o){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Bp(e),e}throw sr=n,Yr}}function rr(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(sr=a,Yr):a}}var sr=null;function zp(){if(sr===null)throw Error(r(459));var e=sr;return sr=null,e}function Bp(e){if(e===Yr||e===vl)throw Error(r(483))}var jr=null,ao=0;function xl(e){var n=ao;return ao+=1,jr===null&&(jr=[]),Pp(jr,e,n)}function ro(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function yl(e,n){throw n.$$typeof===x?Error(r(525)):(e=Object.prototype.toString.call(n),Error(r(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Ip(e){function n(q,G){if(e){var K=q.deletions;K===null?(q.deletions=[G],q.flags|=16):K.push(G)}}function a(q,G){if(!e)return null;for(;G!==null;)n(q,G),G=G.sibling;return null}function o(q){for(var G=new Map;q!==null;)q.key!==null?G.set(q.key,q):G.set(q.index,q),q=q.sibling;return G}function c(q,G){return q=Fi(q,G),q.index=0,q.sibling=null,q}function f(q,G,K){return q.index=K,e?(K=q.alternate,K!==null?(K=K.index,K<G?(q.flags|=67108866,G):K):(q.flags|=67108866,G)):(q.flags|=1048576,G)}function g(q){return e&&q.alternate===null&&(q.flags|=67108866),q}function b(q,G,K,dt){return G===null||G.tag!==6?(G=_u(K,q.mode,dt),G.return=q,G):(G=c(G,K),G.return=q,G)}function z(q,G,K,dt){var $t=K.type;return $t===R?ut(q,G,K.props.children,dt,K.key):G!==null&&(G.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===Z&&rr($t)===G.type)?(G=c(G,K.props),ro(G,K),G.return=q,G):(G=dl(K.type,K.key,K.props,null,q.mode,dt),ro(G,K),G.return=q,G)}function Q(q,G,K,dt){return G===null||G.tag!==4||G.stateNode.containerInfo!==K.containerInfo||G.stateNode.implementation!==K.implementation?(G=vu(K,q.mode,dt),G.return=q,G):(G=c(G,K.children||[]),G.return=q,G)}function ut(q,G,K,dt,$t){return G===null||G.tag!==7?(G=tr(K,q.mode,dt,$t),G.return=q,G):(G=c(G,K),G.return=q,G)}function pt(q,G,K){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=_u(""+G,q.mode,K),G.return=q,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case M:return K=dl(G.type,G.key,G.props,null,q.mode,K),ro(K,G),K.return=q,K;case A:return G=vu(G,q.mode,K),G.return=q,G;case Z:return G=rr(G),pt(q,G,K)}if(ft(G)||it(G))return G=tr(G,q.mode,K,null),G.return=q,G;if(typeof G.then=="function")return pt(q,xl(G),K);if(G.$$typeof===N)return pt(q,gl(q,G),K);yl(q,G)}return null}function tt(q,G,K,dt){var $t=G!==null?G.key:null;if(typeof K=="string"&&K!==""||typeof K=="number"||typeof K=="bigint")return $t!==null?null:b(q,G,""+K,dt);if(typeof K=="object"&&K!==null){switch(K.$$typeof){case M:return K.key===$t?z(q,G,K,dt):null;case A:return K.key===$t?Q(q,G,K,dt):null;case Z:return K=rr(K),tt(q,G,K,dt)}if(ft(K)||it(K))return $t!==null?null:ut(q,G,K,dt,null);if(typeof K.then=="function")return tt(q,G,xl(K),dt);if(K.$$typeof===N)return tt(q,G,gl(q,K),dt);yl(q,K)}return null}function st(q,G,K,dt,$t){if(typeof dt=="string"&&dt!==""||typeof dt=="number"||typeof dt=="bigint")return q=q.get(K)||null,b(G,q,""+dt,$t);if(typeof dt=="object"&&dt!==null){switch(dt.$$typeof){case M:return q=q.get(dt.key===null?K:dt.key)||null,z(G,q,dt,$t);case A:return q=q.get(dt.key===null?K:dt.key)||null,Q(G,q,dt,$t);case Z:return dt=rr(dt),st(q,G,K,dt,$t)}if(ft(dt)||it(dt))return q=q.get(K)||null,ut(G,q,dt,$t,null);if(typeof dt.then=="function")return st(q,G,K,xl(dt),$t);if(dt.$$typeof===N)return st(q,G,K,gl(G,dt),$t);yl(G,dt)}return null}function Ht(q,G,K,dt){for(var $t=null,Ae=null,Wt=G,ce=G=0,ye=null;Wt!==null&&ce<K.length;ce++){Wt.index>ce?(ye=Wt,Wt=null):ye=Wt.sibling;var Re=tt(q,Wt,K[ce],dt);if(Re===null){Wt===null&&(Wt=ye);break}e&&Wt&&Re.alternate===null&&n(q,Wt),G=f(Re,G,ce),Ae===null?$t=Re:Ae.sibling=Re,Ae=Re,Wt=ye}if(ce===K.length)return a(q,Wt),Me&&Hi(q,ce),$t;if(Wt===null){for(;ce<K.length;ce++)Wt=pt(q,K[ce],dt),Wt!==null&&(G=f(Wt,G,ce),Ae===null?$t=Wt:Ae.sibling=Wt,Ae=Wt);return Me&&Hi(q,ce),$t}for(Wt=o(Wt);ce<K.length;ce++)ye=st(Wt,q,ce,K[ce],dt),ye!==null&&(e&&ye.alternate!==null&&Wt.delete(ye.key===null?ce:ye.key),G=f(ye,G,ce),Ae===null?$t=ye:Ae.sibling=ye,Ae=ye);return e&&Wt.forEach(function(Pa){return n(q,Pa)}),Me&&Hi(q,ce),$t}function ee(q,G,K,dt){if(K==null)throw Error(r(151));for(var $t=null,Ae=null,Wt=G,ce=G=0,ye=null,Re=K.next();Wt!==null&&!Re.done;ce++,Re=K.next()){Wt.index>ce?(ye=Wt,Wt=null):ye=Wt.sibling;var Pa=tt(q,Wt,Re.value,dt);if(Pa===null){Wt===null&&(Wt=ye);break}e&&Wt&&Pa.alternate===null&&n(q,Wt),G=f(Pa,G,ce),Ae===null?$t=Pa:Ae.sibling=Pa,Ae=Pa,Wt=ye}if(Re.done)return a(q,Wt),Me&&Hi(q,ce),$t;if(Wt===null){for(;!Re.done;ce++,Re=K.next())Re=pt(q,Re.value,dt),Re!==null&&(G=f(Re,G,ce),Ae===null?$t=Re:Ae.sibling=Re,Ae=Re);return Me&&Hi(q,ce),$t}for(Wt=o(Wt);!Re.done;ce++,Re=K.next())Re=st(Wt,q,ce,Re.value,dt),Re!==null&&(e&&Re.alternate!==null&&Wt.delete(Re.key===null?ce:Re.key),G=f(Re,G,ce),Ae===null?$t=Re:Ae.sibling=Re,Ae=Re);return e&&Wt.forEach(function(Sx){return n(q,Sx)}),Me&&Hi(q,ce),$t}function Be(q,G,K,dt){if(typeof K=="object"&&K!==null&&K.type===R&&K.key===null&&(K=K.props.children),typeof K=="object"&&K!==null){switch(K.$$typeof){case M:t:{for(var $t=K.key;G!==null;){if(G.key===$t){if($t=K.type,$t===R){if(G.tag===7){a(q,G.sibling),dt=c(G,K.props.children),dt.return=q,q=dt;break t}}else if(G.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===Z&&rr($t)===G.type){a(q,G.sibling),dt=c(G,K.props),ro(dt,K),dt.return=q,q=dt;break t}a(q,G);break}else n(q,G);G=G.sibling}K.type===R?(dt=tr(K.props.children,q.mode,dt,K.key),dt.return=q,q=dt):(dt=dl(K.type,K.key,K.props,null,q.mode,dt),ro(dt,K),dt.return=q,q=dt)}return g(q);case A:t:{for($t=K.key;G!==null;){if(G.key===$t)if(G.tag===4&&G.stateNode.containerInfo===K.containerInfo&&G.stateNode.implementation===K.implementation){a(q,G.sibling),dt=c(G,K.children||[]),dt.return=q,q=dt;break t}else{a(q,G);break}else n(q,G);G=G.sibling}dt=vu(K,q.mode,dt),dt.return=q,q=dt}return g(q);case Z:return K=rr(K),Be(q,G,K,dt)}if(ft(K))return Ht(q,G,K,dt);if(it(K)){if($t=it(K),typeof $t!="function")throw Error(r(150));return K=$t.call(K),ee(q,G,K,dt)}if(typeof K.then=="function")return Be(q,G,xl(K),dt);if(K.$$typeof===N)return Be(q,G,gl(q,K),dt);yl(q,K)}return typeof K=="string"&&K!==""||typeof K=="number"||typeof K=="bigint"?(K=""+K,G!==null&&G.tag===6?(a(q,G.sibling),dt=c(G,K),dt.return=q,q=dt):(a(q,G),dt=_u(K,q.mode,dt),dt.return=q,q=dt),g(q)):a(q,G)}return function(q,G,K,dt){try{ao=0;var $t=Be(q,G,K,dt);return jr=null,$t}catch(Wt){if(Wt===Yr||Wt===vl)throw Wt;var Ae=Yn(29,Wt,null,q.mode);return Ae.lanes=dt,Ae.return=q,Ae}}}var or=Ip(!0),Fp=Ip(!1),va=!1;function wu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Uu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Sa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function xa(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(De&2)!==0){var c=o.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),o.pending=n,n=hl(e),Mp(e,null,a),n}return fl(e,o,n,a),hl(e)}function so(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Ti(e,a)}}function Lu(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var c=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var g={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?c=f=g:f=f.next=g,a=a.next}while(a!==null);f===null?c=f=n:f=f.next=n}else c=f=n;a={baseState:o.baseState,firstBaseUpdate:c,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Nu=!1;function oo(){if(Nu){var e=Wr;if(e!==null)throw e}}function lo(e,n,a,o){Nu=!1;var c=e.updateQueue;va=!1;var f=c.firstBaseUpdate,g=c.lastBaseUpdate,b=c.shared.pending;if(b!==null){c.shared.pending=null;var z=b,Q=z.next;z.next=null,g===null?f=Q:g.next=Q,g=z;var ut=e.alternate;ut!==null&&(ut=ut.updateQueue,b=ut.lastBaseUpdate,b!==g&&(b===null?ut.firstBaseUpdate=Q:b.next=Q,ut.lastBaseUpdate=z))}if(f!==null){var pt=c.baseState;g=0,ut=Q=z=null,b=f;do{var tt=b.lane&-536870913,st=tt!==b.lane;if(st?(xe&tt)===tt:(o&tt)===tt){tt!==0&&tt===qr&&(Nu=!0),ut!==null&&(ut=ut.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Ht=e,ee=b;tt=n;var Be=a;switch(ee.tag){case 1:if(Ht=ee.payload,typeof Ht=="function"){pt=Ht.call(Be,pt,tt);break t}pt=Ht;break t;case 3:Ht.flags=Ht.flags&-65537|128;case 0:if(Ht=ee.payload,tt=typeof Ht=="function"?Ht.call(Be,pt,tt):Ht,tt==null)break t;pt=_({},pt,tt);break t;case 2:va=!0}}tt=b.callback,tt!==null&&(e.flags|=64,st&&(e.flags|=8192),st=c.callbacks,st===null?c.callbacks=[tt]:st.push(tt))}else st={lane:tt,tag:b.tag,payload:b.payload,callback:b.callback,next:null},ut===null?(Q=ut=st,z=pt):ut=ut.next=st,g|=tt;if(b=b.next,b===null){if(b=c.shared.pending,b===null)break;st=b,b=st.next,st.next=null,c.lastBaseUpdate=st,c.shared.pending=null}}while(!0);ut===null&&(z=pt),c.baseState=z,c.firstBaseUpdate=Q,c.lastBaseUpdate=ut,f===null&&(c.shared.lanes=0),Ta|=g,e.lanes=g,e.memoizedState=pt}}function Hp(e,n){if(typeof e!="function")throw Error(r(191,e));e.call(n)}function Gp(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Hp(a[e],n)}var Zr=L(null),Ml=L(0);function Vp(e,n){e=Qi,xt(Ml,e),xt(Zr,n),Qi=e|n.baseLanes}function Ou(){xt(Ml,Qi),xt(Zr,Zr.current)}function Pu(){Qi=Ml.current,et(Zr),et(Ml)}var jn=L(null),ci=null;function ya(e){var n=e.alternate;xt($e,$e.current&1),xt(jn,e),ci===null&&(n===null||Zr.current!==null||n.memoizedState!==null)&&(ci=e)}function zu(e){xt($e,$e.current),xt(jn,e),ci===null&&(ci=e)}function kp(e){e.tag===22?(xt($e,$e.current),xt(jn,e),ci===null&&(ci=e)):Ma()}function Ma(){xt($e,$e.current),xt(jn,jn.current)}function Zn(e){et(jn),ci===e&&(ci=null),et($e)}var $e=L(0);function El(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||kf(a)||Xf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ki=0,le=null,Pe=null,on=null,bl=!1,Kr=!1,lr=!1,Tl=0,co=0,Qr=null,cS=0;function Ke(){throw Error(r(321))}function Bu(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!Wn(e[a],n[a]))return!1;return!0}function Iu(e,n,a,o,c,f){return ki=f,le=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,O.H=e===null||e.memoizedState===null?Am:$u,lr=!1,f=a(o,c),lr=!1,Kr&&(f=qp(n,a,o,c)),Xp(e),f}function Xp(e){O.H=ho;var n=Pe!==null&&Pe.next!==null;if(ki=0,on=Pe=le=null,bl=!1,co=0,Qr=null,n)throw Error(r(300));e===null||ln||(e=e.dependencies,e!==null&&ml(e)&&(ln=!0))}function qp(e,n,a,o){le=e;var c=0;do{if(Kr&&(Qr=null),co=0,Kr=!1,25<=c)throw Error(r(301));if(c+=1,on=Pe=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}O.H=Rm,f=n(a,o)}while(Kr);return f}function uS(){var e=O.H,n=e.useState()[0];return n=typeof n.then=="function"?uo(n):n,e=e.useState()[0],(Pe!==null?Pe.memoizedState:null)!==e&&(le.flags|=1024),n}function Fu(){var e=Tl!==0;return Tl=0,e}function Hu(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function Gu(e){if(bl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}bl=!1}ki=0,on=Pe=le=null,Kr=!1,co=Tl=0,Qr=null}function Ln(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return on===null?le.memoizedState=on=e:on=on.next=e,on}function tn(){if(Pe===null){var e=le.alternate;e=e!==null?e.memoizedState:null}else e=Pe.next;var n=on===null?le.memoizedState:on.next;if(n!==null)on=n,Pe=e;else{if(e===null)throw le.alternate===null?Error(r(467)):Error(r(310));Pe=e,e={memoizedState:Pe.memoizedState,baseState:Pe.baseState,baseQueue:Pe.baseQueue,queue:Pe.queue,next:null},on===null?le.memoizedState=on=e:on=on.next=e}return on}function Al(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function uo(e){var n=co;return co+=1,Qr===null&&(Qr=[]),e=Pp(Qr,e,n),n=le,(on===null?n.memoizedState:on.next)===null&&(n=n.alternate,O.H=n===null||n.memoizedState===null?Am:$u),e}function Rl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return uo(e);if(e.$$typeof===N)return En(e)}throw Error(r(438,String(e)))}function Vu(e){var n=null,a=le.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=le.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Al(),le.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=D;return n.index++,a}function Xi(e,n){return typeof n=="function"?n(e):n}function Cl(e){var n=tn();return ku(n,Pe,e)}function ku(e,n,a){var o=e.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=a;var c=e.baseQueue,f=o.pending;if(f!==null){if(c!==null){var g=c.next;c.next=f.next,f.next=g}n.baseQueue=c=f,o.pending=null}if(f=e.baseState,c===null)e.memoizedState=f;else{n=c.next;var b=g=null,z=null,Q=n,ut=!1;do{var pt=Q.lane&-536870913;if(pt!==Q.lane?(xe&pt)===pt:(ki&pt)===pt){var tt=Q.revertLane;if(tt===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:Q.action,hasEagerState:Q.hasEagerState,eagerState:Q.eagerState,next:null}),pt===qr&&(ut=!0);else if((ki&tt)===tt){Q=Q.next,tt===qr&&(ut=!0);continue}else pt={lane:0,revertLane:Q.revertLane,gesture:null,action:Q.action,hasEagerState:Q.hasEagerState,eagerState:Q.eagerState,next:null},z===null?(b=z=pt,g=f):z=z.next=pt,le.lanes|=tt,Ta|=tt;pt=Q.action,lr&&a(f,pt),f=Q.hasEagerState?Q.eagerState:a(f,pt)}else tt={lane:pt,revertLane:Q.revertLane,gesture:Q.gesture,action:Q.action,hasEagerState:Q.hasEagerState,eagerState:Q.eagerState,next:null},z===null?(b=z=tt,g=f):z=z.next=tt,le.lanes|=pt,Ta|=pt;Q=Q.next}while(Q!==null&&Q!==n);if(z===null?g=f:z.next=b,!Wn(f,e.memoizedState)&&(ln=!0,ut&&(a=Wr,a!==null)))throw a;e.memoizedState=f,e.baseState=g,e.baseQueue=z,o.lastRenderedState=f}return c===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Xu(e){var n=tn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=e;var o=a.dispatch,c=a.pending,f=n.memoizedState;if(c!==null){a.pending=null;var g=c=c.next;do f=e(f,g.action),g=g.next;while(g!==c);Wn(f,n.memoizedState)||(ln=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function Wp(e,n,a){var o=le,c=tn(),f=Me;if(f){if(a===void 0)throw Error(r(407));a=a()}else a=n();var g=!Wn((Pe||c).memoizedState,a);if(g&&(c.memoizedState=a,ln=!0),c=c.queue,Yu(Zp.bind(null,o,c,e),[e]),c.getSnapshot!==n||g||on!==null&&on.memoizedState.tag&1){if(o.flags|=2048,Jr(9,{destroy:void 0},jp.bind(null,o,c,a,n),null),ke===null)throw Error(r(349));f||(ki&127)!==0||Yp(o,n,a)}return a}function Yp(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=le.updateQueue,n===null?(n=Al(),le.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function jp(e,n,a,o){n.value=a,n.getSnapshot=o,Kp(n)&&Qp(e)}function Zp(e,n,a){return a(function(){Kp(n)&&Qp(e)})}function Kp(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!Wn(e,a)}catch{return!0}}function Qp(e){var n=$a(e,2);n!==null&&Hn(n,e,2)}function qu(e){var n=Ln();if(typeof e=="function"){var a=e;if(e=a(),lr){Kt(!0);try{a()}finally{Kt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xi,lastRenderedState:e},n}function Jp(e,n,a,o){return e.baseState=a,ku(e,Pe,typeof o=="function"?o:Xi)}function fS(e,n,a,o,c){if(Ul(e))throw Error(r(485));if(e=n.action,e!==null){var f={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){f.listeners.push(g)}};O.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,$p(n,f)):(f.next=a.next,n.pending=a.next=f)}}function $p(e,n){var a=n.action,o=n.payload,c=e.state;if(n.isTransition){var f=O.T,g={};O.T=g;try{var b=a(c,o),z=O.S;z!==null&&z(g,b),tm(e,n,b)}catch(Q){Wu(e,n,Q)}finally{f!==null&&g.types!==null&&(f.types=g.types),O.T=f}}else try{f=a(c,o),tm(e,n,f)}catch(Q){Wu(e,n,Q)}}function tm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){em(e,n,o)},function(o){return Wu(e,n,o)}):em(e,n,a)}function em(e,n,a){n.status="fulfilled",n.value=a,nm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,$p(e,a)))}function Wu(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,nm(n),n=n.next;while(n!==o)}e.action=null}function nm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function im(e,n){return n}function am(e,n){if(Me){var a=ke.formState;if(a!==null){t:{var o=le;if(Me){if(qe){e:{for(var c=qe,f=li;c.nodeType!==8;){if(!f){c=null;break e}if(c=ui(c.nextSibling),c===null){c=null;break e}}f=c.data,c=f==="F!"||f==="F"?c:null}if(c){qe=ui(c.nextSibling),o=c.data==="F!";break t}}ga(o)}o=!1}o&&(n=a[0])}}return a=Ln(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:im,lastRenderedState:n},a.queue=o,a=Em.bind(null,le,o),o.dispatch=a,o=qu(!1),f=Ju.bind(null,le,!1,o.queue),o=Ln(),c={state:n,dispatch:null,action:e,pending:null},o.queue=c,a=fS.bind(null,le,c,f,a),c.dispatch=a,o.memoizedState=e,[n,a,!1]}function rm(e){var n=tn();return sm(n,Pe,e)}function sm(e,n,a){if(n=ku(e,n,im)[0],e=Cl(Xi)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=uo(n)}catch(g){throw g===Yr?vl:g}else o=n;n=tn();var c=n.queue,f=c.dispatch;return a!==n.memoizedState&&(le.flags|=2048,Jr(9,{destroy:void 0},hS.bind(null,c,a),null)),[o,f,e]}function hS(e,n){e.action=n}function om(e){var n=tn(),a=Pe;if(a!==null)return sm(n,a,e);tn(),n=n.memoizedState,a=tn();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function Jr(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=le.updateQueue,n===null&&(n=Al(),le.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function lm(){return tn().memoizedState}function Dl(e,n,a,o){var c=Ln();le.flags|=e,c.memoizedState=Jr(1|n,{destroy:void 0},a,o===void 0?null:o)}function wl(e,n,a,o){var c=tn();o=o===void 0?null:o;var f=c.memoizedState.inst;Pe!==null&&o!==null&&Bu(o,Pe.memoizedState.deps)?c.memoizedState=Jr(n,f,a,o):(le.flags|=e,c.memoizedState=Jr(1|n,f,a,o))}function cm(e,n){Dl(8390656,8,e,n)}function Yu(e,n){wl(2048,8,e,n)}function dS(e){le.flags|=4;var n=le.updateQueue;if(n===null)n=Al(),le.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function um(e){var n=tn().memoizedState;return dS({ref:n,nextImpl:e}),function(){if((De&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function fm(e,n){return wl(4,2,e,n)}function hm(e,n){return wl(4,4,e,n)}function dm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function pm(e,n,a){a=a!=null?a.concat([e]):null,wl(4,4,dm.bind(null,n,e),a)}function ju(){}function mm(e,n){var a=tn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Bu(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function gm(e,n){var a=tn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Bu(n,o[1]))return o[0];if(o=e(),lr){Kt(!0);try{e()}finally{Kt(!1)}}return a.memoizedState=[o,n],o}function Zu(e,n,a){return a===void 0||(ki&1073741824)!==0&&(xe&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=_g(),le.lanes|=e,Ta|=e,a)}function _m(e,n,a,o){return Wn(a,n)?a:Zr.current!==null?(e=Zu(e,a,o),Wn(e,n)||(ln=!0),e):(ki&42)===0||(ki&1073741824)!==0&&(xe&261930)===0?(ln=!0,e.memoizedState=a):(e=_g(),le.lanes|=e,Ta|=e,n)}function vm(e,n,a,o,c){var f=j.p;j.p=f!==0&&8>f?f:8;var g=O.T,b={};O.T=b,Ju(e,!1,n,a);try{var z=c(),Q=O.S;if(Q!==null&&Q(b,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var ut=lS(z,o);fo(e,n,ut,Jn(e))}else fo(e,n,o,Jn(e))}catch(pt){fo(e,n,{then:function(){},status:"rejected",reason:pt},Jn())}finally{j.p=f,g!==null&&b.types!==null&&(g.types=b.types),O.T=g}}function pS(){}function Ku(e,n,a,o){if(e.tag!==5)throw Error(r(476));var c=Sm(e).queue;vm(e,c,n,Y,a===null?pS:function(){return xm(e),a(o)})}function Sm(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:Y,baseState:Y,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xi,lastRenderedState:Y},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xi,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function xm(e){var n=Sm(e);n.next===null&&(n=e.alternate.memoizedState),fo(e,n.next.queue,{},Jn())}function Qu(){return En(Do)}function ym(){return tn().memoizedState}function Mm(){return tn().memoizedState}function mS(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=Jn();e=Sa(a);var o=xa(n,e,a);o!==null&&(Hn(o,n,a),so(o,n,a)),n={cache:Au()},e.payload=n;return}n=n.return}}function gS(e,n,a){var o=Jn();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Ul(e)?bm(n,a):(a=mu(e,n,a,o),a!==null&&(Hn(a,e,o),Tm(a,n,o)))}function Em(e,n,a){var o=Jn();fo(e,n,a,o)}function fo(e,n,a,o){var c={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Ul(e))bm(n,c);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var g=n.lastRenderedState,b=f(g,a);if(c.hasEagerState=!0,c.eagerState=b,Wn(b,g))return fl(e,n,c,0),ke===null&&ul(),!1}catch{}if(a=mu(e,n,c,o),a!==null)return Hn(a,e,o),Tm(a,n,o),!0}return!1}function Ju(e,n,a,o){if(o={lane:2,revertLane:Uf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Ul(e)){if(n)throw Error(r(479))}else n=mu(e,a,o,2),n!==null&&Hn(n,e,2)}function Ul(e){var n=e.alternate;return e===le||n!==null&&n===le}function bm(e,n){Kr=bl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Tm(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Ti(e,a)}}var ho={readContext:En,use:Rl,useCallback:Ke,useContext:Ke,useEffect:Ke,useImperativeHandle:Ke,useLayoutEffect:Ke,useInsertionEffect:Ke,useMemo:Ke,useReducer:Ke,useRef:Ke,useState:Ke,useDebugValue:Ke,useDeferredValue:Ke,useTransition:Ke,useSyncExternalStore:Ke,useId:Ke,useHostTransitionStatus:Ke,useFormState:Ke,useActionState:Ke,useOptimistic:Ke,useMemoCache:Ke,useCacheRefresh:Ke};ho.useEffectEvent=Ke;var Am={readContext:En,use:Rl,useCallback:function(e,n){return Ln().memoizedState=[e,n===void 0?null:n],e},useContext:En,useEffect:cm,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Dl(4194308,4,dm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Dl(4194308,4,e,n)},useInsertionEffect:function(e,n){Dl(4,2,e,n)},useMemo:function(e,n){var a=Ln();n=n===void 0?null:n;var o=e();if(lr){Kt(!0);try{e()}finally{Kt(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=Ln();if(a!==void 0){var c=a(n);if(lr){Kt(!0);try{a(n)}finally{Kt(!1)}}}else c=n;return o.memoizedState=o.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},o.queue=e,e=e.dispatch=gS.bind(null,le,e),[o.memoizedState,e]},useRef:function(e){var n=Ln();return e={current:e},n.memoizedState=e},useState:function(e){e=qu(e);var n=e.queue,a=Em.bind(null,le,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:ju,useDeferredValue:function(e,n){var a=Ln();return Zu(a,e,n)},useTransition:function(){var e=qu(!1);return e=vm.bind(null,le,e.queue,!0,!1),Ln().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=le,c=Ln();if(Me){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),ke===null)throw Error(r(349));(xe&127)!==0||Yp(o,n,a)}c.memoizedState=a;var f={value:a,getSnapshot:n};return c.queue=f,cm(Zp.bind(null,o,f,e),[e]),o.flags|=2048,Jr(9,{destroy:void 0},jp.bind(null,o,f,a,n),null),a},useId:function(){var e=Ln(),n=ke.identifierPrefix;if(Me){var a=Ci,o=Ri;a=(o&~(1<<32-zt(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Tl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=cS++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:Qu,useFormState:am,useActionState:am,useOptimistic:function(e){var n=Ln();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Ju.bind(null,le,!0,a),a.dispatch=n,[e,n]},useMemoCache:Vu,useCacheRefresh:function(){return Ln().memoizedState=mS.bind(null,le)},useEffectEvent:function(e){var n=Ln(),a={impl:e};return n.memoizedState=a,function(){if((De&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},$u={readContext:En,use:Rl,useCallback:mm,useContext:En,useEffect:Yu,useImperativeHandle:pm,useInsertionEffect:fm,useLayoutEffect:hm,useMemo:gm,useReducer:Cl,useRef:lm,useState:function(){return Cl(Xi)},useDebugValue:ju,useDeferredValue:function(e,n){var a=tn();return _m(a,Pe.memoizedState,e,n)},useTransition:function(){var e=Cl(Xi)[0],n=tn().memoizedState;return[typeof e=="boolean"?e:uo(e),n]},useSyncExternalStore:Wp,useId:ym,useHostTransitionStatus:Qu,useFormState:rm,useActionState:rm,useOptimistic:function(e,n){var a=tn();return Jp(a,Pe,e,n)},useMemoCache:Vu,useCacheRefresh:Mm};$u.useEffectEvent=um;var Rm={readContext:En,use:Rl,useCallback:mm,useContext:En,useEffect:Yu,useImperativeHandle:pm,useInsertionEffect:fm,useLayoutEffect:hm,useMemo:gm,useReducer:Xu,useRef:lm,useState:function(){return Xu(Xi)},useDebugValue:ju,useDeferredValue:function(e,n){var a=tn();return Pe===null?Zu(a,e,n):_m(a,Pe.memoizedState,e,n)},useTransition:function(){var e=Xu(Xi)[0],n=tn().memoizedState;return[typeof e=="boolean"?e:uo(e),n]},useSyncExternalStore:Wp,useId:ym,useHostTransitionStatus:Qu,useFormState:om,useActionState:om,useOptimistic:function(e,n){var a=tn();return Pe!==null?Jp(a,Pe,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Vu,useCacheRefresh:Mm};Rm.useEffectEvent=um;function tf(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var ef={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=Jn(),c=Sa(o);c.payload=n,a!=null&&(c.callback=a),n=xa(e,c,o),n!==null&&(Hn(n,e,o),so(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=Jn(),c=Sa(o);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=xa(e,c,o),n!==null&&(Hn(n,e,o),so(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=Jn(),o=Sa(a);o.tag=2,n!=null&&(o.callback=n),n=xa(e,o,a),n!==null&&(Hn(n,e,a),so(n,e,a))}};function Cm(e,n,a,o,c,f,g){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,f,g):n.prototype&&n.prototype.isPureReactComponent?!Js(a,o)||!Js(c,f):!0}function Dm(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&ef.enqueueReplaceState(n,n.state,null)}function cr(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=_({},a));for(var c in e)a[c]===void 0&&(a[c]=e[c])}return a}function wm(e){cl(e)}function Um(e){console.error(e)}function Lm(e){cl(e)}function Ll(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Nm(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function nf(e,n,a){return a=Sa(a),a.tag=3,a.payload={element:null},a.callback=function(){Ll(e,n)},a}function Om(e){return e=Sa(e),e.tag=3,e}function Pm(e,n,a,o){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var f=o.value;e.payload=function(){return c(f)},e.callback=function(){Nm(n,a,o)}}var g=a.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(e.callback=function(){Nm(n,a,o),typeof c!="function"&&(Aa===null?Aa=new Set([this]):Aa.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function _S(e,n,a,o,c){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&Xr(n,a,c,!0),a=jn.current,a!==null){switch(a.tag){case 31:case 13:return ci===null?Xl():a.alternate===null&&Qe===0&&(Qe=3),a.flags&=-257,a.flags|=65536,a.lanes=c,o===Sl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Cf(e,o,c)),!1;case 22:return a.flags|=65536,o===Sl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Cf(e,o,c)),!1}throw Error(r(435,a.tag))}return Cf(e,o,c),Xl(),!1}if(Me)return n=jn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,o!==yu&&(e=Error(r(422),{cause:o}),eo(ri(e,a)))):(o!==yu&&(n=Error(r(423),{cause:o}),eo(ri(n,a))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,o=ri(o,a),c=nf(e.stateNode,o,c),Lu(e,c),Qe!==4&&(Qe=2)),!1;var f=Error(r(520),{cause:o});if(f=ri(f,a),yo===null?yo=[f]:yo.push(f),Qe!==4&&(Qe=2),n===null)return!0;o=ri(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=c&-c,a.lanes|=e,e=nf(a.stateNode,o,e),Lu(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Aa===null||!Aa.has(f))))return a.flags|=65536,c&=-c,a.lanes|=c,c=Om(c),Pm(c,e,a,o),Lu(a,c),!1}a=a.return}while(a!==null);return!1}var af=Error(r(461)),ln=!1;function bn(e,n,a,o){n.child=e===null?Fp(n,null,a,o):or(n,e.child,a,o)}function zm(e,n,a,o,c){a=a.render;var f=n.ref;if("ref"in o){var g={};for(var b in o)b!=="ref"&&(g[b]=o[b])}else g=o;return ir(n),o=Iu(e,n,a,g,f,c),b=Fu(),e!==null&&!ln?(Hu(e,n,c),qi(e,n,c)):(Me&&b&&Su(n),n.flags|=1,bn(e,n,o,c),n.child)}function Bm(e,n,a,o,c){if(e===null){var f=a.type;return typeof f=="function"&&!gu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Im(e,n,f,o,c)):(e=dl(a.type,null,o,n,n.mode,c),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!hf(e,c)){var g=f.memoizedProps;if(a=a.compare,a=a!==null?a:Js,a(g,o)&&e.ref===n.ref)return qi(e,n,c)}return n.flags|=1,e=Fi(f,o),e.ref=n.ref,e.return=n,n.child=e}function Im(e,n,a,o,c){if(e!==null){var f=e.memoizedProps;if(Js(f,o)&&e.ref===n.ref)if(ln=!1,n.pendingProps=o=f,hf(e,c))(e.flags&131072)!==0&&(ln=!0);else return n.lanes=e.lanes,qi(e,n,c)}return rf(e,n,a,o,c)}function Fm(e,n,a,o){var c=o.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(o=n.child=e.child,c=0;o!==null;)c=c|o.lanes|o.childLanes,o=o.sibling;o=c&~f}else o=0,n.child=null;return Hm(e,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&_l(n,f!==null?f.cachePool:null),f!==null?Vp(n,f):Ou(),kp(n);else return o=n.lanes=536870912,Hm(e,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(_l(n,f.cachePool),Vp(n,f),Ma(),n.memoizedState=null):(e!==null&&_l(n,null),Ou(),Ma());return bn(e,n,c,a),n.child}function po(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Hm(e,n,a,o,c){var f=Cu();return f=f===null?null:{parent:sn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&_l(n,null),Ou(),kp(n),e!==null&&Xr(e,n,o,!0),n.childLanes=c,null}function Nl(e,n){return n=Pl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Gm(e,n,a){return or(n,e.child,null,a),e=Nl(n,n.pendingProps),e.flags|=2,Zn(n),n.memoizedState=null,e}function vS(e,n,a){var o=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Me){if(o.mode==="hidden")return e=Nl(n,o),n.lanes=536870912,po(null,e);if(zu(n),(e=qe)?(e=$g(e,li),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:pa!==null?{id:Ri,overflow:Ci}:null,retryLane:536870912,hydrationErrors:null},a=bp(e),a.return=n,n.child=a,Mn=n,qe=null)):e=null,e===null)throw ga(n);return n.lanes=536870912,null}return Nl(n,o)}var f=e.memoizedState;if(f!==null){var g=f.dehydrated;if(zu(n),c)if(n.flags&256)n.flags&=-257,n=Gm(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(r(558));else if(ln||Xr(e,n,a,!1),c=(a&e.childLanes)!==0,ln||c){if(o=ke,o!==null&&(g=Dr(o,a),g!==0&&g!==f.retryLane))throw f.retryLane=g,$a(e,g),Hn(o,e,g),af;Xl(),n=Gm(e,n,a)}else e=f.treeContext,qe=ui(g.nextSibling),Mn=n,Me=!0,ma=null,li=!1,e!==null&&Rp(n,e),n=Nl(n,o),n.flags|=4096;return n}return e=Fi(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Ol(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function rf(e,n,a,o,c){return ir(n),a=Iu(e,n,a,o,void 0,c),o=Fu(),e!==null&&!ln?(Hu(e,n,c),qi(e,n,c)):(Me&&o&&Su(n),n.flags|=1,bn(e,n,a,c),n.child)}function Vm(e,n,a,o,c,f){return ir(n),n.updateQueue=null,a=qp(n,o,a,c),Xp(e),o=Fu(),e!==null&&!ln?(Hu(e,n,f),qi(e,n,f)):(Me&&o&&Su(n),n.flags|=1,bn(e,n,a,f),n.child)}function km(e,n,a,o,c){if(ir(n),n.stateNode===null){var f=Hr,g=a.contextType;typeof g=="object"&&g!==null&&(f=En(g)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=ef,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},wu(n),g=a.contextType,f.context=typeof g=="object"&&g!==null?En(g):Hr,f.state=n.memoizedState,g=a.getDerivedStateFromProps,typeof g=="function"&&(tf(n,a,g,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(g=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),g!==f.state&&ef.enqueueReplaceState(f,f.state,null),lo(n,o,f,c),oo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){f=n.stateNode;var b=n.memoizedProps,z=cr(a,b);f.props=z;var Q=f.context,ut=a.contextType;g=Hr,typeof ut=="object"&&ut!==null&&(g=En(ut));var pt=a.getDerivedStateFromProps;ut=typeof pt=="function"||typeof f.getSnapshotBeforeUpdate=="function",b=n.pendingProps!==b,ut||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(b||Q!==g)&&Dm(n,f,o,g),va=!1;var tt=n.memoizedState;f.state=tt,lo(n,o,f,c),oo(),Q=n.memoizedState,b||tt!==Q||va?(typeof pt=="function"&&(tf(n,a,pt,o),Q=n.memoizedState),(z=va||Cm(n,a,z,o,tt,Q,g))?(ut||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=Q),f.props=o,f.state=Q,f.context=g,o=z):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,Uu(e,n),g=n.memoizedProps,ut=cr(a,g),f.props=ut,pt=n.pendingProps,tt=f.context,Q=a.contextType,z=Hr,typeof Q=="object"&&Q!==null&&(z=En(Q)),b=a.getDerivedStateFromProps,(Q=typeof b=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(g!==pt||tt!==z)&&Dm(n,f,o,z),va=!1,tt=n.memoizedState,f.state=tt,lo(n,o,f,c),oo();var st=n.memoizedState;g!==pt||tt!==st||va||e!==null&&e.dependencies!==null&&ml(e.dependencies)?(typeof b=="function"&&(tf(n,a,b,o),st=n.memoizedState),(ut=va||Cm(n,a,ut,o,tt,st,z)||e!==null&&e.dependencies!==null&&ml(e.dependencies))?(Q||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,st,z),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,st,z)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&tt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&tt===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=st),f.props=o,f.state=st,f.context=z,o=ut):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&tt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&tt===e.memoizedState||(n.flags|=1024),o=!1)}return f=o,Ol(e,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&o?(n.child=or(n,e.child,null,c),n.child=or(n,null,a,c)):bn(e,n,a,c),n.memoizedState=f.state,e=n.child):e=qi(e,n,c),e}function Xm(e,n,a,o){return er(),n.flags|=256,bn(e,n,a,o),n.child}var sf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function of(e){return{baseLanes:e,cachePool:Np()}}function lf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=Qn),e}function qm(e,n,a){var o=n.pendingProps,c=!1,f=(n.flags&128)!==0,g;if((g=f)||(g=e!==null&&e.memoizedState===null?!1:($e.current&2)!==0),g&&(c=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,e===null){if(Me){if(c?ya(n):Ma(),(e=qe)?(e=$g(e,li),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:pa!==null?{id:Ri,overflow:Ci}:null,retryLane:536870912,hydrationErrors:null},a=bp(e),a.return=n,n.child=a,Mn=n,qe=null)):e=null,e===null)throw ga(n);return Xf(e)?n.lanes=32:n.lanes=536870912,null}var b=o.children;return o=o.fallback,c?(Ma(),c=n.mode,b=Pl({mode:"hidden",children:b},c),o=tr(o,c,a,null),b.return=n,o.return=n,b.sibling=o,n.child=b,o=n.child,o.memoizedState=of(a),o.childLanes=lf(e,g,a),n.memoizedState=sf,po(null,o)):(ya(n),cf(n,b))}var z=e.memoizedState;if(z!==null&&(b=z.dehydrated,b!==null)){if(f)n.flags&256?(ya(n),n.flags&=-257,n=uf(e,n,a)):n.memoizedState!==null?(Ma(),n.child=e.child,n.flags|=128,n=null):(Ma(),b=o.fallback,c=n.mode,o=Pl({mode:"visible",children:o.children},c),b=tr(b,c,a,null),b.flags|=2,o.return=n,b.return=n,o.sibling=b,n.child=o,or(n,e.child,null,a),o=n.child,o.memoizedState=of(a),o.childLanes=lf(e,g,a),n.memoizedState=sf,n=po(null,o));else if(ya(n),Xf(b)){if(g=b.nextSibling&&b.nextSibling.dataset,g)var Q=g.dgst;g=Q,o=Error(r(419)),o.stack="",o.digest=g,eo({value:o,source:null,stack:null}),n=uf(e,n,a)}else if(ln||Xr(e,n,a,!1),g=(a&e.childLanes)!==0,ln||g){if(g=ke,g!==null&&(o=Dr(g,a),o!==0&&o!==z.retryLane))throw z.retryLane=o,$a(e,o),Hn(g,e,o),af;kf(b)||Xl(),n=uf(e,n,a)}else kf(b)?(n.flags|=192,n.child=e.child,n=null):(e=z.treeContext,qe=ui(b.nextSibling),Mn=n,Me=!0,ma=null,li=!1,e!==null&&Rp(n,e),n=cf(n,o.children),n.flags|=4096);return n}return c?(Ma(),b=o.fallback,c=n.mode,z=e.child,Q=z.sibling,o=Fi(z,{mode:"hidden",children:o.children}),o.subtreeFlags=z.subtreeFlags&65011712,Q!==null?b=Fi(Q,b):(b=tr(b,c,a,null),b.flags|=2),b.return=n,o.return=n,o.sibling=b,n.child=o,po(null,o),o=n.child,b=e.child.memoizedState,b===null?b=of(a):(c=b.cachePool,c!==null?(z=sn._currentValue,c=c.parent!==z?{parent:z,pool:z}:c):c=Np(),b={baseLanes:b.baseLanes|a,cachePool:c}),o.memoizedState=b,o.childLanes=lf(e,g,a),n.memoizedState=sf,po(e.child,o)):(ya(n),a=e.child,e=a.sibling,a=Fi(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(g=n.deletions,g===null?(n.deletions=[e],n.flags|=16):g.push(e)),n.child=a,n.memoizedState=null,a)}function cf(e,n){return n=Pl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Pl(e,n){return e=Yn(22,e,null,n),e.lanes=0,e}function uf(e,n,a){return or(n,e.child,null,a),e=cf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Wm(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),bu(e.return,n,a)}function ff(e,n,a,o,c,f){var g=e.memoizedState;g===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:c,treeForkCount:f}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=o,g.tail=a,g.tailMode=c,g.treeForkCount=f)}function Ym(e,n,a){var o=n.pendingProps,c=o.revealOrder,f=o.tail;o=o.children;var g=$e.current,b=(g&2)!==0;if(b?(g=g&1|2,n.flags|=128):g&=1,xt($e,g),bn(e,n,o,a),o=Me?to:0,!b&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Wm(e,a,n);else if(e.tag===19)Wm(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(a=n.child,c=null;a!==null;)e=a.alternate,e!==null&&El(e)===null&&(c=a),a=a.sibling;a=c,a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),ff(n,!1,c,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(e=c.alternate,e!==null&&El(e)===null){n.child=c;break}e=c.sibling,c.sibling=a,a=c,c=e}ff(n,!0,a,null,f,o);break;case"together":ff(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function qi(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Ta|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(Xr(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(r(153));if(n.child!==null){for(e=n.child,a=Fi(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Fi(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function hf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&ml(e)))}function SS(e,n,a){switch(n.tag){case 3:wt(n,n.stateNode.containerInfo),_a(n,sn,e.memoizedState.cache),er();break;case 27:case 5:Xt(n);break;case 4:wt(n,n.stateNode.containerInfo);break;case 10:_a(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,zu(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(ya(n),n.flags|=128,null):(a&n.child.childLanes)!==0?qm(e,n,a):(ya(n),e=qi(e,n,a),e!==null?e.sibling:null);ya(n);break;case 19:var c=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(Xr(e,n,a,!1),o=(a&n.childLanes)!==0),c){if(o)return Ym(e,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),xt($e,$e.current),o)break;return null;case 22:return n.lanes=0,Fm(e,n,a,n.pendingProps);case 24:_a(n,sn,e.memoizedState.cache)}return qi(e,n,a)}function jm(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)ln=!0;else{if(!hf(e,a)&&(n.flags&128)===0)return ln=!1,SS(e,n,a);ln=(e.flags&131072)!==0}else ln=!1,Me&&(n.flags&1048576)!==0&&Ap(n,to,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=rr(n.elementType),n.type=e,typeof e=="function")gu(e)?(o=cr(e,o),n.tag=1,n=km(null,n,e,o,a)):(n.tag=0,n=rf(null,n,e,o,a));else{if(e!=null){var c=e.$$typeof;if(c===w){n.tag=11,n=zm(null,n,e,o,a);break t}else if(c===P){n.tag=14,n=Bm(null,n,e,o,a);break t}}throw n=gt(e)||e,Error(r(306,n,""))}}return n;case 0:return rf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,c=cr(o,n.pendingProps),km(e,n,o,c,a);case 3:t:{if(wt(n,n.stateNode.containerInfo),e===null)throw Error(r(387));o=n.pendingProps;var f=n.memoizedState;c=f.element,Uu(e,n),lo(n,o,null,a);var g=n.memoizedState;if(o=g.cache,_a(n,sn,o),o!==f.cache&&Tu(n,[sn],a,!0),oo(),o=g.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Xm(e,n,o,a);break t}else if(o!==c){c=ri(Error(r(424)),n),eo(c),n=Xm(e,n,o,a);break t}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,qe=ui(e.firstChild),Mn=n,Me=!0,ma=null,li=!0,a=Fp(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(er(),o===c){n=qi(e,n,a);break t}bn(e,n,o,a)}n=n.child}return n;case 26:return Ol(e,n),e===null?(a=r_(n.type,null,n.pendingProps,null))?n.memoizedState=a:Me||(a=n.type,e=n.pendingProps,o=Ql(nt.current).createElement(a),o[rn]=n,o[xn]=e,Tn(o,a,e),_t(o),n.stateNode=o):n.memoizedState=r_(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Xt(n),e===null&&Me&&(o=n.stateNode=n_(n.type,n.pendingProps,nt.current),Mn=n,li=!0,c=qe,wa(n.type)?(qf=c,qe=ui(o.firstChild)):qe=c),bn(e,n,n.pendingProps.children,a),Ol(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Me&&((c=o=qe)&&(o=ZS(o,n.type,n.pendingProps,li),o!==null?(n.stateNode=o,Mn=n,qe=ui(o.firstChild),li=!1,c=!0):c=!1),c||ga(n)),Xt(n),c=n.type,f=n.pendingProps,g=e!==null?e.memoizedProps:null,o=f.children,Hf(c,f)?o=null:g!==null&&Hf(c,g)&&(n.flags|=32),n.memoizedState!==null&&(c=Iu(e,n,uS,null,null,a),Do._currentValue=c),Ol(e,n),bn(e,n,o,a),n.child;case 6:return e===null&&Me&&((e=a=qe)&&(a=KS(a,n.pendingProps,li),a!==null?(n.stateNode=a,Mn=n,qe=null,e=!0):e=!1),e||ga(n)),null;case 13:return qm(e,n,a);case 4:return wt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=or(n,null,o,a):bn(e,n,o,a),n.child;case 11:return zm(e,n,n.type,n.pendingProps,a);case 7:return bn(e,n,n.pendingProps,a),n.child;case 8:return bn(e,n,n.pendingProps.children,a),n.child;case 12:return bn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,_a(n,n.type,o.value),bn(e,n,o.children,a),n.child;case 9:return c=n.type._context,o=n.pendingProps.children,ir(n),c=En(c),o=o(c),n.flags|=1,bn(e,n,o,a),n.child;case 14:return Bm(e,n,n.type,n.pendingProps,a);case 15:return Im(e,n,n.type,n.pendingProps,a);case 19:return Ym(e,n,a);case 31:return vS(e,n,a);case 22:return Fm(e,n,a,n.pendingProps);case 24:return ir(n),o=En(sn),e===null?(c=Cu(),c===null&&(c=ke,f=Au(),c.pooledCache=f,f.refCount++,f!==null&&(c.pooledCacheLanes|=a),c=f),n.memoizedState={parent:o,cache:c},wu(n),_a(n,sn,c)):((e.lanes&a)!==0&&(Uu(e,n),lo(n,null,null,a),oo()),c=e.memoizedState,f=n.memoizedState,c.parent!==o?(c={parent:o,cache:o},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),_a(n,sn,o)):(o=f.cache,_a(n,sn,o),o!==c.cache&&Tu(n,[sn],a,!0))),bn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function Wi(e){e.flags|=4}function df(e,n,a,o,c){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(yg())e.flags|=8192;else throw sr=Sl,Du}else e.flags&=-16777217}function Zm(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!u_(n))if(yg())e.flags|=8192;else throw sr=Sl,Du}function zl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?Le():536870912,e.lanes|=n,ns|=n)}function mo(e,n){if(!Me)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function We(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var c=e.child;c!==null;)a|=c.lanes|c.childLanes,o|=c.subtreeFlags&65011712,o|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)a|=c.lanes|c.childLanes,o|=c.subtreeFlags,o|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function xS(e,n,a){var o=n.pendingProps;switch(xu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return We(n),null;case 1:return We(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Vi(sn),It(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(kr(n)?Wi(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Mu())),We(n),null;case 26:var c=n.type,f=n.memoizedState;return e===null?(Wi(n),f!==null?(We(n),Zm(n,f)):(We(n),df(n,c,null,o,a))):f?f!==e.memoizedState?(Wi(n),We(n),Zm(n,f)):(We(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&Wi(n),We(n),df(n,c,e,o,a)),null;case 27:if(de(n),a=nt.current,c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&Wi(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return We(n),null}e=At.current,kr(n)?Cp(n):(e=n_(c,o,a),n.stateNode=e,Wi(n))}return We(n),null;case 5:if(de(n),c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&Wi(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return We(n),null}if(f=At.current,kr(n))Cp(n);else{var g=Ql(nt.current);switch(f){case 1:f=g.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:f=g.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":f=g.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":f=g.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":f=g.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?g.createElement("select",{is:o.is}):g.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?g.createElement(c,{is:o.is}):g.createElement(c)}}f[rn]=n,f[xn]=o;t:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)f.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break t;for(;g.sibling===null;){if(g.return===null||g.return===n)break t;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=f;t:switch(Tn(f,c,o),c){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&Wi(n)}}return We(n),df(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&Wi(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(e=nt.current,kr(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,c=Mn,c!==null)switch(c.tag){case 27:case 5:o=c.memoizedProps}e[rn]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||qg(e.nodeValue,a)),e||ga(n,!0)}else e=Ql(e).createTextNode(o),e[rn]=n,n.stateNode=e}return We(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=kr(n),a!==null){if(e===null){if(!o)throw Error(r(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(557));e[rn]=n}else er(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;We(n),e=!1}else a=Mu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(Zn(n),n):(Zn(n),null);if((n.flags&128)!==0)throw Error(r(558))}return We(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=kr(n),o!==null&&o.dehydrated!==null){if(e===null){if(!c)throw Error(r(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(r(317));c[rn]=n}else er(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;We(n),c=!1}else c=Mu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(Zn(n),n):(Zn(n),null)}return Zn(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,c=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(c=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==c&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),zl(n,n.updateQueue),We(n),null);case 4:return It(),e===null&&Pf(n.stateNode.containerInfo),We(n),null;case 10:return Vi(n.type),We(n),null;case 19:if(et($e),o=n.memoizedState,o===null)return We(n),null;if(c=(n.flags&128)!==0,f=o.rendering,f===null)if(c)mo(o,!1);else{if(Qe!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=El(e),f!==null){for(n.flags|=128,mo(o,!1),e=f.updateQueue,n.updateQueue=e,zl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Ep(a,e),a=a.sibling;return xt($e,$e.current&1|2),Me&&Hi(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&E()>Gl&&(n.flags|=128,c=!0,mo(o,!1),n.lanes=4194304)}else{if(!c)if(e=El(f),e!==null){if(n.flags|=128,c=!0,e=e.updateQueue,n.updateQueue=e,zl(n,e),mo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!Me)return We(n),null}else 2*E()-o.renderingStartTime>Gl&&a!==536870912&&(n.flags|=128,c=!0,mo(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(e=o.last,e!==null?e.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=E(),e.sibling=null,a=$e.current,xt($e,c?a&1|2:a&1),Me&&Hi(n,o.treeForkCount),e):(We(n),null);case 22:case 23:return Zn(n),Pu(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(We(n),n.subtreeFlags&6&&(n.flags|=8192)):We(n),a=n.updateQueue,a!==null&&zl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&et(ar),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Vi(sn),We(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function yS(e,n){switch(xu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Vi(sn),It(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return de(n),null;case 31:if(n.memoizedState!==null){if(Zn(n),n.alternate===null)throw Error(r(340));er()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(Zn(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(r(340));er()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return et($e),null;case 4:return It(),null;case 10:return Vi(n.type),null;case 22:case 23:return Zn(n),Pu(),e!==null&&et(ar),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Vi(sn),null;case 25:return null;default:return null}}function Km(e,n){switch(xu(n),n.tag){case 3:Vi(sn),It();break;case 26:case 27:case 5:de(n);break;case 4:It();break;case 31:n.memoizedState!==null&&Zn(n);break;case 13:Zn(n);break;case 19:et($e);break;case 10:Vi(n.type);break;case 22:case 23:Zn(n),Pu(),e!==null&&et(ar);break;case 24:Vi(sn)}}function go(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var c=o.next;a=c;do{if((a.tag&e)===e){o=void 0;var f=a.create,g=a.inst;o=f(),g.destroy=o}a=a.next}while(a!==c)}}catch(b){Oe(n,n.return,b)}}function Ea(e,n,a){try{var o=n.updateQueue,c=o!==null?o.lastEffect:null;if(c!==null){var f=c.next;o=f;do{if((o.tag&e)===e){var g=o.inst,b=g.destroy;if(b!==void 0){g.destroy=void 0,c=n;var z=a,Q=b;try{Q()}catch(ut){Oe(c,z,ut)}}}o=o.next}while(o!==f)}}catch(ut){Oe(n,n.return,ut)}}function Qm(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Gp(n,a)}catch(o){Oe(e,e.return,o)}}}function Jm(e,n,a){a.props=cr(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Oe(e,n,o)}}function _o(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(c){Oe(e,n,c)}}function Di(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(c){Oe(e,n,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){Oe(e,n,c)}else a.current=null}function $m(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(c){Oe(e,e.return,c)}}function pf(e,n,a){try{var o=e.stateNode;kS(o,e.type,a,n),o[xn]=n}catch(c){Oe(e,e.return,c)}}function tg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&wa(e.type)||e.tag===4}function mf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||tg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&wa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function gf(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Bi));else if(o!==4&&(o===27&&wa(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(gf(e,n,a),e=e.sibling;e!==null;)gf(e,n,a),e=e.sibling}function Bl(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&wa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Bl(e,n,a),e=e.sibling;e!==null;)Bl(e,n,a),e=e.sibling}function eg(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);Tn(n,o,a),n[rn]=e,n[xn]=a}catch(f){Oe(e,e.return,f)}}var Yi=!1,cn=!1,_f=!1,ng=typeof WeakSet=="function"?WeakSet:Set,vn=null;function MS(e,n){if(e=e.containerInfo,If=ac,e=pp(e),cu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var c=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var g=0,b=-1,z=-1,Q=0,ut=0,pt=e,tt=null;e:for(;;){for(var st;pt!==a||c!==0&&pt.nodeType!==3||(b=g+c),pt!==f||o!==0&&pt.nodeType!==3||(z=g+o),pt.nodeType===3&&(g+=pt.nodeValue.length),(st=pt.firstChild)!==null;)tt=pt,pt=st;for(;;){if(pt===e)break e;if(tt===a&&++Q===c&&(b=g),tt===f&&++ut===o&&(z=g),(st=pt.nextSibling)!==null)break;pt=tt,tt=pt.parentNode}pt=st}a=b===-1||z===-1?null:{start:b,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(Ff={focusedElem:e,selectionRange:a},ac=!1,vn=n;vn!==null;)if(n=vn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,vn=e;else for(;vn!==null;){switch(n=vn,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)c=e[a],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,c=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var Ht=cr(a.type,c);e=o.getSnapshotBeforeUpdate(Ht,f),o.__reactInternalSnapshotBeforeUpdate=e}catch(ee){Oe(a,a.return,ee)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)Vf(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Vf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(r(163))}if(e=n.sibling,e!==null){e.return=n.return,vn=e;break}vn=n.return}}function ig(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:Zi(e,a),o&4&&go(5,a);break;case 1:if(Zi(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(g){Oe(a,a.return,g)}else{var c=cr(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(c,n,e.__reactInternalSnapshotBeforeUpdate)}catch(g){Oe(a,a.return,g)}}o&64&&Qm(a),o&512&&_o(a,a.return);break;case 3:if(Zi(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Gp(e,n)}catch(g){Oe(a,a.return,g)}}break;case 27:n===null&&o&4&&eg(a);case 26:case 5:Zi(e,a),n===null&&o&4&&$m(a),o&512&&_o(a,a.return);break;case 12:Zi(e,a);break;case 31:Zi(e,a),o&4&&sg(e,a);break;case 13:Zi(e,a),o&4&&og(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=US.bind(null,a),QS(e,a))));break;case 22:if(o=a.memoizedState!==null||Yi,!o){n=n!==null&&n.memoizedState!==null||cn,c=Yi;var f=cn;Yi=o,(cn=n)&&!f?Ki(e,a,(a.subtreeFlags&8772)!==0):Zi(e,a),Yi=c,cn=f}break;case 30:break;default:Zi(e,a)}}function ag(e){var n=e.alternate;n!==null&&(e.alternate=null,ag(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&T(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ye=null,zn=!1;function ji(e,n,a){for(a=a.child;a!==null;)rg(e,n,a),a=a.sibling}function rg(e,n,a){if(Ct&&typeof Ct.onCommitFiberUnmount=="function")try{Ct.onCommitFiberUnmount(bt,a)}catch{}switch(a.tag){case 26:cn||Di(a,n),ji(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:cn||Di(a,n);var o=Ye,c=zn;wa(a.type)&&(Ye=a.stateNode,zn=!1),ji(e,n,a),Ao(a.stateNode),Ye=o,zn=c;break;case 5:cn||Di(a,n);case 6:if(o=Ye,c=zn,Ye=null,ji(e,n,a),Ye=o,zn=c,Ye!==null)if(zn)try{(Ye.nodeType===9?Ye.body:Ye.nodeName==="HTML"?Ye.ownerDocument.body:Ye).removeChild(a.stateNode)}catch(f){Oe(a,n,f)}else try{Ye.removeChild(a.stateNode)}catch(f){Oe(a,n,f)}break;case 18:Ye!==null&&(zn?(e=Ye,Qg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),us(e)):Qg(Ye,a.stateNode));break;case 4:o=Ye,c=zn,Ye=a.stateNode.containerInfo,zn=!0,ji(e,n,a),Ye=o,zn=c;break;case 0:case 11:case 14:case 15:Ea(2,a,n),cn||Ea(4,a,n),ji(e,n,a);break;case 1:cn||(Di(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Jm(a,n,o)),ji(e,n,a);break;case 21:ji(e,n,a);break;case 22:cn=(o=cn)||a.memoizedState!==null,ji(e,n,a),cn=o;break;default:ji(e,n,a)}}function sg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{us(e)}catch(a){Oe(n,n.return,a)}}}function og(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{us(e)}catch(a){Oe(n,n.return,a)}}function ES(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new ng),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new ng),n;default:throw Error(r(435,e.tag))}}function Il(e,n){var a=ES(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var c=LS.bind(null,e,o);o.then(c,c)}})}function Bn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var c=a[o],f=e,g=n,b=g;t:for(;b!==null;){switch(b.tag){case 27:if(wa(b.type)){Ye=b.stateNode,zn=!1;break t}break;case 5:Ye=b.stateNode,zn=!1;break t;case 3:case 4:Ye=b.stateNode.containerInfo,zn=!0;break t}b=b.return}if(Ye===null)throw Error(r(160));rg(f,g,c),Ye=null,zn=!1,f=c.alternate,f!==null&&(f.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)lg(n,e),n=n.sibling}var vi=null;function lg(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Bn(n,e),In(e),o&4&&(Ea(3,e,e.return),go(3,e),Ea(5,e,e.return));break;case 1:Bn(n,e),In(e),o&512&&(cn||a===null||Di(a,a.return)),o&64&&Yi&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var c=vi;if(Bn(n,e),In(e),o&512&&(cn||a===null||Di(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,c=c.ownerDocument||c;e:switch(o){case"title":f=c.getElementsByTagName("title")[0],(!f||f[ja]||f[rn]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=c.createElement(o),c.head.insertBefore(f,c.querySelector("head > title"))),Tn(f,o,a),f[rn]=e,_t(f),o=f;break t;case"link":var g=l_("link","href",c).get(o+(a.href||""));if(g){for(var b=0;b<g.length;b++)if(f=g[b],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){g.splice(b,1);break e}}f=c.createElement(o),Tn(f,o,a),c.head.appendChild(f);break;case"meta":if(g=l_("meta","content",c).get(o+(a.content||""))){for(b=0;b<g.length;b++)if(f=g[b],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){g.splice(b,1);break e}}f=c.createElement(o),Tn(f,o,a),c.head.appendChild(f);break;default:throw Error(r(468,o))}f[rn]=e,_t(f),o=f}e.stateNode=o}else c_(c,e.type,e.stateNode);else e.stateNode=o_(c,o,e.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?c_(c,e.type,e.stateNode):o_(c,o,e.memoizedProps)):o===null&&e.stateNode!==null&&pf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Bn(n,e),In(e),o&512&&(cn||a===null||Di(a,a.return)),a!==null&&o&4&&pf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Bn(n,e),In(e),o&512&&(cn||a===null||Di(a,a.return)),e.flags&32){c=e.stateNode;try{Nr(c,"")}catch(Ht){Oe(e,e.return,Ht)}}o&4&&e.stateNode!=null&&(c=e.memoizedProps,pf(e,c,a!==null?a.memoizedProps:c)),o&1024&&(_f=!0);break;case 6:if(Bn(n,e),In(e),o&4){if(e.stateNode===null)throw Error(r(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Ht){Oe(e,e.return,Ht)}}break;case 3:if(tc=null,c=vi,vi=Jl(n.containerInfo),Bn(n,e),vi=c,In(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{us(n.containerInfo)}catch(Ht){Oe(e,e.return,Ht)}_f&&(_f=!1,cg(e));break;case 4:o=vi,vi=Jl(e.stateNode.containerInfo),Bn(n,e),In(e),vi=o;break;case 12:Bn(n,e),In(e);break;case 31:Bn(n,e),In(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Il(e,o)));break;case 13:Bn(n,e),In(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Hl=E()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Il(e,o)));break;case 22:c=e.memoizedState!==null;var z=a!==null&&a.memoizedState!==null,Q=Yi,ut=cn;if(Yi=Q||c,cn=ut||z,Bn(n,e),cn=ut,Yi=Q,In(e),o&8192)t:for(n=e.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,c&&(a===null||z||Yi||cn||ur(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){z=a=n;try{if(f=z.stateNode,c)g=f.style,typeof g.setProperty=="function"?g.setProperty("display","none","important"):g.display="none";else{b=z.stateNode;var pt=z.memoizedProps.style,tt=pt!=null&&pt.hasOwnProperty("display")?pt.display:null;b.style.display=tt==null||typeof tt=="boolean"?"":(""+tt).trim()}}catch(Ht){Oe(z,z.return,Ht)}}}else if(n.tag===6){if(a===null){z=n;try{z.stateNode.nodeValue=c?"":z.memoizedProps}catch(Ht){Oe(z,z.return,Ht)}}}else if(n.tag===18){if(a===null){z=n;try{var st=z.stateNode;c?Jg(st,!0):Jg(z.stateNode,!1)}catch(Ht){Oe(z,z.return,Ht)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Il(e,a))));break;case 19:Bn(n,e),In(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Il(e,o)));break;case 30:break;case 21:break;default:Bn(n,e),In(e)}}function In(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(tg(o)){a=o;break}o=o.return}if(a==null)throw Error(r(160));switch(a.tag){case 27:var c=a.stateNode,f=mf(e);Bl(e,f,c);break;case 5:var g=a.stateNode;a.flags&32&&(Nr(g,""),a.flags&=-33);var b=mf(e);Bl(e,b,g);break;case 3:case 4:var z=a.stateNode.containerInfo,Q=mf(e);gf(e,Q,z);break;default:throw Error(r(161))}}catch(ut){Oe(e,e.return,ut)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function cg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;cg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function Zi(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)ig(e,n.alternate,n),n=n.sibling}function ur(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Ea(4,n,n.return),ur(n);break;case 1:Di(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Jm(n,n.return,a),ur(n);break;case 27:Ao(n.stateNode);case 26:case 5:Di(n,n.return),ur(n);break;case 22:n.memoizedState===null&&ur(n);break;case 30:ur(n);break;default:ur(n)}e=e.sibling}}function Ki(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,c=e,f=n,g=f.flags;switch(f.tag){case 0:case 11:case 15:Ki(c,f,a),go(4,f);break;case 1:if(Ki(c,f,a),o=f,c=o.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(Q){Oe(o,o.return,Q)}if(o=f,c=o.updateQueue,c!==null){var b=o.stateNode;try{var z=c.shared.hiddenCallbacks;if(z!==null)for(c.shared.hiddenCallbacks=null,c=0;c<z.length;c++)Hp(z[c],b)}catch(Q){Oe(o,o.return,Q)}}a&&g&64&&Qm(f),_o(f,f.return);break;case 27:eg(f);case 26:case 5:Ki(c,f,a),a&&o===null&&g&4&&$m(f),_o(f,f.return);break;case 12:Ki(c,f,a);break;case 31:Ki(c,f,a),a&&g&4&&sg(c,f);break;case 13:Ki(c,f,a),a&&g&4&&og(c,f);break;case 22:f.memoizedState===null&&Ki(c,f,a),_o(f,f.return);break;case 30:break;default:Ki(c,f,a)}n=n.sibling}}function vf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&no(a))}function Sf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&no(e))}function Si(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)ug(e,n,a,o),n=n.sibling}function ug(e,n,a,o){var c=n.flags;switch(n.tag){case 0:case 11:case 15:Si(e,n,a,o),c&2048&&go(9,n);break;case 1:Si(e,n,a,o);break;case 3:Si(e,n,a,o),c&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&no(e)));break;case 12:if(c&2048){Si(e,n,a,o),e=n.stateNode;try{var f=n.memoizedProps,g=f.id,b=f.onPostCommit;typeof b=="function"&&b(g,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(z){Oe(n,n.return,z)}}else Si(e,n,a,o);break;case 31:Si(e,n,a,o);break;case 13:Si(e,n,a,o);break;case 23:break;case 22:f=n.stateNode,g=n.alternate,n.memoizedState!==null?f._visibility&2?Si(e,n,a,o):vo(e,n):f._visibility&2?Si(e,n,a,o):(f._visibility|=2,$r(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),c&2048&&vf(g,n);break;case 24:Si(e,n,a,o),c&2048&&Sf(n.alternate,n);break;default:Si(e,n,a,o)}}function $r(e,n,a,o,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,g=n,b=a,z=o,Q=g.flags;switch(g.tag){case 0:case 11:case 15:$r(f,g,b,z,c),go(8,g);break;case 23:break;case 22:var ut=g.stateNode;g.memoizedState!==null?ut._visibility&2?$r(f,g,b,z,c):vo(f,g):(ut._visibility|=2,$r(f,g,b,z,c)),c&&Q&2048&&vf(g.alternate,g);break;case 24:$r(f,g,b,z,c),c&&Q&2048&&Sf(g.alternate,g);break;default:$r(f,g,b,z,c)}n=n.sibling}}function vo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,c=o.flags;switch(o.tag){case 22:vo(a,o),c&2048&&vf(o.alternate,o);break;case 24:vo(a,o),c&2048&&Sf(o.alternate,o);break;default:vo(a,o)}n=n.sibling}}var So=8192;function ts(e,n,a){if(e.subtreeFlags&So)for(e=e.child;e!==null;)fg(e,n,a),e=e.sibling}function fg(e,n,a){switch(e.tag){case 26:ts(e,n,a),e.flags&So&&e.memoizedState!==null&&cx(a,vi,e.memoizedState,e.memoizedProps);break;case 5:ts(e,n,a);break;case 3:case 4:var o=vi;vi=Jl(e.stateNode.containerInfo),ts(e,n,a),vi=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=So,So=16777216,ts(e,n,a),So=o):ts(e,n,a));break;default:ts(e,n,a)}}function hg(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function xo(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];vn=o,pg(o,e)}hg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)dg(e),e=e.sibling}function dg(e){switch(e.tag){case 0:case 11:case 15:xo(e),e.flags&2048&&Ea(9,e,e.return);break;case 3:xo(e);break;case 12:xo(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Fl(e)):xo(e);break;default:xo(e)}}function Fl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];vn=o,pg(o,e)}hg(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Ea(8,n,n.return),Fl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Fl(n));break;default:Fl(n)}e=e.sibling}}function pg(e,n){for(;vn!==null;){var a=vn;switch(a.tag){case 0:case 11:case 15:Ea(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:no(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,vn=o;else t:for(a=e;vn!==null;){o=vn;var c=o.sibling,f=o.return;if(ag(o),o===a){vn=null;break t}if(c!==null){c.return=f,vn=c;break t}vn=f}}}var bS={getCacheForType:function(e){var n=En(sn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return En(sn).controller.signal}},TS=typeof WeakMap=="function"?WeakMap:Map,De=0,ke=null,_e=null,xe=0,Ne=0,Kn=null,ba=!1,es=!1,xf=!1,Qi=0,Qe=0,Ta=0,fr=0,yf=0,Qn=0,ns=0,yo=null,Fn=null,Mf=!1,Hl=0,mg=0,Gl=1/0,Vl=null,Aa=null,hn=0,Ra=null,is=null,Ji=0,Ef=0,bf=null,gg=null,Mo=0,Tf=null;function Jn(){return(De&2)!==0&&xe!==0?xe&-xe:O.T!==null?Uf():Ya()}function _g(){if(Qn===0)if((xe&536870912)===0||Me){var e=Dt;Dt<<=1,(Dt&3932160)===0&&(Dt=262144),Qn=e}else Qn=536870912;return e=jn.current,e!==null&&(e.flags|=32),Qn}function Hn(e,n,a){(e===ke&&(Ne===2||Ne===9)||e.cancelPendingCommit!==null)&&(as(e,0),Ca(e,xe,Qn,!1)),wn(e,a),((De&2)===0||e!==ke)&&(e===ke&&((De&2)===0&&(fr|=a),Qe===4&&Ca(e,xe,Qn,!1)),wi(e))}function vg(e,n,a){if((De&6)!==0)throw Error(r(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||Ft(e,n),c=o?CS(e,n):Rf(e,n,!0),f=o;do{if(c===0){es&&!o&&Ca(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!AS(a)){c=Rf(e,n,!1),f=!1;continue}if(c===2){if(f=n,e.errorRecoveryDisabledLanes&f)var g=0;else g=e.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;t:{var b=e;c=yo;var z=b.current.memoizedState.isDehydrated;if(z&&(as(b,g).flags|=256),g=Rf(b,g,!1),g!==2){if(xf&&!z){b.errorRecoveryDisabledLanes|=f,fr|=f,c=4;break t}f=Fn,Fn=c,f!==null&&(Fn===null?Fn=f:Fn.push.apply(Fn,f))}c=g}if(f=!1,c!==2)continue}}if(c===1){as(e,0),Ca(e,n,0,!0);break}t:{switch(o=e,f=c,f){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:Ca(o,n,Qn,!ba);break t;case 2:Fn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(c=Hl+300-E(),10<c)){if(Ca(o,n,Qn,!ba),mt(o,0,!0)!==0)break t;Ji=n,o.timeoutHandle=Zg(Sg.bind(null,o,a,Fn,Vl,Mf,n,Qn,fr,ns,ba,f,"Throttled",-0,0),c);break t}Sg(o,a,Fn,Vl,Mf,n,Qn,fr,ns,ba,f,null,-0,0)}}break}while(!0);wi(e)}function Sg(e,n,a,o,c,f,g,b,z,Q,ut,pt,tt,st){if(e.timeoutHandle=-1,pt=n.subtreeFlags,pt&8192||(pt&16785408)===16785408){pt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Bi},fg(n,f,pt);var Ht=(f&62914560)===f?Hl-E():(f&4194048)===f?mg-E():0;if(Ht=ux(pt,Ht),Ht!==null){Ji=f,e.cancelPendingCommit=Ht(Rg.bind(null,e,n,f,a,o,c,g,b,z,ut,pt,null,tt,st)),Ca(e,f,g,!Q);return}}Rg(e,n,f,a,o,c,g,b,z)}function AS(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var c=a[o],f=c.getSnapshot;c=c.value;try{if(!Wn(f(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ca(e,n,a,o){n&=~yf,n&=~fr,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var c=n;0<c;){var f=31-zt(c),g=1<<f;o[f]=-1,c&=~g}a!==0&&Vs(e,a,n)}function kl(){return(De&6)===0?(Eo(0),!1):!0}function Af(){if(_e!==null){if(Ne===0)var e=_e.return;else e=_e,Gi=nr=null,Gu(e),jr=null,ao=0,e=_e;for(;e!==null;)Km(e.alternate,e),e=e.return;_e=null}}function as(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,WS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Ji=0,Af(),ke=e,_e=a=Fi(e.current,null),xe=n,Ne=0,Kn=null,ba=!1,es=Ft(e,n),xf=!1,ns=Qn=yf=fr=Ta=Qe=0,Fn=yo=null,Mf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var c=31-zt(o),f=1<<c;n|=e[c],o&=~f}return Qi=n,ul(),a}function xg(e,n){le=null,O.H=ho,n===Yr||n===vl?(n=zp(),Ne=3):n===Du?(n=zp(),Ne=4):Ne=n===af?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Kn=n,_e===null&&(Qe=1,Ll(e,ri(n,e.current)))}function yg(){var e=jn.current;return e===null?!0:(xe&4194048)===xe?ci===null:(xe&62914560)===xe||(xe&536870912)!==0?e===ci:!1}function Mg(){var e=O.H;return O.H=ho,e===null?ho:e}function Eg(){var e=O.A;return O.A=bS,e}function Xl(){Qe=4,ba||(xe&4194048)!==xe&&jn.current!==null||(es=!0),(Ta&134217727)===0&&(fr&134217727)===0||ke===null||Ca(ke,xe,Qn,!1)}function Rf(e,n,a){var o=De;De|=2;var c=Mg(),f=Eg();(ke!==e||xe!==n)&&(Vl=null,as(e,n)),n=!1;var g=Qe;t:do try{if(Ne!==0&&_e!==null){var b=_e,z=Kn;switch(Ne){case 8:Af(),g=6;break t;case 3:case 2:case 9:case 6:jn.current===null&&(n=!0);var Q=Ne;if(Ne=0,Kn=null,rs(e,b,z,Q),a&&es){g=0;break t}break;default:Q=Ne,Ne=0,Kn=null,rs(e,b,z,Q)}}RS(),g=Qe;break}catch(ut){xg(e,ut)}while(!0);return n&&e.shellSuspendCounter++,Gi=nr=null,De=o,O.H=c,O.A=f,_e===null&&(ke=null,xe=0,ul()),g}function RS(){for(;_e!==null;)bg(_e)}function CS(e,n){var a=De;De|=2;var o=Mg(),c=Eg();ke!==e||xe!==n?(Vl=null,Gl=E()+500,as(e,n)):es=Ft(e,n);t:do try{if(Ne!==0&&_e!==null){n=_e;var f=Kn;e:switch(Ne){case 1:Ne=0,Kn=null,rs(e,n,f,1);break;case 2:case 9:if(Op(f)){Ne=0,Kn=null,Tg(n);break}n=function(){Ne!==2&&Ne!==9||ke!==e||(Ne=7),wi(e)},f.then(n,n);break t;case 3:Ne=7;break t;case 4:Ne=5;break t;case 7:Op(f)?(Ne=0,Kn=null,Tg(n)):(Ne=0,Kn=null,rs(e,n,f,7));break;case 5:var g=null;switch(_e.tag){case 26:g=_e.memoizedState;case 5:case 27:var b=_e;if(g?u_(g):b.stateNode.complete){Ne=0,Kn=null;var z=b.sibling;if(z!==null)_e=z;else{var Q=b.return;Q!==null?(_e=Q,ql(Q)):_e=null}break e}}Ne=0,Kn=null,rs(e,n,f,5);break;case 6:Ne=0,Kn=null,rs(e,n,f,6);break;case 8:Af(),Qe=6;break t;default:throw Error(r(462))}}DS();break}catch(ut){xg(e,ut)}while(!0);return Gi=nr=null,O.H=o,O.A=c,De=a,_e!==null?0:(ke=null,xe=0,ul(),Qe)}function DS(){for(;_e!==null&&!je();)bg(_e)}function bg(e){var n=jm(e.alternate,e,Qi);e.memoizedProps=e.pendingProps,n===null?ql(e):_e=n}function Tg(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=Vm(a,n,n.pendingProps,n.type,void 0,xe);break;case 11:n=Vm(a,n,n.pendingProps,n.type.render,n.ref,xe);break;case 5:Gu(n);default:Km(a,n),n=_e=Ep(n,Qi),n=jm(a,n,Qi)}e.memoizedProps=e.pendingProps,n===null?ql(e):_e=n}function rs(e,n,a,o){Gi=nr=null,Gu(n),jr=null,ao=0;var c=n.return;try{if(_S(e,c,n,a,xe)){Qe=1,Ll(e,ri(a,e.current)),_e=null;return}}catch(f){if(c!==null)throw _e=c,f;Qe=1,Ll(e,ri(a,e.current)),_e=null;return}n.flags&32768?(Me||o===1?e=!0:es||(xe&536870912)!==0?e=!1:(ba=e=!0,(o===2||o===9||o===3||o===6)&&(o=jn.current,o!==null&&o.tag===13&&(o.flags|=16384))),Ag(n,e)):ql(n)}function ql(e){var n=e;do{if((n.flags&32768)!==0){Ag(n,ba);return}e=n.return;var a=xS(n.alternate,n,Qi);if(a!==null){_e=a;return}if(n=n.sibling,n!==null){_e=n;return}_e=n=e}while(n!==null);Qe===0&&(Qe=5)}function Ag(e,n){do{var a=yS(e.alternate,e);if(a!==null){a.flags&=32767,_e=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){_e=e;return}_e=e=a}while(e!==null);Qe=6,_e=null}function Rg(e,n,a,o,c,f,g,b,z){e.cancelPendingCommit=null;do Wl();while(hn!==0);if((De&6)!==0)throw Error(r(327));if(n!==null){if(n===e.current)throw Error(r(177));if(f=n.lanes|n.childLanes,f|=pu,ii(e,a,f,g,b,z),e===ke&&(_e=ke=null,xe=0),is=n,Ra=e,Ji=a,Ef=f,bf=c,gg=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,NS(lt,function(){return Lg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=O.T,O.T=null,c=j.p,j.p=2,g=De,De|=4;try{MS(e,n,a)}finally{De=g,j.p=c,O.T=o}}hn=1,Cg(),Dg(),wg()}}function Cg(){if(hn===1){hn=0;var e=Ra,n=is,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=O.T,O.T=null;var o=j.p;j.p=2;var c=De;De|=4;try{lg(n,e);var f=Ff,g=pp(e.containerInfo),b=f.focusedElem,z=f.selectionRange;if(g!==b&&b&&b.ownerDocument&&dp(b.ownerDocument.documentElement,b)){if(z!==null&&cu(b)){var Q=z.start,ut=z.end;if(ut===void 0&&(ut=Q),"selectionStart"in b)b.selectionStart=Q,b.selectionEnd=Math.min(ut,b.value.length);else{var pt=b.ownerDocument||document,tt=pt&&pt.defaultView||window;if(tt.getSelection){var st=tt.getSelection(),Ht=b.textContent.length,ee=Math.min(z.start,Ht),Be=z.end===void 0?ee:Math.min(z.end,Ht);!st.extend&&ee>Be&&(g=Be,Be=ee,ee=g);var q=hp(b,ee),G=hp(b,Be);if(q&&G&&(st.rangeCount!==1||st.anchorNode!==q.node||st.anchorOffset!==q.offset||st.focusNode!==G.node||st.focusOffset!==G.offset)){var K=pt.createRange();K.setStart(q.node,q.offset),st.removeAllRanges(),ee>Be?(st.addRange(K),st.extend(G.node,G.offset)):(K.setEnd(G.node,G.offset),st.addRange(K))}}}}for(pt=[],st=b;st=st.parentNode;)st.nodeType===1&&pt.push({element:st,left:st.scrollLeft,top:st.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<pt.length;b++){var dt=pt[b];dt.element.scrollLeft=dt.left,dt.element.scrollTop=dt.top}}ac=!!If,Ff=If=null}finally{De=c,j.p=o,O.T=a}}e.current=n,hn=2}}function Dg(){if(hn===2){hn=0;var e=Ra,n=is,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=O.T,O.T=null;var o=j.p;j.p=2;var c=De;De|=4;try{ig(e,n.alternate,n)}finally{De=c,j.p=o,O.T=a}}hn=3}}function wg(){if(hn===4||hn===3){hn=0,U();var e=Ra,n=is,a=Ji,o=gg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?hn=5:(hn=0,is=Ra=null,Ug(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(Aa=null),Ur(a),n=n.stateNode,Ct&&typeof Ct.onCommitFiberRoot=="function")try{Ct.onCommitFiberRoot(bt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=O.T,c=j.p,j.p=2,O.T=null;try{for(var f=e.onRecoverableError,g=0;g<o.length;g++){var b=o[g];f(b.value,{componentStack:b.stack})}}finally{O.T=n,j.p=c}}(Ji&3)!==0&&Wl(),wi(e),c=e.pendingLanes,(a&261930)!==0&&(c&42)!==0?e===Tf?Mo++:(Mo=0,Tf=e):Mo=0,Eo(0)}}function Ug(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,no(n)))}function Wl(){return Cg(),Dg(),wg(),Lg()}function Lg(){if(hn!==5)return!1;var e=Ra,n=Ef;Ef=0;var a=Ur(Ji),o=O.T,c=j.p;try{j.p=32>a?32:a,O.T=null,a=bf,bf=null;var f=Ra,g=Ji;if(hn=0,is=Ra=null,Ji=0,(De&6)!==0)throw Error(r(331));var b=De;if(De|=4,dg(f.current),ug(f,f.current,g,a),De=b,Eo(0,!1),Ct&&typeof Ct.onPostCommitFiberRoot=="function")try{Ct.onPostCommitFiberRoot(bt,f)}catch{}return!0}finally{j.p=c,O.T=o,Ug(e,n)}}function Ng(e,n,a){n=ri(a,n),n=nf(e.stateNode,n,2),e=xa(e,n,2),e!==null&&(wn(e,2),wi(e))}function Oe(e,n,a){if(e.tag===3)Ng(e,e,a);else for(;n!==null;){if(n.tag===3){Ng(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Aa===null||!Aa.has(o))){e=ri(a,e),a=Om(2),o=xa(n,a,2),o!==null&&(Pm(a,o,n,e),wn(o,2),wi(o));break}}n=n.return}}function Cf(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new TS;var c=new Set;o.set(n,c)}else c=o.get(n),c===void 0&&(c=new Set,o.set(n,c));c.has(a)||(xf=!0,c.add(a),e=wS.bind(null,e,n,a),n.then(e,e))}function wS(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,ke===e&&(xe&a)===a&&(Qe===4||Qe===3&&(xe&62914560)===xe&&300>E()-Hl?(De&2)===0&&as(e,0):yf|=a,ns===xe&&(ns=0)),wi(e)}function Og(e,n){n===0&&(n=Le()),e=$a(e,n),e!==null&&(wn(e,n),wi(e))}function US(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),Og(e,a)}function LS(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,c=e.memoizedState;c!==null&&(a=c.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),Og(e,a)}function NS(e,n){return re(e,n)}var Yl=null,ss=null,Df=!1,jl=!1,wf=!1,Da=0;function wi(e){e!==ss&&e.next===null&&(ss===null?Yl=ss=e:ss=ss.next=e),jl=!0,Df||(Df=!0,PS())}function Eo(e,n){if(!wf&&jl){wf=!0;do for(var a=!1,o=Yl;o!==null;){if(e!==0){var c=o.pendingLanes;if(c===0)var f=0;else{var g=o.suspendedLanes,b=o.pingedLanes;f=(1<<31-zt(42|e)+1)-1,f&=c&~(g&~b),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,Ig(o,f))}else f=xe,f=mt(o,o===ke?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||Ft(o,f)||(a=!0,Ig(o,f));o=o.next}while(a);wf=!1}}function OS(){Pg()}function Pg(){jl=Df=!1;var e=0;Da!==0&&qS()&&(e=Da);for(var n=E(),a=null,o=Yl;o!==null;){var c=o.next,f=zg(o,n);f===0?(o.next=null,a===null?Yl=c:a.next=c,c===null&&(ss=a)):(a=o,(e!==0||(f&3)!==0)&&(jl=!0)),o=c}hn!==0&&hn!==5||Eo(e),Da!==0&&(Da=0)}function zg(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,c=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var g=31-zt(f),b=1<<g,z=c[g];z===-1?((b&a)===0||(b&o)!==0)&&(c[g]=ae(b,n)):z<=n&&(e.expiredLanes|=b),f&=~b}if(n=ke,a=xe,a=mt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Ne===2||Ne===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&Ze(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Ft(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&Ze(o),Ur(a)){case 2:case 8:a=St;break;case 32:a=lt;break;case 268435456:a=Rt;break;default:a=lt}return o=Bg.bind(null,e),a=re(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&Ze(o),e.callbackPriority=2,e.callbackNode=null,2}function Bg(e,n){if(hn!==0&&hn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Wl()&&e.callbackNode!==a)return null;var o=xe;return o=mt(e,e===ke?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(vg(e,o,n),zg(e,E()),e.callbackNode!=null&&e.callbackNode===a?Bg.bind(null,e):null)}function Ig(e,n){if(Wl())return null;vg(e,n,!0)}function PS(){YS(function(){(De&6)!==0?re(ht,OS):Pg()})}function Uf(){if(Da===0){var e=qr;e===0&&(e=Tt,Tt<<=1,(Tt&261888)===0&&(Tt=256)),Da=e}return Da}function Fg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:nl(""+e)}function Hg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function zS(e,n,a,o,c){if(n==="submit"&&a&&a.stateNode===c){var f=Fg((c[xn]||null).action),g=o.submitter;g&&(n=(n=g[xn]||null)?Fg(n.formAction):g.getAttribute("formAction"),n!==null&&(f=n,g=null));var b=new sl("action","action",null,o,c);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Da!==0){var z=g?Hg(c,g):new FormData(c);Ku(a,{pending:!0,data:z,method:c.method,action:f},null,z)}}else typeof f=="function"&&(b.preventDefault(),z=g?Hg(c,g):new FormData(c),Ku(a,{pending:!0,data:z,method:c.method,action:f},f,z))},currentTarget:c}]})}}for(var Lf=0;Lf<du.length;Lf++){var Nf=du[Lf],BS=Nf.toLowerCase(),IS=Nf[0].toUpperCase()+Nf.slice(1);_i(BS,"on"+IS)}_i(_p,"onAnimationEnd"),_i(vp,"onAnimationIteration"),_i(Sp,"onAnimationStart"),_i("dblclick","onDoubleClick"),_i("focusin","onFocus"),_i("focusout","onBlur"),_i(tS,"onTransitionRun"),_i(eS,"onTransitionStart"),_i(nS,"onTransitionCancel"),_i(xp,"onTransitionEnd"),Qt("onMouseEnter",["mouseout","mouseover"]),Qt("onMouseLeave",["mouseout","mouseover"]),Qt("onPointerEnter",["pointerout","pointerover"]),Qt("onPointerLeave",["pointerout","pointerover"]),Pt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Pt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Pt("onBeforeInput",["compositionend","keypress","textInput","paste"]),Pt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Pt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Pt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),FS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bo));function Gg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],c=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var g=o.length-1;0<=g;g--){var b=o[g],z=b.instance,Q=b.currentTarget;if(b=b.listener,z!==f&&c.isPropagationStopped())break t;f=b,c.currentTarget=Q;try{f(c)}catch(ut){cl(ut)}c.currentTarget=null,f=z}else for(g=0;g<o.length;g++){if(b=o[g],z=b.instance,Q=b.currentTarget,b=b.listener,z!==f&&c.isPropagationStopped())break t;f=b,c.currentTarget=Q;try{f(c)}catch(ut){cl(ut)}c.currentTarget=null,f=z}}}}function ve(e,n){var a=n[Xs];a===void 0&&(a=n[Xs]=new Set);var o=e+"__bubble";a.has(o)||(Vg(n,e,2,!1),a.add(o))}function Of(e,n,a){var o=0;n&&(o|=4),Vg(a,e,o,n)}var Zl="_reactListening"+Math.random().toString(36).slice(2);function Pf(e){if(!e[Zl]){e[Zl]=!0,Lt.forEach(function(a){a!=="selectionchange"&&(FS.has(a)||Of(a,!1,e),Of(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Zl]||(n[Zl]=!0,Of("selectionchange",!1,n))}}function Vg(e,n,a,o){switch(__(n)){case 2:var c=dx;break;case 8:c=px;break;default:c=Kf}a=c.bind(null,n,a,e),c=void 0,!tu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),o?c!==void 0?e.addEventListener(n,a,{capture:!0,passive:c}):e.addEventListener(n,a,!0):c!==void 0?e.addEventListener(n,a,{passive:c}):e.addEventListener(n,a,!1)}function zf(e,n,a,o,c){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var g=o.tag;if(g===3||g===4){var b=o.stateNode.containerInfo;if(b===c)break;if(g===4)for(g=o.return;g!==null;){var z=g.tag;if((z===3||z===4)&&g.stateNode.containerInfo===c)return;g=g.return}for(;b!==null;){if(g=X(b),g===null)return;if(z=g.tag,z===5||z===6||z===26||z===27){o=f=g;continue t}b=b.parentNode}}o=o.return}Yd(function(){var Q=f,ut=Jc(a),pt=[];t:{var tt=yp.get(e);if(tt!==void 0){var st=sl,Ht=e;switch(e){case"keypress":if(al(a)===0)break t;case"keydown":case"keyup":st=Lv;break;case"focusin":Ht="focus",st=au;break;case"focusout":Ht="blur",st=au;break;case"beforeblur":case"afterblur":st=au;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":st=Kd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":st=xv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":st=Pv;break;case _p:case vp:case Sp:st=Ev;break;case xp:st=Bv;break;case"scroll":case"scrollend":st=vv;break;case"wheel":st=Fv;break;case"copy":case"cut":case"paste":st=Tv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":st=Jd;break;case"toggle":case"beforetoggle":st=Gv}var ee=(n&4)!==0,Be=!ee&&(e==="scroll"||e==="scrollend"),q=ee?tt!==null?tt+"Capture":null:tt;ee=[];for(var G=Q,K;G!==null;){var dt=G;if(K=dt.stateNode,dt=dt.tag,dt!==5&&dt!==26&&dt!==27||K===null||q===null||(dt=qs(G,q),dt!=null&&ee.push(To(G,dt,K))),Be)break;G=G.return}0<ee.length&&(tt=new st(tt,Ht,null,a,ut),pt.push({event:tt,listeners:ee}))}}if((n&7)===0){t:{if(tt=e==="mouseover"||e==="pointerover",st=e==="mouseout"||e==="pointerout",tt&&a!==Qc&&(Ht=a.relatedTarget||a.fromElement)&&(X(Ht)||Ht[ha]))break t;if((st||tt)&&(tt=ut.window===ut?ut:(tt=ut.ownerDocument)?tt.defaultView||tt.parentWindow:window,st?(Ht=a.relatedTarget||a.toElement,st=Q,Ht=Ht?X(Ht):null,Ht!==null&&(Be=u(Ht),ee=Ht.tag,Ht!==Be||ee!==5&&ee!==27&&ee!==6)&&(Ht=null)):(st=null,Ht=Q),st!==Ht)){if(ee=Kd,dt="onMouseLeave",q="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&(ee=Jd,dt="onPointerLeave",q="onPointerEnter",G="pointer"),Be=st==null?tt:rt(st),K=Ht==null?tt:rt(Ht),tt=new ee(dt,G+"leave",st,a,ut),tt.target=Be,tt.relatedTarget=K,dt=null,X(ut)===Q&&(ee=new ee(q,G+"enter",Ht,a,ut),ee.target=K,ee.relatedTarget=Be,dt=ee),Be=dt,st&&Ht)e:{for(ee=HS,q=st,G=Ht,K=0,dt=q;dt;dt=ee(dt))K++;dt=0;for(var $t=G;$t;$t=ee($t))dt++;for(;0<K-dt;)q=ee(q),K--;for(;0<dt-K;)G=ee(G),dt--;for(;K--;){if(q===G||G!==null&&q===G.alternate){ee=q;break e}q=ee(q),G=ee(G)}ee=null}else ee=null;st!==null&&kg(pt,tt,st,ee,!1),Ht!==null&&Be!==null&&kg(pt,Be,Ht,ee,!0)}}t:{if(tt=Q?rt(Q):window,st=tt.nodeName&&tt.nodeName.toLowerCase(),st==="select"||st==="input"&&tt.type==="file")var Ae=sp;else if(ap(tt))if(op)Ae=Qv;else{Ae=Zv;var Wt=jv}else st=tt.nodeName,!st||st.toLowerCase()!=="input"||tt.type!=="checkbox"&&tt.type!=="radio"?Q&&Kc(Q.elementType)&&(Ae=sp):Ae=Kv;if(Ae&&(Ae=Ae(e,Q))){rp(pt,Ae,a,ut);break t}Wt&&Wt(e,tt,Q),e==="focusout"&&Q&&tt.type==="number"&&Q.memoizedProps.value!=null&&fn(tt,"number",tt.value)}switch(Wt=Q?rt(Q):window,e){case"focusin":(ap(Wt)||Wt.contentEditable==="true")&&(Br=Wt,uu=Q,$s=null);break;case"focusout":$s=uu=Br=null;break;case"mousedown":fu=!0;break;case"contextmenu":case"mouseup":case"dragend":fu=!1,mp(pt,a,ut);break;case"selectionchange":if($v)break;case"keydown":case"keyup":mp(pt,a,ut)}var ce;if(su)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else zr?np(e,a)&&(ye="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(ye="onCompositionStart");ye&&($d&&a.locale!=="ko"&&(zr||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&zr&&(ce=jd()):(da=ut,eu="value"in da?da.value:da.textContent,zr=!0)),Wt=Kl(Q,ye),0<Wt.length&&(ye=new Qd(ye,e,null,a,ut),pt.push({event:ye,listeners:Wt}),ce?ye.data=ce:(ce=ip(a),ce!==null&&(ye.data=ce)))),(ce=kv?Xv(e,a):qv(e,a))&&(ye=Kl(Q,"onBeforeInput"),0<ye.length&&(Wt=new Qd("onBeforeInput","beforeinput",null,a,ut),pt.push({event:Wt,listeners:ye}),Wt.data=ce)),zS(pt,e,Q,a,ut)}Gg(pt,n)})}function To(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Kl(e,n){for(var a=n+"Capture",o=[];e!==null;){var c=e,f=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||f===null||(c=qs(e,a),c!=null&&o.unshift(To(e,c,f)),c=qs(e,n),c!=null&&o.push(To(e,c,f))),e.tag===3)return o;e=e.return}return[]}function HS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function kg(e,n,a,o,c){for(var f=n._reactName,g=[];a!==null&&a!==o;){var b=a,z=b.alternate,Q=b.stateNode;if(b=b.tag,z!==null&&z===o)break;b!==5&&b!==26&&b!==27||Q===null||(z=Q,c?(Q=qs(a,f),Q!=null&&g.unshift(To(a,Q,z))):c||(Q=qs(a,f),Q!=null&&g.push(To(a,Q,z)))),a=a.return}g.length!==0&&e.push({event:n,listeners:g})}var GS=/\r\n?/g,VS=/\u0000|\uFFFD/g;function Xg(e){return(typeof e=="string"?e:""+e).replace(GS,`
`).replace(VS,"")}function qg(e,n){return n=Xg(n),Xg(e)===n}function ze(e,n,a,o,c,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Nr(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Nr(e,""+o);break;case"className":Ue(e,"class",o);break;case"tabIndex":Ue(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ue(e,a,o);break;case"style":qd(e,o,f);break;case"data":if(n!=="object"){Ue(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=nl(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&ze(e,n,"name",c.name,c,null),ze(e,n,"formEncType",c.formEncType,c,null),ze(e,n,"formMethod",c.formMethod,c,null),ze(e,n,"formTarget",c.formTarget,c,null)):(ze(e,n,"encType",c.encType,c,null),ze(e,n,"method",c.method,c,null),ze(e,n,"target",c.target,c,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=nl(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Bi);break;case"onScroll":o!=null&&ve("scroll",e);break;case"onScrollEnd":o!=null&&ve("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(c.children!=null)throw Error(r(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=nl(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":ve("beforetoggle",e),ve("toggle",e),Ve(e,"popover",o);break;case"xlinkActuate":ge(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":ge(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":ge(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":ge(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":ge(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":ge(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":ge(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":ge(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":ge(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Ve(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=gv.get(a)||a,Ve(e,a,o))}}function Bf(e,n,a,o,c,f){switch(a){case"style":qd(e,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(c.children!=null)throw Error(r(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Nr(e,o):(typeof o=="number"||typeof o=="bigint")&&Nr(e,""+o);break;case"onScroll":o!=null&&ve("scroll",e);break;case"onScrollEnd":o!=null&&ve("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Bi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Gt.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),n=a.slice(2,c?a.length-7:void 0),f=e[xn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,c),typeof o=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,c);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Ve(e,a,o)}}}function Tn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ve("error",e),ve("load",e);var o=!1,c=!1,f;for(f in a)if(a.hasOwnProperty(f)){var g=a[f];if(g!=null)switch(f){case"src":o=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:ze(e,n,f,g,a,null)}}c&&ze(e,n,"srcSet",a.srcSet,a,null),o&&ze(e,n,"src",a.src,a,null);return;case"input":ve("invalid",e);var b=f=g=c=null,z=null,Q=null;for(o in a)if(a.hasOwnProperty(o)){var ut=a[o];if(ut!=null)switch(o){case"name":c=ut;break;case"type":g=ut;break;case"checked":z=ut;break;case"defaultChecked":Q=ut;break;case"value":f=ut;break;case"defaultValue":b=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(r(137,n));break;default:ze(e,n,o,ut,a,null)}}Un(e,f,b,z,Q,g,c,!1);return;case"select":ve("invalid",e),o=g=f=null;for(c in a)if(a.hasOwnProperty(c)&&(b=a[c],b!=null))switch(c){case"value":f=b;break;case"defaultValue":g=b;break;case"multiple":o=b;default:ze(e,n,c,b,a,null)}n=f,a=g,e.multiple=!!o,n!=null?Je(e,!!o,n,!1):a!=null&&Je(e,!!o,a,!0);return;case"textarea":ve("invalid",e),f=c=o=null;for(g in a)if(a.hasOwnProperty(g)&&(b=a[g],b!=null))switch(g){case"value":o=b;break;case"defaultValue":c=b;break;case"children":f=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(r(91));break;default:ze(e,n,g,b,a,null)}Ai(e,o,c,f);return;case"option":for(z in a)a.hasOwnProperty(z)&&(o=a[z],o!=null)&&(z==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":ze(e,n,z,o,a,null));return;case"dialog":ve("beforetoggle",e),ve("toggle",e),ve("cancel",e),ve("close",e);break;case"iframe":case"object":ve("load",e);break;case"video":case"audio":for(o=0;o<bo.length;o++)ve(bo[o],e);break;case"image":ve("error",e),ve("load",e);break;case"details":ve("toggle",e);break;case"embed":case"source":case"link":ve("error",e),ve("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(Q in a)if(a.hasOwnProperty(Q)&&(o=a[Q],o!=null))switch(Q){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:ze(e,n,Q,o,a,null)}return;default:if(Kc(n)){for(ut in a)a.hasOwnProperty(ut)&&(o=a[ut],o!==void 0&&Bf(e,n,ut,o,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(o=a[b],o!=null&&ze(e,n,b,o,a,null))}function kS(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,f=null,g=null,b=null,z=null,Q=null,ut=null;for(st in a){var pt=a[st];if(a.hasOwnProperty(st)&&pt!=null)switch(st){case"checked":break;case"value":break;case"defaultValue":z=pt;default:o.hasOwnProperty(st)||ze(e,n,st,null,o,pt)}}for(var tt in o){var st=o[tt];if(pt=a[tt],o.hasOwnProperty(tt)&&(st!=null||pt!=null))switch(tt){case"type":f=st;break;case"name":c=st;break;case"checked":Q=st;break;case"defaultChecked":ut=st;break;case"value":g=st;break;case"defaultValue":b=st;break;case"children":case"dangerouslySetInnerHTML":if(st!=null)throw Error(r(137,n));break;default:st!==pt&&ze(e,n,tt,st,o,pt)}}An(e,g,b,z,Q,ut,f,c);return;case"select":st=g=b=tt=null;for(f in a)if(z=a[f],a.hasOwnProperty(f)&&z!=null)switch(f){case"value":break;case"multiple":st=z;default:o.hasOwnProperty(f)||ze(e,n,f,null,o,z)}for(c in o)if(f=o[c],z=a[c],o.hasOwnProperty(c)&&(f!=null||z!=null))switch(c){case"value":tt=f;break;case"defaultValue":b=f;break;case"multiple":g=f;default:f!==z&&ze(e,n,c,f,o,z)}n=b,a=g,o=st,tt!=null?Je(e,!!a,tt,!1):!!o!=!!a&&(n!=null?Je(e,!!a,n,!0):Je(e,!!a,a?[]:"",!1));return;case"textarea":st=tt=null;for(b in a)if(c=a[b],a.hasOwnProperty(b)&&c!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:ze(e,n,b,null,o,c)}for(g in o)if(c=o[g],f=a[g],o.hasOwnProperty(g)&&(c!=null||f!=null))switch(g){case"value":tt=c;break;case"defaultValue":st=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(r(91));break;default:c!==f&&ze(e,n,g,c,o,f)}Lr(e,tt,st);return;case"option":for(var Ht in a)tt=a[Ht],a.hasOwnProperty(Ht)&&tt!=null&&!o.hasOwnProperty(Ht)&&(Ht==="selected"?e.selected=!1:ze(e,n,Ht,null,o,tt));for(z in o)tt=o[z],st=a[z],o.hasOwnProperty(z)&&tt!==st&&(tt!=null||st!=null)&&(z==="selected"?e.selected=tt&&typeof tt!="function"&&typeof tt!="symbol":ze(e,n,z,tt,o,st));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ee in a)tt=a[ee],a.hasOwnProperty(ee)&&tt!=null&&!o.hasOwnProperty(ee)&&ze(e,n,ee,null,o,tt);for(Q in o)if(tt=o[Q],st=a[Q],o.hasOwnProperty(Q)&&tt!==st&&(tt!=null||st!=null))switch(Q){case"children":case"dangerouslySetInnerHTML":if(tt!=null)throw Error(r(137,n));break;default:ze(e,n,Q,tt,o,st)}return;default:if(Kc(n)){for(var Be in a)tt=a[Be],a.hasOwnProperty(Be)&&tt!==void 0&&!o.hasOwnProperty(Be)&&Bf(e,n,Be,void 0,o,tt);for(ut in o)tt=o[ut],st=a[ut],!o.hasOwnProperty(ut)||tt===st||tt===void 0&&st===void 0||Bf(e,n,ut,tt,o,st);return}}for(var q in a)tt=a[q],a.hasOwnProperty(q)&&tt!=null&&!o.hasOwnProperty(q)&&ze(e,n,q,null,o,tt);for(pt in o)tt=o[pt],st=a[pt],!o.hasOwnProperty(pt)||tt===st||tt==null&&st==null||ze(e,n,pt,tt,o,st)}function Wg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function XS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var c=a[o],f=c.transferSize,g=c.initiatorType,b=c.duration;if(f&&b&&Wg(g)){for(g=0,b=c.responseEnd,o+=1;o<a.length;o++){var z=a[o],Q=z.startTime;if(Q>b)break;var ut=z.transferSize,pt=z.initiatorType;ut&&Wg(pt)&&(z=z.responseEnd,g+=ut*(z<b?1:(b-Q)/(z-Q)))}if(--o,n+=8*(f+g)/(c.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var If=null,Ff=null;function Ql(e){return e.nodeType===9?e:e.ownerDocument}function Yg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function jg(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Hf(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Gf=null;function qS(){var e=window.event;return e&&e.type==="popstate"?e===Gf?!1:(Gf=e,!0):(Gf=null,!1)}var Zg=typeof setTimeout=="function"?setTimeout:void 0,WS=typeof clearTimeout=="function"?clearTimeout:void 0,Kg=typeof Promise=="function"?Promise:void 0,YS=typeof queueMicrotask=="function"?queueMicrotask:typeof Kg<"u"?function(e){return Kg.resolve(null).then(e).catch(jS)}:Zg;function jS(e){setTimeout(function(){throw e})}function wa(e){return e==="head"}function Qg(e,n){var a=n,o=0;do{var c=a.nextSibling;if(e.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(c),us(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Ao(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Ao(a);for(var f=a.firstChild;f;){var g=f.nextSibling,b=f.nodeName;f[ja]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=g}}else a==="body"&&Ao(e.ownerDocument.body);a=c}while(a);us(n)}function Jg(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function Vf(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Vf(a),T(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function ZS(e,n,a,o){for(;e.nodeType===1;){var c=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[ja])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=ui(e.nextSibling),e===null)break}return null}function KS(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=ui(e.nextSibling),e===null))return null;return e}function $g(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=ui(e.nextSibling),e===null))return null;return e}function kf(e){return e.data==="$?"||e.data==="$~"}function Xf(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function QS(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function ui(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var qf=null;function t_(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return ui(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function e_(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function n_(e,n,a){switch(n=Ql(a),e){case"html":if(e=n.documentElement,!e)throw Error(r(452));return e;case"head":if(e=n.head,!e)throw Error(r(453));return e;case"body":if(e=n.body,!e)throw Error(r(454));return e;default:throw Error(r(451))}}function Ao(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);T(e)}var fi=new Map,i_=new Set;function Jl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var $i=j.d;j.d={f:JS,r:$S,D:tx,C:ex,L:nx,m:ix,X:rx,S:ax,M:sx};function JS(){var e=$i.f(),n=kl();return e||n}function $S(e){var n=at(e);n!==null&&n.tag===5&&n.type==="form"?xm(n):$i.r(e)}var os=typeof document>"u"?null:document;function a_(e,n,a){var o=os;if(o&&typeof n=="string"&&n){var c=Se(n);c='link[rel="'+e+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),i_.has(c)||(i_.add(c),e={rel:e,crossOrigin:a,href:n},o.querySelector(c)===null&&(n=o.createElement("link"),Tn(n,"link",e),_t(n),o.head.appendChild(n)))}}function tx(e){$i.D(e),a_("dns-prefetch",e,null)}function ex(e,n){$i.C(e,n),a_("preconnect",e,n)}function nx(e,n,a){$i.L(e,n,a);var o=os;if(o&&e&&n){var c='link[rel="preload"][as="'+Se(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+Se(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+Se(a.imageSizes)+'"]')):c+='[href="'+Se(e)+'"]';var f=c;switch(n){case"style":f=ls(e);break;case"script":f=cs(e)}fi.has(f)||(e=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),fi.set(f,e),o.querySelector(c)!==null||n==="style"&&o.querySelector(Ro(f))||n==="script"&&o.querySelector(Co(f))||(n=o.createElement("link"),Tn(n,"link",e),_t(n),o.head.appendChild(n)))}}function ix(e,n){$i.m(e,n);var a=os;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+Se(o)+'"][href="'+Se(e)+'"]',f=c;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=cs(e)}if(!fi.has(f)&&(e=_({rel:"modulepreload",href:e},n),fi.set(f,e),a.querySelector(c)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Co(f)))return}o=a.createElement("link"),Tn(o,"link",e),_t(o),a.head.appendChild(o)}}}function ax(e,n,a){$i.S(e,n,a);var o=os;if(o&&e){var c=W(o).hoistableStyles,f=ls(e);n=n||"default";var g=c.get(f);if(!g){var b={loading:0,preload:null};if(g=o.querySelector(Ro(f)))b.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":n},a),(a=fi.get(f))&&Wf(e,a);var z=g=o.createElement("link");_t(z),Tn(z,"link",e),z._p=new Promise(function(Q,ut){z.onload=Q,z.onerror=ut}),z.addEventListener("load",function(){b.loading|=1}),z.addEventListener("error",function(){b.loading|=2}),b.loading|=4,$l(g,n,o)}g={type:"stylesheet",instance:g,count:1,state:b},c.set(f,g)}}}function rx(e,n){$i.X(e,n);var a=os;if(a&&e){var o=W(a).hoistableScripts,c=cs(e),f=o.get(c);f||(f=a.querySelector(Co(c)),f||(e=_({src:e,async:!0},n),(n=fi.get(c))&&Yf(e,n),f=a.createElement("script"),_t(f),Tn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(c,f))}}function sx(e,n){$i.M(e,n);var a=os;if(a&&e){var o=W(a).hoistableScripts,c=cs(e),f=o.get(c);f||(f=a.querySelector(Co(c)),f||(e=_({src:e,async:!0,type:"module"},n),(n=fi.get(c))&&Yf(e,n),f=a.createElement("script"),_t(f),Tn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(c,f))}}function r_(e,n,a,o){var c=(c=nt.current)?Jl(c):null;if(!c)throw Error(r(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=ls(a.href),a=W(c).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=ls(a.href);var f=W(c).hoistableStyles,g=f.get(e);if(g||(c=c.ownerDocument||c,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,g),(f=c.querySelector(Ro(e)))&&!f._p&&(g.instance=f,g.state.loading=5),fi.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},fi.set(e,a),f||ox(c,e,a,g.state))),n&&o===null)throw Error(r(528,""));return g}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=cs(a),a=W(c).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,e))}}function ls(e){return'href="'+Se(e)+'"'}function Ro(e){return'link[rel="stylesheet"]['+e+"]"}function s_(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function ox(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Tn(n,"link",a),_t(n),e.head.appendChild(n))}function cs(e){return'[src="'+Se(e)+'"]'}function Co(e){return"script[async]"+e}function o_(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+Se(a.href)+'"]');if(o)return n.instance=o,_t(o),o;var c=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),_t(o),Tn(o,"style",c),$l(o,a.precedence,e),n.instance=o;case"stylesheet":c=ls(a.href);var f=e.querySelector(Ro(c));if(f)return n.state.loading|=4,n.instance=f,_t(f),f;o=s_(a),(c=fi.get(c))&&Wf(o,c),f=(e.ownerDocument||e).createElement("link"),_t(f);var g=f;return g._p=new Promise(function(b,z){g.onload=b,g.onerror=z}),Tn(f,"link",o),n.state.loading|=4,$l(f,a.precedence,e),n.instance=f;case"script":return f=cs(a.src),(c=e.querySelector(Co(f)))?(n.instance=c,_t(c),c):(o=a,(c=fi.get(f))&&(o=_({},a),Yf(o,c)),e=e.ownerDocument||e,c=e.createElement("script"),_t(c),Tn(c,"link",o),e.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,$l(o,a.precedence,e));return n.instance}function $l(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=o.length?o[o.length-1]:null,f=c,g=0;g<o.length;g++){var b=o[g];if(b.dataset.precedence===n)f=b;else if(f!==c)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function Wf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Yf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var tc=null;function l_(e,n,a){if(tc===null){var o=new Map,c=tc=new Map;c.set(a,o)}else c=tc,o=c.get(a),o||(o=new Map,c.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),c=0;c<a.length;c++){var f=a[c];if(!(f[ja]||f[rn]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var g=f.getAttribute(n)||"";g=e+g;var b=o.get(g);b?b.push(f):o.set(g,[f])}}return o}function c_(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function lx(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function u_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function cx(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=ls(o.href),f=n.querySelector(Ro(c));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=ec.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,_t(f);return}f=n.ownerDocument||n,o=s_(o),(c=fi.get(c))&&Wf(o,c),f=f.createElement("link"),_t(f);var g=f;g._p=new Promise(function(b,z){g.onload=b,g.onerror=z}),Tn(f,"link",o),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=ec.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var jf=0;function ux(e,n){return e.stylesheets&&e.count===0&&ic(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&ic(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&jf===0&&(jf=62500*XS());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ic(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>jf?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(c)}}:null}function ec(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ic(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var nc=null;function ic(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,nc=new Map,n.forEach(fx,e),nc=null,ec.call(e))}function fx(e,n){if(!(n.state.loading&4)){var a=nc.get(e);if(a)var o=a.get(null);else{a=new Map,nc.set(e,a);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<c.length;f++){var g=c[f];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(a.set(g.dataset.precedence,g),o=g)}o&&a.set(null,o)}c=n.instance,g=c.getAttribute("data-precedence"),f=a.get(g)||o,f===o&&a.set(null,c),a.set(g,c),this.count++,o=ec.bind(this),c.addEventListener("load",o),c.addEventListener("error",o),f?f.parentNode.insertBefore(c,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),n.state.loading|=4}}var Do={$$typeof:N,Provider:null,Consumer:null,_currentValue:Y,_currentValue2:Y,_threadCount:0};function hx(e,n,a,o,c,f,g,b,z){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ee(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ee(0),this.hiddenUpdates=Ee(null),this.identifierPrefix=o,this.onUncaughtError=c,this.onCaughtError=f,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function f_(e,n,a,o,c,f,g,b,z,Q,ut,pt){return e=new hx(e,n,a,g,z,Q,ut,pt,b),n=1,f===!0&&(n|=24),f=Yn(3,null,null,n),e.current=f,f.stateNode=e,n=Au(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},wu(f),e}function h_(e){return e?(e=Hr,e):Hr}function d_(e,n,a,o,c,f){c=h_(c),o.context===null?o.context=c:o.pendingContext=c,o=Sa(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=xa(e,o,n),a!==null&&(Hn(a,e,n),so(a,e,n))}function p_(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function Zf(e,n){p_(e,n),(e=e.alternate)&&p_(e,n)}function m_(e){if(e.tag===13||e.tag===31){var n=$a(e,67108864);n!==null&&Hn(n,e,67108864),Zf(e,67108864)}}function g_(e){if(e.tag===13||e.tag===31){var n=Jn();n=wr(n);var a=$a(e,n);a!==null&&Hn(a,e,n),Zf(e,n)}}var ac=!0;function dx(e,n,a,o){var c=O.T;O.T=null;var f=j.p;try{j.p=2,Kf(e,n,a,o)}finally{j.p=f,O.T=c}}function px(e,n,a,o){var c=O.T;O.T=null;var f=j.p;try{j.p=8,Kf(e,n,a,o)}finally{j.p=f,O.T=c}}function Kf(e,n,a,o){if(ac){var c=Qf(o);if(c===null)zf(e,n,o,rc,a),v_(e,o);else if(gx(c,e,n,a,o))o.stopPropagation();else if(v_(e,o),n&4&&-1<mx.indexOf(e)){for(;c!==null;){var f=at(c);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var g=yt(f.pendingLanes);if(g!==0){var b=f;for(b.pendingLanes|=2,b.entangledLanes|=2;g;){var z=1<<31-zt(g);b.entanglements[1]|=z,g&=~z}wi(f),(De&6)===0&&(Gl=E()+500,Eo(0))}}break;case 31:case 13:b=$a(f,2),b!==null&&Hn(b,f,2),kl(),Zf(f,2)}if(f=Qf(o),f===null&&zf(e,n,o,rc,a),f===c)break;c=f}c!==null&&o.stopPropagation()}else zf(e,n,o,null,a)}}function Qf(e){return e=Jc(e),Jf(e)}var rc=null;function Jf(e){if(rc=null,e=X(e),e!==null){var n=u(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return rc=e,null}function __(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(J()){case ht:return 2;case St:return 8;case lt:case Zt:return 32;case Rt:return 268435456;default:return 32}default:return 32}}var $f=!1,Ua=null,La=null,Na=null,wo=new Map,Uo=new Map,Oa=[],mx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function v_(e,n){switch(e){case"focusin":case"focusout":Ua=null;break;case"dragenter":case"dragleave":La=null;break;case"mouseover":case"mouseout":Na=null;break;case"pointerover":case"pointerout":wo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Uo.delete(n.pointerId)}}function Lo(e,n,a,o,c,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[c]},n!==null&&(n=at(n),n!==null&&m_(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),e)}function gx(e,n,a,o,c){switch(n){case"focusin":return Ua=Lo(Ua,e,n,a,o,c),!0;case"dragenter":return La=Lo(La,e,n,a,o,c),!0;case"mouseover":return Na=Lo(Na,e,n,a,o,c),!0;case"pointerover":var f=c.pointerId;return wo.set(f,Lo(wo.get(f)||null,e,n,a,o,c)),!0;case"gotpointercapture":return f=c.pointerId,Uo.set(f,Lo(Uo.get(f)||null,e,n,a,o,c)),!0}return!1}function S_(e){var n=X(e.target);if(n!==null){var a=u(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,ks(e.priority,function(){g_(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,ks(e.priority,function(){g_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function sc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=Qf(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);Qc=o,a.target.dispatchEvent(o),Qc=null}else return n=at(a),n!==null&&m_(n),e.blockedOn=a,!1;n.shift()}return!0}function x_(e,n,a){sc(e)&&a.delete(n)}function _x(){$f=!1,Ua!==null&&sc(Ua)&&(Ua=null),La!==null&&sc(La)&&(La=null),Na!==null&&sc(Na)&&(Na=null),wo.forEach(x_),Uo.forEach(x_)}function oc(e,n){e.blockedOn===n&&(e.blockedOn=null,$f||($f=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,_x)))}var lc=null;function y_(e){lc!==e&&(lc=e,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){lc===e&&(lc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],c=e[n+2];if(typeof o!="function"){if(Jf(o||a)===null)continue;break}var f=at(a);f!==null&&(e.splice(n,3),n-=3,Ku(f,{pending:!0,data:c,method:a.method,action:o},o,c))}}))}function us(e){function n(z){return oc(z,e)}Ua!==null&&oc(Ua,e),La!==null&&oc(La,e),Na!==null&&oc(Na,e),wo.forEach(n),Uo.forEach(n);for(var a=0;a<Oa.length;a++){var o=Oa[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Oa.length&&(a=Oa[0],a.blockedOn===null);)S_(a),a.blockedOn===null&&Oa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var c=a[o],f=a[o+1],g=c[xn]||null;if(typeof f=="function")g||y_(a);else if(g){var b=null;if(f&&f.hasAttribute("formAction")){if(c=f,g=f[xn]||null)b=g.formAction;else if(Jf(c)!==null)continue}else b=g.action;typeof b=="function"?a[o+1]=b:(a.splice(o,3),o-=3),y_(a)}}}function M_(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(g){return c=g})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function th(e){this._internalRoot=e}cc.prototype.render=th.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,o=Jn();d_(a,o,e,n,null,null)},cc.prototype.unmount=th.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;d_(e.current,2,null,e,null,null),kl(),n[ha]=null}};function cc(e){this._internalRoot=e}cc.prototype.unstable_scheduleHydration=function(e){if(e){var n=Ya();e={blockedOn:null,target:e,priority:n};for(var a=0;a<Oa.length&&n!==0&&n<Oa[a].priority;a++);Oa.splice(a,0,e),a===0&&S_(e)}};var E_=t.version;if(E_!=="19.2.9")throw Error(r(527,E_,"19.2.9"));j.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(r(188)):(e=Object.keys(e).join(","),Error(r(268,e)));return e=p(n),e=e!==null?S(e):null,e=e===null?null:e.stateNode,e};var vx={bundleType:0,version:"19.2.9",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.2.9"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var uc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!uc.isDisabled&&uc.supportsFiber)try{bt=uc.inject(vx),Ct=uc}catch{}}return Oo.createRoot=function(e,n){if(!l(e))throw Error(r(299));var a=!1,o="",c=wm,f=Um,g=Lm;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=f_(e,1,!1,null,null,a,o,null,c,f,g,M_),e[ha]=n.current,Pf(e),new th(n)},Oo.hydrateRoot=function(e,n,a){if(!l(e))throw Error(r(299));var o=!1,c="",f=wm,g=Um,b=Lm,z=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=f_(e,1,!0,n,a??null,o,c,z,f,g,b,M_),n.context=h_(null),a=n.current,o=Jn(),o=wr(o),c=Sa(o),c.callback=null,xa(a,c,o),a=o,n.current.lanes=a,wn(n,a),wi(n),e[ha]=n.current,Pf(e),new cc(n)},Oo.version="19.2.9",Oo}var N_;function Cx(){if(N_)return nh.exports;N_=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(t){console.error(t)}}return s(),nh.exports=Rx(),nh.exports}var Dx=Cx(),Gn=Cd();const Dd="180",Us={ROTATE:0,DOLLY:1,PAN:2},Ds={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wx=0,O_=1,Ux=2,L0=1,Lx=2,ra=3,qa=0,kn=1,sa=2,la=0,Ls=1,P_=2,z_=3,B_=4,Nx=5,Sr=100,Ox=101,Px=102,zx=103,Bx=104,Ix=200,Fx=201,Hx=202,Gx=203,Bh=204,Ih=205,Vx=206,kx=207,Xx=208,qx=209,Wx=210,Yx=211,jx=212,Zx=213,Kx=214,Fh=0,Hh=1,Gh=2,Os=3,Vh=4,kh=5,Xh=6,qh=7,N0=0,Qx=1,Jx=2,ca=0,$x=1,ty=2,ey=3,ny=4,iy=5,ay=6,ry=7,O0=300,Ps=301,zs=302,Wh=303,Yh=304,Vc=306,jh=1e3,yr=1001,Zh=1002,bi=1003,sy=1004,fc=1005,mi=1006,oh=1007,Mr=1008,Pi=1009,P0=1010,z0=1011,qo=1012,wd=1013,br=1014,oa=1015,Fs=1016,Ud=1017,Ld=1018,Wo=1020,B0=35902,I0=35899,F0=1021,H0=1022,gi=1023,Yo=1026,jo=1027,G0=1028,Nd=1029,V0=1030,Od=1031,Pd=1033,Oc=33776,Pc=33777,zc=33778,Bc=33779,Kh=35840,Qh=35841,Jh=35842,$h=35843,td=36196,ed=37492,nd=37496,id=37808,ad=37809,rd=37810,sd=37811,od=37812,ld=37813,cd=37814,ud=37815,fd=37816,hd=37817,dd=37818,pd=37819,md=37820,gd=37821,_d=36492,vd=36494,Sd=36495,xd=36283,yd=36284,Md=36285,Ed=36286,oy=3200,ly=3201,cy=0,uy=1,ka="",di="srgb",Tr="srgb-linear",Fc="linear",Ie="srgb",fs=7680,I_=519,fy=512,hy=513,dy=514,k0=515,py=516,my=517,gy=518,_y=519,F_=35044,H_="300 es",Li=2e3,Hc=2001;class Rr{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[t]===void 0&&(r[t]=[]),r[t].indexOf(i)===-1&&r[t].push(i)}hasEventListener(t,i){const r=this._listeners;return r===void 0?!1:r[t]!==void 0&&r[t].indexOf(i)!==-1}removeEventListener(t,i){const r=this._listeners;if(r===void 0)return;const l=r[t];if(l!==void 0){const u=l.indexOf(i);u!==-1&&l.splice(u,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const r=i[t.type];if(r!==void 0){t.target=this;const l=r.slice(0);for(let u=0,h=l.length;u<h;u++)l[u].call(this,t);t.target=null}}}const Cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let G_=1234567;const ko=Math.PI/180,Zo=180/Math.PI;function Hs(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Cn[s&255]+Cn[s>>8&255]+Cn[s>>16&255]+Cn[s>>24&255]+"-"+Cn[t&255]+Cn[t>>8&255]+"-"+Cn[t>>16&15|64]+Cn[t>>24&255]+"-"+Cn[i&63|128]+Cn[i>>8&255]+"-"+Cn[i>>16&255]+Cn[i>>24&255]+Cn[r&255]+Cn[r>>8&255]+Cn[r>>16&255]+Cn[r>>24&255]).toLowerCase()}function me(s,t,i){return Math.max(t,Math.min(i,s))}function zd(s,t){return(s%t+t)%t}function vy(s,t,i,r,l){return r+(s-t)*(l-r)/(i-t)}function Sy(s,t,i){return s!==t?(i-s)/(t-s):0}function Xo(s,t,i){return(1-i)*s+i*t}function xy(s,t,i,r){return Xo(s,t,1-Math.exp(-i*r))}function yy(s,t=1){return t-Math.abs(zd(s,t*2)-t)}function My(s,t,i){return s<=t?0:s>=i?1:(s=(s-t)/(i-t),s*s*(3-2*s))}function Ey(s,t,i){return s<=t?0:s>=i?1:(s=(s-t)/(i-t),s*s*s*(s*(s*6-15)+10))}function by(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Ty(s,t){return s+Math.random()*(t-s)}function Ay(s){return s*(.5-Math.random())}function Ry(s){s!==void 0&&(G_=s);let t=G_+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Cy(s){return s*ko}function Dy(s){return s*Zo}function wy(s){return(s&s-1)===0&&s!==0}function Uy(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ly(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ny(s,t,i,r,l){const u=Math.cos,h=Math.sin,d=u(i/2),m=h(i/2),p=u((t+r)/2),S=h((t+r)/2),_=u((t-r)/2),x=h((t-r)/2),M=u((r-t)/2),A=h((r-t)/2);switch(l){case"XYX":s.set(d*S,m*_,m*x,d*p);break;case"YZY":s.set(m*x,d*S,m*_,d*p);break;case"ZXZ":s.set(m*_,m*x,d*S,d*p);break;case"XZX":s.set(d*S,m*A,m*M,d*p);break;case"YXY":s.set(m*M,d*S,m*A,d*p);break;case"ZYZ":s.set(m*A,m*M,d*S,d*p);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function Rs(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Nn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Cs={DEG2RAD:ko,RAD2DEG:Zo,generateUUID:Hs,clamp:me,euclideanModulo:zd,mapLinear:vy,inverseLerp:Sy,lerp:Xo,damp:xy,pingpong:yy,smoothstep:My,smootherstep:Ey,randInt:by,randFloat:Ty,randFloatSpread:Ay,seededRandom:Ry,degToRad:Cy,radToDeg:Dy,isPowerOfTwo:wy,ceilPowerOfTwo:Uy,floorPowerOfTwo:Ly,setQuaternionFromProperEuler:Ny,normalize:Nn,denormalize:Rs};class he{constructor(t=0,i=0){he.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,r=this.y,l=t.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(me(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(me(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y;return i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const r=Math.cos(i),l=Math.sin(i),u=this.x-t.x,h=this.y-t.y;return this.x=u*r-h*l+t.x,this.y=u*l+h*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ar{constructor(t=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=r,this._w=l}static slerpFlat(t,i,r,l,u,h,d){let m=r[l+0],p=r[l+1],S=r[l+2],_=r[l+3];const x=u[h+0],M=u[h+1],A=u[h+2],R=u[h+3];if(d===0){t[i+0]=m,t[i+1]=p,t[i+2]=S,t[i+3]=_;return}if(d===1){t[i+0]=x,t[i+1]=M,t[i+2]=A,t[i+3]=R;return}if(_!==R||m!==x||p!==M||S!==A){let y=1-d;const v=m*x+p*M+S*A+_*R,I=v>=0?1:-1,N=1-v*v;if(N>Number.EPSILON){const H=Math.sqrt(N),F=Math.atan2(H,v*I);y=Math.sin(y*F)/H,d=Math.sin(d*F)/H}const w=d*I;if(m=m*y+x*w,p=p*y+M*w,S=S*y+A*w,_=_*y+R*w,y===1-d){const H=1/Math.sqrt(m*m+p*p+S*S+_*_);m*=H,p*=H,S*=H,_*=H}}t[i]=m,t[i+1]=p,t[i+2]=S,t[i+3]=_}static multiplyQuaternionsFlat(t,i,r,l,u,h){const d=r[l],m=r[l+1],p=r[l+2],S=r[l+3],_=u[h],x=u[h+1],M=u[h+2],A=u[h+3];return t[i]=d*A+S*_+m*M-p*x,t[i+1]=m*A+S*x+p*_-d*M,t[i+2]=p*A+S*M+d*x-m*_,t[i+3]=S*A-d*_-m*x-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,r,l){return this._x=t,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const r=t._x,l=t._y,u=t._z,h=t._order,d=Math.cos,m=Math.sin,p=d(r/2),S=d(l/2),_=d(u/2),x=m(r/2),M=m(l/2),A=m(u/2);switch(h){case"XYZ":this._x=x*S*_+p*M*A,this._y=p*M*_-x*S*A,this._z=p*S*A+x*M*_,this._w=p*S*_-x*M*A;break;case"YXZ":this._x=x*S*_+p*M*A,this._y=p*M*_-x*S*A,this._z=p*S*A-x*M*_,this._w=p*S*_+x*M*A;break;case"ZXY":this._x=x*S*_-p*M*A,this._y=p*M*_+x*S*A,this._z=p*S*A+x*M*_,this._w=p*S*_-x*M*A;break;case"ZYX":this._x=x*S*_-p*M*A,this._y=p*M*_+x*S*A,this._z=p*S*A-x*M*_,this._w=p*S*_+x*M*A;break;case"YZX":this._x=x*S*_+p*M*A,this._y=p*M*_+x*S*A,this._z=p*S*A-x*M*_,this._w=p*S*_-x*M*A;break;case"XZY":this._x=x*S*_-p*M*A,this._y=p*M*_-x*S*A,this._z=p*S*A+x*M*_,this._w=p*S*_+x*M*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const r=i/2,l=Math.sin(r);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,r=i[0],l=i[4],u=i[8],h=i[1],d=i[5],m=i[9],p=i[2],S=i[6],_=i[10],x=r+d+_;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(S-m)*M,this._y=(u-p)*M,this._z=(h-l)*M}else if(r>d&&r>_){const M=2*Math.sqrt(1+r-d-_);this._w=(S-m)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(u+p)/M}else if(d>_){const M=2*Math.sqrt(1+d-r-_);this._w=(u-p)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(m+S)/M}else{const M=2*Math.sqrt(1+_-r-d);this._w=(h-l)/M,this._x=(u+p)/M,this._y=(m+S)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let r=t.dot(i)+1;return r<1e-8?(r=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=r):(this._x=0,this._y=-t.z,this._z=t.y,this._w=r)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=r),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(me(this.dot(t),-1,1)))}rotateTowards(t,i){const r=this.angleTo(t);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const r=t._x,l=t._y,u=t._z,h=t._w,d=i._x,m=i._y,p=i._z,S=i._w;return this._x=r*S+h*d+l*p-u*m,this._y=l*S+h*m+u*d-r*p,this._z=u*S+h*p+r*m-l*d,this._w=h*S-r*d-l*m-u*p,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const r=this._x,l=this._y,u=this._z,h=this._w;let d=h*t._w+r*t._x+l*t._y+u*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=h,this._x=r,this._y=l,this._z=u,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*r+i*this._x,this._y=M*l+i*this._y,this._z=M*u+i*this._z,this.normalize(),this}const p=Math.sqrt(m),S=Math.atan2(p,d),_=Math.sin((1-i)*S)/p,x=Math.sin(i*S)/p;return this._w=h*_+this._w*x,this._x=r*_+this._x*x,this._y=l*_+this._y*x,this._z=u*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,i,r){return this.copy(t).slerp(i,r)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),u=Math.sqrt(r);return this.set(l*Math.sin(t),l*Math.cos(t),u*Math.sin(i),u*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ${constructor(t=0,i=0,r=0){$.prototype.isVector3=!0,this.x=t,this.y=i,this.z=r}set(t,i,r){return r===void 0&&(r=this.z),this.x=t,this.y=i,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(V_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(V_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,r=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[3]*r+u[6]*l,this.y=u[1]*i+u[4]*r+u[7]*l,this.z=u[2]*i+u[5]*r+u[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,u=t.elements,h=1/(u[3]*i+u[7]*r+u[11]*l+u[15]);return this.x=(u[0]*i+u[4]*r+u[8]*l+u[12])*h,this.y=(u[1]*i+u[5]*r+u[9]*l+u[13])*h,this.z=(u[2]*i+u[6]*r+u[10]*l+u[14])*h,this}applyQuaternion(t){const i=this.x,r=this.y,l=this.z,u=t.x,h=t.y,d=t.z,m=t.w,p=2*(h*l-d*r),S=2*(d*i-u*l),_=2*(u*r-h*i);return this.x=i+m*p+h*_-d*S,this.y=r+m*S+d*p-u*_,this.z=l+m*_+u*S-h*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,r=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[4]*r+u[8]*l,this.y=u[1]*i+u[5]*r+u[9]*l,this.z=u[2]*i+u[6]*r+u[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this.z=me(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this.z=me(this.z,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(me(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const r=t.x,l=t.y,u=t.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-u*d,this.y=u*h-r*m,this.z=r*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const r=t.dot(this)/i;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return lh.copy(this).projectOnVector(t),this.sub(lh)}reflect(t){return this.sub(lh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(me(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y,l=this.z-t.z;return i*i+r*r+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,r){const l=Math.sin(i)*t;return this.x=l*Math.sin(r),this.y=Math.cos(i)*t,this.z=l*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,r){return this.x=t*Math.sin(i),this.y=r,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(t),this.y=i,this.z=r*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lh=new $,V_=new Ar;class ue{constructor(t,i,r,l,u,h,d,m,p){ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,r,l,u,h,d,m,p)}set(t,i,r,l,u,h,d,m,p){const S=this.elements;return S[0]=t,S[1]=l,S[2]=d,S[3]=i,S[4]=u,S[5]=m,S[6]=r,S[7]=h,S[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(t,i,r){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,u=this.elements,h=r[0],d=r[3],m=r[6],p=r[1],S=r[4],_=r[7],x=r[2],M=r[5],A=r[8],R=l[0],y=l[3],v=l[6],I=l[1],N=l[4],w=l[7],H=l[2],F=l[5],P=l[8];return u[0]=h*R+d*I+m*H,u[3]=h*y+d*N+m*F,u[6]=h*v+d*w+m*P,u[1]=p*R+S*I+_*H,u[4]=p*y+S*N+_*F,u[7]=p*v+S*w+_*P,u[2]=x*R+M*I+A*H,u[5]=x*y+M*N+A*F,u[8]=x*v+M*w+A*P,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],S=t[8];return i*h*S-i*d*p-r*u*S+r*d*m+l*u*p-l*h*m}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],S=t[8],_=S*h-d*p,x=d*m-S*u,M=p*u-h*m,A=i*_+r*x+l*M;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=_*R,t[1]=(l*p-S*r)*R,t[2]=(d*r-l*h)*R,t[3]=x*R,t[4]=(S*i-l*m)*R,t[5]=(l*u-d*i)*R,t[6]=M*R,t[7]=(r*m-p*i)*R,t[8]=(h*i-r*u)*R,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,r,l,u,h,d){const m=Math.cos(u),p=Math.sin(u);return this.set(r*m,r*p,-r*(m*h+p*d)+h+t,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(ch.makeScale(t,i)),this}rotate(t){return this.premultiply(ch.makeRotation(-t)),this}translate(t,i){return this.premultiply(ch.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<9;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ch=new ue;function X0(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Gc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Oy(){const s=Gc("canvas");return s.style.display="block",s}const k_={};function Ko(s){s in k_||(k_[s]=!0,console.warn(s))}function Py(s,t,i){return new Promise(function(r,l){function u(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:l();break;case s.TIMEOUT_EXPIRED:setTimeout(u,i);break;default:r()}}setTimeout(u,i)})}const X_=new ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),q_=new ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zy(){const s={enabled:!0,workingColorSpace:Tr,spaces:{},convert:function(l,u,h){return this.enabled===!1||u===h||!u||!h||(this.spaces[u].transfer===Ie&&(l.r=ua(l.r),l.g=ua(l.g),l.b=ua(l.b)),this.spaces[u].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[u].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Ie&&(l.r=Ns(l.r),l.g=Ns(l.g),l.b=Ns(l.b))),l},workingToColorSpace:function(l,u){return this.convert(l,this.workingColorSpace,u)},colorSpaceToWorking:function(l,u){return this.convert(l,u,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===ka?Fc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,u=this.workingColorSpace){return l.fromArray(this.spaces[u].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,u,h){return l.copy(this.spaces[u].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,u){return Ko("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(l,u)},toWorkingColorSpace:function(l,u){return Ko("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(l,u)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Tr]:{primaries:t,whitePoint:r,transfer:Fc,toXYZ:X_,fromXYZ:q_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:di},outputColorSpaceConfig:{drawingBufferColorSpace:di}},[di]:{primaries:t,whitePoint:r,transfer:Ie,toXYZ:X_,fromXYZ:q_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:di}}}),s}const Ce=zy();function ua(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ns(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let hs;class By{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let r;if(t instanceof HTMLCanvasElement)r=t;else{hs===void 0&&(hs=Gc("canvas")),hs.width=t.width,hs.height=t.height;const l=hs.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),r=hs}return r.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=Gc("canvas");i.width=t.width,i.height=t.height;const r=i.getContext("2d");r.drawImage(t,0,0,t.width,t.height);const l=r.getImageData(0,0,t.width,t.height),u=l.data;for(let h=0;h<u.length;h++)u[h]=ua(u[h]/255)*255;return r.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(ua(i[r]/255)*255):i[r]=ua(i[r]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Iy=0;class Bd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=Hs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):i instanceof VideoFrame?t.set(i.displayHeight,i.displayWidth,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let u;if(Array.isArray(l)){u=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?u.push(uh(l[h].image)):u.push(uh(l[h]))}else u=uh(l);r.url=u}return i||(t.images[this.uuid]=r),r}}function uh(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?By.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fy=0;const fh=new $;class Xn extends Rr{constructor(t=Xn.DEFAULT_IMAGE,i=Xn.DEFAULT_MAPPING,r=yr,l=yr,u=mi,h=Mr,d=gi,m=Pi,p=Xn.DEFAULT_ANISOTROPY,S=ka){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fy++}),this.uuid=Hs(),this.name="",this.source=new Bd(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=u,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=S,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fh).x}get height(){return this.source.getSize(fh).y}get depth(){return this.source.getSize(fh).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const r=t[i];if(r===void 0){console.warn(`THREE.Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==O0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case jh:t.x=t.x-Math.floor(t.x);break;case yr:t.x=t.x<0?0:1;break;case Zh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case jh:t.y=t.y-Math.floor(t.y);break;case yr:t.y=t.y<0?0:1;break;case Zh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xn.DEFAULT_IMAGE=null;Xn.DEFAULT_MAPPING=O0;Xn.DEFAULT_ANISOTROPY=1;class nn{constructor(t=0,i=0,r=0,l=1){nn.prototype.isVector4=!0,this.x=t,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,r,l){return this.x=t,this.y=i,this.z=r,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,u=this.w,h=t.elements;return this.x=h[0]*i+h[4]*r+h[8]*l+h[12]*u,this.y=h[1]*i+h[5]*r+h[9]*l+h[13]*u,this.z=h[2]*i+h[6]*r+h[10]*l+h[14]*u,this.w=h[3]*i+h[7]*r+h[11]*l+h[15]*u,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,r,l,u;const m=t.elements,p=m[0],S=m[4],_=m[8],x=m[1],M=m[5],A=m[9],R=m[2],y=m[6],v=m[10];if(Math.abs(S-x)<.01&&Math.abs(_-R)<.01&&Math.abs(A-y)<.01){if(Math.abs(S+x)<.1&&Math.abs(_+R)<.1&&Math.abs(A+y)<.1&&Math.abs(p+M+v-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const N=(p+1)/2,w=(M+1)/2,H=(v+1)/2,F=(S+x)/4,P=(_+R)/4,Z=(A+y)/4;return N>w&&N>H?N<.01?(r=0,l=.707106781,u=.707106781):(r=Math.sqrt(N),l=F/r,u=P/r):w>H?w<.01?(r=.707106781,l=0,u=.707106781):(l=Math.sqrt(w),r=F/l,u=Z/l):H<.01?(r=.707106781,l=.707106781,u=0):(u=Math.sqrt(H),r=P/u,l=Z/u),this.set(r,l,u,i),this}let I=Math.sqrt((y-A)*(y-A)+(_-R)*(_-R)+(x-S)*(x-S));return Math.abs(I)<.001&&(I=1),this.x=(y-A)/I,this.y=(_-R)/I,this.z=(x-S)/I,this.w=Math.acos((p+M+v-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=me(this.x,t.x,i.x),this.y=me(this.y,t.y,i.y),this.z=me(this.z,t.z,i.z),this.w=me(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=me(this.x,t,i),this.y=me(this.y,t,i),this.z=me(this.z,t,i),this.w=me(this.w,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(me(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this.w=t.w+(i.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hy extends Rr{constructor(t=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=r.depth,this.scissor=new nn(0,0,t,i),this.scissorTest=!1,this.viewport=new nn(0,0,t,i);const l={width:t,height:i,depth:r.depth},u=new Xn(l);this.textures=[];const h=r.count;for(let d=0;d<h;d++)this.textures[d]=u.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(t={}){const i={minFilter:mi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,r=1){if(this.width!==t||this.height!==i||this.depth!==r){this.width=t,this.height=i,this.depth=r;for(let l=0,u=this.textures.length;l<u;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isArrayTexture=this.textures[l].image.depth>1;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new Bd(l)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wa extends Hy{constructor(t=1,i=1,r={}){super(t,i,r),this.isWebGLRenderTarget=!0}}class q0 extends Xn{constructor(t=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=bi,this.minFilter=bi,this.wrapR=yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gy extends Xn{constructor(t=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=bi,this.minFilter=bi,this.wrapR=yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jo{constructor(t=new $(1/0,1/0,1/0),i=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i+=3)this.expandByPoint(xi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,r=t.count;i<r;i++)this.expandByPoint(xi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const r=xi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(r),this.max.copy(t).add(r),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const r=t.geometry;if(r!==void 0){const u=r.getAttribute("position");if(i===!0&&u!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=u.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,xi):xi.fromBufferAttribute(u,h),xi.applyMatrix4(t.matrixWorld),this.expandByPoint(xi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),hc.copy(t.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),hc.copy(r.boundingBox)),hc.applyMatrix4(t.matrixWorld),this.union(hc)}const l=t.children;for(let u=0,h=l.length;u<h;u++)this.expandByObject(l[u],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xi),xi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,r;return t.normal.x>0?(i=t.normal.x*this.min.x,r=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,r=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,r+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,r+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,r+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,r+=t.normal.z*this.min.z),i<=-t.constant&&r>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Po),dc.subVectors(this.max,Po),ds.subVectors(t.a,Po),ps.subVectors(t.b,Po),ms.subVectors(t.c,Po),za.subVectors(ps,ds),Ba.subVectors(ms,ps),hr.subVectors(ds,ms);let i=[0,-za.z,za.y,0,-Ba.z,Ba.y,0,-hr.z,hr.y,za.z,0,-za.x,Ba.z,0,-Ba.x,hr.z,0,-hr.x,-za.y,za.x,0,-Ba.y,Ba.x,0,-hr.y,hr.x,0];return!hh(i,ds,ps,ms,dc)||(i=[1,0,0,0,1,0,0,0,1],!hh(i,ds,ps,ms,dc))?!1:(pc.crossVectors(za,Ba),i=[pc.x,pc.y,pc.z],hh(i,ds,ps,ms,dc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ta[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ta[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ta[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ta[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ta[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ta[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ta[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ta[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ta),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const ta=[new $,new $,new $,new $,new $,new $,new $,new $],xi=new $,hc=new Jo,ds=new $,ps=new $,ms=new $,za=new $,Ba=new $,hr=new $,Po=new $,dc=new $,pc=new $,dr=new $;function hh(s,t,i,r,l){for(let u=0,h=s.length-3;u<=h;u+=3){dr.fromArray(s,u);const d=l.x*Math.abs(dr.x)+l.y*Math.abs(dr.y)+l.z*Math.abs(dr.z),m=t.dot(dr),p=i.dot(dr),S=r.dot(dr);if(Math.max(-Math.max(m,p,S),Math.min(m,p,S))>d)return!1}return!0}const Vy=new Jo,zo=new $,dh=new $;class Id{constructor(t=new $,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const r=this.center;i!==void 0?r.copy(i):Vy.setFromPoints(t).getCenter(r);let l=0;for(let u=0,h=t.length;u<h;u++)l=Math.max(l,r.distanceToSquared(t[u]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const r=this.center.distanceToSquared(t);return i.copy(t),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zo.subVectors(t,this.center);const i=zo.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(zo,l/r),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(dh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zo.copy(t.center).add(dh)),this.expandByPoint(zo.copy(t.center).sub(dh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const ea=new $,ph=new $,mc=new $,Ia=new $,mh=new $,gc=new $,gh=new $;class W0{constructor(t=new $,i=new $(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ea)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=ea.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(ea.copy(this.origin).addScaledVector(this.direction,i),ea.distanceToSquared(t))}distanceSqToSegment(t,i,r,l){ph.copy(t).add(i).multiplyScalar(.5),mc.copy(i).sub(t).normalize(),Ia.copy(this.origin).sub(ph);const u=t.distanceTo(i)*.5,h=-this.direction.dot(mc),d=Ia.dot(this.direction),m=-Ia.dot(mc),p=Ia.lengthSq(),S=Math.abs(1-h*h);let _,x,M,A;if(S>0)if(_=h*m-d,x=h*d-m,A=u*S,_>=0)if(x>=-A)if(x<=A){const R=1/S;_*=R,x*=R,M=_*(_+h*x+2*d)+x*(h*_+x+2*m)+p}else x=u,_=Math.max(0,-(h*x+d)),M=-_*_+x*(x+2*m)+p;else x=-u,_=Math.max(0,-(h*x+d)),M=-_*_+x*(x+2*m)+p;else x<=-A?(_=Math.max(0,-(-h*u+d)),x=_>0?-u:Math.min(Math.max(-u,-m),u),M=-_*_+x*(x+2*m)+p):x<=A?(_=0,x=Math.min(Math.max(-u,-m),u),M=x*(x+2*m)+p):(_=Math.max(0,-(h*u+d)),x=_>0?u:Math.min(Math.max(-u,-m),u),M=-_*_+x*(x+2*m)+p);else x=h>0?-u:u,_=Math.max(0,-(h*x+d)),M=-_*_+x*(x+2*m)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(ph).addScaledVector(mc,x),M}intersectSphere(t,i){ea.subVectors(t.center,this.origin);const r=ea.dot(this.direction),l=ea.dot(ea)-r*r,u=t.radius*t.radius;if(l>u)return null;const h=Math.sqrt(u-l),d=r-h,m=r+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(t.normal)+t.constant)/i;return r>=0?r:null}intersectPlane(t,i){const r=this.distanceToPlane(t);return r===null?null:this.at(r,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let r,l,u,h,d,m;const p=1/this.direction.x,S=1/this.direction.y,_=1/this.direction.z,x=this.origin;return p>=0?(r=(t.min.x-x.x)*p,l=(t.max.x-x.x)*p):(r=(t.max.x-x.x)*p,l=(t.min.x-x.x)*p),S>=0?(u=(t.min.y-x.y)*S,h=(t.max.y-x.y)*S):(u=(t.max.y-x.y)*S,h=(t.min.y-x.y)*S),r>h||u>l||((u>r||isNaN(r))&&(r=u),(h<l||isNaN(l))&&(l=h),_>=0?(d=(t.min.z-x.z)*_,m=(t.max.z-x.z)*_):(d=(t.max.z-x.z)*_,m=(t.min.z-x.z)*_),r>m||d>l)||((d>r||r!==r)&&(r=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(t){return this.intersectBox(t,ea)!==null}intersectTriangle(t,i,r,l,u){mh.subVectors(i,t),gc.subVectors(r,t),gh.crossVectors(mh,gc);let h=this.direction.dot(gh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Ia.subVectors(this.origin,t);const m=d*this.direction.dot(gc.crossVectors(Ia,gc));if(m<0)return null;const p=d*this.direction.dot(mh.cross(Ia));if(p<0||m+p>h)return null;const S=-d*Ia.dot(gh);return S<0?null:this.at(S/h,u)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pn{constructor(t,i,r,l,u,h,d,m,p,S,_,x,M,A,R,y){pn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,r,l,u,h,d,m,p,S,_,x,M,A,R,y)}set(t,i,r,l,u,h,d,m,p,S,_,x,M,A,R,y){const v=this.elements;return v[0]=t,v[4]=i,v[8]=r,v[12]=l,v[1]=u,v[5]=h,v[9]=d,v[13]=m,v[2]=p,v[6]=S,v[10]=_,v[14]=x,v[3]=M,v[7]=A,v[11]=R,v[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pn().fromArray(this.elements)}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(t){const i=this.elements,r=t.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,r){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(t,i,r){return this.set(t.x,i.x,r.x,0,t.y,i.y,r.y,0,t.z,i.z,r.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,r=t.elements,l=1/gs.setFromMatrixColumn(t,0).length(),u=1/gs.setFromMatrixColumn(t,1).length(),h=1/gs.setFromMatrixColumn(t,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*u,i[5]=r[5]*u,i[6]=r[6]*u,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,r=t.x,l=t.y,u=t.z,h=Math.cos(r),d=Math.sin(r),m=Math.cos(l),p=Math.sin(l),S=Math.cos(u),_=Math.sin(u);if(t.order==="XYZ"){const x=h*S,M=h*_,A=d*S,R=d*_;i[0]=m*S,i[4]=-m*_,i[8]=p,i[1]=M+A*p,i[5]=x-R*p,i[9]=-d*m,i[2]=R-x*p,i[6]=A+M*p,i[10]=h*m}else if(t.order==="YXZ"){const x=m*S,M=m*_,A=p*S,R=p*_;i[0]=x+R*d,i[4]=A*d-M,i[8]=h*p,i[1]=h*_,i[5]=h*S,i[9]=-d,i[2]=M*d-A,i[6]=R+x*d,i[10]=h*m}else if(t.order==="ZXY"){const x=m*S,M=m*_,A=p*S,R=p*_;i[0]=x-R*d,i[4]=-h*_,i[8]=A+M*d,i[1]=M+A*d,i[5]=h*S,i[9]=R-x*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(t.order==="ZYX"){const x=h*S,M=h*_,A=d*S,R=d*_;i[0]=m*S,i[4]=A*p-M,i[8]=x*p+R,i[1]=m*_,i[5]=R*p+x,i[9]=M*p-A,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(t.order==="YZX"){const x=h*m,M=h*p,A=d*m,R=d*p;i[0]=m*S,i[4]=R-x*_,i[8]=A*_+M,i[1]=_,i[5]=h*S,i[9]=-d*S,i[2]=-p*S,i[6]=M*_+A,i[10]=x-R*_}else if(t.order==="XZY"){const x=h*m,M=h*p,A=d*m,R=d*p;i[0]=m*S,i[4]=-_,i[8]=p*S,i[1]=x*_+R,i[5]=h*S,i[9]=M*_-A,i[2]=A*_-M,i[6]=d*S,i[10]=R*_+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ky,t,Xy)}lookAt(t,i,r){const l=this.elements;return $n.subVectors(t,i),$n.lengthSq()===0&&($n.z=1),$n.normalize(),Fa.crossVectors(r,$n),Fa.lengthSq()===0&&(Math.abs(r.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),Fa.crossVectors(r,$n)),Fa.normalize(),_c.crossVectors($n,Fa),l[0]=Fa.x,l[4]=_c.x,l[8]=$n.x,l[1]=Fa.y,l[5]=_c.y,l[9]=$n.y,l[2]=Fa.z,l[6]=_c.z,l[10]=$n.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,u=this.elements,h=r[0],d=r[4],m=r[8],p=r[12],S=r[1],_=r[5],x=r[9],M=r[13],A=r[2],R=r[6],y=r[10],v=r[14],I=r[3],N=r[7],w=r[11],H=r[15],F=l[0],P=l[4],Z=l[8],C=l[12],D=l[1],V=l[5],it=l[9],ct=l[13],gt=l[2],ft=l[6],O=l[10],j=l[14],Y=l[3],vt=l[7],Et=l[11],L=l[15];return u[0]=h*F+d*D+m*gt+p*Y,u[4]=h*P+d*V+m*ft+p*vt,u[8]=h*Z+d*it+m*O+p*Et,u[12]=h*C+d*ct+m*j+p*L,u[1]=S*F+_*D+x*gt+M*Y,u[5]=S*P+_*V+x*ft+M*vt,u[9]=S*Z+_*it+x*O+M*Et,u[13]=S*C+_*ct+x*j+M*L,u[2]=A*F+R*D+y*gt+v*Y,u[6]=A*P+R*V+y*ft+v*vt,u[10]=A*Z+R*it+y*O+v*Et,u[14]=A*C+R*ct+y*j+v*L,u[3]=I*F+N*D+w*gt+H*Y,u[7]=I*P+N*V+w*ft+H*vt,u[11]=I*Z+N*it+w*O+H*Et,u[15]=I*C+N*ct+w*j+H*L,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[4],l=t[8],u=t[12],h=t[1],d=t[5],m=t[9],p=t[13],S=t[2],_=t[6],x=t[10],M=t[14],A=t[3],R=t[7],y=t[11],v=t[15];return A*(+u*m*_-l*p*_-u*d*x+r*p*x+l*d*M-r*m*M)+R*(+i*m*M-i*p*x+u*h*x-l*h*M+l*p*S-u*m*S)+y*(+i*p*_-i*d*M-u*h*_+r*h*M+u*d*S-r*p*S)+v*(-l*d*S-i*m*_+i*d*x+l*h*_-r*h*x+r*m*S)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,r){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=r),this}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],S=t[8],_=t[9],x=t[10],M=t[11],A=t[12],R=t[13],y=t[14],v=t[15],I=_*y*p-R*x*p+R*m*M-d*y*M-_*m*v+d*x*v,N=A*x*p-S*y*p-A*m*M+h*y*M+S*m*v-h*x*v,w=S*R*p-A*_*p+A*d*M-h*R*M-S*d*v+h*_*v,H=A*_*m-S*R*m-A*d*x+h*R*x+S*d*y-h*_*y,F=i*I+r*N+l*w+u*H;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/F;return t[0]=I*P,t[1]=(R*x*u-_*y*u-R*l*M+r*y*M+_*l*v-r*x*v)*P,t[2]=(d*y*u-R*m*u+R*l*p-r*y*p-d*l*v+r*m*v)*P,t[3]=(_*m*u-d*x*u-_*l*p+r*x*p+d*l*M-r*m*M)*P,t[4]=N*P,t[5]=(S*y*u-A*x*u+A*l*M-i*y*M-S*l*v+i*x*v)*P,t[6]=(A*m*u-h*y*u-A*l*p+i*y*p+h*l*v-i*m*v)*P,t[7]=(h*x*u-S*m*u+S*l*p-i*x*p-h*l*M+i*m*M)*P,t[8]=w*P,t[9]=(A*_*u-S*R*u-A*r*M+i*R*M+S*r*v-i*_*v)*P,t[10]=(h*R*u-A*d*u+A*r*p-i*R*p-h*r*v+i*d*v)*P,t[11]=(S*d*u-h*_*u-S*r*p+i*_*p+h*r*M-i*d*M)*P,t[12]=H*P,t[13]=(S*R*l-A*_*l+A*r*x-i*R*x-S*r*y+i*_*y)*P,t[14]=(A*d*l-h*R*l-A*r*m+i*R*m+h*r*y-i*d*y)*P,t[15]=(h*_*l-S*d*l+S*r*m-i*_*m-h*r*x+i*d*x)*P,this}scale(t){const i=this.elements,r=t.x,l=t.y,u=t.z;return i[0]*=r,i[4]*=l,i[8]*=u,i[1]*=r,i[5]*=l,i[9]*=u,i[2]*=r,i[6]*=l,i[10]*=u,i[3]*=r,i[7]*=l,i[11]*=u,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(t,i,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const r=Math.cos(i),l=Math.sin(i),u=1-r,h=t.x,d=t.y,m=t.z,p=u*h,S=u*d;return this.set(p*h+r,p*d-l*m,p*m+l*d,0,p*d+l*m,S*d+r,S*m-l*h,0,p*m-l*d,S*m+l*h,u*m*m+r,0,0,0,0,1),this}makeScale(t,i,r){return this.set(t,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,i,r,l,u,h){return this.set(1,r,u,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,r){const l=this.elements,u=i._x,h=i._y,d=i._z,m=i._w,p=u+u,S=h+h,_=d+d,x=u*p,M=u*S,A=u*_,R=h*S,y=h*_,v=d*_,I=m*p,N=m*S,w=m*_,H=r.x,F=r.y,P=r.z;return l[0]=(1-(R+v))*H,l[1]=(M+w)*H,l[2]=(A-N)*H,l[3]=0,l[4]=(M-w)*F,l[5]=(1-(x+v))*F,l[6]=(y+I)*F,l[7]=0,l[8]=(A+N)*P,l[9]=(y-I)*P,l[10]=(1-(x+R))*P,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,r){const l=this.elements;let u=gs.set(l[0],l[1],l[2]).length();const h=gs.set(l[4],l[5],l[6]).length(),d=gs.set(l[8],l[9],l[10]).length();this.determinant()<0&&(u=-u),t.x=l[12],t.y=l[13],t.z=l[14],yi.copy(this);const p=1/u,S=1/h,_=1/d;return yi.elements[0]*=p,yi.elements[1]*=p,yi.elements[2]*=p,yi.elements[4]*=S,yi.elements[5]*=S,yi.elements[6]*=S,yi.elements[8]*=_,yi.elements[9]*=_,yi.elements[10]*=_,i.setFromRotationMatrix(yi),r.x=u,r.y=h,r.z=d,this}makePerspective(t,i,r,l,u,h,d=Li,m=!1){const p=this.elements,S=2*u/(i-t),_=2*u/(r-l),x=(i+t)/(i-t),M=(r+l)/(r-l);let A,R;if(m)A=u/(h-u),R=h*u/(h-u);else if(d===Li)A=-(h+u)/(h-u),R=-2*h*u/(h-u);else if(d===Hc)A=-h/(h-u),R=-h*u/(h-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=S,p[4]=0,p[8]=x,p[12]=0,p[1]=0,p[5]=_,p[9]=M,p[13]=0,p[2]=0,p[6]=0,p[10]=A,p[14]=R,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,i,r,l,u,h,d=Li,m=!1){const p=this.elements,S=2/(i-t),_=2/(r-l),x=-(i+t)/(i-t),M=-(r+l)/(r-l);let A,R;if(m)A=1/(h-u),R=h/(h-u);else if(d===Li)A=-2/(h-u),R=-(h+u)/(h-u);else if(d===Hc)A=-1/(h-u),R=-u/(h-u);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=S,p[4]=0,p[8]=0,p[12]=x,p[1]=0,p[5]=_,p[9]=0,p[13]=M,p[2]=0,p[6]=0,p[10]=A,p[14]=R,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<16;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t[i+9]=r[9],t[i+10]=r[10],t[i+11]=r[11],t[i+12]=r[12],t[i+13]=r[13],t[i+14]=r[14],t[i+15]=r[15],t}}const gs=new $,yi=new pn,ky=new $(0,0,0),Xy=new $(1,1,1),Fa=new $,_c=new $,$n=new $,W_=new pn,Y_=new Ar;class fa{constructor(t=0,i=0,r=0,l=fa.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,l=this._order){return this._x=t,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){const l=t.elements,u=l[0],h=l[4],d=l[8],m=l[1],p=l[5],S=l[9],_=l[2],x=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-S,M),this._z=Math.atan2(-h,u)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-me(S,-1,1)),Math.abs(S)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,u),this._z=0);break;case"ZXY":this._x=Math.asin(me(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,u));break;case"ZYX":this._y=Math.asin(-me(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(m,u)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(me(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-S,p),this._y=Math.atan2(-_,u)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-me(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(d,u)):(this._x=Math.atan2(-S,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return W_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(W_,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Y_.setFromEuler(this),this.setFromQuaternion(Y_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fa.DEFAULT_ORDER="XYZ";class Y0{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let qy=0;const j_=new $,_s=new Ar,na=new pn,vc=new $,Bo=new $,Wy=new $,Yy=new Ar,Z_=new $(1,0,0),K_=new $(0,1,0),Q_=new $(0,0,1),J_={type:"added"},jy={type:"removed"},vs={type:"childadded",child:null},_h={type:"childremoved",child:null};class ni extends Rr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qy++}),this.uuid=Hs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ni.DEFAULT_UP.clone();const t=new $,i=new fa,r=new Ar,l=new $(1,1,1);function u(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(u),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new pn},normalMatrix:{value:new ue}}),this.matrix=new pn,this.matrixWorld=new pn,this.matrixAutoUpdate=ni.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ni.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Y0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return _s.setFromAxisAngle(t,i),this.quaternion.multiply(_s),this}rotateOnWorldAxis(t,i){return _s.setFromAxisAngle(t,i),this.quaternion.premultiply(_s),this}rotateX(t){return this.rotateOnAxis(Z_,t)}rotateY(t){return this.rotateOnAxis(K_,t)}rotateZ(t){return this.rotateOnAxis(Q_,t)}translateOnAxis(t,i){return j_.copy(t).applyQuaternion(this.quaternion),this.position.add(j_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Z_,t)}translateY(t){return this.translateOnAxis(K_,t)}translateZ(t){return this.translateOnAxis(Q_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(na.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?vc.copy(t):vc.set(t,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),Bo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?na.lookAt(Bo,vc,this.up):na.lookAt(vc,Bo,this.up),this.quaternion.setFromRotationMatrix(na),l&&(na.extractRotation(l.matrixWorld),_s.setFromRotationMatrix(na),this.quaternion.premultiply(_s.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(J_),vs.child=t,this.dispatchEvent(vs),vs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(jy),_h.child=t,this.dispatchEvent(_h),_h.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),na.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),na.multiply(t.parent.matrixWorld)),t.applyMatrix4(na),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(J_),vs.child=t,this.dispatchEvent(vs),vs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const h=this.children[r].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,t,Wy),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,Yy,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){const r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function u(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=u(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,S=m.length;p<S;p++){const _=m[p];u(t.shapes,_)}else u(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(u(t.materials,this.material[m]));l.material=d}else l.material=u(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(u(t.animations,m))}}if(i){const d=h(t.geometries),m=h(t.materials),p=h(t.textures),S=h(t.images),_=h(t.shapes),x=h(t.skeletons),M=h(t.animations),A=h(t.nodes);d.length>0&&(r.geometries=d),m.length>0&&(r.materials=m),p.length>0&&(r.textures=p),S.length>0&&(r.images=S),_.length>0&&(r.shapes=_),x.length>0&&(r.skeletons=x),M.length>0&&(r.animations=M),A.length>0&&(r.nodes=A)}return r.object=l,r;function h(d){const m=[];for(const p in d){const S=d[p];delete S.metadata,m.push(S)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){const l=t.children[r];this.add(l.clone())}return this}}ni.DEFAULT_UP=new $(0,1,0);ni.DEFAULT_MATRIX_AUTO_UPDATE=!0;ni.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mi=new $,ia=new $,vh=new $,aa=new $,Ss=new $,xs=new $,$_=new $,Sh=new $,xh=new $,yh=new $,Mh=new nn,Eh=new nn,bh=new nn;class Ei{constructor(t=new $,i=new $,r=new $){this.a=t,this.b=i,this.c=r}static getNormal(t,i,r,l){l.subVectors(r,i),Mi.subVectors(t,i),l.cross(Mi);const u=l.lengthSq();return u>0?l.multiplyScalar(1/Math.sqrt(u)):l.set(0,0,0)}static getBarycoord(t,i,r,l,u){Mi.subVectors(l,i),ia.subVectors(r,i),vh.subVectors(t,i);const h=Mi.dot(Mi),d=Mi.dot(ia),m=Mi.dot(vh),p=ia.dot(ia),S=ia.dot(vh),_=h*p-d*d;if(_===0)return u.set(0,0,0),null;const x=1/_,M=(p*m-d*S)*x,A=(h*S-d*m)*x;return u.set(1-M-A,A,M)}static containsPoint(t,i,r,l){return this.getBarycoord(t,i,r,l,aa)===null?!1:aa.x>=0&&aa.y>=0&&aa.x+aa.y<=1}static getInterpolation(t,i,r,l,u,h,d,m){return this.getBarycoord(t,i,r,l,aa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(u,aa.x),m.addScaledVector(h,aa.y),m.addScaledVector(d,aa.z),m)}static getInterpolatedAttribute(t,i,r,l,u,h){return Mh.setScalar(0),Eh.setScalar(0),bh.setScalar(0),Mh.fromBufferAttribute(t,i),Eh.fromBufferAttribute(t,r),bh.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(Mh,u.x),h.addScaledVector(Eh,u.y),h.addScaledVector(bh,u.z),h}static isFrontFacing(t,i,r,l){return Mi.subVectors(r,i),ia.subVectors(t,i),Mi.cross(ia).dot(l)<0}set(t,i,r){return this.a.copy(t),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(t,i,r,l){return this.a.copy(t[i]),this.b.copy(t[r]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,r,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mi.subVectors(this.c,this.b),ia.subVectors(this.a,this.b),Mi.cross(ia).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ei.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Ei.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,r,l,u){return Ei.getInterpolation(t,this.a,this.b,this.c,i,r,l,u)}containsPoint(t){return Ei.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ei.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const r=this.a,l=this.b,u=this.c;let h,d;Ss.subVectors(l,r),xs.subVectors(u,r),Sh.subVectors(t,r);const m=Ss.dot(Sh),p=xs.dot(Sh);if(m<=0&&p<=0)return i.copy(r);xh.subVectors(t,l);const S=Ss.dot(xh),_=xs.dot(xh);if(S>=0&&_<=S)return i.copy(l);const x=m*_-S*p;if(x<=0&&m>=0&&S<=0)return h=m/(m-S),i.copy(r).addScaledVector(Ss,h);yh.subVectors(t,u);const M=Ss.dot(yh),A=xs.dot(yh);if(A>=0&&M<=A)return i.copy(u);const R=M*p-m*A;if(R<=0&&p>=0&&A<=0)return d=p/(p-A),i.copy(r).addScaledVector(xs,d);const y=S*A-M*_;if(y<=0&&_-S>=0&&M-A>=0)return $_.subVectors(u,l),d=(_-S)/(_-S+(M-A)),i.copy(l).addScaledVector($_,d);const v=1/(y+R+x);return h=R*v,d=x*v,i.copy(r).addScaledVector(Ss,h).addScaledVector(xs,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const j0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ha={h:0,s:0,l:0},Sc={h:0,s:0,l:0};function Th(s,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?s+(t-s)*6*i:i<1/2?t:i<2/3?s+(t-s)*6*(2/3-i):s}class He{constructor(t,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,r)}set(t,i,r){if(i===void 0&&r===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,r);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=di){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ce.colorSpaceToWorking(this,i),this}setRGB(t,i,r,l=Ce.workingColorSpace){return this.r=t,this.g=i,this.b=r,Ce.colorSpaceToWorking(this,l),this}setHSL(t,i,r,l=Ce.workingColorSpace){if(t=zd(t,1),i=me(i,0,1),r=me(r,0,1),i===0)this.r=this.g=this.b=r;else{const u=r<=.5?r*(1+i):r+i-r*i,h=2*r-u;this.r=Th(h,u,t+1/3),this.g=Th(h,u,t),this.b=Th(h,u,t-1/3)}return Ce.colorSpaceToWorking(this,l),this}setStyle(t,i=di){function r(u){u!==void 0&&parseFloat(u)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let u;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,i);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,i);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const u=l[1],h=u.length;if(h===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(u,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=di){const r=j0[t.toLowerCase()];return r!==void 0?this.setHex(r,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ua(t.r),this.g=ua(t.g),this.b=ua(t.b),this}copyLinearToSRGB(t){return this.r=Ns(t.r),this.g=Ns(t.g),this.b=Ns(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=di){return Ce.workingToColorSpace(Dn.copy(this),t),Math.round(me(Dn.r*255,0,255))*65536+Math.round(me(Dn.g*255,0,255))*256+Math.round(me(Dn.b*255,0,255))}getHexString(t=di){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Ce.workingColorSpace){Ce.workingToColorSpace(Dn.copy(this),i);const r=Dn.r,l=Dn.g,u=Dn.b,h=Math.max(r,l,u),d=Math.min(r,l,u);let m,p;const S=(d+h)/2;if(d===h)m=0,p=0;else{const _=h-d;switch(p=S<=.5?_/(h+d):_/(2-h-d),h){case r:m=(l-u)/_+(l<u?6:0);break;case l:m=(u-r)/_+2;break;case u:m=(r-l)/_+4;break}m/=6}return t.h=m,t.s=p,t.l=S,t}getRGB(t,i=Ce.workingColorSpace){return Ce.workingToColorSpace(Dn.copy(this),i),t.r=Dn.r,t.g=Dn.g,t.b=Dn.b,t}getStyle(t=di){Ce.workingToColorSpace(Dn.copy(this),t);const i=Dn.r,r=Dn.g,l=Dn.b;return t!==di?`color(${t} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(t,i,r){return this.getHSL(Ha),this.setHSL(Ha.h+t,Ha.s+i,Ha.l+r)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,r){return this.r=t.r+(i.r-t.r)*r,this.g=t.g+(i.g-t.g)*r,this.b=t.b+(i.b-t.b)*r,this}lerpHSL(t,i){this.getHSL(Ha),t.getHSL(Sc);const r=Xo(Ha.h,Sc.h,i),l=Xo(Ha.s,Sc.s,i),u=Xo(Ha.l,Sc.l,i);return this.setHSL(r,l,u),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,r=this.g,l=this.b,u=t.elements;return this.r=u[0]*i+u[3]*r+u[6]*l,this.g=u[1]*i+u[4]*r+u[7]*l,this.b=u[2]*i+u[5]*r+u[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dn=new He;He.NAMES=j0;let Zy=0;class kc extends Rr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zy++}),this.uuid=Hs(),this.name="",this.type="Material",this.blending=Ls,this.side=qa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bh,this.blendDst=Ih,this.blendEquation=Sr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=I_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fs,this.stencilZFail=fs,this.stencilZPass=fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const r=t[i];if(r===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(t).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(t).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(t).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(t).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(t).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(r.blending=this.blending),this.side!==qa&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Bh&&(r.blendSrc=this.blendSrc),this.blendDst!==Ih&&(r.blendDst=this.blendDst),this.blendEquation!==Sr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Os&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==I_&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fs&&(r.stencilFail=this.stencilFail),this.stencilZFail!==fs&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==fs&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(u){const h=[];for(const d in u){const m=u[d];delete m.metadata,h.push(m)}return h}if(i){const u=l(t.textures),h=l(t.images);u.length>0&&(r.textures=u),h.length>0&&(r.images=h)}return r}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let u=0;u!==l;++u)r[u]=i[u].clone()}return this.clippingPlanes=r,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Z0 extends kc{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fa,this.combine=N0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const un=new $,xc=new he;let Ky=0;class Oi{constructor(t,i,r=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ky++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=r,this.usage=F_,this.updateRanges=[],this.gpuType=oa,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,r){t*=this.itemSize,r*=i.itemSize;for(let l=0,u=this.itemSize;l<u;l++)this.array[t+l]=i.array[r+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)xc.fromBufferAttribute(this,i),xc.applyMatrix3(t),this.setXY(i,xc.x,xc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)un.fromBufferAttribute(this,i),un.applyMatrix3(t),this.setXYZ(i,un.x,un.y,un.z);return this}applyMatrix4(t){for(let i=0,r=this.count;i<r;i++)un.fromBufferAttribute(this,i),un.applyMatrix4(t),this.setXYZ(i,un.x,un.y,un.z);return this}applyNormalMatrix(t){for(let i=0,r=this.count;i<r;i++)un.fromBufferAttribute(this,i),un.applyNormalMatrix(t),this.setXYZ(i,un.x,un.y,un.z);return this}transformDirection(t){for(let i=0,r=this.count;i<r;i++)un.fromBufferAttribute(this,i),un.transformDirection(t),this.setXYZ(i,un.x,un.y,un.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let r=this.array[t*this.itemSize+i];return this.normalized&&(r=Rs(r,this.array)),r}setComponent(t,i,r){return this.normalized&&(r=Nn(r,this.array)),this.array[t*this.itemSize+i]=r,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Rs(i,this.array)),i}setX(t,i){return this.normalized&&(i=Nn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Rs(i,this.array)),i}setY(t,i){return this.normalized&&(i=Nn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Rs(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Nn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Rs(i,this.array)),i}setW(t,i){return this.normalized&&(i=Nn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,r){return t*=this.itemSize,this.normalized&&(i=Nn(i,this.array),r=Nn(r,this.array)),this.array[t+0]=i,this.array[t+1]=r,this}setXYZ(t,i,r,l){return t*=this.itemSize,this.normalized&&(i=Nn(i,this.array),r=Nn(r,this.array),l=Nn(l,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this}setXYZW(t,i,r,l,u){return t*=this.itemSize,this.normalized&&(i=Nn(i,this.array),r=Nn(r,this.array),l=Nn(l,this.array),u=Nn(u,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this.array[t+3]=u,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==F_&&(t.usage=this.usage),t}}class K0 extends Oi{constructor(t,i,r){super(new Uint16Array(t),i,r)}}class Q0 extends Oi{constructor(t,i,r){super(new Uint32Array(t),i,r)}}class Er extends Oi{constructor(t,i,r){super(new Float32Array(t),i,r)}}let Qy=0;const hi=new pn,Ah=new ni,ys=new $,ti=new Jo,Io=new Jo,Sn=new $;class Cr extends Rr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qy++}),this.uuid=Hs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(X0(t)?Q0:K0)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,r=0){this.groups.push({start:t,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const u=new ue().getNormalMatrix(t);r.applyNormalMatrix(u),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hi.makeRotationFromQuaternion(t),this.applyMatrix4(hi),this}rotateX(t){return hi.makeRotationX(t),this.applyMatrix4(hi),this}rotateY(t){return hi.makeRotationY(t),this.applyMatrix4(hi),this}rotateZ(t){return hi.makeRotationZ(t),this.applyMatrix4(hi),this}translate(t,i,r){return hi.makeTranslation(t,i,r),this.applyMatrix4(hi),this}scale(t,i,r){return hi.makeScale(t,i,r),this.applyMatrix4(hi),this}lookAt(t){return Ah.lookAt(t),Ah.updateMatrix(),this.applyMatrix4(Ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Er(r,3))}else{const r=Math.min(t.length,i.count);for(let l=0;l<r;l++){const u=t[l];i.setXYZ(l,u.x,u.y,u.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jo);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let r=0,l=i.length;r<l;r++){const u=i[r];ti.setFromBufferAttribute(u),this.morphTargetsRelative?(Sn.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(Sn),Sn.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(Sn)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Id);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(t){const r=this.boundingSphere.center;if(ti.setFromBufferAttribute(t),i)for(let u=0,h=i.length;u<h;u++){const d=i[u];Io.setFromBufferAttribute(d),this.morphTargetsRelative?(Sn.addVectors(ti.min,Io.min),ti.expandByPoint(Sn),Sn.addVectors(ti.max,Io.max),ti.expandByPoint(Sn)):(ti.expandByPoint(Io.min),ti.expandByPoint(Io.max))}ti.getCenter(r);let l=0;for(let u=0,h=t.count;u<h;u++)Sn.fromBufferAttribute(t,u),l=Math.max(l,r.distanceToSquared(Sn));if(i)for(let u=0,h=i.length;u<h;u++){const d=i[u],m=this.morphTargetsRelative;for(let p=0,S=d.count;p<S;p++)Sn.fromBufferAttribute(d,p),m&&(ys.fromBufferAttribute(t,p),Sn.add(ys)),l=Math.max(l,r.distanceToSquared(Sn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,u=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oi(new Float32Array(4*r.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let Z=0;Z<r.count;Z++)d[Z]=new $,m[Z]=new $;const p=new $,S=new $,_=new $,x=new he,M=new he,A=new he,R=new $,y=new $;function v(Z,C,D){p.fromBufferAttribute(r,Z),S.fromBufferAttribute(r,C),_.fromBufferAttribute(r,D),x.fromBufferAttribute(u,Z),M.fromBufferAttribute(u,C),A.fromBufferAttribute(u,D),S.sub(p),_.sub(p),M.sub(x),A.sub(x);const V=1/(M.x*A.y-A.x*M.y);isFinite(V)&&(R.copy(S).multiplyScalar(A.y).addScaledVector(_,-M.y).multiplyScalar(V),y.copy(_).multiplyScalar(M.x).addScaledVector(S,-A.x).multiplyScalar(V),d[Z].add(R),d[C].add(R),d[D].add(R),m[Z].add(y),m[C].add(y),m[D].add(y))}let I=this.groups;I.length===0&&(I=[{start:0,count:t.count}]);for(let Z=0,C=I.length;Z<C;++Z){const D=I[Z],V=D.start,it=D.count;for(let ct=V,gt=V+it;ct<gt;ct+=3)v(t.getX(ct+0),t.getX(ct+1),t.getX(ct+2))}const N=new $,w=new $,H=new $,F=new $;function P(Z){H.fromBufferAttribute(l,Z),F.copy(H);const C=d[Z];N.copy(C),N.sub(H.multiplyScalar(H.dot(C))).normalize(),w.crossVectors(F,C);const V=w.dot(m[Z])<0?-1:1;h.setXYZW(Z,N.x,N.y,N.z,V)}for(let Z=0,C=I.length;Z<C;++Z){const D=I[Z],V=D.start,it=D.count;for(let ct=V,gt=V+it;ct<gt;ct+=3)P(t.getX(ct+0)),P(t.getX(ct+1)),P(t.getX(ct+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Oi(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let x=0,M=r.count;x<M;x++)r.setXYZ(x,0,0,0);const l=new $,u=new $,h=new $,d=new $,m=new $,p=new $,S=new $,_=new $;if(t)for(let x=0,M=t.count;x<M;x+=3){const A=t.getX(x+0),R=t.getX(x+1),y=t.getX(x+2);l.fromBufferAttribute(i,A),u.fromBufferAttribute(i,R),h.fromBufferAttribute(i,y),S.subVectors(h,u),_.subVectors(l,u),S.cross(_),d.fromBufferAttribute(r,A),m.fromBufferAttribute(r,R),p.fromBufferAttribute(r,y),d.add(S),m.add(S),p.add(S),r.setXYZ(A,d.x,d.y,d.z),r.setXYZ(R,m.x,m.y,m.z),r.setXYZ(y,p.x,p.y,p.z)}else for(let x=0,M=i.count;x<M;x+=3)l.fromBufferAttribute(i,x+0),u.fromBufferAttribute(i,x+1),h.fromBufferAttribute(i,x+2),S.subVectors(h,u),_.subVectors(l,u),S.cross(_),r.setXYZ(x+0,S.x,S.y,S.z),r.setXYZ(x+1,S.x,S.y,S.z),r.setXYZ(x+2,S.x,S.y,S.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,r=t.count;i<r;i++)Sn.fromBufferAttribute(t,i),Sn.normalize(),t.setXYZ(i,Sn.x,Sn.y,Sn.z)}toNonIndexed(){function t(d,m){const p=d.array,S=d.itemSize,_=d.normalized,x=new p.constructor(m.length*S);let M=0,A=0;for(let R=0,y=m.length;R<y;R++){d.isInterleavedBufferAttribute?M=m[R]*d.data.stride+d.offset:M=m[R]*S;for(let v=0;v<S;v++)x[A++]=p[M++]}return new Oi(x,S,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Cr,r=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,r);i.setAttribute(d,p)}const u=this.morphAttributes;for(const d in u){const m=[],p=u[d];for(let S=0,_=p.length;S<_;S++){const x=p[S],M=t(x,r);m.push(M)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const p=r[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let u=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],S=[];for(let _=0,x=p.length;_<x;_++){const M=p[_];S.push(M.toJSON(t.data))}S.length>0&&(l[m]=S,u=!0)}u&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere=d.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const r=t.index;r!==null&&this.setIndex(r.clone());const l=t.attributes;for(const p in l){const S=l[p];this.setAttribute(p,S.clone(i))}const u=t.morphAttributes;for(const p in u){const S=[],_=u[p];for(let x=0,M=_.length;x<M;x++)S.push(_[x].clone(i));this.morphAttributes[p]=S}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let p=0,S=h.length;p<S;p++){const _=h[p];this.addGroup(_.start,_.count,_.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const t0=new pn,pr=new W0,yc=new Id,e0=new $,Mc=new $,Ec=new $,bc=new $,Rh=new $,Tc=new $,n0=new $,Ac=new $;class Ni extends ni{constructor(t=new Cr,i=new Z0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,h=l.length;u<h;u++){const d=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}getVertexPosition(t,i){const r=this.geometry,l=r.attributes.position,u=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(u&&d){Tc.set(0,0,0);for(let m=0,p=u.length;m<p;m++){const S=d[m],_=u[m];S!==0&&(Rh.fromBufferAttribute(_,t),h?Tc.addScaledVector(Rh,S):Tc.addScaledVector(Rh.sub(i),S))}i.add(Tc)}return i}raycast(t,i){const r=this.geometry,l=this.material,u=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),yc.copy(r.boundingSphere),yc.applyMatrix4(u),pr.copy(t.ray).recast(t.near),!(yc.containsPoint(pr.origin)===!1&&(pr.intersectSphere(yc,e0)===null||pr.origin.distanceToSquared(e0)>(t.far-t.near)**2))&&(t0.copy(u).invert(),pr.copy(t.ray).applyMatrix4(t0),!(r.boundingBox!==null&&pr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(t,i,pr)))}_computeIntersections(t,i,r){let l;const u=this.geometry,h=this.material,d=u.index,m=u.attributes.position,p=u.attributes.uv,S=u.attributes.uv1,_=u.attributes.normal,x=u.groups,M=u.drawRange;if(d!==null)if(Array.isArray(h))for(let A=0,R=x.length;A<R;A++){const y=x[A],v=h[y.materialIndex],I=Math.max(y.start,M.start),N=Math.min(d.count,Math.min(y.start+y.count,M.start+M.count));for(let w=I,H=N;w<H;w+=3){const F=d.getX(w),P=d.getX(w+1),Z=d.getX(w+2);l=Rc(this,v,t,r,p,S,_,F,P,Z),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const A=Math.max(0,M.start),R=Math.min(d.count,M.start+M.count);for(let y=A,v=R;y<v;y+=3){const I=d.getX(y),N=d.getX(y+1),w=d.getX(y+2);l=Rc(this,h,t,r,p,S,_,I,N,w),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let A=0,R=x.length;A<R;A++){const y=x[A],v=h[y.materialIndex],I=Math.max(y.start,M.start),N=Math.min(m.count,Math.min(y.start+y.count,M.start+M.count));for(let w=I,H=N;w<H;w+=3){const F=w,P=w+1,Z=w+2;l=Rc(this,v,t,r,p,S,_,F,P,Z),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const A=Math.max(0,M.start),R=Math.min(m.count,M.start+M.count);for(let y=A,v=R;y<v;y+=3){const I=y,N=y+1,w=y+2;l=Rc(this,h,t,r,p,S,_,I,N,w),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function Jy(s,t,i,r,l,u,h,d){let m;if(t.side===kn?m=r.intersectTriangle(h,u,l,!0,d):m=r.intersectTriangle(l,u,h,t.side===qa,d),m===null)return null;Ac.copy(d),Ac.applyMatrix4(s.matrixWorld);const p=i.ray.origin.distanceTo(Ac);return p<i.near||p>i.far?null:{distance:p,point:Ac.clone(),object:s}}function Rc(s,t,i,r,l,u,h,d,m,p){s.getVertexPosition(d,Mc),s.getVertexPosition(m,Ec),s.getVertexPosition(p,bc);const S=Jy(s,t,i,r,Mc,Ec,bc,n0);if(S){const _=new $;Ei.getBarycoord(n0,Mc,Ec,bc,_),l&&(S.uv=Ei.getInterpolatedAttribute(l,d,m,p,_,new he)),u&&(S.uv1=Ei.getInterpolatedAttribute(u,d,m,p,_,new he)),h&&(S.normal=Ei.getInterpolatedAttribute(h,d,m,p,_,new $),S.normal.dot(r.direction)>0&&S.normal.multiplyScalar(-1));const x={a:d,b:m,c:p,normal:new $,materialIndex:0};Ei.getNormal(Mc,Ec,bc,x.normal),S.face=x,S.barycoord=_}return S}class $o extends Cr{constructor(t=1,i=1,r=1,l=1,u=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:r,widthSegments:l,heightSegments:u,depthSegments:h};const d=this;l=Math.floor(l),u=Math.floor(u),h=Math.floor(h);const m=[],p=[],S=[],_=[];let x=0,M=0;A("z","y","x",-1,-1,r,i,t,h,u,0),A("z","y","x",1,-1,r,i,-t,h,u,1),A("x","z","y",1,1,t,r,i,l,h,2),A("x","z","y",1,-1,t,r,-i,l,h,3),A("x","y","z",1,-1,t,i,r,l,u,4),A("x","y","z",-1,-1,t,i,-r,l,u,5),this.setIndex(m),this.setAttribute("position",new Er(p,3)),this.setAttribute("normal",new Er(S,3)),this.setAttribute("uv",new Er(_,2));function A(R,y,v,I,N,w,H,F,P,Z,C){const D=w/P,V=H/Z,it=w/2,ct=H/2,gt=F/2,ft=P+1,O=Z+1;let j=0,Y=0;const vt=new $;for(let Et=0;Et<O;Et++){const L=Et*V-ct;for(let et=0;et<ft;et++){const xt=et*D-it;vt[R]=xt*I,vt[y]=L*N,vt[v]=gt,p.push(vt.x,vt.y,vt.z),vt[R]=0,vt[y]=0,vt[v]=F>0?1:-1,S.push(vt.x,vt.y,vt.z),_.push(et/P),_.push(1-Et/Z),j+=1}}for(let Et=0;Et<Z;Et++)for(let L=0;L<P;L++){const et=x+L+ft*Et,xt=x+L+ft*(Et+1),At=x+(L+1)+ft*(Et+1),Ot=x+(L+1)+ft*Et;m.push(et,xt,Ot),m.push(xt,At,Ot),Y+=6}d.addGroup(M,Y,C),M+=Y,x+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $o(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Bs(s){const t={};for(const i in s){t[i]={};for(const r in s[i]){const l=s[i][r];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=l.clone():Array.isArray(l)?t[i][r]=l.slice():t[i][r]=l}}return t}function On(s){const t={};for(let i=0;i<s.length;i++){const r=Bs(s[i]);for(const l in r)t[l]=r[l]}return t}function $y(s){const t=[];for(let i=0;i<s.length;i++)t.push(s[i].clone());return t}function J0(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ce.workingColorSpace}const tM={clone:Bs,merge:On};var eM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends kc{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=eM,this.fragmentShader=nM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Bs(t.uniforms),this.uniformsGroups=$y(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class $0 extends ni{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pn,this.projectionMatrix=new pn,this.projectionMatrixInverse=new pn,this.coordinateSystem=Li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ga=new $,i0=new he,a0=new he;class pi extends $0{constructor(t=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Zo*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ko*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zo*2*Math.atan(Math.tan(ko*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,r){Ga.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ga.x,Ga.y).multiplyScalar(-t/Ga.z),Ga.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Ga.x,Ga.y).multiplyScalar(-t/Ga.z)}getViewSize(t,i){return this.getViewBounds(t,i0,a0),i.subVectors(a0,i0)}setViewOffset(t,i,r,l,u,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(ko*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,u=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;u+=h.offsetX*l/m,i-=h.offsetY*r/p,l*=h.width/m,r*=h.height/p}const d=this.filmOffset;d!==0&&(u+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+l,i,i-r,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Ms=-90,Es=1;class iM extends ni{constructor(t,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new pi(Ms,Es,t,i);l.layers=this.layers,this.add(l);const u=new pi(Ms,Es,t,i);u.layers=this.layers,this.add(u);const h=new pi(Ms,Es,t,i);h.layers=this.layers,this.add(h);const d=new pi(Ms,Es,t,i);d.layers=this.layers,this.add(d);const m=new pi(Ms,Es,t,i);m.layers=this.layers,this.add(m);const p=new pi(Ms,Es,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[r,l,u,h,d,m]=i;for(const p of i)this.remove(p);if(t===Li)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Hc)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[u,h,d,m,p,S]=this.children,_=t.getRenderTarget(),x=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),A=t.xr.enabled;t.xr.enabled=!1;const R=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,t.setRenderTarget(r,0,l),t.render(i,u),t.setRenderTarget(r,1,l),t.render(i,h),t.setRenderTarget(r,2,l),t.render(i,d),t.setRenderTarget(r,3,l),t.render(i,m),t.setRenderTarget(r,4,l),t.render(i,p),r.texture.generateMipmaps=R,t.setRenderTarget(r,5,l),t.render(i,S),t.setRenderTarget(_,x,M),t.xr.enabled=A,r.texture.needsPMREMUpdate=!0}}class tv extends Xn{constructor(t=[],i=Ps,r,l,u,h,d,m,p,S){super(t,i,r,l,u,h,d,m,p,S),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class aM extends Wa{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const r={width:t,height:t,depth:1},l=[r,r,r,r,r,r];this.texture=new tv(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new $o(5,5,5),u=new ei({name:"CubemapFromEquirect",uniforms:Bs(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:kn,blending:la});u.uniforms.tEquirect.value=i;const h=new Ni(l,u),d=i.minFilter;return i.minFilter===Mr&&(i.minFilter=mi),new iM(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i=!0,r=!0,l=!0){const u=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,r,l);t.setRenderTarget(u)}}class Cc extends ni{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rM={type:"move"};class Ch{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Cc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Cc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Cc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const r of t.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,r){let l=null,u=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){h=!0;for(const R of t.hand.values()){const y=i.getJointPose(R,r),v=this._getHandJoint(p,R);y!==null&&(v.matrix.fromArray(y.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=y.radius),v.visible=y!==null}const S=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],x=S.position.distanceTo(_.position),M=.02,A=.005;p.inputState.pinching&&x>M+A?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&x<=M-A&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(u=i.getPose(t.gripSpace,r),u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,u.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(u.linearVelocity)):m.hasLinearVelocity=!1,u.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(u.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,r),l===null&&u!==null&&(l=u),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(rM)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=u!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const r=new Cc;r.matrixAutoUpdate=!1,r.visible=!1,t.joints[i.jointName]=r,t.add(r)}return t.joints[i.jointName]}}class sM extends ni{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fa,this.environmentIntensity=1,this.environmentRotation=new fa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Dh=new $,oM=new $,lM=new ue;class Va{constructor(t=new $(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,r,l){return this.normal.set(t,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,r){const l=Dh.subVectors(r,i).cross(oM.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const r=t.delta(Dh),l=this.normal.dot(r);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/l;return u<0||u>1?null:i.copy(t.start).addScaledVector(r,u)}intersectsLine(t){const i=this.distanceToPoint(t.start),r=this.distanceToPoint(t.end);return i<0&&r>0||r<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const r=i||lM.getNormalMatrix(t),l=this.coplanarPoint(Dh).applyMatrix4(t),u=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(u),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mr=new Id,cM=new he(.5,.5),Dc=new $;class ev{constructor(t=new Va,i=new Va,r=new Va,l=new Va,u=new Va,h=new Va){this.planes=[t,i,r,l,u,h]}set(t,i,r,l,u,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(r),d[3].copy(l),d[4].copy(u),d[5].copy(h),this}copy(t){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(t.planes[r]);return this}setFromProjectionMatrix(t,i=Li,r=!1){const l=this.planes,u=t.elements,h=u[0],d=u[1],m=u[2],p=u[3],S=u[4],_=u[5],x=u[6],M=u[7],A=u[8],R=u[9],y=u[10],v=u[11],I=u[12],N=u[13],w=u[14],H=u[15];if(l[0].setComponents(p-h,M-S,v-A,H-I).normalize(),l[1].setComponents(p+h,M+S,v+A,H+I).normalize(),l[2].setComponents(p+d,M+_,v+R,H+N).normalize(),l[3].setComponents(p-d,M-_,v-R,H-N).normalize(),r)l[4].setComponents(m,x,y,w).normalize(),l[5].setComponents(p-m,M-x,v-y,H-w).normalize();else if(l[4].setComponents(p-m,M-x,v-y,H-w).normalize(),i===Li)l[5].setComponents(p+m,M+x,v+y,H+w).normalize();else if(i===Hc)l[5].setComponents(m,x,y,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),mr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),mr.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(mr)}intersectsSprite(t){mr.center.set(0,0,0);const i=cM.distanceTo(t.center);return mr.radius=.7071067811865476+i,mr.applyMatrix4(t.matrixWorld),this.intersectsSphere(mr)}intersectsSphere(t){const i=this.planes,r=t.center,l=-t.radius;for(let u=0;u<6;u++)if(i[u].distanceToPoint(r)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(Dc.x=l.normal.x>0?t.max.x:t.min.x,Dc.y=l.normal.y>0?t.max.y:t.min.y,Dc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Dc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class nv extends Xn{constructor(t,i,r=br,l,u,h,d=bi,m=bi,p,S=Yo,_=1){if(S!==Yo&&S!==jo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:t,height:i,depth:_};super(x,l,u,h,d,m,S,r,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Bd(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class iv extends Xn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class tl extends Cr{constructor(t=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:r,heightSegments:l};const u=t/2,h=i/2,d=Math.floor(r),m=Math.floor(l),p=d+1,S=m+1,_=t/d,x=i/m,M=[],A=[],R=[],y=[];for(let v=0;v<S;v++){const I=v*x-h;for(let N=0;N<p;N++){const w=N*_-u;A.push(w,-I,0),R.push(0,0,1),y.push(N/d),y.push(1-v/m)}}for(let v=0;v<m;v++)for(let I=0;I<d;I++){const N=I+p*v,w=I+p*(v+1),H=I+1+p*(v+1),F=I+1+p*v;M.push(N,w,F),M.push(w,H,F)}this.setIndex(M),this.setAttribute("position",new Er(A,3)),this.setAttribute("normal",new Er(R,3)),this.setAttribute("uv",new Er(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tl(t.width,t.height,t.widthSegments,t.heightSegments)}}class uM extends kc{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=oy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class fM extends kc{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class av extends $0{constructor(t=-1,i=1,r=1,l=-1,u=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=r,this.bottom=l,this.near=u,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,r,l,u,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let u=r-t,h=r+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,S=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=p*this.view.offsetX,h=u+p*this.view.width,d-=S*this.view.offsetY,m=d-S*this.view.height}this.projectionMatrix.makeOrthographic(u,h,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class hM extends pi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class bd{constructor(t=1,i=0,r=0){this.radius=t,this.phi=i,this.theta=r}set(t,i,r){return this.radius=t,this.phi=i,this.theta=r,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=me(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,r){return this.radius=Math.sqrt(t*t+i*i+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,r),this.phi=Math.acos(me(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class dM extends Rr{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function r0(s,t,i,r){const l=pM(r);switch(i){case F0:return s*t;case G0:return s*t/l.components*l.byteLength;case Nd:return s*t/l.components*l.byteLength;case V0:return s*t*2/l.components*l.byteLength;case Od:return s*t*2/l.components*l.byteLength;case H0:return s*t*3/l.components*l.byteLength;case gi:return s*t*4/l.components*l.byteLength;case Pd:return s*t*4/l.components*l.byteLength;case Oc:case Pc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case zc:case Bc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Qh:case $h:return Math.max(s,16)*Math.max(t,8)/4;case Kh:case Jh:return Math.max(s,8)*Math.max(t,8)/2;case td:case ed:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case nd:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case id:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ad:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case rd:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case sd:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case od:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ld:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case cd:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ud:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case fd:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case hd:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case dd:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case pd:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case md:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case gd:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case _d:case vd:case Sd:return Math.ceil(s/4)*Math.ceil(t/4)*16;case xd:case yd:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Md:case Ed:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function pM(s){switch(s){case Pi:case P0:return{byteLength:1,components:1};case qo:case z0:case Fs:return{byteLength:2,components:1};case Ud:case Ld:return{byteLength:2,components:4};case br:case wd:case oa:return{byteLength:4,components:1};case B0:case I0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dd);function rv(){let s=null,t=!1,i=null,r=null;function l(u,h){i(u,h),r=s.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(r=s.requestAnimationFrame(l),t=!0)},stop:function(){s.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(u){i=u},setContext:function(u){s=u}}}function mM(s){const t=new WeakMap;function i(d,m){const p=d.array,S=d.usage,_=p.byteLength,x=s.createBuffer();s.bindBuffer(m,x),s.bufferData(m,p,S),d.onUploadCallback();let M;if(p instanceof Float32Array)M=s.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)M=s.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=s.HALF_FLOAT:M=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=s.SHORT;else if(p instanceof Uint32Array)M=s.UNSIGNED_INT;else if(p instanceof Int32Array)M=s.INT;else if(p instanceof Int8Array)M=s.BYTE;else if(p instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:_}}function r(d,m,p){const S=m.array,_=m.updateRanges;if(s.bindBuffer(p,d),_.length===0)s.bufferSubData(p,0,S);else{_.sort((M,A)=>M.start-A.start);let x=0;for(let M=1;M<_.length;M++){const A=_[x],R=_[M];R.start<=A.start+A.count+1?A.count=Math.max(A.count,R.start+R.count-A.start):(++x,_[x]=R)}_.length=x+1;for(let M=0,A=_.length;M<A;M++){const R=_[M];s.bufferSubData(p,R.start*S.BYTES_PER_ELEMENT,S,R.start,R.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function u(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(s.deleteBuffer(m.buffer),t.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const S=t.get(d);(!S||S.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,d,m),p.version=d.version}}return{get:l,remove:u,update:h}}var gM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_M=`#ifdef USE_ALPHAHASH
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
#endif`,vM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,SM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,MM=`#ifdef USE_AOMAP
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
#endif`,EM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bM=`#ifdef USE_BATCHING
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
#endif`,TM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,AM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,RM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,CM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,DM=`#ifdef USE_IRIDESCENCE
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
#endif`,wM=`#ifdef USE_BUMPMAP
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
#endif`,UM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,LM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,NM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,OM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,PM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,BM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,IM=`#if defined( USE_COLOR_ALPHA )
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
#endif`,FM=`#define PI 3.141592653589793
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
} // validated`,HM=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,GM=`vec3 transformedNormal = objectNormal;
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
#endif`,VM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,XM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,WM="gl_FragColor = linearToOutputTexel( gl_FragColor );",YM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jM=`#ifdef USE_ENVMAP
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
#endif`,ZM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,KM=`#ifdef USE_ENVMAP
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
#endif`,QM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,JM=`#ifdef USE_ENVMAP
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
#endif`,$M=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,eE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iE=`#ifdef USE_GRADIENTMAP
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
}`,aE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,oE=`uniform bool receiveShadow;
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
#endif`,lE=`#ifdef USE_ENVMAP
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
#endif`,cE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dE=`PhysicalMaterial material;
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
#endif`,pE=`struct PhysicalMaterial {
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
}`,mE=`
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
#endif`,gE=`#if defined( RE_IndirectDiffuse )
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
#endif`,_E=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,SE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ME=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,EE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,TE=`#if defined( USE_POINTS_UV )
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
#endif`,AE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,RE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,CE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,DE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,UE=`#ifdef USE_MORPHTARGETS
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
#endif`,LE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,NE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,OE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,PE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,BE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,IE=`#ifdef USE_NORMALMAP
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
#endif`,FE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,HE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,GE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,VE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,XE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,WE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,YE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ZE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,KE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,QE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,JE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$E=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tb=`float getShadowMask() {
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
}`,eb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nb=`#ifdef USE_SKINNING
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
#endif`,ib=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ab=`#ifdef USE_SKINNING
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
#endif`,rb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ob=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cb=`#ifdef USE_TRANSMISSION
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
#endif`,ub=`#ifdef USE_TRANSMISSION
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
#endif`,fb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,db=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gb=`uniform sampler2D t2D;
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
}`,_b=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Sb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yb=`#include <common>
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
}`,Mb=`#if DEPTH_PACKING == 3200
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
}`,Eb=`#define DISTANCE
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
}`,bb=`#define DISTANCE
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
}`,Tb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ab=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rb=`uniform float scale;
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
}`,Cb=`uniform vec3 diffuse;
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
}`,Db=`#include <common>
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
}`,wb=`uniform vec3 diffuse;
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
}`,Ub=`#define LAMBERT
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
}`,Lb=`#define LAMBERT
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
}`,Nb=`#define MATCAP
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
}`,Ob=`#define MATCAP
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
}`,Pb=`#define NORMAL
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
}`,zb=`#define NORMAL
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
}`,Bb=`#define PHONG
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
}`,Ib=`#define PHONG
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
}`,Fb=`#define STANDARD
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
}`,Hb=`#define STANDARD
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
}`,Gb=`#define TOON
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
}`,Vb=`#define TOON
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
}`,kb=`uniform float size;
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
}`,Xb=`uniform vec3 diffuse;
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
}`,qb=`#include <common>
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
}`,Wb=`uniform vec3 color;
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
}`,Yb=`uniform float rotation;
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
}`,jb=`uniform vec3 diffuse;
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
}`,fe={alphahash_fragment:gM,alphahash_pars_fragment:_M,alphamap_fragment:vM,alphamap_pars_fragment:SM,alphatest_fragment:xM,alphatest_pars_fragment:yM,aomap_fragment:MM,aomap_pars_fragment:EM,batching_pars_vertex:bM,batching_vertex:TM,begin_vertex:AM,beginnormal_vertex:RM,bsdfs:CM,iridescence_fragment:DM,bumpmap_pars_fragment:wM,clipping_planes_fragment:UM,clipping_planes_pars_fragment:LM,clipping_planes_pars_vertex:NM,clipping_planes_vertex:OM,color_fragment:PM,color_pars_fragment:zM,color_pars_vertex:BM,color_vertex:IM,common:FM,cube_uv_reflection_fragment:HM,defaultnormal_vertex:GM,displacementmap_pars_vertex:VM,displacementmap_vertex:kM,emissivemap_fragment:XM,emissivemap_pars_fragment:qM,colorspace_fragment:WM,colorspace_pars_fragment:YM,envmap_fragment:jM,envmap_common_pars_fragment:ZM,envmap_pars_fragment:KM,envmap_pars_vertex:QM,envmap_physical_pars_fragment:lE,envmap_vertex:JM,fog_vertex:$M,fog_pars_vertex:tE,fog_fragment:eE,fog_pars_fragment:nE,gradientmap_pars_fragment:iE,lightmap_pars_fragment:aE,lights_lambert_fragment:rE,lights_lambert_pars_fragment:sE,lights_pars_begin:oE,lights_toon_fragment:cE,lights_toon_pars_fragment:uE,lights_phong_fragment:fE,lights_phong_pars_fragment:hE,lights_physical_fragment:dE,lights_physical_pars_fragment:pE,lights_fragment_begin:mE,lights_fragment_maps:gE,lights_fragment_end:_E,logdepthbuf_fragment:vE,logdepthbuf_pars_fragment:SE,logdepthbuf_pars_vertex:xE,logdepthbuf_vertex:yE,map_fragment:ME,map_pars_fragment:EE,map_particle_fragment:bE,map_particle_pars_fragment:TE,metalnessmap_fragment:AE,metalnessmap_pars_fragment:RE,morphinstance_vertex:CE,morphcolor_vertex:DE,morphnormal_vertex:wE,morphtarget_pars_vertex:UE,morphtarget_vertex:LE,normal_fragment_begin:NE,normal_fragment_maps:OE,normal_pars_fragment:PE,normal_pars_vertex:zE,normal_vertex:BE,normalmap_pars_fragment:IE,clearcoat_normal_fragment_begin:FE,clearcoat_normal_fragment_maps:HE,clearcoat_pars_fragment:GE,iridescence_pars_fragment:VE,opaque_fragment:kE,packing:XE,premultiplied_alpha_fragment:qE,project_vertex:WE,dithering_fragment:YE,dithering_pars_fragment:jE,roughnessmap_fragment:ZE,roughnessmap_pars_fragment:KE,shadowmap_pars_fragment:QE,shadowmap_pars_vertex:JE,shadowmap_vertex:$E,shadowmask_pars_fragment:tb,skinbase_vertex:eb,skinning_pars_vertex:nb,skinning_vertex:ib,skinnormal_vertex:ab,specularmap_fragment:rb,specularmap_pars_fragment:sb,tonemapping_fragment:ob,tonemapping_pars_fragment:lb,transmission_fragment:cb,transmission_pars_fragment:ub,uv_pars_fragment:fb,uv_pars_vertex:hb,uv_vertex:db,worldpos_vertex:pb,background_vert:mb,background_frag:gb,backgroundCube_vert:_b,backgroundCube_frag:vb,cube_vert:Sb,cube_frag:xb,depth_vert:yb,depth_frag:Mb,distanceRGBA_vert:Eb,distanceRGBA_frag:bb,equirect_vert:Tb,equirect_frag:Ab,linedashed_vert:Rb,linedashed_frag:Cb,meshbasic_vert:Db,meshbasic_frag:wb,meshlambert_vert:Ub,meshlambert_frag:Lb,meshmatcap_vert:Nb,meshmatcap_frag:Ob,meshnormal_vert:Pb,meshnormal_frag:zb,meshphong_vert:Bb,meshphong_frag:Ib,meshphysical_vert:Fb,meshphysical_frag:Hb,meshtoon_vert:Gb,meshtoon_frag:Vb,points_vert:kb,points_frag:Xb,shadow_vert:qb,shadow_frag:Wb,sprite_vert:Yb,sprite_frag:jb},Nt={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ue},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ue}},envmap:{envMap:{value:null},envMapRotation:{value:new ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ue},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0},uvTransform:{value:new ue}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ue},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0}}},Ui={basic:{uniforms:On([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:fe.meshbasic_vert,fragmentShader:fe.meshbasic_frag},lambert:{uniforms:On([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)}}]),vertexShader:fe.meshlambert_vert,fragmentShader:fe.meshlambert_frag},phong:{uniforms:On([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:fe.meshphong_vert,fragmentShader:fe.meshphong_frag},standard:{uniforms:On([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag},toon:{uniforms:On([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new He(0)}}]),vertexShader:fe.meshtoon_vert,fragmentShader:fe.meshtoon_frag},matcap:{uniforms:On([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:fe.meshmatcap_vert,fragmentShader:fe.meshmatcap_frag},points:{uniforms:On([Nt.points,Nt.fog]),vertexShader:fe.points_vert,fragmentShader:fe.points_frag},dashed:{uniforms:On([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fe.linedashed_vert,fragmentShader:fe.linedashed_frag},depth:{uniforms:On([Nt.common,Nt.displacementmap]),vertexShader:fe.depth_vert,fragmentShader:fe.depth_frag},normal:{uniforms:On([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:fe.meshnormal_vert,fragmentShader:fe.meshnormal_frag},sprite:{uniforms:On([Nt.sprite,Nt.fog]),vertexShader:fe.sprite_vert,fragmentShader:fe.sprite_frag},background:{uniforms:{uvTransform:{value:new ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fe.background_vert,fragmentShader:fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ue}},vertexShader:fe.backgroundCube_vert,fragmentShader:fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fe.cube_vert,fragmentShader:fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fe.equirect_vert,fragmentShader:fe.equirect_frag},distanceRGBA:{uniforms:On([Nt.common,Nt.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fe.distanceRGBA_vert,fragmentShader:fe.distanceRGBA_frag},shadow:{uniforms:On([Nt.lights,Nt.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:fe.shadow_vert,fragmentShader:fe.shadow_frag}};Ui.physical={uniforms:On([Ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ue},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ue},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ue},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ue},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ue},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ue}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag};const wc={r:0,b:0,g:0},gr=new fa,Zb=new pn;function Kb(s,t,i,r,l,u,h){const d=new He(0);let m=u===!0?0:1,p,S,_=null,x=0,M=null;function A(N){let w=N.isScene===!0?N.background:null;return w&&w.isTexture&&(w=(N.backgroundBlurriness>0?i:t).get(w)),w}function R(N){let w=!1;const H=A(N);H===null?v(d,m):H&&H.isColor&&(v(H,1),w=!0);const F=s.xr.getEnvironmentBlendMode();F==="additive"?r.buffers.color.setClear(0,0,0,1,h):F==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,h),(s.autoClear||w)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(N,w){const H=A(w);H&&(H.isCubeTexture||H.mapping===Vc)?(S===void 0&&(S=new Ni(new $o(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:Bs(Ui.backgroundCube.uniforms),vertexShader:Ui.backgroundCube.vertexShader,fragmentShader:Ui.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),S.geometry.deleteAttribute("normal"),S.geometry.deleteAttribute("uv"),S.onBeforeRender=function(F,P,Z){this.matrixWorld.copyPosition(Z.matrixWorld)},Object.defineProperty(S.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(S)),gr.copy(w.backgroundRotation),gr.x*=-1,gr.y*=-1,gr.z*=-1,H.isCubeTexture&&H.isRenderTargetTexture===!1&&(gr.y*=-1,gr.z*=-1),S.material.uniforms.envMap.value=H,S.material.uniforms.flipEnvMap.value=H.isCubeTexture&&H.isRenderTargetTexture===!1?-1:1,S.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,S.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,S.material.uniforms.backgroundRotation.value.setFromMatrix4(Zb.makeRotationFromEuler(gr)),S.material.toneMapped=Ce.getTransfer(H.colorSpace)!==Ie,(_!==H||x!==H.version||M!==s.toneMapping)&&(S.material.needsUpdate=!0,_=H,x=H.version,M=s.toneMapping),S.layers.enableAll(),N.unshift(S,S.geometry,S.material,0,0,null)):H&&H.isTexture&&(p===void 0&&(p=new Ni(new tl(2,2),new ei({name:"BackgroundMaterial",uniforms:Bs(Ui.background.uniforms),vertexShader:Ui.background.vertexShader,fragmentShader:Ui.background.fragmentShader,side:qa,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=H,p.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,p.material.toneMapped=Ce.getTransfer(H.colorSpace)!==Ie,H.matrixAutoUpdate===!0&&H.updateMatrix(),p.material.uniforms.uvTransform.value.copy(H.matrix),(_!==H||x!==H.version||M!==s.toneMapping)&&(p.material.needsUpdate=!0,_=H,x=H.version,M=s.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null))}function v(N,w){N.getRGB(wc,J0(s)),r.buffers.color.setClear(wc.r,wc.g,wc.b,w,h)}function I(){S!==void 0&&(S.geometry.dispose(),S.material.dispose(),S=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(N,w=1){d.set(N),m=w,v(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(N){m=N,v(d,m)},render:R,addToRenderList:y,dispose:I}}function Qb(s,t){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},l=x(null);let u=l,h=!1;function d(D,V,it,ct,gt){let ft=!1;const O=_(ct,it,V);u!==O&&(u=O,p(u.object)),ft=M(D,ct,it,gt),ft&&A(D,ct,it,gt),gt!==null&&t.update(gt,s.ELEMENT_ARRAY_BUFFER),(ft||h)&&(h=!1,w(D,V,it,ct),gt!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(gt).buffer))}function m(){return s.createVertexArray()}function p(D){return s.bindVertexArray(D)}function S(D){return s.deleteVertexArray(D)}function _(D,V,it){const ct=it.wireframe===!0;let gt=r[D.id];gt===void 0&&(gt={},r[D.id]=gt);let ft=gt[V.id];ft===void 0&&(ft={},gt[V.id]=ft);let O=ft[ct];return O===void 0&&(O=x(m()),ft[ct]=O),O}function x(D){const V=[],it=[],ct=[];for(let gt=0;gt<i;gt++)V[gt]=0,it[gt]=0,ct[gt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:it,attributeDivisors:ct,object:D,attributes:{},index:null}}function M(D,V,it,ct){const gt=u.attributes,ft=V.attributes;let O=0;const j=it.getAttributes();for(const Y in j)if(j[Y].location>=0){const Et=gt[Y];let L=ft[Y];if(L===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(L=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(L=D.instanceColor)),Et===void 0||Et.attribute!==L||L&&Et.data!==L.data)return!0;O++}return u.attributesNum!==O||u.index!==ct}function A(D,V,it,ct){const gt={},ft=V.attributes;let O=0;const j=it.getAttributes();for(const Y in j)if(j[Y].location>=0){let Et=ft[Y];Et===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(Et=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(Et=D.instanceColor));const L={};L.attribute=Et,Et&&Et.data&&(L.data=Et.data),gt[Y]=L,O++}u.attributes=gt,u.attributesNum=O,u.index=ct}function R(){const D=u.newAttributes;for(let V=0,it=D.length;V<it;V++)D[V]=0}function y(D){v(D,0)}function v(D,V){const it=u.newAttributes,ct=u.enabledAttributes,gt=u.attributeDivisors;it[D]=1,ct[D]===0&&(s.enableVertexAttribArray(D),ct[D]=1),gt[D]!==V&&(s.vertexAttribDivisor(D,V),gt[D]=V)}function I(){const D=u.newAttributes,V=u.enabledAttributes;for(let it=0,ct=V.length;it<ct;it++)V[it]!==D[it]&&(s.disableVertexAttribArray(it),V[it]=0)}function N(D,V,it,ct,gt,ft,O){O===!0?s.vertexAttribIPointer(D,V,it,gt,ft):s.vertexAttribPointer(D,V,it,ct,gt,ft)}function w(D,V,it,ct){R();const gt=ct.attributes,ft=it.getAttributes(),O=V.defaultAttributeValues;for(const j in ft){const Y=ft[j];if(Y.location>=0){let vt=gt[j];if(vt===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(vt=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(vt=D.instanceColor)),vt!==void 0){const Et=vt.normalized,L=vt.itemSize,et=t.get(vt);if(et===void 0)continue;const xt=et.buffer,At=et.type,Ot=et.bytesPerElement,nt=At===s.INT||At===s.UNSIGNED_INT||vt.gpuType===wd;if(vt.isInterleavedBufferAttribute){const ot=vt.data,wt=ot.stride,It=vt.offset;if(ot.isInstancedInterleavedBuffer){for(let Xt=0;Xt<Y.locationSize;Xt++)v(Y.location+Xt,ot.meshPerAttribute);D.isInstancedMesh!==!0&&ct._maxInstanceCount===void 0&&(ct._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Xt=0;Xt<Y.locationSize;Xt++)y(Y.location+Xt);s.bindBuffer(s.ARRAY_BUFFER,xt);for(let Xt=0;Xt<Y.locationSize;Xt++)N(Y.location+Xt,L/Y.locationSize,At,Et,wt*Ot,(It+L/Y.locationSize*Xt)*Ot,nt)}else{if(vt.isInstancedBufferAttribute){for(let ot=0;ot<Y.locationSize;ot++)v(Y.location+ot,vt.meshPerAttribute);D.isInstancedMesh!==!0&&ct._maxInstanceCount===void 0&&(ct._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let ot=0;ot<Y.locationSize;ot++)y(Y.location+ot);s.bindBuffer(s.ARRAY_BUFFER,xt);for(let ot=0;ot<Y.locationSize;ot++)N(Y.location+ot,L/Y.locationSize,At,Et,L*Ot,L/Y.locationSize*ot*Ot,nt)}}else if(O!==void 0){const Et=O[j];if(Et!==void 0)switch(Et.length){case 2:s.vertexAttrib2fv(Y.location,Et);break;case 3:s.vertexAttrib3fv(Y.location,Et);break;case 4:s.vertexAttrib4fv(Y.location,Et);break;default:s.vertexAttrib1fv(Y.location,Et)}}}}I()}function H(){Z();for(const D in r){const V=r[D];for(const it in V){const ct=V[it];for(const gt in ct)S(ct[gt].object),delete ct[gt];delete V[it]}delete r[D]}}function F(D){if(r[D.id]===void 0)return;const V=r[D.id];for(const it in V){const ct=V[it];for(const gt in ct)S(ct[gt].object),delete ct[gt];delete V[it]}delete r[D.id]}function P(D){for(const V in r){const it=r[V];if(it[D.id]===void 0)continue;const ct=it[D.id];for(const gt in ct)S(ct[gt].object),delete ct[gt];delete it[D.id]}}function Z(){C(),h=!0,u!==l&&(u=l,p(u.object))}function C(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:Z,resetDefaultState:C,dispose:H,releaseStatesOfGeometry:F,releaseStatesOfProgram:P,initAttributes:R,enableAttribute:y,disableUnusedAttributes:I}}function Jb(s,t,i){let r;function l(p){r=p}function u(p,S){s.drawArrays(r,p,S),i.update(S,r,1)}function h(p,S,_){_!==0&&(s.drawArraysInstanced(r,p,S,_),i.update(S,r,_))}function d(p,S,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,S,0,_);let M=0;for(let A=0;A<_;A++)M+=S[A];i.update(M,r,1)}function m(p,S,_,x){if(_===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let A=0;A<p.length;A++)h(p[A],S[A],x[A]);else{M.multiDrawArraysInstancedWEBGL(r,p,0,S,0,x,0,_);let A=0;for(let R=0;R<_;R++)A+=S[R]*x[R];i.update(A,r,1)}}this.setMode=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function $b(s,t,i,r){let l;function u(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");l=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(P){return!(P!==gi&&r.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(P){const Z=P===Fs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Pi&&r.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==oa&&!Z)}function m(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const S=m(p);S!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",S,"instead."),p=S);const _=i.logarithmicDepthBuffer===!0,x=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),M=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),I=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),N=s.getParameter(s.MAX_VARYING_VECTORS),w=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),H=A>0,F=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:x,maxTextures:M,maxVertexTextures:A,maxTextureSize:R,maxCubemapSize:y,maxAttributes:v,maxVertexUniforms:I,maxVaryings:N,maxFragmentUniforms:w,vertexTextures:H,maxSamples:F}}function tT(s){const t=this;let i=null,r=0,l=!1,u=!1;const h=new Va,d=new ue,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const M=_.length!==0||x||r!==0||l;return l=x,r=_.length,M},this.beginShadows=function(){u=!0,S(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(_,x){i=S(_,x,0)},this.setState=function(_,x,M){const A=_.clippingPlanes,R=_.clipIntersection,y=_.clipShadows,v=s.get(_);if(!l||A===null||A.length===0||u&&!y)u?S(null):p();else{const I=u?0:r,N=I*4;let w=v.clippingState||null;m.value=w,w=S(A,x,N,M);for(let H=0;H!==N;++H)w[H]=i[H];v.clippingState=w,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=I}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function S(_,x,M,A){const R=_!==null?_.length:0;let y=null;if(R!==0){if(y=m.value,A!==!0||y===null){const v=M+R*4,I=x.matrixWorldInverse;d.getNormalMatrix(I),(y===null||y.length<v)&&(y=new Float32Array(v));for(let N=0,w=M;N!==R;++N,w+=4)h.copy(_[N]).applyMatrix4(I,d),h.normal.toArray(y,w),y[w+3]=h.constant}m.value=y,m.needsUpdate=!0}return t.numPlanes=R,t.numIntersection=0,y}}function eT(s){let t=new WeakMap;function i(h,d){return d===Wh?h.mapping=Ps:d===Yh&&(h.mapping=zs),h}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===Wh||d===Yh)if(t.has(h)){const m=t.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new aM(m.height);return p.fromEquirectangularTexture(s,h),t.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function u(){t=new WeakMap}return{get:r,dispose:u}}const ws=4,s0=[.125,.215,.35,.446,.526,.582],xr=20,wh=new av,o0=new He;let Uh=null,Lh=0,Nh=0,Oh=!1;const vr=(1+Math.sqrt(5))/2,bs=1/vr,l0=[new $(-vr,bs,0),new $(vr,bs,0),new $(-bs,0,vr),new $(bs,0,vr),new $(0,vr,-bs),new $(0,vr,bs),new $(-1,1,-1),new $(1,1,-1),new $(-1,1,1),new $(1,1,1)],nT=new $;class c0{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,r=.1,l=100,u={}){const{size:h=256,position:d=nT}=u;Uh=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Nh=this._renderer.getActiveMipmapLevel(),Oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,r,l,m,d),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=h0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=f0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Uh,Lh,Nh),this._renderer.xr.enabled=Oh,t.scissorTest=!1,Uc(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Ps||t.mapping===zs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Uh=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Nh=this._renderer.getActiveMipmapLevel(),Oh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(t,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:mi,minFilter:mi,generateMipmaps:!1,type:Fs,format:gi,colorSpace:Tr,depthBuffer:!1},l=u0(t,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=u0(t,i,r);const{_lodMax:u}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=iT(u)),this._blurMaterial=aT(u,t,i)}return l}_compileMaterial(t){const i=new Ni(this._lodPlanes[0],t);this._renderer.compile(i,wh)}_sceneToCubeUV(t,i,r,l,u){const m=new pi(90,1,i,r),p=[1,-1,1,1,1,1],S=[1,1,1,-1,-1,-1],_=this._renderer,x=_.autoClear,M=_.toneMapping;_.getClearColor(o0),_.toneMapping=ca,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null));const R=new Z0({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1}),y=new Ni(new $o,R);let v=!1;const I=t.background;I?I.isColor&&(R.color.copy(I),t.background=null,v=!0):(R.color.copy(o0),v=!0);for(let N=0;N<6;N++){const w=N%3;w===0?(m.up.set(0,p[N],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x+S[N],u.y,u.z)):w===1?(m.up.set(0,0,p[N]),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y+S[N],u.z)):(m.up.set(0,p[N],0),m.position.set(u.x,u.y,u.z),m.lookAt(u.x,u.y,u.z+S[N]));const H=this._cubeSize;Uc(l,w*H,N>2?H:0,H,H),_.setRenderTarget(l),v&&_.render(y,m),_.render(t,m)}y.geometry.dispose(),y.material.dispose(),_.toneMapping=M,_.autoClear=x,t.background=I}_textureToCubeUV(t,i){const r=this._renderer,l=t.mapping===Ps||t.mapping===zs;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=h0()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=f0());const u=l?this._cubemapMaterial:this._equirectMaterial,h=new Ni(this._lodPlanes[0],u),d=u.uniforms;d.envMap.value=t;const m=this._cubeSize;Uc(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(h,wh)}_applyPMREM(t){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let u=1;u<l;u++){const h=Math.sqrt(this._sigmas[u]*this._sigmas[u]-this._sigmas[u-1]*this._sigmas[u-1]),d=l0[(l-u-1)%l0.length];this._blur(t,u-1,u,h,d)}i.autoClear=r}_blur(t,i,r,l,u){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,r,l,"latitudinal",u),this._halfBlur(h,t,r,r,l,"longitudinal",u)}_halfBlur(t,i,r,l,u,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const S=3,_=new Ni(this._lodPlanes[l],p),x=p.uniforms,M=this._sizeLods[r]-1,A=isFinite(u)?Math.PI/(2*M):2*Math.PI/(2*xr-1),R=u/A,y=isFinite(u)?1+Math.floor(S*R):xr;y>xr&&console.warn(`sigmaRadians, ${u}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${xr}`);const v=[];let I=0;for(let P=0;P<xr;++P){const Z=P/R,C=Math.exp(-Z*Z/2);v.push(C),P===0?I+=C:P<y&&(I+=2*C)}for(let P=0;P<v.length;P++)v[P]=v[P]/I;x.envMap.value=t.texture,x.samples.value=y,x.weights.value=v,x.latitudinal.value=h==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:N}=this;x.dTheta.value=A,x.mipInt.value=N-r;const w=this._sizeLods[l],H=3*w*(l>N-ws?l-N+ws:0),F=4*(this._cubeSize-w);Uc(i,H,F,3*w,2*w),m.setRenderTarget(i),m.render(_,wh)}}function iT(s){const t=[],i=[],r=[];let l=s;const u=s-ws+1+s0.length;for(let h=0;h<u;h++){const d=Math.pow(2,l);i.push(d);let m=1/d;h>s-ws?m=s0[h-s+ws-1]:h===0&&(m=0),r.push(m);const p=1/(d-2),S=-p,_=1+p,x=[S,S,_,S,_,_,S,S,_,_,S,_],M=6,A=6,R=3,y=2,v=1,I=new Float32Array(R*A*M),N=new Float32Array(y*A*M),w=new Float32Array(v*A*M);for(let F=0;F<M;F++){const P=F%3*2/3-1,Z=F>2?0:-1,C=[P,Z,0,P+2/3,Z,0,P+2/3,Z+1,0,P,Z,0,P+2/3,Z+1,0,P,Z+1,0];I.set(C,R*A*F),N.set(x,y*A*F);const D=[F,F,F,F,F,F];w.set(D,v*A*F)}const H=new Cr;H.setAttribute("position",new Oi(I,R)),H.setAttribute("uv",new Oi(N,y)),H.setAttribute("faceIndex",new Oi(w,v)),t.push(H),l>ws&&l--}return{lodPlanes:t,sizeLods:i,sigmas:r}}function u0(s,t,i){const r=new Wa(s,t,i);return r.texture.mapping=Vc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Uc(s,t,i,r,l){s.viewport.set(t,i,r,l),s.scissor.set(t,i,r,l)}function aT(s,t,i){const r=new Float32Array(xr),l=new $(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:xr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Fd(),fragmentShader:`

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
		`,blending:la,depthTest:!1,depthWrite:!1})}function f0(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fd(),fragmentShader:`

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
		`,blending:la,depthTest:!1,depthWrite:!1})}function h0(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:la,depthTest:!1,depthWrite:!1})}function Fd(){return`

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
	`}function rT(s){let t=new WeakMap,i=null;function r(d){if(d&&d.isTexture){const m=d.mapping,p=m===Wh||m===Yh,S=m===Ps||m===zs;if(p||S){let _=t.get(d);const x=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return i===null&&(i=new c0(s)),_=p?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),_.texture;if(_!==void 0)return _.texture;{const M=d.image;return p&&M&&M.height>0||S&&M&&l(M)?(i===null&&(i=new c0(s)),_=p?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),d.addEventListener("dispose",u),_.texture):null}}}return d}function l(d){let m=0;const p=6;for(let S=0;S<p;S++)d[S]!==void 0&&m++;return m===p}function u(d){const m=d.target;m.removeEventListener("dispose",u);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function h(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function sT(s){const t={};function i(r){if(t[r]!==void 0)return t[r];let l;switch(r){case"WEBGL_depth_texture":l=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=s.getExtension(r)}return t[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&Ko("THREE.WebGLRenderer: "+r+" extension not supported."),l}}}function oT(s,t,i,r){const l={},u=new WeakMap;function h(_){const x=_.target;x.index!==null&&t.remove(x.index);for(const A in x.attributes)t.remove(x.attributes[A]);x.removeEventListener("dispose",h),delete l[x.id];const M=u.get(x);M&&(t.remove(M),u.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function d(_,x){return l[x.id]===!0||(x.addEventListener("dispose",h),l[x.id]=!0,i.memory.geometries++),x}function m(_){const x=_.attributes;for(const M in x)t.update(x[M],s.ARRAY_BUFFER)}function p(_){const x=[],M=_.index,A=_.attributes.position;let R=0;if(M!==null){const I=M.array;R=M.version;for(let N=0,w=I.length;N<w;N+=3){const H=I[N+0],F=I[N+1],P=I[N+2];x.push(H,F,F,P,P,H)}}else if(A!==void 0){const I=A.array;R=A.version;for(let N=0,w=I.length/3-1;N<w;N+=3){const H=N+0,F=N+1,P=N+2;x.push(H,F,F,P,P,H)}}else return;const y=new(X0(x)?Q0:K0)(x,1);y.version=R;const v=u.get(_);v&&t.remove(v),u.set(_,y)}function S(_){const x=u.get(_);if(x){const M=_.index;M!==null&&x.version<M.version&&p(_)}else p(_);return u.get(_)}return{get:d,update:m,getWireframeAttribute:S}}function lT(s,t,i){let r;function l(x){r=x}let u,h;function d(x){u=x.type,h=x.bytesPerElement}function m(x,M){s.drawElements(r,M,u,x*h),i.update(M,r,1)}function p(x,M,A){A!==0&&(s.drawElementsInstanced(r,M,u,x*h,A),i.update(M,r,A))}function S(x,M,A){if(A===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,M,0,u,x,0,A);let y=0;for(let v=0;v<A;v++)y+=M[v];i.update(y,r,1)}function _(x,M,A,R){if(A===0)return;const y=t.get("WEBGL_multi_draw");if(y===null)for(let v=0;v<x.length;v++)p(x[v]/h,M[v],R[v]);else{y.multiDrawElementsInstancedWEBGL(r,M,0,u,x,0,R,0,A);let v=0;for(let I=0;I<A;I++)v+=M[I]*R[I];i.update(v,r,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=S,this.renderMultiDrawInstances=_}function cT(s){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(u,h,d){switch(i.calls++,h){case s.TRIANGLES:i.triangles+=d*(u/3);break;case s.LINES:i.lines+=d*(u/2);break;case s.LINE_STRIP:i.lines+=d*(u-1);break;case s.LINE_LOOP:i.lines+=d*u;break;case s.POINTS:i.points+=d*u;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:r}}function uT(s,t,i){const r=new WeakMap,l=new nn;function u(h,d,m){const p=h.morphTargetInfluences,S=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=S!==void 0?S.length:0;let x=r.get(d);if(x===void 0||x.count!==_){let D=function(){Z.dispose(),r.delete(d),d.removeEventListener("dispose",D)};var M=D;x!==void 0&&x.texture.dispose();const A=d.morphAttributes.position!==void 0,R=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,v=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],N=d.morphAttributes.color||[];let w=0;A===!0&&(w=1),R===!0&&(w=2),y===!0&&(w=3);let H=d.attributes.position.count*w,F=1;H>t.maxTextureSize&&(F=Math.ceil(H/t.maxTextureSize),H=t.maxTextureSize);const P=new Float32Array(H*F*4*_),Z=new q0(P,H,F,_);Z.type=oa,Z.needsUpdate=!0;const C=w*4;for(let V=0;V<_;V++){const it=v[V],ct=I[V],gt=N[V],ft=H*F*4*V;for(let O=0;O<it.count;O++){const j=O*C;A===!0&&(l.fromBufferAttribute(it,O),P[ft+j+0]=l.x,P[ft+j+1]=l.y,P[ft+j+2]=l.z,P[ft+j+3]=0),R===!0&&(l.fromBufferAttribute(ct,O),P[ft+j+4]=l.x,P[ft+j+5]=l.y,P[ft+j+6]=l.z,P[ft+j+7]=0),y===!0&&(l.fromBufferAttribute(gt,O),P[ft+j+8]=l.x,P[ft+j+9]=l.y,P[ft+j+10]=l.z,P[ft+j+11]=gt.itemSize===4?l.w:1)}}x={count:_,texture:Z,size:new he(H,F)},r.set(d,x),d.addEventListener("dispose",D)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",h.morphTexture,i);else{let A=0;for(let y=0;y<p.length;y++)A+=p[y];const R=d.morphTargetsRelative?1:1-A;m.getUniforms().setValue(s,"morphTargetBaseInfluence",R),m.getUniforms().setValue(s,"morphTargetInfluences",p)}m.getUniforms().setValue(s,"morphTargetsTexture",x.texture,i),m.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}return{update:u}}function fT(s,t,i,r){let l=new WeakMap;function u(m){const p=r.render.frame,S=m.geometry,_=t.get(m,S);if(l.get(_)!==p&&(t.update(_),l.set(_,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,s.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,s.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const x=m.skeleton;l.get(x)!==p&&(x.update(),l.set(x,p))}return _}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:u,dispose:h}}const sv=new Xn,d0=new nv(1,1),ov=new q0,lv=new Gy,cv=new tv,p0=[],m0=[],g0=new Float32Array(16),_0=new Float32Array(9),v0=new Float32Array(4);function Gs(s,t,i){const r=s[0];if(r<=0||r>0)return s;const l=t*i;let u=p0[l];if(u===void 0&&(u=new Float32Array(l),p0[l]=u),t!==0){r.toArray(u,0);for(let h=1,d=0;h!==t;++h)d+=i,s[h].toArray(u,d)}return u}function mn(s,t){if(s.length!==t.length)return!1;for(let i=0,r=s.length;i<r;i++)if(s[i]!==t[i])return!1;return!0}function gn(s,t){for(let i=0,r=t.length;i<r;i++)s[i]=t[i]}function Xc(s,t){let i=m0[t];i===void 0&&(i=new Int32Array(t),m0[t]=i);for(let r=0;r!==t;++r)i[r]=s.allocateTextureUnit();return i}function hT(s,t){const i=this.cache;i[0]!==t&&(s.uniform1f(this.addr,t),i[0]=t)}function dT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(mn(i,t))return;s.uniform2fv(this.addr,t),gn(i,t)}}function pT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(mn(i,t))return;s.uniform3fv(this.addr,t),gn(i,t)}}function mT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(mn(i,t))return;s.uniform4fv(this.addr,t),gn(i,t)}}function gT(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(mn(i,t))return;s.uniformMatrix2fv(this.addr,!1,t),gn(i,t)}else{if(mn(i,r))return;v0.set(r),s.uniformMatrix2fv(this.addr,!1,v0),gn(i,r)}}function _T(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(mn(i,t))return;s.uniformMatrix3fv(this.addr,!1,t),gn(i,t)}else{if(mn(i,r))return;_0.set(r),s.uniformMatrix3fv(this.addr,!1,_0),gn(i,r)}}function vT(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(mn(i,t))return;s.uniformMatrix4fv(this.addr,!1,t),gn(i,t)}else{if(mn(i,r))return;g0.set(r),s.uniformMatrix4fv(this.addr,!1,g0),gn(i,r)}}function ST(s,t){const i=this.cache;i[0]!==t&&(s.uniform1i(this.addr,t),i[0]=t)}function xT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(mn(i,t))return;s.uniform2iv(this.addr,t),gn(i,t)}}function yT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(mn(i,t))return;s.uniform3iv(this.addr,t),gn(i,t)}}function MT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(mn(i,t))return;s.uniform4iv(this.addr,t),gn(i,t)}}function ET(s,t){const i=this.cache;i[0]!==t&&(s.uniform1ui(this.addr,t),i[0]=t)}function bT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(mn(i,t))return;s.uniform2uiv(this.addr,t),gn(i,t)}}function TT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(mn(i,t))return;s.uniform3uiv(this.addr,t),gn(i,t)}}function AT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(mn(i,t))return;s.uniform4uiv(this.addr,t),gn(i,t)}}function RT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l);let u;this.type===s.SAMPLER_2D_SHADOW?(d0.compareFunction=k0,u=d0):u=sv,i.setTexture2D(t||u,l)}function CT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(t||lv,l)}function DT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(t||cv,l)}function wT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(t||ov,l)}function UT(s){switch(s){case 5126:return hT;case 35664:return dT;case 35665:return pT;case 35666:return mT;case 35674:return gT;case 35675:return _T;case 35676:return vT;case 5124:case 35670:return ST;case 35667:case 35671:return xT;case 35668:case 35672:return yT;case 35669:case 35673:return MT;case 5125:return ET;case 36294:return bT;case 36295:return TT;case 36296:return AT;case 35678:case 36198:case 36298:case 36306:case 35682:return RT;case 35679:case 36299:case 36307:return CT;case 35680:case 36300:case 36308:case 36293:return DT;case 36289:case 36303:case 36311:case 36292:return wT}}function LT(s,t){s.uniform1fv(this.addr,t)}function NT(s,t){const i=Gs(t,this.size,2);s.uniform2fv(this.addr,i)}function OT(s,t){const i=Gs(t,this.size,3);s.uniform3fv(this.addr,i)}function PT(s,t){const i=Gs(t,this.size,4);s.uniform4fv(this.addr,i)}function zT(s,t){const i=Gs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,i)}function BT(s,t){const i=Gs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,i)}function IT(s,t){const i=Gs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,i)}function FT(s,t){s.uniform1iv(this.addr,t)}function HT(s,t){s.uniform2iv(this.addr,t)}function GT(s,t){s.uniform3iv(this.addr,t)}function VT(s,t){s.uniform4iv(this.addr,t)}function kT(s,t){s.uniform1uiv(this.addr,t)}function XT(s,t){s.uniform2uiv(this.addr,t)}function qT(s,t){s.uniform3uiv(this.addr,t)}function WT(s,t){s.uniform4uiv(this.addr,t)}function YT(s,t,i){const r=this.cache,l=t.length,u=Xc(i,l);mn(r,u)||(s.uniform1iv(this.addr,u),gn(r,u));for(let h=0;h!==l;++h)i.setTexture2D(t[h]||sv,u[h])}function jT(s,t,i){const r=this.cache,l=t.length,u=Xc(i,l);mn(r,u)||(s.uniform1iv(this.addr,u),gn(r,u));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||lv,u[h])}function ZT(s,t,i){const r=this.cache,l=t.length,u=Xc(i,l);mn(r,u)||(s.uniform1iv(this.addr,u),gn(r,u));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||cv,u[h])}function KT(s,t,i){const r=this.cache,l=t.length,u=Xc(i,l);mn(r,u)||(s.uniform1iv(this.addr,u),gn(r,u));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||ov,u[h])}function QT(s){switch(s){case 5126:return LT;case 35664:return NT;case 35665:return OT;case 35666:return PT;case 35674:return zT;case 35675:return BT;case 35676:return IT;case 5124:case 35670:return FT;case 35667:case 35671:return HT;case 35668:case 35672:return GT;case 35669:case 35673:return VT;case 5125:return kT;case 36294:return XT;case 36295:return qT;case 36296:return WT;case 35678:case 36198:case 36298:case 36306:case 35682:return YT;case 35679:case 36299:case 36307:return jT;case 35680:case 36300:case 36308:case 36293:return ZT;case 36289:case 36303:case 36311:case 36292:return KT}}class JT{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.setValue=UT(i.type)}}class $T{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=QT(i.type)}}class t1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,r){const l=this.seq;for(let u=0,h=l.length;u!==h;++u){const d=l[u];d.setValue(t,i[d.id],r)}}}const Ph=/(\w+)(\])?(\[|\.)?/g;function S0(s,t){s.seq.push(t),s.map[t.id]=t}function e1(s,t,i){const r=s.name,l=r.length;for(Ph.lastIndex=0;;){const u=Ph.exec(r),h=Ph.lastIndex;let d=u[1];const m=u[2]==="]",p=u[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){S0(i,p===void 0?new JT(d,s,t):new $T(d,s,t));break}else{let _=i.map[d];_===void 0&&(_=new t1(d),S0(i,_)),i=_}}}class Ic{constructor(t,i){this.seq=[],this.map={};const r=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<r;++l){const u=t.getActiveUniform(i,l),h=t.getUniformLocation(i,u.name);e1(u,h,this)}}setValue(t,i,r,l){const u=this.map[i];u!==void 0&&u.setValue(t,r,l)}setOptional(t,i,r){const l=i[r];l!==void 0&&this.setValue(t,r,l)}static upload(t,i,r,l){for(let u=0,h=i.length;u!==h;++u){const d=i[u],m=r[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const r=[];for(let l=0,u=t.length;l!==u;++l){const h=t[l];h.id in i&&r.push(h)}return r}}function x0(s,t,i){const r=s.createShader(t);return s.shaderSource(r,i),s.compileShader(r),r}const n1=37297;let i1=0;function a1(s,t){const i=s.split(`
`),r=[],l=Math.max(t-6,0),u=Math.min(t+6,i.length);for(let h=l;h<u;h++){const d=h+1;r.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return r.join(`
`)}const y0=new ue;function r1(s){Ce._getMatrix(y0,Ce.workingColorSpace,s);const t=`mat3( ${y0.elements.map(i=>i.toFixed(4))} )`;switch(Ce.getTransfer(s)){case Fc:return[t,"LinearTransferOETF"];case Ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function M0(s,t,i){const r=s.getShaderParameter(t,s.COMPILE_STATUS),u=(s.getShaderInfoLog(t)||"").trim();if(r&&u==="")return"";const h=/ERROR: 0:(\d+)/.exec(u);if(h){const d=parseInt(h[1]);return i.toUpperCase()+`

`+u+`

`+a1(s.getShaderSource(t),d)}else return u}function s1(s,t){const i=r1(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function o1(s,t){let i;switch(t){case $x:i="Linear";break;case ty:i="Reinhard";break;case ey:i="Cineon";break;case ny:i="ACESFilmic";break;case ay:i="AgX";break;case ry:i="Neutral";break;case iy:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+s+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Lc=new $;function l1(){Ce.getLuminanceCoefficients(Lc);const s=Lc.x.toFixed(4),t=Lc.y.toFixed(4),i=Lc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function c1(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Go).join(`
`)}function u1(s){const t=[];for(const i in s){const r=s[i];r!==!1&&t.push("#define "+i+" "+r)}return t.join(`
`)}function f1(s,t){const i={},r=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const u=s.getActiveAttrib(t,l),h=u.name;let d=1;u.type===s.FLOAT_MAT2&&(d=2),u.type===s.FLOAT_MAT3&&(d=3),u.type===s.FLOAT_MAT4&&(d=4),i[h]={type:u.type,location:s.getAttribLocation(t,h),locationSize:d}}return i}function Go(s){return s!==""}function E0(s,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function b0(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const h1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Td(s){return s.replace(h1,p1)}const d1=new Map;function p1(s,t){let i=fe[t];if(i===void 0){const r=d1.get(t);if(r!==void 0)i=fe[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw new Error("Can not resolve #include <"+t+">")}return Td(i)}const m1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function T0(s){return s.replace(m1,g1)}function g1(s,t,i,r){let l="";for(let u=parseInt(t);u<parseInt(i);u++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return l}function A0(s){let t=`precision ${s.precision} float;
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
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function _1(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===L0?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Lx?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ra&&(t="SHADOWMAP_TYPE_VSM"),t}function v1(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ps:case zs:t="ENVMAP_TYPE_CUBE";break;case Vc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function S1(s){let t="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===zs&&(t="ENVMAP_MODE_REFRACTION"),t}function x1(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case N0:t="ENVMAP_BLENDING_MULTIPLY";break;case Qx:t="ENVMAP_BLENDING_MIX";break;case Jx:t="ENVMAP_BLENDING_ADD";break}return t}function y1(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function M1(s,t,i,r){const l=s.getContext(),u=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=_1(i),p=v1(i),S=S1(i),_=x1(i),x=y1(i),M=c1(i),A=u1(u),R=l.createProgram();let y,v,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(Go).join(`
`),y.length>0&&(y+=`
`),v=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A].filter(Go).join(`
`),v.length>0&&(v+=`
`)):(y=[A0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+S:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Go).join(`
`),v=[A0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,A,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+S:"",i.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ca?"#define TONE_MAPPING":"",i.toneMapping!==ca?fe.tonemapping_pars_fragment:"",i.toneMapping!==ca?o1("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",fe.colorspace_pars_fragment,s1("linearToOutputTexel",i.outputColorSpace),l1(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Go).join(`
`)),h=Td(h),h=E0(h,i),h=b0(h,i),d=Td(d),d=E0(d,i),d=b0(d,i),h=T0(h),d=T0(d),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,v=["#define varying in",i.glslVersion===H_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===H_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const N=I+y+h,w=I+v+d,H=x0(l,l.VERTEX_SHADER,N),F=x0(l,l.FRAGMENT_SHADER,w);l.attachShader(R,H),l.attachShader(R,F),i.index0AttributeName!==void 0?l.bindAttribLocation(R,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(R,0,"position"),l.linkProgram(R);function P(V){if(s.debug.checkShaderErrors){const it=l.getProgramInfoLog(R)||"",ct=l.getShaderInfoLog(H)||"",gt=l.getShaderInfoLog(F)||"",ft=it.trim(),O=ct.trim(),j=gt.trim();let Y=!0,vt=!0;if(l.getProgramParameter(R,l.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(l,R,H,F);else{const Et=M0(l,H,"vertex"),L=M0(l,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(R,l.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+ft+`
`+Et+`
`+L)}else ft!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ft):(O===""||j==="")&&(vt=!1);vt&&(V.diagnostics={runnable:Y,programLog:ft,vertexShader:{log:O,prefix:y},fragmentShader:{log:j,prefix:v}})}l.deleteShader(H),l.deleteShader(F),Z=new Ic(l,R),C=f1(l,R)}let Z;this.getUniforms=function(){return Z===void 0&&P(this),Z};let C;this.getAttributes=function(){return C===void 0&&P(this),C};let D=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=l.getProgramParameter(R,n1)),D},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(R),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=i1++,this.cacheKey=t,this.usedTimes=1,this.program=R,this.vertexShader=H,this.fragmentShader=F,this}let E1=0;class b1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,r=t.fragmentShader,l=this._getShaderStage(i),u=this._getShaderStage(r),h=this._getShaderCacheForMaterial(t);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(u)===!1&&(h.add(u),u.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let r=i.get(t);return r===void 0&&(r=new Set,i.set(t,r)),r}_getShaderStage(t){const i=this.shaderCache;let r=i.get(t);return r===void 0&&(r=new T1(t),i.set(t,r)),r}}class T1{constructor(t){this.id=E1++,this.code=t,this.usedTimes=0}}function A1(s,t,i,r,l,u,h){const d=new Y0,m=new b1,p=new Set,S=[],_=l.logarithmicDepthBuffer,x=l.vertexTextures;let M=l.precision;const A={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(C){return p.add(C),C===0?"uv":`uv${C}`}function y(C,D,V,it,ct){const gt=it.fog,ft=ct.geometry,O=C.isMeshStandardMaterial?it.environment:null,j=(C.isMeshStandardMaterial?i:t).get(C.envMap||O),Y=j&&j.mapping===Vc?j.image.height:null,vt=A[C.type];C.precision!==null&&(M=l.getMaxPrecision(C.precision),M!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",M,"instead."));const Et=ft.morphAttributes.position||ft.morphAttributes.normal||ft.morphAttributes.color,L=Et!==void 0?Et.length:0;let et=0;ft.morphAttributes.position!==void 0&&(et=1),ft.morphAttributes.normal!==void 0&&(et=2),ft.morphAttributes.color!==void 0&&(et=3);let xt,At,Ot,nt;if(vt){const Ee=Ui[vt];xt=Ee.vertexShader,At=Ee.fragmentShader}else xt=C.vertexShader,At=C.fragmentShader,m.update(C),Ot=m.getVertexShaderID(C),nt=m.getFragmentShaderID(C);const ot=s.getRenderTarget(),wt=s.state.buffers.depth.getReversed(),It=ct.isInstancedMesh===!0,Xt=ct.isBatchedMesh===!0,de=!!C.map,an=!!C.matcap,B=!!j,Te=!!C.aoMap,ie=!!C.lightMap,te=!!C.bumpMap,qt=!!C.normalMap,Ge=!!C.displacementMap,kt=!!C.emissiveMap,re=!!C.metalnessMap,Ze=!!C.roughnessMap,je=C.anisotropy>0,U=C.clearcoat>0,E=C.dispersion>0,J=C.iridescence>0,ht=C.sheen>0,St=C.transmission>0,lt=je&&!!C.anisotropyMap,Zt=U&&!!C.clearcoatMap,Rt=U&&!!C.clearcoatNormalMap,Yt=U&&!!C.clearcoatRoughnessMap,jt=J&&!!C.iridescenceMap,bt=J&&!!C.iridescenceThicknessMap,Ct=ht&&!!C.sheenColorMap,Kt=ht&&!!C.sheenRoughnessMap,zt=!!C.specularMap,Ut=!!C.specularColorMap,oe=!!C.specularIntensityMap,k=St&&!!C.transmissionMap,Tt=St&&!!C.thicknessMap,Dt=!!C.gradientMap,Bt=!!C.alphaMap,yt=C.alphaTest>0,mt=!!C.alphaHash,Ft=!!C.extensions;let ae=ca;C.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ae=s.toneMapping);const Le={shaderID:vt,shaderType:C.type,shaderName:C.name,vertexShader:xt,fragmentShader:At,defines:C.defines,customVertexShaderID:Ot,customFragmentShaderID:nt,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:M,batching:Xt,batchingColor:Xt&&ct._colorsTexture!==null,instancing:It,instancingColor:It&&ct.instanceColor!==null,instancingMorph:It&&ct.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:ot===null?s.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Tr,alphaToCoverage:!!C.alphaToCoverage,map:de,matcap:an,envMap:B,envMapMode:B&&j.mapping,envMapCubeUVHeight:Y,aoMap:Te,lightMap:ie,bumpMap:te,normalMap:qt,displacementMap:x&&Ge,emissiveMap:kt,normalMapObjectSpace:qt&&C.normalMapType===uy,normalMapTangentSpace:qt&&C.normalMapType===cy,metalnessMap:re,roughnessMap:Ze,anisotropy:je,anisotropyMap:lt,clearcoat:U,clearcoatMap:Zt,clearcoatNormalMap:Rt,clearcoatRoughnessMap:Yt,dispersion:E,iridescence:J,iridescenceMap:jt,iridescenceThicknessMap:bt,sheen:ht,sheenColorMap:Ct,sheenRoughnessMap:Kt,specularMap:zt,specularColorMap:Ut,specularIntensityMap:oe,transmission:St,transmissionMap:k,thicknessMap:Tt,gradientMap:Dt,opaque:C.transparent===!1&&C.blending===Ls&&C.alphaToCoverage===!1,alphaMap:Bt,alphaTest:yt,alphaHash:mt,combine:C.combine,mapUv:de&&R(C.map.channel),aoMapUv:Te&&R(C.aoMap.channel),lightMapUv:ie&&R(C.lightMap.channel),bumpMapUv:te&&R(C.bumpMap.channel),normalMapUv:qt&&R(C.normalMap.channel),displacementMapUv:Ge&&R(C.displacementMap.channel),emissiveMapUv:kt&&R(C.emissiveMap.channel),metalnessMapUv:re&&R(C.metalnessMap.channel),roughnessMapUv:Ze&&R(C.roughnessMap.channel),anisotropyMapUv:lt&&R(C.anisotropyMap.channel),clearcoatMapUv:Zt&&R(C.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&R(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Yt&&R(C.clearcoatRoughnessMap.channel),iridescenceMapUv:jt&&R(C.iridescenceMap.channel),iridescenceThicknessMapUv:bt&&R(C.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&R(C.sheenColorMap.channel),sheenRoughnessMapUv:Kt&&R(C.sheenRoughnessMap.channel),specularMapUv:zt&&R(C.specularMap.channel),specularColorMapUv:Ut&&R(C.specularColorMap.channel),specularIntensityMapUv:oe&&R(C.specularIntensityMap.channel),transmissionMapUv:k&&R(C.transmissionMap.channel),thicknessMapUv:Tt&&R(C.thicknessMap.channel),alphaMapUv:Bt&&R(C.alphaMap.channel),vertexTangents:!!ft.attributes.tangent&&(qt||je),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!ft.attributes.color&&ft.attributes.color.itemSize===4,pointsUvs:ct.isPoints===!0&&!!ft.attributes.uv&&(de||Bt),fog:!!gt,useFog:C.fog===!0,fogExp2:!!gt&&gt.isFogExp2,flatShading:C.flatShading===!0&&C.wireframe===!1,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:wt,skinning:ct.isSkinnedMesh===!0,morphTargets:ft.morphAttributes.position!==void 0,morphNormals:ft.morphAttributes.normal!==void 0,morphColors:ft.morphAttributes.color!==void 0,morphTargetsCount:L,morphTextureStride:et,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:C.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:ae,decodeVideoTexture:de&&C.map.isVideoTexture===!0&&Ce.getTransfer(C.map.colorSpace)===Ie,decodeVideoTextureEmissive:kt&&C.emissiveMap.isVideoTexture===!0&&Ce.getTransfer(C.emissiveMap.colorSpace)===Ie,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===sa,flipSided:C.side===kn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:Ft&&C.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&C.extensions.multiDraw===!0||Xt)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return Le.vertexUv1s=p.has(1),Le.vertexUv2s=p.has(2),Le.vertexUv3s=p.has(3),p.clear(),Le}function v(C){const D=[];if(C.shaderID?D.push(C.shaderID):(D.push(C.customVertexShaderID),D.push(C.customFragmentShaderID)),C.defines!==void 0)for(const V in C.defines)D.push(V),D.push(C.defines[V]);return C.isRawShaderMaterial===!1&&(I(D,C),N(D,C),D.push(s.outputColorSpace)),D.push(C.customProgramCacheKey),D.join()}function I(C,D){C.push(D.precision),C.push(D.outputColorSpace),C.push(D.envMapMode),C.push(D.envMapCubeUVHeight),C.push(D.mapUv),C.push(D.alphaMapUv),C.push(D.lightMapUv),C.push(D.aoMapUv),C.push(D.bumpMapUv),C.push(D.normalMapUv),C.push(D.displacementMapUv),C.push(D.emissiveMapUv),C.push(D.metalnessMapUv),C.push(D.roughnessMapUv),C.push(D.anisotropyMapUv),C.push(D.clearcoatMapUv),C.push(D.clearcoatNormalMapUv),C.push(D.clearcoatRoughnessMapUv),C.push(D.iridescenceMapUv),C.push(D.iridescenceThicknessMapUv),C.push(D.sheenColorMapUv),C.push(D.sheenRoughnessMapUv),C.push(D.specularMapUv),C.push(D.specularColorMapUv),C.push(D.specularIntensityMapUv),C.push(D.transmissionMapUv),C.push(D.thicknessMapUv),C.push(D.combine),C.push(D.fogExp2),C.push(D.sizeAttenuation),C.push(D.morphTargetsCount),C.push(D.morphAttributeCount),C.push(D.numDirLights),C.push(D.numPointLights),C.push(D.numSpotLights),C.push(D.numSpotLightMaps),C.push(D.numHemiLights),C.push(D.numRectAreaLights),C.push(D.numDirLightShadows),C.push(D.numPointLightShadows),C.push(D.numSpotLightShadows),C.push(D.numSpotLightShadowsWithMaps),C.push(D.numLightProbes),C.push(D.shadowMapType),C.push(D.toneMapping),C.push(D.numClippingPlanes),C.push(D.numClipIntersection),C.push(D.depthPacking)}function N(C,D){d.disableAll(),D.supportsVertexTextures&&d.enable(0),D.instancing&&d.enable(1),D.instancingColor&&d.enable(2),D.instancingMorph&&d.enable(3),D.matcap&&d.enable(4),D.envMap&&d.enable(5),D.normalMapObjectSpace&&d.enable(6),D.normalMapTangentSpace&&d.enable(7),D.clearcoat&&d.enable(8),D.iridescence&&d.enable(9),D.alphaTest&&d.enable(10),D.vertexColors&&d.enable(11),D.vertexAlphas&&d.enable(12),D.vertexUv1s&&d.enable(13),D.vertexUv2s&&d.enable(14),D.vertexUv3s&&d.enable(15),D.vertexTangents&&d.enable(16),D.anisotropy&&d.enable(17),D.alphaHash&&d.enable(18),D.batching&&d.enable(19),D.dispersion&&d.enable(20),D.batchingColor&&d.enable(21),D.gradientMap&&d.enable(22),C.push(d.mask),d.disableAll(),D.fog&&d.enable(0),D.useFog&&d.enable(1),D.flatShading&&d.enable(2),D.logarithmicDepthBuffer&&d.enable(3),D.reversedDepthBuffer&&d.enable(4),D.skinning&&d.enable(5),D.morphTargets&&d.enable(6),D.morphNormals&&d.enable(7),D.morphColors&&d.enable(8),D.premultipliedAlpha&&d.enable(9),D.shadowMapEnabled&&d.enable(10),D.doubleSided&&d.enable(11),D.flipSided&&d.enable(12),D.useDepthPacking&&d.enable(13),D.dithering&&d.enable(14),D.transmission&&d.enable(15),D.sheen&&d.enable(16),D.opaque&&d.enable(17),D.pointsUvs&&d.enable(18),D.decodeVideoTexture&&d.enable(19),D.decodeVideoTextureEmissive&&d.enable(20),D.alphaToCoverage&&d.enable(21),C.push(d.mask)}function w(C){const D=A[C.type];let V;if(D){const it=Ui[D];V=tM.clone(it.uniforms)}else V=C.uniforms;return V}function H(C,D){let V;for(let it=0,ct=S.length;it<ct;it++){const gt=S[it];if(gt.cacheKey===D){V=gt,++V.usedTimes;break}}return V===void 0&&(V=new M1(s,D,C,u),S.push(V)),V}function F(C){if(--C.usedTimes===0){const D=S.indexOf(C);S[D]=S[S.length-1],S.pop(),C.destroy()}}function P(C){m.remove(C)}function Z(){m.dispose()}return{getParameters:y,getProgramCacheKey:v,getUniforms:w,acquireProgram:H,releaseProgram:F,releaseShaderCache:P,programs:S,dispose:Z}}function R1(){let s=new WeakMap;function t(h){return s.has(h)}function i(h){let d=s.get(h);return d===void 0&&(d={},s.set(h,d)),d}function r(h){s.delete(h)}function l(h,d,m){s.get(h)[d]=m}function u(){s=new WeakMap}return{has:t,get:i,remove:r,update:l,dispose:u}}function C1(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function R0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function C0(){const s=[];let t=0;const i=[],r=[],l=[];function u(){t=0,i.length=0,r.length=0,l.length=0}function h(_,x,M,A,R,y){let v=s[t];return v===void 0?(v={id:_.id,object:_,geometry:x,material:M,groupOrder:A,renderOrder:_.renderOrder,z:R,group:y},s[t]=v):(v.id=_.id,v.object=_,v.geometry=x,v.material=M,v.groupOrder=A,v.renderOrder=_.renderOrder,v.z=R,v.group=y),t++,v}function d(_,x,M,A,R,y){const v=h(_,x,M,A,R,y);M.transmission>0?r.push(v):M.transparent===!0?l.push(v):i.push(v)}function m(_,x,M,A,R,y){const v=h(_,x,M,A,R,y);M.transmission>0?r.unshift(v):M.transparent===!0?l.unshift(v):i.unshift(v)}function p(_,x){i.length>1&&i.sort(_||C1),r.length>1&&r.sort(x||R0),l.length>1&&l.sort(x||R0)}function S(){for(let _=t,x=s.length;_<x;_++){const M=s[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:r,transparent:l,init:u,push:d,unshift:m,finish:S,sort:p}}function D1(){let s=new WeakMap;function t(r,l){const u=s.get(r);let h;return u===void 0?(h=new C0,s.set(r,[h])):l>=u.length?(h=new C0,u.push(h)):h=u[l],h}function i(){s=new WeakMap}return{get:t,dispose:i}}function w1(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new $,color:new He};break;case"SpotLight":i={position:new $,direction:new $,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new $,color:new He,distance:0,decay:0};break;case"HemisphereLight":i={direction:new $,skyColor:new He,groundColor:new He};break;case"RectAreaLight":i={color:new He,position:new $,halfWidth:new $,halfHeight:new $};break}return s[t.id]=i,i}}}function U1(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=i,i}}}let L1=0;function N1(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function O1(s){const t=new w1,i=U1(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new $);const l=new $,u=new pn,h=new pn;function d(p){let S=0,_=0,x=0;for(let C=0;C<9;C++)r.probe[C].set(0,0,0);let M=0,A=0,R=0,y=0,v=0,I=0,N=0,w=0,H=0,F=0,P=0;p.sort(N1);for(let C=0,D=p.length;C<D;C++){const V=p[C],it=V.color,ct=V.intensity,gt=V.distance,ft=V.shadow&&V.shadow.map?V.shadow.map.texture:null;if(V.isAmbientLight)S+=it.r*ct,_+=it.g*ct,x+=it.b*ct;else if(V.isLightProbe){for(let O=0;O<9;O++)r.probe[O].addScaledVector(V.sh.coefficients[O],ct);P++}else if(V.isDirectionalLight){const O=t.get(V);if(O.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const j=V.shadow,Y=i.get(V);Y.shadowIntensity=j.intensity,Y.shadowBias=j.bias,Y.shadowNormalBias=j.normalBias,Y.shadowRadius=j.radius,Y.shadowMapSize=j.mapSize,r.directionalShadow[M]=Y,r.directionalShadowMap[M]=ft,r.directionalShadowMatrix[M]=V.shadow.matrix,I++}r.directional[M]=O,M++}else if(V.isSpotLight){const O=t.get(V);O.position.setFromMatrixPosition(V.matrixWorld),O.color.copy(it).multiplyScalar(ct),O.distance=gt,O.coneCos=Math.cos(V.angle),O.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),O.decay=V.decay,r.spot[R]=O;const j=V.shadow;if(V.map&&(r.spotLightMap[H]=V.map,H++,j.updateMatrices(V),V.castShadow&&F++),r.spotLightMatrix[R]=j.matrix,V.castShadow){const Y=i.get(V);Y.shadowIntensity=j.intensity,Y.shadowBias=j.bias,Y.shadowNormalBias=j.normalBias,Y.shadowRadius=j.radius,Y.shadowMapSize=j.mapSize,r.spotShadow[R]=Y,r.spotShadowMap[R]=ft,w++}R++}else if(V.isRectAreaLight){const O=t.get(V);O.color.copy(it).multiplyScalar(ct),O.halfWidth.set(V.width*.5,0,0),O.halfHeight.set(0,V.height*.5,0),r.rectArea[y]=O,y++}else if(V.isPointLight){const O=t.get(V);if(O.color.copy(V.color).multiplyScalar(V.intensity),O.distance=V.distance,O.decay=V.decay,V.castShadow){const j=V.shadow,Y=i.get(V);Y.shadowIntensity=j.intensity,Y.shadowBias=j.bias,Y.shadowNormalBias=j.normalBias,Y.shadowRadius=j.radius,Y.shadowMapSize=j.mapSize,Y.shadowCameraNear=j.camera.near,Y.shadowCameraFar=j.camera.far,r.pointShadow[A]=Y,r.pointShadowMap[A]=ft,r.pointShadowMatrix[A]=V.shadow.matrix,N++}r.point[A]=O,A++}else if(V.isHemisphereLight){const O=t.get(V);O.skyColor.copy(V.color).multiplyScalar(ct),O.groundColor.copy(V.groundColor).multiplyScalar(ct),r.hemi[v]=O,v++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Nt.LTC_FLOAT_1,r.rectAreaLTC2=Nt.LTC_FLOAT_2):(r.rectAreaLTC1=Nt.LTC_HALF_1,r.rectAreaLTC2=Nt.LTC_HALF_2)),r.ambient[0]=S,r.ambient[1]=_,r.ambient[2]=x;const Z=r.hash;(Z.directionalLength!==M||Z.pointLength!==A||Z.spotLength!==R||Z.rectAreaLength!==y||Z.hemiLength!==v||Z.numDirectionalShadows!==I||Z.numPointShadows!==N||Z.numSpotShadows!==w||Z.numSpotMaps!==H||Z.numLightProbes!==P)&&(r.directional.length=M,r.spot.length=R,r.rectArea.length=y,r.point.length=A,r.hemi.length=v,r.directionalShadow.length=I,r.directionalShadowMap.length=I,r.pointShadow.length=N,r.pointShadowMap.length=N,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=I,r.pointShadowMatrix.length=N,r.spotLightMatrix.length=w+H-F,r.spotLightMap.length=H,r.numSpotLightShadowsWithMaps=F,r.numLightProbes=P,Z.directionalLength=M,Z.pointLength=A,Z.spotLength=R,Z.rectAreaLength=y,Z.hemiLength=v,Z.numDirectionalShadows=I,Z.numPointShadows=N,Z.numSpotShadows=w,Z.numSpotMaps=H,Z.numLightProbes=P,r.version=L1++)}function m(p,S){let _=0,x=0,M=0,A=0,R=0;const y=S.matrixWorldInverse;for(let v=0,I=p.length;v<I;v++){const N=p[v];if(N.isDirectionalLight){const w=r.directional[_];w.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(y),_++}else if(N.isSpotLight){const w=r.spot[M];w.position.setFromMatrixPosition(N.matrixWorld),w.position.applyMatrix4(y),w.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(y),M++}else if(N.isRectAreaLight){const w=r.rectArea[A];w.position.setFromMatrixPosition(N.matrixWorld),w.position.applyMatrix4(y),h.identity(),u.copy(N.matrixWorld),u.premultiply(y),h.extractRotation(u),w.halfWidth.set(N.width*.5,0,0),w.halfHeight.set(0,N.height*.5,0),w.halfWidth.applyMatrix4(h),w.halfHeight.applyMatrix4(h),A++}else if(N.isPointLight){const w=r.point[x];w.position.setFromMatrixPosition(N.matrixWorld),w.position.applyMatrix4(y),x++}else if(N.isHemisphereLight){const w=r.hemi[R];w.direction.setFromMatrixPosition(N.matrixWorld),w.direction.transformDirection(y),R++}}}return{setup:d,setupView:m,state:r}}function D0(s){const t=new O1(s),i=[],r=[];function l(S){p.camera=S,i.length=0,r.length=0}function u(S){i.push(S)}function h(S){r.push(S)}function d(){t.setup(i)}function m(S){t.setupView(i,S)}const p={lightsArray:i,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:u,pushShadow:h}}function P1(s){let t=new WeakMap;function i(l,u=0){const h=t.get(l);let d;return h===void 0?(d=new D0(s),t.set(l,[d])):u>=h.length?(d=new D0(s),h.push(d)):d=h[u],d}function r(){t=new WeakMap}return{get:i,dispose:r}}const z1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,B1=`uniform sampler2D shadow_pass;
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
}`;function I1(s,t,i){let r=new ev;const l=new he,u=new he,h=new nn,d=new uM({depthPacking:ly}),m=new fM,p={},S=i.maxTextureSize,_={[qa]:kn,[kn]:qa,[sa]:sa},x=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:z1,fragmentShader:B1}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const A=new Cr;A.setAttribute("position",new Oi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new Ni(A,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=L0;let v=this.type;this.render=function(F,P,Z){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||F.length===0)return;const C=s.getRenderTarget(),D=s.getActiveCubeFace(),V=s.getActiveMipmapLevel(),it=s.state;it.setBlending(la),it.buffers.depth.getReversed()===!0?it.buffers.color.setClear(0,0,0,0):it.buffers.color.setClear(1,1,1,1),it.buffers.depth.setTest(!0),it.setScissorTest(!1);const ct=v!==ra&&this.type===ra,gt=v===ra&&this.type!==ra;for(let ft=0,O=F.length;ft<O;ft++){const j=F[ft],Y=j.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;l.copy(Y.mapSize);const vt=Y.getFrameExtents();if(l.multiply(vt),u.copy(Y.mapSize),(l.x>S||l.y>S)&&(l.x>S&&(u.x=Math.floor(S/vt.x),l.x=u.x*vt.x,Y.mapSize.x=u.x),l.y>S&&(u.y=Math.floor(S/vt.y),l.y=u.y*vt.y,Y.mapSize.y=u.y)),Y.map===null||ct===!0||gt===!0){const L=this.type!==ra?{minFilter:bi,magFilter:bi}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Wa(l.x,l.y,L),Y.map.texture.name=j.name+".shadowMap",Y.camera.updateProjectionMatrix()}s.setRenderTarget(Y.map),s.clear();const Et=Y.getViewportCount();for(let L=0;L<Et;L++){const et=Y.getViewport(L);h.set(u.x*et.x,u.y*et.y,u.x*et.z,u.y*et.w),it.viewport(h),Y.updateMatrices(j,L),r=Y.getFrustum(),w(P,Z,Y.camera,j,this.type)}Y.isPointLightShadow!==!0&&this.type===ra&&I(Y,Z),Y.needsUpdate=!1}v=this.type,y.needsUpdate=!1,s.setRenderTarget(C,D,V)};function I(F,P){const Z=t.update(R);x.defines.VSM_SAMPLES!==F.blurSamples&&(x.defines.VSM_SAMPLES=F.blurSamples,M.defines.VSM_SAMPLES=F.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),F.mapPass===null&&(F.mapPass=new Wa(l.x,l.y)),x.uniforms.shadow_pass.value=F.map.texture,x.uniforms.resolution.value=F.mapSize,x.uniforms.radius.value=F.radius,s.setRenderTarget(F.mapPass),s.clear(),s.renderBufferDirect(P,null,Z,x,R,null),M.uniforms.shadow_pass.value=F.mapPass.texture,M.uniforms.resolution.value=F.mapSize,M.uniforms.radius.value=F.radius,s.setRenderTarget(F.map),s.clear(),s.renderBufferDirect(P,null,Z,M,R,null)}function N(F,P,Z,C){let D=null;const V=Z.isPointLight===!0?F.customDistanceMaterial:F.customDepthMaterial;if(V!==void 0)D=V;else if(D=Z.isPointLight===!0?m:d,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const it=D.uuid,ct=P.uuid;let gt=p[it];gt===void 0&&(gt={},p[it]=gt);let ft=gt[ct];ft===void 0&&(ft=D.clone(),gt[ct]=ft,P.addEventListener("dispose",H)),D=ft}if(D.visible=P.visible,D.wireframe=P.wireframe,C===ra?D.side=P.shadowSide!==null?P.shadowSide:P.side:D.side=P.shadowSide!==null?P.shadowSide:_[P.side],D.alphaMap=P.alphaMap,D.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,D.map=P.map,D.clipShadows=P.clipShadows,D.clippingPlanes=P.clippingPlanes,D.clipIntersection=P.clipIntersection,D.displacementMap=P.displacementMap,D.displacementScale=P.displacementScale,D.displacementBias=P.displacementBias,D.wireframeLinewidth=P.wireframeLinewidth,D.linewidth=P.linewidth,Z.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const it=s.properties.get(D);it.light=Z}return D}function w(F,P,Z,C,D){if(F.visible===!1)return;if(F.layers.test(P.layers)&&(F.isMesh||F.isLine||F.isPoints)&&(F.castShadow||F.receiveShadow&&D===ra)&&(!F.frustumCulled||r.intersectsObject(F))){F.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,F.matrixWorld);const ct=t.update(F),gt=F.material;if(Array.isArray(gt)){const ft=ct.groups;for(let O=0,j=ft.length;O<j;O++){const Y=ft[O],vt=gt[Y.materialIndex];if(vt&&vt.visible){const Et=N(F,vt,C,D);F.onBeforeShadow(s,F,P,Z,ct,Et,Y),s.renderBufferDirect(Z,null,ct,Et,F,Y),F.onAfterShadow(s,F,P,Z,ct,Et,Y)}}}else if(gt.visible){const ft=N(F,gt,C,D);F.onBeforeShadow(s,F,P,Z,ct,ft,null),s.renderBufferDirect(Z,null,ct,ft,F,null),F.onAfterShadow(s,F,P,Z,ct,ft,null)}}const it=F.children;for(let ct=0,gt=it.length;ct<gt;ct++)w(it[ct],P,Z,C,D)}function H(F){F.target.removeEventListener("dispose",H);for(const Z in p){const C=p[Z],D=F.target.uuid;D in C&&(C[D].dispose(),delete C[D])}}}const F1={[Fh]:Hh,[Gh]:Xh,[Vh]:qh,[Os]:kh,[Hh]:Fh,[Xh]:Gh,[qh]:Vh,[kh]:Os};function H1(s,t){function i(){let k=!1;const Tt=new nn;let Dt=null;const Bt=new nn(0,0,0,0);return{setMask:function(yt){Dt!==yt&&!k&&(s.colorMask(yt,yt,yt,yt),Dt=yt)},setLocked:function(yt){k=yt},setClear:function(yt,mt,Ft,ae,Le){Le===!0&&(yt*=ae,mt*=ae,Ft*=ae),Tt.set(yt,mt,Ft,ae),Bt.equals(Tt)===!1&&(s.clearColor(yt,mt,Ft,ae),Bt.copy(Tt))},reset:function(){k=!1,Dt=null,Bt.set(-1,0,0,0)}}}function r(){let k=!1,Tt=!1,Dt=null,Bt=null,yt=null;return{setReversed:function(mt){if(Tt!==mt){const Ft=t.get("EXT_clip_control");mt?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT),Tt=mt;const ae=yt;yt=null,this.setClear(ae)}},getReversed:function(){return Tt},setTest:function(mt){mt?ot(s.DEPTH_TEST):wt(s.DEPTH_TEST)},setMask:function(mt){Dt!==mt&&!k&&(s.depthMask(mt),Dt=mt)},setFunc:function(mt){if(Tt&&(mt=F1[mt]),Bt!==mt){switch(mt){case Fh:s.depthFunc(s.NEVER);break;case Hh:s.depthFunc(s.ALWAYS);break;case Gh:s.depthFunc(s.LESS);break;case Os:s.depthFunc(s.LEQUAL);break;case Vh:s.depthFunc(s.EQUAL);break;case kh:s.depthFunc(s.GEQUAL);break;case Xh:s.depthFunc(s.GREATER);break;case qh:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Bt=mt}},setLocked:function(mt){k=mt},setClear:function(mt){yt!==mt&&(Tt&&(mt=1-mt),s.clearDepth(mt),yt=mt)},reset:function(){k=!1,Dt=null,Bt=null,yt=null,Tt=!1}}}function l(){let k=!1,Tt=null,Dt=null,Bt=null,yt=null,mt=null,Ft=null,ae=null,Le=null;return{setTest:function(Ee){k||(Ee?ot(s.STENCIL_TEST):wt(s.STENCIL_TEST))},setMask:function(Ee){Tt!==Ee&&!k&&(s.stencilMask(Ee),Tt=Ee)},setFunc:function(Ee,wn,ii){(Dt!==Ee||Bt!==wn||yt!==ii)&&(s.stencilFunc(Ee,wn,ii),Dt=Ee,Bt=wn,yt=ii)},setOp:function(Ee,wn,ii){(mt!==Ee||Ft!==wn||ae!==ii)&&(s.stencilOp(Ee,wn,ii),mt=Ee,Ft=wn,ae=ii)},setLocked:function(Ee){k=Ee},setClear:function(Ee){Le!==Ee&&(s.clearStencil(Ee),Le=Ee)},reset:function(){k=!1,Tt=null,Dt=null,Bt=null,yt=null,mt=null,Ft=null,ae=null,Le=null}}}const u=new i,h=new r,d=new l,m=new WeakMap,p=new WeakMap;let S={},_={},x=new WeakMap,M=[],A=null,R=!1,y=null,v=null,I=null,N=null,w=null,H=null,F=null,P=new He(0,0,0),Z=0,C=!1,D=null,V=null,it=null,ct=null,gt=null;const ft=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,j=0;const Y=s.getParameter(s.VERSION);Y.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(Y)[1]),O=j>=1):Y.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),O=j>=2);let vt=null,Et={};const L=s.getParameter(s.SCISSOR_BOX),et=s.getParameter(s.VIEWPORT),xt=new nn().fromArray(L),At=new nn().fromArray(et);function Ot(k,Tt,Dt,Bt){const yt=new Uint8Array(4),mt=s.createTexture();s.bindTexture(k,mt),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ft=0;Ft<Dt;Ft++)k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY?s.texImage3D(Tt,0,s.RGBA,1,1,Bt,0,s.RGBA,s.UNSIGNED_BYTE,yt):s.texImage2D(Tt+Ft,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,yt);return mt}const nt={};nt[s.TEXTURE_2D]=Ot(s.TEXTURE_2D,s.TEXTURE_2D,1),nt[s.TEXTURE_CUBE_MAP]=Ot(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[s.TEXTURE_2D_ARRAY]=Ot(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),nt[s.TEXTURE_3D]=Ot(s.TEXTURE_3D,s.TEXTURE_3D,1,1),u.setClear(0,0,0,1),h.setClear(1),d.setClear(0),ot(s.DEPTH_TEST),h.setFunc(Os),te(!1),qt(O_),ot(s.CULL_FACE),Te(la);function ot(k){S[k]!==!0&&(s.enable(k),S[k]=!0)}function wt(k){S[k]!==!1&&(s.disable(k),S[k]=!1)}function It(k,Tt){return _[k]!==Tt?(s.bindFramebuffer(k,Tt),_[k]=Tt,k===s.DRAW_FRAMEBUFFER&&(_[s.FRAMEBUFFER]=Tt),k===s.FRAMEBUFFER&&(_[s.DRAW_FRAMEBUFFER]=Tt),!0):!1}function Xt(k,Tt){let Dt=M,Bt=!1;if(k){Dt=x.get(Tt),Dt===void 0&&(Dt=[],x.set(Tt,Dt));const yt=k.textures;if(Dt.length!==yt.length||Dt[0]!==s.COLOR_ATTACHMENT0){for(let mt=0,Ft=yt.length;mt<Ft;mt++)Dt[mt]=s.COLOR_ATTACHMENT0+mt;Dt.length=yt.length,Bt=!0}}else Dt[0]!==s.BACK&&(Dt[0]=s.BACK,Bt=!0);Bt&&s.drawBuffers(Dt)}function de(k){return A!==k?(s.useProgram(k),A=k,!0):!1}const an={[Sr]:s.FUNC_ADD,[Ox]:s.FUNC_SUBTRACT,[Px]:s.FUNC_REVERSE_SUBTRACT};an[zx]=s.MIN,an[Bx]=s.MAX;const B={[Ix]:s.ZERO,[Fx]:s.ONE,[Hx]:s.SRC_COLOR,[Bh]:s.SRC_ALPHA,[Wx]:s.SRC_ALPHA_SATURATE,[Xx]:s.DST_COLOR,[Vx]:s.DST_ALPHA,[Gx]:s.ONE_MINUS_SRC_COLOR,[Ih]:s.ONE_MINUS_SRC_ALPHA,[qx]:s.ONE_MINUS_DST_COLOR,[kx]:s.ONE_MINUS_DST_ALPHA,[Yx]:s.CONSTANT_COLOR,[jx]:s.ONE_MINUS_CONSTANT_COLOR,[Zx]:s.CONSTANT_ALPHA,[Kx]:s.ONE_MINUS_CONSTANT_ALPHA};function Te(k,Tt,Dt,Bt,yt,mt,Ft,ae,Le,Ee){if(k===la){R===!0&&(wt(s.BLEND),R=!1);return}if(R===!1&&(ot(s.BLEND),R=!0),k!==Nx){if(k!==y||Ee!==C){if((v!==Sr||w!==Sr)&&(s.blendEquation(s.FUNC_ADD),v=Sr,w=Sr),Ee)switch(k){case Ls:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case P_:s.blendFunc(s.ONE,s.ONE);break;case z_:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case B_:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Ls:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case P_:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case z_:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case B_:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}I=null,N=null,H=null,F=null,P.set(0,0,0),Z=0,y=k,C=Ee}return}yt=yt||Tt,mt=mt||Dt,Ft=Ft||Bt,(Tt!==v||yt!==w)&&(s.blendEquationSeparate(an[Tt],an[yt]),v=Tt,w=yt),(Dt!==I||Bt!==N||mt!==H||Ft!==F)&&(s.blendFuncSeparate(B[Dt],B[Bt],B[mt],B[Ft]),I=Dt,N=Bt,H=mt,F=Ft),(ae.equals(P)===!1||Le!==Z)&&(s.blendColor(ae.r,ae.g,ae.b,Le),P.copy(ae),Z=Le),y=k,C=!1}function ie(k,Tt){k.side===sa?wt(s.CULL_FACE):ot(s.CULL_FACE);let Dt=k.side===kn;Tt&&(Dt=!Dt),te(Dt),k.blending===Ls&&k.transparent===!1?Te(la):Te(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),h.setFunc(k.depthFunc),h.setTest(k.depthTest),h.setMask(k.depthWrite),u.setMask(k.colorWrite);const Bt=k.stencilWrite;d.setTest(Bt),Bt&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),kt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ot(s.SAMPLE_ALPHA_TO_COVERAGE):wt(s.SAMPLE_ALPHA_TO_COVERAGE)}function te(k){D!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),D=k)}function qt(k){k!==wx?(ot(s.CULL_FACE),k!==V&&(k===O_?s.cullFace(s.BACK):k===Ux?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):wt(s.CULL_FACE),V=k}function Ge(k){k!==it&&(O&&s.lineWidth(k),it=k)}function kt(k,Tt,Dt){k?(ot(s.POLYGON_OFFSET_FILL),(ct!==Tt||gt!==Dt)&&(s.polygonOffset(Tt,Dt),ct=Tt,gt=Dt)):wt(s.POLYGON_OFFSET_FILL)}function re(k){k?ot(s.SCISSOR_TEST):wt(s.SCISSOR_TEST)}function Ze(k){k===void 0&&(k=s.TEXTURE0+ft-1),vt!==k&&(s.activeTexture(k),vt=k)}function je(k,Tt,Dt){Dt===void 0&&(vt===null?Dt=s.TEXTURE0+ft-1:Dt=vt);let Bt=Et[Dt];Bt===void 0&&(Bt={type:void 0,texture:void 0},Et[Dt]=Bt),(Bt.type!==k||Bt.texture!==Tt)&&(vt!==Dt&&(s.activeTexture(Dt),vt=Dt),s.bindTexture(k,Tt||nt[k]),Bt.type=k,Bt.texture=Tt)}function U(){const k=Et[vt];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function E(){try{s.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function J(){try{s.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ht(){try{s.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function St(){try{s.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function lt(){try{s.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Zt(){try{s.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Rt(){try{s.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Yt(){try{s.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function jt(){try{s.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function bt(){try{s.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ct(k){xt.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),xt.copy(k))}function Kt(k){At.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),At.copy(k))}function zt(k,Tt){let Dt=p.get(Tt);Dt===void 0&&(Dt=new WeakMap,p.set(Tt,Dt));let Bt=Dt.get(k);Bt===void 0&&(Bt=s.getUniformBlockIndex(Tt,k.name),Dt.set(k,Bt))}function Ut(k,Tt){const Bt=p.get(Tt).get(k);m.get(Tt)!==Bt&&(s.uniformBlockBinding(Tt,Bt,k.__bindingPointIndex),m.set(Tt,Bt))}function oe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),h.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),S={},vt=null,Et={},_={},x=new WeakMap,M=[],A=null,R=!1,y=null,v=null,I=null,N=null,w=null,H=null,F=null,P=new He(0,0,0),Z=0,C=!1,D=null,V=null,it=null,ct=null,gt=null,xt.set(0,0,s.canvas.width,s.canvas.height),At.set(0,0,s.canvas.width,s.canvas.height),u.reset(),h.reset(),d.reset()}return{buffers:{color:u,depth:h,stencil:d},enable:ot,disable:wt,bindFramebuffer:It,drawBuffers:Xt,useProgram:de,setBlending:Te,setMaterial:ie,setFlipSided:te,setCullFace:qt,setLineWidth:Ge,setPolygonOffset:kt,setScissorTest:re,activeTexture:Ze,bindTexture:je,unbindTexture:U,compressedTexImage2D:E,compressedTexImage3D:J,texImage2D:jt,texImage3D:bt,updateUBOMapping:zt,uniformBlockBinding:Ut,texStorage2D:Rt,texStorage3D:Yt,texSubImage2D:ht,texSubImage3D:St,compressedTexSubImage2D:lt,compressedTexSubImage3D:Zt,scissor:Ct,viewport:Kt,reset:oe}}function G1(s,t,i,r,l,u,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new he,S=new WeakMap;let _;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(U,E){return M?new OffscreenCanvas(U,E):Gc("canvas")}function R(U,E,J){let ht=1;const St=je(U);if((St.width>J||St.height>J)&&(ht=J/Math.max(St.width,St.height)),ht<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const lt=Math.floor(ht*St.width),Zt=Math.floor(ht*St.height);_===void 0&&(_=A(lt,Zt));const Rt=E?A(lt,Zt):_;return Rt.width=lt,Rt.height=Zt,Rt.getContext("2d").drawImage(U,0,0,lt,Zt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+St.width+"x"+St.height+") to ("+lt+"x"+Zt+")."),Rt}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+St.width+"x"+St.height+")."),U;return U}function y(U){return U.generateMipmaps}function v(U){s.generateMipmap(U)}function I(U){return U.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?s.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function N(U,E,J,ht,St=!1){if(U!==null){if(s[U]!==void 0)return s[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let lt=E;if(E===s.RED&&(J===s.FLOAT&&(lt=s.R32F),J===s.HALF_FLOAT&&(lt=s.R16F),J===s.UNSIGNED_BYTE&&(lt=s.R8)),E===s.RED_INTEGER&&(J===s.UNSIGNED_BYTE&&(lt=s.R8UI),J===s.UNSIGNED_SHORT&&(lt=s.R16UI),J===s.UNSIGNED_INT&&(lt=s.R32UI),J===s.BYTE&&(lt=s.R8I),J===s.SHORT&&(lt=s.R16I),J===s.INT&&(lt=s.R32I)),E===s.RG&&(J===s.FLOAT&&(lt=s.RG32F),J===s.HALF_FLOAT&&(lt=s.RG16F),J===s.UNSIGNED_BYTE&&(lt=s.RG8)),E===s.RG_INTEGER&&(J===s.UNSIGNED_BYTE&&(lt=s.RG8UI),J===s.UNSIGNED_SHORT&&(lt=s.RG16UI),J===s.UNSIGNED_INT&&(lt=s.RG32UI),J===s.BYTE&&(lt=s.RG8I),J===s.SHORT&&(lt=s.RG16I),J===s.INT&&(lt=s.RG32I)),E===s.RGB_INTEGER&&(J===s.UNSIGNED_BYTE&&(lt=s.RGB8UI),J===s.UNSIGNED_SHORT&&(lt=s.RGB16UI),J===s.UNSIGNED_INT&&(lt=s.RGB32UI),J===s.BYTE&&(lt=s.RGB8I),J===s.SHORT&&(lt=s.RGB16I),J===s.INT&&(lt=s.RGB32I)),E===s.RGBA_INTEGER&&(J===s.UNSIGNED_BYTE&&(lt=s.RGBA8UI),J===s.UNSIGNED_SHORT&&(lt=s.RGBA16UI),J===s.UNSIGNED_INT&&(lt=s.RGBA32UI),J===s.BYTE&&(lt=s.RGBA8I),J===s.SHORT&&(lt=s.RGBA16I),J===s.INT&&(lt=s.RGBA32I)),E===s.RGB&&(J===s.UNSIGNED_INT_5_9_9_9_REV&&(lt=s.RGB9_E5),J===s.UNSIGNED_INT_10F_11F_11F_REV&&(lt=s.R11F_G11F_B10F)),E===s.RGBA){const Zt=St?Fc:Ce.getTransfer(ht);J===s.FLOAT&&(lt=s.RGBA32F),J===s.HALF_FLOAT&&(lt=s.RGBA16F),J===s.UNSIGNED_BYTE&&(lt=Zt===Ie?s.SRGB8_ALPHA8:s.RGBA8),J===s.UNSIGNED_SHORT_4_4_4_4&&(lt=s.RGBA4),J===s.UNSIGNED_SHORT_5_5_5_1&&(lt=s.RGB5_A1)}return(lt===s.R16F||lt===s.R32F||lt===s.RG16F||lt===s.RG32F||lt===s.RGBA16F||lt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),lt}function w(U,E){let J;return U?E===null||E===br||E===Wo?J=s.DEPTH24_STENCIL8:E===oa?J=s.DEPTH32F_STENCIL8:E===qo&&(J=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===br||E===Wo?J=s.DEPTH_COMPONENT24:E===oa?J=s.DEPTH_COMPONENT32F:E===qo&&(J=s.DEPTH_COMPONENT16),J}function H(U,E){return y(U)===!0||U.isFramebufferTexture&&U.minFilter!==bi&&U.minFilter!==mi?Math.log2(Math.max(E.width,E.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?E.mipmaps.length:1}function F(U){const E=U.target;E.removeEventListener("dispose",F),Z(E),E.isVideoTexture&&S.delete(E)}function P(U){const E=U.target;E.removeEventListener("dispose",P),D(E)}function Z(U){const E=r.get(U);if(E.__webglInit===void 0)return;const J=U.source,ht=x.get(J);if(ht){const St=ht[E.__cacheKey];St.usedTimes--,St.usedTimes===0&&C(U),Object.keys(ht).length===0&&x.delete(J)}r.remove(U)}function C(U){const E=r.get(U);s.deleteTexture(E.__webglTexture);const J=U.source,ht=x.get(J);delete ht[E.__cacheKey],h.memory.textures--}function D(U){const E=r.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),r.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let ht=0;ht<6;ht++){if(Array.isArray(E.__webglFramebuffer[ht]))for(let St=0;St<E.__webglFramebuffer[ht].length;St++)s.deleteFramebuffer(E.__webglFramebuffer[ht][St]);else s.deleteFramebuffer(E.__webglFramebuffer[ht]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[ht])}else{if(Array.isArray(E.__webglFramebuffer))for(let ht=0;ht<E.__webglFramebuffer.length;ht++)s.deleteFramebuffer(E.__webglFramebuffer[ht]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ht=0;ht<E.__webglColorRenderbuffer.length;ht++)E.__webglColorRenderbuffer[ht]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[ht]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const J=U.textures;for(let ht=0,St=J.length;ht<St;ht++){const lt=r.get(J[ht]);lt.__webglTexture&&(s.deleteTexture(lt.__webglTexture),h.memory.textures--),r.remove(J[ht])}r.remove(U)}let V=0;function it(){V=0}function ct(){const U=V;return U>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+l.maxTextures),V+=1,U}function gt(U){const E=[];return E.push(U.wrapS),E.push(U.wrapT),E.push(U.wrapR||0),E.push(U.magFilter),E.push(U.minFilter),E.push(U.anisotropy),E.push(U.internalFormat),E.push(U.format),E.push(U.type),E.push(U.generateMipmaps),E.push(U.premultiplyAlpha),E.push(U.flipY),E.push(U.unpackAlignment),E.push(U.colorSpace),E.join()}function ft(U,E){const J=r.get(U);if(U.isVideoTexture&&re(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&J.__version!==U.version){const ht=U.image;if(ht===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ht.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{nt(J,U,E);return}}else U.isExternalTexture&&(J.__webglTexture=U.sourceTexture?U.sourceTexture:null);i.bindTexture(s.TEXTURE_2D,J.__webglTexture,s.TEXTURE0+E)}function O(U,E){const J=r.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&J.__version!==U.version){nt(J,U,E);return}i.bindTexture(s.TEXTURE_2D_ARRAY,J.__webglTexture,s.TEXTURE0+E)}function j(U,E){const J=r.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&J.__version!==U.version){nt(J,U,E);return}i.bindTexture(s.TEXTURE_3D,J.__webglTexture,s.TEXTURE0+E)}function Y(U,E){const J=r.get(U);if(U.version>0&&J.__version!==U.version){ot(J,U,E);return}i.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture,s.TEXTURE0+E)}const vt={[jh]:s.REPEAT,[yr]:s.CLAMP_TO_EDGE,[Zh]:s.MIRRORED_REPEAT},Et={[bi]:s.NEAREST,[sy]:s.NEAREST_MIPMAP_NEAREST,[fc]:s.NEAREST_MIPMAP_LINEAR,[mi]:s.LINEAR,[oh]:s.LINEAR_MIPMAP_NEAREST,[Mr]:s.LINEAR_MIPMAP_LINEAR},L={[fy]:s.NEVER,[_y]:s.ALWAYS,[hy]:s.LESS,[k0]:s.LEQUAL,[dy]:s.EQUAL,[gy]:s.GEQUAL,[py]:s.GREATER,[my]:s.NOTEQUAL};function et(U,E){if(E.type===oa&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===mi||E.magFilter===oh||E.magFilter===fc||E.magFilter===Mr||E.minFilter===mi||E.minFilter===oh||E.minFilter===fc||E.minFilter===Mr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(U,s.TEXTURE_WRAP_S,vt[E.wrapS]),s.texParameteri(U,s.TEXTURE_WRAP_T,vt[E.wrapT]),(U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY)&&s.texParameteri(U,s.TEXTURE_WRAP_R,vt[E.wrapR]),s.texParameteri(U,s.TEXTURE_MAG_FILTER,Et[E.magFilter]),s.texParameteri(U,s.TEXTURE_MIN_FILTER,Et[E.minFilter]),E.compareFunction&&(s.texParameteri(U,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(U,s.TEXTURE_COMPARE_FUNC,L[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===bi||E.minFilter!==fc&&E.minFilter!==Mr||E.type===oa&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const J=t.get("EXT_texture_filter_anisotropic");s.texParameterf(U,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function xt(U,E){let J=!1;U.__webglInit===void 0&&(U.__webglInit=!0,E.addEventListener("dispose",F));const ht=E.source;let St=x.get(ht);St===void 0&&(St={},x.set(ht,St));const lt=gt(E);if(lt!==U.__cacheKey){St[lt]===void 0&&(St[lt]={texture:s.createTexture(),usedTimes:0},h.memory.textures++,J=!0),St[lt].usedTimes++;const Zt=St[U.__cacheKey];Zt!==void 0&&(St[U.__cacheKey].usedTimes--,Zt.usedTimes===0&&C(E)),U.__cacheKey=lt,U.__webglTexture=St[lt].texture}return J}function At(U,E,J){return Math.floor(Math.floor(U/J)/E)}function Ot(U,E,J,ht){const lt=U.updateRanges;if(lt.length===0)i.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,J,ht,E.data);else{lt.sort((bt,Ct)=>bt.start-Ct.start);let Zt=0;for(let bt=1;bt<lt.length;bt++){const Ct=lt[Zt],Kt=lt[bt],zt=Ct.start+Ct.count,Ut=At(Kt.start,E.width,4),oe=At(Ct.start,E.width,4);Kt.start<=zt+1&&Ut===oe&&At(Kt.start+Kt.count-1,E.width,4)===Ut?Ct.count=Math.max(Ct.count,Kt.start+Kt.count-Ct.start):(++Zt,lt[Zt]=Kt)}lt.length=Zt+1;const Rt=s.getParameter(s.UNPACK_ROW_LENGTH),Yt=s.getParameter(s.UNPACK_SKIP_PIXELS),jt=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let bt=0,Ct=lt.length;bt<Ct;bt++){const Kt=lt[bt],zt=Math.floor(Kt.start/4),Ut=Math.ceil(Kt.count/4),oe=zt%E.width,k=Math.floor(zt/E.width),Tt=Ut,Dt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,oe),s.pixelStorei(s.UNPACK_SKIP_ROWS,k),i.texSubImage2D(s.TEXTURE_2D,0,oe,k,Tt,Dt,J,ht,E.data)}U.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,Rt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Yt),s.pixelStorei(s.UNPACK_SKIP_ROWS,jt)}}function nt(U,E,J){let ht=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ht=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ht=s.TEXTURE_3D);const St=xt(U,E),lt=E.source;i.bindTexture(ht,U.__webglTexture,s.TEXTURE0+J);const Zt=r.get(lt);if(lt.version!==Zt.__version||St===!0){i.activeTexture(s.TEXTURE0+J);const Rt=Ce.getPrimaries(Ce.workingColorSpace),Yt=E.colorSpace===ka?null:Ce.getPrimaries(E.colorSpace),jt=E.colorSpace===ka||Rt===Yt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let bt=R(E.image,!1,l.maxTextureSize);bt=Ze(E,bt);const Ct=u.convert(E.format,E.colorSpace),Kt=u.convert(E.type);let zt=N(E.internalFormat,Ct,Kt,E.colorSpace,E.isVideoTexture);et(ht,E);let Ut;const oe=E.mipmaps,k=E.isVideoTexture!==!0,Tt=Zt.__version===void 0||St===!0,Dt=lt.dataReady,Bt=H(E,bt);if(E.isDepthTexture)zt=w(E.format===jo,E.type),Tt&&(k?i.texStorage2D(s.TEXTURE_2D,1,zt,bt.width,bt.height):i.texImage2D(s.TEXTURE_2D,0,zt,bt.width,bt.height,0,Ct,Kt,null));else if(E.isDataTexture)if(oe.length>0){k&&Tt&&i.texStorage2D(s.TEXTURE_2D,Bt,zt,oe[0].width,oe[0].height);for(let yt=0,mt=oe.length;yt<mt;yt++)Ut=oe[yt],k?Dt&&i.texSubImage2D(s.TEXTURE_2D,yt,0,0,Ut.width,Ut.height,Ct,Kt,Ut.data):i.texImage2D(s.TEXTURE_2D,yt,zt,Ut.width,Ut.height,0,Ct,Kt,Ut.data);E.generateMipmaps=!1}else k?(Tt&&i.texStorage2D(s.TEXTURE_2D,Bt,zt,bt.width,bt.height),Dt&&Ot(E,bt,Ct,Kt)):i.texImage2D(s.TEXTURE_2D,0,zt,bt.width,bt.height,0,Ct,Kt,bt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){k&&Tt&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Bt,zt,oe[0].width,oe[0].height,bt.depth);for(let yt=0,mt=oe.length;yt<mt;yt++)if(Ut=oe[yt],E.format!==gi)if(Ct!==null)if(k){if(Dt)if(E.layerUpdates.size>0){const Ft=r0(Ut.width,Ut.height,E.format,E.type);for(const ae of E.layerUpdates){const Le=Ut.data.subarray(ae*Ft/Ut.data.BYTES_PER_ELEMENT,(ae+1)*Ft/Ut.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,yt,0,0,ae,Ut.width,Ut.height,1,Ct,Le)}E.clearLayerUpdates()}else i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,yt,0,0,0,Ut.width,Ut.height,bt.depth,Ct,Ut.data)}else i.compressedTexImage3D(s.TEXTURE_2D_ARRAY,yt,zt,Ut.width,Ut.height,bt.depth,0,Ut.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?Dt&&i.texSubImage3D(s.TEXTURE_2D_ARRAY,yt,0,0,0,Ut.width,Ut.height,bt.depth,Ct,Kt,Ut.data):i.texImage3D(s.TEXTURE_2D_ARRAY,yt,zt,Ut.width,Ut.height,bt.depth,0,Ct,Kt,Ut.data)}else{k&&Tt&&i.texStorage2D(s.TEXTURE_2D,Bt,zt,oe[0].width,oe[0].height);for(let yt=0,mt=oe.length;yt<mt;yt++)Ut=oe[yt],E.format!==gi?Ct!==null?k?Dt&&i.compressedTexSubImage2D(s.TEXTURE_2D,yt,0,0,Ut.width,Ut.height,Ct,Ut.data):i.compressedTexImage2D(s.TEXTURE_2D,yt,zt,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?Dt&&i.texSubImage2D(s.TEXTURE_2D,yt,0,0,Ut.width,Ut.height,Ct,Kt,Ut.data):i.texImage2D(s.TEXTURE_2D,yt,zt,Ut.width,Ut.height,0,Ct,Kt,Ut.data)}else if(E.isDataArrayTexture)if(k){if(Tt&&i.texStorage3D(s.TEXTURE_2D_ARRAY,Bt,zt,bt.width,bt.height,bt.depth),Dt)if(E.layerUpdates.size>0){const yt=r0(bt.width,bt.height,E.format,E.type);for(const mt of E.layerUpdates){const Ft=bt.data.subarray(mt*yt/bt.data.BYTES_PER_ELEMENT,(mt+1)*yt/bt.data.BYTES_PER_ELEMENT);i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,mt,bt.width,bt.height,1,Ct,Kt,Ft)}E.clearLayerUpdates()}else i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,bt.width,bt.height,bt.depth,Ct,Kt,bt.data)}else i.texImage3D(s.TEXTURE_2D_ARRAY,0,zt,bt.width,bt.height,bt.depth,0,Ct,Kt,bt.data);else if(E.isData3DTexture)k?(Tt&&i.texStorage3D(s.TEXTURE_3D,Bt,zt,bt.width,bt.height,bt.depth),Dt&&i.texSubImage3D(s.TEXTURE_3D,0,0,0,0,bt.width,bt.height,bt.depth,Ct,Kt,bt.data)):i.texImage3D(s.TEXTURE_3D,0,zt,bt.width,bt.height,bt.depth,0,Ct,Kt,bt.data);else if(E.isFramebufferTexture){if(Tt)if(k)i.texStorage2D(s.TEXTURE_2D,Bt,zt,bt.width,bt.height);else{let yt=bt.width,mt=bt.height;for(let Ft=0;Ft<Bt;Ft++)i.texImage2D(s.TEXTURE_2D,Ft,zt,yt,mt,0,Ct,Kt,null),yt>>=1,mt>>=1}}else if(oe.length>0){if(k&&Tt){const yt=je(oe[0]);i.texStorage2D(s.TEXTURE_2D,Bt,zt,yt.width,yt.height)}for(let yt=0,mt=oe.length;yt<mt;yt++)Ut=oe[yt],k?Dt&&i.texSubImage2D(s.TEXTURE_2D,yt,0,0,Ct,Kt,Ut):i.texImage2D(s.TEXTURE_2D,yt,zt,Ct,Kt,Ut);E.generateMipmaps=!1}else if(k){if(Tt){const yt=je(bt);i.texStorage2D(s.TEXTURE_2D,Bt,zt,yt.width,yt.height)}Dt&&i.texSubImage2D(s.TEXTURE_2D,0,0,0,Ct,Kt,bt)}else i.texImage2D(s.TEXTURE_2D,0,zt,Ct,Kt,bt);y(E)&&v(ht),Zt.__version=lt.version,E.onUpdate&&E.onUpdate(E)}U.__version=E.version}function ot(U,E,J){if(E.image.length!==6)return;const ht=xt(U,E),St=E.source;i.bindTexture(s.TEXTURE_CUBE_MAP,U.__webglTexture,s.TEXTURE0+J);const lt=r.get(St);if(St.version!==lt.__version||ht===!0){i.activeTexture(s.TEXTURE0+J);const Zt=Ce.getPrimaries(Ce.workingColorSpace),Rt=E.colorSpace===ka?null:Ce.getPrimaries(E.colorSpace),Yt=E.colorSpace===ka||Zt===Rt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);const jt=E.isCompressedTexture||E.image[0].isCompressedTexture,bt=E.image[0]&&E.image[0].isDataTexture,Ct=[];for(let mt=0;mt<6;mt++)!jt&&!bt?Ct[mt]=R(E.image[mt],!0,l.maxCubemapSize):Ct[mt]=bt?E.image[mt].image:E.image[mt],Ct[mt]=Ze(E,Ct[mt]);const Kt=Ct[0],zt=u.convert(E.format,E.colorSpace),Ut=u.convert(E.type),oe=N(E.internalFormat,zt,Ut,E.colorSpace),k=E.isVideoTexture!==!0,Tt=lt.__version===void 0||ht===!0,Dt=St.dataReady;let Bt=H(E,Kt);et(s.TEXTURE_CUBE_MAP,E);let yt;if(jt){k&&Tt&&i.texStorage2D(s.TEXTURE_CUBE_MAP,Bt,oe,Kt.width,Kt.height);for(let mt=0;mt<6;mt++){yt=Ct[mt].mipmaps;for(let Ft=0;Ft<yt.length;Ft++){const ae=yt[Ft];E.format!==gi?zt!==null?k?Dt&&i.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ft,0,0,ae.width,ae.height,zt,ae.data):i.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ft,oe,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?Dt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ft,0,0,ae.width,ae.height,zt,Ut,ae.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ft,oe,ae.width,ae.height,0,zt,Ut,ae.data)}}}else{if(yt=E.mipmaps,k&&Tt){yt.length>0&&Bt++;const mt=je(Ct[0]);i.texStorage2D(s.TEXTURE_CUBE_MAP,Bt,oe,mt.width,mt.height)}for(let mt=0;mt<6;mt++)if(bt){k?Dt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,Ct[mt].width,Ct[mt].height,zt,Ut,Ct[mt].data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,oe,Ct[mt].width,Ct[mt].height,0,zt,Ut,Ct[mt].data);for(let Ft=0;Ft<yt.length;Ft++){const Le=yt[Ft].image[mt].image;k?Dt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ft+1,0,0,Le.width,Le.height,zt,Ut,Le.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ft+1,oe,Le.width,Le.height,0,zt,Ut,Le.data)}}else{k?Dt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,zt,Ut,Ct[mt]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,oe,zt,Ut,Ct[mt]);for(let Ft=0;Ft<yt.length;Ft++){const ae=yt[Ft];k?Dt&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ft+1,0,0,zt,Ut,ae.image[mt]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ft+1,oe,zt,Ut,ae.image[mt])}}}y(E)&&v(s.TEXTURE_CUBE_MAP),lt.__version=St.version,E.onUpdate&&E.onUpdate(E)}U.__version=E.version}function wt(U,E,J,ht,St,lt){const Zt=u.convert(J.format,J.colorSpace),Rt=u.convert(J.type),Yt=N(J.internalFormat,Zt,Rt,J.colorSpace),jt=r.get(E),bt=r.get(J);if(bt.__renderTarget=E,!jt.__hasExternalTextures){const Ct=Math.max(1,E.width>>lt),Kt=Math.max(1,E.height>>lt);St===s.TEXTURE_3D||St===s.TEXTURE_2D_ARRAY?i.texImage3D(St,lt,Yt,Ct,Kt,E.depth,0,Zt,Rt,null):i.texImage2D(St,lt,Yt,Ct,Kt,0,Zt,Rt,null)}i.bindFramebuffer(s.FRAMEBUFFER,U),kt(E)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ht,St,bt.__webglTexture,0,Ge(E)):(St===s.TEXTURE_2D||St>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&St<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ht,St,bt.__webglTexture,lt),i.bindFramebuffer(s.FRAMEBUFFER,null)}function It(U,E,J){if(s.bindRenderbuffer(s.RENDERBUFFER,U),E.depthBuffer){const ht=E.depthTexture,St=ht&&ht.isDepthTexture?ht.type:null,lt=w(E.stencilBuffer,St),Zt=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Rt=Ge(E);kt(E)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Rt,lt,E.width,E.height):J?s.renderbufferStorageMultisample(s.RENDERBUFFER,Rt,lt,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,lt,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Zt,s.RENDERBUFFER,U)}else{const ht=E.textures;for(let St=0;St<ht.length;St++){const lt=ht[St],Zt=u.convert(lt.format,lt.colorSpace),Rt=u.convert(lt.type),Yt=N(lt.internalFormat,Zt,Rt,lt.colorSpace),jt=Ge(E);J&&kt(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,jt,Yt,E.width,E.height):kt(E)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,jt,Yt,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,Yt,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Xt(U,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(s.FRAMEBUFFER,U),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ht=r.get(E.depthTexture);ht.__renderTarget=E,(!ht.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),ft(E.depthTexture,0);const St=ht.__webglTexture,lt=Ge(E);if(E.depthTexture.format===Yo)kt(E)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,St,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,St,0);else if(E.depthTexture.format===jo)kt(E)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,St,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,St,0);else throw new Error("Unknown depthTexture format")}function de(U){const E=r.get(U),J=U.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==U.depthTexture){const ht=U.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ht){const St=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ht.removeEventListener("dispose",St)};ht.addEventListener("dispose",St),E.__depthDisposeCallback=St}E.__boundDepthTexture=ht}if(U.depthTexture&&!E.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");const ht=U.texture.mipmaps;ht&&ht.length>0?Xt(E.__webglFramebuffer[0],U):Xt(E.__webglFramebuffer,U)}else if(J){E.__webglDepthbuffer=[];for(let ht=0;ht<6;ht++)if(i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[ht]),E.__webglDepthbuffer[ht]===void 0)E.__webglDepthbuffer[ht]=s.createRenderbuffer(),It(E.__webglDepthbuffer[ht],U,!1);else{const St=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=E.__webglDepthbuffer[ht];s.bindRenderbuffer(s.RENDERBUFFER,lt),s.framebufferRenderbuffer(s.FRAMEBUFFER,St,s.RENDERBUFFER,lt)}}else{const ht=U.texture.mipmaps;if(ht&&ht.length>0?i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),It(E.__webglDepthbuffer,U,!1);else{const St=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,lt),s.framebufferRenderbuffer(s.FRAMEBUFFER,St,s.RENDERBUFFER,lt)}}i.bindFramebuffer(s.FRAMEBUFFER,null)}function an(U,E,J){const ht=r.get(U);E!==void 0&&wt(ht.__webglFramebuffer,U,U.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),J!==void 0&&de(U)}function B(U){const E=U.texture,J=r.get(U),ht=r.get(E);U.addEventListener("dispose",P);const St=U.textures,lt=U.isWebGLCubeRenderTarget===!0,Zt=St.length>1;if(Zt||(ht.__webglTexture===void 0&&(ht.__webglTexture=s.createTexture()),ht.__version=E.version,h.memory.textures++),lt){J.__webglFramebuffer=[];for(let Rt=0;Rt<6;Rt++)if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer[Rt]=[];for(let Yt=0;Yt<E.mipmaps.length;Yt++)J.__webglFramebuffer[Rt][Yt]=s.createFramebuffer()}else J.__webglFramebuffer[Rt]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer=[];for(let Rt=0;Rt<E.mipmaps.length;Rt++)J.__webglFramebuffer[Rt]=s.createFramebuffer()}else J.__webglFramebuffer=s.createFramebuffer();if(Zt)for(let Rt=0,Yt=St.length;Rt<Yt;Rt++){const jt=r.get(St[Rt]);jt.__webglTexture===void 0&&(jt.__webglTexture=s.createTexture(),h.memory.textures++)}if(U.samples>0&&kt(U)===!1){J.__webglMultisampledFramebuffer=s.createFramebuffer(),J.__webglColorRenderbuffer=[],i.bindFramebuffer(s.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Rt=0;Rt<St.length;Rt++){const Yt=St[Rt];J.__webglColorRenderbuffer[Rt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,J.__webglColorRenderbuffer[Rt]);const jt=u.convert(Yt.format,Yt.colorSpace),bt=u.convert(Yt.type),Ct=N(Yt.internalFormat,jt,bt,Yt.colorSpace,U.isXRRenderTarget===!0),Kt=Ge(U);s.renderbufferStorageMultisample(s.RENDERBUFFER,Kt,Ct,U.width,U.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.RENDERBUFFER,J.__webglColorRenderbuffer[Rt])}s.bindRenderbuffer(s.RENDERBUFFER,null),U.depthBuffer&&(J.__webglDepthRenderbuffer=s.createRenderbuffer(),It(J.__webglDepthRenderbuffer,U,!0)),i.bindFramebuffer(s.FRAMEBUFFER,null)}}if(lt){i.bindTexture(s.TEXTURE_CUBE_MAP,ht.__webglTexture),et(s.TEXTURE_CUBE_MAP,E);for(let Rt=0;Rt<6;Rt++)if(E.mipmaps&&E.mipmaps.length>0)for(let Yt=0;Yt<E.mipmaps.length;Yt++)wt(J.__webglFramebuffer[Rt][Yt],U,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,Yt);else wt(J.__webglFramebuffer[Rt],U,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,0);y(E)&&v(s.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Zt){for(let Rt=0,Yt=St.length;Rt<Yt;Rt++){const jt=St[Rt],bt=r.get(jt);let Ct=s.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ct=U.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(Ct,bt.__webglTexture),et(Ct,jt),wt(J.__webglFramebuffer,U,jt,s.COLOR_ATTACHMENT0+Rt,Ct,0),y(jt)&&v(Ct)}i.unbindTexture()}else{let Rt=s.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Rt=U.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(Rt,ht.__webglTexture),et(Rt,E),E.mipmaps&&E.mipmaps.length>0)for(let Yt=0;Yt<E.mipmaps.length;Yt++)wt(J.__webglFramebuffer[Yt],U,E,s.COLOR_ATTACHMENT0,Rt,Yt);else wt(J.__webglFramebuffer,U,E,s.COLOR_ATTACHMENT0,Rt,0);y(E)&&v(Rt),i.unbindTexture()}U.depthBuffer&&de(U)}function Te(U){const E=U.textures;for(let J=0,ht=E.length;J<ht;J++){const St=E[J];if(y(St)){const lt=I(U),Zt=r.get(St).__webglTexture;i.bindTexture(lt,Zt),v(lt),i.unbindTexture()}}}const ie=[],te=[];function qt(U){if(U.samples>0){if(kt(U)===!1){const E=U.textures,J=U.width,ht=U.height;let St=s.COLOR_BUFFER_BIT;const lt=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Zt=r.get(U),Rt=E.length>1;if(Rt)for(let jt=0;jt<E.length;jt++)i.bindFramebuffer(s.FRAMEBUFFER,Zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+jt,s.RENDERBUFFER,null),i.bindFramebuffer(s.FRAMEBUFFER,Zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+jt,s.TEXTURE_2D,null,0);i.bindFramebuffer(s.READ_FRAMEBUFFER,Zt.__webglMultisampledFramebuffer);const Yt=U.texture.mipmaps;Yt&&Yt.length>0?i.bindFramebuffer(s.DRAW_FRAMEBUFFER,Zt.__webglFramebuffer[0]):i.bindFramebuffer(s.DRAW_FRAMEBUFFER,Zt.__webglFramebuffer);for(let jt=0;jt<E.length;jt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(St|=s.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(St|=s.STENCIL_BUFFER_BIT)),Rt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Zt.__webglColorRenderbuffer[jt]);const bt=r.get(E[jt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,bt,0)}s.blitFramebuffer(0,0,J,ht,0,0,J,ht,St,s.NEAREST),m===!0&&(ie.length=0,te.length=0,ie.push(s.COLOR_ATTACHMENT0+jt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(ie.push(lt),te.push(lt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,te)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ie))}if(i.bindFramebuffer(s.READ_FRAMEBUFFER,null),i.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Rt)for(let jt=0;jt<E.length;jt++){i.bindFramebuffer(s.FRAMEBUFFER,Zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+jt,s.RENDERBUFFER,Zt.__webglColorRenderbuffer[jt]);const bt=r.get(E[jt]).__webglTexture;i.bindFramebuffer(s.FRAMEBUFFER,Zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+jt,s.TEXTURE_2D,bt,0)}i.bindFramebuffer(s.DRAW_FRAMEBUFFER,Zt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&m){const E=U.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function Ge(U){return Math.min(l.maxSamples,U.samples)}function kt(U){const E=r.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function re(U){const E=h.render.frame;S.get(U)!==E&&(S.set(U,E),U.update())}function Ze(U,E){const J=U.colorSpace,ht=U.format,St=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||J!==Tr&&J!==ka&&(Ce.getTransfer(J)===Ie?(ht!==gi||St!==Pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),E}function je(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(p.width=U.naturalWidth||U.width,p.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(p.width=U.displayWidth,p.height=U.displayHeight):(p.width=U.width,p.height=U.height),p}this.allocateTextureUnit=ct,this.resetTextureUnits=it,this.setTexture2D=ft,this.setTexture2DArray=O,this.setTexture3D=j,this.setTextureCube=Y,this.rebindTextures=an,this.setupRenderTarget=B,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=qt,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=kt}function V1(s,t){function i(r,l=ka){let u;const h=Ce.getTransfer(l);if(r===Pi)return s.UNSIGNED_BYTE;if(r===Ud)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Ld)return s.UNSIGNED_SHORT_5_5_5_1;if(r===B0)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===I0)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===P0)return s.BYTE;if(r===z0)return s.SHORT;if(r===qo)return s.UNSIGNED_SHORT;if(r===wd)return s.INT;if(r===br)return s.UNSIGNED_INT;if(r===oa)return s.FLOAT;if(r===Fs)return s.HALF_FLOAT;if(r===F0)return s.ALPHA;if(r===H0)return s.RGB;if(r===gi)return s.RGBA;if(r===Yo)return s.DEPTH_COMPONENT;if(r===jo)return s.DEPTH_STENCIL;if(r===G0)return s.RED;if(r===Nd)return s.RED_INTEGER;if(r===V0)return s.RG;if(r===Od)return s.RG_INTEGER;if(r===Pd)return s.RGBA_INTEGER;if(r===Oc||r===Pc||r===zc||r===Bc)if(h===Ie)if(u=t.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(r===Oc)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Pc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===zc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Bc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=t.get("WEBGL_compressed_texture_s3tc"),u!==null){if(r===Oc)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Pc)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===zc)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Bc)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Kh||r===Qh||r===Jh||r===$h)if(u=t.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(r===Kh)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Qh)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Jh)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===$h)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===td||r===ed||r===nd)if(u=t.get("WEBGL_compressed_texture_etc"),u!==null){if(r===td||r===ed)return h===Ie?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(r===nd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===id||r===ad||r===rd||r===sd||r===od||r===ld||r===cd||r===ud||r===fd||r===hd||r===dd||r===pd||r===md||r===gd)if(u=t.get("WEBGL_compressed_texture_astc"),u!==null){if(r===id)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ad)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===rd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===sd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===od)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ld)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===cd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ud)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===fd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===hd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===dd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===pd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===md)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===gd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===_d||r===vd||r===Sd)if(u=t.get("EXT_texture_compression_bptc"),u!==null){if(r===_d)return h===Ie?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===vd)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Sd)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===xd||r===yd||r===Md||r===Ed)if(u=t.get("EXT_texture_compression_rgtc"),u!==null){if(r===xd)return u.COMPRESSED_RED_RGTC1_EXT;if(r===yd)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Md)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ed)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Wo?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:i}}const k1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,X1=`
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

}`;class q1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const r=new iv(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,r=new ei({vertexShader:k1,fragmentShader:X1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Ni(new tl(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class W1 extends Rr{constructor(t,i){super();const r=this;let l=null,u=1,h=null,d="local-floor",m=1,p=null,S=null,_=null,x=null,M=null,A=null;const R=typeof XRWebGLBinding<"u",y=new q1,v={},I=i.getContextAttributes();let N=null,w=null;const H=[],F=[],P=new he;let Z=null;const C=new pi;C.viewport=new nn;const D=new pi;D.viewport=new nn;const V=[C,D],it=new hM;let ct=null,gt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let ot=H[nt];return ot===void 0&&(ot=new Ch,H[nt]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(nt){let ot=H[nt];return ot===void 0&&(ot=new Ch,H[nt]=ot),ot.getGripSpace()},this.getHand=function(nt){let ot=H[nt];return ot===void 0&&(ot=new Ch,H[nt]=ot),ot.getHandSpace()};function ft(nt){const ot=F.indexOf(nt.inputSource);if(ot===-1)return;const wt=H[ot];wt!==void 0&&(wt.update(nt.inputSource,nt.frame,p||h),wt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function O(){l.removeEventListener("select",ft),l.removeEventListener("selectstart",ft),l.removeEventListener("selectend",ft),l.removeEventListener("squeeze",ft),l.removeEventListener("squeezestart",ft),l.removeEventListener("squeezeend",ft),l.removeEventListener("end",O),l.removeEventListener("inputsourceschange",j);for(let nt=0;nt<H.length;nt++){const ot=F[nt];ot!==null&&(F[nt]=null,H[nt].disconnect(ot))}ct=null,gt=null,y.reset();for(const nt in v)delete v[nt];t.setRenderTarget(N),M=null,x=null,_=null,l=null,w=null,Ot.stop(),r.isPresenting=!1,t.setPixelRatio(Z),t.setSize(P.width,P.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){u=nt,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){d=nt,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(nt){p=nt},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return _===null&&R&&(_=new XRWebGLBinding(l,i)),_},this.getFrame=function(){return A},this.getSession=function(){return l},this.setSession=async function(nt){if(l=nt,l!==null){if(N=t.getRenderTarget(),l.addEventListener("select",ft),l.addEventListener("selectstart",ft),l.addEventListener("selectend",ft),l.addEventListener("squeeze",ft),l.addEventListener("squeezestart",ft),l.addEventListener("squeezeend",ft),l.addEventListener("end",O),l.addEventListener("inputsourceschange",j),I.xrCompatible!==!0&&await i.makeXRCompatible(),Z=t.getPixelRatio(),t.getSize(P),R&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,It=null,Xt=null;I.depth&&(Xt=I.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,wt=I.stencil?jo:Yo,It=I.stencil?Wo:br);const de={colorFormat:i.RGBA8,depthFormat:Xt,scaleFactor:u};_=this.getBinding(),x=_.createProjectionLayer(de),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),w=new Wa(x.textureWidth,x.textureHeight,{format:gi,type:Pi,depthTexture:new nv(x.textureWidth,x.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:I.stencil,colorSpace:t.outputColorSpace,samples:I.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const wt={antialias:I.antialias,alpha:!0,depth:I.depth,stencil:I.stencil,framebufferScaleFactor:u};M=new XRWebGLLayer(l,i,wt),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),w=new Wa(M.framebufferWidth,M.framebufferHeight,{format:gi,type:Pi,colorSpace:t.outputColorSpace,stencilBuffer:I.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),Ot.setContext(l),Ot.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function j(nt){for(let ot=0;ot<nt.removed.length;ot++){const wt=nt.removed[ot],It=F.indexOf(wt);It>=0&&(F[It]=null,H[It].disconnect(wt))}for(let ot=0;ot<nt.added.length;ot++){const wt=nt.added[ot];let It=F.indexOf(wt);if(It===-1){for(let de=0;de<H.length;de++)if(de>=F.length){F.push(wt),It=de;break}else if(F[de]===null){F[de]=wt,It=de;break}if(It===-1)break}const Xt=H[It];Xt&&Xt.connect(wt)}}const Y=new $,vt=new $;function Et(nt,ot,wt){Y.setFromMatrixPosition(ot.matrixWorld),vt.setFromMatrixPosition(wt.matrixWorld);const It=Y.distanceTo(vt),Xt=ot.projectionMatrix.elements,de=wt.projectionMatrix.elements,an=Xt[14]/(Xt[10]-1),B=Xt[14]/(Xt[10]+1),Te=(Xt[9]+1)/Xt[5],ie=(Xt[9]-1)/Xt[5],te=(Xt[8]-1)/Xt[0],qt=(de[8]+1)/de[0],Ge=an*te,kt=an*qt,re=It/(-te+qt),Ze=re*-te;if(ot.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(Ze),nt.translateZ(re),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),Xt[10]===-1)nt.projectionMatrix.copy(ot.projectionMatrix),nt.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const je=an+re,U=B+re,E=Ge-Ze,J=kt+(It-Ze),ht=Te*B/U*je,St=ie*B/U*je;nt.projectionMatrix.makePerspective(E,J,ht,St,je,U),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function L(nt,ot){ot===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(ot.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(l===null)return;let ot=nt.near,wt=nt.far;y.texture!==null&&(y.depthNear>0&&(ot=y.depthNear),y.depthFar>0&&(wt=y.depthFar)),it.near=D.near=C.near=ot,it.far=D.far=C.far=wt,(ct!==it.near||gt!==it.far)&&(l.updateRenderState({depthNear:it.near,depthFar:it.far}),ct=it.near,gt=it.far),it.layers.mask=nt.layers.mask|6,C.layers.mask=it.layers.mask&3,D.layers.mask=it.layers.mask&5;const It=nt.parent,Xt=it.cameras;L(it,It);for(let de=0;de<Xt.length;de++)L(Xt[de],It);Xt.length===2?Et(it,C,D):it.projectionMatrix.copy(C.projectionMatrix),et(nt,it,It)};function et(nt,ot,wt){wt===null?nt.matrix.copy(ot.matrixWorld):(nt.matrix.copy(wt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(ot.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(ot.projectionMatrix),nt.projectionMatrixInverse.copy(ot.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=Zo*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return it},this.getFoveation=function(){if(!(x===null&&M===null))return m},this.setFoveation=function(nt){m=nt,x!==null&&(x.fixedFoveation=nt),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=nt)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(it)},this.getCameraTexture=function(nt){return v[nt]};let xt=null;function At(nt,ot){if(S=ot.getViewerPose(p||h),A=ot,S!==null){const wt=S.views;M!==null&&(t.setRenderTargetFramebuffer(w,M.framebuffer),t.setRenderTarget(w));let It=!1;wt.length!==it.cameras.length&&(it.cameras.length=0,It=!0);for(let B=0;B<wt.length;B++){const Te=wt[B];let ie=null;if(M!==null)ie=M.getViewport(Te);else{const qt=_.getViewSubImage(x,Te);ie=qt.viewport,B===0&&(t.setRenderTargetTextures(w,qt.colorTexture,qt.depthStencilTexture),t.setRenderTarget(w))}let te=V[B];te===void 0&&(te=new pi,te.layers.enable(B),te.viewport=new nn,V[B]=te),te.matrix.fromArray(Te.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(Te.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(ie.x,ie.y,ie.width,ie.height),B===0&&(it.matrix.copy(te.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale)),It===!0&&it.cameras.push(te)}const Xt=l.enabledFeatures;if(Xt&&Xt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&R){_=r.getBinding();const B=_.getDepthInformation(wt[0]);B&&B.isValid&&B.texture&&y.init(B,l.renderState)}if(Xt&&Xt.includes("camera-access")&&R){t.state.unbindTexture(),_=r.getBinding();for(let B=0;B<wt.length;B++){const Te=wt[B].camera;if(Te){let ie=v[Te];ie||(ie=new iv,v[Te]=ie);const te=_.getCameraImage(Te);ie.sourceTexture=te}}}}for(let wt=0;wt<H.length;wt++){const It=F[wt],Xt=H[wt];It!==null&&Xt!==void 0&&Xt.update(It,ot,p||h)}xt&&xt(nt,ot),ot.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:ot}),A=null}const Ot=new rv;Ot.setAnimationLoop(At),this.setAnimationLoop=function(nt){xt=nt},this.dispose=function(){}}}const _r=new fa,Y1=new pn;function j1(s,t){function i(y,v){y.matrixAutoUpdate===!0&&y.updateMatrix(),v.value.copy(y.matrix)}function r(y,v){v.color.getRGB(y.fogColor.value,J0(s)),v.isFog?(y.fogNear.value=v.near,y.fogFar.value=v.far):v.isFogExp2&&(y.fogDensity.value=v.density)}function l(y,v,I,N,w){v.isMeshBasicMaterial||v.isMeshLambertMaterial?u(y,v):v.isMeshToonMaterial?(u(y,v),_(y,v)):v.isMeshPhongMaterial?(u(y,v),S(y,v)):v.isMeshStandardMaterial?(u(y,v),x(y,v),v.isMeshPhysicalMaterial&&M(y,v,w)):v.isMeshMatcapMaterial?(u(y,v),A(y,v)):v.isMeshDepthMaterial?u(y,v):v.isMeshDistanceMaterial?(u(y,v),R(y,v)):v.isMeshNormalMaterial?u(y,v):v.isLineBasicMaterial?(h(y,v),v.isLineDashedMaterial&&d(y,v)):v.isPointsMaterial?m(y,v,I,N):v.isSpriteMaterial?p(y,v):v.isShadowMaterial?(y.color.value.copy(v.color),y.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function u(y,v){y.opacity.value=v.opacity,v.color&&y.diffuse.value.copy(v.color),v.emissive&&y.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(y.map.value=v.map,i(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,i(v.alphaMap,y.alphaMapTransform)),v.bumpMap&&(y.bumpMap.value=v.bumpMap,i(v.bumpMap,y.bumpMapTransform),y.bumpScale.value=v.bumpScale,v.side===kn&&(y.bumpScale.value*=-1)),v.normalMap&&(y.normalMap.value=v.normalMap,i(v.normalMap,y.normalMapTransform),y.normalScale.value.copy(v.normalScale),v.side===kn&&y.normalScale.value.negate()),v.displacementMap&&(y.displacementMap.value=v.displacementMap,i(v.displacementMap,y.displacementMapTransform),y.displacementScale.value=v.displacementScale,y.displacementBias.value=v.displacementBias),v.emissiveMap&&(y.emissiveMap.value=v.emissiveMap,i(v.emissiveMap,y.emissiveMapTransform)),v.specularMap&&(y.specularMap.value=v.specularMap,i(v.specularMap,y.specularMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest);const I=t.get(v),N=I.envMap,w=I.envMapRotation;N&&(y.envMap.value=N,_r.copy(w),_r.x*=-1,_r.y*=-1,_r.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(_r.y*=-1,_r.z*=-1),y.envMapRotation.value.setFromMatrix4(Y1.makeRotationFromEuler(_r)),y.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=v.reflectivity,y.ior.value=v.ior,y.refractionRatio.value=v.refractionRatio),v.lightMap&&(y.lightMap.value=v.lightMap,y.lightMapIntensity.value=v.lightMapIntensity,i(v.lightMap,y.lightMapTransform)),v.aoMap&&(y.aoMap.value=v.aoMap,y.aoMapIntensity.value=v.aoMapIntensity,i(v.aoMap,y.aoMapTransform))}function h(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,v.map&&(y.map.value=v.map,i(v.map,y.mapTransform))}function d(y,v){y.dashSize.value=v.dashSize,y.totalSize.value=v.dashSize+v.gapSize,y.scale.value=v.scale}function m(y,v,I,N){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.size.value=v.size*I,y.scale.value=N*.5,v.map&&(y.map.value=v.map,i(v.map,y.uvTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,i(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function p(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.rotation.value=v.rotation,v.map&&(y.map.value=v.map,i(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,i(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function S(y,v){y.specular.value.copy(v.specular),y.shininess.value=Math.max(v.shininess,1e-4)}function _(y,v){v.gradientMap&&(y.gradientMap.value=v.gradientMap)}function x(y,v){y.metalness.value=v.metalness,v.metalnessMap&&(y.metalnessMap.value=v.metalnessMap,i(v.metalnessMap,y.metalnessMapTransform)),y.roughness.value=v.roughness,v.roughnessMap&&(y.roughnessMap.value=v.roughnessMap,i(v.roughnessMap,y.roughnessMapTransform)),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)}function M(y,v,I){y.ior.value=v.ior,v.sheen>0&&(y.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),y.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(y.sheenColorMap.value=v.sheenColorMap,i(v.sheenColorMap,y.sheenColorMapTransform)),v.sheenRoughnessMap&&(y.sheenRoughnessMap.value=v.sheenRoughnessMap,i(v.sheenRoughnessMap,y.sheenRoughnessMapTransform))),v.clearcoat>0&&(y.clearcoat.value=v.clearcoat,y.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(y.clearcoatMap.value=v.clearcoatMap,i(v.clearcoatMap,y.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,i(v.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(y.clearcoatNormalMap.value=v.clearcoatNormalMap,i(v.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===kn&&y.clearcoatNormalScale.value.negate())),v.dispersion>0&&(y.dispersion.value=v.dispersion),v.iridescence>0&&(y.iridescence.value=v.iridescence,y.iridescenceIOR.value=v.iridescenceIOR,y.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(y.iridescenceMap.value=v.iridescenceMap,i(v.iridescenceMap,y.iridescenceMapTransform)),v.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=v.iridescenceThicknessMap,i(v.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),v.transmission>0&&(y.transmission.value=v.transmission,y.transmissionSamplerMap.value=I.texture,y.transmissionSamplerSize.value.set(I.width,I.height),v.transmissionMap&&(y.transmissionMap.value=v.transmissionMap,i(v.transmissionMap,y.transmissionMapTransform)),y.thickness.value=v.thickness,v.thicknessMap&&(y.thicknessMap.value=v.thicknessMap,i(v.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=v.attenuationDistance,y.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(y.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(y.anisotropyMap.value=v.anisotropyMap,i(v.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=v.specularIntensity,y.specularColor.value.copy(v.specularColor),v.specularColorMap&&(y.specularColorMap.value=v.specularColorMap,i(v.specularColorMap,y.specularColorMapTransform)),v.specularIntensityMap&&(y.specularIntensityMap.value=v.specularIntensityMap,i(v.specularIntensityMap,y.specularIntensityMapTransform))}function A(y,v){v.matcap&&(y.matcap.value=v.matcap)}function R(y,v){const I=t.get(v).light;y.referencePosition.value.setFromMatrixPosition(I.matrixWorld),y.nearDistance.value=I.shadow.camera.near,y.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function Z1(s,t,i,r){let l={},u={},h=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(I,N){const w=N.program;r.uniformBlockBinding(I,w)}function p(I,N){let w=l[I.id];w===void 0&&(A(I),w=S(I),l[I.id]=w,I.addEventListener("dispose",y));const H=N.program;r.updateUBOMapping(I,H);const F=t.render.frame;u[I.id]!==F&&(x(I),u[I.id]=F)}function S(I){const N=_();I.__bindingPointIndex=N;const w=s.createBuffer(),H=I.__size,F=I.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,H,F),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,N,w),w}function _(){for(let I=0;I<d;I++)if(h.indexOf(I)===-1)return h.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(I){const N=l[I.id],w=I.uniforms,H=I.__cache;s.bindBuffer(s.UNIFORM_BUFFER,N);for(let F=0,P=w.length;F<P;F++){const Z=Array.isArray(w[F])?w[F]:[w[F]];for(let C=0,D=Z.length;C<D;C++){const V=Z[C];if(M(V,F,C,H)===!0){const it=V.__offset,ct=Array.isArray(V.value)?V.value:[V.value];let gt=0;for(let ft=0;ft<ct.length;ft++){const O=ct[ft],j=R(O);typeof O=="number"||typeof O=="boolean"?(V.__data[0]=O,s.bufferSubData(s.UNIFORM_BUFFER,it+gt,V.__data)):O.isMatrix3?(V.__data[0]=O.elements[0],V.__data[1]=O.elements[1],V.__data[2]=O.elements[2],V.__data[3]=0,V.__data[4]=O.elements[3],V.__data[5]=O.elements[4],V.__data[6]=O.elements[5],V.__data[7]=0,V.__data[8]=O.elements[6],V.__data[9]=O.elements[7],V.__data[10]=O.elements[8],V.__data[11]=0):(O.toArray(V.__data,gt),gt+=j.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,it,V.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function M(I,N,w,H){const F=I.value,P=N+"_"+w;if(H[P]===void 0)return typeof F=="number"||typeof F=="boolean"?H[P]=F:H[P]=F.clone(),!0;{const Z=H[P];if(typeof F=="number"||typeof F=="boolean"){if(Z!==F)return H[P]=F,!0}else if(Z.equals(F)===!1)return Z.copy(F),!0}return!1}function A(I){const N=I.uniforms;let w=0;const H=16;for(let P=0,Z=N.length;P<Z;P++){const C=Array.isArray(N[P])?N[P]:[N[P]];for(let D=0,V=C.length;D<V;D++){const it=C[D],ct=Array.isArray(it.value)?it.value:[it.value];for(let gt=0,ft=ct.length;gt<ft;gt++){const O=ct[gt],j=R(O),Y=w%H,vt=Y%j.boundary,Et=Y+vt;w+=vt,Et!==0&&H-Et<j.storage&&(w+=H-Et),it.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),it.__offset=w,w+=j.storage}}}const F=w%H;return F>0&&(w+=H-F),I.__size=w,I.__cache={},this}function R(I){const N={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(N.boundary=4,N.storage=4):I.isVector2?(N.boundary=8,N.storage=8):I.isVector3||I.isColor?(N.boundary=16,N.storage=12):I.isVector4?(N.boundary=16,N.storage=16):I.isMatrix3?(N.boundary=48,N.storage=48):I.isMatrix4?(N.boundary=64,N.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),N}function y(I){const N=I.target;N.removeEventListener("dispose",y);const w=h.indexOf(N.__bindingPointIndex);h.splice(w,1),s.deleteBuffer(l[N.id]),delete l[N.id],delete u[N.id]}function v(){for(const I in l)s.deleteBuffer(l[I]);h=[],l={},u={}}return{bind:m,update:p,dispose:v}}class K1{constructor(t={}){const{canvas:i=Oy(),context:r=null,depth:l=!0,stencil:u=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:S="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let M;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=r.getContextAttributes().alpha}else M=h;const A=new Uint32Array(4),R=new Int32Array(4);let y=null,v=null;const I=[],N=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ca,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let H=!1;this._outputColorSpace=di;let F=0,P=0,Z=null,C=-1,D=null;const V=new nn,it=new nn;let ct=null;const gt=new He(0);let ft=0,O=i.width,j=i.height,Y=1,vt=null,Et=null;const L=new nn(0,0,O,j),et=new nn(0,0,O,j);let xt=!1;const At=new ev;let Ot=!1,nt=!1;const ot=new pn,wt=new $,It=new nn,Xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function an(){return Z===null?Y:1}let B=r;function Te(T,X){return i.getContext(T,X)}try{const T={alpha:!0,depth:l,stencil:u,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:S,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Dd}`),i.addEventListener("webglcontextlost",Dt,!1),i.addEventListener("webglcontextrestored",Bt,!1),i.addEventListener("webglcontextcreationerror",yt,!1),B===null){const X="webgl2";if(B=Te(X,T),B===null)throw Te(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ie,te,qt,Ge,kt,re,Ze,je,U,E,J,ht,St,lt,Zt,Rt,Yt,jt,bt,Ct,Kt,zt,Ut,oe;function k(){ie=new sT(B),ie.init(),zt=new V1(B,ie),te=new $b(B,ie,t,zt),qt=new H1(B,ie),te.reversedDepthBuffer&&x&&qt.buffers.depth.setReversed(!0),Ge=new cT(B),kt=new R1,re=new G1(B,ie,qt,kt,te,zt,Ge),Ze=new eT(w),je=new rT(w),U=new mM(B),Ut=new Qb(B,U),E=new oT(B,U,Ge,Ut),J=new fT(B,E,U,Ge),bt=new uT(B,te,re),Rt=new tT(kt),ht=new A1(w,Ze,je,ie,te,Ut,Rt),St=new j1(w,kt),lt=new D1,Zt=new P1(ie),jt=new Kb(w,Ze,je,qt,J,M,m),Yt=new I1(w,J,te),oe=new Z1(B,Ge,te,qt),Ct=new Jb(B,ie,Ge),Kt=new lT(B,ie,Ge),Ge.programs=ht.programs,w.capabilities=te,w.extensions=ie,w.properties=kt,w.renderLists=lt,w.shadowMap=Yt,w.state=qt,w.info=Ge}k();const Tt=new W1(w,B);this.xr=Tt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const T=ie.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ie.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(T){T!==void 0&&(Y=T,this.setSize(O,j,!1))},this.getSize=function(T){return T.set(O,j)},this.setSize=function(T,X,at=!0){if(Tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=T,j=X,i.width=Math.floor(T*Y),i.height=Math.floor(X*Y),at===!0&&(i.style.width=T+"px",i.style.height=X+"px"),this.setViewport(0,0,T,X)},this.getDrawingBufferSize=function(T){return T.set(O*Y,j*Y).floor()},this.setDrawingBufferSize=function(T,X,at){O=T,j=X,Y=at,i.width=Math.floor(T*at),i.height=Math.floor(X*at),this.setViewport(0,0,T,X)},this.getCurrentViewport=function(T){return T.copy(V)},this.getViewport=function(T){return T.copy(L)},this.setViewport=function(T,X,at,rt){T.isVector4?L.set(T.x,T.y,T.z,T.w):L.set(T,X,at,rt),qt.viewport(V.copy(L).multiplyScalar(Y).round())},this.getScissor=function(T){return T.copy(et)},this.setScissor=function(T,X,at,rt){T.isVector4?et.set(T.x,T.y,T.z,T.w):et.set(T,X,at,rt),qt.scissor(it.copy(et).multiplyScalar(Y).round())},this.getScissorTest=function(){return xt},this.setScissorTest=function(T){qt.setScissorTest(xt=T)},this.setOpaqueSort=function(T){vt=T},this.setTransparentSort=function(T){Et=T},this.getClearColor=function(T){return T.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(T=!0,X=!0,at=!0){let rt=0;if(T){let W=!1;if(Z!==null){const _t=Z.texture.format;W=_t===Pd||_t===Od||_t===Nd}if(W){const _t=Z.texture.type,Lt=_t===Pi||_t===br||_t===qo||_t===Wo||_t===Ud||_t===Ld,Gt=jt.getClearColor(),Pt=jt.getClearAlpha(),Qt=Gt.r,ne=Gt.g,Jt=Gt.b;Lt?(A[0]=Qt,A[1]=ne,A[2]=Jt,A[3]=Pt,B.clearBufferuiv(B.COLOR,0,A)):(R[0]=Qt,R[1]=ne,R[2]=Jt,R[3]=Pt,B.clearBufferiv(B.COLOR,0,R))}else rt|=B.COLOR_BUFFER_BIT}X&&(rt|=B.DEPTH_BUFFER_BIT),at&&(rt|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",Dt,!1),i.removeEventListener("webglcontextrestored",Bt,!1),i.removeEventListener("webglcontextcreationerror",yt,!1),jt.dispose(),lt.dispose(),Zt.dispose(),kt.dispose(),Ze.dispose(),je.dispose(),J.dispose(),Ut.dispose(),oe.dispose(),ht.dispose(),Tt.dispose(),Tt.removeEventListener("sessionstart",ii),Tt.removeEventListener("sessionend",Vs),Ti.stop()};function Dt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),H=!0}function Bt(){console.log("THREE.WebGLRenderer: Context Restored."),H=!1;const T=Ge.autoReset,X=Yt.enabled,at=Yt.autoUpdate,rt=Yt.needsUpdate,W=Yt.type;k(),Ge.autoReset=T,Yt.enabled=X,Yt.autoUpdate=at,Yt.needsUpdate=rt,Yt.type=W}function yt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function mt(T){const X=T.target;X.removeEventListener("dispose",mt),Ft(X)}function Ft(T){ae(T),kt.remove(T)}function ae(T){const X=kt.get(T).programs;X!==void 0&&(X.forEach(function(at){ht.releaseProgram(at)}),T.isShaderMaterial&&ht.releaseShaderCache(T))}this.renderBufferDirect=function(T,X,at,rt,W,_t){X===null&&(X=Xt);const Lt=W.isMesh&&W.matrixWorld.determinant()<0,Gt=ha(T,X,at,rt,W);qt.setMaterial(rt,Lt);let Pt=at.index,Qt=1;if(rt.wireframe===!0){if(Pt=E.getWireframeAttribute(at),Pt===void 0)return;Qt=2}const ne=at.drawRange,Jt=at.attributes.position;let pe=ne.start*Qt,we=(ne.start+ne.count)*Qt;_t!==null&&(pe=Math.max(pe,_t.start*Qt),we=Math.min(we,(_t.start+_t.count)*Qt)),Pt!==null?(pe=Math.max(pe,0),we=Math.min(we,Pt.count)):Jt!=null&&(pe=Math.max(pe,0),we=Math.min(we,Jt.count));const Ve=we-pe;if(Ve<0||Ve===1/0)return;Ut.setup(W,rt,Gt,at,Pt);let Ue,ge=Ct;if(Pt!==null&&(Ue=U.get(Pt),ge=Kt,ge.setIndex(Ue)),W.isMesh)rt.wireframe===!0?(qt.setLineWidth(rt.wireframeLinewidth*an()),ge.setMode(B.LINES)):ge.setMode(B.TRIANGLES);else if(W.isLine){let Vt=rt.linewidth;Vt===void 0&&(Vt=1),qt.setLineWidth(Vt*an()),W.isLineSegments?ge.setMode(B.LINES):W.isLineLoop?ge.setMode(B.LINE_LOOP):ge.setMode(B.LINE_STRIP)}else W.isPoints?ge.setMode(B.POINTS):W.isSprite&&ge.setMode(B.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Ko("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ge.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(ie.get("WEBGL_multi_draw"))ge.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Vt=W._multiDrawStarts,Xe=W._multiDrawCounts,be=W._multiDrawCount,yn=Pt?U.get(Pt).bytesPerElement:1,zi=kt.get(rt).currentProgram.getUniforms();for(let _n=0;_n<be;_n++)zi.setValue(B,"_gl_DrawID",_n),ge.render(Vt[_n]/yn,Xe[_n])}else if(W.isInstancedMesh)ge.renderInstances(pe,Ve,W.count);else if(at.isInstancedBufferGeometry){const Vt=at._maxInstanceCount!==void 0?at._maxInstanceCount:1/0,Xe=Math.min(at.instanceCount,Vt);ge.renderInstances(pe,Ve,Xe)}else ge.render(pe,Ve)};function Le(T,X,at){T.transparent===!0&&T.side===sa&&T.forceSinglePass===!1?(T.side=kn,T.needsUpdate=!0,qn(T,X,at),T.side=qa,T.needsUpdate=!0,qn(T,X,at),T.side=sa):qn(T,X,at)}this.compile=function(T,X,at=null){at===null&&(at=T),v=Zt.get(at),v.init(X),N.push(v),at.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(v.pushLight(W),W.castShadow&&v.pushShadow(W))}),T!==at&&T.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(v.pushLight(W),W.castShadow&&v.pushShadow(W))}),v.setupLights();const rt=new Set;return T.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const _t=W.material;if(_t)if(Array.isArray(_t))for(let Lt=0;Lt<_t.length;Lt++){const Gt=_t[Lt];Le(Gt,at,W),rt.add(Gt)}else Le(_t,at,W),rt.add(_t)}),v=N.pop(),rt},this.compileAsync=function(T,X,at=null){const rt=this.compile(T,X,at);return new Promise(W=>{function _t(){if(rt.forEach(function(Lt){kt.get(Lt).currentProgram.isReady()&&rt.delete(Lt)}),rt.size===0){W(T);return}setTimeout(_t,10)}ie.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let Ee=null;function wn(T){Ee&&Ee(T)}function ii(){Ti.stop()}function Vs(){Ti.start()}const Ti=new rv;Ti.setAnimationLoop(wn),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(T){Ee=T,Tt.setAnimationLoop(T),T===null?Ti.stop():Ti.start()},Tt.addEventListener("sessionstart",ii),Tt.addEventListener("sessionend",Vs),this.render=function(T,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Tt.enabled===!0&&Tt.isPresenting===!0&&(Tt.cameraAutoUpdate===!0&&Tt.updateCamera(X),X=Tt.getCamera()),T.isScene===!0&&T.onBeforeRender(w,T,X,Z),v=Zt.get(T,N.length),v.init(X),N.push(v),ot.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),At.setFromProjectionMatrix(ot,Li,X.reversedDepth),nt=this.localClippingEnabled,Ot=Rt.init(this.clippingPlanes,nt),y=lt.get(T,I.length),y.init(),I.push(y),Tt.enabled===!0&&Tt.isPresenting===!0){const _t=w.xr.getDepthSensingMesh();_t!==null&&Dr(_t,X,-1/0,w.sortObjects)}Dr(T,X,0,w.sortObjects),y.finish(),w.sortObjects===!0&&y.sort(vt,Et),de=Tt.enabled===!1||Tt.isPresenting===!1||Tt.hasDepthSensing()===!1,de&&jt.addToRenderList(y,T),this.info.render.frame++,Ot===!0&&Rt.beginShadows();const at=v.state.shadowsArray;Yt.render(at,T,X),Ot===!0&&Rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=y.opaque,W=y.transmissive;if(v.setupLights(),X.isArrayCamera){const _t=X.cameras;if(W.length>0)for(let Lt=0,Gt=_t.length;Lt<Gt;Lt++){const Pt=_t[Lt];Ur(rt,W,T,Pt)}de&&jt.render(T);for(let Lt=0,Gt=_t.length;Lt<Gt;Lt++){const Pt=_t[Lt];wr(y,T,Pt,Pt.viewport)}}else W.length>0&&Ur(rt,W,T,X),de&&jt.render(T),wr(y,T,X);Z!==null&&P===0&&(re.updateMultisampleRenderTarget(Z),re.updateRenderTargetMipmap(Z)),T.isScene===!0&&T.onAfterRender(w,T,X),Ut.resetDefaultState(),C=-1,D=null,N.pop(),N.length>0?(v=N[N.length-1],Ot===!0&&Rt.setGlobalState(w.clippingPlanes,v.state.camera)):v=null,I.pop(),I.length>0?y=I[I.length-1]:y=null};function Dr(T,X,at,rt){if(T.visible===!1)return;if(T.layers.test(X.layers)){if(T.isGroup)at=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(X);else if(T.isLight)v.pushLight(T),T.castShadow&&v.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||At.intersectsSprite(T)){rt&&It.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ot);const Lt=J.update(T),Gt=T.material;Gt.visible&&y.push(T,Lt,Gt,at,It.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||At.intersectsObject(T))){const Lt=J.update(T),Gt=T.material;if(rt&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),It.copy(T.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),It.copy(Lt.boundingSphere.center)),It.applyMatrix4(T.matrixWorld).applyMatrix4(ot)),Array.isArray(Gt)){const Pt=Lt.groups;for(let Qt=0,ne=Pt.length;Qt<ne;Qt++){const Jt=Pt[Qt],pe=Gt[Jt.materialIndex];pe&&pe.visible&&y.push(T,Lt,pe,at,It.z,Jt)}}else Gt.visible&&y.push(T,Lt,Gt,at,It.z,null)}}const _t=T.children;for(let Lt=0,Gt=_t.length;Lt<Gt;Lt++)Dr(_t[Lt],X,at,rt)}function wr(T,X,at,rt){const W=T.opaque,_t=T.transmissive,Lt=T.transparent;v.setupLightsView(at),Ot===!0&&Rt.setGlobalState(w.clippingPlanes,at),rt&&qt.viewport(V.copy(rt)),W.length>0&&Ya(W,X,at),_t.length>0&&Ya(_t,X,at),Lt.length>0&&Ya(Lt,X,at),qt.buffers.depth.setTest(!0),qt.buffers.depth.setMask(!0),qt.buffers.color.setMask(!0),qt.setPolygonOffset(!1)}function Ur(T,X,at,rt){if((at.isScene===!0?at.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[rt.id]===void 0&&(v.state.transmissionRenderTarget[rt.id]=new Wa(1,1,{generateMipmaps:!0,type:ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float")?Fs:Pi,minFilter:Mr,samples:4,stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ce.workingColorSpace}));const _t=v.state.transmissionRenderTarget[rt.id],Lt=rt.viewport||V;_t.setSize(Lt.z*w.transmissionResolutionScale,Lt.w*w.transmissionResolutionScale);const Gt=w.getRenderTarget(),Pt=w.getActiveCubeFace(),Qt=w.getActiveMipmapLevel();w.setRenderTarget(_t),w.getClearColor(gt),ft=w.getClearAlpha(),ft<1&&w.setClearColor(16777215,.5),w.clear(),de&&jt.render(at);const ne=w.toneMapping;w.toneMapping=ca;const Jt=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),v.setupLightsView(rt),Ot===!0&&Rt.setGlobalState(w.clippingPlanes,rt),Ya(T,at,rt),re.updateMultisampleRenderTarget(_t),re.updateRenderTargetMipmap(_t),ie.has("WEBGL_multisampled_render_to_texture")===!1){let pe=!1;for(let we=0,Ve=X.length;we<Ve;we++){const Ue=X[we],ge=Ue.object,Vt=Ue.geometry,Xe=Ue.material,be=Ue.group;if(Xe.side===sa&&ge.layers.test(rt.layers)){const yn=Xe.side;Xe.side=kn,Xe.needsUpdate=!0,ks(ge,at,rt,Vt,Xe,be),Xe.side=yn,Xe.needsUpdate=!0,pe=!0}}pe===!0&&(re.updateMultisampleRenderTarget(_t),re.updateRenderTargetMipmap(_t))}w.setRenderTarget(Gt,Pt,Qt),w.setClearColor(gt,ft),Jt!==void 0&&(rt.viewport=Jt),w.toneMapping=ne}function Ya(T,X,at){const rt=X.isScene===!0?X.overrideMaterial:null;for(let W=0,_t=T.length;W<_t;W++){const Lt=T[W],Gt=Lt.object,Pt=Lt.geometry,Qt=Lt.group;let ne=Lt.material;ne.allowOverride===!0&&rt!==null&&(ne=rt),Gt.layers.test(at.layers)&&ks(Gt,X,at,Pt,ne,Qt)}}function ks(T,X,at,rt,W,_t){T.onBeforeRender(w,X,at,rt,W,_t),T.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),W.onBeforeRender(w,X,at,rt,T,_t),W.transparent===!0&&W.side===sa&&W.forceSinglePass===!1?(W.side=kn,W.needsUpdate=!0,w.renderBufferDirect(at,X,rt,W,T,_t),W.side=qa,W.needsUpdate=!0,w.renderBufferDirect(at,X,rt,W,T,_t),W.side=sa):w.renderBufferDirect(at,X,rt,W,T,_t),T.onAfterRender(w,X,at,rt,W,_t)}function qn(T,X,at){X.isScene!==!0&&(X=Xt);const rt=kt.get(T),W=v.state.lights,_t=v.state.shadowsArray,Lt=W.state.version,Gt=ht.getParameters(T,W.state,_t,X,at),Pt=ht.getProgramCacheKey(Gt);let Qt=rt.programs;rt.environment=T.isMeshStandardMaterial?X.environment:null,rt.fog=X.fog,rt.envMap=(T.isMeshStandardMaterial?je:Ze).get(T.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&T.envMap===null?X.environmentRotation:T.envMapRotation,Qt===void 0&&(T.addEventListener("dispose",mt),Qt=new Map,rt.programs=Qt);let ne=Qt.get(Pt);if(ne!==void 0){if(rt.currentProgram===ne&&rt.lightsStateVersion===Lt)return xn(T,Gt),ne}else Gt.uniforms=ht.getUniforms(T),T.onBeforeCompile(Gt,w),ne=ht.acquireProgram(Gt,Pt),Qt.set(Pt,ne),rt.uniforms=Gt.uniforms;const Jt=rt.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Jt.clippingPlanes=Rt.uniform),xn(T,Gt),rt.needsLights=jc(T),rt.lightsStateVersion=Lt,rt.needsLights&&(Jt.ambientLightColor.value=W.state.ambient,Jt.lightProbe.value=W.state.probe,Jt.directionalLights.value=W.state.directional,Jt.directionalLightShadows.value=W.state.directionalShadow,Jt.spotLights.value=W.state.spot,Jt.spotLightShadows.value=W.state.spotShadow,Jt.rectAreaLights.value=W.state.rectArea,Jt.ltc_1.value=W.state.rectAreaLTC1,Jt.ltc_2.value=W.state.rectAreaLTC2,Jt.pointLights.value=W.state.point,Jt.pointLightShadows.value=W.state.pointShadow,Jt.hemisphereLights.value=W.state.hemi,Jt.directionalShadowMap.value=W.state.directionalShadowMap,Jt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Jt.spotShadowMap.value=W.state.spotShadowMap,Jt.spotLightMatrix.value=W.state.spotLightMatrix,Jt.spotLightMap.value=W.state.spotLightMap,Jt.pointShadowMap.value=W.state.pointShadowMap,Jt.pointShadowMatrix.value=W.state.pointShadowMatrix),rt.currentProgram=ne,rt.uniformsList=null,ne}function rn(T){if(T.uniformsList===null){const X=T.currentProgram.getUniforms();T.uniformsList=Ic.seqWithValue(X.seq,T.uniforms)}return T.uniformsList}function xn(T,X){const at=kt.get(T);at.outputColorSpace=X.outputColorSpace,at.batching=X.batching,at.batchingColor=X.batchingColor,at.instancing=X.instancing,at.instancingColor=X.instancingColor,at.instancingMorph=X.instancingMorph,at.skinning=X.skinning,at.morphTargets=X.morphTargets,at.morphNormals=X.morphNormals,at.morphColors=X.morphColors,at.morphTargetsCount=X.morphTargetsCount,at.numClippingPlanes=X.numClippingPlanes,at.numIntersection=X.numClipIntersection,at.vertexAlphas=X.vertexAlphas,at.vertexTangents=X.vertexTangents,at.toneMapping=X.toneMapping}function ha(T,X,at,rt,W){X.isScene!==!0&&(X=Xt),re.resetTextureUnits();const _t=X.fog,Lt=rt.isMeshStandardMaterial?X.environment:null,Gt=Z===null?w.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Tr,Pt=(rt.isMeshStandardMaterial?je:Ze).get(rt.envMap||Lt),Qt=rt.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,ne=!!at.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),Jt=!!at.morphAttributes.position,pe=!!at.morphAttributes.normal,we=!!at.morphAttributes.color;let Ve=ca;rt.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ve=w.toneMapping);const Ue=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,ge=Ue!==void 0?Ue.length:0,Vt=kt.get(rt),Xe=v.state.lights;if(Ot===!0&&(nt===!0||T!==D)){const fn=T===D&&rt.id===C;Rt.setState(rt,T,fn)}let be=!1;rt.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==Xe.state.version||Vt.outputColorSpace!==Gt||W.isBatchedMesh&&Vt.batching===!1||!W.isBatchedMesh&&Vt.batching===!0||W.isBatchedMesh&&Vt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Vt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Vt.instancing===!1||!W.isInstancedMesh&&Vt.instancing===!0||W.isSkinnedMesh&&Vt.skinning===!1||!W.isSkinnedMesh&&Vt.skinning===!0||W.isInstancedMesh&&Vt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Vt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Vt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Vt.instancingMorph===!1&&W.morphTexture!==null||Vt.envMap!==Pt||rt.fog===!0&&Vt.fog!==_t||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==Rt.numPlanes||Vt.numIntersection!==Rt.numIntersection)||Vt.vertexAlphas!==Qt||Vt.vertexTangents!==ne||Vt.morphTargets!==Jt||Vt.morphNormals!==pe||Vt.morphColors!==we||Vt.toneMapping!==Ve||Vt.morphTargetsCount!==ge)&&(be=!0):(be=!0,Vt.__version=rt.version);let yn=Vt.currentProgram;be===!0&&(yn=qn(rt,X,W));let zi=!1,_n=!1,Za=!1;const Se=yn.getUniforms(),An=Vt.uniforms;if(qt.useProgram(yn.program)&&(zi=!0,_n=!0,Za=!0),rt.id!==C&&(C=rt.id,_n=!0),zi||D!==T){qt.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Se.setValue(B,"projectionMatrix",T.projectionMatrix),Se.setValue(B,"viewMatrix",T.matrixWorldInverse);const Je=Se.map.cameraPosition;Je!==void 0&&Je.setValue(B,wt.setFromMatrixPosition(T.matrixWorld)),te.logarithmicDepthBuffer&&Se.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&Se.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),D!==T&&(D=T,_n=!0,Za=!0)}if(W.isSkinnedMesh){Se.setOptional(B,W,"bindMatrix"),Se.setOptional(B,W,"bindMatrixInverse");const fn=W.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),Se.setValue(B,"boneTexture",fn.boneTexture,re))}W.isBatchedMesh&&(Se.setOptional(B,W,"batchingTexture"),Se.setValue(B,"batchingTexture",W._matricesTexture,re),Se.setOptional(B,W,"batchingIdTexture"),Se.setValue(B,"batchingIdTexture",W._indirectTexture,re),Se.setOptional(B,W,"batchingColorTexture"),W._colorsTexture!==null&&Se.setValue(B,"batchingColorTexture",W._colorsTexture,re));const Un=at.morphAttributes;if((Un.position!==void 0||Un.normal!==void 0||Un.color!==void 0)&&bt.update(W,at,yn),(_n||Vt.receiveShadow!==W.receiveShadow)&&(Vt.receiveShadow=W.receiveShadow,Se.setValue(B,"receiveShadow",W.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(An.envMap.value=Pt,An.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&X.environment!==null&&(An.envMapIntensity.value=X.environmentIntensity),_n&&(Se.setValue(B,"toneMappingExposure",w.toneMappingExposure),Vt.needsLights&&Xs(An,Za),_t&&rt.fog===!0&&St.refreshFogUniforms(An,_t),St.refreshMaterialUniforms(An,rt,Y,j,v.state.transmissionRenderTarget[T.id]),Ic.upload(B,rn(Vt),An,re)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(Ic.upload(B,rn(Vt),An,re),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&Se.setValue(B,"center",W.center),Se.setValue(B,"modelViewMatrix",W.modelViewMatrix),Se.setValue(B,"normalMatrix",W.normalMatrix),Se.setValue(B,"modelMatrix",W.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const fn=rt.uniformsGroups;for(let Je=0,Lr=fn.length;Je<Lr;Je++){const Ai=fn[Je];oe.update(Ai,yn),oe.bind(Ai,yn)}}return yn}function Xs(T,X){T.ambientLightColor.needsUpdate=X,T.lightProbe.needsUpdate=X,T.directionalLights.needsUpdate=X,T.directionalLightShadows.needsUpdate=X,T.pointLights.needsUpdate=X,T.pointLightShadows.needsUpdate=X,T.spotLights.needsUpdate=X,T.spotLightShadows.needsUpdate=X,T.rectAreaLights.needsUpdate=X,T.hemisphereLights.needsUpdate=X}function jc(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return Z},this.setRenderTargetTextures=function(T,X,at){const rt=kt.get(T);rt.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,rt.__autoAllocateDepthBuffer===!1&&(rt.__useRenderToTexture=!1),kt.get(T.texture).__webglTexture=X,kt.get(T.depthTexture).__webglTexture=rt.__autoAllocateDepthBuffer?void 0:at,rt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,X){const at=kt.get(T);at.__webglFramebuffer=X,at.__useDefaultFramebuffer=X===void 0};const Zc=B.createFramebuffer();this.setRenderTarget=function(T,X=0,at=0){Z=T,F=X,P=at;let rt=!0,W=null,_t=!1,Lt=!1;if(T){const Pt=kt.get(T);if(Pt.__useDefaultFramebuffer!==void 0)qt.bindFramebuffer(B.FRAMEBUFFER,null),rt=!1;else if(Pt.__webglFramebuffer===void 0)re.setupRenderTarget(T);else if(Pt.__hasExternalTextures)re.rebindTextures(T,kt.get(T.texture).__webglTexture,kt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Jt=T.depthTexture;if(Pt.__boundDepthTexture!==Jt){if(Jt!==null&&kt.has(Jt)&&(T.width!==Jt.image.width||T.height!==Jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(T)}}const Qt=T.texture;(Qt.isData3DTexture||Qt.isDataArrayTexture||Qt.isCompressedArrayTexture)&&(Lt=!0);const ne=kt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ne[X])?W=ne[X][at]:W=ne[X],_t=!0):T.samples>0&&re.useMultisampledRTT(T)===!1?W=kt.get(T).__webglMultisampledFramebuffer:Array.isArray(ne)?W=ne[at]:W=ne,V.copy(T.viewport),it.copy(T.scissor),ct=T.scissorTest}else V.copy(L).multiplyScalar(Y).floor(),it.copy(et).multiplyScalar(Y).floor(),ct=xt;if(at!==0&&(W=Zc),qt.bindFramebuffer(B.FRAMEBUFFER,W)&&rt&&qt.drawBuffers(T,W),qt.viewport(V),qt.scissor(it),qt.setScissorTest(ct),_t){const Pt=kt.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+X,Pt.__webglTexture,at)}else if(Lt){const Pt=X;for(let Qt=0;Qt<T.textures.length;Qt++){const ne=kt.get(T.textures[Qt]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Qt,ne.__webglTexture,at,Pt)}}else if(T!==null&&at!==0){const Pt=kt.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Pt.__webglTexture,at)}C=-1},this.readRenderTargetPixels=function(T,X,at,rt,W,_t,Lt,Gt=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=kt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Lt!==void 0&&(Pt=Pt[Lt]),Pt){qt.bindFramebuffer(B.FRAMEBUFFER,Pt);try{const Qt=T.textures[Gt],ne=Qt.format,Jt=Qt.type;if(!te.textureFormatReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!te.textureTypeReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=T.width-rt&&at>=0&&at<=T.height-W&&(T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Gt),B.readPixels(X,at,rt,W,zt.convert(ne),zt.convert(Jt),_t))}finally{const Qt=Z!==null?kt.get(Z).__webglFramebuffer:null;qt.bindFramebuffer(B.FRAMEBUFFER,Qt)}}},this.readRenderTargetPixelsAsync=async function(T,X,at,rt,W,_t,Lt,Gt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=kt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Lt!==void 0&&(Pt=Pt[Lt]),Pt)if(X>=0&&X<=T.width-rt&&at>=0&&at<=T.height-W){qt.bindFramebuffer(B.FRAMEBUFFER,Pt);const Qt=T.textures[Gt],ne=Qt.format,Jt=Qt.type;if(!te.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const pe=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,pe),B.bufferData(B.PIXEL_PACK_BUFFER,_t.byteLength,B.STREAM_READ),T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Gt),B.readPixels(X,at,rt,W,zt.convert(ne),zt.convert(Jt),0);const we=Z!==null?kt.get(Z).__webglFramebuffer:null;qt.bindFramebuffer(B.FRAMEBUFFER,we);const Ve=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Py(B,Ve,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,pe),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,_t),B.deleteBuffer(pe),B.deleteSync(Ve),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,X=null,at=0){const rt=Math.pow(2,-at),W=Math.floor(T.image.width*rt),_t=Math.floor(T.image.height*rt),Lt=X!==null?X.x:0,Gt=X!==null?X.y:0;re.setTexture2D(T,0),B.copyTexSubImage2D(B.TEXTURE_2D,at,0,0,Lt,Gt,W,_t),qt.unbindTexture()};const el=B.createFramebuffer(),ja=B.createFramebuffer();this.copyTextureToTexture=function(T,X,at=null,rt=null,W=0,_t=null){_t===null&&(W!==0?(Ko("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),_t=W,W=0):_t=0);let Lt,Gt,Pt,Qt,ne,Jt,pe,we,Ve;const Ue=T.isCompressedTexture?T.mipmaps[_t]:T.image;if(at!==null)Lt=at.max.x-at.min.x,Gt=at.max.y-at.min.y,Pt=at.isBox3?at.max.z-at.min.z:1,Qt=at.min.x,ne=at.min.y,Jt=at.isBox3?at.min.z:0;else{const Un=Math.pow(2,-W);Lt=Math.floor(Ue.width*Un),Gt=Math.floor(Ue.height*Un),T.isDataArrayTexture?Pt=Ue.depth:T.isData3DTexture?Pt=Math.floor(Ue.depth*Un):Pt=1,Qt=0,ne=0,Jt=0}rt!==null?(pe=rt.x,we=rt.y,Ve=rt.z):(pe=0,we=0,Ve=0);const ge=zt.convert(X.format),Vt=zt.convert(X.type);let Xe;X.isData3DTexture?(re.setTexture3D(X,0),Xe=B.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(re.setTexture2DArray(X,0),Xe=B.TEXTURE_2D_ARRAY):(re.setTexture2D(X,0),Xe=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,X.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,X.unpackAlignment);const be=B.getParameter(B.UNPACK_ROW_LENGTH),yn=B.getParameter(B.UNPACK_IMAGE_HEIGHT),zi=B.getParameter(B.UNPACK_SKIP_PIXELS),_n=B.getParameter(B.UNPACK_SKIP_ROWS),Za=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Ue.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ue.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Qt),B.pixelStorei(B.UNPACK_SKIP_ROWS,ne),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Jt);const Se=T.isDataArrayTexture||T.isData3DTexture,An=X.isDataArrayTexture||X.isData3DTexture;if(T.isDepthTexture){const Un=kt.get(T),fn=kt.get(X),Je=kt.get(Un.__renderTarget),Lr=kt.get(fn.__renderTarget);qt.bindFramebuffer(B.READ_FRAMEBUFFER,Je.__webglFramebuffer),qt.bindFramebuffer(B.DRAW_FRAMEBUFFER,Lr.__webglFramebuffer);for(let Ai=0;Ai<Pt;Ai++)Se&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,kt.get(T).__webglTexture,W,Jt+Ai),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,kt.get(X).__webglTexture,_t,Ve+Ai)),B.blitFramebuffer(Qt,ne,Lt,Gt,pe,we,Lt,Gt,B.DEPTH_BUFFER_BIT,B.NEAREST);qt.bindFramebuffer(B.READ_FRAMEBUFFER,null),qt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(W!==0||T.isRenderTargetTexture||kt.has(T)){const Un=kt.get(T),fn=kt.get(X);qt.bindFramebuffer(B.READ_FRAMEBUFFER,el),qt.bindFramebuffer(B.DRAW_FRAMEBUFFER,ja);for(let Je=0;Je<Pt;Je++)Se?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Un.__webglTexture,W,Jt+Je):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Un.__webglTexture,W),An?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,fn.__webglTexture,_t,Ve+Je):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,fn.__webglTexture,_t),W!==0?B.blitFramebuffer(Qt,ne,Lt,Gt,pe,we,Lt,Gt,B.COLOR_BUFFER_BIT,B.NEAREST):An?B.copyTexSubImage3D(Xe,_t,pe,we,Ve+Je,Qt,ne,Lt,Gt):B.copyTexSubImage2D(Xe,_t,pe,we,Qt,ne,Lt,Gt);qt.bindFramebuffer(B.READ_FRAMEBUFFER,null),qt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else An?T.isDataTexture||T.isData3DTexture?B.texSubImage3D(Xe,_t,pe,we,Ve,Lt,Gt,Pt,ge,Vt,Ue.data):X.isCompressedArrayTexture?B.compressedTexSubImage3D(Xe,_t,pe,we,Ve,Lt,Gt,Pt,ge,Ue.data):B.texSubImage3D(Xe,_t,pe,we,Ve,Lt,Gt,Pt,ge,Vt,Ue):T.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,_t,pe,we,Lt,Gt,ge,Vt,Ue.data):T.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,_t,pe,we,Ue.width,Ue.height,ge,Ue.data):B.texSubImage2D(B.TEXTURE_2D,_t,pe,we,Lt,Gt,ge,Vt,Ue);B.pixelStorei(B.UNPACK_ROW_LENGTH,be),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,yn),B.pixelStorei(B.UNPACK_SKIP_PIXELS,zi),B.pixelStorei(B.UNPACK_SKIP_ROWS,_n),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Za),_t===0&&X.generateMipmaps&&B.generateMipmap(Xe),qt.unbindTexture()},this.initRenderTarget=function(T){kt.get(T).__webglFramebuffer===void 0&&re.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?re.setTextureCube(T,0):T.isData3DTexture?re.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?re.setTexture2DArray(T,0):re.setTexture2D(T,0),qt.unbindTexture()},this.resetState=function(){F=0,P=0,Z=null,qt.reset(),Ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=Ce._getDrawingBufferColorSpace(t),i.unpackColorSpace=Ce._getUnpackColorSpace()}}const w0={type:"change"},Hd={type:"start"},uv={type:"end"},Nc=new W0,U0=new Va,Q1=Math.cos(70*Cs.DEG2RAD),dn=new $,Vn=2*Math.PI,Fe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},zh=1e-6;class J1 extends dM{constructor(t,i=null){super(t,i),this.state=Fe.NONE,this.target=new $,this.cursor=new $,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Us.ROTATE,MIDDLE:Us.DOLLY,RIGHT:Us.PAN},this.touches={ONE:Ds.ROTATE,TWO:Ds.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new $,this._lastQuaternion=new Ar,this._lastTargetPosition=new $,this._quat=new Ar().setFromUnitVectors(t.up,new $(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new bd,this._sphericalDelta=new bd,this._scale=1,this._panOffset=new $,this._rotateStart=new he,this._rotateEnd=new he,this._rotateDelta=new he,this._panStart=new he,this._panEnd=new he,this._panDelta=new he,this._dollyStart=new he,this._dollyEnd=new he,this._dollyDelta=new he,this._dollyDirection=new $,this._mouse=new he,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=tA.bind(this),this._onPointerDown=$1.bind(this),this._onPointerUp=eA.bind(this),this._onContextMenu=lA.bind(this),this._onMouseWheel=aA.bind(this),this._onKeyDown=rA.bind(this),this._onTouchStart=sA.bind(this),this._onTouchMove=oA.bind(this),this._onMouseDown=nA.bind(this),this._onMouseMove=iA.bind(this),this._interceptControlDown=cA.bind(this),this._interceptControlUp=uA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(w0),this.update(),this.state=Fe.NONE}update(t=null){const i=this.object.position;dn.copy(i).sub(this.target),dn.applyQuaternion(this._quat),this._spherical.setFromVector3(dn),this.autoRotate&&this.state===Fe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(r)&&isFinite(l)&&(r<-Math.PI?r+=Vn:r>Math.PI&&(r-=Vn),l<-Math.PI?l+=Vn:l>Math.PI&&(l-=Vn),r<=l?this._spherical.theta=Math.max(r,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+l)/2?Math.max(r,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let u=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),u=h!=this._spherical.radius}if(dn.setFromSpherical(this._spherical),dn.applyQuaternion(this._quatInverse),i.copy(this.target).add(dn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=dn.length();h=this._clampDistance(d*this._scale);const m=d-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),u=!!m}else if(this.object.isOrthographicCamera){const d=new $(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),u=m!==this.object.zoom;const p=new $(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),h=dn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Nc.origin.copy(this.object.position),Nc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Nc.direction))<Q1?this.object.lookAt(this.target):(U0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Nc.intersectPlane(U0,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),u=!0)}return this._scale=1,this._performCursorZoom=!1,u||this._lastPosition.distanceToSquared(this.object.position)>zh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>zh||this._lastTargetPosition.distanceToSquared(this.target)>zh?(this.dispatchEvent(w0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Vn/60*this.autoRotateSpeed*t:Vn/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){dn.setFromMatrixColumn(i,0),dn.multiplyScalar(-t),this._panOffset.add(dn)}_panUp(t,i){this.screenSpacePanning===!0?dn.setFromMatrixColumn(i,1):(dn.setFromMatrixColumn(i,0),dn.crossVectors(this.object.up,dn)),dn.multiplyScalar(t),this._panOffset.add(dn)}_pan(t,i){const r=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;dn.copy(l).sub(this.target);let u=dn.length();u*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*u/r.clientHeight,this.object.matrix),this._panUp(2*i*u/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),l=t-r.left,u=i-r.top,h=r.width,d=r.height;this._mouse.x=l/h*2-1,this._mouse.y=-(u/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(r,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(r,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),r=t.pageX-i.x,l=t.pageY-i.y,u=Math.sqrt(r*r+l*l);this._dollyStart.set(0,u)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const r=this._getSecondPointerPosition(t),l=.5*(t.pageX+r.x),u=.5*(t.pageY+r.y);this._rotateEnd.set(l,u)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(r,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),r=t.pageX-i.x,l=t.pageY-i.y,u=Math.sqrt(r*r+l*l);this._dollyEnd.set(0,u),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+i.x)*.5,d=(t.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new he,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,r={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function $1(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function tA(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function eA(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(uv),this.state=Fe.NONE;break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function nA(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Us.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Fe.DOLLY;break;case Us.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Fe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Fe.ROTATE}break;case Us.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Fe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Fe.PAN}break;default:this.state=Fe.NONE}this.state!==Fe.NONE&&this.dispatchEvent(Hd)}function iA(s){switch(this.state){case Fe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Fe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Fe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function aA(s){this.enabled===!1||this.enableZoom===!1||this.state!==Fe.NONE||(s.preventDefault(),this.dispatchEvent(Hd),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(uv))}function rA(s){this.enabled!==!1&&this._handleKeyDown(s)}function sA(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Ds.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Fe.TOUCH_ROTATE;break;case Ds.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Fe.TOUCH_PAN;break;default:this.state=Fe.NONE}break;case 2:switch(this.touches.TWO){case Ds.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Fe.TOUCH_DOLLY_PAN;break;case Ds.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Fe.TOUCH_DOLLY_ROTATE;break;default:this.state=Fe.NONE}break;default:this.state=Fe.NONE}this.state!==Fe.NONE&&this.dispatchEvent(Hd)}function oA(s){switch(this._trackPointer(s),this.state){case Fe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Fe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Fe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Fe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Fe.NONE}}function lA(s){this.enabled!==!1&&s.preventDefault()}function cA(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function uA(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Fo=`// Full-screen quad / shared by every post-processing pass.\r
varying vec2 vUv;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = vec4(position.xy, 0.0, 1.0);\r
}\r
`,fA=`// =============================================================================\r
// GARGANTUA - Schwarzschild null-geodesic integrator (per-pixel fragment shader)\r
//\r
// Coordinate chart: Schwarzschild coordinates (t, r, theta, phi) with the\r
// areal radius r expressed in a Cartesian-like embedding frame. Lengths are in\r
// units of r_s = 2M = 1; the equatorial accretion disk is the y = 0 plane.\r
//\r
// For a null geodesic the orbit (Binet) equation is exactly\r
//     d^2 u / d(phi)^2 + u = 3 M u^2,      u = 1 / r,  M = r_s / 2.\r
// Writing the spatial curve as p(lambda) with velocity v = dp/d(lambda), the\r
// angular momentum L = p x v is conserved when the acceleration is radial.\r
// Substituting r = 1/u, phi_dot = L u^2 into a_r = r_ddot - r phi_dot^2 gives\r
//     d^2 p / d(lambda)^2 = -3 M L^2 p / r^5 = -1.5 r_s h2 p / r^5,\r
// with h2 = |p0 x v0|^2 evaluated once from the launch state. This is the\r
// exact Schwarzschild null-geodesic shape equation; lambda is a path parameter\r
// (not necessarily the affine parameter), which does not affect the spatial\r
// curve. Integrating it with RK4 bends every ray, including background rays.\r
//\r
// State:      (p, v) in the embedding frame; h2 conserved.\r
// Stepping:   RK4, adaptive spatial step ds ~ 0.10 * r * uStepScale, with\r
//             dlambda = ds / |v| so the spatial step stays bounded near r_s.\r
// Termination: r <= 1.002 r_s (event horizon capture, no emission inside);\r
//             r > ESCAPE_R with outward motion (sample lensed background);\r
//             step budget exhausted (diagnostic in debug view 1).\r
// =============================================================================\r
\r
precision highp float;\r
\r
varying vec2 vUv;\r
\r
uniform float uTime;          // frozen simulation seconds\r
uniform float uTanHalfFov;\r
uniform float uAspect;\r
uniform vec3 uCamPos;\r
uniform vec3 uCamRight;\r
uniform vec3 uCamUp;\r
uniform vec3 uCamForward;\r
\r
uniform float uDiskInner;\r
uniform float uDiskOuter;\r
uniform float uDiskThickness;\r
uniform float uDiskTemp;\r
uniform float uEmission;\r
uniform float uOrbitSpeed;\r
uniform float uTurbAmp;\r
uniform float uTurbSpeed;\r
\r
uniform float uStarDensity;\r
uniform float uGalaxyBrightness;\r
\r
uniform float uStepScale;\r
uniform int uMaxSteps;\r
uniform int uDiskSamples;\r
uniform int uDebug;\r
\r
const float RS = 1.0;\r
const float ESCAPE_R = 90.0;\r
const float PHOTON_R = 1.5;\r
const float PI = 3.141592653589793;\r
const int LOOP_CAP = 360;\r
\r
// ---------------------------------------------------------------- procedural\r
float hash13(vec3 p3) {\r
  p3 = fract(p3 * 0.1031);\r
  p3 += dot(p3, p3.zyx + 31.32);\r
  return fract((p3.x + p3.y) * p3.z);\r
}\r
\r
float hash12(vec2 p) {\r
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);\r
  p3 += dot(p3, p3.yzx + 33.33);\r
  return fract((p3.x + p3.y) * p3.z);\r
}\r
\r
float vnoise(vec3 x) {\r
  vec3 i = floor(x);\r
  vec3 f = fract(x);\r
  f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // quintic: C2, no visible lattice edges\r
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));\r
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));\r
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));\r
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));\r
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));\r
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));\r
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));\r
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));\r
  return mix(mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),\r
             mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y), f.z);\r
}\r
\r
float fbm(vec3 x) {\r
  float s = 0.0;\r
  float a = 0.5;\r
  // Rotate each octave: overlapping axis-aligned noise lattices would show up\r
  // as a checkerboard on the disk, so the domains are decorrelated.\r
  mat3 rot = mat3( 0.00,  0.80,  0.60,\r
                  -0.80,  0.36, -0.48,\r
                  -0.60, -0.48,  0.64);\r
  for (int i = 0; i < 3; i++) {\r
    s += a * vnoise(x);\r
    x = rot * x * 2.03 + vec3(7.1, 3.7, 5.3);\r
    a *= 0.5;\r
  }\r
  return s;\r
}\r
\r
vec3 blackbody(float t) {\r
  float x = clamp(t, 0.0, 3.0);\r
  vec3 c = mix(vec3(1.0, 0.22, 0.045), vec3(1.0, 0.62, 0.22), smoothstep(0.25, 0.9, x));\r
  c = mix(c, vec3(1.0, 0.92, 0.72), smoothstep(0.8, 1.6, x));\r
  c = mix(c, vec3(0.72, 0.85, 1.0), smoothstep(1.6, 2.6, x));\r
  return c;\r
}\r
\r
vec3 heat(float t) {\r
  t = clamp(t, 0.0, 1.0);\r
  vec3 c = mix(vec3(0.02, 0.02, 0.12), vec3(0.55, 0.05, 0.35), smoothstep(0.0, 0.32, t));\r
  c = mix(c, vec3(1.0, 0.45, 0.05), smoothstep(0.30, 0.68, t));\r
  c = mix(c, vec3(1.0, 0.95, 0.55), smoothstep(0.65, 1.0, t));\r
  return c;\r
}\r
\r
vec3 starLayer(vec3 d, float scale, float threshold, float seed) {\r
  vec3 q = d * scale + seed;\r
  vec3 id = floor(q);\r
  vec3 f = fract(q);\r
  vec3 rnd = vec3(hash13(id + 1.7), hash13(id + 9.2), hash13(id + 27.3));\r
  float dist = length(f - rnd);\r
  float core = smoothstep(0.055, 0.0, dist);\r
  float present = step(threshold, hash13(id + 53.1));\r
  float mag = pow(hash13(id + 81.7), 3.0);\r
  vec3 tint = mix(vec3(0.65, 0.78, 1.0), vec3(1.0, 0.82, 0.6), hash13(id + 13.9));\r
  return core * present * (0.40 + 6.0 * mag) * tint;\r
}\r
\r
// Procedural starfield + Milky Way band, evaluated on the *deflected* ray\r
// direction. No texture, cubemap, image or environment asset is used.\r
vec3 background(vec3 d) {\r
  vec3 col = vec3(0.0035, 0.0050, 0.0120);\r
  vec3 galN = normalize(vec3(0.32, 0.86, -0.39));\r
  float b = dot(d, galN) / 0.135;\r
  float band = exp(-b * b);\r
  float fil = fbm(d * 14.0 + vec3(11.0, 3.0, 5.0));\r
  float dust = fbm(d * 38.0 + vec3(2.0, 8.0, 1.0));\r
  vec3 galCol = mix(vec3(0.055, 0.085, 0.20), vec3(0.42, 0.30, 0.20), fil);\r
  float lanes = 0.22 + 1.15 * smoothstep(0.30, 0.76, dust);\r
  col += galCol * band * lanes * uGalaxyBrightness * 0.55;\r
  col += vec3(0.007, 0.009, 0.020) * fbm(d * 5.0 + 4.0) * 0.45;\r
  float thr = 1.0 - 0.030 * clamp(uStarDensity, 0.0, 2.0);\r
  col += starLayer(d, 70.0, thr, 0.0);\r
  col += starLayer(d, 140.0, thr + 0.006, 17.0) * 0.65;\r
  col += starLayer(d, 280.0, thr + 0.010, 43.0) * 0.40;\r
  col += starLayer(d, 560.0, thr + 0.014, 71.0) * 0.22;\r
  return col;\r
}\r
\r
// ------------------------------------------------------------------ geodesic\r
vec3 accel(vec3 p, float h2) {\r
  float r2 = dot(p, p);\r
  float r = sqrt(r2);\r
  return -1.5 * RS * h2 * p / (r2 * r2 * r + 1e-6);\r
}\r
\r
// Emission of one optically-thin disk slab sample. \`g\` returns the total\r
// frequency factor g = sqrt(1 - r_s/r) / (gamma (1 - beta.n_obs)); the\r
// observed specific intensity is boosted by g^4 (Liouville invariance).\r
vec3 diskSample(vec3 pc, vec3 vc, float pathStep, out float g) {\r
  float r = max(length(pc.xz), 1e-3);\r
  float phi = atan(pc.z, pc.x);\r
  float t = uTime;\r
\r
  float omega = uOrbitSpeed * sqrt(0.5 / max(r, 1.05));\r
  float swirl = phi - omega * t * 0.35 * uTurbSpeed;\r
  vec3 q = vec3(cos(swirl) * r * 4.5, sin(swirl) * r * 4.5, r * 3.2 - t * 0.18 * uTurbSpeed);\r
  float n = fbm(q);\r
  float arms = 0.5 + 0.5 * sin(phi * 3.0 - log(max(r, 1.01)) * 5.0 + omega * t * 2.0);\r
  float dens = clamp(1.0 + uTurbAmp * (2.0 * n - 1.0) * 0.85 + uTurbAmp * 0.30 * (arms - 0.5), 0.08, 3.0);\r
\r
  float h = max(uDiskThickness, 0.005);\r
  float yn = pc.y / h;\r
  float vert = exp(-1.6 * yn * yn);\r
\r
  float radial = smoothstep(uDiskInner, uDiskInner + 0.35, r)\r
               * (1.0 - smoothstep(uDiskOuter - 1.6, uDiskOuter, r));\r
\r
  float temp = uDiskTemp * pow(uDiskInner / max(r, 0.5), 0.75);\r
  vec3 base = blackbody(temp);\r
  float dr = (r - uDiskInner) / 0.55;\r
  float hotRim = 1.0 + 1.1 * exp(-dr * dr);\r
  float bright = pow(clamp(temp, 0.15, 4.0), 2.4) * hotRim;\r
\r
  float beta = clamp(uOrbitSpeed * sqrt(0.5 / max(r, 1.05)), 0.0, 0.92);\r
  vec3 betaVec = beta * normalize(vec3(pc.z, 0.0, -pc.x) + vec3(1e-5));\r
  vec3 nObs = -normalize(vc + vec3(1e-6));\r
  float gamma = 1.0 / sqrt(max(1.0 - dot(betaVec, betaVec), 1e-4));\r
  float doppler = 1.0 / max(gamma * (1.0 - dot(betaVec, nObs)), 0.08);\r
  float grav = sqrt(max(1.0 - RS / max(r, 1.0001), 0.02));\r
  g = grav * doppler;\r
  float boost = pow(clamp(g, 0.06, 5.0), 4.0);\r
\r
  return base * (0.9 + 0.35 * arms) * bright * dens * vert * radial\r
       * boost * uEmission * 0.55 * pathStep;\r
}\r
\r
void main() {\r
  vec2 ndc = vUv * 2.0 - 1.0;\r
  vec3 dir0 = normalize(uCamForward\r
      + ndc.x * uAspect * uTanHalfFov * uCamRight\r
      + ndc.y * uTanHalfFov * uCamUp);\r
\r
  vec3 p = uCamPos;\r
  vec3 v = dir0;\r
  vec3 L = cross(p, v);\r
  float h2 = dot(L, L);\r
\r
  vec3 color = vec3(0.0);\r
  float T = 1.0;                 // ordered transmittance along the ray\r
  int crossings = 0;\r
  float rMin = length(p);\r
  float ringPath = 0.0;\r
  float lastG = 1.0;\r
  float bestCrossLum = 0.0;\r
  int bestOrder = 0;\r
  bool captured = false;\r
  bool maxedOut = false;\r
  int stepsUsed = 0;\r
\r
  for (int i = 0; i < LOOP_CAP; i++) {\r
    if (i >= uMaxSteps) { maxedOut = true; break; }\r
\r
    vec3 p0 = p;\r
    vec3 v0 = v;\r
    float r0 = length(p0);\r
\r
    float ds = clamp(uStepScale * 0.062 * r0, 0.008, 0.95);\r
    float dl = ds / max(length(v0), 1e-3);\r
\r
    // RK4 for the second-order system dp/dlambda = v, dv/dlambda = accel(p).\r
    vec3 k1p = v0;\r
    vec3 k1v = accel(p0, h2);\r
    vec3 k2p = v0 + 0.5 * dl * k1v;\r
    vec3 k2v = accel(p0 + 0.5 * dl * k1p, h2);\r
    vec3 k3p = v0 + 0.5 * dl * k2v;\r
    vec3 k3v = accel(p0 + 0.5 * dl * k2p, h2);\r
    vec3 k4p = v0 + dl * k3v;\r
    vec3 k4v = accel(p0 + dl * k3p, h2);\r
    vec3 p1 = p0 + (dl / 6.0) * (k1p + 2.0 * k2p + 2.0 * k3p + k4p);\r
    vec3 v1 = v0 + (dl / 6.0) * (k1v + 2.0 * k2v + 2.0 * k3v + k4v);\r
\r
    stepsUsed = i + 1;\r
    float r1 = length(p1);\r
    rMin = min(rMin, r1);\r
    if (r1 > 1.28 && r1 < 1.85) ringPath += length(p1 - p0);\r
\r
    // ---- curved-path intersection with the equatorial emitting slab -------\r
    // Each segment that spends time inside |y| <= halfThickness contributes in\r
    // path order. A ray winding near the photon sphere crosses the slab many\r
    // times, producing the primary and higher-order disk images.\r
    float y0 = p0.y;\r
    float dy = p1.y - y0;\r
    float h = max(uDiskThickness, 0.005);\r
    float ta = 0.0;\r
    float tb = 1.0;\r
    bool inSlab = false;\r
    if (abs(dy) < 1e-6) {\r
      inSlab = abs(y0) <= h;\r
    } else {\r
      float tA = (-h - y0) / dy;\r
      float tB = (h - y0) / dy;\r
      ta = max(0.0, min(tA, tB));\r
      tb = min(1.0, max(tA, tB));\r
      inSlab = tb > ta;\r
    }\r
    if (inSlab) {\r
      float slabLen = (tb - ta) * length(p1 - p0);\r
      vec3 pc0 = mix(p0, p1, (ta + tb) * 0.5);\r
      float rc = length(pc0.xz);\r
      if (rc >= uDiskInner && rc <= uDiskOuter && slabLen > 1e-5) {\r
        int ns = uDiskSamples;\r
        if (ns < 1) ns = 1;\r
        if (ns > 4) ns = 4;\r
        vec3 acc = vec3(0.0);\r
        float gSum = 0.0;\r
        for (int s = 0; s < 4; s++) {\r
          if (s >= ns) break;\r
          float tt = ta + (tb - ta) * (float(s) + 0.5) / float(ns);\r
          vec3 pc = mix(p0, p1, tt);\r
          vec3 vc = mix(v0, v1, tt);\r
          float g = 1.0;\r
          acc += diskSample(pc, vc, slabLen / float(ns), g);\r
          gSum += g;\r
        }\r
        float lum = dot(acc, vec3(0.3333));\r
        if (lum > bestCrossLum) {\r
          bestCrossLum = lum;\r
          lastG = gSum / float(ns);\r
          bestOrder = crossings + 1; // dominant image order for debug view 3\r
        }\r
        crossings += 1;\r
        color += T * acc;      // ordered composition of multiple crossings\r
        T *= 0.86;\r
      }\r
    }\r
\r
    p = p1;\r
    v = v1;\r
\r
    if (r1 <= RS * 1.002) { captured = true; break; }\r
    if (r1 > ESCAPE_R && dot(p1, v1) > 0.0) break;\r
  }\r
\r
  vec3 dirOut = normalize(v);\r
  float deflection = acos(clamp(dot(dir0, dirOut), -1.0, 1.0));\r
  vec3 bg = captured ? vec3(0.0) : background(dirOut);\r
  if (!captured) color += T * bg;\r
\r
  // Photon ring: light accumulated along near-critical winding paths. This is\r
  // derived from the integrated r_min / path length, not a baked texture.\r
  float ring = exp(-6.0 * abs(rMin - PHOTON_R)) * clamp(ringPath, 0.0, 60.0);\r
  color += vec3(1.0, 0.72, 0.42) * ring * 0.035 * (captured ? 0.25 : 1.0);\r
\r
  // ---------------------------------------------------------- debug channels\r
  vec3 dbg = vec3(0.0);\r
  if (uDebug == 1) {\r
    float t = float(stepsUsed) / max(float(uMaxSteps), 1.0);\r
    dbg = heat(t);\r
    if (captured) dbg = mix(dbg, vec3(0.75, 0.05, 0.08), 0.78);\r
    else if (maxedOut) dbg = mix(dbg, vec3(0.95, 0.72, 0.12), 0.55);\r
    else dbg = mix(dbg, vec3(0.15, 0.75, 0.45), 0.18);\r
  } else if (uDebug == 2) {\r
    dbg = captured ? vec3(0.92, 0.95, 1.0) : vec3(0.015, 0.02, 0.035);\r
    dbg += vec3(0.05, 0.85, 1.0) * exp(-40.0 * abs(rMin - PHOTON_R)) * (captured ? 0.0 : 1.0);\r
  } else if (uDebug == 3) {\r
    vec3 oc = bestOrder == 1 ? vec3(1.0, 0.18, 0.12)\r
            : bestOrder == 2 ? vec3(0.15, 1.0, 0.35)\r
            : bestOrder == 3 ? vec3(0.20, 0.45, 1.0)\r
            : bestOrder == 4 ? vec3(1.0, 0.80, 0.15)\r
                             : vec3(0.95, 0.95, 1.0);\r
    dbg = bestOrder == 0 ? vec3(0.02, 0.025, 0.04)\r
                         : oc * clamp(0.22 + bestCrossLum * 1.6, 0.22, 1.0);\r
  } else if (uDebug == 4) {\r
    float g = lastG;\r
    vec3 neutral = vec3(0.10, 0.12, 0.18);\r
    dbg = g < 1.0 ? mix(neutral, vec3(0.85, 0.12, 0.06), clamp((1.0 - g) * 1.6, 0.0, 1.0))\r
                  : mix(neutral, vec3(0.35, 0.72, 1.0), clamp((g - 1.0) * 1.1, 0.0, 1.0));\r
    dbg += vec3(0.9) * pow(fract(g * 3.0), 8.0) * 0.25;\r
    if (crossings == 0) dbg *= 0.25;\r
  } else if (uDebug == 5) {\r
    dbg = dirOut * 0.5 + 0.5;\r
    float az = atan(dirOut.z, dirOut.x);\r
    float el = asin(clamp(dirOut.y, -1.0, 1.0));\r
    float grid = smoothstep(0.94, 1.0, abs(sin(az * 6.0)))\r
               + smoothstep(0.94, 1.0, abs(sin(el * 12.0)));\r
    dbg = mix(dbg, vec3(1.0), clamp(grid, 0.0, 1.0) * 0.55);\r
    if (captured) dbg *= 0.08;\r
  } else if (uDebug == 6) {\r
    dbg = pow(bg / (1.0 + bg), vec3(0.6)) * 1.35;\r
    if (captured) dbg *= 0.15;\r
  } else if (uDebug == 7) {\r
    float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));\r
    float l = log(1.0 + lum) / log(51.0);\r
    dbg = mix(color / (1.0 + color), heat(l), 0.45);\r
  } else if (uDebug == 8) {\r
    dbg = heat(clamp(deflection / PI, 0.0, 1.0));\r
    if (captured) dbg *= 0.25;\r
  } else if (uDebug == 9) {\r
    float t = clamp((rMin - 1.0) / 7.0, 0.0, 1.0);\r
    dbg = heat(1.0 - t);\r
    dbg = mix(dbg, vec3(0.6, 1.0, 1.0), exp(-30.0 * abs(rMin - PHOTON_R)));\r
    if (captured) dbg = mix(dbg, vec3(0.05, 0.02, 0.02), 0.75);\r
  }\r
\r
  gl_FragColor = vec4(uDebug == 0 ? color : dbg, 1.0);\r
}\r
`,hA=`// HDR bright-pass with a soft knee. Feeds the bloom pyramid.\r
precision highp float;\r
varying vec2 vUv;\r
uniform sampler2D tSrc;\r
uniform float uThreshold;\r
uniform float uKnee;\r
\r
void main() {\r
  vec3 c = texture2D(tSrc, vUv).rgb;\r
  float l = max(max(c.r, c.g), c.b);\r
  float soft = clamp(l - uThreshold + uKnee, 0.0, 2.0 * uKnee);\r
  soft = soft * soft / (4.0 * uKnee + 1e-4);\r
  float contrib = max(soft, l - uThreshold) / max(l, 1e-4);\r
  gl_FragColor = vec4(c * contrib, 1.0);\r
}\r
`,dA=`// Plain downsample copy for successive bloom pyramid levels.\r
precision highp float;\r
varying vec2 vUv;\r
uniform sampler2D tSrc;\r
\r
void main() {\r
  gl_FragColor = vec4(texture2D(tSrc, vUv).rgb, 1.0);\r
}\r
`,pA=`// Separable 5-tap Gaussian (9-tap equivalent) used for H and V bloom passes.\r
precision highp float;\r
varying vec2 vUv;\r
uniform sampler2D tSrc;\r
uniform vec2 uDir;\r
uniform float uRadius;\r
\r
void main() {\r
  vec2 o1 = uDir * 1.3846153846 * uRadius;\r
  vec2 o2 = uDir * 3.2307692308 * uRadius;\r
  vec3 c = texture2D(tSrc, vUv).rgb * 0.2270270270;\r
  c += (texture2D(tSrc, vUv + o1).rgb + texture2D(tSrc, vUv - o1).rgb) * 0.3162162162;\r
  c += (texture2D(tSrc, vUv + o2).rgb + texture2D(tSrc, vUv - o2).rgb) * 0.0702702703;\r
  gl_FragColor = vec4(c, 1.0);\r
}\r
`,mA=`// Final HDR composite: multi-level bloom -> exposure -> ACES filmic ->\r
// sRGB encode -> restrained vignette / grain / radial chromatic aberration.\r
precision highp float;\r
varying vec2 vUv;\r
\r
uniform sampler2D tScene;\r
uniform sampler2D tBloom0;\r
uniform sampler2D tBloom1;\r
uniform sampler2D tBloom2;\r
uniform float uBloomIntensity;\r
uniform float uExposure;\r
uniform float uVignette;\r
uniform float uGrain;\r
uniform float uChroma;\r
uniform float uTime;\r
uniform int uBloomLevels;\r
uniform int uDebug;\r
\r
// ACES filmic tone-mapping fit (Narkowicz 2015), an explicit ACES-style curve.\r
vec3 aces(vec3 x) {\r
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;\r
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);\r
}\r
\r
vec3 linearToSRGB(vec3 c) {\r
  return mix(1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, c * 12.92,\r
             step(c, vec3(0.0031308)));\r
}\r
\r
float hash12(vec2 p) {\r
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);\r
  p3 += dot(p3, p3.yzx + 33.33);\r
  return fract((p3.x + p3.y) * p3.z);\r
}\r
\r
vec3 bloomAt(vec2 uv) {\r
  vec3 b = vec3(0.0);\r
  if (uBloomLevels > 0) b += texture2D(tBloom0, uv).rgb;\r
  if (uBloomLevels > 1) b += texture2D(tBloom1, uv).rgb * 0.70;\r
  if (uBloomLevels > 2) b += texture2D(tBloom2, uv).rgb * 0.45;\r
  return b;\r
}\r
\r
vec3 sceneAt(vec2 uv) {\r
  return texture2D(tScene, uv).rgb + bloomAt(uv) * uBloomIntensity;\r
}\r
\r
void main() {\r
  if (uDebug > 0) {\r
    // Diagnostic channels are already display-range; bypass the HDR grade so\r
    // the numbers/colours stay legible instead of being tone-mapped away.\r
    gl_FragColor = vec4(clamp(texture2D(tScene, vUv).rgb, 0.0, 1.0), 1.0);\r
    return;\r
  }\r
\r
  vec2 uv = vUv;\r
  vec2 d = uv - 0.5;\r
  float amt = uChroma * 0.006 * dot(d, d);\r
  vec3 hdr = vec3(\r
    sceneAt(uv + d * amt).r,\r
    sceneAt(uv).g,\r
    sceneAt(uv - d * amt).b\r
  );\r
\r
  vec3 mapped = linearToSRGB(aces(hdr * uExposure));\r
  float r2 = dot(d, d);\r
  float vig = 1.0 - uVignette * pow(r2 * 2.0, 1.15);\r
  mapped *= clamp(vig, 0.0, 1.0);\r
\r
  float grain = hash12(gl_FragCoord.xy + vec2(uTime * 37.0, uTime * 19.0)) - 0.5;\r
  mapped += vec3(uGrain * 0.055 * grain);\r
\r
  gl_FragColor = vec4(clamp(mapped, 0.0, 1.0), 1.0);\r
}\r
`,fv=3,Gd="gargantua.state.v3",Xa=["standard","high","cinematic"],Ho={standard:{label:"Standard",renderScale:.7,dprCap:1.25,maxSteps:120,stepScale:1.5,diskSamples:2,bloomLevels:1,blurRadius:1},high:{label:"High",renderScale:.88,dprCap:1.6,maxSteps:190,stepScale:1.2,diskSamples:3,bloomLevels:2,blurRadius:1.35},cinematic:{label:"Cinematic",renderScale:1,dprCap:2,maxSteps:280,stepScale:1,diskSamples:4,bloomLevels:3,blurRadius:1.7}},Vd="high",qc=[{key:"fov",label:"Field of view",unit:"deg",min:25,max:100,step:1,def:58,group:"Camera",hint:"Perspective FOV fed to the shader ray basis and OrbitControls camera."},{key:"distance",label:"Camera distance",unit:"rs",min:3.2,max:60,step:.1,def:14,group:"Camera",hint:"Observer radius in Schwarzschild units."},{key:"azimuth",label:"Camera azimuth",unit:"deg",min:-180,max:180,step:1,def:0,group:"Camera",hint:"Orbital longitude of the observer around the hole."},{key:"pitch",label:"Camera pitch",unit:"deg",min:-85,max:85,step:1,def:8,group:"Camera",hint:"Elevation above the accretion disk plane."},{key:"timeScale",label:"Time multiplier",unit:"x",min:0,max:4,step:.05,def:1,group:"Camera",hint:"Rate of the animated disk turbulence and cinematic clock."},{key:"diskInner",label:"Disk inner radius",unit:"rs",min:1.6,max:8,step:.05,def:3,group:"Accretion disk",hint:"Inner edge (ISCO-like) of the emitting slab."},{key:"diskOuter",label:"Disk outer radius",unit:"rs",min:5,max:30,step:.1,def:12,group:"Accretion disk",hint:"Outer edge of the emitting slab."},{key:"diskThickness",label:"Disk half thickness",unit:"rs",min:.02,max:2,step:.01,def:.4,group:"Accretion disk",hint:"Vertical Gaussian scale height; changes the integrated slab path length."},{key:"diskTemp",label:"Disk temperature",unit:"x",min:.3,max:3,step:.01,def:1.3,group:"Accretion disk",hint:"Blackbody colour temperature scale; T(r) ~ r^(-3/4)."},{key:"emission",label:"Disk emission",unit:"x",min:0,max:4,step:.01,def:1.75,group:"Accretion disk",hint:"Overall emissivity of the optically thin disk."},{key:"orbitSpeed",label:"Orbital speed",unit:"x",min:0,max:2,step:.01,def:1,group:"Accretion disk",hint:"Keplerian beta = sqrt(M/r) multiplier; drives Doppler beaming."},{key:"turbAmp",label:"Turbulence amplitude",unit:"x",min:0,max:2,step:.01,def:.35,group:"Accretion disk",hint:"Strength of procedural fBm density filaments."},{key:"turbSpeed",label:"Turbulence speed",unit:"x",min:0,max:3,step:.01,def:1,group:"Accretion disk",hint:"Advection rate of the co-rotating turbulent pattern."},{key:"starDensity",label:"Star density",unit:"x",min:0,max:2,step:.01,def:1.15,group:"Background",hint:"Threshold for procedural multi-scale star cells."},{key:"galaxyBrightness",label:"Galaxy brightness",unit:"x",min:0,max:3,step:.01,def:.75,group:"Background",hint:"Brightness of the procedurally generated, gravitationally lensed galactic band."},{key:"bloomIntensity",label:"Bloom intensity",unit:"x",min:0,max:3,step:.01,def:1.35,group:"Post processing",hint:"Weight of the multi-resolution bloom pyramid in HDR compositing."},{key:"bloomThreshold",label:"Bloom threshold",unit:"x",min:0,max:4,step:.01,def:1.55,group:"Post processing",hint:"Soft HDR luminance knee of the bright-pass extractor."},{key:"exposure",label:"Exposure",unit:"x",min:.2,max:4,step:.01,def:1,group:"Post processing",hint:"Linear exposure applied before ACES tone mapping."},{key:"vignette",label:"Vignette",unit:"x",min:0,max:1.5,step:.01,def:.45,group:"Post processing",hint:"Radial lens falloff; kept clear of the photon ring."},{key:"grain",label:"Film grain",unit:"x",min:0,max:1,step:.01,def:.22,group:"Post processing",hint:"Deterministic per-pixel grain keyed by frozen simulation time."},{key:"chroma",label:"Chromatic aberration",unit:"x",min:0,max:2,step:.01,def:.55,group:"Post processing",hint:"Radial per-channel sampling offset in the composite."}],en=Object.fromEntries(qc.map(s=>[s.key,s])),Is=[{name:"EDGE-ON",fov:58,distance:14,azimuth:0,pitch:8},{name:"GARGANTUA",fov:62,distance:18,azimuth:32,pitch:16},{name:"POLAR",fov:55,distance:22,azimuth:120,pitch:68},{name:"PHOTON RING",fov:42,distance:7.5,azimuth:-55,pitch:10}],Ad=[{name:"FINAL COMPOSITE",desc:"HDR geodesic render + bloom + ACES + lens grade."},{name:"RAY STEPS / STOP",desc:"Integration step count heatmap; red = horizon capture, amber = step budget exhausted."},{name:"HORIZON MASK",desc:"Event-horizon capture mask; cyan band marks the critical photon sphere."},{name:"DISK CROSSINGS",desc:"Ordered disk-plane intersections: 1st red, 2nd green, 3rd blue, 4th+ amber."},{name:"REDSHIFT / DOPPLER",desc:"Total frequency factor g; red = net redshift, blue-white = Doppler blueshift."},{name:"LENSED SKY COORDS",desc:"Escaped-ray sky coordinates with azimuth/elevation contours showing lensing distortion."},{name:"STARS / GALAXY",desc:"Procedural starfield and Milky Way band only, still sampled along bent rays."},{name:"PRE-POST HDR",desc:"Scene HDR luminance before bloom, graded with a log heatmap."},{name:"DEFLECTION",desc:"Total bending angle between the launch direction and the asymptotic ray direction."},{name:"MIN RADIUS",desc:"Closest approach r_min; the bright band is the unstable photon orbit at 1.5 rs."}],gA=[["0 - 9","Switch debug view"],["Shift + 1 - 4","Camera preset 1 - 4"],["Space","Play / pause cinematic loop"],["H","Show / hide HUD"],["R","Reset all state to defaults"],["Q","Cycle quality tier"],["M","Toggle procedural ambience (off by default)"]];function _A(s){const t=new URLSearchParams(s),i={capture:t.get("capture")==="1",invalid:[]};if(t.has("quality")){const r=t.get("quality");i.quality=Xa.includes(r)?{present:!0,value:r,valid:!0}:{present:!0,value:null,valid:!1},i.quality.valid||i.invalid.push("quality")}if(t.has("preset")){const r=t.get("preset"),l=/^\d+$/.test(r)&&Number(r)>=0&&Number(r)<=3;i.preset={present:!0,value:l?Number(r):null,valid:l},l||i.invalid.push("preset")}if(t.has("debug")){const r=t.get("debug"),l=/^\d+$/.test(r)&&Number(r)>=0&&Number(r)<=9;i.debug={present:!0,value:l?Number(r):null,valid:l},l||i.invalid.push("debug")}if(t.has("hud")){const r=t.get("hud"),l=r==="0"||r==="1";i.hud={present:!0,value:l?r==="1":null,valid:l},l||i.invalid.push("hud")}if(t.has("time")){const r=t.get("time"),l=Number(r),u=r!==""&&Number.isFinite(l)&&l>=0;i.time={present:!0,value:u?l:null,valid:u},u||i.invalid.push("time")}return i}const hv=0,kd=0,Wc=0;function Yc(){return(typeof globalThis.innerWidth=="number"?globalThis.innerWidth:1200)>768}function Qo(){return{version:fv,params:Object.fromEntries(qc.map(s=>[s.key,s.def])),quality:Vd,preset:hv,hudOpen:Yc(),debug:kd,cinematicPlaying:!0,time:Wc}}const Vo=(s,t,i)=>Math.min(i,Math.max(t,s));function vA(s){if(!s||typeof s!="object"||s.version!==fv)return Qo();const t=Qo(),i=s.params&&typeof s.params=="object"?s.params:{};for(const r of qc){const l=i[r.key];t.params[r.key]=typeof l=="number"&&Number.isFinite(l)?Vo(l,r.min,r.max):r.def}return t.quality=Xa.includes(s.quality)?s.quality:Vd,t.preset=Number.isInteger(s.preset)&&s.preset>=0&&s.preset<Is.length?s.preset:null,t.hudOpen=typeof s.hudOpen=="boolean"?s.hudOpen:Yc(),t.debug=Number.isInteger(s.debug)&&s.debug>=0&&s.debug<=9?s.debug:kd,t.cinematicPlaying=typeof s.cinematicPlaying=="boolean"?s.cinematicPlaying:!0,t.time=typeof s.time=="number"&&Number.isFinite(s.time)&&s.time>=0?s.time:Wc,t}function dv(){try{const s=globalThis.localStorage?.getItem(Gd);return s==null?{state:Qo(),ok:!0,reason:"empty"}:{state:vA(JSON.parse(s)),ok:!0,reason:"loaded"}}catch(s){return{state:Qo(),ok:!1,reason:String(s?.message??s)}}}function SA(s){try{return globalThis.localStorage?.setItem(Gd,JSON.stringify(s)),{ok:!0,error:null}}catch(t){return{ok:!1,error:String(t?.message??t)}}}function xA(){try{return globalThis.localStorage?.removeItem(Gd),{ok:!0,error:null}}catch(s){return{ok:!1,error:String(s?.message??s)}}}function pv(s,t){const i=Is[t];return i?(s.params.fov=Vo(i.fov,en.fov.min,en.fov.max),s.params.distance=Vo(i.distance,en.distance.min,en.distance.max),s.params.azimuth=Vo(i.azimuth,en.azimuth.min,en.azimuth.max),s.params.pitch=Vo(i.pitch,en.pitch.min,en.pitch.max),s.preset=t,!0):!1}function yA(s){return{version:s.version,params:{...s.params},quality:s.quality,preset:s.preset,hudOpen:s.hudOpen,debug:s.debug,cinematicPlaying:s.cinematicPlaying,time:s.time}}function Rd(s,t,i){if(i.quality?.present&&(s.quality=i.quality.valid?i.quality.value:Vd),i.preset?.present){const r=i.preset.valid?i.preset.value:hv;pv(s,r)}i.debug?.present&&(s.debug=i.debug.valid?i.debug.value:kd),i.hud?.present&&(s.hudOpen=i.hud.valid?i.hud.value:Yc()),i.time?.present&&(s.time=i.time.valid?i.time.value:Wc),i.capture&&(t.frozenTime=s.time,s.cinematicPlaying=!1)}function MA(s){const t=dv(),i=t.state,r=_A(s);r.capture&&!r.time?.present&&(i.time=Wc);const l={capture:r.capture,timeFrozen:r.capture,frozenTime:i.time,invalidKeys:[...r.invalid],storageOk:t.ok,storageReason:t.reason,audioEnabled:!1,cinematicDisabled:r.capture,url:r};return Rd(i,l,r),!r.quality?.present&&t.reason==="empty"&&Yc()===!1&&(i.quality="standard"),{state:i,runtime:l,url:r}}const Ts=(s,t,i)=>Math.min(i,Math.max(t,s)),EA=["fov","distance","azimuth","pitch"];class bA{constructor({canvas:t,state:i,runtime:r,onStateChange:l,onContextState:u,onReady:h}){this.canvas=t,this.state=i,this.runtime=r,this.onStateChange=l??(()=>{}),this.onContextState=u??(()=>{}),this.onReady=h??(()=>{}),this.ready=!1,this.contextLost=!1,this.disposed=!1,this._programmatic=!1,this._dirty=!0,this.warnings=[],this.renderCount=0,this.frameHandle=0,this.lastFrameTs=0,this._lastUI=0,this._lastSync=0,this.simTime=r.timeFrozen?r.frozenTime:i.time,this.dpr=1,this.cssW=1,this.cssH=1,this.renderSize={width:0,height:0},this.hdrType="half-float",this._tmpVec=new $,this._tmpSph=new bd,this.tickBound=d=>this.tick(d),this.updateCinematicBase()}init(){this.renderer=new K1({canvas:this.canvas,antialias:!1,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.outputColorSpace=Tr,this.renderer.toneMapping=ca,this.renderer.debug.checkShaderErrors=!0,this.renderer.setClearColor(0,1),this.renderer.autoClear=!0,this.renderer.getContext().getExtension("EXT_color_buffer_float")||(this.hdrType="unsigned-byte",this.warnings.push("EXT_color_buffer_float unavailable: LDR render targets")),this.camera=new pi(this.state.params.fov,1,.1,2e3),this.controls=new J1(this.camera,this.canvas),this.controls.enableDamping=!this.runtime.capture,this.controls.dampingFactor=.075,this.controls.enablePan=!1,this.controls.minDistance=en.distance.min,this.controls.maxDistance=en.distance.max,this.controls.minPolarAngle=.04,this.controls.maxPolarAngle=Math.PI-.04,this.controls.rotateSpeed=.65,this.controls.zoomSpeed=.9,this.controls.target.set(0,0,0),this._onControlsChange=()=>this.handleControlsChange(),this._onControlsStart=()=>this.handleControlsStart(),this.controls.addEventListener("change",this._onControlsChange),this.controls.addEventListener("start",this._onControlsStart),this._onResize=()=>this.resize(),window.addEventListener("resize",this._onResize),this._onLost=i=>{i.preventDefault(),this.handleContextLost()},this._onRestored=()=>this.handleContextRestored(),this.canvas.addEventListener("webglcontextlost",this._onLost,!1),this.canvas.addEventListener("webglcontextrestored",this._onRestored,!1),this.quadScene=new sM,this.quadCamera=new av(-1,1,1,-1,0,1),this.buildResources(),this.applyState(),this.resize(),this.compileAndCheck(),this.renderFrame(),this.markReady(),this.start()}dispose(){this.disposed=!0,this.stop(),this.controls?.removeEventListener("change",this._onControlsChange),this.controls?.removeEventListener("start",this._onControlsStart),this.controls?.dispose(),window.removeEventListener("resize",this._onResize),this.canvas.removeEventListener("webglcontextlost",this._onLost),this.canvas.removeEventListener("webglcontextrestored",this._onRestored),this.disposeResources(),this.renderer?.dispose()}start(){this.frameHandle||this.disposed||(this.lastFrameTs=0,this.frameHandle=requestAnimationFrame(this.tickBound))}stop(){this.frameHandle&&cancelAnimationFrame(this.frameHandle),this.frameHandle=0}buildResources(){const t={depthTest:!1,depthWrite:!1,blending:la};this.quadGeo=new tl(2,2),this.geodesicMaterial=new ei({...t,vertexShader:Fo,fragmentShader:fA,uniforms:{uTime:{value:0},uTanHalfFov:{value:.5},uAspect:{value:1},uCamPos:{value:new $},uCamRight:{value:new $(1,0,0)},uCamUp:{value:new $(0,1,0)},uCamForward:{value:new $(0,0,-1)},uDiskInner:{value:3},uDiskOuter:{value:12},uDiskThickness:{value:.4},uDiskTemp:{value:1.3},uEmission:{value:1.75},uOrbitSpeed:{value:1},uTurbAmp:{value:.35},uTurbSpeed:{value:1},uStarDensity:{value:1.15},uGalaxyBrightness:{value:.75},uStepScale:{value:1},uMaxSteps:{value:150},uDiskSamples:{value:2},uDebug:{value:0}}}),this.brightMaterial=new ei({...t,vertexShader:Fo,fragmentShader:hA,uniforms:{tSrc:{value:null},uThreshold:{value:1.55},uKnee:{value:.6}}}),this.copyMaterial=new ei({...t,vertexShader:Fo,fragmentShader:dA,uniforms:{tSrc:{value:null}}}),this.blurMaterial=new ei({...t,vertexShader:Fo,fragmentShader:pA,uniforms:{tSrc:{value:null},uDir:{value:new he(1,0)},uRadius:{value:1.3}}}),this.compositeMaterial=new ei({...t,vertexShader:Fo,fragmentShader:mA,uniforms:{tScene:{value:null},tBloom0:{value:null},tBloom1:{value:null},tBloom2:{value:null},uBloomIntensity:{value:1.35},uExposure:{value:1},uVignette:{value:.45},uGrain:{value:.22},uChroma:{value:.55},uTime:{value:0},uBloomLevels:{value:2},uDebug:{value:0}}}),this.allMaterials=[this.geodesicMaterial,this.brightMaterial,this.copyMaterial,this.blurMaterial,this.compositeMaterial],this.quad=new Ni(this.quadGeo,this.geodesicMaterial),this.quad.frustumCulled=!1,this.quadScene.add(this.quad),this.rtScene=null,this.brightTargets=[],this.tmpTargets=[],this.bloomTargets=[]}disposeResources(){for(const t of this.allMaterials??[])t.dispose();this.disposeTargets(),this.quadScene?.remove(this.quad),this.quadGeo?.dispose()}disposeTargets(){for(const t of[this.rtScene,...this.brightTargets,...this.tmpTargets,...this.bloomTargets])t&&t.dispose();this.rtScene=null,this.brightTargets=[],this.tmpTargets=[],this.bloomTargets=[]}buildTargets(){this.disposeTargets();const t=Ho[this.state.quality],i=Math.max(2,Math.floor(this.cssW*this.dpr*t.renderScale)),r=Math.max(2,Math.floor(this.cssH*this.dpr*t.renderScale));this.renderSize={width:i,height:r};const l={type:this.hdrType==="half-float"?Fs:Pi,format:gi,minFilter:mi,magFilter:mi,depthBuffer:!1,stencilBuffer:!1},u=(h,d)=>new Wa(Math.max(2,h),Math.max(2,d),l);this.rtScene=u(i,r);for(let h=0;h<3;h++){const d=Math.max(2,Math.floor(i/2**(h+1))),m=Math.max(2,Math.floor(r/2**(h+1)));this.brightTargets[h]=u(d,m),this.tmpTargets[h]=u(d,m),this.bloomTargets[h]=u(d,m)}for(const h of[this.rtScene,...this.brightTargets,...this.tmpTargets,...this.bloomTargets])this.renderer.setRenderTarget(h),this.renderer.clear(!0,!1,!1);this.renderer.setRenderTarget(null),this.bindCompositeTextures()}bindCompositeTextures(){const t=this.compositeMaterial.uniforms;t.tScene.value=this.rtScene.texture;for(let i=0;i<3;i++)t[`tBloom${i}`].value=this.bloomTargets[i].texture}resize(){if(!this.renderer||this.contextLost||this.disposed)return;this._dirty=!0;const t=Math.max(1,this.canvas.clientWidth||window.innerWidth),i=Math.max(1,this.canvas.clientHeight||window.innerHeight),r=Ho[this.state.quality];this.dpr=Math.min(window.devicePixelRatio||1,r.dprCap),this.cssW=t,this.cssH=i,this.renderer.setPixelRatio(this.dpr),this.renderer.setSize(t,i,!1),this.camera.aspect=t/i,this.camera.fov=this.state.params.fov,this.camera.updateProjectionMatrix(),this.geodesicMaterial.uniforms.uAspect.value=t/i,this.buildTargets()}setCameraFromParams(){const t=this.state.params,i=Cs.degToRad(90-t.pitch),r=Cs.degToRad(t.azimuth);this.camera.position.setFromSphericalCoords(t.distance,i,r),this.camera.fov=t.fov,this.camera.updateProjectionMatrix(),this.controls.target.set(0,0,0);const l=this.controls.enableDamping;this.controls.enableDamping=!1,this.controls.update(),this.controls.enableDamping=l}updateCameraBasis(){this.camera.updateMatrixWorld();const t=this.camera.matrixWorld.elements,i=this.geodesicMaterial.uniforms;i.uCamPos.value.copy(this.camera.position),i.uCamRight.value.set(t[0],t[1],t[2]).normalize(),i.uCamUp.value.set(t[4],t[5],t[6]).normalize(),i.uCamForward.value.set(-t[8],-t[9],-t[10]).normalize(),i.uTanHalfFov.value=Math.tan(Cs.degToRad(this.state.params.fov*.5))}applyState(){this._programmatic=!0,this.setCameraFromParams(),this._programmatic=!1,this.updateCameraBasis(),this.applyUniforms()}applyUniforms(){const t=this.state.params,i=Ho[this.state.quality],r=this.geodesicMaterial.uniforms;r.uTime.value=this.simTime,r.uDiskInner.value=t.diskInner,r.uDiskOuter.value=t.diskOuter,r.uDiskThickness.value=t.diskThickness,r.uDiskTemp.value=t.diskTemp,r.uEmission.value=t.emission,r.uOrbitSpeed.value=t.orbitSpeed,r.uTurbAmp.value=t.turbAmp,r.uTurbSpeed.value=t.turbSpeed,r.uStarDensity.value=t.starDensity,r.uGalaxyBrightness.value=t.galaxyBrightness,r.uStepScale.value=i.stepScale,r.uMaxSteps.value=i.maxSteps,r.uDiskSamples.value=i.diskSamples,r.uDebug.value=this.state.debug;const l=this.compositeMaterial.uniforms;l.uBloomIntensity.value=t.bloomIntensity,l.uExposure.value=t.exposure,l.uVignette.value=t.vignette,l.uGrain.value=t.grain,l.uChroma.value=t.chroma,l.uTime.value=this.simTime,l.uBloomLevels.value=i.bloomLevels,l.uDebug.value=this.state.debug,this.brightMaterial.uniforms.uThreshold.value=t.bloomThreshold,this.blurMaterial.uniforms.uRadius.value=i.blurRadius}updateCinematicBase(){this.cinematicBase={azimuth:this.state.params.azimuth,pitch:this.state.params.pitch,distance:this.state.params.distance}}cinematicPose(t){const i=this.cinematicBase??{azimuth:this.state.params.azimuth,pitch:this.state.params.pitch,distance:this.state.params.distance};return{azimuth:i.azimuth+22*Math.sin(t*.11),pitch:Ts(i.pitch+7*Math.sin(t*.16),en.pitch.min,en.pitch.max),distance:Ts(i.distance*(1+.06*Math.sin(t*.07)),en.distance.min,en.distance.max)}}persistOnly(){this._dirty=!0,this.state.time=this.runtime.timeFrozen?this.runtime.frozenTime:this.simTime;const t=SA(this.state);this.runtime.storageOk=t.ok,this.runtime.storageReason=t.error??"saved",this.onStateChange(this.getState())}commit({applyCamera:t=!0}={}){t?this.applyState():this.applyUniforms(),this.persistOnly()}setParam(t,i){const r=en[t];if(!r)return!1;const l=Number(i);return Number.isFinite(l)?(this.state.params[t]=Ts(l,r.min,r.max),EA.includes(t)&&(this.state.preset=null,this.state.cinematicPlaying&&!this.runtime.cinematicDisabled&&(this.state.cinematicPlaying=!1),this.updateCinematicBase()),this.commit(),!0):!1}setQuality(t){return Xa.includes(t)?this.state.quality===t?(this.commit(),!0):(this.state.quality=t,this.applyUniforms(),this.resize(),this.persistOnly(),!0):!1}setPreset(t){return!Number.isInteger(t)||t<0||t>=Is.length?!1:(pv(this.state,t),this.state.cinematicPlaying&&!this.runtime.cinematicDisabled&&(this.state.cinematicPlaying=!1),this.updateCinematicBase(),this.commit(),!0)}setDebug(t){return!Number.isInteger(t)||t<0||t>9?!1:(this.state.debug=t,this.commit({applyCamera:!1}),!0)}setTime(t){return!Number.isFinite(t)||t<0?!1:(this.simTime=t,this.state.time=t,this.runtime.capture&&(this.runtime.frozenTime=t),this.commit({applyCamera:!1}),!0)}setHud(t){return this.state.hudOpen=!!t,this.commit({applyCamera:!1}),!0}toggleCinematic(){return this.runtime.cinematicDisabled?this.state.cinematicPlaying:(this.state.cinematicPlaying=!this.state.cinematicPlaying,this.updateCinematicBase(),this.commit(),this.state.cinematicPlaying)}cycleQuality(){const t=Xa.indexOf(this.state.quality),i=Xa[(t+1)%Xa.length];return this.setQuality(i),i}reset(){xA();const t=Qo();return Rd(t,this.runtime,this.runtime.url),this.state=t,this.simTime=this.runtime.timeFrozen?this.runtime.frozenTime:t.time,this.updateCinematicBase(),this.commit(),this.resize(),!0}getState(){const t=yA(this.state),i=Ho[this.state.quality],r=Ad[this.state.debug];return{...t,time:this.simTime,ready:this.ready,capture:this.runtime.capture,frozen:this.runtime.timeFrozen,invalidKeys:[...this.runtime.invalidKeys??[]],storageOk:this.runtime.storageOk,storageReason:this.runtime.storageReason,renderSize:{...this.renderSize},dpr:this.dpr,qualityBudget:{...i},debugView:{index:this.state.debug,name:r.name,desc:r.desc},presetName:this.state.preset==null?"CUSTOM":Is[this.state.preset].name,frames:this.renderCount,contextLost:this.contextLost,hdr:this.hdrType,warnings:[...this.warnings],paramDefs:qc.map(l=>({...l}))}}handleControlsStart(){this.state.preset=null,!this.runtime.cinematicDisabled&&this.state.cinematicPlaying&&(this.state.cinematicPlaying=!1,this.updateCinematicBase(),this.persistOnly())}handleControlsChange(){if(this._programmatic||this.contextLost||this.disposed||this.state.cinematicPlaying&&!this.runtime.cinematicDisabled)return;const t=this._tmpVec.copy(this.camera.position).sub(this.controls.target),i=this._tmpSph.setFromVector3(t),r=this.state.params;r.azimuth=Ts(Cs.radToDeg(i.theta),en.azimuth.min,en.azimuth.max),r.pitch=Ts(90-Cs.radToDeg(i.phi),en.pitch.min,en.pitch.max),r.distance=Ts(i.radius,en.distance.min,en.distance.max),this.updateCinematicBase();const l=performance.now();l-this._lastSync>80&&(this._lastSync=l,this.persistOnly())}throttledUI(){const t=performance.now();t-this._lastUI<100||(this._lastUI=t,this.onStateChange(this.getState()))}compileAndCheck(){const t=this.quad.material;for(const r of this.allMaterials)this.quad.material=r,this.renderer.compile(this.quadScene,this.quadCamera);this.quad.material=t;const i=(this.renderer.info.programs??[]).filter(r=>r.diagnostics);if(i.length){const r=i.map(l=>l.diagnostics?.programLog||l.diagnostics?.fragmentShader?.log||"shader error").join(`
`);throw new Error(`Shader compilation failed: ${r}`)}}blit(t,i){this.quad.material=t,this.renderer.setRenderTarget(i),this.renderer.render(this.quadScene,this.quadCamera)}blurPass(t,i,r,l){this.blurMaterial.uniforms.tSrc.value=t.texture,this.blurMaterial.uniforms.uDir.value.set(1/i.width,0),this.blurMaterial.uniforms.uRadius.value=l,this.blit(this.blurMaterial,i),this.blurMaterial.uniforms.tSrc.value=i.texture,this.blurMaterial.uniforms.uDir.value.set(0,1/i.height),this.blit(this.blurMaterial,r)}renderBloom(t){this.brightMaterial.uniforms.tSrc.value=this.rtScene.texture,this.brightMaterial.uniforms.uThreshold.value=this.state.params.bloomThreshold,this.blit(this.brightMaterial,this.brightTargets[0]),this.blurPass(this.brightTargets[0],this.tmpTargets[0],this.bloomTargets[0],t.blurRadius);for(let i=1;i<t.bloomLevels;i++)this.copyMaterial.uniforms.tSrc.value=this.bloomTargets[i-1].texture,this.blit(this.copyMaterial,this.brightTargets[i]),this.blurPass(this.brightTargets[i],this.tmpTargets[i],this.bloomTargets[i],t.blurRadius)}renderFrame(){if(this.contextLost||this.disposed||!this.rtScene)return;const t=Ho[this.state.quality];this.quad.material=this.geodesicMaterial,this.renderer.setRenderTarget(this.rtScene),this.renderer.render(this.quadScene,this.quadCamera),this.renderBloom(t),this.quad.material=this.compositeMaterial,this.renderer.setRenderTarget(null),this.renderer.render(this.quadScene,this.quadCamera),this.renderCount++}sampleFrame(){if(this.contextLost||this.disposed)return null;this.renderFrame();const t=this.renderer.getContext();t.bindFramebuffer(t.FRAMEBUFFER,null);const i=this.canvas.width,r=this.canvas.height;if(i<2||r<2)return null;const l=new Uint8Array(i*r*4);t.readPixels(0,0,i,r,t.RGBA,t.UNSIGNED_BYTE,l);let u=0,h=0,d=0,m=0,p=0,S=0,_=0;for(let M=0;M<r;M+=2)for(let A=0;A<i;A+=2){const R=(M*i+A)*4,y=.2126*l[R]+.7152*l[R+1]+.0722*l[R+2];u+=y,h+=y*y,d++,y<6&&m++,y>170&&p++,Math.abs(A-i/2)<i*.09&&Math.abs(M-r/2)<r*.09&&(S+=y,_++)}const x=u/Math.max(d,1);return{width:i,height:r,mean:x,std:Math.sqrt(Math.max(h/Math.max(d,1)-x*x,0)),darkFraction:m/Math.max(d,1),brightFraction:p/Math.max(d,1),centerMean:_?S/_:0,samples:d}}tick(t){if(this.frameHandle=requestAnimationFrame(this.tickBound),this.contextLost||this.disposed||this.runtime.timeFrozen&&!this._dirty)return;const i=t*.001,r=this.lastFrameTs?Math.min(Math.max(i-this.lastFrameTs,0),.1):0;if(this.lastFrameTs=i,this.runtime.timeFrozen?this.simTime=this.runtime.frozenTime:this.simTime+=r*this.state.params.timeScale,this.state.cinematicPlaying&&!this.runtime.cinematicDisabled){const u=this.cinematicPose(this.simTime);this.state.params.azimuth=u.azimuth,this.state.params.pitch=u.pitch,this.state.params.distance=u.distance,this._programmatic=!0,this.setCameraFromParams(),this._programmatic=!1,this.throttledUI()}else this.controls.update();this.applyUniforms(),this.updateCameraBasis(),this.renderFrame(),this.runtime.timeFrozen&&(this._dirty=!1)}handleContextLost(){this.contextLost=!0,this.stop(),this.onContextState("lost")}handleContextRestored(){if(!this.disposed)try{this.disposeResources(),this.buildResources();const t=dv(),i=t.state;Rd(i,this.runtime,this.runtime.url),this.state=i,this.simTime=this.runtime.timeFrozen?this.runtime.frozenTime:i.time,this.runtime.storageOk=t.ok,this.updateCinematicBase(),this.contextLost=!1,this.applyState(),this.resize(),this.compileAndCheck(),this._dirty=!0,this.renderFrame(),this.onContextState("restored"),this.start()}catch(t){this.warnings.push(`context restore: ${t?.message??t}`),this.onContextState("error",String(t?.message??t))}}simulateContextLoss(){const i=this.renderer.getContext().getExtension("WEBGL_lose_context");return i?(i.loseContext(),setTimeout(()=>{try{i.restoreContext()}catch(r){this.warnings.push(`restoreContext: ${r?.message??r}`)}},1300),{ok:!0,reason:"loss induced; restore scheduled in 1.3s"}):{ok:!1,reason:"WEBGL_lose_context unavailable"}}restoreContextNow(){const i=this.renderer.getContext().getExtension("WEBGL_lose_context");return i?(i.restoreContext(),{ok:!0,reason:"restore requested"}):{ok:!1,reason:"WEBGL_lose_context unavailable"}}markReady(){this.ready=!0,document.documentElement.dataset.gargantuaReady="true",this.onReady()}}function TA(s){const t=()=>{try{return s.getState()}catch{return{ok:!1,error:"state unavailable"}}},i=()=>({ok:!0,...t()}),r=h=>({ok:!1,error:h,...t()}),l=h=>{try{return h()?i():r("invalid input")}catch(d){return r(String(d?.message??d))}},u={get ready(){return!!s.ready},getState:t,setQuality:h=>l(()=>typeof h=="string"&&Xa.includes(h)&&s.setQuality(h)),setPreset:h=>l(()=>Number.isInteger(h)&&h>=0&&h<Is.length&&s.setPreset(h)),setDebug:h=>l(()=>Number.isInteger(h)&&h>=0&&h<=9&&s.setDebug(h)),setTime:h=>l(()=>{const d=typeof h=="number"?h:typeof h=="string"&&h.trim()!==""?Number(h):NaN;return Number.isFinite(d)&&d>=0&&s.setTime(d)}),setParam:(h,d)=>l(()=>s.setParam(h,d)),setHud:h=>l(()=>s.setHud(!!h)),reset:()=>l(()=>s.reset()),cycleQuality:()=>l(()=>!!s.cycleQuality()),toggleCinematic:()=>l(()=>s.toggleCinematic()),sampleFrame:()=>{try{return{ok:!0,...s.sampleFrame()}}catch(h){return{ok:!1,error:String(h?.message??h)}}},simulateContextLoss:()=>{try{return s.simulateContextLoss()}catch(h){return{ok:!1,reason:String(h?.message??h)}}},restoreContextNow:()=>{try{return s.restoreContextNow()}catch(h){return{ok:!1,reason:String(h?.message??h)}}}};return Object.defineProperty(window,"__GARGANTUA__",{value:u,writable:!1,configurable:!0,enumerable:!0}),u}class AA{constructor(){this.ctx=null,this.nodes=[],this.playing=!1,this.error=null}toggle(t){return t??!this.playing?this.start():this.stop()}start(){if(this.playing)return!0;try{const t=window.AudioContext||window.webkitAudioContext;if(!t)return this.error="WebAudio unavailable",!1;const i=new t,r=i.createGain();r.gain.value=0;const l=i.createBiquadFilter();l.type="lowpass",l.frequency.value=280,l.Q.value=.6,l.connect(r),r.connect(i.destination);const u=i.createOscillator();u.type="sine",u.frequency.value=55;const h=i.createOscillator();h.type="triangle",h.frequency.value=82.41;const d=i.createOscillator();d.type="sine",d.frequency.value=110.3,u.connect(l),h.connect(l),d.connect(l);const m=i.createOscillator();m.frequency.value=.07;const p=i.createGain();return p.gain.value=.018,m.connect(p),p.connect(r.gain),u.start(),h.start(),d.start(),m.start(),r.gain.setTargetAtTime(.045,i.currentTime,1.2),i.state==="suspended"&&i.resume().catch(()=>{}),this.ctx=i,this.nodes=[u,h,d,m,p,r,l],this.playing=!0,this.error=null,!0}catch(t){return this.error=String(t?.message??t),!1}}stop(){if(!this.playing)return!1;try{for(const t of this.nodes)typeof t.stop=="function"&&t.stop(),t.disconnect();this.ctx?.close().catch(()=>{})}catch(t){this.error=String(t?.message??t)}return this.ctx=null,this.nodes=[],this.playing=!1,!1}dispose(){this.stop()}}const RA=["Camera","Accretion disk","Background","Post processing"];function CA(s,t){return t>=1?String(Math.round(s)):s.toFixed(2)}function DA({def:s,value:t,onChange:i,onReset:r}){return Mt.jsxs("div",{className:"param",children:[Mt.jsxs("div",{className:"param-head",children:[Mt.jsx("label",{htmlFor:`p-${s.key}`,title:s.hint,children:s.label}),Mt.jsxs("span",{className:"param-val",children:[CA(t,s.step),Mt.jsx("em",{children:s.unit})]}),Mt.jsx("button",{type:"button",className:"param-reset",title:"Reset this control to its default",onClick:r,children:"↺"})]}),Mt.jsx("input",{id:`p-${s.key}`,type:"range",min:s.min,max:s.max,step:s.step,value:t,"aria-label":s.label,onChange:l=>i(Number(l.target.value))})]})}function As({label:s,value:t,tone:i}){return Mt.jsxs("div",{className:`stat ${i??""}`,children:[Mt.jsx("span",{children:s}),Mt.jsx("strong",{children:t})]})}function wA({ui:s,engine:t,audioPlaying:i,onAudio:r,onClose:l}){if(!s)return null;const u=s.capture?"CAPTURE / FROZEN":s.cinematicPlaying?"CINEMATIC":"MANUAL",h=s.qualityBudget;return Mt.jsxs(Mt.Fragment,{children:[Mt.jsx("button",{type:"button",className:"hud-tab","aria-expanded":s.hudOpen,"aria-controls":"hud-panel",onClick:()=>t.setHud(!s.hudOpen),children:s.hudOpen?"HUD  −":"HUD  +"}),Mt.jsxs("aside",{id:"hud-panel",className:`hud ${s.hudOpen?"open":"closed"}`,children:[Mt.jsxs("header",{className:"hud-header",children:[Mt.jsxs("div",{children:[Mt.jsx("div",{className:"hud-kicker",children:"CONTROL DECK · SCHWARZSCHILD"}),Mt.jsxs("h2",{children:["GARGANTUA ",Mt.jsx("span",{children:"r_s = 1"})]})]}),Mt.jsx("button",{type:"button",className:"hud-close","aria-label":"Collapse HUD",onClick:l,children:"×"})]}),Mt.jsxs("div",{className:"hud-scroll",children:[Mt.jsxs("div",{className:"status-grid",children:[Mt.jsx(As,{label:"QUALITY",value:s.quality.toUpperCase()}),Mt.jsx(As,{label:"DEBUG",value:`${s.debug} · ${s.debugView.name}`,tone:"accent"}),Mt.jsx(As,{label:"CAMERA",value:u}),Mt.jsx(As,{label:"PRESET",value:s.presetName}),Mt.jsx(As,{label:"TIME",value:`${s.time.toFixed(2)} s`}),Mt.jsx(As,{label:"DPR / BUFFER",value:`${s.dpr.toFixed(2)} · ${s.renderSize.width}×${s.renderSize.height}`})]}),Mt.jsxs("p",{className:"debug-desc",children:[Mt.jsxs("b",{children:["DEBUG ",s.debug]})," — ",s.debugView.desc]}),Mt.jsxs("section",{className:"hud-section",children:[Mt.jsxs("h3",{children:["VIEW PRESETS ",Mt.jsx("small",{children:"Shift + 1…4"})]}),Mt.jsx("div",{className:"btn-row four",children:Is.map((d,m)=>Mt.jsxs("button",{type:"button",className:`chip ${s.preset===m?"active":""}`,onClick:()=>t.setPreset(m),children:[Mt.jsx("b",{children:m+1}),d.name]},d.name))})]}),Mt.jsxs("section",{className:"hud-section",children:[Mt.jsxs("h3",{children:["QUALITY TIER ",Mt.jsx("small",{children:"Q"})]}),Mt.jsx("div",{className:"btn-row three",children:Xa.map(d=>Mt.jsx("button",{type:"button",className:`chip ${s.quality===d?"active":""}`,onClick:()=>t.setQuality(d),children:d.toUpperCase()},d))}),Mt.jsxs("p",{className:"budget",children:[h.maxSteps," geodesic steps · ",h.diskSamples," disk samples ·"," ",(h.renderScale*100).toFixed(0),"% internal scale · ",h.bloomLevels," bloom levels ·"," ","DPR ≤ ",h.dprCap]})]}),Mt.jsxs("section",{className:"hud-section",children:[Mt.jsxs("h3",{children:["DEBUG VIEWS ",Mt.jsx("small",{children:"0…9"})]}),Mt.jsx("div",{className:"debug-grid",children:Array.from({length:10},(d,m)=>Mt.jsxs("button",{type:"button",className:`dbg ${s.debug===m?"active":""}`,title:`${m}: ${Ad[m].name} — ${Ad[m].desc}`,onClick:()=>t.setDebug(m),children:[Mt.jsx("b",{children:m}),Mt.jsx("span",{children:["FINAL","STEPS","HORIZON","CROSSINGS","DOPPLER","SKY","STARS","HDR","BENDING","r_MIN"][m]})]},m))})]}),RA.map(d=>Mt.jsxs("section",{className:"hud-section",children:[Mt.jsx("h3",{children:d.toUpperCase()}),s.paramDefs.filter(m=>m.group===d).map(m=>Mt.jsx(DA,{def:m,value:s.params[m.key],onChange:p=>t.setParam(m.key,p),onReset:()=>t.setParam(m.key,m.def)},m.key))]},d)),Mt.jsxs("section",{className:"hud-section",children:[Mt.jsx("h3",{children:"KEYBOARD"}),Mt.jsx("ul",{className:"shortcuts",children:gA.map(([d,m])=>Mt.jsxs("li",{children:[Mt.jsx("kbd",{children:d}),Mt.jsx("span",{children:m})]},d))})]}),Mt.jsxs("section",{className:"hud-section actions",children:[Mt.jsx("button",{type:"button",className:"wide",onClick:()=>t.reset(),children:"RESET ALL STATE (R)"}),Mt.jsx("button",{type:"button",className:"wide",onClick:()=>t.toggleCinematic(),children:s.cinematicPlaying?"PAUSE CINEMATIC (Space)":"PLAY CINEMATIC (Space)"}),Mt.jsx("button",{type:"button",className:"wide",onClick:r,disabled:s.capture,children:i?"AMBIENCE: ON (M)":"AMBIENCE: OFF (M)"}),Mt.jsx("button",{type:"button",className:"wide",onClick:()=>t.simulateContextLoss(),children:"TEST WEBGL CONTEXT LOSS"})]}),!s.storageOk&&Mt.jsxs("p",{className:"warn",children:["localStorage unavailable: ",s.storageReason]}),s.warnings?.length>0&&Mt.jsx("p",{className:"warn",children:s.warnings.join(" · ")}),Mt.jsx("p",{className:"footnote",children:"Drag to orbit · wheel / pinch to zoom. Every control writes shader uniforms or camera state and persists to localStorage."})]})]})]})}function UA(){const s=Gn.useRef(null),t=Gn.useRef(null),i=Gn.useRef(null),r=Gn.useRef(null);r.current||(r.current=MA(window.location.search));const[l,u]=Gn.useState(null),[h,d]=Gn.useState("ok"),[m,p]=Gn.useState(""),[S,_]=Gn.useState(!1),[x,M]=Gn.useState(""),A=Gn.useCallback(I=>u(I),[]),R=Gn.useCallback(()=>{t.current&&u(t.current.getState())},[]),y=Gn.useCallback((I,N)=>{d(I==="restored"?"ok":I),p(N??"")},[]);Gn.useEffect(()=>{const I=new AA;i.current=I;const N=new bA({canvas:s.current,state:r.current.state,runtime:r.current.runtime,onStateChange:A,onContextState:y,onReady:R});t.current=N,TA(N),u(N.getState());try{N.init()}catch(H){M(String(H?.message??H))}const w=H=>{const F=t.current;if(!F)return;const P=H.target;if(P&&(P.tagName==="TEXTAREA"||P.tagName==="INPUT"&&P.type!=="range"))return;const Z=/^Digit([0-9])$/.exec(H.code)||/^Numpad([0-9])$/.exec(H.code);if(Z){const C=Number(Z[1]);H.shiftKey?C>=1&&C<=4&&(F.setPreset(C-1),H.preventDefault()):(F.setDebug(C),H.preventDefault());return}switch(H.code){case"Space":F.toggleCinematic(),H.preventDefault();break;case"KeyH":F.setHud(!F.state.hudOpen),H.preventDefault();break;case"KeyR":F.reset(),H.preventDefault();break;case"KeyQ":F.cycleQuality(),H.preventDefault();break;case"KeyM":if(!F.runtime.capture){const C=i.current?.toggle();_(!!C),H.preventDefault()}break}};return window.addEventListener("keydown",w),()=>{window.removeEventListener("keydown",w),I.dispose(),N.dispose(),t.current=null,delete window.__GARGANTUA__}},[A,y,R]);const v=Gn.useCallback(()=>{const I=t.current;if(!I||I.runtime.capture)return;const N=i.current?.toggle();_(!!N)},[]);return Mt.jsxs("div",{className:"app",children:[Mt.jsx("canvas",{ref:s,id:"gargantua-canvas",className:"scene"}),Mt.jsxs("div",{className:"brand",children:[Mt.jsx("div",{className:"brand-title",children:"GARGANTUA"}),Mt.jsx("div",{className:"brand-sub",children:"SCHWARZSCHILD BLACK HOLE RAYTRACER"}),Mt.jsx("div",{className:"brand-meta",children:"NULL GEODESICS / RK4 / r_s = 1"})]}),Mt.jsxs("div",{className:"hint-bar",children:[Mt.jsxs("span",{children:["DRAG ",Mt.jsx("i",{children:"orbit"})]}),Mt.jsxs("span",{children:["WHEEL / PINCH ",Mt.jsx("i",{children:"zoom"})]}),Mt.jsxs("span",{children:["H ",Mt.jsx("i",{children:"hud"})]}),Mt.jsxs("span",{children:["0–9 ",Mt.jsx("i",{children:"debug"})]}),Mt.jsxs("span",{children:["Shift+1–4 ",Mt.jsx("i",{children:"presets"})]})]}),Mt.jsx(wA,{ui:l,engine:t.current,audioPlaying:S,onAudio:v,onClose:()=>t.current?.setHud(!1)}),h!=="ok"&&Mt.jsx("div",{className:"context-overlay",id:"context-overlay",role:"alert",children:Mt.jsxs("div",{className:"context-card",children:[Mt.jsx("div",{className:"context-kicker",children:"RENDERER PAUSED"}),Mt.jsx("h2",{children:"WEBGL CONTEXT LOST"}),Mt.jsx("p",{children:"Rendering is paused. GPU resources, render targets and materials will be rebuilt from persisted state when the context is restored. Your settings are safe."}),m&&Mt.jsx("p",{className:"warn",children:m}),Mt.jsx("button",{type:"button",onClick:()=>t.current?.restoreContextNow(),children:"RESTORE NOW"})]})}),x&&Mt.jsx("div",{className:"context-overlay",id:"fatal-overlay",role:"alert",children:Mt.jsxs("div",{className:"context-card",children:[Mt.jsx("h2",{children:"RENDERER ERROR"}),Mt.jsx("p",{children:x})]})})]})}Dx.createRoot(document.getElementById("root")).render(Mt.jsx(UA,{}));
