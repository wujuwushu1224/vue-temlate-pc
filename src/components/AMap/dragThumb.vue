<template>
  <div class="dragLine">
    <div
      ref="dragCont"
      v-draggable="draggableValue"
      class="dragCont"
      :style="initProps"
    >
      <slot />
    </div>
    <div class="line horizontal" :style="horizontalLine" />
    <div class="line vertical" :style="verticalLine" />
  </div>
</template>
<script>
import { Draggable } from 'draggable-vue-directive';

export default {
  name: 'DragThumb',
  components: {},
  directives: {
    Draggable
  },
  props: {
    boundingElement: {
      //父元素范围内
      type: HTMLDivElement
    },
    rectRange: {
      // 托块活动范围
      type: Object,
      default: () => {
        return {};
      }
    },
    initData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    initPoint: {
      type: Object,
      default: () => {
        return {
          left: 0,
          top: 0
        };
      }
    }
  },
  data() {
    return {
      initMinTopPos: '',
      initMaxTopPos: '',
      initMaxLeftPos: '',
      dataInfo: {},
      curRect: {}, // 当前托块的位置
      endPoint: {},
      horizontalLine: {},
      verticalLine: {},
      draggableValue: {
        boundingElement: null,
        boundingRectMargin: {},
        onPositionChange: this.onPosChanged,
        onDragEnd: this.onDragEnd
      }
    };
  },
  computed: {
    initProps() {
      // 初始化滑块位置
      const { top, left } = this.curRect;
      if (top && left) {
        return `top:${top + 'px'};left:${left + 'px'}`;
      } else {
        return '';
      }
    }
  },
  watch: {
    initData: {
      handler(cur) {
        this.dataInfo = cur;
      },
      immediate: true,
      deep: true
    },
    rectRange: {
      handler(curRange) {
        // 可拖拽范围变化，滑块位置也需要更新
        this.draggableValue.boundingRectMargin = curRange;
        // this.updateThumbPosition()
      },
      deep: true
    },
    initPoint: {
      // 初始点
      handler(cur) {
        if (this.dataInfo.resetRect) {
          this.$nextTick(() => {
            // 复原原来的位置
            this.curRect = this.dataInfo.resetRect;
          });
        } else {
          this.initPointPosition();
        }
        this.computedMidPoint();
      },
      immediate: true
    },
    curRect: {
      handler(cur) {},
      deep: true,
      immediate: true
    },
    isShowInfo() {}
  },
  mounted() {
    this.draggableValue.boundingElement =
      this.boundingElement || this.$parent.$el;
    this.draggableValue.boundingRectMargin = this.rectRange;
    const thumbDom = this.$refs.dragCont;
    const { width, height } = window.getComputedStyle(thumbDom);
    // 滑块宽度
    const boxWidth = Number(width.replace('px', '').replace('px', ''));
    // 滑块高度
    const boxHeight = Number(height.replace('px', '').replace('px', ''));
    this.initMaxTopPos =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      boxHeight;
    this.initMaxLeftPos =
      (document.documentElement.clientWidth || document.body.clientWidth) -
      boxWidth;
    this.initMinTopPos = 60; // 导航条高度
  },
  methods: {
    // updateThumbPosition() {
    //   // 根据当前可移动的窗口范围，调整托块的位置
    //   const screenWidth =
    //     document.documentElement.clientWidth || document.body.clientWidth;
    //   const curRect = JSON.parse(JSON.stringify(this.curRect));
    //   let initLeft = curRect.left;
    //   const initTop = curRect.top;
    //   const { left, right } = this.rectRange;
    //   if (initLeft < left) {
    //     // 左侧范围
    //     initLeft = left + 20;
    //   }
    //   if (initLeft > screenWidth - right) {
    //     // 右侧范围
    //     initLeft = screenWidth - right;
    //   }
    //   if (this.curRect.left !== initLeft) {
    //     this.curRect = {
    //       left: initLeft,
    //       top: initTop
    //     };
    //     this.computedMidPoint();
    //   }
    // },
    initPosRect() {},
    initPointPosition() {
      // 初始偏移值

      // this.$nextTick(() => {
      //   const { top, left } = this.initPoint;
      //   // 默认右移0，上移500
      //   let defaultTop = top;
      //   let defaultLeft = left;
      //   const thumbDom = this.$refs.dragCont;
      //   const { width, height } = window.getComputedStyle(thumbDom);
      //   const w = Number(width.replace('px', '').replace('px', ''));
      //   const h = Number(height.replace('px', '').replace('px', ''));
      //   if (!w || !h) {
      //     const initTop =
      //       defaultTop < this.initMinTopPos
      //         ? this.initMinTopPos
      //         : defaultTop > this.initMaxTopPos
      //         ? this.initMaxTopPos
      //         : defaultTop;
      //     const leftSide = this.rectRange.left;
      //     const initLeft =
      //       defaultLeft < leftSide
      //         ? leftSide
      //         : defaultLeft > this.initMaxLeftPos
      //         ? this.initMaxLeftPos
      //         : defaultLeft;
      //     this.curRect = { top: initTop, left: initLeft };
      //     return;
      //   }
      //   const distanceX = defaultLeft + w;
      //   const screenWidth =
      //     document.documentElement.clientWidth || document.body.clientWidth;
      //   let { right: distanceRight, top: distanceTop } = this.rectRange;
      //   distanceTop += this.initMinTopPos; // 加上导航条顶部高度
      //   if (screenWidth - distanceX < distanceRight) {
      //     defaultLeft = left - w;
      //   }
      //   if (defaultTop < distanceTop) {
      //     defaultTop = distanceTop + 500;
      //   }
      //   const initTop =
      //     defaultTop < this.initMinTopPos
      //       ? this.initMinTopPos
      //       : defaultTop > this.initMaxTopPos
      //       ? this.initMaxTopPos
      //       : defaultTop;
      //   const leftSide = this.rectRange.left;
      //   const initLeft =
      //     defaultLeft < leftSide
      //       ? leftSide
      //       : defaultLeft > this.initMaxLeftPos
      //       ? this.initMaxLeftPos
      //       : defaultLeft;
      //   this.curRect = { top: initTop, left: initLeft };
      // });

      this.$nextTick(() => {
        const { top, left } = this.initPoint;
        const OFFSETVAL = 50;
        let defaultLeft = left - OFFSETVAL;
        let defaultTop = top - OFFSETVAL;
        const {
          left: leftRect,
          top: topRect
        } = this.draggableValue.boundingElement.getBoundingClientRect();
        const thumbDom = this.$refs.dragCont;
        const { width, height } = window.getComputedStyle(thumbDom);
        const w = Number(width.replace('px', '').replace('px', ''));
        const h = Number(height.replace('px', '').replace('px', ''));
        // 初始化位置边界判断
        defaultLeft = defaultLeft > leftRect ? defaultLeft : leftRect;
        defaultTop = defaultTop > topRect ? defaultTop : topRect;
        // TODO
        // defaultLeft = defaultLeft - w / 2 > 0 ? defaultLeft : defaultLeft - w / 2;
        // defaultTop = defaultTop - h / 2 > 0 ? defaultTop : defaultTop - h / 2;
        this.curRect = { top: defaultTop, left: defaultLeft };
      });
    },
    computedMidPoint() {
      // 根据滑块位置计算两根线
      this.$nextTick(() => {
        const thumbDom = this.$refs.dragCont;
        const { width, height } = window.getComputedStyle(thumbDom);
        const {
          left: leftRect,
          top: topRect
        } = this.draggableValue.boundingElement.getBoundingClientRect();
        const w = Number(width.replace('px', '')) / 2;
        const h = Number(height.replace('px', '')) / 2;
        const { left: L1, top: T1 } = this.initPoint;
        let { left: L2, top: T2 } = this.curRect;
        L2 = L2 - leftRect;
        T2 = T2 - topRect;
        // 定位到滑块中心点
        L2 += w;
        T2 += h;
        // console.log('中心点', L1, T1);
        // console.log('rect位置', L2, T2);
        // console.log('rect宽高', w, h);
        if (L1 > L2 && T1 > T2) {
          // 左上
          this.horizontalLine = {
            top: Math.max(T1, T2) + 'px',
            left: Math.min(L1, L2) + 'px',
            width: Math.abs(L1 - L2) + 'px'
          };
          this.verticalLine = {
            left: Math.min(L1, L2) + 'px',
            top: Math.min(T1, T2) + 'px',
            height: Math.abs(T1 - T2) + 'px'
          };
        } else if (L1 < L2 && T1 < T2) {
          // 右下
          this.horizontalLine = {
            top: Math.min(T1, T2) + 'px',
            left: Math.min(L1, L2) + 'px',
            width: Math.abs(L1 - L2) + 'px'
          };
          this.verticalLine = {
            left: Math.max(L1, L2) + 'px',
            top: Math.min(T1, T2) + 'px',
            height: Math.abs(T1 - T2) + 'px'
          };
        } else if (L1 < L2 && T1 > T2) {
          // 右上
          this.horizontalLine = {
            top: Math.max(T1, T2) + 'px',
            left: Math.min(L1, L2) + 'px',
            width: Math.abs(L1 - L2) + 'px'
          };
          this.verticalLine = {
            left: Math.max(L1, L2) + 'px',
            top: Math.min(T1, T2) + 'px',
            height: Math.abs(T1 - T2) + 'px'
          };
        } else {
          // 左下
          this.horizontalLine = {
            top: Math.min(T1, T2) + 'px',
            left: Math.min(L1, L2) + 'px',
            width: Math.abs(L1 - L2) + 'px'
          };
          this.verticalLine = {
            left: Math.min(L1, L2) + 'px',
            top: Math.min(T1, T2) + 'px',
            height: Math.abs(T1 - T2) + 'px'
          };
        }
      });
    },
    onPosChanged(positionDiff, absolutePosition) {
      if (absolutePosition) {
        this.curRect = JSON.parse(JSON.stringify(absolutePosition));
        this.computedMidPoint();
      }
    },
    onDragEnd() {}
  }
};
</script>

<style scoped lang="scss">
.dragLine {
  .dragCont {
    position: fixed;
    z-index: 999;
    cursor: pointer;
  }

  .line {
    position: absolute;
    z-index: 998;

    &.horizontal {
      height: 1px;
      background-image: linear-gradient(
        to right,
        #006fbe 0%,
        #006fbe 50%,
        transparent 50%
      );
      background-size: 8px 1px;
      background-repeat: repeat-x;
    }

    &.vertical {
      background-image: linear-gradient(
        to bottom,
        #006fbe 0%,
        #006fbe 50%,
        transparent 50%
      );
      background-repeat: repeat-y;
      background-size: 1px 8px;
      width: 1px;
    }
  }
}
</style>
