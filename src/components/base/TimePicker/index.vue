<template>
  <el-popover
    :visible-arrow="false"
    v-model="isDown"
    popper-class="timerPopper"
    trigger="click"
    @hide="cancel"
    @show="showCalendar"
  >
    <Arrow :left="arrowLeft" />
    <div class="calendarBox">
      <div class="box-left">
        <div class="itemTitle">时间选择</div>
        <template v-for="(item, index) in availableTypes">
          <div
            :key="index"
            v-if="availableTypes.includes(item)"
            class="typeItem"
            :class="{ typeItemActive: temporaryTimeType === item }"
            @click="selectTimeType(item)"
          >
            {{ item }}
          </div>
        </template>
      </div>
      <div class="box-right">
        <div class="timeBox">
          <div class="startTimeBox">
            <Day
              v-if="temporaryTimeType === '日度'"
              ref="sDay"
              time-type="start"
              :time="startTime"
              :current-time-type="currentTimeType"
              @setStartTime="setStartTime"
            />
            <Month
              v-if="temporaryTimeType === '月度'"
              ref="sMonth"
              time-type="start"
              :time="startTime"
              :current-time-type="currentTimeType"
              @setStartTime="setStartTime"
            />
            <Year
              v-if="temporaryTimeType === '年度'"
              ref="sYear"
              time-type="start"
              :time="startTime"
              :current-time-type="currentTimeType"
              @setStartTime="setStartTime"
            />
          </div>
          <div class="endTimeBox">
            <Day
              v-if="temporaryTimeType === '日度'"
              ref="eDay"
              time-type="end"
              :time="endTime"
              :current-time-type="currentTimeType"
              @setEndTime="setEndTime"
            />
            <Month
              v-if="temporaryTimeType === '月度'"
              ref="eMonth"
              time-type="end"
              :time="endTime"
              :current-time-type="currentTimeType"
              @setEndTime="setEndTime"
            />
            <Year
              v-if="temporaryTimeType === '年度'"
              ref="eYear"
              time-type="end"
              :time="endTime"
              :current-time-type="currentTimeType"
              @setEndTime="setEndTime"
            />
          </div>
        </div>
        <div class="timeSureBox">
          <div class="cancelBtn" @click="cancel">取消</div>
          <div class="sureBtn" @click="sure">确定</div>
        </div>
      </div>
    </div>
    <div ref="timePicker" slot="reference" class="timePicker" tabindex="0">
      <!-- <i class="iconfont icon-biaoge" /> -->
      <span v-if="showLabel" class="attr">时间：</span>
      <span class="attrValue"
        >{{ currentTimeType }} | {{ startTime }} 至 {{ endTime }}</span
      >
      <i class="el-icon-arrow-down" :class="isDown ? 'active' : ''" />
    </div>
  </el-popover>
</template>

<script>
import Arrow from '../BaseArrow/index.vue'
import Day from './components/Day.vue'
import Year from './components/Year.vue'
import Month from './components/Month.vue'

