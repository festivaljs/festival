/**
 * 数据预处理器 - 优化数据结构以提升查询性能
 */

import holiday from './chn/holiday.json' with { type: 'json' }
import legal from './chn/legal.json' with { type: 'json' }
import swap from './chn/swap.json' with { type: 'json' }

class DataProcessor {
  constructor() {
    this.processedData = this.preprocessData()
  }

  /**
   * 预处理数据，构建高效的查询索引
   */
  preprocessData() {
    // 构建快速查询的Set结构
    const holidaySet = new Set(Object.keys(holiday).map(Number))
    const legalSet = new Set(legal.map(Number))
    const swapSet = new Set(swap.map(Number))
    
    // 按年份组织数据，提升范围查询性能
    const yearlyData = this.buildYearlyIndex(holiday, legal, swap)
    
    // 计算数据边界
    const allDates = [...holidaySet, ...legalSet, ...swapSet]
    const dataRange = {
      minDate: Math.min(...allDates),
      maxDate: Math.max(...allDates),
      years: this.extractYears(allDates)
    }

    return {
      // 原始查询集合
      holidayMap: new Map(Object.entries(holiday).map(([date, name]) => [Number(date), name])),
      holidaySet,
      legalSet,
      swapSet,
      
      // 优化索引
      yearlyData,
      dataRange,
      
      // 元数据
      metadata: this.generateMetadata(allDates)
    }
  }

  /**
   * 按年份构建索引，优化年度范围查询
   */
  buildYearlyIndex(holiday, legal, swap) {
    const yearlyData = new Map()
    
    // 处理节假日
    Object.entries(holiday).forEach(([dateStr, name]) => {
      const date = Number(dateStr)
      const year = Math.floor(date / 10000)
      
      if (!yearlyData.has(year)) {
        yearlyData.set(year, {
          holidays: new Map(),
          legal: new Set(),
          swap: new Set()
        })
      }
      
      yearlyData.get(year).holidays.set(date, name)
    })
    
    // 处理法定节假日
    legal.forEach(date => {
      const year = Math.floor(date / 10000)
      if (yearlyData.has(year)) {
        yearlyData.get(year).legal.add(date)
      }
    })
    
    // 处理调休日
    swap.forEach(date => {
      const year = Math.floor(date / 10000)
      if (yearlyData.has(year)) {
        yearlyData.get(year).swap.add(date)
      }
    })
    
    return yearlyData
  }

  /**
   * 提取所有涉及的年份
   */
  extractYears(dates) {
    const years = new Set()
    dates.forEach(date => {
      years.add(Math.floor(date / 10000))
    })
    return Array.from(years).sort((a, b) => a - b)
  }

  /**
   * 生成数据统计元信息
   */
  generateMetadata(dates) {
    const years = this.extractYears(dates)
    return {
      totalHolidays: Object.keys(holiday).length,
      totalLegalDays: legal.length,
      totalSwapDays: swap.length,
      yearRange: {
        start: years[0],
        end: years[years.length - 1],
        span: years.length
      },
      lastUpdated: new Date().toISOString()
    }
  }

  /**
   * 获取处理后的数据
   */
  getData() {
    return this.processedData
  }

  /**
   * 获取指定年份的数据
   */
  getYearData(year) {
    return this.processedData.yearlyData.get(year) || null
  }

  /**
   * 检查日期是否在数据范围内
   */
  isInRange(date) {
    const { minDate, maxDate } = this.processedData.dataRange
    return date >= minDate && date <= maxDate
  }
}

export default DataProcessor