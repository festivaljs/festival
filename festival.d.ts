/**
 * Festival_chn TypeScript类型定义
 */

export interface DayInfo {
  /** 日期，格式YYYYMMDD */
  date: number
  /** 节假日名称 */
  name: string
  /** 是否为节假日 */
  isHoliday: boolean
  /** 是否为法定节假日 */
  isLegal: boolean
  /** 是否为调休日 */
  isSwap: boolean
  /** 是否为有效日期（仅在查询失败时为false） */
  isValid?: boolean
  /** 错误信息（仅在查询失败时存在） */
  error?: string
}

export interface FestivalConfig {
  /** 是否启用缓存，默认true */
  enableCache?: boolean
  /** 缓存大小，默认1000 */
  cacheSize?: number
  /** 严格模式，启用时会抛出异常而不是返回错误对象，默认false */
  strictMode?: boolean
}

export interface DataRange {
  /** 最小日期 */
  minDate: number
  /** 最大日期 */
  maxDate: number
  /** 包含的年份列表 */
  years: number[]
}

export interface DataMetadata {
  /** 总节假日天数 */
  totalHolidays: number
  /** 总法定节假日天数 */
  totalLegalDays: number
  /** 总调休日天数 */
  totalSwapDays: number
  /** 年份范围信息 */
  yearRange: {
    start: number
    end: number
    span: number
  }
  /** 数据最后更新时间 */
  lastUpdated: string
}

export interface QueryStats {
  /** 总查询次数 */
  queries: number
  /** 缓存命中次数 */
  cacheHits: number
  /** 错误次数 */
  errors: number
}

export interface CacheStats {
  /** 缓存命中次数 */
  hits: number
  /** 缓存未命中次数 */
  misses: number
  /** 缓存淘汰次数 */
  evictions: number
  /** 总操作次数 */
  operations: number
  /** 命中率百分比 */
  hitRate: string
  /** 当前缓存大小 */
  size: number
  /** 最大缓存大小 */
  maxSize: number
}

export interface DataInfo {
  /** 数据元信息 */
  totalHolidays: number
  totalLegalDays: number
  totalSwapDays: number
  yearRange: {
    start: number
    end: number
    span: number
  }
  lastUpdated: string
  /** 查询统计 */
  stats: QueryStats
  /** 数据范围 */
  dataRange: DataRange
  /** 是否启用缓存 */
  cacheEnabled: boolean
}

export type HolidayType = 'all' | 'legal' | 'swap'
export type CountType = 'holiday' | 'legal' | 'swap'

/**
 * Festival_chn 主类
 */
export default class Festival {
  constructor(options?: FestivalConfig)

  // ==================== 核心查询API ====================

  /**
   * 查询指定日期的完整信息
   * @param date 日期，格式为 YYYYMMDD
   * @returns 日期信息对象
   */
  day(date: number | string): DayInfo

  /**
   * 获取日期的节假日名称
   * @param date 日期
   * @returns 节假日名称
   */
  name(date: number | string): string

  /**
   * 判断是否为节假日
   * @param date 日期
   * @returns 是否为节假日
   */
  isHoliday(date: number | string): boolean

  /**
   * 判断是否为法定节假日
   * @param date 日期
   * @returns 是否为法定节假日
   */
  isLegal(date: number | string): boolean

  /**
   * 判断是否为调休日（工作日）
   * @param date 日期
   * @returns 是否为调休日
   */
  isSwap(date: number | string): boolean

  // ==================== 范围查询API ====================

  /**
   * 查询日期范围内的所有节假日信息
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns 日期信息数组
   */
  getDaysInRange(startDate: number | string, endDate: number | string): DayInfo[]

  /**
   * 查询日期范围内的法定节假日
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns 法定节假日数组
   */
  getLegalHolidaysInRange(startDate: number | string, endDate: number | string): DayInfo[]

  /**
   * 查询日期范围内的调休日
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns 调休日数组
   */
  getSwapHolidaysInRange(startDate: number | string, endDate: number | string): DayInfo[]

  /**
   * 统计日期范围内的节假日天数
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param type 类型：'holiday', 'legal', 'swap'
   * @returns 天数
   */
  countHolidaysInRange(startDate: number | string, endDate: number | string, type?: CountType): number

  // ==================== 新增高级API ====================

  /**
   * 批量查询多个日期
   * @param dates 日期数组
   * @returns 日期信息数组
   */
  getDays(dates: (number | string)[]): DayInfo[]

  /**
   * 查询指定年份的所有节假日
   * @param year 年份
   * @param type 类型：'all', 'legal', 'swap'
   * @returns 节假日数组
   */
  getYearHolidays(year: number, type?: HolidayType): DayInfo[]

  /**
   * 按节假日名称查询所有相关日期
   * @param holidayName 节假日名称
   * @returns 日期数组
   */
  getDatesByHolidayName(holidayName: string): DayInfo[]

  /**
   * 获取所有节假日名称列表
   * @returns 节假日名称数组
   */
  getHolidayNames(): string[]

  // ==================== 工具方法 ====================

  /**
   * 获取数据统计信息
   * @returns 统计信息
   */
  getDataInfo(): DataInfo

  /**
   * 清空缓存
   */
  clearCache(): void

  /**
   * 重置统计信息
   */
  resetStats(): void
}

/**
 * 导出Festival类
 */
export { Festival }

/**
 * 兼容性导出 - 默认实例
 */
declare const festival: Festival
export default festival