/**
 * Festival_chn 单元测试
 */

import { describe, test, expect, beforeEach } from 'vitest'
import Festival from './festival.js'

describe('Festival_chn 核心功能测试', () => {
  let festival

  beforeEach(() => {
    festival = new Festival()
  })

  describe('基础查询功能', () => {
    test('查询元旦节信息', () => {
      const result = festival.day(20230101)
      expect(result.date).toBe(20230101)
      expect(result.name).toBe('元旦')
      expect(result.isHoliday).toBe(true)
      expect(result.isLegal).toBe(true)
      expect(result.isSwap).toBe(false)
    })

    test('查询工作日信息', () => {
      const result = festival.day(20230103) // 2023年1月3日（假设是工作日）
      expect(result.date).toBe(20230103)
      expect(result.isHoliday).toBe(false)
      expect(result.isLegal).toBe(false)
    })

    test('查询调休日信息', () => {
      const result = festival.day(20230128) // 2023年1月28日调休
      expect(result.date).toBe(20230128)
      expect(result.isSwap).toBe(true)
    })
  })

  describe('简化API测试', () => {
    test('name() 方法', () => {
      expect(festival.name(20230101)).toBe('元旦')
      expect(festival.name(20230103)).toBe('工作日')
    })

    test('isHoliday() 方法', () => {
      expect(festival.isHoliday(20230101)).toBe(true)
      expect(festival.isHoliday(20230103)).toBe(false)
    })

    test('isLegal() 方法', () => {
      expect(festival.isLegal(20230101)).toBe(true)
      expect(festival.isLegal(20230103)).toBe(false)
    })

    test('isSwap() 方法', () => {
      expect(festival.isSwap(20230128)).toBe(true)
      expect(festival.isSwap(20230101)).toBe(false)
    })
  })

  describe('范围查询功能', () => {
    test('查询日期范围内的节假日', () => {
      const results = festival.getDaysInRange(20230101, 20230103)
      expect(Array.isArray(results)).toBe(true)
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].date).toBe(20230101)
      expect(results.every(item => item.date >= 20230101 && item.date <= 20230103)).toBe(true)
    })

    test('查询法定节假日', () => {
      const results = festival.getLegalHolidaysInRange(20230101, 20230131)
      expect(Array.isArray(results)).toBe(true)
      expect(results.every(item => item.isLegal)).toBe(true)
    })

    test('查询调休日', () => {
      const results = festival.getSwapHolidaysInRange(20230101, 20230131)
      expect(Array.isArray(results)).toBe(true)
      expect(results.every(item => item.isSwap)).toBe(true)
    })

    test('统计节假日天数', () => {
      const count = festival.countHolidaysInRange(20230101, 20230131)
      expect(typeof count).toBe('number')
      expect(count).toBeGreaterThanOrEqual(0)
    })
  })

  describe('高级API测试', () => {
    test('批量查询多个日期', () => {
      const dates = [20230101, 20230102, 20230103]
      const results = festival.getDays(dates)
      expect(results.length).toBe(3)
      expect(results[0].date).toBe(20230101)
      expect(results[1].date).toBe(20230102)
      expect(results[2].date).toBe(20230103)
    })

    test('查询年度节假日', () => {
      const results = festival.getYearHolidays(2023)
      expect(Array.isArray(results)).toBe(true)
      expect(results.every(item => {
        const year = Math.floor(item.date / 10000)
        return year === 2023
      })).toBe(true)
    })

    test('查询年度法定节假日', () => {
      const results = festival.getYearHolidays(2023, 'legal')
      expect(Array.isArray(results)).toBe(true)
      expect(results.every(item => item.isLegal)).toBe(true)
    })

    test('按节假日名称查询', () => {
      const results = festival.getDatesByHolidayName('元旦')
      expect(Array.isArray(results)).toBe(true)
      expect(results.every(item => item.name === '元旦')).toBe(true)
    })

    test('获取节假日名称列表', () => {
      const names = festival.getHolidayNames()
      expect(Array.isArray(names)).toBe(true)
      expect(names.includes('元旦')).toBe(true)
      expect(names.includes('春节')).toBe(true)
      expect(names.includes('国庆节')).toBe(true)
    })
  })

  describe('输入验证测试', () => {
    test('无效日期格式', () => {
      const result = festival.day('invalid')
      expect(result.error).toBeDefined()
    })

    test('空值输入', () => {
      const result = festival.day(null)
      expect(result.error).toBeDefined()
    })

    test('超出范围的日期', () => {
      const result = festival.day(19691231)
      expect(result.error).toBeDefined()
    })

    test('无效的月份', () => {
      const result = festival.day(20231301)
      expect(result.error).toBeDefined()
    })

    test('无效的日期', () => {
      const result = festival.day(20230132)
      expect(result.error).toBeDefined()
    })

    test('范围查询参数错误', () => {
      const results = festival.getDaysInRange(20230102, 20230101) // 开始日期大于结束日期
      expect(results.error || results.length === 0).toBeTruthy()
    })
  })

  describe('工具方法测试', () => {
    test('获取数据信息', () => {
      const info = festival.getDataInfo()
      expect(info).toHaveProperty('totalHolidays')
      expect(info).toHaveProperty('totalLegalDays')
      expect(info).toHaveProperty('totalSwapDays')
      expect(info).toHaveProperty('yearRange')
      expect(info).toHaveProperty('stats')
      expect(info).toHaveProperty('dataRange')
      expect(info).toHaveProperty('cacheEnabled')
    })

    test('缓存功能', () => {
      // 第一次查询
      const result1 = festival.day(20230101)
      const stats1 = festival.getDataInfo().stats
      
      // 第二次查询相同日期（应该命中缓存）
      const result2 = festival.day(20230101)
      const stats2 = festival.getDataInfo().stats
      
      expect(result1).toEqual(result2)
      expect(stats2.queries).toBeGreaterThan(stats1.queries)
    })

    test('清空缓存', () => {
      festival.day(20230101) // 先查询一次
      festival.clearCache()
      // 验证缓存已清空（这里只能间接验证）
      expect(() => festival.clearCache()).not.toThrow()
    })

    test('重置统计', () => {
      festival.day(20230101) // 产生一些统计数据
      festival.resetStats()
      const stats = festival.getDataInfo().stats
      expect(stats.queries).toBe(0)
      expect(stats.cacheHits).toBe(0)
      expect(stats.errors).toBe(0)
    })
  })
})

