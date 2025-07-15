/**
 * 高性能查询算法模块
 */

class QueryEngine {
  constructor(data) {
    this.data = data
  }

  /**
   * 高效的日期范围查询 - O(log n) 复杂度
   * 使用年份索引 + Set过滤替代逐日遍历
   */
  queryRange(startDate, endDate, filter = null) {
    if (startDate > endDate) {
      throw new Error('Start date must be less than or equal to end date')
    }

    const startYear = Math.floor(startDate / 10000)
    const endYear = Math.floor(endDate / 10000)
    const results = []

    // 按年份范围查询，避免全量遍历
    for (let year = startYear; year <= endYear; year++) {
      const yearData = this.data.yearlyData.get(year)
      if (!yearData) continue

      // 根据过滤器类型选择对应的数据集
      let targetSet
      let dataSource
      
      switch (filter) {
        case 'holiday':
          targetSet = new Set(yearData.holidays.keys())
          dataSource = yearData.holidays
          break
        case 'legal':
          targetSet = yearData.legal
          dataSource = yearData.holidays
          break
        case 'swap':
          targetSet = yearData.swap
          dataSource = yearData.holidays
          break
        default:
          // 查询所有节假日
          targetSet = new Set(yearData.holidays.keys())
          dataSource = yearData.holidays
      }

      // 在年度数据中应用日期范围过滤
      for (const date of targetSet) {
        if (date >= startDate && date <= endDate) {
          results.push(this.buildDayInfo(date, dataSource))
        }
      }
    }

    return results.sort((a, b) => a.date - b.date)
  }

  /**
   * 快速的单日查询 - O(1) 复杂度
   */
  queryDay(date) {
    if (!this.data.dataRange || date < this.data.dataRange.minDate || date > this.data.dataRange.maxDate) {
      return this.buildInvalidDayInfo(date)
    }

    return this.buildDayInfo(date, this.data.holidayMap)
  }

  /**
   * 批量日期查询优化
   */
  queryMultipleDays(dates) {
    return dates.map(date => this.queryDay(date))
  }

  /**
   * 智能范围统计 - 无需构建完整对象数组
   */
  countInRange(startDate, endDate, type = 'holiday') {
    const startYear = Math.floor(startDate / 10000)
    const endYear = Math.floor(endDate / 10000)
    let count = 0

    for (let year = startYear; year <= endYear; year++) {
      const yearData = this.data.yearlyData.get(year)
      if (!yearData) continue

      let targetSet
      switch (type) {
        case 'legal':
          targetSet = yearData.legal
          break
        case 'swap':
          targetSet = yearData.swap
          break
        default:
          targetSet = new Set(yearData.holidays.keys())
      }

      for (const date of targetSet) {
        if (date >= startDate && date <= endDate) {
          count++
        }
      }
    }

    return count
  }

  /**
   * 按年份快速查询
   */
  queryYear(year, type = 'all') {
    const yearData = this.data.yearlyData.get(year)
    if (!yearData) return []

    const results = []
    
    switch (type) {
      case 'legal':
        yearData.legal.forEach(date => {
          results.push(this.buildDayInfo(date, yearData.holidays))
        })
        break
      case 'swap':
        yearData.swap.forEach(date => {
          results.push(this.buildDayInfo(date, yearData.holidays))
        })
        break
      default:
        yearData.holidays.forEach((name, date) => {
          results.push(this.buildDayInfo(date, yearData.holidays))
        })
    }

    return results.sort((a, b) => a.date - b.date)
  }

  /**
   * 构建标准的日期信息对象
   */
  buildDayInfo(date, dataSource) {
    const name = (dataSource instanceof Map) 
      ? dataSource.get(date) || this.data.holidayMap.get(date) || '工作日'
      : this.data.holidayMap.get(date) || '工作日'
    
    return {
      date,
      name,
      isHoliday: this.data.holidaySet.has(date),
      isLegal: this.data.legalSet.has(date),
      isSwap: this.data.swapSet.has(date)
    }
  }

  /**
   * 构建无效日期信息
   */
  buildInvalidDayInfo(date) {
    return {
      date,
      name: '超出数据范围',
      isHoliday: false,
      isLegal: false,
      isSwap: false,
      isValid: false
    }
  }

  /**
   * 获取节假日名称列表（去重）
   */
  getHolidayNames() {
    const names = new Set()
    this.data.holidayMap.forEach(name => names.add(name))
    return Array.from(names).filter(name => name !== '工作日')
  }

  /**
   * 按节假日名称查询所有相关日期
   */
  queryByHolidayName(holidayName) {
    const results = []
    this.data.holidayMap.forEach((name, date) => {
      if (name === holidayName) {
        results.push(this.buildDayInfo(date, this.data.holidayMap))
      }
    })
    return results.sort((a, b) => a.date - b.date)
  }
}

export default QueryEngine