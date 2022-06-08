<template>
  <div class="popup-box">
    <el-popover
      :visible-arrow="false"
      ref="popover"
      v-model="isDown"
      :width="popWidth"
      trigger="click"
      @hide="cancel"
    >
      <Arrow :left="arrowLeft" />
      <slot name="popupCont" />
      <div slot="reference" class="selectorData">
        <slot name="reference" />
      </div>
    </el-popover>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Arrow from '../BaseArrow/index.vue';
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { Arrow },
  model: {
    prop: 'show',
    event: 'changeShow'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    curCityName: {
      type: String,
      default: ''
    },
    popWidth: {
      type: Number,
      default: 270
    },
    arrowLeft: {
      type: Number,
      default: 100
    }
  },
  data() {
    // 这里存放数据
    return {
      searchVal: '',
      isDown: false
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapState('localData', ['cityList'])
  },
  // 监控data中的数据变化
  watch: {
    isDown(cur) {
      this.$emit('changeShow', cur);
    },
    show(cur) {
      this.isDown = cur;
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    cancel() {}
  }
};
</script>
<style scoped lang="scss">
//@import url(); 引入公共css类
.popup-box {
  display: flex;
  align-items: center;
}
</style>
