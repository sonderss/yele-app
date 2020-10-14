<template>
<view class="yele-grid min-flex min-flex-main-start min-flex-wrap-wrap m-lr-30 m-top-20">
    <view v-for="(item,index) in list" :key="item.name" :class="itemNum ? 'grid-item-3 min-flex min-flex-dir-top' : 'grid-item min-flex min-flex-dir-top'" @click="goTo(index)" v-root="item.root">
        <image class="img" :src="item.img" />
        <view class="f28 ">{{item.text}}</view>
    </view>
</view>
</template>

<script>
export default {
    name: 'YeleGrid',
    props: {
        list: {
            type: Array,
            default: () => []
        },
        itemNum: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        goTo(n) {
            if (this.list[n].empty) return true
            let result = this.$getRoot(this.list[n].root)
            if (!result) return this.$showToast('抱歉，暂无权限')
            this.$minRouter.push({
                name: this.list[n].name,
                type: 'navigateTo',
                path: this.list[n].url,
                params: this.list[n].params
            })
        }
    }

}
</script>

<style lang="scss" scoped>
.yele-grid {
    background: #FFFFFF;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .grid-item {
        padding: 20rpx 0;
        width: 33.3%;
    }

    .grid-item-3 {
        padding: 20rpx 0;
        // width: 33.3%;
    }

    .img {
        width: 80rpx;
        height: 80rpx;
    }
}
</style>
