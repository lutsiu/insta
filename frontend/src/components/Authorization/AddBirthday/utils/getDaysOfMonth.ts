import { months } from "../data";
export default function getDayOfTheMonth(month: string, year: string) {
  const getLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };
  
  const isYearLeap = getLeapYear(+year);
  let days: number;

  switch (month) {
    case "January": 
    case "March": 
    case "May": 
    case "July": 
    case "August": 
    case "October": 
    case "December": {
      days = 31;
      break;
    }
    case "April": 
    case "June": 
    case "September": 
    case "November": {
      days = 30;
      break;
    }
    case "February": {
      days = isYearLeap ? 29 : 28;
      break;
    }
    default: {
      throw new Error("Invalid month");
    }
  }

  return days;
}