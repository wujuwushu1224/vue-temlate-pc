<template>
  <div class="dashboard-container app-container">
    <div class="app-content">
      <div class="head-wrapper filter-tool-wrapper">
        <MultipleSelector
          :optionsList="optionList"
          @change="handleChange"
          class="filter-tool"
          ref="multipleSelector"
        >
          <span>多选框：</span>
          <span>{{ value }}</span>
        </MultipleSelector>
        <TimePicker
          class="filter-tool"
          :arrow-left="300"
          :start-time="startTime"
          :end-time="endTime"
          :available-types="['月度','日度','年度']"
          time-type="月度"
          @setTime="setTime"
        />
      </div>
      <MapList :cLayout="cLayout">
        <template #left>
          <AMap ref="mapChart" />
        </template>
        <template #right>
          列表
        </template>
      </MapList>
    </div>
  </div>
</template>

<script>
import AMap from '../../components/AMap/index.vue'
import MapList from '@/components/base/BaseMapList/index.vue'
import MultipleSelector from '../../components/base/MultipleSelector'
import TimePicker from '../../components/base/TimePicker'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    AMap,
    MapList,
    MultipleSelector,
    TimePicker,
  },
  comments: {},
  data() {
    return {
      startTime: '',
      endTime: '',
      optionList: [
        {
          checked: true,
          label: '鸡蛋',
          id: 1,
        },
        {
          checked: true,
          label: '牛排',
          id: 2,
        },
      ],
      value: '全部',
      cLayout: {
        left: {
          flex: 1,
        },
        right: {
          width: '550px',
        },
      },
      currentRole: 'adminDashboard',
    }
  },
  computed: {
    ...mapGetters(['roles']),
  },
  created() {
    this.initDate()
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {
    handleChange(item) {
      this.value = item.map((res) => res.label).join(',')
    },
    initDate() {
      // 近一年
      const date = new Date()
      const endTime = {
        year: date.getFullYear(),
        month:
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : `0${date.getMonth() + 1}`,
        day: new Date().getDate(),
      }
      const startTime = {
        year: date.getFullYear() - 1,
        month:
          date.getMonth() + 2 < 10
            ? `0${date.getMonth() + 2}`
            : `0${date.getMonth() + 2}`,
        day: '01',
      }
      this.startTime = startTime.year + '-' + startTime.month
      this.endTime = endTime.year + '-' + endTime.month
      this.dateStart =
        startTime.year + '-' + startTime.month + '-' + startTime.day
      this.dateEnd = endTime.year + '-' + endTime.month + '-' + endTime.day
    },
    setTime(date) {
      console.log(date)
      if (date.timeType === '年度') {
        this.dateStart = date.startTime + '-01' + '-01'
        this.dateEnd = date.endTime + '-12' + '-31'
      } else if (date.timeType === '月度') {
        const temp = date.endTime.split('-')
        this.dateStart = date.startTime + '-01'
        this.dateEnd =
          date.endTime + '-' + new Date(temp[0], temp[1], 0).getDate()
      }
      this.startTime = date.startTime
      this.endTime = date.endTime
    },
  },
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  .head-wrapper {
    height: 50px;
  }
  .amap-box {
    height: 300px;
    width: 300px;
  }
}
</style>
