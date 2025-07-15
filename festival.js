/**
 * Festival_chn - 高性能中国节假日查询库
 * 
 * 特性：
 * - O(1) 单日查询，O(log n) 范围查询
 * - 智能缓存和数据预处理
 * - 完整的输入验证和错误处理
 * - 支持批量操作和年度查询
 */

import DataProcessor from './data-processor.js'
import QueryEngine from './query-engine.js'
import CacheManager from './cache-manager.js'

class Festival {
  constructor(options = {}) {
    // 初始化配置
    this.config = {
      enableCache: options.enableCache !== false, // 默认启用缓存
      cacheSize: options.cacheSize || 1000,
      strictMode: options.strictMode || false, // 严格模式下抛出异常
      ...options
    }

    // 初始化数据处理器
    this.dataProcessor = new DataProcessor()
    this.data = this.dataProcessor.getData()
    
    // 初始化查询引擎
    this.queryEngine = new QueryEngine(this.data)
    
    // 初始化缓存管理器
    this.cacheManager = this.config.enableCache 
      ? new CacheManager(this.config.cacheSize)
      : null

    // 性能统计
    this.stats = {
      queries: 0,
      cacheHits: 0,
      errors: 0
    }
  }

  // ==================== 核心查询API ====================

  /**
   * 查询指定日期的完整信息
   * @param {number|string} date - 日期，格式为 YYYYMMDD
   * @returns {Object} 日期信息对象
   */
  day(date) {
    try {
      const normalizedDate = this._validateAndNormalizeDate(date)
      this.stats.queries++

      // 检查缓存
      if (this.cacheManager) {
        const cached = this.cacheManager.get(`day:${normalizedDate}`)
        if (cached) {
          this.stats.cacheHits++
          return cached
        }
      }

      const result = this.queryEngine.queryDay(normalizedDate)
      
      // 缓存结果
      if (this.cacheManager && result.isValid !== false) {
        this.cacheManager.set(`day:${normalizedDate}`, result)
      }

      return result
    } catch (error) {
      this.stats.errors++
      return this._handleError(error, date)
    }
  }

  /**
   * 获取日期的节假日名称
   * @param {number|string} date - 日期
   * @returns {string} 节假日名称
   */
  name(date) {
    const dayInfo = this.day(date)
    return dayInfo.name || '工作日'
  }

  /**
   * 判断是否为节假日
   * @param {number|string} date - 日期
   * @returns {boolean}
   */
  isHoliday(date) {
    const dayInfo = this.day(date)
    return dayInfo.isHoliday || false
  }

  /**
   * 判断是否为法定节假日
   * @param {number|string} date - 日期
   * @returns {boolean}
   */
  isLegal(date) {
    const dayInfo = this.day(date)
    return dayInfo.isLegal || false
  }

  /**
   * 判断是否为调休日（工作日）
   * @param {number|string} date - 日期
   * @returns {boolean}
   */
  isSwap(date) {
    const dayInfo = this.day(date)
    return dayInfo.isSwap || false
  }

  // ==================== 范围查询API ====================

  /**
   * 查询日期范围内的所有节假日信息
   * @param {number|string} startDate - 开始日期
   * @param {number|string} endDate - 结束日期
   * @returns {Array} 日期信息数组
   */
  getDaysInRange(startDate, endDate) {
    try {
      const start = this._validateAndNormalizeDate(startDate)
      const end = this._validateAndNormalizeDate(endDate)
      
      const cacheKey = `range:${start}-${end}`
      if (this.cacheManager) {
        const cached = this.cacheManager.get(cacheKey)
        if (cached) {
          this.stats.cacheHits++
          return cached
        }
      }

      const result = this.queryEngine.queryRange(start, end)
      
      if (this.cacheManager) {
        this.cacheManager.set(cacheKey, result)
      }

      return result
    } catch (error) {
      this.stats.errors++
      return this._handleError(error, [startDate, endDate])
    }
  }

  /**
   * 查询日期范围内的法定节假日
   * @param {number|string} startDate - 开始日期
   * @param {number|string} endDate - 结束日期
   * @returns {Array} 法定节假日数组
   */
  getLegalHolidaysInRange(startDate, endDate) {
    try {
      const start = this._validateAndNormalizeDate(startDate)
      const end = this._validateAndNormalizeDate(endDate)
      
      return this.queryEngine.queryRange(start, end, 'legal')
    } catch (error) {
      this.stats.errors++
      return this._handleError(error, [startDate, endDate])
    }
  }

