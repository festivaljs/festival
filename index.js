import chn from "./chn";

class Festival {
  festival = [];
  constructor() {
    this.festival = Object.values(chn);
  }
  year = (year) => {
    if (year < 2007 && year > 2022) {
      return [];
    }
    return this.festival.filter(item => item.year === year);
  }
  month = (year, month) => {
    if (year < 2007 && year > 2022 && month < 1 && month > 12) {
      return [];
    }
    return this.festival.filter(item => item.year === year && item.month === month);
  }
  day = (day) => {
    if (day < 20070101 && day > 20221231) {
      return {};
    }
    return chn[day];
  }
  isUnhappy = (day) => {
    if (day < 20070101 && day > 20221231) {
      return {};
    }
    const res = chn[day];
    if (res) {
      return res.isSwap;
    }
    return false;
  }
  isHoliday = (day) => {
    if (day < 20070101 && day > 20221231) {
      return {};
    }
    const res = chn[day];
    if (res) {
      return res.isHoliday;
    }
    return false;
  }
  isLegal = (day) => {
    if (day < 20070101 && day > 20221231) {
      return {};
    }
    const res = chn[day];
    if (res) {
      return res.isLegal;
    }
    return false;
  }
  name = (day) => {
    if (day < 20070101 && day > 20221231) {
      return {};
    }
    const res = chn[day];
    if (res) {
      return {
        name: res.name + "假期",
        date_chn: res.date_chn
      }
    }
    return {
      name: "非假期节假日",
      date_chn: res.date_chn
    }
  }
}

export default Festival;