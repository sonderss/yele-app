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

<style>
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
</style>
