function uuid() {
  // uuid
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
function randomColor(){
  // 随机颜色

  return '#'+(function(h){

    return new Array(7-h.length).join("0")+h

  })((Math.random()*0x1000000<<0).toString(16))
}
function rgbaColor(a){
  // 随机rgba颜色
  let r = Math.floor(Math.random()*256);
  let g = Math.floor(Math.random()*256);
  let b = Math.floor(Math.random()*256);
  if(a){
    a = Math.random().toFixed(2);
  }
  let rgba = `rgba(${r},${g},${b},${a})`;
  return rgba;
}
function fixed2(val){
  // 保留两位小数
  const num = Number(val)
  if(isNaN(num)){
    return val
  }else{
    return num.toFixed(2);
  }
}
function fixed0(val){
  // 保留两位小数
  const num = Number(val)
  if(isNaN(num)){
    return val
  }else{
    return num.toFixed(0);
  }
}
function toThousands(originVal) {
  // 数字千分位
  if (originVal) {
    if (!originVal) {
      return originVal
    }
    var str = originVal.toString()
    var reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return str.replace(reg, '$1,')
  } else {
    if(typeof originVal ==='number'){
      // 可能是0
      return originVal
    }
    return '-'
  }
}
function strEllipsisMid(name,len){
  if(name){
    let midLen = Math.floor(len / 2);
    if(name.length>len){
      let strOne = name.slice(0,midLen);
      let strTwo = name.slice(-midLen);
      let ellipsis = '...'
      return strOne + ellipsis + strTwo;
    }
    return name
  }
}
// 16进制转rgba  #fff ===> [255,255,255]
function hexToRGB(hex){
  hex=hex+"";
  hex = hex[0] === '#' ? hex.slice(1) : hex
  hex = hex.length === 3 ?(hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]) : hex;
  let res="";
  if ((hex.length !== 6) || !(/^[0-9a-fA-F]{6}$/.test(hex))) return null
  res=[parseInt(hex[0]+hex[1],16),parseInt(hex[2]+hex[3],16),parseInt(hex[4]+hex[5],16)]
  return res;
}
export {
  uuid,
  randomColor,
  rgbaColor,
  fixed2,
  fixed0,
  toThousands,
  strEllipsisMid,
  hexToRGB
}
