"use strict";(self.webpackChunkcommon_voice_docs=self.webpackChunkcommon_voice_docs||[]).push([[109],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},x=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),x=c(n),m=o,y=x["".concat(l,".").concat(m)]||x[m]||p[m]||a;return n?r.createElement(y,i(i({ref:t},u),{},{components:n})):r.createElement(y,i({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=x;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}x.displayName="MDXCreateElement"},4306:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return p}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],s={},l="Microsoft Azure",c={unversionedId:"azure",id:"azure",title:"Microsoft Azure",description:"Can we use Microsoft Azure instead of AWS S3?",source:"@site/docs/azure.md",sourceDirName:".",slug:"/azure",permalink:"/common-voice-docs/docs/azure",editUrl:"https://github.com/joanise/common-voice-docs/tree/main/docs/azure.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Auth0",permalink:"/common-voice-docs/docs/auth0"},next:{title:"Languages",permalink:"/common-voice-docs/docs/language"}},u={},p=[],x={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},x,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"microsoft-azure"},"Microsoft Azure"),(0,a.kt)("p",null,"Can we use Microsoft Azure instead of AWS S3?"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://devblogs.microsoft.com/cse/2016/05/22/access-azure-blob-storage-from-your-apps-using-s3-api/"},"Access Azure Blob Storage from Your Apps using S3 Java API")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/gaul/s3proxy"},"S3Proxy")," S3Proxy implements the S3 API and proxies requests, enabling several use cases:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"translation from S3 to Backblaze B2, EMC Atmos, Google Cloud, Microsoft Azure, and OpenStack Swift"),(0,a.kt)("li",{parentName:"ul"},"testing without Amazon by using the local filesystem"),(0,a.kt)("li",{parentName:"ul"},"extension via middlewares"),(0,a.kt)("li",{parentName:"ul"},"embedding into Java applications"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/gaul/s3proxy/wiki/Storage-backend-examples#azure-blob"},"S3Proxy - Storage backend examples Azure Blob"))),(0,a.kt)("p",null,"The common voice docker stack uses S3Proxy.\nIf we can configure S3Proxy to ingest the current S3 requests from the server and send them to Microsoft Azure, that would solve our connection problem.\nIt looks like the S3Proxy container is quite configurable with ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/gaul/s3proxy/blob/master/Dockerfile"},"environment variables"),"."),(0,a.kt)("p",null,"Here's what the S3Proxy command looks like:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"docker container exec -it s3proxy cat run-docker-container.sh\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'#!/bin/sh\n\nexec java \\\n    -DLOG_LEVEL="${LOG_LEVEL}" \\\n    -Ds3proxy.endpoint="${S3PROXY_ENDPOINT}" \\\n    -Ds3proxy.virtual-host="${S3PROXY_VIRTUALHOST}" \\\n    -Ds3proxy.authorization="${S3PROXY_AUTHORIZATION}" \\\n    -Ds3proxy.identity="${S3PROXY_IDENTITY}" \\\n    -Ds3proxy.credential="${S3PROXY_CREDENTIAL}" \\\n    -Ds3proxy.cors-allow-all="${S3PROXY_CORS_ALLOW_ALL}" \\\n    -Ds3proxy.cors-allow-origins="${S3PROXY_CORS_ALLOW_ORIGINS}" \\\n    -Ds3proxy.cors-allow-methods="${S3PROXY_CORS_ALLOW_METHODS}" \\\n    -Ds3proxy.cors-allow-headers="${S3PROXY_CORS_ALLOW_HEADERS}" \\\n    -Ds3proxy.ignore-unknown-headers="${S3PROXY_IGNORE_UNKNOWN_HEADERS}" \\\n    -Djclouds.provider="${JCLOUDS_PROVIDER}" \\\n    -Djclouds.identity="${JCLOUDS_IDENTITY}" \\\n    -Djclouds.credential="${JCLOUDS_CREDENTIAL}" \\\n    -Djclouds.endpoint="${JCLOUDS_ENDPOINT}" \\\n    -Djclouds.region="${JCLOUDS_REGION}" \\\n    -Djclouds.regions="${JCLOUDS_REGIONS}" \\\n    -Djclouds.keystone.version="${JCLOUDS_KEYSTONE_VERSION}" \\\n    -Djclouds.keystone.scope="${JCLOUDS_KEYSTONE_SCOPE}" \\\n    -Djclouds.keystone.project-domain-name="${JCLOUDS_KEYSTONE_PROJECT_DOMAIN_NAME}" \\\n    -Djclouds.filesystem.basedir="/data" \\\n    -jar /opt/s3proxy/s3proxy \\\n    --properties /dev/null\n')),(0,a.kt)("p",null,"If we start from ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/gaul/s3proxy/wiki/Storage-backend-examples#azure-blob"},"S3Proxy - Storage backend examples Azure Blob")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"s3proxy.endpoint=http://127.0.0.1:8080\ns3proxy.authorization=aws-v2-or-v4\ns3proxy.identity=local-identity\ns3proxy.credential=local-credential\njclouds.provider=azureblob\njclouds.identity=xxxxxxxxx\njclouds.credential=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n")),(0,a.kt)("p",null,"and the common voice's ",(0,a.kt)("inlineCode",{parentName:"p"},"docker-compose.yaml"),", we can probably set it up to use Microsoft Azure."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"  s3proxy:\n    environment:\n      - S3PROXY_AUTHORIZATION=none\n")),(0,a.kt)("p",null,"We need to set a minimum of environment variables."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"  s3proxy:\n    environment:\n      - S3PROXY_ENDPOINT=http://0.0.0.0:80\n      - S3PROXY_AUTHORIZATION=aws-v2-or-v4\n      - S3PROXY_IDENTITY=local-identity\n      - S3PROXY_CREDENTIAL=local-credential\n      - JCLOUDS_PROVIDER=azureblob\n      - JCLOUDS_IDENTITY=xxxxxxxx\n      - JCLOUDS_CREDENTIAL=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy\n")))}m.isMDXComponent=!0}}]);