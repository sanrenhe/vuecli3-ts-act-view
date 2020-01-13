/*
 * @Description: 大转盘旋转
 * @Author: qinchunzhen
 * @Email: qinchunzhen@urthink.com
 * @Date: 2018-11-15 15:48:49
 * @LastEditTime: 2019-08-22 22:44:18
 * @Template:
 */

module.exports = rotation;

function rotation(ele) {
    return new Rotation(ele);
}

function Rotation(ele) {
    this.ele = ele;
    this.init();
}

Rotation.prototype.init = function () {
    console.log(this.ele);
    var ele = this.ele;
    this.back = ele.back;
    this.rotationTime = ele.rotationTime;
    this.rotateDeg = ele.rotateDeg;

    this.setRotate(this.rotateDeg);
};

Rotation.prototype.setRotate = function (d) {
    var that = this;
    // 设置轮盘初始角度、运转为零
    setStyle(that.back, 'transform', 'rotate(0deg)');
    setStyle(that.back, 'transition', 'all 0s ease 0s');

    // 运动
    setTimeout(function () {

        setStyle(that.back, 'transform', 'rotate(' + d + 'deg)');
        setStyle(that.back, 'transition', 'all ' + that.rotationTime + 'ms ease 0s');
    }, 50);

};

// 设置css3
function setStyle(obj, name, value) {
    var bigname = name.charAt(0).toUpperCase() + name.substring(1);
    obj.style['Webkit' + bigname] = value;
    obj.style['Moz' + bigname] = value;
    obj.style['ms' + bigname] = value;
    obj.style['O' + bigname] = value;
    obj.style[name] = value;
}