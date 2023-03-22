# Festival_chn
`Festival_chn` 是一个简单易用的中国节日和法定节假日判断工具库，支持浏览器和 Node.js 环境。它提供了多种 API 来查询某一天是否是节日和法定节假日，获取假期名称等功能，以及查询指定日期范围内的假期信息和天数等。它无需依赖其它库和异步请求，数据源直接内置在库文件中。

## 安装

`npm install festival_chn`

## 使用

### 浏览器中使用
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Festival_chn Example</title>
  <script src="./dist/festival_chn.min.js"></script>
</head>
<body>
  <script>
    const festival = new Festival_chn();
    const dayInfo = festival.day(20220101);
    console.log(dayInfo.name); // "元旦"
  </script>
</body>
</html>
```

### 在 Node.js 中使用
```
const { Festival_chn } = require('festival_chn');
const festival = new Festival_chn();
const dayInfo = festival.day(20220101);
console.log(dayInfo.name); // "元旦"
```

## 查询某天的节日和假期信息
```
const festival = new Festival_chn();
const dayInfo = festival.day(20220101);
console.log(dayInfo);

{
  date: 20220101,
  name: "元旦",
  isHoliday: true,
  isLegal: true,
  isSwap: false
}
```
*返回的结果对象包含以下字段：*

|字段名称|字段类型|说明|
|---|---|---|
|date|Number|八位数字组成的年月日|
|name|String|节日名称|
|isHoliday|Boolean|是否为假期节假日|
|isLegal|Boolean|是否为法定节假日|
|isSwap|Boolean|是否为调休日|

## 查询某天的假期名称
```
const festival = new Festival_chn();
const name = festival.name(20220101);
console.log(name); // "元旦"
```

## 判断某天是否为节日和假期
```
const festival = new Festival_chn();
const isHoliday = festival.isHoliday(20220101);
console.log(isHoliday); // true

const isLegal = festival.isLegal(20220101);
console.log(isLegal); // true

const isSwap = festival.isSwap(20220101);
console.log(isSwap); // false
```

## 查询指定日期范围内的假期信息
```
const festival = new Festival_chn();
const daysInRange = festival.getDaysInRange(20230101, 20230131);
console.log(daysInRange);
```

## 查询指定日期范围内的法定假日
```
const festival = new Festival_chn();
const legalHolidays = festival.getLegalHolidaysInRange(20230101, 20230131);
console.log(legalHolidays);
```

## 查询指定日期范围内的调休日
```
const festival = new Festival_chn();
const count = festival.getHolidaysInRange(20230101, 20230131);
console.log(count);
```

## 查询指定日期范围内的假期天数
```
const festival = new Festival_chn();
const count = festival.countHolidaysInRange(20230101, 20230131);
console.log(count);
```

## 更新计划

 - setStartDate(year)：设置数据源的起始年份，默认为 1970。一般情况下不需要调用此方法。
 - setEndDate(year)：设置数据源的终止年份，默认为 2050。一般情况下不需要调用此方法。
- getDayInfo(date)：查询指定日期的节日和假期信息，与 day 方法相同。

## 数据源
Festival_chn 内置了中国节日和法定节假日的数据源，其基本来源于互联网上公开的数据。如果你需要更新数据源，可以修改 chn文件夹下的三个文件。

## 注意事项
*由于中国国家法定节假日的调休规则相对复杂，如果需要进行严格的判断和计算，请慎重使用本库。例如，如何判断 2021 年端午节和中秋节的调休情况，需要考虑到国务院发布的调休政策和各省市的具体实施情况，需要一定的研究和验证。本库只能作为预估和参考之用，不保证其完全正确性和准确性，使用者应自行验证并承担风险。*

## License
[MIT](./LICENSE.md)