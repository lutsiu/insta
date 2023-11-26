import { FaBirthdayCake } from "react-icons/fa";
import { months, years } from "./data";
import { useState } from "react";
import getDayOfTheMonth from "./utils/getDaysOfMonth";
export default function AddBirthday() {
  const [monthIsTouched, setMonthIsTouched] = useState(false);
  const [dayOfBirth, setDayOfBirth] = useState<string>(
    new Date().getDate().toString()
  );
  const [monthOfBirth, setMonthOfBirth] = useState<string>(
    months[new Date().getMonth()]
  );
  const [yearOfBirth, setYearOfBirth] = useState<string>(
    new Date().getFullYear().toString()
  );

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
          <div>
            <select defaultValue={monthOfBirth}>
              {months.map((month, i) => {
                return (
                  <option key={i} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
            <select>{}</select>
            <select defaultValue={yearOfBirth}>
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
