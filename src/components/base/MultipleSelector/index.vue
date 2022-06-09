<template>
  <div class="popup-box">
    <BasePopup v-model="show" :arrow-left="80" :pop-width="160">
      <div slot="popupCont" class="selector-wrapper">
        <el-autocomplete
          v-if="showSearch"
          clearable
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <i class="el-input__icon el-icon-search" slot="prefix"></i>
        </el-autocomplete>
        <div class="selector-list-box">
          <el-checkbox
            v-model="checkAll"
            class="allSelector"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="checkedOptions"
            @change="handleCheckedOptionsChange"
          >
            <el-checkbox
              v-for="(option, index) in optionsList"
              :key="index"
              :label="option.label"
            />
          </el-checkbox-group>
        </div>
        <el-button class="sureBtn" @click="sureBtn">确定</el-button>
      </div>
      <div slot="reference">
        <slot />
        <i class="el-icon-arrow-down" :class="show ? 'active' : ''"> </i>
      </div>
    </BasePopup>
  </div>
</template>

<script>
import BasePopup from '@/components/base/BasePopup'
export default {
  components: { BasePopup },
  props: {
    optionsList: {
      type: Array,
      default: () => {
        return [
          {
            checked: false,
            label: '鸡蛋',
            id: 1,
          },
          {
            checked: false,
            label: '牛排',
            id: 2,
          },
        ]
      },
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show: false,
      isDown: false,
      checkAll: false,
      checkedOptions: [],
      checkeObjOptions: [],
      state: '',
    }
  },
  watch: {
    checkedOptions: {
      handler(cur) {
        this.checkeObjOptions = this.optionsList.filter((res) =>
          cur.includes(res.label)
        )
      },
      deep: true,
    },
    optionsList: {
      handler(cur) {
        this.checkedOptions = cur
          .filter((res) => res.checked)
          .map((res) => res.label)
        this.checkAll = this.checkedOptions.length === cur.length
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  methods: {
    sureBtn() {
      this.$emit('change', this.checkeObjOptions)
      this.show = false
    },
    handleCheckAllChange(val) {
      this.checkedOptions = val
        ? this.optionsList.map((item) => item.label)
        : []
    },
    handleCheckedOptionsChange(val) {
      this.checkAll = val.length === this.optionsList.length
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.optionsList.map((item) => ({
        ...item,
        value: item.label,
      }))
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      console.log(results)
      cb(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      // console.log(item);
      if (!this.checkedOptions.includes(item.label)) {
        this.checkedOptions.push(item.label)
      }
      // console.log(this.checkedOptions);
    },
  },
}
</script>

<style lang="scss" scoped>
.selector-wrapper {
  .selector-list-box {
    margin-top: 10px;
    padding: 0;
    max-height: 300px;
    overflow-y: auto;
    .allSelector {
      margin-top: 0px !important;
    }
    /deep/ .el-checkbox {
      display: flex;
      align-items: center;
      margin-top: 18px;
      .el-checkbox__label {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }
    }
  }
  .sureBtn {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 18px auto 0;
    background: $light-blue;
    color: #fff;
  }
}
.selector-list-box {
  margin-top: 10px;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
  .allSelector {
    margin-top: 0px !important;
  }
  /deep/ .el-checkbox {
    display: flex;
    align-items: center;
    margin-top: 18px;
    .el-checkbox__label {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }
  }
}
</style>
