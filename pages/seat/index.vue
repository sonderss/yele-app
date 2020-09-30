<template>
<view class="seat">

    <movable-area class="mains">
        <movable-view v-if="isLaji" @scale='listenScal' class="max" direction="all" scale :scale-value="scales" inertia :out-of-bounds="true" :x="X" :y="Y">
            <!-- <view class="max" v-for="(item2,index2) in back" :key="index2" :style="{backgroundImage:url(`${item2}`)}"></view>    -->
            <view class="main" v-if="list.length >0 " :style="{  backgroundImage: `url('${this.$store.state.status.seatList.desk_base_img}')`}">
                <view class="item" v-for="(item,index) in list" :key="index" @click="toDetail(item.id,item.status)" :style="{
                        left:`${item.cord.x  }rpx`,
                        top:`${item.cord.y }rpx`,
                        width:`${item.cord.w*2}rpx`,
                        height:`${item.cord.h*2}rpx`,
                         backgroundImage: `url('${back[item.status]}')`,
                        backgroundPosition:`-${item.cord.x}px  -${item.cord.y}px`
                      }"></view>
            </view>
            <view v-else class="main">
                <view class="sassdds" :style="{    backgroundImage: `url(${$store.state.status.seatList.desk_base_img})`,}"></view>
            </view>
        </movable-view>
    </movable-area>

    <view class=" close" @click.stop="close">x
    </view>
    <view v-if="isShow" class="huifu" @click.stop="init">回到原点</view>
</view>
</template>

<script>
// import list from '../../static/seat/seat.json'
// 1 - 已停用, || 2 - 空闲,|| 3 - 已预约,|| 4 - 点单中,|| 6 - 已开台,  ||  5 - 待确认  7 - 清台中
export default {
    name: 'seat',
    navigate: ['navigateTo'],

    onLoad() {
        const {
            windowWidth,
            windowHeight
        } = uni.getSystemInfoSync();
        // this.Height = windowHeight + 'rpx'
        // this.Width = windowWidth + 'rpx'
        // console.log(this.Height, this.Width)

    },
    mounted() {

        this.list = JSON.parse(this.$store.state.status.seatList.desk_coordinate)
        this.back.push(this.$store.state.status.seatList.desk_lock_img)
        this.back.push(this.$store.state.status.seatList.desk_base_img)
        this.back.push(this.$store.state.status.seatList.desk_book_img)
        this.back.push(this.$store.state.status.seatList.desk_order_img)
        this.back.push(this.$store.state.status.seatList.desk_confirm_img)
        this.back.push(this.$store.state.status.seatList.desk_open_img)
        this.back.push(this.$store.state.status.seatList.desk_clean_img)
        this.back.push(this.$store.state.status.seatList.desk_select_img)
        console.log(this.back)
    },
    data() {
        return {
            list: [],
            back: [''],
            Width: '',
            Height: '',
            isShow: false,
            X: '-150',
            Y: '100',
            scales: 1,
            isLaji: true

        }
    },
    methods: {
        listenScal(e) {
            console.log(e)
            this.isShow = true
        },
        init() {
            this.$nextTick(() => {
                this.X = '-150'
                this.Y = '100'
                this.scales = 1
                this.isLaji = false
                setTimeout(() => {
                    this.isLaji = true
                }, 20)
            })

        },
        close() {
            if (this.$parseURL().url === 'platform-admin') {
                uni.redirectTo({
                    url: `../${this.$parseURL().url}/index`,
                })
                return
            }

            // this.$minRouter.push({
            //   name: this.$parseURL().url,
            // })
            uni.navigateBack({
                delta: 1,
            })
        },
        toDetail(id, status) {
            console.log(id, status)
            this.$minRouter.push({
                name: 'platform-detail',
                params: {
                    id,
                    status,
                    date: this.$store.state.status.myDate
                },
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.seat {
    .mains {
        width: 100vw;
        height: 100vh;
        position: relative;
    }

    .max {
        width: auto;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .main {
        width: 1286rpx;
        height: 910rpx;
        background-repeat: no-repeat;
        background-size: contain;
        transform: rotate(90deg) scale(0.7);
        position: relative;
    }

    .item {
        background-repeat: no-repeat;
        position: absolute;
        transform: scale(0.5);
        transform-origin: 0 0 0;
    }

    .close {
        position: fixed;
        right: 20rpx;
        top: 80rpx;
        width: 50rpx;
        height: 50rpx;
        font-size: 40rpx;
        font-weight: bold;
        transform: rotate(90deg);
    }

    .sassdds {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 0 0;
        position: absolute;
        left: -80rpx;
    }

    .huifu {
        position: fixed;
        left: 20rpx;
        bottom: 80rpx;
        width: auto;
        height: 50rpx;
        transform: rotate(90deg);
        border-radius: 50rpx;
        background-color: #eee;
        color: #3276fd;
        padding: 0 20rpx;
        font-size: 24rpx;
        line-height: 50rpx;
        // background-image: url('/static/images/s.png');
        // background-size: contain;
        // background-repeat: no-repeat;
    }
}
</style>
