<template>
  <view class="switch-stores m-lr-30 p-top-20">
    <min-search placeholder="请输入门店名称搜索" class="m-bottom-20"/>
    <min-cell>
      <min-cell-item
        v-for="(item, index) in list" :key="index"
        :img="item.img"
        :title="item.title"
        :label="item.subtitle"
        :border="list.length !== index + 1"
      >
        <min-btn size="xs" slot="tail">申请</min-btn>
      </min-cell-item>
    </min-cell>
  </view>
</template>

<script>
export default {
  name: 'apply-stores',
  navigate: ['navigateTo', 'switchTab'],
  data () {
    return {
      list: [{
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '广州市天河区元岗横路智汇parkB303室',
        tail: '待审核'
      }, {
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '广州市天河区元岗横路智汇parkB303室',
        tail: '未通过'
      }, {
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '广州市天河区元岗横路智汇parkB303室',
        tail: '已通过'
      }, {
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '广州市天河区元岗横路智汇parkB303室',
        tail: '未通过'
      }]
    }
  },
  onNavigationBarButtonTap (e) {
    this.$minRouter.push({
      name: 'apply-log',
      type: 'navigateTo',
      path: '/pages/apply-log/index'
    })
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: #F7F7F7;
}
</style>
