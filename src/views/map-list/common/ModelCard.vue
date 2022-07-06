<template>
  <div class="model-card">
    <div class="top">
      <span>{{ data['城市名称'] }}</span>
      <span @click="close">关闭</span>
    </div>
    <div class="tip-wrap">
      <div>
        <span class="f2">模型结论：</span>
        <span class="f3">{{ data['城市评级'] }}</span>
        <i style="margin-left:8px" class="el-icon-question"></i>
      </div>
      <div>
        <span class="f1">排名：</span><span>{{ data['排名'] }}</span>
      </div>
      <!-- <div>
        <span class="f1">时间：</span
        ><span>{{ new Date().getFullYear() }}年</span>
      </div> -->
    </div>
    <div class="table-head-wrap">
      <table border="0" cellspacing="0">
        <thead>
          <tr>
            <th width="100">分类</th>
            <th width="60">数值</th>
            <th width="60">权重</th>
            <th width="60">得分</th>
            <th width="60">排名</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="table-body-wrap">
      <table>
        <tbody>
          <template v-for="(item, key) in modelData">
            <tr :key="key">
              <th>{{ key }}</th>
              <th />
              <th />
              <th />
              <th />
            </tr>
            <template v-for="(it, index) in item">
              <tr :key="it['分类'] + index">
                <td width="100">
                  <span style="padding:0 10px">{{ it['分类'] }}</span>
                  <span v-if="it['单位']">({{ it['单位'] }})</span>
                </td>
                <td width="60">{{ it['数值'] }}</td>
                <td width="60">{{ it['权重'] }}</td>
                <td width="60">{{ it['得分'] }}</td>
                <td width="60">{{ it['排序'] }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    propList: {
      type: Array,
      default: () => {
        return []
      },
    },
    data: {
      type: [Array, Object],
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    modelData() {
      const del = this.data.detail
        .map((item) => item['大分类'])
        .reduce((list, item) => {
          if (!list.includes(item)) {
            list.push(item)
          }
          return list
        }, [])
      const obj = {}
      for (const item of del) {
        obj[item] = []
      }
      this.data.detail.forEach((item) => {
        obj[item['大分类']].push(item)
      })
      return obj
    },
  },
  created() {},
  methods: {
    close() {
      this.$emit('close', true)
    },
  },
}
</script>
<style lang="scss" scoped>
.model-card {
  background-color: #fff;
  border-radius: 4px 4px 0px 0px;
  box-shadow: 0px 8px 20px 0px rgba(127, 142, 150, 0.15);
  font-size: 12px;
  width: 366px;
  .f1 {
    color: #8ea6c1;
  }
  .f2 {
    color: #43588f;
  }
  .f3 {
    color: #00cccc;
  }
  .top,
  .tip-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 40px;
    background: linear-gradient(90deg, #007cc8 0%, #63b4e6 100%);
    border-radius: 4px 4px 0px 0px;
    > span:first-child {
      max-width: 300px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    > span {
      color: #fff;
      font-weight: bold;
      font-size: 14px;
    }
  }
  .tip-wrap {
    margin: 12px 0;
    overflow: hidden;
    display: flex;
  }
  .table-head-wrap {
    border-bottom: 1px solid #d9d9d9;
    table {
      border-collapse: collapse;
      width: 100%;
      tr {
        height: 40px;
        border-bottom: 1px solid #e7eff8;
      }
      thead {
        tr {
          color: #43588f;
          background: #e7f3ff;
          th:first-child {
            border-radius: 4px 0px 0px 0px;
          }
          th:last-child {
            border-radius: 0px 4px 0px 0px;
          }
        }
      }
    }
  }
  .table-body-wrap {
    height: 300px;
    overflow: auto;
    table {
      border-collapse: collapse;
      width: 100%;
      tr {
        height: 40px;
        border-bottom: 1px solid #e7eff8;
      }
      tbody {
        tr {
          th {
            background: #f7fafd;
          }
          td {
            font-size: 12px;
            color: #43588f;
            line-height: 16px;
            text-align: center;
          }
        }
      }
    }
  }
  .foot {
    padding-top: 10px;
    padding-bottom: 16px;
  }
}
</style>
