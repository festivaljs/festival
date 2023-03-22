import holiday from './chn/holiday.json'
import legal from './chn/legal.json'
import swap from './chn/swap.json'

class Festival {
  // 构造函数中初始化一些公共变量
  constructor() {
    // 国家制定的最早和最晚的一个假期日期
    this.START_DATE = 20070101
    this.END_DATE = 20231230
    // 缓存 legal 和 swap 数组
    this.legalSet = new Set(legal)
    this.swapSet = new Set(swap)
  }

  // 判断日期是否符合要求（限制在指定日期范围内）
  isValidDate(date) {
    return date >= this.START_DATE && date <= this.END_DATE
  }

  // 获取假期名称
  getHolidayName(date) {
    return holiday[date] || '非假期'
  }

  // 获取假期集合
  getHolidaySet() {
    return new Set(Object.keys(holiday))
  }

  // 是否为法定节假日
  isLegalHoliday(date) {
    return this.legalSet.has(date)
  }

  // 是否为调休日
  isSwapHoliday(date) {
    return this.swapSet.has(date)
  }

  // 获取日期信息
  getDayInfo(date) {
    if (!this.isValidDate(date)) {
      return 'invalid'
    }
    const holidaySet = this.getHolidaySet()
    const isHoliday = holidaySet.has(date)
    const name = this.getHolidayName(date)
    const isLegal = this.isLegalHoliday(date)
    const isSwap = this.isSwapHoliday(date)
    return { date, name, isHoliday, isLegal, isSwap }
  }

  // 对外暴露的方法
  day = (date) => this.getDayInfo(date)
  name = (date) => this.getHolidayName(date)
  isHoliday = (date) => this.getDayInfo(date).isHoliday
  isLegal = (date) => this.isLegalHoliday(date)
  isSwap = (date) => this.isSwapHoliday(date)
}

export default new Festival()
