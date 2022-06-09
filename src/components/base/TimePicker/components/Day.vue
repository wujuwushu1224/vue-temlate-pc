<template>
  <div class="dayComponent">
    <div class="timeType" v-if="timeType">{{ timeTypeText }}</div>
    <div class="timeRangeHead">
      <span class="icons">
        <i
          class="el-icon-arrow-left"
          style="fontSize:21px"
          @click="reduceYearClick(currentYear)"
        ></i>
        <i
          class="el-icon-arrow-left"
          @click="reduceMonthClick(currentMonth)"
        ></i>
      </span>
      <span>{{ currentYear }}年 {{ currentMonth }} 月</span>
      <span class="icons">
        <i class="el-icon-arrow-right" @click="addMonthClick(currentMonth)"></i>
        <i
          class="el-icon-arrow-right"
          style="fontSize:21px"
          @click="addYearClick(currentYear)"
        ></i>
      </span>
    </div>
    <div class="timeRangeContent">
      <div
        class="timeItem"
        v-for="item in dayList"
        :class="{
          timeItemActive:
            currentYear + '-' + currentMonth + '-' + item.value === currentTime,
        }"
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
      currentYear: '2020',
      currentMonth: '08',
      currentDay: '',
      currentTime: '',
    }
  },
  props: {
    time: {
      type: String,
    },
    timeType: {
      type: String,
    },
    currentTimeType: {
      type: String,
    },
  },
  computed: {
    dayList() {
      let monthDayNum
      switch (this.currentMonth) {
        case '01':
          monthDayNum = 31
          break
        case '02':
          if (this.runNian(this.currentYear)) {
            monthDayNum = 29
          } else {
            monthDayNum = 28
          }
          break
        case '03':
          monthDayNum = 31
          break
        case '04':
          monthDayNum = 30
          break
        case '05':
          monthDayNum = 31
          break
        case '06':
          monthDayNum = 30
          break
        case '07':
          monthDayNum = 31
          break
        case '08':
          monthDayNum = 31
          break
        case '09':
          monthDayNum = 30
          break
        case '10':
          monthDayNum = 31
          break
        case '11':
          monthDayNum = 30
          break
        case '12':
          monthDayNum = 31
          break
      }
      let days = []
      for (let index = 1; index <= monthDayNum; index++) {
        days.push({
          label: `${index}`,
          value: index < 10 ? `0${index}` : `${index}`,
        })
      }
      return days
    },
  },
  created() {},
  mounted() {
    if (this.currentTimeType === '日度') {
      this.currentTime = this.time
      this.currentYear = this.time.substr(0, 4)
      this.currentMonth = this.time.substr(5, 2)
      this.currentDay = this.time.substr(8, 2)
    }
    this.timeTypeText = this.timeType === 'start' ? '开始时间' : '结束时间'
  },
  watch: {},
  methods: {
    runNian(_year) {
      if (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)) {
        return true
      } else {
        return false
      }
    },
    reduceYearClick(val) {
      if (Number(val) === 1) {
        return
      }
      this.currentYear = `${Number(val) - 1}`
    },
    reduceMonthClick(val) {
      if (Number(val) === 1) {
        return
      }
      this.currentMonth =
        Number(val) - 1 < 10 ? `0${Number(val) - 1}` : `${Number(val) - 1}`
    },
    addYearClick(val) {
      if (Number(val) === 9999) {
        return
      }
      this.currentYear = `${Number(val) + 1}`
    },
    addMonthClick(val) {
      if (Number(val) === 12) {
        return
      }
      this.currentMonth =
        Number(val) + 1 < 10 ? `0${Number(val) + 1}` : `${Number(val) + 1}`
    },
    chooseClick(dayObj) {
      this.currentDay = dayObj.value
      this.currentTime =
        this.currentYear + '-' + this.currentMonth + '-' + this.currentDay
      if (this.timeType === 'start') {
        this.$emit('setStartTime', this.currentTime)
      } else {
        this.$emit('setEndTime', this.currentTime)
      }
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.dayComponent {
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
    margin-bottom: 15px;
    .icons {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  .timeRangeContent {
    display: flex;
    flex-wrap: wrap;
    // width: 360px;
    margin: 0 auto;
    .timeItem {
      // flex-shrink: 0;
      width: 40px;
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
