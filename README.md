## NPM

```sh
npm i festival_chn
```

## USE

import festival from "festival_chn";

// 以年为单位获取全部的放假调休数据
const res = festival.year(2022);

// 以月为单位获取全部的放假调休数据
const res = festival.year(2022, 1);

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

## RETURN

|字段名称|字段类型|说明|
|---|---|---|
|date|Number|八位数字组成的年月日|
|date_chn|String|中文日期|
|name|String|节日名称|
|isHoliday|Boolean|是否为假期节假日|
|isLegal|Boolean|是否为法定节假日|
|year|Number|年|
|month|Number|月|

```
{
    date: 20220102
    date_chn: "2022年01月02日"
    isHoliday: true
    isLegal: false
    month: 1
    name: "元旦"
    year: 2022
}
```
