<template>
  <div class="monthComponent">
    <div class="timeType" v-if="timeType">{{ timeTypeText }}</div>
    <div class="timeRangeHead" :style="{ marginTop: timeType ? '0' : '22px' }">
      <i class="el-icon-arrow-left" @click="reduceClick()"></i>
      <span>{{ currentYear }}年</span>
      <i class="el-icon-arrow-right" @click="addClick()"></i>
    </div>
    <div class="timeRangeContent">
      <div
        class="timeItem"
        :class="{
          timeItemActive: currentYear + '-' + item.value === currentTime
        }"
        v-for="(item, index) in timeList"
        :key="index"
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
      timeList: [
        { label: '一月', value: '01' },
        { label: '二月', value: '02' },
        { label: '三月', value: '03' },
        { label: '四月', value: '04' },
        { label: '五月', value: '05' },
        { label: '六月', value: '06' },
        { label: '七月', value: '07' },
        { label: '八月', value: '08' },
        { label: '九月', value: '09' },
        { label: '十月', value: '10' },
        { label: '十一月', value: '11' },
        { label: '十二月', value: '12' }
      ],
      currentTime: '',
      currentYear: '2020',
      currentMonth: ''
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
  computed: {},
  created() {},
  mounted() {
    if (this.currentTimeType === '月度') {
      this.currentTime = this.time;
      this.currentYear = this.time.substr(0, 4);
      this.currentMonth = this.time.substr(5, 2);
    }
    this.timeTypeText = this.timeType === 'start' ? '开始时间' : '结束时间';
  },
  watch: {},
  methods: {
    reduceClick() {
      this.currentYear = Number(this.currentYear) - 1;
      this.currentTime = this.currentYear + '-' + this.currentMonth;
    },
    addClick() {
      this.currentYear = Number(this.currentYear) + 1;
      this.currentTime = this.currentYear + '-' + this.currentMonth;
    },
    chooseClick(monthObj) {
      this.currentMonth = monthObj.value;
      this.currentTime = this.currentYear + '-' + this.currentMonth;
      if (!this.timeType || this.timeType === 'start') {
        this.$emit('setStartTime', this.currentTime);
      } else {
        this.$emit('setEndTime', this.currentTime);
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.monthComponent {
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
