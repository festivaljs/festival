import Y2022 from "./2022";
import unhappy from "./unhappy";

const festival = (date) => {
  if (unhappy[date]) return unhappy[date];
  if (Y2022[date]) return Y2022[date];
  return {
    name: "正常",
    type: 1,
  };
};

export default festival;
