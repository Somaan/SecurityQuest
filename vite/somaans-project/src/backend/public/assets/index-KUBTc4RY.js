(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))c(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const d of u.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function o(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function c(l){if(l.ep)return;l.ep=!0;const u=o(l);fetch(l.href,u)}})();(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const l of c)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(c){const l={};return c.integrity&&(l.integrity=c.integrity),c.referrerPolicy&&(l.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?l.credentials="include":c.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(c){if(c.ep)return;c.ep=!0;const l=a(c);fetch(c.href,l)}})();function Hd(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Fm={exports:{}},wo={},Dm={exports:{}},Re={};/**
* @license React
* react.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var Um;function ex(){if(Um)return Re;Um=1;var r=Symbol.for("react.element"),a=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),d=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),g=Symbol.iterator;function y(L){return L===null||typeof L!="object"?null:(L=g&&L[g]||L["@@iterator"],typeof L=="function"?L:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,N={};function w(L,K,be){this.props=L,this.context=K,this.refs=N,this.updater=be||E}w.prototype.isReactComponent={},w.prototype.setState=function(L,K){if(typeof L!="object"&&typeof L!="function"&&L!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,L,K,"setState")},w.prototype.forceUpdate=function(L){this.updater.enqueueForceUpdate(this,L,"forceUpdate")};function S(){}S.prototype=w.prototype;function k(L,K,be){this.props=L,this.context=K,this.refs=N,this.updater=be||E}var C=k.prototype=new S;C.constructor=k,A(C,w.prototype),C.isPureReactComponent=!0;var $=Array.isArray,I=Object.prototype.hasOwnProperty,q={current:null},Z={key:!0,ref:!0,__self:!0,__source:!0};function H(L,K,be){var ke,_e={},Ae=null,Pe=null;if(K!=null)for(ke in K.ref!==void 0&&(Pe=K.ref),K.key!==void 0&&(Ae=""+K.key),K)I.call(K,ke)&&!Z.hasOwnProperty(ke)&&(_e[ke]=K[ke]);var Le=arguments.length-2;if(Le===1)_e.children=be;else if(1<Le){for(var Oe=Array(Le),Ye=0;Ye<Le;Ye++)Oe[Ye]=arguments[Ye+2];_e.children=Oe}if(L&&L.defaultProps)for(ke in Le=L.defaultProps,Le)_e[ke]===void 0&&(_e[ke]=Le[ke]);return{$$typeof:r,type:L,key:Ae,ref:Pe,props:_e,_owner:q.current}}function Y(L,K){return{$$typeof:r,type:L.type,key:K,ref:L.ref,props:L.props,_owner:L._owner}}function R(L){return typeof L=="object"&&L!==null&&L.$$typeof===r}function te(L){var K={"=":"=0",":":"=2"};return"$"+L.replace(/[=:]/g,function(be){return K[be]})}var pe=/\/+/g;function J(L,K){return typeof L=="object"&&L!==null&&L.key!=null?te(""+L.key):K.toString(36)}function fe(L,K,be,ke,_e){var Ae=typeof L;(Ae==="undefined"||Ae==="boolean")&&(L=null);var Pe=!1;if(L===null)Pe=!0;else switch(Ae){case"string":case"number":Pe=!0;break;case"object":switch(L.$$typeof){case r:case a:Pe=!0}}if(Pe)return Pe=L,_e=_e(Pe),L=ke===""?"."+J(Pe,0):ke,$(_e)?(be="",L!=null&&(be=L.replace(pe,"$&/")+"/"),fe(_e,K,be,"",function(Ye){return Ye})):_e!=null&&(R(_e)&&(_e=Y(_e,be+(!_e.key||Pe&&Pe.key===_e.key?"":(""+_e.key).replace(pe,"$&/")+"/")+L)),K.push(_e)),1;if(Pe=0,ke=ke===""?".":ke+":",$(L))for(var Le=0;Le<L.length;Le++){Ae=L[Le];var Oe=ke+J(Ae,Le);Pe+=fe(Ae,K,be,Oe,_e)}else if(Oe=y(L),typeof Oe=="function")for(L=Oe.call(L),Le=0;!(Ae=L.next()).done;)Ae=Ae.value,Oe=ke+J(Ae,Le++),Pe+=fe(Ae,K,be,Oe,_e);else if(Ae==="object")throw K=String(L),Error("Objects are not valid as a React child (found: "+(K==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":K)+"). If you meant to render a collection of children, use an array instead.");return Pe}function G(L,K,be){if(L==null)return L;var ke=[],_e=0;return fe(L,ke,"","",function(Ae){return K.call(be,Ae,_e++)}),ke}function ae(L){if(L._status===-1){var K=L._result;K=K(),K.then(function(be){(L._status===0||L._status===-1)&&(L._status=1,L._result=be)},function(be){(L._status===0||L._status===-1)&&(L._status=2,L._result=be)}),L._status===-1&&(L._status=0,L._result=K)}if(L._status===1)return L._result.default;throw L._result}var W={current:null},F={transition:null},V={ReactCurrentDispatcher:W,ReactCurrentBatchConfig:F,ReactCurrentOwner:q};function Q(){throw Error("act(...) is not supported in production builds of React.")}return Re.Children={map:G,forEach:function(L,K,be){G(L,function(){K.apply(this,arguments)},be)},count:function(L){var K=0;return G(L,function(){K++}),K},toArray:function(L){return G(L,function(K){return K})||[]},only:function(L){if(!R(L))throw Error("React.Children.only expected to receive a single React element child.");return L}},Re.Component=w,Re.Fragment=o,Re.Profiler=l,Re.PureComponent=k,Re.StrictMode=c,Re.Suspense=m,Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=V,Re.act=Q,Re.cloneElement=function(L,K,be){if(L==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+L+".");var ke=A({},L.props),_e=L.key,Ae=L.ref,Pe=L._owner;if(K!=null){if(K.ref!==void 0&&(Ae=K.ref,Pe=q.current),K.key!==void 0&&(_e=""+K.key),L.type&&L.type.defaultProps)var Le=L.type.defaultProps;for(Oe in K)I.call(K,Oe)&&!Z.hasOwnProperty(Oe)&&(ke[Oe]=K[Oe]===void 0&&Le!==void 0?Le[Oe]:K[Oe])}var Oe=arguments.length-2;if(Oe===1)ke.children=be;else if(1<Oe){Le=Array(Oe);for(var Ye=0;Ye<Oe;Ye++)Le[Ye]=arguments[Ye+2];ke.children=Le}return{$$typeof:r,type:L.type,key:_e,ref:Ae,props:ke,_owner:Pe}},Re.createContext=function(L){return L={$$typeof:d,_currentValue:L,_currentValue2:L,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},L.Provider={$$typeof:u,_context:L},L.Consumer=L},Re.createElement=H,Re.createFactory=function(L){var K=H.bind(null,L);return K.type=L,K},Re.createRef=function(){return{current:null}},Re.forwardRef=function(L){return{$$typeof:p,render:L}},Re.isValidElement=R,Re.lazy=function(L){return{$$typeof:x,_payload:{_status:-1,_result:L},_init:ae}},Re.memo=function(L,K){return{$$typeof:v,type:L,compare:K===void 0?null:K}},Re.startTransition=function(L){var K=F.transition;F.transition={};try{L()}finally{F.transition=K}},Re.unstable_act=Q,Re.useCallback=function(L,K){return W.current.useCallback(L,K)},Re.useContext=function(L){return W.current.useContext(L)},Re.useDebugValue=function(){},Re.useDeferredValue=function(L){return W.current.useDeferredValue(L)},Re.useEffect=function(L,K){return W.current.useEffect(L,K)},Re.useId=function(){return W.current.useId()},Re.useImperativeHandle=function(L,K,be){return W.current.useImperativeHandle(L,K,be)},Re.useInsertionEffect=function(L,K){return W.current.useInsertionEffect(L,K)},Re.useLayoutEffect=function(L,K){return W.current.useLayoutEffect(L,K)},Re.useMemo=function(L,K){return W.current.useMemo(L,K)},Re.useReducer=function(L,K,be){return W.current.useReducer(L,K,be)},Re.useRef=function(L){return W.current.useRef(L)},Re.useState=function(L){return W.current.useState(L)},Re.useSyncExternalStore=function(L,K,be){return W.current.useSyncExternalStore(L,K,be)},Re.useTransition=function(){return W.current.useTransition()},Re.version="18.3.1",Re}var Bm;function Wd(){return Bm||(Bm=1,Dm.exports=ex()),Dm.exports}/**
* @license React
* react-jsx-runtime.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var Zm;function tx(){if(Zm)return wo;Zm=1;var r=Wd(),a=Symbol.for("react.element"),o=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,l=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function d(p,m,v){var x,g={},y=null,E=null;v!==void 0&&(y=""+v),m.key!==void 0&&(y=""+m.key),m.ref!==void 0&&(E=m.ref);for(x in m)c.call(m,x)&&!u.hasOwnProperty(x)&&(g[x]=m[x]);if(p&&p.defaultProps)for(x in m=p.defaultProps,m)g[x]===void 0&&(g[x]=m[x]);return{$$typeof:a,type:p,key:y,ref:E,props:g,_owner:l.current}}return wo.Fragment=o,wo.jsx=d,wo.jsxs=d,wo}var qm;function rx(){return qm||(qm=1,Fm.exports=tx()),Fm.exports}var s=rx(),z=Wd();const Ue=Hd(z);var as={},Nc={exports:{}},_t={},Hm={exports:{}},Wm={};/**
* @license React
* scheduler.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var Gm;function nx(){return Gm||(Gm=1,function(r){function a(F,V){var Q=F.length;F.push(V);e:for(;0<Q;){var L=Q-1>>>1,K=F[L];if(0<l(K,V))F[L]=V,F[Q]=K,Q=L;else break e}}function o(F){return F.length===0?null:F[0]}function c(F){if(F.length===0)return null;var V=F[0],Q=F.pop();if(Q!==V){F[0]=Q;e:for(var L=0,K=F.length,be=K>>>1;L<be;){var ke=2*(L+1)-1,_e=F[ke],Ae=ke+1,Pe=F[Ae];if(0>l(_e,Q))Ae<K&&0>l(Pe,_e)?(F[L]=Pe,F[Ae]=Q,L=Ae):(F[L]=_e,F[ke]=Q,L=ke);else if(Ae<K&&0>l(Pe,Q))F[L]=Pe,F[Ae]=Q,L=Ae;else break e}}return V}function l(F,V){var Q=F.sortIndex-V.sortIndex;return Q!==0?Q:F.id-V.id}if(typeof performance=="object"&&typeof performance.now=="function"){var u=performance;r.unstable_now=function(){return u.now()}}else{var d=Date,p=d.now();r.unstable_now=function(){return d.now()-p}}var m=[],v=[],x=1,g=null,y=3,E=!1,A=!1,N=!1,w=typeof setTimeout=="function"?setTimeout:null,S=typeof clearTimeout=="function"?clearTimeout:null,k=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function C(F){for(var V=o(v);V!==null;){if(V.callback===null)c(v);else if(V.startTime<=F)c(v),V.sortIndex=V.expirationTime,a(m,V);else break;V=o(v)}}function $(F){if(N=!1,C(F),!A)if(o(m)!==null)A=!0,ae(I);else{var V=o(v);V!==null&&W($,V.startTime-F)}}function I(F,V){A=!1,N&&(N=!1,S(H),H=-1),E=!0;var Q=y;try{for(C(V),g=o(m);g!==null&&(!(g.expirationTime>V)||F&&!te());){var L=g.callback;if(typeof L=="function"){g.callback=null,y=g.priorityLevel;var K=L(g.expirationTime<=V);V=r.unstable_now(),typeof K=="function"?g.callback=K:g===o(m)&&c(m),C(V)}else c(m);g=o(m)}if(g!==null)var be=!0;else{var ke=o(v);ke!==null&&W($,ke.startTime-V),be=!1}return be}finally{g=null,y=Q,E=!1}}var q=!1,Z=null,H=-1,Y=5,R=-1;function te(){return!(r.unstable_now()-R<Y)}function pe(){if(Z!==null){var F=r.unstable_now();R=F;var V=!0;try{V=Z(!0,F)}finally{V?J():(q=!1,Z=null)}}else q=!1}var J;if(typeof k=="function")J=function(){k(pe)};else if(typeof MessageChannel<"u"){var fe=new MessageChannel,G=fe.port2;fe.port1.onmessage=pe,J=function(){G.postMessage(null)}}else J=function(){w(pe,0)};function ae(F){Z=F,q||(q=!0,J())}function W(F,V){H=w(function(){F(r.unstable_now())},V)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(F){F.callback=null},r.unstable_continueExecution=function(){A||E||(A=!0,ae(I))},r.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Y=0<F?Math.floor(1e3/F):5},r.unstable_getCurrentPriorityLevel=function(){return y},r.unstable_getFirstCallbackNode=function(){return o(m)},r.unstable_next=function(F){switch(y){case 1:case 2:case 3:var V=3;break;default:V=y}var Q=y;y=V;try{return F()}finally{y=Q}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(F,V){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var Q=y;y=F;try{return V()}finally{y=Q}},r.unstable_scheduleCallback=function(F,V,Q){var L=r.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?L+Q:L):Q=L,F){case 1:var K=-1;break;case 2:K=250;break;case 5:K=1073741823;break;case 4:K=1e4;break;default:K=5e3}return K=Q+K,F={id:x++,callback:V,priorityLevel:F,startTime:Q,expirationTime:K,sortIndex:-1},Q>L?(F.sortIndex=Q,a(v,F),o(m)===null&&F===o(v)&&(N?(S(H),H=-1):N=!0,W($,Q-L))):(F.sortIndex=K,a(m,F),A||E||(A=!0,ae(I))),F},r.unstable_shouldYield=te,r.unstable_wrapCallback=function(F){var V=y;return function(){var Q=y;y=V;try{return F.apply(this,arguments)}finally{y=Q}}}}(Wm)),Wm}var Km;function ax(){return Km||(Km=1,Hm.exports=nx()),Hm.exports}/**
* @license React
* react-dom.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var Ym;function ox(){if(Ym)return _t;Ym=1;var r=Wd(),a=ax();function o(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c=new Set,l={};function u(e,t){d(e,t),d(e+"Capture",t)}function d(e,t){for(l[e]=t,e=0;e<t.length;e++)c.add(t[e])}var p=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),m=Object.prototype.hasOwnProperty,v=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,x={},g={};function y(e){return m.call(g,e)?!0:m.call(x,e)?!1:v.test(e)?g[e]=!0:(x[e]=!0,!1)}function E(e,t,n,i){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function A(e,t,n,i){if(t===null||typeof t>"u"||E(e,t,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function N(e,t,n,i,f,h,b){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=i,this.attributeNamespace=f,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=h,this.removeEmptyString=b}var w={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){w[e]=new N(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];w[t]=new N(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){w[e]=new N(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){w[e]=new N(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){w[e]=new N(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){w[e]=new N(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){w[e]=new N(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){w[e]=new N(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){w[e]=new N(e,5,!1,e.toLowerCase(),null,!1,!1)});var S=/[\-:]([a-z])/g;function k(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(S,k);w[t]=new N(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(S,k);w[t]=new N(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(S,k);w[t]=new N(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){w[e]=new N(e,1,!1,e.toLowerCase(),null,!1,!1)}),w.xlinkHref=new N("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){w[e]=new N(e,1,!1,e.toLowerCase(),null,!0,!0)});function C(e,t,n,i){var f=w.hasOwnProperty(t)?w[t]:null;(f!==null?f.type!==0:i||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(A(t,n,f,i)&&(n=null),i||f===null?y(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):f.mustUseProperty?e[f.propertyName]=n===null?f.type===3?!1:"":n:(t=f.attributeName,i=f.attributeNamespace,n===null?e.removeAttribute(t):(f=f.type,n=f===3||f===4&&n===!0?"":""+n,i?e.setAttributeNS(i,t,n):e.setAttribute(t,n))))}var $=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,I=Symbol.for("react.element"),q=Symbol.for("react.portal"),Z=Symbol.for("react.fragment"),H=Symbol.for("react.strict_mode"),Y=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),te=Symbol.for("react.context"),pe=Symbol.for("react.forward_ref"),J=Symbol.for("react.suspense"),fe=Symbol.for("react.suspense_list"),G=Symbol.for("react.memo"),ae=Symbol.for("react.lazy"),W=Symbol.for("react.offscreen"),F=Symbol.iterator;function V(e){return e===null||typeof e!="object"?null:(e=F&&e[F]||e["@@iterator"],typeof e=="function"?e:null)}var Q=Object.assign,L;function K(e){if(L===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);L=t&&t[1]||""}return`
`+L+e}var be=!1;function ke(e,t){if(!e||be)return"";be=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(B){var i=B}Reflect.construct(e,[],t)}else{try{t.call()}catch(B){i=B}e.call(t.prototype)}else{try{throw Error()}catch(B){i=B}e()}}catch(B){if(B&&i&&typeof B.stack=="string"){for(var f=B.stack.split(`
`),h=i.stack.split(`
`),b=f.length-1,_=h.length-1;1<=b&&0<=_&&f[b]!==h[_];)_--;for(;1<=b&&0<=_;b--,_--)if(f[b]!==h[_]){if(b!==1||_!==1)do if(b--,_--,0>_||f[b]!==h[_]){var O=`
`+f[b].replace(" at new "," at ");return e.displayName&&O.includes("<anonymous>")&&(O=O.replace("<anonymous>",e.displayName)),O}while(1<=b&&0<=_);break}}}finally{be=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?K(e):""}function _e(e){switch(e.tag){case 5:return K(e.type);case 16:return K("Lazy");case 13:return K("Suspense");case 19:return K("SuspenseList");case 0:case 2:case 15:return e=ke(e.type,!1),e;case 11:return e=ke(e.type.render,!1),e;case 1:return e=ke(e.type,!0),e;default:return""}}function Ae(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Z:return"Fragment";case q:return"Portal";case Y:return"Profiler";case H:return"StrictMode";case J:return"Suspense";case fe:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case te:return(e.displayName||"Context")+".Consumer";case R:return(e._context.displayName||"Context")+".Provider";case pe:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case G:return t=e.displayName||null,t!==null?t:Ae(e.type)||"Memo";case ae:t=e._payload,e=e._init;try{return Ae(e(t))}catch{}}return null}function Pe(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ae(t);case 8:return t===H?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Le(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Oe(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ye(e){var t=Oe(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),i=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var f=n.get,h=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return f.call(this)},set:function(b){i=""+b,h.call(this,b)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(b){i=""+b},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $r(e){e._valueTracker||(e._valueTracker=Ye(e))}function In(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=Oe(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function st(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ut(e,t){var n=t.checked;return Q({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function pn(e,t){var n=t.defaultValue==null?"":t.defaultValue,i=t.checked!=null?t.checked:t.defaultChecked;n=Le(t.value!=null?t.value:n),e._wrapperState={initialChecked:i,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function hr(e,t){t=t.checked,t!=null&&C(e,"checked",t,!1)}function mn(e,t){hr(e,t);var n=Le(t.value),i=t.type;if(n!=null)i==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(i==="submit"||i==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?M(e,t.type,n):t.hasOwnProperty("defaultValue")&&M(e,t.type,Le(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function j(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var i=t.type;if(!(i!=="submit"&&i!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function M(e,t,n){(t!=="number"||st(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var U=Array.isArray;function re(e,t,n,i){if(e=e.options,t){t={};for(var f=0;f<n.length;f++)t["$"+n[f]]=!0;for(n=0;n<e.length;n++)f=t.hasOwnProperty("$"+e[n].value),e[n].selected!==f&&(e[n].selected=f),f&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Le(n),t=null,f=0;f<e.length;f++){if(e[f].value===n){e[f].selected=!0,i&&(e[f].defaultSelected=!0);return}t!==null||e[f].disabled||(t=e[f])}t!==null&&(t.selected=!0)}}function oe(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(o(91));return Q({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ue(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(o(92));if(U(n)){if(1<n.length)throw Error(o(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Le(n)}}function Ne(e,t){var n=Le(t.value),i=Le(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),i!=null&&(e.defaultValue=""+i)}function Me(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ie(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Be(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ie(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var $t,It=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,i,f){MSApp.execUnsafeLocalFunction(function(){return e(t,n,i,f)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for($t=$t||document.createElement("div"),$t.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=$t.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function dt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Wt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},hn=["Webkit","ms","Moz","O"];Object.keys(Wt).forEach(function(e){hn.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Wt[t]=Wt[e]})});function nr(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Wt.hasOwnProperty(e)&&Wt[e]?(""+t).trim():t+"px"}function gr(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var i=n.indexOf("--")===0,f=nr(n,t[n],i);n==="float"&&(n="cssFloat"),i?e.setProperty(n,f):e[n]=f}}var Tn=Q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Fn(e,t){if(t){if(Tn[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(o(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(o(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(o(61))}if(t.style!=null&&typeof t.style!="object")throw Error(o(62))}}function La(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ra=null;function $a(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ia=null,Ir=null,Tr=null;function Ho(e){if(e=oo(e)){if(typeof Ia!="function")throw Error(o(280));var t=e.stateNode;t&&(t=bi(t),Ia(e.stateNode,e.type,t))}}function Wo(e){Ir?Tr?Tr.push(e):Tr=[e]:Ir=e}function Go(){if(Ir){var e=Ir,t=Tr;if(Tr=Ir=null,Ho(e),t)for(e=0;e<t.length;e++)Ho(t[e])}}function Ko(e,t){return e(t)}function Yo(){}var Ta=!1;function Vo(e,t,n){if(Ta)return e(t,n);Ta=!0;try{return Ko(e,t,n)}finally{Ta=!1,(Ir!==null||Tr!==null)&&(Yo(),Go())}}function gn(e,t){var n=e.stateNode;if(n===null)return null;var i=bi(n);if(i===null)return null;n=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(o(231,t,typeof n));return n}var Dn=!1;if(p)try{var vn={};Object.defineProperty(vn,"passive",{get:function(){Dn=!0}}),window.addEventListener("test",vn,vn),window.removeEventListener("test",vn,vn)}catch{Dn=!1}function Ts(e,t,n,i,f,h,b,_,O){var B=Array.prototype.slice.call(arguments,3);try{t.apply(n,B)}catch(ne){this.onError(ne)}}var xn=!1,Un=null,Bn=!1,Fa=null,Fs={onError:function(e){xn=!0,Un=e}};function Ds(e,t,n,i,f,h,b,_,O){xn=!1,Un=null,Ts.apply(Fs,arguments)}function Us(e,t,n,i,f,h,b,_,O){if(Ds.apply(this,arguments),xn){if(xn){var B=Un;xn=!1,Un=null}else throw Error(o(198));Bn||(Bn=!0,Fa=B)}}function vr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Qo(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Xo(e){if(vr(e)!==e)throw Error(o(188))}function Bs(e){var t=e.alternate;if(!t){if(t=vr(e),t===null)throw Error(o(188));return t!==e?null:e}for(var n=e,i=t;;){var f=n.return;if(f===null)break;var h=f.alternate;if(h===null){if(i=f.return,i!==null){n=i;continue}break}if(f.child===h.child){for(h=f.child;h;){if(h===n)return Xo(f),e;if(h===i)return Xo(f),t;h=h.sibling}throw Error(o(188))}if(n.return!==i.return)n=f,i=h;else{for(var b=!1,_=f.child;_;){if(_===n){b=!0,n=f,i=h;break}if(_===i){b=!0,i=f,n=h;break}_=_.sibling}if(!b){for(_=h.child;_;){if(_===n){b=!0,n=h,i=f;break}if(_===i){b=!0,i=h,n=f;break}_=_.sibling}if(!b)throw Error(o(189))}}if(n.alternate!==i)throw Error(o(190))}if(n.tag!==3)throw Error(o(188));return n.stateNode.current===n?e:t}function Jo(e){return e=Bs(e),e!==null?Da(e):null}function Da(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Da(e);if(t!==null)return t;e=e.sibling}return null}var xr=a.unstable_scheduleCallback,se=a.unstable_cancelCallback,Zs=a.unstable_shouldYield,qs=a.unstable_requestPaint,ze=a.unstable_now,Tt=a.unstable_getCurrentPriorityLevel,Gt=a.unstable_ImmediatePriority,ar=a.unstable_UserBlockingPriority,Zn=a.unstable_NormalPriority,Fr=a.unstable_LowPriority,bn=a.unstable_IdlePriority,ei=null,or=null;function h2(e){if(or&&typeof or.onCommitFiberRoot=="function")try{or.onCommitFiberRoot(ei,e,void 0,(e.current.flags&128)===128)}catch{}}var Kt=Math.clz32?Math.clz32:x2,g2=Math.log,v2=Math.LN2;function x2(e){return e>>>=0,e===0?32:31-(g2(e)/v2|0)|0}var ti=64,ri=4194304;function Ua(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ni(e,t){var n=e.pendingLanes;if(n===0)return 0;var i=0,f=e.suspendedLanes,h=e.pingedLanes,b=n&268435455;if(b!==0){var _=b&~f;_!==0?i=Ua(_):(h&=b,h!==0&&(i=Ua(h)))}else b=n&~f,b!==0?i=Ua(b):h!==0&&(i=Ua(h));if(i===0)return 0;if(t!==0&&t!==i&&!(t&f)&&(f=i&-i,h=t&-t,f>=h||f===16&&(h&4194240)!==0))return t;if(i&4&&(i|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=i;0<t;)n=31-Kt(t),f=1<<n,i|=e[n],t&=~f;return i}function b2(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function y2(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,f=e.expirationTimes,h=e.pendingLanes;0<h;){var b=31-Kt(h),_=1<<b,O=f[b];O===-1?(!(_&n)||_&i)&&(f[b]=b2(_,t)):O<=t&&(e.expiredLanes|=_),h&=~_}}function Hs(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function hf(){var e=ti;return ti<<=1,!(ti&4194240)&&(ti=64),e}function Ws(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ba(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Kt(t),e[t]=n}function w2(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var i=e.eventTimes;for(e=e.expirationTimes;0<n;){var f=31-Kt(n),h=1<<f;t[f]=0,i[f]=-1,e[f]=-1,n&=~h}}function Gs(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Kt(n),f=1<<i;f&t|e[i]&t&&(e[i]|=t),n&=~f}}var De=0;function gf(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var vf,Ks,xf,bf,yf,Ys=!1,ai=[],Dr=null,Ur=null,Br=null,Za=new Map,qa=new Map,Zr=[],k2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function wf(e,t){switch(e){case"focusin":case"focusout":Dr=null;break;case"dragenter":case"dragleave":Ur=null;break;case"mouseover":case"mouseout":Br=null;break;case"pointerover":case"pointerout":Za.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":qa.delete(t.pointerId)}}function Ha(e,t,n,i,f,h){return e===null||e.nativeEvent!==h?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:h,targetContainers:[f]},t!==null&&(t=oo(t),t!==null&&Ks(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,f!==null&&t.indexOf(f)===-1&&t.push(f),e)}function N2(e,t,n,i,f){switch(t){case"focusin":return Dr=Ha(Dr,e,t,n,i,f),!0;case"dragenter":return Ur=Ha(Ur,e,t,n,i,f),!0;case"mouseover":return Br=Ha(Br,e,t,n,i,f),!0;case"pointerover":var h=f.pointerId;return Za.set(h,Ha(Za.get(h)||null,e,t,n,i,f)),!0;case"gotpointercapture":return h=f.pointerId,qa.set(h,Ha(qa.get(h)||null,e,t,n,i,f)),!0}return!1}function kf(e){var t=yn(e.target);if(t!==null){var n=vr(t);if(n!==null){if(t=n.tag,t===13){if(t=Qo(n),t!==null){e.blockedOn=t,yf(e.priority,function(){xf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function oi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Qs(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Ra=i,n.target.dispatchEvent(i),Ra=null}else return t=oo(n),t!==null&&Ks(t),e.blockedOn=n,!1;t.shift()}return!0}function Nf(e,t,n){oi(e)&&n.delete(t)}function S2(){Ys=!1,Dr!==null&&oi(Dr)&&(Dr=null),Ur!==null&&oi(Ur)&&(Ur=null),Br!==null&&oi(Br)&&(Br=null),Za.forEach(Nf),qa.forEach(Nf)}function Wa(e,t){e.blockedOn===t&&(e.blockedOn=null,Ys||(Ys=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,S2)))}function Ga(e){function t(f){return Wa(f,e)}if(0<ai.length){Wa(ai[0],e);for(var n=1;n<ai.length;n++){var i=ai[n];i.blockedOn===e&&(i.blockedOn=null)}}for(Dr!==null&&Wa(Dr,e),Ur!==null&&Wa(Ur,e),Br!==null&&Wa(Br,e),Za.forEach(t),qa.forEach(t),n=0;n<Zr.length;n++)i=Zr[n],i.blockedOn===e&&(i.blockedOn=null);for(;0<Zr.length&&(n=Zr[0],n.blockedOn===null);)kf(n),n.blockedOn===null&&Zr.shift()}var qn=$.ReactCurrentBatchConfig,ii=!0;function j2(e,t,n,i){var f=De,h=qn.transition;qn.transition=null;try{De=1,Vs(e,t,n,i)}finally{De=f,qn.transition=h}}function E2(e,t,n,i){var f=De,h=qn.transition;qn.transition=null;try{De=4,Vs(e,t,n,i)}finally{De=f,qn.transition=h}}function Vs(e,t,n,i){if(ii){var f=Qs(e,t,n,i);if(f===null)ml(e,t,i,si,n),wf(e,i);else if(N2(f,e,t,n,i))i.stopPropagation();else if(wf(e,i),t&4&&-1<k2.indexOf(e)){for(;f!==null;){var h=oo(f);if(h!==null&&vf(h),h=Qs(e,t,n,i),h===null&&ml(e,t,i,si,n),h===f)break;f=h}f!==null&&i.stopPropagation()}else ml(e,t,i,null,n)}}var si=null;function Qs(e,t,n,i){if(si=null,e=$a(i),e=yn(e),e!==null)if(t=vr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Qo(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return si=e,null}function Sf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Tt()){case Gt:return 1;case ar:return 4;case Zn:case Fr:return 16;case bn:return 536870912;default:return 16}default:return 16}}var qr=null,Xs=null,li=null;function jf(){if(li)return li;var e,t=Xs,n=t.length,i,f="value"in qr?qr.value:qr.textContent,h=f.length;for(e=0;e<n&&t[e]===f[e];e++);var b=n-e;for(i=1;i<=b&&t[n-i]===f[h-i];i++);return li=f.slice(e,1<i?1-i:void 0)}function ci(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ui(){return!0}function Ef(){return!1}function Ct(e){function t(n,i,f,h,b){this._reactName=n,this._targetInst=f,this.type=i,this.nativeEvent=h,this.target=b,this.currentTarget=null;for(var _ in e)e.hasOwnProperty(_)&&(n=e[_],this[_]=n?n(h):h[_]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?ui:Ef,this.isPropagationStopped=Ef,this}return Q(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ui)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ui)},persist:function(){},isPersistent:ui}),t}var Hn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Js=Ct(Hn),Ka=Q({},Hn,{view:0,detail:0}),_2=Ct(Ka),el,tl,Ya,di=Q({},Ka,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ya&&(Ya&&e.type==="mousemove"?(el=e.screenX-Ya.screenX,tl=e.screenY-Ya.screenY):tl=el=0,Ya=e),el)},movementY:function(e){return"movementY"in e?e.movementY:tl}}),_f=Ct(di),A2=Q({},di,{dataTransfer:0}),C2=Ct(A2),z2=Q({},Ka,{relatedTarget:0}),rl=Ct(z2),M2=Q({},Hn,{animationName:0,elapsedTime:0,pseudoElement:0}),O2=Ct(M2),P2=Q({},Hn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),L2=Ct(P2),R2=Q({},Hn,{data:0}),Af=Ct(R2),$2={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},I2={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},T2={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function F2(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=T2[e])?!!t[e]:!1}function nl(){return F2}var D2=Q({},Ka,{key:function(e){if(e.key){var t=$2[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ci(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?I2[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nl,charCode:function(e){return e.type==="keypress"?ci(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ci(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),U2=Ct(D2),B2=Q({},di,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Cf=Ct(B2),Z2=Q({},Ka,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nl}),q2=Ct(Z2),H2=Q({},Hn,{propertyName:0,elapsedTime:0,pseudoElement:0}),W2=Ct(H2),G2=Q({},di,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),K2=Ct(G2),Y2=[9,13,27,32],al=p&&"CompositionEvent"in window,Va=null;p&&"documentMode"in document&&(Va=document.documentMode);var V2=p&&"TextEvent"in window&&!Va,zf=p&&(!al||Va&&8<Va&&11>=Va),Mf=" ",Of=!1;function Pf(e,t){switch(e){case"keyup":return Y2.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Lf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Wn=!1;function Q2(e,t){switch(e){case"compositionend":return Lf(t);case"keypress":return t.which!==32?null:(Of=!0,Mf);case"textInput":return e=t.data,e===Mf&&Of?null:e;default:return null}}function X2(e,t){if(Wn)return e==="compositionend"||!al&&Pf(e,t)?(e=jf(),li=Xs=qr=null,Wn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return zf&&t.locale!=="ko"?null:t.data;default:return null}}var J2={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!J2[e.type]:t==="textarea"}function $f(e,t,n,i){Wo(i),t=gi(t,"onChange"),0<t.length&&(n=new Js("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Qa=null,Xa=null;function ev(e){ep(e,0)}function fi(e){var t=Qn(e);if(In(t))return e}function tv(e,t){if(e==="change")return t}var If=!1;if(p){var ol;if(p){var il="oninput"in document;if(!il){var Tf=document.createElement("div");Tf.setAttribute("oninput","return;"),il=typeof Tf.oninput=="function"}ol=il}else ol=!1;If=ol&&(!document.documentMode||9<document.documentMode)}function Ff(){Qa&&(Qa.detachEvent("onpropertychange",Df),Xa=Qa=null)}function Df(e){if(e.propertyName==="value"&&fi(Xa)){var t=[];$f(t,Xa,e,$a(e)),Vo(ev,t)}}function rv(e,t,n){e==="focusin"?(Ff(),Qa=t,Xa=n,Qa.attachEvent("onpropertychange",Df)):e==="focusout"&&Ff()}function nv(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return fi(Xa)}function av(e,t){if(e==="click")return fi(t)}function ov(e,t){if(e==="input"||e==="change")return fi(t)}function iv(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Yt=typeof Object.is=="function"?Object.is:iv;function Ja(e,t){if(Yt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var f=n[i];if(!m.call(t,f)||!Yt(e[f],t[f]))return!1}return!0}function Uf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Bf(e,t){var n=Uf(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Uf(n)}}function Zf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Zf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function qf(){for(var e=window,t=st();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=st(e.document)}return t}function sl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function sv(e){var t=qf(),n=e.focusedElem,i=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Zf(n.ownerDocument.documentElement,n)){if(i!==null&&sl(n)){if(t=i.start,e=i.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var f=n.textContent.length,h=Math.min(i.start,f);i=i.end===void 0?h:Math.min(i.end,f),!e.extend&&h>i&&(f=i,i=h,h=f),f=Bf(n,h);var b=Bf(n,i);f&&b&&(e.rangeCount!==1||e.anchorNode!==f.node||e.anchorOffset!==f.offset||e.focusNode!==b.node||e.focusOffset!==b.offset)&&(t=t.createRange(),t.setStart(f.node,f.offset),e.removeAllRanges(),h>i?(e.addRange(t),e.extend(b.node,b.offset)):(t.setEnd(b.node,b.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var lv=p&&"documentMode"in document&&11>=document.documentMode,Gn=null,ll=null,eo=null,cl=!1;function Hf(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;cl||Gn==null||Gn!==st(i)||(i=Gn,"selectionStart"in i&&sl(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),eo&&Ja(eo,i)||(eo=i,i=gi(ll,"onSelect"),0<i.length&&(t=new Js("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Gn)))}function pi(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Kn={animationend:pi("Animation","AnimationEnd"),animationiteration:pi("Animation","AnimationIteration"),animationstart:pi("Animation","AnimationStart"),transitionend:pi("Transition","TransitionEnd")},ul={},Wf={};p&&(Wf=document.createElement("div").style,"AnimationEvent"in window||(delete Kn.animationend.animation,delete Kn.animationiteration.animation,delete Kn.animationstart.animation),"TransitionEvent"in window||delete Kn.transitionend.transition);function mi(e){if(ul[e])return ul[e];if(!Kn[e])return e;var t=Kn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Wf)return ul[e]=t[n];return e}var Gf=mi("animationend"),Kf=mi("animationiteration"),Yf=mi("animationstart"),Vf=mi("transitionend"),Qf=new Map,Xf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Hr(e,t){Qf.set(e,t),u(t,[e])}for(var dl=0;dl<Xf.length;dl++){var fl=Xf[dl],cv=fl.toLowerCase(),uv=fl[0].toUpperCase()+fl.slice(1);Hr(cv,"on"+uv)}Hr(Gf,"onAnimationEnd"),Hr(Kf,"onAnimationIteration"),Hr(Yf,"onAnimationStart"),Hr("dblclick","onDoubleClick"),Hr("focusin","onFocus"),Hr("focusout","onBlur"),Hr(Vf,"onTransitionEnd"),d("onMouseEnter",["mouseout","mouseover"]),d("onMouseLeave",["mouseout","mouseover"]),d("onPointerEnter",["pointerout","pointerover"]),d("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var to="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),dv=new Set("cancel close invalid load scroll toggle".split(" ").concat(to));function Jf(e,t,n){var i=e.type||"unknown-event";e.currentTarget=n,Us(i,t,void 0,e),e.currentTarget=null}function ep(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],f=i.event;i=i.listeners;e:{var h=void 0;if(t)for(var b=i.length-1;0<=b;b--){var _=i[b],O=_.instance,B=_.currentTarget;if(_=_.listener,O!==h&&f.isPropagationStopped())break e;Jf(f,_,B),h=O}else for(b=0;b<i.length;b++){if(_=i[b],O=_.instance,B=_.currentTarget,_=_.listener,O!==h&&f.isPropagationStopped())break e;Jf(f,_,B),h=O}}}if(Bn)throw e=Fa,Bn=!1,Fa=null,e}function qe(e,t){var n=t[yl];n===void 0&&(n=t[yl]=new Set);var i=e+"__bubble";n.has(i)||(tp(t,e,2,!1),n.add(i))}function pl(e,t,n){var i=0;t&&(i|=4),tp(n,e,i,t)}var hi="_reactListening"+Math.random().toString(36).slice(2);function ro(e){if(!e[hi]){e[hi]=!0,c.forEach(function(n){n!=="selectionchange"&&(dv.has(n)||pl(n,!1,e),pl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[hi]||(t[hi]=!0,pl("selectionchange",!1,t))}}function tp(e,t,n,i){switch(Sf(t)){case 1:var f=j2;break;case 4:f=E2;break;default:f=Vs}n=f.bind(null,t,n,e),f=void 0,!Dn||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(f=!0),i?f!==void 0?e.addEventListener(t,n,{capture:!0,passive:f}):e.addEventListener(t,n,!0):f!==void 0?e.addEventListener(t,n,{passive:f}):e.addEventListener(t,n,!1)}function ml(e,t,n,i,f){var h=i;if(!(t&1)&&!(t&2)&&i!==null)e:for(;;){if(i===null)return;var b=i.tag;if(b===3||b===4){var _=i.stateNode.containerInfo;if(_===f||_.nodeType===8&&_.parentNode===f)break;if(b===4)for(b=i.return;b!==null;){var O=b.tag;if((O===3||O===4)&&(O=b.stateNode.containerInfo,O===f||O.nodeType===8&&O.parentNode===f))return;b=b.return}for(;_!==null;){if(b=yn(_),b===null)return;if(O=b.tag,O===5||O===6){i=h=b;continue e}_=_.parentNode}}i=i.return}Vo(function(){var B=h,ne=$a(n),ie=[];e:{var ee=Qf.get(e);if(ee!==void 0){var me=Js,ge=e;switch(e){case"keypress":if(ci(n)===0)break e;case"keydown":case"keyup":me=U2;break;case"focusin":ge="focus",me=rl;break;case"focusout":ge="blur",me=rl;break;case"beforeblur":case"afterblur":me=rl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":me=_f;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":me=C2;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":me=q2;break;case Gf:case Kf:case Yf:me=O2;break;case Vf:me=W2;break;case"scroll":me=_2;break;case"wheel":me=K2;break;case"copy":case"cut":case"paste":me=L2;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":me=Cf}var ve=(t&4)!==0,Je=!ve&&e==="scroll",T=ve?ee!==null?ee+"Capture":null:ee;ve=[];for(var P=B,D;P!==null;){D=P;var de=D.stateNode;if(D.tag===5&&de!==null&&(D=de,T!==null&&(de=gn(P,T),de!=null&&ve.push(no(P,de,D)))),Je)break;P=P.return}0<ve.length&&(ee=new me(ee,ge,null,n,ne),ie.push({event:ee,listeners:ve}))}}if(!(t&7)){e:{if(ee=e==="mouseover"||e==="pointerover",me=e==="mouseout"||e==="pointerout",ee&&n!==Ra&&(ge=n.relatedTarget||n.fromElement)&&(yn(ge)||ge[br]))break e;if((me||ee)&&(ee=ne.window===ne?ne:(ee=ne.ownerDocument)?ee.defaultView||ee.parentWindow:window,me?(ge=n.relatedTarget||n.toElement,me=B,ge=ge?yn(ge):null,ge!==null&&(Je=vr(ge),ge!==Je||ge.tag!==5&&ge.tag!==6)&&(ge=null)):(me=null,ge=B),me!==ge)){if(ve=_f,de="onMouseLeave",T="onMouseEnter",P="mouse",(e==="pointerout"||e==="pointerover")&&(ve=Cf,de="onPointerLeave",T="onPointerEnter",P="pointer"),Je=me==null?ee:Qn(me),D=ge==null?ee:Qn(ge),ee=new ve(de,P+"leave",me,n,ne),ee.target=Je,ee.relatedTarget=D,de=null,yn(ne)===B&&(ve=new ve(T,P+"enter",ge,n,ne),ve.target=D,ve.relatedTarget=Je,de=ve),Je=de,me&&ge)t:{for(ve=me,T=ge,P=0,D=ve;D;D=Yn(D))P++;for(D=0,de=T;de;de=Yn(de))D++;for(;0<P-D;)ve=Yn(ve),P--;for(;0<D-P;)T=Yn(T),D--;for(;P--;){if(ve===T||T!==null&&ve===T.alternate)break t;ve=Yn(ve),T=Yn(T)}ve=null}else ve=null;me!==null&&rp(ie,ee,me,ve,!1),ge!==null&&Je!==null&&rp(ie,Je,ge,ve,!0)}}e:{if(ee=B?Qn(B):window,me=ee.nodeName&&ee.nodeName.toLowerCase(),me==="select"||me==="input"&&ee.type==="file")var xe=tv;else if(Rf(ee))if(If)xe=ov;else{xe=nv;var Se=rv}else(me=ee.nodeName)&&me.toLowerCase()==="input"&&(ee.type==="checkbox"||ee.type==="radio")&&(xe=av);if(xe&&(xe=xe(e,B))){$f(ie,xe,n,ne);break e}Se&&Se(e,ee,B),e==="focusout"&&(Se=ee._wrapperState)&&Se.controlled&&ee.type==="number"&&M(ee,"number",ee.value)}switch(Se=B?Qn(B):window,e){case"focusin":(Rf(Se)||Se.contentEditable==="true")&&(Gn=Se,ll=B,eo=null);break;case"focusout":eo=ll=Gn=null;break;case"mousedown":cl=!0;break;case"contextmenu":case"mouseup":case"dragend":cl=!1,Hf(ie,n,ne);break;case"selectionchange":if(lv)break;case"keydown":case"keyup":Hf(ie,n,ne)}var je;if(al)e:{switch(e){case"compositionstart":var Ce="onCompositionStart";break e;case"compositionend":Ce="onCompositionEnd";break e;case"compositionupdate":Ce="onCompositionUpdate";break e}Ce=void 0}else Wn?Pf(e,n)&&(Ce="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(Ce="onCompositionStart");Ce&&(zf&&n.locale!=="ko"&&(Wn||Ce!=="onCompositionStart"?Ce==="onCompositionEnd"&&Wn&&(je=jf()):(qr=ne,Xs="value"in qr?qr.value:qr.textContent,Wn=!0)),Se=gi(B,Ce),0<Se.length&&(Ce=new Af(Ce,e,null,n,ne),ie.push({event:Ce,listeners:Se}),je?Ce.data=je:(je=Lf(n),je!==null&&(Ce.data=je)))),(je=V2?Q2(e,n):X2(e,n))&&(B=gi(B,"onBeforeInput"),0<B.length&&(ne=new Af("onBeforeInput","beforeinput",null,n,ne),ie.push({event:ne,listeners:B}),ne.data=je))}ep(ie,t)})}function no(e,t,n){return{instance:e,listener:t,currentTarget:n}}function gi(e,t){for(var n=t+"Capture",i=[];e!==null;){var f=e,h=f.stateNode;f.tag===5&&h!==null&&(f=h,h=gn(e,n),h!=null&&i.unshift(no(e,h,f)),h=gn(e,t),h!=null&&i.push(no(e,h,f))),e=e.return}return i}function Yn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function rp(e,t,n,i,f){for(var h=t._reactName,b=[];n!==null&&n!==i;){var _=n,O=_.alternate,B=_.stateNode;if(O!==null&&O===i)break;_.tag===5&&B!==null&&(_=B,f?(O=gn(n,h),O!=null&&b.unshift(no(n,O,_))):f||(O=gn(n,h),O!=null&&b.push(no(n,O,_)))),n=n.return}b.length!==0&&e.push({event:t,listeners:b})}var fv=/\r\n?/g,pv=/\u0000|\uFFFD/g;function np(e){return(typeof e=="string"?e:""+e).replace(fv,`
`).replace(pv,"")}function vi(e,t,n){if(t=np(t),np(e)!==t&&n)throw Error(o(425))}function xi(){}var hl=null,gl=null;function vl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var xl=typeof setTimeout=="function"?setTimeout:void 0,mv=typeof clearTimeout=="function"?clearTimeout:void 0,ap=typeof Promise=="function"?Promise:void 0,hv=typeof queueMicrotask=="function"?queueMicrotask:typeof ap<"u"?function(e){return ap.resolve(null).then(e).catch(gv)}:xl;function gv(e){setTimeout(function(){throw e})}function bl(e,t){var n=t,i=0;do{var f=n.nextSibling;if(e.removeChild(n),f&&f.nodeType===8)if(n=f.data,n==="/$"){if(i===0){e.removeChild(f),Ga(t);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=f}while(n);Ga(t)}function Wr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function op(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Vn=Math.random().toString(36).slice(2),ir="__reactFiber$"+Vn,ao="__reactProps$"+Vn,br="__reactContainer$"+Vn,yl="__reactEvents$"+Vn,vv="__reactListeners$"+Vn,xv="__reactHandles$"+Vn;function yn(e){var t=e[ir];if(t)return t;for(var n=e.parentNode;n;){if(t=n[br]||n[ir]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=op(e);e!==null;){if(n=e[ir])return n;e=op(e)}return t}e=n,n=e.parentNode}return null}function oo(e){return e=e[ir]||e[br],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Qn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(o(33))}function bi(e){return e[ao]||null}var wl=[],Xn=-1;function Gr(e){return{current:e}}function He(e){0>Xn||(e.current=wl[Xn],wl[Xn]=null,Xn--)}function Ze(e,t){Xn++,wl[Xn]=e.current,e.current=t}var Kr={},ft=Gr(Kr),kt=Gr(!1),wn=Kr;function Jn(e,t){var n=e.type.contextTypes;if(!n)return Kr;var i=e.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===t)return i.__reactInternalMemoizedMaskedChildContext;var f={},h;for(h in n)f[h]=t[h];return i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=f),f}function Nt(e){return e=e.childContextTypes,e!=null}function yi(){He(kt),He(ft)}function ip(e,t,n){if(ft.current!==Kr)throw Error(o(168));Ze(ft,t),Ze(kt,n)}function sp(e,t,n){var i=e.stateNode;if(t=t.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var f in i)if(!(f in t))throw Error(o(108,Pe(e)||"Unknown",f));return Q({},n,i)}function wi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Kr,wn=ft.current,Ze(ft,e),Ze(kt,kt.current),!0}function lp(e,t,n){var i=e.stateNode;if(!i)throw Error(o(169));n?(e=sp(e,t,wn),i.__reactInternalMemoizedMergedChildContext=e,He(kt),He(ft),Ze(ft,e)):He(kt),Ze(kt,n)}var yr=null,ki=!1,kl=!1;function cp(e){yr===null?yr=[e]:yr.push(e)}function bv(e){ki=!0,cp(e)}function Yr(){if(!kl&&yr!==null){kl=!0;var e=0,t=De;try{var n=yr;for(De=1;e<n.length;e++){var i=n[e];do i=i(!0);while(i!==null)}yr=null,ki=!1}catch(f){throw yr!==null&&(yr=yr.slice(e+1)),xr(Gt,Yr),f}finally{De=t,kl=!1}}return null}var ea=[],ta=0,Ni=null,Si=0,Ft=[],Dt=0,kn=null,wr=1,kr="";function Nn(e,t){ea[ta++]=Si,ea[ta++]=Ni,Ni=e,Si=t}function up(e,t,n){Ft[Dt++]=wr,Ft[Dt++]=kr,Ft[Dt++]=kn,kn=e;var i=wr;e=kr;var f=32-Kt(i)-1;i&=~(1<<f),n+=1;var h=32-Kt(t)+f;if(30<h){var b=f-f%5;h=(i&(1<<b)-1).toString(32),i>>=b,f-=b,wr=1<<32-Kt(t)+f|n<<f|i,kr=h+e}else wr=1<<h|n<<f|i,kr=e}function Nl(e){e.return!==null&&(Nn(e,1),up(e,1,0))}function Sl(e){for(;e===Ni;)Ni=ea[--ta],ea[ta]=null,Si=ea[--ta],ea[ta]=null;for(;e===kn;)kn=Ft[--Dt],Ft[Dt]=null,kr=Ft[--Dt],Ft[Dt]=null,wr=Ft[--Dt],Ft[Dt]=null}var zt=null,Mt=null,Ge=!1,Vt=null;function dp(e,t){var n=qt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function fp(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,zt=e,Mt=Wr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,zt=e,Mt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=kn!==null?{id:wr,overflow:kr}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=qt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,zt=e,Mt=null,!0):!1;default:return!1}}function jl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function El(e){if(Ge){var t=Mt;if(t){var n=t;if(!fp(e,t)){if(jl(e))throw Error(o(418));t=Wr(n.nextSibling);var i=zt;t&&fp(e,t)?dp(i,n):(e.flags=e.flags&-4097|2,Ge=!1,zt=e)}}else{if(jl(e))throw Error(o(418));e.flags=e.flags&-4097|2,Ge=!1,zt=e}}}function pp(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;zt=e}function ji(e){if(e!==zt)return!1;if(!Ge)return pp(e),Ge=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!vl(e.type,e.memoizedProps)),t&&(t=Mt)){if(jl(e))throw mp(),Error(o(418));for(;t;)dp(e,t),t=Wr(t.nextSibling)}if(pp(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Mt=Wr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Mt=null}}else Mt=zt?Wr(e.stateNode.nextSibling):null;return!0}function mp(){for(var e=Mt;e;)e=Wr(e.nextSibling)}function ra(){Mt=zt=null,Ge=!1}function _l(e){Vt===null?Vt=[e]:Vt.push(e)}var yv=$.ReactCurrentBatchConfig;function io(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(o(309));var i=n.stateNode}if(!i)throw Error(o(147,e));var f=i,h=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===h?t.ref:(t=function(b){var _=f.refs;b===null?delete _[h]:_[h]=b},t._stringRef=h,t)}if(typeof e!="string")throw Error(o(284));if(!n._owner)throw Error(o(290,e))}return e}function Ei(e,t){throw e=Object.prototype.toString.call(t),Error(o(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function hp(e){var t=e._init;return t(e._payload)}function gp(e){function t(T,P){if(e){var D=T.deletions;D===null?(T.deletions=[P],T.flags|=16):D.push(P)}}function n(T,P){if(!e)return null;for(;P!==null;)t(T,P),P=P.sibling;return null}function i(T,P){for(T=new Map;P!==null;)P.key!==null?T.set(P.key,P):T.set(P.index,P),P=P.sibling;return T}function f(T,P){return T=nn(T,P),T.index=0,T.sibling=null,T}function h(T,P,D){return T.index=D,e?(D=T.alternate,D!==null?(D=D.index,D<P?(T.flags|=2,P):D):(T.flags|=2,P)):(T.flags|=1048576,P)}function b(T){return e&&T.alternate===null&&(T.flags|=2),T}function _(T,P,D,de){return P===null||P.tag!==6?(P=vc(D,T.mode,de),P.return=T,P):(P=f(P,D),P.return=T,P)}function O(T,P,D,de){var xe=D.type;return xe===Z?ne(T,P,D.props.children,de,D.key):P!==null&&(P.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===ae&&hp(xe)===P.type)?(de=f(P,D.props),de.ref=io(T,P,D),de.return=T,de):(de=Vi(D.type,D.key,D.props,null,T.mode,de),de.ref=io(T,P,D),de.return=T,de)}function B(T,P,D,de){return P===null||P.tag!==4||P.stateNode.containerInfo!==D.containerInfo||P.stateNode.implementation!==D.implementation?(P=xc(D,T.mode,de),P.return=T,P):(P=f(P,D.children||[]),P.return=T,P)}function ne(T,P,D,de,xe){return P===null||P.tag!==7?(P=Mn(D,T.mode,de,xe),P.return=T,P):(P=f(P,D),P.return=T,P)}function ie(T,P,D){if(typeof P=="string"&&P!==""||typeof P=="number")return P=vc(""+P,T.mode,D),P.return=T,P;if(typeof P=="object"&&P!==null){switch(P.$$typeof){case I:return D=Vi(P.type,P.key,P.props,null,T.mode,D),D.ref=io(T,null,P),D.return=T,D;case q:return P=xc(P,T.mode,D),P.return=T,P;case ae:var de=P._init;return ie(T,de(P._payload),D)}if(U(P)||V(P))return P=Mn(P,T.mode,D,null),P.return=T,P;Ei(T,P)}return null}function ee(T,P,D,de){var xe=P!==null?P.key:null;if(typeof D=="string"&&D!==""||typeof D=="number")return xe!==null?null:_(T,P,""+D,de);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case I:return D.key===xe?O(T,P,D,de):null;case q:return D.key===xe?B(T,P,D,de):null;case ae:return xe=D._init,ee(T,P,xe(D._payload),de)}if(U(D)||V(D))return xe!==null?null:ne(T,P,D,de,null);Ei(T,D)}return null}function me(T,P,D,de,xe){if(typeof de=="string"&&de!==""||typeof de=="number")return T=T.get(D)||null,_(P,T,""+de,xe);if(typeof de=="object"&&de!==null){switch(de.$$typeof){case I:return T=T.get(de.key===null?D:de.key)||null,O(P,T,de,xe);case q:return T=T.get(de.key===null?D:de.key)||null,B(P,T,de,xe);case ae:var Se=de._init;return me(T,P,D,Se(de._payload),xe)}if(U(de)||V(de))return T=T.get(D)||null,ne(P,T,de,xe,null);Ei(P,de)}return null}function ge(T,P,D,de){for(var xe=null,Se=null,je=P,Ce=P=0,it=null;je!==null&&Ce<D.length;Ce++){je.index>Ce?(it=je,je=null):it=je.sibling;var Fe=ee(T,je,D[Ce],de);if(Fe===null){je===null&&(je=it);break}e&&je&&Fe.alternate===null&&t(T,je),P=h(Fe,P,Ce),Se===null?xe=Fe:Se.sibling=Fe,Se=Fe,je=it}if(Ce===D.length)return n(T,je),Ge&&Nn(T,Ce),xe;if(je===null){for(;Ce<D.length;Ce++)je=ie(T,D[Ce],de),je!==null&&(P=h(je,P,Ce),Se===null?xe=je:Se.sibling=je,Se=je);return Ge&&Nn(T,Ce),xe}for(je=i(T,je);Ce<D.length;Ce++)it=me(je,T,Ce,D[Ce],de),it!==null&&(e&&it.alternate!==null&&je.delete(it.key===null?Ce:it.key),P=h(it,P,Ce),Se===null?xe=it:Se.sibling=it,Se=it);return e&&je.forEach(function(an){return t(T,an)}),Ge&&Nn(T,Ce),xe}function ve(T,P,D,de){var xe=V(D);if(typeof xe!="function")throw Error(o(150));if(D=xe.call(D),D==null)throw Error(o(151));for(var Se=xe=null,je=P,Ce=P=0,it=null,Fe=D.next();je!==null&&!Fe.done;Ce++,Fe=D.next()){je.index>Ce?(it=je,je=null):it=je.sibling;var an=ee(T,je,Fe.value,de);if(an===null){je===null&&(je=it);break}e&&je&&an.alternate===null&&t(T,je),P=h(an,P,Ce),Se===null?xe=an:Se.sibling=an,Se=an,je=it}if(Fe.done)return n(T,je),Ge&&Nn(T,Ce),xe;if(je===null){for(;!Fe.done;Ce++,Fe=D.next())Fe=ie(T,Fe.value,de),Fe!==null&&(P=h(Fe,P,Ce),Se===null?xe=Fe:Se.sibling=Fe,Se=Fe);return Ge&&Nn(T,Ce),xe}for(je=i(T,je);!Fe.done;Ce++,Fe=D.next())Fe=me(je,T,Ce,Fe.value,de),Fe!==null&&(e&&Fe.alternate!==null&&je.delete(Fe.key===null?Ce:Fe.key),P=h(Fe,P,Ce),Se===null?xe=Fe:Se.sibling=Fe,Se=Fe);return e&&je.forEach(function(Jv){return t(T,Jv)}),Ge&&Nn(T,Ce),xe}function Je(T,P,D,de){if(typeof D=="object"&&D!==null&&D.type===Z&&D.key===null&&(D=D.props.children),typeof D=="object"&&D!==null){switch(D.$$typeof){case I:e:{for(var xe=D.key,Se=P;Se!==null;){if(Se.key===xe){if(xe=D.type,xe===Z){if(Se.tag===7){n(T,Se.sibling),P=f(Se,D.props.children),P.return=T,T=P;break e}}else if(Se.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===ae&&hp(xe)===Se.type){n(T,Se.sibling),P=f(Se,D.props),P.ref=io(T,Se,D),P.return=T,T=P;break e}n(T,Se);break}else t(T,Se);Se=Se.sibling}D.type===Z?(P=Mn(D.props.children,T.mode,de,D.key),P.return=T,T=P):(de=Vi(D.type,D.key,D.props,null,T.mode,de),de.ref=io(T,P,D),de.return=T,T=de)}return b(T);case q:e:{for(Se=D.key;P!==null;){if(P.key===Se)if(P.tag===4&&P.stateNode.containerInfo===D.containerInfo&&P.stateNode.implementation===D.implementation){n(T,P.sibling),P=f(P,D.children||[]),P.return=T,T=P;break e}else{n(T,P);break}else t(T,P);P=P.sibling}P=xc(D,T.mode,de),P.return=T,T=P}return b(T);case ae:return Se=D._init,Je(T,P,Se(D._payload),de)}if(U(D))return ge(T,P,D,de);if(V(D))return ve(T,P,D,de);Ei(T,D)}return typeof D=="string"&&D!==""||typeof D=="number"?(D=""+D,P!==null&&P.tag===6?(n(T,P.sibling),P=f(P,D),P.return=T,T=P):(n(T,P),P=vc(D,T.mode,de),P.return=T,T=P),b(T)):n(T,P)}return Je}var na=gp(!0),vp=gp(!1),_i=Gr(null),Ai=null,aa=null,Al=null;function Cl(){Al=aa=Ai=null}function zl(e){var t=_i.current;He(_i),e._currentValue=t}function Ml(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function oa(e,t){Ai=e,Al=aa=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(St=!0),e.firstContext=null)}function Ut(e){var t=e._currentValue;if(Al!==e)if(e={context:e,memoizedValue:t,next:null},aa===null){if(Ai===null)throw Error(o(308));aa=e,Ai.dependencies={lanes:0,firstContext:e}}else aa=aa.next=e;return t}var Sn=null;function Ol(e){Sn===null?Sn=[e]:Sn.push(e)}function xp(e,t,n,i){var f=t.interleaved;return f===null?(n.next=n,Ol(t)):(n.next=f.next,f.next=n),t.interleaved=n,Nr(e,i)}function Nr(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Vr=!1;function Pl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function bp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Sr(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Qr(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,Te&2){var f=i.pending;return f===null?t.next=t:(t.next=f.next,f.next=t),i.pending=t,Nr(e,n)}return f=i.interleaved,f===null?(t.next=t,Ol(i)):(t.next=f.next,f.next=t),i.interleaved=t,Nr(e,n)}function Ci(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Gs(e,n)}}function yp(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var f=null,h=null;if(n=n.firstBaseUpdate,n!==null){do{var b={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};h===null?f=h=b:h=h.next=b,n=n.next}while(n!==null);h===null?f=h=t:h=h.next=t}else f=h=t;n={baseState:i.baseState,firstBaseUpdate:f,lastBaseUpdate:h,shared:i.shared,effects:i.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function zi(e,t,n,i){var f=e.updateQueue;Vr=!1;var h=f.firstBaseUpdate,b=f.lastBaseUpdate,_=f.shared.pending;if(_!==null){f.shared.pending=null;var O=_,B=O.next;O.next=null,b===null?h=B:b.next=B,b=O;var ne=e.alternate;ne!==null&&(ne=ne.updateQueue,_=ne.lastBaseUpdate,_!==b&&(_===null?ne.firstBaseUpdate=B:_.next=B,ne.lastBaseUpdate=O))}if(h!==null){var ie=f.baseState;b=0,ne=B=O=null,_=h;do{var ee=_.lane,me=_.eventTime;if((i&ee)===ee){ne!==null&&(ne=ne.next={eventTime:me,lane:0,tag:_.tag,payload:_.payload,callback:_.callback,next:null});e:{var ge=e,ve=_;switch(ee=t,me=n,ve.tag){case 1:if(ge=ve.payload,typeof ge=="function"){ie=ge.call(me,ie,ee);break e}ie=ge;break e;case 3:ge.flags=ge.flags&-65537|128;case 0:if(ge=ve.payload,ee=typeof ge=="function"?ge.call(me,ie,ee):ge,ee==null)break e;ie=Q({},ie,ee);break e;case 2:Vr=!0}}_.callback!==null&&_.lane!==0&&(e.flags|=64,ee=f.effects,ee===null?f.effects=[_]:ee.push(_))}else me={eventTime:me,lane:ee,tag:_.tag,payload:_.payload,callback:_.callback,next:null},ne===null?(B=ne=me,O=ie):ne=ne.next=me,b|=ee;if(_=_.next,_===null){if(_=f.shared.pending,_===null)break;ee=_,_=ee.next,ee.next=null,f.lastBaseUpdate=ee,f.shared.pending=null}}while(!0);if(ne===null&&(O=ie),f.baseState=O,f.firstBaseUpdate=B,f.lastBaseUpdate=ne,t=f.shared.interleaved,t!==null){f=t;do b|=f.lane,f=f.next;while(f!==t)}else h===null&&(f.shared.lanes=0);_n|=b,e.lanes=b,e.memoizedState=ie}}function wp(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var i=e[t],f=i.callback;if(f!==null){if(i.callback=null,i=n,typeof f!="function")throw Error(o(191,f));f.call(i)}}}var so={},sr=Gr(so),lo=Gr(so),co=Gr(so);function jn(e){if(e===so)throw Error(o(174));return e}function Ll(e,t){switch(Ze(co,t),Ze(lo,e),Ze(sr,so),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Be(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Be(t,e)}He(sr),Ze(sr,t)}function ia(){He(sr),He(lo),He(co)}function kp(e){jn(co.current);var t=jn(sr.current),n=Be(t,e.type);t!==n&&(Ze(lo,e),Ze(sr,n))}function Rl(e){lo.current===e&&(He(sr),He(lo))}var Ve=Gr(0);function Mi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var $l=[];function Il(){for(var e=0;e<$l.length;e++)$l[e]._workInProgressVersionPrimary=null;$l.length=0}var Oi=$.ReactCurrentDispatcher,Tl=$.ReactCurrentBatchConfig,En=0,Qe=null,rt=null,at=null,Pi=!1,uo=!1,fo=0,wv=0;function pt(){throw Error(o(321))}function Fl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Yt(e[n],t[n]))return!1;return!0}function Dl(e,t,n,i,f,h){if(En=h,Qe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Oi.current=e===null||e.memoizedState===null?jv:Ev,e=n(i,f),uo){h=0;do{if(uo=!1,fo=0,25<=h)throw Error(o(301));h+=1,at=rt=null,t.updateQueue=null,Oi.current=_v,e=n(i,f)}while(uo)}if(Oi.current=$i,t=rt!==null&&rt.next!==null,En=0,at=rt=Qe=null,Pi=!1,t)throw Error(o(300));return e}function Ul(){var e=fo!==0;return fo=0,e}function lr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return at===null?Qe.memoizedState=at=e:at=at.next=e,at}function Bt(){if(rt===null){var e=Qe.alternate;e=e!==null?e.memoizedState:null}else e=rt.next;var t=at===null?Qe.memoizedState:at.next;if(t!==null)at=t,rt=e;else{if(e===null)throw Error(o(310));rt=e,e={memoizedState:rt.memoizedState,baseState:rt.baseState,baseQueue:rt.baseQueue,queue:rt.queue,next:null},at===null?Qe.memoizedState=at=e:at=at.next=e}return at}function po(e,t){return typeof t=="function"?t(e):t}function Bl(e){var t=Bt(),n=t.queue;if(n===null)throw Error(o(311));n.lastRenderedReducer=e;var i=rt,f=i.baseQueue,h=n.pending;if(h!==null){if(f!==null){var b=f.next;f.next=h.next,h.next=b}i.baseQueue=f=h,n.pending=null}if(f!==null){h=f.next,i=i.baseState;var _=b=null,O=null,B=h;do{var ne=B.lane;if((En&ne)===ne)O!==null&&(O=O.next={lane:0,action:B.action,hasEagerState:B.hasEagerState,eagerState:B.eagerState,next:null}),i=B.hasEagerState?B.eagerState:e(i,B.action);else{var ie={lane:ne,action:B.action,hasEagerState:B.hasEagerState,eagerState:B.eagerState,next:null};O===null?(_=O=ie,b=i):O=O.next=ie,Qe.lanes|=ne,_n|=ne}B=B.next}while(B!==null&&B!==h);O===null?b=i:O.next=_,Yt(i,t.memoizedState)||(St=!0),t.memoizedState=i,t.baseState=b,t.baseQueue=O,n.lastRenderedState=i}if(e=n.interleaved,e!==null){f=e;do h=f.lane,Qe.lanes|=h,_n|=h,f=f.next;while(f!==e)}else f===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Zl(e){var t=Bt(),n=t.queue;if(n===null)throw Error(o(311));n.lastRenderedReducer=e;var i=n.dispatch,f=n.pending,h=t.memoizedState;if(f!==null){n.pending=null;var b=f=f.next;do h=e(h,b.action),b=b.next;while(b!==f);Yt(h,t.memoizedState)||(St=!0),t.memoizedState=h,t.baseQueue===null&&(t.baseState=h),n.lastRenderedState=h}return[h,i]}function Np(){}function Sp(e,t){var n=Qe,i=Bt(),f=t(),h=!Yt(i.memoizedState,f);if(h&&(i.memoizedState=f,St=!0),i=i.queue,ql(_p.bind(null,n,i,e),[e]),i.getSnapshot!==t||h||at!==null&&at.memoizedState.tag&1){if(n.flags|=2048,mo(9,Ep.bind(null,n,i,f,t),void 0,null),ot===null)throw Error(o(349));En&30||jp(n,t,f)}return f}function jp(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Qe.updateQueue,t===null?(t={lastEffect:null,stores:null},Qe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ep(e,t,n,i){t.value=n,t.getSnapshot=i,Ap(t)&&Cp(e)}function _p(e,t,n){return n(function(){Ap(t)&&Cp(e)})}function Ap(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Yt(e,n)}catch{return!0}}function Cp(e){var t=Nr(e,1);t!==null&&er(t,e,1,-1)}function zp(e){var t=lr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:po,lastRenderedState:e},t.queue=e,e=e.dispatch=Sv.bind(null,Qe,e),[t.memoizedState,e]}function mo(e,t,n,i){return e={tag:e,create:t,destroy:n,deps:i,next:null},t=Qe.updateQueue,t===null?(t={lastEffect:null,stores:null},Qe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e)),e}function Mp(){return Bt().memoizedState}function Li(e,t,n,i){var f=lr();Qe.flags|=e,f.memoizedState=mo(1|t,n,void 0,i===void 0?null:i)}function Ri(e,t,n,i){var f=Bt();i=i===void 0?null:i;var h=void 0;if(rt!==null){var b=rt.memoizedState;if(h=b.destroy,i!==null&&Fl(i,b.deps)){f.memoizedState=mo(t,n,h,i);return}}Qe.flags|=e,f.memoizedState=mo(1|t,n,h,i)}function Op(e,t){return Li(8390656,8,e,t)}function ql(e,t){return Ri(2048,8,e,t)}function Pp(e,t){return Ri(4,2,e,t)}function Lp(e,t){return Ri(4,4,e,t)}function Rp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function $p(e,t,n){return n=n!=null?n.concat([e]):null,Ri(4,4,Rp.bind(null,t,e),n)}function Hl(){}function Ip(e,t){var n=Bt();t=t===void 0?null:t;var i=n.memoizedState;return i!==null&&t!==null&&Fl(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Tp(e,t){var n=Bt();t=t===void 0?null:t;var i=n.memoizedState;return i!==null&&t!==null&&Fl(t,i[1])?i[0]:(e=e(),n.memoizedState=[e,t],e)}function Fp(e,t,n){return En&21?(Yt(n,t)||(n=hf(),Qe.lanes|=n,_n|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,St=!0),e.memoizedState=n)}function kv(e,t){var n=De;De=n!==0&&4>n?n:4,e(!0);var i=Tl.transition;Tl.transition={};try{e(!1),t()}finally{De=n,Tl.transition=i}}function Dp(){return Bt().memoizedState}function Nv(e,t,n){var i=tn(e);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Up(e))Bp(t,n);else if(n=xp(e,t,n,i),n!==null){var f=bt();er(n,e,i,f),Zp(n,t,i)}}function Sv(e,t,n){var i=tn(e),f={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Up(e))Bp(t,f);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=t.lastRenderedReducer,h!==null))try{var b=t.lastRenderedState,_=h(b,n);if(f.hasEagerState=!0,f.eagerState=_,Yt(_,b)){var O=t.interleaved;O===null?(f.next=f,Ol(t)):(f.next=O.next,O.next=f),t.interleaved=f;return}}catch{}finally{}n=xp(e,t,f,i),n!==null&&(f=bt(),er(n,e,i,f),Zp(n,t,i))}}function Up(e){var t=e.alternate;return e===Qe||t!==null&&t===Qe}function Bp(e,t){uo=Pi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Zp(e,t,n){if(n&4194240){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Gs(e,n)}}var $i={readContext:Ut,useCallback:pt,useContext:pt,useEffect:pt,useImperativeHandle:pt,useInsertionEffect:pt,useLayoutEffect:pt,useMemo:pt,useReducer:pt,useRef:pt,useState:pt,useDebugValue:pt,useDeferredValue:pt,useTransition:pt,useMutableSource:pt,useSyncExternalStore:pt,useId:pt,unstable_isNewReconciler:!1},jv={readContext:Ut,useCallback:function(e,t){return lr().memoizedState=[e,t===void 0?null:t],e},useContext:Ut,useEffect:Op,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Li(4194308,4,Rp.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Li(4194308,4,e,t)},useInsertionEffect:function(e,t){return Li(4,2,e,t)},useMemo:function(e,t){var n=lr();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var i=lr();return t=n!==void 0?n(t):t,i.memoizedState=i.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},i.queue=e,e=e.dispatch=Nv.bind(null,Qe,e),[i.memoizedState,e]},useRef:function(e){var t=lr();return e={current:e},t.memoizedState=e},useState:zp,useDebugValue:Hl,useDeferredValue:function(e){return lr().memoizedState=e},useTransition:function(){var e=zp(!1),t=e[0];return e=kv.bind(null,e[1]),lr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var i=Qe,f=lr();if(Ge){if(n===void 0)throw Error(o(407));n=n()}else{if(n=t(),ot===null)throw Error(o(349));En&30||jp(i,t,n)}f.memoizedState=n;var h={value:n,getSnapshot:t};return f.queue=h,Op(_p.bind(null,i,h,e),[e]),i.flags|=2048,mo(9,Ep.bind(null,i,h,n,t),void 0,null),n},useId:function(){var e=lr(),t=ot.identifierPrefix;if(Ge){var n=kr,i=wr;n=(i&~(1<<32-Kt(i)-1)).toString(32)+n,t=":"+t+"R"+n,n=fo++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=wv++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Ev={readContext:Ut,useCallback:Ip,useContext:Ut,useEffect:ql,useImperativeHandle:$p,useInsertionEffect:Pp,useLayoutEffect:Lp,useMemo:Tp,useReducer:Bl,useRef:Mp,useState:function(){return Bl(po)},useDebugValue:Hl,useDeferredValue:function(e){var t=Bt();return Fp(t,rt.memoizedState,e)},useTransition:function(){var e=Bl(po)[0],t=Bt().memoizedState;return[e,t]},useMutableSource:Np,useSyncExternalStore:Sp,useId:Dp,unstable_isNewReconciler:!1},_v={readContext:Ut,useCallback:Ip,useContext:Ut,useEffect:ql,useImperativeHandle:$p,useInsertionEffect:Pp,useLayoutEffect:Lp,useMemo:Tp,useReducer:Zl,useRef:Mp,useState:function(){return Zl(po)},useDebugValue:Hl,useDeferredValue:function(e){var t=Bt();return rt===null?t.memoizedState=e:Fp(t,rt.memoizedState,e)},useTransition:function(){var e=Zl(po)[0],t=Bt().memoizedState;return[e,t]},useMutableSource:Np,useSyncExternalStore:Sp,useId:Dp,unstable_isNewReconciler:!1};function Qt(e,t){if(e&&e.defaultProps){t=Q({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Wl(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Q({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ii={isMounted:function(e){return(e=e._reactInternals)?vr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var i=bt(),f=tn(e),h=Sr(i,f);h.payload=t,n!=null&&(h.callback=n),t=Qr(e,h,f),t!==null&&(er(t,e,f,i),Ci(t,e,f))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=bt(),f=tn(e),h=Sr(i,f);h.tag=1,h.payload=t,n!=null&&(h.callback=n),t=Qr(e,h,f),t!==null&&(er(t,e,f,i),Ci(t,e,f))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=bt(),i=tn(e),f=Sr(n,i);f.tag=2,t!=null&&(f.callback=t),t=Qr(e,f,i),t!==null&&(er(t,e,i,n),Ci(t,e,i))}};function qp(e,t,n,i,f,h,b){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,h,b):t.prototype&&t.prototype.isPureReactComponent?!Ja(n,i)||!Ja(f,h):!0}function Hp(e,t,n){var i=!1,f=Kr,h=t.contextType;return typeof h=="object"&&h!==null?h=Ut(h):(f=Nt(t)?wn:ft.current,i=t.contextTypes,h=(i=i!=null)?Jn(e,f):Kr),t=new t(n,h),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ii,e.stateNode=t,t._reactInternals=e,i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=f,e.__reactInternalMemoizedMaskedChildContext=h),t}function Wp(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&Ii.enqueueReplaceState(t,t.state,null)}function Gl(e,t,n,i){var f=e.stateNode;f.props=n,f.state=e.memoizedState,f.refs={},Pl(e);var h=t.contextType;typeof h=="object"&&h!==null?f.context=Ut(h):(h=Nt(t)?wn:ft.current,f.context=Jn(e,h)),f.state=e.memoizedState,h=t.getDerivedStateFromProps,typeof h=="function"&&(Wl(e,t,h,n),f.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(t=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),t!==f.state&&Ii.enqueueReplaceState(f,f.state,null),zi(e,n,f,i),f.state=e.memoizedState),typeof f.componentDidMount=="function"&&(e.flags|=4194308)}function sa(e,t){try{var n="",i=t;do n+=_e(i),i=i.return;while(i);var f=n}catch(h){f=`
Error generating stack: `+h.message+`
`+h.stack}return{value:e,source:t,stack:f,digest:null}}function Kl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Yl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Av=typeof WeakMap=="function"?WeakMap:Map;function Gp(e,t,n){n=Sr(-1,n),n.tag=3,n.payload={element:null};var i=t.value;return n.callback=function(){qi||(qi=!0,cc=i),Yl(e,t)},n}function Kp(e,t,n){n=Sr(-1,n),n.tag=3;var i=e.type.getDerivedStateFromError;if(typeof i=="function"){var f=t.value;n.payload=function(){return i(f)},n.callback=function(){Yl(e,t)}}var h=e.stateNode;return h!==null&&typeof h.componentDidCatch=="function"&&(n.callback=function(){Yl(e,t),typeof i!="function"&&(Jr===null?Jr=new Set([this]):Jr.add(this));var b=t.stack;this.componentDidCatch(t.value,{componentStack:b!==null?b:""})}),n}function Yp(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new Av;var f=new Set;i.set(t,f)}else f=i.get(t),f===void 0&&(f=new Set,i.set(t,f));f.has(n)||(f.add(n),e=Bv.bind(null,e,t,n),t.then(e,e))}function Vp(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Qp(e,t,n,i,f){return e.mode&1?(e.flags|=65536,e.lanes=f,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Sr(-1,1),t.tag=2,Qr(n,t,1))),n.lanes|=1),e)}var Cv=$.ReactCurrentOwner,St=!1;function xt(e,t,n,i){t.child=e===null?vp(t,null,n,i):na(t,e.child,n,i)}function Xp(e,t,n,i,f){n=n.render;var h=t.ref;return oa(t,f),i=Dl(e,t,n,i,h,f),n=Ul(),e!==null&&!St?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~f,jr(e,t,f)):(Ge&&n&&Nl(t),t.flags|=1,xt(e,t,i,f),t.child)}function Jp(e,t,n,i,f){if(e===null){var h=n.type;return typeof h=="function"&&!gc(h)&&h.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=h,em(e,t,h,i,f)):(e=Vi(n.type,null,i,t,t.mode,f),e.ref=t.ref,e.return=t,t.child=e)}if(h=e.child,!(e.lanes&f)){var b=h.memoizedProps;if(n=n.compare,n=n!==null?n:Ja,n(b,i)&&e.ref===t.ref)return jr(e,t,f)}return t.flags|=1,e=nn(h,i),e.ref=t.ref,e.return=t,t.child=e}function em(e,t,n,i,f){if(e!==null){var h=e.memoizedProps;if(Ja(h,i)&&e.ref===t.ref)if(St=!1,t.pendingProps=i=h,(e.lanes&f)!==0)e.flags&131072&&(St=!0);else return t.lanes=e.lanes,jr(e,t,f)}return Vl(e,t,n,i,f)}function tm(e,t,n){var i=t.pendingProps,f=i.children,h=e!==null?e.memoizedState:null;if(i.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ze(ca,Ot),Ot|=n;else{if(!(n&1073741824))return e=h!==null?h.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ze(ca,Ot),Ot|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=h!==null?h.baseLanes:n,Ze(ca,Ot),Ot|=i}else h!==null?(i=h.baseLanes|n,t.memoizedState=null):i=n,Ze(ca,Ot),Ot|=i;return xt(e,t,f,n),t.child}function rm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Vl(e,t,n,i,f){var h=Nt(n)?wn:ft.current;return h=Jn(t,h),oa(t,f),n=Dl(e,t,n,i,h,f),i=Ul(),e!==null&&!St?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~f,jr(e,t,f)):(Ge&&i&&Nl(t),t.flags|=1,xt(e,t,n,f),t.child)}function nm(e,t,n,i,f){if(Nt(n)){var h=!0;wi(t)}else h=!1;if(oa(t,f),t.stateNode===null)Fi(e,t),Hp(t,n,i),Gl(t,n,i,f),i=!0;else if(e===null){var b=t.stateNode,_=t.memoizedProps;b.props=_;var O=b.context,B=n.contextType;typeof B=="object"&&B!==null?B=Ut(B):(B=Nt(n)?wn:ft.current,B=Jn(t,B));var ne=n.getDerivedStateFromProps,ie=typeof ne=="function"||typeof b.getSnapshotBeforeUpdate=="function";ie||typeof b.UNSAFE_componentWillReceiveProps!="function"&&typeof b.componentWillReceiveProps!="function"||(_!==i||O!==B)&&Wp(t,b,i,B),Vr=!1;var ee=t.memoizedState;b.state=ee,zi(t,i,b,f),O=t.memoizedState,_!==i||ee!==O||kt.current||Vr?(typeof ne=="function"&&(Wl(t,n,ne,i),O=t.memoizedState),(_=Vr||qp(t,n,_,i,ee,O,B))?(ie||typeof b.UNSAFE_componentWillMount!="function"&&typeof b.componentWillMount!="function"||(typeof b.componentWillMount=="function"&&b.componentWillMount(),typeof b.UNSAFE_componentWillMount=="function"&&b.UNSAFE_componentWillMount()),typeof b.componentDidMount=="function"&&(t.flags|=4194308)):(typeof b.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=O),b.props=i,b.state=O,b.context=B,i=_):(typeof b.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{b=t.stateNode,bp(e,t),_=t.memoizedProps,B=t.type===t.elementType?_:Qt(t.type,_),b.props=B,ie=t.pendingProps,ee=b.context,O=n.contextType,typeof O=="object"&&O!==null?O=Ut(O):(O=Nt(n)?wn:ft.current,O=Jn(t,O));var me=n.getDerivedStateFromProps;(ne=typeof me=="function"||typeof b.getSnapshotBeforeUpdate=="function")||typeof b.UNSAFE_componentWillReceiveProps!="function"&&typeof b.componentWillReceiveProps!="function"||(_!==ie||ee!==O)&&Wp(t,b,i,O),Vr=!1,ee=t.memoizedState,b.state=ee,zi(t,i,b,f);var ge=t.memoizedState;_!==ie||ee!==ge||kt.current||Vr?(typeof me=="function"&&(Wl(t,n,me,i),ge=t.memoizedState),(B=Vr||qp(t,n,B,i,ee,ge,O)||!1)?(ne||typeof b.UNSAFE_componentWillUpdate!="function"&&typeof b.componentWillUpdate!="function"||(typeof b.componentWillUpdate=="function"&&b.componentWillUpdate(i,ge,O),typeof b.UNSAFE_componentWillUpdate=="function"&&b.UNSAFE_componentWillUpdate(i,ge,O)),typeof b.componentDidUpdate=="function"&&(t.flags|=4),typeof b.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof b.componentDidUpdate!="function"||_===e.memoizedProps&&ee===e.memoizedState||(t.flags|=4),typeof b.getSnapshotBeforeUpdate!="function"||_===e.memoizedProps&&ee===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=ge),b.props=i,b.state=ge,b.context=O,i=B):(typeof b.componentDidUpdate!="function"||_===e.memoizedProps&&ee===e.memoizedState||(t.flags|=4),typeof b.getSnapshotBeforeUpdate!="function"||_===e.memoizedProps&&ee===e.memoizedState||(t.flags|=1024),i=!1)}return Ql(e,t,n,i,h,f)}function Ql(e,t,n,i,f,h){rm(e,t);var b=(t.flags&128)!==0;if(!i&&!b)return f&&lp(t,n,!1),jr(e,t,h);i=t.stateNode,Cv.current=t;var _=b&&typeof n.getDerivedStateFromError!="function"?null:i.render();return t.flags|=1,e!==null&&b?(t.child=na(t,e.child,null,h),t.child=na(t,null,_,h)):xt(e,t,_,h),t.memoizedState=i.state,f&&lp(t,n,!0),t.child}function am(e){var t=e.stateNode;t.pendingContext?ip(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ip(e,t.context,!1),Ll(e,t.containerInfo)}function om(e,t,n,i,f){return ra(),_l(f),t.flags|=256,xt(e,t,n,i),t.child}var Xl={dehydrated:null,treeContext:null,retryLane:0};function Jl(e){return{baseLanes:e,cachePool:null,transitions:null}}function im(e,t,n){var i=t.pendingProps,f=Ve.current,h=!1,b=(t.flags&128)!==0,_;if((_=b)||(_=e!==null&&e.memoizedState===null?!1:(f&2)!==0),_?(h=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(f|=1),Ze(Ve,f&1),e===null)return El(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(b=i.children,e=i.fallback,h?(i=t.mode,h=t.child,b={mode:"hidden",children:b},!(i&1)&&h!==null?(h.childLanes=0,h.pendingProps=b):h=Qi(b,i,0,null),e=Mn(e,i,n,null),h.return=t,e.return=t,h.sibling=e,t.child=h,t.child.memoizedState=Jl(n),t.memoizedState=Xl,e):ec(t,b));if(f=e.memoizedState,f!==null&&(_=f.dehydrated,_!==null))return zv(e,t,b,i,_,f,n);if(h){h=i.fallback,b=t.mode,f=e.child,_=f.sibling;var O={mode:"hidden",children:i.children};return!(b&1)&&t.child!==f?(i=t.child,i.childLanes=0,i.pendingProps=O,t.deletions=null):(i=nn(f,O),i.subtreeFlags=f.subtreeFlags&14680064),_!==null?h=nn(_,h):(h=Mn(h,b,n,null),h.flags|=2),h.return=t,i.return=t,i.sibling=h,t.child=i,i=h,h=t.child,b=e.child.memoizedState,b=b===null?Jl(n):{baseLanes:b.baseLanes|n,cachePool:null,transitions:b.transitions},h.memoizedState=b,h.childLanes=e.childLanes&~n,t.memoizedState=Xl,i}return h=e.child,e=h.sibling,i=nn(h,{mode:"visible",children:i.children}),!(t.mode&1)&&(i.lanes=n),i.return=t,i.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=i,t.memoizedState=null,i}function ec(e,t){return t=Qi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ti(e,t,n,i){return i!==null&&_l(i),na(t,e.child,null,n),e=ec(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function zv(e,t,n,i,f,h,b){if(n)return t.flags&256?(t.flags&=-257,i=Kl(Error(o(422))),Ti(e,t,b,i)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(h=i.fallback,f=t.mode,i=Qi({mode:"visible",children:i.children},f,0,null),h=Mn(h,f,b,null),h.flags|=2,i.return=t,h.return=t,i.sibling=h,t.child=i,t.mode&1&&na(t,e.child,null,b),t.child.memoizedState=Jl(b),t.memoizedState=Xl,h);if(!(t.mode&1))return Ti(e,t,b,null);if(f.data==="$!"){if(i=f.nextSibling&&f.nextSibling.dataset,i)var _=i.dgst;return i=_,h=Error(o(419)),i=Kl(h,i,void 0),Ti(e,t,b,i)}if(_=(b&e.childLanes)!==0,St||_){if(i=ot,i!==null){switch(b&-b){case 4:f=2;break;case 16:f=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:f=32;break;case 536870912:f=268435456;break;default:f=0}f=f&(i.suspendedLanes|b)?0:f,f!==0&&f!==h.retryLane&&(h.retryLane=f,Nr(e,f),er(i,e,f,-1))}return hc(),i=Kl(Error(o(421))),Ti(e,t,b,i)}return f.data==="$?"?(t.flags|=128,t.child=e.child,t=Zv.bind(null,e),f._reactRetry=t,null):(e=h.treeContext,Mt=Wr(f.nextSibling),zt=t,Ge=!0,Vt=null,e!==null&&(Ft[Dt++]=wr,Ft[Dt++]=kr,Ft[Dt++]=kn,wr=e.id,kr=e.overflow,kn=t),t=ec(t,i.children),t.flags|=4096,t)}function sm(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Ml(e.return,t,n)}function tc(e,t,n,i,f){var h=e.memoizedState;h===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:f}:(h.isBackwards=t,h.rendering=null,h.renderingStartTime=0,h.last=i,h.tail=n,h.tailMode=f)}function lm(e,t,n){var i=t.pendingProps,f=i.revealOrder,h=i.tail;if(xt(e,t,i.children,n),i=Ve.current,i&2)i=i&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&sm(e,n,t);else if(e.tag===19)sm(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}if(Ze(Ve,i),!(t.mode&1))t.memoizedState=null;else switch(f){case"forwards":for(n=t.child,f=null;n!==null;)e=n.alternate,e!==null&&Mi(e)===null&&(f=n),n=n.sibling;n=f,n===null?(f=t.child,t.child=null):(f=n.sibling,n.sibling=null),tc(t,!1,f,n,h);break;case"backwards":for(n=null,f=t.child,t.child=null;f!==null;){if(e=f.alternate,e!==null&&Mi(e)===null){t.child=f;break}e=f.sibling,f.sibling=n,n=f,f=e}tc(t,!0,n,null,h);break;case"together":tc(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Fi(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function jr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),_n|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(o(153));if(t.child!==null){for(e=t.child,n=nn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=nn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Mv(e,t,n){switch(t.tag){case 3:am(t),ra();break;case 5:kp(t);break;case 1:Nt(t.type)&&wi(t);break;case 4:Ll(t,t.stateNode.containerInfo);break;case 10:var i=t.type._context,f=t.memoizedProps.value;Ze(_i,i._currentValue),i._currentValue=f;break;case 13:if(i=t.memoizedState,i!==null)return i.dehydrated!==null?(Ze(Ve,Ve.current&1),t.flags|=128,null):n&t.child.childLanes?im(e,t,n):(Ze(Ve,Ve.current&1),e=jr(e,t,n),e!==null?e.sibling:null);Ze(Ve,Ve.current&1);break;case 19:if(i=(n&t.childLanes)!==0,e.flags&128){if(i)return lm(e,t,n);t.flags|=128}if(f=t.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),Ze(Ve,Ve.current),i)break;return null;case 22:case 23:return t.lanes=0,tm(e,t,n)}return jr(e,t,n)}var cm,rc,um,dm;cm=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},rc=function(){},um=function(e,t,n,i){var f=e.memoizedProps;if(f!==i){e=t.stateNode,jn(sr.current);var h=null;switch(n){case"input":f=ut(e,f),i=ut(e,i),h=[];break;case"select":f=Q({},f,{value:void 0}),i=Q({},i,{value:void 0}),h=[];break;case"textarea":f=oe(e,f),i=oe(e,i),h=[];break;default:typeof f.onClick!="function"&&typeof i.onClick=="function"&&(e.onclick=xi)}Fn(n,i);var b;n=null;for(B in f)if(!i.hasOwnProperty(B)&&f.hasOwnProperty(B)&&f[B]!=null)if(B==="style"){var _=f[B];for(b in _)_.hasOwnProperty(b)&&(n||(n={}),n[b]="")}else B!=="dangerouslySetInnerHTML"&&B!=="children"&&B!=="suppressContentEditableWarning"&&B!=="suppressHydrationWarning"&&B!=="autoFocus"&&(l.hasOwnProperty(B)?h||(h=[]):(h=h||[]).push(B,null));for(B in i){var O=i[B];if(_=f!=null?f[B]:void 0,i.hasOwnProperty(B)&&O!==_&&(O!=null||_!=null))if(B==="style")if(_){for(b in _)!_.hasOwnProperty(b)||O&&O.hasOwnProperty(b)||(n||(n={}),n[b]="");for(b in O)O.hasOwnProperty(b)&&_[b]!==O[b]&&(n||(n={}),n[b]=O[b])}else n||(h||(h=[]),h.push(B,n)),n=O;else B==="dangerouslySetInnerHTML"?(O=O?O.__html:void 0,_=_?_.__html:void 0,O!=null&&_!==O&&(h=h||[]).push(B,O)):B==="children"?typeof O!="string"&&typeof O!="number"||(h=h||[]).push(B,""+O):B!=="suppressContentEditableWarning"&&B!=="suppressHydrationWarning"&&(l.hasOwnProperty(B)?(O!=null&&B==="onScroll"&&qe("scroll",e),h||_===O||(h=[])):(h=h||[]).push(B,O))}n&&(h=h||[]).push("style",n);var B=h;(t.updateQueue=B)&&(t.flags|=4)}},dm=function(e,t,n,i){n!==i&&(t.flags|=4)};function ho(e,t){if(!Ge)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function mt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var f=e.child;f!==null;)n|=f.lanes|f.childLanes,i|=f.subtreeFlags&14680064,i|=f.flags&14680064,f.return=e,f=f.sibling;else for(f=e.child;f!==null;)n|=f.lanes|f.childLanes,i|=f.subtreeFlags,i|=f.flags,f.return=e,f=f.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function Ov(e,t,n){var i=t.pendingProps;switch(Sl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return mt(t),null;case 1:return Nt(t.type)&&yi(),mt(t),null;case 3:return i=t.stateNode,ia(),He(kt),He(ft),Il(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(ji(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Vt!==null&&(fc(Vt),Vt=null))),rc(e,t),mt(t),null;case 5:Rl(t);var f=jn(co.current);if(n=t.type,e!==null&&t.stateNode!=null)um(e,t,n,i,f),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!i){if(t.stateNode===null)throw Error(o(166));return mt(t),null}if(e=jn(sr.current),ji(t)){i=t.stateNode,n=t.type;var h=t.memoizedProps;switch(i[ir]=t,i[ao]=h,e=(t.mode&1)!==0,n){case"dialog":qe("cancel",i),qe("close",i);break;case"iframe":case"object":case"embed":qe("load",i);break;case"video":case"audio":for(f=0;f<to.length;f++)qe(to[f],i);break;case"source":qe("error",i);break;case"img":case"image":case"link":qe("error",i),qe("load",i);break;case"details":qe("toggle",i);break;case"input":pn(i,h),qe("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!h.multiple},qe("invalid",i);break;case"textarea":ue(i,h),qe("invalid",i)}Fn(n,h),f=null;for(var b in h)if(h.hasOwnProperty(b)){var _=h[b];b==="children"?typeof _=="string"?i.textContent!==_&&(h.suppressHydrationWarning!==!0&&vi(i.textContent,_,e),f=["children",_]):typeof _=="number"&&i.textContent!==""+_&&(h.suppressHydrationWarning!==!0&&vi(i.textContent,_,e),f=["children",""+_]):l.hasOwnProperty(b)&&_!=null&&b==="onScroll"&&qe("scroll",i)}switch(n){case"input":$r(i),j(i,h,!0);break;case"textarea":$r(i),Me(i);break;case"select":case"option":break;default:typeof h.onClick=="function"&&(i.onclick=xi)}i=f,t.updateQueue=i,i!==null&&(t.flags|=4)}else{b=f.nodeType===9?f:f.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ie(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=b.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof i.is=="string"?e=b.createElement(n,{is:i.is}):(e=b.createElement(n),n==="select"&&(b=e,i.multiple?b.multiple=!0:i.size&&(b.size=i.size))):e=b.createElementNS(e,n),e[ir]=t,e[ao]=i,cm(e,t,!1,!1),t.stateNode=e;e:{switch(b=La(n,i),n){case"dialog":qe("cancel",e),qe("close",e),f=i;break;case"iframe":case"object":case"embed":qe("load",e),f=i;break;case"video":case"audio":for(f=0;f<to.length;f++)qe(to[f],e);f=i;break;case"source":qe("error",e),f=i;break;case"img":case"image":case"link":qe("error",e),qe("load",e),f=i;break;case"details":qe("toggle",e),f=i;break;case"input":pn(e,i),f=ut(e,i),qe("invalid",e);break;case"option":f=i;break;case"select":e._wrapperState={wasMultiple:!!i.multiple},f=Q({},i,{value:void 0}),qe("invalid",e);break;case"textarea":ue(e,i),f=oe(e,i),qe("invalid",e);break;default:f=i}Fn(n,f),_=f;for(h in _)if(_.hasOwnProperty(h)){var O=_[h];h==="style"?gr(e,O):h==="dangerouslySetInnerHTML"?(O=O?O.__html:void 0,O!=null&&It(e,O)):h==="children"?typeof O=="string"?(n!=="textarea"||O!=="")&&dt(e,O):typeof O=="number"&&dt(e,""+O):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(l.hasOwnProperty(h)?O!=null&&h==="onScroll"&&qe("scroll",e):O!=null&&C(e,h,O,b))}switch(n){case"input":$r(e),j(e,i,!1);break;case"textarea":$r(e),Me(e);break;case"option":i.value!=null&&e.setAttribute("value",""+Le(i.value));break;case"select":e.multiple=!!i.multiple,h=i.value,h!=null?re(e,!!i.multiple,h,!1):i.defaultValue!=null&&re(e,!!i.multiple,i.defaultValue,!0);break;default:typeof f.onClick=="function"&&(e.onclick=xi)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return mt(t),null;case 6:if(e&&t.stateNode!=null)dm(e,t,e.memoizedProps,i);else{if(typeof i!="string"&&t.stateNode===null)throw Error(o(166));if(n=jn(co.current),jn(sr.current),ji(t)){if(i=t.stateNode,n=t.memoizedProps,i[ir]=t,(h=i.nodeValue!==n)&&(e=zt,e!==null))switch(e.tag){case 3:vi(i.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&vi(i.nodeValue,n,(e.mode&1)!==0)}h&&(t.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ir]=t,t.stateNode=i}return mt(t),null;case 13:if(He(Ve),i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ge&&Mt!==null&&t.mode&1&&!(t.flags&128))mp(),ra(),t.flags|=98560,h=!1;else if(h=ji(t),i!==null&&i.dehydrated!==null){if(e===null){if(!h)throw Error(o(318));if(h=t.memoizedState,h=h!==null?h.dehydrated:null,!h)throw Error(o(317));h[ir]=t}else ra(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;mt(t),h=!1}else Vt!==null&&(fc(Vt),Vt=null),h=!0;if(!h)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(i=i!==null,i!==(e!==null&&e.memoizedState!==null)&&i&&(t.child.flags|=8192,t.mode&1&&(e===null||Ve.current&1?nt===0&&(nt=3):hc())),t.updateQueue!==null&&(t.flags|=4),mt(t),null);case 4:return ia(),rc(e,t),e===null&&ro(t.stateNode.containerInfo),mt(t),null;case 10:return zl(t.type._context),mt(t),null;case 17:return Nt(t.type)&&yi(),mt(t),null;case 19:if(He(Ve),h=t.memoizedState,h===null)return mt(t),null;if(i=(t.flags&128)!==0,b=h.rendering,b===null)if(i)ho(h,!1);else{if(nt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(b=Mi(e),b!==null){for(t.flags|=128,ho(h,!1),i=b.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),t.subtreeFlags=0,i=n,n=t.child;n!==null;)h=n,e=i,h.flags&=14680066,b=h.alternate,b===null?(h.childLanes=0,h.lanes=e,h.child=null,h.subtreeFlags=0,h.memoizedProps=null,h.memoizedState=null,h.updateQueue=null,h.dependencies=null,h.stateNode=null):(h.childLanes=b.childLanes,h.lanes=b.lanes,h.child=b.child,h.subtreeFlags=0,h.deletions=null,h.memoizedProps=b.memoizedProps,h.memoizedState=b.memoizedState,h.updateQueue=b.updateQueue,h.type=b.type,e=b.dependencies,h.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ze(Ve,Ve.current&1|2),t.child}e=e.sibling}h.tail!==null&&ze()>ua&&(t.flags|=128,i=!0,ho(h,!1),t.lanes=4194304)}else{if(!i)if(e=Mi(b),e!==null){if(t.flags|=128,i=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),ho(h,!0),h.tail===null&&h.tailMode==="hidden"&&!b.alternate&&!Ge)return mt(t),null}else 2*ze()-h.renderingStartTime>ua&&n!==1073741824&&(t.flags|=128,i=!0,ho(h,!1),t.lanes=4194304);h.isBackwards?(b.sibling=t.child,t.child=b):(n=h.last,n!==null?n.sibling=b:t.child=b,h.last=b)}return h.tail!==null?(t=h.tail,h.rendering=t,h.tail=t.sibling,h.renderingStartTime=ze(),t.sibling=null,n=Ve.current,Ze(Ve,i?n&1|2:n&1),t):(mt(t),null);case 22:case 23:return mc(),i=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==i&&(t.flags|=8192),i&&t.mode&1?Ot&1073741824&&(mt(t),t.subtreeFlags&6&&(t.flags|=8192)):mt(t),null;case 24:return null;case 25:return null}throw Error(o(156,t.tag))}function Pv(e,t){switch(Sl(t),t.tag){case 1:return Nt(t.type)&&yi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ia(),He(kt),He(ft),Il(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Rl(t),null;case 13:if(He(Ve),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(o(340));ra()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return He(Ve),null;case 4:return ia(),null;case 10:return zl(t.type._context),null;case 22:case 23:return mc(),null;case 24:return null;default:return null}}var Di=!1,ht=!1,Lv=typeof WeakSet=="function"?WeakSet:Set,he=null;function la(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Xe(e,t,i)}else n.current=null}function fm(e,t,n){try{n()}catch(i){Xe(e,t,i)}}var pm=!1;function Rv(e,t){if(hl=ii,e=qf(),sl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var f=i.anchorOffset,h=i.focusNode;i=i.focusOffset;try{n.nodeType,h.nodeType}catch{n=null;break e}var b=0,_=-1,O=-1,B=0,ne=0,ie=e,ee=null;t:for(;;){for(var me;ie!==n||f!==0&&ie.nodeType!==3||(_=b+f),ie!==h||i!==0&&ie.nodeType!==3||(O=b+i),ie.nodeType===3&&(b+=ie.nodeValue.length),(me=ie.firstChild)!==null;)ee=ie,ie=me;for(;;){if(ie===e)break t;if(ee===n&&++B===f&&(_=b),ee===h&&++ne===i&&(O=b),(me=ie.nextSibling)!==null)break;ie=ee,ee=ie.parentNode}ie=me}n=_===-1||O===-1?null:{start:_,end:O}}else n=null}n=n||{start:0,end:0}}else n=null;for(gl={focusedElem:e,selectionRange:n},ii=!1,he=t;he!==null;)if(t=he,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,he=e;else for(;he!==null;){t=he;try{var ge=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(ge!==null){var ve=ge.memoizedProps,Je=ge.memoizedState,T=t.stateNode,P=T.getSnapshotBeforeUpdate(t.elementType===t.type?ve:Qt(t.type,ve),Je);T.__reactInternalSnapshotBeforeUpdate=P}break;case 3:var D=t.stateNode.containerInfo;D.nodeType===1?D.textContent="":D.nodeType===9&&D.documentElement&&D.removeChild(D.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(o(163))}}catch(de){Xe(t,t.return,de)}if(e=t.sibling,e!==null){e.return=t.return,he=e;break}he=t.return}return ge=pm,pm=!1,ge}function go(e,t,n){var i=t.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var f=i=i.next;do{if((f.tag&e)===e){var h=f.destroy;f.destroy=void 0,h!==void 0&&fm(t,n,h)}f=f.next}while(f!==i)}}function Ui(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var i=n.create;n.destroy=i()}n=n.next}while(n!==t)}}function nc(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function mm(e){var t=e.alternate;t!==null&&(e.alternate=null,mm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ir],delete t[ao],delete t[yl],delete t[vv],delete t[xv])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function hm(e){return e.tag===5||e.tag===3||e.tag===4}function gm(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||hm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ac(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=xi));else if(i!==4&&(e=e.child,e!==null))for(ac(e,t,n),e=e.sibling;e!==null;)ac(e,t,n),e=e.sibling}function oc(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(e=e.child,e!==null))for(oc(e,t,n),e=e.sibling;e!==null;)oc(e,t,n),e=e.sibling}var lt=null,Xt=!1;function Xr(e,t,n){for(n=n.child;n!==null;)vm(e,t,n),n=n.sibling}function vm(e,t,n){if(or&&typeof or.onCommitFiberUnmount=="function")try{or.onCommitFiberUnmount(ei,n)}catch{}switch(n.tag){case 5:ht||la(n,t);case 6:var i=lt,f=Xt;lt=null,Xr(e,t,n),lt=i,Xt=f,lt!==null&&(Xt?(e=lt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):lt.removeChild(n.stateNode));break;case 18:lt!==null&&(Xt?(e=lt,n=n.stateNode,e.nodeType===8?bl(e.parentNode,n):e.nodeType===1&&bl(e,n),Ga(e)):bl(lt,n.stateNode));break;case 4:i=lt,f=Xt,lt=n.stateNode.containerInfo,Xt=!0,Xr(e,t,n),lt=i,Xt=f;break;case 0:case 11:case 14:case 15:if(!ht&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){f=i=i.next;do{var h=f,b=h.destroy;h=h.tag,b!==void 0&&(h&2||h&4)&&fm(n,t,b),f=f.next}while(f!==i)}Xr(e,t,n);break;case 1:if(!ht&&(la(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(_){Xe(n,t,_)}Xr(e,t,n);break;case 21:Xr(e,t,n);break;case 22:n.mode&1?(ht=(i=ht)||n.memoizedState!==null,Xr(e,t,n),ht=i):Xr(e,t,n);break;default:Xr(e,t,n)}}function xm(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Lv),t.forEach(function(i){var f=qv.bind(null,e,i);n.has(i)||(n.add(i),i.then(f,f))})}}function Jt(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var f=n[i];try{var h=e,b=t,_=b;e:for(;_!==null;){switch(_.tag){case 5:lt=_.stateNode,Xt=!1;break e;case 3:lt=_.stateNode.containerInfo,Xt=!0;break e;case 4:lt=_.stateNode.containerInfo,Xt=!0;break e}_=_.return}if(lt===null)throw Error(o(160));vm(h,b,f),lt=null,Xt=!1;var O=f.alternate;O!==null&&(O.return=null),f.return=null}catch(B){Xe(f,t,B)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)bm(t,e),t=t.sibling}function bm(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Jt(t,e),cr(e),i&4){try{go(3,e,e.return),Ui(3,e)}catch(ve){Xe(e,e.return,ve)}try{go(5,e,e.return)}catch(ve){Xe(e,e.return,ve)}}break;case 1:Jt(t,e),cr(e),i&512&&n!==null&&la(n,n.return);break;case 5:if(Jt(t,e),cr(e),i&512&&n!==null&&la(n,n.return),e.flags&32){var f=e.stateNode;try{dt(f,"")}catch(ve){Xe(e,e.return,ve)}}if(i&4&&(f=e.stateNode,f!=null)){var h=e.memoizedProps,b=n!==null?n.memoizedProps:h,_=e.type,O=e.updateQueue;if(e.updateQueue=null,O!==null)try{_==="input"&&h.type==="radio"&&h.name!=null&&hr(f,h),La(_,b);var B=La(_,h);for(b=0;b<O.length;b+=2){var ne=O[b],ie=O[b+1];ne==="style"?gr(f,ie):ne==="dangerouslySetInnerHTML"?It(f,ie):ne==="children"?dt(f,ie):C(f,ne,ie,B)}switch(_){case"input":mn(f,h);break;case"textarea":Ne(f,h);break;case"select":var ee=f._wrapperState.wasMultiple;f._wrapperState.wasMultiple=!!h.multiple;var me=h.value;me!=null?re(f,!!h.multiple,me,!1):ee!==!!h.multiple&&(h.defaultValue!=null?re(f,!!h.multiple,h.defaultValue,!0):re(f,!!h.multiple,h.multiple?[]:"",!1))}f[ao]=h}catch(ve){Xe(e,e.return,ve)}}break;case 6:if(Jt(t,e),cr(e),i&4){if(e.stateNode===null)throw Error(o(162));f=e.stateNode,h=e.memoizedProps;try{f.nodeValue=h}catch(ve){Xe(e,e.return,ve)}}break;case 3:if(Jt(t,e),cr(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ga(t.containerInfo)}catch(ve){Xe(e,e.return,ve)}break;case 4:Jt(t,e),cr(e);break;case 13:Jt(t,e),cr(e),f=e.child,f.flags&8192&&(h=f.memoizedState!==null,f.stateNode.isHidden=h,!h||f.alternate!==null&&f.alternate.memoizedState!==null||(lc=ze())),i&4&&xm(e);break;case 22:if(ne=n!==null&&n.memoizedState!==null,e.mode&1?(ht=(B=ht)||ne,Jt(t,e),ht=B):Jt(t,e),cr(e),i&8192){if(B=e.memoizedState!==null,(e.stateNode.isHidden=B)&&!ne&&e.mode&1)for(he=e,ne=e.child;ne!==null;){for(ie=he=ne;he!==null;){switch(ee=he,me=ee.child,ee.tag){case 0:case 11:case 14:case 15:go(4,ee,ee.return);break;case 1:la(ee,ee.return);var ge=ee.stateNode;if(typeof ge.componentWillUnmount=="function"){i=ee,n=ee.return;try{t=i,ge.props=t.memoizedProps,ge.state=t.memoizedState,ge.componentWillUnmount()}catch(ve){Xe(i,n,ve)}}break;case 5:la(ee,ee.return);break;case 22:if(ee.memoizedState!==null){km(ie);continue}}me!==null?(me.return=ee,he=me):km(ie)}ne=ne.sibling}e:for(ne=null,ie=e;;){if(ie.tag===5){if(ne===null){ne=ie;try{f=ie.stateNode,B?(h=f.style,typeof h.setProperty=="function"?h.setProperty("display","none","important"):h.display="none"):(_=ie.stateNode,O=ie.memoizedProps.style,b=O!=null&&O.hasOwnProperty("display")?O.display:null,_.style.display=nr("display",b))}catch(ve){Xe(e,e.return,ve)}}}else if(ie.tag===6){if(ne===null)try{ie.stateNode.nodeValue=B?"":ie.memoizedProps}catch(ve){Xe(e,e.return,ve)}}else if((ie.tag!==22&&ie.tag!==23||ie.memoizedState===null||ie===e)&&ie.child!==null){ie.child.return=ie,ie=ie.child;continue}if(ie===e)break e;for(;ie.sibling===null;){if(ie.return===null||ie.return===e)break e;ne===ie&&(ne=null),ie=ie.return}ne===ie&&(ne=null),ie.sibling.return=ie.return,ie=ie.sibling}}break;case 19:Jt(t,e),cr(e),i&4&&xm(e);break;case 21:break;default:Jt(t,e),cr(e)}}function cr(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(hm(n)){var i=n;break e}n=n.return}throw Error(o(160))}switch(i.tag){case 5:var f=i.stateNode;i.flags&32&&(dt(f,""),i.flags&=-33);var h=gm(e);oc(e,h,f);break;case 3:case 4:var b=i.stateNode.containerInfo,_=gm(e);ac(e,_,b);break;default:throw Error(o(161))}}catch(O){Xe(e,e.return,O)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function $v(e,t,n){he=e,ym(e)}function ym(e,t,n){for(var i=(e.mode&1)!==0;he!==null;){var f=he,h=f.child;if(f.tag===22&&i){var b=f.memoizedState!==null||Di;if(!b){var _=f.alternate,O=_!==null&&_.memoizedState!==null||ht;_=Di;var B=ht;if(Di=b,(ht=O)&&!B)for(he=f;he!==null;)b=he,O=b.child,b.tag===22&&b.memoizedState!==null?Nm(f):O!==null?(O.return=b,he=O):Nm(f);for(;h!==null;)he=h,ym(h),h=h.sibling;he=f,Di=_,ht=B}wm(e)}else f.subtreeFlags&8772&&h!==null?(h.return=f,he=h):wm(e)}}function wm(e){for(;he!==null;){var t=he;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ht||Ui(5,t);break;case 1:var i=t.stateNode;if(t.flags&4&&!ht)if(n===null)i.componentDidMount();else{var f=t.elementType===t.type?n.memoizedProps:Qt(t.type,n.memoizedProps);i.componentDidUpdate(f,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var h=t.updateQueue;h!==null&&wp(t,h,i);break;case 3:var b=t.updateQueue;if(b!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}wp(t,b,n)}break;case 5:var _=t.stateNode;if(n===null&&t.flags&4){n=_;var O=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":O.autoFocus&&n.focus();break;case"img":O.src&&(n.src=O.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var B=t.alternate;if(B!==null){var ne=B.memoizedState;if(ne!==null){var ie=ne.dehydrated;ie!==null&&Ga(ie)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(o(163))}ht||t.flags&512&&nc(t)}catch(ee){Xe(t,t.return,ee)}}if(t===e){he=null;break}if(n=t.sibling,n!==null){n.return=t.return,he=n;break}he=t.return}}function km(e){for(;he!==null;){var t=he;if(t===e){he=null;break}var n=t.sibling;if(n!==null){n.return=t.return,he=n;break}he=t.return}}function Nm(e){for(;he!==null;){var t=he;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ui(4,t)}catch(O){Xe(t,n,O)}break;case 1:var i=t.stateNode;if(typeof i.componentDidMount=="function"){var f=t.return;try{i.componentDidMount()}catch(O){Xe(t,f,O)}}var h=t.return;try{nc(t)}catch(O){Xe(t,h,O)}break;case 5:var b=t.return;try{nc(t)}catch(O){Xe(t,b,O)}}}catch(O){Xe(t,t.return,O)}if(t===e){he=null;break}var _=t.sibling;if(_!==null){_.return=t.return,he=_;break}he=t.return}}var Iv=Math.ceil,Bi=$.ReactCurrentDispatcher,ic=$.ReactCurrentOwner,Zt=$.ReactCurrentBatchConfig,Te=0,ot=null,tt=null,ct=0,Ot=0,ca=Gr(0),nt=0,vo=null,_n=0,Zi=0,sc=0,xo=null,jt=null,lc=0,ua=1/0,Er=null,qi=!1,cc=null,Jr=null,Hi=!1,en=null,Wi=0,bo=0,uc=null,Gi=-1,Ki=0;function bt(){return Te&6?ze():Gi!==-1?Gi:Gi=ze()}function tn(e){return e.mode&1?Te&2&&ct!==0?ct&-ct:yv.transition!==null?(Ki===0&&(Ki=hf()),Ki):(e=De,e!==0||(e=window.event,e=e===void 0?16:Sf(e.type)),e):1}function er(e,t,n,i){if(50<bo)throw bo=0,uc=null,Error(o(185));Ba(e,n,i),(!(Te&2)||e!==ot)&&(e===ot&&(!(Te&2)&&(Zi|=n),nt===4&&rn(e,ct)),Et(e,i),n===1&&Te===0&&!(t.mode&1)&&(ua=ze()+500,ki&&Yr()))}function Et(e,t){var n=e.callbackNode;y2(e,t);var i=ni(e,e===ot?ct:0);if(i===0)n!==null&&se(n),e.callbackNode=null,e.callbackPriority=0;else if(t=i&-i,e.callbackPriority!==t){if(n!=null&&se(n),t===1)e.tag===0?bv(jm.bind(null,e)):cp(jm.bind(null,e)),hv(function(){!(Te&6)&&Yr()}),n=null;else{switch(gf(i)){case 1:n=Gt;break;case 4:n=ar;break;case 16:n=Zn;break;case 536870912:n=bn;break;default:n=Zn}n=Pm(n,Sm.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Sm(e,t){if(Gi=-1,Ki=0,Te&6)throw Error(o(327));var n=e.callbackNode;if(da()&&e.callbackNode!==n)return null;var i=ni(e,e===ot?ct:0);if(i===0)return null;if(i&30||i&e.expiredLanes||t)t=Yi(e,i);else{t=i;var f=Te;Te|=2;var h=_m();(ot!==e||ct!==t)&&(Er=null,ua=ze()+500,Cn(e,t));do try{Dv();break}catch(_){Em(e,_)}while(!0);Cl(),Bi.current=h,Te=f,tt!==null?t=0:(ot=null,ct=0,t=nt)}if(t!==0){if(t===2&&(f=Hs(e),f!==0&&(i=f,t=dc(e,f))),t===1)throw n=vo,Cn(e,0),rn(e,i),Et(e,ze()),n;if(t===6)rn(e,i);else{if(f=e.current.alternate,!(i&30)&&!Tv(f)&&(t=Yi(e,i),t===2&&(h=Hs(e),h!==0&&(i=h,t=dc(e,h))),t===1))throw n=vo,Cn(e,0),rn(e,i),Et(e,ze()),n;switch(e.finishedWork=f,e.finishedLanes=i,t){case 0:case 1:throw Error(o(345));case 2:zn(e,jt,Er);break;case 3:if(rn(e,i),(i&130023424)===i&&(t=lc+500-ze(),10<t)){if(ni(e,0)!==0)break;if(f=e.suspendedLanes,(f&i)!==i){bt(),e.pingedLanes|=e.suspendedLanes&f;break}e.timeoutHandle=xl(zn.bind(null,e,jt,Er),t);break}zn(e,jt,Er);break;case 4:if(rn(e,i),(i&4194240)===i)break;for(t=e.eventTimes,f=-1;0<i;){var b=31-Kt(i);h=1<<b,b=t[b],b>f&&(f=b),i&=~h}if(i=f,i=ze()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Iv(i/1960))-i,10<i){e.timeoutHandle=xl(zn.bind(null,e,jt,Er),i);break}zn(e,jt,Er);break;case 5:zn(e,jt,Er);break;default:throw Error(o(329))}}}return Et(e,ze()),e.callbackNode===n?Sm.bind(null,e):null}function dc(e,t){var n=xo;return e.current.memoizedState.isDehydrated&&(Cn(e,t).flags|=256),e=Yi(e,t),e!==2&&(t=jt,jt=n,t!==null&&fc(t)),e}function fc(e){jt===null?jt=e:jt.push.apply(jt,e)}function Tv(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var f=n[i],h=f.getSnapshot;f=f.value;try{if(!Yt(h(),f))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function rn(e,t){for(t&=~sc,t&=~Zi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Kt(t),i=1<<n;e[n]=-1,t&=~i}}function jm(e){if(Te&6)throw Error(o(327));da();var t=ni(e,0);if(!(t&1))return Et(e,ze()),null;var n=Yi(e,t);if(e.tag!==0&&n===2){var i=Hs(e);i!==0&&(t=i,n=dc(e,i))}if(n===1)throw n=vo,Cn(e,0),rn(e,t),Et(e,ze()),n;if(n===6)throw Error(o(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,zn(e,jt,Er),Et(e,ze()),null}function pc(e,t){var n=Te;Te|=1;try{return e(t)}finally{Te=n,Te===0&&(ua=ze()+500,ki&&Yr())}}function An(e){en!==null&&en.tag===0&&!(Te&6)&&da();var t=Te;Te|=1;var n=Zt.transition,i=De;try{if(Zt.transition=null,De=1,e)return e()}finally{De=i,Zt.transition=n,Te=t,!(Te&6)&&Yr()}}function mc(){Ot=ca.current,He(ca)}function Cn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,mv(n)),tt!==null)for(n=tt.return;n!==null;){var i=n;switch(Sl(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&yi();break;case 3:ia(),He(kt),He(ft),Il();break;case 5:Rl(i);break;case 4:ia();break;case 13:He(Ve);break;case 19:He(Ve);break;case 10:zl(i.type._context);break;case 22:case 23:mc()}n=n.return}if(ot=e,tt=e=nn(e.current,null),ct=Ot=t,nt=0,vo=null,sc=Zi=_n=0,jt=xo=null,Sn!==null){for(t=0;t<Sn.length;t++)if(n=Sn[t],i=n.interleaved,i!==null){n.interleaved=null;var f=i.next,h=n.pending;if(h!==null){var b=h.next;h.next=f,i.next=b}n.pending=i}Sn=null}return e}function Em(e,t){do{var n=tt;try{if(Cl(),Oi.current=$i,Pi){for(var i=Qe.memoizedState;i!==null;){var f=i.queue;f!==null&&(f.pending=null),i=i.next}Pi=!1}if(En=0,at=rt=Qe=null,uo=!1,fo=0,ic.current=null,n===null||n.return===null){nt=1,vo=t,tt=null;break}e:{var h=e,b=n.return,_=n,O=t;if(t=ct,_.flags|=32768,O!==null&&typeof O=="object"&&typeof O.then=="function"){var B=O,ne=_,ie=ne.tag;if(!(ne.mode&1)&&(ie===0||ie===11||ie===15)){var ee=ne.alternate;ee?(ne.updateQueue=ee.updateQueue,ne.memoizedState=ee.memoizedState,ne.lanes=ee.lanes):(ne.updateQueue=null,ne.memoizedState=null)}var me=Vp(b);if(me!==null){me.flags&=-257,Qp(me,b,_,h,t),me.mode&1&&Yp(h,B,t),t=me,O=B;var ge=t.updateQueue;if(ge===null){var ve=new Set;ve.add(O),t.updateQueue=ve}else ge.add(O);break e}else{if(!(t&1)){Yp(h,B,t),hc();break e}O=Error(o(426))}}else if(Ge&&_.mode&1){var Je=Vp(b);if(Je!==null){!(Je.flags&65536)&&(Je.flags|=256),Qp(Je,b,_,h,t),_l(sa(O,_));break e}}h=O=sa(O,_),nt!==4&&(nt=2),xo===null?xo=[h]:xo.push(h),h=b;do{switch(h.tag){case 3:h.flags|=65536,t&=-t,h.lanes|=t;var T=Gp(h,O,t);yp(h,T);break e;case 1:_=O;var P=h.type,D=h.stateNode;if(!(h.flags&128)&&(typeof P.getDerivedStateFromError=="function"||D!==null&&typeof D.componentDidCatch=="function"&&(Jr===null||!Jr.has(D)))){h.flags|=65536,t&=-t,h.lanes|=t;var de=Kp(h,_,t);yp(h,de);break e}}h=h.return}while(h!==null)}Cm(n)}catch(xe){t=xe,tt===n&&n!==null&&(tt=n=n.return);continue}break}while(!0)}function _m(){var e=Bi.current;return Bi.current=$i,e===null?$i:e}function hc(){(nt===0||nt===3||nt===2)&&(nt=4),ot===null||!(_n&268435455)&&!(Zi&268435455)||rn(ot,ct)}function Yi(e,t){var n=Te;Te|=2;var i=_m();(ot!==e||ct!==t)&&(Er=null,Cn(e,t));do try{Fv();break}catch(f){Em(e,f)}while(!0);if(Cl(),Te=n,Bi.current=i,tt!==null)throw Error(o(261));return ot=null,ct=0,nt}function Fv(){for(;tt!==null;)Am(tt)}function Dv(){for(;tt!==null&&!Zs();)Am(tt)}function Am(e){var t=Om(e.alternate,e,Ot);e.memoizedProps=e.pendingProps,t===null?Cm(e):tt=t,ic.current=null}function Cm(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Pv(n,t),n!==null){n.flags&=32767,tt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{nt=6,tt=null;return}}else if(n=Ov(n,t,Ot),n!==null){tt=n;return}if(t=t.sibling,t!==null){tt=t;return}tt=t=e}while(t!==null);nt===0&&(nt=5)}function zn(e,t,n){var i=De,f=Zt.transition;try{Zt.transition=null,De=1,Uv(e,t,n,i)}finally{Zt.transition=f,De=i}return null}function Uv(e,t,n,i){do da();while(en!==null);if(Te&6)throw Error(o(327));n=e.finishedWork;var f=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(o(177));e.callbackNode=null,e.callbackPriority=0;var h=n.lanes|n.childLanes;if(w2(e,h),e===ot&&(tt=ot=null,ct=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Hi||(Hi=!0,Pm(Zn,function(){return da(),null})),h=(n.flags&15990)!==0,n.subtreeFlags&15990||h){h=Zt.transition,Zt.transition=null;var b=De;De=1;var _=Te;Te|=4,ic.current=null,Rv(e,n),bm(n,e),sv(gl),ii=!!hl,gl=hl=null,e.current=n,$v(n),qs(),Te=_,De=b,Zt.transition=h}else e.current=n;if(Hi&&(Hi=!1,en=e,Wi=f),h=e.pendingLanes,h===0&&(Jr=null),h2(n.stateNode),Et(e,ze()),t!==null)for(i=e.onRecoverableError,n=0;n<t.length;n++)f=t[n],i(f.value,{componentStack:f.stack,digest:f.digest});if(qi)throw qi=!1,e=cc,cc=null,e;return Wi&1&&e.tag!==0&&da(),h=e.pendingLanes,h&1?e===uc?bo++:(bo=0,uc=e):bo=0,Yr(),null}function da(){if(en!==null){var e=gf(Wi),t=Zt.transition,n=De;try{if(Zt.transition=null,De=16>e?16:e,en===null)var i=!1;else{if(e=en,en=null,Wi=0,Te&6)throw Error(o(331));var f=Te;for(Te|=4,he=e.current;he!==null;){var h=he,b=h.child;if(he.flags&16){var _=h.deletions;if(_!==null){for(var O=0;O<_.length;O++){var B=_[O];for(he=B;he!==null;){var ne=he;switch(ne.tag){case 0:case 11:case 15:go(8,ne,h)}var ie=ne.child;if(ie!==null)ie.return=ne,he=ie;else for(;he!==null;){ne=he;var ee=ne.sibling,me=ne.return;if(mm(ne),ne===B){he=null;break}if(ee!==null){ee.return=me,he=ee;break}he=me}}}var ge=h.alternate;if(ge!==null){var ve=ge.child;if(ve!==null){ge.child=null;do{var Je=ve.sibling;ve.sibling=null,ve=Je}while(ve!==null)}}he=h}}if(h.subtreeFlags&2064&&b!==null)b.return=h,he=b;else e:for(;he!==null;){if(h=he,h.flags&2048)switch(h.tag){case 0:case 11:case 15:go(9,h,h.return)}var T=h.sibling;if(T!==null){T.return=h.return,he=T;break e}he=h.return}}var P=e.current;for(he=P;he!==null;){b=he;var D=b.child;if(b.subtreeFlags&2064&&D!==null)D.return=b,he=D;else e:for(b=P;he!==null;){if(_=he,_.flags&2048)try{switch(_.tag){case 0:case 11:case 15:Ui(9,_)}}catch(xe){Xe(_,_.return,xe)}if(_===b){he=null;break e}var de=_.sibling;if(de!==null){de.return=_.return,he=de;break e}he=_.return}}if(Te=f,Yr(),or&&typeof or.onPostCommitFiberRoot=="function")try{or.onPostCommitFiberRoot(ei,e)}catch{}i=!0}return i}finally{De=n,Zt.transition=t}}return!1}function zm(e,t,n){t=sa(n,t),t=Gp(e,t,1),e=Qr(e,t,1),t=bt(),e!==null&&(Ba(e,1,t),Et(e,t))}function Xe(e,t,n){if(e.tag===3)zm(e,e,n);else for(;t!==null;){if(t.tag===3){zm(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Jr===null||!Jr.has(i))){e=sa(n,e),e=Kp(t,e,1),t=Qr(t,e,1),e=bt(),t!==null&&(Ba(t,1,e),Et(t,e));break}}t=t.return}}function Bv(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),t=bt(),e.pingedLanes|=e.suspendedLanes&n,ot===e&&(ct&n)===n&&(nt===4||nt===3&&(ct&130023424)===ct&&500>ze()-lc?Cn(e,0):sc|=n),Et(e,t)}function Mm(e,t){t===0&&(e.mode&1?(t=ri,ri<<=1,!(ri&130023424)&&(ri=4194304)):t=1);var n=bt();e=Nr(e,t),e!==null&&(Ba(e,t,n),Et(e,n))}function Zv(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Mm(e,n)}function qv(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,f=e.memoizedState;f!==null&&(n=f.retryLane);break;case 19:i=e.stateNode;break;default:throw Error(o(314))}i!==null&&i.delete(t),Mm(e,n)}var Om;Om=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||kt.current)St=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return St=!1,Mv(e,t,n);St=!!(e.flags&131072)}else St=!1,Ge&&t.flags&1048576&&up(t,Si,t.index);switch(t.lanes=0,t.tag){case 2:var i=t.type;Fi(e,t),e=t.pendingProps;var f=Jn(t,ft.current);oa(t,n),f=Dl(null,t,i,e,f,n);var h=Ul();return t.flags|=1,typeof f=="object"&&f!==null&&typeof f.render=="function"&&f.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Nt(i)?(h=!0,wi(t)):h=!1,t.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,Pl(t),f.updater=Ii,t.stateNode=f,f._reactInternals=t,Gl(t,i,e,n),t=Ql(null,t,i,!0,h,n)):(t.tag=0,Ge&&h&&Nl(t),xt(null,t,f,n),t=t.child),t;case 16:i=t.elementType;e:{switch(Fi(e,t),e=t.pendingProps,f=i._init,i=f(i._payload),t.type=i,f=t.tag=Wv(i),e=Qt(i,e),f){case 0:t=Vl(null,t,i,e,n);break e;case 1:t=nm(null,t,i,e,n);break e;case 11:t=Xp(null,t,i,e,n);break e;case 14:t=Jp(null,t,i,Qt(i.type,e),n);break e}throw Error(o(306,i,""))}return t;case 0:return i=t.type,f=t.pendingProps,f=t.elementType===i?f:Qt(i,f),Vl(e,t,i,f,n);case 1:return i=t.type,f=t.pendingProps,f=t.elementType===i?f:Qt(i,f),nm(e,t,i,f,n);case 3:e:{if(am(t),e===null)throw Error(o(387));i=t.pendingProps,h=t.memoizedState,f=h.element,bp(e,t),zi(t,i,null,n);var b=t.memoizedState;if(i=b.element,h.isDehydrated)if(h={element:i,isDehydrated:!1,cache:b.cache,pendingSuspenseBoundaries:b.pendingSuspenseBoundaries,transitions:b.transitions},t.updateQueue.baseState=h,t.memoizedState=h,t.flags&256){f=sa(Error(o(423)),t),t=om(e,t,i,n,f);break e}else if(i!==f){f=sa(Error(o(424)),t),t=om(e,t,i,n,f);break e}else for(Mt=Wr(t.stateNode.containerInfo.firstChild),zt=t,Ge=!0,Vt=null,n=vp(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ra(),i===f){t=jr(e,t,n);break e}xt(e,t,i,n)}t=t.child}return t;case 5:return kp(t),e===null&&El(t),i=t.type,f=t.pendingProps,h=e!==null?e.memoizedProps:null,b=f.children,vl(i,f)?b=null:h!==null&&vl(i,h)&&(t.flags|=32),rm(e,t),xt(e,t,b,n),t.child;case 6:return e===null&&El(t),null;case 13:return im(e,t,n);case 4:return Ll(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=na(t,null,i,n):xt(e,t,i,n),t.child;case 11:return i=t.type,f=t.pendingProps,f=t.elementType===i?f:Qt(i,f),Xp(e,t,i,f,n);case 7:return xt(e,t,t.pendingProps,n),t.child;case 8:return xt(e,t,t.pendingProps.children,n),t.child;case 12:return xt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(i=t.type._context,f=t.pendingProps,h=t.memoizedProps,b=f.value,Ze(_i,i._currentValue),i._currentValue=b,h!==null)if(Yt(h.value,b)){if(h.children===f.children&&!kt.current){t=jr(e,t,n);break e}}else for(h=t.child,h!==null&&(h.return=t);h!==null;){var _=h.dependencies;if(_!==null){b=h.child;for(var O=_.firstContext;O!==null;){if(O.context===i){if(h.tag===1){O=Sr(-1,n&-n),O.tag=2;var B=h.updateQueue;if(B!==null){B=B.shared;var ne=B.pending;ne===null?O.next=O:(O.next=ne.next,ne.next=O),B.pending=O}}h.lanes|=n,O=h.alternate,O!==null&&(O.lanes|=n),Ml(h.return,n,t),_.lanes|=n;break}O=O.next}}else if(h.tag===10)b=h.type===t.type?null:h.child;else if(h.tag===18){if(b=h.return,b===null)throw Error(o(341));b.lanes|=n,_=b.alternate,_!==null&&(_.lanes|=n),Ml(b,n,t),b=h.sibling}else b=h.child;if(b!==null)b.return=h;else for(b=h;b!==null;){if(b===t){b=null;break}if(h=b.sibling,h!==null){h.return=b.return,b=h;break}b=b.return}h=b}xt(e,t,f.children,n),t=t.child}return t;case 9:return f=t.type,i=t.pendingProps.children,oa(t,n),f=Ut(f),i=i(f),t.flags|=1,xt(e,t,i,n),t.child;case 14:return i=t.type,f=Qt(i,t.pendingProps),f=Qt(i.type,f),Jp(e,t,i,f,n);case 15:return em(e,t,t.type,t.pendingProps,n);case 17:return i=t.type,f=t.pendingProps,f=t.elementType===i?f:Qt(i,f),Fi(e,t),t.tag=1,Nt(i)?(e=!0,wi(t)):e=!1,oa(t,n),Hp(t,i,f),Gl(t,i,f,n),Ql(null,t,i,!0,e,n);case 19:return lm(e,t,n);case 22:return tm(e,t,n)}throw Error(o(156,t.tag))};function Pm(e,t){return xr(e,t)}function Hv(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function qt(e,t,n,i){return new Hv(e,t,n,i)}function gc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Wv(e){if(typeof e=="function")return gc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===pe)return 11;if(e===G)return 14}return 2}function nn(e,t){var n=e.alternate;return n===null?(n=qt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Vi(e,t,n,i,f,h){var b=2;if(i=e,typeof e=="function")gc(e)&&(b=1);else if(typeof e=="string")b=5;else e:switch(e){case Z:return Mn(n.children,f,h,t);case H:b=8,f|=8;break;case Y:return e=qt(12,n,t,f|2),e.elementType=Y,e.lanes=h,e;case J:return e=qt(13,n,t,f),e.elementType=J,e.lanes=h,e;case fe:return e=qt(19,n,t,f),e.elementType=fe,e.lanes=h,e;case W:return Qi(n,f,h,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case R:b=10;break e;case te:b=9;break e;case pe:b=11;break e;case G:b=14;break e;case ae:b=16,i=null;break e}throw Error(o(130,e==null?e:typeof e,""))}return t=qt(b,n,t,f),t.elementType=e,t.type=i,t.lanes=h,t}function Mn(e,t,n,i){return e=qt(7,e,i,t),e.lanes=n,e}function Qi(e,t,n,i){return e=qt(22,e,i,t),e.elementType=W,e.lanes=n,e.stateNode={isHidden:!1},e}function vc(e,t,n){return e=qt(6,e,null,t),e.lanes=n,e}function xc(e,t,n){return t=qt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Gv(e,t,n,i,f){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ws(0),this.expirationTimes=Ws(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ws(0),this.identifierPrefix=i,this.onRecoverableError=f,this.mutableSourceEagerHydrationData=null}function bc(e,t,n,i,f,h,b,_,O){return e=new Gv(e,t,n,_,O),t===1?(t=1,h===!0&&(t|=8)):t=0,h=qt(3,null,null,t),e.current=h,h.stateNode=e,h.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Pl(h),e}function Kv(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:q,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}function Lm(e){if(!e)return Kr;e=e._reactInternals;e:{if(vr(e)!==e||e.tag!==1)throw Error(o(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Nt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(o(171))}if(e.tag===1){var n=e.type;if(Nt(n))return sp(e,n,t)}return t}function Rm(e,t,n,i,f,h,b,_,O){return e=bc(n,i,!0,e,f,h,b,_,O),e.context=Lm(null),n=e.current,i=bt(),f=tn(n),h=Sr(i,f),h.callback=t??null,Qr(n,h,f),e.current.lanes=f,Ba(e,f,i),Et(e,i),e}function Xi(e,t,n,i){var f=t.current,h=bt(),b=tn(f);return n=Lm(n),t.context===null?t.context=n:t.pendingContext=n,t=Sr(h,b),t.payload={element:e},i=i===void 0?null:i,i!==null&&(t.callback=i),e=Qr(f,t,b),e!==null&&(er(e,f,b,h),Ci(e,f,b)),b}function Ji(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function $m(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function yc(e,t){$m(e,t),(e=e.alternate)&&$m(e,t)}function Yv(){return null}var Im=typeof reportError=="function"?reportError:function(e){console.error(e)};function wc(e){this._internalRoot=e}es.prototype.render=wc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(o(409));Xi(e,t,null,null)},es.prototype.unmount=wc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;An(function(){Xi(null,e,null,null)}),t[br]=null}};function es(e){this._internalRoot=e}es.prototype.unstable_scheduleHydration=function(e){if(e){var t=bf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Zr.length&&t!==0&&t<Zr[n].priority;n++);Zr.splice(n,0,e),n===0&&kf(e)}};function kc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ts(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Tm(){}function Vv(e,t,n,i,f){if(f){if(typeof i=="function"){var h=i;i=function(){var B=Ji(b);h.call(B)}}var b=Rm(t,i,e,0,null,!1,!1,"",Tm);return e._reactRootContainer=b,e[br]=b.current,ro(e.nodeType===8?e.parentNode:e),An(),b}for(;f=e.lastChild;)e.removeChild(f);if(typeof i=="function"){var _=i;i=function(){var B=Ji(O);_.call(B)}}var O=bc(e,0,!1,null,null,!1,!1,"",Tm);return e._reactRootContainer=O,e[br]=O.current,ro(e.nodeType===8?e.parentNode:e),An(function(){Xi(t,O,n,i)}),O}function rs(e,t,n,i,f){var h=n._reactRootContainer;if(h){var b=h;if(typeof f=="function"){var _=f;f=function(){var O=Ji(b);_.call(O)}}Xi(t,b,e,f)}else b=Vv(n,t,e,f,i);return Ji(b)}vf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ua(t.pendingLanes);n!==0&&(Gs(t,n|1),Et(t,ze()),!(Te&6)&&(ua=ze()+500,Yr()))}break;case 13:An(function(){var i=Nr(e,1);if(i!==null){var f=bt();er(i,e,1,f)}}),yc(e,1)}},Ks=function(e){if(e.tag===13){var t=Nr(e,134217728);if(t!==null){var n=bt();er(t,e,134217728,n)}yc(e,134217728)}},xf=function(e){if(e.tag===13){var t=tn(e),n=Nr(e,t);if(n!==null){var i=bt();er(n,e,t,i)}yc(e,t)}},bf=function(){return De},yf=function(e,t){var n=De;try{return De=e,t()}finally{De=n}},Ia=function(e,t,n){switch(t){case"input":if(mn(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var f=bi(i);if(!f)throw Error(o(90));In(i),mn(i,f)}}}break;case"textarea":Ne(e,n);break;case"select":t=n.value,t!=null&&re(e,!!n.multiple,t,!1)}},Ko=pc,Yo=An;var Qv={usingClientEntryPoint:!1,Events:[oo,Qn,bi,Wo,Go,pc]},yo={findFiberByHostInstance:yn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Xv={bundleType:yo.bundleType,version:yo.version,rendererPackageName:yo.rendererPackageName,rendererConfig:yo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:$.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Jo(e),e===null?null:e.stateNode},findFiberByHostInstance:yo.findFiberByHostInstance||Yv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ns=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ns.isDisabled&&ns.supportsFiber)try{ei=ns.inject(Xv),or=ns}catch{}}return _t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Qv,_t.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!kc(t))throw Error(o(200));return Kv(e,t,null,n)},_t.createRoot=function(e,t){if(!kc(e))throw Error(o(299));var n=!1,i="",f=Im;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(f=t.onRecoverableError)),t=bc(e,1,!1,null,null,n,!1,i,f),e[br]=t.current,ro(e.nodeType===8?e.parentNode:e),new wc(t)},_t.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(o(188)):(e=Object.keys(e).join(","),Error(o(268,e)));return e=Jo(t),e=e===null?null:e.stateNode,e},_t.flushSync=function(e){return An(e)},_t.hydrate=function(e,t,n){if(!ts(t))throw Error(o(200));return rs(null,e,t,!0,n)},_t.hydrateRoot=function(e,t,n){if(!kc(e))throw Error(o(405));var i=n!=null&&n.hydratedSources||null,f=!1,h="",b=Im;if(n!=null&&(n.unstable_strictMode===!0&&(f=!0),n.identifierPrefix!==void 0&&(h=n.identifierPrefix),n.onRecoverableError!==void 0&&(b=n.onRecoverableError)),t=Rm(t,null,e,1,n??null,f,!1,h,b),e[br]=t.current,ro(e),i)for(e=0;e<i.length;e++)n=i[e],f=n._getVersion,f=f(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,f]:t.mutableSourceEagerHydrationData.push(n,f);return new es(t)},_t.render=function(e,t,n){if(!ts(t))throw Error(o(200));return rs(null,e,t,!1,n)},_t.unmountComponentAtNode=function(e){if(!ts(e))throw Error(o(40));return e._reactRootContainer?(An(function(){rs(null,null,e,!1,function(){e._reactRootContainer=null,e[br]=null})}),!0):!1},_t.unstable_batchedUpdates=pc,_t.unstable_renderSubtreeIntoContainer=function(e,t,n,i){if(!ts(n))throw Error(o(200));if(e==null||e._reactInternals===void 0)throw Error(o(38));return rs(e,t,n,!1,i)},_t.version="18.3.1-next-f1338f8080-20240426",_t}var Vm;function ix(){if(Vm)return Nc.exports;Vm=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(a){console.error(a)}}return r(),Nc.exports=ox(),Nc.exports}var Qm;function sx(){if(Qm)return as;Qm=1;var r=ix();return as.createRoot=r.createRoot,as.hydrateRoot=r.hydrateRoot,as}var lx=sx(),ko={},Xm;function cx(){if(Xm)return ko;Xm=1,Object.defineProperty(ko,"__esModule",{value:!0}),ko.parse=d,ko.serialize=v;const r=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,a=/^[\u0021-\u003A\u003C-\u007E]*$/,o=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,c=/^[\u0020-\u003A\u003D-\u007E]*$/,l=Object.prototype.toString,u=(()=>{const y=function(){};return y.prototype=Object.create(null),y})();function d(y,E){const A=new u,N=y.length;if(N<2)return A;const w=(E==null?void 0:E.decode)||x;let S=0;do{const k=y.indexOf("=",S);if(k===-1)break;const C=y.indexOf(";",S),$=C===-1?N:C;if(k>$){S=y.lastIndexOf(";",k-1)+1;continue}const I=p(y,S,k),q=m(y,k,I),Z=y.slice(I,q);if(A[Z]===void 0){let H=p(y,k+1,$),Y=m(y,$,H);const R=w(y.slice(H,Y));A[Z]=R}S=$+1}while(S<N);return A}function p(y,E,A){do{const N=y.charCodeAt(E);if(N!==32&&N!==9)return E}while(++E<A);return A}function m(y,E,A){for(;E>A;){const N=y.charCodeAt(--E);if(N!==32&&N!==9)return E+1}return A}function v(y,E,A){const N=(A==null?void 0:A.encode)||encodeURIComponent;if(!r.test(y))throw new TypeError(`argument name is invalid: ${y}`);const w=N(E);if(!a.test(w))throw new TypeError(`argument val is invalid: ${E}`);let S=y+"="+w;if(!A)return S;if(A.maxAge!==void 0){if(!Number.isInteger(A.maxAge))throw new TypeError(`option maxAge is invalid: ${A.maxAge}`);S+="; Max-Age="+A.maxAge}if(A.domain){if(!o.test(A.domain))throw new TypeError(`option domain is invalid: ${A.domain}`);S+="; Domain="+A.domain}if(A.path){if(!c.test(A.path))throw new TypeError(`option path is invalid: ${A.path}`);S+="; Path="+A.path}if(A.expires){if(!g(A.expires)||!Number.isFinite(A.expires.valueOf()))throw new TypeError(`option expires is invalid: ${A.expires}`);S+="; Expires="+A.expires.toUTCString()}if(A.httpOnly&&(S+="; HttpOnly"),A.secure&&(S+="; Secure"),A.partitioned&&(S+="; Partitioned"),A.priority)switch(typeof A.priority=="string"?A.priority.toLowerCase():void 0){case"low":S+="; Priority=Low";break;case"medium":S+="; Priority=Medium";break;case"high":S+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${A.priority}`)}if(A.sameSite)switch(typeof A.sameSite=="string"?A.sameSite.toLowerCase():A.sameSite){case!0:case"strict":S+="; SameSite=Strict";break;case"lax":S+="; SameSite=Lax";break;case"none":S+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${A.sameSite}`)}return S}function x(y){if(y.indexOf("%")===-1)return y;try{return decodeURIComponent(y)}catch{return y}}function g(y){return l.call(y)==="[object Date]"}return ko}cx();/**
* react-router v7.0.2
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/var Jm="popstate";function ux(r={}){function a(c,l){let{pathname:u,search:d,hash:p}=c.location;return kd("",{pathname:u,search:d,hash:p},l.state&&l.state.usr||null,l.state&&l.state.key||"default")}function o(c,l){return typeof l=="string"?l:zo(l)}return fx(a,o,null,r)}function Ke(r,a){if(r===!1||r===null||typeof r>"u")throw new Error(a)}function tr(r,a){if(!r){typeof console<"u"&&console.warn(a);try{throw new Error(a)}catch{}}}function dx(){return Math.random().toString(36).substring(2,10)}function e0(r,a){return{usr:r.state,key:r.key,idx:a}}function kd(r,a,o=null,c){return{pathname:typeof r=="string"?r:r.pathname,search:"",hash:"",...typeof a=="string"?za(a):a,state:o,key:a&&a.key||c||dx()}}function zo({pathname:r="/",search:a="",hash:o=""}){return a&&a!=="?"&&(r+=a.charAt(0)==="?"?a:"?"+a),o&&o!=="#"&&(r+=o.charAt(0)==="#"?o:"#"+o),r}function za(r){let a={};if(r){let o=r.indexOf("#");o>=0&&(a.hash=r.substring(o),r=r.substring(0,o));let c=r.indexOf("?");c>=0&&(a.search=r.substring(c),r=r.substring(0,c)),r&&(a.pathname=r)}return a}function fx(r,a,o,c={}){let{window:l=document.defaultView,v5Compat:u=!1}=c,d=l.history,p="POP",m=null,v=x();v==null&&(v=0,d.replaceState({...d.state,idx:v},""));function x(){return(d.state||{idx:null}).idx}function g(){p="POP";let w=x(),S=w==null?null:w-v;v=w,m&&m({action:p,location:N.location,delta:S})}function y(w,S){p="PUSH";let k=kd(N.location,w,S);v=x()+1;let C=e0(k,v),$=N.createHref(k);try{d.pushState(C,"",$)}catch(I){if(I instanceof DOMException&&I.name==="DataCloneError")throw I;l.location.assign($)}u&&m&&m({action:p,location:N.location,delta:1})}function E(w,S){p="REPLACE";let k=kd(N.location,w,S);v=x();let C=e0(k,v),$=N.createHref(k);d.replaceState(C,"",$),u&&m&&m({action:p,location:N.location,delta:0})}function A(w){let S=l.location.origin!=="null"?l.location.origin:l.location.href,k=typeof w=="string"?w:zo(w);return k=k.replace(/ $/,"%20"),Ke(S,`No window.location.(origin|href) available to create URL for href: ${k}`),new URL(k,S)}let N={get action(){return p},get location(){return r(l,d)},listen(w){if(m)throw new Error("A history only accepts one active listener");return l.addEventListener(Jm,g),m=w,()=>{l.removeEventListener(Jm,g),m=null}},createHref(w){return a(l,w)},createURL:A,encodeLocation(w){let S=A(w);return{pathname:S.pathname,search:S.search,hash:S.hash}},push:y,replace:E,go(w){return d.go(w)}};return N}function Zh(r,a,o="/"){return px(r,a,o,!1)}function px(r,a,o,c){let l=typeof a=="string"?za(a):a,u=ln(l.pathname||"/",o);if(u==null)return null;let d=qh(r);mx(d);let p=null;for(let m=0;p==null&&m<d.length;++m){let v=jx(u);p=Nx(d[m],v,c)}return p}function qh(r,a=[],o=[],c=""){let l=(u,d,p)=>{let m={relativePath:p===void 0?u.path||"":p,caseSensitive:u.caseSensitive===!0,childrenIndex:d,route:u};m.relativePath.startsWith("/")&&(Ke(m.relativePath.startsWith(c),`Absolute route path "${m.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),m.relativePath=m.relativePath.slice(c.length));let v=Cr([c,m.relativePath]),x=o.concat(m);u.children&&u.children.length>0&&(Ke(u.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${v}".`),qh(u.children,a,x,v)),!(u.path==null&&!u.index)&&a.push({path:v,score:wx(v,u.index),routesMeta:x})};return r.forEach((u,d)=>{var p;if(u.path===""||!((p=u.path)!=null&&p.includes("?")))l(u,d);else for(let m of Hh(u.path))l(u,d,m)}),a}function Hh(r){let a=r.split("/");if(a.length===0)return[];let[o,...c]=a,l=o.endsWith("?"),u=o.replace(/\?$/,"");if(c.length===0)return l?[u,""]:[u];let d=Hh(c.join("/")),p=[];return p.push(...d.map(m=>m===""?u:[u,m].join("/"))),l&&p.push(...d),p.map(m=>r.startsWith("/")&&m===""?"/":m)}function mx(r){r.sort((a,o)=>a.score!==o.score?o.score-a.score:kx(a.routesMeta.map(c=>c.childrenIndex),o.routesMeta.map(c=>c.childrenIndex)))}var hx=/^:[\w-]+$/,gx=3,vx=2,xx=1,bx=10,yx=-2,t0=r=>r==="*";function wx(r,a){let o=r.split("/"),c=o.length;return o.some(t0)&&(c+=yx),a&&(c+=vx),o.filter(l=>!t0(l)).reduce((l,u)=>l+(hx.test(u)?gx:u===""?xx:bx),c)}function kx(r,a){return r.length===a.length&&r.slice(0,-1).every((o,c)=>o===a[c])?r[r.length-1]-a[a.length-1]:0}function Nx(r,a,o=!1){let{routesMeta:c}=r,l={},u="/",d=[];for(let p=0;p<c.length;++p){let m=c[p],v=p===c.length-1,x=u==="/"?a:a.slice(u.length)||"/",g=xs({path:m.relativePath,caseSensitive:m.caseSensitive,end:v},x),y=m.route;if(!g&&v&&o&&!c[c.length-1].route.index&&(g=xs({path:m.relativePath,caseSensitive:m.caseSensitive,end:!1},x)),!g)return null;Object.assign(l,g.params),d.push({params:l,pathname:Cr([u,g.pathname]),pathnameBase:Cx(Cr([u,g.pathnameBase])),route:y}),g.pathnameBase!=="/"&&(u=Cr([u,g.pathnameBase]))}return d}function xs(r,a){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[o,c]=Sx(r.path,r.caseSensitive,r.end),l=a.match(o);if(!l)return null;let u=l[0],d=u.replace(/(.)\/+$/,"$1"),p=l.slice(1);return{params:c.reduce((m,{paramName:v,isOptional:x},g)=>{if(v==="*"){let E=p[g]||"";d=u.slice(0,u.length-E.length).replace(/(.)\/+$/,"$1")}const y=p[g];return x&&!y?m[v]=void 0:m[v]=(y||"").replace(/%2F/g,"/"),m},{}),pathname:u,pathnameBase:d,pattern:r}}function Sx(r,a=!1,o=!0){tr(r==="*"||!r.endsWith("*")||r.endsWith("/*"),`Route path "${r}" will be treated as if it were "${r.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${r.replace(/\*$/,"/*")}".`);let c=[],l="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,d,p)=>(c.push({paramName:d,isOptional:p!=null}),p?"/?([^\\/]+)?":"/([^\\/]+)"));return r.endsWith("*")?(c.push({paramName:"*"}),l+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):o?l+="\\/*$":r!==""&&r!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,a?void 0:"i"),c]}function jx(r){try{return r.split("/").map(a=>decodeURIComponent(a).replace(/\//g,"%2F")).join("/")}catch(a){return tr(!1,`The URL path "${r}" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`),r}}function ln(r,a){if(a==="/")return r;if(!r.toLowerCase().startsWith(a.toLowerCase()))return null;let o=a.endsWith("/")?a.length-1:a.length,c=r.charAt(o);return c&&c!=="/"?null:r.slice(o)||"/"}function Ex(r,a="/"){let{pathname:o,search:c="",hash:l=""}=typeof r=="string"?za(r):r;return{pathname:o?o.startsWith("/")?o:_x(o,a):a,search:zx(c),hash:Mx(l)}}function _x(r,a){let o=a.replace(/\/+$/,"").split("/");return r.split("/").forEach(c=>{c===".."?o.length>1&&o.pop():c!=="."&&o.push(c)}),o.length>1?o.join("/"):"/"}function Sc(r,a,o,c){return`Cannot include a '${r}' character in a manually specified \`to.${a}\` field [${JSON.stringify(c)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ax(r){return r.filter((a,o)=>o===0||a.route.path&&a.route.path.length>0)}function Gd(r){let a=Ax(r);return a.map((o,c)=>c===a.length-1?o.pathname:o.pathnameBase)}function Kd(r,a,o,c=!1){let l;typeof r=="string"?l=za(r):(l={...r},Ke(!l.pathname||!l.pathname.includes("?"),Sc("?","pathname","search",l)),Ke(!l.pathname||!l.pathname.includes("#"),Sc("#","pathname","hash",l)),Ke(!l.search||!l.search.includes("#"),Sc("#","search","hash",l)));let u=r===""||l.pathname==="",d=u?"/":l.pathname,p;if(d==null)p=o;else{let g=a.length-1;if(!c&&d.startsWith("..")){let y=d.split("/");for(;y[0]==="..";)y.shift(),g-=1;l.pathname=y.join("/")}p=g>=0?a[g]:"/"}let m=Ex(l,p),v=d&&d!=="/"&&d.endsWith("/"),x=(u||d===".")&&o.endsWith("/");return!m.pathname.endsWith("/")&&(v||x)&&(m.pathname+="/"),m}var Cr=r=>r.join("/").replace(/\/\/+/g,"/"),Cx=r=>r.replace(/\/+$/,"").replace(/^\/*/,"/"),zx=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,Mx=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r;function Ox(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}var Wh=["POST","PUT","PATCH","DELETE"];new Set(Wh);var Px=["GET",...Wh];new Set(Px);var Ma=z.createContext(null);Ma.displayName="DataRouter";var As=z.createContext(null);As.displayName="DataRouterState";var Gh=z.createContext({isTransitioning:!1});Gh.displayName="ViewTransition";var Lx=z.createContext(new Map);Lx.displayName="Fetchers";var Rx=z.createContext(null);Rx.displayName="Await";var rr=z.createContext(null);rr.displayName="Navigation";var Fo=z.createContext(null);Fo.displayName="Location";var mr=z.createContext({outlet:null,matches:[],isDataRoute:!1});mr.displayName="Route";var Yd=z.createContext(null);Yd.displayName="RouteError";function $x(r,{relative:a}={}){Ke(Oa(),"useHref() may be used only in the context of a <Router> component.");let{basename:o,navigator:c}=z.useContext(rr),{hash:l,pathname:u,search:d}=Do(r,{relative:a}),p=u;return o!=="/"&&(p=u==="/"?o:Cr([o,u])),c.createHref({pathname:p,search:d,hash:l})}function Oa(){return z.useContext(Fo)!=null}function At(){return Ke(Oa(),"useLocation() may be used only in the context of a <Router> component."),z.useContext(Fo).location}var Kh="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Yh(r){z.useContext(rr).static||z.useLayoutEffect(r)}function Lr(){let{isDataRoute:r}=z.useContext(mr);return r?Yx():Ix()}function Ix(){Ke(Oa(),"useNavigate() may be used only in the context of a <Router> component.");let r=z.useContext(Ma),{basename:a,navigator:o}=z.useContext(rr),{matches:c}=z.useContext(mr),{pathname:l}=At(),u=JSON.stringify(Gd(c)),d=z.useRef(!1);return Yh(()=>{d.current=!0}),z.useCallback((p,m={})=>{if(tr(d.current,Kh),!d.current)return;if(typeof p=="number"){o.go(p);return}let v=Kd(p,JSON.parse(u),l,m.relative==="path");r==null&&a!=="/"&&(v.pathname=v.pathname==="/"?a:Cr([a,v.pathname])),(m.replace?o.replace:o.push)(v,m.state,m)},[a,o,u,l,r])}z.createContext(null);function Do(r,{relative:a}={}){let{matches:o}=z.useContext(mr),{pathname:c}=At(),l=JSON.stringify(Gd(o));return z.useMemo(()=>Kd(r,JSON.parse(l),c,a==="path"),[r,l,c,a])}function Tx(r,a){return Vh(r,a)}function Vh(r,a,o,c){var l;Ke(Oa(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:u}=z.useContext(rr),{matches:d}=z.useContext(mr),p=d[d.length-1],m=p?p.params:{},v=p?p.pathname:"/",x=p?p.pathnameBase:"/",g=p&&p.route;{let k=g&&g.path||"";Qh(v,!g||k.endsWith("*")||k.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${v}" (under <Route path="${k}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${k}"> to <Route path="${k==="/"?"*":`${k}/*`}">.`)}let y=At(),E;if(a){let k=typeof a=="string"?za(a):a;Ke(x==="/"||((l=k.pathname)==null?void 0:l.startsWith(x)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${x}" but pathname "${k.pathname}" was given in the \`location\` prop.`),E=k}else E=y;let A=E.pathname||"/",N=A;if(x!=="/"){let k=x.replace(/^\//,"").split("/");N="/"+A.replace(/^\//,"").split("/").slice(k.length).join("/")}let w=Zh(r,{pathname:N});tr(g||w!=null,`No routes matched location "${E.pathname}${E.search}${E.hash}" `),tr(w==null||w[w.length-1].route.element!==void 0||w[w.length-1].route.Component!==void 0||w[w.length-1].route.lazy!==void 0,`Matched leaf route at location "${E.pathname}${E.search}${E.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let S=Zx(w&&w.map(k=>Object.assign({},k,{params:Object.assign({},m,k.params),pathname:Cr([x,u.encodeLocation?u.encodeLocation(k.pathname).pathname:k.pathname]),pathnameBase:k.pathnameBase==="/"?x:Cr([x,u.encodeLocation?u.encodeLocation(k.pathnameBase).pathname:k.pathnameBase])})),d,o,c);return a&&S?z.createElement(Fo.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...E},navigationType:"POP"}},S):S}function Fx(){let r=Kx(),a=Ox(r)?`${r.status} ${r.statusText}`:r instanceof Error?r.message:JSON.stringify(r),o=r instanceof Error?r.stack:null,c="rgba(200,200,200, 0.5)",l={padding:"0.5rem",backgroundColor:c},u={padding:"2px 4px",backgroundColor:c},d=null;return console.error("Error handled by React Router default ErrorBoundary:",r),d=z.createElement(z.Fragment,null,z.createElement("p",null,"💿 Hey developer 👋"),z.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",z.createElement("code",{style:u},"ErrorBoundary")," or"," ",z.createElement("code",{style:u},"errorElement")," prop on your route.")),z.createElement(z.Fragment,null,z.createElement("h2",null,"Unexpected Application Error!"),z.createElement("h3",{style:{fontStyle:"italic"}},a),o?z.createElement("pre",{style:l},o):null,d)}var Dx=z.createElement(Fx,null),Ux=class extends z.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,a){return a.location!==r.location||a.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:a.error,location:a.location,revalidation:r.revalidation||a.revalidation}}componentDidCatch(r,a){console.error("React Router caught the following error during render",r,a)}render(){return this.state.error!==void 0?z.createElement(mr.Provider,{value:this.props.routeContext},z.createElement(Yd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Bx({routeContext:r,match:a,children:o}){let c=z.useContext(Ma);return c&&c.static&&c.staticContext&&(a.route.errorElement||a.route.ErrorBoundary)&&(c.staticContext._deepestRenderedBoundaryId=a.route.id),z.createElement(mr.Provider,{value:r},o)}function Zx(r,a=[],o=null,c=null){if(r==null){if(!o)return null;if(o.errors)r=o.matches;else if(a.length===0&&!o.initialized&&o.matches.length>0)r=o.matches;else return null}let l=r,u=o==null?void 0:o.errors;if(u!=null){let m=l.findIndex(v=>v.route.id&&(u==null?void 0:u[v.route.id])!==void 0);Ke(m>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`),l=l.slice(0,Math.min(l.length,m+1))}let d=!1,p=-1;if(o)for(let m=0;m<l.length;m++){let v=l[m];if((v.route.HydrateFallback||v.route.hydrateFallbackElement)&&(p=m),v.route.id){let{loaderData:x,errors:g}=o,y=v.route.loader&&!x.hasOwnProperty(v.route.id)&&(!g||g[v.route.id]===void 0);if(v.route.lazy||y){d=!0,p>=0?l=l.slice(0,p+1):l=[l[0]];break}}}return l.reduceRight((m,v,x)=>{let g,y=!1,E=null,A=null;o&&(g=u&&v.route.id?u[v.route.id]:void 0,E=v.route.errorElement||Dx,d&&(p<0&&x===0?(Qh("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),y=!0,A=null):p===x&&(y=!0,A=v.route.hydrateFallbackElement||null)));let N=a.concat(l.slice(0,x+1)),w=()=>{let S;return g?S=E:y?S=A:v.route.Component?S=z.createElement(v.route.Component,null):v.route.element?S=v.route.element:S=m,z.createElement(Bx,{match:v,routeContext:{outlet:m,matches:N,isDataRoute:o!=null},children:S})};return o&&(v.route.ErrorBoundary||v.route.errorElement||x===0)?z.createElement(Ux,{location:o.location,revalidation:o.revalidation,component:E,error:g,children:w(),routeContext:{outlet:null,matches:N,isDataRoute:!0}}):w()},null)}function Vd(r){return`${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function qx(r){let a=z.useContext(Ma);return Ke(a,Vd(r)),a}function Hx(r){let a=z.useContext(As);return Ke(a,Vd(r)),a}function Wx(r){let a=z.useContext(mr);return Ke(a,Vd(r)),a}function Qd(r){let a=Wx(r),o=a.matches[a.matches.length-1];return Ke(o.route.id,`${r} can only be used on routes that contain a unique "id"`),o.route.id}function Gx(){return Qd("useRouteId")}function Kx(){var r;let a=z.useContext(Yd),o=Hx("useRouteError"),c=Qd("useRouteError");return a!==void 0?a:(r=o.errors)==null?void 0:r[c]}function Yx(){let{router:r}=qx("useNavigate"),a=Qd("useNavigate"),o=z.useRef(!1);return Yh(()=>{o.current=!0}),z.useCallback(async(c,l={})=>{tr(o.current,Kh),o.current&&(typeof c=="number"?r.navigate(c):await r.navigate(c,{fromRouteId:a,...l}))},[r,a])}var r0={};function Qh(r,a,o){!a&&!r0[r]&&(r0[r]=!0,tr(!1,o))}z.memo(Vx);function Vx({routes:r,future:a,state:o}){return Vh(r,void 0,o,a)}function _r({to:r,replace:a,state:o,relative:c}){Ke(Oa(),"<Navigate> may be used only in the context of a <Router> component.");let{static:l}=z.useContext(rr);tr(!l,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:u}=z.useContext(mr),{pathname:d}=At(),p=Lr(),m=Kd(r,Gd(u),d,c==="path"),v=JSON.stringify(m);return z.useEffect(()=>{p(JSON.parse(v),{replace:a,state:o,relative:c})},[p,v,c,a,o]),null}function gt(r){Ke(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Qx({basename:r="/",children:a=null,location:o,navigationType:c="POP",navigator:l,static:u=!1}){Ke(!Oa(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let d=r.replace(/^\/*/,"/"),p=z.useMemo(()=>({basename:d,navigator:l,static:u,future:{}}),[d,l,u]);typeof o=="string"&&(o=za(o));let{pathname:m="/",search:v="",hash:x="",state:g=null,key:y="default"}=o,E=z.useMemo(()=>{let A=ln(m,d);return A==null?null:{location:{pathname:A,search:v,hash:x,state:g,key:y},navigationType:c}},[d,m,v,x,g,y,c]);return tr(E!=null,`<Router basename="${d}"> is not able to match the URL "${m}${v}${x}" because it does not start with the basename, so the <Router> won't render anything.`),E==null?null:z.createElement(rr.Provider,{value:p},z.createElement(Fo.Provider,{children:a,value:E}))}function Xh({children:r,location:a}){return Tx(Nd(r),a)}function Nd(r,a=[]){let o=[];return z.Children.forEach(r,(c,l)=>{if(!z.isValidElement(c))return;let u=[...a,l];if(c.type===z.Fragment){o.push.apply(o,Nd(c.props.children,u));return}Ke(c.type===gt,`[${typeof c.type=="string"?c.type:c.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Ke(!c.props.index||!c.props.children,"An index route cannot have child routes.");let d={id:c.props.id||u.join("-"),caseSensitive:c.props.caseSensitive,element:c.props.element,Component:c.props.Component,index:c.props.index,path:c.props.path,loader:c.props.loader,action:c.props.action,hydrateFallbackElement:c.props.hydrateFallbackElement,HydrateFallback:c.props.HydrateFallback,errorElement:c.props.errorElement,ErrorBoundary:c.props.ErrorBoundary,hasErrorBoundary:c.props.hasErrorBoundary===!0||c.props.ErrorBoundary!=null||c.props.errorElement!=null,shouldRevalidate:c.props.shouldRevalidate,handle:c.props.handle,lazy:c.props.lazy};c.props.children&&(d.children=Nd(c.props.children,u)),o.push(d)}),o}var fs="get",ps="application/x-www-form-urlencoded";function Cs(r){return r!=null&&typeof r.tagName=="string"}function Xx(r){return Cs(r)&&r.tagName.toLowerCase()==="button"}function Jx(r){return Cs(r)&&r.tagName.toLowerCase()==="form"}function eb(r){return Cs(r)&&r.tagName.toLowerCase()==="input"}function tb(r){return!!(r.metaKey||r.altKey||r.ctrlKey||r.shiftKey)}function rb(r,a){return r.button===0&&(!a||a==="_self")&&!tb(r)}var os=null;function nb(){if(os===null)try{new FormData(document.createElement("form"),0),os=!1}catch{os=!0}return os}var ab=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function jc(r){return r!=null&&!ab.has(r)?(tr(!1,`"${r}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ps}"`),null):r}function ob(r,a){let o,c,l,u,d;if(Jx(r)){let p=r.getAttribute("action");c=p?ln(p,a):null,o=r.getAttribute("method")||fs,l=jc(r.getAttribute("enctype"))||ps,u=new FormData(r)}else if(Xx(r)||eb(r)&&(r.type==="submit"||r.type==="image")){let p=r.form;if(p==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let m=r.getAttribute("formaction")||p.getAttribute("action");if(c=m?ln(m,a):null,o=r.getAttribute("formmethod")||p.getAttribute("method")||fs,l=jc(r.getAttribute("formenctype"))||jc(p.getAttribute("enctype"))||ps,u=new FormData(p,r),!nb()){let{name:v,type:x,value:g}=r;if(x==="image"){let y=v?`${v}.`:"";u.append(`${y}x`,"0"),u.append(`${y}y`,"0")}else v&&u.append(v,g)}}else{if(Cs(r))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');o=fs,c=null,l=ps,d=r}return u&&l==="text/plain"&&(d=u,u=void 0),{action:c,method:o.toLowerCase(),encType:l,formData:u,body:d}}function Xd(r,a){if(r===!1||r===null||typeof r>"u")throw new Error(a)}async function ib(r,a){if(r.id in a)return a[r.id];try{let o=await import(r.module);return a[r.id]=o,o}catch(o){return console.error(`Error loading route module \`${r.module}\`, reloading page...`),console.error(o),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function sb(r){return r==null?!1:r.href==null?r.rel==="preload"&&typeof r.imageSrcSet=="string"&&typeof r.imageSizes=="string":typeof r.rel=="string"&&typeof r.href=="string"}async function lb(r,a,o){let c=await Promise.all(r.map(async l=>{let u=a.routes[l.route.id];if(u){let d=await ib(u,o);return d.links?d.links():[]}return[]}));return fb(c.flat(1).filter(sb).filter(l=>l.rel==="stylesheet"||l.rel==="preload").map(l=>l.rel==="stylesheet"?{...l,rel:"prefetch",as:"style"}:{...l,rel:"prefetch"}))}function n0(r,a,o,c,l,u){let d=(m,v)=>o[v]?m.route.id!==o[v].route.id:!0,p=(m,v)=>{var x;return o[v].pathname!==m.pathname||((x=o[v].route.path)==null?void 0:x.endsWith("*"))&&o[v].params["*"]!==m.params["*"]};return u==="assets"?a.filter((m,v)=>d(m,v)||p(m,v)):u==="data"?a.filter((m,v)=>{var x;let g=c.routes[m.route.id];if(!g||!g.hasLoader)return!1;if(d(m,v)||p(m,v))return!0;if(m.route.shouldRevalidate){let y=m.route.shouldRevalidate({currentUrl:new URL(l.pathname+l.search+l.hash,window.origin),currentParams:((x=o[0])==null?void 0:x.params)||{},nextUrl:new URL(r,window.origin),nextParams:m.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function cb(r,a){return ub(r.map(o=>{let c=a.routes[o.route.id];if(!c)return[];let l=[c.module];return c.imports&&(l=l.concat(c.imports)),l}).flat(1))}function ub(r){return[...new Set(r)]}function db(r){let a={},o=Object.keys(r).sort();for(let c of o)a[c]=r[c];return a}function fb(r,a){let o=new Set;return new Set(a),r.reduce((c,l)=>{let u=JSON.stringify(db(l));return o.has(u)||(o.add(u),c.push({key:u,link:l})),c},[])}function pb(r){let a=typeof r=="string"?new URL(r,typeof window>"u"?"server://singlefetch/":window.location.origin):r;return a.pathname==="/"?a.pathname="_root.data":a.pathname=`${a.pathname.replace(/\/$/,"")}.data`,a}function mb(){let r=z.useContext(Ma);return Xd(r,"You must render this element inside a <DataRouterContext.Provider> element"),r}function hb(){let r=z.useContext(As);return Xd(r,"You must render this element inside a <DataRouterStateContext.Provider> element"),r}var Jd=z.createContext(void 0);Jd.displayName="FrameworkContext";function Jh(){let r=z.useContext(Jd);return Xd(r,"You must render this element inside a <HydratedRouter> element"),r}function gb(r,a){let o=z.useContext(Jd),[c,l]=z.useState(!1),[u,d]=z.useState(!1),{onFocus:p,onBlur:m,onMouseEnter:v,onMouseLeave:x,onTouchStart:g}=a,y=z.useRef(null);z.useEffect(()=>{if(r==="render"&&d(!0),r==="viewport"){let N=S=>{S.forEach(k=>{d(k.isIntersecting)})},w=new IntersectionObserver(N,{threshold:.5});return y.current&&w.observe(y.current),()=>{w.disconnect()}}},[r]),z.useEffect(()=>{if(c){let N=setTimeout(()=>{d(!0)},100);return()=>{clearTimeout(N)}}},[c]);let E=()=>{l(!0)},A=()=>{l(!1),d(!1)};return o?r!=="intent"?[u,y,{}]:[u,y,{onFocus:No(p,E),onBlur:No(m,A),onMouseEnter:No(v,E),onMouseLeave:No(x,A),onTouchStart:No(g,E)}]:[!1,y,{}]}function No(r,a){return o=>{r&&r(o),o.defaultPrevented||a(o)}}function vb({page:r,...a}){let{router:o}=mb(),c=z.useMemo(()=>Zh(o.routes,r,o.basename),[o.routes,r,o.basename]);return c?z.createElement(bb,{page:r,matches:c,...a}):(console.warn(`Tried to prefetch ${r} but no routes matched.`),null)}function xb(r){let{manifest:a,routeModules:o}=Jh(),[c,l]=z.useState([]);return z.useEffect(()=>{let u=!1;return lb(r,a,o).then(d=>{u||l(d)}),()=>{u=!0}},[r,a,o]),c}function bb({page:r,matches:a,...o}){let c=At(),{manifest:l,routeModules:u}=Jh(),{loaderData:d,matches:p}=hb(),m=z.useMemo(()=>n0(r,a,p,l,c,"data"),[r,a,p,l,c]),v=z.useMemo(()=>n0(r,a,p,l,c,"assets"),[r,a,p,l,c]),x=z.useMemo(()=>{if(r===c.pathname+c.search+c.hash)return[];let E=new Set,A=!1;if(a.forEach(w=>{var S;let k=l.routes[w.route.id];!k||!k.hasLoader||(!m.some(C=>C.route.id===w.route.id)&&w.route.id in d&&(S=u[w.route.id])!=null&&S.shouldRevalidate||k.hasClientLoader?A=!0:E.add(w.route.id))}),E.size===0)return[];let N=pb(r);return A&&E.size>0&&N.searchParams.set("_routes",a.filter(w=>E.has(w.route.id)).map(w=>w.route.id).join(",")),[N.pathname+N.search]},[d,c,l,m,a,r,u]),g=z.useMemo(()=>cb(v,l),[v,l]),y=xb(v);return z.createElement(z.Fragment,null,x.map(E=>z.createElement("link",{key:E,rel:"prefetch",as:"fetch",href:E,...o})),g.map(E=>z.createElement("link",{key:E,rel:"modulepreload",href:E,...o})),y.map(({key:E,link:A})=>z.createElement("link",{key:E,...A})))}function yb(...r){return a=>{r.forEach(o=>{typeof o=="function"?o(a):o!=null&&(o.current=a)})}}var eg=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{eg&&(window.__reactRouterVersion="7.0.2")}catch{}function wb({basename:r,children:a,window:o}){let c=z.useRef();c.current==null&&(c.current=ux({window:o,v5Compat:!0}));let l=c.current,[u,d]=z.useState({action:l.action,location:l.location}),p=z.useCallback(m=>{z.startTransition(()=>d(m))},[d]);return z.useLayoutEffect(()=>l.listen(p),[l,p]),z.createElement(Qx,{basename:r,children:a,location:u.location,navigationType:u.action,navigator:l})}var tg=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,zr=z.forwardRef(function({onClick:r,discover:a="render",prefetch:o="none",relative:c,reloadDocument:l,replace:u,state:d,target:p,to:m,preventScrollReset:v,viewTransition:x,...g},y){let{basename:E}=z.useContext(rr),A=typeof m=="string"&&tg.test(m),N,w=!1;if(typeof m=="string"&&A&&(N=m,eg))try{let H=new URL(window.location.href),Y=m.startsWith("//")?new URL(H.protocol+m):new URL(m),R=ln(Y.pathname,E);Y.origin===H.origin&&R!=null?m=R+Y.search+Y.hash:w=!0}catch{tr(!1,`<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let S=$x(m,{relative:c}),[k,C,$]=gb(o,g),I=Sb(m,{replace:u,state:d,target:p,preventScrollReset:v,relative:c,viewTransition:x});function q(H){r&&r(H),H.defaultPrevented||I(H)}let Z=z.createElement("a",{...g,...$,href:N||S,onClick:w||l?r:q,ref:yb(y,C),target:p,"data-discover":!A&&a==="render"?"true":void 0});return k&&!A?z.createElement(z.Fragment,null,Z,z.createElement(vb,{page:S})):Z});zr.displayName="Link";var Ar=z.forwardRef(function({"aria-current":r="page",caseSensitive:a=!1,className:o="",end:c=!1,style:l,to:u,viewTransition:d,children:p,...m},v){let x=Do(u,{relative:m.relative}),g=At(),y=z.useContext(As),{navigator:E,basename:A}=z.useContext(rr),N=y!=null&&Cb(x)&&d===!0,w=E.encodeLocation?E.encodeLocation(x).pathname:x.pathname,S=g.pathname,k=y&&y.navigation&&y.navigation.location?y.navigation.location.pathname:null;a||(S=S.toLowerCase(),k=k?k.toLowerCase():null,w=w.toLowerCase()),k&&A&&(k=ln(k,A)||k);const C=w!=="/"&&w.endsWith("/")?w.length-1:w.length;let $=S===w||!c&&S.startsWith(w)&&S.charAt(C)==="/",I=k!=null&&(k===w||!c&&k.startsWith(w)&&k.charAt(w.length)==="/"),q={isActive:$,isPending:I,isTransitioning:N},Z=$?r:void 0,H;typeof o=="function"?H=o(q):H=[o,$?"active":null,I?"pending":null,N?"transitioning":null].filter(Boolean).join(" ");let Y=typeof l=="function"?l(q):l;return z.createElement(zr,{...m,"aria-current":Z,className:H,ref:v,style:Y,to:u,viewTransition:d},typeof p=="function"?p(q):p)});Ar.displayName="NavLink";var kb=z.forwardRef(({discover:r="render",fetcherKey:a,navigate:o,reloadDocument:c,replace:l,state:u,method:d=fs,action:p,onSubmit:m,relative:v,preventScrollReset:x,viewTransition:g,...y},E)=>{let A=_b(),N=Ab(p,{relative:v}),w=d.toLowerCase()==="get"?"get":"post",S=typeof p=="string"&&tg.test(p),k=C=>{if(m&&m(C),C.defaultPrevented)return;C.preventDefault();let $=C.nativeEvent.submitter,I=($==null?void 0:$.getAttribute("formmethod"))||d;A($||C.currentTarget,{fetcherKey:a,method:I,navigate:o,replace:l,state:u,relative:v,preventScrollReset:x,viewTransition:g})};return z.createElement("form",{ref:E,method:w,action:N,onSubmit:c?m:k,...y,"data-discover":!S&&r==="render"?"true":void 0})});kb.displayName="Form";function Nb(r){return`${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function rg(r){let a=z.useContext(Ma);return Ke(a,Nb(r)),a}function Sb(r,{target:a,replace:o,state:c,preventScrollReset:l,relative:u,viewTransition:d}={}){let p=Lr(),m=At(),v=Do(r,{relative:u});return z.useCallback(x=>{if(rb(x,a)){x.preventDefault();let g=o!==void 0?o:zo(m)===zo(v);p(r,{replace:g,state:c,preventScrollReset:l,relative:u,viewTransition:d})}},[m,p,v,o,c,a,r,l,u,d])}var jb=0,Eb=()=>`__${String(++jb)}__`;function _b(){let{router:r}=rg("useSubmit"),{basename:a}=z.useContext(rr),o=Gx();return z.useCallback(async(c,l={})=>{let{action:u,method:d,encType:p,formData:m,body:v}=ob(c,a);if(l.navigate===!1){let x=l.fetcherKey||Eb();await r.fetch(x,o,l.action||u,{preventScrollReset:l.preventScrollReset,formData:m,body:v,formMethod:l.method||d,formEncType:l.encType||p,flushSync:l.flushSync})}else await r.navigate(l.action||u,{preventScrollReset:l.preventScrollReset,formData:m,body:v,formMethod:l.method||d,formEncType:l.encType||p,replace:l.replace,state:l.state,fromRouteId:o,flushSync:l.flushSync,viewTransition:l.viewTransition})},[r,a,o])}function Ab(r,{relative:a}={}){let{basename:o}=z.useContext(rr),c=z.useContext(mr);Ke(c,"useFormAction must be used inside a RouteContext");let[l]=c.matches.slice(-1),u={...Do(r||".",{relative:a})},d=At();if(r==null){u.search=d.search;let p=new URLSearchParams(u.search),m=p.getAll("index");if(m.some(v=>v==="")){p.delete("index"),m.filter(x=>x).forEach(x=>p.append("index",x));let v=p.toString();u.search=v?`?${v}`:""}}return(!r||r===".")&&l.route.index&&(u.search=u.search?u.search.replace(/^\?/,"?index&"):"?index"),o!=="/"&&(u.pathname=u.pathname==="/"?o:Cr([o,u.pathname])),zo(u)}function Cb(r,a={}){let o=z.useContext(Gh);Ke(o!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:c}=rg("useViewTransitionState"),l=Do(r,{relative:a.relative});if(!o.isTransitioning)return!1;let u=ln(o.currentLocation.pathname,c)||o.currentLocation.pathname,d=ln(o.nextLocation.pathname,c)||o.nextLocation.pathname;return xs(l.pathname,d)!=null||xs(l.pathname,u)!=null}new TextEncoder;function ng(r){var a,o,c="";if(typeof r=="string"||typeof r=="number")c+=r;else if(typeof r=="object")if(Array.isArray(r)){var l=r.length;for(a=0;a<l;a++)r[a]&&(o=ng(r[a]))&&(c&&(c+=" "),c+=o)}else for(o in r)r[o]&&(c&&(c+=" "),c+=o);return c}function sn(){for(var r,a,o=0,c="",l=arguments.length;o<l;o++)(r=arguments[o])&&(a=ng(r))&&(c&&(c+=" "),c+=a);return c}const Mo=r=>typeof r=="number"&&!isNaN(r),Ln=r=>typeof r=="string",Lt=r=>typeof r=="function",ms=r=>Ln(r)||Lt(r)?r:null,Sd=r=>z.isValidElement(r)||Ln(r)||Lt(r)||Mo(r);function zb(r,a,o){o===void 0&&(o=300);const{scrollHeight:c,style:l}=r;requestAnimationFrame(()=>{l.minHeight="initial",l.height=c+"px",l.transition=`all ${o}ms`,requestAnimationFrame(()=>{l.height="0",l.padding="0",l.margin="0",setTimeout(a,o)})})}function zs(r){let{enter:a,exit:o,appendPosition:c=!1,collapse:l=!0,collapseDuration:u=300}=r;return function(d){let{children:p,position:m,preventExitTransition:v,done:x,nodeRef:g,isIn:y,playToast:E}=d;const A=c?`${a}--${m}`:a,N=c?`${o}--${m}`:o,w=z.useRef(0);return z.useLayoutEffect(()=>{const S=g.current,k=A.split(" "),C=$=>{$.target===g.current&&(E(),S.removeEventListener("animationend",C),S.removeEventListener("animationcancel",C),w.current===0&&$.type!=="animationcancel"&&S.classList.remove(...k))};S.classList.add(...k),S.addEventListener("animationend",C),S.addEventListener("animationcancel",C)},[]),z.useEffect(()=>{const S=g.current,k=()=>{S.removeEventListener("animationend",k),l?zb(S,x,u):x()};y||(v?k():(w.current=1,S.className+=` ${N}`,S.addEventListener("animationend",k)))},[y]),Ue.createElement(Ue.Fragment,null,p)}}function a0(r,a){return r!=null?{content:r.content,containerId:r.props.containerId,id:r.props.toastId,theme:r.props.theme,type:r.props.type,data:r.props.data||{},isLoading:r.props.isLoading,icon:r.props.icon,status:a}:{}}const yt=new Map;let Oo=[];const jd=new Set,Mb=r=>jd.forEach(a=>a(r)),ag=()=>yt.size>0;function og(r,a){var o;if(a)return!((o=yt.get(a))==null||!o.isToastActive(r));let c=!1;return yt.forEach(l=>{l.isToastActive(r)&&(c=!0)}),c}function ig(r,a){Sd(r)&&(ag()||Oo.push({content:r,options:a}),yt.forEach(o=>{o.buildToast(r,a)}))}function o0(r,a){yt.forEach(o=>{a!=null&&a!=null&&a.containerId?(a==null?void 0:a.containerId)===o.id&&o.toggle(r,a==null?void 0:a.id):o.toggle(r,a==null?void 0:a.id)})}function Ob(r){const{subscribe:a,getSnapshot:o,setProps:c}=z.useRef(function(u){const d=u.containerId||1;return{subscribe(p){const m=function(x,g,y){let E=1,A=0,N=[],w=[],S=[],k=g;const C=new Map,$=new Set,I=()=>{S=Array.from(C.values()),$.forEach(H=>H())},q=H=>{w=H==null?[]:w.filter(Y=>Y!==H),I()},Z=H=>{const{toastId:Y,onOpen:R,updateId:te,children:pe}=H.props,J=te==null;H.staleId&&C.delete(H.staleId),C.set(Y,H),w=[...w,H.props.toastId].filter(fe=>fe!==H.staleId),I(),y(a0(H,J?"added":"updated")),J&&Lt(R)&&R(z.isValidElement(pe)&&pe.props)};return{id:x,props:k,observe:H=>($.add(H),()=>$.delete(H)),toggle:(H,Y)=>{C.forEach(R=>{Y!=null&&Y!==R.props.toastId||Lt(R.toggle)&&R.toggle(H)})},removeToast:q,toasts:C,clearQueue:()=>{A-=N.length,N=[]},buildToast:(H,Y)=>{if((K=>{let{containerId:be,toastId:ke,updateId:_e}=K;const Ae=be?be!==x:x!==1,Pe=C.has(ke)&&_e==null;return Ae||Pe})(Y))return;const{toastId:R,updateId:te,data:pe,staleId:J,delay:fe}=Y,G=()=>{q(R)},ae=te==null;ae&&A++;const W={...k,style:k.toastStyle,key:E++,...Object.fromEntries(Object.entries(Y).filter(K=>{let[be,ke]=K;return ke!=null})),toastId:R,updateId:te,data:pe,closeToast:G,isIn:!1,className:ms(Y.className||k.toastClassName),bodyClassName:ms(Y.bodyClassName||k.bodyClassName),progressClassName:ms(Y.progressClassName||k.progressClassName),autoClose:!Y.isLoading&&(F=Y.autoClose,V=k.autoClose,F===!1||Mo(F)&&F>0?F:V),deleteToast(){const K=C.get(R),{onClose:be,children:ke}=K.props;Lt(be)&&be(z.isValidElement(ke)&&ke.props),y(a0(K,"removed")),C.delete(R),A--,A<0&&(A=0),N.length>0?Z(N.shift()):I()}};var F,V;W.closeButton=k.closeButton,Y.closeButton===!1||Sd(Y.closeButton)?W.closeButton=Y.closeButton:Y.closeButton===!0&&(W.closeButton=!Sd(k.closeButton)||k.closeButton);let Q=H;z.isValidElement(H)&&!Ln(H.type)?Q=z.cloneElement(H,{closeToast:G,toastProps:W,data:pe}):Lt(H)&&(Q=H({closeToast:G,toastProps:W,data:pe}));const L={content:Q,props:W,staleId:J};k.limit&&k.limit>0&&A>k.limit&&ae?N.push(L):Mo(fe)?setTimeout(()=>{Z(L)},fe):Z(L)},setProps(H){k=H},setToggle:(H,Y)=>{C.get(H).toggle=Y},isToastActive:H=>w.some(Y=>Y===H),getSnapshot:()=>S}}(d,u,Mb);yt.set(d,m);const v=m.observe(p);return Oo.forEach(x=>ig(x.content,x.options)),Oo=[],()=>{v(),yt.delete(d)}},setProps(p){var m;(m=yt.get(d))==null||m.setProps(p)},getSnapshot(){var p;return(p=yt.get(d))==null?void 0:p.getSnapshot()}}}(r)).current;c(r);const l=z.useSyncExternalStore(a,o,o);return{getToastToRender:function(u){if(!l)return[];const d=new Map;return r.newestOnTop&&l.reverse(),l.forEach(p=>{const{position:m}=p.props;d.has(m)||d.set(m,[]),d.get(m).push(p)}),Array.from(d,p=>u(p[0],p[1]))},isToastActive:og,count:l==null?void 0:l.length}}function Pb(r){const[a,o]=z.useState(!1),[c,l]=z.useState(!1),u=z.useRef(null),d=z.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:p,pauseOnHover:m,closeToast:v,onClick:x,closeOnClick:g}=r;var y,E;function A(){o(!0)}function N(){o(!1)}function w(C){const $=u.current;d.canDrag&&$&&(d.didMove=!0,a&&N(),d.delta=r.draggableDirection==="x"?C.clientX-d.start:C.clientY-d.start,d.start!==C.clientX&&(d.canCloseOnClick=!1),$.style.transform=`translate3d(${r.draggableDirection==="x"?`${d.delta}px, var(--y)`:`0, calc(${d.delta}px + var(--y))`},0)`,$.style.opacity=""+(1-Math.abs(d.delta/d.removalDistance)))}function S(){document.removeEventListener("pointermove",w),document.removeEventListener("pointerup",S);const C=u.current;if(d.canDrag&&d.didMove&&C){if(d.canDrag=!1,Math.abs(d.delta)>d.removalDistance)return l(!0),r.closeToast(),void r.collapseAll();C.style.transition="transform 0.2s, opacity 0.2s",C.style.removeProperty("transform"),C.style.removeProperty("opacity")}}(E=yt.get((y={id:r.toastId,containerId:r.containerId,fn:o}).containerId||1))==null||E.setToggle(y.id,y.fn),z.useEffect(()=>{if(r.pauseOnFocusLoss)return document.hasFocus()||N(),window.addEventListener("focus",A),window.addEventListener("blur",N),()=>{window.removeEventListener("focus",A),window.removeEventListener("blur",N)}},[r.pauseOnFocusLoss]);const k={onPointerDown:function(C){if(r.draggable===!0||r.draggable===C.pointerType){d.didMove=!1,document.addEventListener("pointermove",w),document.addEventListener("pointerup",S);const $=u.current;d.canCloseOnClick=!0,d.canDrag=!0,$.style.transition="none",r.draggableDirection==="x"?(d.start=C.clientX,d.removalDistance=$.offsetWidth*(r.draggablePercent/100)):(d.start=C.clientY,d.removalDistance=$.offsetHeight*(r.draggablePercent===80?1.5*r.draggablePercent:r.draggablePercent)/100)}},onPointerUp:function(C){const{top:$,bottom:I,left:q,right:Z}=u.current.getBoundingClientRect();C.nativeEvent.type!=="touchend"&&r.pauseOnHover&&C.clientX>=q&&C.clientX<=Z&&C.clientY>=$&&C.clientY<=I?N():A()}};return p&&m&&(k.onMouseEnter=N,r.stacked||(k.onMouseLeave=A)),g&&(k.onClick=C=>{x&&x(C),d.canCloseOnClick&&v()}),{playToast:A,pauseToast:N,isRunning:a,preventExitTransition:c,toastRef:u,eventHandlers:k}}function Lb(r){let{delay:a,isRunning:o,closeToast:c,type:l="default",hide:u,className:d,style:p,controlledProgress:m,progress:v,rtl:x,isIn:g,theme:y}=r;const E=u||m&&v===0,A={...p,animationDuration:`${a}ms`,animationPlayState:o?"running":"paused"};m&&(A.transform=`scaleX(${v})`);const N=sn("Toastify__progress-bar",m?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${y}`,`Toastify__progress-bar--${l}`,{"Toastify__progress-bar--rtl":x}),w=Lt(d)?d({rtl:x,type:l,defaultClassName:N}):sn(N,d),S={[m&&v>=1?"onTransitionEnd":"onAnimationEnd"]:m&&v<1?null:()=>{g&&c()}};return Ue.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":E},Ue.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${y} Toastify__progress-bar--${l}`}),Ue.createElement("div",{role:"progressbar","aria-hidden":E?"true":"false","aria-label":"notification timer",className:w,style:A,...S}))}let Rb=1;const sg=()=>""+Rb++;function $b(r){return r&&(Ln(r.toastId)||Mo(r.toastId))?r.toastId:sg()}function Eo(r,a){return ig(r,a),a.toastId}function bs(r,a){return{...a,type:a&&a.type||r,toastId:$b(a)}}function is(r){return(a,o)=>Eo(a,bs(r,o))}function we(r,a){return Eo(r,bs("default",a))}we.loading=(r,a)=>Eo(r,bs("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...a})),we.promise=function(r,a,o){let c,{pending:l,error:u,success:d}=a;l&&(c=Ln(l)?we.loading(l,o):we.loading(l.render,{...o,...l}));const p={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},m=(x,g,y)=>{if(g==null)return void we.dismiss(c);const E={type:x,...p,...o,data:y},A=Ln(g)?{render:g}:g;return c?we.update(c,{...E,...A}):we(A.render,{...E,...A}),y},v=Lt(r)?r():r;return v.then(x=>m("success",d,x)).catch(x=>m("error",u,x)),v},we.success=is("success"),we.info=is("info"),we.error=is("error"),we.warning=is("warning"),we.warn=we.warning,we.dark=(r,a)=>Eo(r,bs("default",{theme:"dark",...a})),we.dismiss=function(r){(function(a){var o;if(ag()){if(a==null||Ln(o=a)||Mo(o))yt.forEach(c=>{c.removeToast(a)});else if(a&&("containerId"in a||"id"in a)){const c=yt.get(a.containerId);c?c.removeToast(a.id):yt.forEach(l=>{l.removeToast(a.id)})}}else Oo=Oo.filter(c=>a!=null&&c.options.toastId!==a)})(r)},we.clearWaitingQueue=function(r){r===void 0&&(r={}),yt.forEach(a=>{!a.props.limit||r.containerId&&a.id!==r.containerId||a.clearQueue()})},we.isActive=og,we.update=function(r,a){a===void 0&&(a={});const o=((c,l)=>{var u;let{containerId:d}=l;return(u=yt.get(d||1))==null?void 0:u.toasts.get(c)})(r,a);if(o){const{props:c,content:l}=o,u={delay:100,...c,...a,toastId:a.toastId||r,updateId:sg()};u.toastId!==r&&(u.staleId=r);const d=u.render||l;delete u.render,Eo(d,u)}},we.done=r=>{we.update(r,{progress:1})},we.onChange=function(r){return jd.add(r),()=>{jd.delete(r)}},we.play=r=>o0(!0,r),we.pause=r=>o0(!1,r);const Ib=typeof window<"u"?z.useLayoutEffect:z.useEffect,ss=r=>{let{theme:a,type:o,isLoading:c,...l}=r;return Ue.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:a==="colored"?"currentColor":`var(--toastify-icon-color-${o})`,...l})},Ec={info:function(r){return Ue.createElement(ss,{...r},Ue.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(r){return Ue.createElement(ss,{...r},Ue.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(r){return Ue.createElement(ss,{...r},Ue.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(r){return Ue.createElement(ss,{...r},Ue.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return Ue.createElement("div",{className:"Toastify__spinner"})}},Tb=r=>{const{isRunning:a,preventExitTransition:o,toastRef:c,eventHandlers:l,playToast:u}=Pb(r),{closeButton:d,children:p,autoClose:m,onClick:v,type:x,hideProgressBar:g,closeToast:y,transition:E,position:A,className:N,style:w,bodyClassName:S,bodyStyle:k,progressClassName:C,progressStyle:$,updateId:I,role:q,progress:Z,rtl:H,toastId:Y,deleteToast:R,isIn:te,isLoading:pe,closeOnClick:J,theme:fe}=r,G=sn("Toastify__toast",`Toastify__toast-theme--${fe}`,`Toastify__toast--${x}`,{"Toastify__toast--rtl":H},{"Toastify__toast--close-on-click":J}),ae=Lt(N)?N({rtl:H,position:A,type:x,defaultClassName:G}):sn(G,N),W=function(L){let{theme:K,type:be,isLoading:ke,icon:_e}=L,Ae=null;const Pe={theme:K,type:be};return _e===!1||(Lt(_e)?Ae=_e({...Pe,isLoading:ke}):z.isValidElement(_e)?Ae=z.cloneElement(_e,Pe):ke?Ae=Ec.spinner():(Le=>Le in Ec)(be)&&(Ae=Ec[be](Pe))),Ae}(r),F=!!Z||!m,V={closeToast:y,type:x,theme:fe};let Q=null;return d===!1||(Q=Lt(d)?d(V):z.isValidElement(d)?z.cloneElement(d,V):function(L){let{closeToast:K,theme:be,ariaLabel:ke="close"}=L;return Ue.createElement("button",{className:`Toastify__close-button Toastify__close-button--${be}`,type:"button",onClick:_e=>{_e.stopPropagation(),K(_e)},"aria-label":ke},Ue.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},Ue.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(V)),Ue.createElement(E,{isIn:te,done:R,position:A,preventExitTransition:o,nodeRef:c,playToast:u},Ue.createElement("div",{id:Y,onClick:v,"data-in":te,className:ae,...l,style:w,ref:c},Ue.createElement("div",{...te&&{role:q},className:Lt(S)?S({type:x}):sn("Toastify__toast-body",S),style:k},W!=null&&Ue.createElement("div",{className:sn("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!pe})},W),Ue.createElement("div",null,p)),Q,Ue.createElement(Lb,{...I&&!F?{key:`pb-${I}`}:{},rtl:H,theme:fe,delay:m,isRunning:a,isIn:te,closeToast:y,hide:g,type:x,style:$,className:C,controlledProgress:F,progress:Z||0})))},Ms=function(r,a){return a===void 0&&(a=!1),{enter:`Toastify--animate Toastify__${r}-enter`,exit:`Toastify--animate Toastify__${r}-exit`,appendPosition:a}},Fb=zs(Ms("bounce",!0));zs(Ms("slide",!0));zs(Ms("zoom"));zs(Ms("flip"));const Db={position:"top-right",transition:Fb,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};function Ub(r){let a={...Db,...r};const o=r.stacked,[c,l]=z.useState(!0),u=z.useRef(null),{getToastToRender:d,isToastActive:p,count:m}=Ob(a),{className:v,style:x,rtl:g,containerId:y}=a;function E(N){const w=sn("Toastify__toast-container",`Toastify__toast-container--${N}`,{"Toastify__toast-container--rtl":g});return Lt(v)?v({position:N,rtl:g,defaultClassName:w}):sn(w,ms(v))}function A(){o&&(l(!0),we.play())}return Ib(()=>{if(o){var N;const w=u.current.querySelectorAll('[data-in="true"]'),S=12,k=(N=a.position)==null?void 0:N.includes("top");let C=0,$=0;Array.from(w).reverse().forEach((I,q)=>{const Z=I;Z.classList.add("Toastify__toast--stacked"),q>0&&(Z.dataset.collapsed=`${c}`),Z.dataset.pos||(Z.dataset.pos=k?"top":"bot");const H=C*(c?.2:1)+(c?0:S*q);Z.style.setProperty("--y",`${k?H:-1*H}px`),Z.style.setProperty("--g",`${S}`),Z.style.setProperty("--s",""+(1-(c?$:0))),C+=Z.offsetHeight,$+=.025})}},[c,m,o]),Ue.createElement("div",{ref:u,className:"Toastify",id:y,onMouseEnter:()=>{o&&(l(!1),we.pause())},onMouseLeave:A},d((N,w)=>{const S=w.length?{...x}:{...x,pointerEvents:"none"};return Ue.createElement("div",{className:E(N),style:S,key:`container-${N}`},w.map(k=>{let{content:C,props:$}=k;return Ue.createElement(Tb,{...$,stacked:o,collapseAll:A,isIn:p($.toastId,$.containerId),style:$.style,key:`toast-${$.key}`},C)}))}))}const Ee={HOME:"/",LOGIN:"/login",REGISTER:"/register",DASHBOARD:"/dashboard",QUIZ:"/quiz",QUIZ_DIFFICULTY:"/quiz/difficulty",QUIZ_RESULTS:"/quiz/results",QUIZ_QUESTIONS:"/quiz/questions",ACHIEVEMENTS:"/achievements",LEADERBOARD:"/leaderboard",STATISTICS:"/statistics",FORGOT_PASSWORD:"/forgot-password",RESET_PASSWORD:"/reset-password"},i0=[Ee.HOME,Ee.LOGIN,Ee.REGISTER,Ee.FORGOT_PASSWORD,Ee.RESET_PASSWORD],Bb=[Ee.DASHBOARD,Ee.QUIZ,Ee.QUIZ_DIFFICULTY,Ee.QUIZ_RESULTS,Ee.QUIZ_QUESTIONS,Ee.ACHIEVEMENTS,Ee.LEADERBOARD,Ee.STATISTICS],lg=({onSuccess:r})=>{const[a,o]=z.useState(new Set),[c,l]=z.useState(0),u=["/src/images/bus1.jpg","/src/images/bus2.jpg","/src/images/bus3.jpg","/src/images/bus4.jpg","/src/images/bus5.jpg"],d=[new Set([4,5,6,7,8]),new Set([0,1,3,4]),new Set([2,3,4,5,8]),new Set([4,5,7,8]),new Set([0,3,6])],p=()=>{const v=Math.floor(Math.random()*u.length);l(v)};z.useEffect(()=>{p()},[]);const m=v=>{v.preventDefault();const x=d[c];a.size===x.size&&[...a].every(g=>x.has(g))?(sessionStorage.setItem("isAuthenticated","true"),sessionStorage.setItem("username",sessionStorage.getItem("username")||"User"),we.success("Login successful!",{position:"top-center",autoClose:1500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),window.location.href=Ee.DASHBOARD,r&&r()):(we.error("Incorrect selection. Please try again.",{position:"top-center",autoClose:500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),o(new Set),p())};return s.jsxs("div",{className:"captcha-container",children:[s.jsx("div",{className:"captcha-overlay"}),s.jsxs("div",{className:"captcha-modal",children:[s.jsxs("div",{className:"captcha-header",children:[s.jsx("p",{className:"captcha-title",children:"Select all images that includes:"}),s.jsx("p",{className:"captcha-subtitle",children:"A bus"})]}),s.jsxs("div",{className:"captcha-image-container",children:[s.jsx("img",{src:u[c],alt:"CAPTCHA",className:"captcha-image"}),s.jsx("div",{className:"captcha-grid",children:[...Array(9)].map((v,x)=>s.jsx("div",{className:`captcha-cell ${a.has(x)?"selected":""}`,onClick:()=>{const g=new Set(a);g.has(x)?g.delete(x):g.add(x),o(g)},children:s.jsx("span",{className:"captcha-cell-index",children:x})},x))})]}),s.jsx("div",{className:"captcha-actions",children:s.jsx("button",{onClick:m,type:"button",className:"captcha-verify-btn",children:"Verify"})})]})]})};/*!
* Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
* License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
* Copyright 2024 Fonticons, Inc.
*/function Zb(r,a,o){return(a=Hb(a))in r?Object.defineProperty(r,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[a]=o,r}function s0(r,a){var o=Object.keys(r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(r);a&&(c=c.filter(function(l){return Object.getOwnPropertyDescriptor(r,l).enumerable})),o.push.apply(o,c)}return o}function le(r){for(var a=1;a<arguments.length;a++){var o=arguments[a]!=null?arguments[a]:{};a%2?s0(Object(o),!0).forEach(function(c){Zb(r,c,o[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):s0(Object(o)).forEach(function(c){Object.defineProperty(r,c,Object.getOwnPropertyDescriptor(o,c))})}return r}function qb(r,a){if(typeof r!="object"||!r)return r;var o=r[Symbol.toPrimitive];if(o!==void 0){var c=o.call(r,a);if(typeof c!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(r)}function Hb(r){var a=qb(r,"string");return typeof a=="symbol"?a:a+""}const l0=()=>{};let ef={},cg={},ug=null,dg={mark:l0,measure:l0};try{typeof window<"u"&&(ef=window),typeof document<"u"&&(cg=document),typeof MutationObserver<"u"&&(ug=MutationObserver),typeof performance<"u"&&(dg=performance)}catch{}const{userAgent:c0=""}=ef.navigator||{},cn=ef,We=cg,u0=ug,ls=dg;cn.document;const Rr=!!We.documentElement&&!!We.head&&typeof We.addEventListener=="function"&&typeof We.createElement=="function",fg=~c0.indexOf("MSIE")||~c0.indexOf("Trident/");var Wb=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Gb=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,pg={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},Kb={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},mg=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],vt="classic",Os="duotone",Yb="sharp",Vb="sharp-duotone",hg=[vt,Os,Yb,Vb],Qb={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},Xb={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},Jb=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),ey={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},ty=["fak","fa-kit","fakd","fa-kit-duotone"],d0={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},ry=["kit"],ny={kit:{"fa-kit":"fak"}},ay=["fak","fakd"],oy={kit:{fak:"fa-kit"}},f0={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},cs={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},iy=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],sy=["fak","fa-kit","fakd","fa-kit-duotone"],ly={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},cy={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},uy={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},Ed={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},dy=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],_d=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...iy,...dy],fy=["solid","regular","light","thin","duotone","brands"],gg=[1,2,3,4,5,6,7,8,9,10],py=gg.concat([11,12,13,14,15,16,17,18,19,20]),my=[...Object.keys(uy),...fy,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",cs.GROUP,cs.SWAP_OPACITY,cs.PRIMARY,cs.SECONDARY].concat(gg.map(r=>"".concat(r,"x"))).concat(py.map(r=>"w-".concat(r))),hy={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const Or="___FONT_AWESOME___",Ad=16,vg="fa",xg="svg-inline--fa",Rn="data-fa-i2svg",Cd="data-fa-pseudo-element",gy="data-fa-pseudo-element-pending",tf="data-prefix",rf="data-icon",p0="fontawesome-i2svg",vy="async",xy=["HTML","HEAD","STYLE","SCRIPT"],bg=(()=>{try{return!0}catch{return!1}})();function Uo(r){return new Proxy(r,{get(a,o){return o in a?a[o]:a[vt]}})}const yg=le({},pg);yg[vt]=le(le(le(le({},{"fa-duotone":"duotone"}),pg[vt]),d0.kit),d0["kit-duotone"]);const by=Uo(yg),zd=le({},ey);zd[vt]=le(le(le(le({},{duotone:"fad"}),zd[vt]),f0.kit),f0["kit-duotone"]);const m0=Uo(zd),Md=le({},Ed);Md[vt]=le(le({},Md[vt]),oy.kit);const nf=Uo(Md),Od=le({},cy);Od[vt]=le(le({},Od[vt]),ny.kit);Uo(Od);const yy=Wb,wg="fa-layers-text",wy=Gb,ky=le({},Qb);Uo(ky);const Ny=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],_c=Kb,Sy=[...ry,...my],_o=cn.FontAwesomeConfig||{};function jy(r){var a=We.querySelector("script["+r+"]");if(a)return a.getAttribute(r)}function Ey(r){return r===""?!0:r==="false"?!1:r==="true"?!0:r}We&&typeof We.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(r=>{let[a,o]=r;const c=Ey(jy(a));c!=null&&(_o[o]=c)});const kg={styleDefault:"solid",familyDefault:vt,cssPrefix:vg,replacementClass:xg,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};_o.familyPrefix&&(_o.cssPrefix=_o.familyPrefix);const Aa=le(le({},kg),_o);Aa.autoReplaceSvg||(Aa.observeMutations=!1);const ye={};Object.keys(kg).forEach(r=>{Object.defineProperty(ye,r,{enumerable:!0,set:function(a){Aa[r]=a,Ao.forEach(o=>o(ye))},get:function(){return Aa[r]}})});Object.defineProperty(ye,"familyPrefix",{enumerable:!0,set:function(r){Aa.cssPrefix=r,Ao.forEach(a=>a(ye))},get:function(){return Aa.cssPrefix}});cn.FontAwesomeConfig=ye;const Ao=[];function _y(r){return Ao.push(r),()=>{Ao.splice(Ao.indexOf(r),1)}}const on=Ad,dr={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Ay(r){if(!r||!Rr)return;const a=We.createElement("style");a.setAttribute("type","text/css"),a.innerHTML=r;const o=We.head.childNodes;let c=null;for(let l=o.length-1;l>-1;l--){const u=o[l],d=(u.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(d)>-1&&(c=u)}return We.head.insertBefore(a,c),r}const Cy="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Po(){let r=12,a="";for(;r-- >0;)a+=Cy[Math.random()*62|0];return a}function Pa(r){const a=[];for(let o=(r||[]).length>>>0;o--;)a[o]=r[o];return a}function af(r){return r.classList?Pa(r.classList):(r.getAttribute("class")||"").split(" ").filter(a=>a)}function Ng(r){return"".concat(r).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function zy(r){return Object.keys(r||{}).reduce((a,o)=>a+"".concat(o,'="').concat(Ng(r[o]),'" '),"").trim()}function Ps(r){return Object.keys(r||{}).reduce((a,o)=>a+"".concat(o,": ").concat(r[o].trim(),";"),"")}function of(r){return r.size!==dr.size||r.x!==dr.x||r.y!==dr.y||r.rotate!==dr.rotate||r.flipX||r.flipY}function My(r){let{transform:a,containerWidth:o,iconWidth:c}=r;const l={transform:"translate(".concat(o/2," 256)")},u="translate(".concat(a.x*32,", ").concat(a.y*32,") "),d="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),p="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(u," ").concat(d," ").concat(p)},v={transform:"translate(".concat(c/2*-1," -256)")};return{outer:l,inner:m,path:v}}function Oy(r){let{transform:a,width:o=Ad,height:c=Ad,startCentered:l=!1}=r,u="";return l&&fg?u+="translate(".concat(a.x/on-o/2,"em, ").concat(a.y/on-c/2,"em) "):l?u+="translate(calc(-50% + ".concat(a.x/on,"em), calc(-50% + ").concat(a.y/on,"em)) "):u+="translate(".concat(a.x/on,"em, ").concat(a.y/on,"em) "),u+="scale(".concat(a.size/on*(a.flipX?-1:1),", ").concat(a.size/on*(a.flipY?-1:1),") "),u+="rotate(".concat(a.rotate,"deg) "),u}var Py=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function Sg(){const r=vg,a=xg,o=ye.cssPrefix,c=ye.replacementClass;let l=Py;if(o!==r||c!==a){const u=new RegExp("\\.".concat(r,"\\-"),"g"),d=new RegExp("\\--".concat(r,"\\-"),"g"),p=new RegExp("\\.".concat(a),"g");l=l.replace(u,".".concat(o,"-")).replace(d,"--".concat(o,"-")).replace(p,".".concat(c))}return l}let h0=!1;function Ac(){ye.autoAddCss&&!h0&&(Ay(Sg()),h0=!0)}var Ly={mixout(){return{dom:{css:Sg,insertCss:Ac}}},hooks(){return{beforeDOMElementCreation(){Ac()},beforeI2svg(){Ac()}}}};const Pr=cn||{};Pr[Or]||(Pr[Or]={});Pr[Or].styles||(Pr[Or].styles={});Pr[Or].hooks||(Pr[Or].hooks={});Pr[Or].shims||(Pr[Or].shims=[]);var fr=Pr[Or];const jg=[],Eg=function(){We.removeEventListener("DOMContentLoaded",Eg),ys=1,jg.map(r=>r())};let ys=!1;Rr&&(ys=(We.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(We.readyState),ys||We.addEventListener("DOMContentLoaded",Eg));function Ry(r){Rr&&(ys?setTimeout(r,0):jg.push(r))}function Bo(r){const{tag:a,attributes:o={},children:c=[]}=r;return typeof r=="string"?Ng(r):"<".concat(a," ").concat(zy(o),">").concat(c.map(Bo).join(""),"</").concat(a,">")}function g0(r,a,o){if(r&&r[a]&&r[a][o])return{prefix:a,iconName:o,icon:r[a][o]}}var Cc=function(r,a,o,c){var l=Object.keys(r),u=l.length,d=a,p,m,v;for(o===void 0?(p=1,v=r[l[0]]):(p=0,v=o);p<u;p++)m=l[p],v=d(v,r[m],m,r);return v};function $y(r){const a=[];let o=0;const c=r.length;for(;o<c;){const l=r.charCodeAt(o++);if(l>=55296&&l<=56319&&o<c){const u=r.charCodeAt(o++);(u&64512)==56320?a.push(((l&1023)<<10)+(u&1023)+65536):(a.push(l),o--)}else a.push(l)}return a}function _g(r){const a=$y(r);return a.length===1?a[0].toString(16):null}function Iy(r,a){const o=r.length;let c=r.charCodeAt(a),l;return c>=55296&&c<=56319&&o>a+1&&(l=r.charCodeAt(a+1),l>=56320&&l<=57343)?(c-55296)*1024+l-56320+65536:c}function v0(r){return Object.keys(r).reduce((a,o)=>{const c=r[o];return c.icon?a[c.iconName]=c.icon:a[o]=c,a},{})}function Pd(r,a){let o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:c=!1}=o,l=v0(a);typeof fr.hooks.addPack=="function"&&!c?fr.hooks.addPack(r,v0(a)):fr.styles[r]=le(le({},fr.styles[r]||{}),l),r==="fas"&&Pd("fa",a)}const{styles:Lo,shims:Ty}=fr,Ag=Object.keys(nf),Fy=Ag.reduce((r,a)=>(r[a]=Object.keys(nf[a]),r),{});let sf=null,Cg={},zg={},Mg={},Og={},Pg={};function Dy(r){return~Sy.indexOf(r)}function Uy(r,a){const o=a.split("-"),c=o[0],l=o.slice(1).join("-");return c===r&&l!==""&&!Dy(l)?l:null}const Lg=()=>{const r=c=>Cc(Lo,(l,u,d)=>(l[d]=Cc(u,c,{}),l),{});Cg=r((c,l,u)=>(l[3]&&(c[l[3]]=u),l[2]&&l[2].filter(d=>typeof d=="number").forEach(d=>{c[d.toString(16)]=u}),c)),zg=r((c,l,u)=>(c[u]=u,l[2]&&l[2].filter(d=>typeof d=="string").forEach(d=>{c[d]=u}),c)),Pg=r((c,l,u)=>{const d=l[2];return c[u]=u,d.forEach(p=>{c[p]=u}),c});const a="far"in Lo||ye.autoFetchSvg,o=Cc(Ty,(c,l)=>{const u=l[0];let d=l[1];const p=l[2];return d==="far"&&!a&&(d="fas"),typeof u=="string"&&(c.names[u]={prefix:d,iconName:p}),typeof u=="number"&&(c.unicodes[u.toString(16)]={prefix:d,iconName:p}),c},{names:{},unicodes:{}});Mg=o.names,Og=o.unicodes,sf=Ls(ye.styleDefault,{family:ye.familyDefault})};_y(r=>{sf=Ls(r.styleDefault,{family:ye.familyDefault})});Lg();function lf(r,a){return(Cg[r]||{})[a]}function By(r,a){return(zg[r]||{})[a]}function Pn(r,a){return(Pg[r]||{})[a]}function Rg(r){return Mg[r]||{prefix:null,iconName:null}}function Zy(r){const a=Og[r],o=lf("fas",r);return a||(o?{prefix:"fas",iconName:o}:null)||{prefix:null,iconName:null}}function un(){return sf}const $g=()=>({prefix:null,iconName:null,rest:[]});function qy(r){let a=vt;const o=Ag.reduce((c,l)=>(c[l]="".concat(ye.cssPrefix,"-").concat(l),c),{});return hg.forEach(c=>{(r.includes(o[c])||r.some(l=>Fy[c].includes(l)))&&(a=c)}),a}function Ls(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:o=vt}=a,c=by[o][r];if(o===Os&&!r)return"fad";const l=m0[o][r]||m0[o][c],u=r in fr.styles?r:null;return l||u||null}function Hy(r){let a=[],o=null;return r.forEach(c=>{const l=Uy(ye.cssPrefix,c);l?o=l:c&&a.push(c)}),{iconName:o,rest:a}}function x0(r){return r.sort().filter((a,o,c)=>c.indexOf(a)===o)}function Rs(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:o=!1}=a;let c=null;const l=_d.concat(sy),u=x0(r.filter(g=>l.includes(g))),d=x0(r.filter(g=>!_d.includes(g))),p=u.filter(g=>(c=g,!mg.includes(g))),[m=null]=p,v=qy(u),x=le(le({},Hy(d)),{},{prefix:Ls(m,{family:v})});return le(le(le({},x),Yy({values:r,family:v,styles:Lo,config:ye,canonical:x,givenPrefix:c})),Wy(o,c,x))}function Wy(r,a,o){let{prefix:c,iconName:l}=o;if(r||!c||!l)return{prefix:c,iconName:l};const u=a==="fa"?Rg(l):{},d=Pn(c,l);return l=u.iconName||d||l,c=u.prefix||c,c==="far"&&!Lo.far&&Lo.fas&&!ye.autoFetchSvg&&(c="fas"),{prefix:c,iconName:l}}const Gy=hg.filter(r=>r!==vt||r!==Os),Ky=Object.keys(Ed).filter(r=>r!==vt).map(r=>Object.keys(Ed[r])).flat();function Yy(r){const{values:a,family:o,canonical:c,givenPrefix:l="",styles:u={},config:d={}}=r,p=o===Os,m=a.includes("fa-duotone")||a.includes("fad"),v=d.familyDefault==="duotone",x=c.prefix==="fad"||c.prefix==="fa-duotone";if(!p&&(m||v||x)&&(c.prefix="fad"),(a.includes("fa-brands")||a.includes("fab"))&&(c.prefix="fab"),!c.prefix&&Gy.includes(o)&&(Object.keys(u).find(g=>Ky.includes(g))||d.autoFetchSvg)){const g=Jb.get(o).defaultShortPrefixId;c.prefix=g,c.iconName=Pn(c.prefix,c.iconName)||c.iconName}return(c.prefix==="fa"||l==="fa")&&(c.prefix=un()||"fas"),c}class Vy{constructor(){this.definitions={}}add(){for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];const l=o.reduce(this._pullDefinitions,{});Object.keys(l).forEach(u=>{this.definitions[u]=le(le({},this.definitions[u]||{}),l[u]),Pd(u,l[u]);const d=nf[vt][u];d&&Pd(d,l[u]),Lg()})}reset(){this.definitions={}}_pullDefinitions(a,o){const c=o.prefix&&o.iconName&&o.icon?{0:o}:o;return Object.keys(c).map(l=>{const{prefix:u,iconName:d,icon:p}=c[l],m=p[2];a[u]||(a[u]={}),m.length>0&&m.forEach(v=>{typeof v=="string"&&(a[u][v]=p)}),a[u][d]=p}),a}}let b0=[],Sa={};const Ea={},Qy=Object.keys(Ea);function Xy(r,a){let{mixoutsTo:o}=a;return b0=r,Sa={},Object.keys(Ea).forEach(c=>{Qy.indexOf(c)===-1&&delete Ea[c]}),b0.forEach(c=>{const l=c.mixout?c.mixout():{};if(Object.keys(l).forEach(u=>{typeof l[u]=="function"&&(o[u]=l[u]),typeof l[u]=="object"&&Object.keys(l[u]).forEach(d=>{o[u]||(o[u]={}),o[u][d]=l[u][d]})}),c.hooks){const u=c.hooks();Object.keys(u).forEach(d=>{Sa[d]||(Sa[d]=[]),Sa[d].push(u[d])})}c.provides&&c.provides(Ea)}),o}function Ld(r,a){for(var o=arguments.length,c=new Array(o>2?o-2:0),l=2;l<o;l++)c[l-2]=arguments[l];return(Sa[r]||[]).forEach(u=>{a=u.apply(null,[a,...c])}),a}function $n(r){for(var a=arguments.length,o=new Array(a>1?a-1:0),c=1;c<a;c++)o[c-1]=arguments[c];(Sa[r]||[]).forEach(l=>{l.apply(null,o)})}function dn(){const r=arguments[0],a=Array.prototype.slice.call(arguments,1);return Ea[r]?Ea[r].apply(null,a):void 0}function Rd(r){r.prefix==="fa"&&(r.prefix="fas");let{iconName:a}=r;const o=r.prefix||un();if(a)return a=Pn(o,a)||a,g0(Ig.definitions,o,a)||g0(fr.styles,o,a)}const Ig=new Vy,Jy=()=>{ye.autoReplaceSvg=!1,ye.observeMutations=!1,$n("noAuto")},e3={i2svg:function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Rr?($n("beforeI2svg",r),dn("pseudoElements2svg",r),dn("i2svg",r)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:a}=r;ye.autoReplaceSvg===!1&&(ye.autoReplaceSvg=!0),ye.observeMutations=!0,Ry(()=>{r3({autoReplaceSvgRoot:a}),$n("watch",r)})}},t3={icon:r=>{if(r===null)return null;if(typeof r=="object"&&r.prefix&&r.iconName)return{prefix:r.prefix,iconName:Pn(r.prefix,r.iconName)||r.iconName};if(Array.isArray(r)&&r.length===2){const a=r[1].indexOf("fa-")===0?r[1].slice(3):r[1],o=Ls(r[0]);return{prefix:o,iconName:Pn(o,a)||a}}if(typeof r=="string"&&(r.indexOf("".concat(ye.cssPrefix,"-"))>-1||r.match(yy))){const a=Rs(r.split(" "),{skipLookups:!0});return{prefix:a.prefix||un(),iconName:Pn(a.prefix,a.iconName)||a.iconName}}if(typeof r=="string"){const a=un();return{prefix:a,iconName:Pn(a,r)||r}}}},Rt={noAuto:Jy,config:ye,dom:e3,parse:t3,library:Ig,findIconDefinition:Rd,toHtml:Bo},r3=function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:a=We}=r;(Object.keys(fr.styles).length>0||ye.autoFetchSvg)&&Rr&&ye.autoReplaceSvg&&Rt.dom.i2svg({node:a})};function $s(r,a){return Object.defineProperty(r,"abstract",{get:a}),Object.defineProperty(r,"html",{get:function(){return r.abstract.map(o=>Bo(o))}}),Object.defineProperty(r,"node",{get:function(){if(!Rr)return;const o=We.createElement("div");return o.innerHTML=r.html,o.children}}),r}function n3(r){let{children:a,main:o,mask:c,attributes:l,styles:u,transform:d}=r;if(of(d)&&o.found&&!c.found){const{width:p,height:m}=o,v={x:p/m/2,y:.5};l.style=Ps(le(le({},u),{},{"transform-origin":"".concat(v.x+d.x/16,"em ").concat(v.y+d.y/16,"em")}))}return[{tag:"svg",attributes:l,children:a}]}function a3(r){let{prefix:a,iconName:o,children:c,attributes:l,symbol:u}=r;const d=u===!0?"".concat(a,"-").concat(ye.cssPrefix,"-").concat(o):u;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:le(le({},l),{},{id:d}),children:c}]}]}function cf(r){const{icons:{main:a,mask:o},prefix:c,iconName:l,transform:u,symbol:d,title:p,maskId:m,titleId:v,extra:x,watchable:g=!1}=r,{width:y,height:E}=o.found?o:a,A=ay.includes(c),N=[ye.replacementClass,l?"".concat(ye.cssPrefix,"-").concat(l):""].filter(I=>x.classes.indexOf(I)===-1).filter(I=>I!==""||!!I).concat(x.classes).join(" ");let w={children:[],attributes:le(le({},x.attributes),{},{"data-prefix":c,"data-icon":l,class:N,role:x.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(y," ").concat(E)})};const S=A&&!~x.classes.indexOf("fa-fw")?{width:"".concat(y/E*16*.0625,"em")}:{};g&&(w.attributes[Rn]=""),p&&(w.children.push({tag:"title",attributes:{id:w.attributes["aria-labelledby"]||"title-".concat(v||Po())},children:[p]}),delete w.attributes.title);const k=le(le({},w),{},{prefix:c,iconName:l,main:a,mask:o,maskId:m,transform:u,symbol:d,styles:le(le({},S),x.styles)}),{children:C,attributes:$}=o.found&&a.found?dn("generateAbstractMask",k)||{children:[],attributes:{}}:dn("generateAbstractIcon",k)||{children:[],attributes:{}};return k.children=C,k.attributes=$,d?a3(k):n3(k)}function y0(r){const{content:a,width:o,height:c,transform:l,title:u,extra:d,watchable:p=!1}=r,m=le(le(le({},d.attributes),u?{title:u}:{}),{},{class:d.classes.join(" ")});p&&(m[Rn]="");const v=le({},d.styles);of(l)&&(v.transform=Oy({transform:l,startCentered:!0,width:o,height:c}),v["-webkit-transform"]=v.transform);const x=Ps(v);x.length>0&&(m.style=x);const g=[];return g.push({tag:"span",attributes:m,children:[a]}),u&&g.push({tag:"span",attributes:{class:"sr-only"},children:[u]}),g}function o3(r){const{content:a,title:o,extra:c}=r,l=le(le(le({},c.attributes),o?{title:o}:{}),{},{class:c.classes.join(" ")}),u=Ps(c.styles);u.length>0&&(l.style=u);const d=[];return d.push({tag:"span",attributes:l,children:[a]}),o&&d.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),d}const{styles:zc}=fr;function $d(r){const a=r[0],o=r[1],[c]=r.slice(4);let l=null;return Array.isArray(c)?l={tag:"g",attributes:{class:"".concat(ye.cssPrefix,"-").concat(_c.GROUP)},children:[{tag:"path",attributes:{class:"".concat(ye.cssPrefix,"-").concat(_c.SECONDARY),fill:"currentColor",d:c[0]}},{tag:"path",attributes:{class:"".concat(ye.cssPrefix,"-").concat(_c.PRIMARY),fill:"currentColor",d:c[1]}}]}:l={tag:"path",attributes:{fill:"currentColor",d:c}},{found:!0,width:a,height:o,icon:l}}const i3={found:!1,width:512,height:512};function s3(r,a){!bg&&!ye.showMissingIcons&&r&&console.error('Icon with name "'.concat(r,'" and prefix "').concat(a,'" is missing.'))}function Id(r,a){let o=a;return a==="fa"&&ye.styleDefault!==null&&(a=un()),new Promise((c,l)=>{if(o==="fa"){const u=Rg(r)||{};r=u.iconName||r,a=u.prefix||a}if(r&&a&&zc[a]&&zc[a][r]){const u=zc[a][r];return c($d(u))}s3(r,a),c(le(le({},i3),{},{icon:ye.showMissingIcons&&r?dn("missingIconAbstract")||{}:{}}))})}const w0=()=>{},Td=ye.measurePerformance&&ls&&ls.mark&&ls.measure?ls:{mark:w0,measure:w0},So='FA "6.7.2"',l3=r=>(Td.mark("".concat(So," ").concat(r," begins")),()=>Tg(r)),Tg=r=>{Td.mark("".concat(So," ").concat(r," ends")),Td.measure("".concat(So," ").concat(r),"".concat(So," ").concat(r," begins"),"".concat(So," ").concat(r," ends"))};var uf={begin:l3,end:Tg};const hs=()=>{};function k0(r){return typeof(r.getAttribute?r.getAttribute(Rn):null)=="string"}function c3(r){const a=r.getAttribute?r.getAttribute(tf):null,o=r.getAttribute?r.getAttribute(rf):null;return a&&o}function u3(r){return r&&r.classList&&r.classList.contains&&r.classList.contains(ye.replacementClass)}function d3(){return ye.autoReplaceSvg===!0?gs.replace:gs[ye.autoReplaceSvg]||gs.replace}function f3(r){return We.createElementNS("http://www.w3.org/2000/svg",r)}function p3(r){return We.createElement(r)}function Fg(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:o=r.tag==="svg"?f3:p3}=a;if(typeof r=="string")return We.createTextNode(r);const c=o(r.tag);return Object.keys(r.attributes||[]).forEach(function(l){c.setAttribute(l,r.attributes[l])}),(r.children||[]).forEach(function(l){c.appendChild(Fg(l,{ceFn:o}))}),c}function m3(r){let a=" ".concat(r.outerHTML," ");return a="".concat(a,"Font Awesome fontawesome.com "),a}const gs={replace:function(r){const a=r[0];if(a.parentNode)if(r[1].forEach(o=>{a.parentNode.insertBefore(Fg(o),a)}),a.getAttribute(Rn)===null&&ye.keepOriginalSource){let o=We.createComment(m3(a));a.parentNode.replaceChild(o,a)}else a.remove()},nest:function(r){const a=r[0],o=r[1];if(~af(a).indexOf(ye.replacementClass))return gs.replace(r);const c=new RegExp("".concat(ye.cssPrefix,"-.*"));if(delete o[0].attributes.id,o[0].attributes.class){const u=o[0].attributes.class.split(" ").reduce((d,p)=>(p===ye.replacementClass||p.match(c)?d.toSvg.push(p):d.toNode.push(p),d),{toNode:[],toSvg:[]});o[0].attributes.class=u.toSvg.join(" "),u.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",u.toNode.join(" "))}const l=o.map(u=>Bo(u)).join(`
`);a.setAttribute(Rn,""),a.innerHTML=l}};function N0(r){r()}function Dg(r,a){const o=typeof a=="function"?a:hs;if(r.length===0)o();else{let c=N0;ye.mutateApproach===vy&&(c=cn.requestAnimationFrame||N0),c(()=>{const l=d3(),u=uf.begin("mutate");r.map(l),u(),o()})}}let df=!1;function Ug(){df=!0}function Fd(){df=!1}let ws=null;function S0(r){if(!u0||!ye.observeMutations)return;const{treeCallback:a=hs,nodeCallback:o=hs,pseudoElementsCallback:c=hs,observeMutationsRoot:l=We}=r;ws=new u0(u=>{if(df)return;const d=un();Pa(u).forEach(p=>{if(p.type==="childList"&&p.addedNodes.length>0&&!k0(p.addedNodes[0])&&(ye.searchPseudoElements&&c(p.target),a(p.target)),p.type==="attributes"&&p.target.parentNode&&ye.searchPseudoElements&&c(p.target.parentNode),p.type==="attributes"&&k0(p.target)&&~Ny.indexOf(p.attributeName))if(p.attributeName==="class"&&c3(p.target)){const{prefix:m,iconName:v}=Rs(af(p.target));p.target.setAttribute(tf,m||d),v&&p.target.setAttribute(rf,v)}else u3(p.target)&&o(p.target)})}),Rr&&ws.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function h3(){ws&&ws.disconnect()}function g3(r){const a=r.getAttribute("style");let o=[];return a&&(o=a.split(";").reduce((c,l)=>{const u=l.split(":"),d=u[0],p=u.slice(1);return d&&p.length>0&&(c[d]=p.join(":").trim()),c},{})),o}function v3(r){const a=r.getAttribute("data-prefix"),o=r.getAttribute("data-icon"),c=r.innerText!==void 0?r.innerText.trim():"";let l=Rs(af(r));return l.prefix||(l.prefix=un()),a&&o&&(l.prefix=a,l.iconName=o),l.iconName&&l.prefix||(l.prefix&&c.length>0&&(l.iconName=By(l.prefix,r.innerText)||lf(l.prefix,_g(r.innerText))),!l.iconName&&ye.autoFetchSvg&&r.firstChild&&r.firstChild.nodeType===Node.TEXT_NODE&&(l.iconName=r.firstChild.data)),l}function x3(r){const a=Pa(r.attributes).reduce((l,u)=>(l.name!=="class"&&l.name!=="style"&&(l[u.name]=u.value),l),{}),o=r.getAttribute("title"),c=r.getAttribute("data-fa-title-id");return ye.autoA11y&&(o?a["aria-labelledby"]="".concat(ye.replacementClass,"-title-").concat(c||Po()):(a["aria-hidden"]="true",a.focusable="false")),a}function b3(){return{iconName:null,title:null,titleId:null,prefix:null,transform:dr,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function j0(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:o,prefix:c,rest:l}=v3(r),u=x3(r),d=Ld("parseNodeAttributes",{},r);let p=a.styleParser?g3(r):[];return le({iconName:o,title:r.getAttribute("title"),titleId:r.getAttribute("data-fa-title-id"),prefix:c,transform:dr,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:l,styles:p,attributes:u}},d)}const{styles:y3}=fr;function Bg(r){const a=ye.autoReplaceSvg==="nest"?j0(r,{styleParser:!1}):j0(r);return~a.extra.classes.indexOf(wg)?dn("generateLayersText",r,a):dn("generateSvgReplacementMutation",r,a)}function w3(){return[...ty,..._d]}function E0(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!Rr)return Promise.resolve();const o=We.documentElement.classList,c=x=>o.add("".concat(p0,"-").concat(x)),l=x=>o.remove("".concat(p0,"-").concat(x)),u=ye.autoFetchSvg?w3():mg.concat(Object.keys(y3));u.includes("fa")||u.push("fa");const d=[".".concat(wg,":not([").concat(Rn,"])")].concat(u.map(x=>".".concat(x,":not([").concat(Rn,"])"))).join(", ");if(d.length===0)return Promise.resolve();let p=[];try{p=Pa(r.querySelectorAll(d))}catch{}if(p.length>0)c("pending"),l("complete");else return Promise.resolve();const m=uf.begin("onTree"),v=p.reduce((x,g)=>{try{const y=Bg(g);y&&x.push(y)}catch(y){bg||y.name==="MissingIcon"&&console.error(y)}return x},[]);return new Promise((x,g)=>{Promise.all(v).then(y=>{Dg(y,()=>{c("active"),c("complete"),l("pending"),typeof a=="function"&&a(),m(),x()})}).catch(y=>{m(),g(y)})})}function k3(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Bg(r).then(o=>{o&&Dg([o],a)})}function N3(r){return function(a){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const c=(a||{}).icon?a:Rd(a||{});let{mask:l}=o;return l&&(l=(l||{}).icon?l:Rd(l||{})),r(c,le(le({},o),{},{mask:l}))}}const S3=function(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:o=dr,symbol:c=!1,mask:l=null,maskId:u=null,title:d=null,titleId:p=null,classes:m=[],attributes:v={},styles:x={}}=a;if(!r)return;const{prefix:g,iconName:y,icon:E}=r;return $s(le({type:"icon"},r),()=>($n("beforeDOMElementCreation",{iconDefinition:r,params:a}),ye.autoA11y&&(d?v["aria-labelledby"]="".concat(ye.replacementClass,"-title-").concat(p||Po()):(v["aria-hidden"]="true",v.focusable="false")),cf({icons:{main:$d(E),mask:l?$d(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:y,transform:le(le({},dr),o),symbol:c,title:d,maskId:u,titleId:p,extra:{attributes:v,styles:x,classes:m}})))};var j3={mixout(){return{icon:N3(S3)}},hooks(){return{mutationObserverCallbacks(r){return r.treeCallback=E0,r.nodeCallback=k3,r}}},provides(r){r.i2svg=function(a){const{node:o=We,callback:c=()=>{}}=a;return E0(o,c)},r.generateSvgReplacementMutation=function(a,o){const{iconName:c,title:l,titleId:u,prefix:d,transform:p,symbol:m,mask:v,maskId:x,extra:g}=o;return new Promise((y,E)=>{Promise.all([Id(c,d),v.iconName?Id(v.iconName,v.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(A=>{let[N,w]=A;y([a,cf({icons:{main:N,mask:w},prefix:d,iconName:c,transform:p,symbol:m,maskId:x,title:l,titleId:u,extra:g,watchable:!0})])}).catch(E)})},r.generateAbstractIcon=function(a){let{children:o,attributes:c,main:l,transform:u,styles:d}=a;const p=Ps(d);p.length>0&&(c.style=p);let m;return of(u)&&(m=dn("generateAbstractTransformGrouping",{main:l,transform:u,containerWidth:l.width,iconWidth:l.width})),o.push(m||l.icon),{children:o,attributes:c}}}},E3={mixout(){return{layer(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:o=[]}=a;return $s({type:"layer"},()=>{$n("beforeDOMElementCreation",{assembler:r,params:a});let c=[];return r(l=>{Array.isArray(l)?l.map(u=>{c=c.concat(u.abstract)}):c=c.concat(l.abstract)}),[{tag:"span",attributes:{class:["".concat(ye.cssPrefix,"-layers"),...o].join(" ")},children:c}]})}}}},_3={mixout(){return{counter(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:o=null,classes:c=[],attributes:l={},styles:u={}}=a;return $s({type:"counter",content:r},()=>($n("beforeDOMElementCreation",{content:r,params:a}),o3({content:r.toString(),title:o,extra:{attributes:l,styles:u,classes:["".concat(ye.cssPrefix,"-layers-counter"),...c]}})))}}}},A3={mixout(){return{text(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:o=dr,title:c=null,classes:l=[],attributes:u={},styles:d={}}=a;return $s({type:"text",content:r},()=>($n("beforeDOMElementCreation",{content:r,params:a}),y0({content:r,transform:le(le({},dr),o),title:c,extra:{attributes:u,styles:d,classes:["".concat(ye.cssPrefix,"-layers-text"),...l]}})))}}},provides(r){r.generateLayersText=function(a,o){const{title:c,transform:l,extra:u}=o;let d=null,p=null;if(fg){const m=parseInt(getComputedStyle(a).fontSize,10),v=a.getBoundingClientRect();d=v.width/m,p=v.height/m}return ye.autoA11y&&!c&&(u.attributes["aria-hidden"]="true"),Promise.resolve([a,y0({content:a.innerHTML,width:d,height:p,transform:l,title:c,extra:u,watchable:!0})])}}};const C3=new RegExp('"',"ug"),_0=[1105920,1112319],A0=le(le(le(le({},{FontAwesome:{normal:"fas",400:"fas"}}),Xb),hy),ly),Dd=Object.keys(A0).reduce((r,a)=>(r[a.toLowerCase()]=A0[a],r),{}),z3=Object.keys(Dd).reduce((r,a)=>{const o=Dd[a];return r[a]=o[900]||[...Object.entries(o)][0][1],r},{});function M3(r){const a=r.replace(C3,""),o=Iy(a,0),c=o>=_0[0]&&o<=_0[1],l=a.length===2?a[0]===a[1]:!1;return{value:_g(l?a[0]:a),isSecondary:c||l}}function O3(r,a){const o=r.replace(/^['"]|['"]$/g,"").toLowerCase(),c=parseInt(a),l=isNaN(c)?"normal":c;return(Dd[o]||{})[l]||z3[o]}function C0(r,a){const o="".concat(gy).concat(a.replace(":","-"));return new Promise((c,l)=>{if(r.getAttribute(o)!==null)return c();const u=Pa(r.children).filter(g=>g.getAttribute(Cd)===a)[0],d=cn.getComputedStyle(r,a),p=d.getPropertyValue("font-family"),m=p.match(wy),v=d.getPropertyValue("font-weight"),x=d.getPropertyValue("content");if(u&&!m)return r.removeChild(u),c();if(m&&x!=="none"&&x!==""){const g=d.getPropertyValue("content");let y=O3(p,v);const{value:E,isSecondary:A}=M3(g),N=m[0].startsWith("FontAwesome");let w=lf(y,E),S=w;if(N){const k=Zy(E);k.iconName&&k.prefix&&(w=k.iconName,y=k.prefix)}if(w&&!A&&(!u||u.getAttribute(tf)!==y||u.getAttribute(rf)!==S)){r.setAttribute(o,S),u&&r.removeChild(u);const k=b3(),{extra:C}=k;C.attributes[Cd]=a,Id(w,y).then($=>{const I=cf(le(le({},k),{},{icons:{main:$,mask:$g()},prefix:y,iconName:S,extra:C,watchable:!0})),q=We.createElementNS("http://www.w3.org/2000/svg","svg");a==="::before"?r.insertBefore(q,r.firstChild):r.appendChild(q),q.outerHTML=I.map(Z=>Bo(Z)).join(`
`),r.removeAttribute(o),c()}).catch(l)}else c()}else c()})}function P3(r){return Promise.all([C0(r,"::before"),C0(r,"::after")])}function L3(r){return r.parentNode!==document.head&&!~xy.indexOf(r.tagName.toUpperCase())&&!r.getAttribute(Cd)&&(!r.parentNode||r.parentNode.tagName!=="svg")}function z0(r){if(Rr)return new Promise((a,o)=>{const c=Pa(r.querySelectorAll("*")).filter(L3).map(P3),l=uf.begin("searchPseudoElements");Ug(),Promise.all(c).then(()=>{l(),Fd(),a()}).catch(()=>{l(),Fd(),o()})})}var R3={hooks(){return{mutationObserverCallbacks(r){return r.pseudoElementsCallback=z0,r}}},provides(r){r.pseudoElements2svg=function(a){const{node:o=We}=a;ye.searchPseudoElements&&z0(o)}}};let M0=!1;var $3={mixout(){return{dom:{unwatch(){Ug(),M0=!0}}}},hooks(){return{bootstrap(){S0(Ld("mutationObserverCallbacks",{}))},noAuto(){h3()},watch(r){const{observeMutationsRoot:a}=r;M0?Fd():S0(Ld("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}};const O0=r=>{let a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return r.toLowerCase().split(" ").reduce((o,c)=>{const l=c.toLowerCase().split("-"),u=l[0];let d=l.slice(1).join("-");if(u&&d==="h")return o.flipX=!0,o;if(u&&d==="v")return o.flipY=!0,o;if(d=parseFloat(d),isNaN(d))return o;switch(u){case"grow":o.size=o.size+d;break;case"shrink":o.size=o.size-d;break;case"left":o.x=o.x-d;break;case"right":o.x=o.x+d;break;case"up":o.y=o.y-d;break;case"down":o.y=o.y+d;break;case"rotate":o.rotate=o.rotate+d;break}return o},a)};var I3={mixout(){return{parse:{transform:r=>O0(r)}}},hooks(){return{parseNodeAttributes(r,a){const o=a.getAttribute("data-fa-transform");return o&&(r.transform=O0(o)),r}}},provides(r){r.generateAbstractTransformGrouping=function(a){let{main:o,transform:c,containerWidth:l,iconWidth:u}=a;const d={transform:"translate(".concat(l/2," 256)")},p="translate(".concat(c.x*32,", ").concat(c.y*32,") "),m="scale(".concat(c.size/16*(c.flipX?-1:1),", ").concat(c.size/16*(c.flipY?-1:1),") "),v="rotate(".concat(c.rotate," 0 0)"),x={transform:"".concat(p," ").concat(m," ").concat(v)},g={transform:"translate(".concat(u/2*-1," -256)")},y={outer:d,inner:x,path:g};return{tag:"g",attributes:le({},y.outer),children:[{tag:"g",attributes:le({},y.inner),children:[{tag:o.icon.tag,children:o.icon.children,attributes:le(le({},o.icon.attributes),y.path)}]}]}}}};const Mc={x:0,y:0,width:"100%",height:"100%"};function P0(r){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return r.attributes&&(r.attributes.fill||a)&&(r.attributes.fill="black"),r}function T3(r){return r.tag==="g"?r.children:[r]}var F3={hooks(){return{parseNodeAttributes(r,a){const o=a.getAttribute("data-fa-mask"),c=o?Rs(o.split(" ").map(l=>l.trim())):$g();return c.prefix||(c.prefix=un()),r.mask=c,r.maskId=a.getAttribute("data-fa-mask-id"),r}}},provides(r){r.generateAbstractMask=function(a){let{children:o,attributes:c,main:l,mask:u,maskId:d,transform:p}=a;const{width:m,icon:v}=l,{width:x,icon:g}=u,y=My({transform:p,containerWidth:x,iconWidth:m}),E={tag:"rect",attributes:le(le({},Mc),{},{fill:"white"})},A=v.children?{children:v.children.map(P0)}:{},N={tag:"g",attributes:le({},y.inner),children:[P0(le({tag:v.tag,attributes:le(le({},v.attributes),y.path)},A))]},w={tag:"g",attributes:le({},y.outer),children:[N]},S="mask-".concat(d||Po()),k="clip-".concat(d||Po()),C={tag:"mask",attributes:le(le({},Mc),{},{id:S,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[E,w]},$={tag:"defs",children:[{tag:"clipPath",attributes:{id:k},children:T3(g)},C]};return o.push($,{tag:"rect",attributes:le({fill:"currentColor","clip-path":"url(#".concat(k,")"),mask:"url(#".concat(S,")")},Mc)}),{children:o,attributes:c}}}},D3={provides(r){let a=!1;cn.matchMedia&&(a=cn.matchMedia("(prefers-reduced-motion: reduce)").matches),r.missingIconAbstract=function(){const o=[],c={fill:"currentColor"},l={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};o.push({tag:"path",attributes:le(le({},c),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const u=le(le({},l),{},{attributeName:"opacity"}),d={tag:"circle",attributes:le(le({},c),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||d.children.push({tag:"animate",attributes:le(le({},l),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:le(le({},u),{},{values:"1;0;1;1;0;1;"})}),o.push(d),o.push({tag:"path",attributes:le(le({},c),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:le(le({},u),{},{values:"1;0;0;0;0;1;"})}]}),a||o.push({tag:"path",attributes:le(le({},c),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:le(le({},u),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:o}}}},U3={hooks(){return{parseNodeAttributes(r,a){const o=a.getAttribute("data-fa-symbol"),c=o===null?!1:o===""?!0:o;return r.symbol=c,r}}}},B3=[Ly,j3,E3,_3,A3,R3,$3,I3,F3,D3,U3];Xy(B3,{mixoutsTo:Rt});Rt.noAuto;Rt.config;Rt.library;Rt.dom;const Ud=Rt.parse;Rt.findIconDefinition;Rt.toHtml;const Z3=Rt.icon;Rt.layer;Rt.text;Rt.counter;var L0={exports:{}},Oc,R0;function q3(){if(R0)return Oc;R0=1;var r="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Oc=r,Oc}var Pc,$0;function H3(){if($0)return Pc;$0=1;var r=q3();function a(){}function o(){}return o.resetWarningCache=a,Pc=function(){function c(d,p,m,v,x,g){if(g!==r){var y=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw y.name="Invariant Violation",y}}c.isRequired=c;function l(){return c}var u={array:c,bigint:c,bool:c,func:c,number:c,object:c,string:c,symbol:c,any:c,arrayOf:l,element:c,elementType:c,instanceOf:l,node:c,objectOf:l,oneOf:l,oneOfType:l,shape:l,exact:l,checkPropTypes:o,resetWarningCache:a};return u.PropTypes=u,u},Pc}var I0;function W3(){return I0||(I0=1,L0.exports=H3()()),L0.exports}var G3=W3();const $e=Hd(G3);function T0(r,a){var o=Object.keys(r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(r);a&&(c=c.filter(function(l){return Object.getOwnPropertyDescriptor(r,l).enumerable})),o.push.apply(o,c)}return o}function ur(r){for(var a=1;a<arguments.length;a++){var o=arguments[a]!=null?arguments[a]:{};a%2?T0(Object(o),!0).forEach(function(c){ja(r,c,o[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):T0(Object(o)).forEach(function(c){Object.defineProperty(r,c,Object.getOwnPropertyDescriptor(o,c))})}return r}function ks(r){"@babel/helpers - typeof";return ks=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},ks(r)}function ja(r,a,o){return a in r?Object.defineProperty(r,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[a]=o,r}function K3(r,a){if(r==null)return{};var o={},c=Object.keys(r),l,u;for(u=0;u<c.length;u++)l=c[u],!(a.indexOf(l)>=0)&&(o[l]=r[l]);return o}function Y3(r,a){if(r==null)return{};var o=K3(r,a),c,l;if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(r);for(l=0;l<u.length;l++)c=u[l],!(a.indexOf(c)>=0)&&Object.prototype.propertyIsEnumerable.call(r,c)&&(o[c]=r[c])}return o}function Bd(r){return V3(r)||Q3(r)||X3(r)||J3()}function V3(r){if(Array.isArray(r))return Zd(r)}function Q3(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function X3(r,a){if(r){if(typeof r=="string")return Zd(r,a);var o=Object.prototype.toString.call(r).slice(8,-1);if(o==="Object"&&r.constructor&&(o=r.constructor.name),o==="Map"||o==="Set")return Array.from(r);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return Zd(r,a)}}function Zd(r,a){(a==null||a>r.length)&&(a=r.length);for(var o=0,c=new Array(a);o<a;o++)c[o]=r[o];return c}function J3(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function e4(r){var a,o=r.beat,c=r.fade,l=r.beatFade,u=r.bounce,d=r.shake,p=r.flash,m=r.spin,v=r.spinPulse,x=r.spinReverse,g=r.pulse,y=r.fixedWidth,E=r.inverse,A=r.border,N=r.listItem,w=r.flip,S=r.size,k=r.rotation,C=r.pull,$=(a={"fa-beat":o,"fa-fade":c,"fa-beat-fade":l,"fa-bounce":u,"fa-shake":d,"fa-flash":p,"fa-spin":m,"fa-spin-reverse":x,"fa-spin-pulse":v,"fa-pulse":g,"fa-fw":y,"fa-inverse":E,"fa-border":A,"fa-li":N,"fa-flip":w===!0,"fa-flip-horizontal":w==="horizontal"||w==="both","fa-flip-vertical":w==="vertical"||w==="both"},ja(a,"fa-".concat(S),typeof S<"u"&&S!==null),ja(a,"fa-rotate-".concat(k),typeof k<"u"&&k!==null&&k!==0),ja(a,"fa-pull-".concat(C),typeof C<"u"&&C!==null),ja(a,"fa-swap-opacity",r.swapOpacity),a);return Object.keys($).map(function(I){return $[I]?I:null}).filter(function(I){return I})}function t4(r){return r=r-0,r===r}function Zg(r){return t4(r)?r:(r=r.replace(/[\-_\s]+(.)?/g,function(a,o){return o?o.toUpperCase():""}),r.substr(0,1).toLowerCase()+r.substr(1))}var r4=["style"];function n4(r){return r.charAt(0).toUpperCase()+r.slice(1)}function a4(r){return r.split(";").map(function(a){return a.trim()}).filter(function(a){return a}).reduce(function(a,o){var c=o.indexOf(":"),l=Zg(o.slice(0,c)),u=o.slice(c+1).trim();return l.startsWith("webkit")?a[n4(l)]=u:a[l]=u,a},{})}function qg(r,a){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof a=="string")return a;var c=(a.children||[]).map(function(m){return qg(r,m)}),l=Object.keys(a.attributes||{}).reduce(function(m,v){var x=a.attributes[v];switch(v){case"class":m.attrs.className=x,delete a.attributes.class;break;case"style":m.attrs.style=a4(x);break;default:v.indexOf("aria-")===0||v.indexOf("data-")===0?m.attrs[v.toLowerCase()]=x:m.attrs[Zg(v)]=x}return m},{attrs:{}}),u=o.style,d=u===void 0?{}:u,p=Y3(o,r4);return l.attrs.style=ur(ur({},l.attrs.style),d),r.apply(void 0,[a.tag,ur(ur({},l.attrs),p)].concat(Bd(c)))}var Hg=!1;try{Hg=!0}catch{}function o4(){if(!Hg&&console&&typeof console.error=="function"){var r;(r=console).error.apply(r,arguments)}}function F0(r){if(r&&ks(r)==="object"&&r.prefix&&r.iconName&&r.icon)return r;if(Ud.icon)return Ud.icon(r);if(r===null)return null;if(r&&ks(r)==="object"&&r.prefix&&r.iconName)return r;if(Array.isArray(r)&&r.length===2)return{prefix:r[0],iconName:r[1]};if(typeof r=="string")return{prefix:"fas",iconName:r}}function Lc(r,a){return Array.isArray(a)&&a.length>0||!Array.isArray(a)&&a?ja({},r,a):{}}var D0={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},X=Ue.forwardRef(function(r,a){var o=ur(ur({},D0),r),c=o.icon,l=o.mask,u=o.symbol,d=o.className,p=o.title,m=o.titleId,v=o.maskId,x=F0(c),g=Lc("classes",[].concat(Bd(e4(o)),Bd((d||"").split(" ")))),y=Lc("transform",typeof o.transform=="string"?Ud.transform(o.transform):o.transform),E=Lc("mask",F0(l)),A=Z3(x,ur(ur(ur(ur({},g),y),E),{},{symbol:u,title:p,titleId:m,maskId:v}));if(!A)return o4("Could not find icon",x),null;var N=A.abstract,w={ref:a};return Object.keys(o).forEach(function(S){D0.hasOwnProperty(S)||(w[S]=o[S])}),i4(N[0],w)});X.displayName="FontAwesomeIcon";X.propTypes={beat:$e.bool,border:$e.bool,beatFade:$e.bool,bounce:$e.bool,className:$e.string,fade:$e.bool,flash:$e.bool,mask:$e.oneOfType([$e.object,$e.array,$e.string]),maskId:$e.string,fixedWidth:$e.bool,inverse:$e.bool,flip:$e.oneOf([!0,!1,"horizontal","vertical","both"]),icon:$e.oneOfType([$e.object,$e.array,$e.string]),listItem:$e.bool,pull:$e.oneOf(["right","left"]),pulse:$e.bool,rotation:$e.oneOf([0,90,180,270]),shake:$e.bool,size:$e.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:$e.bool,spinPulse:$e.bool,spinReverse:$e.bool,symbol:$e.oneOfType([$e.bool,$e.string]),title:$e.string,titleId:$e.string,transform:$e.oneOfType([$e.string,$e.object]),swapOpacity:$e.bool};var i4=qg.bind(null,Ue.createElement);/*!
* Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
* License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
* Copyright 2024 Fonticons, Inc.
*/const s4={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]},l4=s4,qd={prefix:"fas",iconName:"fire-flame-simple",icon:[384,512,["burn"],"f46a","M372.5 256.5l-.7-1.9C337.8 160.8 282 76.5 209.1 8.5l-3.3-3C202.1 2 197.1 0 192 0s-10.1 2-13.8 5.5l-3.3 3C102 76.5 46.2 160.8 12.2 254.6l-.7 1.9C3.9 277.3 0 299.4 0 321.6C0 426.7 86.8 512 192 512s192-85.3 192-190.4c0-22.2-3.9-44.2-11.5-65.1zm-90.8 49.5c4.1 9.3 6.2 19.4 6.2 29.5c0 53-43 96.5-96 96.5s-96-43.5-96-96.5c0-10.1 2.1-20.3 6.2-29.5l1.9-4.3c15.8-35.4 37.9-67.7 65.3-95.1l8.9-8.9c3.6-3.6 8.5-5.6 13.6-5.6s10 2 13.6 5.6l8.9 8.9c27.4 27.4 49.6 59.7 65.3 95.1l1.9 4.3z"]},c4={prefix:"fas",iconName:"bars",icon:[448,512,["navicon"],"f0c9","M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"]},u4={prefix:"fas",iconName:"square-check",icon:[448,512,[9745,9989,61510,"check-square"],"f14a","M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},d4=u4,f4={prefix:"fas",iconName:"list",icon:[512,512,["list-squares"],"f03a","M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"]},p4={prefix:"fas",iconName:"gamepad",icon:[640,512,[],"f11b","M192 64C86 64 0 150 0 256S86 448 192 448l256 0c106 0 192-86 192-192s-86-192-192-192L192 64zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24l0 32 32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-32-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l32 0 0-32z"]},Wg={prefix:"fas",iconName:"lock",icon:[448,512,[128274],"f023","M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"]},Ro={prefix:"fas",iconName:"eye-slash",icon:[640,512,[],"f070","M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"]},m4={prefix:"fas",iconName:"chevron-up",icon:[512,512,[],"f077","M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"]},_a={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"]},Gg={prefix:"fas",iconName:"right-to-bracket",icon:[512,512,["sign-in-alt"],"f2f6","M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"]},h4={prefix:"fas",iconName:"circle-check",icon:[512,512,[61533,"check-circle"],"f058","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},Ns=h4,Kg={prefix:"fas",iconName:"certificate",icon:[512,512,[],"f0a3","M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.4-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z"]},g4={prefix:"fas",iconName:"shield-halved",icon:[512,512,["shield-alt"],"f3ed","M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z"]},v4=g4,Ss={prefix:"fas",iconName:"chart-line",icon:[512,512,["line-chart"],"f201","M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]},vs={prefix:"fas",iconName:"arrow-right",icon:[448,512,[8594],"f061","M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]},x4={prefix:"fas",iconName:"circle-question",icon:[512,512,[62108,"question-circle"],"f059","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]},Mr=x4,$o={prefix:"fas",iconName:"eye",icon:[576,512,[128065],"f06e","M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"]},b4={prefix:"fas",iconName:"arrow-rotate-right",icon:[512,512,[8635,"arrow-right-rotate","arrow-rotate-forward","redo"],"f01e","M386.3 160L336 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"]},y4=b4,Yg={prefix:"fas",iconName:"arrow-left",icon:[448,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},w4={prefix:"fas",iconName:"circle-info",icon:[512,512,["info-circle"],"f05a","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},Co=w4,pr={prefix:"fas",iconName:"calendar-check",icon:[448,512,[],"f274","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"]},k4={prefix:"fas",iconName:"rectangle-list",icon:[576,512,["list-alt"],"f022","M0 96C0 60.7 28.7 32 64 32l448 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM128 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm32-128a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0z"]},Rc=k4,Vg={prefix:"fas",iconName:"house",icon:[576,512,[127968,63498,63500,"home","home-alt","home-lg-alt"],"f015","M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"]},N4=Vg,Io={prefix:"fas",iconName:"medal",icon:[512,512,[127941],"f5a2","M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"]},us={prefix:"fas",iconName:"arrow-down",icon:[384,512,[8595],"f063","M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]},S4={prefix:"fas",iconName:"chevron-down",icon:[512,512,[],"f078","M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]},j4={prefix:"fas",iconName:"ranking-star",icon:[640,512,[],"e561","M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32l0 192c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-192c0-17.7-14.3-32-32-32l-128 0zM32 320c-17.7 0-32 14.3-32 32L0 480c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L32 320zm416 96l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0c-17.7 0-32 14.3-32 32z"]},ds={prefix:"fas",iconName:"arrow-up",icon:[384,512,[8593],"f062","M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"]},U0={prefix:"fas",iconName:"circle-user",icon:[512,512,[62142,"user-circle"],"f2bd","M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"]},Qg={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"]},E4=Qg,_4={prefix:"fas",iconName:"chalkboard-user",icon:[640,512,["chalkboard-teacher"],"f51c","M160 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-239.2 0c-11.8-25.5-29.9-47.5-52.4-64l99.6 0 0-32c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 32 64 0 0-288L224 64l0 49.1C205.2 102.2 183.3 96 160 96l0-32zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352l53.3 0C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7L26.7 512C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"]},A4=_4,$c={prefix:"fas",iconName:"chevron-right",icon:[320,512,[9002],"f054","M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"]},Pt={prefix:"fas",iconName:"trophy",icon:[576,512,[127942],"f091","M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"]},Ca={prefix:"fas",iconName:"spinner",icon:[512,512,[],"f110","M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"]},js={prefix:"fas",iconName:"award",icon:[384,512,[],"f559","M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"]},Es={prefix:"fas",iconName:"shield",icon:[512,512,[128737,"shield-blank"],"f132","M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"]},C4={prefix:"fas",iconName:"book",icon:[448,512,[128212],"f02d","M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"]},To={prefix:"fas",iconName:"check",icon:[448,512,[10003,10004],"f00c","M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"]},z4={prefix:"fas",iconName:"triangle-exclamation",icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"]},Zo=z4,M4={prefix:"fas",iconName:"circle-xmark",icon:[512,512,[61532,"times-circle","xmark-circle"],"f057","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"]},O4=M4,_s={prefix:"fas",iconName:"graduation-cap",icon:[640,512,[127891,"mortar-board"],"f19d","M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"]},P4=()=>{const[r,a]=z.useState(!1),[o,c]=z.useState(!1),[l,u]=z.useState(!1),[d,p]=z.useState(!1),[m,v]=z.useState({username:"",password:""}),[x,g]=z.useState(null),y=20;z.useEffect(()=>(window.onbeforeunload=null,()=>{window.onbeforeunload=null}),[]),z.useEffect(()=>{const S=localStorage.getItem("rememberedUser");if(S)try{const k=JSON.parse(S);v({username:k.username||"",password:k.password||""}),p(!0),console.log("Loaded remembered credentials for:",k.username)}catch(k){console.error("Error parsing saved credentials:",k),localStorage.removeItem("rememberedUser")}},[]);const E=S=>{const{name:k,value:C}=S.target;C.length<=y&&v($=>({...$,[k]:C}))},A=S=>{p(S.target.checked)},N=async S=>{if(S.preventDefault(),!m.username||!m.password){we.error("Please fill in all fields");return}c(!0);try{console.log("Attempting login with:",{username:m.username,remember_me:d});const k=await fetch("http://localhost:5000/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:m.username,password:m.password,remember_me:d})}),C=await k.json();if(console.log("server response:",C),!k.ok)throw new Error(C.error||"Login Failed");g(C),d?(console.log("Storing credentials in localStorage"),localStorage.setItem("rememberedUser",JSON.stringify({username:m.username,password:m.password,token:C.remember_token}))):localStorage.removeItem("rememberedUser"),setTimeout(()=>{c(!1),a(!0)},1500)}catch(k){console.error("Login error:",k),c(!1),we.error(k.message)}},w=()=>{sessionStorage.setItem("isAuthenticated","true"),sessionStorage.setItem("username",m.username),x&&x.user&&x.user.id?sessionStorage.setItem("userId",x.user.id.toString()):(sessionStorage.setItem("userId","1"),console.warn("UserId, not found in login response, using default")),we.success("Login successful!",{position:"top-center",autoClose:1500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark",onClose:()=>{window.location.href=Ee.DASHBOARD}})};return s.jsx(s.Fragment,{children:r?s.jsx(lg,{onSuccess:w,onCancel:()=>a(!1)}):s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"sidebar",children:s.jsx("h3",{className:"sidebar-title",children:"Social Engineering Application"})}),s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"form-container",children:[s.jsx("h2",{children:"Welcome Back!"}),s.jsxs("form",{className:"login-form",onSubmit:N,children:[s.jsxs("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",htmlFor:"username",children:"Username:"}),s.jsxs("div",{className:"input-wrapper",children:[s.jsx("input",{type:"text",id:"username",name:"username",placeholder:"Enter your Username",className:"form-input",value:m.username,onChange:E,required:!0,disabled:o}),s.jsxs("span",{className:"char-count",children:[m.username.length,"/",y]})]})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",htmlFor:"password",children:"Password:"}),s.jsxs("div",{className:"input-wrapper",children:[s.jsx("input",{type:l?"text":"password",id:"password",name:"password",placeholder:"Enter your password",className:"form-input",value:m.password,onChange:E,required:!0,disabled:o}),s.jsx("button",{type:"button",className:"toggle-password-btn",onClick:()=>u(!l),"aria-label":l?"Hide password":"Show password",children:s.jsx(X,{icon:l?$o:Ro,style:{color:"#ffffff"}})}),s.jsxs("span",{className:"char-count",children:[m.password.length,"/",y]})]})]}),s.jsxs("div",{className:"login-options-row",children:[s.jsx("div",{className:"remember-me-container",children:s.jsxs("label",{className:"remember-me-label",children:[s.jsx("input",{type:"checkbox",checked:d,onChange:A,className:"remember-me-checkbox"}),s.jsx("span",{children:"Keep me logged in "})]})}),s.jsx("div",{className:"forgot-password-container",children:s.jsx(zr,{to:Ee.FORGOT_PASSWORD,className:"forgot-password-link",children:"Forgot Password?"})})]}),s.jsx("button",{type:"submit",className:"login-btn",disabled:o,children:o?s.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[s.jsx("span",{style:{width:"20px",height:"20px",border:"3px solid #ffffff",borderTop:"3px solid transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}),"Verifying..."]}):s.jsxs(s.Fragment,{children:[s.jsx("span",{children:"Login"}),s.jsx(X,{icon:Gg,style:{marginLeft:"8px"}})]})}),s.jsxs("div",{className:"register-container",children:[s.jsx("span",{children:"Don't have an account? "}),s.jsx(zr,{to:Ee.REGISTER,className:"register-link",children:"Register here"})]})]})]})}),s.jsx("style",{jsx:!0,children:`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            .login-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
            }
            .char-count {
              top: 28px !important;
            }
            .toggle-password-btn {
              top: 28px !important;
            }
            .login-options-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 0.75rem 0 1rem 0;
            }
            .remember-me-container {
              display: flex;
              align-items: center;
              height: 10px;
            }
            .remember-me-label {
              display: flex;
              align-items: center;
              cursor: pointer;
              user-select: none;
              font-size: 0.9rem;
              margin-top: -5px;
            }
            .remember-me-checkbox {
              margin-right: 8px;
              width: 16px;
              height: 16px;
              cursor: pointer;
            }
            .forgot-password-container {
              text-align: right;
              position: relative;
              z-index: 1;
              margin-top: -5px;
            }
            .forgot-password-link {
              color: #646cff;
              font-size: 0.9rem;
              text-decoration: none;
              display: inline-block;
            }
            .forgot-password-link:hover {
              text-decoration: underline;
            }
          `})]})})};var Ic={exports:{}},Tc={exports:{}},Fc={exports:{}},B0;function ce(){return B0||(B0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=c;function o(l){"@babel/helpers - typeof";return o=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(u){return typeof u}:function(u){return u&&typeof Symbol=="function"&&u.constructor===Symbol&&u!==Symbol.prototype?"symbol":typeof u},o(l)}function c(l){var u=typeof l=="string"||l instanceof String;if(!u){var d=o(l);throw l===null?d="null":d==="object"&&(d=l.constructor.name),new TypeError("Expected a string but received a ".concat(d))}}r.exports=a.default,r.exports.default=a.default}(Fc,Fc.exports)),Fc.exports}var Z0;function ff(){return Z0||(Z0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,o.default)(u),u=Date.parse(u),isNaN(u)?null:new Date(u)}r.exports=a.default,r.exports.default=a.default}(Tc,Tc.exports)),Tc.exports}var Dc={exports:{}},fa={},et={},q0;function qo(){if(q0)return et;q0=1,Object.defineProperty(et,"__esModule",{value:!0}),et.farsiLocales=et.englishLocales=et.dotDecimal=et.decimal=et.commaDecimal=et.bengaliLocales=et.arabicLocales=et.alphanumeric=et.alpha=void 0;for(var r=et.alpha={"en-US":/^[A-Z]+$/i,"az-AZ":/^[A-VXYZÇƏĞİıÖŞÜ]+$/i,"bg-BG":/^[А-Я]+$/i,"cs-CZ":/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,"da-DK":/^[A-ZÆØÅ]+$/i,"de-DE":/^[A-ZÄÖÜß]+$/i,"el-GR":/^[Α-ώ]+$/i,"es-ES":/^[A-ZÁÉÍÑÓÚÜ]+$/i,"fa-IR":/^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,"fi-FI":/^[A-ZÅÄÖ]+$/i,"fr-FR":/^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,"it-IT":/^[A-ZÀÉÈÌÎÓÒÙ]+$/i,"ja-JP":/^[ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,"nb-NO":/^[A-ZÆØÅ]+$/i,"nl-NL":/^[A-ZÁÉËÏÓÖÜÚ]+$/i,"nn-NO":/^[A-ZÆØÅ]+$/i,"hu-HU":/^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,"pl-PL":/^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,"pt-PT":/^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,"ru-RU":/^[А-ЯЁ]+$/i,"kk-KZ":/^[А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,"sl-SI":/^[A-ZČĆĐŠŽ]+$/i,"sk-SK":/^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,"sr-RS@latin":/^[A-ZČĆŽŠĐ]+$/i,"sr-RS":/^[А-ЯЂЈЉЊЋЏ]+$/i,"sv-SE":/^[A-ZÅÄÖ]+$/i,"th-TH":/^[ก-๐\s]+$/i,"tr-TR":/^[A-ZÇĞİıÖŞÜ]+$/i,"uk-UA":/^[А-ЩЬЮЯЄIЇҐі]+$/i,"vi-VN":/^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,"ko-KR":/^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/,"ku-IQ":/^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,ar:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,he:/^[א-ת]+$/,fa:/^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,bn:/^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,eo:/^[ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,"hi-IN":/^[\u0900-\u0961]+[\u0972-\u097F]*$/i,"si-LK":/^[\u0D80-\u0DFF]+$/},a=et.alphanumeric={"en-US":/^[0-9A-Z]+$/i,"az-AZ":/^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,"bg-BG":/^[0-9А-Я]+$/i,"cs-CZ":/^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,"da-DK":/^[0-9A-ZÆØÅ]+$/i,"de-DE":/^[0-9A-ZÄÖÜß]+$/i,"el-GR":/^[0-9Α-ω]+$/i,"es-ES":/^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,"fi-FI":/^[0-9A-ZÅÄÖ]+$/i,"fr-FR":/^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,"it-IT":/^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,"ja-JP":/^[0-9０-９ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,"hu-HU":/^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,"nb-NO":/^[0-9A-ZÆØÅ]+$/i,"nl-NL":/^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,"nn-NO":/^[0-9A-ZÆØÅ]+$/i,"pl-PL":/^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,"pt-PT":/^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,"ru-RU":/^[0-9А-ЯЁ]+$/i,"kk-KZ":/^[0-9А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,"sl-SI":/^[0-9A-ZČĆĐŠŽ]+$/i,"sk-SK":/^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,"sr-RS@latin":/^[0-9A-ZČĆŽŠĐ]+$/i,"sr-RS":/^[0-9А-ЯЂЈЉЊЋЏ]+$/i,"sv-SE":/^[0-9A-ZÅÄÖ]+$/i,"th-TH":/^[ก-๙\s]+$/i,"tr-TR":/^[0-9A-ZÇĞİıÖŞÜ]+$/i,"uk-UA":/^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,"ko-KR":/^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,"ku-IQ":/^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,"vi-VN":/^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,ar:/^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,he:/^[0-9א-ת]+$/,fa:/^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,bn:/^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,eo:/^[0-9ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,"hi-IN":/^[\u0900-\u0963]+[\u0966-\u097F]*$/i,"si-LK":/^[0-9\u0D80-\u0DFF]+$/},o=et.decimal={"en-US":".",ar:"٫"},c=et.englishLocales=["AU","GB","HK","IN","NZ","ZA","ZM"],l,u=0;u<c.length;u++)l="en-".concat(c[u]),r[l]=r["en-US"],a[l]=a["en-US"],o[l]=o["en-US"];for(var d=et.arabicLocales=["AE","BH","DZ","EG","IQ","JO","KW","LB","LY","MA","QM","QA","SA","SD","SY","TN","YE"],p,m=0;m<d.length;m++)p="ar-".concat(d[m]),r[p]=r.ar,a[p]=a.ar,o[p]=o.ar;for(var v=et.farsiLocales=["IR","AF"],x,g=0;g<v.length;g++)x="fa-".concat(v[g]),a[x]=a.fa,o[x]=o.ar;for(var y=et.bengaliLocales=["BD","IN"],E,A=0;A<y.length;A++)E="bn-".concat(y[A]),r[E]=r.bn,a[E]=a.bn,o[E]=o["en-US"];for(var N=et.dotDecimal=["ar-EG","ar-LB","ar-LY"],w=et.commaDecimal=["bg-BG","cs-CZ","da-DK","de-DE","el-GR","en-ZM","eo","es-ES","fr-CA","fr-FR","id-ID","it-IT","ku-IQ","hi-IN","hu-HU","nb-NO","nn-NO","nl-NL","pl-PL","pt-PT","ru-RU","kk-KZ","si-LK","sl-SI","sr-RS@latin","sr-RS","sv-SE","tr-TR","uk-UA","vi-VN"],S=0;S<N.length;S++)o[N[S]]=o["en-US"];for(var k=0;k<w.length;k++)o[w[k]]=",";return r["fr-CA"]=r["fr-FR"],a["fr-CA"]=a["fr-FR"],r["pt-BR"]=r["pt-PT"],a["pt-BR"]=a["pt-PT"],o["pt-BR"]=o["pt-PT"],r["pl-Pl"]=r["pl-PL"],a["pl-Pl"]=a["pl-PL"],o["pl-Pl"]=o["pl-PL"],r["fa-AF"]=r.fa,et}var H0;function Xg(){if(H0)return fa;H0=1,Object.defineProperty(fa,"__esModule",{value:!0}),fa.default=c,fa.locales=void 0;var r=o(ce()),a=qo();function o(l){return l&&l.__esModule?l:{default:l}}function c(l,u){(0,r.default)(l),u=u||{};var d=new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(u.locale?a.decimal[u.locale]:".","[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));if(l===""||l==="."||l===","||l==="-"||l==="+")return!1;var p=parseFloat(l.replace(",","."));return d.test(l)&&(!u.hasOwnProperty("min")||p>=u.min)&&(!u.hasOwnProperty("max")||p<=u.max)&&(!u.hasOwnProperty("lt")||p<u.lt)&&(!u.hasOwnProperty("gt")||p>u.gt)}return fa.locales=Object.keys(a.decimal),fa}var W0;function Jg(){return W0||(W0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(Xg());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,o.default)(u)?parseFloat(u):NaN}r.exports=a.default,r.exports.default=a.default}(Dc,Dc.exports)),Dc.exports}var Uc={exports:{}},G0;function L4(){return G0||(G0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){return(0,o.default)(u),parseInt(u,d||10)}r.exports=a.default,r.exports.default=a.default}(Uc,Uc.exports)),Uc.exports}var Bc={exports:{}},K0;function R4(){return K0||(K0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){return(0,o.default)(u),d?u==="1"||/^true$/i.test(u):u!=="0"&&!/^false$/i.test(u)&&u!==""}r.exports=a.default,r.exports.default=a.default}(Bc,Bc.exports)),Bc.exports}var Zc={exports:{}},Y0;function $4(){return Y0||(Y0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){return(0,o.default)(u),u===d}r.exports=a.default,r.exports.default=a.default}(Zc,Zc.exports)),Zc.exports}var qc={exports:{}},Hc={exports:{}},V0;function e2(){return V0||(V0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=c;function o(l){"@babel/helpers - typeof";return o=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(u){return typeof u}:function(u){return u&&typeof Symbol=="function"&&u.constructor===Symbol&&u!==Symbol.prototype?"symbol":typeof u},o(l)}function c(l){return o(l)==="object"&&l!==null?typeof l.toString=="function"?l=l.toString():l="[object Object]":(l===null||typeof l>"u"||isNaN(l)&&!l.length)&&(l=""),String(l)}r.exports=a.default,r.exports.default=a.default}(Hc,Hc.exports)),Hc.exports}var Wc={exports:{}},Q0;function wt(){return Q0||(Q0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=o;function o(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},l=arguments.length>1?arguments[1]:void 0;for(var u in l)typeof c[u]>"u"&&(c[u]=l[u]);return c}r.exports=a.default,r.exports.default=a.default}(Wc,Wc.exports)),Wc.exports}var X0;function I4(){return X0||(X0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var o=u(ce()),c=u(e2()),l=u(wt());function u(m){return m&&m.__esModule?m:{default:m}}var d={ignoreCase:!1,minOccurrences:1};function p(m,v,x){return(0,o.default)(m),x=(0,l.default)(x,d),x.ignoreCase?m.toLowerCase().split((0,c.default)(v).toLowerCase()).length>x.minOccurrences:m.split((0,c.default)(v)).length>x.minOccurrences}r.exports=a.default,r.exports.default=a.default}(qc,qc.exports)),qc.exports}var Gc={exports:{}},J0;function T4(){return J0||(J0=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d,p){return(0,o.default)(u),Object.prototype.toString.call(d)!=="[object RegExp]"&&(d=new RegExp(d,p)),!!u.match(d)}r.exports=a.default,r.exports.default=a.default}(Gc,Gc.exports)),Gc.exports}var Kc={exports:{}},Yc={exports:{}},e1;function t2(){return e1||(e1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}function l(d){"@babel/helpers - typeof";return l=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(p){return typeof p}:function(p){return p&&typeof Symbol=="function"&&p.constructor===Symbol&&p!==Symbol.prototype?"symbol":typeof p},l(d)}function u(d,p){(0,o.default)(d);var m,v;l(p)==="object"?(m=p.min||0,v=p.max):(m=arguments[1],v=arguments[2]);var x=encodeURI(d).split(/%..|./).length-1;return x>=m&&(typeof v>"u"||x<=v)}r.exports=a.default,r.exports.default=a.default}(Yc,Yc.exports)),Yc.exports}var Vc={exports:{}},t1;function pf(){return t1||(t1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=l(ce()),c=l(wt());function l(p){return p&&p.__esModule?p:{default:p}}var u={require_tld:!0,allow_underscores:!1,allow_trailing_dot:!1,allow_numeric_tld:!1,allow_wildcard:!1,ignore_max_length:!1};function d(p,m){(0,o.default)(p),m=(0,c.default)(m,u),m.allow_trailing_dot&&p[p.length-1]==="."&&(p=p.substring(0,p.length-1)),m.allow_wildcard===!0&&p.indexOf("*.")===0&&(p=p.substring(2));var v=p.split("."),x=v[v.length-1];return m.require_tld&&(v.length<2||!m.allow_numeric_tld&&!/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(x)||/\s/.test(x))||!m.allow_numeric_tld&&/^\d+$/.test(x)?!1:v.every(function(g){return!(g.length>63&&!m.ignore_max_length||!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(g)||/[\uff01-\uff5e]/.test(g)||/^-|-$/.test(g)||!m.allow_underscores&&/_/.test(g))})}r.exports=a.default,r.exports.default=a.default}(Vc,Vc.exports)),Vc.exports}var Qc={exports:{}},r1;function Is(){return r1||(r1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=v;var o=c(ce());function c(x){return x&&x.__esModule?x:{default:x}}var l="(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])",u="(".concat(l,"[.]){3}").concat(l),d=new RegExp("^".concat(u,"$")),p="(?:[0-9a-fA-F]{1,4})",m=new RegExp("^("+"(?:".concat(p,":){7}(?:").concat(p,"|:)|")+"(?:".concat(p,":){6}(?:").concat(u,"|:").concat(p,"|:)|")+"(?:".concat(p,":){5}(?::").concat(u,"|(:").concat(p,"){1,2}|:)|")+"(?:".concat(p,":){4}(?:(:").concat(p,"){0,1}:").concat(u,"|(:").concat(p,"){1,3}|:)|")+"(?:".concat(p,":){3}(?:(:").concat(p,"){0,2}:").concat(u,"|(:").concat(p,"){1,4}|:)|")+"(?:".concat(p,":){2}(?:(:").concat(p,"){0,3}:").concat(u,"|(:").concat(p,"){1,5}|:)|")+"(?:".concat(p,":){1}(?:(:").concat(p,"){0,4}:").concat(u,"|(:").concat(p,"){1,6}|:)|")+"(?::((?::".concat(p,"){0,5}:").concat(u,"|(?::").concat(p,"){1,7}|:))")+")(%[0-9a-zA-Z-.:]{1,})?$");function v(x){var g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return(0,o.default)(x),g=String(g),g?g==="4"?d.test(x):g==="6"?m.test(x):!1:v(x,4)||v(x,6)}r.exports=a.default,r.exports.default=a.default}(Qc,Qc.exports)),Qc.exports}var n1;function r2(){return n1||(n1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=S;var o=p(ce()),c=p(t2()),l=p(pf()),u=p(Is()),d=p(wt());function p(k){return k&&k.__esModule?k:{default:k}}var m={allow_display_name:!1,allow_underscores:!1,require_display_name:!1,allow_utf8_local_part:!0,require_tld:!0,blacklisted_chars:"",ignore_max_length:!1,host_blacklist:[],host_whitelist:[]},v=/^([^\x00-\x1F\x7F-\x9F\cX]+)</i,x=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i,g=/^[a-z\d]+$/,y=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i,E=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i,A=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i,N=254;function w(k){var C=k.replace(/^"(.+)"$/,"$1");if(!C.trim())return!1;var $=/[\.";<>]/.test(C);if($){if(C===k)return!1;var I=C.split('"').length===C.split('\\"').length;if(!I)return!1}return!0}function S(k,C){if((0,o.default)(k),C=(0,d.default)(C,m),C.require_display_name||C.allow_display_name){var $=k.match(v);if($){var I=$[1];if(k=k.replace(I,"").replace(/(^<|>$)/g,""),I.endsWith(" ")&&(I=I.slice(0,-1)),!w(I))return!1}else if(C.require_display_name)return!1}if(!C.ignore_max_length&&k.length>N)return!1;var q=k.split("@"),Z=q.pop(),H=Z.toLowerCase();if(C.host_blacklist.includes(H)||C.host_whitelist.length>0&&!C.host_whitelist.includes(H))return!1;var Y=q.join("@");if(C.domain_specific_validation&&(H==="gmail.com"||H==="googlemail.com")){Y=Y.toLowerCase();var R=Y.split("+")[0];if(!(0,c.default)(R.replace(/\./g,""),{min:6,max:30}))return!1;for(var te=R.split("."),pe=0;pe<te.length;pe++)if(!g.test(te[pe]))return!1}if(C.ignore_max_length===!1&&(!(0,c.default)(Y,{max:64})||!(0,c.default)(Z,{max:254})))return!1;if(!(0,l.default)(Z,{require_tld:C.require_tld,ignore_max_length:C.ignore_max_length,allow_underscores:C.allow_underscores})){if(!C.allow_ip_domain)return!1;if(!(0,u.default)(Z)){if(!Z.startsWith("[")||!Z.endsWith("]"))return!1;var J=Z.slice(1,-1);if(J.length===0||!(0,u.default)(J))return!1}}if(Y[0]==='"')return Y=Y.slice(1,Y.length-1),C.allow_utf8_local_part?A.test(Y):y.test(Y);for(var fe=C.allow_utf8_local_part?E:x,G=Y.split("."),ae=0;ae<G.length;ae++)if(!fe.test(G[ae]))return!1;return!(C.blacklisted_chars&&Y.search(new RegExp("[".concat(C.blacklisted_chars,"]+"),"g"))!==-1)}r.exports=a.default,r.exports.default=a.default}(Kc,Kc.exports)),Kc.exports}var Xc={exports:{}},a1;function F4(){return a1||(a1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=S;var o=d(ce()),c=d(pf()),l=d(Is()),u=d(wt());function d(k){return k&&k.__esModule?k:{default:k}}function p(k,C){return y(k)||g(k,C)||v(k,C)||m()}function m(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function v(k,C){if(k){if(typeof k=="string")return x(k,C);var $=Object.prototype.toString.call(k).slice(8,-1);if($==="Object"&&k.constructor&&($=k.constructor.name),$==="Map"||$==="Set")return Array.from(k);if($==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test($))return x(k,C)}}function x(k,C){(C==null||C>k.length)&&(C=k.length);for(var $=0,I=new Array(C);$<C;$++)I[$]=k[$];return I}function g(k,C){var $=k==null?null:typeof Symbol<"u"&&k[Symbol.iterator]||k["@@iterator"];if($!=null){var I,q,Z,H,Y=[],R=!0,te=!1;try{if(Z=($=$.call(k)).next,C!==0)for(;!(R=(I=Z.call($)).done)&&(Y.push(I.value),Y.length!==C);R=!0);}catch(pe){te=!0,q=pe}finally{try{if(!R&&$.return!=null&&(H=$.return(),Object(H)!==H))return}finally{if(te)throw q}}return Y}}function y(k){if(Array.isArray(k))return k}var E={protocols:["http","https","ftp"],require_tld:!0,require_protocol:!1,require_host:!0,require_port:!1,require_valid_protocol:!0,allow_underscores:!1,allow_trailing_dot:!1,allow_protocol_relative_urls:!1,allow_fragments:!0,allow_query_components:!0,validate_length:!0},A=/^\[([^\]]+)\](?::([0-9]+))?$/;function N(k){return Object.prototype.toString.call(k)==="[object RegExp]"}function w(k,C){for(var $=0;$<C.length;$++){var I=C[$];if(k===I||N(I)&&I.test(k))return!0}return!1}function S(k,C){if((0,o.default)(k),!k||/[\s<>]/.test(k)||k.indexOf("mailto:")===0||(C=(0,u.default)(C,E),C.validate_length&&k.length>=2083)||!C.allow_fragments&&k.includes("#")||!C.allow_query_components&&(k.includes("?")||k.includes("&")))return!1;var $,I,q,Z,H,Y,R,te;if(R=k.split("#"),k=R.shift(),R=k.split("?"),k=R.shift(),R=k.split("://"),R.length>1){if($=R.shift().toLowerCase(),C.require_valid_protocol&&C.protocols.indexOf($)===-1)return!1}else{if(C.require_protocol)return!1;if(k.slice(0,2)==="//"){if(!C.allow_protocol_relative_urls)return!1;R[0]=k.slice(2)}}if(k=R.join("://"),k==="")return!1;if(R=k.split("/"),k=R.shift(),k===""&&!C.require_host)return!0;if(R=k.split("@"),R.length>1){if(C.disallow_auth||R[0]===""||(I=R.shift(),I.indexOf(":")>=0&&I.split(":").length>2))return!1;var pe=I.split(":"),J=p(pe,2),fe=J[0],G=J[1];if(fe===""&&G==="")return!1}Z=R.join("@"),Y=null,te=null;var ae=Z.match(A);if(ae?(q="",te=ae[1],Y=ae[2]||null):(R=Z.split(":"),q=R.shift(),R.length&&(Y=R.join(":"))),Y!==null&&Y.length>0){if(H=parseInt(Y,10),!/^[0-9]+$/.test(Y)||H<=0||H>65535)return!1}else if(C.require_port)return!1;return C.host_whitelist?w(q,C.host_whitelist):q===""&&!C.require_host?!0:!(!(0,l.default)(q)&&!(0,c.default)(q,C)&&(!te||!(0,l.default)(te,6))||(q=q||te,C.host_blacklist&&w(q,C.host_blacklist)))}r.exports=a.default,r.exports.default=a.default}(Xc,Xc.exports)),Xc.exports}var Jc={exports:{}},o1;function D4(){return o1||(o1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=x;var o=c(ce());function c(g){return g&&g.__esModule?g:{default:g}}var l=/^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){4}([0-9a-fA-F]{2})$/,u=/^([0-9a-fA-F]){12}$/,d=/^([0-9a-fA-F]{4}\.){2}([0-9a-fA-F]{4})$/,p=/^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){6}([0-9a-fA-F]{2})$/,m=/^([0-9a-fA-F]){16}$/,v=/^([0-9a-fA-F]{4}\.){3}([0-9a-fA-F]{4})$/;function x(g,y){return(0,o.default)(g),y!=null&&y.eui&&(y.eui=String(y.eui)),y!=null&&y.no_colons||y!=null&&y.no_separators?y.eui==="48"?u.test(g):y.eui==="64"?m.test(g):u.test(g)||m.test(g):(y==null?void 0:y.eui)==="48"?l.test(g)||d.test(g):(y==null?void 0:y.eui)==="64"?p.test(g)||v.test(g):x(g,{eui:"48"})||x(g,{eui:"64"})}r.exports=a.default,r.exports.default=a.default}(Jc,Jc.exports)),Jc.exports}var eu={exports:{}},i1;function U4(){return i1||(i1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=m;var o=l(ce()),c=l(Is());function l(v){return v&&v.__esModule?v:{default:v}}var u=/^\d{1,3}$/,d=32,p=128;function m(v){var x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";(0,o.default)(v);var g=v.split("/");if(g.length!==2||!u.test(g[1])||g[1].length>1&&g[1].startsWith("0"))return!1;var y=(0,c.default)(g[0],x);if(!y)return!1;var E=null;switch(String(x)){case"4":E=d;break;case"6":E=p;break;default:E=(0,c.default)(g[0],"6")?p:d}return g[1]<=E&&g[1]>=0}r.exports=a.default,r.exports.default=a.default}(eu,eu.exports)),eu.exports}var tu={exports:{}},s1;function n2(){return s1||(s1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=A;var o=c(wt());function c(N){return N&&N.__esModule?N:{default:N}}function l(N,w){return p(N)||d(N,w)||v(N,w)||u()}function u(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function d(N,w){var S=N==null?null:typeof Symbol<"u"&&N[Symbol.iterator]||N["@@iterator"];if(S!=null){var k,C,$,I,q=[],Z=!0,H=!1;try{if($=(S=S.call(N)).next,w!==0)for(;!(Z=(k=$.call(S)).done)&&(q.push(k.value),q.length!==w);Z=!0);}catch(Y){H=!0,C=Y}finally{try{if(!Z&&S.return!=null&&(I=S.return(),Object(I)!==I))return}finally{if(H)throw C}}return q}}function p(N){if(Array.isArray(N))return N}function m(N,w){var S=typeof Symbol<"u"&&N[Symbol.iterator]||N["@@iterator"];if(!S){if(Array.isArray(N)||(S=v(N))||w){S&&(N=S);var k=0,C=function(){};return{s:C,n:function(){return k>=N.length?{done:!0}:{done:!1,value:N[k++]}},e:function(Z){throw Z},f:C}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var $=!0,I=!1,q;return{s:function(){S=S.call(N)},n:function(){var Z=S.next();return $=Z.done,Z},e:function(Z){I=!0,q=Z},f:function(){try{!$&&S.return!=null&&S.return()}finally{if(I)throw q}}}}function v(N,w){if(N){if(typeof N=="string")return x(N,w);var S=Object.prototype.toString.call(N).slice(8,-1);if(S==="Object"&&N.constructor&&(S=N.constructor.name),S==="Map"||S==="Set")return Array.from(N);if(S==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(S))return x(N,w)}}function x(N,w){(w==null||w>N.length)&&(w=N.length);for(var S=0,k=new Array(w);S<w;S++)k[S]=N[S];return k}var g={format:"YYYY/MM/DD",delimiters:["/","-"],strictMode:!1};function y(N){return/(^(y{4}|y{2})[.\/-](m{1,2})[.\/-](d{1,2})$)|(^(m{1,2})[.\/-](d{1,2})[.\/-]((y{4}|y{2})$))|(^(d{1,2})[.\/-](m{1,2})[.\/-]((y{4}|y{2})$))/gi.test(N)}function E(N,w){for(var S=[],k=Math.min(N.length,w.length),C=0;C<k;C++)S.push([N[C],w[C]]);return S}function A(N,w){if(typeof w=="string"?w=(0,o.default)({format:w},g):w=(0,o.default)(w,g),typeof N=="string"&&y(w.format)){var S=w.delimiters.find(function(G){return w.format.indexOf(G)!==-1}),k=w.strictMode?S:w.delimiters.find(function(G){return N.indexOf(G)!==-1}),C=E(N.split(k),w.format.toLowerCase().split(S)),$={},I=m(C),q;try{for(I.s();!(q=I.n()).done;){var Z=l(q.value,2),H=Z[0],Y=Z[1];if(H.length!==Y.length)return!1;$[Y.charAt(0)]=H}}catch(G){I.e(G)}finally{I.f()}var R=$.y;if(R.startsWith("-"))return!1;if($.y.length===2){var te=parseInt($.y,10);if(isNaN(te))return!1;var pe=new Date().getFullYear()%100;te<pe?R="20".concat($.y):R="19".concat($.y)}var J=$.m;$.m.length===1&&(J="0".concat($.m));var fe=$.d;return $.d.length===1&&(fe="0".concat($.d)),new Date("".concat(R,"-").concat(J,"-").concat(fe,"T00:00:00.000Z")).getUTCDate()===+$.d}return w.strictMode?!1:Object.prototype.toString.call(N)==="[object Date]"&&isFinite(N)}r.exports=a.default,r.exports.default=a.default}(tu,tu.exports)),tu.exports}var ru={exports:{}},l1;function B4(){return l1||(l1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=c(wt());function c(p){return p&&p.__esModule?p:{default:p}}var l={hourFormat:"hour24",mode:"default"},u={hour24:{default:/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,withSeconds:/^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/},hour12:{default:/^(0?[1-9]|1[0-2]):([0-5][0-9]) (A|P)M$/,withSeconds:/^(0?[1-9]|1[0-2]):([0-5][0-9]):([0-5][0-9]) (A|P)M$/}};function d(p,m){return m=(0,o.default)(m,l),typeof p!="string"?!1:u[m.hourFormat][m.mode].test(p)}r.exports=a.default,r.exports.default=a.default}(ru,ru.exports)),ru.exports}var nu={exports:{}},c1;function Z4(){return c1||(c1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var o=c(ce());function c(m){return m&&m.__esModule?m:{default:m}}var l={loose:!1},u=["true","false","1","0"],d=[].concat(u,["yes","no"]);function p(m){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:l;return(0,o.default)(m),v.loose?d.includes(m.toLowerCase()):u.includes(m)}r.exports=a.default,r.exports.default=a.default}(nu,nu.exports)),nu.exports}var au={exports:{}},u1;function q4(){return u1||(u1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=k;var o=c(ce());function c(C){return C&&C.__esModule?C:{default:C}}var l="([A-Za-z]{3}(-[A-Za-z]{3}){0,2})",u="(([a-zA-Z]{2,3}(-".concat(l,")?)|([a-zA-Z]{5,8}))"),d="([A-Za-z]{4})",p="([A-Za-z]{2}|\\d{3})",m="([A-Za-z0-9]{5,8}|(\\d[A-Z-a-z0-9]{3}))",v="(\\d|[A-W]|[Y-Z]|[a-w]|[y-z])",x="(".concat(v,"(-[A-Za-z0-9]{2,8})+)"),g="(x(-[A-Za-z0-9]{1,8})+)",y="((en-GB-oed)|(i-ami)|(i-bnn)|(i-default)|(i-enochian)|(i-hak)|(i-klingon)|(i-lux)|(i-mingo)|(i-navajo)|(i-pwn)|(i-tao)|(i-tay)|(i-tsu)|(sgn-BE-FR)|(sgn-BE-NL)|(sgn-CH-DE))",E="((art-lojban)|(cel-gaulish)|(no-bok)|(no-nyn)|(zh-guoyu)|(zh-hakka)|(zh-min)|(zh-min-nan)|(zh-xiang))",A="(".concat(y,"|").concat(E,")"),N="(-|_)",w="".concat(u,"(").concat(N).concat(d,")?(").concat(N).concat(p,")?(").concat(N).concat(m,")*(").concat(N).concat(x,")*(").concat(N).concat(g,")?"),S=new RegExp("(^".concat(g,"$)|(^").concat(A,"$)|(^").concat(w,"$)"));function k(C){return(0,o.default)(C),S.test(C)}r.exports=a.default,r.exports.default=a.default}(au,au.exports)),au.exports}var ou={exports:{}},d1;function H4(){return d1||(d1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^(?!(1[3-9])|(20)|(3[3-9])|(4[0-9])|(5[0-9])|(60)|(7[3-9])|(8[1-9])|(9[0-2])|(9[3-9]))[0-9]{9}$/;function u(d){if((0,o.default)(d),!l.test(d))return!1;for(var p=0,m=0;m<d.length;m++)m%3===0?p+=d[m]*3:m%3===1?p+=d[m]*7:p+=d[m]*1;return p%10===0}r.exports=a.default,r.exports.default=a.default}(ou,ou.exports)),ou.exports}var pa={},f1;function W4(){if(f1)return pa;f1=1,Object.defineProperty(pa,"__esModule",{value:!0}),pa.default=c,pa.locales=void 0;var r=o(ce()),a=qo();function o(l){return l&&l.__esModule?l:{default:l}}function c(l){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"en-US",d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};(0,r.default)(l);var p=l,m=d.ignore;if(m)if(m instanceof RegExp)p=p.replace(m,"");else if(typeof m=="string")p=p.replace(new RegExp("[".concat(m.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g,"\\$&"),"]"),"g"),"");else throw new Error("ignore should be instance of a String or RegExp");if(u in a.alpha)return a.alpha[u].test(p);throw new Error("Invalid locale '".concat(u,"'"))}return pa.locales=Object.keys(a.alpha),pa}var ma={},p1;function G4(){if(p1)return ma;p1=1,Object.defineProperty(ma,"__esModule",{value:!0}),ma.default=c,ma.locales=void 0;var r=o(ce()),a=qo();function o(l){return l&&l.__esModule?l:{default:l}}function c(l){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"en-US",d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};(0,r.default)(l);var p=l,m=d.ignore;if(m)if(m instanceof RegExp)p=p.replace(m,"");else if(typeof m=="string")p=p.replace(new RegExp("[".concat(m.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g,"\\$&"),"]"),"g"),"");else throw new Error("ignore should be instance of a String or RegExp");if(u in a.alphanumeric)return a.alphanumeric[u].test(p);throw new Error("Invalid locale '".concat(u,"'"))}return ma.locales=Object.keys(a.alphanumeric),ma}var iu={exports:{}},m1;function K4(){return m1||(m1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=l(ce()),c=qo();function l(p){return p&&p.__esModule?p:{default:p}}var u=/^[0-9]+$/;function d(p,m){return(0,o.default)(p),m&&m.no_symbols?u.test(p):new RegExp("^[+-]?([0-9]*[".concat((m||{}).locale?c.decimal[m.locale]:".","])?[0-9]+$")).test(p)}r.exports=a.default,r.exports.default=a.default}(iu,iu.exports)),iu.exports}var su={exports:{}},h1;function Y4(){return h1||(h1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l={AM:/^[A-Z]{2}\d{7}$/,AR:/^[A-Z]{3}\d{6}$/,AT:/^[A-Z]\d{7}$/,AU:/^[A-Z]\d{7}$/,AZ:/^[A-Z]{1}\d{8}$/,BE:/^[A-Z]{2}\d{6}$/,BG:/^\d{9}$/,BR:/^[A-Z]{2}\d{6}$/,BY:/^[A-Z]{2}\d{7}$/,CA:/^[A-Z]{2}\d{6}$/,CH:/^[A-Z]\d{7}$/,CN:/^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,CY:/^[A-Z](\d{6}|\d{8})$/,CZ:/^\d{8}$/,DE:/^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,DK:/^\d{9}$/,DZ:/^\d{9}$/,EE:/^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,ES:/^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,FI:/^[A-Z]{2}\d{7}$/,FR:/^\d{2}[A-Z]{2}\d{5}$/,GB:/^\d{9}$/,GR:/^[A-Z]{2}\d{7}$/,HR:/^\d{9}$/,HU:/^[A-Z]{2}(\d{6}|\d{7})$/,IE:/^[A-Z0-9]{2}\d{7}$/,IN:/^[A-Z]{1}-?\d{7}$/,ID:/^[A-C]\d{7}$/,IR:/^[A-Z]\d{8}$/,IS:/^(A)\d{7}$/,IT:/^[A-Z0-9]{2}\d{7}$/,JM:/^[Aa]\d{7}$/,JP:/^[A-Z]{2}\d{7}$/,KR:/^[MS]\d{8}$/,KZ:/^[a-zA-Z]\d{7}$/,LI:/^[a-zA-Z]\d{5}$/,LT:/^[A-Z0-9]{8}$/,LU:/^[A-Z0-9]{8}$/,LV:/^[A-Z0-9]{2}\d{7}$/,LY:/^[A-Z0-9]{8}$/,MT:/^\d{7}$/,MZ:/^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,MY:/^[AHK]\d{8}$/,MX:/^\d{10,11}$/,NL:/^[A-Z]{2}[A-Z0-9]{6}\d$/,NZ:/^([Ll]([Aa]|[Dd]|[Ff]|[Hh])|[Ee]([Aa]|[Pp])|[Nn])\d{6}$/,PH:/^([A-Z](\d{6}|\d{7}[A-Z]))|([A-Z]{2}(\d{6}|\d{7}))$/,PK:/^[A-Z]{2}\d{7}$/,PL:/^[A-Z]{2}\d{7}$/,PT:/^[A-Z]\d{6}$/,RO:/^\d{8,9}$/,RU:/^\d{9}$/,SE:/^\d{8}$/,SL:/^(P)[A-Z]\d{7}$/,SK:/^[0-9A-Z]\d{7}$/,TH:/^[A-Z]{1,2}\d{6,7}$/,TR:/^[A-Z]\d{8}$/,UA:/^[A-Z]{2}\d{6}$/,US:/^\d{9}$/,ZA:/^[TAMD]\d{8}$/};function u(d,p){(0,o.default)(d);var m=d.replace(/\s/g,"").toUpperCase();return p.toUpperCase()in l&&l[p].test(m)}r.exports=a.default,r.exports.default=a.default}(su,su.exports)),su.exports}var lu={exports:{}},cu={exports:{}},g1;function mf(){return g1||(g1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=c(ce());function c(p){return p&&p.__esModule?p:{default:p}}var l=/^(?:[-+]?(?:0|[1-9][0-9]*))$/,u=/^[-+]?[0-9]+$/;function d(p,m){(0,o.default)(p),m=m||{};var v=m.allow_leading_zeroes===!1?l:u,x=!m.hasOwnProperty("min")||p>=m.min,g=!m.hasOwnProperty("max")||p<=m.max,y=!m.hasOwnProperty("lt")||p<m.lt,E=!m.hasOwnProperty("gt")||p>m.gt;return v.test(p)&&x&&g&&y&&E}r.exports=a.default,r.exports.default=a.default}(cu,cu.exports)),cu.exports}var v1;function V4(){return v1||(v1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(mf());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,o.default)(u,{allow_leading_zeroes:!1,min:0,max:65535})}r.exports=a.default,r.exports.default=a.default}(lu,lu.exports)),lu.exports}var uu={exports:{}},x1;function Q4(){return x1||(x1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,o.default)(u),u===u.toLowerCase()}r.exports=a.default,r.exports.default=a.default}(uu,uu.exports)),uu.exports}var du={exports:{}},b1;function X4(){return b1||(b1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,o.default)(u),u===u.toUpperCase()}r.exports=a.default,r.exports.default=a.default}(du,du.exports)),du.exports}var fu={exports:{}},y1;function J4(){return y1||(y1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=c(ce());function c(p){return p&&p.__esModule?p:{default:p}}var l=/^[0-9]{15}$/,u=/^\d{2}-\d{6}-\d{6}-\d{1}$/;function d(p,m){(0,o.default)(p),m=m||{};var v=l;if(m.allow_hyphens&&(v=u),!v.test(p))return!1;p=p.replace(/-/g,"");for(var x=0,g=2,y=14,E=0;E<y;E++){var A=p.substring(y-E-1,y-E),N=parseInt(A,10)*g;N>=10?x+=N%10+1:x+=N,g===1?g+=1:g-=1}var w=(10-x%10)%10;return w===parseInt(p.substring(14,15),10)}r.exports=a.default,r.exports.default=a.default}(fu,fu.exports)),fu.exports}var pu={exports:{}},w1;function e5(){return w1||(w1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[\x00-\x7F]+$/;function u(d){return(0,o.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(pu,pu.exports)),pu.exports}var ha={},k1;function a2(){if(k1)return ha;k1=1,Object.defineProperty(ha,"__esModule",{value:!0}),ha.default=c,ha.fullWidth=void 0;var r=a(ce());function a(l){return l&&l.__esModule?l:{default:l}}var o=ha.fullWidth=/[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;function c(l){return(0,r.default)(l),o.test(l)}return ha}var ga={},N1;function o2(){if(N1)return ga;N1=1,Object.defineProperty(ga,"__esModule",{value:!0}),ga.default=c,ga.halfWidth=void 0;var r=a(ce());function a(l){return l&&l.__esModule?l:{default:l}}var o=ga.halfWidth=/[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;function c(l){return(0,r.default)(l),o.test(l)}return ga}var mu={exports:{}},S1;function t5(){return S1||(S1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=u(ce()),c=a2(),l=o2();function u(p){return p&&p.__esModule?p:{default:p}}function d(p){return(0,o.default)(p),c.fullWidth.test(p)&&l.halfWidth.test(p)}r.exports=a.default,r.exports.default=a.default}(mu,mu.exports)),mu.exports}var hu={exports:{}},j1;function r5(){return j1||(j1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/[^\x00-\x7F]/;function u(d){return(0,o.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(hu,hu.exports)),hu.exports}var gu={exports:{}},vu={exports:{}},E1;function n5(){return E1||(E1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=o;function o(c,l){var u=c.join("");return new RegExp(u,l)}r.exports=a.default,r.exports.default=a.default}(vu,vu.exports)),vu.exports}var _1;function a5(){return _1||(_1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=l(ce()),c=l(n5());function l(p){return p&&p.__esModule?p:{default:p}}var u=(0,c.default)(["^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)","(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))","?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$"],"i");function d(p){return(0,o.default)(p),u.test(p)}r.exports=a.default,r.exports.default=a.default}(gu,gu.exports)),gu.exports}var xu={exports:{}},A1;function o5(){return A1||(A1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/[\uD800-\uDBFF][\uDC00-\uDFFF]/;function u(d){return(0,o.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(xu,xu.exports)),xu.exports}var bu={exports:{}},yu={exports:{}},C1;function i5(){return C1||(C1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=function(c,l){return c.some(function(u){return l===u})};a.default=o,r.exports=a.default,r.exports.default=a.default}(yu,yu.exports)),yu.exports}var z1;function s5(){return z1||(z1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=x;var o=d(wt()),c=d(ce()),l=d(i5()),u=qo();function d(g){return g&&g.__esModule?g:{default:g}}function p(g){var y=new RegExp("^[-+]?([0-9]+)?(\\".concat(u.decimal[g.locale],"[0-9]{").concat(g.decimal_digits,"})").concat(g.force_decimal?"":"?","$"));return y}var m={force_decimal:!1,decimal_digits:"1,",locale:"en-US"},v=["","-","+"];function x(g,y){if((0,c.default)(g),y=(0,o.default)(y,m),y.locale in u.decimal)return!(0,l.default)(v,g.replace(/ /g,""))&&p(y).test(g);throw new Error("Invalid locale '".concat(y.locale,"'"))}r.exports=a.default,r.exports.default=a.default}(bu,bu.exports)),bu.exports}var wu={exports:{}},M1;function i2(){return M1||(M1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^(0x|0h)?[0-9A-F]+$/i;function u(d){return(0,o.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(wu,wu.exports)),wu.exports}var ku={exports:{}},O1;function l5(){return O1||(O1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^(0o)?[0-7]+$/i;function u(d){return(0,o.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(ku,ku.exports)),ku.exports}var Nu={exports:{}},P1;function c5(){return P1||(P1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=l(ce()),c=l(Jg());function l(d){return d&&d.__esModule?d:{default:d}}function u(d,p){return(0,o.default)(d),(0,c.default)(d)%parseInt(p,10)===0}r.exports=a.default,r.exports.default=a.default}(Nu,Nu.exports)),Nu.exports}var Su={exports:{}},L1;function u5(){return L1||(L1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;function u(d){return(0,o.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(Su,Su.exports)),Su.exports}var ju={exports:{}},R1;function d5(){return R1||(R1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=m;var o=c(ce());function c(v){return v&&v.__esModule?v:{default:v}}var l=/^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/,u=/^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/,d=/^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)$/,p=/^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/;function m(v){var x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return(0,o.default)(v),x?l.test(v)||u.test(v)||d.test(v)||p.test(v):l.test(v)||u.test(v)}r.exports=a.default,r.exports.default=a.default}(ju,ju.exports)),ju.exports}var Eu={exports:{}},$1;function f5(){return $1||($1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=c(ce());function c(p){return p&&p.__esModule?p:{default:p}}var l=/^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(,(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}(,((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?))?\)$/i,u=/^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(\s(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s?(\/\s((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s?)?\)$/i;function d(p){(0,o.default)(p);var m=p.replace(/\s+/g," ").replace(/\s?(hsla?\(|\)|,)\s?/ig,"$1");return m.indexOf(",")!==-1?l.test(m):u.test(m)}r.exports=a.default,r.exports.default=a.default}(Eu,Eu.exports)),Eu.exports}var _u={exports:{}},I1;function p5(){return I1||(I1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;function u(d){return(0,o.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(_u,_u.exports)),_u.exports}var va={},T1;function m5(){if(T1)return va;T1=1,Object.defineProperty(va,"__esModule",{value:!0}),va.default=d,va.locales=void 0;var r=a(ce());function a(p){return p&&p.__esModule?p:{default:p}}var o={AD:/^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,AE:/^(AE[0-9]{2})\d{3}\d{16}$/,AL:/^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,AT:/^(AT[0-9]{2})\d{16}$/,AZ:/^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,BA:/^(BA[0-9]{2})\d{16}$/,BE:/^(BE[0-9]{2})\d{12}$/,BG:/^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,BH:/^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,BR:/^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,BY:/^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,CH:/^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,CR:/^(CR[0-9]{2})\d{18}$/,CY:/^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,CZ:/^(CZ[0-9]{2})\d{20}$/,DE:/^(DE[0-9]{2})\d{18}$/,DK:/^(DK[0-9]{2})\d{14}$/,DO:/^(DO[0-9]{2})[A-Z]{4}\d{20}$/,DZ:/^(DZ\d{24})$/,EE:/^(EE[0-9]{2})\d{16}$/,EG:/^(EG[0-9]{2})\d{25}$/,ES:/^(ES[0-9]{2})\d{20}$/,FI:/^(FI[0-9]{2})\d{14}$/,FO:/^(FO[0-9]{2})\d{14}$/,FR:/^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,GB:/^(GB[0-9]{2})[A-Z]{4}\d{14}$/,GE:/^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,GI:/^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,GL:/^(GL[0-9]{2})\d{14}$/,GR:/^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,GT:/^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,HR:/^(HR[0-9]{2})\d{17}$/,HU:/^(HU[0-9]{2})\d{24}$/,IE:/^(IE[0-9]{2})[A-Z0-9]{4}\d{14}$/,IL:/^(IL[0-9]{2})\d{19}$/,IQ:/^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,IR:/^(IR[0-9]{2})0\d{2}0\d{18}$/,IS:/^(IS[0-9]{2})\d{22}$/,IT:/^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,JO:/^(JO[0-9]{2})[A-Z]{4}\d{22}$/,KW:/^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,KZ:/^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,LB:/^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,LC:/^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,LI:/^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,LT:/^(LT[0-9]{2})\d{16}$/,LU:/^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,LV:/^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,MA:/^(MA[0-9]{26})$/,MC:/^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,MD:/^(MD[0-9]{2})[A-Z0-9]{20}$/,ME:/^(ME[0-9]{2})\d{18}$/,MK:/^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,MR:/^(MR[0-9]{2})\d{23}$/,MT:/^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,MU:/^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,MZ:/^(MZ[0-9]{2})\d{21}$/,NL:/^(NL[0-9]{2})[A-Z]{4}\d{10}$/,NO:/^(NO[0-9]{2})\d{11}$/,PK:/^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,PL:/^(PL[0-9]{2})\d{24}$/,PS:/^(PS[0-9]{2})[A-Z0-9]{4}\d{21}$/,PT:/^(PT[0-9]{2})\d{21}$/,QA:/^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,RO:/^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,RS:/^(RS[0-9]{2})\d{18}$/,SA:/^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,SC:/^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,SE:/^(SE[0-9]{2})\d{20}$/,SI:/^(SI[0-9]{2})\d{15}$/,SK:/^(SK[0-9]{2})\d{20}$/,SM:/^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,SV:/^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,TL:/^(TL[0-9]{2})\d{19}$/,TN:/^(TN[0-9]{2})\d{20}$/,TR:/^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,UA:/^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,VA:/^(VA[0-9]{2})\d{18}$/,VG:/^(VG[0-9]{2})[A-Z0-9]{4}\d{16}$/,XK:/^(XK[0-9]{2})\d{16}$/};function c(p){var m=p.filter(function(v){return!(v in o)});return!(m.length>0)}function l(p,m){var v=p.replace(/[\s\-]+/gi,"").toUpperCase(),x=v.slice(0,2).toUpperCase(),g=x in o;if(m.whitelist){if(!c(m.whitelist))return!1;var y=m.whitelist.includes(x);if(!y)return!1}if(m.blacklist){var E=m.blacklist.includes(x);if(E)return!1}return g&&o[x].test(v)}function u(p){var m=p.replace(/[^A-Z0-9]+/gi,"").toUpperCase(),v=m.slice(4)+m.slice(0,4),x=v.replace(/[A-Z]/g,function(y){return y.charCodeAt(0)-55}),g=x.match(/\d{1,7}/g).reduce(function(y,E){return Number(y+E)%97},"");return g===1}function d(p){var m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return(0,r.default)(p),l(p,m)&&u(p)}return va.locales=Object.keys(o),va}var Au={exports:{}},xa={},F1;function s2(){if(F1)return xa;F1=1,Object.defineProperty(xa,"__esModule",{value:!0}),xa.CountryCodes=void 0,xa.default=c;var r=a(ce());function a(l){return l&&l.__esModule?l:{default:l}}var o=new Set(["AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"]);function c(l){return(0,r.default)(l),o.has(l.toUpperCase())}return xa.CountryCodes=o,xa}var D1;function h5(){return D1||(D1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=l(ce()),c=s2();function l(p){return p&&p.__esModule?p:{default:p}}var u=/^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;function d(p){(0,o.default)(p);var m=p.slice(4,6).toUpperCase();return!c.CountryCodes.has(m)&&m!=="XK"?!1:u.test(p)}r.exports=a.default,r.exports.default=a.default}(Au,Au.exports)),Au.exports}var Cu={exports:{}},U1;function g5(){return U1||(U1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[a-f0-9]{32}$/;function u(d){return(0,o.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(Cu,Cu.exports)),Cu.exports}var zu={exports:{}},B1;function v5(){return B1||(B1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l={md5:32,md4:32,sha1:40,sha256:64,sha384:96,sha512:128,ripemd128:32,ripemd160:40,tiger128:32,tiger160:40,tiger192:48,crc32:8,crc32b:8};function u(d,p){(0,o.default)(d);var m=new RegExp("^[a-fA-F0-9]{".concat(l[p],"}$"));return m.test(d)}r.exports=a.default,r.exports.default=a.default}(zu,zu.exports)),zu.exports}var Mu={exports:{}},Ou={exports:{}},Z1;function l2(){return Z1||(Z1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=m;var o=l(ce()),c=l(wt());function l(v){return v&&v.__esModule?v:{default:v}}var u=/[^A-Z0-9+\/=]/i,d=/^[A-Z0-9_\-]*$/i,p={urlSafe:!1};function m(v,x){(0,o.default)(v),x=(0,c.default)(x,p);var g=v.length;if(x.urlSafe)return d.test(v);if(g%4!==0||u.test(v))return!1;var y=v.indexOf("=");return y===-1||y===g-1||y===g-2&&v[g-1]==="="}r.exports=a.default,r.exports.default=a.default}(Ou,Ou.exports)),Ou.exports}var q1;function x5(){return q1||(q1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=l(ce()),c=l(l2());function l(d){return d&&d.__esModule?d:{default:d}}function u(d){(0,o.default)(d);var p=d.split("."),m=p.length;return m!==3?!1:p.reduce(function(v,x){return v&&(0,c.default)(x,{urlSafe:!0})},!0)}r.exports=a.default,r.exports.default=a.default}(Mu,Mu.exports)),Mu.exports}var Pu={exports:{}},H1;function b5(){return H1||(H1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var o=l(ce()),c=l(wt());function l(m){return m&&m.__esModule?m:{default:m}}function u(m){"@babel/helpers - typeof";return u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(v){return typeof v}:function(v){return v&&typeof Symbol=="function"&&v.constructor===Symbol&&v!==Symbol.prototype?"symbol":typeof v},u(m)}var d={allow_primitives:!1};function p(m,v){(0,o.default)(m);try{v=(0,c.default)(v,d);var x=[];v.allow_primitives&&(x=[null,!1,!0]);var g=JSON.parse(m);return x.includes(g)||!!g&&u(g)==="object"}catch{}return!1}r.exports=a.default,r.exports.default=a.default}(Pu,Pu.exports)),Pu.exports}var Lu={exports:{}},W1;function y5(){return W1||(W1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=l(ce()),c=l(wt());function l(p){return p&&p.__esModule?p:{default:p}}var u={ignore_whitespace:!1};function d(p,m){return(0,o.default)(p),m=(0,c.default)(m,u),(m.ignore_whitespace?p.trim().length:p.length)===0}r.exports=a.default,r.exports.default=a.default}(Lu,Lu.exports)),Lu.exports}var Ru={exports:{}},G1;function w5(){return G1||(G1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}function l(d){"@babel/helpers - typeof";return l=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(p){return typeof p}:function(p){return p&&typeof Symbol=="function"&&p.constructor===Symbol&&p!==Symbol.prototype?"symbol":typeof p},l(d)}function u(d,p){(0,o.default)(d);var m,v;l(p)==="object"?(m=p.min||0,v=p.max):(m=arguments[1]||0,v=arguments[2]);var x=d.match(/(\uFE0F|\uFE0E)/g)||[],g=d.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[],y=d.length-x.length-g.length;return y>=m&&(typeof v>"u"||y<=v)}r.exports=a.default,r.exports.default=a.default}(Ru,Ru.exports)),Ru.exports}var $u={exports:{}},K1;function k5(){return K1||(K1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l={1:/^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,2:/^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,7:/^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i};function u(d,p){(0,o.default)(d);var m=l[[void 0,null].includes(p)?"all":p];return!!m&&m.test(d)}r.exports=a.default,r.exports.default=a.default}($u,$u.exports)),$u.exports}var Iu={exports:{}},Y1;function N5(){return Y1||(Y1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=l(ce()),c=l(i2());function l(d){return d&&d.__esModule?d:{default:d}}function u(d){return(0,o.default)(d),(0,c.default)(d)&&d.length===24}r.exports=a.default,r.exports.default=a.default}(Iu,Iu.exports)),Iu.exports}var Tu={exports:{}},V1;function S5(){return V1||(V1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ff());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){var p=(d==null?void 0:d.comparisonDate)||d||Date().toString(),m=(0,o.default)(p),v=(0,o.default)(u);return!!(v&&m&&v>m)}r.exports=a.default,r.exports.default=a.default}(Tu,Tu.exports)),Tu.exports}var Fu={exports:{}},Q1;function j5(){return Q1||(Q1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=l(ce()),c=l(ff());function l(d){return d&&d.__esModule?d:{default:d}}function u(d){var p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:String(new Date);(0,o.default)(d);var m=(0,c.default)(p),v=(0,c.default)(d);return!!(v&&m&&v<m)}r.exports=a.default,r.exports.default=a.default}(Fu,Fu.exports)),Fu.exports}var Du={exports:{}},X1;function E5(){return X1||(X1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=l(ce()),c=l(e2());function l(p){return p&&p.__esModule?p:{default:p}}function u(p){"@babel/helpers - typeof";return u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(m){return typeof m}:function(m){return m&&typeof Symbol=="function"&&m.constructor===Symbol&&m!==Symbol.prototype?"symbol":typeof m},u(p)}function d(p,m){(0,o.default)(p);var v;if(Object.prototype.toString.call(m)==="[object Array]"){var x=[];for(v in m)({}).hasOwnProperty.call(m,v)&&(x[v]=(0,c.default)(m[v]));return x.indexOf(p)>=0}else{if(u(m)==="object")return m.hasOwnProperty(p);if(m&&typeof m.indexOf=="function")return m.indexOf(p)>=0}return!1}r.exports=a.default,r.exports.default=a.default}(Du,Du.exports)),Du.exports}var Uu={exports:{}},J1;function c2(){return J1||(J1=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){(0,o.default)(u);for(var d=u.replace(/[- ]+/g,""),p=0,m,v,x,g=d.length-1;g>=0;g--)m=d.substring(g,g+1),v=parseInt(m,10),x?(v*=2,v>=10?p+=v%10+1:p+=v):p+=v,x=!x;return!!(p%10===0&&d)}r.exports=a.default,r.exports.default=a.default}(Uu,Uu.exports)),Uu.exports}var Bu={exports:{}},eh;function _5(){return eh||(eh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var o=l(ce()),c=l(c2());function l(m){return m&&m.__esModule?m:{default:m}}var u={amex:/^3[47][0-9]{13}$/,dinersclub:/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,discover:/^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,jcb:/^(?:2131|1800|35\d{3})\d{11}$/,mastercard:/^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,unionpay:/^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,visa:/^(?:4[0-9]{12})(?:[0-9]{3,6})?$/},d=function(){var m=[];for(var v in u)u.hasOwnProperty(v)&&m.push(u[v]);return m}();function p(m){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};(0,o.default)(m);var x=v.provider,g=m.replace(/[- ]+/g,"");if(x&&x.toLowerCase()in u){if(!u[x.toLowerCase()].test(g))return!1}else{if(x&&!(x.toLowerCase()in u))throw new Error("".concat(x," is not a valid credit card provider."));if(!d.some(function(y){return y.test(g)}))return!1}return(0,c.default)(m)}r.exports=a.default,r.exports.default=a.default}(Bu,Bu.exports)),Bu.exports}var Zu={exports:{}},th;function A5(){return th||(th=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=l(ce()),c=l(mf());function l(p){return p&&p.__esModule?p:{default:p}}var u={PL:function(p){(0,o.default)(p);var m={1:1,2:3,3:7,4:9,5:1,6:3,7:7,8:9,9:1,10:3,11:0};if(p!=null&&p.length===11&&(0,c.default)(p,{allow_leading_zeroes:!0})){var v=p.split("").slice(0,-1),x=v.reduce(function(E,A,N){return E+Number(A)*m[N+1]},0),g=x%10,y=Number(p.charAt(p.length-1));if(g===0&&y===0||y===10-g)return!0}return!1},ES:function(p){(0,o.default)(p);var m=/^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/,v={X:0,Y:1,Z:2},x=["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"],g=p.trim().toUpperCase();if(!m.test(g))return!1;var y=g.slice(0,-1).replace(/[X,Y,Z]/g,function(E){return v[E]});return g.endsWith(x[y%23])},FI:function(p){if((0,o.default)(p),p.length!==11||!p.match(/^\d{6}[\-A\+]\d{3}[0-9ABCDEFHJKLMNPRSTUVWXY]{1}$/))return!1;var m="0123456789ABCDEFHJKLMNPRSTUVWXY",v=parseInt(p.slice(0,6),10)*1e3+parseInt(p.slice(7,10),10),x=v%31,g=m[x];return g===p.slice(10,11)},IN:function(p){var m=/^[1-9]\d{3}\s?\d{4}\s?\d{4}$/,v=[[0,1,2,3,4,5,6,7,8,9],[1,2,3,4,0,6,7,8,9,5],[2,3,4,0,1,7,8,9,5,6],[3,4,0,1,2,8,9,5,6,7],[4,0,1,2,3,9,5,6,7,8],[5,9,8,7,6,0,4,3,2,1],[6,5,9,8,7,1,0,4,3,2],[7,6,5,9,8,2,1,0,4,3],[8,7,6,5,9,3,2,1,0,4],[9,8,7,6,5,4,3,2,1,0]],x=[[0,1,2,3,4,5,6,7,8,9],[1,5,7,6,2,8,3,0,9,4],[5,8,0,3,7,9,6,1,4,2],[8,9,1,6,0,4,3,5,2,7],[9,4,5,3,1,2,6,8,7,0],[4,2,8,6,5,7,3,9,0,1],[2,7,9,3,8,0,6,4,1,5],[7,0,4,6,9,1,3,2,5,8]],g=p.trim();if(!m.test(g))return!1;var y=0,E=g.replace(/\s/g,"").split("").map(Number).reverse();return E.forEach(function(A,N){y=v[y][x[N%8][A]]}),y===0},IR:function(p){if(!p.match(/^\d{10}$/)||(p="0000".concat(p).slice(p.length-6),parseInt(p.slice(3,9),10)===0))return!1;for(var m=parseInt(p.slice(9,10),10),v=0,x=0;x<9;x++)v+=parseInt(p.slice(x,x+1),10)*(10-x);return v%=11,v<2&&m===v||v>=2&&m===11-v},IT:function(p){return p.length!==9||p==="CA00000AA"?!1:p.search(/C[A-Z]\d{5}[A-Z]{2}/i)>-1},NO:function(p){var m=p.trim();if(isNaN(Number(m))||m.length!==11||m==="00000000000")return!1;var v=m.split("").map(Number),x=(11-(3*v[0]+7*v[1]+6*v[2]+1*v[3]+8*v[4]+9*v[5]+4*v[6]+5*v[7]+2*v[8])%11)%11,g=(11-(5*v[0]+4*v[1]+3*v[2]+2*v[3]+7*v[4]+6*v[5]+5*v[6]+4*v[7]+3*v[8]+2*x)%11)%11;return!(x!==v[9]||g!==v[10])},TH:function(p){if(!p.match(/^[1-8]\d{12}$/))return!1;for(var m=0,v=0;v<12;v++)m+=parseInt(p[v],10)*(13-v);return p[12]===((11-m%11)%10).toString()},LK:function(p){var m=/^[1-9]\d{8}[vx]$/i,v=/^[1-9]\d{11}$/i;return p.length===10&&m.test(p)?!0:!!(p.length===12&&v.test(p))},"he-IL":function(p){var m=/^\d{9}$/,v=p.trim();if(!m.test(v))return!1;for(var x=v,g=0,y,E=0;E<x.length;E++)y=Number(x[E])*(E%2+1),g+=y>9?y-9:y;return g%10===0},"ar-LY":function(p){var m=/^(1|2)\d{11}$/,v=p.trim();return!!m.test(v)},"ar-TN":function(p){var m=/^\d{8}$/,v=p.trim();return!!m.test(v)},"zh-CN":function(p){var m=["11","12","13","14","15","21","22","23","31","32","33","34","35","36","37","41","42","43","44","45","46","50","51","52","53","54","61","62","63","64","65","71","81","82","91"],v=["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],x=["1","0","X","9","8","7","6","5","4","3","2"],g=function(k){return m.includes(k)},y=function(k){var C=parseInt(k.substring(0,4),10),$=parseInt(k.substring(4,6),10),I=parseInt(k.substring(6),10),q=new Date(C,$-1,I);return q>new Date?!1:q.getFullYear()===C&&q.getMonth()===$-1&&q.getDate()===I},E=function(k){for(var C=k.substring(0,17),$=0,I=0;I<17;I++)$+=parseInt(C.charAt(I),10)*parseInt(v[I],10);var q=$%11;return x[q]},A=function(k){return E(k)===k.charAt(17).toUpperCase()},N=function(k){var C=/^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(k);if(!C)return!1;var $=k.substring(0,2);if(C=g($),!C)return!1;var I="19".concat(k.substring(6,12));return C=y(I),!!C},w=function(k){var C=/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(k);if(!C)return!1;var $=k.substring(0,2);if(C=g($),!C)return!1;var I=k.substring(6,14);return C=y(I),C?A(k):!1},S=function(k){var C=/^\d{15}|(\d{17}(\d|x|X))$/.test(k);return C?k.length===15?N(k):w(k):!1};return S(p)},"zh-HK":function(p){p=p.trim();var m=/^[A-Z]{1,2}[0-9]{6}((\([0-9A]\))|(\[[0-9A]\])|([0-9A]))$/,v=/^[0-9]$/;if(p=p.toUpperCase(),!m.test(p))return!1;p=p.replace(/\[|\]|\(|\)/g,""),p.length===8&&(p="3".concat(p));for(var x=0,g=0;g<=7;g++){var y=void 0;v.test(p[g])?y=p[g]:y=(p[g].charCodeAt(0)-55)%11,x+=y*(9-g)}x%=11;var E;return x===0?E="0":x===1?E="A":E=String(11-x),E===p[p.length-1]},"zh-TW":function(p){var m={A:10,B:11,C:12,D:13,E:14,F:15,G:16,H:17,I:34,J:18,K:19,L:20,M:21,N:22,O:35,P:23,Q:24,R:25,S:26,T:27,U:28,V:29,W:32,X:30,Y:31,Z:33},v=p.trim().toUpperCase();return/^[A-Z][0-9]{9}$/.test(v)?Array.from(v).reduce(function(x,g,y){if(y===0){var E=m[g];return E%10*9+Math.floor(E/10)}return y===9?(10-x%10-Number(g))%10===0:x+Number(g)*(9-y)},0):!1}};function d(p,m){if((0,o.default)(p),m in u)return u[m](p);if(m==="any"){for(var v in u)if(u.hasOwnProperty(v)){var x=u[v];if(x(p))return!0}return!1}throw new Error("Invalid locale '".concat(m,"'"))}r.exports=a.default,r.exports.default=a.default}(Zu,Zu.exports)),Zu.exports}var qu={exports:{}},rh;function C5(){return rh||(rh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=v;var o=c(ce());function c(x){return x&&x.__esModule?x:{default:x}}var l=8,u=14,d=/^(\d{8}|\d{13}|\d{14})$/;function p(x,g){return x===l||x===u?g%2===0?3:1:g%2===0?1:3}function m(x){var g=x.slice(0,-1).split("").map(function(E,A){return Number(E)*p(x.length,A)}).reduce(function(E,A){return E+A},0),y=10-g%10;return y<10?y:0}function v(x){(0,o.default)(x);var g=Number(x.slice(-1));return d.test(x)&&g===m(x)}r.exports=a.default,r.exports.default=a.default}(qu,qu.exports)),qu.exports}var Hu={exports:{}},nh;function z5(){return nh||(nh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;function u(d){if((0,o.default)(d),!l.test(d))return!1;for(var p=!0,m=0,v=d.length-2;v>=0;v--)if(d[v]>="A"&&d[v]<="Z")for(var x=d[v].charCodeAt(0)-55,g=x%10,y=Math.trunc(x/10),E=0,A=[g,y];E<A.length;E++){var N=A[E];p?N>=5?m+=1+(N-5)*2:m+=N*2:m+=N,p=!p}else{var w=d[v].charCodeAt(0)-48;p?w>=5?m+=1+(w-5)*2:m+=w*2:m+=w,p=!p}var S=Math.trunc((m+9)/10)*10-m;return+d[d.length-1]===S}r.exports=a.default,r.exports.default=a.default}(Hu,Hu.exports)),Hu.exports}var Wu={exports:{}},ah;function M5(){return ah||(ah=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var o=c(ce());function c(m){return m&&m.__esModule?m:{default:m}}var l=/^(?:[0-9]{9}X|[0-9]{10})$/,u=/^(?:[0-9]{13})$/,d=[1,3];function p(m,v){(0,o.default)(m);var x=String((v==null?void 0:v.version)||v);if(!(v!=null&&v.version||v))return p(m,{version:10})||p(m,{version:13});var g=m.replace(/[\s-]+/g,""),y=0;if(x==="10"){if(!l.test(g))return!1;for(var E=0;E<x-1;E++)y+=(E+1)*g.charAt(E);if(g.charAt(9)==="X"?y+=10*10:y+=10*g.charAt(9),y%11===0)return!0}else if(x==="13"){if(!u.test(g))return!1;for(var A=0;A<12;A++)y+=d[A%2]*g.charAt(A);if(g.charAt(12)-(10-y%10)%10===0)return!0}return!1}r.exports=a.default,r.exports.default=a.default}(Wu,Wu.exports)),Wu.exports}var Gu={exports:{}},oh;function O5(){return oh||(oh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l="^\\d{4}-?\\d{3}[\\dX]$";function u(d){var p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};(0,o.default)(d);var m=l;if(m=p.require_hyphen?m.replace("?",""):m,m=p.case_sensitive?new RegExp(m):new RegExp(m,"i"),!m.test(d))return!1;for(var v=d.replace("-","").toUpperCase(),x=0,g=0;g<v.length;g++){var y=v[g];x+=(y==="X"?10:+y)*(8-g)}return x%11===0}r.exports=a.default,r.exports.default=a.default}(Gu,Gu.exports)),Gu.exports}var Ku={exports:{}},On={},ih;function u2(){if(ih)return On;ih=1,Object.defineProperty(On,"__esModule",{value:!0}),On.iso7064Check=r,On.luhnCheck=a,On.reverseMultiplyAndSum=o,On.verhoeffCheck=c;function r(l){for(var u=10,d=0;d<l.length-1;d++)u=(parseInt(l[d],10)+u)%10===0?10*2%11:(parseInt(l[d],10)+u)%10*2%11;return u=u===1?0:11-u,u===parseInt(l[10],10)}function a(l){for(var u=0,d=!1,p=l.length-1;p>=0;p--){if(d){var m=parseInt(l[p],10)*2;m>9?u+=m.toString().split("").map(function(v){return parseInt(v,10)}).reduce(function(v,x){return v+x},0):u+=m}else u+=parseInt(l[p],10);d=!d}return u%10===0}function o(l,u){for(var d=0,p=0;p<l.length;p++)d+=l[p]*(u-p);return d}function c(l){for(var u=[[0,1,2,3,4,5,6,7,8,9],[1,2,3,4,0,6,7,8,9,5],[2,3,4,0,1,7,8,9,5,6],[3,4,0,1,2,8,9,5,6,7],[4,0,1,2,3,9,5,6,7,8],[5,9,8,7,6,0,4,3,2,1],[6,5,9,8,7,1,0,4,3,2],[7,6,5,9,8,2,1,0,4,3],[8,7,6,5,9,3,2,1,0,4],[9,8,7,6,5,4,3,2,1,0]],d=[[0,1,2,3,4,5,6,7,8,9],[1,5,7,6,2,8,3,0,9,4],[5,8,0,3,7,9,6,1,4,2],[8,9,1,6,0,4,3,5,2,7],[9,4,5,3,1,2,6,8,7,0],[4,2,8,6,5,7,3,9,0,1],[2,7,9,3,8,0,6,4,1,5],[7,0,4,6,9,1,3,2,5,8]],p=l.split("").reverse().join(""),m=0,v=0;v<p.length;v++)m=u[m][d[v%8][parseInt(p[v],10)]];return m===0}return On}var sh;function P5(){return sh||(sh=1,function(r,a){function o(j){"@babel/helpers - typeof";return o=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(M){return typeof M}:function(M){return M&&typeof Symbol=="function"&&M.constructor===Symbol&&M!==Symbol.prototype?"symbol":typeof M},o(j)}Object.defineProperty(a,"__esModule",{value:!0}),a.default=mn;var c=m(ce()),l=p(u2()),u=m(n2());function d(j){if(typeof WeakMap!="function")return null;var M=new WeakMap,U=new WeakMap;return(d=function(re){return re?U:M})(j)}function p(j,M){if(j&&j.__esModule)return j;if(j===null||o(j)!="object"&&typeof j!="function")return{default:j};var U=d(M);if(U&&U.has(j))return U.get(j);var re={__proto__:null},oe=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var ue in j)if(ue!=="default"&&{}.hasOwnProperty.call(j,ue)){var Ne=oe?Object.getOwnPropertyDescriptor(j,ue):null;Ne&&(Ne.get||Ne.set)?Object.defineProperty(re,ue,Ne):re[ue]=j[ue]}return re.default=j,U&&U.set(j,re),re}function m(j){return j&&j.__esModule?j:{default:j}}function v(j){return E(j)||y(j)||g(j)||x()}function x(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function g(j,M){if(j){if(typeof j=="string")return A(j,M);var U=Object.prototype.toString.call(j).slice(8,-1);if(U==="Object"&&j.constructor&&(U=j.constructor.name),U==="Map"||U==="Set")return Array.from(j);if(U==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(U))return A(j,M)}}function y(j){if(typeof Symbol<"u"&&j[Symbol.iterator]!=null||j["@@iterator"]!=null)return Array.from(j)}function E(j){if(Array.isArray(j))return A(j)}function A(j,M){(M==null||M>j.length)&&(M=j.length);for(var U=0,re=new Array(M);U<M;U++)re[U]=j[U];return re}function N(j){var M=j.slice(0,2),U=parseInt(j.slice(2,4),10);U>40?(U-=40,M="20".concat(M)):U>20?(U-=20,M="18".concat(M)):M="19".concat(M),U<10&&(U="0".concat(U));var re="".concat(M,"/").concat(U,"/").concat(j.slice(4,6));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1;for(var oe=j.split("").map(function(Ie){return parseInt(Ie,10)}),ue=[2,4,8,5,10,9,7,3,6],Ne=0,Me=0;Me<ue.length;Me++)Ne+=oe[Me]*ue[Me];return Ne=Ne%11===10?0:Ne%11,Ne===oe[9]}function w(j){var M=j.split(""),U=M.filter(function(oe,ue){return ue%2}).map(function(oe){return Number(oe)*2}).join("").split(""),re=M.filter(function(oe,ue){return!(ue%2)}).concat(U).map(function(oe){return Number(oe)}).reduce(function(oe,ue){return oe+ue});return re%10===0}function S(j){j=j.replace(/\W/,"");var M=parseInt(j.slice(0,2),10);if(j.length===10)M<54?M="20".concat(M):M="19".concat(M);else{if(j.slice(6)==="000")return!1;if(M<54)M="19".concat(M);else return!1}M.length===3&&(M=[M.slice(0,2),"0",M.slice(2)].join(""));var U=parseInt(j.slice(2,4),10);if(U>50&&(U-=50),U>20){if(parseInt(M,10)<2004)return!1;U-=20}U<10&&(U="0".concat(U));var re="".concat(M,"/").concat(U,"/").concat(j.slice(4,6));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1;if(j.length===10&&parseInt(j,10)%11!==0){var oe=parseInt(j.slice(0,9),10)%11;if(parseInt(M,10)<1986&&oe===10){if(parseInt(j.slice(9),10)!==0)return!1}else return!1}return!0}function k(j){return l.luhnCheck(j)}function C(j){for(var M=j.split("").map(function(Ie){return parseInt(Ie,10)}),U=[],re=0;re<M.length-1;re++){U.push("");for(var oe=0;oe<M.length-1;oe++)M[re]===M[oe]&&(U[re]+=oe)}if(U=U.filter(function(Ie){return Ie.length>1}),U.length!==2&&U.length!==3)return!1;if(U[0].length===3){for(var ue=U[0].split("").map(function(Ie){return parseInt(Ie,10)}),Ne=0,Me=0;Me<ue.length-1;Me++)ue[Me]+1===ue[Me+1]&&(Ne+=1);if(Ne===2)return!1}return l.iso7064Check(j)}function $(j){j=j.replace(/\W/,"");var M=parseInt(j.slice(4,6),10),U=j.slice(6,7);switch(U){case"0":case"1":case"2":case"3":M="19".concat(M);break;case"4":case"9":M<37?M="20".concat(M):M="19".concat(M);break;default:if(M<37)M="20".concat(M);else if(M>58)M="18".concat(M);else return!1;break}M.length===3&&(M=[M.slice(0,2),"0",M.slice(2)].join(""));var re="".concat(M,"/").concat(j.slice(2,4),"/").concat(j.slice(0,2));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1;for(var oe=j.split("").map(function(Ie){return parseInt(Ie,10)}),ue=0,Ne=4,Me=0;Me<9;Me++)ue+=oe[Me]*Ne,Ne-=1,Ne===1&&(Ne=7);return ue%=11,ue===1?!1:ue===0?oe[9]===0:oe[9]===11-ue}function I(j){for(var M=j.slice(0,8).split("").map(function(ue){return parseInt(ue,10)}),U=0,re=1;re<M.length;re+=2)U+=M[re];for(var oe=0;oe<M.length;oe+=2)M[oe]<2?U+=1-M[oe]:(U+=2*(M[oe]-2)+5,M[oe]>4&&(U+=2));return String.fromCharCode(U%26+65)===j.charAt(8)}function q(j){for(var M=j.split("").map(function(oe){return parseInt(oe,10)}),U=0,re=0;re<8;re++)U+=M[re]*Math.pow(2,8-re);return U%11%10===M[8]}function Z(j){var M=l.reverseMultiplyAndSum(j.split("").slice(0,7).map(function(U){return parseInt(U,10)}),8);return j.length===9&&j[8]!=="W"&&(M+=(j[8].charCodeAt(0)-64)*9),M%=23,M===0?j[7].toUpperCase()==="W":j[7].toUpperCase()===String.fromCharCode(64+M)}var H={andover:["10","12"],atlanta:["60","67"],austin:["50","53"],brookhaven:["01","02","03","04","05","06","11","13","14","16","21","22","23","25","34","51","52","54","55","56","57","58","59","65"],cincinnati:["30","32","35","36","37","38","61"],fresno:["15","24"],internet:["20","26","27","45","46","47"],kansas:["40","44"],memphis:["94","95"],ogden:["80","90"],philadelphia:["33","39","41","42","43","46","48","62","63","64","66","68","71","72","73","74","75","76","77","81","82","83","84","85","86","87","88","91","92","93","98","99"],sba:["31"]};function Y(){var j=[];for(var M in H)H.hasOwnProperty(M)&&j.push.apply(j,v(H[M]));return j}function R(j){return Y().indexOf(j.slice(0,2))!==-1}function te(j){for(var M=0,U=j.split(""),re=parseInt(U.pop(),10),oe=0;oe<U.length;oe++)M+=U[9-oe]*(2+oe%6);var ue=11-M%11;return ue===11?ue=0:ue===10&&(ue=9),re===ue}function pe(j){var M=j.toUpperCase().split("");if(isNaN(parseInt(M[0],10))&&M.length>1){var U=0;switch(M[0]){case"Y":U=1;break;case"Z":U=2;break}M.splice(0,1,U)}else for(;M.length<9;)M.unshift(0);var re=["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];M=M.join("");var oe=parseInt(M.slice(0,8),10)%23;return M[8]===re[oe]}function J(j){var M=j.slice(1,3),U=j.slice(0,1);switch(U){case"1":case"2":M="18".concat(M);break;case"3":case"4":M="19".concat(M);break;default:M="20".concat(M);break}var re="".concat(M,"/").concat(j.slice(3,5),"/").concat(j.slice(5,7));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1;for(var oe=j.split("").map(function(Be){return parseInt(Be,10)}),ue=0,Ne=1,Me=0;Me<10;Me++)ue+=oe[Me]*Ne,Ne+=1,Ne===10&&(Ne=1);if(ue%11===10){ue=0,Ne=3;for(var Ie=0;Ie<10;Ie++)ue+=oe[Ie]*Ne,Ne+=1,Ne===10&&(Ne=1);if(ue%11===10)return oe[10]===0}return ue%11===oe[10]}function fe(j){var M=j.slice(4,6),U=j.slice(6,7);switch(U){case"+":M="18".concat(M);break;case"-":M="19".concat(M);break;default:M="20".concat(M);break}var re="".concat(M,"/").concat(j.slice(2,4),"/").concat(j.slice(0,2));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1;var oe=parseInt(j.slice(0,6)+j.slice(7,10),10)%31;if(oe<10)return oe===parseInt(j.slice(10),10);oe-=10;var ue=["A","B","C","D","E","F","H","J","K","L","M","N","P","R","S","T","U","V","W","X","Y"];return ue[oe]===j.slice(10)}function G(j){if(j.slice(2,4)!=="00"||j.slice(4,6)!=="00"){var M="".concat(j.slice(0,2),"/").concat(j.slice(2,4),"/").concat(j.slice(4,6));if(!(0,u.default)(M,"YY/MM/DD"))return!1}var U=97-parseInt(j.slice(0,9),10)%97,re=parseInt(j.slice(9,11),10);return!(U!==re&&(U=97-parseInt("2".concat(j.slice(0,9)),10)%97,U!==re))}function ae(j){j=j.replace(/\s/g,"");var M=parseInt(j.slice(0,10),10)%511,U=parseInt(j.slice(10,13),10);return M===U}function W(j){var M="".concat(j.slice(0,4),"/").concat(j.slice(4,6),"/").concat(j.slice(6,8));return!(0,u.default)(M,"YYYY/MM/DD")||!l.luhnCheck(j.slice(0,12))?!1:l.verhoeffCheck("".concat(j.slice(0,11)).concat(j[12]))}function F(j){return l.iso7064Check(j)}function V(j){for(var M=j.split("").map(function(oe){return parseInt(oe,10)}),U=8,re=1;re<9;re++)U+=M[re]*(re+1);return U%11===M[9]}function Q(j){for(var M=!1,U=!1,re=0;re<3;re++)if(!M&&/[AEIOU]/.test(j[re]))M=!0;else if(!U&&M&&j[re]==="X")U=!0;else if(re>0&&(M&&!U&&!/[AEIOU]/.test(j[re])||U&&!/X/.test(j[re])))return!1;return!0}function L(j){var M=j.toUpperCase().split("");if(!Q(M.slice(0,3))||!Q(M.slice(3,6)))return!1;for(var U=[6,7,9,10,12,13,14],re={L:"0",M:"1",N:"2",P:"3",Q:"4",R:"5",S:"6",T:"7",U:"8",V:"9"},oe=0,ue=U;oe<ue.length;oe++){var Ne=ue[oe];M[Ne]in re&&M.splice(Ne,1,re[M[Ne]])}var Me={A:"01",B:"02",C:"03",D:"04",E:"05",H:"06",L:"07",M:"08",P:"09",R:"10",S:"11",T:"12"},Ie=Me[M[8]],Be=parseInt(M[9]+M[10],10);Be>40&&(Be-=40),Be<10&&(Be="0".concat(Be));var $t="".concat(M[6]).concat(M[7],"/").concat(Ie,"/").concat(Be);if(!(0,u.default)($t,"YY/MM/DD"))return!1;for(var It=0,dt=1;dt<M.length-1;dt+=2){var Wt=parseInt(M[dt],10);isNaN(Wt)&&(Wt=M[dt].charCodeAt(0)-65),It+=Wt}for(var hn={A:1,B:0,C:5,D:7,E:9,F:13,G:15,H:17,I:19,J:21,K:2,L:4,M:18,N:20,O:11,P:3,Q:6,R:8,S:12,T:14,U:16,V:10,W:22,X:25,Y:24,Z:23,0:1,1:0},nr=0;nr<M.length-1;nr+=2){var gr=0;if(M[nr]in hn)gr=hn[M[nr]];else{var Tn=parseInt(M[nr],10);gr=2*Tn+1,Tn>4&&(gr+=2)}It+=gr}return String.fromCharCode(65+It%26)===M[15]}function K(j){j=j.replace(/\W/,"");var M=j.slice(0,2);if(M!=="32"){var U=j.slice(2,4);if(U!=="00"){var re=j.slice(4,6);switch(j[6]){case"0":re="18".concat(re);break;case"1":re="19".concat(re);break;default:re="20".concat(re);break}var oe="".concat(re,"/").concat(j.slice(2,4),"/").concat(M);if(!(0,u.default)(oe,"YYYY/MM/DD"))return!1}for(var ue=1101,Ne=[1,6,3,7,9,10,5,8,4,2],Me=0;Me<j.length-1;Me++)ue-=parseInt(j[Me],10)*Ne[Me];return parseInt(j[10],10)===ue%11}return!0}function be(j){if(j.length!==9){for(var M=j.toUpperCase().split("");M.length<8;)M.unshift(0);switch(j[7]){case"A":case"P":if(parseInt(M[6],10)===0)return!1;break;default:{var U=parseInt(M.join("").slice(0,5),10);if(U>32e3)return!1;var re=parseInt(M.join("").slice(5,7),10);if(U===re)return!1}}}return!0}function ke(j){return l.reverseMultiplyAndSum(j.split("").slice(0,8).map(function(M){return parseInt(M,10)}),9)%11===parseInt(j[8],10)}function _e(j){if(j.length===10){for(var M=[6,5,7,2,3,4,5,6,7],U=0,re=0;re<M.length;re++)U+=parseInt(j[re],10)*M[re];return U%=11,U===10?!1:U===parseInt(j[9],10)}var oe=j.slice(0,2),ue=parseInt(j.slice(2,4),10);ue>80?(oe="18".concat(oe),ue-=80):ue>60?(oe="22".concat(oe),ue-=60):ue>40?(oe="21".concat(oe),ue-=40):ue>20?(oe="20".concat(oe),ue-=20):oe="19".concat(oe),ue<10&&(ue="0".concat(ue));var Ne="".concat(oe,"/").concat(ue,"/").concat(j.slice(4,6));if(!(0,u.default)(Ne,"YYYY/MM/DD"))return!1;for(var Me=0,Ie=1,Be=0;Be<j.length-1;Be++)Me+=parseInt(j[Be],10)*Ie%10,Ie+=2,Ie>10?Ie=1:Ie===5&&(Ie+=2);return Me=10-Me%10,Me===parseInt(j[10],10)}function Ae(j){if(j.length===11){var M,U;if(M=0,j==="11111111111"||j==="22222222222"||j==="33333333333"||j==="44444444444"||j==="55555555555"||j==="66666666666"||j==="77777777777"||j==="88888888888"||j==="99999999999"||j==="00000000000")return!1;for(var re=1;re<=9;re++)M+=parseInt(j.substring(re-1,re),10)*(11-re);if(U=M*10%11,U===10&&(U=0),U!==parseInt(j.substring(9,10),10))return!1;M=0;for(var oe=1;oe<=10;oe++)M+=parseInt(j.substring(oe-1,oe),10)*(12-oe);return U=M*10%11,U===10&&(U=0),U===parseInt(j.substring(10,11),10)}if(j==="00000000000000"||j==="11111111111111"||j==="22222222222222"||j==="33333333333333"||j==="44444444444444"||j==="55555555555555"||j==="66666666666666"||j==="77777777777777"||j==="88888888888888"||j==="99999999999999")return!1;for(var ue=j.length-2,Ne=j.substring(0,ue),Me=j.substring(ue),Ie=0,Be=ue-7,$t=ue;$t>=1;$t--)Ie+=Ne.charAt(ue-$t)*Be,Be-=1,Be<2&&(Be=9);var It=Ie%11<2?0:11-Ie%11;if(It!==parseInt(Me.charAt(0),10))return!1;ue+=1,Ne=j.substring(0,ue),Ie=0,Be=ue-7;for(var dt=ue;dt>=1;dt--)Ie+=Ne.charAt(ue-dt)*Be,Be-=1,Be<2&&(Be=9);return It=Ie%11<2?0:11-Ie%11,It===parseInt(Me.charAt(1),10)}function Pe(j){var M=11-l.reverseMultiplyAndSum(j.split("").slice(0,8).map(function(U){return parseInt(U,10)}),9)%11;return M>9?parseInt(j[8],10)===0:M===parseInt(j[8],10)}function Le(j){if(j.slice(0,4)!=="9000"){var M=j.slice(1,3);switch(j[0]){case"1":case"2":M="19".concat(M);break;case"3":case"4":M="18".concat(M);break;case"5":case"6":M="20".concat(M);break}var U="".concat(M,"/").concat(j.slice(3,5),"/").concat(j.slice(5,7));if(U.length===8){if(!(0,u.default)(U,"YY/MM/DD"))return!1}else if(!(0,u.default)(U,"YYYY/MM/DD"))return!1;for(var re=j.split("").map(function(Me){return parseInt(Me,10)}),oe=[2,7,9,1,4,6,3,5,8,2,7,9],ue=0,Ne=0;Ne<oe.length;Ne++)ue+=re[Ne]*oe[Ne];return ue%11===10?re[12]===1:re[12]===ue%11}return!0}function Oe(j){if(j.length===9){if(j=j.replace(/\W/,""),j.slice(6)==="000")return!1;var M=parseInt(j.slice(0,2),10);if(M>53)return!1;M<10?M="190".concat(M):M="19".concat(M);var U=parseInt(j.slice(2,4),10);U>50&&(U-=50),U<10&&(U="0".concat(U));var re="".concat(M,"/").concat(U,"/").concat(j.slice(4,6));if(!(0,u.default)(re,"YYYY/MM/DD"))return!1}return!0}function Ye(j){var M=11-l.reverseMultiplyAndSum(j.split("").slice(0,7).map(function(U){return parseInt(U,10)}),8)%11;return M===10?parseInt(j[7],10)===0:M===parseInt(j[7],10)}function $r(j){var M=j.slice(0);j.length>11&&(M=M.slice(2));var U="",re=M.slice(2,4),oe=parseInt(M.slice(4,6),10);if(j.length>11)U=j.slice(0,4);else if(U=j.slice(0,2),j.length===11&&oe<60){var ue=new Date().getFullYear().toString(),Ne=parseInt(ue.slice(0,2),10);if(ue=parseInt(ue,10),j[6]==="-")parseInt("".concat(Ne).concat(U),10)>ue?U="".concat(Ne-1).concat(U):U="".concat(Ne).concat(U);else if(U="".concat(Ne-1).concat(U),ue-parseInt(U,10)<100)return!1}oe>60&&(oe-=60),oe<10&&(oe="0".concat(oe));var Me="".concat(U,"/").concat(re,"/").concat(oe);if(Me.length===8){if(!(0,u.default)(Me,"YY/MM/DD"))return!1}else if(!(0,u.default)(Me,"YYYY/MM/DD"))return!1;return l.luhnCheck(j.replace(/\W/,""))}function In(j){for(var M=j.split("").map(function(ue){return parseInt(ue,10)}),U=[-1,5,7,9,4,6,10,5,7],re=0,oe=0;oe<U.length;oe++)re+=M[oe]*U[oe];return re%11===10?M[9]===0:M[9]===re%11}var st={"bg-BG":/^\d{10}$/,"cs-CZ":/^\d{6}\/{0,1}\d{3,4}$/,"de-AT":/^\d{9}$/,"de-DE":/^[1-9]\d{10}$/,"dk-DK":/^\d{6}-{0,1}\d{4}$/,"el-CY":/^[09]\d{7}[A-Z]$/,"el-GR":/^([0-4]|[7-9])\d{8}$/,"en-CA":/^\d{9}$/,"en-GB":/^\d{10}$|^(?!GB|NK|TN|ZZ)(?![DFIQUV])[A-Z](?![DFIQUVO])[A-Z]\d{6}[ABCD ]$/i,"en-IE":/^\d{7}[A-W][A-IW]{0,1}$/i,"en-US":/^\d{2}[- ]{0,1}\d{7}$/,"es-AR":/(20|23|24|27|30|33|34)[0-9]{8}[0-9]/,"es-ES":/^(\d{0,8}|[XYZKLM]\d{7})[A-HJ-NP-TV-Z]$/i,"et-EE":/^[1-6]\d{6}(00[1-9]|0[1-9][0-9]|[1-6][0-9]{2}|70[0-9]|710)\d$/,"fi-FI":/^\d{6}[-+A]\d{3}[0-9A-FHJ-NPR-Y]$/i,"fr-BE":/^\d{11}$/,"fr-FR":/^[0-3]\d{12}$|^[0-3]\d\s\d{2}(\s\d{3}){3}$/,"fr-LU":/^\d{13}$/,"hr-HR":/^\d{11}$/,"hu-HU":/^8\d{9}$/,"it-IT":/^[A-Z]{6}[L-NP-V0-9]{2}[A-EHLMPRST][L-NP-V0-9]{2}[A-ILMZ][L-NP-V0-9]{3}[A-Z]$/i,"lv-LV":/^\d{6}-{0,1}\d{5}$/,"mt-MT":/^\d{3,7}[APMGLHBZ]$|^([1-8])\1\d{7}$/i,"nl-NL":/^\d{9}$/,"pl-PL":/^\d{10,11}$/,"pt-BR":/(?:^\d{11}$)|(?:^\d{14}$)/,"pt-PT":/^\d{9}$/,"ro-RO":/^\d{13}$/,"sk-SK":/^\d{6}\/{0,1}\d{3,4}$/,"sl-SI":/^[1-9]\d{7}$/,"sv-SE":/^(\d{6}[-+]{0,1}\d{4}|(18|19|20)\d{6}[-+]{0,1}\d{4})$/,"uk-UA":/^\d{10}$/};st["lb-LU"]=st["fr-LU"],st["lt-LT"]=st["et-EE"],st["nl-BE"]=st["fr-BE"],st["fr-CA"]=st["en-CA"];var ut={"bg-BG":N,"cs-CZ":S,"de-AT":k,"de-DE":C,"dk-DK":$,"el-CY":I,"el-GR":q,"en-CA":w,"en-IE":Z,"en-US":R,"es-AR":te,"es-ES":pe,"et-EE":J,"fi-FI":fe,"fr-BE":G,"fr-FR":ae,"fr-LU":W,"hr-HR":F,"hu-HU":V,"it-IT":L,"lv-LV":K,"mt-MT":be,"nl-NL":ke,"pl-PL":_e,"pt-BR":Ae,"pt-PT":Pe,"ro-RO":Le,"sk-SK":Oe,"sl-SI":Ye,"sv-SE":$r,"uk-UA":In};ut["lb-LU"]=ut["fr-LU"],ut["lt-LT"]=ut["et-EE"],ut["nl-BE"]=ut["fr-BE"],ut["fr-CA"]=ut["en-CA"];var pn=/[-\\\/!@#$%\^&\*\(\)\+\=\[\]]+/g,hr={"de-AT":pn,"de-DE":/[\/\\]/g,"fr-BE":pn};hr["nl-BE"]=hr["fr-BE"];function mn(j){var M=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"en-US";(0,c.default)(j);var U=j.slice(0);if(M in st)return M in hr&&(U=U.replace(hr[M],"")),st[M].test(U)?M in ut?ut[M](U):!0:!1;throw new Error("Invalid locale '".concat(M,"'"))}r.exports=a.default,r.exports.default=a.default}(Ku,Ku.exports)),Ku.exports}var ba={},lh;function L5(){if(lh)return ba;lh=1,Object.defineProperty(ba,"__esModule",{value:!0}),ba.default=c,ba.locales=void 0;var r=a(ce());function a(l){return l&&l.__esModule?l:{default:l}}var o={"am-AM":/^(\+?374|0)(33|4[134]|55|77|88|9[13-689])\d{6}$/,"ar-AE":/^((\+?971)|0)?5[024568]\d{7}$/,"ar-BH":/^(\+?973)?(3|6)\d{7}$/,"ar-DZ":/^(\+?213|0)(5|6|7)\d{8}$/,"ar-LB":/^(\+?961)?((3|81)\d{6}|7\d{7})$/,"ar-EG":/^((\+?20)|0)?1[0125]\d{8}$/,"ar-IQ":/^(\+?964|0)?7[0-9]\d{8}$/,"ar-JO":/^(\+?962|0)?7[789]\d{7}$/,"ar-KW":/^(\+?965)([569]\d{7}|41\d{6})$/,"ar-LY":/^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,"ar-MA":/^(?:(?:\+|00)212|0)[5-7]\d{8}$/,"ar-OM":/^((\+|00)968)?(9[1-9])\d{6}$/,"ar-PS":/^(\+?970|0)5[6|9](\d{7})$/,"ar-SA":/^(!?(\+?966)|0)?5\d{8}$/,"ar-SD":/^((\+?249)|0)?(9[012369]|1[012])\d{7}$/,"ar-SY":/^(!?(\+?963)|0)?9\d{8}$/,"ar-TN":/^(\+?216)?[2459]\d{7}$/,"az-AZ":/^(\+994|0)(10|5[015]|7[07]|99)\d{7}$/,"bs-BA":/^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,"be-BY":/^(\+?375)?(24|25|29|33|44)\d{7}$/,"bg-BG":/^(\+?359|0)?8[789]\d{7}$/,"bn-BD":/^(\+?880|0)1[13456789][0-9]{8}$/,"ca-AD":/^(\+376)?[346]\d{5}$/,"cs-CZ":/^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,"da-DK":/^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,"de-DE":/^((\+49|0)1)(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,"de-AT":/^(\+43|0)\d{1,4}\d{3,12}$/,"de-CH":/^(\+41|0)([1-9])\d{1,9}$/,"de-LU":/^(\+352)?((6\d1)\d{6})$/,"dv-MV":/^(\+?960)?(7[2-9]|9[1-9])\d{5}$/,"el-GR":/^(\+?30|0)?6(8[5-9]|9(?![26])[0-9])\d{7}$/,"el-CY":/^(\+?357?)?(9(9|6)\d{6})$/,"en-AI":/^(\+?1|0)264(?:2(35|92)|4(?:6[1-2]|76|97)|5(?:3[6-9]|8[1-4])|7(?:2(4|9)|72))\d{4}$/,"en-AU":/^(\+?61|0)4\d{8}$/,"en-AG":/^(?:\+1|1)268(?:464|7(?:1[3-9]|[28]\d|3[0246]|64|7[0-689]))\d{4}$/,"en-BM":/^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}$))/,"en-BS":/^(\+?1[-\s]?|0)?\(?242\)?[-\s]?\d{3}[-\s]?\d{4}$/,"en-GB":/^(\+?44|0)7\d{9}$/,"en-GG":/^(\+?44|0)1481\d{6}$/,"en-GH":/^(\+233|0)(20|50|24|54|27|57|26|56|23|28|55|59)\d{7}$/,"en-GY":/^(\+592|0)6\d{6}$/,"en-HK":/^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,"en-MO":/^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,"en-IE":/^(\+?353|0)8[356789]\d{7}$/,"en-IN":/^(\+?91|0)?[6789]\d{9}$/,"en-JM":/^(\+?876)?\d{7}$/,"en-KE":/^(\+?254|0)(7|1)\d{8}$/,"fr-CF":/^(\+?236| ?)(70|75|77|72|21|22)\d{6}$/,"en-SS":/^(\+?211|0)(9[1257])\d{7}$/,"en-KI":/^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,"en-KN":/^(?:\+1|1)869(?:46\d|48[89]|55[6-8]|66\d|76[02-7])\d{4}$/,"en-LS":/^(\+?266)(22|28|57|58|59|27|52)\d{6}$/,"en-MT":/^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,"en-MU":/^(\+?230|0)?\d{8}$/,"en-MW":/^(\+?265|0)(((77|88|31|99|98|21)\d{7})|(((111)|1)\d{6})|(32000\d{4}))$/,"en-NA":/^(\+?264|0)(6|8)\d{7}$/,"en-NG":/^(\+?234|0)?[789]\d{9}$/,"en-NZ":/^(\+?64|0)[28]\d{7,9}$/,"en-PG":/^(\+?675|0)?(7\d|8[18])\d{6}$/,"en-PK":/^((00|\+)?92|0)3[0-6]\d{8}$/,"en-PH":/^(09|\+639)\d{9}$/,"en-RW":/^(\+?250|0)?[7]\d{8}$/,"en-SG":/^(\+65)?[3689]\d{7}$/,"en-SL":/^(\+?232|0)\d{8}$/,"en-TZ":/^(\+?255|0)?[67]\d{8}$/,"en-UG":/^(\+?256|0)?[7]\d{8}$/,"en-US":/^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,"en-ZA":/^(\+?27|0)\d{9}$/,"en-ZM":/^(\+?26)?09[567]\d{7}$/,"en-ZW":/^(\+263)[0-9]{9}$/,"en-BW":/^(\+?267)?(7[1-8]{1})\d{6}$/,"es-AR":/^\+?549(11|[2368]\d)\d{8}$/,"es-BO":/^(\+?591)?(6|7)\d{7}$/,"es-CO":/^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,"es-CL":/^(\+?56|0)[2-9]\d{1}\d{7}$/,"es-CR":/^(\+506)?[2-8]\d{7}$/,"es-CU":/^(\+53|0053)?5\d{7}$/,"es-DO":/^(\+?1)?8[024]9\d{7}$/,"es-HN":/^(\+?504)?[9|8|3|2]\d{7}$/,"es-EC":/^(\+?593|0)([2-7]|9[2-9])\d{7}$/,"es-ES":/^(\+?34)?[6|7]\d{8}$/,"es-PE":/^(\+?51)?9\d{8}$/,"es-MX":/^(\+?52)?(1|01)?\d{10,11}$/,"es-NI":/^(\+?505)\d{7,8}$/,"es-PA":/^(\+?507)\d{7,8}$/,"es-PY":/^(\+?595|0)9[9876]\d{7}$/,"es-SV":/^(\+?503)?[67]\d{7}$/,"es-UY":/^(\+598|0)9[1-9][\d]{6}$/,"es-VE":/^(\+?58)?(2|4)\d{9}$/,"et-EE":/^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,"fa-IR":/^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,"fi-FI":/^(\+?358|0)\s?(4[0-6]|50)\s?(\d\s?){4,8}$/,"fj-FJ":/^(\+?679)?\s?\d{3}\s?\d{4}$/,"fo-FO":/^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,"fr-BF":/^(\+226|0)[67]\d{7}$/,"fr-BJ":/^(\+229)\d{8}$/,"fr-CD":/^(\+?243|0)?(8|9)\d{8}$/,"fr-CM":/^(\+?237)6[0-9]{8}$/,"fr-FR":/^(\+?33|0)[67]\d{8}$/,"fr-GF":/^(\+?594|0|00594)[67]\d{8}$/,"fr-GP":/^(\+?590|0|00590)[67]\d{8}$/,"fr-MQ":/^(\+?596|0|00596)[67]\d{8}$/,"fr-PF":/^(\+?689)?8[789]\d{6}$/,"fr-RE":/^(\+?262|0|00262)[67]\d{8}$/,"fr-WF":/^(\+681)?\d{6}$/,"he-IL":/^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,"hu-HU":/^(\+?36|06)(20|30|31|50|70)\d{7}$/,"id-ID":/^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,"ir-IR":/^(\+98|0)?9\d{9}$/,"it-IT":/^(\+?39)?\s?3\d{2} ?\d{6,7}$/,"it-SM":/^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,"ja-JP":/^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,"ka-GE":/^(\+?995)?(79\d{7}|5\d{8})$/,"kk-KZ":/^(\+?7|8)?7\d{9}$/,"kl-GL":/^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,"ko-KR":/^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,"ky-KG":/^(\+?7\s?\+?7|0)\s?\d{2}\s?\d{3}\s?\d{4}$/,"lt-LT":/^(\+370|8)\d{8}$/,"lv-LV":/^(\+?371)2\d{7}$/,"mg-MG":/^((\+?261|0)(2|3)\d)?\d{7}$/,"mn-MN":/^(\+|00|011)?976(77|81|88|91|94|95|96|99)\d{6}$/,"my-MM":/^(\+?959|09|9)(2[5-7]|3[1-2]|4[0-5]|6[6-9]|7[5-9]|9[6-9])[0-9]{7}$/,"ms-MY":/^(\+?60|0)1(([0145](-|\s)?\d{7,8})|([236-9](-|\s)?\d{7}))$/,"mz-MZ":/^(\+?258)?8[234567]\d{7}$/,"nb-NO":/^(\+?47)?[49]\d{7}$/,"ne-NP":/^(\+?977)?9[78]\d{8}$/,"nl-BE":/^(\+?32|0)4\d{8}$/,"nl-NL":/^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,"nl-AW":/^(\+)?297(56|59|64|73|74|99)\d{5}$/,"nn-NO":/^(\+?47)?[49]\d{7}$/,"pl-PL":/^(\+?48)? ?([5-8]\d|45) ?\d{3} ?\d{2} ?\d{2}$/,"pt-BR":/^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[1-9]{1}\d{3}\-?\d{4}))$/,"pt-PT":/^(\+?351)?9[1236]\d{7}$/,"pt-AO":/^(\+244)\d{9}$/,"ro-MD":/^(\+?373|0)((6(0|1|2|6|7|8|9))|(7(6|7|8|9)))\d{6}$/,"ro-RO":/^(\+?40|0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/,"ru-RU":/^(\+?7|8)?9\d{9}$/,"si-LK":/^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,"sl-SI":/^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,"sk-SK":/^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,"so-SO":/^(\+?252|0)((6[0-9])\d{7}|(7[1-9])\d{7})$/,"sq-AL":/^(\+355|0)6[789]\d{6}$/,"sr-RS":/^(\+3816|06)[- \d]{5,9}$/,"sv-SE":/^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,"tg-TJ":/^(\+?992)?[5][5]\d{7}$/,"th-TH":/^(\+66|66|0)\d{9}$/,"tr-TR":/^(\+?90|0)?5\d{9}$/,"tk-TM":/^(\+993|993|8)\d{8}$/,"uk-UA":/^(\+?38|8)?0\d{9}$/,"uz-UZ":/^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,"vi-VN":/^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,"zh-CN":/^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,"zh-TW":/^(\+?886\-?|0)?9\d{8}$/,"dz-BT":/^(\+?975|0)?(17|16|77|02)\d{6}$/,"ar-YE":/^(((\+|00)9677|0?7)[0137]\d{7}|((\+|00)967|0)[1-7]\d{6})$/,"ar-EH":/^(\+?212|0)[\s\-]?(5288|5289)[\s\-]?\d{5}$/,"fa-AF":/^(\+93|0)?(2{1}[0-8]{1}|[3-5]{1}[0-4]{1})(\d{7})$/};o["en-CA"]=o["en-US"],o["fr-CA"]=o["en-CA"],o["fr-BE"]=o["nl-BE"],o["zh-HK"]=o["en-HK"],o["zh-MO"]=o["en-MO"],o["ga-IE"]=o["en-IE"],o["fr-CH"]=o["de-CH"],o["it-CH"]=o["fr-CH"];function c(l,u,d){if((0,r.default)(l),d&&d.strictMode&&!l.startsWith("+"))return!1;if(Array.isArray(u))return u.some(function(v){if(o.hasOwnProperty(v)){var x=o[v];if(x.test(l))return!0}return!1});if(u in o)return o[u].test(l);if(!u||u==="any"){for(var p in o)if(o.hasOwnProperty(p)){var m=o[p];if(m.test(l))return!0}return!1}throw new Error("Invalid locale '".concat(u,"'"))}return ba.locales=Object.keys(o),ba}var Yu={exports:{}},ch;function R5(){return ch||(ch=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^(0x)[0-9a-f]{40}$/i;function u(d){return(0,o.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(Yu,Yu.exports)),Yu.exports}var Vu={exports:{}},uh;function $5(){return uh||(uh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var o=l(wt()),c=l(ce());function l(m){return m&&m.__esModule?m:{default:m}}function u(m){var v="\\d{".concat(m.digits_after_decimal[0],"}");m.digits_after_decimal.forEach(function(k,C){C!==0&&(v="".concat(v,"|\\d{").concat(k,"}"))});var x="(".concat(m.symbol.replace(/\W/,function(k){return"\\".concat(k)}),")").concat(m.require_symbol?"":"?"),g="-?",y="[1-9]\\d*",E="[1-9]\\d{0,2}(\\".concat(m.thousands_separator,"\\d{3})*"),A=["0",y,E],N="(".concat(A.join("|"),")?"),w="(\\".concat(m.decimal_separator,"(").concat(v,"))").concat(m.require_decimal?"":"?"),S=N+(m.allow_decimal||m.require_decimal?w:"");return m.allow_negatives&&!m.parens_for_negatives&&(m.negative_sign_after_digits?S+=g:m.negative_sign_before_digits&&(S=g+S)),m.allow_negative_sign_placeholder?S="( (?!\\-))?".concat(S):m.allow_space_after_symbol?S=" ?".concat(S):m.allow_space_after_digits&&(S+="( (?!$))?"),m.symbol_after_digits?S+=x:S=x+S,m.allow_negatives&&(m.parens_for_negatives?S="(\\(".concat(S,"\\)|").concat(S,")"):m.negative_sign_before_digits||m.negative_sign_after_digits||(S=g+S)),new RegExp("^(?!-? )(?=.*\\d)".concat(S,"$"))}var d={symbol:"$",require_symbol:!1,allow_space_after_symbol:!1,symbol_after_digits:!1,allow_negatives:!0,parens_for_negatives:!1,negative_sign_before_digits:!1,negative_sign_after_digits:!1,allow_negative_sign_placeholder:!1,thousands_separator:",",decimal_separator:".",allow_decimal:!0,require_decimal:!1,digits_after_decimal:[2],allow_space_after_digits:!1};function p(m,v){return(0,c.default)(m),v=(0,o.default)(v,d),u(v).test(m)}r.exports=a.default,r.exports.default=a.default}(Vu,Vu.exports)),Vu.exports}var Qu={exports:{}},dh;function I5(){return dh||(dh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=d;var o=c(ce());function c(p){return p&&p.__esModule?p:{default:p}}var l=/^(bc1)[a-z0-9]{25,39}$/,u=/^(1|3)[A-HJ-NP-Za-km-z1-9]{25,39}$/;function d(p){return(0,o.default)(p),l.test(p)||u.test(p)}r.exports=a.default,r.exports.default=a.default}(Qu,Qu.exports)),Qu.exports}var ya={},fh;function T5(){if(fh)return ya;fh=1,Object.defineProperty(ya,"__esModule",{value:!0}),ya.isFreightContainerID=void 0,ya.isISO6346=l;var r=a(ce());function a(u){return u&&u.__esModule?u:{default:u}}var o=/^[A-Z]{3}(U[0-9]{7})|([J,Z][0-9]{6,7})$/,c=/^[0-9]$/;function l(u){if((0,r.default)(u),u=u.toUpperCase(),!o.test(u))return!1;if(u.length===11){for(var d=0,p=0;p<u.length-1;p++)if(c.test(u[p]))d+=u[p]*Math.pow(2,p);else{var m=void 0,v=u.charCodeAt(p)-55;v<11?m=v:v>=11&&v<=20?m=12+v%11:v>=21&&v<=30?m=23+v%21:m=34+v%31,d+=m*Math.pow(2,p)}var x=d%11;return Number(u[u.length-1])===x}return!0}return ya.isFreightContainerID=l,ya}var Xu={exports:{}},ph;function F5(){return ph||(ph=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=new Set(["aa","ab","ae","af","ak","am","an","ar","as","av","ay","az","az","ba","be","bg","bh","bi","bm","bn","bo","br","bs","ca","ce","ch","co","cr","cs","cu","cv","cy","da","de","dv","dz","ee","el","en","eo","es","et","eu","fa","ff","fi","fj","fo","fr","fy","ga","gd","gl","gn","gu","gv","ha","he","hi","ho","hr","ht","hu","hy","hz","ia","id","ie","ig","ii","ik","io","is","it","iu","ja","jv","ka","kg","ki","kj","kk","kl","km","kn","ko","kr","ks","ku","kv","kw","ky","la","lb","lg","li","ln","lo","lt","lu","lv","mg","mh","mi","mk","ml","mn","mr","ms","mt","my","na","nb","nd","ne","ng","nl","nn","no","nr","nv","ny","oc","oj","om","or","os","pa","pi","pl","ps","pt","qu","rm","rn","ro","ru","rw","sa","sc","sd","se","sg","si","sk","sl","sm","sn","so","sq","sr","ss","st","su","sv","sw","ta","te","tg","th","ti","tk","tl","tn","to","tr","ts","tt","tw","ty","ug","uk","ur","uz","ve","vi","vo","wa","wo","xh","yi","yo","za","zh","zu"]);function u(d){return(0,o.default)(d),l.has(d)}r.exports=a.default,r.exports.default=a.default}(Xu,Xu.exports)),Xu.exports}var Ju={exports:{}},mh;function D5(){return mh||(mh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var o=c(ce());function c(m){return m&&m.__esModule?m:{default:m}}var l=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,u=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,d=function(m){var v=m.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);if(v){var x=Number(v[1]),g=Number(v[2]);return x%4===0&&x%100!==0||x%400===0?g<=366:g<=365}var y=m.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number),E=y[1],A=y[2],N=y[3],w=A&&"0".concat(A).slice(-2),S=N&&"0".concat(N).slice(-2),k=new Date("".concat(E,"-").concat(w||"01","-").concat(S||"01"));return A&&N?k.getUTCFullYear()===E&&k.getUTCMonth()+1===A&&k.getUTCDate()===N:!0};function p(m){var v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};(0,o.default)(m);var x=v.strictSeparator?u.test(m):l.test(m);return x&&v.strict?d(m):x}r.exports=a.default,r.exports.default=a.default}(Ju,Ju.exports)),Ju.exports}var ed={exports:{}},hh;function U5(){return hh||(hh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=S;var o=c(ce());function c(k){return k&&k.__esModule?k:{default:k}}var l=/[0-9]{4}/,u=/(0[1-9]|1[0-2])/,d=/([12]\d|0[1-9]|3[01])/,p=/([01][0-9]|2[0-3])/,m=/[0-5][0-9]/,v=/([0-5][0-9]|60)/,x=/(\.[0-9]+)?/,g=new RegExp("[-+]".concat(p.source,":").concat(m.source)),y=new RegExp("([zZ]|".concat(g.source,")")),E=new RegExp("".concat(p.source,":").concat(m.source,":").concat(v.source).concat(x.source)),A=new RegExp("".concat(l.source,"-").concat(u.source,"-").concat(d.source)),N=new RegExp("".concat(E.source).concat(y.source)),w=new RegExp("^".concat(A.source,"[ tT]").concat(N.source,"$"));function S(k){return(0,o.default)(k),w.test(k)}r.exports=a.default,r.exports.default=a.default}(ed,ed.exports)),ed.exports}var td={exports:{}},gh;function B5(){return gh||(gh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=new Set(["AFG","ALA","ALB","DZA","ASM","AND","AGO","AIA","ATA","ATG","ARG","ARM","ABW","AUS","AUT","AZE","BHS","BHR","BGD","BRB","BLR","BEL","BLZ","BEN","BMU","BTN","BOL","BES","BIH","BWA","BVT","BRA","IOT","BRN","BGR","BFA","BDI","KHM","CMR","CAN","CPV","CYM","CAF","TCD","CHL","CHN","CXR","CCK","COL","COM","COG","COD","COK","CRI","CIV","HRV","CUB","CUW","CYP","CZE","DNK","DJI","DMA","DOM","ECU","EGY","SLV","GNQ","ERI","EST","ETH","FLK","FRO","FJI","FIN","FRA","GUF","PYF","ATF","GAB","GMB","GEO","DEU","GHA","GIB","GRC","GRL","GRD","GLP","GUM","GTM","GGY","GIN","GNB","GUY","HTI","HMD","VAT","HND","HKG","HUN","ISL","IND","IDN","IRN","IRQ","IRL","IMN","ISR","ITA","JAM","JPN","JEY","JOR","KAZ","KEN","KIR","PRK","KOR","KWT","KGZ","LAO","LVA","LBN","LSO","LBR","LBY","LIE","LTU","LUX","MAC","MKD","MDG","MWI","MYS","MDV","MLI","MLT","MHL","MTQ","MRT","MUS","MYT","MEX","FSM","MDA","MCO","MNG","MNE","MSR","MAR","MOZ","MMR","NAM","NRU","NPL","NLD","NCL","NZL","NIC","NER","NGA","NIU","NFK","MNP","NOR","OMN","PAK","PLW","PSE","PAN","PNG","PRY","PER","PHL","PCN","POL","PRT","PRI","QAT","REU","ROU","RUS","RWA","BLM","SHN","KNA","LCA","MAF","SPM","VCT","WSM","SMR","STP","SAU","SEN","SRB","SYC","SLE","SGP","SXM","SVK","SVN","SLB","SOM","ZAF","SGS","SSD","ESP","LKA","SDN","SUR","SJM","SWZ","SWE","CHE","SYR","TWN","TJK","TZA","THA","TLS","TGO","TKL","TON","TTO","TUN","TUR","TKM","TCA","TUV","UGA","UKR","ARE","GBR","USA","UMI","URY","UZB","VUT","VEN","VNM","VGB","VIR","WLF","ESH","YEM","ZMB","ZWE"]);function u(d){return(0,o.default)(d),l.has(d.toUpperCase())}r.exports=a.default,r.exports.default=a.default}(td,td.exports)),td.exports}var wa={},vh;function Z5(){if(vh)return wa;vh=1,Object.defineProperty(wa,"__esModule",{value:!0}),wa.CurrencyCodes=void 0,wa.default=c;var r=a(ce());function a(l){return l&&l.__esModule?l:{default:l}}var o=new Set(["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BOV","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHE","CHF","CHW","CLF","CLP","CNY","COP","COU","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MXV","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLE","SLL","SOS","SRD","SSP","STN","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","USN","UYI","UYU","UYW","UZS","VES","VND","VUV","WST","XAF","XAG","XAU","XBA","XBB","XBC","XBD","XCD","XDR","XOF","XPD","XPF","XPT","XSU","XTS","XUA","XXX","YER","ZAR","ZMW","ZWL"]);function c(l){return(0,r.default)(l),o.has(l.toUpperCase())}return wa.CurrencyCodes=o,wa}var rd={exports:{}},xh;function q5(){return xh||(xh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=m;var o=l(ce()),c=l(wt());function l(v){return v&&v.__esModule?v:{default:v}}var u=/^[A-Z2-7]+=*$/,d=/^[A-HJKMNP-TV-Z0-9]+$/,p={crockford:!1};function m(v,x){if((0,o.default)(v),x=(0,c.default)(x,p),x.crockford)return d.test(v);var g=v.length;return!!(g%8===0&&u.test(v))}r.exports=a.default,r.exports.default=a.default}(rd,rd.exports)),rd.exports}var nd={exports:{}},bh;function H5(){return bh||(bh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[A-HJ-NP-Za-km-z1-9]*$/;function u(d){return(0,o.default)(d),!!l.test(d)}r.exports=a.default,r.exports.default=a.default}(nd,nd.exports)),nd.exports}var ad={exports:{}},yh;function W5(){return yh||(yh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var o=c(ce());function c(m){return m&&m.__esModule?m:{default:m}}var l=/^[a-z]+\/[a-z0-9\-\+\._]+$/i,u=/^[a-z\-]+=[a-z0-9\-]+$/i,d=/^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;function p(m){(0,o.default)(m);var v=m.split(",");if(v.length<2)return!1;var x=v.shift().trim().split(";"),g=x.shift();if(g.slice(0,5)!=="data:")return!1;var y=g.slice(5);if(y!==""&&!l.test(y))return!1;for(var E=0;E<x.length;E++)if(!(E===x.length-1&&x[E].toLowerCase()==="base64")&&!u.test(x[E]))return!1;for(var A=0;A<v.length;A++)if(!d.test(v[A]))return!1;return!0}r.exports=a.default,r.exports.default=a.default}(ad,ad.exports)),ad.exports}var od={exports:{}},wh;function G5(){return wh||(wh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/(?:^magnet:\?|[^?&]&)xt(?:\.1)?=urn:(?:(?:aich|bitprint|btih|ed2k|ed2khash|kzhash|md5|sha1|tree:tiger):[a-z0-9]{32}(?:[a-z0-9]{8})?|btmh:1220[a-z0-9]{64})(?:$|&)/i;function u(d){return(0,o.default)(d),d.indexOf("magnet:?")!==0?!1:l.test(d)}r.exports=a.default,r.exports.default=a.default}(od,od.exports)),od.exports}var id={exports:{}},sd={exports:{}},ld={exports:{}},kh;function d2(){return kh||(kh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){if((0,o.default)(u),d){var p=new RegExp("[".concat(d.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"]+$"),"g");return u.replace(p,"")}for(var m=u.length-1;/\s/.test(u.charAt(m));)m-=1;return u.slice(0,m+1)}r.exports=a.default,r.exports.default=a.default}(ld,ld.exports)),ld.exports}var cd={exports:{}},Nh;function f2(){return Nh||(Nh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){(0,o.default)(u);var p=d?new RegExp("^[".concat(d.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"]+"),"g"):/^\s+/g;return u.replace(p,"")}r.exports=a.default,r.exports.default=a.default}(cd,cd.exports)),cd.exports}var Sh;function p2(){return Sh||(Sh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=l(d2()),c=l(f2());function l(d){return d&&d.__esModule?d:{default:d}}function u(d,p){return(0,o.default)((0,c.default)(d,p),p)}r.exports=a.default,r.exports.default=a.default}(sd,sd.exports)),sd.exports}var jh;function K5(){return jh||(jh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=A;var o=u(p2()),c=u(r2()),l=u(ce());function u(N){return N&&N.__esModule?N:{default:N}}function d(N,w){return v(N)||m(N,w)||g(N,w)||p()}function p(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function m(N,w){var S=N==null?null:typeof Symbol<"u"&&N[Symbol.iterator]||N["@@iterator"];if(S!=null){var k,C,$,I,q=[],Z=!0,H=!1;try{if($=(S=S.call(N)).next,w!==0)for(;!(Z=(k=$.call(S)).done)&&(q.push(k.value),q.length!==w);Z=!0);}catch(Y){H=!0,C=Y}finally{try{if(!Z&&S.return!=null&&(I=S.return(),Object(I)!==I))return}finally{if(H)throw C}}return q}}function v(N){if(Array.isArray(N))return N}function x(N,w){var S=typeof Symbol<"u"&&N[Symbol.iterator]||N["@@iterator"];if(!S){if(Array.isArray(N)||(S=g(N))||w){S&&(N=S);var k=0,C=function(){};return{s:C,n:function(){return k>=N.length?{done:!0}:{done:!1,value:N[k++]}},e:function(Z){throw Z},f:C}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var $=!0,I=!1,q;return{s:function(){S=S.call(N)},n:function(){var Z=S.next();return $=Z.done,Z},e:function(Z){I=!0,q=Z},f:function(){try{!$&&S.return!=null&&S.return()}finally{if(I)throw q}}}}function g(N,w){if(N){if(typeof N=="string")return y(N,w);var S=Object.prototype.toString.call(N).slice(8,-1);if(S==="Object"&&N.constructor&&(S=N.constructor.name),S==="Map"||S==="Set")return Array.from(N);if(S==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(S))return y(N,w)}}function y(N,w){(w==null||w>N.length)&&(w=N.length);for(var S=0,k=new Array(w);S<w;S++)k[S]=N[S];return k}function E(N){var w=new Set(["subject","body","cc","bcc"]),S={cc:"",bcc:""},k=!1,C=N.split("&");if(C.length>4)return!1;var $=x(C),I;try{for($.s();!(I=$.n()).done;){var q=I.value,Z=q.split("="),H=d(Z,2),Y=H[0],R=H[1];if(Y&&!w.has(Y)){k=!0;break}R&&(Y==="cc"||Y==="bcc")&&(S[Y]=R),Y&&w.delete(Y)}}catch(te){$.e(te)}finally{$.f()}return k?!1:S}function A(N,w){if((0,l.default)(N),N.indexOf("mailto:")!==0)return!1;var S=N.replace("mailto:","").split("?"),k=d(S,2),C=k[0],$=k[1],I=$===void 0?"":$;if(!C&&!I)return!0;var q=E(I);return q?"".concat(C,",").concat(q.cc,",").concat(q.bcc).split(",").every(function(Z){return Z=(0,o.default)(Z," "),Z?(0,c.default)(Z,w):!0}):!1}r.exports=a.default,r.exports.default=a.default}(id,id.exports)),id.exports}var ud={exports:{}},Eh;function Y5(){return Eh||(Eh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=p;var o=c(ce());function c(m){return m&&m.__esModule?m:{default:m}}var l=/^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+_]{1,100}$/i,u=/^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i,d=/^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i;function p(m){return(0,o.default)(m),l.test(m)||u.test(m)||d.test(m)}r.exports=a.default,r.exports.default=a.default}(ud,ud.exports)),ud.exports}var dd={exports:{}},_h;function V5(){return _h||(_h=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=x;var o=l(ce()),c=l(wt());function l(g){return g&&g.__esModule?g:{default:g}}var u=/^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/,d=/^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/,p=/^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i,m=/^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i,v={checkDMS:!1};function x(g,y){if((0,o.default)(g),y=(0,c.default)(y,v),!g.includes(","))return!1;var E=g.split(",");return E[0].startsWith("(")&&!E[1].endsWith(")")||E[1].endsWith(")")&&!E[0].startsWith("(")?!1:y.checkDMS?p.test(E[0])&&m.test(E[1]):u.test(E[0])&&d.test(E[1])}r.exports=a.default,r.exports.default=a.default}(dd,dd.exports)),dd.exports}var ka={},Ah;function Q5(){if(Ah)return ka;Ah=1,Object.defineProperty(ka,"__esModule",{value:!0}),ka.default=p,ka.locales=void 0;var r=a(ce());function a(m){return m&&m.__esModule?m:{default:m}}var o=/^\d{3}$/,c=/^\d{4}$/,l=/^\d{5}$/,u=/^\d{6}$/,d={AD:/^AD\d{3}$/,AT:c,AU:c,AZ:/^AZ\d{4}$/,BA:/^([7-8]\d{4}$)/,BE:c,BG:c,BR:/^\d{5}-\d{3}$/,BY:/^2[1-4]\d{4}$/,CA:/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,CH:c,CN:/^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,CZ:/^\d{3}\s?\d{2}$/,DE:l,DK:c,DO:l,DZ:l,EE:l,ES:/^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,FI:l,FR:/^\d{2}\s?\d{3}$/,GB:/^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,GR:/^\d{3}\s?\d{2}$/,HR:/^([1-5]\d{4}$)/,HT:/^HT\d{4}$/,HU:c,ID:l,IE:/^(?!.*(?:o))[A-Za-z]\d[\dw]\s\w{4}$/i,IL:/^(\d{5}|\d{7})$/,IN:/^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,IR:/^(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}$/,IS:o,IT:l,JP:/^\d{3}\-\d{4}$/,KE:l,KR:/^(\d{5}|\d{6})$/,LI:/^(948[5-9]|949[0-7])$/,LT:/^LT\-\d{5}$/,LU:c,LV:/^LV\-\d{4}$/,LK:l,MG:o,MX:l,MT:/^[A-Za-z]{3}\s{0,1}\d{4}$/,MY:l,NL:/^[1-9]\d{3}\s?(?!sa|sd|ss)[a-z]{2}$/i,NO:c,NP:/^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,NZ:c,PL:/^\d{2}\-\d{3}$/,PR:/^00[679]\d{2}([ -]\d{4})?$/,PT:/^\d{4}\-\d{3}?$/,RO:u,RU:u,SA:l,SE:/^[1-9]\d{2}\s?\d{2}$/,SG:u,SI:c,SK:/^\d{3}\s?\d{2}$/,TH:l,TN:c,TW:/^\d{3}(\d{2})?$/,UA:l,US:/^\d{5}(-\d{4})?$/,ZA:c,ZM:l};ka.locales=Object.keys(d);function p(m,v){if((0,r.default)(m),v in d)return d[v].test(m);if(v==="any"){for(var x in d)if(d.hasOwnProperty(x)){var g=d[x];if(g.test(m))return!0}return!1}throw new Error("Invalid locale '".concat(v,"'"))}return ka}var fd={exports:{}},Ch;function X5(){return Ch||(Ch=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,o.default)(u),u.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\//g,"&#x2F;").replace(/\\/g,"&#x5C;").replace(/`/g,"&#96;")}r.exports=a.default,r.exports.default=a.default}(fd,fd.exports)),fd.exports}var pd={exports:{}},zh;function J5(){return zh||(zh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u){return(0,o.default)(u),u.replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#x2F;/g,"/").replace(/&#x5C;/g,"\\").replace(/&#96;/g,"`").replace(/&amp;/g,"&")}r.exports=a.default,r.exports.default=a.default}(pd,pd.exports)),pd.exports}var md={exports:{}},hd={exports:{}},Mh;function m2(){return Mh||(Mh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){return(0,o.default)(u),u.replace(new RegExp("[".concat(d,"]+"),"g"),"")}r.exports=a.default,r.exports.default=a.default}(hd,hd.exports)),hd.exports}var Oh;function ew(){return Oh||(Oh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=l(ce()),c=l(m2());function l(d){return d&&d.__esModule?d:{default:d}}function u(d,p){(0,o.default)(d);var m=p?"\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F":"\\x00-\\x1F\\x7F";return(0,c.default)(d,m)}r.exports=a.default,r.exports.default=a.default}(md,md.exports)),md.exports}var gd={exports:{}},Ph;function tw(){return Ph||(Ph=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){return(0,o.default)(u),u.replace(new RegExp("[^".concat(d,"]+"),"g"),"")}r.exports=a.default,r.exports.default=a.default}(gd,gd.exports)),gd.exports}var vd={exports:{}},Lh;function rw(){return Lh||(Lh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=l;var o=c(ce());function c(u){return u&&u.__esModule?u:{default:u}}function l(u,d){(0,o.default)(u);for(var p=u.length-1;p>=0;p--)if(d.indexOf(u[p])===-1)return!1;return!0}r.exports=a.default,r.exports.default=a.default}(vd,vd.exports)),vd.exports}var xd={exports:{}},Rh;function nw(){return Rh||(Rh=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=x;var o=c(wt());function c(g){return g&&g.__esModule?g:{default:g}}var l={all_lowercase:!0,gmail_lowercase:!0,gmail_remove_dots:!0,gmail_remove_subaddress:!0,gmail_convert_googlemaildotcom:!0,outlookdotcom_lowercase:!0,outlookdotcom_remove_subaddress:!0,yahoo_lowercase:!0,yahoo_remove_subaddress:!0,yandex_lowercase:!0,icloud_lowercase:!0,icloud_remove_subaddress:!0},u=["icloud.com","me.com"],d=["hotmail.at","hotmail.be","hotmail.ca","hotmail.cl","hotmail.co.il","hotmail.co.nz","hotmail.co.th","hotmail.co.uk","hotmail.com","hotmail.com.ar","hotmail.com.au","hotmail.com.br","hotmail.com.gr","hotmail.com.mx","hotmail.com.pe","hotmail.com.tr","hotmail.com.vn","hotmail.cz","hotmail.de","hotmail.dk","hotmail.es","hotmail.fr","hotmail.hu","hotmail.id","hotmail.ie","hotmail.in","hotmail.it","hotmail.jp","hotmail.kr","hotmail.lv","hotmail.my","hotmail.ph","hotmail.pt","hotmail.sa","hotmail.sg","hotmail.sk","live.be","live.co.uk","live.com","live.com.ar","live.com.mx","live.de","live.es","live.eu","live.fr","live.it","live.nl","msn.com","outlook.at","outlook.be","outlook.cl","outlook.co.il","outlook.co.nz","outlook.co.th","outlook.com","outlook.com.ar","outlook.com.au","outlook.com.br","outlook.com.gr","outlook.com.pe","outlook.com.tr","outlook.com.vn","outlook.cz","outlook.de","outlook.dk","outlook.es","outlook.fr","outlook.hu","outlook.id","outlook.ie","outlook.in","outlook.it","outlook.jp","outlook.kr","outlook.lv","outlook.my","outlook.ph","outlook.pt","outlook.sa","outlook.sg","outlook.sk","passport.com"],p=["rocketmail.com","yahoo.ca","yahoo.co.uk","yahoo.com","yahoo.de","yahoo.fr","yahoo.in","yahoo.it","ymail.com"],m=["yandex.ru","yandex.ua","yandex.kz","yandex.com","yandex.by","ya.ru"];function v(g){return g.length>1?g:""}function x(g,y){y=(0,o.default)(y,l);var E=g.split("@"),A=E.pop(),N=E.join("@"),w=[N,A];if(w[1]=w[1].toLowerCase(),w[1]==="gmail.com"||w[1]==="googlemail.com"){if(y.gmail_remove_subaddress&&(w[0]=w[0].split("+")[0]),y.gmail_remove_dots&&(w[0]=w[0].replace(/\.+/g,v)),!w[0].length)return!1;(y.all_lowercase||y.gmail_lowercase)&&(w[0]=w[0].toLowerCase()),w[1]=y.gmail_convert_googlemaildotcom?"gmail.com":w[1]}else if(u.indexOf(w[1])>=0){if(y.icloud_remove_subaddress&&(w[0]=w[0].split("+")[0]),!w[0].length)return!1;(y.all_lowercase||y.icloud_lowercase)&&(w[0]=w[0].toLowerCase())}else if(d.indexOf(w[1])>=0){if(y.outlookdotcom_remove_subaddress&&(w[0]=w[0].split("+")[0]),!w[0].length)return!1;(y.all_lowercase||y.outlookdotcom_lowercase)&&(w[0]=w[0].toLowerCase())}else if(p.indexOf(w[1])>=0){if(y.yahoo_remove_subaddress){var S=w[0].split("-");w[0]=S.length>1?S.slice(0,-1).join("-"):S[0]}if(!w[0].length)return!1;(y.all_lowercase||y.yahoo_lowercase)&&(w[0]=w[0].toLowerCase())}else m.indexOf(w[1])>=0?((y.all_lowercase||y.yandex_lowercase)&&(w[0]=w[0].toLowerCase()),w[1]="yandex.ru"):y.all_lowercase&&(w[0]=w[0].toLowerCase());return w.join("@")}r.exports=a.default,r.exports.default=a.default}(xd,xd.exports)),xd.exports}var bd={exports:{}},$h;function aw(){return $h||($h=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l=/^[^\s-_](?!.*?[-_]{2,})[a-z0-9-\\][^\s]*[^-_\s]$/;function u(d){return(0,o.default)(d),l.test(d)}r.exports=a.default,r.exports.default=a.default}(bd,bd.exports)),bd.exports}var yd={exports:{}},Ih;function ow(){return Ih||(Ih=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var o=c(ce());function c(d){return d&&d.__esModule?d:{default:d}}var l={"cs-CZ":function(d){return/^(([ABCDEFHIJKLMNPRSTUVXYZ]|[0-9])-?){5,8}$/.test(d)},"de-DE":function(d){return/^((A|AA|AB|AC|AE|AH|AK|AM|AN|AÖ|AP|AS|AT|AU|AW|AZ|B|BA|BB|BC|BE|BF|BH|BI|BK|BL|BM|BN|BO|BÖ|BS|BT|BZ|C|CA|CB|CE|CO|CR|CW|D|DA|DD|DE|DH|DI|DL|DM|DN|DO|DU|DW|DZ|E|EA|EB|ED|EE|EF|EG|EH|EI|EL|EM|EN|ER|ES|EU|EW|F|FB|FD|FF|FG|FI|FL|FN|FO|FR|FS|FT|FÜ|FW|FZ|G|GA|GC|GD|GE|GF|GG|GI|GK|GL|GM|GN|GÖ|GP|GR|GS|GT|GÜ|GV|GW|GZ|H|HA|HB|HC|HD|HE|HF|HG|HH|HI|HK|HL|HM|HN|HO|HP|HR|HS|HU|HV|HX|HY|HZ|IK|IL|IN|IZ|J|JE|JL|K|KA|KB|KC|KE|KF|KG|KH|KI|KK|KL|KM|KN|KO|KR|KS|KT|KU|KW|KY|L|LA|LB|LC|LD|LF|LG|LH|LI|LL|LM|LN|LÖ|LP|LR|LU|M|MA|MB|MC|MD|ME|MG|MH|MI|MK|ML|MM|MN|MO|MQ|MR|MS|MÜ|MW|MY|MZ|N|NB|ND|NE|NF|NH|NI|NK|NM|NÖ|NP|NR|NT|NU|NW|NY|NZ|OA|OB|OC|OD|OE|OF|OG|OH|OK|OL|OP|OS|OZ|P|PA|PB|PE|PF|PI|PL|PM|PN|PR|PS|PW|PZ|R|RA|RC|RD|RE|RG|RH|RI|RL|RM|RN|RO|RP|RS|RT|RU|RV|RW|RZ|S|SB|SC|SE|SG|SI|SK|SL|SM|SN|SO|SP|SR|ST|SU|SW|SY|SZ|TE|TF|TG|TO|TP|TR|TS|TT|TÜ|ÜB|UE|UH|UL|UM|UN|V|VB|VG|VK|VR|VS|W|WA|WB|WE|WF|WI|WK|WL|WM|WN|WO|WR|WS|WT|WÜ|WW|WZ|Z|ZE|ZI|ZP|ZR|ZW|ZZ)[- ]?[A-Z]{1,2}[- ]?\d{1,4}|(ABG|ABI|AIB|AIC|ALF|ALZ|ANA|ANG|ANK|APD|ARN|ART|ASL|ASZ|AUR|AZE|BAD|BAR|BBG|BCH|BED|BER|BGD|BGL|BID|BIN|BIR|BIT|BIW|BKS|BLB|BLK|BNA|BOG|BOH|BOR|BOT|BRA|BRB|BRG|BRK|BRL|BRV|BSB|BSK|BTF|BÜD|BUL|BÜR|BÜS|BÜZ|CAS|CHA|CLP|CLZ|COC|COE|CUX|DAH|DAN|DAU|DBR|DEG|DEL|DGF|DIL|DIN|DIZ|DKB|DLG|DON|DUD|DÜW|EBE|EBN|EBS|ECK|EIC|EIL|EIN|EIS|EMD|EMS|ERB|ERH|ERK|ERZ|ESB|ESW|FDB|FDS|FEU|FFB|FKB|FLÖ|FOR|FRG|FRI|FRW|FTL|FÜS|GAN|GAP|GDB|GEL|GEO|GER|GHA|GHC|GLA|GMN|GNT|GOA|GOH|GRA|GRH|GRI|GRM|GRZ|GTH|GUB|GUN|GVM|HAB|HAL|HAM|HAS|HBN|HBS|HCH|HDH|HDL|HEB|HEF|HEI|HER|HET|HGN|HGW|HHM|HIG|HIP|HMÜ|HOG|HOH|HOL|HOM|HOR|HÖS|HOT|HRO|HSK|HST|HVL|HWI|IGB|ILL|JÜL|KEH|KEL|KEM|KIB|KLE|KLZ|KÖN|KÖT|KÖZ|KRU|KÜN|KUS|KYF|LAN|LAU|LBS|LBZ|LDK|LDS|LEO|LER|LEV|LIB|LIF|LIP|LÖB|LOS|LRO|LSZ|LÜN|LUP|LWL|MAB|MAI|MAK|MAL|MED|MEG|MEI|MEK|MEL|MER|MET|MGH|MGN|MHL|MIL|MKK|MOD|MOL|MON|MOS|MSE|MSH|MSP|MST|MTK|MTL|MÜB|MÜR|MYK|MZG|NAB|NAI|NAU|NDH|NEA|NEB|NEC|NEN|NES|NEW|NMB|NMS|NOH|NOL|NOM|NOR|NVP|NWM|OAL|OBB|OBG|OCH|OHA|ÖHR|OHV|OHZ|OPR|OSL|OVI|OVL|OVP|PAF|PAN|PAR|PCH|PEG|PIR|PLÖ|PRÜ|QFT|QLB|RDG|REG|REH|REI|RID|RIE|ROD|ROF|ROK|ROL|ROS|ROT|ROW|RSL|RÜD|RÜG|SAB|SAD|SAN|SAW|SBG|SBK|SCZ|SDH|SDL|SDT|SEB|SEE|SEF|SEL|SFB|SFT|SGH|SHA|SHG|SHK|SHL|SIG|SIM|SLE|SLF|SLK|SLN|SLS|SLÜ|SLZ|SMÜ|SOB|SOG|SOK|SÖM|SON|SPB|SPN|SRB|SRO|STA|STB|STD|STE|STL|SUL|SÜW|SWA|SZB|TBB|TDO|TET|TIR|TÖL|TUT|UEM|UER|UFF|USI|VAI|VEC|VER|VIB|VIE|VIT|VOH|WAF|WAK|WAN|WAR|WAT|WBS|WDA|WEL|WEN|WER|WES|WHV|WIL|WIS|WIT|WIZ|WLG|WMS|WND|WOB|WOH|WOL|WOR|WOS|WRN|WSF|WST|WSW|WTL|WTM|WUG|WÜM|WUN|WUR|WZL|ZEL|ZIG)[- ]?(([A-Z][- ]?\d{1,4})|([A-Z]{2}[- ]?\d{1,3})))[- ]?(E|H)?$/.test(d)},"de-LI":function(d){return/^FL[- ]?\d{1,5}[UZ]?$/.test(d)},"en-IN":function(d){return/^[A-Z]{2}[ -]?[0-9]{1,2}(?:[ -]?[A-Z])(?:[ -]?[A-Z]*)?[ -]?[0-9]{4}$/.test(d)},"es-AR":function(d){return/^(([A-Z]{2} ?[0-9]{3} ?[A-Z]{2})|([A-Z]{3} ?[0-9]{3}))$/.test(d)},"fi-FI":function(d){return/^(?=.{4,7})(([A-Z]{1,3}|[0-9]{1,3})[\s-]?([A-Z]{1,3}|[0-9]{1,5}))$/.test(d)},"hu-HU":function(d){return/^((((?!AAA)(([A-NPRSTVZWXY]{1})([A-PR-Z]{1})([A-HJ-NPR-Z]))|(A[ABC]I)|A[ABC]O|A[A-W]Q|BPI|BPO|UCO|UDO|XAO)-(?!000)\d{3})|(M\d{6})|((CK|DT|CD|HC|H[ABEFIKLMNPRSTVX]|MA|OT|R[A-Z]) \d{2}-\d{2})|(CD \d{3}-\d{3})|(C-(C|X) \d{4})|(X-(A|B|C) \d{4})|(([EPVZ]-\d{5}))|(S A[A-Z]{2} \d{2})|(SP \d{2}-\d{2}))$/.test(d)},"pt-BR":function(d){return/^[A-Z]{3}[ -]?[0-9][A-Z][0-9]{2}|[A-Z]{3}[ -]?[0-9]{4}$/.test(d)},"pt-PT":function(d){return/^([A-Z]{2}|[0-9]{2})[ -·]?([A-Z]{2}|[0-9]{2})[ -·]?([A-Z]{2}|[0-9]{2})$/.test(d)},"sq-AL":function(d){return/^[A-Z]{2}[- ]?((\d{3}[- ]?(([A-Z]{2})|T))|(R[- ]?\d{3}))$/.test(d)},"sv-SE":function(d){return/^[A-HJ-PR-UW-Z]{3} ?[\d]{2}[A-HJ-PR-UW-Z1-9]$|(^[A-ZÅÄÖ ]{2,7}$)/.test(d.trim())},"en-PK":function(d){return/(^[A-Z]{2}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]{3}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]{4}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]((\s|-){0,1})[0-9]{4}((\s|-)[0-9]{2}){0,1}$)/.test(d.trim())}};function u(d,p){if((0,o.default)(d),p in l)return l[p](d);if(p==="any"){for(var m in l){var v=l[m];if(v(d))return!0}return!1}throw new Error("Invalid locale '".concat(p,"'"))}r.exports=a.default,r.exports.default=a.default}(yd,yd.exports)),yd.exports}var wd={exports:{}},Th;function iw(){return Th||(Th=1,function(r,a){Object.defineProperty(a,"__esModule",{value:!0}),a.default=E;var o=l(wt()),c=l(ce());function l(A){return A&&A.__esModule?A:{default:A}}var u=/^[A-Z]$/,d=/^[a-z]$/,p=/^[0-9]$/,m=/^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/\\ ]$/,v={minLength:8,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols:1,returnScore:!1,pointsPerUnique:1,pointsPerRepeat:.5,pointsForContainingLower:10,pointsForContainingUpper:10,pointsForContainingNumber:10,pointsForContainingSymbol:10};function x(A){var N={};return Array.from(A).forEach(function(w){var S=N[w];S?N[w]+=1:N[w]=1}),N}function g(A){var N=x(A),w={length:A.length,uniqueChars:Object.keys(N).length,uppercaseCount:0,lowercaseCount:0,numberCount:0,symbolCount:0};return Object.keys(N).forEach(function(S){u.test(S)?w.uppercaseCount+=N[S]:d.test(S)?w.lowercaseCount+=N[S]:p.test(S)?w.numberCount+=N[S]:m.test(S)&&(w.symbolCount+=N[S])}),w}function y(A,N){var w=0;return w+=A.uniqueChars*N.pointsPerUnique,w+=(A.length-A.uniqueChars)*N.pointsPerRepeat,A.lowercaseCount>0&&(w+=N.pointsForContainingLower),A.uppercaseCount>0&&(w+=N.pointsForContainingUpper),A.numberCount>0&&(w+=N.pointsForContainingNumber),A.symbolCount>0&&(w+=N.pointsForContainingSymbol),w}function E(A){var N=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;(0,c.default)(A);var w=g(A);return N=(0,o.default)(N||{},v),N.returnScore?y(w,N):w.length>=N.minLength&&w.lowercaseCount>=N.minLowercase&&w.uppercaseCount>=N.minUppercase&&w.numberCount>=N.minNumbers&&w.symbolCount>=N.minSymbols}r.exports=a.default,r.exports.default=a.default}(wd,wd.exports)),wd.exports}var Na={},Fh;function sw(){if(Fh)return Na;Fh=1;function r(g){"@babel/helpers - typeof";return r=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(y){return typeof y}:function(y){return y&&typeof Symbol=="function"&&y.constructor===Symbol&&y!==Symbol.prototype?"symbol":typeof y},r(g)}Object.defineProperty(Na,"__esModule",{value:!0}),Na.default=x,Na.vatMatchers=void 0;var a=u(ce()),o=l(u2());function c(g){if(typeof WeakMap!="function")return null;var y=new WeakMap,E=new WeakMap;return(c=function(A){return A?E:y})(g)}function l(g,y){if(g&&g.__esModule)return g;if(g===null||r(g)!="object"&&typeof g!="function")return{default:g};var E=c(y);if(E&&E.has(g))return E.get(g);var A={__proto__:null},N=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var w in g)if(w!=="default"&&{}.hasOwnProperty.call(g,w)){var S=N?Object.getOwnPropertyDescriptor(g,w):null;S&&(S.get||S.set)?Object.defineProperty(A,w,S):A[w]=g[w]}return A.default=g,E&&E.set(g,A),A}function u(g){return g&&g.__esModule?g:{default:g}}var d=function(g){var y=g.match(/^(AU)?(\d{11})$/);if(!y)return!1;var E=[10,1,3,5,7,9,11,13,15,17,19];g=g.replace(/^AU/,"");for(var A=(parseInt(g.slice(0,1),10)-1).toString()+g.slice(1),N=0,w=0;w<11;w++)N+=E[w]*A.charAt(w);return N!==0&&N%89===0},p=function(g){var y=function(E){var A=E.pop(),N=[5,4,3,2,7,6,5,4],w=(11-E.reduce(function(S,k,C){return S+k*N[C]},0)%11)%11;return A===w};return/^(CHE[- ]?)?(\d{9}|(\d{3}\.\d{3}\.\d{3})|(\d{3} \d{3} \d{3})) ?(TVA|MWST|IVA)?$/.test(g)&&y(g.match(/\d/g).map(function(E){return+E}))},m=function(g){var y=g.match(/^(PT)?(\d{9})$/);if(!y)return!1;var E=y[2],A=11-o.reverseMultiplyAndSum(E.split("").slice(0,8).map(function(N){return parseInt(N,10)}),9)%11;return A>9?parseInt(E[8],10)===0:A===parseInt(E[8],10)},v=Na.vatMatchers={AT:function(g){return/^(AT)?U\d{8}$/.test(g)},BE:function(g){return/^(BE)?\d{10}$/.test(g)},BG:function(g){return/^(BG)?\d{9,10}$/.test(g)},HR:function(g){return/^(HR)?\d{11}$/.test(g)},CY:function(g){return/^(CY)?\w{9}$/.test(g)},CZ:function(g){return/^(CZ)?\d{8,10}$/.test(g)},DK:function(g){return/^(DK)?\d{8}$/.test(g)},EE:function(g){return/^(EE)?\d{9}$/.test(g)},FI:function(g){return/^(FI)?\d{8}$/.test(g)},FR:function(g){return/^(FR)?\w{2}\d{9}$/.test(g)},DE:function(g){return/^(DE)?\d{9}$/.test(g)},EL:function(g){return/^(EL)?\d{9}$/.test(g)},HU:function(g){return/^(HU)?\d{8}$/.test(g)},IE:function(g){return/^(IE)?\d{7}\w{1}(W)?$/.test(g)},IT:function(g){return/^(IT)?\d{11}$/.test(g)},LV:function(g){return/^(LV)?\d{11}$/.test(g)},LT:function(g){return/^(LT)?\d{9,12}$/.test(g)},LU:function(g){return/^(LU)?\d{8}$/.test(g)},MT:function(g){return/^(MT)?\d{8}$/.test(g)},NL:function(g){return/^(NL)?\d{9}B\d{2}$/.test(g)},PL:function(g){return/^(PL)?(\d{10}|(\d{3}-\d{3}-\d{2}-\d{2})|(\d{3}-\d{2}-\d{2}-\d{3}))$/.test(g)},PT:m,RO:function(g){return/^(RO)?\d{2,10}$/.test(g)},SK:function(g){return/^(SK)?\d{10}$/.test(g)},SI:function(g){return/^(SI)?\d{8}$/.test(g)},ES:function(g){return/^(ES)?\w\d{7}[A-Z]$/.test(g)},SE:function(g){return/^(SE)?\d{12}$/.test(g)},AL:function(g){return/^(AL)?\w{9}[A-Z]$/.test(g)},MK:function(g){return/^(MK)?\d{13}$/.test(g)},AU:d,BY:function(g){return/^(УНП )?\d{9}$/.test(g)},CA:function(g){return/^(CA)?\d{9}$/.test(g)},IS:function(g){return/^(IS)?\d{5,6}$/.test(g)},IN:function(g){return/^(IN)?\d{15}$/.test(g)},ID:function(g){return/^(ID)?(\d{15}|(\d{2}.\d{3}.\d{3}.\d{1}-\d{3}.\d{3}))$/.test(g)},IL:function(g){return/^(IL)?\d{9}$/.test(g)},KZ:function(g){return/^(KZ)?\d{12}$/.test(g)},NZ:function(g){return/^(NZ)?\d{9}$/.test(g)},NG:function(g){return/^(NG)?(\d{12}|(\d{8}-\d{4}))$/.test(g)},NO:function(g){return/^(NO)?\d{9}MVA$/.test(g)},PH:function(g){return/^(PH)?(\d{12}|\d{3} \d{3} \d{3} \d{3})$/.test(g)},RU:function(g){return/^(RU)?(\d{10}|\d{12})$/.test(g)},SM:function(g){return/^(SM)?\d{5}$/.test(g)},SA:function(g){return/^(SA)?\d{15}$/.test(g)},RS:function(g){return/^(RS)?\d{9}$/.test(g)},CH:p,TR:function(g){return/^(TR)?\d{10}$/.test(g)},UA:function(g){return/^(UA)?\d{12}$/.test(g)},GB:function(g){return/^GB((\d{3} \d{4} ([0-8][0-9]|9[0-6]))|(\d{9} \d{3})|(((GD[0-4])|(HA[5-9]))[0-9]{2}))$/.test(g)},UZ:function(g){return/^(UZ)?\d{9}$/.test(g)},AR:function(g){return/^(AR)?\d{11}$/.test(g)},BO:function(g){return/^(BO)?\d{7}$/.test(g)},BR:function(g){return/^(BR)?((\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})|(\d{3}.\d{3}.\d{3}-\d{2}))$/.test(g)},CL:function(g){return/^(CL)?\d{8}-\d{1}$/.test(g)},CO:function(g){return/^(CO)?\d{10}$/.test(g)},CR:function(g){return/^(CR)?\d{9,12}$/.test(g)},EC:function(g){return/^(EC)?\d{13}$/.test(g)},SV:function(g){return/^(SV)?\d{4}-\d{6}-\d{3}-\d{1}$/.test(g)},GT:function(g){return/^(GT)?\d{7}-\d{1}$/.test(g)},HN:function(g){return/^(HN)?$/.test(g)},MX:function(g){return/^(MX)?\w{3,4}\d{6}\w{3}$/.test(g)},NI:function(g){return/^(NI)?\d{3}-\d{6}-\d{4}\w{1}$/.test(g)},PA:function(g){return/^(PA)?$/.test(g)},PY:function(g){return/^(PY)?\d{6,8}-\d{1}$/.test(g)},PE:function(g){return/^(PE)?\d{11}$/.test(g)},DO:function(g){return/^(DO)?(\d{11}|(\d{3}-\d{7}-\d{1})|[1,4,5]{1}\d{8}|([1,4,5]{1})-\d{2}-\d{5}-\d{1})$/.test(g)},UY:function(g){return/^(UY)?\d{12}$/.test(g)},VE:function(g){return/^(VE)?[J,G,V,E]{1}-(\d{9}|(\d{8}-\d{1}))$/.test(g)}};function x(g,y){if((0,a.default)(g),(0,a.default)(y),y in v)return v[y](g);throw new Error("Invalid country code: '".concat(y,"'"))}return Na}var Dh;function lw(){return Dh||(Dh=1,function(r,a){function o(ze){"@babel/helpers - typeof";return o=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(Tt){return typeof Tt}:function(Tt){return Tt&&typeof Symbol=="function"&&Tt.constructor===Symbol&&Tt!==Symbol.prototype?"symbol":typeof Tt},o(ze)}Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var c=se(ff()),l=se(Jg()),u=se(L4()),d=se(R4()),p=se($4()),m=se(I4()),v=se(T4()),x=se(r2()),g=se(F4()),y=se(D4()),E=se(Is()),A=se(U4()),N=se(pf()),w=se(n2()),S=se(B4()),k=se(Z4()),C=se(q4()),$=se(H4()),I=xr(W4()),q=xr(G4()),Z=se(K4()),H=se(Y4()),Y=se(V4()),R=se(Q4()),te=se(X4()),pe=se(J4()),J=se(e5()),fe=se(a2()),G=se(o2()),ae=se(t5()),W=se(r5()),F=se(a5()),V=se(o5()),Q=se(mf()),L=xr(Xg()),K=se(s5()),be=se(i2()),ke=se(l5()),_e=se(c5()),Ae=se(u5()),Pe=se(d5()),Le=se(f5()),Oe=se(p5()),Ye=xr(m5()),$r=se(h5()),In=se(g5()),st=se(v5()),ut=se(x5()),pn=se(b5()),hr=se(y5()),mn=se(w5()),j=se(t2()),M=se(k5()),U=se(N5()),re=se(S5()),oe=se(j5()),ue=se(E5()),Ne=se(c2()),Me=se(_5()),Ie=se(A5()),Be=se(C5()),$t=se(z5()),It=se(M5()),dt=se(O5()),Wt=se(P5()),hn=xr(L5()),nr=se(R5()),gr=se($5()),Tn=se(I5()),Fn=T5(),La=se(F5()),Ra=se(D5()),$a=se(U5()),Ia=se(s2()),Ir=se(B5()),Tr=se(Z5()),Ho=se(q5()),Wo=se(H5()),Go=se(l2()),Ko=se(W5()),Yo=se(G5()),Ta=se(K5()),Vo=se(Y5()),gn=se(V5()),Dn=xr(Q5()),vn=se(f2()),Ts=se(d2()),xn=se(p2()),Un=se(X5()),Bn=se(J5()),Fa=se(ew()),Fs=se(tw()),Ds=se(m2()),Us=se(rw()),vr=se(nw()),Qo=se(aw()),Xo=se(ow()),Bs=se(iw()),Jo=se(sw());function Da(ze){if(typeof WeakMap!="function")return null;var Tt=new WeakMap,Gt=new WeakMap;return(Da=function(ar){return ar?Gt:Tt})(ze)}function xr(ze,Tt){if(ze&&ze.__esModule)return ze;if(ze===null||o(ze)!="object"&&typeof ze!="function")return{default:ze};var Gt=Da(Tt);if(Gt&&Gt.has(ze))return Gt.get(ze);var ar={__proto__:null},Zn=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var Fr in ze)if(Fr!=="default"&&{}.hasOwnProperty.call(ze,Fr)){var bn=Zn?Object.getOwnPropertyDescriptor(ze,Fr):null;bn&&(bn.get||bn.set)?Object.defineProperty(ar,Fr,bn):ar[Fr]=ze[Fr]}return ar.default=ze,Gt&&Gt.set(ze,ar),ar}function se(ze){return ze&&ze.__esModule?ze:{default:ze}}var Zs="13.12.0",qs={version:Zs,toDate:c.default,toFloat:l.default,toInt:u.default,toBoolean:d.default,equals:p.default,contains:m.default,matches:v.default,isEmail:x.default,isURL:g.default,isMACAddress:y.default,isIP:E.default,isIPRange:A.default,isFQDN:N.default,isBoolean:k.default,isIBAN:Ye.default,isBIC:$r.default,isAbaRouting:$.default,isAlpha:I.default,isAlphaLocales:I.locales,isAlphanumeric:q.default,isAlphanumericLocales:q.locales,isNumeric:Z.default,isPassportNumber:H.default,isPort:Y.default,isLowercase:R.default,isUppercase:te.default,isAscii:J.default,isFullWidth:fe.default,isHalfWidth:G.default,isVariableWidth:ae.default,isMultibyte:W.default,isSemVer:F.default,isSurrogatePair:V.default,isInt:Q.default,isIMEI:pe.default,isFloat:L.default,isFloatLocales:L.locales,isDecimal:K.default,isHexadecimal:be.default,isOctal:ke.default,isDivisibleBy:_e.default,isHexColor:Ae.default,isRgbColor:Pe.default,isHSL:Le.default,isISRC:Oe.default,isMD5:In.default,isHash:st.default,isJWT:ut.default,isJSON:pn.default,isEmpty:hr.default,isLength:mn.default,isLocale:C.default,isByteLength:j.default,isUUID:M.default,isMongoId:U.default,isAfter:re.default,isBefore:oe.default,isIn:ue.default,isLuhnNumber:Ne.default,isCreditCard:Me.default,isIdentityCard:Ie.default,isEAN:Be.default,isISIN:$t.default,isISBN:It.default,isISSN:dt.default,isMobilePhone:hn.default,isMobilePhoneLocales:hn.locales,isPostalCode:Dn.default,isPostalCodeLocales:Dn.locales,isEthereumAddress:nr.default,isCurrency:gr.default,isBtcAddress:Tn.default,isISO6346:Fn.isISO6346,isFreightContainerID:Fn.isFreightContainerID,isISO6391:La.default,isISO8601:Ra.default,isRFC3339:$a.default,isISO31661Alpha2:Ia.default,isISO31661Alpha3:Ir.default,isISO4217:Tr.default,isBase32:Ho.default,isBase58:Wo.default,isBase64:Go.default,isDataURI:Ko.default,isMagnetURI:Yo.default,isMailtoURI:Ta.default,isMimeType:Vo.default,isLatLong:gn.default,ltrim:vn.default,rtrim:Ts.default,trim:xn.default,escape:Un.default,unescape:Bn.default,stripLow:Fa.default,whitelist:Fs.default,blacklist:Ds.default,isWhitelisted:Us.default,normalizeEmail:vr.default,toString,isSlug:Qo.default,isStrongPassword:Bs.default,isTaxID:Wt.default,isDate:w.default,isTime:S.default,isLicensePlate:Xo.default,isVAT:Jo.default,ibanLocales:Ye.locales};a.default=qs,r.exports=a.default,r.exports.default=a.default}(Ic,Ic.exports)),Ic.exports}var cw=lw();const uw=Hd(cw),dw=()=>{Lr();const[r,a]=z.useState(!1),[o,c]=z.useState(!1),[l,u]=z.useState(!1),[d,p]=z.useState(!1),[m,v]=z.useState(!1),[x,g]=z.useState({username:"",email:"",password:"",confirmPassword:""}),[y,E]=z.useState(!1),[A,N]=z.useState(!1),w=20,S={minLength:/.{10,}/,minNumber:/\d/,hasSpecial:/[!@#$%^&*(),.?":{}|<>]/},[k,C]=z.useState({minLength:!1,minNumber:!1,hasSpecial:!1}),$=R=>{C({minLength:S.minLength.test(R),minNumber:S.minNumber.test(R),hasSpecial:S.hasSpecial.test(R)})},I=R=>{const{name:te,value:pe}=R.target;if(te==="email"){const J=uw.isEmail(pe);g(fe=>({...fe,[te]:pe})),E(!J&&pe!==""),N(J&&pe!=="")}else te==="password"?pe.length<=w&&(g(J=>({...J,[te]:pe})),$(pe)):pe.length<=w&&g(J=>({...J,[te]:pe}))},q=()=>!x.username||!x.email||!x.password||!x.confirmPassword?(we.error("Please fill in all fields"),!1):x.password!==x.confirmPassword?(we.error("Passwords do not match!"),!1):A?Object.entries(S).every(([R,te])=>te.test(x.password))?!0:(we.error("Password does not meet all requirements"),!1):(we.error("Please enter a valid email address"),!1),Z=async R=>{if(R.preventDefault(),!!q()){c(!0);try{const te=await fetch("http://localhost:5000/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:x.username,email:x.email,password:x.password})}),pe=await te.json();if(!te.ok)throw new Error(pe.error||"Registration Failed");setTimeout(()=>{c(!1),a(!0)},1500)}catch(te){c(!1),we.error(te.message)}}},H=()=>{sessionStorage.setItem("isAuthenticated","true"),sessionStorage.setItem("username",x.username),we.success("Login successful!",{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark",onClose:()=>{Y(),window.location.href=Ee.DASHBOARD}})},Y=()=>{g({username:"",email:"",password:"",confirmPassword:""}),E(!1),N(!1)};return s.jsx(s.Fragment,{children:r?s.jsx(lg,{onSuccess:H,onCancel:()=>a(!1)}):s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"sidebar",children:s.jsx("h3",{className:"sidebar-title",children:"Register a new account here"})}),s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"register-form-container",children:[s.jsx("h2",{children:"Create Account"}),s.jsxs("form",{className:"login-form",onSubmit:Z,children:[s.jsxs("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",htmlFor:"username",children:"Username:"}),s.jsxs("div",{className:"input-wrapper",children:[s.jsx("input",{type:"text",id:"username",name:"username",placeholder:"Choose a username",className:"form-input",value:x.username,onChange:I,required:!0}),s.jsxs("span",{className:"char-count",children:[x.username.length,"/",w]})]})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",htmlFor:"email",children:"Email:"}),s.jsxs("div",{className:"input-wrapper",children:[s.jsx("input",{type:"email",id:"email",name:"email",placeholder:"Enter your email",className:`form-input ${y?"invalid":""} ${A?"valid":""}`,value:x.email,onChange:I,required:!0}),y&&s.jsx("span",{className:"error-message",children:"Email is not valid"}),A&&s.jsx("span",{className:"success-message",children:"Email is valid"})]})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",htmlFor:"password",children:"Password:"}),s.jsxs("div",{className:"input-wrapper",children:[s.jsx("input",{type:d?"text":"password",id:"password",name:"password",placeholder:"Create a password",className:"form-input",value:x.password,onChange:I,onFocus:()=>u(!0),onBlur:()=>u(!1),required:!0}),s.jsx("button",{type:"button",className:"toggle-password-btn",onClick:()=>p(!d),"aria-label":d?"Hide password":"Show password",children:s.jsx(X,{icon:d?$o:Ro,style:{color:"#ffffff"}})}),s.jsxs("span",{className:"char-count",children:[x.password.length,"/",w]}),l&&s.jsx("div",{className:"password-requirements-dropdown",children:s.jsxs("ul",{children:[s.jsx("li",{className:k.minLength?"requirements-met":"requirements-not-met",children:"Minimum 10 characters"}),s.jsx("li",{className:k.minNumber?"requirements-met":"requirements-not-met",children:"Contains at least one number"}),s.jsx("li",{className:k.hasSpecial?"requirements-met":"requirements-not-met",children:"Contains atleast one special character"})]})})]})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",htmlFor:"confirmPassword",children:"Confirm Password:"}),s.jsxs("div",{className:"input-wrapper",children:[s.jsx("input",{type:m?"text":"password",id:"confirmPassword",name:"confirmPassword",placeholder:"Confirm your password",className:"form-input",value:x.confirmPassword,onChange:I,required:!0}),s.jsx("button",{type:"button",className:"toggle-password-btn",onClick:()=>v(!m),"aria-label":m?"Hide password":"Show password",children:s.jsx(X,{icon:m?$o:Ro,style:{color:"#ffffff"}})}),s.jsxs("span",{className:"char-count",children:[x.confirmPassword.length,"/",w]})]})]}),s.jsx("button",{type:"submit",className:"login-btn register-btn",disabled:o,style:{position:"relative",cursor:o?"not-allowed":"pointer",opacity:o?.7:1},children:o?s.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[s.jsx("span",{style:{width:"20px",height:"20px",border:"3px solid #ffffff",borderTop:"3px solid transparent",borderRadius:"50%",animation:"spin 1s linear infinite"}}),"Verifying..."]}):s.jsxs(s.Fragment,{children:[s.jsx("span",{children:"Sign Up"}),s.jsx(X,{icon:Gg,className:"login-icon"})]})}),s.jsx("style",{children:`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    
                    .login-btn, .register-btn {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 10px;
                    }
                    
                    .login-icon {
                      margin-left: 8px;
                    }
                    
                    .password-requirements-dropdown {
                      position: absolute;
                      top: 100%;
                      left: 0;
                      width: 100%;
                      background-color: #1a1a1a;
                      border-radius: 6px;
                      padding: 0.75rem;
                      margin-top: 0.25rem;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      z-index: 10;
                      box-sizing: border-box;
                    }
                    
                    .password-requirements-dropdown ul {
                      list-style: none;
                      padding: 0;
                      margin: 0;
                    }
                    
                    .password-requirements-dropdown li {
                      padding: 0.25rem 0;
                      display: flex;
                      align-items: center;
                      font-size: 0.85em;
                    }
                    
                    .password-requirements-dropdown li::before {
                      content: "•";
                      margin-right: 0.5rem;
                    }
                    
                    .requirements-met {
                      color: #4caf50;
                    }
                    
                    .requirements-not-met {
                      color: #ff4444;
                    }
                    
                    /* Adjust input field to avoid text overlapping with the icon */
                    .form-input {
                      padding-right: 40px;
                    }
                    
                    /* Move character count to avoid overlap */
                    .char-count {
                      position: absolute;
                      right: 30px;
                      top: 50%;
                      transform: translateY(-50%);
                      font-size: 0.9rem;
                      color: #666;
                    }
                  `}),s.jsxs("div",{className:"register-container",children:[s.jsx("span",{children:"Already have an account? "}),s.jsx(zr,{to:Ee.LOGIN,className:"register-link",children:"Login here"})]})]})]})})]})})},Uh=()=>{const r=Lr();return s.jsxs("div",{style:{textAlign:"center",padding:"2rem",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[s.jsx("h1",{style:{fontSize:"2rem",marginBottom:"1rem"},children:"Oops, something went wrong!"}),s.jsx("p",{style:{fontSize:"1rem",marginBottom:"2rem",color:"#666"},children:"Tarnished, your page seizes to exist"}),s.jsx("button",{onClick:()=>r("/"),style:{padding:"0.75rem 1.5rem",fontSize:"1rem",backgroundColor:"#1a1a1a",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Go to Home"})]})},fw=()=>{const r=At(),[a,o]=z.useState(!1),[c,l]=z.useState(!1),u=r.pathname.startsWith("/quiz");z.useEffect(()=>{u&&l(!0)},[u]),z.useEffect(()=>{const x=g=>{a&&!g.target.closest(".sidebar")&&!g.target.closest(".mobile-menu-toggle")&&o(!1)};return document.addEventListener("mousedown",x),document.addEventListener("touchstart",x),()=>{document.removeEventListener("mousedown",x),document.removeEventListener("touchstart",x)}},[a]),z.useEffect(()=>{const x=()=>{window.innerWidth>768&&a&&o(!1)};return window.addEventListener("resize",x),()=>window.removeEventListener("resize",x)},[a]);const d=()=>{we.warn(s.jsxs("div",{className:"custom-toast",children:[s.jsx("p",{children:"Are you sure you want to logout?"}),s.jsxs("div",{style:{display:"flex",gap:"1rem",marginTop:"1rem"},children:[s.jsx("button",{onClick:()=>{we.dismiss(),p()},className:"toast-button-yes",children:"Yes"}),s.jsx("button",{onClick:()=>we.dismiss(),className:"toast-button-cancel",children:"Cancel"})]})]}),{position:"top-center",autoClose:!1,closeButton:!1,draggable:!0,closeOnClick:!1,theme:"dark",hideProgressBar:!0,pauseOnHover:!0})},p=()=>{sessionStorage.setItem("just_logged_out","true"),sessionStorage.removeItem("isAuthenticated"),sessionStorage.removeItem("username"),we.success("Logging you out...",{position:"top-center",autoClose:1500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"dark",onClose:()=>{window.location.href=Ee.LOGIN}})},m=()=>{o(!1)},v=x=>{x.preventDefault(),l(!c)};return s.jsxs(s.Fragment,{children:[s.jsx("div",{className:`mobile-menu-toggle ${a?"active":""}`,onClick:()=>o(!a),"aria-label":"Toggle navigation menu",children:s.jsx(X,{icon:a?Qg:c4})}),s.jsx("div",{className:`mobile-menu-overlay ${a?"show":""}`,onClick:()=>o(!1)}),s.jsxs("nav",{className:`sidebar ${a?"open":""}`,children:[s.jsx("div",{className:"nav-brand",children:"Social Engineering"}),s.jsxs("div",{className:"nav-links-box",children:[s.jsxs(Ar,{to:Ee.DASHBOARD,onClick:m,children:[s.jsx(X,{icon:Vg,className:"nav-icon"})," Dashboard"]}),s.jsxs("div",{className:`nav-item-with-submenu ${c?"open":""}`,children:[s.jsxs(Ar,{to:Ee.QUIZ,onClick:v,className:({isActive:x})=>x||u?"active":"",children:[s.jsxs("div",{className:"nav-link-content",children:[s.jsx(X,{icon:Mr,className:"nav-icon"}),s.jsx("span",{className:"nav-text",children:"Quiz"})]}),s.jsx(X,{icon:c?m4:S4,className:"submenu-icon"})]}),s.jsxs("div",{className:`submenu ${c?"open":""}`,children:[s.jsxs(Ar,{to:`${Ee.QUIZ}/difficulty`,onClick:m,className:({isActive:x})=>x?"active":"",children:[s.jsx(X,{icon:f4,className:"submenu-icon"}),"Select Difficulty"]}),s.jsxs(Ar,{to:`${Ee.QUIZ}/questions`,onClick:m,className:({isActive:x})=>x?"active":"",children:[s.jsx(X,{icon:Mr,className:"submenu-icon"}),"Questions"]}),s.jsxs(Ar,{to:`${Ee.QUIZ}/results`,onClick:m,className:({isActive:x})=>x?"active":"",children:[s.jsx(X,{icon:d4,className:"submenu-icon"}),"Results"]})]})]}),s.jsxs(Ar,{to:Ee.ACHIEVEMENTS,onClick:m,children:[s.jsx(X,{icon:Pt,className:"nav-icon"})," Achievements"]}),s.jsxs(Ar,{to:Ee.LEADERBOARD,onClick:m,children:[s.jsx(X,{icon:j4,className:"nav-icon"})," Leaderboard"]}),s.jsxs(Ar,{to:Ee.STATISTICS,onClick:m,children:[s.jsx(X,{icon:Ss,className:"nav-icon"})," Statistics"]})]}),s.jsxs("button",{className:"logout-btn",onClick:d,children:[s.jsx(X,{icon:Wg,className:"nav-icon"})," Logout"]})]}),s.jsx("style",{jsx:!0,children:`
                /* Mobile menu toggle */
                .mobile-menu-toggle {
                    display: none;
                    position: fixed;
                    top: 15px;
                    left: 15px;
                    z-index: 999;
                    background-color: #2c3e50;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    color: white;
                    font-size: 1.25rem;
                }
                
                /* Mobile background overlay */
                .mobile-menu-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 900;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .mobile-menu-overlay.show {
                    opacity: 1;
                    pointer-events: auto;
                }
                
                /* Quiz Submenu Styles */
                .nav-item-with-submenu {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
                
                .nav-item-with-submenu > a {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 20px;
                    color: #ecf0f1;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .nav-item-with-submenu > a:hover {
                    background-color: #34495e;
                    color: #fff;
                }
                
                .nav-item-with-submenu > a.active {
                    background-color: #3498db;
                    color: white;
                    border-left: 4px solid #2980b9;
                }
                
                .nav-link-content {
                    display: flex;
                    align-items: center;
                }
                
                .nav-text {
                    flex: 1;
                }
                
                .submenu-icon {
                    font-size: 0.8rem;
                    transition: transform 0.3s ease;
                    margin-left: 5px;
                }
                
                .submenu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                    background-color: #243342;
                }
                
                .submenu.open {
                    max-height: 300px; /* Adjust based on your submenu content */
                }
                
                .submenu a {
                    padding: 10px 20px 10px 35px;
                    color: #ecf0f1;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                }
                
                .submenu a:hover {
                    background-color: #34495e;
                }
                
                .submenu a.active {
                    background-color: #2980b9;
                    color: white;
                }
                
                .submenu .submenu-icon {
                    margin-right: 8px;
                    margin-left: 0;
                    font-size: 0.9rem;
                }
                
                /* Nav icon positioning */
                .nav-icon {
                    width: 20px;
                    text-align: center;
                    margin-right: 10px;
                }
                
                /* Ensure all NavLinks have consistent styling */
                .nav-links-box > a {
                    display: flex;
                    align-items: center;
                    padding: 12px 20px;
                    color: #ecf0f1;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .nav-links-box > a:hover {
                    background-color: #34495e;
                    color: #fff;
                }
                
                .nav-links-box > a.active {
                    background-color: #3498db;
                    color: white;
                    border-left: 4px solid #2980b9;
                }
                
                /* Responsive styles */
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: flex;
                    }
                    
                    .mobile-menu-overlay {
                        display: block;
                    }
                    
                    .sidebar {
                        transform: translateX(-100%);
                        z-index: 950;
                    }
                    
                    .sidebar.open {
                        transform: translateX(0);
                    }
                }
            `})]})},pw=()=>{const[r,a]=z.useState(""),[o,c]=z.useState(!1),[l,u]=z.useState(!1),d=async p=>{p.preventDefault(),c(!0);try{const m=await fetch("http://localhost:5000/api/forgot-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r})}),v=await m.json();if(!m.ok)throw new Error(v.error);we.success("Password reset link sent to your email!"),u(!0),a("")}catch(m){we.error(m.message)}finally{c(!1)}};return s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"sidebar",children:s.jsx("h3",{className:"sidebar-title",children:"Password Reset"})}),s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"form-container",children:[s.jsx("h2",{children:"Reset Your Password"}),s.jsx("p",{className:"reset-instructions",children:"Enter your email address and we'll send you a link to reset your password."}),s.jsxs("form",{onSubmit:d,children:[s.jsxs("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",htmlFor:"email",children:"Email:"}),s.jsx("div",{className:"input-wrapper",children:s.jsx("input",{type:"email",id:"email",value:r,onChange:p=>a(p.target.value),placeholder:"Enter your email",className:"form-input",required:!0})})]}),s.jsx("button",{type:"submit",className:"login-btn",disabled:o,children:o?"Sending...":"Send Reset Link"}),l&&s.jsx("div",{className:"email-sent-notice",children:s.jsx("p",{children:"Please check your email for the reset link. Check your spam/junk folder."})}),s.jsx("div",{className:"login-link-container",children:s.jsx(zr,{to:Ee.LOGIN,className:"login-link",children:"Back to Login"})})]})]})}),s.jsx("style",{jsx:!0,children:`
                .email-sent-notice {
                    margin-top: 1rem;
                    padding: 0.75rem;
                    background-color: rgba(76, 175, 80, 0.1);
                    border-left: 3px solid #4caf50;
                    border-radius: 4px;
                    font-size: 0.9rem;
                }
                .email-sent-notice p {
                    margin: 0;
                    color: #e0e0e0;
                }
            `})]})},mw=()=>{const[r,a]=z.useState(""),[o,c]=z.useState(""),[l,u]=z.useState(!1),[d,p]=z.useState(""),[m,v]=z.useState(!1),[x,g]=z.useState(!1),[y,E]=z.useState(!1),A=Lr(),N=At(),w={minLength:/.{10,}/,minNumber:/\d/,hasSpecial:/[!@#$%^&*(),.?":{}|<>]/},[S,k]=z.useState({minLength:!1,minNumber:!1,hasSpecial:!1}),C=I=>{k({minLength:w.minLength.test(I),minNumber:w.minNumber.test(I),hasSpecial:w.hasSpecial.test(I)})};z.useEffect(()=>{const I=new URLSearchParams(N.search).get("token");I||(we.error("Invalid reset link"),A(Ee.LOGIN)),p(I)},[A,N]);const $=async I=>{if(I.preventDefault(),r!==o){we.error("Passwords do not match");return}if(!Object.entries(w).every(([q,Z])=>Z.test(r))){we.error("Password does not meet all requirements");return}u(!0);try{const q=await fetch("http://localhost:5000/api/reset-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:d,newPassword:r})}),Z=await q.json();if(!q.ok)throw new Error(Z.error);we.success("Password successfully reset!"),A(Ee.LOGIN)}catch(q){we.error(q.message)}finally{u(!1)}};return s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"sidebar",children:s.jsx("h3",{className:"sidebar-title",children:"Reset Password"})}),s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"form-container",children:[s.jsx("h2",{children:"Create New Password"}),s.jsxs("form",{onSubmit:$,children:[s.jsxs("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",htmlFor:"password",children:"New Password:"}),s.jsxs("div",{className:"input-wrapper",children:[s.jsx("input",{type:x?"text":"password",id:"password",value:r,onChange:I=>{a(I.target.value),C(I.target.value)},onFocus:()=>v(!0),onBlur:()=>v(!1),placeholder:"Enter new password",className:"form-input",required:!0}),s.jsx("button",{type:"button",className:"toggle-password-btn",onClick:()=>g(!x),"aria-label":x?"Hide password":"Show password",children:s.jsx(X,{icon:x?$o:Ro,style:{color:"#ffffff"}})}),m&&s.jsx("div",{className:"password-requirements-dropdown",children:s.jsxs("ul",{children:[s.jsx("li",{className:S.minLength?"requirements-met":"requirements-not-met",children:"Minimum 10 characters"}),s.jsx("li",{className:S.minNumber?"requirements-met":"requirements-not-met",children:"Contains at least one number"}),s.jsx("li",{className:S.hasSpecial?"requirements-met":"requirements-not-met",children:"Contains at least one special character"})]})})]})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",htmlFor:"confirmPassword",children:"Confirm Password:"}),s.jsxs("div",{className:"input-wrapper",children:[s.jsx("input",{type:y?"text":"password",id:"confirmPassword",value:o,onChange:I=>c(I.target.value),placeholder:"Confirm new password",className:"form-input",required:!0}),s.jsx("button",{type:"button",className:"toggle-password-btn",onClick:()=>E(!y),"aria-label":y?"Hide password":"Show password",children:s.jsx(X,{icon:y?$o:Ro,style:{color:"#ffffff"}})})]})]}),s.jsx("button",{type:"submit",className:"login-btn",disabled:l,children:l?"Resetting...":"Reset Password"})]})]})}),s.jsx("style",{jsx:!0,children:`
                .password-requirements-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background-color: #1a1a1a;
                    border-radius: 6px;
                    padding: 0.75rem;
                    margin-top: 0.25rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    z-index: 10;
                    box-sizing: border-box;
                }
                
                .password-requirements-dropdown ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .password-requirements-dropdown li {
                    padding: 0.25rem 0;
                    display: flex;
                    align-items: center;
                    font-size: 0.85em;
                }
                
                .password-requirements-dropdown li::before {
                    content: "•";
                    margin-right: 0.5rem;
                }
                
                .requirements-met {
                    color: #4caf50;
                }
                
                .requirements-not-met {
                    color: #ff4444;
                }
                
                .input-wrapper {
                    position: relative;
                }
                    
                /* Adjust input field to avoid text overlapping with the icon */
                .form-input {
                    padding-right: 40px;
                }
            `})]})},Bh={},Ht=(Bh==null?void 0:Bh.VITE_API_BASE_URL)||"http://localhost:5000/api",fn={LOGIN:`${Ht}/login`,REGISTER:`${Ht}/register`,FORGOT_PASSWORD:`${Ht}/forgot-password`,RESET_PASSWORD:`${Ht}/reset-password`,INVALIDATE_REMEMBER_TOKEN:`${Ht}/invalidate-remember-token`,GET_USERS:`${Ht}/users`,GET_USER_LOGIN_HISTORY:`${Ht}/users/login-history`,GET_USER_QUIZ_HISTORY:`${Ht}/users/quiz-history`,GET_USER_STREAKS:`${Ht}/users/:userId/streaks`,COMPLETE_QUIZ:`${Ht}/quiz/complete`,GET_USER_ACHIEVEMENTS:`${Ht}/users/:userId/achievements`,GET_QUIZ_QUESTIONS:`${Ht}/quiz/questions`,IS_MOCK_API:!0,MOCK_DELAY:500},jo={QUIZ_IDS:{Beginner:1,Intermediate:2,Advanced:3},QUESTION_TIME:30,PASS_THRESHOLD:70,MOCK_QUIZ_DATA:{Beginner:[{id:1,question:"What is phishing?",options:["A type of fish found in oceans","A cybersecurity attack that uses disguised email as a weapon","A software program that protects your computer","A method of encrypting files"],correctAnswer:1,explanation:"Phishing is a cybersecurity attack that uses disguised email as a weapon. The goal is to trick the email recipient into believing the message is something they want or need and to click a link or download an attachment."},{id:2,question:"Which of these is a common indicator of a phishing attempt?",options:["Emails from known colleagues with their correct email address","Messages that have correct grammar and no spelling mistakes","Emails with urgent calls to action or threats","Communications that address you by your full name"],correctAnswer:2,explanation:"Urgent calls to action, threats, or creating a sense of emergency are common tactics in phishing attempts to make users act before thinking critically."},{id:3,question:"What should you do if you suspect an email is a phishing attempt?",options:["Open any attachments to check if they're legitimate","Reply directly to ask if it's legitimate","Click links to see where they lead","Don't click links and report it to your IT department"],correctAnswer:3,explanation:"Never open attachments or click links in suspicious emails. The safest action is to report the email to your IT department or security team."},{id:4,question:"Which of these email senders is MOST likely to be a phishing attempt?",options:["support@yourcompany.com","support@yourcornpany.com","john.smith@colleague-company.com","newsletter@google.com"],correctAnswer:1,explanation:"The email address 'support@yourcornpany.com' contains a common spoofing technique where 'company' is misspelled as 'cornpany' which can be hard to notice at a quick glance."},{id:5,question:"What is 'spear phishing'?",options:["Sending phishing emails to a large number of random people","Targeted phishing attacks directed at specific individuals or companies","Using phone calls instead of emails for phishing","Phishing attempts made through social media"],correctAnswer:1,explanation:"Spear phishing refers to targeted attacks aimed at specific individuals or organizations, often using personalized information to appear more credible."}],Intermediate:[{id:1,question:"Which of these is a sign of a sophisticated phishing attack?",options:["Obvious spelling errors in the email","Using threatening language and urgent deadlines","Spoofed domains that look very similar to legitimate ones","Requests sent to multiple recipients in the same email"],correctAnswer:2,explanation:"Sophisticated phishing attacks often use domains that look nearly identical to legitimate ones (like microsoft-support.com instead of microsoft.com) to deceive users."},{id:2,question:"What is 'vishing'?",options:["Visual phishing using fake images","Voice phishing over phone calls","Video-based phishing using deep fakes","Viral phishing using social media"],correctAnswer:1,explanation:"Vishing is voice phishing, which uses phone calls to trick people into revealing sensitive information or making security mistakes."},{id:3,question:"How do attackers commonly trick people in Business Email Compromise (BEC) attacks?",options:["By sending mass emails with malware attachments","By impersonating executives and requesting urgent wire transfers","By offering fake promotions and discounts","By sending ransomware through email links"],correctAnswer:1,explanation:"In BEC attacks, attackers impersonate executives or trusted partners to request urgent wire transfers or sensitive information from employees."},{id:4,question:"What is DMARC?",options:["A type of malware that steals email credentials","An email authentication protocol to prevent spoofing","A phishing simulation tool for security training","A database of known phishing domains"],correctAnswer:1,explanation:"DMARC (Domain-based Message Authentication, Reporting & Conformance) is an email authentication protocol that helps prevent email spoofing and phishing attacks."},{id:5,question:"Which of these behaviors increases your risk of falling victim to phishing?",options:["Using multi-factor authentication","Reusing the same password across multiple sites","Checking the sender's email address before responding","Hovering over links before clicking them"],correctAnswer:1,explanation:"Reusing passwords across multiple sites means that if your credentials are stolen from one site through phishing, attackers can access all your other accounts using the same credentials."}],Advanced:[{id:1,question:"What is a watering hole attack?",options:["A phishing attack targeting people with water-related interests","A targeted attack where frequently visited websites are compromised","An attack using water-damage sensors to infiltrate buildings","A DDoS attack that floods servers with requests"],correctAnswer:1,explanation:"A watering hole attack targets organizations by infecting websites they frequently visit with malware, rather than attacking them directly."},{id:2,question:"Which of these is an advanced anti-phishing measure?",options:["Using basic spam filters","Checking for HTTPS in the URL","Implementing DMARC, SPF, and DKIM email authentication","Installing antivirus software"],correctAnswer:2,explanation:"DMARC, SPF, and DKIM are advanced email authentication protocols that work together to prevent email spoofing and verify sender legitimacy."},{id:3,question:"What is 'smishing'?",options:["Social media phishing","SMS phishing","Smart device phishing","Smoke-signal phishing (a joke term)"],correctAnswer:1,explanation:"Smishing is SMS phishing, which uses text messages to trick recipients into revealing sensitive information or installing malware."},{id:4,question:"In corporate settings, which department is typically most targeted by spear phishing?",options:["IT Department","Sales Department","Finance Department","Human Resources"],correctAnswer:2,explanation:"Finance departments are often targeted because they have direct access to financial systems and can authorize payments, making them prime targets for BEC and wire fraud attacks."},{id:5,question:"What security feature helps validate that you're on the legitimate website rather than a phishing site?",options:["CAPTCHA","HTTPS","Extended Validation (EV) Certificates","Two-factor authentication"],correctAnswer:2,explanation:"Extended Validation (EV) Certificates provide the highest level of website verification and display the company name in the browser's address bar, helping users confirm they're on the legitimate site."}]}},hw=()=>{const r=Lr(),a=sessionStorage.getItem("username")||"User",o=sessionStorage.getItem("userId")||"1",[c,l]=z.useState(null),[u,d]=z.useState([]),[p,m]=z.useState([]),[v,x]=z.useState(!0),[g,y]=z.useState(null),[E,A]=z.useState(!1),[N,w]=z.useState(null);function S(){const G=u.filter(ae=>ae.quiz_id===1);return G.length===0?0:Math.max(...G.map(ae=>ae.score))}function k(){const G=u.filter(ae=>ae.quiz_id===2);return G.length===0?0:Math.max(...G.map(ae=>ae.score))}function C(){const G=u.filter(ae=>ae.quiz_id===3);return G.length===0?0:Math.max(...G.map(ae=>ae.score))}function $(G){switch(G){case 1:return"Beginner";case 2:return"Intermediate";case 3:return"Advanced";default:return"Unknown"}}function I(G){if(G.icon)switch(G.icon.toLowerCase()){case"star":return _a;case"shield":return Es;case"calendar-check":return pr;case"trophy":return Pt;case"medal":return Io;case"award":return js;case"certificate":return Kg;case"graduation-cap":return _s;case"check":return To;default:return _a}return G.title.includes("Star")||G.title.includes("Learner")?_a:G.title.includes("Champion")||G.title.includes("Security")?Es:G.title.includes("Streak")||G.title.includes("Login")?pr:G.title.includes("Master")?Pt:Io}z.useEffect(()=>{(async()=>{x(!0);try{const G=await fetch(fn.GET_USER_STREAKS.replace(":userId",o));if(!G.ok)throw new Error("Failed to fetch user data");const ae=await G.json(),W=await fetch(fn.GET_USER_ACHIEVEMENTS.replace(":userId",o));if(!W.ok)throw new Error("Failed to fetch achievements");const F=await W.json();console.log("User streaks data:",ae),console.log("User achievements data:",F),l(ae.userData||{}),d(ae.quizHistory||[]),m(F.achievements||[]);const V=(F.achievements||[]).filter(Q=>Q.unlocked);V.length>0&&(w(V[0]),A(!0),setTimeout(()=>{A(!1)},5e3))}catch(G){console.error("Error fetching user data:",G),y(G.message),we.error("Failed to load dashboard data")}finally{x(!1)}})()},[o]);const q=()=>{if(!c)return 0;const G=Z("beginner"),ae=Z("intermediate"),W=Z("advanced"),F=G*.3+ae*.3+W*.4;return Math.round(F)||0},Z=G=>{if(!u||u.length===0)return 0;const ae=G==="beginner"?1:G==="intermediate"?2:3,W=u.filter(F=>F.quiz_id===ae);return W.length===0?0:Math.max(...W.map(F=>F.score))},H=G=>{if(!G)return"Unknown date";try{const ae=new Date(G);return`${ae.getDate().toString().padStart(2,"0")}/${(ae.getMonth()+1).toString().padStart(2,"0")}`}catch(ae){return console.error("Error formatting date:",ae),"Invalid date"}},Y=G=>{if(!G)return"Never";const ae=new Date(G),W=Math.abs(new Date-ae),F=Math.floor(W/(1e3*60*60*24));if(F===0)return"Today";if(F===1)return"Yesterday";if(F<7)return`${F} days ago`;if(F<30){const V=Math.floor(F/7);return`${V} ${V===1?"week":"weeks"} ago`}else return H(G)},R=G=>{r("/quiz/difficulty")};if(v)return s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"loading-container",children:[s.jsx("div",{className:"loading-animation",children:s.jsx(X,{icon:Ca,spin:!0,className:"loading-spinner"})}),s.jsx("p",{children:"Loading your dashboard..."})]})});if(g)return s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"error-container",children:[s.jsx(X,{icon:Zo,className:"error-icon"}),s.jsx("h3",{children:"Error loading dashboard"}),s.jsx("p",{children:g}),s.jsx("button",{onClick:()=>window.location.reload(),className:"retry-btn",children:"Try Again"})]})});const te=p.filter(G=>G.unlocked).slice(0,2),pe=u.sort((G,ae)=>new Date(ae.completion_date||ae.date)-new Date(G.completion_date||G.date)).slice(0,3),J=(c==null?void 0:c.total_quizzes)||u.length||0,fe=[{id:1,name:"Beginner",progress:S(),icon:_s,color:"#3498db",description:"Learn the basics of phishing and social engineering."},{id:2,name:"Intermediate",progress:k(),icon:js,color:"#2ecc71",description:"Advance your knowledge with complex scenarios."},{id:3,name:"Advanced",progress:C(),icon:Pt,color:"#e74c3c",description:"Master high-level security concepts and challenges."}];return s.jsxs("div",{className:"content-wrapper",children:[s.jsxs("div",{className:"dashboard-container",children:[s.jsxs("div",{className:"welcome-banner",children:[s.jsxs("div",{className:"welcome-content",children:[s.jsxs("h1",{children:["Welcome back, ",a,"!"]}),s.jsx("p",{children:"Continue your security training journey"}),s.jsxs("div",{className:"user-stats",children:[s.jsxs("div",{className:"stat-item",children:[s.jsx(X,{icon:Mr,className:"stat-icon"}),s.jsxs("div",{className:"stat-text",children:[s.jsx("span",{className:"stat-value",children:J}),s.jsx("span",{className:"stat-label",children:"Quizzes"})]})]}),s.jsxs("div",{className:"stat-item",children:[s.jsx(X,{icon:pr,className:"stat-icon"}),s.jsxs("div",{className:"stat-text",children:[s.jsx("span",{className:"stat-value",children:(c==null?void 0:c.login_streak)||0}),s.jsx("span",{className:"stat-label",children:"Day Streak"})]})]}),s.jsxs("div",{className:"stat-item",children:[s.jsx(X,{icon:Pt,className:"stat-icon"}),s.jsxs("div",{className:"stat-text",children:[s.jsx("span",{className:"stat-value",children:te.length}),s.jsx("span",{className:"stat-label",children:"Achievements"})]})]})]})]}),s.jsx("div",{className:"progress-summary",children:s.jsx("div",{className:"progress-ring-container",children:s.jsxs("svg",{className:"progress-ring",width:"120",height:"120",viewBox:"0 0 120 120",children:[s.jsx("circle",{className:"progress-ring-circle-bg",stroke:"#2c3e50",strokeWidth:"8",fill:"transparent",r:"54",cx:"60",cy:"60"}),s.jsx("circle",{className:"progress-ring-circle",stroke:"#646cff",strokeWidth:"8",strokeDasharray:`${2*Math.PI*54} ${2*Math.PI*54}`,strokeDashoffset:2*Math.PI*54*(1-q()/100),strokeLinecap:"round",fill:"transparent",r:"54",cx:"60",cy:"60"}),s.jsxs("text",{x:"60",y:"55",textAnchor:"middle",fill:"white",fontSize:"22",fontWeight:"bold",children:[q(),"%"]}),s.jsx("text",{x:"60",y:"75",textAnchor:"middle",fill:"#b3b3b3",fontSize:"12",children:"PROGRESS"})]})})})]}),s.jsxs("div",{className:"dashboard-grid",children:[s.jsxs("div",{className:"dashboard-card modules-card",children:[s.jsxs("div",{className:"card-header",children:[s.jsx("h2",{children:"Security Training Modules"}),s.jsxs(zr,{to:"/quiz/difficulty",className:"view-all-link",children:["View All ",s.jsx(X,{icon:$c})]})]}),s.jsx("div",{className:"modules-grid",children:fe.map(G=>s.jsxs("div",{className:"module-card",children:[s.jsxs("div",{className:"module-header",style:{backgroundColor:G.color+"20"},children:[s.jsx("div",{className:"module-icon",style:{backgroundColor:G.color},children:s.jsx(X,{icon:G.icon})}),s.jsx("h3",{children:G.name})]}),s.jsxs("div",{className:"module-content",children:[s.jsx("p",{children:G.description}),s.jsxs("div",{className:"module-progress",children:[s.jsx("div",{className:"progress-bar",children:s.jsx("div",{className:"progress-fill",style:{width:`${G.progress}%`,backgroundColor:G.color}})}),s.jsxs("div",{className:"progress-label",children:[s.jsxs("span",{children:[G.progress,"% Complete"]}),G.progress>=70?s.jsx(X,{icon:Ns,className:"complete-icon",style:{color:G.color}}):s.jsx(s.Fragment,{})]})]}),s.jsxs("button",{className:"module-action-btn",style:{backgroundColor:G.color},onClick:()=>R(G.name.toLowerCase()),children:[G.progress>0?"Continue":"Start"," ",s.jsx(X,{icon:vs})]})]})]},G.id))})]}),s.jsxs("div",{className:"dashboard-card achievements-card",children:[s.jsxs("div",{className:"card-header",children:[s.jsx("h2",{children:"Your Achievements"}),s.jsxs(zr,{to:"/achievements",className:"view-all-link",children:["View All ",s.jsx(X,{icon:$c})]})]}),s.jsx("div",{className:"achievements-grid",children:te.length>0?te.map((G,ae)=>s.jsxs("div",{className:"achievement-item",children:[s.jsx("div",{className:"achievement-icon",style:{backgroundColor:G.color||"#646cff"},children:s.jsx(X,{icon:I(G)})}),s.jsxs("div",{className:"achievement-details",children:[s.jsx("h3",{children:G.title}),s.jsx("p",{children:G.description})]})]},ae)):s.jsxs("div",{className:"empty-state",children:[s.jsx(X,{icon:Wg,className:"empty-icon"}),s.jsx("p",{children:"Complete quizzes to unlock achievements"})]})})]}),s.jsxs("div",{className:"dashboard-card activity-card",children:[s.jsx("div",{className:"card-header",children:s.jsx("h2",{children:"Recent Activity"})}),s.jsxs("div",{className:"activity-timeline",children:[pe.length>0?pe.map((G,ae)=>s.jsxs("div",{className:"activity-item",children:[s.jsx("div",{className:"activity-icon quiz-icon",children:s.jsx(X,{icon:Mr})}),s.jsxs("div",{className:"activity-content",children:[s.jsxs("div",{className:"activity-details",children:[s.jsxs("span",{className:"activity-title",children:["Completed ",$(G.quiz_id)," Quiz"]}),s.jsxs("span",{className:"activity-score",children:["Score: ",s.jsxs("strong",{children:[G.score,"%"]}),G.score>=70&&s.jsx(X,{icon:Ns,className:"pass-icon"})]})]}),s.jsx("div",{className:"activity-time",children:Y(G.completion_date||G.date)})]})]},`quiz-${ae}`)):s.jsxs("div",{className:"empty-state",children:[s.jsx(X,{icon:p4,className:"empty-icon"}),s.jsx("p",{children:"Complete quizzes to see your activity"})]}),c&&c.login_streak>1&&s.jsxs("div",{className:"activity-item",children:[s.jsx("div",{className:"activity-icon streak-icon",children:s.jsx(X,{icon:qd})}),s.jsxs("div",{className:"activity-content",children:[s.jsx("div",{className:"activity-details",children:s.jsxs("span",{className:"activity-title",children:["Login streak: ",c.login_streak," days"]})}),s.jsx("div",{className:"activity-time",children:"Current streak"})]})]})]})]}),s.jsxs("div",{className:"dashboard-card stats-card",children:[s.jsxs("div",{className:"card-header",children:[s.jsx("h2",{children:"Statistics Snapshot"}),s.jsxs(zr,{to:"/statistics",className:"view-all-link",children:["View All ",s.jsx(X,{icon:$c})]})]}),s.jsxs("div",{className:"stats-grid",children:[s.jsxs("div",{className:"stat-box",children:[s.jsx("div",{className:"stat-icon-bg",children:s.jsx(X,{icon:Mr})}),s.jsxs("div",{className:"stat-data",children:[s.jsx("h3",{children:"Total Completions"}),s.jsx("div",{className:"stat-number",children:J})]})]}),s.jsxs("div",{className:"stat-box",children:[s.jsx("div",{className:"stat-icon-bg",children:s.jsx(X,{icon:pr})}),s.jsxs("div",{className:"stat-data",children:[s.jsx("h3",{children:"Unique Quiz Days"}),s.jsx("div",{className:"stat-number",children:(c==null?void 0:c.quiz_days_count)||0})]})]}),s.jsxs("div",{className:"stat-box",children:[s.jsx("div",{className:"stat-icon-bg",children:s.jsx(X,{icon:qd})}),s.jsxs("div",{className:"stat-data",children:[s.jsx("h3",{children:"Quiz Streak"}),s.jsxs("div",{className:"stat-number",children:[(c==null?void 0:c.quiz_streak)||0,s.jsx("span",{className:"stat-unit",children:(c==null?void 0:c.quiz_streak)===1?" day":" days"})]})]})]}),s.jsxs("div",{className:"stat-box",children:[s.jsx("div",{className:"stat-icon-bg",children:s.jsx(X,{icon:Pt})}),s.jsxs("div",{className:"stat-data",children:[s.jsx("h3",{children:"Longest Streak"}),s.jsxs("div",{className:"stat-number",children:[(c==null?void 0:c.longest_quiz_streak)||0,s.jsx("span",{className:"stat-unit",children:(c==null?void 0:c.longest_quiz_streak)===1?" day":" days"})]})]})]})]})]})]})]}),E&&N&&s.jsx("div",{className:"achievement-popup",children:s.jsxs("div",{className:"achievement-popup-content",children:[s.jsx("div",{className:"achievement-popup-icon",style:{backgroundColor:N.color||"#646cff"},children:s.jsx(X,{icon:I(N)})}),s.jsxs("div",{className:"achievement-popup-details",children:[s.jsx("h3",{children:"Achievement Unlocked!"}),s.jsx("h4",{children:N.title}),s.jsx("p",{children:N.description})]}),s.jsx("button",{className:"achievement-close-btn",onClick:()=>A(!1),children:"×"})]})}),s.jsx("style",{jsx:!0,children:`
        /* Main Container Styles */
        .dashboard-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 1.5rem 2rem;
        }
        
        /* Welcome Banner */
        .welcome-banner {
          background-color: #1a1a1a;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        
        .welcome-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(100, 108, 255, 0.1), rgba(0, 0, 0, 0));
          z-index: 1;
        }
        
        .welcome-content {
          position: relative;
          z-index: 2;
          flex: 1;
        }
        
        .welcome-banner h1 {
          color: #ffffff;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }
        
        .welcome-banner p {
          color: #b3b3b3;
          font-size: 1.1rem;
          margin: 0 0 1.5rem 0;
        }
        
        .user-stats {
          display: flex;
          gap: 2rem;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .stat-icon {
          font-size: 1.5rem;
          color: #646cff;
        }
        
        .stat-text {
          display: flex;
          flex-direction: column;
        }
        
        .stat-value {
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: bold;
        }
        
        .stat-label {
          color: #b3b3b3;
          font-size: 0.85rem;
        }
        
        .progress-summary {
          position: relative;
          z-index: 2;
        }
        
        .progress-ring-circle-bg {
          opacity: 0.3;
        }
        
        .progress-ring-circle {
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          transition: stroke-dashoffset 0.5s ease;
        }
        
        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        
        /* Card Styles */
        .dashboard-card {
          background-color: #1a1a1a;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #2c3e50;
        }
        
        .card-header h2 {
          color: #ffffff;
          font-size: 1.25rem;
          margin: 0;
        }
        
        .view-all-link {
          color: #646cff;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color 0.2s ease;
        }
        
        .view-all-link:hover {
          color: #535bf2;
        }
        
        /* Modules Card */
        .modules-card {
          grid-column: span 2;
        }
        
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        
        .module-card {
          background-color: #242424;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .module-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        }
        
        .module-header {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .module-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .module-header h3 {
          color: #ffffff;
          margin: 0;
          font-size: 1.1rem;
        }
        
        .module-content {
          padding: 0 1.25rem 1.25rem;
        }
        
        .module-content p {
          color: #b3b3b3;
          font-size: 0.9rem;
          margin-top: 0;
          margin-bottom: 1rem;
          min-height: 40px;
        }
        
        .module-progress {
          margin-bottom: 1.25rem;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: #333;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        
        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #b3b3b3;
          font-size: 0.85rem;
        }
        
        .complete-icon {
          font-size: 1rem;
        }
        
        .module-action-btn {
          width: 100%;
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          transition: opacity 0.2s ease;
        }
        
        .module-action-btn:hover {
          opacity: 0.9;
        }
        
        /* Achievements Card */
        .achievements-card {
          grid-column: 1;
          grid-row: span 2;
        }
        
        .achievements-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: calc(100% - 3rem);
        }
        
        .achievement-item {
          background-color: #242424;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.2s ease;
        }
        
        .achievement-item:hover {
          transform: translateX(5px);
        }
        
        .achievement-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        
        .achievement-details {
          flex: 1;
        }
        
        .achievement-details h3 {
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
        }
        
        .achievement-details p {
          color: #b3b3b3;
          margin: 0;
          font-size: 0.85rem;
        }
        
        /* Activity Card */
        .activity-card {
          grid-column: 2;
        }
        
        .activity-timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .activity-item {
          background-color: #242424;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1rem;
          flex-shrink: 0;
        }
        
        .quiz-icon {
          background-color: rgba(52, 152, 219, 0.2);
          color: #3498db;
        }
        
        .streak-icon {
          background-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
        }
        
        .activity-content {
          flex: 1;
        }
        
        .activity-details {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .activity-title {
          color: #ffffff;
          font-weight: 500;
          font-size: 0.95rem;
        }
        
        .activity-score {
          color: #b3b3b3;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .pass-icon {
          color: #2ecc71;
        }
        
        .activity-time {
          color: #777;
          font-size: 0.8rem;
        }
        
        /* Stats Card */
        .stats-card {
          grid-column: 2;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .stat-box {
          background-color: #242424;
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .stat-icon-bg {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(100, 108, 255, 0.1);
          color: #646cff;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .stat-data {
          flex: 1;
        }
        
        .stat-data h3 {
          color: #b3b3b3;
          font-size: 0.8rem;
          margin: 0 0 0.25rem 0;
          font-weight: normal;
        }
        
        .stat-number {
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: bold;
        }
        
        .stat-unit {
          font-size: 0.85rem;
          color: #b3b3b3;
          font-weight: normal;
        }
        
        /* Empty States */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          color: #777;
          text-align: center;
        }
        
        .empty-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .empty-state p {
          color: #e0e0e0;
          font-size: 1.1rem;
        }
        
        /* Achievement Popup */
        .achievement-popup {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          animation: slideIn 0.5s ease forwards;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .achievement-popup-content {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          max-width: 350px;
          position: relative;
        }
        
        .achievement-popup-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .achievement-popup-details {
          flex: 1;
        }
        
        .achievement-popup-details h3 {
          color: #646cff;
          margin: 0 0 0.25rem 0;
          font-size: 0.9rem;
        }
        
        .achievement-popup-details h4 {
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
        }
        
        .achievement-popup-details p {
          color: #b3b3b3;
          margin: 0;
          font-size: 0.85rem;
        }
        
        .achievement-close-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: none;
          border: none;
          color: #b3b3b3;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
        }
        
        .achievement-close-btn:hover {
          color: #ffffff;
        }
        
        /* Loading/Error States */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          color: #ffffff;
        }
        
        .loading-animation {
          margin-bottom: 1rem;
        }
        
        .loading-spinner {
          font-size: 2.5rem;
          color: #646cff;
        }
        
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 12px;
          color: #ffffff;
          text-align: center;
        }
        
        .error-icon {
          color: #e74c3c;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .retry-btn {
          margin-top: 1rem;
          background-color: #646cff;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .retry-btn:hover {
          background-color: #535bf2;
        }
        
        /* Responsive Design */
        @media (max-width: 1100px) {
          .modules-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          
          .modules-card,
          .achievements-card,
          .activity-card,
          .stats-card {
            grid-column: 1;
          }
        }
        
        @media (max-width: 768px) {
          .welcome-banner {
            flex-direction: column;
            padding: 1.5rem;
            gap: 1.5rem;
          }
          
          .welcome-banner h1 {
            font-size: 1.5rem;
          }
          
          .user-stats {
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .modules-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-container {
            padding: 0 1rem 1.5rem;
          }
          
          .achievement-popup {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
          }
          
          .achievement-popup-content {
            width: 100%;
            max-width: none;
          }
        }
      `})]})},gw=()=>{sessionStorage.getItem("username");const r=sessionStorage.getItem("userId")||"1",[a,o]=z.useState(null),[c,l]=z.useState([]),[u,d]=z.useState(!0),[p,m]=z.useState(null),[v,x]=z.useState(window.innerWidth),[g,y]=z.useState("overview");z.useEffect(()=>{const W=()=>x(window.innerWidth);return window.addEventListener("resize",W),()=>window.removeEventListener("resize",W)},[]),z.useEffect(()=>{(async()=>{var W;d(!0);try{const F=await fetch(fn.GET_USER_STREAKS.replace(":userId",r));if(!F.ok)throw new Error("Failed to fetch user statistics");const V=await F.json();console.log("User stats data:",V),o(V.userData||{}),l(V.quizHistory||[]),console.log(`Loaded ${((W=V.quizHistory)==null?void 0:W.length)||0} quiz completions for user ${r}`)}catch(F){console.error("Error fetching user statistics:",F),m(F.message),we.error("Failed to load statistics")}finally{d(!1)}})()},[r]);const E=()=>v<=480?280:v<=768?400:600,A=()=>v<=480?140:200,N=()=>{if(!c||c.length===0)return{scores:[],labels:[]};const W=[...c].sort((F,V)=>new Date(F.completion_date||F.date)-new Date(V.completion_date||V.date)).slice(-10);return{scores:W.map(F=>F.score),labels:W.map(F=>{const V=new Date(F.completion_date||F.date);return`${V.getDate().toString().padStart(2,"0")}/${(V.getMonth()+1).toString().padStart(2,"0")}`})}},w=W=>{if(!W)return"Unknown date";try{const F=new Date(W);return`${F.getDate().toString().padStart(2,"0")}/${(F.getMonth()+1).toString().padStart(2,"0")}`}catch(F){return console.error("Error formatting date:",F),"Invalid date"}},S=W=>{if(!W)return"Never";const F=new Date(W),V=Math.abs(new Date-F),Q=Math.floor(V/(1e3*60*60*24));if(Q===0)return"Today";if(Q===1)return"Yesterday";if(Q<7)return`${Q} days ago`;if(Q<30){const L=Math.floor(Q/7);return`${L} ${L===1?"week":"weeks"} ago`}return w(W)},k=()=>{const W={totalCompletions:c.length,uniqueDays:(a==null?void 0:a.quiz_days_count)||0,beginner:c.filter(F=>F.quiz_id===1).length,intermediate:c.filter(F=>F.quiz_id===2).length,advanced:c.filter(F=>F.quiz_id===3).length,averageScore:0,highestScore:0,lowestScore:100,passRate:0,beginnerHighest:C("beginner"),intermediateHighest:C("intermediate"),advancedHighest:C("advanced"),recentQuizzes:[]};if(c.length>0){const F=c.map(V=>V.score);W.averageScore=Math.round(F.reduce((V,Q)=>V+Q,0)/F.length),W.highestScore=Math.max(...F),W.lowestScore=Math.min(...F),W.passRate=Math.round(c.filter(V=>V.score>=70).length/c.length*100),W.recentQuizzes=[...c].sort((V,Q)=>new Date(Q.completion_date||Q.date)-new Date(V.completion_date||V.date)).slice(0,5)}return W},C=W=>{if(!c||c.length===0)return 0;const F=W==="beginner"?1:W==="intermediate"?2:3,V=c.filter(Q=>Q.quiz_id===F);return V.length===0?0:Math.max(...V.map(Q=>Q.score))},$=W=>{const F=W==="beginner"?1:W==="intermediate"?2:3,V=c.filter(Oe=>Oe.quiz_id===F);if(V.length===0)return{attempts:0,highestScore:0,averageScore:0,passRate:0,recentScore:null,trend:"neutral"};const Q=V.length,L=V.map(Oe=>Oe.score),K=Math.max(...L),be=Math.round(L.reduce((Oe,Ye)=>Oe+Ye,0)/Q),ke=V.filter(Oe=>Oe.score>=70).length,_e=Math.round(ke/Q*100),Ae=[...V].sort((Oe,Ye)=>new Date(Ye.completion_date||Ye.date)-new Date(Oe.completion_date||Oe.date));let Pe="neutral",Le=null;if(Ae.length>0&&(Le=Ae[0].score,Ae.length>1)){const Oe=Ae[1].score;Le>Oe?Pe="up":Le<Oe&&(Pe="down")}return{attempts:Q,highestScore:K,averageScore:be,passRate:_e,recentScore:Le,trend:Pe}};if(u)return s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"loading-container",children:[s.jsx(X,{icon:Ca,spin:!0,className:"loading-spinner"}),s.jsx("p",{children:"Loading your statistics..."})]})});if(p)return s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"error-container",children:[s.jsx(X,{icon:Zo,className:"error-icon"}),s.jsx("h3",{children:"Error loading statistics"}),s.jsx("p",{children:p}),s.jsx("button",{onClick:()=>window.location.reload(),className:"retry-btn",children:"Try Again"})]})});const I=k(),q=N(),Z=E(),H=A(),Y=$("beginner"),R=$("intermediate"),te=$("advanced"),pe=100,J=Z/Math.max(q.scores.length-1,1),fe=q.scores.map((W,F)=>{const V=F*J,Q=H-W/pe*H;return`${V},${Q}`}).join(" ");return s.jsxs("div",{className:"content-wrapper",children:[s.jsxs("div",{className:"statistics-container",children:[s.jsxs("div",{className:"statistics-header",children:[s.jsx("h2",{children:"Statistics"}),s.jsx("p",{className:"statistics-subtitle",children:"Track your progress and improvement over time"})]}),s.jsxs("div",{className:"statistics-tabs",children:[s.jsxs("button",{className:`tab-btn ${g==="overview"?"active":""}`,onClick:()=>y("overview"),children:[s.jsx(X,{icon:Ss,className:"tab-icon"}),"Overview"]}),s.jsxs("button",{className:`tab-btn ${g==="quizzes"?"active":""}`,onClick:()=>y("quizzes"),children:[s.jsx(X,{icon:Mr,className:"tab-icon"}),"Quiz Details"]}),s.jsxs("button",{className:`tab-btn ${g==="streaks"?"active":""}`,onClick:()=>y("streaks"),children:[s.jsx(X,{icon:pr,className:"tab-icon"}),"Streaks"]})]}),g==="overview"&&s.jsx("div",{className:"statistics-tab-content",children:s.jsxs("div",{className:"stats-grid overview-grid",children:[s.jsxs("div",{className:"stats-card score-metrics",children:[s.jsx("h3",{className:"card-title",children:"Score Metrics"}),s.jsxs("div",{className:"metrics-grid",children:[s.jsxs("div",{className:"metric-item",children:[s.jsx("div",{className:"metric-icon average-icon",children:s.jsx(X,{icon:Ss})}),s.jsxs("div",{className:"metric-content",children:[s.jsx("span",{className:"metric-label",children:"Average Score"}),s.jsxs("span",{className:"metric-value",children:[I.averageScore,"%"]})]})]}),s.jsxs("div",{className:"metric-item",children:[s.jsx("div",{className:"metric-icon highest-icon",children:s.jsx(X,{icon:ds})}),s.jsxs("div",{className:"metric-content",children:[s.jsx("span",{className:"metric-label",children:"Highest Score"}),s.jsxs("span",{className:"metric-value",children:[I.highestScore,"%"]})]})]}),s.jsxs("div",{className:"metric-item",children:[s.jsx("div",{className:"metric-icon lowest-icon",children:s.jsx(X,{icon:us})}),s.jsxs("div",{className:"metric-content",children:[s.jsx("span",{className:"metric-label",children:"Lowest Score"}),s.jsxs("span",{className:"metric-value",children:[I.lowestScore,"%"]})]})]}),s.jsxs("div",{className:"metric-item",children:[s.jsx("div",{className:"metric-icon pass-icon",children:s.jsx(X,{icon:Ns})}),s.jsxs("div",{className:"metric-content",children:[s.jsx("span",{className:"metric-label",children:"Pass Rate"}),s.jsxs("span",{className:"metric-value",children:[I.passRate,"%"]})]})]})]})]}),s.jsxs("div",{className:"stats-card score-history-card",children:[s.jsx("h3",{className:"card-title",children:"Quiz Score History"}),q.scores.length>0?s.jsxs("div",{className:"score-chart-container",children:[s.jsxs("div",{className:"y-axis-labels",children:[s.jsx("span",{children:"100%"}),s.jsx("span",{children:"75%"}),s.jsx("span",{children:"50%"}),s.jsx("span",{children:"25%"}),s.jsx("span",{children:"0%"})]}),s.jsxs("div",{className:"chart-area",children:[s.jsxs("svg",{width:Z,height:H,className:"score-chart",children:[s.jsx("line",{x1:"0",y1:"0",x2:Z,y2:"0",stroke:"#444",strokeDasharray:"2"}),s.jsx("line",{x1:"0",y1:H/4,x2:Z,y2:H/4,stroke:"#444",strokeDasharray:"2"}),s.jsx("line",{x1:"0",y1:H/2,x2:Z,y2:H/2,stroke:"#444",strokeDasharray:"2"}),s.jsx("line",{x1:"0",y1:H*3/4,x2:Z,y2:H*3/4,stroke:"#444",strokeDasharray:"2"}),s.jsx("line",{x1:"0",y1:H,x2:Z,y2:H,stroke:"#444",strokeDasharray:"2"}),s.jsx("line",{x1:"0",y1:H-70/pe*H,x2:Z,y2:H-70/pe*H,stroke:"#e67e22",strokeWidth:"1.5",strokeDasharray:"5,3"}),s.jsx("text",{x:"5",y:H-70/pe*H-5,fill:"#e67e22",fontSize:"10",children:"Pass threshold (70%)"}),s.jsx("polyline",{fill:"none",stroke:"#646cff",strokeWidth:"3",points:fe}),q.scores.map((W,F)=>{const V=F*J,Q=H-W/pe*H;return s.jsxs("g",{className:"data-point",children:[s.jsx("circle",{cx:V,cy:Q,r:"4",fill:"#646cff",stroke:"#fff",strokeWidth:"1"}),s.jsxs("text",{x:V,y:Q-10,fill:"#fff",fontSize:"10",textAnchor:"middle",className:"point-label",children:[W,"%"]})]},F)})]}),s.jsx("div",{className:"x-axis-labels",children:q.labels.map((W,F)=>s.jsx("span",{style:{left:`${F/(q.labels.length-1||1)*100}%`,transform:"translateX(-50%)"},children:W},F))})]})]}):s.jsxs("div",{className:"no-data-message",children:[s.jsx(X,{icon:Co,className:"info-icon"}),s.jsx("p",{children:"Complete quizzes to see your score history"})]})]}),s.jsxs("div",{className:"stats-card quiz-completions-card",children:[s.jsx("h3",{className:"card-title",children:"Quiz Completions"}),s.jsxs("div",{className:"completions-grid",children:[s.jsxs("div",{className:"completion-stat",children:[s.jsx("div",{className:"stat-number",children:I.totalCompletions}),s.jsx("div",{className:"stat-label",children:"Total Completions"})]}),s.jsxs("div",{className:"completion-stat",children:[s.jsx("div",{className:"stat-number",children:I.uniqueDays}),s.jsx("div",{className:"stat-label",children:"Unique Quiz Days"})]}),s.jsxs("div",{className:"completion-stat",children:[s.jsx("div",{className:"stat-number",children:I.beginner}),s.jsx("div",{className:"stat-label",children:"Beginner Quizzes"})]}),s.jsxs("div",{className:"completion-stat",children:[s.jsx("div",{className:"stat-number",children:I.intermediate}),s.jsx("div",{className:"stat-label",children:"Intermediate Quizzes"})]}),s.jsxs("div",{className:"completion-stat",children:[s.jsx("div",{className:"stat-number",children:I.advanced}),s.jsx("div",{className:"stat-label",children:"Advanced Quizzes"})]})]})]}),s.jsxs("div",{className:"stats-card module-progress-card",children:[s.jsx("h3",{className:"card-title",children:"Module Progress"}),s.jsxs("div",{className:"progress-items",children:[s.jsxs("div",{className:"progress-item",children:[s.jsxs("div",{className:"progress-label",children:[s.jsx("span",{className:"module-name",children:"Beginner"}),s.jsxs("span",{className:"module-score",children:[I.beginnerHighest,"%"]})]}),s.jsx("div",{className:"progress-bar",children:s.jsx("div",{className:"progress-fill beginner-fill",style:{width:`${I.beginnerHighest}%`}})})]}),s.jsxs("div",{className:"progress-item",children:[s.jsxs("div",{className:"progress-label",children:[s.jsx("span",{className:"module-name",children:"Intermediate"}),s.jsxs("span",{className:"module-score",children:[I.intermediateHighest,"%"]})]}),s.jsx("div",{className:"progress-bar",children:s.jsx("div",{className:"progress-fill intermediate-fill",style:{width:`${I.intermediateHighest}%`}})})]}),s.jsxs("div",{className:"progress-item",children:[s.jsxs("div",{className:"progress-label",children:[s.jsx("span",{className:"module-name",children:"Advanced"}),s.jsxs("span",{className:"module-score",children:[I.advancedHighest,"%"]})]}),s.jsx("div",{className:"progress-bar",children:s.jsx("div",{className:"progress-fill advanced-fill",style:{width:`${I.advancedHighest}%`}})})]})]})]})]})}),g==="quizzes"&&s.jsx("div",{className:"statistics-tab-content",children:s.jsxs("div",{className:"stats-grid quizzes-grid",children:[s.jsxs("div",{className:"stats-card difficulty-card beginner-card",children:[s.jsxs("div",{className:"difficulty-header",children:[s.jsx("div",{className:"difficulty-icon beginner-icon",children:s.jsx(X,{icon:Rc})}),s.jsx("h3",{className:"card-title",children:"Beginner Quizzes"})]}),Y.attempts>0?s.jsxs("div",{className:"difficulty-stats",children:[s.jsxs("div",{className:"stat-row",children:[s.jsxs("div",{className:"stat-column",children:[s.jsxs("div",{className:"stat-item",children:[s.jsx("span",{className:"stat-value",children:Y.attempts}),s.jsx("span",{className:"stat-label",children:"Attempts"})]}),s.jsxs("div",{className:"stat-item",children:[s.jsxs("span",{className:"stat-value",children:[Y.highestScore,"%"]}),s.jsx("span",{className:"stat-label",children:"Highest Score"})]})]}),s.jsxs("div",{className:"stat-column",children:[s.jsxs("div",{className:"stat-item",children:[s.jsxs("span",{className:"stat-value",children:[Y.averageScore,"%"]}),s.jsx("span",{className:"stat-label",children:"Average Score"})]}),s.jsxs("div",{className:"stat-item",children:[s.jsxs("span",{className:"stat-value",children:[Y.passRate,"%"]}),s.jsx("span",{className:"stat-label",children:"Pass Rate"})]})]})]}),Y.recentScore!==null&&s.jsxs("div",{className:"recent-score",children:[s.jsx("div",{className:"recent-score-label",children:"Most Recent Score:"}),s.jsxs("div",{className:"recent-score-value",children:[Y.recentScore,"%",Y.trend==="up"&&s.jsx(X,{icon:ds,className:"trend-up"}),Y.trend==="down"&&s.jsx(X,{icon:us,className:"trend-down"})]})]})]}):s.jsx("div",{className:"no-data-message",children:s.jsx("p",{children:"No beginner quizzes completed yet"})})]}),s.jsxs("div",{className:"stats-card difficulty-card intermediate-card",children:[s.jsxs("div",{className:"difficulty-header",children:[s.jsx("div",{className:"difficulty-icon intermediate-icon",children:s.jsx(X,{icon:Rc})}),s.jsx("h3",{className:"card-title",children:"Intermediate Quizzes"})]}),R.attempts>0?s.jsxs("div",{className:"difficulty-stats",children:[s.jsxs("div",{className:"stat-row",children:[s.jsxs("div",{className:"stat-column",children:[s.jsxs("div",{className:"stat-item",children:[s.jsx("span",{className:"stat-value",children:R.attempts}),s.jsx("span",{className:"stat-label",children:"Attempts"})]}),s.jsxs("div",{className:"stat-item",children:[s.jsxs("span",{className:"stat-value",children:[R.highestScore,"%"]}),s.jsx("span",{className:"stat-label",children:"Highest Score"})]})]}),s.jsxs("div",{className:"stat-column",children:[s.jsxs("div",{className:"stat-item",children:[s.jsxs("span",{className:"stat-value",children:[R.averageScore,"%"]}),s.jsx("span",{className:"stat-label",children:"Average Score"})]}),s.jsxs("div",{className:"stat-item",children:[s.jsxs("span",{className:"stat-value",children:[R.passRate,"%"]}),s.jsx("span",{className:"stat-label",children:"Pass Rate"})]})]})]}),R.recentScore!==null&&s.jsxs("div",{className:"recent-score",children:[s.jsx("div",{className:"recent-score-label",children:"Most Recent Score:"}),s.jsxs("div",{className:"recent-score-value",children:[R.recentScore,"%",R.trend==="up"&&s.jsx(X,{icon:ds,className:"trend-up"}),R.trend==="down"&&s.jsx(X,{icon:us,className:"trend-down"})]})]})]}):s.jsx("div",{className:"no-data-message",children:s.jsx("p",{children:"No intermediate quizzes completed yet"})})]}),s.jsxs("div",{className:"stats-card difficulty-card advanced-card",children:[s.jsxs("div",{className:"difficulty-header",children:[s.jsx("div",{className:"difficulty-icon advanced-icon",children:s.jsx(X,{icon:Rc})}),s.jsx("h3",{className:"card-title",children:"Advanced Quizzes"})]}),te.attempts>0?s.jsxs("div",{className:"difficulty-stats",children:[s.jsxs("div",{className:"stat-row",children:[s.jsxs("div",{className:"stat-column",children:[s.jsxs("div",{className:"stat-item",children:[s.jsx("span",{className:"stat-value",children:te.attempts}),s.jsx("span",{className:"stat-label",children:"Attempts"})]}),s.jsxs("div",{className:"stat-item",children:[s.jsxs("span",{className:"stat-value",children:[te.highestScore,"%"]}),s.jsx("span",{className:"stat-label",children:"Highest Score"})]})]}),s.jsxs("div",{className:"stat-column",children:[s.jsxs("div",{className:"stat-item",children:[s.jsxs("span",{className:"stat-value",children:[te.averageScore,"%"]}),s.jsx("span",{className:"stat-label",children:"Average Score"})]}),s.jsxs("div",{className:"stat-item",children:[s.jsxs("span",{className:"stat-value",children:[te.passRate,"%"]}),s.jsx("span",{className:"stat-label",children:"Pass Rate"})]})]})]}),te.recentScore!==null&&s.jsxs("div",{className:"recent-score",children:[s.jsx("div",{className:"recent-score-label",children:"Most Recent Score:"}),s.jsxs("div",{className:"recent-score-value",children:[te.recentScore,"%",te.trend==="up"&&s.jsx(X,{icon:ds,className:"trend-up"}),te.trend==="down"&&s.jsx(X,{icon:us,className:"trend-down"})]})]})]}):s.jsx("div",{className:"no-data-message",children:s.jsx("p",{children:"No advanced quizzes completed yet"})})]}),s.jsxs("div",{className:"stats-card recent-quizzes-card",children:[s.jsx("h3",{className:"card-title",children:"Recent Quiz Activity"}),s.jsx("div",{className:"recent-quizzes-list",children:I.recentQuizzes.length>0?I.recentQuizzes.map((W,F)=>s.jsxs("div",{className:"recent-quiz-item",children:[s.jsxs("div",{className:"quiz-date-time",children:[s.jsx(X,{icon:l4,className:"date-icon"}),s.jsx("span",{children:S(W.completion_date||W.date)})]}),s.jsxs("div",{className:"quiz-details",children:[s.jsx("div",{className:"quiz-type",children:s.jsx("span",{className:`difficulty-badge ${ae(W.quiz_id)}`,children:G(W.quiz_id)})}),s.jsx("div",{className:"quiz-score",children:s.jsxs("span",{className:`score ${W.score>=70?"passing":"failing"}`,children:[W.score,"%",W.score>=70?s.jsx(X,{icon:Ns,className:"pass-icon"}):s.jsx(X,{icon:O4,className:"fail-icon"})]})})]})]},F)):s.jsx("div",{className:"no-quiz-data",children:s.jsx("p",{children:"No quiz activity yet"})})})]})]})}),g==="streaks"&&s.jsx("div",{className:"statistics-tab-content",children:s.jsxs("div",{className:"stats-grid streaks-grid",children:[s.jsxs("div",{className:"stats-card current-streaks-card",children:[s.jsx("h3",{className:"card-title",children:"Current Streaks"}),s.jsxs("div",{className:"streaks-container",children:[s.jsxs("div",{className:"streak-item",children:[s.jsx("div",{className:"streak-icon-container login-streak-icon",children:s.jsx(X,{icon:pr,className:"streak-icon"})}),s.jsxs("div",{className:"streak-content",children:[s.jsx("div",{className:"streak-value",children:(a==null?void 0:a.login_streak)||0}),s.jsxs("div",{className:"streak-label",children:["Day Login Streak",s.jsx("div",{className:"streak-subtitle",children:"Consecutive days logged in"})]})]})]}),s.jsxs("div",{className:"streak-item",children:[s.jsx("div",{className:"streak-icon-container quiz-streak-icon",children:s.jsx(X,{icon:Mr,className:"streak-icon"})}),s.jsxs("div",{className:"streak-content",children:[s.jsx("div",{className:"streak-value",children:(a==null?void 0:a.quiz_streak)||0}),s.jsxs("div",{className:"streak-label",children:["Day Quiz Streak",s.jsx("div",{className:"streak-subtitle",children:"Consecutive days with quizzes"})]})]})]})]})]}),s.jsxs("div",{className:"stats-card record-streaks-card",children:[s.jsx("h3",{className:"card-title",children:"Record Streaks"}),s.jsxs("div",{className:"streaks-container",children:[s.jsxs("div",{className:"streak-item",children:[s.jsx("div",{className:"streak-icon-container login-record-icon",children:s.jsx(X,{icon:Pt,className:"streak-icon"})}),s.jsxs("div",{className:"streak-content",children:[s.jsx("div",{className:"streak-value",children:(a==null?void 0:a.longest_login_streak)||0}),s.jsxs("div",{className:"streak-label",children:["Longest Login Streak",s.jsx("div",{className:"streak-subtitle",children:"Best consecutive login days"})]})]})]}),s.jsxs("div",{className:"streak-item",children:[s.jsx("div",{className:"streak-icon-container quiz-record-icon",children:s.jsx(X,{icon:Pt,className:"streak-icon"})}),s.jsxs("div",{className:"streak-content",children:[s.jsx("div",{className:"streak-value",children:(a==null?void 0:a.longest_quiz_streak)||0}),s.jsxs("div",{className:"streak-label",children:["Longest Quiz Streak",s.jsx("div",{className:"streak-subtitle",children:"Best consecutive quiz days"})]})]})]})]})]}),s.jsxs("div",{className:"stats-card streak-info-card",children:[s.jsxs("h3",{className:"card-title",children:[s.jsx(X,{icon:Co,style:{marginRight:"8px"}}),"About Streaks"]}),s.jsxs("div",{className:"streak-info-content",children:[s.jsxs("p",{children:[s.jsx("strong",{children:"Login Streak:"})," This counter increases each day you log in to the application. It resets to zero if you don't log in for 24 hours."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Quiz Streak:"})," This counter increases each day you complete at least one quiz. It resets to zero if you don't complete a quiz for 24 hours."]}),s.jsxs("div",{className:"streak-benefits",children:[s.jsx("h4",{children:"Benefits of Maintaining Streaks:"}),s.jsxs("ul",{children:[s.jsx("li",{children:"Unlock special achievements"}),s.jsx("li",{children:"Track your consistency"}),s.jsx("li",{children:"Build security awareness habits"}),s.jsx("li",{children:"Compete on the leaderboard"})]})]})]})]})]})})]}),s.jsx("style",{jsx:!0,children:`
        /* Main container */
        .statistics-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .statistics-header {
          margin-bottom: 1.5rem;
        }
        
        .statistics-header h2 {
          color: #ffffff;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        
        .statistics-subtitle {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 300;
        }
        
        /* Tabs styling */
        .statistics-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #333;
          padding-bottom: 0.5rem;
        }
        
        .tab-btn {
          background: none;
          border: none;
          color: #ffffff;
          padding: 0.75rem 1.25rem;
          border-radius: 6px 6px 0 0;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .tab-btn:hover {
          color: #ffffff;
          background-color: rgba(60, 60, 80, 0.6);
        }
        
        .tab-btn.active {
          color: #ffffff;
          background-color: rgba(60, 60, 80, 0.8);
          border-bottom: 3px solid #646cff;
        }
        
        .tab-icon {
          font-size: 1rem;
        }
        
        /* Stats grid layout */
        .stats-grid {
          display: grid;
          gap: 1.5rem;
        }
        
        .overview-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            "scores history"
            "completions modules";
        }
        
        .quizzes-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            "beginner intermediate"
            "advanced recent";
        }
        
        .streaks-grid {
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            "current record"
            "info info";
        }
        
        /* Card styling */
        .stats-card {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .card-title {
          color: #ffffff;
          font-size: 1.2rem;
          margin-top: 0;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
        }
        
        /* Score Metrics Card */
        .score-metrics {
          grid-area: scores;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .metric-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
        }
        
        .metric-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        
        .average-icon {
          background-color: rgba(100, 108, 255, 0.15);
          color: #646cff;
        }
        
        .highest-icon {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }
        
        .lowest-icon {
          background-color: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
        }
        
        .pass-icon {
          background-color: rgba(241, 196, 15, 0.15);
          color: #f1c40f;
        }
        
        .metric-content {
          display: flex;
          flex-direction: column;
        }
        
        .metric-label {
          color: #aaaaaa;
          font-size: 0.9rem;
        }
        
        .metric-value {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        /* Score History Chart */
        .score-history-card {
          grid-area: history;
        }
        
        .score-chart-container {
          display: flex;
          height: 250px;
        }
        
        .y-axis-labels {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-right: 10px;
          color: #aaaaaa;
          font-size: 0.8rem;
        }
        
        .chart-area {
          flex: 1;
          position: relative;
        }
        
        .score-chart {
          background-color: #242424;
          border-radius: 8px;
          padding: 10px;
        }
        
        .x-axis-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          color: #aaaaaa;
          font-size: 0.8rem;
          position: relative;
          height: 20px;
        }
        
        .x-axis-labels span {
          position: absolute;
          transform: translateX(-50%);
        }
        
        .data-point:hover .point-label {
          display: block;
        }
        
        .point-label {
          display: none;
        }
        
        /* Quiz Completions Card */
        .quiz-completions-card {
          grid-area: completions;
        }
        
        .completions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 1rem;
        }
        
        .completion-stat {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }
        
        .stat-number {
          color: #646cff;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: #aaaaaa;
          font-size: 0.9rem;
        }
        
        /* Module Progress Card */
        .module-progress-card {
          grid-area: modules;
        }
        
        .progress-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .progress-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .module-name {
          color: #ffffff;
          font-weight: 500;
        }
        
        .module-score {
          color: #aaaaaa;
          font-size: 0.9rem;
        }
        
        .progress-bar {
          height: 10px;
          background-color: #333;
          border-radius: 5px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.3s ease;
        }
        
        .beginner-fill {
          background-color: #3498db;
        }
        
        .intermediate-fill {
          background-color: #2ecc71;
        }
        
        .advanced-fill {
          background-color: #e74c3c;
        }
        
        /* Difficulty Cards */
        .difficulty-card {
          padding: 1.25rem;
        }
        
        .beginner-card {
          grid-area: beginner;
        }
        
        .intermediate-card {
          grid-area: intermediate;
        }
        
        .advanced-card {
          grid-area: advanced;
        }
        
        .difficulty-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        
        .difficulty-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        
        .beginner-icon {
          background-color: rgba(52, 152, 219, 0.15);
          color: #3498db;
        }
        
        .intermediate-icon {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }
        
        .advanced-icon {
          background-color: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
        }
        
        .difficulty-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .stat-row {
          display: flex;
          gap: 1rem;
        }
        
        .stat-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .stat-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }
        
        .stat-value {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        
        .stat-label {
          color: #aaaaaa;
          font-size: 0.85rem;
        }
        
        .recent-score {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .recent-score-label {
          color: #aaaaaa;
          font-size: 0.9rem;
        }
        
        .recent-score-value {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .trend-up {
          color: #2ecc71;
        }
        
        .trend-down {
          color: #e74c3c;
        }
        
        /* Recent Quizzes Card */
        .recent-quizzes-card {
          grid-area: recent;
        }
        
        .recent-quizzes-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 350px;
          overflow-y: auto;
        }
        
        .recent-quiz-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .quiz-date-time {
          color: #aaaaaa;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .date-icon {
          font-size: 0.8rem;
        }
        
        .quiz-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .difficulty-badge {
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }
        
        .beginner-badge {
          background-color: rgba(52, 152, 219, 0.15);
          color: #3498db;
        }
        
        .intermediate-badge {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }
        
        .advanced-badge {
          background-color: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
        }
        
        .quiz-score {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .score {
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .passing {
          color: #2ecc71;
        }
        
        .failing {
          color: #e74c3c;
        }
        
        .pass-icon {
          font-size: 0.9rem;
          color: #2ecc71;
        }
        
        .fail-icon {
          font-size: 0.9rem;
          color: #e74c3c;
        }
        
        /* Streak Cards */
        .current-streaks-card {
          grid-area: current;
        }
        
        .record-streaks-card {
          grid-area: record;
        }
        
        .streak-info-card {
          grid-area: info;
        }
        
        .streaks-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .streak-item {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .streak-icon-container {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        
        .login-streak-icon {
          background-color: rgba(52, 152, 219, 0.15);
          color: #3498db;
        }
        
        .quiz-streak-icon {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }
        
        .login-record-icon,
        .quiz-record-icon {
          background-color: rgba(241, 196, 15, 0.15);
          color: #f1c40f;
        }
        
        .streak-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .streak-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          min-width: 50px;
          text-align: center;
        }
        
        .streak-label {
          display: flex;
          flex-direction: column;
          color: #ffffff;
          font-weight: 500;
        }
        
        .streak-subtitle {
          color: #aaaaaa;
          font-size: 0.85rem;
          font-weight: 400;
          margin-top: 0.25rem;
        }
        
        .streak-info-content {
          color: #e0e0e0;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .streak-info-content p {
          margin-bottom: 1rem;
        }
        
        .streak-benefits {
          background-color: #242424;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }
        
        .streak-benefits h4 {
          color: #ffffff;
          margin-top: 0;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }
        
        .streak-benefits ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #e0e0e0;
        }
        
        .streak-benefits li {
          margin-bottom: 0.5rem;
        }
        
        /* No data message */
        .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: #aaaaaa;
          font-style: italic;
          text-align: center;
          gap: 1rem;
        }
        
        .info-icon {
          font-size: 2rem;
          color: #3498db;
        }
        
        .no-quiz-data {
          padding: 2rem;
          text-align: center;
          color: #aaaaaa;
          font-style: italic;
        }
        
        /* Loading/Error states */
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 300px;
          color: #ecf0f1;
        }
        
        .loading-spinner {
          font-size: 2rem;
          color: #3498db;
          margin-bottom: 1rem;
        }
        
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 8px;
          color: #ecf0f1;
        }
        
        .error-icon {
          color: #e74c3c;
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .retry-btn {
          margin-top: 1rem;
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .retry-btn:hover {
          background-color: #2980b9;
        }
        
        /* Responsive styles */
        @media (max-width: 992px) {
          .statistics-container {
            padding: 1.5rem;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .overview-grid,
          .quizzes-grid,
          .streaks-grid {
            grid-template-columns: 1fr;
            grid-template-areas: none;
          }
          
          .stats-card {
            grid-area: auto !important;
          }
          
          .tab-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 480px) {
          .statistics-container {
            padding: 1rem;
          }
          
          .statistics-tabs {
            flex-wrap: wrap;
          }
          
          .tab-btn {
            flex: 1;
            justify-content: center;
          }
          
          .tab-icon {
            display: none;
          }
          
          .stat-row {
            flex-direction: column;
          }
          
          .streak-content {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .streak-value {
            min-width: auto;
            text-align: left;
          }
        }
      `})]});function G(W){switch(W){case 1:return"Beginner";case 2:return"Intermediate";case 3:return"Advanced";default:return"Unknown"}}function ae(W){switch(W){case 1:return"beginner-badge";case 2:return"intermediate-badge";case 3:return"advanced-badge";default:return""}}},vw=()=>{const[r,a]=z.useState(1),[o,c]=z.useState(null),[l,u]=z.useState([]),[d,p]=z.useState(!0),[m,v]=z.useState(null),[x,g]=z.useState([]),y=sessionStorage.getItem("username")||"";z.useEffect(()=>{N(),A()},[]),z.useEffect(()=>{x.length>0&&(console.log("Quiz history updated, recalculating user data..."),N())},[x]);const E=l.findIndex(R=>R.username===y)+1;z.useEffect(()=>{E>0&&a(Math.ceil(E/k))},[E,l]);const A=async()=>{try{console.log("Fetching quiz history data...");const R=await fetch(fn.GET_USER_QUIZ_HISTORY);if(!R.ok)throw new Error("Failed to fetch quiz history");const te=await R.json();console.log("Quiz history data received:",te),te.success&&te.quizHistory?(console.log("Setting quiz history:",te.quizHistory),g(te.quizHistory)):console.warn("Missing or invalid quiz history data:",te)}catch(R){console.error("Error fetching quiz history",R)}},N=async()=>{p(!0);try{console.log("Fetching leaderboard data...");const R=await fetch(fn.GET_USERS);if(!R.ok)throw new Error("Failed to fetch users");const te=await R.json();if(console.log("Leaderboard data:",te),te.success&&te.users){const pe=te.users.map(J=>{const fe=J.quiz_days_count||0,G=J.total_quiz_completions||0,ae=J.login_streak||0,W=J.quiz_streak||0,F=w(J),V=S(J);return{id:J.id,username:J.username,score:F,accuracy:V,completedChallenges:fe,totalCompletions:G,loginStreak:ae,quizStreak:W,longestLoginStreak:J.longest_login_streak||0,longestQuizStreak:J.longest_quiz_streak||0,lastLogin:J.last_login,lastLoginUpdate:J.last_login_update,lastQuizUpdate:J.last_quiz_update}});pe.sort((J,fe)=>{const G=fe.score-J.score;if(G!==0)return G;const ae=fe.quizStreak-J.quizStreak;return ae!==0?ae:fe.loginStreak-J.loginStreak}),u(pe)}else throw new Error("Invalid user data format")}catch(R){console.error("Error fetching users",R),v(R.message),we.error("Failed to load leaderboard data")}finally{p(!1)}};function w(R){console.log("Calculating score for user:",R.username,"ID:",R.id);const te=x.find(fe=>fe.user_id===R.id);if(console.log("Quiz history data found:",te),!te||!te.quiz_completions)return console.log("No quiz completions found for user",R.username),R.total_quiz_completions&&R.total_quiz_completions>0?(console.log("Using total_quiz_completions for fallback score:",R.total_quiz_completions),R.total_quiz_completions*50):0;let pe;if(Array.isArray(te.quiz_completions))pe=te.quiz_completions;else if(typeof te.quiz_completions=="object")try{const fe=JSON.parse(te.quiz_completions);pe=Array.isArray(fe)?fe:null}catch(fe){console.error("Failed to parse quiz_completions",fe),pe=null}if(console.log("Quiz completions array length:",(pe==null?void 0:pe.length)||0),!pe||!Array.isArray(pe)||pe.length===0)return console.log("No valid quiz completions array for user",R.username),0;let J=0;return pe.forEach(fe=>{const G=fe.total_questions||5;let ae=fe.correct_answers;if(ae!=null){const W=ae*10;J+=W,console.log(`Quiz ${fe.quiz_id} with correct_answers data: ${ae} correct, ${W} points`)}else if(fe.completion_details)try{const W=typeof fe.completion_details=="string"?JSON.parse(fe.completion_details):fe.completion_details;if(Array.isArray(W)){const F=W.filter(Q=>Q.isCorrect).length,V=F*10;J+=V,console.log(`Quiz ${fe.quiz_id} with detailed data: ${F} correct answers, ${V} points`)}}catch(W){console.error("Error parsing completion details:",W);const F=Math.round(fe.score/100*G)*10;J+=F}else if(fe.score){const W=Math.round(fe.score/100*G),F=W*10;J+=F,console.log(`Quiz ${fe.quiz_id} score: ${fe.score}%, estimated ${W} correct of ${G}, ${F} points`)}}),console.log(`User ${R.username} final score: ${J}`),J}function S(R){console.log("Calculating accuracy for user:",R.username);const te=x.find(ae=>ae.user_id===R.id);if(!te||!te.quiz_completions)return console.log("No quiz completions found for accuracy calculation"),0;let pe;if(Array.isArray(te.quiz_completions))pe=te.quiz_completions;else if(typeof te.quiz_completions=="object")try{const ae=JSON.parse(te.quiz_completions);pe=Array.isArray(ae)?ae:null}catch(ae){console.error("Failed to parse quiz_completions for accuracy",ae),pe=null}if(!pe||!Array.isArray(pe)||pe.length===0)return console.log("No valid quiz completions array for accuracy calculation"),0;let J=0,fe=0;if(pe.forEach(ae=>{if(typeof ae.score=="number")J+=ae.score,fe++,console.log(`Accuracy calculation: quiz score ${ae.score}%`);else if(ae.completion_details)try{const W=typeof ae.completion_details=="string"?JSON.parse(ae.completion_details):ae.completion_details;if(Array.isArray(W)){const F=W.length;if(F>0){const V=W.filter(Q=>Q.isCorrect).length/F*100;J+=V,fe++,console.log(`Accuracy calculation from details: ${V.toFixed(1)}%`)}}}catch(W){console.error("Error parsing completion details for accuracy:",W)}else if(ae.correct_answers&&ae.total_questions){const W=ae.correct_answers/ae.total_questions*100;J+=W,fe++,console.log(`Accuracy calculation from correct_answers: ${W.toFixed(1)}%`)}}),fe===0)return 0;const G=J/fe;return console.log(`User ${R.username} accuracy: ${Math.round(G)}%`),Math.round(G)}const k=10,C=Math.ceil(l.length/k),$=l.slice((r-1)*k,r*k),I=()=>{r<C&&a(r+1)},q=()=>{r>1&&a(r-1)},Z=()=>{E>0&&a(Math.ceil(E/k))},H=R=>{switch(R){case 1:return s.jsx(X,{icon:Pt,className:"rank-icon gold"});case 2:return s.jsx(X,{icon:Io,className:"rank-icon silver"});case 3:return s.jsx(X,{icon:js,className:"rank-icon bronze"});default:return s.jsx("span",{className:"rank-number",children:R})}},Y=R=>{if(!R)return"Never";const te=new Date(R),pe=Math.abs(new Date-te),J=Math.floor(pe/(1e3*60*60*24));if(J===0)return"Today";if(J===1)return"Yesterday";if(J<7)return`${J} days ago`;if(J<30){const fe=Math.floor(J/7);return`${fe} ${fe===1?"week":"weeks"} ago`}else return te.toLocaleDateString()};return d?s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"loading-container",children:[s.jsx(X,{icon:Ca,spin:!0,className:"loading-spinner"}),s.jsx("p",{children:"Loading leaderboard data..."})]})}):m?s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"error-container",children:[s.jsx(X,{icon:Zo,className:"error-icon"}),s.jsx("h3",{children:"Failed to load leaderboard"}),s.jsx("p",{children:m}),s.jsx("button",{onClick:N,className:"retry-btn",children:"Try Again"})]})}):s.jsxs("div",{className:"content-wrapper",children:[s.jsxs("div",{className:"leaderboard-container",children:[s.jsx("div",{className:"leaderboard-header",children:s.jsx("h2",{children:"Leaderboard"})}),s.jsx("div",{className:"leaderboard-content",children:l.length===0?s.jsx("div",{className:"no-data-message",children:s.jsx("p",{children:"No users found. Be the first to complete a challenge"})}):s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"leaderboard-table",children:[s.jsxs("div",{className:"leaderboard-table-header",children:[s.jsx("div",{className:"rank-column",children:"Rank"}),s.jsx("div",{className:"user-column",children:"User"}),s.jsx("div",{className:"score-column",children:"Score"}),s.jsx("div",{className:"accuracy-column",children:"Accuracy"}),s.jsx("div",{className:"login-streak-column",children:"Login Streak"}),s.jsx("div",{className:"quiz-streak-column",children:"Quiz Streak"}),s.jsx("div",{className:"details-column"})]}),l.slice(0,Math.min(3,l.length)).map((R,te)=>s.jsxs("div",{className:`leaderboard-row top-3 ${R.username===y?"current-user":""}`,children:[s.jsx("div",{className:"rank-column",children:H(te+1)}),s.jsxs("div",{className:"user-column",children:[s.jsx(X,{icon:U0,className:"user-avatar"}),s.jsx("span",{className:"username",children:R.username})]}),s.jsx("div",{className:"score-column",children:R.score}),s.jsxs("div",{className:"accuracy-column",children:[R.accuracy,"%"]}),s.jsxs("div",{className:"login-streak-column tooltip-container",children:[s.jsx(X,{icon:pr,className:"streak-icon login-streak-icon"}),s.jsxs("span",{className:"streak-value",children:[R.loginStreak," ",R.loginStreak===1?"day":"days"]}),s.jsxs("div",{className:"tooltip",children:[s.jsx("p",{className:"tooltip-title",children:"Login Streak"}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Current:"}),R.loginStreak," days"]}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Longest:"}),R.longestLoginStreak," days"]}),s.jsx("div",{className:"tooltip-divider"}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Last Login:"})," ",Y(R.lastLogin)]})]})]}),s.jsxs("div",{className:"quiz-streak-column tooltip-container",children:[s.jsx(X,{icon:Mr,className:"streak-icon quiz-streak-icon"}),s.jsxs("span",{className:"streak-value",children:[R.quizStreak," ",R.quizStreak===1?"day":"days"]}),s.jsxs("div",{className:"tooltip",children:[s.jsx("p",{className:"tooltip-title",children:"Quiz Streak"}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Current:"}),R.quizStreak," quizes completed"]}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Longest:"}),R.longestQuizStreak," days"]}),s.jsx("div",{className:"tooltip-divider"}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Last Quiz:"})," ",Y(R.lastQuizUpdate)]})]})]}),s.jsx("div",{className:"details-column",children:s.jsx("button",{className:"details-btn",onClick:()=>c(o===R.id?null:R.id),"aria-label":"View details",children:s.jsx(X,{icon:Co})})}),o===R.id&&s.jsx("div",{className:"expanded-details",children:s.jsxs("div",{className:"details-grid",children:[s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Total Quiz Completions"}),s.jsx("span",{className:"detail-value",children:R.totalCompletions})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Unique Quiz Days"}),s.jsx("span",{className:"detail-value",children:R.completedChallenges})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Login Streak"}),s.jsxs("span",{className:"detail-value",children:[R.loginStreak," days"]})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Quiz Streak"}),s.jsxs("span",{className:"detail-value",children:[R.quizStreak," "]})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Longest Login Streak"}),s.jsxs("span",{className:"detail-value",children:[R.longestLoginStreak," days"]})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Longest Quiz Streak"}),s.jsxs("span",{className:"detail-value",children:[R.longestQuizStreak," "]})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Last Active"}),s.jsx("span",{className:"detail-value",children:Y(R.lastLogin)})]})]})})]},R.id)),l.length>3&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"leaderboard-divider",children:s.jsx("span",{className:"divider-text",children:"Other Rankings"})}),$.slice(Math.min(3,$.length)).map((R,te)=>{const pe=(r-1)*k+te+Math.min(3,r===1?0:3);return s.jsxs("div",{className:`leaderboard-row ${R.username===y?"current-user":""}`,children:[s.jsx("div",{className:"rank-column",children:s.jsx("span",{className:"rank-number",children:pe+1})}),s.jsxs("div",{className:"user-column",children:[s.jsx(X,{icon:U0,className:"user-avatar"}),s.jsx("span",{className:"username",children:R.username})]}),s.jsx("div",{className:"score-column",children:R.score}),s.jsxs("div",{className:"accuracy-column",children:[R.accuracy,"%"]}),s.jsxs("div",{className:"login-streak-column tooltip-container",children:[s.jsx(X,{icon:pr,className:"streak-icon login-streak-icon"}),s.jsxs("span",{className:"streak-value",children:[R.loginStreak," ",R.loginStreak===1?"day":"days"]}),s.jsxs("div",{className:"tooltip",children:[s.jsx("p",{className:"tooltip-title",children:"Login Streak"}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Current:"}),R.loginStreak," days"]}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Longest:"}),R.longestLoginStreak," days"]}),s.jsx("div",{className:"tooltip-divider"}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Last Login:"})," ",Y(R.lastLogin)]})]})]}),s.jsxs("div",{className:"quiz-streak-column tooltip-container",children:[s.jsx(X,{icon:Mr,className:"streak-icon quiz-streak-icon"}),s.jsxs("span",{className:"streak-value",children:[R.quizStreak," ",R.quizStreak===1?"day":"days"]}),s.jsxs("div",{className:"tooltip",children:[s.jsx("p",{className:"tooltip-title",children:"Quiz Streak"}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Current:"}),R.quizStreak]}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Longest:"}),R.longestQuizStreak," days"]}),s.jsx("div",{className:"tooltip-divider"}),s.jsxs("p",{children:[s.jsx("span",{className:"tooltip-label",children:"Last Quiz:"})," ",Y(R.lastQuizUpdate)]})]})]}),s.jsx("div",{className:"details-column",children:s.jsx("button",{className:"details-btn",onClick:()=>c(o===R.id?null:R.id),"aria-label":"View details",children:s.jsx(X,{icon:Co})})}),o===R.id&&s.jsx("div",{className:"expanded-details",children:s.jsxs("div",{className:"details-grid",children:[s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Total Quiz Completions"}),s.jsx("span",{className:"detail-value",children:R.totalCompletions})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Unique Quiz Days"}),s.jsx("span",{className:"detail-value",children:R.completedChallenges})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Login Streak"}),s.jsxs("span",{className:"detail-value",children:[R.loginStreak," days"]})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Quiz Streak"}),s.jsxs("span",{className:"detail-value",children:[R.quizStreak," "]})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Longest Login Streak"}),s.jsxs("span",{className:"detail-value",children:[R.longestLoginStreak," days"]})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Longest Quiz Streak"}),s.jsxs("span",{className:"detail-value",children:[R.longestQuizStreak," days"]})]}),s.jsxs("div",{className:"detail-item",children:[s.jsx("span",{className:"detail-label",children:"Last Active"}),s.jsx("span",{className:"detail-value",children:Y(R.lastLogin)})]})]})})]},R.id)})]})]}),l.length>k&&s.jsxs("div",{className:"pagination-controls",children:[s.jsx("button",{className:"pagination-btn",onClick:q,disabled:r===1,children:"Previous"}),s.jsxs("div",{className:"pagination-info",children:["Page ",r," of ",C]}),s.jsx("button",{className:"pagination-btn",onClick:I,disabled:r===C,children:"Next"}),E>0&&s.jsx("button",{className:"pagination-btn find-me-btn",onClick:Z,children:"Find Me"})]})]})}),s.jsxs("div",{className:"streak-info-card",children:[s.jsxs("h3",{children:[s.jsx(X,{icon:Co})," Scoring Information"]}),s.jsx("p",{children:"The leaderboard displays two types of streaks:"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Login Streak:"})," Increases each day you log in, resets after 24 hours of inactivity"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Quiz Streak:"})," Increases each day you complete at least one quiz, resets after 24 hours of inactivity"]})]}),s.jsx("p",{children:"Your score is based on:"}),s.jsxs("ul",{children:[s.jsx("li",{children:"Every correct question is worth 10 points"}),s.jsx("li",{children:"Your score is the sum of all points earned across all quiz completions"}),s.jsx("li",{children:"Accuracy shows your average score across all quizzes"})]})]})]}),s.jsx("style",{jsx:!0,children:`
                .leaderboard-container {
                    max-width: 1200px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 2rem;
                }
                
                .leaderboard-header {
                    margin-bottom: 2rem;
                }
                
                .leaderboard-header h2 {
                    color: #ffffff;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .leaderboard-content {
                    background-color: #1a1a1a;
                    border-radius: 14px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                }
                
                .leaderboard-table {
                    width: 100%;
                }
                
                .leaderboard-table-header {
                    display: grid;
                    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr 0.5fr;
                    padding: 1rem;
                    background-color: #2c3e50;
                    border-radius: 8px;
                    font-weight: bold;
                    color: #ecf0f1;
                    margin-bottom: 1rem;
                }
                
                .leaderboard-row {
                    display: grid;
                    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr 0.5fr;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 0.5rem;
                    background-color: #242424;
                    position: relative;
                    transition: all 0.2s ease;
                }
                
                .leaderboard-row:hover {
                    background-color: #2c3e50;
                }
                
                .leaderboard-row.top-3 {
                    background-color: #2c3e50;
                    margin-bottom: 0.75rem;
                }
                
                .leaderboard-row.top-3:nth-child(2) {
                    background-color: #22303e;
                }
                
                .leaderboard-row.top-3:nth-child(3) {
                    background-color: #1e2b38;
                }
                
                .leaderboard-row.top-3:nth-child(4) {
                    background-color: #1a2634;
                }
                
                .leaderboard-row.current-user {
                    background-color: rgba(52, 152, 219, 0.2);
                    border: 1px solid #3498db;
                }
                
                .rank-column, .user-column, .score-column, .accuracy-column, .login-streak-column, .quiz-streak-column, .details-column {
                    display: flex;
                    align-items: center;
                }
                
                .rank-icon {
                    font-size: 1.5rem;
                }
                
                .rank-icon.gold {
                    color: #f1c40f;
                }
                
                .rank-icon.silver {
                    color: #bdc3c7;
                }
                
                .rank-icon.bronze {
                    color: #d35400;
                }
                
                .rank-number {
                    font-weight: bold;
                    color: #ecf0f1;
                }
                
                .user-avatar {
                    font-size: 1.5rem;
                    margin-right: 0.75rem;
                    color: #3498db;
                }
                
                .username {
                    font-weight: 500;
                    color: #ecf0f1;
                }
                
                .score-column, .accuracy-column {
                    color: #ecf0f1;
                    font-weight: 500;
                }
                
                .login-streak-column, .quiz-streak-column {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #ecf0f1;
                    font-weight: 500;
                    position: relative;
                }
                
                .login-streak-icon {
                    color: #3498db;
                }
                
                .quiz-streak-icon {
                    color: #e74c3c;
                }
                
                .details-btn {
                    background: none;
                    border: none;
                    color: #3498db;
                    cursor: pointer;
                    font-size: 1rem;
                    padding: 0.25rem;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                
                .details-btn:hover {
                    background-color: rgba(52, 152, 219, 0.2);
                }
                
                /* Tooltip styling */
                .tooltip-container {
                    position: relative;
                }
                
                .tooltip {
                    display: none;
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    padding: 1rem;
                    border-radius: 6px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    width: 220px;
                    z-index: 1000;
                    font-size: 0.9rem;
                }
                
                .tooltip:after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 8px;
                    border-style: solid;
                    border-color: #2c3e50 transparent transparent transparent;
                }
                
                .tooltip-container:hover .tooltip {
                    display: block;
                }
                
                .tooltip-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    border-bottom: 1px solid #3498db;
                    padding-bottom: 0.25rem;
                }
                
                .tooltip-label {
                    font-weight: 500;
                    color: #3498db;
                    margin-right: 0.25rem;
                }
                
                .tooltip-divider {
                    height: 1px;
                    background-color: #34495e;
                    margin: 0.5rem 0;
                }
                
                .tooltip p {
                    margin: 0.25rem 0;
                }
                
                /* Expanded details styling */
                .expanded-details {
                    grid-column: 1 / -1;
                    margin-top: 1rem;
                    background-color: #2c3e50;
                    border-radius: 8px;
                    padding: 1rem;
                    animation: expandDetails 0.3s ease;
                }
                
                .details-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }
                
                .detail-item {
                    display: flex;
                    flex-direction: column;
                }
                
                .detail-label {
                    font-size: 0.75rem;
                    color: #95a5a6;
                    margin-bottom: 0.25rem;
                }
                
                .detail-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #ecf0f1;
                }
                
                /* Pagination styling */
                .pagination-controls {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 1.5rem;
                    gap: 1rem;
                }
                
                .pagination-btn {
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .pagination-btn:hover:not(:disabled) {
                    background-color: #34495e;
                }
                
                .pagination-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .find-me-btn {
                    background-color: #3498db;
                }
                
                .find-me-btn:hover {
                    background-color: #2980b9;
                }
                
                .pagination-info {
                    color: #ecf0f1;
                }
                
                /* Leaderboard divider */
                .leaderboard-divider {
                    display: flex;
                    align-items: center;
                    margin: 1.5rem 0;
                    color: #95a5a6;
                }
                
                .leaderboard-divider:before,
                .leaderboard-divider:after {
                    content: "";
                    flex: 1;
                    border-bottom: 1px solid #34495e;
                }
                
                .divider-text {
                    margin: 0 1rem;
                    font-size: 0.875rem;
                }
                
                /* No data message */
                .no-data-message {
                    padding: 2rem;
                    text-align: center;
                    color: #95a5a6;
                }
                
                /* Loading spinner */
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 300px;
                    color: #ecf0f1;
                }
                
                .loading-spinner {
                    font-size: 2rem;
                    color: #3498db;
                    margin-bottom: 1rem;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                @keyframes expandDetails {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Error container */
                .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background-color: #1a1a1a;
                    border-radius: 8px;
                    color: #ecf0f1;
                }
                
                .error-icon {
                    color: #e74c3c;
                    font-size: 2rem;
                    margin-bottom: 1rem;
                }
                
                .retry-btn {
                    margin-top: 1rem;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 0.5rem 1.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .retry-btn:hover {
                    background-color: #2980b9;
                }
                
                /* Streak Info Card */
                .streak-info-card {
                    background-color: #1a1a1a;
                    border-radius: 14px;
                    padding: 1.25rem;
                    margin-top: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                    border-left: 3px solid #3498db;
                }
                
                .streak-info-card h3 {
                    color: #3498db;
                    font-size: 1rem;
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .streak-info-card p {
                    margin: 0.5rem 0;
                    color: #ecf0f1;
                    font-size: 0.9rem;
                }
                
                .streak-info-card ul {
                    margin: 0.5rem 0;
                    padding-left: 1.5rem;
                }
                
                .streak-info-card li {
                    margin: 0.25rem 0;
                    color: #ecf0f1;
                    font-size: 0.9rem;
                }
                
                /* Responsive design */
                @media (max-width: 992px) {
                    .leaderboard-table-header, 
                    .leaderboard-row {
                        grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.5fr;
                    }
                    
                    .accuracy-column {
                        display: none;
                    }
                    
                    .details-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (max-width: 768px) {
                    .leaderboard-container {
                        padding: 1rem;
                    }
                    
                    .leaderboard-table-header, 
                    .leaderboard-row {
                        grid-template-columns: 0.5fr 2fr 1fr 1fr 0.5fr;
                        padding: 0.75rem;
                        font-size: 0.9rem;
                    }
                    
                    .quiz-streak-column {
                        display: none;
                    }
                    
                    .details-grid {
                        grid-template-columns: 1fr;
                    }
                }
                
                @media (max-width: 576px) {
                    .leaderboard-table-header, 
                    .leaderboard-row {
                        grid-template-columns: 0.5fr 2fr 1fr 0.5fr;
                        font-size: 0.85rem;
                    }
                    
                    .login-streak-column {
                        display: none;
                    }
                    
                    .pagination-controls {
                        flex-wrap: wrap;
                    }
                    
                    .find-me-btn {
                        margin-top: 0.5rem;
                        width: 100%;
                    }
                }
            `})]})},xw=()=>{const[r,a]=z.useState([]),[o,c]=z.useState(!0),[l,u]=z.useState(null),d=sessionStorage.getItem("username")||"User",p=sessionStorage.getItem("userId")||"1";z.useEffect(()=>{(async()=>{c(!0);try{console.log("Fetching achievements for user:",p);const x=await fetch(fn.GET_USER_ACHIEVEMENTS.replace(":userId",p));if(!x.ok)throw new Error("Failed to load achievements");const g=await x.json();if(console.log("Achievements data:",g),g.success&&g.achievements)a(g.achievements);else throw new Error("Invalid achievement data format")}catch(x){console.error("Error fetching achievements:",x),u(x.message),we.error("Failed to load achievements")}finally{c(!1)}})()},[p]);const m=x=>{if(x.icon)switch(x.icon.toLowerCase()){case"star":return _a;case"shield":return Es;case"calendar-check":return pr;case"trophy":return Pt;case"medal":return Io;case"award":return js;case"certificate":return Kg;case"graduation-cap":return _s;case"check":return To;default:return _a}return x.title.includes("Star")||x.title.includes("Learner")?_a:x.title.includes("Champion")||x.title.includes("Security")?Es:x.title.includes("Streak")||x.title.includes("Login")?pr:x.title.includes("Master")?Pt:Io};if(o)return s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"loading-container",children:[s.jsx(X,{icon:Ca,spin:!0,className:"loading-spinner"}),s.jsx("p",{children:"Loading achievements..."})]})});if(l)return s.jsx("div",{className:"content-wrapper",children:s.jsxs("div",{className:"error-container",children:[s.jsx(X,{icon:Zo,className:"error-icon"}),s.jsx("h3",{children:"Error"}),s.jsx("p",{children:l}),s.jsx("button",{onClick:()=>window.location.reload(),className:"retry-btn",children:"Try Again"})]})});const v=[...r].sort((x,g)=>x.unlocked&&!g.unlocked?-1:!x.unlocked&&g.unlocked?1:!x.unlocked&&!g.unlocked?g.progress-x.progress:x.title.localeCompare(g.title));return s.jsxs("div",{className:"content-wrapper",children:[s.jsxs("div",{className:"achievements-container",children:[s.jsxs("div",{className:"achievements-header",children:[s.jsxs("h2",{children:["Let's see what achievements you've received, ",d]}),s.jsx("h3",{children:"As you complete quizzes, you will be able to view your achievements here."})]}),s.jsx("div",{className:"achievements-grid",children:v.length>0?v.map(x=>s.jsxs("div",{className:"achievement-card",children:[s.jsx("div",{className:`achievement-icon ${!x.unlocked&&"locked"}`,style:{backgroundColor:x.unlocked?x.color||"#646cff":"#ccc"},children:s.jsx(X,{icon:m(x)})}),s.jsxs("div",{className:"achievement-details",children:[s.jsx("h3",{children:x.title}),s.jsx("p",{children:x.description}),x.unlocked?s.jsxs("div",{className:"achievement-unlocked",children:[s.jsx(X,{icon:To,className:"check-icon"})," Unlocked!"]}):s.jsxs("div",{className:"achievement-progress",children:[s.jsx("div",{className:"progress-bar",children:s.jsx("div",{className:"progress-fill",style:{width:`${x.progress}%`}})}),s.jsxs("span",{className:"progress-text",children:[Math.round(x.progress),"%"]})]})]})]},x.id)):s.jsxs("div",{className:"no-achievements",children:[s.jsx(X,{icon:Pt,className:"no-achievements-icon"}),s.jsx("p",{children:"No achievements yet. Complete quizzes to earn achievements!"})]})})]}),s.jsx("style",{jsx:!0,children:`
        .achievements-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .achievements-header {
          margin-bottom: 2rem;
        }
        
        .achievements-header h2 {
          color: #ffffff;
          font-size: 1.5rem;
        }
        
        .achievements-header h3 {
          color: #e0e0e0;
          font-size: 1rem;
          font-weight: normal;
          margin-top: 0.5rem;
        }
        
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .achievement-card {
          background-color: #1a1a1a;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: transform 0.2s ease;
        }
        
        .achievement-card:hover {
          transform: translateY(-5px);
        }
        
        .achievement-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.5rem;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        
        .achievement-icon.locked {
          opacity: 0.7;
          filter: grayscale(0.8);
        }
        
        .achievement-details {
          flex: 1;
        }
        
        .achievement-details h3 {
          color: #ffffff;
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
        }
        
        .achievement-details p {
          color: #e0e0e0;
          margin: 0 0 1rem 0;
          font-size: 0.9rem;
        }
        
        .achievement-unlocked {
          color: #4caf50;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .check-icon {
          font-size: 0.9rem;
        }
        
        .achievement-progress {
          margin-top: 0.5rem;
        }
        
        .progress-bar {
          width: 100%;
          height: 10px;
          background-color: #333;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 5px;
        }
        
        .progress-fill {
          height: 100%;
          background-color: #646cff;
          border-radius: 5px;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          font-size: 0.8rem;
          color: #bdc3c7;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 300px;
          color: #ecf0f1;
        }
        
        .loading-spinner {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #3498db;
        }
        
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 8px;
          color: #ecf0f1;
        }
        
        .error-icon {
          color: #e74c3c;
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .retry-btn {
          margin-top: 1rem;
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .retry-btn:hover {
          background-color: #2980b9;
        }
        
        .no-achievements {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background-color: #1a1a1a;
          border-radius: 14px;
          text-align: center;
        }
        
        .no-achievements-icon {
          font-size: 3rem;
          color: #95a5a6;
          margin-bottom: 1rem;
        }
        
        .no-achievements p {
          color: #e0e0e0;
          font-size: 1.1rem;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .achievements-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .achievements-container {
            padding: 1rem;
          }
          
          .achievement-card {
            padding: 1rem;
          }
        }
      `})]})},bw=()=>{const r=Lr();sessionStorage.getItem("username");const[a,o]=z.useState(null),c=l=>{o(l),setTimeout(()=>{r("/quiz/questions",{state:{difficulty:l}})},500)};return s.jsxs("div",{className:"quiz-page-container",children:[s.jsxs("div",{className:"quiz-content",children:[s.jsx("div",{className:"quiz-header",children:s.jsxs("div",{className:"intro-section",children:[s.jsx(X,{icon:v4,className:"intro-icon"}),s.jsx("p",{className:"intro-text",children:"Test your skills on social-engineering threats by taking one of these quizzes"})]})}),s.jsxs("div",{className:"quiz-options",children:[s.jsxs("div",{className:`quiz-option ${a==="Beginner"?"selected":""}`,onClick:()=>c("Beginner"),children:[s.jsxs("div",{className:"quiz-option-content",children:[s.jsxs("div",{className:"quiz-option-title",children:[s.jsx("div",{className:"quiz-icon-wrapper beginner",children:s.jsx(X,{icon:C4,className:"quiz-icon"})}),s.jsx("h3",{children:"Beginner"})]}),s.jsx("p",{className:"quiz-description",children:"This quiz will cover phishing concepts and fundamentals to protect yourself against the biggest threat to our online safety!"})]}),s.jsx("div",{className:"quiz-arrow",children:s.jsx(X,{icon:vs})})]}),s.jsxs("div",{className:`quiz-option ${a==="Intermediate"?"selected":""}`,onClick:()=>c("Intermediate"),children:[s.jsxs("div",{className:"quiz-option-content",children:[s.jsxs("div",{className:"quiz-option-title",children:[s.jsx("div",{className:"quiz-icon-wrapper intermediate",children:s.jsx(X,{icon:_s,className:"quiz-icon"})}),s.jsx("h3",{children:"Intermediate"})]}),s.jsx("p",{className:"quiz-description",children:"This quiz will cover more advanced techniques used by Social Engineers. You will also be shown real-world exemplar scenarios where these attacks may come into place."})]}),s.jsx("div",{className:"quiz-arrow",children:s.jsx(X,{icon:vs})})]}),s.jsxs("div",{className:`quiz-option ${a==="Advanced"?"selected":""}`,onClick:()=>c("Advanced"),children:[s.jsxs("div",{className:"quiz-option-content",children:[s.jsxs("div",{className:"quiz-option-title",children:[s.jsx("div",{className:"quiz-icon-wrapper advanced",children:s.jsx(X,{icon:A4,className:"quiz-icon"})}),s.jsx("h3",{children:"Advanced"})]}),s.jsx("p",{className:"quiz-description",children:"In our Advanced quiz, it will combine what Beginner/Intermediate levels included, but with added Corporate examples and even more complex threats."})]}),s.jsx("div",{className:"quiz-arrow",children:s.jsx(X,{icon:vs})})]})]})]}),s.jsxs("div",{className:"bottom-section",children:[s.jsx("p",{className:"not-ready-text",children:"Not ready for a quiz? Try these instead:"}),s.jsxs("div",{className:"alternative-buttons",children:[s.jsxs("button",{className:"alt-button dashboard",onClick:()=>r("/dashboard"),children:[s.jsx(X,{icon:Yg}),"Return to Dashboard"]}),s.jsxs("button",{className:"alt-button achievements",onClick:()=>r("/achievements"),children:[s.jsx(X,{icon:Pt}),"View Your Achievements"]}),s.jsxs("button",{className:"alt-button statistics",onClick:()=>r("/statistics"),children:[s.jsx(X,{icon:Ss}),"Check Your Statistics"]})]})]}),s.jsx("style",{jsx:!0,children:`
        /* Page container with vertically centered content */
        .quiz-page-container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          overflow-x: hidden;
          max-width: 100vw;
          box-sizing: border-box;
          padding: 0;
          position: relative;
        }
        
        /* Main content area with vertical centering */
        .quiz-content {
          width: 100%;
          max-width: 700px;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          /* This flex-grow and margin combination ensures vertical centering */
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        /* Header section with white text */
        .quiz-header {
          margin-bottom: 30px;
          text-align: center;
          width: 100%;
        }
        
        /* Intro section styling */
        .intro-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .intro-icon {
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 10px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        
        .intro-text {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 500;
          margin: 0 0 5px 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          line-height: 1.4;
        }
        
        .quiz-header h2 {
          color: #ffffff;
          font-size: 1.6rem;
          font-weight: 600;
          margin-top: 5px;
          margin-bottom: 10px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        /* Quiz options container with spacing */
        .quiz-options {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        /* Individual quiz option card */
        .quiz-option {
          background-color: rgba(26, 26, 26, 0.95);
          border-radius: 16px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          width: 100%;
          box-sizing: border-box;
        }
        
        .quiz-option:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
        }
        
        .quiz-option.selected {
          border-color: #646cff;
          background-color: rgba(26, 26, 26, 0.97);
          box-shadow: 0 6px 12px rgba(100, 108, 255, 0.4);
        }
        
        .quiz-option-content {
          flex: 1;
          min-width: 0; /* Prevents flex items from overflowing */
        }
        
        /* Quiz option title with icon */
        .quiz-option-title {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .quiz-option-title h3 {
          font-size: 1.2rem;
          margin: 0;
          color: #ffffff;
          font-weight: 600;
        }
        
        /* Icon wrapper with circular background */
        .quiz-icon-wrapper {
          min-width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }
        
        .quiz-icon-wrapper.beginner {
          background-color: rgba(52, 152, 219, 0.2);
          color: #3498db;
        }
        
        .quiz-icon-wrapper.intermediate {
          background-color: rgba(46, 204, 113, 0.2);
          color: #2ecc71;
        }
        
        .quiz-icon-wrapper.advanced {
          background-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
        }
        
        .quiz-icon {
          font-size: 1.2rem;
        }
        
        /* Quiz description with text wrapping */
        .quiz-description {
          color: #e0e0e0;
          font-size: 0.9rem;
          line-height: 1.4;
          margin: 0;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
        }
        
        /* Arrow indicator */
        .quiz-arrow {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #646cff;
          font-size: 1.1rem;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        
        .quiz-option:hover .quiz-arrow {
          transform: translateX(5px);
        }
        
        /* Bottom section with alternative options - fixed at bottom */
        .bottom-section {
          width: 100%;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
          margin-top: auto;
        }
        
        /* More visible "Not ready" text */
        .not-ready-text {
          color: #ffffff;
          margin-bottom: 15px;
          font-size: 1.1rem;
          font-weight: 500;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .alternative-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        /* Stylish alternative buttons */
        .alt-button {
          background-color: rgba(44, 62, 80, 0.8);
          color: #ecf0f1;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          min-width: 0;
          flex-shrink: 1;
        }
        
        .alt-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .alt-button.dashboard:hover {
          background-color: #34495e;
        }
        
        .alt-button.achievements:hover {
          background-color: #f39c12;
        }
        
        .alt-button.statistics:hover {
          background-color: #3498db;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .quiz-option {
            padding: 12px 15px;
          }
          
          .alternative-buttons {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          
          .alt-button {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
          
          .quiz-header h2 {
            font-size: 1.4rem;
          }
          
          .intro-text {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 480px) {
          .quiz-content {
            padding: 0 15px;
          }
          
          .quiz-header h2 {
            font-size: 1.2rem;
          }
          
          .intro-text {
            font-size: 1rem;
          }
          
          .intro-icon {
            font-size: 1.8rem;
          }
          
          .quiz-option-title h3 {
            font-size: 1.1rem;
          }
          
          .quiz-icon-wrapper {
            width: 30px;
            height: 30px;
            margin-right: 8px;
          }
          
          .quiz-description {
            font-size: 0.85rem;
          }
          
          .bottom-section {
            padding: 15px 10px;
          }
          
          .not-ready-text {
            font-size: 1rem;
            margin-bottom: 10px;
          }
          
          .alt-button {
            padding: 10px 12px;
            font-size: 0.9rem;
          }
        }
      `})]})},yw=()=>{var r;const a=At(),o=Lr(),[c,l]=z.useState(0),[u,d]=z.useState([]),[p,m]=z.useState(null),[v,x]=z.useState(jo.QUESTION_TIME),[g,y]=z.useState(null),E=((r=a.state)==null?void 0:r.difficulty)||"Beginner",A=jo.QUIZ_IDS[E]||1,N=jo.MOCK_QUIZ_DATA[E]||[];z.useEffect(()=>{if(v>0&&!g){const q=setTimeout(()=>{x(Z=>Z-1)},1e3);return()=>clearTimeout(q)}else v===0&&!g&&S()},[v,g]),z.useEffect(()=>{x(jo.QUESTION_TIME),m(null),y(null)},[c]);const w=q=>{g||m(q)},S=()=>{if(g)return;const q=N[c];if(p===null){const Y=[...u];Y[c]={question:q.question,selectedOption:"No answer selected",correctOption:q.options[q.correctAnswer],isCorrect:!1},d(Y),y("incorrect"),we.error("Time's up! Moving to next question...");return}const Z=p===q.correctAnswer,H=[...u];H[c]={question:q.question,selectedOption:q.options[p],correctOption:q.options[q.correctAnswer],isCorrect:Z},d(H),y(Z?"correct":"incorrect"),Z?we.success("Correct answer!"):we.error("Incorrect answer!")},k=()=>{c<N.length-1?l(c+1):C()},C=()=>{const q=u.filter(Z=>Z.isCorrect).length;o("/quiz/results",{state:{score:q,totalQuestions:N.length,userAnswers:u,difficulty:E,quizId:A}})},$=()=>{window.confirm("Are you sure you want to exit the quiz? Your progress will be lost.")&&o("/quiz/difficulty")},I=N[c];return I?s.jsxs("div",{className:"quiz-container",children:[s.jsxs("div",{className:"quiz-header",children:[s.jsxs("h1",{children:[E," Quiz"]}),s.jsx("div",{className:"timer-container",children:s.jsxs("span",{className:`timer ${v<10?"timer-low":""}`,children:["Time: ",v,"s"]})})]}),s.jsxs("div",{className:"progress-container",children:[s.jsx("div",{className:"progress-bar-background",children:s.jsx("div",{className:"progress-bar-fill",style:{width:`${(c+1)/N.length*100}%`}})}),s.jsxs("div",{className:"progress-text",children:["Question ",c+1," of ",N.length]})]}),s.jsxs("div",{className:"question-card",children:[s.jsx("h2",{className:"question-text",children:I.question}),s.jsx("div",{className:"options-container",children:I.options.map((q,Z)=>s.jsx("div",{className:`option ${p===Z?"selected":""} 
                ${g&&Z===I.correctAnswer?"correct":""}
                ${g==="incorrect"&&p===Z?"incorrect":""}`,onClick:()=>w(Z),children:q},Z))}),g&&s.jsx("div",{className:"explanation-box",children:s.jsx("p",{children:I.explanation})})]}),s.jsxs("div",{className:"quiz-actions",children:[s.jsx("button",{className:"exit-btn",onClick:$,children:"Exit Quiz"}),g?s.jsx("button",{className:"next-btn",onClick:k,children:c<N.length-1?"Next Question":"Finish Quiz"}):s.jsx("button",{className:"next-btn",onClick:S,disabled:p===null,children:"Submit Answer"})]}),s.jsx("style",{jsx:!0,children:`
        .quiz-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #1a1a1a;
          border-radius: 16px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        
        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .quiz-header h1 {
          color: #ffffff;
          font-size: 1.8rem;
          margin: 0;
        }
        
        .timer-container {
          background-color: #2c3e50;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }
        
        .timer {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: bold;
        }
        
        .timer-low {
          color: #e74c3c;
        }
        
        .progress-container {
          margin-bottom: 1.5rem;
        }
        
        .progress-bar-background {
          width: 100%;
          height: 8px;
          background-color: #34495e;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .progress-bar-fill {
          height: 100%;
          background-color: #2ecc71;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          text-align: right;
          color: #bdc3c7;
          font-size: 0.9rem;
        }
        
        .question-card {
          background-color: #242424;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .question-text {
          color: #ffffff;
          font-size: 1.4rem;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }
        
        .options-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .option {
          padding: 1rem;
          background-color: #2c3e50;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          color: #ffffff;
        }
        
        .option:hover {
          background-color: #34495e;
        }
        
        .option.selected {
          border-color: #3498db;
          background-color: rgba(52, 152, 219, 0.2);
        }
        
        .option.correct {
          border-color: #2ecc71;
          background-color: rgba(46, 204, 113, 0.2);
        }
        
        .option.incorrect {
          border-color: #e74c3c;
          background-color: rgba(231, 76, 60, 0.2);
        }
        
        .explanation-box {
          margin-top: 1.5rem;
          padding: 1rem;
          background-color: #34495e;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }
        
        .explanation-box p {
          color: #ecf0f1;
          margin: 0;
          line-height: 1.5;
        }
        
        .quiz-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .exit-btn {
          background-color: #7f8c8d;
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }
        
        .exit-btn:hover {
          background-color: #95a5a6;
        }
        
        .next-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
        }
        
        .next-btn:hover {
          background-color: #2980b9;
        }
        
        .next-btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
      `})]}):s.jsx("div",{children:"Loading questions..."})},ww=()=>{const r=At(),a=Lr(),[o,c]=z.useState([]),[l,u]=z.useState(!1),[d,p]=z.useState([]),[m,v]=z.useState(null),[x,g]=z.useState(!1),[y,E]=z.useState(!1),[A,N]=z.useState(!1),w=z.useRef(!1),{score:S,totalQuestions:k,userAnswers:C,difficulty:$,quizId:I}=r.state||{score:0,totalQuestions:0,userAnswers:[],difficulty:"Beginner",quizId:1},q=sessionStorage.getItem("userId")||"1";sessionStorage.getItem("username");const Z=k>0?Math.round(S/k*100):0,H=Z>=jo.PASS_THRESHOLD;z.useEffect(()=>{(async()=>{if(w.current){console.log("Submission already attempted, skipping duplicate attempt");return}if(w.current=!0,!x)try{g(!0);const J=`${q}-${I}-${Date.now()}-${Math.random().toString(36).substring(2,10)}`,fe={userId:q,quizId:I,score:Z,totalQuestions:k,correctAnswers:S,completionDetails:C.map((W,F)=>({questionIndex:F,question:W.question,userAnswer:W.selectedOption,correctAnswer:W.correctOption,isCorrect:W.isCorrect})),submissionId:J};console.log(`Submitting quiz completion with ID: ${J}`);const G=await fetch(fn.COMPLETE_QUIZ,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fe)}),ae=await G.json();if(!G.ok)throw new Error(ae.error||"Failed to submit quiz score");console.log("Quiz score submitted successfully:",ae),we.success("Your quiz results have been recorded!",{position:"top-center",autoClose:3e3}),E(!0)}catch(J){console.error("Error submitting quiz score:",J),we.error("Unable to save quiz results, but you can still view your performance.",{position:"top-center",autoClose:4e3}),E(!0)}finally{g(!1)}})()},[]),z.useEffect(()=>{(async()=>{if(y)try{u(!0);const J=await fetch(fn.GET_USER_ACHIEVEMENTS.replace(":userId",q));if(!J.ok)throw new Error("Failed to fetch achievements");const fe=await J.json();fe.success&&fe.achievements&&c(fe.achievements)}catch(J){console.error("Error fetching achievements:",J)}finally{u(!1)}})()},[q,y]);const Y=()=>Z>=90?"Excellent! You're a security expert!":Z>=80?"Great job! You have strong security awareness.":Z>=70?"Good work! You've passed the quiz.":Z>=60?"Not bad, but there's room for improvement.":"You need more practice to improve your security awareness.",R=()=>a("/dashboard"),te=()=>a("/quiz/difficulty"),pe=()=>a(-1);return s.jsxs("div",{className:"results-container",children:[s.jsxs("div",{className:"results-header",children:[s.jsxs("h2",{children:[$," Quiz Results"]}),s.jsxs("div",{className:"score-summary",children:[s.jsx("div",{className:"score-circle",style:{background:`conic-gradient(
              ${H?"#2ecc71":"#e74c3c"} ${Z*3.6}deg,
              #2c3e50 0deg
            )`},children:s.jsx("div",{className:"score-circle-inner",children:s.jsxs("span",{className:"score-percentage",children:[Z,"%"]})})}),s.jsxs("div",{className:"score-details",children:[s.jsxs("p",{className:"score-text",children:["You scored ",s.jsx("span",{className:"score-value",children:S})," out of ",s.jsx("span",{className:"total-value",children:k})]}),s.jsx("p",{className:`status-text ${H?"passed":"failed"}`,children:H?"PASSED":"FAILED"}),s.jsx("p",{className:"performance-message",children:Y()}),s.jsx("p",{className:"submission-status",children:x?s.jsxs("span",{className:"submitting",children:[s.jsx(X,{icon:Ca,spin:!0,className:"spinner-icon"})," Recording results..."]}):y?s.jsxs("span",{className:"submitted",children:[s.jsx(X,{icon:To,className:"check-icon"})," Results saved"]}):s.jsxs("span",{className:"not-submitted",children:[s.jsx(X,{icon:Zo,className:"warning-icon"})," Unable to save results"]})})]})]})]}),l&&s.jsxs("div",{className:"loading-section",children:[s.jsx(X,{icon:Ca,spin:!0}),s.jsx("span",{children:"Loading achievements..."})]}),H&&s.jsx("div",{className:"streak-update-section",children:s.jsxs("div",{className:"streak-badge",children:[s.jsx(X,{icon:qd,className:"streak-icon"}),s.jsx("span",{children:"Quiz streak increased!"})]})}),s.jsxs("div",{className:"results-content",children:[s.jsx("h3",{className:"section-title",children:"Question Review"}),s.jsx("div",{className:"questions-review",children:C.map((J,fe)=>s.jsxs("div",{className:`question-item ${J.isCorrect?"correct":"incorrect"}`,children:[s.jsxs("div",{className:"question-header",children:[s.jsxs("span",{className:"question-number",children:["Question ",fe+1]}),s.jsx("span",{className:`question-result ${J.isCorrect?"correct":"incorrect"}`,children:J.isCorrect?s.jsxs(s.Fragment,{children:[s.jsx(X,{icon:To})," Correct"]}):s.jsxs(s.Fragment,{children:[s.jsx(X,{icon:E4})," Incorrect"]})})]}),s.jsxs("div",{className:"question-content",children:[s.jsx("p",{className:"question-text",children:J.question}),s.jsxs("div",{className:"answers",children:[s.jsxs("div",{className:"answer",children:[s.jsx("span",{className:"answer-label",children:"Your answer:"}),s.jsx("span",{className:`answer-text ${J.isCorrect?"correct":"incorrect"}`,children:J.selectedOption})]}),!J.isCorrect&&s.jsxs("div",{className:"answer",children:[s.jsx("span",{className:"answer-label",children:"Correct answer:"}),s.jsx("span",{className:"answer-text correct",children:J.correctOption})]})]})]})]},fe))})]}),s.jsxs("div",{className:"results-actions",children:[s.jsxs("button",{className:"action-btn back-btn",onClick:pe,children:[s.jsx(X,{icon:Yg})," Back"]}),s.jsxs("button",{className:"action-btn retry-btn",onClick:te,children:[s.jsx(X,{icon:y4})," Try Another Quiz"]}),s.jsxs("button",{className:"action-btn home-btn",onClick:R,children:[s.jsx(X,{icon:N4})," Dashboard"]})]}),s.jsx("style",{jsx:!0,children:`
        .results-container {
          max-width: 800px;
          margin: 2rem auto;
          background-color: #1a1a1a;
          border-radius: 14px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        
        .score-summary {
          display: flex;
          align-items: center;
          margin-top: 2rem;
          gap: 2rem;
        }
        
        .score-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .score-circle-inner {
          width: 120px;
          height: 120px;
          background: #1a1a1a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .score-percentage {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .score-details {
          flex: 1;
        }
        
        .score-text {
          font-size: 1.2rem;
          color: #e0e0e0;
          margin-bottom: 0.5rem;
        }
        
        .score-value, .total-value {
          font-weight: bold;
          color: #3498db;
        }
        
        .status-text {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .status-text.passed {
          color: #2ecc71;
        }
        
        .status-text.failed {
          color: #e74c3c;
        }
        
        .performance-message {
          color: #e0e0e0;
          font-style: italic;
          margin-bottom: 0.5rem;
        }
        
        .submission-status {
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        
        .submitting {
          color: #f39c12;
        }
        
        .submitted {
          color: #2ecc71;
        }
        
        .not-submitted {
          color: #e74c3c;
        }
        
        .spinner-icon, .check-icon, .warning-icon, .info-icon {
          margin-right: 5px;
        }
        
        .loading-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          color: #3498db;
          font-style: italic;
        }
        
        .streak-update-section {
          background-color: rgba(231, 76, 60, 0.1);
          border-radius: 8px;
          padding: 0.75rem;
          margin: 1rem 0;
          display: flex;
          justify-content: center;
        }
        
        .streak-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #e74c3c;
          font-weight: bold;
        }
        
        .results-content {
          margin-top: 2rem;
        }
        
        .section-title {
          color: #ffffff;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #2c3e50;
          padding-bottom: 0.5rem;
        }
        
        .questions-review {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .question-item {
          background-color: #2c3e50;
          border-radius: 8px;
          padding: 1rem;
          border-left: 4px solid;
        }
        
        .question-item.correct {
          border-left-color: #2ecc71;
        }
        
        .question-item.incorrect {
          border-left-color: #e74c3c;
        }
        
        .question-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #34495e;
        }
        
        .question-number {
          font-weight: bold;
          color: #bdc3c7;
        }
        
        .question-result {
          font-weight: bold;
        }
        
        .question-result.correct {
          color: #2ecc71;
        }
        
        .question-result.incorrect {
          color: #e74c3c;
        }
        
        .question-content {
          color: #ecf0f1;
        }
        
        .question-text {
          margin-bottom: 1rem;
        }
        
        .answers {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .answer {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .answer-label {
          font-size: 0.9rem;
          color: #bdc3c7;
        }
        
        .answer-text {
          background-color: #34495e;
          padding: 0.5rem;
          border-radius: 4px;
        }
        
        .answer-text.correct {
          background-color: rgba(46, 204, 113, 0.2);
          border: 1px solid #2ecc71;
        }
        
        .answer-text.incorrect {
          background-color: rgba(231, 76, 60, 0.2);
          border: 1px solid #e74c3c;
        }
        
        .results-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }
        
        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
        }
        
        .back-btn {
          background-color: #7f8c8d;
          color: white;
        }
        
        .back-btn:hover {
          background-color: #95a5a6;
        }
        
        .retry-btn {
          background-color: #e67e22;
          color: white;
        }
        
        .retry-btn:hover {
          background-color: #d35400;
        }
        
        .home-btn {
          background-color: #3498db;
          color: white;
        }
        
        .home-btn:hover {
          background-color: #2980b9;
        }
        
        @media (max-width: 768px) {
          .score-summary {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
          
          .results-actions {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .action-btn {
            flex: 1;
            justify-content: center;
            min-width: 100px;
          }
        }
      `})]})},kw=()=>{const r=At().pathname.includes("/results");return s.jsxs("div",{className:`quiz-route-container ${r?"results-mode":""}`,children:[s.jsxs(Xh,{children:[s.jsx(gt,{path:"/",element:s.jsx(_r,{to:"difficulty",replace:!0})}),s.jsx(gt,{path:"difficulty",element:s.jsx(bw,{})}),s.jsx(gt,{path:"questions",element:s.jsx(yw,{})}),s.jsx(gt,{path:"results",element:s.jsx(ww,{})})]}),s.jsx("style",{jsx:!0,children:`
        .quiz-route-container {
          width: 100%;
          min-height: 100vh;
        }
        
        /* In results mode, ensure content is visible and properly positioned */
        .quiz-route-container.results-mode {
          position: relative;
          z-index: 10;
          margin-left: 0;
          width: 100%;
        }
      `})]})};function Nw(){const r=At(),[a,o]=z.useState(!0),c=i0.includes(r.pathname.toLowerCase()),l=!i0.includes(r.pathname.toLowerCase())&&!Bb.includes(r.pathname.toLowerCase()),[u,d]=z.useState(sessionStorage.getItem("isAuthenticated")==="true"),p=r.pathname.includes("/quiz");r.pathname.includes("/quiz/results");const m=p;return z.useEffect(()=>{(async()=>{if(sessionStorage.getItem("just_logged_out")==="true"){sessionStorage.removeItem("just_logged_out"),o(!1);return}const v=r.pathname.toLowerCase()===Ee.LOGIN.toLowerCase();if(localStorage.getItem("rememberedUser")&&!u&&v){o(!1);return}o(!1)})()},[r.pathname,u]),a?s.jsx("div",{className:"loading-container",children:"Loading..."}):!c&&!u&&!l?s.jsx(Uh,{}):s.jsxs(s.Fragment,{children:[!c&&!l&&!m&&s.jsx(fw,{}),s.jsxs(Xh,{children:[s.jsx(gt,{path:Ee.HOME,element:s.jsx(_r,{to:u?Ee.DASHBOARD:Ee.LOGIN,replace:!0})}),s.jsx(gt,{path:Ee.LOGIN,element:u?s.jsx(_r,{to:Ee.DASHBOARD,replace:!0}):s.jsx(P4,{})}),s.jsx(gt,{path:Ee.REGISTER,element:u?s.jsx(_r,{to:Ee.DASHBOARD,replace:!0}):s.jsx(dw,{})}),s.jsx(gt,{path:Ee.FORGOT_PASSWORD,element:s.jsx(pw,{})}),s.jsx(gt,{path:Ee.RESET_PASSWORD,element:s.jsx(mw,{})}),s.jsx(gt,{path:Ee.DASHBOARD,element:u?s.jsx(hw,{}):s.jsx(_r,{to:Ee.LOGIN,replace:!0})}),s.jsx(gt,{path:Ee.QUIZ+"/*",element:u?s.jsx(kw,{}):s.jsx(_r,{to:Ee.LOGIN,replace:!0})}),s.jsx(gt,{path:Ee.ACHIEVEMENTS,element:u?s.jsx(xw,{}):s.jsx(_r,{to:Ee.LOGIN,replace:!0})}),s.jsx(gt,{path:Ee.LEADERBOARD,element:u?s.jsx(vw,{}):s.jsx(_r,{to:Ee.LOGIN,replace:!0})}),s.jsx(gt,{path:Ee.STATISTICS,element:u?s.jsx(gw,{}):s.jsx(_r,{to:Ee.LOGIN,replace:!0})}),s.jsx(gt,{path:"*",element:s.jsx(Uh,{})})]}),s.jsx(Ub,{position:"top-center",autoClose:2e3}),s.jsx("style",{jsx:!0,children:`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #242424;
          color: white;
          font-size: 1.5rem;
        }
        
        /* Ensure content is properly positioned when navbar is hidden */
        .content-wrapper-full {
          margin-left: 0;
          width: 100%;
        }
      `})]})}lx.createRoot(document.getElementById("root")).render(s.jsx(z.StrictMode,{children:s.jsx(wb,{children:s.jsx(Nw,{})})}));
