import holiday from './chn/holiday.json'
import legal from './chn/legal.json'
import swap from './chn/swap.json'

const holidayMap = new Map(Object.entries(holiday).map(([dateStr, name]) => [Number(dateStr), name]))
const legalSet = new Set(legal.map((date) => Number(date)))
const swapSet = new Set(swap.map((date) => Number(date)))

class Festival {
  constructor() {
    this.proxy = new Proxy(
      { startDate: 20070101, endDate: 20231230 },
      {
        get: function (target, prop) {
          return target[prop]
        },
        set: function (target, prop, value) {
          if (!Number.isNaN(Number(value))) {
            target[prop] = Number(value)
            return true
          }
          return false
        }
      }
    )
    this.cache = new Map()
  }

  isValidDate(date) {
    return date >= this.proxy.startDate && date <= this.proxy.endDate
  }

  getDayInfo(date) {
    if (!this.isValidDate(date)) {
      return 'invalid'
    }
    if (this.cache.has(date)) {
      return this.cache.get(date)
    }
    const holiday = holidayMap.get(date) || '非假期'
    const isLegal = legalSet.has(date)
    const isSwap = swapSet.has(date)
    const isHoliday = holiday !== '非假期'
    const result = { date, name: holiday, isHoliday, isLegal, isSwap }
    this.cache.set(date, result)
    return result
  }

  getHolidayName(date) {
    return holidayMap.get(date) || '非假期'
  }

  getHolidaySet() {
    return new Set(Object.keys(holiday).map((dateStr) => Number(dateStr)))
  }

  isLegalHoliday(date) {
    return legalSet.has(date)
  }

  isSwapHoliday(date) {
    return swapSet.has(date)
  }

  // 对外暴露的方法
  day(date) {
    return this.getDayInfo(Number(date))
  }

  name(date) {
    return this.getHolidayName(Number(date))
  }

  isHoliday(date) {
    return this.getDayInfo(Number(date)).isHoliday
  }

  isLegal(date) {
    return this.isLegalHoliday(Number(date))
  }

  isSwap(date) {
    return this.isSwapHoliday(Number(date))
  }

  getDaysInRange(start, end) {
    const result = []
    const startDate = Math.max(start, this.proxy.startDate)
    const endDate = Math.min(end, this.proxy.endDate)

    for (let date = startDate; date <= endDate; date++) {
      result.push(this.getDayInfo(date))
    }

    return result
  }

  getLegalHolidaysInRange(start, end) {
    const result = []
    const startDate = Math.max(start, this.proxy.startDate)
    const endDate = Math.min(end, this.proxy.endDate)

    for (let date = startDate; date <= endDate; date++) {
      if (legalSet.has(date)) {
        result.push(this.getDayInfo(date))
      }
    }

    return result
  }

  getSwapHolidaysInRange(start, end) {
    const result = []
    const startDate = Math.max(start, this.proxy.startDate)
    const endDate = Math.min(end, this.proxy.endDate)

    for (let date = startDate; date <= endDate; date++) {
      if (swapSet.has(date)) {
        result.push(this.getDayInfo(date))
      }
    }

    return result
  }

  /**
   * 查询指定日期范围内的假期天数
   * @param {Date} start 开始日期
   * @param {Date} end 结束日期
   * @returns {number} 假期天数
   */
  countHolidaysInRange(start, end) {
    // 限制开始日期和结束日期在节假日定义范围内
    const startDate = Math.max(start, this.proxy.startDate)
    const endDate = Math.min(end, this.proxy.endDate)
    let count = 0
    // 计算假期天数
    for (let date = startDate; date <= endDate; date++) {
      if (this.getDayInfo(date).isHoliday) {
        count++
      }
    }
    return count
  }
}

export default new Festival()
