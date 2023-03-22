# festival_chn

## 介绍
`festival_chn` 无任何依赖，无需异步请求，满足对日期的假期检测，判断是否为调休日等。

## 引入
`npm i festival_chn`

## 代码演示
```
const festival = new Festival();

// 获取某天的放假调休数据
const res = festival.day(20220101);

// 获取假期名称
const res = festival.name(20220101);

// 判断某天是否为假期日
const res = festival.isHoliday(20220101);

// 判断某天是否为法定假期日
const res = festival.isLegal(20220101);

// 判断某天是否为调休日
const res = festival.isSwap(20220101);

// 查询指定日期范围内的假期信息
const res = festival.getDaysInRange(20230101, 20230131);

// 查询指定日期范围内的法定假日
const res = festival.getLegalHolidaysInRange(20230101, 20230131);

// 查询指定日期范围内的的调休日
const res = festival.getHolidaysInRange(20230101, 20230131);

// 查询指定日期范围内的假期天数
const res = festival.countHolidaysInRange(20230101, 20230131);
```

## 返回数据格式
|字段名称|字段类型|说明|
|---|---|---|
|date|Number|八位数字组成的年月日|
|name|String|节日名称|
|isHoliday|Boolean|是否为假期节假日|
|isLegal|Boolean|是否为法定节假日|
|isSwap|Boolean|是否为调休日|


## 返回数据示例

### day
```
{
    date: 20220101
    name: "元旦"
    isHoliday: true
    isLegal: true
    isSwap: false
}
```

### name
```
元旦
```

### isHoliday
```
true
```

### isLegal
```
true
```

### isSwap
```
false
```