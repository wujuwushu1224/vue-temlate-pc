<template>
  <div
    :class="['thumb', { isBot }]"
    :style="{ left: left + 'px', top: top + 'px', bottom: bottom + 'px' }"
  />
</template>

<script>
export default {
  name: 'IconSvg',
  props: {
    left: {
      type: Number,
      default: 332,
    },
    top: {
      type: Number,
      default: -6,
    },
    bottom: {
      type: Number,
      default: -6,
    },
    isBot: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.thumb {
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-left: 1px solid #fff;
  border-top: 1px solid #fff;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    background-color: #006986;
  }
  transform: rotate(45deg);
  &.isBot {
    top: auto !important;
    bottom: 0;
    background-color: #161a4d;
    border: none;
    border-right: 1px solid $light-blue;
    border-bottom: 1px solid $light-blue;
  }
}
</style>
