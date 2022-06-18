<template>
  <div class="dashboard-container app-container"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {},
  comments: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['roles']),
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.dashboard-container {
}
</style>
