<template>
<view></view>
</template>

<script>
export default {
    onLoad() {
        // #ifdef APP-PLUS
        // if (!plus.runtime.isAgreePrivacy()) {
        //     uni.reLaunch({
        //         url: './yinsi/index'
        //     })
        //     return
        // }  
        // #endif
        this.$store.state.user.userInfo.apiAuth ? uni.reLaunch({
            url: './index/index'
        }) : uni.reLaunch({
            url: './login/index'
        })

    }
}
</script>
