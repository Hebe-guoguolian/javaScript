
//options url data cbName success error timeout
function jsonp(options){
	options = options || {};
	
	if(!options.url) return;
	options.data = options.data || {};
	options.cbName = options.cbName || "cb";
	options.timeout = options.timeout || 0;
	
	var fnName = ("jsonp_" + Math.random()).replace(".","");
	
	var arr = [];
	options.data[options.cbName] = fnName;
	for(var name in options.data){
		arr.push(name + "=" + encodeURIComponent(options.data[name]));
	}
	var str = arr.join("&");
	
	//2 全局函数
	window[fnName] = function(json){
		
		options.success && options.success(json);
		window[fnName] = null;
		oHead.removeChild(oS);
		clearTimeout(timer);
	};
	
	
	//1 创建script
	var oS = document.createElement("script");
	oS.src = options.url + "?" + str;
	var oHead = document.getElementsByTagName("head")[0];
	oHead.appendChild(oS);
	
	
	if(options.timeout){
		var timer = setTimeout(function(){
			options.error && options.error();
			window[fnName] = function(){};
			oHead.removeChild(oS);
		},options.timeout);
	}
	
	
}