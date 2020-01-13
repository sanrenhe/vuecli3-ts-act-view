<template>
    <div v-if="act.status==='success'">

        <ad pos="1" />

        <div class="ur-wrap ur-index"
             v-edit-tap="{name:'background'}"
             :style="act.data.templet_set.background_pic|bgImgFilter">
            <header class="header">
                <nav class="nav">
                    <a v-if="act.data.ycbUrl"
                       :href="act.data.ycbUrl">我的奖品</a>
                    <router-link v-else
                                 to="./my">我的奖品</router-link>
                </nav>
                <figure class="logo">
                    <img v-if="act.data.templet_set.logo_is_show==1"
                         :src="act.data.templet_set.logo_url">
                </figure>
                <!-- <figure class="logo">
                    <img src="../assets/img/logo.png">
                </figure> -->
            </header>

            <main class="main">
                <!-- <h1 class="title"
                    v-edit-tap="{name:'title'}">
                    {{act.data.title}}
                </h1> -->

                <div class="title-pic"
                     v-edit-tap="{name:'title'}">
                    <img v-if="act.data.templet_set.title_pic"
                         :src="act.data.templet_set.title_pic">
                    <!-- <img src="../assets/img/title.png"> -->
                </div>
                <h3 class="sub-title"
                    v-edit-tap="{name:'sub_name'}">
                    {{act.data.templet_set.sub_name}}
                </h3>
                <div class="tip">活动还剩
                    <van-count-down :time="actCD"
                                    @finish="cdFinishAct"
                                    style="display:inline-block">
                        <template v-slot="timeData">
                            <span class="num"> {{ timeData.days }}</span>天
                            <span class="num">{{ formatNum(timeData.hours) }}</span>时
                            <span class="num">{{ formatNum(timeData.minutes) }}</span>分
                            <span class="num">{{ formatNum(timeData.seconds) }}</span>秒
                        </template>
                    </van-count-down>
                </div>
                <article class="act">
                    <div class="p_trunTable">
                        <canvas id="wheelCanvas"
                                width="450px"
                                height="450px"></canvas>
                        <div class="pointer"></div>
                        <div class="draw"
                             @click="commonDrawPrize">点击<br />抽奖</div>
                    </div>
                </article>
                <a class="login"
                   :href="act.data.templet_set.h5_url"
                   v-if="salaryeasy==2">立即报名</a>
                <div class="remain"
                     v-if="act.data.activity_status==='starting'&&salaryeasy==1">
                    - 您还有 {{userExtInfo.remain_num}} 次抽奖机会 -
                </div>
                <div class="rules">
                    <div class="title">活动规则</div>
                    <div class="info"
                         v-html="act.data.rules"></div>
                </div>
                <!-- <button class="button-home"
                        v-if="act.data.share_button_is_show==1"
                        @click="showShare=true">分享赢取抽奖</button> -->
            </main>

            <section class="prizes"
                     v-if="!isEmpty(prizeList)">
                <div class="content">
                    <div class="main-title">活动奖品</div>
                    <ul class="list hidden-scrollbar">

                        <li class="item"
                            v-for="(item,index) in prizeList"
                            :key="index">
                            <div class="image">
                                <img :src="item.pic_url">
                            </div>
                            <div class="sub-title">{{item.short_name}}</div>
                            <div class="desc">{{item.name}}</div>
                        </li>

                    </ul>
                </div>
            </section>

            <template v-if="act.data.templet_set.is_lamp_on==1">
                <aside v-if="act.data.templet_set.custom_lamp_text"
                       class="marquee">
                    <div class="wrap hidden-scrollbar"
                         ref="marquee">
                        <p>{{act.data.templet_set.custom_lamp_text}}</p>
                    </div>
                </aside>
                <aside v-else-if="!isEmpty(winList)"
                       class="marquee">
                    <div class="wrap hidden-scrollbar"
                         ref="marquee">
                        <p v-for="(item,index) in winList"
                           :key="index">{{item.nickname}}
                            <span class="txt">砸中了</span>
                            {{item.prizename}}
                        </p>
                    </div>
                </aside>
            </template>

            <div class="user-count"
                 v-if="act.data.templet_set.person_is_show==1">
                已有 {{userCount}} 人参与
            </div>
            <footer class="foot"></footer>
        </div>

        <!-- 活动状态弹窗 -->
        <mask-activity :show.sync="showActivity"
                       :remain="userExtInfo.remain_num"
                       :islogin="salaryeasy" />
        <!-- 抽奖结果弹窗 -->
        <mask-result :show.sync="showResult"
                     :prize="prize"
                     :remain="userExtInfo.remain_num" />

        <mask-pic :show.sync="showPic" :islogin="haslogin" @changeStatus="changeStatus"/>
        <!-- 分享弹窗 -->
        <mask-share :show.sync="showShare" />
        <!-- 黑名单 -->
        <mask-black-list />

        <ad pos="2" />

    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Inject } from 'vue-property-decorator';
