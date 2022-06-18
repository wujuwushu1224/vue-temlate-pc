<template>
  <div class="map-list-container">
    <slot :handleUnfold="handleUnfold" name="left" />
    <slot :handleUnfold="handleUnfold" name="right" />
  </div>
</template>
<script>
export default {
  props: {
    layout: {
      type: Object,
    },
    isUnfold: {
      type: Boolean,
    },
    fixedWidth: {
      type: String,
      default: '500px',
    },
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    handleUnfold(item) {
      let width = this.isUnfold ? this.fixedWidth : 'calc(100% - 50px)'
      this.layout[item].width = width
      this.$emit('update:isUnfold', !this.isUnfold)
    },
  },
}
</script>
