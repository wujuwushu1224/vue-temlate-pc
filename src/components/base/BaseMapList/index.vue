<template>
  <MapListContainer :isUnfold.sync="isUnfold" :layout="layout">
    <template #left="{handleUnfold}">
      <div :style="layout.left" class="c-left">
        <div
          v-if="!layout.left.unfoldHide"
          class="unfold-btn-left"
          @click="handleUnfold('left')"
        >
          <div v-show="!isUnfold" class="unflod" />
          <div v-show="isUnfold" class="fold" />
        </div>
        <slot name="left" />
      </div>
    </template>
    <template #right="{handleUnfold}">
      <div :style="layout.right" class="c-right">
        <div
          v-if="!layout.right.unfoldHide"
          class="unfold-btn-right"
          @click="handleUnfold('right')"
        >
          <div v-show="!isUnfold" class="unflod" />
          <div v-show="isUnfold" class="fold" />
        </div>
        <slot name="right" />
      </div>
    </template>
  </MapListContainer>
</template>

<script>
import MapListContainer from './MapListContainer.vue'
export default {
  props: {
    layout: {
      type: Object,
      default: () => {
        return {
          left: {
            flex: 1,
            unfoldHide: true,
          },
          right: {
            width: '500px',
            unfoldHide: false,
            zIndex: 999
          },
        }
      },
    },
  },
  data() {
    return {
      isUnfold: false,
    }
  },
  components: {
    MapListContainer,
  },
}
</script>

<style lang="scss" scoped>
.map-list-container {
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;

  .c-left,
  .c-right {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: #fff;
    transition: 0.5s;
  }
  .unfold-btn-left {
    cursor: pointer;
    position: absolute;
    right: -18px;
    top: 50%;
    transform: translate(-100%, -50%);
    width: 18px;
    height: 46px;
    background: #0081cc;
    border-radius: 8px 0px 0px 8px;
    transform: rotate(180deg);
    z-index: 99;
    .unflod {
      &::before {
        content: '';
        width: 0;
        height: 0;
        border-right: 10px solid #fff;
        border-bottom: 7px solid transparent;
        border-top: 7px solid transparent;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .fold {
      &::before {
        content: '';
        width: 0;
        height: 0;
        border-left: 10px solid #fff;
        border-bottom: 7px solid transparent;
        border-top: 7px solid transparent;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .unfold-btn-right {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-100%, -50%);
    width: 18px;
    height: 46px;
    background: #0081cc;
    border-radius: 8px 0px 0px 8px;
    .unflod {
      &::before {
        content: '';
        width: 0;
        height: 0;
        border-right: 10px solid #fff;
        border-bottom: 7px solid transparent;
        border-top: 7px solid transparent;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .fold {
      &::before {
        content: '';
        width: 0;
        height: 0;
        border-left: 10px solid #fff;
        border-bottom: 7px solid transparent;
        border-top: 7px solid transparent;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
