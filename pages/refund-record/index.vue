<template>
  <view class="refund-record p-lr-20 p-tb-20">
    <view
      class="item p-lr-20"
      v-for="(item) in list"
      :key="item.id"
      @click="totiCHENG(item.commission_id)"
    >
      <view class="cell-item min-flex min-flex-main-between bg-white p-tb-30 min-border-bottom">
        <view class="min-flex">
          <view class="m-left-20" style="width:400rpx">
            <view class="f28 min-ellipsis">{{$parseURL().name}}返佣</view>
            <view
              class="label m-top-10 f24 assist-text min-ellipsis"
            >{{$minCommon.formatDate(new Date(item.create_time*1000),'yyyy/MM/dd hh:mm:ss') }}</view>
          </view>
        </view>
        <view class="min-flex min-flex-dir-top">
          <view class="f30 tail" style="color:#FF0000">{{item.commission}}</view>
        </view>
      </view>
    </view>
    <min-404 v-if="list.length === 0" />
  </view>
</template>

<script>
export default {
  name: 'refund-record',
  navigate: ['navigateTo'],
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    console.log(this.$parseURL())
    this.$minApi
      .getRecode({
        rebate_uid: this.$parseURL().id,
      })
      .then(res => {
        console.log(res)
        this.list = res.list
      })
  },
  methods: {
    totiCHENG(id) {
      console.log(id)
      this.$minRouter.push({
        name: 'commission-deils',
        params: { id },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  background: #fff;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.tail {
  font-weight: 700;
}
</style>