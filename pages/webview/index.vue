<template>
  <view class="webview">
     <web-view :src="$store.state.status.vipUrl"></web-view>
  </view>
</template>

<script>
export default {
  name:'webview',
  navigate:["navigateTo"],
  onLoad(){
    console.log(this.$store.state.status.vipUrl)
  },
  onBackPress() {  
    console.log(213312312321123321)
    // uni.navigateBack({
    //     delta:2
    // });
    uni.redirectTo({
        url: '../index/index'
    });
  }
}
</script>