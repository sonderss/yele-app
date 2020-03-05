<template>
  <view class="main">
      <scroll-view class="left-view">
        <min-sidebar v-model="category" >
              <min-sidebar-item :title="item.title" label="已下1单" :name="index" :key="index" v-for="(item, index) in goodsList"/>
        </min-sidebar>
      </scroll-view>
      <view class="right-view">
          <scroll-view>
          </scroll-view>
      </view>
  </view>
</template>
<script>
import api from '../../api/a'
export default {
  mounted () {
    const option = {
      url: '5e424f7f8c0c0?page=1&limit=20',
      accesstoken: 'HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd'
    }
    api.uniapp(option).then(res => {
      console.log(res)
    })
    // uni.request({
    //   url: 'http://api.app-store.dev.yeleonline.com/api/5e424cc4ded0a',
    //   header: {
    //     'access-token': 'HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd' // 自定义请求头信息
    //   },
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  },
  data () {
    return {
      category: '',
      goodsList: [
        {
          title: '商品分类1',
          goods: [
            {
              name: '2020年元旦百威兄弟套餐12瓶',
              price: '2380.00',
              icon: '/static/images/goods.png',
              specification: '罐装*250ml*规格9/瓶'
            },
            {
              name: '2020年元旦百威兄弟套餐12瓶',
              price: '2380.00',
              icon: '/static/images/goods.png',
              specification: '罐装*250ml*规格9/瓶'
            },
            {
              name: '2020年元旦百威兄弟套餐12瓶',
              price: '2380.00',
              icon: '/static/images/goods.png',
              specification: '罐装*250ml*规格9/瓶'
            },
            {
              name: '2020年元旦百威兄弟套餐12瓶',
              price: '2380.00',
              icon: '/static/images/goods.png',
              specification: '罐装*250ml*规格9/瓶'
            },
            {
              name: '2020年元旦百威兄弟套餐12瓶',
              price: '2380.00',
              icon: '/static/images/goods.png',
              specification: '罐装*250ml*规格9/瓶'
            },
            {
              name: '2020年元旦百威兄弟套餐12瓶',
              price: '2380.00',
              icon: '/static/images/goods.png',
              specification: '罐装*250ml*规格9/瓶'
            },
            {
              name: '2020年元旦百威兄弟套餐12瓶',
              price: '2380.00',
              icon: '/static/images/goods.png',
              specification: '罐装*250ml*规格9/瓶'
            },
            {
              name: '2020年元旦百威兄弟套餐12瓶',
              price: '2380.00',
              icon: '/static/images/goods.png',
              specification: '罐装*250ml*规格9/瓶'
            },
            {
              name: '2020年元旦百威兄弟套餐12瓶',
              price: '2380.00',
              icon: '/static/images/goods.png',
              specification: '罐装*250ml*规格9/瓶'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  display: flex;
  .left-view{
    width: 200rpx;
  }
  .right-view{
    flex: 1;
    background: #f00;
  }
}
</style>
