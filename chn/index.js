import year2022 from "./year/2022.json";
const holiday = [...year2022];

// const res = holiday.map(item => {
//   return {
//     date: item.date,
//     dateName: item.date_cn,
//     isSwap: item.holiday_overtime === 10 ? false : true,
//     weekName: item.week,
//     isToday: item.holiday_today === 1? true : false,
//     isLegal: item.holiday_legal === 1? true : false,
//     name: item.holiday_cn,
//     isRecess: item.holiday_recess === 1? true : false,
//   }
// })

export default holiday;
