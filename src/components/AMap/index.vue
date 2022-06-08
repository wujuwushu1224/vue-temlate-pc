<template>
  <div ref="_chart" class="amap-warpper" />
</template>

<script>
export default {
  props: {
    hasToolBar: {
      type: Boolean,
      default: true,
    },
    viewMode: {
      type: String,
      default: '2D',
    },
    mapStyle: {
      type: String,
      default: 'amap://styles/d412ebc5232fe392632c95defc88b730',
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    hasWX: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasScale: false, // 比例尺
      amap: null, // 高德地图实例
      scaleOffsetX: 10,
      scaleOffsetY: 15,
      toolBarOffsetX: 10,
      toolBarOffsetY: 10,
    }
  },
  created() {},
  async mounted() {
    this.initChart()
  },
  beforeDestroy() {
    this.amap && this.amap.destroy()
  },
  methods: {
    initChart() {
      let that = this
      return new Promise((resolve) => {
        this.$nextTick(() => {
          const amap = new AMap.Map(this.$refs._chart, {
            viewMode: this.viewMode,
            mapStyle: this.mapStyle,
            zoom: 10,
            showLabel: this.showLabel,
            layers: this.hasWX
              ? [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()]
              : [],
            resizeEnable: true,
          })
          if (this.hasToolBar) {
            AMap.plugin(['AMap.ToolBar'], function() {
              // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
              let toolBar = new AMap.ToolBar({
                offset: new AMap.Pixel(
                  that.toolBarOffsetX,
                  that.toolBarOffsetY
                ),
              })
              amap.addControl(toolBar)
              //启动监听
              toolBar.on('location', function() {
                console.log(toolBar.getLocation())
              })
              toolBar.hideDirection() //隐藏方向盘
            })
          }
          if (this.hasScale) {
            AMap.plugin(['AMap.Scale'], function() {
              // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
              let scale = new AMap.Scale({
                offset: new AMap.Pixel(that.scaleOffsetX, that.scaleOffsetY),
              })
              amap.addControl(scale)
              //启动监听
            })
          }
          amap.on('complete', () => {
            this.amap = amap
            this.$emit('mapLoadComplete')
            resolve()
          })
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.amap-warpper {
  width: 100%;
  height: 100%;
  &::v-deep .amap-logo,
  &::v-deep .amap-copyright {
    right: 0 !important;
    left: auto !important;
    display: none !important;
  }
}
</style>
