/*
 *  获取scrollTop和scrollLeft
 *  用法: scroll().top;  scroll().left;
 */
function scroll() {
    //ie9+和最新浏览器
    if (window.pageXOffset != null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }
    // Firefox 和 遵循w3c
    else if (document.compatMode == 'CSS1Compat') {
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
    // Chrome浏览器 和 没有声明 DTD <DOCTYPE >
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}
