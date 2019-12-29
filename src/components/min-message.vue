<template>
  <view class="min-message-list">
    <view v-for="(item, index) of messageList"
      :key="item.id"
    >
      <view class="min-message"
        :style="{ background: item.color, top: index * 65 + 'px' }"
      >
        <view class="min-message-content"
          :class="[item.animator, 'min-message-' + item.type]"
          @click="close(item.id, index)"
        >
          <view style="padding-right: 20rpx">
            <view class="icon"></view>
          </view>
          <text class="text" :style="{ color: item.colortext }">{{ item.content }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'MinMessage',
  data () {
    return {
      messageList: [],
      mark: ['success', 'error', 'warning', 'info']
    }
  },
  methods: {
    open: function (item) {
      item.id = `id${Date.now()}`
      item.animator = 'fadeDown'

      const { type = 'success', duration = 2500, isAutoClose = true } = item

      if (!this.mark.includes(type)) {
        throw new Error(`type: 为以下选项${this.mark}`)
      }

      item.type = type
      item.duration = duration
      item.isAutoClose = isAutoClose

      if (item.isAutoClose) {
        this.close(item.id, item.duration)
      }

      this.messageList.push(item)
    },

    close (id, duration) {
      setTimeout(() => {
        for (let i = 0; i < this.messageList.length; i++) {
          if (this.messageList[i].id === id) {
            this.messageList[i].animator = 'fadeTop'
            setTimeout(() => {
              for (let i = 0; i < this.messageList.length; i++) {
                if (this.messageList[i].id === id) {
                  this.messageList.splice(i, 1)
                  this.$forceUpdate()
                }
              }
            }, 300)
          }
        }
      }, duration)
    }
  }
}
</script>

