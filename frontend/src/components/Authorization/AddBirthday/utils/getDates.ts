import getAmountDaysOfTheMonth from "./getDaysOfMonth";
import { months } from "../data";
export const getAmountOfDaysInMonthForState = Array.from(
  {
    length: getAmountDaysOfTheMonth(
      months[new Date().getMonth()],
      new Date().getFullYear().toString()
    ),
  },
  (_, i) => i + 1
);

export const getCurrentDay = new Date().getDate();
export const getCurrentMonth = months[new Date().getMonth()];
export const getCurrentYear = new Date().getFullYear().toString();
