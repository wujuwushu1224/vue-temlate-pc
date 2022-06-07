
const dateFormat = (originVal, isSecond) => { // 日期格式化
  if (originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return isSecond ? `${y}-${m}-${d} ${hh}:${mm}:${ss}` : `${y}-${m}-${d}`
  }
  return '-'
}
const toThousands = (originVal, unit, num = 0, isLine) => { // 数字千分位
  if (originVal) {
    (num || num === 0) && (originVal = toDecimal(originVal, num))//保留两位小数
    if (!originVal) {
      return originVal
    }
    // 如果单位是% ，且值为负数，就转成-
    if (unit === '%' && originVal < 0) {
      return '-'
    }
    const str = originVal.toString()
    const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return unit ? str.replace(reg, '$1,') + unit : str.replace(reg, '$1,')
  }
  if (originVal === 0) {
    return unit ? 0 + unit : 0
  }
  if (isLine) {
    return originVal
  }
  return originVal || '-'
}
const toDecimal = (x, n = 2) => { // 保留小数,默认取2位
  const num = [1, 10, 100, 1000, 10000, 100000][n]
  let f = parseFloat(x)

  if (isNaN(f)) {
    return x || '-'
  }
  f = Math.round(x * num) / num
  return f === 0 ? 0 : (f || '-')

}
const tableFormat = (originVal) => {
  if (originVal) {
    if (typeof originVal === 'number') {
      return toDecimal(originVal)
    } else {
      return originVal
    }
  } else {
    return '-'
  }
}
const baseFilter = (originVal, filters) => { // 自定义的过滤器
  if (filters) {
    const reg = filters.match(/\((.*)\)/)
    const unit = reg ? reg[1] : ''
    const expression = filters.match(/[^\(\)]+/g)[0]
    return eval(expression)(originVal, unit)
  } else {
    return originVal || '-'
  }
}
const clearSemicolon = (originVal) => { //去掉；
  if (originVal) {
    var str = originVal.toString()
    if (str.indexOf(';') !== -1) {
      return originVal.replace(/;/g, '')
    } else {
      return originVal
    }
  }
}
export { dateFormat, toThousands, toDecimal, baseFilter, clearSemicolon, tableFormat }

