<template>
  <div class="yearComponent">
    <div class="timeType">{{ timeTypeText }}</div>
    <div class="timeRangeHead">
      <i class="el-icon-arrow-left" @click="reduceClick()"></i>
      <span>{{ rangeStartYear }}年 - {{ rangeStartYear + 9 }}年</span>
      <i class="el-icon-arrow-right" @click="addClick()"></i>
    </div>
    <div class="timeRangeContent">
      <div
        class="timeItem"
        v-for="item in timeList"
        :class="{ timeItemActive: item.value == currentYear }"
        :key="item.value"
        @click="chooseClick(item)"
      >
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeTypeText: '',
      rangeStartYear: 2020,
      currentYear: 0
    };
  },
  props: {
    time: {
      type: String
    },
    timeType: {
      type: String
    },
    currentTimeType: {
      type: String
    }
  },
  computed: {
    timeList() {
      let arr = [];
      for (let index = 0; index < 10; index++) {
        arr.push({
          label: this.rangeStartYear + index,
          value: this.rangeStartYear + index
        });
      }
      return arr;
    }
  },
  created() {},
  mounted() {
    if (this.currentTimeType === '年度') {
      this.currentYear = Number(this.time);
    }
    this.timeTypeText = this.timeType === 'start' ? '开始时间' : '结束时间';
  },
  watch: {},
  methods: {
    reduceClick() {
      this.rangeStartYear = this.rangeStartYear - 10;
    },
    addClick() {
      this.rangeStartYear = this.rangeStartYear + 10;
    },
    chooseClick(val) {
      this.currentYear = val.value;
      if (this.timeType === 'start') {
        this.$emit('setStartTime', `${this.currentYear}`);
      } else {
        this.$emit('setEndTime', `${this.currentYear}`);
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.yearComponent {
  width: 100%;
  height: 100%;
  .timeType {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #000;
    font-weight: 600;
  }
  .timeRangeHead {
    text-align: center;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 15px;
    i {
      cursor: pointer;
    }
  }
  .timeRangeContent {
    display: flex;
    flex-wrap: wrap;
    .timeItem {
      flex-shrink: 0;
      width: 80px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      cursor: pointer;
      box-sizing: border-box;
      &:hover {
        > span {
          display: inline-block;
          background: $light-blue;
          color: #fff;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border-radius: 4px;
        }
      }
    }
    .timeItemActive {
      > span {
        display: inline-block;
        background: $light-blue;
        color: #fff;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        border-radius: 4px;
      }
    }
  }
}
</style>
