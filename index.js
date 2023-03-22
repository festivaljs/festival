import holiday from './chn/holiday.json';
import legal from './chn/legal.json';
import swap from './chn/swap.json';

const holidayMap = new Map(Object.entries(holiday));
const legalMap = new Map(legal.map((date) => [date, true]));
const swapMap = new Map(swap.map((date) => [date, true]));

class Festival {
  // 构造函数中初始化一些公共变量
  constructor() {
    // 保存日期范围的代理
    this.proxy = new Proxy(
      { startDate: 20070101, endDate: 20231230 },
      {
        get: function (target, prop) {
          return target[prop];
        },
        set: function (target, prop, value) {
          if (!Number.isNaN(Number(value))) {
            target[prop] = Number(value);
            return true;
          }
          return false;
        },
      }
    );
    this.cache = new Map();
  }

  // 判断日期是否符合要求（限制在指定日期范围内）
  isValidDate(date) {
    return date >= this.proxy.startDate && date <= this.proxy.endDate;
  }

  // 获取日期信息
  getDayInfo(date) {
    if (!this.isValidDate(date)) {
      return 'invalid';
    }
    if (this.cache.has(date)) {
      return this.cache.get(date);
    }
    const holiday = holidayMap.get(date) || '非假期';
    const isLegal = legalMap.has(date);
    const isSwap = swapMap.has(date);
    const isHoliday = holiday !== '非假期';
    const result = { date, name: holiday, isHoliday, isLegal, isSwap };
    this.cache.set(date, result);
    return result;
  }

  // 获取假期名称
  getHolidayName(date) {
    return holidayMap.get(date) || '非假期';
  }

  // 获取假期集合
  getHolidaySet() {
    return new Set(Object.keys(holiday));
  }

  // 是否为法定节假日
  isLegalHoliday(date) {
    return legalMap.has(date);
  }

  // 是否为调休日
  isSwapHoliday(date) {
    return swapMap.has(date);
  }

  // 对外暴露的方法
  day(date) {
    return this.getDayInfo(date);
  }

  name(date) {
    return this.getHolidayName(date);
  }

  isHoliday(date) {
    return this.getDayInfo(date).isHoliday;
  }

  isLegal(date) {
    return this.isLegalHoliday(date);
  }

  isSwap(date) {
    return this.isSwapHoliday(date);
  }
}

export default new Festival();
