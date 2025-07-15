/**
 * Festival_chn - 高性能中国节假日查询库
 * 重构版本入口文件
 */

import Festival from './festival.js'

// 创建默认实例
const festival = new Festival()

// 导出类和默认实例
export { Festival }
export default festival

// 兼容性：提供全局访问方式
if (typeof window !== 'undefined') {
  window.Festival = Festival
  window.festival = festival
}

// Node.js 环境兼容
if (typeof global !== 'undefined') {
  global.Festival = Festival
  global.festival = festival
}