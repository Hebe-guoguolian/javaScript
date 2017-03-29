/*
 *  获取clientWidth和clientHeight
 *  用法: client().top;  client().left;
 */
function client() {
    //ie9+和最新浏览器
    if(window.innerHeight){
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
        // Firefox 和 遵循w3c
    }else if(document.compatMode == 'CCS1Compat'){
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }// Chrome浏览器 和 没有声明 DTD <DOCTYPE >
    return{
        width:document.body.clientWidth,
        height:document.body.clientHeight
    }
}

