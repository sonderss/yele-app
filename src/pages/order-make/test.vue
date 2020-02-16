<template>
  <view>

  </view>
</template>
<script>
import api from '../../api/a'
export default {
  mounted () {
    const option = {
      url: '5e424cc4ded0a',
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
      list: ['全部', '分类1', '分类2', '分类3', '分类4', '分类5', '分类6', '分类4', '分类5', '分类6', '分类4', '分类5', '分类6']
    }
  }
}
</script>
