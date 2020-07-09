<template>
  <view class="content">
    <view>
      <table class="table">
        <tr class="flex">
          <th class="product">商品</th>
          <th class="item2">数量</th>
          <th class="item2">实收</th>
          <th class="item2">提成比例</th>
          <th class="item2">提成</th>
        </tr>
        <tr class="flex" v-for="(item,index) in lists" :key="index">
          <td class="product">{{item.product_name}}</td>
          <td class="item2">{{item.quantity}}</td>
          <td class="item2">{{item.performance ? item.performance : 0}}</td>
          <td class="item2">{{item.commission_ratio ?  item.commission_ratio  : 0}}%</td>
          <td class="item2">{{item.commission}}</td>
        </tr>
        <!-- <tr class="flex">
          <td  class="product">VSOP*750ML*2010年/瓶</td>
          <td class="item2">309000</td>
          <td class="item2">16780</td>
          <td class="item2">-100%</td>
          <td class="item2">-1685</td>
        </tr>
        <tr class="flex">
          <td  class="product">VSOP*750ML*2010年/瓶</td>
          <td class="item2">309000</td>
          <td class="item2">16780</td>
          <td class="item2">-100%</td>
          <td class="item2">-1685</td>
        </tr>-->
      </table>
    </view>
  </view>
</template>

<script>
export default {
  props:{
    lists:{
      type:Array,
      default:  () => []
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
$height: 60rpx;
$color: #e7e7e7;
$bgcolor: #fffded;
.content table {
  display: block;
  height: auto;
}

.table tr {
  border: 1rpx solid $color;
  border-collapse: collapse;
  text-align: left;
  border-bottom: none;
  border-right: none;
}
th {
  font-weight: 400;
  font-size: 24rpx;
  width: auto;
  border-right: none;
}
td {
  font-weight: 400;
  font-size: 24rpx;
  width: auto;
  border-collapse: collapse;
  text-align: left;
  background-color: #fff;
  border-right: none;
}

.table {
  width: 100%;
  height: $height;
  display: block;
  border: 1rpx solid $color;
  border-collapse: collapse;
  text-align: left;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: none;
}
table tr:nth-child(odd) {
  background: $bgcolor;
  td {
    background: $bgcolor;
  }
}

.flex {
  width: 100%;
  height: $height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 60rpx;
  .product {
    width: 200rpx;
    height: $height;
    text-align: center;
    border-right: 1rpx solid $color;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10rpx;
    border-bottom: 1rpx solid $color;
  }
  .item2 {
    flex: 1;
    height: $height;
    text-align: center;
    border-right: 1rpx solid $color;
    border-bottom: 1rpx solid $color;
  }
}
</style>