<style lang="scss" scoped>
.min-message {
  position: fixed;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  transition: all .5s;
  z-index:999;
  &-content {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    padding: 0 32rpx;
    border-radius: 4px;
    min-height: 90rpx;
    max-width: 80%;
  }
  .text{
    font-size: 28rpx;
  }
  &-success {
    background: #f0f9eb;
    border: 1px solid #e1f3d8;
    color: #67c23a;
    .icon {
      width: 30rpx;
      height: 30rpx;
      background-size: cover;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAllBMVEUAAAAE3X8E338E338E34AE34AE4IAD4IEG34EF4IEE4IAE34AE34AF34AF4YAE4IAE4YEE34AE4IAD34AH3n8A334A4YQE4IAD4IAE4IED34AE4IAE4IAE34AF34AF338D34AE4IED4YAE4IAF3oEF338E4H8E338E4YEE3X4A7pIE4IAD4IAD34AA5IYA438D4H8E34A/OQOJAAAAMXRSTlMAgKqJ+cd1WCpug7yPajTOQ+LWXyUbDO6Ve9zTrumiZFDsR/MvILWQPTsDxZ2XExKUoExZ3QAABf5JREFUeNrt3YdCm1AYhuEvjISEbMkme5lYq9/931xrl7XahBPO+KF97uBVwQOcATPO0arqjxdpHM566yBY92ZhnC7GfnUVnVEMg26reZjygumh2eoOIFmy9EbMaOQtE0i0rz33qaj/XNtDlE0z5I3C5gZCnPwZc5n5Jzi3m4TUIJzs4NCgHlObuD6AG/vGnFrNG3vYl/gjajfyE9gVHbc0YnuMYE97HNCYYNyGHU8+DfOfYMFdn8b172Ba26MVXhsmDRsBLQkaQxhT69CiTg1mDB9p2eMQBtyHtC68h3b1gA4Edej1+RMd+fQZGnU7dKbThTZVOlWFJk061oQWCzq3gAYHCnBAbg8U4QE59SlEH7msKcYaOVAU3KxHUXoFv85zX/EexfFwgyMFOkKZT5F8KGpQqEahxrvaxsJdCtZFZp87FKzzGVl9omifkFGdwtWRyX1A4YJ7ZDAMKV44xHWPLIBHXFVjIdRwxVD0nfdVZ1jUoYniUKUt/o71U9Au2jPITc8mdyyQO/zVk5iXP1n0n4r2MKX8kNVmwbTxsTELZowPRVJuvfN4PI7nvC6IBL82CaoJvkmqN75USbYU4OEev3SnvGKbSL1lNc9qj6o+3tmP6F4Ff0h52WgvcrT4rgPnuerYcTCncxW8t+Jl84G8Fw4VfCRVfBER07XKbcOmGG/s6Frl1gH5Dr+bUI3JDsUf8QS/C+lW5fbvmCF+c6ISmx0RrznJ+a9eyfV6yserGV2q5HutM8MvGyqw24GUV21kzGO63FFTmgXVoQKrHfspr+vgh4TuVHR860/w3ZIKrHZUmMnS+RQ5LR2vE+ymzEZqB6f4JqICix0TZhbhRYuZCO5gCy9SZiG5gylejJiB6A6O8NWAGcjuIAcZ551I72A327UuvoOtTCNG+R1sOpkyXtE/V+yQ4f96ETo4Bc43fsKYS+ogz4ioal3dDAAMNtWemA5GWFHRQ4SfolRKB1eo5po6MRHSwSr8fLNyajI66GNMFc/40yqQ0MExFlQwG+KDEgEdXCBVu6TwUYn7DqaIVQeZ7622GjrqzCVGqGElymbruoMhZkrZCiVWOzhDT8uah83IbQd7WOuZy70ZOe3gGoHSH+LfddcuOxgohWzPl0rmDjsYYE0FO1xwP3fXwTV6aiOUKyXqHS1q0cOMKu4ul/RcdXCGUC08wiWnnqMOhoipJIVCib0Oxkj1Ls5s95x0MMWCmkumLjq4wJjaSxx0cAyf+kvsd9BHldpLdv0MHUtqVcWKJkpsd3CFiEZKLHcwwpkmSiLLHTwDUxMltjumOT4reII6eMjzoceT08Fmrvu5J6aDLQBdWi25owndnJ+nPSEdHOSdMODJ6BjlX0TpSeigp+Hq8wR0cKljJqDnvoOJls3APOcdfXz3zHw8xx181rWpgOe04/XD5p7mS2o0aK9v0YXnsiPUOaXcc9fBptZJ/p6zDm70LrvwXHXMdC+E8dx00Ne+NMlz0sGT/sVinouO0MTyPc9+BydGFlR6Q9sd3JlZ4hp2LS/JjvFW3cCvuh3TvLq5ZeDxc+s0TFYVb0vz5gOJC/Nv0JC5VYKy0V7o5hWqfLHbiajZJnI3eFFylL3lTmZBVO5NkMqzLVXRblx++bduK81meuXZ3rA8G04WZ+zY+Fc2ZS3NNrnl2bi4PFtJl2ZzbxG7n11W/9c2wC/PkQSlOSSiPMd2CDio7m+aBTyq7iOLgh5W96dDKY6xIh8KfmDdT/0SHFn3Yv3/0DpRx9b1SnFA5ZvrvNBH13l4o7CH1x3xTiGPr/PxocIdYNf4f2RzWQ/RLs+x5uU5aL5ER/8Dw0da9jiEGbUOLerUYMywEdCSoDGESW2PVnhtmHbXp3H9O1jw5NMw/wl2tMcBjQnGbdgTHbc0YnuMYFfij6jdyE9g374xp1bzxh5uDOoxtYnrAzi0m4TUIJzs4NzJnzGXmX+CEJtmhzfqNDcQJVkuplQ0XSwTSBS10hEzGqWtCJINuq3mYcoLpodmqztAMZyjVdUfL9I4nPXWQbDuzcI4XYz96io6w4gvcZvu+FmPVLAAAAAASUVORK5CYII=');
    }
  }
}
.fadeDown{
  animation: fadeInDown 0.6s both;
}
.fadeTop{
  animation: fadeInTop 0.5s forwards;
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate(0, -100px);
    transform: stranslate(0, -100px);
  }
  to {
    opacity:1;
    -webkit-transform: translate(0, 10px);
    transform: stranslate(0, 10px);
  }
}
@keyframes fadeInTop {
  from {
    opacity:1;
    -webkit-transform: translate(0, 10px);
    transform: stranslate(0, 10px);
  }
  to {
    opacity: 0;
    -webkit-transform: translate(0, -100px);
    transform: stranslate(0, -100px);
  }
}
</style>
