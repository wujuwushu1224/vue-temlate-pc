<template>
  <div class="dashboard-container app-container">
    首页
    <div class="amap-box">
      <AMap :hasToolBar='false'></AMap>
    </div>
  </div>
</template>

<script>
import AMap from '../../components/AMap/index.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    AMap,
  },
  comments: {},
  data() {
    return {
      currentRole: 'adminDashboard',
    }
  },
  computed: {
    ...mapGetters(['roles']),
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  .amap-box {
    height: 300px;
    width: 300px;
  }
}
</style>
