import { FaBirthdayCake } from "react-icons/fa";
import { months, years } from "./data";
import { useEffect, useState } from "react";
import getAmountDaysOfTheMonth from "./utils/getDaysOfMonth";
import {
  getAmountOfDaysInMonthForState,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
} from "./utils/getDates";
export default function AddBirthday() {
  const [amountOfDaysInMonth, setAmountOfDaysInMonth] = useState(
    getAmountOfDaysInMonthForState
  );
  const [dayOfBirth, setDayOfBirth] = useState<number>(getCurrentDay);
  const [monthOfBirth, setMonthOfBirth] = useState<string>(getCurrentMonth);
  const [yearOfBirth, setYearOfBirth] = useState<string>(getCurrentYear);

  useEffect(() => {
    const daysOfMonth = Array.from(
      { length: getAmountDaysOfTheMonth(monthOfBirth, yearOfBirth) },
      (_, i) => {
        return i + 1;
      }
    );
    setAmountOfDaysInMonth(daysOfMonth);
  }, [yearOfBirth, monthOfBirth]);

  function handleChangeDay(e: React.ChangeEvent<HTMLSelectElement>) {
    setDayOfBirth(+e.target.value);
  }

  function handleChangeMonth(e: React.ChangeEvent<HTMLSelectElement>) {
    setMonthOfBirth(e.target.value);
  }
  function handleChangeYear(e: React.ChangeEvent<HTMLSelectElement>) {
    setYearOfBirth(e.target.value);
  }
  return (
    <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center pt-[4.5rem] pb-[2.5rem] ">
      <div>
        <div>
          <FaBirthdayCake />
          <p>Add your Birthday</p>
        </div>
        <div>
          <p>We need this data in order to use it agains you</p>
          <p>Why do i need to be your slave?</p>
          <div className="text-black">
            <select defaultValue={monthOfBirth} onChange={handleChangeMonth}>
              {months.map((month, i) => {
                return (
                  <option key={i} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
            <select onChange={handleChangeDay} defaultValue={dayOfBirth}>
              {amountOfDaysInMonth.map((day, i) => {
                return (
                  <option key={i} value={day}>
                    {day}
                  </option>
                );
              })}
            </select>
            <select defaultValue={yearOfBirth} onChange={handleChangeYear}>
              {years.map((year, i) => {
                return (
                  <option key={i} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="text-center mt-[4rem] px-[6rem]">
        Some boring-ass description of some laws blah blah blah
      </div>
    </div>
  );
}