  /**
   * 查询日期范围内的调休日
   * @param {number|string} startDate - 开始日期
   * @param {number|string} endDate - 结束日期
   * @returns {Array} 调休日数组
   */
  getSwapHolidaysInRange(startDate, endDate) {
    try {
      const start = this._validateAndNormalizeDate(startDate)
      const end = this._validateAndNormalizeDate(endDate)
      
      return this.queryEngine.queryRange(start, end, 'swap')
    } catch (error) {
      this.stats.errors++
      return this._handleError(error, [startDate, endDate])
    }
  }

  /**
   * 统计日期范围内的节假日天数
   * @param {number|string} startDate - 开始日期
   * @param {number|string} endDate - 结束日期
   * @param {string} type - 类型：'holiday', 'legal', 'swap'
   * @returns {number} 天数
   */
  countHolidaysInRange(startDate, endDate, type = 'holiday') {
    try {
      const start = this._validateAndNormalizeDate(startDate)
      const end = this._validateAndNormalizeDate(endDate)
      
      return this.queryEngine.countInRange(start, end, type)
    } catch (error) {
      this.stats.errors++
      return this._handleError(error, [startDate, endDate])
    }
  }

  // ==================== 新增高级API ====================

  /**
   * 批量查询多个日期
   * @param {Array} dates - 日期数组
   * @returns {Array} 日期信息数组
   */
  getDays(dates) {
    if (!Array.isArray(dates)) {
      throw new Error('参数必须是日期数组')
    }

    return dates.map(date => this.day(date))
  }

  /**
   * 查询指定年份的所有节假日
   * @param {number} year - 年份
   * @param {string} type - 类型：'all', 'legal', 'swap'
   * @returns {Array} 节假日数组
   */
  getYearHolidays(year, type = 'all') {
    try {
      this._validateYear(year)
      return this.queryEngine.queryYear(year, type)
    } catch (error) {
      this.stats.errors++
      return this._handleError(error, year)
    }
  }

  /**
   * 按节假日名称查询所有相关日期
   * @param {string} holidayName - 节假日名称
   * @returns {Array} 日期数组
   */
  getDatesByHolidayName(holidayName) {
    return this.queryEngine.queryByHolidayName(holidayName)
  }

  /**
   * 获取所有节假日名称列表
   * @returns {Array} 节假日名称数组
   */
  getHolidayNames() {
    return this.queryEngine.getHolidayNames()
  }

  // ==================== 工具方法 ====================

  /**
   * 获取数据统计信息
   * @returns {Object} 统计信息
   */
  getDataInfo() {
    return {
      ...this.data.metadata,
      stats: { ...this.stats },
      dataRange: this.data.dataRange,
      cacheEnabled: !!this.cacheManager
    }
  }

  /**
   * 清空缓存
   */
  clearCache() {
    if (this.cacheManager) {
      this.cacheManager.clear()
    }
  }

  /**
   * 重置统计信息
   */
  resetStats() {
    this.stats = {
      queries: 0,
      cacheHits: 0,
      errors: 0
    }
  }

  // ==================== 私有方法 ====================

  /**
   * 验证并标准化日期
   * @private
   */
  _validateAndNormalizeDate(date) {
    if (date == null) {
      throw new Error('日期不能为空')
    }

    const numDate = Number(date)
    
    if (isNaN(numDate)) {
      throw new Error(`无效的日期格式: ${date}`)
    }

    // 基本格式验证
    if (numDate < 19700101 || numDate > 99991231) {
      throw new Error(`日期超出有效范围: ${date}`)
    }

    // 详细日期格式验证
    const dateStr = numDate.toString()
    if (dateStr.length !== 8) {
      throw new Error(`日期格式必须为8位数字YYYYMMDD: ${date}`)
    }

    const year = Math.floor(numDate / 10000)
    const month = Math.floor((numDate % 10000) / 100)
    const day = numDate % 100

    if (month < 1 || month > 12) {
      throw new Error(`无效的月份: ${month}`)
    }

    if (day < 1 || day > 31) {
      throw new Error(`无效的日期: ${day}`)
    }

    return numDate
  }

  /**
   * 验证年份
   * @private
   */
  _validateYear(year) {
    const numYear = Number(year)
    if (isNaN(numYear) || numYear < 1970 || numYear > 9999) {
      throw new Error(`无效的年份: ${year}`)
    }
    return numYear
  }

  /**
   * 错误处理
   * @private
   */
  _handleError(error, input) {
    if (this.config.strictMode) {
      throw error
    }

    console.warn(`Festival查询错误: ${error.message}, 输入: ${JSON.stringify(input)}`)
    
    // 返回默认的错误结果
    return {
      date: Number(input) || 0,
      name: '查询错误',
      isHoliday: false,
      isLegal: false,
      isSwap: false,
      error: error.message
    }
  }
}

// 兼容性：保持原有的导出方式
export default Festival
export { Festival }