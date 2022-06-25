import holiday from "./chn/holiday.json";
import legal from "./chn/legal.json";
import swap from "./chn/swap.json";

// 等待用装饰器进行优化
class Festival {
  invalid(date) {
    return date > 20221230 || date < 20070101;
  }
  day(date) {
    if (this.invalid(date)) {
      throw new Error("invalid parameter")
    }
    return {
      date,
      name: holiday[date] === undefined ? "非假期" : holiday[date],
      isHoliday: holiday[date] === undefined ? false : true,
      isLegal: legal.includes(date),
      isSwap: swap.includes(date),
    }
  }
  // 假期名称
  name(date) {
    if (this.invalid(date)) {
      throw new Error("invalid parameter")
    }
    return holiday[date] === undefined ? "非假期" : holiday[date];
  }
  // 是否为假期节假日
  isHoliday(date) {
    if (this.invalid(date)) {
      throw new Error("invalid parameter")
    }
    return holiday[date] === undefined ? false : true;
  }
  // 是否为法定节假日
  isLegal(date) {
    if (this.invalid(date)) {
      throw new Error("invalid parameter")
    }
    return legal.includes(date);
  }
  // 是否为调休日
  isUnhappy(date) {
    if (this.invalid(date)) {
      throw new Error("invalid parameter")
    }
    return swap.includes(date);
  }
}
export default Festival;