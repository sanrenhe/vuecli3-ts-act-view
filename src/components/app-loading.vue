<template>
    <div class="app-loading">
        <div class="spinner">
            <div class="spinner-container container1">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
        </div>
    </div>
</template>

<style>
.app-loading {
    width: 100%;
    height: 100%;
    line-height: 500px;
    position: fixed;
    top: 0px;
    left: 0px;
    font-size: 14px;
    color: #555;
    text-align: center;
    background: rgba(255, 255, 255, 0.7);
    z-index: 9999;
}

.spinner {
    width: 48px;
    height: 48px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.container1 > div,
.container2 > div,
.container3 > div {
    width: 12px;
    height: 12px;
    background-color: #ff7051;
    border-radius: 100%;
    position: absolute;
    -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
    animation: bouncedelay 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.spinner .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
}

.container2 {
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
}

.container3 {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
}

.circle1 {
    top: 0;
    left: 0;
}
.circle2 {
    top: 0;
    right: 0;
}
.circle3 {
    right: 0;
    bottom: 0;
}
.circle4 {
    left: 0;
    bottom: 0;
}

.container2 .circle1 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.container3 .circle1 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
}

.container1 .circle2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.container2 .circle2 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

.container3 .circle2 {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
}

.container1 .circle3 {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
}

.container2 .circle3 {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
}

.container3 .circle3 {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
}

.container1 .circle4 {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
}

.container2 .circle4 {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
}

.container3 .circle4 {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
    }
    40% {
        -webkit-transform: scale(1);
    }
}

@keyframes bouncedelay {
    0%,
    80%,
    100% {
        transform: scale(0);
        -webkit-transform: scale(0);
    }
    40% {
        transform: scale(1);
        -webkit-transform: scale(1);
    }
}
</style>
