/*匀速动画的封装函数
 obj：表示做动画的对象
 target:目标值
 speed:速度
 */
function constant(obj,target,speed) {
    clearInterval(obj.timer)
    //向左或者向右走
    var dis = target > obj.offsetLeft? speed:-speed;
    if(target == obj.offsetLeft){
        dis = 0;
    }
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft+dis+'px';
        //当target为小数或者无法被步长除进
        if(Math.abs(target-obj.offsetLeft)<speed){
            clearInterval(obj.timer);
            obj.style.left =target+'px';
        }

    },20)
}

