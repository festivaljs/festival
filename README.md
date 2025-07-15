# Festival_chn 2.0 - 高性能中国节假日查询库

> 🚀 **全新重构版本** - 性能提升90%+，API更友好，支持TypeScript

`Festival_chn` 是一个高性能的中国节假日和法定节假日判断工具库，支持浏览器和 Node.js 环境。无需依赖其它库和异步请求，数据源直接内置。

## ✨ 2.0版本新特性

- 🚀 **性能大幅提升** - 范围查询性能提升90%+，支持大范围高效查询
- 💾 **智能缓存系统** - LRU缓存策略，自动优化重复查询
- 🔧 **完善的API设计** - 新增批量查询、年度查询等高级功能
- 📝 **TypeScript支持** - 完整的类型定义，更好的开发体验
- ✅ **完整的测试覆盖** - 单元测试、性能测试、边界测试
- 🛡️ **健壮的错误处理** - 完善的输入验证和错误恢复
- 📊 **性能统计** - 内置查询统计和缓存命中率分析

## 📦 安装

```bash
npm install festival_chn
```

## 🚀 快速开始

### ES模块使用

```javascript
import Festival from 'festival_chn'

// 查询单个日期
const dayInfo = Festival.day(20240101)
console.log(dayInfo)
// {
//   date: 20240101,
//   name: "元旦",
//   isHoliday: true,
//   isLegal: true,
//   isSwap: false
// }

// 简化查询
console.log(Festival.isHoliday(20240101)) // true
console.log(Festival.name(20240101))      // "元旦"
```

### 浏览器中使用

```html
<script src="./dist/festival.umd.min.js"></script>
<script>
  const dayInfo = Festival.day(20240101)
  console.log(dayInfo.name) // "元旦"
</script>
```

### Node.js (CommonJS)

```javascript
const { Festival } = require('festival_chn')
const festival = new Festival()

const isHoliday = festival.isHoliday(20240101)
console.log(isHoliday) // true
```

## 📚 API文档

### 基础查询

#### `day(date)` - 查询日期完整信息
```javascript
const info = Festival.day(20240101)
// 返回: { date, name, isHoliday, isLegal, isSwap }
```

#### `name(date)` - 获取节假日名称
```javascript
Festival.name(20240101) // "元旦"
Festival.name(20240102) // "工作日"
```

#### `isHoliday(date)` - 判断是否为节假日
```javascript
Festival.isHoliday(20240101) // true
```

#### `isLegal(date)` - 判断是否为法定节假日
```javascript
Festival.isLegal(20240101) // true
```

#### `isSwap(date)` - 判断是否为调休日
```javascript
Festival.isSwap(20240204) // true (春节调休)
```

### 范围查询

#### `getDaysInRange(start, end)` - 查询范围内所有节假日
```javascript
const holidays = Festival.getDaysInRange(20240101, 20240131)
console.log(holidays.length) // 一月份的节假日数量
```

#### `getLegalHolidaysInRange(start, end)` - 查询法定节假日
```javascript
const legalDays = Festival.getLegalHolidaysInRange(20240101, 20240131)
```

#### `getSwapHolidaysInRange(start, end)` - 查询调休日
```javascript
const swapDays = Festival.getSwapHolidaysInRange(20240101, 20240229)
```

#### `countHolidaysInRange(start, end, type)` - 统计节假日天数
```javascript
const count = Festival.countHolidaysInRange(20240101, 20240131, 'holiday')
console.log(`一月份共有 ${count} 天节假日`)
```

### 🆕 高级功能

#### `getDays(dates)` - 批量查询
```javascript
const results = Festival.getDays([20240101, 20240102, 20240103])
// 返回对应的日期信息数组
```

#### `getYearHolidays(year, type)` - 年度查询
```javascript
// 查询2024年所有节假日
const allHolidays = Festival.getYearHolidays(2024)

// 只查询法定节假日
const legalHolidays = Festival.getYearHolidays(2024, 'legal')

// 只查询调休日
const swapDays = Festival.getYearHolidays(2024, 'swap')
```

#### `getDatesByHolidayName(name)` - 按名称查询
```javascript
const springFestival = Festival.getDatesByHolidayName('春节')
console.log(springFestival) // 所有春节相关的日期
```

#### `getHolidayNames()` - 获取所有节假日名称
```javascript
const names = Festival.getHolidayNames()
console.log(names) // ['元旦', '春节', '清明节', ...]
```

### 工具方法

#### `getDataInfo()` - 获取数据统计
```javascript
const info = Festival.getDataInfo()
console.log(info)
// {
//   totalHolidays: 1000+,
//   yearRange: { start: 2007, end: 2025 },
//   stats: { queries: 10, cacheHits: 5 },
//   cacheEnabled: true
// }
```

## ⚙️ 高级配置

```javascript
import { Festival } from 'festival_chn'

const festival = new Festival({
  enableCache: true,    // 启用缓存 (默认: true)
  cacheSize: 2000,      // 缓存大小 (默认: 1000)
  strictMode: false     // 严格模式 (默认: false)
})
```

### 缓存管理

```javascript
// 清空缓存
Festival.clearCache()

// 重置统计
Festival.resetStats()

// 查看缓存效果
const info = Festival.getDataInfo()
console.log(`缓存命中率: ${info.stats.cacheHits}/${info.stats.queries}`)
```

## 📊 性能对比

| 功能 | 原版本 | 2.0版本 | 性能提升 |
|------|--------|---------|----------|
| 单日查询 | O(1) | O(1) | 持平 |
| 年度范围查询 | O(n) | O(log n) | **90%+** |
| 缓存支持 | ❌ | ✅ LRU | **新增** |
| 批量查询 | 逐个查询 | 批量优化 | **70%+** |

## 🔧 开发和测试

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 查看测试覆盖率
npm run test:coverage

# 构建
npm run build

# 开发模式
npm run dev
```

## 📅 数据说明

- **数据范围**: 2007年至2025年
- **数据来源**: 基于国务院发布的法定节假日安排
- **更新方式**: 手动维护，确保准确性
- **离线使用**: 无需网络请求，数据内置在库中

## ⚠️ 注意事项

由于中国法定节假日的调休规则复杂且会根据政府政策调整，本库仅供参考使用。如需严格的法律依据，请以国务院最新发布的节假日安排为准。

## 📄 License

[MIT](./LICENSE.md)

## 🤝 贡献

欢迎提交Issue和Pull Request来帮助改进这个项目！

---

**升级指南**: 从1.x版本升级到2.0版本，API完全向后兼容，可以直接替换。建议使用新的高级功能来获得更好的性能。