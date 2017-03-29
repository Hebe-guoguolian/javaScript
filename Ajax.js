//json转换为字符串,符合get的参数传输方式
function json2url(json){
    var arr = [];
    json.t = Math.random();
    for(var name in json){
        arr.push(name + "=" + encodeURIComponent(json[name]));
    }
    return arr.join("&");
}
/*
* url:路径;type:发送类型:get or post;
* json:发送的参数;
* fnSucc:成功后返回数据;
* fnFail:失败;
* timeout:设置超时时间
* */
function ajax(url,type,json,fnSucc,fnFail,timeout){

    var str = json2url(json);

    //1 创建
    if(window.XMLHttpRequest){
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(type == "get"){
        //2 连接
        xhr.open("get",url + "?" + str,true);
        //3 发送
        xhr.send();
    } else {
        //2 连接
        xhr.open("post",url,true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        //3 发送
        xhr.send(str);
    }

    //4 接收
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            clearTimeout(timer);
            if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                fnSucc && fnSucc(xhr.responseText);
            } else {
                fnFail && fnFail(xhr.status);
            }
        }
    };
    var timer = setTimeout(function(){
        //终止ajax请求
        //abort
        alert("超时");
        xhr.abort();

    },timeout);

}

