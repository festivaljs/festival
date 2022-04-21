const GRATEFUL = {
    "2022-01-01": {
        name: "元旦",
        isSwap: false,
    },
    "2022-01-02": {
        name: "元旦",
        isSwap: false,
    },
    "2022-01-03": {
        name: "元旦",
        isSwap: false,
    },
    "2022-01-31": {
        name: "春节",
        isSwap: true,
    },
    "2022-02-01": {
        name: "春节",
        isSwap: true,
    },
    "2022-02-02": {
        name: "春节",
        isSwap: true,
    },
    "2022-02-03": {
        name: "春节",
        isSwap: true,
    },
    "2022-02-04": {
        name: "春节",
        isSwap: true,
    },
    "2022-02-05": {
        name: "春节",
        isSwap: true,
    },
    "2022-02-06": {
        name: "春节",
        isSwap: true,
    },
    "2022-04-03": {
        name: "清明",
        isSwap: true,
    },
    "2022-04-04": {
        name: "清明",
        isSwap: true,
    },
    "2022-04-05": {
        name: "清明",
        isSwap: true,
    },
    "2022-04-30": {
        name: "劳动",
        isSwap: true,
    },
    "2022-05-01": {
        name: "劳动",
        isSwap: true,
    },
    "2022-05-02": {
        name: "劳动",
        isSwap: true,
    },
    "2022-05-03": {
        name: "劳动",
        isSwap: true,
    },
    "2022-05-04": {
        name: "劳动",
        isSwap: true,
    },
    "2022-06-03": {
        name: "端午",
        isSwap: false,
    },
    "2022-06-04": {
        name: "端午",
        isSwap: false,
    },
    "2022-06-05": {
        name: "端午",
        isSwap: false,
    },
    "2022-09-10": {
        name: "中秋",
        isSwap: false,
    },
    "2022-09-11": {
        name: "中秋",
        isSwap: false,
    },
    "2022-09-12": {
        name: "中秋",
        isSwap: false,
    },
    "2022-10-01": {
        name: "国庆",
        isSwap: true,
    },
    "2022-10-02": {
        name: "国庆",
        isSwap: true,
    },
    "2022-10-03": {
        name: "国庆",
        isSwap: true,
    },
    "2022-10-04": {
        name: "国庆",
        isSwap: true,
    },
    "2022-10-05": {
        name: "国庆",
        isSwap: true,
    },
    "2022-10-06": {
        name: "国庆",
        isSwap: true,
    },
    "2022-10-07": {
        name: "国庆",
        isSwap: true,
    },
}
const festival = (date) => {
  return GRATEFUL[date] ? GRATEFUL[date] : false;
};

export default festival;