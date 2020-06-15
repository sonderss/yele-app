<script>
import store from './store/index'
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: () => {
    console.log('App Show')
    uni.onNetworkStatusChange(res => {
      store.dispatch('status/setStatus', res.isConnected)
    })
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import './style/index.scss';
@import './static/font/iconfont.css';
page{
  background: #F7F7F7;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

uni-radio .uni-radio-input.uni-radio-input-checked::before {
    font: normal normal normal 14rpx/1 uni;
    content: "\EA08";
    color: #000 !important;
    font-size: 36rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-48%) scale(.73);
    -webkit-transform: translate(-50%,-48%) scale(.73);
}
</style>
