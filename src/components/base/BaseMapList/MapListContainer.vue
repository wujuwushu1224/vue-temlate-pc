<template>
  <div class="map-list-container">
    <slot name="left" />
    <slot name="right" />
  </div>
</template>
<script>
export default {
  props: {
    layout: {
      type: Object,
      default: () => {
        return {
          right: '500px',
        }
      },
    },
  },
  data() {
    return {
      isUnfold: false,
      c_layout: {},
    }
  },
  created() {
    Object.assign(this.c_layout, this.layout)
  },
  methods: {
    handleUnfold() {
      this.isUnfold = !this.isUnfold
      if (this.isUnfold) {
        this.c_layout.right = 'calc(100% - 50px)'
      } else {
        this.c_layout.right = this.layout.right
      }
    },
  },
}
</script>
<style lang="scss"></style>
