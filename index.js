class Festival {
  calendar = [];
  constructor(country) {
    const res = require("./" + country + "/index.js");
    this.calendar = res.default;
  }
  judge(date) {
    return this.calendar.find(item => item.date == date);
  }
  range(start, end) {
    const E = this.calendar.find(item => item.date == start);
    const S = this.calendar.indexOf(E);
    const L = end - start + 1;
    const R = this.calendar.slice(S, L);
    return R;
  }
}

export default Festival;
