<template>
<view class="switch-stores m-lr-30 p-top-20">
    <min-search placeholder="请输入门店名称搜索" @search="search" v-model="keys" />
    <view class="m-bottom-20"></view>
    <min-cell :card="false">
        <min-cell-item v-for="(item, index) in getValue" :key="index" :img="item.head_img ? item.head_img : '/static/images/logo.png'" :title="item.store_name" :label="item.address" :border="index !== getValue.length-1">
            <min-btn size="xs" slot="tail" @click="applyStores(item, index)">申请</min-btn>
        </min-cell-item>
    </min-cell>
    <min-modal ref="showModal"></min-modal>
    <min-404 v-if="getValue.length === 0"></min-404>
    <view class="m-bottom-20"></view>
    <min-pulldown :isFlag="falg" :desc="des" :loading="load" />
</view>
</template>

<script>
export default {
    name: 'apply-stores',
    navigate: ['navigateTo', 'switchTab'],
    data() {
        return {
            falg: false,
            nums: 2,
            des: "加载中",
            load: true,
            keys: '',
            elseStoreList: [],
            total: -1,
            isAll: false
        }
    },
    computed: {
        getValue() {
            let data = []
            if (this.keys) {
                this.elseStoreList.filter(item => {
                    if (item.store_name.toLowerCase().includes(this.keys.toLowerCase())) {
                        data.push(item)
                    }
                })
            } else {
                data = this.elseStoreList
            }
            return data
        }
    },
    mounted() {
        this.getData(1, 12).then(res => {
            this.elseStoreList = res.list
        })
    },
    onNavigationBarButtonTap(e) {
        this.$minRouter.push({
            name: 'apply-log',
            type: 'navigateTo',
            path: '/pages/apply-log/index'
        })
    },
    onReachBottom() {
        if (this.isAll) return true
        this.falg = true
        this.getData(this.nums, 12, true).then(res => {
            if (res.list.length === 0) {
                this.load = false
                this.des = '暂无更多数据'
                this.isAll = true
                setTimeout(() => {
                    return this.falg = false
                }, 1000)
            }
            this.nums++
            this.elseStoreList = this.elseStoreList.concat([...res.list])
        })
    },
    onPullDownRefresh() {
        // console.log('refresh');
        this.isAll = false
        this.getData(1, 12, true).then(res => {
            this.elseStoreList = res.list
            this.nums = 2
            uni.stopPullDownRefresh();
        })
    },
    methods: {
        async getData(page, limit, isLoading) {
            //  if (this.total === this.elseStoreList.length) return // 没有更多数据了
            return await this.$minApi.getElseStoreList({
                page,
                limit,
                isLoading
            })
        },
        search() {
            // this.params.page = 1
            // this.total = -1
            // this.getElseStoreList('shuaxin')
        },
        // eslint-disable-next-line camelcase
        applyStores({
            id,
            store_name
        }, index) {
            console.log(id, store_name)
            // 跳转页面
            this.$minRouter.push({
                name: 'new-user',
                params: {
                    isShensStore: true,
                    phone: this.$store.state.user.userInfos.mobile,
                    store_name,
                    store_id: id
                }
            })
            // this.$refs.showModal.handleShow({
            //     title: '提示',
            //     // eslint-disable-next-line camelcase
            //     content: `是否确认申请成为${store_name}的外联`,
            //     contentCenter: true,
            //     success: res => {
            //         if (res.id !== 1) return
            //         this.$minApi.applyStores({
            //             store_id: id
            //         }).then(res => {
            //             this.$showToast('申请成功')
            //             this.elseStoreList.splice(index, 1)
            //         })
            //     }
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
page {
    background-color: #f7f7f7;
}
</style>
