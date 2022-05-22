## 更新计划
- 添加美国节假日时间
- 添加中国2000 - 2020年的时间信息

## NPM

```sh
npm i festival_chn
```

## USE

```sh
import festival from "festival_chn";

const country = "chn";
const festival = new Festival(country);

// 查询单日的日期信息
const res = festival.judge(20220101);

// 获取一段时间内的日期信息
const res = festival.range(20220101, 20220131);
```

## PARMAES

```sh
const festival = new Festival(country);

country 参考下表

|国家名称|国家代码|
|---|---|
|中国|chn|
```

## RETURN

|字段名称|字段类型|返回状态|说明|
|---|---|---|---|
|date|Number|必返|八位数字组成的年月日|
|dateName|String|必返|日期|
|isLegal|Boolean|必返|是否为法定节假日|
|isRecess|Boolean|必返|是否休假|
|isSwap|Boolean|必返|是否有调休|
|isToday|Boolean|必返|是否为节假日当天|
|name|String|必返|节日名称|
|weekName|Number|必返|星期|

```
{
    date: 20220101
    dateName: "2022年01月01日"
    isLegal: true
    isRecess: true
    isSwap: false
    isToday: true
    name: "元旦"
    weekName: 6
}
```
