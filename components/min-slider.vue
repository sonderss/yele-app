<template>
  <view class="min-slider">
    <slider block-color="#007aff" :block-size="blockSize" :value="value" @change="sliderChange" @changing="sliderChange" :step="step" :min="min" :max="max" />
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: [Number, String],
      default: 1
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 999
    },
    blockSize: {
      type: [Number, String],
      default: 18
    }
  },
  data () {
    return {

    }
  },
  methods: {
    sliderChange (e) {
      this.$emit('input', Number(e.detail.value))
    }
  }
}

</script>

<style>
.min-slider{
  width: 100%;
}
</style>
