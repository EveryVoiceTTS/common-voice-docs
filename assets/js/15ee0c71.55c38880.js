"use strict";(self.webpackChunkcommon_voice_docs=self.webpackChunkcommon_voice_docs||[]).push([[435],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),u=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(i.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,c=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=u(n),f=o,m=d["".concat(i,".").concat(f)]||d[f]||s[f]||c;return n?r.createElement(m,l(l({ref:t},p),{},{components:n})):r.createElement(m,l({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=n.length,l=new Array(c);l[0]=d;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:o,l[1]=a;for(var u=2;u<c;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8744:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return i},default:function(){return f},frontMatter:function(){return a},metadata:function(){return u},toc:function(){return s}});var r=n(7462),o=n(3366),c=(n(7294),n(3905)),l=["components"],a={},i="NextCloud",u={unversionedId:"nextcloud",id:"nextcloud",title:"NextCloud",description:"WEBDAV WITH CURL",source:"@site/docs/nextcloud.md",sourceDirName:".",slug:"/nextcloud",permalink:"/common-voice-docs/docs/nextcloud",editUrl:"https://github.com/joanise/common-voice-docs/tree/main/docs/nextcloud.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Task a New Image to Perform NRC Related Tasks",permalink:"/common-voice-docs/docs/microservice"},next:{title:"Notes",permalink:"/common-voice-docs/docs/note"}},p={},s=[{value:"NextCloud@NRC",id:"nextcloudnrc",level:2}],d={toc:s};function f(e){var t=e.components,n=(0,o.Z)(e,l);return(0,c.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"nextcloud"},"NextCloud"),(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://code.blogs.iiidefix.net/posts/webdav-with-curl/"},"WEBDAV WITH CURL")),(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://stackoverflow.com/a/26676902"},"list files/folders in owncloud with php curl")),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre"},'curl -X PROPFIND -u user:password "http://yourserver.com/owncloud/remote.php/webdav/"\n')),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"PROPFIND = get the list of files/folders"),(0,c.kt)("li",{parentName:"ul"},"MKCOL = create folder"),(0,c.kt)("li",{parentName:"ul"},"DELETE = delete file/folder"),(0,c.kt)("li",{parentName:"ul"},"MOVE = move or rename a file or folder"),(0,c.kt)("li",{parentName:"ul"},"PUT = upload file"),(0,c.kt)("li",{parentName:"ul"},"GET = download file")),(0,c.kt)("p",null,"webdav.list_files"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre"},'<?xml version="1.0"?>\n<a:propfind xmlns:a="DAV:">\n<a:prop><a:resourcetype/></a:prop>\n</a:propfind>\n')),(0,c.kt)("p",null,"Note that the order of the following command is crutial, or so it seems."),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-bash"},'curl \\\n  -u LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL:PPPPP-PPPPP-PPPPP-PPPPP-PPPPP \\\n  -i \\\n  -X PROPFIND \\\n  https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL/CommonVoice/ \\\n  --upload-file - \\\n  -H "Depth: 1" \\\n  < webdav.list_files\n')),(0,c.kt)("h2",{id:"nextcloudnrc"},"NextCloud@NRC"),(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"https://nextcloud.nrc-cnrc.gc.ca"},"https://nextcloud.nrc-cnrc.gc.ca"),"\nIt uses your MS Teams password.\nIf your are looking for a guide: ",(0,c.kt)("a",{parentName:"p",href:"https://nextcloud.nrc-cnrc.gc.ca/f/42866"},"NextCloud NRC User Guide Advance")))}f.isMDXComponent=!0}}]);