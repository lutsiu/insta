import { months, years } from "../data";
import { useEffect, useState } from "react";
import getAmountDaysOfTheMonth from "../utils/getDaysOfMonth";
import {
  getAmountOfDaysInMonthForState,
} from "../utils/getDates";
interface Props {
  setButtonIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  day: {
    dayOfBirth: number,
    setDayOfBirth: React.Dispatch<React.SetStateAction<number>>
  },
  month: {
    monthOfBirth: string
    setMonthOfBirth: React.Dispatch<React.SetStateAction<string>>
  },
  year: {
    yearOfBirth: string,
    setYearOfBirth: React.Dispatch<React.SetStateAction<string>>
  }
}
export default function DateSelector(props: Props) {
  const { setButtonIsDisabled, day, month, year } = props;
  const {dayOfBirth, setDayOfBirth} = day;
  const {monthOfBirth, setMonthOfBirth} = month;
  const {yearOfBirth, setYearOfBirth} = year;
  const [amountOfDaysInMonth, setAmountOfDaysInMonth] = useState(
    getAmountOfDaysInMonthForState
  );
  

  function handleChangeDay(e: React.ChangeEvent<HTMLSelectElement>) {
    setDayOfBirth(+e.target.value);
  }

  function handleChangeMonth(e: React.ChangeEvent<HTMLSelectElement>) {
    setMonthOfBirth(e.target.value);
  }
  function handleChangeYear(e: React.ChangeEvent<HTMLSelectElement>) {
    setYearOfBirth(e.target.value);
  }

  useEffect(() => {
    const daysOfMonth = Array.from(
      { length: getAmountDaysOfTheMonth(monthOfBirth, yearOfBirth) },
      (_, i) => {
        return i + 1;
      }
    );
    setAmountOfDaysInMonth(daysOfMonth);
  }, [yearOfBirth, monthOfBirth]);

  useEffect(() => {
    const dateOfBirth = new Date(
      +yearOfBirth,
      months.findIndex((m) => m === monthOfBirth),
      dayOfBirth
    ).getTime();
    const currentDate = new Date().getTime();
    const timeDifference = Math.abs(currentDate - dateOfBirth);
    
    // convert one year to millisecs
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const yearsDifference = timeDifference / millisecondsInYear;
    
    if (yearsDifference >= 14) {
      setButtonIsDisabled(false);
    } else {
      setButtonIsDisabled(true);
    }
  }, [yearOfBirth, monthOfBirth, dayOfBirth, setButtonIsDisabled]);
  return (
    <div className="text-gray-900 text-xl w-full flex gap-[1rem]">
      <select
        defaultValue={monthOfBirth}
        onChange={handleChangeMonth}
        className="p-[.7rem] rounded-md cursor-pointer"
      >
        {months.map((month, i) => {
          return (
            <option key={i} value={month} className="checked:bg-gray-200">
              {month}
            </option>
          );
        })}
      </select>
      <select
        onChange={handleChangeDay}
        defaultValue={dayOfBirth}
        className="p-[.7rem] rounded-md cursor-pointer"
      >
        {amountOfDaysInMonth.map((day, i) => {
          return (
            <option key={i} value={day} className="checked:bg-gray-200">
              {day}
            </option>
          );
        })}
      </select>
      <select
        defaultValue={yearOfBirth}
        onChange={handleChangeYear}
        className="p-[.7rem] rounded-md cursor-pointer"
      >
        {years.map((year, i) => {
          return (
            <option key={i} value={year} className="checked:bg-gray-200">
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
}
