# festival_chn

## 欢迎进群
![微信群](./20220806.png)

## 介绍
`festival_chn` 无任何依赖，无需异步请求，满足对日期的假期检测，判断是否为调休日等。可以根据年月日参数返回全部的节假日信息。

## 引入
`npm i festival_chn`

## 代码演示
```
const festival = new Festival();

// 以年为单位获取全部的放假调休数据
const res = festival.year(2022);

// 以月为单位获取全部的放假调休数据
const res = festival.month(2022, 1);

// 获取某天的放假调休数据
const res = festival.day(20220101);

// 判断某天是否为调休日
const res = festival.isUnhappy(20220101);

// 判断某天是否为假期日
const res = festival.isHoliday(20220101);

// 判断某天是否为法定假期日
const res = festival.isLegal(20220101);

// 获取假期名称
const res = festival.name(20220101);
```

## 返回数据格式
|字段名称|字段类型|说明|
|---|---|---|
|date|Number|八位数字组成的年月日|
|date_chn|String|中文日期|
|name|String|节日名称|
|isHoliday|Boolean|是否为假期节假日|
|isLegal|Boolean|是否为法定节假日|
|isSwap|Boolean|是否为调休日|
|year|Number|年|
|month|Number|月|

## 返回数据示例

### 假期示例
```
{
    date: 20220102
    date_chn: "2022年01月02日"
    name: "元旦"
    isHoliday: true
    isLegal: false
    month: 1
    year: 2022
}
```

### 调休示例
```
{
    "date": 20221009,
    "date_chn": "2022年10月09日",
    "name": "国庆节调休",
    "isHoliday": false,
    "isSwap": true,
    "year": 2022,
    "month": 10
}
```