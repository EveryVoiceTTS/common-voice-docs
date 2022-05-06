"use strict";(self.webpackChunkcommon_voice_docs=self.webpackChunkcommon_voice_docs||[]).push([[688],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=l(n),m=o,f=d["".concat(s,".").concat(m)]||d[m]||p[m]||a;return n?r.createElement(f,c(c({ref:t},u),{},{components:n})):r.createElement(f,c({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,c=new Array(a);c[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,c[1]=i;for(var l=2;l<a;l++)c[l]=n[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},766:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return i},metadata:function(){return l},toc:function(){return p}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),c=["components"],i={},s="Amazon",l={unversionedId:"amazon",id:"amazon",title:"Amazon",description:"EC2",source:"@site/docs/amazon.md",sourceDirName:".",slug:"/amazon",permalink:"/common-voice-docs/docs/amazon",editUrl:"https://github.com/joanise/common-voice-docs/tree/main/docs/amazon.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Introduction to NRC's Common Voice project and fork",permalink:"/common-voice-docs/docs/intro"},next:{title:"Changing the Audio Format",permalink:"/common-voice-docs/docs/audio"}},u={},p=[{value:"EC2",id:"ec2",level:2},{value:"Docker",id:"docker",level:3},{value:"AWS CLI",id:"aws-cli",level:3},{value:"Config",id:"config",level:4},{value:"Misc Commands",id:"misc-commands",level:4},{value:"Running a Docker Image on EC2",id:"running-a-docker-image-on-ec2",level:3}],d={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,c);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"amazon"},"Amazon"),(0,a.kt)("h2",{id:"ec2"},"EC2"),(0,a.kt)("h3",{id:"docker"},"Docker"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.cloudbooklet.com/how-to-install-docker-on-ubuntu-22-04/"},"How to Install Docker on Ubuntu 22.04")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'sudo apt update\nsudo apt upgrade\nsudo apt install apt-transport-https ca-certificates curl software-properties-common\ncurl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg\necho "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null\nsudo apt update\nsudo apt-cache policy docker-ce\nsudo apt install docker-ce\nsudo systemctl status docker\nsudo usermod -aG docker ubuntu\n')),(0,a.kt)("h3",{id:"aws-cli"},"AWS CLI"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"},"Installing or updating the latest version of the AWS CLI")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'sudo apt install unzip\ncurl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"\nunzip awscliv2.zip\nsudo ./aws/install\n')),(0,a.kt)("h4",{id:"config"},"Config"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html"},"Configuration and credential file settings"),"\n",(0,a.kt)("inlineCode",{parentName:"p"},"~/.aws/credentials")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"[default]\naws_access_key_id=AKIAIOSFODNN7EXAMPLE\naws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"~/.aws/config")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"[default]\nregion=us-west-2\noutput=json\n")),(0,a.kt)("h4",{id:"misc-commands"},"Misc Commands"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"aws s3 ls\n")),(0,a.kt)("h3",{id:"running-a-docker-image-on-ec2"},"Running a Docker Image on EC2"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html"},"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html")))}m.isMDXComponent=!0}}]);