<template>
    <div class="home">
        <h4>首页</h4>
    </div>
</template>

<script>
  export default {
    name: "index",
    mounted() {
      this.getCityInfoList()
    },
    methods:{
      getCityInfoList(){
        this.$api.getCityInfoList().then(res=>{
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>

</style>
