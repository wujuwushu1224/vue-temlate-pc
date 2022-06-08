<template>
  <MapListContainer>
    <template #left>
      <div :style="cLayout.left" class="c-left">
        <slot name="left" />
      </div>
    </template>
    <template #right>
      <div :style="cLayout.right" class="c-right">
        <slot name="right" />
      </div>
    </template>
  </MapListContainer>
</template>

<script>
import MapListContainer from './MapListContainer.vue';
export default {
  props: {
    cLayout: {
      type: Object,
      default: () => {
        return {
          left: {
            width: '500px'
          },
          right: {
            flex: 1
          }
        };
      }
    }
  },
  components: {
    MapListContainer
  }
};
</script>

<style lang="scss" scoped>
.map-list-container {
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  .c-left {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: #fff;
  }
  .c-right {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: #fff;
    background: #fff;
  }
}
</style>
