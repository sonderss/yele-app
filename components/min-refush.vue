<template>
	<view class="min-refush">
	  <scroll-view  :style="{transition: top === 0 ? 'transform 300ms':'',transform: 'translateY('+ top + 'rpx' +')'}" 
	   scroll-y @touchstart="start" @touchmove="move" @touchend="end" >
		  <slot  >
		  </slot>
	  </scroll-view>
	</view>
</template>

<script>
	export default  {
		data(){
			return {
				top:'',
				lastY:"",
				flag:0
			}
		},
		methods:{
			start(e){
				this.lastY = e.changedTouches[0].pageY
			},
			
			move(e){
				let currentY = e.changedTouches[0].pageY
				this.$nextTick(() => {
					this.top = currentY - this.lastY
				})
			},
			end(e){
					this.top = 0
			}
		}
	}
</script>

<style style="scss" scoped>
.min-refush{
  width: 100%;
  height: 490rpx;
   background-image: url('/static/images/index/back.png');
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
}
	.oswiper{
		width: 100vw;
		height:100vh;
    overflow: hidden;
	}
	.oitem{
		width: 100vw;
		height: 100vh;
    overflow: hidden;

	}
</style>
