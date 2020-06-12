<template>
  <view class="about p-lr-20 p-tb-20">
      <min-data-show @change="changeCurrt" :ids="id" :list="list" :titles="titles" :right="rightA"/>
  </view>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      list: { },
      titles: [],
      rightA: true
    }
  },
methods: {
    // 营销订台业绩
    getYXdingtai(n,option){
      this.$minApi.getYXdingTai({
        date_range:n,
        condition:option
      }).then(res=>{
        this.list = res
        console.log(this.list);
      })
    },
    // 营销开台业绩统计
    getYXKaitaiToj(n,option){
        this.$minApi.getYXKaiTai({
          date_range:n,
          condition:option
        }).then(res=>{
          this.list = res
          console.log(this.list);
        })
    },
    //角色业绩统计
    getJSTj(e,option){
      this.$minApi.getJS({
          date_range:e,
          condition:option
      }).then(res=>{
        console.log(res)
         this.list = res
      })
    },
    // 无业绩人员名单
    getNoPerson(){
      this.$minApi.getNOList().then(res=>{
        console.log(res)
         this.list = res
      })
    },
    // 销售业绩统计
    getXIAOshowTJ(e,option){
        this.$minApi.getXISHOUDea({
            date_range:e,
            condition:option
        }).then(res=>{
          console.log(res)
           this.list = res
        })
    },
    // 角色销售业绩统计
    getXSJS(e,option){
      this.$minApi.getJSXSTJ({
        date_range:e,
        condition:option
      }).then(res=>{
        console.log(res)
          this.list = res
      })
    },
    // 单品销售统计
    getDPTj(e,option,sort){
      this.$minApi.getDPTj({
        date_range:e,
        condition:option ?option:'',
        order_field:sort ? 2: 1
      }).then(res=>{
        console.log(res)
        this.list = res
      })
    },
    // 套餐销售统计
    getTcTJ(e,option,sort){
      
      this.$minApi.getTCtj({
        date_range:e,
        condition:option ?option:'',
        order_field:sort ? 2: 1
      }).then(res=>{
        console.log(res)
        this.list = res
      })
    },
    changeCurrt(e){
      if(this.id === '0'){
        this.getYXdingtai(e)
      }else if(this.id === '1'){
        this.getYXKaitaiToj(e)
      }else if(this.id === '2'){
        this.getJSTj(e)
      }else if (this.id === '7'){
          this.getXSJS(e)
      }else if (this.id ===  '6'){
        this.getXIAOshowTJ(e)
      }else if (this.id ===  '4'){
        this.getDPTj(e)
      }else if (this.id ===  '5'){
        this.getTcTJ(e)
      }
    }
  },
  onLoad (option) {
    console.log(option)
    this.id = option.id
    switch (option.id) {
      case '0':
        uni.setNavigationBarTitle({
          title: '营销订台业绩统计'
        })
        this.getYXdingtai(0)
        this.titles = [{name:'姓名'}, {name:'手机号'}, {name:'业绩'}]
        break
      case '1':
        uni.setNavigationBarTitle({
          title: '营销开台业绩统计'
        })
        this.getYXKaitaiToj(0)
         this.titles = [{name:'姓名'}, {name:'订台'}, {name:'开台'}]
        break
      case '2':
        uni.setNavigationBarTitle({
          title: '角色业绩统计'
        })
        this.getJSTj(0)
        this.rightA = false
         this.titles = [{name:'角色'},{name: '开台'}, {name:'业绩'}]
        break
      case '3':
        uni.setNavigationBarTitle({
          title: '无业绩人员名单'
        })
        this.rightA = false
        this.getNoPerson()
          this.titles = [{name:'姓名'}, {name:'上次开台时间'}, {name:'连续无业绩天数'}]
        break
      case '4':
        uni.setNavigationBarTitle({
          title: '单品销售统计'
        })
        this.getDPTj(0)
         this.titles = [{name:'商品名'}, {name:'分类',showSet:true,animation:true},{name:'销量',showSet:true}, {name:'销售额',showSet:true}]
        break
      case '5':
        uni.setNavigationBarTitle({
          title: '套餐销售统计'
        })
           this.titles = [{name:'套餐名'}, {name:'销售',showSet:true}, {name:'销售额',showSet:true}]
        this.getTcTJ(0)
        break
      case '6':
        uni.setNavigationBarTitle({
          title: '销售业绩统计'
        })
        this.getXIAOshowTJ(0)
        this.titles = [{name:'姓名'}, {name:'角色',showSet:true}, {name:'业绩'}]
        break
      case '7':
        uni.setNavigationBarTitle({
          title: '角色销售业绩统计'
        })
        this.getXSJS(0)
        this.titles = [{name:'角色'}, {name:'业绩'}]
        break
      default:
    }
  }
}
</script>

<style>

</style>