import MaskActivity from '@/components/mask-activity.vue'
import MaskResult from '@/components/mask-result.vue'
import MaskPic from '@/components/mask-pic.vue'
import MaskShare from '@/components/mask-share.vue'
import MaskBlackList from '@/components/mask-black-list.vue'
import { AxiosResponse } from 'axios';
import { Dictionary } from "vue-router/types/router";

import ViewBase from './base'

import controller from '@/controller'

import rotation from './rotation.js'

const requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

@Component({
    components: {
        MaskActivity,
        MaskResult,
        MaskShare,
        MaskBlackList,
        MaskPic
    },
})

export default class Index extends ViewBase {
    @Inject() isEmpty!: Function
    @Inject() formatDate!: Function

    private interval = 0;
    showActivity = false;
    showPic=false;
    showResult = false;
    showShare = false;
    haslogin=-1;
    // 用户信息
    userExtInfo: Dictionary<any> = {};
    // 中奖列表
    winList = [];
    // 奖品列表
    prizeList = [];
    // 用户信息
    userCount: number | null = null;
    // 抽奖
    prize = {
        loading: false,
        data: {},
        message: '',
        win: null as (null | boolean)
    };
    //活动
    actCD = -1
    // 转盘数据
    turnWheel = {
        rewardNames: [], // 转盘奖品名称数组
        outsideRadius: 188, // 转盘外圆的半径
        textRadius: 160, // 转盘奖品位置距离圆心的距离
        insideRadius: 0, // 转盘内圆的半径
        startAngle: 0, // 开始角度
        ready: false,
        back: document.getElementById('wheelCanvas'),
        rotateDeg: 0,
        rotationTime: 0
    };
    // 安慰奖数
    noPrizeNum = 0;
    // 奖品id序列
    pirzeIdsStr = '';
    // 奖品图片缓存
    rewardImgWrap = [];
    // 转盘偏移量
    rewardOffset = 0;
    // 0初始 1已经 2未
    salaryeasy = 0;

    created() {
        this.regEditUpdate([]);
        this.actCD = this.formatDate(this.act.data.end_time) * 1000 - Date.now();
    }

    formatNum(num: number) {
        if (num < 10) return "0" + num;
        return num;
    }
    // 活动倒计时
    cdFinishAct() {
        this.actCD = -1;
        this.act.data.activity_status = "has_end";
    }
    // 旋转
    roll(n: number, data: Dictionary<any>, cb: Function) {
        var rewardIndex = n + this.rewardOffset;

        var baseAngle = 360 / this.turnWheel.rewardNames.length;
        var angles = 360 * 3 / 4 - (rewardIndex * baseAngle) - baseAngle / 2;

        // 转动的角度
        this.turnWheel.rotateDeg = angles + 5 * 360;
        // 转动的时间
        this.turnWheel.rotationTime = this.rnd(1500, 2500);

        // 动画执行完毕可再次点击
        setTimeout(() => {
            this.turnWheel.ready = true;
            cb && cb(n, data);
        }, this.turnWheel.rotationTime);
        // 转盘
        rotation(this.turnWheel);
    }

