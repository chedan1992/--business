<script>
export default {
    onLoad() {
        console.log(this)
        console.log(uni)
    },
    onLaunch() {
        console.log('App Launch')
    },
    onShow() {
        console.log('App Show')
    },
    onHide() {
        console.log('App Hide')
    }
}
</script>

<style>
/* 头条小程序需要把 iconfont 样式放到组件外 */
@import 'components/m-icon/m-icon.css';

/*每个页面公共css */
page {
    min-height: 100%;
    font-size: 16px;
    background-color: #f8f8f8;
    color: #333;
}

/* #ifdef MP-BAIDU */
page {
    width: 100%;
    height: 100%;
    display: block;
}

swan-template {
    width: 100%;
    min-height: 100%;
    display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
    width: 100%;
    min-height: 100%;
    display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
    min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
    width: 100%;
    /* min-height: 100%; */
    display: flex;
    flex: 1;
}

.content {
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #f8f8f8;
    padding: 10px;
}

.input-group {
    background-color: #ffffff;
    margin-top: 20px;
    position: relative;
}

.input-group::before {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    background-color: #c8c7cc;
}

.input-group::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    background-color: #c8c7cc;
}

.input-row {
    display: flex;
    flex-direction: row;
    position: relative;
    font-size: 18px;
    line-height: 40px;
}

.input-row .title {
    width: 100px;
    padding-left: 15px;
}

.input-row.border::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 8px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    background-color: #c8c7cc;
}

.btn-row {
    margin-top: 25px;
    padding: 10px;
}

button.primary {
    background-color: #0faeff;
}
uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
    background: #ff6e45;
    border-color: #ff6e45;
}
uni-radio .uni-radio-input-checked {
    background: #ff6e45 !important;
    border-color: #ff6e45 !important;
}
</style>
