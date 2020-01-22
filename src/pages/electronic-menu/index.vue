<template>
  <view class="electronic-menu">
    <view class="goods-container">
      <scroll-view class="sidebar-wrap" scroll-y>
        <min-sidebar v-model="category" @change="changeCategory">
          <min-sidebar-item :title="item.title" label="已下1单" :name="index" :key="index" v-for="(item, index) in goodsList"/>
        </min-sidebar>
      </scroll-view>
      <scroll-view class="goods-wrap" scroll-y @scroll="goodsScroll">
        <min-goods class="goods-dom p-lr-30" :title="category.title" :key="i" v-for="(category, i) in goodsList">
          <view class="goods-item-wrap p-top-20" :key="j" v-for="(goods, j) in category.goods">
            <min-goods-item
              :name="goods.name"
              :price="goods.price"
              :icon="goods.icon"
              v-model="count"
              stepper
            />
          </view>
        </min-goods>
      </scroll-view>
    </view>
    <min-goods-submit
      totalAmount="999"
      totalLabel="台位抵消：￥1000"
      icon="/static/images/alipay-pay.png"
      goodsCount="3"
      buttonText="去下单(已开台)"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      count: 0, // 已选商品数量
      category: 0,
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
        },
        {
          title: '商品分类2',
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
            }
          ]
        },
        {
          title: '商品分类3',
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
            }
          ]
        },
        {
          title: '商品分类4',
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
            }
          ]
        },
        {
          title: '商品分类5',
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
            }
          ]
        },
        {
          title: '商品分类6',
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
            }
          ]
        },
        {
          title: '商品分类7',
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
            }
          ]
        }
      ],
      minGoodsDom: [],
      minSidebarItem: [],
    }
  },
  mounted() {
    this.goodsQuery()
    this.categoryQuery()
  },
  methods: {
    goodsScroll(e) {
      if (e.detail.scrollTop < 0) return
      const scrollTop = e.detail.scrollTop + 100
      const tops = this.minGoodsDom
      const nowTop = 0
      for (let i = 0; i < tops.length; i++) {
        if (!tops[i+1]) {
          this.category = i
          return
        }
        if (scrollTop > tops[i] && scrollTop < tops[i + 1]) {
          this.category = i
          return
        }
      }
    },
    goodsQuery() {
      const query = uni.createSelectorQuery()
      query.selectAll('.goods-dom').boundingClientRect()
      query.exec(res => {
        this.minGoodsDom = res[0].map(item => item.top)
      })
    },
    categoryQuery() {
      const query = uni.createSelectorQuery()
      query.selectAll('.min-sidebar-item').boundingClientRect()
      query.exec(res => {
        this.minSidebarItem = res[0]
      })
    },
    changeCategory(value) {

    }
  },
}

</script>

<style lang="scss" scoped>
.electronic-menu{
  .goods-container{
    overflow: hidden;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100rpx;
    .sidebar-wrap{
      flex: 0 0 160rpx;
      height: 100%;
      background: #fff;
    }
    .goods-wrap{
      flex: 1;
      height: 100%;
      background: #fff;
    }
  }
}
</style>