    rnd(iMin: number, iMax: number) {
        return Math.floor(Math.random() * (iMax - iMin)) + iMin;
    }

    // 处理奖品排序
    renderPrizeData() {
        // 获取奖品id序列
        this.prizeList.forEach((prize: Dictionary<any>) => {
            this.pirzeIdsStr += prize.id.toString();
        });

        // 计算转盘瓣数
        let wheelNum = 6;

        if (this.prizeList.length <= 5) {
            wheelNum = 6;
        } else if (this.prizeList.length <= 7) {
            wheelNum = 8;
        } else {
            wheelNum = 10;
        }

        let tempArr = [];
        let prizeLen = this.prizeList.length;
        let rewardArr = this.prizeList;
        let noPrizeArr = [];
        this.noPrizeNum = wheelNum - prizeLen;
        noPrizeArr = this.getNoPrize(this.noPrizeNum);

        if (prizeLen == 5 || prizeLen == 7 || prizeLen == 9) {
            for (let i = 0; i < wheelNum; i++) {
                if (i == 0) {
                    tempArr[i] = rewardArr[i];
                } else if (i == 1) {
                    tempArr[i] = noPrizeArr[0];
                } else {
                    tempArr[i] = rewardArr[i - 1];
                }
            }
        } else if (prizeLen == 3) {
            for (let i = 0; i < wheelNum / 2; i++) {
                tempArr[i * 2] = rewardArr[i];
                tempArr[i * 2 + 1] = noPrizeArr[i];
            }
        } else if (prizeLen == 4 || prizeLen == 6 || prizeLen == 8) {
            for (let i = 0; i < wheelNum; i++) {
                if (i < wheelNum / 2) {
                    if (i == 0) {
                        tempArr[i] = rewardArr[i];
                    } else if (i == 1) {
                        tempArr[i] = noPrizeArr[0];
                    } else {
                        tempArr[i] = rewardArr[i - 1];
                    }
                } else {
                    if (i == wheelNum / 2) {
                        tempArr[i] = rewardArr[i - 1];
                    } else if (i == wheelNum / 2 + 1) {
                        tempArr[i] = noPrizeArr[1];
                    } else {
                        tempArr[i] = rewardArr[i - 2];
                    }
                }
            }
        }

        this.turnWheel.rewardNames = <any>tempArr;

        // 根据奖品数量，旋转角度调整
        if (this.turnWheel.rewardNames.length == 6) {
            this.rewardOffset = 4.5;
        } else if (this.turnWheel.rewardNames.length == 8) {
            this.rewardOffset = 6;
        } else if (this.turnWheel.rewardNames.length == 10) {
            this.rewardOffset = 7.5;
        } else {
            this.rewardOffset = 0;
        }

        this.preloadImg();
    }

    getNoPrize(count: any) {
        let noPrizeSeq = 0;
        let noPrize = {
            id: 0,
            type: 'fail',
            name: '谢谢惠顾',
            pic_url: process.env.VUE_APP_IMG_HOST + '/hd/wheelnew/ecitic_salaryeasy/shangxin.png',
        };
        count = count == undefined ? 1 : count;
        let arr = [];
        for (let i = 0; i < count; i++) {
            noPrize.id = ++noPrizeSeq;
            arr.push(noPrize);
        }
        return arr;
    }

