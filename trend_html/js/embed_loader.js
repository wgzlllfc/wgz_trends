var e,g="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){a!=Array.prototype&&a!=Object.prototype&&(a[c]=b.value)},
    h="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,k=function(){k=function(){};h.Symbol||(h.Symbol=n)},n=function(){var a=0;return function(c){return"jscomp_symbol_"+(c||"")+a++}}(),q=function(){k();var a=h.Symbol.iterator;a||(a=h.Symbol.iterator=h.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&
g(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return p(this)}});q=function(){}},p=function(a){var c=0;return r(function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}})},r=function(a){q();a={next:a};a[h.Symbol.iterator]=function(){return this};return a},t=function(a,c){q();a instanceof String&&(a+="");var b=0,d={next:function(){if(b<a.length){var f=b++;return{value:c(f,a[f]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};
    return d},u=function(a,c){if(c){var b=h;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];f in b||(b[f]={});b=b[f]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&g(b,a,{configurable:!0,writable:!0,value:c})}};u("Array.prototype.values",function(a){return a?a:function(){return t(this,function(a,b){return b})}},"es8","es3");
var v=function(a,c,b){if(null==a)throw new TypeError("The 'this' value for String.prototype."+b+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+b+" must not be a regular expression");return a+""};u("String.prototype.repeat",function(a){return a?a:function(a){var b=v(this,null,"repeat");if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var c="";a;)if(a&1&&(c+=b),a>>>=1)b+=b;return c}},"es6","es3");
u("String.prototype.padStart",function(a){return a?a:function(a,b){var c=v(this,null,"padStart");a-=c.length;b=void 0!==b?String(b):" ";return(0<a&&b?b.repeat(Math.ceil(a/b.length)).substring(0,a):"")+c}},"es8","es3");var w=this,z=function(a,c,b){a=a.split(".");b=b||w;a[0]in b||!b.execScript||b.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===c?b=b[d]&&b[d]!==Object.prototype[d]?b[d]:b[d]={}:b[d]=c};var A=function(a,c){this.lodash_=a;this.timeout_=c};z("$jscomp.scope.ClipboardService",A,void 0);A.$inject=["lodash","$timeout"];A.prototype.copyWidgetData=function(a){a=a||[];this.copyToClipboard_(this.parseWidgetData_(a))};A.prototype.parseWidgetData_=function(a){var c=a[1].values,b=[];b.push(a[0].value);c.forEach(function(a,c){return b.push(c+1+") "+a)});return b};
A.prototype.copyToClipboard_=function(a){var c=a.join("\r\n"),b=document.createElement("div");b.textContent=c;b.style.opacity="0";document.body.appendChild(b);var d=document.createRange();d.selectNode(b);window.getSelection().removeAllRanges();window.getSelection().addRange(d);var f=function(b){document.removeEventListener("copy",f);void 0!==b.clipboardData&&(b.clipboardData.setData("text/plain",c),b.clipboardData.setData("text/html",a.join("<br>")),b.preventDefault())};document.addEventListener("copy",
    f);document.execCommand("copy");b.remove();this.onCopyNotify_()};A.prototype.onCopyNotify_=function(){if(0===document.getElementsByClassName("copy-notification").length){var a=document.createElement("div");a.textContent=document.getElementsByClassName("translate-patch")[0].textContent;a.className="copy-notification";document.body.appendChild(a);this.timeout_(this.lodash_.bind(function(){a.remove()},a),2E3)}};var B=function(){this.oldTypeToNewTypeDictionary_={TIMESERIES_GRAPH_AVERAGES_CHART:"TIMESERIES",TIMESERIES_GRAPH_0:"TIMESERIES",GEO_TABLE:"GEO_MAP",TOP_ENTITIES:"RELATED_TOPICS",TOP_QUERIES:"RELATED_QUERIES",RISING_QUERIES:"RELATED_QUERIES",GEO_MAP:"GEO_MAP"}};z("$jscomp.scope.OldFeCompatibilityUtil",B,void 0);e=B.prototype;
e.convertDateWithHours_=function(a,c){var b=a.match(c);c=b[1];a=parseInt(b[2],10);b=b[4];var d=new Date(c);d.setHours(a);c=new Date(c);c.setHours(parseInt(a,10)+parseInt(b,10));return""+this.dateTimeStringFormat_(d)+(" "+this.dateTimeStringFormat_(c))};e.dateStringFormat_=function(a){return""+a.getFullYear()+("-"+(a.getMonth()+1).toString().padStart(2,"0"))+("-"+a.getDate().toString().padStart(2,"0"))};
e.convertDateWithMonth_=function(a,c){a=a.match(c);c=parseInt(a[1],10);var b=parseInt(a[2],10),d=new Date(b,c-1,1);b=new Date(b,c-1,1);b.setMonth(c+parseInt(a[3],10)-1,0);return""+this.dateStringFormat_(d)+(" "+this.dateStringFormat_(b))};e.dateTimeStringFormat_=function(a){return this.dateStringFormat_(a)+("T"+a.getHours().toString().padStart(2,"0"))};
e.convertOldEmbedParams=function(a){var c=this,b={};if(0===Object.keys(a).length)return null;var d;a.geo&&(d=a.geo.replace(/(\w+,?)\s?/g,"$1"));var f=a.date?a.date.split(",").map(function(a){return c.convertDateParam_(a)}).join(","):"all";a.cat&&(b.cat=a.cat.replace(/(.*-)?(\d+)$/,"$2"));b.comparisonItems={};var x=[];a.q&&a.q.split(",").forEach(function(a){x.push({keyword:a,geo:d||"",time:f})},this);var l=a.cid||"",y="",m=l.match(/(^\w*)[_](\d)[_]\d/);m&&0<m.length&&(l=m[1],0!=m[2]&&(y="_"+m[2]));
    l=this.oldTypeToNewTypeDictionary_[l]+y;b.q=a.q;b.widgetType=l;b.comparisonItems.comparisonItem=x;b.comparisonItems.category=b.cat||0;b.comparisonItems.property=a.gprop||"";return b};

e.convertDateParam_=function(a){
    if(""===a)
        return"all";
    a=a.replace(/\+/g," ");
    if(/now|today/.test(a))
        return a;
    var c=null,b=/(\d{1,2})\/(\d{4}) (\d*)M/i,d=/(\d{4}-\d{2}-\d{2})T(\d{2})([\d\\:]*) (\d+)H/i;
    b.test(a)?c=this.convertDateWithMonth_(a,b):d.test(a)&&(c=this.convertDateWithHours_(a,d));
    return c
};

var C,D=new B,
    E=function(a,c,b){
        b||(b={});
        b.guestPath||(b.guestPath="https://trends.google.com/trends/embed/");
        this.url_=a||"";
        this.params_=c||{};
        this.config_=b
    },
    F=function(a,c,b){
        return new E(a+"/"+c,{},b)
    },
    G=function(a,c,b){
        return new E("yis/"+b+"/"+(c.geo||"GLOBAL")+"/"+a,{},c)
    },
    H=function(a,c,b){
        return new E("explore/"+a,{req:c,tz:(new Date).getTimezoneOffset()},b)
    };
e=E.prototype;
e.createIframe_=function(a){
    var c=document.createElement("iframe"),b;
    for(b in a)
        c.setAttribute(b,a[b]);
    return c
};
e.createIframeCycle_=function(a,c){
    var b=this;
    this.socketHandshake_(a,c,function(c){c.data.isReady&&(a.style.borderRadius="2px",a.style.boxShadow="0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)");c.data.height&&(a.style.height=c.data.height+"px",c.data.isIeAndLineChart&&b.setMobilePreviewLineChartWidthInIe_())})
};
e.setMobilePreviewLineChartWidthInIe_=function(){
    var a=document.getElementsByTagName("embed-widget-preview")[0];0!==a.length&&"false"!==a.getAttribute("force-mobile-mode")&&(a=a.find("iframe"))&&(a=a.contentDocument.getElementsByClassName("fe-line-chart"),0!==a.length&&a[0].setAttribute("width",this.IFRAME_WIDTH_+"px"))
};
e.generate_=function(){
    if(!/^(https?:\/\/)?([a-z0-9\.]+)?(\.google\.com)?/i.test(this.config_.guestPath)&&/^[^.]+\.[a-z]{2,4}\/?/i.test(this.config_.guestPath))
        console.error("Iframe caller domain name not allowed!");else if(this.config_.width&&!/^\d{1,4}(px|%)?$/i.test(this.config_.width))console.error("Width parameter contain illegal value!");
    else{
        var a=this.config_.guestPath+this.url_,c=[],b="trends-widget-"+this.generateSeed_(),d;
        for(d in this.params_)
            Object.prototype.hasOwnProperty.call(this.params_, d)&&c.push(d+"="+encodeURIComponent(JSON.stringify(this.params_[d])));
        this.config_.timeStamp&&c.push("ts="+this.config_.timeStamp);
        void 0!==this.config_.forceMobileMode&&c.push("forceMobileMode="+!!this.config_.forceMobileMode);
        void 0!==this.config_.isPreviewMode&&c.push("isPreviewMode="+!!this.config_.isPreviewMode);
        this.config_.exploreQuery&&c.push("eq="+encodeURIComponent(this.config_.exploreQuery));this.config_.locale&&c.push("hl="+this.config_.locale.replace(/[^a-z]/ig,""));
        c.length&&(a+="?"+ c.join("&"));
        a=this.createIframe_({id:b,src:a,width:this.config_.width||"100%",frameBorder:0,scrolling:0});
        return{id:b,element:a}
    }
};
e.generateSeed_=function(){
    return C?++C:C=1
};
e.render=function(){
    var a=this.generate_();
    if(a){
        document.write(a.element.outerHTML);
        var c=document.getElementById(a.id);
        this.createIframeCycle_(c,a.id)
    }
    return c
};

e.renderTo=function(a){
    var c=this.generate_();
    if(c){
        var b=c.element;
        a.appendChild(b);
        this.createIframeCycle_(b,c.id)
    }
    return b
};
e.socketHandshake_=function(a,c,b){
    a.addEventListener("load",function(){a.contentWindow.postMessage({uniqueID:c},"*")});
    window.addEventListener("message",function(a){a.data.uniqueID===c&&b(a)},!1)
};
z("trends.embed.renderWidget",function(a,c,b){return(new F(a,c,b)).render()},void 0);
z("trends.embed.renderTopChartsWidget",function(a,c,b){return(new G(a,c,b)).render()},void 0);
z("trends.embed.renderWidgetTo",function(a,c,b,d){return(new F(c,b,d)).renderTo(a)},void 0);
z("trends.embed.renderTopChartsWidgetTo",function(a,c,b,d){return(new G(c,b,d)).renderTo(a)},void 0);
var I=function(a,c,b){
    return(new H(a,c,b)).render()
};
z("trends.embed.renderExploreWidget",I,void 0);
z("trends.embed.renderExploreWidgetTo",function(a,c,b,d){return(new H(c,b,d)).renderTo(a)},void 0);
z("trends.embed.renderExploreWidgetFromOldParamaters",function(a){a=J(a);var c=D.convertOldEmbedParams(a),b="";a.cat&&(b=a.cat.split("-"),b="&cat="+b[b.length-1]);I(c.widgetType,c.comparisonItems,{exploreQuery:"date="+c.comparisonItems.comparisonItem[0].time+"&q="+c.q+(a.geo?"&geo="+a.geo:"")+(a.gprop?"&gprop="+a.gprop:"")+b},{exploreQuery:"q="+c.q+"&date="+c.comparisonItems.comparisonItem[0].time,guestPath:"https://trends.google.com/trends/"})},void 0);
var J=function(a){var c={};a.replace(/[?&](.+?)=([^&#]*)/g,function(a,d,f){c[d]=decodeURI(f).replace(/\+/g," ")});return c};
