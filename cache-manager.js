/**
 * 智能缓存管理器 - LRU缓存实现
 * 优化重复查询性能，特别是范围查询和批量操作
 */

class CacheManager {
  constructor(maxSize = 1000) {
    this.maxSize = maxSize
    this.cache = new Map()
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      operations: 0
    }
  }

  /**
   * 获取缓存值
   * @param {string} key - 缓存键
   * @returns {*} 缓存值或undefined
   */
  get(key) {
    this.stats.operations++
    
    if (this.cache.has(key)) {
      // LRU策略：访问时移到最后
      const value = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, value)
      this.stats.hits++
      return value
    }
    
    this.stats.misses++
    return undefined
  }

  /**
   * 设置缓存值
   * @param {string} key - 缓存键
   * @param {*} value - 缓存值
   */
  set(key, value) {
    this.stats.operations++
    
    // 如果已存在，先删除旧值
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.maxSize) {
      // 达到最大容量，删除最老的条目（Map中第一个）
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
      this.stats.evictions++
    }
    
    this.cache.set(key, value)
  }

  /**
   * 检查缓存是否存在
   * @param {string} key - 缓存键
   * @returns {boolean}
   */
  has(key) {
    return this.cache.has(key)
  }

  /**
   * 删除指定缓存
   * @param {string} key - 缓存键
   * @returns {boolean} 是否删除成功
   */
  delete(key) {
    return this.cache.delete(key)
  }

  /**
   * 清空所有缓存
   */
  clear() {
    this.cache.clear()
    this.resetStats()
  }

  /**
   * 获取缓存大小
   * @returns {number}
   */
  size() {
    return this.cache.size
  }

  /**
   * 获取缓存统计信息
   * @returns {Object}
   */
  getStats() {
    const hitRate = this.stats.operations > 0 
      ? (this.stats.hits / this.stats.operations * 100).toFixed(2)
      : 0

    return {
      ...this.stats,
      hitRate: `${hitRate}%`,
      size: this.cache.size,
      maxSize: this.maxSize
    }
  }

  /**
   * 重置统计信息
   */
  resetStats() {
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      operations: 0
    }
  }

  /**
   * 批量预热缓存
   * @param {Array} items - 预热数据数组 [{key, value}, ...]
   */
  warmup(items) {
    items.forEach(({ key, value }) => {
      this.set(key, value)
    })
  }

  /**
   * 获取缓存键列表（用于调试）
   * @returns {Array}
   */
  keys() {
    return Array.from(this.cache.keys())
  }

  /**
   * 获取内存使用估算（粗略计算）
   * @returns {Object}
   */
  getMemoryUsage() {
    let totalSize = 0
    
    this.cache.forEach((value, key) => {
      totalSize += this._estimateSize(key) + this._estimateSize(value)
    })

    return {
      estimatedBytes: totalSize,
      estimatedKB: (totalSize / 1024).toFixed(2),
      entries: this.cache.size
    }
  }

  /**
   * 估算对象大小（简单实现）
   * @private
   */
  _estimateSize(obj) {
    if (typeof obj === 'string') {
      return obj.length * 2 // Unicode字符大约2字节
    }
    if (typeof obj === 'number') {
      return 8 // 64位数字
    }
    if (typeof obj === 'boolean') {
      return 4
    }
    if (obj === null || obj === undefined) {
      return 0
    }
    if (typeof obj === 'object') {
      return JSON.stringify(obj).length * 2 // 粗略估算
    }
    return 0
  }

  /**
   * 缓存健康检查
   * @returns {Object}
   */
  healthCheck() {
    const stats = this.getStats()
    const memUsage = this.getMemoryUsage()
    
    return {
      healthy: stats.hitRate > 30 && this.cache.size < this.maxSize,
      hitRate: stats.hitRate,
      utilizationRate: `${(this.cache.size / this.maxSize * 100).toFixed(2)}%`,
      memoryUsage: memUsage.estimatedKB + ' KB',
      recommendations: this._getRecommendations(stats)
    }
  }

  /**
   * 获取优化建议
   * @private
   */
  _getRecommendations(stats) {
    const recommendations = []
    
    if (stats.hitRate < 30) {
      recommendations.push('缓存命中率较低，考虑调整缓存策略或增加缓存大小')
    }
    
    if (stats.evictions > stats.hits) {
      recommendations.push('缓存频繁淘汰，建议增加缓存容量')
    }
    
    if (this.cache.size === this.maxSize) {
      recommendations.push('缓存已满，考虑增加maxSize参数')
    }
    
    return recommendations
  }
}

export default CacheManager