    preloadImg() {
        for (var i = 0, len = this.turnWheel.rewardNames.length; i < len; i++) {
            (<HTMLElement>this.rewardImgWrap[i]) = new Image();
            (<any>this.rewardImgWrap[i]).src = (<any>this.turnWheel.rewardNames[i]).pic_url;
            //(<any>this.rewardImgWrap[i]).src = "http://hdloc.kerlala.com:8080/res-view/wheelnew/ecitic_zx/img/bg-rule.png";

        }

        window.setTimeout(() => {
            this.drawWheelCanvas();
        }, 500);
    }

    drawWheelCanvas() {
        var canvas = document.getElementById("wheelCanvas");
        if (!canvas) return false;
        let turnWheel = this.turnWheel;

        // 计算每块占的角度，弧度制
        var baseAngle = Math.PI * 2 / (this.turnWheel.rewardNames.length);
        // 获取上下文
        var ctx = (<any>canvas).getContext("2d");

        var canvasW = (<any>canvas).width; // 画板的高度
        var canvasH = (<any>canvas).height; // 画板的宽度
        // ctx.translate(0, 0);
        //在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, canvasW, canvasH);

        //strokeStyle 绘制颜色
        // ctx.strokeStyle = "#FFBE04"; // 红色
        //font 画布上文本内容的当前字体属性
        ctx.font = '18px Microsoft YaHei';

        // 根据奖品数量，旋转角度调整
        turnWheel.startAngle = this.rewardOffset * baseAngle;
        // 画具体内容
        for (var index = 0; index < turnWheel.rewardNames.length; index++) {
            // for (var index = turnWheel.rewardNames.length-1; index >= 0; index--) {
            var img = this.rewardImgWrap[index];
            // 当前的角度
            var angle = turnWheel.startAngle + index * baseAngle;
            if ((<any>turnWheel.rewardNames[index]).type != "fail") {
                // 填充颜色 外圈
                ctx.fillStyle = '#FFFEF1';
            } else {
                ctx.fillStyle = '#fccc96';
            }

            // 开始画内容
            // ---------基本的背景颜色----------
            ctx.beginPath();
            /*
             * 画圆弧，和IOS的Quartz2D类似
             * context.arc(x,y,r,sAngle,eAngle,counterclockwise);
             * x :圆的中心点x
             * y :圆的中心点x
             * sAngle,eAngle :起始角度、结束角度
             * counterclockwise : 绘制方向,可选，False = 顺时针，true = 逆时针
             * */
            ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.outsideRadius, angle, angle + baseAngle, false);
            ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.insideRadius, angle + baseAngle, angle, true);
            // ctx.stroke();
            ctx.fill();
            //保存画布的状态，和图形上下文栈类似，后面可以Restore还原状态（坐标还原为当前的0，0），
            ctx.save();
            ctx.closePath();

            ctx.beginPath();
            //内圈
            ctx.fillStyle = '#e87e4e';
            ctx.arc(canvasW * 0.5, canvasH * 0.5, turnWheel.insideRadius, angle, angle + baseAngle, false);
            ctx.arc(canvasW * 0.5, canvasH * 0.5, 20, angle + baseAngle, angle, true);
            // ctx.stroke();
            ctx.fill();
            //保存画布的状态，和图形上下文栈类似，后面可以Restore还原状态（坐标还原为当前的0，0），
            ctx.save();
            ctx.closePath();

            /*----绘制奖品内容----重点----*/
            // 白色字体
            ctx.fillStyle = "#fff";
            var rewardName = (<any>turnWheel.rewardNames[index]).name.substr(0, 8);
            var rewardType = (<any>turnWheel.rewardNames[index]).type;
            var line_height = 17;

            var translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * (rewardType == "fail" ? turnWheel.textRadius : turnWheel.outsideRadius);
            var translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * (rewardType == "fail" ? turnWheel.textRadius : turnWheel.outsideRadius);
            ctx.translate(translateX, translateY);