export default {
  name: 'TimePicker',
  components: {
    Day,
    Year,
    Month,
    Arrow,
  },
  props: {
    showLabel: {
      type: Boolean,
      default: () => {
        return true
      },
    },
    // startTime  endTime 时间格式为 yyyy-mm-dd
    arrowLeft: {
      type: Number,
      default: () => {
        return 100
      },
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    timeType: {
      type: String,
      default: '日度',
    },
    availableTypes: {
      type: Array,
      default: () => ['日度', '月度', '年度'],
    },
  },
  data() {
    return {
      // temporary 临时
      isDown: false,
      timeTypeList: [
        { label: '日度', value: 'day' },
        { label: '月度', value: 'month' },
        { label: '年度', value: 'year' },
      ],
      currentTimeType: '日度',
      temporaryTimeType: '', // 临时选中的时间类型  组件关闭时,清空
      temporaryStartTime: '', // 临时选中的开始时间
      temporaryEndTime: '', //  临时选中的结束时间
      finalStartTime: '', // 最终开始时间
      finalEndTime: '', // 最终结束时间
    }
  },
  computed: {},
  watch: {},
  created() {
    this.temporaryTimeType = this.currentTimeType = this.timeType
  },
  mounted() {},
  methods: {
    // openTimerPicker() {
    //     this.isDown = !this.isDown
    // },
    selectTimeType(type) {
      let obj = {
        日度: 'day',
        月度: 'month',
        年度: 'year',
      }
      this.temporaryTimeType = this.timeTypeList.find(
        (item) => item.value === obj[type]
      ).label
      this.temporaryStartTime = ''
      this.temporaryEndTime = ''
    },
    setStartTime(val) {
      this.temporaryStartTime = val
    },
    setEndTime(val) {
      this.temporaryEndTime = val
    },
    showCalendar() {
      this.temporaryTimeType = this.currentTimeType
    },
    cancel() {
      if (this.temporaryTimeType === '日度') {
        this.$refs.sDay.currentTime = this.startTime
        this.$refs.sDay.currentYear = this.startTime.substr(0, 4)
        this.$refs.sDay.currentMonth = this.startTime.substr(5, 2)
        this.$refs.sDay.currentDay = this.startTime.substr(8, 2)
        this.$refs.eDay.currentTime = this.endTime
        this.$refs.eDay.currentYear = this.endTime.substr(0, 4)
        this.$refs.eDay.currentMonth = this.endTime.substr(5, 2)
        this.$refs.eDay.currentDay = this.startTime.substr(8, 2)
      } else if (this.temporaryTimeType === '月度') {
        this.$refs.sMonth.currentTime = this.startTime
        this.$refs.sMonth.currentYear = this.startTime.substr(0, 4)
        this.$refs.sMonth.currentMonth = this.startTime.substr(5, 2)
        this.$refs.eMonth.currentTime = this.endTime
        this.$refs.eMonth.currentYear = this.endTime.substr(0, 4)
        this.$refs.eMonth.currentMonth = this.endTime.substr(5, 2)
      } else if (this.temporaryTimeType === '年度') {
        this.$refs.sYear.currentYear = this.startTime
        this.$refs.eYear.currentYear = this.endTime
      }
      this.close()
    },
    sure() {
      let timeObj = null
      if (this.currentTimeType === this.temporaryTimeType) {
        timeObj = {
          startTime: this.temporaryStartTime || this.startTime,
          endTime: this.temporaryEndTime || this.endTime,
          timeType: this.temporaryTimeType,
        }
      } else {
        timeObj = {
          startTime: this.temporaryStartTime,
          endTime: this.temporaryEndTime,
          timeType: this.temporaryTimeType,
        }
      }
      if (!timeObj.startTime) {
        this.$message.error('开始时间不能为空')
        return
      }
      if (!timeObj.endTime) {
        this.$message.error('结束时间不能为空')
        return
      }
      if (new Date(timeObj.startTime) > new Date(timeObj.endTime)) {
        this.$message.error('结束时间不能小于开始时间！')
        return
      }
      this.currentTimeType = this.temporaryTimeType
      this.$emit('setTime', timeObj)
      this.close()
    },
    close() {
      this.$children[0].showPopper = false
      this.isDown = false
    },
  },
}
</script>

<style lang="scss" scoped>
.calendarBox {
  display: flex;
  background: #fff;
  .box-left {
    // width: 150px;
    text-align: center;
    padding: 20px;
    font-size: 14px;
    border-right: 1px solid #eaeaea;
    .itemTitle {
      color: #13203e;
      margin: 20px 0 30px;
    }
    .typeItem {
      height: 36px;
      line-height: 36px;
      background: #f8fafc;
      color: #767e92;
      border-radius: 5px;
      margin-top: 10px;
      cursor: pointer;
      &:hover {
        background: $light-blue;
        color: #fff;
      }
    }
    .typeItemActive {
      background: $light-blue;
      color: #fff;
    }
  }
  .box-right {
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .timeBox {
      display: flex;
      height: calc(100% - 60px);
      .startTimeBox {
        width: 50%;
        // padding-top: 30px;
        border-right: 1px solid #eaeaea;
      }
      .endTimeBox {
        width: 50%;
        // padding-top: 30px;
      }
    }
    .timeSureBox {
      padding: 10px 0;
      border-top: 1px solid #eaeaea;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .cancelBtn,
      .sureBtn {
        width: 60px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border: 1px solid #eaeaea;
        border-radius: 4px;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          background: $light-blue;
          color: #fff;
        }
      }
      .sureBtn {
        background: $light-blue;
        color: #fff;
      }
    }
  }
}
.timePicker {
  // height: 56px;
  // display: flex;
  // align-items: center;
  cursor: pointer;
  > i {
    color: #7f8b95;
  }
  .attr {
    color: #7f8b95;
    // margin-left: 9px;
    font-size: 14px;
  }
  .attrValue {
    color: #282a34;
    line-height: 18px;
    font-size: 14px;
    margin-right: 10px;
    &:hover {
      color: $light-blue;
    }
  }
}
</style>
<style lang="scss">
.timerPopper {
  padding: 0;
}
</style>
