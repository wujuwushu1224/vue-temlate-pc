<template>
  <div class="dashboard-container app-container">
    <div class="app-content">
      <MapList :cLayout="cLayout">
        <template #left>
          <AMap ref="mapChart" />
        </template>
        <template #right>
          列表
        </template>
      </MapList>
    </div>
  </div>
</template>

<script>
import AMap from '../../components/AMap/index.vue'
import MapList from '@/components/base/BaseMapList/index.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    AMap,
    MapList,
  },
  comments: {},
  data() {
    return {
      cLayout: {
        left: {
          flex: 1,
        },
        right: {
          width: '550px',
        },
      },
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
