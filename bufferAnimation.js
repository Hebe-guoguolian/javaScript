/*缓动动画的封装函数
 obj：表示做动画的对象
 json:表示属性值与属性的键值对
 fn:表示回调函数，就是等第一个函数执行完毕后再执行
 */
function buffer(obj,json,fn) {
    clearInterval(obj.timer);
    var begin =0,target=0, speed=0;
    obj.timer = setInterval(function () {
        //声明一个旗帜，让其所有的begin都到达目标值时，定时器才停
        var flag = true;
        for(var k in json){

            if('opacity' == k){
                begin = parseInt(parseFloat(getAttrivalue(obj,k))*100 ) ||100;
                target = parseInt(json[k]*100);
            }
            else if('scrollTop' == k){
                begin = obj.scrollTop;
                target = parseInt(json[k]);
            }
            else if('zIndex' == k){
                begin = obj.zIndex;
                target = json[k];
            }
            else{
                begin = parseInt(getAttrivalue(obj,k))||0;
                target = parseInt(json[k]);
            }
            //计算出步长
            speed = (target- begin)/20;
            //判断动画的方向
            speed = target>begin? Math.ceil(speed):Math.floor(speed);
            if('opacity' ==k){
                obj.style.opacity = (begin +speed)/100;
                //IE中的透明度的属性
                obj.style.filter = 'alpha(opacity:'+(begin +speed)+')';
            }
            //scrollTop是不需要加px的
            else if('scrollTop' ==k){
                obj.scrollTop = begin +speed;                    }
            else if('zIndex' ==k){
                obj.style.zIndex = target;                    }
            else {
                obj.style[k] = begin +speed +'px';
            }

            if(target != begin){
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timer);
            //判断是否有fn,如果有则调用
            if(fn){
                fn();
            }
        }
    },20)
}

