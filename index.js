import holiday from "./chn/holiday.json";
import legal from "./chn/legal.json";
import swap from "./chn/swap.json";

// 等待用装饰器进行优化
class Festival {
  constructor() {
    const _this = this;
    return new Proxy(_this, {
      get(target, prop) {
        let value = target[prop];
        if (typeof value === "function") {
          value = value.bind(_this);
          if (value !== "invalid") {
            return (date, ...args) => {
              if (_this.invalid(date)) {
                throw new Error("invalid parameter") 
              }
              return value(date, ...args);
            }
          } else {
            return value;
          }
        } else {
          return value;
        }
      }
    })
  }
  invalid(date) {
    return date > 20221230 || date < 20070101;
  }
  day(date) {
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
    return holiday[date] === undefined ? "非假期" : holiday[date];
  }
  // 是否为假期节假日
  isHoliday(date) {
    return holiday[date] === undefined ? false : true;
  }
  // 是否为法定节假日
  isLegal(date) {
    return legal.includes(date);
  }
  // 是否为调休日
  isUnhappy(date) {
    return swap.includes(date);
  }
}
export default Festival;