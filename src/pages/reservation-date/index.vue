<template>
  <view class="reservation-date p-lr-30 p-tb-20">
    <min-cell>
      <min-cell-item
        title="12-20 星期五（已预约）" tail="焦麦琪"
        :border="true"
      ></min-cell-item>
      <min-cell-item
        title="12-20 星期五（已预约）" tail="可预约"
        :border="true" arrow tailType="red"
      ></min-cell-item>
    </min-cell>
  </view>
</template>

<script>

export default {
}

</script>

<style lang="scss" scoped>
.reservation-date{

}
</style>
