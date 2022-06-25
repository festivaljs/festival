import holiday from "./chn/holiday.json";
import legal from "./chn/legal.json";
import swap from "./chn/swap.json";

// 等待用装饰器进行优化
class Festival {
  constructor() { }
  valid(date) {
    return date > 20221230 || date < 20070101 ? true : false;
  }
  day(date) {
    return this.valid(date) ? "error message: invalid parameter" :
      {
        date,
        name: holiday[date] === undefined ? "非假期" : holiday[date],
        isHoliday: holiday[date] === undefined ? false : true,
        isLegal: legal.includes(date),
        isSwap: swap.includes(date),
      }
  }
  // 假期名称
  name(date) {
    return this.valid(date) ? "error message: invalid parameter" : holiday[date] === undefined ? "非假期" : holiday[date];
  }
  // 是否为假期节假日
  isHoliday = (date) => {
    return this.valid(date) ? "error message: invalid parameter" : holiday[date] === undefined ? false : true;
  }
  // 是否为法定节假日
  isLegal(date) {
    return this.valid(date) ? "error message: invalid parameter" : legal.includes(date);
  }
  // 是否为调休日
  isUnhappy(date) {
    return this.valid(date) ? "error message: invalid parameter" : swap.includes(date);
  }
}
export default Festival;