            // rotate方法旋转当前的绘图，因为文字适合当前扇形中心线垂直的！
            // angle，当前扇形自身旋转的角度 +  baseAngle / 2 中心线多旋转的角度  + 垂直的角度90°
            ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);

            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
            // canvas 的 measureText() 方法返回包含一个对象，该对象包含以像素计的指定字体宽度。
            // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色. fillStyle 属性以另一种颜色/渐变来渲染文本
            /*
             * context.fillText(text,x,y,maxWidth);
             * 注意！！！y是文字的最底部的值，并不是top的值！！！
             * */
            if (rewardType == 'fail') {
                if (turnWheel.rewardNames.length == 6 || turnWheel.rewardNames.length == 8) { //查询是否包含字段 流量包
                    ctx.font = '16px';
                    ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0);
                } else if (turnWheel.rewardNames.length == 10) { //奖品名称长度超过一定范围
                    rewardName = rewardName.substring(0, 6) + "||" + rewardName.substring(6);
                    var rewardNames = rewardName.split("||");
                    for (var j = 0; j < rewardNames.length; j++) {
                        ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
                    }
                } else {
                    //在画布上绘制填色的文本。文本的默认颜色是黑色
                    ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0);
                }

            }
            //添加对应图标
            if (rewardType == 'fail') {
                ctx.drawImage(img, -20, 30, 40, 40);
            } else {
                ctx.drawImage(img, -28, 30, 60, 60);
            }
            //还原画板的状态到上一个save()状态之前
            ctx.restore();

            /*----绘制奖品结束----*/

        }

        ctx.save();
        ctx.translate(canvasW * 0.5, canvasH * 0.5);
        ctx.rotate(baseAngle + Math.PI / 2);
        ctx.strokeStyle = "#FC8B1F";
        ctx.lineWidth = 3;

        // ctx.save();
        for (var i = 0; i < turnWheel.rewardNames.length; i++) {
            ctx.beginPath();
            ctx.rotate(Math.PI / (turnWheel.rewardNames.length / 2));
            ctx.moveTo(10, 0);
            ctx.lineTo(canvasW * 0.42, 0);
            ctx.stroke();
            ctx.closePath();
            //去掉圆角
            // ctx.beginPath();
            // ctx.strokeStyle = '#FC8B1F';
            // ctx.arc(canvasW * 0.42, 0, 4, 1.5 * Math.PI, 0.5 * Math.PI, true);
            // ctx.closePath();
            // ctx.stroke();
            // ctx.fillStyle = '#FC8B1F';
            ctx.fill();
        }
        ctx.restore();

        // 绘制完成
        turnWheel.ready = true;
    }

    // 抽奖
    commonDrawPrize() {
        // 不在活动时间
        if (this.$data.act.data.activity_status !== 'starting') {
            this.showActivity = true;
            return;
        }

        // 防止重复点击
        if (this.prize.loading) return;
        this.prize.loading = true;
        // 抽抽抽抽抽奖
        let res = {message:"一等奖", data: { prize_id: 1530,pic_url:"http://hdloc.kerlala.com:8080/res-view/wheelnew/ecitic_zx/img/m-success.png" }, status: "success" }//lily
        this.rock(res);
    }

    rock(res: Dictionary<any>) {
        var prizeId = res.data.prize_id != undefined ? res.data.prize_id : this.rnd(1, this.noPrizeNum);
        var prizeIndex = 1; // 默认打底为未中奖位置

        for (var i = 0, len = this.turnWheel.rewardNames.length; i < len; i++) {
            if (prizeId == (<any>this.turnWheel.rewardNames[i]).id) {
                prizeIndex = i;
            }
        }

        this.roll(prizeIndex, res, (n: number, res: Dictionary<any>) => {
            this.prize.win = false;
            if (res.status == 'success') {
                this.prize.data = res.data;
                this.prize.win = true;
            }
            // 提示文案
            this.prize.message = res.message;

            this.showResult = true;
            // 解除
            this.prize.loading = false;
            // 在animate函数显示抽奖结果弹层
        });
    }
}
</script>

<style lang="scss" scoped>
</style>