describe('Festival_chn 性能测试', () => {
  let festival

  beforeEach(() => {
    festival = new Festival()
  })

  test('大范围查询性能', () => {
    const start = performance.now()
    const results = festival.getDaysInRange(20200101, 20231231) // 查询4年数据
    const end = performance.now()
    
    expect(Array.isArray(results)).toBe(true)
    expect(end - start).toBeLessThan(100) // 应该在100ms内完成
  })

  test('批量查询性能', () => {
    const dates = []
    for (let i = 0; i < 1000; i++) {
      dates.push(20230101 + i)
    }
    
    const start = performance.now()
    const results = festival.getDays(dates)
    const end = performance.now()
    
    expect(results.length).toBe(1000)
    expect(end - start).toBeLessThan(200) // 应该在200ms内完成
  })

  test('缓存效果验证', () => {
    const testDate = 20230101
    
    // 第一次查询（无缓存）
    const start1 = performance.now()
    festival.day(testDate)
    const end1 = performance.now()
    
    // 第二次查询（有缓存）
    const start2 = performance.now()
    festival.day(testDate)
    const end2 = performance.now()
    
    // 缓存查询应该更快
    expect(end2 - start2).toBeLessThanOrEqual(end1 - start1)
  })
})

describe('Festival_chn 边界条件测试', () => {
  let festival

  beforeEach(() => {
    festival = new Festival({ strictMode: false })
  })

  test('数据边界日期查询', () => {
    const info = festival.getDataInfo()
    const minDate = info.dataRange.minDate
    const maxDate = info.dataRange.maxDate
    
    // 查询最小和最大日期
    const minResult = festival.day(minDate)
    const maxResult = festival.day(maxDate)
    
    expect(minResult.date).toBe(minDate)
    expect(maxResult.date).toBe(maxDate)
  })

  test('跨年范围查询', () => {
    const results = festival.getDaysInRange(20221201, 20230131)
    expect(Array.isArray(results)).toBe(true)
    
    // 验证结果按日期排序
    for (let i = 1; i < results.length; i++) {
      expect(results[i].date).toBeGreaterThanOrEqual(results[i - 1].date)
    }
  })

  test('空范围查询', () => {
    const results = festival.getDaysInRange(20230102, 20230101) // 空范围
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBe(0)
  })
})